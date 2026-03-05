# Heaven Scene Design — Mount Olympus

## Atmosphere
Greek mythology / Mount Olympus. Grand marble architecture, golden light, celestial majesty. Contrasts with volcano's dark hellscape — this is bright, warm, divine.

## Background & Parallax Layers

**Base gradient:** Radial gold center `#fffbe6` → pale blue `#c4d7f2` → deeper celestial blue `#7ba7cc`, sunburst at ~30% from top.

### Layer 1 (depth: 0.08) — Distant peaks & god-rays
- Purple-blue mountain range (distant Olympus skyline)
- Crepuscular god-rays fanning down from bright central source
- Faint distant cloud banks

### Layer 2 (depth: 0.2) — Temple complex & eagles
- Marble temple with columns and pediment (triangular roof)
- Golden gate / archway at center
- Crumbling ruins flanking the temple
- Eagles circling in the sky

### Layer 3 (depth: 0.4) — Foreground framing
- Closer marble columns framing screen edges
- Olive branches / laurel wreath silhouettes
- Floating cloud platforms at bottom (replaces ground)
- Statue silhouette (Zeus or Athena)

## Animated Components

| Component | File | Description |
|-----------|------|-------------|
| CloudDrift | `CloudDrift.tsx` | Soft clouds drifting left-to-right across scene |
| GodRays | `GodRays.tsx` | Animated light beams pulsing in opacity from central sun |
| OlympusEagles | `OlympusEagles.tsx` | 2-3 eagle silhouettes soaring in wide arcs |
| GoldenMotes | `GoldenMotes.tsx` | Tiny golden sparkle particles floating upward |
| LightningAmbient | `LightningAmbient.tsx` | Subtle sheet lightning in distant clouds |
| HeavenEasterEggs | `HeavenEasterEggs.tsx` | Hidden clickables: Zeus's thunderbolt, Medusa's head, golden apple, lyre of Apollo |

## Cursor Effect
Golden lightning aura / divine glow following mouse. Trails golden sparks upward (inverse of volcano's ember trail downward).

File: `CursorDivineGlow.tsx`

## Audio
`useHeavenAudio.ts` — Web Audio API procedural synthesis:
- Ethereal harp arpeggios (pentatonic scale, randomized timing)
- Gentle wind (bandpass filtered noise, slow sweep)
- Distant thunder rumbles (triggered by LightningAmbient events)
- Soft choral pad (layered sine waves with slow vibrato)
- Occasional eagle cry (filtered noise burst with pitch sweep)

## Vignette
`DivineVignette.tsx` — bright warm glow at cursor position, edges fade to soft blue shadow. Inverse of volcano's torch (light center vs dark center).

## Easter Eggs
4 hidden clickable items with localStorage persistence (`heaven-eggs-found`):
1. **Zeus's thunderbolt** — crackles with electricity on click
2. **Medusa's head** — eyes glow green, stone ripple effect
3. **Golden apple** — shimmers and floats upward
4. **Lyre of Apollo** — plays a quick harp arpeggio

## Color Palette
- Gold: `#fffbe6`, `#fbbf24`, `#f59e0b`
- Sky blue: `#c4d7f2`, `#7ba7cc`, `#3b82f6`
- Marble white: `rgba(255,255,255,0.3-0.8)`
- Mountain purple: `#6366f1`, `#4338ca`
- Olive green: `#65a30d` (accents)
