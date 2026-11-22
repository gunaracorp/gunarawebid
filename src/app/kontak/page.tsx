import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { PublicShell } from "@/components/gunara/site-footer";
import { ContactCta } from "@/components/gunara/contact-cta";
import { ContactForm } from "@/components/gunara/contact-form";
import { Reveal } from "@/components/gunara/reveal";
import { OPERATOR } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Kontak — Mulai dari Arsitektur, Bukan Tebakan",
  description:
    "Gerbang kerja sama Gunara: kirim ringkasan kebutuhan organisasi Anda — asesmen UMEA™, implementasi G-DOS, arsitektur web UWA-7, atau kepatuhan usaha. Satu percakapan yang tepat.",
  alternates: { canonical: "/kontak" },
};

const KANAL = [
  {
    icon: Mail,
    label: "Email Resmi",
    nilai: OPERATOR.email,
    href: `mailto:${OPERATOR.email}`,
    catatan: "Kanal utama — terlampir pada dokumen legal perusahaan.",
  },
  {
    icon: Phone,
    label: "Telepon / WhatsApp",
    nilai: OPERATOR.teleponTampil,
    href: "tel:+6281234514669",
    catatan: "Untuk urusan yang perlu dibicarakan langsung.",
  },
  {
    icon: MapPin,
    label: "Basis Kantor",
    nilai: "Jakarta Selatan, DKI Jakarta",
    href: undefined,
    catatan: "Kunjungan kantor dengan perjanjian terlebih dahulu.",
  },
  {
    icon: Clock,
    label: "Waktu Respons",
    nilai: "1×24 jam kerja",
    href: undefined,
    catatan: "Setiap pesan masuk terekam di sistem dan ditindaklanjuti berurutan.",
  },
];

export default function KontakPage() {
  return (
    <PublicShell>
      <ContactCta />

      {/* Kanal resmi */}
      <section
        aria-labelledby="judul-kanal"
        className="border-b border-border bg-secondary/40 py-20 sm:py-24 dark:bg-[#0a1628]"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="kicker">Kanal Resmi</p>
            <h2
              id="judul-kanal"
              className="mt-3 max-w-2xl font-display text-2xl font-bold sm:text-3xl"
            >
              Satu pintu, tertata — tanpa kabur di tengah jalan.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Semua komunikasi berjalan lewat kanal resmi di bawah ini, agar setiap pesan Anda
              punya jejak, pemilik, dan garis waktu penanganan yang jelas.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {KANAL.map((k, i) => (
              <Reveal key={k.label} delay={i * 0.06}>
                <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-6">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-[var(--gn-amber-700)] dark:text-[var(--gn-amber-400)]">
                    <k.icon className="h-5 w-5" aria-hidden />
                  </span>
                  <p className="mt-4 font-mono text-[10px] font-bold tracking-[0.2em] text-muted-foreground">
                    {k.label.toUpperCase()}
                  </p>
                  {k.href ? (
                    <a
                      href={k.href}
                      className="mt-1.5 break-all text-base font-bold transition-colors hover:text-[var(--gn-amber-700)] dark:hover:text-[var(--gn-amber-400)]"
                    >
                      {k.nilai}
                    </a>
                  ) : (
                    <p className="mt-1.5 text-base font-bold">{k.nilai}</p>
                  )}
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{k.catatan}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.15} className="mt-8">
            <p className="flex items-start gap-3 rounded-2xl border border-dashed border-border bg-card px-5 py-4 text-sm leading-relaxed text-muted-foreground">
              <ShieldCheck
                className="mt-0.5 h-4 w-4 shrink-0 text-[var(--gn-amber-600)] dark:text-[var(--gn-amber-400)]"
                aria-hidden
              />
              <span>
                <strong className="text-foreground">Waspadai penipuan.</strong> Kami tidak pernah
                meminta data sensitif (password, kartu, OTP) melalui pesan. Seluruh kerja sama
                resmi dituangkan tertulis dan berpayung badan hukum yang terdaftar.
              </span>
            </p>
          </Reveal>
        </div>
      </section>

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
