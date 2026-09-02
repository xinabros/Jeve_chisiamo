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
  /* I due inviti in coda all'hero. Il primo scende alla direzione
     (Mission e Vision), il secondo apre la mail. */
  actions: {
    primary: { label: "Scopri chi siamo", href: "#mission" },
    ghost: { label: "Parliamone", href: "mailto:info@jeve.it" },
  },

  /* ⚑ NON PIÙ USATI DALL'HERO, che ora è di solo testo centrato.
     Restano qui perché servono se si torna al layout a due colonne con
     la fotografia di lato: basta rimettere il blocco `heroVisual` nel
     componente, i dati sono già pronti. */
  badge: { value: "2019", label: "anno di fondazione" },
  image: "/team/jeve-2019.png",
  imageAlt: "Il team di JEVE nel 2019, anno di fondazione",
};

/* --- 1 · In azione (nastro di fotografie) ---------------------------------
   Il nastro sta dentro l'hero, nella colonna di destra, e scorre in
   verticale.

   Fotografie REALI dell'associazione, in public/team/vita/. Hanno preso
   il posto delle immagini di stock che stavano qui come segnaposto: per
   cambiarne una basta sostituire il file e aggiornare `caption`, il
   resto si adatta.

   Servono almeno sei immagini: il nastro scorre in continuo rendendo
   l'elenco due volte di fila, e con meno scatti si vedrebbe il vuoto
   fra una copia e l'altra.

   Altre foto vere già nel progetto, se se ne volesse allungare l'elenco:
   – /team/jeve-2019.png             il gruppo nel 2019
   – /direzione/mission-aula.jpg     formazione in aula
   – /direzione/vision-assemblea.jpg la IV Assemblea Generale
   ------------------------------------------------------------------------ */

export const life = {
  eyebrow: "In azione",
  title: "Dentro JEVE, ogni settimana",
  intro:
    "Un assaggio di come lavoriamo: riunioni, progetti, aule e momenti di squadra — la vita reale dietro alle cinque aree operative.",
};

export type LifePhoto = {
  src: string;
  /** didascalia in sovrimpressione; fa anche da testo alternativo */
  caption: string;
};

export const lifePhotos: LifePhoto[] = [
  {
    src: "/team/vita/premiazione-progetti.jpg",
    caption: "Premiazione dei progetti",
  },
  {
    src: "/team/vita/networking-evento.jpg",
    caption: "Networking dopo l'evento",
  },
  {
    src: "/team/vita/visita-luxottica.jpg",
    caption: "In visita da Luxottica",
  },
  {
    src: "/team/vita/panel-relatori.jpg",
    caption: "Panel con i relatori",
  },
  {
    src: "/team/vita/team-insieme.jpg",
    caption: "Il team, tutto insieme",
  },
  {
    src: "/team/vita/momento-di-squadra.jpg",
    caption: "Un momento di squadra",
  },
];

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
      "Cinque persone che si occupano di quello che nessuna singola area può gestire da sola: la direzione dell'associazione, i conti, i rapporti con il network e la continuità fra un anno e il successivo. Da qui passa anche il coordinamento delle cinque aree operative.",
  },
  awards: {
    eyebrow: "Premi e riconoscimenti",
    /* `accent` va a capo e viene resa in corsivo rosso, come sulla home */
    title: "Il nostro impegno,",
    accent: "premiato.",
    intro:
      "Cinque riconoscimenti in sei anni agli Excellence Awards, i premi del network Junior Enterprise. Nel 2025, al JEIMM di Torino, sono arrivati doppi.",
  },
  /* La sezione che chiude la pagina: le voci di chi è passato da JEVE.
     Ha preso il posto di "Impatto" — i numeri e il selettore d'anno non
     si mostrano più, ma i dati restano più sotto in questo file. */
  alumni: {
    eyebrow: "Alumni",
    /* Alternative pronte: "Le testimonianze dei nostri Alumni" ·
       "Dove sono arrivati" · "Chi è passato di qui" · "Dicono di noi"
       — quest'ultimo ora è libero: il riquadro rosso che diceva "Cosa
       dicono di noi" è stato tolto. */
    title: "La parola ai nostri Alumni",
    /* Sta sotto al titolo: dice chi sono gli Alumni, per chi arriva
       sulla pagina senza saperlo. */
    intro:
      "Alumni sono gli ex membri dell'associazione: studenti che hanno fatto parte di un'area, seguito progetti veri per aziende del territorio e poi lasciato il posto a chi è arrivato dopo. Qui raccontano cosa si sono portati via.",
    /* Il riquadro rosso accanto al carosello non c'è più: ripeteva
       l'intestazione qui sopra. `kicker` resta perché dà il nome
       accessibile al carosello (lo legge chi naviga a voce, non
       compare a schermo); `title` non è più usato in pagina — è qui
       se si vuole rimettere un'intestazione al riquadro. */
    voices: {
      kicker: "Testimonianze",
      title: "Cosa dicono di noi",
    },
  },
};

/* --- 1 · Mission & Vision (testi reali da jeve.it) ----------------------- */
/* Racconto in due tempi: cosa facciamo oggi, dove vogliamo arrivare.
   `intro` e i `points` di mission e vision sono testi dell'associazione,
   scritti da chi ci lavora. La `guide` in coda è ancora un segnaposto.

   `photo`: valorizzalo con una fotografia REALE di vita associativa
   (persone al lavoro, una riunione, un momento di confronto) — es.
   "/mission/riunione.jpg". Finché è vuoto resta un riquadro d'attesa
   che dichiara cosa ci andrà, senza illustrazioni di ripiego. */

export type ManifestoBlock = {
  /** numero discreto, non un'etichetta grafica */
  index: string;
  label: string;
  title: string;
  /** Le affermazioni del blocco, tutte dello stesso peso: la pagina le
      rende come elenco, non come un testo con una riga di commento sotto.
      Aggiungerne o toglierne una non richiede modifiche al componente. */
  points: string[];
  photo?: string;
  photoAlt?: string;
};

export const missionVision: {
  intro: string;
  mission: ManifestoBlock;
  vision: ManifestoBlock;
  /* Citazione di chiusura, opzionale: se manca la sezione finisce sulla
     Vision, senza lasciare un segnaposto in pagina. Per rimetterla basta
     aggiungere qui `guide: { quote: "…", attribution: "Nome, ruolo" }` —
     il componente la mostra da solo. */
  guide?: { quote: string; attribution: string };
} = {
  /* Apertura discorsiva: parla di persone, non di concetti. */
  intro:
    "Ci troviamo ogni settimana per lavorare su progetti reali, con aziende vere che si aspettano un risultato vero — non un esercizio da consegnare a un professore. È scomodo, a volte: si sbaglia, si rifà, si discute su come impostare un'analisi o una campagna finché non torna. Ma è l'unico modo che conosciamo per imparare a lavorare davvero, prima ancora di laurearci.",

  mission: {
    index: "01",
    label: "Cosa facciamo ogni giorno",
    title: "Mission",
    points: [
      "Far lavorare gli studenti su casi aziendali concreti, non su simulazioni: dalla prima riunione con il cliente alla consegna finale, con tutte le difficoltà che questo comporta.",
      "Far crescere gli studenti attraverso il lavoro di squadra su progetti concreti, dove ogni ostacolo — una scadenza stretta, un cliente indeciso, un'analisi da rifare — diventa qualcosa da cui imparare, non un limite.",
    ],
    photo: "/direzione/mission-aula.jpg",
    photoAlt:
      "Studenti di JEVE durante un evento formativo in aula a Ca' Foscari",
  },

  vision: {
    index: "02",
    label: "Dove vogliamo arrivare",
    title: "Vision",
    points: [
      "Vogliamo che JEVE sia un punto fermo nel network delle Junior Enterprise italiane — non solo per i premi vinti, ma perché le altre Junior vengono a chiedere come abbiamo fatto certe cose.",
      "Vogliamo che chi lascia JEVE lasci anche qualcosa che chi arriva dopo può usare — un metodo, un contatto, un errore già fatto da non ripetere — così che l'associazione cresca invece di ripartire ogni anno da zero.",
    ],
    photo: "/direzione/vision-assemblea.jpg",
    photoAlt:
      "Il team di JEVE riunito per la IV Assemblea Generale 2025/26",
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
      "Partiamo sempre da un'analisi di mercato o dei processi del cliente, prima di proporre qualsiasi soluzione. Lavoriamo con dati veri — non ipotesi — e li trasformiamo in un business plan o in una mappatura che il cliente può davvero usare.",
    delivers:
      "Un business plan o un'analisi di mercato completa, con i dati raccolti e le decisioni che ne derivano — non solo slide, ma un documento che regge nel tempo.",
    members: 14,
    people: [
      {
        name: "Pietro Gastaldon",
        level: "Responsabile",
        photo: "/team/responsabili/pietro-gastaldon.jpg",
        linkedin: "https://www.linkedin.com/in/pietro-gastaldon-95a4372a8",
        description:
          "Imposta l'analisi prima della soluzione: mercato, processi, dati veri da cui ricavare un business plan.",
      },
      { name: "Irene Purpura", level: "Vice Executive" },
      { name: "Giovanni Mattei", level: "Senior" },
      { name: "Enrico Toma", level: "Senior" },
      { name: "Anna Infante", level: "Senior" },
      { name: "Marcello Siviero", level: "Senior" },
      { name: "Lucrezia Giulia Conte", level: "Operativo" },
      { name: "Alberto Faloppa", level: "Operativo" },
      { name: "Ida Menon", level: "Operativo" },
      { name: "Matteo Poncato", level: "Operativo" },
      { name: "Francesca Spagnolo", level: "Operativo" },
      { name: "Edoardo Salvalaio", level: "Operativo" },
      { name: "Leonardo Bonan", level: "Operativo" },
      { name: "Edoardo Callegari", level: "Operativo" },
    ],
    href: "#",
  },
  {
    name: "Marketing",
    description:
      "Strategia, campagne e identità di marca per costruire una presenza riconoscibile e creare relazioni con il pubblico.",
    skills: ["Marketing plan", "Campagne", "Gestione social", "Brand identity"],
    details:
      "Costruiamo il piano editoriale insieme al cliente, partendo da cosa vuole comunicare e a chi. Da lì escono campagne, contenuti social e — quando serve — il lavoro sull'identità di marca.",
    delivers:
      "Un piano editoriale con i contenuti pronti alla pubblicazione, oppure una campagna completa con le linee guida di marca che il cliente può continuare a usare da solo.",
    members: 11,
    people: [
      {
        name: "Giovanni Miotto",
        level: "Responsabile",
        photo: "/team/responsabili/giovanni-miotto.jpg",
        linkedin: "https://www.linkedin.com/in/giovanni-miotto-424453328",
        description:
          "Costruisce il piano editoriale con il cliente e coordina campagne, contenuti e lavoro sulla marca.",
      },
      { name: "Filippo Maria Pinto", level: "Vice Executive" },
      { name: "Alessandro Lunardi", level: "Senior" },
      { name: "Tommaso Marchetto", level: "Operativo" },
      { name: "Pietro Parere", level: "Operativo" },
      { name: "Marco Fedrigo", level: "Operativo" },
      { name: "Francesco Rossi di Schio", level: "Operativo" },
      { name: "Barbara Voci", level: "Operativo" },
      { name: "Agnese Schembri", level: "Operativo" },
      { name: "Linda Niero", level: "Operativo" },
      { name: "Matteo Cunial", level: "Operativo" },
    ],
    href: "#",
  },
  {
    name: "HR",
    description:
      "Selezione, formazione e crescita delle persone dell'associazione.",
    skills: ["Recruitment", "Formazione", "Crescita delle persone"],
    details:
      "Organizziamo due recruitment l'anno, a primavera e in autunno: selezione, colloqui, inserimento. Dopo l'ingresso seguiamo la formazione interna e organizziamo teambuilding e visite aziendali, perché la crescita non sia solo tecnica.",
    delivers:
      "Il percorso di selezione e formazione di ogni nuovo socio, dai colloqui fino all'inserimento in un'area operativa, più i momenti di teambuilding durante l'anno.",
    members: 12,
    people: [
      {
        name: "Eleonora Rizzato",
        level: "Responsabile",
        photo: "/team/responsabili/eleonora-rizzato.jpg",
        linkedin: "https://www.linkedin.com/in/eleonora-rizzato-35a2a92b1",
        description:
          "Organizza i due recruitment annuali, la formazione interna e i momenti di squadra durante l'anno.",
      },
      { name: "Lidia Carniello", level: "Vice Executive" },
      { name: "Fernando Augusto Vernuccio", level: "Senior" },
      { name: "Giacomo Finati", level: "Senior" },
      { name: "Clara Caterina Togliani", level: "Senior" },
      { name: "Rossella Dal Pont", level: "Operativo" },
      { name: "Nicola Toffolo", level: "Operativo" },
      { name: "Eugenio Boscarol", level: "Operativo" },
      { name: "Nicola Galitelli", level: "Operativo" },
      { name: "Gregorio Bellinazzo", level: "Operativo" },
      { name: "Luca Knez", level: "Operativo" },
      { name: "Giorgia Barazza", level: "Operativo" },
    ],
    href: "#",
  },
  {
    name: "IT",
    description:
      "Siti web e sistemi di misurazione che rendono la presenza digitale efficace, leggibile e orientata alla crescita.",
    skills: ["Sviluppo web", "Google Analytics", "Tracking dei dati"],
    details:
      "Sviluppiamo siti web per i clienti, mettiamo in piedi il tracking — Google Analytics, dati di traffico — e seguiamo anche CRM e automazioni quando il cliente ne ha bisogno.",
    delivers:
      "Un sito funzionante, un sistema di misurazione già impostato, e — quando richiesto — un CRM o un flusso automatizzato pronto all'uso.",
    members: 10,
    people: [
      {
        name: "Riccardo Mari",
        level: "Responsabile",
        photo: "/team/responsabili/riccardo-mari.jpg",
        linkedin: "https://www.linkedin.com/in/riccardomari",
        description:
          "Segue i siti dei clienti e la misurazione: tracking, analytics e, quando serve, CRM e automazioni.",
      },
      { name: "Matteo Firinaiu", level: "Senior" },
      { name: "Elisa Zanetti", level: "Senior" },
      { name: "Yifan Zhou", level: "Operativo" },
      { name: "Alessio Gaion", level: "Operativo" },
      { name: "Xin Hao Zhou", level: "Operativo" },
      { name: "Matteo Defilippi", level: "Operativo" },
      { name: "Giovanni Vio", level: "Operativo" },
      { name: "Mark Bon", level: "Operativo" },
      { name: "Alessia Berruti", level: "Operativo" },
    ],
    href: "#",
  },
  {
    name: "Sales & BD",
    description:
      "Percorsi di lead generation mirati per avvicinare aziende e persone realmente interessate a prodotti e servizi.",
    skills: ["Lead generation", "Prospecting", "Sviluppo commerciale"],
    details:
      "Cerchiamo contatti realmente interessati ai servizi del cliente, non liste generiche — partiamo dal capire chi potrebbe averne bisogno davvero, poi li contattiamo uno per uno.",
    delivers:
      "Una lista di contatti qualificati, già valutati, pronti per essere seguiti dal cliente.",
    members: 19,
    people: [
      /* ⚑ DA CONFERMARE: nell'elenco mandato il campo "resp" era vuoto.
         Luca Presti resta qui perché toglierlo farebbe sparire una card
         dalla sezione "Responsabili d'area", che pesca proprio da qui. */
      {
        name: "Luca Presti",
        level: "Responsabile",
        photo: "/team/responsabili/luca-presti.jpg",
        linkedin: "https://www.linkedin.com/in/lucapresti",
        description:
          "Individua i contatti che hanno davvero bisogno dei servizi del cliente, e li segue uno per uno.",
      },
      { name: "Angela Matilde Trevisson", level: "Vice Executive" },
      { name: "Alessio Niero", level: "Vice Executive" },
      { name: "Ettore Rigillo", level: "Senior" },
      { name: "Rebecca Sacco", level: "Senior" },
      { name: "Angelica Da Lio", level: "Senior" },
      { name: "Silvia Marini", level: "Senior" },
      { name: "Clorinda Favali", level: "Senior" },
      { name: "Nicola Canal", level: "Senior" },
      { name: "Nicolò Voltolina", level: "Senior" },
      { name: "Riccardo Tomè", level: "Operativo" },
      { name: "Costanza Cavallini", level: "Operativo" },
      { name: "Tommaso Zanini", level: "Operativo" },
      { name: "Alvise Ciscato", level: "Operativo" },
      { name: "Giada Bettio", level: "Operativo" },
      { name: "Marco Piotto", level: "Operativo" },
      { name: "Francesco Lin", level: "Operativo" },
      { name: "Giovanni Dorigo", level: "Operativo" },
      { name: "Diego Pedol", level: "Operativo" },
    ],
    href: "#",
  },
];

/* --- 1 · Timeline (eventi reali) ----------------------------------------- */
/* Inserisci gli eventi in QUALSIASI ordine: la timeline li ordina dal meno
   recente al più recente — 2019 a sinistra, l'anno in corso a destra — e
   ricompone da sola il layout. Aggiungere, rimuovere o riordinare una tappa
   non richiede modifiche al componente.
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
    year: 2026,
    title: "Premio “Shared Growth”",
    description:
      "Terza edizione consecutiva del premio alla crescita condivisa.",
    detail:
      "Il terzo “Shared Growth” di fila, dopo il 2024 e il 2025: il criterio non cambia — quanto un progetto lascia al cliente e quanto lascia agli studenti che ci hanno lavorato — e la conferma dice che non è stato un caso isolato.",
  },
  {
    year: 2025,
    title: "Excellence Awards di Torino",
    description:
      "Doppio riconoscimento agli Excellence Awards durante il JEIMM di Torino.",
    detail:
      "Due premi nella stessa edizione del JEIMM: “Shared Growth” per la seconda volta di fila e “Best Junior Enterprise”, che non guarda al singolo progetto ma all'associazione nel suo insieme — risultati, innovazione e impatto.",
    importance: "major",
  },
  {
    year: 2024,
    title: "Premio “Shared Growth”",
    description:
      "Riconosciuta la capacità di generare crescita condivisa tra imprese e studenti.",
    detail:
      "Il criterio è la crescita condivisa: quanto un progetto lascia al cliente e quanto lascia agli studenti che ci hanno lavorato. È lo stesso premio che l'associazione si riconferma l'anno successivo a Torino.",
  },
  {
    year: 2023,
    title: "Premio “Sustainable Development”",
    description:
      "Premiato l'impegno su progetti sostenibili e responsabilità ambientale.",
    detail:
      "Premia l'impegno su progetti a ricaduta ambientale e sociale. È il primo di tre riconoscimenti consecutivi: da qui in poi JEVE torna sul palco degli Excellence Awards ogni anno.",
  },
  {
    year: 2020,
    title: "Premio “Best Junior Initiative”",
    description:
      "A un anno dalla fondazione arriva il primo riconoscimento del network.",
    detail:
      "Il premio guarda alle Junior Enterprise appena nate e a come partono: qualità dei progetti gestiti, non dimensione dell'associazione. Arriva a poco più di un anno dalla fondazione.",
  },
  {
    year: 2019,
    title: "Nasce JEVE",
    description:
      "Nasce la Junior Enterprise Ca' Foscari di Venezia: studenti che fanno consulenza.",
    detail:
      "Nasce sul modello delle Junior Enterprise già attive in Italia e in Europa: studenti di Ca' Foscari che lavorano come una società di consulenza, su progetti veri e per clienti veri, mentre studiano.",
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
          "Cura i rapporti con JE Italy e il network europeo: standard, formazione ed eventi oltre confine.",
        linkedin: "https://www.linkedin.com/in/rachele-chiarotto",
        photo: "/board/international-manager.jpg",
      },
      {
        name: "Beatrice Antonello",
        role: "Direttrice e Segretaria Generale",
        description:
          "Verbali, documenti, scadenze: la memoria di come si lavora, per chi arriva dopo.",
        linkedin: "https://www.linkedin.com/in/beatrice-antonello",
        photo: "/board/direttrice-generale.jpg",
      },
      {
        name: "Carlo Bisaglia",
        role: "Presidente",
        description:
          "Rappresenta JEVE davanti ad aziende, ateneo e network, e decide quando una scelta riguarda tutta l'associazione.",
        linkedin: "https://www.linkedin.com/in/carlo-bisaglia",
        photo: "/board/presidente.jpg",
      },
      {
        name: "Matteo Tessari",
        role: "Vice Presidente",
        description:
          "Affianca la presidenza e tiene il filo fra le cinque aree, perché i progetti che ne attraversano più di una non si fermino.",
        linkedin: "https://www.linkedin.com/in/matteo-tessari-92187627a",
        photo: "/board/vice-presidente.jpg",
      },
      {
        name: "Stephan Njemcevic",
        role: "Tesoriere",
        description:
          "Tiene il bilancio e la sostenibilità dei progetti: quanto costa un lavoro e cosa si può promettere a un cliente.",
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

/* I tre livelli di appartenenza, in ordine di lettura: dal più vicino
   (noi, a Venezia) al più ampio (l'Europa). L'ordine dell'array è l'ordine
   dei passi numerati 01 · 02 · 03 accanto alla mappa.

   ⚠ Il ciclo di evidenziazione è scritto per TRE passi: aggiungerne un
   quarto richiede di estendere i keyframes `euRow*` / `euNum*` e i livelli
   di mappa in ChiSiamo.module.css. */

export type NetworkLayer = {
  id: string;
  name: string;
  /** titolo del passo: cos'è questo livello, in tre parole */
  scope: string;
  /** riga sopra il titolo: il luogo, in maiuscoletto */
  tier: string;
  /** una riga sola: cosa tiene insieme questo livello */
  description: string;
  /* ⚑ `logo` e `href` non sono più usati: la sezione mostra una mappa,
     non i marchi. Restano perché i file esistono in public/network/ e
     servirebbero se si tornasse a una versione con i loghi. */
  logo: string;
  href: string;
};

export const networkLayers: NetworkLayer[] = [
  {
    id: "jeve",
    name: "JEVE",
    scope: "Il punto di partenza",
    tier: "Venezia",
    description: "La nostra Junior Enterprise, radicata a Venezia.",
    logo: "/network/jeve.jpg",
    href: "/chi-siamo",
  },
  {
    id: "italy",
    name: "JE Italy",
    scope: "La rete nazionale",
    tier: "Italia",
    description: "La confederazione che unisce le Junior Enterprise italiane.",
    logo: "/network/je-italy.png",
    href: "https://jeitaly.org",
  },
  {
    id: "europe",
    name: "JEurope",
    scope: "Lo standard europeo",
    tier: "Europa",
    description:
      "Il network continentale che fissa qualità e formazione.",
    logo: "/network/je-europe.png",
    href: "https://juniorenterprises.eu",
  },
];

/* I tre strati della mappa: il primo sta sempre sotto, gli altri due si
   accendono a turno seguendo il passo attivo. */
export const networkMap = {
  base: "/network/eu-map-base.png",
  italy: "/network/eu-map-italy.png",
  europe: "/network/eu-map-europe.png",
  alt: "Mappa dell'Europa: l'Italia e i paesi in cui il network Junior Enterprise è presente",
};

/* --- 4 · Premi & riconoscimenti (reali, descrizioni da jeve.it) ----------- */
/* L'elenco ordina per anno decrescente e porta in testa il premio con
   `featured: true` (il più prestigioso, non necessariamente il più
   recente). Aggiungere o togliere un premio non richiede altre modifiche.

   `org` = Excellence Awards del network JE. Solo per il 2025 sappiamo
   dove: al JEIMM di Torino. Per gli altri anni la sede è da confermare.

   `image`: l'artwork è per tipo di premio, non per anno — per questo le
   due edizioni di "Shared Growth" condividono lo stesso file. Non è una
   svista: in public/awards/ ci sono quattro immagini per cinque premi. */

export type Award = {
  year: number;
  title: string;
  org: string;
  description: string;
  image?: string;
  /** true → prima riga dell'elenco */
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
    featured: true,
  },
  {
    year: 2025,
    title: "Shared Growth",
    org: "Excellence Awards · JEIMM Torino",
    description:
      "Premio alla Junior Enterprise che crea crescita condivisa tra studenti, imprese e network.",
    image: "/awards/shared-growth-2025.png",
  },
  {
    year: 2024,
    title: "Shared Growth",
    org: "Excellence Awards",
    /* stesso premio del 2025: la riga qui sotto lo distingue, altrimenti
       le due edizioni comparirebbero con la stessa identica frase */
    description:
      "La prima delle due edizioni consecutive: crescita condivisa fra studenti, imprese e network.",
    image: "/awards/shared-growth-2025.png",
  },
  {
    year: 2023,
    title: "Sustainable Development",
    org: "Excellence Awards",
    description:
      "Premio alla Junior Enterprise più impegnata in progetti sostenibili e responsabili.",
    image: "/awards/sustainable-development-2023.png",
  },
  {
    year: 2020,
    title: "Best Junior Initiative",
    org: "Excellence Awards",
    description:
      "Premio alla nuova Junior Enterprise che si distingue per innovazione, impatto e qualità dei progetti.",
    image: "/awards/best-junior-initiative-2020.png",
  },
];

/* --- 5 · Impatto ----------------------------------------------------------
   ⚑ TRE NUMERI SU QUATTRO SONO ANCORA SEGNAPOSTO: progetti, aziende e
   membri vanno sostituiti con i dati reali. I premi sono calcolati.

   Pochi indicatori, non un cruscotto: quattro bastano. Ogni voce ha il
   numero, un'etichetta concreta e una riga di contesto.

   I dati sono per anno, così si legge la progressione. Per aggiungere o
   togliere un anno basta aggiornare `impactYears` e `impactByYear`; le
   etichette e i contesti stanno in un posto solo, in `impactMetrics`. */

/* ==========================================================================
   ⚑ DATI NON PIÙ MOSTRATI IN PAGINA
   La sezione "Impatto" — i quattro indicatori e il selettore d'anno — è
   stata sostituita dalla sezione "Alumni". Numeri ed etichette restano
   qui perché sono dati veri dell'associazione: se la sezione torna, il
   contenuto è già pronto e non va ricostruito.
   ========================================================================== */

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
      "Lavori chiusi e consegnati al cliente, dalla prima riunione alla consegna finale.",
  },
  {
    id: "aziende",
    label: "aziende supportate",
    context:
      "Aziende e organizzazioni seguite per almeno un progetto intero, non per una consulenza spot.",
  },
  {
    id: "membri",
    label: "membri formati",
    context:
      "Studenti entrati con uno dei due recruitment annuali e passati dalle cinque aree operative.",
  },
  {
    id: "premi",
    label: "premi ricevuti",
    context:
      "Riconoscimenti agli Excellence Awards, i premi del network Junior Enterprise.",
  },
];

/* I premi non si scrivono a mano: si contano da `awards` qui sopra, così
   il numero non può divergere dall'elenco che il lettore ha appena visto.
   Aggiungere un premio aggiorna il contatore da solo. */
const premiEntro = (anno: number) =>
  awards.filter((premio) => premio.year <= anno).length;

/* Solo i valori cambiano da un anno all'altro.
   ⚑ `progetti`, `aziende` e `membri` SONO ANCORA SEGNAPOSTO: sono numeri
   inventati, vanno sostituiti con i dati reali dell'associazione prima
   che la pagina vada online. `premi` invece è calcolato ed è corretto. */
export const impactByYear: Record<ImpactYear, Record<string, number>> = {
  "2024": { progetti: 24, aziende: 18, membri: 32, premi: premiEntro(2024) },
  "2025": { progetti: 38, aziende: 26, membri: 41, premi: premiEntro(2025) },
  "2026": { progetti: 52, aziende: 34, membri: 48, premi: premiEntro(2026) },
};

export const impact = {
  lead: "Dal 2019 a oggi di qui sono passati studenti e progetti in numero crescente, anno dopo anno. Questi quattro numeri non dicono quanto siamo bravi: dicono quanto lavoro vero è stato fatto, e quante persone ci hanno imparato un mestiere.",
};

/* --- 6 · Alumni -----------------------------------------------------------
   Le voci di chi è passato da JEVE. Tre pezzi di testo per ciascuna:
   la testimonianza, il nome, e il ruolo che quella persona ricopre oggi
   in azienda.

   ⚑ PLACEHOLDER: citazioni, nomi, ruoli e aziende sono segnaposto,
   riconoscibili dalle «...». Aggiungerne o toglierne cambia da solo il
   numero di pallini del carosello.
   `avatar`: una piccola foto, se disponibile. */

export type Testimonial = {
  /** la testimonianza */
  quote: string;
  /** «Nome Cognome» finché non è reale */
  name: string;
  /** il ruolo ricoperto oggi e l'azienda, es. "Product Manager · «Azienda»" */
  role: string;
  avatar?: string;
};

/* ⚑ I TESTI sono scritti, NOMI E AZIENDE NO: restano fra «...».
   Sostituiscili con le persone vere prima di andare online. Una
   testimonianza firmata da un nome inventato, con un'azienda vera
   accanto, è una recensione falsa a tutti gli effetti — anche se il
   testo è verosimile. Meglio tre voci reali che sei inventate. */

export const testimonials: Testimonial[] = [
  {
    quote:
      "Il primo progetto l'ho seguito al secondo anno: la riunione con il cliente, l'analisi, la consegna. Quando mi è ricapitato di farlo per lavoro non era la prima volta — ed è tutta la differenza.",
    name: "«Nome Cognome»",
    role: "«Ruolo» · «Azienda»",
  },
  {
    quote:
      "In JEVE ho imparato a rifare un lavoro da capo senza prenderla sul personale. Detta così sembra poco: è la cosa che mi ha reso più utile nei primi mesi in azienda.",
    name: "«Nome Cognome»",
    role: "«Ruolo» · «Azienda»",
  },
  {
    quote:
      "Sono entrato per imparare il marketing e ho imparato soprattutto a lavorare con gli altri: dividersi un progetto, tenere una scadenza, dire in tempo quando non ce la fai. A chi entra adesso direi di prendersi il primo progetto difficile che passa.",
    name: "«Nome Cognome»",
    role: "«Ruolo» · «Azienda»",
  },
];
