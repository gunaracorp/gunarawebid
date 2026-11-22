# WORKLOG — GUNARA OS

> Log eksekusi harian roadmap 99 hari. Satu entri per hari kerja, tiga jejak wajib:
> commit + worklog + versi. Format entri: `#NNN · Day XX · tanggal · vX.Y.Z.N`.

## Status

- **Versi saat ini:** `v1.2.0.4` (Day 4 selesai)
- **Fase aktif:** Fase 1 — Fondasi & Tata Kelola (Day 1–9)
- **Progres:** 4/99 hari
- **Protokol lanjutan:** buka sesi baru dengan `LANJUTKAN GUNARA-OS DAY-XX`

## Entri

### #004 · Day 04 · Min 22 Nov 2026 · `v1.1.0.3 → v1.2.0.4`

**Judul:** Gunara CMS Fase 2 — Editor Ultra, Pengalaman Menulis Kelas Notion (MINOR: editor ultra)

**Hasil:**
- **Rich text inline v2** (`src/lib/cms/rich-text.ts`): tebal, miring, coret, `kode`, ==sorot==, dan [tautan](url) — parser mini-markdown aman tanpa HTML, gerbang URL (http/https/relatif/mailto saja), 24 unit test hijau via bun
- **Satu format untuk semua kanal** (`rich-text-view.tsx`): paragraf, judul (anchor TOC dibersihkan token), kutipan, daftar, sorotan — editor = pratinjau = situs publik = feed
- **Toolbar format inline** (`format-toolbar.tsx`): RichTextarea dengan tombol B/I/S/kode/sorot/tautan yang bekerja pada seleksi asli + Ctrl/Cmd+B dan I, toggle on/off
- **Slash menu `/`** (`block-meta.tsx` + block-card): ketik `/` di paragraf → menu 14 tipe blok berikon dengan filter + navigasi keyboard, pilih = konversi blok langsung (ala Notion)
- **Inserter visual:** menu "Tambah blok" naik kelas — ikon + deskripsi setiap tipe
- **Autosave 3 detik** (post-editor): debounce setelah perubahan terakhir, indikator AUTOSAVE/TERSIMPAN, tanpa banjir revisi (API dedup snapshot autosave per 5 menit, simpanan manual selalu snapshot)
- **Indikator kotor diperbaiki:** snapshot tersimpan kini dilacak — status "PERUBAHAN BELUM DISIMPAN" tidak lagi menempel setelah tersimpan
- **Palet perintah G-DOS ⌘K** (`command-palette.tsx`): di seluruh area internal — lompat ke halaman, artikel (fetch malas), aksi cepat; tombol ⌘K di topbar
- **Statistik tulis live:** blok · kata · menit baca (countWords baru) + pintasan ALT+↑↓ pindah blok dari dalam textarea
- **Dua bug Fase 1 ditemukan & diperbaiki** saat verifikasi visual berbrowser: (1) editor artikel 500 karena ikon `SearchEngine` tidak ada di lucide-react → diganti `Search`; (2) halaman sunting selalu 404 karena `include` Prisma `tags: { select: { tag: { name: true } } }` tanpa `select` bersarang → query error ditelan `.catch(() => null)`; kini select benar + error DB tak lagi ditelan (500 jujur, bukan 404 palsu)
- **Verifikasi penuh:** lint hijau, 24/24 unit test parser, e2e 18/18 (guard→login→autosave dedup→revisi manual→publish→render rich text→feed→hapus), screenshot dashboard/palet/editor/blog lolos visual

**Pakar:** `E12` Editorial & Content Systems (150 th) · `E3` Systems Architecture (150 th) · `E17` Human–Computer Interaction (150 th)

### #003 · Day 03 · Min 22 Nov 2026 · `v1.0.0.2 → v1.1.0.3`

**Judul:** Gunara CMS Fase 1 — Mesin Konten Blok-Native (MINOR: engine baru)

**Hasil:**
- **Skema CMS di Prisma/SQLite:** CmsPost, CmsCategory, CmsTag, CmsMedia (biner di DB), CmsRevision, CmsPostView, CmsSetting — legacy `Post` dipensiunkan
- **Block engine 14 tipe blok** (`src/lib/cms/blocks.ts`): paragraf, judul, kutipan, daftar, gambar, kode, sorotan, pemisah, panel statistik, seruan aksi, tabel perbandingan, garis waktu, sematan, langkah metodologi — validasi gerbang dua arah (parse + serialize)
- **Satu renderer untuk semua kanal** (`block-renderer.tsx`): editor, pratinjau, situs publik, feed — gaya navy-amber
- **Editor redaksi lengkap** (`post-editor.tsx` + `block-card.tsx`): drag-and-drop dnd-kit, pratinjau langsung, panel Publikasi/SEO/Revisi, Ctrl+S, slug otomatis, sampul & taksonomi
- **Revisi mesin waktu:** snapshot otomatis tiap perubahan (maks 20), pulihkan satu klik — sebelum pulih, kondisi sekarang di-snapshot
- **Publikasi presisi:** status draf/ulasan/terjadwal/terbit + **jadwal tanpa cron** (lazy-cron saat artikel dibaca)
- **SEO bawaan:** panel SEO per artikel + **OG image dinamis 1200×630** (`/api/cms/og/[slug]`, ImageResponse) + JSON-LD Article + TOC otomatis + waktu baca
- **Media library di database:** unggah PNG/JPG/WebP/GIF/SVG (sanitasi SVG + dimensi sharp), disajikan `/api/cms/media/[id]` cache immutable
- **Situs publik:** `/blog` (pencarian + filter kategori) + `/blog/[slug]` (TOC sticky, artikel terkait, penghitung baca tanpa cookie) + nav "Jurnal"
- **Distribusi otomatis:** RSS `/feed.xml` tanpa plugin, sitemap dinamis + artikel CMS, API headless publik `/api/cms/posts` (CORS terbuka)
- **Seed konten:** 3 artikel (2 terbit + 1 draf), 3 kategori, 7 tag
- **Verifikasi penuh:** lint hijau, e2e API (login→create→patch→publish→schedule→revisions→restore→delete) 200 semua, OG PNG 62 KB tergambar, guard internal 307/503, screenshot visual blog index & artikel lolos

**Pakar:** `E3` Systems Architecture (150 th) · `E12` Editorial & Content Systems (150 th) · `E22` Search & Discovery Engineering (150 th)

### #002 · Day 02 · Min 22 Nov 2026 · `v1.0.0.1 → v1.0.0.2`

**Judul:** Lengkapi Situs Publik Standar Internasional — Legal, FAQ, Ekosistem 11 Aset

**Hasil:**
- Halaman legal standar internasional: `/privacy` (13 bagian — UU PDP 27/2022 + prinsip GDPR), `/terms` (15 bagian — penyelesaian sengketa bertahap: musyawarah → mediasi → arbitrase), `/cookies` (6 bagian + tabel inventaris cookie)
- Halaman `/faq` — 10 Q&A + structured data FAQPage (JSON-LD)
- `/ekosistem` dilengkapi 11 aset domain: kopnusa.id, topkonsultan.web.id, arofahajj.com, sertifikasi.arofahajj.com, pppdigital.id masuk peta kendali
- Halaman kontak dilengkapi kanal resmi (email + telepon dari dokumen NIB) + kartu waspada penipuan
- Footer: kolom Legal baru + versi v1.0.0.2; navigasi utama + FAQ
- `sitemap.ts` (10 rute publik) + halaman 404 custom
- Vault internal dipulihkan: `internal-vault/nib-data.json` + PDF NIB — kartu dokumen hidup kembali di `/internal/dokumen`

**Pakar:** `E46` Design QA & Governance Lead · `L1` Legal & Compliance Architect

### #001 · Day 01 · Sab 21 Nov 2026 · `v1.0.0.0 → v1.0.0.1`

**Judul:** Aktivasi Sistem Versi & Worklog Gunara OS

**Hasil:**
- `VERSIONING.md` — skema MAJOR.MINOR.PATCH.BUILD + contoh evolusi
- `WORKLOG.md` — log harian (file ini)
- `ROADMAP.md` — checklist 99 hari (digenerate dari data roadmap)
- Tag git `v1.0.0.0` sebagai baseline resmi
- Dokumen desain 35 halaman: `gunara-os-roadmap-99-hari.pdf` (10 fase, 46 perspektif)

**Pakar:** `E46` Design QA & Governance Lead · `A2` Brand Architect

**Verifikasi:** tag v1.0.0.0 ada di remote; ketiga dokumen tata kelola ter-commit.
