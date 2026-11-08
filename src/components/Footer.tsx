import { LINER_NOTE } from "@/lib/site";

// The back cover: the page closes on ink, screened with a faint halftone
// so the colophon echoes the print's dots. No third wordmark — the print
// already carries the name twice.
export default function Footer({ narrow = false }: { narrow?: boolean }) {
  return (
    <footer
      className="relative overflow-hidden bg-ink text-paper"
      data-testid="site-footer"
    >
      <div
        aria-hidden="true"
        className="halftone pointer-events-none absolute inset-0 opacity-[0.14]"
      />

      <div
        className={`relative mx-auto px-5 py-8 md:px-10 md:py-11 ${
          narrow ? "max-w-[72rem]" : "max-w-[90rem]"
        }`}
      >
        {/* The liner note: the back cover is where a record says who made it
            — the one line on the page that answers a stranger's first
            question. Sentence case, so it reads as notes, not as a label. */}
        <p className="max-w-md font-mono text-xs leading-relaxed text-paper/70 md:text-sm">
          {LINER_NOTE}
        </p>

        <div className="mt-7 flex flex-col gap-3 md:mt-9 md:flex-row md:items-baseline md:justify-between">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-paper/80">
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
      </div>
    </footer>
  );
}
