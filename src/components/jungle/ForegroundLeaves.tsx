export function ForegroundLeaves() {
  return (
    <svg viewBox="0 0 1920 1080" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <filter id="leaf-blur">
          <feGaussianBlur stdDeviation="2" />
        </filter>
      </defs>
      <ellipse cx="-20" cy="1000" rx="200" ry="100" fill="#1a5a1a" opacity="0.8" transform="rotate(-30 -20 1000)" filter="url(#leaf-blur)" />
      <ellipse cx="1940" cy="950" rx="180" ry="90" fill="#1a5a1a" opacity="0.8" transform="rotate(25 1940 950)" filter="url(#leaf-blur)" />
      <ellipse cx="50" cy="30" rx="150" ry="80" fill="#1a5a1a" opacity="0.6" transform="rotate(20 50 30)" filter="url(#leaf-blur)" />
      <ellipse cx="1880" cy="50" rx="130" ry="70" fill="#1a5a1a" opacity="0.6" transform="rotate(-15 1880 50)" filter="url(#leaf-blur)" />
    </svg>
  )
}
