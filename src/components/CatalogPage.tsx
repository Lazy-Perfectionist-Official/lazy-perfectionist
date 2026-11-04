import type { ReactNode } from "react";

import AnnouncementBar from "@/components/AnnouncementBar";
import FootRow from "@/components/FootRow";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

// A plate's own screen: the masthead, the plate header on the print grid,
// a search line, the full list, and the hand-off to where the catalog is
// actually published. The search is a plain GET form filtered on the
// server — zero client JS, and every query is a URL you can share.
export default function CatalogPage({
  plate,
  title,
  lede,
  path,
  query,
  total,
  shown,
  noun,
  placeholder,
  external,
  testId,
  children,
}: {
  plate: string;
  title: string;
  lede: string;
  path: string;
  query: string;
  total: number;
  shown: number;
  noun: string;
  placeholder: string;
  external: { href: string; text: string; label: string };
  testId: string;
  children: ReactNode;
}) {
  const count = query
    ? `${shown} of ${total}`
    : `${total} ${noun}${total === 1 ? "" : "s"}`;

  return (
    <>
      <AnnouncementBar />
      <Header />

      <main className="pb-16 md:pb-24">
        <section data-testid={testId}>
          <div className="mx-auto max-w-[90rem] px-6 md:px-10">
            <div className="grid gap-4 border-b border-line px-4 pb-8 pt-12 md:grid-cols-[9rem_minmax(0,1fr)_9rem] md:items-start md:gap-x-10 md:px-6 md:pb-10 md:pt-20">
              <p className="eyebrow md:pt-3">{plate}</p>

              <div>
                <h1 className="font-display text-5xl leading-[0.95] tracking-[-0.01em] text-press md:text-7xl">
                  {title}
                </h1>
                <p className="mt-4 max-w-xl font-display text-2xl italic leading-snug text-ink-soft md:text-3xl">
                  {lede}
                </p>
              </div>

              <p className="eyebrow whitespace-nowrap md:pt-3 md:text-right">
                {count}
              </p>
            </div>

            {/* A GET form: the query lands in the URL, the server filters,
                and the back button still means what it should. */}
            <form
              role="search"
              action={path}
              method="get"
              className="flex flex-wrap items-baseline gap-x-4 gap-y-3 border-b border-line px-4 py-5 md:px-6 md:py-6"
            >
              <label htmlFor="q" className="eyebrow">
                Search
              </label>
              <input
                id="q"
                name="q"
                type="search"
                defaultValue={query}
                placeholder={placeholder}
                autoComplete="off"
                className="min-w-0 flex-1 border-b border-line bg-transparent pb-1 font-mono text-sm text-ink transition-colors duration-200 placeholder:text-ink-soft/60 focus-visible:border-rust focus-visible:outline-none"
              />
              <button
                type="submit"
                className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-soft transition-colors duration-200 hover:text-rust md:text-xs"
              >
                Find ↗
              </button>
            </form>

            {shown === 0 ? (
              <div className="border-b border-line px-4 py-7 md:px-6">
                <p className="font-display text-2xl italic leading-snug text-ink-soft">
                  Nothing matches “{query}”.
                </p>
                <a
                  href={path}
                  className="mt-4 inline-block font-mono text-[11px] uppercase tracking-[0.16em] text-ink-soft underline underline-offset-4 transition-colors duration-200 hover:text-rust md:text-xs"
                >
                  Clear search
                </a>
              </div>
            ) : (
              children
            )}

            <FootRow href={external.href} label={external.label} text={external.text} external />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
