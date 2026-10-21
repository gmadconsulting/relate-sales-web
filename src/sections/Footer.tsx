import { JointVenture } from '@/components/JointVenture'
import { Logo } from '@/components/Logo'
import { Container, DemoButton } from '@/components/ui'
import { FEATURES } from '@/lib/features'
import { LEGAL } from '@/lib/legal'

const YEAR = new Date().getFullYear()

const columns: { title: string; links: { href: string; label: string }[] }[] = [
  {
    title: 'Prodotto',
    links: FEATURES.map((f) => ({
      href: `/prodotto/${f.slug}`,
      label: f.name,
    })),
  },
  {
    title: 'Perché RelateSales',
    links: [
      { href: '/#come-funziona', label: 'Come funziona' },
      { href: '/#giornata', label: 'La giornata di un commerciale' },
      { href: '/#cosa-abbiamo-tolto', label: 'Cosa abbiamo tolto' },
      { href: '/#come-si-parte', label: 'Come si parte' },
      { href: '/#calcolatore', label: 'Il calcolatore' },
      { href: '/#per-chi-e', label: 'Per chi è' },
    ],
  },
  {
    title: 'Azienda',
    links: [
      { href: '/#prezzi', label: 'Prezzi' },
      { href: '/#domande', label: 'Domande frequenti' },
      { href: '/#demo', label: 'Richiedi una demo' },
      { href: '/privacy', label: 'Informativa privacy' },
      { href: '/privacy#cookie', label: 'Cookie' },
      {
        href: 'https://app.relatesale.com/privacy',
        label: 'Privacy del gestionale',
      },
    ],
  },
]

export function Footer() {
  return (
    <footer className="border-separator bg-background border-t-[0.5px] pt-16 pb-10">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <a href="/" aria-label="RelateSales, home">
              <Logo />
            </a>
            <p className="text-muted mt-4 max-w-xs text-[15px] leading-relaxed">
              Il gestionale commerciale con meno funzioni. Solo quelle che usi
              davvero.
            </p>
            <JointVenture className="mt-4 max-w-xs leading-relaxed" />
            <DemoButton size="md" className="mt-6" />
          </div>
          {columns.map((c) => (
            <nav key={c.title} aria-label={c.title}>
              <p className="text-foreground text-[12px] font-semibold tracking-[0.08em] uppercase">
                {c.title}
              </p>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className="text-muted hover:text-foreground text-[14px] transition-colors duration-200"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="border-separator text-muted mt-14 flex flex-col gap-3 border-t-[0.5px] pt-6 text-[13px] leading-relaxed md:flex-row md:items-center md:justify-between">
          <p>
            © {YEAR} {LEGAL.company} · {LEGAL.address}
          </p>
          <a
            href={`mailto:${LEGAL.email}`}
            className="hover:text-foreground transition-colors"
          >
            {LEGAL.email}
          </a>
        </div>
      </Container>
    </footer>
  )
}
