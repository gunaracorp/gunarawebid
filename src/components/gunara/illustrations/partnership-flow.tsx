/**
 * PartnershipFlow — Diagram alur kemitraan empat langkah.
 * Pemetaan → Arsitektur → Eksekusi → Evolusi, dengan jalur ulang review siklis.
 * Satu-satunya diagram adaptif tema: warna memakai CSS variable (terang/gelap).
 */

const LANGKAH = [
  { n: "01", judul: "Pemetaan", sub: "DIAGNOSA · BASELINE INDEKS" },
  { n: "02", judul: "Arsitektur", sub: "STRUKTUR MINIMUM TEPAT" },
  { n: "03", judul: "Eksekusi", sub: "DOKUMEN · SISTEM · WEBSITE" },
  { n: "04", judul: "Evolusi", sub: "REVIEW · BELAJAR · NAIK" },
];

const CXS = [140, 360, 580, 800];
const NODE_W = 190;
const NODE_H = 112;
const NY = 72; // y atas node

export function PartnershipFlow() {
  return (
    <figure className="mx-auto max-w-6xl">
      <div className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-xl shadow-black/5 dark:shadow-black/30">
        <svg
          viewBox="0 0 920 330"
          role="img"
          aria-labelledby="flow-title flow-desc"
          className="block h-auto w-full"
        >
          <title id="flow-title">Alur kemitraan empat langkah</title>
          <desc id="flow-desc">
            Empat langkah kemitraan: pemetaan, arsitektur, eksekusi, evolusi — diakhiri jalur ulang
            review siklis: indeks naik, organisme belajar, siklus berputar kembali ke pemetaan.
          </desc>

          {/* header */}
          <text x="40" y="38" className="font-mono" fontSize="10" fontWeight="700" letterSpacing="2.5" fill="var(--muted-foreground)">
            ALUR KEMITRAAN — EMPAT LANGKAH · SATU SIKLUS
          </text>
          <text x="880" y="38" textAnchor="end" className="font-mono" fontSize="8.5" letterSpacing="2" fill="var(--muted-foreground)">
            STRUKTUR DULU · BARU KARYA
          </text>

          {/* konektor antar node */}
          {[0, 1, 2].map((i) => {
            const x1 = CXS[i] + NODE_W / 2 + 4;
            const x2 = CXS[i + 1] - NODE_W / 2 - 8;
            const mid = (x1 + x2) / 2;
            return (
              <g key={i}>
                <line
                  x1={x1}
                  y1={NY + NODE_H / 2}
                  x2={x2}
                  y2={NY + NODE_H / 2}
                  stroke="var(--gn-amber-500)"
                  strokeOpacity="0.75"
                  strokeWidth="1.6"
                  strokeDasharray="5 5"
                  className="dash-flow"
                />
                <path
                  d={`M${x2 - 7} ${NY + NODE_H / 2 - 5} L${x2 + 1} ${NY + NODE_H / 2} L${x2 - 7} ${NY + NODE_H / 2 + 5}`}
                  fill="none"
                  className="diag-amber-stroke"
                  strokeWidth="1.6"
                />
                {/* waypoint belah ketupat */}
                <rect
                  x={mid - 4.5}
                  y={NY + NODE_H / 2 - 4.5}
                  width="9"
                  height="9"
                  transform={`rotate(45 ${mid} ${NY + NODE_H / 2})`}
                  fill="var(--card)"
                  className="diag-amber-stroke"
                  strokeWidth="1.3"
                />
              </g>
            );
          })}

          {/* empat node langkah */}
          {LANGKAH.map((l, i) => {
            const cx = CXS[i];
            const x = cx - NODE_W / 2;
            return (
              <g key={l.n}>
                <rect x={x} y={NY} width={NODE_W} height={NODE_H} rx="14" fill="var(--card)" stroke="var(--border)" />
                <rect x={x} y={NY} width={NODE_W} height={NODE_H} rx="14" fill="none" className="diag-amber-stroke" strokeOpacity="0.28" />
                <text x={cx} y={NY + 34} textAnchor="middle" className="diag-amber font-display" fontSize="19" fontWeight="700">
                  {l.n}
                </text>
                <text x={cx} y={NY + 62} textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--foreground)">
                  {l.judul}
                </text>
                <text x={cx} y={NY + 82} textAnchor="middle" className="font-mono" fontSize="7.5" letterSpacing="1.2" fill="var(--muted-foreground)">
                  {l.sub}
                </text>
                <text x={cx} y={NY + 100} textAnchor="middle" className="font-mono" fontSize="6.5" letterSpacing="2" fill="var(--muted-foreground)" opacity="0.7">
                  {`LANGKAH ${l.n}`}
                </text>
              </g>
            );
          })}

          {/* jalur ulang review siklis */}
          <path
            d="M 800 196 L 800 238 Q 800 250 788 250 L 152 250 Q 140 250 140 238 L 140 202"
            fill="none"
            stroke="var(--muted-foreground)"
            strokeOpacity="0.75"
            strokeWidth="1.3"
            strokeDasharray="4 6"
          />
          <path d="M135 210 140 200 145 210" fill="none" stroke="var(--muted-foreground)" strokeWidth="1.3" />
          <rect x="308" y="238" width="324" height="24" rx="8" fill="var(--card)" stroke="var(--border)" />
          <text x="470" y="254" textAnchor="middle" className="font-mono" fontSize="8" letterSpacing="1.5" fill="var(--muted-foreground)">
            REVIEW SIKLIS — INDEKS NAIK · ORGANISME BELAJAR
          </text>

          <text x="40" y="308" className="font-mono" fontSize="8" letterSpacing="2" fill="var(--muted-foreground)" opacity="0.75">
            UMEA™ ASSESSMENT → G-DOS → UWA-7 → REVIEW
          </text>
          <text x="880" y="308" textAnchor="end" className="font-mono" fontSize="8" letterSpacing="2" fill="var(--muted-foreground)" opacity="0.75">
            GUNARA · PARTNERSHIP BLUEPRINT
          </text>
        </svg>
      </div>
      <figcaption className="mt-4 text-center font-mono text-[10px] tracking-[0.18em] text-muted-foreground">
        GBR. 05 — ALUR KEMITRAAN: SETIAP SIKLUS DIMULAI DARI PEMETAAN, BUKAN TEBAKAN
      </figcaption>
    </figure>
  );
}
