'use client'

import React from 'react'

/**
 * Lista con scroll horizontal y puntos indicadores (solo móvil).
 * Los hijos son los slides; en desktop los estilos de `className` la vuelven cuadrícula
 * y los puntos se ocultan.
 */
export function SnapSlider({
  children,
  className,
  labels,
}: {
  children: React.ReactNode
  className: string
  /** aria-label de cada punto, en el mismo orden que los slides. */
  labels: string[]
}) {
  const listRef = React.useRef<HTMLOListElement>(null)
  const [active, setActive] = React.useState(0)

  const update = React.useCallback(() => {
    const list = listRef.current
    if (!list) return
    const slides = Array.from(list.children) as HTMLElement[]
    if (list.scrollLeft + list.clientWidth >= list.scrollWidth - 2) {
      setActive(slides.length - 1)
      return
    }
    const start = list.scrollLeft + parseFloat(getComputedStyle(list).paddingLeft)
    let closest = 0
    slides.forEach((slide, i) => {
      if (Math.abs(slide.offsetLeft - start) < Math.abs(slides[closest].offsetLeft - start)) {
        closest = i
      }
    })
    setActive(closest)
  }, [])

  const goTo = (index: number) => {
    const list = listRef.current
    const slide = list?.children[index] as HTMLElement | undefined
    if (!list || !slide) return
    const padding = parseFloat(getComputedStyle(list).paddingLeft)
    list.scrollTo({ behavior: 'smooth', left: slide.offsetLeft - padding })
  }

  return (
    <>
      <ol className={`relative ${className}`} onScroll={update} ref={listRef}>
        {children}
      </ol>
      <div className="flex gap-2 lg:hidden">
        {labels.map((label, i) => (
          <button
            aria-current={i === active}
            aria-label={label}
            className={`size-2 cursor-pointer rounded-full bg-bronze transition-opacity ${i === active ? 'opacity-100' : 'opacity-35'}`}
            key={label}
            onClick={() => goTo(i)}
            type="button"
          />
        ))}
      </div>
    </>
  )
}
