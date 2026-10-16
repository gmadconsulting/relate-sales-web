import { useEffect } from 'react'
import { Container, DemoButton } from '@/components/ui'
import { usePageEnter } from '@/lib/router'

export function NotFoundPage() {
  usePageEnter()
  useEffect(() => {
    document.title = 'Pagina non trovata — RelateSales'
  }, [])
  return (
    <section className="py-40 text-center">
      <Container>
        <p className="tabular text-tertiary font-mono text-[14px]">[404]</p>
        <h1 className="mt-4 text-[44px] leading-tight sm:text-[56px]">
          Questa pagina non esiste.
        </h1>
        <p className="text-muted mt-4 text-[19px]">
          Forse il link è cambiato. Torna alla home o richiedi una demo.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <a
            href="/"
            className="bg-fill inline-flex h-13 items-center rounded-xl px-6 font-semibold transition-colors hover:bg-black/12"
          >
            Torna alla home
          </a>
          <DemoButton size="xl" />
        </div>
      </Container>
    </section>
  )
}
