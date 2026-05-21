import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import type { ReactNode } from 'react'
import { useRef } from 'react'

/**
 * Mouse-tracked 3D tilt card with a subtle inner shine.
 */
export default function TiltCard({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0.5)
  const y = useMotionValue(0.5)
  const sx = useSpring(x, { stiffness: 200, damping: 20 })
  const sy = useSpring(y, { stiffness: 200, damping: 20 })

  const rotateY = useTransform(sx, [0, 1], [-8, 8])
  const rotateX = useTransform(sy, [0, 1], [8, -8])
  const shineX = useTransform(sx, [0, 1], ['0%', '100%'])

  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => {
        const rect = ref.current!.getBoundingClientRect()
        x.set((e.clientX - rect.left) / rect.width)
        y.set((e.clientY - rect.top) / rect.height)
      }}
      onMouseLeave={() => {
        x.set(0.5)
        y.set(0.5)
      }}
      style={{ rotateY, rotateX, transformStyle: 'preserve-3d' }}
      className={`relative overflow-hidden rounded-3xl ${className}`}
    >
      {children}
      <motion.div
        aria-hidden
        style={{
          backgroundPositionX: shineX,
          backgroundImage:
            'linear-gradient(105deg, transparent 30%, rgba(255,220,160,0.18) 50%, transparent 70%)',
          backgroundSize: '200% 100%',
        }}
        className="pointer-events-none absolute inset-0"
      />
    </motion.div>
  )
}
