/** Espace fine insécable (typographie française). */
export const FINE_NBSP = '\u202F';

/**
 * Applique les règles typographiques françaises usuelles au texte courant.
 * @param {string | null | undefined} input
 * @returns {string}
 */
export function applyFrenchTypography(input) {
  if (!input) return '';

  let s = input;

  // Apostrophes : pas d'espace avant ni après (l', d', n'…).
  s = s.replace(/([A-Za-zÀ-ÖØ-öø-ÿ]) '/g, "$1'");
  s = s.replace(/' (?=[a-zàâäéèêëïîôùûüç])/gi, "'");

  // Tiret cadratin : blancs de part et d'autre.
  s = s.replace(/\s*—\s*/g, ' — ');

  // : ; ? ! — espace fine insécable avant, blanc normal après.
  s = s.replace(/[\s\u00A0]+([:;?!])/g, `${FINE_NBSP}$1`);
  s = s.replace(/([A-Za-zÀ-ÖØ-öø-ÿ0-9])([:;?!])/g, `$1${FINE_NBSP}$2`);
  s = s.replace(/([:;?!])(?![\s\u202F\u00A0])(?=\S)/g, '$1 ');

  // Point et virgule : blanc après (nouvelle proposition).
  s = s.replace(/([.,])(?![\s\u202F\u00A0])(?=[A-Za-zÀ-ÖØ-öø-ÿ])/g, '$1 ');

  // Guillemets français.
  s = s.replace(/(\S)(«)/g, '$1 $2');
  s = s.replace(/(»)(?![\s\u202F\u00A0:;,.)?!])(?=\S)/g, '$1 ');

  // Parenthèses et crochets.
  s = s.replace(/(\S)([([])/g, '$1 $2');
  s = s.replace(/([)\]])(?![\s\u202F\u00A0:;,.)?!])(?=\S)/g, '$1 ');

  // Points de suspension.
  s = s.replace(/(\.{3}|…)(?![\s\u202F\u00A0])(?=\S)/g, '$1 ');

  return s;
}
