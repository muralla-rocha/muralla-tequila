import { Libre_Caslon_Text, Marcellus_SC, Pirata_One, Rye } from 'next/font/google'
import { lang } from 'next/root-params'
import React from 'react'

import { AgeGate } from '@/components/landing/AgeGate'
import { locales } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import './theme.css'

const marcellusSC = Marcellus_SC({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-marcellus-sc',
  weight: '400',
})

const libreCaslon = Libre_Caslon_Text({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-libre-caslon',
  weight: '400',
})

const pirataOne = Pirata_One({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-pirata-one',
  weight: '400',
})

const rye = Rye({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-rye',
  weight: '400',
})

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export async function generateMetadata() {
  const { meta } = await getDictionary()
  return { description: meta.description, title: meta.title }
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html
      className={`${marcellusSC.variable} ${libreCaslon.variable} ${pirataOne.variable} ${rye.variable}`}
      lang={await lang()}
      suppressHydrationWarning
    >
      <head>
        {/* Marca <html> antes del primer render si la edad ya se verificó, para no mostrar el pop-up. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{/(?:^|; )age_verified=1/.test(document.cookie)&&(document.documentElement.dataset.ageVerified='1')}catch(e){}",
          }}
        />
      </head>
      <body>
        <AgeGate />
        <main>{children}</main>
      </body>
    </html>
  )
}
