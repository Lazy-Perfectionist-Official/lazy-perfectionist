import shop from "./kofi-shop.json";
import copy from "./shop-copy.json";

// The listing as the page prints it: Ko-fi's synced facts with the curated
// summaries from shop-copy.json applied at render time. Applying them here
// rather than in the sync is what lets /admin edit the copy — a save
// commits, the site rebuilds, and the row changes without a local sync run.
export type Product = (typeof shop.products)[number];

const curated = new Map(
  copy.summaries.map((entry) => [entry.slug, entry.summary]),
);

export const SHOP_PRODUCTS: Product[] = shop.products.map((product) => ({
  ...product,
  summary: curated.get(product.slug) ?? product.summary,
}));
