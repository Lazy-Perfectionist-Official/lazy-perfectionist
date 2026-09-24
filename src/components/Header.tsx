import { LINKS } from "@/lib/site";

// Intervals pattern: centered wordmark over a centered row of tiny text
// links, closed by a hairline. Nav destinations are mostly external —
// the site itself is a single page.
const NAV = [
  { label: "Music", href: "#music", external: false },
  { label: "Store", href: LINKS.store, external: true },
  { label: "Spotify", href: LINKS.spotifyArtist, external: true },
  { label: "YouTube", href: LINKS.youtube, external: true },
  { label: "Instagram", href: LINKS.instagram, external: true },
];

export default function Header() {
  return (
    <header className="border-b border-line" data-testid="site-header">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-6 py-8 md:gap-8 md:py-10">
        <a
          href="/"
          className="font-display text-3xl italic text-cream md:text-4xl"
          data-testid="wordmark"
        >
          Lazy Perfectionist
        </a>

        <nav aria-label="Primary" data-testid="primary-nav">
          <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 md:gap-x-8">
            {NAV.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  {...(item.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="nav-link"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
