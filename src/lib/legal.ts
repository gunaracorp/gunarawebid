/**
 * Pusat data legal situs publik gunara.web.id.
 *
 * Sumber data: dokumen NIB resmi milik pengguna (internal-vault/, tidak dipublikasikan).
 * Nomor NIB TIDAK dicetak di halaman publik — identitas registrasi lengkap hanya
 * tersedia di panel internal /internal/dokumen yang dijaga middleware.
 */

export const OPERATOR = {
  brand: "Gugun Gunara",
  situs: "gunara.web.id",
  url: "https://gunara.web.id",
  entitas: "PT Top Konsultan Internasional",
  statusEntitas:
    "Pelaku usaha PMDN (Usaha Mikro), terdaftar pada sistem OSS Republik Indonesia dengan bidang usaha utama KBLI 70209 — Aktivitas Konsultasi Manajemen Lainnya.",
  alamat:
    "Belezza BSA 1st Floor Unit 106, Jln. Letjen Soepeno, Kel. Grogol Utara, Kec. Kebayoran Lama, Kota Adm. Jakarta Selatan, DKI Jakarta, Indonesia",
  email: "admin@pusatperizinan.com",
  telepon: "+62 812-3451-4669",
  teleponTampil: "0812-3451-4669",
} as const;

/** Tanggal berlaku dokumen legal (dipakai oleh /privacy, /terms, /cookies). */
export const LEGAL_BERLAKU = "22 November 2026";

/** Peraturan yang menjadi rujukan kepatuhan. */
export const RUJUKAN_KEPATUHAN = [
  "UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi (UU PDP)",
  "UU No. 1 Tahun 2024 (perubahan kedua atas UU ITE)",
  "UU No. 8 Tahun 1999 tentang Perlindungan Konsumen",
  "Prinsip-prinsip GDPR Uni Eropa sebagai tolok ukur praktik internasional",
] as const;
