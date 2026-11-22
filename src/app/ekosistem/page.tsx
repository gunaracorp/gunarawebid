import type { Metadata } from "next";
import { PublicShell } from "@/components/gunara/site-footer";
import { Ecosystem } from "@/components/gunara/ecosystem";
import { EcosystemOrbit } from "@/components/gunara/illustrations/orbit-ekosistem";
import { ContactCta } from "@/components/gunara/contact-cta";

export const metadata: Metadata = {
  title: "Ekosistem — Satu Otak, Banyak Organ",
  description:
    "Peta kendali ekosistem digital Gunara: digiman.id (Gunara OS), GConsultant (UMEA™), MUHDIN Indonesia, Pusat Perizinan, Juragan Website, dan Top Manajemen — satu infrastruktur bersama, tanpa duplikasi.",
  alternates: { canonical: "/ekosistem" },
};

export default function EkosistemPage() {
  return (
    <PublicShell>
      {/* Peta orbit — ilustrasi arsitektur ekosistem */}
      <section
        aria-labelledby="judul-orbit"
        className="anchor-offset bg-background py-24 sm:py-28"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p
            id="judul-orbit"
            className="text-center font-mono text-[11px] font-bold tracking-[0.24em] text-[var(--gn-amber-700)] dark:text-[var(--gn-amber-400)]"
          >
            ARSITEKTUR EKOSISTEM · SATU PANDANGAN
          </p>
          <h2 className="mt-3 text-center font-display text-3xl font-bold sm:text-4xl">
            Sebelas Organ, Satu Peta Orbit
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-base leading-relaxed text-muted-foreground">
            Seluruh ekosistem dalam satu bidang pandang: tiga organ aktif mengorbit dekat pusat
            kendali, delapan organ menyusul pada cincin pembangunan — semuanya di atas satu
            infrastruktur yang sama.
          </p>
          <div className="mt-12">
            <EcosystemOrbit />
          </div>
        </div>
      </section>

      <Ecosystem />
      <ContactCta />
    </PublicShell>
  );
}
