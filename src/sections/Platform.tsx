import { ArrowUpRight } from 'lucide-react'
import { CroppedScreen } from '@/components/mockups/registry'
import { Container, SectionTitle } from '@/components/ui'
import { FEATURES } from '@/lib/features'
import { Item, Reveal, Stagger } from '@/lib/motion'

/** Indice delle pagine funzione: una tessera per pagina, con l'anteprima reale della schermata. */
export function Platform() {
  return (
    <section id="piattaforma" className="py-24 sm:py-32">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <SectionTitle
              eyebrow="Nel dettaglio"
              text="Ogni pagina, punto per punto."
            />
          </div>
          <Reveal delay={0.2}>
            <p className="text-muted max-w-sm text-[17px] leading-relaxed">
              Scopri come funziona ciascuna pagina di RelateSales, fino al
              singolo dettaglio.
            </p>
          </Reveal>
        </div>

        <Stagger
          className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3"
          gap={0.07}
        >
          {FEATURES.map((f, i) => {
            const Icon = f.icon
            const wide = i === 0 || i === FEATURES.length - 1
            const crop = f.blocks[0].visual.crop ?? {
              x: 248,
              y: 0,
              w: 1232,
              h: 640,
            }
            return (
              <Item key={f.slug} className={wide ? 'lg:col-span-2' : ''}>
                <a
                  href={`/prodotto/${f.slug}`}
                  className="group shadow-card hover:shadow-card-hover flex h-full flex-col overflow-hidden rounded-[18px] bg-white transition-shadow duration-300"
                >
                  <div className="bg-background relative h-[220px] overflow-hidden px-6 pt-6 sm:h-[260px]">
                    <div className="transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-2 group-hover:scale-[1.015]">
                      <CroppedScreen
                        screen={f.blocks[0].visual.screen}
                        crop={crop}
                      />
                    </div>
                    <span className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent" />
                  </div>
                  <div className="flex flex-1 items-start gap-3 p-6">
                    <span className="bg-brand-soft text-primary grid size-9 shrink-0 place-items-center rounded-[10px]">
                      <Icon size={17} strokeWidth={1.8} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[17px] font-semibold">
                        {f.name}
                      </span>
                      <span className="text-muted block text-[15px] leading-snug">
                        {f.menu}
                      </span>
                    </span>
                    <ArrowUpRight
                      size={18}
                      className="text-tertiary group-hover:text-primary mt-1 shrink-0 transition-all duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </div>
                </a>
              </Item>
            )
          })}
        </Stagger>
      </Container>
    </section>
  )
}
