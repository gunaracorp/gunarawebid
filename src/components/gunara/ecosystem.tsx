import { ExternalLink, Landmark, BriefcaseBusiness, GaugeCircle, Globe, Radar, Store, BadgeCheck } from "lucide-react";
import { SectionHeading } from "@/components/gunara/section-heading";
import { Reveal } from "@/components/gunara/reveal";

const ECOSYSTEM = [
  {
    href: "https://www.digiman.id/gunara-os",
    domain: "digiman.id",
    nama: "Gunara OS",
    peran: "Etalase Produk · Sistem Operasi Perusahaan",
    desc: "165 dokumen siap pakai dalam 20 domain kepemimpinan, tier P0–P3, dari Gunara OS Core (39 dokumen) hingga Super Organisasi (165 dokumen).",
    status: "Aktif",
    statusTone: "live" as const,
    icon: Store,
    tag: "Produk",
  },
  {
    href: "https://www.gconsultant.web.id",
    domain: "gconsultant.web.id",
    nama: "GConsultant",
    peran: "Konsultasi · The Polymathic Problem Solver",
    desc: "Rumah metodologi UMEA™ — Hukum Minimum Usaha™: asesmen organisasi, struktur fungsi kritis, dan arsitektur dokumentasi D-10 hingga D-165.",
    status: "Aktif",
    statusTone: "live" as const,
    icon: BriefcaseBusiness,
    tag: "Jasa",
  },
  {
    href: "https://muhdin.id",
    domain: "muhdin.id",
    nama: "MUHDIN Indonesia",
    peran: "Kelembagaan · Sekretaris Jenderal",
    desc: "Masyarakat Umroh Haji Digital Indonesia — satu ekosistem, satu data, satu standar, satu trust: konektivitas, verifikasi, kolaborasi, integrasi.",
    status: "Aktif",
    statusTone: "live" as const,
    icon: Landmark,
    tag: "Organisasi",
  },
  {
    href: "https://www.pusatperizinan.com",
    domain: "pusatperizinan.com",
    nama: "Pusat Perizinan",
    peran: "Pintu Masuk Kepatuhan Usaha",
    desc: "Kanal perizinan dan kepatuhan usaha — diarahkan menjadi gerbang pertama sebelum organisasi naik ke arsitektur UMEA™.",
    status: "Pembangunan",
    statusTone: "wip" as const,
    icon: GaugeCircle,
    tag: "Aset Digital",
  },
  {
    href: "#ekosistem",
    domain: "juraganwebsite.web.id",
    nama: "Juragan Website",
    peran: "Pabrik Website · Universal Web OS",
    desc: "Instansiasi UWA-7 untuk pasar web: satu master template, banyak brand. Siap masuk jalur pabrik website Gunara.",
    status: "Pembangunan",
    statusTone: "wip" as const,
    icon: Globe,
    tag: "Aset Digital",
  },
  {
    href: "#ekosistem",
    domain: "topmanajemen.biz.id",
    nama: "Top Manajemen",
    peran: "Kanal Pelatihan & Eksekutif",
    desc: "Kanal untuk pelatihan manajemen dan kepemimpinan — diarahkan menjadi laboratorium eksekusi doktrin UMEA™.",
    status: "Pembangunan",
    statusTone: "wip" as const,
    icon: Radar,
    tag: "Aset Digital",
  },
];

export function Ecosystem() {
  return (
    <section
      id="ekosistem"
      aria-labelledby="judul-ekosistem"
      className="anchor-offset bg-background py-24 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="judul-ekosistem"
          kicker="Ekosistem · Peta Kendali"
          title="Satu Otak, Banyak Organ"
          description="gunara.web.id adalah pusat kendali. Setiap domain adalah organ dengan satu fungsi spesifik — dibangun di atas infrastruktur bersama, tanpa duplikasi."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ECOSYSTEM.map((e, i) => (
            <Reveal key={e.domain} delay={(i % 3) * 0.08}>
              <a
                href={e.href}
                {...(e.href.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--gn-amber-500)]/60 hover:shadow-xl hover:shadow-amber-500/5"
                aria-label={`${e.nama} (${e.domain}) — ${e.peran}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-[var(--gn-amber-700)] transition-colors group-hover:bg-[var(--gn-amber-500)] group-hover:text-[var(--gn-navy-900)] dark:text-[var(--gn-amber-400)]">
                    <e.icon className="h-5 w-5" aria-hidden />
                  </span>
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[10px] font-semibold tracking-[0.12em] ${
                      e.statusTone === "live"
                        ? "bg-accent text-accent-foreground"
                        : "border border-border bg-secondary text-muted-foreground"
                    }`}
                  >
                    {e.statusTone === "live" ? (
                      <BadgeCheck className="h-3 w-3" aria-hidden />
                    ) : null}
                    {e.status.toUpperCase()}
                  </span>
                </div>

                <h3 className="mt-5 font-display text-xl font-bold">{e.nama}</h3>
                <p className="mt-1 font-mono text-[11px] tracking-[0.08em] text-muted-foreground">
                  {e.domain}
                </p>
                <p className="mt-3 text-sm font-medium text-[var(--gn-amber-700)] dark:text-[var(--gn-amber-400)]">
                  {e.peran}
                </p>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{e.desc}</p>

                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-foreground/80 transition-colors group-hover:text-[var(--gn-amber-700)] dark:group-hover:text-[var(--gn-amber-400)]">
                  {e.href.startsWith("http") ? (
                    <>
                      Kunjungi
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                    </>
                  ) : (
                    "Menyusul di peta kendali"
                  )}
                </span>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15} className="mt-10">
          <p className="mx-auto max-w-2xl rounded-2xl border border-dashed border-border bg-secondary/50 px-6 py-5 text-center text-sm leading-relaxed text-muted-foreground">
            Prinsip arsitektur ekosistem: <strong className="text-foreground">setiap domain satu
            identitas entitas</strong> — brand, konten, logika bisnis, dan SEO-nya sendiri — tetapi
            berbagi satu infrastruktur yang sama. Bukan banyak website, melainkan satu peradaban
            dengan banyak pintu.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
