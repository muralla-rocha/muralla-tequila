import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { Button } from '@/components/Button/Button'
import { Container } from '@/components/Container/Container'
import { locales } from '@/i18n/config'
import { getDictionary, getLocale } from '@/i18n/dictionaries'

import { MobileMenu } from './MobileMenu'

export async function LanguageSwitch({
  className,
  tone = 'dark',
}: {
  className?: string
  /** `light`: sobre fondos claros (pop-up de edad). */
  tone?: 'dark' | 'light'
}) {
  const light = tone === 'light'
  const current = await getLocale()
  const dict = await getDictionary()

  return (
    <div
      aria-label={dict.nav.languageLabel}
      className={`flex gap-2 font-label ${light ? 'text-label-sm' : 'text-label'} ${className ?? ''}`}
      role="group"
    >
      {locales.map((locale, i) => (
        <React.Fragment key={locale}>
          {i > 0 && <span className="text-on-ink-faint">|</span>}
          {locale === current ? (
            <span
              aria-current="true"
              className={`tracking-label ${light ? 'text-on-cream' : 'text-gold'}`}
            >
              {locale.toUpperCase()}
            </span>
          ) : (
            <Link
              className={`tracking-label text-on-ink-faint transition-colors ${light ? 'hover:text-on-cream' : 'hover:text-gold'}`}
              hrefLang={locale}
              href={`/${locale}`}
              lang={locale}
            >
              {locale.toUpperCase()}
            </Link>
          )}
        </React.Fragment>
      ))}
    </div>
  )
}

export async function Nav() {
  const { nav } = await getDictionary()
  const links = [
    { href: '#inicio', label: nav.home },
    { href: '#historia', label: nav.story },
    { href: '#tequilas', label: nav.tequilas },
    { href: '#agave', label: nav.process },
    { href: '#copa', label: nav.recipes },
    { href: '#contacto', label: nav.contact },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-line-bronze bg-ink">
      <Container className="relative flex items-center justify-between py-[14px] xl:py-[22px]" nav>
        <a href="#inicio">
          <Image
            alt={nav.logoAlt}
            className="h-auto w-[110px] xl:w-[150px]"
            height={51}
            src="/images/wordmark-nav.svg"
            unoptimized
            width={150}
          />
        </a>
        <nav className="hidden gap-[34px] font-label text-label tracking-label xl:flex">
          {links.map((link, i) => (
            <a
              className={`whitespace-nowrap transition-colors hover:text-gold ${i === 0 ? 'text-gold' : 'text-on-ink'}`}
              href={link.href}
              key={link.href}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-6 xl:flex">
          <LanguageSwitch />
          <Button href="#contacto" variant="outline">
            {nav.join}
          </Button>
        </div>
        <MobileMenu closeLabel={nav.menuClose} openLabel={nav.menuOpen}>
          <nav className="flex flex-col gap-5 font-label text-label tracking-label">
            {links.map((link) => (
              <a
                className="text-on-ink transition-colors hover:text-gold"
                href={link.href}
                key={link.href}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <LanguageSwitch />
          <Button href="#contacto" variant="outline">
            {nav.join}
          </Button>
        </MobileMenu>
      </Container>
    </header>
  )
}
