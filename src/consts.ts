// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_NAME = 'Nicolas Devaux, psychologue à Sceaux';
export const SITE_TITLE = `${SITE_NAME} | TCC, ACT, MBCT`;

/** Adresse complète du cabinet (une ligne). */
export const CABINET_ADDRESS_LINE = '63 rue Houdan, 92330 Sceaux';

/**
 * Lien Google Maps (itinéraire / fiche lieu).
 * Doublon figé dans `BaseHead.astro` (`hasMap`, script `is:inline`) : garder la même URL.
 */
export const GOOGLE_MAPS_CABINET_URL =
  'https://www.google.com/maps/search/?api=1&query=' +
  encodeURIComponent(CABINET_ADDRESS_LINE);

/** URL d'intégration carte (iframe Google Maps, sans clé API). */
export const GOOGLE_MAPS_EMBED_URL =
  'https://www.google.com/maps?q=' +
  encodeURIComponent(`${CABINET_ADDRESS_LINE}, France`) +
  '&hl=fr&z=17&output=embed';

/** Villes voisines du cabinet (SEO local, formulations sur le site). */
export const NEARBY_CITIES =
  'Antony, Bourg-la-Reine, Châtenay-Malabry et Fontenay-aux-Roses';

export const SITE_DESCRIPTION = `Psychologue à Sceaux | Thérapies ACT, TCC et pleine conscience. Cabinet proche de ${NEARBY_CITIES.replace(' et ', ', ')}. Accompagnement personnalisé pour anxiété, dépression, stress. Consultations sur RDV.`;

/** URL unique « Prendre rendez-vous » Doctolib (tracking campaign conservée). */
export const DOCTOLIB_BOOKING_URL =
  'https://www.doctolib.fr/psychologue/sceaux/nicolas-devaux-sceaux/booking?utm_campaign=website-button&utm_source=nicolas-devaux-sceaux-website-button&utm_medium=referral&utm_content=withpreview-white-inlined&utm_term=nicolas-devaux-sceaux';

/** Identifiants professionnels (site & pied de page). */
export const RPPS_NUMBER = '10008482910';

/** Numéro ADELI — renseigner une fois connu pour affichage automatique au pied de page. */
export const ADELI_NUMBER: string | null = null;
