import { useMemo, useState } from "react";

// utils same as before...
const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const addDays = (d, n) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
const addMonths = (d, n) => new Date(d.getFullYear(), d.getMonth() + n, 1);
const isSameDay = (a, b) => a && b && a.toDateString() === b.toDateString();
const isBefore = (a, b) => +startOfDay(a) < +startOfDay(b);
const rangeHas = (d, from, to) =>
  from && to && (+startOfDay(d) > +startOfDay(from) && +startOfDay(d) < +startOfDay(to));

const monthLabel = (d, locale = "en-US") =>
  d.toLocaleString(locale, { month: "long", year: "numeric" });

const weekdayShort = (locale = "en-US") => {
  const base = new Date(2024, 0, 7);
  return [...Array(7)].map((_, i) =>
    addDays(base, i).toLocaleString(locale, { weekday: "short" })
  );
};

export default function RangeCalendar({ from, to, minDate, locale = "en-US", onChange }) {
  const [view, setView] = useState(() => startOfDay(from || new Date()));

  const weeks = useMemo(() => {
    const first = new Date(view.getFullYear(), view.getMonth(), 1);
    const startWeekday = (first.getDay() + 6) % 7;
    const gridStart = addDays(first, -startWeekday);
    return [...Array(42)].map((_, i) => addDays(gridStart, i));
  }, [view]);

  const wd = weekdayShort(locale);

  const select = (day) => {
    if (minDate && isBefore(day, minDate)) return;
    if (!from || (from && to)) {
      onChange?.({ from: startOfDay(day), to: null });
      return;
    }
    if (isBefore(day, from)) {
      onChange?.({ from: startOfDay(day), to: startOfDay(from) });
    } else {
      onChange?.({ from, to: startOfDay(day) });
    }
  };

  return (
    <div className="w-full rounded-lg bg-white text-sm">
      {/* header */}
      <div className="flex items-center justify-between px-2 py-1">
        <button
          type="button"
          onClick={() => setView((v) => addMonths(v, -1))}
          className="h-7 w-7 rounded-full border border-black/10 hover:bg-black/5 text-xs"
        >
          ‹
        </button>
        <div className="font-medium">{monthLabel(view, locale)}</div>
        <button
          type="button"
          onClick={() => setView((v) => addMonths(v, +1))}
          className="h-7 w-7 rounded-full border border-black/10 hover:bg-black/5 text-xs"
        >
          ›
        </button>
      </div>

      {/* weekdays */}
      <div className="grid grid-cols-7 text-center text-[11px] uppercase opacity-60 px-1">
        {wd.map((w) => (
          <div key={w} className="py-1">{w}</div>
        ))}
      </div>

      {/* days */}
      <div className="grid grid-cols-7 gap-[2px] px-1 pb-2">
        {weeks.map((day) => {
          const disabled = minDate && isBefore(day, startOfDay(minDate));
          const selectedStart = from && isSameDay(day, from);
          const selectedEnd = to && isSameDay(day, to);
          const inRange = rangeHas(day, from, to);

          return (
            <button
              key={+day}
              onClick={() => select(day)}
              disabled={disabled}
              className={[
                "relative h-8 w-full rounded-md flex items-center justify-center",
                "text-xs select-none",
                disabled ? "opacity-30 cursor-not-allowed" : "hover:bg-black/5",
                selectedStart || selectedEnd ? "bg-brand-burgundy text-white" : "",
                inRange ? "bg-brand-burgundy/15" : "",
                day.getMonth() !== view.getMonth() ? "text-black/30" : ""
              ].join(" ")}
            >
              {day.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
