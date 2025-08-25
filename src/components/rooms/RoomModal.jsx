import { useEffect, useRef, useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { buildHotelRunnerUrl } from "../../utils/booking";

// Simple focus trap
function useFocusTrap(open) {
  const ref = useRef(null);
  useEffect(() => {
    if (!open || !ref.current) return;
    const focusable = ref.current.querySelectorAll(
      'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const onKey = (e) => {
      if (e.key === "Escape") ref.current?.querySelector("[data-close]")?.click();
      if (e.key !== "Tab") return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };
    first?.focus();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);
  return ref;
}

export default function RoomModal({ open, onClose, room }) {
  const { t } = useTranslation();
  const modalRef = useFocusTrap(open);
  const [index, setIndex] = useState(0);

  // Hooks must run before conditional return
  const gallery = useMemo(() => {
    if (!room) return [];
    const g = Array.isArray(room.gallery) ? room.gallery.filter(Boolean) : [];
    if (g.length) return g;
    return room?.image ? [room.image] : [];
  }, [room]);

  const detailChips = useMemo(() => {
    if (!room) return [];
    return [room.size, room.capacity, room.view, room.beds].filter(Boolean);
  }, [room]);

  const features = useMemo(() => {
    if (!room) return [];
    const base = Array.isArray(room.features) ? room.features : [];
    const amenities = Array.isArray(room.amenities) ? room.amenities : [];
    const merged = [...base, ...amenities];
    if (room.beds && !merged.includes(room.beds)) merged.unshift(room.beds);
    return merged;
  }, [room]);

  useEffect(() => {
    if (open) setIndex(0);
  }, [open, room?.id]);

  if (!open || !room) return null;

  // Booking defaults
  const today = new Date();
  const iso = (d) => d.toISOString().slice(0, 10);
  const checkin = iso(today);
  const checkout = iso(new Date(today.getTime() + 24 * 60 * 60 * 1000));

  const prev = () => setIndex((i) => (i - 1 + gallery.length) % gallery.length);
  const next = () => setIndex((i) => (i + 1) % gallery.length);

  return (
    <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center">
      {/* Backdrop */}
      <button
        onClick={onClose}
        className="absolute inset-0 bg-black/50"
        aria-label={t("rooms.close", "Close")}
        data-close
      />

      {/* Panel */}
      <div
        ref={modalRef}
        className="relative w-full md:max-w-4xl bg-white rounded-t-2xl md:rounded-2xl shadow-lg overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-start gap-3 p-5 border-b">
          <div className="flex-1">
            <h3 className="font-serif text-2xl">{room.name}</h3>
            {detailChips.length > 0 && (
              <div className="text-sm opacity-70 mt-0.5">
                {detailChips.join(" · ")}
              </div>
            )}
          </div>
          <button
            onClick={onClose}
            className="h-9 w-9 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center"
            aria-label={t("rooms.close", "Close")}
            data-close
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="p-5 grid md:grid-cols-5 gap-5">
          {/* Gallery */}
          <div className="md:col-span-3 relative">
            <div className="aspect-[4/3] w-full overflow-hidden rounded-xl relative bg-black/5">
              {gallery[0] && (
                <img
                  src={gallery[index]}
                  alt={room.name || ""}
                  className="h-full w-full object-cover"
                />
              )}
              {gallery.length > 1 && (
                <>
                  <button
                    onClick={prev}
                    className="absolute left-2 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-white/80 hover:bg-white flex items-center justify-center text-lg"
                  >
                    ‹
                  </button>
                  <button
                    onClick={next}
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-white/80 hover:bg-white flex items-center justify-center text-lg"
                  >
                    ›
                  </button>
                </>
              )}
            </div>

            {gallery.length > 1 && (
              <div className="mt-3 flex gap-2 overflow-x-auto">
                {gallery.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt=""
                    onClick={() => setIndex(i)}
                    className={`h-20 w-28 object-cover rounded-lg cursor-pointer border-2 ${
                      i === index ? "border-brand-burgundy" : "border-transparent"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="md:col-span-2 flex flex-col">
            {(room.long || room.short) && (
              <p className="text-sm opacity-85">{room.long || room.short}</p>
            )}

            {features.length > 0 && (
              <ul className="mt-4 space-y-2 text-sm">
                {features.map((f, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-brand-burgundy" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-6 md:mt-auto flex gap-3">
              <button
                onClick={onClose}
                className="h-11 px-4 rounded-xl border border-black/15"
                data-close
              >
                {t("rooms.close", "Close")}
              </button>
              <a
                href={buildHotelRunnerUrl({
                  checkin,
                  checkout,
                  adults: 2,
                  children: 0,
                  rooms: 1
                })}
                className="h-11 px-5 rounded-xl bg-brand-burgundy text-white flex items-center hover:bg-brand-burgundy/90"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("rooms.book", "Book")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
