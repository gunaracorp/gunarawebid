/**
 * EcosystemOrbit — Peta orbit ekosistem Gunara.
 * Satu otak (gunara.web.id) di pusat, 11 organ mengelilingi dua cincin:
 * cincin dalam = organ aktif, cincin luar = organ dalam pembangunan.
 * Gaya blueprint navy-amber, panel gelap tetap (konsisten dgn panel hero).
 * Server component — animasi halus via CSS, menghormati reduced-motion.
 */

const CX = 460;
const CY = 330;
const R_INNER = 150;
const R_OUTER = 232;

/** posisi node pada sudut θ (derajat, 0 = atas, searah jarum jam) */
function polar(r: number, deg: number) {
  const rad = (deg * Math.PI) / 180;
  return { x: CX + r * Math.sin(rad), y: CY - r * Math.cos(rad) };
}

const AKTIF = [
  { deg: 0, domain: "digiman.id", peran: "GUNARA OS" },
  { deg: 120, domain: "gconsultant.web.id", peran: "UMEA™" },
  { deg: 240, domain: "muhdin.id", peran: "MUHDIN INDONESIA" },
];

const BANGUN = [
  { deg: 22.5, domain: "kopnusa.id" },
  { deg: 67.5, domain: "juraganwebsite.web.id" },
  { deg: 112.5, domain: "pppdigital.id" },
  { deg: 157.5, domain: "sertifikasi.arofahajj.com" },
  { deg: 202.5, domain: "arofahajj.com" },
  { deg: 247.5, domain: "topkonsultan.web.id" },
  { deg: 292.5, domain: "pusatperizinan.com" },
  { deg: 337.5, domain: "topmanajemen.biz.id" },
];

/** arah label: node atas → label di atas; node bawah (ring dalam) → di bawah tengah;
 *  selain itu ikuti sisi posisi x: kanan pusat → keluar kanan, kiri pusat → keluar kiri */
function labelPos(deg: number, r: number, below = false) {
  if (deg === 0) return { anchor: "middle" as const, dx: 0, dy: -(r + 26) };
  if (below) return { anchor: "middle" as const, dx: 0, dy: r + 30 };
  if (deg < 180) return { anchor: "start" as const, dx: r + 14, dy: 2 };
  return { anchor: "end" as const, dx: -(r + 14), dy: 2 };
}

export function EcosystemOrbit() {
  const sat1 = polar(R_INNER, 205);
  const sat2 = polar(R_OUTER, 100);

  return (
    <figure className="mx-auto max-w-6xl">
      <div className="relative overflow-hidden rounded-3xl border border-[#1b3455] bg-[#0a1628] shadow-2xl shadow-black/30">
        <div className="bg-blueprint bg-blueprint-fade absolute inset-0" aria-hidden />
        <svg
          viewBox="0 0 920 660"
          role="img"
          aria-labelledby="orbit-title orbit-desc"
          className="relative block h-auto w-full"
        >
          <title id="orbit-title">Peta orbit ekosistem digital Gunara</title>
          <desc id="orbit-desc">
            Diagram orbit: gunara.web.id sebagai pusat kendali, tiga organ aktif pada cincin dalam
            (digiman.id, gconsultant.web.id, muhdin.id), dan delapan organ dalam pembangunan pada
            cincin luar (kopnusa.id, juraganwebsite.web.id, pppdigital.id,
            sertifikasi.arofahajj.com, arofahajj.com, topkonsultan.web.id, pusatperizinan.com,
            topmanajemen.biz.id).
          </desc>

          {/* garis bidik blueprint */}
          <g stroke="#1b3455" strokeWidth="1" opacity="0.55">
            <line x1="90" y1={CY} x2="830" y2={CY} strokeDasharray="1 8" />
            <line x1={CX} y1="92" x2={CX} y2="598" strokeDasharray="1 8" />
          </g>
          <g fill="#254872">
            <path d="M86 330h8M90 326v8" />
            <path d="M826 330h8M830 326v8" />
            <path d="M456 92h8M460 88v8" />
            <path d="M456 598h8M460 594v8" />
          </g>

          {/* cincin orbit berputar pelan + satelit */}
          <g className="orbit-spin" style={{ transformOrigin: `${CX}px ${CY}px` }}>
            <circle cx={CX} cy={CY} r={R_INNER} fill="none" stroke="#254872" strokeWidth="1" strokeDasharray="3 10" />
            <circle cx={sat1.x} cy={sat1.y} r="4" fill="#f59e0b" />
          </g>
          <g className="orbit-spin-fast" style={{ transformOrigin: `${CX}px ${CY}px` }}>
            <circle cx={CX} cy={CY} r={R_OUTER} fill="none" stroke="#1b3455" strokeWidth="1" strokeDasharray="2 9" />
            <circle cx={sat2.x} cy={sat2.y} r="3.5" fill="#5c87b8" />
          </g>

          {/* jari-jari spoke */}
          {AKTIF.map((a) => {
            const p = polar(R_INNER, a.deg);
            return (
              <line
                key={a.domain}
                x1={CX}
                y1={CY}
                x2={p.x}
                y2={p.y}
                stroke="#f59e0b"
                strokeOpacity="0.35"
                strokeDasharray="3 7"
                className="dash-flow"
              />
            );
          })}
          {BANGUN.map((b) => {
            const p = polar(R_OUTER, b.deg);
            return (
              <line
                key={b.domain}
                x1={CX}
                y1={CY}
                x2={p.x}
                y2={p.y}
                stroke="#254872"
                strokeOpacity="0.8"
                strokeDasharray="2 8"
              />
            );
          })}

          {/* pusat kendali */}
          <circle cx={CX} cy={CY} r="78" fill="#060d1f" stroke="#1b3455" />
          <circle cx={CX} cy={CY} r="64" fill="#0a1628" stroke="#f59e0b" strokeWidth="1.5" />
          <circle cx={CX} cy={CY} r="52" fill="none" stroke="#254872" strokeDasharray="2 5" />
          <text x={CX} y={CY - 12} textAnchor="middle" className="font-display" fontSize="30" fontWeight="700" fill="#fbbf24">
            G
          </text>
          <text x={CX} y={CY + 16} textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#e6eef8">
            gunara.web.id
          </text>
          <text x={CX} y={CY + 31} textAnchor="middle" className="font-mono" fontSize="7.5" letterSpacing="2" fill="#5c87b8">
            PUSAT KENDALI
          </text>
          <circle cx={CX + 56} cy={CY - 56} r="4" fill="#f59e0b" />

          {/* organ aktif — cincin dalam */}
          {AKTIF.map((a) => {
            const p = polar(R_INNER, a.deg);
            const l = labelPos(a.deg, 26, a.deg !== 0);
            return (
              <g key={a.domain}>
                <circle cx={p.x} cy={p.y} r="26" fill="#060d1f" stroke="#f59e0b" strokeWidth="1.4" />
                <circle cx={p.x} cy={p.y} r="7" fill="#f59e0b" />
                <circle cx={p.x} cy={p.y} r="12" fill="none" stroke="#f59e0b" strokeOpacity="0.4" />
                <text x={p.x + l.dx} y={p.y + l.dy} textAnchor={l.anchor} fontSize="11.5" fontWeight="700" fill="#e6eef8">
                  {a.domain}
                </text>
                <text
                  x={p.x + l.dx}
                  y={p.y + l.dy + 14}
                  textAnchor={l.anchor}
                  className="font-mono"
                  fontSize="8"
                  letterSpacing="1.5"
                  fill="#fbbf24"
                >
                  {a.peran}
                </text>
              </g>
            );
          })}

          {/* organ pembangunan — cincin luar */}
          {BANGUN.map((b) => {
            const p = polar(R_OUTER, b.deg);
            const l = labelPos(b.deg, 20);
            return (
              <g key={b.domain}>
                <circle cx={p.x} cy={p.y} r="20" fill="#060d1f" stroke="#254872" strokeWidth="1.3" />
                <circle cx={p.x} cy={p.y} r="5.5" fill="none" stroke="#5c87b8" strokeWidth="1.5" />
                <text x={p.x + l.dx} y={p.y + l.dy} textAnchor={l.anchor} fontSize="10.5" fontWeight="600" fill="#a9bcd6">
                  {b.domain}
                </text>
                <text
                  x={p.x + l.dx}
                  y={p.y + l.dy + 13}
                  textAnchor={l.anchor}
                  className="font-mono"
                  fontSize="7.5"
                  letterSpacing="1.5"
                  fill="#5c87b8"
                >
                  PEMBANGUNAN
                </text>
              </g>
            );
          })}

          {/* anotasi sudut */}
          <text x="36" y="46" className="font-mono" fontSize="11" fontWeight="700" letterSpacing="3" fill="#5c87b8">
            PETA ORBIT EKOSISTEM
          </text>
          <text x="36" y="66" fontSize="9.5" fill="#a9bcd6">
            01 otak · 11 organ · 01 infrastruktur bersama — nol duplikasi
          </text>
          <text x="884" y="46" textAnchor="end" className="font-mono" fontSize="10" letterSpacing="2.5" fill="#5c87b8">
            GUNARA.WEB.ID · COMMAND CENTER
          </text>
          <text x="884" y="66" textAnchor="end" fontSize="9.5" fill="#a9bcd6">
            Skala: Nusantara → Global
          </text>

          {/* legenda */}
          <g>
            <rect x="36" y="588" width="228" height="52" rx="10" fill="#060d1f" stroke="#1b3455" />
            <circle cx="54" cy="606" r="4.5" fill="#f59e0b" />
            <text x="66" y="609.5" fontSize="9.5" fontWeight="600" fill="#e6eef8">
              Aktif — 3 organ hidup
            </text>
            <circle cx="54" cy="626" r="4.5" fill="none" stroke="#5c87b8" strokeWidth="1.4" />
            <text x="66" y="629.5" fontSize="9.5" fontWeight="600" fill="#a9bcd6">
              Pembangunan — 8 organ menyusul
            </text>
          </g>
          <text x="884" y="606" textAnchor="end" className="font-mono" fontSize="8.5" letterSpacing="2" fill="#5c87b8">
            ARSITEKTUR: SATU OTAK · BANYAK PINTU
          </text>
          <text x="884" y="624" textAnchor="end" className="font-mono" fontSize="8.5" letterSpacing="2" fill="#254872">
            GUNARA-OS v1.1.0.3
          </text>
        </svg>
      </div>
      <figcaption className="mt-4 text-center font-mono text-[10px] tracking-[0.18em] text-muted-foreground">
        GBR. 01 — PETA ORBIT EKOSISTEM: SETIAP ORGAN SATU FUNGSI, SATU INFRASTRUKTUR
      </figcaption>
    </figure>
  );
}
