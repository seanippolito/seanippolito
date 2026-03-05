import { memo, useRef, useEffect, useState } from "react";

const RAINBOW_BANDS = [
  { color: "rgba(255,80,80, 0.08)", radiusOffset: 0 },
  { color: "rgba(255,160,60, 0.08)", radiusOffset: 1 },
  { color: "rgba(255,230,80, 0.09)", radiusOffset: 2 },
  { color: "rgba(100,220,100, 0.08)", radiusOffset: 3 },
  { color: "rgba(80,140,255, 0.08)", radiusOffset: 4 },
  { color: "rgba(100,80,200, 0.07)", radiusOffset: 5 },
  { color: "rgba(160,80,200, 0.07)", radiusOffset: 6 },
];

const BASE_STROKE = 7;
const BAND_SPACING = 10;

function buildArcPath(radiusOffset: number): string {
  const yLift = radiusOffset * BAND_SPACING;
  const cpY = 200 - yLift;
  return `M 350 600 Q 960 ${cpY} 1570 600`;
}

export const RainbowBridge = memo(function RainbowBridge() {
  const rafRef = useRef<number>(0);
  const [opacity, setOpacity] = useState(0.6);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mql.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setOpacity(0.6);
      return;
    }

    let start: number | null = null;
    const period = 10000; // 10 seconds full cycle

    const tick = (timestamp: number) => {
      if (start === null) start = timestamp;
      const elapsed = timestamp - start;
      const t = Math.sin((elapsed / period) * Math.PI * 2);
      // Oscillate between 0.4 and 0.8
      const value = 0.6 + t * 0.2;
      setOpacity(value);
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [reducedMotion]);

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <svg
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
      >
        <g opacity={opacity}>
          {RAINBOW_BANDS.map((band, i) => (
            <path
              key={i}
              d={buildArcPath(band.radiusOffset)}
              stroke={band.color}
              strokeWidth={BASE_STROKE}
              fill="none"
              strokeLinecap="round"
            />
          ))}
        </g>
      </svg>
    </div>
  );
});
