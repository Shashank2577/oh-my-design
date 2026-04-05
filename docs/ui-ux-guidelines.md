# UI/UX Guidelines — oh-my-design

Condensed from UI/UX Pro Max skill. Apply to ALL 32 landing pages.

---

## Priority 1: Accessibility (CRITICAL)

- Minimum **4.5:1 contrast ratio** for body text; 3:1 for large text (18px+)
- **Visible focus rings** on all interactive elements — never remove with `outline: none`
- Every interactive icon must have an `aria-label`
- Tab order follows visual reading order
- Skip-to-content link in navbar
- `h1` → `h2` → `h3` — never skip heading levels
- `prefers-reduced-motion`: wrap ALL Framer Motion animations with `useReducedMotion()`

---

## Priority 2: Touch & Interaction (CRITICAL)

- Minimum **44×44px** touch target for all buttons and links
- Minimum **8px gap** between adjacent touch targets
- Button shows loading state during async operations
- `cursor-pointer` on all clickable non-button elements
- `touch-action: manipulation` to eliminate 300ms tap delay

---

## Priority 3: Performance (HIGH)

- Image placeholders use `div` with gradient — no unoptimized `<img>` tags
- Fonts loaded via `next/font/google` with `display: 'swap'`
- No `@import` for fonts in CSS
- Framer Motion imported from `framer-motion` (tree-shakeable)
- Lucide icons imported individually: `import { BookOpen } from 'lucide-react'`

---

## Priority 5: Layout & Responsive (HIGH)

- **Mobile-first**: All layouts start single-column, expand on `md:` and `lg:`
- Max content width: `max-w-6xl` (standard), `max-w-7xl` (full sections)
- Breakpoints: `sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`
- No horizontal scroll on any viewport
- Section vertical padding: `py-16 md:py-24`
- `min-h-dvh` instead of `min-h-screen` for hero sections

---

## Priority 6: Typography & Color (MEDIUM)

- Body text minimum **16px** (`text-base`)
- Line height body text: **1.5–1.75** (`leading-relaxed`)
- Line length: **60–75 chars** per line (use `max-w-prose` or `max-w-2xl`)
- All colors defined as constants at file top — never scatter raw hex
- Never use **pure black** (`#000000`) or **pure white** (`#ffffff`) — use the style's warm/cool equivalents
- Use semantic color naming: `background`, `foreground`, `accent`, `muted`, `border`

---

## Priority 7: Animation (MEDIUM)

See `docs/animation-guide.md` for Framer Motion patterns.

Key rules:
- Micro-interactions: **150–300ms**
- Section entrances: **400–600ms**
- Never animate `width`, `height`, `top`, `left` — use `transform` and `opacity` only
- **1–2 animated elements per section max** — no visual chaos
- `ease-out` for enter, `ease-in` for exit
- Always respect `useReducedMotion()`

---

## Priority 8: Forms (MEDIUM)

Newsletter signup section requirements:
- Visible `<label>` (not placeholder-only)
- Error state shown below the input
- Button shows loading → success state
- `type="email"` on email input
- `autocomplete="email"` attribute

---

## Layout Patterns

### Hero Section
```
┌─────────────────────────────────────┐
│  [Navbar]                           │
├─────────────────────────────────────┤
│  Overline label                     │
│  H1 Headline (large)                │
│  Subheadline paragraph              │
│  [Primary CTA] [Secondary CTA]      │
│                                     │
│  [Hero Visual / Gradient Div]       │
└─────────────────────────────────────┘
```

### Features Grid
```
3-column on desktop, 1-column on mobile
Each card: icon + title + description
```

### Pricing
```
3 cards, middle card highlighted (border + shadow + badge)
Free | [Pro — Featured] | Enterprise
```

### FAQ
```
Accordion — click to expand/collapse
Use Headless UI or simple useState toggle
```

---

## Anti-Patterns (Never Do These)

- ❌ Placeholder-only form labels
- ❌ Hover-only interactions (no touch equivalent)
- ❌ Fixed pixel widths on containers
- ❌ `outline: none` without replacement focus indicator
- ❌ Color-only error states (always pair with icon/text)
- ❌ Animating layout properties (width/height/margin)
- ❌ More than 2 primary CTAs visible at once
- ❌ Missing `alt` text on images
- ❌ Z-index values without a defined scale
- ❌ Mixing icon libraries in one page
