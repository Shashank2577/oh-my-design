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
import { Inter, IBM_Plex_Mono } from 'next/font/google'
import {
  Star, ChevronDown, ArrowRight, Check, Users, Zap, Globe, Shield,
  BookOpen, Layout, Palette, Code2, BarChart, Lock
} from 'lucide-react'

// ─────────────────────────────────────────────
// FONTS — replace with style-specific fonts
// ─────────────────────────────────────────────

// Sanity uses waldenburgNormal. Inter is a good geometric sans substitute.
const sansFont = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const monoFont = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
})

// ─────────────────────────────────────────────
// DESIGN TOKENS — replace ALL values per style
// ─────────────────────────────────────────────
const tokens = {
  background: '#0b0b0b', // Sanity Black
  backgroundAlt: '#212121', // Dark Gray
  foreground: '#ffffff', // Pure White
  muted: '#353535', // Medium Dark
  mutedForeground: '#b9b9b9', // Silver
  tertiaryText: '#797979', // Medium Gray
  border: '#212121',
  borderProminent: '#353535',
  accent: '#f36458', // Sanity Red
  accentForeground: '#ffffff',
  interactive: '#0052ef', // Electric Blue
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
const PRODUCT_NAME = 'Sanity'
const TAGLINE = 'The Composable Content Cloud'
const DESCRIPTION = 'Sanity is the platform that structured content deserves. Build exceptional digital experiences with a deeply customizable CMS.'

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
      className="fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-sm"
      style={{ borderColor: tokens.border, backgroundColor: 'rgba(11, 11, 11, 0.8)' }}
    >
      <div className="max-w-[1440px] mx-auto px-6 h-[64px] flex items-center justify-between">
        <span className="font-semibold text-[20px] tracking-tight" style={{ color: tokens.foreground }}>
          {PRODUCT_NAME}
        </span>
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-[16px] font-normal transition-colors"
              style={{ color: tokens.mutedForeground }}
              onMouseEnter={(e) => e.currentTarget.style.color = tokens.interactive}
              onMouseLeave={(e) => e.currentTarget.style.color = tokens.mutedForeground}
            >
              {link}
            </a>
          ))}
        </div>
        <div className="flex gap-4">
          <motion.button
            whileHover={{ backgroundColor: tokens.interactive }}
            className="px-[16px] py-[8px] rounded-full text-[16px] font-normal transition-colors duration-200"
            style={{ backgroundColor: tokens.accent, color: tokens.accentForeground }}
          >
            Start building
          </motion.button>
        </div>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section className="min-h-dvh flex items-center pt-20" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-[1440px] mx-auto px-6 py-32 w-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.15, delayChildren: 0.1 }}
          className="max-w-5xl text-center mx-auto"
        >
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-[48px] md:text-[72px] lg:text-[112px] font-normal leading-[1.00] tracking-[-1.68px] md:tracking-[-2.88px] lg:tracking-[-4.48px] mb-8"
            style={{ color: tokens.foreground }}
          >
            {TAGLINE}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[18px] md:text-[24px] mb-12 max-w-3xl mx-auto leading-[1.50] tracking-[-0.18px]"
            style={{ color: tokens.mutedForeground }}
          >
            {DESCRIPTION}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              whileHover={{ backgroundColor: tokens.interactive }}
              className="py-[12px] px-[24px] rounded-full text-[16px] font-normal transition-colors duration-200"
              style={{ backgroundColor: tokens.accent, color: tokens.accentForeground }}
            >
              Start building
            </motion.button>
            <motion.button
              whileHover={{ backgroundColor: tokens.interactive, color: tokens.accentForeground }}
              className="py-[12px] px-[24px] rounded-full text-[16px] font-normal transition-colors duration-200"
              style={{ backgroundColor: tokens.backgroundAlt, color: tokens.mutedForeground }}
            >
              Book a demo
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Terminal/Code block visual */}
        <FadeUp delay={0.4}>
          <div
            className="mt-24 w-full max-w-4xl mx-auto rounded-[6px] border overflow-hidden"
            style={{ backgroundColor: tokens.backgroundAlt, borderColor: tokens.borderProminent }}
          >
            <div className="flex gap-2 px-4 py-3 border-b" style={{ borderColor: tokens.borderProminent, backgroundColor: '#1a1a1a' }}>
              <div className="w-3 h-3 rounded-full bg-[#f36458]"></div>
              <div className="w-3 h-3 rounded-full bg-[#ffc53d]"></div>
              <div className="w-3 h-3 rounded-full bg-[#19d600]"></div>
            </div>
            <div className="p-6 overflow-x-auto">
              <pre className={`${monoFont.variable} font-mono text-[15px] leading-[1.50]`} style={{ color: tokens.mutedForeground }}>
                <code>
                  <span style={{ color: '#ff7b72' }}>export default</span> {'{'}
                  <br />
                  {'  '}name: <span style={{ color: '#a5d6ff' }}>'post'</span>,
                  <br />
                  {'  '}type: <span style={{ color: '#a5d6ff' }}>'document'</span>,
                  <br />
                  {'  '}title: <span style={{ color: '#a5d6ff' }}>'Blog Post'</span>,
                  <br />
                  {'  '}fields: [
                  <br />
                  {'    {'}
                  <br />
                  {'      '}name: <span style={{ color: '#a5d6ff' }}>'title'</span>,
                  <br />
                  {'      '}type: <span style={{ color: '#a5d6ff' }}>'string'</span>,
                  <br />
                  {'      '}title: <span style={{ color: '#a5d6ff' }}>'Title'</span>,
                  <br />
                  {'    }'},
                  <br />
                  {'  '}],
                  <br />
                  {'}'}
                </code>
              </pre>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

function Stats() {
  return (
    <section className="py-[64px]" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-[1440px] mx-auto px-6">
        <StaggerContainer>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map(stat => (
              <motion.div key={stat.label} variants={staggerItem} className="flex flex-col items-center">
                <p className="text-[38px] md:text-[48px] font-normal leading-[1.08] tracking-[-1.68px] mb-2" style={{ color: tokens.foreground }}>{stat.value}</p>
                <p className={`${monoFont.variable} font-mono text-[11px] font-semibold uppercase tracking-wider`} style={{ color: tokens.tertiaryText }}>{stat.label}</p>
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
    <section id="features" className="py-[96px] md:py-[120px]" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-[1440px] mx-auto px-6">
        <FadeUp>
          <div className="mb-16">
            <h2 className="text-[38px] md:text-[48px] font-normal leading-[1.08] tracking-[-1.68px] max-w-2xl" style={{ color: tokens.foreground }}>
              Ship better products, faster
            </h2>
          </div>
        </FadeUp>
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px]">
            {FEATURES.map((feature, i) => (
              <motion.div
                key={feature.title}
                variants={staggerItem}
                className="p-[24px] rounded-[6px] border group transition-colors duration-200"
                style={{ borderColor: tokens.borderProminent, backgroundColor: tokens.backgroundAlt }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = tokens.interactive}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = tokens.borderProminent}
              >
                <div className="flex justify-between items-start mb-16">
                  <div className="p-3 rounded-[6px] bg-[#0b0b0b]">
                    <feature.icon className="h-6 w-6" style={{ color: tokens.foreground }} strokeWidth={1.5} />
                  </div>
                  <span className={`${monoFont.variable} font-mono text-[11px] font-medium uppercase tracking-wider px-2 py-1 rounded-full`} style={{ color: tokens.tertiaryText, backgroundColor: '#0b0b0b' }}>
                    0{i + 1}
                  </span>
                </div>
                <h3 className="font-medium text-[24px] leading-[1.24] tracking-[-0.24px] mb-4" style={{ color: tokens.foreground }}>{feature.title}</h3>
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
    <section className="py-[96px] md:py-[120px]" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-[1440px] mx-auto px-6">
        <FadeUp>
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="flex-1 space-y-8">
              <h2 className="text-[38px] md:text-[48px] font-normal leading-[1.08] tracking-[-1.68px]" style={{ color: tokens.foreground }}>
                Treat content as data
              </h2>
              <div className="space-y-6">
                <p className="text-[18px] leading-[1.50] tracking-[-0.18px]" style={{ color: tokens.mutedForeground }}>
                  Stop creating page-specific silos. Structure your content as data so it can flow freely to any digital channel, platform, or device.
                </p>
                <p className="text-[18px] leading-[1.50] tracking-[-0.18px]" style={{ color: tokens.mutedForeground }}>
                  When content is data, developers build faster, creators work more efficiently, and digital experiences perform better.
                </p>
              </div>
              <motion.button
                whileHover={{ backgroundColor: tokens.interactive }}
                className="py-[12px] px-[24px] rounded-full text-[16px] font-normal transition-colors duration-200"
                style={{ backgroundColor: tokens.backgroundAlt, color: tokens.foreground }}
              >
                Learn about Content as Data
              </motion.button>
            </div>
            <div className="flex-1 w-full">
              <div
                className="w-full aspect-square md:aspect-[4/3] rounded-[12px] overflow-hidden border flex items-center justify-center relative"
                style={{ borderColor: tokens.borderProminent, backgroundColor: tokens.backgroundAlt }}
              >
                {/* Abstract visualization of structured data */}
                <div className="absolute inset-0 bg-[#0b0b0b] opacity-50"></div>
                <div className="relative z-10 grid grid-cols-2 gap-4 p-8 w-full max-w-sm">
                  <div className="h-16 rounded-[4px] border" style={{ borderColor: tokens.borderProminent, backgroundColor: tokens.backgroundAlt }}></div>
                  <div className="h-16 rounded-[4px] border" style={{ borderColor: tokens.interactive, backgroundColor: `${tokens.interactive}20` }}></div>
                  <div className="h-16 rounded-[4px] border" style={{ borderColor: tokens.borderProminent, backgroundColor: tokens.backgroundAlt }}></div>
                  <div className="h-16 rounded-[4px] border" style={{ borderColor: tokens.borderProminent, backgroundColor: tokens.backgroundAlt }}></div>
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
    <section id="pricing" className="py-[96px] md:py-[120px]" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-[1440px] mx-auto px-6">
        <FadeUp>
          <div className="mb-16">
            <h2 className="text-[38px] md:text-[48px] font-normal leading-[1.08] tracking-[-1.68px] max-w-2xl mb-4" style={{ color: tokens.foreground }}>
              Pricing
            </h2>
            <p className="text-[18px] leading-[1.50] tracking-[-0.18px]" style={{ color: tokens.mutedForeground }}>
              Fair pricing for teams of all sizes.
            </p>
          </div>
        </FadeUp>
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px]">
            {PRICING.map(tier => (
              <motion.div
                key={tier.name}
                variants={staggerItem}
                className="p-[32px] rounded-[6px] border flex flex-col"
                style={{
                  borderColor: tokens.borderProminent,
                  backgroundColor: tokens.backgroundAlt,
                }}
              >
                <div className="mb-8">
                  <h3 className="font-medium text-[24px] leading-[1.24] tracking-[-0.24px] mb-2" style={{ color: tokens.foreground }}>{tier.name}</h3>
                  <p className="text-[15px] leading-[1.50] tracking-[-0.15px]" style={{ color: tokens.mutedForeground }}>{tier.description}</p>
                </div>
                <div className="mb-8">
                  <span className="text-[38px] font-normal leading-[1.10] tracking-[-1.14px]" style={{ color: tokens.foreground }}>{tier.price}</span>
                  <span className="text-[15px]" style={{ color: tokens.mutedForeground }}>/ {tier.period}</span>
                </div>
                <motion.button
                  whileHover={{ backgroundColor: tokens.interactive, color: tokens.accentForeground, borderColor: tokens.interactive }}
                  className="w-full py-[12px] rounded-full font-normal text-[16px] transition-colors duration-200 border mb-8"
                  style={tier.highlighted
                    ? { backgroundColor: tokens.accent, color: tokens.accentForeground, borderColor: 'transparent' }
                    : { backgroundColor: 'transparent', color: tokens.foreground, borderColor: tokens.borderProminent }
                  }
                >
                  {tier.cta}
                </motion.button>
                <ul className="space-y-[12px] flex-1">
                  {tier.features.map(f => (
                    <li key={f} className="flex items-start gap-[12px] text-[15px] leading-[1.50] tracking-[-0.15px]">
                      <Check className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: tokens.mutedForeground }} />
                      <span style={{ color: tokens.foreground }}>{f}</span>
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
    <section id="testimonials" className="py-[96px] md:py-[120px] border-t" style={{ borderColor: tokens.borderProminent, backgroundColor: tokens.background }}>
      <div className="max-w-[1440px] mx-auto px-6">
        <FadeUp>
          <div className="mb-16">
            <h2 className="text-[38px] md:text-[48px] font-normal leading-[1.08] tracking-[-1.68px] max-w-2xl" style={{ color: tokens.foreground }}>
              Trusted by the community
            </h2>
          </div>
        </FadeUp>
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px]">
            {TESTIMONIALS.map(t => (
              <motion.div
                key={t.name}
                variants={staggerItem}
                className="p-[32px] rounded-[6px] border group transition-colors duration-200 flex flex-col justify-between"
                style={{ borderColor: tokens.borderProminent, backgroundColor: tokens.backgroundAlt }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = tokens.interactive}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = tokens.borderProminent}
              >
                <p className="text-[18px] leading-[1.50] tracking-[-0.18px] mb-8" style={{ color: tokens.foreground }}>"{t.text}"</p>
                <div>
                  <p className="font-medium text-[15px] leading-[1.50] tracking-[-0.15px]" style={{ color: tokens.foreground }}>{t.name}</p>
                  <p className="text-[13px] leading-[1.50] tracking-[-0.13px]" style={{ color: tokens.mutedForeground }}>{t.role}, {t.company}</p>
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
    <section id="faq" className="py-[96px] md:py-[120px]" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-[1000px] mx-auto px-6">
        <FadeUp>
          <div className="mb-16">
            <h2 className="text-[38px] md:text-[48px] font-normal leading-[1.08] tracking-[-1.68px]" style={{ color: tokens.foreground }}>
              Questions & answers
            </h2>
          </div>
        </FadeUp>
        <div className="space-y-[8px]">
          {FAQ_ITEMS.map((item, i) => (
            <FadeUp key={i} delay={i * 0.05}>
              <div className="border rounded-[6px] overflow-hidden" style={{ borderColor: tokens.borderProminent, backgroundColor: tokens.backgroundAlt }}>
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  aria-expanded={openIndex === i}
                  className="w-full flex items-center justify-between p-[24px] text-left transition-colors"
                  style={{ backgroundColor: openIndex === i ? tokens.muted : 'transparent' }}
                >
                  <span className="font-medium text-[20px] leading-[1.13] tracking-[-0.20px]" style={{ color: tokens.foreground }}>{item.q}</span>
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
                  <p className="px-[24px] pb-[24px] text-[16px] leading-[1.50]" style={{ color: tokens.mutedForeground }}>
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
    <section className="py-[96px] md:py-[120px] border-t" style={{ borderColor: tokens.borderProminent, backgroundColor: tokens.background }}>
      <div className="max-w-[1440px] mx-auto px-6">
        <FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-[38px] md:text-[48px] font-normal leading-[1.08] tracking-[-1.68px] mb-4" style={{ color: tokens.foreground }}>Subscribe to updates</h2>
              <p className="text-[18px] leading-[1.50] tracking-[-0.18px]" style={{ color: tokens.mutedForeground }}>
                Get the latest product updates, articles, and community news.
              </p>
            </div>
            <div className="w-full max-w-md ml-auto">
              {status === 'success' ? (
                <div className="flex items-center gap-3 p-4 rounded-[6px] border" style={{ borderColor: tokens.borderProminent, backgroundColor: tokens.backgroundAlt }}>
                  <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: '#19d600' }}>
                    <Check className="h-3 w-3 text-[#0b0b0b]" strokeWidth={3} />
                  </div>
                  <p className="font-medium text-[16px]" style={{ color: tokens.foreground }}>Subscribed successfully</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-[12px]">
                  <label htmlFor="newsletter-email" className="sr-only">Email address</label>
                  <input
                    id="newsletter-email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="Email address"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full h-[48px] px-[12px] rounded-[3px] border text-[16px] focus:outline-none transition-colors"
                    style={{ borderColor: tokens.borderProminent, backgroundColor: tokens.background, color: tokens.foreground }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = tokens.interactive; e.currentTarget.style.boxShadow = `0 0 0 1px ${tokens.interactive}` }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = tokens.borderProminent; e.currentTarget.style.boxShadow = 'none' }}
                  />
                  <motion.button
                    type="submit"
                    disabled={status === 'loading'}
                    whileHover={{ backgroundColor: tokens.interactive }}
                    className="h-[48px] px-[24px] rounded-full font-normal text-[16px] disabled:opacity-60 transition-colors duration-200"
                    style={{ backgroundColor: tokens.accent, color: tokens.accentForeground }}
                  >
                    {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
                  </motion.button>
                  <p className="text-[12px] leading-[1.50] tracking-[-0.12px] mt-2" style={{ color: tokens.tertiaryText }}>
                    By subscribing, you agree to our Privacy Policy.
                  </p>
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
    Product: ['Features', 'Pricing', 'Changelog', 'Roadmap'],
    Company: ['About', 'Blog', 'Careers', 'Press'],
    Resources: ['Documentation', 'API', 'Guides', 'Status'],
    Legal: ['Privacy', 'Terms', 'Cookies', 'Security'],
  }

  return (
    <footer className="py-[64px]" style={{ backgroundColor: tokens.background, borderTop: `1px solid ${tokens.borderProminent}` }}>
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-[64px]">
          <div className="col-span-2">
            <p className="font-semibold text-[20px] tracking-tight mb-4" style={{ color: tokens.foreground }}>{PRODUCT_NAME}</p>
            <p className="text-[15px] leading-[1.50] tracking-[-0.15px]" style={{ color: tokens.mutedForeground }}>
              The Composable Content Cloud.
            </p>
          </div>
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <p className={`${monoFont.variable} font-mono text-[11px] font-medium uppercase tracking-wider mb-6`} style={{ color: tokens.foreground }}>{group}</p>
              <ul className="space-y-[12px]">
                {items.map(item => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-[15px] leading-[1.50] tracking-[-0.15px] transition-colors"
                      style={{ color: tokens.mutedForeground }}
                      onMouseEnter={(e) => e.currentTarget.style.color = tokens.interactive}
                      onMouseLeave={(e) => e.currentTarget.style.color = tokens.mutedForeground}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between pt-[32px] border-t gap-4" style={{ borderColor: tokens.borderProminent }}>
          <p className="text-[13px] leading-[1.50] tracking-[-0.13px]" style={{ color: tokens.mutedForeground }}>
            © 2026 {PRODUCT_NAME}. All rights reserved.
          </p>
          <a
            href="/"
            className={`${monoFont.variable} font-mono text-[11px] font-medium uppercase tracking-wider transition-colors`}
            style={{ color: tokens.tertiaryText }}
            onMouseEnter={(e) => e.currentTarget.style.color = tokens.interactive}
            onMouseLeave={(e) => e.currentTarget.style.color = tokens.tertiaryText}
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
    <div className={`${sansFont.variable} font-sans`} style={{ backgroundColor: tokens.background }}>
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
