import type { Metadata } from "next";
import { CheckCircle2, Circle, Download, Route } from "lucide-react";

export const metadata: Metadata = {
  title: "Roadmap 99 Hari",
};

const FASE = [
  { fase: "F1", hari: "1–9", periode: "21 Nov – 29 Nov 2026", fokus: "Fondasi & Tata Kelola", lapis: "L06 — Otoritas", target: "v1.1.0.9" },
  { fase: "F2", hari: "10–18", periode: "30 Nov – 8 Des 2026", fokus: "Otoritas Domain & Produksi", lapis: "L06 — Otoritas", target: "v1.2.0.18" },
  { fase: "F3", hari: "19–30", periode: "9 Des – 20 Des 2026", fokus: "Arsitektur Konten", lapis: "L03 — Ilmu", target: "v1.3.0.30" },
  { fase: "F4", hari: "31–40", periode: "21 Des – 30 Des 2026", fokus: "Sistem Identitas Visual 2.0", lapis: "L04 — Penglihatan", target: "v1.4.0.40" },
  { fase: "F5", hari: "41–52", periode: "31 Des – 11 Jan 2027", fokus: "Pengalaman Interaktif", lapis: "L02 — Akal", target: "v1.5.0.52" },
  { fase: "F6", hari: "53–62", periode: "12 Jan – 21 Jan 2027", fokus: "Mesin Konversi", lapis: "L05 — Rahmah", target: "v1.6.0.62" },
  { fase: "F7", hari: "63–72", periode: "22 Jan – 31 Jan 2027", fokus: "Intelijen & Otomasi AI", lapis: "L07 — Waktu", target: "v1.7.0.72" },
  { fase: "F8", hari: "73–84", periode: "1 Feb – 12 Feb 2027", fokus: "Ekosistem & Produk", lapis: "L01 — Alam Fisik", target: "v1.8.0.84" },
  { fase: "F9", hari: "85–92", periode: "13 Feb – 20 Feb 2027", fokus: "Sertifikasi & Tata Kelola Mutu", lapis: "L03+06 — Ilmu & Otoritas", target: "v1.9.0.92" },
  { fase: "F10", hari: "93–99", periode: "21 Feb – 27 Feb 2027", fokus: "Peluncuran Peradaban v2.0.0.0", lapis: "L07 — Waktu", target: "v2.0.0.99" },
];

const HARI_SELESAI = 1; // Day 1 ✅ (aktivasi sistem versi) — sinkron WORKLOG.md
const HARI_TOTAL = 99;

export default function InternalRoadmapPage() {
  const persen = Math.round((HARI_SELESAI / HARI_TOTAL) * 100);

  return (
    <div className="space-y-10">
      {/* Header */}
      <section className="rounded-3xl border border-[#1b3455] bg-[#0a1628] p-7 sm:p-9">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[#1b3455] bg-[#060d1f] text-[var(--gn-amber-400)]">
              <Route className="h-6 w-6" aria-hidden />
            </span>
            <div>
              <h1 className="font-display text-2xl font-bold">Roadmap Upgrade 99 Hari</h1>
              <p className="font-mono text-[11px] tracking-[0.18em] text-[#5c87b8]">
                v1.0.0.0 → v2.0.0.0 · SATU HARI = SATU ITERASI = SATU COMMIT
              </p>
            </div>
          </div>
          <a
            href="/api/internal/dokumen/roadmap"
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#1b3455] px-6 py-3 font-mono text-[11px] font-bold text-[var(--gn-amber-400)] transition-colors hover:border-[var(--gn-amber-500)]"
          >
            <Download className="h-4 w-4" aria-hidden />
            UNDUH ROADMAP.MD
          </a>
        </div>

        <div className="mt-7">
          <div className="flex items-center justify-between font-mono text-[11px] text-[#a9bcd6]">
            <span>PROGRES: {HARI_SELESAI}/{HARI_TOTAL} HARI</span>
            <span>{persen}%</span>
          </div>
          <div className="mt-2.5 h-3 overflow-hidden rounded-full bg-[#060d1f] border border-[#1b3455]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[var(--gn-amber-600)] to-[var(--gn-amber-400)]"
              style={{ width: `${Math.max(persen, 2)}%` }}
              role="progressbar"
              aria-valuenow={persen}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Progres roadmap 99 hari"
            />
          </div>
          <p className="mt-3 font-mono text-[10px] tracking-[0.16em] text-[#5c87b8]">
            POSISI: FASE 1 · HARI 1 SELESAI ✅ · BERIKUTNYA HARI 2 — AUDIT TEKNIS BASELINE
          </p>
        </div>
      </section>

      {/* Tabel 10 fase */}
      <section aria-labelledby="judul-fase" className="rounded-3xl border border-[#1b3455] bg-[#0a1628] p-7 sm:p-9">
        <h2 id="judul-fase" className="font-display text-xl font-bold">
          Peta 10 Fase
        </h2>
        <div className="nice-scroll mt-5 overflow-x-auto rounded-2xl border border-[#1b3455]">
          <table className="w-full min-w-[720px] text-left text-sm">
            <caption className="sr-only">Peta 10 fase roadmap upgrade 99 hari Gunara OS</caption>
            <thead>
              <tr className="border-b border-[#1b3455] bg-[#060d1f] font-mono text-[10px] uppercase tracking-[0.16em] text-[#5c87b8]">
                <th scope="col" className="px-5 py-3.5">Fase</th>
                <th scope="col" className="px-5 py-3.5">Hari</th>
                <th scope="col" className="px-5 py-3.5">Periode</th>
                <th scope="col" className="px-5 py-3.5">Fokus</th>
                <th scope="col" className="px-5 py-3.5">Lapisan</th>
                <th scope="col" className="px-5 py-3.5">Target</th>
              </tr>
            </thead>
            <tbody>
              {FASE.map((f, i) => {
                const selesai = i === 0; // F1 hari 1 selesai — Day 1 ✅
                return (
                  <tr
                    key={f.fase}
                    className={`border-b border-[#1b3455]/60 last:border-0 ${selesai ? "bg-[var(--gn-amber-500)]/5" : ""}`}
                  >
                    <td className="px-5 py-3.5">
                      <span className="inline-flex items-center gap-2 font-mono font-bold text-[var(--gn-amber-400)]">
                        {selesai ? (
                          <CheckCircle2 className="h-4 w-4" aria-hidden />
                        ) : (
                          <Circle className="h-4 w-4 text-[#254872]" aria-hidden />
                        )}
                        {f.fase}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 font-mono text-xs text-[#a9bcd6]">{f.hari}</td>
                    <td className="px-5 py-3.5 font-mono text-xs text-[#a9bcd6]">{f.periode}</td>
                    <td className="px-5 py-3.5 font-semibold text-[#e6eef8]">{f.fokus}</td>
                    <td className="px-5 py-3.5 font-mono text-xs text-[#a9bcd6]">{f.lapis}</td>
                    <td className="px-5 py-3.5 font-mono text-xs text-[#a9bcd6]">{f.target}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="mt-5 text-xs leading-relaxed text-[#a9bcd6]">
          <strong className="text-[#e6eef8]">Dokumen desain lengkap</strong> (35 halaman):
          docs/roadmap/gunara-os-roadmap-99-hari.pdf di repo. Checklist harian hidup di
          ROADMAP.md, log eksekusi di WORKLOG.md, skema versi di VERSIONING.md — semuanya satu
          sumber kebenaran.
        </p>
      </section>
    </div>
  );
}
