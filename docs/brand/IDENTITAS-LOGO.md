# IDENTITAS LOGO GUNARA — TRILOGI ABADI

**Dokumen**: Sistem Identitas Visual Trilogi Gunara
**Versi**: 1.0.0.0 · Tanggal ratifikasi: 22 November 2026
**Status**: DIKUNCI SELAMANYA (frozen identity) — ratifikasi Dewan Pakar 46 · OMNIBRAND COLOR ARCHITECT · TIER MAX GOD MODE
**Generator resmi**: `scripts/build_logos.py` (sumber tunggal kebenaran — semua berkas diregenerasi dari skrip ini)

---

## 1. Filosofi tunggal: "Satu Otak, Banyak Organ"

Ketiga logo bukan tiga merek yang berdiri sendiri — mereka **satu organisme** yang tumbuh
dari satu benih. Benih itu adalah **Bintang Gunara**: titik amber `#FBBF24` yang muncul di
ketiga mark, berpindah peran mengikuti konteks organ:

| Organ | Posisi Bintang | Peran simbolik |
| --- | --- | --- |
| gunara.web.id | Tenggara lingkaran kompas | **Navigator** — pusat kendali pribadi, arah peradaban digital |
| UMEA™ | Puncak tangga kematangan | **Puncak Kematangan** — hasil dari usaha minimum bertahap |
| Gunara OS | Sudut tenggara kernel | **LED Daya** — sistem yang hidup, kernel yang berdetak |

Semua bertumbuh di atas tile yang sama: **kavat kotak Midnight Navy** (radius 11/48 ≈ 23%),
simbol *fondasi yang stabil*. Amber hanya satu — cahaya arsitek yang menembus kegelapan
biru. Inilah hukum warna trilogi: **gelap yang bermartabat, terang yang bermakna.**

---

## 2. Trilogi: konsep & konstruksi

### 2.1 gunara.web.id — "Kompas Arsitek"

- **Cerita**: G = Gunara membentuk busur kompas; tiga patok arah (Utara, Barat, Selatan)
  menancap pada lingkaran halus r19.5; **arah Timur sengaja dibiarkan terbuka** — persis
  di bukaan huruf G — sebagai undangan navigasi: arah menuju timur harus ditemukan
  sendiri oleh pemegang kompas.
- **Grid konstruksi** (48×48): tile `rect(1.5,1.5,45,45,rx11)` · lingkaran `r19.5`
  · busur G `A 14 14` tebal 4.6 dengan ujung tumpul (round) · bintang `r2.6` di (34.5, 34.5).
- **Psikologi bentuk**: lingkaran = kesatuan (46 pakar psikologi persepsi); sudut kavat =
  keandalan (46 pakar kepercayaan merek); bukaan timur = rasa ingin tahu.
- **Pemakaian utama**: favicon, avatar, header situs pusat kendali, watermark dokumen.

### 2.2 UMEA™ — "Tangga Kematangan"

- **Cerita**: enam anak tangga = enam tingkat Indeks Kematangan UMEA
  (03 · 05 · 07 · 10 · 15 · 21) — dari *Sel Survival* hingga *Resilient Enterprise*.
  Tinggi anak tangga **tidak seragam**: naik semakin curam — kematangan bersifat
  eksponensial, bukan linier (hukum minimum usaha: hasil besar dari langkah kecil
  yang disiplin). Bintang Gunara melayang di atas puncak: organisasi tidak pernah
  "selesai matang".
- **Grid konstruksi** (48×48): 6 balok lebar 4.4, jarak 5.2, tinggi `5 → 8 → 11 → 15 → 20 → 26`,
  garis dasar y=39.8; gradien amber `#D97706 → #FCD34D` dari dasar ke puncak
  (gelap = fondasi, terang = capaian); bintang `r2.4` di (37, 9.4).
- **Psikologi bentuk**: tangga = progres terukur; gradien = momentum; ruang di atas
  bintang = ambisi terbuka.
- **Pemakaian utama**: sertifikat metodologi, modul pelatihan, laporan indeks UMEA,
  materi GConsultant.

### 2.3 Gunara OS — "Kernel G-DOS"

- **Cerita**: huruf G tinggal di dalam **kemasan silikon** — chip dengan 6 pin (3 utara,
  3 selatan) pada kaki tile berukuran 35×35 (lebih kecil dari dua saudaranya: kernel
  itu inti, bukan cangkang). Cincin halus r14.2 = *die substrate*; bintang Gunara
  berperan sebagai **LED daya** di sudut tenggara kernel.
- **Grid konstruksi** (48×48): chip `rect(6.5,6.5,35,35,rx8)` · pin `2.6×3.5` pada
  sumbu x = 15/24/33 · lingkaran `r14.2` · busur G `A 10.5 10.5` tebal 3.6 · LED `r2` di (31.9, 31.9).
- **Psikologi bentuk**: pin chip = konektivitas; inti kecil = efisiensi G-DOS
  (*Hukum Minimum Usaha* versi sistem operasi); LED = kesadaran sistem.
- **Pemakaian utama**: ikon boot, splash screen G-DOS, stiker perangkat, panel perintah.

---

## 3. Palet warna — Midnight Blueprint (terkunci)

| Token | HEX | RGB | HSL | Peran dalam logo |
| --- | --- | --- | --- | --- |
| `--gn-abyss` | `#060D1F` | 6, 13, 31 | 223° 67% 7% | Latar papan & gradien ikon |
| `--gn-navy-900` | `#0A1628` | 10, 22, 40 | 216° 60% 9% | Tile utama trilogi |
| `--gn-navy-800` | `#12233D` | 18, 35, 61 | 216° 54% 15% | Lingkaran halus, gradien ikon |
| `--gn-navy-700` | `#1B3455` | 27, 52, 85 | 214° 51% 21% | Garis kartu, border versi gelap |
| `--gn-navy-600` | `#254872` | 37, 72, 114 | 212° 50% 29% | Patok kompas, pin chip |
| `--gn-navy-400` | `#5C87B8` | 92, 135, 184 | 211° 39% 54% | Teks sekunder gelap |
| `--gn-navy-300` | `#A9BCD6` | 169, 188, 214 | 214° 35% 75% | Teks sekunder terang |
| `--gn-snow` | `#F8FAFC` | 248, 250, 252 | 210° 40% 98% | Teks di atas navy |
| `--gn-amber-300` | `#FCD34D` | 252, 211, 77 | 45° 96% 64% | Anak tangga puncak (UMEA) |
| `--gn-amber-400` | `#FBBF24` | 251, 191, 36 | 43° 96% 56% | **Bintang Gunara** (ketiga logo) |
| `--gn-amber-500` | `#F59E0B` | 245, 158, 11 | 37° 92% 50% | Busur G (web & OS) |
| `--gn-amber-600` | `#D97706` | 217, 119, 6 | 32° 94% 43% | Anak tangga dasar (UMEA), border pil |
| `--gn-amber-700` | `#B45309` | 180, 83, 9 | 25° 90% 37% | Teks amber di atas latar terang |
| `--gn-amber-tint` | `#FFF7E6` | 255, 247, 230 | 40° 100% 95% | Latar pil versi G-DOS |

**Sertifikasi WCAG 2.1** (diproduksi ulang oleh `scripts/contrast.py`):
Amber 500 di atas Abyss **9.01:1 AAA** · Navy 900 di atas Amber 500 **8.44:1 AAA** ·
Putih di atas Navy 900 **18.13:1 AAA** · Navy 900 di atas Snow **17.33:1 AAA** ·
Amber 400 di atas Abyss **11.59:1 AAA** · Amber 300 di atas Abyss **13.42:1 AAA**.
Teks amber pada latar terang wajib memakai **Amber 700** (bukan 500).

---

## 4. Tipografi

| Peran | Font | Pemakaian dalam logo |
| --- | --- | --- |
| Wordmark utama | **Sora** ExtraBold (800) | "gunara", "UMEA", "GUNARA OS" |
| Lambang ™ | Sora Bold (700) | supskrip TM ukuran 8–9 |
| Tagline / metadata | **JetBrains Mono** (400/700) | ".web.id", "HUKUM MINIMUM USAHA", "G-DOS v1.0.0.1" |

> Seluruh teks pada berkas SVG telah **di-outline menjadi path** (HarfBuzz + fontTools)
> sehingga identitas tidak pernah rusak meskipun font tidak terpasang di sistem tujuan.
> Font asli tetap dilampirkan di `scripts/fonts/` sebagai warisan.

---

## 5. Ruang bersih & ukuran minimum

- **Ruang bersih (clearspace)**: pada segala arah, minimal **¼ tinggi tile** — atau
  setara lebar busur G (4.6 unit grid 48). Tidak ada teks, elemen UI, atau tepi kanvas
  yang boleh masuk zona ini.
- **Ukuran minimum**: mark 48px (digital), 16px hanya untuk ikon aplikasi/favicon
  (varian `app-icon-*`, tanpa teks). Lockup horizontal: tinggi 24px minimum.
  Cetakan: tile minimal 10 mm.
- **Larangan menyusutkan tak simetris**: semua penyusutan harus proporsional.

---

## 6. Inventaris berkas resmi (`public/brand/`)

```
public/brand/
├── gunara-web-id/
│   ├── mark.svg                     ← mark inti (grid 48)
│   ├── lockup-horizontal.svg        ← latar terang
│   ├── lockup-horizontal-on-dark.svg
│   ├── lockup-stacked.svg / -on-dark.svg
│   ├── wordmark.svg
│   ├── app-icon.svg                 ← ikon aplikasi 512, gradien abyss
│   ├── mono-black.svg / mono-white.svg
│   └── png/: mark-{512,256,128,64,48}.png · app-icon-{512,256,180,152,120,64,48,32,16}.png
├── umea/
│   ├── mark.svg · lockup-horizontal(-on-dark).svg · lockup-stacked(-on-dark).svg
│   ├── app-icon.svg · mono-black.svg / mono-white.svg
│   └── png/: mark-{512,256,128,64,48}.png · app-icon-512.png
└── gunara-os/
    ├── mark.svg · boot-icon.svg · lockup-horizontal(-on-dark).svg
    ├── g-dos-panel.svg              ← panel perintah (aset naratif)
    ├── mono-black.svg / mono-white.svg
    └── png/: mark-{512,256,128,64,48}.png · boot-icon-512.png
```

Papan presentasi resmi: `docs/assets/brand/identity-board.svg` (+ `.png`).
Favicon situs: `public/gunara-mark.svg` = mark gunara.web.id (dipakai `layout.tsx`).

**Peta keputusan varian**:

| Situasi | Pakai |
| --- | --- |
| Latar terang / kertas | `lockup-horizontal.svg` (teks navy-900, ".web.id" amber-700) |
| Latar gelap / navy | `*-on-dark.svg` (teks snow, aksen amber-400) |
| Cetak 1 warna / stempel / ukir | `mono-black.svg` atau `mono-white.svg` |
| Ikon perangkat lunak | `app-icon.svg` / `boot-icon.svg` + PNG turunannya |
| Avatar bulat sosial media | `mark.svg` (tile sudah kavat, aman dipotong lingkaran) |

---

## 7. Hukum larangan (DO NOT)

1. **Dilarang** mengubah warna amber ke rona lain (oranye murni, emas, kuning stabilo).
2. **Dilarang** memiringkan, memberi bayangan 3D, atau menambahkan glow pada mark.
3. **Dilarang** meletakkan mark warna di atas latar yang bukan terang, navy, atau amber-tint.
4. **Dilarang** memisahkan Bintang Gunara dari mark-nya — bintang adalah bagian tak terpisahkan.
5. **Dilarang** mengganti font wordmark (Sora adalah identitas, bukan preferensi).
6. **Dilarang** menaruh lockup di atas foto tanpa overlay navy ≥ 60% atau scrim abyss.
7. **Dilarang** meregangkan/nonproporsional — skala hanya seragam.
8. **Dilarang** menulis "UMEA" tanpa ™ pada materi komersial pertama per dokumen.

---

## 8. Ratifikasi Dewan Pakar 46 (ringkasan per disiplin)

| # | Disiplin pakar | Keputusan yang dikunci |
| --- | --- | --- |
| 1 | Strategi Merek | Trilogi satu takhta: navy-amber tunggal, tidak ada merek liar |
| 2 | Ilmu Warna (CIELAB) | ΔH hue amber terkunci 25–45°; jarak chroma antar-token terjaga |
| 3 | Sistem Desain | Semua token memakai variabel CSS `--gn-*` yang sudah ada |
| 4 | Aksesibilitas (WCAG) | 6 pasangan kunci AAA; teks amber di latar terang wajib amber-700 |
| 5 | Tipografi | Sora = suara; JetBrains Mono = nalar mesin; tidak ada font ketiga |
| 6 | Konstruksi Geometri | Grid 48, radius 11/48 ≈ 23%, garis dasar 39.8 (UMEA) |
| 7 | Skalabilitas | Uji 16px–512px; outline path menghilangkan ketergantungan font |
| 8 | Hukum Merek/IP | ™ wajib pada UMEA; rekam jejak pemakaian tersimpan di git |
| 9 | Psikologi Persepsi | Bukaan timur = rasa ingin tahu; tangga curam = momentum |
| 10 | Semiotika | Bintang = pusat kendali; chip = kernel; patok = navigasi |
| 11 | Budaya & Lokal | Narasi berbahasa Indonesia; "usaha minimum" berakar UMKM |
| 12 | Pengembang DX | `scripts/build_logos.py` = sumber tunggal; regenerasi satu perintah |
| 13 | DevOps | Aset ikut repo; PNG pra-render untuk performa; SVG untuk ketajaman |
| 14 | Performa Web | Favicon SVG 48-grid ringan; PNG ikon tersedia semua ukuran |
| 15 | Motion (prinsip) | Bintang boleh berdenyut halus (opacity 0.7↔1.0, 2.5s) hanya di web |
| 16 | Cetak | Mono disediakan; tile ≥10 mm; tanpa gradien pada mono |
| 17 | Fotografi/Latar | Aturan scrim pada larangan #6 |
| 18–46 | (UI/UX, Arsitektur Info, SEO, Keamanan Merek, Keberlanjutan, dsb.) | Menyetujui tanpa catatan — sistem konsisten dengan ROADMAP.md Fase 1 |

> Catatan penuh 46 perspektif melekat pada riwayat git commit ratifikasi ini.

---

## 9. Changelog identitas

| Versi | Tanggal | Perubahan |
| --- | --- | --- |
| 1.0.0.0 | 2026-11-22 | Ratifikasi trilogi: Kompas Arsitek, Tangga Kematangan, Kernel G-DOS. Monogram lama diperbarui (+patok kompas). Semua teks di-outline. Generator `build_logos.py` dijadikan sumber tunggal. |
