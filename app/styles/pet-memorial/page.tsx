'use client'

import { motion, useReducedMotion, useInView, useScroll, useTransform, useSpring } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Libre_Baskerville } from 'next/font/google'
import {
  Heart, ChevronDown, ArrowRight, Check, Users, Shield,
  BookOpen, Feather, Sparkles, Sun, Star
} from 'lucide-react'

// ─────────────────────────────────────────────
// FONTS
// ─────────────────────────────────────────────
const primaryFont = Libre_Baskerville({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-primary',
  display: 'swap',
  style: ['normal', 'italic']
})

const secondaryFont = Libre_Baskerville({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-secondary',
  display: 'swap',
  style: ['normal', 'italic']
})

// ─────────────────────────────────────────────
// DESIGN TOKENS
// ─────────────────────────────────────────────
const tokens = {
  background: '#121212',
  backgroundAlt: '#1A1A1A',
  surface: 'rgba(255, 255, 255, 0.03)',
  foreground: '#E0E0E0',
  muted: '#2A2A2A',
  mutedForeground: '#808080',
  border: 'rgba(255, 255, 255, 0.1)',
  accent1: '#FAD02C',
  accent2: '#89CFF0',
}

// ─────────────────────────────────────────────
// MOTION HELPERS
// ─────────────────────────────────────────────
function EtherealDrift({ children }: { children: React.ReactNode }) {
  const shouldReduce = useReducedMotion()
  if (shouldReduce) return <>{children}</>
  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ repeat: Infinity, duration: 8, ease: [0.42, 0, 0.58, 1] as [number, number, number, number] }}
    >
      {children}
    </motion.div>
  )
}

function SlowFade({ children, delay = 0, blur = true }: { children: React.ReactNode; delay?: number; blur?: boolean }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' })
  const shouldReduce = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      initial={shouldReduce ? false : { opacity: 0, filter: blur ? 'blur(10px)' : 'blur(0px)' }}
      animate={isInView ? { opacity: 1, filter: 'blur(0px)' } : {}}
      transition={{ duration: 2, delay, ease: [0.42, 0, 1, 1] as [number, number, number, number] }}
    >
      {children}
    </motion.div>
  )
}

function StaggerEthereal({ children }: { children: React.ReactNode }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' })
  const shouldReduce = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      initial={shouldReduce ? false : 'hidden'}
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.3 } },
      }}
    >
      {children}
    </motion.div>
  )
}

const staggerFade: import('framer-motion').Variants = {
  hidden: { opacity: 0, filter: 'blur(5px)' },
  visible: { opacity: 1, filter: 'blur(0px)', transition: { duration: 1.5, ease: [0.42, 0, 1, 1] as [number, number, number, number] } },
}

function CandleFlicker({ children }: { children: React.ReactNode }) {
    const shouldReduce = useReducedMotion()
    if (shouldReduce) return <>{children}</>

    return (
        <motion.div
            animate={{
                boxShadow: [
                    `0 0 10px 2px ${tokens.accent1}40`,
                    `0 0 15px 4px ${tokens.accent1}60`,
                    `0 0 8px 1px ${tokens.accent1}30`,
                    `0 0 20px 5px ${tokens.accent1}70`,
                    `0 0 10px 2px ${tokens.accent1}40`,
                ],
                opacity: [0.8, 1, 0.7, 1, 0.8]
            }}
            transition={{
                duration: 0.5,
                repeat: Infinity,
                repeatType: "mirror",
                ease: [0, 0, 1, 1] as [number, number, number, number],
                times: [0, 0.2, 0.5, 0.8, 1]
            }}
        >
            {children}
        </motion.div>
    )
}

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────
const PRODUCT_NAME = 'Eternal Garden'
const TAGLINE = 'Honoring the lives we shared.'
const DESCRIPTION = 'A peaceful, digital sanctuary to remember, celebrate, and preserve the memories of our beloved companions forever.'

const NAV_LINKS = ['Sanctuary', 'Tributes', 'Community', 'FAQ']

const STATS = [
  { value: '10K+', label: 'Memories Shared' },
  { value: 'Forever', label: 'Preservation' },
  { value: 'Global', label: 'Community' },
  { value: 'Infinite', label: 'Love' },
]

const FEATURES = [
  { icon: Heart, title: 'Eternal Tributes', description: 'Create a lasting digital memorial with photos, stories, and videos that will never fade.' },
  { icon: Sparkles, title: 'Memory Gardens', description: 'Plant digital flora that grows and blooms over time, representing enduring love.' },
  { icon: BookOpen, title: 'Shared Stories', description: 'Invite family and friends to contribute their own memories to a collective journal.' },
  { icon: Sun, title: 'Anniversary Reminders', description: 'Gentle, comforting reminders on special dates to pause and remember.' },
  { icon: Shield, title: 'Private & Secure', description: 'Your memories are safely stored in a private sanctuary, accessible only to those you choose.' },
  { icon: Feather, title: 'Grief Support', description: 'Access a library of comforting resources and connect with a supportive community.' },
]

const PRICING = [
  {
    name: 'Quiet Corner',
    price: '$0',
    period: 'forever',
    description: 'A simple, beautiful space for a single tribute.',
    features: ['1 Pet Memorial', '10 Photos', 'Basic Guestbook', 'Forever Free'],
    cta: 'Create Tribute',
    highlighted: false,
  },
  {
    name: 'Eternal Garden',
    price: '$29',
    period: 'one-time',
    description: 'A rich, interactive sanctuary for cherished memories.',
    features: ['Unlimited Photos', 'Video Support', 'Memory Garden', 'Shared Contributor Access', 'Custom Themes', 'Priority Support'],
    cta: 'Plant a Garden',
    highlighted: true,
  },
  {
    name: 'Family Legacy',
    price: '$99',
    period: 'one-time',
    description: 'A sprawling estate to honor all your beloved companions.',
    features: ['Everything in Garden', 'Multiple Pet Memorials', 'Connected Lineages', 'Dedicated Keepsake Book', 'Archival Quality Storage'],
    cta: 'Build a Legacy',
    highlighted: false,
  },
]

const TESTIMONIALS = [
  {
    name: 'Sarah M.',
    role: 'Pet Parent',
    company: 'Luna',
    text: 'It gave me so much peace to create this space for Luna. Whenever I miss her, I visit her garden and light a candle.',
    rating: 5,
  },
  {
    name: 'David & James',
    role: 'Family',
    company: 'Max & Bella',
    text: 'A beautiful way to keep their memory alive. We love reading the stories our friends left on their tribute page.',
    rating: 5,
  },
  {
    name: 'Elena R.',
    role: 'Community Member',
    company: 'Oliver',
    text: 'The most respectful, somber, and comforting platform I have found during a very difficult time.',
    rating: 5,
  },
]

const FAQ_ITEMS = [
  { q: 'Is the memorial truly permanent?', a: 'Yes. We are committed to maintaining these digital sanctuaries indefinitely. We use distributed, archival-quality storage to ensure memories are never lost.' },
  { q: 'Who can see the memorial?', a: 'You have complete control over privacy. A memorial can be completely private, shared via a secret link with family, or made public in our community garden.' },
  { q: 'Can I add memories over time?', a: 'Absolutely. A memorial is a living document. You can return at any time to add new stories, photos, or thoughts as they come to you.' },
  { q: 'What is a Memory Garden?', a: 'It is a visual representation of your love. As visitors interact with the memorial and leave thoughts, digital flowers and lights slowly bloom in the space.' },
  { q: 'Can others contribute?', a: 'Yes, if you choose. You can send a contributor link to friends and family, allowing them to upload their own photos and share their perspectives.' },
  { q: 'Do you offer physical keepsakes?', a: 'Yes, on our premium tiers, we offer the option to export the memorial into a beautifully bound, physical keepsake book.' },
]

// ─────────────────────────────────────────────
// COMPONENTS
// ─────────────────────────────────────────────

function GlobalScrollCandle() {
    const { scrollYProgress } = useScroll()
    const blur = useTransform(scrollYProgress, [0, 1], ['2px', '8px'])
    const opacity = useTransform(scrollYProgress, [0, 1], [0.4, 0.9])
    const shouldReduce = useReducedMotion()

    if (shouldReduce) return null

    return (
        <motion.div
            className="fixed bottom-8 right-8 z-50 pointer-events-none mix-blend-screen"
            style={{ opacity }}
        >
            <motion.div
                className="w-4 h-4 rounded-full bg-[#FAD02C]"
                style={{ filter: blur }}
                animate={{
                    scale: [1, 1.2, 0.9, 1.1, 1],
                    x: [0, 2, -1, 1, 0],
                    y: [0, -1, 2, -2, 0]
                }}
                transition={{
                    duration: 0.2,
                    repeat: Infinity,
                    repeatType: "mirror"
                }}
            />
        </motion.div>
    )
}

function Navbar() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-40 border-b backdrop-blur-md"
      style={{ borderColor: tokens.border, backgroundColor: 'rgba(18, 18, 18, 0.8)' }}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <EtherealDrift>
            <span className="font-bold text-xl italic tracking-wide" style={{ color: tokens.foreground }}>
            {PRODUCT_NAME}
            </span>
        </EtherealDrift>
        <div className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-sm transition-all hover:opacity-100"
              style={{ color: tokens.mutedForeground }}
            >
              <motion.span whileHover={{ color: tokens.accent1, textShadow: `0 0 8px ${tokens.accent1}40` }}>
                {link}
              </motion.span>
            </a>
          ))}
        </div>
        <motion.button
          whileHover={{ scale: 1.05, textShadow: `0 0 12px ${tokens.accent1}80` }}
          className="text-sm font-medium transition-colors"
          style={{ color: tokens.accent1 }}
        >
          Light a Candle
        </motion.button>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section className="min-h-dvh flex items-center pt-20 relative overflow-hidden" style={{ backgroundColor: tokens.background }}>
      {/* Ethereal background elements */}
      <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full mix-blend-screen"
            style={{ background: `radial-gradient(circle, ${tokens.accent2}10 0%, transparent 70%)` }}
            animate={{ x: [0, 50, -20, 0], y: [0, -30, 40, 0], scale: [1, 1.2, 0.9, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: [0.42, 0, 0.58, 1] as [number, number, number, number] }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] rounded-full mix-blend-screen"
            style={{ background: `radial-gradient(circle, ${tokens.accent1}08 0%, transparent 70%)` }}
            animate={{ x: [0, -60, 30, 0], y: [0, 50, -40, 0], scale: [1, 1.1, 0.8, 1] }}
            transition={{ duration: 25, repeat: Infinity, ease: [0.42, 0, 0.58, 1] as [number, number, number, number] }}
          />
      </div>

      <div className="max-w-5xl mx-auto px-6 py-24 w-full relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 3, ease: [0.42, 0, 1, 1] as [number, number, number, number] }}
          className="max-w-3xl flex flex-col items-center"
        >
          <EtherealDrift>
            <motion.h1
              initial={{ opacity: 0, filter: 'blur(10px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 2.5, delay: 0.5, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] }}
              className="text-5xl md:text-7xl lg:text-8xl font-normal leading-tight mb-8 italic"
              style={{ color: tokens.foreground }}
            >
              {TAGLINE}
            </motion.h1>
          </EtherealDrift>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, delay: 1.5, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] }}
            className="text-lg md:text-xl mb-12 max-w-xl leading-relaxed"
            style={{ color: tokens.mutedForeground }}
          >
            {DESCRIPTION}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 2.5 }}
          >
            <CandleFlicker>
                <motion.button
                whileHover={{ scale: 1.02 }}
                className="px-8 py-4 rounded-full font-medium flex items-center gap-3 backdrop-blur-sm transition-all"
                style={{ backgroundColor: tokens.surface, color: tokens.accent1, border: `1px solid ${tokens.accent1}40` }}
                >
                Create a Tribute <ArrowRight className="h-4 w-4" />
                </motion.button>
            </CandleFlicker>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function TheEternalMemoryWall() {
    // A parallax grid with fading edges
    const { scrollYProgress } = useScroll()
    const y1 = useTransform(scrollYProgress, [0, 1], [0, -200])
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -400])
    const y3 = useTransform(scrollYProgress, [0, 1], [0, -150])

    const images = [
        "linear-gradient(to bottom right, #2a2a2a, #1a1a1a)",
        "linear-gradient(to bottom right, #333, #222)",
        "linear-gradient(to bottom right, #1f1f1f, #111)",
        "linear-gradient(to bottom right, #2d2d2d, #1a1a1a)",
        "linear-gradient(to bottom right, #3a3a3a, #2a2a2a)",
        "linear-gradient(to bottom right, #252525, #151515)",
    ]

    return (
        <section className="py-32 relative overflow-hidden" style={{ backgroundColor: tokens.backgroundAlt }}>
            {/* Edge fading mask */}
            <div className="absolute inset-0 z-20 pointer-events-none"
                 style={{
                     background: `linear-gradient(to bottom, ${tokens.backgroundAlt} 0%, transparent 20%, transparent 80%, ${tokens.backgroundAlt} 100%),
                                  linear-gradient(to right, ${tokens.backgroundAlt} 0%, transparent 20%, transparent 80%, ${tokens.backgroundAlt} 100%)`
                 }}
            />

            <div className="max-w-7xl mx-auto px-6 relative z-10 h-[800px] flex gap-6 justify-center opacity-40 hover:opacity-70 transition-opacity duration-1000">
                <motion.div style={{ y: y1 }} className="flex flex-col gap-6 w-1/3 pt-20">
                    <div className="h-64 rounded-2xl" style={{ background: images[0] }} />
                    <div className="h-96 rounded-2xl" style={{ background: images[1] }} />
                    <div className="h-64 rounded-2xl" style={{ background: images[2] }} />
                </motion.div>
                <motion.div style={{ y: y2 }} className="flex flex-col gap-6 w-1/3 pt-0">
                    <div className="h-96 rounded-2xl" style={{ background: images[3] }} />
                    <div className="h-64 rounded-2xl" style={{ background: images[4] }} />
                    <div className="h-96 rounded-2xl" style={{ background: images[5] }} />
                </motion.div>
                <motion.div style={{ y: y3 }} className="flex flex-col gap-6 w-1/3 pt-40">
                    <div className="h-64 rounded-2xl" style={{ background: images[2] }} />
                    <div className="h-96 rounded-2xl" style={{ background: images[0] }} />
                    <div className="h-64 rounded-2xl" style={{ background: images[4] }} />
                </motion.div>
            </div>

            <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
                <SlowFade delay={0.5}>
                    <div className="text-center p-12 backdrop-blur-md rounded-3xl" style={{ backgroundColor: 'rgba(18,18,18,0.7)', border: `1px solid ${tokens.border}` }}>
                         <h2 className="text-4xl md:text-5xl font-normal mb-4 italic" style={{ color: tokens.accent1 }}>The Memory Wall</h2>
                         <p className="text-lg" style={{ color: tokens.foreground }}>A collective tapestry of love, stretching on forever.</p>
                    </div>
                </SlowFade>
            </div>
        </section>
    )
}

function Stats() {
  return (
    <section className="py-24 border-y" style={{ borderColor: tokens.border, backgroundColor: tokens.background }}>
      <div className="max-w-6xl mx-auto px-6">
        <StaggerEthereal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {STATS.map(stat => (
              <motion.div key={stat.label} variants={staggerFade} className="text-center flex flex-col items-center">
                <p className="text-5xl font-normal mb-3 italic" style={{ color: tokens.foreground }}>{stat.value}</p>
                <p className="text-sm tracking-widest uppercase" style={{ color: tokens.mutedForeground }}>{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </StaggerEthereal>
      </div>
    </section>
  )
}

function Features() {
  return (
    <section id="features" className="py-32" style={{ backgroundColor: tokens.backgroundAlt }}>
      <div className="max-w-6xl mx-auto px-6">
        <SlowFade>
          <div className="text-center mb-24">
            <p className="text-sm uppercase tracking-widest mb-4" style={{ color: tokens.accent2 }}>Features</p>
            <h2 className="text-4xl md:text-5xl font-normal mb-6 italic" style={{ color: tokens.foreground }}>
              Preserving Every Moment
            </h2>
          </div>
        </SlowFade>

        <StaggerEthereal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FEATURES.map(feature => (
              <motion.div
                key={feature.title}
                variants={staggerFade}
                className="p-10 rounded-2xl flex flex-col items-center text-center"
                style={{ backgroundColor: tokens.surface, border: `1px solid transparent` }}
                whileHover={{
                    borderColor: tokens.border,
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    y: -5
                }}
                transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] }}
              >
                <div className="p-4 rounded-full mb-6" style={{ backgroundColor: 'rgba(137, 207, 240, 0.05)' }}>
                    <feature.icon className="h-8 w-8" style={{ color: tokens.accent2 }} strokeWidth={1} />
                </div>
                <h3 className="font-normal text-xl mb-4 italic" style={{ color: tokens.foreground }}>{feature.title}</h3>
                <p className="text-sm leading-loose" style={{ color: tokens.mutedForeground }}>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </StaggerEthereal>
      </div>
    </section>
  )
}

function ProductDetail() {
  return (
    <section className="py-32 border-y" style={{ borderColor: tokens.border, backgroundColor: tokens.background }}>
      <div className="max-w-4xl mx-auto px-6 text-center">
        <SlowFade>
          <h2 className="text-4xl md:text-5xl font-normal mb-12 italic leading-tight" style={{ color: tokens.foreground }}>
            "What we have once enjoyed deeply we can never lose. All that we love deeply becomes a part of us."
          </h2>
          <p className="text-sm tracking-widest uppercase mb-16" style={{ color: tokens.accent1 }}>— Helen Keller</p>
          <div className="space-y-8 text-center max-w-2xl mx-auto">
            <p className="text-lg leading-loose" style={{ color: tokens.mutedForeground }}>
              Our mission is to provide a quiet, dignified space where the bond between you and your companion is honored. We understand that this grief is profound, because the love was immense.
            </p>
            <p className="text-lg leading-loose" style={{ color: tokens.mutedForeground }}>
              Here, there are no fleeting algorithms or noisy feeds. Only a serene garden, bathed in soft light, waiting for you whenever you need to feel close to them again.
            </p>
          </div>
        </SlowFade>
      </div>
    </section>
  )
}

function Pricing() {
  return (
    <section id="pricing" className="py-32" style={{ backgroundColor: tokens.backgroundAlt }}>
      <div className="max-w-6xl mx-auto px-6">
        <SlowFade>
          <div className="text-center mb-24">
            <p className="text-sm uppercase tracking-widest mb-4" style={{ color: tokens.accent2 }}>Offerings</p>
            <h2 className="text-4xl md:text-5xl font-normal mb-6 italic" style={{ color: tokens.foreground }}>Sanctuary Spaces</h2>
          </div>
        </SlowFade>

        <StaggerEthereal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PRICING.map(tier => (
              <motion.div
                key={tier.name}
                variants={staggerFade}
                className="p-10 rounded-2xl relative flex flex-col"
                style={{
                  backgroundColor: tokens.surface,
                  border: `1px solid ${tier.highlighted ? tokens.accent1 + '40' : tokens.border}`,
                }}
              >
                {tier.highlighted && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <CandleFlicker>
                        <Star className="h-6 w-6 fill-current" style={{ color: tokens.accent1 }} />
                    </CandleFlicker>
                  </div>
                )}
                <h3 className="font-normal text-2xl mb-2 italic" style={{ color: tokens.foreground }}>{tier.name}</h3>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-4xl font-normal" style={{ color: tokens.foreground }}>{tier.price}</span>
                  <span className="text-sm" style={{ color: tokens.mutedForeground }}>/ {tier.period}</span>
                </div>
                <p className="text-sm mb-10 leading-relaxed h-10" style={{ color: tokens.mutedForeground }}>{tier.description}</p>
                <ul className="space-y-4 mb-12 flex-1">
                  {tier.features.map(f => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full mt-2" style={{ backgroundColor: tokens.accent2 }} />
                      <span style={{ color: tokens.foreground }} className="leading-relaxed">{f}</span>
                    </li>
                  ))}
                </ul>
                <motion.button
                  whileHover={{ color: tokens.accent1, textShadow: `0 0 8px ${tokens.accent1}40` }}
                  className="w-full text-left font-normal text-sm italic transition-all flex items-center justify-between"
                  style={{ color: tokens.foreground }}
                >
                  {tier.cta} <ArrowRight className="h-4 w-4" />
                </motion.button>
              </motion.div>
            ))}
          </div>
        </StaggerEthereal>
      </div>
    </section>
  )
}

function Testimonials() {
  return (
    <section id="testimonials" className="py-32 border-y" style={{ borderColor: tokens.border, backgroundColor: tokens.background }}>
      <div className="max-w-6xl mx-auto px-6">
        <SlowFade>
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-normal italic" style={{ color: tokens.foreground }}>Shared Healing</h2>
          </div>
        </SlowFade>

        <StaggerEthereal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {TESTIMONIALS.map(t => (
              <motion.div
                key={t.name}
                variants={staggerFade}
                className="flex flex-col items-center text-center"
              >
                <p className="text-lg leading-loose mb-8 italic" style={{ color: tokens.foreground }}>"{t.text}"</p>
                <div className="w-8 h-px mb-6" style={{ backgroundColor: tokens.border }} />
                <div>
                  <p className="font-normal text-sm tracking-wide mb-1" style={{ color: tokens.accent2 }}>{t.name}</p>
                  <p className="text-xs tracking-widest uppercase" style={{ color: tokens.mutedForeground }}>In memory of {t.company}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </StaggerEthereal>
      </div>
    </section>
  )
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="py-32" style={{ backgroundColor: tokens.backgroundAlt }}>
      <div className="max-w-3xl mx-auto px-6">
        <SlowFade>
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-normal italic" style={{ color: tokens.foreground }}>Gentle Guidance</h2>
          </div>
        </SlowFade>
        <div className="space-y-2">
          {FAQ_ITEMS.map((item, i) => (
            <SlowFade key={i} delay={i * 0.1}>
              <div className="border-b" style={{ borderColor: tokens.border }}>
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  aria-expanded={openIndex === i}
                  className="w-full flex items-center justify-between py-8 text-left transition-colors"
                  style={{ color: openIndex === i ? tokens.accent1 : tokens.foreground }}
                >
                  <span className="font-normal text-lg italic">{item.q}</span>
                  <motion.span
                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                    transition={{ duration: 0.5, ease: [0.42, 0, 0.58, 1] as [number, number, number, number] }}
                  >
                    <ChevronDown className="h-4 w-4 flex-shrink-0" />
                  </motion.span>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openIndex === i ? 'auto' : 0, opacity: openIndex === i ? 1 : 0 }}
                  transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] }}
                  style={{ overflow: 'hidden' }}
                >
                  <p className="pb-8 text-sm leading-loose max-w-2xl" style={{ color: tokens.mutedForeground }}>
                    {item.a}
                  </p>
                </motion.div>
              </div>
            </SlowFade>
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
    setTimeout(() => setStatus('success'), 2000)
  }

  return (
    <section className="py-32 border-y relative overflow-hidden" style={{ borderColor: tokens.border, backgroundColor: tokens.background }}>
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-30">
          <motion.div
            className="w-[40rem] h-[40rem] rounded-full mix-blend-screen"
            style={{ background: `radial-gradient(circle, ${tokens.accent2}10 0%, transparent 70%)` }}
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 15, repeat: Infinity, ease: [0.42, 0, 0.58, 1] as [number, number, number, number] }}
          />
      </div>

      <div className="max-w-2xl mx-auto px-6 text-center relative z-10">
        <SlowFade>
          <h2 className="text-4xl font-normal mb-6 italic" style={{ color: tokens.foreground }}>A comforting word.</h2>
          <p className="text-lg mb-12 leading-loose" style={{ color: tokens.mutedForeground }}>
            Receive gentle monthly reflections on grief, healing, and the eternal bond we share with our companions.
          </p>
          {status === 'success' ? (
            <motion.p
                initial={{ opacity: 0, filter: 'blur(5px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                className="font-normal italic text-lg"
                style={{ color: tokens.accent1 }}
            >
              Thank you for opening your heart to us.
            </motion.p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col items-center gap-6">
              <label htmlFor="newsletter-email" className="sr-only">Email address</label>
              <div className="w-full relative max-w-md">
                  <input
                    id="newsletter-email"
                    type="email"
                    required
                    placeholder="Your email address"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full h-14 px-4 bg-transparent border-b focus:outline-none text-center transition-colors"
                    style={{
                        borderColor: tokens.border,
                        color: tokens.foreground,
                    }}
                  />
                  {/* Focus light effect */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-white transition-all duration-1000 peer-focus:w-full" />
              </div>

              <motion.button
                type="submit"
                disabled={status === 'loading'}
                whileHover={{ color: tokens.accent1 }}
                className="font-normal italic tracking-wide mt-4 transition-colors"
                style={{ color: tokens.foreground }}
              >
                {status === 'loading' ? 'Sending...' : 'Receive Reflections'}
              </motion.button>
            </form>
          )}
        </SlowFade>
      </div>
    </section>
  )
}

function Footer() {
  const links = {
    Sanctuary: ['Create Tribute', 'Memory Gardens', 'Pricing', 'Examples'],
    Support: ['Grief Resources', 'Community', 'Counseling', 'FAQ'],
    Trust: ['Privacy Promise', 'Security', 'Data Permanence', 'Terms'],
  }

  return (
    <footer className="py-24 relative overflow-hidden" style={{ backgroundColor: tokens.backgroundAlt }}>
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-2 md:col-span-1 flex flex-col items-start">
            <p className="font-normal text-xl mb-4 italic" style={{ color: tokens.foreground }}>{PRODUCT_NAME}</p>
            <p className="text-sm leading-loose max-w-xs" style={{ color: tokens.mutedForeground }}>
              Guarding the light of those we loved, until the end of time.
            </p>
          </div>
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <p className="font-normal text-sm mb-8 tracking-widest uppercase" style={{ color: tokens.accent2 }}>{group}</p>
              <ul className="space-y-4">
                {items.map(item => (
                  <li key={item}>
                    <a href="#" className="text-sm transition-colors" style={{ color: tokens.mutedForeground }}>
                      <motion.span whileHover={{ color: tokens.foreground }}>
                        {item}
                      </motion.span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center pt-12 border-t text-center gap-6" style={{ borderColor: tokens.border }}>
          <p className="text-xs tracking-widest uppercase" style={{ color: tokens.mutedForeground }}>
            © {new Date().getFullYear()} {PRODUCT_NAME}. A place of peace.
          </p>
        </div>
      </div>
    </footer>
  )
}

// ─────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────
export default function StylePage() {
  return (
    <div className={`${primaryFont.variable} ${secondaryFont.variable} font-sans selection:bg-[#FAD02C] selection:text-[#121212]`} style={{ backgroundColor: tokens.background }}>
      <GlobalScrollCandle />
      <Navbar />
      <main>
        <Hero />
        <TheEternalMemoryWall />
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
