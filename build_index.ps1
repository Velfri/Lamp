$ErrorActionPreference = "Stop"

$ws = "c:\Users\user\Desktop\smart-lamp-v20"
$src = Join-Path $ws "src"

$css = [System.IO.File]::ReadAllText((Join-Path $src "style.css"), [System.Text.Encoding]::UTF8)

# Read JS modules
$jsI18n = [System.IO.File]::ReadAllText((Join-Path $src "i18n.js"), [System.Text.Encoding]::UTF8)
$jsI18nExt = [System.IO.File]::ReadAllText((Join-Path $src "i18n-ext.js"), [System.Text.Encoding]::UTF8)
$jsFastLed = [System.IO.File]::ReadAllText((Join-Path $src "fastled.js"), [System.Text.Encoding]::UTF8)
$jsEffects = [System.IO.File]::ReadAllText((Join-Path $src "effects.js"), [System.Text.Encoding]::UTF8)
$jsSketch = [System.IO.File]::ReadAllText((Join-Path $src "sketch.js"), [System.Text.Encoding]::UTF8)
$jsLampLink = [System.IO.File]::ReadAllText((Join-Path $src "lamp-link.js"), [System.Text.Encoding]::UTF8)
$jsUpdater = [System.IO.File]::ReadAllText((Join-Path $src "updater.js"), [System.Text.Encoding]::UTF8)
$jsApp = [System.IO.File]::ReadAllText((Join-Path $src "app.js"), [System.Text.Encoding]::UTF8)

$htmlHeader = @"
<!DOCTYPE html>
<html lang="uk">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
<title>Smart Lamp</title>
<meta name="theme-color" content="#0d0b09">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="Lamp">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<link rel="icon" type="image/png" sizes="192x192" href="icon-192.png">
<link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon.png">
<link rel="manifest" href="manifest.json">
<style>
$css
</style>
</head>
<body>
<svg style="display:none" xmlns="http://www.w3.org/2000/svg">
 <symbol id="i-fx" viewBox="0 0 24 24"><path d="m12 3 1.9 4.8L19 9.5l-3.8 3.5 1.1 5.2L12 15.5 7.7 18.2 8.8 13 5 9.5l5.1-1.7z"/></symbol>
 <symbol id="i-color" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><path d="M12 3.5a8.5 8.5 0 0 1 0 17z" fill="currentColor"/></symbol>
 <symbol id="i-dice" viewBox="0 0 24 24"><rect x="3.5" y="3.5" width="17" height="17" rx="3.5"/><circle cx="8.5" cy="8.5" r="1.3" fill="currentColor"/><circle cx="15.5" cy="8.5" r="1.3" fill="currentColor"/><circle cx="12" cy="12" r="1.3" fill="currentColor"/><circle cx="8.5" cy="15.5" r="1.3" fill="currentColor"/><circle cx="15.5" cy="15.5" r="1.3" fill="currentColor"/></symbol>
 <symbol id="i-saved" viewBox="0 0 24 24"><path d="M6 3.5h12a1 1 0 0 1 1 1V21l-7-4.3L5 21V4.5a1 1 0 0 1 1-1z"/></symbol>
 <symbol id="i-clock" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5v5l3.2 2"/></symbol>
 <symbol id="i-upd" viewBox="0 0 24 24"><path d="M20 12a8 8 0 1 1-2.6-5.9"/><path d="M20 4v4.5h-4.5"/><path d="M12 15.5v-6M9.5 12 12 9.5l2.5 2.5"/></symbol>
 <symbol id="i-set" viewBox="0 0 24 24"><path d="M4 7h9M17 7h3M4 17h3M11 17h9"/><circle cx="15" cy="7" r="2.2"/><circle cx="9" cy="17" r="2.2"/></symbol>
 <symbol id="i-power" viewBox="0 0 24 24"><path d="M12 2.8v8.2"/><path d="M7 6.3a7.5 7.5 0 1 0 10 0"/></symbol>
 <symbol id="i-save" viewBox="0 0 24 24"><path d="M6 3.5h12a1 1 0 0 1 1 1V21l-7-4.3L5 21V4.5a1 1 0 0 1 1-1z"/><path d="M12 7.5v5M9.5 10h5"/></symbol>
 <symbol id="i-close" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></symbol>
 <symbol id="i-plus" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></symbol>
 <symbol id="i-file" viewBox="0 0 24 24"><path d="M14 3.5H7a1.5 1.5 0 0 0-1.5 1.5v14A1.5 1.5 0 0 0 7 20.5h10a1.5 1.5 0 0 0 1.5-1.5V8z"/><path d="M14 3.5V8h4.5M12 17v-5M9.8 14.2 12 12l2.2 2.2"/></symbol>
 <symbol id="i-install" viewBox="0 0 24 24"><path d="M12 3v11M7.5 9.5 12 14l4.5-4.5M4 19h16"/></symbol>
</svg>

<div id="scene"></div>

<div id="app" data-view="home">
 <header id="top">
  <div id="mini-slot"></div>
  <div class="title"><b id="lamp-title"></b><small id="now"></small></div>
  <div class="top-act">
   <button id="install-quick" class="rb" type="button" aria-label="Встановити" title="Встановити застосунок" hidden><svg class="i"><use href="#i-install"/></svg></button>
   <button id="save-quick" class="rb" type="button" data-i18n-label="qa.save"><svg class="i"><use href="#i-save"/></svg></button>
   <button id="power" class="rb" type="button" aria-pressed="true" aria-label="Power"><svg class="i"><use href="#i-power"/></svg></button>
   <button id="close" class="rb" type="button" data-i18n-label="common.back"><svg class="i"><use href="#i-close"/></svg></button>
  </div>
 </header>

 <div id="hud"><b></b><i></i></div>
 <p id="hint" data-i18n="hint.home"></p>
 <div id="scene-dots"></div>

 <section id="panel" aria-live="polite">
  <div id="grab"></div>
  <div id="pages">

   <section class="page" data-p="fx" hidden>
    <div class="faders">
     <label class="fader"><div class="hd"><h3 data-i18n="set.bri"></h3><span class="val" id="brightness-value"></span></div><input id="brightness" type="range" min="0" max="100" value="100"></label>
     <label class="fader"><div class="hd"><h3 data-i18n="fx.speed"></h3><span class="val" id="effect-speed-value"></span></div><input id="effect-speed" type="range" min="25" max="200" value="100"></label>
     <label class="fader" id="scale-box"><div class="hd"><h3 data-i18n="fx.scale"></h3><span class="val" id="effect-scale-value"></span></div><input id="effect-scale" type="range" min="25" max="300" value="100"></label>
    </div>
    <div class="row" id="fx-colrow"><h3 data-i18n="tab.color"></h3><div id="fx-colors"></div></div>
    <div class="tools">
     <input id="fx-search" class="input" type="search" data-i18n-ph="fx.search">
     <div id="fx-filters" class="chips"><button type="button" data-filter="all" aria-pressed="true" data-i18n="cat.all"></button><button type="button" data-filter="calm" aria-pressed="false" data-i18n="cat.calm"></button><button type="button" data-filter="nature" aria-pressed="false" data-i18n="cat.nature"></button><button type="button" data-filter="party" aria-pressed="false" data-i18n="cat.party"></button></div>
    </div>
    <div id="effect-list"></div>
   </section>

   <section class="page" data-p="color" hidden>
    <div id="color-none" hidden>
     <p class="hint" style="margin:0 0 16px" data-i18n="col.none"></p>
     <button id="to-mono" class="btn pri wide" type="button" data-i18n="col.mono"></button>
     <h3 style="margin-top:26px" data-i18n="alt.title"></h3><div id="color-alt" class="alt"></div>
    </div>
    <div id="color-ui">
     <div id="slots"></div>
     <div class="discwrap"><div id="disc" data-i18n-label="col.hue"></div><div id="ring-thumb"></div></div>
     <div class="center"><button id="rand-pal" class="btn" type="button"><svg class="i"><use href="#i-dice"/></svg><span data-i18n="col.rand"></span></button></div>
     <p class="lbl" data-i18n="col.val"></p><input id="val" class="grad" type="range" min="5" max="100" value="100">
     <div class="sec"><h3 data-i18n="col.std"></h3><div id="swatches"></div></div>
     <div class="sec"><h3 data-i18n="col.sets"></h3><div id="palettes"></div></div>
    </div>
   </section>

   <section class="page" data-p="saved" hidden>
    <h3 data-i18n="saved.cur"></h3>
    <div class="cursum" id="cur-sum"></div>
    <input id="cur-name" class="input" type="text" maxlength="24" data-i18n-ph="saved.name">
    <div class="addrow" style="margin:10px 0 26px"><button id="preset-add" class="btn pri" type="button" data-i18n="saved.add"></button><button id="preset-update" class="btn" type="button" data-i18n="saved.upd"></button></div>
    <h3 style="margin-bottom:10px" data-i18n="saved.list"></h3><div id="preset-list"></div>
    <p class="hint" data-i18n="saved.hint"></p>
   </section>

   <section class="page" data-p="sun" hidden>
    <div class="sec">
     <h3 style="margin-bottom:10px" data-i18n="sch.rules"></h3>
     <div id="sched-list"></div>
     <div class="addrow"><button id="sch-add-on" class="btn" type="button"><svg class="i"><use href="#i-plus"/></svg><span data-i18n="sch.on"></span></button><button id="sch-add-off" class="btn" type="button"><svg class="i"><use href="#i-plus"/></svg><span data-i18n="sch.off"></span></button></div>
     <p class="hint" data-i18n="sch.hint"></p>
    </div>
    <div class="sec">
     <div class="row" style="margin-bottom:10px"><h3 data-i18n="sun.alarm"></h3><label class="toggle"><input id="alarm-on" type="checkbox"><i></i></label></div>
     <div class="alarm-card">
      <input id="alarm-time" class="time" type="time" value="07:00">
      <div class="fader"><div class="hd"><h3 data-i18n="sun.dur"></h3><span class="val" id="alarm-dur-val"></span></div><input id="alarm-dur" type="range" min="5" max="60" step="5" value="20"></div>
     </div>
     <button id="alarm-test" class="btn wide" type="button" style="margin-top:12px" data-i18n="sun.test"></button>
     <p class="hint" data-i18n="sun.hint"></p>
    </div>
   </section>

   <section class="page" data-p="upd" hidden>
    <div id="upd-box">
     <div id="upd-ringwrap" data-state="idle">
      <svg id="upd-ring" viewBox="0 0 120 120"><circle id="upd-track" cx="60" cy="60" r="52"/><circle id="upd-fg" cx="60" cy="60" r="52"/></svg>
      <div id="upd-center">
       <div id="upd-pct">0<small>%</small></div>
       <svg id="upd-ico" class="i" viewBox="0 0 24 24"><g id="upd-ico-arrow"><path d="M12 16.5V7.5M8.5 11 12 7.5l3.5 3.5"/></g><path id="upd-tick" d="M7 12.5l3.2 3.2L17 8.8" style="display:none"/></svg>
      </div>
     </div>
     <div id="upd-title"></div>
     <p id="upd-sub"></p>
     <ul id="upd-notes" hidden></ul>
     <button id="upd-main" class="btn pri" type="button"></button>
    </div>
    <div class="set-sec" style="margin-top:30px">
     <div class="card">
      <div class="item"><div><span data-i18n="upd.cur"></span><small id="upd-ver"></small></div></div>
      <div class="item"><div><span data-i18n="upd.auto"></span><small data-i18n="upd.auto.d"></small></div><label class="toggle"><input id="upd-auto" type="checkbox"><i></i></label></div>
      <button id="upd-file-btn" class="mi" type="button"><span class="lnk" data-i18n="upd.file"></span></button>
      <input id="upd-file" type="file" accept=".bin,application/octet-stream" hidden>
     </div>
    </div>
   </section>

   <section class="page" data-p="set" hidden>
    <div class="set-sec" id="install-sec" hidden>
     <h3 data-i18n="inst.title"></h3>
     <div class="card pad"><p id="install-hint"></p><button id="install-btn" class="btn pri wide" type="button" style="margin-top:12px" data-i18n="inst.btn" hidden></button></div>
    </div>
    <div class="set-sec">
     <h3 data-i18n="set.lamp"></h3>
     <div class="card pad">
      <input id="lamp-name" class="input" type="text" maxlength="24" data-i18n-ph="lamp.name">
      <p class="hint" data-i18n="lamp.hint"></p>
     </div>
    </div>
    <div class="set-sec">
     <h3 data-i18n="set.hw"></h3>
     <div class="card pad">
      <div class="row" style="justify-content:space-between;align-items:center;margin-bottom:10px">
       <span data-i18n="hw.leds"></span>
       <div class="row" style="gap:8px;align-items:center">
        <input id="lamp-leds" class="input" type="number" min="5" max="1024" value="20" style="width:85px;text-align:center;padding:8px">
        <button id="btn-save-leds" class="btn pri" type="button" data-i18n="hw.save"></button>
       </div>
      </div>
      <div class="seg" id="seg-quick-leds" style="margin-top:8px">
       <button type="button" data-leds="20">20 LED</button>
       <button type="button" data-leds="60">60 LED</button>
       <button type="button" data-leds="256">16×16 (256)</button>
      </div>
      <p class="hint" data-i18n="hw.hint"></p>
     </div>
    </div>
    <div class="set-sec">
     <h3 data-i18n="time.title"></h3>
     <div class="card pad">
      <div class="row" style="justify-content:space-between;align-items:center">
       <div>
        <span id="lamp-time-val" class="val" style="font-size:17px">--:--:--</span>
        <small id="lamp-time-date" style="display:block;color:var(--muted);font-size:12px;margin-top:2px"></small>
       </div>
       <button id="btn-sync-time" class="btn" type="button" data-i18n="time.sync"></button>
      </div>
      <p id="time-sync-status" class="hint" style="margin-top:8px" data-i18n="time.hint"></p>
     </div>
    </div>
    <div class="set-sec">
     <h3 data-i18n="wifi.title"></h3>
     <div class="card pad">
      <div class="item" style="padding:6px 0;border-bottom:1px solid var(--line)"><span data-i18n="wifi.network"></span><span class="val" id="wifi-ssid">--</span></div>
      <div class="item" style="padding:6px 0;border-bottom:1px solid var(--line)"><span data-i18n="wifi.ip"></span><span class="val" id="wifi-ip">--</span></div>
      <div class="item" style="padding:6px 0;border-bottom:1px solid var(--line)"><span data-i18n="wifi.signal"></span><span class="val" id="wifi-rssi">--</span></div>
      <div class="item" style="padding:6px 0"><span data-i18n="sys.fw"></span><span class="val" id="sys-fw">v2.0.0</span></div>
     </div>
    </div>
    <div class="set-sec">
     <h3 data-i18n="set.lang"></h3>
     <div class="seg" data-lang-seg><button type="button" data-lang="uk">Українська</button><button type="button" data-lang="en">English</button></div>
    </div>
    <div class="set-sec">
     <h3 data-i18n="set.bri"></h3>
     <div class="seg"><button type="button" data-curve="soft" data-i18n="bri.soft"></button><button type="button" data-curve="linear" data-i18n="bri.lin"></button><button type="button" data-curve="precise" data-i18n="bri.prec"></button></div>
     <p class="hint" data-i18n="bri.hint"></p>
    </div>
    <div class="set-sec">
     <h3 data-i18n="look.accent"></h3>
     <div class="card pad"><div id="accents" class="opts"></div></div>
    </div>
    <div class="set-sec">
     <div class="card"><div class="item"><div><span data-i18n="gest.bri"></span><small data-i18n="gest.bri.d"></small></div><label class="toggle"><input data-sim="swipeBri" type="checkbox"><i></i></label></div></div>
    </div>
    <details class="card set-sec"><summary data-i18n="set.data"></summary>
     <button id="data-export" class="mi" type="button" data-i18n="data.export"></button>
     <button id="data-import" class="mi" type="button" data-i18n="data.import"></button>
     <button id="preset-reset" class="mi" type="button" data-i18n="data.resetp"></button>
     <button id="reset-all" class="mi" type="button" data-i18n="data.resetall"></button>
     <input id="import-file" type="file" accept="application/json,.json" hidden><p class="hint" data-i18n="data.hint"></p>
    </details>
    <p id="about-foot" class="foot"></p>
   </section>

  </div>
 </section>

 <nav id="dock">
  <button type="button" data-tab="fx" aria-selected="false"><svg class="i"><use href="#i-fx"/></svg><span data-i18n="tab.fx"></span></button>
  <button type="button" data-tab="color" aria-selected="false"><svg class="i"><use href="#i-color"/></svg><span data-i18n="tab.color"></span></button>
  <button type="button" data-tab="saved" aria-selected="false"><svg class="i"><use href="#i-saved"/></svg><span data-i18n="tab.saved"></span></button>
  <button type="button" data-tab="sun" aria-selected="false"><svg class="i"><use href="#i-clock"/></svg><span data-i18n="tab.sun"></span></button>
  <button type="button" data-tab="upd" aria-selected="false"><svg class="i"><use href="#i-upd"/></svg><span data-i18n="tab.upd"></span><i class="dot" id="upd-dot" hidden></i></button>
  <button type="button" data-tab="set" aria-selected="false"><svg class="i"><use href="#i-set"/></svg><span data-i18n="tab.set"></span></button>
 </nav>
</div>
<div id="toast" role="status"></div>
<div id="fps-counter" hidden></div>
<script>
/* === i18n.js === */
$jsI18n
/* === i18n-ext.js === */
$jsI18nExt
/* === fastled.js === */
$jsFastLed
/* === effects.js === */
$jsEffects
/* === sketch.js === */
$jsSketch
/* === lamp-link.js === */
$jsLampLink
/* === updater.js === */
$jsUpdater
/* === app.js === */
$jsApp
</script>
<script>
if ('serviceWorker' in navigator && location.protocol !== 'file:') {
  const reg = () => {
    navigator.serviceWorker.register('./service-worker.js', { scope: './' })
      .then((r) => console.log('PWA ServiceWorker ready, scope:', r.scope))
      .catch((err) => console.warn('PWA ServiceWorker error:', err));
  };
  if (document.readyState === 'complete') reg();
  else window.addEventListener('load', reg);
}
</script>
</body>
</html>
"@

$outHtml = Join-Path $ws "index.html"
[System.IO.File]::WriteAllText($outHtml, $htmlHeader, [System.Text.Encoding]::UTF8)
Write-Host "Assembled $outHtml, length: $($htmlHeader.Length) bytes"

# Compress to index.html.gz
Add-Type -AssemblyName System.IO.Compression
$rawBytes = [System.IO.File]::ReadAllBytes($outHtml)
$ms = New-Object System.IO.MemoryStream
$gz = New-Object System.IO.Compression.GZipStream($ms, [System.IO.Compression.CompressionLevel]::Optimal)
$gz.Write($rawBytes, 0, $rawBytes.Length)
$gz.Dispose()
$gzBytes = $ms.ToArray()
$ms.Dispose()

$outGz = Join-Path $ws "index.html.gz"
[System.IO.File]::WriteAllBytes($outGz, $gzBytes)
Write-Host "Compressed to $outGz ($([Math]::Round($gzBytes.Length / 1KB, 1)) KB)"
