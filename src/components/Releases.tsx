import { RELEASES } from "@/lib/site";

// A catalog hanging off a fixed rail. The rail carries the section number
// and name plus the full-height hairline; the rows run the full content
// width with a ghost index, so the page stops floating in a centered box.
const LEDE = "Three songs, one bedroom.";

export default function Releases() {
  return (
    <section id="music" className="scroll-mt-8 border-t border-line" data-testid="releases-section">
      <div className="mx-auto grid max-w-7xl px-6 md:grid-cols-[14rem_1fr] md:px-10">
        <div className="flex items-baseline gap-4 border-line py-8 md:block md:border-r md:py-16 md:pr-8">
          <p aria-hidden="true" className="font-display text-3xl italic text-muted/40 md:text-5xl">
            01
          </p>
          <h2 className="eyebrow md:mt-4">Singles</h2>
        </div>

        <div className="pb-16 md:pb-24 md:pl-12 md:pt-16">
          <div className="flex flex-col gap-3 md:flex-row md:items-baseline md:justify-between">
            <p
              className="max-w-xl text-balance text-2xl font-medium tracking-tight text-cream md:text-3xl"
              data-testid="releases-heading"
            >
              {LEDE}
            </p>
            <p className="eyebrow whitespace-nowrap text-muted/70">2025 — 2026</p>
          </div>

          <div className="mt-10 border-t border-line md:mt-14">
            {RELEASES.map((release, index) => (
              <a
                key={release.title}
                href={release.href}
                target="_blank"
                rel="noopener noreferrer"
                data-testid={`release-${release.title.toLowerCase()}`}
                className="group grid grid-cols-[2.5rem_1fr] gap-x-4 border-b border-line py-7 transition-colors duration-200 hover:bg-surface/50 active:bg-surface md:grid-cols-[3.5rem_1fr_auto] md:gap-x-8 md:py-9"
              >
                <span
                  aria-hidden="true"
                  className="font-display text-2xl italic tabular-nums text-muted/40 md:text-3xl"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="block">
                  <span className="font-display text-2xl italic text-cream transition-colors duration-200 group-hover:text-ember md:text-3xl">
                    {release.title}
                  </span>
                  <span className="mt-2 block max-w-md text-base leading-relaxed text-cream/70">
                    {release.description}
                  </span>
                </span>

                <span className="col-span-2 mt-4 flex items-baseline justify-between md:col-span-1 md:mt-0 md:flex-col md:items-end md:gap-2">
                  <span className="text-[11px] font-medium tabular-nums tracking-[0.25em] text-muted/70 md:text-xs">
                    {release.year}
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-[11px] font-medium uppercase tracking-[0.25em] text-muted transition-colors duration-200 group-hover:text-cream md:text-xs"
                  >
                    Listen{" "}
                    <span className="inline-block transition-transform duration-200 group-hover:-translate-y-[2px] group-hover:translate-x-[2px]">
                      ↗
                    </span>
                  </span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
