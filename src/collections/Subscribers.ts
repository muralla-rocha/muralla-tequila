import type { CollectionConfig } from 'payload'

export const MINIMUM_AGE = 18

/** Años cumplidos a `now` para una fecha de nacimiento ISO (YYYY-MM-DD o ISO completa). */
export function ageFrom(birthdate: string | Date, now = new Date()): number {
  const birth = new Date(birthdate)
  let age = now.getUTCFullYear() - birth.getUTCFullYear()
  const beforeBirthday =
    now.getUTCMonth() < birth.getUTCMonth() ||
    (now.getUTCMonth() === birth.getUTCMonth() && now.getUTCDate() < birth.getUTCDate())
  if (beforeBirthday) age -= 1
  return age
}

// Solo el equipo (usuarios del admin) puede ver o modificar suscriptores.
// El formulario público crea registros desde una server action con el Local API.
const adminOnly = ({ req }: { req: { user?: unknown } }) => Boolean(req.user)

export const Subscribers: CollectionConfig = {
  slug: 'subscribers',
  labels: { plural: 'Comunidad Muralla', singular: 'Suscriptor' },
  admin: {
    defaultColumns: ['email', 'name', 'region', 'marketingOptIn', 'locale', 'createdAt'],
    useAsTitle: 'email',
  },
  access: {
    create: adminOnly,
    delete: adminOnly,
    read: adminOnly,
    update: adminOnly,
  },
  fields: [
    { name: 'name', type: 'text', label: 'Nombre completo', required: true },
    {
      name: 'email',
      type: 'email',
      index: true,
      label: 'Correo electrónico',
      required: true,
      unique: true,
    },
    {
      name: 'birthdate',
      type: 'date',
      admin: { date: { pickerAppearance: 'dayOnly' } },
      label: 'Fecha de nacimiento',
      required: true,
      validate: (value: Date | null | undefined) => {
        if (!value) return 'La fecha de nacimiento es obligatoria.'
        return ageFrom(value) >= MINIMUM_AGE || `Debe ser mayor de ${MINIMUM_AGE} años.`
      },
    },
    { name: 'region', type: 'text', label: 'Estado o país' },
    {
      name: 'marketingOptIn',
      type: 'checkbox',
      defaultValue: false,
      label: 'Acepta recibir novedades y promociones',
    },
    {
      name: 'privacyAcceptedAt',
      type: 'date',
      admin: { date: { pickerAppearance: 'dayAndTime' }, readOnly: true },
      label: 'Aviso de privacidad aceptado el',
    },
    {
      name: 'locale',
      type: 'select',
      admin: { readOnly: true },
      label: 'Idioma del sitio',
      options: [
        { label: 'Español', value: 'es' },
        { label: 'English', value: 'en' },
      ],
    },
  ],
}
