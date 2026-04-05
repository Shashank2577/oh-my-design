'use client'

import { motion, useReducedMotion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Inter_Tight, Playfair_Display, JetBrains_Mono } from 'next/font/google'
import {
  Star, Plus, Minus, ArrowRight, Check, Users, Zap, BarChart3, Link as LinkIcon, Shield, Headphones, Globe
} from 'lucide-react'

// ─────────────────────────────────────────────
// FONTS
// ─────────────────────────────────────────────
const fontHeading = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
})

const fontDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const fontMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

const fontBody = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

// ─────────────────────────────────────────────
// DESIGN TOKENS
// ─────────────────────────────────────────────
const tokens = {
  background: '#0A0A0A',
  foreground: '#FAFAFA',
  muted: '#1A1A1A',
  mutedForeground: '#737373',
  accent: '#FF3D00',
  accentForeground: '#0A0A0A',
  border: '#262626',
  input: '#1A1A1A',
  card: '#0F0F0F',
}

// ─────────────────────────────────────────────
// MOTION HELPERS
// ─────────────────────────────────────────────
function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px 0px', amount: 0.15 })
  const shouldReduce = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      initial={shouldReduce ? false : { opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.25, 0, 0, 1] }} // Fast-out crisp stop
      className={className}
    >
      {children}
    </motion.div>
  )
}

function StaggerContainer({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px 0px', amount: 0.15 })
  const shouldReduce = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      initial={shouldReduce ? false : 'hidden'}
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

import type { Variants } from 'framer-motion'

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0, 0, 1] } },
}

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────
const PRODUCT_NAME = 'TYPE.01'
const TAGLINE = 'Bold ideas require bold typography.'
const DESCRIPTION = 'Typography isn\'t decoration—it\'s the entire visual language. We build tools that let your words command attention and drive action.'

const NAV_LINKS = ['Features', 'Pricing', 'Testimonials', 'FAQ']

const STATS = [
  { value: '2.5B', label: 'WORDS RENDERED' },
  { value: '99.9%', label: 'SYSTEM UPTIME' },
  { value: '140+', label: 'GLOBAL MARKETS' },
  { value: '4.9/5', label: 'USER RATING' },
]

const FEATURES = [
  { icon: Users, title: 'Audience Control', description: 'Command attention with typography that demands to be read, scaling perfectly across every device.' },
  { icon: Zap, title: 'Instant Delivery', description: 'Zero-latency font loading with advanced caching mechanisms built for modern edge networks.' },
  { icon: BarChart3, title: 'Metric Tracking', description: 'Analyze readability scores and engagement metrics natively within your dashboard.' },
  { icon: LinkIcon, title: 'System Integration', description: 'Seamlessly connect with your existing design systems via our robust REST API.' },
  { icon: Shield, title: 'Enterprise Security', description: 'Bank-grade encryption for all your digital assets, ensuring your brand identity remains secure.' },
  { icon: Globe, title: 'Global Delivery', description: 'Lightning-fast asset delivery through our distributed global CDN infrastructure.' },
]

const PRICING = [
  {
    name: 'BASIC',
    price: '$0',
    period: 'FOREVER',
    description: 'Perfect for individual creators establishing their voice.',
    features: ['1 Project', '10,000 Views', 'Standard Fonts', 'Community Support'],
    cta: 'START FREE',
    highlighted: false,
  },
  {
    name: 'PROFESSIONAL',
    price: '$29',
    period: 'PER MONTH',
    description: 'For growing teams that need more power and control.',
    features: ['Unlimited Projects', '100,000 Views', 'Premium Fonts', 'Priority Support', 'Custom Domains', 'Analytics'],
    cta: 'START TRIAL',
    highlighted: true,
  },
  {
    name: 'ENTERPRISE',
    price: '$99',
    period: 'PER MONTH',
    description: 'For large organizations with custom requirements.',
    features: ['Everything in Pro', 'Unlimited Views', 'Custom Typefaces', 'Dedicated Support', 'SLA Guarantee', 'API Access'],
    cta: 'CONTACT SALES',
    highlighted: false,
  },
]

const TESTIMONIALS = [
  {
    name: 'ALEXANDRA CHEN',
    role: 'EDITORIAL DIRECTOR',
    company: 'ACME MEDIA',
    text: 'This product completely transformed how we present our editorial content. The focus on pure typography has increased our engagement metrics by 40%.',
    rating: 5,
  },
  {
    name: 'MARCUS WILLIAMS',
    role: 'LEAD DESIGNER',
    company: 'STARTUPXYZ',
    text: 'Finally, a tool that respects the power of the written word. The scale contrast and deliberate negative space give our brand a sophisticated, authoritative voice.',
    rating: 5,
  },
  {
    name: 'SOFIA RODRIGUEZ',
    role: 'CREATIVE DIRECTOR',
    company: 'STUDIO NOUVEAU',
    text: 'It strips away the unnecessary UI cruft and lets the content breathe. A masterclass in digital editorial design.',
    rating: 5,
  },
]

const FAQ_ITEMS = [
  { q: 'How do I get started?', a: 'Sign up for a free account and follow the onboarding process. You\'ll be up and running in under 5 minutes.' },
  { q: 'Can I cancel anytime?', a: 'Yes. There are no long-term commitments. Cancel your subscription at any time from your account settings.' },
  { q: 'Do you offer a free trial?', a: 'Yes. All Professional features are available free for 14 days. No credit card required.' },
  { q: 'What payment methods do you accept?', a: 'We accept all major credit cards, PayPal, and wire transfers for Enterprise plans.' },
  { q: 'Is my data secure?', a: 'Security is our top priority. All data is encrypted in transit and at rest. We\'re SOC 2 Type II certified.' },
  { q: 'Do you have an API?', a: 'Yes, we offer a comprehensive REST API with full documentation available for Professional and Enterprise customers.' },
]

// ─────────────────────────────────────────────
// COMPONENTS
// ─────────────────────────────────────────────

function NoiseOverlay() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 opacity-[0.015]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
      }}
    />
  )
}

function PrimaryButton({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return (
    <motion.button
      whileTap={{ y: 1 }}
      transition={{ duration: 0.15 }}
      className={`group relative inline-flex items-center gap-3 uppercase font-semibold text-sm tracking-[0.1em] px-0 py-3 whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] ${className}`}
      style={{ color: tokens.accent }}
    >
      {children}
      <span
        className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-100 bg-[var(--accent)] transition-transform duration-150 ease-[cubic-bezier(0.25,0,0,1)] group-hover:scale-x-110"
        style={{ backgroundColor: tokens.accent }}
      />
    </motion.button>
  )
}

function OutlineButton({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return (
    <motion.button
      whileTap={{ y: 1 }}
      transition={{ duration: 0.15 }}
      className={`group inline-flex items-center justify-center px-6 py-3 uppercase font-semibold text-sm tracking-[0.1em] border outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] whitespace-nowrap transition-colors duration-150 ${className}`}
      style={{
        borderColor: tokens.foreground,
        color: tokens.foreground,
        backgroundColor: 'transparent'
      }}
    >
      <span className="relative z-10 group-hover:text-[var(--background)] transition-colors duration-150">{children}</span>
      <div className="absolute inset-0 bg-[var(--foreground)] opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-0" />
    </motion.button>
  )
}

function GhostButton({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return (
    <motion.button
      whileTap={{ y: 1 }}
      transition={{ duration: 0.15 }}
      className={`group relative inline-flex items-center gap-2 px-4 py-2 text-sm tracking-[0.1em] uppercase font-semibold outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] transition-colors duration-150 ${className}`}
      style={{ color: tokens.mutedForeground }}
    >
      <span className="group-hover:text-[var(--foreground)] transition-colors duration-150">{children}</span>
      <span
        className="absolute bottom-0 left-0 h-[1px] w-full origin-left scale-x-0 bg-[var(--foreground)] transition-transform duration-150 ease-[cubic-bezier(0.25,0,0,1)] group-hover:scale-x-100"
      />
    </motion.button>
  )
}


function Navbar() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-40 border-b"
      style={{ borderColor: tokens.border, backgroundColor: tokens.background }}
    >
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <span className="font-bold text-lg tracking-tight uppercase" style={{ color: tokens.foreground }}>
          {PRODUCT_NAME}
        </span>
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-sm font-semibold tracking-wider uppercase transition-colors duration-150 hover:text-[var(--foreground)]"
              style={{ color: tokens.mutedForeground }}
            >
              {link}
            </a>
          ))}
        </div>
        <GhostButton className="hidden sm:inline-flex">GET STARTED</GhostButton>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section className="min-h-[90vh] flex flex-col justify-center pt-24 pb-20 md:py-40 relative" style={{ backgroundColor: tokens.background }}>
      <div className="absolute top-1/4 right-[5%] text-[10rem] md:text-[15rem] lg:text-[20rem] font-bold opacity-5 pointer-events-none tracking-tighter leading-none select-none z-0" style={{ color: tokens.foreground }}>
        01
      </div>
      <div className="max-w-5xl mx-auto px-6 w-full relative z-10">
        <StaggerContainer className="max-w-4xl">
          <motion.h1
            variants={staggerItem}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-[-0.04em] md:tracking-[-0.06em] leading-[1.05] mb-8"
            style={{ color: tokens.foreground }}
          >
            {TAGLINE.split('typography').map((part, i, arr) => (
              <span key={i}>
                {part}
                {i < arr.length - 1 && <span style={{ color: tokens.accent }}>typography</span>}
              </span>
            ))}
          </motion.h1>
          <motion.p
            variants={staggerItem}
            className="text-lg md:text-xl max-w-2xl leading-relaxed mb-12 tracking-[-0.01em]"
            style={{ color: tokens.mutedForeground }}
          >
            {DESCRIPTION}
          </motion.p>
          <motion.div variants={staggerItem} className="flex flex-col sm:flex-row gap-8 items-start sm:items-center">
            <PrimaryButton>
              Start Building <ArrowRight className="h-4 w-4" strokeWidth={2} />
            </PrimaryButton>
            <OutlineButton>View System</OutlineButton>
          </motion.div>
        </StaggerContainer>
      </div>
    </section>
  )
}

function Stats() {
  return (
    <section className="border-t py-20 md:py-28" style={{ borderColor: tokens.border, backgroundColor: tokens.background }}>
      <div className="max-w-5xl mx-auto px-6">
        <StaggerContainer>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
            {STATS.map(stat => (
              <motion.div key={stat.label} variants={staggerItem}>
                <p className="text-4xl md:text-5xl font-bold mb-2 tracking-tight" style={{ color: tokens.foreground }}>
                  {stat.value}
                </p>
                <p className="text-sm font-mono tracking-[0.1em] uppercase" style={{ color: tokens.mutedForeground }}>
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  )
}

function Features() {
  return (
    <section id="features" className="py-20 md:py-32 border-t" style={{ borderColor: tokens.border, backgroundColor: tokens.muted }}>
      <div className="max-w-5xl mx-auto px-6">
        <FadeUp>
          <div className="mb-20 md:mb-32">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6" style={{ color: tokens.foreground }}>
              BUILT FOR IMPACT
            </h2>
            <div className="h-1 w-16" style={{ backgroundColor: tokens.accent }} />
          </div>
        </FadeUp>
        <StaggerContainer>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-12">
            {FEATURES.map((feature, i) => (
              <motion.div key={feature.title} variants={staggerItem} className="flex flex-col group">
                <div className="mb-6 flex items-center justify-center w-12 h-12" style={{ backgroundColor: tokens.background }}>
                    <feature.icon className="h-6 w-6" style={{ color: tokens.accent }} strokeWidth={1.5} />
                </div>
                <h3 className="font-bold text-xl mb-4 tracking-tight" style={{ color: tokens.foreground }}>{feature.title}</h3>
                <p className="text-base leading-relaxed" style={{ color: tokens.mutedForeground }}>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  )
}

function ProductDetail() {
  return (
    <section className="py-20 md:py-40 border-t relative overflow-hidden" style={{ borderColor: tokens.border, backgroundColor: tokens.background }}>
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-16 items-start">
          <FadeUp>
            <div className="sticky top-24">
              <div className="h-1 w-16 mb-8" style={{ backgroundColor: tokens.accent }} />
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-8" style={{ color: tokens.foreground }}>
                THE SYSTEM
              </h2>
              <p className="text-lg leading-relaxed mb-8" style={{ color: tokens.mutedForeground }}>
                Our architecture focuses on clarity and speed. Every module is designed to eliminate friction and elevate content.
              </p>
              <PrimaryButton>READ DOCUMENTATION <ArrowRight className="h-4 w-4" strokeWidth={2}/></PrimaryButton>
            </div>
          </FadeUp>
          <FadeUp delay={0.2}>
             <div className="relative">
                <div className="absolute inset-0 -z-10 translate-x-1 translate-y-1" style={{ color: tokens.border }}>
                  <pre className="text-xs sm:text-sm font-mono overflow-hidden whitespace-pre-wrap select-none opacity-50">
{`const TypographySystem = {
  scale: {
    hero: 'text-8xl',
    h1: 'text-6xl',
    h2: 'text-4xl',
    body: 'text-base',
  },
  tracking: {
    tighter: '-0.06em',
    normal: '-0.01em',
    wider: '0.1em',
  },
  colors: {
    foreground: '#FAFAFA',
    accent: '#FF3D00',
  }
}`}
                  </pre>
                </div>
                <div className="border bg-opacity-90 p-8 sm:p-12" style={{ borderColor: tokens.border, backgroundColor: tokens.card }}>
                  <h3 className="text-2xl font-bold mb-4" style={{ color: tokens.foreground }}>Engineered for Performance</h3>
                  <p className="text-base leading-relaxed mb-6" style={{ color: tokens.mutedForeground }}>
                    The underlying engine optimizes asset delivery, caching font files at the edge to ensure sub-millisecond rendering times globally.
                  </p>
                  <ul className="space-y-4 font-mono text-sm uppercase tracking-wider">
                     <li className="flex items-center gap-3"><Check className="h-4 w-4" style={{ color: tokens.accent }}/> GLOBAL EDGE CACHING</li>
                     <li className="flex items-center gap-3"><Check className="h-4 w-4" style={{ color: tokens.accent }}/> VARIABLE FONT SUPPORT</li>
                     <li className="flex items-center gap-3"><Check className="h-4 w-4" style={{ color: tokens.accent }}/> AUTOMATIC SUBSETTING</li>
                  </ul>
                </div>
             </div>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}

function Pricing() {
  return (
    <section id="pricing" className="py-20 md:py-32 border-t" style={{ borderColor: tokens.border, backgroundColor: tokens.background }}>
      <div className="max-w-5xl mx-auto px-6">
        <FadeUp>
          <div className="mb-20 text-center">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 uppercase" style={{ color: tokens.foreground }}>
              Transparent Pricing
            </h2>
            <p className="text-lg" style={{ color: tokens.mutedForeground }}>No hidden fees. Scale as you grow.</p>
          </div>
        </FadeUp>
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {PRICING.map((tier, i) => (
              <motion.div
                key={tier.name}
                variants={staggerItem}
                className={`p-8 sm:p-10 border ${tier.highlighted ? 'border-2 z-10' : 'border'}`}
                style={{
                  borderColor: tier.highlighted ? tokens.accent : tokens.border,
                  backgroundColor: 'transparent',
                  margin: tier.highlighted ? '-1px' : '0', // Overlap borders slightly
                }}
              >
                {tier.highlighted && (
                  <div className="inline-block px-3 py-1 text-xs font-mono tracking-widest font-semibold mb-6 uppercase" style={{ backgroundColor: tokens.accent, color: tokens.accentForeground }}>
                    RECOMMENDED
                  </div>
                )}
                <h3 className="font-bold text-xl mb-2 tracking-wide uppercase" style={{ color: tokens.foreground }}>{tier.name}</h3>
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-5xl font-bold tracking-tight" style={{ color: tokens.foreground }}>{tier.price}</span>
                  <span className="text-xs font-mono uppercase tracking-widest" style={{ color: tokens.mutedForeground }}>{tier.period}</span>
                </div>
                <p className="text-sm mb-8 h-10" style={{ color: tokens.mutedForeground }}>{tier.description}</p>
                <ul className="space-y-4 mb-10">
                  {tier.features.map(f => (
                    <li key={f} className="flex items-center gap-3 text-sm">
                      <Check className="h-4 w-4 flex-shrink-0" strokeWidth={2} style={{ color: tokens.accent }} />
                      <span style={{ color: tokens.foreground }}>{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto">
                    {tier.highlighted ? (
                        <button className="w-full py-4 text-sm font-bold uppercase tracking-widest transition-colors duration-150 border-2" style={{ backgroundColor: tokens.accent, color: tokens.accentForeground, borderColor: tokens.accent }}>
                            {tier.cta}
                        </button>
                    ) : (
                        <button className="w-full py-4 text-sm font-bold uppercase tracking-widest transition-colors duration-150 border hover:bg-[var(--foreground)] hover:text-[var(--background)]" style={{ borderColor: tokens.foreground, color: tokens.foreground }}>
                            {tier.cta}
                        </button>
                    )}
                </div>
              </motion.div>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  )
}

function Testimonials() {
  return (
    <section id="testimonials" className="py-20 md:py-32 border-t" style={{ borderColor: tokens.border, backgroundColor: tokens.muted }}>
      <div className="max-w-5xl mx-auto px-6">
        <FadeUp>
          <div className="mb-20">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 uppercase" style={{ color: tokens.foreground }}>
              Industry Voices
            </h2>
            <div className="h-1 w-16" style={{ backgroundColor: tokens.accent }} />
          </div>
        </FadeUp>
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {TESTIMONIALS.map(t => (
              <motion.div
                key={t.name}
                variants={staggerItem}
                className="flex flex-col"
              >
                <div className="flex mb-6 gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" strokeWidth={0} style={{ color: tokens.accent }} />
                  ))}
                </div>
                <p className="text-xl md:text-2xl leading-relaxed mb-8 italic" style={{ color: tokens.foreground, fontFamily: 'var(--font-display)' }}>"{t.text}"</p>
                <div className="mt-auto pt-6 border-t" style={{ borderColor: tokens.border }}>
                  <p className="font-bold text-sm tracking-wide uppercase mb-1" style={{ color: tokens.foreground }}>{t.name}</p>
                  <p className="text-xs font-mono uppercase tracking-widest" style={{ color: tokens.mutedForeground }}>{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  )
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="py-20 md:py-32 border-t" style={{ borderColor: tokens.border, backgroundColor: tokens.background }}>
      <div className="max-w-3xl mx-auto px-6">
        <FadeUp>
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 uppercase" style={{ color: tokens.foreground }}>
              Questions
            </h2>
             <div className="h-1 w-16" style={{ backgroundColor: tokens.accent }} />
          </div>
        </FadeUp>
        <div className="border-t" style={{ borderColor: tokens.border }}>
          {FAQ_ITEMS.map((item, i) => (
            <FadeUp key={i} delay={i * 0.05}>
              <div className="border-b" style={{ borderColor: tokens.border }}>
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  aria-expanded={openIndex === i}
                  className="w-full flex items-center justify-between py-6 text-left outline-none focus-visible:bg-[var(--muted)]"
                  style={{ color: tokens.foreground }}
                >
                  <span className="font-bold text-lg md:text-xl tracking-tight pr-8">{item.q}</span>
                  <span className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full border transition-colors duration-200" style={{ borderColor: openIndex === i ? tokens.accent : tokens.border, color: openIndex === i ? tokens.accent : tokens.foreground }}>
                    {openIndex === i ? <Minus className="h-4 w-4" strokeWidth={2}/> : <Plus className="h-4 w-4" strokeWidth={2}/>}
                  </span>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openIndex === i ? 'auto' : 0, opacity: openIndex === i ? 1 : 0 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  style={{ overflow: 'hidden' }}
                >
                  <p className="pb-8 text-base leading-relaxed max-w-2xl" style={{ color: tokens.mutedForeground }}>
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
    <section className="py-24 md:py-40 border-t" style={{ borderColor: tokens.border, backgroundColor: tokens.foreground }}>
      <div className="max-w-3xl mx-auto px-6 text-center">
        <FadeUp>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 uppercase" style={{ color: tokens.background }}>
            STAY INFORMED
          </h2>
          <p className="text-lg mb-12 max-w-xl mx-auto" style={{ color: tokens.background, opacity: 0.7 }}>
            Receive updates on typography trends and system upgrades.
          </p>
          {status === 'success' ? (
            <p className="font-mono text-sm tracking-widest uppercase font-bold" style={{ color: tokens.accent }}>
              SUBSCRIBED SUCCESSFULLY.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-0 max-w-xl mx-auto">
              <label htmlFor="newsletter-email" className="sr-only">Email address</label>
              <input
                id="newsletter-email"
                type="email"
                required
                placeholder="YOUR EMAIL"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="flex-1 h-14 px-6 border-2 border-r-0 rounded-none text-sm font-mono tracking-wider outline-none focus:border-[var(--accent)] transition-colors duration-150"
                style={{
                  borderColor: tokens.background,
                  backgroundColor: 'transparent',
                  color: tokens.background,
                }}
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="h-14 px-8 font-bold text-sm tracking-widest uppercase disabled:opacity-60 transition-colors duration-150 hover:bg-[var(--accent)]"
                style={{ backgroundColor: tokens.background, color: tokens.foreground }}
              >
                {status === 'loading' ? 'PROCESSING' : 'SUBSCRIBE'}
              </button>
            </form>
          )}
        </FadeUp>
      </div>
    </section>
  )
}

function Footer() {
  const links = {
    PRODUCT: ['Features', 'Pricing', 'Changelog', 'Roadmap'],
    COMPANY: ['About', 'Blog', 'Careers', 'Press'],
    RESOURCES: ['Documentation', 'API', 'Guides', 'Status'],
    LEGAL: ['Privacy', 'Terms', 'Cookies', 'Security'],
  }

  return (
    <footer className="py-20 border-t" style={{ backgroundColor: tokens.background, borderColor: tokens.border }}>
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-12 md:gap-8 mb-20">
          <div className="col-span-2">
            <p className="font-bold text-xl tracking-tight uppercase mb-4" style={{ color: tokens.foreground }}>{PRODUCT_NAME}</p>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: tokens.mutedForeground }}>
              Design systems built on the foundation of strong typography.
            </p>
          </div>
          {Object.entries(links).map(([group, items]) => (
            <div key={group} className="col-span-1">
              <p className="font-mono text-xs font-bold tracking-widest uppercase mb-6" style={{ color: tokens.foreground }}>{group}</p>
              <ul className="space-y-4">
                {items.map(item => (
                  <li key={item}>
                    <a href="#" className="text-sm hover:text-[var(--foreground)] transition-colors duration-150" style={{ color: tokens.mutedForeground }}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pt-8 border-t gap-6" style={{ borderColor: tokens.border }}>
          <p className="font-mono text-xs tracking-widest uppercase" style={{ color: tokens.mutedForeground }}>
            © {new Date().getFullYear()} {PRODUCT_NAME}. ALL RIGHTS RESERVED.
          </p>
          <a
            href="/"
            className="group flex items-center gap-2 text-xs font-mono uppercase tracking-widest transition-colors duration-150"
            style={{ color: tokens.mutedForeground }}
          >
            <ArrowRight className="h-3 w-3 rotate-180 group-hover:text-[var(--foreground)] transition-colors duration-150" />
            <span className="group-hover:text-[var(--foreground)] transition-colors duration-150">ALL STYLES</span>
          </a>
        </div>
      </div>
    </footer>
  )
}

// ─────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────
export default function BoldTypographyPage() {
  return (
    <div
      className={`${fontHeading.variable} ${fontDisplay.variable} ${fontMono.variable} ${fontBody.variable} font-body selection:bg-[var(--accent)] selection:text-[var(--accent-foreground)]`}
      style={{
        backgroundColor: tokens.background,
        color: tokens.foreground,
        '--background': tokens.background,
        '--foreground': tokens.foreground,
        '--muted': tokens.muted,
        '--accent': tokens.accent,
        '--accent-foreground': tokens.accentForeground,
      } as React.CSSProperties}
    >
      <NoiseOverlay />
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
