import { useTranslation } from "react-i18next";
import MapEmbed from "../../components/MapEmbed";

export default function Location() {
  const { t } = useTranslation();
  const chips = t("home.location.chips", { returnObjects: true }) || [];

  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4 grid md:grid-cols-2 gap-8 items-start">
        <div>
          <h2 className="font-serif text-3xl mb-3">{t("home.locationTitle")}</h2>
          <p className="opacity-80 mb-4">{t("home.locationIntro")}</p>

          <div className="flex flex-wrap gap-2">
            {chips.map((c, i) => (
              <span key={i}
                className="inline-flex items-center gap-2 rounded-full bg-brand-rose/60 px-3 py-1.5 text-sm">
                <span className="text-brand-burgundy">•</span> {c}
              </span>
            ))}
          </div>

          <a
            className="mt-5 inline-block text-brand-burgundy underline underline-offset-4"
            href="https://maps.app.goo.gl/HkBN8JiH6xkvusFQ9"
            target="_blank" rel="noreferrer"
          >
            {t("home.getDirections")}
          </a>
        </div>

        <div className="rounded-2xl overflow-hidden shadow">
          <MapEmbed />
        </div>
      </div>
    </section>
  );
}
