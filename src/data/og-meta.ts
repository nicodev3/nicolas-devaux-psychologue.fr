/**
 * Slugs d’images OG (`/og/{slug}.png`) alignés sur `pathnameToOgSlug`.
 */
export const STATIC_OG_SLUGS = [
  "index",
  "tarifs",
  "consulter",
  "mentions-legales",
  "nicolas-devaux-psychologue",
  "psychotherapie",
  "therapie-mosaic",
  "tcc-troisieme-vague",
  "therapie-acceptation-et-engagement",
  "therapie-cognitive-et-comportementale",
  "therapie-fondee-compassion",
  "therapie-pleine-conscience",
  "psychologue-sceaux",
  "mon-soutien-psy",
  "blog",
  "outils",
  "outils-questionnaire-schemas-young",
  "meditation-pleine-conscience-sceaux",
  "therapie-couple",
  "psychologue-en-ligne",
] as const;

/** Titres affichés sur la carte OG (serif sur fond crème). */
export const OG_TITLES: Record<(typeof STATIC_OG_SLUGS)[number], string> = {
  index: "Nicolas Devaux\nPsychologue clinicien",
  tarifs: "Tarifs et horaires",
  consulter: "Consulter un psychologue à Sceaux",
  "mentions-legales": "Mentions légales",
  "nicolas-devaux-psychologue": "À propos — Nicolas Devaux",
  "psychologue-sceaux": "Psychologue à Sceaux\nNicolas Devaux",
  psychotherapie: "Approches thérapeutiques au cabinet",
  "therapie-mosaic": "Thérapie MOSAIC à Sceaux",
  "tcc-troisieme-vague": "TCC de 3e vague à Sceaux",
  "therapie-acceptation-et-engagement": "Thérapie ACT à Sceaux",
  "therapie-cognitive-et-comportementale": "Thérapie cognitive et comportementale",
  "therapie-fondee-compassion": "Thérapie fondée sur la compassion",
  "therapie-pleine-conscience": "MBCT et pleine conscience",
  "mon-soutien-psy": "Mon Soutien Psy — informations",
  blog: "Articles — psychologie",
  outils: "Outils psychologiques",
  "outils-questionnaire-schemas-young": "Questionnaire des schémas de Young",
  "meditation-pleine-conscience-sceaux": "Méditation de pleine conscience — groupes à Sceaux",
  "therapie-couple": "Thérapie de couple à Sceaux",
  "psychologue-en-ligne": "Psychologue en ligne\nConsultations en visio",
};

export const STATIC_OG_SLUG_SET = new Set<string>(STATIC_OG_SLUGS);
