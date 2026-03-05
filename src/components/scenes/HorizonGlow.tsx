import { memo, useEffect, useRef, useState } from "react";

const HorizonGlow = memo(function HorizonGlow() {
  const [opacity, setOpacity] = useState(0.25);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setOpacity(0.25);
      return;
    }

    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = (now - start) / 1000;
      // Oscillate between 0.15 and 0.35 over ~6s
      const value = 0.25 + 0.1 * Math.sin((elapsed * 2 * Math.PI) / 6);
      setOpacity(value);
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-5">
      <div
        className="absolute inset-x-0 bottom-0 h-[15%]"
        style={{
          background: `linear-gradient(to bottom, transparent, rgba(234, 88, 12, ${opacity}), rgba(180, 60, 20, ${opacity}))`,
        }}
      />
    </div>
  );
});

export { HorizonGlow };
