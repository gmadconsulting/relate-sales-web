import { CircleAlert, Play, TrendingUp, UserPlus } from 'lucide-react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react'
import { APP_H, APP_W } from '@/components/mockups/AppFrame'
import { DashboardScreen } from '@/components/mockups/screens'
import { ScaledFrame } from '@/components/ScaledFrame'
import { Container, DemoButton, Eyebrow } from '@/components/ui'
import { useOpenVideo } from '@/components/VideoDialog'
import { useEffect, useState } from 'react'
import { EASE, PlayProvider, Words } from '@/lib/motion'

const chips = [
  {
    icon: UserPlus,
    label: 'Nuovi contatti',
    value: '+18',
    tone: 'text-info bg-info-soft',
    pos: 'left-[-4%] top-[22%]',
    dir: [-1, -0.4],
  },
  {
    icon: TrendingUp,
    label: 'Ricavi del mese',
    value: '88.800 €',
    tone: 'text-success bg-success-soft',
    pos: 'right-[-5%] top-[10%]',
    dir: [1, -0.6],
  },
  {
    icon: CircleAlert,
    label: 'Trattative ferme',
    value: '3',
    tone: 'text-warning bg-warning-soft',
    pos: 'right-[3%] bottom-[12%]',
    dir: [1, 0.5],
  },
] as const

const enter = (delay: number) => ({
  initial: { opacity: 0, y: 14, filter: 'blur(6px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  transition: { duration: 0.8, ease: EASE, delay },
})

function Chip({
  c,
  i,
  p,
}: {
  c: (typeof chips)[number]
  i: number
  p: ReturnType<typeof useSpring>
}) {
  const x = useTransform(p, [0, 1], [0, c.dir[0] * 40])
  const y = useTransform(p, [0, 1], [0, c.dir[1] * 40])
  const Icon = c.icon
  return (
    <motion.div
      className={`absolute hidden sm:block ${c.pos}`}
      style={{ x, y }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, filter: 'blur(6px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 0.7, ease: EASE, delay: 1.2 + i * 0.12 }}
      >
        <div
          className="animate-float shadow-popover flex items-center gap-3 rounded-2xl bg-white/90 py-3 pr-5 pl-3 backdrop-blur"
          style={{ animationDelay: `${i * -2}s` }}
        >
          <span
            className={`grid size-10 place-items-center rounded-xl ${c.tone}`}
          >
            <Icon size={20} strokeWidth={1.9} />
          </span>
          <span className="text-left">
            <span className="text-muted block text-[12px]">{c.label}</span>
            <span className="tabular block text-[19px] leading-tight font-bold">
              {c.value}
            </span>
          </span>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function Hero() {
  const openVideo = useOpenVideo()
  const reduced = useReducedMotion()
  const { scrollY } = useScroll()
  const raw = useTransform(scrollY, [0, 520], [0, 1], { clamp: true })
  const p = useSpring(raw, { stiffness: 120, damping: 28, mass: 0.5 })
  const rotateX = useTransform(p, [0, 1], [reduced ? 0 : 22, 0])
  const scale = useTransform(p, [0, 1], [reduced ? 1 : 0.92, 1])
  const [play, setPlay] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setPlay(true), 1300)
    return () => clearTimeout(t)
  }, [])

  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 sm:pt-40">
      <div className="blueprint pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />
      <Container className="relative text-center">
        <motion.div {...enter(0.15)}>
          <Eyebrow>Gestionale commerciale per aziende industriali</Eyebrow>
        </motion.div>
        <h1 className="mx-auto mt-5 max-w-4xl text-[42px] leading-[1.03] text-balance sm:text-[64px] lg:text-[76px]">
          <Words
            text="Il gestionale commerciale con meno funzioni."
            onMount
            delay={0.25}
            gap={0.05}
          />{' '}
          <Words
            text="Solo quelle che usi davvero."
            onMount
            delay={0.6}
            gap={0.05}
            className="text-muted"
          />
        </h1>
        <motion.p
          {...enter(0.85)}
          className="text-muted mx-auto mt-6 max-w-xl text-[19px] leading-relaxed text-pretty sm:text-[21px]"
        >
          Pensato per chi vende nell'industria. Lo imposti in mezz'ora. Lo
          impari in un'ora.
        </motion.p>
        <motion.div
          {...enter(1)}
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <DemoButton size="xl" />
          <button
            onClick={openVideo}
            className="group text-foreground hover:bg-fill inline-flex h-13 items-center gap-2.5 rounded-xl px-5 text-base font-semibold transition-colors duration-200"
          >
            <span className="bg-foreground grid size-7 place-items-center rounded-full text-white transition-transform duration-300 ease-out group-hover:scale-110">
              <Play size={12} fill="currentColor" />
            </span>
            Guarda come funziona{' '}
            <span className="text-muted font-normal">(3 minuti)</span>
          </button>
        </motion.div>
        <motion.p
          {...enter(1.1)}
          className="text-muted mt-6 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-[14px]"
        >
          <span>Utenti illimitati</span>
          <span aria-hidden className="text-tertiary">
            ·
          </span>
          <span>Un prezzo per tutta l'azienda</span>
          <span aria-hidden className="text-tertiary">
            ·
          </span>
          <span>Lo impostiamo noi</span>
        </motion.p>
      </Container>

      <Container className="relative mt-16 sm:mt-20">
        <motion.div
          className="[perspective:2000px]"
          initial={{ opacity: 0, y: 60, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.9 }}
        >
          <motion.div
            className="relative will-change-transform"
            style={{ rotateX, scale, transformOrigin: '50% 0%' }}
          >
            <ScaledFrame width={APP_W} height={APP_H}>
              <PlayProvider value={play}>
                <DashboardScreen />
              </PlayProvider>
            </ScaledFrame>
            {chips.map((c, i) => (
              <Chip key={c.label} c={c} i={i} p={p} />
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
