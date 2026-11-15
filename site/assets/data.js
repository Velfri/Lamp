// ===== Smart Lamp — дані сайту (українська + англійська) =====
// Щоб додати нову версію: додайте запис у RELEASES (перший = найновіший).
// Якщо збірка прошивки лежить за шляхом з поля file — сайт автоматично
// покаже кнопку «Завантажити» і дасть перевірити SHA-256.
window.LAMP = {
  repo: 'Velfri/Lamp',
  board: {
    name: { uk: 'ESP32-C3 Super Mini', en: 'ESP32-C3 Super Mini' },
    chip: { uk: 'ESP32-C3 (RISC-V, 160 МГц, Wi-Fi 2.4 ГГц)', en: 'ESP32-C3 (RISC-V, 160 MHz, 2.4 GHz Wi-Fi)' },
    flash: { uk: '4 МБ · з OTA-розділом', en: '4 MB · with an OTA partition' },
    led: { uk: 'стрічка/матриця WS2812B (NeoPixel) на GPIO 0–7, 10', en: 'WS2812B (NeoPixel) strip/matrix on GPIO 0–7, 10' },
    power: { uk: '5 В / до 2 А (залежить від кількості LED)', en: '5 V / up to 2 A (depends on the LED count)' },
  },

  // Поточна прошивка в espcode/espcode.ino (FW_VERSION)
  firmware: '2.1.0',

  // Прошивки, які лампа може встановити сама через інтернет.
  // file — шлях від кореня гілки gh-pages; size/sha256 заповнює CI-білд.
  releases: [
    {
      version: '2.1.0',
      date: '2026-11-15',
      file: 'releases/smart-lamp-2.1.0.bin',
      size: null,
      sha256: null,
      notes: {
        uk: [
          'PWA-застосунок просто у флеш-пам’яті лампи: працює без інтернету',
          'Понад 30 ефектів з масштабом, швидкістю та власними палітрами',
          'Розклад вмикання/вимикання та будильник «Світанок» у самій лампі',
          'Оновлення по повітрю (OTA): з файлу або прямо з цього сайту',
          'Автоматична перевірка й завантаження оновлень із цього сайту',
          'Перевірка SHA-256: пошкоджене чи обірване оновлення не встановиться',
        ],
        en: [
          'PWA app stored in the lamp’s own flash: works without internet',
          '30+ effects with scale, speed and custom palettes',
          'On-lamp on/off schedule and the “Sunrise” alarm',
          'Over-the-air updates (OTA): from a file or straight from this site',
          'Automatic check and download of updates from this site',
          'SHA-256 verification: a corrupt or partial download is rejected',
        ],
      },
    },
  ],

  features: [
    {
      icon: 'fx',
      title: { uk: '30+ ефектів', en: '30+ effects' },
      text: {
        uk: 'Вогонь, аврора, океан, матриця, феєрверк, свічка… усі — з швидкістю, масштабом і власними кольорами.',
        en: 'Fire, aurora, ocean, matrix, fireworks, candle… all with speed, scale and custom colors.',
      },
    },
    {
      icon: 'wifi',
      title: { uk: 'Wi-Fi та mDNS', en: 'Wi-Fi & mDNS' },
      text: {
        uk: 'Лампа піднімає власний вебсервер. Підключіться до smart-lamp.local — і керуйте з телефона чи ПК.',
        en: 'The lamp runs its own web server. Open smart-lamp.local and control it from any phone or PC.',
      },
    },
    {
      icon: 'clock',
      title: { uk: 'Розклад і світанок', en: 'Schedule & sunrise' },
      text: {
        uk: 'Лампа сама вмикається й гасне за розкладом, а вранці плавно розгорається теплим світлом.',
        en: 'The lamp turns itself on and off on schedule, and gently brightens with warm light in the morning.',
      },
    },
    {
      icon: 'saved',
      title: { uk: 'Сцени та кольори', en: 'Scenes & colors' },
      text: {
        uk: 'Зберігайте улюблені налаштування, перемикайте їх свайпом, обирайте палітри одним дотиком.',
        en: 'Save your favourite setups, swipe between them, pick palettes with one tap.',
      },
    },
    {
      icon: 'upd',
      title: { uk: 'Оновлення по повітрю', en: 'OTA updates' },
      text: {
        uk: 'Нова прошивка ставиться з браузера або автоматично, коли лампа має інтернет. Налаштування зберігаються.',
        en: 'New firmware installs from the browser or automatically when the lamp is online. Settings are kept.',
      },
    },
    {
      icon: 'install',
      title: { uk: 'Як застосунок', en: 'Installable app' },
      text: {
        uk: 'Сторінка лампи — це PWA: додайте її на головний екран, і вона працюватиме навіть без мережі.',
        en: 'The lamp page is a PWA: add it to your home screen and it keeps working offline.',
      },
    },
  ],

  specs: [
    { k: { uk: 'Мікроконтролер', en: 'Microcontroller' }, v: { uk: 'ESP32-C3 Super Mini, RISC-V 160 МГц', en: 'ESP32-C3 Super Mini, RISC-V 160 MHz' } },
    { k: { uk: 'Пам’ять', en: 'Memory' }, v: { uk: '4 МБ flash, OTA-розділ для безпечних оновлень', en: '4 MB flash, OTA partition for safe updates' } },
    { k: { uk: 'Світлодіоди', en: 'LEDs' }, v: { uk: 'WS2812B / NeoPixel — стрічка або матриця 16×16', en: 'WS2812B / NeoPixel — strip or 16×16 matrix' } },
    { k: { uk: 'Кількість LED', en: 'LED count' }, v: { uk: '1–1024, задається у застосунку', en: '1–1024, set in the app' } },
    { k: { uk: 'Піни', en: 'Pins' }, v: { uk: 'GPIO 0–7, 10 (за замовчуванням 4)', en: 'GPIO 0–7, 10 (default 4)' } },
    { k: { uk: 'Частота кадрів', en: 'Frame rate' }, v: { uk: '50 FPS з плавними переходами', en: '50 FPS with smooth transitions' } },
    { k: { uk: 'Мережа', en: 'Network' }, v: { uk: 'Wi-Fi 2.4 ГГц, вебсервер, mDNS smart-lamp.local', en: '2.4 GHz Wi-Fi, web server, mDNS smart-lamp.local' } },
    { k: { uk: 'Час', en: 'Time' }, v: { uk: 'NTP + синхронізація з браузера, таймзона Києва', en: 'NTP + browser sync, Kyiv timezone' } },
    { k: { uk: 'Оновлення', en: 'Updates' }, v: { uk: 'OTA: /api/update/upload, /api/update/start, HTTPS-перевірка', en: 'OTA: /api/update/upload, /api/update/start, HTTPS check' } },
    { k: { uk: 'Живлення', en: 'Power' }, v: { uk: '5 В, до 2 А для повної яскравості', en: '5 V, up to 2 A at full brightness' } },
  ],

  // Встановлення прошивки
  install: {
    usb: {
      title: { uk: 'Через USB (перший раз)', en: 'Over USB (first time)' },
      steps: {
        uk: [
          'Встановіть Arduino IDE 2 і додайте ядро ESP32: <code>https://espressif.github.io/arduino-esp32/package_esp32_index.json</code> у «Налаштування → Додаткові посилання для менеджера плат».',
          'У менеджері плат встановіть <b>esp32</b> від Espressif Systems.',
          'Встановіть бібліотеки: <code>Adafruit NeoPixel</code> (Менеджер бібліотек).',
          'Відкрийте <code>espcode/espcode.ino</code>, заповніть <code>secrets.h</code> (назва й пароль Wi-Fi).',
          'Плата: <b>ESP32C3 Dev Module</b>, USB CDC On Boot: <b>Enabled</b>, Partition Scheme: <b>Minimal SPIFFS (1.9MB APP with OTA)</b>.',
          'Натисніть «Завантажити». Після перезапуску лампа підключиться до Wi-Fi і буде доступна на <code>smart-lamp.local</code>.',
        ],
        en: [
          'Install Arduino IDE 2 and add the ESP32 core: put <code>https://espressif.github.io/arduino-esp32/package_esp32_index.json</code> into Preferences → Additional Board Manager URLs.',
          'In Boards Manager install <b>esp32</b> by Espressif Systems.',
          'Install libraries: <code>Adafruit NeoPixel</code> (Library Manager).',
          'Open <code>espcode/espcode.ino</code> and fill in <code>secrets.h</code> (Wi-Fi name and password).',
          'Board: <b>ESP32C3 Dev Module</b>, USB CDC On Boot: <b>Enabled</b>, Partition Scheme: <b>Minimal SPIFFS (1.9MB APP with OTA)</b>.',
          'Press Upload. After reboot the lamp joins Wi-Fi and appears at <code>smart-lamp.local</code>.',
        ],
      },
    },
    ota: {
      title: { uk: 'По повітрю (оновлення)', en: 'Over the air (updates)' },
      steps: {
        uk: [
          'Завантажте <code>.bin</code> із цього сайту — або залиште лампу підключеною до Wi-Fi й інтернету.',
          'Відкрийте застосунок лампи → вкладка <b>Оновлення</b>.',
          'Натисніть «Оновити» (лампа скачає файл сама) або «Оновити з файлу .bin» (файл передасться з телефона).',
          'Дочекайтесь «Готово»: лампа перезапуститься, налаштування й сцени збережуться.',
        ],
        en: [
          'Download the <code>.bin</code> from this site — or keep the lamp connected to Wi-Fi and the internet.',
          'Open the lamp app → <b>Update</b> tab.',
          'Press “Update” (the lamp downloads the file itself) or “Update from a .bin file” (the file is sent from your phone).',
          'Wait for “Done”: the lamp reboots and keeps your settings and scenes.',
        ],
      },
    },
    webflash: {
      title: { uk: 'Прошивка з браузера (без IDE)', en: 'Flash from the browser (no IDE)' },
      steps: {
        uk: [
          'Переконайтеся, що на платі вже стоїть прошивка з OTA (розділ Minimal SPIFFS).',
          'Підключіть лампу до Wi-Fi; її IP покаже застосунок у розділі «Опції → Статус лампи».',
          'У застосунку відкрийте «Оновлення» → «Оновити з файлу .bin» і виберіть завантажений файл.',
          'Індикатор покаже завантаження, встановлення й перезапуск.',
        ],
        en: [
          'Make sure the board already runs firmware with OTA support (Minimal SPIFFS partition scheme).',
          'Connect the lamp to Wi-Fi; its IP is shown in the app under Options → Lamp status.',
          'In the app open Update → “Update from a .bin file” and choose the downloaded file.',
          'The indicator shows download, install and reboot.',
        ],
      },
    },
  },

  faq: [
    {
      q: { uk: 'Лампа сама оновлюється, якщо має інтернет?', en: 'Does the lamp update itself when it has internet?' },
      a: {
        uk: 'Так. Коли лампа підключена до Wi-Fi з виходом в інтернет, вкладка «Оновлення» перевіряє <code>https://velfri.github.io/Lamp/releases/manifest.json</code> і, якщо там новіша версія, пропонує або (за увімкненого автооновлення) ставить її сама. Файл завантажується на лампу й записується у OTA-розділ, після чого вона перезапускається.',
        en: 'Yes. When the lamp is on Wi-Fi with internet access, the Update tab checks <code>https://velfri.github.io/Lamp/releases/manifest.json</code> and, if a newer version is listed, offers it (or installs it automatically with auto-update on). The file is downloaded to the lamp and written to the OTA partition, then it reboots.',
      },
    },
    {
      q: { uk: 'Що станеться, якщо оновлення обірветься?', en: 'What if an update is interrupted?' },
      a: {
        uk: 'Запис іде в окремий OTA-розділ, тому робоча прошивка не пошкоджується: лампа просто продовжить працювати на старій версії. Не вимикайте живлення під час запису — це єдиний ризик.',
        en: 'Writes go to a separate OTA partition, so the working firmware is untouched: the lamp simply keeps running the old version. Do not cut power while flashing — that is the only risk.',
      },
    },
    {
      q: { uk: 'Лампа не бачить мережу — що робити?', en: 'The lamp can’t see the network — what now?' },
      a: {
        uk: 'Якщо Wi-Fi недоступний, лампа піднімає власну точку доступу <b>Smart-Lamp</b> (пароль <code>12345678</code>) — підключіться до неї й відкрийте <code>192.168.4.1</code>. Перевірте, що мережа 2.4 ГГц (ESP32-C3 не працює з 5 ГГц).',
        en: 'If Wi-Fi is unavailable the lamp starts its own hotspot <b>Smart-Lamp</b> (password <code>12345678</code>) — join it and open <code>192.168.4.1</code>. Make sure the network is 2.4 GHz (the ESP32-C3 has no 5 GHz radio).',
      },
    },
    {
      q: { uk: 'Як додати власний ефект?', en: 'How do I add my own effect?' },
      a: {
        uk: 'Ефекти живуть у <code>src/effects.js</code>: кожен — це чиста функція часу з доступом до <code>leds[]</code>, кольорів і шуму. Після зміни зберіть <code>index.html</code> та перезберіть прошивку — сайт і лампа покажуть новий ефект.',
        en: 'Effects live in <code>src/effects.js</code>: each is a pure function of time with access to <code>leds[]</code>, colors and noise. After editing, rebuild <code>index.html</code> and re-flash — both the site and the lamp show the new effect.',
      },
    },
  ],

  api: [
    { m: 'GET', p: '/api/status', d: { uk: 'Прошивка, uptime, heap, Wi-Fi, конфіг і стан', en: 'Firmware, uptime, heap, Wi-Fi, config and state' } },
    { m: 'POST', p: '/api/state', d: { uk: 'Живлення, ефект, яскравість, швидкість, кольори, сцени', en: 'Power, effect, brightness, speed, colors, scenes' } },
    { m: 'POST', p: '/api/config', d: { uk: 'Назва лампи, пін і кількість LED', en: 'Lamp name, pin and LED count' } },
    { m: 'POST', p: '/api/time', d: { uk: 'Синхронізація часу з браузера (epoch)', en: 'Time sync from the browser (epoch)' } },
    { m: 'GET', p: '/api/update/check', d: { uk: 'Поточна й доступна версія прошивки', en: 'Current and available firmware version' } },
    { m: 'POST', p: '/api/update/start', d: { uk: 'Лампа сама качає оновлення з інтернету', en: 'The lamp downloads the update itself' } },
    { m: 'POST', p: '/api/update/upload', d: { uk: 'Передати .bin файл напряму', en: 'Send a .bin file directly' } },
    { m: 'GET', p: '/api/update/status', d: { uk: 'Хід оновлення: download → write → reboot', en: 'Update progress: download → write → reboot' } },
  ],
};

// Дрібний хелпер для i18n
window.L = (obj, lang) => (obj && obj[lang] !== undefined ? obj[lang] : obj && obj.uk) || '';
