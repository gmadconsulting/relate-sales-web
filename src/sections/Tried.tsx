import { motion, useTransform } from 'motion/react'
import { useRef } from 'react'
import { Container, SectionTitle } from '@/components/ui'
import { Reveal, useStickyProgress } from '@/lib/motion'

/** Un CRM generico affollato: menu, tab e campi a non finire. */
function CrowdedCrm() {
  return (
    <div className="overflow-hidden rounded-xl bg-white text-[10px] text-[#555] shadow-[0_0_0_1px_#d6d6d6]">
      <div className="flex gap-3 overflow-hidden bg-[#2b3648] px-3 py-2 whitespace-nowrap text-[#c9d1dd]">
        {[
          'Home',
          'Lead',
          'Account',
          'Opportunità',
          'Campagne',
          'Report',
          'Dashboard',
          'Automazioni',
          'Altro ▾',
        ].map((m) => (
          <span key={m}>{m}</span>
        ))}
      </div>
      <div className="flex gap-2 overflow-hidden border-b border-[#ddd] bg-[#f3f4f6] px-3 py-1.5 whitespace-nowrap">
        {[
          'Dettagli',
          'Correlati',
          'Attività',
          'Chatter',
          'Previsioni',
          'Punteggio IA',
          'Sequenze',
        ].map((t, i) => (
          <span
            key={t}
            className={i === 0 ? 'font-semibold text-[#2b5fb4]' : ''}
          >
            {t}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-x-4 gap-y-2 p-3">
        {Array.from({ length: 27 }, (_, i) => (
          <div key={i}>
            <div className="mb-0.5 h-1.5 w-14 rounded bg-[#d9dce1]" />
            <div className="h-4 rounded-sm border border-[#cfd3d9] bg-[#fafafa]">
              {i % 4 === 0 && <span className="pl-1 text-[#c33]">*</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function Tried() {
  const ref = useRef<HTMLDivElement>(null)
  const p = useStickyProgress(ref, 'enter')
  const opacity = useTransform(p, [0.5, 1], [1, 0.28])
  const filter = useTransform(
    p,
    [0.5, 1],
    ['grayscale(0) blur(0px)', 'grayscale(1) blur(1.5px)'],
  )
  const scale = useTransform(p, [0.5, 1], [1, 0.96])
  const labelOpacity = useTransform(p, [0.4, 0.6], [0, 1])
  const labelY = useTransform(p, [0.4, 0.6], [8, 0])

  return (
    <section className="py-24 sm:py-32">
      <Container className="grid items-center gap-14 lg:grid-cols-2">
        <div>
          <SectionTitle
            eyebrow="Ci hai già provato"
            text="Hai già pagato un CRM che nessuno apre?"
          />
          <Reveal delay={0.2}>
            <p className="mt-6 text-[21px] font-semibold">
              Allora sai com'è andata.
            </p>
            <p className="text-muted mt-4 text-[18px] leading-relaxed">
              Mesi per configurarlo. Schede piene di campi che nessuno compila.
              Funzioni pensate per chi vende online, non per chi vende con
              visite e preventivi. E dopo qualche settimana, i commerciali sono
              tornati all'Excel.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-[21px] leading-snug font-semibold">
              Il problema non era la tua squadra.{' '}
              <span className="text-primary">Era il software.</span>
            </p>
            <p className="text-muted mt-4 text-[18px] leading-relaxed">
              Il vero concorrente di un gestionale non è un altro gestionale. È
              l'abitudine. E l'abitudine si batte solo con qualcosa di più
              semplice di quello che c'era prima.
            </p>
          </Reveal>
        </div>
        <div ref={ref} className="relative min-w-0">
          <motion.div style={{ opacity, filter, scale }}>
            <CrowdedCrm />
          </motion.div>
          <motion.span
            className="bg-foreground shadow-popover absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-full px-4 py-2 text-[13px] font-semibold whitespace-nowrap text-white"
            style={{ opacity: labelOpacity, y: labelY }}
          >
            Ultimo accesso: 4 mesi fa
          </motion.span>
        </div>
      </Container>
    </section>
  )
}
