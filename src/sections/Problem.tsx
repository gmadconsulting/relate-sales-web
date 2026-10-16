import { motion, useTransform, type MotionValue } from 'motion/react'
import { useRef } from 'react'
import { Container, SectionTitle } from '@/components/ui'
import { EASE, Reveal, useStep, useStickyProgress } from '@/lib/motion'

const problems = [
  {
    t: 'Per sapere come vanno le vendite, devi chiedere.',
    d: 'I numeri non stanno da nessuna parte: stanno nelle persone.',
  },
  {
    t: 'Le trattative si fermano, e te ne accorgi tardi.',
    d: "Nell'industria una vendita dura mesi, e il silenzio non fa rumore.",
  },
  {
    t: 'I preventivi partono e nessuno richiama.',
    d: "L'urgenza del giorno dopo vince sempre.",
  },
  {
    t: 'Se un commerciale se ne va, una parte dei clienti se ne va con lui.',
    d: 'La loro storia era nella sua testa e nel suo telefono.',
  },
]

const stroke = {
  fill: 'none',
  stroke: 'white',
  strokeWidth: 1.2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const

function Sheet() {
  return (
    <svg viewBox="0 0 120 140" className="w-full" aria-hidden>
      <rect x="10" y="10" width="100" height="120" rx="6" {...stroke} />
      {[34, 54, 74, 94, 114].map((y) => (
        <line
          key={y}
          x1="10"
          x2="110"
          y1={y}
          y2={y}
          {...stroke}
          strokeOpacity="0.5"
        />
      ))}
      {[40, 75].map((x) => (
        <line
          key={x}
          x1={x}
          x2={x}
          y1="10"
          y2="130"
          {...stroke}
          strokeOpacity="0.5"
        />
      ))}
      <rect
        x="10"
        y="10"
        width="100"
        height="24"
        rx="6"
        fill="rgba(255,255,255,0.08)"
      />
    </svg>
  )
}
function Notebook() {
  return (
    <svg viewBox="0 0 120 140" className="w-full" aria-hidden>
      <rect x="18" y="8" width="90" height="124" rx="6" {...stroke} />
      {[24, 44, 64, 84, 104, 120].map((y) => (
        <circle key={y} cx="18" cy={y} r="4" {...stroke} />
      ))}
      {[34, 50, 66, 82].map((y, i) => (
        <path
          key={y}
          d={`M34 ${y} q 10 -4 20 0 t 20 0 ${i % 2 ? 't 18 0' : ''}`}
          {...stroke}
          strokeOpacity="0.7"
        />
      ))}
    </svg>
  )
}
function PhoneDrawing() {
  return (
    <svg viewBox="0 0 120 140" className="w-full" aria-hidden>
      <rect x="32" y="6" width="56" height="128" rx="12" {...stroke} />
      <line x1="52" x2="68" y1="16" y2="16" {...stroke} />
      <rect
        x="40"
        y="26"
        width="40"
        height="92"
        rx="3"
        {...stroke}
        strokeOpacity="0.5"
      />
      <path
        d="M50 64 c0 -6 4 -8 6 -8 l3 6 -3 3 c1 4 4 7 8 8 l3 -3 6 3 c0 2 -2 6 -8 6 c-8 0 -15 -7 -15 -15z"
        {...stroke}
      />
    </svg>
  )
}

const objects = [
  { C: Sheet, label: 'Excel', x: -1, y: 1 },
  { C: Notebook, label: 'Quaderno', x: 0, y: -1 },
  { C: PhoneDrawing, label: 'Telefono e memoria', x: 1, y: 1 },
]

function Drifting({
  o,
  p,
  lit,
}: {
  o: (typeof objects)[number]
  p: MotionValue<number>
  lit: boolean
}) {
  const spread = useTransform(p, [0, 0.7], [0, 1], { clamp: true })
  const x = useTransform(spread, (s) => `${o.x * (40 + s * 75)}%`)
  const y = useTransform(spread, (s) => `${o.y * s * 18}%`)
  const rotate = useTransform(spread, (s) => o.x * s * 10)
  const { C } = o
  return (
    <motion.div
      className="absolute w-[30%] text-center"
      style={{ x, y, rotate }}
    >
      <motion.div
        animate={{ opacity: lit ? 1 : 0.4 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <C />
        <p className="mt-2 text-[12px] tracking-[0.08em] text-white/50 uppercase">
          {o.label}
        </p>
      </motion.div>
    </motion.div>
  )
}

export function Problem() {
  const ref = useRef<HTMLDivElement>(null)
  const p = useStickyProgress(ref)
  const active = useStep(p, problems.length, 1.05)

  return (
    <section className="bg-ink text-white">
      <Container className="pt-24 pb-10 sm:pt-32">
        <SectionTitle
          eyebrow="Il problema"

          className="max-w-4xl sm:text-[48px] lg:text-[56px]"
          text="Ogni commerciale ha il suo sistema."
          accent="La tua azienda non ne ha nessuno."
          tone="dim"
        />
        <Reveal delay={0.3}>
          <p className="mt-6 max-w-2xl text-[19px] leading-relaxed text-white/70">
            Uno usa l'Excel. Uno il quaderno. Uno il telefono e la memoria.
            Ognuno si è organizzato come poteva, e per lui funziona.
          </p>
          <p className="mt-4 text-[24px] font-semibold">Per l'azienda no.</p>
        </Reveal>
      </Container>

      <div ref={ref} className="relative h-[320vh]">
        <div className="blueprint-dark sticky top-0 flex h-screen items-center overflow-hidden">
          <Container className="grid items-center gap-10 lg:grid-cols-2">
            <div className="relative mx-auto flex h-[200px] w-full max-w-md items-center justify-center sm:h-[300px]">
              {objects.map((o, i) => (
                <Drifting
                  key={o.label}
                  o={o}
                  p={p}
                  lit={active === i || (active === 3 && i === 2)}
                />
              ))}
            </div>
            <ol className="relative">
              {problems.map((pr, i) => (
                <motion.li
                  key={pr.t}
                  className="relative py-4 pl-6"
                  animate={{
                    opacity: i <= active ? 1 : 0.22,
                    filter: i <= active ? 'blur(0px)' : 'blur(1.5px)',
                  }}
                  transition={{ duration: 0.6, ease: EASE }}
                >
                  <span className="absolute inset-y-0 left-0 w-[0.5px] bg-white/20" />
                  {i === active && (
                    <motion.span
                      layoutId="problem-bar"
                      className="bg-primary absolute inset-y-2 left-[-0.75px] w-[2px] rounded-full"
                      transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 34,
                      }}
                    />
                  )}
                  <p className="text-[20px] leading-snug font-semibold sm:text-[22px]">
                    {pr.t}
                  </p>
                  <p className="mt-1 text-[16px] text-white/60">{pr.d}</p>
                </motion.li>
              ))}
            </ol>
          </Container>
        </div>
      </div>

      <Container className="pb-24 sm:pb-32">
        <SectionTitle
          className="mx-auto max-w-3xl text-center !text-[26px] sm:!text-[34px]"
          text="Non è colpa della squadra."
          accent="Manca un posto comune dove lavorare."
          tone="primary"
        />
      </Container>
    </section>
  )
}
