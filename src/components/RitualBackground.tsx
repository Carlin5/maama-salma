import { useEffect, useRef } from 'react'

/**
 * Multi-layer ritual background:
 *  - Animated canvas of drifting embers/spark particles (2D)
 *  - Layered radial gradients (CSS in body)
 *  - SVG sigils rotating slowly (3D-ish parallax)
 *  - Mouse-tracked parallax aura (4D = interactive over time)
 */
export default function RitualBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const auraRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let raf = 0
    let w = (canvas.width = window.innerWidth * devicePixelRatio)
    let h = (canvas.height = window.innerHeight * devicePixelRatio)

    type P = { x: number; y: number; vx: number; vy: number; r: number; life: number; hue: number }
    const particles: P[] = []
    const COUNT = Math.min(120, Math.floor((window.innerWidth * window.innerHeight) / 18000))

    function spawn(p?: P) {
      const np: P = p ?? ({} as P)
      np.x = Math.random() * w
      np.y = h + Math.random() * 80
      np.vx = (Math.random() - 0.5) * 0.6
      np.vy = -0.4 - Math.random() * 1.2
      np.r = 0.6 + Math.random() * 2.4
      np.life = 0
      np.hue = 18 + Math.random() * 30 // ember orange to pinkish
      return np
    }

    for (let i = 0; i < COUNT; i++) particles.push(spawn())

    function resize() {
      w = canvas!.width = window.innerWidth * devicePixelRatio
      h = canvas!.height = window.innerHeight * devicePixelRatio
    }
    window.addEventListener('resize', resize)

    function tick() {
      ctx.clearRect(0, 0, w, h)
      for (const p of particles) {
        p.x += p.vx * devicePixelRatio
        p.y += p.vy * devicePixelRatio
        p.life += 1
        if (p.y < -20 || p.life > 600) spawn(p)
        const alpha = Math.min(1, p.life / 60) * Math.max(0, 1 - p.life / 600)
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 8)
        grad.addColorStop(0, `hsla(${p.hue}, 100%, 70%, ${0.9 * alpha})`)
        grad.addColorStop(0.4, `hsla(${p.hue}, 100%, 55%, ${0.35 * alpha})`)
        grad.addColorStop(1, `hsla(${p.hue}, 90%, 40%, 0)`)
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r * 8, 0, Math.PI * 2)
        ctx.fill()
      }
      raf = requestAnimationFrame(tick)
    }
    tick()

    function onMouse(e: MouseEvent) {
      if (!auraRef.current) return
      const x = (e.clientX / window.innerWidth - 0.5) * 40
      const y = (e.clientY / window.innerHeight - 0.5) * 40
      auraRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`
    }
    window.addEventListener('mousemove', onMouse)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouse)
    }
  }, [])

  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-0">
        {/* Parallax aura */}
        <div
          ref={auraRef}
          className="absolute inset-0 transition-transform duration-700 ease-out"
          style={{
            background:
              'radial-gradient(700px 500px at 30% 20%, rgba(255,77,109,0.18), transparent 60%), radial-gradient(700px 500px at 80% 80%, rgba(122,61,245,0.22), transparent 65%)',
          }}
        />
        {/* Rotating sigils */}
        <svg
          className="absolute left-[-20%] top-[8%] h-[60vh] w-[60vh] opacity-25 animate-spin-slow sigil-glow"
          viewBox="0 0 200 200"
          fill="none"
        >
          <circle cx="100" cy="100" r="92" stroke="#f4d27a" strokeWidth="0.6" />
          <circle cx="100" cy="100" r="78" stroke="#f4d27a" strokeWidth="0.4" strokeDasharray="2 6" />
          <polygon
            points="100,18 173,140 27,140"
            stroke="#ff7aa8"
            strokeWidth="0.6"
            fill="none"
          />
          <polygon
            points="100,182 27,60 173,60"
            stroke="#7a3df5"
            strokeWidth="0.6"
            fill="none"
          />
          <circle cx="100" cy="100" r="40" stroke="#f4d27a" strokeWidth="0.4" />
          <text
            x="100"
            y="14"
            fontSize="6"
            fill="#f4d27a"
            textAnchor="middle"
            opacity="0.7"
          >
            ✦ AMOR ✦ LUX ✦ IGNIS ✦
          </text>
        </svg>
        <svg
          className="absolute right-[-15%] bottom-[5%] h-[55vh] w-[55vh] opacity-20 animate-spin-reverse sigil-glow"
          viewBox="0 0 200 200"
          fill="none"
        >
          <circle cx="100" cy="100" r="92" stroke="#ff9533" strokeWidth="0.6" />
          <circle
            cx="100"
            cy="100"
            r="70"
            stroke="#ff9533"
            strokeWidth="0.3"
            strokeDasharray="1 3"
          />
          <path
            d="M100 10 L120 90 L190 100 L120 110 L100 190 L80 110 L10 100 L80 90 Z"
            stroke="#ff7aa8"
            strokeWidth="0.5"
            fill="none"
          />
          <circle cx="100" cy="100" r="14" stroke="#f4d27a" strokeWidth="0.6" />
        </svg>
        {/* Canvas with embers */}
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-70" />
      </div>
    </>
  )
}
