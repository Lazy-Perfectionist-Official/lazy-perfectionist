// The back cover: the page closes on ink, screened with a faint halftone
// so the colophon echoes the print's dots. No third wordmark — the print
// already carries the name twice.
export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden bg-ink text-paper"
      data-testid="site-footer"
    >
      <div
        aria-hidden="true"
        className="halftone pointer-events-none absolute inset-0 opacity-[0.14]"
      />

      <div className="relative mx-auto flex max-w-[90rem] flex-col gap-3 px-6 py-9 md:flex-row md:items-baseline md:justify-between md:px-10 md:py-11">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-paper/80 md:text-xs">
          <span className="block sm:inline">© 2026 Lazy Perfectionist</span>
          <span className="hidden sm:inline"> · </span>
          <span className="block sm:inline">Hong Kong</span>
        </p>
        <a
          href="#top"
          className="inline-block py-2.5 font-mono text-xs uppercase tracking-[0.18em] text-paper/80 transition-colors duration-200 hover:text-paper focus-visible:outline-paper"
        >
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
