import { NextResponse } from "next/server";
import { db } from "@/lib/db";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** POST /api/kontak — menerima pesan dari form publik, menyimpan ke Prisma.
 *  Gagal simpan (mis. database tak tersedia pada runtime serverless) tetap
 *  mengembalikan ok:true dengan simpan:false agar pengguna tidak kehilangan
 *  petunjuk kanal alternatif. */
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, pesan: "Format permintaan tidak valid." }, { status: 400 });
  }

  const nama = typeof body.nama === "string" ? body.nama.trim().slice(0, 120) : "";
  const email = typeof body.email === "string" ? body.email.trim().slice(0, 160) : "";
  const organisasi = typeof body.organisasi === "string" ? body.organisasi.trim().slice(0, 160) : "";
  const kebutuhan = typeof body.kebutuhan === "string" ? body.kebutuhan.trim().slice(0, 80) : "";
  const pesan = typeof body.pesan === "string" ? body.pesan.trim().slice(0, 4000) : "";

  if (!nama || !EMAIL_RE.test(email) || !pesan || pesan.length < 10) {
    return NextResponse.json(
      { ok: false, pesan: "Lengkapi nama, email yang valid, dan pesan (min. 10 karakter)." },
      { status: 422 }
    );
  }

  try {
    await db.pesanMasuk.create({
      data: { nama, email, organisasi: organisasi || null, kebutuhan: kebutuhan || "Lainnya", pesan },
    });
    return NextResponse.json({ ok: true, simpan: true });
  } catch {
    return NextResponse.json({ ok: true, simpan: false });
  }
}
