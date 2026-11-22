import type { Metadata } from "next";
import { PublicShell } from "@/components/gunara/site-footer";
import { Ecosystem } from "@/components/gunara/ecosystem";
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
      <Ecosystem />
      <ContactCta />
    </PublicShell>
  );
}
