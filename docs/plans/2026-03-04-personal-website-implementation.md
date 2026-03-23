# seanippolito.com v1 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build an immersive single-page personal website with a jungle scene, parallax layers, interactive animals, and centered content (name, social links, resume download).

**Architecture:** Full-viewport React app with layered SVG/CSS jungle scene. A custom `useMouseParallax` hook drives parallax movement across 5 depth layers. Content floats in the center with no container. A game teaser at the bottom links to a placeholder game overlay.

**Tech Stack:** Vite, React 18, TypeScript, Tailwind CSS v4, deployed to Cloudflare Pages.

**Design doc:** `docs/plans/2026-03-04-personal-website-design.md`

---

### Task 1: Scaffold Vite + React + TypeScript + Tailwind project

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`, `tailwind.config.ts`, `postcss.config.js`, `index.html`, `src/main.tsx`, `src/App.tsx`, `src/index.css`, `.gitignore`

**Step 1: Initialize project**

```bash
cd "C:/Users/seani/Projects/Clients/SeanIppolito"
npm create vite@latest . -- --template react-ts
```

If prompted about existing files, allow overwrite of config files only.

**Step 2: Install Tailwind CSS**

```bash
npm install
npm install -D tailwindcss @tailwindcss/vite
```

**Step 3: Configure Tailwind**

In `vite.config.ts`:
```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

Replace contents of `src/index.css` with:
```css
@import "tailwindcss";
```

**Step 4: Clean up scaffolded files**

- Delete `src/App.css`, `src/assets/` (Vite logo)
- Replace `src/App.tsx` with a minimal placeholder:
```tsx
function App() {
  return <div className="min-h-screen bg-[#0a1f0a]" />
}
export default App
```

**Step 5: Verify it runs**

```bash
npm run dev
```

Expected: Dev server starts, blank dark green page renders at localhost:5173.

**Step 6: Add .gitignore entries and commit**

Ensure `.gitignore` includes `node_modules`, `dist`, `.env`. Then:
```bash
git init
git add -A
git commit -m "feat: scaffold vite + react + typescript + tailwind project"
```

---

### Task 2: Social links data and types

**Files:**
- Create: `src/data/links.ts`

**Step 1: Create links data file**

```ts
export interface SocialLink {
  label: string
  url: string
  icon: string // SVG path data for inline SVG icons
}

export const socialLinks: SocialLink[] = [
  {
    label: "GitHub",
    url: "https://github.com/seanippolito",
    icon: "M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z",
  },
  {
    label: "Instagram",
    url: "https://instagram.com/seanippolito",
    icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
  },
  {
    label: "LinkedIn",
    url: "https://linkedin.com/in/seanippolito",
    icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
  {
    label: "Website",
    url: "https://example.com",
    icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z",
  },
  {
    label: "Email",
    url: "mailto:sean@example.com",
    icon: "M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z",
  },
]
```

**Step 2: Commit**

```bash
git add src/data/links.ts
git commit -m "feat: add social links data"
```

---

### Task 3: useMouseParallax hook

**Files:**
- Create: `src/hooks/useMouseParallax.ts`

**Step 1: Implement the hook**

```ts
import { useState, useEffect, useCallback, useRef } from "react"

interface ParallaxOffset {
  x: number
  y: number
}

interface UseMouseParallaxOptions {
  strength?: number // multiplier for parallax intensity
  smoothing?: number // lerp factor (0-1), lower = smoother
}

export function useMouseParallax(options: UseMouseParallaxOptions = {}) {
  const { strength = 1, smoothing = 0.1 } = options
  const [offset, setOffset] = useState<ParallaxOffset>({ x: 0, y: 0 })
  const targetRef = useRef<ParallaxOffset>({ x: 0, y: 0 })
  const currentRef = useRef<ParallaxOffset>({ x: 0, y: 0 })
  const rafRef = useRef<number>(0)

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      // Normalize to -1 to 1 from center
      const x = ((e.clientX / window.innerWidth) * 2 - 1) * strength
      const y = ((e.clientY / window.innerHeight) * 2 - 1) * strength
      targetRef.current = { x, y }
    },
    [strength]
  )

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    if (prefersReducedMotion) return

    window.addEventListener("mousemove", handleMouseMove)

    const animate = () => {
      const current = currentRef.current
      const target = targetRef.current
      current.x += (target.x - current.x) * smoothing
      current.y += (target.y - current.y) * smoothing
      setOffset({ x: current.x, y: current.y })
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [handleMouseMove, smoothing])

  return offset
}

/** Helper: returns a CSS transform string for a given layer depth */
export function getLayerTransform(
  offset: ParallaxOffset,
  depth: number
): string {
  return `translate(${offset.x * depth}px, ${offset.y * depth}px)`
}
```

**Step 2: Commit**

```bash
git add src/hooks/useMouseParallax.ts
git commit -m "feat: add useMouseParallax hook with smoothed lerp animation"
```

---

### Task 4: Jungle scene SVG placeholder assets

**Files:**
- Create: `src/components/jungle/BackgroundSky.tsx`
- Create: `src/components/jungle/FarTrees.tsx`
- Create: `src/components/jungle/MidFoliage.tsx`
- Create: `src/components/jungle/ForegroundLeaves.tsx`
- Create: `src/components/jungle/Animals.tsx`
- Create: `src/components/jungle/Fireflies.tsx`

Each component renders an SVG layer that fills the viewport. Use placeholder silhouettes — organic shapes in varying greens/darks. These will be replaced with real art later.

**Step 1: Create BackgroundSky**

Deep gradient background with faint light beams filtering through canopy.

```tsx
export function BackgroundSky() {
  return (
    <div className="absolute inset-0">
      <svg viewBox="0 0 1920 1080" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="sky-glow" cx="50%" cy="30%" r="60%">
            <stop offset="0%" stopColor="#1a3a1a" />
            <stop offset="100%" stopColor="#0a1f0a" />
          </radialGradient>
          <radialGradient id="light-beam" cx="50%" cy="0%" r="50%">
            <stop offset="0%" stopColor="#2a5a2a" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#0a1f0a" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="1920" height="1080" fill="url(#sky-glow)" />
        <ellipse cx="960" cy="200" rx="600" ry="400" fill="url(#light-beam)" />
      </svg>
    </div>
  )
}
```

**Step 2: Create FarTrees**

Dark tree silhouettes — slow parallax layer.

```tsx
export function FarTrees() {
  return (
    <svg viewBox="0 0 1920 1080" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      {/* Left tree cluster */}
      <path d="M0 1080 L0 400 Q50 300 100 400 Q150 200 200 400 Q250 350 300 500 L300 1080Z" fill="#0d260d" />
      {/* Right tree cluster */}
      <path d="M1620 1080 L1620 350 Q1680 250 1720 380 Q1780 200 1820 350 Q1870 300 1920 450 L1920 1080Z" fill="#0d260d" />
      {/* Center distant trees */}
      <path d="M700 1080 L720 600 Q760 500 800 600 L820 1080Z" fill="#0f2d0f" opacity="0.5" />
      <path d="M1100 1080 L1120 650 Q1150 550 1180 650 L1200 1080Z" fill="#0f2d0f" opacity="0.5" />
    </svg>
  )
}
```

**Step 3: Create MidFoliage**

Leaves and vines at medium depth.

```tsx
export function MidFoliage() {
  return (
    <svg viewBox="0 0 1920 1080" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      {/* Left hanging vines */}
      <path d="M150 0 Q140 200 160 400 Q150 500 170 600" stroke="#1a4a1a" strokeWidth="3" fill="none" opacity="0.7" />
      <path d="M180 0 Q170 150 190 350 Q180 450 200 550" stroke="#1a4a1a" strokeWidth="2" fill="none" opacity="0.5" />
      {/* Left leaf cluster */}
      <ellipse cx="100" cy="300" rx="80" ry="40" fill="#1a4a1a" opacity="0.6" transform="rotate(-20 100 300)" />
      <ellipse cx="60" cy="350" rx="60" ry="30" fill="#164016" opacity="0.7" transform="rotate(10 60 350)" />
      {/* Right leaf cluster */}
      <ellipse cx="1820" cy="250" rx="90" ry="45" fill="#1a4a1a" opacity="0.6" transform="rotate(15 1820 250)" />
      <ellipse cx="1860" cy="320" rx="70" ry="35" fill="#164016" opacity="0.7" transform="rotate(-10 1860 320)" />
      {/* Top hanging leaves */}
      <ellipse cx="600" cy="50" rx="100" ry="50" fill="#1a4a1a" opacity="0.4" transform="rotate(5 600 50)" />
      <ellipse cx="1300" cy="30" rx="80" ry="40" fill="#164016" opacity="0.4" transform="rotate(-8 1300 30)" />
    </svg>
  )
}
```

**Step 4: Create ForegroundLeaves**

Closest layer — large blurred leaves framing edges.

```tsx
export function ForegroundLeaves() {
  return (
    <svg viewBox="0 0 1920 1080" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <filter id="leaf-blur">
          <feGaussianBlur stdDeviation="2" />
        </filter>
      </defs>
      {/* Bottom left large leaf */}
      <ellipse cx="-20" cy="1000" rx="200" ry="100" fill="#1a5a1a" opacity="0.8" transform="rotate(-30 -20 1000)" filter="url(#leaf-blur)" />
      {/* Bottom right large leaf */}
      <ellipse cx="1940" cy="950" rx="180" ry="90" fill="#1a5a1a" opacity="0.8" transform="rotate(25 1940 950)" filter="url(#leaf-blur)" />
      {/* Top left corner leaf */}
      <ellipse cx="50" cy="30" rx="150" ry="80" fill="#1a5a1a" opacity="0.6" transform="rotate(20 50 30)" filter="url(#leaf-blur)" />
      {/* Top right corner */}
      <ellipse cx="1880" cy="50" rx="130" ry="70" fill="#1a5a1a" opacity="0.6" transform="rotate(-15 1880 50)" filter="url(#leaf-blur)" />
    </svg>
  )
}
```

**Step 5: Create Animals**

Interactive animals that react to mouse proximity via a `mousePosition` prop.

```tsx
interface AnimalsProps {
  mouseX: number // normalized -1 to 1
  mouseY: number // normalized -1 to 1
}

export function Animals({ mouseX, mouseY }: AnimalsProps) {
  // Parrot on left branch — turns head toward mouse
  const parrotRotation = mouseX * 15

  // Monkey on right — peeks more when mouse is near
  const monkeyOffset = Math.max(0, 1 - Math.abs(mouseX - 0.5) * 3) * 20

  return (
    <svg viewBox="0 0 1920 1080" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      {/* Parrot silhouette on left branch */}
      <g transform={`translate(250, 380) rotate(${parrotRotation})`} style={{ transition: "transform 0.3s ease-out" }}>
        <ellipse cx="0" cy="0" rx="15" ry="20" fill="#2d8a2d" /> {/* body */}
        <ellipse cx="0" cy="-22" rx="10" ry="12" fill="#3a9a3a" /> {/* head */}
        <path d="M8 -28 L18 -32 L10 -24Z" fill="#d4a030" /> {/* beak */}
        <circle cx="-3" cy="-25" r="2" fill="#0a1f0a" /> {/* eye */}
        <path d="M-5 15 Q-15 40 -10 60" stroke="#2d8a2d" strokeWidth="3" fill="none" /> {/* tail */}
      </g>

      {/* Monkey silhouette peeking from right */}
      <g transform={`translate(1680, ${420 - monkeyOffset})`} style={{ transition: "transform 0.4s ease-out" }}>
        <ellipse cx="0" cy="0" rx="18" ry="16" fill="#5a3a1a" /> {/* head */}
        <ellipse cx="0" cy="0" rx="12" ry="10" fill="#7a5a3a" /> {/* face */}
        <circle cx="-5" cy="-3" r="2.5" fill="#0a1f0a" /> {/* left eye */}
        <circle cx="5" cy="-3" r="2.5" fill="#0a1f0a" /> {/* right eye */}
        <ellipse cx="0" cy="5" rx="4" ry="2" fill="#5a3a1a" /> {/* nose */}
      </g>
    </svg>
  )
}
```

**Step 6: Create Fireflies**

Ambient floating lights with CSS animation.

```tsx
export function Fireflies() {
  // Fixed positions for consistent rendering
  const flies = [
    { x: 30, y: 40, delay: 0, duration: 4 },
    { x: 70, y: 60, delay: 1.5, duration: 5 },
    { x: 20, y: 70, delay: 3, duration: 4.5 },
    { x: 80, y: 30, delay: 0.5, duration: 5.5 },
    { x: 50, y: 80, delay: 2, duration: 4 },
    { x: 15, y: 50, delay: 4, duration: 5 },
    { x: 85, y: 45, delay: 1, duration: 4.5 },
    { x: 45, y: 25, delay: 3.5, duration: 5 },
  ]

  return (
    <div className="absolute inset-0 pointer-events-none">
      {flies.map((fly, i) => (
        <div
          key={i}
          className="absolute h-1.5 w-1.5 rounded-full bg-amber-300/60 animate-firefly"
          style={{
            left: `${fly.x}%`,
            top: `${fly.y}%`,
            animationDelay: `${fly.delay}s`,
            animationDuration: `${fly.duration}s`,
          }}
        />
      ))}
    </div>
  )
}
```

**Step 7: Commit**

```bash
git add src/components/jungle/
git commit -m "feat: add jungle scene SVG layers (sky, trees, foliage, animals, fireflies)"
```

---

### Task 5: CSS animations (sway, firefly, glow)

**Files:**
- Modify: `src/index.css`

**Step 1: Add custom keyframes and utilities to index.css**

Append after `@import "tailwindcss"`:

```css
@layer base {
  body {
    margin: 0;
    overflow: hidden;
    background: #0a1f0a;
  }
}

@layer utilities {
  .text-glow {
    text-shadow: 0 0 20px rgba(255, 255, 255, 0.3),
                 0 0 40px rgba(255, 255, 255, 0.1);
  }

  .text-glow-hover:hover {
    text-shadow: 0 0 20px rgba(212, 160, 48, 0.5),
                 0 0 40px rgba(212, 160, 48, 0.2);
  }
}

@keyframes firefly {
  0%, 100% { opacity: 0.2; transform: translate(0, 0); }
  25% { opacity: 0.8; transform: translate(5px, -8px); }
  50% { opacity: 0.4; transform: translate(-3px, -15px); }
  75% { opacity: 0.9; transform: translate(8px, -5px); }
}

@keyframes sway {
  0%, 100% { transform: rotate(0deg); }
  50% { transform: rotate(2deg); }
}

.animate-firefly {
  animation: firefly var(--duration, 4s) ease-in-out infinite;
}

.animate-sway {
  animation: sway 6s ease-in-out infinite;
  transform-origin: top center;
}
```

**Step 2: Commit**

```bash
git add src/index.css
git commit -m "feat: add jungle CSS animations (firefly, sway, text glow)"
```

---

### Task 6: CenterContent component

**Files:**
- Create: `src/components/CenterContent.tsx`

**Step 1: Implement the component**

```tsx
import { socialLinks } from "../data/links"

export function CenterContent() {
  return (
    <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <h1 className="text-glow mb-3 text-5xl font-bold tracking-tight text-white md:text-7xl">
        Sean Ippolito
      </h1>
      <p className="text-glow mb-10 text-lg text-white/70 md:text-xl">
          Veteran. Engineer. Founder. Building what matters.
      </p>

      {/* Social links */}
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

      {/* Resume download */}
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
```

**Step 2: Commit**

```bash
git add src/components/CenterContent.tsx
git commit -m "feat: add CenterContent component with social links and resume download"
```

---

### Task 7: JungleScene component (parallax orchestrator)

**Files:**
- Create: `src/components/JungleScene.tsx`

**Step 1: Implement**

```tsx
import { useMouseParallax, getLayerTransform } from "../hooks/useMouseParallax"
import { BackgroundSky } from "./jungle/BackgroundSky"
import { FarTrees } from "./jungle/FarTrees"
import { MidFoliage } from "./jungle/MidFoliage"
import { ForegroundLeaves } from "./jungle/ForegroundLeaves"
import { Animals } from "./jungle/Animals"
import { Fireflies } from "./jungle/Fireflies"

export function JungleScene() {
  const offset = useMouseParallax({ strength: 30, smoothing: 0.08 })

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {/* Layer 1: Sky (no parallax) */}
      <BackgroundSky />

      {/* Layer 2: Far trees (slow parallax) */}
      <div
        className="absolute inset-0"
        style={{ transform: getLayerTransform(offset, 0.2) }}
      >
        <FarTrees />
      </div>

      {/* Layer 3: Mid foliage (medium parallax) */}
      <div
        className="absolute inset-0 animate-sway"
        style={{ transform: getLayerTransform(offset, 0.5) }}
      >
        <MidFoliage />
      </div>

      {/* Layer 4: Animals (medium parallax + own reactions) */}
      <div
        className="absolute inset-0"
        style={{ transform: getLayerTransform(offset, 0.4) }}
      >
        <Animals mouseX={offset.x / 30} mouseY={offset.y / 30} />
      </div>

      {/* Fireflies (medium parallax) */}
      <div
        className="absolute inset-0"
        style={{ transform: getLayerTransform(offset, 0.3) }}
      >
        <Fireflies />
      </div>

      {/* Layer 5: Foreground leaves (fast parallax) */}
      <div
        className="absolute inset-0"
        style={{ transform: getLayerTransform(offset, 0.8) }}
      >
        <ForegroundLeaves />
      </div>
    </div>
  )
}
```

**Step 2: Commit**

```bash
git add src/components/JungleScene.tsx
git commit -m "feat: add JungleScene parallax orchestrator"
```

---

### Task 8: GameTeaser component

**Files:**
- Create: `src/components/GameTeaser.tsx`

**Step 1: Implement a subtle teaser at the bottom**

```tsx
import { useState } from "react"

interface GameTeaserProps {
  onActivate: () => void
}

export function GameTeaser({ onActivate }: GameTeaserProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <button
      onClick={onActivate}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="fixed bottom-8 left-1/2 z-20 -translate-x-1/2 cursor-pointer border-none bg-transparent"
      aria-label="Play a game"
    >
      <div className="flex flex-col items-center gap-2">
        {/* Glowing mysterious element */}
        <div
          className="h-3 w-3 rounded-full transition-all duration-500"
          style={{
            backgroundColor: hovered
              ? "rgba(212, 160, 48, 0.9)"
              : "rgba(212, 160, 48, 0.4)",
            boxShadow: hovered
              ? "0 0 20px rgba(212, 160, 48, 0.6), 0 0 40px rgba(212, 160, 48, 0.3)"
              : "0 0 10px rgba(212, 160, 48, 0.2)",
            transform: hovered ? "scale(1.5)" : "scale(1)",
          }}
        />
        <span
          className="text-xs transition-opacity duration-500"
          style={{
            color: "rgba(212, 160, 48, 0.6)",
            opacity: hovered ? 1 : 0,
          }}
        >
          curious?
        </span>
      </div>
    </button>
  )
}
```

**Step 2: Commit**

```bash
git add src/components/GameTeaser.tsx
git commit -m "feat: add GameTeaser component with hover reveal"
```

---

### Task 9: Placeholder Game component

**Files:**
- Create: `src/components/Game.tsx`

**Step 1: Implement a simple placeholder game overlay**

```tsx
import { useState, useCallback } from "react"

interface GameProps {
  onClose: () => void
}

export function Game({ onClose }: GameProps) {
  const [score, setScore] = useState(0)
  const [highScore] = useState(() => {
    return parseInt(localStorage.getItem("seanippolito_highScore") || "0", 10)
  })

  const handleClick = useCallback(() => {
    setScore((prev) => {
      const newScore = prev + 1
      const stored = parseInt(
        localStorage.getItem("seanippolito_highScore") || "0",
        10
      )
      if (newScore > stored) {
        localStorage.setItem("seanippolito_highScore", String(newScore))
      }
      return newScore
    })
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="text-center">
        <p className="mb-2 text-sm text-white/50">
          placeholder — real game coming soon
        </p>
        <p className="text-glow mb-4 text-3xl font-bold text-white">{score}</p>
        <button
          onClick={handleClick}
          className="mb-6 h-24 w-24 rounded-full border-2 border-amber-300/40 text-amber-300 transition-all hover:scale-110 hover:border-amber-300 hover:shadow-[0_0_30px_rgba(212,160,48,0.3)]"
        >
          tap
        </button>
        <p className="mb-4 text-xs text-white/40">
          high score: {Math.max(score, highScore)}
        </p>
        <button
          onClick={onClose}
          className="text-sm text-white/50 transition-colors hover:text-white"
        >
          back to site
        </button>
      </div>
    </div>
  )
}
```

**Step 2: Commit**

```bash
git add src/components/Game.tsx
git commit -m "feat: add placeholder Game component with localStorage high score"
```

---

### Task 10: Wire everything together in App.tsx

**Files:**
- Modify: `src/App.tsx`

**Step 1: Compose all components**

```tsx
import { useState } from "react"
import { JungleScene } from "./components/JungleScene"
import { CenterContent } from "./components/CenterContent"
import { GameTeaser } from "./components/GameTeaser"
import { Game } from "./components/Game"

function App() {
  const [gameActive, setGameActive] = useState(false)

  return (
    <div className="relative min-h-screen bg-[#0a1f0a]">
      <JungleScene />
      <CenterContent />
      {!gameActive && (
        <GameTeaser onActivate={() => setGameActive(true)} />
      )}
      {gameActive && <Game onClose={() => setGameActive(false)} />}
    </div>
  )
}

export default App
```

**Step 2: Verify the full app runs**

```bash
npm run dev
```

Expected: Full jungle scene with parallax, centered content, fireflies, game teaser at bottom.

**Step 3: Commit**

```bash
git add src/App.tsx
git commit -m "feat: wire up App with jungle scene, content, game teaser, and game overlay"
```

---

### Task 11: Add placeholder resume.pdf and verify build

**Files:**
- Create: `public/resume.pdf` (placeholder)

**Step 1: Create a minimal placeholder PDF**

```bash
echo "%PDF-1.0 placeholder" > public/resume.pdf
```

**Step 2: Run production build**

```bash
npm run build
```

Expected: Build succeeds, output in `dist/`.

**Step 3: Preview production build**

```bash
npm run preview
```

Expected: Site runs at localhost:4173 with all features working.

**Step 4: Commit**

```bash
git add public/resume.pdf
git commit -m "feat: add placeholder resume PDF"
```

---

### Task 12: Update CLAUDE.md with final architecture

**Files:**
- Modify: `CLAUDE.md`

**Step 1: Update CLAUDE.md to reflect what was actually built**

Update the architecture section, file structure, and any commands to match the final implementation.

**Step 2: Commit**

```bash
git add CLAUDE.md
git commit -m "docs: update CLAUDE.md with final v1 architecture"
```
