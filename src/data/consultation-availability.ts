/** Activer lors de la prochaine compilation pour signaler un cabinet complet. */
export const CONSULTATION_AVAILABILITY = {
  isFull: true,
  title: "Cabinet complet",
  message: "Je ne prends actuellement pas de nouveaux patients.",
  /** Précise à qui reste ouverte la réservation Doctolib. */
  followUpNote: "Les patients déjà suivis peuvent continuer à prendre rendez-vous sur Doctolib.",
  /** Libellés des boutons Doctolib quand le cabinet est complet. */
  bookingLabel: "Patients suivis : prendre rendez-vous",
  bookingLabelShort: "RDV patients suivis",
} as const;

/** Phrase « comment réserver » réutilisée dans les textes et les FAQ (suit l'état du cabinet). */
export const BOOKING_SENTENCE = CONSULTATION_AVAILABILITY.isFull
  ? "Le cabinet est actuellement complet : seuls les patients déjà suivis peuvent prendre rendez-vous, en ligne sur Doctolib."
  : "La prise de rendez-vous se fait en ligne sur Doctolib.";
