/** Distingue l'accueil au cabinet de l'accès à la réservation en ligne. */
export const CONSULTATION_AVAILABILITY = {
  isFull: false,
  onlineBookingForExistingPatientsOnly: false,
  title: "Cabinet complet",
  message: "Je ne prends actuellement pas de nouveaux patients.",
  /** Précise à qui reste ouverte la réservation Doctolib. */
  followUpNote: "Les patients déjà suivis peuvent continuer à prendre rendez-vous sur Doctolib.",
  /** Libellés des boutons Doctolib quand le cabinet est complet. */
  bookingLabel: "Patients suivis : prendre rendez-vous",
  bookingLabelShort: "RDV patients suivis",
} as const;

export const BOOKING_FOR_EXISTING_PATIENTS_ONLY =
  CONSULTATION_AVAILABILITY.isFull || CONSULTATION_AVAILABILITY.onlineBookingForExistingPatientsOnly;

/** Phrase « comment réserver » réutilisée dans les textes et les FAQ (suit l'état du cabinet). */
export const BOOKING_SENTENCE = CONSULTATION_AVAILABILITY.isFull
  ? `${CONSULTATION_AVAILABILITY.title}. ${CONSULTATION_AVAILABILITY.message} ${CONSULTATION_AVAILABILITY.followUpNote}`
  : BOOKING_FOR_EXISTING_PATIENTS_ONLY
    ? "La réservation en ligne sur Doctolib est réservée aux patients déjà suivis."
    : "La prise de rendez-vous se fait en ligne sur Doctolib.";
