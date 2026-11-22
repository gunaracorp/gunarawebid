import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { parseBlocks } from "@/lib/cms/blocks";
import { PostEditor, type PostEditorInitial } from "@/components/cms/post-editor";

export const metadata: Metadata = {
  title: "CMS — Sunting Artikel",
};

export const dynamic = "force-dynamic";

export default async function SuntingArtikelPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  // Tanpa penelan error: kegagalan DB harus tampak sebagai 500, bukan 404 palsu.
  const post = await db.cmsPost.findUnique({
    where: { id },
    include: {
      categories: { select: { categoryId: true } },
      tags: { select: { tag: { select: { name: true } } } },
    },
  });
  if (!post) notFound();

  const categories = await db.cmsCategory
    .findMany({ orderBy: { name: "asc" }, select: { id: true, slug: true, name: true } })
    .catch(() => []);

  const initial: PostEditorInitial = {
    id: post.id,
    slug: post.slug,
    title: post.title,
    subtitle: post.subtitle ?? "",
    excerpt: post.excerpt ?? "",
    coverMediaId: post.coverMediaId,
    status: post.status,
    scheduledFor: post.scheduledFor ? post.scheduledFor.toISOString() : null,
    seoTitle: post.seoTitle ?? "",
    seoDescription: post.seoDescription ?? "",
    seoKeywords: post.seoKeywords ?? "",
    blocks: parseBlocks(post.blocks),
    categoryIds: post.categories.map((c) => c.categoryId),
    tags: post.tags.map((t) => t.tag.name),
    publishedAt: post.publishedAt ? post.publishedAt.toISOString() : null,
    views: post.views,
  };

  return <PostEditor initial={initial} categories={categories} />;
}
