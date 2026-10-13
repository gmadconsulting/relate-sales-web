import { motion, useReducedMotion, useTransform } from 'motion/react'
import { useEffect, useRef } from 'react'
import { useStickyProgress } from '@/lib/motion'

const zeros = [
  'riunioni di configurazione',
  'costi di avvio',
  'corsi',
  'costi per ogni commerciale in più',
  'competenze informatiche',
]

function Zero({
  label,
  i,
  p,
}: {
  label: string
  i: number
  p: ReturnType<typeof useStickyProgress>
}) {
  // Ogni zero si "accende" quando passa al centro dello schermo
  const center = 0.08 + (i / (zeros.length - 1)) * 0.72
  const opacity = useTransform(
    p,
    [center - 0.22, center, center + 0.3],
    [0.25, 1, 0.45],
  )
  const blur = useTransform(
    p,
    [center - 0.22, center, center + 0.3],
    ['blur(4px)', 'blur(0px)', 'blur(1px)'],
  )
  return (
    <motion.div
      className="w-[62vw] max-w-[440px] shrink-0 sm:w-[34vw]"
      style={{ opacity, filter: blur }}
    >
      <span className="font-display text-primary block text-[140px] leading-[0.85] font-bold tracking-tighter sm:text-[200px]">
        0
      </span>
      <span className="mt-4 block text-[22px] leading-snug font-semibold text-balance sm:text-[28px]">
        {label}
      </span>
    </motion.div>
  )
}

export function Zeros() {
  const ref = useRef<HTMLDivElement>(null)
  const p = useStickyProgress(ref)
  const reduced = useReducedMotion()
  const track = useRef<HTMLDivElement>(null)
  const distance = useRef(0)
  useEffect(() => {
    const el = track.current
    if (!el) return
    const measure = () => {
      distance.current = Math.max(0, el.scrollWidth - window.innerWidth * 0.84)
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])
  const x = useTransform(p, (v) =>
    reduced ? 0 : -Math.min(1, v / 0.82) * distance.current,
  )
  const finalOpacity = useTransform(p, [0.8, 0.92], [0, 1])
  const finalY = useTransform(p, [0.8, 0.92], [18, 0])
  const finalBlur = useTransform(p, [0.8, 0.92], ['blur(8px)', 'blur(0px)'])

  return (
    <section className="bg-ink text-white">
      <div ref={ref} className="relative h-[280vh]">
        <div className="blueprint-dark sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
          {/* Il binario scorre in orizzontale mentre la pagina scende */}
          <div className="w-full pl-[8vw]">
            <motion.div
              ref={track}
              className="flex w-max gap-16 will-change-transform sm:gap-24"
              style={{ x }}
            >
              {zeros.map((z, i) => (
                <Zero key={z} label={z} i={i} p={p} />
              ))}
            </motion.div>
          </div>
          <motion.p
            className="font-display mt-16 px-4 text-center text-[30px] font-bold sm:text-[44px]"
            style={{ opacity: finalOpacity, y: finalY, filter: finalBlur }}
          >
            Un'ora, e la tua squadra lavora.
          </motion.p>
        </div>
      </div>
    </section>
  )
}
