import { JV_PARTNERS } from '@/lib/brand'

/**
 * Co-firma della joint venture: "In joint venture con Giacomo Molteni e Mindlead Partners".
 * tone="dark" per le sezioni su fondo scuro.
 */
export function JointVenture({
  label = 'In joint venture con',
  tone = 'light',
  className = '',
}: {
  label?: string
  tone?: 'light' | 'dark'
  className?: string
}) {
  const strong = tone === 'dark' ? 'text-white' : 'text-foreground'
  const soft = tone === 'dark' ? 'text-white/55' : 'text-muted'
  return (
    <p className={`text-[14px] ${soft} ${className}`}>
      {label}{' '}
      <span className={`font-semibold ${strong}`}>{JV_PARTNERS[0]}</span> e{' '}
      <span className={`font-semibold ${strong}`}>{JV_PARTNERS[1]}</span>
    </p>
  )
}
