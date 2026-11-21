import { ArrowUpRight, Compass, Package } from "lucide-react";
import { Reveal } from "@/components/gunara/reveal";

export function ContactCta() {
  return (
    <section
      id="kontak"
      aria-labelledby="judul-kontak"
      className="anchor-offset relative overflow-hidden bg-[var(--gn-abyss)] py-24 text-[#e6eef8] sm:py-28"
    >
      <div className="bg-blueprint bg-blueprint-fade absolute inset-0" aria-hidden />
      <div className="glow-amber absolute left-1/2 top-1/2 h-[480px] w-[720px] -translate-x-1/2 -translate-y-1/2 opacity-80" aria-hidden />

      <Reveal className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
        <p className="kicker kicker-on-dark">Kontak · Gerbang Kerja Sama</p>
        <h2 id="judul-kontak" className="mt-4 text-3xl font-bold leading-tight sm:text-5xl">
          Mulai dari <span className="text-gradient-amber">arsitektur</span>, bukan tebakan.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[#a9bcd6] sm:text-lg">
          Pengecekan organisasi lewat metodologi UMEA™, penguasaan sistem lewat Gunara OS, atau
          pembangunan ekosistem digital lewat arsitektur UWA-7 — pintunya selalu sama: satu
          percakapan yang tepat.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://www.gconsultant.web.id"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-13 min-h-12 items-center gap-2 rounded-full bg-[var(--gn-amber-500)] px-8 py-3.5 text-sm font-bold text-[var(--gn-navy-900)] shadow-xl shadow-amber-500/25 transition-transform hover:scale-[1.03]"
          >
            <Compass className="h-4 w-4" aria-hidden />
            Konsultasi via GConsultant
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </a>
          <a
            href="https://www.digiman.id/gunara-os"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center gap-2 rounded-full border border-[#254872] bg-[#0a1628]/60 px-8 py-3.5 text-sm font-semibold text-[#e6eef8] transition-colors hover:border-[var(--gn-amber-500)] hover:text-[#fbbf24]"
          >
            <Package className="h-4 w-4" aria-hidden />
            Dapatkan Gunara OS
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </a>
        </div>

        <p className="mt-8 font-mono text-[11px] leading-relaxed tracking-[0.14em] text-[#5c87b8]">
          KANAL RESMI: GCONSULTANT.WEB.ID · DIGIMAN.ID · PUSATPERIZINAN.COM · MUHDIN.ID
        </p>
      </Reveal>
    </section>
  );
}
