/**
 * Uwa7Blueprint — Diagram arsitektur web tujuh lapis (UWA-7).
 * Tumpukan tujuh lapis di tengah; jalur MESIN dari kiri (crawl → index → rank)
 * dan jalur MANUSIA dari kanan (rasa, nilai, kepercayaan); strip siklus organisme
 * Create → … → Repeat di bawah. Server component, panel gelap tetap.
 */

const LAPIS = [
  { n: "I", nama: "Alam Fisik", esensi: "Satu kodebase hidup di web, mobile, tablet, desktop, PWA." },
  { n: "II", nama: "Akal", esensi: "Semantic HTML — mesin memahami WHO, WHAT, WHEN, HOW." },
  { n: "III", nama: "Ilmu", esensi: "Structured data JSON-LD — mengajari mesin makna halaman." },
  { n: "IV", nama: "Penglihatan", esensi: "Crawl architecture — sitemap, robots, canonical, URL bersih." },
  { n: "V", nama: "Rahmah", esensi: "Manusia senang memakainya: cepat, jelas, aksesibel." },
  { n: "VI", nama: "Otoritas", esensi: "Kepercayaan: karya orisinal, penulis jelas, entitas nyata." },
  { n: "VII", nama: "Waktu", esensi: "Website adalah organisme: ukur, belajar, perbaiki, ulangi." },
];

const SIKLUS = ["CREATE", "CRAWL", "INDEX", "RANK", "MEASURE", "LEARN", "IMPROVE", "REPEAT"];

export function Uwa7Blueprint() {
  const sx = 270;
  const sw = 360;
  const sh = 48;
  const y0 = 104;
  const step = 58;

  return (
    <figure className="mx-auto max-w-6xl">
      <div className="relative overflow-hidden rounded-3xl border border-[#1b3455] bg-[#0a1628] shadow-2xl shadow-black/30">
        <div className="bg-blueprint bg-blueprint-fade absolute inset-0" aria-hidden />
        <svg
          viewBox="0 0 900 620"
          role="img"
          aria-labelledby="uwa-title uwa-desc"
          className="relative block h-auto w-full"
        >
          <title id="uwa-title">Arsitektur web tujuh lapis UWA-7</title>
          <desc id="uwa-desc">
            Tujuh lapis UWA-7 dari Alam Fisik hingga Waktu. Jalur mesin masuk melalui lapis Penglihatan
            lalu naik ke lapis Ilmu; jalur manusia menuju lapis Alam Fisik dan Rahmah. Di bawah, siklus
            organisme: create, crawl, index, rank, measure, learn, improve, repeat.
          </desc>

          {/* header */}
          <text x="40" y="48" className="font-mono" fontSize="11" fontWeight="700" letterSpacing="3" fill="#5c87b8">
            UWA-7 · ARSITEKTUR WEB TUJUH LAPIS
          </text>
          <text x="40" y="68" fontSize="9.5" fill="#a9bcd6">
            Satu organisme — dibaca mesin · dirasakan manusia · dipercayai sistem
          </text>
          <rect x="640" y="34" width="220" height="28" rx="8" fill="#060d1f" stroke="#254872" />
          <text x="750" y="52" textAnchor="middle" className="font-mono" fontSize="8" letterSpacing="1" fill="#fbbf24">
            VISIBILITAS = F(8 FAKTOR)
          </text>

          {/* jalur mesin (kiri) */}
          <g className="font-mono">
            <circle cx="128" cy="296" r="17" fill="#060d1f" stroke="#5c87b8" strokeWidth="1.5" />
            <circle cx="122" cy="293" r="2.2" fill="#a9bcd6" />
            <circle cx="134" cy="293" r="2.2" fill="#a9bcd6" />
            <path d="M122 302q6 4 12 0" fill="none" stroke="#a9bcd6" strokeWidth="1.3" />
            <line x1="128" y1="279" x2="128" y2="271" stroke="#5c87b8" strokeWidth="1.5" />
            <circle cx="128" cy="269" r="2.5" fill="#f59e0b" />
            <text x="128" y="336" textAnchor="middle" fontSize="9" fontWeight="700" letterSpacing="2.5" fill="#5c87b8">
              MESIN
            </text>
            <text x="128" y="352" textAnchor="middle" fontSize="8" letterSpacing="1.2" fill="#a9bcd6">
              CRAWL → INDEX → RANK
            </text>
          </g>
          {/* lintasan mesin: masuk lapis IV lalu naik ke lapis III */}
          <path
            d="M148 296 H 244"
            fill="none"
            stroke="#5c87b8"
            strokeWidth="1.4"
            strokeDasharray="4 5"
            className="dash-flow"
          />
          <path d="M238 291 246 296 238 301" fill="none" stroke="#5c87b8" strokeWidth="1.4" />
          <path
            d="M244 296 V 262"
            fill="none"
            stroke="#5c87b8"
            strokeWidth="1.4"
            strokeDasharray="4 5"
            className="dash-flow"
          />
          <path d="M239 270 244 260 249 270" fill="none" stroke="#5c87b8" strokeWidth="1.4" />
          <text x="252" y="256" className="font-mono" fontSize="7.5" letterSpacing="1.5" fill="#5c87b8">
            MAKNA
          </text>

          {/* jalur manusia (kanan) */}
          <g>
            <circle cx="772" cy="176" r="10" fill="#060d1f" stroke="#f59e0b" strokeWidth="1.5" />
            <path d="M756 202q16 -14 32 0" fill="none" stroke="#f59e0b" strokeWidth="1.6" />
            <text x="772" y="226" textAnchor="middle" className="font-mono" fontSize="9" fontWeight="700" letterSpacing="2.5" fill="#5c87b8">
              MANUSIA
            </text>
            <text x="772" y="242" textAnchor="middle" fontSize="8" letterSpacing="1.2" fill="#a9bcd6">
              RASA · NILAI · KEPERCAYAAN
            </text>
          </g>
          <path
            d="M748 190 C 700 170, 680 150, 646 138"
            fill="none"
            stroke="#f59e0b"
            strokeOpacity="0.75"
            strokeWidth="1.4"
            strokeDasharray="4 5"
            className="dash-flow"
          />
          <path d="M654 132 644 137 650 146" fill="none" stroke="#f59e0b" strokeWidth="1.4" />

          {/* tumpukan tujuh lapis */}
          {LAPIS.map((l, i) => {
            const y = y0 + i * step;
            const rahmah = i === 4;
            return (
              <g key={l.n}>
                <rect x={sx} y={y} width={sw} height={sh} rx="10" fill="#060d1f" stroke={rahmah ? "#f59e0b" : "#254872"} strokeWidth={rahmah ? 1.4 : 1.1} />
                <circle cx={sx + 26} cy={y + sh / 2} r="12" fill="#f59e0b" fillOpacity={rahmah ? 0.95 : 0.28} stroke="#f59e0b" strokeOpacity="0.7" />
                <text x={sx + 26} y={y + sh / 2 + 4} textAnchor="middle" className="font-mono" fontSize="8.5" fontWeight="700" fill={rahmah ? "#0a1628" : "#fbbf24"}>
                  {l.n}
                </text>
                <text x={sx + 50} y={y + 21} fontSize="12.5" fontWeight="700" fill="#e6eef8">
                  {l.nama}
                </text>
                <text x={sx + 50} y={y + 37} fontSize="8.5" fill="#a9bcd6">
                  {l.esensi}
                </text>
                {rahmah ? (
                  <g className="font-mono">
                    <rect x={sx + sw - 46} y={y + 14} width="34" height="20" rx="6" fill="#f59e0b" />
                    <text x={sx + sw - 29} y={y + 27.5} textAnchor="middle" fontSize="8" fontWeight="700" fill="#0a1628">
                      CWV
                    </text>
                  </g>
                ) : null}
              </g>
            );
          })}

          {/* siklus organisme */}
          {SIKLUS.map((s, i) => {
            const x = 45 + i * 102;
            const last = i === SIKLUS.length - 1;
            return (
              <g key={s}>
                <rect x={x} y="540" width="96" height="30" rx="8" fill="#0a1628" stroke={last ? "#f59e0b" : "#1b3455"} />
                <text x={x + 48} y="559.5" textAnchor="middle" className="font-mono" fontSize="8" letterSpacing="1" fill={last ? "#fbbf24" : "#a9bcd6"}>
                  {s}
                </text>
                {!last ? <path d={`M${x + 100} 555h5l-3 3Z`} fill="#5c87b8" /> : null}
              </g>
            );
          })}
          {/* busur ulang: REPEAT → CREATE */}
          <path
            d="M 855 536 C 855 508, 141 508, 141 536"
            fill="none"
            stroke="#254872"
            strokeWidth="1.3"
            strokeDasharray="3 6"
          />
          <path d="M136 528 141 538 146 528" fill="none" stroke="#254872" strokeWidth="1.3" />

          <text x="450" y="598" textAnchor="middle" className="font-mono" fontSize="9" fontWeight="700" letterSpacing="2.5" fill="#5c87b8">
            WEBSITE BUKAN PROYEK — WEBSITE ADALAH ORGANISME
          </text>
        </svg>
      </div>
      <figcaption className="mt-4 text-center font-mono text-[10px] tracking-[0.18em] text-muted-foreground">
        GBR. 04 — UWA-7: TUJUH LAPIS YANG DIBACA MESIN, DIRASAKAN MANUSIA, DAN TERUS BEREVOLUSI
      </figcaption>
    </figure>
  );
}
