# Nexora — Riset Fitur Premium (Nov 2026)

Riset pasar SaaS keuangan modern & aplikasi bisnis untuk menentukan fitur premium yang layak untuk Nexora (personal & small-business finance, mobile-first, Indonesia). **Belum diimplementasikan** — ini dokumen keputusan. Semua harga/fitur vendor berubah; verifikasi ulang sebelum eksekusi.

Legenda: **Manfaat** (1–5), **Kompleksitas** (Rendah/Sedang/Tinggi), **Kesesuaian Nexora** (1–5).

## Tier 1 — Prioritas tinggi (layak dikerjakan berikutnya)

| Fitur | Manfaat | Kompleksitas | Kesesuaian | Referensi pasar |
|---|---|---|---|---|
| **Pengingat pembayaran invoice (otomatis, multi-tahap)** — email/WA H-7, hari-H, H+3, H+7 sebelum/sesudah jatuh tempo; berhenti otomatis saat invoice lunas | 5 | Sedang | 5 | [Chaser/Kolleno/Upflow — The Finance Lead](https://thefinancelead.com/blog/accounts-receivable-automation-software/), [QBO reminders 3 jadwal / 90 hari](http://fitsmallbusiness.com/accounting/accounts-receivable-automation), [AR Workflow: $49–89/user/bln](https://arworkflow.com/blog/accounts-receivable-automation-software) |
| **Prediksi arus kas berbasis riwayat** (moving-average/trend pengeluaran & pemasukan 30–90 hari, bukan sekadar "proyeksi bulan berjalan") | 5 | Sedang | 5 | [Best Cash Flow Forecasting 2026 — Prophix](https://www.prophix.com/blog/best-cash-flow-forecasting-software/), [Float $105/bln, 13-minggu rolling](https://www.floatapp.com/blog/compare-cash-flow-forecasting-tools), [ChatFin AI CFO](https://chatfin.ai/blog/top-ai-tools-for-cfos/top-10-ai-tools-for-cash-flow-forecasting-2026-edition/) |
| **Audit log aktivitas lokal** — catat create/update/delete transaksi, invoice dicetak, pengaturan diubah; ekspor CSV; berguna untuk bisnis dengan pegawai | 4 | Rendah–Sedang | 5 | [Humbleteam B2B audit log UX](https://humbleteam.com/blog/b2b-saas-audit-log-activity-history-ux), [Koder.ai audit trails for small business](https://koder.ai/blog/audit-trails-small-business-apps), [Clockify audit log (Enterprise tier)](https://clockify.me/help/administration/audit-log) |
| **Insight AI lebih dalam** — analisis anomali pengeluaran vs bulan lalu, deteksi kategori "bocor", saran konkret; perlu data lebih kaya (sudah ada anggaran & goals) | 4 | Sedang | 5 | [Best AI Tools for CFOs 2026 — ai-board.studio](https://ai-board.studio/en/blog/best-ai-tools-for-cfos-2026), [Float scenario planning](https://www.floatapp.com/blog/compare-cash-flow-forecasting-tools) |
| **Ringkasan bulanan PDF otomatis** (laporan P&L + neraca sederhana + grafik) — shareable ke partner/investor | 4 | Sedang | 4 | [Fathom $59/bln untuk advisor](https://saashyre.com/saas/best-ai-cash-flow-forecasting-software) |
| **Approval/atau setidaknya konfirmasi dua-langkah** untuk aksi destruktif (hapus massal, reset data) + "ekspor backup JSON" | 4 | Rendah | 5 | Praktik umum SaaS (lihat audit log di atas); mengurangi kehilangan data localStorage |

## Tier 2 — Peningkatan premium (setelah Tier 1)

| Fitur | Manfaat | Kompleksitas | Kesesuaian | Referensi pasar |
|---|---|---|---|---|
| **Customer portal invoice** — klien lihat/bayar invoice via link unik, status otomatis "Lunas" | 4 | Tinggi | 3 | [Upflow (4.8★, 230 G2)](https://technologyadvice.com/blog/sales/accounts-receivable-automation-software/), [Versapay kolaboratif](https://www.linkedin.com/pulse/top-accounts-receivable-tools-ranked-by-automation-features-2026-guide) |
| **Manajemen pengeluaran tim + approval sederhana** — pegawai submit, owner approve (perlu multi-user dulu) | 4 | Tinggi | 3 | [Zoho Expense free ≤3 user, $3–5/user/bln](https://www.saasodds.com/blog/expense-management-software-for-small-business), [Expensify Collect $5/member/bln](https://www.toptentool.com/best-expense-tracking-software-for-small-business/), [Ramp free tier](https://www.saasodds.com/blog/expense-management-software-for-small-business) |
| **Custom dashboard (widget on/off, urutan, rentang data)** — sebagian sudah hadir lewat "Kelola menu"; lanjutkan ke widget-level | 3 | Sedang–Tinggi | 4 | Pola umum; lihat [Prophix dashboards](https://www.prophix.com/blog/best-cash-flow-forecasting-software/) |
| **Rekonsiliasi rekening/e-wallet** dari mutasi CSV bank (BCA/Mandiri/dll) — cocok konteks Indonesia | 4 | Tinggi | 4 | [Tesorio/Float: koneksi bank = syarat akurasi forecast](https://www.concourse.ai/insights/best-cash-forecasting-tools) |
| **Multi-mata uang & multi-bisnis (entitas)** | 3 | Tinggi | 3 | [Float (Xero/QBO native)](https://www.floatapp.com/blog/compare-cash-flow-forecasting-tools), [Agicap multi-currency](https://farseer.com/blog/cash-flow-forecasting-software) |
| **Workflow automation sederhana** ("jika saldo < X → ingatkan", "jika invoice lewat tempo → buat tugas") | 3 | Tinggi | 3 | [Zapier-style patterns di AR automation](https://www.concourse.ai/insights/best-invoice-automation-software) |

## Tier 3 — Rencana masa depan (butuh backend & akun, di luar cakupan file tunggal)

| Fitur | Catatan | Referensi |
|---|---|---|
| **Sinkronisasi cloud multi-perangkat + login** | localStorage tidak cukup; perlu DB + auth | praktik standar SaaS |
| **Integrasi langsung bank/e-wallet (API/open banking)** | Regulasi & konektor per bank; Ruang lingkup besar | [Trovata multibank $24k/thn](https://www.floatapp.com/blog/compare-cash-flow-forecasting-tools) |
| **Pembayaran langsung dari invoice (payment link: QRIS/e-wallet/kartu)** | Perlu PSP (Midtrans/Xendit), MDR, kepatuhan PCI | [BILL $49/user/bln dengan payment links](https://arworkflow.com/blog/accounts-receivable-automation-software), [QuickBooks Payments 4.53/5](https://technologyadvice.com/blog/sales/accounts-receivable-automation-software/) |
| **AI CFO otonom (forecast real-time + aksi otomatis)** | Enterprise-grade, mahal; bukan fit untuk Nexora saat ini | [Concourse](https://www.concourse.ai/insights/best-cash-forecasting-tools), [Tesorio 95% 13-minggu](https://chatfin.ai/blog/top-ai-tools-for-cfos/top-10-ai-tools-for-cash-flow-forecasting-2026-edition/) |
| **Kolaborasi tim/roles/SSO** | Menyusul cloud sync | [Humbleteam: audit log per owner](https://humbleteam.com/blog/b2b-saas-audit-log-activity-history-ux), [Schematic audit + RBAC](https://schematichq.com/blog/permissions-and-audit-log) |

## Rekomendasi eksekusi (urutan)

1. **Ekspor backup JSON + restore** (fondasi, proteksi data localStorage) — Tier 1, kompleksitas rendah.
2. **Audit log lokal + ekspor CSV** — Tier 1, kompleksitas rendah–sedang.
3. **Pengingat invoice jatuh tempo (H-3/H+3) via email/WA "mailto:" / wa.me link** — Tier 1 tanpa backend; notifikasi penuh butuh server nanti.
4. **Proyeksi arus kas 30–90 hari berbasis tren** — upgrade modul Analitik yang sudah ada.
5. **Ringkasan bulanan PDF satu klik** — memperluas mesin cetak invoice yang sudah diperbaiki.

## Sumber utama

- ai-board.studio — [Best AI Tools for CFOs 2026](https://ai-board.studio/en/blog/best-ai-tools-for-cfos-2026)
- concourse.ai — [Best Cash Forecasting Tools 2026](https://www.concourse.ai/insights/best-cash-forecasting-tools) · [Best Invoice Automation Software 2026](https://www.concourse.ai/insights/best-invoice-automation-software)
- Prophix — [13 Best Cash Flow Forecasting Software 2026](https://www.prophix.com/blog/best-cash-flow-forecasting-software/)
- Float — [How To Compare Cash Flow Forecasting Tools](https://www.floatapp.com/blog/compare-cash-flow-forecasting-tools)
- saashyre.com — [AI Cash Flow Forecasting: Real Prices Compared](https://saashyre.com/saas/best-ai-cash-flow-forecasting-software)
- chatfin.ai — [Top 10 AI Cash Flow Forecasting 2026](https://chatfin.ai/blog/top-ai-tools-for-cfos/top-10-ai-tools-for-cash-flow-forecasting-2026-edition/)
- The Finance Lead — [Best Accounts Receivable Automation Software 2026](https://thefinancelead.com/blog/accounts-receivable-automation-software/)
- TechnologyAdvice — [7 Best AR Automation Software for 2026](https://technologyadvice.com/blog/sales/accounts-receivable-automation-software/)
- fitsmallbusiness.com — [Accounts Receivable Automation for SMB](http://fitsmallbusiness.com/accounting/accounts-receivable-automation) · [Top AR tools 2026](https://bobsbookkeepers.com/blog/top-accounts-receivable-tools-ranked-by-automation-features-2026-guide)
- Humbleteam — [B2B SaaS Audit Log UX](https://humbleteam.com/blog/b2b-saas-audit-log-activity-history-ux)
- Koder.ai — [Audit Trails for Small Business Apps](https://koder.ai/blog/audit-trails-small-business-apps)
- Clockify — [Audit log (Enterprise)](https://clockify.me/help/administration/audit-log)
- Schematic — [SaaS Audit Logs and Permissions](https://schematichq.com/blog/permissions-and-audit-log)
- saasodds.com — [Expense Management for SMB 2026](https://www.saasodds.com/blog/expense-management-software-for-small-business)
- toptentool.com — [Best Expense Tracking 2026](https://www.toptentool.com/best-expense-tracking-software-for-small-business/)
- tailride.so — [7 Best Expense Management for SMB](http://tailride.so/blog/best-expense-management-software-for-small-business)
