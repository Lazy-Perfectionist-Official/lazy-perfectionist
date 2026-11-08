import FootRow from "@/components/FootRow";
import PlateHeader from "@/components/PlateHeader";
import posts from "@/lib/medium-posts.json";

// Plate 03: the Medium posts printed as an index on the same measure as
// the rest of the paper. The feed is synced and committed (`npm run
// sync:medium`), so the site stays static and every row hands off to
// Medium for the reading. The sync merges, so posts that have fallen out
// of the feed's newest window stay in the plate. More opens /writing with
// the whole archive and a search.
const LEDE = "Notes, on Medium.";
const HOME_LIMIT = 3;

type Post = (typeof posts.posts)[number];

const dateLabel = (iso: string) =>
  new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  })
    .format(new Date(`${iso}T00:00:00Z`))
    .toUpperCase();

export function PostRow({ post, index }: { post: Post; index: number }) {
  return (
    <a
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${post.title} — read on Medium`}
      data-testid={`post-${post.slug}`}
      className="group grid grid-cols-[1.5rem_minmax(0,1fr)] gap-x-3 border-b border-line px-4 py-6 transition-colors duration-200 hover:bg-paper-deep/50 active:bg-paper-deep md:grid-cols-[9rem_minmax(0,1fr)_9rem] md:gap-x-10 md:px-6 md:py-9"
    >
      <span
        aria-hidden="true"
        className="pt-1.5 font-mono text-[10px] tabular-nums text-ink-soft/60 md:pt-2 md:text-sm"
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <span className="block">
        <span className="block max-w-xl font-display text-[1.5rem] leading-[1.12] tracking-[-0.01em] text-ink transition-colors duration-200 group-hover:text-rust md:text-4xl md:leading-[1.08]">
          {post.title}
        </span>
        <span className="mt-1.5 block max-w-md text-[0.9375rem] leading-relaxed text-ink-soft md:mt-2 md:text-base">
          {post.excerpt}
        </span>
      </span>

      <span className="col-span-2 mt-3 flex items-baseline justify-between md:col-span-1 md:col-start-3 md:mt-0 md:flex-col md:items-end">
        <span className="font-mono text-[11px] tabular-nums text-ink-soft md:text-sm">
          {dateLabel(post.date)}
        </span>
        <span
          aria-hidden="true"
          className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-soft transition-colors duration-200 group-hover:text-rust md:text-xs"
        >
          Read{" "}
          <span className="inline-block transition-transform duration-200 group-hover:-translate-y-[2px] group-hover:translate-x-[2px]">
            ↗
          </span>
        </span>
      </span>
    </a>
  );
}

export default function Writing() {
  return (
    <section id="writing" className="scroll-mt-8" data-testid="writing-section">
      <div className="mx-auto max-w-[90rem] px-5 md:px-10">
        <PlateHeader
          plate="Plate 03"
          title="Writing"
          lede={LEDE}
          meta={`${posts.posts.length} ${posts.posts.length === 1 ? "post" : "posts"}`}
        />

        <div>
          {posts.posts.slice(0, HOME_LIMIT).map((post, index) => (
            <PostRow key={post.slug} post={post} index={index} />
          ))}

          <FootRow href="/writing" label="More posts — open the full archive" />
        </div>
      </div>
    </section>
  );
}
