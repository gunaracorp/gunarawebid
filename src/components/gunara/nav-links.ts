/** Tautan navigasi bersama — modul biasa (bukan client), aman dipakai
 *  oleh server component maupun client component.
 *  Situs publik kini multi-halaman: setiap seksi punya rutenya sendiri. */
export const NAV_LINKS = [
  { href: "/", label: "Beranda" },
  { href: "/metodologi", label: "Metodologi" },
  { href: "/layanan", label: "Layanan" },
  { href: "/ekosistem", label: "Ekosistem" },
  { href: "/tentang", label: "Tentang" },
  { href: "/kontak", label: "Kontak" },
] as const;

export const EKOSISTEM_LINKS = [
  { href: "https://www.digiman.id", label: "digiman.id" },
  { href: "https://www.gconsultant.web.id", label: "gconsultant.web.id" },
  { href: "https://www.pusatperizinan.com", label: "pusatperizinan.com" },
  { href: "https://muhdin.id", label: "muhdin.id" },
] as const;
