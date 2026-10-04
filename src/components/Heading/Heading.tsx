import React from 'react'

export type HeadingSize = 'hero' | 'banner' | 'xl' | 'card' | 'item'
export type HeadingTone = 'dark' | 'light'

type HeadingProps = {
  /** Fragmento resaltado en Pirata One (solo hero, banner y xl). */
  accent?: string
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p'
  /** Pone el acento en su propia línea (hero). */
  breakAccent?: boolean
  children: React.ReactNode
  className?: string
  /** Texto en el acento antes del texto base. */
  accentFirst?: boolean
  /** Texto después del acento: "La <accent> se nota en la copa." */
  after?: string
  size?: HeadingSize
  /** `dark`: sobre fondos oscuros. `light`: sobre fondos claros. */
  tone?: HeadingTone
}

// Títulos mixtos: Libre Caslon + fragmento en Pirata One.
// card/item: todo el título va en Pirata One (nombres de producto y receta).
const sizes: Record<HeadingSize, string> = {
  hero: 'font-body text-[40px] leading-[1.05] lg:text-hero lg:leading-[1.02]',
  banner: 'font-body text-[34px] leading-[1.08] lg:text-title-banner lg:leading-[1.05]',
  xl: 'font-body text-[32px] leading-[1.1] lg:text-title-xl lg:leading-[1.08]',
  card: 'font-display text-[36px] leading-normal lg:text-title-lg lg:leading-[0.95]',
  item: 'font-display text-[26px] leading-normal lg:text-title-md',
}

const accentSizes: Partial<Record<HeadingSize, string>> = {
  hero: 'text-[44px] lg:text-hero-accent',
}

const tones: Record<HeadingTone, { base: string; accent: string }> = {
  dark: { base: 'text-on-ink-heading', accent: 'text-gold' },
  light: { base: 'text-on-cream', accent: 'text-bronze' },
}

// card/item no mezclan fuentes: su color es el del acento de cada fondo.
const solidTones: Record<HeadingTone, string> = {
  dark: 'text-gold',
  light: 'text-on-cream',
}

export function Heading({
  accent,
  accentFirst,
  after,
  as: Tag = 'h2',
  breakAccent,
  children,
  className,
  size = 'xl',
  tone = 'light',
}: HeadingProps) {
  const solid = size === 'card' || size === 'item'
  const classes = [
    'font-normal',
    sizes[size],
    solid ? solidTones[tone] : tones[tone].base,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  if (!accent) {
    return <Tag className={classes}>{children}</Tag>
  }

  const accentNode = (
    <span
      className={['font-display', tones[tone].accent, accentSizes[size], breakAccent && 'block']
        .filter(Boolean)
        .join(' ')}
    >
      {accent}
    </span>
  )

  return (
    <Tag className={classes}>
      {accentFirst && <>{accentNode} </>}
      {children}
      {!accentFirst && <> {accentNode}</>}
      {after && <> {after}</>}
    </Tag>
  )
}
