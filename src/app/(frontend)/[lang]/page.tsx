import React from 'react'

import { Community } from '@/components/landing/Community'
import { Footer } from '@/components/landing/Footer'
import { Hero } from '@/components/landing/Hero'
import { Nav } from '@/components/landing/Nav'
import { Process } from '@/components/landing/Process'
import { Recipes } from '@/components/landing/Recipes'
import { Ribbon } from '@/components/landing/Ribbon'
import { Story } from '@/components/landing/Story'
import { Tequilas } from '@/components/landing/Tequilas'
import { TerroirBanner } from '@/components/landing/TerroirBanner'

export default function HomePage() {
  return (
    <>
      <Nav />
      <Hero />
      <Ribbon />
      <Story />
      <Tequilas />
      <Process />
      <TerroirBanner />
      <Recipes />
      <Community />
      <Footer />
    </>
  )
}
