import { useTranslation } from "react-i18next";

export default function Discover() {
  const { t } = useTranslation();
  const cards = t("home.discover.items", { returnObjects: true }) || [];

  return (
    <section className="py-14">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif text-3xl">{t("home.discover.title")}</h2>
          <a href="/discover" className="text-brand-burgundy hover:underline">
            {t("home.viewAll")}
          </a>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {cards.map((c, i) => (
            <a
              key={i}
              href={c.href}
              className="group bg-white rounded-2xl overflow-hidden shadow hover:shadow-lg transition"
            >
              <div className="relative">
                <img src={c.image} alt="" className="h-48 w-full object-cover" />
                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs uppercase tracking-wide">
                  {c.badge}
                </span>
              </div>
              <div className="p-5">
                <div className="font-medium text-lg">{c.title}</div>
                <p className="opacity-70 text-sm mt-1">{c.text}</p>
                <span className="mt-3 inline-block text-brand-burgundy text-sm group-hover:underline">
                  {t("home.viewMore")}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
