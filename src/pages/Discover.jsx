import { useTranslation } from "react-i18next";
import DiscoverList from "../components/discover/DiscoverList";

export default function Discover() {
  const { t } = useTranslation();

  return (
    <>
      {/* Header hero */}
      <section className="relative">
        <img
          src={t("discover.header.image")}
          alt=""
          className="absolute inset-0 h-[40vh] w-full object-cover"
        />
        <div className="relative h-[40vh] bg-black/40 flex items-center">
          <div className="mx-auto max-w-6xl px-4">
            <div className="tracking-[0.2em] text-xs uppercase text-white/80">
              {t("discover.header.eyebrow")}
            </div>
            <h1 className="font-serif text-white text-4xl md:text-5xl">
              {t("nav.discover")}
            </h1>
            <p className="text-white/90 mt-2 max-w-2xl">{t("discover.header.lead")}</p>
          </div>
        </div>
      </section>

      {/* Alternating list */}
      <DiscoverList />
    </>
  );
}
