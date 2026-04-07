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
import { Rubik, Space_Grotesk } from 'next/font/google'
import {
  Star, ChevronDown, ArrowRight, Check, Users, Zap, Globe, Shield,
  BookOpen, Layout, Palette, Code2, BarChart, Lock
} from 'lucide-react'

// ─────────────────────────────────────────────
// FONTS — replace with style-specific fonts
// ─────────────────────────────────────────────

// Sentry uses "Dammit Sans" for display and "Rubik" for UI.
// We'll use Space Grotesk as a substitute for Dammit Sans's personality
const displayFont = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const bodyFont = Rubik({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

// ─────────────────────────────────────────────
// DESIGN TOKENS — replace ALL values per style
// ─────────────────────────────────────────────
const tokens = {
  background: '#1f1633', // Deep Purple
  backgroundAlt: '#150f23', // Darker Purple
  foreground: '#ffffff', // Pure White
  muted: '#79628c', // Muted Purple
  mutedForeground: '#e5e7eb', // Light Gray
  border: '#362d59', // Border Purple
  accent: '#6a5fc1', // Sentry Purple
  accentForeground: '#ffffff',
  lime: '#c2ef4e', // Lime Green
  coral: '#ffb287', // Coral
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
const PRODUCT_NAME = 'Sentry'
const TAGLINE = 'Code breaks. Fix it faster.'
const DESCRIPTION = 'Application monitoring that helps developers see performance issues, fix errors faster, and optimize their code health.'

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
      style={{ borderColor: tokens.border, backgroundColor: 'rgba(31, 22, 51, 0.8)' }}
    >
      <div className="max-w-[1152px] mx-auto px-6 h-16 flex items-center justify-between">
        <span className={`font-bold text-[24px] ${displayFont.variable} font-display`} style={{ color: tokens.foreground }}>
          {PRODUCT_NAME}
        </span>
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className={`text-[15px] font-medium transition-colors uppercase tracking-[0.2px] ${bodyFont.variable} font-body`}
              style={{ color: tokens.foreground }}
              onMouseEnter={(e) => e.currentTarget.style.color = tokens.accent}
              onMouseLeave={(e) => e.currentTarget.style.color = tokens.foreground}
            >
              {link}
            </a>
          ))}
        </div>
        <div className="flex gap-4">
          <motion.button
            whileHover={{ backgroundColor: tokens.accent, color: tokens.foreground }}
            className={`px-[16px] py-[12px] rounded-[8px] text-[14px] font-bold uppercase tracking-[0.2px] ${bodyFont.variable} font-body transition-colors`}
            style={{ backgroundColor: tokens.foreground, color: '#1f1633' }}
          >
            Get Started
          </motion.button>
        </div>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section className="min-h-dvh flex items-center pt-24 pb-32 relative overflow-hidden" style={{ backgroundColor: tokens.background }}>
      {/* Deep purple ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full pointer-events-none z-0"
        style={{ boxShadow: 'rgba(22, 15, 36, 0.9) 0px 4px 4px 9px', background: 'radial-gradient(circle, rgba(106,95,193,0.15) 0%, rgba(31,22,51,0) 70%)' }}
      ></div>

      <div className="max-w-[1152px] mx-auto px-6 w-full relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.15, delayChildren: 0.1 }}
          className="max-w-4xl mx-auto flex flex-col items-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`text-[12px] font-semibold uppercase tracking-[0.25px] mb-6 px-3 py-1 rounded-[18px]`}
            style={{ color: tokens.lime, backgroundColor: 'rgba(194, 239, 78, 0.1)', border: `1px solid ${tokens.lime}` }}
          >
            New: Session Replay
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className={`text-[60px] md:text-[88px] font-bold leading-[1.20] mb-6 ${displayFont.variable} font-display`}
            style={{ color: tokens.foreground }}
          >
            {TAGLINE}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`text-[18px] md:text-[20px] mb-10 max-w-2xl leading-[1.50] ${bodyFont.variable} font-body`}
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
              whileHover={{ boxShadow: 'rgba(0, 0, 0, 0.18) 0px 0.5rem 1.5rem', y: -2 }}
              whileTap={{ boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px inset', y: 0 }}
              className={`px-[24px] py-[16px] rounded-[13px] text-[14px] font-bold uppercase tracking-[0.2px] ${bodyFont.variable} font-body transition-all`}
              style={{
                backgroundColor: tokens.muted,
                color: tokens.foreground,
                border: `1px solid #584674`,
                boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px inset'
              }}
            >
              Get Started
            </motion.button>
            <motion.button
              whileHover={{ backgroundColor: 'rgba(54, 22, 107, 0.14)' }}
              className={`px-[24px] py-[16px] rounded-[12px] text-[14px] font-bold uppercase tracking-[0.2px] ${bodyFont.variable} font-body transition-colors`}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.18)',
                color: tokens.foreground,
                boxShadow: 'rgba(0, 0, 0, 0.08) 0px 2px 8px',
                backdropFilter: 'blur(18px) saturate(180%)'
              }}
            >
              Request a demo
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Decorative App Window */}
        <FadeUp delay={0.4}>
          <div
            className="mt-20 w-full max-w-5xl mx-auto h-72 md:h-96 rounded-[12px] overflow-hidden"
            style={{
              backgroundColor: tokens.backgroundAlt,
              border: `1px solid ${tokens.border}`,
              boxShadow: 'rgba(0, 0, 0, 0.25) 0px 25px 50px -12px'
            }}
          >
            {/* Title bar */}
            <div className="flex items-center px-4 py-3 border-b" style={{ borderColor: tokens.border, backgroundColor: 'rgba(255, 255, 255, 0.02)' }}>
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
              </div>
            </div>
            {/* Fake code content */}
            <div className="p-6 text-left font-mono text-[14px] leading-[1.5]" style={{ color: tokens.mutedForeground }}>
              <p><span style={{ color: '#fa7faa' }}>import</span> * <span style={{ color: '#fa7faa' }}>as</span> Sentry <span style={{ color: '#fa7faa' }}>from</span> <span style={{ color: '#c2ef4e' }}>"@sentry/browser"</span>;</p>
              <br/>
              <p>Sentry.<span style={{ color: '#dcdcaa' }}>init</span>({'{'}</p>
              <p className="pl-4">dsn: <span style={{ color: '#c2ef4e' }}>"https://examplePublicKey@o0.ingest.sentry.io/0"</span>,</p>
              <p className="pl-4">integrations: [</p>
              <p className="pl-8">Sentry.<span style={{ color: '#dcdcaa' }}>browserTracingIntegration</span>(),</p>
              <p className="pl-8">Sentry.<span style={{ color: '#dcdcaa' }}>replayIntegration</span>(),</p>
              <p className="pl-4">],</p>
              <p className="pl-4">tracesSampleRate: <span style={{ color: '#ffb287' }}>1.0</span>,</p>
              <p className="pl-4">replaysSessionSampleRate: <span style={{ color: '#ffb287' }}>0.1</span>,</p>
              <p className="pl-4">replaysOnErrorSampleRate: <span style={{ color: '#ffb287' }}>1.0</span>,</p>
              <p>{'}'});</p>
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
      <div className="max-w-[1152px] mx-auto px-6 py-16">
        <StaggerContainer>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map(stat => (
              <motion.div key={stat.label} variants={staggerItem} className="text-center">
                <p className={`text-[30px] font-bold mb-1 ${bodyFont.variable} font-body`} style={{ color: tokens.lime }}>{stat.value}</p>
                <p className={`text-[12px] font-semibold uppercase tracking-[0.25px] ${bodyFont.variable} font-body`} style={{ color: tokens.mutedForeground }}>{stat.label}</p>
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
      <div className="max-w-[1152px] mx-auto px-6">
        <FadeUp>
          <div className="text-center mb-16">
            <h2 className={`text-[30px] md:text-[40px] font-normal leading-[1.20] mb-4 ${bodyFont.variable} font-body`} style={{ color: tokens.foreground }}>
              Application monitoring that actually helps
            </h2>
            <p className={`text-[16px] max-w-2xl mx-auto leading-[1.50] ${bodyFont.variable} font-body`} style={{ color: tokens.mutedForeground }}>
              Stop guessing why errors happen. Get the full context to solve issues before they impact your users.
            </p>
          </div>
        </FadeUp>
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FEATURES.map(feature => (
              <motion.div
                key={feature.title}
                variants={staggerItem}
                whileHover={{ y: -4, boxShadow: 'rgba(0, 0, 0, 0.1) 0px 10px 15px -3px' }}
                transition={{ duration: 0.2 }}
                className="p-8 rounded-[8px] border"
                style={{ borderColor: tokens.border, backgroundColor: tokens.backgroundAlt }}
              >
                <feature.icon className="h-8 w-8 mb-6" style={{ color: tokens.accent }} strokeWidth={1.5} />
                <h3 className={`font-semibold text-[20px] leading-[1.25] mb-3 ${bodyFont.variable} font-body`} style={{ color: tokens.foreground }}>{feature.title}</h3>
                <p className={`text-[16px] leading-[1.50] ${bodyFont.variable} font-body`} style={{ color: tokens.mutedForeground }}>{feature.description}</p>
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
      <div className="max-w-[1152px] mx-auto px-6">
        <FadeUp>
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1 space-y-6">
              <div className={`text-[12px] font-semibold uppercase tracking-[0.25px] px-3 py-1 rounded-[18px] inline-block`} style={{ color: tokens.coral, backgroundColor: 'rgba(255, 178, 135, 0.1)', border: `1px solid ${tokens.coral}` }}>
                Performance Monitoring
              </div>
              <h2 className={`text-[30px] md:text-[40px] font-normal leading-[1.20] ${bodyFont.variable} font-body`} style={{ color: tokens.foreground }}>
                Trace issues from frontend to backend
              </h2>
              <div className="space-y-4">
                <p className={`text-[16px] leading-[1.50] ${bodyFont.variable} font-body`} style={{ color: tokens.mutedForeground }}>
                  Distributed tracing connects the dots between frontend requests and backend database queries. See exactly where your application is slowing down.
                </p>
                <p className={`text-[16px] leading-[1.50] ${bodyFont.variable} font-body`} style={{ color: tokens.mutedForeground }}>
                  Identify N+1 queries, slow API calls, and asset loading issues in a single view.
                </p>
              </div>
              <motion.button
                whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.18)' }}
                className={`mt-4 px-[16px] py-[12px] rounded-[12px] text-[14px] font-bold uppercase tracking-[0.2px] ${bodyFont.variable} font-body transition-colors border`}
                style={{
                  backgroundColor: 'transparent',
                  color: tokens.foreground,
                  borderColor: tokens.border,
                }}
              >
                Explore Tracing
              </motion.button>
            </div>
            <div className="flex-1 w-full">
              <div className="w-full aspect-video rounded-[12px] overflow-hidden" style={{ backgroundColor: tokens.background, border: `1px solid ${tokens.border}`, boxShadow: 'rgba(0, 0, 0, 0.25) 0px 25px 50px -12px' }}>
                <div className="p-4 border-b flex justify-between items-center" style={{ borderColor: tokens.border }}>
                  <div className="text-[14px] font-mono" style={{ color: tokens.mutedForeground }}>Trace ID: <span style={{ color: tokens.lime }}>a1b2c3d4e5f6</span></div>
                  <div className="text-[14px] font-mono" style={{ color: tokens.foreground }}>1.24s</div>
                </div>
                <div className="p-4 space-y-2">
                  <div className="h-6 w-full rounded-[4px]" style={{ backgroundColor: 'rgba(106, 95, 193, 0.2)' }}>
                    <div className="h-full w-full rounded-[4px]" style={{ backgroundColor: tokens.accent }}></div>
                  </div>
                  <div className="h-6 w-full rounded-[4px] flex" style={{ backgroundColor: 'rgba(106, 95, 193, 0.2)' }}>
                    <div className="w-1/4"></div>
                    <div className="h-full w-1/2 rounded-[4px]" style={{ backgroundColor: tokens.lime }}></div>
                  </div>
                  <div className="h-6 w-full rounded-[4px] flex" style={{ backgroundColor: 'rgba(106, 95, 193, 0.2)' }}>
                    <div className="w-1/2"></div>
                    <div className="h-full w-1/4 rounded-[4px]" style={{ backgroundColor: tokens.coral }}></div>
                  </div>
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
    <section id="pricing" className="py-24" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-[1152px] mx-auto px-6">
        <FadeUp>
          <div className="text-center mb-16">
            <div className={`text-[12px] font-semibold uppercase tracking-[0.25px] mb-4 px-3 py-1 rounded-[18px] inline-block`} style={{ color: tokens.lime, backgroundColor: 'rgba(194, 239, 78, 0.1)', border: `1px solid ${tokens.lime}` }}>
              Pricing
            </div>
            <h2 className={`text-[30px] md:text-[40px] font-normal leading-[1.20] mb-4 ${bodyFont.variable} font-body`} style={{ color: tokens.foreground }}>Fair pricing for all developers</h2>
            <p className={`text-[16px] leading-[1.50] ${bodyFont.variable} font-body`} style={{ color: tokens.mutedForeground }}>Pay for what you use, when you use it.</p>
          </div>
        </FadeUp>
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRICING.map(tier => (
              <motion.div
                key={tier.name}
                variants={staggerItem}
                className="p-8 rounded-[12px] border relative flex flex-col"
                style={{
                  borderColor: tier.highlighted ? tokens.accent : tokens.border,
                  backgroundColor: tier.highlighted ? 'rgba(54, 22, 107, 0.14)' : tokens.backgroundAlt,
                  boxShadow: tier.highlighted ? 'rgba(106, 95, 193, 0.2) 0px 4px 20px' : 'none',
                }}
              >
                <h3 className={`font-semibold text-[24px] leading-[1.25] mb-2 ${bodyFont.variable} font-body`} style={{ color: tokens.foreground }}>{tier.name}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className={`text-[36px] font-bold ${displayFont.variable} font-display`} style={{ color: tokens.foreground }}>{tier.price}</span>
                  <span className={`text-[16px] ${bodyFont.variable} font-body`} style={{ color: tokens.mutedForeground }}>/ {tier.period}</span>
                </div>
                <p className={`text-[14px] leading-[1.43] mb-6 ${bodyFont.variable} font-body`} style={{ color: tokens.mutedForeground }}>{tier.description}</p>
                <ul className="space-y-4 mb-8 flex-1">
                  {tier.features.map(f => (
                    <li key={f} className={`flex items-start gap-3 text-[14px] leading-[1.43] ${bodyFont.variable} font-body`}>
                      <Check className="h-5 w-5 flex-shrink-0" style={{ color: tokens.lime }} />
                      <span style={{ color: tokens.foreground }}>{f}</span>
                    </li>
                  ))}
                </ul>
                <motion.button
                  whileHover={{ boxShadow: tier.highlighted ? 'rgba(0, 0, 0, 0.18) 0px 0.5rem 1.5rem' : 'rgba(255, 255, 255, 0.05) 0px 0.5rem 1.5rem', y: -2 }}
                  whileTap={{ boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px inset', y: 0 }}
                  className={`w-full py-[12px] rounded-[8px] text-[14px] font-bold uppercase tracking-[0.2px] ${bodyFont.variable} font-body transition-all`}
                  style={tier.highlighted
                    ? {
                        backgroundColor: '#ffffff',
                        color: '#1f1633',
                        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 2px 5px'
                      }
                    : {
                        backgroundColor: tokens.muted,
                        color: tokens.foreground,
                        border: `1px solid #584674`,
                        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px inset'
                      }
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
      <div className="max-w-[1152px] mx-auto px-6">
        <FadeUp>
          <div className="text-center mb-16">
            <h2 className={`text-[30px] md:text-[40px] font-normal leading-[1.20] ${bodyFont.variable} font-body`} style={{ color: tokens.foreground }}>100,000+ organizations trust us</h2>
          </div>
        </FadeUp>
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map(t => (
              <motion.div
                key={t.name}
                variants={staggerItem}
                className="p-8 rounded-[12px] border"
                style={{
                  borderColor: tokens.border,
                  backgroundColor: tokens.background,
                  boxShadow: 'rgba(0, 0, 0, 0.1) 0px 10px 15px -3px'
                }}
              >
                <div className="flex mb-6">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" style={{ color: tokens.coral }} />
                  ))}
                </div>
                <p className={`text-[16px] leading-[1.50] mb-8 ${bodyFont.variable} font-body`} style={{ color: tokens.foreground }}>"{t.text}"</p>
                <div>
                  <p className={`font-semibold text-[15px] ${bodyFont.variable} font-body`} style={{ color: tokens.foreground }}>{t.name}</p>
                  <p className={`text-[14px] uppercase tracking-[0.2px] mt-1 ${bodyFont.variable} font-body`} style={{ color: tokens.mutedForeground }}>{t.role} · {t.company}</p>
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
            <h2 className={`text-[30px] md:text-[40px] font-normal leading-[1.20] ${bodyFont.variable} font-body`} style={{ color: tokens.foreground }}>Common questions</h2>
          </div>
        </FadeUp>
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, i) => (
            <FadeUp key={i} delay={i * 0.05}>
              <div className="border rounded-[8px] overflow-hidden" style={{ borderColor: tokens.border }}>
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  aria-expanded={openIndex === i}
                  className="w-full flex items-center justify-between p-6 text-left transition-colors"
                  style={{ backgroundColor: openIndex === i ? 'rgba(54, 22, 107, 0.14)' : tokens.backgroundAlt }}
                >
                  <span className={`font-semibold text-[18px] leading-[1.25] ${bodyFont.variable} font-body`} style={{ color: tokens.foreground }}>{item.q}</span>
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
                  style={{ overflow: 'hidden', backgroundColor: tokens.backgroundAlt }}
                >
                  <p className={`px-6 pb-6 text-[16px] leading-[1.50] ${bodyFont.variable} font-body`} style={{ color: tokens.mutedForeground }}>
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
    <section className="py-24 border-y relative overflow-hidden" style={{ borderColor: tokens.border, backgroundColor: tokens.backgroundAlt }}>
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full pointer-events-none z-0"
        style={{ boxShadow: 'rgba(22, 15, 36, 0.9) 0px 4px 4px 9px', background: 'radial-gradient(circle, rgba(106,95,193,0.1) 0%, rgba(31,22,51,0) 70%)' }}
      ></div>

      <div className="max-w-[1152px] mx-auto px-6 text-center relative z-10">
        <FadeUp>
          <h2 className={`text-[30px] md:text-[40px] font-normal leading-[1.20] mb-4 ${bodyFont.variable} font-body`} style={{ color: tokens.foreground }}>Stay in the loop</h2>
          <p className={`text-[16px] leading-[1.50] mb-8 max-w-2xl mx-auto ${bodyFont.variable} font-body`} style={{ color: tokens.mutedForeground }}>
            Get updates on new features and releases. No spam, ever.
          </p>
          {status === 'success' ? (
            <p className={`font-semibold text-[16px] ${bodyFont.variable} font-body`} style={{ color: tokens.lime }}>✓ You're on the list!</p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <label htmlFor="newsletter-email" className="sr-only">Email address</label>
              <input
                id="newsletter-email"
                type="email"
                required
                autoComplete="email"
                placeholder="your@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className={`flex-1 h-[48px] px-[16px] rounded-[6px] border text-[16px] focus:outline-none transition-shadow ${bodyFont.variable} font-body`}
                style={{ borderColor: '#cfcfdb', backgroundColor: '#ffffff', color: '#1f1633' }}
                onFocus={(e) => {
                  e.currentTarget.style.boxShadow = 'rgba(0, 0, 0, 0.15) 0px 2px 10px inset';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
              <motion.button
                type="submit"
                disabled={status === 'loading'}
                whileHover={{ boxShadow: 'rgba(0, 0, 0, 0.18) 0px 0.5rem 1.5rem', y: -2 }}
                whileTap={{ boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px inset', y: 0 }}
                className={`h-[48px] px-[24px] rounded-[8px] font-bold uppercase tracking-[0.2px] text-[14px] disabled:opacity-60 ${bodyFont.variable} font-body`}
                style={{
                  backgroundColor: tokens.muted,
                  color: tokens.foreground,
                  border: `1px solid #584674`,
                  boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px inset'
                }}
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
    <footer className="py-20" style={{ backgroundColor: '#150f23' }}>
      <div className="max-w-[1152px] mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-16">
          <div className="col-span-2 md:col-span-1">
            <p className={`font-bold text-[24px] mb-4 ${displayFont.variable} font-display`} style={{ color: tokens.foreground }}>{PRODUCT_NAME}</p>
            <p className={`text-[14px] leading-[1.50] ${bodyFont.variable} font-body`} style={{ color: tokens.mutedForeground }}>
              Code breaks. Fix it faster.
            </p>
          </div>
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <p className={`font-semibold text-[15px] uppercase tracking-[0.2px] mb-6 ${bodyFont.variable} font-body`} style={{ color: tokens.foreground }}>{group}</p>
              <ul className="space-y-4">
                {items.map(item => (
                  <li key={item}>
                    <a
                      href="#"
                      className={`text-[15px] transition-colors ${bodyFont.variable} font-body`}
                      style={{ color: tokens.mutedForeground }}
                      onMouseEnter={(e) => e.currentTarget.style.color = tokens.foreground}
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
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t gap-4" style={{ borderColor: tokens.border }}>
          <p className={`text-[14px] ${bodyFont.variable} font-body`} style={{ color: tokens.mutedForeground }}>
            © 2026 {PRODUCT_NAME}. All rights reserved.
          </p>
          <a
            href="/"
            className={`text-[12px] px-[12px] py-[6px] rounded-[6px] border font-semibold uppercase tracking-[0.25px] transition-colors ${bodyFont.variable} font-body`}
            style={{ borderColor: tokens.border, color: tokens.mutedForeground }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = tokens.foreground;
              e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = tokens.mutedForeground;
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
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
