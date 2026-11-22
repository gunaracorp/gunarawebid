"use client";

/**
 * Gunara CMS — Pustaka Media & Pemilih Aset.
 * Dialog serbaguna: unggah berkas, telusuri pustaka, pilih aset (untuk sampul
 * atau blok gambar), hapus aset tak terpakai.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Loader2, Trash2, UploadCloud } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export type MediaItem = {
  id: string;
  filename: string;
  mimeType: string;
  size: number;
  width: number | null;
  height: number | null;
  alt: string | null;
};

function ukuran(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function MediaPickerDialog(props: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPilih?: (media: MediaItem) => void;
  judul?: string;
}) {
  const { open, onOpenChange, onPilih, judul = "Pustaka Media" } = props;
  const [items, setItems] = useState<MediaItem[]>([]);
  const [memuat, setMemuat] = useState(false);
  const [mengunggah, setMengunggah] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const muat = useCallback(async () => {
    setMemuat(true);
    try {
      const res = await fetch("/api/internal/cms/media");
      const data = await res.json();
      if (data.ok) setItems(data.media);
    } finally {
      setMemuat(false);
    }
  }, []);

  useEffect(() => {
    if (open) void muat();
  }, [open, muat]);

  async function unggah(file: File) {
    setMengunggah(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/internal/cms/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        toast({ title: "Unggah gagal", description: data.pesan ?? "Coba lagi.", variant: "destructive" });
        return;
      }
      toast({ title: "Aset terunggah", description: data.media.filename });
      await muat();
    } finally {
      setMengunggah(false);
    }
  }

  async function hapus(id: string) {
    const res = await fetch(`/api/internal/cms/media/${id}`, { method: "DELETE" });
    const data = await res.json().catch(() => ({ ok: false }));
    if (data.ok) {
      setItems((prev) => prev.filter((m) => m.id !== id));
      toast({ title: "Aset dihapus" });
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] overflow-hidden rounded-3xl border-[#1b3455] bg-[#0a1628] sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="font-display text-lg font-bold text-[#e6eef8]">{judul}</DialogTitle>
          <DialogDescription className="font-mono text-[11px] tracking-[0.16em] text-[#5c87b8]">
            PNG · JPG · WEBP · GIF · SVG — MAKS 8 MB — TERSIMPAN DI DATABASE
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center justify-between gap-3 py-1">
          <Button
            type="button"
            variant="outline"
            disabled={mengunggah}
            onClick={() => inputRef.current?.click()}
            className="gap-2 border-[#254872] bg-transparent text-[#a9bcd6] hover:border-[var(--gn-amber-500)] hover:text-[var(--gn-amber-400)]"
          >
            {mengunggah ? <Loader2 className="h-4 w-4 animate-spin" /> : <UploadCloud className="h-4 w-4" />}
            Unggah berkas
          </Button>
          <span className="font-mono text-[11px] text-[#5c87b8]">{items.length} ASET</span>
          <input
            ref={inputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) void unggah(f);
              e.target.value = "";
            }}
          />
        </div>

        <div className="nice-scroll max-h-[52vh] overflow-y-auto pr-1">
          {memuat ? (
            <p className="flex items-center gap-2 px-1 py-8 text-sm text-[#5c87b8]">
              <Loader2 className="h-4 w-4 animate-spin" /> Memuat pustaka…
            </p>
          ) : items.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-[#254872] px-5 py-10 text-center text-sm text-[#5c87b8]">
              Pustaka masih kosong — unggah aset pertama Anda.
            </p>
          ) : (
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {items.map((m) => {
                const gambar = m.mimeType.startsWith("image/");
                return (
                  <li
                    key={m.id}
                    className={cn(
                      "group relative overflow-hidden rounded-2xl border border-[#1b3455] bg-[#060d1f]",
                      onPilih && "cursor-pointer transition-colors hover:border-[var(--gn-amber-500)]"
                    )}
                    onClick={() => {
                      if (onPilih) {
                        onPilih(m);
                        onOpenChange(false);
                      }
                    }}
                  >
                    <div className="flex h-28 items-center justify-center overflow-hidden bg-[#081223]">
                      {gambar ? (
                        <Image
                          src={`/api/cms/media/${m.id}`}
                          alt={m.alt ?? m.filename}
                          width={240}
                          height={160}
                          className="h-full w-full object-cover"
                          unoptimized
                        />
                      ) : (
                        <span className="font-mono text-xs text-[#5c87b8]">{m.mimeType}</span>
                      )}
                    </div>
                    <div className="px-3 py-2.5">
                      <p className="truncate text-xs font-medium text-[#e6eef8]" title={m.filename}>
                        {m.filename}
                      </p>
                      <p className="mt-0.5 font-mono text-[10px] text-[#5c87b8]">
                        {ukuran(m.size)}
                        {m.width && m.height ? ` · ${m.width}×${m.height}` : ""}
                      </p>
                    </div>
                    <button
                      type="button"
                      aria-label={`Hapus ${m.filename}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        void hapus(m.id);
                      }}
                      className="absolute right-2 top-2 rounded-lg border border-[#254872] bg-[#060d1f]/90 p-1.5 text-[#5c87b8] opacity-0 transition-opacity hover:border-red-500/60 hover:text-red-300 group-hover:opacity-100"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {onPilih ? (
          <p className="text-center font-mono text-[10px] tracking-[0.18em] text-[#5c87b8]">
            KLIK KARTU UNTUK MEMILIH ASET
          </p>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
