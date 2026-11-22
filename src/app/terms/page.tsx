import type { Metadata } from "next";
import { LegalPageShell, type LegalBagian } from "@/components/gunara/legal-page";
import { OPERATOR } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Syarat & Ketentuan — Ketentuan Penggunaan dan Kerja Sama",
  description:
    "Syarat & Ketentuan gunara.web.id: ketentuan penggunaan situs, lingkup layanan, hak kekayaan intelektual, pembayaran, garansi, batasan tanggung jawab, hukum yang berlaku, dan penyelesaian sengketa.",
  alternates: { canonical: "/terms" },
};

const BAGIAN: LegalBagian[] = [
  {
    id: "penerimaan",
    judul: "Penerimaan Ketentuan",
    isi: [
      `Dokumen Syarat & Ketentuan ini ("Ketentuan") mengatur penggunaan situs ${OPERATOR.situs} beserta seluruh halaman, fitur, dan layanan di dalamnya, serta menjadi dasar setiap perjanjian kerja sama layanan yang dibuat melalui situs ini.`,
      "Dengan mengakses situs ini, mengisi formulir kontak, atau menggunakan layanan kami, Anda menyatakan telah membaca, memahami, dan menerima seluruh Ketentuan ini. Apabila Anda mewakili suatu organisasi, Anda menyatakan bahwa Anda berwenang mengikat organisasi tersebut.",
      "Ketentuan ini merupakan satu kesatuan dengan Kebijakan Privasi dan Kebijakan Cookie kami. Untuk urusan yang belum diatur di sini, berlaku ketentuan perjanjian kerja sama tertulis antara kedua belah pihak.",
    ],
  },
  {
    id: "definisi",
    judul: "Definisi",
    isi: [
      "Dalam Ketentuan ini, istilah berikut bermakna sebagaimana dijelaskan:",
      [
        "\"Kami\", \"Kami\", atau \"Penyedia\" — Gugun Gunara beserta ekosistem layanannya, yang beroperasi dalam payung badan hukum PT Top Konsultan Internasional.",
        "\"Anda\" atau \"Klien\" — perorangan, organisasi, atau badan hukum yang menggunakan situs ini dan/atau membeli layanan kami.",
        "\"Layanan\" — seluruh jasa yang kami tawarkan, termasuk namun tidak terbatas pada asesmen kematangan organisasi, implementasi sistem operasi digital, arsitektur dan pembangunan web, konsultansi manajemen, perizinan dan kepatuhan usaha, pelatihan, serta produk dokumentasi arsitektur kelembagaan.",
        "\"Deliverable\" — hasil kerja konkret yang disepakati dalam lingkup kerja: dokumen, sistem, situs, desain, materi pelatihan, atau laporan.",
        "\"Metodologi Proprietary\" — UMEA™ (Hukum Minimum Usaha™), G-DOS, UWA-7, beserta seluruh kerangka, indeks, dan materi internal Gunara.",
      ],
    ],
  },
  {
    id: "lingkup-layanan",
    judul: "Lingkup Layanan dan Proses Kerja",
    isi: [
      "Setiap kerja sama dimulai dari pemetaan (asesmen), dilanjutkan perumusan arsitektur/lingkup kerja tertulis, eksekusi, lalu evolusi (tinjauan berkala). Lingkup, tenggat, biaya, dan kriteria penerimaan setiap pekerjaan ditetapkan dalam penawaran atau perjanjian kerja sama tertulis sebelum eksekusi dimulai.",
      "Kami berhak menolak permintaan yang berada di luar lingkup kompetensi kami, bertentangan dengan hukum, atau melanggar prinsip kerja kami — dengan pemberitahuan yang jelas tanpa kewajiban menyebut alasan rinci.",
      "Perubahan lingkup di tengah pekerjaan (change request) akan dituangkan secara tertulis beserta dampaknya terhadap biaya dan jadwal sebelum dieksekusi.",
    ],
  },
  {
    id: "ketentuan-penggunaan",
    judul: "Ketentuan Penggunaan Situs",
    isi: [
      "Dalam menggunakan situs ini, Anda setuju untuk tidak:",
      [
        "Melanggar hukum yang berlaku, hak orang lain, atau ketentuan internasional yang terkait.",
        "Mengirimkan konten yang menyesatkan, mencemarkan, diskriminatif, atau melanggar hak pihak ketiga melalui formulir dan kanal yang tersedia.",
        "Menyalin, merekayasa balik, atau memanen (scrape) bagian situs secara otomatis untuk kepentingan komersial tanpa izin tertulis.",
        "Mencoba mengakses area internal, sistem autentikasi, atau data yang bukan milik Anda — termasuk area terlindungi bagi tim internal kami.",
        "Mengganggu ketersediaan situs melalui serangan, beban berlebih, atau alat otomatis yang merusak.",
      ],
      "Kami berhak membatasi atau menghentikan akses pengguna yang melanggar ketentuan di atas, tanpa menghapus hak kami untuk mengambil langkah hukum lebih lanjut.",
    ],
  },
  {
    id: "pembayaran",
    judul: "Penawaran, Biaya, dan Pembayaran",
    isi: [
      "Seluruh harga dalam penawaran dinyatakan dalam Rupiah kecuali disepakati lain, belum termasuk pajak yang berlaku, dan berlaku untuk periode yang tercantum pada penawaran tersebut.",
      "Ketentuan pembayaran standar: uang muka sebesar yang tercantum pada perjanjian sebelum pekerjaan dimulai, dan pelunasan sesuai tenggang yang disepakati. Hak untuk melakukan pekerjaan berikutnya dapat ditunda apabila pembayaran jatuh tempo belum diterima.",
      "Keterlambatan pembayaran melebihi 14 (empat belas) hari kalender dapat dikenakan pembatalan perjanjian oleh kami, tanpa menghapus kewajiban Anda atas pekerjaan yang telah dilaksanakan.",
      "Pengembalian dana hanya berlaku untuk pekerjaan yang belum dieksekusi dan tidak berlaku untuk deliverable yang telah diserahkan serta biaya pihak ketiga yang telah dikeluarkan atas nama Anda.",
    ],
  },
  {
    id: "kewajiban-klien",
    judul: "Kewajiban Klien",
    isi: [
      "Agar pekerjaan berjalan sesuai arsitektur yang disepakati, Anda berkesempatan dan bertanggung jawab untuk:",
      [
        "Memberikan data, akses, umpan balik, dan persetujuan yang diperlukan secara tepat waktu.",
        "Menetapkan satu penanggung jawab resmi sebagai titik keputusan selama kerja sama.",
        "Memastikan legalitas dan hak Anda atas materi yang diserahkan kepada kami (logo, konten, dokumen, akses sistem).",
        "Mematuhi ketentuan perizinan dan regulasi usaha yang berlaku untuk aktivitas Anda sendiri.",
      ],
      "Keterlambatan penyediaan kewajiban di atas dapat menggeser jadwal pekerjaan secara proporsional, dan biaya tambahan yang timbul atas perubahan arah yang diakibatkannya akan dikonsultasikan terlebih dahulu.",
    ],
  },
  {
    id: "hki",
    judul: "Hak Kekayaan Intelektual",
    isi: [
      "Seluruh situs ini — teks, desain, logo, struktur navigasi, kode, dan tata letak — merupakan milik kami atau dilisensikan kepada kami, dan dilindungi undang-undang hak cipta serta peraturan kekayaan intelektual lainnya.",
      "Methodologi Proprietary (UMEA™ — Hukum Minimum Usaha™, G-DOS, UWA-7) beserta segala dokumen kerangkanya tetap menjadi milik kami. Anda memperoleh hak pakai atas output metodologi tersebut sebatas yang diperlukan untuk menjalankan organisasi Anda, bukan hak untuk menjual kembali, melisensikan ulang, atau menggandakan kerangkanya sebagai produk kompetitor.",
      "Setelah seluruh kewajiban pembayaran ditepati, Anda menjadi pemilik deliverable spesifik yang dibuat untuk Anda (misalnya situs, desain khusus, dan dokumen organisasi Anda), dengan lisensi penuh untuk memakai dan mengubahnya sesuai kebutuhan usaha Anda.",
      "Anda memberi kami izin untuk mencantumkan nama Anda dan hasil kerja sebagai referensi portofolio, kecuali Anda meminta sebaliknya secara tertulis (misalnya untuk proyek yang bersifat rahasia).",
    ],
  },
  {
    id: "kerahasiaan",
    judul: "Kerahasiaan",
    isi: [
      "Kedua belah pihak wajib menjaga kerahasiaan informasi non-publik yang diterima dari pihak lainnya selama dan setelah masa kerja sama, dan hanya menggunakannya untuk maksud kerja sama tersebut.",
      "Kerahasiaan tidak berlaku atas informasi yang sudah diketahui publik secara sah, diwajibkan diungkap oleh hukum, atau dimiliki secara sah sebelum diterima.",
      "Praktik internal kami menegaskan prinsip ini: dokumen-dokumen klien dan dokumen legal perusahaan kami disimpan terpisah dari repo publik dan hanya dapat diakses melalui jalur terautentikasi internal.",
    ],
  },
  {
    id: "garansi",
    judul: "Garansi dan Pernyataan Penafian",
    isi: [
      "Kami memberikan garansi bahwa deliverable akan dikerjakan secara profesional, sesuai lingkup dan standar yang disepakati, dan sesuai spesifikasi yang tertulis dalam perjanjian kerja sama. Cacat pada deliverable yang disebabkan pekerjaan kami akan diperbaiki dalam masa garansi yang dicantumkan pada perjanjian.",
      "Situs ini dan seluruh kontennya disediakan \"sebagaimana adanya\" untuk keperluan informasi. Kami berupaya menjaga akurasi informasi, namun tidak memberikan jaminan bahwa konten bebas dari kekeliruan, selalu mutakhir, atau sesuai untuk setiap tujuan tertentu Anda.",
      "Keputusan bisnis, hukum, perpajakan, dan investasi yang Anda ambil berdasarkan informasi dari situs ini tetap merupakan tanggung jawab Anda; untuk hal-hal yang berdampak besar, kami menyarankan penasehat profesional terkait dilibatkan.",
    ],
  },
  {
    id: "batasan-tanggung-jawab",
    judul: "Batasan Tanggung Jawab",
    isi: [
      "Sepanjang diizinkan oleh hukum yang berlaku, kami tidak bertanggung jawab atas kerugian tidak langsung, kehilangan keuntungan, kehilangan data, atau kerugian konsekuensial lainnya yang timbul dari penggunaan situs atau layanan kami.",
      "Tanggung jawab keseluruhan kami atas klaim apa pun yang timbul dari satu kerja sama dibatasi maksimal sebesar nilai kontrak kerja sama tersebut yang telah dibayarkan dalam 12 (dua belas) bulan terakhir sebelum klaim timbul.",
      "Batasan ini tidak berlaku untuk kewajiban yang tidak boleh dibatasi oleh hukum, seperti tanggung jawab atas kelalaian berat atau pelanggaran pelindungan data pribadi sesuai peraturan yang berlaku.",
    ],
  },
  {
    id: "layanan-pihak-ketiga",
    judul: "Layanan dan Tautan Pihak Ketiga",
    isi: [
      "Situs ini menampilkan tautan ke aset domain lain dalam ekosistem kami dan layanan pihak ketiga. Setiap situs pihak ketiga memiliki kebijakan privasi dan ketentuannya masing-masing; kami tidak bertanggung jawab atas isi maupun praktik situs di luar kendali kami.",
      "Apabila pekerjaan melibatkan layanan pihak ketiga (misalnya hosting, domain, atau platform tertentu), biaya dan ketentuan pihak ketiga tersebut akan diinformasikan sebelum dikeluarkan atas nama Anda.",
    ],
  },
  {
    id: "pengakhiran",
    judul: "Pengakhiran",
    isi: [
      "Anda dapat mengakhiri kerja sama kapan pun dengan pemberitahuan tertulis; kewajiban pembayaran atas pekerjaan yang telah dilaksanakan hingga tanggal efektif pengakhiran tetap berlaku.",
      "Kami dapat mengakhiri kerja sama apabila terjadi pelanggaran material yang tidak diperbaiki dalam 14 (empat belas) hari sejak pemberitahuan tertulis, atau apabila kerja sama bertentangan dengan hukum.",
      "Setelah pengakhiran, kedua belah pihak akan menyelesaikan serah terima deliverable yang telah dibayar dan mengembalikan/menghapus data rahasia pihak lainnya sesuai permintaan yang sah.",
    ],
  },
  {
    id: "hukum-sengketa",
    judul: "Hukum yang Berlaku dan Penyelesaian Sengketa",
    isi: [
      "Ketentuan ini diatur dan ditafsirkan menurut hukum Negara Republik Indonesia.",
      "Setiap perselisihan akan diselesaikan melalui tahapan berikut dengan itikad baik:",
      [
        "Tahap 1 — Musyawarah: pembahasan langsung antara kedua belah pihak dalam waktu paling lama 30 (tiga puluh) hari kalender sejak sengketa dinyatakan secara tertulis.",
        "Tahap 2 — Mediasi: apabila musyawarah tidak mencapai kesepakatan, para pihak menyelesaikannya melalui mediasi pada lembaga mediasi yang ditunjuk bersama di wilayah Jakarta Selatan.",
        "Tahap 3 — Arbitrase: apabila mediasi tidak berhasil, sengketa diselesaikan melalui arbitrase sesuai hukum arbitrase Indonesia, dengan putusan bersifat final dan mengikat kedua belah pihak.",
      ],
      "Selama sengketa diselesaikan, kewajiban kerja sama yang tidak bersengketa tetap dilaksanakan sepanjang memungkinkan.",
    ],
  },
  {
    id: "force-majeure",
    judul: "Keadaan Maha Besar (Force Majeure)",
    isi: [
      "Tidak ada pihak yang dianggap lalai apabila kegagalan pelaksanaan disebabkan oleh keadaan di luar kendali yang wajar — antara lain bencana alam, kebakaran, epidemi, perang, kerusuhan, pemogokan, pemutusan infrastruktur telekomunikasi yang luas, atau kebijakan pemerintah yang baru.",
      "Pihak yang terdampak wajib memberitahu pihak lainnya secepatnya dan kedua belah pihak akan menyepakati penyesuaian jadwal yang proporsional. Apabila keadaan maha besar berlangsung lebih dari 90 (sembilan puluh) hari, salah satu pihak berhak mengakhiri kerja sama tanpa sanksi.",
    ],
  },
  {
    id: "perubahan-ketentuan",
    judul: "Perubahan Ketentuan dan Kontak",
    isi: [
      "Kami dapat memperbarui Ketentuan ini dari waktu ke waktu. Versi terbaru selalu tersedia di halaman ini beserta tanggal berlakunya. Penggunaan situs setelah perubahan berlaku dianggap sebagai penerimaan versi terbaru.",
      `Pertanyaan mengenai Ketentuan ini dapat disampaikan kepada: ${OPERATOR.brand} — ${OPERATOR.entitas}, ${OPERATOR.alamat}. Email: ${OPERATOR.email}. Telepon: ${OPERATOR.teleponTampil}.`,
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalPageShell
      kicker="Legal · Dokumen Publik"
      judul={
        <>
          Syarat & <span className="text-gradient-amber">Ketentuan</span>
        </>
      }
      intro="Struktur sebelum karya — begitu pula dalam kerja sama. Dokumen ini memetakan hak, kewajiban, dan batasan yang menjaga kerja sama kita tetap jelas, adil, dan tahan uji."
      bagian={BAGIAN}
    />
  );
}
