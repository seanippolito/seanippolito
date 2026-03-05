# Beach Scene Design — Tropical Paradise

## Atmosphere
Vibrant Caribbean paradise. Turquoise lagoon, white sand, swaying palms, coral reef, tropical birds. Relaxed and lush.

## Background & Parallax Layers

**Base gradient:** Linear sky blue `#87ceeb` → turquoise `#2dd4bf` → warm sand `#c2956b` → deeper sand `#a0784a`

### Layer 1 (depth: 0.08) — Distant ocean & sky
- Horizon with warm golden sun disc
- 2-3 distant sailing boat silhouettes
- 3 layered ocean wave paths
- Distant island silhouette with palm trees

### Layer 2 (depth: 0.2) — Mid-ground reef & water
- Coral reef formations (colorful blobs: pink, purple, orange)
- 1-2 sea turtle silhouettes
- Mid-distance waves with white foam caps
- Wooden dock/pier from right side

### Layer 3 (depth: 0.4) — Foreground beach
- Large palm trees framing left/right (with coconuts)
- Scattered shells and starfish on sand
- Beach umbrella / tiki hut silhouette
- Tide pools near shore

## Animated Components

| Component | File | Description |
|-----------|------|-------------|
| OceanWaves | `OceanWaves.tsx` | 3-4 wave layers with horizontal undulation, foam at crests |
| SwayingPalms | `SwayingPalms.tsx` | Palm fronds swaying in breeze via CSS transforms |
| TropicalBirds | `TropicalBirds.tsx` | 3 seagull silhouettes soaring + occasional parrot flock |
| SandSparkle | `SandSparkle.tsx` | Tiny white glint particles on sand (sunlight reflections) |
| TideFoam | `TideFoam.tsx` | Foam line advancing/retreating rhythmically along shore |
| FloatingJellyfish | `FloatingJellyfish.tsx` | 2-3 translucent jellyfish drifting through water |
| BeachEasterEggs | `BeachEasterEggs.tsx` | Hidden: message in a bottle, treasure chest, mermaid tail, trident |
| CoralGlow | `CoralGlow.tsx` | Bioluminescent pulse on coral formations |

## Cursor Effect
Blue-green seashell gem + 10 tropical fish orbiting with tail-wiggle animation.
File: `CursorFish.tsx`

## Audio
`useBeachAudio.ts` — Web Audio API:
- Rolling ocean waves (filtered noise with rhythmic volume swell)
- Seagull cries (bandpass noise with pitch sweep, every 10-20s)
- Gentle wind (bandpass noise, slow sweep)
- Distant steel drum/ukulele notes (pentatonic sine tones, every 3-6s)
- Occasional dolphin click (high-freq filtered burst, every 20-40s)

## Vignette
`SunbeamVignette.tsx` — warm golden light at cursor, edges fade to soft blue-teal. Bright like heaven but warmer tones.

## Easter Eggs
4 hidden clickable items with localStorage persistence (`beach-eggs-found`):
1. **Message in a bottle** — cork pops, paper unfurls
2. **Treasure chest** — lid opens, gold coins spill
3. **Mermaid tail** — tail splashes, iridescent shimmer
4. **Trident** — glows aqua, water ripple effect

## Color Palette
- Sky: `#87ceeb`, `#60b5d4`
- Ocean: `#2dd4bf`, `#14b8a6`, `#0d9488`
- Sand: `#c2956b`, `#a0784a`, `#d4a574`
- Coral: `#f472b6`, `#a855f7`, `#fb923c`
- Palm green: `#228b22`, `#166534`
- Sun gold: `#fbbf24`, `#f59e0b`
