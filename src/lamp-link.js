// Зв'язок сайту з лампою. Нічого не робить, якщо сайт відкрито не з самої лампи
// (немає /api/status), тому симулятор працює як раніше.
(() => {
  const MIN_INTERVAL_MS = 120;   // оптимізовано для ESP (до ~8 запитів/с при русі слайдера)
  const TIMEOUT_MS = 2500;       // таймаут очікування відповіді лампи
  const RETRY_MS = 600;
  const OFFLINE_AFTER = 3;       // кількість невдач поспіль до переходу в offline

  let linked = false;
  let applying = false;          // true, поки застосовуємо стан від лампи
  let timer = null;
  let sending = false;
  let latest = null;
  let lastSentAt = 0;
  let fails = 0;
  let lastSentAlarm = '';
  let lastSentSched = '';

  const hex = (c) => String(c || '#000000').replace('#', '');
  const setLink = (v) => { document.documentElement.dataset.lamp = v; };

  function toParams(s, isFull = false) {
    const p = new URLSearchParams();
    p.set('power', s.power === false ? '0' : '1');
    p.set('mode', s.mode);
    p.set('brightness', String(Math.round(s.brightness)));
    p.set('speed', String(s.speed));
    p.set('scale', String(s.scale));
    (s.colors || []).slice(0, 3).forEach((c, i) => p.set('c' + i, hex(c)));

    // Не перевантажуємо ESP важким JSON при кожному зрушенні слайдера:
    const alarmStr = s.alarm ? JSON.stringify(s.alarm) : '';
    const schedStr = s.sched ? JSON.stringify(s.sched) : '';
    if (s.alarm && (isFull || alarmStr !== lastSentAlarm)) {
      p.set('alarm', alarmStr);
      lastSentAlarm = alarmStr;
    }
    if (s.sched && (isFull || schedStr !== lastSentSched)) {
      p.set('sched', schedStr);
      lastSentSched = schedStr;
    }
    return p;
  }

  function schedule(delay) {
    if (timer) return;
    timer = setTimeout(() => { timer = null; flush(); }, delay);
  }

  async function flush() {
    if (sending || !latest) return;
    sending = true;
    const state = latest;
    latest = null;
    lastSentAt = Date.now();
    const ctl = new AbortController();
    const killer = setTimeout(() => ctl.abort(), TIMEOUT_MS);
    let ok = false;
    try {
      const r = await fetch('/api/state', { method: 'POST', body: toParams(state), signal: ctl.signal });
      ok = r.ok;
    } catch (e) { ok = false; }
    clearTimeout(killer);
    sending = false;

    if (ok) {
      fails = 0;
      setLink('linked');
    } else {
      if (++fails >= OFFLINE_AFTER) setLink('offline');
      if (!latest) latest = state; // нової зміни немає, тож повторюємо останню
      schedule(RETRY_MS);
      return;
    }
    if (latest) schedule(Math.max(0, MIN_INTERVAL_MS - (Date.now() - lastSentAt)));
  }

  window.addEventListener('lampstatechange', (e) => {
    if (!linked || applying) return;
    latest = e.detail;
    schedule(Math.max(0, MIN_INTERVAL_MS - (Date.now() - lastSentAt)));
  });

  async function probe() {
    try {
      const r = await fetch('/api/status', { cache: 'no-store' });
      if (!r.ok) return false;
      const j = await r.json();
      if (!j || !j.fw) return false;
      linked = true;
      fails = 0;
      setLink('linked');
      window.lampInfo = j;
      window.dispatchEvent(new CustomEvent('lampconnected', { detail: j }));
      try {
        const nowSec = Math.floor(Date.now() / 1000);
        fetch(`/api/time?t=${nowSec}`, { method: 'POST' }).catch(() => {});
      } catch (e) {}
      if (j.state && typeof window.applyLampState === 'function') {
        applying = true;
        try {
          const { power, mode, brightness, speed, scale, colors, alarm, sched } = j.state;
          const normColors = Array.isArray(colors) ? colors.map((c) => (String(c).startsWith('#') ? c : '#' + c)) : colors;
          if (alarm) lastSentAlarm = JSON.stringify(alarm);
          if (sched) lastSentSched = JSON.stringify(sched);
          window.applyLampState({ power, mode, brightness, speed, scale, colors: normColors, ...(alarm ? { alarm } : {}), ...(sched ? { sched } : {}) });
        } finally { applying = false; }
      }
      return true;
    } catch (e) {
      return false;
    }
  }

  // Автоматичне підключення та відновлення зв'язку
  async function autoConnect() {
    const ok = await probe();
    if (!ok && !linked) {
      setTimeout(autoConnect, 3500);
    }
  }

  // Перевірка при старті
  if (document.readyState === 'complete') autoConnect();
  else window.addEventListener('load', autoConnect);

  // Періодичне відновлення, якщо зв'язок втрачено
  setInterval(() => {
    if (document.documentElement.dataset.lamp === 'offline') {
      probe();
    }
  }, 4000);
})();
