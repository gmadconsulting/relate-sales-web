import { ArrowRight } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useRef, type ReactNode } from 'react'
import { APP_H, APP_W } from '@/components/mockups/AppFrame'
import { DealCard } from '@/components/mockups/DealCard'
import { deals } from '@/components/mockups/data'
import {
  ActivitiesScreen,
  CalendarScreen,
  ContactScreen,
  DashboardScreen,
  MailScreen,
  PipelineScreen,
} from '@/components/mockups/screens'
import { ScaledFrame } from '@/components/ScaledFrame'
import { Container, SectionTitle } from '@/components/ui'
import { EASE, Reveal, useStep, useStickyProgress } from '@/lib/motion'

const staleDeal = deals.find((d) => d.company === 'Meccanica Ferraresi')!

/** La tessera ingrandita: i suoi elementi si staccano, ognuno con una linea e una didascalia. */
function CardAnatomy() {
  const notes = [
    { label: 'Il cliente', top: '17%', side: 'left' },
    { label: 'Da quanti giorni è ferma', top: '56%', side: 'left' },
    { label: 'Il valore', top: '84%', side: 'left' },
    { label: 'Già stato in visita', top: '56%', side: 'right' },
    { label: 'Chi la segue', top: '84%', side: 'right' },
  ] as const
  return (
    <div className="blueprint bg-background shadow-window relative flex h-full items-center justify-center rounded-[14px]">
      <motion.div
        className="relative"
        style={{ width: 280 * 2 }}
        initial={{ scale: 0.6, opacity: 0, filter: 'blur(6px)' }}
        animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
      >
        <div style={{ zoom: 2, width: 280 }}>
          <DealCard deal={staleDeal} highlight />
        </div>
        {notes.map((n, i) => (
          <motion.div
            key={n.label}
            className={`absolute flex -translate-y-1/2 items-center gap-3 ${
              n.side === 'left'
                ? 'right-[calc(100%+12px)] flex-row-reverse'
                : 'left-[calc(100%+12px)]'
            }`}
            style={{ top: n.top }}
            initial={{
              opacity: 0,
              x: n.side === 'left' ? 24 : -24,
              filter: 'blur(4px)',
            }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.6 + i * 0.12 }}
          >
            <span className="bg-primary size-2.5 rounded-full" />
            <motion.span
              className={`bg-primary/60 h-[1.5px] w-14 ${n.side === 'left' ? 'origin-right' : 'origin-left'}`}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.7 + i * 0.12 }}
            />
            <span className="shadow-popover rounded-xl bg-white px-4 py-2.5 text-[22px] font-semibold whitespace-nowrap">
              {n.label}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

const pages: {
  name: string
  slug: string
  title: string
  text: string
  screen: ReactNode
}[] = [
  {
    name: 'Panoramica',
    slug: 'panoramica',
    title: 'Come vanno le vendite, in una schermata.',
    text: 'Trattative aperte, valore in ballo, trattative chiuse, quelle ferme. Apri e sai. Niente giro delle scrivanie, niente riunione del venerdì.',
    screen: <DashboardScreen />,
  },
  {
    name: 'Trattative',
    slug: 'trattative',
    title: 'Ogni trattativa è una tessera che avanza.',
    text: 'Primo contatto, sopralluogo, preventivo, trattativa, ordine. Il percorso è già pronto e lo adattiamo alle tue fasi. Quando una trattativa va avanti, sposti la tessera. Fine.',
    screen: <PipelineScreen />,
  },
  {
    name: 'La tessera',
    slug: 'trattative',
    title: "Tutto quello che serve sapere, a colpo d'occhio.",
    text: 'Il cliente e il valore. Da quanti giorni è ferma. Se il commerciale è già stato in visita. Chi la segue. La trattativa ferma da tre settimane si vede subito, prima che si raffreddi.',
    screen: (
      <div style={{ width: APP_W, height: APP_H }}>
        <CardAnatomy />
      </div>
    ),
  },
  {
    name: 'Contatti',
    slug: 'contatti',
    title: 'Ogni cliente, con la sua scheda.',
    text: "Recapiti, persone di riferimento, trattative, documenti. Quando un commerciale cambia zona o lascia l'azienda, chi arriva dopo trova tutto. I clienti restano all'azienda.",
    screen: <ContactScreen />,
  },
  {
    name: 'Attività',
    slug: 'attivita',
    title: 'Il prossimo passo di ogni trattativa.',
    text: 'Ogni trattativa ha sempre una cosa da fare, con una data e un responsabile. Il preventivo mandato tre settimane fa non resta più senza risposta.',
    screen: <ActivitiesScreen />,
  },
  {
    name: 'Calendario',
    slug: 'calendario',
    title: "Visite e appuntamenti, in un'agenda sola.",
    text: 'Si collega a Google o Outlook con un clic. Gli appuntamenti sono legati al cliente: dal calendario apri la sua scheda.',
    screen: <CalendarScreen />,
  },
  {
    name: 'Posta',
    slug: 'posta',
    title: 'Le email ai clienti, senza uscire dal gestionale.',
    text: 'Colleghi la tua casella Gmail o Outlook con un clic. Leggi e rispondi come sei abituato, con le conversazioni in ordine, e quando scrivi a un cliente il suo indirizzo lo trovi già tra i contatti.',
    screen: <MailScreen />,
  },
]

export function Tour() {
  const ref = useRef<HTMLDivElement>(null)
  const p = useStickyProgress(ref)
  const active = useStep(p, pages.length)

  const goTo = (i: number) => {
    const el = ref.current
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY
    const span = el.offsetHeight - window.innerHeight
    window.scrollTo({
      top: top + ((i + 0.5) / pages.length) * span,
      behavior: 'smooth',
    })
  }

  return (
    <section id="come-funziona" className="bg-background">
      <Container className="pt-24 text-center sm:pt-32">
        <SectionTitle
          eyebrow="La piattaforma"
          text="Sette pagine. Tutto quello che serve per vendere."
        />
        <Reveal delay={0.25}>
          <p className="text-muted mx-auto mt-5 max-w-2xl text-[19px]">
            Nessun modulo da attivare, nessun menu da esplorare. Eccole, una
            alla volta.
          </p>
        </Reveal>
      </Container>

      <div
        ref={ref}
        className="relative"
        style={{ height: `${pages.length * 80}vh` }}
      >
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden pt-16">
          <Container className="grid max-w-7xl items-center gap-6 lg:grid-cols-[300px_1fr] lg:gap-12">
            <div className="relative min-h-[250px] sm:min-h-[200px] lg:min-h-[300px]">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={active}
                  className="lg:absolute lg:inset-x-0 lg:top-1/2 lg:-translate-y-1/2"
                  initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -18, filter: 'blur(6px)' }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  <p className="text-primary text-[13px] font-semibold tracking-[0.08em] uppercase">
                    <span className="tabular">{active + 1}</span>
                    <span className="text-tertiary"> / 7</span> ·{' '}
                    {pages[active].name}
                  </p>
                  <h3 className="mt-3 text-[26px] leading-[1.12] text-balance sm:text-[32px]">
                    {pages[active].title}
                  </h3>
                  <p className="text-muted mt-3 text-[16px] leading-relaxed sm:text-[17px]">
                    {pages[active].text}
                  </p>
                  <a
                    href={`/prodotto/${pages[active].slug}`}
                    className="group text-primary mt-5 inline-flex items-center gap-1.5 text-[15px] font-semibold"
                  >
                    Scopri{' '}
                    {pages[active].slug === 'trattative'
                      ? 'Trattative'
                      : pages[active].name}
                    <ArrowRight
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-0.5"
                    />
                  </a>
                </motion.div>
              </AnimatePresence>
            </div>
            <div
              className="relative"
              style={{ aspectRatio: `${APP_W} / ${APP_H}` }}
            >
              <AnimatePresence initial={false}>
                <motion.div
                  key={active}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 0.985, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 1.01, filter: 'blur(8px)' }}
                  transition={{ duration: 0.6, ease: EASE }}
                >
                  <ScaledFrame width={APP_W} height={APP_H}>
                    {pages[active].screen}
                  </ScaledFrame>
                </motion.div>
              </AnimatePresence>
            </div>
          </Container>
          <Container className="mt-6 lg:mt-8">
            <div
              className="flex items-center justify-center gap-1"
              role="tablist"
              aria-label="Pagine del gestionale"
            >
              {pages.map((pg, i) => (
                <button
                  key={pg.name}
                  role="tab"
                  aria-selected={i === active}
                  aria-label={pg.name}
                  onClick={() => goTo(i)}
                  className="group relative grid h-7 place-items-center px-1.5"
                >
                  <span className="bg-tertiary group-hover:bg-muted block size-1.5 rounded-full transition-colors" />
                  {i === active && (
                    <motion.span
                      layoutId="tour-dot"
                      className="bg-primary absolute top-1/2 left-1/2 h-1.5 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full"
                      transition={{
                        type: 'spring',
                        stiffness: 380,
                        damping: 34,
                      }}
                    />
                  )}
                </button>
              ))}
            </div>
          </Container>
        </div>
      </div>

      <Container className="pb-24 text-center sm:pb-32">
        <SectionTitle
          className="!text-[26px] sm:!text-[34px]"
          text="Sette pagine, sempre le stesse."
          accent="Le impari una volta."
        />
      </Container>
    </section>
  )
}
