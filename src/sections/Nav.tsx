import { Menu, X } from 'lucide-react'
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from 'motion/react'
import { useState } from 'react'
import { Logo } from '@/components/Logo'
import { DemoButton } from '@/components/ui'
import { EASE } from '@/lib/motion'

const links = [
  { href: '/#come-funziona', label: 'Come funziona' },
  { href: '/#cosa-abbiamo-tolto', label: 'Cosa abbiamo tolto' },
  { href: '/#prezzi', label: 'Prezzi' },
  { href: '/#domande', label: 'Domande' },
]

export function Nav() {
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [hover, setHover] = useState<string | null>(null)
  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 8))

  const glass = scrolled || open

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-40 px-3 pt-3"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
    >
      <nav
        className={`mx-auto flex h-14 max-w-6xl items-center gap-2 rounded-2xl px-3 pl-3 transition-[background-color,box-shadow,backdrop-filter] duration-300 ease-out sm:gap-6 sm:pl-4 ${
          glass
            ? 'bg-white/65 shadow-[0_0_0_0.5px_rgba(0,0,0,0.08),0_8px_24px_rgba(0,0,0,0.06)] backdrop-blur-xl backdrop-saturate-[1.8]'
            : 'bg-transparent'
        }`}
        aria-label="Principale"
      >
        <a href="/#top" aria-label="RelateSales, torna su">
          <Logo compact />
        </a>
        <ul
          className="ml-auto hidden items-center md:flex"
          onMouseLeave={() => setHover(null)}
        >
          {links.map((l) => (
            <li key={l.href} className="relative">
              {hover === l.href && (
                <motion.span
                  layoutId="nav-hover"
                  className="bg-fill absolute inset-0 rounded-lg"
                  transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                />
              )}
              <a
                href={l.href}
                onMouseEnter={() => setHover(l.href)}
                className="text-foreground/75 hover:text-foreground relative block px-3 py-2 text-[14px] font-medium transition-colors duration-200"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <DemoButton size="md" className="ml-auto md:ml-0" />
        <button
          className="hover:bg-fill grid size-9 place-items-center rounded-lg transition-colors md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label="Menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.ul
            className="shadow-popover mx-auto mt-2 max-w-6xl origin-top rounded-2xl bg-white/90 p-2 backdrop-blur-xl md:hidden"
            initial={{ opacity: 0, scale: 0.97, y: -6, filter: 'blur(4px)' }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.98, y: -4, filter: 'blur(4px)' }}
            transition={{ duration: 0.25, ease: EASE }}
          >
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="hover:bg-fill block rounded-lg px-3 py-3 text-[16px] font-medium"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
