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
// Replace fonts with those specified in the design system:
import { Space_Grotesk } from 'next/font/google'
import {
  Star, ChevronDown, ArrowRight, Check, Users, Zap, Globe, Shield,
  BookOpen, Layout, Palette, Code2, BarChart, Lock
} from 'lucide-react'

// ─────────────────────────────────────────────
// FONTS — replace with style-specific fonts
// ─────────────────────────────────────────────
const bodyFont = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['400', '500', '700'],
})

// ─────────────────────────────────────────────
// DESIGN TOKENS — replace ALL values per style
// ─────────────────────────────────────────────
const tokens = {
  background: '#FFFDF5', // Cream/Off-White
  backgroundAlt: '#FFFFFF', // Contrast panel
  foreground: '#000000', // Pure Black
  muted: '#C4B5FD', // Soft Violet
  mutedForeground: '#000000', // Black, opacity maybe used
  border: '#000000', // Pure Black
  accent: '#FF6B6B', // Hot Red
  accentSecondary: '#FFD93D', // Vivid Yellow
  accentForeground: '#000000', // Text on accent
}

const SHADOWS = {
  sm: '4px 4px 0px 0px #000',
  md: '8px 8px 0px 0px #000',
  lg: '12px 12px 0px 0px #000',
  xl: '16px 16px 0px 0px #000',
}

const BORDERS = {
  thick: '4px solid #000',
}

// ─────────────────────────────────────────────
// MOTION HELPERS
// ─────────────────────────────────────────────
function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-5% 0px' })
  const shouldReduce = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      initial={shouldReduce ? false : { opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

function StaggerContainer({ children }: { children: React.ReactNode }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-5% 0px' })
  const shouldReduce = useReducedMotion()

  return (
    <motion.div
      ref={ref}
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

const staggerItem: import('framer-motion').Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

// ─────────────────────────────────────────────
// DATA — replace with style-appropriate content
// ─────────────────────────────────────────────
const PRODUCT_NAME = 'ProductName'
const TAGLINE = 'The product tagline goes here'
const DESCRIPTION = 'A compelling description of what this product does and why it matters.'

const NAV_LINKS = ['Features', 'Pricing', 'Testimonials', 'FAQ']

const STATS = [
  { value: '50K+', label: 'Active Users' },
  { value: '99.9%', label: 'Uptime' },
  { value: '140+', label: 'Countries' },
  { value: '4.9/5', label: 'Rating' },
]

const FEATURES = [
  { icon: BookOpen, title: 'Feature One', description: 'Describe the first key feature and its benefit to users.' },
  { icon: Layout, title: 'Feature Two', description: 'Describe the second key feature and its benefit to users.' },
  { icon: Palette, title: 'Feature Three', description: 'Describe the third key feature and its benefit to users.' },
  { icon: Code2, title: 'Feature Four', description: 'Describe the fourth key feature and its benefit to users.' },
  { icon: BarChart, title: 'Feature Five', description: 'Describe the fifth key feature and its benefit to users.' },
  { icon: Lock, title: 'Feature Six', description: 'Describe the sixth key feature and its benefit to users.' },
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
      className="fixed top-0 left-0 right-0 z-50 border-b-4 border-black"
      style={{ backgroundColor: tokens.accentSecondary }}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <span className="font-black text-2xl uppercase tracking-tighter" style={{ color: tokens.foreground }}>
          {PRODUCT_NAME}
        </span>
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-sm font-bold uppercase tracking-widest border-2 border-transparent px-2 py-1 transition-all"
              style={{ color: tokens.foreground }}
              onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = tokens.border
                  e.currentTarget.style.backgroundColor = tokens.backgroundAlt
                  e.currentTarget.style.boxShadow = SHADOWS.sm
                  e.currentTarget.style.transform = 'translate(-2px, -2px)'
              }}
              onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'transparent'
                  e.currentTarget.style.backgroundColor = 'transparent'
                  e.currentTarget.style.boxShadow = 'none'
                  e.currentTarget.style.transform = 'none'
              }}
            >
              {link}
            </a>
          ))}
        </div>
        <motion.button
          whileHover={{ y: -2, x: -2, boxShadow: SHADOWS.md }}
          whileTap={{ y: 2, x: 2, boxShadow: 'none' }}
          className="px-6 h-12 border-4 border-black text-sm font-bold uppercase tracking-widest transition-all duration-100 ease-linear"
          style={{ backgroundColor: tokens.backgroundAlt, color: tokens.foreground, boxShadow: SHADOWS.sm }}
        >
          Get started
        </motion.button>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section className="min-h-dvh flex items-center pt-20 border-b-8 border-black relative overflow-hidden" style={{ backgroundColor: tokens.background }}>
      {/* Background pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `radial-gradient(${tokens.foreground} 2px, transparent 2.5px)`,
          backgroundSize: '30px 30px'
        }}
      />

      {/* Floating decorative shapes */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, ease: "linear", repeat: Infinity }}
        className="absolute top-32 right-10 md:right-32 w-24 h-24 border-4 border-black rounded-full"
        style={{ backgroundColor: tokens.accentSecondary, boxShadow: SHADOWS.md }}
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 15, ease: "linear", repeat: Infinity }}
        className="absolute bottom-32 left-10 md:left-20 w-16 h-16 border-4 border-black"
        style={{ backgroundColor: tokens.muted, boxShadow: SHADOWS.sm }}
      />

      <div className="max-w-7xl mx-auto px-6 py-24 w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="max-w-4xl"
        >
          <div className="inline-block rotate-[-2deg] mb-6">
            <span
              className="px-4 py-2 border-4 border-black text-sm font-black uppercase tracking-widest"
              style={{ backgroundColor: tokens.accentSecondary, color: tokens.foreground, boxShadow: SHADOWS.sm }}
            >
              Introducing {PRODUCT_NAME}
            </span>
          </div>

          <div className="relative mb-8">
            {/* Hollow text effect for background */}
            <h1
              className="text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-none absolute inset-0 text-transparent"
              style={{ WebkitTextStroke: `2px ${tokens.border}`, transform: 'translate(4px, 4px)' }}
            >
              {TAGLINE}
            </h1>
            {/* Solid text on top */}
            <h1
              className="text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-none relative"
              style={{ color: tokens.foreground }}
            >
              {TAGLINE}
            </h1>
          </div>

          <p
            className="text-xl md:text-2xl font-bold mb-12 max-w-2xl leading-snug p-4 border-4 border-black rotate-1 bg-white"
            style={{ color: tokens.foreground, boxShadow: SHADOWS.md }}
          >
            {DESCRIPTION}
          </p>

          <div className="flex flex-col sm:flex-row gap-6">
            <motion.button
              whileHover={{ y: -2, x: -2, boxShadow: SHADOWS.lg }}
              whileTap={{ y: 4, x: 4, boxShadow: 'none' }}
              className="h-16 px-10 border-4 border-black font-black uppercase tracking-widest text-lg flex items-center justify-center gap-3 transition-all duration-100 ease-linear"
              style={{ backgroundColor: tokens.accent, color: tokens.foreground, boxShadow: SHADOWS.md }}
            >
              Start for free <ArrowRight className="h-6 w-6 stroke-[3px]" />
            </motion.button>
            <motion.button
              whileHover={{ y: -2, x: -2, boxShadow: SHADOWS.md }}
              whileTap={{ y: 4, x: 4, boxShadow: 'none' }}
              className="h-16 px-10 border-4 border-black font-black uppercase tracking-widest text-lg flex items-center justify-center transition-all duration-100 ease-linear bg-white"
              style={{ color: tokens.foreground, boxShadow: SHADOWS.md }}
            >
              View demo
            </motion.button>
          </div>
        </motion.div>

        {/* Hero Visual */}
        <FadeUp delay={0.2}>
          <div
            className="mt-20 w-full h-72 md:h-96 border-4 border-black relative overflow-hidden rotate-[-1deg]"
            style={{ backgroundColor: tokens.backgroundAlt, boxShadow: SHADOWS.lg }}
          >
            <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')]" />

            {/* Abstract content inside visual */}
            <div className="absolute top-10 left-10 w-1/3 h-1/2 border-4 border-black bg-neo-muted rotate-2" style={{ backgroundColor: tokens.muted, boxShadow: SHADOWS.sm }} />
            <div className="absolute bottom-10 right-10 w-1/2 h-1/3 border-4 border-black bg-neo-accent -rotate-3 flex items-center justify-center" style={{ backgroundColor: tokens.accent, boxShadow: SHADOWS.sm }}>
               <Star className="h-12 w-12 stroke-[4px]" />
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

function Stats() {
  const statColors = [tokens.accent, tokens.accentSecondary, tokens.muted, tokens.backgroundAlt]

  return (
    <section className="border-b-8 border-black" style={{ backgroundColor: tokens.foreground }}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <StaggerContainer>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((stat, idx) => (
              <motion.div
                key={stat.label}
                variants={staggerItem}
                className="text-center border-4 border-black p-8 transition-transform hover:-translate-y-2"
                style={{
                  backgroundColor: statColors[idx % statColors.length],
                  boxShadow: SHADOWS.sm,
                  transform: `rotate(${idx % 2 === 0 ? 1 : -1}deg)`
                }}
              >
                <p className="text-5xl font-black mb-2" style={{ color: tokens.foreground }}>{stat.value}</p>
                <p className="text-sm font-bold uppercase tracking-widest" style={{ color: tokens.foreground }}>{stat.label}</p>
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
    <section id="features" className="py-32 border-b-8 border-black relative" style={{ backgroundColor: tokens.background }}>
      {/* Background texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: `linear-gradient(to right, ${tokens.foreground} 1px, transparent 1px), linear-gradient(to bottom, ${tokens.foreground} 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <FadeUp>
          <div className="mb-20">
            <div className="inline-block border-4 border-black px-4 py-2 mb-6 -rotate-2" style={{ backgroundColor: tokens.accentSecondary, boxShadow: SHADOWS.sm }}>
               <p className="text-sm font-black uppercase tracking-widest" style={{ color: tokens.foreground }}>Features</p>
            </div>
            <h2 className="text-6xl md:text-7xl font-black mb-6 uppercase tracking-tighter" style={{ color: tokens.foreground }}>
              Everything you need
            </h2>
            <p className="text-xl md:text-2xl font-bold max-w-2xl bg-white border-4 border-black p-4 rotate-1" style={{ color: tokens.foreground, boxShadow: SHADOWS.sm }}>
              Powerful features designed for teams that care about quality.
            </p>
          </div>
        </FadeUp>
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {FEATURES.map((feature, idx) => (
              <motion.div
                key={feature.title}
                variants={staggerItem}
                whileHover={{ y: -8, boxShadow: SHADOWS.lg }}
                className="p-8 border-4 border-black bg-white transition-all duration-200"
                style={{
                  boxShadow: SHADOWS.md,
                }}
              >
                <div className="w-16 h-16 border-4 border-black flex items-center justify-center mb-6" style={{ backgroundColor: idx % 2 === 0 ? tokens.accent : tokens.muted, boxShadow: SHADOWS.sm }}>
                    <feature.icon className="h-8 w-8 stroke-[3px]" style={{ color: tokens.foreground }} />
                </div>
                <h3 className="font-black text-2xl mb-4 uppercase tracking-tight" style={{ color: tokens.foreground }}>{feature.title}</h3>
                <p className="text-lg font-bold leading-snug" style={{ color: tokens.foreground }}>{feature.description}</p>
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
    <section className="py-32 border-b-8 border-black relative overflow-hidden" style={{ backgroundColor: tokens.accent }}>
      {/* Visual noise texture */}
      <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row gap-16 items-center">
        <div className="flex-1 w-full relative">
          {/* Layered sticker effect */}
          <div className="absolute inset-0 border-4 border-black bg-neo-secondary translate-x-4 translate-y-4" style={{ backgroundColor: tokens.accentSecondary }} />
          <div className="absolute inset-0 border-4 border-black bg-neo-muted translate-x-8 translate-y-8" style={{ backgroundColor: tokens.muted }} />

          <div className="relative bg-white border-4 border-black p-10 rotate-1 shadow-[8px_8px_0px_0px_#000]">
            <FadeUp>
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8 leading-none" style={{ color: tokens.foreground }}>
                Built for the way you work
              </h2>
              <div className="space-y-6 font-bold text-xl leading-snug">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <p>
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </p>
              </div>
            </FadeUp>
          </div>
        </div>

        <div className="flex-1 flex justify-center w-full mt-10 md:mt-0">
          <div className="relative">
             <div className="w-64 h-64 md:w-80 md:h-80 border-4 border-black bg-white rounded-full flex items-center justify-center -rotate-6 shadow-[12px_12px_0px_0px_#000] overflow-hidden">
               <span className="text-8xl font-black rotate-12">XYZ</span>
               {/* Pattern inside circle */}
               <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: `radial-gradient(${tokens.foreground} 2px, transparent 2.5px)`, backgroundSize: '15px 15px' }} />
             </div>

             <motion.div
               animate={{ rotate: 360 }}
               transition={{ duration: 10, ease: "linear", repeat: Infinity }}
               className="absolute -top-10 -right-10"
             >
                <Star className="h-24 w-24 stroke-[3px] fill-white" />
             </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Pricing() {
  return (
    <section id="pricing" className="py-32 border-b-8 border-black relative" style={{ backgroundColor: tokens.background }}>
       {/* Background Grid Pattern */}
       <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <FadeUp>
          <div className="text-center mb-20 relative">
            {/* Outline Text Behind */}
            <h2 className="absolute inset-0 text-7xl md:text-9xl font-black uppercase tracking-tighter text-transparent -translate-y-8 opacity-20 pointer-events-none"
                style={{ WebkitTextStroke: `2px ${tokens.border}` }}>
              PRICING
            </h2>
            <div className="inline-block border-4 border-black px-4 py-2 mb-6 bg-white rotate-2" style={{ boxShadow: SHADOWS.sm }}>
               <p className="text-sm font-black uppercase tracking-widest" style={{ color: tokens.foreground }}>Pricing</p>
            </div>
            <h2 className="text-5xl md:text-7xl font-black mb-4 uppercase tracking-tighter" style={{ color: tokens.foreground }}>No surprises</h2>
            <p className="text-xl md:text-2xl font-bold bg-neo-muted inline-block px-4 py-2 border-4 border-black -rotate-1" style={{ color: tokens.foreground, backgroundColor: tokens.muted, boxShadow: SHADOWS.sm }}>Cancel anytime.</p>
          </div>
        </FadeUp>
        <StaggerContainer>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {PRICING.map(tier => (
              <motion.div
                key={tier.name}
                variants={staggerItem}
                whileHover={{ y: -8, boxShadow: tier.highlighted ? SHADOWS.xl : SHADOWS.lg }}
                className="p-8 border-4 border-black transition-all duration-200 relative"
                style={{
                  backgroundColor: tier.highlighted ? tokens.accentSecondary : tokens.backgroundAlt,
                  boxShadow: tier.highlighted ? SHADOWS.lg : SHADOWS.md,
                  zIndex: tier.highlighted ? 10 : 1,
                  transform: tier.highlighted ? 'scale(1.05)' : 'none'
                }}
              >
                {tier.highlighted && (
                  <span
                    className="absolute -top-6 -right-6 px-4 py-2 text-sm font-black uppercase tracking-widest border-4 border-black rotate-12"
                    style={{ backgroundColor: tokens.accent, color: tokens.foreground, boxShadow: SHADOWS.sm }}
                  >
                    Most popular
                  </span>
                )}

                <div className="border-b-4 border-black pb-6 mb-6">
                   <h3 className="font-black text-3xl mb-2 uppercase" style={{ color: tokens.foreground }}>{tier.name}</h3>
                   <div className="flex items-baseline gap-2">
                     <span className="text-6xl font-black tracking-tighter" style={{ color: tokens.foreground }}>{tier.price}</span>
                     <span className="text-lg font-bold" style={{ color: tokens.foreground }}>/ {tier.period}</span>
                   </div>
                </div>

                <p className="text-lg font-bold mb-8 h-12" style={{ color: tokens.foreground }}>{tier.description}</p>
                <ul className="space-y-4 mb-10">
                  {tier.features.map(f => (
                    <li key={f} className="flex items-start gap-3 text-lg font-bold">
                      <Check className="h-6 w-6 mt-0.5 stroke-[4px]" style={{ color: tier.highlighted ? tokens.accent : tokens.accent }} />
                      <span style={{ color: tokens.foreground }}>{f}</span>
                    </li>
                  ))}
                </ul>
                <motion.button
                  whileHover={{ y: -2, x: -2, boxShadow: SHADOWS.md }}
                  whileTap={{ y: 4, x: 4, boxShadow: 'none' }}
                  className="w-full h-16 border-4 border-black font-black text-lg uppercase tracking-widest transition-all duration-100 ease-linear"
                  style={tier.highlighted
                    ? { backgroundColor: tokens.accent, color: tokens.foreground, boxShadow: SHADOWS.sm }
                    : { backgroundColor: tokens.muted, color: tokens.foreground, boxShadow: SHADOWS.sm }
                  }
                >
                  {tier.cta}
                </motion.button>
              </motion.div>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  )
}

function Testimonials() {
  const cardColors = [tokens.accent, tokens.accentSecondary, tokens.muted]

  return (
    <section id="testimonials" className="py-32 border-b-8 border-black relative overflow-hidden" style={{ backgroundColor: tokens.backgroundAlt }}>
       {/* Background Noise */}
       <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <FadeUp>
          <div className="text-center mb-20">
            <h2 className="text-6xl md:text-7xl font-black uppercase tracking-tighter" style={{ color: tokens.foreground }}>
              <span className="inline-block px-4 border-4 border-black rotate-2" style={{ backgroundColor: tokens.accentSecondary, boxShadow: SHADOWS.md }}>Loved</span>
              {' '}by teams
            </h2>
          </div>
        </FadeUp>
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, idx) => (
              <motion.div
                key={t.name}
                variants={staggerItem}
                whileHover={{ y: -8, boxShadow: SHADOWS.lg }}
                className="p-8 border-4 border-black relative transition-all duration-200"
                style={{
                  backgroundColor: tokens.background,
                  boxShadow: SHADOWS.md,
                  transform: `rotate(${idx % 2 === 0 ? -1 : 2}deg)`
                }}
              >
                {/* Decorative pinned effect */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border-4 border-black" style={{ backgroundColor: tokens.accent, boxShadow: SHADOWS.sm }} />

                <div className="flex mb-6 mt-4 gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-6 w-6 stroke-[3px]" style={{ fill: tokens.accentSecondary, color: tokens.foreground }} />
                  ))}
                </div>
                <p className="text-xl font-bold leading-snug mb-8" style={{ color: tokens.foreground }}>"{t.text}"</p>
                <div className="border-t-4 border-black pt-6 flex items-center justify-between">
                  <div>
                    <p className="font-black text-xl uppercase tracking-tight" style={{ color: tokens.foreground }}>{t.name}</p>
                    <p className="text-sm font-bold uppercase tracking-widest mt-1" style={{ color: tokens.foreground }}>{t.role} @ {t.company}</p>
                  </div>
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
    <section id="faq" className="py-32 border-b-8 border-black relative" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <FadeUp>
          <div className="mb-16">
            <div className="inline-block border-4 border-black px-4 py-2 mb-6 rotate-2" style={{ backgroundColor: tokens.muted, boxShadow: SHADOWS.sm }}>
               <p className="text-sm font-black uppercase tracking-widest" style={{ color: tokens.foreground }}>FAQ</p>
            </div>
            <h2 className="text-6xl md:text-7xl font-black uppercase tracking-tighter" style={{ color: tokens.foreground }}>
              Common questions
            </h2>
          </div>
        </FadeUp>
        <div className="space-y-6">
          {FAQ_ITEMS.map((item, i) => (
            <FadeUp key={i} delay={i * 0.05}>
              <div
                className="border-4 border-black bg-white transition-all duration-200"
                style={{ boxShadow: SHADOWS.md }}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  aria-expanded={openIndex === i}
                  className="w-full flex items-center justify-between p-6 md:p-8 text-left transition-colors duration-100"
                  style={{ backgroundColor: openIndex === i ? tokens.accentSecondary : 'transparent' }}
                >
                  <span className="font-black text-2xl uppercase tracking-tight" style={{ color: tokens.foreground }}>{item.q}</span>
                  <motion.div
                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                    transition={{ duration: 0.2, ease: "linear" }}
                    className="w-10 h-10 border-4 border-black flex items-center justify-center bg-white flex-shrink-0"
                    style={{ boxShadow: SHADOWS.sm }}
                  >
                    <ChevronDown className="h-6 w-6 stroke-[4px]" style={{ color: tokens.foreground }} />
                  </motion.div>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openIndex === i ? 'auto' : 0, opacity: openIndex === i ? 1 : 0 }}
                  transition={{ duration: 0.2, ease: "linear" }}
                  style={{ overflow: 'hidden' }}
                >
                  <div className="p-6 md:p-8 pt-0 border-t-4 border-black bg-white">
                    <p className="text-xl font-bold leading-snug mt-6" style={{ color: tokens.foreground }}>
                      {item.a}
                    </p>
                  </div>
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
    <section className="py-32 border-b-8 border-black relative overflow-hidden" style={{ backgroundColor: tokens.accent }}>
      {/* Background Dots */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `radial-gradient(${tokens.foreground} 3px, transparent 3.5px)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <FadeUp>
          <div className="border-4 border-black bg-white p-12 md:p-16 rotate-1" style={{ boxShadow: SHADOWS.lg }}>
            <h2 className="text-6xl md:text-7xl font-black mb-6 uppercase tracking-tighter" style={{ color: tokens.foreground }}>
              Stay in the loop
            </h2>
            <p className="text-2xl font-bold mb-12 max-w-xl mx-auto" style={{ color: tokens.foreground }}>
              Get updates on new features and releases. No spam, ever.
            </p>

            {status === 'success' ? (
              <div className="inline-block border-4 border-black px-8 py-4 bg-neo-secondary -rotate-2" style={{ backgroundColor: tokens.accentSecondary, boxShadow: SHADOWS.md }}>
                 <p className="font-black text-2xl uppercase tracking-widest" style={{ color: tokens.foreground }}>✓ You're on the list!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-6 max-w-2xl mx-auto">
                <label htmlFor="newsletter-email" className="sr-only">Email address</label>
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="flex-1 h-16 md:h-20 px-6 border-4 border-black font-bold text-xl placeholder:text-black/40 focus:bg-neo-secondary transition-colors duration-100 ease-linear focus:outline-none"
                  style={{ backgroundColor: tokens.backgroundAlt, color: tokens.foreground, boxShadow: SHADOWS.sm }}
                />
                <motion.button
                  type="submit"
                  disabled={status === 'loading'}
                  whileHover={{ y: -2, x: -2, boxShadow: SHADOWS.md }}
                  whileTap={{ y: 4, x: 4, boxShadow: 'none' }}
                  className="h-16 md:h-20 px-10 border-4 border-black font-black text-xl uppercase tracking-widest disabled:opacity-60 transition-all duration-100 ease-linear"
                  style={{ backgroundColor: tokens.muted, color: tokens.foreground, boxShadow: SHADOWS.sm }}
                >
                  {status === 'loading' ? 'WAIT...' : 'Subscribe'}
                </motion.button>
              </form>
            )}
          </div>
        </FadeUp>
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
    <footer className="pt-24 pb-12" style={{ backgroundColor: tokens.backgroundAlt }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 md:gap-8 mb-20">
          <div className="col-span-2 md:col-span-1">
            <p className="font-black text-3xl uppercase tracking-tighter mb-6" style={{ color: tokens.foreground }}>{PRODUCT_NAME}</p>
            <p className="text-lg font-bold max-w-xs" style={{ color: tokens.foreground }}>
              Building the future, one feature at a time.
            </p>
          </div>
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <p className="font-black text-xl uppercase tracking-widest mb-6 border-b-4 border-black pb-2 inline-block" style={{ color: tokens.foreground }}>{group}</p>
              <ul className="space-y-4">
                {items.map(item => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-lg font-bold hover:bg-neo-accent hover:px-2 transition-all duration-100 ease-linear border-2 border-transparent hover:border-black inline-block"
                      style={{ color: tokens.foreground }}
                      onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = tokens.accent
                          e.currentTarget.style.boxShadow = SHADOWS.sm
                      }}
                      onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent'
                          e.currentTarget.style.boxShadow = 'none'
                      }}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t-8 border-black gap-6">
          <p className="text-lg font-bold uppercase tracking-widest" style={{ color: tokens.foreground }}>
            © 2026 {PRODUCT_NAME}.
          </p>
          <a
            href="/"
            className="text-sm font-black uppercase tracking-widest px-6 py-3 border-4 border-black transition-all duration-100 ease-linear hover:-translate-y-1 hover:-translate-x-1"
            style={{ backgroundColor: tokens.muted, color: tokens.foreground, boxShadow: SHADOWS.sm }}
          >
            ← All styles
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
    <div className={`${bodyFont.variable} font-sans`} style={{ backgroundColor: tokens.background }}>
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
