// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_NAME = 'Nicolas Devaux, psychologue à Sceaux';
export const SITE_TITLE = 'Nicolas Devaux | Psychologue à Sceaux et en ligne';

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

export const SITE_DESCRIPTION = `Psychologue clinicien à Sceaux, Nicolas Devaux accompagne adultes, adolescents et couples en cabinet ou en ligne : thérapie individuelle, EMDR-MOSAIC, thérapie de couple et groupes.`;

/** URL unique « Prendre rendez-vous » Doctolib (tracking campaign conservée). */
export const DOCTOLIB_BOOKING_URL =
  'https://www.doctolib.fr/psychologue/sceaux/nicolas-devaux-sceaux/booking?utm_campaign=website-button&utm_source=nicolas-devaux-sceaux-website-button&utm_medium=referral&utm_content=withpreview-white-inlined&utm_term=nicolas-devaux-sceaux';

/** Raison sociale (entreprise individuelle). */
export const LEGAL_ENTITY_NAME = 'Nicolas Devaux — EI';

/** Numéro SIRET de l'entreprise individuelle. */
export const SIRET_NUMBER = '75103269900033';

/** Identifiants professionnels (site & pied de page). */
export const RPPS_NUMBER = '10008482910';

/** Numéro ADELI — renseigner une fois connu pour affichage automatique au pied de page. */
export const ADELI_NUMBER: string | null = null;
