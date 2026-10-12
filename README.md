# Portfolio de Noah Civilise

Portfolio bilingue (FR / EN) d'élève-ingénieur en **IA, vision par ordinateur et traitement d'image** (EPITA, majeure IMAGE). Site statique en HTML, CSS et JavaScript, sans étape de build, avec un fond **Three.js** animé.

---

## Fonctionnalités

1. **Interface à onglets** : Profil (avec les centres d'intérêt en bas), Projets, Expérience, Formation, Compétences.
   - Liens directs vers un onglet (`#projects`, `#skills`…).
   - Navigation au clavier : flèches gauche/droite, <kbd>Début</kbd> et <kbd>Fin</kbd> dans la barre d'onglets, touches <kbd>1</kbd> à <kbd>5</kbd> partout ailleurs.

2. **Projets en grille** :
   - « Projets phares » (IA, vision, GPU) avec captures, puis « Autres projets » en liste compacte.
   - Une page par projet, avec un lien direct (`#projects/alpr`, `#projects/gpgpu`…), un bouton de retour et la navigation vers le projet précédent ou suivant. Le bouton retour du navigateur fonctionne aussi.
   - Les projets ALPR et GPGPU ont une étude de cas complète : contraintes, pipeline étape par étape en images, résultats chiffrés, graphique et analyses Nsight.
   - Tout le contenu des projets (FR et EN) se trouve dans [`js/projects-data.js`](js/projects-data.js).
   - Le stage au Groupe BPCE a lui aussi sa page détaillée (`#experience/bpce`) : contexte, chronologie, pipeline RAG, tableau de bord Power BI, contrôle automatique des factures. Son contenu se trouve dans [`js/experience-data.js`](js/experience-data.js). Aucune capture interne n'y est publiée.

3. **Fond 3D WebGL** : nuage de points animé (64 × 64), dont la hauteur et la couleur sont calculées dans un vertex shader. La caméra se déplace à chaque changement d'onglet.

4. **Mode clair / sombre** : bouton dans l'en-tête, choix mémorisé (`localStorage`).

5. **Bilingue FR / EN** : choix mémorisé. La langue de la page (`<html lang>`), son titre et sa description changent aussi.

6. **CV en PDF** : aperçu intégré sur ordinateur, ouverture directe du PDF sur mobile et tablette.

7. **Accessibilité** : onglets ARIA, fenêtres `<dialog>` natives (focus géré, touche Échap), focus clavier visible, animations coupées si le système demande moins de mouvement (`prefers-reduced-motion`).

8. **Partage** : balises Open Graph et image d'aperçu (`images/og-image.jpg`, 1200 × 630) pour LinkedIn, Slack, X, etc.

---

## Structure

```
index.html              Page unique (sections, fenêtres de dialogue, métadonnées)
css/styles.css          Styles et thèmes clair / sombre
js/i18n.js              Textes de l'interface (FR / EN) et changement de langue
js/projects-data.js     Contenu des projets (FR / EN), source unique
js/experience-data.js   Pages détaillées des expériences (FR / EN)
js/script.js            Onglets, grille et pages des projets et expériences, thème, aperçu du CV
js/three-scene.js       Fond Three.js (nuage de points en shader)
js/vendor/              three.min.js (r128) et gsap.min.js (3.12.5)
images/                 Photo de profil, photo du CV, captures des projets, image de partage
cvs/                    Sources LaTeX des CV (FR / EN) et PDF compilés
```

### Ajouter ou modifier un projet

Ajoutez une entrée dans `PROJECTS` ([`js/projects-data.js`](js/projects-data.js)) avec ses textes `fr` et `en`. Mettez `featured: true` pour la placer parmi les projets phares.

- Version simple : les champs `context`, `highlights`, `results` et `gallery` suffisent ; la page du projet est construite à partir d'eux.
- Étude de cas complète : renseignez `hero`, `figures`, puis `stats` et `sections` dans chaque langue. Les types de blocs disponibles (paragraphe, liste, schéma de pipeline, étapes, figures, tableau, graphique en barres, remarque) sont décrits en tête du fichier.

### CV

Les PDF sont recompilés par GitHub Actions ([`.github/workflows/compile_cv.yml`](.github/workflows/compile_cv.yml)) à chaque push qui modifie un fichier `cvs/*.tex`. La photo du CV est `images/cv-photo.jpg`, déjà recadrée et sans métadonnées.

---

## Lancer en local

```bash
python3 -m http.server 4242
```

Puis ouvrez `http://localhost:4242`.

---

## Crédits

Les projets **ALPR** et **détection de mouvement sur GPU** ont été réalisés avec Talvin Ackbaraly. Les chiffres et les images de ces deux projets proviennent de ses études de cas : [ALPR](https://www.talvin-ackbaraly.com/projects/alpr/) et [IRGPU](https://www.talvin-ackbaraly.com/projects/irgpu/).
