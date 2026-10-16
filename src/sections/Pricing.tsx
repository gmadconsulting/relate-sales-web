import {
  CalendarDays,
  ChartColumn,
  Check,
  Mail,
  SquareCheck,
  SquareKanban,
  Users,
} from 'lucide-react'
import { Item, Reveal, Stagger } from '@/lib/motion'
import { Container, DemoButton, SectionTitle } from '@/components/ui'

const pages = [
  {
    icon: ChartColumn,
    name: 'Panoramica',
    d: 'Come vanno le vendite, in una schermata.',
  },
  {
    icon: SquareKanban,
    name: 'Trattative',
    d: 'Ogni trattativa è una tessera che avanza.',
  },
  { icon: Users, name: 'Contatti', d: 'Ogni cliente, con la sua scheda.' },
  {
    icon: SquareCheck,
    name: 'Attività',
    d: 'Il prossimo passo di ogni trattativa.',
  },
  {
    icon: CalendarDays,
    name: 'Calendario',
    d: "Visite e appuntamenti, in un'agenda sola.",
  },
  {
    icon: Mail,
    name: 'Posta',
    d: 'Le email ai clienti, senza uscire dal gestionale.',
  },
]

const included = [
  'tutte le pagine del gestionale, per tutti gli utenti;',
  'le fasi delle trattative impostate sul tuo modo di vendere;',
  'i tuoi clienti caricati dal tuo Excel;',
  "un'ora di formazione con la squadra;",
  "tutorial e manuale d'uso;",
  'una persona con nome e cognome a cui scrivere.',
]

const highlights = [
  'Utenti illimitati',
  "Un prezzo per tutta l'azienda",
  'Nessun costo di avvio',
  'Lo impostiamo noi',
]

export function Pricing() {
  return (
    <section id="prezzi" className="py-24 sm:py-32">
      <Container>
        <div className="text-center">
          <SectionTitle
            eyebrow="Prezzi"

            className="mx-auto max-w-3xl"
            text="Un prezzo per tutta l'azienda."
            accent="Utenti illimitati."
          />
          <Reveal delay={0.3}>
            <p className="text-muted mt-5 text-[19px]">
              Aggiungere un commerciale non costa niente.
            </p>
          </Reveal>
        </div>

        <Reveal className="shadow-card mt-14 grid overflow-hidden rounded-[20px] bg-white lg:grid-cols-[1.45fr_1fr]">
          {/* Cosa comprende */}
          <div className="p-7 sm:p-10">
            <p className="text-muted text-[13px] font-semibold tracking-[0.08em] uppercase">
              Il gestionale
            </p>
            <Stagger
              as="ul"
              className="mt-5 grid gap-x-6 gap-y-5 sm:grid-cols-2"
              gap={0.06}
              delay={0.2}
            >
              {pages.map(({ icon: Icon, name, d }) => (
                <Item as="li" key={name} className="flex gap-3">
                  <span className="bg-brand-soft text-primary grid size-9 shrink-0 place-items-center rounded-[10px]">
                    <Icon size={18} strokeWidth={1.8} />
                  </span>
                  <span>
                    <span className="block text-[16px] font-semibold">
                      {name}
                    </span>
                    <span className="text-muted block text-[14px] leading-snug">
                      {d}
                    </span>
                  </span>
                </Item>
              ))}
            </Stagger>

            <div className="border-separator mt-9 border-t-[0.5px] pt-7">
              <p className="text-muted text-[13px] font-semibold tracking-[0.08em] uppercase">
                Sempre incluso
              </p>
              <Stagger
                as="ul"
                className="mt-4 grid gap-3 sm:grid-cols-2"
                gap={0.06}
                delay={0.3}
              >
                {included.map((t) => (
                  <Item
                    as="li"
                    key={t}
                    className="flex gap-2.5 text-[16px] leading-snug"
                  >
                    <Check
                      size={18}
                      strokeWidth={2.4}
                      className="text-primary mt-0.5 shrink-0"
                    />
                    {t}
                  </Item>
                ))}
              </Stagger>
            </div>
          </div>

          {/* Richiesta demo al posto del prezzo */}
          <div className="bg-ink relative flex flex-col justify-center overflow-hidden p-7 text-white sm:p-10">
            <div className="blueprint-dark pointer-events-none absolute inset-0" />
            <div className="relative">
              <Stagger as="ul" className="space-y-3.5" gap={0.08} delay={0.25}>
                {highlights.map((h) => (
                  <Item
                    as="li"
                    key={h}
                    className="flex items-center gap-3 text-[18px] font-semibold"
                  >
                    <span className="bg-primary grid size-6 shrink-0 place-items-center rounded-full">
                      <Check size={14} strokeWidth={3} />
                    </span>
                    {h}
                  </Item>
                ))}
              </Stagger>
              <p className="mt-8 text-[17px] leading-relaxed text-white/70">
                Il prezzo te lo mostriamo in demo, insieme al gestionale
                impostato sui casi della tua azienda.
              </p>
              <DemoButton size="xl" className="mt-6 w-full" />
              <p className="mt-3 text-center text-[14px] text-white/50">
                Ti richiamiamo entro un giorno lavorativo per fissare l'orario.
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
