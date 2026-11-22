import type { Metadata } from "next";
import { PublicShell } from "@/components/gunara/site-footer";
import { ContactCta } from "@/components/gunara/contact-cta";
import { ContactForm } from "@/components/gunara/contact-form";
import { Reveal } from "@/components/gunara/reveal";

export const metadata: Metadata = {
  title: "Kontak — Mulai dari Arsitektur, Bukan Tebakan",
  description:
    "Gerbang kerja sama Gunara: kirim ringkasan kebutuhan organisasi Anda — asesmen UMEA™, implementasi G-DOS, arsitektur web UWA-7, atau kepatuhan usaha. Satu percakapan yang tepat.",
  alternates: { canonical: "/kontak" },
};

export default function KontakPage() {
  return (
    <PublicShell>
      <ContactCta />

      <section
        aria-labelledby="judul-form"
        className="bg-background py-24 sm:py-28"
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </PublicShell>
  );
}
