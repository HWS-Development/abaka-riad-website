import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { buildHotelRunnerUrl } from "../../utils/booking";
import RangeCalendar from "../common/RangeCalendar";

// helpers
const iso = (d) => d.toISOString().slice(0, 10);
const addDays = (d, n) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);

export default function BookingBar() {
  const { t, i18n } = useTranslation();

  // defaults
  const today = new Date();
  const [checkin, setCheckin] = useState(iso(today));
  const [checkout, setCheckout] = useState(iso(addDays(today, 1)));
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  // dropdown
  const [open, setOpen] = useState(false);
  const [sel, setSel] = useState({
    from: new Date(checkin),
    to: new Date(checkout),
  });

  const barRef = useRef(null);
  const popRef = useRef(null);

  // close on outside click
  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (!popRef.current || !barRef.current) return;
      if (!popRef.current.contains(e.target) && !barRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  const openPicker = () => {
    setSel({ from: new Date(checkin), to: new Date(checkout) });
    setOpen(true);
  };

  const apply = () => {
    if (!sel.from || !sel.to) return;
    setCheckin(iso(sel.from));
    setCheckout(iso(sel.to));
    setOpen(false);
  };

  const bookingUrl = buildHotelRunnerUrl({
    checkin,
    checkout,
    adults,
    children,
    rooms: 1,
  });

  return (
    <section className="mx-auto max-w-6xl px-4 relative z-20">
      <div ref={barRef} className="relative -mt-10 md:-mt-14">
        <div className="rounded-2xl bg-white/90 backdrop-blur shadow p-4 md:p-5 grid gap-3 md:grid-cols-12">
          {/* Check-in */}
          <div className="md:col-span-3">
            <label className="block text-xs uppercase tracking-wide opacity-70 mb-1">
              {t("common.checkIn")}
            </label>
            <button
              type="button"
              onClick={openPicker}
              className="w-full h-11 rounded-lg border border-black/15 px-3 text-left"
            >
              {checkin}
            </button>
          </div>

          {/* Check-out */}
          <div className="md:col-span-3">
            <label className="block text-xs uppercase tracking-wide opacity-70 mb-1">
              {t("common.checkOut")}
            </label>
            <button
              type="button"
              onClick={openPicker}
              className="w-full h-11 rounded-lg border border-black/15 px-3 text-left"
            >
              {checkout}
            </button>
          </div>

          {/* Adults */}
          <div className="md:col-span-2">
            <label className="block text-xs uppercase tracking-wide opacity-70 mb-1">
              {t("common.adults")}
            </label>
            <select
              value={adults}
              onChange={(e) => setAdults(Number(e.target.value))}
              className="w-full h-11 rounded-lg border border-black/15 px-3"
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>

          {/* Children */}
          <div className="md:col-span-2">
            <label className="block text-xs uppercase tracking-wide opacity-70 mb-1">
              {t("common.children")}
            </label>
            <select
              value={children}
              onChange={(e) => setChildren(Number(e.target.value))}
              className="w-full h-11 rounded-lg border border-black/15 px-3"
            >
              {[0, 1, 2, 3, 4].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>

          {/* CTA */}
          <div className="md:col-span-2 flex items-end">
            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-11 flex items-center justify-center rounded-xl bg-brand-burgundy text-white hover:bg-brand-burgundy/90"
            >
              {t("home.checkAvailability", "Check availability")}
            </a>
          </div>
        </div>

        {/* Calendar dropdown */}
        {open && (
          <div
            ref={popRef}
            className="absolute left-0 right-0 md:w-[560px] md:left-0 mt-2 rounded-xl border border-black/10 bg-white shadow-lg z-30"
          >
            <div className="p-4">
              <RangeCalendar
                from={sel.from}
                to={sel.to}
                minDate={new Date()}
                locale={i18n.language?.startsWith("fr") ? "fr-FR" : "en-US"}
                onChange={(r) => setSel(r)}
              />
              <div className="mt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="h-10 px-4 rounded-lg border border-black/15"
                >
                  {t("booking.cancel", "Cancel")}
                </button>
                <button
                  type="button"
                  onClick={apply}
                  disabled={!sel.from || !sel.to || !(+sel.to > +sel.from)}
                  className="h-10 px-4 rounded-lg bg-brand-burgundy text-white disabled:opacity-50"
                >
                  {t("booking.apply", "Apply")}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
