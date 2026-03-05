import { memo, useRef, useEffect, useState } from "react";

interface RayConfig {
  angle: number;
  width: number;
  length: number;
  baseOpacity: number;
  phaseOffset: number;
  speed: number;
}

const RAYS: RayConfig[] = [
  { angle: -28, width: 18, length: 720, baseOpacity: 0.05, phaseOffset: 0, speed: 1 },
  { angle: -20, width: 24, length: 680, baseOpacity: 0.06, phaseOffset: 0.8, speed: 1 },
  { angle: -12, width: 16, length: 750, baseOpacity: 0.04, phaseOffset: 1.6, speed: 1 },
  { angle: -4, width: 28, length: 700, baseOpacity: 0.07, phaseOffset: 2.4, speed: 1 },
  { angle: 4, width: 26, length: 710, baseOpacity: 0.06, phaseOffset: 3.2, speed: 1 },
  { angle: 12, width: 20, length: 740, baseOpacity: 0.05, phaseOffset: 4.0, speed: 1 },
  { angle: 20, width: 30, length: 650, baseOpacity: 0.07, phaseOffset: 4.8, speed: 1 },
  { angle: 28, width: 22, length: 690, baseOpacity: 0.04, phaseOffset: 5.6, speed: 1 },
];

const SUN_X = 960;
const SUN_Y = 80;

export const GodRays = memo(function GodRays() {
  const rafRef = useRef<number>(0);
  const [opacities, setOpacities] = useState<number[]>(
    () => RAYS.map((r) => r.baseOpacity)
  );
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotionRef.current = mq.matches;

    const onChange = (e: MediaQueryListEvent) => {
      reducedMotionRef.current = e.matches;
    };
    mq.addEventListener("change", onChange);

    if (reducedMotionRef.current) {
      return () => mq.removeEventListener("change", onChange);
    }

    const start = performance.now();

    const tick = (now: number) => {
      if (reducedMotionRef.current) return;

      const elapsed = now - start;
      const next = RAYS.map((ray) => {
        const sine = Math.sin(
          (elapsed * 2 * Math.PI) / 6000 + ray.phaseOffset
        );
        const mapped = ray.baseOpacity * (1 + sine * 0.5);
        return mapped;
      });

      setOpacities(next);
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      mq.removeEventListener("change", onChange);
    };
  }, []);

  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 1920 1080"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      {RAYS.map((ray, i) => (
        <rect
          key={i}
          x={SUN_X - ray.width / 2}
          y={SUN_Y}
          width={ray.width}
          height={ray.length}
          fill={`rgba(255,223,100,${opacities[i]})`}
          transform={`rotate(${ray.angle}, ${SUN_X}, ${SUN_Y})`}
        />
      ))}
    </svg>
  );
});
