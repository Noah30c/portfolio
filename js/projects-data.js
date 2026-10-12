/**
 * Noah Civilise - Projects content
 * Single source of truth for the project cards and the project pages (FR / EN).
 *
 * Card fields: title, category, team, metric, summary (+ cover image, stack).
 *
 * Project page: a project either provides `sections` (a full case study) or the
 * simpler `context` / `highlights` / `results` / `gallery` fields, which are turned
 * into default sections. A section is { title, blocks }, and each block is one of:
 *   { p: 'text' }                      paragraph (**bold** allowed)
 *   { list: ['text', ...] }            bullet list (**bold** allowed)
 *   { flow: ['step', ...] }            pipeline diagram (boxes and arrows)
 *   { steps: [{ title, tag, blocks }] } numbered sub-steps
 *   { figures: ['figureKey', ...] }    images from the project's `figures` map
 *   { table: { caption, columns, rows, highlightRow } }
 *   { bars: { title, max, ticks, target, items, labelled } }  horizontal bar chart
 *   { note: 'text' }                   highlighted remark
 *
 * ALPR and GPGPU figures come from the case studies published by
 * Talvin Ackbaraly, who co-authored both projects:
 *   https://www.talvin-ackbaraly.com/projects/alpr/
 *   https://www.talvin-ackbaraly.com/projects/irgpu/
 */
const PROJECTS = [
    {
        id: 'alpr',
        featured: true,
        icon: 'fas fa-car',
        cover: 'images/projects/alpr/cover.jpg',
        hero: { src: 'images/projects/alpr/hero.webp', w: 1600, h: 900 },
        stack: ['C++17', 'Python', 'OpenCV', 'Random Forest', 'scikit-learn', 'CMake', 'Google Test'],
        figures: {
            original: { src: 'images/projects/alpr/original.webp', w: 1920, h: 1080, caption: { fr: "Image d'origine (1920 × 1080)", en: 'Original image (1920 × 1080)' } },
            preprocessed: { src: 'images/projects/alpr/preprocessed.webp', w: 800, h: 450, caption: { fr: 'Après prétraitement : 800 px de large, niveaux de gris', en: 'After preprocessing: 800 px wide, grayscale' } },
            mmlpf: { src: 'images/projects/alpr/mmlpf.webp', w: 1600, h: 900, caption: { fr: '1/5 · Filtre de contraste MMLPF', en: '1/5 · MMLPF contrast filter' } },
            sobel: { src: 'images/projects/alpr/sobel.webp', w: 1600, h: 900, caption: { fr: '2/5 · Sobel vertical', en: '2/5 · Vertical Sobel' } },
            otsu: { src: 'images/projects/alpr/otsu.webp', w: 1600, h: 900, caption: { fr: "3/5 · Seuillage d'Otsu", en: '3/5 · Otsu thresholding' } },
            closing: { src: 'images/projects/alpr/closing.webp', w: 1600, h: 900, caption: { fr: '4/5 · Fermeture morphologique 17 × 3', en: '4/5 · 17 × 3 morphological closing' } },
            components: { src: 'images/projects/alpr/components.webp', w: 1600, h: 900, caption: { fr: '5/5 · Composantes candidates', en: '5/5 · Candidate components' } },
            candidates: { src: 'images/projects/alpr/candidates.webp', w: 1920, h: 1080, caption: { fr: 'Candidats des trois branches, fusionnés puis dédoublonnés par NMS', en: 'Candidates from the three branches, merged then deduplicated by NMS' } },
            result: { src: 'images/projects/alpr/result.webp', w: 1920, h: 1080, caption: { fr: 'Résultat : la plaque retenue par la Random Forest', en: 'Result: the plate selected by the Random Forest' } }
        },
        fr: {
            title: "Reconnaissance de plaques d'immatriculation (ALPR)",
            category: 'Vision · Machine Learning',
            team: 'Binôme · 5 semaines',
            metric: 'Précision 86 % · 402 ms/image en C++',
            summary: "Localisation de plaques dans des images Full HD sans deep learning : vision classique et Random Forest, prototypée en Python puis réécrite en C++17.",
            stats: [
                { value: '86 %', label: 'Précision (C++17)' },
                { value: '67 %', label: 'Rappel' },
                { value: '402 ms', label: 'Par image Full HD' },
                { value: '−14 %', label: 'Temps de calcul face à Python' }
            ],
            sections: [
                {
                    title: 'Contexte et contraintes',
                    blocks: [
                        { p: "La lecture automatique de plaques est une brique des systèmes de transport intelligents et du contrôle d'accès routier. Notre objectif : localiser la plaque d'un véhicule dans des images haute résolution, quels que soient le véhicule et l'environnement." },
                        { list: [
                            "**Pas de réseau de neurones profond** (ni YOLO, ni CNN lourd) : uniquement de la vision classique et un modèle d'apprentissage léger, plus explicable et peu gourmand en mémoire.",
                            "**Images Full HD (1920 × 1080)** prises en conditions réelles : plein soleil, pluie, ombres, angles inclinés et occlusions partielles.",
                            "**Deux formats de plaques** à reconnaître : les anciennes plaques brésiliennes et le nouveau format Mercosul."
                        ] }
                    ]
                },
                {
                    title: 'Le pipeline',
                    blocks: [
                        { flow: ['Image Full HD', 'Prétraitement', 'Candidats (ROI)', 'Descripteurs HOG', 'Random Forest', 'Plaque localisée'] },
                        { p: "Parcourir toute l'image serait beaucoup trop lent. Nous générons donc un petit nombre de régions candidates, nous décrivons chacune par un vecteur de caractéristiques, puis un classifieur désigne la plus probable." }
                    ]
                },
                {
                    title: 'Les étapes en détail',
                    blocks: [
                        { steps: [
                            {
                                title: 'Prétraitement',
                                blocks: [
                                    { p: "L'image est redimensionnée à **800 px de large**, ratio conservé, pour stabiliser l'échelle des objets et réduire le temps de calcul. Elle est ensuite convertie en **niveaux de gris** : seules les variations de luminance comptent pour la suite." },
                                    { figures: ['original', 'preprocessed'] }
                                ]
                            },
                            {
                                title: 'Génération des candidats',
                                blocks: [
                                    { p: 'Trois branches travaillent en parallèle, pour ne rater ni les grandes plaques ni les plaques lointaines :' },
                                    { list: [
                                        "**Branche principale** : filtre MMLPF, qui renforce le contraste local des caractères, Sobel vertical, seuillage d'Otsu, puis fermeture morphologique 17 × 3 qui soude les caractères en un seul bloc.",
                                        "**Branche agrandie ×2** : la même chaîne sur l'image agrandie deux fois, pour les plaques petites ou éloignées.",
                                        "**Branche Canny** : détection de contours avec des seuils adaptés à l'intensité médiane de l'image."
                                    ] },
                                    { figures: ['mmlpf', 'sobel', 'otsu', 'closing', 'components', 'candidates'] },
                                    { p: "Dans chaque branche, nous ne gardons que les composantes dont l'**aire est comprise entre 50 et 40 000 px** et dont le **rapport largeur/hauteur est compris entre 1 et 8**. Les candidats des trois branches sont ensuite fusionnés, puis les doublons sont supprimés par **NMS** (suppression des non-maxima selon l'IoU)." }
                                ]
                            },
                            {
                                title: 'Description des candidats',
                                blocks: [
                                    { p: 'Chaque candidat est recadré et redimensionné en **64 × 32 px**, puis décrit par un vecteur de **293 valeurs** :' },
                                    { list: [
                                        '**288 valeurs HOG** : 32 cellules de 8 × 8 px, 9 orientations de gradient, normalisation L2.',
                                        '**5 mesures géométriques** : rapport largeur/hauteur, aire relative, positions horizontale et verticale relatives, densité de contours.'
                                    ] }
                                ]
                            },
                            {
                                title: 'Classification',
                                blocks: [
                                    { p: "Une **Random Forest** (`cv::ml::RTrees` d'OpenCV) attribue un score de confiance à chaque candidat. La région qui obtient le score positif le plus élevé est retenue comme plaque." },
                                    { figures: ['result'] }
                                ]
                            }
                        ] }
                    ]
                },
                {
                    title: 'De Python à C++17',
                    blocks: [
                        { p: "Nous avons d'abord monté le pipeline en **Python** (OpenCV et scikit-learn) pour l'assembler vite, valider les filtres morphologiques et entraîner le classifieur. Nous l'avons ensuite réécrit en **C++17**, pour gagner en vitesse et ne plus dépendre d'abstractions d'OpenCV que nous ne maîtrisions pas." },
                        { p: "En parallèle, notre module **MyCV** réimplémente à la main une partie des opérations d'OpenCV : la conversion en niveaux de gris en arithmétique entière pondérée, la convolution de Sobel 2D avec une gestion explicite de la mémoire et des bords, et les opérateurs géométriques. Le projet est construit avec CMake et testé avec Google Test." }
                    ]
                },
                {
                    title: 'Résultats',
                    blocks: [
                        { p: 'Les trois versions ont été évaluées sur les **1 440 images de test** du jeu de données public UFPR-ALPR.' },
                        { table: {
                            caption: 'UFPR-ALPR, 1 440 images de test. VP : vrais positifs.',
                            columns: ['Implémentation', 'VP', 'Précision', 'Rappel', 'F1', 'Temps / image'],
                            rows: [
                                ['Python', '955', '0,858', '0,663', '0,748', '468,5 ms'],
                                ['C++17 (OpenCV)', '963', '0,863', '0,669', '0,754', '402,3 ms'],
                                ['C++17 (MyCV)', '955', '0,850', '0,663', '0,745', '583,7 ms']
                            ],
                            highlightRow: 1
                        } },
                        { list: [
                            "La version **C++17 avec OpenCV** est la meilleure sur tous les critères, et **66 ms plus rapide** par image que Python (−14 %).",
                            "Python et C++ donnent **exactement le même résultat dans 92,85 % des cas** : la réécriture est fidèle.",
                            "**MyCV**, écrite en boucles C++ simples sans SIMD, est la plus lente (584 ms) : sur les convolutions, les routines vectorisées d'OpenCV (AVX2, NEON) font la différence.",
                            "L'**entraînement** passe de 3 min 46 s en Python à 2 min 48 s en C++, grâce à une meilleure répartition sur les cœurs (441 % d'utilisation CPU contre 201 %)."
                        ] },
                        { note: "Limite : avec un rappel de 0,67, environ une plaque sur trois du jeu de test n'est pas localisée." }
                    ]
                }
            ]
        },
        en: {
            title: 'Automatic License Plate Recognition (ALPR)',
            category: 'Vision · Machine Learning',
            team: 'Pair project · 5 weeks',
            metric: '86% precision · 402 ms/image in C++',
            summary: 'License plate localization in Full HD images without deep learning: classical computer vision and a Random Forest, prototyped in Python then rewritten in C++17.',
            stats: [
                { value: '86%', label: 'Precision (C++17)' },
                { value: '67%', label: 'Recall' },
                { value: '402 ms', label: 'Per Full HD image' },
                { value: '−14%', label: 'Runtime versus Python' }
            ],
            sections: [
                {
                    title: 'Context and constraints',
                    blocks: [
                        { p: 'License plate reading is a building block of intelligent transport systems and road access control. Our goal: locate the plate of a vehicle in high-resolution images, whatever the vehicle and the surroundings.' },
                        { list: [
                            '**No deep neural network** (no YOLO, no heavy CNN): only classical computer vision and a lightweight learning model, easier to explain and light on memory.',
                            '**Full HD images (1920 × 1080)** taken in real conditions: bright sun, rain, shadows, tilted angles and partial occlusions.',
                            '**Two plate formats** to handle: the old Brazilian plates and the new Mercosul format.'
                        ] }
                    ]
                },
                {
                    title: 'The pipeline',
                    blocks: [
                        { flow: ['Full HD image', 'Preprocessing', 'Candidates (ROI)', 'HOG descriptors', 'Random Forest', 'Located plate'] },
                        { p: 'Scanning the whole image would be far too slow. Instead, we generate a small number of candidate regions, describe each one with a feature vector, and let a classifier pick the most likely one.' }
                    ]
                },
                {
                    title: 'Step by step',
                    blocks: [
                        { steps: [
                            {
                                title: 'Preprocessing',
                                blocks: [
                                    { p: 'The image is resized to **800 px wide**, keeping its aspect ratio, to stabilize object scale and cut computation time. It is then converted to **grayscale**: only luminance changes matter for the next steps.' },
                                    { figures: ['original', 'preprocessed'] }
                                ]
                            },
                            {
                                title: 'Candidate generation',
                                blocks: [
                                    { p: 'Three branches run in parallel so that neither large nor distant plates are missed:' },
                                    { list: [
                                        '**Main branch**: MMLPF filter, which boosts the local contrast of characters, vertical Sobel, Otsu thresholding, then a 17 × 3 morphological closing that merges the characters into a single block.',
                                        '**2× upscaled branch**: the same chain on the image enlarged twice, for small or distant plates.',
                                        "**Canny branch**: edge detection with thresholds adapted to the image's median intensity."
                                    ] },
                                    { figures: ['mmlpf', 'sobel', 'otsu', 'closing', 'components', 'candidates'] },
                                    { p: 'In each branch, we only keep components whose **area is between 50 and 40,000 px** and whose **aspect ratio is between 1 and 8**. Candidates from the three branches are then merged, and duplicates are removed with **NMS** (IoU-based non-maximum suppression).' }
                                ]
                            },
                            {
                                title: 'Candidate description',
                                blocks: [
                                    { p: 'Each candidate is cropped and resized to **64 × 32 px**, then described by a **293-value** vector:' },
                                    { list: [
                                        '**288 HOG values**: 32 cells of 8 × 8 px, 9 gradient orientations, L2 normalization.',
                                        '**5 geometric measures**: aspect ratio, relative area, relative horizontal and vertical position, edge density.'
                                    ] }
                                ]
                            },
                            {
                                title: 'Classification',
                                blocks: [
                                    { p: "A **Random Forest** (OpenCV's `cv::ml::RTrees`) gives each candidate a confidence score. The region with the highest positive score is kept as the plate." },
                                    { figures: ['result'] }
                                ]
                            }
                        ] }
                    ]
                },
                {
                    title: 'From Python to C++17',
                    blocks: [
                        { p: 'We first built the pipeline in **Python** (OpenCV and scikit-learn) to put it together quickly, validate the morphological filters and train the classifier. We then rewrote it in **C++17** for speed, and to stop relying on OpenCV abstractions we did not fully control.' },
                        { p: 'Alongside, our **MyCV** module reimplements part of the OpenCV operations by hand: grayscale conversion with weighted integer arithmetic, 2D Sobel convolution with explicit memory and border handling, and the geometric operators. The project is built with CMake and tested with Google Test.' }
                    ]
                },
                {
                    title: 'Results',
                    blocks: [
                        { p: 'All three versions were evaluated on the **1,440 test images** of the public UFPR-ALPR dataset.' },
                        { table: {
                            caption: 'UFPR-ALPR, 1,440 test images. TP: true positives.',
                            columns: ['Implementation', 'TP', 'Precision', 'Recall', 'F1', 'Time / image'],
                            rows: [
                                ['Python', '955', '0.858', '0.663', '0.748', '468.5 ms'],
                                ['C++17 (OpenCV)', '963', '0.863', '0.669', '0.754', '402.3 ms'],
                                ['C++17 (MyCV)', '955', '0.850', '0.663', '0.745', '583.7 ms']
                            ],
                            highlightRow: 1
                        } },
                        { list: [
                            'The **C++17 version with OpenCV** is the best on every metric, and **66 ms faster** per image than Python (−14%).',
                            'Python and C++ give **exactly the same output in 92.85% of cases**: the rewrite is faithful.',
                            "**MyCV**, written as plain C++ loops without SIMD, is the slowest (584 ms): on convolutions, OpenCV's vectorized routines (AVX2, NEON) make the difference.",
                            '**Training** drops from 3 min 46 s in Python to 2 min 48 s in C++, thanks to better use of the cores (441% CPU usage versus 201%).'
                        ] },
                        { note: 'Limitation: with a recall of 0.67, about one plate in three in the test set is not located.' }
                    ]
                }
            ]
        }
    },
    {
        id: 'gpgpu',
        featured: true,
        icon: 'fas fa-microchip',
        cover: 'images/projects/gpgpu/cover.jpg',
        hero: { src: 'images/projects/gpgpu/hero.webp', w: 1600, h: 900 },
        stack: ['CUDA', 'C++', 'GStreamer', 'Nsight Compute', 'Nsight Systems'],
        figures: {
            fp64: { src: 'images/projects/gpgpu/nsight-fp64-warning.webp', w: 1397, h: 67, wide: true, caption: { fr: 'Nsight Compute : avertissement sur le coût du FP64 (double) sur ce GPU', en: 'Nsight Compute: warning about the cost of FP64 (double) on this GPU' } },
            curandVram: { src: 'images/projects/gpgpu/nsight-curand-vram.webp', w: 2352, h: 587, wide: true, caption: { fr: 'Nsight Systems : la VRAM occupée par les états cuRAND', en: 'Nsight Systems: VRAM taken by the cuRAND states' } },
            curand320: { src: 'images/projects/gpgpu/curand-alloc-320x240.webp', w: 427, h: 267, maxWidth: 300, caption: { fr: 'Allocation cuRAND en 320 × 240', en: 'cuRAND allocation at 320 × 240' } },
            curand1080: { src: 'images/projects/gpgpu/curand-alloc-1080p.webp', w: 467, h: 272, maxWidth: 300, caption: { fr: 'Allocation cuRAND en 1080p', en: 'cuRAND allocation at 1080p' } },
            throughputCurand: { src: 'images/projects/gpgpu/throughput-curand.webp', w: 1801, h: 243, wide: true, caption: { fr: 'Débit avec cuRAND', en: 'Throughput with cuRAND' } },
            throughputLcg: { src: 'images/projects/gpgpu/throughput-lcg.webp', w: 1864, h: 243, wide: true, caption: { fr: 'Débit avec le générateur LCG', en: 'Throughput with the LCG generator' } },
            vramSaturation: { src: 'images/projects/gpgpu/vram-saturation.webp', w: 772, h: 188, wide: true, caption: { fr: 'Accès VRAM saturés sans mémoire partagée', en: 'Saturated VRAM accesses without shared memory' } },
            hystBefore: { src: 'images/projects/gpgpu/nsight-hysteresis-before.webp', w: 1550, h: 1045, caption: { fr: 'Hystérésis : trafic mémoire sans mémoire partagée (Nsight Compute)', en: 'Hysteresis: memory traffic without shared memory (Nsight Compute)' } },
            hystAfter: { src: 'images/projects/gpgpu/nsight-hysteresis-after.webp', w: 1550, h: 1038, caption: { fr: 'Avec mémoire partagée : 8 fois moins de requêtes VRAM', en: 'With shared memory: 8× fewer VRAM requests' } },
            blocks: { src: 'images/projects/gpgpu/nsight-blocks-32x8.webp', w: 962, h: 116, wide: true, caption: { fr: 'Nsight Compute : accès mémoire regroupés avec des blocs de 32 × 8', en: 'Nsight Compute: coalesced memory accesses with 32 × 8 blocks' } }
        },
        fr: {
            title: 'Détection de mouvement sur GPU (CUDA)',
            category: 'Calcul GPU · Vidéo',
            team: 'Équipe de 4 · 4 semaines',
            metric: '×24 · 129 FPS contre 5,3 FPS sur CPU',
            summary: "Portage CUDA d'un filtre GStreamer de détection de mouvement par soustraction de fond : de 5,3 à 129 FPS, pour un objectif de 30 FPS.",
            stats: [
                { value: '×24,5', label: 'Accélération face au CPU' },
                { value: '129,5 FPS', label: 'Contre 5,3 FPS en C++' },
                { value: '0,995', label: 'SSIM face à la référence CPU' },
                { value: '6', label: 'Optimisations mesurées' }
            ],
            sections: [
                {
                    title: 'Objectif',
                    blocks: [
                        { p: "Accélérer un filtre GStreamer de détection de mouvement par soustraction de fond pour qu'il dépasse **30 FPS en haute résolution**, avec CUDA et GStreamer uniquement. La version C++ de référence plafonnait à **5,29 FPS**." },
                        { list: [
                            '**Trouver les vrais goulots d\'étranglement** (mémoire, génération aléatoire, morphologie) demandait une analyse fine au profileur.',
                            "**Rester fidèle au CPU** : chaque optimisation devait garder une sortie quasi identique à la référence, vérifiée par SSIM."
                        ] }
                    ]
                },
                {
                    title: "L'algorithme",
                    blocks: [
                        { flow: ['Image RGB', 'Fond estimé (K = 3)', 'Masque de mouvement', 'Ouverture', 'Hystérésis', 'Coloration'] },
                        { p: 'Chaque pixel est traité indépendamment, en cinq étapes :' },
                        { steps: [
                            { title: 'Estimation du fond', blocks: [
                                { p: "Chaque pixel garde **K = 3 réservoirs** (une couleur et un poids). Si la couleur courante est à ±10 près, sur chaque canal, de celle d'un réservoir, ce réservoir est mis à jour par moyenne pondérée glissante et son poids augmente. Sinon, le réservoir le plus faible est remplacé au hasard, avec une probabilité inversement proportionnelle à son poids. Le fond est la couleur du réservoir le plus lourd." }
                            ] },
                            { title: 'Masque de mouvement', blocks: [
                                { p: "Écart entre le pixel et le fond, mesuré en **norme L1** (moyenne des différences absolues sur R, G et B). Plus l'écart est grand, plus il y a de mouvement." }
                            ] },
                            { title: 'Ouverture morphologique', blocks: [
                                { p: 'Érosion puis dilatation avec un **disque de rayon 3** : les pixels isolés disparaissent, les objets retrouvent leur taille.' }
                            ] },
                            { title: 'Seuillage par hystérésis', blocks: [
                                { p: "Un score **supérieur à 45** marque un pixel sûr. Un score **supérieur à 20** n'est gardé que s'il touche un pixel sûr (4-connexité). La propagation se répète jusqu'à convergence." }
                            ] },
                            { title: 'Coloration', blocks: [
                                { p: "Les pixels retenus sont teintés en rouge semi-transparent sur l'image d'origine (image en tête de page)." }
                            ] }
                        ] }
                    ]
                },
                {
                    title: 'Premier portage : un thread par pixel',
                    blocks: [
                        { p: "Puisque les pixels sont indépendants, le premier portage lance **un thread par pixel** sur une grille 2D, avec des blocs de 16 × 16. Ce portage direct passe déjà de 5,29 à **48,92 FPS** (×9,2), avec un SSIM de 0,9951." },
                        { p: 'Nous avons ensuite profilé chaque version avec **Nsight Systems** (vue d\'ensemble dans le temps) et **Nsight Compute** (analyse détaillée de chaque kernel), puis appliqué les optimisations une à une, en mesurant chacune.' }
                    ]
                },
                {
                    title: 'Les optimisations, une par une',
                    blocks: [
                        { steps: [
                            { title: 'Allocation unique et passage en float', tag: '×18,0 · 95,4 FPS', blocks: [
                                { p: "Les buffers GPU étaient réalloués à chaque image. Nous les allouons désormais **une seule fois**, à la première image : il ne reste que **deux transferts PCIe par image**, l'entrée vers le GPU et le résultat vers le CPU." },
                                { p: 'Nsight Compute signalait aussi le coût des calculs en **double précision** sur ce GPU grand public. Le passage en `float` (avec `lroundf()`) double presque le débit.' },
                                { figures: ['fp64'] }
                            ] },
                            { title: 'Générateur LCG à la place de cuRAND', tag: '×18,7 · 99,0 FPS', blocks: [
                                { p: "Le remplacement aléatoire des réservoirs utilisait cuRAND, dont l'état occupe **48 octets par pixel** en VRAM : environ 3,5 Mo en 320 × 240, mais **94,9 Mo en 1080p**. Nous l'avons remplacé par un **générateur congruentiel linéaire** calculé à la volée à partir de l'index du pixel et du numéro de l'image, sans aucune mémoire supplémentaire." },
                                { figures: ['curandVram', 'curand320', 'curand1080', 'throughputCurand', 'throughputLcg'] }
                            ] },
                            { title: 'Hystérésis en mémoire partagée', tag: '×23,5 · 124,3 FPS', blocks: [
                                { p: "Sans optimisation, chaque itération de l'hystérésis imposait une synchronisation CPU/GPU et relisait ses voisins en mémoire globale, ce qui saturait la bande passante de la VRAM. Nous découpons l'image en **tuiles de 16 × 16** chargées en mémoire partagée, avec un halo d'un pixel." },
                                { p: 'Les requêtes VRAM par itération passent de **139 000 à 17 700**, soit 8 fois moins, et ce kernel gagne **26 %** à lui seul.' },
                                { figures: ['vramSaturation', 'hystBefore', 'hystAfter'] }
                            ] },
                            { title: 'Ouverture morphologique par tuiles', tag: '×24,1 · 127,6 FPS', blocks: [
                                { p: 'Chaque thread de l\'ouverture lisait ses **29 voisins** directement en mémoire globale. Avec des tuiles en mémoire partagée (halo de 2 × R) et les décalages du disque placés en **mémoire constante**, le trafic VRAM est divisé par deux : de **10,69 à 5,44 Go/s**.' }
                            ] },
                            { title: 'Blocs de 32 × 8 threads', tag: '×24,5 · 129,5 FPS', blocks: [
                                { p: "Des blocs de 256 threads dont la largeur, 32, correspond à celle d'un **warp** : les accès le long des lignes de l'image sont parfaitement regroupés (coalescence). Dernier gain : de 127,57 à **129,51 FPS**." },
                                { figures: ['blocks'] }
                            ] }
                        ] }
                    ]
                },
                {
                    title: 'Résultats',
                    blocks: [
                        { bars: {
                            title: 'Images par seconde, version par version',
                            max: 140,
                            ticks: [0, 30, 60, 90, 120],
                            target: { value: 30, label: 'Objectif : 30 FPS' },
                            labelled: [0, 6],
                            items: [
                                { label: 'C++ (référence CPU)', value: 5.29, display: '5,3 FPS · ×1' },
                                { label: 'CUDA naïf', value: 48.92, display: '48,9 FPS · ×9,2' },
                                { label: '+ allocation unique et float', value: 95.43, display: '95,4 FPS · ×18,0' },
                                { label: '+ générateur LCG', value: 98.96, display: '99,0 FPS · ×18,7' },
                                { label: '+ hystérésis en mémoire partagée', value: 124.34, display: '124,3 FPS · ×23,5' },
                                { label: '+ ouverture par tuiles', value: 127.57, display: '127,6 FPS · ×24,1' },
                                { label: '+ blocs de 32 × 8', value: 129.51, display: '129,5 FPS · ×24,5' }
                            ]
                        } },
                        { table: {
                            caption: 'Temps total sur le jeu de vidéos de test, et SSIM face à la référence CPU.',
                            columns: ['Version', 'Temps (s)', 'FPS', 'Accélération', 'SSIM'],
                            rows: [
                                ['C++ (référence CPU)', '616,78', '5,29', '×1,00', '1,0000'],
                                ['CUDA naïf', '52,72', '48,92', '×9,24', '0,9951'],
                                ['+ allocation unique et float', '18,18', '95,43', '×18,03', '0,9950'],
                                ['+ générateur LCG', '17,01', '98,96', '×18,70', '0,9950'],
                                ['+ hystérésis en mémoire partagée', '10,80', '124,34', '×23,49', '0,9949'],
                                ['+ ouverture par tuiles', '10,65', '127,57', '×24,10', '0,9949'],
                                ['+ blocs de 32 × 8', '10,56', '129,51', '×24,47', '0,9949']
                            ],
                            highlightRow: 6
                        } },
                        { p: "Toutes les versions CUDA restent entre **0,9949 et 0,9951** de SSIM face à la référence CPU : les accélérations ne dégradent pas le résultat." }
                    ]
                },
                {
                    title: 'Choix des motifs parallèles',
                    blocks: [
                        { list: [
                            "**Stencil** pour l'ouverture et l'hystérésis : chaque pixel lit un voisinage local, chargé en mémoire partagée.",
                            "**Pas de réduction** pour la convergence de l'hystérésis : le drapeau ne passe que de `false` à `true`, l'écriture est idempotente, donc ni condition de course ni `atomicOr`.",
                            "**Pas de scan** : ce motif ne convient pas à un traitement local, pixel par pixel."
                        ] }
                    ]
                }
            ]
        },
        en: {
            title: 'GPU Motion Detection (CUDA)',
            category: 'GPU computing · Video',
            team: 'Team of 4 · 4 weeks',
            metric: '24× · 129 FPS versus 5.3 FPS on CPU',
            summary: 'CUDA port of a background-subtraction motion detection filter for GStreamer: from 5.3 to 129 FPS, against a 30 FPS target.',
            stats: [
                { value: '24.5×', label: 'Speedup over the CPU' },
                { value: '129.5 FPS', label: 'Versus 5.3 FPS in C++' },
                { value: '0.995', label: 'SSIM against the CPU reference' },
                { value: '6', label: 'Measured optimizations' }
            ],
            sections: [
                {
                    title: 'Goal',
                    blocks: [
                        { p: 'Speed up a background-subtraction motion detection filter for GStreamer so that it exceeds **30 FPS at high resolution**, using only CUDA and GStreamer. The C++ reference implementation topped out at **5.29 FPS**.' },
                        { list: [
                            '**Finding the real bottlenecks** (memory, random number generation, morphology) required careful profiling.',
                            '**Staying faithful to the CPU**: every optimization had to keep an output almost identical to the reference, checked with SSIM.'
                        ] }
                    ]
                },
                {
                    title: 'The algorithm',
                    blocks: [
                        { flow: ['RGB frame', 'Background (K = 3)', 'Motion mask', 'Opening', 'Hysteresis', 'Tinting'] },
                        { p: 'Each pixel is processed independently, in five steps:' },
                        { steps: [
                            { title: 'Background estimation', blocks: [
                                { p: "Each pixel keeps **K = 3 reservoirs** (a color and a weight). If the current color is within ±10 of a reservoir's color on every channel, that reservoir is updated with a sliding weighted average and its weight increases. Otherwise, the weakest reservoir is replaced at random, with a probability inversely proportional to its weight. The background is the color of the heaviest reservoir." }
                            ] },
                            { title: 'Motion mask', blocks: [
                                { p: 'Distance between the pixel and the background, measured with the **L1 norm** (mean absolute difference over R, G and B). The larger the distance, the more motion.' }
                            ] },
                            { title: 'Morphological opening', blocks: [
                                { p: 'Erosion then dilation with a **radius-3 disk**: isolated pixels disappear, objects get their size back.' }
                            ] },
                            { title: 'Hysteresis thresholding', blocks: [
                                { p: 'A score **above 45** marks a strong pixel. A score **above 20** is kept only if it touches a strong pixel (4-connectivity). Propagation repeats until convergence.' }
                            ] },
                            { title: 'Tinting', blocks: [
                                { p: 'The selected pixels are tinted semi-transparent red over the original frame (image at the top of the page).' }
                            ] }
                        ] }
                    ]
                },
                {
                    title: 'First port: one thread per pixel',
                    blocks: [
                        { p: 'Since pixels are independent, the first port launches **one thread per pixel** on a 2D grid, with 16 × 16 blocks. This direct port already goes from 5.29 to **48.92 FPS** (9.2×), with an SSIM of 0.9951.' },
                        { p: 'We then profiled every version with **Nsight Systems** (timeline overview) and **Nsight Compute** (detailed per-kernel analysis), and applied the optimizations one at a time, measuring each one.' }
                    ]
                },
                {
                    title: 'Optimizations, one at a time',
                    blocks: [
                        { steps: [
                            { title: 'Single allocation and float', tag: '18.0× · 95.4 FPS', blocks: [
                                { p: 'GPU buffers were reallocated for every frame. We now allocate them **once**, on the first frame: only **two PCIe transfers per frame** remain, the input to the GPU and the result back to the CPU.' },
                                { p: 'Nsight Compute also flagged the cost of **double precision** on this consumer GPU. Switching to `float` (with `lroundf()`) nearly doubles the throughput.' },
                                { figures: ['fp64'] }
                            ] },
                            { title: 'LCG generator instead of cuRAND', tag: '18.7× · 99.0 FPS', blocks: [
                                { p: 'Random reservoir replacement relied on cuRAND, whose state takes **48 bytes per pixel** of VRAM: about 3.5 MB at 320 × 240, but **94.9 MB at 1080p**. We replaced it with a **linear congruential generator** computed on the fly from the pixel index and the frame number, with no extra memory at all.' },
                                { figures: ['curandVram', 'curand320', 'curand1080', 'throughputCurand', 'throughputLcg'] }
                            ] },
                            { title: 'Hysteresis in shared memory', tag: '23.5× · 124.3 FPS', blocks: [
                                { p: 'Without optimization, every hysteresis iteration forced a CPU/GPU synchronization and re-read its neighbors from global memory, saturating VRAM bandwidth. We split the image into **16 × 16 tiles** loaded into shared memory, with a one-pixel halo.' },
                                { p: 'VRAM requests per iteration drop from **139,000 to 17,700**, 8× fewer, and this kernel alone gets **26%** faster.' },
                                { figures: ['vramSaturation', 'hystBefore', 'hystAfter'] }
                            ] },
                            { title: 'Tiled morphological opening', tag: '24.1× · 127.6 FPS', blocks: [
                                { p: 'Each opening thread read its **29 neighbors** straight from global memory. With shared-memory tiles (2 × R halo) and the disk offsets stored in **constant memory**, VRAM traffic is halved: from **10.69 to 5.44 GB/s**.' }
                            ] },
                            { title: '32 × 8 thread blocks', tag: '24.5× · 129.5 FPS', blocks: [
                                { p: "256-thread blocks whose width, 32, matches a **warp**: accesses along the image rows are fully coalesced. Final gain: from 127.57 to **129.51 FPS**." },
                                { figures: ['blocks'] }
                            ] }
                        ] }
                    ]
                },
                {
                    title: 'Results',
                    blocks: [
                        { bars: {
                            title: 'Frames per second, version by version',
                            max: 140,
                            ticks: [0, 30, 60, 90, 120],
                            target: { value: 30, label: 'Target: 30 FPS' },
                            labelled: [0, 6],
                            items: [
                                { label: 'C++ (CPU reference)', value: 5.29, display: '5.3 FPS · 1×' },
                                { label: 'Naive CUDA', value: 48.92, display: '48.9 FPS · 9.2×' },
                                { label: '+ single allocation and float', value: 95.43, display: '95.4 FPS · 18.0×' },
                                { label: '+ LCG generator', value: 98.96, display: '99.0 FPS · 18.7×' },
                                { label: '+ hysteresis in shared memory', value: 124.34, display: '124.3 FPS · 23.5×' },
                                { label: '+ tiled opening', value: 127.57, display: '127.6 FPS · 24.1×' },
                                { label: '+ 32 × 8 blocks', value: 129.51, display: '129.5 FPS · 24.5×' }
                            ]
                        } },
                        { table: {
                            caption: 'Total time on the test video set, and SSIM against the CPU reference.',
                            columns: ['Version', 'Time (s)', 'FPS', 'Speedup', 'SSIM'],
                            rows: [
                                ['C++ (CPU reference)', '616.78', '5.29', '1.00×', '1.0000'],
                                ['Naive CUDA', '52.72', '48.92', '9.24×', '0.9951'],
                                ['+ single allocation and float', '18.18', '95.43', '18.03×', '0.9950'],
                                ['+ LCG generator', '17.01', '98.96', '18.70×', '0.9950'],
                                ['+ hysteresis in shared memory', '10.80', '124.34', '23.49×', '0.9949'],
                                ['+ tiled opening', '10.65', '127.57', '24.10×', '0.9949'],
                                ['+ 32 × 8 blocks', '10.56', '129.51', '24.47×', '0.9949']
                            ],
                            highlightRow: 6
                        } },
                        { p: 'Every CUDA version stays between **0.9949 and 0.9951** SSIM against the CPU reference: the speedups do not degrade the output.' }
                    ]
                },
                {
                    title: 'Choice of parallel patterns',
                    blocks: [
                        { list: [
                            '**Stencil** for opening and hysteresis: each pixel reads a local neighborhood, loaded into shared memory.',
                            '**No reduction** for hysteresis convergence: the flag only goes from `false` to `true`, the write is idempotent, so there is no race condition and no need for `atomicOr`.',
                            '**No scan**: this pattern does not fit local, per-pixel processing.'
                        ] }
                    ]
                }
            ]
        }
    },
    {
        id: 'dermscan',
        featured: true,
        icon: 'fas fa-heartbeat',
        stack: ['Python', 'OpenCV', 'scikit-learn', 'FastAPI', 'RabbitMQ', 'React', 'Docker'],
        fr: {
            title: 'DermScan (IA médicale)',
            category: 'IA et santé · Vision',
            metric: 'Sensibilité > 85 % · règle ABCDE',
            summary: "Aide au diagnostic des lésions cutanées : pipeline de vision et ML explicable, déployé en microservices (FastAPI, RabbitMQ, Docker).",
            context: "Application distribuée d'aide au diagnostic précoce des lésions mélanocytaires, qui privilégie l'explicabilité médicale plutôt qu'un modèle « boîte noire ».",
            highlights: [
                "Extraction de descripteurs morphologiques inspirés de la règle ABCDE (K-Means, ACP, moments invariants de Hu).",
                "Classification par perceptron multicouche (MLP) pondéré, avec une sensibilité supérieure à 85 %.",
                "Architecture microservices asynchrone, avec des files RabbitMQ pour absorber les pics de charge.",
                "Conteneurisation Docker et API REST FastAPI documentée (OpenAPI)."
            ]
        },
        en: {
            title: 'DermScan (Medical AI)',
            category: 'AI & healthcare · Vision',
            metric: 'Sensitivity > 85% · ABCDE rule',
            summary: 'Diagnostic aid for skin lesions: an explainable vision and ML pipeline, deployed as microservices (FastAPI, RabbitMQ, Docker).',
            context: 'Distributed application supporting early diagnosis of melanocytic lesions, favoring medical explainability over a "black box" model.',
            highlights: [
                'Morphological features inspired by the ABCDE rule (K-Means, PCA, Hu invariant moments).',
                'Classification with a weighted multilayer perceptron (MLP), reaching a sensitivity above 85%.',
                'Asynchronous microservices architecture, with RabbitMQ queues to absorb load spikes.',
                'Docker containerization and a FastAPI REST API documented with OpenAPI.'
            ]
        }
    },
    {
        id: 'ocr',
        featured: true,
        icon: 'fas fa-brain',
        stack: ['C', 'MLP', 'Hough', 'Backpropagation', 'Backtracking'],
        fr: {
            title: 'OCR et résolution de Sudoku',
            category: 'Vision · Réseaux de neurones',
            metric: 'Réseau de neurones écrit en C · détection de grille',
            summary: "Lecture d'une grille de Sudoku photographiée et résolution automatique, avec un réseau de neurones écrit en C sans bibliothèque.",
            context: "Projet complet qui combine traitement d'image et réseau de neurones codé from scratch en C pour lire, puis résoudre, une grille de Sudoku photographiée.",
            highlights: [
                "Binarisation adaptative, détection des lignes par transformée de Hough et redressement de la perspective.",
                "Perceptron multicouche écrit en C, entraîné par rétropropagation du gradient, pour reconnaître les chiffres.",
                "Résolution de la grille par backtracking en quelques millisecondes.",
                "Incrustation de la solution directement sur la photo d'origine."
            ]
        },
        en: {
            title: 'OCR & Sudoku Solver',
            category: 'Vision · Neural networks',
            metric: 'Neural network written in C · grid detection',
            summary: 'Reads a photographed Sudoku grid and solves it, using a neural network written in C without any library.',
            context: 'End-to-end project combining image processing and a from-scratch neural network in C to read, then solve, a photographed Sudoku grid.',
            highlights: [
                'Adaptive thresholding, line detection with the Hough transform and perspective correction.',
                'Multilayer perceptron written in C, trained with backpropagation, to recognize the digits.',
                'Backtracking solver that completes the grid in a few milliseconds.',
                'The solution is drawn back onto the original photo.'
            ]
        }
    },
    {
        id: 'tiger',
        featured: false,
        icon: 'fas fa-code-branch',
        stack: ['C++', 'Flex', 'Bison', 'LLVM IR'],
        fr: {
            title: 'Compilateur Tiger (LLVM)',
            category: 'Compilation',
            metric: 'Génération LLVM IR · inlining et analyse d\'échappement',
            summary: "Compilateur pour le langage objet Tiger, réalisé en équipe : analyse lexicale et syntaxique, typage, puis génération de LLVM IR.",
            context: "Développement en équipe d'un compilateur pour Tiger, un langage orienté objet, de la grammaire jusqu'à la génération de code intermédiaire LLVM IR.",
            highlights: [
                "Analyse lexicale et syntaxique avec Flex et Bison, qui produit un arbre de syntaxe abstraite (AST) typé.",
                "Analyse sémantique : typage statique, portées lexicales, classes et héritage.",
                "Traduction de l'AST en LLVM IR.",
                "Passes d'optimisation : inlining de fonctions et analyse d'échappement des variables."
            ]
        },
        en: {
            title: 'Tiger Compiler (LLVM)',
            category: 'Compilers',
            metric: 'LLVM IR generation · inlining and escape analysis',
            summary: 'Team-built compiler for the object-oriented Tiger language: lexing and parsing, type checking, then LLVM IR generation.',
            context: 'Team development of a compiler for Tiger, an object-oriented language, from the grammar to LLVM IR generation.',
            highlights: [
                'Lexing and parsing with Flex and Bison, producing a typed abstract syntax tree (AST).',
                'Semantic analysis: static typing, lexical scopes, classes and inheritance.',
                'Translation of the AST to LLVM IR.',
                'Optimization passes: function inlining and escape analysis.'
            ]
        }
    },
    {
        id: 'shell42',
        featured: false,
        icon: 'fas fa-terminal',
        stack: ['C', 'POSIX', 'AST', 'Job control'],
        fr: {
            title: 'Shell Unix POSIX (42sh)',
            category: "Systèmes d'exploitation",
            metric: 'POSIX · contrôle de jobs et AST',
            summary: "Shell Unix conforme POSIX écrit en C : parsing en AST, gestion des processus et des jobs, redirections et pipelines.",
            context: "Développement en C d'un interpréteur de commandes Unix conforme à la norme POSIX.",
            highlights: [
                "Lexer et parser récursif qui construisent un arbre d'exécution.",
                "Processus en arrière-plan, signaux Unix et contrôle des jobs (fg, bg).",
                "Redirections d'entrées/sorties, pipelines et sous-shells.",
                "Expansion des variables d'environnement, alias et builtins (cd, exit, history)."
            ]
        },
        en: {
            title: 'POSIX Unix Shell (42sh)',
            category: 'Operating systems',
            metric: 'POSIX · job control and AST',
            summary: 'POSIX-compliant Unix shell written in C: AST parsing, process and job management, redirections and pipelines.',
            context: 'Development in C of a Unix command interpreter compliant with the POSIX standard.',
            highlights: [
                'Recursive lexer and parser building an execution tree.',
                'Background processes, Unix signals and job control (fg, bg).',
                'Input/output redirections, pipelines and subshells.',
                'Environment variable expansion, aliases and builtins (cd, exit, history).'
            ]
        }
    },
    {
        id: 'fps3d',
        featured: false,
        icon: 'fas fa-gamepad',
        stack: ['C#', 'Unity', 'Blender', 'Shader Graph'],
        fr: {
            title: 'Jeu de tir multijoueur (Unity)',
            category: 'Jeu vidéo · Réseau',
            metric: 'Physique temps réel · synchronisation réseau UDP',
            summary: "FPS multijoueur sous Unity : environnements modélisés, animations de personnages et synchronisation réseau client-serveur.",
            context: "Développement d'un jeu de tir à la première personne en multijoueur, avec synchronisation de l'état de jeu sur le réseau.",
            highlights: [
                "Modélisation et texturation des environnements et des personnages dans Blender, avec leurs animations.",
                "Système balistique : trajectoires des projectiles et raycasting pour les collisions.",
                "Architecture réseau client-serveur avec compensation de latence et interpolation des positions distantes.",
                "États de jeu, scores et effets de particules."
            ]
        },
        en: {
            title: 'Multiplayer Shooter (Unity)',
            category: 'Video game · Networking',
            metric: 'Real-time physics · UDP network sync',
            summary: 'Multiplayer FPS in Unity: modeled environments, character animations and client-server network synchronization.',
            context: 'Development of a multiplayer first-person shooter, with game state synchronized over the network.',
            highlights: [
                'Environment and character modeling and texturing in Blender, with their animations.',
                'Ballistics: projectile trajectories and raycasting for hit detection.',
                'Client-server networking with lag compensation and interpolation of remote positions.',
                'Game states, scoring and particle effects.'
            ]
        }
    },
    {
        id: 'bazaar',
        featured: false,
        icon: 'fas fa-network-wired',
        stack: ['Java', 'Quarkus', 'Kafka', 'Hibernate', 'Docker'],
        fr: {
            title: 'EpiBazaar',
            category: 'Systèmes distribués',
            metric: 'Microservices Quarkus · événements Kafka',
            summary: "Backend distribué d'un jeu de simulation économique : microservices Quarkus, persistance Hibernate et événements Apache Kafka.",
            context: "Architecture backend distribuée pour un jeu de simulation économique en temps réel, avec synchronisation des inventaires et des transactions.",
            highlights: [
                "Découpage en microservices : authentification, boutique, inventaire et joueur.",
                "Communication asynchrone par événements, via des topics Apache Kafka.",
                "Quarkus pour des démarrages rapides et une faible empreinte mémoire.",
                "Tests d'intégration automatisés et persistance relationnelle avec Hibernate ORM."
            ]
        },
        en: {
            title: 'EpiBazaar',
            category: 'Distributed systems',
            metric: 'Quarkus microservices · Kafka events',
            summary: 'Distributed backend for an economic simulation game: Quarkus microservices, Hibernate persistence and Apache Kafka events.',
            context: 'Distributed backend for a real-time economic simulation game, keeping inventories and transactions in sync.',
            highlights: [
                'Split into microservices: authentication, shop, inventory and player.',
                'Asynchronous, event-driven communication through Apache Kafka topics.',
                'Quarkus for fast startup and a small memory footprint.',
                'Automated integration tests and relational persistence with Hibernate ORM.'
            ]
        }
    },
    {
        id: 'carpool',
        featured: false,
        icon: 'fas fa-route',
        stack: ['Java', 'JavaFX', 'Scene Builder', 'SQLite'],
        fr: {
            title: 'Application de covoiturage',
            category: 'Application de bureau',
            metric: 'Réservation · mise en relation · alertes',
            summary: "Application JavaFX de covoiturage pour étudiants : réservation, mise en relation conducteur-passager et alertes de trajet.",
            context: "Application de covoiturage pour la communauté étudiante, avec réservation, alertes de trajet et tableau de bord.",
            highlights: [
                "Interface JavaFX conçue avec Scene Builder, selon le patron MVC.",
                "Calcul d'itinéraires et mise en relation automatique entre conducteurs et passagers.",
                "Notifications lors des changements d'horaire.",
                "Persistance locale (SQLite), profils utilisateurs et évaluations."
            ]
        },
        en: {
            title: 'Carpooling App',
            category: 'Desktop application',
            metric: 'Booking · matching · alerts',
            summary: 'JavaFX carpooling app for students: booking, driver-passenger matching and trip alerts.',
            context: 'Carpooling application for the student community, with booking, trip alerts and a dashboard.',
            highlights: [
                'JavaFX interface built with Scene Builder, following the MVC pattern.',
                'Route computation and automatic matching between drivers and passengers.',
                'Notifications when a schedule changes.',
                'Local persistence (SQLite), user profiles and ratings.'
            ]
        }
    }
];
