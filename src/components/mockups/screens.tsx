import {
  ArrowLeft,
  Bold,
  BriefcaseBusiness,
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Circle,
  Columns3,
  Ellipsis,
  FileText,
  GitCompareArrows,
  Italic,
  Link2,
  Mail,
  Mic,
  Paperclip,
  Pencil,
  Phone,
  Plus,
  RefreshCw,
  Search,
  Send,
  SlidersHorizontal,
  SquarePen,
  TriangleAlert,
  Underline,
  Undo2,
  Unlink,
  Link,
} from 'lucide-react'
import type { ReactNode } from 'react'
import { Grow, Seq, SeqItem } from '@/lib/motion'
import { AppFrame } from './AppFrame'
import { DealCard } from './DealCard'
import { deals, eur, stages } from './data'
import {
  Badge,
  Btn,
  Dot,
  Initials,
  PageHeader,
  SearchBox,
  Segmented,
} from './kit'

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
const SectionLabel = ({
  children,
  action,
}: {
  children: ReactNode
  action?: ReactNode
}) => (
  <div className="mb-2 flex items-center justify-between px-1">
    <p className="text-muted text-[14px]">{children}</p>
    {action}
  </div>
)
const Caps = ({ children }: { children: ReactNode }) => (
  <span className="text-muted text-[11px] font-semibold tracking-[0.08em] uppercase">
    {children}
  </span>
)

/* ================= 1. Panoramica ================= */

const kpis = [
  { label: 'Nuovi contatti', value: '18', delta: '+6 rispetto a prima' },
  { label: 'Ricavi', value: '88.800 €', delta: '+32% rispetto a prima' },
  { label: 'Conversione', value: '24%', delta: '+4 punti rispetto a prima' },
  { label: 'Trattative chiuse', value: '4', delta: '+1 rispetto a prima' },
  { label: 'Clienti visitati', value: '9', delta: '+3 rispetto a prima' },
]

const openTasks = [
  {
    t: "Richiamare per l'offerta",
    c: 'Meccanica Ferraresi · Preventivo',
    d: '8 ott',
    late: true,
  },
  {
    t: 'Inviare disegni esecutivi',
    c: 'Carpenterie Lombarde · Sopralluogo',
    d: 'Oggi',
    late: true,
  },
  {
    t: 'Visita in stabilimento',
    c: 'Fonderia Bassi Srl · Primo contatto',
    d: 'Oggi',
    late: true,
  },
  {
    t: 'Variante con radiocomando',
    c: 'Acciaierie Orobiche · Preventivo',
    d: '16 ott',
  },
  {
    t: 'Confermare tempi di consegna',
    c: 'Laminati Piave · Ordine',
    d: '17 ott',
  },
]

export function DashboardScreen() {
  const total = stages.reduce((a, s) => a + s.count, 0)
  return (
    <AppFrame page="panoramica">
      <PageHeader
        title="Panoramica"
        subtitle="7–13 ottobre · confronto con 30 settembre – 6 ottobre"
        actions={
          <>
            <Segmented
              items={['7 giorni', '30 giorni', 'Trimestre', 'Anno']}
              active={0}
            />
            <span className="text-muted grid size-9 place-items-center rounded-lg">
              <CalendarDays size={18} strokeWidth={1.7} />
            </span>
            <Btn variant="soft" icon={<GitCompareArrows size={16} />}>
              Confronta
            </Btn>
            <Btn icon={<FileText size={16} />}>Report PDF</Btn>
          </>
        }
      />
      <Seq className="grid grid-cols-5 gap-4" gap={0.06}>
        {kpis.map((k) => (
          <SeqItem key={k.label}>
            <Card className="px-5 py-5">
              <p className="text-muted text-[14px]">{k.label}</p>
              <p className="tabular mt-1.5 text-[30px] leading-none font-bold tracking-tight">
                {k.value}
              </p>
              <p className="text-success mt-3 text-[13px] font-medium">
                {k.delta}
              </p>
            </Card>
          </SeqItem>
        ))}
      </Seq>

      <div className="mt-7 grid grid-cols-[1fr_380px] gap-8">
        <div>
          <p className="font-display mb-2.5 px-1 text-[20px] font-bold">
            Contatti per fase
          </p>
          <Card className="px-6 py-5">
            <p className="tabular font-display text-[40px] leading-none font-bold">
              {total}
            </p>
            <p className="text-muted mt-1 text-[14px]">
              trattative nella pipeline oggi
            </p>
            <div className="mt-5 flex h-3.5 gap-0.5 overflow-hidden rounded-full">
              {stages.map((s, i) => (
                <Grow
                  key={s.id}
                  className="block h-full first:rounded-l-full last:rounded-r-full"
                  style={{
                    width: `${(s.count / total) * 100}%`,
                    background: s.color,
                  }}
                  delay={0.25 + i * 0.08}
                />
              ))}
            </div>
            <div className="mt-5 grid grid-cols-2 gap-x-10">
              <div className="border-separator flex justify-between border-b-[0.5px] pb-2">
                <Caps>Trattative</Caps>
              </div>
              <div className="border-separator flex justify-between border-b-[0.5px] pb-2">
                <Caps>Valore in ballo</Caps>
              </div>
              {stages.map((s) => (
                <Row2 key={s.id} s={s} total={total} />
              ))}
            </div>
            <div className="bg-warning-soft text-warning mt-5 flex items-start gap-3 rounded-xl px-4 py-3.5 text-[14px] leading-snug">
              <TriangleAlert size={18} className="mt-px shrink-0" />
              Tre trattative in Preventivo sono ferme da più di due settimane:
              richiama i clienti a cui hai mandato l'offerta.
            </div>
          </Card>
        </div>
        <div>
          <div className="mb-2.5 flex items-baseline justify-between px-1">
            <p className="font-display text-[20px] font-bold">
              Attività aperte
            </p>
            <span className="text-primary text-[14px] font-medium">
              Mostra tutte
            </span>
          </div>
          <Card className="overflow-hidden">
            <Seq gap={0.06} delay={0.3}>
              {openTasks.map((t) => (
                <SeqItem
                  key={t.t}
                  className="border-separator flex items-center gap-3 border-b-[0.5px] px-4 py-3 last:border-0"
                >
                  <Circle
                    size={22}
                    strokeWidth={1.4}
                    className="text-tertiary shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[15px]">{t.t}</p>
                    <p className="text-muted truncate text-[13px]">{t.c}</p>
                  </div>
                  <span
                    className={`text-[14px] font-semibold ${t.late ? 'text-destructive' : 'text-muted'}`}
                  >
                    {t.d}
                  </span>
                </SeqItem>
              ))}
            </Seq>
          </Card>
        </div>
      </div>
    </AppFrame>
  )
}

function Row2({ s, total }: { s: (typeof stages)[number]; total: number }) {
  return (
    <>
      <div className="border-separator flex items-center gap-2 border-b-[0.5px] py-2.5 text-[14px]">
        <Dot color={s.color} />
        <span className="flex-1">{s.name}</span>
        <span className="tabular w-8 text-right font-semibold">{s.count}</span>
        <span className="tabular text-muted w-12 text-right">
          {Math.round((s.count / total) * 100)}%
        </span>
      </div>
      <div className="border-separator flex items-center gap-2 border-b-[0.5px] py-2.5 text-[14px]">
        <Dot color={s.color} />
        <span className="flex-1">{s.name}</span>
        <span className="tabular font-semibold">
          {s.value ? eur(s.value) : '—'}
        </span>
      </div>
    </>
  )
}

/* ================= 2. Trattative ================= */

export function PipelineScreen({ highlight }: { highlight?: string }) {
  return (
    <AppFrame page="trattative">
      <PageHeader
        title="Trattative"
        subtitle={
          <span className="inline-flex items-center gap-1.5">
            37 trattative · 950.800 € in corso · 204.300 € vinto ·
            <span className="size-2 rounded-full bg-[#34C759]" /> In tempo reale
            con il team
          </span>
        }
        actions={
          <Btn variant="primary" icon={<Plus size={17} strokeWidth={2.2} />}>
            Nuova trattativa
          </Btn>
        }
      />
      <div className="mb-5 flex items-center gap-2">
        <SearchBox
          placeholder="Cerca per nome, azienda, email"
          className="w-[340px]"
        />
        <Btn icon={null}>
          Pipeline principale <ChevronDown size={15} />
        </Btn>
        <Btn>
          Lista: Tutte <ChevronDown size={15} />
        </Btn>
        <Btn>Solo ferme</Btn>
        <Btn>Assegnate a me</Btn>
        <span className="flex-1" />
        <Btn icon={<Columns3 size={16} strokeWidth={1.8} />}>Fasi</Btn>
        <Btn icon={<SlidersHorizontal size={16} strokeWidth={1.8} />}>
          Impostazioni
        </Btn>
      </div>
      <div className="flex gap-3.5">
        {stages.map((s, ci) => {
          const items = deals.filter((d) => d.stage === s.id)
          return (
            <div key={s.id} className="w-[280px] shrink-0">
              <div className="mb-2.5 flex items-center gap-2 px-1.5">
                <Dot color={s.color} size={10} />
                <span className="text-[15px] font-semibold">{s.name}</span>
                <span className="tabular text-muted text-[14px]">
                  {s.count}
                </span>
                <span className="tabular text-muted ml-auto text-[13px]">
                  {s.value ? eur(s.value) : ''}
                </span>
                <Ellipsis size={16} className="text-muted" />
              </div>
              <Seq
                className="bg-fill-soft flex flex-col gap-2 rounded-[14px] p-2"
                delay={0.1 + ci * 0.07}
                gap={0.07}
              >
                {items.map((d) => (
                  <SeqItem key={d.person}>
                    <DealCard deal={d} highlight={d.company === highlight} />
                  </SeqItem>
                ))}
                <SeqItem className="text-muted flex h-9 items-center gap-1.5 px-2 text-[14px]">
                  <Plus size={15} /> Aggiungi trattativa
                </SeqItem>
              </Seq>
            </div>
          )
        })}
      </div>
    </AppFrame>
  )
}

/* ================= 4. Contatti — profilo 360° ================= */

function ActionTile({
  icon,
  label,
  tone = 'text-foreground',
}: {
  icon: ReactNode
  label: string
  tone?: string
}) {
  return (
    <span
      className={`bg-grouped flex h-[72px] flex-1 flex-col items-center justify-center gap-1.5 rounded-xl text-[13px] font-medium ${tone}`}
    >
      {icon}
      {label}
    </span>
  )
}

export function ContactScreen() {
  return (
    <AppFrame page="contatti">
      <p className="text-primary mb-5 flex items-center gap-1.5 text-[15px] font-medium">
        <ArrowLeft size={17} /> Contatti
      </p>
      <div className="grid grid-cols-[360px_1fr] gap-6">
        <Seq gap={0.08}>
          <SeqItem>
            <Card className="flex flex-col items-center px-5 pt-6 pb-5">
              <Initials text="AO" size={84} />
              <p className="font-display mt-3 text-[24px] leading-tight font-bold">
                Acciaierie Orobiche
              </p>
              <p className="text-muted text-[14px]">Ing. Paolo Riva</p>
              <span className="bg-fill mt-2 inline-flex h-6 items-center gap-1.5 rounded-md px-2 text-[13px] font-medium">
                <Dot color="var(--color-stage-3)" size={7} /> Preventivo
              </span>
              <div className="mt-4 flex w-full gap-2">
                <ActionTile
                  icon={<Phone size={20} strokeWidth={1.7} />}
                  label="Chiama"
                />
                <ActionTile
                  icon={<Mail size={20} strokeWidth={1.7} />}
                  label="Email"
                />
                <ActionTile
                  icon={<BriefcaseBusiness size={20} strokeWidth={1.7} />}
                  label="Trattativa"
                />
              </div>
            </Card>
          </SeqItem>
          <SeqItem className="mt-5">
            <SectionLabel
              action={
                <span className="text-primary flex items-center gap-1 text-[14px] font-medium">
                  <Plus size={15} /> Aggiungi
                </span>
              }
            >
              Persone di riferimento
            </SectionLabel>
            <Card className="px-4">
              {[
                ['PR', 'Ing. Paolo Riva', 'Direttore tecnico', 'Principale'],
                ['CL', 'Chiara Locatelli', 'Ufficio acquisti', '2° contatto'],
              ].map(([i, n, r, b], k) => (
                <div
                  key={n}
                  className="border-separator flex items-center gap-3 border-b-[0.5px] py-3 last:border-0"
                >
                  <Initials text={i} size={36} />
                  <div>
                    <p className="flex items-center gap-2 text-[15px] font-semibold">
                      {n}{' '}
                      <Badge tone={k === 0 ? 'brand' : 'neutral'}>{b}</Badge>
                    </p>
                    <p className="text-muted text-[13px]">{r}</p>
                  </div>
                </div>
              ))}
            </Card>
          </SeqItem>
          <SeqItem className="mt-5">
            <SectionLabel
              action={
                <span className="text-primary flex items-center gap-1 text-[14px] font-medium">
                  <Pencil size={14} /> Modifica
                </span>
              }
            >
              Anagrafica
            </SectionLabel>
            <Card className="px-4">
              {[
                ['Telefono', '+39 035 482 1190', true],
                ['Email', 'p.riva@acciaierieorobiche.it', false],
                ['Settore', 'Siderurgico', false],
                ['Entrata', '2 set 2026', false],
              ].map(([k, v, accent]) => (
                <div
                  key={k as string}
                  className="border-separator flex items-center justify-between border-b-[0.5px] py-3 text-[14px] last:border-0"
                >
                  <span>{k}</span>
                  <span className={accent ? 'text-primary' : 'text-muted'}>
                    {v}
                  </span>
                </div>
              ))}
            </Card>
          </SeqItem>
        </Seq>

        <Seq gap={0.09} delay={0.2}>
          <SeqItem>
            <SectionLabel>Task</SectionLabel>
            <Card className="p-4">
              <div className="bg-grouped rounded-xl p-3 shadow-[inset_0_0_0_0.5px_rgba(60,60,67,0.18)]">
                <p className="text-tertiary text-[14px]">Nuova task…</p>
                <div className="mt-4 flex items-center gap-2">
                  <Btn
                    variant="outline"
                    icon={<CalendarDays size={14} />}
                    className="!h-8 text-[13px]"
                  >
                    Scadenza
                  </Btn>
                  <span className="flex-1" />
                  <Mic size={17} className="text-muted" />
                  <span className="bg-primary/45 inline-flex h-8 items-center gap-1 rounded-lg px-3 text-[13px] font-semibold text-white">
                    <Plus size={14} /> Aggiungi task
                  </span>
                </div>
              </div>
            </Card>
          </SeqItem>
          <SeqItem className="mt-5">
            <SectionLabel
              action={
                <span className="text-primary text-[14px] font-medium">
                  Carica
                </span>
              }
            >
              Documenti
            </SectionLabel>
            <Card className="px-4">
              {[
                ['Offerte, preventivi e contratti', '4'],
                ['Disegni e schede tecniche', '2'],
              ].map(([t, n]) => (
                <div
                  key={t}
                  className="border-separator flex items-center gap-3 border-b-[0.5px] py-3.5 text-[15px] last:border-0"
                >
                  <FileText
                    size={18}
                    strokeWidth={1.6}
                    className="text-muted"
                  />
                  <span className="flex-1">{t}</span>
                  <span className="text-muted text-[13px]">{n}</span>
                  <ChevronRight size={16} className="text-tertiary" />
                </div>
              ))}
            </Card>
          </SeqItem>
          <SeqItem className="mt-5">
            <SectionLabel>Registrazioni</SectionLabel>
            <Card className="p-4">
              <div className="rounded-xl p-4 shadow-[inset_0_0_0_0.5px_rgba(60,60,67,0.18)]">
                <div className="flex items-baseline justify-between gap-4">
                  <p className="text-[17px] font-semibold">
                    Telefonata con Ing. Paolo Riva
                  </p>
                  <span className="text-muted text-[13px] whitespace-nowrap">
                    9 ott 2026, 11:20
                  </span>
                </div>
                <p className="mt-1.5">
                  <Caps>Telefonata</Caps>
                </p>
                <p className="text-muted mt-1.5 text-[14px] leading-relaxed">
                  Il cliente conferma l'interesse per il carroponte da 20 t.
                  Chiede una variante con radiocomando e la consegna entro fine
                  gennaio. Prossimo passo: offerta aggiornata entro venerdì.
                </p>
                <p className="text-primary mt-3 flex items-center gap-1 text-[14px] font-medium">
                  Mostra trascrizione <ChevronDown size={15} />
                </p>
                <div className="border-separator mt-3 border-t-[0.5px] pt-3">
                  <Btn
                    variant="outline"
                    icon={<Unlink size={14} />}
                    className="!h-8 text-[13px]"
                  >
                    Scollega da questo contatto
                  </Btn>
                </div>
              </div>
            </Card>
          </SeqItem>
        </Seq>
      </div>
    </AppFrame>
  )
}

/* ================= 5. Attività ================= */

type Task = { t: string; p: string; d: string; o: string; late?: boolean }
const taskCols: { stage: (typeof stages)[number]; items: Task[] }[] = [
  {
    stage: stages[0],
    items: [
      {
        t: 'Visita in stabilimento',
        p: 'Renato Bassi',
        d: 'Oggi',
        late: true,
        o: 'MR',
      },
      {
        t: 'Richiamare dopo la fiera',
        p: 'Marta Zanon',
        d: '6 ott',
        late: true,
        o: 'SC',
      },
    ],
  },
  {
    stage: stages[1],
    items: [
      {
        t: 'Inviare disegni esecutivi',
        p: 'Giulia Mauri',
        d: 'Oggi',
        late: true,
        o: 'MR',
      },
      {
        t: 'Fissare sopralluogo impianto',
        p: 'Sara Galli',
        d: '15 ott',
        o: 'LG',
      },
    ],
  },
  {
    stage: stages[2],
    items: [
      {
        t: "Richiamare per l'offerta",
        p: 'Davide Ferraresi',
        d: '8 ott',
        late: true,
        o: 'MR',
      },
      {
        t: 'Variante con radiocomando',
        p: 'Ing. Paolo Riva',
        d: '16 ott',
        o: 'SC',
      },
      { t: 'Listino pallet 2027', p: 'Fabio Scotti', d: '20 ott', o: 'LG' },
    ],
  },
  {
    stage: stages[3],
    items: [
      {
        t: 'Confermare condizioni di pagamento',
        p: 'Luca Brambilla',
        d: '14 ott',
        o: 'MR',
      },
    ],
  },
  { stage: stages[4], items: [] },
]

export function ActivitiesScreen() {
  return (
    <AppFrame page="attivita">
      <PageHeader
        title="Attività"
        subtitle="9 aperte · organizzate per fase"
        actions={
          <Segmented items={['Da fare', 'Completate', 'Tutte']} active={0} />
        }
      />
      <div className="mb-6 flex items-center gap-2">
        <SearchBox
          placeholder="Cerca attività, trattativa, note"
          className="w-[330px]"
        />
        <Btn>
          Pipeline principale <ChevronDown size={15} />
        </Btn>
        <Btn>
          Ordina: Scadenza più vicina <ChevronDown size={15} />
        </Btn>
        <Btn>
          Scadenza: Tutte <ChevronDown size={15} />
        </Btn>
        <Btn>
          Creata da: Tutti <ChevronDown size={15} />
        </Btn>
      </div>
      <div className="flex gap-3.5">
        {taskCols.map((col, ci) => (
          <div key={col.stage.id} className="w-[300px] shrink-0">
            <div className="mb-2.5 flex items-center gap-2 px-1.5">
              <Dot color={col.stage.color} />
              <span className="text-[15px] font-semibold">
                {col.stage.name}
              </span>
              <span className="tabular text-muted text-[14px]">
                {col.items.length}
              </span>
            </div>
            <Seq
              className="bg-fill-soft flex flex-col gap-2 rounded-[14px] p-2"
              delay={0.1 + ci * 0.08}
              gap={0.08}
            >
              {col.items.length === 0 && (
                <SeqItem className="text-muted grid h-[76px] place-items-center text-[14px]">
                  Nessuna attività
                </SeqItem>
              )}
              {col.items.map((it) => (
                <SeqItem
                  key={it.t}
                  className="shadow-card flex gap-3 rounded-xl bg-white p-3.5"
                >
                  <Circle
                    size={22}
                    strokeWidth={1.4}
                    className="text-tertiary shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start gap-2">
                      <p className="flex-1 text-[15px] leading-snug font-semibold">
                        {it.t}
                      </p>
                      <Ellipsis size={16} className="text-muted mt-0.5" />
                    </div>
                    <p className="text-muted mt-0.5 truncate text-[13px]">
                      {it.p}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <span
                        className={`text-[14px] font-semibold ${it.late ? 'text-destructive' : 'text-muted'}`}
                      >
                        {it.d}
                      </span>
                      <Initials text={it.o} size={22} />
                    </div>
                  </div>
                </SeqItem>
              ))}
            </Seq>
          </div>
        ))}
      </div>
    </AppFrame>
  )
}

/* ================= 6. Calendario ================= */

type Ev = {
  day: number
  start: number
  dur: number
  t: string
  s: string
  kind: 'vivo' | 'tel' | 'int'
}
const events: Ev[] = [
  {
    day: 0,
    start: 9.5,
    dur: 1,
    t: 'Fonderia Bassi Srl',
    s: 'Visita',
    kind: 'vivo',
  },
  {
    day: 0,
    start: 14,
    dur: 0.5,
    t: 'Officine Galli',
    s: 'Chiamata',
    kind: 'tel',
  },
  {
    day: 1,
    start: 9,
    dur: 0.75,
    t: 'Riunione commerciale',
    s: 'Sala riunioni',
    kind: 'int',
  },
  {
    day: 1,
    start: 15,
    dur: 1.5,
    t: 'Fonderia Bassi Srl',
    s: 'Visita in stabilimento',
    kind: 'vivo',
  },
  {
    day: 2,
    start: 10.5,
    dur: 1,
    t: 'Meccanica Ferraresi',
    s: "Call sull'offerta",
    kind: 'tel',
  },
  {
    day: 3,
    start: 9,
    dur: 2,
    t: 'Acciaierie Orobiche',
    s: 'Sopralluogo carroponte',
    kind: 'vivo',
  },
  {
    day: 4,
    start: 11,
    dur: 1,
    t: 'Laminati Piave',
    s: 'Consegna e collaudo',
    kind: 'vivo',
  },
  {
    day: 4,
    start: 16,
    dur: 0.5,
    t: 'Stampaggi Brianza',
    s: 'Videochiamata',
    kind: 'tel',
  },
]
const kindStyle = {
  vivo: { bg: 'rgba(253,108,1,0.10)', bar: '#FD6C01', fg: '#A33A0B' },
  tel: { bg: '#EAF1FC', bar: '#0A66D6', fg: '#1F4E99' },
  int: { bg: 'rgba(118,118,128,0.12)', bar: '#8E8E93', fg: '#1D1D1F' },
}
const HOUR = 54
const FIRST = 9

export function CalendarScreen() {
  const days = [
    ['Lun', 12],
    ['Mar', 13],
    ['Mer', 14],
    ['Gio', 15],
    ['Ven', 16],
  ] as const
  return (
    <AppFrame page="calendario">
      <PageHeader
        title={
          <span className="inline-flex items-center gap-2">
            Ottobre 2026 <ChevronDown size={20} className="text-muted" />
          </span>
        }
        subtitle="Settimana 42 · 8 appuntamenti"
        actions={
          <Btn variant="primary" icon={<Plus size={17} strokeWidth={2.2} />}>
            Fissa appuntamento
          </Btn>
        }
      />
      <div className="mb-4 flex items-center gap-2">
        <span className="bg-fill grid size-9 place-items-center rounded-lg">
          <ChevronLeft size={17} />
        </span>
        <span className="bg-fill grid size-9 place-items-center rounded-lg">
          <ChevronRight size={17} />
        </span>
        <Btn>Oggi</Btn>
        <span className="flex-1" />
        <Segmented items={['Personale', 'Aziendale']} active={0} />
        <Segmented items={['Giorno', 'Settimana', 'Mese']} active={1} />
      </div>
      <div className="grid grid-cols-[1fr_300px] gap-4">
        <Card className="overflow-hidden">
          <div className="border-separator grid grid-cols-[56px_repeat(5,1fr)] border-b-[0.5px]">
            <span />
            {days.map(([d, n]) => (
              <span
                key={d}
                className="text-muted flex items-center justify-center gap-1.5 py-3 text-[15px]"
              >
                <span className={n === 13 ? 'text-destructive' : ''}>{d}</span>
                <span
                  className={`tabular grid size-7 place-items-center rounded-full text-[17px] ${
                    n === 13
                      ? 'bg-destructive font-semibold text-white'
                      : 'text-foreground font-medium'
                  }`}
                >
                  {n}
                </span>
              </span>
            ))}
          </div>
          <div className="relative grid grid-cols-[56px_repeat(5,1fr)]">
            <div>
              {Array.from({ length: 10 }, (_, i) => (
                <div
                  key={i}
                  className="tabular text-muted relative text-right text-[12px]"
                  style={{ height: HOUR }}
                >
                  <span className="absolute -top-2 right-2">
                    {String(FIRST + i).padStart(2, '0')}:00
                  </span>
                </div>
              ))}
            </div>
            {days.map(([d], di) => (
              <div
                key={d}
                className="border-separator relative border-l-[0.5px]"
              >
                {Array.from({ length: 10 }, (_, i) => (
                  <div
                    key={i}
                    className="border-separator/70 border-t-[0.5px]"
                    style={{ height: HOUR }}
                  />
                ))}
                <Seq
                  className="absolute inset-0"
                  delay={0.15 + di * 0.06}
                  gap={0.1}
                >
                  {events
                    .filter((e) => e.day === di)
                    .map((e) => {
                      const k = kindStyle[e.kind]
                      return (
                        <SeqItem
                          key={e.t + e.start}
                          className="absolute inset-x-1.5 overflow-hidden rounded-lg py-1.5 pr-2 pl-3"
                          style={{
                            top: (e.start - FIRST) * HOUR + 2,
                            height: e.dur * HOUR - 4,
                          }}
                        >
                          <span
                            className="absolute inset-0"
                            style={{ background: k.bg }}
                          />
                          <span
                            className="absolute inset-y-0 left-0 w-[3px]"
                            style={{ background: k.bar }}
                          />
                          <span
                            className="relative block truncate text-[13px] font-semibold"
                            style={{ color: k.fg }}
                          >
                            {e.t}
                          </span>
                          {e.dur >= 0.75 && (
                            <span
                              className="relative block truncate text-[12px]"
                              style={{ color: k.fg, opacity: 0.8 }}
                            >
                              {e.s}
                            </span>
                          )}
                        </SeqItem>
                      )
                    })}
                </Seq>
                {di === 1 && (
                  <span
                    className="absolute inset-x-0 z-10 flex items-center"
                    style={{ top: (11 - FIRST) * HOUR + 18 }}
                  >
                    <span className="bg-destructive -ml-1 size-2 rounded-full" />
                    <span className="bg-destructive h-[1.5px] flex-1" />
                  </span>
                )}
              </div>
            ))}
          </div>
        </Card>
        <Seq gap={0.08} delay={0.25}>
          <SeqItem>
            <p className="text-muted mb-2 px-1 text-[14px]">
              Calendari collegati
            </p>
            <Card className="px-4">
              <div className="border-separator flex items-center gap-2 border-b-[0.5px] py-3">
                <span className="size-2 rounded-full bg-[#34C759]" />
                <span className="flex-1 text-[15px] leading-tight">
                  Google e Outlook
                </span>
                <Btn
                  variant="outline"
                  icon={<Link2 size={14} />}
                  className="!h-8 text-[13px]"
                >
                  Calendari collegati
                </Btn>
              </div>
              <div className="flex items-center justify-between py-3 text-[14px]">
                <span className="text-muted">Sincronizzato</span>
                <span className="text-primary flex items-center gap-1 font-medium">
                  <RefreshCw size={14} /> Aggiorna
                </span>
              </div>
            </Card>
          </SeqItem>
          <SeqItem className="mt-5">
            <p className="text-muted mb-2 px-1 text-[14px]">Legenda</p>
            <Card className="px-4">
              {(
                [
                  ['vivo', 'Dal vivo'],
                  ['tel', 'Telefono o video'],
                  ['int', 'Interno'],
                ] as const
              ).map(([k, l]) => (
                <div
                  key={k}
                  className="border-separator flex items-center gap-3 border-b-[0.5px] py-3 text-[15px] last:border-0"
                >
                  <span
                    className="h-5 w-3 rounded-[4px]"
                    style={{
                      background: kindStyle[k].bg,
                      boxShadow: `inset 3px 0 ${kindStyle[k].bar}`,
                    }}
                  />
                  {l}
                </div>
              ))}
            </Card>
          </SeqItem>
          <SeqItem className="mt-5">
            <Card className="p-4">
              <p className="text-[17px] font-semibold">Link di prenotazione</p>
              <p className="text-muted mt-1 text-[14px] leading-snug">
                Invia al cliente un link monouso per scegliere l'orario.
              </p>
              <Btn className="mt-3">Genera link</Btn>
            </Card>
          </SeqItem>
        </Seq>
      </div>
    </AppFrame>
  )
}

/* ================= 7. Posta ================= */

const threads = [
  {
    from: 'Ing. Paolo Riva',
    s: 'Re: Carroponte 20 t — offerta rev. 3',
    p: "Buongiorno, abbiamo visto l'offerta. Ci servirebbe una variante con radiocomando…",
    t: '10:42',
  },
  {
    from: 'Giulia Mauri',
    s: 'Disegni esecutivi capannone B',
    p: 'Le allego i disegni aggiornati con le quote delle coperture e i nuovi lucernari.',
    t: '09:15',
    n: 2,
  },
  {
    from: 'Luca Brambilla',
    s: 'Conferma visita giovedì',
    p: 'Perfetto, vi aspettiamo giovedì alle 15 in stabilimento, ingresso merci.',
    t: '08:52',
  },
  {
    from: 'Elena Toffoli',
    s: 'Ordine firmato — taglierina',
    p: "In allegato l'ordine firmato. Attendiamo la conferma dei tempi di consegna.",
    t: 'Ieri',
  },
  {
    from: 'Davide Ferraresi',
    s: 'Tempi di consegna banchi collaudo',
    p: 'Volevo capire se riuscite a rientrare nelle sei settimane indicate in offerta.',
    t: 'Ieri',
  },
  {
    from: 'Fabio Scotti',
    s: 'Listino pallet 2027',
    p: 'Ci mandate il listino aggiornato? Stiamo chiudendo il budget acquisti.',
    t: 'Lun',
  },
]

export function MailScreen() {
  return (
    <AppFrame page="posta" bare>
      <div className="flex h-full">
        <div className="border-separator flex w-[360px] shrink-0 flex-col border-r-[0.5px] bg-[#FAFAFC] px-4 pt-8">
          <div className="flex items-center gap-3 px-1">
            <h3 className="font-display text-[34px] leading-[41px] font-bold tracking-[-0.025rem]">
              Posta
            </h3>
            <span className="text-primary inline-flex items-center gap-1 text-[14px] font-medium">
              Guida
            </span>
            <SquarePen
              size={22}
              strokeWidth={1.6}
              className="text-primary ml-auto"
            />
          </div>
          <p className="text-muted mt-3 flex items-center justify-between px-1 text-[13px]">
            <span className="truncate">
              g.testa@officinetesta.it · Gmail collegato
            </span>
            <span className="text-primary font-medium">Scollega</span>
          </p>
          <Segmented
            items={['In arrivo', 'Inviate']}
            active={0}
            className="mt-3 w-full"
          />
          <span className="bg-fill text-muted mt-3 flex h-9 items-center gap-2 rounded-[10px] px-3 text-[14px]">
            <Search size={15} /> Cerca in arrivo
          </span>
          <Seq className="mt-2 min-h-0 flex-1 overflow-hidden" gap={0.05}>
            {threads.map((th, i) => (
              <SeqItem
                key={th.s}
                className={`rounded-xl px-3 py-2.5 ${i === 0 ? 'bg-[rgba(253,108,1,0.12)]' : ''}`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[15px] font-semibold">{th.from}</span>
                  <span className="text-muted text-[13px]">{th.t}</span>
                </div>
                <div className="flex items-center gap-2">
                  <p className="flex-1 truncate text-[14px]">{th.s}</p>
                  {th.n && (
                    <span className="bg-fill text-muted rounded-md px-1.5 text-[12px] font-semibold">
                      {th.n}
                    </span>
                  )}
                </div>
                <p className="text-muted line-clamp-2 text-[13px] leading-snug">
                  {th.p}
                </p>
              </SeqItem>
            ))}
          </Seq>
          <span className="bg-fill mb-4 grid h-10 place-items-center rounded-[10px] text-[14px] font-medium">
            Carica altre
          </span>
        </div>

        <div className="flex min-w-0 flex-1 flex-col bg-white">
          <div className="border-separator flex h-14 items-center border-b-[0.5px] px-6">
            <Undo2 size={19} strokeWidth={1.7} />
          </div>
          <div className="flex-1 overflow-hidden px-10 pt-6">
            <p className="font-display text-[28px] leading-tight font-bold">
              Re: Carroponte 20 t — offerta rev. 3
            </p>
            <p className="text-muted mt-3 text-center text-[13px]">Oggi</p>
            <Seq className="mt-3" gap={0.12} delay={0.2}>
              <SeqItem className="flex gap-3">
                <Initials text="PR" size={44} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between">
                    <p className="text-[16px] font-semibold">Ing. Paolo Riva</p>
                    <span className="text-muted text-[13px]">10:42</span>
                  </div>
                  <p className="text-muted text-[13px]">
                    p.riva@acciaierieorobiche.it
                  </p>
                  <p className="text-muted text-[13px]">
                    A g.testa@officinetesta.it
                  </p>
                  <div className="mt-4 space-y-3 text-[15px] leading-relaxed">
                    <p>Buongiorno Giovanni,</p>
                    <p>
                      abbiamo visto l'offerta rev. 3 per il carroponte da 20 t.
                      Ci servirebbe una variante con radiocomando e la consegna
                      entro fine gennaio.
                    </p>
                    <p>
                      Riuscite ad aggiornarla entro venerdì? Così la portiamo in
                      direzione la settimana prossima.
                    </p>
                    <p>
                      Cordiali saluti,
                      <br />
                      Paolo Riva — Direttore tecnico
                    </p>
                  </div>
                </div>
              </SeqItem>
              <SeqItem className="mt-5 ml-14">
                <span className="bg-grouped inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-[13px]">
                  <Paperclip size={13} className="text-muted" />{' '}
                  Specifiche_radiocomando.pdf
                </span>
              </SeqItem>
            </Seq>
          </div>
          <div className="border-separator border-t-[0.5px] px-10 pt-4 pb-6">
            <p className="text-muted text-[13px] font-semibold">
              Rispondi a Ing. Paolo Riva
            </p>
            <span className="mt-2 flex h-10 items-center rounded-[10px] px-3 text-[14px] shadow-[0_0_0_0.5px_rgba(60,60,67,0.25)]">
              p.riva@acciaierieorobiche.it
            </span>
            <div className="text-foreground/80 mt-3 flex items-center gap-4 text-[14px]">
              <Bold size={17} />
              <Italic size={17} />
              <Underline size={17} />
              <Link size={17} />
              <span>Piccolo</span>
              <span>Normale</span>
              <span>Grande</span>
              <span>Cc</span>
              <Paperclip size={17} />
              <span className="bg-primary ml-auto inline-flex h-10 items-center gap-2 rounded-[10px] px-4 font-semibold text-white">
                <Send size={16} /> Invia
              </span>
            </div>
            <div className="text-tertiary mt-3 h-20 rounded-[10px] px-4 py-3 text-[15px] shadow-[0_0_0_0.5px_rgba(60,60,67,0.25)]">
              Scrivi un messaggio
            </div>
          </div>
        </div>
      </div>
    </AppFrame>
  )
}
