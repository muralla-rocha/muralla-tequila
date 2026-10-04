import Image from 'next/image'
import React from 'react'

import { Container } from '@/components/Container/Container'
import { Eyebrow } from '@/components/Heading/Eyebrow'
import { Heading } from '@/components/Heading/Heading'
import { getDictionary } from '@/i18n/dictionaries'

const paragraph = 'max-w-[600px] text-[16px] leading-[1.65] text-on-cream-body lg:text-body'

export async function Story() {
  const { story } = await getDictionary()

  return (
    <section className="scroll-mt-24 bg-cream py-section" id="historia">
      {/* Móvil: eyebrow+título → foto → texto. Desktop: foto a la izquierda, texto a la derecha. */}
      <Container className="grid grid-cols-1 gap-5 lg:grid-cols-[520px_1fr] lg:content-center lg:gap-x-24 lg:gap-y-6">
        <div className="flex flex-col items-start gap-5 lg:col-start-2 lg:row-start-1 lg:gap-6 lg:self-end">
          <Eyebrow>{story.eyebrow}</Eyebrow>
          <Heading accent={story.title.accent} className="max-w-[620px]">
            {story.title.text}
          </Heading>
        </div>

        <figure className="flex w-full flex-col gap-3 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:max-w-[520px] lg:self-center">
          <div className="relative aspect-[342/400] w-full lg:aspect-[520/660]">
            <Image
              alt={story.imageAlt}
              className="object-cover"
              fill
              sizes="(min-width: 1024px) 520px, 100vw"
              src="/images/atardecer.png"
            />
          </div>
          <figcaption className="hidden font-label text-label-xs tracking-[0.18em] text-on-cream-muted lg:block">
            {story.caption}
          </figcaption>
        </figure>

        <div className="flex flex-col items-start gap-5 lg:col-start-2 lg:row-start-2 lg:gap-6 lg:self-start">
          {story.paragraphsMobile.map((text) => (
            <p className={`${paragraph} lg:hidden`} key={text}>
              {text}
            </p>
          ))}
          {story.paragraphs.map((text) => (
            <p className={`${paragraph} hidden lg:block`} key={text}>
              {text}
            </p>
          ))}

          <div className="flex items-center gap-[14px] lg:gap-5 lg:pt-2">
            <Image
              alt=""
              className="h-auto w-14 lg:w-[72px]"
              height={66}
              src="/images/sello-firma.svg"
              unoptimized
              width={72}
            />
            <div className="flex flex-col gap-1">
              <p className="font-display text-[24px] leading-normal text-on-cream lg:text-[28px]">
                {story.signature.name}
              </p>
              <p className="hidden font-label text-label-sm tracking-[0.2em] text-bronze lg:block">
                {story.signature.tagline}
              </p>
            </div>
          </div>

          <dl className="mt-4 hidden w-full grid-cols-3 lg:grid">
            {story.facts.map((fact) => (
              <div
                className="flex flex-col gap-1 border-t border-line-cream-divider pt-4 pr-4"
                key={fact.value}
              >
                <dt className="text-[32px] leading-normal text-on-cream">{fact.value}</dt>
                <dd className="text-[14px] text-on-cream-muted">{fact.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  )
}
