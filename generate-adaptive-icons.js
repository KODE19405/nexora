'use strict';
/* Adaptive icon foreground (N ungu) dengan background gelap — untuk ic_launcher_foreground */
const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

const ANDROID_RES = path.join(__dirname, 'nexora-android', 'android', 'app', 'src', 'main', 'res');
const FOREGROUND_SIZES = { 'mipmap-mdpi': 108, 'mipmap-hdpi': 162, 'mipmap-xhdpi': 216, 'mipmap-xxhdpi': 324, 'mipmap-xxxhdpi': 432 };

function hex(s) { return [parseInt(s.slice(1,3),16), parseInt(s.slice(3,5),16), parseInt(s.slice(5,7),16)]; }
function lerp(a,b,t) { return Math.round(a+(b-a)*t); }
function lerpHex(c1,c2,t) {
  const [r1,g1,b1]=hex(c1), [r2,g2,b2]=hex(c2);
  return `rgb(${lerp(r1,r2,t)},${lerp(g1,g2,t)},${lerp(b1,b2,t)})`;
}

for (const [dir, size] of Object.entries(FOREGROUND_SIZES)) {
  const c = createCanvas(size, size);
  const ctx = c.getContext('2d');
  ctx.clearRect(0, 0, size, size);
  const grad = ctx.createLinearGradient(size*0.25, size*0.75, size*0.75, size*0.25);
  grad.addColorStop(0, '#A78BFA');
  grad.addColorStop(1, '#7C3AED');
  ctx.fillStyle = grad;
  ctx.font = `700 ${Math.round(size*0.55)}px Arial Bold, sans-serif`;
  ctx.textAlign='center'; ctx.textBaseline='middle';
  ctx.fillText('N', size/2, size/2 + size*0.02);
  const outDir = path.join(ANDROID_RES, dir);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'ic_launcher_foreground.png'), c.toBuffer('image/png'));
}

// background color XML for adaptive icon
const colorsDir = path.join(ANDROID_RES, 'values');
fs.mkdirSync(colorsDir, { recursive: true });
fs.writeFileSync(path.join(colorsDir, 'ic_launcher_background.xml'), `<?xml version='1.0' encoding='utf-8'?>
<resources>
    <color name="ic_launcher_background">#14102B</color>
</resources>
`);

// adaptive-icon xml
const anyDpi = path.join(ANDROID_RES, 'mipmap-anydpi-v26');
fs.mkdirSync(anyDpi, { recursive: true });
fs.writeFileSync(path.join(anyDpi, 'ic_launcher.xml'), `<?xml version="1.0" encoding="utf-8"?>
<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">
    <background android:drawable="@color/ic_launcher_background" />
    <foreground android:drawable="@mipmap/ic_launcher_foreground" />
</adaptive-icon>
`);
fs.writeFileSync(path.join(anyDpi, 'ic_launcher_round.xml'), `<?xml version="1.0" encoding="utf-8"?>
<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">
    <background android:drawable="@color/ic_launcher_background" />
    <foreground android:drawable="@mipmap/ic_launcher_foreground" />
</adaptive-icon>
`);
console.log('adaptive icons written');
