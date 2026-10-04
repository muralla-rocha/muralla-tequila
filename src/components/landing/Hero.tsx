import Image from 'next/image'
import React from 'react'

import { Button } from '@/components/Button/Button'
import { Eyebrow } from '@/components/Heading/Eyebrow'
import { Heading } from '@/components/Heading/Heading'
import { getDictionary } from '@/i18n/dictionaries'

export async function Hero() {
  const { hero } = await getDictionary()

  return (
    <section className="flex flex-col bg-ink lg:flex-row" id="inicio">
      <div className="flex flex-col items-start gap-[18px] px-gutter pt-8 pb-10 lg:w-1/2 lg:shrink-0 lg:gap-7 lg:pr-16 lg:pl-[max(var(--spacing-gutter),calc((100vw-1440px)/2+var(--spacing-gutter)))] lg:py-[110px]">
        <p className="hidden bg-wine px-3 py-[5px] font-label text-label-xs tracking-[0.2em] text-on-ink-tab lg:block">
          {hero.lot}
        </p>
        <Eyebrow className="lg:hidden" tone="dark">
          {hero.eyebrowShort}
        </Eyebrow>
        <Eyebrow className="hidden lg:block" tone="dark">
          {hero.eyebrow}
        </Eyebrow>
        <Heading as="h1" accent={hero.title.accent} breakAccent size="hero" tone="dark">
          {hero.title.text}
        </Heading>
        <p className="max-w-[500px] text-[17px] leading-[1.55] text-on-ink-muted lg:text-[19px] lg:leading-[1.6]">
          {hero.subtitle}
        </p>
        <div className="flex w-full flex-col gap-[18px] lg:w-auto lg:flex-row lg:gap-4">
          <Button className="lg:w-auto" fullWidth href="#tequilas">
            {hero.ctaPrimary}
          </Button>
          <Button className="lg:w-auto" fullWidth href="#historia" variant="ghost">
            {hero.ctaSecondary}
          </Button>
        </div>
      </div>
      <div className="relative order-first h-[420px] overflow-hidden lg:order-none lg:h-auto lg:min-h-[420px] lg:w-1/2 lg:shrink-0">
        <Image
          alt={hero.imageAlt}
          className="object-cover"
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          src="/images/bot-retrato.png"
        />
        <div className="absolute inset-y-0 left-0 hidden w-[220px] bg-linear-to-r from-ink to-transparent lg:block" />
      </div>
    </section>
  )
}
