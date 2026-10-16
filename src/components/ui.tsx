import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { Words } from '@/lib/motion'

const sizes = {
  md: 'h-9 px-3.5 text-sm rounded-lg',
  lg: 'h-11 px-5 text-[15px] rounded-xl',
  xl: 'h-13 px-6 text-base rounded-xl',
}

/** Unica azione della pagina: "Richiedi una demo". */
export function DemoButton({
  size = 'lg',
  children = 'Richiedi una demo',
  className = '',
  ...rest
}: { size?: keyof typeof sizes } & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      href="/#demo"
      className={`bg-primary hover:bg-primary-hover inline-flex items-center justify-center gap-1.5 font-semibold whitespace-nowrap text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_1px_2px_rgba(253,108,1,0.3)] transition-[background-color,transform,box-shadow] duration-200 ease-out hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_6px_16px_-4px_rgba(253,108,1,0.45)] active:scale-[0.98] ${sizes[size]} ${className}`}
      {...rest}
    >
      {children}
    </a>
  )
}

export function Eyebrow({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <p
      className={`text-primary text-[13px] font-semibold tracking-[0.08em] uppercase ${className}`}
    >
      {children}
    </p>
  )
}

const accentTones = {
  muted: 'text-muted',
  primary: 'text-primary',
  dim: 'text-white/45',
}

/** Titolo di sezione: le parole entrano in sequenza, con sfocatura che si dissolve. */
export function SectionTitle({
  text,
  accent,
  tone = 'muted',
  className = '',
}: {
  text: string
  accent?: string
  tone?: keyof typeof accentTones
  className?: string
}) {
  const offset = text.split(' ').length * 0.045
  return (
    <h2
      className={`text-[34px] leading-[1.08] text-balance sm:text-[44px] lg:text-[52px] ${className}`}
    >
      <Words text={text} />
      {accent && (
        <>
          {' '}
          <Words text={accent} className={accentTones[tone]} delay={offset} />
        </>
      )}
    </h2>
  )
}

export function Container({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}
    >
      {children}
    </div>
  )
}
