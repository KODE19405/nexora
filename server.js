/* Nexora — zero-dependency local server
 * Serves the static app and proxies POST /api/ai to a real AI provider
 * (OpenAI-compatible Chat Completions API). The API key lives ONLY on the
 * server, read from environment variables — never shipped to the browser.
 *
 * Usage:
 *   AI_API_KEY=sk-... node server.js
 *   Then open http://127.0.0.1:8787/
 *
 * Env:
 *   AI_API_KEY   (required for AI)     API key for the provider
 *   AI_BASE_URL  (optional)            default https://api.openai.com/v1
 *   AI_MODEL     (optional)            default gpt-4o-mini
 *   PORT         (optional)            default 8787
 *   HOST         (optional)            default 127.0.0.1
 */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = Number(process.env.PORT) || 8787;
const HOST = process.env.HOST || '127.0.0.1';
const AI_API_KEY = process.env.AI_API_KEY || '';
const AI_BASE_URL = (process.env.AI_BASE_URL || 'https://api.openai.com/v1').replace(/\/+$/, '');
const AI_MODEL = process.env.AI_MODEL || 'gpt-4o-mini';
const ROOT = __dirname;

const MIME = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.webp': 'image/webp', '.ico': 'image/x-icon', '.json': 'application/json; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8', '.pdf': 'application/pdf',
  '.woff2': 'font/woff2', '.txt': 'text/plain; charset=utf-8'
};

/* ── Rate limiter (per IP, fixed window) ── */
const WINDOW_MS = 10 * 60 * 1000, MAX_REQ = 30;
const hits = new Map();
function rateLimited(ip) {
  const now = Date.now();
  let e = hits.get(ip);
  if (!e || now > e.reset) { e = { count: 0, reset: now + WINDOW_MS }; hits.set(ip, e); }
  e.count += 1;
  if (hits.size > 5000) { for (const [k, v] of hits) if (now > v.reset) hits.delete(k); }
  return e.count > MAX_REQ;
}

function sendJson(res, status, obj) {
  const body = JSON.stringify(obj);
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(body),
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff'
  });
  res.end(body);
}

function readBody(req, limit) {
  return new Promise((resolve, reject) => {
    let size = 0; const chunks = [];
    req.on('data', (c) => {
      size += c.length;
      if (size > limit) { reject(new Error('PAYLOAD_TOO_LARGE')); req.destroy(); return; }
      chunks.push(c);
    });
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}

/* ── Input validation for /api/ai ── */
function validateMessages(payload) {
  if (!payload || typeof payload !== 'object') return 'Payload harus berupa object JSON.';
  const msgs = payload.messages;
  if (!Array.isArray(msgs) || msgs.length === 0) return 'messages harus berupa array yang tidak kosong.';
  if (msgs.length > 20) return 'Maksimal 20 pesan per permintaan.';
  let total = 0;
  for (const m of msgs) {
    if (!m || typeof m !== 'object') return 'Setiap pesan harus berupa object.';
    if (m.role !== 'user' && m.role !== 'assistant') return 'role hanya boleh user atau assistant.';
    if (typeof m.content !== 'string') return 'content harus berupa string.';
    const len = m.content.length;
    if (len === 0) return 'Pesan kosong tidak diperbolehkan.';
    if (len > 2000) return 'Setiap pesan maksimal 2000 karakter.';
    total += len;
  }
  if (total > 12000) return 'Total pesan maksimal 12000 karakter.';
  return null;
}

const SYSTEM_PROMPT = 'Kamu asisten keuangan pribadi di aplikasi Nexora. Jawab dalam bahasa Indonesia, hangat dan ringkas (maksimal 150 kata), beri 2 sampai 3 saran konkret berdasarkan data yang diberikan pengguna. Jangan pakai markdown atau tabel. Jangan mengarang angka yang tidak ada di data. Ingatkan singkat bahwa ini bukan nasihat keuangan profesional hanya jika relevan.';

async function handleAi(req, res) {
  const ip = req.socket.remoteAddress || 'unknown';
  if (rateLimited(ip)) return sendJson(res, 429, { error: { code: 'RATE_LIMITED', message: 'Terlalu banyak permintaan. Coba lagi beberapa menit lagi.' } });
  if (!AI_API_KEY) return sendJson(res, 503, { error: { code: 'AI_NOT_CONFIGURED', message: 'AI belum dikonfigurasi di server. Set AI_API_KEY (dan opsional AI_BASE_URL, AI_MODEL) lalu jalankan ulang server.' } });

  let payload;
  try {
    const raw = await readBody(req, 64 * 1024);
    payload = JSON.parse(raw);
  } catch (e) {
    const code = (e && e.message === 'PAYLOAD_TOO_LARGE') ? 413 : 400;
    return sendJson(res, code, { error: { code: code === 413 ? 'PAYLOAD_TOO_LARGE' : 'BAD_JSON', message: code === 413 ? 'Body terlalu besar.' : 'Body bukan JSON yang valid.' } });
  }
  const err = validateMessages(payload);
  if (err) return sendJson(res, 400, { error: { code: 'VALIDATION', message: err } });

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 20000);
  try {
    const upstream = await fetch(AI_BASE_URL + '/chat/completions', {
      method: 'POST',
      signal: controller.signal,
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + AI_API_KEY },
      body: JSON.stringify({
        model: AI_MODEL,
        temperature: 0.4,
        max_tokens: 400,
        messages: [{ role: 'system', content: SYSTEM_PROMPT }].concat(payload.messages)
      })
    });
    if (!upstream.ok) {
      const detail = await upstream.text().catch(() => '');
      console.error('[ai] provider error', upstream.status, detail.slice(0, 300));
      return sendJson(res, 502, { error: { code: 'AI_PROVIDER_ERROR', message: 'Penyedia AI mengembalikan error (' + upstream.status + '). Periksa konfigurasi server.' } });
    }
    const data = await upstream.json();
    const reply = data && data.choices && data.choices[0] && data.choices[0].message && typeof data.choices[0].message.content === 'string'
      ? data.choices[0].message.content.trim() : '';
    if (!reply) return sendJson(res, 502, { error: { code: 'AI_EMPTY', message: 'Penyedia AI mengembalikan jawaban kosong.' } });
    return sendJson(res, 200, { reply });
  } catch (e) {
    const aborted = e && e.name === 'AbortError';
    console.error('[ai] request failed:', aborted ? 'timeout' : (e && e.message));
    return sendJson(res, 504, { error: { code: aborted ? 'AI_TIMEOUT' : 'AI_UNREACHABLE', message: aborted ? 'Penyedia AI tidak merespons dalam 20 detik.' : 'Tidak bisa menghubungi penyedia AI.' } });
  } finally {
    clearTimeout(timer);
  }
}

function serveStatic(req, res, pathname) {
  let rel = decodeURIComponent(pathname);
  if (rel === '/') rel = '/Nexora.html';
  const filePath = path.normalize(path.join(ROOT, rel));
  if (!filePath.startsWith(ROOT)) { res.writeHead(403); return res.end('Forbidden'); }
  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }); return res.end('Not found'); }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      'Content-Type': MIME[ext] || 'application/octet-stream',
      'X-Content-Type-Options': 'nosniff',
      'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=3600'
    });
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://' + HOST);
  if (req.method === 'POST' && url.pathname === '/api/ai') return void handleAi(req, res);
  if (req.method === 'GET' && url.pathname === '/api/health') return sendJson(res, 200, { ok: true, aiConfigured: Boolean(AI_API_KEY), model: AI_API_KEY ? AI_MODEL : null });
  if (req.method === 'GET' || req.method === 'HEAD') return serveStatic(req, res, url.pathname);
  res.writeHead(405, { Allow: 'GET, POST' }); res.end('Method Not Allowed');
});

server.listen(PORT, HOST, () => {
  console.log('Nexora server → http://' + HOST + ':' + PORT + '/');
  console.log('AI: ' + (AI_API_KEY ? 'configured (' + AI_MODEL + ' via ' + AI_BASE_URL + ')' : 'NOT configured — set AI_API_KEY to enable /api/ai'));
});
