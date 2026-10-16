import { Plus } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { Container, SectionTitle } from '@/components/ui'
import { EASE, Item, Stagger } from '@/lib/motion'

const faqs = [
  [
    'Quanto ci vuole per partire?',
    "Lo impostiamo noi: fasi delle trattative e clienti dal tuo Excel. A te resta mezz'ora. Poi un'ora di formazione con la squadra, e si lavora dal giorno stesso.",
  ],
  [
    'I miei commerciali lo useranno davvero?',
    'Lo usano perché gli toglie lavoro: chiamano con un tocco, mandano le email da lì, e non devono scrivere rapporti. È un aiuto, non un compito in più.',
  ],
  [
    'Ho già un gestionale per la contabilità. Serve anche questo?',
    "Il gestionale contabile segue quello che hai già venduto. RelateSales segue quello che stai ancora vendendo: contatti, visite, preventivi, trattative. Lavorano uno accanto all'altro.",
  ],
  [
    'Funziona dal telefono?',
    'Sì. Si apre dal browser del telefono, come un sito, e si chiama il cliente con un tocco.',
  ],
  [
    'Si collega alla mia posta e alla mia agenda?',
    'Sì. Colleghi Gmail o Outlook e il tuo calendario con un clic.',
  ],
  [
    'Quanti utenti posso aggiungere?',
    "Quanti vuoi. Il prezzo è per l'azienda, non per persona.",
  ],
  [
    'I dati restano miei?',
    'Sì. Puoi esportare clienti e trattative quando vuoi.',
  ],
  [
    'Cosa succede dopo la demo?',
    "Se decidi di partire, impostiamo il gestionale e fissiamo l'ora di formazione con la squadra. Se non fa per te, te lo diciamo noi per primi.",
  ],
]

function Question({ q, a, i }: { q: string; a: string; i: number }) {
  const [open, setOpen] = useState(false)
  const id = `faq-${i}`
  return (
    <Item className="border-separator border-b-[0.5px]">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={id}
        className="group flex w-full items-center justify-between gap-6 py-5 text-left text-[18px] font-semibold"
      >
        {q}
        <motion.span
          className="bg-fill grid size-8 shrink-0 place-items-center rounded-full transition-colors duration-200 group-hover:bg-black/12"
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 28 }}
        >
          <Plus size={16} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.4, ease: EASE },
              opacity: { duration: 0.25 },
            }}
            className="overflow-hidden"
          >
            <motion.p
              className="text-muted max-w-2xl pr-12 pb-6 text-[17px] leading-relaxed"
              initial={{ y: -6, filter: 'blur(4px)' }}
              animate={{ y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              {a}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </Item>
  )
}

export function Faq() {
  return (
    <section id="domande" className="bg-white py-24 sm:py-32">
      <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <SectionTitle text="Domande frequenti" />
        <Stagger className="border-separator border-t-[0.5px]" gap={0.05}>
          {faqs.map(([q, a], i) => (
            <Question key={q} q={q} a={a} i={i} />
          ))}
        </Stagger>
      </Container>
    </section>
  )
}
