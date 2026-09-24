// Prefix root-absolute URLs in built HTML with BASE (GitHub Pages sub-path).
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const base = (process.env.BASE || '').replace(/\/$/, '');
if (!base) process.exit(0);

const walk = (dir) =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') ? [p] : [];
  });

const re = /(\s(?:href|src|action|poster)=")\/(?!\/)/g;
for (const file of walk('dist')) {
  const html = readFileSync(file, 'utf8');
  const out = html.replace(re, (m, attr, offset) => {
    const rest = html.slice(offset + m.length - 1, offset + m.length + base.length + 1);
    return rest.startsWith(base + '/') || rest === base ? m : `${attr}${base}/`;
  });
  writeFileSync(file, out);
}
console.log('base fixed:', base);
