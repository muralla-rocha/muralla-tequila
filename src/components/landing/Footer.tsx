import Image from 'next/image'
import React from 'react'

import { Container } from '@/components/Container/Container'
import { getDictionary } from '@/i18n/dictionaries'

import { LanguageSwitch } from './Nav'

// TODO: reemplazar los placeholders entre corchetes por las cuentas reales (en el diccionario).

const heading = 'font-label text-label-xs tracking-[0.2em] text-on-ink-faint'
const mobileAnchors = ['#inicio', '#historia', '#tequilas', '#agave', '#contacto']

export async function Footer() {
  const { footer, nav } = await getDictionary()
  const navigation = [
    { href: '#inicio', label: footer.links.home },
    { href: '#historia', label: footer.links.story },
    { href: '#tequilas', label: footer.links.tequilas },
    { href: '#agave', label: footer.links.process },
    { href: '#copa', label: footer.links.recipes },
    { href: '#contacto', label: footer.links.contact },
  ]

  return (
    <footer className="bg-ink-deep pt-12 pb-8 lg:pt-20 lg:pb-10">
      <Container className="flex flex-col gap-12">
        {/* Móvil: todo centrado en una columna */}
        <div className="flex flex-col items-center gap-[22px] text-center lg:hidden">
          <Image
            alt=""
            className="h-auto w-20"
            height={73}
            src="/images/sello-footer.svg"
            unoptimized
            width={80}
          />
          <Image
            alt={nav.logoAlt}
            className="h-auto w-[200px]"
            height={68}
            src="/images/wordmark-footer.svg"
            unoptimized
            width={200}
          />
          <p className="text-[16px] text-on-ink">{footer.tagline}</p>
          <nav className="flex flex-wrap justify-center gap-x-2 text-[14px] text-on-ink">
            {footer.mobile.links.map((label, i) => (
              <React.Fragment key={label}>
                {i > 0 && <span aria-hidden>·</span>}
                <a className="transition-colors hover:text-gold" href={mobileAnchors[i]}>
                  {label}
                </a>
              </React.Fragment>
            ))}
          </nav>
          <div className="flex items-center gap-6 font-label text-label-xs tracking-[0.14em] text-on-ink-faint">
            <span>{footer.mobile.social.join(' · ')}</span>
            <LanguageSwitch className="text-label-xs!" />
          </div>
          <p className="border border-gold/60 px-3 py-[6px] font-label text-[10px] tracking-[0.14em] text-gold">
            {footer.responsible}
          </p>
          <p className="text-[12px] text-on-ink-faint">{footer.mobile.legal}</p>
        </div>

        {/* Desktop */}
        <div className="hidden flex-wrap justify-between gap-12 lg:flex">
          <div className="flex flex-col gap-4">
            <Image
              alt={nav.logoAlt}
              height={81}
              src="/images/wordmark-footer.svg"
              unoptimized
              width={240}
            />
            <p className="text-body text-on-ink">{footer.tagline}</p>
          </div>

          <nav className="flex flex-col gap-3">
            <p className={heading}>{footer.navHeading}</p>
            {navigation.map((link) => (
              <a
                className="text-[15px] text-on-ink transition-colors hover:text-gold"
                href={link.href}
                key={link.href}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-3">
            <p className={heading}>{footer.followHeading}</p>
            {footer.social.map((item) => (
              <p className="text-[15px] text-on-ink" key={item}>
                {item}
              </p>
            ))}
            <LanguageSwitch className="pt-3" />
          </div>

          <Image
            alt=""
            className="h-auto w-[110px] self-start"
            height={100}
            src="/images/sello-footer.svg"
            unoptimized
            width={110}
          />
        </div>

        <div className="hidden flex-col justify-between gap-4 border-t border-bronze/30 pt-6 lg:flex lg:flex-row lg:items-center">
          <p className="text-[13px] text-on-ink-faint">{footer.legal}</p>
          <p className="border border-gold/60 px-[14px] py-[6px] font-label text-label-sm tracking-[0.18em] text-gold">
            {footer.responsible}
          </p>
        </div>
      </Container>
    </footer>
  )
}
