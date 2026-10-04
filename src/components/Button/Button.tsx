import Link from 'next/link'
import React from 'react'

export type ButtonVariant =
  'primary' | 'dark' | 'outline' | 'ghost' | 'outlineDark' | 'outlineBrown'

type CommonProps = {
  children: React.ReactNode
  className?: string
  fullWidth?: boolean
  variant?: ButtonVariant
}

type AnchorProps = CommonProps &
  Omit<React.ComponentProps<typeof Link>, keyof CommonProps> & { href: string }

type NativeButtonProps = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & { href?: undefined }

export type ButtonProps = AnchorProps | NativeButtonProps

const base =
  'inline-flex cursor-pointer items-center justify-center border border-transparent px-5 py-4 font-label text-label-sm leading-normal tracking-[0.16em] lg:px-7 lg:text-label lg:tracking-button whitespace-nowrap no-underline transition-colors focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gold disabled:cursor-not-allowed disabled:opacity-50'

const variants: Record<ButtonVariant, string> = {
  // Relleno bronce · CTA principal (hero, formulario)
  primary: 'bg-bronze text-ink hover:not-disabled:bg-gold',
  // Relleno café · sobre fondos claros (Visita el restaurante)
  dark: 'bg-on-cream text-cream hover:not-disabled:bg-bronze',
  // Contorno bronce · sobre fondos oscuros (nav: Únete)
  outline: 'border-bronze text-on-ink hover:not-disabled:bg-bronze hover:not-disabled:text-ink',
  // Contorno crema · secundario sobre fondos oscuros (hero: Nuestra historia)
  ghost: 'border-on-ink text-on-ink hover:not-disabled:bg-on-ink hover:not-disabled:text-ink',
  // Contorno bronce · sobre fondos claros (Conoce el proceso completo)
  // Contorno café · secundario sobre fondos claros (pop-up de edad)
  outlineBrown:
    'border-on-cream text-on-cream hover:not-disabled:bg-on-cream hover:not-disabled:text-cream',
  outlineDark:
    'border-bronze text-on-cream hover:not-disabled:bg-bronze hover:not-disabled:text-cream',
}

export function Button(props: ButtonProps) {
  const { children, className, fullWidth, variant = 'primary', ...rest } = props
  const classes = [base, variants[variant], fullWidth && 'w-full', className]
    .filter(Boolean)
    .join(' ')

  if (rest.href !== undefined) {
    return (
      <Link {...(rest as Omit<AnchorProps, keyof CommonProps>)} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button
      type="button"
      {...(rest as Omit<NativeButtonProps, keyof CommonProps>)}
      className={classes}
    >
      {children}
    </button>
  )
}
