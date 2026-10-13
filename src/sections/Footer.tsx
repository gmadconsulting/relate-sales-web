import { Logo } from '@/components/Logo'
import { Container } from '@/components/ui'

export function Footer() {
  return (
    <footer className="bg-background py-12">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <Logo />
            <p className="text-muted mt-3 text-[15px]">
              Il gestionale commerciale con meno funzioni.
            </p>
          </div>
          <nav
            className="flex gap-6 text-[14px] font-medium"
            aria-label="Legale"
          >
            {/* TODO: pagine privacy e cookie, link di accesso al gestionale */}
            <a href="#" className="text-muted hover:text-foreground">
              Privacy
            </a>
            <a href="#" className="text-muted hover:text-foreground">
              Cookie
            </a>
            <a href="#" className="text-primary hover:text-primary-hover">
              Accedi
            </a>
          </nav>
        </div>
        <p className="border-separator text-muted mt-8 border-t-[0.5px] pt-6 text-[13px]">
          {/* TODO: dati legali reali */}
          [Ragione sociale] · P.IVA [numero] · [email] · [telefono]
        </p>
      </Container>
    </footer>
  )
}
