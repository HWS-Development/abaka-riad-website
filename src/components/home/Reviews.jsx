import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

export default function ReviewsSlider({ autoplayMs = 5000, maxWidth = 960 }) {
  const { t } = useTranslation();
  const items = t("home.reviews.items", { returnObjects: true }) || [];

  const len = items.length;
  const [index, setIndex] = useState(0);
  const [hover, setHover] = useState(false);
  const trackRef = useRef(null);

  const stepPct = len ? 100 / len : 100;

  const next = () => setIndex((i) => (len ? (i + 1) % len : 0));
  const prev = () => setIndex((i) => (len ? (i - 1 + len) % len : 0));

  // move track
  useEffect(() => {
    if (!trackRef.current || !len) return;
    trackRef.current.style.transform = `translateX(-${index * stepPct}%)`;
  }, [index, stepPct, len]);

  // autoplay (pause on hover / hidden tab)
  useEffect(() => {
    if (!len || hover || document.hidden) return;
    const id = setInterval(next, autoplayMs);
    return () => clearInterval(id);
  }, [autoplayMs, len, hover, index]);

  // keep index valid if items change
  useEffect(() => {
    if (!len) return;
    setIndex((i) => Math.min(i, len - 1));
  }, [len]);

  if (!len) return null;

  return (
    <div
      className="relative w-full"
      style={{ maxWidth }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      aria-roledescription="carousel"
      aria-label="Guest reviews"
    >
      <div className="overflow-hidden rounded-2xl border border-black/5 bg-white shadow-soft">
        <div
          ref={trackRef}
          className="flex transition-transform duration-500 ease-out will-change-transform"
          style={{ width: `${len * 100}%` }} // track spans all slides
          aria-live="polite"
        >
          {items.map((r, i) => (
            <div
              key={i}
              className="shrink-0"             // don't grow
              style={{ width: `${100 / len}%` }} // each slide = fraction of track
            >
              <div className="p-5 sm:p-6 md:p-8">
                <div className="text-brass text-lg sm:text-xl mb-2" aria-hidden="true">
                  {"★".repeat(r.stars)}{"☆".repeat(5 - r.stars)}
                </div>
                <p className="text-base sm:text-lg md:text-xl leading-relaxed">
                  “{r.quote}”
                </p>
                <div className="mt-3 sm:mt-4 text-sm opacity-70">— {r.author}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop arrows */}
      <button
        onClick={prev}
        aria-label="Previous review"
        className="hidden md:flex absolute -left-6 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white shadow-soft items-center justify-center"
      >
        ‹
      </button>
      <button
        onClick={next}
        aria-label="Next review"
        className="hidden md:flex absolute -right-6 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white shadow-soft items-center justify-center"
      >
        ›
      </button>

      {/* Mobile controls */}
      <div className="mt-4 flex items-center justify-center gap-3 md:hidden">
        <button
          onClick={prev}
          className="h-9 w-9 rounded-full bg-white shadow-soft"
          aria-label="Previous review"
        >
          ‹
        </button>
        <div className="flex gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-2.5 w-2.5 rounded-full ${
                i === index ? "bg-oasis" : "bg-oasis/30"
              }`}
              aria-label={`Go to review ${i + 1}`}
              aria-current={i === index ? "true" : "false"}
            />
          ))}
        </div>
        <button
          onClick={next}
          className="h-9 w-9 rounded-full bg-white shadow-soft"
          aria-label="Next review"
        >
          ›
        </button>
      </div>

      {/* Desktop dots */}
      <div className="mt-4 hidden md:flex justify-center gap-2">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2.5 w-2.5 rounded-full ${
              i === index ? "bg-oasis" : "bg-oasis/30"
            }`}
            aria-label={`Go to review ${i + 1}`}
            aria-current={i === index ? "true" : "false"}
          />
        ))}
      </div>
    </div>
  );
}
