import { useRef, useCallback, useState, useEffect } from "react"

interface HeavenAudioControls {
  started: boolean
  start: () => void
  stop: () => void
  setMasterVolume: (vol: number) => void
  setPan: (x: number) => void
}

export function useHeavenAudio(): HeavenAudioControls {
  const ctxRef = useRef<AudioContext | null>(null)
  const masterGainRef = useRef<GainNode | null>(null)
  const pannerRef = useRef<StereoPannerNode | null>(null)
  const noiseBufferRef = useRef<AudioBuffer | null>(null)
  const [started, setStarted] = useState(false)
  const intervalsRef = useRef<number[]>([])
  const sourcesRef = useRef<AudioBufferSourceNode[]>([])

  const start = useCallback(() => {
    if (ctxRef.current) return

    const ctx = new AudioContext()
    ctxRef.current = ctx

    if (ctx.state === "suspended") {
      const tryResume = () => {
        ctx.resume()
        window.removeEventListener("click", tryResume)
        window.removeEventListener("keydown", tryResume)
        window.removeEventListener("touchstart", tryResume)
      }
      window.addEventListener("click", tryResume)
      window.addEventListener("keydown", tryResume)
      window.addEventListener("touchstart", tryResume)
    }

    const master = ctx.createGain()
    master.gain.value = 0
    masterGainRef.current = master

    const panner = ctx.createStereoPanner()
    panner.pan.value = 0
    pannerRef.current = panner

    master.connect(panner)
    panner.connect(ctx.destination)

    // Shared noise buffer
    const noiseLen = ctx.sampleRate * 2
    const noiseBuffer = ctx.createBuffer(1, noiseLen, ctx.sampleRate)
    const noiseData = noiseBuffer.getChannelData(0)
    for (let i = 0; i < noiseLen; i++) {
      noiseData[i] = Math.random() * 2 - 1
    }
    noiseBufferRef.current = noiseBuffer

    // === Ethereal pad — two detuned sine oscillators (C4 + E4) ===
    const padOsc1 = ctx.createOscillator()
    padOsc1.type = "sine"
    padOsc1.frequency.value = 261.6 // C4
    const padGain1 = ctx.createGain()
    padGain1.gain.value = 0.02
    padOsc1.connect(padGain1)
    padGain1.connect(master)
    padOsc1.start()

    const padOsc2 = ctx.createOscillator()
    padOsc2.type = "sine"
    padOsc2.frequency.value = 329.6 // E4
    const padGain2 = ctx.createGain()
    padGain2.gain.value = 0.015
    padOsc2.connect(padGain2)
    padGain2.connect(master)
    padOsc2.start()

    // Slow vibrato on pad
    const padLfo = ctx.createOscillator()
    padLfo.type = "sine"
    padLfo.frequency.value = 0.1
    const padLfoGain = ctx.createGain()
    padLfoGain.gain.value = 3
    padLfo.connect(padLfoGain)
    padLfoGain.connect(padOsc1.frequency)
    padLfoGain.connect(padOsc2.frequency)
    padLfo.start()

    // Slow volume swell on pad
    const padVolLfo = ctx.createOscillator()
    padVolLfo.type = "sine"
    padVolLfo.frequency.value = 0.05
    const padVolLfoGain = ctx.createGain()
    padVolLfoGain.gain.value = 0.008
    padVolLfo.connect(padVolLfoGain)
    padVolLfoGain.connect(padGain1.gain)
    padVolLfo.start()

    // === Harp arpeggios — pentatonic scale ===
    const pentatonic = [261.6, 293.7, 329.6, 392.0, 440.0, 523.3, 587.3]

    const playHarpNote = (freq?: number) => {
      if (ctx.state !== "running") return
      const now = ctx.currentTime
      const f = freq || pentatonic[Math.floor(Math.random() * pentatonic.length)]
      const dur = 1.5 + Math.random() * 0.8

      const osc = ctx.createOscillator()
      osc.type = "sine"
      osc.frequency.value = f

      const g = ctx.createGain()
      g.gain.setValueAtTime(0, now)
      g.gain.linearRampToValueAtTime(0.06 + Math.random() * 0.03, now + 0.01)
      g.gain.exponentialRampToValueAtTime(0.001, now + dur)

      osc.connect(g)
      g.connect(master)
      osc.start(now)
      osc.stop(now + dur + 0.05)
    }

    const harpInterval = setInterval(() => {
      if (ctx.state !== "running") return
      playHarpNote()
      // Sometimes play ascending 3-note sequence
      if (Math.random() > 0.65) {
        const startIdx = Math.floor(Math.random() * (pentatonic.length - 2))
        setTimeout(() => playHarpNote(pentatonic[startIdx + 1]), 200 + Math.random() * 150)
        setTimeout(() => playHarpNote(pentatonic[startIdx + 2]), 450 + Math.random() * 200)
      }
    }, 2000 + Math.random() * 3000)
    intervalsRef.current.push(harpInterval as unknown as number)

    // === Gentle wind — bandpass filtered noise ===
    const windSource = ctx.createBufferSource()
    windSource.buffer = noiseBuffer
    windSource.loop = true
    sourcesRef.current.push(windSource)
    const windFilter = ctx.createBiquadFilter()
    windFilter.type = "bandpass"
    windFilter.frequency.value = 450
    windFilter.Q.value = 1.5
    const windGain = ctx.createGain()
    windGain.gain.value = 0.05
    windSource.connect(windFilter)
    windFilter.connect(windGain)
    windGain.connect(master)
    windSource.start()

    // Sweep wind frequency slowly
    const windLfo = ctx.createOscillator()
    windLfo.type = "sine"
    windLfo.frequency.value = 0.06
    const windLfoGain = ctx.createGain()
    windLfoGain.gain.value = 150
    windLfo.connect(windLfoGain)
    windLfoGain.connect(windFilter.frequency)
    windLfo.start()

    // Modulate wind volume for gusts
    const windVolLfo = ctx.createOscillator()
    windVolLfo.type = "sine"
    windVolLfo.frequency.value = 0.08
    const windVolLfoGain = ctx.createGain()
    windVolLfoGain.gain.value = 0.025
    windVolLfo.connect(windVolLfoGain)
    windVolLfoGain.connect(windGain.gain)
    windVolLfo.start()

    // === Distant thunder — listens for heaven-thunder event ===
    const playThunder = () => {
      if (ctx.state !== "running") return
      const now = ctx.currentTime

      const thunderSource = ctx.createBufferSource()
      thunderSource.buffer = noiseBuffer
      const thunderFilter = ctx.createBiquadFilter()
      thunderFilter.type = "lowpass"
      thunderFilter.frequency.setValueAtTime(100 + Math.random() * 80, now)
      thunderFilter.frequency.exponentialRampToValueAtTime(30, now + 1.5)
      thunderFilter.Q.value = 2
      const thunderGain = ctx.createGain()
      thunderGain.gain.setValueAtTime(0, now)
      thunderGain.gain.linearRampToValueAtTime(0.8 + Math.random() * 0.4, now + 0.02)
      thunderGain.gain.exponentialRampToValueAtTime(0.01, now + 1.5 + Math.random())

      thunderSource.connect(thunderFilter)
      thunderFilter.connect(thunderGain)
      thunderGain.connect(master)
      thunderSource.start(now)
      thunderSource.stop(now + 3)
    }

    window.addEventListener("heaven-thunder", playThunder)

    // === Eagle cry — periodic high-pitched sweep ===
    const playEagleCry = () => {
      if (ctx.state !== "running") return
      const now = ctx.currentTime

      const crySource = ctx.createBufferSource()
      crySource.buffer = noiseBuffer
      const cryFilter = ctx.createBiquadFilter()
      cryFilter.type = "bandpass"
      cryFilter.frequency.setValueAtTime(2500 + Math.random() * 500, now)
      cryFilter.frequency.exponentialRampToValueAtTime(1200, now + 0.3)
      cryFilter.Q.value = 8
      const cryGain = ctx.createGain()
      cryGain.gain.setValueAtTime(0, now)
      cryGain.gain.linearRampToValueAtTime(0.06, now + 0.02)
      cryGain.gain.exponentialRampToValueAtTime(0.001, now + 0.4)

      crySource.connect(cryFilter)
      cryFilter.connect(cryGain)
      cryGain.connect(master)
      crySource.start(now)
      crySource.stop(now + 0.6)
    }
    const eagleInterval = setInterval(() => {
      if (ctx.state === "running") playEagleCry()
    }, 15000 + Math.random() * 15000)
    intervalsRef.current.push(eagleInterval as unknown as number)

    setStarted(true)

    // Store thunder cleanup
    const thunderCleanup = () => window.removeEventListener("heaven-thunder", playThunder)
    ;(intervalsRef as unknown as { _thunderCleanup: () => void })._thunderCleanup = thunderCleanup
  }, [])

  const stop = useCallback(() => {
    intervalsRef.current.forEach(clearInterval)
    intervalsRef.current = []
    sourcesRef.current = []
    if (ctxRef.current) {
      ctxRef.current.close()
      ctxRef.current = null
    }
    masterGainRef.current = null
    pannerRef.current = null
    setStarted(false)
  }, [])

  const setMasterVolume = useCallback((vol: number) => {
    const master = masterGainRef.current
    const ctx = ctxRef.current
    if (!master || !ctx) return
    master.gain.linearRampToValueAtTime(vol, ctx.currentTime + 0.3)
  }, [])

  const setPan = useCallback((x: number) => {
    const panner = pannerRef.current
    if (panner) panner.pan.value = Math.max(-1, Math.min(1, x))
  }, [])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      intervalsRef.current.forEach(clearInterval)
      const thunderCleanup = (intervalsRef as unknown as { _thunderCleanup?: () => void })._thunderCleanup
      if (thunderCleanup) thunderCleanup()
      ctxRef.current?.close()
    }
  }, [])

  return { started, start, stop, setMasterVolume, setPan }
}
