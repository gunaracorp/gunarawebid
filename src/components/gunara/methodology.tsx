"use client";

import {
  Anchor,
  ArrowRightLeft,
  Binary,
  Building2,
  Compass,
  Cpu,
  Eye,
  FileStack,
  Gauge,
  HandHeart,
  Hourglass,
  Landmark,
  Layers,
  Link,
  Lock,
  Megaphone,
  Palette,
  Repeat,
  Search,
  Server,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Users,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SectionHeading } from "@/components/gunara/section-heading";
import { Reveal } from "@/components/gunara/reveal";
import { UmeaBlueprint } from "@/components/gunara/illustrations/umea-blueprint";
import { GdosBlueprint } from "@/components/gunara/illustrations/gdos-blueprint";
import { Uwa7Blueprint } from "@/components/gunara/illustrations/uwa7-blueprint";

/* ------------------------------ UMEA ------------------------------ */

const HUKUM_BESAR = [
  {
    icon: Compass,
    title: "Hukum Cakupan Fungsional",
    body: "Setiap fungsi kritis wajib memiliki penanggung jawab yang jelas. Tidak ada fungsi yang diam-diam kehilangan pemiliknya.",
  },
  {
    icon: ArrowRightLeft,
    title: "Hukum Pemisahan Konflik Kritis",
    body: "Satu orang tidak boleh mengendalikan fungsi yang saling bertentangan — misalnya penjaga uang sekaligus pencatatnya.",
  },
  {
    icon: Repeat,
    title: "Hukum Kontinuitas",
    body: "Tidak ada fungsi kritis yang boleh bergantung permanen pada satu individu. Hilang satu orang, roda tidak berhenti.",
  },
];

const TINGKAT_ORG = [
  { kode: "UMEA-03", nama: "Sel Survival", analogi: "Gerobak makanan" },
  { kode: "UMEA-05", nama: "Sel Peluncuran", analogi: "Warung keluarga" },
  { kode: "UMEA-07", nama: "Organisasi Inti", analogi: "Bengkel hidup" },
  { kode: "UMEA-10", nama: "Organisasi Operasional", analogi: "Kapal kerja" },
  { kode: "UMEA-15", nama: "Organisasi Skala", analogi: "Armada niaga" },
  { kode: "UMEA-21", nama: "Organisasi Tangguh", analogi: "Resilient enterprise" },
];

const TINGKAT_DOK = [
  { kode: "D-10", nama: "Minimum Launch Pack" },
  { kode: "D-21", nama: "Professional Foundation" },
  { kode: "D-39", nama: "International Scale" },
  { kode: "D-75", nama: "Enterprise Architecture" },
  { kode: "D-165", nama: "Institutional Architecture" },
];

const FUNGSI_KRITIS = [
  "Direction",
  "Value Creation",
  "Market",
  "Control",
  "People",
  "Intelligence",
  "Resilience",
];

function UmeaPanel() {
  return (
    <div className="space-y-8">
      <UmeaBlueprint />
      <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        <h3 className="font-display text-xl font-bold">
          3 Hukum Besar{" "}
          <span className="ml-1 align-middle rounded-full bg-accent px-2.5 py-0.5 font-mono text-[10px] font-semibold tracking-[0.14em] text-accent-foreground">
            HUKUM MINIMUM USAHA
          </span>
        </h3>
        {HUKUM_BESAR.map((h) => (
          <div
            key={h.title}
            className="flex gap-4 rounded-2xl border border-border bg-card p-5"
          >
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-[var(--gn-amber-700)] dark:text-[var(--gn-amber-400)]">
              <h.icon className="h-5 w-5" aria-hidden />
            </span>
            <div>
              <p className="font-semibold">{h.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{h.body}</p>
            </div>
          </div>
        ))}
        <div className="rounded-2xl border border-border bg-card p-5">
          <p className="font-semibold">21 Fungsi Kritis · 7 Kategori</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {FUNGSI_KRITIS.map((f) => (
              <span
                key={f}
                className="rounded-full border border-border bg-secondary px-3 py-1 font-mono text-[11px] text-muted-foreground"
              >
                {f}
              </span>
            ))}
          </div>
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
            Organisasi dinilai dari banyaknya fungsi kritis yang tetap hidup — bukan dari jumlah
            orang. <em>Function-first, bukan title-first.</em>
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-display text-xl font-bold">6 Tingkat Organisasi</h3>
        <ol className="space-y-2">
          {TINGKAT_ORG.map((t, i) => (
            <li
              key={t.kode}
              className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3"
            >
              <span
                className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-mono text-[11px] font-bold text-[var(--gn-navy-900)]"
                style={{
                  backgroundColor: `color-mix(in srgb, var(--gn-amber-500) ${45 + i * 11}%, var(--gn-amber-tint))`,
                }}
                aria-hidden
              >
                {t.kode.replace("UMEA-", "")}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold">{t.kode} — {t.nama}</span>
                <span className="block text-xs text-muted-foreground">Analogi: {t.analogi}</span>
              </span>
            </li>
          ))}
        </ol>

        <h3 className="pt-2 font-display text-xl font-bold">5 Tingkat Dokumentasi</h3>
        <div className="rounded-2xl border border-border bg-card p-5">
          <ul className="space-y-2.5">
            {TINGKAT_DOK.map((d, i) => (
              <li key={d.kode} className="flex items-center gap-3">
                <FileStack className="h-4 w-4 shrink-0 text-[var(--gn-amber-600)] dark:text-[var(--gn-amber-400)]" aria-hidden />
                <span className="font-mono text-xs font-bold text-[var(--gn-amber-700)] dark:text-[var(--gn-amber-400)]">
                  {d.kode}
                </span>
                <span className="text-sm text-muted-foreground">{d.nama}</span>
                {i === TINGKAT_DOK.length - 1 ? (
                  <span className="ml-auto rounded-full bg-[var(--gn-amber-500)] px-2 py-0.5 font-mono text-[9px] font-bold text-[var(--gn-navy-900)]">
                    GUNARA OS
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
          <p className="mt-4 border-t border-border pt-3 text-xs leading-relaxed text-muted-foreground">
            <Gauge className="mr-1 inline h-3.5 w-3.5" aria-hidden />
            <strong className="text-foreground">UMEA Maturity Index™</strong>: skor 0–100 dengan 8
            band kematangan organisasi.
          </p>
        </div>
      </div>
      </div>
    </div>
  );
}

/* ------------------------------ G-DOS ------------------------------ */

const GDOS_STACK = [
  { icon: Cpu, nama: "Notion", peran: "Brain / Knowledge OS", warna: "otak" },
  { icon: Sparkles, nama: "ClickUp", peran: "Execution Engine", warna: "mesin" },
  { icon: FileStack, nama: "Google Drive", peran: "Memory / File Vault", warna: "arsip" },
  { icon: Binary, nama: "GitHub", peran: "Source of Truth untuk kode", warna: "kode" },
  { icon: Lock, nama: "1Password", peran: "Credential Vault", warna: "kunci" },
  { icon: ShieldCheck, nama: "Cloudflare", peran: "Internet Edge & DNS", warna: "benteng" },
  { icon: Server, nama: "Vercel", peran: "Deployment Engine", warna: "peluncur" },
  { icon: Layers, nama: "Supabase", peran: "Data / Backend Engine", warna: "data" },
  { icon: Link, nama: "Apps Script", peran: "Google Automation Layer", warna: "otomasi" },
  { icon: Eye, nama: "Sentry + Analytics", peran: "Observability", warna: "mata" },
];

function GdosPanel() {
  return (
    <div className="space-y-8">
      <GdosBlueprint />
      <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
      <div>
        <h3 className="font-display text-xl font-bold">Dua DNA yang Saling Mengunci</h3>
        <div className="mt-4 space-y-3">
          <div className="rounded-2xl border border-[var(--gn-amber-500)]/40 bg-card p-5">
            <p className="font-mono text-[10px] tracking-[0.24em] text-[var(--gn-amber-700)] dark:text-[var(--gn-amber-400)]">
              DNA-01 · LIFE / BUSINESS OS
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Sistem untuk kehidupan, pengetahuan, proyek, dokumen, komunikasi, keputusan, dan
              eksekusi. Setiap informasi mempunyai satu rumah utama.
            </p>
          </div>
          <div className="rounded-2xl border border-[var(--gn-amber-500)]/40 bg-card p-5">
            <p className="font-mono text-[10px] tracking-[0.24em] text-[var(--gn-amber-700)] dark:text-[var(--gn-amber-400)]">
              DNA-02 · UNIVERSAL WEB OS
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Mesin untuk membuat website, SaaS, portal, super app, dan API dengan fondasi yang
              sama — clone DNA, konfigurasi brand, deploy.
            </p>
          </div>
        </div>
        <div className="mt-4 rounded-2xl border border-border bg-secondary/60 p-5">
          <p className="text-sm leading-relaxed">
            <strong>Gugun Command Center</strong> — bukan tempat menyimpan data, melainkan{" "}
            <em>cockpit</em>: prioritas hari ini, bisnis, kerajaan digital, pengetahuan, dan
            kesehatan sistem dalam satu pandangan.
          </p>
        </div>
      </div>

      <div>
        <h3 className="font-display text-xl font-bold">10 Peran dalam Satu Stack</h3>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {GDOS_STACK.map((s) => (
            <li
              key={s.nama}
              className="flex items-center gap-3 rounded-xl border border-border bg-card px-3.5 py-2.5"
            >
              <s.icon className="h-4 w-4 shrink-0 text-[var(--gn-amber-600)] dark:text-[var(--gn-amber-400)]" aria-hidden />
              <span className="min-w-0">
                <span className="block truncate text-sm font-semibold">{s.nama}</span>
                <span className="block truncate text-[11px] text-muted-foreground">{s.peran}</span>
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-4 rounded-xl border border-dashed border-[var(--gn-amber-500)]/50 bg-[var(--gn-amber-tint)]/40 p-4 text-center font-mono text-[11px] tracking-[0.14em] text-[var(--gn-amber-800)] dark:bg-[var(--gn-amber-500)]/5 dark:text-[var(--gn-amber-300)]">
          CONNECT ONLY WHERE VALUE &gt; COMPLEXITY
        </p>
      </div>
      </div>
    </div>
  );
}

/* ------------------------------ UWA-7 ------------------------------ */

const UWA_LAPIS = [
  {
    n: "I",
    icon: Smartphone,
    nama: "Alam Fisik",
    esensi: "Satu kodebase hidup di web, mobile, tablet, desktop, PWA.",
  },
  {
    n: "II",
    icon: Binary,
    nama: "Akal",
    esensi: "Semantic HTML — mesin memahami struktur WHO, WHAT, WHEN, HOW.",
  },
  {
    n: "III",
    icon: Landmark,
    nama: "Ilmu",
    esensi: "Structured data JSON-LD: mengajari mesin makna halaman.",
  },
  {
    n: "IV",
    icon: Search,
    nama: "Penglihatan",
    esensi: "Crawl architecture: sitemap, robots, canonical, URL bersih.",
  },
  {
    n: "V",
    icon: HandHeart,
    nama: "Rahmah",
    esensi: "Manusia yang senang memakainya: cepat, jelas, aksesibel.",
  },
  {
    n: "VI",
    icon: Megaphone,
    nama: "Otoritas",
    esensi: "Kepercayaan: karya orisinal, penulis jelas, entitas nyata.",
  },
  {
    n: "VII",
    icon: Hourglass,
    nama: "Waktu",
    esensi: "Website adalah organisme: ukur, belajar, perbaiki, ulangi.",
  },
];

function Uwa7Panel() {
  return (
    <div className="space-y-8">
      <Uwa7Blueprint />
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <div>
        <h3 className="font-display text-xl font-bold">Tujuh Lapis Satu Arsitektur</h3>
        <ul className="mt-4 space-y-2">
          {UWA_LAPIS.map((l, i) => (
            <li
              key={l.n}
              className="flex items-center gap-4 rounded-xl border border-border bg-card px-4 py-3 transition-colors hover:border-[var(--gn-amber-500)]/50"
            >
              <span className="font-mono text-xs font-bold text-muted-foreground">{l.n}</span>
              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-[var(--gn-amber-700)] dark:text-[var(--gn-amber-400)]">
                <l.icon className="h-4.5 w-4.5" aria-hidden />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold">{l.nama}</span>
                <span className="block text-xs leading-relaxed text-muted-foreground">{l.esensi}</span>
              </span>
              {i === 4 ? (
                <span className="hidden rounded-full bg-accent px-2.5 py-1 font-mono text-[9px] font-semibold tracking-[0.14em] text-accent-foreground sm:inline-block">
                  CWV
                </span>
              ) : null}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-4">
        <blockquote className="rounded-2xl border-l-4 border-[var(--gn-amber-500)] bg-card p-6">
          <p className="font-display text-lg font-semibold leading-relaxed">
            &ldquo;Bangun website yang dipahami manusia, dibaca mesin, dimaknai entitas, ditemukan
            crawler, dipercaya sistem, dicintai pengguna — dan terus berevolusi.&rdquo;
          </p>
          <cite className="mt-3 block font-mono text-[10px] tracking-[0.18em] text-muted-foreground not-italic">
            — UWA-7 · SEARCH-NATIVE DIGITAL ARCHITECTURE
          </cite>
        </blockquote>
        <div className="rounded-2xl border border-border bg-card p-6">
          <p className="font-mono text-[10px] tracking-[0.24em] text-muted-foreground">
            THE UNIFIED WEBSITE EQUATION
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Visibilitas pencarian bukan trik, melainkan hasil kali delapan faktor: aksesibilitas
            teknis × kejelasan semantik × kualitas konten × pengalaman × otoritas × kesegaran ×
            keselarasan intensi × keandalan operasional.
          </p>
        </div>
        <div className="rounded-2xl border border-[var(--gn-amber-500)]/40 bg-card p-6">
          <p className="text-sm leading-relaxed">
            <strong>Website bukan proyek. Website adalah organisme.</strong> Create → Crawl →
            Index → Rank → Measure → Learn → Improve → Repeat.
          </p>
        </div>
      </div>
      </div>
    </div>
  );
}

/* ------------------------------ Wrapper ------------------------------ */

export function Methodology() {
  return (
    <section
      id="metodologi"
      aria-labelledby="judul-metodologi"
      className="anchor-offset relative bg-secondary/40 py-24 sm:py-28 dark:bg-[#060d1f]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="judul-metodologi"
          kicker="Metodologi · Karya Intelektual"
          title="Tiga Doktrin, Satu Fondasi"
          description="Mesin intelektual di balik ekosistem: hukum organisasi yang terukur, sistem operasi digital pribadi, dan arsitektur web tujuh lapis."
        />

        <Reveal className="mt-12">
          <Tabs defaultValue="umea" className="w-full">
            <TabsList className="mx-auto grid h-auto w-full max-w-2xl grid-cols-3 rounded-full border border-border bg-card p-1.5">
              <TabsTrigger
                value="umea"
                className="rounded-full px-2 py-2.5 text-xs font-semibold sm:text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground dark:data-[state=active]:bg-[var(--gn-amber-500)] dark:data-[state=active]:text-[var(--gn-navy-900)]"
              >
                UMEA™ · Hukum Minimum Usaha
              </TabsTrigger>
              <TabsTrigger
                value="gdos"
                className="rounded-full px-2 py-2.5 text-xs font-semibold sm:text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground dark:data-[state=active]:bg-[var(--gn-amber-500)] dark:data-[state=active]:text-[var(--gn-navy-900)]"
              >
                G-DOS · Digital OS
              </TabsTrigger>
              <TabsTrigger
                value="uwa7"
                className="rounded-full px-2 py-2.5 text-xs font-semibold sm:text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground dark:data-[state=active]:bg-[var(--gn-amber-500)] dark:data-[state=active]:text-[var(--gn-navy-900)]"
              >
                UWA-7 · Arsitektur Web
              </TabsTrigger>
            </TabsList>

            <div className="mt-8">
              <TabsContent value="umea">
                <UmeaPanel />
              </TabsContent>
              <TabsContent value="gdos">
                <GdosPanel />
              </TabsContent>
              <TabsContent value="uwa7">
                <Uwa7Panel />
              </TabsContent>
            </div>
          </Tabs>
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-center font-mono text-[10px] tracking-[0.2em] text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <Anchor className="h-3.5 w-3.5" aria-hidden /> STANDAR TERUKUR
            </span>
            <span className="inline-flex items-center gap-2">
              <Building2 className="h-3.5 w-3.5" aria-hidden /> FUNCTION-FIRST
            </span>
            <span className="inline-flex items-center gap-2">
              <Users className="h-3.5 w-3.5" aria-hidden /> UNTUK UMKM HINGGA INSTITUSI
            </span>
            <span className="inline-flex items-center gap-2">
              <Palette className="h-3.5 w-3.5" aria-hidden /> DOKTRIN MILIK GUGUN GUNARA
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
