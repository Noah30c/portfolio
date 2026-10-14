// Translations for Noah Civilise Portfolio (Cockpit Edition)
// Project content lives in js/projects-data.js; this file holds the interface and section copy.
const translations = {
    fr: {
        "meta.title": "Noah Civilise · Élève-ingénieur en IA et vision par ordinateur",
        "meta.description": "Portfolio de Noah Civilise, élève-ingénieur en 5ᵉ année à EPITA (majeure IMAGE) : IA, vision par ordinateur, traitement d'image et calcul GPU. Recherche un stage de fin d'études à partir de février 2027.",

        "header.brand": "<strong>Noah Civilise</strong> • EPITA 5ᵉ Année",
        "theme.toLight": "Passer en mode clair",
        "theme.toDark": "Passer en mode sombre",

        "nav.profile": "Profil",
        "nav.experience": "Expérience",
        "nav.projects": "Projets",
        "nav.education": "Formation",
        "nav.skills": "Compétences",

        "panel.badge.projects": "RÉALISATIONS",
        "panel.badge.experience": "PARCOURS",
        "panel.badge.education": "DIPLÔME",
        "panel.badge.skills": "EXPERTISE",

        "hero.badge": "Élève-ingénieur en IA, vision par ordinateur et traitement d'image",
        "hero.subtitle": "Intelligence Artificielle • Vision par Ordinateur • Traitement d'Image • Rendu & GPU",
        "hero.description": "Je recherche mon stage de fin d'études de 6 mois en Intelligence Artificielle ou en Traitement d'Image à partir de février 2027 sur Bordeaux ou Paris. Curieux, adaptable et motivé, je conçois des systèmes performants alliant rendu temps réel, vision algorithmique et architectures d'IA modernes.",
        "hero.cta": "Découvrir mes projets",
        "hero.cta.exp": "Mon parcours",
        "hero.cv.fr": "CV (FR)",
        "hero.cv.en": "CV (EN)",
        "hero.stat.school": "EPITA – Majeure IMAGE",
        "hero.stat.gpa": "GPA : <strong>4.0 / 4.0</strong>",
        "hero.stat.internship": "Stage : Fév 2027 (6 mois)",
        "hero.stat.location": "Bordeaux / Paris",

        "experience.title": "Expérience Professionnelle",
        "experience.vr.title": "Projet de Fin d'Études (PFEE) – Ingénieur Réalité Virtuelle",
        "experience.vr.company": "Dassault Systèmes",
        "experience.vr.period": "Fév. 2026 – aujourd'hui",
        "experience.vr.subtitle": "Conception d'une Minimap WebXR interactive pour maquettes 3D industrielles complexes.",
        "experience.vr.item1": "Développement WebXR fluide à <strong>90 FPS</strong> (Three.js, TypeScript, Vite) pour l'exploration de maquettes CAO.",
        "experience.vr.item2": "Algorithmes de <strong>World Detection</strong> (détection d'étages, volumes de collision) et calculs asynchrones via <strong>WebWorkers</strong>.",
        "experience.vr.item3": "Remplacement de la minimap 2D par une <strong>maquette 3D</strong> du bâtiment fixée dans le champ de vision, reconstruite en <strong>24 ms</strong>.",
        "experience.vr.details": "Voir le projet VR Minimap",

        "experience.bpce.title": "Data Science & Generative AI Intern",
        "experience.bpce.company": "Groupe BPCE (CEGC)",
        "experience.bpce.period": "Sept. 2025 – Janv. 2026",
        "experience.bpce.subtitle": "Pipeline RAG sur des bilans PDF, tableau de bord Power BI et contrôle automatique des factures par LLM.",
        "experience.bpce.item1": "Pipeline <strong>RAG & LLM</strong> sur plusieurs centaines de bilans PDF (SentenceTransformer, Qdrant, Pydantic) : extraction du SIREN, du nom et de la date de clôture.",
        "experience.bpce.item2": "Sorties du LLM validées par Pydantic et contrôle du SIREN par l'algorithme de Luhn ; score de confiance moyen de <strong>77,1 %</strong> suivi dans Streamlit.",
        "experience.bpce.item3": "Contrôle automatique des factures PDF face au reporting Excel par LLM (<strong>plus de 60 % de temps gagné</strong>), livré en exécutable autonome.",
        "experience.bpce.item4": "Tableau de bord <strong>Power BI</strong> (modèle en étoile, mesures DAX) pour suivre les règles d'octroi de cautions.",
        "experience.bpce.details": "Lire le détail du stage",
        "experience.back": "Toute l'expérience",

        "experience.tutor.title": "Tuteur en Informatique & Mathématiques",
        "experience.tutor.company": "BackToBasics – EPITA",
        "experience.tutor.period": "2022 – 2025",
        "experience.tutor.subtitle": "Accompagnement pédagogique et transmission technique aux étudiants de premier cycle.",
        "experience.tutor.item1": "Tutorat individuel et collectif en algorithmique avancée, structures de données et programmation (C, C++, Python).",
        "experience.tutor.item2": "Animation d'ateliers méthodologiques, revues de code et préparation aux projets d'ingénierie.",
        "experience.tutor.tag.algo": "Algorithmique",
        "experience.tutor.tag.math": "Mathématiques",

        "projects.title": "Projets & Réalisations",
        "projects.featured": "Projets phares",
        "projects.featuredNote": "IA, vision, imagerie médicale, rendu GPU et VR",
        "projects.others": "Autres projets",
        "projects.othersNote": "Vision, systèmes, compilation et logiciel",
        "projects.details": "Voir le détail",
        "projects.detailsShort": "Détail",
        "projects.caseStudy": "Lire l'étude de cas",
        "projects.back": "Tous les projets",
        "projects.prev": "Projet précédent",
        "projects.next": "Projet suivant",
        "projects.pager": "Navigation entre les projets",
        "case.context": "Contexte",
        "case.highlights": "Points clés",
        "case.results": "Résultats",
        "case.gallery": "En images",

        "pdf.download": "Télécharger",
        "pdf.newTab": "Nouvel onglet",
        "pdf.close": "Fermer l'aperçu",

        "education.title": "Formation Académique",
        "education.epita.title": "EPITA – École d'ingénieurs en informatique",
        "education.epita.desc": "5ᵉ année – Majeure IMAGE (traitement d'images, vision par ordinateur, deep learning, IA, calcul GPU) et mineure Finance de marché.",
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
        "skills.vision": "Vision & IA",
        "skills.gpu": "3D & GPU",
        "skills.methods": "Outils & MLOps",
        "skills.testing": "Testing & Qualité",
        "skills.languages": "Langues",

        "skills.chip.unittests": "Tests unitaires C/C++",
        "skills.chip.ci": "Intégration continue",
        "skills.chip.french": "Français (natif)",
        "skills.chip.english": "Anglais (TOEIC 900/990)",
        "skills.chip.spanish": "Espagnol (B1)",

        "profile.interests.title": "En dehors du code",
        "interests.bmx.title": "BMX",
        "interests.bmx": "Pratique en compétition, co-fondateur d'une association sportive pour les voyages de groupe et échanges culturels.",
        "interests.travel.title": "Voyages & Culture",
        "interests.travel": "Échange universitaire à San Sebastián en 2024 et voyages de groupe organisés avec mon association de BMX.",
        "interests.motorsports.title": "Sports Mécaniques",
        "interests.motorsports": "Passionné de MotoGP et Formule 1 (télémétrie, aérodynamique et ingénierie de pointe).",

        "profile.avatar.title": "Voir mon profil LinkedIn (nouvel onglet)",
        "profile.contact.email": "Envoyer un email à civilise.noah@gmail.com",
        "profile.contact.phone": "Appeler le +33 6 60 39 97 86",

        "footer.rights": "© 2026 Noah Civilise • Tous droits réservés."
    },
    en: {
        "meta.title": "Noah Civilise · Engineering student in AI & computer vision",
        "meta.description": "Portfolio of Noah Civilise, 5th-year engineering student at EPITA (IMAGE major): AI, computer vision, image processing and GPU computing. Looking for an end-of-studies internship from February 2027.",

        "header.brand": "<strong>Noah Civilise</strong> • EPITA 5th Year",
        "theme.toLight": "Switch to light mode",
        "theme.toDark": "Switch to dark mode",

        "nav.profile": "Profile",
        "nav.experience": "Experience",
        "nav.projects": "Projects",
        "nav.education": "Education",
        "nav.skills": "Skills",

        "panel.badge.projects": "PROJECTS",
        "panel.badge.experience": "TIMELINE",
        "panel.badge.education": "ACADEMICS",
        "panel.badge.skills": "EXPERTISE",

        "hero.badge": "Engineering student in AI, computer vision & image processing",
        "hero.subtitle": "Artificial Intelligence • Computer Vision • Image Processing • Rendering & GPU",
        "hero.description": "I am seeking my 6-month end-of-studies internship in Artificial Intelligence or Image Processing starting February 2027 in Bordeaux or Paris. Curious, adaptable, and motivated, I engineer high-performance systems combining real-time rendering, computer vision, and modern AI architectures.",
        "hero.cta": "Explore Projects",
        "hero.cta.exp": "My Background",
        "hero.cv.fr": "Resume (FR)",
        "hero.cv.en": "Resume (EN)",
        "hero.stat.school": "EPITA – IMAGE Major",
        "hero.stat.gpa": "GPA: <strong>4.0 / 4.0</strong>",
        "hero.stat.internship": "Internship: Feb 2027 (6 mo.)",
        "hero.stat.location": "Bordeaux / Paris",

        "experience.title": "Professional Experience",
        "experience.vr.title": "End-of-Studies Project (PFEE) – Virtual Reality Engineer",
        "experience.vr.company": "Dassault Systèmes",
        "experience.vr.period": "Feb. 2026 – present",
        "experience.vr.subtitle": "Design of an interactive WebXR VR Minimap for complex industrial CAD scenes.",
        "experience.vr.item1": "Smooth <strong>90 FPS</strong> WebXR development (Three.js, TypeScript, Vite) for engineering model visualization.",
        "experience.vr.item2": "3D <strong>World Detection</strong> algorithms (floor detection, collision boundaries) with async compute offloaded to <strong>WebWorkers</strong>.",
        "experience.vr.item3": "Replaced the 2D minimap with a <strong>3D model</strong> of the building anchored in the field of view, rebuilt in <strong>24 ms</strong>.",
        "experience.vr.details": "View the VR Minimap project",

        "experience.bpce.title": "Data Science & Generative AI Intern",
        "experience.bpce.company": "Groupe BPCE (CEGC)",
        "experience.bpce.period": "Sept. 2025 – Jan. 2026",
        "experience.bpce.subtitle": "RAG pipeline on PDF balance sheets, Power BI dashboard and LLM-based automated invoice checks.",
        "experience.bpce.item1": "<strong>RAG & LLM</strong> pipeline over several hundred PDF balance sheets (SentenceTransformer, Qdrant, Pydantic): extraction of the company number, name and closing date.",
        "experience.bpce.item2": "LLM outputs validated with Pydantic and company numbers checked with the Luhn algorithm; average confidence score of <strong>77.1%</strong> tracked in Streamlit.",
        "experience.bpce.item3": "LLM-based automated check of PDF invoices against the Excel report (<strong>over 60% time saved</strong>), delivered as a standalone executable.",
        "experience.bpce.item4": "<strong>Power BI</strong> dashboard (star schema, DAX measures) to monitor the guarantee approval rules.",
        "experience.bpce.details": "Read the internship in detail",
        "experience.back": "All experience",

        "experience.tutor.title": "Computer Science & Mathematics Tutor",
        "experience.tutor.company": "BackToBasics – EPITA",
        "experience.tutor.period": "2022 – 2025",
        "experience.tutor.subtitle": "Academic mentoring and technical teaching for undergraduate engineering students.",
        "experience.tutor.item1": "Individual and group tutoring in advanced algorithms, data structures, and programming (C, C++, Python).",
        "experience.tutor.item2": "Methodology workshops, code reviews, and preparation for engineering projects.",
        "experience.tutor.tag.algo": "Algorithms",
        "experience.tutor.tag.math": "Mathematics",

        "projects.title": "Projects",
        "projects.featured": "Featured projects",
        "projects.featuredNote": "AI, vision, medical imaging, GPU rendering & VR",
        "projects.others": "Other projects",
        "projects.othersNote": "Vision, systems, compilers & software",
        "projects.details": "View details",
        "projects.detailsShort": "Details",
        "projects.caseStudy": "Read the case study",
        "projects.back": "All projects",
        "projects.prev": "Previous project",
        "projects.next": "Next project",
        "projects.pager": "Project navigation",
        "case.context": "Context",
        "case.highlights": "Key points",
        "case.results": "Results",
        "case.gallery": "Gallery",

        "pdf.download": "Download",
        "pdf.newTab": "New tab",
        "pdf.close": "Close preview",

        "education.title": "Education",
        "education.epita.title": "EPITA – School of Computer Engineering",
        "education.epita.desc": "5th year – IMAGE major (image processing & synthesis, computer vision, deep learning, AI, GPU computing) and minor in Market Finance.",
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
        "skills.vision": "Vision & AI",
        "skills.gpu": "3D & GPU",
        "skills.methods": "Tools & MLOps",
        "skills.testing": "Testing & Code Quality",
        "skills.languages": "Languages",

        "skills.chip.unittests": "C/C++ Unit Testing",
        "skills.chip.ci": "Continuous Integration",
        "skills.chip.french": "French (Native)",
        "skills.chip.english": "English (TOEIC 900/990)",
        "skills.chip.spanish": "Spanish (B1)",

        "profile.interests.title": "Outside of code",
        "interests.bmx.title": "BMX",
        "interests.bmx": "Competitive riding, co-founder of a sports association organizing group trips and cultural exchanges.",
        "interests.travel.title": "Travel & Cultures",
        "interests.travel": "University exchange in San Sebastián in 2024 and group trips organized with my BMX association.",
        "interests.motorsports.title": "Motorsports",
        "interests.motorsports": "Passionate about MotoGP & Formula 1 (telemetry, aerodynamics, and high-performance engineering).",

        "profile.avatar.title": "View LinkedIn Profile (new tab)",
        "profile.contact.email": "Send an email to civilise.noah@gmail.com",
        "profile.contact.phone": "Call +33 6 60 39 97 86",

        "footer.rights": "© 2026 Noah Civilise • All rights reserved."
    }
};

let currentLanguage = 'fr';

function updateContent(lang) {
    if (!translations[lang]) lang = 'fr';
    currentLanguage = lang;
    const dict = translations[lang];

    document.documentElement.lang = lang;
    document.title = dict["meta.title"];
    document.querySelector('meta[name="description"]')?.setAttribute('content', dict["meta.description"]);

    // Translate text/HTML contents
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const val = dict[element.getAttribute('data-i18n')];
        if (val === undefined) return;
        if (/<[a-z][\s\S]*>/i.test(val)) {
            element.innerHTML = val;
        } else {
            element.textContent = val;
        }
    });

    // Translate title attributes
    document.querySelectorAll('[data-i18n-title]').forEach(element => {
        const val = dict[element.getAttribute('data-i18n-title')];
        if (val !== undefined) element.setAttribute('title', val);
    });

    // Translate aria-label attributes
    document.querySelectorAll('[data-i18n-aria]').forEach(element => {
        const val = dict[element.getAttribute('data-i18n-aria')];
        if (val !== undefined) element.setAttribute('aria-label', val);
    });

    // Active state on language switcher buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        const isActive = btn.id === `${lang}-btn`;
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });

    localStorage.setItem('preferredLanguage', lang);

    // Let dynamic parts (projects grid, dialogs, theme toggle) re-render in the new language
    document.dispatchEvent(new CustomEvent('portfolio:languagechange', { detail: { lang } }));
}

document.addEventListener('DOMContentLoaded', () => {
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'fr';
    updateContent(savedLanguage);

    document.getElementById('fr-btn')?.addEventListener('click', () => updateContent('fr'));
    document.getElementById('en-btn')?.addEventListener('click', () => updateContent('en'));
});
