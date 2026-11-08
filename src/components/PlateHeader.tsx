import type { ReactNode } from "react";

// A plate's title block, shared by the cover's plates and the plate
// screens: the plate number in the margin, the title on the print's grid,
// the count or date in the far margin. The phone keeps the same columns as
// the rows under it, so the heading hangs on the rows' title column with
// the plate label in the margin above it — a plate number stranded on the
// title's own edge was a thought the print never has. The count is a
// single element placed in both layouts, so it is never read twice.
export default function PlateHeader({
  plate,
  title,
  lede,
  meta,
  as: Heading = "h2",
  id,
}: {
  plate: string;
  title: string;
  lede?: string;
  /** The count, date or range that sits in the far margin. */
  meta?: ReactNode;
  as?: "h1" | "h2";
  id?: string;
}) {
  return (
    <div className="grid grid-cols-[1.5rem_minmax(0,1fr)_auto] gap-x-3 gap-y-3 border-b border-line px-4 pb-7 pt-11 md:grid-cols-[9rem_minmax(0,1fr)_9rem] md:items-start md:gap-x-10 md:px-6 md:pb-10 md:pt-20">
      <p className="eyebrow col-start-1 row-start-1 whitespace-nowrap md:pt-3">{plate}</p>

      {/* The title hangs on the rows' title column; the lede may run into
          the meta column on a phone — prose, not a column element — where
          the desktop's max-w-xl leaves it narrow anyway. */}
      <div className="col-start-2 col-end-4 row-start-2 md:col-end-3 md:row-start-1">
        <Heading
          id={id}
          className="font-display text-[2.25rem] leading-[0.95] tracking-[-0.01em] text-press md:text-7xl"
        >
          {title}
        </Heading>
        {lede ? (
          <p className="mt-3 max-w-xl font-display text-[1.1875rem] italic leading-snug text-ink-soft md:mt-4 md:text-3xl">
            {lede}
          </p>
        ) : null}
      </div>

      {meta ? (
        <p className="eyebrow col-start-3 row-start-1 self-start justify-self-end whitespace-nowrap text-right md:pt-3">
          {meta}
        </p>
      ) : null}
    </div>
  );
}
