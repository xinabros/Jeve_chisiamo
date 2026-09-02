"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import {
  areaLevels,
  boardGroups,
  hero,
  lifePhotos,
  missionVision,
  network,
  networkLayers,
  networkMap,
  sections,
  teamAreas,
  teamEntry,
  testimonials,
  timeline,
  type BoardMember,
  type ManifestoBlock,
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
   `tone` è il colore verso cui si va.

   ⚑ NON PIÙ USATO: l'impaginazione attuale separa le sezioni con lo
   spazio (--sp-section-gap), non con una curva dipinta. Resta qui —
   insieme a `.uiCurve` nel CSS — perché rimetterlo è una riga sola. */
function SectionCurve({
  tone,
}: {
  tone: "white" | "soft";
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
 * Hero a due colonne: il testo a sinistra, il nastro di fotografie a
 * destra. Le due parti hanno lo stesso peso e la colonna del visual
 * arriva fino al filo del contenitore.
 *
 * Il nastro è la sezione "In azione" della versione precedente, portata
 * dentro l'hero: la vita associativa si vede subito, senza aspettare una
 * sezione a parte. Scorre in verticale, si ferma al passaggio del
 * puntatore e con motion ridotto non parte affatto.
 *
 * Dietro, due aloni rossi sfocati agli angoli opposti danno profondità
 * senza disegnare nulla.
 *
 * I due inviti in coda: il primo scende alla direzione (Mission e
 * Vision), il secondo apre la mail.
 */
function Hero() {
  return (
    <section className={styles.heroHero} aria-label="Presentazione">
      <div className={`container ${styles.heroGrid}`}>
        <div className={styles.heroCopy}>
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
          <Reveal delay={240} className={styles.heroActions}>
            <a
              className={`btn btn-red ${styles.heroBtnPrimary}`}
              href={hero.actions.primary.href}
            >
              {hero.actions.primary.label}
              <span aria-hidden="true">→</span>
            </a>
            <a className={styles.heroBtnGhost} href={hero.actions.ghost.href}>
              {hero.actions.ghost.label}
            </a>
          </Reveal>
        </div>

        {/* Nastro verticale: l'elenco viene reso due volte di fila e
            l'animazione trasla del 50%, così a fine ciclo la seconda
            copia si trova dove stava la prima e il ritorno a capo non
            si vede. La seconda copia è `aria-hidden`: a chi legge con
            uno screen reader le fotografie vanno annunciate una volta
            sola. */}
        <Reveal
          delay={200}
          className={styles.heroVisual}
          aria-label="La vita in JEVE"
        >
          <div className={styles.heroCarouselViewport}>
            <div className={styles.heroCarouselTrack}>
              {/* Nessuna didascalia a schermo: le fotografie restano
                  pulite. Il testo di `caption` resta come alternativo,
                  quindi chi legge con uno screen reader sa cosa sono. */}
              {[...lifePhotos, ...lifePhotos].map((photo, i) => {
                const copia = i >= lifePhotos.length;
                return (
                  <div
                    key={`${photo.src}-${i}`}
                    className={styles.carouselItem}
                    aria-hidden={copia || undefined}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={photo.src}
                      alt={copia ? "" : photo.caption}
                      loading="lazy"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>
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
        {/* Affermazioni in paragrafo, non in elenco puntato: stesso
            peso tipografico per tutte, senza il trattino rosso che le
            trasformava in una lista di requisiti. */}
        {block.points.map((point) => (
          <p key={point} className={styles.mvText}>
            {point}
          </p>
        ))}
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
    <section
      className={styles.mvSection}
      id="mission"
      aria-label="Mission e Vision"
    >
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
            {/* Frase guida: breve, in coda alla Vision. Compare solo se
                c'è davvero — inventarne una da attribuire a qualcuno non
                si può, e un segnaposto in mezzo a testi veri stona. */}
            {guide && (
              <figure className={styles.mvGuide}>
                <blockquote>{guide.quote}</blockquote>
                <figcaption>{guide.attribution}</figcaption>
              </figure>
            )}
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
      {/* data-cursor-expand: la card è cliccabile ma non è un <a> né un
          <button>, quindi il cursore custom va avvisato a mano. */}
      <article
        className={`${styles.teamCard} ${open ? styles.teamCardOpen : ""}`}
        data-cursor-expand
      >
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
                              <span className={styles.teamPersonName}>
                                {person.name}
                              </span>
                              {/* il marchio dichiara dove porta il link,
                                  che altrimenti è solo un nome sottolineato */}
                              <LinkedInIcon size={12} />
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
/* I Responsabili nella forma che si aspetta MemberCard. Derivati dalle
   aree: `teamAreas` resta l'unica anagrafica, qui si cambia solo forma. */
const areaLeads: BoardMember[] = teamAreas.flatMap((area) => {
  const lead = area.people.find((person) => person.level === "Responsabile");
  if (!lead) return [];
  return [
    {
      name: lead.name,
      role: area.name,
      description: lead.description ?? "",
      linkedin: lead.linkedin ?? "#",
      photo: lead.photo,
    },
  ];
});

function Team() {
  return (
    <section className={styles.teamSection} aria-label="Il team">
      <div className="container">
        <SectionHeader
          eyebrow={sections.team.eyebrow}
          title={sections.team.title}
          intro={sections.team.intro}
        />
        {/* Blocco 1 — le aree */}
        <div className={styles.teamBlock}>
          <Reveal className={styles.uiGroupHead}>
            <h3 className={styles.uiGroupLabel}>{sections.areas.label}</h3>
            <p className={styles.uiGroupDescription}>
              {sections.areas.description}
            </p>
          </Reveal>

          <ul className={styles.teamMosaic}>
            {teamAreas.map((area, i) => (
              <AreaCard key={area.name} area={area} index={i} />
            ))}
          </ul>
        </div>

        {/* Uscita della sezione: dalle aree a cosa producono. La sezione
            di destinazione non esiste ancora — vedi il commento su
            `sections.teamCta` in content/chiSiamo.ts. */}
        <Reveal className={styles.teamCta}>
          <p className={styles.teamCtaText}>{sections.teamCta.text}</p>
          <a className={`btn btn-red ${styles.teamCtaBtn}`} href={sections.teamCta.href}>
            {sections.teamCta.label}
            <span aria-hidden="true">→</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/**
 * Responsabili d'area — sezione a sé, in coda al Board.
 *
 * Prima era il secondo blocco della sezione Team. Sta meglio qui: dopo
 * il Board si legge come il livello successivo dell'organigramma, e la
 * sezione Team resta su un solo tema, le aree.
 *
 * Stessa card del Board; i nomi arrivano da `teamAreas`, non sono
 * riscritti qui, così rinominare qualcuno in un posto solo basta.
 * `role` è l'area che guida.
 */
function AreaLeads() {
  return (
    <section
      className={`${styles.teamSection} ${styles.teamSectionLeads}`}
      aria-label="Responsabili d'area"
    >
      <div className="container">
        <div className={styles.teamBlock}>
          <Reveal className={styles.uiGroupHead}>
            <h3 className={styles.uiGroupLabel}>{sections.leads.label}</h3>
            <p className={styles.uiGroupDescription}>
              {sections.leads.description}
            </p>
          </Reveal>

          <ul className={styles.bdGrid}>
            {areaLeads.map((lead, i) => (
              <MemberCard key={lead.name} member={lead} delay={i * 70} />
            ))}
          </ul>
        </div>
      </div>
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
 * Gli eventi vengono ordinati dal meno recente al più recente, così la
 * storia si legge nel verso naturale: il 2019 apre a sinistra, l'anno più
 * recente chiude a destra. Aggiungerne, toglierne o riordinarne uno non
 * richiede modifiche qui.
 */
function Timeline() {
  const events = [...timeline].sort((a, b) => a.year - b.year);

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

      /* L'ordine DOM parte già dalla tappa più antica, quindi il tracciato
         si costruisce così com'è: il suo punto di partenza è il 2019, ed è
         da lì che il tratto percorso avanza verso oggi. */
      const points = measured;

      /* Il tracciato comincia e finisce esattamente sui due pallini
         estremi: niente code oltre. Prima ne sporgevano 34px per parte,
         e la linea sbordava dal primo e dall'ultimo punto. */
      setSize({ w: box.width, h: box.height });
      setD(smoothPath(points));
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
     Avanzamento a tempo, non con lo scroll.

     Quando la sezione entra in vista la sequenza parte una volta sola e
     poi va da sé: da sinistra a destra, dal 2019 all'anno più recente,
     nello stesso ordine in cui le tappe stanno in pagina, una tappa ogni
     `PASSO` millisecondi. Arrivata in fondo aspetta `PAUSA`, si azzera e
     riparte, in ciclo continuo. Prima l'avanzamento seguiva lo scroll:
     chi arrivava sulla sezione con un salto d'ancora la trovava già
     tutta percorsa, e chi scorreva veloce non la vedeva affatto.

     Il valore NON passa da uno stato React: verrebbe ricalcolato l'intero
     albero della sezione a ogni passo. Qui si scrive direttamente sul
     tracciato e sui marker.
     ========================================================================== */
  useEffect(() => {
    const track = trackRef.current;
    const line = progressRef.current;
    if (!track || !line || !length) return;

    const markers = markersRef.current.filter(
      (node): node is HTMLElement => Boolean(node)
    );
    if (markers.length < 2) return;

    /* `markers` è in ordine DOM, dal meno recente: è già il verso in cui
       la sequenza deve scorrere, perché il tratto parte dal 2019. */
    const ordinati = markers;

    line.style.strokeDasharray = `${length}`;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      line.style.transition = "none";
      line.style.strokeDashoffset = "0";
      ordinati.forEach((node) => node.classList.add(styles.tlMarkerReached));
      return;
    }

    /* Quanto tracciato serve per arrivare a ciascun marker. Il path è una
       curva, quindi la lunghezza non si ricava dalle coordinate: si
       campiona una volta sola e per ogni marker si tiene il campione più
       vicino. 400 campioni bastano — l'errore resta sotto il pixel. */
    const box = track.getBoundingClientRect();
    const punti = ordinati.map((node) => {
      const r = node.getBoundingClientRect();
      return {
        x: r.left - box.left + r.width / 2,
        y: r.top - box.top + r.height / 2,
      };
    });

    const CAMPIONI = 400;
    const migliore = punti.map(() => ({ dist: Infinity, len: 0 }));

    for (let s = 0; s <= CAMPIONI; s++) {
      const l = (length * s) / CAMPIONI;
      const pt = line.getPointAtLength(l);
      punti.forEach((p, i) => {
        const dx = pt.x - p.x;
        const dy = pt.y - p.y;
        const dist = dx * dx + dy * dy;
        if (dist < migliore[i].dist) {
          migliore[i] = { dist, len: l };
        }
      });
    }

    const tappe = migliore.map((m) => m.len);

    const PASSO = 700; /* ms fra una tappa e la successiva */
    const CORSA = 900; /* ms che il tratto impiega a coprire una tappa */
    const PAUSA = 7000; /* ms di sosta a sequenza completa */

    let timers: ReturnType<typeof setTimeout>[] = [];
    let vivo = true;

    const azzera = () => {
      ordinati.forEach((node) =>
        node.classList.remove(styles.tlMarkerReached)
      );
      line.style.transition = "none";
      /* la coda iniziale, prima del 2019, è già dipinta: la sequenza
         comincia dal primo marker, non dal nulla */
      line.style.strokeDashoffset = `${length - tappe[0]}`;
      /* forza il reflow, altrimenti il prossimo cambio non è animato */
      void line.getBoundingClientRect();
      line.style.transition = `stroke-dashoffset ${CORSA}ms ease-in-out`;
    };

    const suona = () => {
      if (!vivo) return;

      ordinati[0].classList.add(styles.tlMarkerReached);

      for (let i = 1; i < ordinati.length; i++) {
        timers.push(
          setTimeout(() => {
            if (!vivo) return;
            line.style.strokeDashoffset = `${length - tappe[i]}`;
            ordinati[i].classList.add(styles.tlMarkerReached);
          }, i * PASSO)
        );
      }

      /* a sequenza finita: sosta, azzeramento e da capo */
      const fine = (ordinati.length - 1) * PASSO + CORSA;
      timers.push(
        setTimeout(() => {
          if (!vivo) return;
          azzera();
          timers.push(setTimeout(suona, 60));
        }, fine + PAUSA)
      );
    };

    azzera();

    /* Ferma finché la sezione non si vede almeno per un terzo: così la
       sequenza comincia davvero dall'inizio invece di trovarsi già a
       metà quando ci si arriva.

       Il controllo è a mano, non con un IntersectionObserver: la
       sezione può essere già in vista quando l'effetto parte — si arriva
       con un'ancora, si ricarica a metà pagina, il browser ripristina lo
       scroll — e in quel caso l'observer non notifica nulla, perché non
       c'è alcun cambio di stato da segnalare. Il listener si toglie da
       solo al primo avvio, quindi non pesa sullo scroll. */
    const inVista = () => {
      const r = track.getBoundingClientRect();
      const visibile =
        Math.min(r.bottom, window.innerHeight) - Math.max(r.top, 0);
      return r.height > 0 && visibile / r.height >= 0.3;
    };

    const controlla = () => {
      if (!vivo || !inVista()) return;
      stacca();
      suona();
    };

    const stacca = () => {
      window.removeEventListener("scroll", controlla);
      window.removeEventListener("resize", controlla);
    };

    window.addEventListener("scroll", controlla, { passive: true });
    window.addEventListener("resize", controlla);
    controlla();

    return () => {
      vivo = false;
      timers.forEach(clearTimeout);
      timers = [];
      stacca();
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
                /* dasharray e dashoffset li scrive la sequenza qui sopra,
                   direttamente sul nodo: messi anche qui, ogni render li
                   riporterebbe al valore iniziale a metà animazione */
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

function LinkedInIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
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
          {/* Nome e ruolo sono sempre leggibili; solo la descrizione
              si apre su hover / focus. */}
          <h4 className={styles.bdName}>{member.name}</h4>
          <p className={styles.bdRole}>{member.role}</p>
          <div className={styles.bdRevealBlock}>
            <p className={styles.bdDescription}>{member.description}</p>
          </div>
        </div>

        {/* "#" è il segnaposto di content: meglio nessun pulsante che un
            pulsante che non porta da nessuna parte */}
        {member.linkedin && member.linkedin !== "#" && (
          <a
            className={styles.bdLinkedin}
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Profilo LinkedIn di ${member.name}`}
          >
            <LinkedInIcon />
          </a>
        )}
      </article>
    </Reveal>
  );
}

/**
 * Board foto-first: cinque ritratti verticali dello stesso peso, disposti
 * su due quote alternate come le card del Team. Tutti visibili.
 * Stato base: foto + nome + ruolo, sempre leggibili. Su hover / focus
 * (e sempre su touch, dove l'hover non esiste) si aggiunge la descrizione.
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
                <Reveal className={styles.uiGroupHead}>
                  <h3 className={styles.uiGroupLabel}>{group.label}</h3>
                  {group.description && (
                    <p className={styles.uiGroupDescription}>{group.description}</p>
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

    </section>
  );
}

/* ===================== Network ===================== */

/**
 * I tre livelli di appartenenza come passi numerati accanto a una mappa
 * d'Europa, dentro una pillola rosa che esce dal filo sinistro della
 * pagina e si chiude a semicerchio a destra.
 *
 * Testo e mappa stanno nella stessa riga: l'intestazione di sezione è
 * sopra i passi, nella colonna di sinistra, così la pillola contiene
 * tutta la sezione invece di ereditare un titolo che le sta sopra.
 *
 * La mappa è ritagliata in un cerchio bianco e fatta di tre immagini
 * sovrapposte: la base grigia sta sempre sotto, il livello Italia e il
 * livello Europa si accendono a turno. Sopra, tre segnaposto — la goccia
 * di JEVE su Venezia e i due dischi con i marchi JE Italy e JE Europe —
 * compaiono in sincrono con il passo corrispondente.
 *
 * Il ciclo è in CSS puro, 12 secondi, e parte in pausa: `isPlaying`
 * arriva quando la sezione entra in vista, così tutte le animazioni
 * scattano insieme dall'inizio esatto del ciclo invece di trovarsi già
 * a metà.
 */
function Network() {
  const innerRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;

    if (!("IntersectionObserver" in window)) {
      setPlaying(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setPlaying(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  /* i marchi dei tre livelli, presi dall'anagrafica: i file stanno in
     public/network/ e sono già nel progetto */
  const logo = (id: string) =>
    networkLayers.find((layer) => layer.id === id)?.logo ?? "";

  return (
    <section className={styles.globeSection} aria-label="Network e credibilità">
      <div className="container">
        {/* Fondo della pillola: livello a sé, in assoluto, così il
            contenuto resta allineato al `container` come in tutte le
            altre sezioni mentre lo sfondo sfonda a sinistra. */}
        <div className={styles.globePillBg} aria-hidden="true" />

        <div
          ref={innerRef}
          className={`${styles.globeInner} ${playing ? styles.isPlaying : ""}`}
        >
          <div className={styles.globeTextCol}>
            <SectionHeader
              eyebrow={network.eyebrow}
              title={network.title}
              intro={network.intro}
            />

            <ol className={styles.globeStepList}>
              {networkLayers.map((layer, i) => (
                <li
                  key={layer.id}
                  className={`${styles.globeStepRow} ${
                    styles[`globeStepRow_${i + 1}`]
                  }`}
                >
                  <span className={styles.globeStepNum}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className={styles.globeStepCopy}>
                    {/* il luogo e, accanto, il nome della Junior
                        Enterprise di quel livello: `name` esisteva già
                        nell'anagrafica ma non finiva in pagina */}
                    <span className={styles.globeStepEyebrow}>
                      {layer.tier}
                      <span className={styles.globeStepName}>
                        {layer.name}
                      </span>
                    </span>
                    <h3 className={styles.globeStepTitle}>{layer.scope}</h3>
                    <p className={styles.globeStepBody}>{layer.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className={styles.globeMapCol}>
            <div className={styles.globeCircle}>
              {/* la base porta il testo alternativo: gli altri due strati
                  sono la stessa mappa colorata, ridirla sarebbe rumore */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className={`${styles.euMapImg} ${styles.euMapBase}`}
                src={networkMap.base}
                alt={networkMap.alt}
                loading="lazy"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className={`${styles.euMapImg} ${styles.euMapItaly}`}
                src={networkMap.italy}
                alt=""
                aria-hidden="true"
                loading="lazy"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className={`${styles.euMapImg} ${styles.euMapEurope}`}
                src={networkMap.europe}
                alt=""
                aria-hidden="true"
                loading="lazy"
              />

              {/* Venezia: anello che pulsa, bagliore, punto — e sopra la
                  goccia con il marchio. Le percentuali sono riferite al
                  cerchio, non alla mappa: restano valide a ogni misura. */}
              <div
                className={`${styles.mapPin} ${styles.mapPinJeve}`}
                style={{ left: "56%", top: "67.51%" }}
              >
                <span className={styles.mapPinRing} aria-hidden="true" />
                <span className={styles.mapPinGlow} aria-hidden="true" />
                <span className={styles.mapPinDot} aria-hidden="true" />
                <div className={styles.mapPinFlag} aria-hidden="true">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className={styles.mapPinFlagLogo}
                    src={logo("jeve")}
                    alt=""
                  />
                </div>
              </div>

              {/* i due livelli sopra: disco bianco con il marchio, niente
                  goccia — non indicano un punto ma un'area */}
              <div
                className={`${styles.mapLogoBadge} ${styles.mapLogoBadgeItaly}`}
                style={{ left: "38%", top: "78%" }}
                aria-hidden="true"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={logo("italy")} alt="" />
              </div>

              <div
                className={`${styles.mapLogoBadge} ${styles.mapLogoBadgeEurope}`}
                style={{ left: "68%", top: "35%" }}
                aria-hidden="true"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={logo("europe")} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===================== Alumni ===================== */

/**
 * Le voci di chi è passato da JEVE, in un carosello: una alla volta.
 * Il riquadro tiene il ritratto a sinistra e, a destra, la citazione con
 * la firma sotto; le frecce stanno ai lati, fuori dal riquadro, e i
 * pallini sotto. Il pannello rosso col titolo "Cosa dicono di noi" non
 * c'è più: ripeteva l'intestazione di sezione qui sopra.
 *
 * Ha preso il posto della sezione "Impatto": i quattro indicatori, il
 * selettore d'anno e il conteggio animato non ci sono più. I numeri
 * restano in content/chiSiamo.ts, segnalati come non più in pagina.
 */
function Alumni() {
  /* Carosello: una voce alla volta, in orizzontale */
  const [voice, setVoice] = useState(0);
  const totale = testimonials.length;
  const vaiA = (i: number) => setVoice(((i % totale) + totale) % totale);

  return (
    <section className={styles.imSection} aria-label="Alumni">
      <div className="container">
        <SectionHeader
          eyebrow={sections.alumni.eyebrow}
          title={sections.alumni.title}
          intro={sections.alumni.intro}
        />

        {testimonials.length > 0 && (
          <div className={styles.imVoicesWrap}>
            <div className={styles.imVoicesCard}>
              {/* il nastro scorre di una larghezza per volta: le voci
                  accanto restano fuori dal riquadro, non sbirciano */}
              <div
                className={styles.imVoices}
                role="region"
                aria-label={sections.alumni.voices.kicker}
              >
                <div
                  className={styles.imVoiceTrack}
                  style={{ transform: `translateX(-${voice * 100}%)` }}
                >
                  {testimonials.map((item, i) => (
                    /* `figcaption` deve stare in testa o in coda a
                       `figure`: qui è in coda, perché la firma si legge
                       DOPO la citazione. */
                    <figure
                      key={item.quote}
                      className={styles.imVoice}
                      aria-hidden={i !== voice || undefined}
                    >
                      {/* Il ritratto è figlio diretto della `figure`, non
                          della `figcaption`: la griglia lo mette nella
                          prima colonna e glielo fa occupare per intero,
                          senza bisogno di un contenitore in mezzo. */}
                      {item.avatar ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          className={styles.imAvatar}
                          src={item.avatar}
                          alt=""
                        />
                      ) : (
                        <span className={styles.imAvatarWait} aria-hidden="true">
                          {initials(item.name.replace(/[«»]/g, ""))}
                        </span>
                      )}

                      <blockquote className={styles.imQuote}>
                        {item.quote}
                      </blockquote>

                      <figcaption className={styles.imVoiceInner}>
                        <span className={styles.imName}>{item.name}</span>
                        <span className={styles.imRole}>{item.role}</span>
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            </div>

            {/* I comandi stanno fuori dal riquadro e sono figli diretti
                della griglia: su schermo largo le frecce si aprono ai
                due lati della card, sotto tornano in fila con i pallini.
                Con una sola voce non servono e spariscono. */}
            {totale > 1 && (
              <>
                <button
                  type="button"
                  className={`${styles.imVoiceArrow} ${styles.imVoiceArrowPrev}`}
                  aria-label="Recensione precedente"
                  onClick={() => vaiA(voice - 1)}
                >
                  <svg viewBox="0 0 24 24">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>

                <button
                  type="button"
                  className={`${styles.imVoiceArrow} ${styles.imVoiceArrowNext}`}
                  aria-label="Recensione successiva"
                  onClick={() => vaiA(voice + 1)}
                >
                  <svg viewBox="0 0 24 24">
                    <path d="M9 6l6 6-6 6" />
                  </svg>
                </button>

                <div className={styles.imVoiceDots}>
                  {testimonials.map((item, i) => (
                    <button
                      key={item.quote}
                      type="button"
                      className={`${styles.imVoiceDot} ${
                        i === voice ? styles.imVoiceDotOn : ""
                      }`}
                      aria-label={`Recensione ${i + 1}`}
                      aria-pressed={i === voice}
                      onClick={() => vaiA(i)}
                    />
                  ))}
                </div>
              </>
            )}

            <div className={styles.imVoicesGlow} aria-hidden="true" />
          </div>
        )}
      </div>
    </section>
  );
}

/* ===================== Pagina ===================== */

/* Ordine di lettura: chi siamo → chi lo fa → perché → da quanto →
   con chi → chi guida → cosa abbiamo vinto → cosa ne è uscito. */
export default function ChiSiamo() {
  return (
    <main>
      <Hero />
      <Team />
      <MissionVision />
      <Timeline />
      <Network />
      <Board />
      <AreaLeads />
      <AwardsList />
      <Alumni />
    </main>
  );
}
