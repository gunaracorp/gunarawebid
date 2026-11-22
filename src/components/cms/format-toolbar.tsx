"use client";

/**
 * Gunara CMS — RichTextarea (Fase 2: Editor Ultra).
 * Textarea + toolbar format inline: tebal, miring, coret, kode, sorot, tautan.
 * Operasi bekerja pada seleksi asli textarea (tombol memakai onMouseDown
 * preventDefault agar seleksi tidak hilang), dengan pintasan Ctrl/Cmd+B dan I.
 * Format tersimpan sebagai mini-markdown aman — dirender oleh InlineRich.
 */
import { useRef, useState } from "react";
import {
  Bold,
  Code,
  Highlighter,
  Italic,
  Link2,
  Strikethrough,
} from "lucide-react";
import { makeLink, tokenAktif, wrapToken, type TokenKind } from "@/lib/cms/rich-text";
import { cn } from "@/lib/utils";

type HasilSel = { text: string; start: number; end: number };

export function RichTextarea(props: {
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  placeholder?: string;
  label?: string;
  hint?: string;
  className?: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  autoFocus?: boolean;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const [aktif, setAktif] = useState<Set<TokenKind>>(new Set());

  function terapkan(fn: (text: string, s: number, e: number) => HasilSel | null) {
    const el = ref.current;
    if (!el) return;
    const s = el.selectionStart ?? 0;
    const e = el.selectionEnd ?? 0;
    const hasil = fn(el.value, s, e);
    if (!hasil) return;
    props.onChange(hasil.text);
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(hasil.start, hasil.end);
      setAktif(tokenAktif(hasil.text, hasil.start, hasil.end));
    });
  }

  const wrap = (kind: TokenKind) => terapkan((t, s, e) => wrapToken(t, s, e, kind));
  const tautan = () => {
    const url = window.prompt("URL tautan — https://, /relatif, atau mailto:");
    if (!url) return;
    terapkan((t, s, e) => makeLink(t, s, e, url));
  };

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if ((e.metaKey || e.ctrlKey) && !e.altKey) {
      const k = e.key.toLowerCase();
      if (k === "b") {
        e.preventDefault();
        wrap("bold");
        return;
      }
      if (k === "i") {
        e.preventDefault();
        wrap("italic");
        return;
      }
    }
    props.onKeyDown?.(e);
  }

  function onSelect() {
    const el = ref.current;
    if (!el) return;
    setAktif(tokenAktif(el.value, el.selectionStart ?? 0, el.selectionEnd ?? 0));
  }

  const TOMBOl: { kind: TokenKind | "link"; icon: typeof Bold; label: string; shortcut?: string }[] = [
    { kind: "bold", icon: Bold, label: "Tebal", shortcut: "Ctrl+B" },
    { kind: "italic", icon: Italic, label: "Miring", shortcut: "Ctrl+I" },
    { kind: "strike", icon: Strikethrough, label: "Coret" },
    { kind: "code", icon: Code, label: "Kode inline" },
    { kind: "mark", icon: Highlighter, label: "Sorot" },
    { kind: "link", icon: Link2, label: "Tautan" },
  ];

  return (
    <div className="space-y-2">
      {props.label ? <LabelMini>{props.label}</LabelMini> : null}
      <div className="flex flex-wrap items-center gap-1">
        {TOMBOl.map((b) => {
          const nyala = b.kind !== "link" && aktif.has(b.kind as TokenKind);
          return (
            <button
              key={b.kind}
              type="button"
              title={b.shortcut ? `${b.label} (${b.shortcut})` : b.label}
              aria-label={b.label}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => (b.kind === "link" ? tautan() : wrap(b.kind as TokenKind))}
              className={cn(
                "inline-flex h-7 w-7 items-center justify-center rounded-md border transition-colors",
                nyala
                  ? "border-[var(--gn-amber-500)]/70 bg-[color-mix(in_srgb,var(--gn-amber-500)_14%,transparent)] text-[var(--gn-amber-400)]"
                  : "border-[#254872] bg-[#060d1f] text-[#8fa8c6] hover:border-[var(--gn-amber-500)]/50 hover:text-[var(--gn-amber-400)]"
              )}
            >
              <b.icon className="h-3.5 w-3.5" />
            </button>
          );
        })}
        {props.hint ? (
          <span className="ml-1 font-mono text-[10px] tracking-[0.12em] text-[#3d5f8a]">
            {props.hint}
          </span>
        ) : null}
      </div>
      <textarea
        ref={ref}
        value={props.value}
        rows={props.rows ?? 4}
        placeholder={props.placeholder}
        autoFocus={props.autoFocus}
        onChange={(e) => props.onChange(e.target.value)}
        onKeyDown={onKeyDown}
        onSelect={onSelect}
        className={cn(
          "w-full rounded-lg border border-[#254872] bg-[#060d1f] px-3.5 py-2.5 text-sm leading-relaxed text-[#e6eef8] outline-none transition-colors placeholder:text-[#3d5f8a] focus-visible:border-[var(--gn-amber-500)]/60 focus-visible:ring-[var(--gn-amber-500)]/40",
          props.className
        )}
      />
    </div>
  );
}

export function LabelMini({ children }: { children: React.ReactNode }) {
  return (
    <span className="mb-1.5 block font-mono text-[10px] tracking-[0.18em] text-[#5c87b8]">
      {children}
    </span>
  );
}
