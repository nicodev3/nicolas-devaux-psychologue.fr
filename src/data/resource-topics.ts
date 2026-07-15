import type { BlogTag } from "../consts";

export interface ResourceLink {
  href: string;
  title: string;
  description: string;
  label: string;
}

export interface ResourceTopic {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  eyebrow: string;
  intro: string;
  perspective: string;
  questions: string[];
  blogTags: BlogTag[];
  links: ResourceLink[];
  scopeNote: string;
}

export const RESOURCE_TOPICS: ResourceTopic[] = [
  {
    slug: "sommeil-insomnie",
    title: "Sommeil et insomnie",
    seoTitle: "Insomnie et TCC-I : ressources | Nicolas Devaux",
    description:
      "Comprendre l'insomnie, les réveils nocturnes et la TCC-I avec des articles et outils pratiques rédigés par un psychologue.",
    eyebrow: "Sommeil · TCC-I",
    intro:
      "L'insomnie ne se résume pas à un manque de bonnes habitudes. Cette sélection aide à comprendre les mécanismes qui entretiennent les difficultés de sommeil, à observer ses nuits avec des repères fiables et à découvrir ce que propose la TCC-I.",
    perspective:
      "Le fil conducteur est de passer de la surveillance anxieuse du sommeil à une observation plus utile : temps passé au lit, éveils, rythme, fatigue et stratégies de compensation.",
    questions: [
      "Pourquoi reste-t-on éveillé alors que l'on est épuisé ?",
      "Comment interpréter son efficacité du sommeil sans en faire une nouvelle performance ?",
      "Quelle différence entre conseils d'hygiène du sommeil et TCC-I ?",
    ],
    blogTags: ["sommeil"],
    links: [
      {
        href: "/outils/calculateur-efficacite-sommeil/",
        title: "Calculateur d'efficacité du sommeil",
        description:
          "Estimer la part du temps au lit réellement consacrée au sommeil.",
        label: "Outil interactif",
      },
      {
        href: "/blog/comment-calculer-efficacite-sommeil/",
        title: "Calculer et interpréter l'efficacité du sommeil",
        description:
          "La formule, un exemple et les précautions d'interprétation.",
        label: "Guide pratique",
      },
    ],
    scopeNote:
      "Ces ressources apportent des repères de psychoéducation. Elles ne remplacent pas une évaluation médicale, notamment en cas de suspicion d'apnée du sommeil, de mouvements nocturnes, de somnolence importante ou d'effet indésirable d'un traitement.",
  },
  {
    slug: "act-ruminations",
    title: "ACT et ruminations",
    seoTitle: "ACT et ruminations : comprendre et agir | Nicolas Devaux",
    description:
      "Ruminations, défusion cognitive, évitement expérientiel et valeurs : ressources pour comprendre les principes de la thérapie ACT.",
    eyebrow: "ACT · Flexibilité psychologique",
    intro:
      "Ruminer donne souvent l'impression de chercher une solution, tout en maintenant l'attention au même endroit. L'ACT propose de modifier la relation aux pensées et aux émotions afin de retrouver une marge de choix et de revenir vers des actions qui comptent.",
    perspective:
      "Il ne s'agit ni de supprimer les pensées ni de se forcer à les croire positives. Le travail porte sur la flexibilité psychologique : remarquer ce qui se passe, se désengager des luttes inutiles et choisir une réponse plus ajustée.",
    questions: [
      "Comment distinguer réflexion utile et rumination mentale ?",
      "Qu'est-ce que la défusion cognitive ?",
      "Comment avancer en présence d'une émotion difficile ?",
    ],
    blogTags: ["act"],
    links: [
      {
        href: "/therapie-acceptation-et-engagement/",
        title: "Thérapie d'acceptation et d'engagement",
        description:
          "Les principes, les six processus et le déroulement d'une thérapie ACT.",
        label: "Approche",
      },
      {
        href: "/outils/compact/",
        title: "CompACT-FR",
        description:
          "Un questionnaire sur plusieurs dimensions de la flexibilité psychologique.",
        label: "Questionnaire",
      },
      {
        href: "/outils/aaq-ii/",
        title: "AAQ-II",
        description:
          "Un repère sur l'évitement expérientiel et la flexibilité psychologique.",
        label: "Questionnaire",
      },
    ],
    scopeNote:
      "Les exercices proposés dans les articles sont des pistes d'observation et non une thérapie complète. Des ruminations envahissantes peuvent accompagner une dépression, un trouble anxieux ou un TOC et justifier une évaluation clinique.",
  },
  {
    slug: "autocompassion-perfectionnisme",
    title: "Autocompassion et perfectionnisme",
    seoTitle: "Autocompassion et autocritique | Nicolas Devaux",
    description:
      "Comprendre l'autocompassion, l'autocritique et le perfectionnisme avec les apports de la thérapie fondée sur la compassion.",
    eyebrow: "Compassion · Relation à soi",
    intro:
      "L'autocritique peut sembler nécessaire pour progresser, mais elle devient parfois une source durable de menace, de honte et d'épuisement. La compassion propose une manière plus stable de reconnaître une difficulté et d'y répondre avec courage.",
    perspective:
      "La compassion n'est pas de la complaisance. Elle associe sensibilité à la souffrance, compréhension du contexte et engagement dans une réponse utile, y compris lorsqu'une limite ou un changement est nécessaire.",
    questions: [
      "Quelle différence entre autocompassion et estime de soi ?",
      "Pourquoi l'autocritique ne produit-elle pas toujours le changement attendu ?",
      "Comment répondre à une erreur sans se dévaloriser ?",
    ],
    blogTags: ["compassion"],
    links: [
      {
        href: "/therapie-fondee-compassion/",
        title: "Thérapie fondée sur la compassion",
        description:
          "Le modèle de la CFT et ses trois systèmes de régulation émotionnelle.",
        label: "Approche",
      },
      {
        href: "/outils/fscrs/",
        title: "FSCRS",
        description:
          "Explorer les formes d'autocritique et la capacité d'auto-apaisement.",
        label: "Questionnaire",
      },
    ],
    scopeNote:
      "Cultiver l'autocompassion peut être déstabilisant lorsque la bienveillance a été associée au danger, au rejet ou à la vulnérabilité. Il est alors préférable d'avancer progressivement, parfois avec un accompagnement.",
  },
  {
    slug: "attention-etudes",
    title: "Attention et études",
    seoTitle: "TDAH et études : attention, organisation | Nicolas Devaux",
    description:
      "Procrastination, organisation, attention fluctuante et TDAH : repères et stratégies concrètes pour les étudiants.",
    eyebrow: "Étudiants · Fonctions exécutives",
    intro:
      "Commencer une tâche, estimer sa durée ou maintenir un effort sans échéance immédiate peut être difficile, avec ou sans TDAH. Ces ressources s'intéressent aux mécanismes concrets du travail étudiant plutôt qu'aux injonctions à mieux se motiver.",
    perspective:
      "L'objectif est d'externaliser ce que l'attention et la mémoire de travail gèrent difficilement : prochaines actions visibles, temps délimité, environnement préparé et retours réguliers sur la stratégie utilisée.",
    questions: [
      "Pourquoi une tâche importante peut-elle rester impossible à commencer ?",
      "Comment réduire la charge de planification avant de travailler ?",
      "Quand des difficultés attentionnelles justifient-elles une évaluation spécialisée ?",
    ],
    blogTags: ["etudiants"],
    links: [
      {
        href: "/psychologue-en-ligne/",
        title: "Consultations en ligne",
        description:
          "Le cadre, les indications et les limites des consultations en visioconférence.",
        label: "Accompagnement",
      },
    ],
    scopeNote:
      "Des difficultés de concentration ne suffisent pas à conclure à un TDAH. Le sommeil, l'anxiété, la dépression, la consommation de substances, certaines maladies ou certains traitements peuvent également affecter l'attention.",
  },
];

export const RESOURCE_TOPIC_BY_SLUG = Object.fromEntries(
  RESOURCE_TOPICS.map((topic) => [topic.slug, topic]),
) as Record<string, ResourceTopic>;
