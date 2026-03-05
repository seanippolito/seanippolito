import { useRef, useCallback, useState, useEffect } from "react"

interface VolcanoAudioControls {
  started: boolean
  start: () => void
  stop: () => void
  setMasterVolume: (vol: number) => void
  setPan: (x: number) => void
}

export function useVolcanoAudio(): VolcanoAudioControls {
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

    // === Deep earth rumble — constant low-frequency drone ===
    const rumbleSource = ctx.createBufferSource()
    rumbleSource.buffer = noiseBuffer
    rumbleSource.loop = true
    sourcesRef.current.push(rumbleSource)
    const rumbleFilter = ctx.createBiquadFilter()
    rumbleFilter.type = "lowpass"
    rumbleFilter.frequency.value = 80
    rumbleFilter.Q.value = 3
    const rumbleGain = ctx.createGain()
    rumbleGain.gain.value = 0.4
    rumbleSource.connect(rumbleFilter)
    rumbleFilter.connect(rumbleGain)
    rumbleGain.connect(master)
    rumbleSource.start()

    // Slow modulation on the rumble frequency for organic feel
    const rumbleLfo = ctx.createOscillator()
    rumbleLfo.type = "sine"
    rumbleLfo.frequency.value = 0.15
    const rumbleLfoGain = ctx.createGain()
    rumbleLfoGain.gain.value = 20
    rumbleLfo.connect(rumbleLfoGain)
    rumbleLfoGain.connect(rumbleFilter.frequency)
    rumbleLfo.start()

    // === Lava bubbling — periodic low-pitched burbles ===
    const playBubble = () => {
      if (ctx.state !== "running") return
      const now = ctx.currentTime
      const freq = 60 + Math.random() * 80 // 60-140Hz
      const dur = 0.15 + Math.random() * 0.2

      const osc = ctx.createOscillator()
      osc.type = "sine"
      osc.frequency.setValueAtTime(freq, now)
      osc.frequency.exponentialRampToValueAtTime(freq * 1.8, now + dur * 0.3)
      osc.frequency.exponentialRampToValueAtTime(freq * 0.5, now + dur)

      const g = ctx.createGain()
      g.gain.setValueAtTime(0, now)
      g.gain.linearRampToValueAtTime(0.12, now + 0.02)
      g.gain.setValueAtTime(0.12, now + dur * 0.4)
      g.gain.exponentialRampToValueAtTime(0.001, now + dur)

      osc.connect(g)
      g.connect(master)
      osc.start(now)
      osc.stop(now + dur + 0.05)
    }
    const bubbleInterval = setInterval(() => {
      playBubble()
      // Often double-bubble
      if (Math.random() > 0.5) {
        setTimeout(playBubble, 80 + Math.random() * 150)
      }
    }, 600 + Math.random() * 1200)
    intervalsRef.current.push(bubbleInterval as unknown as number)

    // === Crackling fire — rapid filtered noise pops ===
    const playCrackle = () => {
      if (ctx.state !== "running") return
      const now = ctx.currentTime
      const burstCount = 2 + Math.floor(Math.random() * 5)

      for (let i = 0; i < burstCount; i++) {
        const t = now + i * (0.03 + Math.random() * 0.06)
        const noise = ctx.createBufferSource()
        noise.buffer = noiseBuffer
        const bp = ctx.createBiquadFilter()
        bp.type = "bandpass"
        bp.frequency.value = 2000 + Math.random() * 3000
        bp.Q.value = 5 + Math.random() * 10
        const g = ctx.createGain()
        g.gain.setValueAtTime(0, t)
        g.gain.linearRampToValueAtTime(0.06 + Math.random() * 0.04, t + 0.003)
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.02 + Math.random() * 0.02)

        noise.connect(bp)
        bp.connect(g)
        g.connect(master)
        noise.start(t)
        noise.stop(t + 0.05)
      }
    }
    const crackleInterval = setInterval(() => {
      if (ctx.state === "running") playCrackle()
    }, 400 + Math.random() * 800)
    intervalsRef.current.push(crackleInterval as unknown as number)

    // === Wind howl — bandpass noise with slow sweep ===
    const windSource = ctx.createBufferSource()
    windSource.buffer = noiseBuffer
    windSource.loop = true
    sourcesRef.current.push(windSource)
    const windFilter = ctx.createBiquadFilter()
    windFilter.type = "bandpass"
    windFilter.frequency.value = 400
    windFilter.Q.value = 2
    const windGain = ctx.createGain()
    windGain.gain.value = 0.08
    windSource.connect(windFilter)
    windFilter.connect(windGain)
    windGain.connect(master)
    windSource.start()

    // Sweep the wind frequency slowly
    const windLfo = ctx.createOscillator()
    windLfo.type = "sine"
    windLfo.frequency.value = 0.08
    const windLfoGain = ctx.createGain()
    windLfoGain.gain.value = 200
    windLfo.connect(windLfoGain)
    windLfoGain.connect(windFilter.frequency)
    windLfo.start()

    // Modulate wind volume for gusts
    const windVolLfo = ctx.createOscillator()
    windVolLfo.type = "sine"
    windVolLfo.frequency.value = 0.12
    const windVolLfoGain = ctx.createGain()
    windVolLfoGain.gain.value = 0.04
    windVolLfo.connect(windVolLfoGain)
    windVolLfoGain.connect(windGain.gain)
    windVolLfo.start()

    // === Distant eruption booms — occasional deep explosions ===
    const playEruption = () => {
      if (ctx.state !== "running") return
      const now = ctx.currentTime

      // Deep boom
      const boomSource = ctx.createBufferSource()
      boomSource.buffer = noiseBuffer
      const boomFilter = ctx.createBiquadFilter()
      boomFilter.type = "lowpass"
      boomFilter.frequency.setValueAtTime(150 + Math.random() * 100, now)
      boomFilter.frequency.exponentialRampToValueAtTime(30, now + 2)
      boomFilter.Q.value = 2 + Math.random() * 3
      const boomGain = ctx.createGain()
      boomGain.gain.setValueAtTime(0, now)
      boomGain.gain.linearRampToValueAtTime(1.5 + Math.random(), now + 0.03)
      boomGain.gain.setValueAtTime(1.5, now + 0.1)
      boomGain.gain.exponentialRampToValueAtTime(0.01, now + 2.5 + Math.random() * 2)

      boomSource.connect(boomFilter)
      boomFilter.connect(boomGain)
      boomGain.connect(master)
      boomSource.start(now)
      boomSource.stop(now + 5)

      // Debris rattle after boom
      setTimeout(() => {
        if (ctx.state !== "running") return
        const rNow = ctx.currentTime
        const rattle = ctx.createBufferSource()
        rattle.buffer = noiseBuffer
        const rattleBp = ctx.createBiquadFilter()
        rattleBp.type = "bandpass"
        rattleBp.frequency.value = 800 + Math.random() * 600
        rattleBp.Q.value = 3
        const rattleGain = ctx.createGain()
        rattleGain.gain.setValueAtTime(0.08, rNow)
        rattleGain.gain.exponentialRampToValueAtTime(0.001, rNow + 1.5)
        rattle.connect(rattleBp)
        rattleBp.connect(rattleGain)
        rattleGain.connect(master)
        rattle.start(rNow)
        rattle.stop(rNow + 2)
      }, 300 + Math.random() * 500)
    }
    const eruptionInterval = setInterval(() => {
      if (ctx.state === "running") playEruption()
    }, 12000 + Math.random() * 18000) // every 12-30s
    intervalsRef.current.push(eruptionInterval as unknown as number)

    // === Eerie tones — subtle high-pitched drones ===
    const eerieSource1 = ctx.createOscillator()
    eerieSource1.type = "sine"
    eerieSource1.frequency.value = 220
    const eerieGain1 = ctx.createGain()
    eerieGain1.gain.value = 0.02
    eerieSource1.connect(eerieGain1)
    eerieGain1.connect(master)
    eerieSource1.start()

    // Detuned second tone for dissonance
    const eerieSource2 = ctx.createOscillator()
    eerieSource2.type = "sine"
    eerieSource2.frequency.value = 233 // minor second dissonance
    const eerieGain2 = ctx.createGain()
    eerieGain2.gain.value = 0.015
    eerieSource2.connect(eerieGain2)
    eerieGain2.connect(master)
    eerieSource2.start()

    // Slow volume pulse on eerie tones
    const eerieLfo = ctx.createOscillator()
    eerieLfo.type = "sine"
    eerieLfo.frequency.value = 0.06
    const eerieLfoGain = ctx.createGain()
    eerieLfoGain.gain.value = 0.01
    eerieLfo.connect(eerieLfoGain)
    eerieLfoGain.connect(eerieGain1.gain)
    eerieLfo.start()

    setStarted(true)
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
      ctxRef.current?.close()
    }
  }, [])

  return { started, start, stop, setMasterVolume, setPan }
}
