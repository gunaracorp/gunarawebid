import { ImageResponse } from "next/og";
import { getPublishedPost } from "@/lib/cms/queries";

/**
 * GET /api/cms/og/[slug] — Open Graph image dinamis 1200×630 (PNG).
 * Digambar saat diminta dengan identitas navy-amber — WordPress butuh plugin,
 * Gunara CMS lahir dengan kemampuan ini.
 */
export const runtime = "nodejs";

const NAVY = "#060d1f";
const SURFACE = "#0a1628";
const LINE = "#1b3455";
const MUTED = "#5c87b8";
const AMBER = "#f5b53d";
const SNOW = "#e6eef8";

function potong(text: string, max: number): string {
  const t = (text ?? "").trim();
  return t.length > max ? `${t.slice(0, max - 1).trimEnd()}…` : t;
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const found = await getPublishedPost(slug).catch(() => null);
  if (!found) {
    return new Response("not found", { status: 404 });
  }
  const { card } = found;
  const tanggal = card.publishedAt
    ? new Intl.DateTimeFormat("id-ID", { dateStyle: "long" }).format(card.publishedAt)
    : "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: NAVY,
          padding: 56,
          position: "relative",
        }}
      >
        {/* Bingkai ganda ala blueprint Gunara */}
        <div
          style={{
            position: "absolute",
            inset: 24,
            border: `2px solid ${LINE}`,
            borderRadius: 28,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 34,
            border: `1px solid ${LINE}`,
            borderRadius: 20,
            opacity: 0.6,
            display: "flex",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 16,
                background: SURFACE,
                border: `2px solid ${LINE}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: AMBER,
                fontSize: 26,
                fontWeight: 800,
              }}
            >
              G
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ color: SNOW, fontSize: 22, fontWeight: 700, letterSpacing: 4 }}>
                GUNARA CMS
              </span>
              <span style={{ color: MUTED, fontSize: 15, letterSpacing: 6 }}>
                GUNARA.WEB.ID · BLOG
              </span>
            </div>
          </div>
          <div
            style={{
              color: AMBER,
              border: `1.5px solid rgba(245,181,61,0.45)`,
              borderRadius: 999,
              padding: "8px 20px",
              fontSize: 16,
              letterSpacing: 4,
            }}
          >
            {card.categories[0]?.name?.toUpperCase() ?? "ARTIKEL"}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              width: 96,
              height: 5,
              background: AMBER,
              borderRadius: 999,
            }}
          />
          <div
            style={{
              color: SNOW,
              fontSize: card.title.length > 68 ? 52 : 62,
              fontWeight: 800,
              lineHeight: 1.15,
              maxWidth: 1020,
            }}
          >
            {potong(card.title, 90)}
          </div>
          {card.subtitle ? (
            <div style={{ color: "#a9bcd6", fontSize: 26, maxWidth: 980, lineHeight: 1.4 }}>
              {potong(card.subtitle, 110)}
            </div>
          ) : null}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: MUTED,
            fontSize: 17,
            letterSpacing: 3,
          }}
        >
          <span>{`GUGUN GUNARA · ${tanggal.toUpperCase()}`}</span>
          <span>{`${card.readingMinutes} MENIT BACA`}</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: { "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400" },
    }
  );
}
