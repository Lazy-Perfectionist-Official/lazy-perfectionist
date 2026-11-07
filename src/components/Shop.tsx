import Image from "next/image";

import FootRow from "@/components/FootRow";
import { SHOP_PRODUCTS, type Product } from "@/lib/shop";

// Plate 02: the Ko-fi shop printed as a catalog. The listing is synced
// from the public shop and committed (`npm run sync:shop`) because Ko-fi
// exposes no shop API and refuses to be framed — so the store is native,
// static and honest, and every row hands off to the product page where
// payment happens. The plate prints the newest few; More opens /shop with
// the whole listing and a search.
const LEDE = "Tabs, stems and jam tracks.";
const HOME_LIMIT = 3;

const accessiblePrice = (product: Product) =>
  product.payWhatYouWant ? "pay what you want" : product.price;

export function ShopRow({ product }: { product: Product }) {
  return (
    <a
      href={product.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${product.name} — ${accessiblePrice(product)} on Ko-fi`}
      data-testid={`shop-${product.slug}`}
      className="group grid grid-cols-[3.5rem_minmax(0,1fr)] gap-x-4 border-b border-line px-4 py-6 transition-colors duration-200 hover:bg-paper-deep/50 active:bg-paper-deep md:grid-cols-[9rem_minmax(0,1fr)_9rem] md:gap-x-10 md:px-6 md:py-8"
    >
      <span className="relative block aspect-square overflow-hidden border border-line bg-paper-deep">
        <Image
          src={product.image}
          alt=""
          fill
          sizes="(min-width: 768px) 9rem, 3.5rem"
          className="object-cover"
        />
      </span>

      <span className="block">
        <span className="block font-display text-3xl leading-[1.02] tracking-[-0.01em] text-ink transition-colors duration-200 group-hover:text-rust md:text-4xl">
          {product.name}
        </span>
        <span className="mt-2 block max-w-md text-base leading-relaxed text-ink-soft">
          {product.summary}
        </span>
      </span>

      <span className="col-span-2 mt-4 flex items-baseline justify-between md:col-span-1 md:col-start-3 md:mt-0 md:flex-col md:items-end">
        <span className="font-mono text-xs tabular-nums text-ink-soft md:text-sm">
          {product.price}
        </span>
        <span
          aria-hidden="true"
          className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-soft transition-colors duration-200 group-hover:text-rust md:text-xs"
        >
          Get{" "}
          <span className="inline-block transition-transform duration-200 group-hover:-translate-y-[2px] group-hover:translate-x-[2px]">
            ↗
          </span>
        </span>
      </span>
    </a>
  );
}

export default function Shop() {
  return (
    <section id="shop" className="scroll-mt-8" data-testid="shop-section">
      <div className="mx-auto max-w-[90rem] px-6 md:px-10">
        <div className="grid gap-4 border-b border-line px-4 pb-8 pt-12 md:grid-cols-[9rem_minmax(0,1fr)_9rem] md:items-start md:gap-x-10 md:px-6 md:pb-10 md:pt-20">
          <p className="eyebrow md:pt-3">Plate 02</p>

          <div>
            <h2 className="font-display text-5xl leading-[0.95] tracking-[-0.01em] text-press md:text-7xl">
              Shop
            </h2>
            <p className="mt-4 max-w-xl font-display text-2xl italic leading-snug text-ink-soft md:text-3xl">
              {LEDE}
            </p>
          </div>

          <p className="eyebrow whitespace-nowrap md:pt-3 md:text-right">
            {SHOP_PRODUCTS.length} items
          </p>
        </div>

        <div>
          {SHOP_PRODUCTS.slice(0, HOME_LIMIT).map((product) => (
            <ShopRow key={product.slug} product={product} />
          ))}

          <FootRow href="/shop" label="More items — open the full shop" />
        </div>
      </div>
    </section>
  );
}
