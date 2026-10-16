import { Check, X } from 'lucide-react'
import { Item, Reveal, Stagger } from '@/lib/motion'
import { Container, SectionTitle } from '@/components/ui'

const yes = [
  "hai un'azienda industriale con almeno un commerciale oltre a te;",
  'vendi con trattative lunghe, visite e preventivi;',
  'vuoi un posto solo per clienti e trattative, e una squadra che lo usa davvero.',
]
const no = [
  'cerchi automazioni e campagne di marketing;',
  'vuoi fare i preventivi direttamente dal gestionale;',
  'ti serve il collegamento con il gestionale contabile;',
  'hai già un CRM che i tuoi commerciali usano volentieri. Tienilo.',
]

export function ForWhom() {
  return (
    <section id="per-chi-e" className="bg-white py-24 sm:py-32">
      <Container>
        <SectionTitle
          eyebrow="Per chi è"
          text="Te lo diciamo prima: non è per tutti."
        />
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          <Reveal className="bg-background rounded-[14px] p-7 sm:p-9">
            <p className="text-[21px] font-semibold">È per te se:</p>
            <Stagger as="ul" className="mt-5 space-y-4" gap={0.1} delay={0.2}>
              {yes.map((t) => (
                <Item
                  as="li"
                  key={t}
                  className="flex gap-3 text-[17px] leading-snug"
                >
                  <span className="bg-primary mt-0.5 grid size-6 shrink-0 place-items-center rounded-full">
                    <Check size={14} strokeWidth={3} className="text-white" />
                  </span>
                  {t}
                </Item>
              ))}
            </Stagger>
          </Reveal>
          <Reveal
            delay={0.12}
            className="rounded-[14px] p-7 shadow-[inset_0_0_0_0.5px_rgba(60,60,67,0.3)] sm:p-9"
          >
            <p className="text-[21px] font-semibold">Non è per te se:</p>
            <Stagger as="ul" className="mt-5 space-y-4" gap={0.1} delay={0.2}>
              {no.map((t) => (
                <Item
                  as="li"
                  key={t}
                  className="text-muted flex gap-3 text-[17px] leading-snug"
                >
                  <span className="bg-fill mt-0.5 grid size-6 shrink-0 place-items-center rounded-full">
                    <X size={14} strokeWidth={2.5} className="text-muted" />
                  </span>
                  {t}
                </Item>
              ))}
            </Stagger>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
