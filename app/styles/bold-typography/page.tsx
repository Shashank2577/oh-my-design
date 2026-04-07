'use client'

/**
 * PAGE TEMPLATE — oh-my-design
 *
 * Copy this file to app/styles/[slug]/page.tsx
 * Replace STYLE_NAME, colors, fonts, and content
 * Follow designprompts_dev_all_styles.md for the design system
 */

import { motion, useReducedMotion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Inter_Tight, Inter, Playfair_Display, JetBrains_Mono } from 'next/font/google'
import {
  Plus, Minus, ArrowRight, Check, Users, Zap, BarChart3, Link as LinkIcon, Shield, Headphones, Globe
} from 'lucide-react'

// ─────────────────────────────────────────────
// FONTS
// ─────────────────────────────────────────────
const fontDisplay = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const fontBody = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const fontSerif = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})

const fontMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
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
  cardForeground: '#FAFAFA',
  ring: '#FF3D00',
}

// ─────────────────────────────────────────────
// MOTION HELPERS
// ─────────────────────────────────────────────
function FadeUp({ children, delay = 0, className }: { children: React.ReactNode; delay?: number, className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.15, margin: '-50px' })
  const shouldReduce = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={shouldReduce ? false : { opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.25, 0, 0, 1] }}
    >
      {children}
    </motion.div>
  )
}

function StaggerContainer({ children, className }: { children: React.ReactNode, className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.15, margin: '-50px' })
  const shouldReduce = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={shouldReduce ? false : 'hidden'}
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
      }}
    >
      {children}
    </motion.div>
  )
}

const staggerItem: import('framer-motion').Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0, 0, 1] } },
}

// ─────────────────────────────────────────────
// DATA — replace with style-appropriate content
// ─────────────────────────────────────────────
const PRODUCT_NAME = 'TYPEFACE.'
const TAGLINE = 'Design is just typography.'
const DESCRIPTION = 'Typography is not decoration—it is the entire visual language. Every word earns its place.'

const NAV_LINKS = ['Features', 'Pricing', 'Testimonials', 'FAQ']

const STATS = [
  { value: '50K+', label: 'Active Users' },
  { value: '99.9%', label: 'Uptime' },
  { value: '140+', label: 'Countries' },
  { value: '4.9/5', label: 'Rating' },
]

const FEATURES = [
  { icon: Users, title: 'Extreme Scale Contrast', description: 'The gap between headline and body creates drama. 6:1 ratio.' },
  { icon: Zap, title: 'Deliberate Negative Space', description: 'White space isn\'t empty—it\'s the frame around your type.' },
  { icon: BarChart3, title: 'Strict Hierarchy', description: 'Every element has a clear rank. No two elements compete for attention.' },
  { icon: LinkIcon, title: 'Restrained Palette', description: 'Black, white, and one accent. Let the type shapes do the work.' },
  { icon: Shield, title: 'Type as Hero', description: 'Headlines aren\'t just labels—they\'re the visual centerpiece.' },
  { icon: Headphones, title: 'Sharp Edges', description: 'No rounded corners anywhere. Sharp edges match sharp typography.' },
]

const PRICING = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for individuals getting started.',
    features: ['5 projects', '1 user', 'Basic analytics', 'Email support'],
    cta: 'Get started',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$29',
    period: 'per month',
    description: 'For growing teams that need more power.',
    features: ['Unlimited projects', '10 users', 'Advanced analytics', 'Priority support', 'Custom domains', 'API access'],
    cta: 'Start free trial',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: '$99',
    period: 'per month',
    description: 'For large organizations with custom needs.',
    features: ['Everything in Pro', 'Unlimited users', 'SSO / SAML', 'Dedicated support', 'SLA guarantee', 'Custom integrations'],
    cta: 'Contact sales',
    highlighted: false,
  },
]

const TESTIMONIALS = [
  {
    name: 'Alexandra Chen',
    role: 'Product Manager',
    company: 'Acme Corp',
    text: 'This product completely transformed how our team works. The results have been incredible.',
    rating: 5,
  },
  {
    name: 'Marcus Williams',
    role: 'CTO',
    company: 'StartupXYZ',
    text: 'I\'ve tried many tools in this space, but nothing comes close. The quality is exceptional.',
    rating: 5,
  },
  {
    name: 'Sofia Rodriguez',
    role: 'Designer',
    company: 'Creative Studio',
    text: 'The attention to detail is remarkable. Every interaction feels intentional and polished.',
    rating: 5,
  },
]

const FAQ_ITEMS = [
  { q: 'How do I get started?', a: 'Sign up for a free account and follow the onboarding wizard. You\'ll be up and running in under 5 minutes.' },
  { q: 'Can I cancel anytime?', a: 'Yes, absolutely. There are no long-term commitments. Cancel your subscription at any time from your account settings.' },
  { q: 'Do you offer a free trial?', a: 'Yes! All Pro features are available free for 14 days. No credit card required.' },
  { q: 'What payment methods do you accept?', a: 'We accept all major credit cards, PayPal, and bank transfers for Enterprise plans.' },
  { q: 'Is my data secure?', a: 'Security is our top priority. All data is encrypted in transit and at rest. We\'re SOC 2 Type II certified.' },
  { q: 'Do you have an API?', a: 'Yes, we offer a comprehensive REST API with full documentation available for Pro and Enterprise customers.' },
]

// ─────────────────────────────────────────────
// COMPONENTS
// ─────────────────────────────────────────────

function Navbar() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 border-b border-b-[1px]"
      style={{ borderColor: tokens.border, backgroundColor: tokens.background }}
    >
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <span className={`${fontDisplay.variable} font-display font-bold text-lg tracking-tight`} style={{ color: tokens.foreground }}>
          {PRODUCT_NAME}
        </span>
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="relative text-base uppercase tracking-wider group transition-colors duration-150"
              style={{ color: tokens.foreground }}
            >
              {link}
              <span className="absolute -bottom-1 left-0 w-full h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-150 origin-left" style={{ backgroundColor: tokens.accent }} />
            </a>
          ))}
        </div>
        <button
          className="relative uppercase tracking-wider font-semibold py-2 inline-flex items-center gap-2 group transition-all duration-150 active:translate-y-px"
          style={{ color: tokens.accent }}
        >
          GET STARTED
          <span className="absolute bottom-0 left-0 w-full h-[2px] scale-x-100 group-hover:scale-x-110 transition-transform duration-150 origin-left" style={{ backgroundColor: tokens.accent }} />
        </button>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section className="min-h-dvh flex items-center pt-16 relative overflow-hidden" style={{ backgroundColor: tokens.background }}>
      <div className="absolute inset-0 pointer-events-none opacity-[0.015]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`, backgroundRepeat: 'repeat' }} />
      <div className="max-w-5xl mx-auto px-6 py-40 w-full relative">
        {/* Decorative oversized numbers layered behind */}
        <div className="absolute top-0 right-0 -z-10 hidden md:block select-none opacity-[0.03]">
          <span className={`${fontDisplay.variable} font-display font-black text-[15rem] leading-none tracking-tighter`} style={{ color: tokens.foreground }}>01</span>
        </div>

        <StaggerContainer className="max-w-4xl">
          <motion.p
            variants={staggerItem}
            className={`${fontMono.variable} font-mono text-sm uppercase tracking-widest mb-6 inline-block`}
            style={{ color: tokens.accent }}
          >
            Introducing {PRODUCT_NAME}
          </motion.p>
          <motion.h1
            variants={staggerItem}
            className={`${fontDisplay.variable} font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tighter mb-8`}
            style={{ color: tokens.foreground }}
          >
            {TAGLINE}
          </motion.h1>
          <motion.p
            variants={staggerItem}
            className="text-xl md:text-2xl mb-12 max-w-2xl leading-relaxed"
            style={{ color: tokens.mutedForeground }}
          >
            {DESCRIPTION}
          </motion.p>
          <motion.div
            variants={staggerItem}
            className="flex flex-col sm:flex-row gap-8 items-start sm:items-center"
          >
            <button
              className="relative uppercase tracking-widest font-semibold py-3 inline-flex items-center gap-3 group transition-all duration-150 active:translate-y-px text-lg"
              style={{ color: tokens.accent }}
            >
              START FOR FREE <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              <span className="absolute bottom-0 left-0 w-full h-[3px] scale-x-100 group-hover:scale-x-110 transition-transform duration-150 origin-left" style={{ backgroundColor: tokens.accent }} />
            </button>
            <button
              className="relative uppercase tracking-widest font-semibold px-6 py-3 border inline-flex items-center gap-2 group transition-all duration-150 rounded-none bg-transparent hover:bg-white hover:text-black focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{ borderColor: tokens.foreground, color: tokens.foreground, outlineColor: tokens.ring }}
            >
              VIEW DEMO
            </button>
          </motion.div>
        </StaggerContainer>
      </div>
    </section>
  )
}

function Stats() {
  return (
    <section className="border-y border-y-[1px]" style={{ borderColor: tokens.border, backgroundColor: tokens.muted }}>
      <div className="max-w-5xl mx-auto px-6 py-20 relative overflow-hidden">
        {/* Subtle noise overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.015]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`, backgroundRepeat: 'repeat' }} />

        <StaggerContainer>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 relative">
            {STATS.map(stat => (
              <motion.div key={stat.label} variants={staggerItem} className="text-left md:text-center">
                <p className={`${fontMono.variable} font-mono text-4xl sm:text-5xl font-semibold mb-2`} style={{ color: tokens.foreground }}>{stat.value}</p>
                <p className={`${fontMono.variable} font-mono text-xs uppercase tracking-wider`} style={{ color: tokens.mutedForeground }}>{stat.label}</p>
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
    <section id="features" className="py-28 relative overflow-hidden" style={{ backgroundColor: tokens.background }}>
      <div className="absolute inset-0 pointer-events-none opacity-[0.015]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`, backgroundRepeat: 'repeat' }} />
      <div className="max-w-5xl mx-auto px-6 relative">
        <FadeUp>
          <div className="mb-20 text-left">
            <p className={`${fontMono.variable} font-mono text-xs uppercase tracking-widest mb-6 inline-flex items-center gap-4`} style={{ color: tokens.foreground }}>
              <span className="w-12 h-[1px]" style={{ backgroundColor: tokens.accent }} /> Features
            </p>
            <h2 className={`${fontDisplay.variable} font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight max-w-3xl`} style={{ color: tokens.foreground, lineHeight: 1.1 }}>
              Everything you need. Nothing you don't.
            </h2>
          </div>
        </FadeUp>
        <StaggerContainer>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {FEATURES.map(feature => (
              <motion.div
                key={feature.title}
                variants={staggerItem}
                className="group relative"
              >
                {/* Accent bar above icon */}
                <div className="h-[2px] w-8 mb-6 transition-all duration-300 group-hover:w-16" style={{ backgroundColor: tokens.accent }} />
                <feature.icon className="h-6 w-6 mb-6" style={{ color: tokens.foreground }} strokeWidth={1.5} />
                <h3 className={`${fontDisplay.variable} font-display font-semibold text-2xl mb-4 tracking-tight`} style={{ color: tokens.foreground }}>{feature.title}</h3>
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
    <section className="py-32 border-y border-y-[1px] relative overflow-hidden" style={{ borderColor: tokens.border, backgroundColor: tokens.muted }}>
      <div className="absolute inset-0 pointer-events-none opacity-[0.015]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`, backgroundRepeat: 'repeat' }} />
      <div className="max-w-5xl mx-auto px-6 relative">
        <FadeUp>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
            <div className="lg:col-span-5 relative">
              <p className={`${fontMono.variable} font-mono text-xs uppercase tracking-widest mb-8`} style={{ color: tokens.accent }}>The Manifesto</p>
              <h2 className={`${fontDisplay.variable} font-display text-4xl sm:text-5xl font-bold tracking-tight mb-8`} style={{ color: tokens.foreground, lineHeight: 1.1 }}>
                Words are the interface.
              </h2>
            </div>
            <div className="lg:col-span-7 space-y-8">
              <p className={`${fontSerif.variable} font-serif text-2xl sm:text-3xl leading-snug`} style={{ color: tokens.foreground }}>
                "We believe that text is not just content to be styled, but the very structure of the application itself. When you remove the boxes, the words must stand on their own."
              </p>
              <div className="h-px w-full" style={{ backgroundColor: tokens.border }} />
              <div className="space-y-6">
                <p className="text-lg leading-relaxed" style={{ color: tokens.mutedForeground }}>
                  Most modern interfaces treat text as an afterthought—something to fill the geometric containers that designers spend hours perfecting. We take the opposite approach.
                </p>
                <p className="text-lg leading-relaxed" style={{ color: tokens.mutedForeground }}>
                  By stripping away unnecessary visual noise, borders, and rounded rectangles, we force ourselves to rely on scale, weight, and negative space. The result is a design that feels both classic and relentlessly modern.
                </p>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

function Pricing() {
  return (
    <section id="pricing" className="py-28 relative overflow-hidden" style={{ backgroundColor: tokens.background }}>
      <div className="absolute inset-0 pointer-events-none opacity-[0.015]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`, backgroundRepeat: 'repeat' }} />
      <div className="max-w-5xl mx-auto px-6 relative">
        <FadeUp>
          <div className="text-left mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <p className={`${fontMono.variable} font-mono text-xs uppercase tracking-widest mb-6 inline-flex items-center gap-4`} style={{ color: tokens.foreground }}>
                <span className="w-12 h-[1px]" style={{ backgroundColor: tokens.accent }} /> Access
              </p>
              <h2 className={`${fontDisplay.variable} font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight`} style={{ color: tokens.foreground, lineHeight: 1.1 }}>
                Value derived from clarity.
              </h2>
            </div>
            <p className="text-lg max-w-sm" style={{ color: tokens.mutedForeground }}>
              Simple, transparent pricing. No hidden fees or complex tiers.
            </p>
          </div>
        </FadeUp>
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-[1px] relative" style={{ borderColor: tokens.border }}>
            {PRICING.map((tier, index) => (
              <motion.div
                key={tier.name}
                variants={staggerItem}
                className="p-8 md:p-10 relative flex flex-col"
                style={{
                  borderRight: index < PRICING.length - 1 ? `1px solid ${tokens.border}` : 'none',
                  borderBottom: 'none',
                  borderColor: tokens.border,
                  backgroundColor: 'transparent',
                }}
              >
                {/* Mobile borders */}
                {index < PRICING.length - 1 && (
                  <div className="absolute bottom-0 left-0 w-full h-[1px] md:hidden" style={{ backgroundColor: tokens.border }} />
                )}

                {tier.highlighted && (
                  <div className="absolute top-0 left-0 w-full h-[2px]" style={{ backgroundColor: tokens.accent }} />
                )}

                <h3 className={`${fontDisplay.variable} font-display font-semibold text-2xl mb-2 tracking-tight`} style={{ color: tokens.foreground }}>{tier.name}</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className={`${fontMono.variable} font-mono text-4xl md:text-5xl font-semibold`} style={{ color: tokens.foreground }}>{tier.price}</span>
                  <span className={`${fontMono.variable} font-mono text-sm`} style={{ color: tokens.mutedForeground }}>/{tier.period}</span>
                </div>
                <p className="text-base mb-8 flex-grow" style={{ color: tokens.mutedForeground }}>{tier.description}</p>
                <div className="h-[1px] w-full mb-8" style={{ backgroundColor: tokens.border }} />
                <ul className="space-y-4 mb-10 flex-grow">
                  {tier.features.map(f => (
                    <li key={f} className="flex items-start gap-3 text-base">
                      <Check className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: tokens.foreground }} strokeWidth={1.5} />
                      <span style={{ color: tokens.foreground }}>{f}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-4 uppercase tracking-widest font-semibold text-sm transition-all duration-150 border active:translate-y-px ${tier.highlighted ? 'group' : 'hover:bg-white hover:text-black'}`}
                  style={tier.highlighted
                    ? { backgroundColor: 'transparent', color: tokens.accent, borderColor: tokens.border }
                    : { backgroundColor: 'transparent', color: tokens.foreground, borderColor: tokens.border }
                  }
                >
                  <span className="relative inline-block">
                    {tier.cta}
                    {tier.highlighted && (
                      <span className="absolute -bottom-1 left-0 w-full h-[2px] scale-x-100 group-hover:scale-x-110 transition-transform duration-150 origin-left" style={{ backgroundColor: tokens.accent }} />
                    )}
                  </span>
                </button>
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
    <section id="testimonials" className="py-28 relative overflow-hidden border-y border-y-[1px]" style={{ borderColor: tokens.border, backgroundColor: tokens.muted }}>
      <div className="absolute inset-0 pointer-events-none opacity-[0.015]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`, backgroundRepeat: 'repeat' }} />
      <div className="max-w-5xl mx-auto px-6 relative">
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {TESTIMONIALS.map((t, index) => (
              <motion.div
                key={t.name}
                variants={staggerItem}
                className="flex flex-col h-full"
              >
                <div className="mb-6">
                  <svg className="w-10 h-10" style={{ fill: tokens.accent }} viewBox="0 0 24 24">
                    <path d="M14.017 21L16.41 14.593V3H3V14.593L5.393 21H14.017ZM20.017 21L22.41 14.593V3H9V14.593L11.393 21H20.017Z" />
                  </svg>
                </div>
                <p className={`${fontSerif.variable} font-serif text-xl sm:text-2xl leading-snug mb-8 flex-grow`} style={{ color: tokens.foreground }}>"{t.text}"</p>
                <div className="pt-6 border-t-[1px]" style={{ borderColor: tokens.border }}>
                  <p className={`${fontDisplay.variable} font-display font-semibold text-lg mb-1`} style={{ color: tokens.foreground }}>{t.name}</p>
                  <p className={`${fontMono.variable} font-mono text-xs uppercase tracking-wider`} style={{ color: tokens.mutedForeground }}>{t.role}, {t.company}</p>
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
    <section id="faq" className="py-28 relative overflow-hidden" style={{ backgroundColor: tokens.background }}>
      <div className="absolute inset-0 pointer-events-none opacity-[0.015]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`, backgroundRepeat: 'repeat' }} />
      <div className="max-w-4xl mx-auto px-6 relative">
        <FadeUp>
          <div className="mb-20">
            <p className={`${fontMono.variable} font-mono text-xs uppercase tracking-widest mb-6 inline-flex items-center gap-4`} style={{ color: tokens.foreground }}>
              <span className="w-12 h-[1px]" style={{ backgroundColor: tokens.accent }} /> Clarification
            </p>
            <h2 className={`${fontDisplay.variable} font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight`} style={{ color: tokens.foreground, lineHeight: 1.1 }}>
              Questions answered.
            </h2>
          </div>
        </FadeUp>
        <div className="border-t-[1px]" style={{ borderColor: tokens.border }}>
          {FAQ_ITEMS.map((item, i) => (
            <div key={i} className="border-b-[1px] group" style={{ borderColor: tokens.border }}>
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
                className="w-full flex items-start justify-between py-8 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-colors duration-150"
                style={{ outlineColor: tokens.ring }}
              >
                <span className={`${fontDisplay.variable} font-display font-semibold text-xl md:text-2xl tracking-tight transition-colors duration-150 group-hover:text-accent`} style={{ color: openIndex === i ? tokens.accent : tokens.foreground }}>{item.q}</span>
                <div className="ml-6 flex-shrink-0 mt-1">
                  {openIndex === i ? (
                    <Minus className="h-6 w-6" style={{ color: tokens.accent }} />
                  ) : (
                    <Plus className="h-6 w-6 transition-colors duration-150 group-hover:text-accent" style={{ color: tokens.foreground }} />
                  )}
                </div>
              </button>
              <motion.div
                initial={false}
                animate={{ height: openIndex === i ? 'auto' : 0, opacity: openIndex === i ? 1 : 0 }}
                transition={{ duration: 0.2, ease: [0.25, 0, 0, 1] }}
                style={{ overflow: 'hidden' }}
              >
                <p className="pb-8 text-lg leading-relaxed max-w-3xl" style={{ color: tokens.mutedForeground }}>
                  {item.a}
                </p>
              </motion.div>
            </div>
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
    <section className="py-32 relative overflow-hidden" style={{ backgroundColor: 'transparent' }}>
      <div className="absolute inset-0 pointer-events-none opacity-[0.015]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`, backgroundRepeat: 'repeat' }} />
      <div className="max-w-5xl mx-auto px-6 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <FadeUp>
            <h2 className={`${fontDisplay.variable} font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6`} style={{ color: tokens.foreground, lineHeight: 1.1 }}>
              Join the list.
            </h2>
            <p className="text-lg leading-relaxed max-w-md" style={{ color: tokens.mutedForeground }}>
              No spam. Just updates on new features and early access.
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            {status === 'success' ? (
              <div className="h-14 flex items-center">
                <p className={`${fontMono.variable} font-mono uppercase tracking-widest`} style={{ color: tokens.accent }}>✓ Subscription confirmed.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-0">
                <label htmlFor="newsletter-email" className="sr-only">Email address</label>
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="flex-1 h-14 px-4 rounded-none border-[1px] text-base focus-visible:outline-none focus-visible:border-accent transition-colors duration-150"
                  style={{ borderColor: tokens.border, backgroundColor: tokens.input, color: tokens.foreground }}
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="h-14 px-8 border-[1px] border-l-0 sm:border-l-[1px] uppercase tracking-widest font-semibold text-sm transition-all duration-150 active:translate-y-px hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50"
                  style={{ borderColor: tokens.foreground, color: tokens.foreground, outlineColor: tokens.ring }}
                >
                  {status === 'loading' ? 'WAIT...' : 'SUBSCRIBE'}
                </button>
              </form>
            )}
          </FadeUp>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  const links = {
    Product: ['Features', 'Pricing', 'Changelog', 'Roadmap'],
    Company: ['About', 'Blog', 'Careers', 'Press'],
    Resources: ['Documentation', 'API', 'Guides', 'Status'],
    Legal: ['Privacy', 'Terms', 'Cookies', 'Security'],
  }

  return (
    <footer className="py-24 border-t-[1px] relative overflow-hidden" style={{ backgroundColor: tokens.muted, borderColor: tokens.border }}>
      <div className="absolute inset-0 pointer-events-none opacity-[0.015]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`, backgroundRepeat: 'repeat' }} />
      <div className="max-w-5xl mx-auto px-6 relative">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 md:gap-8 mb-24">
          <div className="col-span-2">
            <p className={`${fontDisplay.variable} font-display font-bold text-3xl tracking-tight mb-6`} style={{ color: tokens.foreground }}>{PRODUCT_NAME}</p>
            <p className="text-base leading-relaxed max-w-sm mb-8" style={{ color: tokens.mutedForeground }}>
              Design is just typography. The rest is decoration.
            </p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-accent transition-colors duration-150" style={{ color: tokens.mutedForeground }}>
                <Globe className="h-5 w-5" strokeWidth={1.5} />
              </a>
            </div>
          </div>
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <p className={`${fontMono.variable} font-mono text-xs uppercase tracking-widest mb-6`} style={{ color: tokens.foreground }}>{group}</p>
              <ul className="space-y-4">
                {items.map(item => (
                  <li key={item}>
                    <a href="#" className="relative text-base transition-colors duration-150 group hover:text-foreground inline-block" style={{ color: tokens.mutedForeground }}>
                      {item}
                      <span className="absolute -bottom-1 left-0 w-full h-[1px] scale-x-0 group-hover:scale-x-100 transition-transform duration-150 origin-left" style={{ backgroundColor: tokens.foreground }} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pt-8 border-t-[1px] gap-6" style={{ borderColor: tokens.border }}>
          <p className={`${fontMono.variable} font-mono text-xs uppercase tracking-widest`} style={{ color: tokens.mutedForeground }}>
            © 2026 {PRODUCT_NAME}.
          </p>
          <a
            href="/"
            className="relative uppercase tracking-widest font-semibold pb-1 inline-flex items-center gap-2 group transition-all duration-150 text-xs"
            style={{ color: tokens.mutedForeground }}
          >
            <ArrowRight className="h-3 w-3 rotate-180 transition-transform group-hover:-translate-x-1" />
            ALL STYLES
            <span className="absolute bottom-0 left-0 w-full h-[1px] scale-x-0 group-hover:scale-x-100 transition-transform duration-150 origin-left" style={{ backgroundColor: tokens.mutedForeground }} />
          </a>
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
    <div className={`${fontDisplay.variable} ${fontBody.variable} ${fontSerif.variable} ${fontMono.variable} font-body`} style={{ backgroundColor: tokens.background, color: tokens.foreground }}>
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.015]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`, backgroundRepeat: 'repeat' }} />
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
