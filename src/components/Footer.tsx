// A colophon, not a third wordmark: the brand already owns the header and
// the hero. One line of provenance on the left, the way back to the top on
// the right.
export default function Footer() {
  return (
    <footer className="border-t border-line" data-testid="site-footer">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-6 text-[11px] font-medium uppercase tracking-[0.25em] text-muted/70 md:flex-row md:items-baseline md:justify-between md:px-10 md:py-8 md:text-xs">
        <p>
          <span className="block sm:inline">© 2026 Lazy Perfectionist</span>
          <span className="hidden sm:inline"> · </span>
          <span className="block sm:inline">Hong Kong</span>
        </p>
        <a href="#top" className="quiet-link">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
