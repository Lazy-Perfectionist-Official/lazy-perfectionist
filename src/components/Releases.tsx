import { RELEASES, type Release } from "@/lib/site";

import FootRow from "@/components/FootRow";

// Plate 01 of the print: the catalog set as a tracklist on one shared
// three-column grid — plate label / content / year-and-listen. The row
// index lives in the same margin column as the plate label, so the titles
// align under the section heading instead of out-denting it.
const LEDE = "Three songs, one bedroom.";

export function ReleaseRow({ release, index }: { release: Release; index: number }) {
  return (
    <a
      href={release.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${release.title} — listen on Spotify`}
      data-testid={`release-${release.title.toLowerCase()}`}
      className="group grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-4 border-b border-line px-4 py-7 transition-colors duration-200 hover:bg-paper-deep/50 active:bg-paper-deep md:grid-cols-[9rem_minmax(0,1fr)_9rem] md:gap-x-10 md:px-6 md:py-9"
    >
      <span
        aria-hidden="true"
        className="pt-1 font-mono text-xs tabular-nums text-ink-soft/60 md:pt-2 md:text-sm"
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <span className="block">
        <span className="block font-display text-4xl leading-[1.02] tracking-[-0.01em] text-ink transition-colors duration-200 group-hover:text-rust md:text-5xl">
          {release.title}
        </span>
        {release.description?.trim() ? (
          <span className="mt-2 block max-w-md text-base leading-relaxed text-ink-soft">
            {release.description}
          </span>
        ) : null}
      </span>

      <span className="col-span-2 mt-4 flex items-baseline justify-between md:col-span-1 md:col-start-3 md:mt-0 md:flex-col md:items-end">
        <span className="font-mono text-xs tabular-nums text-ink-soft md:text-sm">
          {release.year}
        </span>
        <span
          aria-hidden="true"
          className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-soft transition-colors duration-200 group-hover:text-rust md:text-xs"
        >
          Listen{" "}
          <span className="inline-block transition-transform duration-200 group-hover:-translate-y-[2px] group-hover:translate-x-[2px]">
            ↗
          </span>
        </span>
      </span>
    </a>
  );
}

export default function Releases() {
  return (
    <section id="music" className="scroll-mt-8" data-testid="releases-section">
      <div className="mx-auto max-w-[90rem] px-6 md:px-10">
        <div className="grid gap-4 border-b border-line px-4 pb-8 pt-12 md:grid-cols-[9rem_minmax(0,1fr)_9rem] md:items-start md:gap-x-10 md:px-6 md:pb-10 md:pt-20">
          <p className="eyebrow md:pt-3">Plate 01</p>

          <div>
            <h2 className="font-display text-5xl leading-[0.95] tracking-[-0.01em] text-press md:text-7xl">
              Singles
            </h2>
            <p
              className="mt-4 max-w-xl font-display text-2xl italic leading-snug text-ink-soft md:text-3xl"
              data-testid="releases-heading"
            >
              {LEDE}
            </p>
          </div>

          <p className="eyebrow whitespace-nowrap md:pt-3 md:text-right">
            2025 — 2026
          </p>
        </div>

        <div>
          {RELEASES.map((release, index) => (
            <ReleaseRow key={release.title} release={release} index={index} />
          ))}

          <FootRow href="/music" label="More releases — open the full release list" />
        </div>
      </div>
    </section>
  );
}
