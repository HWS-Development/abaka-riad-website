import { useTranslation } from "react-i18next";

function Card({ badge, title, text, href }) {
  return (
    <div className="rounded-2xl bg-white/95 p-5 shadow">
      {badge && (
        <span className="inline-block text-xs uppercase tracking-wide bg-brand-burgundy/10 text-brand-burgundy px-3 py-1 rounded-full mb-2">
          {badge}
        </span>
      )}
      <h3 className="font-serif text-xl">{title}</h3>
      <p className="opacity-80 text-sm mt-1.5">{text}</p>
      <a
        href={href || "/contact"}
        className="mt-4 inline-block rounded-xl bg-brand-burgundy text-white px-4 py-2 text-sm hover:bg-brand-burgundy/90"
      >
        Explore
      </a>
    </div>
  );
}

export default function Extras() {
  const { t } = useTranslation();
  const items = t("home.extras.items", { returnObjects: true }) || [];

  return (
    <section className="bg-brand-burgundy/8">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif text-2xl md:text-3xl">
            {t("home.extras.title")}
          </h2>
          <a href="/discover" className="text-sm text-brand-burgundy hover:underline">
            {t("home.extras.viewAll")}
          </a>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {items.map((it) => (
            <Card key={it.id} {...it} />
          ))}
        </div>
      </div>
    </section>
  );
}
