import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  const BOOKING_URL =
    "https://riad-abaka-hotel-boutique.hotelrunner.com/bv3/search?search=%7B%22checkin_date%22:%222025-08-18%22,%22checkout_date%22:%222025-08-19%22,%22day_count%22:1,%22room_count%22:1,%22total_adult%22:2,%22total_child%22:0,%22rooms%22:%5B%7B%22adult_count%22:2,%22guest_count%22:2,%22child_count%22:0,%22child_ages%22:%5B%5D%7D%5D,%22guest_rooms%22:%7B%220%22:%7B%22adult_count%22:2,%22guest_count%22:2,%22child_count%22:0,%22child_ages%22:%5B%5D%7D%7D%7D";

  return (
    <footer className="bg-brand-burgundy text-white/90 pt-8">
      {/* strapline */}
      <div className="mx-auto max-w-6xl px-4 pb-4">
        <p className="font-medium">{t("footer.strapline")}</p>
      </div>

      {/* main grid */}
      <div className="mx-auto max-w-6xl px-4 pb-10 grid md:grid-cols-3 gap-10">
        {/* column 1 – address */}
        <div>
          <span className="inline-block rounded-lg bg-white/10 px-3 py-1 text-sm">
            Abaka Riad by Ghali
          </span>

          <address className="not-italic mt-4 space-y-2">
            <div>21 Souk Lakssour, Marrakech 40030</div>
            <div>Morocco</div>
            <div>
              <a href="tel:+212667815538" className="hover:underline">
                +212 667 815 538
              </a>
            </div>
            <div>
              <a href="mailto:info@riadghali.com" className="hover:underline">
                info@riadghali.com
              </a>
            </div>
          </address>

          <div className="mt-4 flex gap-3 text-lg opacity-90">
            <a
              href="https://maps.app.goo.gl/HkBN8JiH6xkvusFQ9"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Google Maps"
              className="hover:opacity-100"
            >
              📍
            </a>
            <span aria-hidden>📷</span>
            <span aria-hidden>👍</span>
          </div>
        </div>

        {/* column 2 – explore */}
        <div>
          <h4 className="tracking-[0.2em] uppercase text-xs text-white/70 mb-3">
            {t("footer.explore")}
          </h4>
          <ul className="space-y-2">
            <li><a href="/">{t("nav.home")}</a></li>
            <li><a href="/rooms">{t("nav.rooms")}</a></li>
            <li><a href="/restaurant">{t("nav.restaurant")}</a></li>
            <li><a href="/discover">{t("nav.discover")}</a></li>
            <li><a href="/gallery">{t("nav.gallery")}</a></li>
            <li><a href="/contact">{t("nav.contact")}</a></li>
          </ul>
        </div>

        {/* column 3 – get in touch with fixed buttons */}
        <div>
          <h4 className="tracking-[0.2em] uppercase text-xs text-white/70 mb-3">
            {t("footer.getInTouch")}
          </h4>
          <p className="opacity-90 mb-4 max-w-sm">{t("footer.helpText")}</p>

          <div className="flex flex-wrap gap-3">
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl bg-white text-brand-burgundy px-4 py-2 text-sm font-medium hover:bg-white/90"
            >
              {t("footer.contactUs")}
            </a>

            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-xl border border-white/30 px-4 py-2 text-sm font-medium hover:bg-white/10"
            >
              {t("footer.bookNow")}
            </a>
          </div>
        </div>
      </div>

      {/* bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-4 flex flex-col md:flex-row gap-3 md:items-center md:justify-between text-sm text-white/70">
          <div>© {new Date().getFullYear()} Abaka Riad by Ghali — {t("footer.rights")}</div>
          <div className="flex gap-4">
            <a href="/privacy" className="hover:underline">{t("footer.privacy")}</a>
            <span>·</span>
            <a href="/terms" className="hover:underline">{t("footer.terms")}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
