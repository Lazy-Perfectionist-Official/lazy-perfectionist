import { RELEASES, type Release } from "@/lib/site";

import FootRow from "@/components/FootRow";
import PlateHeader from "@/components/PlateHeader";

// Plate 01 of the print: the catalog set as a tracklist on one shared
// three-column grid — plate label / content / year-and-listen. The row
// index lives in the same margin column as the plate label, so the titles
// align under the section heading instead of out-denting it.
const LEDE = "Three songs.";

export function ReleaseRow({
  release,
  index,
  showYear = true,
}: {
  release: Release;
  index: number;
  /** The year lives in the row on the cover; on the discography it lives
      in the year separator above the group, so the row omits it. */
  showYear?: boolean;
}) {
  return (
    <a
      href={release.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${release.title} — listen on Spotify`}
      data-testid={`release-${release.title.toLowerCase()}`}
      className="group grid grid-cols-[1.5rem_minmax(0,1fr)] gap-x-3 border-b border-line px-4 py-7 transition-colors duration-200 hover:bg-paper-deep/50 active:bg-paper-deep md:grid-cols-[9rem_minmax(0,1fr)_9rem] md:gap-x-10 md:px-6 md:py-9"
    >
      <span
        aria-hidden="true"
        className="pt-1.5 font-mono text-[10px] tabular-nums text-ink-soft/60 md:pt-2 md:text-sm"
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <span className="block">
        <span className="block font-display text-[1.5rem] leading-[1.05] tracking-[-0.01em] text-ink transition-colors duration-200 group-hover:text-rust md:text-5xl md:leading-[1.02]">
          {release.title}
        </span>
        {release.description?.trim() ? (
          <span className="mt-1.5 block max-w-md text-[0.9375rem] leading-relaxed text-ink-soft md:mt-2 md:text-base">
            {release.description}
          </span>
        ) : null}
      </span>

      <span
        className={`col-span-2 mt-3 flex items-baseline gap-6 md:col-span-1 md:col-start-3 md:mt-0 md:flex-col md:items-end ${
          showYear ? "justify-between" : "justify-end"
        }`}
      >
        {showYear ? (
          <span className="font-mono text-[10px] tabular-nums text-ink-soft md:text-sm">
            {release.year}
          </span>
        ) : null}
        <span
          aria-hidden="true"
          className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft transition-colors duration-200 group-hover:text-rust md:text-xs"
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
      <div className="mx-auto max-w-[90rem] px-5 md:px-10">
        <PlateHeader plate="Plate 01" title="Singles" lede={LEDE} meta="2025 — 2026" />

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
