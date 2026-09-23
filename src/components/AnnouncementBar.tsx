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
      className="block bg-ember px-4 py-2.5 text-center text-[11px] font-medium uppercase tracking-[0.25em] text-canvas transition-colors duration-200 hover:bg-[#f05c04]"
    >
      LUSG — the new single · out now
    </a>
  );
}
