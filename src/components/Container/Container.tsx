import React from 'react'

type ContainerProps = React.ComponentPropsWithoutRef<'div'> & {
  /** Usa el margen lateral reducido de la nav (64px en desktop, 20px en móvil). */
  nav?: boolean
}

/** Centra el contenido a 1440px máx. con el margen lateral del diseño. */
export function Container({ className, nav, ...props }: ContainerProps) {
  const classes = ['mx-auto w-full max-w-[1440px]', nav ? 'px-gutter-nav' : 'px-gutter', className]
    .filter(Boolean)
    .join(' ')

  return <div className={classes} {...props} />
}
