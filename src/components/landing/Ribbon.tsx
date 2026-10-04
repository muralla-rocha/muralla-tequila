import React from 'react'

import { getDictionary } from '@/i18n/dictionaries'

function Items({ items, className }: { className: string; items: string[] }) {
  return (
    <div
      className={`items-center justify-center overflow-hidden bg-bronze whitespace-nowrap ${className}`}
    >
      {items.map((item, i) => (
        <React.Fragment key={item}>
          {i > 0 && <span className="text-[12px] text-on-cream">✦</span>}
          <span className="font-label text-[11px] tracking-[0.18em] text-ink lg:text-label lg:tracking-eyebrow">
            {item}
          </span>
        </React.Fragment>
      ))}
    </div>
  )
}

export async function Ribbon() {
  const { ribbon, ribbonMobile } = await getDictionary()

  return (
    <>
      <Items className="flex gap-[18px] py-[14px] lg:hidden" items={ribbonMobile} />
      <Items className="hidden gap-9 py-[18px] lg:flex" items={ribbon} />
    </>
  )
}
