import { Reveal } from "@/components/gunara/reveal";
import { cn } from "@/lib/utils";

/** Pola heading seksi yang konsisten: kicker mono + judul Sora + deskripsi. */
export function SectionHeading({
  kicker,
  title,
  description,
  align = "center",
  id,
}: {
  kicker: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  id?: string;
}) {
  return (
    <Reveal className={cn("max-w-3xl", align === "center" ? "mx-auto text-center" : "text-left")}>
      <p className="kicker">{kicker}</p>
      <h2 id={id} className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
