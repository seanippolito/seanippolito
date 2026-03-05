import { socialLinks } from "../data/links"

export function CenterContent() {
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

      {/* Resume download */}
      <a
        href="/resume.pdf"
        download
        className="text-glow-hover rounded-full border border-white/10 px-8 py-3 text-xs font-light tracking-[0.2em] text-white/60 uppercase transition-all duration-500 hover:border-amber-200/30 hover:text-amber-200/80 hover:shadow-[0_0_30px_rgba(200,180,60,0.08)]"
      >
        Download Resume
      </a>
    </div>
  )
}
