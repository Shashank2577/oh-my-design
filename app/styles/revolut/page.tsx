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
import { Inter, Space_Grotesk } from 'next/font/google'
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

// We'll use Space Grotesk as a geometric grotesque substitute for Aeonik Pro
const displayFont = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

// ─────────────────────────────────────────────
// DESIGN TOKENS — replace ALL values per style
// ─────────────────────────────────────────────
const tokens = {
  background: '#ffffff', // Pure white
  backgroundAlt: '#f4f4f4', // Light Surface
  foreground: '#191c1f', // Revolut Dark
  muted: '#f4f4f4',
  mutedForeground: '#505a63', // Mid Slate
  border: '#c9c9cd', // Gray Tone 20
  accent: '#191c1f', // Primary Dark
  accentForeground: '#ffffff',
  brandBlue: '#494fdf',
  danger: '#e23b4a',
  success: '#00a87e',
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
const PRODUCT_NAME = 'Revolut'
const TAGLINE = 'One app, all things money'
const DESCRIPTION = 'From easy money management, to travel perks and investments. Open your account in a flash.'

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
      className="fixed top-0 left-0 right-0 z-50 bg-white"
    >
      <div className="max-w-[1280px] mx-auto px-6 h-20 flex items-center justify-between">
        <span className={`font-medium text-[20px] ${displayFont.variable} font-display`} style={{ color: tokens.foreground }}>
          {PRODUCT_NAME}
        </span>
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className={`text-[16px] font-semibold transition-opacity hover:opacity-70 ${bodyFont.variable} font-body tracking-[0.16px]`}
              style={{ color: tokens.foreground }}
            >
              {link}
            </a>
          ))}
        </div>
        <div className="flex gap-4">
          <motion.button
            whileHover={{ opacity: 0.85 }}
            className={`hidden md:block px-[32px] h-[48px] rounded-full text-[16px] font-medium ${displayFont.variable} font-display`}
            style={{ backgroundColor: tokens.backgroundAlt, color: tokens.foreground }}
          >
            Log in
          </motion.button>
          <motion.button
            whileHover={{ opacity: 0.85 }}
            className={`px-[32px] h-[48px] rounded-full text-[16px] font-medium ${displayFont.variable} font-display`}
            style={{ backgroundColor: tokens.foreground, color: tokens.background }}
          >
            Sign up
          </motion.button>
        </div>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section className="min-h-dvh flex items-center justify-center pt-20" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-[1280px] mx-auto px-6 py-24 w-full flex flex-col items-center text-center">
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
            className={`text-[64px] md:text-[80px] lg:text-[136px] font-medium leading-[1.00] tracking-[-2.72px] mb-8 ${displayFont.variable} font-display`}
            style={{ color: tokens.foreground }}
          >
            {TAGLINE}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`text-[18px] md:text-[24px] mb-12 max-w-2xl leading-[1.5] ${bodyFont.variable} font-body tracking-[0.16px]`}
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
              whileHover={{ opacity: 0.85 }}
              className={`h-[48px] px-[32px] rounded-full font-medium text-[16px] ${displayFont.variable} font-display`}
              style={{ backgroundColor: tokens.foreground, color: tokens.background }}
            >
              Get a free account
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function Stats() {
  return (
    <section className="" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-[1280px] mx-auto px-6 py-20">
        <StaggerContainer>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map(stat => (
              <motion.div key={stat.label} variants={staggerItem} className="text-center">
                <p className={`text-[40px] md:text-[48px] font-medium leading-[1.21] tracking-[-0.48px] mb-2 ${displayFont.variable} font-display`} style={{ color: tokens.foreground }}>{stat.value}</p>
                <p className={`text-[16px] tracking-[0.24px] ${bodyFont.variable} font-body`} style={{ color: tokens.mutedForeground }}>{stat.label}</p>
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
      <div className="max-w-[1280px] mx-auto px-6">
        <FadeUp>
          <div className="text-center mb-16">
            <h2 className={`text-[40px] md:text-[48px] font-medium leading-[1.21] tracking-[-0.48px] mb-6 ${displayFont.variable} font-display`} style={{ color: tokens.foreground }}>
              Do more with your money
            </h2>
          </div>
        </FadeUp>
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FEATURES.map(feature => (
              <motion.div
                key={feature.title}
                variants={staggerItem}
                className="p-8 rounded-[20px]"
                style={{ backgroundColor: tokens.backgroundAlt }}
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-6 bg-white">
                  <feature.icon className="h-6 w-6" style={{ color: tokens.brandBlue }} strokeWidth={2} />
                </div>
                <h3 className={`font-medium text-[24px] leading-[1.33] mb-3 ${displayFont.variable} font-display`} style={{ color: tokens.foreground }}>{feature.title}</h3>
                <p className={`text-[16px] leading-[1.5] tracking-[0.24px] ${bodyFont.variable} font-body`} style={{ color: tokens.mutedForeground }}>{feature.description}</p>
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
    <section className="py-24" style={{ backgroundColor: tokens.foreground }}>
      <div className="max-w-[1280px] mx-auto px-6">
        <FadeUp>
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1 space-y-8">
              <h2 className={`text-[40px] md:text-[48px] font-medium leading-[1.21] tracking-[-0.48px] ${displayFont.variable} font-display`} style={{ color: tokens.background }}>
                Security that's built-in
              </h2>
              <div className="space-y-6">
                <p className={`text-[18px] leading-[1.56] tracking-[-0.09px] ${bodyFont.variable} font-body`} style={{ color: '#8d969e' }}>
                  Our award-winning security systems are designed to keep your money safe. We monitor your account 24/7 to spot fraudulent activity.
                </p>
                <ul className="space-y-4">
                  {['End-to-end security', 'Instant card freezing', 'Disposable virtual cards'].map(item => (
                    <li key={item} className={`flex items-center gap-3 text-[16px] tracking-[0.24px] ${bodyFont.variable} font-body`} style={{ color: tokens.background }}>
                      <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: tokens.success }}>
                        <Check className="h-4 w-4 text-white" strokeWidth={3} />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex-1 w-full">
              <div className="w-full aspect-[4/3] rounded-[20px] bg-[#191c1f] flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#494fdf] to-[#e61e49] opacity-20"></div>
                <Shield className="w-32 h-32 text-white relative z-10" strokeWidth={1} />
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
    <section id="pricing" className="py-24" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-[1280px] mx-auto px-6">
        <FadeUp>
          <div className="text-center mb-16">
            <h2 className={`text-[40px] md:text-[48px] font-medium leading-[1.21] tracking-[-0.48px] mb-4 ${displayFont.variable} font-display`} style={{ color: tokens.foreground }}>Plans for everyone</h2>
            <p className={`text-[16px] tracking-[0.24px] ${bodyFont.variable} font-body`} style={{ color: tokens.mutedForeground }}>Choose the plan that suits you best.</p>
          </div>
        </FadeUp>
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRICING.map(tier => (
              <motion.div
                key={tier.name}
                variants={staggerItem}
                className="p-8 rounded-[20px] relative flex flex-col"
                style={{
                  backgroundColor: tier.highlighted ? '#191c1f' : tokens.backgroundAlt,
                }}
              >
                {tier.highlighted && (
                  <span
                    className={`absolute top-6 right-6 px-[12px] py-[6px] text-[14px] font-medium rounded-full ${displayFont.variable} font-display`}
                    style={{ backgroundColor: tokens.brandBlue, color: '#ffffff' }}
                  >
                    Popular
                  </span>
                )}
                <h3 className={`font-medium text-[32px] leading-[1.19] tracking-[-0.32px] mb-4 ${displayFont.variable} font-display`} style={{ color: tier.highlighted ? '#ffffff' : tokens.foreground }}>{tier.name}</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className={`text-[40px] md:text-[48px] font-medium leading-[1.21] tracking-[-0.48px] ${displayFont.variable} font-display`} style={{ color: tier.highlighted ? '#ffffff' : tokens.foreground }}>{tier.price}</span>
                  <span className={`text-[16px] tracking-[0.24px] ${bodyFont.variable} font-body`} style={{ color: tier.highlighted ? '#8d969e' : tokens.mutedForeground }}>/ {tier.period}</span>
                </div>
                <p className={`text-[16px] mb-8 tracking-[0.24px] leading-[1.5] ${bodyFont.variable} font-body`} style={{ color: tier.highlighted ? '#8d969e' : tokens.mutedForeground }}>{tier.description}</p>
                <ul className="space-y-4 mb-10 flex-1">
                  {tier.features.map(f => (
                    <li key={f} className={`flex items-center gap-3 text-[16px] tracking-[0.24px] ${bodyFont.variable} font-body`}>
                      <Check className="h-5 w-5 flex-shrink-0" style={{ color: tier.highlighted ? '#ffffff' : tokens.foreground }} />
                      <span style={{ color: tier.highlighted ? '#ffffff' : tokens.foreground }}>{f}</span>
                    </li>
                  ))}
                </ul>
                <motion.button
                  whileHover={{ opacity: 0.85 }}
                  className={`w-full h-[48px] rounded-full font-medium text-[16px] border-[2px] ${displayFont.variable} font-display`}
                  style={tier.highlighted
                    ? { backgroundColor: '#ffffff', color: '#191c1f', borderColor: '#ffffff' }
                    : { backgroundColor: 'transparent', color: tokens.foreground, borderColor: tokens.foreground }
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
    <section id="testimonials" className="py-24" style={{ backgroundColor: tokens.backgroundAlt }}>
      <div className="max-w-[1280px] mx-auto px-6">
        <FadeUp>
          <div className="text-center mb-16">
            <h2 className={`text-[40px] md:text-[48px] font-medium leading-[1.21] tracking-[-0.48px] ${displayFont.variable} font-display`} style={{ color: tokens.foreground }}>What our customers say</h2>
          </div>
        </FadeUp>
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map(t => (
              <motion.div
                key={t.name}
                variants={staggerItem}
                className="p-8 rounded-[20px]"
                style={{ backgroundColor: tokens.background }}
              >
                <div className="flex mb-6">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" style={{ color: tokens.foreground }} />
                  ))}
                </div>
                <p className={`text-[18px] leading-[1.56] tracking-[-0.09px] mb-8 ${bodyFont.variable} font-body`} style={{ color: tokens.foreground }}>"{t.text}"</p>
                <div>
                  <p className={`font-semibold text-[16px] tracking-[0.16px] ${bodyFont.variable} font-body`} style={{ color: tokens.foreground }}>{t.name}</p>
                  <p className={`text-[16px] tracking-[0.24px] ${bodyFont.variable} font-body`} style={{ color: tokens.mutedForeground }}>{t.role} · {t.company}</p>
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
      <div className="max-w-[800px] mx-auto px-6">
        <FadeUp>
          <div className="text-center mb-16">
            <h2 className={`text-[40px] md:text-[48px] font-medium leading-[1.21] tracking-[-0.48px] ${displayFont.variable} font-display`} style={{ color: tokens.foreground }}>Got questions?</h2>
          </div>
        </FadeUp>
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, i) => (
            <FadeUp key={i} delay={i * 0.05}>
              <div className="rounded-[20px] overflow-hidden" style={{ backgroundColor: tokens.backgroundAlt }}>
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  aria-expanded={openIndex === i}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className={`font-medium text-[20px] leading-[1.4] ${displayFont.variable} font-display`} style={{ color: tokens.foreground }}>{item.q}</span>
                  <motion.span
                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="h-6 w-6 flex-shrink-0" style={{ color: tokens.foreground }} />
                  </motion.span>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openIndex === i ? 'auto' : 0, opacity: openIndex === i ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  style={{ overflow: 'hidden' }}
                >
                  <p className={`px-6 pb-6 text-[16px] leading-[1.5] tracking-[0.24px] ${bodyFont.variable} font-body`} style={{ color: tokens.mutedForeground }}>
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
    <section className="py-24" style={{ backgroundColor: tokens.backgroundAlt }}>
      <div className="max-w-[1280px] mx-auto px-6 text-center">
        <FadeUp>
          <h2 className={`text-[40px] md:text-[48px] font-medium leading-[1.21] tracking-[-0.48px] mb-4 ${displayFont.variable} font-display`} style={{ color: tokens.foreground }}>Stay updated</h2>
          <p className={`text-[18px] leading-[1.56] tracking-[-0.09px] mb-10 max-w-2xl mx-auto ${bodyFont.variable} font-body`} style={{ color: tokens.mutedForeground }}>
            Get the latest news and updates directly to your inbox.
          </p>
          {status === 'success' ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: tokens.success }}>
                <Check className="w-5 h-5 text-white" />
              </div>
              <p className={`font-semibold text-[18px] ${bodyFont.variable} font-body`} style={{ color: tokens.foreground }}>You're all set!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <label htmlFor="newsletter-email" className="sr-only">Email address</label>
              <input
                id="newsletter-email"
                type="email"
                required
                autoComplete="email"
                placeholder="Enter your email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className={`flex-1 h-[56px] px-6 rounded-full text-[16px] focus:outline-none focus:ring-2 ${bodyFont.variable} font-body`}
                style={{
                  backgroundColor: tokens.background,
                  color: tokens.foreground,
                  boxShadow: `0 0 0 0.125rem transparent`
                }}
              />
              <motion.button
                type="submit"
                disabled={status === 'loading'}
                whileHover={{ opacity: 0.85 }}
                className={`h-[56px] px-[32px] rounded-full font-medium text-[16px] disabled:opacity-60 ${displayFont.variable} font-display`}
                style={{ backgroundColor: tokens.foreground, color: tokens.background }}
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
    <footer className="py-20" style={{ backgroundColor: tokens.foreground }}>
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-16">
          <div className="col-span-2 md:col-span-1">
            <p className={`font-medium text-[24px] mb-4 ${displayFont.variable} font-display`} style={{ color: tokens.background }}>{PRODUCT_NAME}</p>
            <p className={`text-[16px] leading-[1.5] tracking-[0.24px] ${bodyFont.variable} font-body`} style={{ color: '#8d969e' }}>
              Building the future of finance, one feature at a time.
            </p>
          </div>
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <p className={`font-medium text-[16px] mb-6 tracking-[0.24px] ${bodyFont.variable} font-body`} style={{ color: tokens.background }}>{group}</p>
              <ul className="space-y-4">
                {items.map(item => (
                  <li key={item}>
                    <a href="#" className={`text-[16px] tracking-[0.24px] hover:text-white transition-colors ${bodyFont.variable} font-body`} style={{ color: '#8d969e' }}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t gap-6" style={{ borderColor: '#505a63' }}>
          <p className={`text-[16px] tracking-[0.24px] ${bodyFont.variable} font-body`} style={{ color: '#8d969e' }}>
            © 2026 {PRODUCT_NAME}. All rights reserved.
          </p>
          <a
            href="/"
            className={`text-[14px] px-[16px] py-[8px] rounded-full border transition-colors ${bodyFont.variable} font-body`}
            style={{ borderColor: '#505a63', color: '#8d969e' }}
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
