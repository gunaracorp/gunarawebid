"use client";

/**
 * Gunara CMS — Editor Artikel (jantung admin).
 * Kolom kiri: judul + susunan blok (drag-and-drop). Kolom kanan: panel
 * Publikasi / SEO / Revisi. Pratinjau langsung memakai BlockRenderer asli —
 * apa yang Anda lihat = apa yang dibaca publik.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  ArrowLeft,
  CalendarClock,
  Check,
  ChevronDown,
  ExternalLink,
  Eye,
  EyeOff,
  Globe2,
  History,
  Loader2,
  Newspaper,
  Plus,
  Save,
  Search,
  Trash2,
} from "lucide-react";
import type { Block, BlockType } from "@/lib/cms/blocks";
import { BLOCK_LABEL, BLOCK_TYPES, STATUS_LABEL } from "@/lib/cms/blocks";
import { BlockRenderer } from "@/components/cms/block-renderer";
import { BlockCard, tipeKeBlok } from "@/components/cms/block-card";
import { MediaPickerDialog } from "@/components/cms/media-picker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export type PostEditorInitial = {
  id: string | null;
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  coverMediaId: string | null;
  status: string;
  scheduledFor: string | null;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  blocks: Block[];
  categoryIds: string[];
  tags: string[];
  publishedAt: string | null;
  views: number;
};

type UidBlock = { uid: string; block: Block };

const inputCls =
  "border-[#254872] bg-[#060d1f] text-[#e6eef8] placeholder:text-[#3d5f8a] focus-visible:ring-[var(--gn-amber-500)]/40 focus-visible:border-[var(--gn-amber-500)]/60";

function Panel({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-[#1b3455] bg-[#0a1628] p-5">
      <h3 className="font-mono text-[10px] font-bold tracking-[0.22em] text-[#5c87b8]">
        {label.toUpperCase()}
      </h3>
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}

function FieldRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-mono text-[10px] tracking-[0.18em] text-[#5c87b8]">
        {label.toUpperCase()}
      </span>
      {children}
    </label>
  );
}

function uids(blocks: Block[]): UidBlock[] {
  return blocks.map((b, i) => ({ uid: `blk-${i}-${Math.random().toString(36).slice(2, 8)}`, block: b }));
}

export function PostEditor(props: {
  initial: PostEditorInitial;
  categories: { id: string; slug: string; name: string }[];
}) {
  const { initial, categories } = props;
  const router = useRouter();

  const [id, setId] = useState<string | null>(initial.id);
  const [title, setTitle] = useState(initial.title);
  const [slug, setSlug] = useState(initial.slug);
  const [slugTouched, setSlugTouched] = useState(!!initial.id);
  const [subtitle, setSubtitle] = useState(initial.subtitle);
  const [excerpt, setExcerpt] = useState(initial.excerpt);
  const [coverMediaId, setCoverMediaId] = useState<string | null>(initial.coverMediaId);
  const [status, setStatus] = useState(initial.status);
  const [scheduledFor, setScheduledFor] = useState(initial.scheduledFor ?? "");
  const [seoTitle, setSeoTitle] = useState(initial.seoTitle);
  const [seoDescription, setSeoDescription] = useState(initial.seoDescription);
  const [seoKeywords, setSeoKeywords] = useState(initial.seoKeywords);
  const [categoryIds, setCategoryIds] = useState<string[]>(initial.categoryIds);
  const [tags, setTags] = useState(initial.tags.join(", "));
  const [blocks, setBlocks] = useState<UidBlock[]>(() =>
    uids(initial.blocks.length > 0 ? initial.blocks : [])
  );
  const [menuBlok, setMenuBlok] = useState(false);
  const [pratinjau, setPratinjau] = useState(false);
  const [menyimpan, setMenyimpan] = useState(false);
  const [tersimpanPada, setTersimpanPada] = useState<string | null>(null);
  const [tab, setTab] = useState<"publikasi" | "seo" | "revisi">("publikasi");
  const [revisi, setRevisi] = useState<{ id: string; title: string; note: string | null; createdAt: string }[]>([]);
  const [pilihSampul, setPilihSampul] = useState(false);

  const firstRender = useRef(true);
  const snapshotAwal = useMemo(() => JSON.stringify(initial), [initial]);
  const snapshotKini = useMemo(
    () =>
      JSON.stringify({
        title, slug, subtitle, excerpt, coverMediaId, status, scheduledFor,
        seoTitle, seoDescription, seoKeywords,
        categoryIds: [...categoryIds].sort(),
        tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
        blocks: blocks.map((b) => b.block),
      }),
    [title, slug, subtitle, excerpt, coverMediaId, status, scheduledFor, seoTitle, seoDescription, seoKeywords, categoryIds, tags, blocks]
  );
  const kotor = snapshotKini !== snapshotAwal;

  // ── Aksi simpan ────────────────────────────────────────────────────────────

  const payload = useCallback(
    (denganStatus = true) => ({
      title: title.trim(),
      slug: slug.trim(),
      subtitle,
      excerpt,
      coverMediaId,
      seoTitle,
      seoDescription,
      seoKeywords,
      status: denganStatus ? status : undefined,
      scheduledFor: denganStatus && status === "scheduled" && scheduledFor
        ? new Date(scheduledFor).toISOString()
        : undefined,
      blocks: blocks.map((b) => b.block),
      categories: categories.filter((c) => categoryIds.includes(c.id)).map((c) => c.name),
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
    }),
    [title, slug, subtitle, excerpt, coverMediaId, seoTitle, seoDescription, seoKeywords, status, scheduledFor, blocks, categories, categoryIds, tags]
  );

  const simpan = useCallback(async (): Promise<string | null> => {
    if (!title.trim()) {
      toast({ title: "Judul wajib diisi", variant: "destructive" });
      return null;
    }
    setMenyimpan(true);
    try {
      if (!id) {
        const res = await fetch("/api/internal/cms/posts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: title.trim(), subtitle }),
        });
        const data = await res.json();
        if (!res.ok || !data.ok) throw new Error(data.pesan);
        const newId: string = data.post.id;
        const res2 = await fetch(`/api/internal/cms/posts/${newId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload()),
        });
        const data2 = await res2.json();
        if (!res2.ok || !data2.ok) throw new Error(data2.pesan);
        setId(newId);
        toast({ title: "Artikel dibuat", description: `/${data2.post.slug}` });
        router.replace(`/internal/cms/${newId}`);
        router.refresh();
        return newId;
      }
      const res = await fetch(`/api/internal/cms/posts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload()),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.pesan);
      setTersimpanPada(new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
      router.refresh();
      return id;
    } catch (e) {
      toast({
        title: "Gagal menyimpan",
        description: e instanceof Error ? e.message : "Coba lagi.",
        variant: "destructive",
      });
      return null;
    } finally {
      setMenyimpan(false);
    }
  }, [id, title, subtitle, payload, router]);

  // Ctrl/Cmd+S
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        void simpan();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [simpan]);

  // Peringatan sebelum menutup dengan perubahan belum disimpan
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const onBefore = (e: BeforeUnloadEvent) => {
      if (kotor) e.preventDefault();
    };
    window.addEventListener("beforeunload", onBefore);
    return () => window.removeEventListener("beforeunload", onBefore);
  }, [kotor]);

  // ── Publikasi ──────────────────────────────────────────────────────────────

  async function aksiPublikasi(action: "publish" | "unpublish" | "schedule") {
    const savedId = await simpan();
    if (!savedId) return;
    const res = await fetch(`/api/internal/cms/posts/${savedId}/publish`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action,
        scheduledFor: action === "schedule" && scheduledFor ? new Date(scheduledFor).toISOString() : undefined,
      }),
    });
    const data = await res.json();
    if (!res.ok || !data.ok) {
      toast({ title: "Gagal", description: data.pesan ?? "Coba lagi.", variant: "destructive" });
      return;
    }
    setStatus(data.post.status);
    toast({
      title:
        action === "publish" ? "Terbit di situs publik" : action === "schedule" ? "Dijadwalkan" : "Ditarik ke draf",
      description: action === "publish" ? `/blog/${data.post.slug}` : undefined,
    });
    router.refresh();
  }

  async function hapus() {
    if (!id) {
      toast({ title: "Artikel belum tersimpan" });
      return;
    }
    if (!window.confirm("Hapus artikel ini beserta seluruh revisinya? Tindakan tidak bisa dibatalkan.")) return;
    const res = await fetch(`/api/internal/cms/posts/${id}`, { method: "DELETE" });
    const data = await res.json().catch(() => ({ ok: false }));
    if (data.ok) {
      toast({ title: "Artikel dihapus" });
      router.push("/internal/cms");
      router.refresh();
    }
  }

  // ── Revisi ─────────────────────────────────────────────────────────────────

  const muatRevisi = useCallback(async () => {
    if (!id) return;
    const res = await fetch(`/api/internal/cms/posts/${id}/revisions`);
    const data = await res.json();
    if (data.ok) setRevisi(data.revisions);
  }, [id]);

  useEffect(() => {
    if (tab === "revisi") void muatRevisi();
  }, [tab, muatRevisi]);

  async function pulihkan(revId: string) {
    if (!id) return;
    const res = await fetch(`/api/internal/cms/posts/${id}/revisions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ revisionId: revId }),
    });
    const data = await res.json();
    if (!res.ok || !data.ok) {
      toast({ title: "Pemulihan gagal", variant: "destructive" });
      return;
    }
    const get = await fetch(`/api/internal/cms/posts/${id}`);
    const g = await get.json();
    if (g.ok) {
      setBlocks(uids(g.post.blocks as Block[]));
      setTitle(g.post.title);
      toast({ title: "Revisi dipulihkan", description: data.title });
      router.refresh();
    }
  }

  // ── Blok ───────────────────────────────────────────────────────────────────

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  function onDragEnd(e: DragEndEvent) {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    setBlocks((prev) => {
      const from = prev.findIndex((b) => b.uid === active.id);
      const to = prev.findIndex((b) => b.uid === over.id);
      if (from < 0 || to < 0) return prev;
      return arrayMove(prev, from, to);
    });
  }

  function tambahBlok(t: BlockType) {
    const nb = tipeKeBlok(t);
    setBlocks((prev) => [...prev, { uid: `blk-${prev.length}-${Math.random().toString(36).slice(2, 8)}`, block: nb }]);
    setMenuBlok(false);
  }

  const st = STATUS_LABEL[status] ?? STATUS_LABEL.draft;
  const blocksRuntime = blocks.map((b) => b.block);

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="pb-24">
      {/* Bar aksi menempel */}
      <div className="sticky top-0 z-40 -mx-4 mb-8 border-b border-[#1b3455] bg-[#060d1f]/95 px-4 py-3 backdrop-blur-xl sm:-mx-6 sm:px-6">
        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            href="/internal/cms"
            className="inline-flex h-9 items-center gap-2 rounded-full border border-[#254872] px-3.5 text-sm text-[#a9bcd6] transition-colors hover:border-[var(--gn-amber-500)] hover:text-[var(--gn-amber-400)]"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">CMS</span>
          </Link>
          <span className={cn("rounded-full border px-3 py-1.5 font-mono text-[10px] font-bold tracking-[0.16em]", st.tone)}>
            {st.label.toUpperCase()}
          </span>
          <span className="hidden font-mono text-[11px] text-[#5c87b8] md:inline">
            {menyimpan ? (
              <span className="flex items-center gap-2"><Loader2 className="h-3 w-3 animate-spin" /> MENYIMPAN…</span>
            ) : kotor ? (
              "PERUBAHAN BELUM DISIMPAN"
            ) : tersimpanPada ? (
              <span className="flex items-center gap-1.5"><Check className="h-3 w-3 text-emerald-400" /> TERSIMPAN {tersimpanPada}</span>
            ) : (
              "SEMUA TERSIMPAN"
            )}
          </span>

          <div className="ml-auto flex flex-wrap items-center gap-2">
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => setPratinjau((v) => !v)}
              className="gap-2 border-[#254872] bg-transparent text-[#a9bcd6] hover:text-[var(--gn-amber-400)]"
            >
              {pratinjau ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              {pratinjau ? "Editor" : "Pratinjau"}
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={() => void simpan()}
              disabled={menyimpan}
              className="gap-2 bg-[var(--gn-amber-500)] font-bold text-[#060d1f] hover:bg-[var(--gn-amber-400)]"
            >
              <Save className="h-4 w-4" /> Simpan
            </Button>
            {status === "published" ? (
              <>
                {slug ? (
                  <a
                    href={`/blog/${slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-9 items-center gap-2 rounded-full border border-emerald-500/40 px-3.5 text-sm text-emerald-300 hover:bg-emerald-500/10"
                  >
                    <ExternalLink className="h-4 w-4" /> Lihat
                  </a>
                ) : null}
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => void aksiPublikasi("unpublish")}
                  className="gap-2 border-red-500/40 bg-transparent text-red-300 hover:bg-red-500/10 hover:text-red-200"
                >
                  Tarik
                </Button>
              </>
            ) : (
              <>
                {status === "scheduled" && scheduledFor ? (
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => void aksiPublikasi("schedule")}
                    className="gap-2 border-violet-500/40 bg-transparent text-violet-300 hover:bg-violet-500/10"
                  >
                    <CalendarClock className="h-4 w-4" /> Perbarui jadwal
                  </Button>
                ) : (
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => void aksiPublikasi("publish")}
                    className="gap-2 border-emerald-500/40 bg-transparent text-emerald-300 hover:bg-emerald-500/10"
                  >
                    <Globe2 className="h-4 w-4" /> Publikasikan
                  </Button>
                )}
              </>
            )}
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => void hapus()}
              className="gap-2 border-[#254872] bg-transparent text-[#5c87b8] hover:border-red-500/60 hover:text-red-300"
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Hapus artikel</span>
            </Button>
          </div>
        </div>
      </div>

      {pratinjau ? (
        /* ── Mode pratinjau: renderer asli ── */
        <div className="mx-auto max-w-3xl">
          <p className="mb-6 text-center font-mono text-[10px] tracking-[0.24em] text-[#5c87b8]">
            PRATINJAU LANGSUNG — RENDERER IDENTIK DENGAN SITUS PUBLIK
          </p>
          <h1 className="font-display text-3xl font-bold leading-tight text-[#e6eef8] sm:text-4xl">
            {title || "Tanpa judul"}
          </h1>
          {subtitle ? <p className="mt-3 text-lg text-[#a9bcd6]">{subtitle}</p> : null}
          <div className="mt-8">
            <BlockRenderer blocks={blocksRuntime} />
          </div>
        </div>
      ) : (
        /* ── Mode editor ── */
        <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
          <div className="min-w-0 space-y-5">
            <div className="rounded-3xl border border-[#1b3455] bg-[#0a1628] p-6">
              <span className="font-mono text-[10px] tracking-[0.22em] text-[#5c87b8]">JUDUL ARTIKEL</span>
              <textarea
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (!slugTouched) setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""));
                }}
                rows={2}
                placeholder="Tulis judul yang mengguncang…"
                className="mt-2 w-full resize-none bg-transparent font-display text-2xl font-bold leading-snug text-[#e6eef8] outline-none placeholder:text-[#3d5f8a] sm:text-3xl"
              />
              <div className="mt-4 grid gap-4 sm:grid-cols-[1fr_240px]">
                <label className="block">
                  <span className="mb-1.5 block font-mono text-[10px] tracking-[0.18em] text-[#5c87b8]">SUBJUDUL</span>
                  <Input
                    className={inputCls}
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    placeholder="Satu kalimat pengantar"
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block font-mono text-[10px] tracking-[0.18em] text-[#5c87b8]">SLUG URL</span>
                  <div className="flex items-center rounded-md border border-[#254872] bg-[#060d1f] focus-within:border-[var(--gn-amber-500)]/60">
                    <span className="pl-3 font-mono text-xs text-[#5c87b8]">/blog/</span>
                    <input
                      value={slug}
                      onChange={(e) => {
                        setSlugTouched(true);
                        setSlug(e.target.value);
                      }}
                      className="w-full bg-transparent py-2 font-mono text-xs text-[#e6eef8] outline-none"
                      placeholder="slug-artikel"
                    />
                  </div>
                </label>
              </div>
            </div>

            {/* Susunan blok */}
            <div className="space-y-3">
              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
                <SortableContext items={blocks.map((b) => b.uid)} strategy={verticalListSortingStrategy}>
                  {blocks.map((b, i) => (
                    <BlockCard
                      key={b.uid}
                      uid={b.uid}
                      block={b.block}
                      pertama={i === 0}
                      terakhir={i === blocks.length - 1}
                      onChange={(nb) => setBlocks((prev) => prev.map((x) => (x.uid === b.uid ? { ...x, block: nb } : x)))}
                      onRemove={() => setBlocks((prev) => prev.filter((x) => x.uid !== b.uid))}
                      onDuplicate={() =>
                        setBlocks((prev) => {
                          const copy = [...prev];
                          copy.splice(i + 1, 0, { uid: `blk-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, block: JSON.parse(JSON.stringify(b.block)) });
                          return copy;
                        })
                      }
                      onNaik={() => setBlocks((prev) => arrayMove(prev, i, Math.max(0, i - 1)))}
                      onTurun={() => setBlocks((prev) => arrayMove(prev, i, Math.min(prev.length - 1, i + 1)))}
                    />
                  ))}
                </SortableContext>
              </DndContext>

              {blocks.length === 0 ? (
                <p className="rounded-2xl border border-dashed border-[#254872] bg-[#0a1628] px-6 py-10 text-center text-sm text-[#5c87b8]">
                  Kanvas masih kosong — mulai dengan blok pertama.
                </p>
              ) : null}

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setMenuBlok((v) => !v)}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-[#254872] bg-[#0a1628] px-6 py-4 text-sm font-semibold text-[#a9bcd6] transition-colors hover:border-[var(--gn-amber-500)]/60 hover:text-[var(--gn-amber-400)]"
                >
                  <Plus className="h-4 w-4" /> Tambah blok
                  <ChevronDown className={cn("h-4 w-4 transition-transform", menuBlok && "rotate-180")} />
                </button>
                {menuBlok ? (
                  <div className="absolute inset-x-0 bottom-full z-30 mb-2 grid grid-cols-2 gap-2 rounded-2xl border border-[#1b3455] bg-[#060d1f] p-3 shadow-2xl shadow-black/50 sm:grid-cols-4">
                    {BLOCK_TYPES.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => tambahBlok(t)}
                        className="rounded-xl border border-[#1b3455] bg-[#0a1628] px-3 py-2.5 text-left text-xs font-medium text-[#a9bcd6] transition-colors hover:border-[var(--gn-amber-500)]/60 hover:text-[var(--gn-amber-400)]"
                      >
                        {BLOCK_LABEL[t]}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          {/* ── Sidebar kanan ── */}
          <aside className="space-y-4">
            <div className="grid grid-cols-3 gap-1 rounded-2xl border border-[#1b3455] bg-[#0a1628] p-1.5">
              {(
                [
                  { k: "publikasi", label: "Publikasi", icon: Newspaper },
                  { k: "seo", label: "SEO", icon: SearchEngine },
                  { k: "revisi", label: "Revisi", icon: History },
                ] as const
              ).map((t) => (
                <button
                  key={t.k}
                  type="button"
                  onClick={() => setTab(t.k)}
                  className={cn(
                    "inline-flex items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold transition-colors",
                    tab === t.k
                      ? "bg-[color-mix(in_srgb,var(--gn-amber-500)_16%,transparent)] text-[var(--gn-amber-400)]"
                      : "text-[#5c87b8] hover:text-[#a9bcd6]"
                  )}
                >
                  <t.icon className="h-3.5 w-3.5" />
                  {t.label}
                </button>
              ))}
            </div>

            {tab === "publikasi" ? (
              <>
                <Panel label="Status & jadwal">
                  <FieldRow label="Status">
                    <div className="flex flex-wrap gap-2">
                      {(["draft", "review", "scheduled", "published"] as const).map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setStatus(s)}
                          className={cn(
                            "rounded-full border px-3 py-1.5 font-mono text-[10px] font-bold tracking-[0.12em]",
                            status === s
                              ? "border-[var(--gn-amber-500)]/60 text-[var(--gn-amber-400)]"
                              : "border-[#254872] text-[#5c87b8]"
                          )}
                        >
                          {STATUS_LABEL[s].label.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </FieldRow>
                  {status === "scheduled" ? (
                    <FieldRow label="Terbit otomatis pada">
                      <Input
                        type="datetime-local"
                        className={inputCls}
                        value={scheduledFor}
                        onChange={(e) => setScheduledFor(e.target.value)}
                      />
                      <span className="mt-1 block font-mono text-[10px] text-[#5c87b8]">
                        TANPA CRON — DIAKHIRKAN SAAT ARTIKEL DIBACA
                      </span>
                    </FieldRow>
                  ) : null}
                  {initial.publishedAt ? (
                    <p className="font-mono text-[11px] text-[#5c87b8]">
                      TERBIT PERTAMA: {new Date(initial.publishedAt).toLocaleDateString("id-ID", { dateStyle: "long" })}
                    </p>
                  ) : null}
                </Panel>

                <Panel label="Sampul & taksonomi">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setPilihSampul(true)}
                      className="flex h-16 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-dashed border-[#254872] bg-[#060d1f] text-[#5c87b8] hover:border-[var(--gn-amber-500)]/60"
                    >
                      {coverMediaId ? (
                       
                        <img src={`/api/cms/media/${coverMediaId}`} alt="Sampul" className="h-full w-full object-cover" />
                      ) : (
                        <Plus className="h-5 w-5" />
                      )}
                    </button>
                    <div className="text-xs text-[#a9bcd6]">
                      <p className="font-semibold text-[#e6eef8]">Gambar sampul</p>
                      <button
                        type="button"
                        className="mt-1 font-mono text-[10px] tracking-[0.14em] text-[var(--gn-amber-400)]"
                        onClick={() => setCoverMediaId(null)}
                      >
                        HAPUS SAMPUL
                      </button>
                    </div>
                  </div>
                  <MediaPickerDialog
                    open={pilihSampul}
                    onOpenChange={setPilihSampul}
                    judul="Pilih gambar sampul"
                    onPilih={(m) => setCoverMediaId(m.id)}
                  />
                  <FieldRow label="Kategori">
                    <div className="space-y-2">
                      {categories.length === 0 ? (
                        <p className="text-xs text-[#5c87b8]">Belum ada kategori — tulis langsung di kolom tag.</p>
                      ) : (
                        categories.map((c) => (
                          <label key={c.id} className="flex items-center gap-2.5 text-sm text-[#a9bcd6]">
                            <input
                              type="checkbox"
                              checked={categoryIds.includes(c.id)}
                              onChange={(e) =>
                                setCategoryIds((prev) =>
                                  e.target.checked ? [...prev, c.id] : prev.filter((x) => x !== c.id)
                                )
                              }
                              className="h-4 w-4 accent-[var(--gn-amber-500)]"
                            />
                            {c.name}
                          </label>
                        ))
                      )}
                    </div>
                  </FieldRow>
                  <FieldRow label="Tag (pisahkan koma)">
                    <Input className={inputCls} value={tags} onChange={(e) => setTags(e.target.value)} placeholder="cms, arsitektur, metodologi" />
                  </FieldRow>
                </Panel>

                <Panel label="Ringkasan">
                  <FieldRow label="Excerpt (kosongkan = otomatis dari blok pertama)">
                    <Textarea rows={4} className={inputCls} value={excerpt} onChange={(e) => setExcerpt(e.target.value)} />
                  </FieldRow>
                </Panel>
              </>
            ) : null}

            {tab === "seo" ? (
              <>
                <Panel label="Metadata pencarian">
                  <FieldRow label={`SEO title (${seoTitle.length}/60)`}>
                    <Input className={inputCls} value={seoTitle} onChange={(e) => setSeoTitle(e.target.value)} placeholder={title} />
                  </FieldRow>
                  <FieldRow label={`Meta description (${seoDescription.length}/160)`}>
                    <Textarea rows={4} className={inputCls} value={seoDescription} onChange={(e) => setSeoDescription(e.target.value)} placeholder={excerpt || subtitle} />
                  </FieldRow>
                  <FieldRow label="Kata kunci (koma)">
                    <Input className={inputCls} value={seoKeywords} onChange={(e) => setSeoKeywords(e.target.value)} />
                  </FieldRow>
                </Panel>
                <Panel label="Pratinjau hasil pencarian">
                  <div className="rounded-xl border border-[#254872] bg-[#060d1f] p-4">
                    <p className="truncate font-mono text-[11px] text-emerald-300">
                      gunara.web.id › blog › {slug || "slug-artikel"}
                    </p>
                    <p className="mt-1 truncate text-base font-medium text-[#e6eef8]">
                      {seoTitle || title || "Judul artikel"}
                    </p>
                    <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-[#8fa8c6]">
                      {seoDescription || excerpt || subtitle || "Deskripsi meta akan muncul di sini…"}
                    </p>
                  </div>
                  <p className="font-mono text-[10px] leading-relaxed text-[#5c87b8]">
                    OG IMAGE DINAMIS 1200×630 DIBUAT OTOMATIS: /api/cms/og/{slug || "slug"}
                  </p>
                </Panel>
              </>
            ) : null}

            {tab === "revisi" ? (
              <Panel label={`Riwayat revisi${revisi.length > 0 ? ` · ${revisi.length}` : ""}`}>
                {!id ? (
                  <p className="text-xs text-[#5c87b8]">Simpan artikel terlebih dahulu — mesin waktu menyala setelah itu.</p>
                ) : revisi.length === 0 ? (
                  <p className="text-xs text-[#5c87b8]">Belum ada snapshot. Setiap penyimpanan berubah menciptakan satu.</p>
                ) : (
                  <ul className="space-y-2.5">
                    {revisi.map((r) => (
                      <li key={r.id} className="flex items-center justify-between gap-3 rounded-xl border border-[#254872] bg-[#060d1f] px-3.5 py-3">
                        <div className="min-w-0">
                          <p className="truncate text-xs font-semibold text-[#e6eef8]">{r.title}</p>
                          <p className="font-mono text-[10px] text-[#5c87b8]">
                            {new Date(r.createdAt).toLocaleString("id-ID", { dateStyle: "short", timeStyle: "short" })}
                            {r.note ? ` · ${r.note}` : ""}
                          </p>
                        </div>
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={() => void pulihkan(r.id)}
                          className="h-7 shrink-0 border-[#254872] bg-transparent px-2.5 text-[10px] text-[#a9bcd6] hover:border-[var(--gn-amber-500)] hover:text-[var(--gn-amber-400)]"
                        >
                          Pulihkan
                        </Button>
                      </li>
                    ))}
                  </ul>
                )}
                <p className="font-mono text-[10px] leading-relaxed text-[#5c87b8]">
                  MAKS 20 SNAPSHOT PER ARTIKEL — SEBELUM PULIH, KONDISI SEKARANG JUGA DI-SNAPSHOT.
                </p>
              </Panel>
            ) : null}

            {initial.views > 0 ? (
              <p className="text-center font-mono text-[10px] tracking-[0.18em] text-[#5c87b8]">
                {initial.views.toLocaleString("id-ID")} PEMBACAAN TERCATAT
              </p>
            ) : null}
          </aside>
        </div>
      )}
    </div>
  );
}
