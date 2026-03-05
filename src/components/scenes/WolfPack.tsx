import { memo } from "react";

// Wolf SVG path builder: body + legs + ears + tail + snout
// Returns a single compound path string for a wolf silhouette
// All coordinates are in the wolf's local space, origin at paw-level center.
// Standing wolf body proportions: width ~120, height ~80

function standingWolfPath(): string {
  // Body oval
  // Neck + head
  // Ears (pointed)
  // Snout
  // Front legs
  // Rear legs
  // Tail (curves up and back)
  return [
    // --- Body ---
    "M 30 60",
    "Q 20 40, 30 20",         // left flank up to shoulder
    "Q 45 5, 70 8",           // back of neck / shoulder top
    "Q 100 2, 120 15",        // back to rump
    "Q 130 35, 120 60",       // rump down to rear haunch
    // --- Rear leg right ---
    "Q 118 68, 115 90",
    "Q 114 96, 118 98",
    "Q 110 98, 108 94",
    "Q 105 90, 106 80",
    // --- Rear leg left ---
    "Q 100 65, 96 80",
    "Q 94 90, 98 98",
    "Q 90 98, 88 94",
    "Q 86 90, 88 78",
    "Q 88 65, 85 60",
    // under-belly
    "Q 60 70, 40 65",
    // --- Front leg left ---
    "Q 35 70, 33 85",
    "Q 31 95, 35 98",
    "Q 27 98, 25 94",
    "Q 23 88, 26 78",
    "Q 28 68, 30 60",
    // --- Front leg right ---
    "M 42 65",
    "Q 42 72, 44 85",
    "Q 43 95, 47 98",
    "Q 39 98, 37 94",
    "Q 35 88, 38 78",
    "Q 40 68, 42 65",
    // --- Tail (separate M) ---
    "M 120 18",
    "Q 145 5, 155 -10",
    "Q 158 -18, 150 -20",
    "Q 148 -10, 138 0",
    "Q 130 10, 122 22",
    "Z",
    // --- Head sub-path ---
    "M 30 20",
    "Q 25 12, 22 5",          // front neck to head base
    "Q 18 -5, 20 -12",        // head left side
    // Left ear
    "Q 22 -20, 18 -30",
    "Q 24 -22, 30 -18",
    // Top of skull
    "Q 38 -24, 42 -30",
    // Right ear
    "Q 46 -22, 44 -14",
    "Q 50 -10, 50 -2",        // right side of head
    // Snout
    "Q 54 5, 58 8",
    "Q 55 12, 50 14",
    "Q 56 16, 58 14",
    "Q 60 18, 56 20",
    "Q 48 22, 40 20",
    "Q 34 18, 30 20",
    "Z",
  ].join(" ");
}

function howlingWolfPath(): string {
  // Sitting/howling: rear haunches on ground, head tilted sharply up
  return [
    // --- Body (seated, haunches on ground) ---
    "M 40 80",
    "Q 28 60, 32 30",         // left torso
    "Q 40 8, 60 5",           // shoulder top
    "Q 85 2, 100 18",         // back
    "Q 110 40, 105 75",       // rump
    // --- Rear haunch mass (seated) ---
    "Q 108 85, 118 95",
    "Q 110 100, 100 98",
    "Q 95 88, 98 80",
    "Q 90 88, 85 98",
    "Q 75 100, 72 95",
    "Q 76 84, 80 78",
    "Q 72 82, 55 85",         // belly
    // --- Front legs ---
    "Q 48 80, 44 95",
    "Q 40 100, 44 102",
    "Q 36 102, 34 98",
    "Q 32 90, 36 82",
    "Q 38 82, 40 80",
    "Z",
    // second front leg
    "M 55 85",
    "Q 54 90, 56 102",
    "Q 48 102, 46 98",
    "Q 44 90, 48 84",
    "Q 52 83, 55 85",
    "Z",
    // --- Tail curled behind (separate path) ---
    "M 105 75",
    "Q 130 60, 140 40",
    "Q 148 22, 140 15",
    "Q 136 20, 130 35",
    "Q 124 55, 108 70",
    "Z",
    // --- Head (tilted up sharply, howling pose) ---
    "M 32 30",
    "Q 20 22, 14 10",         // neck front
    "Q 8 -5, 10 -18",
    // Left ear
    "Q 12 -30, 6 -42",
    "Q 16 -32, 24 -26",
    // Skull top
    "Q 34 -36, 40 -44",
    // Right ear
    "Q 48 -34, 44 -22",
    "Q 50 -14, 52 -4",
    // Snout (pointing up)
    "Q 56 6, 62 12",
    "Q 58 16, 52 16",
    "Q 58 18, 60 16",
    "Q 62 22, 56 24",
    "Q 46 26, 38 24",
    "Q 32 22, 32 30",
    "Z",
  ].join(" ");
}

function walkingWolfPath(): string {
  // Walking pose: one front leg extended forward
  return [
    // Body
    "M 28 55",
    "Q 18 38, 26 18",
    "Q 40 2, 65 5",
    "Q 95 0, 115 14",
    "Q 126 32, 118 58",
    // Rear leg extended back
    "Q 116 65, 120 85",
    "Q 119 93, 123 96",
    "Q 115 96, 112 92",
    "Q 109 85, 110 74",
    // Rear leg forward
    "Q 100 62, 94 74",
    "Q 92 84, 96 96",
    "Q 88 96, 86 92",
    "Q 84 84, 88 72",
    "Q 90 62, 85 57",
    // Belly
    "Q 58 65, 38 60",
    // Front leg extended forward
    "Q 32 65, 28 52",
    "M 28 52",
    "Q 22 60, 16 78",
    "Q 14 88, 18 94",
    "Q 10 94, 8 90",
    "Q 6 82, 10 68",
    "Q 14 58, 18 54",
    // Front leg back
    "M 40 60",
    "Q 42 68, 44 82",
    "Q 43 92, 47 96",
    "Q 39 96, 37 92",
    "Q 35 84, 38 72",
    "Q 39 65, 40 60",
    "Z",
    // Tail
    "M 118 18",
    "Q 142 8, 150 -8",
    "Q 153 -16, 146 -18",
    "Q 143 -8, 134 2",
    "Q 126 12, 120 22",
    "Z",
    // Head (same as standing)
    "M 26 18",
    "Q 21 10, 18 3",
    "Q 14 -8, 16 -15",
    // Left ear
    "Q 18 -24, 14 -34",
    "Q 20 -26, 28 -20",
    // Skull top
    "Q 36 -28, 40 -34",
    // Right ear
    "Q 44 -26, 42 -18",
    "Q 48 -12, 48 -4",
    // Snout
    "Q 52 4, 56 6",
    "Q 53 10, 48 12",
    "Q 54 14, 56 12",
    "Q 58 16, 54 18",
    "Q 46 20, 38 18",
    "Q 30 16, 26 18",
    "Z",
  ].join(" ");
}

export const WolfPack = memo(function WolfPack() {
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <svg
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
        width="100%"
        height="100%"
        style={{ position: "absolute", inset: 0 }}
        aria-hidden="true"
      >
        {/* ------------------------------------------------------------------ */}
        {/* Wolf 1 — Standing, left side, x≈200 y≈720                           */}
        {/* ------------------------------------------------------------------ */}
        <g transform="translate(200, 720) scale(1.0)">
          <path
            d={standingWolfPath()}
            fill="#1e293b"
            opacity="0.5"
          />
          {/* Eyes */}
          <circle cx="24" cy="-6" r="3" fill="#94a3b8">
            {!prefersReducedMotion && (
              <animate
                attributeName="opacity"
                values="0.7;1;0.7"
                dur="3s"
                repeatCount="indefinite"
              />
            )}
          </circle>
          <circle cx="44" cy="-6" r="3" fill="#94a3b8">
            {!prefersReducedMotion && (
              <animate
                attributeName="opacity"
                values="0.7;1;0.7"
                dur="3s"
                begin="0.4s"
                repeatCount="indefinite"
              />
            )}
          </circle>
        </g>

        {/* ------------------------------------------------------------------ */}
        {/* Wolf 2 — Howling, center-right, x≈1500 y≈700                        */}
        {/* Animates head tilt: slow tilt up and back over 8s every ~18s        */}
        {/* ------------------------------------------------------------------ */}
        <g transform="translate(1500, 700) scale(1.0)">
          <path
            d={howlingWolfPath()}
            fill="#1e293b"
            opacity="0.55"
          />
          {/* Eyes — positioned for howling/upward head pose */}
          <circle cx="18" cy="-14" r="3" fill="#94a3b8">
            {!prefersReducedMotion && (
              <animate
                attributeName="opacity"
                values="0.6;1;0.6"
                dur="4s"
                repeatCount="indefinite"
              />
            )}
          </circle>
          <circle cx="38" cy="-14" r="3" fill="#94a3b8">
            {!prefersReducedMotion && (
              <animate
                attributeName="opacity"
                values="0.6;1;0.6"
                dur="4s"
                begin="0.6s"
                repeatCount="indefinite"
              />
            )}
          </circle>
          {/* Howl animation: head group rocks up then returns, triggered every ~18s */}
          {!prefersReducedMotion && (
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="rotate"
              values="0 60 50; -12 60 50; 0 60 50"
              keyTimes="0; 0.44; 1"
              keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
              calcMode="spline"
              dur="8s"
              begin="3s"
              repeatCount="indefinite"
            />
          )}
        </g>

        {/* ------------------------------------------------------------------ */}
        {/* Wolf 3 — Far distance, walking, x≈650 y≈680, scale 0.6              */}
        {/* Slow left-right patrol over 30s                                     */}
        {/* ------------------------------------------------------------------ */}
        <g transform="translate(650, 680) scale(0.6)">
          <path
            d={walkingWolfPath()}
            fill="#1e293b"
            opacity="0.4"
          />
          {/* Eyes */}
          <circle cx="20" cy="-8" r="3" fill="#94a3b8">
            {!prefersReducedMotion && (
              <animate
                attributeName="opacity"
                values="0.5;0.9;0.5"
                dur="5s"
                repeatCount="indefinite"
              />
            )}
          </circle>
          <circle cx="40" cy="-8" r="3" fill="#94a3b8">
            {!prefersReducedMotion && (
              <animate
                attributeName="opacity"
                values="0.5;0.9;0.5"
                dur="5s"
                begin="0.8s"
                repeatCount="indefinite"
              />
            )}
          </circle>
          {/* Slow patrol: translate -80px to +80px and back over 30s */}
          {!prefersReducedMotion && (
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="translate"
              values="0 0; -80 0; 0 0"
              keyTimes="0; 0.5; 1"
              keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
              calcMode="spline"
              dur="30s"
              repeatCount="indefinite"
            />
          )}
        </g>
      </svg>
    </div>
  );
});
