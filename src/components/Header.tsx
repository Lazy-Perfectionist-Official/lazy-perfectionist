// The masthead: Bodoni wordmark left (the poster's face), tiny tracked
// caps right, one hairline underneath. The wordmark always goes back to
// the cover. Nav items point at the cover's plates by hash — from the
// cover itself that is a same-document jump, and from the plate screens it
// brings you home to the right place. The off-site destinations live in
// Elsewhere and the announcement bar.
const NAV = [
  { label: "Music", href: "/#music" },
  { label: "Discography", href: "/discography" },
  { label: "Shop", href: "/#shop" },
  { label: "Writing", href: "/#writing" },
  { label: "Elsewhere", href: "/#elsewhere" },
];

export default function Header({ narrow = false }: { narrow?: boolean }) {
  return (
    <header id="top" className="border-b border-line" data-testid="site-header">
      <div
        className={`mx-auto flex flex-col gap-4 px-4 py-5 md:gap-3 md:px-10 md:py-7 lg:flex-row lg:items-baseline lg:justify-between lg:gap-8 ${
          narrow ? "max-w-[72rem]" : "max-w-[90rem]"
        }`}
      >
        <a
          href="/"
          className="font-display text-xl leading-none text-ink transition-colors duration-200 hover:text-press md:text-[1.75rem]"
          data-testid="wordmark"
        >
          Lazy Perfectionist
        </a>

        <nav aria-label="Primary" data-testid="primary-nav">
          <ul className="flex flex-wrap items-center gap-x-1.5 gap-y-2 sm:gap-x-3 md:justify-end md:gap-x-9">
            {NAV.map((item) => (
              <li key={item.label}>
                <a href={item.href} className="nav-link">
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
