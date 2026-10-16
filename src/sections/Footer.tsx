import { Logo } from '@/components/Logo'
import { Container } from '@/components/ui'
import { LEGAL } from '@/lib/legal'

export function Footer() {
  return (
    <footer className="bg-background py-12">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <a href="/#top" aria-label="RelateSales, torna alla home">
              <Logo />
            </a>
            <p className="text-muted mt-3 text-[15px]">
              Il gestionale commerciale con meno funzioni.
            </p>
          </div>
          <nav
            className="flex gap-6 text-[14px] font-medium"
            aria-label="Legale"
          >
            <a
              href="/privacy"
              className="text-muted hover:text-foreground transition-colors"
            >
              Privacy
            </a>
            <a
              href="/privacy#cookie"
              className="text-muted hover:text-foreground transition-colors"
            >
              Cookie
            </a>
            {/* TODO: link di accesso al gestionale */}
            <a
              href="#"
              className="text-primary hover:text-primary-hover transition-colors"
            >
              Accedi
            </a>
          </nav>
        </div>
        <p className="border-separator text-muted mt-8 border-t-[0.5px] pt-6 text-[13px] leading-relaxed">
          © {new Date().getFullYear()} {LEGAL.company} · {LEGAL.address} ·{' '}
          <a
            href={`mailto:${LEGAL.email}`}
            className="hover:text-foreground transition-colors"
          >
            {LEGAL.email}
          </a>
        </p>
      </Container>
    </footer>
  )
}
