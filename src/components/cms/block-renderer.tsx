/**
 * Gunara CMS — BlockRenderer.
 * Komponen murni tanpa hook: sama dipakai oleh situs publik (server),
 * pratinjau editor (client), dan layar lain. Semua blok bergaya navy-amber.
 */
import Image from "next/image";
import { ArrowUpRight, Info, Lightbulb, TriangleAlert } from "lucide-react";
import { headingAnchor, type Block } from "@/lib/cms/blocks";

function ProseText({ text, align }: { text: string; align?: "start" | "center" }) {
  // Paragraf mendukung **tebal** dan *miring* mini-markdown aman (tanpa HTML).
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).filter(Boolean);
  return (
    <p
      className={`text-base leading-[1.85] text-[#c6d6ea] sm:text-[17px] ${
        align === "center" ? "text-center" : ""
      }`}
    >
      {parts.map((p, i) => {
        if (p.startsWith("**") && p.endsWith("**"))
          return (
            <strong key={i} className="font-semibold text-[#e6eef8]">
              {p.slice(2, -2)}
            </strong>
          );
        if (p.startsWith("*") && p.endsWith("*"))
          return (
            <em key={i} className="italic text-[#dce7f5]">
              {p.slice(1, -1)}
            </em>
          );
        return <span key={i}>{p}</span>;
      })}
    </p>
  );
}

function StatBand({ items }: { items: { value: string; label: string }[] }) {
  return (
    <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[#1b3455] bg-[#1b3455] sm:grid-cols-4">
      {items.map((s, i) => (
        <div key={i} className="flex flex-col bg-[#0a1628] px-5 py-6 text-center">
          <dd className="font-display text-2xl font-bold text-[var(--gn-amber-400)] sm:text-3xl">
            {s.value}
          </dd>
          <dt className="mt-1.5 text-xs leading-snug text-[#8fa8c6]">{s.label}</dt>
        </div>
      ))}
    </dl>
  );
}

const CALLOUT_STYLE = {
  info: { border: "border-sky-500/40", bg: "bg-sky-500/5", icon: Info, iconColor: "text-sky-400" },
  warn: {
    border: "border-amber-500/40",
    bg: "bg-amber-500/5",
    icon: TriangleAlert,
    iconColor: "text-amber-400",
  },
  success: {
    border: "border-emerald-500/40",
    bg: "bg-emerald-500/5",
    icon: Lightbulb,
    iconColor: "text-emerald-400",
  },
  brand: {
    border: "border-[var(--gn-amber-500)]/40",
    bg: "bg-[var(--gn-amber-500)]/5",
    icon: Lightbulb,
    iconColor: "text-[var(--gn-amber-400)]",
  },
} as const;

function BlockImage({ block }: { block: Extract<Block, { type: "image" }> }) {
  return (
    <figure className={block.wide ? "-mx-2 sm:mx-0" : ""}>
      <div className="overflow-hidden rounded-2xl border border-[#1b3455] bg-[#060d1f]">
        <Image
          src={`/api/cms/media/${block.mediaId}`}
          alt={block.alt}
          width={block.wide ? 1600 : 1200}
          height={block.wide ? 900 : 675}
          className="h-auto w-full object-cover"
          unoptimized
        />
      </div>
      {block.caption ? (
        <figcaption className="mt-2.5 text-center font-mono text-xs text-[#5c87b8]">
          {block.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

function ComparisonTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="nice-scroll overflow-x-auto rounded-2xl border border-[#1b3455]">
      <table className="w-full min-w-[560px] border-collapse text-sm">
        <thead>
          <tr className="bg-[#0a1628]">
            {headers.map((h, i) => (
              <th
                key={i}
                scope="col"
                className={`border-b border-[#1b3455] px-5 py-3.5 font-display text-xs font-bold tracking-wide ${
                  i === 0 ? "text-left text-[#e6eef8]" : "text-left text-[var(--gn-amber-400)]"
                }`}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className="odd:bg-[#060d1f] even:bg-[#081223]">
              {headers.map((_, ci) => (
                <td
                  key={ci}
                  className={`border-b border-[#12243d] px-5 py-3 leading-relaxed ${
                    ci === 0 ? "font-semibold text-[#e6eef8]" : "text-[#a9bcd6]"
                  }`}
                >
                  {row[ci] ?? "—"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Timeline({ items }: { items: { date: string; title: string; text: string }[] }) {
  return (
    <ol className="relative space-y-6 border-l border-[#1b3455] pl-6">
      {items.map((it, i) => (
        <li key={i} className="relative">
          <span
            className="absolute -left-[31px] top-1 h-2.5 w-2.5 rounded-full border-2 border-[var(--gn-amber-500)] bg-[#060d1f]"
            aria-hidden
          />
          <p className="font-mono text-[11px] tracking-[0.16em] text-[var(--gn-amber-400)]">
            {it.date}
          </p>
          <h4 className="mt-1 font-display text-base font-bold text-[#e6eef8]">{it.title}</h4>
          {it.text ? <p className="mt-1 text-sm leading-relaxed text-[#a9bcd6]">{it.text}</p> : null}
        </li>
      ))}
    </ol>
  );
}

function MethodologySteps({
  steps,
}: {
  steps: { code: string; title: string; text: string }[];
}) {
  return (
    <ol className="grid gap-4 sm:grid-cols-2">
      {steps.map((s, i) => (
        <li
          key={i}
          className="flex gap-4 rounded-2xl border border-[#1b3455] bg-[#0a1628] p-5 transition-colors hover:border-[var(--gn-amber-500)]/50"
        >
          <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#1b3455] bg-[#060d1f] font-mono text-xs font-bold text-[var(--gn-amber-400)]">
            {s.code || String(i + 1).padStart(2, "0")}
          </span>
          <div>
            <h4 className="font-display text-sm font-bold text-[#e6eef8]">{s.title}</h4>
            <p className="mt-1 text-sm leading-relaxed text-[#a9bcd6]">{s.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

function CtaBand({ block }: { block: Extract<Block, { type: "cta" }> }) {
  return (
    <div className="rounded-3xl border border-[var(--gn-amber-500)]/40 bg-gradient-to-br from-[var(--gn-amber-500)]/10 via-[#0a1628] to-[#0a1628] p-7 sm:p-9">
      <h3 className="font-display text-xl font-bold text-[#e6eef8] sm:text-2xl">{block.title}</h3>
      {block.text ? <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#a9bcd6]">{block.text}</p> : null}
      <a
        href={block.href}
        className="mt-5 inline-flex items-center gap-2 rounded-full bg-[var(--gn-amber-500)] px-6 py-3 font-display text-sm font-bold text-[#060d1f] transition-transform hover:scale-[1.03]"
      >
        {block.label}
        <ArrowUpRight className="h-4 w-4" aria-hidden />
      </a>
    </div>
  );
}

function EmbedFrame({ block }: { block: Extract<Block, { type: "embed" }> }) {
  // YouTube → embed resmi; lainnya → kartu tautan (aman, tanpa iframe liar).
  const yt = block.url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/
  );
  return (
    <figure className="overflow-hidden rounded-2xl border border-[#1b3455] bg-[#060d1f]">
      {yt ? (
        <div className="aspect-video w-full">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${yt[1]}`}
            title={block.title ?? "Sematan video"}
            loading="lazy"
            allowFullScreen
            className="h-full w-full"
          />
        </div>
      ) : (
        <a
          href={block.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between gap-4 px-6 py-5 transition-colors hover:bg-[#0a1628]"
        >
          <span className="min-w-0">
            <span className="block truncate font-display text-sm font-bold text-[#e6eef8]">
              {block.title ?? block.url}
            </span>
            <span className="mt-0.5 block truncate font-mono text-xs text-[#5c87b8]">{block.url}</span>
          </span>
          <ArrowUpRight className="h-5 w-5 shrink-0 text-[var(--gn-amber-400)]" aria-hidden />
        </a>
      )}
    </figure>
  );
}

/** Render seluruh array blok menjadi konten artikel. */
export function BlockRenderer({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-7">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "paragraph":
            return <ProseText key={i} text={b.text} align={b.align} />;
          case "heading":
            return b.level === 2 ? (
              <h2
                key={i}
                id={headingAnchor(b.text)}
                className="scroll-mt-28 border-l-4 border-[var(--gn-amber-500)] pl-4 font-display text-2xl font-bold text-[#e6eef8] sm:text-[28px]"
              >
                {b.text}
              </h2>
            ) : (
              <h3 key={i} className="font-display text-xl font-bold text-[#e6eef8]">
                {b.text}
              </h3>
            );
          case "quote":
            return (
              <blockquote
                key={i}
                className="rounded-r-2xl border-l-4 border-[var(--gn-amber-500)] bg-[#0a1628] px-6 py-5"
              >
                <p className="text-lg leading-relaxed text-[#e6eef8]">“{b.text}”</p>
                {b.attribution ? (
                  <cite className="mt-2 block font-mono text-xs not-italic tracking-[0.14em] text-[#5c87b8]">
                    — {b.attribution}
                  </cite>
                ) : null}
              </blockquote>
            );
          case "list":
            return b.ordered ? (
              <ol key={i} className="list-decimal space-y-2.5 pl-6 text-base leading-[1.8] text-[#c6d6ea] marker:font-mono marker:text-[var(--gn-amber-400)]">
                {b.items.map((it, j) => (
                  <li key={j} className="pl-1">
                    {it}
                  </li>
                ))}
              </ol>
            ) : (
              <ul key={i} className="space-y-2.5 text-base leading-[1.8] text-[#c6d6ea]">
                {b.items.map((it, j) => (
                  <li key={j} className="flex gap-3">
                    <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--gn-amber-500)]" aria-hidden />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            );
          case "image":
            return <BlockImage key={i} block={b} />;
          case "code":
            return (
              <div key={i} className="overflow-hidden rounded-2xl border border-[#1b3455] bg-[#060d1f]">
                <div className="flex items-center justify-between border-b border-[#1b3455] px-5 py-2.5">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-[#5c87b8]">
                    {b.language.toUpperCase()}
                  </span>
                  <span className="flex gap-1.5" aria-hidden>
                    <span className="h-2.5 w-2.5 rounded-full bg-[#254872]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#254872]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[var(--gn-amber-500)]/70" />
                  </span>
                </div>
                <pre className="nice-scroll overflow-x-auto p-5 font-mono text-[13px] leading-relaxed text-[#a9d3c0]">
                  <code>{b.code}</code>
                </pre>
              </div>
            );
          case "callout": {
            const st = CALLOUT_STYLE[b.tone];
            const Icon = st.icon;
            return (
              <aside key={i} className={`flex gap-4 rounded-2xl border ${st.border} ${st.bg} p-5`}>
                <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${st.iconColor}`} aria-hidden />
                <div>
                  {b.title ? (
                    <p className="font-display text-sm font-bold text-[#e6eef8]">{b.title}</p>
                  ) : null}
                  <p className="mt-0.5 text-sm leading-relaxed text-[#c6d6ea]">{b.text}</p>
                </div>
              </aside>
            );
          }
          case "divider":
            return (
              <hr
                key={i}
                className="mx-auto w-24 border-0 border-t-2 border-dashed border-[#254872]"
                aria-hidden
              />
            );
          case "stats":
            return <StatBand key={i} items={b.items} />;
          case "cta":
            return <CtaBand key={i} block={b} />;
          case "comparison":
            return <ComparisonTable key={i} headers={b.headers} rows={b.rows} />;
          case "timeline":
            return <Timeline key={i} items={b.items} />;
          case "embed":
            return <EmbedFrame key={i} block={b} />;
          case "methodology":
            return <MethodologySteps key={i} steps={b.steps} />;
          default:
            return null;
        }
      })}
    </div>
  );
}
