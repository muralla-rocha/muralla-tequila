import Image from 'next/image'
import React from 'react'

import { Button } from '@/components/Button/Button'
import { Container } from '@/components/Container/Container'
import { Eyebrow } from '@/components/Heading/Eyebrow'
import { Heading } from '@/components/Heading/Heading'
import { getDictionary } from '@/i18n/dictionaries'

// Datos no traducibles de cada tequila; los textos vienen del diccionario (mismo orden).
const tequilaMeta = [
  { button: 'primary', image: '/images/blanco-solo.png', stripe: 'bg-stripe-blanco', tone: 'dark' },
  { button: 'dark', image: '/images/repo-solo.png', stripe: 'bg-stripe-reposado', tone: 'light' },
] as const

// TODO: confirmar % alc. vol. y NOM reales (placeholders del diseño, en el diccionario).

const card = {
  dark: {
    chip: 'border-line-chip text-on-ink',
    description: 'text-on-ink-soft',
    root: 'bg-ink',
    specs: 'text-on-ink-faint',
    type: 'text-gold',
  },
  light: {
    chip: 'border-on-cream/50 text-on-cream-body',
    description: 'text-on-cream-body',
    root: 'border border-line-cream bg-cream-light',
    specs: 'text-on-cream-muted',
    type: 'text-bronze',
  },
}

export async function Tequilas() {
  const { tequilas } = await getDictionary()

  return (
    <section className="scroll-mt-24 bg-cream-sand py-section" id="tequilas">
      <Container className="flex flex-col items-start gap-6 lg:items-center lg:gap-14">
        <div className="flex flex-col items-start gap-6 lg:items-center lg:gap-4 lg:text-center">
          <Eyebrow>{tequilas.eyebrow}</Eyebrow>
          <Heading accent={tequilas.title.accent}>{tequilas.title.text}</Heading>
          <p className="hidden text-body text-on-cream-muted lg:block">{tequilas.subtitle}</p>
        </div>

        <div className="grid w-full grid-cols-1 gap-6 lg:gap-8 xl:grid-cols-2">
          {tequilas.items.map((t, i) => {
            const meta = tequilaMeta[i]
            const short = tequilas.short[i]
            const s = card[meta.tone]
            return (
              <article className={`flex flex-col lg:flex-row ${s.root}`} key={t.name}>
                <div className="relative h-[300px] shrink-0 lg:h-auto lg:min-h-[520px] lg:w-[230px]">
                  <Image
                    alt={t.name}
                    className="object-cover"
                    fill
                    sizes="(min-width: 1024px) 230px, 100vw"
                    src={meta.image}
                  />
                </div>
                <div className="flex flex-1 flex-col items-start gap-3 px-[22px] py-6 lg:gap-4 lg:px-8 lg:pt-10 lg:pb-9">
                  <p className={`font-label text-[10px] tracking-[0.18em] lg:hidden ${s.type}`}>
                    {short.type}
                  </p>
                  <p
                    className={`hidden font-label text-label-sm tracking-[0.22em] lg:block ${s.type}`}
                  >
                    {t.type}
                  </p>
                  <Heading as="h3" size="card" tone={meta.tone}>
                    {t.name}
                  </Heading>
                  <p className={`text-[15px] leading-[1.55] lg:hidden ${s.description}`}>
                    {short.description}
                  </p>
                  <p className={`hidden text-[16px] leading-[1.6] lg:block ${s.description}`}>
                    {t.description}
                  </p>
                  <ul className="hidden flex-wrap gap-2 lg:flex">
                    {t.notes.map((note) => (
                      <li className={`border px-[10px] py-[5px] text-[13px] ${s.chip}`} key={note}>
                        {note}
                      </li>
                    ))}
                  </ul>
                  <Button className="lg:hidden" fullWidth href="#" variant={meta.button}>
                    {tequilas.notesCta}
                  </Button>
                  <div className="hidden flex-1 lg:block" />
                  <p
                    className={`hidden gap-5 pt-6 font-label text-label-xs tracking-[0.16em] whitespace-nowrap lg:flex ${s.specs}`}
                  >
                    {tequilas.specs.map((spec) => (
                      <span key={spec}>{spec}</span>
                    ))}
                  </p>
                </div>
                <div className={`h-[6px] w-full lg:hidden ${meta.stripe}`} />
              </article>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
