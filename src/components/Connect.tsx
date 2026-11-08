import PlateHeader from "@/components/PlateHeader";
import { LINKS } from "@/lib/site";

// Plate 04: the destinations printed on the same two-column measure. The
// destination name sits in the content column under the heading; the
// typewriter role ("Artist profile", "Watch"…) lives in the margin, where
// the plate label sits above it. The shop and the writing have their own
// plates above.
const LINK_ITEMS = [
  { label: "Spotify", meta: "Artist profile", href: LINKS.spotifyArtist },
  { label: "YouTube", meta: "Watch", href: LINKS.youtube },
  { label: "Instagram", meta: "Follow", href: LINKS.instagram },
  { label: "Medium", meta: "Read", href: LINKS.medium },
  { label: "Ko-fi", meta: "Support", href: LINKS.kofi },
];

export default function Connect() {
  return (
    <section id="elsewhere" className="scroll-mt-8" data-testid="connect-section">
      <div className="mx-auto max-w-[90rem] px-5 md:px-10">
        <PlateHeader plate="Plate 04" title="Elsewhere" />

        <nav aria-label="Social and profile links" data-testid="connect-links">
          <ul>
            {LINK_ITEMS.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-baseline justify-between gap-4 border-b border-line px-4 py-4 transition-colors duration-200 hover:bg-paper-deep/50 active:bg-paper-deep md:grid md:grid-cols-[9rem_minmax(0,1fr)] md:gap-x-10 md:px-6 md:py-7"
                >
                  <span className="font-display text-2xl leading-none text-ink transition-colors duration-200 group-hover:text-rust md:col-start-2 md:row-start-1 md:text-4xl">
                    {item.label}
                  </span>

                  <span className="flex items-baseline gap-2 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft transition-colors duration-200 group-hover:text-press md:col-start-1 md:row-start-1 md:gap-3 md:text-xs md:tracking-[0.16em]">
                    {item.meta}
                    <span
                      aria-hidden="true"
                      className="inline-block transition-transform duration-200 group-hover:-translate-y-[2px] group-hover:translate-x-[2px]"
                    >
                      ↗
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
