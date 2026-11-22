import type { Metadata } from "next";
import { db } from "@/lib/db";
import { PostEditor, type PostEditorInitial } from "@/components/cms/post-editor";

export const metadata: Metadata = {
  title: "CMS — Tulis Artikel",
};

export const dynamic = "force-dynamic";

const AWAL: PostEditorInitial = {
  id: null,
  slug: "",
  title: "",
  subtitle: "",
  excerpt: "",
  coverMediaId: null,
  status: "draft",
  scheduledFor: null,
  seoTitle: "",
  seoDescription: "",
  seoKeywords: "",
  blocks: [],
  categoryIds: [],
  tags: [],
  publishedAt: null,
  views: 0,
};

export default async function TulisArtikelPage() {
  const categories = await db.cmsCategory
    .findMany({ orderBy: { name: "asc" }, select: { id: true, slug: true, name: true } })
    .catch(() => []);
  return <PostEditor initial={AWAL} categories={categories} />;
}
