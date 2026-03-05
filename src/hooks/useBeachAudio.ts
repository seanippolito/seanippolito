import { useRef, useCallback, useState, useEffect } from "react"

interface BeachAudioControls {
  started: boolean
  start: () => void
  stop: () => void
  setMasterVolume: (vol: number) => void
  setPan: (x: number) => void
}

export function useBeachAudio(): BeachAudioControls {
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

    // === Rolling ocean waves — filtered noise with rhythmic volume swell ===
    const waveSource = ctx.createBufferSource()
    waveSource.buffer = noiseBuffer
    waveSource.loop = true
    sourcesRef.current.push(waveSource)

    const waveFilter = ctx.createBiquadFilter()
    waveFilter.type = "lowpass"
    waveFilter.frequency.value = 400
    waveFilter.Q.value = 0.8

    const waveGain = ctx.createGain()
    waveGain.gain.value = 0.08

    waveSource.connect(waveFilter)
    waveFilter.connect(waveGain)
    waveGain.connect(master)
    waveSource.start()

    // Rhythmic volume swell — slow breathing pattern
    const waveLfo = ctx.createOscillator()
    waveLfo.type = "sine"
    waveLfo.frequency.value = 0.12 // ~8s cycle
    const waveLfoGain = ctx.createGain()
    waveLfoGain.gain.value = 0.04
    waveLfo.connect(waveLfoGain)
    waveLfoGain.connect(waveGain.gain)
    waveLfo.start()

    // Sweep wave filter for more dynamic sound
    const waveFilterLfo = ctx.createOscillator()
    waveFilterLfo.type = "sine"
    waveFilterLfo.frequency.value = 0.08
    const waveFilterLfoGain = ctx.createGain()
    waveFilterLfoGain.gain.value = 150
    waveFilterLfo.connect(waveFilterLfoGain)
    waveFilterLfoGain.connect(waveFilter.frequency)
    waveFilterLfo.start()

    // === Seagull cries — bandpass noise with pitch sweep, every 10-20s ===
    const playSeagullCry = () => {
      if (ctx.state !== "running") return
      const now = ctx.currentTime

      const crySource = ctx.createBufferSource()
      crySource.buffer = noiseBuffer
      const cryFilter = ctx.createBiquadFilter()
      cryFilter.type = "bandpass"
      cryFilter.frequency.setValueAtTime(3000 + Math.random() * 800, now)
      cryFilter.frequency.exponentialRampToValueAtTime(1800, now + 0.25)
      cryFilter.frequency.exponentialRampToValueAtTime(2800, now + 0.4)
      cryFilter.Q.value = 12
      const cryGain = ctx.createGain()
      cryGain.gain.setValueAtTime(0, now)
      cryGain.gain.linearRampToValueAtTime(0.04 + Math.random() * 0.02, now + 0.02)
      cryGain.gain.exponentialRampToValueAtTime(0.001, now + 0.5)

      crySource.connect(cryFilter)
      cryFilter.connect(cryGain)
      cryGain.connect(master)
      crySource.start(now)
      crySource.stop(now + 0.6)
    }

    const seagullInterval = setInterval(() => {
      if (ctx.state === "running") {
        playSeagullCry()
        // Sometimes a second cry follows
        if (Math.random() > 0.5) {
          setTimeout(() => playSeagullCry(), 400 + Math.random() * 300)
        }
      }
    }, 10000 + Math.random() * 10000)
    intervalsRef.current.push(seagullInterval as unknown as number)

    // === Gentle wind — bandpass noise, slow sweep ===
    const windSource = ctx.createBufferSource()
    windSource.buffer = noiseBuffer
    windSource.loop = true
    sourcesRef.current.push(windSource)

    const windFilter = ctx.createBiquadFilter()
    windFilter.type = "bandpass"
    windFilter.frequency.value = 600
    windFilter.Q.value = 1.2

    const windGain = ctx.createGain()
    windGain.gain.value = 0.03

    windSource.connect(windFilter)
    windFilter.connect(windGain)
    windGain.connect(master)
    windSource.start()

    const windLfo = ctx.createOscillator()
    windLfo.type = "sine"
    windLfo.frequency.value = 0.04
    const windLfoGain = ctx.createGain()
    windLfoGain.gain.value = 200
    windLfo.connect(windLfoGain)
    windLfoGain.connect(windFilter.frequency)
    windLfo.start()

    // === Distant steel drum / ukulele notes — pentatonic sine tones, every 3-6s ===
    const beachScale = [392.0, 440.0, 493.9, 587.3, 659.3] // G4 A4 B4 D5 E5 pentatonic

    const playBeachNote = () => {
      if (ctx.state !== "running") return
      const now = ctx.currentTime
      const freq = beachScale[Math.floor(Math.random() * beachScale.length)]
      const dur = 0.8 + Math.random() * 0.6

      // Steel drum — triangle wave with fast attack, medium decay
      const osc = ctx.createOscillator()
      osc.type = "triangle"
      osc.frequency.value = freq

      const g = ctx.createGain()
      g.gain.setValueAtTime(0, now)
      g.gain.linearRampToValueAtTime(0.04 + Math.random() * 0.02, now + 0.005)
      g.gain.exponentialRampToValueAtTime(0.001, now + dur)

      osc.connect(g)
      g.connect(master)
      osc.start(now)
      osc.stop(now + dur + 0.05)
    }

    const noteInterval = setInterval(() => {
      if (ctx.state !== "running") return
      playBeachNote()
      // Occasionally play a 2-note pair
      if (Math.random() > 0.7) {
        setTimeout(() => playBeachNote(), 150 + Math.random() * 100)
      }
    }, 3000 + Math.random() * 3000)
    intervalsRef.current.push(noteInterval as unknown as number)

    // === Occasional dolphin click — high-freq filtered burst, every 20-40s ===
    const playDolphinClick = () => {
      if (ctx.state !== "running") return
      const now = ctx.currentTime

      const clickSource = ctx.createBufferSource()
      clickSource.buffer = noiseBuffer
      const clickFilter = ctx.createBiquadFilter()
      clickFilter.type = "highpass"
      clickFilter.frequency.value = 4000 + Math.random() * 2000
      clickFilter.Q.value = 5
      const clickGain = ctx.createGain()
      clickGain.gain.setValueAtTime(0, now)
      clickGain.gain.linearRampToValueAtTime(0.03, now + 0.002)
      clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.05)

      clickSource.connect(clickFilter)
      clickFilter.connect(clickGain)
      clickGain.connect(master)
      clickSource.start(now)
      clickSource.stop(now + 0.1)

      // Dolphin clicks come in bursts of 2-4
      const burstCount = 1 + Math.floor(Math.random() * 3)
      for (let i = 1; i <= burstCount; i++) {
        const delay = i * (0.06 + Math.random() * 0.04)
        const burstSource = ctx.createBufferSource()
        burstSource.buffer = noiseBuffer
        const burstFilter = ctx.createBiquadFilter()
        burstFilter.type = "highpass"
        burstFilter.frequency.value = 4500 + Math.random() * 2000
        burstFilter.Q.value = 5
        const burstGain = ctx.createGain()
        burstGain.gain.setValueAtTime(0, now + delay)
        burstGain.gain.linearRampToValueAtTime(0.025, now + delay + 0.002)
        burstGain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.05)

        burstSource.connect(burstFilter)
        burstFilter.connect(burstGain)
        burstGain.connect(master)
        burstSource.start(now + delay)
        burstSource.stop(now + delay + 0.1)
      }
    }

    const dolphinInterval = setInterval(() => {
      if (ctx.state === "running") playDolphinClick()
    }, 20000 + Math.random() * 20000)
    intervalsRef.current.push(dolphinInterval as unknown as number)

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

  useEffect(() => {
    return () => {
      intervalsRef.current.forEach(clearInterval)
      ctxRef.current?.close()
    }
  }, [])

  return { started, start, stop, setMasterVolume, setPan }
}
