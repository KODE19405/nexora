# AI Assistance — Setup & Arsitektur

AI Assistance di Nexora memanggil penyedia AI sungguhan lewat backend lokal. API key **hanya** berada di server (environment variable) dan tidak pernah dikirim ke browser.

## Menjalankan

```powershell
# 1. Set environment variable (PowerShell)
$env:AI_API_KEY = "sk-..."
# Opsional:
$env:AI_BASE_URL = "https://api.openai.com/v1"   # atau openrouter/groq/ollama dst.
$env:AI_MODEL    = "gpt-4o-mini"

# 2. Jalankan server (Node.js >= 18, tanpa dependensi)
node server.js

# 3. Buka http://127.0.0.1:8787/
```

Cek status AI: `GET http://127.0.0.1:8787/api/health` → `{ ok, aiConfigured, model }`.

## Cara kerja

- Browser → `POST /api/ai` dengan daftar pesan (`user`/`assistant`, maks 20 pesan, maks 2000 karakter/pesan, total maks 12.000 karakter, soal ~64 KB body).
- Server menambahkan system prompt sendiri (asisten keuangan Nexora, bahasa Indonesia, ringkas), memanggil `POST {AI_BASE_URL}/chat/completions` (format OpenAI-compatible) dengan timeout 20 detik dan `max_tokens=400`.
- Rate limit per IP: 30 permintaan / 10 menit.
- Jika `AI_API_KEY` tidak di-set → `503 AI_NOT_CONFIGURED`; frontend menampilkan **ringkasan data berlabel "bukan AI"** (bukan jawaban palsu yang menyamar sebagai AI).

## Batasan & catatan keamanan

- AI hanya menerima data ringkasan keuangan yang dirangkai client (`ctx()`): pemasukan/pengeluaran bulan ini, saldo, per kategori vs anggaran, target tabungan. Data transaksi mentah lengkap tidak dikirim.
- Server hanya bind ke `127.0.0.1` secara default dan memvalidasi header `Host` (hanya `localhost`/`127.0.0.1`/`[::1]`) — mitigasi DNS rebinding.
- File statik: dotfiles/`server.js`/`opencode.json`/`AGENTS.md` tidak disajikan (403); path traversal ditolak.
- Respons menyertakan `X-Frame-Options: DENY`, `Content-Security-Policy`, `Referrer-Policy: no-referrer`, `X-Content-Type-Options: nosniff`.
- Rate limit per IP: 30 permintaan / 10 menit (`Retry-After: 600` saat 429). Body ≤ 64 KB, timeout baca body 30 s, `requestTimeout` 30 s.
- Set `NEXORA_TOKEN` untuk mewajibkan `Authorization: Bearer <token>` pada `/api/ai` (wajib bila `HOST` bukan loopback).
- **Jangan set `HOST=0.0.0.0`** tanpa token + pemahaman risikonya: tanpa auth, siapa pun di jaringan dapat memakai kuota AI Anda.
- Provider yang dipakai adalah pihak ketiga: data yang dikirim (ringkasan finansial) tunduk pada kebijakan privasi provider tsb. Untuk data sensitif gunakan provider/model lokal (mis. via Ollama).
- Endpoint ini tidak menyimpan prompt/jawaban (tidak ada logging konten); hanya kode status provider yang dicatat ke console.
- Jawaban AI bukan nasihat keuangan profesional (system prompt menegaskan ini bila relevan).
- Catatan: `.env` **tidak** dibaca otomatis oleh server — set environment variable di shell Anda.

## Troubleshooting

| Gejala | Penyebab | Solusi |
|---|---|---|
| `503 AI_NOT_CONFIGURED` | `AI_API_KEY` kosong | set env var lalu restart server |
| `502 AI_PROVIDER_ERROR` | key salah / model tidak ada / kuota habis | cek console server (detail status provider) |
| `504 AI_TIMEOUT` | provider lambat/jaringan | coba model lebih kecil atau periksa koneksi |
| `429 RATE_LIMITED` | lebih dari 30 req/10 menit | tunggu jendela berikutnya |
| "Ringkasan data (bukan AI)" di chat | app dibuka via `file://` atau server mati | buka via `http://127.0.0.1:8787/` |
