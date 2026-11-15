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
    'set.lamp': 'Лампа', 'set.lang': 'Мова', 'set.bri': 'Яскравість', 'set.look': 'Вигляд', 'set.data': 'Дані', 'set.about': 'Про застосунок',
    'set.hw': 'Світлодіоди', 'hw.leds': 'Кількість LED', 'hw.save': 'Застосувати', 'hw.saving': 'Збереження...', 'hw.saved': 'Збережено! Лампа перезавантажується...',
    'hw.hint': 'Для вашої стрічки вкажіть точну кількість (зараз 20). При зміні кількості лампа перезавантажиться.',
    'time.title': 'Годинник лампи', 'time.sync': 'Синхронізувати час', 'time.syncing': 'Синхронізація...', 'time.synced': 'Час синхронізовано з пристроєм!',
    'time.hint': 'Потрібно для світанку та розкладу. Лампа також автоматично синхронізує час через NTP.',
    'wifi.title': 'Статус лампи', 'wifi.network': 'Wi-Fi мережа', 'wifi.ip': 'IP адреса', 'wifi.signal': 'Сигнал Wi-Fi', 'sys.fw': 'Прошивка',
    'lamp.name': 'Назва лампи', 'lamp.hint': 'Назва відображається в заголовку застосунку.',
    'bri.soft': 'М’яка', 'bri.lin': 'Лінійна', 'bri.prec': 'Точна', 'bri.hint': 'З яким характером повзунок яскравості змінює світло.',
    'look.style': 'Стиль', 'look.accent': 'Колір акценту', 'st.minimal': 'Мінімалізм', 'st.gradient': 'Градієнт', 'st.midnight': 'Північ', 'st.sunset': 'Захід',
    'data.export': 'Експорт налаштувань', 'data.import': 'Імпорт налаштувань', 'data.resetp': 'Скинути збережені', 'data.resetall': 'Скинути все',
    'data.hint': 'Налаштування зберігаються в пам’яті браузера.',
    'about.foot': 'Smart Lamp v{v}', 'look.apply': 'Застосувати', 'toast.applied': 'Застосовано',
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
    'set.lamp': 'Lamp', 'set.lang': 'Language', 'set.bri': 'Brightness', 'set.look': 'Appearance', 'set.data': 'Data', 'set.about': 'About',
    'set.hw': 'Hardware LEDs', 'hw.leds': 'LED Count', 'hw.save': 'Apply', 'hw.saving': 'Saving...', 'hw.saved': 'Saved! Lamp is rebooting...',
    'hw.hint': 'Set exact LED count for your strip (currently 20). Lamp reboots when changed.',
    'time.title': 'Lamp Clock', 'time.sync': 'Sync Time', 'time.syncing': 'Syncing...', 'time.synced': 'Time synced with device!',
    'time.hint': 'Used for sunrise and schedules. The lamp also syncs automatically via NTP.',
    'wifi.title': 'Lamp Status', 'wifi.network': 'Wi-Fi Network', 'wifi.ip': 'IP Address', 'wifi.signal': 'Wi-Fi Signal', 'sys.fw': 'Firmware',
    'lamp.name': 'Lamp name', 'lamp.hint': 'Name appears in the app title header.',
    'bri.soft': 'Soft', 'bri.lin': 'Linear', 'bri.prec': 'Precise', 'bri.hint': 'How the brightness slider maps to the light.',
    'look.style': 'Style', 'look.accent': 'Accent color', 'st.minimal': 'Minimal', 'st.gradient': 'Gradient', 'st.midnight': 'Midnight', 'st.sunset': 'Sunset',
    'data.export': 'Export settings', 'data.import': 'Import settings', 'data.resetp': 'Reset saved', 'data.resetall': 'Reset everything',
    'data.hint': 'Settings are stored in browser storage.',
    'about.foot': 'Smart Lamp v{v}', 'look.apply': 'Apply', 'toast.applied': 'Applied',
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
