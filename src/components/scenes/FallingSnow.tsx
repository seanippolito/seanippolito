import { memo, useEffect, useRef } from "react";

interface Snowflake {
  x: number;
  y: number;
  radius: number;
  speedY: number;
  speedX: number;
  wobbleOffset: number;
  wobbleSpeed: number;
  layer: "near" | "far";
}

function createFlake(
  canvasWidth: number,
  canvasHeight: number,
  layer: "near" | "far",
  startY?: number
): Snowflake {
  const isFar = layer === "far";
  const radius = isFar
    ? 1 + Math.random()
    : 3 + Math.random() * 2;
  const speedY = isFar
    ? 30 + Math.random() * 50
    : 60 + Math.random() * 60;
  const speedX = (Math.random() - 0.5) * 20;

  return {
    x: Math.random() * canvasWidth,
    y: startY !== undefined ? startY : Math.random() * canvasHeight,
    radius,
    speedY,
    speedX,
    wobbleOffset: Math.random() * Math.PI * 2,
    wobbleSpeed: 0.5 + Math.random() * 1.0,
    layer,
  };
}

export const FallingSnow = memo(function FallingSnow({
  windIntensity,
}: {
  windIntensity: number;
}) {
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const flakesRef = useRef<Snowflake[]>([]);
  const rafRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const lastDrawTimeRef = useRef<number>(0);
  const windRef = useRef<number>(windIntensity);

  useEffect(() => {
    windRef.current = windIntensity;
  }, [windIntensity]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const mobile = window.matchMedia("(pointer: coarse)").matches;
    const mobileScale = mobile ? 0.35 : 1;
    const totalFlakes = Math.floor((150 + Math.floor(Math.random() * 51)) * mobileScale);
    const farCount = Math.floor(totalFlakes * 0.6);
    const nearCount = totalFlakes - farCount;

    const flakes: Snowflake[] = [];
    for (let i = 0; i < farCount; i++) {
      flakes.push(createFlake(canvas.width, canvas.height, "far"));
    }
    for (let i = 0; i < nearCount; i++) {
      flakes.push(createFlake(canvas.width, canvas.height, "near"));
    }
    flakesRef.current = flakes;

    const blizzardFlakes: Snowflake[] = [];

    const blizzardMax = Math.floor(60 * (mobile ? 0.3 : 1));

    const draw = (timestamp: number) => {
      // Throttle to ~30fps on mobile
      if (mobile && timestamp - lastDrawTimeRef.current < 33) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }
      lastDrawTimeRef.current = timestamp;

      const delta = lastTimeRef.current === 0
        ? 0.016
        : (timestamp - lastTimeRef.current) / 1000;
      lastTimeRef.current = timestamp;

      const wind = windRef.current;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const allFlakes =
        wind > 0.7
          ? [...flakesRef.current, ...blizzardFlakes]
          : flakesRef.current;

      if (wind > 0.7 && blizzardFlakes.length < blizzardMax) {
        const needed = blizzardMax - blizzardFlakes.length;
        const toAdd = Math.min(needed, 3);
        for (let i = 0; i < toAdd; i++) {
          blizzardFlakes.push(
            createFlake(canvas.width, canvas.height, "far", -5)
          );
        }
      } else if (wind <= 0.7 && blizzardFlakes.length > 0) {
        blizzardFlakes.splice(0, blizzardFlakes.length);
      }

      for (const flake of allFlakes) {
        const windDrift = wind * -80;
        const wobble = Math.sin(
          (timestamp / 1000) * flake.wobbleSpeed + flake.wobbleOffset
        ) * 15;

        flake.x +=
          (flake.speedX + wobble * delta + windDrift * delta);
        flake.y += flake.speedY * delta;

        if (flake.y > canvas.height + flake.radius) {
          flake.y = -flake.radius;
          flake.x = Math.random() * canvas.width;
        }
        if (flake.x > canvas.width + flake.radius) {
          flake.x = -flake.radius;
        } else if (flake.x < -flake.radius) {
          flake.x = canvas.width + flake.radius;
        }

        const alpha = flake.layer === "far" ? 0.6 : 0.9;
        ctx.beginPath();
        ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      lastTimeRef.current = 0;
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 10,
      }}
    />
  );
});
