import fs from "fs";
import path from "path";

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name.endsWith(".astro")) out.push(p);
  }
  return out;
}

const files = [...walk("src/pages"), ...walk("src/components")];
let changedFiles = 0;
let replacements = 0;

// Astro collapses whitespace between a text node and a following element when
// they are separated only by newline/indentation → "page<a" becomes "pageMon…".
const re = /([\p{L}\p{N}»)\]}])(\s*\n\s*)(<a\b)/gu;

for (const file of files) {
  const src = fs.readFileSync(file, "utf8");
  let count = 0;
  const next = src.replace(re, (m, before, ws, aTag) => {
    if (ws.includes('{" "}') || ws.includes("{` `}")) return m;
    count++;
    return `${before}{" "}${aTag}`;
  });
  if (count > 0) {
    fs.writeFileSync(file, next);
    changedFiles++;
    replacements += count;
    console.log(`${file}: ${count}`);
  }
}

console.log(`Done: ${changedFiles} files, ${replacements} fixes`);
