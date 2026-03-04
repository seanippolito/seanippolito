import { socialLinks } from "../data/links"

export function CenterContent() {
  return (
    <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <h1 className="text-glow mb-3 text-5xl font-bold tracking-tight text-white md:text-7xl">
        Sean Ippolito
      </h1>
      <p className="text-glow mb-10 text-lg text-white/70 md:text-xl">
        I build elegant software and playful experiences.
      </p>

      <div className="mb-8 flex flex-wrap justify-center gap-6">
        {socialLinks.map((link) => (
          <a
            key={link.label}
            href={link.url}
            target={link.url.startsWith("mailto:") ? undefined : "_blank"}
            rel="noopener noreferrer"
            className="text-glow-hover group flex items-center gap-2 text-white/80 transition-colors duration-300 hover:text-amber-300"
            aria-label={link.label}
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 fill-current"
              aria-hidden="true"
            >
              <path d={link.icon} />
            </svg>
            <span className="text-sm font-medium">{link.label}</span>
          </a>
        ))}
      </div>

      <a
        href="/resume.pdf"
        download
        className="text-glow-hover rounded-full border border-white/20 px-6 py-2.5 text-sm font-medium text-white/90 transition-all duration-300 hover:border-amber-300/40 hover:text-amber-300"
      >
        Download Resume
      </a>
    </div>
  )
}
