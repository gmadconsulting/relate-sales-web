import {
  Bell,
  CalendarDays,
  ChartColumn,
  ChevronLeft,
  ChevronsUpDown,
  FolderOpen,
  Mail,
  MessageCircle,
  Mic,
  Search,
  SlidersHorizontal,
  SquareCheck,
  SquareKanban,
  Users,
} from 'lucide-react'
import type { ReactNode } from 'react'
import { LogoMark } from '@/components/Logo'
import { Initials } from './kit'

export type AppPage =
  | 'panoramica'
  | 'trattative'
  | 'contatti'
  | 'attivita'
  | 'calendario'
  | 'posta'
  | 'registrazioni'
  | 'materiali'

type NavItem = {
  id: AppPage
  label: string
  icon: typeof Users
  count?: number
}

const nav: { group: string; items: NavItem[] }[] = [
  {
    group: 'Vendite',
    items: [
      { id: 'panoramica', label: 'Panoramica', icon: ChartColumn },
      { id: 'trattative', label: 'Trattative', icon: SquareKanban, count: 37 },
      { id: 'contatti', label: 'Contatti', icon: Users },
      { id: 'attivita', label: 'Attività', icon: SquareCheck, count: 9 },
    ],
  },
  {
    group: 'Comunicazione',
    items: [
      { id: 'calendario', label: 'Calendario', icon: CalendarDays },
      { id: 'posta', label: 'Posta', icon: Mail },
      { id: 'registrazioni', label: 'Registrazioni', icon: Mic, count: 2 },
      { id: 'materiali', label: 'Materiali', icon: FolderOpen },
    ],
  },
]

/** Misure reali della finestra del gestionale (≈ MacBook 14"). */
export const APP_W = 1480
export const APP_H = 860

/** Shell del gestionale: sidebar 248px #ECECF0 + area contenuto #F5F5F7 + chat flottante. */
export function AppFrame({
  page,
  children,
  bare = false,
}: {
  page: AppPage
  children: ReactNode
  bare?: boolean
}) {
  return (
    <div
      className="bg-background text-foreground shadow-window flex overflow-hidden rounded-[14px]"
      style={{ width: APP_W, height: APP_H }}
    >
      <aside className="bg-sidebar flex w-[248px] shrink-0 flex-col border-r-[0.5px] border-black/8 px-3 pt-5 pb-3">
        <div className="flex items-center gap-2.5 px-1.5">
          <LogoMark className="size-8 rounded-[9px]" />
          <span className="min-w-0 flex-1 leading-tight">
            <span className="block text-[14px] font-semibold">
              Officine Testa
            </span>
            <span className="text-muted block text-[12px]">Titolare</span>
          </span>
          <ChevronsUpDown size={15} className="text-muted" />
        </div>

        <div className="text-muted mt-4 flex h-8 items-center gap-2 rounded-lg bg-black/6 px-2.5 text-[14px]">
          <Search size={15} strokeWidth={1.9} />
          <span className="flex-1">Cerca</span>
          <span className="text-[11px] tracking-wide">⌘K</span>
        </div>

        {nav.map((g) => (
          <div key={g.group} className="mt-5">
            <p className="text-muted mb-1 px-2.5 text-[11px] font-medium">
              {g.group}
            </p>
            {g.items.map(({ id, label, icon: Icon, count }) => {
              const active = id === page
              return (
                <div
                  key={id}
                  className={`flex h-[34px] items-center gap-2.5 rounded-lg px-2.5 text-[14px] ${
                    active ? 'bg-black/8 font-semibold' : ''
                  }`}
                >
                  <Icon
                    size={17}
                    strokeWidth={1.7}
                    className={active ? 'text-primary' : 'text-foreground/70'}
                  />
                  <span className="flex-1">{label}</span>
                  {count != null && (
                    <span className="tabular text-muted text-[12px] font-normal">
                      {count}
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        ))}

        <div className="mt-auto">
          <p className="text-muted flex items-center gap-1.5 px-2.5 pb-3 text-[13px]">
            <ChevronLeft size={14} /> Riduci menu
          </p>
          <div className="border-t-[0.5px] border-black/12 pt-3">
            <p className="flex h-[34px] items-center gap-2.5 px-2.5 text-[14px]">
              <SlidersHorizontal
                size={17}
                strokeWidth={1.7}
                className="text-foreground/70"
              />{' '}
              Impostazioni
            </p>
            <div className="mt-1.5 flex items-center gap-2.5 px-1.5">
              <Initials text="GT" size={32} />
              <span className="min-w-0 flex-1 leading-tight">
                <span className="block truncate text-[13px] font-semibold">
                  Giovanni Testa
                </span>
                <span className="text-muted block truncate text-[11px]">
                  g.testa@officinetesta.it
                </span>
              </span>
              <Bell size={16} strokeWidth={1.7} className="text-muted" />
            </div>
          </div>
        </div>
      </aside>

      <main
        className={`relative min-w-0 flex-1 overflow-hidden ${bare ? '' : 'px-8 pt-8'}`}
      >
        {children}
        <span className="bg-primary shadow-popover absolute right-6 bottom-6 z-10 grid size-14 place-items-center rounded-full text-white">
          <MessageCircle size={24} strokeWidth={1.9} />
        </span>
      </main>
    </div>
  )
}
