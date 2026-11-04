// Syncs the public Ko-fi shop into the site's own store data.
//
// Ko-fi exposes no shop API and its shop page refuses to be framed
// (X-Frame-Options: SAMEORIGIN, CSP frame-ancestors 'self'), so the store
// cannot be embedded at runtime. Instead this script reads the public shop
// once per run — same pages a visitor sees — and writes:
//
//   src/lib/kofi-shop.json                 the listing data
//   public/assets/img/kofi-shop/kofi-*.ext the product art, content-addressed
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

  await mkdir(IMAGE_DIR, { recursive: true });
  const products = [];
  for (const url of urls) {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45_000 });
    await page.waitForTimeout(3_000);
    const record = await productFrom(page, url);
    if (!record?.name) throw new Error(`no product data on ${url}`);

    products.push({
      slug: slugify(record.name),
      name: record.name,
      summary: summarize(record.description),
      price: priceLabel(record.offer, record.payWhatYouWant),
      payWhatYouWant: record.payWhatYouWant,
      url: record.url,
      image: await download(record.image),
    });
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
