// src/components/home/Hero.jsx
import { useTranslation } from "react-i18next";
import BookingBar from "./BookingBar";

export default function Hero() {
  const { t } = useTranslation();

  return (
    // Give the hero its own height and keep everything positioned inside it
    <section className="relative min-h-[64vh] md:min-h-[100vh]">
      {/* Full-cover image */}
      <img
        src="/images/cover1.jpeg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/35" />

      {/* Text content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 pt-40 md:pt-44">
        <h1 className="font-serif text-white text-4xl md:text-5xl leading-tight drop-shadow">
          {t("hero.title")}
        </h1>
        <p className="mt-2 text-white/90">{t("hero.subtitle")}</p>
      </div>

      {/* Booking bar sits INSIDE the hero, above the very bottom */}
      <div className="absolute inset-x-0 bottom-6 z-10 px-4">
        <BookingBar />
      </div>
    </section>
  );
}
