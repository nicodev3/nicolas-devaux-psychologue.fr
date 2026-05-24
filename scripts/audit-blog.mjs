import fs from 'node:fs';
import path from 'node:path';

const F = '\u202F';
const N = '\u00A0';
const dir = path.join(process.cwd(), 'src/content/blog');
const issues = [];

for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.md'))) {
  const lines = fs.readFileSync(path.join(dir, f), 'utf8').split(/\r?\n/);
  lines.forEach((line, li) => {
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      const prev = i ? line[i - 1] : '';
      const next = i + 1 < line.length ? line[i + 1] : '';
      const ex = () => line.trim().slice(Math.max(0, i - 25), i + 25);

      if (':?!;'.includes(ch) && prev && prev !== F && prev !== N && !/\s/.test(prev)) {
        issues.push({ f, li: li + 1, r: 'fine-nbsp-before', ex: ex() });
      }
      if (':?!;'.includes(ch) && next && next !== ' ' && next !== F && next !== N) {
        issues.push({ f, li: li + 1, r: 'space-after', ex: ex() });
      }
      if ((ch === '(' || ch === '[') && prev && !/\s/.test(prev) && !(ch === '(' && prev === ']')) {
        issues.push({ f, li: li + 1, r: 'space-before-open', ex: ex() });
      }
      if ((ch === ')' || ch === ']') && next && !/\s/.test(next) && !':?!;,.)]'.includes(next)) {
        issues.push({ f, li: li + 1, r: 'space-after-close', ex: ex() });
      }
      if (ch === '«' && prev && !/\s/.test(prev)) issues.push({ f, li: li + 1, r: 'space-before-guillemet', ex: ex() });
      if (ch === '»' && next && !/\s/.test(next) && !':?!;,.)'.includes(next)) {
        issues.push({ f, li: li + 1, r: 'space-after-guillemet', ex: ex() });
      }
      if ((ch === "'" || ch === '\u2019') && prev === ' ') {
        issues.push({ f, li: li + 1, r: 'apostrophe-space-before', ex: ex() });
      }
      if ((ch === '—' || ch === '–') && ((prev && !/\s/.test(prev)) || (next && !/\s/.test(next)))) {
        issues.push({ f, li: li + 1, r: 'dash-spacing', ex: ex() });
      }
    }
  });
}

console.log('Blog issues:', issues.length);
const by = {};
issues.forEach((i) => (by[i.r] = (by[i.r] || 0) + 1));
console.log(by);
issues.slice(0, 40).forEach((i) => console.log(`${i.f}:${i.li} [${i.r}] ${JSON.stringify(i.ex)}`));
