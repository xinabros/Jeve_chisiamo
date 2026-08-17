"use client";

import { useEffect, useRef, useState } from "react";
import { awards, sections } from "@/content/chiSiamo";
import styles from "./AwardsList.module.css";

/* ==========================================================================
   Premi e riconoscimenti — ripresa 1:1 della sezione "Riconoscimenti" della
   home v2 (v2homejeve.netlify.app): stessa struttura di markup, stessa
   griglia a cinque colonne, stesse immagini dei trofei, stesso hover
   (testo rosso, rientro di 18px, trofeo che ruota).

   Come nella home non ci sono filtri né "mostra altri": l'elenco è
   semplicemente ordinato dal più recente al meno recente.
   ========================================================================== */

export default function AwardsList() {
  /* più recente → meno recente, con il premio in evidenza in testa */
  const sorted = [...awards].sort((a, b) => b.year - a.year);
  const featured = sorted.find((award) => award.featured) ?? sorted[0];
  const ordered = [featured, ...sorted.filter((award) => award !== featured)];

  /* comparsa allo scroll: un solo osservatore, lo scaglionamento delle
     righe lo fa il CSS con --i */
  const listRef = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShown(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.section} aria-label="Premi e riconoscimenti">
      <div className="container">
        {/* intestazione a due colonne: titolo a sinistra, testo a destra */}
        <div className={styles.heading}>
          <div>
            <p className={styles.label}>{sections.awards.eyebrow}</p>
            <h2 className={styles.title}>
              {sections.awards.title}
              <br />
              <em className={styles.accent}>{sections.awards.accent}</em>
            </h2>
          </div>
          <p className={styles.intro}>{sections.awards.intro}</p>
        </div>

        <div
          ref={listRef}
          className={`${styles.list} ${shown ? styles.listVisible : ""}`}
        >
          {ordered.map((award, i) => (
            /* tabIndex: da tastiera la riga riceve lo stesso trattamento
               dell'hover */
            <article
              key={`${award.year}-${award.title}`}
              className={styles.row}
              tabIndex={0}
              style={{ "--i": i } as React.CSSProperties}
            >
              <span className={styles.index} aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>

              <time dateTime={String(award.year)}>{award.year}</time>

              <span className={styles.image}>
                {award.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={award.image}
                    alt={`Premio ${award.title} ${award.year}`}
                    loading="lazy"
                  />
                )}
              </span>

              <h3>{award.title}</h3>

              <p>{award.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
