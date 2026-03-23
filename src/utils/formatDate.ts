export function formatFrenchDate(date: Date): string {
  return date.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function toDateTime(date: Date): string {
  return date.toISOString();
}
