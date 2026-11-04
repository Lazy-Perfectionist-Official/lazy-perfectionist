// Syncs the Medium feed into the site's own writing list.
//
// Medium's RSS feed is the only public, script-friendly view of the
// account (the post pages sit behind Cloudflare), so this reads the feed
// with plain fetch — no browser, no API key. The site stays static; the
// feed's newest posts are written to src/lib/medium-posts.json and
// committed, and each row hands off to Medium for the reading.
//
// Run it with `npm run sync:medium` when a post is published, then commit.
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const FEED_URL = "https://medium.com/feed/@lazyperfectist";
const PROFILE_URL = "https://medium.com/@lazyperfectist";
const UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DATA_FILE = path.join(ROOT, "src/lib/medium-posts.json");

const decode = (value) =>
  value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&#x27;/g, "'")
    .replace(/&#x2F;/g, "/")
    .replace(/&#x3D;/g, "=")
    .replace(/&amp;/g, "&");

// CDATA markers go before tag stripping, or the whole wrapper reads as a tag.
const text = (html) =>
  decode(html.replace(/<!\[CDATA\[|\]\]>/g, "").replace(/<[^>]+>/g, " "))
    .replace(/\s+/g, " ")
    .trim();

// pick returns the raw inner XML (CDATA wrapper included); text() strips the
// markup and decodes entities once, so callers must not decode again.
const pick = (block, tag) => {
  const match = block.match(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</${tag}>`));
  return match ? match[1] : null;
};

const slugify = (title) =>
  title
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

// The feed has no summary field; the post's own opening sentences make the
// honest one. It keeps adding sentences until it reads ~110 characters, and
// never goes past 220.
const excerpt = (paragraph) => {
  const sentences = paragraph.split(/(?<=[.!?])\s+/);
  let out = "";
  for (const sentence of sentences) {
    if (out && out.length + sentence.length > 220) break;
    out = out ? `${out} ${sentence}` : sentence;
    if (out.length >= 110) break;
  }
  return out.length > 220 ? `${out.slice(0, out.lastIndexOf(" ", 220)).trim()}…` : out;
};

const canonicalUrl = (link) => {
  const url = new URL(link);
  url.search = "";
  url.hash = "";
  return url.toString();
};

const response = await fetch(FEED_URL, { headers: { "User-Agent": UA } });
if (!response.ok) throw new Error(`feed ${FEED_URL} answered ${response.status}`);
const xml = await response.text();

const posts = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map(([, item]) => {
  const title = text(pick(item, "title") ?? "");
  const content = pick(item, "content:encoded") ?? "";
  const firstParagraph = content.match(/<p[^>]*>([\s\S]*?)<\/p>/)?.[1] ?? "";
  const pubDate = new Date(text(pick(item, "pubDate") ?? ""));
  return {
    slug: slugify(title),
    title,
    excerpt: excerpt(text(firstParagraph)),
    date: pubDate.toISOString().slice(0, 10),
    url: canonicalUrl(text(pick(item, "link") ?? "")),
  };
});

if (!posts.length) throw new Error(`no posts found in ${FEED_URL}`);
posts.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));

const next = `${JSON.stringify({ profileUrl: PROFILE_URL, posts }, null, 2)}\n`;
const current = await readFile(DATA_FILE, "utf8").catch(() => null);

// Older posts fall out of the feed's window; a sudden shrink is more often
// a partial feed than a real deletion, so flag it before committing.
const previousCount = current ? JSON.parse(current).posts.length : null;
if (previousCount !== null && posts.length < previousCount) {
  console.warn(
    `warning: feed dropped from ${previousCount} to ${posts.length} posts — check for a partial response before committing`,
  );
}

if (current !== next) await writeFile(DATA_FILE, next);

for (const post of posts) console.log(`${post.date}  ${post.slug.padEnd(60)} ${post.url}`);
const count = `${posts.length} post${posts.length === 1 ? "" : "s"}`;
console.log(current === next ? `writing unchanged (${count})` : `wrote ${path.relative(ROOT, DATA_FILE)} (${count})`);
