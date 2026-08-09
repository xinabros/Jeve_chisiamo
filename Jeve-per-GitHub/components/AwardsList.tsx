"use client";

import { useEffect, useRef, useState } from "react";
import { awardCategories, awards, sections } from "@/content/chiSiamo";
import styles from "./AwardsList.module.css";

/* ==========================================================================
   Premi e riconoscimenti — elenco di righe sul modello della home.

   Sostituisce la bacheca "bento": le tessere fisse da 190px tagliavano
   10–30px di contenuto su ogni card e troncavano le descrizioni. Qui ogni
   riga è alta quanto serve, quindi non si perde nulla.

   Ordina sempre per anno decrescente e porta in testa il premio con
   `featured: true`. Filtri per categoria e "mostra altri" restano in CSS
   puro, quindi funzionano anche senza JavaScript.
   ========================================================================== */

/** oltre questa soglia i premi finiscono dietro "Mostra altri" */
const VISIBLE_LIMIT = 6;

export default function AwardsList() {
  const sorted = [...awards].sort((a, b) => b.year - a.year);
  const featured = sorted.find((award) => award.featured) ?? sorted[0];
  const ordered = [featured, ...sorted.filter((award) => award !== featured)];

  /* solo le categorie effettivamente presenti diventano un filtro */
  const usedCategories = awardCategories.filter((category) =>
    ordered.some((award) => award.category === category)
  );
  const hasMore = ordered.length > VISIBLE_LIMIT;

  /* comparsa allo scroll: un solo osservatore sull'elenco, lo scaglionamento
     delle righe lo fa il CSS con --i */
  const listRef = useRef<HTMLUListElement>(null);
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
        <div className={styles.head}>
          <div>
            <span className={styles.eyebrow}>{sections.awards.eyebrow}</span>
            <h2 className={styles.title}>{sections.awards.title}</h2>
            <p className={styles.intro}>{sections.awards.intro}</p>
          </div>

          <div className={styles.filters} role="group" aria-label="Filtra per categoria">
            <input
              type="radio"
              name="award-filter"
              id="award-filter-all"
              className={styles.filterInput}
              defaultChecked
            />
            <label htmlFor="award-filter-all" className={styles.chip}>
              Tutti
            </label>

            {usedCategories.map((category) => {
              const i = awardCategories.indexOf(category);
              return (
                <span key={category}>
                  <input
                    type="radio"
                    name="award-filter"
                    id={`award-filter-${i}`}
                    className={`${styles.filterInput} ${styles[`f${i}`]}`}
                  />
                  <label htmlFor={`award-filter-${i}`} className={styles.chip}>
                    {category}
                  </label>
                </span>
              );
            })}
          </div>
        </div>

        <ul
          ref={listRef}
          className={`${styles.list} ${shown ? styles.listVisible : ""}`}
        >
          {ordered.map((award, i) => (
            <li
              key={`${award.year}-${award.title}`}
              className={`${styles.cell} ${i >= VISIBLE_LIMIT ? styles.extra : ""}`}
              /* usato dai filtri CSS per nascondere le altre categorie */
              data-category={awardCategories.indexOf(award.category)}
              style={{ "--i": i } as React.CSSProperties}
            >
              {/* tabIndex: da tastiera la riga riceve lo stesso trattamento
                  dell'hover */}
              <article className={styles.row} tabIndex={0}>
                <span className={styles.index} aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={styles.year}>{award.year}</span>
                <div className={styles.main}>
                  <h3 className={styles.rowTitle}>{award.title}</h3>
                  <p className={styles.org}>{award.org}</p>
                  <span className={styles.category}>{award.category}</span>
                </div>
                <p className={styles.description}>{award.description}</p>
              </article>
            </li>
          ))}
        </ul>

        {hasMore && (
          <div className={styles.moreRow}>
            <input
              type="checkbox"
              id="award-show-more"
              className={styles.moreInput}
            />
            <label htmlFor="award-show-more" className={styles.moreButton}>
              <span className={styles.moreLabel}>
                Mostra altri riconoscimenti
              </span>
              <span className={styles.lessLabel}>Mostra meno</span>
            </label>
          </div>
        )}
      </div>
    </section>
  );
}
