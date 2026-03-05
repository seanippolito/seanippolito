import { useState, useRef, useCallback } from "react"

export function useAnimalReaction(cooldownMs = 1500) {
  const [reacting, setReacting] = useState(false)
  const cooldownRef = useRef(false)

  const trigger = useCallback(() => {
    if (cooldownRef.current) return
    cooldownRef.current = true
    setReacting(true)

    setTimeout(() => {
      setReacting(false)
      setTimeout(() => {
        cooldownRef.current = false
      }, cooldownMs * 0.3)
    }, cooldownMs)
  }, [cooldownMs])

  return { reacting, trigger }
}
