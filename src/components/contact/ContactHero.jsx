import { useTranslation } from "react-i18next";

export default function ContactHero() {
  const { t } = useTranslation();
  return (
    <section className="relative">
      <img
        src='/images/cover5.jpeg'
        alt=""
        className="absolute inset-0 h-[34vh] w-full object-cover"
      />
      <div className="relative h-[34vh] bg-black/40">
        <div className="mx-auto max-w-6xl h-full px-4 flex flex-col justify-center">
          <h1 className="font-serif text-white text-4xl md:text-5xl">{t("nav.contact")}</h1>
          <p className="text-white/90 mt-2 max-w-2xl">{t("contact.header.lead")}</p>
        </div>
      </div>
    </section>
  );
}
