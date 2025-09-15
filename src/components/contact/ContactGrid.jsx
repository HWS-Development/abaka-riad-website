import { useState } from "react";
import { useTranslation } from "react-i18next";

const IconPin = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-brand-burgundy">
    <path d="M12 22s7-4.35 7-11a7 7 0 1 0-14 0c0 6.65 7 11 7 11z" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="12" cy="11" r="2.5" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);
const IconPhone = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-brand-burgundy">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.11 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.72c.12.86.31 1.7.57 2.5a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.58-1.13a2 2 0 0 1 2.11-.45c.8.26 1.64.45 2.5.57A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);
const IconMail = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-brand-burgundy">
    <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" stroke="currentColor" strokeWidth="1.5"/>
    <path d="m22 6-10 7L2 6" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);
const IconClock = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-brand-burgundy">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

export default function ContactGrid() {
  const { t } = useTranslation();
  const [ok, setOk] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = fd.get("name")?.toString().trim();
    const email = fd.get("email")?.toString().trim();
    const subject = fd.get("subject")?.toString().trim();
    const message = fd.get("message")?.toString().trim();
    if (!name || !email || !subject || !message) {
      alert(t("contact.form.error"));
      return;
    }
    // TODO: connect Formspree/EmailJS/backend here
    setOk(true);
    e.currentTarget.reset();
    setTimeout(() => setOk(false), 4000);
  };

  return (
    <section className="mx-auto max-w-6xl px-4 -mt-10 md:-mt-12 relative z-10">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Info card */}
        <div className="rounded-2xl bg-white shadow p-5">
          <h2 className="font-serif text-xl mb-4">{t("contact.info.title")}</h2>
          <ul className="space-y-4 text-sm">
            <li className="flex gap-3">
              <IconPin /><div>
                <div className="font-medium">{t("contact.info.addressLabel")}</div>
                <div className="opacity-80">{t("contact.info.address")}</div>
              </div>
            </li>
            <li className="flex gap-3">
              <IconPhone /><div>
                <div className="font-medium">{t("contact.info.phoneLabel")}</div>
                <a href="tel:+212667815538" className="opacity-80 hover:underline">+212 667 815 538</a>
              </div>
            </li>
            <li className="flex gap-3">
              <IconMail /><div>
                <div className="font-medium">{t("contact.info.emailLabel")}</div>
                <a href="mailto:abaka@riadghali.com" className="opacity-80 hover:underline">abaka@riadghali.com</a>
              </div>
            </li>
            <li className="flex gap-3">
              <IconClock /><div>
                <div className="font-medium">{t("contact.info.hoursLabel")}</div>
                <div className="opacity-80">{t("contact.info.hours")}</div>
              </div>
            </li>
          </ul>
        </div>

        {/* Form card */}
        <div className="rounded-2xl bg-white shadow p-5">
          <h2 className="font-serif text-xl mb-4">{t("contact.form.title")}</h2>

          {ok && (
            <div className="mb-3 rounded-lg bg-green-50 text-green-700 px-3 py-2 text-sm">
              {t("contact.form.success")}
            </div>
          )}

          <form onSubmit={onSubmit} className="grid grid-cols-1 gap-3">
            <div className="grid sm:grid-cols-2 gap-3">
              <input name="name" type="text" placeholder={t("contact.form.name")} className="h-11 rounded-lg border border-black/15 px-3" required />
              <input name="email" type="email" placeholder={t("contact.form.email")} className="h-11 rounded-lg border border-black/15 px-3" required />
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <input name="phone" type="tel" placeholder={t("contact.form.phone")} className="h-11 rounded-lg border border-black/15 px-3" />
              <input name="subject" type="text" placeholder={t("contact.form.subject") } className="h-11 rounded-lg border border-black/15 px-3" required />
            </div>

            <textarea name="message" rows={5} placeholder={t("contact.form.message")} className="rounded-lg border border-black/15 px-3 py-2" required />

            <label className="flex items-start gap-2 text-sm">
              <input type="checkbox" className="mt-1" required />
              <span className="opacity-80">{t("contact.form.consent")}</span>
            </label>

            <button type="submit" className="mt-1 inline-flex items-center justify-center rounded-xl bg-brand-burgundy text-white px-5 py-2.5 hover:bg-brand-burgundy/90">
              {t("contact.form.send")}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
