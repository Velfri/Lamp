// Професійний рушій ефектів Smart Lamp
// Ідеально адаптується як під коротку стрічку (20-60 LED), так і під матрицю 16x16 (256 LED).
#pragma once
#include <stdint.h>
#include <string.h>
#include <math.h>

struct RGB { uint8_t r, g, b; };

struct LampState {
  bool power = true;
  char mode[24] = "fire";
  int brightness = 100;
  float speed = 1.0f;
  float scale = 1.0f;
  uint32_t colors[3] = {0xff7420, 0x12081f, 0xffd9a0};
  String alarmJson = "{\"on\":false,\"time\":\"07:00\",\"dur\":20}";
  String schedJson = "[]";
};

static const char* const FX_MODES[] = {
  "fire", "mono", "gradient", "rainbow", "breathe", "colorloop",
  "flame", "matrix", "candle", "police", "waves", "sparkle", "stripes", "sunrise"
};
static const int FX_MODE_COUNT = sizeof(FX_MODES) / sizeof(FX_MODES[0]);
static const double FX_PHASE_WRAP_MS = 3600000.0;

inline bool fxSupported(const char* m) {
  for (int i = 0; i < FX_MODE_COUNT; i++) if (strcmp(FX_MODES[i], m) == 0) return true;
  return true;
}

inline uint8_t toByte(float v) {
  if (v <= 0.0f) return 0;
  if (v >= 255.0f) return 255;
  return (uint8_t)(v + 0.5f);
}

inline RGB unpackColor(uint32_t c) {
  return RGB{(uint8_t)(c >> 16), (uint8_t)(c >> 8), (uint8_t)c};
}

inline float fract01(float v) { return v - floorf(v); }

inline RGB mixColor(RGB a, RGB b, float t) {
  if (t <= 0.0f) return a;
  if (t >= 1.0f) return b;
  return RGB{
    toByte(a.r + (b.r - a.r) * t),
    toByte(a.g + (b.g - a.g) * t),
    toByte(a.b + (b.b - a.b) * t)
  };
}

inline RGB hsvColor(float h, float s, float v) {
  h = fract01(h) * 6.0f;
  int i = (int)h;
  float f = h - i, p = v * (1.0f - s), q = v * (1.0f - s * f), t = v * (1.0f - s * (1.0f - f)), r, g, b;
  switch (i % 6) {
    case 0: r = v; g = t; b = p; break;
    case 1: r = q; g = v; b = p; break;
    case 2: r = p; g = v; b = t; break;
    case 3: r = p; g = q; b = v; break;
    case 4: r = t; g = p; b = v; break;
    default: r = v; g = p; b = q; break;
  }
  return RGB{toByte(r * 255.0f), toByte(g * 255.0f), toByte(b * 255.0f)};
}

inline RGB paletteColor(const LampState& s, float k) {
  k = fract01(k) * 3.0f;
  int i = (int)k;
  if (i > 2) i = 2;
  return mixColor(unpackColor(s.colors[i]), unpackColor(s.colors[(i + 1) % 3]), k - i);
}

inline int getPixelIndex(int x, int y, int w = 16, int h = 16, bool zigzag = true) {
  if (x < 0) x = 0; if (x >= w) x = w - 1;
  if (y < 0) y = 0; if (y >= h) y = h - 1;
  return (zigzag && (y & 1)) ? (y * w + (w - 1 - x)) : (y * w + x);
}

// Плавний шум без важких розрахунків
inline float smoothNoise(float x, float t) {
  return 0.5f + 0.35f * sinf(x * 1.5f + t) + 0.15f * sinf(x * 3.2f - t * 1.7f);
}

// Рендер кадру
inline void renderFrame(RGB* out, int n, const LampState& s, float phaseMs, float gain) {
  if (n <= 0) return;
  if (!s.power) gain = 0.0f;
  float scale = s.scale < 0.25f ? 0.25f : s.scale;
  float tSec = phaseMs / 1000.0f;
  RGB c0 = unpackColor(s.colors[0]);
  RGB c1 = unpackColor(s.colors[1]);
  RGB c2 = unpackColor(s.colors[2]);

  // ---------- РЕЖИМ 1: СТРІЧКА (до 64 LED, наприклад 20 світлодіодів) ----------
  if (n < 64) {
    if (strcmp(s.mode, "fire") == 0 || strcmp(s.mode, "flame") == 0) {
      bool isCustom = (strcmp(s.mode, "flame") == 0);
      for (int i = 0; i < n; i++) {
        float pos = (float)i / (n - 1); // 0 = основа полум'я, 1 = кінчик
        float flicker = smoothNoise((float)i * 1.2f, tSec * 5.0f) * 0.35f;
        float heat = (1.0f - pos * 0.85f) + flicker;
        if (heat < 0.0f) heat = 0.0f;
        if (heat > 1.0f) heat = 1.0f;

        RGB pix;
        if (isCustom) {
          pix = mixColor(c1, c0, heat);
        } else {
          // Реалістичне вогнище: теплий золотий корінь -> насичений помаранчевий -> червоний
          if (heat > 0.7f) {
            pix = mixColor(RGB{255, 140, 20}, RGB{255, 230, 160}, (heat - 0.7f) / 0.3f);
          } else if (heat > 0.3f) {
            pix = mixColor(RGB{230, 40, 0}, RGB{255, 140, 20}, (heat - 0.3f) / 0.4f);
          } else {
            pix = mixColor(RGB{0, 0, 0}, RGB{230, 40, 0}, heat / 0.3f);
          }
        }
        out[i] = RGB{toByte(pix.r * gain), toByte(pix.g * gain), toByte(pix.b * gain)};
      }
      return;
    }

    if (strcmp(s.mode, "candle") == 0) {
      // Свічка: м'яке органічне мерехтіння всього полум'я
      float flicker = 0.75f + 0.25f * (0.6f * sinf(tSec * 6.5f) + 0.4f * sinf(tSec * 14.2f));
      RGB baseAmber = (s.colors[0] == 0xff7420) ? RGB{255, 120, 25} : c0;
      for (int i = 0; i < n; i++) {
        float localFlick = flicker + 0.08f * sinf((float)i * 0.8f + tSec * 10.0f);
        if (localFlick > 1.0f) localFlick = 1.0f;
        out[i] = RGB{toByte(baseAmber.r * localFlick * gain), toByte(baseAmber.g * localFlick * gain), toByte(baseAmber.b * localFlick * gain)};
      }
      return;
    }

    if (strcmp(s.mode, "matrix") == 0) {
      // Біжучий цифровий імпульс зі шлейфом
      float headPos = fmodf(tSec * 12.0f * scale, (float)(n + 8));
      for (int i = 0; i < n; i++) {
        float dist = headPos - (float)i;
        float b = 0.0f;
        if (dist >= 0.0f && dist < 1.0f) b = 1.0f;
        else if (dist >= 1.0f && dist < 7.0f) b = (7.0f - dist) / 6.0f;
        RGB pix = mixColor(c1, c0, b);
        out[i] = RGB{toByte(pix.r * gain), toByte(pix.g * gain), toByte(pix.b * gain)};
      }
      return;
    }

    if (strcmp(s.mode, "waves") == 0) {
      // Плавні широкі хвилі
      for (int i = 0; i < n; i++) {
        float w = 0.5f + 0.5f * sinf(((float)i / n) * 4.0f / scale - tSec * 2.5f);
        RGB pix = mixColor(c0, c1, w);
        out[i] = RGB{toByte(pix.r * gain), toByte(pix.g * gain), toByte(pix.b * gain)};
      }
      return;
    }

    if (strcmp(s.mode, "sparkle") == 0) {
      for (int i = 0; i < n; i++) {
        float sp = smoothNoise((float)i * 2.5f, tSec * 4.0f);
        RGB pix = (sp > 0.82f) ? RGB{255, 255, 255} : c0;
        out[i] = RGB{toByte(pix.r * gain), toByte(pix.g * gain), toByte(pix.b * gain)};
      }
      return;
    }

    if (strcmp(s.mode, "sunrise") == 0) {
      for (int i = 0; i < n; i++) {
        float progress = (float)i / (n - 1);
        RGB pix = mixColor(RGB{255, 50, 0}, RGB{255, 220, 160}, progress);
        out[i] = RGB{toByte(pix.r * gain), toByte(pix.g * gain), toByte(pix.b * gain)};
      }
      return;
    }
  }

  // ---------- РЕЖИМ 2: 2D МАТРИЦЯ (16x16 = 256 LED) ----------
  if (n >= 64) {
    const int W = 16, H = (n >= 256) ? 16 : (n / 8);

    if (strcmp(s.mode, "fire") == 0 || strcmp(s.mode, "flame") == 0) {
      bool customFlame = (strcmp(s.mode, "flame") == 0);
      for (int y = 0; y < H; y++) {
        for (int x = 0; x < W; x++) {
          float nx = (float)x / (W * scale);
          float n1 = sinf(nx * 6.28f + tSec * 2.5f) * 0.25f;
          float n2 = cosf(nx * 12.56f - tSec * 4.0f) * 0.15f;
          float heat = (1.0f - (float)y / H) + n1 + n2;
          heat += (smoothNoise(x, y + tSec * 10.0f) - 0.5f) * 0.25f;
          if (heat < 0.0f) heat = 0.0f;
          if (heat > 1.0f) heat = 1.0f;

          RGB pix;
          if (customFlame) {
            pix = mixColor(c1, c0, heat);
          } else {
            if (heat < 0.35f) pix = mixColor(RGB{0, 0, 0}, RGB{255, 30, 0}, heat / 0.35f);
            else if (heat < 0.75f) pix = mixColor(RGB{255, 30, 0}, RGB{255, 180, 20}, (heat - 0.35f) / 0.4f);
            else pix = mixColor(RGB{255, 180, 20}, RGB{255, 240, 200}, (heat - 0.75f) / 0.25f);
          }
          int idx = getPixelIndex(x, y, W, H);
          if (idx < n) out[idx] = RGB{toByte(pix.r * gain), toByte(pix.g * gain), toByte(pix.b * gain)};
        }
      }
      return;
    }

    if (strcmp(s.mode, "matrix") == 0) {
      for (int y = 0; y < H; y++) {
        for (int x = 0; x < W; x++) {
          float dropY = fmodf(tSec * 10.0f + (float)x * 2.3f, (float)(H + 4));
          float dist = fabsf((float)(H - 1 - y) - dropY);
          float b = 0.0f;
          if (dist < 1.0f) b = 1.0f;
          else if (dist < 5.0f) b = (5.0f - dist) / 4.0f;
          RGB pix = mixColor(c1, c0, b);
          int idx = getPixelIndex(x, y, W, H);
          if (idx < n) out[idx] = RGB{toByte(pix.r * gain), toByte(pix.g * gain), toByte(pix.b * gain)};
        }
      }
      return;
    }
  }

  // ---------- УНІВЕРСАЛЬНІ ЕФЕКТИ (Стрічка або матриця) ----------
  float breathe = 0.15f + 0.85f * (0.5f + 0.5f * sinf(phaseMs * 6.2831853f / 3500.0f));

  for (int i = 0; i < n; i++) {
    float x = ((float)i / n) / scale;
    RGB c;

    if (strcmp(s.mode, "gradient") == 0) {
      c = paletteColor(s, x + phaseMs / 12000.0f);
    } else if (strcmp(s.mode, "rainbow") == 0) {
      c = hsvColor(x + phaseMs / 7000.0f, 1.0f, 1.0f);
    } else if (strcmp(s.mode, "colorloop") == 0) {
      c = hsvColor(phaseMs / 12000.0f, 1.0f, 1.0f);
    } else if (strcmp(s.mode, "breathe") == 0) {
      c = RGB{toByte(c0.r * breathe), toByte(c0.g * breathe), toByte(c0.b * breathe)};
    } else if (strcmp(s.mode, "police") == 0) {
      bool left = (i < (n / 2));
      bool phase = fmodf(phaseMs, 500.0f) < 250.0f;
      c = (left == phase) ? RGB{255, 0, 0} : RGB{0, 60, 255};
    } else if (strcmp(s.mode, "stripes") == 0) {
      float st = fmodf(x * 3.0f + phaseMs / 2000.0f, 1.0f);
      c = (st < 0.5f) ? c0 : c1;
    } else {
      c = c0; // mono за замовчуванням
    }

    out[i] = RGB{toByte(c.r * gain), toByte(c.g * gain), toByte(c.b * gain)};
  }
}
