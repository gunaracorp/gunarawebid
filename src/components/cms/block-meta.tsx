"use client";

/**
 * Gunara CMS — Meta Blok (Fase 2: Editor Ultra).
 * Ikon + deskripsi 14 tipe blok, dipakai bersama oleh menu "Tambah blok"
 * (inserter visual) dan slash menu "/" di paragraf — satu sumber kebenaran.
 */
import {
  BarChart3,
  Code2,
  Footprints,
  Heading2,
  Image as ImageIcon,
  List,
  Milestone,
  Minus,
  MonitorPlay,
  MousePointerClick,
  Quote,
  Table2,
  Type,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { BLOCK_LABEL, BLOCK_TYPES, type BlockType } from "@/lib/cms/blocks";
import { cn } from "@/lib/utils";

export const BLOCK_ICON: Record<BlockType, LucideIcon> = {
  paragraph: Type,
  heading: Heading2,
  quote: Quote,
  list: List,
  image: ImageIcon,
  code: Code2,
  callout: Zap,
  divider: Minus,
  stats: BarChart3,
  cta: MousePointerClick,
  comparison: Table2,
  timeline: Milestone,
  embed: MonitorPlay,
  methodology: Footprints,
};

export const BLOCK_DESC: Record<BlockType, string> = {
  paragraph: "Teks mengalir — tebal, miring, coret, kode, sorot, tautan.",
  heading: "Judul bagian H2/H3 — otomatis masuk daftar isi.",
  quote: "Kutipan dengan sumber, tampil elegan.",
  list: "Butir atau bernomor, format inline didukung.",
  image: "Gambar pustaka media + alt + keterangan.",
  code: "Blok kode monokrom dengan label bahasa.",
  callout: "Kotak sorotan: brand, info, warn, success.",
  divider: "Garis pemisah halus antar bagian.",
  stats: "Pita 2–6 angka kunci bergaya papan kendali.",
  cta: "Ajakan bertindak dengan tombol amber.",
  comparison: "Tabel perbandingan hingga 4 kolom.",
  timeline: "Garis waktu tonggak pencapaian.",
  embed: "YouTube tanpa iklan atau kartu tautan aman.",
  methodology: "Langkah-langkah UMEA / G-DOS / UWA-7.",
};

/** Menu sisip blok visual — grid ikon + label + deskripsi. */
export function BlockInserterMenu({ onPilih }: { onPilih: (t: BlockType) => void }) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-4">
      {BLOCK_TYPES.map((t) => {
        const Icon = BLOCK_ICON[t];
        return (
          <button
            key={t}
            type="button"
            onClick={() => onPilih(t)}
            className="group flex items-start gap-3 rounded-xl border border-[#1b3455] bg-[#0a1628] px-3.5 py-3 text-left transition-colors hover:border-[var(--gn-amber-500)]/60 hover:bg-[#060d1f]"
          >
            <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#254872] bg-[#060d1f] text-[var(--gn-amber-400)] transition-colors group-hover:border-[var(--gn-amber-500)]/60">
              <Icon className="h-4 w-4" aria-hidden />
            </span>
            <span className="min-w-0">
              <span className="block text-xs font-bold text-[#e6eef8]">{BLOCK_LABEL[t]}</span>
              <span className="mt-0.5 block text-[11px] leading-snug text-[#5c87b8]">
                {BLOCK_DESC[t]}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

/** Daftar hasil slash menu "/" — sudah difilter di luar. */
export function SlashList(props: {
  items: BlockType[];
  aktif: number;
  onPilih: (t: BlockType) => void;
  onHover: (i: number) => void;
}) {
  return (
    <div
      role="listbox"
      aria-label="Menu blok"
      className="absolute inset-x-0 top-full z-40 mt-1 max-h-72 overflow-y-auto rounded-xl border border-[#1b3455] bg-[#060d1f] p-1.5 shadow-2xl shadow-black/60"
    >
      {props.items.length === 0 ? (
        <p className="px-3 py-3 text-xs text-[#5c87b8]">Tidak ada blok yang cocok.</p>
      ) : (
        props.items.map((t, i) => {
          const Icon = BLOCK_ICON[t];
          return (
            <button
              key={t}
              type="button"
              role="option"
              aria-selected={i === props.aktif}
              onMouseEnter={() => props.onHover(i)}
              onClick={() => props.onPilih(t)}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors",
                i === props.aktif
                  ? "bg-[color-mix(in_srgb,var(--gn-amber-500)_14%,transparent)]"
                  : "hover:bg-[#0a1628]"
              )}
            >
              <span
                className={cn(
                  "inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md border",
                  i === props.aktif
                    ? "border-[var(--gn-amber-500)]/60 text-[var(--gn-amber-400)]"
                    : "border-[#254872] text-[#8fa8c6]"
                )}
              >
                <Icon className="h-3.5 w-3.5" aria-hidden />
              </span>
              <span className="min-w-0">
                <span
                  className={cn(
                    "block text-xs font-bold",
                    i === props.aktif ? "text-[var(--gn-amber-400)]" : "text-[#e6eef8]"
                  )}
                >
                  {BLOCK_LABEL[t]}
                </span>
                <span className="block truncate text-[11px] text-[#5c87b8]">{BLOCK_DESC[t]}</span>
              </span>
            </button>
          );
        })
      )}
    </div>
  );
}
