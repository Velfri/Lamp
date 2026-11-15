#!/usr/bin/env node
// Оновлює site/releases/index.json записом про щойно зібрану прошивку.
// Викликається з CI: node tools/update-releases.mjs --version 2.1.0 --file releases/x.bin --size 123 --sha256 abc
// Потім tools/build-site.mjs перетворює index.json у manifest.json для лампи.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const siteDir = (() => {
  const env = process.env.SITE_DIR;
  for (const c of [env, 'site', 'docs'].filter(Boolean)) {
    const p = path.isAbsolute(c) ? c : path.join(root, c);
    if (fs.existsSync(path.join(p, 'index.html'))) return p;
  }
  return path.join(root, env || 'site');
})();
const idxPath = path.join(siteDir, 'releases', 'index.json');

// Прапорці бувають зі значенням (--version 2.1.0) і без (--notes-from-data)
const args = {};
const argv = process.argv.slice(2);
for (let i = 0; i < argv.length; i++) {
  if (!argv[i].startsWith('--')) continue;
  const k = argv[i].replace(/^--/, '');
  const next = argv[i + 1];
  if (next === undefined || next.startsWith('--')) { args[k] = true; }
  else { args[k] = next; i++; }
}

if (!args.version || !args.file) {
  console.error('usage: update-releases.mjs --version X --file releases/x.bin [--size N] [--sha256 HEX] [--notes file.md]');
  process.exit(1);
}

const idx = fs.existsSync(idxPath)
  ? JSON.parse(fs.readFileSync(idxPath, 'utf8'))
  : { base: 'https://velfri.github.io/Lamp/', board: 'esp32-c3', releases: [] };

idx.base ||= 'https://velfri.github.io/Lamp/';
idx.board ||= 'esp32-c3';
idx.releases ||= [];

// Нотатки: якщо передано файл — беремо його вміст, інакше лишаємо попередні або беремо з site/assets/data.js
const entry = {
  version: String(args.version),
  date: new Date().toISOString().slice(0, 10),
  file: args.file,
  size: args.size ? Number(args.size) : null,
  sha256: args.sha256 ? String(args.sha256).toLowerCase() : null,
};

// --notes-from-data: нотатки беремо з site/assets/data.js (те, що бачить користувач)
if (args['notes-from-data']) {
  const candidates = ['site/assets/data.js', 'docs/assets/data.js'];
  const dataPath = candidates.map((c) => path.join(root, c)).find((p) => fs.existsSync(p));
  if (dataPath) {
    const src = fs.readFileSync(dataPath, 'utf8');
    const block = src.indexOf('releases: [');
    const notesAt = block >= 0 ? src.indexOf('notes:', block) : -1;
    if (notesAt > 0) {
      const ukAt = src.indexOf('uk: [', notesAt);
      const enAt = src.indexOf('en: [', notesAt);
      const grab = (at) => {
        if (at < 0) return [];
        const end = src.indexOf(']', at);
        const body = src.slice(at + 'uk: ['.length, end); // 'uk: [' і 'en: [' — однакова довжина
        return [...body.matchAll(/'([^']*)'/g)].map((m) => m[1]);
      };
      const uk = grab(ukAt), en = grab(enAt);
      if (uk.length || en.length) entry.notes = { uk, en };
    }
  }
}

if (entry.notes) {
  // нотатки вже взяті з data.js
} else if (args.notes && fs.existsSync(path.join(root, args.notes))) {
  const md = fs.readFileSync(path.join(root, args.notes), 'utf8');
  const lines = md.split('\n').map((l) => l.replace(/^[-*]\s*/, '').trim()).filter(Boolean);
  entry.notes = { uk: lines, en: lines };
} else {
  const prev = idx.releases.find((r) => r.version === entry.version);
  if (prev && prev.notes) entry.notes = prev.notes;
}

// Додаємо/оновлюємо запис і сортуємо: найновіша версія першою
const others = idx.releases.filter((r) => r.version !== entry.version);
others.push(entry);
others.sort((a, b) => {
  const pa = String(a.version).split('.').map(Number);
  const pb = String(b.version).split('.').map(Number);
  for (let i = 0; i < 3; i++) if ((pb[i] || 0) !== (pa[i] || 0)) return (pb[i] || 0) - (pa[i] || 0);
  return 0;
});
idx.releases = others;

fs.mkdirSync(path.dirname(idxPath), { recursive: true });
fs.writeFileSync(idxPath, JSON.stringify(idx, null, 2) + '\n');
console.log(`releases/index.json: ${entry.version} (${entry.size} B, sha256 ${entry.sha256 || '—'})`);
