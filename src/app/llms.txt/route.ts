import { LINKS, LINER_NOTE, RELEASES, SITE_URL } from "@/lib/site";

// /llms.txt — the site's own summary for language models, in the emerging
// llmstxt.org shape: an H1, a one-paragraph summary, then short link lists.
// It is generated from the same content the pages read, so a release or a
// handle can never drift between the site and its machine-readable card.
export const dynamic = "force-static";

const url = (path: string) =>
  SITE_URL ? new URL(path, SITE_URL).toString() : path;

export function GET() {
  // Derived, not typed out: a new release must never be missing from the
  // summary just because a sentence counted to three.
  const titles = RELEASES.map((release) => `${release.title} (${release.year})`);
  const sentence =
    titles.length > 2
      ? `${titles.slice(0, -1).join(", ")} and ${titles.at(-1)}`
      : titles.join(" and ");

  const lines = [
    "# Lazy Perfectionist",
    "",
    `> ${LINER_NOTE} A one-person project, self-released, on every major`,
    "> streaming platform.",
    "",
    "The site is a single-page print plus four plate screens; every screen is",
    "server-rendered and readable without JavaScript. Every release links",
    "straight to its streaming page.",
    "",
    `Singles out: ${sentence}.`,
    "",
    "## Releases",
    "",
    ...RELEASES.map(
      (release) =>
        `- [${release.title}](${release.href}): ${release.year}${
          release.description ? ` — ${release.description.replace(/\.$/, "")}` : ""
        }`,
    ),
    "",
    "## Pages",
    "",
    `- [Discography](${url("/discography")}): every release, filed under its year, with search and sorting`,
    `- [Singles](${url("/music")}): the catalog as one searchable list`,
    `- [Shop](${url("/shop")}): tabs, stems and jam tracks — free or pay-what-you-want on Ko-fi`,
    `- [Writing](${url("/writing")}): notes on making the records, published on Medium`,
    "",
    "## Elsewhere",
    "",
    `- [Spotify artist page](${LINKS.spotifyArtist})`,
    `- [YouTube](${LINKS.youtube})`,
    `- [Instagram](${LINKS.instagram})`,
    `- [Medium](${LINKS.medium})`,
    `- [Ko-fi](${LINKS.kofi})`,
    "",
  ];

  return new Response(`${lines.join("\n")}\n`, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}
