import type { ReactNode } from "react";

import AnnouncementBar from "@/components/AnnouncementBar";
import FootRow from "@/components/FootRow";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SkipLink from "@/components/SkipLink";
import { filteredHref, type TagCount } from "@/lib/tags";

// A plate's own screen: the masthead, the plate header on the print grid,
// a search line, a tag row when the listing carries tags, the full list,
// and the hand-off to where the catalog is actually published. Search and
// tags are plain GET requests filtered on the server — zero client JS, and
// every filter is a URL you can share.
export default function CatalogPage({
  plate,
  title,
  lede,
  path,
  query,
  tag,
  tags,
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
  tag?: string;
  tags?: TagCount[];
  total: number;
  shown: number;
  noun: string;
  placeholder: string;
  external: { href: string; text: string; label: string };
  testId: string;
  children: ReactNode;
}) {
  const filtered = Boolean(query || tag);
  const count = filtered
    ? `${shown} of ${total}`
    : `${total} ${noun}${total === 1 ? "" : "s"}`;

  // The active chip is inverted rather than only recoloured, so the state
  // never depends on telling two browns apart.
  const chip = (active: boolean) =>
    `border px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.16em] transition-colors duration-200 md:text-xs ${
      active
        ? "border-ink bg-ink text-paper"
        : "border-line text-ink-soft hover:border-rust hover:text-rust"
    }`;

  return (
    <>
      <SkipLink />
      <AnnouncementBar />
      <Header />

      <main id="main" tabIndex={-1} className="pb-16 md:pb-24">
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
              {/* A search inside a tag stays inside it: the tag rides along
                  as a hidden field rather than being reset. */}
              {tag ? <input type="hidden" name="tag" value={tag} /> : null}
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

            {/* Tags are links, not controls: each one is a GET to the same
                screen, carrying whatever search is already running. */}
            {tags && tags.length > 0 ? (
              <nav
                aria-label="Tags"
                className="flex flex-wrap items-center gap-x-2 gap-y-2 border-b border-line px-4 py-4 md:px-6 md:py-5"
              >
                <span className="eyebrow mr-1">Tags</span>
                <a
                  href={filteredHref(path, { q: query })}
                  aria-current={!tag ? "true" : undefined}
                  className={chip(!tag)}
                >
                  All
                </a>
                {tags.map((entry) => (
                  <a
                    key={entry.slug}
                    href={filteredHref(path, { tag: entry.slug, q: query })}
                    aria-current={tag === entry.slug ? "true" : undefined}
                    className={chip(tag === entry.slug)}
                  >
                    {entry.label}
                  </a>
                ))}
              </nav>
            ) : null}

            {shown === 0 ? (
              <div className="border-b border-line px-4 py-7 md:px-6">
                <p className="font-display text-2xl italic leading-snug text-ink-soft">
                  {query ? `Nothing matches “${query}”.` : "Nothing under this tag yet."}
                </p>
                <a
                  href={filteredHref(path, { tag: query ? tag : undefined })}
                  className="mt-4 inline-block font-mono text-[11px] uppercase tracking-[0.16em] text-ink-soft underline underline-offset-4 transition-colors duration-200 hover:text-rust md:text-xs"
                >
                  {query ? "Clear search" : "Show all"}
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
