/**
 * Noah Civilise - 3D WebGL Background Engine
 * Studio / Deep Tech Edition
 *
 * Replaces sci-fi neon gadgets with an authentic, elegant 3D Point Cloud & Depth Manifold
 * inspired by Computer Vision (LiDAR, Structure from Motion, Depth Scanning & Neural Fields).
 *
 * Features:
 *  - 3D Dynamic Vision Point Cloud (64 x 64 = 4,096 harmonic spatial sample points)
 *  - Wave displacement and elevation-based color mapping computed on the GPU (vertex shader)
 *  - Parallax perspective orbit linked smoothly to pointer motion
 *  - Smooth waypoint transitions between portfolio tabs (via GSAP)
 *  - Static single frame when the OS asks for reduced motion
 *  - Dark (Obsidian / Sapphire) & Light (Architectural / Steel Blue) adaptive modes
 */

class Portfolio3D {
    constructor() {
        this.container = document.getElementById('webgl-canvas-container');
        this.canvas = document.getElementById('webgl-canvas');
        if (!this.canvas) return;

        this.width = window.innerWidth;
        this.height = window.innerHeight;

        // Color Mode state
        const savedMode = localStorage.getItem('portfolio_theme_mode') ||
            (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
        this.colorMode = savedMode;

        // Interaction state
        this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
        this.currentTab = 'profile';
        this.clock = new THREE.Clock();
        this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        this.isAnimating = false;

        // Shared with the point cloud shader (see initPointCloud)
        this.waveUniforms = {
            uTime: { value: 0 },
            uColorLow: { value: new THREE.Color() },
            uColorHigh: { value: new THREE.Color() }
        };

        this.initThree();
        this.initPointCloud();
        this.initWaypoints();
        this.initEvents();
        this.setColorMode(this.colorMode);

        this.animate = this.animate.bind(this);
        this.startOrRenderOnce();
        this.reducedMotion.addEventListener?.('change', () => this.startOrRenderOnce());
    }

    // Animate continuously, or draw one still frame when reduced motion is requested
    startOrRenderOnce() {
        if (this.reducedMotion.matches) {
            this.isAnimating = false;
            this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
            this.waveUniforms.uTime.value = 0;
            this.render();
        } else if (!this.isAnimating) {
            this.isAnimating = true;
            requestAnimationFrame(this.animate);
        }
    }

    /* -------------------------------------------------------------
     * INITIALIZATION & THREE.JS SETUP
     * ----------------------------------------------------------- */
    initThree() {
        this.scene = new THREE.Scene();
        const initialFogColor = this.colorMode === 'light' ? 0xf1f5f9 : 0x090d16;
        this.scene.fog = new THREE.FogExp2(initialFogColor, 0.018);

        this.camera = new THREE.PerspectiveCamera(50, this.width / this.height, 0.1, 1000);
        this.camera.position.set(0, 12, 28);
        this.cameraTarget = new THREE.Vector3(0, 0, 0);

        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            alpha: true,
            antialias: true,
            powerPreference: 'high-performance'
        });
        this.renderer.setSize(this.width, this.height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.0;
    }

    /* -------------------------------------------------------------
     * 3D POINT CLOUD / COMPUTER VISION DEPTH FIELD
     * ----------------------------------------------------------- */
    createParticleTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');

        const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.25, 'rgba(255, 255, 255, 0.85)');
        gradient.addColorStop(0.55, 'rgba(255, 255, 255, 0.25)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 64, 64);

        const texture = new THREE.CanvasTexture(canvas);
        texture.needsUpdate = true;
        return texture;
    }

    initPointCloud() {
        // Grid resolution (60 x 60 = 3600 points)
        this.gridX = 64;
        this.gridZ = 64;
        const totalPoints = this.gridX * this.gridZ;

        // Flat grid uploaded once; the vertex shader animates height and color every frame
        const positions = new Float32Array(totalPoints * 3);
        const colors = new Float32Array(totalPoints * 3).fill(1);

        const stepX = 0.72;
        const stepZ = 0.72;
        const offsetX = (this.gridX * stepX) / 2;
        const offsetZ = (this.gridZ * stepZ) / 2;

        let idx = 0;
        for (let i = 0; i < this.gridX; i++) {
            for (let j = 0; j < this.gridZ; j++) {
                const x = i * stepX - offsetX;
                const z = j * stepZ - offsetZ;

                positions[idx * 3] = x;
                positions[idx * 3 + 1] = 0;
                positions[idx * 3 + 2] = z;

                idx++;
            }
        }

        this.pointCloudGeometry = new THREE.BufferGeometry();
        this.pointCloudGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        this.pointCloudGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        this.pointCloudMaterial = new THREE.PointsMaterial({
            size: window.innerWidth < 768 ? 1.4 : 1.7,
            vertexColors: true,
            map: this.createParticleTexture(),
            transparent: true,
            opacity: this.colorMode === 'light' ? 0.65 : 0.85,
            blending: this.colorMode === 'light' ? THREE.NormalBlending : THREE.AdditiveBlending,
            depthWrite: false
        });

        // Same harmonic waves as the former CPU loop, now evaluated per vertex on the GPU.
        // The color is a linear blend between the low and high elevation tints.
        this.pointCloudMaterial.onBeforeCompile = (shader) => {
            Object.assign(shader.uniforms, this.waveUniforms);
            shader.vertexShader = shader.vertexShader
                .replace('#include <common>', `#include <common>
                    uniform float uTime;
                    uniform vec3 uColorLow;
                    uniform vec3 uColorHigh;`)
                .replace('#include <begin_vertex>', `#include <begin_vertex>
                    float distFromCenter = length(position.xz);
                    float wave1 = sin(position.x * 0.18 + uTime * 0.8) * cos(position.z * 0.18 + uTime * 0.6) * 1.6;
                    float wave2 = sin(distFromCenter * 0.28 - uTime * 1.1) * 1.1;
                    float wave3 = cos((position.x + position.z) * 0.12 + uTime * 0.4) * 0.8;
                    transformed.y = wave1 + wave2 + wave3;
                    #ifdef USE_COLOR
                        vColor = mix(uColorLow, uColorHigh, clamp((transformed.y + 2.2) / 4.4, 0.0, 1.0));
                    #endif`);
        };

        this.pointCloud = new THREE.Points(this.pointCloudGeometry, this.pointCloudMaterial);
        // Bounds are computed from the flat grid, not the displaced one
        this.pointCloud.frustumCulled = false;
        this.pointCloud.position.set(0, -3.5, -4);
        this.pointCloud.rotation.x = 0.45;
        this.scene.add(this.pointCloud);

        // Subtle secondary ambient stars/reference particles for depth volume
        const bgCount = 450;
        const bgPositions = new Float32Array(bgCount * 3);
        for (let i = 0; i < bgCount; i++) {
            bgPositions[i * 3] = (Math.random() - 0.5) * 80;
            bgPositions[i * 3 + 1] = (Math.random() - 0.5) * 60 + 5;
            bgPositions[i * 3 + 2] = (Math.random() - 0.5) * 80 - 15;
        }

        const bgGeometry = new THREE.BufferGeometry();
        bgGeometry.setAttribute('position', new THREE.BufferAttribute(bgPositions, 3));

        const bgMaterial = new THREE.PointsMaterial({
            size: 1.1,
            color: this.colorMode === 'light' ? 0x94a3b8 : 0x475569,
            map: this.createParticleTexture(),
            transparent: true,
            opacity: 0.35,
            depthWrite: false
        });

        this.bgStars = new THREE.Points(bgGeometry, bgMaterial);
        this.scene.add(this.bgStars);
    }

    /* -------------------------------------------------------------
     * CAMERA WAYPOINTS FOR PORTFOLIO SECTIONS
     * ----------------------------------------------------------- */
    initWaypoints() {
        this.waypoints = {
            profile: {
                camPos: { x: 0, y: 11, z: 27 },
                camRot: { x: -0.32, y: 0, z: 0 },
                meshRotX: 0.42,
                meshRotY: 0
            },
            projects: {
                camPos: { x: 0, y: 15, z: 32 },
                camRot: { x: -0.42, y: 0, z: 0 },
                meshRotX: 0.55,
                meshRotY: 0.12
            },
            experience: {
                camPos: { x: 7, y: 12, z: 28 },
                camRot: { x: -0.35, y: -0.18, z: 0 },
                meshRotX: 0.45,
                meshRotY: -0.25
            },
            education: {
                camPos: { x: -6, y: 13, z: 28 },
                camRot: { x: -0.36, y: 0.18, z: 0 },
                meshRotX: 0.45,
                meshRotY: 0.28
            },
            skills: {
                camPos: { x: 0, y: 17, z: 26 },
                camRot: { x: -0.58, y: 0, z: 0 },
                meshRotX: 0.65,
                meshRotY: -0.15
            }
        };
    }

    goToTab(tabId) {
        if (!this.waypoints[tabId]) return;
        this.currentTab = tabId;
        const target = this.waypoints[tabId];

        if (window.gsap && !this.reducedMotion.matches) {
            window.gsap.to(this.camera.position, {
                x: target.camPos.x,
                y: target.camPos.y,
                z: target.camPos.z,
                duration: 1.4,
                ease: 'power2.out'
            });

            window.gsap.to(this.pointCloud.rotation, {
                x: target.meshRotX,
                y: target.meshRotY,
                duration: 1.4,
                ease: 'power2.out'
            });
        } else {
            this.camera.position.set(target.camPos.x, target.camPos.y, target.camPos.z);
            this.pointCloud.rotation.x = target.meshRotX;
            this.pointCloud.rotation.y = target.meshRotY;
            if (!this.isAnimating) this.render();
        }
    }

    /* -------------------------------------------------------------
     * EVENTS & USER INPUT
     * ----------------------------------------------------------- */
    initEvents() {
        window.addEventListener('resize', () => {
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.camera.aspect = this.width / this.height;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(this.width, this.height);
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

            if (this.pointCloudMaterial) {
                this.pointCloudMaterial.size = window.innerWidth < 768 ? 1.4 : 1.7;
            }
            if (!this.isAnimating) this.render();
        });

        window.addEventListener('mousemove', (e) => {
            const normX = (e.clientX / this.width) * 2 - 1;
            const normY = -(e.clientY / this.height) * 2 + 1;
            this.mouse.targetX = normX;
            this.mouse.targetY = normY;
        });

        // Touch parallax on mobile
        window.addEventListener('touchmove', (e) => {
            if (e.touches && e.touches[0]) {
                const normX = (e.touches[0].clientX / this.width) * 2 - 1;
                const normY = -(e.touches[0].clientY / this.height) * 2 + 1;
                this.mouse.targetX = normX * 0.6;
                this.mouse.targetY = normY * 0.6;
            }
        }, { passive: true });
    }

    /* -------------------------------------------------------------
     * COLOR MODE (DARK OBSIDIAN / LIGHT ARCHITECTURAL)
     * ----------------------------------------------------------- */
    setColorMode(mode) {
        this.colorMode = mode;
        localStorage.setItem('portfolio_theme_mode', mode);

        const isLight = mode === 'light';

        if (this.scene && this.scene.fog) {
            this.scene.fog.color.setHex(isLight ? 0xf8fafc : 0x090d16);
            this.scene.fog.density = isLight ? 0.022 : 0.016;
        }

        if (this.pointCloudMaterial) {
            this.pointCloudMaterial.opacity = isLight ? 0.72 : 0.88;
            this.pointCloudMaterial.blending = isLight ? THREE.NormalBlending : THREE.AdditiveBlending;
            this.pointCloudMaterial.needsUpdate = true;
        }

        if (this.bgStars && this.bgStars.material) {
            this.bgStars.material.color.setHex(isLight ? 0x94a3b8 : 0x475569);
            this.bgStars.material.opacity = isLight ? 0.25 : 0.4;
        }

        // Elevation tints (RGB at the lowest and highest points of the wave)
        if (isLight) {
            // Light mode: Deep royal cobalt -> vibrant blue -> muted slate
            this.waveUniforms.uColorLow.value.setRGB(0.12, 0.35, 0.85);
            this.waveUniforms.uColorHigh.value.setRGB(0.34, 0.70, 0.99);
        } else {
            // Dark mode: Deep sapphire blue -> electric indigo -> soft violet-ice
            this.waveUniforms.uColorLow.value.setRGB(0.18, 0.35, 0.95);
            this.waveUniforms.uColorHigh.value.setRGB(0.63, 0.77, 1.0);
        }

        if (this.renderer && !this.isAnimating) this.render();
    }

    /* -------------------------------------------------------------
     * MAIN ANIMATION LOOP
     * ----------------------------------------------------------- */
    animate() {
        if (!this.isAnimating) return;
        requestAnimationFrame(this.animate);

        const time = this.clock.getElapsedTime();
        this.waveUniforms.uTime.value = time;

        // Smooth mouse damping
        this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.05;
        this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.05;

        // Gentle interactive tilt linked to pointer
        if (this.pointCloud) {
            const baseRotY = (this.waypoints[this.currentTab]?.meshRotY || 0);
            this.pointCloud.rotation.y = baseRotY + this.mouse.x * 0.14;
            this.pointCloud.rotation.z = this.mouse.x * -0.06;
        }

        if (this.bgStars) {
            this.bgStars.rotation.y = time * 0.02;
        }

        this.render();
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }
}

// Global initialization
document.addEventListener('DOMContentLoaded', () => {
    window.portfolio3D = new Portfolio3D();
});
