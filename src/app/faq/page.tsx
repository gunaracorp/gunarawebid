import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, HelpCircle, MessageCircleQuestion } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PublicShell } from "@/components/gunara/site-footer";
import { SectionHeading } from "@/components/gunara/section-heading";
import { Reveal } from "@/components/gunara/reveal";
import { OPERATOR } from "@/lib/legal";

export const metadata: Metadata = {
  title: "FAQ — Pertanyaan yang Sering Diajukan",
  description:
    "Jawaban atas pertanyaan paling sering diajukan tentang kerja sama dengan Gunara: proses, biaya, waktu, kepemilikan hasil kerja, keamanan data, hingga kerja sama internasional.",
  alternates: { canonical: "/faq" },
};

const FAQ = [
  {
    q: "Apa itu gunara.web.id?",
    a: "gunara.web.id adalah pusat kendali ekosistem digital Gugun Gunara — arsitek di balik Gunara OS, metodologi UMEA™ (Hukum Minimum Usaha™), G-DOS, dan UWA-7. Situs ini adalah gerbang publik untuk memahami metodologi, layanan, dan jaringan aset digital di bawah satu arsitektur yang sama, sebelum Anda memilih pintu masuk kerja sama.",
  },
  {
    q: "Bagaimana cara memulai kerja sama?",
    a: "Semua jalur dimulai dari satu percakapan: kirimkan ringkasan kebutuhan Anda melalui halaman Kontak. Kami balas dengan jadwal sesi pemetaan (asesmen) untuk menetapkan titik awal yang objektif, lalu menyusun arsitektur dan penawaran tertulis. Eksekusi baru dimulai setelah struktur disepakati — bukan sebaliknya.",
  },
  {
    q: "Berapa biayanya?",
    a: "Biaya ditetapkan setelah pemetaan, bukan sebelumnya — karena kami hanya memberikan kompleksitas yang Anda butuhkan. Asesmen awal, lingkup kerja, dan harga dituangkan dalam penawaran tertulis sebelum pekerjaan dimulai, sehingga tidak ada biaya kejut di tengah jalan.",
  },
  {
    q: "Berapa lama pengerjaannya?",
    a: "Tergantung titik awal dan tingkat kematangan organisasi Anda. Implementasi paket minimum (D-10 — Minimum Launch Pack) berbeda kebutuhan waktunya dengan arsitektur institusional penuh (D-165 dalam 20 domain kepemimpinan). Jadwal realistis selalu disertakan dalam penawaran, beserta milestone yang bisa diuji.",
  },
  {
    q: "Apakah Anda melayani klien di luar Indonesia?",
    a: "Ya. Kerja sama kami bersifat remote-first dengan dokumentasi tertulis yang kuat — infrastruktur yang sama untuk klien di mana pun. Komunikasi dapat berjalan dalam Bahasa Indonesia maupun Inggris, dan seluruh deliverable dituangkan dalam format standar internasional.",
  },
  {
    q: "Siapa pemilik hasil kerja (deliverable)?",
    a: "Setelah seluruh kewajiban pembayaran ditepati, deliverable spesifik yang dibuat untuk Anda — situs, desain, dokumen organisasi Anda — menjadi milik Anda sepenuhnya untuk dijalankan dan dikembangkan. Metodologi proprietary kami (UMEA™, G-DOS, UWA-7) tetap menjadi milik kami dengan hak pakai bagi Anda, bukan untuk dijual kembali.",
  },
  {
    q: "Bagaimana keamanan data dan dokumen saya dijaga?",
    a: "Prinsip kami: struktur sebelum karya, termasuk soal keamanan. Dokumen internal dan legal tersimpan terpisah dari repo publik, tidak pernah berada di jalur publik situs, dan hanya dapat diakses melalui jalur terautentikasi dengan pemeriksaan sesi di setiap lapis. Kredensial tidak pernah masuk kode sumber. Rincian tanggung jawab kami tertulis di Kebijakan Privasi.",
  },
  {
    q: "Apa bedanya UMEA™, G-DOS, dan UWA-7?",
    a: "UMEA™ adalah alat ukur dan hukum kematangan organisasi (indeks UMEA-03 hingga UMEA-21). G-DOS adalah sistem operasi digitalnya — enam lapis tumpukan dari Knowledge hingga Control, dipasang lewat paket dokumen D-10 hingga D-165. UWA-7 adalah arsitektur web tujuh lapis yang memastikan situs Anda hidup sebagai organisme yang berevolusi, bukan proyek sekali pakai.",
  },
  {
    q: "Bisakah membeli produknya tanpa layanan konsultasi?",
    a: "Bisa. Paket dokumen Gunara OS tersedia sebagai produk siap pakai melalui digiman.id — untuk organisasi yang sudah siap mengimplementasikan sendiri. Untuk yang ingin didampingi dari asesmen hingga eksekusi, jalur layanan di halaman Layanan yang tepat.",
  },
  {
    q: "Bagaimana kebijakan pembatalan dan pengembalian dana?",
    a: "Kerja sama dapat diakhiri dengan pemberitahuan tertulis sesuai Syarat & Ketentuan. Pengembalian dana berlaku untuk pekerjaan yang belum dieksekusi; deliverable yang telah diserahkan dan biaya pihak ketiga yang sudah dikeluarkan atas nama Anda tetap terhitung. Seluruh hal ini ditetapkan tertulis sebelum pekerjaan dimulai.",
  },
];

/** Lapisan Ilmu (UWA-7): structured data FAQPage untuk hasil pencarian kaya. */
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function FaqPage() {
  return (
    <PublicShell>
      {/* Hero halaman */}
      <section className="relative overflow-hidden bg-[var(--gn-abyss)] pb-16 pt-32 text-[#e6eef8] sm:pb-20 sm:pt-40">
        <div className="bg-blueprint bg-blueprint-fade absolute inset-0" aria-hidden />
        <div className="glow-amber absolute -top-32 right-[-8%] h-[420px] w-[420px]" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="kicker kicker-on-dark">FAQ · Pertanyaan yang Sering Diajukan</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-[1.08] sm:text-5xl">
              Jawaban yang <span className="text-gradient-amber">terstruktur</span>, sebelum Anda
              bertanya dua kali.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#a9bcd6] sm:text-lg">
              Sepuluh pertanyaan yang paling sering masuk — dijawab dengan kejelasan yang sama
              seperti kami menjalankan proyek. Tidak menemukan jawaban Anda? Pintu kontak selalu
              terbuka.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Daftar FAQ */}
      <section aria-labelledby="judul-faq" className="bg-background py-24 sm:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            id="judul-faq"
            kicker="Sepuluh Jawaban Inti"
            title="Hal yang Paling Sering Ditanyakan Klien"
            description="Dari proses kerja, biaya, dan kepemilikan hasil — hingga cara kami menjaga data Anda."
          />
          <Reveal className="mt-12">
            <Accordion type="single" collapsible className="w-full">
              {FAQ.map((f, i) => (
                <AccordionItem key={f.q} value={`faq-${i}`} className="border-border">
                  <AccordionTrigger className="gap-4 py-5 text-left font-display text-base font-bold hover:no-underline sm:text-lg">
                    <span className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-secondary font-mono text-[11px] font-bold text-[var(--gn-amber-700)] dark:text-[var(--gn-amber-400)]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {f.q}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 pl-10 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>

          {/* CTA bawah */}
          <Reveal delay={0.12} className="mt-14">
            <div className="rounded-3xl border border-[var(--gn-amber-500)]/40 bg-[var(--gn-amber-tint)] p-8 text-center dark:bg-[var(--gn-amber-500)]/5">
              <MessageCircleQuestion
                className="mx-auto h-8 w-8 text-[var(--gn-amber-600)] dark:text-[var(--gn-amber-400)]"
                aria-hidden
              />
              <p className="mt-4 font-display text-lg font-bold text-[var(--gn-navy-900)] dark:text-[#e6eef8]">
                Pertanyaan Anda belum terjawab?
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[var(--gn-navy-900)]/70 dark:text-[#a9bcd6]">
                Kirimkan lewat halaman kontak, atau langsung ke email resmi kami:{" "}
                <a
                  href={`mailto:${OPERATOR.email}`}
                  className="font-semibold underline underline-offset-4"
                >
                  {OPERATOR.email}
                </a>
                .
              </p>
              <Link
                href="/kontak"
                className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-full bg-[var(--gn-amber-500)] px-8 py-3.5 text-sm font-bold text-[var(--gn-navy-900)] shadow-xl shadow-amber-500/25 transition-transform hover:scale-[1.03]"
              >
                Hubungi Kami
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </Reveal>

          {/* Navigasi bantu */}
          <Reveal delay={0.15} className="mt-8">
            <nav
              aria-label="Dokumen terkait"
              className="flex flex-wrap items-center justify-center gap-2.5"
            >
              {[
                { href: "/layanan", label: "Lihat Layanan" },
                { href: "/privacy", label: "Kebijakan Privasi" },
                { href: "/terms", label: "Syarat & Ketentuan" },
                { href: "/cookies", label: "Kebijakan Cookie" },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:border-[var(--gn-amber-500)]/60 hover:text-foreground"
                >
                  <HelpCircle className="mr-1.5 inline h-3.5 w-3.5 -translate-y-px" aria-hidden />
                  {l.label}
                </Link>
              ))}
            </nav>
          </Reveal>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </PublicShell>
  );
}
