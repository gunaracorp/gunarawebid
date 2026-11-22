import type { Metadata } from "next";
import { LegalPageShell, type LegalBagian } from "@/components/gunara/legal-page";
import { Reveal } from "@/components/gunara/reveal";
import { OPERATOR } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Kebijakan Cookie — Transparansi Teknologi Pelacak",
  description:
    "Kebijakan Cookie gunara.web.id: jenis cookie yang digunakan, tujuannya, masa simpannya, dan cara Anda mengendalikannya — tanpa pelacakan iklan pihak ketiga.",
  alternates: { canonical: "/cookies" },
};

const BAGIAN: LegalBagian[] = [
  {
    id: "apa-itu-cookie",
    judul: "Apa Itu Cookie?",
    isi: [
      "Cookie adalah berkas kecil yang disimpan oleh peramban di perangkat Anda saat Anda mengunjungi sebuah situs. Cookie membantu situs berfungsi dengan benar, mengingat preferensi Anda, dan menjaga keamanan sesi.",
      "Selain cookie, situs modern juga dapat menggunakan penyimpanan lokal peramban (localStorage) untuk kebutuhan serupa. Kebijakan ini mencakup keduanya karena sama-sama menyimpan data kecil di perangkat Anda.",
    ],
  },
  {
    id: "prinsip",
    judul: "Prinsip Kami dalam Menggunakan Cookie",
    isi: [
      "Kami menerapkan pendekatan minimalis: hanya cookie yang benar-benar dibutuhkan untuk fungsi, keamanan, dan preferensi — tanpa pelacakan iklan.",
      [
        "Tidak ada cookie pelacakan iklan atau jaringan periklanan pihak ketiga di situs ini.",
        "Tidak ada penyematan analitik yang mengidentifikasi Anda secara individual.",
        "Setiap cookie yang ada dicantumkan lengkap pada tabel di bawah — tidak ada yang tersembunyi.",
        "Preferensi tampilan Anda (mode terang/gelap) disimpan di perangkat Anda sendiri dan tidak dikirim ke server kami.",
      ],
    ],
  },
  {
    id: "jenis-cookie",
    judul: "Jenis Cookie yang Kami Gunakan",
    isi: [
      "Berdasarkan fungsinya, cookie di situs ini terbagi dalam tiga kategori:",
      [
        "Cookie Esensial (Wajib) — diperlukan agar situs berfungsi dan aman; tidak dapat dimatikan tanpa memengaruhi fungsi situs. Hukum mengizinkan penyimpanan cookie ini tanpa persetujuan karena sifatnya murni teknis.",
        "Cookie Preferensi — menyimpan pilihan Anda seperti mode tampilan agar pengalaman konsisten setiap kunjungan.",
        "Cookie Analitik — untuk pengukuran penggunaan secara agregat. Saat ini kami TIDAK mengaktifkan cookie analitik; kolom ini disiapkan untuk transparansi jika di masa depan diperlukan — dan saat itu tiba, persetujuan Anda akan diminta terlebih dahulu.",
      ],
    ],
  },
  {
    id: "kendali",
    judul: "Cara Mengendalikan Cookie",
    isi: [
      "Anda memiliki kendali penuh atas cookie di perangkat Anda:",
      [
        "Mengatur atau menghapus cookie melalui pengaturan peramban Anda (Chrome, Firefox, Safari, Edge, dan lainnya menyediakan panel khusus).",
        "Menggunakan mode penjelajahan privat/incognito untuk mencegah penyimpanan cookie sesi.",
        "Menghapus data penjelajahan secara berkala — preferensi tampilan akan kembali ke bawaan setelah dihapus.",
      ],
      "Perlu dicatat: menonaktifkan cookie esensial dapat membuat fitur tertentu — terutama sesi terautentikasi internal tim kami — tidak berfungsi sebagaimana mestinya.",
    ],
  },
  {
    id: "pihak-ketiga",
    judul: "Cookie Pihak Ketiga",
    isi: [
      "Situs ini memuat font dan aset melalui layanan yang dapat menerapkan cache di sisi peramban Anda, namun kami tidak memasang skrip pelacakan pihak ketiga untuk tujuan iklan atau pembuatan profil.",
      "Tautan menuju aset domain ekosistem dan situs pihak ketiga lainnya memiliki kebijakan cookie masing-masing; kami menyarankan Anda membaca kebijakan di situs tujuan saat meninggalkan situs ini.",
    ],
  },
  {
    id: "perubahan-cookie",
    judul: "Pembaruan Kebijakan",
    isi: [
      "Jika kami menambah atau mengubah penggunaan cookie — misalnya mengaktifkan analitik — kebijakan ini akan diperbarui, tabel cookie diperbarui, dan persetujuan yang diperlukan akan diminta sebelum cookie baru dipasang.",
      `Pertanyaan seputar cookie dapat disampaikan ke ${OPERATOR.email}.`,
    ],
  },
];

/** Tabel inventaris cookie — transparansi penuh, standar internasional. */
function TabelCookie() {
  const baris = [
    {
      nama: "g_internal_session",
      kategori: "Esensial",
      tujuan: "Sesi terautentikasi tim internal (panel rahasia). Hanya diterbitkan setelah login kunci akses internal; tidak pernah berisi data publik.",
      masa: "Sesi / maksimal 8 jam",
    },
    {
      nama: "theme (localStorage)",
      kategori: "Preferensi",
      tujuan: "Mengingat pilihan mode terang/gelap Anda di perangkat ini. Tidak dikirim ke server.",
      masa: "Sampai dihapus oleh Anda",
    },
    {
      nama: "—",
      kategori: "Analitik",
      tujuan: "Saat ini tidak ada cookie analitik yang dipasang. Kolom ini disiapkan untuk transparansi masa depan.",
      masa: "—",
    },
    {
      nama: "—",
      kategori: "Iklan / Pelacak",
      tujuan: "Kami tidak memasang cookie iklan atau pelacakan pihak ketiga. Tidak ada yang perlu Anda persetujui.",
      masa: "—",
    },
  ];

  return (
    <Reveal delay={0.05} className="mt-12">
      <div className="overflow-hidden rounded-3xl border border-border bg-card">
        <div className="border-b border-border px-6 py-5">
          <p className="font-mono text-[10px] font-bold tracking-[0.22em] text-[var(--gn-amber-700)] dark:text-[var(--gn-amber-400)]">
            INVENTARIS COOKIE
          </p>
          <h2 className="mt-2 font-display text-xl font-bold">
            Daftar Lengkap Cookie di gunara.web.id
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <caption className="sr-only">
              Tabel inventaris cookie: nama, kategori, tujuan, dan masa simpan
            </caption>
            <thead>
              <tr className="border-b border-border bg-secondary/50 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                <th scope="col" className="px-6 py-3.5 font-semibold">Nama</th>
                <th scope="col" className="px-6 py-3.5 font-semibold">Kategori</th>
                <th scope="col" className="px-6 py-3.5 font-semibold">Tujuan</th>
                <th scope="col" className="px-6 py-3.5 font-semibold">Masa Simpan</th>
              </tr>
            </thead>
            <tbody>
              {baris.map((b) => (
                <tr key={b.nama + b.kategori} className="border-b border-border last:border-b-0">
                  <td className="px-6 py-4 font-mono text-xs text-foreground">{b.nama}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex rounded-full border border-border bg-secondary px-2.5 py-1 text-[10px] font-semibold tracking-[0.12em] text-muted-foreground">
                      {b.kategori.toUpperCase()}
                    </span>
                  </td>
                  <td className="max-w-[320px] px-6 py-4 leading-relaxed text-muted-foreground">
                    {b.tujuan}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{b.masa}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Reveal>
  );
}

export default function CookiesPage() {
  return (
    <LegalPageShell
      kicker="Legal · Dokumen Publik"
      judul={
        <>
          Kebijakan <span className="text-gradient-amber">Cookie</span>
        </>
      }
      intro="Transparan sampai ke lapisan teknis. Halaman ini mencantumkan setiap cookie yang kami gunakan — beserta tujuan dan masa simpannya — supaya Anda selalu memegang kendali penuh atas perangkat Anda."
      bagian={BAGIAN}
      extra={<TabelCookie />}
    />
  );
}
