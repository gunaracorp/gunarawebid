/**
 * VaultBlueprint — Benteng Dua Zona: arsitektur isolasi situs publik vs internal.
 * Dunia luar (pengguna, crawler) → Situs Publik (10 halaman) → Middleware Gate
 * (sesi 12 jam, kunci env) → Internal Vault (dashboard, identitas, dokumen, roadmap).
 * Jalur crawler menuju vault ditolak: robots + noindex. Hanya arsitektur — tanpa rahasia.
 * Server component khusus area internal, panel gelap tetap.
 */

const PUBLIK = ["BERANDA", "METODOLOGI", "LAYANAN", "EKOSISTEM", "TENTANG", "KONTAK", "FAQ", "PRIVACY", "TERMS", "COOKIES"];
const VAULT = ["DASHBOARD", "IDENTITAS & LOGO", "VAULT DOKUMEN", "ROADMAP 99 HARI"];

export function VaultBlueprint() {
  return (
    <figure className="mx-auto">
      <div className="relative overflow-hidden rounded-3xl border border-[#1b3455] bg-[#0a1628] shadow-2xl shadow-black/30">
        <div className="bg-blueprint bg-blueprint-fade absolute inset-0" aria-hidden />
        <svg
          viewBox="0 0 920 430"
          role="img"
          aria-labelledby="vault-title vault-desc"
          className="relative block h-auto w-full"
        >
          <title id="vault-title">Benteng dua zona — isolasi publik dan internal</title>
          <desc id="vault-desc">
            Pengguna dan crawler berada di dunia luar. Keduanya dapat membaca situs publik sepuluh
            halaman. Menuju internal vault harus melewati middleware gate dengan sesi dua belas jam
            dan kunci environment. Jalur crawler ditolak lewat robots dan noindex; berkas vault
            disajikan lewat API gated.
          </desc>

          {/* header */}
          <text x="40" y="44" className="font-mono" fontSize="11" fontWeight="700" letterSpacing="3" fill="#5c87b8">
            BENTENG DUA ZONA — ARSITEKTUR ISOLASI
          </text>
          <text x="40" y="64" fontSize="9.5" fill="#a9bcd6">
            Publik melayani client · vault hanya untuk arsitek
          </text>
          <text x="880" y="44" textAnchor="end" className="font-mono" fontSize="10" letterSpacing="2.5" fill="#5c87b8">
            G-DOS · SECURITY BLUEPRINT
          </text>

          {/* zona dunia luar */}
          <rect x="30" y="90" width="180" height="240" rx="14" fill="#060d1f" stroke="#1b3455" />
          <text x="120" y="118" textAnchor="middle" className="font-mono" fontSize="9" fontWeight="700" letterSpacing="2.5" fill="#5c87b8">
            DUNIA LUAR
          </text>
          {/* pengguna */}
          <circle cx="78" cy="158" r="10" fill="#060d1f" stroke="#a9bcd6" strokeWidth="1.5" />
          <path d="M62 184q16 -14 32 0" fill="none" stroke="#a9bcd6" strokeWidth="1.6" />
          <text x="78" y="202" textAnchor="middle" fontSize="7.5" fill="#a9bcd6">
            PENGGUNA
          </text>
          {/* crawler */}
          <g>
            <rect x="130" y="146" width="34" height="26" rx="8" fill="#060d1f" stroke="#5c87b8" strokeWidth="1.5" />
            <circle cx="140" cy="159" r="2.4" fill="#a9bcd6" />
            <circle cx="154" cy="159" r="2.4" fill="#a9bcd6" />
            <line x1="147" y1="146" x2="147" y2="138" stroke="#5c87b8" strokeWidth="1.5" />
            <circle cx="147" cy="136" r="2.5" fill="#f59e0b" />
            <text x="147" y="188" textAnchor="middle" fontSize="7.5" fill="#a9bcd6">
              CRAWLER
            </text>
          </g>
          {/* internet */}
          <g fill="none" stroke="#254872" strokeWidth="1.3">
            <circle cx="120" cy="252" r="22" />
            <ellipse cx="120" cy="252" rx="10" ry="22" />
            <path d="M98 252h44M104 240h32M104 264h32" />
          </g>
          <text x="120" y="292" textAnchor="middle" fontSize="7.5" fill="#a9bcd6">
            INTERNET
          </text>

          {/* zona situs publik */}
          <rect x="240" y="90" width="250" height="240" rx="14" fill="#0a1628" stroke="#254872" />
          <text x="365" y="118" textAnchor="middle" className="font-mono" fontSize="9" fontWeight="700" letterSpacing="2.5" fill="#5c87b8">
            SITUS PUBLIK
          </text>
          <text x="365" y="134" textAnchor="middle" fontSize="7.5" fill="#a9bcd6">
            10 halaman · dapat diindeks
          </text>
          {PUBLIK.map((p, i) => {
            const col = i < 5 ? 0 : 1;
            const row = i % 5;
            const x = 258 + col * 112;
            const y = 148 + row * 30;
            return (
              <g key={p}>
                <rect x={x} y={y} width="104" height="22" rx="6" fill="#060d1f" stroke="#1b3455" />
                <text x={x + 52} y={y + 15} textAnchor="middle" className="font-mono" fontSize="7" letterSpacing="1" fill="#a9bcd6">
                  {p}
                </text>
              </g>
            );
          })}
          {/* gerbang middleware */}
          <circle cx="560" cy="204" r="34" fill="#060d1f" stroke="#f59e0b" strokeWidth="1.6" />
          <circle cx="560" cy="204" r="21" fill="#0a1628" stroke="#f59e0b" strokeOpacity="0.6" />
          <g stroke="#fbbf24" strokeWidth="1.8" strokeLinecap="round">
            <line x1="560" y1="204" x2="560" y2="188" />
            <line x1="560" y1="204" x2="573" y2="211" />
            <line x1="560" y1="204" x2="549" y2="214" />
          </g>
          <circle cx="560" cy="204" r="3" fill="#fbbf24" />
          <text x="560" y="262" textAnchor="middle" className="font-mono" fontSize="8" fontWeight="700" letterSpacing="1.5" fill="#fbbf24">
            MIDDLEWARE GATE
          </text>
          <text x="560" y="277" textAnchor="middle" fontSize="7.5" fill="#a9bcd6">
            Sesi 12 jam · kunci env
          </text>

          {/* zona vault */}
          <rect x="640" y="90" width="250" height="240" rx="14" fill="#060d1f" stroke="#f59e0b" strokeOpacity="0.45" />
          <text x="765" y="118" textAnchor="middle" className="font-mono" fontSize="9" fontWeight="700" letterSpacing="2.5" fill="#fbbf24">
            INTERNAL VAULT
          </text>
          {/* gembok */}
          <g fill="none" stroke="#fbbf24" strokeWidth="1.5">
            <rect x="755" y="128" width="20" height="15" rx="3" />
            <path d="M759.5 128v-4.5a5.5 5.5 0 0 1 11 0V128" />
          </g>
          {VAULT.map((v, i) => {
            const y = 156 + i * 34;
            return (
              <g key={v}>
                <rect x="665" y={y} width="200" height="26" rx="7" fill="#0a1628" stroke="#254872" />
                <text x="765" y={y + 17} textAnchor="middle" className="font-mono" fontSize="7.5" letterSpacing="1.5" fill="#e6eef8">
                  {v}
                </text>
              </g>
            );
          })}
          <text x="765" y="300" textAnchor="middle" className="font-mono" fontSize="6.5" letterSpacing="1.2" fill="#5c87b8">
            NOINDEX · ROBOTS.TXT · API GATED — BUKAN FOLDER STATIS
          </text>

          {/* jalur pengguna → publik (terbuka) */}
          <line x1="96" y1="176" x2="232" y2="176" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="5 5" className="dash-flow" />
          <path d="M224 171 234 176 224 181" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
          <text x="196" y="168" textAnchor="middle" fontSize="7" fill="#a9bcd6">
            akses terbuka
          </text>

          {/* jalur crawler → publik (boleh) + crawler → vault (ditolak) */}
          <path d="M147 176 Q 200 176 232 190" fill="none" stroke="#5c87b8" strokeWidth="1.2" strokeDasharray="3 5" />
          <path
            d="M150 210 C 240 350, 420 345, 520 242"
            fill="none"
            stroke="#5c87b8"
            strokeWidth="1.2"
            strokeDasharray="3 5"
          />
          {/* tanda tolak — tepat pada lintasan kurva, bebas dari label gerbang */}
          <g stroke="#a9bcd6" strokeWidth="1.6">
            <line x1="463" y1="275" x2="477" y2="289" />
            <line x1="477" y1="275" x2="463" y2="289" />
          </g>
          <circle cx="470" cy="282" r="12" fill="none" stroke="#a9bcd6" strokeWidth="1.2" strokeDasharray="2 3" />
          <text x="404" y="352" textAnchor="middle" className="font-mono" fontSize="7.5" letterSpacing="1" fill="#5c87b8">
            DITOLAK: ROBOTS + NOINDEX
          </text>

          {/* publik → gate → vault */}
          <line x1="492" y1="152" x2="528" y2="188" stroke="#f59e0b" strokeWidth="1.4" strokeDasharray="4 4" className="dash-flow" />
          <path d="M520 182 530 190 519 195" fill="none" stroke="#f59e0b" strokeWidth="1.4" />
          <line x1="596" y1="204" x2="632" y2="204" stroke="#f59e0b" strokeWidth="1.4" strokeDasharray="4 4" className="dash-flow" />
          <path d="M624 199 634 204 624 209" fill="none" stroke="#f59e0b" strokeWidth="1.4" />
          {/* kunci kecil */}
          <g fill="none" stroke="#fbbf24" strokeWidth="1.4">
            <circle cx="612" cy="192" r="3.5" />
            <path d="M615 195l6 6M619 199l2.5-2.5M616.5 196.5l2 2" />
          </g>
          <text x="614" y="228" textAnchor="middle" fontSize="7" fill="#a9bcd6">
            lulus gate
          </text>

          {/* prinsip bawah */}
          {[
            { x: 40, w: 250, t: "TAUTAN DARI PUBLIK: TIDAK ADA" },
            { x: 306, w: 250, t: "INDEKS MESIN PENCARI: DITUTUP" },
            { x: 572, w: 308, t: "BERKAS VAULT: VIA API GATED" },
          ].map((c) => (
            <g key={c.t}>
              <rect x={c.x} y="366" width={c.w} height="34" rx="9" fill="#060d1f" stroke="#1b3455" />
              <circle cx={c.x + 18} cy="383" r="3" fill="#f59e0b" />
              <text x={c.x + 32} y="387" className="font-mono" fontSize="7.5" letterSpacing="1.2" fill="#a9bcd6">
                {c.t}
              </text>
            </g>
          ))}
        </svg>
      </div>
      <figcaption className="mt-4 text-center font-mono text-[10px] tracking-[0.18em] text-[#5c87b8]">
        GBR. 06 — BENTENG DUA ZONA: PUBLIK UNTUK CLIENT, VAULT TERKUNCI UNTUK ARSITEK
      </figcaption>
    </figure>
  );
}
