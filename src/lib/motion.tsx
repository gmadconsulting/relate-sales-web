import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  type MotionValue,
  type Variants,
} from 'motion/react'
import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  type RefObject,
} from 'react'

/** Curva d'uscita morbida e precisa (stile Attio): parte veloce, si posa piano. */
export const EASE = [0.22, 1, 0.36, 1] as const
export const SPRING = {
  type: 'spring',
  stiffness: 260,
  damping: 32,
  mass: 0.9,
} as const

/** Comparsa: opacità + leggera salita + sfocatura che si dissolve. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 14, filter: 'blur(6px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: EASE },
  },
}

export const stagger = (gap = 0.06, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren: delay } },
})

const viewport = { once: true, margin: '0px 0px -12% 0px' } as const

/* ---------- Reveal allo scroll ---------- */

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  as?: 'div' | 'li' | 'p' | 'section' | 'ul' | 'ol'
}

export function Reveal({
  children,
  className,
  delay = 0,
  as = 'div',
}: RevealProps) {
  const M = motion[as]
  return (
    <M
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={{
        hidden: fadeUp.hidden,
        show: {
          ...(fadeUp.show as object),
          transition: { duration: 0.7, ease: EASE, delay },
        },
      }}
    >
      {children}
    </M>
  )
}

/** Contenitore che fa entrare i figli <Item> uno dopo l'altro quando arriva a schermo. */
export function Stagger({
  children,
  className,
  gap = 0.07,
  delay = 0,
  as = 'div',
}: RevealProps & { gap?: number }) {
  const M = motion[as]
  return (
    <M
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={stagger(gap, delay)}
    >
      {children}
    </M>
  )
}

export function Item({ children, className, as = 'div' }: RevealProps) {
  const M = motion[as]
  return (
    <M className={className} variants={fadeUp}>
      {children}
    </M>
  )
}

/* ---------- Titoli che entrano parola per parola ---------- */

export function Words({
  text,
  className,
  delay = 0,
  gap = 0.045,
  onMount = false,
}: {
  text: string
  className?: string
  delay?: number
  gap?: number
  /** true = parte al caricamento (hero), false = quando entra a schermo */
  onMount?: boolean
}) {
  const words = text.split(' ')
  const trigger = onMount
    ? { animate: 'show' }
    : { whileInView: 'show', viewport }
  return (
    <motion.span
      className={className}
      initial="hidden"
      {...trigger}
      variants={stagger(gap, delay)}
    >
      {words.map((w, i) => (
        <span key={i} className="inline-block whitespace-pre">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { opacity: 0, y: '0.35em', filter: 'blur(8px)' },
              show: {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                transition: { duration: 0.8, ease: EASE },
              },
            }}
          >
            {w}
          </motion.span>
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </motion.span>
  )
}

/* ---------- Scroll ---------- */

/**
 * Avanzamento 0→1 di un contenitore alto con figlio sticky, ammorbidito da una molla:
 * niente scatti anche con rotella o trackpad irregolari.
 */
export function useStickyProgress(
  ref: RefObject<HTMLElement | null>,
  mode: 'sticky' | 'enter' = 'sticky',
) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset:
      mode === 'sticky'
        ? ['start start', 'end end']
        : ['start end', 'start start'],
  })
  return useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    mass: 0.6,
    restDelta: 0.0005,
  })
}

/** Indice dello step attivo in base all'avanzamento. */
export function useStep(
  progress: MotionValue<number>,
  steps: number,
  bias = 1,
) {
  const [step, setStep] = useState(0)
  useMotionValueEvent(progress, 'change', (v) => {
    const next = Math.min(steps - 1, Math.max(0, Math.floor(v * steps * bias)))
    setStep((s) => (s === next ? s : next))
  })
  return step
}

/* ---------- Mockup che "si accendono" ---------- */

/** I mockup animano i loro pezzi in cascata solo quando play = true (es. pagina attiva nel tour). */
const PlayContext = createContext(true)
export const PlayProvider = PlayContext.Provider

export function Seq({
  children,
  className,
  gap = 0.05,
  delay = 0.1,
}: {
  children: ReactNode
  className?: string
  gap?: number
  delay?: number
}) {
  const play = useContext(PlayContext)
  const reduced = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduced ? false : 'hidden'}
      animate={play || reduced ? 'show' : 'hidden'}
      variants={stagger(gap, delay)}
    >
      {children}
    </motion.div>
  )
}

export const seqItem: Variants = {
  hidden: { opacity: 0, y: 10, filter: 'blur(4px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.55, ease: EASE },
  },
}

export function SeqItem({
  children,
  className,
  style,
}: {
  children?: ReactNode
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <motion.div className={className} style={style} variants={seqItem}>
      {children}
    </motion.div>
  )
}

/** Barra che cresce da sinistra quando la schermata si accende. */
export function Grow({
  className,
  style,
  delay = 0.2,
}: {
  className?: string
  style?: React.CSSProperties
  delay?: number
}) {
  const play = useContext(PlayContext)
  return (
    <motion.span
      className={className}
      style={{ ...style, transformOrigin: 'left center' }}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: play ? 1 : 0 }}
      transition={{ duration: 0.9, ease: EASE, delay: play ? delay : 0 }}
    />
  )
}
