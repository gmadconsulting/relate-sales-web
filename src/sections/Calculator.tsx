import { Minus, Plus } from 'lucide-react'
import { motion, useSpring, useTransform } from 'motion/react'
import { useEffect, useState } from 'react'
import { Container, SectionTitle } from '@/components/ui'
import { Reveal } from '@/lib/motion'

const WEEKS = 46

type Field = {
  key: 'reps' | 'hours' | 'hourCost' | 'dealValue' | 'margin' | 'lost'
  q: string
  unit?: string
  step: number
  min: number
  max: number
}

const fields: Field[] = [
  { key: 'reps', q: 'Quanti commerciali hai?', step: 1, min: 1, max: 100 },
  {
    key: 'hours',
    q: 'Quante ore a settimana perde ognuno a cercare informazioni, aggiornare file e scrivere rapporti?',
    unit: 'ore',
    step: 1,
    min: 0,
    max: 40,
  },
  {
    key: 'hourCost',
    q: "Quanto costa un'ora di un commerciale?",
    unit: '€',
    step: 5,
    min: 0,
    max: 500,
  },
  {
    key: 'dealValue',
    q: 'Quanto vale in media una trattativa?',
    unit: '€',
    step: 1000,
    min: 0,
    max: 10_000_000,
  },
  {
    key: 'margin',
    q: 'Che margine hai sulle vendite?',
    unit: '%',
    step: 1,
    min: 0,
    max: 100,
  },
  {
    key: 'lost',
    q: 'Quante trattative perdi ogni anno perché nessuno ha richiamato al momento giusto?',
    step: 1,
    min: 0,
    max: 500,
  },
]

const nf = new Intl.NumberFormat('it-IT', { maximumFractionDigits: 0 })
const eur = (n: number) => `${nf.format(Math.round(n))} €`

/** Il numero conta verso il valore nuovo con una molla: veloce all'inizio, morbido alla fine. */
function Count({ value }: { value: number }) {
  const spring = useSpring(value, { stiffness: 90, damping: 22, mass: 0.8 })
  const text = useTransform(spring, eur)
  useEffect(() => {
    spring.set(value)
  }, [spring, value])
  return <motion.span>{text}</motion.span>
}

function Stepper({
  f,
  value,
  onChange,
}: {
  f: Field
  value: number
  onChange: (v: number) => void
}) {
  const clamp = (v: number) => Math.min(f.max, Math.max(f.min, v))
  const id = `calc-${f.key}`
  return (
    <div className="border-separator grid gap-3 border-b-[0.5px] py-4 last:border-0 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-6">
      <label htmlFor={id} className="text-[16px] leading-snug">
        {f.q}
      </label>
      <div className="bg-fill flex h-11 items-center rounded-xl p-1">
        <button
          type="button"
          onClick={() => onChange(clamp(value - f.step))}
          className="grid size-9 place-items-center rounded-lg transition-[background-color,transform] duration-150 hover:bg-white active:scale-90"
          aria-label="Diminuisci"
        >
          <Minus size={16} />
        </button>
        <span className="flex items-center gap-1 px-1">
          <input
            id={id}
            inputMode="numeric"
            value={nf.format(value)}
            onChange={(e) => {
              const n = Number(e.target.value.replace(/\D/g, ''))
              onChange(clamp(Number.isFinite(n) ? n : 0))
            }}
            className="tabular w-[88px] bg-transparent text-center text-[17px] font-semibold outline-none"
          />
          {f.unit && <span className="text-muted text-[14px]">{f.unit}</span>}
        </span>
        <button
          type="button"
          onClick={() => onChange(clamp(value + f.step))}
          className="grid size-9 place-items-center rounded-lg transition-[background-color,transform] duration-150 hover:bg-white active:scale-90"
          aria-label="Aumenta"
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  )
}

export function Calculator() {
  const [v, setV] = useState({
    reps: 3,
    hours: 3,
    hourCost: 35,
    dealValue: 30000,
    margin: 25,
    lost: 2,
  })
  const time = v.reps * v.hours * WEEKS * v.hourCost
  const deals = v.lost * v.dealValue * (v.margin / 100)
  const total = time + deals

  return (
    <section className="py-24 sm:py-32">
      <Container>
        <SectionTitle
          className="max-w-3xl"
          text="Quanto ti costa ogni anno lavorare senza un gestionale?"
        />
        <Reveal delay={0.3}>
          <p className="text-muted mt-5 text-[19px]">
            Sei domande, un minuto. I numeri li inserisci tu.
          </p>
        </Reveal>

        <Reveal className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-[1.25fr_1fr]">
          <div className="shadow-card rounded-[14px] bg-white px-5 py-2 sm:px-7">
            {fields.map((f) => (
              <Stepper
                key={f.key}
                f={f}
                value={v[f.key]}
                onChange={(n) => setV((s) => ({ ...s, [f.key]: n }))}
              />
            ))}
          </div>

          <div
            className="bg-ink flex flex-col rounded-[14px] p-6 text-white sm:p-8"
            aria-live="polite"
          >
            <div className="border-b-[0.5px] border-white/15 pb-5">
              <p className="text-[14px] text-white/60">Tempo perso</p>
              <p className="tabular mt-1 text-[30px] font-bold tracking-tight">
                <Count value={time} />{' '}
                <span className="text-[15px] font-normal text-white/50">
                  all'anno
                </span>
              </p>
              <p className="tabular mt-1 text-[12px] text-white/45">
                {nf.format(v.reps)} × {nf.format(v.hours)} ore × {WEEKS}{' '}
                settimane × {eur(v.hourCost)}
              </p>
            </div>
            <div className="border-b-[0.5px] border-white/15 py-5">
              <p className="text-[14px] text-white/60">Trattative perse</p>
              <p className="tabular mt-1 text-[30px] font-bold tracking-tight">
                <Count value={deals} />{' '}
                <span className="text-[15px] font-normal text-white/50">
                  all'anno
                </span>
              </p>
              <p className="tabular mt-1 text-[12px] text-white/45">
                {nf.format(v.lost)} × {eur(v.dealValue)} × {v.margin}%
              </p>
            </div>
            <div className="py-6">
              <p className="text-[14px] text-white/60">Totale</p>
              <p className="tabular font-display text-primary mt-1 text-[44px] leading-none font-bold tracking-tight sm:text-[56px]">
                <Count value={total} />
              </p>
              <p className="mt-2 text-[15px] text-white/60">all'anno</p>
            </div>
            <a
              href="#demo"
              className="bg-primary hover:bg-primary-hover mt-auto flex min-h-13 w-full items-center justify-center rounded-xl px-5 py-3 text-center text-base leading-snug font-semibold text-white transition-colors"
            >
              Vediamolo sui tuoi numeri veri — Richiedi una demo
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
