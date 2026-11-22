/**
 * Gunara CMS — seed konten perdana.
 * Jalankan: bun scripts/seed_cms.ts
 * Membuat kategori, tag, dan 3 artikel contoh (2 terbit + 1 draf) yang
 * memamerkan hampir semua tipe blok.
 */
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

function waktuBaca(blocks: unknown[]): number {
  const teks = JSON.stringify(blocks)
    .replace(/[{}[\]":]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.ceil(teks / 180));
}

async function kategori(nama: string, slug: string, desc: string) {
  return db.cmsCategory.upsert({
    where: { slug },
    create: { name: nama, slug, description: desc },
    update: { name: nama, description: desc },
  });
}

async function tag(nama: string, slug: string) {
  return db.cmsTag.upsert({ where: { slug }, create: { name: nama, slug }, update: {} });
}

async function upsertArtikel(slug: string, data: {
  title: string;
  subtitle?: string;
  excerpt?: string;
  blocks: unknown[];
  status: string;
  publishedAt?: Date;
  categorySlugs: string[];
  tagSlugs: string[];
}) {
  const existing = await db.cmsPost.findUnique({ where: { slug }, select: { id: true } });
  const payload = {
    title: data.title,
    subtitle: data.subtitle ?? null,
    excerpt: data.excerpt ?? null,
    blocks: JSON.stringify(data.blocks),
    readingMinutes: waktuBaca(data.blocks),
    status: data.status,
    publishedAt: data.publishedAt ?? null,
  };
  const post = existing
    ? await db.cmsPost.update({ where: { slug }, data: payload })
    : await db.cmsPost.create({ data: { ...payload, slug, authorName: "Gugun Gunara" } });

  await db.cmsPostCategory.deleteMany({ where: { postId: post.id } });
  await db.cmsPostTag.deleteMany({ where: { postId: post.id } });
  for (const s of data.categorySlugs) {
    const c = await db.cmsCategory.findUnique({ where: { slug: s } });
    if (c) await db.cmsPostCategory.create({ data: { postId: post.id, categoryId: c.id } });
  }
  for (const s of data.tagSlugs) {
    const t = await db.cmsTag.findUnique({ where: { slug: s } });
    if (t) await db.cmsPostTag.create({ data: { postId: post.id, tagId: t.id } });
  }
  return post;
}

async function main() {
  await kategori("Sistem", "sistem", "Arsitektur, infrastruktur, dan mesin yang menopang ekosistem Gunara.");
  await kategori("Catatan Arsitek", "catatan-arsitek", "Refleksi lapangan tentang struktur, keputusan, dan hukum minimum usaha.");
  await kategori("Studi Kasus", "studi-kasus", "Bagaimana metodologi Gunara dijalankan di dunia nyata.");
  const t = {
    cms: await tag("Gunara CMS", "gunara-cms"),
    wp: await tag("WordPress", "wordpress"),
    arsitektur: await tag("Arsitektur", "arsitektur"),
    umea: await tag("UMEA", "umea"),
    gdos: await tag("G-DOS", "g-dos"),
    uwa7: await tag("UWA-7", "uwa-7"),
    keamanan: await tag("Keamanan", "keamanan"),
  };
  const c = { sistem: "sistem", arsitek: "catatan-arsitek", kasus: "studi-kasus" };

  // ── Artikel 1: manifest CMS ────────────────────────────────────────────────
  await upsertArtikel("gunara-cms-mesin-konten-100-langkah-di-depan-wordpress", {
    title: "Gunara CMS: Mesin Konten yang Lahir 100 Langkah di Depan WordPress",
    subtitle: "Bukan plugin, bukan tema, bukan sup HTML — sistem konten blok-native yang dibangun dari hukum struktur.",
    excerpt:
      "WordPress dibangun untuk era 2004: PHP, database tabel tunggal, dan konten disimpan sebagai sup HTML. Gunara CMS dibangun untuk era 2026: konten blok bertipe, revisi mesin waktu, SEO + OG image dinamis tanpa plugin, dan penjadwalan tanpa cron. Ini manifesto teknisnya.",
    status: "published",
    publishedAt: new Date(),
    categorySlugs: [c.sistem],
    tagSlugs: [t.cms.slug, t.wp.slug, t.arsitektur.slug, t.uwa7.slug],
    blocks: [
      { type: "paragraph", text: "Setiap kali sebuah bisnis tumbuh dari **website** menjadi **sistem**, masalah yang paling sering diabaikan adalah konten. Konten dianggap pekerjaan sampingan — padahal konten adalah antarmuka antara arsitektur dan manusia. Di titik itulah WordPress selama dua dekade menjadi jawaban default: mudah, murah, dan sudah di mana-mana. Tetapi mudah bukan berarti benar, dan murah sering dibayar dengan hutang struktur." },
      { type: "paragraph", text: "Gunara CMS lahir dari satu pertanyaan sederhana: *jika konten adalah data, mengapa disimpan sebagai HTML bebas yang tidak bisa divalidasi?* Jawabannya adalah mesin konten blok-native — dan perbedaannya dengan WordPress bukan sekadar fitur, tetapi hukum arsitektur." },
      { type: "stats", items: [
        { value: "14", label: "Tipe blok bawaan — tanpa plugin" },
        { value: "0", label: "Plugin pihak ketiga dibutuhkan" },
        { value: "20", label: "Snapshot revisi per artikel" },
        { value: "1", label: "Renderer untuk semua kanal" },
      ] },
      { type: "heading", level: 2, text: "Hukum Satu Renderer" },
      { type: "paragraph", text: "Di WordPress, konten yang Anda tulis di editor bisa tampil berbeda di tema, di feed RSS, di halaman AMP, dan di hasil pencarian — karena masing-masing merender HTML dengan cara sendiri. Di Gunara CMS berlaku hukum satu renderer: konten tersimpan sebagai **array blok bertipe** (paragraf, kutipan, tabel perbandingan, garis waktu, langkah metodologi), dan satu komponen yang sama merender semuanya." },
      { type: "paragraph", text: "Konsekuensinya nyata: pratinjau editor 100% identik dengan halaman publik, feed RSS otomatis bersih, API headless mengirim struktur — bukan sup tag yang di-parsing ulang. Perbaikan satu kali berlaku di semua kanal." },
      { type: "heading", level: 2, text: "Perbandingan yang Jujur" },
      { type: "comparison",
        headers: ["Aspek", "WordPress klasik", "Gunara CMS"],
        rows: [
          ["Format konten", "HTML bebas + shortcode", "Blok JSON tervalidasi di gerbang"],
          ["SEO", "Butuh plugin (Yoast dkk.)", "Panel SEO + OG image dinamis bawaan"],
          ["Revisi", "Ada, sering dilupakan", "Snapshot otomatis setiap perubahan"],
          ["Penjadwalan", "Cron WP + server cron", "Lazy-cron presisi saat artikel dibaca"],
          ["Keamanan plugin", "Permukaan serangan terbesar", "Tidak ada plugin sama sekali"],
          ["Media", "Folder server, rapuh saat pindah", "Tersimpan di database, tahan deploy"],
        ],
      },
      { type: "callout", tone: "brand", title: "Bukan anti-WordPress", text: "WordPress tetap alat yang jujur untuk jutaan situs. Gunara CMS hanya mengajukan satu argumen: untuk sistem yang Anda kendalikan penuh, struktur harus berada di tangan Anda — bukan di folder plugin yang tidak pernah Anda audit." },
      { type: "heading", level: 2, text: "Mesin Waktu yang Tidak Bisa Dimatikan" },
      { type: "paragraph", text: "Setiap penyimpanan yang mengubah konten otomatis menciptakan snapshot sebelum perubahan — maksimal 20 terbaru per artikel. Pulihkan kapan pun; dan sebelum memulihkan, kondisi sekarang juga di-snapshot dulu. Istilahnya sederhana: **tidak ada kata yang hilang**." },
      { type: "code", language: "json", code: `{\n  "type": "methodology",\n  "steps": [\n    { "code": "M", "title": "Map", "text": "Peta kebutuhan sebelum menulis" },\n    { "code": "E", "title": "Engine", "text": "Blok tervalidasi masuk database" },\n    { "code": "A", "title": "Amplify", "text": "Satu renderer, semua kanal" }\n  ]\n}` },
      { type: "heading", level: 2, text: "Jadwal Tanpa Cron" },
      { type: "paragraph", text: "Penjadwalan WordPress bergantung pada WP-Cron yang hanya berjalan saat ada pengunjung — jam berapa pun ia telat, itu standar. Gunara CMS memakai pendekatan berlawanan: artikel berstatus *terjadwal* otomatis naik menjadi *terbit* pada detik pertama ia dibaca setelah waktunya tiba. Presisi mengikuti pembaca, bukan mengikuti jam server." },
      { type: "quote", text: "Struktur sebelum karya. Konten yang tidak bisa divalidasi bukan konten — itu kebocoran yang menunggu tanggal.", attribution: "Hukum Minimum Usaha, pasal konten" },
      { type: "timeline", items: [
        { date: "LAYER 1", title: "Blok dibuat di editor", text: "14 tipe blok, drag-and-drop, pratinjau langsung." },
        { date: "LAYER 2", title: "Tervalidasi di gerbang", text: "Serializer membersihkan struktur sebelum masuk database." },
        { date: "LAYER 3", title: "Diterbitkan terukur", text: "Waktu baca, TOC, OG image, JSON-LD — semua otomatis." },
        { date: "LAYER 4", title: "Didistribusikan", text: "Situs publik, RSS, sitemap, API headless — dari satu sumber." },
      ] },
      { type: "cta", title: "Lihat sendiri mesinnya bekerja", text: "Ruang redaksi Gunara CMS terbuka untuk pemilik sistem — bukan pengguna perenungan. Mulailah dari satu percakapan.", href: "/kontak", label: "Jadwalkan sesi pemetaan" },
    ],
  });

  // ── Artikel 2: UMEA praktik ────────────────────────────────────────────────
  await upsertArtikel("umea-dalam-praktik-dari-brief-kabur-ke-sistem-yang-berdiri", {
    title: "UMEA™ dalam Praktik: dari Brief Kabur ke Sistem yang Berdiri",
    subtitle: "Empat langkah Hukum Minimum Usaha yang membuat klien berhenti membayar untuk kompleksitas yang tidak mereka butuhkan.",
    excerpt:
      "UMEA — Usaha Minimum untuk Efek Amplified — adalah disiplin menghasilkan efek terbesar dengan usaha terkecil yang bisa diukur. Artikel ini membedah satu siklus UMEA nyata: dari brief yang kabur, pemetaan minimum, hingga sistem yang berdiri tanpa penjaga tetap.",
    status: "published",
    publishedAt: new Date(),
    categorySlugs: [c.kasus],
    tagSlugs: [t.umea.slug, t.gdos.slug, t.arsitektur.slug],
    blocks: [
      { type: "paragraph", text: "Brief klien hampir selalu datang dalam keadaan kabur: *\"kita butuh digital transformation\"*, *\"bikin seperti punya kompetitor tapi lebih bagus\"*. Kabur bukan masalah — kabur adalah kondisi awal yang wajar. Masalah dimulai ketika vendor menyambut kabur itu dengan proposal raksasa." },
      { type: "paragraph", text: "UMEA™ (Usaha Minimum untuk Efek Amplified) menolak logika itu. Hukumnya sederhana dan kejam sekaligus: **usaha minimum yang bisa diukur, dengan efek yang bisa diamplifikasi**. Sisanya adalah kebisingan yang harus ditunda, bukan dibayar." },
      { type: "heading", level: 2, text: "Langkah 1 — Petakan, Jangan Estimasi" },
      { type: "paragraph", text: "Sesi pemetaan menghasilkan tiga daftar: yang **wajib** berdiri dalam 10 hari, yang boleh menunggu 90 hari, dan yang tidak boleh dibangun sama sekali. Daftar ketiga adalah yang paling mahal nilainya — setiap item di sana adalah uang yang tidak habis." },
      { type: "list", ordered: true, items: [
        "Wajib 10 hari: satu halaman yang menjual, satu jalur kontak yang terukur, satu basis data yang rapi.",
        "Boleh 90 hari: automasi, analitik lanjutan, konten yang membangun otoritas.",
        "Tidak dibangun: fitur yang tidak punya pemilik, integrasi tanpa kontrak, kecerdasan tanpa data.",
      ] },
      { type: "heading", level: 2, text: "Langkah 2 — Struktur Sebelum Karya" },
      { type: "paragraph", text: "Sebelum satu piksel pun digambar, arsitektur ditetapkan: domain mana yang menjadi organ, satu otak di mana, data mengalir ke arah mana. Di ekosistem Gunara, struktur itu dibaca seperti bagan — bukan ditebak seperti legenda." },
      { type: "quote", text: "Klien tidak membayar untuk fitur. Klien membayar untuk kepastian bahwa sistem akan tetap berdiri ketika ia sedang tidak melihat.", attribution: "Catatan arsitek, siklus UMEA ke-40" },
      { type: "heading", level: 2, text: "Langkah 3 — Amplify yang Sudah Berdiri" },
      { type: "stats", items: [
        { value: "10 hari", label: "D-10 paket minimum berdiri" },
        { value: "3x", label: "Efek amplifikasi konten terjadwal" },
        { value: "0 penjaga", label: "Sistem dirancang tanpa penjaga tetap" },
      ] },
      { type: "paragraph", text: "Amplifikasi bukan menambah pekerjaan — ia menambah efek dari pekerjaan yang sudah selesai. Artikel yang ditulis sekali terdistribusi ke empat kanal dari satu renderer; identitas yang diratifikasi sekali dipakai sebelas domain." },
      { type: "callout", tone: "info", title: "Sinyal UMEA bekerja", text: "Jika setelah pemetaan klien bisa menyebutkan dengan pasti apa yang TIDAK dibangun — siklus itu berhasil. Jika tidak, yang berjalan adalah proyek kegembiraan, bukan sistem." },
      { type: "cta", title: "Coba petakan sistem Anda", text: "Satu sesi pemetaan, satu daftar wajib, satu daftar larangan. Itu saja untuk memulai.", href: "/kontak", label: "Minta sesi pemetaan" },
    ],
  });

  // ── Artikel 3: draf showcase ───────────────────────────────────────────────
  await upsertArtikel("catatan-arsitek-dua-zona-publik-x-internal", {
    title: "Catatan Arsitek: Dua Zona — Publik × Internal",
    subtitle: "Draf: mengapa satu bisnis membutuhkan dua wajah dengan satu otak — dan bagaimana isolasinya dijaga.",
    status: "draft",
    categorySlugs: [c.arsitek],
    tagSlugs: [t.keamanan.slug, t.arsitektur.slug, t.gdos.slug],
    blocks: [
      { type: "paragraph", text: "Zona publik menjawab pertanyaan calon klien. Zona internal menyimpan hal-hal yang hanya pantas diketahui sistem: spesifikasi identitas, dokumen legal, roadmap versi. Menggabungkan keduanya dalam satu wajah adalah kesalahan arsitektur paling umum — dan paling mahal." },
      { type: "heading", level: 2, text: "Prinsip Isolasi" },
      { type: "list", ordered: false, items: [
        "Zona internal tidak pernah masuk sitemap, robots, maupun pratinjau pencarian.",
        "Dokumen rahasia disajikan lewat API gated — bukan folder statis yang bisa ditebak URL-nya.",
        "Kunci hidup di environment variable, tidak pernah tertulis di repo.",
        "Middleware menutup gerbang di lapis pertama; handler memeriksa ulang di lapis kedua.",
      ] },
      { type: "paragraph", text: "Catatan ini masih draf — dan itulah poinnya: mesin waktu CMS membiarkan gagasan mengendap sebelum dipublikasikan. Klik *Pratinjau* di editor untuk membaca utuh tanpa membuka ke publik." },
    ],
  });

  const total = await db.cmsPost.count();
  console.log(`[OK] Gunara CMS seed selesai — ${total} artikel, ${await db.cmsCategory.count()} kategori, ${await db.cmsTag.count()} tag.`);
}

main()
  .catch((e) => {
    console.error("[GAGAL]", e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
