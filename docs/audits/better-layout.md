# Audit better-layout

Périmètre : accueil complet, navigation, pied de page et réservation flottante. Contrôle complémentaire des composants partagés sur `/tarifs/` et `/consulter/`. Les autres pages et les parcours externes Doctolib ne sont pas audités.

Stack : Astro, Tailwind CSS 4, Alpine et React. Corrections dans les composants et utilitaires existants. Le README décrit les commandes ; aucune convention de mise en page supplémentaire ni fichier AGENTS.md n'a été trouvé dans le projet.

## Adaptation et débordements

| Sévérité | Emplacement | Avant | Après | Pourquoi |
| --- | --- | --- | --- | --- |
| MEDIUM | `src/components/ui/button.ts:18` et `:34` | `h-11` / `h-12` et `whitespace-nowrap` | Hauteur minimale, padding vertical, largeur maximale et retour à la ligne | Permettre aux actions de grandir avec leur libellé. À 320 px, les deux boutons du hero restent dans leur conteneur avec un suffixe allemand allongé. |
| MEDIUM | `src/components/Footer.astro:53`, `src/styles/global.css:285` et `:347` | Présentation non réductible de 384 px à côté des liens dès 768 px ; titres en `nowrap` | Colonnes différées à 1024 px, largeurs flexibles et titres multilignes | Maintenir des colonnes lisibles et permettre la croissance des titres. |
| MEDIUM | `src/components/HorairesTarifsSection.astro:40` et `:69` | Libellés et valeurs contraints dans une même ligne flex | Retour à la ligne possible ; groupe descriptif flexible | Préserver l'association libellé / valeur lorsque la place manque. |
| LOW | `src/pages/index.astro:91`, `src/components/ApprochesSection.astro:57`, `src/components/FAQSection.astro:40`, `src/components/HomeLatestArticles.astro:15` | Sections `w-screen` centrées par translation : décalage mesuré de 7 px vers la gauche avec scrollbar | Sections dans le flux pleine largeur, contenu dans les marges communes | Les fonds occupent la largeur disponible et les textes suivent les mêmes bords, sans dépendre de `100vw`. |

## Ordre de lecture

| Sévérité | Emplacement | Avant | Après | Pourquoi |
| --- | --- | --- | --- | --- |
| MEDIUM | `src/components/HeroSection.astro:14` et `:45` | `order-2` sur la présentation, `order-1` sur le portrait à petite largeur | Ordre DOM conservé à toutes les largeurs | Présentation et réservation avant le portrait ; ordre visuel conforme à la lecture et au clavier. |

## Contenu et commandes fixes

| Sévérité | Emplacement | Avant | Après | Pourquoi |
| --- | --- | --- | --- | --- |
| MEDIUM | `src/components/Header.astro:29` et `:110` | `backdrop-blur` sur l'ancêtre du panneau fixe ; en-tête `z-30` sous le FAB `z-50` | Retrait du filtre créant un bloc de référence ; en-tête `z-60` | Le panneau reste référencé au viewport et recouvre le FAB. Mesure à 320 × 450 : panneau de y=0 à y=450, contenu interne défilant. |
| MEDIUM | `src/styles/global.css:201` | En-tête sticky de 80 px, sans `scroll-padding-block-start` | Réservation de 5 rem au début du défilement | Les ancres arrivent au bord inférieur de l'en-tête plutôt que derrière lui. |
| LOW | `src/components/Header.astro:167` | Réservation mobile bord à bord sur les pages intérieures | Marges `px-4 sm:px-6 lg:px-8` | La commande suit les marges du contenu. |

## Miroir RTL

| Sévérité | Emplacement | Avant | Après | Pourquoi |
| --- | --- | --- | --- | --- |
| MEDIUM | `src/components/Header.astro:47` et `:110`, `src/components/BookingFab.astro:87`, `src/components/FAQSection.astro:62` | Espacement et positionnement physiques, transition toujours vers la droite, FAQ alignée à gauche | Utilitaires logiques, transition inversée en RTL et `text-start` | Le panneau et la réservation flottante suivent le bord de fin ; les questions suivent le sens de lecture. |

## Vérifications

- Chrome headless sur l'application locale : aucun élément de l'accueil ou du pied de page ne dépasse horizontalement à 320, 375, 640, 768, 1024, 1280, 1536 et 1920 px.
- Miroir RTL : contrôle géométrique sans débordement à 320, 768 et 1536 px.
- Menu ouvert à 320 × 450 : panneau entièrement dans le viewport, liste défilante et panneau au premier plan.
- Libellés des deux boutons du hero prolongés par « Terminvereinbarung und weitere Informationen » : boutons multilignes, sans débordement interne à 320 px.
- Inspection visuelle d'une capture mobile à 320 px : présentation puis actions, bouton secondaire multiligne, marges préservées.
- `/tarifs/` et `/consulter/` à 320 px : réservation mobile dans les marges et absence de débordement de la page.
- **Non vérifié** : zoom natif du navigateur à 200 %, traduction intégrale, Safari/iOS, zones physiques de sécurité et clavier virtuel. Le contrôle à 640 px couvre le reflow d'une fenêtre de 1280 px à 200 %, sans remplacer un test de zoom natif.

**Approve — uniquement pour le périmètre inspecté et les vérifications ci-dessus.** Aucun problème HIGH restant constaté dans ces conditions.
