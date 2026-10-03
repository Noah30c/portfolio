// Translations for Noah Civilise 3D Portfolio (Cockpit Edition with 3D Spatial Carousel)
const translations = {
    fr: {
        "header.brand": "<strong>Noah Civilise</strong> • EPITA 5ᵉ Année",

        "nav.profile": "Profil",
        "nav.experience": "Expérience",
        "nav.projects": "Projets",
        "nav.education": "Formation",
        "nav.skills": "Compétences",
        "nav.interests": "Centres d'intérêt",

        "panel.badge.projects": "RÉALISATIONS",
        "panel.badge.experience": "PARCOURS",
        "panel.badge.education": "DIPLÔME",
        "panel.badge.skills": "EXPERTISE",
        "panel.badge.interests": "ENGAGEMENT",

        "hero.badge": "Ingénieur en IA, Vision par ordinateur et traitement d'image",
        "hero.title": "Étudiant en 5ᵉ année à EPITA",
        "hero.subtitle": "Intelligence Artificielle • Vision par Ordinateur • Traitement d'Image • Rendu & GPU",
        "hero.description": "Je recherche mon stage de fin d'études de 6 mois en Intelligence Artificielle ou en Traitement d'Image à partir de février 2027 sur Bordeaux ou Paris. Curieux, adaptable et motivé, je conçois des systèmes performants alliant rendu temps réel, vision algorithmique et architectures d'IA modernes.",
        "hero.cta": "Découvrir mes projets",
        "hero.cta.exp": "Mon parcours",
        "hero.cv.title": "CV à télécharger :",
        "hero.cv.fr": "Aperçu CV (FR)",
        "hero.cv.en": "Aperçu CV (EN)",
        "hero.stat.school": "EPITA – Majeure IMAGE",
        "hero.stat.gpa": "GPA : 4.0 / 4.0",
        "hero.stat.internship": "Stage : Fév 2027 (6 mois)",
        "hero.stat.location": "Bordeaux / Paris",

        "experience.title": "Expérience Professionnelle",
        "experience.vr.title": "Projet de Fin d'Études (PFEE) – Ingénieur Réalité Virtuelle",
        "experience.vr.company": "Dassault Systèmes",
        "experience.vr.period": "Fév. 2026 – Fév. 2027",
        "experience.vr.subtitle": "Conception d'une Minimap WebXR interactive pour maquettes 3D industrielles complexes.",
        "experience.vr.item1": "Développement WebXR fluide à <strong>90 FPS</strong> (Three.js, TypeScript, Vite) pour l'exploration de maquettes CAO.",
        "experience.vr.item2": "Algorithmes de <strong>World Detection</strong> (détection d'étages, volumes de collision) et calculs asynchrones via <strong>WebWorkers</strong>.",

        "experience.bpce.title": "Data Science & Generative AI Intern",
        "experience.bpce.company": "Groupe BPCE (CEGC)",
        "experience.bpce.period": "Sept. 2025 – Janv. 2026",
        "experience.bpce.subtitle": "Pipeline RAG from scratch, fiabilisation MLOps et automatisation d'analyses financières.",
        "experience.bpce.item1": "Architecture <strong>RAG & LLM</strong> from scratch sur des centaines de bilans PDF (SentenceTransformer, Qdrant, Pydantic).",
        "experience.bpce.item2": "Fiabilisation MLOps : validation stricte des données et suivi des métriques de confiance (<strong>77.1%</strong>) sur Streamlit.",
        "experience.bpce.item3": "Automatisation NLP de contrôles bilans/Excel (<strong>&gt;60% de gain de temps</strong>) et orchestration Dataiku.",

        "experience.tutor.title": "Tuteur en Informatique & Mathématiques",
        "experience.tutor.company": "BackToBasics – EPITA",
        "experience.tutor.period": "2022 – 2025",
        "experience.tutor.subtitle": "Accompagnement pédagogique et transmission technique aux étudiants de premier cycle.",
        "experience.tutor.item1": "Tutorat individuel et collectif en algorithmique avancée, structures de données et programmation (C, C++, Python).",
        "experience.tutor.item2": "Animation d'ateliers méthodologiques, revues de code et préparation aux projets d'ingénierie.",
        "experience.tutor.tag.algo": "Algorithmique",
        "experience.tutor.tag.math": "Mathématiques",

        "projects.title": "Projets & Réalisations",
        "projects.filter.all": "Tous les projets (9)",
        "projects.filter.ai": "IA & Vision",
        "projects.filter.vr": "WebXR & Rendu",
        "projects.filter.sys": "Systèmes & C++",
        "projects.carousel.hint": "Faites glisser ou naviguez avec les flèches pour faire défiler • Cliquez au centre pour inspecter",
        "projects.carousel.viewDetails": "Inspecter le projet",
        "projects.modal.close": "Fermer",
        "projects.modal.stack": "Technologies & Outils",
        "projects.modal.impact": "Points Clés & Résultats Techniques",

        "projects.alpr.title": "Automatic License Plate Recognition (ALPR)",
        "projects.alpr.desc": "Pipeline from scratch de détection de plaques sans Deep Learning. Prototypage Python et portage C++ optimisé (librairie MyCV, Random Forest, CI/CD).",
        "projects.alpr.metric": "Traitement < 380ms • 93% d'exactitude",

        "projects.dermscan.title": "DermScan (IA Médicale)",
        "projects.dermscan.desc": "Application d'aide au diagnostic dermatologique. Pipeline vision et ML explicable via modèles experts (FastAPI, RabbitMQ, Docker).",
        "projects.dermscan.metric": "Sensibilité > 85% • Règle ABCDE",

        "projects.gpgpu.title": "Filtre GStreamer (CUDA)",
        "projects.gpgpu.desc": "Optimisation GPGPU d'un filtre vidéo de détection de mouvement. Traitement flux temps réel accéléré par CUDA (CUDA Graphs, mémoire Pinned).",
        "projects.gpgpu.metric": "CUDA Graphs • Pinned Mem",

        "projects.3d.title": "Jeu Multijoueur FPS (Unity)",
        "projects.3d.desc": "FPS multijoueur sous Unity avec modélisation d'environnements, animations de personnages et synchronisation réseau.",
        "projects.3d.metric": "Physique Temps Réel • Sync Réseau UDP",
        "projects.category.unity": "Moteur Unity",

        "projects.tiger.title": "Compilateur Tiger (LLVM)",
        "projects.tiger.desc": "Compilateur complet pour le langage objet Tiger : analyse lexico-syntaxique, typage et génération LLVM IR optimisée.",
        "projects.tiger.metric": "LLVM IR • Optimisations AST",

        "projects.42sh.title": "Interpréteur Unix (42SH)",
        "projects.42sh.desc": "Shell Unix POSIX complet en C : parsing AST, gestion de jobs et processus, redirections et pipelines.",
        "projects.42sh.metric": "POSIX • Job Control & AST",

        "projects.bazaar.title": "EpiBazaar",
        "projects.bazaar.desc": "Backend distribué pour simulation économique. Microservices avec Quarkus, Hibernate et streaming Apache Kafka.",
        "projects.bazaar.metric": "Streaming Kafka • Quarkus",

        "projects.carpool.title": "Application de Covoiturage",
        "projects.carpool.desc": "Plateforme de covoiturage avec géolocalisation, alertes interactives et interface dynamique en Java.",
        "projects.carpool.metric": "Temps réel • Géolocalisation",

        "projects.ocr.title": "OCR & Résolution de Sudoku",
        "projects.ocr.desc": "Reconnaissance optique de caractères et résolution automatique de grilles avec réseau de neurones en C.",
        "projects.ocr.metric": "Neural Net en C • Traitement d'Image",

        "education.title": "Formation Académique",
        "education.epita.title": "EPITA – École d'ingénieurs en informatique",
        "education.epita.desc": "5ᵉ année – Majeure IMAGE (Traitement d’images, vision par ordinateur, deep learning, IA, calcul GPU).",
        "education.epita.grade": "GPA : 4.0 / 4.0",
        "education.epita.location": "Le Kremlin-Bicêtre, France",

        "education.spain.title": "Échange académique international",
        "education.spain.desc": "Universidad del País Vasco – Faculté d'informatique.",
        "education.spain.location": "San Sebastián, Espagne",

        "education.bac.title": "Baccalauréat Scientifique",
        "education.bac.desc": "Lycée Descartes",
        "education.bac.grade": "Mention Très Bien avec les spécialités Mathématiques et NSI",

        "skills.title": "Compétences & Technologies",
        "skills.prog": "Langages de programmation",
        "skills.tools": "3D, Vision & IA",
        "skills.methods": "Méthodologies & MLOps",
        "skills.testing": "Testing & Qualité",
        "skills.languages": "Langues",
        "skills.soft": "Soft Skills",

        "skills.chip.unittests": "Tests unitaires C/C++",
        "skills.chip.ci": "Intégration continue",
        "skills.chip.french": "Français (natif)",
        "skills.chip.english": "Anglais (TOEIC 900/990)",
        "skills.chip.spanish": "Espagnol (B1)",
        "skills.chip.adaptability": "Adaptabilité",
        "skills.chip.teamwork": "Travail d'équipe",
        "skills.chip.autonomy": "Autonomie",
        "skills.chip.problemsolving": "Résolution de problèmes",

        "interests.title": "Centres d'Intérêt",
        "interests.bmx.title": "BMX",
        "interests.bmx": "Pratique en compétition, co-fondateur d'une association sportive pour les voyages de groupe et échanges culturels.",
        "interests.travel.title": "Voyages & Culture",
        "interests.travel": "Exploration internationale, ouverture d'esprit et curiosité intellectuelle.",
        "interests.motorsports.title": "Sports Mécaniques",
        "interests.motorsports": "Passionné de MotoGP et Formule 1 (télémétrie, aérodynamique et ingénierie de pointe).",

        "profile.avatar.title": "Voir mon profil LinkedIn (nouvel onglet)",
        "profile.contact.email": "Envoyer un email à civilise.noah@gmail.com",
        "profile.contact.phone": "Appeler le +33 6 60 39 97 86",
        "carousel.prev": "Projet précédent",
        "carousel.next": "Projet suivant",

        "footer.rights": "© 2026 Noah Civilise • Tous droits réservés."
    },
    en: {
        "header.brand": "<strong>Noah Civilise</strong> • EPITA 5th Year",

        "nav.profile": "Profile",
        "nav.experience": "Experience",
        "nav.projects": "Projects",
        "nav.education": "Education",
        "nav.skills": "Skills",
        "nav.interests": "Interests",

        "panel.badge.projects": "PROJECTS",
        "panel.badge.experience": "TIMELINE",
        "panel.badge.education": "ACADEMICS",
        "panel.badge.skills": "EXPERTISE",
        "panel.badge.interests": "INTERESTS",

        "hero.badge": "Engineer in AI, Computer Vision & Image Processing",
        "hero.title": "5th-year student at EPITA",
        "hero.subtitle": "Artificial Intelligence • Computer Vision • Image Processing • Rendering & GPU",
        "hero.description": "I am seeking my 6-month end-of-studies internship in Artificial Intelligence or Image Processing starting February 2027 in Bordeaux or Paris. Curious, adaptable, and motivated, I engineer high-performance systems combining real-time rendering, computer vision, and modern AI architectures.",
        "hero.cta": "Explore Projects",
        "hero.cta.exp": "My Background",
        "hero.cv.title": "Download Resume:",
        "hero.cv.fr": "French Resume (Preview)",
        "hero.cv.en": "English Resume (Preview)",
        "hero.stat.school": "EPITA – IMAGE Major",
        "hero.stat.gpa": "GPA: 4.0 / 4.0",
        "hero.stat.internship": "Internship: Feb 2027 (6 mo.)",
        "hero.stat.location": "Bordeaux / Paris",

        "experience.title": "Professional Experience",
        "experience.vr.title": "End-of-Studies Project (PFEE) – Virtual Reality Engineer",
        "experience.vr.company": "Dassault Systèmes",
        "experience.vr.period": "Feb. 2026 – Feb. 2027",
        "experience.vr.subtitle": "Design of an interactive WebXR VR Minimap for complex industrial CAD scenes.",
        "experience.vr.item1": "Smooth <strong>90 FPS</strong> WebXR development (Three.js, TypeScript, Vite) for engineering model visualization.",
        "experience.vr.item2": "3D <strong>World Detection</strong> algorithms (floor detection, collision boundaries) with async compute offloaded to <strong>WebWorkers</strong>.",

        "experience.bpce.title": "Data Science & Generative AI Intern",
        "experience.bpce.company": "Groupe BPCE (CEGC)",
        "experience.bpce.period": "Sept. 2025 – Jan. 2026",
        "experience.bpce.subtitle": "From-scratch RAG pipeline, MLOps validation, and financial analysis automation.",
        "experience.bpce.item1": "Engineered from-scratch <strong>RAG & LLM</strong> pipeline on hundreds of PDF balance sheets (SentenceTransformer, Qdrant, Pydantic).",
        "experience.bpce.item2": "MLOps reliability: strict structured validation and confidence metric tracking (<strong>77.1%</strong>) on a Streamlit dashboard.",
        "experience.bpce.item3": "NLP automated control cross-referencing Excel & PDF reports (<strong>&gt;60% time savings</strong>) with Dataiku orchestration.",

        "experience.tutor.title": "Computer Science & Mathematics Tutor",
        "experience.tutor.company": "BackToBasics – EPITA",
        "experience.tutor.period": "2022 – 2025",
        "experience.tutor.subtitle": "Academic mentoring and technical pedagogy for undergraduate engineering students.",
        "experience.tutor.item1": "Individual and group tutoring in advanced algorithms, data structures, and low-level programming (C, C++, Python).",
        "experience.tutor.item2": "Methodological workshops, code reviews, and problem-solving coaching for engineering projects.",
        "experience.tutor.tag.algo": "Algorithms",
        "experience.tutor.tag.math": "Mathematics",

        "projects.title": "Projects & Realizations",
        "projects.filter.all": "All Projects (9)",
        "projects.filter.ai": "AI & Vision",
        "projects.filter.vr": "WebXR & Rendering",
        "projects.filter.sys": "Systems & C++",
        "projects.carousel.hint": "Drag or navigate with arrows to browse • Click center card to inspect",
        "projects.carousel.viewDetails": "Inspect Project",
        "projects.modal.close": "Close",
        "projects.modal.stack": "Technologies & Tools",
        "projects.modal.impact": "Key Technical Highlights & Results",

        "projects.alpr.title": "Automatic License Plate Recognition (ALPR)",
        "projects.alpr.desc": "From-scratch license plate detection pipeline without Deep Learning. Prototyped in Python and ported to low-level optimized C++ (custom MyCV library, Random Forest, CI/CD).",
        "projects.alpr.metric": "Processing < 380ms • 93% accuracy",

        "projects.dermscan.title": "DermScan (Medical AI)",
        "projects.dermscan.desc": "Dermoscopic diagnostic aid app. Computer vision and explainable ML pipeline using expert clinical models (FastAPI, RabbitMQ, Docker).",
        "projects.dermscan.metric": "Sensitivity > 85% • ABCDE Rule",

        "projects.gpgpu.title": "GStreamer Filter (CUDA)",
        "projects.gpgpu.desc": "GPGPU motion detection video filter optimization. Real-time streaming pipeline powered by CUDA acceleration (CUDA Graphs, Pinned memory).",
        "projects.gpgpu.metric": "CUDA Graphs • Pinned Mem",

        "projects.3d.title": "Multiplayer FPS Game (Unity)",
        "projects.3d.desc": "Multiplayer FPS in Unity with custom environment modeling, character animations, and authoritative networked synchronization.",
        "projects.3d.metric": "Real-Time Physics • UDP Network Sync",
        "projects.category.unity": "Unity Engine",

        "projects.tiger.title": "Tiger Compiler (LLVM)",
        "projects.tiger.desc": "Complete compiler for the object-oriented Tiger language: Lexer/Parser with Flex/Bison, semantic verification, and optimized LLVM IR generation.",
        "projects.tiger.metric": "LLVM IR • AST Optimizations",

        "projects.42sh.title": "Unix Command Interpreter (42SH)",
        "projects.42sh.desc": "POSIX-compliant Unix shell in C: AST parser, job control, piping, I/O redirection, subshells, and custom builtins.",
        "projects.42sh.metric": "POSIX • Job Control & AST",

        "projects.bazaar.title": "EpiBazaar",
        "projects.bazaar.desc": "Distributed backend for economic simulation game. Microservices built with Quarkus, Hibernate, REST APIs, and asynchronous Apache Kafka streams.",
        "projects.bazaar.metric": "Kafka Streaming • Quarkus",

        "projects.carpool.title": "Carpooling Application",
        "projects.carpool.desc": "Real-time carpooling platform with booking system, geolocation, interactive alerts, and dynamic Java GUI.",
        "projects.carpool.metric": "Real-Time • Geolocation",

        "projects.ocr.title": "OCR & Sudoku Solver",
        "projects.ocr.desc": "Optical character recognition and automated Sudoku puzzle solver using a custom C neural network and digital image filtering.",
        "projects.ocr.metric": "C Neural Net • Image Processing",

        "education.title": "Academic Education",
        "education.epita.title": "EPITA – School of Computer Engineering",
        "education.epita.desc": "5th year – Major in IMAGE (Image processing & synthesis, computer vision, deep learning, AI, GPU computing).",
        "education.epita.grade": "GPA: 4.0 / 4.0",
        "education.epita.location": "Le Kremlin-Bicêtre, France",

        "education.spain.title": "International Academic Exchange",
        "education.spain.desc": "Universidad del País Vasco – Faculty of Computer Science.",
        "education.spain.location": "San Sebastián, Spain",

        "education.bac.title": "Scientific Baccalaureate",
        "education.bac.desc": "Lycée Descartes",
        "education.bac.grade": "Highest Honors (Mention Très Bien) with Mathematics & Computer Science",

        "skills.title": "Skills & Technologies",
        "skills.prog": "Programming Languages",
        "skills.tools": "3D, Vision & AI",
        "skills.methods": "Methodologies & MLOps",
        "skills.testing": "Testing & Code Quality",
        "skills.languages": "Languages",
        "skills.soft": "Soft Skills",

        "skills.chip.unittests": "C/C++ Unit Testing",
        "skills.chip.ci": "Continuous Integration",
        "skills.chip.french": "French (Native)",
        "skills.chip.english": "English (TOEIC 900/990)",
        "skills.chip.spanish": "Spanish (B1)",
        "skills.chip.adaptability": "Adaptability",
        "skills.chip.teamwork": "Teamwork",
        "skills.chip.autonomy": "Autonomy & Rigor",
        "skills.chip.problemsolving": "Problem Solving",

        "interests.title": "Interests & Passions",
        "interests.bmx.title": "BMX",
        "interests.bmx": "Competitive riding, co-founder of a sports association organizing group expeditions and cultural exchanges.",
        "interests.travel.title": "Travel & Cultures",
        "interests.travel": "Global exploration, open-mindedness, and intellectual curiosity.",
        "interests.motorsports.title": "Motorsports",
        "interests.motorsports": "Passionate about MotoGP & Formula 1 (telemetry, aerodynamics, and high-performance engineering).",

        "profile.avatar.title": "View LinkedIn Profile (new tab)",
        "profile.contact.email": "Send an email to civilise.noah@gmail.com",
        "profile.contact.phone": "Call +33 6 60 39 97 86",
        "carousel.prev": "Previous project",
        "carousel.next": "Next project",

        "footer.rights": "© 2026 Noah Civilise • All rights reserved."
    }
};

let currentLanguage = 'fr';

function updateContent(lang) {
    currentLanguage = lang;

    // Translate text/HTML contents
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                if (element.getAttribute('placeholder')) {
                    element.setAttribute('placeholder', translations[lang][key]);
                } else {
                    element.value = translations[lang][key];
                }
            } else {
                const val = translations[lang][key];
                if (/<[a-z][\s\S]*>/i.test(val)) {
                    element.innerHTML = val;
                } else {
                    element.textContent = val;
                }
            }
        }
    });

    // Translate title attributes
    document.querySelectorAll('[data-i18n-title]').forEach(element => {
        const key = element.getAttribute('data-i18n-title');
        if (translations[lang] && translations[lang][key]) {
            element.setAttribute('title', translations[lang][key]);
        }
    });

    // Translate aria-label attributes
    document.querySelectorAll('[data-i18n-aria]').forEach(element => {
        const key = element.getAttribute('data-i18n-aria');
        if (translations[lang] && translations[lang][key]) {
            element.setAttribute('aria-label', translations[lang][key]);
        }
    });

    // Active state on language switcher buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.id === `${lang}-btn`);
    });

    // Update 3D projects carousel counter if available
    if (window.projectsCarousel3D && typeof window.projectsCarousel3D.updateLayout === 'function') {
        window.projectsCarousel3D.updateLayout();
    }

    localStorage.setItem('preferredLanguage', lang);
}

document.addEventListener('DOMContentLoaded', () => {
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'fr';
    updateContent(savedLanguage);

    const frBtn = document.getElementById('fr-btn');
    const enBtn = document.getElementById('en-btn');

    if (frBtn) {
        frBtn.addEventListener('click', () => {
            updateContent('fr');
        });
    }

    if (enBtn) {
        enBtn.addEventListener('click', () => {
            updateContent('en');
        });
    }
});