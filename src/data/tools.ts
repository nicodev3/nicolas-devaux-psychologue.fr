/** Registre unique des outils `/outils/*` — alimente l'index et le maillage interne. */

/** Page de fond proposée à la fin du test, quand elle existe. */
export interface ToolNextStep {
  href: string;
  label: string;
  note: string;
}

export interface Tool {
  href: string;
  title: string;
  description: string;
  badges: string[];
  /** Absent tant qu'aucune page ne traite vraiment le sujet mesuré. */
  nextStep?: ToolNextStep;
}

export interface ToolSection {
  eyebrow: string;
  title: string;
  tools: Tool[];
}

export const TOOL_SECTIONS: ToolSection[] = [
  {
    eyebrow: "01 — Dépistage rapide",
    title: "Bien-être et symptômes courants",
    tools: [
      {
        href: "/outils/who-5/",
        title: "Test de bien-être mental (WHO-5)",
        description:
          "Cinq questions de l'OMS pour évaluer votre bien-être mental au cours des deux dernières semaines. Un complément positif aux questionnaires de dépistage dépressif et anxieux.",
        badges: ["5 questions", "Bien-être", "~2 minutes", "Sauvegarde automatique"],
      },
      {
        href: "/outils/phq-9-gad-7/",
        title: "Test de dépression et d'anxiété (PHQ-9, GAD-7)",
        description:
          "Deux questionnaires validés pour évaluer les symptômes dépressifs et anxieux au cours des deux dernières semaines. Utiles en début de suivi ou pour faire le point sur votre état actuel.",
        badges: ["16 questions", "Dépression + anxiété", "~5 minutes", "Sauvegarde automatique"],
        nextStep: {
          href: "/blog/troubles-anxieux/",
          label: "Comprendre les troubles anxieux",
          note: "Le GAD-7 situe une intensité, il ne dit pas ce qui entretient l'anxiété. L'article détaille les principales formes de troubles anxieux, les mécanismes qui les maintiennent et les approches qui ont fait leurs preuves.",
        },
      },
    ],
  },
  {
    eyebrow: "02 — Thérapie des schémas",
    title: "Questionnaires de schémas",
    tools: [
      {
        href: "/outils/questionnaire-schemas-young/",
        title: "Test des schémas précoces (YSQ-L3)",
        description:
          "Ce questionnaire de 232 affirmations explore 18 schémas précoces inadaptés répartis en 5 domaines. Utilisé dans le cadre de la thérapie des schémas pour identifier les croyances profondes qui influencent vos pensées, émotions et comportements.",
        badges: ["232 questions", "18 schémas", "~25 minutes", "Sauvegarde automatique"],
      },
    ],
  },
  {
    eyebrow: "03 — ACT et flexibilité psychologique",
    title: "Questionnaires ACT",
    tools: [
      {
        href: "/outils/aaq-ii/",
        title: "Test de flexibilité psychologique (AAQ-II)",
        description:
          "Sept affirmations pour évaluer votre flexibilité psychologique et votre tendance à l'évitement expérientiel. Outil de référence en thérapie d'acceptation et d'engagement (ACT).",
        badges: ["7 questions", "Flexibilité psychologique", "~3 minutes", "Sauvegarde automatique"],
        nextStep: {
          href: "/ressources/act-ruminations/",
          label: "ACT et ruminations",
          note: "L'évitement expérientiel que mesure l'AAQ-II est l'un des processus centraux de la thérapie d'acceptation et d'engagement. Le dossier regroupe les repères et les exercices correspondants.",
        },
      },
      {
        href: "/outils/compact/",
        title: "Test des processus ACT (CompACT-FR)",
        description:
          "Vingt-trois affirmations couvrant les trois processus de l'ACT : ouverture à l'expérience, conscience comportementale et action guidée par les valeurs. Mesure plus complète que l'AAQ-II.",
        badges: ["23 questions", "3 sous-échelles", "~8 minutes", "Sauvegarde automatique"],
        nextStep: {
          href: "/ressources/act-ruminations/",
          label: "ACT et ruminations",
          note: "Les trois processus évalués par le CompACT — ouverture à l'expérience, conscience de soi, action guidée par les valeurs — structurent la thérapie d'acceptation et d'engagement.",
        },
      },
    ],
  },
  {
    eyebrow: "04 — Trauma et stress post-traumatique",
    title: "Évaluation des symptômes",
    tools: [
      {
        href: "/outils/pcl-5/",
        title: "Test de stress post-traumatique (PCL-5)",
        description:
          "Vingt questions pour évaluer les symptômes de stress post-traumatique au cours du dernier mois, selon les critères du DSM-5. À compléter en pensant à une expérience vraiment stressante.",
        badges: ["20 questions", "TSPT", "~8 minutes", "Sauvegarde automatique"],
        nextStep: {
          href: "/therapie-mosaic/",
          label: "La thérapie MOSAIC",
          note: "MOSAIC est l'approche de retraitement que j'utilise pour le psychotraumatisme. La page en décrit le déroulé et les indications.",
        },
      },
    ],
  },
  {
    eyebrow: "05 — Compassion et autocritique",
    title: "Relation à soi",
    tools: [
      {
        href: "/outils/fscrs/",
        title: "Test d'autocritique et d'auto-apaisement (FSCRS)",
        description:
          "Vingt-deux affirmations pour explorer comment vous vous parlez à vous-même lorsque les choses tournent mal : sentiment d'inadéquation, hostilité envers soi et capacité à se rassurer. Outil central en thérapie fondée sur la compassion.",
        badges: ["22 questions", "3 sous-échelles", "~10 minutes", "Sauvegarde automatique"],
        nextStep: {
          href: "/ressources/autocompassion-perfectionnisme/",
          label: "Autocompassion et perfectionnisme",
          note: "L'autocritique que mesure le FSCRS est au cœur de la thérapie fondée sur la compassion. Le dossier réunit les repères sur l'autocompassion et le perfectionnisme.",
        },
      },
    ],
  },
  {
    eyebrow: "06 — Sommeil et insomnie",
    title: "Outils TCC-I",
    tools: [
      {
        href: "/outils/calculateur-efficacite-sommeil/",
        title: "Calculateur d'efficacité du sommeil",
        description:
          "Estimez votre efficacité de sommeil selon les principes de la TCC-I. Renseignez vos heures de coucher, de lever et vos éveils nocturnes pour obtenir un résultat instantané avec interprétation pédagogique.",
        badges: ["Calcul instantané", "Insomnie · TCC-I", "~2 minutes", "Aucune donnée transmise"],
      },
    ],
  },
];

/** Liste à plat, dans l'ordre des sections. */
export const TOOLS: Tool[] = TOOL_SECTIONS.flatMap((section) => section.tools);
