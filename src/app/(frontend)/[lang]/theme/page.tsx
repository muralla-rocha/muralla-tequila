import React from 'react'

import { Button, type ButtonVariant } from '@/components/Button/Button'
import { Eyebrow } from '@/components/Heading/Eyebrow'
import { Heading } from '@/components/Heading/Heading'

// Showcase del theme en /theme: títulos, botones y colores.

const swatches: { group: string; items: [string, string][] }[] = [
  {
    group: 'Marca',
    items: [
      ['gold', 'bg-gold'],
      ['bronze', 'bg-bronze'],
      ['wine', 'bg-wine'],
    ],
  },
  {
    group: 'Oscuros',
    items: [
      ['ink', 'bg-ink'],
      ['ink-deep', 'bg-ink-deep'],
      ['ink-raised', 'bg-ink-raised'],
    ],
  },
  {
    group: 'Claros',
    items: [
      ['cream', 'bg-cream'],
      ['cream-sand', 'bg-cream-sand'],
      ['cream-light', 'bg-cream-light'],
    ],
  },
  {
    group: 'Texto',
    items: [
      ['on-ink', 'bg-on-ink'],
      ['on-ink-muted', 'bg-on-ink-muted'],
      ['on-ink-faint', 'bg-on-ink-faint'],
      ['on-cream', 'bg-on-cream'],
      ['on-cream-body', 'bg-on-cream-body'],
      ['on-cream-muted', 'bg-on-cream-muted'],
    ],
  },
]

const buttons: { variant: ButtonVariant; label: string; dark: boolean }[] = [
  { dark: true, label: 'CONOCE NUESTROS TEQUILAS', variant: 'primary' },
  { dark: true, label: 'ÚNETE', variant: 'outline' },
  { dark: true, label: 'NUESTRA HISTORIA', variant: 'ghost' },
  { dark: false, label: 'VISITA EL RESTAURANTE', variant: 'dark' },
  { dark: false, label: 'CONOCE EL PROCESO COMPLETO', variant: 'outlineDark' },
]

function Label({ children, tone }: { children: React.ReactNode; tone: 'dark' | 'light' }) {
  return (
    <p
      className={`mb-6 font-label text-label-xs tracking-label ${tone === 'dark' ? 'text-on-ink-faint' : 'text-on-cream-muted'}`}
    >
      {children}
    </p>
  )
}

export default function ThemePage() {
  return (
    <>
      <section className="bg-ink px-gutter py-section">
        <Label tone="dark">TÍTULOS · FONDO OSCURO</Label>
        <Heading as="h1" breakAccent accent="San José de Gracia" size="hero" tone="dark">
          Orgullo de
        </Heading>
        <Eyebrow className="mt-12" tone="dark">
          COMUNIDAD MURALLA
        </Eyebrow>
        <Heading accent="mesa de la hacienda" className="mt-4" tone="dark">
          Únete a la
        </Heading>
        <Heading
          accent="tierra roja"
          accentFirst={false}
          className="mt-12"
          size="banner"
          tone="dark"
        >
          La
        </Heading>
        <Heading as="h3" className="mt-12" size="card" tone="dark">
          Muralla Blanco
        </Heading>
      </section>

      <section className="bg-cream px-gutter py-section">
        <Label tone="light">TÍTULOS · FONDO CLARO</Label>
        <Eyebrow>NUESTRA HISTORIA</Eyebrow>
        <Heading accent="con el tiempo" className="mt-4">
          Un orgullo que se cultiva
        </Heading>
        <Heading accent="Una misma esencia." className="mt-12">
          Dos expresiones.
        </Heading>
        <Heading accent="la casa" accentFirst={false} className="mt-12">
          Recetas de
        </Heading>
        <Heading as="h3" className="mt-12" size="card" tone="light">
          Muralla Reposado
        </Heading>
        <Heading as="h3" className="mt-8" size="item" tone="light">
          Paloma de la Hacienda
        </Heading>
      </section>

      <section className="bg-ink px-gutter py-section">
        <Label tone="dark">BOTONES · FONDO OSCURO</Label>
        <div className="flex flex-wrap gap-4">
          {buttons
            .filter((b) => b.dark)
            .map((b) => (
              <Button key={b.variant} variant={b.variant}>
                {b.label}
              </Button>
            ))}
        </div>
      </section>

      <section className="bg-cream px-gutter py-section">
        <Label tone="light">BOTONES · FONDO CLARO</Label>
        <div className="flex flex-wrap gap-4">
          {buttons
            .filter((b) => !b.dark)
            .map((b) => (
              <Button key={b.variant} variant={b.variant}>
                {b.label}
              </Button>
            ))}
        </div>
      </section>

      <section className="bg-cream-sand px-gutter py-section">
        <Label tone="light">COLORES</Label>
        <div className="grid gap-8">
          {swatches.map(({ group, items }) => (
            <div key={group}>
              <p className="mb-3 font-label text-label-sm tracking-label text-on-cream">
                {group.toUpperCase()}
              </p>
              <div className="flex flex-wrap gap-4">
                {items.map(([name, cls]) => (
                  <div key={name} className="w-32">
                    <div className={`h-16 border border-line-cream ${cls}`} />
                    <p className="mt-2 text-body-sm text-on-cream-muted">{name}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
