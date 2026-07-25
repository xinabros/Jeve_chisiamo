/* ==========================================================================
   Chi Siamo — CONTENT
   --------------------------------------------------------------------------
   ⚑ QUESTO È L'UNICO FILE DA MODIFICARE per aggiornare i contenuti.
   Dati reali ricavati da jeve.it (novembre 2025 → luglio 2026).
   Ciò che manca è ancora tra «...» o segnato "da confermare":
   – numero di membri per area
   – ente esatto che assegna i premi (indicato come Excellence Awards)
   – foto del Board (`photo`) e loghi JE Italy / JEurope
   ========================================================================== */

/* --- 1 · Hero ---------------------------------------------------------- */

export const hero = {
  eyebrow: "Chi siamo",
  /* `accent` viene evidenziata in rosso dentro il titolo */
  title: "La Junior Enterprise di",
  accent: "Ca' Foscari Venezia",
  lead: "JEVE è l'associazione studentesca che opera come una vera società di consulenza: studenti di Ca' Foscari, IUAV e IUSVE affiancano aziende e organizzazioni del territorio con progetti di business analysis, marketing, sales e IT. Dal 2019 trasformiamo le competenze in risultati concreti.",
  tags: ["Fondata nel 2019", "Ca' Foscari · IUAV · IUSVE", "Venezia"],
  /* card flottante sul visual */
  badge: { value: "2019", label: "anno di fondazione" },
};

/* --- Titoli di sezione -------------------------------------------------- */

export const sections = {
  missionVision: {
    eyebrow: "La direzione",
    title: "Mission & Vision",
    intro:
      "«Breve testo placeholder che collega la presentazione dell'associazione ai suoi valori e alla direzione che ha scelto di prendere.»",
  },
  team: {
    eyebrow: "Il team",
    title: "Cinque aree, un unico team",
    intro:
      "Il team di JEVE riunisce studenti di Ca' Foscari, IUAV e IUSVE, organizzati in cinque aree operative coordinate dal Board. L'ingresso avviene tramite i due recruitment annuali, spring e autumn.",
  },
  timeline: {
    eyebrow: "La storia",
    title: "La nostra storia",
  },
  board: {
    eyebrow: "Organigramma",
    title: "Il Board",
    intro:
      "Il Board guida l'associazione e coordina le cinque aree operative: Sales & BD, Marketing, HR, Business Analysis e IT.",
  },
  awards: {
    eyebrow: "Premi",
    title: "Premi e riconoscimenti",
    intro: "Riconoscimenti dell'impegno e della dedizione costanti.",
  },
  stats: {
    eyebrow: "Impatto",
    title: "Numeri che raccontano il nostro impatto",
    intro:
      "«Breve testo placeholder: una frase su come misuriamo la crescita dell'associazione.»",
  },
};

/* --- 1 · Mission & Vision — manifesto (testi reali da jeve.it) ----------- */
/* Ogni blocco ha una propria identità: numero progressivo, etichetta,
   parola chiave gigante sullo sfondo e tono cromatico.
   – `tone: "light"` → blocco compatto su fondo chiaro (il presente)
   – `tone: "dark"`  → blocco ampio e immersivo su fondo scuro (il futuro)
   `note` è una riga descrittiva secondaria: resta sempre leggibile e si
   accende su hover/focus. */

export type ManifestoBlock = {
  index: string;
  label: string;
  /** parola chiave gigante in filigrana */
  keyword: string;
  title: string;
  text: string;
  note: string;
  tone: "light" | "dark";
};

export const missionVision: {
  mission: ManifestoBlock;
  vision: ManifestoBlock;
  manifesto: { quote: string; attribution: string };
} = {
  mission: {
    index: "01",
    label: "Ciò che facciamo oggi",
    keyword: "OGGI",
    title: "Mission",
    text: "Formare gli studenti attraverso il lavoro di squadra e l'esperienza pratica, grazie al coinvolgimento in una realtà organizzata in cui gli ostacoli non sono limiti ma opportunità.",
    note: "«Riga placeholder: un dettaglio in più su come lo facciamo ogni giorno.»",
    tone: "light",
  },
  vision: {
    index: "02",
    label: "L'orizzonte che costruiamo",
    keyword: "DOMANI",
    title: "Vision",
    text: "Concretizzare passione, entusiasmo e curiosità degli studenti più intraprendenti per renderli protagonisti del proprio futuro.",
    note: "«Riga placeholder: l'impatto che vogliamo generare nel lungo periodo.»",
    tone: "dark",
  },
  manifesto: {
    quote:
      "«Frase-manifesto placeholder: una riga breve e memorabile che riassume l'identità dell'associazione.»",
    attribution: "«Attribuzione placeholder»",
  },
};

/* --- 1 · Team (le 5 aree reali dell'organigramma) ------------------------ */
/* Composizione "bento": `emphasis` decide il peso della card nel mosaico.
   – "hero"    → riquadro grande (2 colonne × 2 righe su desktop)
   – "wide"    → riquadro largo (3 colonne)
   – "regular" → riquadro compatto (1 colonna)
   Cambiando `emphasis` si ricompone il mosaico senza toccare il CSS.
   `members` è indicativo (dato non pubblicato sul sito): aggiorna i numeri.
   `photo`: valorizzalo (es. "/team/business-analysis.jpg") per sostituire
   il visual placeholder con l'immagine reale. */

export type TeamArea = {
  name: string;
  /** riga breve, compare su hover/focus */
  description: string;
  /** testo esteso, compare nel pannello al click */
  details: string;
  /** numero indicativo di membri (da confermare) */
  members: number;
  /** link di approfondimento ("#" = placeholder) */
  href: string;
  photo?: string;
  emphasis?: "hero" | "wide" | "regular";
};

export const teamAreas: TeamArea[] = [
  {
    name: "Business Analysis",
    description:
      "Mappatura dei processi, business plan, analisi di mercato e data analytics.",
    details:
      "«Dettaglio placeholder: come lavora l'area, quali progetti segue e quali strumenti utilizza nel percorso con il cliente.»",
    members: 8,
    href: "#",
    emphasis: "hero",
  },
  {
    name: "Marketing",
    description:
      "Marketing plan, campagne, gestione social e creazione di brand identity.",
    details:
      "«Dettaglio placeholder: come nasce un piano editoriale, dalla definizione degli obiettivi ai contenuti pubblicati.»",
    members: 8,
    href: "#",
    emphasis: "wide",
  },
  {
    name: "Sales & BD",
    description:
      "Lead generation e sviluppo commerciale verso aziende e organizzazioni.",
    details:
      "«Dettaglio placeholder: come individuiamo e coltiviamo i contatti interessati ai servizi dei clienti.»",
    members: 6,
    href: "#",
    emphasis: "regular",
  },
  {
    name: "IT",
    description:
      "Sviluppo di siti web e tracking dei dati con Google Analytics.",
    details:
      "«Dettaglio placeholder: dallo sviluppo del sito alla misurazione del traffico e dei risultati online.»",
    members: 6,
    href: "#",
    emphasis: "regular",
  },
  {
    name: "HR",
    description:
      "Selezione, formazione e crescita delle persone dell'associazione.",
    details:
      "«Dettaglio placeholder: come organizziamo i due recruitment annuali e accompagniamo i nuovi membri.»",
    members: 5,
    href: "#",
    emphasis: "regular",
  },
];

/* --- 1 · Timeline (eventi reali) ----------------------------------------- */
/* Inserisci gli eventi in QUALSIASI ordine: la timeline li ordina dal più
   recente al meno recente e ricompone da sola il layout. Aggiungere,
   rimuovere o riordinare una tappa non richiede modifiche al componente.
   – `importance: "major"` → snodo in evidenza: card più ampia, anno in
     grande formato e visual placeholder.
   – `image` → valorizzalo (es. "/storia/2025.jpg") per sostituire il
     visual placeholder con l'immagine reale. */

export type TimelineEvent = {
  year: number;
  title: string;
  description: string;
  /** dettaglio extra, compare su hover/focus */
  detail: string;
  image?: string;
  importance?: "major" | "regular";
};

export const timeline: TimelineEvent[] = [
  {
    year: 2025,
    title: "Excellence Awards di Torino",
    description:
      "Doppio riconoscimento agli Excellence Awards durante il JEIMM di Torino.",
    detail:
      "«Dettaglio placeholder: i premi “Shared Growth” e “Best Junior Enterprise” vinti nella stessa edizione.»",
    importance: "major",
  },
  {
    year: 2024,
    title: "Premio “Shared Growth”",
    description:
      "Riconosciuta la capacità di generare crescita condivisa tra imprese e studenti.",
    detail:
      "«Dettaglio placeholder: le collaborazioni sostenibili avviate nell'anno.»",
  },
  {
    year: 2023,
    title: "Premio “Sustainable Development”",
    description:
      "Premiato l'impegno su progetti sostenibili e responsabilità ambientale.",
    detail:
      "«Dettaglio placeholder: i progetti a impatto ambientale seguiti dall'associazione.»",
  },
  {
    year: 2020,
    title: "Premio “Best Junior Initiative”",
    description:
      "A un anno dalla fondazione arriva il primo riconoscimento del network.",
    detail:
      "«Dettaglio placeholder: innovazione, impatto e qualità nella gestione dei primi progetti.»",
  },
  {
    year: 2019,
    title: "Nasce JEVE",
    description:
      "Nasce la Junior Enterprise Ca' Foscari di Venezia: studenti che fanno consulenza.",
    detail:
      "«Dettaglio placeholder: i fondatori, l'idea di partenza e i primi clienti del territorio.»",
    importance: "major",
  },
];

/* --- 2 · Organigramma & Board -------------------------------------------- */
/* Board in carica (2026). Per la foto reale valorizza `photo`
   (es. "/team/marcello-siviero.jpg"); finché è assente viene mostrato
   un avatar con le iniziali. */

export type BoardMember = {
  name: string;
  role: string;
  /** breve descrizione di ciò di cui si occupa (compare su hover/focus) */
  description: string;
  linkedin: string; // "#" = placeholder
  photo?: string;
};

export type BoardGroup = {
  label: string;
  description?: string;
  members: BoardMember[];
};

export const boardGroups: BoardGroup[] = [
  {
    label: "Board",
    description: "I cinque membri che guidano JEVE.",
    members: [
      {
        name: "Marcello Siviero",
        role: "Presidente",
        description:
          "«Descrizione placeholder: guida la strategia dell'associazione e i rapporti con partner e istituzioni.»",
        linkedin: "https://www.linkedin.com/in/marcello-siviero-598544250",
      },
      {
        name: "Luca Presti",
        role: "Vice Presidente",
        description:
          "«Descrizione placeholder: affianca la presidenza e coordina le attività delle aree operative.»",
        linkedin: "https://www.linkedin.com/in/lucapresti",
      },
      {
        name: "Riccardo Mari",
        role: "Tesoriere",
        description:
          "«Descrizione placeholder: gestisce bilancio, amministrazione e sostenibilità economica dei progetti.»",
        linkedin: "https://www.linkedin.com/in/riccardomari",
      },
      {
        name: "Lidia Carniello",
        role: "International Manager",
        description:
          "«Descrizione placeholder: cura le relazioni con il network internazionale delle Junior Enterprise.»",
        linkedin: "https://www.linkedin.com/in/lidia-carniello-b4671326a",
      },
      {
        name: "Eleonora Rizzato",
        role: "Direttrice e Segretaria Generale",
        description:
          "«Descrizione placeholder: presidia processi interni, documentazione e vita associativa.»",
        linkedin: "https://www.linkedin.com/in/eleonora-rizzato-35a2a92b1",
      },
    ],
  },
  /* Esempio di estensione futura — scommenta e compila:
  {
    label: "Responsabili d'Area",
    members: [
      { name: "Nome Cognome", role: "Area Manager — «Area»", linkedin: "#" },
    ],
  },
  */
];

/* --- 3 · Network & credibilità ------------------------------------------- */

export const network = {
  eyebrow: "Network",
  title: "Parte del network delle Junior Enterprise",
  intro:
    "JEVE fa parte del movimento delle Junior Enterprise: associazioni studentesche che operano come società di consulenza. Attraverso il network nazionale ed europeo condividiamo standard di qualità, formazione e opportunità con migliaia di studenti.",
  partners: [
    {
      name: "JE Italy",
      tagline: "La confederazione italiana delle Junior Enterprise.",
      href: "https://jeitaly.org",
    },
    {
      name: "JEurope",
      tagline: "La confederazione europea delle Junior Enterprise.",
      href: "https://juniorenterprises.eu",
    },
  ],
  badges: [
    "Best Junior Enterprise 2025",
    "Excellence Awards · JEIMM",
    "Junior Enterprise dal 2019",
  ],
};

/* --- 4 · Premi & riconoscimenti (reali, descrizioni da jeve.it) ----------- */
/* La bacheca ordina sempre per anno decrescente e porta in testa il premio
   con `featured: true` (il più prestigioso, non necessariamente il più
   recente). Aggiungere o togliere un premio non richiede altre modifiche.
   `org` = Excellence Awards del network JE (ente da confermare).
   `image`: valorizzalo (es. "/premi/2025-bje.jpg") per sostituire il
   segnaposto di logo/trofeo con l'immagine reale.

   ⚠ I filtri per categoria funzionano in CSS puro (senza JavaScript) e
   coprono le prime 6 voci di `awardCategories`: se ne aggiungi altre,
   estendi le regole corrispondenti in Awards.module.css. */

export const awardCategories = [
  "Eccellenza",
  "Crescita condivisa",
  "Sostenibilità",
  "Innovazione",
] as const;

export type AwardCategory = (typeof awardCategories)[number];

export type Award = {
  year: number;
  title: string;
  org: string;
  description: string;
  category: AwardCategory;
  image?: string;
  /** true → card principale della bacheca */
  featured?: boolean;
};

export const awards: Award[] = [
  {
    year: 2025,
    title: "Best Junior Enterprise",
    org: "Excellence Awards · JEIMM Torino",
    description:
      "Riconosce la Junior Enterprise più eccellente per risultati, innovazione e impatto nel supporto a imprese e studenti.",
    category: "Eccellenza",
    featured: true,
  },
  {
    year: 2025,
    title: "Shared Growth",
    org: "Excellence Awards · JEIMM Torino",
    description:
      "Riconosce le Junior Enterprise che promuovono collaborazioni sostenibili e crescita condivisa tra imprese e studenti.",
    category: "Crescita condivisa",
  },
  {
    year: 2024,
    title: "Shared Growth",
    org: "Excellence Awards",
    description:
      "Riconosce le Junior Enterprise che promuovono collaborazioni sostenibili e crescita condivisa tra imprese e studenti.",
    category: "Crescita condivisa",
  },
  {
    year: 2023,
    title: "Sustainable Development",
    org: "Excellence Awards",
    description:
      "Riconosce l'impegno delle Junior Enterprise nella promozione di progetti sostenibili e nella responsabilità ambientale.",
    category: "Sostenibilità",
  },
  {
    year: 2020,
    title: "Best Junior Initiative",
    org: "Excellence Awards",
    description:
      "Assegnato alla nuova Junior Enterprise che si distingue per innovazione, impatto e qualità nella gestione dei progetti.",
    category: "Innovazione",
  },
];

/* --- 5 · Statistiche & impatto -------------------------------------------- */
/* ⚑ TUTTI I NUMERI QUI SOTTO SONO PLACEHOLDER: vanno sostituiti con i dati
   reali dell'associazione. La sezione mostra un anno alla volta tramite il
   selettore; per aggiungere o togliere un anno basta modificare `statsYears`
   e la mappa `statsByYear`. */

export type Metric = {
  value: number;
  /** es. "+" oppure "%" */
  suffix?: string;
  label: string;
  /** breve contesto sotto l'etichetta */
  context: string;
};

export type YearStats = {
  /** metrica principale, in evidenza */
  main: Metric;
  /** metriche secondarie: da 4 a 6, la griglia si adatta */
  metrics: Metric[];
};

export const statsYears = ["2024", "2025", "2026"] as const;
export type StatsYear = (typeof statsYears)[number];

/** anno mostrato all'apertura della pagina */
export const statsDefaultYear: StatsYear = "2026";

export const statsByYear: Record<StatsYear, YearStats> = {
  "2024": {
    main: {
      value: 24,
      suffix: "+",
      label: "Progetti realizzati",
      context: "«Contesto placeholder sui progetti chiusi nell'anno.»",
    },
    metrics: [
      {
        value: 32,
        label: "Membri della community",
        context: "«Studenti attivi nelle cinque aree.»",
      },
      {
        value: 12,
        label: "Partner e aziende",
        context: "«Realtà del territorio con cui collaboriamo.»",
      },
      {
        value: 18,
        label: "Clienti seguiti",
        context: "«Organizzazioni supportate nell'anno.»",
      },
      {
        value: 240,
        label: "Ore di formazione",
        context: "«Erogate a membri e nuovi ingressi.»",
      },
      {
        value: 3,
        label: "Premi ricevuti",
        context: "«Riconoscimenti dal network JE.»",
      },
      {
        value: 18,
        suffix: "%",
        label: "Crescita annuale",
        context: "«Variazione rispetto all'anno precedente.»",
      },
    ],
  },
  "2025": {
    main: {
      value: 38,
      suffix: "+",
      label: "Progetti realizzati",
      context: "«Contesto placeholder sui progetti chiusi nell'anno.»",
    },
    metrics: [
      {
        value: 41,
        label: "Membri della community",
        context: "«Studenti attivi nelle cinque aree.»",
      },
      {
        value: 18,
        label: "Partner e aziende",
        context: "«Realtà del territorio con cui collaboriamo.»",
      },
      {
        value: 26,
        label: "Clienti seguiti",
        context: "«Organizzazioni supportate nell'anno.»",
      },
      {
        value: 320,
        label: "Ore di formazione",
        context: "«Erogate a membri e nuovi ingressi.»",
      },
      {
        value: 5,
        label: "Premi ricevuti",
        context: "«Riconoscimenti dal network JE.»",
      },
      {
        value: 24,
        suffix: "%",
        label: "Crescita annuale",
        context: "«Variazione rispetto all'anno precedente.»",
      },
    ],
  },
  "2026": {
    main: {
      value: 52,
      suffix: "+",
      label: "Progetti realizzati",
      context: "«Contesto placeholder sui progetti chiusi nell'anno.»",
    },
    metrics: [
      {
        value: 48,
        label: "Membri della community",
        context: "«Studenti attivi nelle cinque aree.»",
      },
      {
        value: 24,
        label: "Partner e aziende",
        context: "«Realtà del territorio con cui collaboriamo.»",
      },
      {
        value: 34,
        label: "Clienti seguiti",
        context: "«Organizzazioni supportate nell'anno.»",
      },
      {
        value: 410,
        label: "Ore di formazione",
        context: "«Erogate a membri e nuovi ingressi.»",
      },
      {
        value: 5,
        label: "Premi ricevuti",
        context: "«Riconoscimenti dal network JE.»",
      },
      {
        value: 31,
        suffix: "%",
        label: "Crescita annuale",
        context: "«Variazione rispetto all'anno precedente.»",
      },
    ],
  },
};

/* --- Mini visualizzazione dell'andamento (decorativa) ---------------------
   Per RIMUOVERE il grafico: svuota `growthSeries` — il componente non lo
   renderizza più, senza toccare il resto della sezione. */

export const growthChart = {
  caption: "«Andamento placeholder dei progetti realizzati per anno.»",
  series: [
    { year: "2019", value: 4 },
    { year: "2020", value: 9 },
    { year: "2021", value: 14 },
    { year: "2022", value: 19 },
    { year: "2023", value: 21 },
    { year: "2024", value: 24 },
    { year: "2025", value: 38 },
    { year: "2026", value: 52 },
  ],
};
