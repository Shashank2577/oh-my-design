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
import { Marcellus, Josefin_Sans } from 'next/font/google'
import {
  Star, ChevronDown, ArrowRight, Check, Users, Zap, Globe, Shield,
  BookOpen, Layout, Palette, Code2, BarChart, Lock
} from 'lucide-react'

// ─────────────────────────────────────────────
// FONTS — replace with style-specific fonts
// ─────────────────────────────────────────────
const headingFont = Marcellus({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-heading',
  display: 'swap',
})

const bodyFont = Josefin_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

// ─────────────────────────────────────────────
// DESIGN TOKENS — replace ALL values per style
// ─────────────────────────────────────────────
const tokens = {
  background: '#0A0A0A', // Obsidian Black
  backgroundAlt: '#141414', // Rich Charcoal (Cards)
  foreground: '#F2F0E4', // Champagne Cream
  muted: '#141414',
  mutedForeground: '#888888', // Pewter
  border: '#D4AF37', // Gold
  accent: '#D4AF37', // Gold
  accentSecondary: '#1E3D59', // Midnight Blue
  accentForeground: '#0A0A0A', // Obsidian Black for text on Gold
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
      transition={{ duration: 0.6, delay, ease: [0.23, 1, 0.32, 1] }}
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
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] } },
}

// ─────────────────────────────────────────────
// DATA — replace with style-appropriate content
// ─────────────────────────────────────────────
const PRODUCT_NAME = 'LUMIÈRE'
const TAGLINE = 'Elevate Your Digital Experience'
const DESCRIPTION = 'A sophisticated platform designed for those who appreciate the finer details. Precision engineering meets timeless elegance.'

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

// ─────────────────────────────────────────────
// ART DECO UTILS
// ─────────────────────────────────────────────

const artDecoGlow = { boxShadow: `0 0 15px rgba(212, 175, 55, 0.2)` };
const artDecoGlowHover = { boxShadow: `0 0 20px rgba(212, 175, 55, 0.4)` };

const ArtDecoDivider = () => (
  <div className="flex items-center justify-center gap-4 my-8">
    <div className="h-px w-24 bg-[#D4AF37]" />
    <div className="w-2 h-2 rotate-45 border border-[#D4AF37]" />
    <div className="h-px w-24 bg-[#D4AF37]" />
  </div>
);

function Navbar() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 border-b border-[#D4AF37]/30"
      style={{ backgroundColor: tokens.background }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <span className={`font-bold text-xl tracking-[0.2em] uppercase ${headingFont.className}`} style={{ color: tokens.accent }}>
          {PRODUCT_NAME}
        </span>
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-sm tracking-widest uppercase transition-colors hover:text-[#D4AF37]"
              style={{ color: tokens.foreground }}
            >
              {link}
            </a>
          ))}
        </div>
        <motion.button
          whileHover={{ backgroundColor: tokens.accent, color: tokens.accentForeground, ...artDecoGlowHover }}
          className="px-6 h-12 border-2 text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300"
          style={{ borderColor: tokens.accent, color: tokens.accent, ...artDecoGlow }}
        >
          Get started
        </motion.button>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section className="min-h-dvh flex items-center pt-16 relative overflow-hidden" style={{ backgroundColor: tokens.background }}>
      {/* Sunburst Radial Gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl aspect-square" style={{ background: `radial-gradient(circle, ${tokens.accent}1A 0%, transparent 70%)` }} />

      {/* Vertical architectural lines */}
      <div className="absolute top-0 bottom-0 left-12 w-px bg-[#D4AF37]/10" />
      <div className="absolute top-0 bottom-0 right-12 w-px bg-[#D4AF37]/10" />

      <div className="max-w-4xl mx-auto px-6 py-24 w-full relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.15, delayChildren: 0.1 }}
          className="flex flex-col items-center"
        >
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-sm uppercase tracking-[0.2em] mb-6 flex items-center gap-4"
            style={{ color: tokens.accent }}
          >
            <span className="w-8 h-px bg-[#D4AF37]" />
            Introducing {PRODUCT_NAME}
            <span className="w-8 h-px bg-[#D4AF37]" />
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className={`text-5xl md:text-7xl uppercase tracking-widest leading-tight mb-6 ${headingFont.className}`}
            style={{ color: tokens.foreground }}
          >
            {TAGLINE}
          </motion.h1>
          <ArtDecoDivider />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl mb-12 max-w-2xl leading-relaxed mx-auto"
            style={{ color: tokens.foreground }}
          >
            {DESCRIPTION}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <motion.button
              whileHover={{ backgroundColor: tokens.foreground, color: tokens.background, ...artDecoGlowHover }}
              className="h-14 px-10 border-2 flex items-center gap-3 uppercase tracking-[0.2em] text-xs font-medium transition-all duration-300"
              style={{ backgroundColor: tokens.accent, color: tokens.accentForeground, borderColor: tokens.accent, ...artDecoGlow }}
            >
              Start for free <ArrowRight className="h-4 w-4" />
            </motion.button>
            <motion.button
              whileHover={{ backgroundColor: tokens.accentSecondary, color: tokens.foreground }}
              className="h-14 px-10 border border-[#D4AF37] text-xs uppercase tracking-[0.2em] transition-all duration-300"
              style={{ color: tokens.accent }}
            >
              View demo
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Hero Visual — Double Frame Image */}
        <FadeUp delay={0.4}>
          <div className="mt-20 max-w-3xl mx-auto p-4 border border-[#D4AF37]">
             <div
               className="w-full h-64 md:h-96 relative overflow-hidden border-2 border-[#141414]"
             >
                {/* Stepped corners */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#D4AF37]" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#D4AF37]" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[#D4AF37]" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#D4AF37]" />

                <div
                  className="w-full h-full bg-cover bg-center transition-all duration-700 hover:scale-105"
                  style={{ background: `linear-gradient(135deg, ${tokens.accent}20, ${tokens.accent}05)`, filter: 'grayscale(100%)' }}
                />
             </div>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

function Stats() {
  return (
    <section className="relative py-16" style={{ backgroundColor: tokens.background }}>
      <div className="absolute top-0 left-0 right-0 h-px bg-[#D4AF37]/30" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#D4AF37]/30" />

      <div className="max-w-6xl mx-auto px-6">
        <StaggerContainer>
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[#D4AF37]/20 border-x border-[#D4AF37]/20">
            {STATS.map(stat => (
              <motion.div key={stat.label} variants={staggerItem} className="text-center py-8">
                <p className={`text-4xl md:text-5xl uppercase tracking-widest mb-2 ${headingFont.className}`} style={{ color: tokens.foreground }}>{stat.value}</p>
                <p className="text-xs uppercase tracking-[0.2em]" style={{ color: tokens.accent }}>{stat.label}</p>
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
    <section id="features" className="py-32 relative" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <FadeUp>
          <div className="text-center mb-20 flex flex-col items-center">
            <p className="text-sm uppercase tracking-[0.2em] mb-4 flex items-center gap-4" style={{ color: tokens.accent }}>
              <span className="w-6 h-px bg-[#D4AF37]" />
              Features
              <span className="w-6 h-px bg-[#D4AF37]" />
            </p>
            <h2 className={`text-4xl md:text-5xl uppercase tracking-widest mb-6 ${headingFont.className}`} style={{ color: tokens.foreground }}>
              Precision Engineering
            </h2>
            <ArtDecoDivider />
            <p className="text-lg max-w-2xl mx-auto mt-6" style={{ color: tokens.mutedForeground }}>
              Every element crafted with intention. No detail overlooked in our pursuit of perfection.
            </p>
          </div>
        </FadeUp>
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FEATURES.map((feature, i) => (
              <motion.div
                key={feature.title}
                variants={staggerItem}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                className="group relative p-10 border transition-all duration-500"
                style={{ borderColor: `${tokens.accent}4D`, backgroundColor: tokens.backgroundAlt }}
              >
                {/* Border Glow on Hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ ...artDecoGlowHover, borderColor: tokens.accent, borderWidth: '1px' }} />

                {/* Corner Accents */}
                <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-[#D4AF37] opacity-50 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-[#D4AF37] opacity-50 group-hover:opacity-100 transition-opacity" />

                <div className="mb-8 flex justify-center">
                   {/* Rotated Diamond Icon Container */}
                   <div className="w-16 h-16 rotate-45 border border-[#D4AF37] flex items-center justify-center relative group-hover:bg-[#D4AF37]/10 transition-colors duration-500">
                     <div className="absolute inset-2 border border-[#D4AF37]/30" />
                     <div className="-rotate-45">
                       <feature.icon className="h-6 w-6" style={{ color: tokens.accent }} strokeWidth={1} />
                     </div>
                   </div>
                </div>

                <div className="text-center">
                  <h3 className={`uppercase tracking-widest text-xl mb-4 ${headingFont.className}`} style={{ color: tokens.foreground }}>{feature.title}</h3>
                  <div className="h-px w-12 bg-[#D4AF37]/50 mx-auto mb-4" />
                  <p className="text-sm leading-relaxed" style={{ color: tokens.mutedForeground }}>{feature.description}</p>
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
    <section className="py-32 relative overflow-hidden" style={{ backgroundColor: tokens.backgroundAlt }}>
      <div className="absolute top-0 bottom-0 left-0 right-0 opacity-[0.03]" style={{ background: `repeating-linear-gradient(45deg, ${tokens.accent} 0px, ${tokens.accent} 1px, transparent 1px, transparent 10px), repeating-linear-gradient(-45deg, ${tokens.accent} 0px, ${tokens.accent} 1px, transparent 1px, transparent 10px)` }} />

      <div className="absolute top-0 left-0 right-0 h-px bg-[#D4AF37]/30" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#D4AF37]/30" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <FadeUp>
          <div className="text-center border border-[#D4AF37] p-12 md:p-20 relative bg-[#0A0A0A]">
            {/* Inner Border */}
            <div className="absolute inset-4 border border-[#D4AF37]/30" />

            <p className="text-sm uppercase tracking-[0.2em] mb-4" style={{ color: tokens.accent }}>The Vision</p>
            <h2 className={`text-4xl md:text-5xl uppercase tracking-widest mb-8 ${headingFont.className}`} style={{ color: tokens.foreground }}>
              Uncompromising Quality
            </h2>
            <ArtDecoDivider />
            <div className="space-y-6 text-center max-w-2xl mx-auto mt-8">
              <p className="text-lg leading-relaxed" style={{ color: tokens.mutedForeground }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
              </p>
              <p className="text-lg leading-relaxed" style={{ color: tokens.mutedForeground }}>
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.
              </p>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

function Pricing() {
  return (
    <section id="pricing" className="py-32 relative" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-6xl mx-auto px-6">
        <FadeUp>
          <div className="text-center mb-20">
            <p className="text-sm uppercase tracking-[0.2em] mb-4 flex items-center justify-center gap-4" style={{ color: tokens.accent }}>
              <span className="w-6 h-px bg-[#D4AF37]" />
              Membership
              <span className="w-6 h-px bg-[#D4AF37]" />
            </p>
            <h2 className={`text-4xl md:text-5xl uppercase tracking-widest mb-6 ${headingFont.className}`} style={{ color: tokens.foreground }}>Select Your Tier</h2>
            <ArtDecoDivider />
          </div>
        </FadeUp>
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PRICING.map((tier, i) => (
              <motion.div
                key={tier.name}
                variants={staggerItem}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.5 }}
                className="p-10 border relative group transition-all duration-500"
                style={{
                  borderColor: tier.highlighted ? tokens.accent : `${tokens.accent}4D`,
                  backgroundColor: tokens.backgroundAlt,
                }}
              >
                {/* Border Glow on Hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={tier.highlighted ? { ...artDecoGlow, borderColor: tokens.accent, borderWidth: '2px' } : { ...artDecoGlowHover, borderColor: tokens.accent, borderWidth: '1px' }} />

                {/* Corner Accents */}
                <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-[#D4AF37]" style={{ opacity: tier.highlighted ? 1 : 0.5 }} />
                <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-[#D4AF37]" style={{ opacity: tier.highlighted ? 1 : 0.5 }} />
                <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-[#D4AF37]" style={{ opacity: tier.highlighted ? 1 : 0.5 }} />
                <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-[#D4AF37]" style={{ opacity: tier.highlighted ? 1 : 0.5 }} />

                {tier.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 border border-[#D4AF37] text-xs uppercase tracking-[0.2em] bg-[#0A0A0A]" style={{ color: tokens.accent }}>
                    Premier
                  </div>
                )}

                <div className="text-center mb-8 border-b border-[#D4AF37]/30 pb-8">
                  <h3 className={`uppercase tracking-widest text-xl mb-4 ${headingFont.className}`} style={{ color: tokens.foreground }}>{tier.name}</h3>
                  <div className="flex items-baseline justify-center gap-1 mb-2">
                    <span className={`text-4xl ${headingFont.className}`} style={{ color: tokens.foreground }}>{tier.price}</span>
                    <span className="text-xs uppercase tracking-[0.2em]" style={{ color: tokens.accent }}>/ {tier.period}</span>
                  </div>
                  <p className="text-sm mt-4" style={{ color: tokens.mutedForeground }}>{tier.description}</p>
                </div>

                <ul className="space-y-4 mb-10">
                  {tier.features.map(f => (
                    <li key={f} className="flex items-center gap-3 text-sm">
                      <div className="w-1.5 h-1.5 rotate-45 border border-[#D4AF37] flex-shrink-0" />
                      <span style={{ color: tokens.foreground }}>{f}</span>
                    </li>
                  ))}
                </ul>

                <motion.button
                  whileHover={tier.highlighted ? { backgroundColor: tokens.foreground, color: tokens.background, ...artDecoGlowHover } : { backgroundColor: tokens.accent, color: tokens.accentForeground, ...artDecoGlowHover }}
                  className="w-full h-12 border-2 text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300"
                  style={tier.highlighted
                    ? { backgroundColor: tokens.accent, color: tokens.accentForeground, borderColor: tokens.accent, ...artDecoGlow }
                    : { backgroundColor: 'transparent', color: tokens.accent, borderColor: tokens.accent }
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
  return (
    <section id="testimonials" className="py-32 relative" style={{ backgroundColor: tokens.backgroundAlt }}>
      <div className="absolute top-0 left-0 right-0 h-px bg-[#D4AF37]/30" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#D4AF37]/30" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <FadeUp>
          <div className="text-center mb-20">
            <p className="text-sm uppercase tracking-[0.2em] mb-4 flex items-center justify-center gap-4" style={{ color: tokens.accent }}>
              <span className="w-6 h-px bg-[#D4AF37]" />
              Clientele
              <span className="w-6 h-px bg-[#D4AF37]" />
            </p>
            <h2 className={`text-4xl md:text-5xl uppercase tracking-widest mb-6 ${headingFont.className}`} style={{ color: tokens.foreground }}>Distinguished Patrons</h2>
            <ArtDecoDivider />
          </div>
        </FadeUp>
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map(t => (
              <motion.div
                key={t.name}
                variants={staggerItem}
                className="p-10 border border-[#D4AF37]/30 relative"
                style={{ backgroundColor: tokens.background }}
              >
                 {/* Inner border frame */}
                 <div className="absolute inset-2 border border-[#D4AF37]/10 pointer-events-none" />

                <div className="flex justify-center mb-8 gap-2">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <div key={i} className="w-2 h-2 rotate-45 bg-[#D4AF37]" />
                  ))}
                </div>
                <p className={`text-center text-lg leading-relaxed mb-8 ${headingFont.className}`} style={{ color: tokens.foreground }}>"{t.text}"</p>
                <div className="text-center">
                  <p className="uppercase tracking-widest text-sm mb-1" style={{ color: tokens.foreground }}>{t.name}</p>
                  <p className="text-xs uppercase tracking-[0.2em]" style={{ color: tokens.accent }}>{t.role}, {t.company}</p>
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
    <section id="faq" className="py-32" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-3xl mx-auto px-6">
        <FadeUp>
          <div className="text-center mb-20 flex flex-col items-center">
             <p className="text-sm uppercase tracking-[0.2em] mb-4 flex items-center justify-center gap-4" style={{ color: tokens.accent }}>
              <span className="w-6 h-px bg-[#D4AF37]" />
              Inquiries
              <span className="w-6 h-px bg-[#D4AF37]" />
            </p>
            <h2 className={`text-4xl md:text-5xl uppercase tracking-widest mb-6 ${headingFont.className}`} style={{ color: tokens.foreground }}>Common Questions</h2>
            <ArtDecoDivider />
          </div>
        </FadeUp>
        <div className="space-y-6">
          {FAQ_ITEMS.map((item, i) => (
            <FadeUp key={i} delay={i * 0.05}>
              <div className="border border-[#D4AF37]/30 bg-[#141414]">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  aria-expanded={openIndex === i}
                  className="w-full flex items-center justify-between p-6 text-left transition-colors"
                >
                  <div className="flex items-center gap-4">
                     <span className={`text-[#D4AF37] ${headingFont.className} text-xl`}>
                       {['I', 'II', 'III', 'IV', 'V', 'VI'][i]}
                     </span>
                     <span className="uppercase tracking-widest text-sm" style={{ color: tokens.foreground }}>{item.q}</span>
                  </div>
                  <motion.div
                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-6 h-6 border border-[#D4AF37] flex items-center justify-center rotate-45"
                  >
                    <div className="-rotate-45">
                      <ChevronDown className="h-3 w-3" style={{ color: tokens.accent }} />
                    </div>
                  </motion.div>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openIndex === i ? 'auto' : 0, opacity: openIndex === i ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                  style={{ overflow: 'hidden' }}
                >
                  <div className="px-6 pb-6 pt-2">
                    <div className="h-px w-full bg-[#D4AF37]/20 mb-6" />
                    <p className="text-sm leading-relaxed" style={{ color: tokens.mutedForeground }}>
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
    <section className="py-32 relative" style={{ backgroundColor: tokens.backgroundAlt }}>
      <div className="absolute top-0 left-0 right-0 h-px bg-[#D4AF37]/30" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#D4AF37]/30" />

      <div className="max-w-2xl mx-auto px-6 text-center relative z-10">
        <FadeUp>
          <h2 className={`text-4xl md:text-5xl uppercase tracking-widest mb-4 ${headingFont.className}`} style={{ color: tokens.foreground }}>The Society</h2>
          <ArtDecoDivider />
          <p className="text-lg mb-10" style={{ color: tokens.mutedForeground }}>
            Join our exclusive mailing list for updates on our latest offerings.
          </p>
          {status === 'success' ? (
            <p className="uppercase tracking-[0.2em] font-medium" style={{ color: tokens.accent }}>Request Received</p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-0">
              <label htmlFor="newsletter-email" className="sr-only">Email address</label>
              <input
                id="newsletter-email"
                type="email"
                required
                autoComplete="email"
                placeholder="YOUR EMAIL ADDRESS"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="flex-1 h-14 px-6 border-b-2 bg-transparent text-sm uppercase tracking-widest transition-colors focus:outline-none"
                style={{ borderColor: tokens.accent, color: tokens.foreground }}
              />
              <motion.button
                type="submit"
                disabled={status === 'loading'}
                whileHover={{ backgroundColor: tokens.foreground, color: tokens.background, ...artDecoGlowHover }}
                className="h-14 px-10 border-2 border-l-0 text-xs uppercase tracking-[0.2em] font-medium disabled:opacity-60 transition-all duration-300 sm:w-auto w-full mt-4 sm:mt-0"
                style={{ backgroundColor: tokens.accent, color: tokens.accentForeground, borderColor: tokens.accent, ...artDecoGlow }}
              >
                {status === 'loading' ? 'Sending...' : 'Subscribe'}
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
    Product: ['Features', 'Pricing', 'Changelog', 'Roadmap'],
    Company: ['About', 'Blog', 'Careers', 'Press'],
    Resources: ['Documentation', 'API', 'Guides', 'Status'],
    Legal: ['Privacy', 'Terms', 'Cookies', 'Security'],
  }

  return (
    <footer className="py-20 relative" style={{ backgroundColor: tokens.background }}>
      <div className="absolute top-0 left-0 right-0 h-px bg-[#D4AF37]/30" />
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-16">
          <div className="col-span-2 md:col-span-1">
            <p className={`text-2xl uppercase tracking-widest mb-4 ${headingFont.className}`} style={{ color: tokens.accent }}>{PRODUCT_NAME}</p>
            <p className="text-sm leading-relaxed" style={{ color: tokens.mutedForeground }}>
              A sophisticated platform designed for those who appreciate the finer details.
            </p>
          </div>
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <p className={`uppercase tracking-widest text-sm mb-6 ${headingFont.className}`} style={{ color: tokens.foreground }}>{group}</p>
              <ul className="space-y-4">
                {items.map(item => (
                  <li key={item}>
                    <a href="#" className="text-sm uppercase tracking-wider hover:text-[#D4AF37] transition-colors" style={{ color: tokens.mutedForeground }}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-[#D4AF37]/30 gap-6">
          <p className="text-sm uppercase tracking-wider" style={{ color: tokens.mutedForeground }}>
            © 2026 {PRODUCT_NAME}. All rights reserved.
          </p>
          <a
            href="/"
            className="text-xs px-6 h-10 flex items-center border border-[#D4AF37] uppercase tracking-[0.2em] hover:bg-[#D4AF37] hover:text-[#0A0A0A] transition-all duration-300"
            style={{ color: tokens.accent }}
          >
            All Styles
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
    <div className={`${bodyFont.className} min-h-screen relative`} style={{ backgroundColor: tokens.background }}>
      {/* Background diagonal crosshatch pattern */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03] z-0"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, ${tokens.accent} 0px, ${tokens.accent} 1px, transparent 1px, transparent 10px), repeating-linear-gradient(-45deg, ${tokens.accent} 0px, ${tokens.accent} 1px, transparent 1px, transparent 10px)`
        }}
      />
      <div className="relative z-10">
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
    </div>
  )
}
