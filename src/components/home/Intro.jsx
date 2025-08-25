import { useTranslation } from "react-i18next";

export default function Intro() {
  const { t } = useTranslation();
  const bullets = t("home.intro.bullets", { returnObjects: true }) || [];

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 md:py-16 grid md:grid-cols-2 gap-8">
      {/* Text */}
      <div>
        <div className="tracking-[0.2em] text-xs uppercase text-brand-burgundy/80">
          {t("home.intro.eyebrow")}
        </div>
        <h2 className="font-serif text-3xl md:text-4xl mt-1">
          {t("home.intro.title")}
        </h2>
        <p className="mt-3 opacity-80">{t("home.intro.lead")}</p>

        <ul className="mt-5 space-y-2">
          {bullets.map((b, i) => (
            <li key={i} className="flex gap-2">
              <span className="mt-1 h-2 w-2 rounded-full bg-brand-burgundy/70" />
              <span className="opacity-90">{b}</span>
            </li>
          ))}
        </ul>

        <a
          href="/discover"
          className="inline-block mt-6 rounded-xl bg-brand-burgundy text-white px-5 py-2.5 hover:bg-brand-burgundy/90"
        >
          {t("home.intro.cta")}
        </a>
      </div>

      {/* Images */}
      <div className="grid grid-rows-2 gap-4">
        <img
          src={t("home.intro.img1")}
          alt=""
          className="h-44 md:h-56 w-full object-cover rounded-2xl shadow"
        />
        <img
          src={t("home.intro.img2")}
          alt=""
          className="h-44 md:h-56 w-full object-cover rounded-2xl shadow"
        />
      </div>
    </section>
  );
}
