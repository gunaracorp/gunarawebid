/**
 * UmeaBlueprint — Diagram struktur organisasi UMEA™.
 * Kiri: ziggurat enam tingkat (UMEA-03 → UMEA-21) dengan intensitas amber
 * meningkat ke bawah. Kanan: tujuh pilar kategori fungsi kritis di bawah
 * balok FUNCTION-FIRST. Bawah: pita UMEA Maturity Index™ 8 band, skor 0–100.
 * Server component, panel gelap tetap (blueprint navy-amber).
 */

const TINGKAT = [
  { kode: "UMEA-03", nama: "Sel Survival", w: 150 },
  { kode: "UMEA-05", nama: "Sel Peluncuran", w: 190 },
  { kode: "UMEA-07", nama: "Organisasi Inti", w: 230 },
  { kode: "UMEA-10", nama: "Organisasi Operasional", w: 275 },
  { kode: "UMEA-15", nama: "Organisasi Skala", w: 325 },
  { kode: "UMEA-21", nama: "Organisasi Tangguh", w: 380 },
];

const PILAR = ["Direction", "Value Creation", "Market", "Control", "People", "Intelligence", "Resilience"];
const OPACITY = [0.16, 0.3, 0.46, 0.62, 0.79, 0.96];

export function UmeaBlueprint() {
  const cx = 240;
  const y0 = 118;
  const barH = 50;
  const gap = 9;

  return (
    <figure className="mx-auto max-w-6xl">
      <div className="relative overflow-hidden rounded-3xl border border-[#1b3455] bg-[#0a1628] shadow-2xl shadow-black/30">
        <div className="bg-blueprint bg-blueprint-fade absolute inset-0" aria-hidden />
        <svg
          viewBox="0 0 900 620"
          role="img"
          aria-labelledby="umea-title umea-desc"
          className="relative block h-auto w-full"
        >
          <title id="umea-title">Struktur organisasi UMEA™</title>
          <desc id="umea-desc">
            Ziggurat enam tingkat organisasi UMEA dari UMEA-03 Sel Survival hingga UMEA-21 Organisasi
            Tangguh; tujuh pilar kategori fungsi kritis — Direction, Value Creation, Market, Control,
            People, Intelligence, Resilience — menopang balok function-first; pita indeks kematangan
            UMEA dengan delapan band, skor 0 sampai 100.
          </desc>

          {/* header */}
          <text x="40" y="48" className="font-mono" fontSize="11" fontWeight="700" letterSpacing="3" fill="#5c87b8">
            UMEA™ · STRUKTUR ORGANISASI TANGGUH
          </text>
          <text x="40" y="68" fontSize="9.5" fill="#a9bcd6">
            6 tingkat organisasi · 21 fungsi kritis · 7 kategori — function-first, bukan title-first
          </text>
          {/* tiga hukum besar */}
          <g className="font-mono">
            {["CAKUPAN", "PEMISAHAN", "KONTINUITAS"].map((h, i) => {
              const x = 620 + i * 92;
              return (
                <g key={h}>
                  <rect x={x} y="36" width="84" height="26" rx="7" fill="#060d1f" stroke="#254872" />
                  <text x={x + 42} y="53" textAnchor="middle" fontSize="7.5" letterSpacing="1" fill="#fbbf24">
                    {h}
                  </text>
                </g>
              );
            })}
            <text x="884" y="78" textAnchor="end" fontSize="7.5" letterSpacing="2" fill="#5c87b8">
              TIGA HUKUM BESAR MENJAGA SETIAP TINGKAT
            </text>
          </g>

          {/* ziggurat */}
          {TINGKAT.map((t, i) => {
            const y = y0 + i * (barH + gap);
            const x = cx - t.w / 2;
            const gelap = i >= 3;
            return (
              <g key={t.kode}>
                <rect x={x} y={y} width={t.w} height={barH} rx={i === 0 ? 10 : 8} fill="#f59e0b" fillOpacity={OPACITY[i]} stroke="#f59e0b" strokeOpacity={gelap ? 0.9 : 0.5} />
                <text x={x + 14} y={y + 29.5} className="font-mono" fontSize="11" fontWeight="700" letterSpacing="1" fill={gelap ? "#0a1628" : "#fbbf24"}>
                  {t.kode}
                </text>
                {gelap ? (
                  <text x={x + t.w - 14} y={y + 29.5} textAnchor="end" fontSize="10.5" fontWeight="600" fill="#0a1628">
                    {t.nama}
                  </text>
                ) : (
                  <text x={x + t.w + 12} y={y + 29.5} fontSize="10.5" fontWeight="600" fill="#a9bcd6">
                    {t.nama}
                  </text>
                )}
              </g>
            );
          })}
          <text x={cx} y="505" textAnchor="middle" className="font-mono" fontSize="8.5" letterSpacing="2" fill="#5c87b8">
            KOMPLEKSITAS MINIMUM YANG TEPAT
          </text>

          {/* pilar fungsi kritis */}
          <text x="694" y="112" textAnchor="middle" className="font-mono" fontSize="9" fontWeight="700" letterSpacing="2.5" fill="#5c87b8">
            21 FUNGSI KRITIS · 7 KATEGORI
          </text>
          <rect x="514" y="124" width="360" height="18" rx="6" fill="#060d1f" stroke="#254872" />
          <text x="694" y="137" textAnchor="middle" className="font-mono" fontSize="8" letterSpacing="1.5" fill="#fbbf24">
            FUNCTION-FIRST
          </text>
          {PILAR.map((p, i) => {
            const x = 520 + i * 51;
            return (
              <g key={p}>
                <rect x={x} y="152" width="42" height="266" rx="8" fill="#0a1628" stroke="#254872" />
                <rect x={x} y="152" width="42" height="10" rx="5" fill="#f59e0b" fillOpacity={0.35 + i * 0.09} />
                <text
                  transform={`rotate(-90 ${x + 21} 285)`}
                  x={x + 21}
                  y="285"
                  textAnchor="middle"
                  className="font-mono"
                  fontSize="8.5"
                  letterSpacing="2"
                  fill="#a9bcd6"
                >
                  {p.toUpperCase()}
                </text>
                <circle cx={x + 21} cy="440" r="2.5" fill="#5c87b8" />
              </g>
            );
          })}
          {/* garis tanah */}
          <line x1="50" y1="470" x2="874" y2="470" stroke="#254872" strokeWidth="1.4" />
          <text x={cx} y="486" textAnchor="middle" className="font-mono" fontSize="7.5" letterSpacing="2" fill="#254872">
            FONDASI: HUKUM MINIMUM USAHA™
          </text>

          {/* pita indeks kematangan */}
          <text x="40" y="522" className="font-mono" fontSize="9" fontWeight="700" letterSpacing="2.5" fill="#5c87b8">
            UMEA MATURITY INDEX™ — 8 BAND · SKOR 0–100
          </text>
          {Array.from({ length: 8 }).map((_, i) => {
            const x = 40 + i * 103;
            return (
              <g key={i}>
                <rect x={x} y="532" width="99" height="30" rx="6" fill="#f59e0b" fillOpacity={0.08 + i * 0.045} stroke="#1b3455" />
                <text x={x + 49.5} y="551" textAnchor="middle" className="font-mono" fontSize="7.5" letterSpacing="1" fill="#a9bcd6">
                  {`B${i + 1}`}
                </text>
              </g>
            );
          })}
          {["0", "25", "50", "75", "100"].map((t, i) => (
            <text key={t} x={40 + i * 205} y="580" textAnchor="middle" className="font-mono" fontSize="8" fill="#5c87b8">
              {t}
            </text>
          ))}
          <text x="860" y="600" textAnchor="end" className="font-mono" fontSize="8.5" letterSpacing="2" fill="#5c87b8">
            ORGANISASI DINILAI DARI FUNGSI KRITIS YANG TETAP HIDUP
          </text>
          <text x="40" y="600" className="font-mono" fontSize="8.5" letterSpacing="2" fill="#254872">
            UMEA™ PROPRIETARY
          </text>
        </svg>
      </div>
      <figcaption className="mt-4 text-center font-mono text-[10px] tracking-[0.18em] text-muted-foreground">
        GBR. 03 — UMEA™: NAIK TINGKAT DARI SEL SURVIVAL MENUJU ORGANISASI TANGGUH
      </figcaption>
    </figure>
  );
}
