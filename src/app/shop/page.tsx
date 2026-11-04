import type { Metadata } from "next";

import CatalogPage from "@/components/CatalogPage";
import { ShopRow } from "@/components/Shop";
import shop from "@/lib/kofi-shop.json";
import { LINKS, SITE_URL } from "@/lib/site";
import { firstParam, hasTag, tagCounts, tagSlug } from "@/lib/tags";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Tabs, stems and jam tracks from Lazy Perfectionist — free and pay-what-you-want downloads hosted on Ko-fi.",
  alternates: SITE_URL ? { canonical: "/shop" } : undefined,
};

// The whole synced listing, narrowed by search and by tag on the server.
export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[]; tag?: string | string[] }>;
}) {
  const { q, tag } = await searchParams;
  const query = firstParam(q);
  const activeTag = tagSlug(firstParam(tag));
  const needle = query.toLowerCase();

  const tagged = activeTag
    ? shop.products.filter((product) => hasTag(product, activeTag))
    : shop.products;
  const products = needle
    ? tagged.filter((product) =>
        `${product.name} ${product.summary} ${product.tags.join(" ")}`
          .toLowerCase()
          .includes(needle),
      )
    : tagged;

  return (
    <CatalogPage
      plate="Plate 02"
      title="Shop"
      lede="Tabs, stems and jam tracks."
      path="/shop"
      query={query}
      tag={activeTag}
      tags={tagCounts(shop.products)}
      total={shop.products.length}
      shown={products.length}
      noun="item"
      placeholder="Name or summary…"
      external={{
        href: LINKS.store,
        text: "Ko-fi",
        label: "Open the shop on Ko-fi",
      }}
      testId="shop-screen"
    >
      {products.map((product) => (
        <ShopRow key={product.slug} product={product} />
      ))}
    </CatalogPage>
  );
}
