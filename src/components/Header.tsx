import { LINKS } from "@/lib/site";

// The masthead: Bodoni wordmark left (the poster's face), tiny tracked
// caps right, one hairline underneath. Most destinations are off-site;
// the site itself is a single page, so the in-page anchors come first.
const NAV = [
  { label: "Music", href: "#music", external: false },
  { label: "Shop", href: "#shop", external: false },
  { label: "Elsewhere", href: "#elsewhere", external: false },
  { label: "Spotify", href: LINKS.spotifyArtist, external: true },
];

export default function Header() {
  return (
    <header id="top" className="border-b border-line" data-testid="site-header">
      <div className="mx-auto flex max-w-[90rem] flex-col gap-5 px-6 py-6 md:flex-row md:items-baseline md:justify-between md:gap-8 md:px-10 md:py-7">
        <a
          href="/"
          className="font-display text-2xl leading-none text-ink transition-colors duration-200 hover:text-press md:text-[1.75rem]"
          data-testid="wordmark"
        >
          Lazy Perfectionist
        </a>

        <nav aria-label="Primary" data-testid="primary-nav">
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 md:justify-end md:gap-x-9">
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
