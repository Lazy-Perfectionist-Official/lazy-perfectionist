// Tags come from the listings themselves: Ko-fi's categories plus the
// product's kind (Tabs / Stems / Jam track / Freebies), and Medium's own
// post tags — both written by the sync scripts. A screen filters on a tag
// slug, so every filter is a plain URL (/shop?tag=tabs) and no client JS is
// needed to make it work.
export type Tagged = { tags?: string[] };

export type TagCount = { label: string; slug: string; count: number };

export const firstParam = (value: string | string[] | undefined) =>
  (Array.isArray(value) ? value[0] : (value ?? "")).trim();

export const tagSlug = (label: string) =>
  label
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const hasTag = (item: Tagged, slug: string) =>
  Boolean(slug) && (item.tags ?? []).some((tag) => tagSlug(tag) === slug);

// Counted across the whole list, most-used first, then alphabetical: the
// filter row shows the big shelves before the one-offs.
export const tagCounts = (items: Tagged[]): TagCount[] => {
  const bySlug = new Map<string, TagCount>();
  for (const item of items) {
    for (const tag of item.tags ?? []) {
      const slug = tagSlug(tag);
      if (!slug) continue;
      const entry = bySlug.get(slug);
      if (entry) entry.count += 1;
      else bySlug.set(slug, { label: tag, slug, count: 1 });
    }
  }
  return [...bySlug.values()].sort(
    (a, b) => b.count - a.count || a.label.localeCompare(b.label),
  );
};

// A link that keeps whatever else is narrowing the list: a search keeps its
// tag, and a tag keeps the search.
export const filteredHref = (
  path: string,
  params: Record<string, string | undefined>,
) => {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value) search.set(key, value);
  }
  const query = search.toString();
  return query ? `${path}?${query}` : path;
};
