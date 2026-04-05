# Architecture — oh-my-design

## Philosophy

32 landing pages. Same skeleton. Different skin.

Every page is a **self-contained Next.js Server Component** at `app/styles/[slug]/page.tsx`. The page file defines its own fonts, design tokens, and all 10 required sections. There is no shared design system between styles — that would defeat the purpose.

---

## Page File Structure

Each `app/styles/[slug]/page.tsx` follows this exact pattern:

```tsx
// 1. Next.js metadata
// 2. Font imports via next/font/google
// 3. Design token constants
// 4. Motion wrapper components ("use client")
// 5. Page component (Server Component — no "use client" at top)
// 6. Each section as a local function
```

See `docs/page-template.tsx` for the full boilerplate.

---

## Folder Layout Per Style

```
app/styles/academia/
└── page.tsx          # Self-contained — everything in one file
```

For complex styles, you may split into:
```
app/styles/academia/
├── page.tsx          # Imports from local components
├── hero.tsx          # ("use client" if animated)
└── pricing.tsx
```

---

## Shared Infrastructure (lib/)

```ts
// lib/styles-registry.ts
export const STYLES = [
  { slug: 'academia', name: 'Academia', category: 'Elegant', vibe: 'Scholarly, classic' },
  { slug: 'art-deco', name: 'Art Deco', category: 'Elegant', vibe: 'Luxurious 1920s' },
  // ... all 32
]
```

The home page (`app/page.tsx`) maps over this to render the gallery grid.

---

## Root Layout

`app/layout.tsx` should be minimal:

```tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

No global fonts, no global styles except Tailwind base. Each style page loads its own fonts.

---

## Tailwind Config

The `tailwind.config.ts` must include:

```ts
content: ['./app/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
theme: {
  extend: {
    animation: {
      'fade-in': 'fadeIn 0.6s ease-out',
      'slide-up': 'slideUp 0.6s ease-out',
    },
    keyframes: {
      fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
      slideUp: { from: { opacity: '0', transform: 'translateY(24px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
    },
  },
},
```

---

## How Animations Work

Animations use **Framer Motion**. Since page.tsx is a Server Component, create small "use client" wrapper components for animated sections:

```tsx
// In the same page.tsx file, near the top:
'use client' sections are small island components

// Pattern:
function AnimatedHero({ children }: { children: React.ReactNode }) {
  'use client'  // ← This does NOT work inline, use a separate file or a wrapper
}
```

**Correct pattern**: Create a `MotionDiv` wrapper component at the top of the file with `"use client"`:

```tsx
// At top of page.tsx — separate component file is cleaner for large pages
// app/styles/academia/motion.tsx
'use client'
import { motion } from 'framer-motion'
export { motion }
```

Or for simple cases, put the entire page as a client component (acceptable for landing pages since there's no server data fetching).

**Recommended for landing pages**: Mark the entire page as `"use client"` since all sections use animations and there's no server-side data fetching needed. This simplifies the code significantly.

---

## Section Content Guidelines

| Section | Content Theme |
|---------|--------------|
| Navbar | Product name matching the style's aesthetic |
| Hero | Fictional SaaS product pitched in the style's voice |
| Stats | 4 impressive numbers (users, uptime, countries, rating) |
| Features | 6 features relevant to the fictional product |
| Product Detail | 2-3 paragraphs of rich copy in the style's tone |
| Pricing | Free: $0 / Pro: $29/mo / Enterprise: $99/mo |
| Testimonials | 3 fictional users with names, roles, companies |
| FAQ | 6 questions about the fictional product |
| Newsletter | "Stay in the loop" email signup |
| Footer | 4 link groups + copyright |

---

## Image Placeholders

No real images. Use styled `<div>` elements:

```tsx
<div className="w-full h-64 rounded-lg bg-gradient-to-br from-[#C9A962] to-[#8B2635]" />
```

Match gradient colors to the style's design tokens.

---

## package.json Dependencies

```json
{
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "framer-motion": "^11.0.0",
    "lucide-react": "latest"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "@types/node": "latest",
    "@types/react": "latest",
    "tailwindcss": "^3.4.0",
    "autoprefixer": "latest",
    "postcss": "latest"
  }
}
```
