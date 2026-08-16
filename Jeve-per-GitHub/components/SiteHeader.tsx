import styles from "./SiteHeader.module.css";

/* ==========================================================================
   Voci di navigazione — le stesse della home, che è una single page: i link
   puntano quindi alle sue ancore. "Chi siamo" è invece la nostra pagina.
   Quando i due progetti si uniscono basta rivedere gli href qui.
   ========================================================================== */

const NAV = [
  { label: "Servizi", href: "/#servizi" },
  { label: "Partner", href: "/#partners" },
  { label: "Chi siamo", href: "/chi-siamo", current: true },
  { label: "Riconoscimenti", href: "/#riconoscimenti" },
];

export default function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <a className={styles.brand} href="/" aria-label="Jeve — home">
          {/* Segnaposto del logo: sostituibile con l'immagine ufficiale */}
          <span className={styles.brandMark} aria-hidden="true">
            J
          </span>
          JEVE
        </a>

        <nav className={styles.nav} aria-label="Principale">
          {NAV.map((item) => (
            <a
              key={item.label}
              className={`${styles.link} ${
                item.current ? styles.linkCurrent : ""
              }`}
              href={item.href}
              aria-current={item.current ? "page" : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a className={`btn btn-ink ${styles.cta}`} href="mailto:info@jeve.it">
          Parliamone
        </a>
      </div>
    </header>
  );
}
