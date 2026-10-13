import { CircleQuestionMark, Search } from 'lucide-react'
import type { ReactNode } from 'react'

/* Atomi UI del gestionale, con le misure reali dal design pack / schermate. */

export function Guida() {
  return (
    <span className="text-primary inline-flex items-center gap-1 text-[14px] font-medium">
      <CircleQuestionMark size={15} strokeWidth={1.9} /> Guida
    </span>
  )
}

type BtnProps = {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'soft' | 'outline'
  icon?: ReactNode
  className?: string
}

export function Btn({
  children,
  variant = 'secondary',
  icon,
  className = '',
}: BtnProps) {
  const v = {
    primary: 'bg-primary text-white font-semibold',
    secondary: 'bg-fill text-foreground font-medium',
    soft: 'bg-brand-soft text-primary font-medium',
    outline:
      'bg-white text-foreground font-medium shadow-[0_0_0_0.5px_rgba(60,60,67,0.3)]',
  }[variant]
  return (
    <span
      className={`inline-flex h-9 shrink-0 items-center gap-1.5 rounded-lg px-3.5 text-[14px] whitespace-nowrap ${v} ${className}`}
    >
      {icon}
      {children}
    </span>
  )
}

export function SearchBox({
  placeholder,
  className = '',
}: {
  placeholder: string
  className?: string
}) {
  return (
    <span
      className={`text-tertiary flex h-9 items-center gap-2 rounded-[10px] bg-white px-3 text-[14px] shadow-[0_0_0_0.5px_rgba(60,60,67,0.18)] ${className}`}
    >
      <Search size={15} strokeWidth={1.9} className="text-muted" />{' '}
      {placeholder}
    </span>
  )
}

export function Segmented({
  items,
  active,
  className = '',
}: {
  items: string[]
  active: number
  className?: string
}) {
  return (
    <div
      className={`bg-fill inline-flex gap-0.5 rounded-[9px] p-0.5 ${className}`}
    >
      {items.map((it, i) => (
        <span
          key={it}
          className={`flex h-8 flex-1 items-center justify-center rounded-[7px] px-3 text-[13px] whitespace-nowrap ${
            i === active
              ? 'bg-white font-semibold shadow-[0_1px_3px_rgba(0,0,0,0.12)]'
              : 'font-medium'
          }`}
        >
          {it}
        </span>
      ))}
    </div>
  )
}

const badgeTone = {
  stale: 'bg-warning-soft text-warning',
  neutral: 'bg-fill text-foreground/80',
  info: 'bg-info-soft text-info',
  success: 'bg-success-soft text-success',
  brand: 'bg-brand-soft text-primary',
}

export function Badge({
  tone,
  children,
}: {
  tone: keyof typeof badgeTone
  children: ReactNode
}) {
  return (
    <span
      className={`inline-flex h-[22px] items-center gap-1 rounded-md px-2 text-[12px] font-semibold ${badgeTone[tone]}`}
    >
      {children}
    </span>
  )
}

export function Initials({
  text,
  size = 36,
  className = '',
}: {
  text: string
  size?: number
  className?: string
}) {
  return (
    <span
      className={`bg-avatar text-foreground/80 grid shrink-0 place-items-center rounded-full font-semibold ${className}`}
      style={{ width: size, height: size, fontSize: Math.round(size * 0.36) }}
    >
      {text}
    </span>
  )
}

export function Dot({ color, size = 8 }: { color: string; size?: number }) {
  return (
    <span
      className="shrink-0 rounded-full"
      style={{ width: size, height: size, background: color }}
    />
  )
}

export function PageHeader({
  title,
  subtitle,
  actions,
  titleExtra,
}: {
  title: ReactNode
  subtitle?: ReactNode
  actions?: ReactNode
  titleExtra?: ReactNode
}) {
  return (
    <div className="mb-6 flex items-end justify-between gap-6">
      <div className="min-w-0">
        <div className="flex items-center gap-4">
          <h3 className="font-display text-[34px] leading-[41px] font-bold tracking-[-0.025rem]">
            {title}
          </h3>
          {titleExtra}
          <Guida />
        </div>
        {subtitle && (
          <p className="text-muted mt-0.5 text-[15px]">{subtitle}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  )
}
