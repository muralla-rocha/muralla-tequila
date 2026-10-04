import Image from 'next/image'
import React from 'react'

import { Button } from '@/components/Button/Button'
import { Container } from '@/components/Container/Container'
import { Eyebrow } from '@/components/Heading/Eyebrow'
import { Heading } from '@/components/Heading/Heading'
import { getDictionary } from '@/i18n/dictionaries'

import { SnapSlider } from './SnapSlider'

const recipeImages = ['/images/paloma.png', '/images/tierra-roja.png', '/images/antigua.png']

export async function Recipes() {
  const { recipes } = await getDictionary()

  return (
    <section className="scroll-mt-24 bg-cream py-section" id="copa">
      <Container className="flex flex-col items-start gap-5 lg:gap-12">
        <div className="flex w-full flex-col justify-between gap-3 lg:flex-row lg:items-end lg:gap-4">
          <div className="flex flex-col gap-3">
            <Eyebrow className="lg:hidden">{recipes.eyebrow}</Eyebrow>
            <Heading accent={recipes.title.accent}>{recipes.title.text}</Heading>
          </div>
          <p className="hidden max-w-[420px] text-[17px] leading-[1.6] text-on-cream-muted lg:block">
            {recipes.intro}
          </p>
        </div>

        {/* Móvil: carrusel horizontal que sangra hasta el borde. Desktop: 3 columnas. */}
        <SnapSlider
          className="-mx-gutter flex snap-x snap-mandatory scroll-pl-gutter gap-4 self-stretch overflow-x-auto px-gutter [scrollbar-width:none] lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden"
          labels={recipes.items.map((recipe) => recipe.name)}
        >
          {recipes.items.map((recipe, i) => (
            <li
              className="flex w-[260px] shrink-0 snap-start flex-col gap-[10px] lg:w-auto lg:gap-[14px]"
              key={recipe.name}
            >
              <div className="relative h-[320px] w-full lg:h-[440px]">
                <Image
                  alt={recipe.name}
                  className="object-cover"
                  fill
                  sizes="(min-width: 1024px) 33vw, 260px"
                  src={recipeImages[i]}
                />
              </div>
              <Heading as="h3" size="item" tone="light">
                {recipe.name}
              </Heading>
              <a
                className="font-label text-[11px] tracking-[0.16em] text-bronze lg:hidden"
                href="#"
              >
                {recipes.viewRecipe}
              </a>
              <p className="hidden text-[15px] leading-normal text-on-cream-muted lg:block">
                {recipe.ingredients}
              </p>
            </li>
          ))}
        </SnapSlider>

        <Button className="hidden lg:inline-flex" href="#" variant="dark">
          {recipes.cta}
        </Button>
      </Container>
    </section>
  )
}
