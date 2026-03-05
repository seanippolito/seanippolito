import { memo, useEffect, useRef, useState } from "react";

interface WaveConfig {
  baseY: number;
  amplitude: number;
  frequency: number;
  speed: number;
  color: string;
  foamOpacity: number;
}

const WAVE_CONFIGS: WaveConfig[] = [
  { baseY: 460, amplitude: 18, frequency: 0.003, speed: 0.4, color: "#0d9488", foamOpacity: 0.15 },
  { baseY: 490, amplitude: 22, frequency: 0.0025, speed: 0.55, color: "#14b8a6", foamOpacity: 0.25 },
  { baseY: 520, amplitude: 16, frequency: 0.0035, speed: 0.35, color: "#2dd4bf", foamOpacity: 0.35 },
  { baseY: 550, amplitude: 12, frequency: 0.002, speed: 0.65, color: "#14b8a6", foamOpacity: 0.2 },
];

function buildWavePath(
  baseY: number,
  amplitude: number,
  frequency: number,
  phase: number,
  width: number
): string {
  const steps = 48;
  const dx = width / steps;
  let d = `M0 ${baseY + amplitude * Math.sin(phase)}`;
  for (let i = 1; i <= steps; i++) {
    const x = i * dx;
    const y = baseY + amplitude * Math.sin(frequency * x + phase);
    d += ` L${x.toFixed(1)} ${y.toFixed(2)}`;
  }
  d += ` L${width} 1080 L0 1080 Z`;
  return d;
}

function buildFoamArcs(
  baseY: number,
  amplitude: number,
  frequency: number,
  phase: number,
  width: number,
  foamPhase: number
): { cx: number; cy: number; opacity: number }[] {
  const arcs: { cx: number; cy: number; opacity: number }[] = [];
  const step = width / 12;
  for (let x = step / 2; x < width; x += step) {
    const y = baseY + amplitude * Math.sin(frequency * x + phase);
    const derivative = amplitude * frequency * Math.cos(frequency * x + phase);
    // Place foam near crests (where derivative crosses zero going negative = peaks)
    if (Math.abs(derivative) < amplitude * frequency * 0.4) {
      const pulse = 0.5 + 0.5 * Math.sin(foamPhase + x * 0.01);
      arcs.push({ cx: x, cy: y - 2, opacity: pulse });
    }
  }
  return arcs;
}

export const OceanWaves = memo(function OceanWaves() {
  const rafRef = useRef<number>(0);
  const phaseRef = useRef<number[]>(WAVE_CONFIGS.map(() => 0));
  const foamPhaseRef = useRef(0);
  const [, setTick] = useState(0);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) return;

    let lastTime = performance.now();

    const animate = (now: number) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      for (let i = 0; i < WAVE_CONFIGS.length; i++) {
        phaseRef.current[i] += WAVE_CONFIGS[i].speed * dt;
      }
      foamPhaseRef.current += 2.5 * dt;

      setTick((t) => t + 1);
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <svg
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
        aria-hidden="true"
      >
        {WAVE_CONFIGS.map((wave, i) => {
          const phase = phaseRef.current[i];
          const d = buildWavePath(wave.baseY, wave.amplitude, wave.frequency, phase, 1920);
          const foamArcs = buildFoamArcs(
            wave.baseY,
            wave.amplitude,
            wave.frequency,
            phase,
            1920,
            foamPhaseRef.current
          );

          return (
            <g key={i}>
              <path d={d} fill={wave.color} opacity={0.85} />
              {foamArcs.map((arc, j) => (
                <ellipse
                  key={j}
                  cx={arc.cx}
                  cy={arc.cy}
                  rx={18}
                  ry={4}
                  fill={`rgba(255,255,255,${(wave.foamOpacity * arc.opacity).toFixed(3)})`}
                />
              ))}
            </g>
          );
        })}
      </svg>
    </div>
  );
});
