"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./SiteHeader.module.css";

/* ==========================================================================
   Header del sito — ricalcato sulla home v2: una pillola di vetro flottante
   e centrata, che resta fissa allo scorrere della pagina. Sotto i 760px
   diventa una barra piena con menu a tutto schermo.

   Voci di navigazione: la home è una single page, quindi i link puntano
   alle sue ancore. "Chi siamo" è invece la nostra pagina. Quando i due
   progetti si uniscono basta rivedere gli href qui.
   ========================================================================== */

const NAV = [
  { label: "Servizi", href: "/#servizi" },
  { label: "Partner", href: "/#partners" },
  { label: "Chi siamo", href: "/chi-siamo", current: true },
  { label: "Riconoscimenti", href: "/#riconoscimenti" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    /* clic fuori dal menu e Esc lo chiudono; finché è aperto la pagina
       sotto non scorre (regola `html.menu-open` in globals.css) */
    const onPointerDown = (event: PointerEvent) => {
      if (!open) return;
      if (
        event.target instanceof Node &&
        !menuRef.current?.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) setOpen(false);
    };

    document.documentElement.classList.toggle("menu-open", open);
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
      document.documentElement.classList.remove("menu-open");
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={styles.header}>
      <a className={styles.brand} href="/" aria-label="Jeve — home">
        <span className={styles.brandLogo} aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand-jeve-leone.png" alt="" />
        </span>
      </a>

      <nav className={styles.desktopNav} aria-label="Navigazione principale">
        {NAV.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className={item.current ? styles.navCurrent : undefined}
            aria-current={item.current ? "page" : undefined}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <a className={styles.cta} href="mailto:info@jeve.it">
        Parliamone
      </a>

      <div
        ref={menuRef}
        className={`${styles.mobileMenu} ${open ? styles.isOpen : ""}`}
      >
        <button
          type="button"
          className={styles.toggle}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Chiudi il menu" : "Apri il menu"}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav
          id="mobile-navigation"
          aria-label="Navigazione mobile"
          aria-hidden={!open}
        >
          {NAV.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={close}
              tabIndex={open ? 0 : -1}
              aria-current={item.current ? "page" : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
