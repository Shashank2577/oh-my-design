# Animation Guide — Framer Motion

All animations use **Framer Motion 11**. Remotion is NOT used (it's for video generation).

---

## Setup

```tsx
'use client'
import { motion, useReducedMotion, useInView } from 'framer-motion'
import { useRef } from 'react'
```

---

## Always Respect Reduced Motion

```tsx
function AnimatedSection({ children }: { children: React.ReactNode }) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.6, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
```

---

## Scroll-Triggered Entrance (Most Used Pattern)

```tsx
function FadeInSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' })
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
```

---

## Staggered Children

```tsx
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

// Usage:
<motion.div variants={containerVariants} initial="hidden" animate="visible" whileInView="visible">
  {items.map(item => (
    <motion.div key={item.id} variants={itemVariants}>{item.content}</motion.div>
  ))}
</motion.div>
```

---

## Hover Interactions

```tsx
// Card hover lift
<motion.div
  whileHover={{ y: -4, transition: { duration: 0.2 } }}
  className="cursor-pointer"
>

// Button press
<motion.button
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  transition={{ duration: 0.15 }}
>

// Scale feedback (subtle — 1.02 max)
<motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
```

---

## Timing Reference

| Interaction | Duration | Easing |
|-------------|---------|--------|
| Button press / focus | 150ms | easeOut |
| Hover state change | 200–300ms | easeOut |
| Card lift / border color | 300ms | easeOut |
| Section entrance | 500–600ms | [0.22, 1, 0.36, 1] |
| Image filter (sepia → color) | 700ms | easeOut |
| Stagger delay between items | 80ms | — |

---

## What NOT to Animate

```tsx
// ❌ These cause layout reflow — never animate these
width, height, margin, padding, top, left, right, bottom

// ✅ These are GPU-accelerated — always use these
opacity, transform (translateX/Y/Z, scale, rotate)
```

---

## Hero Entrance Pattern

```tsx
const heroVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
}

const heroItemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

// In component:
<motion.div variants={heroVariants} initial="hidden" animate="visible">
  <motion.p variants={heroItemVariants}>Overline</motion.p>
  <motion.h1 variants={heroItemVariants}>Main Headline</motion.h1>
  <motion.p variants={heroItemVariants}>Subheadline</motion.p>
  <motion.div variants={heroItemVariants}>CTA Buttons</motion.div>
</motion.div>
```

---

## FAQ Accordion

```tsx
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)} aria-expanded={isOpen}>
        {question}
        <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
          ▼
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        style={{ overflow: 'hidden' }}
      >
        {answer}
      </motion.div>
    </div>
  )
}
```

---

## Per-Style Animation Personality

Each design style has its own motion personality — match it:

| Style | Motion Personality | Duration | Easing |
|-------|-------------------|---------|--------|
| Academia | Dignified, slow | 500–700ms | ease-out |
| Cyberpunk | Snappy, glitchy | 100–200ms | linear/steps |
| Botanical | Organic, flowing | 600–900ms | ease-in-out |
| Bauhaus | Mechanical, precise | 300ms | linear |
| Claymorphism | Bouncy, playful | 400ms | spring |
| Enterprise | Professional, subtle | 300ms | ease-out |
| Kinetic | Fast, energetic | 150–300ms | ease-out |
| Luxury | Slow, cinematic | 800–1200ms | cubic-bezier(0.16, 1, 0.3, 1) |
| Neo-brutalism | Sharp, instant | 100ms | ease-in |
| Vaporwave | Dreamy, slow fade | 700–1000ms | ease-in-out |

For styles not listed, use the default: **500ms, ease-out**.
