/**
 * Noah Civilise - Experience pages content (FR / EN)
 * Same structure as the project pages in js/projects-data.js (stats + sections of blocks),
 * plus a { timeline } block: { title, start, end, marks: [{ date, label }], items: [{ label, dates, from, to }] }.
 *
 * Source: internship report (CEGC, Groupe BPCE, Sept. 2025 - Jan. 2026). The invoice-check
 * time saving (over 60%) is the figure Noah confirmed, also used on the CV.
 * No screenshot from the report is published: they contain internal and personal data.
 */
const EXPERIENCES = [
    {
        id: 'bpce',
        icon: 'fas fa-landmark',
        stack: ['Python', 'SentenceTransformers', 'Qdrant', 'Pydantic', 'LLM', 'Streamlit', 'Power BI (DAX)', 'Dataiku', 'PyInstaller', 'VBA'],
        fr: {
            title: 'Data science et IA générative au Groupe BPCE',
            category: 'Stage de 4ᵉ année · 5 mois',
            team: 'Équipe Data et IA · CEGC (Groupe BPCE)',
            summary: "Stage dans l'équipe Data et IA de la Compagnie Européenne de Garanties et Cautions : trois outils livrés aux équipes métiers, du développement jusqu'à la recette et à la préparation à l'homologation, dans un environnement bancaire réglementé.",
            stats: [
                { value: '5 mois', label: 'Septembre 2025 à janvier 2026' },
                { value: '3', label: 'Outils livrés aux équipes métiers' },
                { value: '77,1 %', label: 'Score de confiance moyen du pipeline RAG' },
                { value: '> 60 %', label: 'Temps gagné sur le contrôle des factures' }
            ],
            sections: [
                {
                    title: 'Contexte',
                    blocks: [
                        { p: "La CEGC est la filiale du Groupe BPCE spécialisée dans les cautions et garanties financières (prêts immobiliers, marchés, garanties immobilières). J'ai rejoint son **équipe Data et IA**, qui conçoit, teste et industrialise des solutions fondées sur la donnée pour les équipes métiers." },
                        { p: "Le sujet du stage : **accompagner des projets de data science et d'IA générative** sur tout leur cycle de vie, du cadrage au développement, aux tests, à la recette et à la préparation à l'homologation." },
                        { list: [
                            "**Données bancaires sensibles** : droits d'accès, traitements en environnement contrôlé, gestion des secrets et des clés d'API, traçabilité.",
                            "**Coûts et volumes maîtrisés** : limiter les données envoyées aux modèles de langage.",
                            "**Contraintes techniques** : proxy d'entreprise, base vectorielle exécutée uniquement en local, aucun environnement Python sur les postes des équipes métiers.",
                            "**Documents hétérogènes** : PDF complexes et tableaux Excel non standardisés."
                        ] }
                    ]
                },
                {
                    title: 'Chronologie',
                    blocks: [
                        { timeline: {
                            title: 'Mes missions, de septembre 2025 à janvier 2026',
                            start: '2025-09-01',
                            end: '2026-02-01',
                            marks: [
                                { date: '2025-09-01', label: 'Sept.' },
                                { date: '2025-10-01', label: 'Oct.' },
                                { date: '2025-11-01', label: 'Nov.' },
                                { date: '2025-12-01', label: 'Déc.' },
                                { date: '2026-01-01', label: 'Janv.' }
                            ],
                            items: [
                                { label: 'Pipeline RAG', dates: '3 sept. – 25 oct.', from: '2025-09-03', to: '2025-10-25' },
                                { label: 'Tableau de bord Power BI', dates: '26 sept. – 16 oct.', from: '2025-09-26', to: '2025-10-16' },
                                { label: 'Analyse concurrentielle', dates: '26 oct. – 10 nov.', from: '2025-10-26', to: '2025-11-10' },
                                { label: 'Contrôle des factures', dates: '6 nov. – fin janv.', from: '2025-11-06', to: '2026-01-31' },
                                { label: 'Prompt engineering', dates: '20 nov. – 10 déc.', from: '2025-11-20', to: '2025-12-10' },
                                { label: 'Revue de code', dates: '20 déc. – 2 janv.', from: '2025-12-20', to: '2026-01-02' }
                            ]
                        } }
                    ]
                },
                {
                    title: 'Pipeline RAG : extraire les informations clés de bilans PDF',
                    blocks: [
                        { p: "L'extraction d'informations dans de gros lots de bilans PDF se faisait à la main : long, et source d'erreurs. Pour chaque document, il fallait retrouver **trois informations** (le SIREN, le nom de l'entreprise et la date de clôture), les comparer à un fichier Excel de référence et, en cas de correspondance, renommer le PDF selon une convention précise." },
                        { flow: ['PDF de bilans', 'Extraction du texte', 'Chunks et embeddings', 'Qdrant', 'Requêtes ciblées', 'LLM → JSON', 'Validation Pydantic', 'Renommage et Excel'] },
                        { steps: [
                            { title: 'Extraction robuste du texte', blocks: [
                                { p: "Une analyse de **20 PDF représentatifs** a montré une qualité d'extraction très variable d'un document à l'autre. J'ai donc enchaîné **quatre bibliothèques** : `fitz` (PyMuPDF) d'abord, en lisant aussi les tableaux pour garder les lignes qui contiennent un SIREN ou un SIRET, puis PyMuPDF4LLM, PdfReader et pikepdf, chacune prenant le relais quand la précédente ne renvoie aucun texte exploitable." }
                            ] },
                            { title: 'Traitement par lots', blocks: [
                                { p: "La base vectorielle Qdrant devait tourner uniquement en local. Au-delà de **4 PDF ou 20 Mo par lot**, nous observions des instabilités et des plantages : j'ai donc découpé la liste de fichiers en lots respectant ces deux limites, traités de façon **asynchrone et en parallèle**." }
                            ] },
                            { title: 'Découpage, vectorisation et indexation', blocks: [
                                { p: "Le texte est découpé en segments cohérents (chunks) puis transformé en embeddings avec le **même modèle Sentence-BERT**, exécuté localement, pour garder une cohérence sémantique entre découpage et représentation. Les vecteurs sont indexés dans **quatre collections Qdrant**, vidées et réutilisées à chaque lot." }
                            ] },
                            { title: 'Extraction par le LLM et validation', blocks: [
                                { p: "Une requête vectorielle ciblée par information (SIREN, nom, date) alimente un prompt structuré. Le LLM répond en **JSON validé par Pydantic**, avec :" },
                                { list: [
                                    'la présence d\'un SIREN ou d\'un SIRET, et les valeurs extraites ;',
                                    'une **vérification du SIREN par l\'algorithme de Luhn** ;',
                                    'la date de clôture au format JJMMAA ;',
                                    'un **score de confiance de 0 à 5** et une justification pour chaque valeur.'
                                ] }
                            ] },
                            { title: 'Restitution', blocks: [
                                { p: "Les documents conformes sont renommés automatiquement selon la convention métier, et un fichier Excel consolidé est généré. Une **interface Streamlit** permet de lancer les traitements, de suivre les scores de confiance, le temps de traitement par lot et la répartition des erreurs, et de recharger l'historique des exécutions." }
                            ] }
                        ] },
                        { p: "Résultat : un outil capable de traiter **plusieurs centaines de PDF**, validé par les retours métiers, avec un **score de confiance moyen de 77,1 %**." },
                        { note: "Ce score est l'auto-évaluation renvoyée par le modèle pour chaque document (de 0 à 5), moyennée sur les lots traités." }
                    ]
                },
                {
                    title: 'Tableau de bord Power BI : suivre les règles d\'octroi',
                    blocks: [
                        { p: "Les règles du système expert qui interviennent dans l'octroi des cautions de crédits immobiliers aux particuliers n'avaient pas de vue de suivi : les équipes devaient s'appuyer sur des extractions ponctuelles. La direction des Risques voulait suivre l'activation de chaque règle dans le temps et repérer rapidement les écarts." },
                        { steps: [
                            { title: 'Modélisation en étoile', blocks: [
                                { p: "Connexion à la base d'historisation, nettoyage, puis un **modèle en étoile** : une table de faits des activations, une table de dates et des tables de dimensions (nom, préfixe, type et thème de la règle)." }
                            ] },
                            { title: 'Mesures DAX', blocks: [
                                { p: "Les mesures calculent l'**évolution N / N−1** sur la période choisie (année, trimestre ou mois), à partir de la dernière date visible dans le contexte des filtres : `% évolution = (activations N − activations N−1) / activations N−1`." }
                            ] },
                            { title: 'Trois pages de suivi', blocks: [
                                { list: [
                                    '**Suivi global** : évolution des activations d\'une règle et jauge du pourcentage d\'évolution sur la dernière période.',
                                    '**Comparaison** : plusieurs règles superposées, avec des filtres communs à tous les visuels.',
                                    '**Alertes** : tableau des règles dont la variation dépasse **± 1 %**.'
                                ] }
                            ] }
                        ] }
                    ]
                },
                {
                    title: 'Contrôle automatique des factures',
                    blocks: [
                        { p: "Les équipes métiers vérifiaient à la main, pour chaque facture PDF, que le montant et l'IBAN correspondaient au reporting Excel exporté de l'outil interne de gestion des sinistres. L'objectif : automatiser ce rapprochement et livrer un outil utilisable sans compétence technique." },
                        { flow: ['Reporting Excel et factures PDF', 'Détection du tableau', 'Extraction par LLM', 'Jointure sur le n° de facture', 'Excel de contrôle'] },
                        { steps: [
                            { title: 'Lecture du reporting', blocks: [
                                { p: "Détection automatique du bon tableau dans le fichier Excel (en-têtes et nombre de colonnes), puis conversion en JSON, regroupé par référence et enrichi de totaux." }
                            ] },
                            { title: 'Lecture des factures', blocks: [
                                { p: "Pour chaque PDF, le texte est extrait puis un LLM identifie l'**IBAN, le montant, le numéro de facture, le nom de l'entreprise et la date de validation**, rendus en JSON." }
                            ] },
                            { title: 'Rapprochement', blocks: [
                                { p: "Les deux sources sont jointes sur le numéro de facture pour produire un fichier de contrôle consolidé, qui liste les correspondances et les écarts." }
                            ] },
                            { title: 'Mise à disposition', blocks: [
                                { p: "Les postes métiers n'ont pas Python. J'ai comparé deux options :" },
                                { list: [
                                    '**Un scénario Dataiku**, lancé depuis une interface web, mais qui demande un accès au workflow.',
                                    '**Une application Streamlit empaquetée en exécutable** avec PyInstaller, sans installation ni accès particulier.'
                                ] },
                                { p: "C'est l'**exécutable** qui a été retenu : l'utilisateur choisit le dossier, lance le traitement, consulte les statistiques (correspondances et écarts), puis télécharge le fichier Excel final et les JSON intermédiaires." }
                            ] }
                        ] },
                        { p: "Résultat : l'outil est **utilisé par les équipes métiers**, avec un gain de temps de **plus de 60 %** sur ce contrôle." }
                    ]
                },
                {
                    title: 'Autres missions',
                    blocks: [
                        { list: [
                            "**Analyse concurrentielle** à partir des données publiques de la CCI : traitement de gros volumes, visualisations comparatives avec Streamlit et Plotly, et mon premier flow Dataiku.",
                            "**Macro VBA** pour l'équipe Conformité : détection automatique de mots interdits dans les commentaires d'un fichier Excel, à la place d'un contrôle manuel répétitif.",
                            "**Prompt engineering** : comparaison de structures de prompts pour améliorer la précision et la contextualisation des réponses d'un LLM.",
                            "**Revue de code** d'un projet récemment mis en production, pour me familiariser avec les standards de qualité, de validation et de documentation des solutions critiques."
                        ] }
                    ]
                },
                {
                    title: 'Méthode de travail',
                    blocks: [
                        { p: "Je suivais les rituels de l'équipe (points avec ma maître de stage, ma manageuse et un data scientist, échanges avec les interlocuteurs métiers) et je tenais un **backlog**, des listes de tâches quotidiennes et un **journal de bord technique** qui retraçait les essais, les erreurs et les décisions." },
                        { p: "Sur chaque projet, j'alternais des phases d'exploration (bibliothèques, modèles, visualisations) et de consolidation (refactorisation, documentation, démonstrations), pour livrer régulièrement des versions présentables. Côté code : modularité, validation des entrées et des sorties du LLM avec Pydantic, et pipelines reproductibles." }
                    ]
                },
                {
                    title: "Pistes d'amélioration identifiées",
                    blocks: [
                        { list: [
                            "**Pipeline RAG** : ajouter de l'OCR pour les PDF scannés, mettre en cache les embeddings récurrents, spécialiser le modèle sur les bilans et croiser les résultats avec plusieurs sources de référence.",
                            "**Power BI** : rafraîchissement automatique des données, alertes par e-mail sur les règles critiques (variation supérieure à 20 %) et prévisions de tendance.",
                            "**Contrôle des factures** : passer à une API avec un front Streamlit, pour gérer plusieurs utilisateurs et mettre à jour l'outil sans regénérer l'exécutable, et suivre le temps de traitement et le taux d'erreur."
                        ] }
                    ]
                }
            ]
        },
        en: {
            title: 'Data Science & Generative AI at Groupe BPCE',
            category: '4th-year internship · 5 months',
            team: 'Data & AI team · CEGC (Groupe BPCE)',
            summary: "Internship in the Data & AI team of Compagnie Européenne de Garanties et Cautions: three tools delivered to business teams, from development through acceptance testing and approval preparation, in a regulated banking environment.",
            stats: [
                { value: '5 months', label: 'September 2025 to January 2026' },
                { value: '3', label: 'Tools delivered to business teams' },
                { value: '77.1%', label: 'Average confidence score of the RAG pipeline' },
                { value: '> 60%', label: 'Time saved on invoice checks' }
            ],
            sections: [
                {
                    title: 'Context',
                    blocks: [
                        { p: "CEGC is the Groupe BPCE subsidiary specialized in sureties and financial guarantees (home loans, public contracts, real estate guarantees). I joined its **Data & AI team**, which designs, tests and industrializes data-driven solutions for business teams." },
                        { p: "The internship topic: **support data science and generative AI projects** across their whole life cycle, from scoping to development, testing, acceptance and approval preparation." },
                        { list: [
                            '**Sensitive banking data**: access rights, processing in controlled environments, management of secrets and API keys, traceability.',
                            '**Controlled costs and volumes**: limit the data sent to language models.',
                            '**Technical constraints**: corporate proxy, a vector database that could only run locally, no Python environment on business users\' computers.',
                            '**Heterogeneous documents**: complex PDFs and non-standard Excel tables.'
                        ] }
                    ]
                },
                {
                    title: 'Timeline',
                    blocks: [
                        { timeline: {
                            title: 'My assignments, September 2025 to January 2026',
                            start: '2025-09-01',
                            end: '2026-02-01',
                            marks: [
                                { date: '2025-09-01', label: 'Sep' },
                                { date: '2025-10-01', label: 'Oct' },
                                { date: '2025-11-01', label: 'Nov' },
                                { date: '2025-12-01', label: 'Dec' },
                                { date: '2026-01-01', label: 'Jan' }
                            ],
                            items: [
                                { label: 'RAG pipeline', dates: 'Sep 3 – Oct 25', from: '2025-09-03', to: '2025-10-25' },
                                { label: 'Power BI dashboard', dates: 'Sep 26 – Oct 16', from: '2025-09-26', to: '2025-10-16' },
                                { label: 'Competitive analysis', dates: 'Oct 26 – Nov 10', from: '2025-10-26', to: '2025-11-10' },
                                { label: 'Invoice checks', dates: 'Nov 6 – end of Jan', from: '2025-11-06', to: '2026-01-31' },
                                { label: 'Prompt engineering', dates: 'Nov 20 – Dec 10', from: '2025-11-20', to: '2025-12-10' },
                                { label: 'Code review', dates: 'Dec 20 – Jan 2', from: '2025-12-20', to: '2026-01-02' }
                            ]
                        } }
                    ]
                },
                {
                    title: 'RAG pipeline: extracting key information from PDF balance sheets',
                    blocks: [
                        { p: "Extracting information from large batches of PDF balance sheets was done by hand: slow and error-prone. For each document, **three pieces of information** had to be found (the SIREN company number, the company name and the closing date), compared with a reference Excel file and, when they matched, the PDF had to be renamed following a precise convention." },
                        { flow: ['Balance sheet PDFs', 'Text extraction', 'Chunks and embeddings', 'Qdrant', 'Targeted queries', 'LLM → JSON', 'Pydantic validation', 'Renaming and Excel'] },
                        { steps: [
                            { title: 'Robust text extraction', blocks: [
                                { p: "An analysis of **20 representative PDFs** showed very uneven extraction quality from one document to the next. I therefore chained **four libraries**: `fitz` (PyMuPDF) first, also reading tables to keep the rows that contain a SIREN or SIRET number, then PyMuPDF4LLM, PdfReader and pikepdf, each one taking over when the previous one returns no usable text." }
                            ] },
                            { title: 'Batch processing', blocks: [
                                { p: "The Qdrant vector database had to run locally only. Beyond **4 PDFs or 20 MB per batch**, we saw instability and crashes, so I split the file list into batches respecting both limits, processed **asynchronously and in parallel**." }
                            ] },
                            { title: 'Chunking, embedding and indexing', blocks: [
                                { p: "The text is split into coherent chunks and turned into embeddings with the **same Sentence-BERT model**, running locally, to keep chunking and representation semantically consistent. Vectors are indexed in **four Qdrant collections**, emptied and reused for each batch." }
                            ] },
                            { title: 'LLM extraction and validation', blocks: [
                                { p: 'One targeted vector query per field (SIREN, name, date) feeds a structured prompt. The LLM answers in **JSON validated by Pydantic**, with:' },
                                { list: [
                                    'whether a SIREN or SIRET number is present, and the extracted values;',
                                    'a **SIREN check with the Luhn algorithm**;',
                                    'the closing date in DDMMYY format;',
                                    'a **confidence score from 0 to 5** and a justification for each value.'
                                ] }
                            ] },
                            { title: 'Reporting', blocks: [
                                { p: "Compliant documents are renamed automatically following the business convention, and a consolidated Excel file is generated. A **Streamlit interface** lets users start runs, follow confidence scores, processing time per batch and the breakdown of errors, and reload past runs." }
                            ] }
                        ] },
                        { p: 'Outcome: a tool able to process **several hundred PDFs**, validated by business feedback, with an **average confidence score of 77.1%**.' },
                        { note: 'This score is the self-assessment returned by the model for each document (from 0 to 5), averaged over the processed batches.' }
                    ]
                },
                {
                    title: 'Power BI dashboard: monitoring the approval rules',
                    blocks: [
                        { p: "The expert-system rules involved in granting home-loan guarantees to individuals had no monitoring view: teams relied on one-off extracts. The Risk department wanted to follow how often each rule fires over time and spot significant changes quickly." },
                        { steps: [
                            { title: 'Star schema', blocks: [
                                { p: 'Connection to the history database, cleaning, then a **star schema**: a fact table of rule activations, a date table and dimension tables (rule name, prefix, type and theme).' }
                            ] },
                            { title: 'DAX measures', blocks: [
                                { p: 'The measures compute the **year-over-year change** over the chosen period (year, quarter or month), based on the last date visible in the filter context: `% change = (activations N − activations N−1) / activations N−1`.' }
                            ] },
                            { title: 'Three report pages', blocks: [
                                { list: [
                                    '**Overview**: activations of a rule over time and a gauge showing the change over the last period.',
                                    '**Comparison**: several rules overlaid, with filters shared by every visual.',
                                    '**Alerts**: a table of rules whose change exceeds **± 1%**.'
                                ] }
                            ] }
                        ] }
                    ]
                },
                {
                    title: 'Automated invoice checks',
                    blocks: [
                        { p: "Business teams checked by hand, for every PDF invoice, that the amount and IBAN matched the Excel report exported from the internal claims management tool. The goal: automate this reconciliation and deliver a tool usable without technical skills." },
                        { flow: ['Excel report and PDF invoices', 'Table detection', 'LLM extraction', 'Join on invoice number', 'Control spreadsheet'] },
                        { steps: [
                            { title: 'Reading the report', blocks: [
                                { p: 'Automatic detection of the right table in the Excel file (headers and number of columns), then conversion to JSON, grouped by reference and enriched with totals.' }
                            ] },
                            { title: 'Reading the invoices', blocks: [
                                { p: 'For each PDF, the text is extracted and an LLM identifies the **IBAN, amount, invoice number, company name and validation date**, returned as JSON.' }
                            ] },
                            { title: 'Reconciliation', blocks: [
                                { p: 'Both sources are joined on the invoice number to produce a consolidated control file listing matches and discrepancies.' }
                            ] },
                            { title: 'Delivery', blocks: [
                                { p: "Business users' computers have no Python. I compared two options:" },
                                { list: [
                                    '**A Dataiku scenario**, started from a web interface, but requiring access to the workflow.',
                                    '**A Streamlit app packaged as an executable** with PyInstaller, with no installation or special access.'
                                ] },
                                { p: 'The **executable** was chosen: users pick the folder, start the run, review the statistics (matches and discrepancies), then download the final Excel file and the intermediate JSON files.' }
                            ] }
                        ] },
                        { p: 'Outcome: the tool is **used by business teams**, with a **time saving of more than 60%** on this check.' }
                    ]
                },
                {
                    title: 'Other assignments',
                    blocks: [
                        { list: [
                            '**Competitive analysis** based on public CCI (Chamber of Commerce) data: processing large volumes, comparative visualizations with Streamlit and Plotly, and my first Dataiku flow.',
                            '**VBA macro** for the Compliance team: automatic detection of banned words in the comments of an Excel file, replacing a repetitive manual check.',
                            '**Prompt engineering**: comparing prompt structures to improve the accuracy and contextualization of an LLM\'s answers.',
                            '**Code review** of a project recently put into production, to learn the quality, validation and documentation standards applied to critical solutions.'
                        ] }
                    ]
                },
                {
                    title: 'How I worked',
                    blocks: [
                        { p: "I followed the team rituals (check-ins with my supervisor, my manager and a data scientist, discussions with business stakeholders) and kept a **backlog**, daily task lists and a **technical log** recording experiments, errors and decisions." },
                        { p: 'On each project, I alternated exploration phases (libraries, models, visualizations) with consolidation phases (refactoring, documentation, demos), to deliver presentable versions regularly. On the code side: modularity, validation of inputs and LLM outputs with Pydantic, and reproducible pipelines.' }
                    ]
                },
                {
                    title: 'Identified improvements',
                    blocks: [
                        { list: [
                            '**RAG pipeline**: add OCR for scanned PDFs, cache recurring embeddings, specialize the model on balance sheets and cross-check results against several reference sources.',
                            '**Power BI**: automatic data refresh, email alerts on critical rules (change above 20%) and trend forecasts.',
                            '**Invoice checks**: move to an API with a Streamlit front end to support several users and update the tool without rebuilding the executable, and monitor processing time and error rate.'
                        ] }
                    ]
                }
            ]
        }
    }
];
