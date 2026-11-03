import { LINKS } from "@/lib/site";

// The closer: every off-site destination in one place, so the header can
// stay small without hiding anything. Large serif names on hairline rows,
// with the category as the quiet counterweight on the right.
const LINK_ITEMS = [
  { label: "Spotify", meta: "Artist profile", href: LINKS.spotifyArtist },
  { label: "YouTube", meta: "Watch", href: LINKS.youtube },
  { label: "Instagram", meta: "Follow", href: LINKS.instagram },
  { label: "Twitter", meta: "Follow", href: LINKS.twitter },
  { label: "Store", meta: "Shop", href: LINKS.store },
];

export default function Connect() {
  return (
    <section id="elsewhere" className="scroll-mt-8 border-t border-line" data-testid="connect-section">
      <div className="mx-auto grid max-w-7xl px-6 md:grid-cols-[14rem_1fr] md:px-10">
        <div className="flex items-baseline gap-4 border-line py-8 md:block md:border-r md:py-16 md:pr-8">
          <p aria-hidden="true" className="font-display text-3xl italic text-muted/40 md:text-5xl">
            02
          </p>
          <h2 className="eyebrow md:mt-4">Elsewhere</h2>
        </div>

        <div className="pb-16 md:pb-24 md:pl-12 md:pt-14">
          <nav aria-label="Social and store links" data-testid="connect-links">
            <ul className="border-t border-line">
              {LINK_ITEMS.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-baseline justify-between gap-6 border-b border-line py-5 transition-colors duration-200 md:py-6"
                  >
                    <span className="display-link text-2xl transition-colors duration-200 group-hover:text-ember md:text-3xl">
                      {item.label}
                    </span>
                    <span className="flex items-baseline gap-3 text-[11px] font-medium uppercase tracking-[0.25em] text-muted transition-colors duration-200 group-hover:text-cream md:text-xs">
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
      </div>
    </section>
  );
}
