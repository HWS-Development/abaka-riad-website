import { useTranslation } from "react-i18next";

export default function DiscoverHeader() {
  const { t } = useTranslation();

  return (
    <section className="relative">
      <img
        src={t("discover.header.image")}
        alt=""
        className="absolute inset-0 h-[36vh] w-full object-cover"
      />
      <div className="relative h-[36vh] bg-black/40">
        <div className="mx-auto max-w-6xl h-full px-4 flex flex-col justify-center">
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
  );
}
