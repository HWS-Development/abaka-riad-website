  import { useEffect, useState } from "react";
  import { Link, NavLink } from "react-router-dom";
  import { useTranslation } from "react-i18next";

  function LanguageSwitcher() {
    const { i18n } = useTranslation();
    const lang = i18n.language?.startsWith("fr") ? "fr" : "en";

    const set = (l) => {
      localStorage.setItem("lang", l);
      i18n.changeLanguage(l);
    };

    return (
      <div className="hidden md:flex items-center gap-3 text-sm">
        <button
          onClick={() => set("en")}
          className={`hover:underline ${lang === "en" ? "text-brand-burgundy font-medium" : "opacity-70"}`}
        >
          EN
        </button>
        <span className="opacity-30">|</span>
        <button
          onClick={() => set("fr")}
          className={`hover:underline ${lang === "fr" ? "text-brand-burgundy font-medium" : "opacity-70"}`}
        >
          FR
        </button>
      </div>
    );
  }

  export default function Header() {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
      const onScroll = () => setScrolled(window.scrollY > 4);
      onScroll();
      window.addEventListener("scroll", onScroll);
      return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // nav (no "About")
    const navItems = [
      { to: "/", label: t("nav.home") },
      { to: "/rooms", label: t("nav.rooms") },
      // { to: "/restaurant", label: t("nav.restaurant") },
      { to: "/discover", label: t("nav.discover") },
      // { to: "/activities", label: t("nav.activities") },
      { to: "/gallery", label: t("nav.gallery") },
      { to: "/contact", label: t("nav.contact") }
    ];

    return (
      <header
        className={`fixed inset-x-0 top-0 z-50 transition ${
          scrolled ? "bg-white/85 backdrop-blur-md shadow-[0_1px_0_rgba(0,0,0,.06)]" : "bg-white/60 backdrop-blur"
        }`}
      >
        {/* slim like Riad Ghali: brand pill, centered links, CTA + lang at right */}
        <nav className="mx-auto max-w-6xl h-14 md:h-20 px-4 grid grid-cols-12 items-center gap-4">
          {/* brand (left) */}
          <div className="col-span-6 md:col-span-3">
            <Link to="/" className="inline-block" aria-label={t("common.brand")}>
            <img src="/images/logo.png" alt="" height={'10'} width={110} className="py-1"/>
              {/* <span className="px-3 py-1.5 rounded border border-black/25 text-[13px] md:text-sm tracking-wide">
                {t("common.brand")}
              </span> */}
            </Link>
          </div>

          {/* centered nav (desktop only) */}
          <ul className="hidden md:flex col-span-6 md:col-span-6 items-center justify-center gap-6">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `text-[14.5px] hover:text-brand-burgundy transition ${
                      isActive ? "text-brand-burgundy font-medium" : "opacity-85"
                    }`
                  }
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* right area: CTA + language + mobile toggle */}
          <div className="col-span-6 md:col-span-3 flex items-center justify-end gap-3">
            <a
              href="/rooms"
              className="hidden sm:inline-block rounded-xl bg-brand-burgundy text-white px-3.5 py-2 text-sm"
            >
              {t("rooms.book")}
            </a>
            <LanguageSwitcher />
            <button
              onClick={() => setOpen((o) => !o)}
              className="md:hidden h-9 w-9 rounded border border-black/15"
              aria-label="Menu"
              aria-expanded={open ? "true" : "false"}
            >
              ☰
            </button>
          </div>
        </nav>

        {/* mobile menu */}
        {open && (
          <div className="md:hidden border-t border-black/10 bg-white">
            <ul className="px-4 py-3 space-y-2">
              {navItems.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className="block py-2"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
              <li className="pt-2 flex items-center gap-4">
                <a
                  href="/rooms"
                  className="rounded-lg bg-brand-burgundy text-white px-3 py-2 text-sm"
                  onClick={() => setOpen(false)}
                >
                  {t("rooms.book")}
                </a>
                <div className="ml-auto">
                  <LanguageSwitcher />
                </div>
              </li>
            </ul>
          </div>
        )}
      </header>
    );
  }
