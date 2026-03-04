interface AnimalsProps {
  mouseX: number
  mouseY: number
}

export function Animals({ mouseX, mouseY: _mouseY }: AnimalsProps) {
  const parrotRotation = mouseX * 15
  const monkeyOffset = Math.max(0, 1 - Math.abs(mouseX - 0.5) * 3) * 20

  return (
    <svg viewBox="0 0 1920 1080" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <g transform={`translate(250, 380) rotate(${parrotRotation})`} style={{ transition: "transform 0.3s ease-out" }}>
        <ellipse cx="0" cy="0" rx="15" ry="20" fill="#2d8a2d" />
        <ellipse cx="0" cy="-22" rx="10" ry="12" fill="#3a9a3a" />
        <path d="M8 -28 L18 -32 L10 -24Z" fill="#d4a030" />
        <circle cx="-3" cy="-25" r="2" fill="#0a1f0a" />
        <path d="M-5 15 Q-15 40 -10 60" stroke="#2d8a2d" strokeWidth="3" fill="none" />
      </g>
      <g transform={`translate(1680, ${420 - monkeyOffset})`} style={{ transition: "transform 0.4s ease-out" }}>
        <ellipse cx="0" cy="0" rx="18" ry="16" fill="#5a3a1a" />
        <ellipse cx="0" cy="0" rx="12" ry="10" fill="#7a5a3a" />
        <circle cx="-5" cy="-3" r="2.5" fill="#0a1f0a" />
        <circle cx="5" cy="-3" r="2.5" fill="#0a1f0a" />
        <ellipse cx="0" cy="5" rx="4" ry="2" fill="#5a3a1a" />
      </g>
    </svg>
  )
}
