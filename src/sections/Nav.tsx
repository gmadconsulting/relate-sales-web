import {
  ArrowRight,
  Calculator,
  ChevronDown,
  CircleCheckBig,
  Eraser,
  Menu,
  Rocket,
  Smartphone,
  SquareKanban,
  X,
  type LucideIcon,
} from 'lucide-react'
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { JointVenture } from '@/components/JointVenture'
import { Logo } from '@/components/Logo'
import { DemoButton } from '@/components/ui'
import { FEATURES } from '@/lib/features'
import { EASE } from '@/lib/motion'
import { useRouter } from '@/lib/router'

type MenuId = 'prodotto' | 'perche'

const why: { href: string; icon: LucideIcon; t: string; d: string }[] = [
  {
    href: '/#come-funziona',
    icon: SquareKanban,
    t: 'Come funziona',
    d: 'Sette pagine. Tutto quello che serve per vendere.',
  },
  {
    href: '/#giornata',
    icon: Smartphone,
    t: 'La giornata di un commerciale',
    d: 'Se sai usare il telefono, sai usare RelateSales.',
  },
  {
    href: '/#cosa-abbiamo-tolto',
    icon: Eraser,
    t: 'Cosa abbiamo tolto',
    d: 'Il CRM più completo? Non siamo noi.',
  },
  {
    href: '/#come-si-parte',
    icon: Rocket,
    t: 'Come si parte',
    d: 'Ci mandi il tuo Excel. Te lo restituiamo come gestionale.',
  },
  {
    href: '/#calcolatore',
    icon: Calculator,
    t: 'Il calcolatore',
    d: 'Quanto ti costa lavorare senza un gestionale.',
  },
  {
    href: '/#per-chi-e',
    icon: CircleCheckBig,
    t: 'Per chi è',
    d: 'Te lo diciamo prima: non è per tutti.',
  },
]

const links = [
  { href: '/#prezzi', label: 'Prezzi' },
  { href: '/#domande', label: 'Domande frequenti' },
]

/* ---------- Contenuti dei pannelli ---------- */

function MenuItem({
  href,
  icon: Icon,
  t,
  d,
}: {
  href: string
  icon: LucideIcon
  t: string
  d: string
}) {
  return (
    <a
      href={href}
      className="group hover:bg-fill-soft flex gap-3 rounded-xl p-2.5 transition-colors duration-200"
    >
      <span className="text-foreground/80 shadow-card group-hover:text-primary grid size-9 shrink-0 place-items-center rounded-[10px] bg-white transition-colors duration-200">
        <Icon size={17} strokeWidth={1.8} />
      </span>
      <span className="min-w-0">
        <span className="block text-[14px] font-semibold">{t}</span>
        <span className="text-muted block text-[13px] leading-snug">{d}</span>
      </span>
    </a>
  )
}

function ProductPanel() {
  const groups = ['Vendite', 'Comunicazione'] as const
  return (
    <div className="grid grid-cols-[1fr_1fr_280px] gap-6 p-5">
      {groups.map((g) => (
        <div key={g}>
          <p className="text-muted px-2.5 pb-2 text-[11px] font-semibold tracking-[0.08em] uppercase">
            {g}
          </p>
          {FEATURES.filter((f) => f.group === g).map((f) => (
            <MenuItem
              key={f.slug}
              href={`/prodotto/${f.slug}`}
              icon={f.icon}
              t={f.name}
              d={f.menu}
            />
          ))}
        </div>
      ))}
      <a
        href="/#come-funziona"
        className="group bg-ink relative flex flex-col justify-end overflow-hidden rounded-xl p-5 text-white"
      >
        <span className="blueprint-dark absolute inset-0" />
        <span className="text-primary relative text-[11px] font-semibold tracking-[0.08em] uppercase">
          Il giro completo
        </span>
        <span className="font-display relative mt-2 text-[19px] leading-snug font-bold">
          Sette pagine. Tutto quello che serve per vendere.
        </span>
        <span className="relative mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-white/80 transition-colors group-hover:text-white">
          Guarda il giro
          <ArrowRight
            size={14}
            className="transition-transform duration-300 group-hover:translate-x-0.5"
          />
        </span>
      </a>
    </div>
  )
}

function WhyPanel() {
  return (
    <div className="grid grid-cols-[1fr_1fr_280px] gap-6 p-5">
      {[why.slice(0, 3), why.slice(3)].map((col, i) => (
        <div key={i}>
          <p className="text-muted px-2.5 pb-2 text-[11px] font-semibold tracking-[0.08em] uppercase">
            {i === 0 ? 'Il metodo' : 'Partire'}
          </p>
          {col.map((w) => (
            <MenuItem key={w.href} {...w} />
          ))}
        </div>
      ))}
      <div className="bg-background flex flex-col justify-end rounded-xl p-5">
        <span className="text-primary text-[11px] font-semibold tracking-[0.08em] uppercase">
          Chi c’è dietro
        </span>
        <JointVenture
          className="mt-2 !text-[15px] leading-snug"
          label="RelateSales nasce in joint venture con"
        />
      </div>
    </div>
  )
}

const panels: Record<MenuId, () => React.JSX.Element> = {
  prodotto: ProductPanel,
  perche: WhyPanel,
}

/* ---------- Navbar ---------- */

export function Nav() {
  const { scrollY } = useScroll()
  const { path } = useRouter()
  const [scrolled, setScrolled] = useState(false)
  const [menu, setMenu] = useState<MenuId | null>(null)
  const [mobile, setMobile] = useState(false)
  const closeTimer = useRef<number>(0)
  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 8))

  // Chiude tutto quando si cambia pagina (aggiornamento durante il render, senza effect)
  const [lastPath, setLastPath] = useState(path)
  if (path !== lastPath) {
    setLastPath(path)
    setMenu(null)
    setMobile(false)
  }
  useEffect(() => {
    const onKey = (e: KeyboardEvent) =>
      e.key === 'Escape' && (setMenu(null), setMobile(false))
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  const openedAt = useRef(0)
  const open = (id: MenuId, at: number) => {
    window.clearTimeout(closeTimer.current)
    if (menu !== id) openedAt.current = at
    setMenu(id)
  }
  // Il clic chiude solo se il menu non è stato appena aperto dal passaggio del mouse
  const toggle = (id: MenuId, at: number) => {
    if (menu === id && at - openedAt.current > 400) setMenu(null)
    else open(id, at)
  }
  const scheduleClose = () => {
    window.clearTimeout(closeTimer.current)
    closeTimer.current = window.setTimeout(() => setMenu(null), 140)
  }

  const glass = scrolled || menu !== null || mobile
  const Panel = menu ? panels[menu] : null

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-40 px-3 pt-3"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
    >
      <div
        className="relative mx-auto max-w-6xl"
        onMouseLeave={scheduleClose}
        onMouseEnter={() => menu && window.clearTimeout(closeTimer.current)}
      >
        <nav
          className={`relative z-10 flex h-14 items-center gap-2 rounded-2xl px-3 pl-3 transition-[background-color,box-shadow,backdrop-filter] duration-300 ease-out sm:gap-6 sm:pl-4 ${
            glass
              ? 'bg-white/70 shadow-[0_0_0_0.5px_rgba(0,0,0,0.08),0_8px_24px_rgba(0,0,0,0.06)] backdrop-blur-xl backdrop-saturate-[1.8]'
              : 'bg-transparent'
          }`}
          aria-label="Principale"
        >
          <a href="/" aria-label="RelateSales, home">
            <Logo compact />
          </a>
          <ul className="ml-4 hidden items-center md:flex">
            {(['prodotto', 'perche'] as const).map((id) => (
              <li key={id}>
                <button
                  onMouseEnter={(e) => open(id, e.timeStamp)}
                  onClick={(e) => toggle(id, e.timeStamp)}
                  aria-expanded={menu === id}
                  className={`flex items-center gap-1 rounded-lg px-3 py-2 text-[14px] font-medium transition-colors duration-200 ${
                    menu === id
                      ? 'bg-fill text-foreground'
                      : 'text-foreground/75 hover:text-foreground'
                  }`}
                >
                  {id === 'prodotto' ? 'Prodotto' : 'Perché RelateSales'}
                  <motion.span
                    animate={{ rotate: menu === id ? 180 : 0 }}
                    transition={{ duration: 0.25, ease: EASE }}
                  >
                    <ChevronDown size={14} />
                  </motion.span>
                </button>
              </li>
            ))}
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onMouseEnter={scheduleClose}
                  className="text-foreground/75 hover:bg-fill hover:text-foreground block rounded-lg px-3 py-2 text-[14px] font-medium transition-colors duration-200"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <DemoButton size="md" className="ml-auto" />
          <button
            className="hover:bg-fill grid size-9 place-items-center rounded-lg transition-colors md:hidden"
            onClick={() => setMobile((o) => !o)}
            aria-expanded={mobile}
            aria-label="Menu"
          >
            {mobile ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>

        {/* Mega-menu desktop: il pannello resta lo stesso e ne cambia solo il contenuto */}
        <AnimatePresence>
          {Panel && (
            <motion.div
              key="panel"
              className="absolute inset-x-0 top-full hidden pt-2 md:block"
              initial={{ opacity: 0, y: -6, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -6, filter: 'blur(6px)' }}
              transition={{ duration: 0.25, ease: EASE }}
            >
              <motion.div
                layout
                className="shadow-popover overflow-hidden rounded-2xl bg-white/95 backdrop-blur-2xl backdrop-saturate-[1.8]"
                transition={{ layout: { duration: 0.3, ease: EASE } }}
              >
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={menu}
                    initial={{
                      opacity: 0,
                      x: menu === 'perche' ? 16 : -16,
                      filter: 'blur(4px)',
                    }}
                    animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                    exit={{
                      opacity: 0,
                      x: menu === 'perche' ? -16 : 16,
                      filter: 'blur(4px)',
                    }}
                    transition={{ duration: 0.25, ease: EASE }}
                  >
                    <Panel />
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Menu mobile */}
      <AnimatePresence>
        {mobile && (
          <motion.div
            className="shadow-popover mx-auto mt-2 max-h-[calc(100dvh-90px)] max-w-6xl origin-top overflow-y-auto rounded-2xl bg-white/95 p-3 backdrop-blur-xl md:hidden"
            initial={{ opacity: 0, scale: 0.97, y: -6, filter: 'blur(4px)' }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.98, y: -4, filter: 'blur(4px)' }}
            transition={{ duration: 0.25, ease: EASE }}
          >
            <p className="text-muted px-2 pt-1 pb-1 text-[11px] font-semibold tracking-[0.08em] uppercase">
              Prodotto
            </p>
            {FEATURES.map((f) => {
              const Icon = f.icon
              return (
                <a
                  key={f.slug}
                  href={`/prodotto/${f.slug}`}
                  className="hover:bg-fill flex items-center gap-3 rounded-lg px-2 py-2.5 text-[16px] font-medium"
                >
                  <Icon size={18} strokeWidth={1.8} className="text-primary" />{' '}
                  {f.name}
                </a>
              )
            })}
            <p className="text-muted mt-3 px-2 pt-2 pb-1 text-[11px] font-semibold tracking-[0.08em] uppercase">
              Perché RelateSales
            </p>
            {why.map((w) => (
              <a
                key={w.href}
                href={w.href}
                className="hover:bg-fill block rounded-lg px-2 py-2.5 text-[16px] font-medium"
              >
                {w.t}
              </a>
            ))}
            <div className="border-separator mt-3 border-t-[0.5px] pt-3">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="hover:bg-fill block rounded-lg px-2 py-2.5 text-[16px] font-medium"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
