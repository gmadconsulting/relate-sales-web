import { motion } from 'motion/react'
import { Container, SectionTitle } from '@/components/ui'
import { EASE, Reveal } from '@/lib/motion'

const steps = [
  {
    t: 'Chiamata conoscitiva, 15 minuti.',
    d: 'Ci racconti come vende la tua azienda.',
  },
  {
    t: 'Demo, 20 minuti.',
    d: 'Ti mostriamo il gestionale sui casi della tua azienda.',
  },
  {
    t: 'Impostazione.',
    d: 'Adattiamo le fasi delle trattative al tuo modo di vendere e carichiamo i tuoi clienti dal tuo Excel.',
  },
  {
    t: "Un'ora con la squadra.",
    d: 'Formazione per tutti, e si lavora dal giorno stesso.',
  },
]

const LINE = 1.6 // secondi per disegnare tutta la linea

export function Start() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <Container>
        <SectionTitle
          className="max-w-4xl"
          text="Ci mandi il tuo Excel."
          accent="Te lo restituiamo come gestionale."
          tone="primary"
        />
        <Reveal delay={0.3}>
          <p className="text-muted mt-5 text-[19px]">
            Lo impostiamo noi. A te resta mezz'ora.
          </p>
        </Reveal>

        <motion.ol
          className="relative mt-16 grid gap-10 md:grid-cols-4 md:gap-8"
          initial="off"
          whileInView="on"
          viewport={{ once: true, margin: '0px 0px -25% 0px' }}
        >
          {/* Linea che si disegna: orizzontale su desktop, verticale su mobile */}
          <span className="bg-separator absolute top-[11px] left-[12px] hidden h-px w-[calc(75%-4px)] md:block" />
          <motion.span
            className="bg-primary absolute top-[11px] left-[12px] hidden h-[1.5px] w-[calc(75%-4px)] origin-left md:block"
            variants={{
              off: { scaleX: 0 },
              on: {
                scaleX: 1,
                transition: { duration: LINE, ease: 'easeInOut' },
              },
            }}
          />
          <span className="bg-separator absolute top-3 bottom-3 left-[11px] w-px md:hidden" />
          <motion.span
            className="bg-primary absolute top-3 bottom-3 left-[11px] w-[1.5px] origin-top md:hidden"
            variants={{
              off: { scaleY: 0 },
              on: {
                scaleY: 1,
                transition: { duration: LINE, ease: 'easeInOut' },
              },
            }}
          />
          {steps.map((s, i) => {
            const at = (i / (steps.length - 1)) * LINE * 0.92
            return (
              <li key={s.t} className="relative pl-12 md:pl-0">
                <motion.span
                  className="absolute top-0 left-0 grid size-6 place-items-center rounded-full border-[1.5px] text-[11px] font-bold md:relative"
                  variants={{
                    off: {
                      borderColor: 'rgba(60,60,67,0.3)',
                      backgroundColor: '#FFFFFF',
                      color: '#6E6E73',
                      scale: 1,
                    },
                    on: {
                      borderColor: '#FD6C01',
                      backgroundColor: '#FD6C01',
                      color: '#FFFFFF',
                      scale: [1, 1.18, 1],
                      transition: { delay: at, duration: 0.45, ease: EASE },
                    },
                  }}
                >
                  {i + 1}
                </motion.span>
                <motion.div
                  variants={{
                    off: { opacity: 0, y: 10, filter: 'blur(4px)' },
                    on: {
                      opacity: 1,
                      y: 0,
                      filter: 'blur(0px)',
                      transition: {
                        delay: at + 0.1,
                        duration: 0.6,
                        ease: EASE,
                      },
                    },
                  }}
                >
                  <p className="text-[19px] leading-snug font-semibold md:mt-6">
                    {s.t}
                  </p>
                  <p className="text-muted mt-2 text-[16px] leading-relaxed">
                    {s.d}
                  </p>
                </motion.div>
              </li>
            )
          })}
        </motion.ol>

        <SectionTitle
          className="mt-16 text-center !text-[24px] sm:!text-[30px]"
          text="Non cambi il tuo modo di lavorare."
          accent="Lo semplifichi."
        />
      </Container>
    </section>
  )
}
