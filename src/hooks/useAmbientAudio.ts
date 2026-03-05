import { useRef, useCallback, useState, useEffect } from "react"

interface AmbientAudioControls {
  started: boolean
  muted: boolean
  start: () => void
  toggleMute: () => void
  setRainIntensity: (intensity: number) => void
  setPan: (x: number) => void
}

export function useAmbientAudio(): AmbientAudioControls {
  const ctxRef = useRef<AudioContext | null>(null)
  const masterGainRef = useRef<GainNode | null>(null)
  const pannerRef = useRef<StereoPannerNode | null>(null)
  const rainGainRef = useRef<GainNode | null>(null)
  const rainFilterRef = useRef<BiquadFilterNode | null>(null)
  const noiseBufferRef = useRef<AudioBuffer | null>(null)
  const [started, setStarted] = useState(false)
  const [muted, setMuted] = useState(true)
  const intervalsRef = useRef<number[]>([])

  const start = useCallback(() => {
    if (ctxRef.current) return

    const ctx = new AudioContext()
    ctxRef.current = ctx

    // Resume if suspended (e.g. created from mousemove)
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
    master.gain.value = 0 // start silent — user unmutes via click
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

    // === Rustling leaves — filtered white noise, constant ===
    const rustleSource = ctx.createBufferSource()
    rustleSource.buffer = noiseBuffer
    rustleSource.loop = true
    const rustleFilter = ctx.createBiquadFilter()
    rustleFilter.type = "bandpass"
    rustleFilter.frequency.value = 800
    rustleFilter.Q.value = 0.5
    const rustleGain = ctx.createGain()
    rustleGain.gain.value = 0.3
    rustleSource.connect(rustleFilter)
    rustleFilter.connect(rustleGain)
    rustleGain.connect(master)
    rustleSource.start()

    // === Crickets — filtered noise chirps ===
    const playCricket = () => {
      const now = ctx.currentTime
      const chirpCount = 3 + Math.floor(Math.random() * 4)
      const baseFreq = 3500 + Math.random() * 1500

      for (let i = 0; i < chirpCount; i++) {
        const t = now + i * 0.035

        const noise = ctx.createBufferSource()
        noise.buffer = noiseBuffer
        const bp = ctx.createBiquadFilter()
        bp.type = "bandpass"
        bp.frequency.value = baseFreq
        bp.Q.value = 20
        const g = ctx.createGain()
        g.gain.setValueAtTime(0, t)
        g.gain.linearRampToValueAtTime(0.1, t + 0.005)
        g.gain.linearRampToValueAtTime(0, t + 0.025)

        noise.connect(bp)
        bp.connect(g)
        g.connect(master)
        noise.start(t)
        noise.stop(t + 0.03)
      }
    }
    const cricketInterval = setInterval(() => {
      if (ctx.state === "running") {
        playCricket()
        if (Math.random() > 0.6) {
          setTimeout(playCricket, 150 + Math.random() * 200)
        }
      }
    }, 800 + Math.random() * 2000)
    intervalsRef.current.push(cricketInterval as unknown as number)

    // === Bird calls — multi-tone warble ===
    const playBird = () => {
      const now = ctx.currentTime
      const noteCount = 2 + Math.floor(Math.random() * 2)
      for (let n = 0; n < noteCount; n++) {
        const noteStart = now + n * 0.18
        const baseFreq = 1800 - n * 300 + (Math.random() - 0.5) * 200

        const osc1 = ctx.createOscillator()
        osc1.type = "triangle"
        osc1.frequency.setValueAtTime(baseFreq, noteStart)
        osc1.frequency.exponentialRampToValueAtTime(baseFreq * 0.85, noteStart + 0.12)

        const vibrato = ctx.createOscillator()
        vibrato.frequency.value = 25 + Math.random() * 15
        const vibratoGain = ctx.createGain()
        vibratoGain.gain.value = baseFreq * 0.02
        vibrato.connect(vibratoGain)
        vibratoGain.connect(osc1.frequency)

        const g = ctx.createGain()
        g.gain.setValueAtTime(0, noteStart)
        g.gain.linearRampToValueAtTime(0.06, noteStart + 0.015)
        g.gain.setValueAtTime(0.06, noteStart + 0.08)
        g.gain.exponentialRampToValueAtTime(0.001, noteStart + 0.15)

        osc1.connect(g)
        g.connect(master)
        osc1.start(noteStart)
        osc1.stop(noteStart + 0.16)
        vibrato.start(noteStart)
        vibrato.stop(noteStart + 0.16)
      }
    }
    const birdInterval = setInterval(() => {
      if (ctx.state === "running") playBird()
    }, 8000 + Math.random() * 12000)
    intervalsRef.current.push(birdInterval as unknown as number)

    // === Water drips — short sine bursts ===
    const playDrip = () => {
      const osc = ctx.createOscillator()
      osc.type = "sine"
      osc.frequency.value = 800 + Math.random() * 400
      const g = ctx.createGain()
      g.gain.value = 0
      osc.connect(g)
      g.connect(master)
      const now = ctx.currentTime
      g.gain.setValueAtTime(0, now)
      g.gain.linearRampToValueAtTime(0.08, now + 0.01)
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.15)
      osc.start(now)
      osc.stop(now + 0.2)
    }
    const dripInterval = setInterval(() => {
      if (ctx.state === "running") playDrip()
    }, 2000 + Math.random() * 4000)
    intervalsRef.current.push(dripInterval as unknown as number)

    // === Rain layer — highpass filtered noise (patter-like, not low rumble) ===
    const rainSource = ctx.createBufferSource()
    rainSource.buffer = noiseBuffer
    rainSource.loop = true
    const rainFilter = ctx.createBiquadFilter()
    rainFilter.type = "bandpass"
    rainFilter.frequency.value = 6000 // higher frequency = patter texture
    rainFilter.Q.value = 0.3 // wide band
    rainFilterRef.current = rainFilter
    const rainGain = ctx.createGain()
    rainGain.gain.value = 0
    rainGainRef.current = rainGain
    rainSource.connect(rainFilter)
    rainFilter.connect(rainGain)
    rainGain.connect(master)
    rainSource.start()

    // === Thunder — triggered by lightning flash via custom event ===
    const playThunder = () => {
      if (ctx.state !== "running") return
      const now = ctx.currentTime

      // Randomize each thunder strike
      const crackFreq = 250 + Math.random() * 400     // 250-650Hz
      const crackQ = 0.8 + Math.random() * 2.5        // 0.8-3.3
      const crackPeak = 2.0 + Math.random() * 1.5     // 2.0-3.5
      const crackDecay = 0.4 + Math.random() * 0.6    // 0.4-1.0s

      const rumbleStart = 80 + Math.random() * 120     // 80-200Hz start
      const rumbleEnd = 25 + Math.random() * 30        // 25-55Hz end
      const rumbleQ = 1.5 + Math.random() * 4          // 1.5-5.5
      const rumblePeak = 2.5 + Math.random() * 1.5     // 2.5-4.0
      const rumbleSustain = 0.3 + Math.random() * 0.8  // 0.3-1.1s hold
      const rumbleDuration = 3.0 + Math.random() * 3.0 // 3-6s total

      // Sharp crack
      const crackSource = ctx.createBufferSource()
      crackSource.buffer = noiseBuffer
      const crackFilter = ctx.createBiquadFilter()
      crackFilter.type = "bandpass"
      crackFilter.frequency.value = crackFreq
      crackFilter.Q.value = crackQ
      const crackGain = ctx.createGain()
      crackGain.gain.setValueAtTime(0, now)
      crackGain.gain.linearRampToValueAtTime(crackPeak, now + 0.015)
      crackGain.gain.exponentialRampToValueAtTime(0.01, now + crackDecay)
      crackSource.connect(crackFilter)
      crackFilter.connect(crackGain)
      crackGain.connect(panner)
      crackSource.start(now)
      crackSource.stop(now + crackDecay + 0.1)

      // Low rumble
      const rumbleSource = ctx.createBufferSource()
      rumbleSource.buffer = noiseBuffer
      rumbleSource.loop = true
      const lpFilter = ctx.createBiquadFilter()
      lpFilter.type = "lowpass"
      lpFilter.frequency.setValueAtTime(rumbleStart, now)
      lpFilter.frequency.exponentialRampToValueAtTime(rumbleEnd, now + rumbleDuration * 0.8)
      lpFilter.Q.value = rumbleQ
      const rumbleGain = ctx.createGain()
      rumbleGain.gain.setValueAtTime(0, now)
      rumbleGain.gain.linearRampToValueAtTime(rumblePeak, now + 0.04)
      rumbleGain.gain.setValueAtTime(rumblePeak, now + rumbleSustain)
      rumbleGain.gain.linearRampToValueAtTime(rumblePeak * 0.4, now + rumbleDuration * 0.5)
      rumbleGain.gain.exponentialRampToValueAtTime(0.01, now + rumbleDuration)
      rumbleSource.connect(lpFilter)
      lpFilter.connect(rumbleGain)
      rumbleGain.connect(panner)
      rumbleSource.start(now)
      rumbleSource.stop(now + rumbleDuration + 0.5)

      // 40% chance of a secondary rumble echo (distant rolling thunder)
      if (Math.random() > 0.6) {
        const echoDelay = 0.8 + Math.random() * 1.5
        const echoSource = ctx.createBufferSource()
        echoSource.buffer = noiseBuffer
        echoSource.loop = true
        const echoFilter = ctx.createBiquadFilter()
        echoFilter.type = "lowpass"
        echoFilter.frequency.value = 60 + Math.random() * 40
        echoFilter.Q.value = 2 + Math.random() * 2
        const echoGain = ctx.createGain()
        echoGain.gain.setValueAtTime(0, now + echoDelay)
        echoGain.gain.linearRampToValueAtTime(rumblePeak * 0.3, now + echoDelay + 0.1)
        echoGain.gain.exponentialRampToValueAtTime(0.01, now + echoDelay + 2.0 + Math.random() * 1.5)
        echoSource.connect(echoFilter)
        echoFilter.connect(echoGain)
        echoGain.connect(panner)
        echoSource.start(now + echoDelay)
        echoSource.stop(now + echoDelay + 4.0)
      }
    }

    window.addEventListener("jungle-thunder", playThunder)
    ;(intervalsRef as unknown as { _thunderCleanup: () => void })._thunderCleanup =
      () => window.removeEventListener("jungle-thunder", playThunder)

    setStarted(true)
  }, [])

  const toggleMute = useCallback(() => {
    const master = masterGainRef.current
    if (!master) return
    setMuted((prev) => {
      const next = !prev
      master.gain.linearRampToValueAtTime(next ? 0 : 0.15, (ctxRef.current?.currentTime ?? 0) + 0.1)
      return next
    })
  }, [])

  const setRainIntensity = useCallback((intensity: number) => {
    const rainGain = rainGainRef.current
    const ctx = ctxRef.current
    if (!rainGain || !ctx) return
    // Longer ramp = fade in/out instead of abrupt change
    const rampTime = intensity > 0 ? 3.0 : 4.0
    rainGain.gain.linearRampToValueAtTime(intensity * 0.5, ctx.currentTime + rampTime)
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

  return { started, muted, start, toggleMute, setRainIntensity, setPan }
}
