interface AudioControlProps {
  muted: boolean
  onToggle: () => void
}

export function AudioControl({ muted, onToggle }: AudioControlProps) {
  return (
    <button
      onClick={onToggle}
      aria-label={muted ? "Unmute ambient audio" : "Mute ambient audio"}
      className="fixed bottom-4 right-4 z-50 rounded-full bg-black/30 p-2 backdrop-blur-sm"
      style={{ pointerEvents: "auto", cursor: "none" }}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
        {muted ? (
          <>
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </>
        ) : (
          <>
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          </>
        )}
      </svg>
    </button>
  )
}
