"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { useCartStore } from "@/store/cartStore";
import BookCartDrawer from "./BookCartDrawer";
import SearchOverlay from "./SearchOverlay";

function BookCartIcon() {
  return (
    <svg width="26" height="28" viewBox="0 0 26 28" fill="none">
      <rect x="3" y="3" width="20" height="22" rx="1.5" fill="var(--ink)" />
      <rect x="6" y="3" width="17" height="22" rx="1.5" fill="var(--accent)" stroke="var(--ink)" strokeWidth="1" />
      <line x1="6" y1="3" x2="6" y2="25" stroke="var(--ink)" strokeWidth="1" />
      <line x1="10" y1="9" x2="20" y2="9" stroke="rgba(255,255,255,.6)" strokeWidth="1" />
      <line x1="10" y1="13" x2="18" y2="13" stroke="rgba(255,255,255,.4)" strokeWidth="1" />
    </svg>
  );
}

const links = [
  { href: "/", label: "Inicio" },
  { href: "/coleccion", label: "Colección" },
  { href: "/categorias", label: "Categorías" },
  { href: "/sobre-nosotros", label: "Sobre nosotros" },
];

export default function Nav() {
  const pathname = usePathname();
  const cartCount = useCartStore((s) => s.count());
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header style={{
        position: "sticky", top: 0, zIndex: 100,
        backdropFilter: "blur(18px) saturate(140%)",
        WebkitBackdropFilter: "blur(18px) saturate(140%)",
        background: scrolled ? "rgba(246,243,236,.88)" : "rgba(246,243,236,.4)",
        borderBottom: scrolled ? "1px solid var(--rule)" : "1px solid transparent",
        transition: "all .3s var(--ease)",
      }}>
        <div className="shell" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 76 }}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <Logo />
          </Link>

          <nav className="nav-desktop" style={{ display: "flex", gap: 36 }}>
            {links.map((l) => (
              <Link key={l.href} href={l.href} style={{
                fontSize: 14, fontWeight: 500, textDecoration: "none",
                color: pathname === l.href ? "var(--ink)" : "var(--ink-soft)",
                borderBottom: pathname === l.href ? "1px solid var(--ink)" : "1px solid transparent",
                paddingBottom: 4,
              }}>
                {l.label}
              </Link>
            ))}
          </nav>

          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <button onClick={() => setSearchOpen(true)} aria-label="Buscar" style={{ background: "transparent", border: 0, padding: 6, display: "grid", placeItems: "center" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                <circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>

            <button onClick={() => setCartOpen(true)} aria-label="Abrir carrito"
              style={{ position: "relative", background: "transparent", border: 0, padding: 0, display: "grid", placeItems: "center", width: 40, height: 44 }}>
              <BookCartIcon />
              {cartCount > 0 && (
                <span style={{
                  position: "absolute", top: -4, right: -4,
                  background: "var(--accent)", color: "#fff",
                  borderRadius: 999, minWidth: 20, height: 20, padding: "0 6px",
                  display: "grid", placeItems: "center",
                  fontFamily: "var(--mono)", fontSize: 10, fontWeight: 600,
                  boxShadow: "0 0 0 2px var(--paper)",
                }}>
                  {cartCount}
                </span>
              )}
            </button>

            <button className="mobile-menu-btn" onClick={() => setMobileOpen((v) => !v)} aria-label="Menú"
              style={{ background: "transparent", border: 0, padding: 6, display: "none" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.7" fill="none">
                <line x1="4" y1="8" x2="20" y2="8" /><line x1="4" y1="16" x2="20" y2="16" />
              </svg>
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div style={{ borderTop: "1px solid var(--rule)", background: "var(--paper)" }}>
            <div className="shell" style={{ padding: "16px 24px", display: "flex", flexDirection: "column", gap: 12 }}>
              {links.map((l) => (
                <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)}
                  style={{ fontSize: 18, fontFamily: "var(--serif)", textDecoration: "none" }}>
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      <BookCartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
