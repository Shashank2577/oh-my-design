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
import { Inter, Inconsolata } from 'next/font/google'
import {
  Star, ChevronDown, ArrowRight, Check, Users, Zap, Globe, Shield,
  BookOpen, Layout, Palette, Code2, BarChart, Lock
} from 'lucide-react'

// ─────────────────────────────────────────────
// FONTS — replace with style-specific fonts
// ─────────────────────────────────────────────
const bodyFont = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const monoFont = Inconsolata({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

// ─────────────────────────────────────────────
// DESIGN TOKENS — replace ALL values per style
// ─────────────────────────────────────────────
const tokens = {
  background: '#000000', // Pure Black
  backgroundAlt: '#141414', // Near Black
  foreground: '#ffffff', // Pure White
  muted: '#3a3a3a', // Hover Gray
  mutedForeground: '#a0a0a0', // Silver
  border: 'rgba(65, 65, 65, 0.8)', // Charcoal
  accent: '#faff69', // Neon Volt
  accentForeground: '#151515', // Near Black
  success: '#166534', // Forest Green
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

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

// ─────────────────────────────────────────────
// DATA — replace with style-appropriate content
// ─────────────────────────────────────────────
const PRODUCT_NAME = 'ClickHouse'
const TAGLINE = 'Unbeatable performance.'
const DESCRIPTION = 'The fastest and most resource efficient open-source database for real-time apps and analytics.'

const NAV_LINKS = ['Product', 'Solutions', 'Docs', 'Pricing']

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
      className="fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-md"
      style={{ borderColor: tokens.border, backgroundColor: 'rgba(0,0,0,0.8)' }}
    >
      <div className="max-w-[2200px] mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
        <span className="font-black text-xl tracking-tight" style={{ color: tokens.foreground }}>
          {PRODUCT_NAME}
          <span style={{ color: tokens.accent }}>.</span>
        </span>
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-[14px] font-medium transition-colors"
              style={{ color: tokens.foreground }}
              onMouseOver={(e) => e.currentTarget.style.color = tokens.accent}
              onMouseOut={(e) => e.currentTarget.style.color = tokens.foreground}
            >
              {link}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <a href="#" className="hidden md:block text-[14px] font-medium" style={{ color: tokens.foreground }} onMouseOver={(e) => e.currentTarget.style.color = tokens.accent} onMouseOut={(e) => e.currentTarget.style.color = tokens.foreground}>Log in</a>
          <motion.button
            whileHover={{ backgroundColor: '#1d1d1d', color: tokens.accentForeground }}
            whileTap={{ color: '#f4f692' }}
            className="px-4 h-9 rounded-[4px] text-[14px] font-bold transition-colors"
            style={{ backgroundColor: tokens.accent, color: tokens.accentForeground, border: `1px solid ${tokens.accent}` }}
          >
            Start free
          </motion.button>
        </div>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section className="min-h-dvh flex items-center pt-24" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-[2200px] mx-auto px-6 md:px-12 py-24 w-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.15, delayChildren: 0.1 }}
          className="max-w-5xl"
        >
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-[48px] md:text-[72px] lg:text-[96px] font-black leading-[1.0] mb-8 tracking-tighter"
            style={{ color: tokens.foreground }}
          >
            {TAGLINE}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[20px] md:text-[24px] mb-12 max-w-3xl leading-[1.50] font-medium"
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
              whileHover={{ backgroundColor: '#1d1d1d' }}
              whileTap={{ color: '#f4f692' }}
              className="h-12 px-8 rounded-[4px] font-bold flex items-center justify-center transition-colors"
              style={{ backgroundColor: tokens.accent, color: tokens.accentForeground, border: `1px solid ${tokens.accent}` }}
            >
              Start for free
            </motion.button>
            <motion.button
              whileHover={{ backgroundColor: '#1d1d1d' }}
              whileTap={{ color: '#f4f692' }}
              className="h-12 px-8 rounded-[4px] font-bold flex items-center justify-center transition-colors"
              style={{ backgroundColor: 'transparent', color: tokens.foreground, border: '1px solid #4f5100' }}
            >
              Contact sales
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Hero Visual Code Block */}
        <FadeUp delay={0.4}>
          <div
            className="mt-20 w-full rounded-[8px] p-6 md:p-10 font-mono overflow-x-auto"
            style={{ backgroundColor: tokens.backgroundAlt, border: `1px solid ${tokens.border}`, boxShadow: 'rgba(0,0,0,0.1) 0px 10px 15px -3px' }}
          >
            <pre className="text-[16px] leading-[1.50] font-semibold">
              <code style={{ color: tokens.foreground }}>
                <span style={{ color: tokens.accent }}>SELECT</span> browser, <span style={{ color: tokens.accent }}>count</span>()<br/>
                <span style={{ color: tokens.accent }}>FROM</span> web_analytics<br/>
                <span style={{ color: tokens.accent }}>WHERE</span> event_date <span style={{ color: tokens.accent }}>&gt;</span> <span style={{ color: '#166534' }}>'2024-01-01'</span><br/>
                <span style={{ color: tokens.accent }}>GROUP BY</span> browser<br/>
                <span style={{ color: tokens.accent }}>ORDER BY</span> <span style={{ color: tokens.accent }}>count</span>() <span style={{ color: tokens.accent }}>DESC</span><br/>
                <span style={{ color: tokens.accent }}>LIMIT</span> 5;<br/>
              </code>
            </pre>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

function Stats() {
  return (
    <section className="py-24 border-t" style={{ borderColor: tokens.border, backgroundColor: tokens.background }}>
      <div className="max-w-[2200px] mx-auto px-6 md:px-12">
        <FadeUp>
          <p className="text-[14px] font-semibold tracking-[1.4px] uppercase mb-16" style={{ color: tokens.mutedForeground }}>Performance by the numbers</p>
        </FadeUp>
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {STATS.map((stat, i) => (
              <motion.div key={stat.label} variants={staggerItem} className="flex flex-col">
                <p className="text-[64px] md:text-[80px] font-black leading-[1.0] tracking-tighter mb-4" style={{ color: i === 1 ? tokens.accent : tokens.foreground }}>{stat.value}</p>
                <p className="text-[16px] font-medium" style={{ color: tokens.mutedForeground }}>{stat.label}</p>
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
    <section id="features" className="py-24" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-[2200px] mx-auto px-6 md:px-12">
        <FadeUp>
          <div className="mb-16 max-w-3xl">
            <p className="text-[14px] font-semibold tracking-[1.4px] uppercase mb-6" style={{ color: tokens.mutedForeground }}>Core Capabilities</p>
            <h2 className="text-[48px] font-black leading-[1.0] tracking-tight mb-6" style={{ color: tokens.foreground }}>
              Query billions of rows in milliseconds
            </h2>
            <p className="text-[20px] leading-[1.50] font-medium" style={{ color: tokens.mutedForeground }}>
              ClickHouse is designed for speed. It scales from a single laptop to clusters of hundreds of nodes.
            </p>
          </div>
        </FadeUp>
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feature, i) => (
              <motion.div
                key={feature.title}
                variants={staggerItem}
                className="p-8 rounded-[8px] border transition-colors"
                style={{
                  borderColor: i === 0 ? tokens.accent : tokens.border,
                  backgroundColor: tokens.backgroundAlt,
                  boxShadow: i === 0 ? `0 0 0 1px ${tokens.accent} inset` : 'none'
                }}
              >
                <feature.icon className="h-8 w-8 mb-6" style={{ color: i === 0 ? tokens.accent : tokens.foreground }} strokeWidth={2} />
                <h3 className="font-bold text-[24px] mb-3 tracking-tight" style={{ color: tokens.foreground }}>{feature.title}</h3>
                <p className="text-[16px] leading-[1.60] font-medium" style={{ color: tokens.mutedForeground }}>{feature.description}</p>
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
    <section className="py-32 border-y" style={{ borderColor: tokens.border, backgroundColor: tokens.background }}>
      <div className="max-w-[2200px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <FadeUp>
            <div className="max-w-xl">
              <p className="text-[14px] font-semibold tracking-[1.4px] uppercase mb-6" style={{ color: tokens.mutedForeground }}>Architecture</p>
              <h2 className="text-[48px] font-black leading-[1.0] tracking-tight mb-8" style={{ color: tokens.foreground }}>
                Column-oriented database management system
              </h2>
              <div className="space-y-6">
                <p className="text-[18px] leading-[1.60] font-medium" style={{ color: tokens.mutedForeground }}>
                  In a true column-oriented DBMS, no extra data is stored with the values. For example, to avoid storing the length of strings, a separate file is used.
                </p>
                <p className="text-[18px] leading-[1.60] font-medium" style={{ color: tokens.mutedForeground }}>
                  Because data is stored in columns, it can be compressed much better. ClickHouse uses advanced compression algorithms to reduce storage requirements and improve I/O performance.
                </p>
                <motion.button
                  whileHover={{ backgroundColor: '#1d1d1d' }}
                  className="mt-4 h-12 px-6 rounded-[4px] font-bold text-[14px] transition-colors"
                  style={{ backgroundColor: tokens.backgroundAlt, color: tokens.foreground, border: `1px solid ${tokens.border}` }}
                >
                  Read the docs
                </motion.button>
              </div>
            </div>
          </FadeUp>
          <FadeUp delay={0.2}>
            <div className="w-full aspect-[4/3] rounded-[8px] overflow-hidden" style={{ border: `1px solid ${tokens.border}`, backgroundColor: tokens.backgroundAlt }}>
              {/* Abstract visual representation */}
              <div className="w-full h-full p-8 flex flex-col gap-4 opacity-50">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="flex gap-2 w-full h-8">
                    {[...Array(12)].map((_, j) => (
                      <div key={j} className="flex-1 rounded-[2px]" style={{ backgroundColor: j % 3 === 0 ? tokens.accent : tokens.muted }}></div>
                    ))}
                  </div>
                ))}
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
    <section id="pricing" className="py-32" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-[2200px] mx-auto px-6 md:px-12">
        <FadeUp>
          <div className="mb-16">
            <p className="text-[14px] font-semibold tracking-[1.4px] uppercase mb-6" style={{ color: tokens.mutedForeground }}>Pricing</p>
            <h2 className="text-[48px] font-black leading-[1.0] tracking-tight mb-6" style={{ color: tokens.foreground }}>Start building for free</h2>
            <p className="text-[20px] leading-[1.50] font-medium max-w-2xl" style={{ color: tokens.mutedForeground }}>Pay only for what you use with our serverless cloud offering.</p>
          </div>
        </FadeUp>
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRICING.map((tier, i) => (
              <motion.div
                key={tier.name}
                variants={staggerItem}
                className="p-8 rounded-[8px] border relative flex flex-col"
                style={{
                  borderColor: tier.highlighted ? tokens.accent : tokens.border,
                  backgroundColor: tokens.backgroundAlt,
                  boxShadow: tier.highlighted ? `0 0 0 1px ${tokens.accent} inset` : 'none',
                }}
              >
                {tier.highlighted && (
                  <span
                    className="absolute top-8 right-8 px-2 py-1 text-[11px] font-bold uppercase tracking-widest rounded-[4px]"
                    style={{ backgroundColor: tokens.accent, color: tokens.accentForeground }}
                  >
                    Recommended
                  </span>
                )}
                <h3 className="font-bold text-[24px] mb-2 tracking-tight" style={{ color: tokens.foreground }}>{tier.name}</h3>
                <p className="text-[16px] font-medium mb-8" style={{ color: tokens.mutedForeground }}>{tier.description}</p>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-[48px] font-black tracking-tighter leading-[1.0]" style={{ color: tokens.foreground }}>{tier.price}</span>
                  <span className="text-[16px] font-medium" style={{ color: tokens.mutedForeground }}>/ {tier.period}</span>
                </div>

                <motion.button
                  whileHover={{ backgroundColor: i === 1 ? '#1d1d1d' : tokens.muted }}
                  whileTap={{ color: tokens.accent }}
                  className="w-full h-12 rounded-[4px] font-bold text-[14px] mb-10 border transition-colors"
                  style={tier.highlighted
                    ? { backgroundColor: tokens.accent, color: tokens.accentForeground, borderColor: tokens.accent }
                    : { backgroundColor: 'transparent', color: tokens.foreground, borderColor: tokens.border }
                  }
                >
                  {tier.cta}
                </motion.button>

                <div className="mt-auto">
                  <ul className="space-y-4">
                    {tier.features.map(f => (
                      <li key={f} className="flex items-start gap-3 text-[16px] font-medium">
                        <Check className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: tokens.accent }} strokeWidth={3} />
                        <span style={{ color: tokens.foreground }}>{f}</span>
                      </li>
                    ))}
                  </ul>
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
    <section id="testimonials" className="py-32 border-t" style={{ borderColor: tokens.border, backgroundColor: tokens.background }}>
      <div className="max-w-[2200px] mx-auto px-6 md:px-12">
        <FadeUp>
          <div className="mb-16">
            <p className="text-[14px] font-semibold tracking-[1.4px] uppercase mb-6" style={{ color: tokens.mutedForeground }}>Trusted by developers</p>
            <h2 className="text-[48px] font-black leading-[1.0] tracking-tight" style={{ color: tokens.foreground }}>Used by the best teams</h2>
          </div>
        </FadeUp>
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map(t => (
              <motion.div
                key={t.name}
                variants={staggerItem}
                className="p-8 rounded-[8px] border"
                style={{ borderColor: tokens.border, backgroundColor: tokens.backgroundAlt }}
              >
                <div className="flex mb-6">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" style={{ color: tokens.accent }} />
                  ))}
                </div>
                <p className="text-[18px] leading-[1.60] font-medium mb-8" style={{ color: tokens.foreground }}>"{t.text}"</p>
                <div>
                  <p className="font-bold text-[16px]" style={{ color: tokens.foreground }}>{t.name}</p>
                  <p className="text-[14px] font-medium mt-1" style={{ color: tokens.mutedForeground }}>{t.role} at {t.company}</p>
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
    <section id="faq" className="py-32 border-t" style={{ borderColor: tokens.border, backgroundColor: tokens.background }}>
      <div className="max-w-4xl mx-auto px-6">
        <FadeUp>
          <div className="mb-16">
            <p className="text-[14px] font-semibold tracking-[1.4px] uppercase mb-6" style={{ color: tokens.mutedForeground }}>FAQ</p>
            <h2 className="text-[48px] font-black leading-[1.0] tracking-tight" style={{ color: tokens.foreground }}>Frequently asked questions</h2>
          </div>
        </FadeUp>
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, i) => (
            <FadeUp key={i} delay={i * 0.05}>
              <div className="border rounded-[8px] overflow-hidden" style={{ borderColor: tokens.border, backgroundColor: tokens.backgroundAlt }}>
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  aria-expanded={openIndex === i}
                  className="w-full flex items-center justify-between p-6 text-left transition-colors hover:bg-[#1d1d1d]"
                >
                  <span className="font-bold text-[18px] tracking-tight" style={{ color: tokens.foreground }}>{item.q}</span>
                  <motion.span
                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="h-6 w-6 flex-shrink-0" style={{ color: tokens.mutedForeground }} />
                  </motion.span>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openIndex === i ? 'auto' : 0, opacity: openIndex === i ? 1 : 0 }}
                  transition={{ duration: 0.2, ease: 'easeOut' as const }}
                  style={{ overflow: 'hidden' }}
                >
                  <p className="px-6 pb-6 text-[16px] leading-[1.60] font-medium" style={{ color: tokens.mutedForeground }}>
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
    <section className="py-32 border-t" style={{ borderColor: tokens.border, backgroundColor: tokens.backgroundAlt }}>
      <div className="max-w-[2200px] mx-auto px-6 md:px-12">
        <div className="max-w-3xl">
          <FadeUp>
            <h2 className="text-[48px] font-black mb-6 tracking-tight" style={{ color: tokens.foreground }}>Ready to get started?</h2>
            <p className="text-[20px] mb-10 font-medium" style={{ color: tokens.mutedForeground }}>
              Spin up a cluster in minutes. No credit card required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ backgroundColor: '#1d1d1d' }}
                whileTap={{ color: tokens.accent }}
                className="h-14 px-8 rounded-[4px] font-bold text-[16px] transition-colors"
                style={{ backgroundColor: tokens.accent, color: tokens.accentForeground }}
              >
                Start free trial
              </motion.button>
              <motion.button
                whileHover={{ backgroundColor: '#1d1d1d' }}
                whileTap={{ color: tokens.accent }}
                className="h-14 px-8 rounded-[4px] font-bold text-[16px] border transition-colors"
                style={{ backgroundColor: 'transparent', borderColor: tokens.border, color: tokens.foreground }}
              >
                Contact sales
              </motion.button>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  const links = {
    Product: ['Cloud', 'Enterprise', 'Open Source', 'Pricing'],
    Resources: ['Docs', 'Blog', 'Events', 'Training'],
    Company: ['About Us', 'Careers', 'Contact', 'Partners'],
    Legal: ['Privacy Policy', 'Terms of Service', 'Security', 'Trust'],
  }

  return (
    <footer className="py-20" style={{ backgroundColor: tokens.background, borderTop: `1px solid ${tokens.border}` }}>
      <div className="max-w-[2200px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-20">
          <div className="col-span-2 md:col-span-1">
            <p className="font-black text-xl tracking-tight mb-4" style={{ color: tokens.foreground }}>
              {PRODUCT_NAME}<span style={{ color: tokens.accent }}>.</span>
            </p>
            <p className="text-[14px] leading-relaxed font-medium" style={{ color: tokens.mutedForeground }}>
              The open-source column-oriented database management system.
            </p>
          </div>
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <p className="font-bold text-[16px] mb-6" style={{ color: tokens.foreground }}>{group}</p>
              <ul className="space-y-4">
                {items.map(item => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-[14px] font-medium transition-colors"
                      style={{ color: tokens.mutedForeground }}
                      onMouseOver={(e) => e.currentTarget.style.color = tokens.accent}
                      onMouseOut={(e) => e.currentTarget.style.color = tokens.mutedForeground}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t gap-4" style={{ borderColor: tokens.border }}>
          <p className="text-[14px] font-medium" style={{ color: tokens.mutedForeground }}>
            © 2025 ClickHouse, Inc. All rights reserved.
          </p>
          <a
            href="/"
            className="text-[14px] font-bold px-4 py-2 rounded-[4px] border transition-colors"
            style={{ borderColor: tokens.border, color: tokens.foreground }}
            onMouseOver={(e) => { e.currentTarget.style.borderColor = tokens.accent; e.currentTarget.style.color = tokens.accent }}
            onMouseOut={(e) => { e.currentTarget.style.borderColor = tokens.border; e.currentTarget.style.color = tokens.foreground }}
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
    <div className={`${bodyFont.variable} ${monoFont.variable} font-sans`} style={{ backgroundColor: tokens.background }}>
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
