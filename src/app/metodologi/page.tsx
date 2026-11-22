import type { Metadata } from "next";
import { PublicShell } from "@/components/gunara/site-footer";
import { Methodology } from "@/components/gunara/methodology";
import { ContactCta } from "@/components/gunara/contact-cta";

export const metadata: Metadata = {
  title: "Metodologi — UMEA™ · G-DOS · UWA-7",
  description:
    "Tiga metodologi proprietary Gunara: UMEA™ — Hukum Minimum Usaha™ untuk kematangan organisasi, G-DOS sistem operasi digital dengan 165 dokumen arsitektur, dan UWA-7 arsitektur web tujuh lapis.",
  alternates: { canonical: "/metodologi" },
};

export default function MetodologiPage() {
  return (
    <PublicShell>
      <Methodology />
      <ContactCta />
    </PublicShell>
  );
}
