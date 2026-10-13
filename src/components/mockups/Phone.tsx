import {
  ArrowRight,
  CalendarCheck,
  Check,
  ChartColumn,
  Circle,
  CircleCheck,
  Ellipsis,
  Mic,
  Paperclip,
  Phone as PhoneIcon,
  PhoneOff,
  SquareCheck,
  SquareKanban,
  Users,
  Volume2,
} from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import type { ReactNode } from 'react'
import { EASE, Seq, SeqItem } from '@/lib/motion'
import { Initials } from './kit'

export const PHONE_W = 300
export const PHONE_H = 620

function StatusBar({ dark = false }: { dark?: boolean }) {
  return (
    <div
      className={`flex h-11 items-end justify-between px-6 pb-1 text-[13px] font-semibold ${dark ? 'text-white' : ''}`}
    >
      <span>9:41</span>
      <span className="h-2.5 w-4 rounded-[3px] border-[1.5px] border-current" />
    </div>
  )
}

/** Tab bar mobile del gestionale: 4 voci + Altro. */
function TabBar({ active }: { active: number }) {
  const tabs = [
    [ChartColumn, 'Panoramica'],
    [SquareKanban, 'Trattative'],
    [Users, 'Contatti'],
    [SquareCheck, 'Attività'],
    [Ellipsis, 'Altro'],
  ] as const
  return (
    <div className="border-separator absolute inset-x-0 bottom-0 flex h-[70px] justify-around border-t-[0.5px] bg-[rgba(249,249,251,0.94)] pt-2 backdrop-blur">
      {tabs.map(([Icon, l], i) => (
        <span
          key={l}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-medium ${i === active ? 'text-primary' : 'text-muted'}`}
        >
          <Icon size={20} strokeWidth={1.7} />
          {l}
        </span>
      ))}
    </div>
  )
}

function Screen({
  title,
  sub,
  tab,
  children,
}: {
  title: string
  sub: string
  tab: number
  children: ReactNode
}) {
  return (
    <div className="bg-background relative h-full">
      <StatusBar />
      <div className="px-4 pt-2">
        <h4 className="font-display text-[28px] font-bold tracking-[-0.02em]">
          {title}
        </h4>
        <p className="text-muted text-[13px]">{sub}</p>
        {children}
      </div>
      <TabBar active={tab} />
    </div>
  )
}

const Task = ({
  t,
  p,
  d,
  done = false,
  hi = false,
}: {
  t: string
  p: string
  d: string
  done?: boolean
  hi?: boolean
}) => (
  <SeqItem
    className={`flex gap-2.5 rounded-xl bg-white p-3 ${hi ? 'shadow-[0_0_0_1.5px_#FD6C01]' : 'shadow-card'}`}
  >
    {done ? (
      <motion.span
        initial={{ scale: 0.6 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 500, damping: 22 }}
      >
        <CircleCheck size={20} className="text-success shrink-0" />
      </motion.span>
    ) : (
      <Circle size={20} strokeWidth={1.4} className="text-tertiary shrink-0" />
    )}
    <div className="min-w-0 flex-1">
      <p
        className={`text-[14px] font-semibold ${done ? 'text-muted line-through' : ''}`}
      >
        {t}
      </p>
      <p className="text-muted truncate text-[12px]">{p}</p>
      <p className="mt-1.5 flex items-center gap-1.5">
        <span
          className={`text-[12px] font-semibold ${done ? 'text-muted' : 'text-destructive'}`}
        >
          {d}
        </span>
        <Initials text="MR" size={18} />
      </p>
    </div>
  </SeqItem>
)

const steps: ReactNode[] = [
  // 8:30 — attività di oggi
  <Screen key="a" title="Attività" sub="Oggi · 4 da fare" tab={3}>
    <Seq className="mt-4 space-y-2" gap={0.08}>
      <Task t="Richiamare" p="Luca Brambilla · Stampaggi Brianza" d="Oggi" hi />
      <Task t="Richiamare" p="Sara Galli · Officine Galli" d="Oggi" />
      <Task
        t="Richiamare"
        p="Giorgio Lanfranchi · Tornerie Valtrompia"
        d="Oggi"
      />
      <Task
        t="Visita in stabilimento"
        p="Renato Bassi · Fonderia Bassi Srl"
        d="15:00"
      />
    </Seq>
  </Screen>,
  // 9:00 — chiamata con un tocco
  <div
    key="b"
    className="flex h-full flex-col items-center bg-[#1C1C1E] text-white"
  >
    <StatusBar dark />
    <span className="mt-16 grid size-20 place-items-center rounded-full bg-white/15 text-[26px] font-semibold">
      LB
    </span>
    <p className="mt-4 text-[24px] font-semibold">Luca Brambilla</p>
    <p className="tabular text-[14px] text-white/60">
      Stampaggi Brianza · 02:14
    </p>
    <div className="mt-auto mb-10 grid grid-cols-3 gap-x-6 gap-y-5">
      {[Mic, Volume2, PhoneIcon].map((I, i) => (
        <span
          key={i}
          className="grid size-14 place-items-center rounded-full bg-white/15"
        >
          <I size={22} />
        </span>
      ))}
      <span />
      <span className="bg-destructive grid size-14 place-items-center rounded-full">
        <PhoneOff size={22} />
      </span>
    </div>
    <motion.div
      className="mx-4 mb-6 flex items-center gap-2 self-stretch rounded-xl bg-white/10 px-3 py-2.5 text-[12px]"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE, delay: 0.5 }}
    >
      <Check size={14} className="text-[#34C759]" /> Chiamata registrata
    </motion.div>
  </div>,
  // 9:20 — email dal gestionale
  <div key="c" className="relative h-full bg-white">
    <StatusBar />
    <div className="border-separator flex h-12 items-center justify-between border-b-[0.5px] bg-[rgba(242,242,247,0.86)] px-4 text-[16px]">
      <span className="text-primary">Annulla</span>
      <span className="font-semibold">Nuova email</span>
      <span className="text-primary font-semibold">Invia</span>
    </div>
    <Seq className="px-4 text-[14px]" gap={0.1}>
      <SeqItem className="border-separator border-b-[0.5px] py-2.5">
        <span className="text-muted">A: </span>
        <span className="bg-brand-soft text-primary rounded-md px-1.5 py-0.5">
          Luca Brambilla
        </span>
      </SeqItem>
      <SeqItem className="border-separator border-b-[0.5px] py-2.5 font-medium">
        Offerta aggiornata — presse 400 t
      </SeqItem>
      <SeqItem className="text-foreground/85 py-3 leading-relaxed">
        Buongiorno Luca, come anticipato al telefono le invio l'offerta
        aggiornata con la manutenzione programmata inclusa.
      </SeqItem>
      <SeqItem>
        <span className="bg-grouped inline-flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-[12px]">
          <Paperclip size={13} className="text-muted" /> Offerta_presse_rev2.pdf
        </span>
      </SeqItem>
    </Seq>
    <motion.div
      className="bg-success-soft text-success absolute inset-x-4 bottom-6 rounded-xl px-3 py-2.5 text-[12px]"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE, delay: 0.7 }}
    >
      Email inviata dal gestionale
    </motion.div>
  </div>,
  // 11:00 — sposta la tessera
  <Screen key="d" title="Trattative" sub="Stampaggi Brianza" tab={1}>
    <div className="mt-4 space-y-2">
      {[
        ['Primo contatto', 'var(--color-stage-1)'],
        ['Sopralluogo', 'var(--color-stage-2)'],
        ['Preventivo', 'var(--color-stage-3)'],
        ['Trattativa', 'var(--color-stage-4)'],
        ['Ordine', 'var(--color-stage-5)'],
      ].map(([n, c], i) => (
        <div
          key={n}
          className="shadow-card relative flex items-center gap-2.5 rounded-xl bg-white px-3 py-3 text-[14px]"
        >
          {i === 2 && (
            <motion.span
              layoutId="phone-stage"
              className="absolute inset-0 rounded-xl shadow-[0_0_0_1.5px_#FD6C01]"
              initial={{ y: -52, opacity: 0.6 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 26,
                delay: 0.35,
              }}
            />
          )}
          <span className="size-2.5 rounded-full" style={{ background: c }} />
          <span
            className={i < 2 ? 'text-muted' : i === 2 ? 'font-semibold' : ''}
          >
            {n}
          </span>
          {i < 2 && <Check size={15} className="text-success ml-auto" />}
          {i === 2 && <ArrowRight size={15} className="text-primary ml-auto" />}
        </div>
      ))}
    </div>
    <p className="text-muted mt-3 text-center text-[12px]">
      Fase aggiornata alle 11:00
    </p>
  </Screen>,
  // 15:00 — visita, prossimo passo
  <div key="e" className="bg-grouped relative h-full">
    <StatusBar />
    <div className="border-separator flex h-12 items-center justify-between border-b-[0.5px] bg-[rgba(242,242,247,0.86)] px-4 text-[16px]">
      <span className="text-primary">Annulla</span>
      <span className="font-semibold">Nuova task</span>
      <span className="text-primary font-semibold">Salva</span>
    </div>
    <Seq className="space-y-3 p-4 text-[14px]" gap={0.1}>
      <SeqItem className="shadow-card rounded-xl bg-white">
        <p className="border-separator border-b-[0.5px] px-3 py-3 font-medium">
          Inviare offerta con varianti
        </p>
        <p className="flex items-center justify-between px-3 py-3">
          <span>Scadenza</span>
          <span className="bg-brand-soft text-primary rounded-md px-2 py-0.5 font-medium">
            Giovedì 15 ott
          </span>
        </p>
      </SeqItem>
      <SeqItem className="shadow-card rounded-xl bg-white">
        <p className="border-separator flex items-center justify-between border-b-[0.5px] px-3 py-3">
          <span>Trattativa</span>
          <span className="text-muted">Fonderia Bassi Srl</span>
        </p>
        <p className="flex items-center justify-between px-3 py-3">
          <span>Responsabile</span>
          <span className="text-muted">Marco Rinaldi</span>
        </p>
      </SeqItem>
      <SeqItem className="bg-info-soft text-info flex items-center gap-2 rounded-xl px-3 py-2.5 text-[12px]">
        <CalendarCheck size={14} /> Visita registrata · 15:00
      </SeqItem>
    </Seq>
  </div>,
  // 18:00 — giornata chiusa
  <Screen key="f" title="Attività" sub="Oggi · tutto fatto" tab={3}>
    <Seq className="mt-4 space-y-2" gap={0.1}>
      <Task
        t="Richiamare"
        p="Luca Brambilla · Stampaggi Brianza"
        d="9:00"
        done
      />
      <Task t="Richiamare" p="Sara Galli · Officine Galli" d="9:40" done />
      <Task
        t="Richiamare"
        p="Giorgio Lanfranchi · Tornerie Valtrompia"
        d="10:15"
        done
      />
      <Task
        t="Visita in stabilimento"
        p="Renato Bassi · Fonderia Bassi Srl"
        d="15:00"
        done
      />
    </Seq>
  </Screen>,
]

export const PHONE_STEPS = steps.length

/** Telefono con lo schermo che cambia in base allo step. */
export function Phone({ step }: { step: number }) {
  return (
    <div
      className="shadow-window relative rounded-[46px] bg-[#1C1C1E] p-[10px]"
      style={{ width: PHONE_W, height: PHONE_H }}
    >
      <div className="bg-background relative h-full overflow-hidden rounded-[37px]">
        <AnimatePresence initial={false}>
          <motion.div
            key={step}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.03, filter: 'blur(6px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.98, filter: 'blur(6px)' }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            {steps[step]}
          </motion.div>
        </AnimatePresence>
        <span className="absolute top-2.5 left-1/2 z-10 h-[26px] w-[90px] -translate-x-1/2 rounded-full bg-black" />
      </div>
    </div>
  )
}
