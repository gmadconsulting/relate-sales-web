import { AnimatePresence, motion } from 'motion/react'
import { useRef } from 'react'
import { Phone, PHONE_H, PHONE_W } from '@/components/mockups/Phone'
import { ScaledFrame } from '@/components/ScaledFrame'
import { Container, SectionTitle } from '@/components/ui'
import { EASE, Reveal, useStep, useStickyProgress } from '@/lib/motion'

const moments = [
  {
    h: '8:30',
    t: 'Apre le attività di oggi. Tre clienti da richiamare, una visita alle 15.',
  },
  {
    h: '9:00',
    t: 'Chiama il primo cliente con un tocco. La chiamata finisce da sola nella storia del cliente.',
  },
  {
    h: '9:20',
    t: "Il cliente chiede l'offerta aggiornata. Marco la manda via email dal gestionale. Resta nella scheda, non nella sua casella.",
  },
  { h: '11:00', t: 'La trattativa passa a "Preventivo". Sposta la tessera.' },
  {
    h: '15:00',
    t: 'Visita in stabilimento. Fissa il prossimo passo per giovedì.',
  },
  { h: '18:00', t: 'Chiude la giornata. Nessun rapporto da scrivere.' },
]

const swap = {
  initial: { opacity: 0, y: 20, filter: 'blur(6px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  exit: { opacity: 0, y: -20, filter: 'blur(6px)' },
  transition: { duration: 0.5, ease: EASE },
}

export function Day() {
  const ref = useRef<HTMLDivElement>(null)
  const p = useStickyProgress(ref)
  const active = useStep(p, moments.length)

  return (
    <section className="bg-white">
      <Container className="pt-24 text-center sm:pt-32">
        <SectionTitle text="Se sai usare il telefono, sai usare Relate Sales." />
        <Reveal delay={0.25}>
          <p className="text-muted mx-auto mt-5 max-w-2xl text-[19px]">
            Una giornata qualunque di Marco, commerciale di un'azienda
            metalmeccanica. Guarda quanto lavoro gli toglie.
          </p>
        </Reveal>
      </Container>

      <div
        ref={ref}
        className="relative"
        style={{ height: `${moments.length * 65}vh` }}
      >
        <div className="sticky top-0 flex h-screen items-center overflow-hidden pt-14">
          <Container className="grid items-center gap-6 md:grid-cols-[1fr_auto_1fr] md:gap-12">
            <div className="relative h-16 md:h-28 md:text-right">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={active}
                  {...swap}
                  className="tabular font-display absolute inset-x-0 text-[48px] leading-none font-bold tracking-tight md:text-[88px]"
                >
                  {moments[active].h}
                </motion.span>
              </AnimatePresence>
            </div>
            <div className="order-first mx-auto w-[210px] sm:w-[260px] md:order-none md:w-[300px]">
              <ScaledFrame width={PHONE_W} height={PHONE_H}>
                <Phone step={active} />
              </ScaledFrame>
            </div>
            <div className="relative min-h-[120px] md:h-[220px]">
              <div className="mb-5 flex gap-1.5">
                {moments.map((m, i) => (
                  <span
                    key={m.h}
                    className="bg-avatar relative h-1 w-6 overflow-hidden rounded-full"
                  >
                    <motion.span
                      className="bg-primary absolute inset-0 origin-left rounded-full"
                      animate={{ scaleX: i <= active ? 1 : 0 }}
                      transition={{ duration: 0.5, ease: EASE }}
                    />
                  </span>
                ))}
              </div>
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.p
                  key={active}
                  {...swap}
                  className="text-[19px] leading-snug font-medium text-balance md:text-[24px]"
                >
                  {moments[active].t}
                </motion.p>
              </AnimatePresence>
            </div>
          </Container>
        </div>
      </div>

      <Container className="pb-24 text-center sm:pb-32">
        <SectionTitle
          className="mx-auto max-w-3xl !text-[28px] sm:!text-[40px]"
          text="E tu, alle 18:05, apri la panoramica e sai già tutto."
          accent="Senza chiedere niente a nessuno."
        />
        <Reveal delay={0.4}>
          <p className="text-muted mt-6 text-[17px]">
            Per i commerciali è un aiuto, non un compito in più. Per questo lo
            usano.
          </p>
        </Reveal>
      </Container>
    </section>
  )
}
