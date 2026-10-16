import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'

/**
 * Router minimo basato sulla History API: intercetta i link interni (<a href="/...">)
 * così il passaggio tra pagine avviene senza ricaricare e con transizione animata.
 */

type Router = { path: string; navigate: (href: string) => void }

const RouterContext = createContext<Router>({ path: '/', navigate: () => {} })
export const useRouter = () => useContext(RouterContext)

const clean = (p: string) => p.replace(/\/+$/, '') || '/'

function scrollToHash(hash: string) {
  const id = decodeURIComponent(hash.replace('#', ''))
  // Due frame: il primo monta la pagina, il secondo ha il layout definitivo
  requestAnimationFrame(() =>
    requestAnimationFrame(() => {
      const el = id ? document.getElementById(id) : null
      if (el) el.scrollIntoView({ behavior: 'instant' as ScrollBehavior })
      else window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
    }),
  )
}

export function RouterProvider({ children }: { children: ReactNode }) {
  const [path, setPath] = useState(() => clean(window.location.pathname))

  useEffect(() => {
    const navigate = (href: string) => {
      const url = new URL(href, window.location.href)
      const next = clean(url.pathname)
      if (next === clean(window.location.pathname)) {
        // Stessa pagina: aggiorna solo l'ancora e scorre in modo morbido
        window.history.pushState(null, '', url.pathname + url.hash)
        const el = url.hash ? document.getElementById(url.hash.slice(1)) : null
        if (el) el.scrollIntoView({ behavior: 'smooth' })
        else window.scrollTo({ top: 0, behavior: 'smooth' })
        return
      }
      window.history.pushState(null, '', url.pathname + url.hash)
      setPath(next)
      pendingHash = url.hash
    }
    router.navigate = navigate

    const onClick = (e: MouseEvent) => {
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      )
        return
      const a = (e.target as Element).closest('a')
      if (!a || a.target || a.hasAttribute('download')) return
      const href = a.getAttribute('href')
      if (!href || href.startsWith('mailto:') || href.startsWith('tel:')) return
      const url = new URL(href, window.location.href)
      if (url.origin !== window.location.origin) return
      e.preventDefault()
      navigate(url.href)
    }
    const onPop = () => {
      setPath(clean(window.location.pathname))
      pendingHash = window.location.hash
    }
    document.addEventListener('click', onClick)
    window.addEventListener('popstate', onPop)
    return () => {
      document.removeEventListener('click', onClick)
      window.removeEventListener('popstate', onPop)
    }
  }, [])

  return (
    <RouterContext.Provider
      value={{ path, navigate: (h) => router.navigate(h) }}
    >
      {children}
    </RouterContext.Provider>
  )
}

// Lo scroll lo gestiamo noi a ogni cambio pagina
if ('scrollRestoration' in window.history)
  window.history.scrollRestoration = 'manual'

const router = { navigate: (_href: string) => {} }
let pendingHash: string | null = window.location.hash || null

/** Da chiamare quando la nuova pagina è montata: porta in cima o all'ancora richiesta. */
export function usePageEnter() {
  useEffect(() => {
    scrollToHash(pendingHash ?? '')
    pendingHash = null
  }, [])
}
