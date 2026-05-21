import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

/**
 * Click anywhere to spawn a burst of hearts. Adds a magical/interactive feel.
 */
export default function HeartBurst() {
  const [bursts, setBursts] = useState<
    Array<{ id: number; x: number; y: number; hearts: Array<{ angle: number; hue: number; size: number; distance: number }> }>
  >([])
  const idRef = useRef(0)

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      // Avoid creating bursts when clicking on text inputs or interactive
      if (target.closest('input, textarea, select')) return
      const id = ++idRef.current
      const hearts = Array.from({ length: 14 }).map((_, i) => ({
        angle: (i / 14) * Math.PI * 2 + Math.random() * 0.4,
        hue: 340 + Math.random() * 30,
        size: 10 + Math.random() * 16,
        distance: 60 + Math.random() * 50,
      }))
      setBursts((b) => [...b, { id, x: e.clientX, y: e.clientY, hearts }])
      setTimeout(() => {
        setBursts((b) => b.filter((x) => x.id !== id))
      }, 900)
    }
    window.addEventListener('click', onClick)
    return () => window.removeEventListener('click', onClick)
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-[60]">
      <AnimatePresence>
        {bursts.map((b) => (
          <div key={b.id} style={{ position: 'absolute', left: b.x, top: b.y }}>
            {b.hearts.map((h, i) => {
              const dx = Math.cos(h.angle) * h.distance
              const dy = Math.sin(h.angle) * h.distance
              return (
                <motion.svg
                  key={i}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 0.4, rotate: 0 }}
                  animate={{
                    x: dx,
                    y: dy - 20,
                    opacity: 0,
                    scale: 1.1,
                    rotate: (Math.random() - 0.5) * 120,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.85, ease: 'easeOut' }}
                  width={h.size}
                  height={h.size}
                  viewBox="0 0 24 24"
                  style={{
                    position: 'absolute',
                    left: -h.size / 2,
                    top: -h.size / 2,
                    color: `hsl(${h.hue} 90% 65%)`,
                    filter: 'drop-shadow(0 0 6px currentColor)',
                  }}
                >
                  <path
                    d="M12 21s-7-4.6-7-10.3A4.3 4.3 0 0 1 12 7a4.3 4.3 0 0 1 7 3.7C19 16.4 12 21 12 21Z"
                    fill="currentColor"
                  />
                </motion.svg>
              )
            })}
          </div>
        ))}
      </AnimatePresence>
    </div>
  )
}
