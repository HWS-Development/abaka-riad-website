import { useTranslation } from "react-i18next";

export default function AboutTeaser() {
  const { t } = useTranslation();
  const bullets = t("home.about.bullets", { returnObjects: true }) || [];

  return (
    <section className="bg-brand-rose/20 py-14">
      <div className="mx-auto max-w-6xl px-4 grid md:grid-cols-2 gap-10 items-start">
        <div>
          <div className="tracking-[0.2em] text-xs uppercase text-brand-burgundy/80 mb-2">
            {t("home.about.eyebrow")}
          </div>
          <h2 className="font-serif text-3xl mb-3">{t("home.about.title")}</h2>
          <p className="opacity-80">{t("home.about.lead")}</p>

          <ul className="mt-6 space-y-2">
            {bullets.map((b, i) => (
              <li key={i} className="flex gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-brand-burgundy shrink-0" />
                <span className="opacity-85">{b}</span>
              </li>
            ))}
          </ul>

          <a href="/about" className="inline-block mt-6 text-brand-burgundy underline underline-offset-4">
            {t("home.about.cta")}
          </a>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <img
            className="rounded-2xl h-48 md:h-64 w-full object-cover shadow"
            src="/images/interior3.jpg"
            alt=""
          />
          <img
            className="rounded-2xl h-48 md:h-64 w-full object-cover shadow mt-6"
            src="/images/interior4.webp"
            alt=""
          />
        </div>
      </div>
    </section>
  );
}
