import type { ReactNode } from "react";

import AnnouncementBar from "@/components/AnnouncementBar";
import FootRow from "@/components/FootRow";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PlateHeader from "@/components/PlateHeader";
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
  tagsLabel = "Tags",
  sort,
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
  /** What the facet row calls itself: tags on the shop and writing
      screens, years on the discography. */
  tagsLabel?: string;
  /** An ordered screen's sort links. `defaultValue` keeps the default
      order out of the URL; every other control carries it along. */
  sort?: {
    active: string;
    defaultValue: string;
    options: { value: string; label: string; href: string }[];
  };
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

  // Only a non-default order earns a query parameter: the plain screen
  // stays /discography, and the controls carry the order along.
  const sortParam =
    sort && sort.active !== sort.defaultValue ? sort.active : undefined;

  // The active chip is inverted rather than only recoloured, so the state
  // never depends on telling two browns apart.
  const chip = (active: boolean) =>
    `border px-2.5 py-2 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors duration-200 md:text-xs md:tracking-[0.16em] ${
      active
        ? "border-ink bg-ink text-paper"
        : "border-line text-ink-soft hover:border-rust hover:text-rust"
    }`;

  return (
    <>
      <SkipLink />
      <AnnouncementBar />
      <Header narrow />

      <main id="main" tabIndex={-1} className="pb-16 md:pb-24">
        <section data-testid={testId}>
          <div className="mx-auto max-w-[72rem] px-5 md:px-10">
            <PlateHeader plate={plate} title={title} lede={lede} meta={count} as="h1" />

            {/* A GET form: the query lands in the URL, the server filters,
                and the back button still means what it should. */}
            <form
              role="search"
              action={path}
              method="get"
              className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-4 gap-y-2 border-b border-line px-4 py-4 md:flex md:flex-wrap md:items-baseline md:gap-x-4 md:gap-y-3 md:px-6 md:py-6"
            >
              {/* A search inside a tag stays inside it: the tag rides along
                  as a hidden field rather than being reset. */}
              {tag ? <input type="hidden" name="tag" value={tag} /> : null}
              {sortParam ? (
                <input type="hidden" name="sort" value={sortParam} />
              ) : null}
              <label
                htmlFor="q"
                className="eyebrow col-start-1 row-start-1"
              >
                Search
              </label>
              <input
                id="q"
                name="q"
                type="search"
                defaultValue={query}
                placeholder={placeholder}
                autoComplete="off"
                className="col-span-2 col-start-1 row-start-2 min-w-0 border-b border-line bg-transparent pb-1 font-mono text-base text-ink transition-colors duration-200 placeholder:text-ink-soft/60 focus-visible:border-rust focus-visible:outline-none md:col-auto md:row-auto md:flex-1 md:text-sm"
              />
              <button
                type="submit"
                className="col-start-2 row-start-1 justify-self-end font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft transition-colors duration-200 hover:text-rust md:text-xs md:tracking-[0.16em]"
              >
                Find{" "}
                <span aria-hidden="true" className="inline-block">
                  ↗
                </span>
              </button>
            </form>

            {/* Tags are links, not controls: each one is a GET to the same
                screen, carrying whatever search is already running. */}
            {tags && tags.length > 0 ? (
              <nav
                aria-label={tagsLabel}
                className="flex flex-wrap items-center gap-x-2 gap-y-2 border-b border-line px-4 py-3 md:px-6 md:py-5"
              >
                <span className="eyebrow mr-1">{tagsLabel}</span>
                <a
                  href={filteredHref(path, { q: query, sort: sortParam })}
                  aria-current={!tag ? "true" : undefined}
                  className={chip(!tag)}
                >
                  All
                </a>
                {tags.map((entry) => (
                  <a
                    key={entry.slug}
                    href={filteredHref(path, {
                      tag: entry.slug,
                      q: query,
                      sort: sortParam,
                    })}
                    aria-current={tag === entry.slug ? "true" : undefined}
                    className={chip(tag === entry.slug)}
                  >
                    {entry.label}
                  </a>
                ))}
              </nav>
            ) : null}

            {/* An ordered screen's order: links, like the facets, so the
                chosen order is in the URL and survives a search. */}
            {sort ? (
              <nav
                aria-label="Sort"
                className="flex flex-wrap items-center gap-x-2 gap-y-2 border-b border-line px-4 py-3 md:px-6 md:py-5"
              >
                <span className="eyebrow mr-1">Sort</span>
                {sort.options.map((option) => (
                  <a
                    key={option.value}
                    href={option.href}
                    aria-current={
                      sort.active === option.value ? "true" : undefined
                    }
                    className={chip(sort.active === option.value)}
                  >
                    {option.label}
                  </a>
                ))}
              </nav>
            ) : null}

            {shown === 0 ? (
              <div className="border-b border-line px-4 py-6 md:px-6 md:py-7">
                <p className="font-display text-2xl italic leading-snug text-ink-soft">
                  {query ? `Nothing matches “${query}”.` : "Nothing under this filter yet."}
                </p>
                <a
                  href={filteredHref(path, {
                    tag: query ? tag : undefined,
                    sort: sortParam,
                  })}
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

      <Footer narrow />
    </>
  );
}
