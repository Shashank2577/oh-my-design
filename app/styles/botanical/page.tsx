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
import { Playfair_Display, Source_Sans_3 } from 'next/font/google'
import {
  Star, ChevronDown, ArrowRight, Check, Users, Zap, Globe, Shield,
  BookOpen, Layout, Palette, Code2, BarChart, Lock, Leaf
} from 'lucide-react'

// ─────────────────────────────────────────────
// FONTS — replace with style-specific fonts
// ─────────────────────────────────────────────
const headingFont = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
})

const bodyFont = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

// ─────────────────────────────────────────────
// DESIGN TOKENS — replace ALL values per style
// ─────────────────────────────────────────────
const tokens = {
  background: '#F9F8F4',
  backgroundAlt: '#F2F0EB',
  foreground: '#2D3A31',
  muted: '#DCCFC2',
  mutedForeground: '#2D3A31',
  border: '#E6E2DA',
  accent: '#8C9A84',
  accentForeground: '#FFFFFF',
  interactive: '#C27B66',
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
      transition={{ duration: 0.7, delay, ease: [0.23, 1, 0.32, 1] }}
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

import type { Variants } from 'framer-motion'
const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.23, 1, 0.32, 1] } },
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
      className="fixed top-0 left-0 right-0 z-50 border-b"
      style={{ borderColor: tokens.border, backgroundColor: tokens.background }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <span className="font-bold text-lg font-heading" style={{ color: tokens.foreground }}>
          {PRODUCT_NAME}
        </span>
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-sm transition-colors hover:opacity-80"
              style={{ color: tokens.mutedForeground }}
            >
              {link}
            </a>
          ))}
        </div>
        <motion.button
          whileHover={{ backgroundColor: tokens.interactive }}
          whileTap={{ scale: 0.98 }}
          className="px-5 h-10 rounded-full text-sm font-medium uppercase tracking-widest"
          style={{ backgroundColor: tokens.foreground, color: tokens.accentForeground }}

          transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}>
          Get started
        </motion.button>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section className="min-h-dvh flex items-center pt-16" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-6xl mx-auto px-6 py-24 w-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.15, delayChildren: 0.1 }}
          className="max-w-3xl"
        >
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-sm uppercase tracking-widest mb-4"
            style={{ color: tokens.accent }}
          >
            Introducing {PRODUCT_NAME}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-8xl font-bold leading-tight mb-6 font-heading"
            style={{ color: tokens.foreground }}
          >
            {TAGLINE}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl mb-10 max-w-2xl leading-relaxed"
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
              whileHover={{ backgroundColor: tokens.interactive }}
              whileTap={{ scale: 0.98 }}
              className="h-14 px-8 rounded-full font-medium flex items-center gap-2 uppercase tracking-widest text-sm"
              style={{ backgroundColor: tokens.foreground, color: tokens.accentForeground }}

          transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}>
              Start for free <ArrowRight className="h-4 w-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="h-14 px-8 rounded-full font-medium border uppercase tracking-widest text-sm"
              style={{ borderColor: tokens.accent, color: tokens.accent }}

          transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}>
              View demo
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Hero Visual — replace with style-specific imagery */}
        <FadeUp delay={0.4}>
          <div
            className="mt-16 w-full h-72 md:h-96 rounded-[200px_200px_0_0] overflow-hidden relative flex items-center justify-center"
            style={{ background: `linear-gradient(135deg, ${tokens.accent}40, ${tokens.accent}10)`, border: `1px solid ${tokens.border}` }}
          >
            <div className="absolute inset-0 bg-black/5" />

            {/* Botanical Illustrations */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: [0.23, 1, 0.32, 1] }}
              className="relative z-10 flex gap-8 items-center"
            >
              <Leaf className="w-24 h-24 md:w-32 md:h-32" style={{ color: tokens.foreground, opacity: 0.8 }} />
              <div className="flex flex-col gap-4">
                <Leaf className="w-16 h-16 md:w-20 md:h-20" style={{ color: tokens.interactive, opacity: 0.9, transform: 'rotate(45deg)' }} />
                <Leaf className="w-12 h-12 md:w-16 md:h-16" style={{ color: tokens.accent, opacity: 0.7, transform: 'rotate(-30deg)' }} />
              </div>
            </motion.div>

            {/* Decorative circles representing soft pink flowers */}
            <motion.div
               animate={{ y: [0, -10, 0] }}
               transition={{ duration: 4, repeat: Infinity, ease: [0.23, 1, 0.32, 1] }}
               className="absolute top-1/4 left-1/4 w-16 h-16 rounded-full mix-blend-multiply filter blur-xl opacity-60"
               style={{ backgroundColor: tokens.interactive }}
            />
            <motion.div
               animate={{ y: [0, 15, 0] }}
               transition={{ duration: 5, repeat: Infinity, ease: [0.23, 1, 0.32, 1], delay: 1 }}
               className="absolute bottom-1/4 right-1/3 w-24 h-24 rounded-full mix-blend-multiply filter blur-xl opacity-60"
               style={{ backgroundColor: tokens.accent }}
            />
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

function Stats() {
  return (
    <section className="border-y" style={{ borderColor: tokens.border, backgroundColor: tokens.backgroundAlt }}>
      <div className="max-w-6xl mx-auto px-6 py-12">
        <StaggerContainer>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map(stat => (
              <motion.div key={stat.label} variants={staggerItem} className="text-center">
                <p className="text-4xl font-bold mb-1" style={{ color: tokens.foreground }}>{stat.value}</p>
                <p className="text-sm" style={{ color: tokens.mutedForeground }}>{stat.label}</p>
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
      <div className="max-w-6xl mx-auto px-6">
        <FadeUp>
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-widest mb-3" style={{ color: tokens.accent }}>Features</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 font-heading" style={{ color: tokens.foreground }}>
              Everything you need
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: tokens.mutedForeground }}>
              Powerful features designed for teams that care about quality.
            </p>
          </div>
        </FadeUp>
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {FEATURES.map((feature, i) => (
              <motion.div
                key={feature.title}
                variants={staggerItem}
                whileHover={{ y: -8, boxShadow: `0 10px 15px -3px rgba(45, 58, 49, 0.05)` }}
                transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                className={`p-8 rounded-3xl border ${i % 2 === 1 ? 'md:translate-y-12' : ''}`}
                style={{ borderColor: tokens.border, backgroundColor: tokens.backgroundAlt }}
              >
                <feature.icon className="h-6 w-6 mb-4" style={{ color: tokens.accent }} strokeWidth={1.5} />
                <h3 className="font-semibold text-lg mb-2" style={{ color: tokens.foreground }}>{feature.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: tokens.mutedForeground }}>{feature.description}</p>
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
    <section className="py-24 border-y" style={{ borderColor: tokens.border, backgroundColor: tokens.backgroundAlt }}>
      <div className="max-w-4xl mx-auto px-6">
        <FadeUp>
          <div className="text-center">
            <p className="text-sm uppercase tracking-widest mb-4" style={{ color: tokens.accent }}>About</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 font-heading" style={{ color: tokens.foreground }}>
              Built for the way you work
            </h2>
            <div className="space-y-6 text-left">
              <p className="text-lg leading-relaxed" style={{ color: tokens.mutedForeground }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
              </p>
              <p className="text-lg leading-relaxed" style={{ color: tokens.mutedForeground }}>
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.
              </p>
              <p className="text-lg leading-relaxed" style={{ color: tokens.mutedForeground }}>
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
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
    <section id="pricing" className="py-24" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-6xl mx-auto px-6">
        <FadeUp>
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-widest mb-3" style={{ color: tokens.accent }}>Pricing</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 font-heading" style={{ color: tokens.foreground }}>Simple, transparent pricing</h2>
            <p className="text-lg" style={{ color: tokens.mutedForeground }}>No surprises. Cancel anytime.</p>
          </div>
        </FadeUp>
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRICING.map(tier => (
              <motion.div
                key={tier.name}
                variants={staggerItem}
                whileHover={{ y: -8, boxShadow: `0 10px 15px -3px rgba(45, 58, 49, 0.05)` }}
                transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                className="p-8 rounded-3xl border relative"
                style={{
                  borderColor: tier.highlighted ? tokens.accent : tokens.border,
                  backgroundColor: tier.highlighted ? `${tokens.accent}08` : tokens.backgroundAlt,
                  boxShadow: tier.highlighted ? `0 0 0 2px ${tokens.accent}` : 'none',
                }}
              >
                {tier.highlighted && (
                  <span
                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-xs font-medium rounded-full"
                    style={{ backgroundColor: tokens.accent, color: tokens.accentForeground }}
                  >
                    Most popular
                  </span>
                )}
                <h3 className="font-bold text-xl mb-1 font-heading" style={{ color: tokens.foreground }}>{tier.name}</h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl font-bold" style={{ color: tokens.foreground }}>{tier.price}</span>
                  <span className="text-sm" style={{ color: tokens.mutedForeground }}>/ {tier.period}</span>
                </div>
                <p className="text-sm mb-6" style={{ color: tokens.mutedForeground }}>{tier.description}</p>
                <ul className="space-y-3 mb-8">
                  {tier.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 flex-shrink-0" style={{ color: tokens.accent }} />
                      <span style={{ color: tokens.foreground }}>{f}</span>
                    </li>
                  ))}
                </ul>
                <motion.button
                  whileHover={{ backgroundColor: tier.highlighted ? tokens.interactive : tokens.accent, color: tokens.accentForeground }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full h-12 rounded-full font-medium text-sm border uppercase tracking-widest"
                  style={tier.highlighted
                    ? { backgroundColor: tokens.foreground, color: tokens.accentForeground, borderColor: tokens.foreground }
                    : { backgroundColor: 'transparent', color: tokens.accent, borderColor: tokens.accent }
                  }

          transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}>
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
    <section id="testimonials" className="py-24 border-y" style={{ borderColor: tokens.border, backgroundColor: tokens.backgroundAlt }}>
      <div className="max-w-6xl mx-auto px-6">
        <FadeUp>
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-widest mb-3" style={{ color: tokens.accent }}>Testimonials</p>
            <h2 className="text-4xl md:text-5xl font-bold font-heading" style={{ color: tokens.foreground }}>Loved by teams worldwide</h2>
          </div>
        </FadeUp>
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                variants={staggerItem}
                className={`p-8 rounded-3xl border ${i % 2 === 1 ? 'md:translate-y-12' : ''}`}
                whileHover={{ y: -8, boxShadow: `0 10px 15px -3px rgba(45, 58, 49, 0.05)` }}
                transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                style={{ borderColor: tokens.border, backgroundColor: tokens.background }}
              >
                <div className="flex mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" style={{ color: tokens.accent }} />
                  ))}
                </div>
                <p className="text-sm leading-relaxed mb-6" style={{ color: tokens.foreground }}>"{t.text}"</p>
                <div>
                  <p className="font-semibold text-sm" style={{ color: tokens.foreground }}>{t.name}</p>
                  <p className="text-xs" style={{ color: tokens.mutedForeground }}>{t.role} · {t.company}</p>
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
    <section id="faq" className="py-24" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-3xl mx-auto px-6">
        <FadeUp>
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-widest mb-3" style={{ color: tokens.accent }}>FAQ</p>
            <h2 className="text-4xl md:text-5xl font-bold font-heading" style={{ color: tokens.foreground }}>Common questions</h2>
          </div>
        </FadeUp>
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, i) => (
            <FadeUp key={i} delay={i * 0.05}>
              <div className="border rounded-3xl overflow-hidden" style={{ borderColor: tokens.border }}>
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  aria-expanded={openIndex === i}
                  className="w-full flex items-center justify-between p-6 text-left"
                  style={{ backgroundColor: tokens.backgroundAlt }}
                >
                  <span className="font-medium" style={{ color: tokens.foreground }}>{item.q}</span>
                  <motion.span
                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="h-4 w-4 flex-shrink-0" style={{ color: tokens.mutedForeground }} />
                  </motion.span>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openIndex === i ? 'auto' : 0, opacity: openIndex === i ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                  style={{ overflow: 'hidden' }}
                >
                  <p className="px-6 pb-6 text-sm leading-relaxed" style={{ color: tokens.mutedForeground }}>
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
    <section className="py-24 border-y" style={{ borderColor: tokens.border, backgroundColor: tokens.backgroundAlt }}>
      <div className="max-w-2xl mx-auto px-6 text-center">
        <FadeUp>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-heading" style={{ color: tokens.foreground }}>Stay in the loop</h2>
          <p className="text-lg mb-8" style={{ color: tokens.mutedForeground }}>
            Get updates on new features and releases. No spam, ever.
          </p>
          {status === 'success' ? (
            <p className="font-medium" style={{ color: tokens.accent }}>✓ You're on the list!</p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <label htmlFor="newsletter-email" className="sr-only">Email address</label>
              <input
                id="newsletter-email"
                type="email"
                required
                autoComplete="email"
                placeholder="your@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="flex-1 h-12 px-6 rounded-full border text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300"
                style={{
                  borderColor: tokens.border,
                  backgroundColor: tokens.background,
                  color: tokens.foreground,
                  '--tw-ring-color': tokens.accent,
                  '--tw-ring-offset-color': tokens.backgroundAlt
                } as React.CSSProperties}
              />
              <motion.button
                type="submit"
                disabled={status === 'loading'}
                whileHover={{ backgroundColor: tokens.interactive }}
                whileTap={{ scale: 0.98 }}
                className="h-12 px-6 rounded-full font-medium text-sm disabled:opacity-60 uppercase tracking-widest"
                style={{ backgroundColor: tokens.foreground, color: tokens.accentForeground }}

          transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}>
                {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
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
    <footer className="py-16" style={{ backgroundColor: tokens.background, borderTop: `1px solid ${tokens.border}` }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <p className="font-bold text-lg mb-3" style={{ color: tokens.foreground }}>{PRODUCT_NAME}</p>
            <p className="text-sm leading-relaxed" style={{ color: tokens.mutedForeground }}>
              Building the future, one feature at a time.
            </p>
          </div>
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <p className="font-semibold text-sm mb-4" style={{ color: tokens.foreground }}>{group}</p>
              <ul className="space-y-2">
                {items.map(item => (
                  <li key={item}>
                    <a href="#" className="text-sm hover:opacity-80 transition-opacity" style={{ color: tokens.mutedForeground }}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t gap-4" style={{ borderColor: tokens.border }}>
          <p className="text-sm" style={{ color: tokens.mutedForeground }}>
            © 2026 {PRODUCT_NAME}. All rights reserved.
          </p>
          <a
            href="/"
            className="text-xs px-3 py-1 rounded-full border"
            style={{ borderColor: tokens.border, color: tokens.mutedForeground }}
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
    <div className={`${bodyFont.variable} ${headingFont.variable} font-sans relative`} style={{ backgroundColor: tokens.background }}>
      {/* Mandatory paper grain texture */}
      <div
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />
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
