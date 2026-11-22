"use client";

/**
 * Gunara CMS — Kartu Editor Blok.
 * Satu kartu per blok: editor ringkas per tipe + kontrol urut (drag, naik,
 * turun), duplikasi, dan hapus. Semua input bergaya navy-amber.
 */
import { useState } from "react";
import Image from "next/image";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  AlignCenter,
  AlignLeft,
  ArrowDown,
  ArrowUp,
  ChevronDown,
  ChevronRight,
  Copy,
  GripVertical,
  Images,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import type { Block, BlockType } from "@/lib/cms/blocks";
import { BLOCK_LABEL } from "@/lib/cms/blocks";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { MediaPickerDialog } from "@/components/cms/media-picker";
import { cn } from "@/lib/utils";

// ── Elemen kecil ─────────────────────────────────────────────────────────────

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-mono text-[10px] tracking-[0.18em] text-[#5c87b8]">
        {label.toUpperCase()}
      </span>
      {children}
    </label>
  );
}

const inputCls =
  "border-[#254872] bg-[#060d1f] text-[#e6eef8] placeholder:text-[#3d5f8a] focus-visible:ring-[var(--gn-amber-500)]/40 focus-visible:border-[var(--gn-amber-500)]/60";

function Baris({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-3 sm:grid-cols-2">{children}</div>;
}

function DaftarEditor<T>(props: {
  items: T[];
  onChange: (items: T[]) => void;
  render: (item: T, set: (next: T) => void, i: number) => React.ReactNode;
  buat: () => T;
  labelTambah: string;
  min?: number;
}) {
  const { items, onChange, render, buat, labelTambah, min = 0 } = props;
  return (
    <div className="space-y-2">
      {items.map((it, i) => (
        <div key={i} className="relative">
          {render(it, (next) => {
            const copy = [...items];
            copy[i] = next;
            onChange(copy);
          }, i)}
          {items.length > min ? (
            <button
              type="button"
              aria-label="Hapus entri"
              onClick={() => onChange(items.filter((_, j) => j !== i))}
              className="absolute -right-1 -top-1 rounded-lg border border-[#254872] bg-[#060d1f] p-1 text-[#5c87b8] hover:border-red-500/60 hover:text-red-300"
            >
              <X className="h-3 w-3" />
            </button>
          ) : null}
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...items, buat()])}
        className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-[#254872] px-3 py-1.5 font-mono text-[10px] tracking-[0.14em] text-[#5c87b8] transition-colors hover:border-[var(--gn-amber-500)]/60 hover:text-[var(--gn-amber-400)]"
      >
        <Plus className="h-3 w-3" /> {labelTambah.toUpperCase()}
      </button>
    </div>
  );
}

// ── Editor per tipe ──────────────────────────────────────────────────────────

type Patch = (partial: Partial<Block>) => void;

function EditorIsi({ block, patch }: { block: Block; patch: Patch }) {
  const [pilihMedia, setPilihMedia] = useState(false);

  switch (block.type) {
    case "paragraph":
      return (
        <div className="space-y-3">
          <Field label="Teks paragraf">
            <Textarea
              rows={4}
              className={cn(inputCls, "leading-relaxed")}
              value={block.text}
              onChange={(e) => patch({ text: e.target.value })}
              placeholder="Tulis paragraf… (**tebal** dan *miring* didukung)"
            />
          </Field>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => patch({ align: "start" })}
              className={cn(
                "rounded-lg border p-1.5",
                block.align !== "center"
                  ? "border-[var(--gn-amber-500)]/60 text-[var(--gn-amber-400)]"
                  : "border-[#254872] text-[#5c87b8]"
              )}
              aria-label="Rata kiri"
            >
              <AlignLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => patch({ align: "center" })}
              className={cn(
                "rounded-lg border p-1.5",
                block.align === "center"
                  ? "border-[var(--gn-amber-500)]/60 text-[var(--gn-amber-400)]"
                  : "border-[#254872] text-[#5c87b8]"
              )}
              aria-label="Rata tengah"
            >
              <AlignCenter className="h-4 w-4" />
            </button>
          </div>
        </div>
      );

    case "heading":
      return (
        <Baris>
          <Field label="Teks judul bagian">
            <Input
              className={inputCls}
              value={block.text}
              onChange={(e) => patch({ text: e.target.value })}
              placeholder="Judul bagian"
            />
          </Field>
          <Field label="Level">
            <div className="flex gap-2">
              {[2, 3].map((lv) => (
                <button
                  key={lv}
                  type="button"
                  onClick={() => patch({ level: lv as 2 | 3 })}
                  className={cn(
                    "rounded-lg border px-4 py-2 font-mono text-xs",
                    block.level === lv
                      ? "border-[var(--gn-amber-500)]/60 text-[var(--gn-amber-400)]"
                      : "border-[#254872] text-[#5c87b8]"
                  )}
                >
                  H{lv}
                </button>
              ))}
            </div>
          </Field>
        </Baris>
      );

    case "quote":
      return (
        <div className="space-y-3">
          <Field label="Kutipan">
            <Textarea
              rows={3}
              className={inputCls}
              value={block.text}
              onChange={(e) => patch({ text: e.target.value })}
            />
          </Field>
          <Field label="Sumber (opsional)">
            <Input
              className={inputCls}
              value={block.attribution ?? ""}
              onChange={(e) => patch({ attribution: e.target.value })}
              placeholder="— Nama sumber"
            />
          </Field>
        </div>
      );

    case "list":
      return (
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Switch
              checked={block.ordered}
              onCheckedChange={(v) => patch({ ordered: v })}
              aria-label="Daftar bernomor"
            />
            <span className="text-xs text-[#a9bcd6]">
              {block.ordered ? "Daftar bernomor (1, 2, 3)" : "Daftar butir (•)"}
            </span>
          </div>
          <DaftarEditor
            items={block.items}
            onChange={(items) => patch({ items })}
            buat={() => ""}
            labelTambah="Tambah butir"
            render={(it, set) => (
              <Input
                className={cn(inputCls, "pr-6")}
                value={it}
                onChange={(e) => set(e.target.value)}
                placeholder="Isi butir"
              />
            )}
          />
        </div>
      );

    case "image":
      return (
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <button
              type="button"
              onClick={() => setPilihMedia(true)}
              className="flex h-20 w-28 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-dashed border-[#254872] bg-[#060d1f] text-[#5c87b8] hover:border-[var(--gn-amber-500)]/60"
              aria-label="Pilih gambar dari pustaka"
            >
              {block.mediaId ? (
                <Image
                  src={`/api/cms/media/${block.mediaId}`}
                  alt={block.alt}
                  width={112}
                  height={80}
                  className="h-full w-full object-cover"
                  unoptimized
                />
              ) : (
                <Images className="h-6 w-6" />
              )}
            </button>
            <div className="min-w-0 flex-1 space-y-3">
              <Field label="Teks alternatif (alt)">
                <Input
                  className={inputCls}
                  value={block.alt}
                  onChange={(e) => patch({ alt: e.target.value })}
                  placeholder="Deskripsi gambar"
                />
              </Field>
              <Field label="Keterangan (opsional)">
                <Input
                  className={inputCls}
                  value={block.caption ?? ""}
                  onChange={(e) => patch({ caption: e.target.value })}
                />
              </Field>
              <div className="flex items-center gap-3">
                <Switch checked={!!block.wide} onCheckedChange={(v) => patch({ wide: v })} aria-label="Tampil lebar" />
                <span className="text-xs text-[#a9bcd6]">Tampil lebar penuh</span>
              </div>
            </div>
          </div>
          <MediaPickerDialog
            open={pilihMedia}
            onOpenChange={setPilihMedia}
            judul="Pilih gambar blok"
            onPilih={(m) => patch({ mediaId: m.id })}
          />
        </div>
      );

    case "code":
      return (
        <div className="space-y-3">
          <Field label="Bahasa">
            <Input
              className={cn(inputCls, "font-mono text-xs uppercase")}
              value={block.language}
              onChange={(e) => patch({ language: e.target.value })}
              placeholder="typescript, sql, bash…"
            />
          </Field>
          <Field label="Kode">
            <Textarea
              rows={6}
              className={cn(inputCls, "font-mono text-xs leading-relaxed")}
              value={block.code}
              onChange={(e) => patch({ code: e.target.value })}
            />
          </Field>
        </div>
      );

    case "callout": {
      const tones = ["brand", "info", "warn", "success"] as const;
      return (
        <div className="space-y-3">
          <Field label="Nada">
            <div className="flex flex-wrap gap-2">
              {tones.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => patch({ tone: t })}
                  className={cn(
                    "rounded-full border px-3.5 py-1.5 font-mono text-[10px] tracking-[0.14em]",
                    block.tone === t
                      ? "border-[var(--gn-amber-500)]/60 text-[var(--gn-amber-400)]"
                      : "border-[#254872] text-[#5c87b8]"
                  )}
                >
                  {t.toUpperCase()}
                </button>
              ))}
            </div>
          </Field>
          <Field label="Judul (opsional)">
            <Input
              className={inputCls}
              value={block.title ?? ""}
              onChange={(e) => patch({ title: e.target.value })}
            />
          </Field>
          <Field label="Teks">
            <Textarea
              rows={3}
              className={inputCls}
              value={block.text}
              onChange={(e) => patch({ text: e.target.value })}
            />
          </Field>
        </div>
      );
    }

    case "divider":
      return (
        <p className="py-2 text-center font-mono text-[10px] tracking-[0.3em] text-[#5c87b8]">
          ─── PEMISAH ───
        </p>
      );

    case "stats":
      return (
        <DaftarEditor
          items={block.items}
          onChange={(items) => patch({ items })}
          buat={() => ({ value: "", label: "" })}
          labelTambah="Tambah statistik"
          render={(it, set) => (
            <div className="grid gap-2 sm:grid-cols-2">
              <Input
                className={inputCls}
                value={it.value}
                onChange={(e) => set({ ...it, value: e.target.value })}
                placeholder="Nilai — 100x"
              />
              <Input
                className={inputCls}
                value={it.label}
                onChange={(e) => set({ ...it, label: e.target.value })}
                placeholder="Label — lebih cepat dari WP"
              />
            </div>
          )}
        />
      );

    case "cta":
      return (
        <div className="space-y-3">
          <Baris>
            <Field label="Judul seruan">
              <Input className={inputCls} value={block.title} onChange={(e) => patch({ title: e.target.value })} />
            </Field>
            <Field label="Teks tombol">
              <Input className={inputCls} value={block.label} onChange={(e) => patch({ label: e.target.value })} />
            </Field>
          </Baris>
          <Field label="Teks pendamping">
            <Textarea rows={2} className={inputCls} value={block.text} onChange={(e) => patch({ text: e.target.value })} />
          </Field>
          <Field label="Tautan">
            <Input
              className={inputCls}
              value={block.href}
              onChange={(e) => patch({ href: e.target.value })}
              placeholder="/kontak atau https://…"
            />
          </Field>
        </div>
      );

    case "comparison":
      return (
        <div className="space-y-4">
          <Field label="Kolom (maks 4)">
            <DaftarEditor
              items={block.headers}
              onChange={(headers) => patch({ headers: headers.slice(0, 4) })}
              buat={() => "Kolom"}
              labelTambah="Tambah kolom"
              min={1}
              render={(it, set) => (
                <Input className={cn(inputCls, "pr-6")} value={it} onChange={(e) => set(e.target.value)} />
              )}
            />
          </Field>
          <Field label="Baris data">
            <DaftarEditor
              items={block.rows}
              onChange={(rows) => patch({ rows })}
              buat={() => block.headers.map(() => "")}
              labelTambah="Tambah baris"
              render={(row, set) => (
                <div className="grid gap-2 sm:grid-cols-2">
                  {block.headers.map((_, ci) => (
                    <Input
                      key={ci}
                      className={inputCls}
                      value={row[ci] ?? ""}
                      onChange={(e) => {
                        const copy = [...row];
                        copy[ci] = e.target.value;
                        set(copy);
                      }}
                      placeholder={`Kolom ${ci + 1}`}
                    />
                  ))}
                </div>
              )}
            />
          </Field>
        </div>
      );

    case "timeline":
      return (
        <DaftarEditor
          items={block.items}
          onChange={(items) => patch({ items })}
          buat={() => ({ date: "", title: "", text: "" })}
          labelTambah="Tambah tonggak"
          render={(it, set) => (
            <div className="space-y-2">
              <div className="grid gap-2 sm:grid-cols-2">
                <Input
                  className={inputCls}
                  value={it.date}
                  onChange={(e) => set({ ...it, date: e.target.value })}
                  placeholder="Tanggal — FASE 1 · HARI 2"
                />
                <Input
                  className={inputCls}
                  value={it.title}
                  onChange={(e) => set({ ...it, title: e.target.value })}
                  placeholder="Judul tonggak"
                />
              </div>
              <Textarea
                rows={2}
                className={inputCls}
                value={it.text}
                onChange={(e) => set({ ...it, text: e.target.value })}
                placeholder="Uraian singkat"
              />
            </div>
          )}
        />
      );

    case "embed":
      return (
        <div className="space-y-3">
          <Field label="URL sematan">
            <Input
              className={inputCls}
              value={block.url}
              onChange={(e) => patch({ url: e.target.value })}
              placeholder="https://youtube.com/watch?v=…"
            />
          </Field>
          <Field label="Judul (opsional)">
            <Input className={inputCls} value={block.title ?? ""} onChange={(e) => patch({ title: e.target.value })} />
          </Field>
        </div>
      );

    case "methodology":
      return (
        <DaftarEditor
          items={block.steps}
          onChange={(items) => patch({ items })}
          buat={() => ({ code: "", title: "", text: "" })}
          labelTambah="Tambah langkah"
          render={(it, set) => (
            <div className="space-y-2">
              <div className="grid gap-2 sm:grid-cols-3">
                <Input
                  className={cn(inputCls, "font-mono text-xs")}
                  value={it.code}
                  onChange={(e) => set({ ...it, code: e.target.value })}
                  placeholder="U1"
                />
                <Input
                  className={cn(inputCls, "sm:col-span-2")}
                  value={it.title}
                  onChange={(e) => set({ ...it, title: e.target.value })}
                  placeholder="Judul langkah"
                />
              </div>
              <Textarea
                rows={2}
                className={inputCls}
                value={it.text}
                onChange={(e) => set({ ...it, text: e.target.value })}
                placeholder="Uraian langkah"
              />
            </div>
          )}
        />
      );

    default:
      return null;
  }
}

// ── Kartu sortable ───────────────────────────────────────────────────────────

export function BlockCard(props: {
  uid: string;
  block: Block;
  onChange: (block: Block) => void;
  onRemove: () => void;
  onDuplicate: () => void;
  onNaik: () => void;
  onTurun: () => void;
  pertama: boolean;
  terakhir: boolean;
}) {
  const { uid, block, onChange, onRemove, onDuplicate, onNaik, onTurun, pertama, terakhir } = props;
  const [terbuka, setTerbuka] = useState(block.type !== "divider");
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: uid });

  const patch: Patch = (partial) => onChange({ ...block, ...partial } as Block);

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={cn(
        "rounded-2xl border bg-[#0a1628] transition-colors",
        isDragging ? "border-[var(--gn-amber-500)] shadow-xl shadow-black/40" : "border-[#1b3455]"
      )}
    >
      <div className="flex items-center gap-2 px-3 py-2.5">
        <button
          type="button"
          aria-label="Seret untuk memindah blok"
          className="cursor-grab touch-none rounded-lg p-1.5 text-[#5c87b8] hover:text-[var(--gn-amber-400)] active:cursor-grabbing"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => setTerbuka((v) => !v)}
          className="flex min-w-0 flex-1 items-center gap-2 text-left"
          aria-expanded={terbuka}
        >
          {terbuka ? (
            <ChevronDown className="h-3.5 w-3.5 shrink-0 text-[#5c87b8]" />
          ) : (
            <ChevronRight className="h-3.5 w-3.5 shrink-0 text-[#5c87b8]" />
          )}
          <span className="rounded-md border border-[#254872] bg-[#060d1f] px-2 py-0.5 font-mono text-[10px] font-bold tracking-[0.14em] text-[var(--gn-amber-400)]">
            {BLOCK_LABEL[block.type].toUpperCase()}
          </span>
          <span className="min-w-0 flex-1 truncate text-xs text-[#8fa8c6]">
            {ringkasBlok(block)}
          </span>
        </button>
        <div className="flex items-center gap-0.5">
          <KontrolBtn label="Naikkan" onClick={onNaik} disabled={pertama}>
            <ArrowUp className="h-3.5 w-3.5" />
          </KontrolBtn>
          <KontrolBtn label="Turunkan" onClick={onTurun} disabled={terakhir}>
            <ArrowDown className="h-3.5 w-3.5" />
          </KontrolBtn>
          <KontrolBtn label="Duplikasi blok" onClick={onDuplicate}>
            <Copy className="h-3.5 w-3.5" />
          </KontrolBtn>
          <KontrolBtn label="Hapus blok" onClick={onRemove} danger>
            <Trash2 className="h-3.5 w-3.5" />
          </KontrolBtn>
        </div>
      </div>
      {terbuka ? (
        <div className="border-t border-[#12243d] px-4 py-4">
          <EditorIsi block={block} patch={patch} />
        </div>
      ) : null}
    </div>
  );
}

function KontrolBtn(props: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  danger?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={props.label}
      title={props.label}
      onClick={props.onClick}
      disabled={props.disabled}
      className={cn(
        "rounded-lg p-1.5 transition-colors disabled:opacity-30",
        props.danger
          ? "text-[#5c87b8] hover:border-red-500/60 hover:text-red-300"
          : "text-[#5c87b8] hover:text-[var(--gn-amber-400)]"
      )}
    >
      {props.children}
    </button>
  );
}

function ringkasBlok(b: Block): string {
  switch (b.type) {
    case "paragraph":
      return b.text;
    case "heading":
      return b.text;
    case "quote":
      return b.text;
    case "list":
      return `${b.items.length} butir`;
    case "image":
      return b.alt;
    case "code":
      return `${b.language} · ${b.code.split("\n").length} baris`;
    case "callout":
      return b.title ?? b.text;
    case "divider":
      return "";
    case "stats":
      return `${b.items.length} statistik`;
    case "cta":
      return b.title;
    case "comparison":
      return `${b.rows.length} baris × ${b.headers.length} kolom`;
    case "timeline":
      return `${b.items.length} tonggak`;
    case "embed":
      return b.url;
    case "methodology":
      return `${b.steps.length} langkah`;
    default:
      return "";
  }
}

export function tipeKeBlok(t: BlockType): Block {
  switch (t) {
    case "paragraph":
      return { type: "paragraph", text: "", align: "start" };
    case "heading":
      return { type: "heading", text: "", level: 2 };
    case "quote":
      return { type: "quote", text: "", attribution: "" };
    case "list":
      return { type: "list", ordered: false, items: [""] };
    case "image":
      return { type: "image", mediaId: "", alt: "", caption: "" };
    case "code":
      return { type: "code", language: "typescript", code: "" };
    case "callout":
      return { type: "callout", tone: "brand", title: "", text: "" };
    case "divider":
      return { type: "divider" };
    case "stats":
      return { type: "stats", items: [{ value: "", label: "" }] };
    case "cta":
      return { type: "cta", title: "", text: "", href: "/kontak", label: "Hubungi" };
    case "comparison":
      return { type: "comparison", headers: ["Aspek", "Nilai"], rows: [["", ""]] };
    case "timeline":
      return { type: "timeline", items: [{ date: "", title: "", text: "" }] };
    case "embed":
      return { type: "embed", url: "", title: "" };
    case "methodology":
      return { type: "methodology", steps: [{ code: "", title: "", text: "" }] };
    default:
      return { type: "paragraph", text: "" };
  }
}
