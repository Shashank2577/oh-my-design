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
import { Inter, Noto_Serif_Display, JetBrains_Mono } from 'next/font/google'
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

const displayFont = Noto_Serif_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const monoFont = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

// ─────────────────────────────────────────────
// DESIGN TOKENS — replace ALL values per style
// ─────────────────────────────────────────────
const tokens = {
  background: '#ffffff', // Pure White
  backgroundAlt: '#f8f9fa', // Off-white for subtle contrast
  foreground: '#000000', // Cohere Black
  muted: '#212121', // Near Black
  mutedForeground: '#93939f', // Muted Slate
  border: '#f2f2f2', // Lightest Gray
  borderCool: '#d9d9dd', // Border Cool
  accent: '#1863dc', // Interaction Blue
  accentForeground: '#ffffff',
  purpleBand: '#392467', // Deep Purple Band
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
const PRODUCT_NAME = 'Cohere'
const TAGLINE = 'The enterprise AI platform'
const DESCRIPTION = 'Cohere empowers every developer and enterprise to build amazing products and capture true business value with language AI.'

const NAV_LINKS = ['Products', 'Solutions', 'Developers', 'Company', 'Pricing']

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
      className="fixed top-0 left-0 right-0 z-50"
      style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(8px)', borderBottom: `1px solid ${tokens.border}` }}
    >
      <div className="max-w-[2560px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
        <span className="font-serif text-2xl font-medium tracking-tight" style={{ color: tokens.foreground }}>
          {PRODUCT_NAME}
        </span>
        <div className="hidden lg:flex items-center gap-10">
          {NAV_LINKS.map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-[16px] font-normal transition-colors"
              style={{ color: tokens.foreground }}
              onMouseOver={(e) => { e.currentTarget.style.color = tokens.accent; e.currentTarget.style.opacity = '0.8' }}
              onMouseOut={(e) => { e.currentTarget.style.color = tokens.foreground; e.currentTarget.style.opacity = '1' }}
            >
              {link}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <a
            href="#"
            className="hidden md:block text-[16px] font-medium px-4 py-2 transition-colors"
            style={{ color: tokens.foreground }}
            onMouseOver={(e) => { e.currentTarget.style.color = tokens.accent }}
            onMouseOut={(e) => { e.currentTarget.style.color = tokens.foreground }}
          >
            Log in
          </a>
          <motion.button
            whileHover={{ backgroundColor: '#111' }}
            whileTap={{ scale: 0.98 }}
            className="px-6 h-12 rounded-full text-[16px] font-medium transition-colors"
            style={{ backgroundColor: tokens.foreground, color: tokens.accentForeground }}
          >
            Get started
          </motion.button>
        </div>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section className="min-h-[90vh] flex flex-col justify-center pt-32 pb-20" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-[2560px] mx-auto px-6 lg:px-12 w-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.15, delayChildren: 0.1 }}
          className="max-w-5xl mx-auto text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-[48px] md:text-[72px] lg:text-[88px] font-serif leading-[1.05] tracking-tight mb-8 mx-auto"
            style={{ color: tokens.foreground, letterSpacing: '-0.02em' }}
          >
            {TAGLINE}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[20px] md:text-[24px] mb-12 max-w-3xl mx-auto leading-[1.50] font-normal"
            style={{ color: tokens.muted }}
          >
            {DESCRIPTION}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row justify-center gap-6"
          >
            <motion.button
              whileHover={{ backgroundColor: '#111' }}
              whileTap={{ scale: 0.98 }}
              className="h-14 px-8 rounded-full text-[16px] font-medium flex items-center justify-center gap-2 transition-colors"
              style={{ backgroundColor: tokens.foreground, color: tokens.accentForeground }}
            >
              Get started <ArrowRight className="h-4 w-4" />
            </motion.button>
            <motion.button
              className="h-14 px-8 rounded-full text-[16px] font-medium transition-all"
              style={{ backgroundColor: 'transparent', color: tokens.foreground }}
              onMouseOver={(e) => { e.currentTarget.style.color = tokens.accent; e.currentTarget.style.opacity = '0.8' }}
              onMouseOut={(e) => { e.currentTarget.style.color = tokens.foreground; e.currentTarget.style.opacity = '1' }}
            >
              Contact sales
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Hero Visual */}
        <FadeUp delay={0.4}>
          <div
            className="mt-20 w-full h-[400px] md:h-[600px] rounded-[22px] overflow-hidden relative"
            style={{ backgroundColor: tokens.backgroundAlt, border: `1px solid ${tokens.borderCool}` }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
               <div className="w-3/4 h-3/4 rounded-[22px] bg-white border shadow-sm flex flex-col p-6" style={{ borderColor: tokens.border }}>
                  <div className="w-full h-8 bg-gray-100 rounded-md mb-4"></div>
                  <div className="w-2/3 h-8 bg-gray-100 rounded-md mb-8"></div>
                  <div className="w-full flex-1 bg-gray-50 rounded-[16px] border border-gray-100 p-6">
                    <p className="font-mono text-sm text-gray-400 uppercase tracking-widest mb-4">Output</p>
                    <div className="w-full h-4 bg-gray-200 rounded-sm mb-3"></div>
                    <div className="w-5/6 h-4 bg-gray-200 rounded-sm mb-3"></div>
                    <div className="w-4/6 h-4 bg-gray-200 rounded-sm"></div>
                  </div>
               </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

function Stats() {
  return (
    <section className="py-24" style={{ backgroundColor: tokens.backgroundAlt, borderTop: `1px solid ${tokens.border}`, borderBottom: `1px solid ${tokens.border}` }}>
      <div className="max-w-[2560px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
           <p className="font-mono text-[14px] uppercase tracking-[0.28px]" style={{ color: tokens.mutedForeground }}>Trusted By Enterprise</p>
           {/* Trust Bar placeholders */}
           <div className="flex flex-wrap justify-center md:justify-end gap-8 md:gap-16 opacity-50 grayscale">
             <div className="text-xl font-serif font-bold">Spotify</div>
             <div className="text-xl font-serif font-bold">Glean</div>
             <div className="text-xl font-serif font-bold">Notion</div>
             <div className="text-xl font-serif font-bold">Oracle</div>
           </div>
        </div>

        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map((stat) => (
              <motion.div key={stat.label} variants={staggerItem} className="flex flex-col">
                <p className="text-[48px] md:text-[60px] font-serif leading-[1.0] tracking-tight mb-4" style={{ color: tokens.foreground }}>{stat.value}</p>
                <p className="text-[16px] font-normal leading-[1.50]" style={{ color: tokens.muted }}>{stat.label}</p>
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
      <div className="max-w-[2560px] mx-auto px-6 lg:px-12">
        <FadeUp>
          <div className="mb-20 max-w-3xl">
            <p className="font-mono text-[14px] uppercase tracking-[0.28px] mb-8" style={{ color: tokens.mutedForeground }}>Capabilities</p>
            <h2 className="text-[48px] md:text-[60px] font-serif leading-[1.05] tracking-tight mb-8" style={{ color: tokens.foreground, letterSpacing: '-0.02em' }}>
              Build products that understand language
            </h2>
            <p className="text-[20px] leading-[1.50] font-normal" style={{ color: tokens.muted }}>
              Add natural language processing to your apps with our industry-leading models.
            </p>
          </div>
        </FadeUp>
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURES.map((feature) => (
              <motion.div
                key={feature.title}
                variants={staggerItem}
                className="p-8 rounded-[22px] border transition-colors hover:border-gray-300"
                style={{ borderColor: tokens.borderCool, backgroundColor: tokens.background }}
              >
                <div className="mb-8">
                  <feature.icon className="h-8 w-8" style={{ color: tokens.foreground }} strokeWidth={1.5} />
                </div>
                <h3 className="font-normal text-[24px] mb-4 tracking-tight" style={{ color: tokens.foreground }}>{feature.title}</h3>
                <p className="text-[16px] leading-[1.50] font-normal" style={{ color: tokens.mutedForeground }}>{feature.description}</p>
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
    <section className="py-32" style={{ backgroundColor: tokens.purpleBand }}>
      <div className="max-w-[2560px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <FadeUp>
            <div className="max-w-xl">
              <p className="font-mono text-[14px] uppercase tracking-[0.28px] mb-8 text-white/70">Enterprise Security</p>
              <h2 className="text-[48px] md:text-[60px] font-serif leading-[1.05] tracking-tight mb-8 text-white" style={{ letterSpacing: '-0.02em' }}>
                Your data remains yours. Always.
              </h2>
              <div className="space-y-6">
                <p className="text-[20px] leading-[1.50] font-normal text-white/90">
                  Deploy models securely in your own environment. We don't use your data to train our models.
                </p>
                <p className="text-[20px] leading-[1.50] font-normal text-white/70">
                  Cohere is designed for enterprise scale and security from the ground up, giving you complete control over your deployments.
                </p>
                <motion.button
                  whileHover={{ backgroundColor: 'rgba(255,255,255,0.9)' }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-6 h-14 px-8 rounded-full text-[16px] font-medium transition-colors bg-white text-black"
                >
                  Learn about Security
                </motion.button>
              </div>
            </div>
          </FadeUp>
          <FadeUp delay={0.2}>
            <div className="w-full aspect-[4/3] rounded-[22px] overflow-hidden relative" style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
              {/* Product UI representation */}
              <div className="absolute inset-8 rounded-[16px] bg-[#111] border border-gray-800 p-8 shadow-2xl flex flex-col">
                <div className="w-full flex justify-between items-center pb-6 border-b border-gray-800 mb-6">
                  <div className="w-32 h-6 bg-gray-800 rounded-md"></div>
                  <div className="w-16 h-6 bg-green-900/30 border border-green-500/30 rounded-full flex items-center justify-center">
                    <span className="text-xs text-green-500 font-mono">SECURE</span>
                  </div>
                </div>
                <div className="flex-1 space-y-4">
                  <div className="w-full h-12 bg-gray-800/50 rounded-lg"></div>
                  <div className="w-5/6 h-12 bg-gray-800/50 rounded-lg"></div>
                  <div className="w-full h-12 bg-gray-800/50 rounded-lg"></div>
                </div>
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
      <div className="max-w-[2560px] mx-auto px-6 lg:px-12">
        <FadeUp>
          <div className="mb-20 max-w-3xl">
            <p className="font-mono text-[14px] uppercase tracking-[0.28px] mb-8" style={{ color: tokens.mutedForeground }}>Pricing</p>
            <h2 className="text-[48px] md:text-[60px] font-serif leading-[1.05] tracking-tight mb-8" style={{ color: tokens.foreground }}>Pricing that scales with you</h2>
          </div>
        </FadeUp>
        <StaggerContainer>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {PRICING.map((tier, i) => (
              <motion.div
                key={tier.name}
                variants={staggerItem}
                className="p-10 rounded-[22px] border relative flex flex-col"
                style={{
                  borderColor: tier.highlighted ? tokens.borderCool : tokens.border,
                  backgroundColor: tokens.background,
                }}
              >
                <h3 className="font-normal text-[28px] mb-4 tracking-tight" style={{ color: tokens.foreground }}>{tier.name}</h3>
                <p className="text-[16px] leading-[1.50] font-normal mb-8 h-12" style={{ color: tokens.mutedForeground }}>{tier.description}</p>
                <div className="flex items-baseline gap-2 mb-10">
                  <span className="text-[48px] font-serif leading-[1.0] tracking-tight" style={{ color: tokens.foreground }}>{tier.price}</span>
                  {tier.period !== 'forever' && <span className="text-[16px]" style={{ color: tokens.mutedForeground }}>/ {tier.period}</span>}
                </div>

                <motion.button
                  whileTap={{ scale: 0.98 }}
                  className="w-full h-14 rounded-full text-[16px] font-medium mb-12 transition-all border"
                  style={tier.highlighted
                    ? { backgroundColor: tokens.foreground, color: tokens.accentForeground, borderColor: tokens.foreground }
                    : { backgroundColor: 'transparent', color: tokens.foreground, borderColor: tokens.borderCool }
                  }
                  onMouseOver={!tier.highlighted ? (e) => { e.currentTarget.style.color = tokens.accent; e.currentTarget.style.borderColor = tokens.accent } : undefined}
                  onMouseOut={!tier.highlighted ? (e) => { e.currentTarget.style.color = tokens.foreground; e.currentTarget.style.borderColor = tokens.borderCool } : undefined}
                >
                  {tier.cta}
                </motion.button>

                <div className="mt-auto">
                  <ul className="space-y-5">
                    {tier.features.map(f => (
                      <li key={f} className="flex items-start gap-4 text-[16px] font-normal leading-[1.50]">
                        <Check className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: tokens.foreground }} strokeWidth={1.5} />
                        <span style={{ color: tokens.muted }}>{f}</span>
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
    <section id="testimonials" className="py-32" style={{ backgroundColor: tokens.backgroundAlt, borderTop: `1px solid ${tokens.border}`, borderBottom: `1px solid ${tokens.border}` }}>
      <div className="max-w-[2560px] mx-auto px-6 lg:px-12">
        <FadeUp>
          <div className="mb-20 max-w-3xl">
            <p className="font-mono text-[14px] uppercase tracking-[0.28px] mb-8" style={{ color: tokens.mutedForeground }}>Customer Stories</p>
            <h2 className="text-[48px] md:text-[60px] font-serif leading-[1.05] tracking-tight" style={{ color: tokens.foreground, letterSpacing: '-0.02em' }}>Empowering the best teams</h2>
          </div>
        </FadeUp>
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map(t => (
              <motion.div
                key={t.name}
                variants={staggerItem}
                className="p-10 rounded-[22px] border bg-white"
                style={{ borderColor: tokens.borderCool }}
              >
                <p className="text-[20px] leading-[1.50] font-serif mb-10" style={{ color: tokens.foreground }}>"{t.text}"</p>
                <div>
                  <p className="font-normal text-[16px] mb-1" style={{ color: tokens.foreground }}>{t.name}</p>
                  <p className="text-[14px] font-normal" style={{ color: tokens.mutedForeground }}>{t.role}, {t.company}</p>
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
      <div className="max-w-4xl mx-auto px-6">
        <FadeUp>
          <div className="mb-16">
            <h2 className="text-[48px] md:text-[60px] font-serif leading-[1.05] tracking-tight mb-4" style={{ color: tokens.foreground, letterSpacing: '-0.02em' }}>FAQ</h2>
          </div>
        </FadeUp>
        <div className="space-y-0 border-t" style={{ borderColor: tokens.border }}>
          {FAQ_ITEMS.map((item, i) => (
            <div key={i} className="border-b" style={{ borderColor: tokens.border }}>
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
                className="w-full flex items-center justify-between py-8 text-left transition-colors"
                onMouseOver={(e) => { e.currentTarget.querySelector('span')!.style.color = tokens.accent }}
                onMouseOut={(e) => { e.currentTarget.querySelector('span')!.style.color = tokens.foreground }}
              >
                <span className="font-normal text-[20px] transition-colors" style={{ color: tokens.foreground }}>{item.q}</span>
                <motion.span
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="h-6 w-6 flex-shrink-0" style={{ color: tokens.foreground }} strokeWidth={1.5} />
                </motion.span>
              </button>
              <motion.div
                initial={false}
                animate={{ height: openIndex === i ? 'auto' : 0, opacity: openIndex === i ? 1 : 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' as const }}
                style={{ overflow: 'hidden' }}
              >
                <p className="pb-8 text-[16px] leading-[1.50] font-normal max-w-3xl" style={{ color: tokens.mutedForeground }}>
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
  return (
    <section className="py-32" style={{ backgroundColor: tokens.purpleBand }}>
      <div className="max-w-[2560px] mx-auto px-6 lg:px-12 text-center">
        <FadeUp>
          <h2 className="text-[48px] md:text-[72px] font-serif leading-[1.05] tracking-tight mb-10 text-white" style={{ letterSpacing: '-0.02em' }}>Ready to build?</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <motion.button
              whileHover={{ backgroundColor: 'rgba(255,255,255,0.9)' }}
              whileTap={{ scale: 0.98 }}
              className="h-14 px-8 rounded-full text-[16px] font-medium transition-colors bg-white text-black"
            >
              Get API key
            </motion.button>
            <motion.button
              className="h-14 px-8 rounded-full text-[16px] font-medium transition-all text-white border border-white/20"
              onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)' }}
              onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent' }}
            >
              Read docs
            </motion.button>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

function Footer() {
  const links = {
    Products: ['Command', 'Generate', 'Embed', 'Rerank'],
    Developers: ['Documentation', 'API Reference', 'Playground', 'Cookbook'],
    Company: ['About Us', 'Careers', 'News', 'Contact'],
    Legal: ['Terms of Use', 'Privacy Policy', 'Security', 'Trust'],
  }

  return (
    <footer className="py-20" style={{ backgroundColor: tokens.backgroundAlt }}>
      <div className="max-w-[2560px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-20">
          <div className="col-span-2 md:col-span-1">
            <p className="font-serif text-xl font-medium tracking-tight mb-6" style={{ color: tokens.foreground }}>{PRODUCT_NAME}</p>
          </div>
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <p className="font-normal text-[14px] mb-6" style={{ color: tokens.foreground }}>{group}</p>
              <ul className="space-y-4">
                {items.map(item => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-[14px] font-normal transition-colors"
                      style={{ color: tokens.mutedForeground }}
                      onMouseOver={(e) => { e.currentTarget.style.color = tokens.accent }}
                      onMouseOut={(e) => { e.currentTarget.style.color = tokens.mutedForeground }}
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
          <p className="text-[12px] font-normal" style={{ color: tokens.mutedForeground }}>
            © 2025 Cohere Inc. All rights reserved.
          </p>
          <a
            href="/"
            className="text-[12px] font-normal px-4 py-2 rounded-full border transition-colors"
            style={{ borderColor: tokens.borderCool, color: tokens.foreground }}
            onMouseOver={(e) => { e.currentTarget.style.borderColor = tokens.accent; e.currentTarget.style.color = tokens.accent }}
            onMouseOut={(e) => { e.currentTarget.style.borderColor = tokens.borderCool; e.currentTarget.style.color = tokens.foreground }}
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
    <div className={`${bodyFont.variable} ${displayFont.variable} ${monoFont.variable} font-sans`} style={{ backgroundColor: tokens.background }}>
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
