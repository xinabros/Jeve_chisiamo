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
  /* card flottante sul visual */
  badge: { value: "2019", label: "anno di fondazione" },
  /* foto reale del gruppo; svuotala per tornare al segnaposto */
  image: "/team/jeve-2019.png",
  imageAlt: "Il team di JEVE nel 2019, anno di fondazione",
};

/* --- Titoli di sezione -------------------------------------------------- */

export const sections = {
  missionVision: {
    eyebrow: "La direzione",
    /* Titolo volutamente parlato. Alternative: "Perché lo facciamo" ·
       "Da dove partiamo, dove andiamo" */
    title: "Cosa ci muove",
  },
  team: {
    eyebrow: "Il team",
    title: "Cinque aree, un unico team",
    intro:
      "Il team di JEVE riunisce studenti di Ca' Foscari, IUAV e IUSVE, organizzati in cinque aree operative coordinate dal Board. L'ingresso avviene tramite i due recruitment annuali, spring e autumn.",
  },
  /* La sezione Team è in due blocchi, ciascuno con la propria testatina:
     prima le aree, poi chi le guida. */
  areas: {
    label: "Le cinque aree",
    description:
      "Cosa segue ciascuna area e con quali strumenti. Apri una card per il dettaglio e l'elenco dei membri.",
  },
  /* Chiusura della sezione Team: dalle aree si passa a cosa producono.
     ⚑ `href` punta all'ancora "servizi" della home, la stessa già usata
     dal menu. Quando la sezione "Servizi e progetti" sarà pronta, cambia
     l'ancora QUI e basta: il pulsante non la conosce. */
  teamCta: {
    text: "Le cinque aree lavorano su progetti reali, per aziende del territorio.",
    label: "Servizi e progetti",
    href: "/#servizi",
  },
  /* blocco in coda al mosaico delle aree: i cinque Responsabili in griglia */
  leads: {
    label: "Responsabili d'area",
    description: "Chi guida ciascuna delle cinque aree operative.",
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
    eyebrow: "Premi e riconoscimenti",
    /* `accent` va a capo e viene resa in corsivo rosso, come sulla home */
    title: "Il nostro impegno,",
    accent: "premiato.",
    intro:
      "I riconoscimenti ottenuti raccontano la qualità dei progetti, l'impatto generato e la volontà di crescere insieme.",
  },
  stats: {
    eyebrow: "Impatto",
    /* Alternative pronte: "I numeri dietro il lavoro delle persone" ·
       "Quello che abbiamo costruito finora" */
    title: "L'impatto, progetto dopo progetto",
  },
};

/* --- 1 · Mission & Vision (testi reali da jeve.it) ----------------------- */
/* Racconto in due tempi: cosa facciamo oggi, dove vogliamo arrivare.
   `text` di mission e vision sono i testi ufficiali dell'associazione;
   `note` e `intro` sono placeholder da riscrivere con parole vostre.

   `photo`: valorizzalo con una fotografia REALE di vita associativa
   (persone al lavoro, una riunione, un momento di confronto) — es.
   "/mission/riunione.jpg". Finché è vuoto resta un riquadro d'attesa
   che dichiara cosa ci andrà, senza illustrazioni di ripiego. */

export type ManifestoBlock = {
  /** numero discreto, non un'etichetta grafica */
  index: string;
  label: string;
  title: string;
  text: string;
  /** riga di supporto, sempre leggibile */
  note: string;
  photo?: string;
  photoAlt?: string;
};

export const missionVision: {
  intro: string;
  mission: ManifestoBlock;
  vision: ManifestoBlock;
  guide: { quote: string; attribution: string };
} = {
  /* Apertura discorsiva: parla di persone, non di concetti. */
  intro:
    "«Testo placeholder, da riscrivere con parole vostre: chi siamo davvero quando ci troviamo il mercoledì sera, come nascono i progetti, cosa impariamo sbagliando. Due o tre frasi dirette, in prima persona plurale, senza slogan.»",

  mission: {
    index: "01",
    label: "Cosa facciamo ogni giorno",
    title: "Mission",
    text: "Formare gli studenti attraverso il lavoro di squadra e l'esperienza pratica, grazie al coinvolgimento in una realtà organizzata in cui gli ostacoli non sono limiti ma opportunità.",
    note: "«Riga placeholder: un esempio concreto di come succede — un progetto, un cliente, una difficoltà superata insieme.»",
    photo: "/direzione/mission-aula.jpg",
    photoAlt:
      "Studenti di JEVE durante un evento formativo in aula a Ca' Foscari",
  },

  vision: {
    index: "02",
    label: "Dove vogliamo arrivare",
    title: "Vision",
    text: "Concretizzare passione, entusiasmo e curiosità degli studenti più intraprendenti per renderli protagonisti del proprio futuro.",
    note: "«Riga placeholder: un obiettivo specifico e verificabile per i prossimi anni, non una dichiarazione di intenti.»",
    photo: "/direzione/vision-assemblea.jpg",
    photoAlt:
      "Il team di JEVE riunito per la IV Assemblea Generale 2025/26",
  },

  /* Frase guida: breve, in coda alla Vision. Non un manifesto. */
  guide: {
    quote:
      "«Una riga sola, concreta, che diresti a uno studente al primo giorno.»",
    attribution: "«Nome Cognome, ruolo»",
  },
};

/* --- 1 · Team (le 5 aree reali dell'organigramma) ------------------------ */
/* Tutte le aree hanno lo stesso peso: la griglia genera card identiche e
   numerate nell'ordine in cui compaiono qui sotto. Per cambiare l'ordine
   di lettura basta riordinare l'array.
   `members` è indicativo (dato non pubblicato sul sito): aggiorna i numeri.
   `photo`: valorizzalo (es. "/team/business-analysis.jpg") per sostituire
   il visual placeholder con l'immagine reale. */

/* ⚑ MEMBRI DELLE AREE — DA COMPILARE
   -------------------------------------------------------------------------
   `people` è volutamente VUOTO: nel progetto non esistono i nominativi dei
   membri delle aree (l'unica anagrafica presente è il Board, più sotto), e
   inventarli non avrebbe senso.

   Per popolarlo basta aggiungere gli oggetti, in qualsiasi ordine: la
   pagina li raggruppa da sola per livello, nell'ordine di `areaLevels`.

       people: [
         { name: "Nome Cognome", level: "Responsabile" },
         { name: "Nome Cognome", level: "Senior", linkedin: "https://…" },
       ],

   Finché l'elenco è vuoto la card mostra il conteggio indicativo di
   `members` invece dei nomi, senza rompersi. */

/* L'ordine di questo array è l'ordine con cui i gruppi compaiono nella
   card: dal vertice dell'area verso il basso. */
export const areaLevels = [
  "Responsabile",
  "Vice Executive",
  "Senior",
  "Operativo",
] as const;

export type AreaLevel = (typeof areaLevels)[number];

export type AreaMember = {
  name: string;
  level: AreaLevel;
  /** opzionale: se presente il nome diventa un link */
  linkedin?: string;
  /** ritratto verticale (~3:4). Usato solo per i Responsabili, che sotto
      il mosaico compaiono in griglia come il Board. Finché è vuoto la
      card mostra un avatar con le iniziali.
      Es. "/team/responsabili/pietro-gastaldon.jpg" */
  photo?: string;
  /** riga breve su ciò di cui si occupa: compare su hover/focus nella
      griglia dei Responsabili */
  description?: string;
};

export type TeamArea = {
  name: string;
  /** riga breve, compare su hover/focus */
  description: string;
  /** competenze concrete dell'area — dati reali, presi da jeve.it/v2 */
  skills: string[];
  /** testo esteso, compare nel pannello al click */
  details: string;
  /** cosa consegna l'area al cliente o all'associazione */
  delivers: string;
  /** numero indicativo di membri (da confermare) */
  members: number;
  /** anagrafica reale dell'area; vuoto finché non viene fornita */
  people: AreaMember[];
  /** link di approfondimento ("#" = placeholder) */
  href: string;
  photo?: string;
};

/* Vale per tutte le aree: l'ingresso avviene tramite i due recruitment
   annuali. Dato reale, mostrato in coda a ogni pannello. */
export const teamEntry =
  "Si entra tramite i due recruitment annuali, spring e autumn.";

export const teamAreas: TeamArea[] = [
  {
    name: "Business Analysis",
    description:
      "Processi, business plan, analisi di mercato e dati per trasformare informazioni complesse in decisioni più solide.",
    skills: ["Mappatura dei processi", "Business plan", "Analisi di mercato", "Data analytics"],
    details:
      "«Dettaglio placeholder: come lavora l'area, quali progetti segue e quali strumenti utilizza nel percorso con il cliente.»",
    delivers: "«Placeholder: i documenti e le analisi che l'area consegna a fine progetto.»",
    members: 8,
    people: [
      {
        name: "Pietro Gastaldon",
        level: "Responsabile",
        photo: "/team/responsabili/pietro-gastaldon.jpg",
        linkedin: "https://www.linkedin.com/in/pietro-gastaldon-95a4372a8",
        description:
          "«Descrizione placeholder: i progetti di analisi che segue e come imposta il lavoro con il cliente.»",
      },
    ],
    href: "#",
  },
  {
    name: "Marketing",
    description:
      "Strategia, campagne e identità di marca per costruire una presenza riconoscibile e creare relazioni con il pubblico.",
    skills: ["Marketing plan", "Campagne", "Gestione social", "Brand identity"],
    details:
      "«Dettaglio placeholder: come nasce un piano editoriale, dalla definizione degli obiettivi ai contenuti pubblicati.»",
    delivers: "«Placeholder: i materiali che l'area produce — piano editoriale, contenuti, linee guida di marca.»",
    members: 7,
    people: [
      {
        name: "Giovanni Miotto",
        level: "Responsabile",
        photo: "/team/responsabili/giovanni-miotto.jpg",
        linkedin: "https://www.linkedin.com/in/giovanni-miotto-424453328",
        description:
          "«Descrizione placeholder: come coordina piano editoriale, campagne e identità di marca.»",
      },
      { name: "Filippo Pinto", level: "Vice Executive" },
      { name: "Agnese Schembri", level: "Operativo" },
      { name: "Francesco Rossi di Schio", level: "Operativo" },
      { name: "Marco Fedrigo", level: "Operativo" },
      { name: "Matteo Cunial", level: "Operativo" },
      { name: "Barbara Voci", level: "Operativo" },
    ],
    href: "#",
  },
  {
    name: "HR",
    description:
      "Selezione, formazione e crescita delle persone dell'associazione.",
    skills: ["Recruitment", "Formazione", "Crescita delle persone"],
    details:
      "«Dettaglio placeholder: come organizziamo i due recruitment annuali e accompagniamo i nuovi membri.»",
    delivers: "«Placeholder: i percorsi di ingresso e formazione che l'area organizza durante l'anno.»",
    members: 4,
    people: [
      {
        name: "Eleonora Rizzato",
        level: "Responsabile",
        photo: "/team/responsabili/eleonora-rizzato.jpg",
        linkedin: "https://www.linkedin.com/in/eleonora-rizzato-35a2a92b1",
        description:
          "«Descrizione placeholder: come organizza recruitment, formazione e crescita delle persone.»",
      },
      { name: "Nicola Toffolo", level: "Operativo" },
      { name: "Eugenio Boscarol", level: "Operativo" },
      { name: "Luca Knez", level: "Operativo" },
    ],
    href: "#",
  },
  {
    name: "IT",
    description:
      "Siti web e sistemi di misurazione che rendono la presenza digitale efficace, leggibile e orientata alla crescita.",
    skills: ["Sviluppo web", "Google Analytics", "Tracking dei dati"],
    details:
      "«Dettaglio placeholder: dallo sviluppo del sito alla misurazione del traffico e dei risultati online.»",
    delivers: "«Placeholder: i siti e i sistemi di misurazione che l'area realizza e mantiene.»",
    members: 9,
    people: [
      {
        name: "Riccardo Mari",
        level: "Responsabile",
        photo: "/team/responsabili/riccardo-mari.jpg",
        linkedin: "https://www.linkedin.com/in/riccardomari",
        description:
          "«Descrizione placeholder: i siti e i sistemi di misurazione che segue con l'area.»",
      },
      { name: "Eliza Zanetti", level: "Senior" },
      { name: "Matteo Firinaiu", level: "Senior" },
      { name: "Alessio Gaion", level: "Operativo" },
      { name: "Alessia Berrutti", level: "Operativo" },
      { name: "Yifan Zhou", level: "Operativo" },
      { name: "Matteo De Filippi", level: "Operativo" },
      { name: "Mark Bon", level: "Operativo" },
      { name: "Xin Hao Zhou", level: "Operativo" },
    ],
    href: "#",
  },
  {
    name: "Sales & BD",
    description:
      "Percorsi di lead generation mirati per avvicinare aziende e persone realmente interessate a prodotti e servizi.",
    skills: ["Lead generation", "Prospecting", "Sviluppo commerciale"],
    details:
      "«Dettaglio placeholder: come individuiamo e coltiviamo i contatti interessati ai servizi dei clienti.»",
    delivers: "«Placeholder: i contatti qualificati e i percorsi commerciali che l'area apre.»",
    members: 9,
    people: [
      {
        name: "Luca Presti",
        level: "Responsabile",
        photo: "/team/responsabili/luca-presti.jpg",
        linkedin: "https://www.linkedin.com/in/lucapresti",
        description:
          "«Descrizione placeholder: come imposta prospecting e sviluppo commerciale con l'area.»",
      },
      { name: "Alessio Niero", level: "Vice Executive" },
      { name: "Angela Matilde Trevisson", level: "Vice Executive" },
      { name: "Tommaso Zanini", level: "Operativo" },
      { name: "Riccardo Tomè", level: "Operativo" },
      { name: "Marco Piotto", level: "Operativo" },
      { name: "Francesco Lin", level: "Operativo" },
      { name: "Costanza Cavallini", level: "Operativo" },
      { name: "Diego Pedol", level: "Operativo" },
    ],
    href: "#",
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
/* Board in carica (2026). L'ordine dell'array è l'ordine di lettura sulla
   griglia: la presidenza sta al centro, affiancata dagli altri ruoli.
   Per la foto reale valorizza `photo` (es. "/team/marcello-siviero.jpg");
   finché è assente viene mostrato un avatar con le iniziali.
   Formato consigliato: ritratto verticale (circa 3:4), inquadratura
   busto + viso, soggetto centrato in alto. */

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
        name: "Rachele Chiarotto",
        role: "International Manager",
        description:
          "«Descrizione placeholder: cura le relazioni con il network internazionale delle Junior Enterprise.»",
        linkedin: "https://www.linkedin.com/in/rachele-chiarotto",
        photo: "/board/international-manager.jpg",
      },
      {
        name: "Beatrice Antonello",
        role: "Direttrice e Segretaria Generale",
        description:
          "«Descrizione placeholder: presidia processi interni, documentazione e vita associativa.»",
        linkedin: "https://www.linkedin.com/in/beatrice-antonello",
        photo: "/board/direttrice-generale.jpg",
      },
      {
        name: "Carlo Bisaglia",
        role: "Presidente",
        description:
          "«Descrizione placeholder: guida la strategia dell'associazione e i rapporti con partner e istituzioni.»",
        linkedin: "https://www.linkedin.com/in/carlo-bisaglia",
        photo: "/board/presidente.jpg",
      },
      {
        name: "Matteo Tessari",
        role: "Vice Presidente",
        description:
          "«Descrizione placeholder: affianca la presidenza e coordina le attività delle aree operative.»",
        linkedin: "https://www.linkedin.com/in/matteo-tessari-92187627a",
        photo: "/board/vice-presidente.jpg",
      },
      {
        name: "Stephan Njemcevic",
        role: "Tesoriere",
        description:
          "«Descrizione placeholder: gestisce bilancio, amministrazione e sostenibilità economica dei progetti.»",
        linkedin: "https://www.linkedin.com/in/stephan-njemcevic-66608b296",
        photo: "/board/tesoriere.jpg",
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
/* I tre livelli del movimento Junior Enterprise, dal locale all'europeo.
   L'ordine dell'array è l'ordine di profondità nella visualizzazione:
   il primo è in primo piano. `depth` va da 1 (vicino) a -1 (lontano).

   `logo`: file in public/network/. Per sostituirne uno basta cambiare
   il percorso; la scena si adatta da sola. */

export const network = {
  eyebrow: "Network",
  title: "Non siamo soli",
  intro:
    "JEVE è la Junior Enterprise di Ca' Foscari, ma fa parte di una struttura più grande: una confederazione nazionale e una europea che fissano standard, formazione e controlli di qualità. Lavorare con noi significa avere dietro quel sistema.",
};

/* I tre livelli di appartenenza, dal più ampio al più vicino: l'ordine
   dell'array è l'ordine di impilamento, dal fondo alla cima.
   Aggiungere un livello significa aggiungere un oggetto: la pila si
   ricompone da sola. */

export type NetworkLayer = {
  id: string;
  name: string;
  /** ambito geografico, breve */
  scope: string;
  /** cosa fa questo livello e come si lega a quello sopra */
  description: string;
  logo: string;
  href: string;
};

export const networkLayers: NetworkLayer[] = [
  {
    id: "europe",
    name: "JEurope",
    scope: "Europa",
    description:
      "La confederazione europea: coordina le realtà nazionali, apre progetti oltre confine e mette in rete migliaia di studenti in tutta Europa.",
    /* ⚠ marchio generico "Junior-Entreprises": sostituiscilo con il logo
       ufficiale JEurope appena disponibile */
    logo: "/network/je-europe.png",
    href: "https://juniorenterprises.eu",
  },
  {
    id: "italy",
    name: "JE Italy",
    scope: "Italia",
    description:
      "La confederazione italiana: riunisce le Junior Enterprise del Paese, ne verifica gli standard di qualità e organizza formazione ed eventi comuni.",
    logo: "/network/je-italy.png",
    href: "https://jeitaly.org",
  },
  {
    id: "jeve",
    name: "JEVE",
    scope: "Venezia",
    description:
      "«Descrizione placeholder: chi siamo sul territorio — gli studenti, l'ateneo, i clienti con cui lavoriamo ogni giorno.»",
    logo: "/network/jeve.jpg",
    href: "/chi-siamo",
  },
];

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
      "Premio alla Junior Enterprise che eccelle per risultati, innovazione e impatto.",
    image: "/awards/best-junior-enterprise-2025.png",
    category: "Eccellenza",
    featured: true,
  },
  {
    year: 2025,
    title: "Shared Growth",
    org: "Excellence Awards · JEIMM Torino",
    description:
      "Premio alla Junior Enterprise che crea crescita condivisa tra studenti, imprese e network.",
    image: "/awards/shared-growth-2025.png",
    category: "Crescita condivisa",
  },
  {
    year: 2024,
    title: "Shared Growth",
    org: "Excellence Awards",
    description:
      "Premio alla Junior Enterprise che crea crescita condivisa tra studenti, imprese e network.",
    image: "/awards/shared-growth-2025.png",
    category: "Crescita condivisa",
  },
  {
    year: 2023,
    title: "Sustainable Development",
    org: "Excellence Awards",
    description:
      "Premio alla Junior Enterprise più impegnata in progetti sostenibili e responsabili.",
    image: "/awards/sustainable-development-2023.png",
    category: "Sostenibilità",
  },
  {
    year: 2020,
    title: "Best Junior Initiative",
    org: "Excellence Awards",
    description:
      "Premio alla nuova Junior Enterprise che si distingue per innovazione, impatto e qualità dei progetti.",
    image: "/awards/best-junior-initiative-2020.png",
    category: "Innovazione",
  },
];

/* --- 5 · Impatto ----------------------------------------------------------
   ⚑ TUTTI I NUMERI SONO PLACEHOLDER: sostituiscili con i dati reali.

   Pochi indicatori, non un cruscotto: quattro bastano. Ogni voce ha il
   numero, un'etichetta concreta e una riga di contesto.

   I dati sono per anno, così si legge la progressione. Per aggiungere o
   togliere un anno basta aggiornare `impactYears` e `impactByYear`; le
   etichette e i contesti stanno in un posto solo, in `impactMetrics`. */

export const impactYears = ["2024", "2025", "2026"] as const;
export type ImpactYear = (typeof impactYears)[number];

/** anno mostrato all'apertura della pagina */
export const impactDefaultYear: ImpactYear = "2026";

export type ImpactMetric = {
  id: string;
  /** es. "+" oppure "%" */
  suffix?: string;
  /** etichetta concreta: "progetti realizzati", non "KPI" */
  label: string;
  /** una riga che dà senso al numero */
  context: string;
};

/* Etichette e contesti: definiti una volta sola, valgono per tutti gli anni. */
export const impactMetrics: ImpactMetric[] = [
  {
    id: "progetti",
    suffix: "+",
    label: "progetti realizzati",
    context:
      "«Contesto placeholder: lavori chiusi e consegnati nel corso dell'anno.»",
  },
  {
    id: "aziende",
    label: "aziende supportate",
    context:
      "«Contesto placeholder: realtà seguite dalla prima analisi alla consegna.»",
  },
  {
    id: "membri",
    label: "membri formati",
    context:
      "«Contesto placeholder: studenti passati dalle cinque aree operative.»",
  },
  {
    id: "premi",
    label: "premi ricevuti",
    context:
      "«Contesto placeholder: riconoscimenti del network Junior Enterprise.»",
  },
];

/* Solo i valori cambiano da un anno all'altro. */
export const impactByYear: Record<ImpactYear, Record<string, number>> = {
  "2024": { progetti: 24, aziende: 18, membri: 32, premi: 3 },
  "2025": { progetti: 38, aziende: 26, membri: 41, premi: 5 },
  "2026": { progetti: 52, aziende: 34, membri: 48, premi: 5 },
};

export const impact = {
  lead: "«Testo placeholder, due righe al massimo: da quando siamo nati, quanto lavoro è passato di qui e cosa hanno imparato le persone che ci sono state. Concreto, senza superlativi.»",
};

/* --- 6 · Testimonianze ----------------------------------------------------
   ⚑ PLACEHOLDER. Nel progetto non esiste alcuna recensione reale: citazioni,
   nomi e aziende sono segnaposto, riconoscibili dalle «...».
   Tienine una o due: sono la parte che dà fiducia, e più sono, meno pesano.
   `avatar`: una piccola foto o il logo dell'ente, se disponibile. */

export type Testimonial = {
  quote: string;
  /** «Nome Cognome» finché non è reale */
  name: string;
  /** ruolo e azienda, es. "Marketing Manager · «Azienda»" */
  role: string;
  avatar?: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "«Citazione placeholder, due righe: cosa vi aspettavate, cosa avete ottenuto e come è stato lavorare insieme. Meglio una frase specifica che un complimento generico.»",
    name: "«Nome Cognome»",
    role: "«Ruolo» · «Azienda»",
  },
  {
    quote:
      "«Citazione placeholder: un dettaglio concreto del percorso — una scadenza rispettata, un'idea che non avevate considerato, un risultato misurabile.»",
    name: "«Nome Cognome»",
    role: "«Ruolo» · «Ente»",
  },
];
