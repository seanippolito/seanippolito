import { useState, useEffect, useCallback, useRef } from "react"

interface ParallaxOffset {
  x: number
  y: number
}

interface UseMouseParallaxOptions {
  strength?: number
  smoothing?: number
}

export function useMouseParallax(options: UseMouseParallaxOptions = {}) {
  const { strength = 1, smoothing = 0.1 } = options
  const [offset, setOffset] = useState<ParallaxOffset>({ x: 0, y: 0 })
  const targetRef = useRef<ParallaxOffset>({ x: 0, y: 0 })
  const currentRef = useRef<ParallaxOffset>({ x: 0, y: 0 })
  const rafRef = useRef<number>(0)

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const x = ((e.clientX / window.innerWidth) * 2 - 1) * strength
      const y = ((e.clientY / window.innerHeight) * 2 - 1) * strength
      targetRef.current = { x, y }
    },
    [strength]
  )

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    if (prefersReducedMotion) return

    window.addEventListener("mousemove", handleMouseMove)

    const animate = () => {
      const current = currentRef.current
      const target = targetRef.current
      current.x += (target.x - current.x) * smoothing
      current.y += (target.y - current.y) * smoothing
      setOffset({ x: current.x, y: current.y })
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [handleMouseMove, smoothing])

  return offset
}

export function getLayerTransform(
  offset: ParallaxOffset,
  depth: number
): string {
  return `translate(${offset.x * depth}px, ${offset.y * depth}px)`
}
