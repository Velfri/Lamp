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
