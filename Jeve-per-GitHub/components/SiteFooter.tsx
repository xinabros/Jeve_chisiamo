import styles from "./SiteFooter.module.css";

/* Contenuti ripresi dal footer della home, così le due parti del sito
   dicono le stesse cose. Recapiti da aggiornare in un unico punto. */

const ESPLORA = [
  { label: "Servizi", href: "/#servizi" },
  { label: "Partner", href: "/#partners" },
  { label: "Chi siamo", href: "/chi-siamo" },
  { label: "Riconoscimenti", href: "/#riconoscimenti" },
  { label: "Entra in JEVE", href: "https://jeve.it/entra-in-jeve/" },
];

const SEGUICI = [
  {
    label: "LinkedIn",
    href: "https://it.linkedin.com/company/jeve-junior-enterprise-venezia",
  },
  { label: "Instagram", href: "https://www.instagram.com/jeve.venezia/" },
  { label: "Email", href: "mailto:info@jeve.it" },
];

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          <div>
            <a className={styles.brand} href="/">
              JEVE
              <span className={styles.brandSub}>Junior Enterprise Venezia</span>
            </a>
            <p className={styles.claim}>
              Step into the future of your business.
            </p>
          </div>

          <div>
            <h2 className={styles.colTitle}>Esplora</h2>
            <ul className={styles.list}>
              {ESPLORA.map((item) => (
                <li key={item.label}>
                  <a className={styles.link} href={item.href}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className={styles.colTitle}>Seguici</h2>
            <ul className={styles.list}>
              {SEGUICI.map((item) => (
                <li key={item.label}>
                  <a
                    className={styles.link}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      item.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className={styles.colTitle}>Venezia</h2>
            <address className={styles.address}>
              Cannaregio 2978
              <br />
              30121 Venezia, VE
              <br />
              <a className={styles.link} href="tel:+393917208715">
                +39 391 720 8715
              </a>
            </address>
            <p className={styles.fiscal}>
              P.IVA: 04548570276
              <br />
              C.F.: 94096850279
            </p>
          </div>
        </div>

        <div className={styles.legal}>
          <span>© 2026 JEVE · Junior Enterprise Ca&rsquo; Foscari Venezia</span>
          <span className={styles.legalLinks}>
            <a
              className={styles.link}
              href="https://jeve.it/privacy-policy/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy
            </a>
            <a
              className={styles.link}
              href="https://jeve.it/cookie-policy/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Cookie
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
