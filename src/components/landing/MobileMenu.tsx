'use client'

import React from 'react'

/** Botón hamburguesa + panel desplegable de la nav (solo móvil). */
export function MobileMenu({
  children,
  closeLabel,
  openLabel,
}: {
  children: React.ReactNode
  closeLabel: string
  openLabel: string
}) {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <div className="xl:hidden">
      <button
        aria-expanded={open}
        aria-label={open ? closeLabel : openLabel}
        className="flex cursor-pointer flex-col gap-[5px] px-[6px] py-[8px]"
        onClick={() => setOpen((v) => !v)}
        type="button"
      >
        <span
          className={`h-[1.5px] w-6 bg-on-ink transition-transform ${open ? 'translate-y-[6.5px] rotate-45' : ''}`}
        />
        <span className={`h-[1.5px] w-6 bg-on-ink transition-opacity ${open ? 'opacity-0' : ''}`} />
        <span
          className={`h-[1.5px] w-6 bg-on-ink transition-transform ${open ? '-translate-y-[6.5px] -rotate-45' : ''}`}
        />
      </button>
      {open && (
        <div
          className="absolute inset-x-0 top-full flex flex-col gap-6 border-b border-line-bronze bg-ink px-gutter-nav py-6"
          onClick={(e) => {
            if ((e.target as HTMLElement).closest('a')) setOpen(false)
          }}
        >
          {children}
        </div>
      )}
    </div>
  )
}
