import { motion } from 'motion/react'
import { Container } from '@/components/ui'
import { EASE, Words } from '@/lib/motion'

const items = [
  "sei titolare di un'azienda industriale e hai almeno un commerciale oltre a te;",
  'vendi con visite, sopralluoghi, preventivi e trattative che durano mesi;',
  'oggi clienti e trattative stanno fra Excel, telefono, quaderni e memoria;',
  'non hai tempo di imparare un software complicato.',
]

export function Target() {
  return (
    <section className="py-24 sm:py-32">
      <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <h2 className="text-[34px] leading-[1.08] sm:text-[44px]">
          <Words text="Questa pagina è per te se:" />
        </h2>
        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '0px 0px -15% 0px' }}
          variants={{
            show: { transition: { staggerChildren: 0.22, delayChildren: 0.1 } },
          }}
        >
          {items.map((t) => (
            <motion.li
              key={t}
              className="relative flex items-start gap-4 py-5 text-[19px] leading-snug first:pt-0 sm:text-[21px]"
              variants={{
                hidden: { opacity: 0, y: 12, filter: 'blur(6px)' },
                show: {
                  opacity: 1,
                  y: 0,
                  filter: 'blur(0px)',
                  transition: { duration: 0.7, ease: EASE },
                },
              }}
            >
              {/* Spunta che si disegna a tratto sottile */}
              <svg viewBox="0 0 28 28" className="size-7 shrink-0" aria-hidden>
                <motion.circle
                  cx="14"
                  cy="14"
                  r="13"
                  fill="none"
                  stroke="rgba(253,108,1,0.3)"
                  strokeWidth="1"
                  variants={{
                    hidden: { pathLength: 0 },
                    show: {
                      pathLength: 1,
                      transition: { duration: 0.7, ease: EASE },
                    },
                  }}
                />
                <motion.path
                  d="M8 14.5l4 4 8-9"
                  fill="none"
                  stroke="#FD6C01"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  variants={{
                    hidden: { pathLength: 0 },
                    show: {
                      pathLength: 1,
                      transition: { duration: 0.5, ease: EASE, delay: 0.3 },
                    },
                  }}
                />
              </svg>
              {t}
              <motion.span
                className="bg-separator absolute inset-x-0 bottom-0 h-[0.5px] origin-left"
                variants={{
                  hidden: { scaleX: 0 },
                  show: {
                    scaleX: 1,
                    transition: { duration: 0.9, ease: EASE },
                  },
                }}
              />
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </section>
  )
}
