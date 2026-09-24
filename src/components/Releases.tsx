import { RELEASES } from "@/lib/site";

// Hairline catalog rows — the whole row is the link. Titles stay in
// Instrument Serif italic; the year and the listen label are the tiny
// tracked caps that carry the rest of the site.
export default function Releases() {
  return (
    <section id="music" className="scroll-mt-8" data-testid="releases-section">
      <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
        <p className="eyebrow">Singles</p>
        <h2
          className="mt-4 font-display text-4xl italic leading-tight text-cream md:text-5xl"
          data-testid="releases-heading"
        >
          Three songs, one bedroom.
        </h2>

        <div className="mt-12 border-t border-line md:mt-16">
          {RELEASES.map((release) => (
            <a
              key={release.title}
              href={release.href}
              target="_blank"
              rel="noopener noreferrer"
              data-testid={`release-${release.title.toLowerCase()}`}
              className="group block border-b border-line py-7 transition-colors duration-200 hover:bg-surface/60 active:bg-surface md:grid md:grid-cols-[5rem_1fr_auto] md:items-baseline md:gap-x-10 md:py-9"
            >
              <span className="text-[11px] md:text-xs font-medium tabular-nums tracking-[0.25em] text-muted/70">
                {release.year}
              </span>

              <span className="mt-2 block md:mt-0">
                <span className="font-display text-3xl italic text-cream transition-colors duration-200 group-hover:text-ember md:text-4xl">
                  {release.title}
                </span>
                <span className="mt-2 block max-w-md text-sm leading-relaxed text-cream/80">
                  {release.description}
                </span>
              </span>

              <span
                aria-hidden="true"
                className="mt-4 text-[11px] font-medium uppercase tracking-[0.25em] text-muted transition-colors duration-200 group-hover:text-cream md:mt-0 md:text-xs"
              >
                Listen{" "}
                <span className="inline-block transition-transform duration-200 group-hover:-translate-y-[2px] group-hover:translate-x-[2px]">
                  ↗
                </span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
