import { CABINET_ADDRESS_LINE, OPENING_APPOINTMENT_NOTE } from "../consts";
import { BOOKING_SENTENCE } from "./consultation-availability";

/**
 * Pages locales des communes voisines de Sceaux (`/psychologue-{slug}/`).
 *
 * Le cabinet reste à Sceaux : chaque page le dit clairement (pas d'adresse fictive)
 * et apporte un contenu propre à la commune (accès, questions fréquentes).
 * Ne pas multiplier les communes avec un texte interchangeable : Google traite
 * ces pages comme des pages satellites.
 */
export interface NearbyCity {
  slug: string;
  /** Nom officiel de la commune. */
  name: string;
  /** Complément après « près » : « du Plessis-Robinson », « de Bourg-la-Reine ». */
  nearLabel: string;
  /** Title ≤ 60 caractères. */
  seoTitle: string;
  description: string;
  lede: string;
  /** Paragraphe d'introduction propre à la commune. */
  intro: string;
  access: { label: string; text: string }[];
  faq: { question: string; answer: string }[];
}

const commonFaq = {
  booking: {
    question: "Comment prendre rendez-vous ?",
    answer: `${OPENING_APPOINTMENT_NOTE} ${BOOKING_SENTENCE}`,
  },
  remote: (name: string) => ({
    question: `Et si je ne peux pas me déplacer depuis ${name} ?`,
    answer:
      "Les consultations peuvent aussi avoir lieu en visioconférence, avec le même cadre et la même confidentialité qu'au cabinet. Il est possible d'alterner séances au cabinet et séances à distance selon votre situation.",
  }),
};

export const NEARBY_CITIES_PAGES: NearbyCity[] = [
  {
    slug: "plessis-robinson",
    name: "Le Plessis-Robinson",
    nearLabel: "du Plessis-Robinson",
    seoTitle: "Psychologue près du Plessis-Robinson | Nicolas Devaux",
    description:
      "Psychologue clinicien à Sceaux, voisin du Plessis-Robinson : cabinet rue Houdan, à quelques minutes de la gare RER B Robinson. Adultes, adolescents, couples.",
    lede: "Le cabinet est à Sceaux, à quelques minutes à pied de la gare de Robinson : une adresse proche pour consulter quand on habite Le Plessis-Robinson.",
    intro:
      "Le Plessis-Robinson et Sceaux sont deux communes voisines, reliées par la gare RER B de Robinson, terminus de la branche, située à Sceaux tout près du Plessis-Robinson. Le cabinet accueille des patients venant du Plessis-Robinson pour un suivi individuel, une thérapie de couple ou un accompagnement d'adolescent.",
    access: [
      {
        label: "En RER B",
        text: "descendez à la gare de Robinson, terminus de la branche ; le cabinet est ensuite à quelques minutes à pied.",
      },
      {
        label: "En bus",
        text: "plusieurs lignes relient les quartiers du Plessis-Robinson à la gare de Robinson et au centre de Sceaux.",
      },
      { label: "En voiture", text: "parking Penthièvre, sur la rue Houdan." },
    ],
    faq: [
      {
        question: "Le cabinet se trouve-t-il au Plessis-Robinson ?",
        answer: `Non. Le cabinet est à Sceaux, au ${CABINET_ADDRESS_LINE}, à quelques minutes à pied de la gare RER B de Robinson. C'est une adresse proche pour les habitants du Plessis-Robinson.`,
      },
      {
        question: "Comment venir au cabinet depuis Le Plessis-Robinson ?",
        answer:
          "Le plus simple est de rejoindre la gare de Robinson, en bus ou à pied selon votre quartier, puis de marcher jusqu'à la rue Houdan. En voiture, le parking Penthièvre se trouve sur la même rue.",
      },
      commonFaq.booking,
      commonFaq.remote("Le Plessis-Robinson"),
    ],
  },
  {
    slug: "bourg-la-reine",
    name: "Bourg-la-Reine",
    nearLabel: "de Bourg-la-Reine",
    seoTitle: "Psychologue près de Bourg-la-Reine | Nicolas Devaux",
    description:
      "Psychologue clinicien à Sceaux, voisin de Bourg-la-Reine : une station de RER B depuis la gare de Bourg-la-Reine. Adultes, adolescents et couples.",
    lede: "Le cabinet est à Sceaux, à une station de RER B de Bourg-la-Reine : une adresse proche pour consulter un psychologue.",
    intro:
      "Bourg-la-Reine et Sceaux sont limitrophes, et la gare de Bourg-la-Reine est le point où le RER B se divise vers Robinson et vers Saint-Rémy-lès-Chevreuse. Depuis Bourg-la-Reine, le cabinet est donc à une station de RER, ou accessible à pied selon votre quartier. Il accueille des patients de Bourg-la-Reine pour un suivi individuel, une thérapie de couple ou un accompagnement d'adolescent.",
    access: [
      {
        label: "En RER B",
        text: "depuis la gare de Bourg-la-Reine, prenez un train en direction de Robinson et descendez à Sceaux, la station suivante ; le cabinet est à quelques minutes à pied.",
      },
      {
        label: "À pied ou à vélo",
        text: "les deux communes se touchent, et selon votre quartier le centre de Sceaux se rejoint sans transport.",
      },
      { label: "En voiture", text: "parking Penthièvre, sur la rue Houdan." },
    ],
    faq: [
      {
        question: "Le cabinet se trouve-t-il à Bourg-la-Reine ?",
        answer: `Non. Le cabinet est à Sceaux, au ${CABINET_ADDRESS_LINE}, à une station de RER B de la gare de Bourg-la-Reine.`,
      },
      {
        question: "Quel train prendre depuis la gare de Bourg-la-Reine ?",
        answer:
          "Un train de la branche de Robinson. Descendez à la gare de Sceaux, la première station après Bourg-la-Reine : le cabinet est ensuite à quelques minutes à pied, dans la rue piétonne du centre-ville.",
      },
      commonFaq.booking,
      commonFaq.remote("Bourg-la-Reine"),
    ],
  },
  {
    slug: "chatenay-malabry",
    name: "Châtenay-Malabry",
    nearLabel: "de Châtenay-Malabry",
    seoTitle: "Psychologue près de Châtenay-Malabry | Nicolas Devaux",
    description:
      "Psychologue clinicien à Sceaux, voisin de Châtenay-Malabry : cabinet rue Houdan, accessible en bus ou en voiture. Adultes, adolescents et couples.",
    lede: "Le cabinet est à Sceaux, commune voisine de Châtenay-Malabry : une adresse proche pour consulter un psychologue.",
    intro:
      "Châtenay-Malabry et Sceaux sont limitrophes. Le cabinet, situé dans le centre-ville de Sceaux, se rejoint en bus, en voiture ou par la gare RER B de Robinson. Il accueille des patients de Châtenay-Malabry pour un suivi individuel, une thérapie de couple ou un accompagnement d'adolescent.",
    access: [
      {
        label: "En bus",
        text: "plusieurs lignes relient Châtenay-Malabry au centre de Sceaux et à la gare RER B de Robinson.",
      },
      {
        label: "En RER B",
        text: "si vous rejoignez la gare de Robinson, le cabinet est ensuite à quelques minutes à pied.",
      },
      { label: "En voiture", text: "parking Penthièvre, sur la rue Houdan." },
    ],
    faq: [
      {
        question: "Le cabinet se trouve-t-il à Châtenay-Malabry ?",
        answer: `Non. Le cabinet est à Sceaux, au ${CABINET_ADDRESS_LINE}, dans la commune voisine de Châtenay-Malabry.`,
      },
      {
        question: "Comment venir au cabinet depuis Châtenay-Malabry ?",
        answer:
          "En bus vers le centre de Sceaux ou la gare de Robinson, puis quelques minutes à pied. En voiture, le parking Penthièvre se trouve sur la même rue que le cabinet.",
      },
      commonFaq.booking,
      commonFaq.remote("Châtenay-Malabry"),
    ],
  },
];
