'use client'

import React from 'react'

import { subscribe, type SubscribeState } from '@/app/(frontend)/[lang]/actions/subscribe'
import { Button } from '@/components/Button/Button'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries'

const label =
  'font-label text-[10px] tracking-[0.16em] text-gold lg:text-label-xs lg:tracking-[0.18em]'
const field =
  'w-full border border-line-field bg-field p-[14px] lg:px-4 lg:py-[15px] text-[15px] text-on-ink placeholder:text-on-ink-placeholder focus:border-gold focus:outline-none'
const check =
  'mt-px size-[18px] shrink-0 cursor-pointer appearance-none border border-gold checked:bg-bronze'

const panel =
  'flex flex-col items-start gap-[18px] lg:gap-5 lg:border lg:border-line-form lg:bg-ink-raised lg:p-10'

export function CommunityForm({
  copy,
  locale,
}: {
  copy: Dictionary['community']['form']
  locale: Locale
}) {
  const [state, action, pending] = React.useActionState<SubscribeState, FormData>(subscribe, {
    status: 'idle',
  })
  // La fecha de nacimiento no puede ser futura.
  const today = new Date().toISOString().slice(0, 10)

  if (state.status === 'success') {
    return (
      <div aria-live="polite" className={panel} role="status">
        <h3 className="font-display text-[36px] leading-normal font-normal text-gold">
          {copy.success.title}
        </h3>
        <p className="text-[15px] leading-[1.55] text-on-ink-muted lg:text-[17px]">
          {copy.success.text}
        </p>
      </div>
    )
  }

  return (
    <form action={action} className={panel}>
      <input name="locale" type="hidden" value={locale} />
      {/* Honeypot: invisible para personas, los bots lo llenan. */}
      <input
        aria-hidden
        autoComplete="off"
        className="hidden"
        name="website"
        tabIndex={-1}
        type="text"
      />
      <h3 className="hidden font-display text-[36px] leading-normal font-normal text-gold lg:block">
        {copy.title}
      </h3>

      <label className="flex w-full flex-col gap-[6px] lg:gap-2">
        <span className={label}>{copy.name.label}</span>
        <input
          autoComplete="name"
          className={field}
          name="name"
          placeholder={copy.name.placeholder}
          required
        />
      </label>

      <label className="flex w-full flex-col gap-[6px] lg:gap-2">
        <span className={label}>{copy.email.label}</span>
        <input
          autoComplete="email"
          className={field}
          name="email"
          placeholder={copy.email.placeholder}
          required
          type="email"
        />
      </label>

      <div className="flex w-full flex-col gap-[18px] lg:flex-row lg:gap-4">
        <label className="flex w-full min-w-0 flex-1 flex-col gap-[6px] lg:gap-2">
          <span className={label}>{copy.birthdate.label}</span>
          <input
            autoComplete="bday"
            className={`${field} scheme-dark`}
            max={today}
            name="birthdate"
            required
            type="date"
          />
        </label>
        <label className="flex w-full min-w-0 flex-1 flex-col gap-[6px] lg:gap-2">
          <span className={label}>{copy.region.label}</span>
          <span className="relative block">
            <select className={`${field} cursor-pointer appearance-none pr-10`} name="region">
              {copy.region.options.map((s) => (
                <option className="bg-ink-raised" key={s}>
                  {s}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-[14px] text-gold">
              ▾
            </span>
          </span>
        </label>
      </div>

      <label className="flex w-full items-start gap-3 text-[13px] leading-normal text-on-ink-muted">
        <input className={check} name="adult" required type="checkbox" />
        <span className="lg:hidden">{copy.adultShort}</span>
        <span className="hidden lg:inline">{copy.adult}</span>
      </label>
      <label className="hidden w-full items-start gap-3 text-[13px] leading-normal text-on-ink-muted lg:flex">
        <input className={check} name="marketing" type="checkbox" />
        {copy.marketing}
      </label>

      {state.status === 'error' && (
        <p aria-live="polite" className="text-[13px] leading-normal text-on-ink-muted" role="alert">
          {copy.errors[state.error]}
        </p>
      )}
      <Button disabled={pending} fullWidth type="submit">
        {pending ? copy.sending : copy.submit}
      </Button>
      <p className="hidden max-w-[460px] text-[12px] leading-normal text-on-ink-faint lg:block">
        {copy.privacy}
      </p>
    </form>
  )
}
