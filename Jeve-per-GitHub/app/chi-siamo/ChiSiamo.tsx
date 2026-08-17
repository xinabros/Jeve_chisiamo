"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import {
  areaLevels,
  boardGroups,
  hero,
  impact,
  impactByYear,
  impactDefaultYear,
  impactMetrics,
  impactYears,
  missionVision,
  network,
  networkLayers,
  sections,
  teamAreas,
  teamEntry,
  testimonials,
  timeline,
  type BoardMember,
  type ManifestoBlock,
  type ImpactYear,
  type TeamArea,
  type TimelineEvent,
} from "@/content/chiSiamo";
import AwardsList from "@/components/AwardsList";
import styles from "./ChiSiamo.module.css";

/* ==========================================================================
   Pagina "Chi Siamo" — tutte le sezioni in un unico componente.
   I contenuti stanno in content/chiSiamo.ts; gli stili in ChiSiamo.module.css,
   dove ogni classe è prefissata per sezione (ui/hero/mv/team/tl/bd/net/aw/st).
   ========================================================================== */

/* ===================== ui ===================== */

/* ==========================================================================
   Primitive condivise dell'intero sito.
   Usate da ogni sezione della pagina, quindi restano fuori dai componenti
   di sezione. Stanno in un unico file perché sono piccole e SectionHeader
   si appoggia sempre a Reveal.
   ========================================================================== */

type RevealProps = {
  children: ReactNode;
  /** delay in ms, staggering siblings */
  delay?: number;
  /** how far it travels in, px */
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  /** ogni altra prop (es. data-*, style) finisce sull'elemento renderizzato */
  [key: `data-${string}`]: unknown;
  style?: React.CSSProperties;
};

/**
 * Reveals its children with a subtle fade + rise the first time they enter
 * the viewport. Fully respects prefers-reduced-motion (renders visible).
 */
function Reveal({
  children,
  delay = 0,
  as = "div",
  className = "",
  style,
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const Tag = as as any;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`${styles.uiReveal} ${visible ? styles.uiVisible : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
};

/** Intestazione standard di sezione: eyebrow + titolo + testo introduttivo. */
function SectionHeader({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "light",
}: SectionHeaderProps) {
  return (
    <Reveal
      className={`${styles.uiHeader} ${align === "center" ? styles.uiCenter : ""} ${
        tone === "dark" ? styles.uiDark : ""
      }`}
    >
      {eyebrow && <span className={styles.uiEyebrow}>{eyebrow}</span>}
      <h2 className={styles.uiTitle}>{title}</h2>
      {intro && <p className={styles.uiIntro}>{intro}</p>}
    </Reveal>
  );
}

/* Separatore curvo fra due sezioni: dipinge in basso il colore della
   sezione successiva, così il passaggio è un raccordo e non uno stacco.
   `tone` è il colore verso cui si va. */
function SectionCurve({
  tone,
}: {
  tone: "white" | "warm" | "paper" | "tint";
}) {
  return (
    <svg
      className={`${styles.uiCurve} ${styles[`uiCurve_${tone}`]}`}
      viewBox="0 0 1440 60"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path d="M0 60 C 300 4, 1140 4, 1440 60 Z" />
    </svg>
  );
}

/* ===================== Hero ===================== */

/**
 * Hero editoriale: titolo con parola accentata, lead placeholder e un
 * visual contemporaneo costruito in CSS (nessuna immagine reale: il blocco
 * `visualFrame` è il segnaposto da sostituire con la foto definitiva).
 */
function Hero() {
  return (
    <section className={styles.heroHero} aria-label="Presentazione">
      <div className={`container ${styles.heroGrid}`}>
        <div className={styles.copy}>
          <Reveal>
            <span className={styles.heroEyebrow}>{hero.eyebrow}</span>
          </Reveal>
          <Reveal delay={80}>
            <h1 className={styles.heroTitle}>
              {hero.title}{" "}
              <em className={styles.heroAccent}>{hero.accent}</em>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className={styles.heroLead}>{hero.lead}</p>
          </Reveal>
        </div>

        <Reveal delay={200} className={styles.heroVisual}>
          {hero.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              className={styles.heroPhoto}
              src={hero.image}
              alt={hero.imageAlt}
            />
          ) : (
            <div
              className={styles.heroVisualFrame}
              role="img"
              aria-label="Immagine placeholder del team"
            >
              <span className={styles.heroVisualLabel}>Immagine placeholder</span>
            </div>
          )}
          <div className={styles.heroVisualCard} aria-hidden="true">
            <span className={styles.heroVisualCardValue}>{hero.badge.value}</span>
            <span className={styles.heroVisualCardLabel}>{hero.badge.label}</span>
          </div>
          <div className={styles.heroVisualDots} aria-hidden="true" />
        </Reveal>
      </div>

      <SectionCurve tone="warm" />
    </section>
  );
}

/* ===================== MissionVision ===================== */

/**
 * Un solo blocco narrativo, non due card gemelle: testo e fotografia si
 * alternano di lato, legati da una linea curva discreta.
 *
 * `flip` inverte l'ordine su desktop; su mobile la colonna resta unica e
 * i due tempi si leggono di seguito, come un racconto continuo.
 */
function ManifestoPart({
  block,
  flip,
  children,
}: {
  block: ManifestoBlock;
  flip?: boolean;
  children?: ReactNode;
}) {
  return (
    <div className={`${styles.mvPart} ${flip ? styles.mvFlip : ""}`}>
      <Reveal className={styles.mvCopy}>
        <p className={styles.mvMeta}>
          <span className={styles.mvIndex}>{block.index}</span>
          <span className={styles.mvLabel}>{block.label}</span>
        </p>
        <h3 className={styles.mvTitle}>{block.title}</h3>
        <p className={styles.mvText}>{block.text}</p>
        <p className={styles.mvNote}>{block.note}</p>
        {children}
      </Reveal>

      <Reveal delay={120} className={styles.mvFigure}>
        {block.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className={styles.mvPhoto}
            src={block.photo}
            alt={block.photoAlt ?? ""}
          />
        ) : (
          /* riquadro d'attesa: dichiara cosa ci andrà, senza riempirlo con
             un'illustrazione di ripiego */
          <div className={styles.mvPhotoWait} role="img" aria-label={block.photoAlt ?? "Fotografia da inserire"}>
            <span>Fotografia</span>
          </div>
        )}
      </Reveal>
    </div>
  );
}

function MissionVision() {
  const { intro, mission, vision, guide } = missionVision;

  return (
    <section className={styles.mvSection} aria-label="Mission e Vision">
      <div className="container">
        <SectionHeader
          eyebrow={sections.missionVision.eyebrow}
          title={sections.missionVision.title}
        />

        {/* apertura discorsiva, larghezza da lettura */}
        <Reveal className={styles.mvIntro}>
          <p>{intro}</p>
        </Reveal>

        <div className={styles.mvStory}>
          {/* raccordo curvo fra i due tempi: unico elemento decorativo */}
          <svg
            className={styles.mvThread}
            viewBox="0 0 120 400"
            preserveAspectRatio="none"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M60 0 C104 96, 16 200, 60 296 C86 352, 54 372, 60 400"
              className={styles.mvThreadLine}
            />
          </svg>

          <ManifestoPart block={mission} />

          <ManifestoPart block={vision} flip>
            {/* frase guida: breve, in coda alla Vision */}
            <figure className={styles.mvGuide}>
              <blockquote>{guide.quote}</blockquote>
              <figcaption>{guide.attribution}</figcaption>
            </figure>
          </ManifestoPart>
        </div>
      </div>
    </section>
  );
}

/* ===================== Team ===================== */

/* Un trattamento visivo per area: tutti dello stesso peso, cambia solo
   il ritmo grafico. Restano dentro la palette del design system. */
const visualVariants = [
  styles.teamVisualA,
  styles.teamVisualB,
  styles.teamVisualC,
  styles.teamVisualD,
  styles.teamVisualE,
];

/* Motivi di linea, uno per area: richiamano il mestiere senza illustrare.
   Solo tracciati a filo, nessun riempimento, così restano leggeri sopra
   l'immagine e coerenti fra loro. */
const AREA_MOTIFS: Record<string, ReactNode> = {
  /* Business Analysis — istogramma con la linea di tendenza */
  "Business Analysis": (
    <>
      <path d="M8 52h48" />
      <path d="M16 52V34M28 52V22M40 52V38M52 52V14" />
      <path d="M16 30 28 18 40 32 52 10" />
      <circle cx="52" cy="10" r="2.5" />
    </>
  ),
  /* Marketing — onde di diffusione da un punto */
  Marketing: (
    <>
      <circle cx="20" cy="32" r="4" />
      <path d="M30 22a14 14 0 0 1 0 20" />
      <path d="M38 15a24 24 0 0 1 0 34" />
      <path d="M46 8a34 34 0 0 1 0 48" />
    </>
  ),
  /* Sales & BD — freccia che centra il bersaglio */
  "Sales & BD": (
    <>
      <circle cx="30" cy="34" r="18" />
      <circle cx="30" cy="34" r="9" />
      <path d="M30 34 56 8" />
      <path d="M46 8h10v10" />
    </>
  ),
  /* IT — parentesi angolari e barra */
  IT: (
    <>
      <path d="M22 20 8 32l14 12" />
      <path d="M42 20l14 12-14 12" />
      <path d="M36 14 28 50" />
    </>
  ),
  /* HR — persone affiancate */
  HR: (
    <>
      <circle cx="24" cy="24" r="7" />
      <path d="M12 48a12 12 0 0 1 24 0" />
      <circle cx="45" cy="27" r="5.5" />
      <path d="M36 47a9.5 9.5 0 0 1 19 0" />
    </>
  ),
};

function AreaMotif({ area }: { area: string }) {
  const motif = AREA_MOTIFS[area];
  if (!motif) return null;

  return (
    <svg
      className={styles.teamMotif}
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {motif}
    </svg>
  );
}

function AreaCard({ area, index }: { area: TeamArea; index: number }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  /* i membri arrivano raggruppati per livello, nell'ordine di areaLevels:
     la gerarchia si legge, ma resta una serie di gruppi e non un albero */
  const roster = areaLevels
    .map((level) => ({
      level,
      people: area.people.filter((person) => person.level === level),
    }))
    .filter((group) => group.people.length > 0);

  /* quando l'anagrafica è ancora parziale lo diciamo, invece di lasciar
     credere che l'area sia composta solo dai nomi elencati */
  const mancanti = Math.max(area.members - area.people.length, 0);

  return (
    <Reveal as="li" delay={index * 70} className={styles.teamCell}>
      <article className={`${styles.teamCard} ${open ? styles.teamCardOpen : ""}`}>
        <div className={styles.teamTop}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <span className={styles.teamDot} aria-hidden="true" />
        </div>

        {/* il motivo resta, in filigrana nello spazio sopra il titolo */}
        <AreaMotif area={area.name} />

        <h3 className={styles.teamName}>{area.name}</h3>

        <p className={styles.teamDescription}>{area.description}</p>

        <ul className={styles.teamSkills} aria-label={`Ambiti ${area.name}`}>
          {area.skills.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>

        <button
          type="button"
          className={styles.teamMore}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Chiudi" : "Più info"}
          <span aria-hidden="true">{open ? "×" : "→"}</span>
        </button>

        {/* Pannello di approfondimento: copre la card per intero e ha una
            propria intestazione con il pulsante di chiusura. */}
        <div id={panelId} className={styles.teamPanel}>
          <div className={styles.teamPanelHead}>
            <span className={styles.teamPanelTitle}>{area.name}</span>
            <button
              type="button"
              className={styles.teamPanelClose}
              onClick={() => setOpen(false)}
              aria-label={`Chiudi i dettagli dell'area ${area.name}`}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div className={styles.teamPanelBody}>
            <p className={styles.teamDetails}>{area.details}</p>

            <div className={styles.teamFact}>
              <p className={styles.teamFactLabel}>Cosa consegniamo</p>
              <p className={styles.teamFactText}>{area.delivers}</p>
            </div>

            {roster.length > 0 ? (
              <div className={styles.teamRoster}>
                {roster.map((group) => (
                  <div key={group.level} className={styles.teamLevel}>
                    <p className={styles.teamLevelLabel}>{group.level}</p>
                    <ul className={styles.teamLevelList}>
                      {group.people.map((person) => (
                        <li key={person.name} className={styles.teamPerson}>
                          {person.linkedin ? (
                            <a
                              className={styles.teamPersonLink}
                              href={person.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {person.name}
                            </a>
                          ) : (
                            person.name
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

                {mancanti > 0 && (
                  <p className={styles.teamMissing}>
                    e altri {mancanti} membri &middot; nominativi da inserire
                  </p>
                )}
              </div>
            ) : (
              <p className={styles.teamMembers}>
                <strong>{area.members}</strong> membri{" "}
                <span className={styles.teamMembersNote}>
                  · nominativi da inserire
                </span>
              </p>
            )}

            <p className={styles.teamEntry}>{teamEntry}</p>

            <a className={styles.teamLink} href={area.href}>
              Approfondisci
              <span aria-hidden="true"> &rarr;</span>
            </a>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

/**
 * Team come serie paritaria: cinque card identiche per dimensione e
 * trattamento, una per area, numerate 01–05. Nessuna area è messa in
 * evidenza rispetto alle altre: il ritmo arriva dalle quote alternate
 * della griglia, non da card più grandi.
 * Hover o focus scoprono la descrizione breve; il click apre un pannello
 * con dettagli, numero di membri e link di approfondimento.
 */
function Team() {
  return (
    <section className={styles.teamSection} aria-label="Il team">
      <div className="container">
        <SectionHeader
          eyebrow={sections.team.eyebrow}
          title={sections.team.title}
          intro={sections.team.intro}
        />
        <ul className={styles.teamMosaic}>
          {teamAreas.map((area, i) => (
            <AreaCard key={area.name} area={area} index={i} />
          ))}
        </ul>
      </div>

      <SectionCurve tone="white" />
    </section>
  );
}

/* ===================== Timeline ===================== */

/* La dorsale occupa una colonna a sinistra, le tappe stanno a destra. Il
   marker di ogni tappa è sfalsato in orizzontale, e la curva viene costruita
   PASSANDO per i marker misurati: così la linea non è mai dritta e non ha
   spigoli, ma resta ancorata ai punti reali. */

type Point = { x: number; y: number };

/**
 * Curva morbida che passa esattamente per i punti dati (Catmull-Rom
 * convertita in Bézier cubiche). Serve a evitare sia le linee dritte sia
 * gli angoli: ogni raccordo è continuo.
 */
function smoothPath(points: Point[]) {
  if (points.length < 2) return "";

  let d = `M${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;

  for (let i = 0; i < points.length - 1; i += 1) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;

    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;

    d += ` C${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
  }

  return d;
}

function Stage({
  event,
  index,
  markerRef,
}: {
  event: TimelineEvent;
  index: number;
  markerRef: (node: HTMLElement | null) => void;
}) {
  return (
    <li className={styles.tlStage}>
      <span ref={markerRef} className={styles.tlMarker} aria-hidden="true" />
      <Reveal className={styles.tlSlot} delay={index * 70}>
        <article className={styles.tlCard}>
          <p className={styles.tlYear}>{event.year}</p>
          <h3 className={styles.tlTitle}>{event.title}</h3>
          <p className={styles.tlDescription}>{event.description}</p>
          <p className={styles.tlDetail}>{event.detail}</p>
        </article>
      </Reveal>
    </li>
  );
}

/**
 * Timeline verticale, editoriale.
 *
 * La dorsale è un tracciato SVG ricostruito dalle posizioni reali dei
 * marker, quindi la curva li attraversa davvero invece di passarci vicino;
 * si adatta da sola a righe di altezza diversa e ai cambi di viewport.
 * Il tratto percorso avanza con lo scroll animando `stroke-dashoffset`,
 * che resta un'animazione di sola pittura sul path.
 *
 * Gli eventi vengono ordinati dal più recente al meno recente: aggiungerne,
 * toglierne o riordinarne uno non richiede modifiche qui.
 */
function Timeline() {
  const events = [...timeline].sort((a, b) => b.year - a.year);

  const trackRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<(HTMLElement | null)[]>([]);
  const pathRef = useRef<SVGPathElement>(null);

  const progressRef = useRef<SVGPathElement>(null);
  const [d, setD] = useState("");
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [length, setLength] = useState(0);

  /* ricostruisce il tracciato dalle posizioni correnti dei marker */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const rebuild = () => {
      const box = track.getBoundingClientRect();
      const measured = markersRef.current
        .filter((node): node is HTMLElement => Boolean(node))
        .map((node) => {
          const r = node.getBoundingClientRect();
          return {
            x: r.left - box.left + r.width / 2,
            y: r.top - box.top + r.height / 2,
          };
        });

      if (measured.length < 2) return;

      /* Il tracciato viene costruito AL CONTRARIO, dall'ultima tappa alla
         prima: la curva è identica, ma il suo punto di partenza diventa il
         2019. È così che il tratto percorso avanza da lì verso oggi. */
      const points = [...measured].reverse();

      /* code corte oltre i due estremi, nella direzione della curva: la
         linea non inizia né finisce di netto sul pallino. Seguendo la
         direzione funzionano sia in verticale sia in orizzontale. */
      const tail = (from: Point, to: Point) => {
        const dx = from.x - to.x;
        const dy = from.y - to.y;
        const len = Math.hypot(dx, dy) || 1;
        return {
          x: from.x + (dx / len) * 34,
          y: from.y + (dy / len) * 34,
        };
      };

      const extended = [
        tail(points[0], points[1]),
        ...points,
        tail(points[points.length - 1], points[points.length - 2]),
      ];

      setSize({ w: box.width, h: box.height });
      setD(smoothPath(extended));
    };

    rebuild();

    const observer = new ResizeObserver(rebuild);
    observer.observe(track);
    window.addEventListener("resize", rebuild);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", rebuild);
    };
  }, [events.length]);

  /* la lunghezza serve a dosare il tratto percorso */
  useEffect(() => {
    if (pathRef.current && d) setLength(pathRef.current.getTotalLength());
  }, [d]);

  /* ==========================================================================
     Avanzamento con lo scroll.

     Il valore NON passa da uno stato React: verrebbe ricalcolato l'intero
     albero della sezione a ogni frame di scroll. Qui si scrive direttamente
     sul tracciato e sui marker — una manciata di proprietà per frame, senza
     re-render. Per lo stesso motivo il CSS non ha una transizione sul
     tratto: aggiungerebbe solo ritardo a un valore già aggiornato a ogni
     frame.
     ========================================================================== */
  useEffect(() => {
    const track = trackRef.current;
    const line = progressRef.current;
    if (!track || !line || !length) return;

    const markers = markersRef.current;
    const last = markers.length - 1;

    const applica = (p: number) => {
      line.style.strokeDashoffset = `${length * (1 - p)}`;

      markers.forEach((node, i) => {
        if (!node) return;
        /* l'avanzamento parte dal fondo dell'elenco (2019), quindi
           l'indice va letto al contrario */
        const soglia = last < 1 ? 0 : (last - i) / last - 0.04;
        node.classList.toggle(styles.tlMarkerReached, p >= soglia);
      });
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      applica(1);
      return;
    }

    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = track.getBoundingClientRect();
      const viewport = window.innerHeight;

      /* Il tratto parte quando la timeline entra dal basso e si completa
         dopo `corsa` pixel di scroll — non alla fine della sezione. Prima
         il traguardo era legato al fondo del blocco, quindi la linea
         arrivava al 2025 quando la sezione era ormai alle spalle.
         La corsa segue l'altezza del contenuto, con un minimo perché
         anche una timeline corta non si completi di scatto. */
      const partenza = viewport * 0.9;
      const corsa = Math.max(rect.height * 0.7, viewport * 0.4);
      const ratio = (partenza - rect.top) / corsa;

      applica(Math.min(Math.max(ratio, 0), 1));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [length, d]);

  return (
    <section className={styles.tlSection} aria-label="La nostra storia">
      <div className="container">
        <SectionHeader
          eyebrow={sections.timeline.eyebrow}
          title={sections.timeline.title}
        />

        <div ref={trackRef} className={styles.tlTrack}>
          {/* dorsale: due tracciati sovrapposti, il grigio intero e il rosso
              che avanza scoprendosi */}
          {d && (
            <svg
              className={styles.tlSpine}
              width={size.w}
              height={size.h}
              viewBox={`0 0 ${size.w} ${size.h}`}
              fill="none"
              aria-hidden="true"
            >
              <path
                ref={pathRef}
                d={d}
                className={styles.tlSpineBase}
                vectorEffect="non-scaling-stroke"
              />
              <path
                ref={progressRef}
                d={d}
                className={styles.tlSpineProgress}
                vectorEffect="non-scaling-stroke"
                style={{
                  strokeDasharray: length || undefined,
                  strokeDashoffset: length || undefined,
                }}
              />
            </svg>
          )}

          <ol className={styles.tlStages}>
            {events.map((event, i) => (
              <Stage
                key={event.year}
                event={event}
                index={i}
                markerRef={(node) => {
                  markersRef.current[i] = node;
                }}
              />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ===================== Board ===================== */

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function LinkedInIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  );
}

function MemberCard({ member, delay }: { member: BoardMember; delay: number }) {
  return (
    <Reveal as="li" delay={delay} className={styles.bdCell}>
      <article className={styles.bdCard}>
        {/* Foto placeholder a tutta altezza: valorizza `photo` in
            content/chiSiamo.ts per sostituirla con l'immagine reale. */}
        {member.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img className={styles.bdPhoto} src={member.photo} alt="" />
        ) : (
          <div className={styles.bdPhotoPlaceholder} aria-hidden="true">
            <span className={styles.bdPhotoInitials}>{initials(member.name)}</span>
            <span className={styles.bdPhotoTag}>Foto placeholder</span>
          </div>
        )}

        {/* Overlay che si scurisce su hover/focus */}
        <div className={styles.bdScrim} aria-hidden="true" />

        <div className={styles.bdInfo}>
          <div className={styles.bdRevealBlock}>
            <h4 className={styles.bdName}>{member.name}</h4>
          </div>
          <p className={styles.bdRole}>{member.role}</p>
          <div className={styles.bdRevealBlock}>
            <p className={styles.bdDescription}>{member.description}</p>
          </div>
        </div>

        <a
          className={styles.bdLinkedin}
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Profilo LinkedIn di ${member.name}`}
        >
          <LinkedInIcon />
        </a>
      </article>
    </Reveal>
  );
}

/**
 * Board foto-first: cinque ritratti verticali dello stesso peso, disposti
 * su due quote alternate come le card del Team. Tutti visibili.
 * Stato base: foto + ruolo. Su hover / focus (e sempre su touch, dove
 * l'hover non esiste) compaiono nome e breve descrizione.
 * Estendibile: aggiungi gruppi o membri in `boardGroups`
 * (content/chiSiamo.ts) e la griglia si adatta da sola.
 */
function Board() {
  return (
    <section className={styles.bdSection} aria-label="Organigramma e Board">
      <div className="container">
        <SectionHeader
          eyebrow={sections.board.eyebrow}
          title={sections.board.title}
          intro={sections.board.intro}
        />
        <div className={styles.bdGroups}>
          {boardGroups.map((group) => (
            <div key={group.label}>
              {boardGroups.length > 1 && (
                <Reveal className={styles.bdGroupHead}>
                  <h3 className={styles.bdGroupLabel}>{group.label}</h3>
                  {group.description && (
                    <p className={styles.bdGroupDescription}>{group.description}</p>
                  )}
                </Reveal>
              )}
              <ul className={styles.bdGrid}>
                {group.members.map((member, i) => (
                  <MemberCard key={member.name} member={member} delay={i * 70} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <SectionCurve tone="warm" />
    </section>
  );
}

/* ===================== Network ===================== */

/* Inclinazione della pila. Tenuta moderata perché i loghi appoggiano sui
   piani: più si corica, meno restano leggibili. */
const NET_PITCH = 46;
const NET_YAW = -26;
/* Ampiezza della parallasse al movimento del mouse, in gradi. */
const NET_TILT = 5;

/**
 * Network: i tre livelli di appartenenza come piani impilati — Venezia
 * dentro l'Italia dentro l'Europa. Si legge dal basso verso l'alto: più
 * si sale, più ci si avvicina a noi.
 *
 * Terza versione della sezione. Le prime due erano entrambe "rete": nodi
 * collegati da curve (che si incrociavano) e orbite. Questa è una figura
 * concreta — una pila di piani, come i fogli di una mappa — e per
 * costruzione non ha nulla che si accavalli: ogni livello sta sul proprio
 * piano, in ordine.
 */
function Network() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    if (
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    let frame = 0;
    let targetX = 0;
    let targetY = 0;
    let rx = 0;
    let ry = 0;

    /* inseguimento smorzato: si ferma da solo a bersaglio raggiunto */
    const tick = () => {
      rx += (targetX - rx) * 0.08;
      ry += (targetY - ry) * 0.08;
      el.style.setProperty("--rx", `${rx.toFixed(3)}deg`);
      el.style.setProperty("--ry", `${ry.toFixed(3)}deg`);

      if (Math.abs(targetX - rx) > 0.01 || Math.abs(targetY - ry) > 0.01) {
        frame = requestAnimationFrame(tick);
      } else {
        frame = 0;
      }
    };

    const start = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const onMove = (event: PointerEvent) => {
      const box = el.getBoundingClientRect();
      const nx = (event.clientX - box.left) / box.width - 0.5;
      const ny = (event.clientY - box.top) / box.height - 0.5;
      targetY = nx * NET_TILT * 2;
      targetX = -ny * NET_TILT * 2;
      start();
    };

    const onLeave = () => {
      targetX = 0;
      targetY = 0;
      start();
    };

    el.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  const current = networkLayers.find((layer) => layer.id === active);

  return (
    <section className={styles.netSection} aria-label="Network e credibilità">
      <div className="container">
        <SectionHeader
          eyebrow={network.eyebrow}
          title={network.title}
          intro={network.intro}
        />

        <div className={styles.netLayout}>
          <div ref={stageRef} className={styles.netStage}>
            <div
              className={styles.netDeck}
              style={
                {
                  "--pitch": `${NET_PITCH}deg`,
                  "--yaw": `${NET_YAW}deg`,
                } as React.CSSProperties
              }
            >
              {networkLayers.map((layer, i) => (
                <a
                  key={layer.id}
                  className={`${styles.netLayer} ${
                    active === layer.id ? styles.netLayerOn : ""
                  }`}
                  href={layer.href}
                  target={layer.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    layer.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  /* Salendo il piano si stringe: l'Europa contiene l'Italia
                     che contiene Venezia. Il passo di 0.19 è calibrato per
                     vincere l'ingrandimento della prospettiva, che da sola
                     farebbe sembrare più grande il piano più vicino. */
                  style={
                    {
                      "--i": i,
                      "--scale": 1 - i * 0.19,
                    } as React.CSSProperties
                  }
                  onMouseEnter={() => setActive(layer.id)}
                  onFocus={() => setActive(layer.id)}
                  onMouseLeave={() => setActive(null)}
                  onBlur={() => setActive(null)}
                >
                  {/* il piano: una lastra sottile con bordo */}
                  <span className={styles.netSlab} aria-hidden="true" />

                  {/* il logo appoggia sul piano, quindi ne segue
                      l'inclinazione: è un francobollo sulla mappa */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className={styles.netLogo}
                    src={layer.logo}
                    alt={layer.name}
                  />

                  {/* l'etichetta invece sta dritta, per restare leggibile */}
                  <span className={styles.netTag}>
                    <span className={styles.netName}>{layer.name}</span>
                    <span className={styles.netScope}>{layer.scope}</span>
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* descrizione del livello attivo; a riposo spiega la figura */}
          <div className={styles.netReadout} aria-live="polite">
            {current ? (
              <>
                <p className={styles.netReadoutName}>{current.name}</p>
                <p className={styles.netReadoutText}>{current.description}</p>
              </>
            ) : (
              <p className={styles.netReadoutHint}>
                Tre livelli impilati: Venezia sta dentro l&rsquo;Italia, che
                sta dentro l&rsquo;Europa. Passa su un piano — o raggiungilo
                da tastiera — per leggerne il ruolo.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===================== Impatto ===================== */

/**
 * Numeri e testimonianze in un'unica sezione: prima l'apertura, poi pochi
 * indicatori, poi le voci di chi ha lavorato con noi. Su mobile si legge
 * di seguito, come una storia breve.
 *
 * Rispetto alla versione precedente non c'è più il selettore degli anni,
 * il grafico d'andamento, la card scura con il numero gigante né il
 * conteggio animato: erano gli elementi che davano l'aria da cruscotto.
 */
function Impact() {
  const [year, setYear] = useState<ImpactYear>(impactDefaultYear);
  const valori = impactByYear[year];

  return (
    <section className={styles.imSection} aria-label="Impatto e testimonianze">
      <div className="container">
        <SectionHeader
          eyebrow={sections.stats.eyebrow}
          title={sections.stats.title}
        />

        <Reveal className={styles.imLead}>
          <p>{impact.lead}</p>
        </Reveal>

        {/* Selettore d'anno: testo, non pulsanti. Serve a confrontare la
            progressione dei numeri senza aria da cruscotto. */}
        <Reveal className={styles.imYears}>
          <div role="group" aria-label="Anno di riferimento">
            {impactYears.map((option) => (
              <button
                key={option}
                type="button"
                className={`${styles.imYear} ${
                  option === year ? styles.imYearOn : ""
                }`}
                aria-pressed={option === year}
                onClick={() => setYear(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Indicatori: nessuna card, solo tipografia e spazio. Il filo
            sottile separa le voci senza incorniciarle. */}
        <ul className={styles.imMetrics}>
          {impactMetrics.map((metric, i) => (
            <Reveal as="li" key={metric.id} delay={i * 80} className={styles.imMetric}>
              {/* key sull'anno: al cambio il numero rientra con una
                  dissolvenza brevissima, invece di scattare */}
              <p className={styles.imValue} key={year}>
                {valori[metric.id]}
                {metric.suffix && (
                  <span className={styles.imSuffix}>{metric.suffix}</span>
                )}
              </p>
              <p className={styles.imLabel}>{metric.label}</p>
              <p className={styles.imContext}>{metric.context}</p>
            </Reveal>
          ))}
        </ul>

        {testimonials.length > 0 && (
          <div className={styles.imVoices}>
            {testimonials.map((item, i) => (
              <Reveal
                as="figure"
                key={item.quote}
                delay={i * 90}
                className={styles.imVoice}
              >
                <blockquote className={styles.imQuote}>{item.quote}</blockquote>

                <figcaption className={styles.imPerson}>
                  {item.avatar ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img className={styles.imAvatar} src={item.avatar} alt="" />
                  ) : (
                    <span className={styles.imAvatarWait} aria-hidden="true">
                      {initials(item.name.replace(/[«»]/g, ""))}
                    </span>
                  )}
                  <span>
                    <span className={styles.imName}>{item.name}</span>
                    <span className={styles.imRole}>{item.role}</span>
                  </span>
                </figcaption>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* ===================== Pagina ===================== */

export default function ChiSiamo() {
  return (
    <main>
      <Hero />
      <MissionVision />
      <Team />
      <Timeline />
      <Board />
      <Network />
      <AwardsList />
      <Impact />
    </main>
  );
}
