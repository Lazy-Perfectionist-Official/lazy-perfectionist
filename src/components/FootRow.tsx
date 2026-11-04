// The foot of a plate: the same measure, hairline and hover band as the
// rows above it, holding the one action the list ends on — More opens the
// plate's own screen, where the full list and its search live.
//
// `external` is for the hand-off that lives on that screen: the place the
// catalog is actually published (Ko-fi, Medium), reached with a new tab.
export default function FootRow({
  href,
  label,
  text = "More",
  external = false,
}: {
  href: string;
  label: string;
  text?: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="group flex justify-end border-b border-line px-4 py-5 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-soft transition-colors duration-200 hover:bg-paper-deep/50 hover:text-rust active:bg-paper-deep md:px-6 md:py-6 md:text-xs"
    >
      {text}{" "}
      <span
        aria-hidden="true"
        className="ml-2 inline-block transition-transform duration-200 group-hover:-translate-y-[2px] group-hover:translate-x-[2px]"
      >
        ↗
      </span>
    </a>
  );
}
