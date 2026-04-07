'use client'

import { motion, useReducedMotion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Inter, Calistoga, JetBrains_Mono } from 'next/font/google'
import {
  Star, ChevronDown, ArrowRight, Check, Users, Zap, Globe, Shield,
  BookOpen, Layout, Palette, Code2, BarChart, Lock
} from 'lucide-react'

const bodyFont = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const displayFont = Calistoga({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const monoFont = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

const tokens = {
  background: '#FAFAFA',
  foreground: '#0F172A',
  muted: '#F1F5F9',
  mutedForeground: '#64748B',
  accent: '#0052FF',
  accentSecondary: '#4D7CFF',
  accentForeground: '#FFFFFF',
  border: '#E2E8F0',
  card: '#FFFFFF',
  ring: '#0052FF',
}

// Motion Helpers
const easeOut = [0.16, 1, 0.3, 1] as const

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-5% 0px' })
  const shouldReduce = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={shouldReduce ? false : { opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: easeOut }}
    >
      {children}
    </motion.div>
  )
}

function StaggerContainer({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-5% 0px' })
  const shouldReduce = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={shouldReduce ? false : 'hidden'}
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
      }}
    >
      {children}
    </motion.div>
  )
}

const staggerItem = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
}

// Data
const PRODUCT_NAME = 'AcmeSaaS'
const TAGLINE = 'Work smarter, not harder'
const DESCRIPTION = 'A beautiful, modern SaaS aesthetic for your next startup.'

const NAV_LINKS = ['Features', 'Pricing', 'Testimonials', 'FAQ']

const STATS = [
  { value: '50K+', label: 'Active Users' },
  { value: '99.9%', label: 'Uptime' },
  { value: '140+', label: 'Countries' },
  { value: '4.9/5', label: 'Rating' },
]

const FEATURES = [
  { icon: BookOpen, title: 'Intelligent Knowledge', description: 'Your team\'s knowledge, automatically organized and searchable instantly.' },
  { icon: Layout, title: 'Dynamic Layouts', description: 'Create beautiful pages without writing a single line of code.' },
  { icon: Zap, title: 'Lightning Fast', description: 'Optimized for speed. Every interaction happens in milliseconds.' },
  { icon: Code2, title: 'Developer API', description: 'Build custom integrations with our comprehensive GraphQL API.' },
  { icon: BarChart, title: 'Advanced Analytics', description: 'Gain actionable insights with real-time data visualization.' },
  { icon: Shield, title: 'Enterprise Security', description: 'Bank-grade encryption keeping your data safe and compliant.' },
]

const PRICING = [
  {
    name: 'Starter',
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
]

function SectionBadge({ text }: { text: string }) {
  return (
    <div className="inline-flex items-center gap-3 rounded-full border border-accent/30 bg-accent/5 px-5 py-2 mb-6" style={{ borderColor: `${tokens.accent}4D`, backgroundColor: `${tokens.accent}0D` }}>
      <span className="h-2 w-2 rounded-full animate-pulse" style={{ backgroundColor: tokens.accent }} />
      <span className="font-mono text-xs uppercase tracking-[0.15em]" style={{ color: tokens.accent }}>
        {text}
      </span>
    </div>
  )
}

function Navbar() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-md"
      style={{ borderColor: tokens.border, backgroundColor: `${tokens.background}CC` }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <span className="font-display font-bold text-xl" style={{ color: tokens.foreground }}>
          {PRODUCT_NAME}
        </span>
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-sm font-medium transition-colors hover:opacity-80"
              style={{ color: tokens.mutedForeground }}
            >
              {link}
            </a>
          ))}
        </div>
        <div className="flex gap-4">
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="hidden sm:flex h-10 px-4 items-center justify-center rounded-xl text-sm font-medium"
            style={{ color: tokens.mutedForeground }}
          >
            Log in
          </motion.button>
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="h-10 px-5 rounded-xl text-sm font-medium flex items-center shadow-sm"
            style={{ background: `linear-gradient(to right, ${tokens.accent}, ${tokens.accentSecondary})`, color: tokens.accentForeground }}
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
    <section className="relative min-h-dvh flex items-center pt-24 pb-20 overflow-hidden" style={{ backgroundColor: tokens.background }}>
      {/* Decorative gradient overlay */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full blur-[150px] pointer-events-none opacity-[0.06]" style={{ backgroundColor: tokens.accent }} />

      <div className="max-w-6xl mx-auto px-6 w-full relative z-10 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1, delayChildren: 0.1 }}
          className="max-w-3xl"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easeOut }}
            className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 mb-8 text-sm"
            style={{ borderColor: tokens.border, backgroundColor: tokens.card, color: tokens.mutedForeground }}
          >
            <span className="flex h-2 w-2 rounded-full" style={{ backgroundColor: tokens.accent }} />
            Introducing our new platform 2.0
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: easeOut }}
            className="font-display text-[2.75rem] sm:text-6xl lg:text-[5.25rem] leading-[1.05] tracking-[-0.02em] mb-6"
            style={{ color: tokens.foreground }}
          >
            The future of work is <span className="relative whitespace-nowrap">
              <span className="relative z-10" style={{ backgroundImage: `linear-gradient(to right, ${tokens.accent}, ${tokens.accentSecondary})`, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>beautiful</span>
              <span className="absolute bottom-[-0.25rem] md:bottom-[-0.5rem] left-0 h-[0.75rem] md:h-[1rem] w-full rounded-sm" style={{ background: `linear-gradient(to right, ${tokens.accent}26, ${tokens.accentSecondary}1A)` }} />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: easeOut }}
            className="text-lg md:text-xl mb-10 max-w-xl leading-relaxed"
            style={{ color: tokens.mutedForeground }}
          >
            {DESCRIPTION} Stop fighting with your tools and start building something amazing today.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: easeOut }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.button
              whileHover={{ y: -2, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="group h-12 md:h-14 px-8 rounded-xl font-medium flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow-lg"
              style={{ background: `linear-gradient(to right, ${tokens.accent}, ${tokens.accentSecondary})`, color: tokens.accentForeground, boxShadow: `0 4px 14px ${tokens.accent}40` }}
            >
              Start for free <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </motion.button>
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="h-12 md:h-14 px-8 rounded-xl font-medium border transition-colors hover:bg-black/5"
              style={{ borderColor: tokens.border, color: tokens.foreground }}
            >
              Book a demo
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Abstract Hero Graphic */}
        <div className="hidden lg:block relative h-[500px] w-full">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 60, ease: "linear", repeat: Infinity }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-dashed opacity-20"
            style={{ borderColor: tokens.foreground }}
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 80, ease: "linear", repeat: Infinity }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full border opacity-10"
            style={{ borderColor: tokens.foreground }}
          />

          {/* Floating cards */}
          <motion.div
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }}
            className="absolute top-[10%] left-[10%] w-48 h-32 rounded-2xl p-4 shadow-xl border backdrop-blur-sm"
            style={{ backgroundColor: `${tokens.card}E6`, borderColor: tokens.border }}
          >
            <div className="w-8 h-8 rounded-lg mb-3" style={{ background: `linear-gradient(to right, ${tokens.accent}, ${tokens.accentSecondary})` }} />
            <div className="h-2 w-3/4 rounded-full mb-2" style={{ backgroundColor: tokens.muted }} />
            <div className="h-2 w-1/2 rounded-full" style={{ backgroundColor: tokens.muted }} />
          </motion.div>

          <motion.div
            animate={{ y: [10, -10, 10] }}
            transition={{ duration: 4.5, ease: "easeInOut", repeat: Infinity, delay: 1 }}
            className="absolute bottom-[20%] right-[5%] w-56 h-40 rounded-2xl p-5 shadow-2xl border backdrop-blur-sm flex flex-col justify-between"
            style={{ backgroundColor: `${tokens.card}F2`, borderColor: tokens.border }}
          >
             <div>
              <div className="h-3 w-1/3 rounded-full mb-4" style={{ backgroundColor: tokens.muted }} />
              <div className="flex items-end gap-2">
                <div className="h-12 w-8 rounded-t-sm" style={{ backgroundColor: tokens.accentSecondary }} />
                <div className="h-16 w-8 rounded-t-sm" style={{ backgroundColor: tokens.accent }} />
                <div className="h-10 w-8 rounded-t-sm" style={{ backgroundColor: tokens.muted }} />
              </div>
            </div>
          </motion.div>

          {/* Decorative shapes */}
          <div className="absolute top-[40%] right-[20%] w-16 h-16 rounded-full opacity-10" style={{ backgroundColor: tokens.accent }} />
          <div className="absolute bottom-[10%] left-[30%] w-20 h-20 rounded-xl rotate-12 opacity-5" style={{ backgroundColor: tokens.foreground }} />
        </div>
      </div>
    </section>
  )
}

function Stats() {
  return (
    <section className="py-24 relative overflow-hidden" style={{ backgroundColor: tokens.foreground, color: tokens.background }}>
      {/* Dot Pattern Texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          opacity: 0.03
        }}
      />
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full blur-[150px] opacity-20 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <StaggerContainer>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:divide-x divide-white/10">
            {STATS.map((stat, i) => (
              <motion.div key={stat.label} variants={staggerItem} className={`text-center lg:text-left ${i !== 0 ? 'lg:pl-8' : ''}`}>
                <p className="font-display text-4xl md:text-5xl lg:text-6xl mb-2">{stat.value}</p>
                <p className="text-sm font-mono tracking-widest uppercase opacity-70">{stat.label}</p>
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
    <section id="features" className="py-28 md:py-36 relative" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-6xl mx-auto px-6">
        <FadeUp>
          <div className="mb-16 md:mb-24">
            <SectionBadge text="Features" />
            <h2 className="font-display text-3xl md:text-[3.25rem] leading-[1.15]" style={{ color: tokens.foreground }}>
              Everything you need to <span className="gradient-text" style={{ backgroundImage: `linear-gradient(to right, ${tokens.accent}, ${tokens.accentSecondary})`, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>scale</span>
            </h2>
          </div>
        </FadeUp>

        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feature, i) => (
              <motion.div
                key={feature.title}
                variants={staggerItem}
                whileHover={{ y: -4, transition: { duration: 0.3 } }}
                className="group relative p-8 rounded-2xl border transition-all duration-300 hover:shadow-xl bg-card overflow-hidden"
                style={{ borderColor: tokens.border, backgroundColor: tokens.card }}
              >
                {/* Subtle gradient hover background */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: `linear-gradient(to bottom right, ${tokens.accent}08, transparent)` }} />

                <div className="relative z-10">
                  <div className="h-12 w-12 rounded-xl mb-6 flex items-center justify-center transition-transform duration-300 group-hover:scale-110" style={{ background: `linear-gradient(to right, ${tokens.accent}, ${tokens.accentSecondary})`, color: tokens.accentForeground }}>
                    <feature.icon className="h-6 w-6" strokeWidth={2} />
                  </div>
                  <h3 className="font-semibold text-xl mb-3" style={{ color: tokens.foreground }}>{feature.title}</h3>
                  <p className="leading-relaxed" style={{ color: tokens.mutedForeground }}>{feature.description}</p>
                </div>
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
    <section className="py-28 md:py-36 border-y" style={{ borderColor: tokens.border, backgroundColor: tokens.muted }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-16 items-center">
          <FadeUp>
            <div>
              <SectionBadge text="Platform" />
              <h2 className="font-display text-3xl md:text-5xl leading-[1.15] mb-6" style={{ color: tokens.foreground }}>
                Built for the way modern teams <span className="gradient-text" style={{ backgroundImage: `linear-gradient(to right, ${tokens.accent}, ${tokens.accentSecondary})`, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>collaborate</span>
              </h2>
              <div className="space-y-6 text-lg leading-relaxed" style={{ color: tokens.mutedForeground }}>
                <p>
                  Stop switching between disjointed tools. Our platform brings your entire workflow into one unified, beautiful workspace designed for focus and speed.
                </p>
                <p>
                  Every element has been crafted with precision, eliminating friction so your team can focus on what actually matters: doing great work.
                </p>
              </div>
              <motion.button
                whileHover={{ x: 4 }}
                className="mt-8 font-medium flex items-center gap-2 group"
                style={{ color: tokens.accent }}
              >
                Explore the platform <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </motion.button>
            </div>
          </FadeUp>

          <FadeUp delay={0.2} className="relative">
             <div className="aspect-[4/3] rounded-tl-[4rem] rounded-br-[4rem] rounded-tr-2xl rounded-bl-2xl overflow-hidden relative shadow-2xl" style={{ backgroundColor: tokens.card, border: `1px solid ${tokens.border}` }}>
                {/* Faux UI */}
                <div className="absolute top-0 left-0 right-0 h-12 border-b flex items-center px-4 gap-2" style={{ borderColor: tokens.border, backgroundColor: tokens.muted }}>
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                </div>
                <div className="p-8 pt-20 flex flex-col gap-4">
                  <div className="w-3/4 h-8 rounded-lg" style={{ backgroundColor: tokens.muted }} />
                  <div className="w-full h-4 rounded-full" style={{ backgroundColor: tokens.muted }} />
                  <div className="w-5/6 h-4 rounded-full" style={{ backgroundColor: tokens.muted }} />
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="h-32 rounded-xl" style={{ backgroundColor: `${tokens.accent}1A` }} />
                    <div className="h-32 rounded-xl" style={{ backgroundColor: tokens.muted }} />
                  </div>
                </div>
             </div>

             {/* Decorative radial glow */}
             <div className="absolute -bottom-10 -right-10 w-64 h-64 rounded-full blur-[80px] -z-10" style={{ backgroundColor: tokens.accent, opacity: 0.15 }} />
          </FadeUp>
        </div>
      </div>
    </section>
  )
}

function Pricing() {
  return (
    <section id="pricing" className="py-28 md:py-36" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-6xl mx-auto px-6">
        <FadeUp>
          <div className="text-center mb-16 md:mb-24">
            <div className="flex justify-center"><SectionBadge text="Pricing" /></div>
            <h2 className="font-display text-3xl md:text-5xl leading-[1.15] mb-4" style={{ color: tokens.foreground }}>Simple, transparent pricing</h2>
            <p className="text-lg" style={{ color: tokens.mutedForeground }}>No surprises. Cancel anytime.</p>
          </div>
        </FadeUp>

        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-center">
            {PRICING.map((tier, i) => {
              const isFeatured = tier.highlighted;
              return (
                <motion.div
                  key={tier.name}
                  variants={staggerItem}
                  className={`relative rounded-2xl bg-card ${isFeatured ? 'shadow-2xl z-10 md:-translate-y-4 md:scale-[1.02]' : 'shadow-md z-0'}`}
                  style={{
                    backgroundColor: tokens.card,
                    border: isFeatured ? 'none' : `1px solid ${tokens.border}`
                  }}
                >
                  {/* Gradient Border for featured tier */}
                  {isFeatured && (
                    <div className="absolute inset-0 rounded-2xl p-[2px]" style={{ background: `linear-gradient(to bottom right, ${tokens.accent}, ${tokens.accentSecondary})`, zIndex: -1 }} />
                  )}

                  <div className={`h-full w-full rounded-[calc(16px-2px)] p-8 ${isFeatured ? 'bg-card' : ''}`} style={isFeatured ? { backgroundColor: tokens.card } : {}}>
                    {isFeatured && (
                      <span
                        className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-xs font-mono tracking-widest uppercase rounded-full shadow-sm"
                        style={{ background: `linear-gradient(to right, ${tokens.accent}, ${tokens.accentSecondary})`, color: tokens.accentForeground }}
                      >
                        Most popular
                      </span>
                    )}

                    <h3 className="font-semibold text-xl mb-2" style={{ color: tokens.foreground }}>{tier.name}</h3>
                    <div className="flex items-baseline gap-1 mb-4">
                      <span className="font-display text-4xl md:text-5xl" style={{ color: tokens.foreground }}>{tier.price}</span>
                      <span className="text-sm font-medium" style={{ color: tokens.mutedForeground }}>/ {tier.period}</span>
                    </div>
                    <p className="text-sm mb-8 h-10" style={{ color: tokens.mutedForeground }}>{tier.description}</p>

                    <motion.button
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full h-12 rounded-xl font-medium text-sm transition-all mb-8 shadow-sm flex items-center justify-center"
                      style={isFeatured
                        ? { background: `linear-gradient(to right, ${tokens.accent}, ${tokens.accentSecondary})`, color: tokens.accentForeground, boxShadow: `0 4px 14px ${tokens.accent}40` }
                        : { backgroundColor: 'transparent', color: tokens.foreground, border: `1px solid ${tokens.border}` }
                      }
                    >
                      {tier.cta}
                    </motion.button>

                    <ul className="space-y-4">
                      {tier.features.map(f => (
                        <li key={f} className="flex items-center gap-3 text-sm">
                          <Check className="h-4 w-4 flex-shrink-0" style={{ color: tokens.accent }} />
                          <span style={{ color: tokens.foreground }}>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </StaggerContainer>
      </div>
    </section>
  )
}

function Testimonials() {
  return (
    <section id="testimonials" className="py-28 md:py-36 border-y relative overflow-hidden" style={{ borderColor: tokens.border, backgroundColor: tokens.muted }}>
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <FadeUp>
          <div className="text-center mb-16 md:mb-24">
            <div className="flex justify-center"><SectionBadge text="Testimonials" /></div>
            <h2 className="font-display text-3xl md:text-5xl" style={{ color: tokens.foreground }}>Loved by teams worldwide</h2>
          </div>
        </FadeUp>

        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                variants={staggerItem}
                className={`p-8 rounded-2xl bg-card shadow-sm border relative ${i === 1 ? 'md:-translate-y-8' : ''}`}
                style={{ borderColor: tokens.border, backgroundColor: tokens.card }}
              >
                {/* Accent top border */}
                <div className="absolute top-0 left-0 w-full h-1 rounded-t-2xl" style={{ background: `linear-gradient(to right, ${tokens.accent}, ${tokens.accentSecondary})` }} />

                <div className="flex mb-6 gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" style={{ color: tokens.accent }} />
                  ))}
                </div>

                {/* Large decorative quote mark */}
                <div className="absolute top-6 right-6 font-display text-6xl opacity-10 pointer-events-none" style={{ color: tokens.accent }}>
                  "
                </div>

                <p className="text-base leading-relaxed mb-8 relative z-10" style={{ color: tokens.foreground }}>"{t.text}"</p>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm" style={{ backgroundColor: `${tokens.accent}1A`, color: tokens.accent }}>
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-sm" style={{ color: tokens.foreground }}>{t.name}</p>
                    <p className="text-xs" style={{ color: tokens.mutedForeground }}>{t.role} · {t.company}</p>
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
    <section id="faq" className="py-28 md:py-36" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-3xl mx-auto px-6">
        <FadeUp>
          <div className="text-center mb-16">
            <div className="flex justify-center"><SectionBadge text="FAQ" /></div>
            <h2 className="font-display text-3xl md:text-5xl" style={{ color: tokens.foreground }}>Common questions</h2>
          </div>
        </FadeUp>

        <div className="space-y-4">
          {FAQ_ITEMS.map((item, i) => (
            <FadeUp key={i} delay={i * 0.1}>
              <div
                className="rounded-2xl border overflow-hidden transition-colors duration-300"
                style={{
                  borderColor: openIndex === i ? tokens.accent : tokens.border,
                  backgroundColor: openIndex === i ? `${tokens.accent}05` : tokens.card
                }}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  aria-expanded={openIndex === i}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-semibold text-lg" style={{ color: tokens.foreground }}>{item.q}</span>
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center transition-colors flex-shrink-0"
                    style={{ backgroundColor: openIndex === i ? tokens.accent : tokens.muted }}
                  >
                    <motion.span
                      animate={{ rotate: openIndex === i ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: easeOut }}
                    >
                      <ChevronDown className="h-4 w-4" style={{ color: openIndex === i ? tokens.accentForeground : tokens.foreground }} />
                    </motion.span>
                  </div>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openIndex === i ? 'auto' : 0, opacity: openIndex === i ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: easeOut }}
                  style={{ overflow: 'hidden' }}
                >
                  <p className="px-6 pb-6 text-base leading-relaxed" style={{ color: tokens.mutedForeground }}>
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

function FinalCTA() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setTimeout(() => setStatus('success'), 1200)
  }

  return (
    <section className="py-28 md:py-36 relative overflow-hidden" style={{ backgroundColor: tokens.foreground }}>
      {/* Dot Pattern Texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          opacity: 0.03
        }}
      />
      {/* Radial glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent rounded-full blur-[150px] opacity-[0.15] pointer-events-none" />

      <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
        <FadeUp>
          <h2 className="font-display text-4xl md:text-6xl mb-6" style={{ color: tokens.background }}>Ready to get started?</h2>
          <p className="text-lg md:text-xl mb-10 opacity-80" style={{ color: tokens.muted }}>
            Join thousands of teams already using our platform to build better products, faster.
          </p>

          {status === 'success' ? (
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-xl" style={{ backgroundColor: `${tokens.accent}33`, border: `1px solid ${tokens.accent}` }}>
               <Check className="h-5 w-5" style={{ color: tokens.accent }} />
               <p className="font-medium" style={{ color: tokens.background }}>You're on the list! Check your email.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <label htmlFor="newsletter-email" className="sr-only">Email address</label>
              <input
                id="newsletter-email"
                type="email"
                required
                autoComplete="email"
                placeholder="Enter your email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="flex-1 h-12 md:h-14 px-4 rounded-xl border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 transition-all"
                style={{
                  borderColor: `${tokens.background}33`,
                  backgroundColor: `${tokens.background}0D`,
                  color: tokens.background,
                  '--tw-ring-color': tokens.accent,
                  '--tw-ring-offset-color': tokens.foreground
                } as React.CSSProperties}
              />
              <motion.button
                type="submit"
                disabled={status === 'loading'}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="h-12 md:h-14 px-8 rounded-xl font-medium flex items-center justify-center disabled:opacity-70 shadow-sm"
                style={{ background: `linear-gradient(to right, ${tokens.accent}, ${tokens.accentSecondary})`, color: tokens.accentForeground }}
              >
                {status === 'loading' ? 'Sending...' : 'Get early access'}
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
    Product: ['Features', 'Pricing', 'Changelog', 'Docs'],
    Company: ['About', 'Blog', 'Careers', 'Contact'],
    Legal: ['Privacy', 'Terms', 'Security'],
  }

  return (
    <footer className="py-16 md:py-24" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12 mb-16">
          <div className="col-span-2">
            <p className="font-display font-bold text-2xl mb-4" style={{ color: tokens.foreground }}>{PRODUCT_NAME}</p>
            <p className="text-sm leading-relaxed max-w-xs mb-6" style={{ color: tokens.mutedForeground }}>
              Building the future of software, one pixel at a time. Designed with precision and care.
            </p>
            <div className="flex gap-4">
              {/* Social placeholders */}
              <div className="w-10 h-10 rounded-full border flex items-center justify-center transition-colors hover:bg-black/5 cursor-pointer" style={{ borderColor: tokens.border, color: tokens.foreground }}>
                <span className="sr-only">Twitter</span>
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
              </div>
              <div className="w-10 h-10 rounded-full border flex items-center justify-center transition-colors hover:bg-black/5 cursor-pointer" style={{ borderColor: tokens.border, color: tokens.foreground }}>
                <span className="sr-only">GitHub</span>
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
              </div>
            </div>
          </div>
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <p className="font-semibold text-sm mb-4" style={{ color: tokens.foreground }}>{group}</p>
              <ul className="space-y-3">
                {items.map(item => (
                  <li key={item}>
                    <a href="#" className="text-sm transition-colors hover:text-accent" style={{ color: tokens.mutedForeground }}>
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
            © {new Date().getFullYear()} {PRODUCT_NAME}. All rights reserved.
          </p>
          <a
            href="/"
            className="text-sm font-medium hover:underline"
            style={{ color: tokens.accent }}
          >
            ← Back to all styles
          </a>
        </div>
      </div>
    </footer>
  )
}

// Page
export default function StylePage() {
  return (
    <div className={`${bodyFont.variable} ${displayFont.variable} ${monoFont.variable} font-sans selection:bg-accent/20`} style={{ backgroundColor: tokens.background, color: tokens.foreground }}>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Features />
        <ProductDetail />
        <Pricing />
        <Testimonials />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />

      {/* Custom styles to handle specific tailwind variants that don't easily map to inline styles */}
      <style dangerouslySetInnerHTML={{__html: `
        .gradient-text {
          background-image: linear-gradient(to right, ${tokens.accent}, ${tokens.accentSecondary});
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
      `}} />
      
      </div>
  )
}
