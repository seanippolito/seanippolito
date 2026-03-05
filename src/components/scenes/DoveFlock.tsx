import { memo, useRef, useEffect, useState, useCallback } from "react";

interface FlockState {
  x: number; // current leader x in vw (updated each frame)
  y0: number; // initial leader y in vh (never mutated)
  startTime: number; // timestamp when flock spawned
  fromLeft: boolean; // true = enters from left
  birdCount: number; // 5-7
  yDrift: number; // total y drift over crossing in vh (-5 to 5)
}

function getDovePath(flapPhase: number): string {
  // flapPhase: 0 to 1
  const wingLift = Math.sin(flapPhase * Math.PI * 2) * 3;

  const leftWingY = 4 - wingLift;
  const rightWingY = 4 + wingLift;

  return [
    // Body (teardrop)
    `M 10,8`,
    `Q 5,6 0,8`,
    `Q 5,10 10,8`,
    // Left wing
    `M 4,8`,
    `Q 2,${leftWingY} 0,${leftWingY - 1}`,
    `Q 3,${leftWingY + 2} 5,8`,
    // Right wing
    `M 6,8`,
    `Q 8,${rightWingY} 10,${rightWingY - 1}`,
    `Q 7,${rightWingY + 2} 5,8`,
  ].join(" ");
}

function randomBetween(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

function createFlock(timestamp: number): FlockState {
  const fromLeft = Math.random() > 0.5;
  return {
    x: fromLeft ? -10 : 110,
    y0: randomBetween(10, 35),
    startTime: timestamp,
    fromLeft,
    birdCount: Math.floor(randomBetween(5, 8)), // 5, 6, or 7
    yDrift: randomBetween(-5, 5),
  };
}

/** Compute current leader position from elapsed time. */
function getFlockPosition(flock: FlockState, timestamp: number) {
  const elapsed = (timestamp - flock.startTime) / 1000; // seconds
  const speed = 4.8; // vw per second
  const totalDistance = 120; // vw span from -10 to 110
  const progressVw = elapsed * speed;
  const crossFraction = Math.min(progressVw / totalDistance, 1);

  const x = flock.fromLeft ? -10 + progressVw : 110 - progressVw;
  const y = flock.y0 + flock.yDrift * crossFraction;
  const exited = flock.fromLeft ? x > 110 : x < -10;

  return { x, y, elapsed, exited };
}

export const DoveFlock = memo(function DoveFlock() {
  const flockRef = useRef<FlockState | null>(null);
  const rafRef = useRef<number>(0);
  const nextSpawnRef = useRef<number>(0);
  const reducedMotionRef = useRef(false);
  const [, setTick] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotionRef.current = mq.matches;
    const handler = (e: MediaQueryListEvent) => {
      reducedMotionRef.current = e.matches;
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const animate = useCallback((timestamp: number) => {
    if (reducedMotionRef.current) {
      rafRef.current = requestAnimationFrame(animate);
      return;
    }

    // Initialize spawn timer on first frame
    if (nextSpawnRef.current === 0) {
      nextSpawnRef.current = timestamp + randomBetween(12000, 20000);
    }

    // Spawn new flock if none active and timer has elapsed
    if (!flockRef.current && timestamp >= nextSpawnRef.current) {
      flockRef.current = createFlock(timestamp);
    }

    // Check if active flock has exited
    if (flockRef.current) {
      const { exited } = getFlockPosition(flockRef.current, timestamp);
      if (exited) {
        flockRef.current = null;
        nextSpawnRef.current = timestamp + randomBetween(12000, 20000);
      }
    }

    setTick((t) => t + 1);
    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [animate]);

  const flock = flockRef.current;
  if (!flock) {
    return <div className="pointer-events-none absolute inset-0 z-10" />;
  }

  const now = performance.now();
  const { x, y, elapsed } = getFlockPosition(flock, now);

  const birds = [];
  for (let i = 0; i < flock.birdCount; i++) {
    // V-formation: leader at index 0, others fan out behind
    const dxPx = -i * 8; // px offset behind leader
    const dyPx = (i % 2 === 0 ? -1 : 1) * i * 5; // px, alternating above/below

    // Flip horizontal offset if flying right-to-left so V trails behind
    const adjustedDx = flock.fromLeft ? dxPx : -dxPx;

    // Stagger flap phase per bird for natural look (~3Hz flap)
    const flapCycle = 0.33; // seconds per full flap
    const flapPhase = ((elapsed + i * 0.07) % flapCycle) / flapCycle;

    // Leader slightly more opaque than followers
    const opacity = i === 0 ? 0.7 : 0.55;

    birds.push(
      <svg
        key={i}
        width={20}
        height={16}
        viewBox="0 0 20 16"
        style={{
          position: "absolute",
          left: `calc(${x}vw + ${adjustedDx}px - 10px)`,
          top: `calc(${y}vh + ${dyPx}px - 8px)`,
          transform: flock.fromLeft ? "scaleX(1)" : "scaleX(-1)",
        }}
      >
        <path
          d={getDovePath(flapPhase)}
          fill={`rgba(255,255,255,${opacity})`}
        />
      </svg>
    );
  }

  return (
    <div className="pointer-events-none absolute inset-0 z-10">{birds}</div>
  );
});
