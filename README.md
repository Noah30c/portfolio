# Portfolio Interactif de Noah Civilise

Portfolio immersif développé avec **Three.js**, **WebGL** et une interface **Cockpit unifiée** avec **Carrousel Spatial Circulaire** en glassmorphism haute lisibilité. Met en avant l'expertise d'**Ingénieur en IA, Vision par ordinateur et Traitement d'image**, alliant intelligence artificielle, vision algorithmique, calcul haute performance (CUDA / GPGPU) et rendu graphique temps réel.

---

## 🌟 Fonctionnalités Clés

1. **Carrousel Spatial Circulaire des Projets** :
   - Les 9 réalisations techniques sont présentées sous forme de **dalles flottantes en arc de cercle spatial** (perspective 1200px avec profondeur `translateZ` et rotation `rotateY`).
   - **Boucle infinie fluide** : le défilement boucle naturellement du dernier au premier projet sans interruption.
   - **Navigation tactile et souris** : drag fluide avec inertie, flèches latérales, navigation au clavier (<kbd>←</kbd> / <kbd>→</kbd>).
   - **Filtres thématiques instantanés** : *Tous les projets*, *IA & Vision*, *WebXR & Rendu*, *Systèmes & C++*.

2. **Fiche d'Inspection Technique (Modal Glassmorphic)** :
   - Clic sur la dalle centrale pour inspecter l'architecture : métriques de performance (**`< 380ms, 93% d'exactitude`**, **`CUDA Graphs zero-copy`**, **`LLVM IR`**, etc.), description contextuelle, stack technique et points d'innovations.

3. **Mode Clair / Mode Sombre (High Readability)** :
   - Bouton de bascule intuitif dans l'en-tête (soleil / lune) avec mémorisation des préférences (`localStorage`).
   - Mode clair spécialement calibré avec contrastes soignés (`#0f172a`, cartes immaculées, éclairage et brume Three.js adaptés) pour un confort de lecture optimal.

4. **Moteur 3D WebGL Three.js en Arrière-Plan** :
   - Fond spatial avec nébuleuse stellaire et objets géométriques subtils synchronisés avec les onglets.
   - Voile d'atténuation adaptatif (`.hub-backdrop-veil`) pour préserver une lisibilité textuelle absolue.

5. **Sélecteur de Thèmes Cosmiques** :
   - 3 ambiances cosmiques (*Cyber Néon*, *Matrix Émeraude*, *Quantum Ambre*).

6. **Bilingue Français / Anglais** avec mémorisation de préférence.

---

## 🚀 Utilisation & Déploiement

Ouvrez simplement `index.html` ou lancez :
```bash
python3 -m http.server 4242
```
Puis rendez-vous sur `http://localhost:4242`.