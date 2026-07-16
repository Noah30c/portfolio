// Translations
const translations = {
    fr: {
        "nav.about": "À propos",
        "nav.education": "Formation",
        "nav.skills": "Compétences",
        "nav.projects": "Projets",
        "nav.experience": "Expérience",
        "nav.interests": "Centres d'intérêt",

        "hero.title": "Étudiant en 5ᵉ année à EPITA, École d'ingénieurs en informatique",
        "hero.description": "Je recherche mon stage de fin d'études en Intelligence Artificielle ou en Traitement d'Image sur Bordeaux ou Paris. Curieux, adaptable et motivé, je souhaite approfondir mes compétences dans ces domaines.",
        "hero.cta": "Voir mes projets",
        "hero.cv.title": "Télécharger mon CV :",
        "hero.cv.fr": "Version Française",
        "hero.cv.en": "Version Anglaise",

        "about.title": "À propos",
        "about.description": "Passionné par les technologies émergentes, je suis actuellement en 5ème année à l'EPITA. Mon expertise s'étend de la conception d'architectures logicielles à l'application de techniques d'intelligence artificielle et de traitement d'image pour résoudre des problèmes complexes. Particulièrement intéressé par le machine learning et l'IA, je m'investis dans des projets innovants qui combinent ces domaines. Mon parcours est porté par une curiosité insatiable et un désir constant d'améliorer mes compétences techniques en relevant de nouveaux défis. Je recherche activement mon stage de fin d'études dans le domaine de l'IA ou du traitement d'image sur Bordeaux ou Paris.",

        "education.title": "Formation",
        "education.epita.title": "EPITA – École d'ingénieurs en informatique",
        "education.epita.desc": "5ème année en ingénierie informatique",
        "education.epita.location": "Le Kremlin-Bicêtre",

        "education.spain.title": "Échange académique",
        "education.spain.desc": "Universidad del País Vasco",
        "education.spain.location": "San Sebastián, Espagne",
        "education.bac.title": "Baccalauréat Scientifique",
        "education.bac.desc": "Lycée Descartes",
        "education.bac.grade": "Mention Très Bien avec les spécialités Mathématiques et NSI",

        "skills.title": "Compétences",
        "skills.prog": "Langages de programmation",
        "skills.tools": "Outils de développement",
        "skills.methods": "Méthodologies",
        "skills.testing": "Testing",
        "skills.test.desc": "Tests unitaires et fonctionnels (C, Python, Bash, Java)",
        "skills.languages": "Langues",
        "skills.lang.fr": "Français (natif)",
        "skills.lang.en": "Anglais (TOEIC 900/990)",
        "skills.lang.es": "Espagnol (B1)",
        "skills.soft": "Soft skills",
        "skills.soft.adapt": "Adaptabilité",
        "skills.soft.team": "Travail d'équipe",
        "skills.soft.auto": "Autonomie",
        "skills.soft.problem": "Résolution de problèmes",
        "skills.misc": "Divers",
        "skills.misc.license": "Permis A2 & B",
        "skills.methods.project": "Gestion de projet",

        "projects.title": "Projets",
        "projects.alpr.title": "Automatic License Plate Recognition (ALPR)",
        "projects.alpr.desc": "Développement \"from scratch\" d'une pipeline de localisation automatique de plaques d'immatriculation sans Deep Learning. Prototypage en Python puis portage bas niveau en C++ pour l'optimisation (création d'une librairie sur-mesure MyCV, Machine Learning avec Random Forest, CI/CD). Traitement < 380ms avec 93% d'exactitude lors du portage.",
        "projects.42sh.title": "Interpréteur de Commandes Unix (42SH)",
        "projects.42sh.desc": "Développement d'un interpréteur de commandes Unix en C. Implémentation des fonctions telles que le parsing de commandes, la gestion de fichiers, la navigation dans les répertoires et la gestion des variables d'environnement.",
        "projects.3d.title": "Jeu Multijoueur 3D",
        "projects.3d.desc": "Développement d'un jeu de tir multijoueur (FPS). Modélisation des environnements 3D et création de personnages jouables avec des animations fluides. Implémentation de la mécanique de tir, des systèmes de gestion des points de vie, des effets visuels pour les projectiles et d'un système de score.",
        "projects.tiger.title": "Compilateur Tiger",
        "projects.tiger.desc": "Développement d'un compilateur pour le langage Tiger (analyse lexicale, syntaxique, sémantique, génération de code)",
        "projects.bazaar.title": "EpiBazaar",
        "projects.bazaar.desc": "Backend pour un jeu de gestion de ressources (microservices, API REST, Quarkus, Hibernate, Kafka pour l'asynchrone)",
        "projects.carpool.title": "Application de Covoiturage",
        "projects.carpool.desc": "Développement d'une application de covoiturage en temps réel avec réservation, alertes, et une interface utilisateur intuitive. Intégration de fonctionnalités de géolocalisation et de notifications en temps réel pour améliorer l'expérience utilisateur.",
        "projects.ocr.title": "OCR Résolution de Sudoku",
        "projects.ocr.desc": "Reconnaissance optique de caractères et résolution de Sudoku utilisant un réseau de neurones en C et traitement d'image",
        "projects.dermscan.title": "DermScan (IA Médicale)",
        "projects.dermscan.desc": "Application distribuée d'aide au diagnostic dermatologique (règle ABCDE). Pipeline de vision par ordinateur (K-Means, PCA, moments de Hu) et Machine Learning (MLP, sensibilité >85%) orienté explicabilité via des modèles experts. Architecture microservices asynchrones (FastAPI, RabbitMQ) avec CI/CD complète.",
        "projects.gpgpu.title": "Filtre GStreamer (GPGPU CUDA)",
        "projects.gpgpu.desc": "Optimisation GPGPU d'un filtre vidéo de détection de mouvement. Implémentation d'un pipeline de traitement temps réel avec accélération CUDA (CUDA Graphs, mémoire Pinned).",

        "experience.title": "Expérience professionnelle",
        "experience.vr.title": "Ingénieur Réalité Virtuelle (WebXR) – Dassault Systèmes",
        "experience.vr.item1": "Développement d'une expérience WebXR immersive et performante (Three.js, TypeScript, Vite)",
        "experience.vr.item2": "Implémentation d'un algorithme de \"World Detection\" pour la détection automatique des étages et calcul des zones de collision",
        "experience.vr.item3": "Conception d'une interface VR dynamique attachée au contrôleur avec navigation inter-étages",
        "experience.vr.item4": "Optimisation critique des performances via la mise en place de WebWorkers pour déporter les calculs lourds",
        "experience.bpce.title": "Data Science & Generative AI Intern – Groupe BPCE",
        "experience.bpce.item1": "Pipeline RAG : automatisation de l'extraction d'informations sur des bilans PDF (SentenceTransformer, Qdrant, LLM, Pydantic)",
        "experience.bpce.item2": "Tableau de bord Power BI : conception d'un reporting interactif pour le suivi de règles expertes d'octroi de cautionnement",
        "experience.bpce.item3": "Automatisation de contrôles : outil packagé croisant extraction PDF, appel LLM et données Excel",
        "experience.tutor.title": "Tuteur – BackToBasics, EPITA",
        "experience.tutor.item1": "Tutorat en algorithmique, programmation et mathématiques",
        "experience.tutor.item2": "Planification de séances individuelles et en groupe",


        "interests.title": "Centres d'intérêt",
        "interests.bmx": "BMX (compétitions, co-création d'une association pour les voyages en groupe et échanges culturels)",
        "interests.travel": "Voyages et culture",
        "interests.motorsports": "Sports mécaniques (MotoGP, Formule 1)",

        "footer.rights": "© 2024 Noah Civilise. Tous droits réservés.",
        "date.present": "Présent"
    },
    en: {
        "nav.about": "About",
        "nav.education": "Education",
        "nav.skills": "Skills",
        "nav.projects": "Projects",
        "nav.experience": "Experience",
        "nav.interests": "Interests",

        "hero.title": "5th-year student at EPITA, Computer Science Engineering School",
        "hero.description": "I am looking for my end-of-studies internship in Artificial Intelligence or Image Processing in Bordeaux or Paris. Curious, adaptable, and motivated, I wish to deepen my skills in these fields.",
        "hero.cta": "View my projects",
        "hero.cv.title": "Download my CV:",
        "hero.cv.fr": "French Version",
        "hero.cv.en": "English Version",

        "about.title": "About",
        "about.description": "As a passionate computer science student, I am currently in my 5th year at EPITA. My areas of interest include artificial intelligence, image processing, and data science. I am actively seeking my end-of-studies internship in AI or Image Processing in Bordeaux or Paris.",

        "education.title": "Education",
        "education.epita.title": "EPITA – Computer Science Engineering School",
        "education.epita.desc": "5th year in Computer Science Engineering",
        "education.epita.location": "Le Kremlin-Bicêtre, France",

        "education.spain.title": "Academic Exchange",
        "education.spain.desc": "University of the Basque Country",
        "education.spain.location": "San Sebastián, Spain",
        "education.bac.title": "Scientific Baccalaureate",
        "education.bac.desc": "Descartes High School",
        "education.bac.grade": "High Honors with Mathematics and NSI specialties",

        "skills.title": "Skills",
        "skills.prog": "Programming Languages",
        "skills.tools": "Development Tools",
        "skills.methods": "Methodologies",
        "skills.testing": "Testing",
        "skills.test.desc": "Unit & functional testing (C, Python, Bash, Java)",
        "skills.languages": "Languages",
        "skills.lang.fr": "French (native)",
        "skills.lang.en": "English (TOEIC 900/990)",
        "skills.lang.es": "Spanish (B1)",
        "skills.soft": "Soft skills",
        "skills.soft.adapt": "Adaptability",
        "skills.soft.team": "Teamwork",
        "skills.soft.auto": "Autonomy",
        "skills.soft.problem": "Problem Solving",
        "skills.misc": "Miscellaneous",
        "skills.misc.license": "A2 & B Driving Licenses",
        "skills.methods.project": "Project Management",

        "projects.title": "Projects",
        "projects.alpr.title": "Automatic License Plate Recognition (ALPR)",
        "projects.alpr.desc": "From scratch development of an automatic license plate localization pipeline without Deep Learning. Prototyping in Python followed by low-level C++ porting for optimization (creation of a custom MyCV library, Machine Learning with Random Forest, CI/CD). Processing time < 380ms with 93% porting accuracy.",
        "projects.42sh.title": "Unix Command Interpreter (42SH)",
        "projects.42sh.desc": "Development of a Unix command interpreter in C. Implementation of functions such as command parsing, file management, directory navigation, and environment variable management.",
        "projects.3d.title": "3D Multiplayer Game",
        "projects.3d.desc": "Development of a multiplayer first-person shooter (FPS). Modeling of 3D environments and creation of playable characters with fluid animations. Implementation of shooting mechanics, health management systems, visual effects for projectiles, and a scoring system.",
        "projects.tiger.title": "Tiger Compiler",
        "projects.tiger.desc": "Development of a compiler for the Tiger language (lexical, syntactic, semantic analysis, and code generation)",
        "projects.bazaar.title": "EpiBazaar",
        "projects.bazaar.desc": "Backend for a resource management game (microservices, REST APIs, Quarkus, Hibernate, Kafka for asynchronous processing)",
        "projects.carpool.title": "Carpooling Application",
        "projects.carpool.desc": "Development of a real-time carpooling application with booking, alerts, and an intuitive user interface. Integration of geolocation features and real-time notifications to enhance user experience.",
        "projects.ocr.title": "OCR Sudoku Solver",
        "projects.ocr.desc": "Optical Character Recognition and Sudoku solving using a C-based neural network and image processing",
        "projects.dermscan.title": "DermScan (Medical AI)",
        "projects.dermscan.desc": "Distributed dermoscopic diagnostic aid application (ABCDE rule). Computer vision pipeline (K-Means, PCA, Hu moments) and Machine Learning (MLP, sensitivity >85%) focused on explainability via expert models. Asynchronous microservices architecture (FastAPI, RabbitMQ) with full CI/CD.",
        "projects.gpgpu.title": "GStreamer Filter (GPGPU CUDA)",
        "projects.gpgpu.desc": "GPGPU optimization of a motion detection video filter. Implementation of a real-time processing pipeline with CUDA acceleration (CUDA Graphs, Pinned memory).",

        "experience.title": "Professional Experience",
        "experience.vr.title": "Virtual Reality Engineer (WebXR) – Dassault Systèmes",
        "experience.vr.item1": "Development of an immersive and high-performance WebXR experience (Three.js, TypeScript, Vite)",
        "experience.vr.item2": "Implementation of a 'World Detection' algorithm for automatic floor detection and collision zone calculation",
        "experience.vr.item3": "Design of a dynamic VR interface attached to the controller with inter-floor navigation",
        "experience.vr.item4": "Critical performance optimization through the implementation of WebWorkers to offload heavy computations",
        "experience.bpce.title": "Data Science & Generative AI Intern – Groupe BPCE",
        "experience.bpce.item1": "RAG Pipeline: automated extraction of information from PDF balance sheets (SentenceTransformer, Qdrant, LLM, Pydantic)",
        "experience.bpce.item2": "Power BI Dashboard: design of an interactive reporting tool for monitoring expert bond granting rules",
        "experience.bpce.item3": "Control automation: packaged tool combining PDF extraction, LLM calls, and Excel data",
        "experience.tutor.title": "Tutor – BackToBasics, EPITA",
        "experience.tutor.item1": "Tutoring in algorithms, programming, and mathematics",
        "experience.tutor.item2": "Planning of individual and group sessions",


        "interests.title": "Interests",
        "interests.bmx": "BMX (competitions, co-creation of an association for group travel and cultural exchange)",
        "interests.travel": "Travel and culture",
        "interests.motorsports": "Motorsports (MotoGP, Formula 1)",

        "footer.rights": "© 2024 Noah Civilise. All rights reserved.",
        "date.present": "Present"
    }
};

// Set the default language
let currentLanguage = 'fr';

// Function to update content based on selected language
function updateContent(lang) {
    currentLanguage = lang;

    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang][key]) {
            // Handle special cases
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                if (element.getAttribute('placeholder')) {
                    element.setAttribute('placeholder', translations[lang][key]);
                } else {
                    element.value = translations[lang][key];
                }
            } else {
                element.textContent = translations[lang][key];
            }
        }
    });

    // Update language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById(lang + '-btn').classList.add('active');

    // Store the language preference
    localStorage.setItem('preferredLanguage', lang);
}

// Initialize language from localStorage or default to French
document.addEventListener('DOMContentLoaded', function () {
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'fr';
    updateContent(savedLanguage);

    // Set up language switch buttons
    document.getElementById('fr-btn').addEventListener('click', function () {
        updateContent('fr');
    });

    document.getElementById('en-btn').addEventListener('click', function () {
        updateContent('en');
    });
}); 