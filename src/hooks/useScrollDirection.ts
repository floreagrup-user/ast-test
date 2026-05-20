import { useState, useEffect } from 'react'

export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up')
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    let lastScrollY = window.scrollY
    let ticking = false

    const updateScrollDirection = () => {
      const currentScrollY = window.scrollY
      const direction = currentScrollY > lastScrollY ? 'down' : 'up'
      if (direction !== scrollDirection) {
        setScrollDirection(direction)
      }
      setScrollY(currentScrollY)
      lastScrollY = currentScrollY > 0 ? currentScrollY : 0
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDirection)
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [scrollDirection])

  return { scrollDirection, scrollY }
}
