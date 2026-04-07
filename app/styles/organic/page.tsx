'use client'

import { motion, useReducedMotion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
// Replace fonts with those specified in the design system:
import { Fraunces, Nunito } from 'next/font/google'
import {
  Star, ChevronDown, ArrowRight, Check, Users, Zap, Globe, Shield,
  BookOpen, Layout, Palette, Code2, BarChart, Lock
} from 'lucide-react'

// ─────────────────────────────────────────────
// FONTS — replace with style-specific fonts
// ─────────────────────────────────────────────
const headingFont = Fraunces({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
  weight: ['400', '600', '800'],
})

const bodyFont = Nunito({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

// ─────────────────────────────────────────────
// DESIGN TOKENS — replace ALL values per style
// ─────────────────────────────────────────────
const tokens = {
  background: '#FDFCF8',
  backgroundAlt: '#F0EBE5',
  foreground: '#2C2C24',
  muted: '#E6DCCD',
  mutedForeground: '#78786C',
  border: '#DED8CF',
  accent: '#5D7052',
  accentSecondary: '#C18C5D',
  accentForeground: '#F3F4F1',
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

import type { Variants } from 'framer-motion'
const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] } },
}

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────
const PRODUCT_NAME = 'EarthTone'
const TAGLINE = 'Grow your business naturally'
const DESCRIPTION = 'Cultivate sustainable growth with tools designed to work in harmony with your natural workflow. Deeply rooted in simplicity and mindful productivity.'

const NAV_LINKS = ['Features', 'Pricing', 'Testimonials', 'FAQ']

const STATS = [
  { value: '10M+', label: 'Trees Planted' },
  { value: '100%', label: 'Carbon Neutral' },
  { value: '50K+', label: 'Mindful Users' },
  { value: '4.9/5', label: 'Customer Love' },
]

const FEATURES = [
  { icon: BookOpen, title: 'Natural Workflow', description: 'Intuitive processes that feel organic and adapt to your unique rhythm.' },
  { icon: Layout, title: 'Clean Spaces', description: 'Clutter-free interfaces that help you focus on what truly matters.' },
  { icon: Palette, title: 'Earthy Themes', description: 'Colors and textures inspired by nature to reduce digital eye strain.' },
  { icon: Users, title: 'Community Roots', description: 'Connect with a thriving ecosystem of like-minded professionals.' },
  { icon: BarChart, title: 'Organic Growth', description: 'Metrics that matter, visualizing your progress beautifully and clearly.' },
  { icon: Shield, title: 'Deep Security', description: 'Solid protection rooted deeply in enterprise-grade security practices.' },
]

const PRICING = [
  {
    name: 'Seed',
    price: '$0',
    period: 'forever',
    description: 'Perfect for individuals planting their first ideas.',
    features: ['3 projects', 'Basic tools', 'Community support', 'Monthly digest'],
    cta: 'Plant a seed',
    highlighted: false,
  },
  {
    name: 'Sprout',
    price: '$19',
    period: 'per month',
    description: 'For growing teams branching out.',
    features: ['Unlimited projects', 'Advanced tools', 'Priority support', 'Custom domains', 'Collaboration'],
    cta: 'Grow with us',
    highlighted: true,
  },
  {
    name: 'Forest',
    price: '$89',
    period: 'per month',
    description: 'An entire ecosystem for large organizations.',
    features: ['Everything in Sprout', 'Unlimited users', 'Dedicated account manager', 'SLA guarantee', 'Custom integrations'],
    cta: 'Contact sales',
    highlighted: false,
  },
]

const TESTIMONIALS = [
  {
    name: 'Elena Silva',
    role: 'Creative Director',
    company: 'Studio Verde',
    text: 'EarthTone feels like a breath of fresh air. It helped our agency find our center and focus on what truly matters—the creative process.',
    rating: 5,
  },
  {
    name: 'James O\'Connor',
    role: 'Founder',
    company: 'EcoTech',
    text: 'Finally, a platform that doesn\'t scream at you. The muted tones and gentle animations make it a joy to use every single day.',
    rating: 5,
  },
  {
    name: 'Aisha Patel',
    role: 'Product Lead',
    company: 'Mindful Apps',
    text: 'We switched our entire workflow to EarthTone. The organic structure adapted perfectly to our unconventional methodology.',
    rating: 5,
  },
]

const FAQ_ITEMS = [
  { q: 'How is this different from other tools?', a: 'We prioritize calm over chaos. Our interface is deliberately designed with earthy tones, gentle curves, and thoughtful spacing to reduce cognitive load and digital fatigue.' },
  { q: 'Can I cancel my subscription?', a: 'Yes, just like seasons change, your needs might too. Cancel anytime with a single click, no questions asked.' },
  { q: 'What does "Carbon Neutral" mean for EarthTone?', a: 'We offset 100% of our servers\' energy usage by investing in verified reforestation projects around the globe. Every Sprout and Forest subscription contributes directly to planting trees.' },
  { q: 'Is there a steep learning curve?', a: 'Not at all. We believe software should feel intuitive and natural. Most users feel completely at home within their first hour of use.' },
  { q: 'How secure is my data?', a: 'As secure as a deeply rooted oak. We employ bank-level encryption, regular third-party audits, and strict access controls to keep your data safe.' },
  { q: 'Do you offer a discount for non-profits?', a: 'Yes, we love supporting organizations that make the world better. Contact our team for special non-profit and educational pricing.' },
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
        <span className="font-bold font-heading text-lg" style={{ color: tokens.foreground }}>
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
          whileHover={{ scale: 1.05, boxShadow: '0 6px 24px -4px rgba(93,112,82,0.25)' }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
          className="px-5 h-10 rounded-full text-sm font-medium"
          style={{ backgroundColor: tokens.accent, color: tokens.accentForeground }}
        >
          Get started
        </motion.button>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section className="min-h-dvh flex items-center pt-16" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-6xl mx-auto px-6 py-32 w-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.15, delayChildren: 0.1 }}
          className="max-w-3xl"
        >
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="text-sm uppercase tracking-widest mb-4"
            style={{ color: tokens.accent }}
          >
            Introducing {PRODUCT_NAME}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
            className="text-5xl md:text-7xl font-bold font-heading leading-tight mb-6"
            style={{ color: tokens.foreground }}
          >
            {TAGLINE}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="text-lg md:text-xl mb-10 max-w-2xl leading-relaxed"
            style={{ color: tokens.mutedForeground }}
          >
            {DESCRIPTION}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 6px 24px -4px rgba(93,112,82,0.25)' }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
              className="h-14 px-8 rounded-full font-medium flex items-center gap-2"
              style={{ backgroundColor: tokens.accent, color: tokens.accentForeground }}
            >
              Start for free <ArrowRight className="h-4 w-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 6px 24px -4px rgba(93,112,82,0.25)' }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
              className="h-14 px-8 rounded-full font-medium border"
              style={{ borderColor: tokens.border, color: tokens.foreground }}
            >
              View demo
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Hero Visual */}
        <FadeUp delay={0.4}>
          <div
            className="mt-16 w-full h-72 md:h-96 organic-blob-1"
            style={{ background: `linear-gradient(135deg, ${tokens.accent}20, ${tokens.accent}05)`, border: `1px solid ${tokens.border}` }}
          />
        </FadeUp>
      </div>
    </section>
  )
}

function Stats() {
  return (
    <section className="border-none" style={{ borderColor: tokens.border, backgroundColor: tokens.backgroundAlt, boxShadow: '0 4px 20px -2px rgba(93,112,82,0.15)' }}>
      <div className="max-w-6xl mx-auto px-6 py-12">
        <StaggerContainer>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map(stat => (
              <motion.div key={stat.label} variants={staggerItem} className="text-center">
                <p className="text-4xl font-bold font-heading mb-1" style={{ color: tokens.foreground }}>{stat.value}</p>
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
    <section id="features" className="py-32" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-6xl mx-auto px-6">
        <FadeUp>
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-widest mb-3" style={{ color: tokens.accent }}>Features</p>
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4" style={{ color: tokens.foreground }}>
              Everything you need
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: tokens.mutedForeground }}>
              Powerful features designed for teams that care about quality.
            </p>
          </div>
        </FadeUp>
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FEATURES.map(feature => (
              <motion.div
                key={feature.title}
                variants={staggerItem}
                whileHover={{ y: -4, rotate: 1 }}
                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                className="p-8 rounded-[2rem] border"
                style={{ borderColor: tokens.border, backgroundColor: tokens.backgroundAlt, boxShadow: '0 4px 20px -2px rgba(93,112,82,0.15)' }}
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
    <section className="py-32 border-none" style={{ borderColor: tokens.border, backgroundColor: tokens.backgroundAlt, boxShadow: '0 4px 20px -2px rgba(93,112,82,0.15)' }}>
      <div className="max-w-4xl mx-auto px-6">
        <FadeUp>
          <div className="text-center">
            <p className="text-sm uppercase tracking-widest mb-4" style={{ color: tokens.accent }}>About</p>
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-8" style={{ color: tokens.foreground }}>
              Rooted in thoughtful design
            </h2>
            <div className="space-y-6 text-left">
              <p className="text-lg leading-relaxed" style={{ color: tokens.mutedForeground }}>
                We believe that software shouldn't feel sterile or overwhelming. That's why we built EarthTone from the ground up using principles inspired by nature. Soft curves, muted colors, and gentle transitions help reduce cognitive load.
              </p>
              <p className="text-lg leading-relaxed" style={{ color: tokens.mutedForeground }}>
                Every element has been carefully considered to provide visual hierarchy without shouting for your attention. The result is an interface that feels calm, inviting, and effortlessly intuitive—letting you focus on your actual work, not the tool.
              </p>
              <p className="text-lg leading-relaxed" style={{ color: tokens.mutedForeground }}>
                By embracing organic shapes and thoughtful typography, we've created a digital environment that feels closer to holding a beautifully bound notebook than staring at a screen.
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
    <section id="pricing" className="py-32" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-6xl mx-auto px-6">
        <FadeUp>
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-widest mb-3" style={{ color: tokens.accent }}>Pricing</p>
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4" style={{ color: tokens.foreground }}>Simple, transparent pricing</h2>
            <p className="text-lg" style={{ color: tokens.mutedForeground }}>No surprises. Cancel anytime.</p>
          </div>
        </FadeUp>
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PRICING.map(tier => (
              <motion.div
                key={tier.name}
                variants={staggerItem}
                className="p-8 rounded-[2rem] border relative"
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
                <h3 className="font-bold font-heading text-xl mb-1" style={{ color: tokens.foreground }}>{tier.name}</h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl font-bold font-heading" style={{ color: tokens.foreground }}>{tier.price}</span>
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
                  whileHover={{ scale: 1.05, boxShadow: '0 6px 24px -4px rgba(93,112,82,0.25)' }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                  className="w-full h-12 rounded-full font-medium text-sm border"
                  style={tier.highlighted
                    ? { backgroundColor: tokens.accent, color: tokens.accentForeground, borderColor: tokens.accent }
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
  return (
    <section id="testimonials" className="py-32 border-none" style={{ borderColor: tokens.border, backgroundColor: tokens.backgroundAlt, boxShadow: '0 4px 20px -2px rgba(93,112,82,0.15)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <FadeUp>
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-widest mb-3" style={{ color: tokens.accent }}>Testimonials</p>
            <h2 className="text-4xl md:text-5xl font-bold font-heading" style={{ color: tokens.foreground }}>Loved by teams worldwide</h2>
          </div>
        </FadeUp>
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map(t => (
              <motion.div
                key={t.name}
                variants={staggerItem}
                className="p-8 rounded-[2rem] border"
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
    <section id="faq" className="py-32" style={{ backgroundColor: tokens.background }}>
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
              <div className="border rounded-[2rem] overflow-hidden" style={{ borderColor: tokens.border }}>
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  aria-expanded={openIndex === i}
                  className="w-full flex items-center justify-between p-6 text-left"
                  style={{ backgroundColor: tokens.backgroundAlt }}
                >
                  <span className="font-medium" style={{ color: tokens.foreground }}>{item.q}</span>
                  <motion.span
                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                  >
                    <ChevronDown className="h-4 w-4 flex-shrink-0" style={{ color: tokens.mutedForeground }} />
                  </motion.span>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openIndex === i ? 'auto' : 0, opacity: openIndex === i ? 1 : 0 }}
                  transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
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
    <section className="py-32 border-none" style={{ borderColor: tokens.border, backgroundColor: tokens.backgroundAlt, boxShadow: '0 4px 20px -2px rgba(93,112,82,0.15)' }}>
      <div className="max-w-2xl mx-auto px-6 text-center">
        <FadeUp>
          <h2 className="text-4xl font-bold font-heading mb-4" style={{ color: tokens.foreground }}>Stay in the loop</h2>
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
                className="flex-1 h-12 px-4 rounded-full border text-sm"
                style={{ borderColor: tokens.border, backgroundColor: tokens.background, color: tokens.foreground }}
              />
              <motion.button
                type="submit"
                disabled={status === 'loading'}
                whileHover={{ scale: 1.05, boxShadow: '0 6px 24px -4px rgba(93,112,82,0.25)' }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                className="h-12 px-6 rounded-full font-medium text-sm disabled:opacity-60"
                style={{ backgroundColor: tokens.accent, color: tokens.accentForeground }}
              >
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
            <p className="font-bold font-heading text-lg mb-3" style={{ color: tokens.foreground }}>{PRODUCT_NAME}</p>
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
    <div className={`${bodyFont.variable} ${headingFont.variable} font-sans`} style={{ backgroundColor: tokens.background }}>

<style dangerouslySetInnerHTML={{__html: `
  .noise-overlay {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    pointer-events: none;
    z-index: 50;
    opacity: 0.04;
    mix-blend-mode: multiply;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  }
  .organic-blob-1 { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
  .organic-blob-2 { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
  .organic-blob-3 { border-radius: 50% 50% 30% 70% / 50% 40% 60% 50%; }
  .organic-blob-4 { border-radius: 40% 60% 70% 30% / 40% 50% 50% 60%; }
`}} />
<div className="noise-overlay" />

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
