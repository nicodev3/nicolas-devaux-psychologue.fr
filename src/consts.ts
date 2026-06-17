// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_NAME = "Nicolas Devaux, psychologue à Sceaux";
export const SITE_TITLE =
  "Psychologue TCC et EMDR-MOSAIC à Sceaux | Nicolas Devaux";

/** Adresse complète du cabinet (une ligne). */
export const CABINET_ADDRESS_LINE = "63 rue Houdan, 92330 Sceaux";

/**
 * Lien Google Maps (itinéraire / fiche lieu).
 * Doublon figé dans `BaseHead.astro` (`hasMap`, script `is:inline`) : garder la même URL.
 */
export const GOOGLE_MAPS_CABINET_URL =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent(CABINET_ADDRESS_LINE);

/** URL d'intégration carte (iframe Google Maps, sans clé API). */
export const GOOGLE_MAPS_EMBED_URL =
  "https://www.google.com/maps?q=" +
  encodeURIComponent(`${CABINET_ADDRESS_LINE}, France`) +
  "&hl=fr&z=17&output=embed";

/** Villes voisines du cabinet (formulations courtes sur le site). */
export const NEARBY_CITIES =
  "Antony, Bourg-la-Reine, Châtenay-Malabry et Fontenay-aux-Roses";

/** Communes desservies — page locale et maillage SEO (psychologue Sceaux et alentours). */
export const SERVED_CITIES_LABEL =
  "Sceaux, Le Plessis-Robinson, Antony, Bourg-la-Reine, Châtenay-Malabry, Fontenay-aux-Roses, Bagneux, Cachan et L'Haÿ-les-Roses";

export const SITE_DESCRIPTION = `Psychologue clinicien à Sceaux : TCC, EMDR-MOSAIC et thérapie de couple, au cabinet ou en ligne. Rendez-vous sur Doctolib.`;

/** URL unique « Prendre rendez-vous » Doctolib (tracking campaign conservée). */
export const DOCTOLIB_BOOKING_URL =
  "https://www.doctolib.fr/psychologue/sceaux/nicolas-devaux-sceaux/booking?utm_campaign=website-button&utm_source=nicolas-devaux-sceaux-website-button&utm_medium=referral&utm_content=withpreview-white-inlined&utm_term=nicolas-devaux-sceaux";

/** Raison sociale (entreprise individuelle). */
export const LEGAL_ENTITY_NAME = "Nicolas Devaux — EI";

/** Numéro SIRET de l'entreprise individuelle. */
export const SIRET_NUMBER = "75103269900033";

/** Identifiants professionnels (site & pied de page). */
export const RPPS_NUMBER = "10008482910";

/** Numéro ADELI — renseigner une fois connu pour affichage automatique au pied de page. */
export const ADELI_NUMBER: string | null = null;

/** Email de contact du cabinet (schema.org, mentions légales). */
export const CONTACT_EMAIL = "contact@nicolas-devaux-psychologue.fr";

/** Jours d'ouverture en semaine (affichage). */
export const OPENING_WEEKDAYS_LABEL = "Lundi, mardi et vendredi";

/** Plage horaire en semaine (affichage). */
export const OPENING_WEEKDAYS_HOURS = "8h00 - 19h00";

/** Samedi alterné (affichage). */
export const OPENING_SATURDAY_LABEL = "Samedi (un matin sur deux)";

/** Plage horaire samedi (affichage). */
export const OPENING_SATURDAY_HOURS = "Matin";

/** Texte récapitulatif pour FAQ et contenus. */
export const OPENING_HOURS_TEXT =
  "le lundi, le mardi et le vendredi de 8h à 19h, et un samedi matin sur deux";

/** Tags du blog — valeurs autorisées et libellés français. */
export const BLOG_TAGS = [
  "sommeil",
  "therapies",
  "pleine-conscience",
  "couple",
  "consulter",
  "outils",
] as const;

export type BlogTag = (typeof BLOG_TAGS)[number];

export const BLOG_TAG_LABELS: Record<BlogTag, string> = {
  sommeil: "Sommeil",
  therapies: "Thérapies",
  "pleine-conscience": "Pleine conscience",
  couple: "Thérapie de couple",
  consulter: "Consulter un psy",
  outils: "Outils pratiques",
};

/** Schema.org — horaires d'ouverture du cabinet. */
export const OPENING_HOURS_SCHEMA = [
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Friday"],
    opens: "08:00",
    closes: "19:00",
  },
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Saturday"],
    opens: "08:00",
    closes: "13:00",
    description: "Un samedi matin sur deux",
  },
] as const;
