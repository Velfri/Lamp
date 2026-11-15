/* === i18n.js === */
// ===== Переклади інтерфейсу. Щоб додати мову, скопіюйте блок "en" і додайте кнопку в index.html (data-lang) =====
const I18N = {
  uk: {
    'tab.fx': 'Ефекти', 'tab.color': 'Кольори', 'tab.saved': 'Збережені', 'tab.sun': 'Світанок', 'tab.set': 'Опції',
    'title.fx': 'Ефекти', 'title.color': 'Кольори', 'title.saved': 'Збережені', 'title.sun': 'Світанок', 'title.set': 'Налаштування',
    'common.back': 'Назад', 'now.off': 'Вимкнено',
    'fx.speed': 'Швидкість', 'cat.all': 'Усі', 'cat.calm': 'Спокій', 'cat.nature': 'Природа', 'cat.party': 'Енергія', 'conn.sim': 'Симулятор', 'qa.save': 'Зберегти як сцену', 'qa.shuffle': 'Випадковий ефект', 'qa.prev': 'Попередня сцена', 'qa.next': 'Наступна сцена', 'alt.title': 'Спробуйте з вашими кольорами', 'fx.scale': 'Масштаб', 'fx.search': 'Пошук ефекту', 'fx.all': 'Усі', 'fx.own': 'Свої кольори', 'fx.auto': 'Власна палітра', 'fx.empty': 'Нічого не знайдено',
    'tag.auto': 'авто', 'tag.1': '1 колір', 'tag.n': '{n} кольори',
    'col.none': 'Цей ефект має власну палітру.',
    'col.mono': 'Суцільний колір', 'col.rand': 'Випадкова палітра', 'col.hue': 'Відтінок', 'col.sat': 'Насиченість', 'col.val': 'Яскравість кольору',
    'col.std': 'Стандартні кольори', 'col.sets': 'Набори кольорів', 'col.n': 'Колір {n}',
    'pal.0': 'Захід', 'pal.1': 'Океан', 'pal.2': 'Неон', 'pal.3': 'Ліс', 'pal.4': 'Полум’я', 'pal.5': 'Льодовик',
    'saved.cur': 'Поточні налаштування', 'saved.name': 'Назва', 'saved.add': 'Зберегти як нове', 'saved.upd': 'Оновити активне', 'saved.list': 'Збережені',
    'saved.hint': 'Свайп вліво чи вправо по лампі перемикає збережені налаштування.',
    'toast.saved': 'Збережено', 'toast.upd': 'Оновлено', 'toast.reset': 'Скинуто', 'toast.sunrise': 'Світанок',
    'sun.alarm': 'Будильник', 'sun.dur': 'Тривалість', 'sun.min': 'хв', 'sun.test': 'Показати світанок (12 с)',
    'sun.hint': 'Лампа поступово розгорається теплим світлом і сягає повної яскравості до вказаного часу. Зараз це працює, поки сторінка відкрита; на справжній лампі розклад виконуватиме прошивка.',
    'set.lamp': 'Лампа', 'set.lang': 'Мова', 'set.bri': 'Яскравість', 'set.sim': 'Симуляція', 'set.look': 'Вигляд', 'set.conn': 'Підключення', 'set.data': 'Дані', 'set.about': 'Про застосунок',
    'lamp.name': 'Назва лампи', 'lamp.id': 'ID лампи', 'lamp.rand': 'Випадковий',
    'lamp.hint': 'Ефекти рахуються від часу й цього ID: однакові ID дають однакову картинку на різних лампах.',
    'bri.soft': 'М’яка', 'bri.lin': 'Лінійна', 'bri.prec': 'Точна', 'bri.hint': 'З яким характером повзунок яскравості змінює світло.',
    'sim.fps': 'Ліміт FPS', 'sim.max': 'Макс', 'sim.q': 'Якість рендера', 'q.low': 'Низька', 'q.mid': 'Серед.', 'q.high': 'Висока',
    'sim.glow': 'Свічення фону', 'sim.glow.d': 'Світло за лампою', 'sim.tilt': 'Нахил лампи', 'sim.tilt.d': 'Кут огляду зверху на головному екрані',
    'sim.smooth': 'Плавна анімація', 'sim.smooth.d': 'Згладжує кроки ефекту', 'sim.auto': 'Авто-якість', 'sim.auto.d': 'Знижує роздільність при гальмуванні', 'sim.fpsshow': 'Показувати FPS',
    'look.style': 'Стиль', 'look.accent': 'Колір акценту', 'st.minimal': 'Мінімалізм', 'st.gradient': 'Градієнт', 'st.midnight': 'Північ', 'st.sunset': 'Захід',
    'conn.addr': 'Адреса лампи', 'conn.check': 'Перевірити', 'conn.none': 'Не підключено (симулятор)', 'conn.checking': 'Перевірка…', 'conn.ok': 'Лампа відповіла',
    'conn.fail': 'Немає відповіді. З HTTPS-сторінки браузер може блокувати запити до лампи: відкрийте сторінку з самої лампи.',
    'conn.hint': 'Підключення до справжньої лампи з’явиться разом із прошивкою.',
    'data.export': 'Експорт налаштувань', 'data.import': 'Імпорт налаштувань', 'data.resetp': 'Скинути збережені', 'data.resetall': 'Скинути все',
    'data.hint': 'Налаштування зберігаються лише в цьому браузері.',
    'about.foot': 'Smart Lamp v{v} · ID: {id}', 'sim.size': 'Розмір лампи', 'sim.size.d': 'Розмір на головному екрані', 'gest.bri': 'Яскравість свайпом', 'gest.bri.d': 'Провести вгору чи вниз по екрану', 'look.apply': 'Застосувати', 'toast.applied': 'Застосовано',
  },
  en: {
    'tab.fx': 'Effects', 'tab.color': 'Colors', 'tab.saved': 'Saved', 'tab.sun': 'Sunrise', 'tab.set': 'Options',
    'title.fx': 'Effects', 'title.color': 'Colors', 'title.saved': 'Saved', 'title.sun': 'Sunrise', 'title.set': 'Settings',
    'common.back': 'Back', 'now.off': 'Off',
    'fx.speed': 'Speed', 'cat.all': 'All', 'cat.calm': 'Calm', 'cat.nature': 'Nature', 'cat.party': 'Energy', 'conn.sim': 'Simulator', 'qa.save': 'Save as scene', 'qa.shuffle': 'Random effect', 'qa.prev': 'Previous scene', 'qa.next': 'Next scene', 'alt.title': 'Try it with your colors', 'fx.scale': 'Scale', 'fx.search': 'Search effects', 'fx.all': 'All', 'fx.own': 'Own colors', 'fx.auto': 'Built-in palette', 'fx.empty': 'Nothing found',
    'tag.auto': 'auto', 'tag.1': '1 color', 'tag.n': '{n} colors',
    'col.none': 'This effect has its own palette.',
    'col.mono': 'Solid color', 'col.rand': 'Random palette', 'col.hue': 'Hue', 'col.sat': 'Saturation', 'col.val': 'Color brightness',
    'col.std': 'Standard colors', 'col.sets': 'Color sets', 'col.n': 'Color {n}',
    'pal.0': 'Sunset', 'pal.1': 'Ocean', 'pal.2': 'Neon', 'pal.3': 'Forest', 'pal.4': 'Flame', 'pal.5': 'Glacier',
    'saved.cur': 'Current settings', 'saved.name': 'Name', 'saved.add': 'Save as new', 'saved.upd': 'Update active', 'saved.list': 'Saved',
    'saved.hint': 'Swipe left or right on the lamp to switch between saved settings.',
    'toast.saved': 'Saved', 'toast.upd': 'Updated', 'toast.reset': 'Reset', 'toast.sunrise': 'Sunrise',
    'sun.alarm': 'Alarm', 'sun.dur': 'Duration', 'sun.min': 'min', 'sun.test': 'Preview sunrise (12 s)',
    'sun.hint': 'The lamp gradually brightens with warm light and reaches full brightness at the set time. For now this works while the page is open; on a real lamp the firmware will run the schedule.',
    'set.lamp': 'Lamp', 'set.lang': 'Language', 'set.bri': 'Brightness', 'set.sim': 'Simulation', 'set.look': 'Appearance', 'set.conn': 'Connection', 'set.data': 'Data', 'set.about': 'About',
    'lamp.name': 'Lamp name', 'lamp.id': 'Lamp ID', 'lamp.rand': 'Random',
    'lamp.hint': 'Effects are computed from time and this ID: lamps with the same ID show the same picture.',
    'bri.soft': 'Soft', 'bri.lin': 'Linear', 'bri.prec': 'Precise', 'bri.hint': 'How the brightness slider maps to the light.',
    'sim.fps': 'FPS limit', 'sim.max': 'Max', 'sim.q': 'Render quality', 'q.low': 'Low', 'q.mid': 'Mid', 'q.high': 'High',
    'sim.glow': 'Background glow', 'sim.glow.d': 'Light behind the lamp', 'sim.tilt': 'Lamp tilt', 'sim.tilt.d': 'View angle from above on the home screen',
    'sim.smooth': 'Smooth animation', 'sim.smooth.d': 'Smooths effect steps', 'sim.auto': 'Auto quality', 'sim.auto.d': 'Lowers resolution when slow', 'sim.fpsshow': 'Show FPS',
    'look.style': 'Style', 'look.accent': 'Accent color', 'st.minimal': 'Minimal', 'st.gradient': 'Gradient', 'st.midnight': 'Midnight', 'st.sunset': 'Sunset',
    'conn.addr': 'Lamp address', 'conn.check': 'Check', 'conn.none': 'Not connected (simulator)', 'conn.checking': 'Checking…', 'conn.ok': 'Lamp responded',
    'conn.fail': 'No response. A browser may block requests to the lamp from an HTTPS page: open the page from the lamp itself.',
    'conn.hint': 'Connecting to a real lamp will arrive together with the firmware.',
    'data.export': 'Export settings', 'data.import': 'Import settings', 'data.resetp': 'Reset saved', 'data.resetall': 'Reset everything',
    'data.hint': 'Settings are stored in this browser only.',
    'about.foot': 'Smart Lamp v{v} · ID: {id}', 'sim.size': 'Lamp size', 'sim.size.d': 'Size on the home screen', 'gest.bri': 'Brightness by swipe', 'gest.bri.d': 'Swipe up or down on the screen', 'look.apply': 'Apply', 'toast.applied': 'Applied',
  },
};
// Назви, описи й підписи кольорів ефектів англійською (за id ефекту)
const FX_EN = {
  fire: ['Fire', 'Realistic rising flames'], mono: ['Color', 'Solid single-color light', ['Color']],
  gradient: ['Gradient', 'Smooth three-color blend', ['Color 1', 'Color 2', 'Color 3']],
  fireflies: ['Fireflies', 'Drifting points of light', ['Background', 'Fireflies']],
  rainbow: ['Rainbow', 'Full spectrum around the shade'], aurora: ['Aurora', 'Shifting green and violet veils'], ocean: ['Ocean', 'Deep blue rolling waves'],
  waves: ['Waves', 'Two colors in flowing waves', ['Color 1', 'Color 2']], sunset: ['Sunset', 'Horizon-to-sky gradient'],
  breathe: ['Breathing', 'Slow breathing glow', ['Color']], sparkle: ['Sparkles', 'Brief flashes on a backdrop', ['Background', 'Sparks']],
  lava: ['Lava lamp', 'Slow, merging blobs', ['Background', 'Lava']], police: ['Police', 'Red and blue beacons', ['Color 1', 'Color 2']], sun: ['Sun', 'A warm swaying sun'],
  colorloop: ['Color loop', 'Even hue rotation'], pride: ['Rainbow waves', 'Rainbow with rippling brightness'],
  plasma: ['Plasma', 'Organic flowing color patterns', ['Color 1', 'Color 2', 'Color 3']], noise: ['Noise', 'Soft clouds in your palette', ['Dark', 'Mid', 'Light']],
  flame: ['Color fire', 'Flames in your own colors', ['Base', 'Flame', 'Ember']], pacifica: ['Pacifica', 'Layered ocean swells with foam'],
  twinkle: ['Twinkle', 'Stars flickering independently', ['Background', 'Stars 1', 'Stars 2']], glitter: ['Glitter', 'Subtle rainbow with sparks'],
  meteor: ['Meteors', 'Falling comets with trails', ['Background', 'Meteor']], matrix: ['Matrix', 'Streams of digital rain', ['Background', 'Stream']],
  rain: ['Rain', 'Fast falling raindrops', ['Background', 'Drops']], fireworks: ['Fireworks', 'Bursting multicolor fireworks'],
  lightning: ['Lightning', 'Flashes of a distant storm', ['Clouds', 'Flash']], ripple: ['Ripples', 'Rings spreading on water', ['Water', 'Rings']],
  scanner: ['Scanner', 'Sweeping light ring with a trail', ['Background', 'Beam']], juggle: ['Juggler', 'Orbiting balls of light'],
  sinelon: ['Comet', 'A comet with a glowing trail', ['Background', 'Comet']], candle: ['Candle', 'Natural candle flicker', ['Color']],
  stripes: ['Stripes', 'Diagonal two-color stripes', ['Color 1', 'Color 2']], spiral: ['Spiral', 'A thin glowing spiral', ['Background', 'Spiral']],
  sunrise: ['Sunrise', 'Alarm'],
};
let LANG = 'uk';
const t = (k, v) => { let s = (I18N[LANG] && I18N[LANG][k]) ?? I18N.uk[k] ?? k; if (v) for (const x in v) s = s.replace(`{${x}}`, v[x]); return s; };
const fxName = (e) => (LANG === 'uk' ? e.name : (FX_EN[e.id] || [e.name])[0]);
const fxDesc = (e) => (LANG === 'uk' ? e.desc : (FX_EN[e.id] || [0, e.desc])[1]);
const fxLabel = (e, i) => (LANG === 'uk' ? (e.labels || [])[i] : (FX_EN[e.id] || [])[2] && FX_EN[e.id][2][i]) || t('col.n', { n: i + 1 });
const detectLang = () => ((navigator.language || 'en').toLowerCase().startsWith('uk') ? 'uk' : 'en');
function applyI18n() {
  document.documentElement.lang = LANG;
  document.querySelectorAll('[data-i18n]').forEach((el) => { el.textContent = t(el.dataset.i18n); });
  document.querySelectorAll('[data-i18n-ph]').forEach((el) => { el.placeholder = t(el.dataset.i18nPh); });
  document.querySelectorAll('[data-i18n-label]').forEach((el) => { const s = t(el.dataset.i18nLabel); el.title = s; el.setAttribute('aria-label', s); });
}


;

/* === i18n-ext.js === */
// Додаткові переклади для v20 (розклад, оновлення, встановлення). Підвантажується після i18n.js і перекриває однакові ключі.
Object.assign(I18N.uk, {
  'common.del': 'Видалити', 'tab.color': 'Колір', 'tab.saved': 'Сцени', 'tab.sun': 'Розклад', 'tab.upd': 'Оновлення', 'tab.set': 'Опції',
  'title.sun': 'Розклад', 'title.upd': 'Оновлення', 'title.saved': 'Сцени',
  'hint.home': 'Свайп ↕ — яскравість, ↔ — сцени\nТап — вмик/вимк, утримання — випадковий ефект',
  'sch.rules': 'Вмикання та вимикання', 'sch.on': 'Вмикати', 'sch.off': 'Вимикати',
  'sch.empty': 'Правил ще немає. Додайте, і лампа вмикатиметься та вимикатиметься сама.',
  'sch.hint': 'Правила виконуються за часом на лампі. Зараз, у симуляторі, вони працюють, поки сторінка відкрита.',
  'sch.fired.on': 'Лампу ввімкнено за розкладом', 'sch.fired.off': 'Лампу вимкнено за розкладом',
  'day.0': 'Нд', 'day.1': 'Пн', 'day.2': 'Вт', 'day.3': 'Ср', 'day.4': 'Чт', 'day.5': 'Пт', 'day.6': 'Сб',
  'upd.cur': 'Поточна версія', 'upd.auto': 'Автооновлення', 'upd.auto.d': 'Лампа сама перевіряє й ставить нові версії вночі',
  'upd.file': 'Оновити з файлу .bin', 'upd.check': 'Перевірити оновлення', 'upd.checking': 'Перевіряємо…',
  'upd.idle': 'Оновлення лампи', 'upd.idle.d': 'Перевірте, чи є нова версія прошивки.',
  'upd.latest': 'Усе актуально', 'upd.latest.d': 'У вас остання версія {v}.',
  'upd.avail': 'Є нова версія {v}', 'upd.avail.d': 'Зараз встановлено {c}.', 'upd.start': 'Оновити',
  'upd.dl': 'Завантаження', 'upd.write': 'Встановлення', 'upd.reboot': 'Перезапуск лампи', 'upd.keep': 'Не вимикайте лампу від живлення.',
  'upd.done': 'Оновлено до {v}', 'upd.done.d': 'Лампа перезапустилась і готова.', 'upd.ok': 'Готово',
  'upd.err': 'Не вдалося оновити', 'upd.retry': 'Спробувати ще раз',
  'upd.sim': 'Лампа не підключена: це демонстрація оновлення.',
  'inst.title': 'Додати на головний екран', 'inst.btn': 'Встановити застосунок',
  'inst.ios': 'Натисніть «Поділитися» в Safari, потім «На початковий екран».',
  'inst.and': 'Відкрийте меню браузера ⋮ і виберіть «Додати на головний екран».',
  'inst.any': 'Додайте сторінку в закладки або на початковий екран через меню браузера.',
  'acc.auto': 'Авто', 'look.accent': 'Колір інтерфейсу',
  'saved.hint': 'Свайп вліво чи вправо по лампі перемикає сцени.',
  'set.sim': 'Симуляція',
});
Object.assign(I18N.en, {
  'common.del': 'Delete', 'tab.color': 'Color', 'tab.saved': 'Scenes', 'tab.sun': 'Schedule', 'tab.upd': 'Update', 'tab.set': 'Options',
  'title.sun': 'Schedule', 'title.upd': 'Update', 'title.saved': 'Scenes',
  'hint.home': 'Swipe ↕ for brightness, ↔ for scenes\nTap to switch on/off, hold for a random effect',
  'sch.rules': 'Switch on and off', 'sch.on': 'Turn on', 'sch.off': 'Turn off',
  'sch.empty': 'No rules yet. Add one and the lamp will switch itself on and off.',
  'sch.hint': 'Rules run on the lamp by its clock. In the simulator they work while the page is open.',
  'sch.fired.on': 'Lamp turned on by schedule', 'sch.fired.off': 'Lamp turned off by schedule',
  'day.0': 'Su', 'day.1': 'Mo', 'day.2': 'Tu', 'day.3': 'We', 'day.4': 'Th', 'day.5': 'Fr', 'day.6': 'Sa',
  'upd.cur': 'Current version', 'upd.auto': 'Auto-update', 'upd.auto.d': 'The lamp checks and installs new versions at night',
  'upd.file': 'Update from a .bin file', 'upd.check': 'Check for updates', 'upd.checking': 'Checking…',
  'upd.idle': 'Lamp update', 'upd.idle.d': 'Check whether a new firmware version is available.',
  'upd.latest': 'Up to date', 'upd.latest.d': 'You have the latest version {v}.',
  'upd.avail': 'New version {v}', 'upd.avail.d': 'Installed now: {c}.', 'upd.start': 'Update',
  'upd.dl': 'Downloading', 'upd.write': 'Installing', 'upd.reboot': 'Restarting the lamp', 'upd.keep': 'Keep the lamp powered.',
  'upd.done': 'Updated to {v}', 'upd.done.d': 'The lamp restarted and is ready.', 'upd.ok': 'Done',
  'upd.err': 'Update failed', 'upd.retry': 'Try again',
  'upd.sim': 'No lamp connected: this is an update demo.',
  'inst.title': 'Add to home screen', 'inst.btn': 'Install app',
  'inst.ios': 'Tap Share in Safari, then Add to Home Screen.',
  'inst.and': 'Open the browser menu ⋮ and choose Add to Home screen.',
  'inst.any': 'Bookmark the page or add it to the home screen from the browser menu.',
  'acc.auto': 'Auto', 'look.accent': 'Interface color',
  'saved.hint': 'Swipe left or right on the lamp to switch scenes.',
  'set.sim': 'Simulation',
});


;

/* === fastled.js === */
// ===== FastLED-подібна обгортка. Тут нічого змінювати не потрібно =====
// Дає ефектам з прошивки ті самі імена: leds[], XY(), CRGB, CHSV, millis(), sin8(), beatsin8(), inoise8() ...
const WIDTH = 16, HEIGHT = 16, NUM_LEDS = 256, PI2 = Math.PI * 2;
const Y_ZERO_AT_BOTTOM = true; // y=0 - низ лампи. Якщо ефекти перевернуті - поставте false
const { abs, sin, cos, sqrt, min, max, floor, PI } = Math;
const TWO_PI = PI2;
let SEED = 1, _ms = 0;          // задає рушій
class C {
  constructor(r = 0, g = 0, b = 0) { this.r = r; this.g = g; this.b = b; }
  nscale8(s) { this.r = this.r * s / 256 | 0; this.g = this.g * s / 256 | 0; this.b = this.b * s / 256 | 0; return this; }
  fadeToBlackBy(n) { return this.nscale8(255 - n); }
}
const CRGB = (r = 0, g, b) => g === undefined ? new C(r >> 16 & 255, r >> 8 & 255, r & 255) : new C(r, g, b);
let COLOR = CRGB(255, 116, 32), COLOR2 = CRGB(26, 16, 48), COLOR3 = CRGB(255, 217, 160); // кольори, обрані в застосунку
const leds = Array.from({ length: NUM_LEDS }, () => new C());
const XY = (x, y) => y * WIDTH + (((x | 0) % WIDTH) + WIDTH) % WIDTH;
const millis = () => _ms; // абсолютний час (мс), однаковий для всіх ламп із тим самим ID
const constrain = (v, a, b) => v < a ? a : v > b ? b : v;
const map = (v, a, b, c, d) => (v - a) * (d - c) / (b - a) + c;
const random = (a, b) => b === undefined ? Math.random() * a | 0 : a + (Math.random() * (b - a) | 0);
const random8 = (a, b) => a === undefined ? random(256) : random(a, b), random16 = random8;
const scale8 = (i, s) => i * (1 + s) >> 8;
const qadd8 = (a, b) => min(255, a + b), qsub8 = (a, b) => max(0, a - b);
const sin8 = (t) => Math.round(sin((t & 255) / 256 * PI2) * 127.5 + 127.5);
const cos8 = (t) => Math.round(cos((t & 255) / 256 * PI2) * 127.5 + 127.5);
const beat8 = (bpm, tb = 0) => ((millis() - tb) * bpm * 256 / 60000) & 255;
const beatsin8 = (bpm, lo = 0, hi = 255, tb = 0, ph = 0) => lo + scale8(sin8(beat8(bpm, tb) + ph), hi - lo);
const beatsin16 = (bpm, lo = 0, hi = 65535, tb = 0, ph = 0) => lo + (hi - lo) * (0.5 + 0.5 * sin(((millis() - tb) * bpm / 60000) * PI2 + ph / 65536 * PI2));
function hashNoise(x, y, z) { // 0..1, залежить від SEED
  let v = (Math.imul(x | 0, 374761393) + Math.imul(y | 0, 668265263) + Math.imul(z | 0, 1442695041) + SEED) | 0;
  v = Math.imul(v ^ (v >>> 13), 1274126177); return ((v ^ (v >>> 16)) >>> 0) / 4294967295;
}
function inoise8(x, y = 0, z = 0) { // 0..255; 256 одиниць = одна клітинка шуму (наближення FastLED)
  x /= 256; y /= 256; z /= 256;
  const x0 = floor(x), y0 = floor(y), z0 = floor(z), fx = x - x0, fy = y - y0, fz = z - z0;
  const sx = fx * fx * (3 - 2 * fx), sy = fy * fy * (3 - 2 * fy), sz = fz * fz * (3 - 2 * fz);
  const L = (a, b, t) => a + (b - a) * t, h = (i, j, k) => hashNoise(x0 + i, y0 + j, z0 + k);
  return 255 * L(L(L(h(0, 0, 0), h(1, 0, 0), sx), L(h(0, 1, 0), h(1, 1, 0), sx), sy),
                 L(L(h(0, 0, 1), h(1, 0, 1), sx), L(h(0, 1, 1), h(1, 1, 1), sx), sy), sz);
}
function CHSV(h, s = 255, v = 255) { // як hsv2rgb_rainbow з FastLED
  h &= 255; const off = (h & 31) << 3, third = scale8(off, 85), two = scale8(off, 171); let r, g, b;
  if (!(h & 128)) {
    if (!(h & 64)) { if (!(h & 32)) { r = 255 - third; g = third; b = 0; } else { r = 171; g = 85 + third; b = 0; } }
    else if (!(h & 32)) { r = 171 - two; g = 170 + third; b = 0; } else { r = 0; g = 255 - third; b = third; }
  } else if (!(h & 64)) { if (!(h & 32)) { r = 0; g = 171 - two; b = 85 + two; } else { r = third; g = 0; b = 255 - third; } }
  else if (!(h & 32)) { r = 85 + third; g = 0; b = 171 - third; } else { r = 170 + third; g = 0; b = 85 - third; }
  if (s !== 255) { const d = 255 - s, ds = scale8(d, d), k = 255 - ds; r = scale8(r, k) + ds; g = scale8(g, k) + ds; b = scale8(b, k) + ds; }
  if (v !== 255) { r = scale8(r, v); g = scale8(g, v); b = scale8(b, v); }
  return new C(r, g, b);
}
const hsv2rgb_rainbow = CHSV;
const blend = (a, b, amt) => new C(a.r + (b.r - a.r) * amt / 255 | 0, a.g + (b.g - a.g) * amt / 255 | 0, a.b + (b.b - a.b) * amt / 255 | 0);
const nblend = (a, b, amt) => { Object.assign(a, blend(a, b, amt)); return a; };
const fadeToBlackBy = (...a) => { const n = a[a.length - 1]; leds.forEach((l) => l.fadeToBlackBy(n)); };
const fill_solid = (arr, n, c) => { for (let i = 0; i < NUM_LEDS; i++) leds[i] = new C(c.r, c.g, c.b); };
const fill_rainbow = (arr, n, h, d = 5) => { for (let i = 0; i < NUM_LEDS; i++) leds[i] = CHSV(h + i * d, 255, 255); };
const FastLED = { clear() { leds.forEach((l) => { l.r = l.g = l.b = 0; }); }, show() {}, setBrightness() {} };

// ===== Додатки для масштабу й нових ефектів =====
let SCALE = 1;                  // масштаб ефекту 0.25..3 (повзунок "Масштаб"), задає рушій; більше = крупніші деталі
const fract = (v) => v - Math.floor(v);
const smoothstep = (a, b, v) => { const k = constrain((v - a) / (b - a), 0, 1); return k * k * (3 - 2 * k); };
const wrapDx = (a, b) => ((((a - b) % WIDTH) + WIDTH * 1.5) % WIDTH) - WIDTH / 2; // різниця по колу -8..8
// Циклічна палітра з перших n кольорів (COLOR, COLOR2, COLOR3): k = 0..1, кінець плавно переходить у початок
function pal(k, n = 3) {
  const cols = [COLOR, COLOR2, COLOR3]; k = fract(k) * n; const i = floor(k);
  return blend(cols[i % n], cols[(i + 1) % n], (k - i) * 255);
}
// Нециклічний градієнт з перших n (2..3) кольорів: k = 0..1
function ramp(k, n = 3) {
  const cols = [COLOR, COLOR2, COLOR3]; k = constrain(k, 0, 1) * (n - 1); const i = Math.min(floor(k), n - 2);
  return blend(cols[i], cols[i + 1], (k - i) * 255);
}
// М'яка пляма радіуса r з центром (cx, cy), накладається на leds[]
function addBlob(cx, cy, r, c, w = 1) {
  const R = Math.ceil(r), bx = Math.round(cx), by = Math.round(cy);
  for (let dy = -R; dy <= R; dy++) {
    const y = by + dy; if (y < 0 || y >= HEIGHT) continue;
    for (let dx = -R; dx <= R; dx++) {
      const x = bx + dx, ddx = wrapDx(x, cx), ddy = y - cy;
      let k = max(0, 1 - sqrt(ddx * ddx + ddy * ddy) / r); k = k * k * (3 - 2 * k) * w;
      if (k > 0) { const i = XY(x, y); leds[i] = blend(leds[i], c, constrain(k * 255, 0, 255)); }
    }
  }
}


;

/* === effects.js === */
// ===== ЕФЕКТИ =====
// Вставляйте код з прошивки в draw() - він працює у FastLED-стилі.
// Ефект - це чиста функція часу й ID лампи: millis() (абсолютний час) та SEED (з ID лампи). Не накопичуйте стан між викликами,
// тоді кілька ламп з однаковим ID показують однакову картинку, а швидкість не викликає стрибків.
// SCALE (0.25..3, повзунок "Масштаб", 1 = як раніше): більше = крупніші деталі. Ефект, який його не використовує, має noscale: true.
// Доступно: leds[], XY(x,y), WIDTH, HEIGHT, NUM_LEDS, millis(), SEED, SCALE, hashNoise(x,y,z),
//   COLOR, COLOR2, COLOR3 (кольори, обрані в застосунку; їх кількість задає поле colors),
//   CRGB(r,g,b), CHSV(h,s,v), blend(), fill_solid(), sin8(), cos8(), beatsin8(), inoise8(x,y,z), constrain(), map(),
//   pal(k,n) (циклічна палітра), ramp(k,n) (градієнт), addBlob(x,y,r,color,w), fract(), smoothstep(), wrapDx()
// x - по колу (0..15), y: 0 = низ лампи, 15 = верх. Чорний (0,0,0) = діод вимкнений.
// Поля: id, name, desc (підпис у меню), colors (0 = власна палітра, 1..3 = скільки кольорів можна міняти),
//   labels (назви кольорів), defaults (кольори за замовчуванням), preview (CSS-градієнт для списку), hidden.
// падаюча смуга з хвостом у колонці x: 0..1 (1 = голова). Чиста функція часу
function streak(x, y, t, tail, dens, spd, salt) {
  if (hashNoise(x, 0, salt) > dens) return 0;
  const v = spd * (0.75 + hashNoise(x, 1, salt) * 0.5), L = HEIGHT + tail * 1.6;
  const head = HEIGHT + tail * 0.3 - fract(t * v / L + hashNoise(x, 2, salt)) * L, d = y - head;
  return d < -0.7 ? 0 : d < 0.7 ? 1 : d > tail ? 0 : Math.exp(-d * 2.6 / tail) * (1 - d / tail);
}
const WHITE = () => CRGB(255, 255, 255);
const EFFECTS = [
  { id: 'fire', name: 'Вогонь', desc: 'Реалістичне полум’я', colors: 0, preview: 'linear-gradient(90deg,#ff2a00,#ff9a1f,#ffd36b)',
    draw() {
      const t = millis() / 1000, sk = 1 / SCALE;
      for (let x = 0; x < WIDTH; x++) {
        const a = x / WIDTH * PI2, nx = cos(a) * 2.5 * sk + 3, nz = sin(a) * 2.5 * sk + 3;
        for (let y = 0; y < HEIGHT; y++) {
          const heat = inoise8(nx * 256, (y * 0.16 * sk - t * 0.8) * 256, (nz + t * 0.12) * 256) / 255;
          const th = 0.42 + y / HEIGHT * 0.12, k = constrain((heat - th) / (0.9 - th), 0, 1);
          leds[XY(x, y)] = heat > th ? CRGB(255, 12 + 208 * k, 34 * k) : CRGB(0, 0, 0);
        }
      }
    } },
  { id: 'mono', name: 'Колір', desc: 'Однотонне світло', colors: 1, noscale: true, labels: ['Колір'], preview: 'linear-gradient(90deg,#ff7420,#ffb46b)',
    draw() { fill_solid(leds, NUM_LEDS, COLOR); } },
  { id: 'gradient', name: 'Градієнт', desc: 'Плавний перехід трьох кольорів', colors: 3, labels: ['Колір 1', 'Колір 2', 'Колір 3'], defaults: ['#ff3b8d', '#8b5cf6', '#19c8e8'], preview: 'linear-gradient(90deg,#ff3b8d,#8b5cf6,#19c8e8)',
    draw() {
      const t = millis() / 1000, cols = [COLOR, COLOR2, COLOR3];
      for (let y = 0; y < HEIGHT; y++) for (let x = 0; x < WIDTH; x++) {
        const k = (((x / WIDTH + t * 0.05 + y / HEIGHT * 0.25 / SCALE) % 1) + 1) % 1 * 3, i = floor(k);
        leds[XY(x, y)] = blend(cols[i % 3], cols[(i + 1) % 3], (k - i) * 255);
      }
    } },
  { id: 'fireflies', name: 'Світлячки', desc: 'Світні точки на темному тлі', colors: 2, labels: ['Фон', 'Світлячки'], defaults: ['#0b0618', '#ffe27a'], preview: 'radial-gradient(circle at 30% 40%,#ffe27a 0 6%,transparent 8%),radial-gradient(circle at 70% 60%,#ffe27a 0 5%,transparent 7%),#0b0618',
    draw() {
      const t = millis() / 1000;
      fill_solid(leds, NUM_LEDS, COLOR);
      const rad = 2.2 * SCALE, RR = Math.ceil(rad);
      for (let i = 0; i < 9; i++) {
        const h = (k) => hashNoise(i, k, 7);
        const fx = h(1) * WIDTH + sin(t * (0.15 + h(2) * 0.2) + h(3) * 6.28) * 3 + t * (h(4) - 0.5) * 0.8;
        const fy = HEIGHT * (0.5 + 0.42 * sin(t * (0.12 + h(5) * 0.18) + h(6) * 6.28));
        const pulse = 0.35 + 0.65 * (0.5 + 0.5 * sin(t * (0.9 + h(7) * 1.2) + h(8) * 6.28));
        for (let dy = -RR; dy <= RR; dy++) for (let dx = -RR; dx <= RR; dx++) {
          const px = floor(fx) + dx, py = floor(fy) + dy; if (py < 0 || py >= HEIGHT) continue;
          const dxw = ((px - fx + WIDTH * 1.5) % WIDTH) - WIDTH / 2, w = max(0, 1 - sqrt(dxw * dxw + (py - fy) * (py - fy)) / rad) * pulse;
          if (w > 0) leds[XY(px, py)] = blend(leds[XY(px, py)], COLOR2, w * 255);
        }
      }
    } },
  { id: 'rainbow', name: 'Райдуга', desc: 'Повний спектр навколо плафона', colors: 0, preview: 'linear-gradient(90deg,#ff3b3b,#ffd23b,#3bff6e,#3bc8ff,#9b3bff)',
    draw() { for (let y = 0; y < HEIGHT; y++) for (let x = 0; x < WIDTH; x++) leds[XY(x, y)] = CHSV(x * 16 + y * 8 * (1 / SCALE - 1) + millis() * 0.0569 + SEED); } },
  { id: 'aurora', name: 'Аврора', desc: 'Переливи зеленого та фіолетового', colors: 0, preview: 'linear-gradient(90deg,#00ff96,#4aa8ff,#9646ff)',
    draw() {
      const t = millis() / 1000;
      for (let x = 0; x < WIDTH; x++) {
        const a = x / WIDTH * PI2, nx = cos(a) * 2.5 / SCALE + 3, nz = sin(a) * 2.5 / SCALE + 3;
        for (let y = 0; y < HEIGHT; y++) {
          const n = inoise8(nx * 256, (y * 0.14 / SCALE + t * 0.25) * 256, (nz - t * 0.1) * 256);
          leds[XY(x, y)] = blend(CRGB(0, 255, 150), CRGB(150, 70, 255), n).nscale8(190 + n * 65 / 255);
        }
      }
    } },
  { id: 'ocean', name: 'Океан', desc: 'Хвилі глибокого синього', colors: 0, preview: 'linear-gradient(90deg,#0032aa,#14e1eb)',
    draw() {
      const t = millis() / 1000;
      for (let y = 0; y < HEIGHT; y++) for (let x = 0; x < WIDTH; x++)
        leds[XY(x, y)] = blend(CRGB(0, 50, 170), CRGB(20, 225, 235), (0.5 + 0.5 * sin(x / WIDTH * PI2 * 2 + y * 0.45 / SCALE - t * 2)) * 255);
    } },
  { id: 'waves', name: 'Хвилі', desc: 'Дві фарби в плавних хвилях', colors: 2, labels: ['Колір 1', 'Колір 2'], defaults: ['#6d28d9', '#22d3ee'], preview: 'linear-gradient(90deg,#6d28d9,#22d3ee,#6d28d9)',
    draw() {
      const t = millis() / 1000;
      for (let y = 0; y < HEIGHT; y++) for (let x = 0; x < WIDTH; x++)
        leds[XY(x, y)] = blend(COLOR, COLOR2, (0.5 + 0.5 * sin(x / WIDTH * PI2 * 2 + y * 0.3 / SCALE - t * 1.6)) * 255);
    } },
  { id: 'sunset', name: 'Захід', desc: 'Градієнт від горизонту до неба', colors: 0, preview: 'linear-gradient(90deg,#ff4628,#ffaf32,#9632d2)',
    draw() {
      const t = millis() / 1000;
      for (let y = 0; y < HEIGHT; y++) for (let x = 0; x < WIDTH; x++) {
        const k = constrain(y / (HEIGHT - 1) + 0.15 * SCALE * sin(t * 0.5 + x / WIDTH * PI2), 0, 1);
        leds[XY(x, y)] = k < 0.5 ? blend(CRGB(255, 70, 40), CRGB(255, 175, 50), k * 2 * 255) : blend(CRGB(255, 175, 50), CRGB(150, 50, 210), (k - 0.5) * 2 * 255);
      }
    } },
  { id: 'breathe', name: 'Дихання', desc: 'Повільне дихання світла', colors: 1, noscale: true, labels: ['Колір'], preview: 'linear-gradient(90deg,#3a1a0c,#ff7420,#ffd9b8,#ff7420,#3a1a0c)',
    draw() {
      const v = 60 + 195 * (0.5 + 0.5 * sin(millis() / 1000 * 1.6));
      for (let i = 0; i < NUM_LEDS; i++) leds[i] = CRGB(COLOR.r, COLOR.g, COLOR.b).nscale8(v);
    } },
  { id: 'sparkle', name: 'Іскри', desc: 'Короткі спалахи на тлі', colors: 2, labels: ['Фон', 'Іскри'], defaults: ['#2b1450', '#ffffff'], preview: 'radial-gradient(circle at 25% 35%,#fff 0 5%,transparent 6%),radial-gradient(circle at 70% 65%,#fff 0 4%,transparent 5%),#2b1450',
    draw() {
      const f = floor(millis() / 200), cs = max(1, Math.round(SCALE));
      for (let y = 0; y < HEIGHT; y++) for (let x = 0; x < WIDTH; x++) { const c = hashNoise(floor(x / cs), floor(y / cs), f) > 0.9 ? COLOR2 : COLOR; leds[XY(x, y)] = CRGB(c.r, c.g, c.b); }
    } },
  { id: 'lava', name: 'Лава-лампа', desc: 'Повільні краплі, що зливаються', colors: 2, labels: ['Фон', 'Лава'], defaults: ['#2a0845', '#ff5a36'], preview: 'radial-gradient(circle at 30% 70%,#ff5a36 0 22%,transparent 24%),radial-gradient(circle at 68% 32%,#ff8a5c 0 18%,transparent 20%),#2a0845',
    draw() {
      const t = millis() / 1000, B = [];
      for (let i = 0; i < 5; i++) {
        const h = (k) => hashNoise(i, k, 3);
        B.push({ x: h(1) * WIDTH + sin(t * (0.08 + h(2) * 0.1) + h(3) * 6.28) * 3, y: HEIGHT * (0.5 + 0.4 * sin(t * (0.1 + h(4) * 0.12) + h(5) * 6.28)), r: (1.5 + h(6) * 1.3) * SCALE });
      }
      for (let y = 0; y < HEIGHT; y++) for (let x = 0; x < WIDTH; x++) {
        let f = 0;
        for (const b of B) { const dx = ((((x - b.x) % WIDTH) + WIDTH * 1.5) % WIDTH) - WIDTH / 2, dy = y - b.y; f += b.r * b.r / (dx * dx + dy * dy + 0.5); }
        leds[XY(x, y)] = blend(COLOR, COLOR2, constrain((f - 0.8) / 0.5, 0, 1) * 255);
      }
    } },
  { id: 'police', name: 'Поліція', desc: 'Червоно-сині маячки', colors: 2, noscale: true, labels: ['Колір 1', 'Колір 2'], defaults: ['#ff1010', '#1038ff'], preview: 'linear-gradient(90deg,#ff1010 0 50%,#1038ff 50%)',
    draw() {
      const ph = millis() % 1000, q = ph % 500, on = q < 90 || (q > 170 && q < 260), c = ph < 500 ? COLOR : COLOR2;
      for (let y = 0; y < HEIGHT; y++) for (let x = 0; x < WIDTH; x++) {
        const v = on ? (0.65 + 0.35 * cos(x / WIDTH * PI2 * 2 + millis() * 0.004)) : 0;
        leds[XY(x, y)] = CRGB(c.r, c.g, c.b).nscale8(v * 255);
      }
    } },
  { id: 'sun', name: 'Сонце', desc: 'Тепле сонце, що гойдається', colors: 0, preview: 'radial-gradient(circle at 50% 50%,#fff6cd 0 14%,#ff962a 34%,#aa1900 62%,#190200)',
    draw() {
      const t = millis() / 1000, xc = 12 + sin(t * 0.3) * 4.5, yc = 7.5 + sin(t * 0.4) * 1.5; // сонце гойдається перед лампою
      for (let y = 0; y < HEIGHT; y++) for (let x = 0; x < WIDTH; x++) {
        const dx = ((((x - xc) % WIDTH) + WIDTH * 1.5) % WIDTH) - WIDTH / 2, dy = y - yc, d = sqrt(dx * dx + dy * dy);
        const rays = 1 + 0.22 * sin(Math.atan2(dy, dx) * 6 + t * 0.7) * constrain(d / 4, 0, 1), k = constrain(1 - d / (9 * SCALE * rays), 0, 1);
        leds[XY(x, y)] = k > 0.7 ? blend(CRGB(255, 150, 40), CRGB(255, 246, 205), (k - 0.7) / 0.3 * 255)
          : k > 0.3 ? blend(CRGB(170, 25, 0), CRGB(255, 150, 40), (k - 0.3) / 0.4 * 255) : blend(CRGB(70, 8, 0), CRGB(170, 25, 0), k / 0.3 * 255);
      }
    } },
  // ===== Нові ефекти (стиль WLED / FastLED) =====
  { id: 'colorloop', name: 'Колірна петля', desc: 'Рівномірна зміна відтінку', colors: 0, preview: 'linear-gradient(90deg,#ff3b3b,#ffd23b,#3bff6e,#3bc8ff,#9b3bff)',
    draw() { // масштаб розтягує спектр по висоті (1 = однорідний колір)
      for (let y = 0; y < HEIGHT; y++) { const c = CHSV(millis() * 0.0285 + SEED + y * 8 * (1 / SCALE - 1)); for (let x = 0; x < WIDTH; x++) leds[XY(x, y)] = new C(c.r, c.g, c.b); }
    } },
  { id: 'pride', name: 'Райдужні хвилі', desc: 'Райдуга з хвилями яскравості', colors: 0, preview: 'linear-gradient(90deg,#ff3b6e,#ffb43b,#6eff3b,#3bd2ff,#a03bff)',
    draw() {
      const ms = millis(), t = ms / 1000, k = 1 / SCALE;
      for (let y = 0; y < HEIGHT; y++) for (let x = 0; x < WIDTH; x++) {
        const a = x / WIDTH * PI2, h = x * 16 + sin(a * 2 + y * 0.3 * k - t * 0.8) * 38 + sin(y * 0.5 * k + t * 0.6) * 20 + ms * 0.0285 + SEED;
        leds[XY(x, y)] = CHSV(h, 235, (165 + 90 * sin(a * 3 + y * 0.4 * k - t * 1.1)) | 0);
      }
    } },
  { id: 'plasma', name: 'Плазма', desc: 'Органічні кольорові візерунки', colors: 3, labels: ['Колір 1', 'Колір 2', 'Колір 3'], defaults: ['#ff2d95', '#6a2cff', '#00d8ff'], preview: 'linear-gradient(90deg,#ff2d95,#6a2cff,#00d8ff)',
    draw() {
      const t = millis() / 1000, k = 1 / SCALE;
      for (let x = 0; x < WIDTH; x++) {
        const a = x / WIDTH * PI2, X = cos(a) * 4.5 * k, Z = sin(a) * 4.5 * k;
        for (let y = 0; y < HEIGHT; y++) {
          const v = sin(X + t * 0.7) + sin(Z * 1.3 + y * 0.35 * k - t * 0.5) + sin((X + Z) * 0.8 + y * 0.3 * k + t * 0.4);
          leds[XY(x, y)] = pal(v / 6 + 0.5, 3);
        }
      }
    } },
  { id: 'noise', name: 'Шум', desc: 'М’які хмари вашої палітри', colors: 3, labels: ['Темний', 'Середній', 'Світлий'], defaults: ['#0b1a4a', '#19c8e8', '#ff4fa3'], preview: 'linear-gradient(90deg,#0b1a4a,#19c8e8,#ff4fa3)',
    draw() {
      const t = millis() / 1000, k = 1 / SCALE;
      for (let x = 0; x < WIDTH; x++) {
        const a = x / WIDTH * PI2, nx = cos(a) * 2 * k + 3, nz = sin(a) * 2 * k + 3;
        for (let y = 0; y < HEIGHT; y++) {
          const n = inoise8(nx * 256, (y * 0.18 * k - t * 0.35) * 256, (nz + t * 0.1) * 256) / 255;
          leds[XY(x, y)] = ramp((n - 0.25) / 0.5, 3);
        }
      }
    } },
  { id: 'flame', name: 'Вогонь-колір', desc: 'Полум’я у ваших кольорах', colors: 3, labels: ['Тло', 'Полум’я', 'Жар'], defaults: ['#1a0000', '#ff3a00', '#ffd36b'], preview: 'linear-gradient(90deg,#1a0000,#ff3a00,#ffd36b)',
    draw() {
      const t = millis() / 1000, k = 1 / SCALE;
      for (let x = 0; x < WIDTH; x++) {
        const a = x / WIDTH * PI2, nx = cos(a) * 2.5 * k + 3, nz = sin(a) * 2.5 * k + 3;
        for (let y = 0; y < HEIGHT; y++) {
          const heat = inoise8(nx * 256, (y * 0.16 * k - t * 0.8) * 256, (nz + t * 0.12) * 256) / 255;
          leds[XY(x, y)] = ramp((heat - 0.3) / 0.5 + (1 - y / HEIGHT) * 0.2 - 0.1, 3);
        }
      }
    } },
  { id: 'pacifica', name: 'Пацифіка', desc: 'Шари океанських хвиль із піною', colors: 0, preview: 'linear-gradient(90deg,#001858,#00aaaa,#b4ffff)',
    draw() {
      const t = millis() / 1000, k = 1 / SCALE;
      for (let y = 0; y < HEIGHT; y++) for (let x = 0; x < WIDTH; x++) {
        const a = x / WIDTH * PI2;
        let v = sin(a * 2 + y * 0.35 * k - t * 0.9) + sin(a * 3 - y * 0.5 * k + t * 0.7) * 0.8 + sin(a + y * 0.2 * k - t * 0.5) * 0.6 + sin(a * 5 + y * 0.9 * k + t * 1.3) * 0.4;
        v = constrain((v + 2.8) / 5.6, 0, 1);
        let c = blend(CRGB(0, 24, 90), CRGB(0, 170, 170), v * 255);
        if (v > 0.8) c = blend(c, CRGB(180, 255, 255), (v - 0.8) / 0.2 * 200);
        leds[XY(x, y)] = c;
      }
    } },
  { id: 'twinkle', name: 'Мерехтіння', desc: 'Зірки, що спалахують окремо', colors: 3, labels: ['Фон', 'Зірки 1', 'Зірки 2'], defaults: ['#05030f', '#fff1b8', '#8fd3ff'], preview: 'radial-gradient(circle at 25% 40%,#fff1b8 0 5%,transparent 6%),radial-gradient(circle at 70% 60%,#8fd3ff 0 5%,transparent 6%),#05030f',
    draw() {
      const t = millis() / 1000, cs = max(1, Math.round(SCALE));
      for (let y = 0; y < HEIGHT; y++) for (let x = 0; x < WIDTH; x++) {
        const cx = floor(x / cs), cy = floor(y / cs), ph = fract(t * (0.25 + hashNoise(cx, cy, 11) * 0.35) + hashNoise(cx, cy, 12));
        const env = ph < 0.22 ? sin(ph / 0.22 * PI) : 0;
        leds[XY(x, y)] = blend(COLOR, hashNoise(cx, cy, 13) < 0.5 ? COLOR2 : COLOR3, env * env * 255);
      }
    } },
  { id: 'glitter', name: 'Блискітки', desc: 'Тиха райдуга з іскрами', colors: 0, preview: 'radial-gradient(circle at 30% 40%,#fff 0 4%,transparent 5%),linear-gradient(90deg,#7a1f2e,#7a6a1f,#1f7a3a,#1f5a7a,#4a1f7a)',
    draw() {
      const ms = millis(), f = floor(ms / 90), cs = max(1, Math.round(SCALE));
      for (let y = 0; y < HEIGHT; y++) for (let x = 0; x < WIDTH; x++)
        leds[XY(x, y)] = hashNoise(floor(x / cs), floor(y / cs), f) > 0.985 ? WHITE() : CHSV(x * 16 + ms * 0.0285 + SEED, 255, 110);
    } },
  { id: 'meteor', name: 'Метеори', desc: 'Комети, що падають донизу', colors: 2, labels: ['Фон', 'Метеор'], defaults: ['#03020a', '#7cc8ff'], preview: 'linear-gradient(160deg,#03020a 40%,#7cc8ff)',
    draw() {
      const t = millis() / 1000;
      for (let y = 0; y < HEIGHT; y++) for (let x = 0; x < WIDTH; x++) {
        const v = streak(x, y, t, 5 * SCALE, 0.5, 7, 41), c = blend(COLOR, COLOR2, v * 255);
        leds[XY(x, y)] = v === 1 ? blend(c, WHITE(), 120) : c;
      }
    } },
  { id: 'matrix', name: 'Матриця', desc: 'Потоки цифрового дощу', colors: 2, labels: ['Фон', 'Потік'], defaults: ['#000a02', '#00ff55'], preview: 'linear-gradient(180deg,#e8fff0,#00ff55 25%,#000a02)',
    draw() {
      const t = millis() / 1000;
      for (let y = 0; y < HEIGHT; y++) for (let x = 0; x < WIDTH; x++) {
        const v = streak(x, y, t, 8 * SCALE, 0.8, 4.5, 42), c = blend(COLOR, COLOR2, v * 255);
        leds[XY(x, y)] = v === 1 ? blend(c, WHITE(), 170) : c;
      }
    } },
  { id: 'rain', name: 'Дощ', desc: 'Швидкі краплі дощу', colors: 2, labels: ['Фон', 'Краплі'], defaults: ['#020814', '#4aa8ff'], preview: 'linear-gradient(180deg,#020814 30%,#4aa8ff 60%,#020814)',
    draw() {
      const t = millis() / 1000;
      for (let y = 0; y < HEIGHT; y++) for (let x = 0; x < WIDTH; x++)
        leds[XY(x, y)] = blend(COLOR, COLOR2, streak(x, y, t, 2.2 * SCALE, 0.7, 12, 43) * 255);
    } },
  { id: 'fireworks', name: 'Феєрверк', desc: 'Салют із різнокольоровими вибухами', colors: 0, preview: 'radial-gradient(circle at 50% 50%,#fff 0 4%,#ff3b8d 6% 14%,transparent 18%),#080414',
    draw() {
      const t = millis() / 1000, T = 3.2;
      fill_solid(leds, NUM_LEDS, CRGB(0, 0, 0));
      for (let i = 0; i < 3; i++) {
        const tt = t / T + i / 3, cyc = floor(tt), ph = tt - cyc, cx = hashNoise(cyc, i, 21) * WIDTH, cy = HEIGHT * (0.5 + hashNoise(cyc, i, 22) * 0.35);
        if (ph < 0.28) { addBlob(cx, ph / 0.28 * cy, 1.3, CRGB(255, 200, 120), 0.9); continue; }
        const p = (ph - 0.28) / 0.72, r = p * 5.5 * SCALE + 0.5, fade = Math.pow(1 - p, 1.6), col = CHSV(hashNoise(cyc, i, 23) * 255, 235, 255), fl = floor(t * 12);
        for (let y = 0; y < HEIGHT; y++) for (let x = 0; x < WIDTH; x++) {
          const dx = wrapDx(x, cx), dy = y - cy, w = max(0, 1 - Math.abs(sqrt(dx * dx + dy * dy) - r) / 1.3) * fade * (0.55 + 0.45 * hashNoise(x, y, fl));
          if (w > 0) { const j = XY(x, y); leds[j] = blend(leds[j], col, constrain(w * 255, 0, 255)); }
        }
      }
    } },
  { id: 'lightning', name: 'Блискавка', desc: 'Спалахи далекої грози', colors: 2, labels: ['Хмари', 'Спалах'], defaults: ['#060818', '#cfe0ff'], preview: 'linear-gradient(135deg,#060818 45%,#cfe0ff 52%,#060818 60%)',
    draw() {
      const t = millis() / 1000, slot = floor(t / 1.4), ph = t / 1.4 - slot, on = hashNoise(slot, 0, 31) > 0.35, cx = hashNoise(slot, 1, 32) * WIDTH;
      const env = on ? max(ph < 0.08 ? sin(ph / 0.08 * PI) * 0.6 : 0, ph > 0.14 && ph < 0.6 ? Math.exp(-(ph - 0.14) * 8) : 0) : 0;
      for (let y = 0; y < HEIGHT; y++) for (let x = 0; x < WIDTH; x++) {
        const d = wrapDx(x, cx) / (5 * SCALE), v = env * (0.3 + 0.7 * Math.exp(-d * d)) * (0.45 + 0.55 * y / HEIGHT);
        leds[XY(x, y)] = blend(COLOR, COLOR2, constrain(v * 255, 0, 255));
      }
    } },
  { id: 'ripple', name: 'Краплі', desc: 'Кола на поверхні води', colors: 2, labels: ['Вода', 'Кола'], defaults: ['#041a3a', '#6fe3ff'], preview: 'radial-gradient(circle at 50% 50%,#041a3a 0 14%,#6fe3ff 18%,#041a3a 24% 34%,#6fe3ff 38%,#041a3a 44%)',
    draw() {
      const t = millis() / 1000, T = 2.6;
      fill_solid(leds, NUM_LEDS, COLOR);
      for (let i = 0; i < 3; i++) {
        const tt = t / T + i / 3, cyc = floor(tt), p = tt - cyc, cx = hashNoise(cyc, i, 51) * WIDTH, cy = hashNoise(cyc, i, 52) * HEIGHT, r = p * 8 * SCALE, fade = Math.pow(1 - p, 1.3);
        for (let y = 0; y < HEIGHT; y++) for (let x = 0; x < WIDTH; x++) {
          const dx = wrapDx(x, cx), dy = y - cy, w = max(0, 1 - Math.abs(sqrt(dx * dx + dy * dy) - r) / 1.7) * fade;
          if (w > 0) { const j = XY(x, y); leds[j] = blend(leds[j], COLOR2, constrain(w * 255, 0, 255)); }
        }
      }
    } },
  { id: 'scanner', name: 'Сканер', desc: 'Кільце світла зі шлейфом', colors: 2, labels: ['Фон', 'Промінь'], defaults: ['#10040a', '#ff2a4a'], preview: 'linear-gradient(180deg,#10040a,#ff2a4a 50%,#10040a)',
    draw() {
      const t = millis() / 1000, s = 1.4 * SCALE;
      for (let y = 0; y < HEIGHT; y++) {
        let v = 0;
        for (let k = 0; k < 8; k++) { const yc = (HEIGHT - 1) * (0.5 + 0.5 * sin((t - k * 0.04) * 1.5)), d = (y - yc) / s; v = max(v, Math.exp(-d * d) * (1 - k / 8)); }
        const c = blend(COLOR, COLOR2, v * 255); for (let x = 0; x < WIDTH; x++) leds[XY(x, y)] = new C(c.r, c.g, c.b);
      }
    } },
  { id: 'juggle', name: 'Жонглер', desc: 'Кульки світла на орбітах', colors: 0, preview: 'radial-gradient(circle at 25% 60%,#ff3b3b 0 8%,transparent 10%),radial-gradient(circle at 50% 35%,#3bff6e 0 8%,transparent 10%),radial-gradient(circle at 75% 60%,#3b8bff 0 8%,transparent 10%),#080810',
    draw() {
      const t = millis() / 1000; fill_solid(leds, NUM_LEDS, CRGB(0, 0, 0));
      for (let i = 0; i < 5; i++) for (let k = 0; k < 6; k++) {
        const tt = t - k * 0.03, x = fract(tt * (0.12 + i * 0.05) * (i % 2 ? 1 : -1) + i / 5) * WIDTH, y = (HEIGHT - 1) * (0.5 + 0.5 * sin(tt * (0.9 + i * 0.37) + i * 1.7));
        addBlob(x, y, 1.8 * SCALE, CHSV(i * 51 + millis() * 0.01 + SEED), (1 - k / 6) * 0.8);
      }
    } },
  { id: 'sinelon', name: 'Комета', desc: 'Комета зі світним шлейфом', colors: 2, labels: ['Фон', 'Комета'], defaults: ['#030208', '#ffb347'], preview: 'linear-gradient(90deg,#030208,#ffb347 85%,#fff 95%)',
    draw() {
      const t = millis() / 1000; fill_solid(leds, NUM_LEDS, COLOR);
      for (let k = 0; k < 10; k++) { const tt = t - k * 0.04; addBlob(fract(tt * 0.18) * WIDTH, (HEIGHT - 1) * (0.5 + 0.5 * sin(tt * 1.3)), 1.5 * SCALE, COLOR2, 1 - k / 10); }
    } },
  { id: 'candle', name: 'Свічка', desc: 'Жива свічка', colors: 1, labels: ['Колір'], defaults: ['#ff8a2a'], preview: 'linear-gradient(90deg,#7a3010,#ff8a2a,#ffd9a0,#ff8a2a,#7a3010)',
    draw() {
      const t = millis() / 1000, k = 1 / SCALE, glob = inoise8(0, (t * 2.1 + 20) * 256, 0) / 255;
      for (let x = 0; x < WIDTH; x++) {
        const a = x / WIDTH * PI2, f = inoise8((cos(a) * 1.2 * k + 3) * 256, t * 1.3 * 256, (sin(a) * 1.2 * k + 3) * 256) / 255;
        for (let y = 0; y < HEIGHT; y++) leds[XY(x, y)] = CRGB(COLOR.r, COLOR.g, COLOR.b).nscale8(constrain((0.3 + 0.7 * (0.6 * f + 0.4 * glob)) * (1 - 0.35 * y / HEIGHT) * 255, 0, 255));
      }
    } },
  { id: 'stripes', name: 'Смуги', desc: 'Діагональні смуги двох кольорів', colors: 2, labels: ['Колір 1', 'Колір 2'], defaults: ['#ff3b8d', '#19c8e8'], preview: 'repeating-linear-gradient(90deg,#ff3b8d 0 12%,#19c8e8 12% 24%)',
    draw() {
      const t = millis() / 1000, seg = max(1, Math.round(4 / SCALE));
      for (let y = 0; y < HEIGHT; y++) for (let x = 0; x < WIDTH; x++) {
        const u = fract(x / WIDTH * seg + y / HEIGHT * 0.6 - t * 0.2);
        leds[XY(x, y)] = blend(COLOR, COLOR2, smoothstep(0.3, 0.7, 0.5 + 0.5 * sin(u * PI2)) * 255);
      }
    } },
  { id: 'spiral', name: 'Спіраль', desc: 'Тонка світна спіраль', colors: 2, labels: ['Фон', 'Спіраль'], defaults: ['#08040f', '#7cf0ff'], preview: 'repeating-linear-gradient(60deg,#08040f 0 10%,#7cf0ff 12%,#08040f 16%)',
    draw() {
      const t = millis() / 1000, seg = max(1, Math.round(2 / SCALE));
      for (let y = 0; y < HEIGHT; y++) for (let x = 0; x < WIDTH; x++) {
        const u = fract(x / WIDTH * seg + y / HEIGHT - t * 0.25);
        leds[XY(x, y)] = blend(COLOR, COLOR2, Math.pow(0.5 + 0.5 * cos(u * PI2), 6) * 255);
      }
    } },

  // Світанок: SUNRISE (0..1) задає будильник; лампа наповнюється знизу теплим світлом
  { id: 'sunrise', name: 'Світанок', desc: 'Будильник', colors: 0, hidden: true, noscale: true, preview: 'linear-gradient(90deg,#ff5a1f,#ffb347,#fff1d6)',
    draw() { // усе у float без 8-бітних кроків: світанок росте плавно
      const p = SUNRISE, h = p < 0.5 ? p * 2 : (p - 0.5) * 2, A = p < 0.5 ? [120, 10, 0] : [255, 90, 20], B = p < 0.5 ? [255, 90, 20] : [255, 225, 170];
      const r = A[0] + (B[0] - A[0]) * h, g = A[1] + (B[1] - A[1]) * h, bl = A[2] + (B[2] - A[2]) * h;
      for (let y = 0; y < HEIGHT; y++) {
        const v0 = constrain(p * 1.3 - y / HEIGHT * 0.3, 0, 1), v = v0 * v0 * (3 - 2 * v0);
        for (let x = 0; x < WIDTH; x++) leds[XY(x, y)] = new C(r * v, g * v, bl * v);
      }
    } },
];
let SUNRISE = 0; // прогрес світанку 0..1


;

/* === sketch.js === */
'use strict';
// Рушій: годинник ефектів + WebGL-рендер лампи одним шейдером + інтерфейс. Ефекти - у effects.js.
const $ = (id) => document.getElementById(id);
const STORE_KEY = 'smart-lamp-state-v1', PRESET_KEY = 'smart-lamp-presets-v1';
const TICK_MS = 1000 / 30;       // базовий крок ефекту; швидкість множить частоту кроків (як затримка кадру в прошивці)
const lerp = (a, b, t) => a + (b - a) * t;
const newSeed = () => crypto.getRandomValues(new Uint32Array(1))[0];
const normalizeHex = (h) => {
  const s = String(h || '#000000').trim().replace('#', '');
  const clean = s.length === 3 ? s.split('').map((c) => c + c).join('') : s.padStart(6, '0').slice(0, 6);
  return '#' + clean;
};
const hexRgb = (h) => {
  const s = String(h || '#000000').trim().replace('#', '');
  const clean = s.length === 3 ? s.split('').map((c) => c + c).join('') : s.padStart(6, '0').slice(0, 6);
  return [0, 2, 4].map((i) => parseInt(clean.slice(i, i + 2), 16) || 0);
};

const hashId = (str) => { let h = 2166136261; for (const ch of String(str)) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619); } return h >>> 0; };
const randomId = () => 'LAMP-' + newSeed().toString(16).slice(-6).toUpperCase();
let state = { lampName: 'Smart Lamp', mode: 'fire', brightness: 100, brightnessCurve: 'linear', speed: 1, scale: 1, colors: ['#ff7420', '#12081f', '#ffd9a0'], lampId: randomId() };
let sim = { fps: 60, quality: 1, glow: 100, tilt: 18, size: 100, showFps: false, smooth: true, auto: true, swipeBri: true };
// Час ефектів: абсолютний (від 2026-01-01) і не залежить від кадрів. Швидкість лише змінює темп без стрибків.
const EPOCH = 1767225600000, clock = { T0: Date.now() - EPOCH, A: Date.now(), speed: 1 };
const virtualMs = () => (clock.T0 + (Date.now() - clock.A) * clock.speed) % 4294967296;
function setSpeed(v) { clock.T0 += (Date.now() - clock.A) * clock.speed; clock.A = Date.now(); clock.speed = v; }
function setColors() { [COLOR, COLOR2, COLOR3] = state.colors.map((h) => CRGB(...hexRgb(h))); }
let lampOn = true, level = 1, lvFrom = 1, lvTo = 1, lvAt = 0;
let dirty = true, last = 0, tickAcc = 0, shellLit = 0, xfadeAt = -1, avgDt = 16, dprScale = 1, qualityAt = 4000;
const prev = new Float32Array(768), cur = new Float32Array(768), snap = new Float32Array(768), shown = new Float32Array(768);
const texData = new Uint8Array(1024);
const getEffect = () => EFFECTS.find((e) => e.id === state.mode) || EFFECTS[0];

// ---------- мініатюри ефектів: реальний рендер самого ефекту з його стандартними кольорами ----------
const thumbCache = {};
function fxThumb(e) {
  if (thumbCache[e.id]) return thumbCache[e.id];
  const saved = { c: [COLOR, COLOR2, COLOR3], seed: SEED, scale: SCALE, ms: _ms, sun: SUNRISE, l: leds.map((l) => [l.r, l.g, l.b]) };
  const base = ['#ff7420', '#12081f', '#ffd9a0'].map((x) => CRGB(...hexRgb(x)));
  (e.defaults || []).forEach((x, i) => { base[i] = CRGB(...hexRgb(x)); });
  [COLOR, COLOR2, COLOR3] = base; SEED = 1; SCALE = 1; SUNRISE = 0.6;
  let best = null, bs = -1;
  try {
    for (let i = 0; i < 8; i++) { // з кількох моментів часу беремо найвиразніший кадр
      _ms = 4000 + i * 2300; e.draw();
      const px = leds.map((l) => [l.r, l.g, l.b]), lum = px.map((p) => p[0] * 0.3 + p[1] * 0.59 + p[2] * 0.11);
      const mean = lum.reduce((a, b) => a + b, 0) / lum.length, sd = Math.sqrt(lum.reduce((a, b) => a + (b - mean) * (b - mean), 0) / lum.length);
      if (sd + mean * 0.15 > bs) { bs = sd + mean * 0.15; best = px; }
    }
  } catch (err) { best = null; }
  [COLOR, COLOR2, COLOR3] = saved.c; SEED = saved.seed; SCALE = saved.scale; _ms = saved.ms; SUNRISE = saved.sun;
  saved.l.forEach((p, i) => { leds[i] = new C(p[0], p[1], p[2]); });
  if (!best) return (thumbCache[e.id] = e.preview);
  const c0 = document.createElement('canvas'); c0.width = WIDTH; c0.height = HEIGHT;
  const g0 = c0.getContext('2d'), img = g0.createImageData(WIDTH, HEIGHT);
  for (let y = 0; y < HEIGHT; y++) for (let x = 0; x < WIDTH; x++) {
    const p = best[y * WIDTH + x], o = ((HEIGHT - 1 - y) * WIDTH + x) * 4;
    img.data[o] = p[0]; img.data[o + 1] = p[1]; img.data[o + 2] = p[2]; img.data[o + 3] = 255;
  }
  g0.putImageData(img, 0, 0);
  const c1 = document.createElement('canvas'); c1.width = c1.height = 48; const g1 = c1.getContext('2d'); g1.imageSmoothingQuality = 'high'; g1.drawImage(c0, 0, 0, 48, 48);
  const c2 = document.createElement('canvas'); c2.width = c2.height = 128; const g2 = c2.getContext('2d'); g2.imageSmoothingQuality = 'high'; g2.drawImage(c1, 0, 0, 128, 128);
  return (thumbCache[e.id] = `url(${c2.toDataURL('image/png')}) center/cover no-repeat`);
}

// ---------- ефект ----------
function runTick() {
  _ms = virtualMs(); SCALE = state.scale || 1;
  if (alarmRun) SUNRISE = constrain((Date.now() - alarmRun.start) / alarmRun.dur, 0, 1);
  getEffect().draw();
  for (let i = 0; i < NUM_LEDS; i++) { const l = leds[i]; cur[i * 3] = l.r; cur[i * 3 + 1] = l.g; cur[i * 3 + 2] = l.b; }
}
function applyEffect(crossfade = true) {
  if (crossfade) { snap.set(shown); xfadeAt = performance.now(); }
  SEED = hashId(state.lampId); setColors(); if (clock.speed !== state.speed) setSpeed(state.speed);
  FastLED.clear(); cur.fill(0); prev.fill(0);
  if (getEffect().setup) getEffect().setup();
  runTick(); prev.set(cur); tickAcc = 0; dirty = true;
}

// ---------- WebGL ----------
const canvas = document.createElement('canvas');
$('scene').appendChild(canvas);
const gl = canvas.getContext('webgl', { alpha: false, antialias: false, powerPreference: 'low-power' });
const VS = 'attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}';
const FS = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform vec2 uC; uniform vec4 uP; uniform vec3 uS; uniform sampler2D uT; uniform sampler2D uG; uniform vec3 uB1; uniform vec3 uB2; uniform vec2 uV; uniform float uQ;
const float TAU = 6.2831853;
float gR, gH;
vec3 tx(float x, float y) { return texture2D(uT, vec2(x, y)).rgb; }
// гладка бікубічна (B-spline) вибірка матриці 16x16: без блоків і ромбів
vec3 led(vec2 uv) {
  vec2 t = uv * 16. - .5, i = floor(t), f = t - i, f2 = f * f, f3 = f2 * f;
  vec2 w0 = (1. - f) * (1. - f) * (1. - f) / 6., w1 = (4. - 6. * f2 + 3. * f3) / 6.;
  vec2 w2 = (1. + 3. * f + 3. * f2 - 3. * f3) / 6., w3 = f3 / 6.;
  vec2 g0 = w0 + w1, g1 = w2 + w3;
  vec2 h0 = (i - 1. + w1 / g0 + .5) / 16., h1 = (i + 1. + w3 / g1 + .5) / 16.;
  return g0.y * (g0.x * tx(h0.x, h0.y) + g1.x * tx(h1.x, h0.y)) + g1.y * (g0.x * tx(h0.x, h1.y) + g1.x * tx(h1.x, h1.y));
}
vec3 over(vec3 shell, vec3 L) {
  float m = max(L.r, max(L.g, L.b));
  float a = 1. - pow(1. - clamp(m * uS.x, 0., 1.), 3.);
  return mix(shell, L / max(m, 1e-3), a);
}
float sdTop(vec3 p, float y0, float y1, float r, float rr) { // циліндр: скруглений лише зверху, низ плоский
  vec2 q = vec2(length(p.xz) - r + rr, p.y - y1 + rr);
  float d = min(max(q.x, q.y), 0.) + length(max(q, 0.)) - rr;
  return max(d, y0 - p.y);
}
float sdRC(vec3 p, float yc, float hh, float r, float rr) { // циліндр, скруглений і зверху, і знизу
  vec2 q = vec2(length(p.xz) - r + rr, abs(p.y - yc) - hh + rr);
  return min(max(q.x, q.y), 0.) + length(max(q, 0.)) - rr;
}
float dBody(vec3 p) { return sdTop(p, 0., gH, gR, .26 * gR); }
float dBase(vec3 p) { return sdTop(p, -.09 * gR, 0., 1.06 * gR, .035 * gR); }
float dBtn(vec3 p) { return sdRC(p, gH + .022 * gR, .022 * gR, .43 * gR, .02 * gR); }
float sdM(vec3 p, int m) { return m == 0 ? dBody(p) : (m == 1 ? dBase(p) : dBtn(p)); }
vec3 nrm(vec3 q, int m) { // нормаль саме того об'єкта, що малюється: без перекосів на стику корпусу, підставки й кнопки
  vec2 e = vec2(.6, -.6);
  return normalize(e.xyy * sdM(q + e.xyy, m) + e.yyx * sdM(q + e.yyx, m) + e.yxy * sdM(q + e.yxy, m) + e.xxx * sdM(q + e.xxx, m));
}
vec3 shade(vec3 q, int m, vec3 shell, float tone, float kk) {
  float R = gR, H = gH, s = uP.z, c = uP.w;
  vec3 n = nrm(q, m);
  vec3 ldir = normalize(vec3(-.45, .75, .55)), vdir = vec3(0., s, c), hv = normalize(ldir + vdir);
  float nl = max(dot(n, ldir), 0.), fr = pow(1. - clamp(dot(n, vdir), 0., 1.), 3.);
  vec3 k;
  if (m == 2) {
    k = vec3(.93, .94, .96) * tone * (.62 + .38 * nl) * (1. - .25 * fr);
    k += pow(max(dot(n, hv), 0.), 36.) * .45;
  } else if (m == 1) {
    k = vec3(.86, .875, .9) * tone * (.5 + .5 * nl);
    k += pow(max(dot(n, hv), 0.), 30.) * .2;
  } else {
    vec3 L = led(vec2(fract(atan(q.z, q.x) / TAU + .5), clamp(q.y / H, 0., .97)));
    float diff = .62 + .38 * nl;
    vec3 env = mix(uB2, uB1, clamp(reflect(-vdir, n).y * .5 + .5, 0., 1.)) * 1.7 + .05; // відбиток фону: напівпрозорий плафон підхоплює колір середовища
    vec3 sh = mix(shell * diff, env * (.55 + .45 * diff), .24 + .38 * fr);
    k = over(sh, L) * (.88 + .12 * diff);
    k = mix(k, env, .1 * fr * fr);
    k *= 1. - .4 * kk * fr;
    k += .24 * kk * pow(fr, 5.);
    k += pow(max(dot(n, hv), 0.), 22.) * .3 * kk;
    if (n.y > .9) k *= mix(.78, 1., smoothstep(R * .43, R * .58, length(q.xz)));
  }
  return k;
}
void main() {
  gR = uP.x; gH = uP.y;
  float R = gR, H = gH, s = uP.z, c = uP.w;
  vec2 p = gl_FragCoord.xy - uC;
  vec3 col = mix(uB2, uB1, gl_FragCoord.y / uV.y);
  vec3 shell = mix(vec3(.76, .77, .81), vec3(.33, .345, .384), uS.y);
  float tone = mix(1., .8, uS.y), kk = 1. - .75 * uS.y;
  vec2 q2 = vec2(p.x / (R * 4.6), (p.y - H * c * .5) / (H * .95));
  float gl = length(q2), f = exp(-3.5 * gl * gl) * smoothstep(1., .65, gl);
  float gx = q2.x * 4.6;
  col += texture2D(uG, vec2(.75 - .25 * clamp(gx / (1. + .5 * abs(gx)) * 1.5, -1., 1.), .5 + .4 * clamp(q2.y * 1.9, -1., 1.))).rgb * f * .95 * uS.x * uS.z;
  if (abs(p.x) < R * 1.06 + 3. && p.y > -(.12 * R * c + 1.06 * R * s + 3.) && p.y < H * c + R * s + .2 * R + 3.) {
    vec3 dir = vec3(0., -s, -c), up = vec3(0., c, -s);
    float T0 = H + R * 3.;
    vec3 ro = vec3(p.x, 0., 0.) + up * p.y - dir * T0;
    // кожен об'єкт (корпус, підставка, кнопка) має власне покриття: AA є і на межах між ними, а не лише проти фону
    float t = 0., m1 = 1e9, m2 = 1e9, m3 = 1e9, t1 = 0., t2 = 0., t3 = 0.;
    for (int i = 0; i < 100; i++) {
      vec3 P = ro + dir * t;
      float d1 = dBody(P), d2 = dBase(P), d3 = dBtn(P);
      if (d1 < m1) { m1 = d1; t1 = t; }
      if (d2 < m2) { m2 = d2; t2 = t; }
      if (d3 < m3) { m3 = d3; t3 = t; }
      float d = min(d1, min(d2, d3));
      if (d < .2) break;
      t += max(d * .9, .05);
      if (t > T0 * 2.) break;
    }
    vec3 A = vec3(1.) - smoothstep(vec3(.2), vec3(1.6), vec3(m1, m2, m3)), T = vec3(t1, t2, t3);
    for (int pass = 0; pass < 3; pass++) { // малюємо від дальнього до ближнього
      int m = 0; float tm = T.x;
      if (T.y > tm) { m = 1; tm = T.y; }
      if (T.z > tm) { m = 2; tm = T.z; }
      float a = m == 0 ? A.x : (m == 1 ? A.y : A.z);
      if (a > .004 && tm > -1e8) col = mix(col, shade(ro + dir * tm, m, shell, tone, kk), a);
      if (m == 0) T.x = -1e9; else if (m == 1) T.y = -1e9; else T.z = -1e9;
    }
  }
  col += (fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) - .5) / 170.;
  gl_FragColor = vec4(col, 1.);
}`;function compile(type, src) {
  const sh = gl.createShader(type); gl.shaderSource(sh, src); gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(sh));
  return sh;
}
const prog = gl.createProgram();
gl.attachShader(prog, compile(gl.VERTEX_SHADER, VS)); gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FS));
gl.linkProgram(prog); gl.useProgram(prog);
gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
gl.enableVertexAttribArray(0); gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
const U = Object.fromEntries(['uC', 'uP', 'uS', 'uT', 'uG', 'uB1', 'uB2', 'uV', 'uQ'].map((n) => [n, gl.getUniformLocation(prog, n)]));
const tex = gl.createTexture();
gl.bindTexture(gl.TEXTURE_2D, tex);
gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, WIDTH, HEIGHT, 0, gl.RGBA, gl.UNSIGNED_BYTE, texData);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
const texG = gl.createTexture(), glowData = new Uint8Array(1024), tmpG = new Float32Array(768);
gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, texG);
gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, WIDTH, HEIGHT, 0, gl.RGBA, gl.UNSIGNED_BYTE, glowData);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, tex);
gl.uniform1i(U.uT, 0); gl.uniform1i(U.uG, 1);
const GK = [0.027, 0.065, 0.121, 0.176, 0.222, 0.176, 0.121, 0.065, 0.027];
function blurGlow() { // сильне розмиття по колу й по висоті: світло "розтікається" плавно, без смуг
  for (let y = 0; y < HEIGHT; y++) for (let x = 0; x < WIDTH; x++) for (let k = 0; k < 3; k++) {
    let a = 0; for (let d = -4; d <= 4; d++) a += texData[(y * WIDTH + ((x + d + WIDTH) & 15)) * 4 + k] * GK[d + 4];
    tmpG[(y * WIDTH + x) * 3 + k] = a;
  }
  for (let y = 0; y < HEIGHT; y++) for (let x = 0; x < WIDTH; x++) {
    for (let k = 0; k < 3; k++) {
      let a = 0; for (let d = -4; d <= 4; d++) a += tmpG[(constrain(y + d, 0, HEIGHT - 1) * WIDTH + x) * 3 + k] * GK[d + 4];
      glowData[(y * WIDTH + x) * 4 + k] = a;
    }
    glowData[(y * WIDTH + x) * 4 + 3] = 255;
  }
}

// ---------- розкладка ----------
// Телефон: лампа на весь екран; коли відкрита вкладка, вона стає мініатюрою в лівому верхньому куті (#mini-slot), а вкладка займає решту екрана.
// ПК: праворуч постійна панель, лампа по центру решти місця.
const lay = { x: 0, y: 0, tilt: 18, init: false, R: 1, H: 1, sR: 0 };
let desk = false, openTab = null, box = { x: 0, y: 70, w: innerWidth, h: innerHeight / 2 }, slotC = { x: 46, y: 70 }, bgRgb = [[0.07, 0.06, 0.05], [0.04, 0.035, 0.03]];
function measureDock() {
  desk = matchMedia('(min-width:900px) and (min-height:480px)').matches;
  const top = $('top').getBoundingClientRect(), dock = $('dock').getBoundingClientRect(), sl = $('mini-slot').getBoundingClientRect();
  slotC = { x: sl.left + sl.width / 2, y: sl.top + sl.height / 2 + 2, h: sl.height };
  const right = desk ? $('panel').getBoundingClientRect().left - 16 : innerWidth, t = top.bottom - 24;
  box = { x: 0, y: t, w: Math.max(right, 120), h: Math.max(dock.top - t - (desk ? 36 : 96), 80) };
  dirty = true;
}
function updateLayout(dt) {
  const mini = !desk && !!openTab;
  lay.R = mini ? constrain(slotC.h / 4.2, 12, 30) : constrain(Math.min(box.w * (desk ? 0.24 : 0.3), box.h / 4.9, 250) * sim.size / 100, 12, 260); lay.H = lay.R * 3.7;
  const tx = mini ? slotC.x : box.x + box.w / 2, ty = mini ? slotC.y : box.y + box.h / 2, tt = mini ? 0 : sim.tilt;
  const k = lay.init ? 1 - Math.exp(-dt / 120) : 1; lay.init = true;
  const moving = Math.abs(tx - lay.x) + Math.abs(ty - lay.y) + Math.abs(tt - lay.tilt) + Math.abs(lay.R - lay.sR) > 0.05;
  lay.sR += (lay.R - lay.sR) * (lay.sR ? k : 1);
  lay.x += (tx - lay.x) * k; lay.y += (ty - lay.y) * k; lay.tilt += (tt - lay.tilt) * k;
  frameMoving = moving; return moving;
}
let frameMoving = false;
function resize() {
  const d = Math.max(Math.min(devicePixelRatio || 1, 2), 1.5) * dprScale * sim.quality;
  canvas.width = Math.round(innerWidth * d); canvas.height = Math.round(innerHeight * d);
  gl.viewport(0, 0, canvas.width, canvas.height); measureDock(); dirty = true;
}

// ---------- кадр ----------
let skipAcc = 0;
function frame(now) {
  requestAnimationFrame(frame);
  skipAcc += now - last; last = now;
  if (sim.fps < 60 && skipAcc < 1000 / sim.fps - 2) return; // обмеження FPS
  const dt = Math.min(skipAcc, 100); skipAcc = 0;
  const fp = Math.min((now - lvAt) / 700, 1);
  level = lvFrom + (lvTo - lvFrom) * fp * fp * (3 - 2 * fp);
  const moving = updateLayout(dt);
  if (!(level > 0.001 || fp < 1 || dirty || moving || shellLit > 0.002)) return; // вимкнена й нерухома - не малюємо
  dirty = false;

  let a = 1;
  if (level > 0.001) {
    tickAcc += dt;
    if (tickAcc >= TICK_MS) { tickAcc = Math.min(tickAcc - TICK_MS, TICK_MS); prev.set(cur); runTick(); }
    a = sim.smooth ? tickAcc / TICK_MS : 1; // між кроками ефекту кадри плавно змішуються
  }
  let xf = 1;
  if (xfadeAt >= 0) { xf = Math.min((now - xfadeAt) / 750, 1); xf = xf * xf * (3 - 2 * xf); if (xf >= 1) xfadeAt = -1; }
  let sum = 0;
  for (let i = 0; i < NUM_LEDS; i++) {
    let m = 0;
    const row = Y_ZERO_AT_BOTTOM ? i : (HEIGHT - 1 - (i >> 4)) * WIDTH + (i & 15);
    for (let k = 0; k < 3; k++) {
      const j = i * 3 + k; let v = prev[j] + (cur[j] - prev[j]) * a;
      if (xf < 1) v = snap[j] + (v - snap[j]) * xf;
      shown[j] = v; texData[row * 4 + k] = v + Math.random(); if (v > m) m = v;
    }
    texData[row * 4 + 3] = 255; sum += m;
  }
  const target = level > 0.001 ? Math.pow(constrain(sum / 255 / NUM_LEDS * 1.3, 0, 1), 0.9) * level : 0;
  shellLit += (target - shellLit) * (1 - Math.exp(-dt / 450));
  if (Math.abs(target - shellLit) < 0.002) shellLit = target;

  gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, WIDTH, HEIGHT, gl.RGBA, gl.UNSIGNED_BYTE, texData);
  blurGlow(); gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, texG);
  gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, WIDTH, HEIGHT, gl.RGBA, gl.UNSIGNED_BYTE, glowData);
  gl.activeTexture(gl.TEXTURE0);
  const d = canvas.width / innerWidth, ph = lay.tilt * Math.PI / 180, cs = Math.cos(ph);
  const bottom = lay.y + lay.sR * 3.7 * cs / 2;
  gl.uniform2f(U.uC, lay.x * d, (innerHeight - bottom) * d);
  gl.uniform4f(U.uP, lay.sR * d, lay.sR * 3.7 * d, Math.sin(ph), cs);
  gl.uniform3f(U.uS, level * state.brightness / 100, shellLit, sim.glow / 100);
  gl.uniform3f(U.uB1, ...bgRgb[0]); gl.uniform3f(U.uB2, ...bgRgb[1]); gl.uniform2f(U.uV, canvas.width, canvas.height);
  gl.drawArrays(gl.TRIANGLES, 0, 3);

  avgDt += (dt - avgDt) * 0.05;
  if (sim.auto && now > qualityAt && avgDt > 26 && dprScale > 0.75 && document.visibilityState === 'visible') {
    dprScale -= 0.2; qualityAt = now + 3000; avgDt = 16; resize();
  }
  const fe = $('fps-counter'), show = sim.showFps || location.hash === '#debug';
  fe.hidden = !show; if (show) fe.textContent = `${Math.round(1000 / Math.max(avgDt, 1))} FPS · ${canvas.width}×${canvas.height}`;
}


;

/* === app.js === */
'use strict';
// Інтерфейс: стан, сцени, розклад, вкладки, жести. Рушій (годинник, WebGL, кадр) - у sketch.js, ефекти - в effects.js.

// ---------- стан, збереження ----------
const VERSION = '20';
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
  $('lamp-name').value = state.lampName; $('lamp-id').value = state.lampId; $('about-foot').textContent = t('about.foot', { v: VERSION, id: state.lampId });
  $('conn-addr').value = ui.addr; if (!$('conn-status').dataset.set) $('conn-status').textContent = t('conn.none');
  $('alarm-on').checked = state.alarm.on; $('alarm-time').value = state.alarm.time; $('alarm-dur').value = state.alarm.dur; $('alarm-dur-val').textContent = `${state.alarm.dur} ${t('sun.min')}`;
  $('cur-sum').innerHTML = `<span class="strip" style="background:${fxThumb(eff)}"></span><span class="txt"><b>${fxName(eff)}</b><small>${state.speed.toFixed(1)}× · ${Math.round(sv)}%</small></span><span class="dots">${eff.colors ? dots(state.colors, eff.colors) : ''}</span>`;
  document.querySelectorAll('[data-curve]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.curve === state.brightnessCurve)));
  document.querySelectorAll('[data-lang]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === LANG)));
  document.querySelectorAll('[data-seg]').forEach((g) => g.querySelectorAll('button').forEach((b) => b.setAttribute('aria-pressed', String(Number(b.dataset.v) === sim[g.dataset.seg]))));
  document.querySelectorAll('[data-sim]').forEach((c) => { c.checked = !!sim[c.dataset.sim]; });
  document.querySelectorAll('[data-simr]').forEach((r) => { r.value = sim[r.dataset.simr]; $(`${r.dataset.simr}-val`).textContent = r.dataset.simr === 'tilt' ? `${sim.tilt}°` : `${sim[r.dataset.simr]}%`; });
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
  $('lamp-name').addEventListener('change', (e) => change({ lampName: e.target.value.trim() || 'Smart Lamp' }));
  $('lamp-id').addEventListener('change', (e) => change({ lampId: e.target.value.trim() || randomId() }, true));
  $('lamp-id-rand').addEventListener('click', () => change({ lampId: randomId() }, true));
  $('conn-check').addEventListener('click', async () => {
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


;

/* === updater.js === */
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


;

/* === lamp-link.js === */
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


;

