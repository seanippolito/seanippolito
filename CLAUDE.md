# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for seanippolito.com. Single-page static site with a clean, elegant, minimal aesthetic and subtle cosmic/psychedelic personality. No backend.

## Planned Tech Stack

- Vite + React + TypeScript
- Tailwind CSS
- Deployment: Cloudflare Pages or Netlify
- Game: HTML Canvas in a React component (no external game engine)
- No analytics, no third-party UI libraries, no heavy animation libraries

## Build & Dev Commands

```bash
npm install        # install dependencies
npm run dev        # local dev server
npm run build      # production build
npm run preview    # preview production build
```

## Architecture

Single-page app with anchor-based navigation (#work, #about, #links, #resume, #game). Sections:

1. **Hero** — Name, tagline, CTA buttons (Download Resume, View Work), animated gradient background
2. **Work** — Grid of project tiles; each opens a modal (problem → approach → outcome)
3. **About** — Short bio, focus areas, "Now" panel (current projects/learning)
4. **Links** — Icon buttons: GitHub, Instagram, LinkedIn, business site, email
5. **Resume** — Highlight bullets + PDF download link. Static `resume.pdf` in `/public`
6. **Game** — "Orbit Runner" canvas mini-game with localStorage high score
7. **Footer** — Copyright, last updated, playful one-liner

## Design System

- **Typography**: Inter (or similar modern sans), big confident headings, lots of whitespace
- **Color**: Monochrome base (white/near-black) with one accent gradient (deep violet → electric cyan). Gradient used sparingly: hero underline, hover states, section dividers
- **Motion**: Micro-interactions only — tile hover lift, smooth scroll, light background grain. Support `prefers-reduced-motion`
- **Theme**: Light/dark toggle saved in `localStorage` key `seanippolito_theme`
- **Signature motif**: Constellation-style SVG dividers, subtle starfield behind hero, neon glow hover on link cards

## localStorage Keys

- `seanippolito_highScore` — game high score
- `seanippolito_theme` — light/dark preference

## Design Reference

See `CHATGPT.md` in the project root for the full design brief and content structure. Images will be sourced from NanoBanana/Kling later.
