/** Slug unik CMS — dipakai bersama oleh route create & update. */
import { db } from "@/lib/db";
import { slugify } from "@/lib/cms/blocks";

export async function unikSlug(base: string, kecualiId?: string): Promise<string> {
  const root = slugify(base) || "artikel";
  let slug = root;
  for (let n = 2; n < 100; n++) {
    const ada = await db.cmsPost.findUnique({ where: { slug }, select: { id: true } });
    if (!ada || ada.id === kecualiId) return slug;
    slug = `${root}-${n}`;
  }
  return `${root}-${Date.now().toString(36)}`;
}
