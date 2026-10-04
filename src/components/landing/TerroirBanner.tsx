import Image from 'next/image'
import React from 'react'

import { Container } from '@/components/Container/Container'
import { Eyebrow } from '@/components/Heading/Eyebrow'
import { Heading } from '@/components/Heading/Heading'
import { getDictionary } from '@/i18n/dictionaries'

export async function TerroirBanner() {
  const { terroir } = await getDictionary()

  return (
    <section className="relative h-[420px] overflow-hidden bg-ink lg:h-[560px]">
      <Image
        alt={terroir.imageAlt}
        className="object-cover"
        fill
        sizes="100vw"
        src="/images/penca-tierra.png"
      />
      <div className="absolute inset-0 bg-ink/60 lg:bg-transparent lg:bg-linear-to-r lg:from-veil-start lg:to-veil-end lg:to-70%" />
      <Container className="absolute inset-y-0 left-1/2 flex -translate-x-1/2 flex-col items-start justify-center gap-[14px] lg:gap-5">
        <Eyebrow className="lg:hidden" tone="dark">
          {terroir.eyebrowShort}
        </Eyebrow>
        <Eyebrow className="hidden lg:block" tone="dark">
          {terroir.eyebrow}
        </Eyebrow>
        <Heading
          accent={terroir.title.accent}
          after={terroir.title.after}
          className="max-w-[640px]"
          size="banner"
          tone="dark"
        >
          {terroir.title.text}
        </Heading>
        <p className="hidden max-w-[520px] text-body leading-[1.6] text-on-ink-soft lg:block">
          {terroir.text}
        </p>
      </Container>
    </section>
  )
}
