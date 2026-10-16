import { ArrowRight, Check } from 'lucide-react'
import { motion, useScroll, useSpring, useTransform } from 'motion/react'
import { useEffect, useRef } from 'react'
import { CroppedScreen, Screen } from '@/components/mockups/registry'
import { Container, DemoButton } from '@/components/ui'
import { FEATURES, type Feature, type Visual } from '@/lib/features'
import { EASE, Item, Reveal, Stagger, Words } from '@/lib/motion'
import { usePageEnter } from '@/lib/router'

function VisualBox({ v }: { v: Visual }) {
  return v.crop ? (
    <CroppedScreen screen={v.screen} crop={v.crop} />
  ) : (
    <Screen screen={v.screen} />
  )
}

/* ---------- Hero ---------- */

function Hero({ f }: { f: Feature }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start 20%'],
  })
  const p = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.5,
  })
  const scale = useTransform(p, [0, 1], [0.94, 1])
  const rotateX = useTransform(p, [0, 1], [12, 0])
  const Icon = f.icon

  return (
    <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40">
      <div className="blueprint pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_60%)]" />
      <Container className="relative">
        <motion.div
          className="text-muted flex items-center gap-2 text-[14px]"
          initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
        >
          <span className="bg-brand-soft text-primary grid size-7 place-items-center rounded-lg">
            <Icon size={15} strokeWidth={1.9} />
          </span>
          <a
            href="/#come-funziona"
            className="hover:text-foreground transition-colors"
          >
            Prodotto
          </a>
          <span className="text-tertiary">/</span>
          <span className="text-foreground font-semibold">{f.name}</span>
        </motion.div>
        <h1 className="mt-6 max-w-4xl text-[40px] leading-[1.04] text-balance sm:text-[60px] lg:text-[68px]">
          <Words text={f.title} onMount delay={0.2} gap={0.04} />
        </h1>
        <motion.p
          className="text-muted mt-6 max-w-2xl text-[19px] leading-relaxed text-pretty sm:text-[21px]"
          initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.55 }}
        >
          {f.subtitle}
        </motion.p>
        <motion.div
          className="mt-9 flex flex-wrap items-center gap-3"
          initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.7 }}
        >
          <DemoButton size="xl" />
          <a
            href="/#come-funziona"
            className="group hover:bg-fill inline-flex h-13 items-center gap-2 rounded-xl px-5 text-base font-semibold transition-colors duration-200"
          >
            Tutte le pagine
            <ArrowRight
              size={17}
              className="transition-transform duration-300 ease-out group-hover:translate-x-0.5"
            />
          </a>
        </motion.div>
      </Container>

      <Container className="relative mt-16">
        <motion.div
          ref={ref}
          className="[perspective:2000px]"
          initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.8 }}
        >
          <motion.div style={{ scale, rotateX, transformOrigin: '50% 0%' }}>
            <VisualBox v={f.hero} />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}

/* ---------- Tre punti chiave ---------- */

function Highlights({ f }: { f: Feature }) {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <Stagger className="grid gap-10 md:grid-cols-3 md:gap-8" gap={0.12}>
          {f.highlights.map((h, i) => (
            <Item key={h.t} className="relative pt-6">
              <motion.span
                className="bg-separator absolute inset-x-0 top-0 h-[0.5px] origin-left"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: EASE, delay: i * 0.12 }}
              />
              <span className="bg-primary absolute top-0 left-0 h-[1.5px] w-8" />
              <p className="text-[19px] leading-snug font-semibold">{h.t}</p>
              <p className="text-muted mt-2 text-[16px] leading-relaxed">
                {h.d}
              </p>
            </Item>
          ))}
        </Stagger>
      </Container>
    </section>
  )
}

/* ---------- Approfondimenti alternati ---------- */

function Block({ b, i }: { b: Feature['blocks'][number]; i: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [40, -40])
  const flip = i % 2 === 1

  return (
    <div
      ref={ref}
      className="grid items-center gap-10 py-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:py-20"
    >
      <div className={flip ? 'lg:order-2' : ''}>
        <Reveal>
          <p className="text-primary text-[13px] font-semibold tracking-[0.08em] uppercase">
            <span className="tabular text-tertiary">
              {String(i + 1).padStart(2, '0')} ·{' '}
            </span>
            {b.eyebrow}
          </p>
        </Reveal>
        <h2 className="mt-4 text-[30px] leading-[1.1] text-balance sm:text-[40px]">
          <Words text={b.title} />
        </h2>
        <Reveal delay={0.15}>
          <p className="text-muted mt-5 text-[17px] leading-relaxed">
            {b.text}
          </p>
        </Reveal>
        <Stagger as="ul" className="mt-7 space-y-3" gap={0.08} delay={0.25}>
          {b.points.map((p) => (
            <Item
              as="li"
              key={p}
              className="flex items-center gap-3 text-[15px] font-medium"
            >
              <span className="bg-brand-soft text-primary grid size-5 shrink-0 place-items-center rounded-full">
                <Check size={12} strokeWidth={3} />
              </span>
              {p}
            </Item>
          ))}
        </Stagger>
      </div>
      <motion.div
        className={`min-w-0 ${flip ? 'lg:order-1' : ''}`}
        style={{ y }}
      >
        <Reveal>
          <VisualBox v={b.visual} />
        </Reveal>
      </motion.div>
    </div>
  )
}

/* ---------- Passaggi numerati ---------- */

function Steps({ f }: { f: Feature }) {
  return (
    <section className="bg-white py-24 sm:py-32">
      <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <p className="text-primary text-[13px] font-semibold tracking-[0.08em] uppercase">
            Come funziona
          </p>
          <h2 className="mt-4 text-[32px] leading-[1.1] text-balance sm:text-[44px]">
            <Words text={f.steps.title} />
          </h2>
        </div>
        <Stagger as="ol" className="relative" gap={0.12}>
          {f.steps.items.map((s, i) => (
            <Item
              as="li"
              key={s.t}
              className="border-separator grid grid-cols-[64px_1fr] gap-4 border-t-[0.5px] py-7"
            >
              <span className="tabular text-tertiary font-mono text-[14px]">
                [{String(i + 1).padStart(2, '0')}]
              </span>
              <div>
                <p className="text-[21px] leading-snug font-semibold">{s.t}</p>
                <p className="text-muted mt-1.5 text-[16px] leading-relaxed">
                  {s.d}
                </p>
              </div>
            </Item>
          ))}
        </Stagger>
      </Container>
    </section>
  )
}

/* ---------- Dettagli ---------- */

function Details({ f }: { f: Feature }) {
  return (
    <section className="py-24 sm:py-32">
      <Container>
        <div className="max-w-2xl">
          <p className="text-primary text-[13px] font-semibold tracking-[0.08em] uppercase">
            Nel dettaglio
          </p>
          <h2 className="mt-4 text-[32px] leading-[1.1] text-balance sm:text-[44px]">
            <Words text={`Tutto quello che fa ${f.name}.`} />
          </h2>
        </div>
        <Stagger
          className="bg-separator shadow-card mt-12 grid gap-px overflow-hidden rounded-[14px] sm:grid-cols-2 lg:grid-cols-3"
          gap={0.06}
        >
          {f.details.map((d, i) => (
            <Item
              key={d.t}
              className="group bg-white p-6 transition-colors duration-300 hover:bg-[#FCFCFD] sm:p-7"
            >
              <span className="tabular text-tertiary font-mono text-[12px]">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="mt-4 text-[17px] font-semibold">{d.t}</p>
              <p className="text-muted mt-1.5 text-[15px] leading-relaxed">
                {d.d}
              </p>
            </Item>
          ))}
        </Stagger>
      </Container>
    </section>
  )
}

/* ---------- Le altre pagine ---------- */

function Others({ f }: { f: Feature }) {
  const others = FEATURES.filter((o) => o.slug !== f.slug)
  return (
    <section className="bg-white py-24 sm:py-32">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="max-w-2xl text-[32px] leading-[1.1] text-balance sm:text-[44px]">
            <Words text="Le altre pagine di RelateSales." />
          </h2>
          <Reveal>
            <a
              href="/#come-funziona"
              className="group text-primary inline-flex items-center gap-1.5 text-[15px] font-semibold"
            >
              Il giro completo
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </a>
          </Reveal>
        </div>
        <Stagger
          as="ul"
          className="border-separator mt-10 border-t-[0.5px]"
          gap={0.05}
        >
          {others.map((o, i) => {
            const Icon = o.icon
            return (
              <Item as="li" key={o.slug}>
                <a
                  href={`/prodotto/${o.slug}`}
                  className="group border-separator hover:bg-background grid grid-cols-[48px_40px_1fr_auto] items-center gap-4 border-b-[0.5px] py-5 transition-colors duration-300 sm:grid-cols-[64px_40px_220px_1fr_auto] sm:px-3"
                >
                  <span className="tabular text-tertiary font-mono text-[13px]">
                    [{String(i + 1).padStart(2, '0')}]
                  </span>
                  <span className="bg-brand-soft text-primary grid size-10 place-items-center rounded-xl transition-transform duration-300 group-hover:scale-105">
                    <Icon size={18} strokeWidth={1.8} />
                  </span>
                  <span className="text-[18px] font-semibold">{o.name}</span>
                  <span className="text-muted hidden text-[15px] sm:block">
                    {o.menu}
                  </span>
                  <ArrowRight
                    size={18}
                    className="text-tertiary group-hover:text-primary transition-all duration-300 ease-out group-hover:translate-x-1"
                  />
                </a>
              </Item>
            )
          })}
        </Stagger>
      </Container>
    </section>
  )
}

/* ---------- CTA finale ---------- */

function FinalCta() {
  return (
    <section className="bg-ink relative overflow-hidden py-24 text-white sm:py-32">
      <div className="blueprint-dark pointer-events-none absolute inset-0" />
      <Container className="relative text-center">
        <h2 className="mx-auto max-w-3xl text-[40px] leading-[1.05] sm:text-[56px]">
          <Words text="Vediamolo sulla tua azienda." />
        </h2>
        <Reveal delay={0.25}>
          <p className="mx-auto mt-6 max-w-xl text-[19px] leading-relaxed text-white/70">
            In 20 minuti ci racconti come vendete oggi e quali sono i tre
            problemi che ti pesano di più. Ti mostriamo dal vivo come li risolve
            il gestionale.
          </p>
          <DemoButton size="xl" className="mt-9" />
        </Reveal>
      </Container>
    </section>
  )
}

/* ---------- Pagina ---------- */

export function FeaturePage({ f }: { f: Feature }) {
  usePageEnter()
  useEffect(() => {
    document.title = `${f.name} — RelateSales`
  }, [f.name])

  return (
    <>
      <Hero f={f} />
      <Highlights f={f} />
      <section className="pb-12">
        <Container>
          {f.blocks.map((b, i) => (
            <Block key={b.title} b={b} i={i} />
          ))}
        </Container>
      </section>
      <Steps f={f} />
      <Details f={f} />
      <Others f={f} />
      <FinalCta />
    </>
  )
}
