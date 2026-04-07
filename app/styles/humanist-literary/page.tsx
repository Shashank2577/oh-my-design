'use client'

/**
 * PAGE: Humanist Literary (The "Claude" Aesthetic)
 */

import { motion, useReducedMotion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import {
  Star, ChevronDown, ArrowRight, Check, BookOpen, Layout,
  Palette, Code2, BarChart, Lock, PenTool, Lightbulb, Coffee
} from 'lucide-react'

// ─────────────────────────────────────────────
// FONTS
// ─────────────────────────────────────────────
const cormorant = Cormorant_Garamond({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-cormorant',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

// ─────────────────────────────────────────────
// DESIGN TOKENS (Humanist Literary)
// ─────────────────────────────────────────────
const tokens = {
  background: '#FAF9F6',     // "Canvas" light warm gray/eggshell
  foreground: '#383838',     // "Ink" soft charcoal
  muted: '#F2F0EB',          // Secondary backgrounds
  mutedForeground: '#6B6960',// Descriptions, placeholders
  border: '#E8E6E0',         // Subtle warm borders
  primary: '#DA7756',        // "Clay" dedicated submit/action color (Terracotta)
  primaryForeground: '#FFFFFF',
  ring: '#D6D4CD',
}

// ─────────────────────────────────────────────
// MOTION HELPERS
// ─────────────────────────────────────────────
const easeOut = [0.23, 1, 0.32, 1] as const

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-5% 0px' })
  const shouldReduce = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      initial={shouldReduce ? false : { opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: easeOut }}
    >
      {children}
    </motion.div>
  )
}

function StaggerContainer({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-5% 0px' })
  const shouldReduce = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={shouldReduce ? false : 'hidden'}
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.08 } },
      }}
    >
      {children}
    </motion.div>
  )
}

const staggerItem = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOut } },
}

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────
const PRODUCT_NAME = 'Lumina'
const TAGLINE = 'Evening, ready to write?'
const DESCRIPTION = 'A thoughtful space for reading, writing, and contemplation. Designed to recede into the background so your ideas can take center stage.'

const NAV_LINKS = ['Thoughts', 'Library', 'Pricing', 'Manifesto']

const STATS = [
  { value: '2.4M', label: 'Words Written' },
  { value: '10k+', label: 'Active Thinkers' },
  { value: 'Zero', label: 'Distractions' },
  { value: '4.9', label: 'Average Rating' },
]

const FEATURES = [
  { icon: PenTool, title: 'Uncluttered Canvas', description: 'A writing environment that removes all interface elements until you need them.' },
  { icon: BookOpen, title: 'Editorial Typography', description: 'Carefully selected font pairings that make reading a joy, not a strain on the eyes.' },
  { icon: Palette, title: 'Warm Aesthetics', description: 'Off-white backgrounds and soft charcoal ink to reduce eye fatigue during long sessions.' },
  { icon: Code2, title: 'Semantic Structure', description: 'Export your thoughts in clean, semantic HTML or Markdown with a single click.' },
  { icon: Lightbulb, title: 'Gentle Prompts', description: 'Subtle suggestions and organization tools that help unblock your writing process.' },
  { icon: Coffee, title: 'Focused Sessions', description: 'Built-in timers and goal tracking that respect your time and attention.' },
]

const PRICING = [
  {
    name: 'Journal',
    price: '$0',
    period: 'forever',
    description: 'A quiet place for your personal thoughts.',
    features: ['Unlimited entries', 'Basic typography', 'Local storage', 'Markdown export'],
    cta: 'Start Writing',
    highlighted: false,
  },
  {
    name: 'Manuscript',
    price: '$12',
    period: 'per month',
    description: 'For dedicated writers and thinkers.',
    features: ['Cloud sync', 'Premium font library', 'Version history', 'Focus modes', 'Priority support'],
    cta: 'Begin Trial',
    highlighted: true,
  },
  {
    name: 'Archive',
    price: '$29',
    period: 'per month',
    description: 'For prolific authors and teams.',
    features: ['Everything in Manuscript', 'Collaboration tools', 'Custom domains', 'API access', 'White-glove onboarding'],
    cta: 'Contact Us',
    highlighted: false,
  },
]

const TESTIMONIALS = [
  {
    name: 'Dr. Evelyn Hayes',
    role: 'Author & Researcher',
    company: 'Institute for Advanced Study',
    text: 'It feels like writing in a high-quality Moleskine notebook, but with the power of modern software. The typographic choices are exquisite.',
    rating: 5,
  },
  {
    name: 'Julian Thorne',
    role: 'Novelist',
    company: 'Independent',
    text: 'I finally found a digital environment that doesn\'t feel hostile. The warm background and soft contrast actually help me think more clearly.',
    rating: 5,
  },
  {
    name: 'Amara Singh',
    role: 'Philosophy Professor',
    company: 'University College',
    text: 'The interface is so quiet it\'s almost invisible. It respects the text, which is rare in today\'s loud, notification-driven software landscape.',
    rating: 5,
  },
]

const FAQ_ITEMS = [
  { q: 'Why no dark mode?', a: 'Our research indicates that reading long-form text on pure black backgrounds causes astigmatism-related halation. We provide a warm, low-contrast "dim" mode instead.' },
  { q: 'Can I export my data?', a: 'Always. Your thoughts belong to you. You can export your entire library to Markdown, plain text, or PDF at any time with a single click.' },
  { q: 'What fonts do you use?', a: 'We carefully pair modern interpretations of classic serifs (like Tiempos or Cormorant) with highly legible grotesque sans-serifs for the interface elements.' },
  { q: 'Is there a mobile app?', a: 'Yes, a companion app designed specifically for capturing fleeting thoughts on the go, which syncs seamlessly to your desktop environment.' },
]

// ─────────────────────────────────────────────
// COMPONENTS
// ─────────────────────────────────────────────

function Navbar() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{ backgroundColor: `${tokens.background}f2`, backdropFilter: 'blur(8px)' }}
    >
      <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
        <span className={`font-medium text-2xl ${cormorant.className}`} style={{ color: tokens.foreground }}>
          {PRODUCT_NAME}.
        </span>
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className={`text-sm transition-colors hover:opacity-70 ${inter.className}`}
              style={{ color: tokens.mutedForeground }}
            >
              {link}
            </a>
          ))}
        </div>
        <motion.button
          whileHover={{ opacity: 0.9 }}
          whileTap={{ scale: 0.98 }}
          className={`px-5 py-2 rounded-full text-sm transition-shadow ${inter.className}`}
          style={{ backgroundColor: tokens.primary, color: tokens.primaryForeground }}
        >
          Sign in
        </motion.button>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section className="pt-40 pb-24 px-6 min-h-[85vh] flex flex-col justify-center" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-4xl mx-auto w-full">
        <FadeUp>
          <h1 className={`text-5xl md:text-6xl font-medium mb-12 leading-tight ${cormorant.className}`} style={{ color: tokens.foreground }}>
            {TAGLINE}
          </h1>

          <div className="relative mb-12">
            <div
              className="w-full min-h-[160px] p-6 rounded-2xl border transition-colors focus-within:border-gray-300"
              style={{ backgroundColor: tokens.background, borderColor: tokens.border, boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}
            >
              <p className={`text-lg ${inter.className}`} style={{ color: tokens.mutedForeground }}>
                Start typing your thoughts...
              </p>

              <div className="absolute bottom-4 right-4">
                 <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm"
                    style={{ backgroundColor: tokens.primary, color: tokens.primaryForeground }}
                 >
                    <ArrowRight className="w-5 h-5 -rotate-90" />
                 </motion.button>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
             {['Draft a post', 'Summarize notes', 'Brainstorm ideas', 'Refine text'].map((chip, idx) => (
                <motion.button
                  key={chip}
                  whileHover={{ backgroundColor: tokens.muted }}
                  className={`px-4 py-2 rounded-full border text-sm flex items-center gap-2 ${inter.className}`}
                  style={{ borderColor: tokens.border, color: tokens.foreground, backgroundColor: tokens.background }}
                >
                  {idx === 0 && <PenTool className="w-4 h-4" style={{ color: tokens.mutedForeground }} strokeWidth={1.5} />}
                  {idx === 1 && <BookOpen className="w-4 h-4" style={{ color: tokens.mutedForeground }} strokeWidth={1.5} />}
                  {idx === 2 && <Lightbulb className="w-4 h-4" style={{ color: tokens.mutedForeground }} strokeWidth={1.5} />}
                  {idx === 3 && <Layout className="w-4 h-4" style={{ color: tokens.mutedForeground }} strokeWidth={1.5} />}
                  {chip}
                </motion.button>
             ))}
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

function Stats() {
  return (
    <section className="py-20" style={{ backgroundColor: tokens.muted }}>
      <div className="max-w-5xl mx-auto px-6">
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat) => (
              <motion.div key={stat.label} variants={staggerItem} className="text-center">
                <p className={`text-4xl md:text-5xl font-medium mb-3 ${cormorant.className}`} style={{ color: tokens.foreground }}>{stat.value}</p>
                <p className={`text-sm ${inter.className}`} style={{ color: tokens.mutedForeground }}>{stat.label}</p>
              </motion.div>
            ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

function Features() {
  return (
    <section id="features" className="py-32 px-6" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-5xl mx-auto">
        <FadeUp>
          <div className="mb-20 text-center">
            <h2 className={`text-4xl md:text-5xl font-medium mb-6 ${cormorant.className}`} style={{ color: tokens.foreground }}>
              Quiet intelligence
            </h2>
            <p className={`text-lg max-w-2xl mx-auto ${inter.className}`} style={{ color: tokens.mutedForeground }}>
              Every feature is designed to be invisible until you need it, creating a serene environment for deep work.
            </p>
          </div>
        </FadeUp>
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
            {FEATURES.map(feature => (
              <motion.div key={feature.title} variants={staggerItem} className="flex flex-col">
                <div className="w-10 h-10 mb-6 flex items-center justify-center rounded-full border" style={{ borderColor: tokens.border, backgroundColor: tokens.background }}>
                    <feature.icon className="w-5 h-5" style={{ color: tokens.foreground }} strokeWidth={1.5} />
                </div>
                <h3 className={`text-xl font-medium mb-3 ${cormorant.className}`} style={{ color: tokens.foreground }}>{feature.title}</h3>
                <p className={`text-sm leading-relaxed ${inter.className}`} style={{ color: tokens.mutedForeground }}>{feature.description}</p>
              </motion.div>
            ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

function ProductDetail() {
  return (
    <section className="py-32 px-6" style={{ backgroundColor: tokens.muted }}>
      <div className="max-w-4xl mx-auto">
        <FadeUp>
          <div className="rounded-3xl p-8 md:p-16" style={{ backgroundColor: tokens.background, border: `1px solid ${tokens.border}`, boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
            <h2 className={`text-3xl md:text-4xl font-medium mb-8 text-center ${cormorant.className}`} style={{ color: tokens.foreground }}>
              The Philosophy of Paper
            </h2>
            <div className={`space-y-6 text-lg leading-relaxed ${inter.className}`} style={{ color: tokens.foreground }}>
              <p>
                <span className={`float-left text-6xl leading-[0.8] pr-3 pt-2 font-medium ${cormorant.className}`} style={{ color: tokens.primary }}>W</span>
                e designed this interface to mimic the tactile warmth of a high-quality journal. Pure white and stark black create harsh contrast that fatigues the eyes. Instead, we use soft fawn backgrounds and deep charcoal ink.
              </p>
              <p>
                The typography is a deliberate conversation between the organic warmth of a classic serif for your voice, and the clean utility of a modern sans-serif for the interface. It is editorial design applied to software.
              </p>
            </div>
            <div className="mt-12 pt-8 border-t flex justify-center" style={{ borderColor: tokens.border }}>
               <span className={`text-sm ${inter.className}`} style={{ color: tokens.mutedForeground }}>— The Design Team</span>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

function Pricing() {
  return (
    <section id="pricing" className="py-32 px-6" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-5xl mx-auto">
        <FadeUp>
          <div className="text-center mb-20">
            <h2 className={`text-4xl md:text-5xl font-medium mb-6 ${cormorant.className}`} style={{ color: tokens.foreground }}>Simple plans</h2>
            <p className={`text-lg ${inter.className}`} style={{ color: tokens.mutedForeground }}>Choose the environment that suits your practice.</p>
          </div>
        </FadeUp>
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PRICING.map(tier => (
              <motion.div
                key={tier.name}
                variants={staggerItem}
                className="p-10 rounded-3xl relative flex flex-col"
                style={{
                  backgroundColor: tier.highlighted ? tokens.muted : tokens.background,
                  border: `1px solid ${tokens.border}`,
                  boxShadow: tier.highlighted ? '0 4px 20px rgba(0,0,0,0.02)' : 'none'
                }}
              >
                <div className="mb-8 border-b pb-8" style={{ borderColor: tokens.border }}>
                   <h3 className={`text-2xl font-medium mb-2 ${cormorant.className}`} style={{ color: tokens.foreground }}>{tier.name}</h3>
                   <div className={`flex items-baseline gap-1 mb-3 ${inter.className}`}>
                     <span className="text-3xl" style={{ color: tokens.foreground }}>{tier.price}</span>
                     <span className="text-sm" style={{ color: tokens.mutedForeground }}>/ {tier.period}</span>
                   </div>
                   <p className={`text-sm ${inter.className}`} style={{ color: tokens.mutedForeground }}>{tier.description}</p>
                </div>

                <ul className={`space-y-4 mb-10 flex-grow ${inter.className}`}>
                  {tier.features.map(f => (
                    <li key={f} className="flex items-center gap-3 text-sm">
                      <Check className="h-4 w-4 flex-shrink-0" style={{ color: tokens.mutedForeground }} strokeWidth={1.5} />
                      <span style={{ color: tokens.foreground }}>{f}</span>
                    </li>
                  ))}
                </ul>
                <motion.button
                  whileHover={{ opacity: 0.9 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full h-12 rounded-full text-sm transition-all ${inter.className}`}
                  style={tier.highlighted
                    ? { backgroundColor: tokens.primary, color: tokens.primaryForeground }
                    : { backgroundColor: tokens.background, color: tokens.foreground, border: `1px solid ${tokens.border}` }
                  }
                >
                  {tier.cta}
                </motion.button>
              </motion.div>
            ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

function Testimonials() {
  return (
    <section id="testimonials" className="py-32 px-6" style={{ backgroundColor: tokens.muted }}>
      <div className="max-w-5xl mx-auto">
        <FadeUp>
          <div className="mb-20 text-center">
            <h2 className={`text-4xl md:text-5xl font-medium mb-4 ${cormorant.className}`} style={{ color: tokens.foreground }}>From our readers</h2>
          </div>
        </FadeUp>
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map(t => (
              <motion.div
                key={t.name}
                variants={staggerItem}
                className="p-10 rounded-3xl"
                style={{ backgroundColor: tokens.background, border: `1px solid ${tokens.border}` }}
              >
                <p className={`text-lg leading-relaxed mb-8 ${cormorant.className} italic`} style={{ color: tokens.foreground }}>"{t.text}"</p>
                <div className={`pt-6 border-t ${inter.className}`} style={{ borderColor: tokens.border }}>
                  <p className="text-sm font-medium mb-1" style={{ color: tokens.foreground }}>{t.name}</p>
                  <p className="text-xs" style={{ color: tokens.mutedForeground }}>{t.role}, {t.company}</p>
                </div>
              </motion.div>
            ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="py-32 px-6" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-3xl mx-auto">
        <FadeUp>
          <div className="text-center mb-20">
            <h2 className={`text-4xl md:text-5xl font-medium ${cormorant.className}`} style={{ color: tokens.foreground }}>Questions & Answers</h2>
          </div>
        </FadeUp>
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, i) => (
            <FadeUp key={i} delay={i * 0.05}>
              <div className="rounded-2xl overflow-hidden border transition-colors" style={{ backgroundColor: tokens.background, borderColor: openIndex === i ? tokens.border : 'transparent' }}>
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  aria-expanded={openIndex === i}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className={`text-xl font-medium ${cormorant.className}`} style={{ color: tokens.foreground }}>{item.q}</span>
                  <motion.span
                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: easeOut }}
                  >
                    <ChevronDown className="h-5 w-5 flex-shrink-0" style={{ color: tokens.mutedForeground }} strokeWidth={1.5} />
                  </motion.span>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openIndex === i ? 'auto' : 0, opacity: openIndex === i ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: easeOut }}
                  style={{ overflow: 'hidden' }}
                >
                  <p className={`px-6 pb-6 text-base leading-relaxed ${inter.className}`} style={{ color: tokens.mutedForeground }}>
                    {item.a}
                  </p>
                </motion.div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}

function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setTimeout(() => setStatus('success'), 1200)
  }

  return (
    <section className="py-32 px-6" style={{ backgroundColor: tokens.muted }}>
      <div className="max-w-2xl mx-auto text-center">
        <FadeUp>
          <h2 className={`text-4xl md:text-5xl font-medium mb-6 ${cormorant.className}`} style={{ color: tokens.foreground }}>Occasional missives</h2>
          <p className={`text-lg mb-10 ${inter.className}`} style={{ color: tokens.mutedForeground }}>
            Essays on thought, writing, and design. Sent rarely.
          </p>
          {status === 'success' ? (
            <p className={`text-sm ${inter.className}`} style={{ color: tokens.primary }}>
               We've noted your address. Thank you.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
              <label htmlFor="newsletter-email" className="sr-only">Email address</label>
              <input
                id="newsletter-email"
                type="email"
                required
                autoComplete="email"
                placeholder="email@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className={`flex-1 h-12 px-5 rounded-full border text-sm focus:outline-none focus:ring-1 transition-all ${inter.className}`}
                style={{ backgroundColor: tokens.background, color: tokens.foreground, borderColor: tokens.border, '--tw-ring-color': tokens.primary } as React.CSSProperties}
              />
              <motion.button
                type="submit"
                disabled={status === 'loading'}
                whileHover={{ opacity: 0.9 }}
                whileTap={{ scale: 0.98 }}
                className={`h-12 px-6 rounded-full text-sm disabled:opacity-60 transition-all ${inter.className}`}
                style={{ backgroundColor: tokens.primary, color: tokens.primaryForeground }}
              >
                {status === 'loading' ? 'Sending' : 'Subscribe'}
              </motion.button>
            </form>
          )}
        </FadeUp>
      </div>
    </section>
  )
}

function Footer() {
  const links = {
    Space: ['Library', 'Canvas', 'Archives'],
    Company: ['About Us', 'Careers', 'Contact'],
    Legal: ['Privacy', 'Terms'],
  }

  return (
    <footer className="py-20 px-6 border-t" style={{ backgroundColor: tokens.background, borderColor: tokens.border }}>
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2 md:col-span-1">
            <p className={`font-medium text-2xl mb-4 ${cormorant.className}`} style={{ color: tokens.foreground }}>{PRODUCT_NAME}.</p>
            <p className={`text-sm ${inter.className}`} style={{ color: tokens.mutedForeground }}>
              A quiet place to think.
            </p>
          </div>
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <p className={`text-sm mb-4 ${inter.className}`} style={{ color: tokens.foreground }}>{group}</p>
              <ul className="space-y-3">
                {items.map(item => (
                  <li key={item}>
                    <a href="#" className={`text-sm hover:opacity-70 transition-opacity ${inter.className}`} style={{ color: tokens.mutedForeground }}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className={`flex flex-col md:flex-row items-center justify-between pt-8 border-t gap-4 text-xs ${inter.className}`} style={{ borderColor: tokens.border }}>
          <p style={{ color: tokens.mutedForeground }}>
            © {new Date().getFullYear()} {PRODUCT_NAME} Inc.
          </p>
          <a
            href="/"
            className="hover:opacity-70 transition-opacity"
            style={{ color: tokens.mutedForeground }}
          >
            ← Directory
          </a>
        </div>
      </div>
    </footer>
  )
}

// ─────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────
export default function HumanistPage() {
  return (
    <div className={`min-h-screen selection:bg-[#DA7756] selection:text-white ${inter.variable} ${cormorant.variable}`} style={{ backgroundColor: tokens.background }}>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Features />
        <ProductDetail />
        <Pricing />
        <Testimonials />
        <FAQ />
        <Newsletter />
      </main>
      <Footer />
      
      </div>
  )
}
