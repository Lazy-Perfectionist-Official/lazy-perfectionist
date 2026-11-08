import CatalogPage from "@/components/CatalogPage";
import { ReleaseRow } from "@/components/Releases";
import { pageMetadata } from "@/lib/metadata";
import { LINKS, RELEASES, type Release } from "@/lib/site";
import { catalogGraph } from "@/lib/structured-data";
import { filteredHref, firstParam, tagSlug } from "@/lib/tags";

export const metadata = pageMetadata({
  title: "Discography",
  description:
    "The full Lazy Perfectionist discography — every release, by year, with links to listen on Spotify.",
  path: "/discography",
});

// The ordered catalog: every release under the year it belongs to, one
// separator card per year. Search, the year facets and the order are plain
// URL parameters filtered on the server, like every other plate screen.
const SORT_MODES = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "title", label: "A–Z" },
] as const;

type SortMode = (typeof SORT_MODES)[number]["value"];

const isSortMode = (value: string): value is SortMode =>
  SORT_MODES.some((mode) => mode.value === value);

const yearNumber = (release: Release) => Number(release.year);

export default async function DiscographyPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string | string[];
    tag?: string | string[];
    sort?: string | string[];
  }>;
}) {
  const { q, tag, sort } = await searchParams;
  const query = firstParam(q);
  const needle = query.toLowerCase();

  // The catalog's years, newest first — the facets and the valid slugs.
  const years = [...new Set(RELEASES.map((release) => release.year))].sort(
    (a, b) => Number(b) - Number(a),
  );
  const yearSlug = tagSlug(firstParam(tag));
  const activeYear = years.includes(yearSlug) ? yearSlug : undefined;

  const requested = firstParam(sort);
  const sortMode: SortMode = isSortMode(requested) ? requested : "newest";

  const filtered = RELEASES.filter(
    (release) =>
      (!activeYear || release.year === activeYear) &&
      (!needle ||
        `${release.title} ${release.description ?? ""} ${release.year}`
          .toLowerCase()
          .includes(needle)),
  );

  // Oldest reverses the catalog before ordering by year, so the order
  // inside a year flips too — the list reads bottom-up, not just
  // group-shuffled. A–Z keeps the years newest first and sorts inside them.
  const entries = (() => {
    if (sortMode === "oldest") {
      return [...filtered].reverse().sort((a, b) => yearNumber(a) - yearNumber(b));
    }
    if (sortMode === "title") {
      return [...filtered].sort(
        (a, b) => yearNumber(b) - yearNumber(a) || a.title.localeCompare(b.title),
      );
    }
    return [...filtered].sort((a, b) => yearNumber(b) - yearNumber(a));
  })();

  // Sorted entries group consecutively, so one pass keeps the separators in
  // the same order the rows are in.
  const groups: { year: string; entries: Release[] }[] = [];
  for (const release of entries) {
    const last = groups.at(-1);
    if (last?.year === release.year) last.entries.push(release);
    else groups.push({ year: release.year, entries: [release] });
  }

  return (
    <CatalogPage
      plate="Plate 04"
      title="Discography"
      lede="Every release, by year."
      path="/discography"
      query={query}
      tag={activeYear}
      tags={years.map((year) => ({
        label: year,
        slug: year,
        count: RELEASES.filter((release) => release.year === year).length,
      }))}
      tagsLabel="Year"
      sort={{
        active: sortMode,
        defaultValue: "newest",
        options: SORT_MODES.map((mode) => ({
          value: mode.value,
          label: mode.label,
          href: filteredHref("/discography", {
            q: query,
            tag: activeYear,
            sort: mode.value === "newest" ? undefined : mode.value,
          }),
        })),
      }}
      total={RELEASES.length}
      shown={entries.length}
      noun="release"
      placeholder="Title, description or year…"
      external={{
        href: LINKS.spotifyArtist,
        text: "Spotify",
        label: "Lazy Perfectionist on Spotify",
      }}
      testId="discography-screen"
    >
      {/* The catalog as a crawler reads it: the page, and the releases as an
          ordered ItemList pointing at their Spotify pages. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            catalogGraph({ name: "Discography", path: "/discography" }),
          ),
        }}
      />

      {groups.map((group) => (
        <section
          key={group.year}
          aria-labelledby={`year-${group.year}`}
          data-testid={`year-group-${group.year}`}
        >
          {/* The separator card: the year set like a plate heading so the
              rows under it read as that year's pressing, not as more
              entries in one undivided list. */}
          <div className="grid grid-cols-[1.5rem_minmax(0,1fr)] gap-x-3 border-b border-line bg-paper-deep/40 px-4 py-4 md:grid-cols-[9rem_minmax(0,1fr)_9rem] md:gap-x-10 md:px-6 md:py-6">
            <h2
              id={`year-${group.year}`}
              className="col-start-2 font-display text-3xl leading-[1.05] tracking-[-0.01em] text-press md:col-start-2 md:text-5xl md:leading-[0.95]"
            >
              {group.year}
            </h2>
            <p className="col-span-2 col-start-2 mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft md:col-span-1 md:col-start-3 md:mt-0 md:self-center md:text-right md:text-xs md:tracking-[0.16em]">
              {group.entries.length}{" "}
              {group.entries.length === 1 ? "release" : "releases"}
            </p>
          </div>

          {/* The numeral is the position inside the year, because the year
              separator above already carries the catalog's order. */}
          {group.entries.map((release, index) => (
            <ReleaseRow
              key={release.title}
              release={release}
              index={index}
              showYear={false}
            />
          ))}
        </section>
      ))}
    </CatalogPage>
  );
}
