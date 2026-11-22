import Link from "next/link";
import { Compass, Home, Map } from "lucide-react";
import { PublicShell } from "@/components/gunara/site-footer";

/**
 * Halaman 404 publik — tidak ada halaman kosong di sistem.
 * Struktur tetap tertata meski alamat tidak ditemukan.
 */
export default function NotFound() {
  return (
    <PublicShell>
      <section className="relative overflow-hidden bg-[var(--gn-abyss)] pb-20 pt-40 text-[#e6eef8] sm:pb-28 sm:pt-48">
        <div className="bg-blueprint bg-blueprint-fade absolute inset-0" aria-hidden />
        <div className="glow-amber absolute left-1/2 top-1/2 h-[420px] w-[620px] -translate-x-1/2 -translate-y-1/2 opacity-80" aria-hidden />
        <div className="relative mx-auto max-w-2xl px-4 text-center sm:px-6">
          <p className="font-mono text-[11px] font-bold tracking-[0.24em] text-[var(--gn-amber-300)]">
            404 · HALAMAN TIDAK DITEMUKAN
          </p>
          <h1 className="mt-5 text-4xl font-bold leading-[1.08] sm:text-5xl">
            Alamat ini berada <span className="text-gradient-amber">di luar arsitektur</span> situs.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-[#a9bcd6] sm:text-lg">
            Halaman yang Anda tuju tidak ada atau sudah dipindahkan. Struktur selalu menemukan
            jalannya — kembali ke gerbang yang benar di bawah ini.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3.5">
            <Link
              href="/"
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[var(--gn-amber-500)] px-7 py-3.5 text-sm font-bold text-[var(--gn-navy-900)] shadow-xl shadow-amber-500/25 transition-transform hover:scale-[1.03]"
            >
              <Home className="h-4 w-4" aria-hidden />
              Beranda
            </Link>
            <Link
              href="/ekosistem"
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-[#254872] bg-[#0a1628]/60 px-7 py-3.5 text-sm font-semibold text-[#e6eef8] transition-colors hover:border-[var(--gn-amber-500)] hover:text-[#fbbf24]"
            >
              <Map className="h-4 w-4" aria-hidden />
              Peta Ekosistem
            </Link>
            <Link
              href="/kontak"
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-[#254872] bg-[#0a1628]/60 px-7 py-3.5 text-sm font-semibold text-[#e6eef8] transition-colors hover:border-[var(--gn-amber-500)] hover:text-[#fbbf24]"
            >
              <Compass className="h-4 w-4" aria-hidden />
              Kontak
            </Link>
          </div>
        </div>
      </section>
    </PublicShell>
  );
}
