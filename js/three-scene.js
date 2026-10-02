/**
 * Noah Civilise - 3D WebGL Background Engine
 * Three.js Powered Interactive Space
 * Features:
 *  - Dynamic Starfield & Plexus Constellation Network
 *  - 3D Gyroscopic Cyber Core (Hero / Profil)
 *  - 3D Section Landmarks (WebXR Minimap Radar, Hologram Prisms, Knowledge Rings, Orbiting Tech Galaxy)
 *  - Smooth Camera Flight to Landmarks on Tab Switch (via GSAP or lerp)
 *  - Light / Dark Mode dynamic fog and ambient illumination
 *  - Dynamic Cosmic Theme Switcher
 */

class Portfolio3D {
    constructor() {
        this.container = document.getElementById('webgl-canvas-container');
        this.canvas = document.getElementById('webgl-canvas');
        if (!this.canvas) return;

        this.width = window.innerWidth;
        this.height = window.innerHeight;

        // Current Theme Palette
        this.themes = {
            cyber: {
                name: 'cyber',
                primary: 0x00f0ff,
                secondary: 0x8a2be2,
                accent: 0xff007f,
                particle: 0x00d2ff,
                line: 0x0077b6,
                ambient: 0x0a1024,
                cssPrimary: '#00f0ff',
                cssSecondary: '#8a2be2',
                cssAccent: '#ff007f'
            },
            emerald: {
                name: 'emerald',
                primary: 0x00ff9d,
                secondary: 0x00b4d8,
                accent: 0x70e000,
                particle: 0x00ff9d,
                line: 0x008855,
                ambient: 0x041812,
                cssPrimary: '#00ff9d',
                cssSecondary: '#00b4d8',
                cssAccent: '#70e000'
            },
            quantum: {
                name: 'quantum',
                primary: 0xff8c00,
                secondary: 0xff007f,
                accent: 0xffd700,
                particle: 0xffa500,
                line: 0x884400,
                ambient: 0x1f0e18,
                cssPrimary: '#ff8c00',
                cssSecondary: '#ff007f',
                cssAccent: '#ffd700'
            }
        };

        const savedTheme = localStorage.getItem('noah_portfolio_theme') || 'cyber';
        this.currentTheme = this.themes[savedTheme] || this.themes.cyber;

        // Color mode: dark or light
        const savedMode = localStorage.getItem('portfolio_theme_mode') ||
            (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
        this.colorMode = savedMode;

        // Interaction state
        this.mouse = { x: 0, y: 0 };
        this.currentTab = 'profile';

        this.initThree();
        this.initObjects();
        this.initLights();
        this.initWaypoints();
        this.initEvents();
        this.applyTheme(this.currentTheme.name);
        this.setColorMode(this.colorMode);

        this.animate = this.animate.bind(this);
        requestAnimationFrame(this.animate);
    }

    /* -------------------------------------------------------------
     * INITIALIZATION & THREE.JS SETUP
     * ----------------------------------------------------------- */
    initThree() {
        this.scene = new THREE.Scene();
        const initialFogColor = this.colorMode === 'light' ? 0xe2e8f0 : 0x060913;
        this.scene.fog = new THREE.FogExp2(initialFogColor, 0.012);

        this.camera = new THREE.PerspectiveCamera(58, this.width / this.height, 0.1, 1000);
        this.camera.position.set(0, 0, 16);
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
        this.renderer.toneMappingExposure = this.colorMode === 'light' ? 0.95 : 1.05;
    }

    initLights() {
        this.ambientLight = new THREE.AmbientLight(this.currentTheme.ambient, 1.8);
        this.scene.add(this.ambientLight);

        this.primaryPointLight = new THREE.PointLight(this.currentTheme.primary, 3.2, 45);
        this.primaryPointLight.position.set(6, 6, 9);
        this.scene.add(this.primaryPointLight);

        this.secondaryPointLight = new THREE.PointLight(this.currentTheme.secondary, 2.8, 45);
        this.secondaryPointLight.position.set(-6, -5, 7);
        this.scene.add(this.secondaryPointLight);

        this.accentLight = new THREE.PointLight(this.currentTheme.accent, 2.0, 35);
        this.accentLight.position.set(0, -18, 12);
        this.scene.add(this.accentLight);
    }

    /* -------------------------------------------------------------
     * 3D OBJECTS & LANDMARKS
     * ----------------------------------------------------------- */
    initObjects() {
        this.group = new THREE.Group();
        this.scene.add(this.group);

        this.createStarfield();
        this.createHeroCyberCore();
        this.createExperienceLandmark();
        this.createProjectsLandmark();
        this.createEducationLandmark();
        this.createSkillsLandmark();
        this.createInterestsLandmark();
    }

    createStarfield() {
        const count = 900;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(count * 3);
        const scales = new Float32Array(count);

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            const radius = 12 + Math.random() * 35;
            const theta = Math.random() * Math.PI * 2;
            positions[i3] = Math.cos(theta) * radius;
            positions[i3 + 1] = (Math.random() - 0.5) * 160;
            positions[i3 + 2] = Math.sin(theta) * radius;
            scales[i] = Math.random() * 2.0 + 0.7;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

        const canvas = document.createElement('canvas');
        canvas.width = 32;
        canvas.height = 32;
        const ctx = canvas.getContext('2d');
        const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
        grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
        grad.addColorStop(0.3, 'rgba(0, 240, 255, 0.7)');
        grad.addColorStop(0.8, 'rgba(138, 43, 226, 0.15)');
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 32, 32);
        const particleTexture = new THREE.CanvasTexture(canvas);

        this.particleMaterial = new THREE.PointsMaterial({
            size: 0.55,
            map: particleTexture,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            color: this.currentTheme.particle
        });

        this.particles = new THREE.Points(geometry, this.particleMaterial);
        this.scene.add(this.particles);

        const plexusCount = 70;
        const plexusGeo = new THREE.BufferGeometry();
        const plexusPositions = new Float32Array(plexusCount * 3);
        for (let i = 0; i < plexusCount; i++) {
            const i3 = i * 3;
            plexusPositions[i3] = (Math.random() - 0.5) * 22;
            plexusPositions[i3 + 1] = (Math.random() - 0.5) * 16;
            plexusPositions[i3 + 2] = (Math.random() - 0.5) * 16;
        }
        plexusGeo.setAttribute('position', new THREE.BufferAttribute(plexusPositions, 3));

        this.plexusPoints = plexusPositions;
        this.plexusMaterial = new THREE.LineBasicMaterial({
            color: this.currentTheme.line,
            transparent: true,
            opacity: 0.18,
            blending: THREE.AdditiveBlending
        });

        this.plexusLinesGeo = new THREE.BufferGeometry();
        this.plexusLines = new THREE.LineSegments(this.plexusLinesGeo, this.plexusMaterial);
        this.scene.add(this.plexusLines);
    }

    createHeroCyberCore() {
        this.heroGroup = new THREE.Group();
        this.heroGroup.position.set(0, 0, 0);

        const icoGeo = new THREE.IcosahedronGeometry(3.6, 1);
        this.icoMaterial = new THREE.MeshStandardMaterial({
            color: this.currentTheme.primary,
            wireframe: true,
            emissive: this.currentTheme.primary,
            emissiveIntensity: 0.35,
            roughness: 0.2,
            metalness: 0.8
        });
        this.heroIco = new THREE.Mesh(icoGeo, this.icoMaterial);
        this.heroGroup.add(this.heroIco);

        const torusGeo1 = new THREE.TorusGeometry(4.4, 0.04, 16, 100);
        this.ring1Material = new THREE.MeshStandardMaterial({
            color: this.currentTheme.secondary,
            emissive: this.currentTheme.secondary,
            emissiveIntensity: 0.6,
            roughness: 0.3,
            metalness: 0.9
        });
        this.ring1 = new THREE.Mesh(torusGeo1, this.ring1Material);
        this.heroGroup.add(this.ring1);

        const torusGeo2 = new THREE.TorusGeometry(4.8, 0.03, 16, 100);
        this.ring2Material = new THREE.MeshStandardMaterial({
            color: this.currentTheme.accent,
            emissive: this.currentTheme.accent,
            emissiveIntensity: 0.5,
            roughness: 0.3,
            metalness: 0.9
        });
        this.ring2 = new THREE.Mesh(torusGeo2, this.ring2Material);
        this.ring2.rotation.x = Math.PI / 3;
        this.heroGroup.add(this.ring2);

        const coreGeo = new THREE.OctahedronGeometry(1.6, 0);
        this.coreMaterial = new THREE.MeshPhysicalMaterial({
            color: 0xffffff,
            emissive: this.currentTheme.primary,
            emissiveIntensity: 0.8,
            roughness: 0.1,
            metalness: 0.1,
            transmission: 0.9,
            thickness: 1.5,
            transparent: true,
            opacity: 0.95
        });
        this.heroCore = new THREE.Mesh(coreGeo, this.coreMaterial);
        this.heroGroup.add(this.heroCore);

        this.heroSatellites = [];
        for (let i = 0; i < 4; i++) {
            const satGeo = new THREE.TetrahedronGeometry(0.35, 0);
            const satMat = new THREE.MeshStandardMaterial({
                color: this.currentTheme.accent,
                emissive: this.currentTheme.accent,
                emissiveIntensity: 0.8,
                wireframe: true
            });
            const sat = new THREE.Mesh(satGeo, satMat);
            sat.userData = {
                angle: (i / 4) * Math.PI * 2,
                speed: 0.015 + i * 0.005,
                radius: 5.5 + (i % 2) * 1.0,
                elevation: (i - 1.5) * 1.5
            };
            this.heroGroup.add(sat);
            this.heroSatellites.push(sat);
        }

        this.scene.add(this.heroGroup);
    }

    createExperienceLandmark() {
        this.expGroup = new THREE.Group();
        this.expGroup.position.set(0, -14, 0);

        const gridHelper = new THREE.GridHelper(16, 24, this.currentTheme.primary, this.currentTheme.secondary);
        gridHelper.rotation.x = Math.PI / 6;
        gridHelper.material.transparent = true;
        gridHelper.material.opacity = 0.35;
        this.expGrid = gridHelper;
        this.expGroup.add(gridHelper);

        const radarGeo = new THREE.RingGeometry(0.2, 7.5, 64);
        this.radarMaterial = new THREE.MeshBasicMaterial({
            color: this.currentTheme.primary,
            transparent: true,
            opacity: 0.22,
            side: THREE.DoubleSide
        });
        this.radarRing = new THREE.Mesh(radarGeo, this.radarMaterial);
        this.radarRing.rotation.x = Math.PI / 6;
        this.expGroup.add(this.radarRing);

        const headsetGeo = new THREE.BoxGeometry(3.6, 2.0, 1.8);
        this.headsetMat = new THREE.MeshStandardMaterial({
            color: this.currentTheme.primary,
            wireframe: true,
            emissive: this.currentTheme.primary,
            emissiveIntensity: 0.4
        });
        this.headsetMesh = new THREE.Mesh(headsetGeo, this.headsetMat);
        this.headsetMesh.position.set(0, 2.5, 2);
        this.expGroup.add(this.headsetMesh);

        this.dataCubes = [];
        for (let i = 0; i < 6; i++) {
            const cubeGeo = new THREE.BoxGeometry(0.6, 0.6, 0.6);
            const cubeMat = new THREE.MeshStandardMaterial({
                color: this.currentTheme.secondary,
                emissive: this.currentTheme.secondary,
                emissiveIntensity: 0.5,
                wireframe: true
            });
            const cube = new THREE.Mesh(cubeGeo, cubeMat);
            cube.position.set(
                (Math.random() - 0.5) * 12,
                (Math.random() - 0.5) * 6,
                (Math.random() - 0.5) * 6
            );
            cube.userData = {
                rotSpeedX: Math.random() * 0.02 - 0.01,
                rotSpeedY: Math.random() * 0.02 - 0.01,
                floatSpeed: 0.02 + Math.random() * 0.02,
                originY: cube.position.y
            };
            this.expGroup.add(cube);
            this.dataCubes.push(cube);
        }

        this.scene.add(this.expGroup);
    }

    createProjectsLandmark() {
        this.projGroup = new THREE.Group();
        this.projGroup.position.set(0, -28, 0);

        this.projectPrisms = [];
        const prismGeos = [
            new THREE.DodecahedronGeometry(1.8, 0),
            new THREE.OctahedronGeometry(1.6, 0),
            new THREE.TetrahedronGeometry(2.0, 0),
            new THREE.IcosahedronGeometry(1.5, 0)
        ];

        for (let i = 0; i < 4; i++) {
            const mat = new THREE.MeshPhysicalMaterial({
                color: i % 2 === 0 ? this.currentTheme.primary : this.currentTheme.secondary,
                emissive: i % 2 === 0 ? this.currentTheme.primary : this.currentTheme.secondary,
                emissiveIntensity: 0.3,
                wireframe: true,
                roughness: 0.2,
                metalness: 0.8
            });
            const mesh = new THREE.Mesh(prismGeos[i % prismGeos.length], mat);
            const angle = (i / 4) * Math.PI * 2;
            const radius = 7;
            mesh.position.set(Math.cos(angle) * radius, (i - 1.5) * 2, Math.sin(angle) * radius);
            mesh.userData = {
                angle: angle,
                radius: radius,
                speed: 0.008 + i * 0.003
            };
            this.projGroup.add(mesh);
            this.projectPrisms.push(mesh);
        }

        const ringGeo = new THREE.TorusGeometry(8.5, 0.05, 16, 80);
        this.projRingMat = new THREE.MeshBasicMaterial({
            color: this.currentTheme.accent,
            transparent: true,
            opacity: 0.35,
            wireframe: true
        });
        this.projRing = new THREE.Mesh(ringGeo, this.projRingMat);
        this.projRing.rotation.x = Math.PI / 4;
        this.projGroup.add(this.projRing);

        this.scene.add(this.projGroup);
    }

    createEducationLandmark() {
        this.eduGroup = new THREE.Group();
        this.eduGroup.position.set(0, -42, 0);

        this.eduRings = [];
        for (let i = 0; i < 3; i++) {
            const ringGeo = new THREE.TorusGeometry(5.2 + i * 1.2, 0.035, 16, 100);
            const ringMat = new THREE.MeshBasicMaterial({
                color: i === 0 ? this.currentTheme.primary : (i === 1 ? this.currentTheme.secondary : this.currentTheme.accent),
                transparent: true,
                opacity: 0.45
            });
            const ring = new THREE.Mesh(ringGeo, ringMat);
            ring.rotation.x = (i * Math.PI) / 3;
            ring.rotation.y = (i * Math.PI) / 4;
            this.eduGroup.add(ring);
            this.eduRings.push(ring);
        }

        const emblemGeo = new THREE.OctahedronGeometry(2.0, 1);
        this.emblemMat = new THREE.MeshStandardMaterial({
            color: this.currentTheme.accent,
            wireframe: true,
            emissive: this.currentTheme.accent,
            emissiveIntensity: 0.5
        });
        this.emblem = new THREE.Mesh(emblemGeo, this.emblemMat);
        this.eduGroup.add(this.emblem);

        this.scene.add(this.eduGroup);
    }

    createSkillsLandmark() {
        this.skillsGroup = new THREE.Group();
        this.skillsGroup.position.set(0, -56, 0);

        const coreGeo = new THREE.SphereGeometry(2.4, 24, 24);
        this.skillCoreMat = new THREE.MeshStandardMaterial({
            color: this.currentTheme.primary,
            wireframe: true,
            emissive: this.currentTheme.primary,
            emissiveIntensity: 0.4
        });
        this.skillCore = new THREE.Mesh(coreGeo, this.skillCoreMat);
        this.skillsGroup.add(this.skillCore);

        this.skillPlanets = [];
        const planetCount = 8;
        for (let i = 0; i < planetCount; i++) {
            const planetGeo = new THREE.DodecahedronGeometry(0.5, 0);
            const planetMat = new THREE.MeshStandardMaterial({
                color: i % 2 === 0 ? this.currentTheme.secondary : this.currentTheme.accent,
                wireframe: true,
                emissive: i % 2 === 0 ? this.currentTheme.secondary : this.currentTheme.accent,
                emissiveIntensity: 0.7
            });
            const planet = new THREE.Mesh(planetGeo, planetMat);
            planet.userData = {
                angle: (i / planetCount) * Math.PI * 2,
                orbitRadius: 4.8 + (i % 3) * 1.5,
                speed: 0.012 * ((i % 2 === 0) ? 1 : -1),
                inclination: (i * Math.PI) / 4
            };
            this.skillsGroup.add(planet);
            this.skillPlanets.push(planet);
        }

        this.scene.add(this.skillsGroup);
    }

    createInterestsLandmark() {
        this.intGroup = new THREE.Group();
        this.intGroup.position.set(0, -70, 0);

        const globeGeo = new THREE.SphereGeometry(4.0, 16, 16);
        this.globeMat = new THREE.MeshBasicMaterial({
            color: this.currentTheme.primary,
            wireframe: true,
            transparent: true,
            opacity: 0.3
        });
        this.globe = new THREE.Mesh(globeGeo, this.globeMat);
        this.intGroup.add(this.globe);

        const aeroGeo = new THREE.TorusGeometry(5.8, 0.05, 8, 64);
        this.aeroMat = new THREE.MeshStandardMaterial({
            color: this.currentTheme.accent,
            emissive: this.currentTheme.accent,
            emissiveIntensity: 0.6,
            wireframe: true
        });
        this.aeroRing = new THREE.Mesh(aeroGeo, this.aeroMat);
        this.aeroRing.rotation.x = Math.PI / 2.3;
        this.intGroup.add(this.aeroRing);

        this.scene.add(this.intGroup);
    }

    /* -------------------------------------------------------------
     * COCKPIT WAYPOINTS & CAMERA NAVIGATION
     * ----------------------------------------------------------- */
    initWaypoints() {
        this.tabWaypoints = {
            profile: { pos: new THREE.Vector3(0, 0, 16), target: new THREE.Vector3(0, 0, 0) },
            projects: { pos: new THREE.Vector3(-3.5, -28, 15), target: new THREE.Vector3(0, -28, 0) },
            experience: { pos: new THREE.Vector3(3.5, -14, 15), target: new THREE.Vector3(0, -14, 0) },
            education: { pos: new THREE.Vector3(3.5, -42, 15), target: new THREE.Vector3(0, -42, 0) },
            skills: { pos: new THREE.Vector3(-2.5, -56, 16), target: new THREE.Vector3(0, -56, 0) },
            interests: { pos: new THREE.Vector3(0, -70, 16), target: new THREE.Vector3(0, -70, 0) }
        };

        this.targetCamPos = this.tabWaypoints.profile.pos.clone();
        this.targetCamLook = this.tabWaypoints.profile.target.clone();
    }

    goToTab(tabName) {
        if (!this.tabWaypoints[tabName]) return;
        this.currentTab = tabName;
        const target = this.tabWaypoints[tabName];

        if (window.gsap) {
            gsap.to(this.targetCamPos, {
                x: target.pos.x,
                y: target.pos.y,
                z: target.pos.z,
                duration: 1.1,
                ease: "power2.inOut"
            });
            gsap.to(this.targetCamLook, {
                x: target.target.x,
                y: target.target.y,
                z: target.target.z,
                duration: 1.1,
                ease: "power2.inOut"
            });
        } else {
            this.targetCamPos.copy(target.pos);
            this.targetCamLook.copy(target.target);
        }
    }

    updateCamera() {
        const parallaxX = this.mouse.x * 1.4;
        const parallaxY = this.mouse.y * 1.0;

        this.camera.position.x += (this.targetCamPos.x + parallaxX - this.camera.position.x) * 0.08;
        this.camera.position.y += (this.targetCamPos.y + parallaxY - this.camera.position.y) * 0.08;
        this.camera.position.z += (this.targetCamPos.z - this.camera.position.z) * 0.08;

        this.cameraTarget.x += (this.targetCamLook.x - this.cameraTarget.x) * 0.08;
        this.cameraTarget.y += (this.targetCamLook.y - this.cameraTarget.y) * 0.08;
        this.cameraTarget.z += (this.targetCamLook.z - this.cameraTarget.z) * 0.08;

        this.camera.lookAt(this.cameraTarget);
    }

    /* -------------------------------------------------------------
     * EVENTS & USER INTERACTIONS
     * ----------------------------------------------------------- */
    initEvents() {
        window.addEventListener('resize', () => {
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.camera.aspect = this.width / this.height;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(this.width, this.height);
        });

        window.addEventListener('mousemove', (e) => {
            this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
        });

        window.addEventListener('touchmove', (e) => {
            if (e.touches.length > 0) {
                this.mouse.x = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
                this.mouse.y = -(e.touches[0].clientY / window.innerHeight) * 2 + 1;
            }
        }, { passive: true });

        // Cosmic Theme switcher
        document.querySelectorAll('.theme-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const themeName = btn.dataset.theme;
                if (themeName && this.themes[themeName]) {
                    this.applyTheme(themeName);
                }
            });
        });
    }

    /* -------------------------------------------------------------
     * LIGHT / DARK COLOR MODE
     * ----------------------------------------------------------- */
    setColorMode(mode) {
        this.colorMode = mode;
        localStorage.setItem('portfolio_theme_mode', mode);

        if (mode === 'light') {
            document.body.classList.add('light-mode');
            if (this.scene && this.scene.fog) {
                this.scene.fog.color.setHex(0xe2e8f0);
            }
            if (this.ambientLight) {
                this.ambientLight.color.setHex(0xf8fafc);
                this.ambientLight.intensity = 2.4;
            }
            if (this.renderer) {
                this.renderer.toneMappingExposure = 0.95;
            }
        } else {
            document.body.classList.remove('light-mode');
            if (this.scene && this.scene.fog) {
                this.scene.fog.color.setHex(0x060913);
            }
            if (this.ambientLight) {
                this.ambientLight.color.setHex(this.currentTheme.ambient);
                this.ambientLight.intensity = 1.8;
            }
            if (this.renderer) {
                this.renderer.toneMappingExposure = 1.05;
            }
        }
    }

    /* -------------------------------------------------------------
     * DYNAMIC COSMIC THEME SWITCHING
     * ----------------------------------------------------------- */
    applyTheme(themeName) {
        const theme = this.themes[themeName] || this.themes.cyber;
        this.currentTheme = theme;
        localStorage.setItem('noah_portfolio_theme', themeName);

        document.documentElement.style.setProperty('--primary-color', theme.cssPrimary);
        document.documentElement.style.setProperty('--secondary-color', theme.cssSecondary);
        document.documentElement.style.setProperty('--accent-color', theme.cssAccent);

        document.querySelectorAll('.theme-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.theme === themeName);
        });

        if (this.primaryPointLight) this.primaryPointLight.color.setHex(theme.primary);
        if (this.secondaryPointLight) this.secondaryPointLight.color.setHex(theme.secondary);
        if (this.accentLight) this.accentLight.color.setHex(theme.accent);
        if (this.ambientLight && this.colorMode !== 'light') {
            this.ambientLight.color.setHex(theme.ambient);
        }

        if (this.particleMaterial) this.particleMaterial.color.setHex(theme.particle);
        if (this.plexusMaterial) this.plexusMaterial.color.setHex(theme.line);

        if (this.icoMaterial) {
            this.icoMaterial.color.setHex(theme.primary);
            this.icoMaterial.emissive.setHex(theme.primary);
        }
        if (this.ring1Material) {
            this.ring1Material.color.setHex(theme.secondary);
            this.ring1Material.emissive.setHex(theme.secondary);
        }
        if (this.ring2Material) {
            this.ring2Material.color.setHex(theme.accent);
            this.ring2Material.emissive.setHex(theme.accent);
        }
        if (this.coreMaterial) {
            this.coreMaterial.emissive.setHex(theme.primary);
        }

        if (this.radarMaterial) this.radarMaterial.color.setHex(theme.primary);
        if (this.headsetMat) {
            this.headsetMat.color.setHex(theme.primary);
            this.headsetMat.emissive.setHex(theme.primary);
        }
        if (this.projRingMat) this.projRingMat.color.setHex(theme.accent);
        if (this.skillCoreMat) {
            this.skillCoreMat.color.setHex(theme.primary);
            this.skillCoreMat.emissive.setHex(theme.primary);
        }
        if (this.globeMat) this.globeMat.color.setHex(theme.primary);
        if (this.aeroMat) {
            this.aeroMat.color.setHex(theme.accent);
            this.aeroMat.emissive.setHex(theme.accent);
        }
    }

    /* -------------------------------------------------------------
     * MAIN ANIMATION LOOP (60 FPS)
     * ----------------------------------------------------------- */
    animate(time) {
        requestAnimationFrame(this.animate);

        const delta = time * 0.001;

        this.updateCamera();

        if (this.heroIco) {
            this.heroIco.rotation.x = delta * 0.22;
            this.heroIco.rotation.y = delta * 0.32;
        }
        if (this.ring1) {
            this.ring1.rotation.y = -delta * 0.4;
            this.ring1.rotation.z = delta * 0.18;
        }
        if (this.ring2) {
            this.ring2.rotation.x = delta * 0.3;
            this.ring2.rotation.y = delta * 0.45;
        }
        if (this.heroCore) {
            this.heroCore.rotation.x = -delta * 0.45;
            this.heroCore.rotation.y = delta * 0.55;
            const pulse = 1 + Math.sin(delta * 2.2) * 0.07;
            this.heroCore.scale.set(pulse, pulse, pulse);
        }

        if (this.heroSatellites) {
            this.heroSatellites.forEach(sat => {
                sat.userData.angle += sat.userData.speed;
                sat.position.x = Math.cos(sat.userData.angle) * sat.userData.radius;
                sat.position.z = Math.sin(sat.userData.angle) * sat.userData.radius;
                sat.position.y = Math.sin(delta * 2 + sat.userData.angle) * sat.userData.elevation;
                sat.rotation.x += 0.02;
                sat.rotation.y += 0.03;
            });
        }

        if (this.radarRing) {
            this.radarRing.rotation.z = delta * 0.75;
            const radarPulse = 1.0 + (Math.sin(delta * 2.8) * 0.04);
            this.radarRing.scale.set(radarPulse, radarPulse, 1);
        }
        if (this.headsetMesh) {
            this.headsetMesh.rotation.y = Math.sin(delta * 0.8) * 0.25;
            this.headsetMesh.rotation.x = Math.cos(delta * 0.6) * 0.12;
            this.headsetMesh.position.y = 2.5 + Math.sin(delta * 1.5) * 0.35;
        }
        if (this.dataCubes) {
            this.dataCubes.forEach(cube => {
                cube.rotation.x += cube.userData.rotSpeedX;
                cube.rotation.y += cube.userData.rotSpeedY;
                cube.position.y = cube.userData.originY + Math.sin(delta * 2 + cube.userData.floatSpeed * 10) * 0.5;
            });
        }

        if (this.projectPrisms) {
            this.projectPrisms.forEach(mesh => {
                mesh.userData.angle += mesh.userData.speed;
                mesh.position.x = Math.cos(mesh.userData.angle) * mesh.userData.radius;
                mesh.position.z = Math.sin(mesh.userData.angle) * mesh.userData.radius;
                mesh.rotation.x += 0.012;
                mesh.rotation.y += 0.018;
            });
        }
        if (this.projRing) {
            this.projRing.rotation.z = -delta * 0.25;
        }

        if (this.eduRings) {
            this.eduRings.forEach((ring, idx) => {
                ring.rotation.z += 0.007 * (idx + 1);
                ring.rotation.y += 0.004 * (idx % 2 === 0 ? 1 : -1);
            });
        }
        if (this.emblem) {
            this.emblem.rotation.y = delta * 0.45;
            this.emblem.rotation.x = delta * 0.25;
        }

        if (this.skillCore) {
            this.skillCore.rotation.y = delta * 0.18;
            this.skillCore.rotation.x = delta * 0.12;
        }
        if (this.skillPlanets) {
            this.skillPlanets.forEach(planet => {
                planet.userData.angle += planet.userData.speed;
                planet.position.x = Math.cos(planet.userData.angle) * planet.userData.orbitRadius;
                planet.position.z = Math.sin(planet.userData.angle) * planet.userData.orbitRadius;
                planet.position.y = Math.sin(planet.userData.angle) * 1.3;
                planet.rotation.y += 0.025;
            });
        }

        if (this.globe) {
            this.globe.rotation.y = delta * 0.22;
        }
        if (this.aeroRing) {
            this.aeroRing.rotation.z = delta * 0.55;
        }

        if (this.particles) {
            this.particles.rotation.y = delta * 0.015;
        }

        if (this.plexusPoints && this.plexusLinesGeo) {
            const linePositions = [];
            const threshold = 5.2;
            const pts = this.plexusPoints;
            const len = pts.length / 3;

            for (let i = 0; i < len; i++) {
                const ix = pts[i * 3];
                const iy = pts[i * 3 + 1];
                const iz = pts[i * 3 + 2];

                for (let j = i + 1; j < len; j++) {
                    const jx = pts[j * 3];
                    const jy = pts[j * 3 + 1];
                    const jz = pts[j * 3 + 2];

                    const dx = ix - jx;
                    const dy = iy - jy;
                    const dz = iz - jz;
                    const distSq = dx * dx + dy * dy + dz * dz;

                    if (distSq < threshold * threshold) {
                        linePositions.push(ix, iy, iz, jx, jy, jz);
                    }
                }
            }

            this.plexusLinesGeo.setAttribute(
                'position',
                new THREE.Float32BufferAttribute(linePositions, 3)
            );
        }

        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    window.portfolio3D = new Portfolio3D();
});
