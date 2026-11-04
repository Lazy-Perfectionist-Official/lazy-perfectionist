import type { Metadata } from "next";

import CatalogPage from "@/components/CatalogPage";
import { ShopRow } from "@/components/Shop";
import shop from "@/lib/kofi-shop.json";
import { LINKS, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Tabs, stems and jam tracks from Lazy Perfectionist — free and pay-what-you-want downloads hosted on Ko-fi.",
  alternates: SITE_URL ? { canonical: "/shop" } : undefined,
};

// The whole synced listing, searchable on the server from `q`.
export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[] }>;
}) {
  const { q } = await searchParams;
  const query = (Array.isArray(q) ? q[0] : q ?? "").trim();
  const needle = query.toLowerCase();

  const products = needle
    ? shop.products.filter((product) =>
        `${product.name} ${product.summary}`.toLowerCase().includes(needle),
      )
    : shop.products;

  return (
    <CatalogPage
      plate="Plate 02"
      title="Shop"
      lede="Tabs, stems and jam tracks."
      path="/shop"
      query={query}
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
