// Smart Lamp v20 — Професійна прошивка для ESP32-C3 Super Mini
// Плата: ESP32C3 Dev Module
// USB CDC On Boot: Enabled
// Partition Scheme: Minimal SPIFFS (1.9MB APP with OTA) або Default 4MB

#include <WiFi.h>
#include <WebServer.h>
#include <Update.h>
#include <ESPmDNS.h>
#include <Preferences.h>
#include <Adafruit_NeoPixel.h>
#include <WiFiClientSecure.h>
#include <HTTPClient.h>
#include <mbedtls/sha256.h>
#include <time.h>
#include "secrets.h"
#include "web_assets.h"
#include "lamp_fx.h"

#define FW_VERSION "2.1.0"
#define DEV_CORS 1

// Звідки лампа бере оновлення, коли має інтернет (сайт проєкту на GitHub Pages).
// manifest.json містить версії, посилання на .bin і SHA-256.
#define UPDATE_MANIFEST_URL "https://velfri.github.io/Lamp/releases/manifest.json"
#define UPDATE_AUTO_INTERVAL_MS (6UL * 60UL * 60UL * 1000UL)  // авто-перевірка раз на 6 годин
#define UPDATE_AUTO_RETRY_MS (15UL * 60UL * 1000UL)          // повтор при помилці — раз на 15 хвилин
#define UPDATE_MAX_SIZE 0x3D0000                              // ~3.8 МБ — більше, ніж будь-який розділ

const int STATUS_LED_PIN = 8;              // вбудований синій LED на C3 Super Mini
const bool STATUS_LED_ACTIVE_LOW = true;
const uint8_t MAX_BRIGHTNESS = 255;        // обмеження максимальної яскравості (0..255)
const uint32_t FRAME_MS = 20;              // 50 FPS для плавної анімації
const uint32_t STATE_SAVE_DELAY_MS = 2000; // таймер збереження стану в NVS

// Дозволені GPIO на ESP32-C3 Super Mini (за замовчуванням пін 4)
const int ALLOWED_PINS[] = {0, 1, 2, 3, 4, 5, 6, 7, 10};

struct Config {
  String name;
  uint32_t id;
  int ledPin;
  int ledCount;
  bool autoUpdate;
};

Config cfg;
LampState lamp;
Preferences prefs;
WebServer server(80);

Adafruit_NeoPixel* strip = nullptr;
RGB* frame = nullptr;
RGB* shown = nullptr;
RGB* fadeFrom = nullptr;
float fadeT = 1.0f;
char lastMode[24] = "";
float viewColor[3][3];
float curScale = 1.0f;
float curGain = 0.0f;
bool viewInit = false;

double phaseMs = 0;
bool stateDirty = false;
uint32_t stateDirtyAt = 0;
bool restartPending = false;
uint32_t lastWifiTry = 0;
bool apModeActive = false;
bool timeSynced = false;

// ---------- Стан OTA ----------
struct OtaState {
  bool active = false;
  const char* phase = "idle";  // idle | download | write | reboot | error | done
  int progress = 0;             // 0..100
  String error;
  String latest;
  String notes;
  long size = 0;
  String sha256;
  uint32_t checkedAt = 0;
  uint32_t nextAutoAt = 0;
  bool autoUpdate = true;
};
OtaState ota;

// Таймзона України (Київ: UTC+2 із переходом на літній час UTC+3)
const char* TIMEZONE = "EET-2EEST,M3.5.0/3,M10.5.0/4";

// ---------- NVS Налаштування ----------
bool pinAllowed(int p) {
  for (int a : ALLOWED_PINS) if (a == p) return true;
  return false;
}

void saveConfig() {
  prefs.begin("lamp", false);
  prefs.putString("name", cfg.name);
  prefs.putUInt("id", cfg.id);
  prefs.putInt("ledPin", cfg.ledPin);
  prefs.putInt("ledCount", cfg.ledCount);
  prefs.putBool("autoUpdate", cfg.autoUpdate);
  prefs.end();
}

void loadConfig() {
  prefs.begin("lamp", false);
  cfg.name = prefs.getString("name", "Smart Lamp");
  cfg.id = prefs.getUInt("id", 0);
  cfg.ledPin = prefs.getInt("ledPin", 4);
  cfg.ledCount = prefs.getInt("ledCount", 20); // за замовчуванням 20 світлодіодів
  prefs.end();

  bool dirty = false;
  if (cfg.id == 0) {
    cfg.id = (uint32_t)ESP.getEfuseMac();
    if (cfg.id == 0) cfg.id = 1;
    dirty = true;
  }
  if (!pinAllowed(cfg.ledPin)) { cfg.ledPin = 4; dirty = true; }
  if (cfg.ledCount < 1 || cfg.ledCount > 1024) { cfg.ledCount = 20; dirty = true; }
  if (dirty) saveConfig();
}

// ---------- NVS Стан ----------
void saveState() {
  prefs.begin("state", false);
  prefs.putBool("pw", lamp.power);
  prefs.putString("mode", lamp.mode);
  prefs.putInt("bri", lamp.brightness);
  prefs.putFloat("spd", lamp.speed);
  prefs.putFloat("scl", lamp.scale);
  prefs.putUInt("c0", lamp.colors[0]);
  prefs.putUInt("c1", lamp.colors[1]);
  prefs.putUInt("c2", lamp.colors[2]);
  prefs.putString("alarm", lamp.alarmJson);
  prefs.putString("sched", lamp.schedJson);
  prefs.end();
}

void loadState() {
  prefs.begin("state", false);
  lamp.power = prefs.getBool("pw", true);
  String m = prefs.getString("mode", "fire");
  strncpy(lamp.mode, m.c_str(), sizeof(lamp.mode) - 1);
  lamp.mode[sizeof(lamp.mode) - 1] = 0;
  lamp.brightness = constrain(prefs.getInt("bri", 100), 0, 100);
  lamp.speed = prefs.getFloat("spd", 1.0f);
  lamp.scale = prefs.getFloat("scl", 1.0f);
  lamp.colors[0] = prefs.getUInt("c0", 0xff7420);
  lamp.colors[1] = prefs.getUInt("c1", 0x12081f);
  lamp.colors[2] = prefs.getUInt("c2", 0xffd9a0);
  lamp.alarmJson = prefs.getString("alarm", "{\"on\":false,\"time\":\"07:00\",\"dur\":20}");
  lamp.schedJson = prefs.getString("sched", "[]");
  prefs.end();

  if (!(lamp.speed >= 0.1f && lamp.speed <= 5.0f)) lamp.speed = 1.0f;
  if (!(lamp.scale >= 0.25f && lamp.scale <= 3.0f)) lamp.scale = 1.0f;
}

void markStateDirty() {
  stateDirty = true;
  stateDirtyAt = millis();
}

// ---------- Час та NTP ----------
void initTime() {
  configTzTime(TIMEZONE, "pool.ntp.org", "time.google.com", "time.cloudflare.com");
}

String getCurrentTimeString() {
  time_t now = time(nullptr);
  if (now < 1700000000) return "--.--.---- --:--:--";
  struct tm* t = localtime(&now);
  char buf[26];
  snprintf(buf, sizeof(buf), "%02d.%02d.%04d %02d:%02d:%02d",
           t->tm_mday, t->tm_mon + 1, t->tm_year + 1900,
           t->tm_hour, t->tm_min, t->tm_sec);
  return String(buf);
}

// ---------- JSON & CORS ----------
String jsonEscape(const String& s) {
  String o;
  o.reserve(s.length() + 8);
  for (size_t i = 0; i < s.length(); i++) {
    char c = s[i];
    if (c == '"' || c == '\\') { o += '\\'; o += c; }
    else if ((uint8_t)c < 0x20) o += ' ';
    else o += c;
  }
  return o;
}

void setCorsHeaders() {
#if DEV_CORS
  server.sendHeader("Access-Control-Allow-Origin", "*");
  server.sendHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  server.sendHeader("Access-Control-Allow-Headers", "Content-Type");
#endif
}

void sendJson(int code, const String& body) {
  setCorsHeaders();
  server.sendHeader("Cache-Control", "no-store");
  server.send(code, "application/json; charset=utf-8", body);
}

void handleOptions() {
  setCorsHeaders();
  server.send(204);
}

String colorHex(uint32_t c) {
  char b[8];
  snprintf(b, sizeof(b), "#%06x", (unsigned)(c & 0xFFFFFF));
  return String(b);
}

String configJson() {
  String s = "{\"name\":\"" + jsonEscape(cfg.name) + "\"";
  s += ",\"id\":" + String(cfg.id);
  s += ",\"ledPin\":" + String(cfg.ledPin);
  s += ",\"ledCount\":" + String(cfg.ledCount);
  s += ",\"autoupdate\":" + String(cfg.autoUpdate ? "true" : "false");
  s += ",\"allowedPins\":[";
  for (size_t i = 0; i < sizeof(ALLOWED_PINS) / sizeof(int); i++) {
    if (i) s += ",";
    s += String(ALLOWED_PINS[i]);
  }
  s += "]}";
  return s;
}

String stateJson() {
  String s = "{\"power\":" + String(lamp.power ? "true" : "false");
  s += ",\"mode\":\"" + String(lamp.mode) + "\"";
  s += ",\"brightness\":" + String(lamp.brightness);
  s += ",\"speed\":" + String(lamp.speed, 2);
  s += ",\"scale\":" + String(lamp.scale, 2);
  s += ",\"colors\":[\"" + colorHex(lamp.colors[0]) + "\",\"" + colorHex(lamp.colors[1]) + "\",\"" + colorHex(lamp.colors[2]) + "\"]";
  s += ",\"alarm\":" + (lamp.alarmJson.length() ? lamp.alarmJson : "{\"on\":false,\"time\":\"07:00\",\"dur\":20}");
  s += ",\"sched\":" + (lamp.schedJson.length() ? lamp.schedJson : "[]");
  s += ",\"time\":\"" + getCurrentTimeString() + "\"";
  s += ",\"supported\":true";
  s += ",\"modes\":[";
  for (int i = 0; i < FX_MODE_COUNT; i++) {
    if (i) s += ",";
    s += "\"" + String(FX_MODES[i]) + "\"";
  }
  s += "]}";
  return s;
}

String statusJson() {
  bool up = (WiFi.status() == WL_CONNECTED);
  String s = "{\"fw\":\"" FW_VERSION "\",\"web\":\"" WEB_HASH "\"";
  s += ",\"uptime\":" + String(millis() / 1000);
  s += ",\"heap\":" + String(ESP.getFreeHeap());
  s += ",\"time\":\"" + getCurrentTimeString() + "\"";
  s += ",\"wifi\":{\"connected\":" + String(up ? "true" : "false");
  if (up) {
    s += ",\"ssid\":\"" + jsonEscape(WiFi.SSID()) + "\"";
    s += ",\"ip\":\"" + WiFi.localIP().toString() + "\"";
    s += ",\"rssi\":" + String(WiFi.RSSI());
  } else if (apModeActive) {
    s += ",\"ap\":true,\"ip\":\"" + WiFi.softAPIP().toString() + "\"";
  }
  s += "},\"config\":" + configJson() + ",\"state\":" + stateJson() + "}";
  return s;
}

// ---------- API Ендпоінти ----------
void handleStatus() { sendJson(200, statusJson()); }
void handleConfigGet() { sendJson(200, configJson()); }

void handleConfigPost() {
  Config next = cfg;
  if (server.hasArg("name")) {
    String n = server.arg("name");
    n.trim();
    if (n.length() > 0 && n.length() <= 32) next.name = n;
  }
  if (server.hasArg("ledPin")) {
    int p = server.arg("ledPin").toInt();
    if (pinAllowed(p)) next.ledPin = p;
  }
  if (server.hasArg("ledCount")) {
    int c = server.arg("ledCount").toInt();
    if (c >= 1 && c <= 1024) next.ledCount = c;
  }

  if (server.hasArg("autoupdate")) {
    String v = server.arg("autoupdate");
    next.autoUpdate = (v == "1" || v == "true");
  }

  bool hwChanged = (next.ledPin != cfg.ledPin || next.ledCount != cfg.ledCount);
  cfg = next;
  saveConfig();
  sendJson(200, configJson());
  if (hwChanged) restartPending = true;
}

bool parseHexColor(String v, uint32_t& out) {
  v.trim();
  if (v.startsWith("#")) v = v.substring(1);
  if (v.length() != 6) return false;
  for (size_t i = 0; i < 6; i++) if (!isxdigit(v[i])) return false;
  out = strtoul(v.c_str(), nullptr, 16);
  return true;
}

void handleStateGet() { sendJson(200, stateJson()); }

void handleStatePost() {
  LampState next = lamp;

  if (server.hasArg("power")) {
    String v = server.arg("power");
    next.power = (v == "1" || v == "true");
  }
  if (server.hasArg("mode")) {
    String m = server.arg("mode");
    if (m.length() > 0 && m.length() < sizeof(next.mode)) {
      strncpy(next.mode, m.c_str(), sizeof(next.mode) - 1);
      next.mode[sizeof(next.mode) - 1] = 0;
    }
  }
  if (server.hasArg("brightness")) {
    int b = server.arg("brightness").toInt();
    next.brightness = constrain(b, 0, 100);
  }
  if (server.hasArg("speed")) {
    float f = server.arg("speed").toFloat();
    if (f >= 0.1f && f <= 5.0f) next.speed = f;
  }
  if (server.hasArg("scale")) {
    float f = server.arg("scale").toFloat();
    if (f >= 0.25f && f <= 3.0f) next.scale = f;
  }

  const char* colorKeys[3] = {"c0", "c1", "c2"};
  for (int i = 0; i < 3; i++) {
    if (server.hasArg(colorKeys[i])) {
      uint32_t c;
      if (parseHexColor(server.arg(colorKeys[i]), c)) {
        next.colors[i] = c;
      }
    }
  }

  if (server.hasArg("alarm")) {
    next.alarmJson = server.arg("alarm");
  }
  if (server.hasArg("sched")) {
    next.schedJson = server.arg("sched");
  }

  lamp = next;
  markStateDirty();
  sendJson(200, stateJson());
}

// Синхронізація часу з браузера (працює миттєво навіть без інтернету)
void handleTimePost() {
  if (server.hasArg("t")) {
    time_t epoch = (time_t)strtoull(server.arg("t").c_str(), nullptr, 10);
    if (epoch > 1700000000) {
      struct timeval tv = { .tv_sec = epoch, .tv_usec = 0 };
      settimeofday(&tv, nullptr);
      timeSynced = true;
      Serial.printf("Час синхронізовано з браузера: %s\n", getCurrentTimeString().c_str());
    }
  }
  sendJson(200, "{\"time\":\"" + getCurrentTimeString() + "\"}");
}

// ---------- Оновлення по повітрю (OTA) ----------
// Лампа перевіряє manifest.json на сайті проєкту (GitHub Pages), бачить там нову
// версію, качає .bin по HTTPS і записує його в OTA-розділ. Усе без участі хмар.
static void urlEncodeInto(String& out, const String& v) {
  static const char* hex = "0123456789ABCDEF";
  for (size_t i = 0; i < v.length(); i++) {
    uint8_t c = (uint8_t)v[i];
    if (isalnum(c) || c == '-' || c == '_' || c == '.' || c == '~') out += (char)c;
    else { out += '%'; out += hex[c >> 4]; out += hex[c & 15]; }
  }
}

// Витягує з JSON перший рядок-значення за ключем (манифест простий, парсер не потрібен)
static bool jsonStr(const String& j, const char* key, String& out) {
  String k = String("\"") + key + "\"";
  int i = j.indexOf(k);
  if (i < 0) return false;
  i = j.indexOf(':', i + k.length());
  if (i < 0) return false;
  i = j.indexOf('"', i);
  if (i < 0) return false;
  int e = j.indexOf('"', i + 1);
  if (e < 0) return false;
  out = j.substring(i + 1, e);
  return true;
}

static long jsonNum(const String& j, const char* key, long def) {
  String k = String("\"") + key + "\"";
  int i = j.indexOf(k);
  if (i < 0) return def;
  i = j.indexOf(':', i + k.length());
  if (i < 0) return def;
  i++;
  while (i < (int)j.length() && (j[i] == ' ' || j[i] == '\t')) i++;
  String n;
  while (i < (int)j.length() && (isdigit(j[i]) || j[i] == '-')) n += j[i++];
  return n.length() ? n.toInt() : def;
}

// Порівняння версій "x.y.z": true, якщо a новіша за b
static bool versionNewer(const String& a, const String& b) {
  int i = 0, j = 0;
  while (i < (int)a.length() || j < (int)b.length()) {
    long x = 0, y = 0;
    while (i < (int)a.length() && isdigit(a[i])) x = x * 10 + (a[i++] - '0');
    while (j < (int)b.length() && isdigit(b[j])) y = y * 10 + (b[j++] - '0');
    if (x != y) return x > y;
    while (i < (int)a.length() && !isdigit(a[i])) i++;
    while (j < (int)b.length() && !isdigit(b[j])) j++;
  }
  return false;
}

// Перший запис у releases[] з новішою версією
static bool manifestPickLatest(const String& j, String& ver, String& url, String& sha, long& size, String& notes) {
  int rb = j.indexOf("\"releases\"");
  if (rb < 0) return false;
  rb = j.indexOf('[', rb);
  if (rb < 0) return false;
  int re = j.indexOf(']', rb);
  if (re < 0) re = j.length();
  int pos = rb;
  while (true) {
    int nb = j.indexOf('{', pos);
    if (nb < 0 || nb > re) break;
    int ne = j.indexOf('}', nb);
    if (ne < 0 || ne > re) ne = re;
    String obj = j.substring(nb, ne + 1);
    String v;
    if (jsonStr(obj, "version", v) && versionNewer(v, FW_VERSION)) {
      String u, hh;
      if (jsonStr(obj, "url", u)) {
        jsonStr(obj, "sha256", hh);
        long sz = jsonNum(obj, "size", 0);
        ver = v; url = u; sha = hh; size = sz;
        notes = "";
        int nk = obj.indexOf("\"notes\"");
        if (nk >= 0) {
          int ab = obj.indexOf('[', nk);
          int q = obj.indexOf('"', ab);
          int q2 = q >= 0 ? obj.indexOf('"', q + 1) : -1;
          if (q > 0 && q2 > q) notes = obj.substring(q + 1, q2);
        }
        return true;
      }
    }
    pos = ne + 1;
  }
  return false;
}

static bool otaFetchManifest(String& body) {
  WiFiClientSecure client;
  client.setInsecure();  // GitHub Pages: без пінінгу сертифіката (публічні дані, цілісність — через SHA-256)
  HTTPClient http;
  http.setTimeout(12000);
  http.setFollowRedirects(HTTPC_STRICT_FOLLOW_REDIRECTS);
  String url = UPDATE_MANIFEST_URL;
  url += "?t=";
  url += String(millis());
  if (!http.begin(client, url)) return false;
  int code = http.GET();
  if (code != HTTP_CODE_OK) { http.end(); return false; }
  body = http.getString();
  http.end();
  return body.length() > 0;
}

// Качає .bin по HTTPS і пише в OTA-розділ, рахуючи SHA-256 «на льоту».
// Якщо хеш у манифесті є й не збігається — запис скасовується.
static bool otaDownloadToFlash(const String& url, String& err, uint32_t& calculated) {
  WiFiClientSecure client;
  client.setInsecure();
  HTTPClient http;
  http.setTimeout(20000);
  http.setFollowRedirects(HTTPC_STRICT_FOLLOW_REDIRECTS);
  if (!http.begin(client, url)) { err = "no-connect"; return false; }
  int code = http.GET();
  if (code != HTTP_CODE_OK) { http.end(); err = "http-" + String(code); return false; }
  int len = http.getSize();
  if (len <= 0) { http.end(); err = "no-size"; return false; }
  if (len > UPDATE_MAX_SIZE) { http.end(); err = "too-big"; return false; }

  if (!Update.begin(len)) { http.end(); err = "begin"; return false; }
  WiFiClient* stream = http.getStreamPtr();
  uint8_t* buf = (uint8_t*)malloc(2048);
  if (!buf) { http.end(); err = "no-mem"; return false; }
  uint32_t total = 0;
  ota.phase = "download";
  mbedtls_sha256_context sha;
  mbedtls_sha256_init(&sha);
  mbedtls_sha256_starts_ret(&sha, 0);
  while (stream->connected() && total < (uint32_t)len) {
    size_t avail = stream->available();
    if (!avail) { delay(2); continue; }
    int n = stream->readBytes(buf, avail > 2048 ? 2048 : avail);
    if (n <= 0) continue;
    mbedtls_sha256_update_ret(&sha, buf, n);
    if (Update.write(buf, n) != (size_t)n) { free(buf); mbedtls_sha256_free(&sha); http.end(); err = "flash"; return false; }
    total += n;
    int pct = 15 + (int)(total * 75.0f / len);   // 15..90 %
    ota.progress = pct;
  }
  free(buf);
  http.end();
  if (total != (uint32_t)len) { mbedtls_sha256_free(&sha); err = "short"; return false; }
  if (ota.size && total != (uint32_t)ota.size) { mbedtls_sha256_free(&sha); err = "size"; return false; }

  uint8_t digest[32];
  mbedtls_sha256_finish_ret(&sha, digest);
  mbedtls_sha256_free(&sha);
  if (ota.sha256.length() == 64) {
    String hex;
    hex.reserve(64);
    for (int i = 0; i < 32; i++) {
      char b[3];
      snprintf(b, sizeof(b), "%02x", digest[i]);
      hex += b;
    }
    String expect = ota.sha256;
    expect.toLowerCase();
    if (hex != expect) {
      Update.abort();
      err = "sha256";
      return false;
    }
    Serial.println("OTA: SHA-256 збігається");
  }
  calculated = total;
  return true;
}

static void otaFail(const String& why) {
  ota.phase = "error";
  ota.error = why;
  ota.active = false;
  ota.nextAutoAt = millis() + UPDATE_AUTO_RETRY_MS;
  Serial.printf("OTA: помилка — %s\n", why.c_str());
}

static void otaInstallAndRestart() {
  ota.phase = "reboot";
  ota.progress = 100;
  if (!Update.end(true)) { otaFail("end"); return; }
  ota.active = true;
  delay(400);
  ESP.restart();
}

// Ручний запуск: лампа сама качає оновлення з сайту
void otaStartFromInternet() {
  if (ota.active) return;
  if (WiFi.status() != WL_CONNECTED) { otaFail("offline"); return; }
  ota.active = true;
  ota.error = "";
  ota.progress = 0;
  ota.phase = "download";
  String body;
  if (!otaFetchManifest(body)) { otaFail("manifest"); return; }
  String ver, url, sha, notes;
  long size = 0;
  if (!manifestPickLatest(body, ver, url, sha, size, notes)) { ota.phase = "idle"; ota.active = false; return; }
  ota.latest = ver; ota.notes = notes; ota.size = size; ota.sha256 = sha;
  ota.progress = 15;
  uint32_t written = 0;
  String err;
  if (!otaDownloadToFlash(url, err, written)) { otaFail(err); return; }
  ota.progress = 95;
  otaInstallAndRestart();
}

void handleUpdateCheck() {
  ota.checkedAt = millis();
  if (WiFi.status() != WL_CONNECTED) {
    ota.nextAutoAt = millis() + UPDATE_AUTO_RETRY_MS;
    sendJson(200, "{\"current\":\"" FW_VERSION "\",\"latest\":\"" FW_VERSION "\",\"offline\":true,\"notes\":[]}");
    return;
  }
  String body;
  if (!otaFetchManifest(body)) {
    ota.nextAutoAt = millis() + UPDATE_AUTO_RETRY_MS;
    sendJson(200, "{\"current\":\"" FW_VERSION "\",\"latest\":\"" FW_VERSION "\",\"offline\":true,\"notes\":[\"Немає зв'язку з сайтом оновлень\"]}");
    return;
  }
  String ver, url, sha, notes;
  long size = 0;
  bool found = manifestPickLatest(body, ver, url, sha, size, notes);
  String latest = found ? ver : FW_VERSION;
  ota.latest = latest;
  ota.notes = notes;
  ota.size = size;
  ota.sha256 = sha;
  String j = "{\"current\":\"" FW_VERSION "\",\"latest\":\"" + latest + "\",\"notes\":[";
  if (notes.length()) j += "\"" + jsonEscape(notes) + "\"";
  j += "],\"size\":" + String(size);
  if (found) j += ",\"sha256\":\"" + jsonEscape(sha) + "\"";
  j += "}";
  sendJson(200, j);
  ota.nextAutoAt = millis() + UPDATE_AUTO_INTERVAL_MS;
}

void handleUpdateStart() {
  if (ota.active) { sendJson(409, "{\"ok\":false,\"error\":\"busy\"}"); return; }
  sendJson(202, "{\"ok\":true}");
  otaStartFromInternet();
}

void handleUpdateStatus() {
  String j = "{\"phase\":\"" + String(ota.phase ? ota.phase : "idle") + "\",\"progress\":" + String(ota.progress ? ota.progress : 0);
  j += ",\"current\":\"" FW_VERSION "\"";
  if (ota.latest.length()) j += ",\"latest\":\"" + jsonEscape(ota.latest) + "\"";
  if (ota.error.length()) j += ",\"error\":\"" + jsonEscape(ota.error) + "\"";
  j += "}";
  sendJson(200, j);
}

void handleUpdateDone() {
  bool ok = !Update.hasError();
  setCorsHeaders();
  server.sendHeader("Connection", "close");
  server.send(200, "text/plain", ok ? "OK" : "FAIL");
  delay(500);
  if (ok) ESP.restart();
}

void handleUpload() {
  HTTPUpload& up = server.upload();
  if (up.status == UPLOAD_FILE_START) {
    Serial.printf("OTA початок: %s\n", up.filename.c_str());
    ota.active = true; ota.progress = 0; ota.phase = "download"; ota.error = "";
    if (!Update.begin(UPDATE_SIZE_UNKNOWN)) { Update.printError(Serial); otaFail("begin"); }
  } else if (up.status == UPLOAD_FILE_WRITE) {
    if (Update.write(up.buf, up.currentSize) != up.currentSize) { Update.printError(Serial); otaFail("write"); }
    else {
      ota.phase = "write";
      ota.progress = (int)(Update.progress() * 100 / (Update.size() ? Update.size() : 1));
    }
  } else if (up.status == UPLOAD_FILE_END) {
    if (Update.end(true)) { Serial.printf("OTA успішно завершено (%u байт)\n", up.totalSize); ota.phase = "reboot"; ota.progress = 100; }
    else { Update.printError(Serial); otaFail("end"); }
  } else if (up.status == UPLOAD_FILE_ABORTED) {
    Update.abort();
    otaFail("aborted");
  }
}

// Викликається з loop(): автооновлення, коли лампа має інтернет і час синхронізовано
void checkAutoUpdate() {
  if (!ota.autoUpdate || ota.active) return;
  if (WiFi.status() != WL_CONNECTED) return;
  if (millis() < ota.nextAutoAt) return;
  ota.nextAutoAt = millis() + UPDATE_AUTO_INTERVAL_MS;
  String body;
  if (!otaFetchManifest(body)) return;
  String ver, url, sha, notes;
  long size = 0;
  if (!manifestPickLatest(body, ver, url, sha, size, notes)) return;
  Serial.printf("OTA авто: доступна версія %s — оновлююсь\n", ver.c_str());
  ota.latest = ver; ota.notes = notes; ota.size = size; ota.sha256 = sha;
  otaStartFromInternet();
}

// ---------- Вивід на світлодіоди ----------
const uint32_t CROSSFADE_MS = 400;
const float COLOR_SMOOTH = 0.35f;
const float GAIN_SMOOTH = 0.25f;

void setupStrip() {
  if (strip) delete strip;
  if (frame) delete[] frame;
  if (shown) delete[] shown;
  if (fadeFrom) delete[] fadeFrom;

  strip = new Adafruit_NeoPixel(cfg.ledCount, cfg.ledPin, NEO_GRB + NEO_KHZ800);
  frame = new RGB[cfg.ledCount]();
  shown = new RGB[cfg.ledCount]();
  fadeFrom = new RGB[cfg.ledCount]();
  strip->begin();
  strip->clear();
  strip->show();
}

void drawFrame() {
  static uint32_t last = 0;
  uint32_t now = millis();
  if (now - last < FRAME_MS) return;
  float dt = (float)(now - last);
  last = now;
  const int n = cfg.ledCount;

  // Якщо лампа вимкнена і вже повністю згасла — пропускаємо важкі обчислення
  if (!lamp.power && curGain < 0.002f) {
    static bool cleared = false;
    if (!cleared) {
      strip->clear();
      strip->show();
      cleared = true;
    }
    return;
  }

  phaseMs += dt * lamp.speed;
  if (phaseMs >= FX_PHASE_WRAP_MS) phaseMs -= FX_PHASE_WRAP_MS;

  LampState view = lamp;
  view.power = true;
  if (!viewInit) curScale = lamp.scale;
  for (int i = 0; i < 3; i++) {
    RGB t = unpackColor(lamp.colors[i]);
    float target[3] = {(float)t.r, (float)t.g, (float)t.b};
    for (int k = 0; k < 3; k++) {
      if (!viewInit) viewColor[i][k] = target[k];
      else viewColor[i][k] += (target[k] - viewColor[i][k]) * COLOR_SMOOTH;
    }
    view.colors[i] = ((uint32_t)toByte(viewColor[i][0]) << 16) | ((uint32_t)toByte(viewColor[i][1]) << 8) | toByte(viewColor[i][2]);
  }
  viewInit = true;
  curScale += (lamp.scale - curScale) * COLOR_SMOOTH;
  view.scale = curScale;

  float targetGain = lamp.power ? (lamp.brightness / 100.0f) * (MAX_BRIGHTNESS / 255.0f) : 0.0f;
  curGain += (targetGain - curGain) * GAIN_SMOOTH;
  if (fabsf(targetGain - curGain) < 0.001f) curGain = targetGain;

  if (strcmp(lamp.mode, lastMode) != 0) {
    memcpy(fadeFrom, shown, n * sizeof(RGB));
    fadeT = 0.0f;
    strncpy(lastMode, lamp.mode, sizeof(lastMode) - 1);
    lastMode[sizeof(lastMode) - 1] = 0;
  }

  renderFrame(frame, n, view, (float)phaseMs, curGain);

  if (fadeT < 1.0f) {
    fadeT += dt / CROSSFADE_MS;
    if (fadeT > 1.0f) fadeT = 1.0f;
    float e = fadeT * fadeT * (3.0f - 2.0f * fadeT);
    for (int i = 0; i < n; i++) shown[i] = mixColor(fadeFrom[i], frame[i], e);
  } else {
    memcpy(shown, frame, n * sizeof(RGB));
  }

  for (int i = 0; i < n; i++) strip->setPixelColor(i, strip->Color(shown[i].r, shown[i].g, shown[i].b));
  strip->show();
}

// ---------- Віддача вебсайту з PROGMEM ----------
bool serveAsset(String path) {
  if (path == "/") path = "/index.html";
  for (size_t i = 0; i < WEB_ASSET_COUNT; i++) {
    if (path == WEB_ASSETS[i].path) {
      const String etag = "\"" WEB_HASH "\"";
      server.sendHeader("ETag", etag);
      server.sendHeader("Cache-Control", "no-cache");
      if (server.header("If-None-Match") == etag) {
        server.send(304);
        return true;
      }
      server.sendHeader("Content-Encoding", "gzip");
      server.send_P(200, WEB_ASSETS[i].mime, (const char*)WEB_ASSETS[i].data, WEB_ASSETS[i].len);
      return true;
    }
  }
  return false;
}

// ---------- Wi-Fi та мережа ----------
void startWifi() {
  WiFi.disconnect(true);
  delay(50);
  WiFi.mode(WIFI_STA);
  WiFi.setAutoReconnect(true);
  WiFi.begin(WIFI_SSID, WIFI_PASS);
  // Максимальна потужність Wi-Fi для надійного сигналу без затримок
  WiFi.setTxPower(WIFI_POWER_19_5dBm);
  // Забороняємо модему засинати, щоб відповіді були миттєвими (<5 мс)
  WiFi.setSleep(false);
  lastWifiTry = millis();
  Serial.println("Wi-Fi: з'єднуюсь...");
}

void startSoftAp() {
  if (apModeActive) return;
  apModeActive = true;
  WiFi.mode(WIFI_AP_STA);
  WiFi.softAP("Smart-Lamp", "12345678");
  WiFi.setSleep(false);
  Serial.print("Wi-Fi недоступний. Створено точку доступу 'Smart-Lamp' (12345678), IP: ");
  Serial.println(WiFi.softAPIP());
  MDNS.begin("smart-lamp");
}

void onWifiEvent(arduino_event_id_t event, arduino_event_info_t info) {
  if (event == ARDUINO_EVENT_WIFI_STA_GOT_IP) {
    Serial.printf("Wi-Fi підключено! IP: %s\n", WiFi.localIP().toString().c_str());
    apModeActive = false;
    WiFi.setSleep(false);
    MDNS.end();
    if (MDNS.begin("smart-lamp")) {
      Serial.println("Адреса лампи: http://smart-lamp.local");
    }
    initTime();
  } else if (event == ARDUINO_EVENT_WIFI_STA_DISCONNECTED) {
    Serial.println("Wi-Fi: з'єднання втрачено");
  }
}

void statusLed(bool on) {
  digitalWrite(STATUS_LED_PIN, (on ^ STATUS_LED_ACTIVE_LOW) ? HIGH : LOW);
}

// ---------- Автономна перевірка розкладу на самій лампі ----------
void checkAutonomousSchedule() {
  static uint32_t lastCheck = 0;
  if (millis() - lastCheck < 10000) return; // перевіряємо раз на 10 секунд
  lastCheck = millis();

  time_t now = time(nullptr);
  if (now < 1700000000) return; // час ще не синхронізовано
  struct tm* t = localtime(&now);

  char curTime[8];
  snprintf(curTime, sizeof(curTime), "%02d:%02d", t->tm_hour, t->tm_min);

  // Перевірка будильника "Світанок"
  if (lamp.alarmJson.indexOf("\"on\":true") >= 0) {
    int idx = lamp.alarmJson.indexOf("\"time\":\"");
    if (idx >= 0) {
      String aTime = lamp.alarmJson.substring(idx + 8, idx + 13);
      if (aTime == String(curTime) && t->tm_sec < 15 && !lamp.power) {
        lamp.power = true;
        strncpy(lamp.mode, "sunrise", sizeof(lamp.mode) - 1);
        markStateDirty();
      }
    }
  }
}

// ---------- Setup & Loop ----------
void setup() {
  Serial.begin(115200);
  pinMode(STATUS_LED_PIN, OUTPUT);
  statusLed(false);

  loadConfig();
  loadState();
  ota.autoUpdate = cfg.autoUpdate;
  ota.nextAutoAt = millis() + 20000;   // перша авто-перевірка через 20 с після старту
  Serial.printf("Smart Lamp v%s (Пін %d, LED: %d)\n",
                FW_VERSION, cfg.ledPin, cfg.ledCount);
  setupStrip();

  WiFi.persistent(false);
  WiFi.onEvent(onWifiEvent);
  startWifi();

  const char* headerKeys[] = {"If-None-Match"};
  server.collectHeaders(headerKeys, 1);

  // API маршрути
  server.on("/api/status", HTTP_GET, handleStatus);
  server.on("/api/config", HTTP_GET, handleConfigGet);
  server.on("/api/config", HTTP_POST, handleConfigPost);
  server.on("/api/state", HTTP_GET, handleStateGet);
  server.on("/api/state", HTTP_POST, handleStatePost);
  server.on("/api/time", HTTP_POST, handleTimePost);

  // CORS Preflight
  server.on("/api/status", HTTP_OPTIONS, handleOptions);
  server.on("/api/config", HTTP_OPTIONS, handleOptions);
  server.on("/api/state", HTTP_OPTIONS, handleOptions);
  server.on("/api/time", HTTP_OPTIONS, handleOptions);
  server.on("/api/update/check", HTTP_OPTIONS, handleOptions);
  server.on("/api/update/start", HTTP_OPTIONS, handleOptions);
  server.on("/api/update/status", HTTP_OPTIONS, handleOptions);
  server.on("/api/update/upload", HTTP_OPTIONS, handleOptions);

  // Оновлення OTA
  server.on("/api/update/check", HTTP_GET, handleUpdateCheck);
  server.on("/api/update/start", HTTP_POST, handleUpdateStart);
  server.on("/api/update/status", HTTP_GET, handleUpdateStatus);
  server.on("/api/update/upload", HTTP_POST, handleUpdateDone, handleUpload);
  server.on("/update", HTTP_POST, handleUpdateDone, handleUpload);

  // Вебсайт із флеш-пам'яті
  server.onNotFound([]() {
    if (!serveAsset(server.uri())) {
      server.send(404, "text/plain", "Not found");
    }
  });

  server.begin();
}

void loop() {
  server.handleClient();
  drawFrame();
  checkAutonomousSchedule();
  checkAutoUpdate();

  if (stateDirty && millis() - stateDirtyAt > STATE_SAVE_DELAY_MS) {
    saveState();
    stateDirty = false;
  }
  if (restartPending) {
    delay(300);
    ESP.restart();
  }

  bool connected = (WiFi.status() == WL_CONNECTED);
  if (!connected) {
    if (millis() - lastWifiTry > 15000 && !apModeActive) {
      startSoftAp();
    }
    if (millis() - lastWifiTry > 35000) {
      startWifi();
    }
  }

  // Індикація статусу
  uint32_t period = connected ? 1200 : (apModeActive ? 400 : 100);
  static uint32_t lastBlink = 0;
  static bool ledState = false;
  if (millis() - lastBlink >= period) {
    lastBlink = millis();
    ledState = !ledState;
    statusLed(ledState);
  }
}
