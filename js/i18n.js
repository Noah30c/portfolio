// Translations
const translations = {
    fr: {
        "nav.about": "À propos",
        "nav.education": "Formation",
        "nav.skills": "Compétences",
        "nav.projects": "Projets",
        "nav.experience": "Expérience",
        "nav.interests": "Centres d'intérêt",

        "hero.title": "Étudiant en 3ᵉ année à EPITA, École d'ingénieurs en informatique",
        "hero.description": "Je recherche un stage de cinq à six mois en développement logiciel, Intelligence Artificielle ou Data Science (septembre 2025 – janvier 2026). Curieux, adaptable et motivé, je souhaite approfondir mes compétences en ingénierie logicielle et IA.",
        "hero.cta": "Voir mes projets",
        "hero.cv.title": "Télécharger mon CV:",
        "hero.cv.dev": "Développeur Logiciel",
        "hero.cv.ai": "Intelligence Artificielle",

        "about.title": "À propos",
        "about.description": "Passionné par le développement logiciel et les technologies émergentes, je suis actuellement en 3ème année à l'EPITA, où j'explore les frontières de l'informatique moderne. Mon expertise s'étend de la conception d'architectures logicielles robustes à l'application de techniques d'intelligence artificielle pour résoudre des problèmes complexes. Particulièrement intéressé par le machine learning et la data science, je m'investis dans des projets innovants qui combinent ces domaines. Mon parcours est porté par une curiosité insatiable et un désir constant d'améliorer mes compétences techniques en relevant de nouveaux défis. Je recherche activement des opportunités où je pourrai contribuer à des projets ambitieux et impactants dans le domaine du développement logiciel et de l'IA.",

        "education.title": "Formation",
        "education.epita.title": "EPITA – École d'ingénieurs en informatique",
        "education.epita.desc": "3ème année en ingénierie informatique",
        "education.epita.location": "Le Kremlin-Bicêtre",
        "education.upec.title": "Licence en Informatique",
        "education.upec.desc": "Université Paris-Est Créteil (UPEC)",
        "education.upec.grade": "Mention Très Bien",
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
        "skills.methods.project": "Gestion de projet",

        "projects.title": "Projets",
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

        "experience.title": "Expérience professionnelle",
        "experience.tutor.title": "Tuteur – BackToBasics, EPITA",
        "experience.tutor.item1": "Tutorat en algorithmique, programmation et mathématiques",
        "experience.tutor.item2": "Planification de séances individuelles et en groupe",
        "experience.dev.title": "Développeur Web – Digi Activity, Paris",
        "experience.dev.item1": "Création d'un site web avec HTML, CSS, Bootstrap",
        "experience.dev.item2": "Focus sur le design responsive et l'UX",

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

        "hero.title": "3rd-year student at EPITA, Computer Science Engineering School",
        "hero.description": "I am looking for a five to six-month internship in Software Development, Artificial Intelligence, or Data Science (September 2025 - January 2026). Curious, adaptable, and motivated, I wish to deepen my skills in software engineering and AI.",
        "hero.cta": "View my projects",
        "hero.cv.title": "Download my CV:",
        "hero.cv.dev": "Software Developer",
        "hero.cv.ai": "Artificial Intelligence",

        "about.title": "About",
        "about.description": "As a passionate computer science student, I am currently in my 3rd year at EPITA. My areas of interest include software development, artificial intelligence, and data science.",

        "education.title": "Education",
        "education.epita.title": "EPITA – Computer Science Engineering School",
        "education.epita.desc": "3rd year in Computer Science Engineering",
        "education.epita.location": "Le Kremlin-Bicêtre, France",
        "education.upec.title": "Bachelor's Degree in Computer Science",
        "education.upec.desc": "Paris-Est Créteil University (UPEC)",
        "education.upec.grade": "High Honors",
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
        "skills.soft.problem": "Problem solving",
        "skills.methods.project": "Project Management",

        "projects.title": "Projects",
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

        "experience.title": "Professional Experience",
        "experience.tutor.title": "Tutor – BackToBasics, EPITA",
        "experience.tutor.item1": "Tutoring in algorithms, programming, and mathematics",
        "experience.tutor.item2": "Planning of individual and group sessions",
        "experience.dev.title": "Web Developer – Digi Activity, Paris",
        "experience.dev.item1": "Website creation with HTML, CSS, and Bootstrap",
        "experience.dev.item2": "Focus on responsive design and UX",

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