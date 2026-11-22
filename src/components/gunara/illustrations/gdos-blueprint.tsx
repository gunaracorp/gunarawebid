/**
 * GdosBlueprint — Diagram arsitektur referensi G-DOS.
 * Enam lapis tumpukan (Knowledge → Control) terhubung ke satu bus vertikal
 * yang bermuara di Gugun Command Center, ditutup strip pipeline otomasi.
 * Server component, panel gelap tetap (blueprint navy-amber).
 */

const LAPIS = [
  { nama: "Knowledge", desc: "Notion — otak pengetahuan", tag: "LAPIS 01" },
  { nama: "Work", desc: "ClickUp — mesin eksekusi", tag: "LAPIS 02" },
  { nama: "Assets", desc: "Google Drive — lemari arsip", tag: "LAPIS 03" },
  { nama: "System", desc: "GitHub + Vercel — pabrik web", tag: "LAPIS 04" },
  { nama: "Data", desc: "Supabase — sumber data", tag: "LAPIS 05" },
  { nama: "Control", desc: "Cloudflare + 1Password — benteng", tag: "LAPIS 06" },
];

const PIPELINE = ["KNOWLEDGE", "WORK", "ASSETS", "DATA", "AUTOMATION", "OBSERVABILITY"];

/** glyph abstrak 24×24 per lapis, digambar pada translate(x y) */
function Glyph({ index }: { index: number }) {
  const c = "#fbbf24";
  switch (index) {
    case 0: // Knowledge — sinapsis
      return (
        <g fill="none" stroke={c} strokeWidth="1.6">
          <circle cx="12" cy="7" r="3" />
          <circle cx="7" cy="17" r="3" />
          <circle cx="17" cy="17" r="3" />
          <path d="M10 9.5 8.5 14.5M14 9.5l1.5 5M10 17h4" />
        </g>
      );
    case 1: // Work — bilah eksekusi
      return (
        <g stroke={c} strokeWidth="2.4" strokeLinecap="round">
          <path d="M6 8h12M6 13h9M6 18h6" />
        </g>
      );
    case 2: // Assets — map arsip
      return (
        <g fill="none" stroke={c} strokeWidth="1.6">
          <path d="M4 8V6.5A1.5 1.5 0 0 1 5.5 5H9l2 2.5h7A1.5 1.5 0 0 1 19.5 9V17A1.5 1.5 0 0 1 18 18.5H5.5A1.5 1.5 0 0 1 4 17Z" />
          <path d="M4 11.5h15.5" />
        </g>
      );
    case 3: // System — bracket kode
      return (
        <g fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round">
          <path d="M9 6 4 12l5 6M15 6l5 6-5 6" />
        </g>
      );
    case 4: // Data — silinder basis data
      return (
        <g fill="none" stroke={c} strokeWidth="1.6">
          <ellipse cx="12" cy="6.5" rx="7" ry="2.8" />
          <path d="M5 6.5v11c0 1.6 3.1 2.8 7 2.8s7-1.2 7-2.8v-11M5 12c0 1.6 3.1 2.8 7 2.8s7-1.2 7-2.8" />
        </g>
      );
    default: // Control — perisai
      return (
        <g fill="none" stroke={c} strokeWidth="1.7">
          <path d="M12 4 19 6.5v5.2c0 4.6-3 7.4-7 8.8-4-1.4-7-4.2-7-8.8V6.5Z" />
          <path d="m9 11.5 2.2 2.2L15.5 9.5" />
        </g>
      );
  }
}

export function GdosBlueprint() {
  const busX = 434;
  const layerY = (i: number) => 104 + i * 68;

  return (
    <figure className="mx-auto max-w-6xl">
      <div className="relative overflow-hidden rounded-3xl border border-[#1b3455] bg-[#0a1628] shadow-2xl shadow-black/30">
        <div className="bg-blueprint bg-blueprint-fade absolute inset-0" aria-hidden />
        <svg
          viewBox="0 0 900 620"
          role="img"
          aria-labelledby="gdos-title gdos-desc"
          className="relative block h-auto w-full"
        >
          <title id="gdos-title">Arsitektur referensi G-DOS</title>
          <desc id="gdos-desc">
            Enam lapis tumpukan G-DOS — Knowledge, Work, Assets, System, Data, Control — masing-masing
            terhubung ke satu bus vertikal yang bermuara di Gugun Command Center. Strip bawah menunjukkan
            pipeline otomasi: Knowledge, Work, Assets, Data, Automation, Observability.
          </desc>

          {/* header */}
          <text x="40" y="48" className="font-mono" fontSize="11" fontWeight="700" letterSpacing="3" fill="#5c87b8">
            G-DOS · ARSITEKTUR REFERENSI
          </text>
          <text x="40" y="68" fontSize="9.5" fill="#a9bcd6">
            Enam lapis · satu otak · satu sumber kebenaran
          </text>
          {/* chip DNA saling mengunci */}
          <g className="font-mono">
            <rect x="600" y="34" width="122" height="28" rx="8" fill="#060d1f" stroke="#254872" />
            <text x="661" y="52" textAnchor="middle" fontSize="8" letterSpacing="1" fill="#a9bcd6">
              DNA-01 · LIFE OS
            </text>
            <rect x="736" y="34" width="122" height="28" rx="8" fill="#060d1f" stroke="#254872" />
            <text x="797" y="52" textAnchor="middle" fontSize="8" letterSpacing="1" fill="#a9bcd6">
              DNA-02 · WEB OS
            </text>
            {/* gembok pengunci di antara dua DNA */}
            <g stroke="#fbbf24" strokeWidth="1.5" fill="none">
              <rect x="731.5" y="50" width="9" height="7" rx="1.5" />
              <path d="M733.5 50v-2.4a2.5 2.5 0 0 1 5 0V50" />
            </g>
          </g>

          {/* bus vertikal */}
          <line x1={busX} y1="128" x2={busX} y2="452" stroke="#254872" strokeWidth="2" />
          {LAPIS.map((l, i) => {
            const y = layerY(i) + 28;
            return (
              <g key={l.tag}>
                <line x1="400" y1={y} x2={busX} y2={y} stroke="#254872" strokeWidth="1.2" />
                <circle cx={busX} cy={y} r="3.5" fill="#f59e0b" />
              </g>
            );
          })}
          {/* bus → command center */}
          <line x1={busX} y1="300" x2="516" y2="300" stroke="#f59e0b" strokeWidth="1.6" strokeDasharray="5 5" className="dash-flow" />
          <path d="M508 295 518 300 508 305" fill="none" stroke="#f59e0b" strokeWidth="1.6" />

          {/* enam lapis */}
          {LAPIS.map((l, i) => {
            const y = layerY(i);
            return (
              <g key={l.nama}>
                <rect x="40" y={y} width="360" height="56" rx="12" fill="#060d1f" stroke="#1b3455" />
                <rect x="54" y={y + 13} width="30" height="30" rx="8" fill="#0a1628" stroke="#254872" />
                <g transform={`translate(57 ${y + 16}) scale(1.0)`}>
                  <Glyph index={i} />
                </g>
                <text x="98" y={y + 25} fontSize="13" fontWeight="700" fill="#e6eef8">
                  {l.nama}
                </text>
                <text x="98" y={y + 42} fontSize="9" fill="#a9bcd6">
                  {l.desc}
                </text>
                <text x="388" y={y + 32} textAnchor="end" className="font-mono" fontSize="8" letterSpacing="2" fill="#5c87b8">
                  {l.tag}
                </text>
              </g>
            );
          })}

          {/* command center */}
          <rect x="520" y="215" width="340" height="170" rx="16" fill="#060d1f" stroke="#f59e0b" strokeOpacity="0.75" />
          <rect x="532" y="227" width="316" height="146" rx="12" fill="none" stroke="#1b3455" strokeDasharray="3 6" />
          <text x="690" y="258" textAnchor="middle" className="font-display" fontSize="15" fontWeight="700" fill="#e6eef8">
            Gugun Command Center
          </text>
          <text x="690" y="276" textAnchor="middle" className="font-mono" fontSize="8" letterSpacing="2.5" fill="#fbbf24">
            COCKPIT EKSEKUSI HARIAN
          </text>
          {["PRIORITAS HARI INI", "BISNIS & KERAKAAN DIGITAL", "PENGETAHUAN & DOKUMEN", "KESEHATAN SISTEM"].map(
            (t, i) => (
              <g key={t}>
                <circle cx="556" cy={298 + i * 20} r="2.5" fill="#f59e0b" />
                <text x="568" y={301.5 + i * 20} fontSize="9.5" fill="#a9bcd6">
                  {t}
                </text>
              </g>
            ),
          )}
          {/* radar halus di sudut kanan panel */}
          <g fill="none" stroke="#1b3455">
            <circle cx="812" cy="348" r="14" />
            <circle cx="812" cy="348" r="26" />
            <path d="M812 322v52M786 348h52" strokeDasharray="2 4" />
            <circle cx="812" cy="348" r="3" fill="#f59e0b" stroke="none" />
          </g>

          {/* strip pipeline otomasi */}
          {PIPELINE.map((p, i) => {
            const x = 40 + i * 138;
            const last = i === PIPELINE.length - 1;
            return (
              <g key={p}>
                <rect x={x} y="532" width="122" height="34" rx="8" fill="#0a1628" stroke={last ? "#f59e0b" : "#1b3455"} />
                <text x={x + 61} y="553" textAnchor="middle" className="font-mono" fontSize={p.length > 10 ? "8" : "8.5"} letterSpacing="1" fill={last ? "#fbbf24" : "#a9bcd6"}>
                  {p}
                </text>
                {!last ? <path d={`M${x + 126} 549h6l-3 3Z`} fill="#5c87b8" /> : null}
              </g>
            );
          })}

          <text x="860" y="596" textAnchor="end" className="font-mono" fontSize="8.5" letterSpacing="2" fill="#5c87b8">
            CONNECT ONLY WHERE VALUE &gt; COMPLEXITY
          </text>
          <text x="40" y="596" className="font-mono" fontSize="8.5" letterSpacing="2" fill="#254872">
            GUNARA-OS · DIGITAL OS
          </text>
        </svg>
      </div>
      <figcaption className="mt-4 text-center font-mono text-[10px] tracking-[0.18em] text-muted-foreground">
        GBR. 02 — ARSITEKTUR G-DOS: ENAM LAPIS DI SATU BUS, BERMUARA DI SATU COCKPIT
      </figcaption>
    </figure>
  );
}
