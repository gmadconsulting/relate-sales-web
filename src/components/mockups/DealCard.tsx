import { EllipsisVertical, Flag, Phone } from 'lucide-react'
import { Badge, Initials } from './kit'
import { eur, type Deal } from './data'

/** Tessera trattativa come nella bacheca del gestionale. */
export function DealCard({
  deal,
  highlight = false,
}: {
  deal: Deal
  highlight?: boolean
}) {
  return (
    <div
      className={`rounded-xl bg-white px-3.5 pt-3.5 pb-3 transition-shadow ${
        highlight
          ? 'shadow-[0_0_0_1.5px_#FD6C01,0_8px_24px_rgba(253,108,1,0.12)]'
          : 'shadow-card'
      }`}
    >
      <div className="flex items-start gap-2">
        <div className="min-w-0 flex-1">
          <p className="truncate text-[15px] leading-snug font-semibold">
            {deal.person}
          </p>
          <p className="text-muted truncate text-[13px]">{deal.company}</p>
        </div>
        <Phone
          size={17}
          strokeWidth={1.6}
          className="text-foreground/70 mt-0.5"
        />
        <EllipsisVertical size={16} className="text-foreground/60 mt-0.5" />
      </div>
      <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
        {deal.stale ? (
          <Badge tone="stale">Ferma da {deal.days} g</Badge>
        ) : (
          <Badge tone="neutral">{deal.days} g in fase</Badge>
        )}
        {deal.inTarget && <Badge tone="success">In target</Badge>}
        {deal.visited && <Badge tone="info">Visitato</Badge>}
        {deal.high && (
          <Badge tone="neutral">
            <Flag size={11} strokeWidth={2.2} /> Alta
          </Badge>
        )}
      </div>
      <div className="mt-2 flex items-center justify-between">
        <span className="tabular text-[14px] font-semibold">
          {deal.value ? eur(deal.value) : ''}
        </span>
        <Initials text={deal.owner} size={20} />
      </div>
    </div>
  )
}
