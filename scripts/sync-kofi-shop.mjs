// Syncs the public Ko-fi shop into the site's own store data.
//
// Ko-fi exposes no shop API and its shop page refuses to be framed
// (X-Frame-Options: SAMEORIGIN, CSP frame-ancestors 'self'), so the store
// cannot be embedded at runtime. Instead this script reads the public shop
// once per run — same pages a visitor sees — and writes:
//
//   src/lib/kofi-shop.json                 the raw listing (tags included; summaries are curated at render by src/lib/shop.ts)
//   public/assets/img/kofi-shop/kofi-*.ext the product art, content-addressed
//
// Tags come from the shop's own categories where the artist assigned one,
// and from the product's name (Tabs / Stems / Jam track / Freebies) so the
// filters are useful even before every product is categorised on Ko-fi.
//
// Run it with `npm run sync:shop` whenever the shop changes, then commit.
// The site itself stays static: no client JS, no third-party scripts.
import { chromium } from "@playwright/test";
import { createHash } from "node:crypto";
import { mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const SHOP_URL = "https://ko-fi.com/lazyperfectionist/shop";
const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36";
const PRODUCT_URL = /^https:\/\/ko-fi\.com\/s\/[a-z0-9]+$/i;
const CURRENCY_SYMBOL = { USD: "$", GBP: "£", EUR: "€", HKD: "HK$" };

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DATA_FILE = path.join(ROOT, "src/lib/kofi-shop.json");
const COPY_FILE = path.join(ROOT, "src/lib/shop-copy.json");
const IMAGE_DIR = path.join(ROOT, "public/assets/img/kofi-shop");

const slugify = (name) =>
  name
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const priceLabel = (offer, payWhatYouWant) => {
  const amount = Number(offer?.price ?? 0);
  if (!amount) return payWhatYouWant ? "Free +" : "Free";
  const symbol = CURRENCY_SYMBOL[offer?.priceCurrency] ?? `${offer?.priceCurrency} `;
  const value = Number.isInteger(amount) ? String(amount) : amount.toFixed(2);
  return `${symbol}${value}${payWhatYouWant ? " +" : ""}`;
};

// First non-empty line, whitespace collapsed: the listing's own lead line.
const summarize = (description) => (description ?? "").split("\n").map((line) => line.trim()).find(Boolean)?.replace(/\s+/g, " ") ?? "";

// The shop's own kind, read from the product name. Ko-fi categories are
// author-assigned and sparse (there is one today), so every product also
// gets a tag for what it actually is; the two are merged and deduplicated.
const KIND_TAGS = [
  [/\btabs?\b/i, "Tabs"],
  [/\bstems?\b/i, "Stems"],
  [/\bjam\s*tracks?\b/i, "Jam track"],
  [/\bfreebies?\b/i, "Freebies"],
];

const derivedTags = (name) =>
  KIND_TAGS.filter(([pattern]) => pattern.test(name)).map(([, label]) => label);

// "Jam tracks" from Ko-fi and "Jam track" derived are the same shelf: keep
// the first wording (the author's) and drop a later tag that says the same.
const tagKey = (label) => label.toLowerCase().replace(/[^a-z0-9]+/g, "").replace(/s$/, "");
const tagList = (labels) => {
  const seen = new Set();
  return labels.filter((label) => {
    const key = tagKey(label);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

// Ko-fi's filter chips are backed by its own JSON: a public category list
// and an item list carrying ShopCategoryIds per product. Both are fetched
// by the page while it loads, and plain requests from Node are challenged
// by Cloudflare — so ask the page, using the IDs it was initialized with.
const shopCategories = (page) =>
  page.evaluate(async () => {
    const match = document.documentElement.innerHTML.match(/initializeShop\('([^']+)',\s*'([^']+)'/);
    if (!match) return null;
    const [, shop, uuid] = match;
    const read = async (url) => {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`${url} answered ${response.status}`);
      return response.json();
    };
    const [categories, items] = await Promise.all([
      read(`/api/shop/${uuid}/categories/public`),
      read(`/shop/${shop}/items/0/100?productType=0`),
    ]);
    return { categories, items };
  });

// Ko-fi's listing copy is what the artist typed there, typos included. The
// curated summaries in src/lib/shop-copy.json are applied when the page
// renders (src/lib/shop.ts), not here — this script writes what Ko-fi says
// and only checks that no curated summary outlives its product.
const curated =
  (JSON.parse(await readFile(COPY_FILE, "utf8").catch(() => '{"summaries":[]}')) ?? {})
    .summaries ?? [];

const productFrom = (page, url) =>
  page.evaluate((productUrl) => {
    const product = [...document.querySelectorAll('script[type="application/ld+json"]')]
      .map((script) => {
        try {
          return JSON.parse(script.textContent);
        } catch {
          return null;
        }
      })
      .find((record) => record?.["@type"] === "Product");
    if (!product) return null;
    return {
      url: productUrl,
      name: product.name,
      description: product.description,
      image: Array.isArray(product.image) ? product.image[0] : product.image,
      offer: product.offers,
      payWhatYouWant: document.body.innerText.includes("How much would you like to pay?"),
    };
  }, url);

const download = async (imageUrl) => {
  const response = await fetch(imageUrl, { headers: { "User-Agent": UA } });
  if (!response.ok) throw new Error(`image ${imageUrl} answered ${response.status}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  const extension = (path.extname(new URL(imageUrl).pathname).slice(1) || "jpg").toLowerCase().replace("jpeg", "jpg");
  const hash = createHash("sha256").update(bytes).digest("hex").slice(0, 10);
  const file = `kofi-${hash}.${extension}`;
  await writeFile(path.join(IMAGE_DIR, file), bytes);
  return `/assets/img/kofi-shop/${file}`;
};

const browser = await chromium.launch({
  args: ["--disable-blink-features=AutomationControlled"],
});

try {
  const context = await browser.newContext({ userAgent: UA, viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  await page.goto(SHOP_URL, { waitUntil: "domcontentloaded", timeout: 45_000 });
  await page.waitForTimeout(4_000);
  const productUrls = await page.evaluate(() =>
    [...document.querySelectorAll('a[href*="/s/"]')].map((link) => link.href),
  );
  const urls = [...new Set(productUrls)].filter((url) => PRODUCT_URL.test(url));
  if (!urls.length) throw new Error(`no products found on ${SHOP_URL}`);

  // Category metadata is a bonus, not a prerequisite: if Ko-fi changes its
  // shop markup the sync still writes the listing with derived tags.
  const byAlias = new Map();
  try {
    const meta = await shopCategories(page);
    const items = Array.isArray(meta?.items)
      ? meta.items
      : Object.values(meta?.items ?? {}).find(Array.isArray) ?? [];
    const names = new Map((meta?.categories?.categories ?? []).map((category) => [category.Id, category.Name]));
    for (const item of items) {
      const labels = (item.ShopCategoryIds ?? []).map((id) => names.get(id)).filter(Boolean);
      if (labels.length) byAlias.set(String(item.Alias).toLowerCase(), labels);
    }
  } catch (error) {
    console.warn(`warning: could not read Ko-fi categories (${error.message}); using derived tags only`);
  }

  await mkdir(IMAGE_DIR, { recursive: true });
  const products = [];
  for (const url of urls) {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45_000 });
    await page.waitForTimeout(3_000);
    const record = await productFrom(page, url);
    if (!record?.name) throw new Error(`no product data on ${url}`);

    const slug = slugify(record.name);
    const alias = url.split("/").pop().toLowerCase();
    products.push({
      slug,
      name: record.name,
      summary: summarize(record.description),
      tags: tagList([...(byAlias.get(alias) ?? []), ...derivedTags(record.name)]),
      price: priceLabel(record.offer, record.payWhatYouWant),
      payWhatYouWant: record.payWhatYouWant,
      url: record.url,
      image: await download(record.image),
    });
  }

  // A curated summary whose product was renamed or removed would otherwise
  // sit in the file forever, silently doing nothing.
  const stale = curated
    .filter((entry) => !products.some((product) => product.slug === entry.slug))
    .map((entry) => entry.slug);
  if (stale.length) {
    console.warn(`warning: shop-copy.json has no matching product for: ${stale.join(", ")}`);
  }

  // Content-addressed images: drop anything the new listing no longer uses.
  const used = new Set(products.map((product) => path.basename(product.image)));
  for (const file of await readdir(IMAGE_DIR)) {
    if (file.startsWith("kofi-") && !used.has(file)) await rm(path.join(IMAGE_DIR, file));
  }

  const next = `${JSON.stringify({ products }, null, 2)}\n`;
  const current = await readFile(DATA_FILE, "utf8").catch(() => null);

  // A product removed on Ko-fi is legitimate; a listing that suddenly got
  // shorter is more often a partial render or an unpaginated page. Warn so
  // the commit is never blind to it.
  const previousCount = current ? JSON.parse(current).products.length : null;
  if (previousCount !== null && products.length < previousCount) {
    console.warn(
      `warning: listing dropped from ${previousCount} to ${products.length} products — check for pagination or a partial render before committing`,
    );
  }

  if (current !== next) await writeFile(DATA_FILE, next);

  for (const product of products) {
    console.log(`${product.slug.padEnd(30)} ${product.price.padEnd(8)} ${product.image}`);
  }
  console.log(
    current === next
      ? `shop unchanged (${products.length} products)`
      : `wrote ${path.relative(ROOT, DATA_FILE)} (${products.length} products)`,
  );
} finally {
  await browser.close();
}
