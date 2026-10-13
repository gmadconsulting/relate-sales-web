// Dati inventati per i mockup: aziende e persone fittizie del mondo industriale.

export const stages = [
  {
    id: 'primo',
    name: 'Primo contatto',
    color: 'var(--color-stage-1)',
    count: 14,
    value: 0,
  },
  {
    id: 'sopralluogo',
    name: 'Sopralluogo',
    color: 'var(--color-stage-2)',
    count: 8,
    value: 248000,
  },
  {
    id: 'preventivo',
    name: 'Preventivo',
    color: 'var(--color-stage-3)',
    count: 6,
    value: 312500,
  },
  {
    id: 'trattativa',
    name: 'Trattativa',
    color: 'var(--color-stage-4)',
    count: 4,
    value: 186000,
  },
  {
    id: 'ordine',
    name: 'Ordine',
    color: 'var(--color-stage-5)',
    count: 5,
    value: 204300,
  },
] as const

export type StageId = (typeof stages)[number]['id']

export type Deal = {
  person: string
  company: string
  stage: StageId
  days: number
  /** ferma = nessun passaggio da troppi giorni */
  stale?: boolean
  visited?: boolean
  inTarget?: boolean
  high?: boolean
  value?: number
  owner: string
}

export const deals: Deal[] = [
  {
    person: 'Renato Bassi',
    company: 'Fonderia Bassi Srl',
    stage: 'primo',
    days: 2,
    owner: 'MR',
  },
  {
    person: 'Marta Zanon',
    company: 'Plastiche Venete SpA',
    stage: 'primo',
    days: 23,
    stale: true,
    owner: 'SC',
  },
  {
    person: 'Giorgio Lanfranchi',
    company: 'Tornerie Valtrompia',
    stage: 'primo',
    days: 5,
    owner: 'LG',
  },
  {
    person: 'Ivo Bertolini',
    company: 'Trafilerie Bresciane',
    stage: 'primo',
    days: 1,
    owner: 'MR',
  },
  {
    person: 'Nadia Cereda',
    company: 'Vernici Industriali Brianza',
    stage: 'primo',
    days: 3,
    owner: 'LG',
  },
  {
    person: 'Giulia Mauri',
    company: 'Carpenterie Lombarde',
    stage: 'sopralluogo',
    days: 4,
    visited: true,
    value: 86000,
    owner: 'MR',
  },
  {
    person: 'Sara Galli',
    company: 'Officine Galli',
    stage: 'sopralluogo',
    days: 19,
    stale: true,
    value: 31000,
    owner: 'LG',
  },
  {
    person: 'Enrico Pozzi',
    company: 'Saldature Pozzi',
    stage: 'sopralluogo',
    days: 6,
    visited: true,
    owner: 'SC',
  },
  {
    person: 'Davide Ferraresi',
    company: 'Meccanica Ferraresi',
    stage: 'preventivo',
    days: 21,
    stale: true,
    visited: true,
    value: 39500,
    owner: 'MR',
  },
  {
    person: 'Ing. Paolo Riva',
    company: 'Acciaierie Orobiche',
    stage: 'preventivo',
    days: 3,
    visited: true,
    inTarget: true,
    high: true,
    value: 112000,
    owner: 'SC',
  },
  {
    person: 'Fabio Scotti',
    company: 'Imballaggi Tecnici Srl',
    stage: 'preventivo',
    days: 6,
    value: 18000,
    owner: 'LG',
  },
  {
    person: 'Luca Brambilla',
    company: 'Stampaggi Brianza',
    stage: 'trattativa',
    days: 2,
    visited: true,
    inTarget: true,
    value: 54000,
    owner: 'MR',
  },
  {
    person: 'Simone Deiana',
    company: 'Termoidraulica Sarda',
    stage: 'trattativa',
    days: 15,
    stale: true,
    visited: true,
    value: 27500,
    owner: 'SC',
  },
  {
    person: 'Elena Toffoli',
    company: 'Laminati Piave',
    stage: 'ordine',
    days: 1,
    inTarget: true,
    value: 73000,
    owner: 'LG',
  },
  {
    person: 'Roberto Conti',
    company: 'Fresature Adriatiche',
    stage: 'ordine',
    days: 4,
    value: 15800,
    owner: 'MR',
  },
]

export const eur = (n: number) =>
  `${new Intl.NumberFormat('it-IT', { maximumFractionDigits: 0 }).format(n)} €`
