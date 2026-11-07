import type { Metadata } from "next";

import CatalogPage from "@/components/CatalogPage";
import { PostRow } from "@/components/Writing";
import posts from "@/lib/medium-posts.json";
import { SITE_URL } from "@/lib/site";
import { firstParam, hasTag, tagCounts, tagSlug } from "@/lib/tags";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Notes from Lazy Perfectionist on making the records — the writing, published on Medium.",
  alternates: SITE_URL ? { canonical: "/writing" } : undefined,
};

// The whole archive the sync has kept, narrowed by `q` and by the post's
// own Medium tags — both filtered on the server.
export default async function WritingPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[]; tag?: string | string[] }>;
}) {
  const { q, tag } = await searchParams;
  const query = firstParam(q);
  const activeTag = tagSlug(firstParam(tag));
  const needle = query.toLowerCase();

  const tagged = activeTag
    ? posts.posts.filter((post) => hasTag(post, activeTag))
    : posts.posts;
  const entries = needle
    ? tagged.filter((post) =>
        `${post.title} ${post.excerpt} ${post.tags.join(" ")}`
          .toLowerCase()
          .includes(needle),
      )
    : tagged;

  return (
    <CatalogPage
      plate="Plate 03"
      title="Writing"
      lede="Notes, on Medium."
      path="/writing"
      query={query}
      tag={activeTag}
      tags={tagCounts(posts.posts)}
      total={posts.posts.length}
      shown={entries.length}
      noun="post"
      placeholder="Title or excerpt…"
      external={{
        href: posts.profileUrl,
        text: "Medium",
        label: "Lazy Perfectionist on Medium",
      }}
      testId="writing-screen"
    >
      {/* The numeral is the archive position, not the result position:
          narrowing the list must not renumber the posts it leaves. */}
      {entries.map((post) => (
        <PostRow key={post.slug} post={post} index={posts.posts.indexOf(post)} />
      ))}
    </CatalogPage>
  );
}
