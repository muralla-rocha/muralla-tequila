import Image from 'next/image'
import React from 'react'

import { Container } from '@/components/Container/Container'
import { Eyebrow } from '@/components/Heading/Eyebrow'
import { Heading } from '@/components/Heading/Heading'
import { getDictionary, getLocale } from '@/i18n/dictionaries'

import { CommunityForm } from './CommunityForm'

export async function Community() {
  const { community } = await getDictionary()
  const locale = await getLocale()

  return (
    <section className="scroll-mt-24 bg-ink py-section" id="contacto">
      <Container className="flex flex-col gap-[18px] lg:flex-row lg:gap-20">
        <div className="flex min-w-0 flex-1 flex-col items-start gap-[18px] lg:gap-6">
          <Eyebrow tone="dark">{community.eyebrow}</Eyebrow>
          <Heading accent={community.title.accent} className="max-w-[540px]" tone="dark">
            {community.title.text}
          </Heading>
          <p className="max-w-[500px] text-[15px] leading-[1.55] text-on-ink-muted lg:hidden">
            {community.textShort}
          </p>
          <p className="hidden max-w-[500px] text-[17px] leading-[1.65] text-on-ink-muted lg:block">
            {community.text}
          </p>
          <div className="relative mt-2 hidden h-[300px] w-full max-w-[540px] lg:block">
            <Image
              alt={community.imageAlt}
              className="object-cover"
              fill
              sizes="540px"
              src="/images/bot-jardin.png"
            />
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <CommunityForm copy={community.form} locale={locale} />
        </div>
      </Container>
    </section>
  )
}
