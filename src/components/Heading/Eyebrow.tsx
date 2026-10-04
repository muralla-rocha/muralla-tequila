import React from 'react'

import type { HeadingTone } from './Heading'

type EyebrowProps = {
  children: React.ReactNode
  className?: string
  /** `dark`: sobre fondos oscuros (dorado). `light`: sobre fondos claros (bronce). */
  tone?: HeadingTone
}

const tones: Record<HeadingTone, string> = {
  dark: 'text-gold',
  light: 'text-bronze',
}

/** Etiqueta pequeña sobre un título: "NUESTRA HISTORIA", "COMUNIDAD MURALLA"… */
export function Eyebrow({ children, className, tone = 'light' }: EyebrowProps) {
  const classes = [
    'font-label text-[11px] leading-normal tracking-[0.2em] lg:text-label lg:tracking-eyebrow',
    tones[tone],
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return <p className={classes}>{children}</p>
}
