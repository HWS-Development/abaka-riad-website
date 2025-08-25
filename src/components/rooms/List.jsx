import { useState } from "react";
import { useTranslation } from "react-i18next";
import { buildHotelRunnerUrl } from "../../utils/booking";
import RoomModal from "./RoomModal";

export default function RoomsList() {
  const { t } = useTranslation();
  const items = t("rooms.items", { returnObjects: true }) || [];

  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null);

  // default today/tomorrow
  const today = new Date();
  const iso = (d) => d.toISOString().slice(0, 10);
  const checkin = iso(today);
  const checkout = iso(new Date(today.getTime() + 24 * 60 * 60 * 1000));

  const view = (room) => { setActive(room); setOpen(true); };

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-serif text-3xl">{t("rooms.gridTitle")}</h2>
        <div className="text-sm opacity-70">{t("rooms.gridHint")}</div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((r, i) => (
          <article key={i} className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-lg transition">
            <div className="relative">
              <img src={r.image} alt={r.name} className="h-52 w-full object-cover" />
              <div className="absolute left-3 top-3 flex gap-2">
                {r.size && <span className="rounded-full bg-white/90 px-2 py-1 text-xs">{r.size}</span>}
                {r.capacity && <span className="rounded-full bg-white/90 px-2 py-1 text-xs">{r.capacity}</span>}
              </div>
            </div>

            <div className="p-4">
              <h3 className="font-medium text-lg">{r.name}</h3>
              <p className="text-sm opacity-70 mt-1">{r.short}</p>

              <div className="mt-4 flex items-center gap-3">
                <button
                  onClick={() => view(r)}
                  className="text-brand-burgundy text-sm underline underline-offset-4"
                >
                  {t("rooms.viewRoom")}
                </button>

                <a
                  className="ml-auto inline-block rounded-xl bg-brand-burgundy px-4 py-2 text-white text-sm"
                  href={buildHotelRunnerUrl({ checkin, checkout, adults: 2, children: 0, rooms: 1 })}
                >
                  {t("rooms.book")}
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Modal */}
      <RoomModal open={open} onClose={() => setOpen(false)} room={active} />
    </section>
  );
}
