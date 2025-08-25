import { useState } from "react";
import { useTranslation } from "react-i18next";

function Item({ title, content, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-2xl bg-white shadow">
      <button
        className="w-full flex items-center justify-between px-5 py-4 text-left"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span className="font-medium">{title}</span>
        <span className="ml-4 text-xl">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div className="px-5 pb-4 pt-0 text-sm opacity-85">
          {Array.isArray(content) ? (
            <ul className="list-disc pl-5 space-y-1">
              {content.map((c, i) => <li key={i}>{c}</li>)}
            </ul>
          ) : (
            <p>{content}</p>
          )}
        </div>
      )}
    </div>
  );
}

export default function PoliciesAccordion() {
  const { t } = useTranslation();
  const sections = t("rooms.policies.sections", { returnObjects: true }) || [];

  return (
    <section className="mx-auto max-w-6xl px-4 pb-16">
      <h2 className="font-serif text-3xl mb-6">{t("rooms.policies.title")}</h2>
      <div className="space-y-3">
        {sections.map((s, i) => (
          <Item
            key={i}
            title={s.title}
            content={s.content}
            defaultOpen={i === 0}
          />
        ))}
      </div>
    </section>
  );
}
