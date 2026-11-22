"use client";

/**
 * Gunara CMS — layar Pustaka Media penuh (bukan dialog).
 * Unggah, telusuri, hapus aset; unduh tautan aset untuk dipakai di mana pun.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Copy, Loader2, Trash2, UploadCloud } from "lucide-react";
import { toast } from "@/hooks/use-toast";

type MediaItem = {
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

export function MediaLibraryScreen() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [memuat, setMemuat] = useState(true);
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
    void muat();
  }, [muat]);

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

  async function hapus(id: string, nama: string) {
    if (!window.confirm(`Hapus aset "${nama}"? Blok gambar yang memakainya akan kehilangan gambar.`)) return;
    const res = await fetch(`/api/internal/cms/media/${id}`, { method: "DELETE" });
    const data = await res.json().catch(() => ({ ok: false }));
    if (data.ok) {
      setItems((prev) => prev.filter((m) => m.id !== id));
      toast({ title: "Aset dihapus" });
    }
  }

  return (
    <div className="space-y-6">
      <section className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-[#1b3455] bg-[#0a1628] p-7">
        <div>
          <h1 className="font-display text-2xl font-bold">Pustaka Media</h1>
          <p className="mt-1 font-mono text-[11px] tracking-[0.18em] text-[#5c87b8]">
            ASET TERSIMPAN DI DATABASE · DISAJIKAN VIA /api/cms/media/[id] · CACHE PERMANEN
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-[11px] text-[#5c87b8]">{items.length} ASET</span>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={mengunggah}
            className="inline-flex h-10 items-center gap-2 rounded-full bg-[var(--gn-amber-500)] px-5 font-display text-sm font-bold text-[#060d1f] transition-transform hover:scale-[1.03] disabled:opacity-60"
          >
            {mengunggah ? <Loader2 className="h-4 w-4 animate-spin" /> : <UploadCloud className="h-4 w-4" />}
            Unggah
          </button>
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
      </section>

      {memuat ? (
        <p className="flex items-center gap-2 px-2 py-10 text-sm text-[#5c87b8]">
          <Loader2 className="h-4 w-4 animate-spin" /> Memuat pustaka…
        </p>
      ) : items.length === 0 ? (
        <p className="rounded-3xl border border-dashed border-[#254872] bg-[#0a1628] px-6 py-16 text-center text-sm text-[#5c87b8]">
          Pustaka masih kosong — unggah aset pertama Anda.
        </p>
      ) : (
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((m) => (
            <li key={m.id} className="group overflow-hidden rounded-2xl border border-[#1b3455] bg-[#0a1628]">
              <div className="flex h-36 items-center justify-center overflow-hidden bg-[#060d1f]">
                {m.mimeType.startsWith("image/") ? (
                  <Image
                    src={`/api/cms/media/${m.id}`}
                    alt={m.alt ?? m.filename}
                    width={320}
                    height={200}
                    className="h-full w-full object-cover"
                    unoptimized
                  />
                ) : (
                  <span className="font-mono text-xs text-[#5c87b8]">{m.mimeType}</span>
                )}
              </div>
              <div className="px-4 py-3">
                <p className="truncate text-xs font-semibold text-[#e6eef8]" title={m.filename}>
                  {m.filename}
                </p>
                <p className="mt-0.5 font-mono text-[10px] text-[#5c87b8]">
                  {ukuran(m.size)}
                  {m.width && m.height ? ` · ${m.width}×${m.height}` : ""}
                </p>
                <div className="mt-2.5 flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={async () => {
                      await navigator.clipboard.writeText(`/api/cms/media/${m.id}`).catch(() => {});
                      toast({ title: "Tautan aset dicopy", description: `/api/cms/media/${m.id}` });
                    }}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#254872] px-2.5 py-1 font-mono text-[10px] text-[#a9bcd6] hover:border-[var(--gn-amber-500)] hover:text-[var(--gn-amber-400)]"
                  >
                    <Copy className="h-3 w-3" /> SALIN TAUTAN
                  </button>
                  <button
                    type="button"
                    aria-label={`Hapus ${m.filename}`}
                    onClick={() => void hapus(m.id, m.filename)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#254872] px-2.5 py-1 font-mono text-[10px] text-[#5c87b8] hover:border-red-500/60 hover:text-red-300"
                  >
                    <Trash2 className="h-3 w-3" /> HAPUS
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
