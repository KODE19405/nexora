'use strict';
/* Nexora launcher icon — N ungu-gradient di atas rounded-square gelap (sama dengan favicon) */
const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

const SIZES = [
  { dir: 'mipmap-mdpi',    size: 48 },
  { dir: 'mipmap-hdpi',    size: 72 },
  { dir: 'mipmap-xhdpi',   size: 96 },
  { dir: 'mipmap-xxhdpi',  size: 144 },
  { dir: 'mipmap-xxxhdpi', size: 192 },
  { dir: 'mipmap-anydpi-v26', size: 192 }, // optional adaptive icon placeholder
  { dir: 'playstore',      size: 512 },
];
const ANDROID_RES = path.join(__dirname, 'nexora-android', 'android', 'app', 'src', 'main', 'res');
const PLAY_OUT    = path.join(__dirname, 'nexora-android', 'playstore');

function hex(s) { return [parseInt(s.slice(1,3),16), parseInt(s.slice(3,5),16), parseInt(s.slice(5,7),16)]; }
function lerp(a,b,t) { return Math.round(a+(b-a)*t); }
function lerpHex(c1,c2,t) {
  const [r1,g1,b1]=hex(c1), [r2,g2,b2]=hex(c2);
  return `rgb(${lerp(r1,r2,t)},${lerp(g1,g2,t)},${lerp(b1,b2,t)})`;
}

for (const { dir, size } of SIZES) {
  const canvas = createCanvas(size, size);
  const ctx    = canvas.getContext('2d');
  // background: rounded rect #14102B
  ctx.fillStyle = '#14102B';
  const r = Math.round(size * 0.22);
  ctx.beginPath();
  ctx.moveTo(r, 0);
  ctx.lineTo(size-r, 0);
  ctx.quadraticCurveTo(size, 0, size, r);
  ctx.lineTo(size, size-r);
  ctx.quadraticCurveTo(size, size, size-r, size);
  ctx.lineTo(r, size);
  ctx.quadraticCurveTo(0, size, 0, size-r);
  ctx.lineTo(0, r);
  ctx.quadraticCurveTo(0, 0, r, 0);
  ctx.closePath();
  ctx.fill();
  // N with diagonal gradient A78BFA -> 7C3AED
  const grad = ctx.createLinearGradient(size*0.25, size*0.75, size*0.75, size*0.25);
  grad.addColorStop(0, '#A78BFA');
  grad.addColorStop(1, '#7C3AED');
  ctx.fillStyle = grad;
  ctx.font      = `700 ${Math.round(size*0.55)}px Arial Bold, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('N', size/2, size/2 + size*0.02);

  const outDir = (dir === 'playstore') ? PLAY_OUT : path.join(ANDROID_RES, dir);
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, 'ic_launcher.png');
  const outRound = path.join(outDir, 'ic_launcher_round.png');
  const buf = canvas.toBuffer('image/png');
  fs.writeFileSync(outPath, buf);
  fs.writeFileSync(outRound, buf);
  console.log('wrote', outPath);
}
// Also write favicon-style PNG for web use if lacking
fs.writeFileSync(path.join(__dirname, 'nexora-android', 'www', 'icon.png'), createCanvas(192,192).getContext('2d').canvas.toBuffer('image/png'));
console.log('done');
