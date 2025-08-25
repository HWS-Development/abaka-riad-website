import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

export default function Layout() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  return (
    <div className="min-h-screen bg-brand-off text-brand-charcoal">
      <Header />
      <main id="main" className={isHome ? "" : "pt-16"}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
