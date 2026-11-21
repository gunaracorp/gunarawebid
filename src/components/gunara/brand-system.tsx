"use client";

import { useState } from "react";
import { Check, Copy, Type, Pipette, Gauge, Braces } from "lucide-react";
import { SectionHeading } from "@/components/gunara/section-heading";
import { Reveal } from "@/components/gunara/reveal";

const PALET = [
  { nama: "Midnight Abyss", hex: "#060D1F", peran: "Kanvas utama mode gelap", swatch: "#060D1F", teksTerang: true },
  { nama: "Midnight Navy", hex: "#0A1628", peran: "Warna merek inti · otoritas", swatch: "#0A1628", teksTerang: true },
  { nama: "Navy 800", hex: "#12233D", peran: "Permukaan kartu gelap", swatch: "#12233D", teksTerang: true },
  { nama: "Navy 400", hex: "#5C87B8", peran: "Aksen sekunder · garis data", swatch: "#5C87B8", teksTerang: false },
  { nama: "Navy Mist", hex: "#A9BCD6", peran: "Teks sekunder mode gelap", swatch: "#A9BCD6", teksTerang: false },
  { nama: "Snow Mist", hex: "#F8FAFC", peran: "Kanvas utama mode terang", swatch: "#F8FAFC", teksTerang: false },
  { nama: "Amber 500", hex: "#F59E0B", peran: "Warna aksi · cahaya arsitek", swatch: "#F59E0B", teksTerang: false },
  { nama: "Amber 400", hex: "#FBBF24", peran: "Highlight gelap · formula", swatch: "#FBBF24", teksTerang: false },
  { nama: "Amber 700", hex: "#B45309", peran: "Aksen teks mode terang", swatch: "#B45309", teksTerang: true },
  { nama: "Amber Tint", hex: "#FFF7E6", peran: "Chip & latar nuansa hangat", swatch: "#FFF7E6", teksTerang: false },
];

/* Data dari scripts/contrast.py — hasil perhitungan WCAG 2.1 nyata */
const KONTRAS = [
  { fg: "Amber 500", bg: "Midnight Abyss", ratio: "9,01:1", level: "AAA", hexFg: "#F59E0B", hexBg: "#060D1F" },
  { fg: "Amber 400", bg: "Midnight Abyss", ratio: "11,59:1", level: "AAA", hexFg: "#FBBF24", hexBg: "#060D1F" },
  { fg: "Navy 900", bg: "Amber 500", ratio: "8,44:1", level: "AAA", hexFg: "#0A1628", hexBg: "#F59E0B" },
  { fg: "Putih", bg: "Navy 900", ratio: "18,13:1", level: "AAA", hexFg: "#FFFFFF", hexBg: "#0A1628" },
  { fg: "Navy 900", bg: "Snow Mist", ratio: "17,33:1", level: "AAA", hexFg: "#0A1628", hexBg: "#F8FAFC" },
  { fg: "Mist", bg: "Midnight Abyss", ratio: "16,54:1", level: "AAA", hexFg: "#E6EEF8", hexBg: "#060D1F" },
  { fg: "Navy Mist", bg: "Midnight Abyss", ratio: "10,00:1", level: "AAA", hexFg: "#A9BCD6", hexBg: "#060D1F" },
  { fg: "Amber 800", bg: "Amber Tint", ratio: "6,65:1", level: "AA", hexFg: "#92400E", hexBg: "#FFF7E6" },
  { fg: "Amber 700", bg: "Snow Mist", ratio: "4,80:1", level: "AA", hexFg: "#B45309", hexBg: "#F8FAFC" },
];

const TYPE_SCALE = [
  { label: "Display / H1", size: "60px", kelas: "text-4xl sm:text-5xl xl:text-6xl", bobot: "Bold 700" },
  { label: "Judul Seksi / H2", size: "36px", kelas: "text-3xl sm:text-4xl", bobot: "Bold 700" },
  { label: "Judul Kartu / H3", size: "20px", kelas: "text-xl", bobot: "Bold 700" },
  { label: "Isi / Body", size: "16px", kelas: "text-base", bobot: "Regular 400" },
  { label: "Kicker / Token", size: "12px", kelas: "text-xs", bobot: "Semibold 600" },
];

const TOKENS = [
  "--gn-navy-900: #0A1628;",
  "--gn-abyss: #060D1F;",
  "--gn-amber-500: #F59E0B;",
  "--gn-amber-400: #FBBF24;",
  "--gn-snow: #F8FAFC;",
  "--gn-navy-mist: #A9BCD6;",
  "--gn-amber-tint: #FFF7E6;",
  "--radius: 0.75rem;",
];

function Swatch({ item }: { item: (typeof PALET)[number] }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(item.hex);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="group overflow-hidden rounded-2xl border border-border bg-card text-left transition-all hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-[var(--gn-amber-500)]"
      aria-label={`Salin kode warna ${item.nama} ${item.hex}`}
    >
      <div
        className="relative flex h-20 items-end justify-between p-3"
        style={{ backgroundColor: item.swatch }}
      >
        <span
          className={`font-mono text-[10px] tracking-[0.14em] ${
            item.teksTerang ? "text-white/85" : "text-[#0a1628]/70"
          }`}
        >
          {item.hex}
        </span>
        <span
          className={`inline-flex h-6 w-6 items-center justify-center rounded-md transition-opacity ${
            item.teksTerang
              ? "bg-white/15 text-white/90"
              : "bg-[#0a1628]/10 text-[#0a1628]/60"
          } opacity-60 group-hover:opacity-100`}
        >
          {copied ? <Check className="h-3.5 w-3.5" aria-hidden /> : <Copy className="h-3.5 w-3.5" aria-hidden />}
        </span>
      </div>
      <div className="p-3.5">
        <p className="text-sm font-bold">{item.nama}</p>
        <p className="mt-0.5 text-[11px] leading-relaxed text-muted-foreground">{item.peran}</p>
      </div>
    </button>
  );
}

export function BrandSystem() {
  return (
    <section
      id="sistem"
      aria-labelledby="judul-sistem"
      className="anchor-offset bg-secondary/40 py-24 sm:py-28 dark:bg-[#060d1f]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="judul-sistem"
          kicker="Brand System · Midnight Blueprint"
          title="Sistem Warna & Identitas Gunara"
          description="Bukan warna yang sekadar indah — setiap keputusan diuji: semiotika otoritas malam, cahaya kerja sang arsitek, dan kontras yang layak dipublikasikan."
        />

        {/* Palet */}
        <Reveal className="mt-14">
          <div className="flex items-center gap-3">
            <Pipette className="h-5 w-5 text-[var(--gn-amber-600)] dark:text-[var(--gn-amber-400)]" aria-hidden />
            <h3 className="font-display text-xl font-bold">Palet Inti — klik untuk menyalin</h3>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {PALET.map((item) => (
              <Swatch key={item.hex} item={item} />
            ))}
          </div>
        </Reveal>

        {/* Kontras */}
        <Reveal className="mt-14" delay={0.05}>
          <div className="flex items-center gap-3">
            <Gauge className="h-5 w-5 text-[var(--gn-amber-600)] dark:text-[var(--gn-amber-400)]" aria-hidden />
            <h3 className="font-display text-xl font-bold">
              Uji Kontras WCAG 2.1 — angka hasil perhitungan, bukan klaim
            </h3>
          </div>
          <div className="nice-scroll mt-5 overflow-x-auto rounded-2xl border border-border bg-card">
            <table className="w-full min-w-[640px] text-left text-sm">
              <caption className="sr-only">
                Rasio kontras pasangan warna Gunara berdasarkan WCAG 2.1
              </caption>
              <thead>
                <tr className="border-b border-border bg-secondary/50 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                  <th scope="col" className="px-5 py-3.5">Pasangan</th>
                  <th scope="col" className="px-5 py-3.5">Contoh</th>
                  <th scope="col" className="px-5 py-3.5">Rasio</th>
                  <th scope="col" className="px-5 py-3.5">Level</th>
                </tr>
              </thead>
              <tbody>
                {KONTRAS.map((k) => (
                  <tr key={k.fg + k.bg} className="border-b border-border/60 last:border-0">
                    <td className="px-5 py-3">
                      <span className="font-semibold">{k.fg}</span>
                      <span className="text-muted-foreground"> di atas {k.bg}</span>
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className="inline-block rounded-lg px-3 py-1.5 font-mono text-[11px] font-bold"
                        style={{ backgroundColor: k.hexBg, color: k.hexFg }}
                      >
                        Aa · Gunara
                      </span>
                    </td>
                    <td className="px-5 py-3 font-mono font-bold">{k.ratio}</td>
                    <td className="px-5 py-3">
                      <span
                        className={`rounded-full px-2.5 py-1 font-mono text-[10px] font-bold ${
                          k.level === "AAA"
                            ? "bg-[var(--gn-amber-500)] text-[var(--gn-navy-900)]"
                            : "border border-[var(--gn-amber-500)]/50 bg-accent text-accent-foreground"
                        }`}
                      >
                        {k.level}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
            Amber 500 di atas Midnight Abyss = <strong className="text-foreground">9,01:1</strong>{" "}
            — pasangan tanda tangan Gunara. Di mode terang, teks aksen naik ke Amber 700/800
            karena amber terang di atas putih gagal kontras.
          </p>
        </Reveal>

        {/* Tipografi + Token */}
        <div className="mt-14 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal delay={0.05}>
            <div className="h-full rounded-2xl border border-border bg-card p-7">
              <div className="flex items-center gap-3">
                <Type className="h-5 w-5 text-[var(--gn-amber-600)] dark:text-[var(--gn-amber-400)]" aria-hidden />
                <h3 className="font-display text-xl font-bold">Spesimen Tipografi</h3>
              </div>
              <div className="mt-5 space-y-4">
                {TYPE_SCALE.map((t) => (
                  <div key={t.label} className="flex items-baseline justify-between gap-4 border-b border-border/50 pb-3 last:border-0">
                    <p className={`min-w-0 truncate font-display ${t.kelas}`}>Gunara</p>
                    <p className="shrink-0 text-right font-mono text-[10px] leading-relaxed text-muted-foreground">
                      {t.label}
                      <br />
                      {t.size} · {t.bobot}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
                <strong className="text-foreground">Sora</strong> untuk judul (geometris,
                tegap), <strong className="text-foreground">Manrope</strong> untuk isi (hangat
                namun presisi), <strong className="text-foreground">JetBrains Mono</strong> untuk
                token & kode — suara visual &ldquo;arsitek dengan penggaris&rdquo;.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="h-full rounded-2xl border border-border bg-[#0a1628] p-7 text-[#e6eef8] dark:border-[#1b3455]">
              <div className="flex items-center gap-3">
                <Braces className="h-5 w-5 text-[var(--gn-amber-400)]" aria-hidden />
                <h3 className="font-display text-xl font-bold">Design Tokens</h3>
              </div>
              <pre className="nice-scroll mt-5 overflow-x-auto rounded-xl border border-[#1b3455] bg-[#060d1f] p-4 font-mono text-[12px] leading-relaxed text-[#a9bcd6]">
                <code>{`:root {
${TOKENS.join("\n")}\n}`}</code>
              </pre>
              <ul className="mt-5 space-y-2 text-xs leading-relaxed text-[#a9bcd6]">
                <li className="flex gap-2">
                  <span className="text-[var(--gn-amber-400)]">01</span>
                  Radius seragam 0,75rem — geometri yang tenang.
                </li>
                <li className="flex gap-2">
                  <span className="text-[var(--gn-amber-400)]">02</span>
                  Amber hanya untuk aksi, sorotan, dan data penting — bukan latar.
                </li>
                <li className="flex gap-2">
                  <span className="text-[var(--gn-amber-400)]">03</span>
                  Mode gelap identitas default: malam arsitek, diterangi lampu kerja amber.
                </li>
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
