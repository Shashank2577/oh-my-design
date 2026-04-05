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
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import {
  Star, ChevronDown, ArrowRight, Check, Users, Zap, Globe, Shield,
  BookOpen, Layout, Palette, Code2, BarChart, Lock
} from 'lucide-react'

// ─────────────────────────────────────────────
// FONTS — replace with style-specific fonts
// ─────────────────────────────────────────────
const bodyFont = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

// ─────────────────────────────────────────────
// DESIGN TOKENS — replace ALL values per style
// ─────────────────────────────────────────────
const tokens = {
  background: '#faf9f7', // Warm Cream
  backgroundAlt: '#ffffff', // White
  foreground: '#000000', // Clay Black
  muted: '#f2f0ea', // Muted Oat
  mutedForeground: '#9f9b93', // Warm Silver
  border: '#dad4c8', // Oat Border
  accent: '#434346', // Dark Swatch
  accentForeground: '#ffffff', // White
}

// Swatch colors
const swatches = {
  matcha: '#02492a', // Matcha 800
  slushie: '#3bd3fd', // Slushie 500
  lemon: '#fbbd41', // Lemon 500
  ube: '#43089f', // Ube 800
  pomegranate: '#fc7981', // Pomegranate 400
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
const PRODUCT_NAME = 'Clay'
const TAGLINE = 'Maximize your outbound scale'
const DESCRIPTION = 'Clay helps you build the best outbound campaigns with personalized data from over 50 providers. Build lists, craft emails, and scale.'

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
        <span className="font-semibold text-lg tracking-tight" style={{ color: tokens.foreground }}>
          {PRODUCT_NAME}
        </span>
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-[15px] font-medium transition-colors hover:opacity-80"
              style={{ color: tokens.foreground }}
            >
              {link}
            </a>
          ))}
        </div>
        <motion.button
          whileHover={{ y: -4, rotateZ: -8, boxShadow: '-7px 7px 0px rgba(0,0,0,1)' }}
          whileTap={{ scale: 0.98 }}
          className="px-5 h-10 rounded-full text-[15px] font-medium transition-all"
          style={{ backgroundColor: tokens.accent, color: tokens.accentForeground }}
        >
          Start for free
        </motion.button>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section className="min-h-dvh flex flex-col justify-center pt-24 pb-16" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-5xl mx-auto px-6 w-full text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.15, delayChildren: 0.1 }}
          className="max-w-4xl mx-auto flex flex-col items-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-[52px] md:text-[80px] font-semibold leading-[1.00] tracking-tight mb-6"
            style={{ color: tokens.foreground, letterSpacing: '-0.04em' }}
          >
            {TAGLINE}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[20px] mb-10 max-w-2xl leading-[1.40]"
            style={{ color: tokens.mutedForeground }}
          >
            {DESCRIPTION}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <motion.button
              whileHover={{ y: -4, rotateZ: -8, boxShadow: '-7px 7px 0px rgba(0,0,0,1)' }}
              whileTap={{ scale: 0.98 }}
              className="h-[52px] px-8 rounded-[12px] font-semibold flex items-center justify-center gap-2 transition-all"
              style={{ backgroundColor: tokens.foreground, color: tokens.backgroundAlt }}
            >
              Start for free
            </motion.button>
            <motion.button
              whileHover={{ y: -4, rotateZ: -8, boxShadow: '-7px 7px 0px rgba(0,0,0,1)', backgroundColor: swatches.pomegranate, color: 'white', borderColor: swatches.pomegranate }}
              whileTap={{ scale: 0.98 }}
              className="h-[52px] px-8 rounded-[4px] font-medium flex items-center justify-center border transition-all"
              style={{ borderColor: '#717989', color: tokens.foreground, backgroundColor: 'transparent' }}
            >
              Talk to Sales
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Hero Visual */}
        <FadeUp delay={0.4}>
          <div
            className="mt-20 w-full h-72 md:h-[500px] rounded-[24px] overflow-hidden"
            style={{
              backgroundColor: tokens.backgroundAlt,
              border: `1px solid ${tokens.border}`,
              boxShadow: 'rgba(0,0,0,0.1) 0px 1px 1px, rgba(0,0,0,0.04) 0px -1px 1px inset, rgba(0,0,0,0.05) 0px -0.5px 1px'
            }}
          />
        </FadeUp>
      </div>
    </section>
  )
}

function Stats() {
  return (
    <section className="py-24" style={{ backgroundColor: swatches.matcha }}>
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-[36px] md:text-[44px] font-semibold text-white tracking-tight leading-[1.1]">Trusted by fast-growing teams</h2>
        </div>
        <StaggerContainer>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map(stat => (
              <motion.div key={stat.label} variants={staggerItem} className="text-center">
                <p className="text-4xl md:text-[56px] font-semibold mb-2 text-white tracking-tight leading-[1.0]">{stat.value}</p>
                <p className="text-[16px] font-medium" style={{ color: '#84e7a5' }}>{stat.label}</p>
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
          <div className="mb-16">
            <p className="text-[12px] uppercase tracking-[1.08px] font-semibold mb-6" style={{ color: tokens.mutedForeground }}>
              Data Sources
            </p>
            <h2 className="text-[44px] md:text-[56px] font-semibold mb-6 tracking-tight leading-[1.05]" style={{ color: tokens.foreground, letterSpacing: '-0.03em' }}>
              Any data point, any provider.
            </h2>
            <p className="text-[20px] max-w-2xl" style={{ color: tokens.mutedForeground, lineHeight: '1.40' }}>
              Combine data from dozens of data providers natively within Clay.
            </p>
          </div>
        </FadeUp>
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FEATURES.map(feature => (
              <motion.div
                key={feature.title}
                variants={staggerItem}
                className="p-8 rounded-[24px] bg-white transition-shadow hover:shadow-lg"
                style={{
                  border: `1px solid ${tokens.border}`,
                  boxShadow: 'rgba(0,0,0,0.1) 0px 1px 1px, rgba(0,0,0,0.04) 0px -1px 1px inset'
                }}
              >
                <div className="w-12 h-12 rounded-[12px] flex items-center justify-center mb-6" style={{ backgroundColor: tokens.muted }}>
                  <feature.icon className="h-6 w-6" style={{ color: tokens.foreground }} strokeWidth={2} />
                </div>
                <h3 className="font-semibold text-[24px] mb-3 tracking-tight" style={{ color: tokens.foreground, letterSpacing: '-0.02em' }}>{feature.title}</h3>
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
    <section className="py-32" style={{ backgroundColor: swatches.ube }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <FadeUp>
            <div>
              <p className="text-[12px] uppercase tracking-[1.08px] font-semibold mb-6 text-white/70">
                AI Agent
              </p>
              <h2 className="text-[44px] md:text-[56px] font-semibold mb-6 text-white tracking-tight leading-[1.05]" style={{ letterSpacing: '-0.03em' }}>
                AI that actually does work for you.
              </h2>
              <p className="text-[20px] text-[#bda4ff] mb-8 leading-[1.40]">
                Tell Claygent what you need to know about a company or person. It'll read websites and search the web to find the answer.
              </p>
              <motion.button
                whileHover={{ y: -4, rotateZ: -8, boxShadow: '-7px 7px 0px rgba(0,0,0,1)' }}
                whileTap={{ scale: 0.98 }}
                className="h-[48px] px-6 rounded-[12px] font-semibold flex items-center justify-center transition-all bg-white text-black"
              >
                Meet Claygent
              </motion.button>
            </div>
          </FadeUp>
          <FadeUp delay={0.2}>
            <div
              className="w-full aspect-[4/3] rounded-[24px] bg-white p-8 relative"
              style={{ boxShadow: 'rgba(0,0,0,0.2) 0px 20px 40px' }}
            >
               {/* Abstract content illustration */}
               <div className="w-3/4 h-8 bg-gray-100 rounded-full mb-4"></div>
               <div className="w-1/2 h-8 bg-gray-100 rounded-full mb-12"></div>

               <div className="w-full h-32 border border-dashed border-gray-300 rounded-[12px] flex items-center justify-center">
                 <p className="text-gray-400 font-medium">Search results area</p>
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
      <div className="max-w-6xl mx-auto px-6">
        <FadeUp>
          <div className="text-center mb-20">
            <h2 className="text-[44px] md:text-[64px] font-semibold mb-6 tracking-tight leading-[1.00]" style={{ color: tokens.foreground, letterSpacing: '-0.04em' }}>Start for free.<br/>Upgrade when you need to.</h2>
          </div>
        </FadeUp>
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRICING.map(tier => (
              <motion.div
                key={tier.name}
                variants={staggerItem}
                className="p-8 rounded-[24px] relative bg-white flex flex-col"
                style={{
                  border: `1px solid ${tier.highlighted ? swatches.slushie : tokens.border}`,
                  boxShadow: tier.highlighted ? `0 0 0 2px ${swatches.slushie}` : 'rgba(0,0,0,0.1) 0px 1px 1px, rgba(0,0,0,0.04) 0px -1px 1px inset',
                }}
              >
                {tier.highlighted && (
                  <span
                    className="absolute -top-3 right-8 px-3 py-1 text-[12px] font-semibold uppercase tracking-[1.08px] rounded-full"
                    style={{ backgroundColor: swatches.slushie, color: tokens.foreground }}
                  >
                    Recommended
                  </span>
                )}
                <h3 className="font-semibold text-[24px] mb-2 tracking-tight" style={{ color: tokens.foreground }}>{tier.name}</h3>
                <p className="text-[15px] mb-8" style={{ color: tokens.mutedForeground }}>{tier.description}</p>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-[48px] font-semibold tracking-tight leading-[1.0]" style={{ color: tokens.foreground }}>{tier.price}</span>
                  <span className="text-[15px]" style={{ color: tokens.mutedForeground }}>{tier.period !== 'forever' ? '/mo' : ''}</span>
                </div>

                <motion.button
                  whileHover={{ y: -4, rotateZ: -8, boxShadow: '-7px 7px 0px rgba(0,0,0,1)' }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full h-[48px] rounded-[12px] font-semibold text-[15px] mb-10 transition-all border"
                  style={tier.highlighted
                    ? { backgroundColor: tokens.foreground, color: tokens.backgroundAlt, borderColor: tokens.foreground }
                    : { backgroundColor: 'transparent', color: tokens.foreground, borderColor: '#717989' }
                  }
                >
                  {tier.cta}
                </motion.button>

                <div className="mt-auto">
                  <p className="text-[13px] font-semibold uppercase tracking-[1.08px] mb-4" style={{ color: tokens.foreground }}>Includes</p>
                  <ul className="space-y-4">
                    {tier.features.map(f => (
                      <li key={f} className="flex items-start gap-3 text-[15px]">
                        <Check className="h-5 w-5 flex-shrink-0" style={{ color: tokens.foreground }} strokeWidth={2} />
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
    <section id="testimonials" className="py-32" style={{ backgroundColor: swatches.lemon }}>
      <div className="max-w-6xl mx-auto px-6">
        <FadeUp>
          <div className="mb-16 text-center">
            <h2 className="text-[44px] md:text-[56px] font-semibold text-black tracking-tight leading-[1.05]" style={{ letterSpacing: '-0.03em' }}>People are talking</h2>
          </div>
        </FadeUp>
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map(t => (
              <motion.div
                key={t.name}
                variants={staggerItem}
                className="p-8 rounded-[24px] bg-white border border-[#dad4c8]"
                style={{ boxShadow: 'rgba(0,0,0,0.1) 0px 1px 1px, rgba(0,0,0,0.04) 0px -1px 1px inset' }}
              >
                <div className="flex mb-6 text-black">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <p className="text-[18px] leading-[1.50] mb-8 font-medium" style={{ color: tokens.foreground }}>"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                  <div>
                    <p className="font-semibold text-[15px]" style={{ color: tokens.foreground }}>{t.name}</p>
                    <p className="text-[14px]" style={{ color: tokens.mutedForeground }}>{t.role}, {t.company}</p>
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
    <section id="faq" className="py-32" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-3xl mx-auto px-6">
        <FadeUp>
          <div className="text-center mb-16">
            <h2 className="text-[44px] md:text-[56px] font-semibold tracking-tight leading-[1.05]" style={{ color: tokens.foreground, letterSpacing: '-0.03em' }}>Got questions?</h2>
          </div>
        </FadeUp>
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, i) => (
            <FadeUp key={i} delay={i * 0.05}>
              <div className="border border-dashed rounded-[12px]" style={{ borderColor: tokens.border, backgroundColor: tokens.backgroundAlt }}>
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  aria-expanded={openIndex === i}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-semibold text-[18px]" style={{ color: tokens.foreground }}>{item.q}</span>
                  <motion.span
                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="h-5 w-5 flex-shrink-0" style={{ color: tokens.foreground }} />
                  </motion.span>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openIndex === i ? 'auto' : 0, opacity: openIndex === i ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' as const }}
                  style={{ overflow: 'hidden' }}
                >
                  <p className="px-6 pb-6 text-[16px] leading-[1.60]" style={{ color: tokens.mutedForeground }}>
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
    <section className="py-32 px-6" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-5xl mx-auto bg-black rounded-[40px] p-12 md:p-20 text-center relative overflow-hidden" style={{ color: 'white' }}>
        <FadeUp>
          <h2 className="text-[44px] md:text-[64px] font-semibold mb-6 tracking-tight leading-[1.00]" style={{ letterSpacing: '-0.04em' }}>Ready to scale?</h2>
          <p className="text-[20px] mb-10 max-w-2xl mx-auto" style={{ color: '#9f9b93' }}>
            Join thousands of growth teams building the best outbound campaigns.
          </p>
          <div className="flex justify-center">
            <motion.button
              whileHover={{ y: -4, rotateZ: -8, boxShadow: '-7px 7px 0px rgba(0,0,0,1)', backgroundColor: 'white' }}
              whileTap={{ scale: 0.98 }}
              className="h-[52px] px-8 rounded-[12px] font-semibold flex items-center justify-center transition-all bg-white text-black"
            >
              Start for free
            </motion.button>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

function Footer() {
  const links = {
    Product: ['Data Providers', 'Integrations', 'Pricing', 'Changelog'],
    Resources: ['Clay University', 'Templates', 'Community', 'Blog'],
    Company: ['About us', 'Careers', 'Twitter', 'LinkedIn'],
    Legal: ['Privacy Policy', 'Terms of Service', 'Security', 'Status'],
  }

  return (
    <footer className="py-20" style={{ backgroundColor: tokens.background, borderTop: `1px dashed ${tokens.border}` }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-16">
          <div className="col-span-2 md:col-span-1">
            <p className="font-semibold text-xl mb-4 tracking-tight" style={{ color: tokens.foreground }}>{PRODUCT_NAME}</p>
            <p className="text-[15px] leading-relaxed" style={{ color: tokens.mutedForeground }}>
              The best way to build outbound campaigns.
            </p>
          </div>
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <p className="font-semibold text-[15px] mb-6" style={{ color: tokens.foreground }}>{group}</p>
              <ul className="space-y-4">
                {items.map(item => (
                  <li key={item}>
                    <a href="#" className="text-[15px] font-medium hover:text-black transition-colors" style={{ color: tokens.mutedForeground }}>
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
            © 2025 Clay. All rights reserved.
          </p>
          <a
            href="/"
            className="text-[14px] font-medium px-4 py-2 rounded-full border hover:bg-gray-50 transition-colors"
            style={{ borderColor: tokens.border, color: tokens.foreground }}
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
