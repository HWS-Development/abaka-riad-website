import { useTranslation } from "react-i18next";

export default function GoodToKnow() {
  const { t } = useTranslation();
  const items = t("rooms.goodToKnow.items", { returnObjects: true }) || [];

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <h2 className="font-serif text-3xl mb-6">{t("rooms.goodToKnow.title")}</h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((it, i) => (
          <div key={i} className="rounded-2xl bg-white shadow p-4">
            <div className="text-sm tracking-widest uppercase text-brand-burgundy/80">
              {it.label}
            </div>
            <div className="mt-1 font-medium">{it.value}</div>
            {it.note && <div className="mt-1 text-sm opacity-70">{it.note}</div>}
          </div>
        ))}
      </div>
    </section>
  );
}
