import { useState, useEffect, useCallback, useRef } from "react"

interface ParallaxOffset {
  x: number
  y: number
}

interface UseMouseParallaxOptions {
  strength?: number
  smoothing?: number
}

function isMobile(): boolean {
  return window.matchMedia("(pointer: coarse)").matches
}

export function useMouseParallax(options: UseMouseParallaxOptions = {}) {
  const { strength = 1, smoothing = 0.1 } = options
  const [offset, setOffset] = useState<ParallaxOffset>({ x: 0, y: 0 })
  const targetRef = useRef<ParallaxOffset>({ x: 0, y: 0 })
  const currentRef = useRef<ParallaxOffset>({ x: 0, y: 0 })
  const rafRef = useRef<number>(0)
  const permissionRequestedRef = useRef(false)

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const x = ((e.clientX / window.innerWidth) * 2 - 1) * strength
      const y = ((e.clientY / window.innerHeight) * 2 - 1) * strength
      targetRef.current = { x, y }
    },
    [strength]
  )

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      const touch = e.touches[0]
      if (!touch) return
      const x = ((touch.clientX / window.innerWidth) * 2 - 1) * strength
      const y = ((touch.clientY / window.innerHeight) * 2 - 1) * strength
      targetRef.current = { x, y }
    },
    [strength]
  )

  const handleOrientation = useCallback(
    (e: DeviceOrientationEvent) => {
      const gamma = e.gamma ?? 0 // L/R tilt, -90 to 90
      const beta = (e.beta ?? 45) - 45 // F/B tilt, offset for natural hold angle
      const x = Math.max(-1, Math.min(1, gamma / 30)) * strength
      const y = Math.max(-1, Math.min(1, beta / 30)) * strength
      targetRef.current = { x, y }
    },
    [strength]
  )

  const requestGyroPermission = useCallback(async () => {
    if (permissionRequestedRef.current) return
    permissionRequestedRef.current = true

    // iOS requires explicit permission
    const DOE = DeviceOrientationEvent as unknown as {
      requestPermission?: () => Promise<string>
    }
    if (typeof DOE.requestPermission === "function") {
      try {
        const permission = await DOE.requestPermission()
        if (permission === "granted") {
          window.addEventListener("deviceorientation", handleOrientation)
        }
      } catch {
        // Permission denied — touch fallback already active
      }
    } else {
      // Android / non-iOS — just listen
      window.addEventListener("deviceorientation", handleOrientation)
    }
  }, [handleOrientation])

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    if (prefersReducedMotion) return

    const mobile = isMobile()

    if (mobile) {
      window.addEventListener("touchmove", handleTouchMove, { passive: true })
      // Request gyro on first touch
      const onFirstTouch = () => {
        requestGyroPermission()
        window.removeEventListener("touchstart", onFirstTouch)
      }
      window.addEventListener("touchstart", onFirstTouch, { passive: true })
    } else {
      window.addEventListener("mousemove", handleMouseMove)
    }

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
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("deviceorientation", handleOrientation)
      cancelAnimationFrame(rafRef.current)
    }
  }, [handleMouseMove, handleTouchMove, handleOrientation, smoothing, requestGyroPermission])

  return offset
}

export function getLayerTransform(
  offset: ParallaxOffset,
  depth: number
): string {
  return `translate(${offset.x * depth}px, ${offset.y * depth}px)`
}
