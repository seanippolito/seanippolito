import { memo } from "react";

/**
 * Beach-themed seagull silhouettes soaring across the sky in wide looping paths,
 * with subtle wing-flap animation. Purely declarative SVG animations — no JS RAF loop.
 */
export const TropicalBirds = memo(function TropicalBirds() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .tropical-bird-motion,
          .tropical-bird-flap {
            animation: none !important;
          }
          .tropical-bird-motion animate,
          .tropical-bird-motion animateTransform {
            display: none;
          }
        }
      `}</style>

      <svg
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
      >
        {/* Seagull 1 — wide horizontal figure-8 across upper sky */}
        <g className="tropical-bird-motion" opacity="0.35">
          <path fill="rgba(30,30,30,0.4)">
            <animate
              attributeName="d"
              dur="0.6s"
              repeatCount="indefinite"
              values="
                M 0,0 l-8,-6 l4,6 l-4,6 l8,-6 z;
                M 0,0 l-8,-2 l4,2 l-4,2 l8,-2 z;
                M 0,0 l-8,-6 l4,6 l-4,6 l8,-6 z
              "
            />
            <animateTransform
              attributeName="transform"
              type="translate"
              dur="12s"
              repeatCount="indefinite"
              values="
                200,120;
                600,100;
                960,140;
                1400,90;
                1750,130;
                1400,160;
                960,100;
                600,150;
                200,120
              "
              calcMode="spline"
              keySplines="
                0.4 0 0.2 1;
                0.4 0 0.2 1;
                0.4 0 0.2 1;
                0.4 0 0.2 1;
                0.4 0 0.2 1;
                0.4 0 0.2 1;
                0.4 0 0.2 1;
                0.4 0 0.2 1
              "
            />
          </path>
        </g>

        {/* Seagull 2 — slower, higher arc */}
        <g className="tropical-bird-motion" opacity="0.3">
          <path fill="rgba(30,30,30,0.4)">
            <animate
              attributeName="d"
              dur="0.5s"
              repeatCount="indefinite"
              values="
                M 0,0 l-8,-6 l4,6 l-4,6 l8,-6 z;
                M 0,0 l-8,-2 l4,2 l-4,2 l8,-2 z;
                M 0,0 l-8,-6 l4,6 l-4,6 l8,-6 z
              "
            />
            <animateTransform
              attributeName="transform"
              type="translate"
              dur="15s"
              repeatCount="indefinite"
              values="
                1800,90;
                1300,110;
                960,80;
                500,130;
                100,100;
                500,85;
                960,140;
                1300,95;
                1800,90
              "
              calcMode="spline"
              keySplines="
                0.4 0 0.2 1;
                0.4 0 0.2 1;
                0.4 0 0.2 1;
                0.4 0 0.2 1;
                0.4 0 0.2 1;
                0.4 0 0.2 1;
                0.4 0 0.2 1;
                0.4 0 0.2 1
              "
            />
          </path>
        </g>

        {/* Seagull 3 — fastest, mid-height elliptical path */}
        <g className="tropical-bird-motion" opacity="0.45">
          <path fill="rgba(30,30,30,0.4)">
            <animate
              attributeName="d"
              dur="0.45s"
              repeatCount="indefinite"
              values="
                M 0,0 l-8,-6 l4,6 l-4,6 l8,-6 z;
                M 0,0 l-8,-2 l4,2 l-4,2 l8,-2 z;
                M 0,0 l-8,-6 l4,6 l-4,6 l8,-6 z
              "
            />
            <animateTransform
              attributeName="transform"
              type="translate"
              dur="8s"
              repeatCount="indefinite"
              values="
                100,200;
                500,170;
                960,250;
                1400,180;
                1820,220;
                1400,240;
                960,190;
                500,230;
                100,200
              "
              calcMode="spline"
              keySplines="
                0.4 0 0.2 1;
                0.4 0 0.2 1;
                0.4 0 0.2 1;
                0.4 0 0.2 1;
                0.4 0 0.2 1;
                0.4 0 0.2 1;
                0.4 0 0.2 1;
                0.4 0 0.2 1
              "
            />
          </path>
        </g>
      </svg>
    </div>
  );
});
