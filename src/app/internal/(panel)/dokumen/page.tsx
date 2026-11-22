import type { Metadata } from "next";
import { readFile } from "node:fs/promises";
import path from "node:path";
import {
  AlertTriangle,
  Building2,
  CalendarDays,
  Download,
  FileText,
  FileLock2,
  Fingerprint,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Vault Dokumen",
};

type VaultManifest = {
  dokumen: {
    slug: string;
    berkas: string;
    jenis: string;
    klasifikasi: string;
    data: Record<string, string>;
  }[];
  slot_menunggu: string[];
  catatan_keamanan: string;
};

const FIELD_ICON: Record<string, typeof MapPin> = {
  nomor_induk_berusaha: Fingerprint,
  nama_pelaku_usaha: Building2,
  alamat_kantor: MapPin,
  kode_pos: MapPin,
  telepon: Phone,
  email: Mail,
  terbit_tanggal: CalendarDays,
  dicetak: CalendarDays,
};

async function bacaVault(): Promise<VaultManifest | null> {
  try {
    const raw = await readFile(path.join(process.cwd(), "internal-vault", "nib-data.json"), "utf-8");
    return JSON.parse(raw) as VaultManifest;
  } catch {
    return null;
  }
}

export default async function InternalDokumenPage() {
  const vault = await bacaVault();

  return (
    <div className="space-y-10">
      {/* Header */}
      <section className="rounded-3xl border border-[#1b3455] bg-[#0a1628] p-7 sm:p-9">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[#1b3455] bg-[#060d1f] text-[var(--gn-amber-400)]">
              <FileLock2 className="h-6 w-6" aria-hidden />
            </span>
            <div>
              <h1 className="font-display text-2xl font-bold">Vault Dokumen Rahasia</h1>
              <p className="font-mono text-[11px] tracking-[0.18em] text-[#5c87b8]">
                LEGAL · KEPATUHAN · TIDAK UNTUK PUBLIK
              </p>
            </div>
          </div>
          <span className="rounded-full border border-[var(--gn-amber-500)]/50 bg-[var(--gn-amber-500)]/10 px-3.5 py-1.5 font-mono text-[10px] font-bold text-[var(--gn-amber-300)]">
            DIJAGA MIDDLEWARE + API GATED
          </span>
        </div>
        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-[#a9bcd6]">
          Dokumen-dokumen legal perusahaan dipisahkan total dari repo publik: berkas hidup di{" "}
          <code className="rounded bg-black/40 px-1.5 py-0.5 font-mono text-[var(--gn-amber-400)]">
            internal-vault/
          </code>{" "}
          (gitignored), tidak pernah berada di folder statis, dan hanya disajikan lewat API yang
          memverifikasi sesi internal pada setiap permintaan.
        </p>
      </section>

      {!vault ? (
        <section className="flex items-start gap-3 rounded-3xl border border-[var(--gn-amber-500)]/40 bg-[var(--gn-amber-500)]/5 p-7">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-[var(--gn-amber-400)]" aria-hidden />
          <div className="text-sm leading-relaxed text-[#a9bcd6]">
            <p className="font-semibold text-[#e6eef8]">Manifest vault belum terpasang.</p>
            <p className="mt-2">
              Untuk menjalankan penuh di runtime ini, sediakan{" "}
              <code className="rounded bg-black/40 px-1.5 py-0.5 font-mono">internal-vault/nib-data.json</code>{" "}
              berisi manifest dokumen, lalu letakkan berkas PDF-nya di folder yang sama. Struktur
              manifest: <code className="rounded bg-black/40 px-1.5 py-0.5 font-mono">dokumen[]</code>,{" "}
              <code className="rounded bg-black/40 px-1.5 py-0.5 font-mono">slot_menunggu[]</code>,{" "}
              <code className="rounded bg-black/40 px-1.5 py-0.5 font-mono">catatan_keamanan</code>.
            </p>
          </div>
        </section>
      ) : (
        vault.dokumen.map((d) => (
          <section
            key={d.slug}
            aria-labelledby={`judul-${d.slug}`}
            className="rounded-3xl border border-[#1b3455] bg-[#0a1628] p-7 sm:p-9"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-mono text-[10px] font-bold tracking-[0.22em] text-[var(--gn-amber-400)]">
                  {d.klasifikasi}
                </p>
                <h2 id={`judul-${d.slug}`} className="mt-1.5 font-display text-xl font-bold">
                  {d.jenis}
                </h2>
              </div>
              <a
                href={`/api/internal/dokumen/${d.slug}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[var(--gn-amber-500)] px-6 py-3 text-sm font-bold text-[var(--gn-navy-900)] shadow-lg shadow-amber-500/20 transition-transform hover:scale-[1.02]"
              >
                <Download className="h-4 w-4" aria-hidden />
                Buka / Unduh PDF
              </a>
            </div>

            <dl className="mt-7 grid gap-3 sm:grid-cols-2">
              {Object.entries(d.data).map(([kunci, nilai]) => {
                const Icon = FIELD_ICON[kunci] ?? FileText;
                return (
                  <div key={kunci} className="rounded-2xl border border-[#1b3455] bg-[#060d1f] p-4">
                    <dt className="flex items-center gap-2 font-mono text-[10px] font-bold tracking-[0.14em] text-[#5c87b8]">
                      <Icon className="h-3.5 w-3.5 text-[var(--gn-amber-400)]" aria-hidden />
                      {kunci.replaceAll("_", " ").toUpperCase()}
                    </dt>
                    <dd className="mt-2 break-words text-sm leading-relaxed text-[#e6eef8]">
                      {nilai}
                    </dd>
                  </div>
                );
              })}
            </dl>
          </section>
        ))
      )}

      {/* Slot dokumen menunggu */}
      <section aria-labelledby="judul-slot" className="rounded-3xl border border-[#1b3455] bg-[#0a1628] p-7 sm:p-9">
        <h2 id="judul-slot" className="font-display text-xl font-bold">
          Slot Dokumen Menunggu
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-[#a9bcd6]">
          Struktur siap untuk dokumen berikutnya — letakkan berkasnya di{" "}
          <code className="rounded bg-black/40 px-1.5 py-0.5 font-mono">internal-vault/</code> dan
          tambahkan entri manifestnya, maka kartu baru muncul otomatis di atas.
        </p>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {(vault?.slot_menunggu ?? []).map((s) => (
            <li
              key={s}
              className="flex items-center gap-3 rounded-2xl border border-dashed border-[#1b3455] bg-[#060d1f]/60 p-4 text-sm text-[#a9bcd6]"
            >
              <FileText className="h-4 w-4 shrink-0 text-[#5c87b8]" aria-hidden />
              {s} — <span className="font-mono text-[10px] tracking-[0.14em] text-[#5c87b8]">SLOT KOSONG</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Protokol keamanan */}
      <section className="flex items-start gap-3 rounded-2xl border border-[var(--gn-amber-500)]/40 bg-[var(--gn-amber-500)]/5 p-5">
        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[var(--gn-amber-400)]" aria-hidden />
        <p className="text-xs leading-relaxed text-[#a9bcd6]">
          {vault?.catatan_keamanan ??
            "Berkas vault disajikan hanya lewat API gated yang memverifikasi sesi internal di setiap permintaan."}
        </p>
      </section>
    </div>
  );
}
