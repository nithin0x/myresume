'use client'

import { useEffect, useRef } from 'react'

const CHARS = '01アイウエオカキクケコサタチツテトナニヌ{}[]<>/\\|@#$%^&*ABCDEFabcdef'
const FONT_SIZE = 13
const FRAME_MS = 50

export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    let columns = 0
    let drops: number[] = []

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      columns = Math.floor(window.innerWidth / FONT_SIZE)
      drops = Array.from({ length: columns }, () => Math.random() * -60)
      ctx.font = `${FONT_SIZE}px monospace`
    }
    resize()

    const draw = () => {
      ctx.fillStyle = 'rgba(3, 3, 6, 0.06)'
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)

      for (let i = 0; i < drops.length; i++) {
        const isHead = Math.random() > 0.92
        const alpha = isHead ? 0.9 : Math.random() * 0.35 + 0.08
        ctx.fillStyle = isHead
          ? `rgba(190, 255, 205, ${alpha})`
          : `rgba(0, 255, 65, ${alpha})`
        const char = CHARS[Math.floor(Math.random() * CHARS.length)]
        ctx.fillText(char, i * FONT_SIZE, drops[i] * FONT_SIZE)

        if (drops[i] * FONT_SIZE > window.innerHeight && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i] += 0.5
      }
    }

    let rafId = 0
    let last = 0
    let animating = false

    const loop = (t: number) => {
      // Guard at the very top so a stale frame never re-schedules itself.
      if (!animating) return
      if (t - last >= FRAME_MS) {
        last = t
        draw()
      }
      rafId = requestAnimationFrame(loop)
    }

    const start = () => {
      if (animating) return
      animating = true
      rafId = requestAnimationFrame(loop)
    }

    const stop = () => {
      animating = false
      cancelAnimationFrame(rafId)
    }

    // Whether the animation should run given both motion pref and tab visibility.
    const sync = () => {
      const shouldRun =
        !motionQuery.matches && document.visibilityState === 'visible'
      if (shouldRun) {
        start()
      } else {
        stop()
        if (motionQuery.matches) {
          // Reduced motion: paint one static frame instead of animating.
          for (let f = 0; f < 40; f++) draw()
        }
      }
    }

    sync()

    document.addEventListener('visibilitychange', sync)
    motionQuery.addEventListener('change', sync)
    window.addEventListener('resize', resize)

    return () => {
      stop()
      document.removeEventListener('visibilitychange', sync)
      motionQuery.removeEventListener('change', sync)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.16 }}
    />
  )
}
