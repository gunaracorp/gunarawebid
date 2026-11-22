import type { Metadata } from "next";

/** Lapisan dasar seluruh area internal: latar abyss + larangan indeks mesin pencari.
 *  Chrome navigasi hanya untuk area terautentikasi (route group "(panel)"). */
export const metadata: Metadata = {
  title: {
    default: "Gunara Internal — Pusat Kendali Rahasia",
    template: "%s · Gunara Internal",
  },
  robots: { index: false, follow: false, nocache: true },
};

export default function InternalRootLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-[#060d1f] text-[#e6eef8] antialiased">{children}</div>;
}
