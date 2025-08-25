import { useTranslation } from "react-i18next";

export default function RoomsGrid() {
  const { t } = useTranslation();
  const rooms = t("home.rooms", { returnObjects: true });

  return (
    <section className="bg-brand-rose/40">
      <div className="max-w-6xl px-4 pt-24 pb-16 mx-auto">
        <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-3xl">{t("home.roomsTitle")}</h2>
            <a href="/rooms" className="text-brand-burgundy hover:underline">
            {t("home.viewAll")}
            </a>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {rooms.map((room, i) => (
            <div
                key={i}
                className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-lg transition"
            >
                <img
                src={room.image}
                alt={room.name}
                className="h-44 w-full object-cover"
                />
                <div className="p-4">
                <div className="font-serif text-lg">{room.name}</div>
                <p className="text-sm opacity-70">{room.short}</p>
                <a
                    href="/rooms"
                    className="mt-2 inline-block text-brand-burgundy hover:underline text-sm"
                >
                    {t("home.viewMore")}
                </a>
                </div>
            </div>
            ))}
        </div>
      </div>
    </section>
  );
}
