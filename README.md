# Smart Lamp

Розумна Wi-Fi лампа на **ESP32-C3 Super Mini**: власний вебзастосунок просто у флеш-пам'яті
лампи, 30+ ефектів, розклад, світанок і оновлення по повітрю (OTA).

| Що | Де |
|---|---|
| 🌐 Сайт проєкту (GitHub Pages) | <https://velfri.github.io/Lamp/> |
| 📦 Оновлення прошивки (`.bin`) | <https://velfri.github.io/Lamp/releases/manifest.json> |
| 📱 Вебзастосунок лампи | `index.html` — віддається самою лампою за `http://smart-lamp.local` |
| 🛠 Прошивка | `espcode/` (Arduino IDE / arduino-cli) |

## Як це працює

```
 браузер ──► сайт (GitHub Pages)          лампа (ESP32-C3)
   │        site/index.html                 espcode/espcode.ino
   │        site/releases/manifest.json ───► /api/update/check
   │        site/releases/*.bin  ◄────────── HTTPS GET + SHA-256
   │                                              │
   └──────► http://smart-lamp.local ◄─────────────┘
            (застосунок із флеш-пам'яті лампи)
```

- Коли лампа має інтернет, вкладка **Оновлення** перевіряє `manifest.json` на сайті проєкту,
  качає `.bin` по HTTPS, звіряє SHA-256 і записує його в OTA-розділ.
- Увімкнене **автооновлення** (за замовчуванням): лампа сама перевіряє сайт раз на 6 годин
  і ставить нову версію, навіть якщо ніхто не відкривав застосунок.
- Без інтернету лампа, як і раніше, працює локально: застосунок, розклад і сцени — у ній самій.

## Сайт (`site/`)

Статичний, без зовнішніх запитів і трекерів. Двомовний (UA/EN), показує живі ефекти лампи
на canvas, має інструкції для USB/OTA та кнопку завантаження прошивки з перевіркою SHA-256.

```bash
node tools/build-site.mjs          # збирає ефекти + маніфест, перевіряє посилання
python3 -m http.server 8000 -d site  # локальний перегляд
```

- `site/assets/data.js` — версії, можливості, інструкції, FAQ, API (правте тексти тут).
- `site/assets/effects.js` — **генерується** з `src/effects.js`, не редагуйте вручну.
- `site/releases/index.json` — історія зібраних прошивок; `manifest.json` генерується з нього.

## Збірка прошивки

Локально (Arduino IDE): плата **ESP32C3 Dev Module**, *USB CDC On Boot: Enabled*,
*Partition Scheme: Minimal SPIFFS (1.9MB APP with OTA)*, бібліотека `Adafruit NeoPixel`,
налаштування Wi-Fi — у `espcode/secrets.h`.

Через командний рядок:

```bash
arduino-cli compile --fqbn esp32:esp32:esp32c3:CDCOnBoot=cdc,PartitionScheme=min_spiffs --output-dir build espcode
```

> **Версія ядра ESP32.** Код сумісний і з ядром **3.x** (mbedtls 3.x, функції
> `mbedtls_sha256_starts/update/finish`), і з **2.x** — не використовуйте
> застарілі варіанти з суфіксом `_ret`, їх у mbedtls 3 прибрали. CI перевіряє
> це окремим лінтом до компіляції.

Після зміни вебзастосунку перезберіть його у прошивку:

```bash
# PowerShell / pwsh
pwsh ./build_index.ps1        # src/* -> index.html (+ .gz)
python3 tools/gen_web_assets.py  # index.html -> espcode/web_assets.h (gzip, ETag)
```

## GitHub Actions

`.github/workflows/publish-site.yml` на кожен пуш у `main`:

1. збирає сайт (`node tools/build-site.mjs`),
2. компілює прошивку в `.bin` (arduino-cli + ESP32 core),
3. кладе `.bin` у `site/releases/` і оновлює `index.json` + `manifest.json`,
4. публікує `site/` на GitHub Pages.

Пуш тегу `v*` (наприклад `git tag v2.1.0 && git push origin v2.1.0`) додатково створює
GitHub Release із цим `.bin`.

> **Перший запуск:** у *Settings → Pages* виберіть **Source: GitHub Actions**.
> Поки Pages не увімкнено, сайт не оновиться, хоча збірка пройде.

## API лампи

| Метод | Шлях | Призначення |
|---|---|---|
| GET | `/api/status` | прошивка, Wi-Fi, конфіг, стан |
| POST | `/api/state` | живлення, ефект, яскравість, кольори, сцени |
| POST | `/api/config` | назва, пін, кількість LED, `autoupdate` |
| POST | `/api/time` | синхронізація часу з браузера |
| GET | `/api/update/check` | поточна й доступна версія (читає сайт) |
| POST | `/api/update/start` | лампа сама качає й ставить оновлення |
| POST | `/api/update/upload` | передати `.bin` напряму |
| GET | `/api/update/status` | хід оновлення: `download → write → reboot` |
