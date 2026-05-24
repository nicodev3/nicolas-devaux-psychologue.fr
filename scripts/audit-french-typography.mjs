import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.join(process.cwd(), 'src');
const FINE = '\u202F';
const NBSP = '\u00A0';
const files = [];

function walk(dir) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p);
    else if (/\.(md|astro|tsx)$/.test(ent.name)) files.push(p);
  }
}
walk(ROOT);

const issues = [];

function add(file, line, col, rule, excerpt) {
  issues.push({
    file: file.replace(/\\/g, '/').split('/src/')[1],
    line,
    col,
    rule,
    excerpt,
  });
}

for (const file of files) {
  const text = fs.readFileSync(file, 'utf8');
  const lines = text.split(/\r?\n/);
  for (let li = 0; li < lines.length; li++) {
    const line = lines[li];
    if (/^\s*(import |export |const |class=|<script|<\/script|@apply|@layer)/.test(line)) continue;

    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      const prev = i > 0 ? line[i - 1] : '';
      const next = i + 1 < line.length ? line[i + 1] : '';

      if (':?!;'.includes(ch)) {
        if (prev && prev !== FINE && prev !== NBSP && !/\s/.test(prev)) {
          add(file, li + 1, i + 1, 'fine-nbsp-before', line.trim().slice(Math.max(0, i - 25), i + 25));
        }
        if (
          next &&
          next !== ' ' &&
          next !== '\t' &&
          next !== FINE &&
          next !== NBSP &&
          next !== '"' &&
          next !== "'" &&
          next !== '>' &&
          next !== '\n'
        ) {
          add(file, li + 1, i + 1, 'space-after-punct', line.trim().slice(Math.max(0, i - 25), i + 25));
        }
      }

      if ((ch === '.' || ch === ',') && next && !/\s/.test(next) && !':?!;)]>"\''.includes(next)) {
        if (!/\d\.\d/.test(line.slice(Math.max(0, i - 1), i + 2))) {
          if (!/\.(astro|md|tsx|webp|png|jpg|avif|css|js|html|xml|fr|json)/.test(line.slice(i, i + 10))) {
            add(file, li + 1, i + 1, 'space-after-dot-comma', line.trim().slice(Math.max(0, i - 25), i + 25));
          }
        }
      }

      if ((ch === '(' || ch === '[') && prev && !/\s/.test(prev) && prev !== FINE && prev !== NBSP) {
        if (!(ch === '(' && prev === ']') && !(ch === '(' && prev === '=')) {
          add(file, li + 1, i + 1, 'space-before-open-paren', line.trim().slice(Math.max(0, i - 25), i + 25));
        }
      }

      if ((ch === ')' || ch === ']') && next && !/\s/.test(next) && !':?!;.)]>,"\''.includes(next)) {
        if (!(ch === ']' && next === '(')) {
          add(file, li + 1, i + 1, 'space-after-close-paren', line.trim().slice(Math.max(0, i - 25), i + 25));
        }
      }

      if (ch === '«' && prev && !/\s/.test(prev) && prev !== FINE && prev !== NBSP) {
        add(file, li + 1, i + 1, 'space-before-guillemet-ouvrant', line.trim().slice(Math.max(0, i - 25), i + 25));
      }
      if (ch === '»' && next && !/\s/.test(next) && !':?!;.)]"\''.includes(next) && next !== FINE && next !== NBSP) {
        add(file, li + 1, i + 1, 'space-after-guillemet-fermant', line.trim().slice(Math.max(0, i - 25), i + 25));
      }

      if (ch === "'" || ch === '\u2019') {
        if (prev === ' ') add(file, li + 1, i + 1, 'no-space-before-apostrophe', line.trim().slice(Math.max(0, i - 15), i + 15));
        if (next === ' ') add(file, li + 1, i + 1, 'no-space-after-apostrophe', line.trim().slice(Math.max(0, i - 15), i + 15));
      }

      if (ch === '—' || ch === '–') {
        if (prev && !/\s/.test(prev) && prev !== FINE && prev !== NBSP) {
          add(file, li + 1, i + 1, 'space-before-dash', line.trim().slice(Math.max(0, i - 25), i + 25));
        }
        if (next && !/\s/.test(next) && next !== FINE && next !== NBSP) {
          add(file, li + 1, i + 1, 'space-after-dash', line.trim().slice(Math.max(0, i - 25), i + 25));
        }
      }

      if (line.slice(i, i + 3) === '...') {
        const after = line[i + 3];
        if (after && !/\s/.test(after) && !'"\''.includes(after)) {
          add(file, li + 1, i + 1, 'space-after-ellipsis', line.trim().slice(Math.max(0, i - 25), i + 28));
        }
      }
      if (ch === '…' && next && !/\s/.test(next) && !'"\''.includes(next)) {
        add(file, li + 1, i + 1, 'space-after-ellipsis', line.trim().slice(Math.max(0, i - 25), i + 25));
      }
    }
  }
}

const byRule = {};
for (const it of issues) byRule[it.rule] = (byRule[it.rule] || 0) + 1;

console.log('Total issues:', issues.length);
console.log('By rule:', JSON.stringify(byRule, null, 2));

const byFile = {};
for (const it of issues) {
  byFile[it.file] = (byFile[it.file] || 0) + 1;
}
console.log('\nTop files:');
Object.entries(byFile)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 15)
  .forEach(([f, n]) => console.log(`  ${n}\t${f}`));
