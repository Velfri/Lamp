// ===== Smart Lamp — логіка сайту =====
// 1) двомовність (UA/EN) із запам'ятовуванням вибору
// 2) рендер секцій з data.js
// 3) перевірка наявності .bin + локальна перевірка SHA-256
// 4) живе відображення лампи: справжні ефекти з src/effects.js (див. tools/build-site.mjs)
(() => {
  'use strict';
  const LAMP = window.LAMP || {};
  const T = window.SITE_T || { uk: {}, en: {} };
  const FX_EN = window.FX_EN || {};
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  // Дозволений «безпечний» HTML у перекладах: тільки code/b/i/br
  const safeHtml = (s) => esc(s).replace(/&lt;(\/?)(code|b|i)&gt;/g, '<$1$2>').replace(/&lt;br\s*\/?&gt;/gi, '<br>');

  // ---------- мова ----------
  let lang = 'uk';
  try {
    const saved = localStorage.getItem('lamp-site-lang');
    // Українська — типова мова сайту; англійська лише якщо її обрано вручну
    lang = saved === 'uk' || saved === 'en' ? saved : 'uk';
  } catch (e) { /* приватний режим */ }
  const tr = (k) => (T[lang] && T[lang][k]) || T.uk[k] || k;
  const L = (obj) => (obj && (obj[lang] !== undefined ? obj[lang] : obj.uk)) || '';
  // Маленьке сповіщення внизу екрана
  let toastTimer = null;
  function showToast(msg) {
    let t = $('#toast');
    if (!t) {
      t = document.createElement('div');
      t.id = 'toast';
      t.className = 'toast';
      t.setAttribute('role', 'status');
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), 2600);
  }

  const fmtKB = (n) => (n == null ? '—' : n >= 1048576 ? (n / 1048576).toFixed(2) + ' MB' : Math.round(n / 1024) + ' KB');

  // ---------- 1. Статичні тексти ----------
  function applyLang() {
    document.documentElement.lang = lang;
    $$('[data-i18n]').forEach((el) => {
      const v = tr(el.dataset.i18n);
      // hero-заголовок: остання фраза — градієнтним акцентом
      if (el.dataset.i18n === 'hero.h1') {
        const words = v.split(' ');
        const cut = Math.ceil(words.length / 2);
        el.innerHTML = esc(words.slice(0, cut).join(' ')) + ' <span class="glow">' + esc(words.slice(cut).join(' ')) + '</span>';
      } else el.textContent = v;
    });
    $$('[data-i18n-html]').forEach((el) => { el.innerHTML = safeHtml(tr(el.dataset.i18nHtml)); });
    $$('.lang button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
    // Заголовок і description — теж двома мовами
    if (T[lang] && T[lang]['meta.title']) document.title = T[lang]['meta.title'];
    const md = document.querySelector('meta[name="description"]');
    if (md && T[lang] && T[lang]['meta.desc']) md.setAttribute('content', T[lang]['meta.desc']);
    const ogt = document.querySelector('meta[property="og:title"]');
    if (ogt && T[lang] && T[lang]['meta.title']) ogt.setAttribute('content', T[lang]['meta.title']);
    $('#foot-copy').textContent = '© ' + new Date().getFullYear() + ' · ' + tr('foot.copy');

    renderQuick(); renderFeatures(); renderGallery(); paintFxCount(); renderChangelog(); renderRelease(); renderInstall(); renderSpecs(); renderFaq(); renderApi(); fillFxSelect();
    if (fileState) renderFileStatus();
    if (hashMsg) showHash(hashMsg);
  }

  // ---------- 2. Секції з data.js ----------
  function renderFeatures() {
    $('#feature-cards').innerHTML = (LAMP.features || []).map((f) => `
      <article class="card rise">
        <div class="ico"><svg class="i"><use href="#i-${esc(f.icon)}"/></svg></div>
        <h3>${esc(L(f.title))}</h3>
        <p>${esc(L(f.text))}</p>
      </article>`).join('');
    observeRise();
  }

  // Палітри для крапок у галереї — щоб кожен ефект мав свій колір
  const FX_TINT = ['#ff7a2f', '#41d6a0', '#2f9bff', '#39ff88', '#ffd166', '#ffb454',
    '#ff5ea8', '#e0533c', '#ffe066', '#a0e9ff', '#c77dff', '#7bffb2'];

  function renderQuick() {
    const steps = L(LAMP.quick) || [];
    const box = $('#quick-steps');
    if (!box) return;
    if (!steps.length) { $('#start').hidden = true; return; }
    box.innerHTML = steps.map((s, i) => `
      <li class="q-step">
        <span class="q-num">${i + 1}</span>
        <h3>${esc(s.h)}</h3>
        <p>${esc(s.p)}</p>
      </li>`).join('');
  }

  function renderGallery() {
    // Беремо СПРАВЖНІ ефекти з прошивки (src/effects.js), а не вигадані назви
    if (!FX.ok) { $('#gallery').hidden = true; return; }
    const seen = new Set();
    const fx = FX.EFFECTS.filter((e) => {
      if (!e || !e.id || e.hidden || seen.has(e.id)) return false;
      seen.add(e.id); return true;
    });
    $('#fx-wall').innerHTML = fx.map((e, i) => `
      <button class="fx-chip${e.id === selectedFx ? ' on' : ''}" type="button" data-fx="${esc(e.id)}">
        <span class="fx-dot" style="--dot:${FX_TINT[i % FX_TINT.length]}"></span>
        <span>${esc(fxName(e))}</span>
      </button>`).join('');
    $$('#fx-wall .fx-chip').forEach((b) => {
      b.addEventListener('click', () => {
        selectedFx = b.dataset.fx;
        levelFrom = lampLevel; levelTo = 1; levelAt = performance.now(); fxOn = true;
        $$('#fx-wall .fx-chip').forEach((x) => x.classList.toggle('on', x === b));
        showToast(tr('gallery.toast').replace('{fx}', b.querySelector('span:last-child').textContent));
        const sel = $('#fx-select');
        if (sel && sel.querySelector('option[value="' + b.dataset.fx + '"]')) sel.value = b.dataset.fx;
      });
    });
  }

  function renderChangelog() {
    // Історія береться з реального маніфесту (LAMP.releases), а не вигадується
    const list = (LAMP.releases || []).filter((r) => r && r.version);
    const box = $('#changelog-list');
    if (!box) return;
    if (!list.length) { $('#changelog').hidden = true; return; }
    box.innerHTML = list.map((r) => {
      const d = r.date ? new Date(r.date + 'T12:00:00Z') : null;
      const date = d && !isNaN(d.getTime())
        ? d.toLocaleDateString(lang === 'uk' ? 'uk-UA' : 'en-GB', { year: 'numeric', month: 'long', day: 'numeric' })
        : (r.date || '');
      const notes = L(r.notes) || [];
      return `
      <div class="tl-item">
        <div class="tl-top">
          <span class="tl-ver">v${esc(r.version)}</span>
          <span class="tl-tag">${esc(tr('changelog.firmware'))}</span>
          <span class="tl-date">${esc(date)}</span>
        </div>
        <ul class="tl-list">${notes.map((n) => `<li>${esc(n)}</li>`).join('')}</ul>
      </div>`;
    }).join('');
  }

  // Реальна кількість ефектів у прошивці — щоб не було вигаданих "30+"
  function paintFxCount() {
    const n = FX.ok ? FX.EFFECTS.filter((e) => !e.hidden).length : 0;
    $$('[data-fx-count]').forEach((el) => { el.textContent = n ? String(n) : '30+'; });
  }

  const rel = (LAMP.releases || [])[0] || {};
  function renderRelease() {
    if (!rel.version) return;
    $('#rel-ver').textContent = 'v' + rel.version;
    if (rel.date) {
      const d = new Date(rel.date + 'T12:00:00Z');
      $('#rel-date').textContent = isNaN(d.getTime()) ? rel.date
        : d.toLocaleDateString(lang === 'uk' ? 'uk-UA' : 'en-GB', { year: 'numeric', month: 'long', day: 'numeric' });
    }
    $('#rel-notes').innerHTML = (L(rel.notes) || []).map((n) => `<li>${esc(n)}</li>`).join('');
    $('#file-name').textContent = rel.file || '—';
    $('#m-ver').textContent = 'v' + (LAMP.firmware || rel.version || '');
    $('#badge-ver').textContent = (LAMP.firmware || rel.version || '');
    $('#file-size').textContent = fmtKB(rel.size);
    const h = $('#hash-in');
    h.placeholder = rel.sha256 ? rel.sha256.slice(0, 32) + '…' : 'sha256…';
    $('#btn-dl').disabled = !rel.file || fileState === 'pending' || fileState === 'offline';
    if (fileState) renderFileStatus();
  }

  function renderInstall() {
    const ids = ['usb', 'ota', 'webflash'];
    const tabs = $('#inst-tabs');
    tabs.innerHTML = ids.map((id, i) => `<button type="button" role="tab" data-tab="${id}" aria-selected="${i === 0}">${esc(L(LAMP.install[id].title))}</button>`).join('');
    tabs.querySelectorAll('button').forEach((b) => b.addEventListener('click', () => showTab(b.dataset.tab)));
    showTab('usb');
  }
  function showTab(id) {
    $$('#inst-tabs button').forEach((b) => b.setAttribute('aria-selected', String(b.dataset.tab === id)));
    const steps = L(LAMP.install[id].steps) || [];
    $('#inst-body').innerHTML = `<ol class="steps">${steps.map((s) => `<li>${safeHtml(s)}</li>`).join('')}</ol>`;
  }

  function renderSpecs() {
    $('#spec-list').innerHTML = (LAMP.specs || []).map((s) => `<div class="spec"><b>${esc(L(s.k))}</b><span>${esc(L(s.v))}</span></div>`).join('');
  }

  function renderFaq() {
    $('#faq-list').innerHTML = (LAMP.faq || []).map((f, i) => `
      <details class="faq"${i === 0 ? ' open' : ''}>
        <summary>${esc(L(f.q))}</summary>
        <div class="ans">${safeHtml(L(f.a))}</div>
      </details>`).join('');
  }

  function renderApi() {
    $('#api-list').innerHTML = (LAMP.api || []).map((a) => `
      <div class="api-row">
        <span class="m ${esc(a.m)}">${esc(a.m)}</span>
        <code>${esc(a.p)}</code>
        <span>${esc(L(a.d))}</span>
      </div>`).join('');
  }

  // ---------- 3. Файл оновлення ----------
  let fileState = null; // null (перевіряємо) | 'ready' | 'pending' | 'offline'
  let hashMsg = null;

  function renderFileStatus() {
    const el = $('#file-status');
    el.className = 'status-pill ' + (fileState === 'ready' ? 'ready' : fileState === 'pending' ? 'pending' : 'offline');
    el.textContent = fileState === 'ready' ? tr('update.ready') : fileState === 'pending' ? tr('update.pending') : tr('update.offline');
    el.title = fileState === 'pending' ? tr('update.pending.tip') : '';
    $('#btn-dl').disabled = !rel.file || fileState !== 'ready';
  }

  async function checkFile() {
    if (!rel.file) { fileState = 'pending'; renderFileStatus(); return; }
    if (rel.size && rel.sha256) { fileState = 'ready'; renderFileStatus(); return; } // відомо з маніфесту збірки
    try {
      const r = await fetch(rel.file, { method: 'HEAD', cache: 'no-store' });
      const len = Number(r.headers.get('content-length') || 0);
      fileState = r.ok && len > 0 ? 'ready' : 'pending';
      if (fileState === 'ready') { rel.size = len; $('#file-size').textContent = fmtKB(len); }
    } catch (e) { fileState = 'offline'; }
    renderFileStatus();
  }

  // Завантаження .bin + локальна перевірка SHA-256 (файл нікуди не надсилається)
  async function download() {
    if (!rel.file || !rel.sha256 || !window.crypto || !crypto.subtle) { if (rel.file) window.location.href = rel.file; return; }
    const btn = $('#btn-dl'), label = btn.querySelector('span'), old = label.textContent;
    btn.disabled = true; label.textContent = tr('update.checking');
    try {
      const r = await fetch(rel.file, { cache: 'no-store' });
      if (!r.ok) throw new Error('HTTP ' + r.status);
      const buf = await r.arrayBuffer();
      const digest = Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256', buf)))
        .map((b) => b.toString(16).padStart(2, '0')).join('');
      if (digest !== String(rel.sha256).toLowerCase()) { showHash('bad'); return; }
      showHash('ok');
      const url = URL.createObjectURL(new Blob([buf], { type: 'application/octet-stream' }));
      const a = document.createElement('a');
      a.href = url; a.download = rel.file.split('/').pop();
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 30000);
    } catch (e) {
      window.location.href = rel.file; // без crypto.subtle просто віддаємо файл браузеру
    } finally {
      label.textContent = old; btn.disabled = false;
    }
  }

  function showHash(kind) {
    hashMsg = kind;
    const el = $('#hash-res');
    const map = { ok: ['ok', 'hash.ok'], bad: ['bad', 'hash.bad'], wait: ['wait', 'hash.wait'], offline: ['wait', 'update.offline.p'] };
    const [cls, key] = map[kind] || map.wait;
    el.className = 'res ' + cls;
    el.textContent = tr(key);
  }

  function verifyInput() {
    const v = ($('#hash-in').value || '').trim().toLowerCase().replace(/\s+/g, '');
    if (!v) { hashMsg = null; $('#hash-res').textContent = ''; $('#hash-res').className = 'res'; return; }
    if (!rel.sha256) { showHash('wait'); return; }
    showHash(v === String(rel.sha256).toLowerCase() ? 'ok' : 'bad');
  }

  // ---------- 4. Жива лампа: справжні ефекти лампи на canvas ----------
  // Ефекти — чисті функції часу, що заповнюють leds[]. Портуємо їхнє середовище
  // (CRGB/CHSV/XY/inoise8/…), як у застосунку, і виконуємо код із assets/effects.js.
  const FX = (() => {
    const W = 16, H = 16, N = W * H, P2 = Math.PI * 2;
    const { abs, sin, cos, sqrt, min, max, floor, PI } = Math;
    const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
    class C {
      constructor(r = 0, g = 0, b = 0) { this.r = clamp(r | 0, 0, 255); this.g = clamp(g | 0, 0, 255); this.b = clamp(b | 0, 0, 255); }
      nscale8(s) { this.r = this.r * s / 256 | 0; this.g = this.g * s / 256 | 0; this.b = this.b * s / 256 | 0; return this; }
      fadeToBlackBy(n) { return this.nscale8(255 - n); }
    }
    const CRGB = (r = 0, g, b) => (g === undefined ? new C(r >> 16 & 255, r >> 8 & 255, r & 255) : new C(r, g, b));
    let COLOR = CRGB(255, 116, 32), COLOR2 = CRGB(26, 16, 48), COLOR3 = CRGB(255, 217, 160);
    const leds = Array.from({ length: N }, () => new C());
    const XY = (x, y) => y * W + ((((x | 0) % W) + W) % W);
    let _ms = 0, SEED = 1, SCALE = 1, SUNRISE = 0;
    const millis = () => _ms;
    const map = (v, a, b, c, d) => (v - a) * (d - c) / (b - a) + c;
    const scale8 = (i, s) => i * (1 + s) >> 8;
    const sin8 = (t) => Math.round(sin((t & 255) / 256 * P2) * 127.5 + 127.5);
    const cos8 = (t) => Math.round(cos((t & 255) / 256 * P2) * 127.5 + 127.5);
    const beat8 = (bpm, tb = 0) => ((_ms - tb) * bpm * 256 / 60000) & 255;
    const beatsin8 = (bpm, lo = 0, hi = 255, tb = 0, ph = 0) => lo + scale8(sin8(beat8(bpm, tb) + ph), hi - lo);
    const beatsin16 = (bpm, lo = 0, hi = 65535, tb = 0, ph = 0) => lo + (hi - lo) * (0.5 + 0.5 * sin(((_ms - tb) * bpm / 60000) * P2 + ph / 65536 * P2));
    const random = (a, b) => (b === undefined ? Math.random() * a | 0 : a + (Math.random() * (b - a) | 0));
    const random8 = (a, b) => (a === undefined ? random(256) : random(a, b));
    function hashNoise(x, y, z) {
      let v = (Math.imul(x | 0, 374761393) + Math.imul(y | 0, 668265263) + Math.imul(z | 0, 1442695041) + SEED) | 0;
      v = Math.imul(v ^ (v >>> 13), 1274126177);
      return ((v ^ (v >>> 16)) >>> 0) / 4294967295;
    }
    function inoise8(x, y = 0, z = 0) {
      x /= 256; y /= 256; z /= 256;
      const x0 = floor(x), y0 = floor(y), z0 = floor(z), fx = x - x0, fy = y - y0, fz = z - z0;
      const sx = fx * fx * (3 - 2 * fx), sy = fy * fy * (3 - 2 * fy), sz = fz * fz * (3 - 2 * fz);
      const lerp = (a, b, t) => a + (b - a) * t, h = (i, j, k) => hashNoise(x0 + i, y0 + j, z0 + k);
      return 255 * lerp(lerp(lerp(h(0, 0, 0), h(1, 0, 0), sx), lerp(h(0, 1, 0), h(1, 1, 0), sx), sy),
        lerp(lerp(h(0, 0, 1), h(1, 0, 1), sx), lerp(h(0, 1, 1), h(1, 1, 1), sx), sy), sz);
    }
    function CHSV(hh, s = 255, v = 255) {
      hh &= 255;
      const off = (hh & 31) << 3, third = scale8(off, 85), two = scale8(off, 171);
      let r, g, b;
      if (!(hh & 128)) {
        if (!(hh & 64)) { if (!(hh & 32)) { r = 255 - third; g = third; b = 0; } else { r = 171; g = 85 + third; b = 0; } }
        else if (!(hh & 32)) { r = 171 - two; g = 170 + third; b = 0; } else { r = 0; g = 255 - third; b = third; }
      } else if (!(hh & 64)) { if (!(hh & 32)) { r = 0; g = 171 - two; b = 85 + two; } else { r = third; g = 0; b = 255 - third; } }
      else if (!(hh & 32)) { r = 85 + third; g = 0; b = 171 - third; } else { r = 170 + third; g = 0; b = 85 - third; }
      if (s !== 255) { const d = 255 - s, ds = scale8(d, d), k = 255 - ds; r = scale8(r, k) + ds; g = scale8(g, k) + ds; b = scale8(b, k) + ds; }
      if (v !== 255) { r = scale8(r, v); g = scale8(g, v); b = scale8(b, v); }
      return new C(r, g, b);
    }
    const blend = (a, b, amt) => new C(a.r + (b.r - a.r) * amt / 255 | 0, a.g + (b.g - a.g) * amt / 255 | 0, a.b + (b.b - a.b) * amt / 255 | 0);
    const nblend = (a, b, amt) => Object.assign(a, blend(a, b, amt));
    const fill_solid = (arr, n, c) => { for (let i = 0; i < N; i++) leds[i] = new C(c.r, c.g, c.b); };
    const fill_rainbow = (arr, n, hh, d = 5) => { for (let i = 0; i < N; i++) leds[i] = CHSV(hh + i * d, 255, 255); };
    const fadeToBlackBy = (arr, n, amount) => { leds.forEach((l) => l.fadeToBlackBy(amount === undefined ? n : amount)); };
    const FastLED = { clear() { leds.forEach((l) => { l.r = l.g = l.b = 0; }); }, show() {}, setBrightness() {} };
    const fract = (v) => v - Math.floor(v);
    const smoothstep = (a, b, v) => { const k = clamp((v - a) / (b - a), 0, 1); return k * k * (3 - 2 * k); };
    const wrapDx = (a, b) => ((((a - b) % W) + W * 1.5) % W) - W / 2;
    function pal(k, n = 3) {
      const cols = [COLOR, COLOR2, COLOR3]; k = fract(k) * n; const i = floor(k);
      return blend(cols[i % n], cols[(i + 1) % n], (k - i) * 255);
    }
    function ramp(k, n = 3) {
      const cols = [COLOR, COLOR2, COLOR3]; k = clamp(k, 0, 1) * (n - 1); const i = Math.min(floor(k), n - 2);
      return blend(cols[i], cols[i + 1], (k - i) * 255);
    }
    function addBlob(cx, cy, r, c, w = 1) {
      const R = Math.ceil(r), bx = Math.round(cx), by = Math.round(cy);
      for (let dy = -R; dy <= R; dy++) {
        const y = by + dy; if (y < 0 || y >= H) continue;
        for (let dx = -R; dx <= R; dx++) {
          const x = bx + dx, ddx = wrapDx(x, cx), ddy = y - cy;
          let k = max(0, 1 - sqrt(ddx * ddx + ddy * ddy) / r); k = k * k * (3 - 2 * k) * w;
          if (k > 0) { const i = XY(x, y); leds[i] = blend(leds[i], c, clamp(k * 255, 0, 255)); }
        }
      }
    }
    function streak(x, y, t, tail, dens, spd, salt) {
      if (hashNoise(x, 0, salt) > dens) return 0;
      const v = spd * (0.75 + hashNoise(x, 1, salt) * 0.5), Ln = H + tail * 1.6;
      const head = H + tail * 0.3 - fract(t * v / Ln + hashNoise(x, 2, salt)) * Ln, d = y - head;
      return d < -0.7 ? 0 : d < 0.7 ? 1 : d > tail ? 0 : Math.exp(-d * 2.6 / tail) * (1 - d / tail);
    }
    const WHITE = () => CRGB(255, 255, 255);

    let EFFECTS = [];
    try {
      const env = {
        WIDTH: W, HEIGHT: H, NUM_LEDS: N, PI2: P2, PI, TWO_PI: P2, abs, sin, cos, sqrt, min, max, floor,
        C, CRGB, CHSV, hsv2rgb_rainbow: CHSV, XY, leds, millis, constrain: clamp, map, random, random8, random16: random8,
        scale8, qadd8: (a, b) => min(255, a + b), qsub8: (a, b) => max(0, a - b), sin8, cos8, beat8, beatsin8, beatsin16,
        hashNoise, inoise8, blend, nblend, fadeToBlackBy, fill_solid, fill_rainbow, FastLED, fract, smoothstep, wrapDx,
        pal, ramp, addBlob, WHITE,
        get SCALE() { return SCALE; }, get SEED() { return SEED; }, get SUNRISE() { return SUNRISE; },
        get COLOR() { return COLOR; }, get COLOR2() { return COLOR2; }, get COLOR3() { return COLOR3; },
      };
      const src = window.LAMP_FX_SRC, helpers = window.LAMP_FX_HELPERS || '';
      if (src) EFFECTS = new Function('ENV', 'with (ENV) {\n' + helpers + '\nreturn [' + src + ']\n}')(env) || [];
    } catch (e) { EFFECTS = []; }
    return {
      W, H, N, leds, EFFECTS,
      get ok() { return EFFECTS.length > 0; },
      setTime(ms, seed, scale, sun) { _ms = ms; SEED = seed | 0; SCALE = scale || 1; SUNRISE = sun || 0; },
      setColors(hexes) {
        const to = (h) => CRGB(parseInt(h.slice(1, 3), 16) || 0, parseInt(h.slice(3, 5), 16) || 0, parseInt(h.slice(5, 7), 16) || 0);
        [COLOR, COLOR2, COLOR3] = hexes.map(to);
      },
      clear() { leds.forEach((l) => { l.r = l.g = l.b = 0; }); },
    };
  })();

  const DEF_COLORS = ['#ff7420', '#12081f', '#ffd9a0'];
  // Ефекти, які показуємо у віджеті (видовищні, різні за характером)
  const FEATURED = ['fire', 'aurora', 'ocean', 'matrix', 'fireworks', 'candle', 'rainbow', 'lava', 'lightning', 'twinkle'];
  const fxName = (e) => (lang === 'en' ? ((FX_EN[e.id] && FX_EN[e.id][0]) || e.name) : e.name);
  let selectedFx = 'fire', fxOn = true, lampLevel = 1, levelFrom = 1, levelTo = 1, levelAt = 0;

  function fillFxSelect() {
    const sel = $('#fx-select');
    if (!sel) return;
    const byId = FEATURED.map((id) => FX.EFFECTS.find((e) => e.id === id)).filter(Boolean);
    const items = byId.length ? byId : FX.EFFECTS.filter((e) => !e.hidden).slice(0, 8);
    if (!items.length) { sel.innerHTML = '<option>—</option>'; return; }
    sel.innerHTML = items.map((e) => `<option value="${esc(e.id)}">${esc(fxName(e))}</option>`).join('');
    if (!items.some((e) => e.id === selectedFx)) selectedFx = items[0].id;
    sel.value = selectedFx;
  }

  const P2c = Math.PI * 2;
  const cl = (v) => Math.max(0, Math.min(255, Math.round(v)));
  const rgba = (c, a) => `rgba(${cl(c[0])},${cl(c[1])},${cl(c[2])},${Math.max(0, Math.min(1, a)).toFixed(3)})`;
  function avgColor(frame) {
    if (!frame || !frame.length) return [255, 180, 84];
    let r = 0, g = 0, b = 0, n = 0;
    for (const c of frame) if (c.r + c.g + c.b > 14) { r += c.r; g += c.g; b += c.b; n++; }
    return n ? [r / n, g / n, b / n] : [255, 180, 84];
  }

  function drawLamp(ts) {
    requestAnimationFrame(drawLamp);
    const cv = $('#lamp-canvas'), stage = $('#stage');
    if (!cv || !stage || !stage.clientWidth) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = stage.clientWidth, h = stage.clientHeight;
    if (cv.width !== Math.round(w * dpr) || cv.height !== Math.round(h * dpr)) {
      cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
    }
    const g = cv.getContext('2d');
    const Wd = cv.width, Ht = cv.height;

    // Плавне вмикання/вимикання
    const kk = Math.min(1, (performance.now() - levelAt) / 520);
    lampLevel = levelFrom + (levelTo - levelFrom) * (1 - Math.pow(1 - kk, 3));
    const lv = lampLevel;

    // Кадр ефекту
    const fx = FX.EFFECTS.find((e) => e.id === selectedFx) || FX.EFFECTS[0];
    let frame = null;
    if (fx) {
      try {
        FX.clear();
        const base = DEF_COLORS.slice();
        (fx.defaults || []).forEach((x, i) => { base[i] = x; });
        FX.setColors(base);
        FX.setTime(ts, 1234567, 1, 0);
        fx.draw();
        frame = FX.leds;
      } catch (e) { frame = null; }
    }

    g.clearRect(0, 0, Wd, Ht);
    const cx = Wd * 0.5, top = Ht * 0.05, baseY = Ht * 0.965;
    const shadeTop = top + Ht * 0.13, shadeH = Ht * 0.30, shadeBot = shadeTop + shadeH;
    const rTop = Wd * 0.165, rBot = Wd * 0.315;
    const glowCol = avgColor(frame);

    if (lv > 0.01) {
      // загальне світло на сцені
      const grd = g.createRadialGradient(cx, shadeBot + shadeH * 0.5, 0, cx, shadeBot + shadeH * 0.5, Wd * 0.62);
      grd.addColorStop(0, rgba(glowCol, 0.30 * lv));
      grd.addColorStop(0.5, rgba(glowCol, 0.10 * lv));
      grd.addColorStop(1, rgba(glowCol, 0));
      g.fillStyle = grd;
      g.fillRect(0, 0, Wd, Ht);
    }

    // «Пікселі» ефекту всередині плафона
    if (frame && lv > 0.01) {
      const cols = FX.W, rows = FX.H;
      const boxW = Wd * 0.47, boxH = shadeH * 0.80;
      const x0 = cx - boxW / 2, y0 = shadeTop + shadeH * 0.10;
      const px = boxW / cols, py = boxH / rows;
      g.save();
      g.beginPath();
      g.moveTo(cx - rTop, shadeTop + 2);
      g.lineTo(cx + rTop, shadeTop + 2);
      g.lineTo(cx + rBot - 2, shadeBot - 2);
      g.lineTo(cx - rBot + 2, shadeBot - 2);
      g.closePath();
      g.clip();
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const c = frame[y * cols + x];
          const a = (Math.max(c.r, c.g, c.b) / 255) * lv;
          if (a < 0.03) continue;
          g.fillStyle = `rgba(${cl(c.r)},${cl(c.g)},${cl(c.b)},${(a * 0.9).toFixed(3)})`;
          g.fillRect(x0 + x * px, y0 + (rows - 1 - y) * py, px + 0.7, py + 0.7);
        }
      }
      g.restore();
    }

    // Плафон: скло + обід
    if (lv > 0.01) {
      const sg = g.createLinearGradient(0, shadeTop, 0, shadeBot);
      sg.addColorStop(0, rgba(glowCol, 0.55 * lv));
      sg.addColorStop(0.6, rgba(glowCol, 0.22 * lv));
      sg.addColorStop(1, rgba(glowCol, 0.05 * lv));
      g.beginPath();
      g.moveTo(cx - rTop, shadeTop); g.lineTo(cx + rTop, shadeTop);
      g.lineTo(cx + rBot, shadeBot); g.lineTo(cx - rBot, shadeBot);
      g.closePath();
      g.fillStyle = sg;
      g.shadowColor = rgba(glowCol, 0.75 * lv);
      g.shadowBlur = Wd * 0.18 * lv;
      g.fill();
      g.shadowBlur = 0;
    }
    g.lineWidth = Math.max(1, Wd * 0.0035);
    g.strokeStyle = 'rgba(255, 238, 214, 0.16)';
    g.beginPath(); g.moveTo(cx - rTop, shadeTop); g.lineTo(cx + rTop, shadeTop); g.stroke();
    g.beginPath();
    g.moveTo(cx - 1.5, shadeBot); g.lineTo(cx - 1.5, baseY - Ht * 0.022);
    g.lineTo(cx + 1.5, baseY - Ht * 0.022); g.lineTo(cx + 1.5, shadeBot);
    g.strokeStyle = 'rgba(255, 238, 214, 0.12)';
    g.stroke();
    g.beginPath();
    g.ellipse(cx, baseY - Ht * 0.014, Wd * 0.105, Ht * 0.013, 0, 0, P2c);
    g.strokeStyle = 'rgba(255, 238, 214, 0.10)';
    g.stroke();
  }

  // ---------- 5. Ініціалізація ----------
  function observeRise() {
    if (!('IntersectionObserver' in window)) { $$('.rise').forEach((e) => e.classList.add('in')); return; }
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' });
    $$('.rise:not(.in)').forEach((e) => io.observe(e));
  }

  let started = false;
  function init() {
    if (started) return;
    started = true;
    $$('.lang button').forEach((b) => b.addEventListener('click', () => {
      lang = b.dataset.lang;
      try { localStorage.setItem('lamp-site-lang', lang); } catch (e) {}
      applyLang();
    }));
    applyLang();

    // Мобільне меню
    const burger = $('#burger'), mnav = $('#mnav');
    if (burger && mnav) {
      const closeMnav = () => {
        burger.setAttribute('aria-expanded', 'false');
        mnav.hidden = true;
        document.body.classList.remove('mnav-open');
      };
      burger.addEventListener('click', () => {
        const open = burger.getAttribute('aria-expanded') === 'true';
        burger.setAttribute('aria-expanded', String(!open));
        mnav.hidden = open;
        document.body.classList.toggle('mnav-open', !open);
      });
      mnav.addEventListener('click', (e) => { if (e.target.closest('a')) closeMnav(); });
      document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMnav(); });
      window.addEventListener('resize', () => { if (window.innerWidth > 960) closeMnav(); });
      // закриваємо при кліку поза меню
      document.addEventListener('click', (e) => {
        if (!mnav.hidden && !e.target.closest('#mnav') && !e.target.closest('#burger')) closeMnav();
      });
    }

    $('#btn-dl').addEventListener('click', download);
    $('#hash-in').addEventListener('input', verifyInput);
    $('#fx-select').addEventListener('change', (e) => { selectedFx = e.target.value; });
    $('#fx-power').addEventListener('click', (e) => {
      fxOn = !fxOn;
      levelFrom = lampLevel; levelTo = fxOn ? 1 : 0; levelAt = performance.now();
      e.currentTarget.dataset.on = String(fxOn);
      e.currentTarget.setAttribute('aria-pressed', String(fxOn));
    });

    const nav = $('#nav');
    const onScroll = () => nav.classList.toggle('stuck', window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    checkFile();
    requestAnimationFrame(drawLamp);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
