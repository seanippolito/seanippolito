import { socialLinks } from "../data/links"

interface CenterContentProps {
  audioMuted?: boolean
  onToggleAudio?: () => void
}

export function CenterContent({ audioMuted, onToggleAudio }: CenterContentProps) {
  return (
    <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <h1 className="font-display text-glow mb-4 text-6xl font-light tracking-wide text-white/95 md:text-8xl">
        Sean Ippolito
      </h1>
      <p className="text-glow mb-12 text-base font-light tracking-widest text-white/50 uppercase md:text-lg">
        I build elegant software and playful experiences
      </p>

      {/* Social links */}
      <div className="mb-10 flex flex-wrap justify-center gap-8">
        {socialLinks.map((link) => (
          <a
            key={link.label}
            href={link.url}
            target={link.url.startsWith("mailto:") ? undefined : "_blank"}
            rel="noopener noreferrer"
            className="text-glow-hover group flex items-center gap-2.5 text-white/60 transition-all duration-500 hover:text-amber-200/90"
            aria-label={link.label}
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4.5 w-4.5 fill-current transition-transform duration-500 group-hover:scale-110"
              aria-hidden="true"
            >
              <path d={link.icon} />
            </svg>
            <span className="text-sm font-light tracking-wider">{link.label}</span>
          </a>
        ))}
      </div>

      {/* Resume download + audio control */}
      <div className="flex items-center gap-4">
        <a
          href="/resume.pdf"
          download
          className="text-glow-hover rounded-full border border-white/10 px-8 py-3 text-xs font-light tracking-[0.2em] text-white/60 uppercase transition-all duration-500 hover:border-amber-200/30 hover:text-amber-200/80 hover:shadow-[0_0_30px_rgba(200,180,60,0.08)]"
        >
          Download Resume
        </a>
        <button
            onClick={onToggleAudio}
            aria-label={audioMuted ? "Unmute ambient audio" : "Mute ambient audio"}
            className="rounded-full border border-white/10 p-3 text-white/60 transition-all duration-500 hover:border-amber-200/30 hover:text-amber-200/80 hover:shadow-[0_0_30px_rgba(200,180,60,0.08)]"
            style={{ cursor: "none" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              {audioMuted ? (
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
      </div>
    </div>
  )
}
