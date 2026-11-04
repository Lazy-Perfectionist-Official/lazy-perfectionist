import type { Metadata } from "next";

import CatalogPage from "@/components/CatalogPage";
import { PostRow } from "@/components/Writing";
import posts from "@/lib/medium-posts.json";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Notes from Lazy Perfectionist on making the records — the writing, published on Medium.",
  alternates: SITE_URL ? { canonical: "/writing" } : undefined,
};

// The whole archive the sync has kept, searchable on the server from `q`.
export default async function WritingPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[] }>;
}) {
  const { q } = await searchParams;
  const query = (Array.isArray(q) ? q[0] : q ?? "").trim();
  const needle = query.toLowerCase();

  const entries = needle
    ? posts.posts.filter((post) =>
        `${post.title} ${post.excerpt}`.toLowerCase().includes(needle),
      )
    : posts.posts;

  return (
    <CatalogPage
      plate="Plate 03"
      title="Writing"
      lede="Notes, on Medium."
      path="/writing"
      query={query}
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
      {entries.map((post, index) => (
        <PostRow key={post.slug} post={post} index={index} />
      ))}
    </CatalogPage>
  );
}
