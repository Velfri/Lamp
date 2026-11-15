'use strict';
// Вкладка "Оновлення": коло, що заповнюється. Працює з лампою через /api/update/*, а без лампи показує демонстрацію (симулятор).
//   GET  /api/update/check   -> { current: "1.0.0", latest: "1.1.0", notes: ["..."], size: 812345 }
//   POST /api/update/start   -> лампа сама качає прошивку з інтернету
//   GET  /api/update/status  -> { phase: "idle|download|write|reboot|error", progress: 0..100, error?: "..." }
//   POST /api/update/upload  -> тіло запиту = файл .bin (прогрес береться з XHR upload.onprogress)
//   POST /api/config         -> autoupdate=1|0
(() => {
  const $ = (id) => document.getElementById(id);
  const KEY = 'smart-lamp-update-v1', CIRC = 2 * Math.PI * 52;
  const wrap = $('upd-ringwrap'), fg = $('upd-fg'), pct = $('upd-pct'), main = $('upd-main');
  wrap.style.setProperty('--c', CIRC.toFixed(2));
  let cfg = { auto: true }; try { cfg = { ...cfg, ...JSON.parse(localStorage.getItem(KEY) || '{}') }; } catch (e) {}
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(cfg)); } catch (e) {} };
  let st = 'idle', info = null, phase = '', prog = 0, err = '', busy = false;
  const live = () => !!(window.lampInfo && window.lampInfo.fw);
  const curVer = () => (live() ? String(window.lampInfo.fw) : (window.__simVer || '1.0.0'));
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  function setProgress(p) {
    prog = Math.max(0, Math.min(100, p));
    fg.style.strokeDashoffset = (CIRC * (1 - prog / 100)).toFixed(2);
    pct.firstChild.nodeValue = String(Math.round(prog));
  }
  function render() {
    wrap.dataset.state = st; wrap.dataset.spin = (st === 'checking' || (st === 'updating' && phase === 'reboot')) ? '1' : '0';
    const tick = $('upd-tick'), arrow = $('upd-ico-arrow');
    tick.style.display = st === 'done' ? '' : 'none'; arrow.style.display = st === 'done' ? 'none' : '';
    const title = $('upd-title'), sub = $('upd-sub'), notes = $('upd-notes');
    notes.hidden = !(st === 'available' && info && info.notes && info.notes.length);
    if (!notes.hidden) notes.innerHTML = info.notes.map((n) => `<li>${String(n).replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]))}</li>`).join('');
    main.hidden = st === 'updating' || st === 'checking';
    $('upd-ver').textContent = `v${curVer()}${live() ? '' : ' · ' + t('conn.sim')}`;
    $('upd-auto').checked = !!cfg.auto;
    $('upd-dot').hidden = st !== 'available';
    const left = { idle: ['upd.idle', 'upd.idle.d'], checking: ['upd.checking', ''], uptodate: ['upd.latest', 'upd.latest.d'], available: ['upd.avail', 'upd.avail.d'], done: ['upd.done', 'upd.done.d'], error: ['upd.err', ''] };
    const v = { v: info ? info.latest : '', c: curVer() };
    if (st === 'updating') {
      title.textContent = t({ download: 'upd.dl', write: 'upd.write', reboot: 'upd.reboot' }[phase] || 'upd.dl');
      sub.textContent = t('upd.keep');
    } else if (st === 'error') { title.textContent = t('upd.err'); sub.textContent = err || ''; }
    else { title.textContent = t(left[st][0], v); sub.textContent = left[st][1] ? t(left[st][1], v) : (!live() && st === 'idle' ? t('upd.sim') : ''); }
    if (st === 'idle' || st === 'uptodate') { main.textContent = t('upd.check'); main.dataset.do = 'check'; }
    else if (st === 'available') { main.textContent = t('upd.start'); main.dataset.do = 'start'; }
    else if (st === 'done') { main.textContent = t('upd.ok'); main.dataset.do = 'reset'; }
    else if (st === 'error') { main.textContent = t('upd.retry'); main.dataset.do = 'check'; }
  }
  const set = (s) => { st = s; render(); };

  async function check(silent) {
    if (busy) return; set('checking'); setProgress(0);
    try {
      if (live()) {
        const r = await fetch('/api/update/check', { cache: 'no-store' }); if (!r.ok) throw new Error('HTTP ' + r.status);
        info = await r.json();
      } else { await sleep(1400); info = { current: curVer(), latest: '1.1.0', notes: ['Нові ефекти', 'Розклад вмикання й вимикання', 'Швидша робота Wi-Fi'] }; }
      const newer = info.latest && info.latest !== info.current && info.latest !== curVer();
      set(newer ? 'available' : 'uptodate');
    } catch (e) { if (silent) set('idle'); else { err = String(e.message || e); set('error'); } }
  }

  async function runLamp() {
    const r = await fetch('/api/update/start', { method: 'POST' }); if (!r.ok) throw new Error('HTTP ' + r.status);
    for (let miss = 0; ;) {
      await sleep(700);
      let j = null;
      try {
        const s = await fetch('/api/update/status', { cache: 'no-store' });
        j = await s.json();
        miss = 0;
      } catch (e) {
        if (++miss > 40) throw new Error(t('upd.err') || 'Лампа не відповідає');
        if (phase === 'write' && miss >= 2) {
          phase = 'reboot';
          set('updating');
          setProgress(100);
        }
        continue;
      }
      if (j.phase === 'error') throw new Error(j.error || 'error');
      if (j.phase && j.phase !== phase) { phase = j.phase; set('updating'); }
      if (j.phase === 'idle' && prog > 0) return;
      setProgress(j.progress || 0);
    }
  }
  async function runDemo() {
    phase = 'download'; set('updating');
    for (let p = 0; p <= 100; p += 1) { setProgress(p * 0.7); await sleep(55 + Math.random() * 40); }
    phase = 'write'; set('updating');
    for (let p = 0; p <= 100; p += 2) { setProgress(70 + p * 0.3); await sleep(45); }
    phase = 'reboot'; set('updating'); await sleep(2200);
  }
  function runUpload(file) {
    return new Promise((resolve, reject) => {
      const x = new XMLHttpRequest(); x.open('POST', '/api/update/upload');
      x.upload.onprogress = (e) => { if (e.lengthComputable) { phase = 'download'; setProgress(e.loaded / e.total * 80); } };
      x.upload.onload = () => { phase = 'write'; set('updating'); setProgress(85); };
      x.onload = () => (x.status < 300 ? resolve() : reject(new Error('HTTP ' + x.status)));
      x.onerror = () => resolve(); // лампа може обірвати зв'язок, перезапускаючись
      phase = 'download'; set('updating'); setProgress(0); x.send(file);
    });
  }
  async function finish(newVer) {
    if (live()) { phase = 'reboot'; set('updating'); setProgress(100); for (let i = 0; i < 40; i++) { await sleep(1000); try { const r = await fetch('/api/status', { cache: 'no-store' }); if (r.ok) { const j = await r.json(); if (j && j.fw) { window.lampInfo = j; break; } } } catch (e) {} } }
    else if (newVer) window.__simVer = newVer;
    setProgress(100); if (info) info.current = info.latest; set('done');
    if (navigator.vibrate) try { navigator.vibrate([30, 40, 60]); } catch (e) {}
  }
  async function start(file) {
    if (busy) return; busy = true; err = ''; phase = 'download'; setProgress(0); set('updating');
    try {
      if (file) await runUpload(file); else if (live()) await runLamp(); else await runDemo();
      await finish(info && info.latest);
    } catch (e) { err = String(e.message || e); set('error'); }
    busy = false;
  }

  main.addEventListener('click', () => {
    const d = main.dataset.do;
    if (d === 'check') check(); else if (d === 'start') start(); else if (d === 'reset') { info = null; setProgress(0); set('idle'); }
  });
  $('upd-auto').addEventListener('change', async (e) => {
    cfg.auto = e.target.checked; save();
    if (live()) { try { await fetch('/api/config', { method: 'POST', body: new URLSearchParams({ autoupdate: cfg.auto ? '1' : '0' }) }); } catch (er) {} }
  });
  $('upd-file-btn').addEventListener('click', () => $('upd-file').click());
  $('upd-file').addEventListener('change', (e) => { const f = e.target.files[0]; e.target.value = ''; if (f) start(f); });
  window.addEventListener('langchange', render);
  window.addEventListener('tabchange', (e) => { if (e.detail === 'upd' && st === 'idle' && live()) check(true); });
  setProgress(0); render();
  // тихо перевіряємо після старту, коли лампа підключена (крапка біля вкладки, якщо є нова версія)
  setTimeout(() => { if (live() && cfg.auto) check(true); }, 2500);
})();
