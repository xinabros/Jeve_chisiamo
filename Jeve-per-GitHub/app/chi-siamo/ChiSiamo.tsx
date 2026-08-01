"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import {
  awardCategories,
  awards,
  boardGroups,
  growthChart,
  hero,
  missionVision,
  network,
  sections,
  statsByYear,
  statsDefaultYear,
  statsYears,
  teamAreas,
  timeline,
  type Award,
  type BoardMember,
  type ManifestoBlock,
  type Metric,
  type StatsYear,
  type TeamArea,
  type TimelineEvent,
} from "@/content/chiSiamo";
import styles from "./ChiSiamo.module.css";

/* ==========================================================================
   Pagina "Chi Siamo" — tutte le sezioni in un unico componente.
   I contenuti stanno in content/chiSiamo.ts; gli stili in ChiSiamo.module.css,
   dove ogni classe è prefissata per sezione (ui/hero/mv/team/tl/bd/net/aw/st).
   ========================================================================== */

/* Mappe per le classi scelte a runtime: i nomi sono prefissati per
   sezione, quindi non si possono più comporre dinamicamente. */
const AW_SIZE = {
  tall: styles.awTall,
  wide: styles.awWide,
  regular: styles.awRegular,
} as const;

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
      {eyebrow && (
        <span className={styles.uiEyebrow}>
          <span className={styles.uiEyebrowDot} aria-hidden="true" />
          {eyebrow}
        </span>
      )}
      <h2 className={styles.uiTitle}>{title}</h2>
      {/* righello decorativo: si traccia quando l'intestazione entra */}
      <div className={styles.uiRule} aria-hidden="true" />
      {intro && <p className={styles.uiIntro}>{intro}</p>}
    </Reveal>
  );
}

/* ===================== Sfondo ambientale ===================== */

/** Avanzamento usato con prefers-reduced-motion: una composizione fissa,
 *  presa a metà pagina, invece di uno sfondo piatto. */
const AMBIENT_STATIC_PROGRESS = 0.35;

/** Oscillazioni complete dell'onda lungo l'intera pagina. Alzarlo rende
 *  l'ondulazione più fitta, abbassarlo più ampia e lenta. */
const WAVE_CYCLES = 1.5;

const TAU = Math.PI * 2;

/**
 * Scrive sul nodo dello sfondo l'avanzamento (`--p`) e le tre fasi dell'onda
 * (`--w1`…`--w3`), sfasate di 120°: è questo sfasamento a far propagare
 * l'ondulazione da un pattern all'altro invece di farli oscillare insieme.
 * Quattro scritture di stile su un solo elemento; tutto il resto è derivato
 * in CSS.
 */
function writeAmbient(el: HTMLElement, progress: number) {
  el.style.setProperty("--p", progress.toFixed(4));
  for (let i = 0; i < 3; i += 1) {
    const phase = (TAU * i) / 3;
    const value = Math.sin(progress * TAU * WAVE_CYCLES + phase);
    el.style.setProperty(`--w${i + 1}`, value.toFixed(4));
  }
}

/**
 * Strato ambientale fisso dietro tutta la pagina.
 *
 * Tutto il movimento nasce da UNA sola custom property (`--p`, avanzamento
 * 0→1 dello scroll) scritta su un unico nodo: il CSS ne deriva parallasse,
 * opacità e scala. Per frame si fa quindi una sola scrittura di stile, e le
 * proprietà animate sono solo transform/opacity — nessun layout, nessun
 * repaint del contenuto.
 *
 * Con prefers-reduced-motion non viene registrato alcun listener: lo sfondo
 * è presente ma immobile.
 */
function AmbientBackground() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      writeAmbient(el, AMBIENT_STATIC_PROGRESS);
      return;
    }

    let frame = 0;

    const update = () => {
      frame = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      writeAmbient(
        el,
        max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0
      );
    };

    /* il lavoro vero avviene una volta per frame, non a ogni evento */
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
  }, []);

  return (
    <div ref={ref} className={styles.bgLayer} aria-hidden="true">
      <div className={`${styles.bgOrb} ${styles.bgOrbA}`}>
        <span className={styles.bgOrbInner} />
      </div>
      <div className={`${styles.bgOrb} ${styles.bgOrbB}`}>
        <span className={styles.bgOrbInner} />
      </div>
      <div className={`${styles.bgOrb} ${styles.bgOrbC}`}>
        <span className={styles.bgOrbInner} />
      </div>
      <div className={`${styles.bgPattern} ${styles.bgPatternA}`}>
        <span className={styles.bgPatternArt} />
      </div>
      <div className={`${styles.bgPattern} ${styles.bgPatternB}`}>
        <span className={styles.bgPatternArt} />
      </div>
      <div className={`${styles.bgPattern} ${styles.bgPatternC}`}>
        <span className={styles.bgPatternArt} />
      </div>
      <div className={styles.bgVeil} />
    </div>
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
            <span className={styles.heroEyebrow}>
              <span className={styles.heroEyebrowDot} aria-hidden="true" />
              {hero.eyebrow}
            </span>
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
          <Reveal delay={240}>
            <ul className={styles.heroTags} aria-label="In sintesi">
              {hero.tags.map((tag) => (
                <li key={tag} className={styles.heroTag}>
                  {tag}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={200} className={styles.heroVisual}>
          {/* Segnaposto immagine: sostituire con <Image> definitiva */}
          <div className={styles.heroVisualFrame} role="img" aria-label="Immagine placeholder del team">
            <span className={styles.heroVisualLabel}>Immagine placeholder</span>
          </div>
          <div className={styles.heroVisualCard} aria-hidden="true">
            <span className={styles.heroVisualCardValue}>{hero.badge.value}</span>
            <span className={styles.heroVisualCardLabel}>{hero.badge.label}</span>
          </div>
          <div className={styles.heroVisualDots} aria-hidden="true" />
        </Reveal>
      </div>
    </section>
  );
}

/* ===================== MissionVision ===================== */

function Block({
  block,
  className,
  delay,
}: {
  block: ManifestoBlock;
  className: string;
  delay: number;
}) {
  return (
    <Reveal className={`${styles.mvCell} ${className}`} delay={delay}>
      <article className={`${styles.mvBlock} ${block.tone === "dark" ? styles.mvDark : styles.mvLight}`}>
        {/* parola chiave gigante in filigrana */}
        <span className={styles.mvKeyword} aria-hidden="true">
          {block.keyword}
        </span>
        {/* elemento grafico astratto */}
        <span className={styles.mvDeco} aria-hidden="true" />

        <div className={styles.mvContent}>
          <p className={styles.mvMeta}>
            <span className={styles.mvIndex}>{block.index}</span>
            <span className={styles.mvLabel}>{block.label}</span>
          </p>
          <h3 className={styles.mvTitle}>{block.title}</h3>
          <p className={styles.mvText}>{block.text}</p>
          <p className={styles.mvNote}>{block.note}</p>
        </div>
      </article>
    </Reveal>
  );
}

/**
 * Manifesto a doppio livello: Mission (il presente, blocco compatto e
 * chiaro) e Vision (il futuro, blocco ampio, scuro e sfalsato verso il
 * basso), chiusi da una frase-manifesto. Contenuti, keyword, numeri e tono
 * cromatico arrivano tutti da content/chiSiamo.ts.
 *
 * I blocchi entrano in sequenza riusando Reveal, che rispetta già
 * prefers-reduced-motion. Nessun contenuto è nascosto dietro l'hover: la
 * riga secondaria è sempre leggibile e si accende all'interazione.
 */
function MissionVision() {
  const { mission, vision, manifesto } = missionVision;

  return (
    <section className={styles.mvSection} aria-label="Mission e Vision">
      <div className="container">
        <SectionHeader
          eyebrow={sections.missionVision.eyebrow}
          title={sections.missionVision.title}
          intro={sections.missionVision.intro}
        />

        <div className={styles.mvBlocks}>
          <Block block={mission} className={styles.missionCell} delay={0} />
          <Block block={vision} className={styles.mvVisionCell} delay={150} />
        </div>

        <Reveal delay={260}>
          <figure className={styles.mvManifesto}>
            <span className={styles.mvBracket} aria-hidden="true" />
            <span className={styles.mvQuoteMark} aria-hidden="true">
              &ldquo;
            </span>
            <blockquote className={styles.mvQuote}>{manifesto.quote}</blockquote>
            <figcaption className={styles.mvAttribution}>
              {manifesto.attribution}
            </figcaption>
          </figure>
        </Reveal>
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

function AreaCard({ area, index }: { area: TeamArea; index: number }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <Reveal as="li" delay={index * 70} className={styles.teamCell}>
      <article className={`${styles.teamCard} ${open ? styles.teamCardOpen : ""}`}>
        {/* Visual placeholder: valorizza `photo` in content/chiSiamo.ts
            per sostituirlo con la fotografia reale. */}
        {area.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img className={styles.teamPhoto} src={area.photo} alt="" />
        ) : (
          <div
            className={`${styles.teamVisual} ${
              visualVariants[index % visualVariants.length]
            }`}
            aria-hidden="true"
          >
            <span className={styles.teamVisualTag}>Visual placeholder</span>
          </div>
        )}

        <div className={styles.teamScrim} aria-hidden="true" />

        <button
          type="button"
          className={styles.teamTrigger}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((value) => !value)}
        >
          <span className={styles.teamIndex} aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className={styles.teamBody}>
            <span className={styles.teamName}>{area.name}</span>
            <span className={styles.teamDescriptionWrap}>
              <span className={styles.teamDescription}>{area.description}</span>
            </span>
            <span className={styles.teamHint} aria-hidden="true">
              {open ? "Chiudi" : "Scopri di più"}
              <span className={styles.teamHintIcon}>{open ? "×" : "+"}</span>
            </span>
          </span>
        </button>

        <div id={panelId} className={styles.teamPanel}>
          <div className={styles.teamPanelInner}>
            <p className={styles.teamDetails}>{area.details}</p>
            <p className={styles.teamMembers}>
              <strong>{area.members}</strong> membri{" "}
              <span className={styles.teamMembersNote}>· dato da confermare</span>
            </p>
            <a className={styles.teamLink} href={area.href}>
              Approfondisci
              <span aria-hidden="true"> →</span>
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
    </section>
  );
}

/* ===================== Timeline ===================== */

/* La soglia oltre la quale la timeline diventa orizzontale (deve combaciare
   con la media query in Timeline.module.css). */
const DESKTOP_QUERY = "(min-width: 1024px)";

type StageProps = {
  event: TimelineEvent;
  index: number;
  active: boolean;
  reached: boolean;
  cardRef: (node: HTMLElement | null) => void;
};

function Stage({ event, index, active, reached, cardRef }: StageProps) {
  const major = event.importance === "major";
  /* le tappe si alternano sopra e sotto la linea */
  const below = index % 2 === 1;

  return (
    <li
      className={[
        styles.tlStage,
        major ? styles.tlMajor : "",
        below ? styles.tlBelow : "",
        active ? styles.tlStageActive : "",
      ]
        .filter(Boolean)
        .join(" ")}
      /* colonna esplicita (usata solo dal layout desktop): senza, l'auto
         placement eviterebbe la riga occupata dalla linea guida */
      style={{ "--col": index + 1 } as React.CSSProperties}
    >
      <Reveal className={styles.tlSlot} delay={index * 80}>
        <article className={styles.tlCard} ref={cardRef}>
          <p className={styles.tlYear}>{event.year}</p>
          <h3 className={styles.tlTitle}>{event.title}</h3>

          {major &&
            (event.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img className={styles.tlImage} src={event.image} alt="" />
            ) : (
              <div className={styles.tlImagePlaceholder} aria-hidden="true">
                <span>Visual placeholder</span>
              </div>
            ))}

          <p className={styles.tlDescription}>{event.description}</p>

          <div className={styles.tlDetailWrap}>
            <p className={styles.tlDetail}>{event.detail}</p>
          </div>
        </article>
      </Reveal>

      <span
        className={`${styles.tlMarker} ${reached ? styles.tlMarkerReached : ""}`}
        aria-hidden="true"
      >
        <span className={styles.tlMarkerDot} />
      </span>
    </li>
  );
}

/**
 * Timeline narrativa e riutilizzabile: legge gli eventi dai dati, li ordina
 * dal più recente al meno recente e alterna le card sopra e sotto la linea.
 * Aggiungere, togliere o riordinare una tappa non richiede modifiche qui.
 *
 * Su desktop è orizzontale, su mobile diventa verticale con linea laterale.
 * Durante lo scroll il tratto percorso si riempie, i marker si attivano e la
 * tappa corrente riceve una lieve enfasi. Con prefers-reduced-motion la
 * linea è già completa e non viene animato nulla.
 */
function Timeline() {
  const events = [...timeline].sort((a, b) => b.year - a.year);

  const trackRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLElement | null)[]>([]);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduced) {
      setProgress(1);
      setActive(-1);
      return;
    }

    const desktopQuery = window.matchMedia(DESKTOP_QUERY);
    let frame = 0;

    const update = () => {
      frame = 0;
      const track = trackRef.current;
      if (!track) return;

      const rect = track.getBoundingClientRect();
      const viewport = window.innerHeight;

      /* la linea si riempie mentre la sezione attraversa il viewport */
      const from = viewport * 0.9;
      const to = viewport * 0.35;
      const ratio = (from - rect.top) / (from - to);
      const next = Math.min(Math.max(ratio, 0), 1);
      setProgress(next);

      if (desktopQuery.matches) {
        /* orizzontale: la tappa attiva è quella raggiunta dal tratto */
        setActive(Math.round(next * (events.length - 1)));
      } else {
        /* verticale: la tappa attiva è la più vicina al centro del viewport */
        let closest = 0;
        let smallest = Infinity;
        cardsRef.current.forEach((node, i) => {
          if (!node) return;
          const box = node.getBoundingClientRect();
          const distance = Math.abs(box.top + box.height / 2 - viewport / 2);
          if (distance < smallest) {
            smallest = distance;
            closest = i;
          }
        });
        setActive(closest);
      }
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
  }, [events.length]);

  return (
    <section className={styles.tlSection} aria-label="La nostra storia">
      <div className="container">
        <SectionHeader
          eyebrow={sections.timeline.eyebrow}
          title={sections.timeline.title}
        />

        <div
          ref={trackRef}
          className={styles.tlTrack}
          style={{ "--progress": progress } as React.CSSProperties}
        >
          {/* linea verticale: usata solo nel layout mobile */}
          <div className={styles.tlAxis} aria-hidden="true">
            <div className={styles.tlAxisProgress} />
          </div>

          <ol
            className={styles.tlStages}
            /* le colonne nascono dai dati: gli snodi principali pesano di
               più, e aggiungere una tappa ricompone la griglia da sola */
            style={
              {
                "--cols": events
                  .map((event) =>
                    event.importance === "major" ? "1.45fr" : "1fr"
                  )
                  .join(" "),
              } as React.CSSProperties
            }
          >
            {events.map((event, i) => (
              <Stage
                key={event.year}
                event={event}
                index={i}
                active={i === active}
                reached={
                  events.length < 2 || progress >= i / (events.length - 1)
                }
                cardRef={(node) => {
                  cardsRef.current[i] = node;
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
    </section>
  );
}

/* ===================== Network ===================== */

/**
 * Network & credibilità: banda scura con diagramma di connessione
 * Jeve ↔ JE Italy ↔ JE Europe. Loghi come segnaposto tratteggiati.
 */
function Network() {
  return (
    <section className={styles.netSection} aria-label="Network e credibilità">
      <div className="container">
        <SectionHeader
          eyebrow={network.eyebrow}
          title={network.title}
          intro={network.intro}
          tone="dark"
          align="center"
        />

        <Reveal className={styles.netDiagram}>
          <div className={styles.netHub}>
            <span className={styles.netHubMark} aria-hidden="true">
              J
            </span>
            <span className={styles.netHubLabel}>Jeve</span>
          </div>
          <div className={styles.netConnector} aria-hidden="true" />
          <ul className={styles.netPartners}>
            {network.partners.map((partner) => (
              <li key={partner.name} className={styles.netPartnerCell}>
                <a className={styles.netPartner} href={partner.href}>
                  {/* Segnaposto logo: sostituire con l'immagine ufficiale */}
                  <span className={styles.netLogo} aria-hidden="true">
                    Logo
                  </span>
                  <span className={styles.netPartnerName}>{partner.name}</span>
                  <span className={styles.netPartnerTagline}>{partner.tagline}</span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={150}>
          <ul className={styles.netBadges} aria-label="Riconoscimenti di rete (placeholder)">
            {network.badges.map((badge) => (
              <li key={badge} className={styles.netBadge}>
                <span className={styles.netBadgeDot} aria-hidden="true" />
                {badge}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

/* ===================== Awards ===================== */

/* Oltre questa soglia i premi in eccedenza finiscono dietro il controllo
   "Mostra altri riconoscimenti". I primi restano sempre tutti visibili. */
const VISIBLE_LIMIT = 6;

/* Ritmo delle card secondarie: si ripete ciclicamente, così aggiungere o
   togliere premi mantiene una composizione controllata (mai casuale).
   Con la principale 2×2, questa sequenza tassella esattamente la griglia
   desktop a 5 colonne: 4 + 2 + 2 + 1 + 1 = 10 celle. */
const SIZE_CYCLE = ["tall", "wide", "regular", "regular"] as const;

function TrophyIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4z" />
      <path d="M7 6H4a1 1 0 0 0-1 1c0 2 1.5 3.5 4 3.8M17 6h3a1 1 0 0 1 1 1c0 2-1.5 3.5-4 3.8" />
    </svg>
  );
}

function AwardCard({
  award,
  index,
  beyondLimit,
}: {
  award: Award;
  index: number;
  beyondLimit: boolean;
}) {
  const featured = index === 0;
  const size = featured
    ? styles.awFeatured
    : AW_SIZE[SIZE_CYCLE[(index - 1) % SIZE_CYCLE.length]];
  const categoryIndex = awardCategories.indexOf(award.category);

  return (
    <Reveal
      as="li"
      delay={index * 60}
      className={`${styles.awCell} ${size} ${beyondLimit ? styles.awExtra : ""}`}
      /* usato dai filtri CSS per nascondere le altre categorie */
      data-category={categoryIndex}
    >
      {/* tabIndex: dà anche a chi naviga da tastiera l'apertura della
          descrizione, identica a quella dell'hover */}
      <article className={styles.awCard} tabIndex={0}>
        {featured &&
          (award.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img className={styles.awImage} src={award.image} alt="" />
          ) : (
            <div className={styles.awImagePlaceholder} aria-hidden="true">
              <TrophyIcon className={styles.awImageTrophy} />
              <span>Immagine placeholder</span>
            </div>
          ))}

        <div className={styles.awTop}>
          <span className={styles.awYear}>{award.year}</span>
          {!featured && (
            <span className={styles.awBadge} aria-hidden="true">
              <TrophyIcon />
            </span>
          )}
        </div>

        <h3 className={styles.awTitle}>{award.title}</h3>
        <p className={styles.awOrg}>{award.org}</p>

        <div className={styles.awDescriptionWrap}>
          <p className={styles.awDescription}>{award.description}</p>
        </div>

        <p className={styles.awCategory}>{award.category}</p>
      </article>
    </Reveal>
  );
}

/**
 * Bacheca "hall of fame": composizione bento con una card principale e
 * secondarie di dimensioni diverse. Ordina sempre per anno decrescente e
 * porta in testa il premio con `featured: true`.
 *
 * Filtri per categoria e controllo "mostra altri" sono realizzati in CSS
 * puro (radio + checkbox + :has), quindi funzionano anche senza JavaScript:
 * questo resta un server component.
 */
function Awards() {
  const sorted = [...awards].sort((a, b) => b.year - a.year);
  const featured = sorted.find((award) => award.featured) ?? sorted[0];
  const ordered = [featured, ...sorted.filter((award) => award !== featured)];

  /* solo le categorie effettivamente presenti diventano un filtro */
  const usedCategories = awardCategories.filter((category) =>
    ordered.some((award) => award.category === category)
  );
  const hasMore = ordered.length > VISIBLE_LIMIT;

  return (
    <section className={styles.awSection} aria-label="Premi e riconoscimenti">
      <div className="container">
        <div className={styles.awHead}>
          <SectionHeader
            eyebrow={sections.awards.eyebrow}
            title={sections.awards.title}
            intro={sections.awards.intro}
          />

          <Reveal className={styles.awFilters}>
            <div role="group" aria-label="Filtra per categoria">
              <input
                type="radio"
                name="award-filter"
                id="award-filter-all"
                className={`${styles.awFilterInput} ${styles.awFilterAll}`}
                defaultChecked
              />
              <label htmlFor="award-filter-all" className={styles.awChip}>
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
                      className={`${styles.awFilterInput} ${styles[`awF${i}`]}`}
                    />
                    <label
                      htmlFor={`award-filter-${i}`}
                      className={styles.awChip}
                    >
                      {category}
                    </label>
                  </span>
                );
              })}
            </div>
          </Reveal>
        </div>

        <ul className={styles.awBoard}>
          {ordered.map((award, i) => (
            <AwardCard
              key={`${award.year}-${award.title}`}
              award={award}
              index={i}
              beyondLimit={i >= VISIBLE_LIMIT}
            />
          ))}
        </ul>

        {hasMore && (
          <div className={styles.awMoreRow}>
            <input
              type="checkbox"
              id="award-show-more"
              className={styles.awMoreInput}
            />
            <label htmlFor="award-show-more" className={styles.awMoreButton}>
              <span className={styles.awMoreLabel}>
                Mostra altri riconoscimenti
              </span>
              <span className={styles.awLessLabel}>Mostra meno</span>
            </label>
          </div>
        )}
      </div>
    </section>
  );
}

/* ===================== Stats ===================== */

/* --- utilità ------------------------------------------------------------- */

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);
    const onChange = () => setReduced(query.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

/**
 * Conta fino a `target` quando la sezione entra nel viewport. Al cambio anno
 * riparte dal valore corrente invece che da zero, così la transizione resta
 * morbida. Con prefers-reduced-motion il valore viene impostato subito.
 */
function useCountUp(target: number, active: boolean) {
  const [display, setDisplay] = useState(target);
  const currentRef = useRef(target);
  const hasRunRef = useRef(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    // Finché la sezione non è entrata nel viewport (o con motion ridotto)
    // il valore resta sempre quello reale: niente conteggio, niente numeri
    // fermi su un anno precedente.
    if (!active) {
      currentRef.current = target;
      setDisplay(target);
      return;
    }

    if (reduced) {
      currentRef.current = target;
      hasRunRef.current = true;
      setDisplay(target);
      return;
    }

    const from = hasRunRef.current ? currentRef.current : 0;
    hasRunRef.current = true;

    const duration = 900;
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const next = Math.round(from + (target - from) * eased);
      currentRef.current = next;
      setDisplay(next);
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, target, reduced]);

  return display;
}

/* --- Colonne della metrica principale ------------------------------------ */

const STAT_COLUMNS = [
  styles.stColumn1,
  styles.stColumn2,
  styles.stColumn3,
] as const;

/**
 * Tre barre del kit di brand che salgono in sequenza dal fondo della card.
 * Montato con `key={year}` dal chiamante: al cambio d'anno il componente
 * riparte da capo, così le colonne si rialzano insieme al nuovo numero.
 */
function StatColumns({ active }: { active: boolean }) {
  return (
    <div className={styles.stColumns} aria-hidden="true">
      {STAT_COLUMNS.map((column, i) => (
        <span
          key={i}
          className={`${styles.stColumn} ${column} ${
            active ? styles.stColumnUp : ""
          }`}
        />
      ))}
    </div>
  );
}

function AnimatedValue({
  metric,
  active,
}: {
  metric: Metric;
  active: boolean;
}) {
  const display = useCountUp(metric.value, active);

  return (
    <>
      {display}
      {metric.suffix && <span className={styles.stSuffix}>{metric.suffix}</span>}
    </>
  );
}

/* --- Mini visualizzazione dell'andamento --------------------------------- */

function GrowthChart() {
  const { series, caption } = growthChart;
  if (series.length < 2) return null;

  const width = 320;
  const height = 96;
  const padY = 10;
  const max = Math.max(...series.map((point) => point.value));
  const min = Math.min(...series.map((point) => point.value));
  const span = max - min || 1;

  const points = series.map((point, i) => ({
    ...point,
    x: (i / (series.length - 1)) * width,
    y: height - padY - ((point.value - min) / span) * (height - padY * 2),
  }));

  const line = points
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(" ");
  const area = `${line} L${width} ${height} L0 ${height} Z`;
  const last = points[points.length - 1];

  return (
    <figure className={styles.stChart}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className={styles.stChartSvg}
        role="img"
        aria-label={`Andamento dal ${series[0].year} al ${last.year}: da ${series[0].value} a ${last.value}.`}
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="statsGrowthFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--c-primary)" stopOpacity="0.22" />
            <stop offset="100%" stopColor="var(--c-primary)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={area} fill="url(#statsGrowthFill)" />
        <path
          d={line}
          fill="none"
          stroke="var(--c-primary)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
        <circle cx={last.x} cy={last.y} r="3.5" fill="var(--c-primary)" />
      </svg>
      <div className={styles.stChartAxis} aria-hidden="true">
        <span>{series[0].year}</span>
        <span>{last.year}</span>
      </div>
      <figcaption className={styles.stChartCaption}>{caption}</figcaption>
    </figure>
  );
}

/* --- Sezione ------------------------------------------------------------- */

function Stats() {
  const [year, setYear] = useState<StatsYear>(statsDefaultYear);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        });
      },
      // rootMargin invece di threshold: resta affidabile anche quando la
      // sezione è più alta del viewport.
      { rootMargin: "0px 0px -12% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const { main, metrics } = statsByYear[year];

  return (
    <section
      ref={sectionRef}
      className={styles.stSection}
      aria-label="Statistiche e impatto"
    >
      <div className="container">
        <div className={styles.stHead}>
          <SectionHeader
            eyebrow={sections.stats.eyebrow}
            title={sections.stats.title}
            intro={sections.stats.intro}
          />
          <Reveal className={styles.stYears}>
            <div
              className={styles.stYearsInner}
              role="group"
              aria-label="Anno di riferimento"
            >
              {statsYears.map((option) => (
                <button
                  key={option}
                  type="button"
                  className={styles.stYearButton}
                  aria-pressed={option === year}
                  onClick={() => setYear(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <div className={styles.stLayout}>
          {/* Livello 1 — metrica principale */}
          <Reveal className={styles.stMainCell}>
            <article className={styles.stMain}>
              <StatColumns key={year} active={inView} />
              <p className={styles.stMainValue}>
                <AnimatedValue metric={main} active={inView} />
              </p>
              <h3 className={styles.stMainLabel}>{main.label}</h3>
              <p className={styles.stMainContext}>{main.context}</p>
            </article>
          </Reveal>

          {/* Mini visualizzazione (rimovibile: svuota growthChart.series) */}
          <Reveal delay={90} className={styles.stChartCell}>
            <GrowthChart />
          </Reveal>
        </div>

        {/* Livello 2 — metriche secondarie */}
        <ul className={styles.stGrid}>
          {metrics.map((metric, i) => (
            <Reveal key={metric.label} as="li" delay={i * 60} className={styles.stCell}>
              <div className={styles.stCard}>
                <p className={styles.stValue}>
                  <AnimatedValue metric={metric} active={inView} />
                </p>
                <p className={styles.stLabel}>{metric.label}</p>
                <p className={styles.stContext}>{metric.context}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ===================== Pagina ===================== */

export default function ChiSiamo() {
  return (
    <main>
      <AmbientBackground />
      <Hero />
      <MissionVision />
      <Team />
      <Timeline />
      <Board />
      <Network />
      <Awards />
      <Stats />
    </main>
  );
}
