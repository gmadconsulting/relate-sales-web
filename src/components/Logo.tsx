import logo from '@/assets/relate-logo.png'

export function LogoMark({ className = 'size-8' }: { className?: string }) {
  return (
    <span
      className={`bg-primary grid shrink-0 place-items-center rounded-[9px] ${className}`}
      aria-hidden
    >
      <img src={logo} alt="" className="h-[58%] w-auto" />
    </span>
  )
}

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark />
      <span
        className={`font-display text-[17px] font-bold tracking-tight ${compact ? 'hidden sm:inline' : ''}`}
      >
        Relate Sales
      </span>
    </span>
  )
}
