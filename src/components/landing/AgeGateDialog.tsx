'use client'

import Image from 'next/image'
import React from 'react'

import { Button } from '@/components/Button/Button'
import type { Dictionary } from '@/i18n/dictionaries'

const COOKIE = 'age_verified'
const REMEMBER_SECONDS = 60 * 60 * 24 * 30

type Copy = Dictionary['ageGate'] & { logoAlt: string; responsible: string }

const subscribeNoop = () => () => {}

const isVerified = () => new RegExp(`(?:^|; )${COOKIE}=1`).test(document.cookie)

/** Marca la edad como verificada: 30 días si se pidió recordar; si no, solo esta sesión. */
function markVerified(remember: boolean) {
  const maxAge = remember ? `; max-age=${REMEMBER_SECONDS}` : ''
  document.cookie = `${COOKIE}=1; path=/; samesite=lax${maxAge}`
  document.documentElement.dataset.ageVerified = '1'
}

export function AgeGateDialog({
  copy,
  languageSwitch,
}: {
  copy: Copy
  /** Selector ES | EN renderizado en el servidor. */
  languageSwitch: React.ReactNode
}) {
  const [confirmed, setConfirmed] = React.useState(false)
  // La cookie solo se puede leer en el cliente. En el servidor (y al hidratar) se asume "sin
  // verificar": el script del layout oculta el pop-up antes del primer render. En navegaciones del
  // cliente (p. ej. cambiar de idioma) no hay hidratación, así que React lee la cookie ya en el
  // primer render y el pop-up nunca llega a pintarse.
  const needsVerification = React.useSyncExternalStore(
    subscribeNoop,
    () => !isVerified(),
    () => true,
  )
  const open = needsVerification && !confirmed
  const [underage, setUnderage] = React.useState(false)
  const [remember, setRemember] = React.useState(false)
  const panelRef = React.useRef<HTMLDivElement>(null)

  // Bloquea el scroll del sitio mientras el pop-up está abierto.
  React.useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [open])

  React.useEffect(() => {
    if (open) panelRef.current?.focus()
  }, [open, underage])

  if (!open) return null

  const content = underage ? copy.minor : copy

  return (
    <div
      aria-labelledby="age-gate-title"
      aria-modal="true"
      className="fixed inset-0 z-100 flex items-center justify-center overflow-y-auto bg-ink/85 p-5 backdrop-blur-[12px]"
      id="age-gate"
      role="dialog"
    >
      <div
        className="relative my-auto flex w-full max-w-[350px] flex-col items-center gap-[18px] bg-cream px-7 pt-10 pb-7 shadow-[0_24px_60px_rgba(0,0,0,0.45)] lg:max-w-[560px] lg:gap-[22px] lg:px-14 lg:pt-12 lg:pb-10 focus:outline-none"
        ref={panelRef}
        tabIndex={-1}
      >
        <div className="absolute inset-x-0 top-0 h-[6px] bg-agave-green lg:h-2" />
        <div className="absolute top-5 right-[47px] hidden lg:block">{languageSwitch}</div>

        <Image
          alt={copy.logoAlt}
          className="h-auto w-24 lg:w-[120px]"
          height={109}
          src="/images/sello-modal.svg"
          unoptimized
          width={120}
        />
        <p className="text-center font-label text-[11px] tracking-[0.2em] text-bronze lg:text-label-sm lg:tracking-[0.22em]">
          {content.welcome}
        </p>
        <h2
          className={`text-center font-normal text-on-cream ${underage ? 'text-[26px] lg:text-[34px]' : 'text-[30px] lg:text-[38px]'} leading-[1.15]`}
          id="age-gate-title"
        >
          {content.title}
        </h2>

        {underage ? (
          <>
            <p className="max-w-[290px] text-center text-[15px] leading-[1.55] text-on-cream-muted lg:max-w-[420px] lg:text-[16px] lg:leading-[1.6]">
              {copy.minor.text}
            </p>
            <Button onClick={() => setUnderage(false)} variant="outlineBrown">
              {copy.minor.back}
            </Button>
          </>
        ) : (
          <>
            <p className="max-w-[290px] text-center text-[15px] leading-[1.55] text-on-cream-muted lg:hidden">
              {copy.textShort}
            </p>
            <p className="hidden max-w-[420px] text-center text-[16px] leading-[1.6] text-on-cream-muted lg:block">
              {copy.text}
            </p>
            <div className="flex w-full flex-col gap-[10px] lg:gap-3">
              <Button
                fullWidth
                onClick={() => {
                  markVerified(remember)
                  setConfirmed(true)
                }}
                variant="dark"
              >
                {copy.yes}
              </Button>
              <Button fullWidth onClick={() => setUnderage(true)} variant="outlineBrown">
                {copy.no}
              </Button>
            </div>
            <label className="flex cursor-pointer items-center gap-[10px] text-[14px] text-on-cream-body">
              <input
                checked={remember}
                className="size-4 shrink-0 cursor-pointer appearance-none border border-on-cream checked:bg-on-cream"
                onChange={(e) => setRemember(e.target.checked)}
                type="checkbox"
              />
              <span className="lg:hidden">{copy.rememberShort}</span>
              <span className="hidden lg:inline">{copy.remember}</span>
            </label>
            <div className="hidden h-px w-full bg-on-cream/20 lg:block" />
            <p className="hidden text-center text-[12px] leading-[1.7] text-on-cream-muted lg:block">
              {copy.legal}
              <br />
              {copy.responsible}
            </p>
            <p className="text-center font-label text-[10px] tracking-[0.14em] text-on-cream-muted lg:hidden">
              {copy.responsible}
            </p>
          </>
        )}
      </div>
    </div>
  )
}
