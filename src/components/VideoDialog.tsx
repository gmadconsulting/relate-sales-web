import { Play, X } from 'lucide-react'
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'

const VideoContext = createContext<() => void>(() => {})
export const useOpenVideo = () => useContext(VideoContext)

/** Video "Guarda come funziona (3 minuti)" sopra la pagina. */
export function VideoProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <VideoContext.Provider value={() => setOpen(true)}>
      {children}
      {open && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Video: come funziona Relate Sales"
        >
          <div
            className="animate-dialog-in bg-ink shadow-sheet relative aspect-video w-full max-w-4xl overflow-hidden rounded-[14px]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* TODO: sostituire con il video da 3 minuti quando è pronto */}
            <div className="blueprint-dark grid h-full place-items-center text-center text-white">
              <div>
                <span className="bg-primary mx-auto grid size-16 place-items-center rounded-full">
                  <Play size={26} fill="currentColor" />
                </span>
                <p className="font-display mt-4 text-xl font-bold">
                  Il gestionale in 3 minuti
                </p>
                <p className="mt-1 text-sm text-white/60">Video in arrivo</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 grid size-9 place-items-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25"
              aria-label="Chiudi"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}
    </VideoContext.Provider>
  )
}
