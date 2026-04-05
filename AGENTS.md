# oh-my-design — AGENTS.md

Jules agent context for building 32 design style landing pages.

## Project Overview

Build a Next.js 15 showcase app with **32 beautiful, production-grade landing pages**, each implementing a distinct design style from `designprompts_dev_all_styles.md`. The home page (`/`) is a gallery showing all 32 styles. Each style lives at `/styles/[slug]`.

**Core rule**: Every page has the **same sections, same tech stack, same routing convention** — only the visual design changes. Jules must not invent new structures; follow the template in `docs/architecture.md` exactly.

---

## Tech Stack (Non-negotiable for every page)

| Tool | Purpose | Version |
|------|---------|---------|
| Next.js | Framework | 15 (App Router) |
| TypeScript | Language | 5+ |
| Tailwind CSS | Styling | 3.4+ |
| Framer Motion | Animations | 11+ |
| Lucide React | Icons | latest |
| next/font/google | Typography | built-in |

---

## Repository Structure

```
oh-my-design/
├── app/
│   ├── layout.tsx              # Root layout (minimal — no global design system)
│   ├── page.tsx                # Home gallery page (all 32 styles as cards)
│   └── styles/
│       ├── academia/page.tsx
│       ├── art-deco/page.tsx
│       ├── bauhaus/page.tsx
│       └── ... (32 total)
├── lib/
│   └── styles-registry.ts      # Metadata for all 32 styles
├── docs/                        # Design guidelines (Jules MUST read before coding)
│   ├── architecture.md
│   ├── ui-ux-guidelines.md
│   ├── nextjs-best-practices.md
│   ├── animation-guide.md
│   └── page-template.tsx
├── public/
│   └── screenshots/            # Auto-generated previews (ignore for now)
├── designprompts_dev_all_styles.md  # Full design system for all 32 styles
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.ts
```

---

## Before You Write Any Code

1. **Read `docs/architecture.md`** — page structure, component layout, naming
2. **Read `docs/ui-ux-guidelines.md`** — accessibility, spacing, interaction rules
3. **Read `docs/animation-guide.md`** — Framer Motion patterns
4. **Read `docs/nextjs-best-practices.md`** — Server/Client component rules
5. **Read `docs/page-template.tsx`** — exact code scaffold to follow
6. **Read the relevant style section in `designprompts_dev_all_styles.md`**

---

## Style Slugs (URL → Style Name)

| Slug | Style Name |
|------|-----------|
| academia | Academia |
| art-deco | Art Deco |
| bauhaus | Bauhaus |
| bold-typography | Bold Typography |
| botanical | Botanical |
| claymorphism | Claymorphism |
| cyberpunk | Cyberpunk |
| enterprise | Enterprise |
| flat-design | Flat Design |
| fluent-2 | Fluent 2 |
| industrial | Industrial |
| kinetic | Kinetic |
| luxury | Luxury |
| material | Material |
| maximalism | Maximalism |
| minimal-dark | Minimal Dark |
| modern-dark | Modern Dark |
| monochrome | Monochrome |
| neo-brutalism | Neo-brutalism |
| neumorphism | Neumorphism |
| newsprint | Newsprint |
| organic | Organic |
| playful-geometric | Playful Geometric |
| professional | Professional |
| retro | Retro |
| humanist-literary | Humanist Literary |
| saas | SaaS |
| sketch | Sketch |
| swiss | Swiss |
| terminal-cli | Terminal CLI |
| vaporwave | Vaporwave |
| web3 | Web3 |

---

## Landing Page Sections (Required for Every Style)

Every page MUST include these sections in this exact order:

1. **Navbar** — logo, nav links, CTA button
2. **Hero** — headline, subheadline, 2 CTA buttons, hero visual
3. **Stats Bar** — 3–4 key metrics (numbers + labels)
4. **Features** — 6 features in a 3-column grid
5. **Product Detail** — detailed description section with rich typography
6. **Pricing** — 3 tiers (Free / Pro / Enterprise), middle tier highlighted
7. **Testimonials** — 3 testimonials in a 3-column grid
8. **FAQ** — 6 accordion-style questions
9. **Newsletter CTA** — email signup with headline
10. **Footer** — links, copyright

The **content** for each page should be thematically appropriate to the design style (e.g. Academia uses scholarly language, Cyberpunk uses tech jargon).

---

## Build & Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # Production build
npm run lint
```

---

## Commit Convention

Each style page is one commit:
```
feat: add [style-name] landing page
```

---

## Notes for Jules

- Use `"use client"` only in Motion wrapper components, never on the page itself
- All custom colors via Tailwind arbitrary values: `bg-[#1C1714]`, `text-[#C9A962]`
- Import fonts via `next/font/google` at the top of each page file
- Never use inline `style={{}}` for colors — always use Tailwind classes
- Every image placeholder: use `div` with background gradient matching the style
- Touch targets minimum 44px height
- Always include `prefers-reduced-motion` via Framer Motion's `useReducedMotion`
