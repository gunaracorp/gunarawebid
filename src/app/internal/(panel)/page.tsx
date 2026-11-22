import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  FileLock2,
  Inbox,
  LayoutDashboard,
  Palette,
  Route,
  ShieldCheck,
} from "lucide-react";
import { db } from "@/lib/db";

export const metadata: Metadata = {
  title: "Dashboard",
};

const BOOT_LINES = [
  "[ OK ] sesi terautentikasi — selamat datang kembali, arsitek",
  "[ OK ] sistem identitas trilogi — RATIFIKASI DEWAN PAKAR 46",
  "[ OK ] vault dokumen — terpisah dari repo publik, disajikan via API gated",
  "[ OK ] situs publik — 10 halaman aktif + legal standar internasional",
  "[ OK ] sitemap publik — 10 rute, robots menutup seluruh area rahasia",
];

const PINTU = [
  {
    href: "/internal/identitas",
    icon: Palette,
    judul: "Identitas & Logo",
    desc: "Konstruksi trilogi logo, palet terkunci, WCAG AAA, hukum larangan, dan seluruh berkas brand kit.",
    meta: "DEWAN PAKAR 46",
  },
  {
    href: "/internal/dokumen",
    icon: FileLock2,
    judul: "Vault Dokumen",
    desc: "NIB dan dokumen legal — disajikan hanya melalui API gated, tidak pernah masuk repo publik.",
    meta: "RAHASIA",
  },
  {
    href: "/internal/roadmap",
    icon: Route,
    judul: "Roadmap 99 Hari",
    desc: "Peta 10 fase v1.0.0.0 → v2.0.0.0: posisi hari ini, fase aktif, dan target versi berikutnya.",
    meta: "F1 HARI 2/99",
  },
];

const STATUS = [
  { label: "Versi Sistem", nilai: "v1.0.0.2", note: "GUNARA-OS · 22 NOV 2026" },
  { label: "Situs Publik", nilai: "10 HAL.", note: "BERANDA → LEGAL" },
  { label: "Trilogi Logo", nilai: "3 ORGAN", note: "KUNCI PERMANEN" },
  { label: "Akses Internal", nilai: "AKTIF", note: "SESI 12 JAM" },
];

export default async function InternalDashboardPage() {
  // Pesan masuk dari form kontak publik — dibaca langsung dari database.
  let pesanTerbaru: {
    id: string;
    nama: string;
    email: string;
    kebutuhan: string;
    pesan: string;
    organisasi: string | null;
    createdAt: Date;
  }[] = [];
  let totalPesan = 0;
  try {
    totalPesan = await db.pesanMasuk.count();
    pesanTerbaru = await db.pesanMasuk.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    });
  } catch {
    // Database tidak tersedia pada runtime ini — dashboard tetap hidup.
  }

  return (
    <div className="space-y-8">
      {/* Boot panel */}
      <section className="rounded-3xl border border-[#1b3455] bg-[#0a1628] p-7 sm:p-9">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[#1b3455] bg-[#060d1f] text-[var(--gn-amber-400)]">
              <LayoutDashboard className="h-6 w-6" aria-hidden />
            </span>
            <div>
              <h1 className="font-display text-2xl font-bold">Pusat Kendali Internal</h1>
              <p className="font-mono text-[11px] tracking-[0.18em] text-[#5c87b8]">
                G-DOS · COMMAND PANEL · RAHASIA
              </p>
            </div>
          </div>
          <span className="flex items-center gap-2 rounded-full border border-[#1b3455] px-3.5 py-1.5 font-mono text-[10px] text-[#a9bcd6]">
            <span className="status-dot" aria-hidden />
            SYSTEM ONLINE
          </span>
        </div>
        <ul className="nice-scroll mt-6 space-y-2.5 overflow-x-auto rounded-2xl border border-[#1b3455] bg-[#060d1f] p-5 font-mono text-xs leading-relaxed text-[#a9bcd6]">
          {BOOT_LINES.map((l) => (
            <li key={l}>
              <span className="text-[var(--gn-amber-400)]">$</span> {l}
            </li>
          ))}
        </ul>
      </section>

      {/* Status grid */}
      <section aria-label="Status sistem">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[#1b3455] bg-[#1b3455] lg:grid-cols-4">
          {STATUS.map((s) => (
            <div key={s.label} className="flex flex-col bg-[#0a1628] px-6 py-6">
              <dt className="order-2 mt-1 text-xs text-[#a9bcd6]">{s.label}</dt>
              <dd className="order-1 font-display text-2xl font-bold text-[var(--gn-amber-400)]">
                {s.nilai}
              </dd>
              <dd className="order-3 mt-0.5 font-mono text-[10px] tracking-[0.14em] text-[#5c87b8]">
                {s.note}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Pintu pintas */}
      <section aria-labelledby="judul-pintu">
        <h2 id="judul-pintu" className="font-mono text-[11px] font-bold tracking-[0.24em] text-[#5c87b8]">
          PINTU PINTAS
        </h2>
        <div className="mt-4 grid gap-5 lg:grid-cols-3">
          {PINTU.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className="group flex h-full flex-col rounded-2xl border border-[#1b3455] bg-[#0a1628] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--gn-amber-500)]/60"
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[#1b3455] bg-[#060d1f] text-[var(--gn-amber-400)]">
                  <p.icon className="h-5 w-5" aria-hidden />
                </span>
                <span className="font-mono text-[10px] font-bold tracking-[0.16em] text-[#5c87b8]">
                  {p.meta}
                </span>
              </div>
              <h3 className="mt-4 font-display text-lg font-bold">{p.judul}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-[#a9bcd6]">{p.desc}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--gn-amber-400)]">
                Buka
                <ArrowUpRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden
                />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Pesan masuk */}
      <section aria-labelledby="judul-pesan" className="rounded-3xl border border-[#1b3455] bg-[#0a1628] p-7 sm:p-9">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#1b3455] bg-[#060d1f] text-[var(--gn-amber-400)]">
              <Inbox className="h-5 w-5" aria-hidden />
            </span>
            <div>
              <h2 id="judul-pesan" className="font-display text-lg font-bold">
                Pesan Masuk — Form Kontak Publik
              </h2>
              <p className="font-mono text-[10px] tracking-[0.18em] text-[#5c87b8]">
                {totalPesan > 0 ? `${totalPesan} PESAN TERSIMPAN` : "BELUM ADA PESAN"}
              </p>
            </div>
          </div>
        </div>

        {pesanTerbaru.length === 0 ? (
          <p className="mt-6 rounded-2xl border border-dashed border-[#1b3455] bg-[#060d1f] px-5 py-8 text-center text-sm text-[#a9bcd6]">
            Belum ada pesan dari gerbang publik. Setiap pengiriman di{" "}
            <span className="text-[var(--gn-amber-400)]">/kontak</span> akan muncul di sini.
          </p>
        ) : (
          <ul className="nice-scroll mt-6 max-h-96 space-y-3 overflow-y-auto">
            {pesanTerbaru.map((p) => (
              <li key={p.id} className="rounded-2xl border border-[#1b3455] bg-[#060d1f] p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-semibold text-[#e6eef8]">
                    {p.nama}
                    {p.organisasi ? (
                      <span className="ml-2 text-xs font-normal text-[#a9bcd6]">
                        · {p.organisasi}
                      </span>
                    ) : null}
                  </p>
                  <span className="rounded-full border border-[#254872] px-2.5 py-0.5 font-mono text-[10px] tracking-[0.12em] text-[var(--gn-amber-400)]">
                    {p.kebutuhan.toUpperCase()}
                  </span>
                </div>
                <p className="mt-1 font-mono text-[11px] text-[#5c87b8]">
                  {p.email} · {new Intl.DateTimeFormat("id-ID", { dateStyle: "medium", timeStyle: "short" }).format(p.createdAt)}
                </p>
                <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-[#a9bcd6]">
                  {p.pesan}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Catatan keamanan */}
      <section className="flex items-start gap-3 rounded-2xl border border-[var(--gn-amber-500)]/40 bg-[var(--gn-amber-500)]/5 p-5">
        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[var(--gn-amber-400)]" aria-hidden />
        <p className="text-xs leading-relaxed text-[#a9bcd6]">
          <strong className="text-[#e6eef8]">Protokol rahasia:</strong> area ini tidak diindeks
          mesin pencari (robots + noindex), tidak ditautkan dari situs publik, dan seluruh berkas
          vault disajikan lewat API gated — bukan folder statis. Kunci internal hidup di
          environment variable, tidak pernah tertulis di repo.
        </p>
      </section>
    </div>
  );
}
