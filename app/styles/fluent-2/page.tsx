'use client'

import { motion, useReducedMotion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Inter } from 'next/font/google'
import {
  Star, ChevronDown, ArrowRight, Check, Users, Zap, Globe, Shield,
  BookOpen, Layout, Palette, Code2, BarChart, Lock, AppWindow, Cpu
} from 'lucide-react'

// ─────────────────────────────────────────────
// FONTS
// ─────────────────────────────────────────────
const bodyFont = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

// ─────────────────────────────────────────────
// DESIGN TOKENS
// ─────────────────────────────────────────────
const tokens = {
  background: '#F5F5F5', // surface-base (Mica canvas)
  backgroundAlt: '#FFFFFF', // surface-layer (Cards, elevated surfaces)
  foreground: '#242424', // text-primary
  muted: '#E0E0E0', // border-neutral
  mutedForeground: '#424242', // text-secondary
  border: '#E0E0E0', // border-neutral
  accent: '#0F6CBD', // bg-brand (Primary Action)
  accentHover: '#115EA3', // bg-brand-hover
  accentPressed: '#0C3B5E', // bg-brand-pressed
  accentForeground: '#FFFFFF',
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
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1], delay }}
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
        visible: { transition: { staggerChildren: 0.1 } },
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
const PRODUCT_NAME = 'AzureFlow'
const TAGLINE = 'Orchestrate tasks with seamless clarity'
const DESCRIPTION = 'Streamline your enterprise workflows with AzureFlow. Built entirely on the Fluent 2 design language, it feels familiar from the very first click.'

const NAV_LINKS = ['Features', 'Pricing', 'Testimonials', 'FAQ']

const STATS = [
  { value: '1.2B', label: 'Tasks automated' },
  { value: '99.9%', label: 'Uptime reliability' },
  { value: 'ISO', label: '27001 Certified' },
  { value: '24/7', label: 'Active Support' },
]

const FEATURES = [
  { icon: AppWindow, title: 'Native Integration', description: 'Integrates perfectly with Microsoft 365, Teams, and the entire Azure ecosystem.' },
  { icon: Shield, title: 'Zero-Trust Security', description: 'Enterprise-grade access controls enforced across every single data pipeline.' },
  { icon: BarChart, title: 'Power BI Ready', description: 'Export directly to Power BI for deep, actionable business intelligence.' },
  { icon: Cpu, title: 'AI-Powered Routing', description: 'Leverage Microsoft Copilot to automatically route tasks to the best team member.' },
  { icon: Globe, title: 'Global Availability', description: 'Deployed across 60+ Azure regions to guarantee low-latency performance globally.' },
  { icon: Lock, title: 'Data Residency', description: 'Strict compliance tools to ensure your data never leaves your chosen geography.' },
]

const PRICING = [
  {
    name: 'Basic',
    price: '$15',
    period: 'user / mo',
    description: 'Perfect for small teams getting started with automation.',
    features: ['Up to 10 users', 'Standard support', 'Basic workflow templates', 'M365 integration'],
    cta: 'Start trial',
    highlighted: false,
  },
  {
    name: 'Business',
    price: '$35',
    period: 'user / mo',
    description: 'Advanced capabilities for scaling organizations.',
    features: ['Unlimited users', 'Priority 24/7 support', 'Advanced reporting', 'Custom integrations', 'API access'],
    cta: 'Get started',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'annual contract',
    description: 'Dedicated infrastructure and tailored SLAs.',
    features: ['Dedicated tenant', 'Account manager', 'Custom contracts', 'On-premise option', 'Security review'],
    cta: 'Contact sales',
    highlighted: false,
  },
]

const TESTIMONIALS = [
  {
    name: 'Robert Hastings',
    role: 'CIO',
    company: 'Contoso Ltd.',
    text: 'AzureFlow felt like a natural extension of our existing Microsoft environment. Adoption was instantaneous and required zero formal training.',
    rating: 5,
  },
  {
    name: 'Emily Davis',
    role: 'IT Director',
    company: 'Fabrikam Inc.',
    text: 'The security features out of the box are unmatched. Knowing it relies on Azure Active Directory for RBAC gives our compliance team peace of mind.',
    rating: 5,
  },
  {
    name: 'Michael Chen',
    role: 'VP of Operations',
    company: 'Adventure Works',
    text: 'We replaced five different automation tools with AzureFlow. The centralized dashboard and Fluent 2 aesthetics make managing complex tasks surprisingly pleasant.',
    rating: 5,
  },
]

const FAQ_ITEMS = [
  { q: 'How does it integrate with Azure Active Directory?', a: 'We offer native Single Sign-On (SSO) integration with Entra ID (formerly Azure AD), allowing your team to use their existing Microsoft credentials with full role-based access control.' },
  { q: 'What kind of support is included?', a: 'Basic plans include business-hours email support. Business and Enterprise plans include 24/7 priority support with guaranteed SLAs for response times.' },
  { q: 'Can we deploy on our own infrastructure?', a: 'Yes, our Enterprise plan offers private cloud and Azure Stack deployment options for organizations with strict data residency and compliance requirements.' },
  { q: 'Is there a limit to data storage?', a: 'Storage limits depend on your tier. Business plans include 1TB per user pooled across the tenant, while Enterprise plans offer custom storage solutions tailored to your needs.' },
  { q: 'How long does implementation take?', a: 'Most teams are up and running within a week. Enterprise deployments typically involve a 30-day onboarding period with our implementation specialists to map your existing complex workflows.' },
  { q: 'Do you offer custom integrations?', a: 'We have a robust API and support custom integrations via our Enterprise tier, which includes dedicated engineering hours for setup. You can also build your own using our well-documented REST APIs.' },
]

// ─────────────────────────────────────────────
// COMPONENTS
// ─────────────────────────────────────────────

function Navbar() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-md bg-white/70"
      style={{ borderColor: tokens.border }}
    >
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <span className="font-semibold text-base" style={{ color: tokens.foreground }}>
          {PRODUCT_NAME}
        </span>
        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map(link => (
            <motion.a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-sm transition-colors hover:bg-neutral-100 px-2 py-1 rounded-md"
              style={{ color: tokens.mutedForeground }}
              whileHover={{ backgroundColor: 'rgba(0,0,0,0.05)' }}
            >
              {link}
            </motion.a>
          ))}
        </div>
        <motion.button
          whileHover={{ backgroundColor: tokens.accentHover }}
          whileTap={{ scale: 0.98, backgroundColor: tokens.accentPressed }}
          transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
          className="px-4 h-8 rounded-[4px] text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0F6CBD]"
          style={{ backgroundColor: tokens.accent, color: tokens.accentForeground }}
        >
          Sign in
        </motion.button>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section className="min-h-dvh flex items-center pt-14" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-6xl mx-auto px-6 py-24 w-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1, delayChildren: 0.1 }}
          className="max-w-3xl text-center mx-auto"
        >
          <motion.p
            variants={staggerItem}
            className="text-sm font-semibold mb-4"
            style={{ color: tokens.accent }}
          >
            Built for Windows Ecosystem
          </motion.p>
          <motion.h1
            variants={staggerItem}
            className="text-5xl md:text-6xl font-semibold leading-[1.1] mb-6 tracking-tight"
            style={{ color: tokens.foreground }}
          >
            {TAGLINE}
          </motion.h1>
          <motion.p
            variants={staggerItem}
            className="text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed"
            style={{ color: tokens.mutedForeground }}
          >
            {DESCRIPTION}
          </motion.p>
          <motion.div
            variants={staggerItem}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <motion.button
              whileHover={{ backgroundColor: tokens.accentHover }}
              whileTap={{ scale: 0.98, backgroundColor: tokens.accentPressed }}
              transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
              className="h-10 px-6 rounded-[4px] font-medium flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0F6CBD]"
              style={{ backgroundColor: tokens.accent, color: tokens.accentForeground }}
            >
              Start free trial <ArrowRight className="h-4 w-4" />
            </motion.button>
            <motion.button
              whileHover={{ backgroundColor: 'rgba(0,0,0,0.05)' }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
              className="h-10 px-6 rounded-[4px] font-medium border bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0F6CBD]"
              style={{ borderColor: tokens.border, color: tokens.foreground }}
            >
              Contact sales
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Hero Visual — Acrylic effect overlay */}
        <FadeUp delay={0.4}>
          <div className="mt-16 w-full relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0F6CBD]/10 to-transparent rounded-lg transform rotate-1" />
            <div
              className="relative w-full h-72 md:h-96 rounded-lg shadow-[0_4px_8px_rgba(0,0,0,0.14)] overflow-hidden border backdrop-blur-xl bg-white/60 flex items-center justify-center"
              style={{ borderColor: tokens.border }}
            >
              <AppWindow className="w-24 h-24 text-[#0F6CBD]/20" />
            </div>
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
                <p className="text-3xl font-semibold mb-1" style={{ color: tokens.foreground }}>{stat.value}</p>
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
            <h2 className="text-3xl font-semibold mb-4" style={{ color: tokens.foreground }}>
              Powerful capabilities
            </h2>
            <p className="text-base max-w-2xl mx-auto" style={{ color: tokens.mutedForeground }}>
              Everything your enterprise needs to scale securely and efficiently.
            </p>
          </div>
        </FadeUp>
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {FEATURES.map(feature => (
              <motion.div
                key={feature.title}
                variants={staggerItem}
                whileHover={{ y: -2, boxShadow: '0 2px 4px rgba(0,0,0,0.14)' }}
                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                className="p-6 rounded-lg border shadow-[0_1px_2px_rgba(0,0,0,0.12)]"
                style={{ borderColor: tokens.border, backgroundColor: tokens.backgroundAlt }}
              >
                <div className="w-10 h-10 rounded bg-[#0F6CBD]/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-5 w-5" style={{ color: tokens.accent }} />
                </div>
                <h3 className="font-semibold text-base mb-2" style={{ color: tokens.foreground }}>{feature.title}</h3>
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
            <h2 className="text-3xl font-semibold mb-8" style={{ color: tokens.foreground }}>
              Global, Personal, Connected
            </h2>
            <div className="space-y-6 text-left max-w-3xl mx-auto">
              <p className="text-base leading-relaxed" style={{ color: tokens.mutedForeground }}>
                Our architecture leverages the core principles of Fluent 2. It’s not just about clean interfaces; it’s about effortless utility. We blend the physical with the digital through thoughtful materials, light, and layered depth.
              </p>
              <p className="text-base leading-relaxed" style={{ color: tokens.mutedForeground }}>
                Inputs and interactions feel natural, responding with physics-based animations that mirror real-world mechanics. With built-in high contrast ratios and clear focus states, accessibility is engineered from the ground up, not added as an afterthought.
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
            <h2 className="text-3xl font-semibold mb-4" style={{ color: tokens.foreground }}>Transparent pricing</h2>
            <p className="text-base" style={{ color: tokens.mutedForeground }}>Select the plan that fits your organizational needs.</p>
          </div>
        </FadeUp>
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PRICING.map(tier => (
              <motion.div
                key={tier.name}
                variants={staggerItem}
                whileHover={{ y: -2, boxShadow: '0 2px 4px rgba(0,0,0,0.14)' }}
                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                className="p-6 rounded-lg border shadow-[0_1px_2px_rgba(0,0,0,0.12)] relative"
                style={{
                  borderColor: tier.highlighted ? tokens.accent : tokens.border,
                  backgroundColor: tokens.backgroundAlt,
                }}
              >
                {tier.highlighted && (
                  <div className="absolute top-0 left-0 right-0 h-1 rounded-t-lg" style={{ backgroundColor: tokens.accent }} />
                )}
                <h3 className="font-semibold text-lg mb-1 mt-2" style={{ color: tokens.foreground }}>{tier.name}</h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-3xl font-semibold" style={{ color: tokens.foreground }}>{tier.price}</span>
                  {tier.price !== 'Custom' && <span className="text-sm" style={{ color: tokens.mutedForeground }}>/ {tier.period}</span>}
                </div>
                <p className="text-sm mb-6 pb-6 border-b" style={{ color: tokens.mutedForeground, borderColor: tokens.border }}>{tier.description}</p>
                <ul className="space-y-3 mb-8">
                  {tier.features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: tokens.accent }} />
                      <span style={{ color: tokens.foreground }}>{f}</span>
                    </li>
                  ))}
                </ul>
                <motion.button
                  whileHover={{ backgroundColor: tier.highlighted ? tokens.accentHover : 'rgba(0,0,0,0.05)' }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                  className="w-full h-10 rounded-[4px] font-medium text-sm border focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0F6CBD]"
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
    <section id="testimonials" className="py-24 border-y" style={{ borderColor: tokens.border, backgroundColor: tokens.backgroundAlt }}>
      <div className="max-w-6xl mx-auto px-6">
        <FadeUp>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold" style={{ color: tokens.foreground }}>Trusted by IT Leaders</h2>
          </div>
        </FadeUp>
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {TESTIMONIALS.map(t => (
              <motion.div
                key={t.name}
                variants={staggerItem}
                className="p-6 rounded-lg border shadow-[0_1px_2px_rgba(0,0,0,0.12)]"
                style={{ borderColor: tokens.border, backgroundColor: tokens.background }}
              >
                <div className="flex mb-4 gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" style={{ color: tokens.accent }} />
                  ))}
                </div>
                <p className="text-sm leading-relaxed mb-6 italic" style={{ color: tokens.foreground }}>"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-neutral-200 flex items-center justify-center text-xs font-semibold" style={{ color: tokens.mutedForeground }}>
                    {t.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-semibold text-sm" style={{ color: tokens.foreground }}>{t.name}</p>
                    <p className="text-xs" style={{ color: tokens.mutedForeground }}>{t.role}, {t.company}</p>
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
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="py-24" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-3xl mx-auto px-6">
        <FadeUp>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold" style={{ color: tokens.foreground }}>Frequently asked questions</h2>
          </div>
        </FadeUp>
        <div className="space-y-2">
          {FAQ_ITEMS.map((item, i) => (
            <FadeUp key={i} delay={i * 0.05}>
              <div className="border rounded-lg bg-white shadow-[0_1px_2px_rgba(0,0,0,0.12)]" style={{ borderColor: tokens.border }}>
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  aria-expanded={openIndex === i}
                  className="w-full flex items-center justify-between p-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#0F6CBD] rounded-lg"
                >
                  <span className="font-medium text-sm" style={{ color: tokens.foreground }}>{item.q}</span>
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
                  <p className="px-4 pb-4 pt-1 text-sm leading-relaxed" style={{ color: tokens.mutedForeground }}>
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
  const [isFocused, setIsFocused] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setTimeout(() => setStatus('success'), 1200)
  }

  return (
    <section className="py-24 border-y" style={{ borderColor: tokens.border, backgroundColor: tokens.backgroundAlt }}>
      <div className="max-w-2xl mx-auto px-6 text-center">
        <FadeUp>
          <h2 className="text-3xl font-semibold mb-4" style={{ color: tokens.foreground }}>Stay up to date</h2>
          <p className="text-base mb-8" style={{ color: tokens.mutedForeground }}>
            Receive the latest updates on features and enterprise capabilities.
          </p>
          {status === 'success' ? (
            <p className="font-medium text-sm" style={{ color: tokens.accent }}>Subscription confirmed.</p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center items-end">
              <div className="flex-1 max-w-sm relative text-left w-full">
                <label htmlFor="newsletter-email" className="block text-sm font-medium mb-1" style={{ color: tokens.foreground }}>Email address</label>
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  className="w-full h-10 px-3 bg-neutral-50 text-sm outline-none transition-colors"
                  style={{
                    color: tokens.foreground,
                    borderBottom: `1px solid ${isFocused ? tokens.accent : tokens.border}`
                  }}
                />
                <motion.div
                  initial={false}
                  animate={{ scaleX: isFocused ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                  className="absolute bottom-0 left-0 right-0 h-0.5 origin-center"
                  style={{ backgroundColor: tokens.accent }}
                />
              </div>
              <motion.button
                type="submit"
                disabled={status === 'loading'}
                whileHover={{ backgroundColor: tokens.accentHover }}
                whileTap={{ scale: 0.98, backgroundColor: tokens.accentPressed }}
                transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                className="h-10 px-6 rounded-[4px] font-medium text-sm disabled:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0F6CBD] w-full sm:w-auto"
                style={{ backgroundColor: tokens.accent, color: tokens.accentForeground }}
              >
                {status === 'loading' ? 'Submitting...' : 'Subscribe'}
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
    Solutions: ['Enterprise', 'Startups', 'Public Sector', 'Education'],
    Platform: ['Architecture', 'Security', 'Compliance', 'Integrations'],
    Resources: ['Documentation', 'Microsoft Learn', 'Community', 'Support'],
    Company: ['About Us', 'Careers', 'Privacy', 'Terms of Service'],
  }

  return (
    <footer className="py-16" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <p className="font-semibold text-base mb-3" style={{ color: tokens.foreground }}>{PRODUCT_NAME}</p>
            <p className="text-sm leading-relaxed" style={{ color: tokens.mutedForeground }}>
              Empowering enterprise operations with familiar design and robust architecture.
            </p>
          </div>
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <p className="font-semibold text-sm mb-4" style={{ color: tokens.foreground }}>{group}</p>
              <ul className="space-y-3">
                {items.map(item => (
                  <li key={item}>
                    <a href="#" className="text-sm hover:underline hover:text-[#242424] transition-colors" style={{ color: tokens.mutedForeground }}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t gap-4" style={{ borderColor: tokens.border }}>
          <p className="text-xs" style={{ color: tokens.mutedForeground }}>
            © 2026 {PRODUCT_NAME}. All rights reserved.
          </p>
          <a
            href="/"
            className="text-xs px-3 py-1 rounded-[4px] border hover:bg-neutral-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0F6CBD]"
            style={{ borderColor: tokens.border, color: tokens.mutedForeground }}
          >
            ← Back to gallery
          </a>
        </div>
      </div>
    </footer>
  )
}

// ─────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────
export default function Fluent2StylePage() {
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
