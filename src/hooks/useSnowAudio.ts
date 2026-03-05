import { useRef, useCallback, useState, useEffect } from "react"

interface SnowAudioControls {
  started: boolean
  start: () => void
  stop: () => void
  setMasterVolume: (vol: number) => void
  setPan: (x: number) => void
}

export function useSnowAudio(): SnowAudioControls {
  const ctxRef = useRef<AudioContext | null>(null)
  const masterGainRef = useRef<GainNode | null>(null)
  const pannerRef = useRef<StereoPannerNode | null>(null)
  const noiseBufferRef = useRef<AudioBuffer | null>(null)
  const [started, setStarted] = useState(false)
  const timeoutsRef = useRef<number[]>([])
  const sourcesRef = useRef<(AudioBufferSourceNode | OscillatorNode)[]>([])

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

    // Shared noise buffer — 4 seconds of white noise
    const noiseLen = ctx.sampleRate * 4
    const noiseBuffer = ctx.createBuffer(1, noiseLen, ctx.sampleRate)
    const noiseData = noiseBuffer.getChannelData(0)
    for (let i = 0; i < noiseLen; i++) {
      noiseData[i] = Math.random() * 2 - 1
    }
    noiseBufferRef.current = noiseBuffer

    // === Wind howl — bandpass filtered noise, sweeping LFO, with howling overtone ===
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

    // LFO sweeps center frequency between 200–600 Hz at ~0.05 Hz
    const windLfo = ctx.createOscillator()
    windLfo.type = "sine"
    windLfo.frequency.value = 0.05
    const windLfoGain = ctx.createGain()
    windLfoGain.gain.value = 200 // ±200 Hz around center 400 Hz → 200–600 Hz
    windLfo.connect(windLfoGain)
    windLfoGain.connect(windFilter.frequency)
    windLfo.start()

    // Howling overtone — second bandpass at 800–1200 Hz
    const howlSource = ctx.createBufferSource()
    howlSource.buffer = noiseBuffer
    howlSource.loop = true
    sourcesRef.current.push(howlSource)

    const howlFilter = ctx.createBiquadFilter()
    howlFilter.type = "bandpass"
    howlFilter.frequency.value = 1000
    howlFilter.Q.value = 2

    const howlGain = ctx.createGain()
    howlGain.gain.value = 0.04

    howlSource.connect(howlFilter)
    howlFilter.connect(howlGain)
    howlGain.connect(master)
    howlSource.start()

    // LFO for howl filter also sweeps 800–1200 Hz
    const howlLfo = ctx.createOscillator()
    howlLfo.type = "sine"
    howlLfo.frequency.value = 0.05
    // Offset phase by starting at a different oscillator frequency phase — use slightly
    // different frequency so the howl sweeps semi-independently
    howlLfo.frequency.value = 0.07
    const howlLfoGain = ctx.createGain()
    howlLfoGain.gain.value = 200 // ±200 Hz around 1000 Hz → 800–1200 Hz
    howlLfo.connect(howlLfoGain)
    howlLfoGain.connect(howlFilter.frequency)
    howlLfo.start()

    // === Crunching snow — highpass noise with irregular amplitude modulation ===
    const crunchSource = ctx.createBufferSource()
    crunchSource.buffer = noiseBuffer
    crunchSource.loop = true
    sourcesRef.current.push(crunchSource)

    const crunchFilter = ctx.createBiquadFilter()
    crunchFilter.type = "highpass"
    crunchFilter.frequency.value = 2000
    crunchFilter.Q.value = 1

    const crunchGain = ctx.createGain()
    crunchGain.gain.value = 0.02

    crunchSource.connect(crunchFilter)
    crunchFilter.connect(crunchGain)
    crunchGain.connect(master)
    crunchSource.start()

    // Irregular amplitude modulation at ~3 Hz with random variation
    const crunchLfo = ctx.createOscillator()
    crunchLfo.type = "sine"
    crunchLfo.frequency.value = 3 + Math.random() * 0.5
    const crunchLfoGain = ctx.createGain()
    crunchLfoGain.gain.value = 0.015 // modulation depth — keeps gain between 0.005 and 0.035
    crunchLfo.connect(crunchLfoGain)
    crunchLfoGain.connect(crunchGain.gain)
    crunchLfo.start()

    // === Wolf howl — periodic oscillator with pitch bend, every 40–70s ===
    const playWolfHowl = () => {
      if (!ctxRef.current || ctxRef.current.state !== "running") return
      const now = ctx.currentTime

      const wolfOsc = ctx.createOscillator()
      wolfOsc.type = "triangle"

      const wolfFilter = ctx.createBiquadFilter()
      wolfFilter.type = "bandpass"
      wolfFilter.Q.value = 8
      wolfFilter.frequency.value = 400

      const wolfGain = ctx.createGain()
      wolfGain.gain.setValueAtTime(0, now)
      wolfGain.gain.linearRampToValueAtTime(0.05, now + 0.5)   // ramp up over 0.5s
      wolfGain.gain.setValueAtTime(0.05, now + 3.0)             // hold
      wolfGain.gain.linearRampToValueAtTime(0, now + 4.0)       // ramp down over 1s

      // Pitch: 300 Hz → 500 Hz over 2s, hold 1s, → 350 Hz over 1s
      wolfOsc.frequency.setValueAtTime(300, now)
      wolfOsc.frequency.linearRampToValueAtTime(500, now + 2.0)
      wolfOsc.frequency.setValueAtTime(500, now + 3.0)
      wolfOsc.frequency.linearRampToValueAtTime(350, now + 4.0)

      // Track the filter frequency loosely with the pitch
      wolfFilter.frequency.setValueAtTime(300, now)
      wolfFilter.frequency.linearRampToValueAtTime(500, now + 2.0)
      wolfFilter.frequency.setValueAtTime(500, now + 3.0)
      wolfFilter.frequency.linearRampToValueAtTime(350, now + 4.0)

      wolfOsc.connect(wolfFilter)
      wolfFilter.connect(wolfGain)
      wolfGain.connect(master)
      wolfOsc.start(now)
      wolfOsc.stop(now + 4.1)

      // Schedule next howl
      const nextDelay = 40000 + Math.random() * 30000
      const t = setTimeout(() => playWolfHowl(), nextDelay)
      timeoutsRef.current.push(t as unknown as number)
    }

    // Initial wolf howl delayed so it doesn't fire immediately on start
    const wolfInitial = setTimeout(
      () => playWolfHowl(),
      20000 + Math.random() * 20000
    )
    timeoutsRef.current.push(wolfInitial as unknown as number)

    // === Owl hoot — two short triangle tone bursts, every 25–45s ===
    const playOwlHoot = () => {
      if (!ctxRef.current || ctxRef.current.state !== "running") return
      const now = ctx.currentTime

      const playHootBurst = (offset: number) => {
        const owlOsc = ctx.createOscillator()
        owlOsc.type = "triangle"
        owlOsc.frequency.setValueAtTime(400, now + offset)
        owlOsc.frequency.linearRampToValueAtTime(360, now + offset + 0.3) // slight pitch bend down

        const owlFilter = ctx.createBiquadFilter()
        owlFilter.type = "lowpass"
        owlFilter.frequency.value = 800

        const owlGain = ctx.createGain()
        owlGain.gain.setValueAtTime(0, now + offset)
        owlGain.gain.linearRampToValueAtTime(0.03, now + offset + 0.02)
        owlGain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.3)

        owlOsc.connect(owlFilter)
        owlFilter.connect(owlGain)
        owlGain.connect(master)
        owlOsc.start(now + offset)
        owlOsc.stop(now + offset + 0.35)
      }

      playHootBurst(0)
      playHootBurst(0.4) // second burst 0.4s after the first

      // Schedule next hoot
      const nextDelay = 25000 + Math.random() * 20000
      const t = setTimeout(() => playOwlHoot(), nextDelay)
      timeoutsRef.current.push(t as unknown as number)
    }

    const owlInitial = setTimeout(
      () => playOwlHoot(),
      10000 + Math.random() * 15000
    )
    timeoutsRef.current.push(owlInitial as unknown as number)

    // === Crackling fire — detuned high-frequency oscillators with gain modulation ===
    // Use multiple triangle-wave oscillators at very high frequencies with slight detuning
    // and slow random gain modulation to mimic crackling texture
    const fireCrackleCount = 6
    for (let i = 0; i < fireCrackleCount; i++) {
      const baseFreq = 2800 + i * 400 + Math.random() * 200
      const fireOsc = ctx.createOscillator()
      fireOsc.type = "triangle"
      fireOsc.frequency.value = baseFreq

      const fireGain = ctx.createGain()
      fireGain.gain.value = 0

      // Modulate gain with a low-frequency oscillator at varying speeds to mimic crackle
      const fireLfo = ctx.createOscillator()
      fireLfo.type = "sine"
      fireLfo.frequency.value = 0.5 + Math.random() * 4 // 0.5–4.5 Hz, irregular per oscillator

      const fireLfoGain = ctx.createGain()
      fireLfoGain.gain.value = 0.008 + Math.random() * 0.007 // gain amplitude 0–0.03

      fireLfo.connect(fireLfoGain)
      fireLfoGain.connect(fireGain.gain)

      fireOsc.connect(fireGain)
      fireGain.connect(master)

      sourcesRef.current.push(fireOsc)
      fireOsc.start()
      fireLfo.start()
    }

    // === Ice cracking — rare noise burst through narrow bandpass, every 60–120s ===
    const playIceCrack = () => {
      if (!ctxRef.current || ctxRef.current.state !== "running") return
      const now = ctx.currentTime

      const iceSource = ctx.createBufferSource()
      iceSource.buffer = noiseBuffer

      const iceFilter = ctx.createBiquadFilter()
      iceFilter.type = "bandpass"
      iceFilter.frequency.value = 1500
      iceFilter.Q.value = 10

      const iceGain = ctx.createGain()
      iceGain.gain.setValueAtTime(0, now)
      iceGain.gain.linearRampToValueAtTime(0.04, now + 0.005) // spike up
      iceGain.gain.exponentialRampToValueAtTime(0.001, now + 0.1) // cut quickly

      iceSource.connect(iceFilter)
      iceFilter.connect(iceGain)
      iceGain.connect(master)
      iceSource.start(now)
      iceSource.stop(now + 0.15)

      // Schedule next crack
      const nextDelay = 60000 + Math.random() * 60000
      const t = setTimeout(() => playIceCrack(), nextDelay)
      timeoutsRef.current.push(t as unknown as number)
    }

    const iceInitial = setTimeout(
      () => playIceCrack(),
      30000 + Math.random() * 30000
    )
    timeoutsRef.current.push(iceInitial as unknown as number)

    setStarted(true)
  }, [])

  const stop = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout)
    timeoutsRef.current = []
    sourcesRef.current = []
    if (ctxRef.current) {
      ctxRef.current.close()
      ctxRef.current = null
    }
    masterGainRef.current = null
    pannerRef.current = null
    noiseBufferRef.current = null
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

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(clearTimeout)
      ctxRef.current?.close()
    }
  }, [])

  return { started, start, stop, setMasterVolume, setPan }
}
