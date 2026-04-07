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
import { Inter } from 'next/font/google'
import {
  Star, ChevronDown, ArrowRight, Check, Users, Zap, Globe, Shield,
  BookOpen, Layout, Palette, Code2, BarChart, Lock
} from 'lucide-react'

// ─────────────────────────────────────────────
// FONTS — replace with style-specific fonts
// ─────────────────────────────────────────────

// Runway uses a custom font abcNormal for everything. Inter is a close substitute.
const normalFont = Inter({
  subsets: ['latin'],
  variable: '--font-normal',
  display: 'swap',
})

// ─────────────────────────────────────────────
// DESIGN TOKENS — replace ALL values per style
// ─────────────────────────────────────────────
const tokens = {
  background: '#000000', // Runway Black
  backgroundAlt: '#1a1a1a', // Dark Surface
  foreground: '#ffffff', // Pure White
  muted: '#27272a', // Border Dark
  mutedForeground: '#767d88', // Cool Slate
  border: '#27272a',
  accent: '#ffffff',
  accentForeground: '#000000',
  charcoal: '#404040',
  lightSilver: '#d0d4d4',
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
const PRODUCT_NAME = 'Runway'
const TAGLINE = 'Advancing creativity with artificial intelligence.'
const DESCRIPTION = 'Runway is an applied AI research company shaping the next era of art, entertainment and human creativity.'

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
      className="fixed top-0 left-0 right-0 z-50 bg-transparent transition-colors duration-300"
    >
      <div className="max-w-[1600px] mx-auto px-6 h-20 flex items-center justify-between">
        <span className="font-semibold text-lg tracking-tight" style={{ color: tokens.foreground }}>
          {PRODUCT_NAME}
        </span>
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-[16px] font-normal transition-colors hover:text-white"
              style={{ color: tokens.mutedForeground }}
            >
              {link}
            </a>
          ))}
        </div>
        <div className="flex gap-6 items-center">
          <a href="#" className="hidden md:block text-[16px] font-normal hover:text-white transition-colors" style={{ color: tokens.mutedForeground }}>Log in</a>
          <motion.button
            whileHover={{ opacity: 0.8 }}
            className="px-6 py-2 rounded-[4px] text-[14px] font-semibold"
            style={{ backgroundColor: 'transparent', color: tokens.foreground }}
          >
            TRY RUNWAY FOR FREE
          </motion.button>
        </div>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section className="relative min-h-dvh flex items-center justify-center pt-20" style={{ backgroundColor: tokens.background }}>
      {/* Full-bleed cinematic background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <div className="w-full h-full object-cover bg-gradient-to-br from-indigo-900 via-slate-800 to-black scale-105" />
      </div>

      <div className="max-w-[1600px] mx-auto px-6 py-32 w-full relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.15, delayChildren: 0.1 }}
          className="max-w-4xl flex flex-col items-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-[48px] md:text-[64px] font-normal leading-[1.00] tracking-[-1.2px] mb-8"
            style={{ color: tokens.foreground }}
          >
            {TAGLINE}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[16px] md:text-[18px] mb-12 max-w-2xl leading-[1.50] tracking-[-0.16px]"
            style={{ color: tokens.mutedForeground }}
          >
            {DESCRIPTION}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.button
              whileHover={{ opacity: 0.8 }}
              className="px-6 py-3 rounded-[4px] text-[14px] font-semibold flex items-center justify-center gap-2"
              style={{ backgroundColor: tokens.foreground, color: tokens.background }}
            >
              TRY RUNWAY FOR FREE
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function Stats() {
  // Runway uses visual content instead of text stats typically,
  // but we adapt the stats to the Runway typography style
  return (
    <section className="py-20" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-[1600px] mx-auto px-6">
        <StaggerContainer>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map(stat => (
              <motion.div key={stat.label} variants={staggerItem} className="text-center">
                <p className="text-[40px] font-normal leading-[1.0] tracking-[-1px] mb-2" style={{ color: tokens.foreground }}>{stat.value}</p>
                <p className="text-[14px] font-medium tracking-[0.35px] uppercase" style={{ color: tokens.mutedForeground }}>{stat.label}</p>
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
    <section id="features" className="py-32" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-[1600px] mx-auto px-6">
        <FadeUp>
          <div className="mb-16">
            <h2 className="text-[40px] md:text-[48px] font-normal leading-[1.0] tracking-[-1.2px] mb-4" style={{ color: tokens.foreground }}>
              Research & Generation
            </h2>
            <p className="text-[16px] md:text-[18px] max-w-2xl leading-[1.5] tracking-[-0.16px]" style={{ color: tokens.mutedForeground }}>
              Explore the latest models for video generation, image creation, and audio synthesis.
            </p>
          </div>
        </FadeUp>

        {/* Magazine-style asymmetric grid */}
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

            {/* Large feature */}
            <motion.div variants={staggerItem} className="md:col-span-8 group cursor-pointer">
              <div className="w-full aspect-video rounded-[8px] overflow-hidden mb-4 relative bg-[#1a1a1a]">
                <div className="absolute inset-0 bg-gradient-to-tr from-slate-800 to-indigo-950 opacity-80 group-hover:scale-105 transition-transform duration-700"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[11px] font-medium tracking-[0.35px] uppercase px-3 py-1 rounded-[4px] bg-black/50 text-white backdrop-blur-md border border-white/10">Gen-3 Alpha</span>
                </div>
              </div>
              <h3 className="text-[24px] font-normal leading-[1.1] mb-2" style={{ color: tokens.foreground }}>High-Fidelity Video Generation</h3>
              <p className="text-[16px] leading-[1.4] tracking-[-0.16px]" style={{ color: tokens.mutedForeground }}>A new standard for video fidelity, consistency, and motion.</p>
            </motion.div>

            {/* Two smaller features stacked */}
            <div className="md:col-span-4 flex flex-col gap-6">
              <motion.div variants={staggerItem} className="group cursor-pointer flex-1 flex flex-col">
                <div className="w-full flex-1 min-h-[200px] rounded-[8px] overflow-hidden mb-4 relative bg-[#1a1a1a]">
                  <div className="absolute inset-0 bg-gradient-to-bl from-amber-900 to-stone-900 opacity-80 group-hover:scale-105 transition-transform duration-700"></div>
                </div>
                <h3 className="text-[20px] font-normal leading-[1.1] mb-2" style={{ color: tokens.foreground }}>Audio Integration</h3>
                <p className="text-[14px] leading-[1.4] tracking-[-0.16px]" style={{ color: tokens.mutedForeground }}>Generate sound effects and ambient noise.</p>
              </motion.div>

              <motion.div variants={staggerItem} className="group cursor-pointer flex-1 flex flex-col">
                <div className="w-full flex-1 min-h-[200px] rounded-[8px] overflow-hidden mb-4 relative bg-[#1a1a1a]">
                  <div className="absolute inset-0 bg-gradient-to-tr from-emerald-900 to-teal-950 opacity-80 group-hover:scale-105 transition-transform duration-700"></div>
                </div>
                <h3 className="text-[20px] font-normal leading-[1.1] mb-2" style={{ color: tokens.foreground }}>Image to Video</h3>
                <p className="text-[14px] leading-[1.4] tracking-[-0.16px]" style={{ color: tokens.mutedForeground }}>Bring static images to life with precise motion control.</p>
              </motion.div>
            </div>

          </div>
        </StaggerContainer>
      </div>
    </section>
  )
}

function ProductDetail() {
  return (
    <section className="py-32" style={{ backgroundColor: '#030303' }}>
      <div className="max-w-[1600px] mx-auto px-6">
        <FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[14px] font-medium uppercase tracking-[0.35px] mb-6" style={{ color: tokens.mutedForeground }}>Applied Research</p>
              <h2 className="text-[40px] md:text-[48px] font-normal leading-[1.00] tracking-[-1.2px] mb-8" style={{ color: tokens.foreground }}>
                General World Models
              </h2>
              <div className="space-y-6">
                <p className="text-[16px] leading-[1.5] tracking-[-0.16px]" style={{ color: tokens.mutedForeground }}>
                  We are building AI systems that understand the physical world. Our research is focused on creating foundation models that can simulate real-world physics, complex interactions, and human intent.
                </p>
                <p className="text-[16px] leading-[1.5] tracking-[-0.16px]" style={{ color: tokens.mutedForeground }}>
                  By modeling the world through imagination, art, and aesthetics, we aim to provide unprecedented creative capabilities to storytellers and filmmakers.
                </p>
              </div>
              <motion.button
                whileHover={{ opacity: 0.8 }}
                className="mt-8 px-6 py-3 rounded-[4px] text-[14px] font-semibold border"
                style={{ backgroundColor: 'transparent', color: tokens.foreground, borderColor: tokens.border }}
              >
                READ OUR RESEARCH
              </motion.button>
            </div>

            <div className="w-full aspect-[4/5] rounded-[8px] bg-[#1a1a1a] overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-t from-black via-zinc-900 to-zinc-800"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-sm">
                  <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[14px] border-l-white border-b-[8px] border-b-transparent ml-1"></div>
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
    <section id="pricing" className="py-32" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-[1600px] mx-auto px-6">
        <FadeUp>
          <div className="mb-16">
            <h2 className="text-[40px] md:text-[48px] font-normal leading-[1.00] tracking-[-1.2px] mb-4" style={{ color: tokens.foreground }}>Pricing</h2>
          </div>
        </FadeUp>
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRICING.map(tier => (
              <motion.div
                key={tier.name}
                variants={staggerItem}
                className="p-8 rounded-[8px] border relative flex flex-col"
                style={{
                  borderColor: tokens.border,
                  backgroundColor: tokens.backgroundAlt,
                }}
              >
                <h3 className="font-normal text-[24px] mb-4" style={{ color: tokens.foreground }}>{tier.name}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-[40px] font-normal leading-[1.0] tracking-[-1.2px]" style={{ color: tokens.foreground }}>{tier.price}</span>
                  <span className="text-[14px]" style={{ color: tokens.mutedForeground }}>/ {tier.period}</span>
                </div>
                <p className="text-[14px] mb-8 leading-[1.4] tracking-[-0.16px]" style={{ color: tokens.mutedForeground }}>{tier.description}</p>
                <ul className="space-y-4 mb-10 flex-1">
                  {tier.features.map(f => (
                    <li key={f} className="flex items-start gap-3 text-[14px] tracking-[-0.16px]">
                      <div className="mt-1">
                        <Check className="h-4 w-4 flex-shrink-0" style={{ color: tokens.foreground }} strokeWidth={1.5} />
                      </div>
                      <span style={{ color: tokens.foreground }}>{f}</span>
                    </li>
                  ))}
                </ul>
                <motion.button
                  whileHover={{ opacity: 0.8 }}
                  className="w-full py-[12px] rounded-[4px] font-semibold text-[14px] border"
                  style={tier.highlighted
                    ? { backgroundColor: tokens.foreground, color: tokens.background, borderColor: tokens.foreground }
                    : { backgroundColor: 'transparent', color: tokens.foreground, borderColor: tokens.border }
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
  // Runway showcases partners/clients more than traditional testimonials
  const partners = [
    { name: 'CBS', desc: 'Entertainment' },
    { name: 'New Balance', desc: 'Automotive' },
    { name: 'Ogilvy', desc: 'Agency' },
    { name: 'VaynerMedia', desc: 'Agency' },
    { name: 'Google', desc: 'Technology' },
    { name: 'R/GA', desc: 'Agency' },
  ]

  return (
    <section id="testimonials" className="py-32" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-[1600px] mx-auto px-6">
        <FadeUp>
          <div className="text-center mb-16">
            <h2 className="text-[20px] font-normal" style={{ color: tokens.mutedForeground }}>Trusted by leading creative teams worldwide</h2>
          </div>
        </FadeUp>
        <StaggerContainer>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center text-center">
            {partners.map(p => (
              <motion.div
                key={p.name}
                variants={staggerItem}
              >
                <p className="text-[24px] font-normal tracking-[-0.5px]" style={{ color: tokens.foreground }}>{p.name}</p>
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
      <div className="max-w-[1000px] mx-auto px-6">
        <FadeUp>
          <div className="mb-16">
            <h2 className="text-[40px] md:text-[48px] font-normal leading-[1.0] tracking-[-1.2px]" style={{ color: tokens.foreground }}>FAQ</h2>
          </div>
        </FadeUp>
        <div className="space-y-0 border-t" style={{ borderColor: tokens.border }}>
          {FAQ_ITEMS.map((item, i) => (
            <FadeUp key={i} delay={i * 0.05}>
              <div className="border-b" style={{ borderColor: tokens.border }}>
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  aria-expanded={openIndex === i}
                  className="w-full flex items-center justify-between py-6 text-left"
                >
                  <span className="font-normal text-[20px] leading-[1.2] tracking-[-0.16px]" style={{ color: tokens.foreground }}>{item.q}</span>
                  <motion.span
                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="h-5 w-5 flex-shrink-0" style={{ color: tokens.mutedForeground }} />
                  </motion.span>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openIndex === i ? 'auto' : 0, opacity: openIndex === i ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  style={{ overflow: 'hidden' }}
                >
                  <p className="pb-8 text-[16px] leading-[1.5] tracking-[-0.16px]" style={{ color: tokens.mutedForeground }}>
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
  return (
    <section className="py-48" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-[1600px] mx-auto px-6 text-center">
        <FadeUp>
          <h2 className="text-[48px] md:text-[64px] font-normal leading-[1.00] tracking-[-1.2px] mb-12 max-w-4xl mx-auto" style={{ color: tokens.foreground }}>
            We are building AI to simulate the world through imagination, art and aesthetics
          </h2>
          <div className="flex justify-center">
            <motion.button
              whileHover={{ opacity: 0.8 }}
              className="px-8 py-4 rounded-[4px] text-[14px] font-semibold transition-opacity"
              style={{ backgroundColor: tokens.foreground, color: tokens.background }}
            >
              READ OUR MISSION
            </motion.button>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

function Footer() {
  const links = {
    Products: ['Gen-3 Alpha', 'Gen-2', 'Text to Image', 'Image to Image', 'Video to Video'],
    Company: ['About', 'Careers', 'Research', 'Studios', 'Partners'],
    Resources: ['Help Center', 'Academy', 'API Docs', 'Creators'],
    Legal: ['Privacy Policy', 'Terms of Service', 'Security'],
  }

  return (
    <footer className="py-20" style={{ backgroundColor: tokens.background, borderTop: `1px solid ${tokens.border}` }}>
      <div className="max-w-[1600px] mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-12 mb-20">
          <div className="col-span-2">
            <p className="font-semibold text-[20px] tracking-tight mb-6" style={{ color: tokens.foreground }}>{PRODUCT_NAME}</p>
          </div>
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <p className="font-medium text-[11px] uppercase tracking-[0.35px] mb-6" style={{ color: tokens.mutedForeground }}>{group}</p>
              <ul className="space-y-4">
                {items.map(item => (
                  <li key={item}>
                    <a href="#" className="text-[14px] hover:text-white transition-colors" style={{ color: '#999999' }}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 gap-4">
          <div className="flex gap-6">
            <p className="text-[13px]" style={{ color: tokens.mutedForeground }}>
              © 2026 {PRODUCT_NAME} AI, Inc.
            </p>
          </div>
          <a
            href="/"
            className="text-[13px] hover:text-white transition-colors"
            style={{ color: tokens.mutedForeground }}
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
    <div className={`${normalFont.variable} font-sans`} style={{ backgroundColor: tokens.background }}>
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
