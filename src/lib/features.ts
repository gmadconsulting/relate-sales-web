import {
  CalendarDays,
  ChartColumn,
  Mail,
  Mic,
  SquareCheck,
  SquareKanban,
  Users,
  type LucideIcon,
} from 'lucide-react'

/*
 * Contenuti delle pagine funzione (/prodotto/<slug>).
 * Regola: descrivere solo ciò che esiste nel gestionale oggi (vedi le schermate reali
 * e la sezione "Da verificare sul prodotto" del documento di copy).
 */

/** Schermate disponibili per i visual (vedi components/mockups/registry.tsx). */
export type ScreenKey =
  | 'dashboard'
  | 'pipeline'
  | 'dealSheet'
  | 'contacts'
  | 'contactProfile'
  | 'activities'
  | 'calendar'
  | 'mail'
  | 'recordings'

/** Rettangolo della schermata (in px reali 1480×860) da inquadrare in primo piano. */
export type Crop = { x: number; y: number; w: number; h: number }

export type Visual = { screen: ScreenKey; crop?: Crop }

export type Feature = {
  slug: string
  name: string
  group: 'Vendite' | 'Comunicazione'
  icon: LucideIcon
  /** Riga breve nel mega-menu */
  menu: string
  title: string
  subtitle: string
  hero: Visual
  highlights: { t: string; d: string }[]
  blocks: {
    eyebrow: string
    title: string
    text: string
    points: string[]
    visual: Visual
  }[]
  steps: { title: string; items: { t: string; d: string }[] }
  details: { t: string; d: string }[]
}

export const FEATURES: Feature[] = [
  {
    slug: 'panoramica',
    name: 'Panoramica',
    group: 'Vendite',
    icon: ChartColumn,
    menu: 'Come vanno le vendite, in una schermata',
    title: 'Come vanno le vendite, in una schermata.',
    subtitle:
      'Trattative aperte, valore in ballo, trattative chiuse, quelle ferme. Apri e sai. Niente giro delle scrivanie, niente riunione del venerdì.',
    hero: { screen: 'dashboard' },
    highlights: [
      {
        t: 'Gli indicatori che contano.',
        d: 'Nuovi contatti, ricavi, conversione, trattative chiuse e clienti visitati, sempre aggiornati.',
      },
      {
        t: 'Ogni numero, a confronto.',
        d: 'Accanto a ogni indicatore vedi come è cambiato rispetto al periodo precedente.',
      },
      {
        t: 'Pronta dal primo giorno.',
        d: 'Nessun cruscotto da costruire: la panoramica è già impostata per chi vende nell’industria.',
      },
    ],
    blocks: [
      {
        eyebrow: 'Periodo e confronto',
        title: 'Il periodo che ti serve, con un clic.',
        text: 'Sette giorni, trenta giorni, trimestre o anno: scegli l’intervallo e tutti gli indicatori si aggiornano insieme. Con Confronta metti a fianco due periodi e vedi subito cosa è cambiato.',
        points: [
          'Intervalli predefiniti e date personalizzate',
          'Confronto con il periodo precedente',
          'Report PDF pronto da condividere',
        ],
        visual: {
          screen: 'dashboard',
          crop: { x: 248, y: 0, w: 1232, h: 420 },
        },
      },
      {
        eyebrow: 'Contatti per fase',
        title: 'Dove si fermano le trattative.',
        text: 'Quante trattative ci sono in ogni fase, quanto pesano sul totale e quanto valgono. Quando una fase trattiene troppe trattative, la panoramica lo segnala prima che diventi un problema.',
        points: [
          'Distribuzione per fase con percentuali',
          'Valore in ballo fase per fase',
          'Avviso sui colli di bottiglia',
        ],
        visual: {
          screen: 'dashboard',
          crop: { x: 262, y: 245, w: 800, h: 560 },
        },
      },
      {
        eyebrow: 'Attività aperte',
        title: 'Le cose da fare che non possono aspettare.',
        text: 'Le attività aperte della squadra, ognuna con la sua trattativa e la sua scadenza. Quelle in ritardo sono in evidenza, così sai su cosa intervenire.',
        points: [
          'Scadenze in evidenza',
          'Collegate a cliente e fase',
          'Un clic per aprire la trattativa',
        ],
        visual: {
          screen: 'dashboard',
          crop: { x: 1040, y: 245, w: 440, h: 420 },
        },
      },
    ],
    steps: {
      title: 'Una lettura in quattro passaggi.',
      items: [
        {
          t: 'Apri la panoramica.',
          d: 'I numeri del periodo sono già calcolati, senza filtri da impostare.',
        },
        {
          t: 'Guarda gli indicatori.',
          d: 'Cinque numeri ti dicono come sta andando, rispetto a prima.',
        },
        {
          t: 'Trova il collo di bottiglia.',
          d: 'Contatti per fase mostra dove le trattative si accumulano.',
        },
        {
          t: 'Intervieni.',
          d: 'Dalle attività aperte arrivi alla trattativa da sbloccare.',
        },
      ],
    },
    details: [
      {
        t: 'Ricavi del periodo',
        d: 'Il valore delle trattative chiuse, aggiornato in tempo reale.',
      },
      {
        t: 'Tasso di conversione',
        d: 'Quante trattative arrivano fino all’ordine.',
      },
      {
        t: 'Clienti visitati',
        d: 'Le visite registrate nel periodo, dalla squadra.',
      },
      {
        t: 'Report PDF',
        d: 'La panoramica esportata, pronta per la riunione con i soci.',
      },
      {
        t: 'Trattative ferme',
        d: 'Quelle senza passaggi da troppi giorni, in evidenza.',
      },
      { t: 'Dal telefono', d: 'Gli stessi numeri, dal browser del telefono.' },
    ],
  },
  {
    slug: 'trattative',
    name: 'Trattative',
    group: 'Vendite',
    icon: SquareKanban,
    menu: 'Ogni trattativa è una tessera che avanza',
    title: 'Ogni trattativa è una tessera che avanza.',
    subtitle:
      'Primo contatto, sopralluogo, preventivo, trattativa, ordine. Il percorso è già pronto e lo adattiamo alle tue fasi. Quando una trattativa va avanti, sposti la tessera. Fine.',
    hero: { screen: 'pipeline' },
    highlights: [
      {
        t: 'Le tue fasi, non le nostre.',
        d: 'Il percorso è impostato sul tuo modo di vendere e si cambia quando serve.',
      },
      {
        t: 'Ferme, in evidenza.',
        d: 'Ogni tessera dice da quanti giorni la trattativa non fa un passo avanti.',
      },
      {
        t: 'In tempo reale con il team.',
        d: 'Quando un commerciale sposta una tessera, tutti vedono lo stesso stato.',
      },
    ],
    blocks: [
      {
        eyebrow: 'La bacheca',
        title: 'Tutta la pipeline, in colonne.',
        text: 'Una colonna per fase, con il numero di trattative e il valore complessivo. Sposti la tessera quando la trattativa avanza: il passaggio di fase si registra da solo.',
        points: [
          'Conteggio e valore per colonna',
          'Più pipeline, se vendi linee diverse',
          'Filtri Solo ferme e Assegnate a me',
        ],
        visual: { screen: 'pipeline', crop: { x: 248, y: 0, w: 1232, h: 640 } },
      },
      {
        eyebrow: 'La tessera',
        title: 'Tutto quello che serve sapere, a colpo d’occhio.',
        text: 'Il cliente e il valore. Da quanti giorni è ferma. Se il commerciale è già stato in visita. Chi la segue. La trattativa ferma da tre settimane si vede subito, prima che si raffreddi.',
        points: [
          'Giorni in fase o «Ferma da»',
          'Visitato, In target, Priorità',
          'Chiamata con un tocco',
        ],
        visual: {
          screen: 'pipeline',
          crop: { x: 850, y: 150, w: 620, h: 470 },
        },
      },
      {
        eyebrow: 'La scheda',
        title: 'Ogni trattativa, nel dettaglio.',
        text: 'Dalla tessera apri la scheda: chiami, scrivi, fissi un appuntamento o crei una task senza cambiare pagina. Fase, tentativi di chiamata, valore e scadenza sono tutti nello stesso posto.',
        points: [
          'Dettagli, Task, Chat, Note, Documenti, Storico',
          'Avanzamento di fase visibile',
          'Segna come scartata o persa',
        ],
        visual: {
          screen: 'dealSheet',
          crop: { x: 390, y: 20, w: 700, h: 840 },
        },
      },
    ],
    steps: {
      title: 'Dal primo contatto all’ordine.',
      items: [
        {
          t: 'Crei la trattativa.',
          d: 'Scegli il cliente e la trattativa entra nella prima fase.',
        },
        {
          t: 'La fai avanzare.',
          d: 'Sposti la tessera: fase e giorni in fase si aggiornano da soli.',
        },
        {
          t: 'Non la perdi di vista.',
          d: 'Se si ferma, la tessera lo dice prima che si raffreddi.',
        },
        {
          t: 'La chiudi.',
          d: 'Ordine, scartata o persa: l’esito resta nello storico.',
        },
      ],
    },
    details: [
      {
        t: 'Fasi personalizzate',
        d: 'Aggiungi, rinomina e riordina le fasi della pipeline.',
      },
      {
        t: 'Più pipeline',
        d: 'Percorsi separati per prodotti o mercati diversi.',
      },
      {
        t: 'Tentativi di chiamata',
        d: 'Ogni chiamata viene registrata sulla trattativa.',
      },
      {
        t: 'Chat della trattativa',
        d: 'La squadra ne parla dentro la scheda, non in un’altra app.',
      },
      { t: 'Documenti', d: 'Offerte e allegati legati alla trattativa.' },
      { t: 'Storico', d: 'Tutti i passaggi della trattativa, in ordine.' },
    ],
  },
  {
    slug: 'contatti',
    name: 'Contatti',
    group: 'Vendite',
    icon: Users,
    menu: 'Ogni cliente, con la sua scheda',
    title: 'Ogni cliente, con la sua scheda.',
    subtitle:
      'Recapiti, persone di riferimento, trattative, documenti. Quando un commerciale cambia zona o lascia l’azienda, chi arriva dopo trova tutto. I clienti restano all’azienda.',
    hero: { screen: 'contacts' },
    highlights: [
      {
        t: 'Una rubrica per tutta l’azienda.',
        d: 'Clienti e potenziali clienti in un unico elenco, con fase, ruolo e settore.',
      },
      {
        t: 'Le persone giuste.',
        d: 'Per ogni azienda, chi decide e chi segue gli acquisti.',
      },
      {
        t: 'Il cliente resta in azienda.',
        d: 'La storia del cliente non vive più nel telefono di un commerciale.',
      },
    ],
    blocks: [
      {
        eyebrow: 'La rubrica',
        title: 'Tutti i clienti, ordinati come lavori tu.',
        text: 'Cerca, filtra per fase, organizza in liste. Seleziona più contatti per lavorarli insieme. Importi l’elenco esistente e lo esporti quando vuoi.',
        points: [
          'Liste personalizzate',
          'Importa ed esporta',
          'Filtro per fase, ruolo e settore',
        ],
        visual: { screen: 'contacts', crop: { x: 248, y: 0, w: 1232, h: 640 } },
      },
      {
        eyebrow: 'Profilo 360°',
        title: 'La scheda del cliente, completa.',
        text: 'Anagrafica, persone di riferimento, trattative aperte e documenti in un’unica pagina. Da qui chiami, scrivi o apri una nuova trattativa.',
        points: [
          'Persona principale e secondo contatto',
          'Anagrafica sempre modificabile',
          'Azioni rapide: Chiama, Email, Trattativa',
        ],
        visual: {
          screen: 'contactProfile',
          crop: { x: 248, y: 0, w: 1232, h: 860 },
        },
      },
      {
        eyebrow: 'Documenti e registrazioni',
        title: 'Offerte e conversazioni, al loro posto.',
        text: 'Offerte, preventivi e contratti sono archiviati nella scheda del cliente. Le conversazioni registrate si collegano al contatto, con il riassunto sempre a portata di mano.',
        points: [
          'Documenti per cliente',
          'Registrazioni collegate al contatto',
          'Task del cliente nella stessa pagina',
        ],
        visual: {
          screen: 'contactProfile',
          crop: { x: 650, y: 50, w: 830, h: 760 },
        },
      },
    ],
    steps: {
      title: 'Quando un commerciale se ne va, il cliente resta.',
      items: [
        {
          t: 'Carichiamo i tuoi clienti.',
          d: 'Partiamo dal tuo Excel: la rubrica è pronta il primo giorno.',
        },
        {
          t: 'Ogni contatto ha un responsabile.',
          d: 'Sai sempre chi segue quel cliente.',
        },
        {
          t: 'La storia si accumula.',
          d: 'Trattative, documenti e conversazioni restano sulla scheda.',
        },
        {
          t: 'Il passaggio è immediato.',
          d: 'Chi subentra trova tutto, senza chiedere a nessuno.',
        },
      ],
    },
    details: [
      { t: 'Ricerca istantanea', d: 'Per nome, azienda o email.' },
      { t: 'Fase del cliente', d: 'Lo stato commerciale, visibile in elenco.' },
      { t: 'Ruolo e settore', d: 'Colonne per capire subito con chi parli.' },
      { t: 'Selezione multipla', d: 'Azioni su più contatti insieme.' },
      {
        t: 'Anteprima rapida',
        d: 'Il riepilogo del cliente senza lasciare l’elenco.',
      },
      {
        t: 'I dati restano tuoi',
        d: 'Esporti clienti e trattative quando vuoi.',
      },
    ],
  },
  {
    slug: 'attivita',
    name: 'Attività',
    group: 'Vendite',
    icon: SquareCheck,
    menu: 'Il prossimo passo di ogni trattativa',
    title: 'Il prossimo passo di ogni trattativa.',
    subtitle:
      'Ogni trattativa ha sempre una cosa da fare, con una data e un responsabile. Il preventivo mandato tre settimane fa non resta più senza risposta.',
    hero: { screen: 'activities' },
    highlights: [
      {
        t: 'Sempre un prossimo passo.',
        d: 'Ogni attività è legata a una trattativa e a una persona.',
      },
      {
        t: 'Scadenze che si vedono.',
        d: 'Le attività in ritardo sono in rosso, impossibili da ignorare.',
      },
      {
        t: 'Organizzate per fase.',
        d: 'Vedi cosa c’è da fare in ogni punto della pipeline.',
      },
    ],
    blocks: [
      {
        eyebrow: 'Per fase',
        title: 'Le attività, dove servono.',
        text: 'Le attività sono ordinate nelle stesse fasi delle trattative: vedi subito cosa manca per far avanzare quelle in preventivo o in sopralluogo.',
        points: [
          'Colonne per fase',
          'Da fare, Completate, Tutte',
          'Un cerchio da spuntare per chiudere',
        ],
        visual: {
          screen: 'activities',
          crop: { x: 248, y: 0, w: 1232, h: 600 },
        },
      },
      {
        eyebrow: 'Filtri',
        title: 'Trovi la cosa giusta in un secondo.',
        text: 'Ordina per scadenza, filtra per periodo o per chi ha creato l’attività. Cerca nel testo delle attività, delle trattative e delle note.',
        points: [
          'Ordina per scadenza più vicina',
          'Filtra per scadenza e autore',
          'Ricerca anche nelle note',
        ],
        visual: {
          screen: 'activities',
          crop: { x: 262, y: 105, w: 1150, h: 300 },
        },
      },
      {
        eyebrow: 'Dalla scheda cliente',
        title: 'Una nuova task, mentre sei al telefono.',
        text: 'Crei l’attività direttamente dalla scheda del cliente o della trattativa, con la scadenza. Si scrive in pochi secondi, anche dettandola.',
        points: ['Scadenza in un clic', 'Collegata al cliente', 'Anche a voce'],
        visual: {
          screen: 'contactProfile',
          crop: { x: 650, y: 50, w: 830, h: 250 },
        },
      },
    ],
    steps: {
      title: 'Nessuna trattativa senza un prossimo passo.',
      items: [
        { t: 'Fissi il passo.', d: 'Cosa fare, entro quando, chi lo fa.' },
        { t: 'Lo trovi pronto.', d: 'La mattina apri le attività di oggi.' },
        {
          t: 'Lo chiudi.',
          d: 'Una spunta e l’attività passa tra le completate.',
        },
        {
          t: 'Fissi il successivo.',
          d: 'La trattativa non resta mai ferma senza motivo.',
        },
      ],
    },
    details: [
      { t: 'Responsabile', d: 'Ogni attività ha la sua persona.' },
      { t: 'Scadenza', d: 'Con evidenza automatica dei ritardi.' },
      { t: 'Note e allegati', d: 'Il contesto dell’attività, nella scheda.' },
      {
        t: 'Contatore nel menu',
        d: 'Il numero di attività aperte, sempre visibile.',
      },
      {
        t: 'In panoramica',
        d: 'Le attività aperte compaiono anche nella panoramica.',
      },
      {
        t: 'Dal telefono',
        d: 'Le attività di oggi, a portata di mano in visita.',
      },
    ],
  },
  {
    slug: 'calendario',
    name: 'Calendario',
    group: 'Comunicazione',
    icon: CalendarDays,
    menu: 'Visite e appuntamenti, in un’agenda sola',
    title: 'Visite e appuntamenti, in un’agenda sola.',
    subtitle:
      'Si collega a Google o Outlook con un clic. Gli appuntamenti sono legati al cliente: dal calendario apri la sua scheda.',
    hero: { screen: 'calendar' },
    highlights: [
      {
        t: 'Google e Outlook.',
        d: 'Colleghi il tuo calendario con un clic e i tuoi impegni compaiono nel gestionale.',
      },
      {
        t: 'Legati al cliente.',
        d: 'Ogni appuntamento porta alla scheda del cliente.',
      },
      {
        t: 'Personale o aziendale.',
        d: 'La tua agenda o quella di tutta la squadra.',
      },
    ],
    blocks: [
      {
        eyebrow: 'La settimana',
        title: 'Giorno, settimana o mese.',
        text: 'La vista che preferisci, con l’ora corrente sempre in evidenza. Gli appuntamenti hanno colori diversi per tipo: visita dal vivo, telefono o video, impegno interno.',
        points: [
          'Vista giorno, settimana, mese',
          'Legenda per tipo di appuntamento',
          'Personale e aziendale',
        ],
        visual: { screen: 'calendar', crop: { x: 248, y: 0, w: 960, h: 760 } },
      },
      {
        eyebrow: 'Calendari collegati',
        title: 'I tuoi impegni, già dentro.',
        text: 'Colleghi Google o Outlook e gli appuntamenti arrivano nel gestionale. Puoi aggiornare la sincronizzazione quando vuoi.',
        points: [
          'Google Calendar e Outlook',
          'Aggiornamento con un clic',
          'Nessuna configurazione tecnica',
        ],
        visual: {
          screen: 'calendar',
          crop: { x: 1135, y: 165, w: 345, h: 500 },
        },
      },
      {
        eyebrow: 'Link di prenotazione',
        title: 'Il cliente sceglie l’orario.',
        text: 'Generi un link monouso e lo mandi al cliente: sceglie lui quando incontrarvi, senza scambi di email.',
        points: [
          'Link monouso',
          'Niente rimbalzi di disponibilità',
          'L’appuntamento entra in agenda',
        ],
        visual: {
          screen: 'calendar',
          crop: { x: 1135, y: 440, w: 345, h: 300 },
        },
      },
    ],
    steps: {
      title: 'Dalla visita fissata alla visita fatta.',
      items: [
        {
          t: 'Fissi l’appuntamento.',
          d: 'Dalla scheda del cliente o dal calendario.',
        },
        {
          t: 'Lo ritrovi in agenda.',
          d: 'Con il tipo di incontro e il cliente collegato.',
        },
        { t: 'Vai in visita.', d: 'La visita risulta sulla trattativa.' },
        {
          t: 'Fissi il prossimo passo.',
          d: 'Una task con la data, prima di uscire.',
        },
      ],
    },
    details: [
      {
        t: 'Fissa appuntamento',
        d: 'Dal calendario o dalla scheda trattativa.',
      },
      {
        t: 'Ora corrente',
        d: 'La linea rossa ti dice dove sei nella giornata.',
      },
      { t: 'Vai a oggi', d: 'Un clic per tornare alla settimana in corso.' },
      { t: 'Tipi di incontro', d: 'Dal vivo, telefono o video, interno.' },
      {
        t: 'Vista aziendale',
        d: 'Gli appuntamenti della squadra, per chi coordina.',
      },
      { t: 'Scheda cliente', d: 'Dall’appuntamento al cliente, in un clic.' },
    ],
  },
  {
    slug: 'posta',
    name: 'Posta',
    group: 'Comunicazione',
    icon: Mail,
    menu: 'Le email ai clienti, senza uscire dal gestionale',
    title: 'Le email ai clienti, senza uscire dal gestionale.',
    subtitle:
      'Colleghi la tua casella Gmail o Outlook con un clic. Leggi e rispondi come sei abituato, con le conversazioni in ordine, e quando scrivi a un cliente il suo indirizzo lo trovi già tra i contatti.',
    hero: { screen: 'mail' },
    highlights: [
      {
        t: 'La tua casella, collegata.',
        d: 'Gmail o Outlook, con un clic. Nessun nuovo indirizzo da imparare.',
      },
      {
        t: 'Conversazioni in ordine.',
        d: 'In arrivo e inviate, con i messaggi raggruppati per conversazione.',
      },
      {
        t: 'Indirizzi già pronti.',
        d: 'Scrivi a un cliente e il suo indirizzo è già tra i contatti.',
      },
    ],
    blocks: [
      {
        eyebrow: 'La casella',
        title: 'Leggi come sei abituato.',
        text: 'In arrivo e inviate, ricerca e conversazioni raggruppate. Tutto quello che ti aspetti da una casella di posta, accanto ai tuoi clienti.',
        points: [
          'In arrivo e Inviate',
          'Ricerca nella casella',
          'Conversazioni raggruppate',
        ],
        visual: { screen: 'mail', crop: { x: 248, y: 0, w: 640, h: 860 } },
      },
      {
        eyebrow: 'Rispondi',
        title: 'Scrivi senza cambiare finestra.',
        text: 'Rispondi dal gestionale con un editor completo: formattazione, link, copia per conoscenza e allegati. L’offerta parte da dove lavori.',
        points: [
          'Grassetto, corsivo, link',
          'Cc e allegati',
          'Invio in un clic',
        ],
        visual: { screen: 'mail', crop: { x: 610, y: 280, w: 870, h: 580 } },
      },
      {
        eyebrow: 'Dalla scheda',
        title: 'Un’email al cliente, da dove sei.',
        text: 'Dalla scheda del cliente o della trattativa premi Email: si apre il messaggio con il destinatario già inserito.',
        points: [
          'Destinatario precompilato',
          'Dalla scheda cliente o trattativa',
          'Stessa casella, stesse conversazioni',
        ],
        visual: {
          screen: 'dealSheet',
          crop: { x: 420, y: 100, w: 640, h: 300 },
        },
      },
    ],
    steps: {
      title: 'Attiva in un minuto.',
      items: [
        {
          t: 'Colleghi la casella.',
          d: 'Scegli Gmail o Outlook e autorizzi l’accesso.',
        },
        {
          t: 'Trovi la tua posta.',
          d: 'In arrivo e inviate, come nella tua casella.',
        },
        {
          t: 'Scrivi ai clienti.',
          d: 'Gli indirizzi sono già tra i contatti.',
        },
        {
          t: 'Scolleghi quando vuoi.',
          d: 'Un clic e la casella non è più collegata.',
        },
      ],
    },
    details: [
      { t: 'Gmail e Outlook', d: 'Le due caselle più diffuse in azienda.' },
      { t: 'Ricerca', d: 'Trovi un messaggio in un secondo.' },
      { t: 'Allegati', d: 'Offerte e disegni, in invio e in lettura.' },
      { t: 'Carica altre', d: 'Lo storico della casella, quando ti serve.' },
      { t: 'Scollega', d: 'Il controllo della casella resta a te.' },
      { t: 'Contatti suggeriti', d: 'Il destinatario lo trovi tra i clienti.' },
    ],
  },
  {
    slug: 'registrazioni',
    name: 'Registrazioni',
    group: 'Comunicazione',
    icon: Mic,
    menu: 'Le conversazioni, riassunte e collegate al cliente',
    title: 'Le conversazioni, riassunte e collegate al cliente.',
    subtitle:
      'Le chiamate e gli incontri registrati arrivano nel gestionale con un riassunto ordinato e la trascrizione completa. Li colleghi al contatto e restano nella sua scheda.',
    hero: { screen: 'recordings' },
    highlights: [
      {
        t: 'Riassunto ordinato.',
        d: 'Contesto dell’incontro e punti chiave, già divisi per argomento.',
      },
      {
        t: 'Trascrizione completa.',
        d: 'Quando serve il dettaglio, la conversazione è tutta lì.',
      },
      {
        t: 'Al cliente giusto.',
        d: 'Ogni registrazione si collega al contatto e compare nella sua scheda.',
      },
    ],
    blocks: [
      {
        eyebrow: 'Da collegare',
        title: 'Nessuna conversazione resta orfana.',
        text: 'Le nuove registrazioni compaiono in un elenco con il numero di quelle ancora da collegare. Cerchi il contatto e la colleghi in un clic.',
        points: [
          'Contatore delle registrazioni da collegare',
          'Ricerca per nome, contatto o email',
          'Link alla nota originale',
        ],
        visual: {
          screen: 'recordings',
          crop: { x: 248, y: 0, w: 900, h: 700 },
        },
      },
      {
        eyebrow: 'Nella scheda cliente',
        title: 'La conversazione, accanto al cliente.',
        text: 'Una volta collegata, la registrazione compare nella scheda del contatto con tipo, data e riassunto. Se l’hai collegata per errore, la scolleghi.',
        points: [
          'Tipo e data della conversazione',
          'Riassunto e trascrizione',
          'Scollega dal contatto',
        ],
        visual: {
          screen: 'contactProfile',
          crop: { x: 650, y: 400, w: 830, h: 440 },
        },
      },
      {
        eyebrow: 'Sulla trattativa',
        title: 'Le chiamate, registrate nelle note.',
        text: 'Le chiamate partono dalla scheda della trattativa: il numero viene copiato e la conversazione registrata finisce nelle note.',
        points: [
          'Chiamata dalla scheda',
          'Tentativi di chiamata registrati',
          'Conversazione nelle note',
        ],
        visual: {
          screen: 'dealSheet',
          crop: { x: 420, y: 500, w: 640, h: 320 },
        },
      },
    ],
    steps: {
      title: 'Dalla chiamata alla scheda del cliente.',
      items: [
        {
          t: 'Parli con il cliente.',
          d: 'Al telefono o in un incontro registrato.',
        },
        {
          t: 'Arriva il riassunto.',
          d: 'Contesto e punti chiave, già in ordine.',
        },
        { t: 'Colleghi il contatto.', d: 'Cerchi il cliente e confermi.' },
        {
          t: 'Resta nella scheda.',
          d: 'Chi segue quel cliente ritrova tutto.',
        },
      ],
    },
    details: [
      {
        t: 'Contesto dell’incontro',
        d: 'Di cosa si è parlato, in poche righe.',
      },
      { t: 'Punti chiave', d: 'Gli elementi utili, separati per argomento.' },
      { t: 'Mostra trascrizione', d: 'Il testo completo, quando serve.' },
      { t: 'Nota originale', d: 'Il collegamento alla nota da cui nasce.' },
      { t: 'Contatore nel menu', d: 'Quante registrazioni sono da collegare.' },
      { t: 'Scollega', d: 'Correggi un collegamento sbagliato.' },
    ],
  },
]

export const featureBySlug = (slug: string) =>
  FEATURES.find((f) => f.slug === slug)
