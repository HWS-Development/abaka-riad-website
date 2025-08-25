import { useTranslation } from "react-i18next";
import { Wifi, Utensils, Car, MapPin, Heart, Coffee } from "lucide-react";

const icons = {
  wifi: Wifi,
  restaurant: Utensils,
  transfer: Car,
  terrace: MapPin,
  spa: Heart,
  breakfast: Coffee
};

export default function Facilities() {
  const { t } = useTranslation();
  const facilities = t("home.facilities", { returnObjects: true });

  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="font-serif text-3xl mb-8">{t("home.facilitiesTitle")}</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {facilities.map((f, i) => {
            const Icon = icons[f.icon] || Wifi;
            return (
              <div
                key={i}
                className="flex items-center gap-3 bg-white rounded-xl p-4 shadow"
              >
                <Icon className="text-brand-burgundy w-6 h-6" />
                <div>
                  <div className="font-medium">{f.title}</div>
                  <p className="text-sm opacity-70">{f.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
