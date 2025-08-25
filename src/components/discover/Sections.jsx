import { useTranslation } from "react-i18next";

function Block({ id, badge, title, text, image, primary, secondary }) {
  return (
    <section id={id} className="grid md:grid-cols-5 gap-6 items-start mb-10">
      <div className="md:col-span-2 order-2 md:order-1">
        <div className="inline-block rounded-full bg-brand-burgundy/10 text-brand-burgundy text-xs px-3 py-1 uppercase tracking-wide">
          {badge}
        </div>
        <h2 className="font-serif text-2xl mt-2">{title}</h2>
        <p className="opacity-85 mt-2">{text}</p>

        <div className="mt-4 flex flex-wrap gap-3">
          {primary?.href && (
            <a href={primary.href} className="rounded-xl bg-brand-burgundy text-white px-4 py-2 text-sm">
              {primary.label}
            </a>
          )}
          {secondary?.href && (
            <a href={secondary.href} className="rounded-xl border border-black/15 px-4 py-2 text-sm">
              {secondary.label}
            </a>
          )}
        </div>
      </div>

      <div className="md:col-span-3 order-1 md:order-2">
        <img src={image} alt={title} className="h-64 w-full object-cover rounded-2xl shadow" />
      </div>
    </section>
  );
}

export default function DiscoverSections() {
  const { t } = useTranslation();
  const items = t("discover.items", { returnObjects: true }) || [];

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      {items.map((it) => (
        <Block key={it.id} {...it} />
      ))}
    </div>
  );
}
