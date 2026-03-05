import { memo } from "react";

export const FrostVignette = memo(function FrostVignette() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <svg
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", height: "100%" }}
      >
        <defs>
          <radialGradient
            id="frost-vignette"
            cx="50%"
            cy="50%"
            r="70%"
            fx="50%"
            fy="50%"
          >
            <stop offset="40%" stopColor="transparent" stopOpacity="0" />
            <stop offset="100%" stopColor="#bfdbfe" stopOpacity="0.18" />
          </radialGradient>

          <filter id="frost-blur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" />
          </filter>
        </defs>

        {/* Radial vignette overlay */}
        <rect
          x="0"
          y="0"
          width="1920"
          height="1080"
          fill="url(#frost-vignette)"
        />

        {/* Top-left corner crystals */}
        <g filter="url(#frost-blur)">
          {/* Crystal TL-1: 6-pointed star at (45, 40) size ~22 */}
          <g opacity="0.15">
            <line x1="45" y1="18" x2="45" y2="62" stroke="white" strokeWidth="1.5" />
            <line x1="26" y1="29" x2="64" y2="51" stroke="white" strokeWidth="1.5" />
            <line x1="64" y1="29" x2="26" y2="51" stroke="white" strokeWidth="1.5" />
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 45 40"
              to="360 45 40"
              dur="60s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.15;0.22;0.12;0.18;0.15"
              dur="14s"
              repeatCount="indefinite"
            />
          </g>

          {/* Crystal TL-2: 6-pointed star at (80, 70) size ~16 */}
          <g opacity="0.12">
            <line x1="80" y1="54" x2="80" y2="86" stroke="white" strokeWidth="1.2" />
            <line x1="66" y1="62" x2="94" y2="78" stroke="white" strokeWidth="1.2" />
            <line x1="94" y1="62" x2="66" y2="78" stroke="white" strokeWidth="1.2" />
            <animate
              attributeName="opacity"
              values="0.12;0.20;0.10;0.16;0.12"
              dur="18s"
              repeatCount="indefinite"
            />
          </g>

          {/* Crystal TL-3: 6-pointed star at (25, 85) size ~15 */}
          <g opacity="0.10">
            <line x1="25" y1="70" x2="25" y2="100" stroke="white" strokeWidth="1.1" />
            <line x1="12" y1="77" x2="38" y2="93" stroke="white" strokeWidth="1.1" />
            <line x1="38" y1="77" x2="12" y2="93" stroke="white" strokeWidth="1.1" />
            <animate
              attributeName="opacity"
              values="0.10;0.18;0.08;0.14;0.10"
              dur="20s"
              repeatCount="indefinite"
            />
          </g>
        </g>

        {/* Top-right corner crystals */}
        <g filter="url(#frost-blur)">
          {/* Crystal TR-1: 6-pointed star at (1875, 45) size ~24 */}
          <g opacity="0.15">
            <line x1="1875" y1="21" x2="1875" y2="69" stroke="white" strokeWidth="1.5" />
            <line x1="1854" y1="33" x2="1896" y2="57" stroke="white" strokeWidth="1.5" />
            <line x1="1896" y1="33" x2="1854" y2="57" stroke="white" strokeWidth="1.5" />
            <animate
              attributeName="opacity"
              values="0.15;0.10;0.20;0.13;0.15"
              dur="16s"
              repeatCount="indefinite"
            />
          </g>

          {/* Crystal TR-2: 6-pointed star at (1840, 80) size ~18 */}
          <g opacity="0.13">
            <line x1="1840" y1="62" x2="1840" y2="98" stroke="white" strokeWidth="1.3" />
            <line x1="1824" y1="71" x2="1856" y2="89" stroke="white" strokeWidth="1.3" />
            <line x1="1856" y1="71" x2="1824" y2="89" stroke="white" strokeWidth="1.3" />
            <animate
              attributeName="opacity"
              values="0.13;0.20;0.09;0.17;0.13"
              dur="12s"
              repeatCount="indefinite"
            />
          </g>

          {/* Crystal TR-3: 6-pointed star at (1895, 90) size ~15 */}
          <g opacity="0.10">
            <line x1="1895" y1="75" x2="1895" y2="105" stroke="white" strokeWidth="1.1" />
            <line x1="1882" y1="82" x2="1908" y2="98" stroke="white" strokeWidth="1.1" />
            <line x1="1908" y1="82" x2="1882" y2="98" stroke="white" strokeWidth="1.1" />
            <animate
              attributeName="opacity"
              values="0.10;0.17;0.08;0.14;0.10"
              dur="19s"
              repeatCount="indefinite"
            />
          </g>
        </g>

        {/* Bottom-left corner crystals */}
        <g filter="url(#frost-blur)">
          {/* Crystal BL-1: 6-pointed star at (50, 1035) size ~22 */}
          <g opacity="0.15">
            <line x1="50" y1="1013" x2="50" y2="1057" stroke="white" strokeWidth="1.5" />
            <line x1="31" y1="1024" x2="69" y2="1046" stroke="white" strokeWidth="1.5" />
            <line x1="69" y1="1024" x2="31" y2="1046" stroke="white" strokeWidth="1.5" />
            <animate
              attributeName="opacity"
              values="0.15;0.22;0.11;0.17;0.15"
              dur="15s"
              repeatCount="indefinite"
            />
          </g>

          {/* Crystal BL-2: 6-pointed star at (85, 1000) size ~17 */}
          <g opacity="0.12">
            <line x1="85" y1="983" x2="85" y2="1017" stroke="white" strokeWidth="1.2" />
            <line x1="70" y1="991" x2="100" y2="1009" stroke="white" strokeWidth="1.2" />
            <line x1="100" y1="991" x2="70" y2="1009" stroke="white" strokeWidth="1.2" />
            <animate
              attributeName="opacity"
              values="0.12;0.19;0.08;0.15;0.12"
              dur="17s"
              repeatCount="indefinite"
            />
          </g>

          {/* Crystal BL-3: 6-pointed star at (20, 1000) size ~14 */}
          <g opacity="0.10">
            <line x1="20" y1="986" x2="20" y2="1014" stroke="white" strokeWidth="1.1" />
            <line x1="8" y1="993" x2="32" y2="1007" stroke="white" strokeWidth="1.1" />
            <line x1="32" y1="993" x2="8" y2="1007" stroke="white" strokeWidth="1.1" />
            <animate
              attributeName="opacity"
              values="0.10;0.16;0.07;0.13;0.10"
              dur="13s"
              repeatCount="indefinite"
            />
          </g>
        </g>

        {/* Bottom-right corner crystals */}
        <g filter="url(#frost-blur)">
          {/* Crystal BR-1: 6-pointed star at (1870, 1038) size ~24 */}
          <g opacity="0.16">
            <line x1="1870" y1="1014" x2="1870" y2="1062" stroke="white" strokeWidth="1.5" />
            <line x1="1849" y1="1026" x2="1891" y2="1050" stroke="white" strokeWidth="1.5" />
            <line x1="1891" y1="1026" x2="1849" y2="1050" stroke="white" strokeWidth="1.5" />
            <animate
              attributeName="opacity"
              values="0.16;0.10;0.22;0.14;0.16"
              dur="11s"
              repeatCount="indefinite"
            />
          </g>

          {/* Crystal BR-2: 6-pointed star at (1835, 1005) size ~18 */}
          <g opacity="0.12">
            <line x1="1835" y1="987" x2="1835" y2="1023" stroke="white" strokeWidth="1.3" />
            <line x1="1819" y1="996" x2="1851" y2="1014" stroke="white" strokeWidth="1.3" />
            <line x1="1851" y1="996" x2="1819" y2="1014" stroke="white" strokeWidth="1.3" />
            <animate
              attributeName="opacity"
              values="0.12;0.19;0.09;0.16;0.12"
              dur="16s"
              repeatCount="indefinite"
            />
          </g>

          {/* Crystal BR-3: 6-pointed star at (1900, 995) size ~15 */}
          <g opacity="0.10">
            <line x1="1900" y1="980" x2="1900" y2="1010" stroke="white" strokeWidth="1.1" />
            <line x1="1887" y1="987" x2="1913" y2="1003" stroke="white" strokeWidth="1.1" />
            <line x1="1913" y1="987" x2="1887" y2="1003" stroke="white" strokeWidth="1.1" />
            <animate
              attributeName="opacity"
              values="0.10;0.18;0.07;0.14;0.10"
              dur="20s"
              repeatCount="indefinite"
            />
          </g>
        </g>
      </svg>
    </div>
  );
});
