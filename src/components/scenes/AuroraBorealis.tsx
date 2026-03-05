import { memo } from "react";

export const AuroraBorealis = memo(function AuroraBorealis() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <svg
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", height: "100%" }}
      >
        <defs>
          {/* Blur filters */}
          <filter id="aurora-blur-green" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="10" />
          </filter>
          <filter id="aurora-blur-teal" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="12" />
          </filter>
          <filter id="aurora-blur-purple" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" />
          </filter>

          {/* Green ribbon gradient — fades at left and right edges */}
          <linearGradient id="grad-green" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#34d399" stopOpacity="0">
              <animate
                attributeName="stop-opacity"
                values="0;0;0"
                dur="20s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="15%" stopColor="#34d399" stopOpacity="1">
              <animate
                attributeName="stop-color"
                values="#34d399;#06b6d4;#34d399"
                dur="20s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="85%" stopColor="#34d399" stopOpacity="1">
              <animate
                attributeName="stop-color"
                values="#34d399;#06b6d4;#34d399"
                dur="20s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="100%" stopColor="#34d399" stopOpacity="0">
              <animate
                attributeName="stop-opacity"
                values="0;0;0"
                dur="20s"
                repeatCount="indefinite"
              />
            </stop>
          </linearGradient>

          {/* Teal ribbon gradient */}
          <linearGradient id="grad-teal" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
            <stop offset="20%" stopColor="#06b6d4" stopOpacity="1">
              <animate
                attributeName="stop-color"
                values="#06b6d4;#34d399;#8b5cf6;#06b6d4"
                dur="18s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="80%" stopColor="#06b6d4" stopOpacity="1">
              <animate
                attributeName="stop-color"
                values="#06b6d4;#34d399;#8b5cf6;#06b6d4"
                dur="18s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
          </linearGradient>

          {/* Purple ribbon gradient */}
          <linearGradient id="grad-purple" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0" />
            <stop offset="10%" stopColor="#8b5cf6" stopOpacity="1">
              <animate
                attributeName="stop-color"
                values="#8b5cf6;#06b6d4;#8b5cf6"
                dur="25s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="90%" stopColor="#8b5cf6" stopOpacity="1">
              <animate
                attributeName="stop-color"
                values="#8b5cf6;#06b6d4;#8b5cf6"
                dur="25s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Green aurora ribbon — primary band across upper third */}
        <path
          fill="url(#grad-green)"
          filter="url(#aurora-blur-green)"
          opacity="0.20"
          d="M-100,120 C200,80 480,160 720,100 C960,40 1200,140 1440,90 C1680,40 1820,110 2020,80 L2020,200 C1820,230 1680,160 1440,210 C1200,260 960,160 720,220 C480,280 200,200 -100,240 Z"
        >
          <animate
            attributeName="d"
            dur="20s"
            repeatCount="indefinite"
            values="
              M-100,120 C200,80 480,160 720,100 C960,40 1200,140 1440,90 C1680,40 1820,110 2020,80 L2020,200 C1820,230 1680,160 1440,210 C1200,260 960,160 720,220 C480,280 200,200 -100,240 Z;
              M-100,100 C200,140 480,80 720,130 C960,180 1200,80 1440,120 C1680,160 1820,90 2020,110 L2020,220 C1820,200 1680,250 1440,230 C1200,210 960,280 720,240 C480,200 200,260 -100,220 Z;
              M-100,120 C200,80 480,160 720,100 C960,40 1200,140 1440,90 C1680,40 1820,110 2020,80 L2020,200 C1820,230 1680,160 1440,210 C1200,260 960,160 720,220 C480,280 200,200 -100,240 Z
            "
          />
          <animate
            attributeName="opacity"
            values="0.15;0.25;0.18;0.10;0.22;0.15"
            dur="12s"
            repeatCount="indefinite"
          />
        </path>

        {/* Teal aurora ribbon — shifted up and slightly overlapping green */}
        <path
          fill="url(#grad-teal)"
          filter="url(#aurora-blur-teal)"
          opacity="0.18"
          d="M-100,60 C300,30 600,110 900,55 C1150,10 1400,80 1650,45 C1800,25 1900,60 2020,40 L2020,160 C1900,180 1800,145 1650,165 C1400,200 1150,130 900,175 C600,230 300,150 -100,180 Z"
        >
          <animate
            attributeName="d"
            dur="15s"
            repeatCount="indefinite"
            values="
              M-100,60 C300,30 600,110 900,55 C1150,10 1400,80 1650,45 C1800,25 1900,60 2020,40 L2020,160 C1900,180 1800,145 1650,165 C1400,200 1150,130 900,175 C600,230 300,150 -100,180 Z;
              M-100,80 C300,110 600,50 900,90 C1150,130 1400,60 1650,95 C1800,120 1900,80 2020,70 L2020,190 C1900,210 1800,180 1650,200 C1400,230 1150,170 900,205 C600,250 300,180 -100,210 Z;
              M-100,60 C300,30 600,110 900,55 C1150,10 1400,80 1650,45 C1800,25 1900,60 2020,40 L2020,160 C1900,180 1800,145 1650,165 C1400,200 1150,130 900,175 C600,230 300,150 -100,180 Z
            "
          />
          <animate
            attributeName="opacity"
            values="0.18;0.10;0.25;0.20;0.12;0.18"
            dur="9s"
            repeatCount="indefinite"
          />
        </path>

        {/* Purple aurora ribbon — higher up, overlaps both other ribbons at edges */}
        <path
          fill="url(#grad-purple)"
          filter="url(#aurora-blur-purple)"
          opacity="0.22"
          d="M-100,50 C250,10 550,90 850,35 C1100,-10 1350,70 1600,30 C1750,5 1880,40 2020,20 L2020,130 C1880,150 1750,120 1600,150 C1350,190 1100,110 850,155 C550,210 250,130 -100,170 Z"
        >
          <animate
            attributeName="d"
            dur="25s"
            repeatCount="indefinite"
            values="
              M-100,50 C250,10 550,90 850,35 C1100,-10 1350,70 1600,30 C1750,5 1880,40 2020,20 L2020,130 C1880,150 1750,120 1600,150 C1350,190 1100,110 850,155 C550,210 250,130 -100,170 Z;
              M-100,70 C250,100 550,30 850,75 C1100,120 1350,40 1600,80 C1750,110 1880,70 2020,55 L2020,165 C1880,185 1750,160 1600,190 C1350,225 1100,150 850,195 C550,245 250,165 -100,205 Z;
              M-100,55 C250,20 550,100 850,42 C1100,-5 1350,75 1600,35 C1750,8 1880,45 2020,25 L2020,140 C1880,160 1750,128 1600,158 C1350,198 1100,118 850,163 C550,218 250,138 -100,178 Z;
              M-100,50 C250,10 550,90 850,35 C1100,-10 1350,70 1600,30 C1750,5 1880,40 2020,20 L2020,130 C1880,150 1750,120 1600,150 C1350,190 1100,110 850,155 C550,210 250,130 -100,170 Z
            "
          />
          <animate
            attributeName="opacity"
            values="0.22;0.12;0.25;0.15;0.20;0.22"
            dur="11s"
            repeatCount="indefinite"
          />
        </path>
      </svg>

      {/* Suppress all SMIL animations when prefers-reduced-motion is set */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          svg animate,
          svg animateTransform {
            display: none;
          }
        }
      `}</style>
    </div>
  );
});
