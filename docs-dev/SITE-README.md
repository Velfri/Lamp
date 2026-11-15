# Smart Lamp — сайт проєкту

Цю теку публікує GitHub Actions на GitHub Pages: <https://velfri.github.io/Lamp/>

| Файл | Призначення |
|---|---|
| `index.html` | сторінка проєкту (UA/EN, живі ефекти лампи) |
| `assets/data.js` | версії, можливості, інструкції, FAQ, API — **правте тексти тут** |
| `assets/effects.js` | **генерується** з `src/effects.js` (`node tools/build-site.mjs`) |
| `assets/app.js`, `i18n.js`, `style.css` | логіка сторінки, переклади, стилі |
| `releases/index.json` | історія зібраних прошивок (оновлює CI) |
| `releases/manifest.json` | **генерується**; його читає лампа для автооновлення |
| `releases/*.bin` | зібрані прошивки (додає CI) |

Локальний перегляд:

```bash
node tools/build-site.mjs
python3 -m http.server 8000 -d site
```

> Не редагуйте згенеровані файли вручну — їх перезапише `tools/build-site.mjs`.
