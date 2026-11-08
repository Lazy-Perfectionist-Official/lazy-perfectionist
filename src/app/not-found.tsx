import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SkipLink from "@/components/SkipLink";

// A plate the issue does not carry. Same measure, same type, same
// masthead and back cover as every other screen — a wrong turn should
// still land on the print, not on the framework's default page.
export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SkipLink />
      <Header />

      <main id="main" tabIndex={-1} className="flex-1 pb-16 md:pb-24">
        <section data-testid="not-found">
          <div className="mx-auto max-w-[90rem] px-6 md:px-10">
            <div className="grid gap-4 border-b border-line px-4 pb-8 pt-12 md:grid-cols-[9rem_minmax(0,1fr)] md:items-start md:gap-x-10 md:px-6 md:pb-10 md:pt-20">
              <p className="eyebrow md:pt-3">Out of print</p>

              <div>
                <h1 className="font-display text-[2.25rem] leading-[0.95] tracking-[-0.01em] text-press md:text-7xl">
                  Page not found
                </h1>
                <p className="mt-4 max-w-xl font-display text-[1.1875rem] italic leading-snug text-ink-soft md:text-3xl">
                  This pressing was never part of the issue.
                </p>
                <p className="mt-8">
                  <a
                    href="/"
                    className="inline-block border-b border-ink pb-1 font-mono text-[11px] uppercase tracking-[0.18em] text-ink transition-colors duration-200 hover:text-rust md:text-xs"
                  >
                    Back to the cover{" "}
                    <span aria-hidden="true" className="inline-block">
                      ↗
                    </span>
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
