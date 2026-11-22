import type { Metadata } from "next";
import { LockKeyhole, Ruler, Ban, FolderTree, Download, Sparkles } from "lucide-react";
import { BrandSystem } from "@/components/gunara/brand-system";

export const metadata: Metadata = {
  title: "Identitas & Detail Logo",
};

const TRILILOGI = [
  {
    nama: "gunara.web.id",
    julukan: "Kompas Arsitek",
    img: "/brand/gunara-web-id/mark.svg",
    star: "Tenggara lingkaran kompas",
    peranBintang: "Navigator — pusat kendali pribadi, arah peradaban digital",
    cerita:
      "G = Gunara membentuk busur kompas; tiga patok arah (Utara, Barat, Selatan) menancap pada lingkaran halus r19.5; arah Timur sengaja dibiarkan terbuka — persis di bukaan huruf G — sebagai undangan navigasi: arah menuju timur harus ditemukan sendiri oleh pemegang kompas.",
    grid: [
      "Tile rect(1.5, 1.5, 45, 45) radius 11 (≈23%)",
      "Lingkaran halus r19.5 · busur G A 14 14 tebal 4.6 ujung tumpul",
      "Tiga patok kompas navy-600 · bintang r2.6 di (34.5, 34.5)",
    ],
    pakai: "Favicon, avatar, header situs pusat kendali, watermark dokumen",
  },
  {
    nama: "UMEA™",
    julukan: "Tangga Kematangan",
    img: "/brand/umea/mark.svg",
    star: "Puncak tangga kematangan",
    peranBintang: "Puncak Kematangan — hasil dari usaha minimum bertahap",
    cerita:
      "Enam anak tangga = enam tingkat Indeks Kematangan UMEA (03 · 05 · 07 · 10 · 15 · 21) — dari Sel Survival hingga Resilient Enterprise. Tinggi anak tangga tidak seragam: naik semakin curam — kematangan bersifat eksponensial, bukan linier (hukum minimum usaha: hasil besar dari langkah kecil yang disiplin). Bintang Gunara melayang di atas puncak: organisasi tidak pernah selesai matang.",
    grid: [
      "6 balok lebar 4.4, jarak 5.2, tinggi 5 → 8 → 11 → 15 → 20 → 26",
      "Garis dasar y=39.8 · gradien amber #D97706 → #FCD34D dasar ke puncak",
      "Bintang r2.4 di (37, 9.4) — ambisi terbuka di atas puncak",
    ],
    pakai: "Sertifikat metodologi, modul pelatihan, laporan indeks UMEA, materi GConsultant",
  },
  {
    nama: "Gunara OS",
    julukan: "Kernel G-DOS",
    img: "/brand/gunara-os/mark.svg",
    star: "Sudut tenggara kernel",
    peranBintang: "LED Daya — sistem yang hidup, kernel yang berdetak",
    cerita:
      "Huruf G tinggal di dalam kemasan silikon — chip dengan 6 pin (3 utara, 3 selatan) pada kaki tile 35×35 (lebih kecil dari dua saudaranya: kernel itu inti, bukan cangkang). Cincin halus r14.2 = die substrate; bintang Gunara berperan sebagai LED daya di sudut tenggara kernel.",
    grid: [
      "Chip rect(6.5, 6.5, 35, 35) radius 8 · 6 pin 2.6×3.5 pada sumbu x 15/24/33",
      "Cincin die substrate r14.2 · busur G A 10.5 10.5 tebal 3.6",
      "LED daya r2 di (31.9, 31.9) — kesadaran sistem",
    ],
    pakai: "Ikon boot, splash screen G-DOS, stiker perangkat, panel perintah",
  },
];

const LARANGAN = [
  "Mengubah warna amber ke rona lain (oranye murni, emas, kuning stabilo).",
  "Memiringkan, memberi bayangan 3D, atau menambahkan glow pada mark.",
  "Meletakkan mark warna di atas latar yang bukan terang, navy, atau amber-tint.",
  "Memisahkan Bintang Gunara dari mark-nya — bintang adalah bagian tak terpisahkan.",
  "Mengganti font wordmark (Sora adalah identitas, bukan preferensi).",
  "Menaruh lockup di atas foto tanpa overlay navy ≥ 60% atau scrim abyss.",
  "Meregangkan/nonproporsional — skala hanya seragam.",
  "Menulis “UMEA” tanpa ™ pada materi komersial pertama per dokumen.",
];

const INVENTARIS = [
  {
    dir: "public/brand/gunara-web-id/",
    files: "mark · lockup horizontal & stacked (terang/on-dark) · wordmark · app-icon · mono-black/white · PNG 16–512px",
  },
  {
    dir: "public/brand/umea/",
    files: "mark · lockup horizontal & stacked (terang/on-dark) · app-icon · mono-black/white · PNG 48–512px",
  },
  {
    dir: "public/brand/gunara-os/",
    files: "mark · boot-icon · lockup horizontal (terang/on-dark) · g-dos-panel · mono-black/white · PNG 48–512px",
  },
];

const RULUM = [
  { h: "Clearspace", d: "Minimal ¼ tinggi tile ke segala arah — setara lebar busur G (4.6 unit grid 48). Zona tanpa teks/UI." },
  { h: "Ukuran minimum", d: "Mark 48px digital · app-icon 16px (favicon) · lockup horizontal 24px · cetak: tile ≥ 10 mm." },
  { h: "Penyusutan", d: "Selalu proporsional — dilarang menyusutkan tak simetris atau meregangkan." },
];

export default function InternalIdentitasPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <section className="rounded-3xl border border-[#1b3455] bg-[#0a1628] p-7 sm:p-9">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[#1b3455] bg-[#060d1f] text-[var(--gn-amber-400)]">
              <Sparkles className="h-6 w-6" aria-hidden />
            </span>
            <div>
              <h1 className="font-display text-2xl font-bold">Sistem Identitas Trilogi</h1>
              <p className="font-mono text-[11px] tracking-[0.18em] text-[#5c87b8]">
                RATIFIKASI DEWAN PAKAR 46 · OMNIBRAND COLOR ARCHITECT · v1.0.0.0 · DIKUNCI SELAMANYA
              </p>
            </div>
          </div>
          <span className="flex items-center gap-2 rounded-full border border-[var(--gn-amber-500)]/50 bg-[var(--gn-amber-500)]/10 px-3.5 py-1.5 font-mono text-[10px] font-bold text-[var(--gn-amber-300)]">
            <LockKeyhole className="h-3.5 w-3.5" aria-hidden />
            RAHASIA INTERNAL
          </span>
        </div>
        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-[#a9bcd6]">
          <strong className="text-[#e6eef8]">Filosofi tunggal: “Satu Otak, Banyak Organ.”</strong>{" "}
          Ketiga logo bukan tiga merek — mereka satu organisme dari satu benih yang sama:{" "}
          <strong className="text-[var(--gn-amber-400)]">Bintang Gunara</strong> (amber-400) yang
          berpindah peran mengikuti konteks organ. Semua tumbuh di atas tile Midnight Navy radius
          11/48 ≈ 23% — <em>fondasi yang stabil</em>. Hukum warna trilogi:{" "}
          <span className="text-[var(--gn-amber-400)]">gelap yang bermartabat, terang yang bermakna.</span>
        </p>
      </section>

      {/* Papan identitas (via API gated) */}
      <section aria-labelledby="judul-papan" className="rounded-3xl border border-[#1b3455] bg-[#0a1628] p-7 sm:p-9">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 id="judul-papan" className="font-display text-xl font-bold">
            Papan Identitas Resmi
          </h2>
          <a
            href="/api/internal/dokumen/papan-identitas"
            className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[#1b3455] px-4 py-2 font-mono text-[11px] font-semibold text-[var(--gn-amber-400)] transition-colors hover:border-[var(--gn-amber-500)]"
          >
            <Download className="h-3.5 w-3.5" aria-hidden />
            UNDUH PNG
          </a>
        </div>
        <img
          src="/api/internal/dokumen/papan-identitas"
          alt="Papan sistem identitas trilogi Gunara — tiga logo pada kartu gelap dan terang"
          className="mt-6 w-full rounded-2xl border border-[#1b3455]"
          loading="lazy"
        />
      </section>

      {/* Detail tiga logo */}
      {TRILILOGI.map((t) => (
        <section
          key={t.nama}
          aria-labelledby={`judul-${t.nama}`}
          className="rounded-3xl border border-[#1b3455] bg-[#0a1628] p-7 sm:p-9"
        >
          <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
            <div className="flex flex-col items-center gap-4">
              <div className="flex h-40 w-40 items-center justify-center rounded-3xl border border-[#1b3455] bg-[#060d1f] p-6">
                <img src={t.img} alt={`Mark ${t.nama}`} className="h-full w-full" />
              </div>
              <a
                href={t.img}
                download
                className="inline-flex min-h-9 items-center gap-2 rounded-full border border-[#1b3455] px-4 py-2 font-mono text-[10px] font-semibold text-[#a9bcd6] transition-colors hover:border-[var(--gn-amber-500)] hover:text-[var(--gn-amber-400)]"
              >
                <Download className="h-3 w-3" aria-hidden />
                MARK SVG
              </a>
            </div>
            <div>
              <p className="font-mono text-[10px] font-bold tracking-[0.22em] text-[var(--gn-amber-400)]">
                {t.julukan.toUpperCase()}
              </p>
              <h2 id={`judul-${t.nama}`} className="mt-1.5 font-display text-2xl font-bold">
                {t.nama}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-[#a9bcd6]">{t.cerita}</p>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-[#1b3455] bg-[#060d1f] p-5">
                  <p className="flex items-center gap-2 font-mono text-[10px] font-bold tracking-[0.2em] text-[var(--gn-amber-400)]">
                    <Ruler className="h-3.5 w-3.5" aria-hidden />
                    GRID KONSTRUKSI 48×48
                  </p>
                  <ul className="mt-3 space-y-1.5 font-mono text-[11px] leading-relaxed text-[#a9bcd6]">
                    {t.grid.map((g) => (
                      <li key={g}>· {g}</li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl border border-[#1b3455] bg-[#060d1f] p-5">
                  <p className="font-mono text-[10px] font-bold tracking-[0.2em] text-[var(--gn-amber-400)]">
                    BINTANG GUNARA
                  </p>
                  <p className="mt-3 text-xs leading-relaxed text-[#a9bcd6]">
                    Posisi: <strong className="text-[#e6eef8]">{t.star}</strong>
                    <br />
                    Peran: {t.peranBintang}
                  </p>
                  <p className="mt-3 text-xs leading-relaxed text-[#a9bcd6]">
                    <span className="font-mono text-[10px] font-bold tracking-[0.16em] text-[#5c87b8]">
                      PEMAKAIAN UTAMA:
                    </span>
                    <br />
                    {t.pakai}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Sistem warna & token lengkap (BrandSystem dipindah dari situs publik) */}
      <BrandSystem />

      {/* Ralat pemakaian */}
      <section aria-labelledby="judul-rulum" className="rounded-3xl border border-[#1b3455] bg-[#0a1628] p-7 sm:p-9">
        <h2 id="judul-rulum" className="font-display text-xl font-bold">
          Ruang Bersih &amp; Ukuran Minimum
        </h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          {RULUM.map((r) => (
            <div key={r.h} className="rounded-2xl border border-[#1b3455] bg-[#060d1f] p-5">
              <p className="font-mono text-[10px] font-bold tracking-[0.2em] text-[var(--gn-amber-400)]">
                {r.h.toUpperCase()}
              </p>
              <p className="mt-2.5 text-xs leading-relaxed text-[#a9bcd6]">{r.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Hukum larangan */}
      <section aria-labelledby="judul-larangan" className="rounded-3xl border border-red-500/30 bg-red-500/5 p-7 sm:p-9">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-red-500/40 bg-red-500/10 text-red-300">
            <Ban className="h-5 w-5" aria-hidden />
          </span>
          <h2 id="judul-larangan" className="font-display text-xl font-bold">
            Hukum Larangan — 8 Hal yang Dilarang Keras
          </h2>
        </div>
        <ol className="mt-5 grid gap-2.5 sm:grid-cols-2">
          {LARANGAN.map((l, i) => (
            <li key={l} className="flex items-start gap-3 rounded-xl border border-[#1b3455] bg-[#060d1f] p-4 text-sm leading-relaxed text-[#a9bcd6]">
              <span className="font-mono text-xs font-bold text-red-300">
                {String(i + 1).padStart(2, "0")}
              </span>
              Dilarang {l}
            </li>
          ))}
        </ol>
      </section>

      {/* Inventaris berkas */}
      <section aria-labelledby="judul-inventaris" className="rounded-3xl border border-[#1b3455] bg-[#0a1628] p-7 sm:p-9">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#1b3455] bg-[#060d1f] text-[var(--gn-amber-400)]">
            <FolderTree className="h-5 w-5" aria-hidden />
          </span>
          <h2 id="judul-inventaris" className="font-display text-xl font-bold">
            Inventaris Berkas Resmi
          </h2>
        </div>
        <div className="mt-5 space-y-3">
          {INVENTARIS.map((i) => (
            <div key={i.dir} className="rounded-2xl border border-[#1b3455] bg-[#060d1f] p-5">
              <p className="font-mono text-xs font-bold text-[var(--gn-amber-400)]">{i.dir}</p>
              <p className="mt-1.5 font-mono text-[11px] leading-relaxed text-[#a9bcd6]">{i.files}</p>
            </div>
          ))}
        </div>
        <p className="mt-5 text-xs leading-relaxed text-[#a9bcd6]">
          <strong className="text-[#e6eef8]">Sumber tunggal kebenaran:</strong> seluruh berkas
          diregenerasi dari <code className="rounded bg-black/40 px-1.5 py-0.5 font-mono">scripts/build_logos.py</code>{" "}
          — semua teks di-outline (HarfBuzz + fontTools) sehingga identitas tidak pernah rusak
          meskipun font tidak terpasang di sistem tujuan. Dokumen ratifikasi lengkap tersedia
          sebagai{" "}
          <a
            href="/api/internal/dokumen/identitas-logo"
            className="inline-flex items-center gap-1 font-mono text-[11px] font-semibold text-[var(--gn-amber-400)] underline decoration-[var(--gn-amber-500)]/40 underline-offset-4 hover:decoration-[var(--gn-amber-500)]"
          >
            IDENTITAS-LOGO.md <Download className="h-3 w-3" aria-hidden />
          </a>
          .
        </p>
      </section>
    </div>
  );
}
