import { LINKS } from "@/lib/site";

// Plini pattern: the social/footer strip is nothing but quiet text
// links. Streaming, socials, and the shop all live off-site.
const LINK_ITEMS = [
  { label: "Spotify", href: LINKS.spotifyArtist },
  { label: "YouTube", href: LINKS.youtube },
  { label: "Instagram", href: LINKS.instagram },
  { label: "Twitter", href: LINKS.twitter },
  { label: "Store", href: LINKS.store },
];

export default function Connect() {
  return (
    <section className="border-t border-line" data-testid="connect-section">
      <div className="mx-auto flex max-w-5xl flex-col items-center px-6 py-16 text-center md:py-24">
        <p className="eyebrow">Elsewhere</p>

        <nav aria-label="Social and store links" data-testid="connect-links">
          <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {LINK_ITEMS.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="quiet-link text-sm md:text-sm"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
