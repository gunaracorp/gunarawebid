import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sesiInternalValid } from "@/lib/cms/guard";

/** DELETE /api/internal/cms/media/[id] — hapus aset dari pustaka. */
export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await sesiInternalValid())) {
    return NextResponse.json({ ok: false, pesan: "Sesi internal tidak valid." }, { status: 401 });
  }
  const { id } = await params;
  await db.cmsMedia.delete({ where: { id } }).catch(() => null);
  return NextResponse.json({ ok: true });
}
