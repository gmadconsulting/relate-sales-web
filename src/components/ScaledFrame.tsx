import { useEffect, useRef, useState, type ReactNode } from 'react'

/**
 * Disegna i mockup a dimensione "reale" (es. 1120×700) e li scala alla larghezza
 * disponibile, così restano fedeli al pixel su qualsiasi schermo.
 */
export function ScaledFrame({
  width,
  height,
  children,
  className = '',
}: {
  width: number
  height: number
  children: ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) =>
      setScale(entry.contentRect.width / width),
    )
    ro.observe(el)
    return () => ro.disconnect()
  }, [width])

  return (
    <div
      ref={ref}
      className={`relative w-full ${className}`}
      style={{ height: height * scale }}
    >
      <div
        className="absolute top-0 left-0 origin-top-left"
        style={{ width, height, transform: `scale(${scale})` }}
      >
        {children}
      </div>
    </div>
  )
}
