# Journal des modifications

Ce fichier résume les évolutions livrées sur la branche de travail (livrable « feature complete » côté produit technique).

## Détail récent — polish livraison & réseaux sociaux

### Typographie & fondations CSS (`src/styles/global.css`)

- Rendu du texte : `text-rendering: optimizeLegibility`, lissage WebKit / macOS sur `html`.
- Inter Variable : `font-feature-settings: 'ss01', 'cv11', 'kern'` sur `body`.
- Variables d’ombre partagées : `--shadow-menu-panel`, `--shadow-button-primary` (évite les `rgba(#000)` dans les composants).
- Dégradé hérité Bear Blog : arrêt `#fff` remplacé par `var(--color-white)`.
- Squelette **prefers-color-scheme: dark** : définition de jetons `--color-dark-*` réservés, sans activation visuelle du thème sombre.
- Déjà présent : `overflow-x: hidden` sur `html`.

### Cartes Open Graph & Twitter (`BaseHead`, génération d’images)

- Méta par défaut : `og:url` alignée sur l’URL canonique, `og:image` absolu via `Astro.site`, dimensions `1200×630`, `og:image:alt`, `og:locale` (`fr_FR`).
- Images OG dynamiques au **build** : routes `/og/{slug}.png` (`src/pages/og/[slug].png.ts`) avec titre serif Source Serif 4 sur fond crème (`src/components/opengraph/opengraph-image.tsx`, utilitaire `render-opengraph-png.ts`, palette raster `utils/og/theme.ts`).
- Polices raster pour **Satori** : fichiers **WOFF** (latin 400 & 600) du paquet `@fontsource/source-serif-4` (WOFF2 non supporté par le parseur OpenType utilisé).
- Cartographie titre/statiques : `src/data/og-meta.ts`. Dérivation slug depuis l’URL : `pathname-to-og-slug.ts` (fallback `index`).

### Images (`astro:assets`)

- Usage généralisé de **`<Picture formats={["avif","webp"]}>`** pour les photos raster (cartes blog d’accueil, hero BlogPost, pages approches, portrait À propos, AuthorCard avec portrait hero non lazy + `densities`, galerie cabinet déjà en Picture).
- SVG conservés en **`Image`** (schémas, logos vectoriels).
- Attributs explicites : dimensions depuis les métadonnées Astro ; `loading="lazy"` / `decoding="async"` hors portraits critiques ; portrait hero accueil / À propos en `loading="eager"` où pertinent.

### Accessibilité

- Mentions légales : affichage progressif téléphone / email via **`<button type="button">`** + lien `tel:` / `mailto:` lorsque révélé, avec `aria-expanded`.
- Page Mon soutien Psy : suppression des emoji décoratifs dans le paragraphe d’instructions (confusions lecteurs d’écran).
- Script NPM `a11y:axe` (après `a11y:serve`) pour `@axe-core/cli`. Sur cet environnement, **axe peut échouer** si le ChromeDriver attendu est absent ou cassé (`ENOENT` sur chromedriver) — réinstaller ou ajuster `browser-driver-manager` puis relancer `npm run a11y:serve` puis `npm run a11y:axe`.

### SEO mineur

- Blog index : titre H1/meta « Blog — articles de psychologie », description avec accents corrects.

### Dépendances

- Ajouts runtime : `satori`, `@resvg/resvg-js`, `@fontsource/source-serif-4`.
- Ajouts dev : `@axe-core/cli`.

---

## Récapitulatif des chantiers précédents (même ligne produit)

### Crédibilité & confiance (page d’accueil)

- Bandeau auteur sous le H1 (photo 48px, diplôme, lien RPPS).
- Bandeau de confiance (RPPS, secret pro, visio, MSP).
- Note confidentialité à proximité du CTA Doctolib.
- Galerie « cabinet » entre approches et FAQ (lazy, AVIF/WebP).
- Page À propos : bloc vidéo natif conditionné à `public/media/a-propos-intro.mp4` avec poster.

### Responsive & navigation

- Breakpoints normalisés (dont `2xl: 1440px`).
- Mise en page article + rail 320px à partir de **`lg` (1024px)** au lieu de `xl`.
- Hero empilé en colonne sur petits écrans ; échelle de titre hero dédiée (36 / 56 / 72 px).
- Menu : burger **&lt; md**, navigation complète **md+**, tiroir mobile depuis la droite avec même easing que le menu Approches.

### Composants

- `ApproachesDropdown` : ombre via `--shadow-menu-panel`, origine transform Tailwind (`origin-top`).

---

## Lighthouse (mobile 95+ / catégories 100)

Les scores Lighthouse dépendent de la machine, du réseau, du cache et des scripts tiers (**Umami**). Ce dépôt n’intègre pas encore un rapport CSV/HTML versionné. Après déploiement, contrôler sur une URL stable avec « simulated / applied slowdown » et envisager :

- stratégie de chargement pour les polices (sous-ensembles, préchargement ciblé) ;
- revue du script analytics si Best Practices ou Performance doit être poussé au-delà du plateau observé.

---

## Hex et composants

- Les composants Astro/React utilisés pour l’UI évitent les couleurs hex codées en dur ; les ombres utilisent des jetons OKLCH dans `@theme`.
- Les fichiers **SVG dans `src/assets`** conservent leurs couleurs natives (illustrations éditoriales).
- La palette **OG raster** (`utils/og/theme.ts`) utilise des hex documentés comme équivalents volontaires du thème OKLCH pour compatibilité **Satori**.
