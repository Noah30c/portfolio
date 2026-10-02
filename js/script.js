/**
 * Noah Civilise - Portfolio Interactive Logic
 * Features:
 *  - Infinite Circular 3D Spatial Carousel for Projects
 *  - Project Inspection Modal (Detailed Technical Architecture & Metrics)
 *  - Cockpit Hub Tab Navigation with 3D Camera Waypoints
 *  - Light / Dark Mode Toggle with State Persistence
 *  - Native Browser Cursor (Custom cursor removed)
 *  - Clipboard Copy Toasts & Keyboard Shortcuts
 */

document.addEventListener('DOMContentLoaded', () => {
    initThemeMode();
    initCockpitTabs();
    init3DProjectsCarousel();
    initCopyActions();
    initPdfPreviewModal();
    initKeyboardShortcuts();
});

/* -------------------------------------------------------------
 * 1. LIGHT / DARK THEME MODE
 * ----------------------------------------------------------- */
function initThemeMode() {
    const toggleBtn = document.getElementById('theme-mode-toggle');
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    const savedMode = localStorage.getItem('portfolio_theme_mode') || (prefersLight ? 'light' : 'dark');

    function applyMode(mode) {
        const isLight = mode === 'light';
        document.body.classList.toggle('light-mode', isLight);
        localStorage.setItem('portfolio_theme_mode', mode);

        if (toggleBtn) {
            const icon = toggleBtn.querySelector('i');
            if (icon) {
                icon.className = isLight ? 'fas fa-moon' : 'fas fa-sun';
            }
            toggleBtn.setAttribute('title', isLight ? 'Passer en mode sombre' : 'Passer en mode clair');
        }

        if (window.portfolio3D) {
            window.portfolio3D.setColorMode(mode);
        }
    }

    applyMode(savedMode);

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const currentMode = document.body.classList.contains('light-mode') ? 'light' : 'dark';
            const newMode = currentMode === 'light' ? 'dark' : 'light';
            applyMode(newMode);
        });
    }
}

/* -------------------------------------------------------------
 * 2. COCKPIT HUB TAB NAVIGATION
 * ----------------------------------------------------------- */
function initCockpitTabs() {
    const tabs = document.querySelectorAll('.hub-tab');
    const panels = document.querySelectorAll('.hub-panel');
    const directLinks = document.querySelectorAll('[data-goto-tab]');

    function switchTab(tabId) {
        if (!tabId) return;

        // Update tabs state
        tabs.forEach(tab => {
            const isActive = tab.dataset.tab === tabId;
            tab.classList.toggle('active', isActive);
            tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });

        // Update panels with smooth transition
        panels.forEach(panel => {
            const isMatch = panel.id === `panel-${tabId}`;
            if (isMatch) {
                panel.classList.add('active');
                panel.removeAttribute('hidden');
                panel.scrollTop = 0;
            } else {
                panel.classList.remove('active');
                panel.setAttribute('hidden', 'true');
            }
        });

        // Animate Three.js Camera to corresponding 3D landmark
        if (window.portfolio3D) {
            window.portfolio3D.goToTab(tabId);
        }

        // If projects tab is active, trigger 3D carousel refresh
        if (tabId === 'projects' && window.projectsCarousel3D) {
            setTimeout(() => window.projectsCarousel3D.updateLayout(), 40);
        }

        if (history.replaceState) {
            history.replaceState(null, null, `#${tabId}`);
        }
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            switchTab(tab.dataset.tab);
        });
    });

    directLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            switchTab(link.dataset.gotoTab);
        });
    });

    // Check initial hash
    const initialHash = window.location.hash.replace('#', '');
    if (initialHash && document.getElementById(`panel-${initialHash}`)) {
        switchTab(initialHash);
    } else {
        switchTab('profile');
    }
}

/* -------------------------------------------------------------
 * 3. INFINITE CIRCULAR 3D SPATIAL CAROUSEL
 * ----------------------------------------------------------- */
class ProjectsCarousel3D {
    constructor() {
        this.stage = document.querySelector('.carousel-3d-stage');
        this.ring = document.querySelector('.carousel-3d-ring');
        this.cards = Array.from(document.querySelectorAll('.carousel-3d-card'));
        this.prevBtn = document.getElementById('carousel-prev');
        this.nextBtn = document.getElementById('carousel-next');
        this.counterEl = document.getElementById('carousel-counter');
        this.dotsContainer = document.getElementById('carousel-dots');
        this.filterBtns = document.querySelectorAll('.filter-btn');

        if (!this.stage || !this.ring || !this.cards.length) return;

        this.activeCards = [...this.cards];
        this.currentIndex = 0;
        this.isDragging = false;
        this.startX = 0;
        this.currentDragX = 0;
        this.hasMoved = false;

        this.initEvents();
        this.renderDots();
        this.updateLayout();
    }

    renderDots() {
        if (!this.dotsContainer) return;
        this.dotsContainer.innerHTML = '';
        this.activeCards.forEach((_, idx) => {
            const dot = document.createElement('button');
            dot.className = `carousel-dot ${idx === this.currentIndex ? 'active' : ''}`;
            dot.setAttribute('title', `Projet ${idx + 1}`);
            dot.addEventListener('click', () => {
                this.goToIndex(idx);
            });
            this.dotsContainer.appendChild(dot);
        });
    }

    initEvents() {
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prev());
        }
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.next());
        }

        // Pointer Drag (Mouse & Touch)
        const onPointerDown = (e) => {
            this.isDragging = true;
            this.hasMoved = false;
            this.startX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
            this.currentDragX = this.startX;
        };

        const onPointerMove = (e) => {
            if (!this.isDragging) return;
            const x = e.clientX || (e.touches && e.touches[0].clientX) || 0;
            const diff = x - this.startX;
            if (Math.abs(diff) > 10) {
                this.hasMoved = true;
            }
            this.currentDragX = x;
        };

        const onPointerUp = () => {
            if (!this.isDragging) return;
            this.isDragging = false;
            const diff = this.currentDragX - this.startX;
            if (this.hasMoved) {
                if (diff < -45) {
                    this.next();
                } else if (diff > 45) {
                    this.prev();
                }
            }
        };

        this.stage.addEventListener('mousedown', onPointerDown);
        window.addEventListener('mousemove', onPointerMove);
        window.addEventListener('mouseup', onPointerUp);

        this.stage.addEventListener('touchstart', onPointerDown, { passive: true });
        window.addEventListener('touchmove', onPointerMove, { passive: true });
        window.addEventListener('touchend', onPointerUp);

        // Click on Cards
        this.cards.forEach(card => {
            card.addEventListener('click', () => {
                if (this.hasMoved) return;
                const cardIndex = this.activeCards.indexOf(card);
                if (cardIndex === -1) return;

                if (cardIndex === this.currentIndex) {
                    openProjectModal(card.dataset.projectId);
                } else {
                    this.goToIndex(cardIndex);
                }
            });
        });

        // Filter Buttons
        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.dataset.filter;
                if (filter === 'all') {
                    this.activeCards = [...this.cards];
                } else {
                    this.activeCards = this.cards.filter(c => (c.dataset.category || '').includes(filter));
                }

                this.cards.forEach(c => {
                    const isVisible = this.activeCards.includes(c);
                    c.classList.toggle('filter-hidden', !isVisible);
                });

                this.currentIndex = 0;
                this.renderDots();
                this.updateLayout();
            });
        });

        window.addEventListener('resize', () => this.updateLayout());
    }

    prev() {
        if (!this.activeCards.length) return;
        this.currentIndex = (this.currentIndex - 1 + this.activeCards.length) % this.activeCards.length;
        this.updateLayout();
    }

    next() {
        if (!this.activeCards.length) return;
        this.currentIndex = (this.currentIndex + 1) % this.activeCards.length;
        this.updateLayout();
    }

    goToIndex(idx) {
        if (idx < 0 || idx >= this.activeCards.length) return;
        this.currentIndex = idx;
        this.updateLayout();
    }

    updateLayout() {
        const isMobile = window.innerWidth < 768;
        const radius = isMobile ? 310 : 460;
        const spacingAngle = isMobile ? 42 : 36;
        const total = this.activeCards.length;

        this.cards.forEach(card => {
            card.style.display = 'none';
            card.classList.remove('is-active', 'is-flank');
        });

        this.activeCards.forEach((card, i) => {
            // Infinite circular distance calculation
            let offset = i - this.currentIndex;
            while (offset > total / 2) offset -= total;
            while (offset < -total / 2) offset += total;

            // Only show cards within visible range (-3 to +3)
            if (Math.abs(offset) > 3) {
                card.style.display = 'none';
                return;
            }

            card.style.display = 'flex';

            const theta = offset * spacingAngle;
            const rad = (theta * Math.PI) / 180;

            const tx = Math.sin(rad) * radius * (isMobile ? 1.05 : 1.25);
            const tz = Math.cos(rad) * radius - radius;
            const rotY = -theta * 0.65;
            const scale = offset === 0 ? (isMobile ? 1.02 : 1.06) : Math.max(1 - Math.abs(offset) * 0.15, 0.7);
            const opacity = offset === 0 ? 1 : Math.max(1 - Math.abs(offset) * 0.32, 0.25);
            const zIndex = 100 - Math.abs(offset) * 10;

            card.style.zIndex = zIndex;
            card.style.opacity = opacity;
            card.style.pointerEvents = Math.abs(offset) <= 2 ? 'auto' : 'none';
            card.style.transform = `translate3d(${tx}px, 0px, ${tz}px) rotateY(${rotY}deg) scale(${scale})`;

            if (offset === 0) {
                card.classList.add('is-active');
            } else if (Math.abs(offset) === 1) {
                card.classList.add('is-flank');
            }
        });

        // Update counter & title
        if (this.counterEl && this.activeCards[this.currentIndex]) {
            const activeTitle = this.activeCards[this.currentIndex].querySelector('h3')?.textContent || '';
            const padIndex = String(this.currentIndex + 1).padStart(2, '0');
            const padTotal = String(total).padStart(2, '0');
            this.counterEl.innerHTML = `<span class="count-num">${padIndex} / ${padTotal}</span> • <strong>${activeTitle}</strong>`;
        }

        // Update dots
        if (this.dotsContainer) {
            const dots = this.dotsContainer.querySelectorAll('.carousel-dot');
            dots.forEach((dot, idx) => {
                dot.classList.toggle('active', idx === this.currentIndex);
            });
        }
    }
}

function init3DProjectsCarousel() {
    window.projectsCarousel3D = new ProjectsCarousel3D();
}

/* -------------------------------------------------------------
 * 4. DETAILED PROJECT INSPECTION MODAL
 * ----------------------------------------------------------- */
const projectDetailsData = {
    alpr: {
        title: "Automatic License Plate Recognition (ALPR)",
        category: "Computer Vision & Bas Niveau",
        badge: "C++ / Machine Learning",
        icon: "fas fa-car",
        metric: "Traitement < 380ms • 93% d'exactitude",
        context: "Développement from scratch d'une pipeline complète de localisation automatique de plaques d'immatriculation sans recourir à des réseaux neuronaux lourds, pour une exécution ultra-rapide sur cibles embarquées.",
        stack: ["C++", "Python", "OpenCV", "Random Forest", "CMake", "CI/CD"],
        highlights: [
            "Conception d'une bibliothèque sur-mesure 'MyCV' optimisant les convolutions matricielles et seuillages morphologiques.",
            "Prototypage algorithmique en Python puis portage bas niveau et vectorisation en C++.",
            "Classifieur Machine Learning Random Forest entraîné sur descripteurs de contours et contrastes locaux.",
            "Pipeline d'intégration continue CI/CD avec banc de tests de non-régression sur dataset diversifié."
        ]
    },
    dermscan: {
        title: "DermScan (IA Médicale)",
        category: "Intelligence Artificielle & Santé",
        badge: "Vision / Microservices",
        icon: "fas fa-heartbeat",
        metric: "Sensibilité > 85% • Règle ABCDE explicable",
        context: "Application distribuée d'aide au diagnostic précoce des lésions dermatologiques mélanocytaires, privilégiant l'explicabilité médicale par rapport aux modèles 'boîte noire'.",
        stack: ["Python", "OpenCV", "Scikit-Learn", "FastAPI", "RabbitMQ", "React", "Docker"],
        highlights: [
            "Pipeline de vision par ordinateur extrayant les descripteurs morphologiques (K-Means, PCA, moments invariants de Hu).",
            "Classification par Multi-Layer Perceptron (MLP) pondéré atteignant plus de 85% de sensibilité clinique.",
            "Architecture microservices asynchrone avec files de messages RabbitMQ pour absorber les pics de charge.",
            "Conteneurisation Docker complète et API REST FastAPI documentée (Swagger / OpenAPI)."
        ]
    },
    gpgpu: {
        title: "Filtre GStreamer (GPGPU CUDA)",
        category: "Calcul Haute Performance (HPC)",
        badge: "CUDA / GStreamer",
        icon: "fas fa-microchip",
        metric: "Accélération CUDA Graphs • Mémoire Pinned zero-copy",
        context: "Optimisation massive d'un filtre vidéo de détection de mouvement temps réel au sein d'un pipeline multimédia GStreamer en déportant les calculs matriciels sur GPU NVIDIA.",
        stack: ["C++", "CUDA", "GStreamer", "CUDA Graphs", "Zero-Copy", "Pinned Memory"],
        highlights: [
            "Implémentation de kernels CUDA personnalisés pour la soustraction de fond et le calcul de flux optique.",
            "Utilisation des CUDA Graphs pour réduire la latence de lancement des kernels à l'échelle du microseconde.",
            "Gestion avancée de la mémoire paginée (Pinned Host Memory) pour des transferts asynchrones ultra-rapides.",
            "Intégration d'un plugin GStreamer natif compatible avec des flux vidéo haute cadence."
        ]
    },
    fps3d: {
        title: "Jeu Multijoueur FPS (Unity)",
        category: "Jeux Vidéo & Réseau",
        badge: "Unity / C# / Réseau",
        icon: "fas fa-gamepad",
        metric: "Moteur physique temps réel • Synchronisation réseau UDP",
        context: "Développement d'un jeu de tir multijoueur à la première personne (FPS) avec synchronisation d'état réseau et modélisation spatiale dynamique.",
        stack: ["C#", "C++", "Unity", "Network Sync", "Shader Graph", "Blender"],
        highlights: [
            "Modélisation et texturation des environnements et personnages avec animations cinématiques fluides.",
            "Système balistique avec calcul de trajectoire de projectiles et raycasting précis pour les collisions.",
            "Architecture réseau client-serveur avec compensation du lag et interpolation des positions distantes.",
            "Gestion des états de jeu, scores dynamiques et effets visuels de particules."
        ]
    },
    tiger: {
        title: "Compilateur Tiger (LLVM)",
        category: "Génie Logiciel & Théorie des Langages",
        badge: "C++ / LLVM IR",
        icon: "fas fa-code-branch",
        metric: "Génération LLVM IR • Optimisations d'échappement",
        context: "Conception complète en équipe d'un compilateur moderne pour le langage orienté objet Tiger, de la grammaire lexicale jusqu'au code machine exécutable.",
        stack: ["C++", "LLVM IR", "Flex", "Bison", "AST", "Architecture Modulaire"],
        highlights: [
            "Analyse lexico-syntaxique avec Flex/Bison produisant un arbre de syntaxe abstraite (AST) typé.",
            "Vérification sémantique complète (typage statique, gestion des portées lexicales, classes et héritage).",
            "Génération de code intermédiaire LLVM IR optimisé.",
            "Passes d'optimisation avancées : inlining de fonctions et analyse d'échappement des variables."
        ]
    },
    shell42: {
        title: "Interpréteur de Commandes Unix (42SH)",
        category: "Systèmes d'Exploitation",
        badge: "C / POSIX",
        icon: "fas fa-terminal",
        metric: "Conforme POSIX • Gestion de jobs & AST",
        context: "Développement en langage C d'un interpréteur de commandes Unix complet et conforme aux spécifications standard POSIX.",
        stack: ["C", "POSIX", "AST Parser", "Job Control", "Pipes", "Subshells"],
        highlights: [
            "Lexer/parser récursif avec construction d'un arbre d'exécution syntaxique robuste.",
            "Gestion complète des processus en arrière-plan, signaux Unix et contrôle des jobs (fg, bg).",
            "Redirections d'entrées/sorties complexes, pipes en cascade et gestion des subshells.",
            "Expansion des variables d'environnement, alias et builtins internes (cd, exit, history)."
        ]
    },
    bazaar: {
        title: "EpiBazaar",
        category: "Systèmes Distribués",
        badge: "Java / Kafka / Microservices",
        icon: "fas fa-network-wired",
        metric: "Microservices asynchrones • Streaming Apache Kafka",
        context: "Architecture backend distribuée pour un jeu de simulation économique en temps réel avec synchronisation d'inventaires et de transactions.",
        stack: ["Java", "Quarkus", "Hibernate", "Apache Kafka", "Docker", "REST API"],
        highlights: [
            "Découpage en microservices spécialisés (authentification, boutique, inventaire, joueur).",
            "Communication asynchrone 'Event-Driven' via des topics Apache Kafka garantissant la cohérence des données.",
            "Framework Quarkus pour des temps de démarrage instantanés et une empreinte mémoire minimale.",
            "Tests d'intégration automatisés et persistance relationnelle avec Hibernate ORM."
        ]
    },
    carpool: {
        title: "Application de Covoiturage",
        category: "Applications Logicielles",
        badge: "Java / Desktop",
        icon: "fas fa-route",
        metric: "Temps réel • Géolocalisation & Réservation",
        context: "Conception d'une application de covoiturage temps réel pour la communauté étudiante avec réservation instantanée, alertes de trajets et tableau de bord.",
        stack: ["Java", "JavaFX", "Scene Builder", "SQLite", "Notifications"],
        highlights: [
            "Interface dynamique développée sous JavaFX et Scene Builder respectant le pattern MVC.",
            "Calcul d'itinéraires et mise en relation automatique entre conducteurs et passagers.",
            "Système de notifications et d'alertes temps réel sur les changements d'horaires.",
            "Persistance locale sécurisée et gestion des profils utilisateurs avec évaluations."
        ]
    },
    ocr: {
        title: "OCR & Résolution de Sudoku",
        category: "Vision & Réseaux de Neurones",
        badge: "C / Deep Learning from Scratch",
        icon: "fas fa-brain",
        metric: "Perceptron multicouche en C • Détection de grille",
        context: "Projet complet d'intelligence artificielle alliant traitement d'image matriciel et réseau de neurones from scratch en C pour résoudre une grille de Sudoku photographiée.",
        stack: ["C", "Réseau de Neurones", "Traitement d'Image", "Backpropagation", "Backtracking"],
        highlights: [
            "Filtres de binarisation adaptative, détection de lignes de Hough et redressement de perspective.",
            "Perceptron multicouche codé from scratch en pur C avec rétropropagation du gradient pour la reconnaissance des chiffres.",
            "Algorithme de résolution automatique par backtracking optimisé résolvant la grille en quelques millisecondes.",
            "Incrustation en réalité augmentée de la solution directement sur l'image source."
        ]
    }
};

function openProjectModal(projectId) {
    const data = projectDetailsData[projectId];
    if (!data) return;

    let modal = document.getElementById('project-detail-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'project-detail-modal';
        modal.className = 'project-modal-backdrop';
        document.body.appendChild(modal);
    }

    const techPills = data.stack.map(s => `<span class="modal-tech-pill">${s}</span>`).join('');
    const highlights = data.highlights.map(h => `<li><i class="fas fa-check-circle"></i> <span>${h}</span></li>`).join('');

    modal.innerHTML = `
        <div class="project-modal-card">
            <button class="modal-close-btn" aria-label="Fermer"><i class="fas fa-times"></i></button>
            <div class="modal-top-bar">
                <div class="modal-icon-badge">
                    <i class="${data.icon}"></i>
                </div>
                <div>
                    <span class="modal-category">${data.category}</span>
                    <h2 class="modal-title">${data.title}</h2>
                </div>
            </div>

            <div class="modal-metric-badge">
                <i class="fas fa-bolt"></i> ${data.metric}
            </div>

            <p class="modal-desc">${data.context}</p>

            <div class="modal-section-title">
                <i class="fas fa-layer-group"></i> Technologies & Outils
            </div>
            <div class="modal-tech-list">
                ${techPills}
            </div>

            <div class="modal-section-title">
                <i class="fas fa-award"></i> Points Clés & Innovations Techniques
            </div>
            <ul class="modal-highlights">
                ${highlights}
            </ul>
        </div>
    `;

    modal.classList.add('active');
    document.body.classList.add('modal-open');

    modal.querySelector('.modal-close-btn').addEventListener('click', closeProjectModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeProjectModal();
    });
}

function closeProjectModal() {
    const modal = document.getElementById('project-detail-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.classList.remove('modal-open');
    }
}

window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeProjectModal();
        closePdfModal();
    }
});

/* -------------------------------------------------------------
 * 5. QUICK-COPY TOAST NOTIFICATION
 * ----------------------------------------------------------- */
function initCopyActions() {
    const copyTriggers = document.querySelectorAll('[data-copy]');
    copyTriggers.forEach(el => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            const textToCopy = el.dataset.copy;
            if (navigator.clipboard) {
                navigator.clipboard.writeText(textToCopy).then(() => {
                    showToast(`${textToCopy} copié dans le presse-papier !`);
                });
            }
        });
    });
}

function showToast(message) {
    let toast = document.querySelector('.cyber-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'cyber-toast';
        document.body.appendChild(toast);
    }
    toast.innerHTML = `<i class="fas fa-check-circle"></i> <span>${message}</span>`;
    toast.classList.add('show');

    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => {
        toast.classList.remove('show');
    }, 2400);
}

/* -------------------------------------------------------------
 * 6. KEYBOARD SHORTCUTS FOR NAVIGATION
 * ----------------------------------------------------------- */
function initKeyboardShortcuts() {
    const tabOrder = ['profile', 'projects', 'experience', 'education', 'skills', 'interests'];

    window.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

        const activeTab = document.querySelector('.hub-tab.active')?.dataset.tab;
        const modalOpen = document.body.classList.contains('modal-open');

        if (activeTab === 'projects' && !modalOpen && window.projectsCarousel3D) {
            if (e.key === 'ArrowRight') {
                window.projectsCarousel3D.next();
                return;
            } else if (e.key === 'ArrowLeft') {
                window.projectsCarousel3D.prev();
                return;
            } else if (e.key === 'Enter') {
                const activeCard = window.projectsCarousel3D.activeCards[window.projectsCarousel3D.currentIndex];
                if (activeCard) openProjectModal(activeCard.dataset.projectId);
                return;
            }
        }

        if (e.key >= '1' && e.key <= '6') {
            const targetIndex = parseInt(e.key) - 1;
            if (tabOrder[targetIndex]) {
                const targetTab = document.querySelector(`.hub-tab[data-tab="${tabOrder[targetIndex]}"]`);
                if (targetTab) targetTab.click();
            }
        }
    });
}

/* -------------------------------------------------------------
 * 7. PDF RESUME PREVIEW MODAL
 * ----------------------------------------------------------- */
function initPdfPreviewModal() {
    const triggers = document.querySelectorAll('[data-preview-pdf]');
    triggers.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const pdfUrl = btn.dataset.previewPdf;
            const currentLang = localStorage.getItem('preferredLanguage') || 'fr';
            const title = currentLang === 'en'
                ? (btn.dataset.titleEn || 'Resume Preview')
                : (btn.dataset.titleFr || 'Aperçu du CV');
            openPdfModal(pdfUrl, title);
        });
    });
}

function openPdfModal(pdfUrl, title) {
    let modal = document.getElementById('pdf-preview-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'pdf-preview-modal';
        modal.className = 'pdf-modal-backdrop';
        document.body.appendChild(modal);
    }

    const currentLang = localStorage.getItem('preferredLanguage') || 'fr';
    const downloadText = currentLang === 'en' ? 'Download' : 'Télécharger';
    const newTabText = currentLang === 'en' ? 'New Tab' : 'Nouvel onglet';
    const closeText = currentLang === 'en' ? 'Close' : 'Fermer';

    modal.innerHTML = `
        <div class="pdf-modal-container">
            <div class="pdf-modal-header">
                <div class="pdf-modal-title-wrap">
                    <i class="fas fa-file-pdf"></i>
                    <h3 class="pdf-modal-title">${title}</h3>
                </div>
                <div class="pdf-modal-actions">
                    <a href="${pdfUrl}" download class="pdf-action-btn pdf-download-btn" title="${downloadText}">
                        <i class="fas fa-download"></i>
                        <span>${downloadText}</span>
                    </a>
                    <a href="${pdfUrl}" target="_blank" rel="noopener noreferrer" class="pdf-action-btn pdf-external-btn" title="${newTabText}">
                        <i class="fas fa-external-link-alt"></i>
                        <span>${newTabText}</span>
                    </a>
                    <button class="pdf-modal-close-btn" aria-label="${closeText}" title="${closeText}">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>
            <div class="pdf-modal-body">
                <iframe src="${pdfUrl}#toolbar=1&navpanes=0&view=FitH" class="pdf-iframe" title="${title}"></iframe>
            </div>
        </div>
    `;

    modal.classList.add('active');
    document.body.classList.add('modal-open');

    modal.querySelector('.pdf-modal-close-btn').addEventListener('click', closePdfModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closePdfModal();
    });
}

function closePdfModal() {
    const modal = document.getElementById('pdf-preview-modal');
    if (modal) {
        modal.classList.remove('active');
        const projectModal = document.getElementById('project-detail-modal');
        if (!projectModal || !projectModal.classList.contains('active')) {
            document.body.classList.remove('modal-open');
        }
        const iframe = modal.querySelector('iframe');
        if (iframe) iframe.src = 'about:blank';
    }
}