import type { Metadata } from "next";
import { LegalPageShell, type LegalBagian } from "@/components/gunara/legal-page";
import { OPERATOR, RUJUKAN_KEPATUHAN } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Kebijakan Privasi — Pelindungan Data Pribadi",
  description:
    "Kebijakan Privasi gunara.web.id: bagaimana kami mengumpulkan, menggunakan, melindungi, dan melindungi hak Anda atas data pribadi — selaras UU PDP No. 27/2022 dan prinsip internasional GDPR.",
  alternates: { canonical: "/privacy" },
};

const BAGIAN: LegalBagian[] = [
  {
    id: "ruang-lingkup",
    judul: "Ruang Lingkup Kebijakan",
    isi: [
      `Kebijakan Privasi ini berlaku untuk seluruh layanan yang disediakan melalui situs ${OPERATOR.situs} beserta seluruh aset domain dalam ekosistem yang sama, dan mengatur bagaimana kami — sebagai Pengendali Data Pribadi — mengumpulkan, mencatat, menyimpan, memperbarui, menggunakan, menggabungkan, memperlihatkan, serta menghancurkan Data Pribadi Anda.`,
      "Dengan mengakses atau menggunakan situs ini, mengisi formulir kontak, atau menggunakan layanan kami, Anda dianggap telah membaca, memahami, dan menyetujui praktik yang dijelaskan dalam kebijakan ini. Jika Anda tidak menyetujui bagian mana pun, mohon hentikan penggunaan layanan dan hubungi kami untuk klarifikasi.",
      "Kebijakan ini disusun dengan mengikuti standar internasional terbaik dan wajib hukum yang berlaku di wilayah hukum kami:",
      [...RUJUKAN_KEPATUHAN],
    ],
  },
  {
    id: "pengendali-data",
    judul: "Pengendali Data Pribadi dan Pihak yang Dapat Dihubungi",
    isi: [
      `Pengendali Data Pribadi atas seluruh pemrosesan dalam kebijakan ini adalah ${OPERATOR.brand}, yang beroperasi dalam payung badan hukum ${OPERATOR.entitas} (Pelaku Usaha PMDN, Usaha Mikro, terdaftar pada sistem OSS Republik Indonesia).`,
      `Kantor kami berada di ${OPERATOR.alamat}. Untuk setiap hal yang berkaitan dengan pemrosesan Data Pribadi Anda — termasuk permintaan hak subjek, keberatan, atau keluhan — silakan menghubungi kanal resmi berikut: email ${OPERATOR.email} atau telepon ${OPERATOR.teleponTampil}.`,
      "Kami berupaya menanggapi setiap permintaan privasi dalam waktu paling lama 14 (empat belas) hari kalender sejak permintaan lengkap diterima.",
    ],
  },
  {
    id: "data-yang-dikumpulkan",
    judul: "Data Pribadi yang Kami Kumpulkan",
    isi: [
      "Kami menerapkan prinsip minimalisasi data: hanya data yang benar-benar diperlukan untuk tujuan yang jelas. Kategori data yang kami proses antara lain:",
      [
        "Data identitas dan kontak yang Anda berikan sendiri lewat formulir kontak: nama, email, nomor telepon, nama organisasi, dan ringkasan kebutuhan Anda.",
        "Data teknis yang tercatat otomatis saat Anda berkunjung: alamat IP, jenis peramban, perangkat, halaman yang dilihat, dan waktu kunjungan — untuk keamanan situs dan analitik agregat.",
        "Data preferensi tersimpan di perangkat Anda (misalnya pilihan mode terang/gelap) — data ini tidak dikirim ke server kami kecuali diperlukan secara teknis.",
        "Data komunikasi: isi pesan, keluhan, atau permintaan yang Anda kirim melalui kanal resmi kami.",
      ],
      "Kami tidak dengan sengaja mengumpulkan data pribadi yang bersifat spesifik (sensitive personal data) seperti keyakinan politik, data biometrik, atau data kesehatan. Apabila Anda menyertakan data semacam itu dalam pesan Anda, kami akan memprosesnya seminimal mungkin dan menghapusnya segera setelah tujuan tercapai.",
    ],
  },
  {
    id: "dasar-dan-tujuan",
    judul: "Dasar Hukum dan Tujuan Pemrosesan",
    isi: [
      "Setiap pemrosesan Data Pribadi yang kami lakukan memiliki dasar hukum dan tujuan yang tegas, tanpa aktivitas tersembunyi:",
      [
        "Persetujuan — Anda memberikan data lewat formulir kontak secara sukarela; persetujuan dapat ditarik kapan saja dengan menghubungi kami.",
        "Pelaksanaan kontrak atau langkah pra-kontrak — memproses permintaan konsultasi, menyusun penawaran, dan menjalankan kerja sama layanan.",
        "Kepentingan yang sah — menjaga keamanan situs, mencegah penyalahgunaan dan spam, serta meningkatkan kualitas layanan berdasarkan data agregat.",
        "Kewajiban hukum — memenuhi kewajiban perpajakan, pelaporan, dan permintaan berwenang sesuai peraturan perundang-undangan.",
      ],
      "Kami tidak menjual, menyewakan, atau memperdagangkan Data Pribadi Anda kepada pihak mana pun dalam bentuk apa pun.",
    ],
  },
  {
    id: "cookie",
    judul: "Cookie dan Teknologi Serupa",
    isi: [
      "Situs ini menggunakan cookie dan penyimpanan lokal secara terbatas dan transparan. Rincian lengkap — jenis, tujuan, masa retensi, dan cara mengendalikannya — tersedia pada halaman Kebijakan Cookie kami.",
      "Secara ringkas: cookie yang kami gunakan hanyalah cookie esensial (keamanan sesi internal) dan preferensi tampilan. Saat ini kami tidak memasang cookie pelacakan iklan pihak ketiga. Jika kebijakan tersebut berubah, kami akan memperbarui halaman Kebijakan Cookie dan meminta persetujuan sesuai ketentuan yang berlaku.",
    ],
  },
  {
    id: "berbagi-data",
    judul: "Pengungkapan Data kepada Pihak Ketiga",
    isi: [
      "Data Pribadi Anda hanya dapat dibagikan kepada pihak berikut, dengan batasan ketat sesuai tujuan pemrosesan:",
      [
        "Penyedia infrastruktur teknis yang bekerja sebagai pemroses atas instruksi kami (misalnya penyedia hosting, penyimpanan basis data, dan kontrol versi kode) — dengan kewajiban kerahasiaan dan pelindungan data yang setara.",
        "Mitra kerja profesional (misalnya konsultan perizinan atau auditor) yang terlibat langsung dalam melayani permintaan Anda — hanya data yang diperlukan.",
        "Instansi penegak hukum atau regulator apabila diwajibkan oleh peraturan perundang-undangan atau perintah yang sah.",
        "Penerus usaha dalam skenario merger, akuisisi, atau restrukturisasi — dengan pemberitahuan sebelumnya dan tunduk pada kebijakan privasi ini.",
      ],
      "Setiap penerima data dibatasi pada prinsip kebutuhan-untuk-tahu (need-to-know) dan tidak diberikan akses lebih dari yang diperlukan.",
    ],
  },
  {
    id: "retensi",
    judul: "Retensi dan Penghapusan Data",
    isi: [
      "Data Pribadi disimpan hanya selama diperlukan untuk tujuan pemrosesannya atau selama diwajibkan oleh hukum. Periode retensi kami:",
      [
        "Data formulir kontak: maksimal 24 (dua puluh empat) bulan sejak komunikasi terakhir, kecuali menjadi bagian dari kontrak yang sedang berjalan.",
        "Data terkait kontrak layanan: selama masa kontrak ditambah masa retensi wajib hukum (termasuk kewajiban perpajakan).",
        "Log keamanan teknis: maksimal 12 (dua belas) bulan.",
      ],
      "Setelah periode tersebut, data dihapus secara aman atau dianonimkan sehingga tidak dapat lagi dihubungkan dengan identitas Anda.",
    ],
  },
  {
    id: "hak-anda",
    judul: "Hak Anda sebagai Subjek Data Pribadi",
    isi: [
      "Sesuai undang-undang pelindungan data yang berlaku, Anda memiliki hak-hak berikut atas Data Pribadi Anda:",
      [
        "Hak mendapatkan informasi tentang tujuan pemrosesan dan aktivitas pemrosesan data Anda.",
        "Hak mengakses dan memperoleh salinan Data Pribadi yang kami proses.",
        "Hak memperbaiki (rectification) data yang tidak akurat atau tidak lengkap.",
        "Hak mengakhiri pemrosesan, menghapus (erasure), atau menganonimkan data Anda.",
        "Hak menarik persetujuan pemrosesan kapan pun, tanpa memengaruhi keabsahan pemrosesan sebelum penarikan.",
        "Hak mengeluh kepada kami dan kepada lembaga pengawas pelindungan data yang berwenang.",
        "Hak portabilitas data — memperoleh data Anda dalam format yang umum digunakan dan terbaca mesin.",
        "Hak mengajukan keberatan terhadap keputusan otomatis (termasuk pemrofilan) yang menimbulkan akibat hukum.",
      ],
      `Permintaan hak subjek dapat diajukan ke ${OPERATOR.email}. Untuk menjaga keamanan, kami dapat meminta verifikasi identitas sebelum memproses permintaan, dan permintaan dari pihak ketiga atas data orang lain tidak akan dilayani tanpa bukti kuasa yang sah.`,
    ],
  },
  {
    id: "keamanan",
    judul: "Keamanan Data",
    isi: [
      "Kami menerapkan langkah pengamanan teknis dan organisatoris yang proporsional terhadap risikonya:",
      [
        "Enkripsi in-transit: seluruh lalu lintas situs dilayani melalui HTTPS/TLS.",
        "Prinsip akses terbatas: dokumen internal dan aset rahasia tidak pernah berada di jalur publik situs; aksesnya dijaga lapis middleware, sesi terautentikasi, dan pemeriksaan sesi di setiap permintaan API.",
        "Pemisahan lingkungan: rahasia (kredensial, kunci akses) tidak pernah disimpan dalam kode sumber; dokumen legal perusahaan dipisahkan total dari repo publik.",
        "Pembatasan laju dan penyaringan spam pada formulir publik untuk mencegah penyalahgunaan otomatis.",
        "Peninjauan berkala atas dependensi dan konfigurasi keamanan situs.",
      ],
      "Apabila terjadi kebocoran Data Pribadi, kami akan memberitahu Anda dan lembaga pengawas yang berwenang secara tertulis dalam waktu paling lambat 3×24 jam sejak diketahui, sesuai ketentuan pelindungan data yang berlaku, beserta upaya penanganannya.",
    ],
  },
  {
    id: "transfer-internasional",
    judul: "Transfer Data ke Wilayah Internasional",
    isi: [
      "Sebagian infrastruktur teknis kami beroperasi pada pusat data yang dapat berada di luar yurisdiksi Indonesia. Untuk transfer tersebut, kami memastikan pelindungan yang setara (equivalent protection): penyedia berstandar internasional, enkripsi in-transit dan at-rest, serta kewajiban kontraktual untuk melindungi data setara dengan undang-undang pelindungan data yang berlaku.",
      "Kami tidak mentransfer data ke yurisdiksi yang tidak memiliki tingkat pelindungan yang memadai tanpa dasar hukum dan pengamanan yang sesuai.",
    ],
  },
  {
    id: "anak",
    judul: "Privasi Anak",
    isi: [
      "Layanan kami ditujukan bagi pelaku usaha, organisasi, dan profesional dewasa. Kami tidak dengan sengaja mengumpulkan data pribadi anak di bawah usia 18 tahun.",
      "Apabila Anda meyakini seorang anak telah memberikan data pribadinya kepada kami, hubungi kami melalui kanal resmi; kami akan menghapus data tersebut secepatnya setelah verifikasi.",
    ],
  },
  {
    id: "perubahan",
    judul: "Perubahan Kebijakan",
    isi: [
      "Kebijakan Privasi ini dapat diperbarui sewaktu-waktu mengikuti perkembangan layanan atau perubahan peraturan. Versi terbaru selalu dipublikasikan pada halaman ini dengan tanggal berlaku yang diperbarui.",
      "Untuk perubahan yang bersifat material, kami akan memberikan pemberitahuan yang layak (misalnya melalui pengumuman di situs atau email kepada klien aktif) sebelum perubahan berlaku efektif.",
    ],
  },
  {
    id: "kontak-privasi",
    judul: "Hubungi Kami",
    isi: [
      `Pertanyaan, permintaan, atau keluhan seputar privasi dapat disampaikan kepada: ${OPERATOR.brand} — ${OPERATOR.entitas}, ${OPERATOR.alamat}. Email: ${OPERATOR.email}. Telepon: ${OPERATOR.teleponTampil}.`,
      "Kami berkomitmen menindaklanjuti setiap keluhan secara serius, tertib, dan terdokumentasi.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <LegalPageShell
      kicker="Legal · Dokumen Publik"
      judul={
        <>
          Kebijakan <span className="text-gradient-amber">Privasi</span>
        </>
      }
      intro="Data Anda adalah bagian dari arsitektur kepercayaan kami. Dokumen ini menjelaskan secara terbuka bagaimana kami memperlakukan setiap data pribadi yang Anda percayakan — dengan standar pelindungan setara praktik internasional terbaik."
      bagian={BAGIAN}
    />
  );
}
