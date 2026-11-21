import { BookOpenText, Scale, Link2, Sprout, Mountain } from "lucide-react";
import { SectionHeading } from "@/components/gunara/section-heading";
import { Reveal } from "@/components/gunara/reveal";

const PRINSIP = [
  {
    icon: BookOpenText,
    title: "Single Source of Truth",
    body: "Setiap informasi hanya memiliki satu rumah utama. Pengetahuan di otak, eksekusi di mesin, file di lemari arsip — tidak ada duplikasi yang membusuk.",
    tag: "G-DOS",
  },
  {
    icon: Scale,
    title: "Minimum Necessary Architecture",
    body: "Organisasi diberi hanya kompleksitas yang ia butuhkan. Fungsi kritis yang hidup menentukan kekuatan — bukan jumlah jabatan yang tertulis.",
    tag: "UMEA",
  },
  {
    icon: Link2,
    title: "Value > Complexity",
    body: "Jembatan antar sistem hanya dibangun ketika nilai melebihi kerumitan. Sistem yang terhubung ke segala hal adalah sistem yang sulit dijaga.",
    tag: "G-DOS",
  },
  {
    icon: Sprout,
    title: "Organisme, Bukan Proyek",
    body: "Website dan perusahaan bukan hasil jadi yang dibuang setelah dirilis. Ia organisme yang menerima masukan, belajar, lalu berevolusi.",
    tag: "UWA-7",
  },
];

const LAPIS_TUJUH = [
  { n: "01", id: "Existence", idn: "Keberadaan", q: "Apa yang dibangun?" },
  { n: "02", id: "Identity", idn: "Identitas", q: "Siapa kita?" },
  { n: "03", id: "Meaning", idn: "Makna", q: "Mengapa ia ada?" },
  { n: "04", id: "Structure", idn: "Struktur", q: "Bagaimana semua saling terhubung?" },
  { n: "05", id: "Execution", idn: "Eksekusi", q: "Bagaimana pekerjaan berjalan?" },
  { n: "06", id: "Intelligence", idn: "Kecerdasan", q: "Bagaimana sistem belajar?" },
  { n: "07", id: "Evolution", idn: "Evolusi", q: "Bagaimana ia hidup puluhan tahun?" },
];

export function Philosophy() {
  return (
    <section
      id="filosofi"
      aria-labelledby="judul-filosofi"
      className="anchor-offset relative bg-background py-24 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="judul-filosofi"
          kicker="Filosofi · Brand DNA"
          title="Sistem Sebelum Karya"
          description="Empat prinsip yang mengunci seluruh ekosistem Gunara. Setiap domain, dokumen, dan website yang lahir dari sini mewarisi konstitusi yang sama."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PRINSIP.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <article className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--gn-amber-500)]/60 hover:shadow-xl hover:shadow-amber-500/5">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-[var(--gn-amber-700)] transition-colors group-hover:bg-[var(--gn-amber-500)] group-hover:text-[var(--gn-navy-900)] dark:text-[var(--gn-amber-400)]">
                  <p.icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="mt-5 text-lg font-bold leading-snug">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
                <span className="mt-5 inline-block rounded-full bg-accent px-3 py-1 font-mono text-[10px] font-semibold tracking-[0.18em] text-accent-foreground">
                  {p.tag}
                </span>
              </article>
            </Reveal>
          ))}
        </div>

        {/* 7 Lapis Peradaban Digital */}
        <Reveal className="mt-16" delay={0.1}>
          <div className="rounded-3xl border border-border bg-card p-8 sm:p-10">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--gn-navy-900)] text-[var(--gn-amber-400)] dark:bg-[var(--gn-amber-500)] dark:text-[var(--gn-navy-900)]">
                  <Mountain className="h-6 w-6" aria-hidden />
                </span>
                <div>
                  <h3 className="text-xl font-bold">7 Lapis Peradaban Digital</h3>
                  <p className="text-sm text-muted-foreground">
                    Kerangka G-DOS yang berlaku untuk pribadi, bisnis, website, hingga peradaban.
                  </p>
                </div>
              </div>
              <span className="kicker">Doktrin Inti</span>
            </div>

            <ol className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {LAPIS_TUJUH.map((l) => (
                <li
                  key={l.n}
                  className="rounded-xl border border-border bg-secondary/40 p-4 transition-colors hover:border-[var(--gn-amber-500)]/50"
                >
                  <div className="flex items-baseline justify-between">
                    <span className="font-mono text-xs font-bold text-[var(--gn-amber-700)] dark:text-[var(--gn-amber-400)]">
                      LAPIS {l.n}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                      {l.id}
                    </span>
                  </div>
                  <p className="mt-2 font-display text-base font-semibold">{l.idn}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{l.q}</p>
                </li>
              ))}
              <li className="flex items-center justify-center rounded-xl border border-dashed border-[var(--gn-amber-500)]/40 bg-[var(--gn-amber-tint)]/50 p-4 text-center dark:bg-[var(--gn-amber-500)]/5">
                <p className="text-xs font-medium leading-relaxed text-[var(--gn-amber-800)] dark:text-[var(--gn-amber-300)]">
                  Berlaku untuk: pribadi, bisnis, website, holding, ekosistem.
                </p>
              </li>
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
