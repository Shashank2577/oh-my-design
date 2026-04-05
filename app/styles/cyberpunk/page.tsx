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
import { Orbitron, Share_Tech_Mono, JetBrains_Mono } from 'next/font/google'
import {
  Star, ChevronDown, ArrowRight, Check, Users, Zap, Globe, Shield,
  BookOpen, Layout, Palette, Code2, BarChart, Lock
} from 'lucide-react'

// ─────────────────────────────────────────────
// FONTS — replace with style-specific fonts
// ─────────────────────────────────────────────
const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const shareTechMono = Share_Tech_Mono({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-accent',
  display: 'swap',
})

// ─────────────────────────────────────────────
// DESIGN TOKENS — replace ALL values per style
// ─────────────────────────────────────────────
const tokens = {
  background: '#0a0a0f',
  backgroundAlt: '#12121a', // card
  foreground: '#e0e0e0',
  muted: '#1c1c2e',
  mutedForeground: '#6b7280',
  border: '#2a2a3a',
  accent: '#00ff88',
  accentSecondary: '#ff00ff',
  accentTertiary: '#00d4ff',
  accentForeground: '#0a0a0f',
}

const styles = {
  neonGlow: '0 0 5px #00ff88, 0 0 10px #00ff8840',
  neonGlowSm: '0 0 3px #00ff88, 0 0 6px #00ff8830',
  neonGlowLg: '0 0 10px #00ff88, 0 0 20px #00ff8860, 0 0 40px #00ff8830',
  neonGlowSecondary: '0 0 5px #ff00ff, 0 0 20px #ff00ff60',
  neonGlowTertiary: '0 0 5px #00d4ff, 0 0 20px #00d4ff60',
  glitchShadow: '0 0 10px rgba(0, 255, 136, 0.5)',
  chamferPath: 'polygon(0 10px, 10px 0, calc(100% - 10px) 0, 100% 10px, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0 calc(100% - 10px))',
  chamferPathSm: 'polygon(0 6px, 6px 0, calc(100% - 6px) 0, 100% 6px, 100% calc(100% - 6px), calc(100% - 6px) 100%, 6px 100%, 0 calc(100% - 6px))',
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
      transition={{ duration: 0.2, delay, ease: 'linear' }}
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
        visible: { transition: { staggerChildren: 0.05 } },
      }}
    >
      {children}
    </motion.div>
  )
}

const staggerItem: import('framer-motion').Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.15, ease: 'linear' } as any },
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
      className="fixed top-0 left-0 right-0 z-50 border-b bg-black/80 backdrop-blur"
      style={{ borderColor: tokens.border }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <span className="font-bold text-lg uppercase tracking-widest font-heading cyber-glitch" data-text={PRODUCT_NAME} style={{ color: tokens.accent }}>
          {PRODUCT_NAME}
        </span>
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-sm transition-colors hover:opacity-80 font-accent uppercase tracking-widest"
              style={{ color: tokens.foreground }}
            >
              <span style={{ color: tokens.accentTertiary }} className="mr-1">{">"}</span>{link}
            </a>
          ))}
        </div>
        <motion.button
          whileHover={{ boxShadow: styles.neonGlow, backgroundColor: tokens.accent, color: tokens.accentForeground }}
          className="px-5 h-10 text-sm font-medium font-accent uppercase tracking-widest -skew-x-12 transform transition-all duration-200 border-2"
          style={{ borderColor: tokens.accent, color: tokens.accent, backgroundColor: 'transparent' }}
        >
          <span className="inline-block skew-x-12 transform">Initialize</span>
        </motion.button>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section className="min-h-dvh flex items-center pt-16 relative overflow-hidden" style={{ backgroundColor: tokens.background }}>
      <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: `linear-gradient(${tokens.accent}0a 1px, transparent 1px), linear-gradient(90deg, ${tokens.accent}0a 1px, transparent 1px)`, backgroundSize: '50px 50px' }} />
      <div className="max-w-6xl mx-auto px-6 py-24 w-full relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.05, delayChildren: 0.1 }}
          className="max-w-4xl"
        >
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className="text-sm uppercase tracking-[0.2em] mb-4 font-accent"
            style={{ color: tokens.accentTertiary }}
          >
            <span className="animate-pulse mr-2">_</span>SYS.INIT: {PRODUCT_NAME}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: 0.1 }}
            className="text-5xl md:text-8xl font-black uppercase tracking-widest mb-6 font-heading leading-none"
            style={{ color: tokens.foreground, textShadow: styles.glitchShadow }}
          >
            {TAGLINE}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: 0.2 }}
            className="text-lg md:text-xl mb-10 max-w-2xl leading-relaxed"
            style={{ color: tokens.mutedForeground }}
          >
            {DESCRIPTION}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-6"
          >
            <motion.button
              whileHover={{ boxShadow: styles.neonGlow, backgroundColor: tokens.accent, color: tokens.accentForeground, skewX: 0 }}
              className="h-14 px-8 font-medium flex items-center justify-center gap-2 font-accent uppercase tracking-widest -skew-x-12 transform transition-all duration-200 border-2 group"
              style={{ borderColor: tokens.accent, color: tokens.accent, backgroundColor: 'transparent' }}
            >
              <span className="inline-block skew-x-12 transform group-hover:skew-x-0 transition-all duration-200 flex items-center gap-2">Execute_Cmd <ArrowRight className="h-4 w-4" /></span>
            </motion.button>
            <motion.button
              whileHover={{ boxShadow: styles.neonGlowSecondary, backgroundColor: tokens.accentSecondary, color: tokens.foreground, skewX: 0 }}
              className="h-14 px-8 font-medium flex items-center justify-center gap-2 font-accent uppercase tracking-widest -skew-x-12 transform transition-all duration-200 border-2 group"
              style={{ borderColor: tokens.accentSecondary, color: tokens.accentSecondary, backgroundColor: 'transparent' }}
            >
               <span className="inline-block skew-x-12 transform group-hover:skew-x-0 transition-all duration-200">View_Docs</span>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Hero Visual */}
        <FadeUp delay={0.4}>
          <div
            className="mt-20 w-full h-72 md:h-96 relative group"
            style={{ background: `linear-gradient(135deg, ${tokens.accent}10, ${tokens.accentTertiary}10)`, border: `1px solid ${tokens.border}`, clipPath: styles.chamferPath }}
          >
             <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500" />
             <div className="absolute top-4 left-4 font-accent text-xs" style={{color: tokens.accentTertiary}}>UI_PANEL_01</div>
             <div className="absolute bottom-4 right-4 font-accent text-xs" style={{color: tokens.accent}}>ONLINE</div>
             <div className="absolute inset-0 border border-transparent group-hover:border-accent/50 transition-colors duration-500" style={{clipPath: styles.chamferPath}}/>

             {/* Holographic Inner Elements */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 rounded-full animate-[spin_60s_linear_infinite]" style={{ borderColor: `${tokens.accent}40`, borderTopColor: tokens.accent, borderBottomColor: tokens.accentSecondary }} />
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 border border-dashed rounded-full animate-[spin_40s_linear_infinite_reverse]" style={{ borderColor: `${tokens.accentTertiary}80` }} />

          </div>
        </FadeUp>
      </div>
    </section>
  )
}

function Stats() {
  return (
    <section className="border-y py-12 relative" style={{ borderColor: tokens.border, backgroundColor: tokens.backgroundAlt }}>
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b" style={{ backgroundImage: `linear-gradient(to bottom, ${tokens.accent}, ${tokens.accentSecondary})` }} />
      <div className="max-w-6xl mx-auto px-6">
        <StaggerContainer>
          <div className="flex flex-col md:flex-row justify-between divide-y md:divide-y-0 md:divide-x" style={{ borderColor: tokens.border }}>
            {STATS.map(stat => (
              <motion.div key={stat.label} variants={staggerItem} className="text-center flex-1 py-4 md:py-0">
                <p className="text-4xl md:text-5xl font-black mb-2 font-heading tracking-widest" style={{ color: tokens.foreground, textShadow: styles.neonGlowSm }}>{stat.value}</p>
                <p className="text-xs uppercase tracking-[0.2em] font-accent" style={{ color: tokens.accentTertiary }}>{stat.label}</p>
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
    <section id="features" className="py-24 relative" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-6xl mx-auto px-6">
        <FadeUp>
          <div className="mb-16 flex flex-col md:flex-row justify-between items-end gap-6 border-b pb-6" style={{ borderColor: tokens.border }}>
             <div>
                <div className="inline-flex items-center gap-3 border px-4 py-1 mb-6" style={{ borderColor: `${tokens.accentTertiary}40`, backgroundColor: `${tokens.accentTertiary}10`, clipPath: styles.chamferPathSm }}>
                  <span className="h-2 w-2 bg-current animate-pulse" style={{ color: tokens.accentTertiary }} />
                  <span className="font-accent text-xs uppercase tracking-[0.15em]" style={{ color: tokens.accentTertiary }}>
                    Modules
                  </span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold font-heading uppercase tracking-widest" style={{ color: tokens.foreground }}>
                  Core_Systems
                </h2>
            </div>
            <p className="text-sm font-accent max-w-md text-right hidden md:block" style={{ color: tokens.mutedForeground }}>
              // Powerful features designed for teams that care about quality.
            </p>
          </div>
        </FadeUp>
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transform -skew-y-1">
            {FEATURES.map((feature, i) => (
              <motion.div
                key={feature.title}
                variants={staggerItem}
                whileHover={{ y: -2, borderColor: tokens.accent, boxShadow: styles.neonGlowSm }}
                transition={{ duration: 0.2 }}
                className="p-8 border relative group transform skew-y-1 bg-black/40 backdrop-blur"
                style={{ borderColor: tokens.border, clipPath: styles.chamferPath }}
              >
                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 opacity-0 group-hover:opacity-100 transition-opacity" style={{ borderColor: tokens.accent }} />

                <div className="mb-6 inline-flex items-center justify-center w-12 h-12 relative">
                   <div className="absolute inset-0 border border-current opacity-30 transform rotate-45 group-hover:rotate-90 transition-transform duration-300" style={{ color: tokens.accentTertiary }} />
                   <feature.icon className="h-6 w-6 relative z-10" style={{ color: tokens.accent }} strokeWidth={1.5} />
                </div>
                <h3 className="font-semibold text-xl mb-3 font-heading uppercase tracking-wide" style={{ color: tokens.foreground }}>{feature.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: tokens.mutedForeground }}>{feature.description}</p>
                <div className="mt-6 font-accent text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: tokens.accentTertiary }}>
                   SYS.{String(i + 1).padStart(2, '0')} // ACTIVE
                </div>
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
    <section className="py-24 relative" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-4xl mx-auto px-6">
        <FadeUp>
          <div className="border-2 bg-black/80 shadow-[0_0_20px_rgba(0,255,136,0.1)] relative" style={{ borderColor: tokens.accent, clipPath: styles.chamferPath }}>
            {/* Title bar */}
            <div className="border-b px-4 py-3 flex items-center justify-between" style={{ borderColor: tokens.accent, backgroundColor: `${tokens.accent}10` }}>
               <div className="flex gap-2">
                 <div className="h-3 w-3 rounded-full" style={{ backgroundColor: tokens.accentSecondary }} />
                 <div className="h-3 w-3 rounded-full" style={{ backgroundColor: tokens.accentTertiary }} />
                 <div className="h-3 w-3 rounded-full" style={{ backgroundColor: tokens.accent }} />
               </div>
               <div className="font-accent text-xs uppercase tracking-widest text-center flex-1" style={{ color: tokens.accent }}>
                 /sys/core/readme.txt
               </div>
            </div>
            {/* Content */}
            <div className="p-8 font-mono space-y-6">
               <h2 className="text-2xl md:text-4xl font-heading font-black uppercase tracking-wide mb-8" style={{ color: tokens.foreground, textShadow: styles.neonGlowSm }}>
                  <span style={{ color: tokens.accentSecondary }}>{">"}</span> Architecture
               </h2>
               <div className="space-y-4 text-sm md:text-base leading-relaxed" style={{ color: tokens.mutedForeground }}>
                  <p>
                    <span style={{ color: tokens.accentTertiary }}>[01]</span> The system architecture is designed for maximum resilience in hostile network environments. We've implemented multi-layered encryption protocols that adapt to incoming intrusion attempts in real-time.
                  </p>
                  <p>
                    <span style={{ color: tokens.accentTertiary }}>[02]</span> Core processing routines run decentralized, distributing the load across available nodes. This ensures that a localized failure or targeted attack cannot compromise the primary data stream.
                  </p>
                  <p>
                    <span style={{ color: tokens.accentTertiary }}>[03]</span> User interfaces are rendered via the latest holographic projection APIs, minimizing physical hardware footprint while maximizing data density and interaction speed.
                  </p>
               </div>
               <div className="mt-8 pt-6 border-t border-dashed" style={{ borderColor: tokens.border }}>
                  <div className="flex items-center gap-2 text-sm font-accent">
                    <span style={{ color: tokens.accent }}>root@system:~#</span>
                    <span className="animate-[blink_1s_step-end_infinite] w-2 h-4" style={{ backgroundColor: tokens.foreground }}></span>
                  </div>
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
    <section id="pricing" className="py-24 relative" style={{ backgroundColor: tokens.backgroundAlt }}>
      <div className="absolute inset-0 pointer-events-none opacity-10" style={{ backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,136,0.3) 2px, rgba(0,255,136,0.3) 4px)` }} />
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <FadeUp>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black font-heading uppercase tracking-widest mb-4" style={{ color: tokens.foreground, textShadow: styles.neonGlowSm }}>Access_Tiers</h2>
            <p className="text-sm font-accent uppercase tracking-[0.2em]" style={{ color: tokens.accentTertiary }}>// Select your clearance level</p>
          </div>
        </FadeUp>
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 items-center">
            {PRICING.map(tier => (
              <motion.div
                key={tier.name}
                variants={staggerItem}
                className={`p-8 relative group transform ${tier.highlighted ? 'scale-105 z-10' : ''}`}
                style={{
                  backgroundColor: tokens.background,
                  clipPath: styles.chamferPath
                }}
              >
                {/* Border effect */}
                <div className="absolute inset-0 border-2 pointer-events-none" style={{ borderColor: tier.highlighted ? tokens.accent : tokens.border, clipPath: styles.chamferPath, boxShadow: tier.highlighted ? styles.neonGlow : 'none' }} />

                {tier.highlighted && (
                  <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: tokens.accent, boxShadow: styles.neonGlow }} />
                )}

                <h3 className="font-black text-2xl mb-2 font-heading uppercase tracking-widest" style={{ color: tier.highlighted ? tokens.accent : tokens.foreground }}>{tier.name}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-bold font-mono" style={{ color: tokens.foreground }}>{tier.price}</span>
                  <span className="text-xs font-accent uppercase tracking-widest" style={{ color: tokens.mutedForeground }}>/ {tier.period}</span>
                </div>
                <p className="text-sm mb-8 font-mono" style={{ color: tokens.mutedForeground }}>{tier.description}</p>
                <ul className="space-y-4 mb-8">
                  {tier.features.map(f => (
                    <li key={f} className="flex items-start gap-3 text-sm font-mono">
                      <span className="mt-1 flex-shrink-0 text-xs" style={{ color: tier.highlighted ? tokens.accent : tokens.accentTertiary }}>{">"}</span>
                      <span style={{ color: tokens.foreground }}>{f}</span>
                    </li>
                  ))}
                </ul>
                <motion.button
                  whileHover={{ skewX: 0, boxShadow: tier.highlighted ? styles.neonGlow : styles.neonGlowSecondary, backgroundColor: tier.highlighted ? tokens.accent : tokens.accentSecondary, color: tier.highlighted ? tokens.accentForeground : tokens.foreground }}
                  className="w-full h-12 font-medium text-sm border-2 font-accent uppercase tracking-widest -skew-x-12 transform transition-all duration-200"
                  style={{
                    backgroundColor: 'transparent',
                    color: tier.highlighted ? tokens.accent : tokens.accentSecondary,
                    borderColor: tier.highlighted ? tokens.accent : tokens.accentSecondary
                  }}
                >
                  <span className="inline-block skew-x-12 transform">{tier.cta}</span>
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
  return (
    <section id="testimonials" className="py-24" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-6xl mx-auto px-6">
        <FadeUp>
          <div className="mb-16 border-b pb-6" style={{ borderColor: tokens.border }}>
            <h2 className="text-4xl md:text-5xl font-black font-heading uppercase tracking-widest" style={{ color: tokens.foreground }}>User_Logs</h2>
          </div>
        </FadeUp>
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map(t => (
              <motion.div
                key={t.name}
                variants={staggerItem}
                className="p-6 border relative group bg-black/50"
                style={{ borderColor: tokens.border, clipPath: styles.chamferPathSm }}
              >
                 <div className="absolute top-0 left-0 w-full h-full border pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" style={{ borderColor: tokens.accentSecondary, clipPath: styles.chamferPathSm, boxShadow: styles.neonGlowSecondary }} />

                <div className="flex mb-4 gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <div key={i} className="h-1 w-4" style={{ backgroundColor: tokens.accent }} />
                  ))}
                </div>
                <div className="text-sm leading-relaxed mb-6 font-mono pl-4 border-l-2 relative" style={{ color: tokens.foreground, borderColor: `${tokens.accentTertiary}40` }}>
                  <span className="absolute -left-2 top-0 text-xs" style={{color: tokens.accentTertiary}}>{'"'}</span>
                  {t.text}
                </div>
                <div className="flex items-center gap-3 border-t pt-4" style={{ borderColor: tokens.border }}>
                   <div className="h-8 w-8 bg-gray-800 flex items-center justify-center font-heading font-bold" style={{ color: tokens.accentSecondary, clipPath: styles.chamferPathSm }}>
                      {t.name.charAt(0)}
                   </div>
                  <div>
                    <p className="font-bold text-xs uppercase tracking-widest font-accent" style={{ color: tokens.accentTertiary }}>{t.name}</p>
                    <p className="text-xs font-mono" style={{ color: tokens.mutedForeground }}>{t.role} @ {t.company}</p>
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
    <section id="faq" className="py-24" style={{ backgroundColor: tokens.backgroundAlt }}>
      <div className="max-w-3xl mx-auto px-6">
        <FadeUp>
          <div className="mb-16 border-b pb-6" style={{ borderColor: tokens.border }}>
            <h2 className="text-4xl md:text-5xl font-black font-heading uppercase tracking-widest" style={{ color: tokens.foreground }}>Query_DB</h2>
          </div>
        </FadeUp>
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, i) => (
            <FadeUp key={i} delay={i * 0.05}>
              <div className="border bg-black/50" style={{ borderColor: openIndex === i ? tokens.accent : tokens.border, clipPath: styles.chamferPathSm }}>
                 {/* Terminal header */}
                <div className="border-b px-4 py-2 flex items-center gap-2" style={{ borderColor: openIndex === i ? tokens.accent : tokens.border, backgroundColor: openIndex === i ? `${tokens.accent}10` : 'transparent' }}>
                  <div className="h-2 w-2 rounded-full" style={{ backgroundColor: tokens.accentSecondary }} />
                  <div className="h-2 w-2 rounded-full" style={{ backgroundColor: tokens.accentTertiary }} />
                  <div className="h-2 w-2 rounded-full" style={{ backgroundColor: tokens.accent }} />
                  <span className="font-accent text-xs uppercase tracking-widest ml-2" style={{ color: tokens.mutedForeground }}>q_{String(i + 1).padStart(2, '0')}.exe</span>
                </div>
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  aria-expanded={openIndex === i}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-heading font-semibold uppercase tracking-wide text-lg" style={{ color: openIndex === i ? tokens.accent : tokens.foreground }}>
                    <span style={{ color: tokens.accentSecondary }} className="mr-2">{">"}</span>{item.q}
                  </span>
                  <motion.span
                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="h-5 w-5 flex-shrink-0" style={{ color: openIndex === i ? tokens.accent : tokens.mutedForeground }} />
                  </motion.span>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openIndex === i ? 'auto' : 0, opacity: openIndex === i ? 1 : 0 }}
                  transition={{ duration: 0.2, ease: 'linear' }}
                  style={{ overflow: 'hidden' }}
                >
                  <div className="px-6 pb-6 pt-2">
                     <p className="text-sm leading-relaxed font-mono pl-4 border-l border-dashed" style={{ color: tokens.mutedForeground, borderColor: `${tokens.accent}40` }}>
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
  const [isFocused, setIsFocused] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setTimeout(() => setStatus('success'), 1200)
  }

  return (
    <section className="py-24 border-y relative" style={{ borderColor: tokens.accent, backgroundColor: tokens.background }}>
       <div className="absolute inset-0 bg-gradient-to-r opacity-5" style={{ backgroundImage: `linear-gradient(to right, ${tokens.accent}, ${tokens.accentTertiary})` }} />
      <div className="max-w-2xl mx-auto px-6 text-center relative z-10">
        <FadeUp>
          <div className="inline-block p-1 border border-dashed mb-8" style={{ borderColor: tokens.accentTertiary }}>
            <div className="border p-8 bg-black/60 backdrop-blur" style={{ borderColor: tokens.accentTertiary, clipPath: styles.chamferPath }}>
              <h2 className="text-3xl font-black font-heading uppercase tracking-widest mb-4" style={{ color: tokens.foreground, textShadow: styles.neonGlowTertiary }}>Establish_Link</h2>
              <p className="text-sm font-mono mb-8" style={{ color: tokens.mutedForeground }}>
                // Receive encrypted payload updates directly to your local node.
              </p>
              {status === 'success' ? (
                <div className="font-accent text-lg uppercase tracking-widest flex items-center justify-center gap-2" style={{ color: tokens.accent }}>
                  <span className="w-2 h-2 rounded-full bg-current animate-pulse" /> Connection_Established
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 items-center">
                  <label htmlFor="newsletter-email" className="sr-only">Data stream address</label>
                  <div className="relative flex-1 w-full">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 font-accent text-lg" style={{ color: isFocused ? tokens.accent : tokens.accentTertiary }}>{">"}</span>
                    <input
                      id="newsletter-email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="user@node.net"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                      className="w-full h-12 pl-8 pr-4 bg-black border-b-2 font-mono text-sm transition-all duration-200 outline-none placeholder:opacity-50"
                      style={{
                        borderColor: isFocused ? tokens.accent : tokens.border,
                        color: tokens.accent,
                        boxShadow: isFocused ? `0 2px 10px ${tokens.accent}40` : 'none'
                      }}
                    />
                  </div>
                  <motion.button
                    type="submit"
                    disabled={status === 'loading'}
                    whileHover={{ skewX: 0, boxShadow: styles.neonGlow, backgroundColor: tokens.accent, color: tokens.accentForeground }}
                    className="h-12 px-6 font-medium text-sm border-2 font-accent uppercase tracking-widest -skew-x-12 transform transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
                    style={{ backgroundColor: 'transparent', color: tokens.accent, borderColor: tokens.accent }}
                  >
                    <span className="inline-block skew-x-12 transform">{status === 'loading' ? 'Connecting...' : 'Connect'}</span>
                  </motion.button>
                </form>
              )}
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

function Footer() {
  const links = {
    Data: ['Specs', 'Rates', 'Updates', 'Map'],
    Corp: ['About', 'Feed', 'Recruits', 'PR'],
    Nodes: ['Docs', 'API_Keys', 'Manual', 'Status'],
    Legal: ['Privacy', 'TOS', 'Cookies', 'Sec_Clearance'],
  }

  return (
    <footer className="py-16 border-t" style={{ backgroundColor: tokens.backgroundAlt, borderColor: tokens.border }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <p className="font-black text-lg mb-3 font-heading uppercase tracking-widest cyber-glitch" data-text={PRODUCT_NAME} style={{ color: tokens.accent }}>{PRODUCT_NAME}</p>
            <p className="text-xs font-mono leading-relaxed" style={{ color: tokens.mutedForeground }}>
              // System operations running at optimal capacity.
            </p>
          </div>
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <p className="font-bold text-xs uppercase tracking-widest mb-4 font-accent" style={{ color: tokens.foreground }}>{group}</p>
              <ul className="space-y-3">
                {items.map(item => (
                  <li key={item}>
                    <a href="#" className="text-xs font-mono hover:underline hover:text-accent transition-colors" style={{ color: tokens.mutedForeground, textDecorationColor: tokens.accent }}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t gap-4 border-dashed" style={{ borderColor: tokens.border }}>
          <p className="text-xs font-mono" style={{ color: tokens.mutedForeground }}>
            SYS.DATE: 2026.10.14 // {PRODUCT_NAME} // All rights reserved.
          </p>
          <a
            href="/"
            className="text-xs font-accent uppercase tracking-widest hover:text-accent transition-colors flex items-center gap-2 group"
            style={{ color: tokens.mutedForeground }}
          >
            <span className="transform group-hover:-translate-x-1 transition-transform">{"<-"}</span> Terminate_Session
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
    <div className={`${orbitron.variable} ${shareTechMono.variable} ${jetbrainsMono.variable} font-body`} style={{ backgroundColor: tokens.background }}>
      {/* Global Scanlines Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-10" style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #000 2px, #000 4px)' }} />
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
