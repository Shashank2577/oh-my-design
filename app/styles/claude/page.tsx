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
import { Inter, Source_Serif_4, Saira } from 'next/font/google'
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

const displayFont = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

// ─────────────────────────────────────────────
// DESIGN TOKENS — replace ALL values per style
// ─────────────────────────────────────────────
const tokens = {
  background: '#f5f4ed', // Parchment
  backgroundAlt: '#faf9f5', // Ivory
  foreground: '#141413', // Near Black
  muted: '#e8e6dc', // Warm Sand / Border Warm
  mutedForeground: '#5e5d59', // Olive Gray
  border: '#f0eee6', // Border Cream
  accent: '#c96442', // Terracotta Brand
  accentForeground: '#faf9f5', // Ivory
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
const PRODUCT_NAME = 'Claude'
const TAGLINE = 'Meet Claude'
const DESCRIPTION = 'Claude is a next generation AI assistant built for work and trained to be safe, accurate, and secure.'

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
        <span className="font-serif font-medium text-xl" style={{ color: tokens.foreground }}>
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
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-5 h-10 rounded-[12px] text-sm font-medium"
          style={{ backgroundColor: tokens.accent, color: tokens.accentForeground }}
        >
          Try Claude
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
            className="text-[40px] md:text-[64px] font-serif font-medium leading-[1.10] mb-6 tracking-tight"
            style={{ color: tokens.foreground }}
          >
            {TAGLINE}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[20px] mb-10 max-w-2xl leading-[1.60]"
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
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="h-[48px] px-6 rounded-[12px] font-medium flex items-center justify-center gap-2"
              style={{ backgroundColor: tokens.accent, color: tokens.accentForeground }}
            >
              Talk to Claude <ArrowRight className="h-4 w-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="h-[48px] px-6 rounded-[12px] font-medium flex items-center justify-center"
              style={{ backgroundColor: tokens.backgroundAlt, color: tokens.foreground, boxShadow: '0 0 0 1px #e8e6dc' }}
            >
              Learn about Claude
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Hero Visual — replace with style-specific imagery */}
        <FadeUp delay={0.4}>
          <div
            className="mt-16 w-full h-72 md:h-[500px] rounded-[32px] overflow-hidden"
            style={{ background: `linear-gradient(135deg, ${tokens.muted}, ${tokens.background})`, border: `1px solid ${tokens.border}`, boxShadow: 'rgba(0,0,0,0.05) 0px 4px 24px' }}
          />
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
            <h2 className="text-[32px] md:text-[52px] font-serif font-medium mb-4 leading-[1.10]" style={{ color: tokens.foreground }}>
              Built for performance
            </h2>
            <p className="text-[20px] max-w-2xl mx-auto leading-[1.60]" style={{ color: tokens.mutedForeground }}>
              Claude is trained to be helpful, honest, and harmless. It's designed to be a reliable partner for your most complex tasks.
            </p>
          </div>
        </FadeUp>
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FEATURES.map(feature => (
              <motion.div
                key={feature.title}
                variants={staggerItem}
                className="p-8 rounded-[12px] bg-[#faf9f5]"
                style={{ boxShadow: '0 0 0 1px #f0eee6' }}
              >
                <feature.icon className="h-6 w-6 mb-4" style={{ color: '#87867f' }} strokeWidth={1.5} />
                <h3 className="font-serif font-medium text-[25px] mb-2 leading-[1.20]" style={{ color: tokens.foreground }}>{feature.title}</h3>
                <p className="text-[16px] leading-[1.60]" style={{ color: tokens.mutedForeground }}>{feature.description}</p>
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
    <section className="py-32 border-y" style={{ borderColor: '#30302e', backgroundColor: '#141413' }}>
      <div className="max-w-4xl mx-auto px-6">
        <FadeUp>
          <div className="text-center">
            <h2 className="text-[36px] md:text-[52px] font-serif font-medium mb-8 leading-[1.10] tracking-tight" style={{ color: '#faf9f5' }}>
              Intelligence that works for you
            </h2>
            <div className="space-y-6 text-left">
              <p className="text-[20px] leading-[1.60]" style={{ color: '#b0aea5' }}>
                Claude represents a major advance in AI capabilities. It can process vast amounts of information, generate complex code, and analyze detailed documents with remarkable speed and accuracy.
              </p>
              <p className="text-[20px] leading-[1.60]" style={{ color: '#b0aea5' }}>
                But intelligence isn't just about raw power. It's about being a dependable partner. Claude is designed with constitutional AI principles to be safe, honest, and reliable for your most important workflows.
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
            <h2 className="text-[32px] md:text-[52px] font-serif font-medium mb-4 leading-[1.10]" style={{ color: tokens.foreground }}>The Claude family</h2>
            <p className="text-[20px] leading-[1.60]" style={{ color: tokens.mutedForeground }}>A model for every use case.</p>
          </div>
        </FadeUp>
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-b" style={{ borderColor: tokens.border }}>
            {PRICING.map((tier, idx) => (
              <motion.div
                key={tier.name}
                variants={staggerItem}
                className={`p-10 relative ${idx !== PRICING.length - 1 ? 'border-b md:border-b-0 md:border-r' : ''}`}
                style={{ borderColor: tokens.border }}
              >
                <h3 className="font-serif font-medium text-[25px] mb-2 leading-[1.20]" style={{ color: tokens.foreground }}>{tier.name}</h3>
                <p className="text-[16px] leading-[1.60] mb-8" style={{ color: tokens.mutedForeground }}>{tier.description}</p>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-[20px] font-medium" style={{ color: tokens.foreground }}>{tier.price}</span>
                  <span className="text-sm" style={{ color: tokens.mutedForeground }}>/ {tier.period}</span>
                </div>
                <ul className="space-y-4 mb-10">
                  {tier.features.map(f => (
                    <li key={f} className="flex items-start gap-3 text-[16px] leading-[1.60]">
                      <Check className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: '#87867f' }} />
                      <span style={{ color: tokens.foreground }}>{f}</span>
                    </li>
                  ))}
                </ul>
                <motion.button
                  whileHover={{ backgroundColor: '#e8e6dc' }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full h-[40px] rounded-[8px] font-medium text-[15px] transition-colors"
                  style={{ backgroundColor: 'transparent', color: '#141413', boxShadow: '0 0 0 1px #d1cfc5' }}
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
    <section id="testimonials" className="py-24 border-y" style={{ borderColor: tokens.border, backgroundColor: tokens.backgroundAlt }}>
      <div className="max-w-6xl mx-auto px-6">
        <FadeUp>
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-widest mb-3" style={{ color: tokens.accent }}>Testimonials</p>
            <h2 className="text-[32px] md:text-[52px] font-serif font-medium" style={{ color: tokens.foreground }}>Trusted by forward-thinking companies</h2>
          </div>
        </FadeUp>
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map(t => (
              <motion.div
                key={t.name}
                variants={staggerItem}
                className="p-10 rounded-[12px] bg-[#faf9f5]"
                style={{ boxShadow: '0 0 0 1px #f0eee6' }}
              >
                <p className="text-[20px] leading-[1.60] mb-8 font-serif" style={{ color: tokens.foreground }}>"{t.text}"</p>
                <div>
                  <p className="font-medium text-[16px]" style={{ color: tokens.foreground }}>{t.name}</p>
                  <p className="text-[14px]" style={{ color: '#87867f' }}>{t.role}, {t.company}</p>
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
            <h2 className="text-[32px] md:text-[52px] font-serif font-medium" style={{ color: tokens.foreground }}>Frequently asked questions</h2>
          </div>
        </FadeUp>
        <div className="space-y-0 border-t" style={{ borderColor: tokens.border }}>
          {FAQ_ITEMS.map((item, i) => (
            <div key={i} className="border-b" style={{ borderColor: tokens.border }}>
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
                className="w-full flex items-center justify-between py-6 text-left"
                style={{ backgroundColor: 'transparent' }}
              >
                <span className="font-medium text-[18px]" style={{ color: tokens.foreground }}>{item.q}</span>
                <motion.span
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="h-5 w-5 flex-shrink-0" style={{ color: '#87867f' }} />
                </motion.span>
              </button>
              <motion.div
                initial={false}
                animate={{ height: openIndex === i ? 'auto' : 0, opacity: openIndex === i ? 1 : 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' as const }}
                style={{ overflow: 'hidden' }}
              >
                <p className="pb-8 text-[16px] leading-[1.60]" style={{ color: tokens.mutedForeground }}>
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
    <section className="py-24 border-y" style={{ borderColor: tokens.border, backgroundColor: tokens.backgroundAlt }}>
      <div className="max-w-2xl mx-auto px-6 text-center">
        <FadeUp>
          <h2 className="text-[32px] md:text-[52px] font-serif font-medium mb-4 leading-[1.10]" style={{ color: tokens.foreground }}>Stay updated</h2>
          <p className="text-[20px] mb-10 leading-[1.60]" style={{ color: tokens.mutedForeground }}>
            Get the latest news about Claude and Anthropic.
          </p>
          {status === 'success' ? (
            <p className="font-medium text-[16px]" style={{ color: tokens.accent }}>✓ You're subscribed to our newsletter.</p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <label htmlFor="newsletter-email" className="sr-only">Email address</label>
              <input
                id="newsletter-email"
                type="email"
                required
                autoComplete="email"
                placeholder="Email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="flex-1 h-[48px] px-4 rounded-[12px] text-[16px]"
                style={{ boxShadow: '0 0 0 1px #e8e6dc', backgroundColor: tokens.backgroundAlt, color: tokens.foreground }}
              />
              <motion.button
                type="submit"
                disabled={status === 'loading'}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="h-[48px] px-6 rounded-[12px] font-medium text-[16px] disabled:opacity-60"
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
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-16">
          <div className="col-span-2 md:col-span-1">
            <p className="font-serif font-medium text-[20px] mb-3" style={{ color: tokens.foreground }}>{PRODUCT_NAME}</p>
            <p className="text-[14px] leading-[1.60]" style={{ color: tokens.mutedForeground }}>
              AI research and products that put safety at the frontier.
            </p>
          </div>
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <p className="font-medium text-[14px] mb-6" style={{ color: tokens.foreground }}>{group}</p>
              <ul className="space-y-4">
                {items.map(item => (
                  <li key={item}>
                    <a href="#" className="text-[14px] hover:text-[#141413] transition-colors" style={{ color: tokens.mutedForeground }}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t gap-4" style={{ borderColor: tokens.border }}>
          <p className="text-[14px]" style={{ color: tokens.mutedForeground }}>
            © 2025 Anthropic PBC
          </p>
          <a
            href="/"
            className="text-[14px] px-4 py-2 rounded-[8px]"
            style={{ boxShadow: '0 0 0 1px #e8e6dc', color: tokens.mutedForeground }}
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
    <div className={`${bodyFont.variable} ${displayFont.variable} font-sans`} style={{ backgroundColor: tokens.background }}>
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
