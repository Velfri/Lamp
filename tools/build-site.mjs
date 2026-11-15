#!/usr/bin/env node
// ===== Збірка сайту для GitHub Pages =====
// Що робить:
//   1) src/effects.js + src/fastled.js -> site/assets/effects.js (window.LAMP_FX_SRC, window.FX_EN)
//      Сайт показує ті самі ефекти, що й лампа, — один код, без копій.
//   2) site/releases/index.json -> site/releases/manifest.json
//      (зливає інформацію про зібрані прошивки; формат: див. нижче)
//   3) перевіряє, що всі локальні посилання з index.html існують
//
// Запуск: node tools/build-site.mjs
// Нічого не завантажує з інтернету; для роботи потрібен лише Node (без npm-пакетів).

import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';
import crypto from 'node:crypto';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const site = path.join(root, 'site');
const read = (p) => fs.readFileSync(p, 'utf8');
const write = (p, s) => { fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, s); };
const log = (...a) => console.log('[site]', ...a);

// ---------- 1. Ефекти ----------
function buildEffects() {
  const fx = read(path.join(root, 'src', 'effects.js'));

  // FX_EN: англійські назви ефектів (лежать в i18n.js)
  const i18n = read(path.join(root, 'src', 'i18n.js'));
  const start = i18n.indexOf('const FX_EN = {');
  if (start < 0) throw new Error('FX_EN не знайдено в src/i18n.js');
  const end = i18n.indexOf('\n};', start);
  const fxEnBody = i18n.slice(start + 'const FX_EN = {'.length, end);

  // Допоміжні функції ефектів (streak та подібні) виділяємо окремо, щоб сайт
  // виконував той самий код, що й застосунок — без ручних копій.
  const helperMatch = fx.match(/^function (streak|helperFx\w*)\([\s\S]*?^}\s*$/gm) || [];
  const helpers = helperMatch.join('\n');

  const src = fx
    .replace(/^\/\/ ===== ЕФЕКТИ =====[\s\S]*?^const EFFECTS = \[\s*$/m, '') // шапка + початок масиву
    .replace(/^function (?:streak|helperFx\w*)\([\s\S]*?^}\s*$/gm, '')       // допоміжні функції -> окремо
    .replace(/^let SUNRISE[^\n]*\n?/m, '')                                    // змінна середовища
    .replace(/\]\s*;\s*$/, '');                                               // закриваюча дужка масиву

  const out = `/* ЗГЕНЕРОВАНО tools/build-site.mjs — не редагуйте вручну.
   Джерело: src/effects.js (ефекти) та src/i18n.js (FX_EN).
   Сайт виконує цей код у власному середовищі (assets/app.js), тому ефекти
   на сторінці — ті самі, що в застосунку лампи. */
window.LAMP_FX_HELPERS = ${JSON.stringify(helpers.trim())};
window.LAMP_FX_SRC = ${JSON.stringify(src.trim())};
window.FX_EN = {${fxEnBody}};
`;

  // Перевірка: код має парситись і давати масив ефектів
  const factory = new Function('ENV', 'with (ENV) {\n' + helpers + '\nreturn [' + src.trim() + ']\n}');
  const probe = {
    PI2: Math.PI * 2, PI: Math.PI, abs: Math.abs, sin: Math.sin, cos: Math.cos, sqrt: Math.sqrt,
    min: Math.min, max: Math.max, floor: Math.floor, WIDTH: 16, HEIGHT: 16, NUM_LEDS: 256,
    leds: Array.from({ length: 256 }, () => ({ r: 0, g: 0, b: 0 })),
    C: function (r, g, b) { this.r = r; this.g = g; this.b = b; },
  };
  let list;
  try { list = factory(probe); } catch (e) {
    // Другий прохід: дозволяємо невідомі імена як заглушки, щоб лише перевірити синтаксис
    new Function('ENV', 'with (ENV) {\n' + helpers + '\nreturn [' + src.trim() + ']\n}');
    throw new Error('Не вдалося згенерувати ефекти: ' + e.message);
  }
  if (!Array.isArray(list) || !list.length) throw new Error('Ефекти не розпізнані');

  write(path.join(site, 'assets', 'effects.js'), out);
  log(`ефекти: ${list.length} шт. -> site/assets/effects.js`);
  return list.map((e) => e && e.id).filter(Boolean);
}

// ---------- 2. Маніфест оновлень ----------
function buildManifest() {
  const idxPath = path.join(site, 'releases', 'index.json');
  if (!fs.existsSync(idxPath)) {
    log('releases/index.json відсутній — маніфест не оновлено');
    return null;
  }
  const idx = JSON.parse(read(idxPath));
  const manifest = {
    schema: 1,
    // Лампа перевіряє цей файл через HTTPS, тому URL має бути абсолютним
    base: idx.base || 'https://velfri.github.io/Lamp/',
    board: idx.board || 'esp32-c3',
    updated: new Date().toISOString(),
    releases: (idx.releases || []).map((r) => ({
      version: r.version,
      date: r.date,
      file: r.file,
      url: (idx.base || 'https://velfri.github.io/Lamp/') + r.file,
      size: r.size ?? null,
      sha256: r.sha256 ?? null,
      notes: r.notes || { uk: [], en: [] },
    })),
  };
  write(path.join(site, 'releases', 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
  log(`маніфест: ${manifest.releases.length} версія(і) -> site/releases/manifest.json`);
  syncDataReleases(manifest);
  return manifest;
}

// Синхронізуємо site/assets/data.js із зібраними версіями, щоб сайт показував
// кнопку завантаження, розмір і SHA-256 одразу після збірки.
function syncDataReleases(manifest) {
  const p = path.join(site, 'assets', 'data.js');
  if (!manifest || !manifest.releases.length || !fs.existsSync(p)) return;
  let s = read(p);
  const first = manifest.releases[0];
  s = s.replace(/(\bfirmware:\s*')[^']*(')/, `$1${first.version}$2`);
  // Перший запис у releases[]: version/date/file/size/sha256
  s = s.replace(/(releases:\s*\[\s*\{\s*\n\s*version:\s*')[^']*(')/, `$1${first.version}$2`);
  s = s.replace(/(releases:\s*\[\s*\{\s*\n(?:[^\n]*\n){0,3}?\s*date:\s*')[^']*(')/, `$1${first.date}$2`);
  s = s.replace(/(releases:\s*\[\s*\{\s*\n(?:[^\n]*\n){0,4}?\s*file:\s*')[^']*(')/, `$1${first.file}$2`);
  s = s.replace(/(releases:\s*\[\s*\{\s*\n(?:[^\n]*\n){0,5}?\s*size:\s*)[^,\n]*/m, `$1${first.size == null ? 'null' : first.size}`);
  s = s.replace(/(releases:\s*\[\s*\{\s*\n(?:[^\n]*\n){0,6}?\s*sha256:\s*)[^,\n]*/m, `$1${first.sha256 ? `'${first.sha256}'` : 'null'}`);
  write(p, s);
  log(`data.js: версія ${first.version}, ${first.size || '?'} B`);
}

// ---------- 3. Перевірка локальних посилань ----------
function checkLinks() {
  const html = read(path.join(site, 'index.html'));
  const refs = new Set();
  for (const m of html.matchAll(/(?:src|href)="([^"#:]+)"/g)) refs.add(m[1]);
  const manifest = ['releases/manifest.json'];
  const missing = [...refs, ...manifest].filter((r) => r && !r.startsWith('http') && !fs.existsSync(path.join(site, r)));
  if (missing.length) throw new Error('Відсутні файли, на які посилається index.html: ' + missing.join(', '));
  log(`посилання: ${refs.size + manifest.length} локальних — усі на місці`);
}

buildEffects();
buildManifest();
checkLinks();
log('готово');
