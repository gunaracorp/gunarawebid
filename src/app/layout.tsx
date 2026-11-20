import type { Metadata, Viewport } from "next";
import { Sora, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/gunara/theme-provider";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gunara.web.id"),
  title: {
    default: "Gugun Gunara — Arsitek Sistem Peradaban Digital | gunara.web.id",
    template: "%s | gunara.web.id",
  },
  description:
    "Pusat kendali ekosistem digital Gugun Gunara: arsitek di balik Gunara OS, metodologi UMEA / Hukum Minimum Usaha, G-DOS, dan UWA-7. Satu otak, banyak organ — digiman.id, GConsultant, Pusatperizinan, dan MUHDIN Indonesia.",
  keywords: [
    "Gugun Gunara",
    "Gunara OS",
    "UMEA",
    "Hukum Minimum Usaha",
    "G-DOS",
    "UWA-7",
    "arsitek digital",
    "brand strategist",
    "digiman.id",
    "GConsultant",
    "pusatperizinan",
    "MUHDIN Indonesia",
  ],
  authors: [{ name: "Gugun Gunara", url: "https://gunara.web.id" }],
  creator: "Gugun Gunara",
  icons: {
    icon: "/gunara-mark.svg",
  },
  openGraph: {
    title: "Gugun Gunara — Arsitek Sistem Peradaban Digital",
    description:
      "Personal command center: metodologi, ekosistem domain, dan sistem identitas Gunara. Struktur sebelum karya, sistem sebelum skala.",
    url: "https://gunara.web.id",
    siteName: "gunara.web.id",
    locale: "id_ID",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gugun Gunara — Arsitek Sistem Peradaban Digital",
    description:
      "Personal command center: metodologi, ekosistem domain, dan sistem identitas Gunara.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#060d1f" },
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
  ],
};

/** Lapisan Ilmu (UWA-7): structured data JSON-LD untuk entitas Person. */
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Gugun Gunara",
  url: "https://gunara.web.id",
  jobTitle: "Arsitek Sistem Digital & Strategis Organisasi",
  description:
    "Arsitek di balik Gunara OS (165 dokumen arsitektur kelembagaan), metodologi UMEA / Hukum Minimum Usaha, G-DOS, dan UWA-7. Sekretaris Jenderal MUHDIN Indonesia.",
  knowsAbout: [
    "Gunara OS",
    "UMEA — Universal Minimum Enterprise Architecture",
    "Hukum Minimum Usaha",
    "G-DOS — Gugun Digital Operating System",
    "UWA-7 — Unified Web Architecture",
    "Arsitektur Organisasi",
    "Identitas Merek",
  ],
  worksFor: [
    { "@type": "Organization", name: "DIGIMAN.ID", url: "https://www.digiman.id" },
    { "@type": "Organization", name: "GConsultant", url: "https://www.gconsultant.web.id" },
    {
      "@type": "Organization",
      name: "MUHDIN Indonesia",
      url: "https://muhdin.id",
      jobTitle: "Sekretaris Jenderal",
    },
  ],
  sameAs: [
    "https://www.digiman.id",
    "https://www.gconsultant.web.id",
    "https://www.pusatperizinan.com",
    "https://muhdin.id",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${sora.variable} ${manrope.variable} ${jetbrainsMono.variable} font-sans antialiased bg-background text-foreground`}
      >
        <a href="#konten-utama" className="skip-link">
          Langsung ke konten utama
        </a>
        <ThemeProvider>{children}</ThemeProvider>
        <Toaster />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
