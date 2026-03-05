import { memo } from "react";

interface Streak {
  y: number;
  width: number;
  height: number;
  opacity: number;
  duration: number;
  delay: number;
  wobble: number;
}

const STREAKS: Streak[] = [
  { y: 42,  width: 320, height: 1, opacity: 0.22, duration: 2.4, delay: 0.0,  wobble: 3  },
  { y: 118, width: 180, height: 2, opacity: 0.15, duration: 3.8, delay: 0.6,  wobble: -4 },
  { y: 195, width: 400, height: 1, opacity: 0.28, duration: 2.1, delay: 1.2,  wobble: 2  },
  { y: 257, width: 140, height: 1, opacity: 0.12, duration: 4.5, delay: 0.3,  wobble: -2 },
  { y: 310, width: 260, height: 2, opacity: 0.20, duration: 3.1, delay: 2.1,  wobble: 5  },
  { y: 372, width: 100, height: 1, opacity: 0.10, duration: 4.9, delay: 0.9,  wobble: -3 },
  { y: 430, width: 380, height: 1, opacity: 0.25, duration: 2.7, delay: 1.8,  wobble: 4  },
  { y: 488, width: 210, height: 2, opacity: 0.18, duration: 3.5, delay: 0.4,  wobble: -5 },
  { y: 543, width: 155, height: 1, opacity: 0.13, duration: 4.2, delay: 2.7,  wobble: 2  },
  { y: 601, width: 340, height: 1, opacity: 0.24, duration: 2.9, delay: 1.5,  wobble: -3 },
  { y: 658, width: 120, height: 2, opacity: 0.11, duration: 4.7, delay: 0.7,  wobble: 6  },
  { y: 715, width: 290, height: 1, opacity: 0.19, duration: 3.3, delay: 2.4,  wobble: -4 },
  { y: 774, width: 390, height: 2, opacity: 0.27, duration: 2.3, delay: 1.0,  wobble: 3  },
  { y: 832, width: 165, height: 1, opacity: 0.14, duration: 4.1, delay: 0.2,  wobble: -2 },
  { y: 890, width: 245, height: 1, opacity: 0.21, duration: 3.6, delay: 3.0,  wobble: 5  },
  { y: 945, width: 310, height: 2, opacity: 0.17, duration: 2.8, delay: 1.3,  wobble: -6 },
  { y: 68,  width: 200, height: 1, opacity: 0.16, duration: 4.4, delay: 2.2,  wobble: 4  },
  { y: 503, width: 130, height: 2, opacity: 0.23, duration: 3.0, delay: 0.8,  wobble: -3 },
];

export const BlizzardGusts = memo(function BlizzardGusts({
  windIntensity,
}: {
  windIntensity: number;
}) {
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion || windIntensity <= 0.5) return null;

  const groupOpacity = Math.max(0, (windIntensity - 0.5) * 2);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <svg
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
        style={{ width: "100%", height: "100%" }}
        aria-hidden="true"
      >
        <g opacity={groupOpacity}>
          {STREAKS.map((streak, i) => {
            // Each streak starts just off the right edge and translates to just off the left edge.
            // The wobble value shifts the Y end-position slightly for a subtle vertical drift.
            const startX = 1920 + streak.width;
            const endX = -(streak.width);

            return (
              <rect
                key={i}
                x={startX}
                y={streak.y}
                width={streak.width}
                height={streak.height}
                fill="white"
                opacity={streak.opacity}
                rx={streak.height / 2}
              >
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  from={`0 0`}
                  to={`${endX - startX} ${streak.wobble}`}
                  dur={`${streak.duration}s`}
                  begin={`${streak.delay}s`}
                  repeatCount="indefinite"
                  additive="sum"
                />
              </rect>
            );
          })}
        </g>
      </svg>
    </div>
  );
});
