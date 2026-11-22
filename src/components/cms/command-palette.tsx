"use client";

/**
 * Gunara CMS — Palet Perintah G-DOS (Fase 2: Editor Ultra).
 * Ctrl/Cmd+K di seluruh area internal: lompat ke halaman, artikel, atau aksi
 * cepat. Navigasi penuh dari keyboard — ↑↓ pilih, Enter buka, Esc tutup.
 * Data artikel diambil malas saat palet pertama dibuka.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  CornerDownLeft,
  FileLock2,
  FileText,
  Home,
  Images,
  LayoutDashboard,
  Palette,
  PenLine,
  Route,
  Search,
  Newspaper,
  type LucideIcon,
} from "lucide-react";
import { STATUS_LABEL } from "@/lib/cms/blocks";
import { cn } from "@/lib/utils";

type Item = {
  id: string;
  label: string;
  hint?: string;
  tone?: string;
  icon: LucideIcon;
  href: string;
  kata: string;
};

type PostRingkas = {
  id: string;
  title: string;
  status: string;
  slug: string;
};

export function CommandPalette() {
  const router = useRouter();
  const [terbuka, setTerbuka] = useState(false);
  const [query, setQuery] = useState("");
  const [idx, setIdx] = useState(0);
  const [posts, setPosts] = useState<PostRingkas[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const daftarRef = useRef<HTMLDivElement>(null);

  const muatPosts = useCallback(async () => {
    try {
      const res = await fetch("/api/internal/cms/posts");
      const data = (await res.json()) as { ok: boolean; posts?: PostRingkas[] };
      if (data.ok && data.posts) setPosts(data.posts);
    } catch {
      // Offline — palet tetap hidup dengan navigasi statis.
    }
  }, []);

  const buka = useCallback(() => {
    setQuery("");
    setIdx(0);
    setTerbuka(true);
    void muatPosts();
  }, [muatPosts]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (terbuka) setTerbuka(false);
        else buka();
      } else if (e.key === "Escape") {
        setTerbuka(false);
      }
    };
    const onEvent = () => buka();
    window.addEventListener("keydown", onKey);
    window.addEventListener("gn:palette", onEvent);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("gn:palette", onEvent);
    };
  }, [terbuka, buka]);

  useEffect(() => {
    if (!terbuka) return;
    const t = setTimeout(() => inputRef.current?.focus(), 30);
    document.body.style.overflow = "hidden";
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, [terbuka]);

  const items = useMemo<Item[]>(() => {
    const nav: Item[] = [
      { id: "aksi-tulis", label: "Tulis artikel baru", hint: "CMS", icon: PenLine, href: "/internal/cms/tulis", kata: "tulis baru artikel create post kalam" },
      { id: "nav-cms", label: "Ruang Redaksi CMS", hint: "CMS", icon: Newspaper, href: "/internal/cms", kata: "cms artikel daftar redaksi" },
      { id: "nav-media", label: "Pustaka Media", hint: "CMS", icon: Images, href: "/internal/cms/media", kata: "media gambar aset upload" },
      { id: "nav-dash", label: "Dashboard Internal", hint: "G-DOS", icon: LayoutDashboard, href: "/internal", kata: "dashboard utama beranda internal" },
      { id: "nav-ident", label: "Identitas Logo", hint: "Internal", icon: Palette, href: "/internal/identitas", kata: "identitas logo brand trilogi" },
      { id: "nav-dok", label: "Dokumen Rahasia", hint: "Internal", icon: FileLock2, href: "/internal/dokumen", kata: "dokumen nib rahasia vault" },
      { id: "nav-road", label: "Roadmap 99 Hari", hint: "G-DOS", icon: Route, href: "/internal/roadmap", kata: "roadmap rencana 99 hari" },
      { id: "nav-pub", label: "Situs Publik", hint: "Publik", icon: Home, href: "/", kata: "situs publik beranda home" },
      { id: "nav-blog", label: "Jurnal Publik", hint: "Publik", icon: BookOpen, href: "/blog", kata: "jurnal blog publik artikel" },
    ];
    const postItems: Item[] = posts.map((p) => ({
      id: `post-${p.id}`,
      label: p.title || "Tanpa judul",
      hint: (STATUS_LABEL[p.status] ?? STATUS_LABEL.draft).label.toUpperCase(),
      icon: FileText,
      href: `/internal/cms/${p.id}`,
      kata: `${p.title} ${p.slug} artikel`,
    }));
    return [...nav, ...postItems];
  }, [posts]);

  const hasil = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((i) => `${i.label} ${i.kata}`.toLowerCase().includes(q));
  }, [items, query]);

  // idx dijepit saat render (pola derived state) — aman saat daftar mengecil.
  const idxAman = Math.min(idx, Math.max(0, hasil.length - 1));

  // Pastikan item aktif selalu terlihat saat navigasi keyboard.
  useEffect(() => {
    const el = daftarRef.current?.querySelector<HTMLElement>(`[data-idx="${idxAman}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [idxAman]);

  function pilih(item: Item) {
    setTerbuka(false);
    router.push(item.href);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setIdx(Math.min(idxAman + 1, hasil.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setIdx(Math.max(idxAman - 1, 0));
    } else if (e.key === "Enter" && hasil[idxAman]) {
      e.preventDefault();
      pilih(hasil[idxAman]);
    }
  }

  if (!terbuka) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center bg-black/70 px-4 pt-[12vh] backdrop-blur-sm"
      onMouseDown={() => setTerbuka(false)}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Palet perintah G-DOS"
        onMouseDown={(e) => e.stopPropagation()}
        onKeyDown={onKeyDown}
        className="w-full max-w-xl overflow-hidden rounded-2xl border border-[#1b3455] bg-[#060d1f] shadow-2xl shadow-black/70"
      >
        <div className="flex items-center gap-3 border-b border-[#12243d] px-4 py-3.5">
          <Search className="h-4 w-4 shrink-0 text-[#5c87b8]" aria-hidden />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIdx(0);
            }}
            placeholder="Cari perintah, halaman, atau artikel…"
            className="flex-1 bg-transparent text-sm text-[#e6eef8] outline-none placeholder:text-[#3d5f8a]"
          />
          <kbd className="rounded border border-[#254872] px-1.5 py-0.5 font-mono text-[10px] text-[#5c87b8]">
            ESC
          </kbd>
        </div>

        <div ref={daftarRef} className="nice-scroll max-h-[46vh] overflow-y-auto p-2">
          {hasil.length === 0 ? (
            <p className="px-3 py-8 text-center text-xs text-[#5c87b8]">
              Tidak ada hasil untuk “{query}”.
            </p>
          ) : (
            hasil.map((item, i) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  type="button"
                  data-idx={i}
                  onMouseEnter={() => setIdx(i)}
                  onClick={() => pilih(item)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-left transition-colors",
                    i === idxAman ? "bg-[color-mix(in_srgb,var(--gn-amber-500)_14%,transparent)]" : "hover:bg-[#0a1628]"
                  )}
                >
                  <span
                    className={cn(
                      "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border",
                      i === idxAman
                        ? "border-[var(--gn-amber-500)]/60 text-[var(--gn-amber-400)]"
                        : "border-[#254872] text-[#8fa8c6]"
                    )}
                  >
                    <Icon className="h-4 w-4" aria-hidden />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span
                      className={cn(
                        "block truncate text-sm font-semibold",
                        i === idxAman ? "text-[var(--gn-amber-400)]" : "text-[#e6eef8]"
                      )}
                    >
                      {item.label}
                    </span>
                    {item.hint ? (
                      <span className="mt-0.5 block font-mono text-[10px] tracking-[0.14em] text-[#5c87b8]">
                        {item.hint}
                      </span>
                    ) : null}
                  </span>
                  {i === idxAman ? (
                    <CornerDownLeft className="h-3.5 w-3.5 shrink-0 text-[#5c87b8]" aria-hidden />
                  ) : null}
                </button>
              );
            })
          )}
        </div>

        <div className="flex items-center gap-4 border-t border-[#12243d] px-4 py-2.5 font-mono text-[10px] tracking-[0.14em] text-[#5c87b8]">
          <span>↑↓ NAVIGASI</span>
          <span>ENTER BUKA</span>
          <span className="ml-auto">G-DOS PALET PERINTAH</span>
        </div>
      </div>
    </div>
  );
}
