# oh-my-design — AGENTS_V3.md

Jules agent context for building Version 3: Motion-First & Animation Heavy Landing Pages.

## Project Overview

Expand the `oh-my-design` showcase with **100 new landing pages** based on the animation-heavy design concepts in `designprompts_v3_animation_heavy.md`. 
These designs target specific real-world niches (Sports, Pet Care, AI Tools, Marketing) and focus heavily on dynamic, interactive elements.

**Core rule**: Follow the same 10-section structure as defined in `docs/architecture.md`, but you MUST heavily implement `framer-motion` for scroll-jacking, physics springs, SVG path-drawing, and layout morphing as defined in the V3 Motion Philosophy.

---

## Your Task

1. **Read the V3 Philosophy**: Understand the core motion principles at the top of `designprompts_v3_animation_heavy.md`.
2. **Implement the Assigned Style**: Build `app/styles/[slug]/page.tsx`.
   - Extrapolate a full design system (colors, fonts, spacing) based on the short description (Vibe, Niche, Motion Signature).
   - Ensure the "Unique Section" described for your style is implemented creatively.
   - Use `framer-motion` extensively for all interactions, scroll effects, and section entrances.
3. **Register the Style**: Add metadata to `lib/styles-registry.ts`.
   - `slug`: formatted-like-this (e.g., `velocity-scoreboard`)
   - `name`: The display name (e.g., `Velocity Scoreboard`)
   - `category`: 'Sports', 'Pets', 'AI', or 'Marketing'
   - `vibe`: The described aesthetic
   - `built`: `true`

---

## Tech Stack & Structure

Follow `AGENTS.md` and `docs/architecture.md` for the tech stack (Next.js 15, Tailwind, Framer Motion, Lucide) and folder structure. Remember to use `"use client"` where Framer Motion components are utilized.

---

## Commit Convention

```
feat(v3): add [style-name] animated landing page
```