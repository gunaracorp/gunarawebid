# ROADMAP — GUNARA OS · UPGRADE 99 HARI

> **v1.0.0.0 → v2.0.0.0** · Mulai Sabtu, 21 November 2026 · Selesai Sabtu, 27 Februari 2027
> Satu hari = satu roadmap = satu commit = satu entri worklog. Kode lanjutan: `LANJUTKAN GUNARA-OS DAY-XX`.

Dokumen desain lengkap: [`docs/roadmap/gunara-os-roadmap-99-hari.pdf`](docs/roadmap/gunara-os-roadmap-99-hari.pdf) (35 halaman).

## Peta 10 Fase

| Fase | Hari | Periode | Fokus | Lapisan UWA-7 | Target |
|---|---|---|---|---|---|
| F1 | 1–9 | 21 Nov 2026 – 29 Nov 2026 | Fondasi & Tata Kelola | L06 — Otoritas | `v1.1.0.9` |
| F2 | 10–18 | 30 Nov 2026 – 8 Des 2026 | Otoritas Domain & Produksi | L06 — Otoritas | `v1.2.0.18` |
| F3 | 19–30 | 9 Des 2026 – 20 Des 2026 | Arsitektur Konten | L03 — Ilmu | `v1.3.0.30` |
| F4 | 31–40 | 21 Des 2026 – 30 Des 2026 | Sistem Identitas Visual 2.0 | L04 — Penglihatan | `v1.4.0.40` |
| F5 | 41–52 | 31 Des 2026 – 11 Jan 2027 | Pengalaman Interaktif | L02 — Akal | `v1.5.0.52` |
| F6 | 53–62 | 12 Jan 2027 – 21 Jan 2027 | Mesin Konversi | L05 — Rahmah | `v1.6.0.62` |
| F7 | 63–72 | 22 Jan 2027 – 31 Jan 2027 | Intelijen & Otomasi AI | L07 — Waktu | `v1.7.0.72` |
| F8 | 73–84 | 1 Feb 2027 – 12 Feb 2027 | Ekosistem & Produk | L01 — Alam Fisik | `v1.8.0.84` |
| F9 | 85–92 | 13 Feb 2027 – 20 Feb 2027 | Sertifikasi & Tata Kelola Mutu | L03+06 — Ilmu & Otoritas | `v1.9.0.92` |
| F10 | 93–99 | 21 Feb 2027 – 27 Feb 2027 | Peluncuran Peradaban v2.0.0.0 | L07 — Waktu | `v2.0.0.99` |

## Fase 1 — Fondasi & Tata Kelola (Hari 1–9)

**Lapisan:** UWA-7 Lapisan 06 — Otoritas · **Target versi:** `v1.1.0.9`

Sebelum satu fitur baru dibangun, pondasi yang mengukur segalanya harus berdiri. Fase pertama memasang sistem versi, mengukur kondisi awal situs, memperketat CI/CD, lalu menutup celah keamanan dan observabilitas. Filosofinya sesuai doktrin Gunara: struktur sebelum karya — tidak ada upgrade yang berkelanjutan tanpa tata kelola yang mengawasinya.

### Day 1 · 21 Nov 2026 — Aktivasi Sistem Versi & Worklog Gunara OS ✅
- **Tujuan:** Menetapkan bahasa versi satu-satunya yang dipakai seluruh ekosistem: satu hari, satu iterasi, satu catatan.
- **Tugas:** Terbitkan VERSIONING.md — skema MAJOR.MINOR.PATCH.BUILD beserta contoh evolusi v1.0.0.0
- **Tugas:** Terbitkan WORKLOG.md — format log harian #001 dengan rubrik hasil/bukti/versi
- **Tugas:** Terbitkan ROADMAP.md — checklist 99 hari di repo, sinkron dengan dokumen ini
- **Tugas:** Tag git v1.0.0.0 sebagai baseline resmi 21 November 2026
- **Pakar:** `E46` · `A2` · **Hasil:** Tag v1.0.0.0 + 3 dokumen tata kelola di repo · **Target:** `v1.0.0.1`

### Day 2 · 22 Nov 2026 — Audit Teknis Baseline
- **Tujuan:** Membekukan angka kondisi awal sebagai garis dasar yang semua upgrade nanti dibandingkan dengannya.
- **Tugas:** Jalankan Lighthouse (performa, SEO, aksesibilitas, praktik terbaik) di semua breakpoint
- **Tugas:** Pindai aksesibilitas dengan axe-core dan kumpulkan seluruh pelanggaran
- **Tugas:** Ukur ukuran bundle JS, LCP, CLS, dan jumlah request — simpan ke docs/audit/baseline.md
- **Pakar:** `E43` · `D34` · **Hasil:** docs/audit/baseline.md — skor awal tercatat · **Target:** `v1.0.0.2`

### Day 3 · 23 Nov 2026 — CI/CD Hardening
- **Tujuan:** Mengubah pipeline dari sekadar build menjadi gerbang mutu yang menolak regresi.
- **Tugas:** Hidupkan typecheck ketat (hapus ignoreBuildErrors) dan perbaiki seluruh temuan
- **Tugas:** Jadikan lint blocking; tambahkan job Lighthouse CI dengan budget anggaran performa
- **Tugas:** Aktifkan preview deployment per pull request dengan badge status di README
- **Pakar:** `D31` · `E46` · **Hasil:** Pipeline CI menolak build yang menurunkan skor · **Target:** `v1.0.0.3`

### Day 4 · 24 Nov 2026 — SEO Teknis Mendalam
- **Tujuan:** Memastikan mesin pencari membaca seluruh arsitektur pengetahuan Gunara dengan benar.
- **Tugas:** Tambahkan sitemap.ts dinamis dan robots.txt terkurasi per rute
- **Tugas:** Pasang canonical URL, breadcrumbs, dan structured data Organization + WebSite + Service
- **Tugas:** Perbaiki hierarki heading dan meta description seluruh halaman
- **Pakar:** `E39` · `E42` · **Hasil:** Indeks mesin pencari bersih dan lengkap · **Target:** `v1.0.0.4`

### Day 5 · 25 Nov 2026 — Analitik & Persetujuan Privasi
- **Tujuan:** Membangun sistem saraf pengukuran yang tahu siapa datang, dari mana, dan ke mana perginya.
- **Tugas:** Pasang Vercel Analytics atau Plausible dengan event konversi terdefinisi
- **Tugas:** Bangun banner consent ramah GDPR/UU PDP dan halaman kebijakan privasi
- **Tugas:** Definisikan 10 event utama: scroll depth, klik CTA, unduh brand kit, buka palette
- **Pakar:** `E43` · `B16` · **Hasil:** Dasbor analitik hidup dengan event terukur · **Target:** `v1.0.0.5`

### Day 6 · 26 Nov 2026 — Security Headers & CSP
- **Tujuan:** Menaikkan pagar pertahanan lapis pertama tanpa merusak satu piksel pun.
- **Tugas:** Implementasikan CSP nonce via middleware Next.js; audit semua skrip pihak ketiga
- **Tugas:** Set HSTS, X-Frame-Options, Referrer-Policy, Permissions-Policy di next.config
- **Tugas:** Uji dengan securityheaders.com — target grade A+
- **Pakar:** `E46` · `D31` · **Hasil:** Grade A+ pada uji header keamanan · **Target:** `v1.0.0.6`

### Day 7 · 27 Nov 2026 — Anggaran Performa
- **Tujuan:** Menetapkan konstitusi kecepatan: setiap kilobyte harus punya alasan untuk ada.
- **Tugas:** Set performance budget: JS < 170KB gzip, LCP < 2.0s, CLS < 0.05
- **Tugas:** Konversi gambar ke AVIF/WebP responsif dan subset font ke glyph yang benar-benar dipakai
- **Tugas:** Audit ulang framer-motion — ganti animasi berat dengan CSS transform bila memungkinkan
- **Pakar:** `D33` · `D31` · **Hasil:** Budget performa tertanam di CI · **Target:** `v1.0.0.7`

### Day 8 · 28 Nov 2026 — Observabilitas & Error Budget
- **Tujuan:** Memberi situs mata: setiap error terlihat, terukur, dan punya ambang toleransi.
- **Tugas:** Integrasi Sentry untuk error frontend dan API dengan release tracking
- **Tugas:** Pasang uptime monitor eksternal (Better Stack/UptimeRobot) dengan alert Telegram
- **Tugas:** Definisikan error budget bulanan dan prosedur war-room saat terlampaui
- **Pakar:** `E46` · `E43` · **Hasil:** Dashboard observabilitas + alert aktif · **Target:** `v1.0.0.8`

### Day 9 · 29 Nov 2026 — Backup, DR & Credential Vault
- **Tujuan:** Menutup fase fondasi dengan jaminan: data tidak hilang, rahasia tidak bocor.
- **Tugas:** Set kebijakan backup database dan aset dengan retensi 30 hari + uji restore
- **Tugas:** Konsolidasi seluruh kredensial ke 1Password vault per G-DOS; rotasi kunci lama
- **Tugas:** Tulis runbook pemulihan bencana satu halaman dan latih sekali
- **Pakar:** `E46` · `A10` · **Hasil:** Runbook DR + vault bersih — fase 1 selesai · **Target:** `v1.1.0.9`

---
## Fase 2 — Otoritas Domain & Produksi (Hari 10–18)

**Lapisan:** UWA-7 Lapisan 06 — Otoritas · **Target versi:** `v1.2.0.18`

Fondasi sudah terkunci; kini situs naik tahta ke infrastruktur produksi sejati. Fase ini memindahkan gunara.web.id ke Vercel, membangun perimeter Cloudflare, menstandarkan identitas email, dan menyiapkan semua seragam domain — sehingga setiap lalu lintas keluar-masuk ekosistem melewati gerbang yang dimiliki dan diawasi sepenuhnya.

### Day 10 · 30 Nov 2026 — Deploy Produksi Vercel + DNS
- **Tujuan:** Memindahkan gunara.web.id dari lingkungan pengembangan ke produksi Vercel dengan DNS Cloudflare.
- **Tugas:** Import repo ke Vercel, konfigurasi env produksi, dan deploy pertama
- **Tugas:** Arahkan DNS via Cloudflare (proxied) dengan redirect www dan apex yang benar
- **Tugas:** Verifikasi SSL, HSTS, dan semua rute berfungsi di domain final
- **Pakar:** `E46` · `D31` · **Hasil:** gunara.web.id live di Vercel · **Target:** `v1.1.0.10`

### Day 11 · 1 Des 2026 — Email Brand & Deliverabilitas
- **Tujuan:** Setiap surat dari ekosistem dikirim dengan nama domain sendiri dan reputasi yang terjaga.
- **Tugas:** Setup Google Workspace/Zoho untuk hello@, press@, legal@ gunara.web.id
- **Tugas:** Konfigurasi SPF, DKIM, DMARC (p=quarantine naik bertahap ke reject)
- **Tugas:** Uji deliverabilitas ke Gmail/Outlook dan catat skor ke docs
- **Pakar:** `A10` · `E46` · **Hasil:** Email brand aktif, DMARC terkunci · **Target:** `v1.1.0.11`

### Day 12 · 2 Des 2026 — Cloudflare Edge Perimeter
- **Tujuan:** Menjadikan Cloudflare benteng internet edge sesuai stack G-DOS: CDN, WAF, dan aturan cache.
- **Tugas:** Aktifkan WAF managed rules + rate limiting pada /api
- **Tugas:** Buat cache rules: aset statis cache agresif, HTML revalidate sesuai strategi
- **Tugas:** Aktifkan bot fight mode dan tentukan whitelist monitor uptime
- **Pakar:** `E46` · `D31` · **Hasil:** Perimeter aktif dengan WAF + cache rules · **Target:** `v1.1.0.12`

### Day 13 · 3 Des 2026 — TLS & Protokol Modern
- **Tujuan:** Menyelesaikan sertifikasi transport: cepat, modern, dan terdaftar resmi.
- **Tugas:** Naikkan TLS 1.3, aktifkan HSTS preload dan daftarkan ke preload list
- **Tugas:** Terbitkan security.txt dan .well-known/change-password
- **Tugas:** Audit cipher suite dengan SSL Labs — target A+
- **Pakar:** `E46` · `D31` · **Hasil:** SSL Labs A+ + HSTS preload · **Target:** `v1.1.0.13`

### Day 14 · 4 Des 2026 — OG Image Generator Dinamis
- **Tujuan:** Setiap tautan yang dibagikan di sosial media memancarkan identitas navy-amber secara otomatis.
- **Tugas:** Bangun generator OG image via @vercel/og dengan template brand (Sora + amber)
- **Tugas:** Terapkan per-rute: judul halaman, kicker, dan mark Gunara otomatis
- **Tugas:** Uji render di Twitter/X, WhatsApp, LinkedIn, dan Facebook debugger
- **Pakar:** `C19` · `E40` · **Hasil:** OG image brand otomatis di semua rute · **Target:** `v1.1.0.14`

### Day 15 · 5 Des 2026 — Ikon Aplikasi & Favicon Lengkap
- **Tujuan:** Identitas mark Gunara tampil tajam di setiap layar perangkat, dari tab browser hingga homescreen.
- **Tugas:** Generate set lengkap: favicon ico, apple-touch, maskable android, safari pinned tab
- **Tugas:** Susun SVG gunara-mark sebagai favicon utama dengan tema gelap/terang
- **Tugas:** Uji tampilan di iOS, Android, dan desktop browser
- **Pakar:** `C22` · `D27` · **Hasil:** Paket ikon lengkap tanpa piksel buram · **Target:** `v1.1.0.15`

### Day 16 · 6 Des 2026 — PWA Baseline
- **Tujuan:** Situs bisa dipasang dan tetap menyapa walau jaringan hilang — citra sistem yang tangguh.
- **Tugas:** Tambahkan manifest.json dengan nama, warna tema navy, dan ikon maskable
- **Tugas:** Buat halaman offline fallback bergaya terminal G-DOS
- **Tugas:** Pastikan installability lulus uji Lighthouse PWA dasar
- **Pakar:** `D30` · `D28` · **Hasil:** Situs dapat dipasang + offline fallback · **Target:** `v1.1.0.16`

### Day 17 · 7 Des 2026 — Strategi Domain Ekosistem
- **Tujuan:** Memetakan peran setiap domain dalam konstelasi Gunara agar tidak ada organ yang berebut fungsi.
- **Tugas:** Susun matriks domain: fungsi, kanonik, status, dan jalur migrasi masing-masing
- **Tugas:** Tetapkan kebijakan redirect dan canonical antar domain ekosistem
- **Tugas:** Prioritaskan rollout berikutnya: juraganwebsite, topmanajemen, pusatperizinan
- **Pakar:** `A2` · `A5` · **Hasil:** Matriks domain ekosistem terdokumentasi · **Target:** `v1.1.0.17`

### Day 18 · 8 Des 2026 — Halaman Legal Lengkap
- **Tujuan:** Kepercayaan profesional dibangun di atas kejelasan hukum yang mudah ditemukan dan dibaca.
- **Tugas:** Tulis dan terbitkan Kebijakan Privasi, Ketentuan Layanan, dan Disclaimer
- **Tugas:** Tambahkan lisensi kode (MIT) vs aset brand (reserved) pada halaman lisensi
- **Tugas:** Tautkan semua halaman legal di footer dan sitemap
- **Pakar:** `A10` · `E46` · **Hasil:** Paket legal lengkap — fase 2 selesai · **Target:** `v1.2.0.18`

---
## Fase 3 — Arsitektur Konten (Hari 19–30)

**Lapisan:** UWA-7 Lapisan 03 — Ilmu · **Target versi:** `v1.3.0.30`

Struktur dan produksi siap; kini isi yang menjadi sumber kekuasaan dibangun. Fase ini mengubah situs dari kartu nama menjadi perpustakaan otoritatif: metodologi diturunkan ke halaman mendalam, mesin publikasi dinyalakan, dan kalender editorial memastikan ilmu mengalir teratur sepanjang tahun — bukan ledakan sekali lalu bisu.

### Day 19 · 9 Des 2026 — Messaging House & Positioning
- **Tujuan:** Menempa satu rumusan posisi yang menjadi sumber kalimat untuk seluruh halaman dan materi.
- **Tugas:** Tulis positioning statement: untuk siapa, masalah apa, alternatif apa, bukti apa
- **Tugas:** Susun messaging house: pay-off utama + 3 pilar pesan + bukti per pilar
- **Tugas:** Kunci tone of voice: tegas-arsitektural, hangat-tetap-manusiawi, bebas jargon kosong
- **Pakar:** `A1` · `A3` · **Hasil:** Dokumen messaging house v1 · **Target:** `v1.2.0.19`

### Day 20 · 10 Des 2026 — Halaman Metodologi Mendalam
- **Tujuan:** Mengubah tab interaktif menjadi halaman penuh yang bisa dirujuk, dicari, dan dikutip.
- **Tugas:** Bangun /metodologi/umea dengan tangga tier UMEA-03 sampai UMEA-21
- **Tugas:** Bangun /metodologi/gdos dengan 5 pack D-10 sampai D-165
- **Tugas:** Bangun /metodologi/uwa-7 dengan 7 lapisan dan checklist per lapisan
- **Pakar:** `A2` · `E37` · **Hasil:** 3 halaman metodologi publik · **Target:** `v1.2.0.20`

### Day 21 · 11 Des 2026 — Halaman Gunara OS
- **Tujuan:** Menampilkan 165 dokumen arsitektur kelembagaan sebagai produk inti yang bisa dijelajahi.
- **Tugas:** Bangun /gunara-os: peta 20 domain kepemimpinan tier P0-P3
- **Tugas:** Tambahkan penjelasan Gunara OS Core (39 dokumen) hingga Super Organisasi (165)
- **Tugas:** Sediakan contoh dokumen publik sebagai teaser dan CTA akses penuh
- **Pakar:** `E44` · `A7` · **Hasil:** Halaman produk Gunara OS live · **Target:** `v1.2.0.21`

### Day 22 · 12 Des 2026 — Framework Studi Kasus + 2 Kasus Pertama
- **Tujuan:** Membuktikan metodologi dengan cerita keberhasilan yang terstruktur dan terukur.
- **Tugas:** Definisikan template kasus: konteks, masalah, pendekatan UMEA/UWA-7, hasil, bukti
- **Tugas:** Tulis kasus 1: transformasi digital digiman.id
- **Tugas:** Tulis kasus 2: tata kelola kelembagaan MUHDIN Indonesia
- **Pakar:** `E37` · `A10` · **Hasil:** 2 studi kasus terbit dengan template · **Target:** `v1.2.0.22`

### Day 23 · 13 Des 2026 — Mesin Publikasi Blog (MDX)
- **Tujuan:** Menyalakan mesin yang membuat ilmu bisa diterbitkan dalam menit tanpa mengorbankan mutu.
- **Tugas:** Setup MDX + frontmatter terstandar (kicker, lapisan UWA-7, penulis, waktu baca)
- **Tugas:** Bangun indeks artikel dengan filter per kategori dan daftar bacaan terkait
- **Tugas:** Tetapkan alur editorial: draft, review, terbit, update berkala
- **Pakar:** `E39` · `C25` · **Hasil:** Pipeline /insights operasional · **Target:** `v1.2.0.23`

### Day 24 · 14 Des 2026 — 5 Artikel Pilar Fondasi
- **Tujuan:** Menanam lima pohon konten abadi yang menguasai kata kunci inti metodologi.
- **Tugas:** Artikel 1: Hukum Minimum Usaha — dari gerobak makanan ke resilient enterprise
- **Tugas:** Artikel 2: UWA-7 — arsitektur web tujuh lapis yang lahir dari praktik
- **Tugas:** Artikel 3-5: G-DOS command center, tangga UMEA, dan sistem warna tersertifikasi
- **Pakar:** `A3` · `E39` · **Hasil:** 5 artikel pilar ≥ 1.200 kata each · **Target:** `v1.2.0.24`

### Day 25 · 15 Des 2026 — Mesin Newsletter & Lead Magnet
- **Tujuan:** Mengubah pengunjung menjadi langganan dengan imbalan yang benar-benar bernilai.
- **Tugas:** Rancang lead magnet: Blueprint UWA-7 (PDF ringkas premium)
- **Tugas:** Bangun alur subscribe dengan Resend/Loops + email sambutan otomatis 3 seri
- **Tugas:** Pasang form newsletter di footer, akhir artikel, dan halaman metodologi
- **Pakar:** `E40` · `E36` · **Hasil:** Funnel newsletter end-to-end aktif · **Target:** `v1.2.0.25`

### Day 26 · 16 Des 2026 — Halaman Layanan Konsultansi
- **Tujuan:** Menjual keahlian dengan paket yang jelas, harga berani, dan proses yang transparan.
- **Tugas:** Rancang 3 layanan: Assessment UMEA, Implementasi G-DOS, Arsitektur Web UWA-7
- **Tugas:** Tulis proses kerja 4 langkah + timeframe + model harga per paket
- **Tugas:** Tambahkan CTA booking konsultasi di setiap layanan
- **Pakar:** `A7` · `E36` · **Hasil:** Halaman layanan dengan 3 paket · **Target:** `v1.2.0.26`

### Day 27 · 17 Des 2026 — Sistem Bukti Sosial
- **Tujuan:** Menyusun bukti kredibilitas sebagai bagian arsitektur, bukan tempelan testimoni.
- **Tugas:** Susun format testimoni terstandar: nama, peran, organisasi, hasil terukur
- **Tugas:** Bangun logo wall organisasi dengan aturan izin penggunaan
- **Tugas:** Integrasikan stat bar 165/20/3/6 dengan tautan bukti masing-masing
- **Pakar:** `A10` · `B16` · **Hasil:** Modul social proof tersambung data · **Target:** `v1.2.0.27`

### Day 28 · 18 Des 2026 — FAQ & Knowledge Base
- **Tujuan:** Menjawab seratus pertanyaan sekali jalan, menghemat seratus email, dan memanen featured snippet.
- **Tugas:** Kumpulkan 20 pertanyaan nyata dari klien dan prospek
- **Tugas:** Tulis jawaban ringkas-otoritatif dengan schema FAQPage per rute
- **Tugas:** Strukturkan knowledge base per kategori: metodologi, teknis, komersial
- **Pakar:** `E42` · `E39` · **Hasil:** 20 FAQ dengan rich schema · **Target:** `v1.2.0.28`

### Day 29 · 19 Des 2026 — Persiapan Internasionalisasi (id/en)
- **Tujuan:** Membuka pintu pasar global tanpa mengorbankan akar Indonesia.
- **Tugas:** Setup next-intl dengan routing locale dan fallback id
- **Tugas:** Terjemahkan 5 halaman kunci: home, metodologi, gunara-os, layanan, tentang
- **Tugas:** Terapkan hreflang dan locale-aware metadata
- **Pakar:** `B15` · `E41` · **Hasil:** Situs dwibahasa pada rute kunci · **Target:** `v1.2.0.29`

### Day 30 · 20 Des 2026 — Kalender Editorial Q1 2027
- **Tujuan:** Mengunci ritme publikasi tiga bulan ke depan agar mesin konten tidak pernah jeda.
- **Tugas:** Rancang 12 topik artikel Q1 yang memetakan funnel: sadar, pertimbangkan, putuskan
- **Tugas:** Tetapkan ritme 1 artikel/minggu + 1 newsletter/bulan
- **Tugas:** Kaitkan setiap topik dengan produk dan CTA yang relevan
- **Pakar:** `E39` · `E40` · **Hasil:** Kalender 12 topik terkunci — fase 3 selesai · **Target:** `v1.3.0.30`

---
## Fase 4 — Sistem Identitas Visual 2.0 (Hari 31–40)

**Lapisan:** UWA-7 Lapisan 04 — Penglihatan · **Target versi:** `v1.4.0.40`

Dengan konten mengalir, sistem penglihatan ditingkatkan dari palet menjadi tata bahasa visual yang utuh: token yang mengatur segala, gerak yang punya kaidah, ikon yang lahir dari grid yang sama, dan validasi yang memastikan keindahan dapat dibaca semua mata. Fase ini membuat identitas Gunara tidak hanya indah, tetapi tepat secara ilmiah.

### Day 31 · 21 Des 2026 — Audit & Ekspansi Design Token
- **Tujuan:** Menyempurnakan bahasa desain: satu token, satu makna, dipakai di mana saja tanpa pengecualian.
- **Tugas:** Audit seluruh nilai warna/spacing/radius yang menyebar di komponen
- **Tugas:** Terbitkan token v2: spacing scale 4px, radius, elevation/shadow, motion duration
- **Tugas:** Ekspor token ke JSON + CSS variables dan dokumen pemakaiannya
- **Pakar:** `D30` · `D31` · **Hasil:** Token system v2 terdokumentasi · **Target:** `v1.3.0.31`

### Day 32 · 22 Des 2026 — Sistem Tipografi Fluid
- **Tujuan:** Tipografi yang bernafas dengan layar: tetap megah di desktop, tetap sopan di ponsel.
- **Tugas:** Bangun type scale fluid dengan clamp() dari caption hingga display
- **Tugas:** Tetapkan aturan line-height, tracking, dan measure (60-75 karakter)
- **Tugas:** Audit seluruh komponen memakai scale baru tanpa hardcode
- **Pakar:** `C24` · `D32` · **Hasil:** Type scale fluid diterapkan global · **Target:** `v1.3.0.32`

### Day 33 · 23 Des 2026 — Motion System
- **Tujuan:** Gerak yang punya kaidah seperti warna: konsisten, bermakna, dan hormat pada pengguna sensitif gerak.
- **Tugas:** Definisikan motion token: duration 150/300/600ms, easing curves baku
- **Tugas:** Susun choreography scroll-reveal: urutan, delay, dan arah masuk elemen
- **Tugas:** Implementasikan varian prefers-reduced-motion untuk semua animasi
- **Pakar:** `D29` · `D34` · **Hasil:** Motion tokens + reduced-motion lengkap · **Target:** `v1.3.0.33`

### Day 34 · 24 Des 2026 — Ikonografi Kustom
- **Tujuan:** Satu keluarga ikon lahir dari grid 24px yang sama dengan mark Gunara.
- **Tugas:** Rancang 24 ikon inti (metodologi, ekosistem, tata kelola) di grid 24px 1.5px stroke
- **Tugas:** Standarkan terminasi stroke, sudut, dan optical balance dengan mark amber
- **Tugas:** Ekspor sebagai komponen React terdokumentasi + guideline pemakaian
- **Pakar:** `C22` · `D27` · **Hasil:** 24 ikon kustom dalam satu keluarga · **Target:** `v1.3.0.34`

### Day 35 · 25 Des 2026 — Penyempurnaan Logo System
- **Tujuan:** Logo yang bekerja di semua konteks: dari favicon 16px hingga backdrop panggung.
- **Tugas:** Definisikan lockup: horizontal, vertikal, mark-only, wordmark + clearspace
- **Tugas:** Susun varian responsif dan aturan monochrome/kontra
- **Tugas:** Dokumentasikan larangan penggunaan (misuse) yang paling sering terjadi
- **Pakar:** `C22` · `C23` · **Hasil:** Logo system v2 dengan clearspace · **Target:** `v1.3.0.35`

### Day 36 · 26 Des 2026 — Art Direction Fotografi
- **Tujuan:** Foto yang memperkuat citra arsitek sistem, bukan stok generik yang melemahkan.
- **Tugas:** Tulis brief pemotretan: karakter, lokasi, styling, dan daftar shot wajib
- **Tugas:** Tetapkan treatment: duotone navy-amber untuk foto atmosfer, natural untuk portrait
- **Tugas:** Buat sistem placeholder elegan untuk foto yang belum tersedia
- **Pakar:** `C20` · `B12` · **Hasil:** Brief fotografi + treatment guide · **Target:** `v1.3.0.36`

### Day 37 · 27 Des 2026 — Tata Bahasa Diagram
- **Tujuan:** Diagram UMEA/UWA-7 yang bisa dibuat siapa saja dengan kaidah yang sama — sistem, bukan kebetulan.
- **Tugas:** Definisikan grammar: node, connector, swimlane, dan hierarki visual fase
- **Tugas:** Rancang 8 diagram inti sebagai SVG kit: tangga UMEA, 7 lapisan, stack G-DOS
- **Tugas:** Standarkan palet diagram: fill pucat, border navy, aksen amber
- **Pakar:** `C21` · `C25` · **Hasil:** SVG diagram kit 8 diagram · **Target:** `v1.3.0.37`

### Day 38 · 28 Des 2026 — Polish Dual-Mode
- **Tujuan:** Mode gelap dan terang sama-sama megah — bukan satu megah, satu banyak mengorbankan.
- **Tugas:** Tuning chromatic kedua mode: elevation, glare, tekstur noise halus
- **Tugas:** Periksa setiap komponen di kedua mode dan semua breakpoint
- **Tugas:** Perbaiki transisi tema agar instan tanpa flash
- **Pakar:** `B13` · `D27` · **Hasil:** Kedua mode lolos audit piksel · **Target:** `v1.3.0.38`

### Day 39 · 29 Des 2026 — Validasi Buta Warna
- **Tujuan:** Memastikan identitas terbaca oleh mata protan, deutan, dan tritan — inklusi sebagai standar mutu.
- **Tugas:** Simulasikan seluruh antarmuka dalam tiga tipe buta warna
- **Tugas:** Pastikan tidak ada informasi yang hanya disandikan oleh warna (tambahkan ikon/teks)
- **Tugas:** Uji ulang kontras elemen kritis dan catat hasil di brand guideline
- **Pakar:** `D35` · `B18` · **Hasil:** Laporan validasi CVD 3 tipe · **Target:** `v1.3.0.39`

### Day 40 · 30 Des 2026 — Brand Guideline v1.1
- **Tujuan:** Mengunci seluruh sistem baru ke dalam dokumen resmi berversi yang menjadi sumber kebenaran.
- **Tugas:** Perbarui PDF brand guideline dengan token v2, motion, ikon, dan diagram
- **Tugas:** Tambahkan bab tata kelola versi brand dan prosedur pengajuan perubahan
- **Tugas:** Tag dokumen sebagai v1.1 dan arsipkan v1.0
- **Pakar:** `E46` · `C23` · **Hasil:** Brand guideline v1.1 terbit — fase 4 selesai · **Target:** `v1.4.0.40`

---
## Fase 5 — Pengalaman Interaktif (Hari 41–52)

**Lapisan:** UWA-7 Lapisan 02 — Akal · **Target versi:** `v1.5.0.52`

Kini situs mulai berpikir. Fase ini menghadirkan alat interaktif yang membuat pengunjung mengalami metodologi, bukan sekadar membacanya: palet perintah global, kalkulator UMEA, penjelajah UWA-7, dan asesmen kematangan digital. Pengalaman menjadi bukti hidup bahwa Gunara OS memang sistem operasi, bukan sekadar slogan.

### Day 41 · 31 Des 2026 — Command Palette Global
- **Tujuan:** Situs berperilaku seperti sistem operasi: Ctrl+K membuka palet perintah ke seluruh pengetahuan.
- **Tugas:** Integrasikan cmdk dengan navigasi, tema, dan aksi global
- **Tugas:** Tambahkan pencarian konten (artikel, metodologi, layanan)
- **Tugas:** Standarkan shortcut keyboard dan state terbuka/tutup yang mulus
- **Pakar:** `D29` · `D28` · **Hasil:** Ctrl+K aktif di seluruh situs · **Target:** `v1.4.0.41`

### Day 42 · 1 Jan 2027 — Kalkulator Tier UMEA
- **Tujuan:** Pengunjung memasukkan kondisi usahanya dan melihat sendiri posisi tangga UMEA-nya hari ini.
- **Tugas:** Rancang form input: karyawan, omzet, proses, sistem yang berjalan
- **Tugas:** Logika skoring menentukan tier UMEA-03 sampai UMEA-21
- **Tugas:** Tampilkan hasil dengan rekomendasi pack G-DOS dan CTA assessment
- **Pakar:** `E44` · `B17` · **Hasil:** Kalkulator UMEA interaktif live · **Target:** `v1.4.0.42`

### Day 43 · 2 Jan 2027 — UWA-7 Explorer
- **Tujuan:** Tujuh lapisan arsitektur menjadi penjelajahan interaktif yang bisa diklik lapis demi lapis.
- **Tugas:** Bangun diagram lapisan bertumpuk dengan animasi masuk bertahap
- **Tugas:** Klik lapisan menampilkan checklist, prinsip, dan contoh implementasi
- **Tugas:** Tautkan tiap lapisan ke artikel dan layanan yang relevan
- **Pakar:** `D30` · `C25` · **Hasil:** UWA-7 explorer interaktif live · **Target:** `v1.4.0.43`

### Day 44 · 3 Jan 2027 — Self-Assessment Maturity Digital
- **Tujuan:** Alat diagnosis yang mengubah pengunjung ragu menjadi pengunjung tahu posisinya.
- **Tugas:** Susun 15 pertanyaan berbasis 5 lapisan UWA-7 dengan bobot terukur
- **Tugas:** Hitung skor per lapisan dan skor total kematangan digital
- **Tugas:** Hasil: radar chart + badge berbagi + rekomendasi langkah 30 hari
- **Pakar:** `E43` · `E37` · **Hasil:** Assessment 15 pertanyaan dengan badge · **Target:** `v1.4.0.44`

### Day 45 · 4 Jan 2027 — Pass Mikro-Interaksi
- **Tujuan:** Setiap sentuhan memberi jawaban: hover, focus, tekan — semua hidup dengan fisika yang konsisten.
- **Tugas:** Audit semua state interaktif: hover, active, focus-visible, disabled
- **Tugas:** Terapkan spring physics pada kartu, tombol, dan tab
- **Tugas:** Standarkan durasi/easing dari motion token fase 4
- **Pakar:** `D29` · `B16` · **Hasil:** Semua komponen hidup dan konsisten · **Target:** `v1.4.0.45`

### Day 46 · 5 Jan 2027 — Scroll Storytelling Hero
- **Tujuan:** DNA formula menjadi narasi yang bergerak: setiap huruf punya panggung dan makna berturut.
- **Tugas:** Bangun scroll-driven reveal dengan useScroll + useTransform
- **Tugas:** Koreografikan V→K→A→D→P→S→M→L→E dengan garis koneksi yang tergambar
- **Tugas:** Jaga performa: animasi GPU-only dan jatuh anggun ke statis tanpa JS
- **Pakar:** `D29` · `C19` · **Hasil:** Hero storytelling v2 tanpa regresi performa · **Target:** `v1.4.0.46`

### Day 47 · 6 Jan 2027 — Skeleton & Loading States
- **Tujuan:** Menunggu punya tata krama: tidak ada ruang kosong yang menggantung tanpa jawaban.
- **Tugas:** Buat skeleton system untuk rute dinamis dan list konten
- **Tugas:** Terapkan optimistic UI untuk aksi yang cepat (copy, toggle tema)
- **Tugas:** Standarkan spinner/progress bermerek untuk proses > 300ms
- **Pakar:** `D28` · `D27` · **Hasil:** Loading states seluruh rute · **Target:** `v1.4.0.47`

### Day 48 · 7 Jan 2027 — Mobile Experience Pass
- **Tujuan:** Menguji ulang seluruh situs dengan tangan satu dan jempol sebagai pusat gravitasi.
- **Tugas:** Audit thumb-zone: aksi utama dalam jangkauan jempol
- **Tugas:** Perbesar touch target minimal 44px dan perbaiki konteks hover-only
- **Tugas:** Uji di iPhone SE sampai foldable — tanpa scroll horizontal sedetik pun
- **Pakar:** `D33` · `D28` · **Hasil:** Laporan mobile pass + perbaikan · **Target:** `v1.4.0.48`

### Day 49 · 8 Jan 2027 — 404 & Error States
- **Tujuan:** Bahkan kegagalan menjadi pengalaman bermerek: terminal G-DOS yang membantu menemukan jalan.
- **Tugas:** Desain 404 bergaya command terminal dengan saran rute terdekat
- **Tugas:** Bangun error boundary global dengan pesan manusiawi + CTA dukungan
- **Tugas:** Tangkap error di Sentry dan kategorikan untuk perbaikan
- **Pakar:** `D28` · `C21` · **Hasil:** 404 + error boundary bermerek · **Target:** `v1.4.0.49`

### Day 50 · 9 Jan 2027 — Aksesibilitas Pass 1
- **Tujuan:** Situs dapat dioperasikan penuh dengan keyboard saja dan dibacakan sempurna oleh screen reader.
- **Tugas:** Uji navigasi keyboard menyeluruh; perbaiki focus trap dan urutan tab
- **Tugas:** Audit ARIA seluruh komponen interaktif termasuk tabs dan dialog
- **Tugas:** Perbaiki pengumuman perubahan dinamis (aria-live)
- **Pakar:** `D34` · `D28` · **Hasil:** Nol blokir keyboard + ARIA bersih · **Target:** `v1.4.0.50`

### Day 51 · 10 Jan 2027 — Sound Design (Opsional)
- **Tujuan:** Lapisan suara halus untuk interaksi kunci — selalu bisa dimatikan, default mati.
- **Tugas:** Rancang 4 suara mikro: navigasi palette, sukses salin, toggle tema, notifikasi
- **Tugas:** Implementasikan Web Audio dengan volume rendah dan toggle preferensi
- **Tugas:** Simpan preferensi di localStorage dan hormati reduced-motion
- **Pakar:** `D29` · `B12` · **Hasil:** Sound pack opsional + preferensi · **Target:** `v1.4.0.51`

### Day 52 · 11 Jan 2027 — UX Testing Round 1
- **Tujuan:** Menyerahkan prototipe kepada manusia nyata dan mencatat kebenaran yang tidak bisa diimbau teori.
- **Tugas:** Rekrut 5 peserta sesuai persona prospek (konsultan, pemilik usaha, pengelola organisasi)
- **Tugas:** Jalankan 5 skenario tugas dan rekam waktu, friksi, dan kebingungan
- **Tugas:** Susun temuan berprioritas ke backlog fase berikutnya
- **Pakar:** `E37` · `E38` · **Hasil:** Laporan UX testing + backlog — fase 5 selesai · **Target:** `v1.5.0.52`

---
## Fase 6 — Mesin Konversi (Hari 53–62)

**Lapisan:** UWA-7 Lapisan 05 — Rahmah · **Target versi:** `v1.6.0.62`

Rahmah dalam bisnis adalah kejelasan: pengunjung yang benar-benar butuh bantuan harus mudah menemukan jalan menujunya. Fase ini merakit mesin konversi yang santun — bukan pop-up agresif, melainkan arsitektur CTA yang bijak, funnel yang memberi nilai dulu, dan pengukuran yang jujur terhadap apa yang benar-benar berhasil.

### Day 53 · 12 Jan 2027 — Audit Konversi & Heatmap
- **Tujuan:** Melihat situs melalui mata perilaku nyata: di mana pengunjung berhenti dan melepas tangan.
- **Tugas:** Pasang Microsoft Clarity untuk heatmap dan session recording (privacy-safe)
- **Tugas:** Petakan funnel: kunjungan → scroll → CTA → form → booking
- **Tugas:** Identifikasi 5 titik friksi terbesar dan susun hipotesis perbaikan
- **Pakar:** `E36` · `E43` · **Hasil:** Peta friksi + 5 hipotesis terukur · **Target:** `v1.5.0.53`

### Day 54 · 13 Jan 2027 — Arsitektur CTA
- **Tujuan:** Satu hierarki ajakan: tidak ada halaman yang bingung mau menawarkan apa lebih dulu.
- **Tugas:** Definisikan hierarki CTA: primer (booking), sekunder (newsletter), tersier (unduhan)
- **Tugas:** Bangun sticky CTA mobile yang elegan tanpa menutupi konten
- **Tugas:** Tambahkan CTA kontekstual di akhir setiap bagian metodologi dan artikel
- **Pakar:** `E36` · `C25` · **Hasil:** Hierarki CTA di seluruh situs · **Target:** `v1.5.0.54`

### Day 55 · 14 Jan 2027 — Funnel Lead Magnet
- **Tujuan:** Memberi nilai sebelum meminta apa pun: blueprint gratis yang membuat pengunjung ingin lebih.
- **Tugas:** Selesaikan Blueprint UWA-7 (10 halaman, desain premium)
- **Tugas:** Bangun alur: landing unduhan → email terima → 5 email nurture otomatis
- **Tugas:** Ukur konversi setiap anak tangga dan tetapkan baseline
- **Pakar:** `E40` · `E36` · **Hasil:** Funnel lead magnet end-to-end · **Target:** `v1.5.0.55`

### Day 56 · 15 Jan 2027 — Booking & Kontak Tanpa Gesekan
- **Tujuan:** Menjadikan jarak antara niat dan jadwal konsultasi hanya dua klik.
- **Tugas:** Integrasi Cal.com dengan 3 tipe meeting (intro, assessment, strategi)
- **Tugas:** Tambahkan deep link WhatsApp Business dengan pesan kontekstual per halaman
- **Tugas:** Form kontak pintar: rute ke tim yang tepat berdasarkan kebutuhan yang dipilih
- **Pakar:** `E36` · `A7` · **Hasil:** Booking + WhatsApp + routing form aktif · **Target:** `v1.5.0.56`

### Day 57 · 16 Jan 2027 — Integrasi CRM G-DOS
- **Tujuan:** Setiap prospek masuk langsung mengalir ke mesin eksekusi: Notion/ClickUp tanpa salin-tempel.
- **Tugas:** Sambungkan form dan booking ke CRM via automation (Zapier/Make/webhook)
- **Tugas:** Standarkan pipeline: baru → terkualifikasi → proposal → klien
- **Tugas:** Buat SLA notifikasi: prospek baru dibalas maksimal 2 jam kerja
- **Pakar:** `E44` · `E40` · **Hasil:** Pipeline CRM otomatis dengan SLA · **Target:** `v1.5.0.57`

### Day 58 · 17 Jan 2027 — Social Proof Engine
- **Tujuan:** Bukti yang bergerak: angka, wajah, dan hasil yang diperbarui dari data nyata.
- **Tugas:** Bangun rotating proof bar dengan testimoni terverifikasi
- **Tugas:** Pasang counter hidup: dokumen terunduh, assessment selesai, proyek selesai
- **Tugas:** Tampilkan badge sertifikasi dan keanggotaan organisasi
- **Pakar:** `A10` · `B16` · **Hasil:** Modul proof dinamis dari data · **Target:** `v1.5.0.58`

### Day 59 · 18 Jan 2027 — Template Landing Page Kampanye
- **Tujuan:** Menyiapkan senjata untuk setiap kampanye: satu halaman, satu pesan, satu tindakan.
- **Tugas:** Bangun template LP: hero tegas, bukti, penawaran, FAQ mini, CTA tunggal
- **Tugas:** Dukung parameter kampanye (utm) untuk pelacakan bersih
- **Tugas:** Buat LP pertama untuk layanan Assessment UMEA
- **Pakar:** `E39` · `E36` · **Hasil:** Template LP + LP pertama live · **Target:** `v1.5.0.59`

### Day 60 · 19 Jan 2027 — Framework A/B Testing
- **Tujuan:** Berhenti menebak: setiap perubahan besar dibuktikan dengan eksperimen yang benar.
- **Tugas:** Setup eksperimen via PostHog/Vercel Edge Config dengan definisi metrik
- **Tugas:** Jalankan eksperimen 1: headline hero (naratif sistem vs narasi hasil)
- **Tugas:** Tetapkan kebijakan: minimal durasi, ukuran sampel, kriteria keputusan
- **Pakar:** `E43` · `E36` · **Hasil:** Framework eksperimen + eksperimen 1 jalan · **Target:** `v1.5.0.60`

### Day 61 · 20 Jan 2027 — Exit Intent & Retensi
- **Tujuan:** Menahan dengan halus: pengunjung yang hendak pergi diberi satu alasan terbaik untuk tinggal.
- **Tugas:** Bangun exit-intent yang menawarkan blueprint, bukan diskon murahan
- **Tugas:** Tambahkan nudge newsletter pada dwell time tertentu
- **Tugas:** Jaga privacy: tanpa pelacakan agresif lintas situs
- **Pakar:** `E36` · `B16` · **Hasil:** Retensi aktif tanpa mengganggu · **Target:** `v1.5.0.61`

### Day 62 · 21 Jan 2027 — Laporan & Backlog CRO
- **Tujuan:** Menutup fase dengan kejujuran angka: apa yang naik, apa yang tidak, dan langkah berikutnya.
- **Tugas:** Rangkum hasil heatmap, eksperimen, dan funnel ke laporan CRO
- **Tugas:** Hitung peningkatan konversi baseline vs fase ini
- **Tugas:** Susun backlog optimasi berikutnya berprioritas dampak/usaha
- **Pakar:** `E43` · `E46` · **Hasil:** Laporan CRO + backlog — fase 6 selesai · **Target:** `v1.6.0.62`

---
## Fase 7 — Intelijen & Otomasi AI (Hari 63–72)

**Lapisan:** UWA-7 Lapisan 07 — Waktu · **Target versi:** `v1.7.0.72`

Waktu adalah satu-satunya aset yang tak bisa dibeli lagi; fase ini membelinya kembali lewat otomasi dan intelijen. G-DOS Copilot menjawab dari 165 dokumen, konten terdraft otomatis dengan pagar editorial, dan dasbor KPI menampilkan denyut kesehatan brand secara waktu nyata. Manusia mengambil keputusan; sistem menjalankan sisanya.

### Day 63 · 22 Jan 2027 — Audit AI-Readiness
- **Tujuan:** Memetakan aset data dan peluang otomasi sebelum satu model pun dihubungkan.
- **Tugas:** Inventarisasi aset: 165 dokumen, artikel, kasus, FAQ, transkrip
- **Tugas:** Skor otomatisasi per proses: konten, dukungan, penjualan, operasional
- **Tugas:** Pilih 3 use case dampak tertinggi dan urutkan implementasinya
- **Pakar:** `E44` · `E46` · **Hasil:** Peta jalan AI berprioritas · **Target:** `v1.6.0.63`

### Day 64 · 23 Jan 2027 — G-DOS Copilot v0.1
- **Tujuan:** Asisten yang menjawab dengan 165 dokumen Gunara OS sebagai otaknya — dengan sitasi.
- **Tugas:** Bangun pipeline RAG: chunking dokumen, embedding, dan pencarian hibrida
- **Tugas:** Bangun antarmuka chat sidebar dengan jawaban bersitasi sumber
- **Tugas:** Uji 30 pertanyaan nyata dan ukur akurasi sitasi
- **Pakar:** `E44` · `E46` · **Hasil:** Copilot v0.1 dengan sitasi terverifikasi · **Target:** `v1.6.0.64`

### Day 65 · 24 Jan 2027 — Pipeline Konten AI + Guardrails
- **Tujuan:** AI menulis draf, editor manusia menandatangani: kecepatan tanpa menyerahkan suara.
- **Tugas:** Bangun alur draft AI dari outline editor dengan gaya baku
- **Tugas:** Pasang guardrails: larangan klaim tak terbukti, jargon kosong, dan plagiarisme
- **Tugas:** Ukur penghematan waktu per artikel tanpa penurunan mutu
- **Pakar:** `E39` · `E46` · **Hasil:** Pipeline draf AI dengan pagar editorial · **Target:** `v1.6.0.65`

### Day 66 · 25 Jan 2027 — Chatbot Kualifikasi Pre-Sales
- **Tujuan:** Percakapan pertama yang menyaring kebutuhan dan menjadwalkan meeting yang layak.
- **Tugas:** Bangun bot kualifikasi: kebutuhan, skala, anggaran, timeline
- **Tugas:** Kualifikasi lulus → tawarkan slot Cal.com otomatis
- **Tugas:** Selain itu → arahkan ke sumber belajar yang relevan
- **Pakar:** `E36` · `E44` · **Hasil:** Bot kualifikasi dengan booking otomatis · **Target:** `v1.6.0.66`

### Day 67 · 26 Jan 2027 — Email Otomasi Perilaku
- **Tujuan:** Email yang datang karena sesuatu terjadi, bukan karena kalender berkata begitu.
- **Tugas:** Setup trigger: unduh blueprint, selesai assessment, kunjungi layanan 3x
- **Tugas:** Segmentasi otomatis berdasarkan minat lapisan UWA-7
- **Tugas:** Ukur open/click per trigger dan matikan yang lemah
- **Pakar:** `E40` · `E36` · **Hasil:** 5 trigger email berperilaku aktif · **Target:** `v1.6.0.67`

### Day 68 · 27 Jan 2027 — Auto-Documentation & Changelog
- **Tujuan:** Dokumentasi yang memperbarui dirinya: tidak ada fitur tanpa jejak tertulis.
- **Tugas:** Generate changelog otomatis dari conventional commits
- **Tugas:** Terbitkan halaman changelog publik berversi
- **Tugas:** Standarkan ADR (architecture decision record) untuk keputusan teknis besar
- **Pakar:** `E46` · `D30` · **Hasil:** Changelog publik + 5 ADR pertama · **Target:** `v1.6.0.68`

### Day 69 · 28 Jan 2027 — Pusat Notifikasi & Digest
- **Tujuan:** Satu ringkasan mingguan yang membuat semua kemajuan terlihat tanpa membuka 10 dasbor.
- **Tugas:** Bangun digest otomatis: progress roadmap, statistik, insiden, konten baru
- **Tugas:** Kirim via email + Notion update setiap Senin pagi
- **Tugas:** Tandai item yang butuh keputusan Gugun secara eksplisit
- **Pakar:** `E40` · `E46` · **Hasil:** Digest mingguan otomatis berjalan · **Target:** `v1.6.0.69`

### Day 70 · 29 Jan 2027 — Pipeline Data & Mini-Warehouse
- **Tujuan:** Data tersebar disatukan menjadi satu sumber kebenaran yang bisa ditanya kapan pun.
- **Tugas:** Ekspor analitik, CRM, dan newsletter ke satu penyimpanan terstruktur
- **Tugas:** Bangun skema tabel: traffic, leads, konversi, konten, insiden
- **Tugas:** Otomatiskan pembaruan harian dengan pemeriksaan mutu data
- **Pakar:** `E43` · `E44` · **Hasil:** Warehouse mini + pipeline harian · **Target:** `v1.6.0.70`

### Day 71 · 30 Jan 2027 — KPI Dashboard Waktu Nyata
- **Tujuan:** Denyut kesehatan brand dalam satu layar: dari Lighthouse hingga konversi booking.
- **Tugas:** Bangun dasbor KPI: traffic, konversi, kecepatan, skor aksesibilitas, insiden
- **Tugas:** Tampilkan tren mingguan dan target per metrik (traffic light)
- **Tugas:** Tautkan setiap metrik ke runbook perbaikannya
- **Pakar:** `E43` · `E46` · **Hasil:** Dasbor KPI live di member area internal · **Target:** `v1.6.0.71`

### Day 72 · 31 Jan 2027 — Etika AI & Kebijakan Disclosure
- **Tujuan:** Kekuatan AI dibungkus integritas: manusia tetap bertanggung jawab atas setiap keluaran.
- **Tugas:** Tulis kebijakan AI: mana yang boleh otomatis, mana harus manusia
- **Tugas:** Standarkan disclosure konten yang dibantu AI
- **Tugas:** Tetapkan human-in-the-loop wajib untuk jawaban komersial
- **Pakar:** `A10` · `E46` · **Hasil:** Kebijakan AI terbit — fase 7 selesai · **Target:** `v1.7.0.72`

---
## Fase 8 — Ekosistem & Produk (Hari 73–84)

**Lapisan:** UWA-7 Lapisan 01 — Alam Fisik · **Target versi:** `v1.8.0.84`

Satu otak, banyak organ — kini organ-organ dibangun sungguhan. Portal produk Gunara OS terbuka, area klien berdiri, API publik menghidupkan integrasi, dan domain-domain saudara menerima arsitektur yang sama. gunara.web.id resmi menjadi pusat kendali yang menggerakkan ekosistem nyata, bukan sekadar mendeskripsikannya.

### Day 73 · 1 Feb 2027 — Portal Produk Gunara OS
- **Tujuan:** juraganwebsite.web.id bangkit sebagai etalase resmi produk: dari teaser menjadi mesin penjualan.
- **Tugas:** Bangun halaman produk: arsitektur, tier P0-P3, dan harga paket
- **Tugas:** Tambahkan pratinjau dokumen per domain kepemimpinan
- **Tugas:** Sambungkan checkout/diskusi ke funnel konversi pusat
- **Pakar:** `E44` · `A9` · **Hasil:** Portal Gunara OS live di juraganwebsite · **Target:** `v1.7.0.73`

### Day 74 · 2 Feb 2027 — Member Area Klien
- **Tujuan:** Klien melihat progres pekerjaan seperti melihat dasbor aplikasi modern: transparan penuh.
- **Tugas:** Setup auth (next-auth) dengan undangan klien
- **Tugas:** Bangun area: dokumen, progres fase, invoice, dan ruang diskusi
- **Tugas:** Terapkan keamanan: role access dan audit log per aksi
- **Pakar:** `E44` · `E46` · **Hasil:** Member area v1 dengan 3 modul · **Target:** `v1.7.0.74`

### Day 75 · 3 Feb 2027 — Public API v1
- **Tujuan:** Ekosistem membuka pintu sisi mesin: status, metodologi, dan kesehatan layanan bisa diminta program.
- **Tugas:** Rancang /api/v1: health, status, daftar metodologi, versi sistem
- **Tugas:** Terapkan API key, rate limit, dan dokumentasi OpenAPI
- **Tugas:** Terbitkan halaman docs API dengan contoh cURL/SDK
- **Pakar:** `E44` · `D31` · **Hasil:** API v1 + dokumentasi OpenAPI · **Target:** `v1.7.0.75`

### Day 76 · 4 Feb 2027 — Integrasi Google Workspace
- **Tujuan:** Mesin otomasi Apps Script menghidupkan invoice, kontrak, dan laporan dari template yang sama.
- **Tugas:** Bangun script invoice otomatis dari data member area
- **Tugas:** Standarkan template kontrak dan proposal berversi
- **Tugas:** Otomatiskan laporan mingguan ke Spreadsheet dan Drive
- **Pakar:** `E44` · `E46` · **Hasil:** 3 otomasi Workspace berjalan · **Target:** `v1.7.0.76`

### Day 77 · 5 Feb 2027 — Design System Bersama
- **Tujuan:** Identitas Gunara menjadi paket yang bisa dipasang: satu sumber kebenaran lintas domain.
- **Tugas:** Ekstrak komponen inti ke paket @gunaracorp/ui (npm internal)
- **Tugas:** Migrasikan gunara.web.id ke paket sebagai konsumen pertama
- **Tugas:** Dokumentasikan versi, rilis, dan panduan kontribusi
- **Pakar:** `D30` · `C23` · **Hasil:** Paket UI v0.1 dipakai lintas proyek · **Target:** `v1.7.0.77`

### Day 78 · 6 Feb 2027 — Portal Tata Kelola MUHDIN
- **Tujuan:** muhdin.id menerima portal kelembagaan: struktur, program, dan keanggotaan yang teratur.
- **Tugas:** Bangun subdomain portal dengan struktur organisasi dan program kerja
- **Tugas:** Tambahkan arsip keputusan dan publikasi resmi organisasi
- **Tugas:** Sinkronkan identitas dengan brand system Gunara (endorsed)
- **Pakar:** `A6` · `A10` · **Hasil:** Portal MUHDIN v1 live · **Target:** `v1.7.0.78`

### Day 79 · 7 Feb 2027 — Kickoff Rebuild Pusatperizinan
- **Tujuan:** Menghidupkan organ berikutnya: pusatperizinan.com direncanakan dengan UWA-7 penuh.
- **Tugas:** Audit situs lama: konten, struktur, dan keyword layanan perizinan
- **Tugas:** Susun arsitektur UWA-7 baru dan wireframe halaman kunci
- **Tugas:** Tetapkan timeline rebuild 30 hari dan prioritas fitur
- **Pakar:** `A2` · `E42` · **Hasil:** Dokumen arsitektur + wireframe pusatperizinan · **Target:** `v1.7.0.79`

### Day 80 · 8 Feb 2027 — Arsitektur Multi-Brand
- **Tujuan:** Kapan Gunara tampil sebagai induk, kapan sebagai pendukung, kapan berdiri sendiri — semua punya kaidah.
- **Tugas:** Definisikan model: masterbrand (gunara), endorsed (MUHDIN), standalone (digiman)
- **Tugas:** Susun aturan visual per model dan batas penggunaan aset
- **Tugas:** Dokumentasikan keputusan penamaan lintas domain
- **Pakar:** `A5` · `C23` · **Hasil:** Brand architecture playbook · **Target:** `v1.7.0.80`

### Day 81 · 9 Feb 2027 — Marketplace Listing & Review Engine
- **Tujuan:** Hadir di tempat pasar berkumpul dan mengubah kepuasan klien menjadi aset reputasi publik.
- **Tugas:** Daftarkan layanan di marketplace profesional relevan
- **Tugas:** Bangun halaman review dengan verifikasi klien
- **Tugas:** Sambungkan ulasan positif ke modul social proof
- **Pakar:** `E41` · `A10` · **Hasil:** Listing aktif + engine review · **Target:** `v1.7.0.81`

### Day 82 · 10 Feb 2027 — Partnership & Media Kit
- **Tujuan:** Kolaborasi mudah dilakukan: aset, aturan, dan kontak siap unduh dalam satu paket rapi.
- **Tugas:** Susun media kit: profil, angka kunci, foto resmi, aturan logo
- **Tugas:** Tulis panduan co-branding dan template perjanjian kerja sama
- **Tugas:** Terbitkan halaman partnership dengan alur pengajuan
- **Pakar:** `A5` · `A10` · **Hasil:** Media kit + halaman partnership · **Target:** `v1.7.0.82`

### Day 83 · 11 Feb 2027 — Lapisan Komunitas
- **Tujuan:** Membentuk ruang belajar: komunitas Arsitek Sistem yang tumbuh dari praktisi nyata.
- **Tugas:** Buka grup komunitas (Telegram/WhatsApp) dengan code of conduct
- **Tugas:** Program bulanan: sesi tanya-jawab sistem, studi kasus anggota
- **Tugas:** Sambungkan komunitas ke funnel layanan secara santun
- **Pakar:** `B15` · `E40` · **Hasil:** Komunitas berdiri dengan 50 anggota pertama · **Target:** `v1.7.0.83`

### Day 84 · 12 Feb 2027 — Laporan Kesehatan Ekosistem
- **Tujuan:** Semua organ dipantau: ketergantungan, performa, dan risiko dalam satu peta kejujuran.
- **Tugas:** Bangun peta ketergantungan antar domain dan layanan
- **Tugas:** Kumpulkan metrik tiap domain: traffic, konversi, insiden
- **Tugas:** Susun daftar risiko + mitigasi dan jadwal tinjauan
- **Pakar:** `E42` · `E46` · **Hasil:** Laporan ekosistem v1 — fase 8 selesai · **Target:** `v1.8.0.84`

---
## Fase 9 — Sertifikasi & Tata Kelola Mutu (Hari 85–92)

**Lapisan:** UWA-7 Lapisan 03+06 — Ilmu & Otoritas · **Target versi:** `v1.9.0.92`

Klaim harus disertifikasi sebelum dipanggungkan. Fase ini menguji situs dan sistem dengan standar internasional: WCAG 2.2, Core Web Vitals, OWASP, hingga kesiapan kekayaan intelektual. Setiap sertifikat adalah amunisi reputasi; setiap temuan adalah daftar perbaikan yang dieksekusi tuntas sebelum fase penutup.

### Day 85 · 13 Feb 2027 — Audit WCAG 2.2 AA Penuh
- **Tujuan:** Aksesibilitas diuji oleh standar terbaru, bukan oleh perasaan baik.
- **Tugas:** Jalankan audit otomatis + manual (keyboard, screen reader NVDA/VoiceOver)
- **Tugas:** Perbaiki seluruh temuan kritis dan serius dengan deadline tuntas
- **Tugas:** Terbitkan statement aksesibilitas publik dengan status kepatuhan
- **Pakar:** `D34` · `D35` · **Hasil:** Lolos WCAG 2.2 AA + statement publik · **Target:** `v1.8.0.85`

### Day 86 · 14 Feb 2027 — Sertifikasi Performa
- **Tujuan:** Kecepatan diukur di lapangan nyata, bukan lab: pengguna nyata, jaringan nyata.
- **Tugas:** Kumpulkan RUM (real user monitoring) selama 14 hari sebelumnya
- **Tugas:** Optimalkan semua metrik CWV ke hijau: LCP < 2.0s, INP < 200ms, CLS < 0.05
- **Tugas:** Pastikan Lighthouse ≥ 95 di keempat kategori pada semua halaman kunci
- **Pakar:** `D33` · `D31` · **Hasil:** CWV hijau + Lighthouse ≥ 95 · **Target:** `v1.8.0.86`

### Day 87 · 15 Feb 2027 — Security Review
- **Tujuan:** Serang diri sendiri sebelum orang lain melakukannya: checklist OWASP penuh.
- **Tugas:** Jalankan dependency audit dan perbarui semua paket rentan
- **Tugas:** Uji OWASP Top 10 pada form, API, dan autentikasi
- **Tugas:** Dokumentasikan temuan, perbaikan, dan jadwal retest
- **Pakar:** `E46` · `D31` · **Hasil:** Laporan security review tuntas · **Target:** `v1.8.0.87`

### Day 88 · 16 Feb 2027 — Legal & Kekayaan Intelektual
- **Tujuan:** Nama Gunara dilindungi sebelum reputasinya membuat orang lain ingin memakainya.
- **Tugas:** Cek kelayakan merek 'Gunara' pada kelas layanan konsultansi & teknologi
- **Tugas:** Siapkan pengajuan pendaftaran merek (DJKI) dan dokumen pendukung
- **Tugas:** Inventarisasi lisensi seluruh aset: font, ikon, foto, kode
- **Pakar:** `A10` · `E46` · **Hasil:** Pengajuan merek + inventaris lisensi · **Target:** `v1.8.0.88`

### Day 89 · 17 Feb 2027 — Brand Governance Handbook
- **Tujuan:** Aturan main brand untuk semua tangan yang akan menyentuhnya — tim, vendor, mitra.
- **Tugas:** Susun handbook: siapa boleh memutuskan apa, alur persetujuan aset
- **Tugas:** Standarkan checklist QA brand untuk setiap rilis materi
- **Tugas:** Sediakan template review bulanan konsistensi
- **Pakar:** `E46` · `C23` · **Hasil:** Governance handbook v1 · **Target:** `v1.8.0.89`

### Day 90 · 18 Feb 2027 — Dokumentasi ADR Lengkap
- **Tujuan:** Setiap keputusan arsitektur 99 hari ini tertulis dengan alasan dan alternatifnya.
- **Tugas:** Kumpulkan semua keputusan besar ke rangkaian ADR bernomor
- **Tugas:** Pastikan tiap ADR berisi: konteks, keputusan, konsekuensi, alternatif
- **Tugas:** Susun indeks ADR yang mudah dicari
- **Pakar:** `D30` · `E46` · **Hasil:** ADR lengkap terindeks · **Target:** `v1.8.0.90`

### Day 91 · 19 Feb 2027 — DR Drill & Incident Runbook
- **Tujuan:** Latihan yang membuat kepanikan jadi prosedur: matikan, pulihkan, pelajari.
- **Tugas:** Jalankan drill restore penuh: database, env, deployment
- **Tugas:** Uji rollback deployment ke versi sebelumnya dalam < 10 menit
- **Tugas:** Perbarui incident runbook dengan temuan drill
- **Pakar:** `E46` · `D31` · **Hasil:** Drill lulus + runbook final · **Target:** `v1.8.0.91`

### Day 92 · 20 Feb 2027 — QA Regression Suite
- **Tujuan:** Automasi yang menjaga semuanya: setiap rilis berikutnya diawasi ratusan mata elektronik.
- **Tugas:** Bangun Playwright E2E untuk 15 alur pengguna kritis
- **Tugas:** Tambahkan visual regression pada halaman-halaman identitas
- **Tugas:** Sambungkan suite ke CI dengan laporan snapshot
- **Pakar:** `E46` · `D31` · **Hasil:** E2E suite hijau di CI — fase 9 selesai · **Target:** `v1.9.0.92`

---
## Fase 10 — Peluncuran Peradaban v2.0.0.0 (Hari 93–99)

**Lapisan:** UWA-7 Lapisan 07 — Waktu · **Target versi:** `v2.0.0.99`

Tujuh hari terakhir bukan pekerjaan teknis, melainkan perayaan strategis: semuanya diuji ulang, dipanggungkan, distabilkan, dipelajari, lalu dimahkotai. Version 2.0.0.0 bukan akhir — ia penobatan standar baru dan awal generasi roadmap berikutnya. Struktur selesai; kini skala menjadi tak terhindarkan.

### Day 93 · 21 Feb 2027 — Pre-Launch Checklist & Runbook
- **Tujuan:** Semua senjata diperiksa terakhir: satu daftar centang yang menentukan go atau no-go.
- **Tugas:** Jalankan checklist go/no-go: performa, aksesibilitas, keamanan, konten, legal
- **Tugas:** Kunci rollback plan dan war-room schedule launch day
- **Tugas:** Finalisasi kalender komunikasi launch (email, sosial, komunitas)
- **Pakar:** `E46` · `E40` · **Hasil:** Go decision dengan runbook final · **Target:** `v1.9.0.93`

### Day 94 · 22 Feb 2027 — Press & PR Kit
- **Tujuan:** Cerita yang layak diangkat media: bukan peluncuran situs, melainkan pengumuman standar baru.
- **Tugas:** Tulis press release: 'Arsitek Sistem Peradaban Digital memangkaskan standar baru'
- **Tugas:** Susun media list Indonesia: teknologi, bisnis, dan startup
- **Tugas:** Siapkan paket pers: foto resmi, boilerplate, quotable dari Gugun
- **Pakar:** `A10` · `E41` · **Hasil:** PR kit siap kirim ke media · **Target:** `v1.9.0.94`

### Day 95 · 23 Feb 2027 — Aset Kampanye Peluncuran
- **Tujuan:** Satu pesan, banyak format: setiap kanal mendapat senjata yang pas dengan bentuknya.
- **Tugas:** Rancang video teaser 30 detik dengan koreografi DNA formula
- **Tugas:** Bangun carousel sosial media: 99 hari dalam 9 slide
- **Tugas:** Siapkan email blast launch dengan subjek A/B
- **Pakar:** `C19` · `E40` · **Hasil:** Paket aset kampanye lengkap · **Target:** `v1.9.0.95`

### Day 96 · 24 Feb 2027 — Launch Day v2.0.0.0
- **Tujuan:** Hari penobatan: semua kanal berbicara satu bahasa pada jam yang sama.
- **Tugas:** Rilis v2.0.0.0 dengan changelog publik dan halaman peluncuran
- **Tugas:** Jalankan sesi live/stream walkthrough situs + metodologi
- **Tugas:** Aktifkan semua kampanye dan pantau konversi per jam
- **Pakar:** `E40` · `C19` · **Hasil:** v2.0.0.0 tayang di semua kanal · **Target:** `v1.9.0.96`

### Day 97 · 25 Feb 2027 — Stabilisasi Pasca-Peluncuran
- **Tujuan:** War-room 48 jam: setiap insiden dijawab cepat dan dicatat untuk sistem yang lebih tangguh.
- **Tugas:** Pantau real-time: error, performa, konversi, keluhan kanal
- **Tugas:** Terapkan kebijakan hotfix dengan rilis patch terkendali
- **Tugas:** Kirim update status transparan jika ada insiden signifikan
- **Pakar:** `E46` · `D31` · **Hasil:** Sistem stabil + incident log bersih · **Target:** `v1.9.0.97`

### Day 98 · 26 Feb 2027 — Retrospektif 99 Hari
- **Tujuan:** Kejujuran kolektif: apa yang benar-benar terjadi, dan apa yang pelajarannya bagi generasi berikutnya.
- **Tugas:** Bandingkan seluruh metrik dengan baseline Day 2 dan target fase
- **Tugas:** Dokumentasikan 10 pembelajaran terbesar (yang bekerja, yang gagal, yang mengejutkan)
- **Tugas:** Susun daftar utang teknis dan peluang yang tertunda
- **Pakar:** `E37` · `E43` · **Hasil:** Dokumen retrospektif 99 hari · **Target:** `v1.9.0.98`

### Day 99 · 27 Feb 2027 — Penobatan v2.0.0.0 & Roadmap Generasi 2
- **Tujuan:** Menutup siklus dengan membuka siklus: standar baru dikunci, peradaban generasi berikutnya dirancang.
- **Tugas:** Tag v2.0.0.0 sebagai rilis resmi dan arsipkan roadmap v1
- **Tugas:** Susun ROADMAP-GEN2 draft: arah 180 hari berikutnya
- **Tugas:** Terbitkan dokumen visi 3 tahun Gunara Corp sebagai penutup
- **Pakar:** `A1` · `A2` · **Hasil:** v2.0.0.0 dimahkotai — generasi 2 dimulai · **Target:** `v2.0.0.99`

---

## Dewan Pakar — 46 Perspektif

**Kategori A — Strategi Merek & Bisnis**

- `A1` Chief Brand Strategist
- `A2` Brand Architect
- `A3` Brand Positioning Specialist
- `A4` Brand Identity Designer
- `A5` Brand Differentiation Strategist
- `A6` Corporate Branding Consultant
- `A7` Professional Services Branding Specialist
- `A8` B2B Branding Specialist
- `A9` B2C Branding Specialist
- `A10` Brand Reputation & Trust Strategist

**Kategori B — Ilmu Warna & Psikologi**

- `B11` Color Theory Specialist
- `B12` Color Psychology Researcher
- `B13` Color Perception Specialist
- `B14` Cultural Semiotics Specialist
- `B15` Indonesian Cultural & Market Researcher
- `B16` Consumer Behavior Psychologist
- `B17` Behavioral Economics Specialist
- `B18` Visual Perception Researcher

**Kategori C — Desain & Arah Kreatif**

- `C19` Creative Director
- `C20` Art Director
- `C21` Senior Graphic Designer
- `C22` Logo & Symbol Designer
- `C23` Visual Identity System Designer
- `C24` Typography Specialist
- `C25` Composition & Visual Hierarchy Specialist
- `C26` Art & Design History Researcher

**Kategori D — Pengalaman Digital & Teknologi**

- `D27` UI Designer
- `D28` UX Designer
- `D29` Interaction Designer
- `D30` Design System Architect
- `D31` Front-End CSS Engineer
- `D32` Responsive Web Design Specialist
- `D33` Mobile-First Design Specialist
- `D34` Digital Accessibility Specialist
- `D35` Color Vision Accessibility Researcher

**Kategori E — Pertumbuhan & Validasi**

- `E36` Conversion Rate Optimization Specialist
- `E37` UX Researcher
- `E38` Usability Testing Specialist
- `E39` Digital Marketing Funnel Strategist
- `E40` Growth Marketing Specialist
- `E41` Competitive Intelligence Analyst
- `E42` Market Research Analyst
- `E43` Data Analyst & A/B Testing Specialist
- `E44` Digital Product Strategist
- `E45` Multichannel Color Management Specialist
- `E46` Design QA & Governance Lead
