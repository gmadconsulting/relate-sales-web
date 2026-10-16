import { AnimatePresence, motion, useTransform } from 'motion/react'
import { useRef } from 'react'
import { Container, SectionTitle } from '@/components/ui'
import { EASE, Reveal, useStep, useStickyProgress } from '@/lib/motion'

const pillars = [
  {
    t: "Lo impari in un'ora.",
    d: 'Nessun corso, nessun informatico. Lo impostiamo noi sul tuo modo di vendere, e la tua squadra parte il giorno stesso.',
  },
  {
    t: 'I tuoi commerciali lo usano, senza che tu debba insistere.',
    d: 'Perché toglie lavoro invece di aggiungerne. Chiamano con un tocco, mandano le email da lì, e ogni passaggio si registra da solo.',
  },
  {
    t: 'Sai sempre a che punto sono le trattative. Anche quando durano mesi.',
    d: 'Ogni fase, ogni passaggio, e da quanti giorni una trattativa è ferma. Senza chiedere a nessuno.',
  },
]

export function Pillars() {
  const ref = useRef<HTMLDivElement>(null)
  const p = useStickyProgress(ref)
  const active = useStep(p, pillars.length)
  const line = useTransform(p, [0.05, 0.85], [0, 1], { clamp: true })

  return (
    <section id="metodo" className="bg-white">
      <Container className="pt-24 text-center sm:pt-32">
        <SectionTitle eyebrow="Il metodo" text="Meno funzioni. Tutte usate." />
        <Reveal delay={0.2}>
          <p className="text-muted mx-auto mt-6 max-w-2xl text-[19px] leading-relaxed">
            Abbiamo fatto il contrario degli altri: invece di aggiungere
            funzioni, le abbiamo tolte. Sono rimaste solo quelle che servono a
            chi vende nell'industria.
          </p>
        </Reveal>
      </Container>
      <div ref={ref} className="relative h-[260vh]">
        <div className="sticky top-0 flex h-screen items-center">
          <Container className="grid items-center gap-8 md:grid-cols-[auto_1fr] md:gap-20">
            <div className="relative flex gap-6 md:flex-col md:gap-10">
              <span className="bg-separator absolute top-[12%] bottom-[12%] left-1/2 hidden w-[0.5px] md:block" />
              <motion.span
                className="bg-primary absolute top-[12%] bottom-[12%] left-1/2 hidden w-[1.5px] origin-top -translate-x-[0.5px] md:block"
                style={{ scaleY: line }}
              />
              {pillars.map((_, i) => (
                <motion.span
                  key={i}
                  className="tabular font-display relative bg-white text-[56px] leading-none font-bold tracking-tight sm:text-[88px]"
                  animate={{
                    color:
                      i === active
                        ? '#FD6C01'
                        : i < active
                          ? '#1D1D1F'
                          : '#D1D1D6',
                    scale: i === active ? 1 : 0.94,
                  }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  0{i + 1}
                </motion.span>
              ))}
            </div>
            <div className="relative min-h-[280px]">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={active}
                  className="flex min-h-[280px] flex-col justify-center"
                  initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -28, filter: 'blur(8px)' }}
                  transition={{ duration: 0.55, ease: EASE }}
                >
                  <h3 className="max-w-2xl text-[30px] leading-[1.12] text-balance sm:text-[44px]">
                    {pillars[active].t}
                  </h3>
                  <p className="text-muted mt-5 max-w-xl text-[19px] leading-relaxed sm:text-[21px]">
                    {pillars[active].d}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </Container>
        </div>
      </div>
    </section>
  )
}
