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
