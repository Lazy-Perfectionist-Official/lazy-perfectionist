import { ANNOUNCEMENT } from "@/lib/site";

// The bellyband on the print: the only saturated ember on the page, with
// dark ink type so it reads like a stamp rather than a UI banner.
export default function AnnouncementBar() {
  return (
    <a
      href={ANNOUNCEMENT.href}
      target="_blank"
      rel="noopener noreferrer"
      data-testid="announcement-bar"
      className="announcement block bg-ember px-4 py-2 text-center font-mono text-[10px] uppercase tracking-[0.14em] text-ember-ink transition-colors duration-200 hover:bg-ember-bright sm:py-2.5 sm:tracking-[0.2em] md:text-xs"
    >
      {ANNOUNCEMENT.label}{" "}
      <span aria-hidden="true">
        ↗
      </span>
    </a>
  );
}
