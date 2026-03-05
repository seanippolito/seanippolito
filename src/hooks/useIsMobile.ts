import { useState, useEffect } from "react"

/** Returns true on touch-primary devices (phones, tablets). */
export function useIsMobile(): boolean {
  const [mobile, setMobile] = useState(false)

  useEffect(() => {
    setMobile(window.matchMedia("(pointer: coarse)").matches)
  }, [])

  return mobile
}
