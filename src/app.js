'use strict';
// Інтерфейс: стан, сцени, розклад, вкладки, жести. Рушій (годинник, WebGL, кадр) - у sketch.js, ефекти - в effects.js.

// ---------- стан, збереження ----------
const VERSION = '21';
const curvePower = (c) => (c === 'soft' ? 0.7 : c === 'precise' ? 1.8 : 1);
const SWATCHES = ['#ff3b3b', '#ff7420', '#ffb020', '#ffe066', '#7cf06b', '#16d6a0', '#19c8e8', '#3b82f6', '#8b5cf6', '#c026d3', '#ff4778', '#fff1e0'];
const PALETTES = [['#ff4d2e', '#ffb347', '#7b2ff7'], ['#0b3d91', '#19c8e8', '#e0fbfc'], ['#ff2bd6', '#7c3aed', '#22d3ee'], ['#0f3d2e', '#3ddc84', '#d9f99d'], ['#7a0c0c', '#ff6a00', '#ffd23b'], ['#dbeafe', '#60a5fa', '#a78bfa']];
const ACCENTS = [['#ffb454', '#ffd9a0'], ['#ff7a59', '#ffb5a3'], ['#ff5d8f', '#ffb1c9'], ['#b48cff', '#d8c6ff'], ['#5cb8ff', '#b4dcff'], ['#3ddbb0', '#a2f0da'], ['#a6e35c', '#d3f2a6']];
const mixHex = (a, b, k) => { const A = hexRgb(a), B = hexRgb(b); return '#' + A.map((v, i) => Math.round(v + (B[i] - v) * k).toString(16).padStart(2, '0')).join(''); };
let ui = { lang: detectLang(), accent: -1, addr: 'lamp.local', hintSeen: false };
state.alarm = { on: false, time: '07:00', dur: 20 };
state.sched = []; // правила вмикання/вимикання: { id, act: 'on'|'off', en, time: 'HH:MM', days: [нд..сб] }
const effectOf = (id) => EFFECTS.find((e) => e.id === id) || EFFECTS[0];
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

function saveState() { try { localStorage.setItem(STORE_KEY, JSON.stringify({ ...state, power: lampOn, sim, ui })); } catch (e) {} }
function loadState() {
  try {
    const s = JSON.parse(localStorage.getItem(STORE_KEY) || 'null'); if (!s) return;
    const { power, epochMs, alarm, sim: sv, ui: uv, color, seed, ...rest } = s;
    state = { ...state, ...rest, alarm: { ...state.alarm, ...(alarm || {}) } };
    if (!Array.isArray(state.sched)) state.sched = [];
    if (Array.isArray(state.colors)) state.colors = state.colors.map((c) => (typeof normalizeHex === 'function' ? normalizeHex(c) : c));
    if (color && !rest.colors) state.colors[0] = typeof normalizeHex === 'function' ? normalizeHex(color) : color;
    if (sv) sim = { ...sim, ...sv };
    if (uv) { ui = { ...ui, ...uv }; if (typeof ui.accent !== 'number' || ui.accent >= ACCENTS.length) ui.accent = -1; }
    if (!EFFECTS.some((e) => e.id === state.mode) || state.mode === 'sunrise') state.mode = 'fire';
    if (power === false) { lampOn = false; level = lvFrom = lvTo = 0; }
  } catch (e) {}
}
const getLampState = () => ({ ...state, power: lampOn });
function publish() { saveState(); window.dispatchEvent(new CustomEvent('lampstatechange', { detail: getLampState() })); }
function change(patch, restart = false) {
  Object.assign(state, patch);
  if (patch.speed !== undefined) setSpeed(state.speed);
  if (restart) applyEffect(); else setColors();
  dirty = true; syncControls(); publish();
}
const vib = (n = 8) => { try { navigator.vibrate && navigator.vibrate(n); } catch (e) {} };
function toggleLamp() {
  lampOn = !lampOn; lvFrom = level; lvTo = lampOn ? 1 : 0; lvAt = performance.now(); dirty = true;
  if (lampOn) applyEffect(false);
  syncControls(); publish();
}
function showToast(text) {
  const el = $('toast'); el.textContent = text; el.classList.add('show');
  clearTimeout(showToast.timer); showToast.timer = setTimeout(() => el.classList.remove('show'), 1500);
}
const briToSlider = () => Math.pow(constrain((state.brightness - 50) / 50, 0, 1), 1 / curvePower(state.brightnessCurve)) * 100;
const sliderToBri = (v) => lerp(50, 100, Math.pow(v / 100, curvePower(state.brightnessCurve)));
function showHud(v) {
  const h = $('hud'); h.querySelector('b').textContent = `${v}%`; h.querySelector('i').style.setProperty('--p', `${v}%`); h.classList.add('show');
  clearTimeout(showHud.timer); showHud.timer = setTimeout(() => h.classList.remove('show'), 700);
}

// ---------- HSV, випадкова палітра, акцент ----------
function hexToHsv(hex) {
  const [r, g, b] = hexRgb(hex).map((v) => v / 255), mx = Math.max(r, g, b), d = mx - Math.min(r, g, b); let h = 0;
  if (d) { h = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4; h *= 60; if (h < 0) h += 360; }
  return [h, mx ? d / mx : 0, mx];
}
function hsvToHex(h, s, v) {
  const f = (n) => { const k = (n + h / 60) % 6; return v - v * s * Math.max(0, Math.min(k, 4 - k, 1)); };
  return '#' + [f(5), f(3), f(1)].map((x) => Math.round(x * 255).toString(16).padStart(2, '0')).join('');
}
function randomPalette(darkFirst) { // гармонійна палітра: аналогова, тріада, спліт-комплементарна або комплементарна
  const h = Math.random() * 360, offs = [[0, 28, -28], [0, 120, 240], [0, 150, 210], [0, 180, 24]][Math.floor(Math.random() * 4)];
  const cols = offs.map((o) => hsvToHex((h + o + 360) % 360, 0.62 + Math.random() * 0.33, 0.85 + Math.random() * 0.15));
  if (darkFirst) cols[0] = hsvToHex(h, 0.5 + Math.random() * 0.4, 0.08 + Math.random() * 0.1);
  return cols;
}
function autoAccent() { // колір інтерфейсу береться з найяскравішого кольору лампи
  const eff = getEffect(), list = eff.colors ? state.colors.slice(0, eff.colors) : [];
  let best = null, bs = -1;
  for (const c of list) { const [h, s, v] = hexToHsv(c), sc = v * (0.35 + s); if (v > 0.35 && sc > bs) { bs = sc; best = [h, s]; } }
  if (!best) return ACCENTS[0];
  const sat = constrain(best[1], 0.5, 0.88);
  return [hsvToHex(best[0], sat, 1), hsvToHex(best[0], sat * 0.45, 1)];
}
let accKey = '';
function applyAccent() {
  const a = ui.accent >= 0 ? ACCENTS[ui.accent] : autoAccent(); if (accKey === a[0]) return; accKey = a[0];
  const st = document.documentElement.style;
  st.setProperty('--acc', a[0]); st.setProperty('--acc2', a[1]); st.setProperty('--acc-rgb', hexRgb(a[0]).join(','));
  const bg = [mixHex('#17120e', a[0], 0.12), mixHex('#0a0908', a[0], 0.035)];
  bgRgb = bg.map((h) => hexRgb(h).map((v) => v / 255));
  st.setProperty('--bg', mixHex('#0d0b09', a[0], 0.04));
  document.querySelector('meta[name=theme-color]').content = bg[0]; dirty = true;
}

// ---------- будильник "Світанок" і розклад вмикання ----------
let alarmRun = null, lastAlarmDay = '', lastMinKey = '';
function startAlarm(start, dur, test) {
  alarmRun = { start, dur, test, prev: state.mode, wasOn: lampOn }; SUNRISE = 0;
  if (!lampOn) toggleLamp();
  change({ mode: 'sunrise' }, true); showToast(t('toast.sunrise'));
}
function stopAlarm() {
  if (!alarmRun) return; const r = alarmRun; alarmRun = null;
  if (r.test) { change({ mode: r.prev }, true); if (!r.wasOn) toggleLamp(); }
}
const minKey = (d) => `${d.getFullYear()}-${d.getMonth()}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}`;
function checkSched() { // раз на хвилину: чи є правило на цю хвилину цього дня тижня
  const d = new Date(), key = minKey(d); if (key === lastMinKey) return; lastMinKey = key;
  const hm = `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
  for (const r of state.sched) {
    if (!r.en || !r.days[d.getDay()] || r.time !== hm) continue;
    if (r.act === 'on' && !lampOn) { toggleLamp(); showToast(t('sch.fired.on')); }
    else if (r.act === 'off' && lampOn) { toggleLamp(); showToast(t('sch.fired.off')); }
  }
}
setInterval(() => {
  checkSched();
  if (alarmRun) { SUNRISE = constrain((Date.now() - alarmRun.start) / alarmRun.dur, 0, 1); if (SUNRISE >= 1 && alarmRun.test) stopAlarm(); return; }
  const a = state.alarm; if (!a.on) return;
  const d = new Date(), [h, m] = a.time.split(':').map(Number), end = new Date(d.getFullYear(), d.getMonth(), d.getDate(), h, m).getTime(), dur = a.dur * 60000;
  if (Date.now() >= end - dur && Date.now() < end && lastAlarmDay !== d.toDateString()) { lastAlarmDay = d.toDateString(); startAlarm(end - dur, dur, false); }
}, 250);
const DAY_ORDER = [1, 2, 3, 4, 5, 6, 0];
const newRule = (act) => ({ id: Math.random().toString(36).slice(2, 8), act, en: true, time: act === 'on' ? '07:00' : '23:00', days: [1, 1, 1, 1, 1, 1, 1] });
function renderSched() {
  $('sched-list').innerHTML = state.sched.length ? state.sched.map((r) => `<div class="rule" data-rule="${r.id}" data-en="${r.en ? 1 : 0}">
 <div class="row"><div class="seg" style="width:190px"><button type="button" data-act="on" aria-pressed="${r.act === 'on'}">${t('sch.on')}</button><button type="button" data-act="off" aria-pressed="${r.act === 'off'}">${t('sch.off')}</button></div><label class="toggle"><input type="checkbox" data-ren ${r.en ? 'checked' : ''}><i></i></label></div>
 <input type="time" class="time" value="${r.time}" data-rtime>
 <div class="days">${DAY_ORDER.map((d) => `<button type="button" data-day="${d}" aria-pressed="${!!r.days[d]}">${t('day.' + d)}</button>`).join('')}</div>
 <div class="rule-foot"><button type="button" data-del>${t('common.del')}</button></div></div>`).join('') : `<p class="empty">${t('sch.empty')}</p>`;
}

// ---------- сцени (пресети) ----------
let presets = [], activePreset = 0;
const presetFromState = (name) => { const { mode, colors, speed, scale, brightness, brightnessCurve } = state; return { name, mode, colors: [...colors], speed, scale, brightness, brightnessCurve }; };
function loadPresets() {
  try {
    const p = JSON.parse(localStorage.getItem(PRESET_KEY) || 'null');
    if (p && Array.isArray(p.list)) {
      presets = p.list.filter((x) => EFFECTS.some((e) => e.id === x.mode)).map((x) => ({ ...x, scale: x.scale ?? 1, colors: x.colors || [x.color || '#ff7420', '#12081f', '#ffd9a0'] }));
      activePreset = constrain(p.active | 0, 0, Math.max(presets.length - 1, 0));
    }
  } catch (e) {}
  if (!presets.length) presets = ['fire', 'rainbow', 'ocean'].map((id) => ({ name: fxName(effectOf(id)), mode: id, colors: ['#ff7420', '#12081f', '#ffd9a0'], speed: 1, scale: 1, brightness: 100, brightnessCurve: 'linear' }));
}
const savePresets = () => { try { localStorage.setItem(PRESET_KEY, JSON.stringify({ list: presets, active: activePreset })); } catch (e) {} };
function applyPreset(i) {
  const p = presets[i]; if (!p) return;
  activePreset = i; const { name, ...rest } = p; Object.assign(state, rest, { colors: [...p.colors] });
  applyEffect(); syncControls(); renderPresets(); savePresets(); publish(); showToast(p.name);
}
const stepPreset = (dir) => { if (presets.length > 1) applyPreset((activePreset + dir + presets.length) % presets.length); };
const dots = (cols, n = 3) => cols.slice(0, n).map((c) => `<i style="background:${c}"></i>`).join('');
function renderPresets() {
  const list = $('preset-list'); list.innerHTML = '';
  presets.forEach((p, i) => {
    const eff = effectOf(p.mode), row = document.createElement('div'); row.className = 'preset'; row.setAttribute('aria-current', String(i === activePreset));
    row.innerHTML = `<button type="button" data-preset="${i}"><span class="strip" style="background:${fxThumb(eff)}"></span><span class="txt"><b>${esc(p.name)}</b><small>${fxName(eff)} · ${p.speed.toFixed(1)}× · ${Math.round(constrain((p.brightness - 50) / 50, 0, 1) * 100)}%</small></span><span class="dots">${eff.colors ? dots(p.colors, eff.colors) : ''}</span></button>` +
      (presets.length > 1 ? `<button type="button" class="x" data-del="${i}" aria-label="×">×</button>` : '');
    list.appendChild(row);
  });
  $('cur-name').value = presets[activePreset] ? presets[activePreset].name : '';
  renderDots();
}
function renderDots() { // крапки сцен під лампою на головному екрані
  const box = $('scene-dots'); if (!box) return;
  box.innerHTML = presets.length > 1 ? presets.map((p, i) => `<button type="button" data-dot="${i}" aria-current="${i === activePreset}" aria-label="${esc(p.name)}"></button>`).join('') : '';
}

// ---------- відображення ----------
let slot = 0, hsv = [24, 0.87, 1], fxFilter = 'all';
const FX_CAT = {}; // категорії для швидкого пошуку настрою
[['calm', 'breathe candle gradient noise plasma lava colorloop mono waves twinkle'], ['nature', 'fire flame aurora ocean pacifica sunset sun fireflies rain lightning ripple'], ['party', 'rainbow pride sparkle glitter fireworks police juggle sinelon scanner meteor matrix spiral stripes']]
  .forEach(([c, ids]) => ids.split(' ').forEach((id) => { FX_CAT[id] = c; }));
function renderFx() {
  const q = $('fx-search').value.trim().toLowerCase(), list = $('effect-list'); list.innerHTML = '';
  EFFECTS.filter((e) => !e.hidden && (fxFilter === 'all' || FX_CAT[e.id] === fxFilter) && fxName(e).toLowerCase().includes(q)).forEach((e, idx) => {
    const b = document.createElement('button'); b.type = 'button'; b.className = 'fx'; b.style.setProperty('--i', Math.min(idx, 14)); b.dataset.effect = e.id; b.setAttribute('aria-pressed', String(e.id === state.mode));
    const sw = e.colors ? `<i>${(e.defaults || ['#ff7420', '#d94a8c', '#ffd9a0']).slice(0, e.colors).map((c) => `<s style="background:${c}"></s>`).join('')}</i>` : '';
    b.innerHTML = `<span class="thumb" style="background:${fxThumb(e)}">${sw}</span><span class="cap"><b>${fxName(e)}</b><small>${fxDesc(e)}</small></span>`;
    list.appendChild(b);
  });
  if (!list.children.length) list.innerHTML = `<p class="hint">${t('fx.empty')}</p>`;
}
function renderPalettes() {
  const box = $('palettes'); box.innerHTML = '';
  PALETTES.forEach((cols, i) => { const b = document.createElement('button'); b.type = 'button'; b.dataset.palette = i; b.innerHTML = `<span style="background:linear-gradient(90deg,${cols.join(',')})"></span>${t('pal.' + i)}`; box.appendChild(b); });
}
function renderAccents() {
  $('accents').innerHTML = `<button type="button" class="opt auto" data-accent="-1" aria-pressed="${ui.accent === -1}">${t('acc.auto')}</button>` +
    ACCENTS.map((a, i) => `<button type="button" class="opt" data-accent="${i}" aria-pressed="${ui.accent === i}" aria-label="${a[0]}" style="background:${a[0]}"></button>`).join('');
}
function syncColorUI() {
  const eff = getEffect(), n = eff.colors;
  $('color-none').hidden = n > 0; $('color-ui').hidden = n === 0;
  $('to-mono').hidden = eff.id === 'mono';
  if (!n) $('color-alt').innerHTML = EFFECTS.filter((e) => !e.hidden && e.colors).slice(0, 8).map((e) => `<button type="button" class="alt-i" data-alt="${e.id}"><span class="strip" style="background:${fxThumb(e)}"></span><span>${fxName(e)}</span></button>`).join('');
  if (!n) return;
  slot = Math.min(slot, n - 1);
  const sl = $('slots'); sl.innerHTML = '';
  for (let i = 0; i < n; i++) { const b = document.createElement('button'); b.type = 'button'; b.dataset.slot = i; b.setAttribute('aria-pressed', String(i === slot)); b.innerHTML = `<i style="background:${state.colors[i]}"></i>${fxLabel(eff, i)}`; sl.appendChild(b); }
  const [h, s, v] = hsv, a = (h - 90) * Math.PI / 180;
  $('ring-thumb').style.cssText = `left:${50 + 50 * s * Math.cos(a)}%;top:${50 + 50 * s * Math.sin(a)}%;background:${state.colors[slot]}`;
  $('disc').style.setProperty('--dk', (1 - v).toFixed(3));
  $('val').value = Math.round(v * 100); $('val').style.cssText = `--g1:#000;--g2:${hsvToHex(h, s, 1)}`;
  document.querySelectorAll('#swatches [data-color]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.color === state.colors[slot])));
}
function syncControls() {
  const eff = getEffect(), sv = briToSlider();
  $('brightness').value = sv; $('brightness-value').textContent = `${Math.round(sv)}%`;
  $('effect-speed').value = Math.round(state.speed * 100); $('effect-speed-value').textContent = `${state.speed.toFixed(1)}×`;
  $('effect-scale').value = Math.round(state.scale * 100); $('effect-scale-value').textContent = `${state.scale.toFixed(1)}×`; $('effect-scale').disabled = !!eff.noscale; $('scale-box').style.opacity = eff.noscale ? 0.4 : 1;
  $('lamp-title').textContent = state.lampName; $('now').textContent = lampOn ? fxName(eff) : `${t('now.off')} · ${fxName(eff)}`;
  if ($('lamp-name')) $('lamp-name').value = state.lampName;
  if ($('lamp-id')) $('lamp-id').value = state.lampId;
  if ($('about-foot')) $('about-foot').textContent = t('about.foot', { v: VERSION });
  if ($('conn-addr')) $('conn-addr').value = ui.addr;
  if ($('conn-status') && !$('conn-status').dataset.set) $('conn-status').textContent = t('conn.none');

  if (window.lampInfo) {
    const inf = window.lampInfo;
    if ($('lamp-leds') && inf.config && inf.config.ledCount && document.activeElement !== $('lamp-leds')) {
      $('lamp-leds').value = inf.config.ledCount;
    }
    if ($('wifi-ssid') && inf.wifi) {
      $('wifi-ssid').textContent = inf.wifi.ssid || (inf.wifi.ap ? 'Точка доступу (SoftAP)' : 'Не підключено');
      $('wifi-ip').textContent = inf.wifi.ip || '--';
      $('wifi-rssi').textContent = inf.wifi.rssi ? `${inf.wifi.rssi} dBm` : '--';
    }
    if ($('lamp-time-val') && inf.time) {
      const parts = inf.time.split(' ');
      const timePart = parts[1] ? parts[1].substring(0, 5) : inf.time.substring(0, 5);
      const datePart = parts[0] || '';
      $('lamp-time-val').textContent = timePart;
      if ($('lamp-time-date')) $('lamp-time-date').textContent = datePart;
    }
    if ($('sys-fw') && inf.fw) $('sys-fw').textContent = `v${inf.fw}`;
  }

  $('alarm-on').checked = state.alarm.on; $('alarm-time').value = state.alarm.time; $('alarm-dur').value = state.alarm.dur; $('alarm-dur-val').textContent = `${state.alarm.dur} ${t('sun.min')}`;
  $('cur-sum').innerHTML = `<span class="strip" style="background:${fxThumb(eff)}"></span><span class="txt"><b>${fxName(eff)}</b><small>${state.speed.toFixed(1)}× · ${Math.round(sv)}%</small></span><span class="dots">${eff.colors ? dots(state.colors, eff.colors) : ''}</span>`;
  document.querySelectorAll('[data-curve]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.curve === state.brightnessCurve)));
  document.querySelectorAll('[data-lang]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === LANG)));
  document.querySelectorAll('[data-seg]').forEach((g) => g.querySelectorAll('button').forEach((b) => b.setAttribute('aria-pressed', String(Number(b.dataset.v) === sim[g.dataset.seg]))));
  document.querySelectorAll('[data-sim]').forEach((c) => { c.checked = !!sim[c.dataset.sim]; });
  document.querySelectorAll('[data-simr]').forEach((r) => { r.value = sim[r.dataset.simr]; const el = $(`${r.dataset.simr}-val`); if (el) el.textContent = r.dataset.simr === 'tilt' ? `${sim.tilt}°` : `${sim[r.dataset.simr]}%`; });
  document.querySelectorAll('input[type="range"]:not(.grad)').forEach((r) => r.style.setProperty('--p', `${(r.value - r.min) / (r.max - r.min) * 100}%`));
  document.querySelectorAll('#effect-list [data-effect]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.effect === state.mode)));
  document.querySelectorAll('#accents [data-accent]').forEach((b) => b.setAttribute('aria-pressed', String(Number(b.dataset.accent) === ui.accent)));
  $('power').setAttribute('aria-pressed', String(lampOn));
  $('fx-colrow').hidden = !eff.colors;
  $('fx-colors').innerHTML = eff.colors ? state.colors.slice(0, eff.colors).map((c, i) => `<button type="button" data-cslot="${i}" style="background:${c}" aria-label="${esc(fxLabel(eff, i))}"></button>`).join('') : '';
  applyAccent(); syncColorUI(); renderDots();
}
function applyUI() { // мова
  LANG = ui.lang; applyI18n(); accKey = '';
  renderFx(); renderPresets(); renderPalettes(); renderAccents(); renderSched(); renderInstall(); syncControls(); dirty = true;
  window.dispatchEvent(new Event('langchange'));
}

// ---------- вкладки: панель на весь вільний екран, лампа стає мініатюрою ----------
function openPanel(name) {
  const was = openTab; openTab = name;
  document.querySelectorAll('[data-tab]').forEach((b) => b.setAttribute('aria-selected', String(b.dataset.tab === name)));
  document.querySelectorAll('.page').forEach((p) => { p.hidden = p.dataset.p !== name; });
  $('app').dataset.view = 'panel';
  if (!was && !desk) history.pushState({ panel: 1 }, '');
  $('pages').scrollTop = 0; dirty = true;
  window.dispatchEvent(new CustomEvent('tabchange', { detail: name }));
}
function closePanel(fromPop) {
  if (desk || !openTab) return;
  openTab = null; $('app').dataset.view = 'home';
  document.querySelectorAll('[data-tab]').forEach((b) => b.setAttribute('aria-selected', 'false'));
  if (!fromPop && history.state && history.state.panel) history.back();
  dirty = true;
}
function hideHint() { if (ui.hintSeen) return; ui.hintSeen = true; $('hint').classList.add('gone'); saveState(); }
function chooseEffect(e) { const colors = [...state.colors]; (e.defaults || []).forEach((c, i) => { colors[i] = c; }); slot = 0; hsv = hexToHsv(colors[0]); change({ mode: e.id, colors }, true); renderFx(); }
function randomEffect() {
  const pool = EFFECTS.filter((e) => !e.hidden && e.id !== state.mode), e = pool[Math.floor(Math.random() * pool.length)];
  chooseEffect(e);
  if (e.colors) { const cols = randomPalette(!!(e.defaults && hexToHsv(e.defaults[0])[2] < 0.3)); hsv = hexToHsv(cols[0]); change({ colors: cols }); }
  if (!lampOn) toggleLamp(); showToast(fxName(e));
}

// ---------- встановлення як застосунок ----------
let installEv = null;
addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); installEv = e; renderInstall(); });
function renderInstall() {
  const standalone = matchMedia('(display-mode: standalone)').matches || navigator.standalone;
  $('install-sec').hidden = !!standalone; if (standalone) return;
  const ua = navigator.userAgent, key = /iphone|ipad|ipod/i.test(ua) ? 'inst.ios' : /android/i.test(ua) ? 'inst.and' : 'inst.any';
  $('install-hint').textContent = t(key);
  $('install-btn').hidden = false;
  $('install-btn').textContent = installEv ? t('inst.btn') : t('inst.title');
}

function setupControls() {
  $('fx-search').addEventListener('input', () => renderFx());
  $('fx-filters').addEventListener('click', (ev) => { const b = ev.target.closest('[data-filter]'); if (!b) return; fxFilter = b.dataset.filter; document.querySelectorAll('[data-filter]').forEach((x) => x.setAttribute('aria-pressed', String(x === b))); renderFx(); });
  $('effect-list').addEventListener('click', (ev) => { const b = ev.target.closest('[data-effect]'); if (b) { vib(); chooseEffect(effectOf(b.dataset.effect)); } });
  // колір
  SWATCHES.forEach((c) => { const b = document.createElement('button'); b.type = 'button'; b.dataset.color = c; b.style.background = c; b.setAttribute('aria-label', c); $('swatches').appendChild(b); });
  const setSlot = (hex, keepHsv) => { const colors = [...state.colors]; colors[slot] = hex; if (!keepHsv) hsv = hexToHsv(hex); change({ colors }); };
  $('swatches').addEventListener('click', (ev) => { const b = ev.target.closest('[data-color]'); if (b) setSlot(b.dataset.color); });
  $('palettes').addEventListener('click', (ev) => { const b = ev.target.closest('[data-palette]'); if (!b) return; const colors = [...PALETTES[b.dataset.palette]]; hsv = hexToHsv(colors[slot]); change({ colors }); });
  $('rand-pal').addEventListener('click', () => { const eff = getEffect(), dark = eff.defaults && hexToHsv(eff.defaults[0])[2] < 0.3; const colors = randomPalette(dark); hsv = hexToHsv(colors[slot]); change({ colors }); });
  $('slots').addEventListener('click', (ev) => { const b = ev.target.closest('[data-slot]'); if (!b) return; slot = Number(b.dataset.slot); hsv = hexToHsv(state.colors[slot]); syncControls(); });
  $('val').addEventListener('input', (e) => { hsv[2] = e.target.value / 100; setSlot(hsvToHex(...hsv), true); });
  const disc = $('disc'); let drag = false;
  const discMove = (ev) => { const r = disc.getBoundingClientRect(), dx = ev.clientX - r.left - r.width / 2, dy = ev.clientY - r.top - r.height / 2; hsv[0] = (Math.atan2(dx, -dy) * 180 / Math.PI + 360) % 360; hsv[1] = Math.min(1, Math.hypot(dx, dy) / (r.width / 2)); if (hsv[2] < 0.05) hsv[2] = 1; setSlot(hsvToHex(...hsv), true); };
  disc.addEventListener('pointerdown', (ev) => { drag = true; disc.setPointerCapture(ev.pointerId); discMove(ev); });
  disc.addEventListener('pointermove', (ev) => { if (drag) discMove(ev); });
  ['pointerup', 'pointercancel'].forEach((n) => disc.addEventListener(n, () => { drag = false; }));
  $('to-mono').addEventListener('click', () => { change({ mode: 'mono' }, true); renderFx(); });
  $('color-alt').addEventListener('click', (ev) => { const b = ev.target.closest('[data-alt]'); if (b) { vib(); chooseEffect(effectOf(b.dataset.alt)); } });
  $('fx-colors').addEventListener('click', (ev) => { const b = ev.target.closest('[data-cslot]'); if (!b) return; slot = Number(b.dataset.cslot); hsv = hexToHsv(state.colors[slot]); openPanel('color'); syncControls(); });
  // сцени
  loadPresets();
  $('preset-list').addEventListener('click', (ev) => {
    const pick = ev.target.closest('[data-preset]'), del = ev.target.closest('[data-del]');
    if (del) { presets.splice(Number(del.dataset.del), 1); activePreset = constrain(activePreset, 0, presets.length - 1); savePresets(); renderPresets(); }
    else if (pick) { applyPreset(Number(pick.dataset.preset)); renderFx(); }
  });
  $('scene-dots').addEventListener('click', (ev) => { const b = ev.target.closest('[data-dot]'); if (b) { vib(6); applyPreset(Number(b.dataset.dot)); renderFx(); } });
  const curName = () => $('cur-name').value.trim();
  const saveNew = () => { presets.push(presetFromState(curName() || `${fxName(getEffect())} ${presets.length + 1}`)); activePreset = presets.length - 1; savePresets(); renderPresets(); showToast(t('toast.saved')); };
  $('preset-add').addEventListener('click', saveNew);
  $('preset-update').addEventListener('click', () => { presets[activePreset] = presetFromState(curName() || presets[activePreset].name); savePresets(); renderPresets(); showToast(t('toast.upd')); });
  $('save-quick').addEventListener('click', () => { vib(); $('cur-name').value = ''; saveNew(); });
  // яскравість, швидкість, масштаб
  $('brightness').addEventListener('input', (e) => change({ brightness: sliderToBri(Number(e.target.value)) }));
  $('effect-speed').addEventListener('input', (e) => change({ speed: Number(e.target.value) / 100 }));
  $('effect-scale').addEventListener('input', (e) => change({ scale: Number(e.target.value) / 100 }));
  document.querySelectorAll('[data-curve]').forEach((b) => b.addEventListener('click', () => { const sv = Number($('brightness').value); state.brightnessCurve = b.dataset.curve; change({ brightness: sliderToBri(sv) }); }));
  $('power').addEventListener('click', () => { vib(10); toggleLamp(); });
  document.addEventListener('keydown', (ev) => { // клавіатура на ПК: пробіл = живлення, ↑↓ яскравість, ←→ сцени, Esc закриває вкладку
    if (ev.key === 'Escape') { closePanel(); return; }
    if (ev.target.closest('input,textarea,select') || ev.ctrlKey || ev.metaKey || ev.altKey) return;
    const br = $('brightness');
    if (ev.code === 'Space') { if (ev.target.closest('button')) return; ev.preventDefault(); toggleLamp(); }
    else if (ev.key === 'ArrowUp' || ev.key === 'ArrowDown') { ev.preventDefault(); br.value = constrain(+br.value + (ev.key === 'ArrowUp' ? 5 : -5), 0, 100); br.dispatchEvent(new Event('input')); }
    else if (ev.key === 'ArrowLeft') stepPreset(-1); else if (ev.key === 'ArrowRight') stepPreset(1);
  });
  document.querySelectorAll('[data-lang]').forEach((b) => b.addEventListener('click', () => { ui.lang = b.dataset.lang; applyUI(); publish(); }));
  // розклад
  const ruleOf = (el) => state.sched.find((r) => r.id === el.closest('[data-rule]').dataset.rule);
  $('sch-add-on').addEventListener('click', () => { state.sched.push(newRule('on')); renderSched(); publish(); });
  $('sch-add-off').addEventListener('click', () => { state.sched.push(newRule('off')); renderSched(); publish(); });
  $('sched-list').addEventListener('click', (ev) => {
    const a = ev.target.closest('[data-act]'), d = ev.target.closest('[data-day]'), x = ev.target.closest('[data-del]');
    if (a) { ruleOf(a).act = a.dataset.act; renderSched(); publish(); }
    else if (d) { const r = ruleOf(d), k = Number(d.dataset.day); r.days[k] = r.days[k] ? 0 : 1; d.setAttribute('aria-pressed', String(!!r.days[k])); publish(); }
    else if (x) { const id = x.closest('[data-rule]').dataset.rule; state.sched = state.sched.filter((r) => r.id !== id); renderSched(); publish(); }
  });
  $('sched-list').addEventListener('change', (ev) => { const c = ev.target.closest('[data-ren]'); if (c) { const r = ruleOf(c); r.en = c.checked; c.closest('.rule').dataset.en = r.en ? 1 : 0; publish(); } });
  $('sched-list').addEventListener('input', (ev) => { const i = ev.target.closest('[data-rtime]'); if (i && i.value) { ruleOf(i).time = i.value; publish(); } });
  // світанок
  $('alarm-on').addEventListener('change', (e) => { state.alarm.on = e.target.checked; lastAlarmDay = ''; syncControls(); publish(); });
  $('alarm-time').addEventListener('input', (e) => { state.alarm.time = e.target.value || '07:00'; lastAlarmDay = ''; publish(); });
  $('alarm-dur').addEventListener('input', (e) => { state.alarm.dur = Number(e.target.value); syncControls(); publish(); });
  $('alarm-test').addEventListener('click', () => { if (alarmRun) stopAlarm(); else startAlarm(Date.now(), 12000, true); });
  // опції
  $('accents').addEventListener('click', (ev) => { const b = ev.target.closest('[data-accent]'); if (!b) return; ui.accent = Number(b.dataset.accent); accKey = ''; syncControls(); publish(); });
  $('install-btn').addEventListener('click', async () => {
    if (installEv) {
      installEv.prompt();
      try { await installEv.userChoice; } catch (e) {}
      installEv = null;
      renderInstall();
    } else {
      const ua = navigator.userAgent;
      const msg = /iphone|ipad|ipod/i.test(ua) ? t('inst.ios') : /android/i.test(ua) ? t('inst.and') : t('inst.any');
      showToast(msg);
    }
  });
  const applySim = () => { dprScale = 1; resize(); dirty = true; syncControls(); publish(); };
  document.querySelectorAll('[data-seg] button').forEach((b) => b.addEventListener('click', () => { sim[b.parentElement.dataset.seg] = Number(b.dataset.v); applySim(); }));
  document.querySelectorAll('[data-sim]').forEach((c) => c.addEventListener('change', () => { sim[c.dataset.sim] = c.checked; applySim(); }));
  document.querySelectorAll('[data-simr]').forEach((r) => r.addEventListener('input', () => { sim[r.dataset.simr] = Number(r.value); applySim(); }));
  if ($('lamp-name')) $('lamp-name').addEventListener('change', (e) => change({ lampName: e.target.value.trim() || 'Smart Lamp' }));
  if ($('lamp-id')) $('lamp-id').addEventListener('change', (e) => change({ lampId: e.target.value.trim() || randomId() }, true));
  if ($('lamp-id-rand')) $('lamp-id-rand').addEventListener('click', () => change({ lampId: randomId() }, true));

  if ($('btn-save-leds')) {
    $('btn-save-leds').addEventListener('click', async () => {
      const val = parseInt($('lamp-leds').value, 10);
      if (val >= 5 && val <= 1024) {
        showToast(t('hw.saving') || 'Збереження...');
        try {
          const body = new URLSearchParams();
          body.set('ledCount', String(val));
          const r = await fetch('/api/config', { method: 'POST', body });
          if (r.ok) showToast(t('hw.saved') || 'Збережено! Перезапуск...');
        } catch (e) {
          showToast('Помилка збереження');
        }
      }
    });
  }
  document.querySelectorAll('#seg-quick-leds button').forEach((b) => {
    b.addEventListener('click', () => {
      if ($('lamp-leds')) $('lamp-leds').value = b.dataset.leds;
      $('btn-save-leds')?.click();
    });
  });

  if ($('btn-sync-time')) {
    $('btn-sync-time').addEventListener('click', async () => {
      showToast(t('time.syncing') || 'Синхронізація...');
      try {
        const nowSec = Math.floor(Date.now() / 1000);
        const r = await fetch(`/api/time?t=${nowSec}`, { method: 'POST' });
        if (r.ok) {
          const j = await r.json();
          if (j.time && $('lamp-time-val')) {
            const parts = j.time.split(' ');
            $('lamp-time-val').textContent = parts[1] ? parts[1].substring(0, 5) : j.time.substring(0, 5);
            if ($('lamp-time-date')) $('lamp-time-date').textContent = parts[0] || '';
          }
          if ($('time-sync-status')) $('time-sync-status').textContent = t('time.synced');
          showToast(t('time.synced'));
        }
      } catch (e) {
        showToast('Помилка синхронізації');
      }
    });
  }

  window.addEventListener('lampconnected', () => syncControls());

  if ($('conn-check')) $('conn-check').addEventListener('click', async () => {
    const a = $('conn-addr').value.trim(); ui.addr = a; publish(); const st = $('conn-status'); st.dataset.set = '1'; st.textContent = t('conn.checking');
    const ctl = new AbortController(); setTimeout(() => ctl.abort(), 3000);
    try { await fetch(`http://${a}/`, { mode: 'no-cors', signal: ctl.signal }); st.textContent = t('conn.ok'); } catch (e) { st.textContent = t('conn.fail'); }
  });
  $('data-export').addEventListener('click', () => {
    saveState(); const blob = new Blob([JSON.stringify({ app: 'smart-lamp', state: localStorage.getItem(STORE_KEY), presets: localStorage.getItem(PRESET_KEY) }, null, 1)], { type: 'application/json' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'smart-lamp-settings.json'; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  });
  $('data-import').addEventListener('click', () => $('import-file').click());
  $('import-file').addEventListener('change', async (e) => {
    try { const j = JSON.parse(await e.target.files[0].text()); if (j.app !== 'smart-lamp') throw 0; if (j.state) localStorage.setItem(STORE_KEY, j.state); if (j.presets) localStorage.setItem(PRESET_KEY, j.presets); location.reload(); } catch (err) { showToast('Invalid file'); }
  });
  $('preset-reset').addEventListener('click', () => { localStorage.removeItem(PRESET_KEY); presets = []; loadPresets(); activePreset = 0; renderPresets(); showToast(t('toast.reset')); });
  $('reset-all').addEventListener('click', () => { localStorage.removeItem(PRESET_KEY); localStorage.removeItem(STORE_KEY); location.reload(); });

  // навігація: нижня панель, закриття, свайп униз за "ручку"
  document.querySelectorAll('[data-tab]').forEach((b) => b.addEventListener('click', () => { vib(5); if (openTab === b.dataset.tab && !desk) closePanel(); else openPanel(b.dataset.tab); }));
  $('close').addEventListener('click', () => closePanel());
  addEventListener('popstate', () => closePanel(true));
  const panel = $('panel'), grab = $('grab'); let gd = null;
  grab.addEventListener('pointerdown', (e) => { gd = { y: e.clientY }; grab.setPointerCapture(e.pointerId); panel.style.transition = 'none'; });
  grab.addEventListener('pointermove', (e) => { if (gd) panel.style.transform = `translateY(${Math.max(0, e.clientY - gd.y)}px)`; });
  const gend = (e) => { if (!gd) return; const dy = e.clientY - gd.y; gd = null; panel.style.transition = ''; panel.style.transform = ''; if (dy > 90) closePanel(); };
  grab.addEventListener('pointerup', gend); grab.addEventListener('pointercancel', gend);

  // сцена: свайп вгору/вниз - яскравість, вліво/вправо - сцени, тап по лампі - живлення, утримання - випадковий ефект
  const scene = $('scene'); let start = null, lpTimer = null;
  const gestOK = () => !openTab || desk;
  scene.addEventListener('pointerdown', (e) => {
    start = { x: e.clientX, y: e.clientY, mode: null, v0: Number($('brightness').value), long: false };
    clearTimeout(lpTimer);
    lpTimer = setTimeout(() => { if (start && !start.mode && isLampHit(start.x, start.y)) { start.long = true; vib(22); randomEffect(); hideHint(); } }, 520);
  });
  scene.addEventListener('pointermove', (e) => {
    if (!start) return; const dx = e.clientX - start.x, dy = e.clientY - start.y;
    if (Math.hypot(dx, dy) > 14) clearTimeout(lpTimer);
    if (!gestOK()) return;
    if (!start.mode && sim.swipeBri && Math.abs(dy) > 14 && Math.abs(dy) > Math.abs(dx) * 1.3) { start.mode = 'bri'; scene.setPointerCapture(e.pointerId); hideHint(); }
    if (start.mode === 'bri') { const v = Math.round(constrain(start.v0 - dy / (innerHeight * 0.5) * 100, 0, 100)); change({ brightness: sliderToBri(v) }); showHud(v); }
  });
  scene.addEventListener('pointercancel', () => { clearTimeout(lpTimer); start = null; });
  scene.addEventListener('pointerup', (e) => {
    clearTimeout(lpTimer); if (!start) return; const dx = e.clientX - start.x, dy = e.clientY - start.y, s = start; start = null;
    if (s.mode === 'bri' || s.long) return;
    if (gestOK() && Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.4) { vib(8); stepPreset(dx < 0 ? 1 : -1); hideHint(); }
    else if (Math.hypot(dx, dy) < 12 && isLampHit(e.clientX, e.clientY)) { vib(10); toggleLamp(); hideHint(); }
  });
  window.getLampState = getLampState;
  window.applyLampState = (next) => {
    if (!next) return;
    const { power, colors, ...rest } = next;
    if (Array.isArray(colors)) {
      state.colors = colors.map((c) => (typeof normalizeHex === 'function' ? normalizeHex(c) : (String(c).startsWith('#') ? c : '#' + c)));
    }
    Object.assign(state, rest);
    if (typeof power === 'boolean' && power !== lampOn) toggleLamp();
    applyEffect(false);
    syncControls();
  };
}
function isLampHit(x, y) { return Math.abs(x - lay.x) <= Math.max(lay.sR * 1.15, 30) && Math.abs(y - lay.y) <= Math.max(lay.sR * 3.7 * 0.55, 42); }

loadState(); hsv = hexToHsv(state.colors[0]); setupControls(); applyUI(); applyEffect(false); syncControls(); publish(); resize();
lastMinKey = minKey(new Date());
if (ui.hintSeen) $('hint').classList.add('gone');
if (desk) openPanel('fx');
if (window.ResizeObserver) new ResizeObserver(() => { measureDock(); }).observe($('dock'));
addEventListener('resize', () => { resize(); if (desk && !openTab) openPanel('fx'); });
document.addEventListener('visibilitychange', () => { last = performance.now(); });
requestAnimationFrame((t0) => { last = t0; frame(t0); });
