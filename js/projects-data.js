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
 *                                      (a tick is a number or { value, label })
 *   { note: 'text' }                   highlighted remark
 *
 * DermScan figures were checked against the project repository in October 2026
 * (lesion-grouped cross-validation run on the team's code and dataset).
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
        icon: 'fas fa-microscope',
        cover: 'images/projects/dermscan/cover.jpg',
        hero: { src: 'images/projects/dermscan/hero.webp', w: 1600, h: 900 },
        stack: ['Python', 'OpenCV', 'scikit-learn', 'FastAPI', 'RabbitMQ', 'Next.js', 'React', 'Docker', 'GitLab CI'],
        repo: null,
        figures: {
            home: { src: 'images/projects/dermscan/screen-home.png', w: 1600, h: 900, caption: {
                fr: "Formulaire d'analyse : photo de la lésion, âge, sexe et localisation.",
                en: "Analysis form: lesion photo, age, sex and body site." } },
            openapi: { src: 'images/projects/dermscan/openapi.png', w: 1600, h: 900, caption: {
                fr: "Documentation OpenAPI générée par FastAPI pour POST /scan.",
                en: "FastAPI-generated OpenAPI documentation for POST /scan." } },
            architecture: { src: 'images/projects/dermscan/architecture.png', w: 1600, h: 900, wide: true, caption: {
                fr: "Quatre services reliés par trois files RabbitMQ. La passerelle associe chaque réponse à sa requête grâce au correlation_id.",
                en: "Four services linked by three RabbitMQ queues. The gateway matches each reply to its request by correlation_id." } },
            original: { src: 'images/projects/dermscan/original.jpg', w: 1600, h: 900, caption: {
                fr: "Tuile ISIC 2024 de 129 × 129 px, agrandie : mélanome in situ (ISIC_0279372, Frazer Institute, University of Queensland, CC BY).",
                en: "129 × 129 px ISIC 2024 tile, upscaled: melanoma in situ (ISIC_0279372, Frazer Institute, University of Queensland, CC BY)." } },
            hairRemoval: { src: 'images/projects/dermscan/hair-removal.jpg', w: 1600, h: 900, caption: {
                fr: "Entrée, masque des poils (black-hat 5 × 5, seuil 10), puis inpainting et filtre médian.",
                en: "Input, hair mask (5 × 5 black-hat, threshold 10), then inpainting and median filter." } },
            segmentation: { src: 'images/projects/dermscan/segmentation.png', w: 1600, h: 900, caption: {
                fr: "K-means à deux classes en HSV, plus grande composante connexe, puis lésion isolée.",
                en: "Two-class K-means in HSV, largest connected component, then isolated lesion." } },
            asymmetry: { src: 'images/projects/dermscan/feature-asymmetry.jpg', w: 1600, h: 900, caption: {
                fr: "Axes passant par le centroïde. En rouge, les pixels qui ne se superposent pas après repli gauche-droite.",
                en: "Axes through the centroid. In red, pixels that do not overlap after a left-right fold." } },
            border: { src: 'images/projects/dermscan/feature-border.jpg', w: 1600, h: 900, caption: {
                fr: "Contour (vert), enveloppe convexe (bleu) et 8 octants. À droite, distance au centroïde selon l'angle et moyenne par octant.",
                en: "Contour (green), convex hull (blue) and 8 octants. Right: distance to the centroid by angle and mean per octant." } },
            color: { src: 'images/projects/dermscan/feature-color.png', w: 1600, h: 900, caption: {
                fr: "Lésion quantifiée en 5 couleurs (K-means en Lab) et part de chaque couleur. La ligne marque le seuil de 5 %.",
                en: "Lesion quantised into 5 colours (K-means in Lab) and share of each colour. The line marks the 5% threshold." } },
            diameter: { src: 'images/projects/dermscan/feature-diameter.jpg', w: 1600, h: 900, caption: {
                fr: "Axes principaux du contour (longueur 4√λ) et cercle de même aire.",
                en: "Principal axes of the contour (length 4√λ) and circle of equal area." } },
            datasetSamples: { src: 'images/projects/dermscan/dataset-samples.jpg', w: 1600, h: 900, caption: {
                fr: "En haut, 4 lésions bénignes. En bas, 2 mélanomes, 1 carcinome basocellulaire et 1 carcinome épidermoïde (ISIC Archive, CC BY et CC0).",
                en: "Top: 4 benign lesions. Bottom: 2 melanomas, 1 basal cell carcinoma and 1 squamous cell carcinoma (ISIC Archive, CC BY and CC0)." } },
            ci: { src: 'images/projects/dermscan/ci-pipeline.png', w: 1600, h: 900, caption: {
                fr: "Pipeline GitLab : build (kaniko), test (pytest), train (manuel), push (tags).",
                en: "GitLab pipeline: build (kaniko), test (pytest), train (manual), push (tags)." } },
            tests: { src: 'images/projects/dermscan/tests.png', w: 1600, h: 900, caption: {
                fr: "27 tests réussis. Couverture : 84 % (API), 36 % (segmentation), 63 % (ML).",
                en: "27 passing tests. Coverage: 84% (API), 36% (segmentation), 63% (ML)." } },
            segmentationCases: { src: 'images/projects/dermscan/segmentation-cases.jpg', w: 1600, h: 900, caption: {
                fr: "Deux segmentations correctes (à gauche) et trois échecs : bande noire, poils clairs, texture de la peau.",
                en: "Two correct segmentations (left) and three failures: black border, light hair, skin texture." } }
        },
        fr: {
            title: 'DermScan : analyse de lésions cutanées',
            category: 'IA médicale · Microservices',
            team: 'Équipe de 3 · 16 jours (juin 2026)',
            metric: 'AUC 0,80 en validation croisée par lésion',
            summary: "Application web qui estime le risque de malignité d'une lésion cutanée à partir d'une photo et de trois données cliniques. Elle affiche un score par critère ABCD, calculé par des microservices Python reliés par RabbitMQ.",
            stats: [
                { value: '1 993', label: 'lésions ISIC 2024, dont 393 malignes' },
                { value: '26', label: "descripteurs d'image A, B, C, D" },
                { value: '0,80', label: 'AUC, validation croisée par lésion' },
                { value: '27', label: 'tests automatisés réussis' }
            ],
            sections: [
                { title: 'Contexte et contraintes', blocks: [
                    { p: "DermScan est un projet d'équipe réalisé à l'EPITA. L'utilisateur envoie la photo d'une lésion cutanée, son âge, son sexe et la localisation de la lésion. L'application renvoie un risque de malignité global et un score pour chaque critère : asymétrie, bordure, couleur, diamètre et données cliniques." },
                    { p: "Le modèle est entraîné sur un sous-ensemble du jeu public **ISIC 2024** : 1 993 lésions, dont 393 malignes confirmées par histologie." },
                    { list: [
                        "**Objectif** : une sensibilité supérieure à 0,85 sur la classe maligne, fixée dans le script d'évaluation.",
                        "**Lisibilité** : un score par critère A, B, C et D, en plus du score global.",
                        "**Données** : des tuiles de 79 à 215 px découpées dans des photos 3D du corps entier, et seulement 393 cas malins.",
                        "**Architecture** : quatre services en conteneurs Docker, reliés par des files RabbitMQ, construits et testés par GitLab CI.",
                        "**Usage** : un outil indicatif. L'interface rappelle qu'il ne remplace pas un avis médical."
                    ] }
                ] },
                { title: 'Architecture et pipeline', blocks: [
                    { flow: ['Photo + âge, sexe, site', 'API FastAPI', 'Prétraitement', 'Segmentation', '26 descripteurs ABCD', '6 MLP', 'Scores A à E + global'] },
                    { p: "Le frontend envoie la requête à une passerelle FastAPI. Celle-ci publie un message JSON dans une file RabbitMQ et attend la réponse qui porte le même `correlation_id`. Le service de segmentation produit le masque de la lésion. Le service ML calcule les descripteurs et les scores, puis publie le résultat dans une troisième file." },
                    { figures: ['architecture'] }
                ] },
                { title: 'Les étapes en détail', blocks: [
                    { steps: [
                        { title: 'Saisie et API', tag: 'POST /scan · OpenAPI 3.1', blocks: [
                            { p: "L'interface Next.js demande une photo et trois données cliniques. La passerelle reçoit un formulaire multipart, encode l'image en base64 et la publie avec un identifiant de corrélation. Sans résultat au bout de 60 s, elle renvoie une erreur 504." },
                            { figures: ['home', 'openapi'] }
                        ] },
                        { title: 'Prétraitement', tag: 'black-hat 5×5 · médiane 3×3', blocks: [
                            { p: "Les poils faussent la segmentation. Un filtre morphologique **black-hat** (noyau elliptique 5 × 5) fait ressortir les structures fines et sombres. Les pixels au-dessus d'un seuil de 10 sont reconstruits par **inpainting** (méthode de Telea). Un filtre médian 3 × 3 réduit ensuite le bruit." },
                            { figures: ['original', 'hairRemoval'] }
                        ] },
                        { title: 'Segmentation', tag: 'K-means k = 2 · HSV', blocks: [
                            { p: "L'image passe en HSV. Un **K-means à deux classes** sépare la lésion de la peau, et la classe la plus petite est retenue comme lésion. Seule la plus grande composante connexe est conservée, ce qui élimine les petites zones isolées." },
                            { figures: ['segmentation'] }
                        ] },
                        { title: 'A · Asymétrie', tag: '6 descripteurs', blocks: [
                            { p: "Le masque est replié autour de son centroïde, horizontalement puis verticalement. La part de pixels qui ne se superposent pas mesure l'asymétrie. Les trois premiers **moments de Hu**, en échelle logarithmique, complètent la description de la forme." },
                            { figures: ['asymmetry'] }
                        ] },
                        { title: 'B · Bordure', tag: '5 descripteurs', blocks: [
                            { p: "Le contour donne cinq mesures : la compacité P²/(4πA), la variance et le maximum de la courbure sur une centaine de points, le rapport entre le périmètre de l'enveloppe convexe et celui du contour, et l'écart-type de la distance au centroïde sur 8 octants." },
                            { figures: ['border'] }
                        ] },
                        { title: 'C · Couleur', tag: '10 descripteurs · K-means k = 5', blocks: [
                            { p: "Les pixels de la lésion passent dans l'espace **Lab**. Pour chaque canal, on calcule la moyenne, l'écart-type et l'étendue. Un K-means à 5 classes, sur 5 000 pixels au plus, compte les couleurs qui couvrent plus de 5 % de la lésion." },
                            { figures: ['color'] }
                        ] },
                        { title: 'D · Diamètre', tag: '5 descripteurs', blocks: [
                            { p: "Les axes principaux viennent des valeurs propres de la covariance des points du contour (longueur 4√λ). S'y ajoutent le rapport des deux axes, le diamètre du cercle de même aire et l'aire. Ces mesures sont en pixels." },
                            { figures: ['diameter'] }
                        ] },
                        { title: 'Classification', tag: 'MLP 64 · 5 MLP par critère', blocks: [
                            { p: "Un **MLP** à une couche cachée de 64 neurones (ReLU, Adam) reçoit les 26 descripteurs, l'âge normalisé, et le sexe et la localisation encodés en one-hot. Il produit le score global. En dessous de 0,3, la lésion est classée bénigne, au-dessus de 0,7 maligne, et suspecte entre les deux." },
                            { p: "Cinq MLP plus petits (8 à 10 neurones) n'utilisent chacun qu'un groupe de variables : A, B, C, D ou E (âge, sexe, localisation). Ce sont eux qui donnent le score affiché pour chaque critère." }
                        ] },
                        { title: 'Intégration continue', tag: 'build · test · train · push', blocks: [
                            { p: "Chaque service a son Dockerfile. La CI GitLab construit les images avec kaniko, lance pytest avec la couverture pour les trois services Python, puis tague les images. Un job manuel entraîne le modèle et le publie dans le Package Registry. Le service ML le télécharge au démarrage." },
                            { figures: ['ci', 'tests'] }
                        ] }
                    ] }
                ] },
                { title: 'Données et entraînement', blocks: [
                    { p: "**ISIC 2024** contient des tuiles d'environ 130 px découpées dans des photos 3D du corps entier. Le sous-ensemble garde les 393 lésions malignes et 1 600 lésions bénignes tirées au hasard. Pour équilibrer les classes, chaque image maligne est aussi tournée de 90°, 180° et 270°." },
                    { table: { caption: "Sous-ensemble utilisé, diagnostics d'après l'API ISIC", columns: ['Classe', 'Lésions', 'Lignes', 'Diagnostics'], rows: [
                        ['Bénin', '1 600', '1 600', 'Non précisé pour 1 596'],
                        ['Malin', '393', '1 572', '163 carcinomes basocellulaires, 157 mélanomes, 73 carcinomes épidermoïdes']
                    ] } },
                    { figures: ['datasetSamples'] },
                    { list: [
                        "**Variables** : 26 descripteurs d'image, plus l'âge, le sexe et la localisation.",
                        "**Entraînement** : `MLPClassifier` de scikit-learn, 500 itérations au plus. Entraînement et évaluation prennent 2,4 s sur un Apple M5.",
                        "**Découpage du projet** : 80 % / 20 %, stratifié, ligne par ligne."
                    ] }
                ] },
                { title: 'Résultats', blocks: [
                    { table: { caption: 'ISIC 2024, 3 172 lignes (1 993 lésions), MLP global, Apple M5', columns: ['Protocole', 'Sensibilité', 'Spécificité', 'AUC'], rows: [
                        ['Découpage du projet, par ligne (80/20)', '0,927', '0,825', '0,925'],
                        ['Validation croisée par lésion (5 plis)', '0,59 ± 0,04', '0,85 ± 0,03', '0,80 ± 0,02'],
                        ['Validation croisée par patient (5 plis)', '0,58 ± 0,02', '0,85 ± 0,02', '0,78 ± 0,03']
                    ], highlightRow: 1 } },
                    { bars: { title: 'AUC par critère, validation croisée par lésion (5 plis)', max: 100, ticks: [{ value: 0, label: '0' }, { value: 25, label: '0,25' }, { value: 50, label: '0,5' }, { value: 75, label: '0,75' }, { value: 100, label: '1' }], labelled: [0, 3], target: { value: 50, label: 'Hasard : AUC 0,50' },
                              items: [
                                  { label: 'Global', value: 80, display: '0,80' },
                                  { label: 'A · Asymétrie', value: 55, display: '0,55' },
                                  { label: 'B · Bordure', value: 68, display: '0,68' },
                                  { label: 'C · Couleur', value: 82, display: '0,82' },
                                  { label: 'D · Diamètre', value: 64, display: '0,64' },
                                  { label: 'E · Clinique', value: 61, display: '0,61' }
                              ] } },
                    { list: [
                        "Le découpage d'origine plaçait les rotations d'une même lésion à la fois dans l'entraînement et dans le test : les 235 lésions malignes du test étaient aussi dans l'entraînement. La sensibilité de 0,93 vient de là.",
                        "Quand toutes les images d'une lésion restent dans le même pli, la sensibilité tombe à 0,59. L'objectif de 0,85 n'est pas atteint. Le regroupement par patient donne des valeurs proches.",
                        "La couleur (C) est le critère le plus informatif. L'asymétrie (A) fait à peine mieux que le hasard (AUC 0,55).",
                        "Sur un Apple M5, la segmentation prend 7,6 ms et la prédiction 27,5 ms (médianes sur 240 appels).",
                        "27 tests passent. La couverture est de 84 % pour l'API, 63 % pour le ML et 36 % pour la segmentation. Les consommateurs RabbitMQ ne sont pas testés."
                    ] },
                    { note: "Limite : la validation croisée groupée et les mesures de temps ont été faites après le projet, sur le même code et les mêmes données. Le jeu est rééquilibré à 50/50 : ces chiffres ne reflètent pas la proportion réelle de lésions malignes." }
                ] },
                { title: 'Limites', blocks: [
                    { figures: ['segmentationCases'] },
                    { list: [
                        "**Segmentation non évaluée** : nous n'avions pas de masques de référence. Elle échoue sur les bandes noires de bord, les poils clairs et les peaux texturées.",
                        "**Classes** : « malin » regroupe mélanomes et carcinomes, et 60 % des cas malins ne sont pas des mélanomes. Le critère E porte sur les données cliniques, pas sur l'évolution de la lésion.",
                        "**Domaine** : le modèle n'a vu que des tuiles d'environ 130 px. Son comportement sur des images dermoscopiques ou des photos de téléphone n'a pas été mesuré.",
                        "**Unités** : le diamètre est mesuré en pixels, pas en millimètres.",
                        "**Reproductibilité** : `np.random.seed` ne fixe pas le générateur de `cv.kmeans`. Le service reste stable, car il traite chaque requête dans un thread neuf. En revanche, les masques du jeu d'entraînement dépendent de l'ordre de traitement.",
                        "**Modèle** : le MLP global s'arrête à 500 itérations sans converger. La calibration des probabilités est écrite mais n'est pas branchée."
                    ] },
                    { note: "Crédits images : ISIC Archive. Memorial Sloan Kettering Cancer Center et Frazer Institute, University of Queensland (CC BY) ; ACEMID MIA (CC0)." }
                ] },
                { title: 'Mon rôle', blocks: [
                    { list: [
                        "J'ai écrit l'extraction des **26 descripteurs ABCD** à partir du masque de segmentation.",
                        "J'ai construit le jeu de données à partir d'ISIC 2024 (sélection, rééquilibrage, rotations, extraction en parallèle) ainsi que le code d'entraînement et d'évaluation.",
                        "J'ai ajouté les données cliniques de bout en bout : champ de l'API, colonnes du jeu, modèle E, et transmission entre les services, où elles se perdaient.",
                        "J'ai réalisé le frontend Next.js : formulaire, appel à l'API et page de résultats par critère.",
                        "Les autres membres de l'équipe ont pris en charge Docker, la CI, la passerelle, RabbitMQ et la segmentation."
                    ] }
                ] }
            ]
        },
        en: {
            title: 'DermScan: skin lesion analysis',
            category: 'Medical AI · Microservices',
            team: 'Team of 3 · 16 days (June 2026)',
            metric: 'AUC 0.80 with lesion-grouped cross-validation',
            summary: "Web application that estimates the malignancy risk of a skin lesion from a photo and three clinical inputs. It shows a score for each ABCD criterion, computed by Python microservices linked through RabbitMQ.",
            stats: [
                { value: '1,993', label: 'ISIC 2024 lesions, 393 of them malignant' },
                { value: '26', label: 'image features (A, B, C, D)' },
                { value: '0.80', label: 'AUC, lesion-grouped cross-validation' },
                { value: '27', label: 'passing automated tests' }
            ],
            sections: [
                { title: 'Context and constraints', blocks: [
                    { p: "DermScan is a team project carried out at EPITA. The user uploads a photo of a skin lesion, with their age, sex and the lesion's body site. The application returns an overall malignancy risk and a score for each criterion: asymmetry, border, colour, diameter and clinical data." },
                    { p: "The model is trained on a subset of the public **ISIC 2024** dataset: 1,993 lesions, 393 of them malignant and confirmed by histology." },
                    { list: [
                        "**Target**: sensitivity above 0.85 on the malignant class, set in the evaluation script.",
                        "**Readability**: one score per criterion A, B, C and D, on top of the overall score.",
                        "**Data**: 79 to 215 px tiles cropped from 3D total-body photos, and only 393 malignant cases.",
                        "**Architecture**: four Docker services linked by RabbitMQ queues, built and tested by GitLab CI.",
                        "**Use**: an indicative tool. The interface states that it does not replace medical advice."
                    ] }
                ] },
                { title: 'Architecture and pipeline', blocks: [
                    { flow: ['Photo + age, sex, site', 'FastAPI gateway', 'Preprocessing', 'Segmentation', '26 ABCD features', '6 MLPs', 'Scores A to E + overall'] },
                    { p: "The frontend sends the request to a FastAPI gateway. The gateway publishes a JSON message to a RabbitMQ queue and waits for the reply that carries the same `correlation_id`. The segmentation service produces the lesion mask. The ML service computes the features and scores, then publishes the result to a third queue." },
                    { figures: ['architecture'] }
                ] },
                { title: 'Steps in detail', blocks: [
                    { steps: [
                        { title: 'Input and API', tag: 'POST /scan · OpenAPI 3.1', blocks: [
                            { p: "The Next.js interface asks for a photo and three clinical inputs. The gateway receives a multipart form, encodes the image in base64 and publishes it with a correlation ID. If no result arrives within 60 s, it returns a 504 error." },
                            { figures: ['home', 'openapi'] }
                        ] },
                        { title: 'Preprocessing', tag: '5×5 black-hat · 3×3 median', blocks: [
                            { p: "Hair disrupts segmentation. A morphological **black-hat** filter (5 × 5 elliptical kernel) brings out thin dark structures. Pixels above a threshold of 10 are rebuilt by **inpainting** (Telea's method). A 3 × 3 median filter then reduces noise." },
                            { figures: ['original', 'hairRemoval'] }
                        ] },
                        { title: 'Segmentation', tag: 'K-means k = 2 · HSV', blocks: [
                            { p: "The image is converted to HSV. A **two-class K-means** separates the lesion from the skin, and the smaller class is taken as the lesion. Only the largest connected component is kept, which removes small isolated regions." },
                            { figures: ['segmentation'] }
                        ] },
                        { title: 'A · Asymmetry', tag: '6 features', blocks: [
                            { p: "The mask is folded around its centroid, horizontally then vertically. The share of pixels that do not overlap measures asymmetry. The first three **Hu moments**, on a log scale, complete the shape description." },
                            { figures: ['asymmetry'] }
                        ] },
                        { title: 'B · Border', tag: '5 features', blocks: [
                            { p: "The contour gives five measures: compactness P²/(4πA), the variance and maximum of curvature over about 100 points, the ratio of the convex hull perimeter to the contour perimeter, and the standard deviation of the distance to the centroid over 8 octants." },
                            { figures: ['border'] }
                        ] },
                        { title: 'C · Colour', tag: '10 features · K-means k = 5', blocks: [
                            { p: "Lesion pixels are converted to **Lab** space. For each channel, we compute the mean, standard deviation and range. A 5-class K-means, on at most 5,000 pixels, counts the colours that cover more than 5% of the lesion." },
                            { figures: ['color'] }
                        ] },
                        { title: 'D · Diameter', tag: '5 features', blocks: [
                            { p: "The principal axes come from the eigenvalues of the covariance of the contour points (length 4√λ). Added to them are the ratio of the two axes, the diameter of the circle of equal area, and the area. These measures are in pixels." },
                            { figures: ['diameter'] }
                        ] },
                        { title: 'Classification', tag: 'MLP 64 · 5 per-criterion MLPs', blocks: [
                            { p: "An **MLP** with one hidden layer of 64 neurons (ReLU, Adam) takes the 26 features, the standardised age, and one-hot encoded sex and body site. It produces the overall score. Below 0.3, the lesion is labelled benign; above 0.7, malignant; in between, suspect." },
                            { p: "Five smaller MLPs (8 to 10 neurons) each use a single group of variables: A, B, C, D or E (age, sex, body site). They give the score shown for each criterion." }
                        ] },
                        { title: 'Continuous integration', tag: 'build · test · train · push', blocks: [
                            { p: "Each service has its own Dockerfile. GitLab CI builds the images with kaniko, runs pytest with coverage for the three Python services, then tags the images. A manual job trains the model and publishes it to the Package Registry. The ML service downloads it at startup." },
                            { figures: ['ci', 'tests'] }
                        ] }
                    ] }
                ] },
                { title: 'Data and training', blocks: [
                    { p: "**ISIC 2024** contains tiles of about 130 px cropped from 3D total-body photos. The subset keeps all 393 malignant lesions and 1,600 randomly drawn benign lesions. To balance the classes, each malignant image is also rotated by 90°, 180° and 270°." },
                    { table: { caption: 'Subset used, diagnoses from the ISIC API', columns: ['Class', 'Lesions', 'Rows', 'Diagnoses'], rows: [
                        ['Benign', '1,600', '1,600', 'Not specified for 1,596'],
                        ['Malignant', '393', '1,572', '163 basal cell carcinomas, 157 melanomas, 73 squamous cell carcinomas']
                    ] } },
                    { figures: ['datasetSamples'] },
                    { list: [
                        "**Inputs**: 26 image features, plus age, sex and body site.",
                        "**Training**: scikit-learn `MLPClassifier`, at most 500 iterations. Training and evaluation take 2.4 s on an Apple M5.",
                        "**Project split**: 80% / 20%, stratified, row by row."
                    ] }
                ] },
                { title: 'Results', blocks: [
                    { table: { caption: 'ISIC 2024, 3,172 rows (1,993 lesions), overall MLP, Apple M5', columns: ['Protocol', 'Sensitivity', 'Specificity', 'AUC'], rows: [
                        ['Project split, by row (80/20)', '0.927', '0.825', '0.925'],
                        ['Lesion-grouped cross-validation (5 folds)', '0.59 ± 0.04', '0.85 ± 0.03', '0.80 ± 0.02'],
                        ['Patient-grouped cross-validation (5 folds)', '0.58 ± 0.02', '0.85 ± 0.02', '0.78 ± 0.03']
                    ], highlightRow: 1 } },
                    { bars: { title: 'AUC per criterion, lesion-grouped cross-validation (5 folds)', max: 100, ticks: [{ value: 0, label: '0' }, { value: 25, label: '0.25' }, { value: 50, label: '0.5' }, { value: 75, label: '0.75' }, { value: 100, label: '1' }], labelled: [0, 3], target: { value: 50, label: 'Chance: AUC 0.50' },
                              items: [
                                  { label: 'Overall', value: 80, display: '0.80' },
                                  { label: 'A · Asymmetry', value: 55, display: '0.55' },
                                  { label: 'B · Border', value: 68, display: '0.68' },
                                  { label: 'C · Colour', value: 82, display: '0.82' },
                                  { label: 'D · Diameter', value: 64, display: '0.64' },
                                  { label: 'E · Clinical', value: 61, display: '0.61' }
                              ] } },
                    { list: [
                        "The original split put rotations of the same lesion in both the training and the test set: all 235 malignant test lesions were also in the training set. That is where the 0.93 sensitivity came from.",
                        "When all images of a lesion stay in the same fold, sensitivity drops to 0.59. The 0.85 target is not met. Grouping by patient gives similar values.",
                        "Colour (C) is the most informative criterion. Asymmetry (A) is barely better than chance (AUC 0.55).",
                        "On an Apple M5, segmentation takes 7.6 ms and prediction 27.5 ms (medians over 240 calls).",
                        "27 tests pass. Coverage is 84% for the API, 63% for ML and 36% for segmentation. The RabbitMQ consumers are not tested."
                    ] },
                    { note: "Limitation: the grouped cross-validation and the timings were measured after the project, on the same code and data. The dataset is rebalanced to 50/50, so these figures do not reflect the real proportion of malignant lesions." }
                ] },
                { title: 'Limitations', blocks: [
                    { figures: ['segmentationCases'] },
                    { list: [
                        "**Segmentation not evaluated**: we had no reference masks. It fails on black borders, light hair and textured skin.",
                        "**Classes**: \"malignant\" groups melanomas and carcinomas, and 60% of malignant cases are not melanomas. Criterion E covers clinical data, not the lesion's evolution.",
                        "**Domain**: the model has only seen tiles of about 130 px. Its behaviour on dermoscopic images or phone photos was not measured.",
                        "**Units**: the diameter is measured in pixels, not millimetres.",
                        "**Reproducibility**: `np.random.seed` does not seed `cv.kmeans`. The service stays stable because it handles each request in a fresh thread. However, the training-set masks depend on processing order.",
                        "**Model**: the overall MLP stops at 500 iterations without converging. Probability calibration is written but not wired in."
                    ] },
                    { note: "Image credits: ISIC Archive. Memorial Sloan Kettering Cancer Center and Frazer Institute, University of Queensland (CC BY); ACEMID MIA (CC0)." }
                ] },
                { title: 'My role', blocks: [
                    { list: [
                        "I wrote the extraction of the **26 ABCD features** from the segmentation mask.",
                        "I built the dataset from ISIC 2024 (selection, rebalancing, rotations, parallel extraction) and the training and evaluation code.",
                        "I added the clinical data end to end: API field, dataset columns, model E, and the hand-off between services, where it was being lost.",
                        "I built the Next.js frontend: form, API call and per-criterion results page.",
                        "The other team members handled Docker, CI, the gateway, RabbitMQ and segmentation."
                    ] }
                ] }
            ]
        }
    },
    {
        id: 'tumor',
        featured: true,
        icon: 'fas fa-brain',
        cover: 'images/projects/tumor/cover.jpg',
        hero: { src: 'images/projects/tumor/hero.webp', w: 1600, h: 900 },
        stack: ['Python', 'ITK', 'VTK', 'NumPy', 'Jupyter', 'uv'],
        repo: null,
        figures: {
            intensityHistogram: { src: 'images/projects/tumor/intensity-histogram.png', w: 1760, h: 770, caption: {
                fr: 'Distribution des intensités dans la tumeur (scan 1 en bleu, scan 2 recalé en rouge) ; en pointillés, les moyennes 634,8 et 596,3.',
                en: 'Intensity distribution inside the tumor (scan 1 blue, registered scan 2 red); dashed lines: means 634.8 and 596.3.' } },
            surfaces3d: { src: 'images/projects/tumor/surfaces-3d.jpg', w: 1600, h: 800, caption: {
                fr: 'Surfaces des tumeurs extraites par Marching Cubes et lissées (50 itérations) : scan 1 à gauche, scan 2 à droite. Chaque vue est cadrée sur sa propre tumeur.',
                en: 'Tumor surfaces from Marching Cubes, smoothed over 50 iterations: scan 1 left, scan 2 right. Each view is framed on its own tumor.' } },
            overlayDiffVolume: { src: 'images/projects/tumor/overlay-diff-volume.jpg', w: 1200, h: 900, caption: {
                fr: 'Vue 3 : les deux surfaces à 50 % d’opacité et le rendu volumique de la différence absolue scan 1 − scan 2, avec sa barre d’échelle.',
                en: 'View 3: both surfaces at 50% opacity and the volume rendering of the absolute difference scan 1 − scan 2, with its scale bar.' } },
            vtkWindow: { src: 'images/projects/tumor/vtk-window.jpg', w: 1800, h: 900, wide: true, caption: {
                fr: 'Fenêtre VTK complète produite par python main.py : deux tumeurs, superposition et panneau de mesures.',
                en: 'Full VTK window produced by python main.py: both tumors, overlay and measurement panel.' } }
        },
        fr: {
            title: 'Suivi longitudinal d’une tumeur cérébrale',
            category: 'Imagerie médicale · ITK/VTK',
            team: 'Équipe de 4 · 1 mois',
            metric: 'Volume tumoral 2,00 → 2,31 cm³ (+15,7 %)',
            summary: 'À partir de deux IRM 3D d’un même patient, nous recalons les volumes, segmentons la tumeur et mesurons son évolution. J’ai écrit le module de visualisation VTK : les deux tumeurs en 3D, leur superposition et la différence d’intensité.',
            stats: [
                { value: '−42,9 %', label: 'écart d’intensité moyen après recalage rigide' },
                { value: '+15,7 %', label: 'volume tumoral entre les deux examens' },
                { value: '0,899', label: 'recouvrement (Dice) des deux masques' },
                { value: '28 s', label: 'recalage rigide 3D sur Apple M5' }
            ],
            sections: [
                { title: 'Contexte et contraintes', blocks: [
                    { p: 'Projet du module ITK/VTK à l’EPITA. Le sujet fournit deux IRM 3D d’un même patient, acquises à des dates différentes. Il faut aligner les volumes, segmenter la tumeur dans chacun, puis mesurer et montrer son évolution.' },
                    { list: [
                        '**Équipe** : 4 étudiants, 1 mois, rendu le 3 juillet 2026 sous forme de dépôt Git avec un document de présentation.',
                        '**Outils imposés** : ITK pour le recalage et la segmentation, VTK pour la visualisation.',
                        '**Exécution** : une seule commande, `python main.py`, sans interaction sauf dans la fenêtre de visualisation.',
                        '**Réglages manuels figés** : un paramètre choisi à la main, comme le point de départ de la segmentation, doit être écrit en dur dans le code.',
                        '**Données** : deux volumes NRRD de 256 × 256 × 176 voxels de 1 mm³.'
                    ] }
                ] },
                { title: 'Mon rôle', blocks: [
                    { p: 'J’ai écrit `visualization.py`, la dernière étape du pipeline, soit 294 des 526 lignes Python du projet. J’ai aussi mis en place l’environnement Python et nettoyé le dépôt.' },
                    { list: [
                        '**Visualisation VTK** : conversion des volumes ITK, surfaces 3D, rendu volumique de la différence, mesures et fenêtre à quatre vues.',
                        '**Environnement** : configuration `uv` (`pyproject.toml`, `uv.lock`, Python 3.14) et `.gitignore`.',
                        '**Dépôt** : suppression de 32 fichiers de corrigés de TP présents depuis le premier commit, corrections du README.',
                        '**Reste de l’équipe** : le recalage, la segmentation, `main.py`, le README et le notebook d’analyse.'
                    ] }
                ] },
                { title: 'Le pipeline', blocks: [
                    { flow: ['2 IRM 3D', 'Recalage rigide', 'Lissage + zone d’intérêt', 'Croissance de région', 'Morphologie', 'Mesures + rendu VTK'] },
                    { p: '`main.py` enchaîne trois modules : recalage, segmentation, visualisation. Le scan 2 est d’abord recalé dans l’espace du scan 1. Les deux volumes partagent alors la même grille, ce qui permet de les segmenter avec le même germe et la même zone d’intérêt. Chaque méthode a d’abord été comparée dans un notebook Jupyter.' }
                ] },
                { title: 'Les étapes en détail', blocks: [
                    { steps: [
                        { title: 'Recalage rigide', tag: '6 DDL · 3 niveaux', blocks: [
                            { p: 'Nous avons comparé une transformation rigide (`VersorRigid3DTransform`, 6 degrés de liberté) et une transformation affine (12). Les deux optimisent l’information mutuelle de Mattes (50 classes) par descente de gradient à pas régulier. Les intensités sont ramenées dans [0, 1] pour la métrique, mais l’image finale est rééchantillonnée à partir des intensités d’origine.' },
                            { p: 'Le rigide fait passer l’écart absolu moyen entre les deux scans de **81,62 à 46,57**, l’affine seulement à 77,55. Nous avons retenu le rigide : le crâne ne se déforme pas entre deux examens, et l’affine pouvait déformer le cerveau pour améliorer la métrique.' },
                            { p: 'Réglages : pas initial 4,0, pas minimal 0,001, relaxation 0,5, échelles 1 000 pour les rotations et 1 pour les translations. Les 3 niveaux réduisent l’image par 2, 1 puis 1, avec un lissage de 2, 1 puis 0 mm. L’optimisation s’arrête après 41, 28 et 37 itérations et estime une rotation d’environ 3,1°.' },
                        ] },
                        { title: 'Lissage anisotrope', tag: '5 itérations', blocks: [
                            { p: '`CurvatureAnisotropicDiffusionImageFilter` (pas de temps 0,05, conductance 3,0) réduit le bruit sans flouter les bords, contrairement à un flou gaussien. Le volume segmenté y est peu sensible : 1 881 voxels sans lissage, 1 890 avec 5 itérations, 1 865 avec 10.' },
                        ] },
                        { title: 'Zone d’intérêt et germe', tag: 'paramètres en dur', blocks: [
                            { p: 'Avec NumPy, nous mettons à zéro tout ce qui sort d’une boîte de 90 × 120 × 60 voxels autour de la tumeur. Le germe, point de départ de la segmentation, est placé au cœur de la lésion, en (125, 65, 80).' },
                        ] },
                        { title: 'Croissance de région', tag: '[450, 800]', blocks: [
                            { p: '`ConnectedThresholdImageFilter` garde les voxels dont l’intensité est dans [450, 800] **et** qui sont reliés au germe. Dans la zone d’intérêt du scan 1, 60 761 voxels sont dans l’intervalle, mais 1 890 seulement sont connectés au germe. C’est la connectivité qui isole la tumeur.' },
                            { p: 'Nous avions d’abord essayé `ConfidenceConnectedImageFilter`, qui donnait de 401 081 à 11 492 505 voxels selon son multiplicateur, puis un seuillage d’Otsu (471 957 voxels). Les deux débordaient largement sur les tissus voisins.' },
                        ] },
                        { title: 'Post-traitement morphologique', tag: '+106 voxels', blocks: [
                            { p: 'Une fermeture binaire (boule de rayon 3 voxels) puis `BinaryFillholeImageFilter` comblent les trous et les échancrures du masque. Le masque du scan 1 passe de 1 890 à 1 996 voxels, celui du scan 2 de 2 239 à 2 310.' },
                        ] },
                        { title: 'Mesures', tag: 'NumPy', blocks: [
                            { p: 'Le volume est le nombre de voxels du masque multiplié par le volume d’un voxel. Nous calculons aussi l’intensité moyenne dans chaque masque. Le notebook d’analyse ajoute le coefficient de Dice entre les deux masques et l’histogramme des intensités.' },
                            { figures: ['intensityHistogram'] }
                        ] },
                        { title: 'Visualisation VTK', tag: 'ma partie · 4 vues', blocks: [
                            { p: 'Les masques ITK sont convertis en images VTK. `vtkMarchingCubes` (isovaleur 0,5) en extrait la surface, `vtkSmoothPolyDataFilter` la lisse en 50 itérations et `vtkPolyDataNormals` recalcule les normales pour l’éclairage.' },
                            { p: 'La fenêtre compte quatre vues : la tumeur du scan 1 en bleu, celle du scan 2 en rouge, puis les deux à 50 % d’opacité avec un rendu volumique de la différence d’intensité. La quatrième affiche les mesures. Le rendu volumique utilise `vtkSmartVolumeMapper`, une palette de 5 couleurs, une opacité plafonnée à 0,25 et une barre d’échelle.' },
                            { p: 'Un segfault apparaissait à la création des surfaces : Python libérait des filtres VTK dont les sorties étaient encore utilisées. Chaque pipeline appelle maintenant `Update()`, copie son résultat avec `DeepCopy()` et le transmet aux mappers par `SetInputData()`.' },
                            { figures: ['surfaces3d', 'overlayDiffVolume', 'vtkWindow'] }
                        ] }
                    ] }
                ] },
                { title: 'Données', blocks: [
                    { p: 'Deux volumes NRRD fournis avec le sujet : 256 × 256 × 176 voxels, espacement de 1 mm, entiers sur 16 bits. Les intensités vont de 0 à 1 734 pour le scan 1 et de 0 à 1 374 pour le scan 2. Il n’y a pas d’apprentissage : toutes les étapes reposent sur des filtres ITK classiques.' }
                ] },
                { title: 'Résultats', blocks: [
                    { table: { caption: 'Scan 1 et scan 2 recalé, pipeline complet, Apple M5', columns: ['Mesure', 'Scan 1', 'Scan 2', 'Évolution'], rows: [
                        ['Volume tumoral', '2,00 cm³', '2,31 cm³', '+0,31 cm³ (+15,7 %)'],
                        ['Voxels du masque', '1 996', '2 310', '+314'],
                        ['Intensité moyenne dans le masque', '634,8', '596,3', '−6,1 %']
                    ], highlightRow: 0 } },
                    { bars: { title: 'Écart absolu moyen entre les deux scans (volume entier)', max: 100, ticks: [0, 25, 50, 75, 100], labelled: [0, 1, 2],
                              items: [
                                  { label: 'Sans recalage', value: 81.62, display: '81,62' },
                                  { label: 'Affine (12 DDL)', value: 77.55, display: '77,55' },
                                  { label: 'Rigide (6 DDL, retenu)', value: 46.57, display: '46,57' }
                              ] } },
                    { list: [
                        'Le recalage rigide réduit l’écart absolu moyen de 42,9 %. Sur la carte de différence, l’écart restant se concentre sur les contours du crâne et de la peau.',
                        'Le volume tumoral augmente de 15,7 % entre les deux examens.',
                        'Les masques se recouvrent largement (Dice 0,899) : 1,94 cm³ en commun, 0,06 cm³ seulement dans le scan 1, 0,38 cm³ seulement dans le scan 2.',
                        'Sur Apple M5, le recalage prend 28 s et la segmentation des deux volumes 8 s.'
                    ] },
                    { note: 'Limite : il n’existe pas de segmentation de référence pour ces données. Le Dice mesure l’accord entre les deux examens, pas la justesse de la segmentation.' }
                ] },
                { title: 'Limites', blocks: [
                    { list: [
                        '**Réglages propres au patient** : germe, seuils et zone d’intérêt sont écrits en dur. Un autre examen demanderait un nouveau réglage manuel.',
                        '**Intensités non normalisées** : les deux scans n’ont pas la même plage d’intensité, mais les mêmes seuils servent pour les deux. La baisse de 6,1 % de l’intensité moyenne est donc à prendre avec prudence.',
                        '**Comparaison inégale** : dans les notebooks, `ConfidenceConnected` a été testé avec un germe hors de la tumeur et Otsu avec une zone qui ne la contient pas. Un contre-test lancé après le projet, avec le bon germe, confirme l’instabilité de `ConfidenceConnected` : de 0 à 3 173 889 voxels.',
                        '**Recalage rigide** : il ne corrige pas les déformations locales des tissus mous ; une B-spline serait plus adaptée.',
                        '**Lisibilité de la vue 3** : le rendu volumique couvre toute la tête et les tumeurs y paraissent minuscules. Les vues 1 et 2 sont cadrées chacune sur sa tumeur, donc leurs tailles ne se comparent pas à l’œil.'
                    ] }
                ] }
            ]
        },
        en: {
            title: 'Longitudinal brain tumor tracking',
            category: 'Medical imaging · ITK/VTK',
            team: 'Team of 4 · 1 month',
            metric: 'Tumor volume 2.00 → 2.31 cm³ (+15.7%)',
            summary: 'From two 3D MRI scans of the same patient, we register the volumes, segment the tumor and measure how it changed. I wrote the VTK visualization module: both tumors in 3D, their overlay and the intensity difference.',
            stats: [
                { value: '−42.9%', label: 'mean intensity gap after rigid registration' },
                { value: '+15.7%', label: 'tumor volume between the two scans' },
                { value: '0.899', label: 'overlap (Dice) of the two masks' },
                { value: '28 s', label: '3D rigid registration on Apple M5' }
            ],
            sections: [
                { title: 'Context and constraints', blocks: [
                    { p: 'A project for the ITK/VTK course at EPITA. The brief provides two 3D MRI scans of the same patient, taken on different dates. The task is to align the volumes, segment the tumor in each one, then measure and show how it changed.' },
                    { list: [
                        '**Team**: 4 students, 1 month, due on July 3, 2026 as a Git repository with a project write-up.',
                        '**Required tools**: ITK for registration and segmentation, VTK for visualization.',
                        '**Execution**: a single command, `python main.py`, with no user input except in the visualization window.',
                        '**Fixed manual settings**: any value picked by hand, such as the segmentation starting point, must be hardcoded.',
                        '**Data**: two NRRD volumes of 256 × 256 × 176 voxels of 1 mm³.'
                    ] }
                ] },
                { title: 'My role', blocks: [
                    { p: 'I wrote `visualization.py`, the last stage of the pipeline: 294 of the project’s 526 lines of Python. I also set up the Python environment and cleaned up the repository.' },
                    { list: [
                        '**VTK visualization**: conversion of the ITK volumes, 3D surfaces, volume rendering of the difference, measurements and a four-view window.',
                        '**Environment**: `uv` setup (`pyproject.toml`, `uv.lock`, Python 3.14) and `.gitignore`.',
                        '**Repository**: removed 32 course solution files committed since the first commit, fixed the README.',
                        '**Rest of the team**: registration, segmentation, `main.py`, the README and the analysis notebook.'
                    ] }
                ] },
                { title: 'The pipeline', blocks: [
                    { flow: ['2 3D MRI scans', 'Rigid registration', 'Smoothing + region of interest', 'Region growing', 'Morphology', 'Measurements + VTK rendering'] },
                    { p: '`main.py` chains three modules: registration, segmentation, visualization. Scan 2 is first registered into the space of scan 1. Both volumes then share the same grid, so they can be segmented with the same seed and the same region of interest. Each method was first compared in a Jupyter notebook.' }
                ] },
                { title: 'Step by step', blocks: [
                    { steps: [
                        { title: 'Rigid registration', tag: '6 DoF · 3 levels', blocks: [
                            { p: 'We compared a rigid transform (`VersorRigid3DTransform`, 6 degrees of freedom) with an affine one (12). Both optimize Mattes mutual information (50 bins) with regular-step gradient descent. Intensities are rescaled to [0, 1] for the metric, but the final image is resampled from the original intensities.' },
                            { p: 'Rigid registration brings the mean absolute difference between the scans from **81.62 to 46.57**; affine only reaches 77.55. We kept the rigid transform: the skull does not deform between two scans, and the affine transform could warp the brain to improve the metric.' },
                            { p: 'Settings: initial step 4.0, minimum step 0.001, relaxation 0.5, scales of 1,000 for rotations and 1 for translations. The 3 levels shrink the image by 2, 1 then 1, with 2, 1 then 0 mm of smoothing. The optimizer stops after 41, 28 and 37 iterations and estimates a rotation of about 3.1°.' },
                        ] },
                        { title: 'Anisotropic smoothing', tag: '5 iterations', blocks: [
                            { p: '`CurvatureAnisotropicDiffusionImageFilter` (time step 0.05, conductance 3.0) reduces noise without blurring edges, unlike a Gaussian blur. The segmented volume barely depends on it: 1,881 voxels without smoothing, 1,890 with 5 iterations, 1,865 with 10.' },
                        ] },
                        { title: 'Region of interest and seed', tag: 'hardcoded', blocks: [
                            { p: 'With NumPy, we zero out everything outside a 90 × 120 × 60 voxel box around the tumor. The seed, the starting point of the segmentation, sits in the core of the lesion at (125, 65, 80).' },
                        ] },
                        { title: 'Region growing', tag: '[450, 800]', blocks: [
                            { p: '`ConnectedThresholdImageFilter` keeps voxels whose intensity is within [450, 800] **and** that are connected to the seed. In the region of interest of scan 1, 60,761 voxels fall in that range, but only 1,890 are connected to the seed. Connectivity is what isolates the tumor.' },
                            { p: 'We first tried `ConfidenceConnectedImageFilter`, which gave 401,081 to 11,492,505 voxels depending on its multiplier, then Otsu thresholding (471,957 voxels). Both spread far into the surrounding tissue.' },
                        ] },
                        { title: 'Morphological post-processing', tag: '+106 voxels', blocks: [
                            { p: 'A binary closing (ball of radius 3 voxels) followed by `BinaryFillholeImageFilter` fills the holes and notches in the mask. The scan 1 mask grows from 1,890 to 1,996 voxels, the scan 2 mask from 2,239 to 2,310.' },
                        ] },
                        { title: 'Measurements', tag: 'NumPy', blocks: [
                            { p: 'Volume is the number of mask voxels times the volume of one voxel. We also compute the mean intensity inside each mask. The analysis notebook adds the Dice coefficient between the two masks and the intensity histogram.' },
                            { figures: ['intensityHistogram'] }
                        ] },
                        { title: 'VTK visualization', tag: 'my part · 4 views', blocks: [
                            { p: 'The ITK masks are converted to VTK images. `vtkMarchingCubes` (iso-value 0.5) extracts their surface, `vtkSmoothPolyDataFilter` smooths it over 50 iterations and `vtkPolyDataNormals` recomputes the normals for lighting.' },
                            { p: 'The window has four views: the scan 1 tumor in blue, the scan 2 tumor in red, then both at 50% opacity with a volume rendering of the intensity difference. The fourth view shows the measurements. The volume rendering uses `vtkSmartVolumeMapper`, a 5-color palette, opacity capped at 0.25 and a scale bar.' },
                            { p: 'A segfault occurred when building the surfaces: Python freed VTK filters whose outputs were still in use. Each pipeline now calls `Update()`, copies its result with `DeepCopy()` and hands it to the mappers through `SetInputData()`.' },
                            { figures: ['surfaces3d', 'overlayDiffVolume', 'vtkWindow'] }
                        ] }
                    ] }
                ] },
                { title: 'Data', blocks: [
                    { p: 'Two NRRD volumes provided with the brief: 256 × 256 × 176 voxels, 1 mm spacing, 16-bit integers. Intensities range from 0 to 1,734 in scan 1 and from 0 to 1,374 in scan 2. There is no training: every stage relies on standard ITK filters.' }
                ] },
                { title: 'Results', blocks: [
                    { table: { caption: 'Scan 1 and registered scan 2, full pipeline, Apple M5', columns: ['Measure', 'Scan 1', 'Scan 2', 'Change'], rows: [
                        ['Tumor volume', '2.00 cm³', '2.31 cm³', '+0.31 cm³ (+15.7%)'],
                        ['Mask voxels', '1,996', '2,310', '+314'],
                        ['Mean intensity in the mask', '634.8', '596.3', '−6.1%']
                    ], highlightRow: 0 } },
                    { bars: { title: 'Mean absolute difference between the two scans (whole volume)', max: 100, ticks: [0, 25, 50, 75, 100], labelled: [0, 1, 2],
                              items: [
                                  { label: 'No registration', value: 81.62, display: '81.62' },
                                  { label: 'Affine (12 DoF)', value: 77.55, display: '77.55' },
                                  { label: 'Rigid (6 DoF, chosen)', value: 46.57, display: '46.57' }
                              ] } },
                    { list: [
                        'Rigid registration cuts the mean absolute difference by 42.9%. On the difference map, the remaining gap sits mostly along the skull and skin outlines.',
                        'Tumor volume grows by 15.7% between the two scans.',
                        'The masks largely overlap (Dice 0.899): 1.94 cm³ shared, 0.06 cm³ only in scan 1, 0.38 cm³ only in scan 2.',
                        'On an Apple M5, registration takes 28 s and segmenting both volumes takes 8 s.'
                    ] },
                    { note: 'Limitation: there is no reference segmentation for this data. Dice measures agreement between the two scans, not segmentation accuracy.' }
                ] },
                { title: 'Limitations', blocks: [
                    { list: [
                        '**Patient-specific settings**: seed, thresholds and region of interest are hardcoded. Another scan would need new manual tuning.',
                        '**Unnormalized intensities**: the two scans do not share the same intensity range, yet the same thresholds apply to both. The 6.1% drop in mean intensity should be read with care.',
                        '**Uneven comparison**: in the notebooks, `ConfidenceConnected` was tested with a seed outside the tumor and Otsu with a region that does not contain it. A counter-test run after the project, with the right seed, confirms that `ConfidenceConnected` is unstable: 0 to 3,173,889 voxels.',
                        '**Rigid registration**: it cannot correct local soft-tissue deformation; a B-spline transform would fit better.',
                        '**View 3 readability**: the volume rendering covers the whole head and the tumors look tiny in it. Views 1 and 2 are each framed on their own tumor, so their sizes cannot be compared by eye.'
                    ] }
                ] }
            ]
        }
    },
    {
        id: 'watersim',
        featured: true,
        icon: 'fas fa-water',
        cover: 'images/projects/watersim/cover.jpg',
        hero: { src: 'images/projects/watersim/hero.webp', w: 1600, h: 900 },
        stack: ['C++17', 'OpenGL 3.3', 'GLSL', 'GLFW', 'GLEW', 'GLM', 'CMake'],
        repo: null,
        figures: {
            pipeline: { src: 'images/projects/watersim/pipeline-strip.jpg', w: 3232, h: 360, wide: true, caption: {
                fr: 'De gauche à droite : carte d’ombre, réflexion, réfraction, profondeur, image finale.',
                en: 'Left to right: shadow map, reflection, refraction, depth, final frame.' } },
            shadowMap: { src: 'images/projects/watersim/shadow-map.png', w: 1600, h: 900, caption: {
                fr: 'Carte d’ombre vue depuis le soleil (recadrage de la texture 2 048 × 2 048). Clair = proche. Les faces avant sont éliminées dans cette passe.',
                en: 'Shadow map seen from the sun (crop of the 2,048 × 2,048 texture). Bright = near. Front faces are culled in this pass.' } },
            reflection: { src: 'images/projects/watersim/reflection-pass.jpg', w: 1600, h: 900, caption: {
                fr: 'Passe de réflexion : la caméra miroir, sous l’eau, ne garde que ce qui dépasse de la surface.',
                en: 'Reflection pass: the mirrored camera, below the water, keeps only what lies above the surface.' } },
            benchyCalm: { src: 'images/projects/watersim/benchy-calm.jpg', w: 1600, h: 900, caption: {
                fr: 'Scène Benchy, sans vent : le reflet du bateau.',
                en: 'Benchy scene, no wind: the boat’s reflection.' } },
            refraction: { src: 'images/projects/watersim/refraction-pass.jpg', w: 1600, h: 900, caption: {
                fr: 'Passe de réfraction : seule la géométrie sous la surface est rendue, ici le fond du lac.',
                en: 'Refraction pass: only the geometry below the surface is rendered, here the lake bed.' } },
            depth: { src: 'images/projects/watersim/refraction-depth.png', w: 1600, h: 900, caption: {
                fr: 'Profondeur de la réfraction, linéarisée (clair = proche). Le shader d’eau s’en sert pour la teinte et les berges.',
                en: 'Refraction depth, linearised (bright = near). The water shader uses it for tint and shorelines.' } },
            terrain: { src: 'images/projects/watersim/terrain-pass.jpg', w: 1600, h: 900, caption: {
                fr: 'Le terrain seul, avant l’eau : éclairage Blinn-Phong et ombres PCF.',
                en: 'Terrain only, before the water: Blinn-Phong lighting and PCF shadows.' } },
            wireframe: { src: 'images/projects/watersim/water-wireframe.jpg', w: 1600, h: 900, caption: {
                fr: 'Rendu de débogage en fil de fer : la grille d’eau déplacée par le bruit, vent 0,5.',
                en: 'Debug wireframe render: the water grid displaced by noise, wind 0.5.' } },
            finalCalm: { src: 'images/projects/watersim/final-calm.jpg', w: 1600, h: 900, caption: {
                fr: 'Image finale, sans vent.',
                en: 'Final frame, no wind.' } },
            finalWind: { src: 'images/projects/watersim/final-wind.jpg', w: 1600, h: 900, caption: {
                fr: 'Image finale, vent 0,5 : vagues plus hautes, reflets plus déformés.',
                en: 'Final frame, wind 0.5: higher waves, more distorted reflections.' } },
            benchyFoam: { src: 'images/projects/watersim/benchy-foam.jpg', w: 1600, h: 900, caption: {
                fr: 'Scène Benchy, vent 0,6 : écume sur les parties hautes des vagues.',
                en: 'Benchy scene, wind 0.6: foam on the upper parts of the waves.' } },
            finalStorm: { src: 'images/projects/watersim/final-storm.jpg', w: 1600, h: 900, caption: {
                fr: 'Vent 1,0 : les vagues atteignent 1,0 d’amplitude et passent sur la berge.',
                en: 'Wind 1.0: waves reach an amplitude of 1.0 and spill over the shore.' } }
        },
        fr: {
            title: 'Water Sim : rendu d’eau en temps réel',
            category: 'Rendu 3D · Shaders',
            team: 'Équipe de 2 · 4 semaines',
            metric: '5 passes de rendu · 314 FPS sur la scène île',
            summary: 'Un moteur de rendu en C++ et OpenGL 3.3 qui anime une surface d’eau autour d’une île ou d’un bateau. Reflets, réfraction, ombres et vagues procédurales sont calculés en temps réel, avec un vent réglable au clavier.',
            stats: [
                { value: '5', label: 'passes de rendu par image' },
                { value: '314 FPS', label: 'scène île, médiane de 6 mesures (Apple M5)' },
                { value: '22 FPS', label: 'scène Benchy, 4 004 001 sommets d’eau' },
                { value: '30', label: 'appels au bruit par sommet d’eau' }
            ],
            sections: [
                { title: 'Contexte et contraintes', blocks: [
                    { p: 'Projet d’école réalisé à deux à l’EPITA, du 11 mai au 9 juin 2026. Le but : afficher en temps réel une surface d’eau animée autour d’un modèle 3D chargé depuis un fichier.' },
                    { list: [
                        '**OpenGL 3.3 core** : shaders GLSL écrits à la main, sans moteur de jeu. GLFW gère la fenêtre, GLEW les extensions, GLM les maths.',
                        '**Temps réel** : la forme des vagues et l’aspect de l’eau sont recalculés à chaque image, dans les shaders.',
                        '**Deux plateformes** : Linux sous Wayland et macOS. Deux commits corrigent l’initialisation de GLEW sous Wayland, un autre adapte le rendu aux écrans haute densité.',
                        '**Scènes configurables** : un fichier `scene.cfg` par scène fixe le modèle, la hauteur, la taille et la résolution de l’eau, la lumière et la caméra.'
                    ] }
                ] },
                { title: 'Mon rôle', blocks: [
                    { p: 'Nous avons fait 33 commits : 16 chacun, plus une fusion.' },
                    { list: [
                        '**Socle** : CMake, caméra orbitale, boucle de rendu, chargement de l’île au format OBJ avec la couleur de chaque matériau.',
                        '**Base de l’eau** : framebuffers de réflexion et de réfraction, plans de coupe, rendu en plusieurs passes, premier shader d’eau avec Fresnel et reflet du soleil.',
                        '**Vagues** : grille subdivisée, déplacement des sommets par des sinus puis par un bruit à 3 octaves, normales par différences finies.',
                        '**Profondeur** : lecture de la profondeur de réfraction, eau plus sombre quand elle est profonde, transparence progressive sur les berges.',
                        '**Fin de projet** : découpage de `main.cpp` en modules (478 → 251 lignes), prise en compte des écrans haute densité, compteur de FPS.'
                    ] },
                    { p: 'Mon binôme a écrit le vent et l’écume, le système de scènes avec le chargeur STL, les ombres, et les corrections du reflet et de la réfraction.' }
                ] },
                { title: 'Le pipeline de rendu', blocks: [
                    { flow: ['Scène OBJ / STL', 'Carte d’ombre', 'Réflexion', 'Réfraction', 'Terrain', 'Eau', 'Image'] },
                    { p: 'Chaque image passe par cinq passes. Le modèle est dessiné quatre fois : depuis le soleil, depuis une caméra miroir placée sous l’eau, depuis la caméra avec un plan de coupe, puis normalement. La grille d’eau est dessinée en dernier et lit quatre textures produites par les passes précédentes.' },
                    { figures: ['pipeline'] }
                ] },
                { title: 'Les étapes en détail', blocks: [
                    { steps: [
                        { title: 'Chargement de la scène', tag: 'OBJ · STL', blocks: [
                            { p: 'Le programme lit `scenes/<nom>/scene.cfg`, un fichier de paires clé = valeur. Les fichiers OBJ passent par tinyobjloader : chaque sommet reçoit la couleur diffuse de son matériau. Les fichiers STL sont lus en binaire ou en ASCII ; le binaire est reconnu quand la taille du fichier vaut 84 + 50 × le nombre de triangles.' },
                            { p: 'L’île compte 45 517 triangles, le Benchy 225 154.' }
                        ] },
                        { title: 'Carte d’ombre', tag: '2 048 × 2 048', blocks: [
                            { p: 'Le modèle est rendu depuis le soleil, avec une projection orthographique de ±20 unités. Les faces avant sont éliminées pendant cette passe pour limiter l’acné d’ombre. À l’affichage, un filtre PCF 3 × 3 adoucit les bords, avec un biais qui dépend de l’angle entre la surface et la lumière.' },
                            { figures: ['shadowMap'] }
                        ] },
                        { title: 'Réflexion', tag: 'caméra miroir', blocks: [
                            { p: 'La caméra et son point de visée sont symétrisés par rapport au plan d’eau. Un plan de coupe (`gl_ClipDistance`) ne garde que la géométrie au-dessus de la surface. Le rendu va dans une texture de 1 280 × 720.' },
                            { figures: ['reflection', 'benchyCalm'] }
                        ] },
                        { title: 'Réfraction et profondeur', tag: 'profondeur 32 bits', blocks: [
                            { p: 'Même caméra que l’image finale, plan de coupe inversé : seule la géométrie sous la surface est rendue. La passe garde sa profondeur dans une texture 32 bits, que le shader d’eau relit ensuite.' },
                            { figures: ['refraction', 'depth'] }
                        ] },
                        { title: 'Terrain', tag: 'Blinn-Phong', blocks: [
                            { p: 'Le modèle est dessiné normalement : lumière ambiante, diffuse et spéculaire de Blinn-Phong, ombres PCF. L’ombre atténue le diffus et le spéculaire, pas l’ambiant.' },
                            { figures: ['terrain'] }
                        ] },
                        { title: 'Vagues', tag: 'vertex shader', blocks: [
                            { p: 'L’eau est une grille de N × N carrés : 500 pour l’île, 2 000 pour le Benchy. Le vertex shader élève chaque sommet selon un bruit de valeur à 3 octaves. Avec du vent, un second bruit prend le relais : il est étiré dans l’axe du vent et compressé par `tanh` pour arrondir les crêtes.' },
                            { p: 'La normale vient de différences finies. La hauteur est donc évaluée 5 fois par sommet, soit 30 appels au bruit.' },
                            { figures: ['wireframe'] }
                        ] },
                        { title: 'Surface de l’eau', tag: 'fragment shader', blocks: [
                            { p: 'Chaque point de l’eau est projeté dans les textures de réflexion et de réfraction. Ces coordonnées sont décalées par du bruit pour faire onduler l’image. Un terme de Fresnel mélange les deux : plus on regarde l’eau de biais, plus elle reflète.' },
                            { p: 'La profondeur relue assombrit l’eau profonde et règle l’opacité : 0,5 au bord, 0,95 dès 2,5 unités de profondeur.' },
                            { figures: ['finalCalm', 'finalWind'] }
                        ] },
                        { title: 'Vent et écume', tag: 'touches [ ] , .', blocks: [
                            { p: 'Le vent se règle au clavier : force de 0 à 1, direction en degrés. La force fait passer l’amplitude des vagues de 0,4 à 1,0, accélère la distorsion et élargit le reflet du soleil. L’écume apparaît à partir d’un vent de 0,25, sur les parties hautes des vagues, et atteint son maximum à 0,65.' },
                            { figures: ['benchyFoam', 'finalStorm'] }
                        ] }
                    ] }
                ] },
                { title: 'Choix techniques et difficultés', blocks: [
                    { list: [
                        '**Des sinus au bruit** : les premières vagues étaient une somme de sinus. Nous les avons remplacées par un bruit de valeur, moins répétitif. Ce bruit n’étant pas périodique, le temps ne pouvait plus boucler sur [0, 1] : il s’accumule désormais.',
                        '**Un reflet qui glissait** : le reflet était lu en coordonnées écran et se décalait quand la caméra tournait près du bateau. Chaque sommet d’eau est maintenant projeté avec la matrice de la caméra miroir.',
                        '**Un fantôme dans l’eau** : sans plan de coupe, la partie émergée du modèle réapparaissait dans la réfraction. Le plan de coupe a été rétabli.',
                        '**Pas de vagues de Gerstner** : un déplacement horizontal de type Gerstner a été essayé puis retiré, car il rendait les triangles de la grille irréguliers.',
                        '**Pas de double ombre** : l’ombre n’assombrit que la part réfractée, car la texture de réflexion contient déjà ses propres ombres.',
                        '**Écrans haute densité** : sur macOS, le framebuffer est plus grand que la fenêtre. Le viewport et le ratio utilisent donc `glfwGetFramebufferSize`.'
                    ] }
                ] },
                { title: 'Résultats', blocks: [
                    { table: {
                        caption: 'Apple M5, OpenGL 4.1 via Metal · fenêtre 1 280 × 720, VSync coupée · 600 images après 120 de chauffe · 3 essais par ligne',
                        columns: ['Scène', 'Grille d’eau', 'Vent', 'FPS (médiane)', 'FPS (min – max)', 'Passe d’eau (GPU)'],
                        rows: [
                            ['Île', '501 × 501 sommets', '0', '285', '284 – 343', '1,6 – 1,8 ms'],
                            ['Île', '501 × 501 sommets', '1', '328', '301 – 338', '1,7 ms'],
                            ['Benchy', '2 001 × 2 001 sommets', '0', '22', '22 – 26', '35 – 39 ms'],
                            ['Benchy', '2 001 × 2 001 sommets', '1', '22', '21 – 23', '40 – 41 ms']
                        ],
                        highlightRow: 0
                    } },
                    { bars: { title: 'FPS médian par configuration', max: 350, ticks: [0, 100, 200, 300], labelled: [0, 1, 2, 3],
                              items: [
                                  { label: 'Île, vent 0', value: 284.5, display: '285 FPS' },
                                  { label: 'Île, vent 1', value: 327.6, display: '328 FPS' },
                                  { label: 'Benchy, vent 0', value: 22.2, display: '22 FPS' },
                                  { label: 'Benchy, vent 1', value: 21.7, display: '22 FPS' }
                              ] } },
                    { list: [
                        'Sur le Benchy, la passe d’eau prend 35 à 41 ms par image, sur 39 à 47 ms au total. C’est la grille de 4 millions de sommets, avec 30 appels au bruit chacun, qui fixe la cadence.',
                        'À 2 560 × 1 440, le Benchy reste entre 18 et 28 FPS. Quadrupler le nombre de pixels ne change pas nettement le résultat : le coût vient surtout des sommets.',
                        'L’île a 16 fois moins de sommets d’eau ; une image y prend 2,9 à 3,5 ms.'
                    ] },
                    { note: 'Mesures faites après le projet, sur un Apple M5 non isolé, avec un banc d’essai qui reprend la boucle de rendu de `main.cpp`.' }
                ] },
                { title: 'Limites', blocks: [
                    { list: [
                        '**Pas de physique** : les vagues sont un bruit procédural, pas une simulation de fluide. Le bateau ne réagit pas aux vagues.',
                        '**Berges** : l’amplitude des vagues n’est pas réduite près du rivage. Par vent fort, l’eau passe au-dessus du terrain.',
                        '**Plan d’eau carré** : sur l’île, les coins du plan d’eau dépassent des flancs.',
                        '**Résolution figée** : les textures de réflexion et de réfraction font toujours 1 280 × 720, et le shader divise par 1 280 × 720 pour relire la profondeur. Sur un framebuffer d’une autre taille, la profondeur est relue au mauvais endroit.',
                        '**Grille uniforme** : pas de niveau de détail selon la distance, d’où les 22 FPS du Benchy.',
                        '**Robustesse** : les erreurs de compilation des shaders ne sont pas affichées, un nom de scène inconnu arrête le programme, et il n’y a pas de tests automatisés.'
                    ] },
                    { note: 'Crédit : le bateau est le modèle 3DBenchy de Creative Tools (3dbenchy.com).' }
                ] }
            ]
        },
        en: {
            title: 'Water Sim: real-time water rendering',
            category: '3D rendering · Shaders',
            team: 'Team of 2 · 4 weeks',
            metric: '5 render passes · 314 FPS on the island scene',
            summary: 'A C++ and OpenGL 3.3 renderer that animates a water surface around an island or a boat. Reflections, refraction, shadows and procedural waves are computed in real time, with wind controlled from the keyboard.',
            stats: [
                { value: '5', label: 'render passes per frame' },
                { value: '314 FPS', label: 'island scene, median of 6 runs (Apple M5)' },
                { value: '22 FPS', label: 'Benchy scene, 4,004,001 water vertices' },
                { value: '30', label: 'noise calls per water vertex' }
            ],
            sections: [
                { title: 'Context and constraints', blocks: [
                    { p: 'A school project built by two students at EPITA, from 11 May to 9 June 2026. The goal: render an animated water surface in real time around a 3D model loaded from a file.' },
                    { list: [
                        '**OpenGL 3.3 core**: hand-written GLSL shaders, no game engine. GLFW handles the window, GLEW the extensions, GLM the maths.',
                        '**Real time**: wave shape and water appearance are recomputed every frame, in the shaders.',
                        '**Two platforms**: Linux on Wayland and macOS. Two commits fix GLEW initialisation on Wayland; another adapts rendering to high-density displays.',
                        '**Configurable scenes**: one `scene.cfg` file per scene sets the model, the water height, size and resolution, the light and the camera.'
                    ] }
                ] },
                { title: 'My role', blocks: [
                    { p: 'We made 33 commits: 16 each, plus one merge.' },
                    { list: [
                        '**Foundation**: CMake, orbit camera, render loop, loading the island as OBJ with each material’s colour.',
                        '**Water base**: reflection and refraction framebuffers, clip planes, multi-pass rendering, first water shader with Fresnel and sun highlight.',
                        '**Waves**: subdivided grid, vertex displacement with sines and then with 3-octave noise, normals from finite differences.',
                        '**Depth**: reading the refraction depth, darker water where it is deep, gradual transparency along the shore.',
                        '**End of project**: splitting `main.cpp` into modules (478 → 251 lines), high-density display support, FPS counter.'
                    ] },
                    { p: 'My teammate wrote the wind and foam, the scene system with the STL loader, the shadows, and the reflection and refraction fixes.' }
                ] },
                { title: 'The rendering pipeline', blocks: [
                    { flow: ['OBJ / STL scene', 'Shadow map', 'Reflection', 'Refraction', 'Terrain', 'Water', 'Frame'] },
                    { p: 'Each frame goes through five passes. The model is drawn four times: from the sun, from a mirrored camera below the water, from the camera with a clip plane, then normally. The water grid is drawn last and reads four textures produced by the earlier passes.' },
                    { figures: ['pipeline'] }
                ] },
                { title: 'The steps in detail', blocks: [
                    { steps: [
                        { title: 'Loading the scene', tag: 'OBJ · STL', blocks: [
                            { p: 'The program reads `scenes/<name>/scene.cfg`, a file of key = value pairs. OBJ files go through tinyobjloader: each vertex gets its material’s diffuse colour. STL files are read as binary or ASCII; binary is detected when the file size equals 84 + 50 × the triangle count.' },
                            { p: 'The island has 45,517 triangles, the Benchy 225,154.' }
                        ] },
                        { title: 'Shadow map', tag: '2,048 × 2,048', blocks: [
                            { p: 'The model is rendered from the sun with an orthographic projection of ±20 units. Front faces are culled in this pass to reduce shadow acne. When shading, a 3 × 3 PCF filter softens the edges, with a bias that depends on the angle between surface and light.' },
                            { figures: ['shadowMap'] }
                        ] },
                        { title: 'Reflection', tag: 'mirrored camera', blocks: [
                            { p: 'The camera and its target are mirrored across the water plane. A clip plane (`gl_ClipDistance`) keeps only the geometry above the surface. The result goes into a 1,280 × 720 texture.' },
                            { figures: ['reflection', 'benchyCalm'] }
                        ] },
                        { title: 'Refraction and depth', tag: '32-bit depth', blocks: [
                            { p: 'Same camera as the final frame, inverted clip plane: only the geometry below the surface is rendered. The pass keeps its depth in a 32-bit texture, which the water shader reads later.' },
                            { figures: ['refraction', 'depth'] }
                        ] },
                        { title: 'Terrain', tag: 'Blinn-Phong', blocks: [
                            { p: 'The model is drawn normally: ambient, diffuse and Blinn-Phong specular light, with PCF shadows. Shadow dims the diffuse and specular terms, not the ambient one.' },
                            { figures: ['terrain'] }
                        ] },
                        { title: 'Waves', tag: 'vertex shader', blocks: [
                            { p: 'The water is a grid of N × N squares: 500 for the island, 2,000 for the Benchy. The vertex shader raises each vertex with 3-octave value noise. With wind, a second noise takes over: it is stretched along the wind axis and compressed with `tanh` to round the crests.' },
                            { p: 'The normal comes from finite differences, so the height is evaluated 5 times per vertex: 30 noise calls.' },
                            { figures: ['wireframe'] }
                        ] },
                        { title: 'Water surface', tag: 'fragment shader', blocks: [
                            { p: 'Each water point is projected into the reflection and refraction textures. These coordinates are offset by noise so the image ripples. A Fresnel term blends the two: the flatter the viewing angle, the more the water reflects.' },
                            { p: 'The depth read back darkens deep water and sets the opacity: 0.5 at the edge, 0.95 from a depth of 2.5 units.' },
                            { figures: ['finalCalm', 'finalWind'] }
                        ] },
                        { title: 'Wind and foam', tag: 'keys [ ] , .', blocks: [
                            { p: 'Wind is set from the keyboard: strength from 0 to 1, direction in degrees. Strength raises the wave amplitude from 0.4 to 1.0, speeds up the distortion and widens the sun highlight. Foam appears from a wind of 0.25, on the upper parts of the waves, and peaks at 0.65.' },
                            { figures: ['benchyFoam', 'finalStorm'] }
                        ] }
                    ] }
                ] },
                { title: 'Technical choices and challenges', blocks: [
                    { list: [
                        '**From sines to noise**: the first waves were a sum of sines. We replaced them with value noise, which repeats less. Since this noise is not periodic, time could no longer loop over [0, 1]: it now accumulates.',
                        '**A sliding reflection**: the reflection was read in screen coordinates and drifted when the camera orbited close to the boat. Each water vertex is now projected with the mirrored camera’s matrix.',
                        '**A ghost in the water**: without a clip plane, the part of the model above water showed up again in the refraction. The clip plane was restored.',
                        '**No Gerstner waves**: a Gerstner-style horizontal displacement was tried and then removed, because it made the grid triangles uneven.',
                        '**No double shadow**: shadow only darkens the refracted part, because the reflection texture already contains its own shadows.',
                        '**High-density displays**: on macOS the framebuffer is larger than the window, so the viewport and aspect ratio use `glfwGetFramebufferSize`.'
                    ] }
                ] },
                { title: 'Results', blocks: [
                    { table: {
                        caption: 'Apple M5, OpenGL 4.1 over Metal · 1,280 × 720 window, VSync off · 600 frames after 120 warm-up frames · 3 runs per row',
                        columns: ['Scene', 'Water grid', 'Wind', 'FPS (median)', 'FPS (min – max)', 'Water pass (GPU)'],
                        rows: [
                            ['Island', '501 × 501 vertices', '0', '285', '284 – 343', '1.6 – 1.8 ms'],
                            ['Island', '501 × 501 vertices', '1', '328', '301 – 338', '1.7 ms'],
                            ['Benchy', '2,001 × 2,001 vertices', '0', '22', '22 – 26', '35 – 39 ms'],
                            ['Benchy', '2,001 × 2,001 vertices', '1', '22', '21 – 23', '40 – 41 ms']
                        ],
                        highlightRow: 0
                    } },
                    { bars: { title: 'Median FPS per configuration', max: 350, ticks: [0, 100, 200, 300], labelled: [0, 1, 2, 3],
                              items: [
                                  { label: 'Island, wind 0', value: 284.5, display: '285 FPS' },
                                  { label: 'Island, wind 1', value: 327.6, display: '328 FPS' },
                                  { label: 'Benchy, wind 0', value: 22.2, display: '22 FPS' },
                                  { label: 'Benchy, wind 1', value: 21.7, display: '22 FPS' }
                              ] } },
                    { list: [
                        'On the Benchy, the water pass takes 35 to 41 ms per frame, out of 39 to 47 ms in total. The 4-million-vertex grid, with 30 noise calls per vertex, sets the frame rate.',
                        'At 2,560 × 1,440, the Benchy stays between 18 and 28 FPS. Four times more pixels makes no clear difference: the cost comes mostly from the vertices.',
                        'The island has 16 times fewer water vertices; a frame takes 2.9 to 3.5 ms.'
                    ] },
                    { note: 'Measured after the project, on a non-isolated Apple M5, with a benchmark harness that reuses the render loop of `main.cpp`.' }
                ] },
                { title: 'Limitations', blocks: [
                    { list: [
                        '**No physics**: the waves are procedural noise, not a fluid simulation. The boat does not react to the waves.',
                        '**Shorelines**: wave amplitude is not reduced near the shore. In strong wind, the water rises above the terrain.',
                        '**Square water plane**: on the island, the corners of the water plane stick out of the slopes.',
                        '**Fixed resolution**: the reflection and refraction textures are always 1,280 × 720, and the shader divides by 1,280 × 720 to read the depth back. With a framebuffer of another size, depth is read at the wrong place.',
                        '**Uniform grid**: no level of detail with distance, hence the Benchy’s 22 FPS.',
                        '**Robustness**: shader compilation errors are not reported, an unknown scene name stops the program, and there are no automated tests.'
                    ] },
                    { note: 'Credit: the boat is the 3DBenchy model by Creative Tools (3dbenchy.com).' }
                ] }
            ]
        }
    },
    {
        id: 'ocr',
        featured: false,
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
