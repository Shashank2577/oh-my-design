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
import { Inter } from 'next/font/google'
import {
  Star, ChevronDown, ArrowRight, Check, Users, Zap, Globe, Shield,
  BookOpen, Layout, Palette, Code2, BarChart, Lock
} from 'lucide-react'

// ─────────────────────────────────────────────
// FONTS — replace with style-specific fonts
// ─────────────────────────────────────────────

// Resend uses Domaine Display, ABC Favorit, Inter, Commit Mono. We substitute:
// - Playfair Display for Domaine (Serif display)
// - DM Sans for ABC Favorit (Geometric heading)
// - Inter for Body
// - JetBrains Mono for Code
import { Playfair_Display, DM_Sans, JetBrains_Mono } from 'next/font/google'

const bodyFont = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const displayFont = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const headingFont = DM_Sans({
  subsets: ['latin'],
  variable: '--font-heading',
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
  background: '#000000',
  backgroundAlt: 'rgba(255, 255, 255, 0.02)',
  foreground: '#f0f0f0',
  muted: '#111111',
  mutedForeground: '#a1a4a5',
  border: 'rgba(214, 235, 253, 0.19)',
  accent: '#ff801f', // Orange 10
  accentForeground: '#ffffff',
  green: 'rgba(17, 255, 153, 0.18)',
  blue: '#3b9eff',
  yellow: '#ffc53d',
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
const PRODUCT_NAME = 'Resend'
const TAGLINE = 'Email for developers'
const DESCRIPTION = 'The best API to reach humans instead of spam folders. Build, test, and deliver transactional emails at scale.'

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
      className="fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-md"
      style={{ borderColor: tokens.border, backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <span className="font-semibold text-lg tracking-wide flex items-center gap-2" style={{ color: tokens.foreground }}>
          <div className="w-5 h-5 bg-white rounded-sm"></div>
          {PRODUCT_NAME}
        </span>
        <div className={`hidden md:flex items-center gap-8 ${headingFont.variable} font-heading`}>
          {NAV_LINKS.map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-sm font-medium transition-colors hover:text-white tracking-[0.35px]"
              style={{ color: tokens.mutedForeground }}
            >
              {link}
            </a>
          ))}
        </div>
        <motion.button
          whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.28)' }}
          className="px-[12px] py-[5px] rounded-full text-[14px] font-medium border"
          style={{
            borderColor: tokens.border,
            backgroundColor: 'transparent',
            color: tokens.foreground
          }}
        >
          Sign In
        </motion.button>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section className="min-h-dvh flex flex-col items-center justify-center pt-24 text-center relative overflow-hidden" style={{ backgroundColor: tokens.background }}>
      {/* Decorative ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] blur-[120px] rounded-full opacity-20 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${tokens.accent} 0%, transparent 70%)` }}
      />
      <div className="max-w-5xl mx-auto px-6 py-24 w-full relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.15, delayChildren: 0.1 }}
          className="max-w-4xl flex flex-col items-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="px-[12px] py-[5px] rounded-full border mb-8 flex items-center gap-2"
            style={{ borderColor: tokens.border }}
          >
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: tokens.accent }}></span>
            <span className="text-[14px] font-medium" style={{ color: tokens.foreground }}>Introducing Broadcasts</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className={`text-[76.8px] md:text-[96px] font-normal leading-[1.00] tracking-[-0.96px] mb-8 ${displayFont.variable} font-display`}
            style={{ color: tokens.foreground }}
          >
            {TAGLINE}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[18px] md:text-[20px] mb-12 max-w-2xl leading-[1.5]"
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
              whileHover={{ opacity: 0.9 }}
              className="px-[24px] py-[12px] rounded-full text-[16px] font-medium flex items-center justify-center gap-2 transition-opacity"
              style={{ backgroundColor: '#ffffff', color: '#000000' }}
            >
              Get Started <ArrowRight className="h-4 w-4" />
            </motion.button>
            <motion.button
              whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
              className="px-[24px] py-[12px] rounded-full text-[16px] font-medium border flex items-center justify-center gap-2 transition-colors"
              style={{ borderColor: tokens.border, color: tokens.foreground }}
            >
              Documentation
            </motion.button>
          </motion.div>
        </motion.div>

        <FadeUp delay={0.4}>
          <div
            className={`mt-20 w-full max-w-4xl p-6 rounded-[24px] text-left text-[16px] leading-[1.5] ${monoFont.variable} font-mono`}
            style={{
              backgroundColor: tokens.muted,
              border: `1px solid ${tokens.border}`,
              boxShadow: 'rgba(176, 199, 217, 0.145) 0px 0px 0px 1px'
            }}
          >
            <div className="flex gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
              <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
            </div>
            <pre className="overflow-x-auto text-[#a1a4a5]">
              <code dangerouslySetInnerHTML={{ __html: `import { Resend } from 'resend';

const resend = new Resend('re_123456789');

<span style="color: ${tokens.blue}">await</span> resend.emails.<span style="color: ${tokens.yellow}">send</span>({
  from: <span style="color: ${tokens.green}">'you@example.com'</span>,
  to: <span style="color: ${tokens.green}">'user@gmail.com'</span>,
  subject: <span style="color: ${tokens.green}">'hello world'</span>,
  html: <span style="color: ${tokens.green}">'&lt;strong&gt;it works!&lt;/strong&gt;'</span>
});` }} />
            </pre>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

function Stats() {
  return (
    <section className="border-y" style={{ borderColor: tokens.border, backgroundColor: tokens.background }}>
      <div className="max-w-6xl mx-auto px-6 py-16">
        <StaggerContainer>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map(stat => (
              <motion.div key={stat.label} variants={staggerItem} className="text-center">
                <p className={`text-[56px] font-normal leading-[1.20] tracking-[-2.8px] mb-2 ${headingFont.variable} font-heading`} style={{ color: tokens.foreground }}>{stat.value}</p>
                <p className="text-[14px] font-medium tracking-[0.35px] uppercase" style={{ color: tokens.mutedForeground }}>{stat.label}</p>
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
          <div className="text-center mb-24">
            <h2 className={`text-[40px] md:text-[56px] font-normal leading-[1.20] tracking-[-2.8px] mb-6 ${headingFont.variable} font-heading`} style={{ color: tokens.foreground }}>
              Reach the inbox
            </h2>
            <p className="text-[18px] max-w-2xl mx-auto leading-[1.5]" style={{ color: tokens.mutedForeground }}>
              Stop wasting time fighting with email delivery. We handle the complexity so you can focus on building your product.
            </p>
          </div>
        </FadeUp>
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FEATURES.map((feature, i) => {
              // Assign different accent colors based on index
              const accents = [tokens.accent, tokens.blue, '#22ff99', tokens.yellow, '#ff2047', tokens.blue];
              const accent = accents[i % accents.length];

              return (
                <motion.div
                  key={feature.title}
                  variants={staggerItem}
                  className="p-8 rounded-[16px] border flex flex-col"
                  style={{
                    borderColor: tokens.border,
                    backgroundColor: tokens.backgroundAlt,
                    boxShadow: 'rgba(176, 199, 217, 0.145) 0px 0px 0px 1px'
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-[10px] flex items-center justify-center mb-6"
                    style={{ backgroundColor: `${accent}22` }}
                  >
                    <feature.icon className="h-6 w-6" style={{ color: accent }} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-semibold text-[24px] mb-3" style={{ color: tokens.foreground }}>{feature.title}</h3>
                  <p className="text-[16px] leading-[1.5]" style={{ color: tokens.mutedForeground }}>{feature.description}</p>
                </motion.div>
              )
            })}
          </div>
        </StaggerContainer>
      </div>
    </section>
  )
}

function ProductDetail() {
  return (
    <section className="py-32" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-6xl mx-auto px-6">
        <FadeUp>
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="flex-1 space-y-8">
              <h2 className={`text-[40px] md:text-[56px] font-normal leading-[1.20] tracking-[-2.8px] ${headingFont.variable} font-heading`} style={{ color: tokens.foreground }}>
                Develop with context
              </h2>
              <div className="space-y-6">
                <p className="text-[18px] leading-[1.5]" style={{ color: tokens.mutedForeground }}>
                  See what happens behind the scenes. Track bounces, blocks, and deliveries in real-time. Stop guessing why an email didn't arrive.
                </p>
                <ul className="space-y-4">
                  {['Real-time event tracking', 'Detailed delivery logs', 'Bounce and spam reports'].map(item => (
                    <li key={item} className="flex items-center gap-3 text-[16px]" style={{ color: tokens.foreground }}>
                      <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: `${tokens.accent}22` }}>
                        <Check className="h-3 w-3" style={{ color: tokens.accent }} strokeWidth={3} />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex-1 w-full">
              <div
                className="w-full aspect-square md:aspect-[4/3] rounded-[24px] p-2"
                style={{
                  backgroundColor: tokens.backgroundAlt,
                  border: `1px solid ${tokens.border}`,
                  boxShadow: 'rgba(176, 199, 217, 0.145) 0px 0px 0px 1px'
                }}
              >
                <div className="w-full h-full rounded-[16px] border flex items-center justify-center" style={{ borderColor: tokens.border, backgroundColor: tokens.background }}>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#11ff99]"></span>
                    <span className="text-[14px] font-medium" style={{ color: tokens.foreground }}>Delivered</span>
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
    <section id="pricing" className="py-32" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-6xl mx-auto px-6">
        <FadeUp>
          <div className="text-center mb-24">
            <h2 className={`text-[40px] md:text-[56px] font-normal leading-[1.20] tracking-[-2.8px] mb-6 ${headingFont.variable} font-heading`} style={{ color: tokens.foreground }}>
              Pricing
            </h2>
            <p className="text-[18px] max-w-2xl mx-auto leading-[1.5]" style={{ color: tokens.mutedForeground }}>
              Start for free, then pay as you go.
            </p>
          </div>
        </FadeUp>
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRICING.map(tier => (
              <motion.div
                key={tier.name}
                variants={staggerItem}
                className="p-8 rounded-[16px] border flex flex-col"
                style={{
                  borderColor: tokens.border,
                  backgroundColor: tokens.backgroundAlt,
                  boxShadow: 'rgba(176, 199, 217, 0.145) 0px 0px 0px 1px',
                }}
              >
                <div className="flex justify-between items-start mb-6">
                  <h3 className="font-semibold text-[24px]" style={{ color: tokens.foreground }}>{tier.name}</h3>
                </div>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className={`text-[40px] font-normal leading-[1.00] tracking-[-1px] ${headingFont.variable} font-heading`} style={{ color: tokens.foreground }}>{tier.price}</span>
                  <span className="text-[16px]" style={{ color: tokens.mutedForeground }}>/ {tier.period}</span>
                </div>
                <p className="text-[16px] mb-8 leading-[1.5]" style={{ color: tokens.mutedForeground }}>{tier.description}</p>
                <ul className="space-y-4 mb-8 flex-1">
                  {tier.features.map(f => (
                    <li key={f} className="flex items-center gap-3 text-[14px]">
                      <Check className="h-4 w-4 flex-shrink-0" style={{ color: tokens.mutedForeground }} />
                      <span style={{ color: tokens.foreground }}>{f}</span>
                    </li>
                  ))}
                </ul>
                <motion.button
                  whileHover={{ backgroundColor: tier.highlighted ? '#ffffff' : 'rgba(255, 255, 255, 0.1)' }}
                  className="w-full py-[12px] rounded-full font-medium text-[16px] border transition-colors"
                  style={tier.highlighted
                    ? { backgroundColor: '#f0f0f0', color: '#000000', borderColor: 'transparent' }
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
    <section id="testimonials" className="py-32" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-6xl mx-auto px-6">
        <FadeUp>
          <div className="text-center mb-24">
            <h2 className={`text-[40px] md:text-[56px] font-normal leading-[1.20] tracking-[-2.8px] mb-6 ${headingFont.variable} font-heading`} style={{ color: tokens.foreground }}>
              Trusted by the best
            </h2>
          </div>
        </FadeUp>
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map(t => (
              <motion.div
                key={t.name}
                variants={staggerItem}
                className="p-8 rounded-[16px] border"
                style={{
                  borderColor: tokens.border,
                  backgroundColor: tokens.backgroundAlt,
                  boxShadow: 'rgba(176, 199, 217, 0.145) 0px 0px 0px 1px'
                }}
              >
                <div className="flex mb-6 gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" style={{ color: tokens.yellow }} />
                  ))}
                </div>
                <p className="text-[16px] leading-[1.5] mb-8" style={{ color: tokens.foreground }}>"{t.text}"</p>
                <div>
                  <p className="font-semibold text-[16px] mb-1" style={{ color: tokens.foreground }}>{t.name}</p>
                  <p className="text-[14px]" style={{ color: tokens.mutedForeground }}>{t.role}, {t.company}</p>
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
          <div className="text-center mb-24">
            <h2 className={`text-[40px] md:text-[56px] font-normal leading-[1.20] tracking-[-2.8px] ${headingFont.variable} font-heading`} style={{ color: tokens.foreground }}>
              Frequently asked questions
            </h2>
          </div>
        </FadeUp>
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, i) => (
            <FadeUp key={i} delay={i * 0.05}>
              <div
                className="border rounded-[16px] overflow-hidden"
                style={{
                  borderColor: tokens.border,
                  backgroundColor: tokens.backgroundAlt,
                  boxShadow: 'rgba(176, 199, 217, 0.145) 0px 0px 0px 1px'
                }}
              >
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
                    <ChevronDown className="h-5 w-5 flex-shrink-0" style={{ color: tokens.mutedForeground }} />
                  </motion.span>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openIndex === i ? 'auto' : 0, opacity: openIndex === i ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  style={{ overflow: 'hidden' }}
                >
                  <p className="px-6 pb-6 text-[16px] leading-[1.5]" style={{ color: tokens.mutedForeground }}>
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
    <section className="py-32" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-2xl mx-auto px-6 text-center">
        <FadeUp>
          <h2 className={`text-[40px] md:text-[56px] font-normal leading-[1.20] tracking-[-2.8px] mb-6 ${headingFont.variable} font-heading`} style={{ color: tokens.foreground }}>
            Ready to get started?
          </h2>
          <p className="text-[18px] leading-[1.5] mb-12" style={{ color: tokens.mutedForeground }}>
            Join thousands of developers building better email experiences.
          </p>
          <div className="flex justify-center">
            <motion.button
              whileHover={{ opacity: 0.9 }}
              className="px-[32px] py-[16px] rounded-full text-[16px] font-medium transition-opacity"
              style={{ backgroundColor: '#ffffff', color: '#000000' }}
            >
              Get Started for Free
            </motion.button>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

function Footer() {
  const links = {
    Product: ['Features', 'Pricing', 'Changelog', 'Docs'],
    Company: ['About', 'Blog', 'Careers', 'Contact'],
    Legal: ['Privacy', 'Terms', 'Security'],
  }

  return (
    <footer className="py-16 border-t" style={{ backgroundColor: tokens.background, borderColor: tokens.border }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2 md:col-span-1">
            <p className="font-semibold text-[18px] mb-6 flex items-center gap-2" style={{ color: tokens.foreground }}>
              <span className="w-5 h-5 bg-white rounded-sm"></span>
              {PRODUCT_NAME}
            </p>
          </div>
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <p className="font-medium text-[14px] mb-6" style={{ color: tokens.foreground }}>{group}</p>
              <ul className="space-y-4">
                {items.map(item => (
                  <li key={item}>
                    <a href="#" className="text-[14px] hover:text-white transition-colors" style={{ color: tokens.mutedForeground }}>
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
            © 2026 {PRODUCT_NAME}.
          </p>
          <a
            href="/"
            className="text-[12px] px-[12px] py-[4px] rounded-full border transition-colors hover:bg-white/5"
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
