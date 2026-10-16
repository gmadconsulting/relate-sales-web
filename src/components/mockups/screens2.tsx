import {
  BriefcaseBusiness,
  CalendarClock,
  ChevronDown,
  Download,
  Ellipsis,
  EllipsisVertical,
  ExternalLink,
  Funnel,
  ListTodo,
  Mail,
  Phone,
  Plus,
  Upload,
} from 'lucide-react'
import type { ReactNode } from 'react'
import { Seq, SeqItem } from '@/lib/motion'
import { AppFrame, APP_H, APP_W } from './AppFrame'
import { stages } from './data'
import { Btn, Dot, Initials, PageHeader, SearchBox, Segmented } from './kit'
import { PipelineScreen } from './screens'

/* Schermate aggiuntive per le pagine funzione, ricostruite sugli screenshot reali. */

function Card({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={`shadow-card rounded-[14px] bg-white ${className}`}>
      {children}
    </div>
  )
}

/* ================= Scheda trattativa (sheet sopra la bacheca) ================= */

export function DealSheetScreen() {
  return (
    <div className="relative" style={{ width: APP_W, height: APP_H }}>
      <PipelineScreen />
      <div className="absolute inset-0 rounded-[14px] bg-black/28" />
      <div className="bg-background shadow-sheet absolute top-11 bottom-0 left-1/2 flex w-[640px] -translate-x-1/2 flex-col overflow-hidden rounded-t-[14px]">
        <div className="border-separator grid h-14 shrink-0 grid-cols-[1fr_auto_1fr] items-center border-b-[0.5px] bg-[rgba(242,242,247,0.86)] px-6 text-[17px]">
          <span className="text-primary">Annulla</span>
          <span className="font-semibold">Trattativa</span>
          <span className="text-primary text-right font-semibold">Salva</span>
        </div>
        <Seq className="flex-1 overflow-hidden px-6 pt-6" gap={0.07}>
          <SeqItem className="flex items-center gap-4">
            <Initials text="DF" size={56} />
            <div>
              <p className="font-display text-[24px] leading-tight font-bold">
                Davide Ferraresi
              </p>
              <p className="text-muted text-[14px]">
                Meccanica Ferraresi · Metalmeccanico
              </p>
            </div>
          </SeqItem>
          <SeqItem className="mt-6 grid grid-cols-4 gap-2.5">
            {[
              [Phone, 'Chiama', true],
              [Mail, 'Email', false],
              [CalendarClock, 'Appuntamento', false],
              [ListTodo, 'Nuova task', false],
            ].map(([Icon, l, accent]) => {
              const I = Icon as typeof Phone
              return (
                <span
                  key={l as string}
                  className={`shadow-card flex h-16 flex-col items-center justify-center gap-1 rounded-xl bg-white text-[13px] font-medium ${
                    accent ? 'text-primary' : ''
                  }`}
                >
                  <I size={20} strokeWidth={1.7} />
                  {l as string}
                </span>
              )
            })}
          </SeqItem>
          <SeqItem className="mt-5">
            <Segmented
              items={[
                'Dettagli',
                'Task',
                'Chat',
                'Note',
                'Documenti',
                'Storico',
              ]}
              active={0}
              className="w-full"
            />
          </SeqItem>
          <SeqItem className="mt-5">
            <div className="mb-2 flex items-center justify-between px-1 text-[14px]">
              <span className="text-muted">Fase</span>
              <span className="text-warning font-medium">
                Ferma in Preventivo da 21 giorni
              </span>
            </div>
            <Card className="px-5 pt-4 pb-1">
              <div className="flex gap-1">
                {stages.map((s, i) => (
                  <span
                    key={s.id}
                    className={`h-1.5 flex-1 rounded-full ${i <= 2 ? 'bg-primary' : 'bg-fill'}`}
                  />
                ))}
              </div>
              <span className="mt-4 flex h-10 items-center justify-between rounded-[10px] px-3 text-[15px] shadow-[0_0_0_0.5px_rgba(60,60,67,0.25)]">
                Preventivo <ChevronDown size={16} className="text-muted" />
              </span>
              <div className="border-separator text-primary mt-3 flex gap-6 border-t-[0.5px] py-3 text-[15px] font-medium">
                <span>Segna come scartata</span>
                <span>Segna come persa</span>
              </div>
            </Card>
          </SeqItem>
          <SeqItem className="mt-5">
            <p className="text-muted mb-2 px-1 text-[14px]">
              Tentativi di chiamata
            </p>
            <Card className="px-5">
              {[
                ['8 ott 2026, 10:14', 'Non risponde'],
                ['9 ott 2026, 11:20', 'Parlato con il cliente · 6 min'],
              ].map(([d, r]) => (
                <div
                  key={d}
                  className="border-separator flex items-center justify-between border-b-[0.5px] py-3 text-[14px] last:border-0"
                >
                  <span className="flex items-center gap-2">
                    <Phone size={14} className="text-muted" /> {d}
                  </span>
                  <span className="text-muted">{r}</span>
                </div>
              ))}
            </Card>
            <p className="text-muted mt-2 px-1 text-[13px] leading-snug">
              Le chiamate partono dalla scheda: il numero viene copiato e la
              conversazione registrata nelle note.
            </p>
          </SeqItem>
          <SeqItem className="mt-5">
            <p className="text-muted mb-2 px-1 text-[14px]">Dettagli</p>
            <Card className="px-5">
              {[
                ['Titolo', 'Banchi di collaudo'],
                ['Valore', '39.500 €'],
                ['Scadenza', '31 ott 2026'],
                ['Assegnata a', 'Marco Rinaldi'],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="border-separator flex items-center justify-between border-b-[0.5px] py-3 text-[15px] last:border-0"
                >
                  <span>{k}</span>
                  <span className="tabular text-muted">{v}</span>
                </div>
              ))}
            </Card>
          </SeqItem>
        </Seq>
      </div>
    </div>
  )
}

/* ================= Contatti — rubrica ================= */

const rows = [
  {
    i: 'AO',
    c: 'Acciaierie Orobiche',
    p: 'Ing. Paolo Riva',
    s: 3,
    r: 'Direttore tecnico',
    set: 'Siderurgico',
  },
  {
    i: 'CL',
    c: 'Carpenterie Lombarde',
    p: 'Giulia Mauri',
    s: 1,
    r: 'Titolare/Socio',
    set: 'Metalmeccanico',
  },
  {
    i: 'FB',
    c: 'Fonderia Bassi Srl',
    p: 'Renato Bassi',
    s: 0,
    r: 'Titolare/Socio',
    set: 'Fonderia',
  },
  {
    i: 'LP',
    c: 'Laminati Piave',
    p: 'Elena Toffoli',
    s: 4,
    r: 'Ufficio acquisti',
    set: 'Metalmeccanico',
  },
  {
    i: 'MF',
    c: 'Meccanica Ferraresi',
    p: 'Davide Ferraresi',
    s: 2,
    r: 'Titolare/Socio',
    set: 'Metalmeccanico',
  },
  {
    i: 'OG',
    c: 'Officine Galli',
    p: 'Sara Galli',
    s: 1,
    r: 'Direttore commerciale',
    set: 'Impiantistica',
  },
  {
    i: 'PV',
    c: 'Plastiche Venete SpA',
    p: 'Marta Zanon',
    s: 0,
    r: '',
    set: 'Plastica',
  },
  {
    i: 'SB',
    c: 'Stampaggi Brianza',
    p: 'Luca Brambilla',
    s: 3,
    r: 'Titolare/Socio',
    set: 'Metalmeccanico',
  },
  {
    i: 'TV',
    c: 'Tornerie Valtrompia',
    p: 'Giorgio Lanfranchi',
    s: 0,
    r: '',
    set: '',
  },
]

export function ContactsListScreen() {
  return (
    <AppFrame page="contatti">
      <PageHeader
        title="Contatti"
        subtitle="148 contatti nella rubrica commerciale"
        actions={
          <>
            <Btn icon={<Upload size={16} />}>Importa</Btn>
            <Btn icon={<Download size={16} />}>Esporta</Btn>
            <Btn variant="primary" icon={<Plus size={17} strokeWidth={2.2} />}>
              Nuovo contatto
            </Btn>
          </>
        }
      />
      <div className="mb-4 flex items-center gap-3">
        <div className="bg-fill inline-flex gap-0.5 rounded-[9px] p-0.5 text-[13px]">
          <span className="flex h-8 items-center rounded-[7px] bg-white px-3 font-semibold shadow-[0_1px_3px_rgba(0,0,0,0.12)]">
            Tutti · 148
          </span>
          <span className="flex h-8 items-center gap-2 px-3 font-medium">
            Generale · 148 <Ellipsis size={14} className="text-muted" />
          </span>
        </div>
        <span className="text-primary flex items-center gap-1 text-[14px] font-medium">
          <Plus size={15} /> Nuova lista
        </span>
        <SearchBox placeholder="Cerca contatti" className="ml-auto w-[340px]" />
      </div>
      <div className="grid grid-cols-[1fr_340px] gap-5">
        <Card className="overflow-hidden">
          <div className="border-separator text-muted grid grid-cols-[28px_1.6fr_0.9fr_1fr_0.9fr] items-center gap-3 border-b-[0.5px] px-4 py-3 text-[11px] font-semibold tracking-[0.08em] uppercase">
            <span className="border-primary/70 size-4 rounded-[4px] border-[1.5px]" />
            <span>Contatto</span>
            <span className="flex items-center gap-1">
              <Funnel size={12} /> Fase
            </span>
            <span className="flex items-center gap-1">
              Ruolo <EllipsisVertical size={12} />
            </span>
            <span className="flex items-center gap-1">
              Settore <EllipsisVertical size={12} />
            </span>
          </div>
          <Seq gap={0.04}>
            {rows.map((r, k) => (
              <SeqItem
                key={r.c}
                className={`border-separator grid h-[60px] grid-cols-[28px_1.6fr_0.9fr_1fr_0.9fr] items-center gap-3 border-b-[0.5px] px-4 text-[14px] last:border-0 ${
                  k === 0 ? 'bg-warning-soft' : ''
                }`}
              >
                <span className="border-primary/70 size-4 rounded-[4px] border-[1.5px]" />
                <span className="flex min-w-0 items-center gap-3">
                  <Initials text={r.i} size={34} />
                  <span className="min-w-0">
                    <span className="block truncate font-semibold">{r.c}</span>
                    <span className="text-muted block truncate text-[13px]">
                      {r.p}
                    </span>
                  </span>
                </span>
                <span className="flex items-center gap-2">
                  <Dot color={stages[r.s].color} /> {stages[r.s].name}
                </span>
                <span className={r.r ? '' : 'text-tertiary italic'}>
                  {r.r || 'vuoto'}
                </span>
                <span className={r.set ? '' : 'text-tertiary italic'}>
                  {r.set || 'vuoto'}
                </span>
              </SeqItem>
            ))}
          </Seq>
        </Card>
        <Seq gap={0.08} delay={0.25}>
          <SeqItem>
            <Card className="flex flex-col items-center px-5 pt-6 pb-5">
              <Initials text="AO" size={76} />
              <p className="font-display mt-3 text-[22px] leading-tight font-bold">
                Acciaierie Orobiche
              </p>
              <p className="text-muted text-[14px]">Ing. Paolo Riva</p>
              <span className="bg-fill mt-2 inline-flex h-6 items-center gap-1.5 rounded-md px-2 text-[13px] font-medium">
                <Dot color="var(--color-stage-4)" size={7} /> Trattativa
              </span>
              <div className="mt-4 grid w-full grid-cols-3 gap-2">
                {[
                  [Phone, 'Chiama'],
                  [Mail, 'Email'],
                  [BriefcaseBusiness, 'Trattativa'],
                ].map(([Icon, l]) => {
                  const I = Icon as typeof Phone
                  return (
                    <span
                      key={l as string}
                      className="bg-grouped flex h-[66px] flex-col items-center justify-center gap-1 rounded-xl text-[13px] font-medium"
                    >
                      <I size={19} strokeWidth={1.7} />
                      {l as string}
                    </span>
                  )
                })}
              </div>
            </Card>
          </SeqItem>
          <SeqItem className="mt-4">
            <Card className="px-5">
              {[
                ['Telefono', '+39 035 482 1190', true],
                ['Email', 'p.riva@acciaierieorobiche.it', false],
                ['Entrata', '2 set 2026', false],
              ].map(([k, v, a]) => (
                <div
                  key={k as string}
                  className="border-separator flex items-center justify-between border-b-[0.5px] py-3 text-[14px] last:border-0"
                >
                  <span>{k}</span>
                  <span className={a ? 'text-primary' : 'text-muted'}>{v}</span>
                </div>
              ))}
            </Card>
          </SeqItem>
          <SeqItem className="mt-4">
            <span className="bg-primary-hover grid h-11 place-items-center rounded-xl text-[15px] font-semibold text-white">
              Apri profilo 360°
            </span>
          </SeqItem>
        </Seq>
      </div>
    </AppFrame>
  )
}

/* ================= Registrazioni ================= */

function Recording({
  title,
  date,
  context,
  points,
}: {
  title: string
  date: string
  context: string[]
  points: string[]
}) {
  return (
    <Card className="p-6">
      <div className="flex items-baseline justify-between gap-6">
        <p className="truncate text-[17px] font-semibold">{title}</p>
        <span className="text-muted shrink-0 text-[14px]">{date}</span>
      </div>
      <p className="mt-3 text-[14px] font-semibold">Contesto dell’incontro</p>
      <ul className="text-foreground/80 mt-1 space-y-1 pl-4 text-[14px]">
        {context.map((c) => (
          <li key={c} className="list-disc">
            {c}
          </li>
        ))}
      </ul>
      <p className="mt-3 text-[14px] font-semibold">Punti chiave</p>
      <ul className="text-foreground/80 mt-1 space-y-1 pl-4 text-[14px]">
        {points.map((c) => (
          <li key={c} className="list-disc">
            {c}
          </li>
        ))}
      </ul>
      <p className="text-primary mt-4 flex items-center gap-1 text-[14px] font-medium">
        Mostra trascrizione <ChevronDown size={15} />
      </p>
      <p className="text-foreground/80 mt-3 flex items-center gap-1.5 text-[14px]">
        <ExternalLink size={14} /> Nota originale
      </p>
      <div className="border-separator mt-4 border-t-[0.5px] pt-4">
        <p className="text-muted text-[13px]">Cerca un altro contatto</p>
        <SearchBox
          placeholder="Cerca per nome, contatto o email"
          className="mt-2 h-10 w-full"
        />
      </div>
    </Card>
  )
}

export function RecordingsScreen() {
  return (
    <AppFrame page="registrazioni">
      <PageHeader
        title="Registrazioni"
        subtitle="2 conversazioni da collegare a un contatto"
      />
      <Seq className="w-[800px] space-y-4" gap={0.12}>
        <SeqItem>
          <Recording
            title="Acciaierie Orobiche — sopralluogo carroponte 20 t"
            date="15 ott 2026, 11:42"
            context={[
              'Sopralluogo in stabilimento con il direttore tecnico',
              'Interesse confermato per la versione con radiocomando',
            ]}
            points={[
              'Luce del capannone: 24 m, portata richiesta 20 t',
              'Consegna richiesta entro fine gennaio',
              'Prossimo passo: offerta aggiornata entro venerdì',
            ]}
          />
        </SeqItem>
        <SeqItem>
          <Recording
            title="Telefonata con Stampaggi Brianza"
            date="14 ott 2026, 09:05"
            context={['Richiamo sull’offerta per la manutenzione delle presse']}
            points={[
              'Chiede la manutenzione programmata inclusa',
              'Visita confermata per giovedì alle 15',
            ]}
          />
        </SeqItem>
      </Seq>
    </AppFrame>
  )
}
