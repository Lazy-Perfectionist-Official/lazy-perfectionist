import { LINKS } from "@/lib/site";

// Intervals pattern: thin accent strip at the very top, tiny tracked
// lowercase-equivalent text, the whole bar is the link.
export default function AnnouncementBar() {
  return (
    <a
      href={LINKS.spotifyLusg}
      target="_blank"
      rel="noopener noreferrer"
      data-testid="announcement-bar"
      className="announcement block bg-ember px-4 py-3 text-center text-[11px] md:text-xs font-medium uppercase tracking-[0.25em] text-canvas transition-colors duration-200 hover:bg-ember-bright"
    >
      LUSG — the new single · out now{" "}
      <span aria-hidden="true">
        ↗
      </span>
    </a>
  );
}
