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

const displayFont = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

// ─────────────────────────────────────────────
// DESIGN TOKENS — replace ALL values per style
// ─────────────────────────────────────────────
const tokens = {
  background: '#ffffff', // Pure White
  backgroundAlt: '#0a0b0d', // Near Black (Dark Sections)
  foreground: '#0a0b0d', // Near Black text
  foregroundAlt: '#ffffff', // White text on dark
  muted: '#eef0f3', // Cool Gray Surface
  mutedForeground: '#5b616e', // Muted text
  border: 'rgba(91,97,110,0.2)', // Border color
  accent: '#0052ff', // Coinbase Blue
  accentHover: '#578bfa', // Hover Blue
  accentForeground: '#ffffff',
}

// ─────────────────────────────────────────────
// MOTION HELPERS
// ─────────────────────────────────────────────
function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-5% 0px' })
  const shouldReduce = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      initial={shouldReduce ? false : { opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
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
const PRODUCT_NAME = 'Coinbase'
const TAGLINE = 'The future of money is here'
const DESCRIPTION = 'We\'re the most trusted place for people and businesses to buy, sell, and manage crypto.'

const NAV_LINKS = ['Explore', 'Learn', 'Individuals', 'Businesses', 'Developers', 'Company']

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
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        <span className="font-bold text-xl tracking-tight" style={{ color: tokens.accent }}>
          {PRODUCT_NAME}
        </span>
        <div className="hidden lg:flex items-center gap-6">
          {NAV_LINKS.map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-[14px] font-semibold transition-colors"
              style={{ color: tokens.foreground }}
              onMouseOver={(e) => { e.currentTarget.style.color = tokens.accent }}
              onMouseOut={(e) => { e.currentTarget.style.color = tokens.foreground }}
            >
              {link}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <a href="#" className="hidden md:block text-[14px] font-semibold" style={{ color: tokens.foreground }}>Sign in</a>
          <motion.button
            whileHover={{ backgroundColor: tokens.accentHover }}
            whileTap={{ scale: 0.98 }}
            className="px-4 h-10 rounded-[56px] text-[14px] font-semibold transition-colors"
            style={{ backgroundColor: tokens.accent, color: tokens.accentForeground }}
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
    <section className="min-h-[90vh] flex items-center pt-20" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-20 w-full flex flex-col md:flex-row items-center gap-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.15, delayChildren: 0.1 }}
          className="flex-1 max-w-2xl"
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 mb-8 font-semibold text-[16px]"
            style={{ color: tokens.accent }}
          >
            <Zap className="h-5 w-5 fill-current" />
            <span className="uppercase tracking-widest text-[13px]">Jump start your crypto portfolio</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-[52px] md:text-[80px] font-medium leading-[1.00] mb-6 tracking-tight font-display"
            style={{ color: tokens.foreground }}
          >
            {TAGLINE}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[20px] font-medium mb-10 max-w-xl leading-[1.40]"
            style={{ color: tokens.foreground }}
          >
            {DESCRIPTION}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.form className="flex-1 max-w-sm flex">
              <input
                type="email"
                placeholder="Email address"
                className="w-full h-14 px-4 rounded-l-lg border-y border-l text-[16px] focus:outline-none focus:border-black"
                style={{ borderColor: tokens.border, color: tokens.foreground }}
              />
              <motion.button
                whileHover={{ backgroundColor: tokens.accentHover }}
                whileTap={{ scale: 0.98 }}
                className="h-14 px-8 rounded-r-lg font-semibold flex items-center transition-colors text-[16px]"
                style={{ backgroundColor: tokens.accent, color: tokens.accentForeground }}
              >
                Sign up
              </motion.button>
            </motion.form>
          </motion.div>
        </motion.div>

        {/* Hero Visual */}
        <FadeUp delay={0.4} className="flex-1 w-full">
          <div
            className="w-full aspect-square md:aspect-auto md:h-[600px] rounded-[32px] overflow-hidden"
            style={{ backgroundColor: tokens.muted, border: `1px solid ${tokens.border}` }}
          >
             {/* Abstract crypto phone illustration */}
             <div className="w-full h-full flex items-center justify-center relative">
                <div className="w-[280px] h-[580px] bg-white rounded-[40px] shadow-2xl border-[8px] border-black p-4 flex flex-col relative z-10">
                   <div className="w-full flex justify-between items-center mb-8">
                     <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                     <div className="w-24 h-6 rounded-full bg-gray-100"></div>
                     <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                   </div>
                   <div className="text-center mb-8">
                     <p className="text-gray-500 text-sm font-semibold mb-1">Portfolio balance</p>
                     <p className="text-4xl font-bold font-display">$12,450.00</p>
                   </div>
                   <div className="space-y-4 flex-1">
                     {[...Array(4)].map((_, i) => (
                       <div key={i} className="w-full h-16 bg-gray-50 rounded-xl flex items-center p-3 gap-3">
                         <div className={`w-10 h-10 rounded-full ${i===0 ? 'bg-[#0052ff]' : i===1 ? 'bg-orange-500' : 'bg-gray-300'}`}></div>
                         <div className="flex-1">
                           <div className="w-20 h-4 bg-gray-200 rounded mb-1"></div>
                           <div className="w-12 h-3 bg-gray-100 rounded"></div>
                         </div>
                         <div className="w-16 h-8 bg-gray-100 rounded"></div>
                       </div>
                     ))}
                   </div>
                </div>
                <div className="absolute top-1/4 -left-12 w-32 h-32 rounded-full bg-[#f7931a] shadow-xl flex items-center justify-center text-white text-5xl font-bold transform -rotate-12 z-20">₿</div>
                <div className="absolute bottom-1/4 -right-8 w-24 h-24 rounded-full bg-[#627eea] shadow-xl flex items-center justify-center text-white text-4xl font-bold transform rotate-12 z-20">⬨</div>
             </div>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

function Stats() {
  return (
    <section className="py-20 border-y" style={{ borderColor: tokens.border, backgroundColor: tokens.background }}>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
        <StaggerContainer>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat, i) => (
              <motion.div key={stat.label} variants={staggerItem} className="text-center">
                <p className="text-[36px] md:text-[48px] font-medium leading-[1.0] mb-2 font-display" style={{ color: tokens.foreground }}>{stat.value}</p>
                <p className="text-[16px] font-semibold" style={{ color: tokens.mutedForeground }}>{stat.label}</p>
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
    <section id="features" className="py-24 md:py-32" style={{ backgroundColor: tokens.backgroundAlt }}>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
        <FadeUp>
          <div className="text-center mb-20">
            <h2 className="text-[40px] md:text-[52px] font-medium mb-6 leading-[1.0] font-display" style={{ color: tokens.foregroundAlt }}>
              Create your cryptocurrency portfolio today
            </h2>
            <p className="text-[18px] font-medium max-w-2xl mx-auto" style={{ color: tokens.mutedForeground }}>
              Coinbase has a variety of features that make it the best place to start trading
            </p>
          </div>
        </FadeUp>
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {FEATURES.slice(0, 3).map(feature => (
              <motion.div
                key={feature.title}
                variants={staggerItem}
                className="text-center md:text-left flex flex-col items-center md:items-start"
              >
                <div className="w-16 h-16 rounded-full bg-[#111] border flex items-center justify-center mb-6" style={{ borderColor: tokens.border }}>
                  <feature.icon className="h-8 w-8" style={{ color: tokens.accent }} strokeWidth={2} />
                </div>
                <h3 className="font-semibold text-[20px] mb-4" style={{ color: tokens.foregroundAlt }}>{feature.title}</h3>
                <p className="text-[16px] leading-[1.50]" style={{ color: tokens.mutedForeground }}>{feature.description}</p>
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
    <section className="py-24 md:py-32" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <FadeUp>
            <div className="max-w-xl">
              <h2 className="text-[40px] md:text-[52px] font-medium leading-[1.0] mb-8 font-display" style={{ color: tokens.foreground }}>
                The most trusted cryptocurrency platform
              </h2>
              <div className="space-y-8">
                <div>
                  <h3 className="text-[20px] font-semibold mb-2" style={{ color: tokens.foreground }}>Secure storage</h3>
                  <p className="text-[16px] leading-[1.50]" style={{ color: tokens.mutedForeground }}>
                    We store the vast majority of the digital assets in secure offline storage.
                  </p>
                </div>
                <div>
                  <h3 className="text-[20px] font-semibold mb-2" style={{ color: tokens.foreground }}>Protected by insurance</h3>
                  <p className="text-[16px] leading-[1.50]" style={{ color: tokens.mutedForeground }}>
                    Coinbase maintains crypto insurance and all USD cash balances are covered by FDIC insurance, up to a maximum of $250,000.
                  </p>
                </div>
                <div>
                  <h3 className="text-[20px] font-semibold mb-2" style={{ color: tokens.foreground }}>Industry best practices</h3>
                  <p className="text-[16px] leading-[1.50]" style={{ color: tokens.mutedForeground }}>
                    Coinbase supports a variety of the most popular digital currencies.
                  </p>
                </div>
                <motion.button
                  whileHover={{ backgroundColor: '#0667d0' }}
                  className="font-semibold text-[16px] transition-colors"
                  style={{ color: tokens.accent }}
                >
                  Learn how your funds are protected →
                </motion.button>
              </div>
            </div>
          </FadeUp>
          <FadeUp delay={0.2}>
            <div className="w-full aspect-square md:aspect-[4/3] rounded-[24px] overflow-hidden" style={{ backgroundColor: tokens.muted }}>
              {/* Vault graphic placeholder */}
              <div className="w-full h-full flex items-center justify-center bg-[#f5f7f9]">
                <Shield className="w-48 h-48" style={{ color: tokens.accent }} strokeWidth={1} />
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
    <section id="pricing" className="py-24 md:py-32" style={{ backgroundColor: tokens.backgroundAlt }}>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
        <FadeUp>
          <div className="text-center mb-16">
            <h2 className="text-[40px] md:text-[52px] font-medium leading-[1.0] mb-4 font-display" style={{ color: tokens.foregroundAlt }}>Start earning today</h2>
            <p className="text-[18px] font-medium" style={{ color: tokens.mutedForeground }}>Sign up and get up to $200 in crypto.</p>
          </div>
        </FadeUp>
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRICING.map(tier => (
              <motion.div
                key={tier.name}
                variants={staggerItem}
                className="p-8 rounded-[16px] relative flex flex-col items-center text-center"
                style={{
                  backgroundColor: '#111',
                  border: `1px solid ${tier.highlighted ? tokens.accent : '#333'}`
                }}
              >
                {tier.highlighted && (
                  <span
                    className="absolute -top-4 px-4 py-1 text-[13px] font-semibold rounded-full"
                    style={{ backgroundColor: tokens.accent, color: tokens.accentForeground }}
                  >
                    Recommended
                  </span>
                )}
                <h3 className="font-semibold text-[24px] mb-2" style={{ color: tokens.foregroundAlt }}>{tier.name}</h3>
                <div className="flex items-baseline gap-1 mb-4 justify-center">
                  <span className="text-[48px] font-medium font-display leading-[1.0]" style={{ color: tokens.foregroundAlt }}>{tier.price}</span>
                  <span className="text-[16px] font-medium" style={{ color: tokens.mutedForeground }}>{tier.period !== 'forever' ? '/mo' : ''}</span>
                </div>
                <p className="text-[16px] mb-8 h-12 flex items-center justify-center" style={{ color: tokens.mutedForeground }}>{tier.description}</p>
                <motion.button
                  whileHover={tier.highlighted ? { backgroundColor: tokens.accentHover } : { backgroundColor: '#333' }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full h-[56px] rounded-[56px] font-semibold text-[16px] mb-8 transition-colors"
                  style={tier.highlighted
                    ? { backgroundColor: tokens.accent, color: tokens.accentForeground }
                    : { backgroundColor: '#222', color: tokens.foregroundAlt }
                  }
                >
                  {tier.cta}
                </motion.button>
                <ul className="space-y-4 mt-auto w-full text-left">
                  {tier.features.map(f => (
                    <li key={f} className="flex items-center gap-3 text-[16px]">
                      <Check className="h-5 w-5 flex-shrink-0" style={{ color: tokens.accent }} />
                      <span style={{ color: tokens.foregroundAlt }}>{f}</span>
                    </li>
                  ))}
                </ul>
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
    <section id="testimonials" className="py-24 md:py-32" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
        <FadeUp>
          <div className="text-center mb-16">
            <h2 className="text-[40px] md:text-[52px] font-medium leading-[1.0] font-display" style={{ color: tokens.foreground }}>Trusted by millions</h2>
          </div>
        </FadeUp>
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map(t => (
              <motion.div
                key={t.name}
                variants={staggerItem}
                className="p-8 rounded-[16px] border"
                style={{ borderColor: tokens.border, backgroundColor: tokens.background }}
              >
                <div className="flex mb-6">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" style={{ color: tokens.accent }} />
                  ))}
                </div>
                <p className="text-[18px] leading-[1.56] mb-8 font-normal" style={{ color: tokens.foreground }}>"{t.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200"></div>
                  <div>
                    <p className="font-bold text-[16px]" style={{ color: tokens.foreground }}>{t.name}</p>
                    <p className="text-[14px] font-medium" style={{ color: tokens.mutedForeground }}>{t.role} · {t.company}</p>
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
    <section id="faq" className="py-24 md:py-32" style={{ backgroundColor: tokens.backgroundAlt }}>
      <div className="max-w-3xl mx-auto px-6 lg:px-10">
        <FadeUp>
          <div className="text-center mb-16">
            <h2 className="text-[40px] md:text-[52px] font-medium leading-[1.0] font-display" style={{ color: tokens.foregroundAlt }}>Frequently asked questions</h2>
          </div>
        </FadeUp>
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, i) => (
            <FadeUp key={i} delay={i * 0.05}>
              <div className="border rounded-[16px] overflow-hidden" style={{ borderColor: '#333', backgroundColor: '#111' }}>
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  aria-expanded={openIndex === i}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-semibold text-[18px]" style={{ color: tokens.foregroundAlt }}>{item.q}</span>
                  <motion.span
                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="h-6 w-6 flex-shrink-0" style={{ color: tokens.foregroundAlt }} />
                  </motion.span>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openIndex === i ? 'auto' : 0, opacity: openIndex === i ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' as const }}
                  style={{ overflow: 'hidden' }}
                >
                  <p className="px-6 pb-6 text-[16px] leading-[1.56]" style={{ color: tokens.mutedForeground }}>
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
    <section className="py-24" style={{ backgroundColor: tokens.muted }}>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
        <FadeUp>
          <div className="flex flex-col md:flex-row items-center justify-between p-12 bg-[#0052ff] rounded-[24px]">
            <div className="mb-8 md:mb-0 max-w-xl text-center md:text-left">
              <h2 className="text-[32px] md:text-[40px] font-medium leading-[1.1] mb-4 text-white font-display">Earn up to $200 worth of crypto</h2>
              <p className="text-[18px] text-white/90 font-medium">
                Discover how specific cryptocurrencies work — and get a bit of each crypto to try out for yourself.
              </p>
            </div>
            <motion.button
              whileHover={{ backgroundColor: '#f0f0f0' }}
              whileTap={{ scale: 0.98 }}
              className="h-14 px-8 rounded-[56px] font-semibold text-[16px] transition-colors bg-white text-[#0052ff] whitespace-nowrap"
            >
              Start earning
            </motion.button>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

function Footer() {
  const links = {
    Learn: ['Browse crypto prices', 'Crypto basics', 'Tips and tutorials', 'Market updates'],
    Individuals: ['Buy & sell', 'Earn free crypto', 'Wallet', 'Card'],
    Businesses: ['Institutional', 'Prime', 'Asset Hub', 'Commerce'],
    Company: ['About', 'Careers', 'Affiliates', 'Blog', 'Press'],
  }

  return (
    <footer className="py-16 md:py-24" style={{ backgroundColor: tokens.background, borderTop: `1px solid ${tokens.border}` }}>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-16">
          <div className="col-span-2 md:col-span-1">
            <p className="font-bold text-xl mb-4 tracking-tight" style={{ color: tokens.accent }}>{PRODUCT_NAME}</p>
            <select className="w-full h-10 px-3 border rounded-md text-sm mb-6" style={{ borderColor: tokens.border }}>
              <option>English</option>
              <option>Español</option>
              <option>Français</option>
            </select>
            <p className="text-[14px] leading-[1.50]" style={{ color: tokens.mutedForeground }}>
              © 2025 Coinbase
            </p>
          </div>
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <p className="font-bold text-[16px] mb-6" style={{ color: tokens.foreground }}>{group}</p>
              <ul className="space-y-4">
                {items.map(item => (
                  <li key={item}>
                    <a href="#" className="text-[16px] font-normal transition-colors" style={{ color: tokens.mutedForeground }} onMouseOver={(e) => { e.currentTarget.style.color = tokens.accent }} onMouseOut={(e) => { e.currentTarget.style.color = tokens.mutedForeground }}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center pt-8 border-t" style={{ borderColor: tokens.border }}>
           <a
              href="/"
              className="text-[14px] font-semibold px-4 py-2 rounded-full border transition-colors"
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
