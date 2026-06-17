export const FINE_NBSP = "\u202F";
const EM_DASH = "\u2014";
const ELLIPSIS = "\u2026";
const OPEN_GUILLEMET = "\u00AB";
const CLOSE_GUILLEMET = "\u00BB";

export function applyFrenchTypography(input) {
  if (!input) return "";

  let s = String(input);

  s = s.replace(/([\p{L}]) '/gu, "$1'");
  s = s.replace(/' (?=[\p{L}])/gu, "'");

  const emDashPattern = new RegExp(`\\s*${EM_DASH}\\s*`, "g");
  s = s.replace(emDashPattern, ` ${EM_DASH} `);

  s = s.replace(/[\s\u00A0]+([:;?!])/gu, `${FINE_NBSP}$1`);
  s = s.replace(/([\p{L}0-9])([:;?!])/gu, `$1${FINE_NBSP}$2`);
  s = s.replace(/([:;?!])(?![\s\u202F\u00A0])(?=\S)/gu, "$1 ");

  s = s.replace(/([.,])(?![\s\u202F\u00A0])(?=[\p{L}])/gu, "$1 ");

  const openGuillemetPattern = new RegExp(`(\\S)(${OPEN_GUILLEMET})`, "g");
  const closeGuillemetPattern = new RegExp(`(${CLOSE_GUILLEMET})(?![\\s\\u202F\\u00A0:;,.?!])(?=\\S)`, "g");
  s = s.replace(openGuillemetPattern, "$1 $2");
  s = s.replace(closeGuillemetPattern, "$1 ");

  s = s.replace(/(\S)([([])/g, "$1 $2");
  s = s.replace(/([)\]])(?![\s\u202F\u00A0:;,.?!])(?=\S)/g, "$1 ");

  const ellipsisPattern = new RegExp(`(\\.{3}|${ELLIPSIS})(?![\\s\\u202F\\u00A0])(?=\\S)`, "g");
  s = s.replace(ellipsisPattern, "$1 ");

  return s;
}
