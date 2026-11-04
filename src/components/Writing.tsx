import posts from "@/lib/medium-posts.json";

// Plate 03: the Medium posts printed as an index on the same measure as
// the rest of the paper. The feed is synced and committed (`npm run
// sync:medium`), so the site stays static and every row hands off to
// Medium for the reading. Only the newest posts in the feed appear here.
const LEDE = "Notes, on Medium.";

const dateLabel = (iso: string) =>
  new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  })
    .format(new Date(`${iso}T00:00:00Z`))
    .toUpperCase();

export default function Writing() {
  return (
    <section id="writing" className="scroll-mt-8" data-testid="writing-section">
      <div className="mx-auto max-w-[90rem] px-6 md:px-10">
        <div className="grid gap-4 border-b border-line px-4 pb-8 pt-12 md:grid-cols-[9rem_minmax(0,1fr)_9rem] md:items-start md:gap-x-10 md:px-6 md:pb-10 md:pt-20">
          <p className="eyebrow md:pt-3">Plate 03</p>

          <div>
            <h2 className="font-display text-5xl leading-[0.95] tracking-[-0.01em] text-press md:text-7xl">
              Writing
            </h2>
            <p className="mt-4 max-w-xl font-display text-2xl italic leading-snug text-ink-soft md:text-3xl">
              {LEDE}
            </p>
          </div>

          <p className="eyebrow whitespace-nowrap md:pt-3 md:text-right">
            <a
              href={posts.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="All posts — open the Medium profile"
              className="underline-offset-4 transition-colors duration-200 hover:text-press hover:underline"
            >
              All posts{" "}
              <span aria-hidden="true" className="inline-block">
                ↗
              </span>
            </a>
          </p>
        </div>

        <div>
          {posts.posts.map((post, index) => (
            <a
              key={post.slug}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${post.title} — read on Medium`}
              data-testid={`post-${post.slug}`}
              className="group grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-4 border-b border-line px-4 py-7 transition-colors duration-200 hover:bg-paper-deep/50 active:bg-paper-deep md:grid-cols-[9rem_minmax(0,1fr)_9rem] md:gap-x-10 md:px-6 md:py-9"
            >
              <span
                aria-hidden="true"
                className="pt-1 font-mono text-xs tabular-nums text-ink-soft/60 md:pt-2 md:text-sm"
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              <span className="block">
                <span className="block max-w-xl font-display text-3xl leading-[1.08] tracking-[-0.01em] text-ink transition-colors duration-200 group-hover:text-rust md:text-4xl">
                  {post.title}
                </span>
                <span className="mt-2 block max-w-md text-base leading-relaxed text-ink-soft">
                  {post.excerpt}
                </span>
              </span>

              <span className="col-span-2 mt-4 flex items-baseline justify-between md:col-span-1 md:col-start-3 md:mt-0 md:flex-col md:items-end">
                <span className="font-mono text-xs tabular-nums text-ink-soft md:text-sm">
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
          ))}
        </div>
      </div>
    </section>
  );
}
