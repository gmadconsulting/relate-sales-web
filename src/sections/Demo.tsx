import { CheckCircle2, Play } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useState, type FormEvent } from 'react'
import { Container } from '@/components/ui'
import { JointVenture } from '@/components/JointVenture'
import { useOpenVideo } from '@/components/VideoDialog'
import { EASE, Reveal, Words } from '@/lib/motion'

const roles = [
  'Titolare',
  'Amministratore delegato',
  'Direttore commerciale',
  'Altro',
]

const inputCls =
  'h-12 w-full rounded-[10px] border-[0.5px] border-separator bg-white px-3.5 text-[16px] outline-none transition-colors placeholder:text-tertiary focus:border-primary'

function Field({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[14px] font-medium">{label}</span>
      {children}
    </label>
  )
}

export function Demo() {
  const [sent, setSent] = useState(false)
  const [role, setRole] = useState(roles[0])
  const openVideo = useOpenVideo()

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // TODO: collegare l'invio (email / CRM). Per ora mostra solo la conferma.
    setSent(true)
  }

  return (
    <section
      id="demo"
      className="bg-ink relative overflow-hidden py-24 text-white sm:py-32"
    >
      <div className="blueprint-dark pointer-events-none absolute inset-0" />
      <Container className="relative grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 className="text-[40px] leading-[1.05] sm:text-[56px]">
            <Words text="Vediamolo sulla tua azienda." />
          </h2>
          <Reveal delay={0.3}>
            <p className="mt-6 text-[19px] leading-relaxed text-white/70">
              In 20 minuti ci racconti come vendete oggi e quali sono i tre
              problemi che ti pesano di più. Ti mostriamo dal vivo come li
              risolve il gestionale.
            </p>
            <p className="mt-4 text-[19px] leading-relaxed font-semibold">
              E esci con il percorso delle tue trattative già disegnato.
            </p>
            <div className="mt-10 border-t-[0.5px] border-white/15 pt-6">
              <JointVenture
                tone="dark"
                label="RelateSales nasce in joint venture con"
              />
            </div>
          </Reveal>
        </div>

        <Reveal
          delay={0.15}
          className="text-foreground shadow-sheet rounded-[20px] bg-white p-6 sm:p-8"
        >
          <AnimatePresence mode="wait" initial={false}>
            {sent ? (
              <motion.div
                key="sent"
                className="flex min-h-[420px] flex-col items-center justify-center text-center"
                initial={{ opacity: 0, scale: 0.97, filter: 'blur(6px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <motion.span
                  initial={{ scale: 0.4, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    type: 'spring',
                    stiffness: 380,
                    damping: 18,
                    delay: 0.1,
                  }}
                >
                  <CheckCircle2 size={44} className="text-success" />
                </motion.span>
                <p className="font-display mt-4 text-[26px] leading-tight font-bold">
                  Ricevuto. Ti chiamiamo entro un giorno lavorativo.
                </p>
                <p className="text-muted mt-3 text-[16px]">
                  Intanto, guarda il gestionale in 3 minuti.
                </p>
                <button
                  onClick={openVideo}
                  className="bg-fill mt-6 inline-flex h-11 items-center gap-2 rounded-xl px-5 text-[15px] font-semibold transition-colors hover:bg-black/15"
                >
                  <Play size={14} fill="currentColor" /> Guarda il video
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={onSubmit}
                className="space-y-4"
                exit={{ opacity: 0, scale: 0.98, filter: 'blur(6px)' }}
                transition={{ duration: 0.3, ease: EASE }}
              >
                <Field label="Nome e cognome">
                  <input
                    required
                    name="nome"
                    autoComplete="name"
                    className={inputCls}
                  />
                </Field>
                <Field label="Azienda">
                  <input
                    required
                    name="azienda"
                    autoComplete="organization"
                    className={inputCls}
                  />
                </Field>
                <fieldset>
                  <legend className="mb-1.5 text-[14px] font-medium">
                    Ruolo
                  </legend>
                  <div className="bg-fill grid grid-cols-2 gap-1 rounded-[11px] p-1 sm:grid-cols-4">
                    {roles.map((r) => (
                      <label
                        key={r}
                        className={`relative flex min-h-10 cursor-pointer items-center justify-center rounded-lg px-2 text-center text-[13px] leading-tight transition-colors has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-[rgba(253,108,1,0.55)] ${
                          role === r
                            ? 'font-semibold'
                            : 'font-medium hover:bg-white/50'
                        }`}
                      >
                        {role === r && (
                          <motion.span
                            layoutId="role-pill"
                            className="absolute inset-0 rounded-lg bg-white shadow-[0_1px_3px_rgba(0,0,0,0.12)]"
                            transition={{
                              type: 'spring',
                              stiffness: 420,
                              damping: 34,
                            }}
                          />
                        )}
                        <input
                          type="radio"
                          name="ruolo"
                          value={r}
                          checked={role === r}
                          onChange={() => setRole(r)}
                          className="sr-only"
                        />
                        <span className="relative">{r}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Email">
                    <input
                      required
                      type="email"
                      name="email"
                      autoComplete="email"
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Telefono">
                    <input
                      required
                      type="tel"
                      name="telefono"
                      autoComplete="tel"
                      className={inputCls}
                    />
                  </Field>
                </div>
                <button
                  type="submit"
                  className="bg-primary hover:bg-primary-hover mt-2 h-13 w-full rounded-xl text-[16px] font-semibold text-white transition-colors"
                >
                  Richiedi una demo
                </button>
                <p className="text-muted text-center text-[14px]">
                  Ti richiamiamo entro un giorno lavorativo per fissare
                  l'orario.
                </p>
                <p className="text-tertiary text-center text-[12px] leading-snug">
                  Inviando la richiesta dichiari di aver letto l’
                  <a
                    href="/privacy"
                    className="hover:text-muted underline underline-offset-2"
                  >
                    informativa privacy
                  </a>
                  .
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </Reveal>
      </Container>
    </section>
  )
}
