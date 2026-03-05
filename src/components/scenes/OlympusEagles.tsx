import { memo, useRef, useEffect, useState, useCallback } from "react";

interface EagleConfig {
  orbitCenterX: number; // vw-based percentage (0-100)
  orbitCenterY: number; // vh-based percentage (20-45)
  orbitRadiusX: number; // vw units
  orbitRadiusY: number; // vh units
  orbitSpeed: number; // seconds per full circle (20-30)
  clockwise: boolean;
  startAngle: number; // radians
  size: number; // px width (55-65)
  flapSpeed: number; // seconds per flap cycle (0.8-1.2)
  opacity: number; // 0.4-0.55
}

const EAGLE_CONFIGS: EagleConfig[] = [
  {
    orbitCenterX: 30,
    orbitCenterY: 25,
    orbitRadiusX: 20,
    orbitRadiusY: 8,
    orbitSpeed: 24,
    clockwise: true,
    startAngle: 0,
    size: 60,
    flapSpeed: 1.0,
    opacity: 0.5,
  },
  {
    orbitCenterX: 65,
    orbitCenterY: 35,
    orbitRadiusX: 18,
    orbitRadiusY: 6,
    orbitSpeed: 28,
    clockwise: false,
    startAngle: Math.PI * 0.6,
    size: 55,
    flapSpeed: 0.9,
    opacity: 0.45,
  },
  {
    orbitCenterX: 48,
    orbitCenterY: 22,
    orbitRadiusX: 25,
    orbitRadiusY: 10,
    orbitSpeed: 22,
    clockwise: true,
    startAngle: Math.PI * 1.3,
    size: 65,
    flapSpeed: 1.2,
    opacity: 0.4,
  },
];

function getEaglePath(flapPhase: number): string {
  // flapPhase: 0 to 1
  // Broad, majestic wing movement
  const wingLift = Math.sin(flapPhase * Math.PI * 2) * 4;

  // Eagle shape: wide outstretched wings, hooked beak, fan tail
  // Viewbox is 0 0 70 35, centered around (35, 17)
  const lwy = 8 - wingLift; // left wing tip y
  const rwy = 8 + wingLift; // right wing tip y

  return [
    // Left wing tip
    `M 0 ${lwy}`,
    // Left wing leading edge curves to shoulder
    `Q 8 ${lwy - 2}, 16 ${lwy + 3}`,
    `Q 22 ${lwy + 6}, 27 14`,
    // Neck up to head
    `Q 29 10, 31 9`,
    // Hooked beak
    `L 34 7`,
    `Q 35 8, 34 10`,
    `L 33 11`,
    // Head back to right shoulder
    `Q 35 10, 38 12`,
    `Q 40 13, 43 14`,
    // Right wing leading edge
    `Q 48 ${rwy + 6}, 54 ${rwy + 3}`,
    `Q 62 ${rwy - 2}, 70 ${rwy}`,
    // Right wing trailing edge
    `Q 63 ${rwy + 5}, 56 ${rwy + 8}`,
    `Q 50 20, 44 19`,
    // Body underside to tail
    `Q 42 22, 43 26`,
    `Q 40 28, 38 30`,
    `L 35 27`,
    `L 32 30`,
    `Q 30 28, 27 26`,
    `Q 28 22, 26 19`,
    // Left wing trailing edge
    `Q 20 20, 14 ${lwy + 8}`,
    `Q 7 ${lwy + 5}, 0 ${lwy}`,
    `Z`,
  ].join(" ");
}

const Eagle = memo(function Eagle({ config }: { config: EagleConfig }) {
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
        const radiusXpx =
          (config.orbitRadiusX / 100) * window.innerWidth;
        const radiusYpx =
          (config.orbitRadiusY / 100) * window.innerHeight;
        posRef.current = {
          x: Math.cos(angle) * radiusXpx,
          y: Math.sin(angle) * radiusYpx,
          flapPhase: 0,
        };
        setTick((t) => t + 1);
        return;
      }

      const direction = config.clockwise ? 1 : -1;
      const angle =
        config.startAngle +
        direction * ((elapsed * Math.PI * 2) / config.orbitSpeed);

      const radiusXpx =
        (config.orbitRadiusX / 100) * window.innerWidth;
      const radiusYpx =
        (config.orbitRadiusY / 100) * window.innerHeight;

      const flapPhase = (elapsed % config.flapSpeed) / config.flapSpeed;

      posRef.current = {
        x: Math.cos(angle) * radiusXpx,
        y: Math.sin(angle) * radiusYpx,
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

  // Face direction of travel based on horizontal velocity (scaleX flip)
  const direction = config.clockwise ? 1 : -1;
  const elapsed =
    (performance.now() - (startTimeRef.current || performance.now())) / 1000;
  const currentAngle =
    config.startAngle +
    direction * ((elapsed * Math.PI * 2) / config.orbitSpeed);
  // Horizontal velocity sign: -sin(angle) for clockwise
  const vx = -Math.sin(currentAngle) * direction;
  const facingLeft = vx < 0;

  return (
    <svg
      width={config.size}
      height={config.size * 0.5}
      viewBox="0 0 70 35"
      style={{
        position: "absolute",
        left: `calc(${centerX} + ${x}px - ${config.size / 2}px)`,
        top: `calc(${centerY} + ${y}px - ${(config.size * 0.5) / 2}px)`,
        transform: facingLeft ? "scaleX(-1)" : "scaleX(1)",
      }}
    >
      <path
        d={getEaglePath(flapPhase)}
        fill={`rgba(120, 80, 20, ${config.opacity})`}
      />
    </svg>
  );
});

export const OlympusEagles = memo(function OlympusEagles() {
  return (
    <div className="pointer-events-none absolute inset-0 z-10">
      {EAGLE_CONFIGS.map((config, i) => (
        <Eagle key={i} config={config} />
      ))}
    </div>
  );
});
