'use client'

/**
 * PAGE TEMPLATE — oh-my-design
 * Neumorphism style
 */

import { motion, useReducedMotion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Inter } from 'next/font/google'
import {
  Star, ChevronDown, ArrowRight, Check, BookOpen, Layout, Palette, Code2, BarChart, Lock
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
  background: '#E0E5EC',
  backgroundAlt: '#E0E5EC',
  foreground: '#3D4852',
  muted: '#E0E5EC',
  mutedForeground: '#6B7280',
  border: 'transparent',
  accent: '#6C63FF',
  accentForeground: '#FFFFFF',
}

// ─────────────────────────────────────────────
// NEUMORPHIC SHADOWS & STYLES
// ─────────────────────────────────────────────
const shadows = {
  extruded: '9px 9px 16px rgba(163,177,198,0.6), -9px -9px 16px rgba(255,255,255,0.5)',
  extrudedHover: '12px 12px 20px rgba(163,177,198,0.6), -12px -12px 20px rgba(255,255,255,0.5)',
  inset: 'inset 6px 6px 10px 0 rgba(163,177,198, 0.7), inset -6px -6px 10px 0 rgba(255,255,255, 0.8)',
  insetDeep: 'inset 4px 4px 8px rgba(163,177,198,0.6), inset -4px -4px 8px rgba(255,255,255,0.5)',
  activePress: 'inset 3px 3px 6px rgba(163,177,198,0.6), inset -3px -3px 6px rgba(255,255,255,0.5)',
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

function StaggerContainer({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-5% 0px' })
  const shouldReduce = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      style={style}
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
// DATA
// ─────────────────────────────────────────────
const PRODUCT_NAME = 'Neusoft'
const TAGLINE = 'Feel the interface.'
const DESCRIPTION = 'A soft, tactile approach to digital design where every element feels like a physical object molded from the same material.'

const NAV_LINKS = ['Features', 'Pricing', 'Testimonials', 'FAQ']

const STATS = [
  { value: '50K+', label: 'Active Users' },
  { value: '99.9%', label: 'Uptime' },
  { value: '140+', label: 'Countries' },
  { value: '4.9/5', label: 'Rating' },
]

const FEATURES = [
  { icon: BookOpen, title: 'Tactile Design', description: 'Every element feels real and molded from the same base material.' },
  { icon: Layout, title: 'Soft Layouts', description: 'Experience the soft and inviting look of shadows and highlights.' },
  { icon: Palette, title: 'Harmonious Colors', description: 'A single, monochromatic base for a peaceful aesthetic.' },
  { icon: Code2, title: 'Seamless Code', description: 'Powered by highly optimized dual-shadow implementations.' },
  { icon: BarChart, title: 'Deep Analytics', description: 'Dig deep into your data with our inset metrics dashboards.' },
  { icon: Lock, title: 'Secure & Safe', description: 'Your data is locked in tight, like an extruded physical vault.' },
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
]

// ─────────────────────────────────────────────
// CUSTOM COMPONENTS
// ─────────────────────────────────────────────
import type { HTMLMotionProps } from 'framer-motion'

function NeumorphicButton({
  children,
  className = '',
  isPrimary = false,
  ...props
}: Omit<HTMLMotionProps<"button">, "onAnimationStart"> & { isPrimary?: boolean; className?: string }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isActive, setIsActive] = useState(false)

  const bgColor = isPrimary ? tokens.accent : tokens.background
  const textColor = isPrimary ? tokens.accentForeground : tokens.foreground

  const currentShadow = isActive
    ? shadows.activePress
    : isHovered
    ? shadows.extrudedHover
    : shadows.extruded

  const yOffset = isActive ? 0.5 : isHovered ? -1 : 0

  return (
    <motion.button
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onTapStart={() => setIsActive(true)}
      onTapCancel={() => setIsActive(false)}
      onTap={() => setIsActive(false)}
      animate={{
        y: yOffset,
        boxShadow: currentShadow,
      }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`rounded-2xl px-8 h-12 font-medium flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6C63FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#E0E5EC] ${className}`}
      style={{ backgroundColor: bgColor, color: textColor }}
      {...props}
    >
      {children}
    </motion.button>
  )
}

function NeumorphicCard({ children, className = '', padding = 'p-8', delay = 0, style }: { children: React.ReactNode, className?: string, padding?: string, delay?: number, style?: React.CSSProperties }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      variants={staggerItem}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      animate={{
        y: isHovered ? -2 : 0,
        boxShadow: isHovered ? shadows.extrudedHover : shadows.extruded,
      }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`rounded-[32px] ${padding} ${className}`}
      style={{ backgroundColor: tokens.background, ...style }}
    >
      {children}
    </motion.div>
  )
}

function IconWell({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="rounded-2xl p-4 inline-flex items-center justify-center mb-4"
      style={{
        backgroundColor: tokens.background,
        boxShadow: shadows.insetDeep,
      }}
    >
      {children}
    </div>
  )
}

function NeumorphicInput({ ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className="flex-1 h-12 px-4 rounded-2xl text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6C63FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#E0E5EC] transition-shadow duration-300"
      style={{
        backgroundColor: tokens.background,
        color: tokens.foreground,
        boxShadow: shadows.inset,
      }}
      {...props}
    />
  )
}

// ─────────────────────────────────────────────
// PAGE SECTIONS
// ─────────────────────────────────────────────

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 py-4 px-6 backdrop-blur-sm bg-[#E0E5EC]/80">
      <div className="max-w-7xl mx-auto h-14 flex items-center justify-between rounded-[32px] px-6" style={{ boxShadow: shadows.extruded, backgroundColor: tokens.background }}>
        <span className="font-bold text-lg tracking-tight" style={{ color: tokens.foreground }}>
          {PRODUCT_NAME}
        </span>
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-sm font-medium transition-colors hover:text-[#6C63FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6C63FF] rounded-lg px-2 py-1"
              style={{ color: tokens.mutedForeground }}
            >
              {link}
            </a>
          ))}
        </div>
        <div className="hidden md:block">
          <NeumorphicButton isPrimary className="px-6 h-10 text-sm">Get started</NeumorphicButton>
        </div>

        <div className="md:hidden flex items-center">
            {/* Hamburger icon simulation */}
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ boxShadow: shadows.extruded }}>
                <div className="w-4 h-0.5 bg-[#3D4852] relative before:absolute before:w-4 before:h-0.5 before:bg-[#3D4852] before:-top-1.5 after:absolute after:w-4 after:h-0.5 after:bg-[#3D4852] after:top-1.5" />
            </div>
        </div>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section className="min-h-dvh flex items-center pt-24 pb-16" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-6xl mx-auto px-6 py-32 w-full text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.15, delayChildren: 0.1 }}
          className="max-w-3xl mx-auto flex flex-col items-center"
        >
          <motion.div
             initial={{ opacity: 0, y: 16 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6 }}
             className="mb-8 rounded-full px-6 py-2 text-sm uppercase tracking-widest font-semibold"
             style={{ color: tokens.accent, boxShadow: shadows.inset }}
          >
             Introducing {PRODUCT_NAME}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold leading-tight mb-6"
            style={{ color: tokens.foreground }}
          >
            {TAGLINE}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl mb-12 max-w-2xl leading-relaxed"
            style={{ color: tokens.mutedForeground }}
          >
            {DESCRIPTION}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto"
          >
            <NeumorphicButton isPrimary className="w-full sm:w-auto h-14">
              Start for free <ArrowRight className="ml-2 h-4 w-4" />
            </NeumorphicButton>
            <NeumorphicButton className="w-full sm:w-auto h-14">
              View components
            </NeumorphicButton>
          </motion.div>
        </motion.div>

        {/* Hero Visual — Nested Depth abstract art */}
        <FadeUp delay={0.4}>
          <div className="mt-24 w-full h-72 md:h-96 rounded-[32px] flex items-center justify-center relative overflow-hidden" style={{ boxShadow: shadows.insetDeep }}>
            <motion.div
               animate={{ y: [0, -10, 0] }}
               transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
               className="w-48 h-48 md:w-64 md:h-64 rounded-full flex items-center justify-center"
               style={{ boxShadow: shadows.extruded, backgroundColor: tokens.background }}
            >
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full flex items-center justify-center" style={{ boxShadow: shadows.insetDeep }}>
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full" style={{ boxShadow: shadows.extrudedHover, backgroundColor: tokens.accent }} />
                </div>
            </motion.div>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

function Stats() {
  return (
    <section className="py-16" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-6xl mx-auto px-6">
        <StaggerContainer>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map(stat => (
              <NeumorphicCard key={stat.label} padding="p-6" className="text-center" style={{ borderRadius: '24px' }}>
                <p className="text-3xl md:text-4xl font-bold mb-2" style={{ color: tokens.accent }}>{stat.value}</p>
                <p className="text-sm font-medium" style={{ color: tokens.mutedForeground }}>{stat.label}</p>
              </NeumorphicCard>
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
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: tokens.foreground }}>
              Molded to perfection
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: tokens.mutedForeground }}>
              Soft surfaces, carefully balanced lighting, and a cohesive material feel across the entire experience.
            </p>
          </div>
        </FadeUp>
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {FEATURES.map(feature => (
              <NeumorphicCard key={feature.title}>
                <IconWell>
                    <feature.icon className="h-6 w-6" style={{ color: tokens.accent }} strokeWidth={2} />
                </IconWell>
                <h3 className="font-semibold text-xl mb-3" style={{ color: tokens.foreground }}>{feature.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: tokens.mutedForeground }}>{feature.description}</p>
              </NeumorphicCard>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  )
}

function ProductDetail() {
  return (
    <section className="py-24" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-5xl mx-auto px-6">
        <FadeUp>
          <NeumorphicCard padding="p-10 md:p-16">
            <div className="flex flex-col md:flex-row gap-12 items-center">
                <div className="flex-1">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: tokens.foreground }}>
                    The philosophy of depth
                    </h2>
                    <div className="space-y-6">
                    <p className="text-lg leading-relaxed" style={{ color: tokens.mutedForeground }}>
                        Unlike flat design, neumorphism invites touch. Elements don't float above the background; they are part of it, raised or indented like vacuum-formed plastic.
                    </p>
                    <p className="text-lg leading-relaxed" style={{ color: tokens.mutedForeground }}>
                        It brings a sense of calm and tactile realism, avoiding harsh contrasts and focusing entirely on lighting and shadow to convey structure.
                    </p>
                    </div>
                    <div className="mt-8">
                        <NeumorphicButton>Read the manifesto</NeumorphicButton>
                    </div>
                </div>
                <div className="flex-1 w-full max-w-sm aspect-square rounded-[40px] flex items-center justify-center" style={{ boxShadow: shadows.insetDeep }}>
                    <div className="w-3/4 h-3/4 rounded-full flex items-center justify-center" style={{ boxShadow: shadows.extrudedHover }}>
                        <div className="w-1/2 h-1/2 rounded-full" style={{ boxShadow: shadows.insetDeep }} />
                    </div>
                </div>
            </div>
          </NeumorphicCard>
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
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: tokens.foreground }}>Simple pricing</h2>
            <p className="text-lg" style={{ color: tokens.mutedForeground }}>Choose the plan that fits your needs.</p>
          </div>
        </FadeUp>
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {PRICING.map(tier => (
              <NeumorphicCard
                key={tier.name}
                padding="p-8 md:p-10"
                className="flex flex-col"
                style={tier.highlighted ? {
                    border: `2px solid ${tokens.accent}33`,
                } : undefined}
              >
                <div className="mb-8">
                    <h3 className="font-bold text-2xl mb-2" style={{ color: tokens.foreground }}>{tier.name}</h3>
                    <p className="text-sm h-10" style={{ color: tokens.mutedForeground }}>{tier.description}</p>
                </div>
                <div className="mb-8 p-6 rounded-2xl flex items-center justify-center" style={{ boxShadow: shadows.insetDeep }}>
                  <span className="text-5xl font-bold" style={{ color: tier.highlighted ? tokens.accent : tokens.foreground }}>{tier.price}</span>
                  <span className="text-sm font-medium ml-2 mt-4" style={{ color: tokens.mutedForeground }}>/ {tier.period}</span>
                </div>
                <ul className="space-y-4 mb-10 flex-1">
                  {tier.features.map(f => (
                    <li key={f} className="flex items-center gap-3 text-sm font-medium">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ boxShadow: shadows.extruded }}>
                         <Check className="h-3 w-3" style={{ color: tokens.accent }} strokeWidth={3} />
                      </div>
                      <span style={{ color: tokens.foreground }}>{f}</span>
                    </li>
                  ))}
                </ul>
                <NeumorphicButton isPrimary={tier.highlighted} className="w-full">
                  {tier.cta}
                </NeumorphicButton>
              </NeumorphicCard>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  )
}

function Testimonials() {
  return (
    <section id="testimonials" className="py-24" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-6xl mx-auto px-6">
        <FadeUp>
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold" style={{ color: tokens.foreground }}>What people say</h2>
          </div>
        </FadeUp>
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {TESTIMONIALS.map(t => (
              <NeumorphicCard key={t.name} padding="p-8">
                <div className="flex mb-6 gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <div key={i} className="w-8 h-8 rounded-full flex items-center justify-center" style={{ boxShadow: shadows.extruded }}>
                        <Star className="h-3.5 w-3.5 fill-current" style={{ color: tokens.accent }} />
                    </div>
                  ))}
                </div>
                <p className="text-base leading-relaxed mb-8 italic" style={{ color: tokens.foreground }}>"{t.text}"</p>
                <div className="p-4 rounded-2xl flex items-center gap-4" style={{ boxShadow: shadows.insetDeep }}>
                  <div className="w-10 h-10 rounded-full" style={{ boxShadow: shadows.extruded, backgroundColor: tokens.accent }} />
                  <div>
                    <p className="font-bold text-sm" style={{ color: tokens.foreground }}>{t.name}</p>
                    <p className="text-xs font-medium mt-0.5" style={{ color: tokens.mutedForeground }}>{t.role} · {t.company}</p>
                  </div>
                </div>
              </NeumorphicCard>
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
            <h2 className="text-4xl md:text-5xl font-bold" style={{ color: tokens.foreground }}>Common questions</h2>
          </div>
        </FadeUp>
        <div className="space-y-6">
          {FAQ_ITEMS.map((item, i) => (
            <FadeUp key={i} delay={i * 0.05}>
              <div
                className="rounded-[32px] overflow-hidden transition-shadow duration-300"
                style={{
                    backgroundColor: tokens.background,
                    boxShadow: openIndex === i ? shadows.inset : shadows.extruded
                }}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  aria-expanded={openIndex === i}
                  className="w-full flex items-center justify-between p-6 md:p-8 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6C63FF] rounded-[32px]"
                >
                  <span className="font-bold text-lg" style={{ color: tokens.foreground }}>{item.q}</span>
                  <motion.div
                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ boxShadow: openIndex === i ? shadows.insetDeep : shadows.extruded }}
                  >
                    <ChevronDown className="h-5 w-5" style={{ color: openIndex === i ? tokens.accent : tokens.mutedForeground }} />
                  </motion.div>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openIndex === i ? 'auto' : 0, opacity: openIndex === i ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  style={{ overflow: 'hidden' }}
                >
                  <p className="px-6 md:px-8 pb-6 md:pb-8 text-base leading-relaxed" style={{ color: tokens.mutedForeground }}>
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
    <section className="py-24" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-3xl mx-auto px-6 text-center">
        <FadeUp>
          <NeumorphicCard padding="p-10 md:p-16" className="flex flex-col items-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: tokens.foreground }}>Stay in the loop</h2>
              <p className="text-lg mb-10" style={{ color: tokens.mutedForeground }}>
                Get updates on new features and releases. No spam, ever.
              </p>
              {status === 'success' ? (
                <div className="h-14 px-8 rounded-2xl flex items-center justify-center" style={{ boxShadow: shadows.insetDeep }}>
                    <p className="font-bold" style={{ color: tokens.accent }}>✓ You're on the list!</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-6 w-full max-w-md">
                  <label htmlFor="newsletter-email" className="sr-only">Email address</label>
                  <NeumorphicInput
                    id="newsletter-email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                  <NeumorphicButton
                    type="submit"
                    disabled={status === 'loading'}
                    isPrimary
                  >
                    {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
                  </NeumorphicButton>
                </form>
              )}
          </NeumorphicCard>
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
    <footer className="pt-24 pb-12" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="p-10 md:p-16 rounded-[40px] mb-8" style={{ boxShadow: shadows.insetDeep }}>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
            <div className="col-span-2 md:col-span-1">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6" style={{ boxShadow: shadows.extruded, backgroundColor: tokens.accent }}>
                     <span className="font-bold text-xl text-white">N</span>
                </div>
                <p className="font-bold text-lg mb-3" style={{ color: tokens.foreground }}>{PRODUCT_NAME}</p>
                <p className="text-sm leading-relaxed font-medium" style={{ color: tokens.mutedForeground }}>
                Building the future,<br/>one soft shadow at a time.
                </p>
            </div>
            {Object.entries(links).map(([group, items]) => (
                <div key={group}>
                <p className="font-bold text-sm mb-6" style={{ color: tokens.foreground }}>{group}</p>
                <ul className="space-y-4">
                    {items.map(item => (
                    <li key={item}>
                        <a href="#" className="text-sm font-medium hover:text-[#6C63FF] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6C63FF] rounded px-1" style={{ color: tokens.mutedForeground }}>
                        {item}
                        </a>
                    </li>
                    ))}
                </ul>
                </div>
            ))}
            </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between pt-6 gap-6">
          <p className="text-sm font-medium" style={{ color: tokens.mutedForeground }}>
            © 2026 {PRODUCT_NAME}. All rights reserved.
          </p>
          <a
            href="/"
            className="text-sm font-bold px-6 py-3 rounded-2xl transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6C63FF]"
            style={{ color: tokens.mutedForeground, boxShadow: shadows.extruded }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = shadows.extrudedHover}
            onMouseLeave={e => e.currentTarget.style.boxShadow = shadows.extruded}
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
    <div className={`${bodyFont.variable} font-sans min-h-screen selection:bg-[#6C63FF]/30`} style={{ backgroundColor: tokens.background }}>
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
