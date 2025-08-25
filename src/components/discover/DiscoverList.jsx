import { useTranslation } from "react-i18next";

function DiscoverCard({ badge, title, text, image, align = "left", button }) {
  // default button fallback
  const defaultButton = {
    label: "Explore",
    href: "/contact",
    external: false,
  };

  const btn = button || defaultButton;

  return (
    <div className="grid md:grid-cols-2 gap-6 items-center mb-12">
      {align === "left" && (
        <div>
          <img
            src={image}
            alt={title}
            className="rounded-xl shadow w-full h-64 object-cover"
          />
        </div>
      )}

      <div>
        {badge && (
          <span className="inline-block text-xs uppercase tracking-wide bg-brand-burgundy/10 text-brand-burgundy px-3 py-1 rounded-full mb-2">
            {badge}
          </span>
        )}
        <h3 className="font-serif text-xl mb-2">{title}</h3>
        <p className="opacity-80 text-sm leading-relaxed">{text}</p>

        <div className="mt-4">
          <a
            href={btn.href}
            target={btn.external ? "_blank" : "_self"}
            rel={btn.external ? "noopener noreferrer" : undefined}
            className="inline-block rounded-xl bg-brand-burgundy text-white px-4 py-2 text-sm hover:bg-brand-burgundy/90"
          >
            {btn.label}
          </a>
        </div>
      </div>

      {align === "right" && (
        <div>
          <img
            src={image}
            alt={title}
            className="rounded-xl shadow w-full h-64 object-cover"
          />
        </div>
      )}
    </div>
  );
}

export default function DiscoverList() {
  const { t } = useTranslation();
  const items = t("discover.items", { returnObjects: true }) || [];

  return (
    <section className="bg-brand-light py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-2xl font-serif font-semibold mb-10">{t("nav.discover")}</h2>
        {items.map((item, idx) => (
          <DiscoverCard
            key={item.id}
            {...item}
            align={idx % 2 === 0 ? "left" : "right"}
          />
        ))}
      </div>
    </section>
  );
}
