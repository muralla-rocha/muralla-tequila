import React from 'react'

import { getDictionary } from '@/i18n/dictionaries'

import { AgeGateDialog } from './AgeGateDialog'
import { LanguageSwitch } from './Nav'

/** Pop-up de verificación de edad. Se muestra encima de todo el sitio hasta confirmar. */
export async function AgeGate() {
  const { ageGate, footer, nav } = await getDictionary()

  return (
    <AgeGateDialog
      copy={{ ...ageGate, logoAlt: nav.logoAlt, responsible: footer.responsible }}
      languageSwitch={<LanguageSwitch className="tracking-label" tone="light" />}
    />
  )
}
