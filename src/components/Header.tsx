// The masthead: Bodoni wordmark left (the poster's face), tiny tracked
// caps right, one hairline underneath. The wordmark always goes back to
// the cover. Nav items point at the cover's plates by hash — from the
// cover itself that is a same-document jump, and from the plate screens it
// brings you home to the right place. The off-site destinations live in
// Elsewhere and the announcement bar.
//
// On a phone the five items fold into a MENU disclosure — native <details>,
// so the menu costs no framework JS — that drops over the fold on the
// sheet's own paper. From `md` the row is unchanged. The links are printed
// twice because a closed <details> hides its content beyond CSS's reach;
// exactly one list is ever displayed, so the accessibility tree (and a role
// query) still sees one of each.
const NAV = [
  { label: "Music", href: "/#music" },
  { label: "Discography", href: "/discography" },
  { label: "Shop", href: "/#shop" },
  { label: "Writing", href: "/#writing" },
  { label: "Elsewhere", href: "/#elsewhere" },
];

// A disclosure stays open through a same-document jump — tap Shop and the
// menu would hang over the plate it just scrolled to. Five lines are the
// whole script: choosing something closes the menu.
const CLOSE_ON_CHOICE = `(() => {
  const menu = document.getElementById("nav-menu");
  if (!menu) return;
  menu.addEventListener("click", (event) => {
    if (event.target instanceof Element && event.target.closest("a")) menu.open = false;
  });
})();`;

export default function Header({ narrow = false }: { narrow?: boolean }) {
  return (
    <header id="top" className="relative border-b border-line" data-testid="site-header">
      <div
        className={`mx-auto flex flex-col gap-3 px-9 py-5 md:gap-3 md:px-10 md:py-7 lg:flex-row lg:items-baseline lg:justify-between lg:gap-8 ${
          narrow ? "max-w-[72rem]" : "max-w-[90rem]"
        }`}
      >
        {/* On the phone the wordmark and MENU share one line; from `md` the
            wrapper dissolves and the nav takes its own row as before. The
            phone sets the masthead on the same text axis as the plates
            below it (the sheet's one rem-and-a-bit margin), so the wordmark,
            the menu and every card title start on one edge. The gap is only
            a floor — justify-between opens the line on a normal phone — but
            at 320px the two must fit, and 8px is what keeps them clear. */}
        <div className="flex items-baseline justify-between gap-2 md:contents">
          <a
            href="/"
            className="font-display text-[1.375rem] leading-none text-ink transition-colors duration-200 hover:text-press md:text-[1.75rem]"
            data-testid="wordmark"
          >
            Lazy Perfectionist
          </a>

          <nav aria-label="Primary" data-testid="primary-nav">
            <details id="nav-menu" className="nav-menu md:hidden">
              <summary className="nav-toggle" data-testid="menu-toggle">
                Menu
                <span aria-hidden="true" className="nav-menu-icon" />
              </summary>
              <ul className="nav-menu-list" data-testid="menu-list">
                {NAV.map((item) => (
                  <li key={item.label}>
                    <a href={item.href}>{item.label}</a>
                  </li>
                ))}
              </ul>
            </details>

            <ul
              className="hidden flex-wrap items-center gap-x-1.5 gap-y-2 sm:gap-x-3 md:flex md:justify-end md:gap-x-9"
              data-testid="nav-inline"
            >
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
      </div>
      <script dangerouslySetInnerHTML={{ __html: CLOSE_ON_CHOICE }} />
    </header>
  );
}
