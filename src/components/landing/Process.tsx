import Image from 'next/image'
import React from 'react'

import { Button } from '@/components/Button/Button'
import { Container } from '@/components/Container/Container'
import { Eyebrow } from '@/components/Heading/Eyebrow'
import { Heading } from '@/components/Heading/Heading'
import { getDictionary } from '@/i18n/dictionaries'

import { SnapSlider } from './SnapSlider'

// TODO: confirmar qué etapas hace la casa y cuáles su destilería aliada (NOM).
const stepMeta = [
  { image: '/images/campo-cielo.png', numeral: 'I' },
  { image: '/images/pinas.png', numeral: 'II' },
  { image: '/images/coccion.png', numeral: 'III' },
  { image: '/images/destilacion.png', numeral: 'IV' },
]

export async function Process() {
  const { process } = await getDictionary()

  return (
    <section className="scroll-mt-24 bg-white py-section" id="agave">
      <Container className="flex flex-col items-start gap-6 lg:gap-14">
        <div className="flex flex-col gap-3 lg:gap-4">
          <Eyebrow>{process.eyebrow}</Eyebrow>
          <Heading accent={process.title.accent}>{process.title.text}</Heading>
        </div>

        {/* Móvil: carrusel horizontal que sangra hasta el borde. Desktop: cuadrícula. */}
        <SnapSlider
          className="-mx-gutter flex snap-x snap-mandatory scroll-pl-gutter gap-4 self-stretch overflow-x-auto px-gutter [scrollbar-width:none] lg:mx-0 lg:grid lg:grid-cols-2 lg:gap-6 lg:overflow-visible lg:px-0 xl:grid-cols-4 [&::-webkit-scrollbar]:hidden"
          labels={process.shortTitles}
        >
          {process.steps.map((step, i) => (
            <li
              className="flex w-[250px] shrink-0 snap-start flex-col gap-[10px] lg:w-auto lg:gap-[14px]"
              key={stepMeta[i].numeral}
            >
              <div className="relative h-[300px] w-full lg:h-[360px]">
                <Image
                  alt={step.title}
                  className="object-cover"
                  fill
                  sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 50vw, 250px"
                  src={stepMeta[i].image}
                />
              </div>
              <div className="flex items-baseline gap-[10px] lg:gap-3 lg:pt-[6px]">
                <span className="font-numeral text-[22px] text-bronze lg:text-[28px]">
                  {stepMeta[i].numeral}
                </span>
                <h3 className="text-[20px] font-normal text-on-cream lg:hidden">
                  {process.shortTitles[i]}
                </h3>
                <h3 className="hidden text-[24px] font-normal text-on-cream lg:block">
                  {step.title}
                </h3>
              </div>
              <p className="hidden text-[15px] leading-[1.55] text-on-cream-body lg:block">
                {step.text}
              </p>
            </li>
          ))}
        </SnapSlider>

        <Button className="hidden lg:inline-flex" href="#" variant="outlineDark">
          {process.cta}
        </Button>
      </Container>
    </section>
  )
}
