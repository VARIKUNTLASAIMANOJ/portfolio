"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  update: (canvasWidth: number, canvasHeight: number) => void
  draw: (ctx: CanvasRenderingContext2D) => void
}

const InteractiveBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameIdRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      const canvas = canvasRef.current
      if (!canvas) return

      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()

    class ParticleClass implements Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number

      constructor(canvasWidth: number, canvasHeight: number) {
        this.x = Math.random() * canvasWidth
        this.y = Math.random() * canvasHeight
        this.size = Math.random() * 5 + 1
        this.speedX = Math.random() * 3 - 1.5
        this.speedY = Math.random() * 3 - 1.5
      }

      update(canvasWidth: number, canvasHeight: number) {
        this.x += this.speedX
        if (this.x > canvasWidth) this.x = 0
        if (this.x < 0) this.x = canvasWidth

        this.y += this.speedY
        if (this.y > canvasHeight) this.y = 0
        if (this.y < 0) this.y = canvasHeight

        if (this.size > 0.2) this.size -= 0.1
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)"
        ctx.strokeStyle = "rgba(255, 255, 255, 0.8)"
        ctx.lineWidth = 2

        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.closePath()
        ctx.fill()
      }
    }

    const particles: Particle[] = []
    const particleCount = 50

    const init = () => {
      const canvas = canvasRef.current
      if (!canvas) return

      particles.length = 0
      for (let i = 0; i < particleCount; i++) {
        particles.push(new ParticleClass(canvas.width, canvas.height))
      }
    }

    const animate = () => {
      const canvas = canvasRef.current
      if (!canvas || !ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle, i) => {
        particle.update(canvas.width, canvas.height)
        particle.draw(ctx)

        for (let j = i; j < particles.length; j++) {
          const dx = particle.x - particles[j].x
          const dy = particle.y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / 100})`
            ctx.lineWidth = 1
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
            ctx.closePath()
          }
        }

        if (particle.size <= 0.2) {
          particles[i] = new ParticleClass(canvas.width, canvas.height)
        }
      })

      animationFrameIdRef.current = requestAnimationFrame(animate)
    }

    let throttleTimer: NodeJS.Timeout | null = null
    const handleMouseMove = () => {
      if (throttleTimer === null) {
        throttleTimer = setTimeout(() => {
          const canvas = canvasRef.current
          if (!canvas) return

          if (particles.length < 100) {
            // Limit max particles
            particles.push(new ParticleClass(canvas.width, canvas.height))
          }
          throttleTimer = null
        }, 50)
      }
    }

    window.addEventListener("resize", resizeCanvas)
    window.addEventListener("mousemove", handleMouseMove)

    init()
    animate()

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current)
      }
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-0" aria-hidden="true" />
  )
}

export default InteractiveBackground

