# Next.js 15 Best Practices — oh-my-design

---

## Server vs Client Components

**Default**: Every component is a Server Component unless it needs:
- `useState` / `useEffect` / `useRef`
- Browser APIs (`window`, `document`)
- Event handlers (`onClick`, `onChange`)
- Framer Motion animations

**Rule for this project**: Since landing pages are static (no data fetching) and heavily animated, mark each `page.tsx` as `"use client"` at the top. This is the right tradeoff for a purely presentational showcase app.

```tsx
'use client'  // ← at top of each style page

import { useReducedMotion, motion } from 'framer-motion'
import { Cormorant_Garamond, Crimson_Pro } from 'next/font/google'
```

---

## Font Loading

Always use `next/font/google`. Never `@import` in CSS.

```tsx
import { Cormorant_Garamond, Cinzel } from 'next/font/google'

const heading = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-heading',
  display: 'swap',
})

const display = Cinzel({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-display',
  display: 'swap',
})

// In component:
<div className={`${heading.variable} ${display.variable}`}>
```

---

## Metadata

Each page exports a `metadata` object:

```tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Academia — oh-my-design',
  description: 'Scholarly, classic design style showcase',
}
```

Note: `metadata` export only works in Server Components. If using `"use client"`, define metadata in a parent layout or use a `<head>` workaround. For this project, skip `metadata` export on client pages and rely on the root layout's title.

---

## Image Optimization

No real images in this project — use gradient divs. If you add images later:

```tsx
import Image from 'next/image'

<Image
  src="/hero.webp"
  alt="Hero illustration"
  width={800}
  height={600}
  priority  // Only for above-the-fold images
  className="rounded-lg"
/>
```

---

## Tailwind & Arbitrary Values

Custom design token colors via Tailwind arbitrary values:

```tsx
// ✅ Correct
<div className="bg-[#1C1714] text-[#E8DFD4] border-[#4A3F35]" />

// ❌ Never do this
<div style={{ backgroundColor: '#1C1714' }} />
```

For repeated values, define as CSS variables or Tailwind config extensions.

---

## Code Splitting

Each style page is automatically code-split by Next.js routing. No manual dynamic imports needed for the page itself.

For heavy libraries used only in one page, use dynamic import:
```tsx
const HeavyComponent = dynamic(() => import('./heavy'), { ssr: false })
```

---

## Project Initialization

When setting up from scratch, run:

```bash
npx create-next-app@latest . --typescript --tailwind --app --src-dir=false --import-alias="@/*" --no-git
npm install framer-motion lucide-react
```

Then configure `tailwind.config.ts` and `next.config.ts`.

---

## next.config.ts

```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Enable React 19 features
  experimental: {
    reactCompiler: false, // Enable when stable
  },
}

export default nextConfig
```

---

## TypeScript Patterns

```tsx
// Component props
interface HeroProps {
  title: string
  subtitle: string
  cta: { label: string; href: string }
}

// Design tokens type
interface DesignTokens {
  background: string
  foreground: string
  accent: string
  border: string
}

// Use satisfies for type-safe token objects
const tokens = {
  background: '#1C1714',
  foreground: '#E8DFD4',
} satisfies Partial<DesignTokens>
```

---

## File Naming

- Pages: `app/styles/[slug]/page.tsx`
- Shared lib: `lib/styles-registry.ts`
- All TypeScript, all `.tsx` for JSX files
- Kebab-case for directories, PascalCase for component names
