import type { Metadata } from "next";

import CatalogPage from "@/components/CatalogPage";
import { ReleaseRow } from "@/components/Releases";
import { LINKS, RELEASES, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Singles",
  description:
    "Lazy Perfectionist's singles — LUSG, Cyclothymia and Orbit — with links to listen on Spotify.",
  alternates: SITE_URL ? { canonical: "/music" } : undefined,
};

// The full release catalog, searchable. Filtering happens on the server
// from the `q` parameter, so the result is a plain URL and no client JS.
export default async function MusicPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[] }>;
}) {
  const { q } = await searchParams;
  const query = (Array.isArray(q) ? q[0] : q ?? "").trim();
  const needle = query.toLowerCase();

  const releases = needle
    ? RELEASES.filter((release) =>
        `${release.title} ${release.description ?? ""} ${release.year}`
          .toLowerCase()
          .includes(needle),
      )
    : RELEASES;

  return (
    <CatalogPage
      plate="Plate 01"
      title="Singles"
      lede="Three songs."
      path="/music"
      query={query}
      total={RELEASES.length}
      shown={releases.length}
      noun="release"
      placeholder="Title, description or year…"
      external={{
        href: LINKS.spotifyArtist,
        text: "Spotify",
        label: "Lazy Perfectionist on Spotify",
      }}
      testId="music-screen"
    >
      {/* The margin numeral is the catalog position, not the result
          position: a search that returns one song must not print 01 for
          what is the third release. */}
      {releases.map((release) => (
        <ReleaseRow
          key={release.title}
          release={release}
          index={RELEASES.indexOf(release)}
        />
      ))}
    </CatalogPage>
  );
}
