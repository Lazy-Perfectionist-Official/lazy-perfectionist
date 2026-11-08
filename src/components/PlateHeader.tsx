import type { ReactNode } from "react";

// A plate's title block, shared by the cover's plates and the plate
// screens: the plate number in the margin, the title on the print's grid,
// the count or date in the far margin. On phones the two margins fold into
// the line above the title — a plate number stranded above the heading and
// a count stranded under the lede were three separate thoughts where the
// print has one. The count is a single element placed in both layouts, so
// it is never read twice.
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
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-3 gap-y-3 border-b border-line px-4 pb-6 pt-9 md:grid-cols-[9rem_minmax(0,1fr)_9rem] md:items-start md:gap-x-10 md:px-6 md:pb-10 md:pt-20">
      <p className="eyebrow md:pt-3">{plate}</p>

      <div className="col-span-2 md:col-span-1 md:col-start-2 md:row-start-1">
        <Heading
          id={id}
          className="font-display text-[2.5rem] leading-[0.95] tracking-[-0.01em] text-press md:text-7xl"
        >
          {title}
        </Heading>
        {lede ? (
          <p className="mt-3 max-w-xl font-display text-xl italic leading-snug text-ink-soft md:mt-4 md:text-3xl">
            {lede}
          </p>
        ) : null}
      </div>

      {meta ? (
        <p className="eyebrow col-start-2 row-start-1 whitespace-nowrap text-right md:col-start-3 md:row-start-1 md:pt-3">
          {meta}
        </p>
      ) : null}
    </div>
  );
}
