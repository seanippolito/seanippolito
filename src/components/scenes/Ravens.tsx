import { memo, useRef, useEffect, useState, useCallback } from "react";

interface RavenConfig {
  orbitCenterX: number; // vw-based percentage (0-100)
  orbitCenterY: number; // vh-based percentage (10-30)
  orbitRadiusX: number; // px
  orbitRadiusY: number; // px
  orbitSpeed: number; // seconds per full circle
  clockwise: boolean;
  startAngle: number; // radians
  size: number; // px width
  flapSpeed: number; // seconds per flap cycle
}

const RAVEN_CONFIGS: RavenConfig[] = [
  {
    orbitCenterX: 25,
    orbitCenterY: 15,
    orbitRadiusX: 180,
    orbitRadiusY: 120,
    orbitSpeed: 18,
    clockwise: true,
    startAngle: 0,
    size: 48,
    flapSpeed: 2.2,
  },
  {
    orbitCenterX: 60,
    orbitCenterY: 22,
    orbitRadiusX: 150,
    orbitRadiusY: 100,
    orbitSpeed: 23,
    clockwise: false,
    startAngle: Math.PI * 0.7,
    size: 42,
    flapSpeed: 1.8,
  },
  {
    orbitCenterX: 80,
    orbitCenterY: 12,
    orbitRadiusX: 200,
    orbitRadiusY: 130,
    orbitSpeed: 16,
    clockwise: true,
    startAngle: Math.PI * 1.4,
    size: 46,
    flapSpeed: 2.5,
  },
];

function getRavenPath(flapPhase: number): string {
  // flapPhase: 0 to 1
  // Subtle wing droop variation: wings raise/lower slightly
  const wingDip = Math.sin(flapPhase * Math.PI * 2) * 3;

  // Bird shape: head with beak on left, spread wings, tail on right
  // Viewbox is roughly 0 0 50 30, centered around (25, 15)
  // Left wing tip
  const lwy = 10 + wingDip;
  // Right wing tip
  const rwy = 10 - wingDip;

  return [
    // Left wing tip
    `M 2 ${lwy}`,
    // Left wing curve to body
    `Q 10 ${lwy + 4}, 18 14`,
    // Head
    `Q 19 10, 21 11`,
    // Beak
    `L 24 9`,
    `L 22 12`,
    // Top of head to right wing
    `Q 23 11, 26 13`,
    // Right wing out
    `Q 34 ${rwy + 4}, 48 ${rwy}`,
    // Right wing back edge
    `Q 38 ${rwy + 7}, 30 18`,
    // Tail
    `Q 32 22, 35 26`,
    `Q 30 24, 27 22`,
    `Q 28 25, 30 28`,
    `Q 26 26, 24 20`,
    // Under body back to left wing
    `Q 20 19, 16 18`,
    `Q 10 ${lwy + 7}, 2 ${lwy}`,
    `Z`,
  ].join(" ");
}

const Raven = memo(function Raven({ config }: { config: RavenConfig }) {
  const posRef = useRef({ x: 0, y: 0, flapPhase: 0 });
  const [, setTick] = useState(0);
  const rafRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotionRef.current = mq.matches;
    const handler = (e: MediaQueryListEvent) => {
      reducedMotionRef.current = e.matches;
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const animate = useCallback(
    (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = (timestamp - startTimeRef.current) / 1000;

      if (reducedMotionRef.current) {
        // Static position when reduced motion preferred
        const angle = config.startAngle;
        posRef.current = {
          x: Math.cos(angle) * config.orbitRadiusX,
          y: Math.sin(angle) * config.orbitRadiusY,
          flapPhase: 0,
        };
        setTick((t) => t + 1);
        return;
      }

      const direction = config.clockwise ? 1 : -1;
      const angle =
        config.startAngle +
        direction * ((elapsed * Math.PI * 2) / config.orbitSpeed);

      const flapPhase = (elapsed % config.flapSpeed) / config.flapSpeed;

      posRef.current = {
        x: Math.cos(angle) * config.orbitRadiusX,
        y: Math.sin(angle) * config.orbitRadiusY,
        flapPhase,
      };

      setTick((t) => t + 1);
      rafRef.current = requestAnimationFrame(animate);
    },
    [config]
  );

  useEffect(() => {
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [animate]);

  const { x, y, flapPhase } = posRef.current;
  const centerX = `${config.orbitCenterX}vw`;
  const centerY = `${config.orbitCenterY}vh`;

  // Face direction of travel (flip SVG based on x velocity direction)
  const direction = config.clockwise ? 1 : -1;
  const facingLeft = Math.sin(
    config.startAngle +
      direction *
        (((performance.now() - (startTimeRef.current || performance.now())) /
          1000) *
          Math.PI *
          2) /
        config.orbitSpeed
  ) > 0
    ? config.clockwise
    : !config.clockwise;

  return (
    <svg
      width={config.size}
      height={config.size * 0.6}
      viewBox="0 0 50 30"
      style={{
        position: "absolute",
        left: `calc(${centerX} + ${x}px - ${config.size / 2}px)`,
        top: `calc(${centerY} + ${y}px - ${(config.size * 0.6) / 2}px)`,
        transform: facingLeft ? "scaleX(-1)" : "scaleX(1)",
      }}
    >
      <path
        d={getRavenPath(flapPhase)}
        fill="rgba(10, 3, 3, 0.6)"
      />
    </svg>
  );
});

export const Ravens = memo(function Ravens() {
  return (
    <div className="pointer-events-none absolute inset-0 z-10">
      {RAVEN_CONFIGS.map((config, i) => (
        <Raven key={i} config={config} />
      ))}
    </div>
  );
});
