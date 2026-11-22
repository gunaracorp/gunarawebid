/** Tautan navigasi bersama — modul biasa (bukan client), aman dipakai
 *  oleh server component maupun client component.
 *  Situs publik kini multi-halaman: setiap seksi punya rutenya sendiri. */
export const NAV_LINKS = [
  { href: "/", label: "Beranda" },
  { href: "/metodologi", label: "Metodologi" },
  { href: "/layanan", label: "Layanan" },
  { href: "/ekosistem", label: "Ekosistem" },
  { href: "/tentang", label: "Tentang" },
  { href: "/faq", label: "FAQ" },
  { href: "/kontak", label: "Kontak" },
] as const;

/** Seluruh aset domain ekosistem — peta kendali versi publik. */
export const EKOSISTEM_LINKS = [
  { href: "https://www.digiman.id", label: "digiman.id" },
  { href: "https://www.gconsultant.web.id", label: "gconsultant.web.id" },
  { href: "https://www.pusatperizinan.com", label: "pusatperizinan.com" },
  { href: "https://muhdin.id", label: "muhdin.id" },
  { href: "https://www.kopnusa.id", label: "kopnusa.id" },
  { href: "https://www.topmanajemen.biz.id", label: "topmanajemen.biz.id" },
  { href: "https://www.juraganwebsite.web.id", label: "juraganwebsite.web.id" },
  { href: "https://www.topkonsultan.web.id", label: "topkonsultan.web.id" },
  { href: "https://www.arofahajj.com", label: "arofahajj.com" },
  { href: "https://sertifikasi.arofahajj.com", label: "sertifikasi.arofahajj.com" },
  { href: "https://www.pppdigital.id", label: "pppdigital.id" },
] as const;
