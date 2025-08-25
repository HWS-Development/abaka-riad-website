import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

function Chip({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-sm border transition ${
        active
          ? "bg-brand-burgundy text-white border-brand-burgundy"
          : "border-black/15 hover:bg-black/5"
      }`}
    >
      {children}
    </button>
  );
}

function Lightbox({ open, items, index, onClose, onPrev, onNext }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, onPrev, onNext]);

  if (!open || !items.length) return null;
  const item = items[index];

  return (
    <div
      className="fixed inset-0 z-[60] bg-black/80 flex items-center justify-center"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div className="relative max-w-5xl w-[92vw]" onClick={(e) => e.stopPropagation()}>
        <img
          src={item.src}
          alt={item.alt || ""}
          className="w-full max-h-[80vh] object-contain rounded-xl shadow"
        />
        <div className="mt-3 text-white/90 text-sm">{item.alt}</div>

        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 bg-white text-black rounded-full w-9 h-9"
          aria-label="Close"
        >
          ×
        </button>

        <button
          onClick={onPrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 text-white/90 text-2xl px-3"
          aria-label="Previous"
        >
          ‹
        </button>
        <button
          onClick={onNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 text-white/90 text-2xl px-3"
          aria-label="Next"
        >
          ›
        </button>
      </div>
    </div>
  );
}

export default function GalleryGrid() {
  const { t } = useTranslation();
  const items = useMemo(() => t("gallery.items", { returnObjects: true }) || [], [t]);

  const filters = [
    { key: "all", label: t("gallery.filters.all") },
    { key: "rooms", label: t("gallery.filters.rooms") },
    { key: "rooftop", label: t("gallery.filters.rooftop") },
    { key: "interior", label: t("gallery.filters.interior") },
  ];

  const [active, setActive] = useState("all");
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);

  const filtered = useMemo(() => {
    if (active === "all") return items;
    return items.filter((i) => i.cat === active);
  }, [items, active]);

  const openAt = (i) => {
    setIdx(i);
    setOpen(true);
  };

  const next = () => setIdx((prev) => (prev + 1) % filtered.length);
  const prev = () => setIdx((prev) => (prev - 1 + filtered.length) % filtered.length);

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      {/* filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {filters.map((f) => (
          <Chip key={f.key} active={active === f.key} onClick={() => setActive(f.key)}>
            {f.label}
          </Chip>
        ))}
      </div>

      {/* grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((img, i) => (
          <button
            key={img.src + i}
            onClick={() => openAt(i)}
            className="group relative rounded-xl overflow-hidden shadow focus:outline-none focus:ring-2 focus:ring-brand-burgundy"
          >
            <img
              src={img.src}
              alt={img.alt || ""}
              loading="lazy"
              className="h-56 w-full object-cover group-hover:scale-[1.03] transition"
            />
            {img.badge && (
              <span className="absolute left-2 top-2 text-xs bg-white/90 text-black px-2 py-0.5 rounded">
                {img.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* lightbox */}
      <Lightbox
        open={open}
        items={filtered}
        index={idx}
        onClose={() => setOpen(false)}
        onPrev={prev}
        onNext={next}
      />
    </section>
  );
}
