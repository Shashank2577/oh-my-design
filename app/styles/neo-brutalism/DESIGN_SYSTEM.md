# Neo-brutalism Design System

## Visual Ethos

Neo-brutalism (or Neu-Brutalism) is the digital punk rebellion against polished, "Clean SaaS" aesthetics. It combines raw, unrefined structural honesty with high-saturation energy, "sticker" culture, and DIY zine design. 

**Core DNA:**
- **Unapologetic Visibility (The Anti-Subtle):** Structure is enforced with thick, hard-edged black lines (`border-4` everywhere). Shadows are solid blocks of ink offset at 45-degree angles with zero blur.
- **Digital Tactility (The Sticker Effect):** Elements feel like physical stickers or printed cards. Buttons press down mechanically, cards lift up physically, and text blocks are rotated like stickers.
- **Organized Chaos:** Embraces a "planned messiness". Slight rotations (`-rotate-2`, `rotate-1`), intentional overlaps, and asymmetry.
- **Default & Raw:** Uses pure black for structure, high-saturation primary colors for energy, and a cream background mimicking aged paper.
- **Maximalism as Statement:** Deliberately maximal with dense visual elements (halftone patterns, grid overlays, noise textures).
- **Irony & Confidence:** Exudes self-awareness. It's "ugly-cool", anti-corporate, and bold.
- **Mechanical Interactivity:** Interactions are snappy, mechanical, and direct.

## Tokens

**Colors (Light Mode Only):**
- `background` (Canvas): `#FFFDF5` (Cream/Off-White)
- `foreground` (Ink): `#000000` (Pure Black)
- `accent` (Hot Red): `#FF6B6B`
- `secondary` (Vivid Yellow): `#FFD93D`
- `muted` (Soft Violet): `#C4B5FD`
- `white`: `#FFFFFF`

**Typography:**
- **Family:** Space Grotesk (geometric sans-serif with quirky personality)
- **Weights:** 700 (Bold) for body/buttons/labels, 700+ for display (900 intended, 700 used due to font availability constraints)
- **Scale:** Massive display text (`text-8xl` to `text-9xl`), tight tracking (`tracking-tighter`), tight leading (`leading-none`). Heavy use of UPPERCASE.

**Radii & Borders:**
- **Radius:** Default is `0px`. Exception: `rounded-full` for pill badges/circles.
- **Borders:** Mandatory `border-4 border-black` everywhere.

**Shadows & Textures:**
- **Hard Shadows:** Offset, solid black with zero blur (`4px 4px`, `8px 8px`, `12px 12px`, `16px 16px`).
- **Patterns:** Halftone dots, grid patterns, noise textures, radial dots.

## Motion Language

- **Feel:** Bouncy, playful, mechanical, arcade-like.
- **Transition Speed:** Fast and snappy (`duration-100`, `duration-200`, `duration-300`).
- **Easing:** `ease-linear` for mechanical feel, `ease-out` for natural deceleration. Avoid `ease-in-out`.
- **Hover/Active Interactions:**
  - Buttons: Push down on click (`active:translate-x-[2px] active:translate-y-[2px] active:shadow-none`).
  - Cards: Lift up on hover (`hover:-translate-y-2`) and shadow deepens.
  - Badges/Icons: Snappy 90-degree image rotations on entrance, hover rotations.
- **Detachment:** Hard-shadow detachment on scroll (shadows remain fixed or offset changes dramatically to simulate lift).
