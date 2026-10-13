import { Check } from 'lucide-react'
import { motion } from 'motion/react'
import { Container, SectionTitle } from '@/components/ui'
import { EASE, Reveal } from '@/lib/motion'

const rows = [
  [
    'Schede con quaranta campi obbligatori',
    'Solo quello che serve per vendere',
  ],
  [
    'Lead, contatti, account e opportunità da "convertire"',
    'Un cliente, una tessera',
  ],
  [
    'Automazioni da programmare con regole',
    'Tentativi di chiamata e giorni di fermo, registrati da soli',
  ],
  ['Sequenze di email e campagne', 'Le email le mandi tu, dal gestionale'],
  [
    "Punteggi e previsioni dell'intelligenza artificiale",
    'In target o no, lo decidi tu',
  ],
  ['Cruscotti da costruire', 'Panoramica già pronta'],
  ['Centinaia di moduli e integrazioni', 'Sette pagine, sempre le stesse'],
  ['Classifiche e gare fra venditori', 'Il lavoro, non la gara'],
  [
    'Permessi da configurare voce per voce',
    'Tre ruoli: titolare, responsabile, commerciale',
  ],
  ['Costi per ogni utente', "Un prezzo per tutta l'azienda"],
]

function Row({ before, after }: { before: string; after: string }) {
  return (
    <motion.div
      className="border-separator grid grid-cols-2 gap-4 border-b-[0.5px] py-4 sm:gap-10 sm:py-5"
      initial="off"
      whileInView="on"
      viewport={{ once: true, margin: '0px 0px -30% 0px' }}
    >
      <span className="text-muted self-center text-[15px] sm:text-[18px]">
        <span className="relative">
          {before}
          <motion.span
            className="bg-foreground/55 absolute top-[55%] left-0 h-px w-full origin-left"
            variants={{
              off: { scaleX: 0 },
              on: { scaleX: 1, transition: { duration: 0.7, ease: EASE } },
            }}
          />
        </span>
      </span>
      <motion.span
        className="flex items-start gap-2.5 text-[15px] font-semibold sm:text-[18px]"
        variants={{
          off: { opacity: 0.25, filter: 'blur(2px)' },
          on: {
            opacity: 1,
            filter: 'blur(0px)',
            transition: { duration: 0.5, ease: EASE, delay: 0.45 },
          },
        }}
      >
        <motion.span
          className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full sm:size-6"
          variants={{
            off: { scale: 0.6, backgroundColor: '#D1D1D6' },
            on: {
              scale: 1,
              backgroundColor: '#FD6C01',
              transition: {
                type: 'spring',
                stiffness: 500,
                damping: 20,
                delay: 0.45,
              },
            },
          }}
        >
          <Check size={13} strokeWidth={3} className="text-white" />
        </motion.span>
        {after}
      </motion.span>
    </motion.div>
  )
}

export function Removed() {
  return (
    <section id="cosa-abbiamo-tolto" className="py-24 sm:py-32">
      <Container className="max-w-5xl">
        <SectionTitle text="Il CRM più completo? Non siamo noi." />
        <Reveal delay={0.2}>
          <p className="text-muted mt-5 max-w-2xl text-[19px]">
            Ogni funzione in più è un motivo in più per non aprirlo. Queste le
            abbiamo tolte apposta.
          </p>
        </Reveal>
        <Reveal className="shadow-card mt-12 rounded-[14px] bg-white px-5 sm:px-8">
          <div className="border-separator text-muted grid grid-cols-2 gap-4 border-b-[0.5px] pt-6 pb-3 text-[11px] font-semibold tracking-[0.08em] uppercase sm:gap-10 sm:text-[12px]">
            <span>Negli altri CRM</span>
            <span className="text-primary">In Relate Sales</span>
          </div>
          {rows.map(([b, a]) => (
            <Row key={b} before={b} after={a} />
          ))}
          <SectionTitle
            className="py-8 text-center !text-[24px] sm:!text-[30px]"
            text="Minimo delle funzioni."
            accent="Massimo della semplicità."
            tone="primary"
          />
        </Reveal>
      </Container>
    </section>
  )
}
