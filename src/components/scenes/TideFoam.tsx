import { memo, useEffect, useRef, useState } from "react";

const FOAM_BASE_Y = 765;
const FOAM_AMPLITUDE = 25;
const FOAM_PERIOD = 9; // seconds for one full oscillation
const FOAM_WAVE_FREQ = 0.008; // horizontal waviness frequency
const FOAM_WAVE_AMP = 6; // horizontal waviness amplitude

interface BubbleCluster {
  /** Horizontal anchor along the foam line (0-1920) */
  anchorX: number;
  /** Phase offset so clusters don't all pulse in sync */
  phaseOffset: number;
  bubbles: { dx: number; dy: number; r: number }[];
}

const BUBBLE_CLUSTERS: BubbleCluster[] = [
  {
    anchorX: 380,
    phaseOffset: 0,
    bubbles: [
      { dx: 0, dy: -4, r: 3 },
      { dx: 8, dy: -2, r: 2 },
      { dx: -6, dy: -6, r: 2.5 },
      { dx: 4, dy: -8, r: 1.8 },
    ],
  },
  {
    anchorX: 960,
    phaseOffset: 2.1,
    bubbles: [
      { dx: -3, dy: -5, r: 2.5 },
      { dx: 5, dy: -3, r: 3 },
      { dx: 10, dy: -7, r: 2 },
    ],
  },
  {
    anchorX: 1540,
    phaseOffset: 4.3,
    bubbles: [
      { dx: 0, dy: -3, r: 2.8 },
      { dx: -7, dy: -6, r: 2 },
      { dx: 6, dy: -5, r: 2.2 },
      { dx: -2, dy: -9, r: 1.5 },
    ],
  },
];

function buildFoamPath(tideOffset: number, time: number): string {
  const width = 1920;
  const steps = 64;
  const dx = width / steps;
  const baseY = FOAM_BASE_Y + tideOffset;

  let d = "";
  for (let i = 0; i <= steps; i++) {
    const x = i * dx;
    const waviness = FOAM_WAVE_AMP * Math.sin(FOAM_WAVE_FREQ * x + time * 0.5);
    const y = baseY + waviness;
    d += i === 0 ? `M${x.toFixed(1)} ${y.toFixed(2)}` : ` L${x.toFixed(1)} ${y.toFixed(2)}`;
  }
  return d;
}

function getFoamYAt(x: number, tideOffset: number, time: number): number {
  const baseY = FOAM_BASE_Y + tideOffset;
  return baseY + FOAM_WAVE_AMP * Math.sin(FOAM_WAVE_FREQ * x + time * 0.5);
}

export const TideFoam = memo(function TideFoam() {
  const rafRef = useRef<number>(0);
  const timeRef = useRef(0);
  const [, setTick] = useState(0);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) return;

    let lastTime = performance.now();

    const animate = (now: number) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;
      timeRef.current += dt;
      setTick((t) => t + 1);
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const time = timeRef.current;
  const tidePhase = (2 * Math.PI * time) / FOAM_PERIOD;
  const tideOffset = FOAM_AMPLITUDE * Math.sin(tidePhase);
  const foamPath = buildFoamPath(tideOffset, time);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <svg
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
        aria-hidden="true"
      >
        {/* Main foam line */}
        <path
          d={foamPath}
          fill="none"
          stroke="rgba(255,255,255,0.35)"
          strokeWidth={2.5}
          strokeLinecap="round"
        />

        {/* Secondary foam line slightly offset for depth */}
        <path
          d={buildFoamPath(tideOffset + 4, time + 1.2)}
          fill="none"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth={1.5}
          strokeLinecap="round"
        />

        {/* Bubble clusters that follow the foam line */}
        {BUBBLE_CLUSTERS.map((cluster, ci) => {
          const foamY = getFoamYAt(cluster.anchorX, tideOffset, time);
          const clusterPulse = 0.6 + 0.4 * Math.sin(time * 0.8 + cluster.phaseOffset);

          return (
            <g key={ci} opacity={clusterPulse}>
              {cluster.bubbles.map((b, bi) => (
                <circle
                  key={bi}
                  cx={cluster.anchorX + b.dx}
                  cy={foamY + b.dy}
                  r={b.r}
                  fill="rgba(255,255,255,0.2)"
                />
              ))}
            </g>
          );
        })}
      </svg>
    </div>
  );
});
