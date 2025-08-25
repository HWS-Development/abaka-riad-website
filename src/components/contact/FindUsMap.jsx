import { useTranslation } from "react-i18next";

export default function FindUsMap() {
  const { t } = useTranslation();

  return (
    <section className="mx-auto max-w-6xl px-4 pb-16">
      <h2 className="font-serif text-2xl mb-4">{t("contact.map.title")}</h2>
      <p className="mb-4 opacity-80">{t("contact.map.desc")}</p>
      <div className="rounded-xl overflow-hidden shadow">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3397.19828132656!2d-7.993842374544448!3d31.62842102416459!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdafef74f4b45a91%3A0x7c7f5d2f2ab46343!2sAbaka%20Riad%20by%20Ghali!5e0!3m2!1sen!2sma!4v1756122627037!5m2!1sen!2sma"
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Map"
        />
      </div>
    </section>
  );
}
