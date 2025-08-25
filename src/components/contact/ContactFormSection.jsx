import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function ContactFormSection() {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const name = data.get("name");
    const email = data.get("email");
    const message = data.get("message");

    if (!name || !email || !message) {
      alert(t("contact.form.error"));
      return;
    }

    // At this point you’d call EmailJS, Formspree, or your backend API
    console.log("Form submitted:", { name, email, message });

    setSubmitted(true);
    e.target.reset();
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 grid md:grid-cols-2 gap-12">
      <div>
        <h2 className="font-serif text-2xl mb-4">{t("contact.form.title")}</h2>
        {submitted && (
          <div className="mb-4 text-green-600 font-medium">
            {t("contact.form.success")}
          </div>
        )}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder={t("contact.form.name")}
            className="w-full h-12 rounded-lg border border-black/20 px-3"
            required
          />
          <input
            type="email"
            name="email"
            placeholder={t("contact.form.email")}
            className="w-full h-12 rounded-lg border border-black/20 px-3"
            required
          />
          <textarea
            name="message"
            placeholder={t("contact.form.message")}
            rows={5}
            className="w-full rounded-lg border border-black/20 px-3 py-2"
            required
          />
          <button
            type="submit"
            className="rounded-xl bg-brand-burgundy text-white px-6 py-3 hover:bg-brand-burgundy/90"
          >
            {t("contact.form.send")}
          </button>
        </form>
      </div>

      {/* Contact info */}
      <div>
        <h2 className="font-serif text-2xl mb-4">{t("contact.info.title")}</h2>
        <p className="mb-2">{t("contact.info.address")}</p>
        <p className="mb-2">
          <a href="tel:+212667815538" className="hover:underline">
            +212 667 815 538
          </a>
        </p>
        <p className="mb-6">
          <a href="mailto:info@riadghali.com" className="hover:underline">
            info@riadghali.com
          </a>
        </p>
      </div>
    </section>
  );
}
