import fs from 'node:fs';
import path from 'node:path';
import { applyFrenchTypography } from '../src/utils/frenchTypography.js';

const roots = [
  path.join(process.cwd(), 'src/pages'),
  path.join(process.cwd(), 'src/components'),
];

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p, out);
    else if (ent.name.endsWith('.astro')) out.push(p);
  }
  return out;
}

const h3Re = /<h3(\s+[^>]*)>([^<]+)<\/h3>/g;
let files = 0;
let headings = 0;

for (const root of roots) {
  for (const file of walk(root)) {
    if (file.endsWith('TypoHeading.astro')) continue;
    let content = fs.readFileSync(file, 'utf8');
    const original = content;

    content = content.replace(h3Re, (match, attrs, text) => {
      const trimmed = text.trim();
      // Interpolation Astro/JS ({item.title}, etc.) : ne pas traiter comme du texte.
      if (trimmed.startsWith('{') && trimmed.endsWith('}')) return match;
      const formatted = applyFrenchTypography(text);
      if (formatted === text) return match;
      headings++;
      return `<h3${attrs}>${formatted}</h3>`;
    });

    if (content !== original) {
      fs.writeFileSync(file, content);
      files++;
      console.log(path.relative(process.cwd(), file));
    }
  }
}

console.log(`Updated ${headings} headings in ${files} files.`);
