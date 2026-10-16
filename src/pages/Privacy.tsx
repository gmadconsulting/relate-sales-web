import { useEffect, useState, type ReactNode } from 'react'
import { motion } from 'motion/react'
import { Container } from '@/components/ui'
import { VideoProvider } from '@/components/VideoDialog'
import { EASE } from '@/lib/motion'
import { LEGAL } from '@/lib/legal'
import { Footer } from '@/sections/Footer'
import { Nav } from '@/sections/Nav'

/* ---------- Mattoni tipografici della pagina ---------- */

function Section({
  id,
  n,
  title,
  children,
}: {
  id: string
  n: number
  title: string
  children: ReactNode
}) {
  return (
    <section
      id={id}
      className="border-separator scroll-mt-28 border-t-[0.5px] py-10 first:border-t-0 first:pt-0"
    >
      <h2 className="flex items-baseline gap-3 text-[22px] leading-snug sm:text-[26px]">
        <span className="tabular text-primary text-[15px] font-semibold">
          {String(n).padStart(2, '0')}
        </span>
        {title}
      </h2>
      <div className="text-foreground/85 mt-4 space-y-4 text-[16px] leading-relaxed">
        {children}
      </div>
    </section>
  )
}

const H3 = ({ children }: { children: ReactNode }) => (
  <h3 className="text-foreground pt-2 text-[17px] font-semibold">{children}</h3>
)

function List({ items }: { items: ReactNode[] }) {
  return (
    <ul className="space-y-2">
      {items.map((it, i) => (
        <li key={i} className="flex gap-3">
          <span className="bg-primary mt-[0.6em] size-1.5 shrink-0 rounded-full" />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  )
}

const Mail = () => (
  <a
    href={`mailto:${LEGAL.email}`}
    className="text-primary hover:text-primary-hover font-medium"
  >
    {LEGAL.email}
  </a>
)

/* ---------- Tabella finalità / basi giuridiche / conservazione ---------- */

const purposes = [
  {
    p: 'Rispondere alla richiesta di demo, ricontattarti e fissare la chiamata',
    d: 'Nome e cognome, azienda, ruolo, email, telefono',
    b: 'Esecuzione di misure precontrattuali adottate su tua richiesta (art. 6, par. 1, lett. b GDPR)',
    r: 'Fino a 24 mesi dall’ultimo contatto, se non diventi cliente',
  },
  {
    p: 'Gestire le comunicazioni che ci invii (email, richieste di informazioni)',
    d: 'Dati di contatto e contenuto del messaggio',
    b: 'Misure precontrattuali (art. 6, par. 1, lett. b) o legittimo interesse a rispondere (art. 6, par. 1, lett. f)',
    r: 'Per il tempo necessario a gestire la richiesta e fino a 24 mesi successivi',
  },
  {
    p: 'Garantire il funzionamento e la sicurezza del sito, prevenire abusi e attacchi informatici',
    d: 'Dati di navigazione (indirizzo IP, data e ora, pagina richiesta, browser, dispositivo)',
    b: 'Legittimo interesse del Titolare alla sicurezza dei propri sistemi (art. 6, par. 1, lett. f)',
    r: 'Di norma non oltre 30 giorni, salvo esigenze di accertamento di incidenti di sicurezza',
  },
  {
    p: 'Adempiere a obblighi di legge e, se necessario, accertare, esercitare o difendere un diritto',
    d: 'I dati strettamente necessari allo scopo',
    b: 'Obbligo di legge (art. 6, par. 1, lett. c) e legittimo interesse alla tutela dei propri diritti (art. 6, par. 1, lett. f)',
    r: 'Per la durata prevista dalla legge o fino alla definizione del procedimento',
  },
]

function PurposesTable() {
  return (
    <div className="shadow-card overflow-hidden rounded-[14px] bg-white">
      <div className="border-separator text-muted hidden grid-cols-[1.3fr_1fr_1.3fr_1fr] gap-5 border-b-[0.5px] px-5 py-3 text-[11px] font-semibold tracking-[0.08em] uppercase md:grid">
        <span>Finalità</span>
        <span>Dati</span>
        <span>Base giuridica</span>
        <span>Conservazione</span>
      </div>
      {purposes.map((r) => (
        <div
          key={r.p}
          className="border-separator grid gap-2 border-b-[0.5px] px-5 py-4 text-[14px] leading-snug last:border-0 md:grid-cols-[1.3fr_1fr_1.3fr_1fr] md:gap-5"
        >
          <span className="text-foreground font-semibold">{r.p}</span>
          <span className="text-muted">
            <span className="text-foreground font-medium md:hidden">
              Dati:{' '}
            </span>
            {r.d}
          </span>
          <span className="text-muted">
            <span className="text-foreground font-medium md:hidden">
              Base giuridica:{' '}
            </span>
            {r.b}
          </span>
          <span className="text-muted">
            <span className="text-foreground font-medium md:hidden">
              Conservazione:{' '}
            </span>
            {r.r}
          </span>
        </div>
      ))}
    </div>
  )
}

/* ---------- Indice ---------- */

const toc = [
  ['titolare', 'Titolare del trattamento'],
  ['ambito', 'A cosa si applica questa informativa'],
  ['dati', 'Quali dati trattiamo'],
  ['finalita', 'Finalità, basi giuridiche e conservazione'],
  ['conferimento', 'Natura del conferimento'],
  ['modalita', 'Modalità di trattamento e sicurezza'],
  ['destinatari', 'A chi comunichiamo i dati'],
  ['trasferimenti', 'Trasferimenti fuori dallo Spazio economico europeo'],
  ['decisioni', 'Decisioni automatizzate'],
  ['diritti', 'I tuoi diritti'],
  ['reclamo', 'Reclamo all’autorità di controllo'],
  ['cookie', 'Cookie e tecnologie simili'],
  ['minori', 'Minori'],
  ['modifiche', 'Modifiche a questa informativa'],
] as const

function Toc() {
  const [active, setActive] = useState<string>(toc[0][0])
  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      // Sezione attiva = l'ultima il cui inizio ha superato il 30% della finestra
      const line = window.innerHeight * 0.3
      let current: string = toc[0][0]
      for (const [id] of toc) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= line) current = id
      }
      setActive(current)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <nav aria-label="Indice" className="sticky top-28 hidden lg:block">
      <p className="text-muted mb-3 text-[11px] font-semibold tracking-[0.08em] uppercase">
        Indice
      </p>
      <ol className="space-y-0.5">
        {toc.map(([id, label], i) => (
          <li key={id} className="relative">
            {active === id && (
              <motion.span
                layoutId="toc-active"
                className="shadow-card absolute inset-0 rounded-lg bg-white"
                transition={{ type: 'spring', stiffness: 420, damping: 36 }}
              />
            )}
            <a
              href={`#${id}`}
              className={`relative flex gap-2 rounded-lg px-2.5 py-1.5 text-[13px] leading-snug transition-colors duration-200 ${
                active === id
                  ? 'text-foreground font-semibold'
                  : 'text-muted hover:text-foreground'
              }`}
            >
              <span className="tabular text-tertiary w-4 shrink-0">
                {i + 1}
              </span>
              {label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}

/* ---------- Pagina ---------- */

export function PrivacyPage() {
  useEffect(() => {
    document.title = 'Informativa privacy — RelateSales'
    const id = window.location.hash.slice(1)
    if (id)
      requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView())
  }, [])

  return (
    <VideoProvider>
      <Nav />
      <main className="pt-32 pb-24 sm:pt-40">
        <Container>
          <motion.header
            className="max-w-3xl"
            initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
          >
            <p className="text-primary text-[13px] font-semibold tracking-[0.08em] uppercase">
              Documenti legali
            </p>
            <h1 className="mt-4 text-[40px] leading-[1.05] sm:text-[56px]">
              Informativa privacy
            </h1>
            <p className="text-muted mt-5 text-[19px] leading-relaxed">
              Come trattiamo i dati personali di chi visita questo sito e di chi
              ci contatta, ai sensi degli artt. 13 e 14 del Regolamento (UE)
              2016/679 («GDPR»).
            </p>
            <p className="text-muted mt-6 text-[14px]">
              Ultimo aggiornamento: {LEGAL.privacyUpdated}
            </p>
          </motion.header>

          <motion.div
            className="mt-14 grid gap-12 lg:grid-cols-[250px_1fr] lg:gap-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
          >
            <aside>
              <Toc />
            </aside>

            <article className="max-w-3xl">
              <div className="shadow-card mb-10 rounded-[14px] bg-white p-5 text-[15px] leading-relaxed sm:p-6">
                <p className="font-semibold">In breve</p>
                <p className="text-muted mt-2">
                  Raccogliamo solo i dati che ci servono per risponderti e per
                  far funzionare il sito in sicurezza. Non li vendiamo, non li
                  usiamo per profilarti e non installiamo cookie di
                  tracciamento. Puoi chiederci in qualsiasi momento di vederli,
                  correggerli o cancellarli scrivendo a <Mail />.
                </p>
              </div>

              <Section id="titolare" n={1} title="Titolare del trattamento">
                <p>
                  Il titolare del trattamento è <strong>{LEGAL.company}</strong>
                  , {LEGAL.form}, con sede in {LEGAL.address} (di seguito il
                  «Titolare» o «noi»), che gestisce il servizio RelateSales.
                </p>
                <p>
                  Per qualsiasi domanda su questa informativa o per esercitare i
                  tuoi diritti puoi scrivere a <Mail />.
                </p>
                <p>
                  Non è stato nominato un responsabile della protezione dei dati
                  (DPO), non ricorrendo le condizioni previste dall’art. 37
                  GDPR.
                </p>
              </Section>

              <Section
                id="ambito"
                n={2}
                title="A cosa si applica questa informativa"
              >
                <p>
                  Questa informativa riguarda il sito web di RelateSales e i
                  contatti che avvengono tramite il sito, il modulo di richiesta
                  demo e l’indirizzo email indicato sopra.
                </p>
                <p>
                  Non riguarda i dati che le aziende clienti inseriscono nel
                  gestionale RelateSales (ad esempio i propri clienti, contatti
                  e trattative). Per quei dati l’azienda cliente è titolare del
                  trattamento e {LEGAL.company} agisce come responsabile del
                  trattamento ai sensi dell’art. 28 GDPR, sulla base di un
                  apposito accordo sul trattamento dei dati.
                </p>
              </Section>

              <Section id="dati" n={3} title="Quali dati trattiamo">
                <H3>Dati di navigazione</H3>
                <p>
                  I sistemi che fanno funzionare il sito acquisiscono, durante
                  il normale utilizzo, alcuni dati la cui trasmissione è
                  implicita nell’uso dei protocolli di comunicazione di
                  Internet: indirizzo IP, data e ora della richiesta, pagina
                  visitata, tipo di browser e di dispositivo, sistema operativo.
                  Questi dati servono a erogare le pagine, a garantirne la
                  sicurezza e a individuare eventuali abusi; non vengono usati
                  per identificarti o profilarti.
                </p>
                <H3>Dati che ci fornisci tu</H3>
                <p>Quando compili il modulo «Richiedi una demo» trattiamo:</p>
                <List
                  items={[
                    'nome e cognome;',
                    'azienda;',
                    'ruolo in azienda;',
                    'indirizzo email;',
                    'numero di telefono.',
                  ]}
                />
                <p>
                  Quando ci scrivi via email trattiamo il tuo indirizzo, gli
                  altri dati di contatto che decidi di condividere e il
                  contenuto del messaggio. Ti chiediamo di non inviarci
                  categorie particolari di dati (art. 9 GDPR), che non sono
                  necessarie per le finalità descritte.
                </p>
                <H3>Calcolatore</H3>
                <p>
                  I valori inseriti nel calcolatore della pagina vengono
                  elaborati solo nel tuo browser: non vengono inviati né
                  conservati da noi.
                </p>
              </Section>

              <Section
                id="finalita"
                n={4}
                title="Finalità, basi giuridiche e conservazione"
              >
                <p>
                  Trattiamo i dati solo per le finalità indicate di seguito,
                  ciascuna con la propria base giuridica ai sensi dell’art. 6
                  GDPR e un periodo di conservazione definito. Alla scadenza i
                  dati vengono cancellati o resi anonimi in modo irreversibile.
                </p>
                <PurposesTable />
                <p>
                  Quando il trattamento si basa sul legittimo interesse, abbiamo
                  valutato che tale interesse non prevale sui tuoi diritti e
                  sulle tue libertà; puoi comunque opporti in qualsiasi momento
                  (vedi la sezione 10).
                </p>
                <p>
                  Non usiamo i tuoi dati per inviarti newsletter o comunicazioni
                  promozionali. Se in futuro volessimo farlo, ti chiederemo
                  prima un consenso specifico, che potrai revocare quando vuoi.
                </p>
                <p>
                  Se diventi cliente, i dati necessari alla gestione del
                  rapporto contrattuale saranno trattati secondo l’informativa e
                  il contratto che ti forniremo in quella sede.
                </p>
              </Section>

              <Section id="conferimento" n={5} title="Natura del conferimento">
                <p>
                  Il conferimento dei dati richiesti nel modulo è facoltativo,
                  ma è necessario per poterti ricontattare: senza questi dati
                  non possiamo dare seguito alla tua richiesta di demo. I dati
                  di navigazione sono invece raccolti automaticamente per il
                  funzionamento del sito.
                </p>
              </Section>

              <Section
                id="modalita"
                n={6}
                title="Modalità di trattamento e sicurezza"
              >
                <p>
                  I dati sono trattati con strumenti elettronici, secondo i
                  principi di liceità, correttezza, trasparenza, minimizzazione
                  e limitazione della conservazione (art. 5 GDPR). Adottiamo
                  misure tecniche e organizzative adeguate al rischio (art. 32
                  GDPR), tra cui:
                </p>
                <List
                  items={[
                    'connessioni cifrate (HTTPS/TLS) per tutte le pagine e per l’invio del modulo;',
                    'accesso ai dati limitato alle sole persone autorizzate e istruite, per quanto strettamente necessario;',
                    'scelta di fornitori che offrono garanzie adeguate in materia di sicurezza e protezione dei dati;',
                    'procedure per gestire e, quando previsto, notificare le violazioni dei dati personali (artt. 33 e 34 GDPR).',
                  ]}
                />
              </Section>

              <Section id="destinatari" n={7} title="A chi comunichiamo i dati">
                <p>
                  I dati possono essere trattati, per conto del Titolare e solo
                  per le finalità indicate, da:
                </p>
                <List
                  items={[
                    <>
                      fornitori di servizi tecnologici che agiscono come{' '}
                      <strong>responsabili del trattamento</strong> ai sensi
                      dell’art. 28 GDPR, in particolare il fornitore di hosting
                      del sito (Vercel Inc., Stati Uniti) e i fornitori dei
                      servizi di posta elettronica e di gestione dei contatti;
                    </>,
                    'consulenti professionali (ad esempio legali o fiscali), tenuti al segreto professionale o a obblighi di riservatezza, quando necessario;',
                    'autorità pubbliche e giudiziarie, solo se previsto dalla legge o su loro legittima richiesta.',
                  ]}
                />
                <p>
                  L’elenco aggiornato dei responsabili del trattamento è
                  disponibile su richiesta scrivendo a <Mail />. I dati non sono
                  diffusi né venduti a terzi.
                </p>
              </Section>

              <Section
                id="trasferimenti"
                n={8}
                title="Trasferimenti fuori dallo Spazio economico europeo"
              >
                <p>
                  Il Titolare ha sede negli Stati Uniti e alcuni dei fornitori
                  indicati sopra trattano i dati negli Stati Uniti o in altri
                  Paesi al di fuori dello Spazio economico europeo (SEE). Ogni
                  trasferimento avviene nel rispetto del Capo V del GDPR e, in
                  particolare, sulla base di:
                </p>
                <List
                  items={[
                    <>
                      la decisione di adeguatezza della Commissione europea del
                      10 luglio 2023 relativa al{' '}
                      <strong>EU-U.S. Data Privacy Framework</strong> (art. 45
                      GDPR), per i destinatari certificati;
                    </>,
                    <>
                      in mancanza, le{' '}
                      <strong>clausole contrattuali standard</strong> approvate
                      dalla Commissione europea con decisione di esecuzione (UE)
                      2021/914 (art. 46 GDPR), integrate quando necessario da
                      misure tecniche e organizzative supplementari.
                    </>,
                  ]}
                />
                <p>
                  Puoi chiedere informazioni sulle garanzie adottate e ottenerne
                  copia scrivendo a <Mail />.
                </p>
              </Section>

              <Section id="decisioni" n={9} title="Decisioni automatizzate">
                <p>
                  Non adottiamo decisioni basate unicamente su trattamenti
                  automatizzati, compresa la profilazione, che producano effetti
                  giuridici o incidano in modo analogo significativamente sulla
                  tua persona (art. 22 GDPR).
                </p>
              </Section>

              <Section id="diritti" n={10} title="I tuoi diritti">
                <p>
                  In qualsiasi momento, nei limiti previsti dal GDPR, hai il
                  diritto di:
                </p>
                <List
                  items={[
                    <>
                      <strong>accedere</strong> ai tuoi dati e ottenerne copia
                      (art. 15);
                    </>,
                    <>
                      chiederne la <strong>rettifica</strong> se inesatti o
                      incompleti (art. 16);
                    </>,
                    <>
                      chiederne la <strong>cancellazione</strong> (art. 17);
                    </>,
                    <>
                      chiedere la <strong>limitazione</strong> del trattamento
                      (art. 18);
                    </>,
                    <>
                      ricevere i dati in un formato strutturato e leggibile da
                      dispositivo automatico (<strong>portabilità</strong>, art.
                      20);
                    </>,
                    <>
                      <strong>opporti</strong> al trattamento basato sul
                      legittimo interesse, per motivi connessi alla tua
                      situazione particolare (art. 21);
                    </>,
                    <>
                      <strong>revocare il consenso</strong> eventualmente
                      prestato, senza pregiudicare la liceità del trattamento
                      basato sul consenso prima della revoca (art. 7, par. 3).
                    </>,
                  ]}
                />
                <p>
                  Per esercitare i tuoi diritti scrivi a <Mail />. La richiesta
                  è gratuita: ti risponderemo senza ingiustificato ritardo e
                  comunque entro un mese dal ricevimento, termine prorogabile di
                  due mesi nei casi più complessi, di cui ti informeremo (art.
                  12 GDPR). Per tutelare i tuoi dati potremmo chiederti
                  informazioni utili a verificare la tua identità.
                </p>
              </Section>

              <Section
                id="reclamo"
                n={11}
                title="Reclamo all’autorità di controllo"
              >
                <p>
                  Se ritieni che il trattamento dei tuoi dati violi il GDPR, hai
                  il diritto di proporre reclamo all’autorità di controllo dello
                  Stato membro in cui risiedi abitualmente, lavori oppure in cui
                  si è verificata la presunta violazione (art. 77 GDPR). In
                  Italia l’autorità competente è il Garante per la protezione
                  dei dati personali (
                  <a
                    href="https://www.garanteprivacy.it"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary-hover font-medium"
                  >
                    www.garanteprivacy.it
                  </a>
                  ).
                </p>
                <p>
                  Resta fermo il diritto di agire in sede giudiziaria (artt. 78
                  e 79 GDPR).
                </p>
              </Section>

              <Section id="cookie" n={12} title="Cookie e tecnologie simili">
                <p>
                  Questo sito non utilizza cookie di profilazione, cookie di
                  terze parti per finalità pubblicitarie né strumenti di analisi
                  statistica, e non installa sul tuo dispositivo cookie o
                  tecnologie analoghe che richiedano il tuo consenso.
                </p>
                <p>
                  Se in futuro introducessimo strumenti di questo tipo,
                  aggiorneremo questa informativa e, quando previsto dalla
                  direttiva 2002/58/CE (cosiddetta «direttiva ePrivacy») e dalle
                  norme nazionali di recepimento, ti chiederemo il consenso
                  prima di attivarli.
                </p>
              </Section>

              <Section id="minori" n={13} title="Minori">
                <p>
                  Il sito e il servizio RelateSales sono rivolti ad aziende e
                  professionisti. Non raccogliamo consapevolmente dati di minori
                  di 18 anni; se ritieni che ci siano stati comunicati, scrivici
                  e li cancelleremo.
                </p>
              </Section>

              <Section
                id="modifiche"
                n={14}
                title="Modifiche a questa informativa"
              >
                <p>
                  Possiamo aggiornare questa informativa per adeguarla a
                  modifiche normative o a cambiamenti dei nostri servizi. La
                  versione in vigore è sempre pubblicata su questa pagina, con
                  la data dell’ultimo aggiornamento indicata in alto. In caso di
                  modifiche sostanziali ti informeremo con mezzi adeguati.
                </p>
              </Section>

              <div className="text-muted shadow-card mt-6 rounded-[14px] bg-white p-5 text-[14px] leading-relaxed sm:p-6">
                <p className="text-foreground font-semibold">
                  Riferimenti normativi
                </p>
                <p className="mt-2">
                  Regolamento (UE) 2016/679 (GDPR); direttiva 2002/58/CE; D.Lgs.
                  30 giugno 2003, n. 196 («Codice in materia di protezione dei
                  dati personali»), come modificato dal D.Lgs. 10 agosto 2018,
                  n. 101.
                </p>
              </div>
            </article>
          </motion.div>
        </Container>
      </main>
      <Footer />
    </VideoProvider>
  )
}
