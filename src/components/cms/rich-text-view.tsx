/**
 * Gunara CMS — RichTextView (Fase 2: Editor Ultra).
 * Merender hasil parseInline() menjadi elemen React murni — tanpa
 * dangerouslySetInnerHTML, tanpa hook, aman untuk server & client.
 * Gaya mengikuti sistem navy-amber situs publik.
 */
import { parseInline, type InlineSeg } from "@/lib/cms/rich-text";

function Segmen({ seg }: { seg: InlineSeg }) {
  switch (seg.t) {
    case "bold":
      return <strong className="font-semibold text-[#e6eef8]">{seg.s}</strong>;
    case "italic":
      return <em className="italic text-[#dce7f5]">{seg.s}</em>;
    case "strike":
      return <del className="text-[#8fa8c6] line-through">{seg.s}</del>;
    case "code":
      return (
        <code className="rounded-md border border-[#254872] bg-[#060d1f] px-1.5 py-0.5 font-mono text-[0.85em] text-[#a9d3c0]">
          {seg.s}
        </code>
      );
    case "mark":
      return (
        <mark className="rounded-sm bg-[var(--gn-amber-500)]/25 px-1 text-[#f0e6d2] [&]:bg-[color-mix(in_srgb,var(--gn-amber-500)_24%,transparent)]">
          {seg.s}
        </mark>
      );
    case "link": {
      const eksternal = /^https?:\/\//i.test(seg.href);
      return (
        <a
          href={seg.href}
          {...(eksternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="text-[var(--gn-amber-400)] underline decoration-[var(--gn-amber-500)]/40 underline-offset-4 transition-colors hover:decoration-[var(--gn-amber-400)]"
        >
          {seg.s}
        </a>
      );
    }
    default:
      return <span>{seg.s}</span>;
  }
}

/** Teks dengan format inline — dipakai renderer, pratinjau, dan kartu editor. */
export function InlineRich({ text }: { text: string }) {
  const segs = parseInline(text);
  if (segs.length === 1 && segs[0].t === "text") return <span>{segs[0].s}</span>;
  return (
    <>
      {segs.map((seg, i) => (
        <Segmen key={i} seg={seg} />
      ))}
    </>
  );
}
