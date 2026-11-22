import { NextResponse } from "next/server";

/**
 * Health check gunara.web.id — menggantikan balasan template "Hello, world!".
 * Menyediakan status layanan yang konsisten dengan identitas brand.
 */
export async function GET() {
  return NextResponse.json({
    service: "gunara.web.id",
    nama: "Gugun Gunara — Personal Command Center",
    status: "online",
    versi: "1.2.0.4",
    metodologi: ["UMEA", "G-DOS", "UWA-7"],
    prinsip: "Struktur sebelum karya · Sistem sebelum skala",
    waktu: new Date().toISOString(),
  });
}
