"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Database, FolderCog, Layers, ShieldCheck, Workflow, BrainCircuit } from "lucide-react";

const DNA_FORMULA = ["V", "K", "A", "D", "P", "S", "M", "L", "E"];
/** Makna Formula DNA sesuai dokumen brand: rumus belajar seumur hidup. */
const DNA_LABELS: Record<string, string> = {
  V: "Verifikasi",
  K: "Kuasai",
  A: "Amanah",
  D: "Dikuasai",
  P: "Perduli",
  S: "Sabar",
  M: "Mandekati",
  L: "Lepas",
  E: "Eksistensi",
};
const DNA_ARIA =
  "Formula DNA: Verifikasi, Kuasai, Amanah, Dikuasai, Perduli, Sabar, Mandekati, Lepas, Eksistensi";

const OS_LAYERS = [
  { icon: BrainCircuit, name: "Knowledge", desc: "Notion — otak pengetahuan" },
  { icon: Workflow, name: "Work", desc: "ClickUp — mesin eksekusi" },
  { icon: FolderCog, name: "Assets", desc: "Google Drive — lemari arsip" },
  { icon: Layers, name: "System", desc: "GitHub + Vercel — pabrik web" },
  { icon: Database, name: "Data", desc: "Supabase — sumber data" },
  { icon: ShieldCheck, name: "Control", desc: "Cloudflare + 1Password — benteng" },
];

const STATS = [
  { value: 165, label: "Dokumen Gunara OS", note: "Arsitektur kelembagaan" },
  { value: 20, label: "Domain Kepemimpinan", note: "Kode PGA-01 → PGA-165" },
  { value: 3, label: "Metodologi Proprietary", note: "UMEA · G-DOS · UWA-7" },
  { value: 6, label: "Aset Domain Digital", note: "Satu infrastruktur bersama" },
];

/** Angka statistik yang menghitung naik saat pertama tampil.
 *  Menghormati preferensi reduced-motion — langsung menampilkan nilai akhir. */
function CountUp({ value, duration = 1400 }: { value: number; duration?: number }) {
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);

  useEffect(() => {
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      // Reduced-motion: lompat langsung ke nilai akhir pada frame pertama.
      if (reduce) {
        setN(value);
        return;
      }
      const p = Math.min((t - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(value * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, duration, reduce]);

  return <>{n}</>;
}

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 26 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] as const },
});

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="beranda"
      aria-labelledby="judul-hero"
      className="relative overflow-hidden bg-[var(--gn-abyss)] text-[#e6eef8]"
    >
      {/* Latar blueprint tengah malam */}
      <div className="bg-blueprint bg-blueprint-fade absolute inset-0" aria-hidden />
      <div className="glow-amber absolute -top-40 right-[-10%] h-[560px] w-[560px]" aria-hidden />
      <div className="glow-navy absolute bottom-[-30%] left-[-15%] h-[620px] w-[620px]" aria-hidden />

      {/* Orbit halus */}
      <svg
        className="spin-slow absolute right-[6%] top-[14%] hidden h-[520px] w-[520px] opacity-40 xl:block"
        viewBox="0 0 520 520"
        aria-hidden
      >
        <circle cx="260" cy="260" r="248" fill="none" stroke="#254872" strokeWidth="1" strokeDasharray="3 9" />
        <circle cx="260" cy="260" r="182" fill="none" stroke="#1b3455" strokeWidth="1" strokeDasharray="2 7" />
        <circle cx="508" cy="260" r="5" fill="#f59e0b" />
        <circle cx="78" cy="260" r="3.5" fill="#5c87b8" />
        <circle cx="260" cy="78" r="3" fill="#a9bcd6" />
      </svg>

      <div className="relative mx-auto flex max-w-7xl flex-col gap-14 px-4 pb-20 pt-32 sm:px-6 lg:px-8 lg:pt-40">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <motion.p {...(reduce ? {} : fadeUp(0))} className="kicker kicker-on-dark">
              Gugun Gunara · Personal Command Center
            </motion.p>

            <motion.h1
              {...(reduce ? {} : fadeUp(0.08))}
              id="judul-hero"
              className="mt-5 max-w-2xl text-4xl font-bold leading-[1.08] sm:text-5xl xl:text-6xl"
            >
              Arsitek Sistem{" "}
              <span className="text-gradient-amber">Peradaban Digital</span>
            </motion.h1>

            <motion.p
              {...(reduce ? {} : fadeUp(0.16))}
              className="mt-6 max-w-xl text-base leading-relaxed text-[#a9bcd6] sm:text-lg"
            >
              Gunara adalah pusat kendali sebuah ekosistem: metodologi organisasi{" "}
              <strong className="font-semibold text-[#e6eef8]">UMEA — Hukum Minimum Usaha</strong>,
              sistem operasi digital <strong className="font-semibold text-[#e6eef8]">G-DOS</strong>,
              arsitektur web <strong className="font-semibold text-[#e6eef8]">UWA-7</strong>, dan
              etalase <strong className="font-semibold text-[#e6eef8]">Gunara OS</strong> — semuanya
              berdiri di atas satu fondasi yang sama.
            </motion.p>

            <motion.p
              {...(reduce ? {} : fadeUp(0.2))}
              className="mt-3 font-mono text-xs tracking-[0.14em] text-[#5c87b8]"
            >
              STRUKTUR SEBELUM KARYA · SISTEM SEBELUM SKALA
            </motion.p>

            {/* Formula DNA */}
            <motion.div
              {...(reduce ? {} : fadeUp(0.26))}
              className="mt-8 flex flex-wrap items-center gap-1.5"
              aria-label={DNA_ARIA}
            >
              {DNA_FORMULA.map((k, i) => (
                <span key={k} className="flex items-center gap-1.5">
                  <span
                    className="inline-flex h-8 min-w-8 items-center justify-center rounded-md border border-[#1b3455] bg-[#0a1628]/80 px-2 font-mono text-xs font-semibold text-[#fbbf24]"
                    title={DNA_LABELS[k]}
                  >
                    {k}
                  </span>
                  {i < DNA_FORMULA.length - 1 ? (
                    <span className="text-[#254872]" aria-hidden>
                      →
                    </span>
                  ) : null}
                </span>
              ))}
            </motion.div>

            <motion.div
              {...(reduce ? {} : fadeUp(0.34))}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <a
                href="#metodologi"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-[var(--gn-amber-500)] px-7 text-sm font-bold text-[#0a1628] shadow-xl shadow-amber-500/25 transition-transform hover:scale-[1.03]"
              >
                Jelajahi Metodologi
                <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
              <a
                href="#ekosistem"
                className="inline-flex h-12 items-center gap-2 rounded-full border border-[#254872] bg-[#0a1628]/60 px-7 text-sm font-semibold text-[#e6eef8] transition-colors hover:border-[var(--gn-amber-500)] hover:text-[#fbbf24]"
              >
                Masuk Ekosistem
              </a>
            </motion.div>
          </div>

          {/* Panel komando G-DOS */}
          <motion.aside
            {...(reduce ? {} : fadeUp(0.3))}
            className="relative"
            aria-label="Ilustrasi panel komando G-DOS"
          >
            <div className="rounded-2xl border border-[#1b3455] bg-[#0a1628]/85 p-6 shadow-2xl shadow-black/40 backdrop-blur">
              <div className="flex items-center justify-between border-b border-[#1b3455] pb-4">
                <div>
                  <p className="font-mono text-[10px] tracking-[0.28em] text-[#5c87b8]">
                    G-DOS · COMMAND PANEL
                  </p>
                  <p className="mt-1 font-display text-lg font-semibold">
                    Satu Otak. Satu Sumber Kebenaran.
                  </p>
                </div>
                <span className="flex items-center gap-2 rounded-full border border-[#1b3455] px-3 py-1.5 font-mono text-[10px] text-[#a9bcd6]">
                  <span className="status-dot" aria-hidden />
                  LIVE
                </span>
              </div>

              <ul className="mt-5 space-y-3">
                {OS_LAYERS.map((layer) => (
                  <li
                    key={layer.name}
                    className="flex items-center gap-3 rounded-xl border border-transparent bg-[#060d1f]/60 px-4 py-3 transition-colors hover:border-[#254872]"
                  >
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#1b3455] bg-[#0a1628] text-[var(--gn-amber-400)]">
                      <layer.icon className="h-4 w-4" aria-hidden />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold">{layer.name}</span>
                      <span className="block truncate text-xs text-[#a9bcd6]">{layer.desc}</span>
                    </span>
                    <span
                      className="h-1.5 w-16 shrink-0 overflow-hidden rounded-full bg-[#12233d]"
                      aria-hidden
                    >
                      <span className="block h-full w-3/4 rounded-full bg-gradient-to-r from-[var(--gn-amber-600)] to-[var(--gn-amber-400)]" />
                    </span>
                  </li>
                ))}
              </ul>

              <p className="mt-5 border-t border-[#1b3455] pt-4 text-center font-mono text-[10px] leading-relaxed tracking-[0.18em] text-[#5c87b8]">
                KNOWLEDGE · WORK · ASSETS → DATA → AUTOMATION → OBSERVABILITY
              </p>
            </div>

            <div
              className="glow-amber pointer-events-none absolute -bottom-16 left-1/2 h-40 w-3/4 -translate-x-1/2 opacity-70"
              aria-hidden
            />
          </motion.aside>
        </div>

        {/* Strip statistik */}
        <motion.dl
          {...(reduce ? {} : fadeUp(0.42))}
          className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[#1b3455] bg-[#1b3455] sm:grid-cols-4"
        >
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col bg-[#0a1628]/90 px-6 py-6"
            >
              <dt className="order-2 mt-1 text-xs text-[#a9bcd6]">{stat.label}</dt>
              <dd className="order-1 font-display text-3xl font-bold text-[#fbbf24]">
                <CountUp value={stat.value} />
              </dd>
              <dd className="order-3 mt-0.5 font-mono text-[10px] tracking-[0.14em] text-[#5c87b8]">
                {stat.note}
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
