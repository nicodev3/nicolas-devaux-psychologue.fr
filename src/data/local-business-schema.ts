import {
  CONTACT_EMAIL,
  GOOGLE_MAPS_CABINET_URL,
  LEGAL_ENTITY_NAME,
  OPENING_HOURS_SCHEMA,
  RPPS_NUMBER,
  SIRET_NUMBER,
} from "../consts";

/** URL canonique de la fiche locale (anti-cannibalisation avec la homepage). */
export const LOCAL_LANDING_URL =
  "https://nicolas-devaux-psychologue.fr/psychologue-sceaux/";

export const CABINET_SCHEMA_ID =
  "https://nicolas-devaux-psychologue.fr/#cabinet";

/** Schema.org LocalBusiness — une seule définition partagée (BaseHead). */
export function buildLocalBusinessSchema() {
  return {
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": CABINET_SCHEMA_ID,
    name: "Nicolas Devaux, psychologue à Sceaux",
    legalName: LEGAL_ENTITY_NAME,
    taxID: SIRET_NUMBER,
    url: LOCAL_LANDING_URL,
    telephone: "+33629341367",
    email: CONTACT_EMAIL,
    logo: {
      "@type": "ImageObject",
      url: "https://nicolas-devaux-psychologue.fr/logo-300.jpg",
    },
    image: {
      "@type": "ImageObject",
      url: "https://nicolas-devaux-psychologue.fr/nicolas_devaux.jpg",
      caption: "Nicolas Devaux, psychologue clinicien à Sceaux",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "63 rue Houdan",
      addressLocality: "Sceaux",
      postalCode: "92330",
      addressRegion: "Île-de-France",
      addressCountry: "FR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 48.7764,
      longitude: 2.2903,
    },
    hasMap: GOOGLE_MAPS_CABINET_URL,
    openingHoursSpecification: OPENING_HOURS_SCHEMA,
    priceRange: "€€",
    areaServed: [
      { "@type": "City", name: "Sceaux" },
      { "@type": "City", name: "Le Plessis-Robinson" },
      { "@type": "City", name: "Antony" },
      { "@type": "City", name: "Bourg-la-Reine" },
      { "@type": "City", name: "Châtenay-Malabry" },
      { "@type": "City", name: "Fontenay-aux-Roses" },
      { "@type": "City", name: "Bagneux" },
      { "@type": "City", name: "Cachan" },
      { "@type": "City", name: "L'Haÿ-les-Roses" },
      { "@type": "AdministrativeArea", name: "Hauts-de-Seine" },
    ],
    knowsAbout: [
      "Thérapie MOSAIC",
      "Thérapie cognitive et comportementale (TCC)",
      "Thérapie d'acceptation et d'engagement (ACT)",
      "Pleine conscience (MBCT, MBSR)",
      "Psychologie clinique",
      "Thérapie de couple",
      "Gestion de l'anxiété",
      "Stress post-traumatique",
    ],
    identifier: [
      {
        "@type": "PropertyValue",
        propertyID: "RPPS",
        value: RPPS_NUMBER,
      },
      {
        "@type": "PropertyValue",
        propertyID: "SIRET",
        value: SIRET_NUMBER,
      },
    ],
    employee: {
      "@type": "Person",
      "@id": "https://nicolas-devaux-psychologue.fr/#nicolas",
      name: "Nicolas Devaux",
      jobTitle: "Psychologue clinicien",
      url: "https://nicolas-devaux-psychologue.fr/nicolas-devaux-psychologue/",
      identifier: {
        "@type": "PropertyValue",
        propertyID: "RPPS",
        value: RPPS_NUMBER,
      },
      knowsLanguage: [
        { "@type": "Language", name: "Français", alternateName: "fr-FR" },
        { "@type": "Language", name: "Anglais", alternateName: "en-GB" },
      ],
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "Prise de rendez-vous en ligne",
        url: "https://www.doctolib.fr/psychologue/sceaux/nicolas-devaux-sceaux",
        availableLanguage: ["fr-FR", "en-GB"],
        hoursAvailable: OPENING_HOURS_SCHEMA[0],
      },
      {
        "@type": "ContactPoint",
        contactType: "Renseignements",
        telephone: "+33629341367",
        availableLanguage: ["fr-FR", "en-GB"],
      },
    ],
    sameAs: [
      "https://www.doctolib.fr/psychologue/sceaux/nicolas-devaux-sceaux",
      "https://www.linkedin.com/in/nicodev3/",
    ],
    makesOffer: [
      {
        "@type": "Offer",
        name: "Consultation individuelle",
        price: 80,
        priceCurrency: "EUR",
        url: "https://nicolas-devaux-psychologue.fr/tarifs/",
        availability: "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        name: "Séance MOSAIC",
        price: 90,
        priceCurrency: "EUR",
        url: "https://nicolas-devaux-psychologue.fr/tarifs/",
        availability: "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        name: "Consultation de couple",
        price: 110,
        priceCurrency: "EUR",
        url: "https://nicolas-devaux-psychologue.fr/tarifs/",
        availability: "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        name: "Consultation en visioconférence",
        price: 80,
        priceCurrency: "EUR",
        url: "https://nicolas-devaux-psychologue.fr/tarifs/",
        availability: "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        name: "Participation aux groupes de pleine conscience",
        price: 30,
        priceCurrency: "EUR",
        url: "https://nicolas-devaux-psychologue.fr/tarifs/",
        availability: "https://schema.org/InStock",
      },
    ],
  };
}
