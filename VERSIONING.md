# VERSIONING — SISTEM VERSI GUNARA OS

> Satu bahasa versi untuk seluruh ekosistem Gunara: situs, dokumen brand, tooling,
> dan seluruh artefak tata kelola. Versi bukan hiasan — ia adalah arsip riwayat.

## Format: `MAJOR.MINOR.PATCH.BUILD`

| Segmen | Semantik | Contoh Pemicu |
|---|---|---|
| **MAJOR** | Lompatan arsitektur atau identitas — perubahan rupa yang membuat generasi sebelumnya berbeda kelas | Penobatan v2.0.0.0 (Hari 99): ekosistem + sertifikasi + platform |
| **MINOR** | Satu fase roadmap selesai penuh | Fase 1 tuntas → `v1.1.0.9`; Fase 5 tuntas → `v1.5.0.52` |
| **PATCH** | Perbaikan mendesak di luar jadwal: hotfix keamanan, bug produksi | `v1.5.1.57` — hotfix di tengah fase 6 |
| **BUILD** | Denyut harian — angkanya = nomor hari kerja/worklog | Day 42 → segmen BUILD = `42` |

## Cara Membaca

```
v 1 . 2 . 0 . 18
    │   │   │   └─ BUILD  : hari ke-18 (denyut harian)
    │   │   └───── PATCH  : 0 hotfix di luar jadwal
    │   └───────── MINOR  : fase 2 tuntas penuh
    └───────────── MAJOR  : generasi 1 (identitas navy-amber)
```

- **`v1.0.0.0`** adalah baseline resmi 21 November 2026: identitas navy-amber stabil,
  situs 7 bagian live, brand guideline v1.0 terbit, repo `gunaracorp/gunarawebid` bersih.
- **`v2.0.0.99`** adalah penobatan akhir roadmap 99 hari (27 Februari 2027).
- Segmen BUILD selalu cocok dengan nomor hari — sehingga `git log --oneline | head -1`
  dan WORKLOG selalu bisa saling diverifikasi.

## Aturan Tag Git

1. Tag **anotasi** dibuat hanya pada penutup fase: `git tag -a v1.1.0.9 -m "Fase 1: ..."`
2. Tag harian tidak dibuat — harian cukup tercatat di `WORKLOG.md`.
3. Tag PATCH mengikuti pola `v1.{minor}.{patch}.{build-hari}`.
4. Tag MAJOR/MINOR wajib dikirim: `git push origin --tags`.
5. Menandai tag tanpa menyelesaikan *Definition of Done* fase adalah pelanggaran tata kelola.

## Definition of Done (syarat versi naik)

- Deliverable hari/fase ada dan bisa ditunjukkan (bukan "sedang dikerjakan").
- CI hijau: lint + build lulus di GitHub Actions.
- Worklog terisi dengan bukti.
- Tidak ada regresi performa maupun aksesibilitas terhadap baseline.

## Contoh Evolusi

| Peristiwa | Versi | Catatan |
|---|---|---|
| Baseline (21 Nov 2026) | `v1.0.0.0` | Tag resmi hari ini |
| Day 1 selesai | `v1.0.0.1` | Tata kelola versi aktif |
| Day 2 selesai | `v1.0.0.2` | Situs publik standar internasional |
| Day 3 — Gunara CMS Fase 1 (engine) | `v1.1.0.3` | MINOR: mesin konten blok-native aktif |
| Fase 1 tuntas (Day 9) | `v1.1.0.9` | Fondasi & observabilitas |
| Fase 4 tuntas (Day 40) | `v1.4.0.40` | Identitas Visual 2.0 |
| Hotfix (Day 57) | `v1.5.1.57` | PATCH +1 di luar jadwal |
| Penobatan (Day 99) | `v2.0.0.99` | Generasi 2 dimulai |
