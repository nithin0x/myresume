'use client'

import { useEffect, useRef } from 'react'

export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()

    const chars = '01アイウエオカキクケコサタチツテトナニヌ{}[]<>/\\|@#$%^&*ABCDEFabcdef'
    const fontSize = 13
    const getColumns = () => Math.floor(canvas.width / fontSize)
    let columns = getColumns()
    let drops: number[] = Array.from({ length: columns }, () => Math.random() * -50)

    const draw = () => {
      ctx.fillStyle = 'rgba(5, 5, 8, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < drops.length; i++) {
        const isHead = Math.random() > 0.92
        const alpha = isHead ? 1 : Math.random() * 0.4 + 0.1
        ctx.fillStyle = isHead
          ? `rgba(200, 255, 210, ${alpha})`
          : `rgba(0, 255, 65, ${alpha})`
        ctx.font = `${fontSize}px 'Courier New', monospace`
        const char = chars[Math.floor(Math.random() * chars.length)]
        ctx.fillText(char, i * fontSize, drops[i] * fontSize)

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i] += 0.5
      }
    }

    const interval = setInterval(draw, 45)

    const handleResize = () => {
      resize()
      columns = getColumns()
      drops = Array.from({ length: columns }, () => Math.random() * -50)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      clearInterval(interval)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.18 }}
    />
  )
}
