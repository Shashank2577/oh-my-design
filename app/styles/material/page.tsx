'use client'

/**
 * PAGE: Material
 */

import { motion, useReducedMotion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Roboto } from 'next/font/google'
import {
  Star, ChevronDown, ArrowRight, Check, BookOpen, Layout,
  Palette, Code2, BarChart, Lock
} from 'lucide-react'

// ─────────────────────────────────────────────
// FONTS
// ─────────────────────────────────────────────
const roboto = Roboto({
  weight: ['400', '500', '700', '900'],
  subsets: ['latin'],
  variable: '--font-roboto',
  display: 'swap',
})

// ─────────────────────────────────────────────
// DESIGN TOKENS (Material Design 3)
// ─────────────────────────────────────────────
const tokens = {
  background: '#FDFBFF',
  backgroundAlt: '#F0EFFF',
  foreground: '#1A1B22',
  muted: '#E0E2EC',
  mutedForeground: '#44474E',
  border: '#C4C6D0',
  accent: '#6200EE',
  accentForeground: '#FFFFFF',
  surfaceContainer: '#F3EDF7',
  surfaceContainerHigh: '#ECE6F0',
  secondaryContainer: '#E8DEF8',
  onSecondaryContainer: '#1D192B',
}

// ─────────────────────────────────────────────
// MOTION HELPERS
// ─────────────────────────────────────────────
const m3Ease = [0.23, 1, 0.32, 1] as const // Emphasized decelerate (Requested ease)

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-5% 0px' })
  const shouldReduce = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      initial={shouldReduce ? false : { opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: m3Ease }}
    >
      {children}
    </motion.div>
  )
}

function StaggerContainer({ children, className }: { children: React.ReactNode; className?: string }) {
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
        visible: { transition: { staggerChildren: 0.05 } },
      }}
    >
      {children}
    </motion.div>
  )
}

const staggerItem = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: m3Ease } },
}

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────
const PRODUCT_NAME = 'MaterialDash'
const TAGLINE = 'Organize your digital life.'
const DESCRIPTION = 'A unified dashboard applying the principles of Material Design 3 to your daily workflow. Bringing structure, clarity, and beautiful color extraction to your data.'

const NAV_LINKS = ['Features', 'Pricing', 'Testimonials', 'FAQ']

const STATS = [
  { value: '2.5M+', label: 'Active Users' },
  { value: '4.8', label: 'Play Store Rating' },
  { value: '99.9%', label: 'Sync Reliability' },
  { value: '150+', label: 'Integrations' },
]

const FEATURES = [
  { icon: Layout, title: 'Adaptive Layouts', description: 'Interfaces that seamlessly transition from mobile to desktop following material guidelines.' },
  { icon: Palette, title: 'Dynamic Color', description: 'Personalize your entire workspace based on your wallpaper or chosen seed color.' },
  { icon: Code2, title: 'Developer API', description: 'Robust REST APIs to integrate your existing tools into the dashboard ecosystem.' },
  { icon: BarChart, title: 'Insightful Analytics', description: 'Clear, actionable data visualizations adhering to accessible contrast ratios.' },
  { icon: Lock, title: 'Secure Enclave', description: 'End-to-end encryption for all your stored notes and personal dashboard configurations.' },
  { icon: BookOpen, title: 'Material Components', description: 'Built utilizing the full suite of M3 components for a familiar, native feel.' },
]

const PRICING = [
  {
    name: 'Basic',
    price: '$0',
    period: 'forever',
    description: 'Essential organization for individuals.',
    features: ['3 Dashboards', 'Basic widgets', 'Standard sync', 'Community support'],
    cta: 'Get Started',
    highlighted: false,
  },
  {
    name: 'Premium',
    price: '$9',
    period: 'per month',
    description: 'Advanced tools for power users.',
    features: ['Unlimited dashboards', 'Premium widgets', 'Real-time sync', 'Priority support', 'Custom themes'],
    cta: 'Start Free Trial',
    highlighted: true,
  },
  {
    name: 'Workspace',
    price: '$24',
    period: 'per user/month',
    description: 'Collaborative environments for teams.',
    features: ['Everything in Premium', 'Shared dashboards', 'Admin controls', 'SSO integration', 'Dedicated success manager'],
    cta: 'Contact Sales',
    highlighted: false,
  },
]

const TESTIMONIALS = [
  {
    name: 'Alex Rivera',
    role: 'Product Manager',
    company: 'TechCorp',
    text: 'The familiarity of the Material interface meant my team adopted this tool instantly. It feels like a native extension of our OS.',
    rating: 5,
  },
  {
    name: 'Sam Taylor',
    role: 'Freelance Developer',
    company: 'Self-Employed',
    text: 'I love how clean and organized everything is. The dynamic color extraction makes it uniquely mine.',
    rating: 5,
  },
  {
    name: 'Jordan Lee',
    role: 'Design Lead',
    company: 'Creative Agency',
    text: 'They nailed the M3 implementation. The elevation, the ripples, the typography—it is a masterclass in applying Google\'s design language.',
    rating: 5,
  },
]

const FAQ_ITEMS = [
  { q: 'Is there a mobile app available?', a: 'Yes, MaterialDash is available on both Android and iOS, providing a seamless, native-feeling experience on both platforms.' },
  { q: 'Can I use my own color scheme?', a: 'Absolutely. We fully support Material You dynamic color. You can choose a seed color or let it extract from your device wallpaper.' },
  { q: 'How does the syncing work?', a: 'We use a proprietary conflict-free replicated data type (CRDT) system to ensure your data is always in sync across all devices instantaneously.' },
  { q: 'Do you offer a student discount?', a: 'Yes! Students and educators with a valid .edu email address receive 50% off the Premium plan.' },
]

// ─────────────────────────────────────────────
// COMPONENTS
// ─────────────────────────────────────────────

function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: m3Ease }}
      className="fixed top-0 left-0 right-0 z-50 shadow-sm"
      style={{ backgroundColor: tokens.surfaceContainer }}
    >
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: tokens.accent, color: tokens.accentForeground }}>
              <Layout className="w-5 h-5" />
           </div>
          <span className="font-medium text-[22px] tracking-tight" style={{ color: tokens.foreground }}>
            {PRODUCT_NAME}
          </span>
        </div>
        <div className="hidden md:flex items-center gap-2">
          {NAV_LINKS.map(link => (
            <motion.a
              whileHover={{ backgroundColor: tokens.surfaceContainerHigh }}
              whileTap={{ scale: 0.95 }}
              key={link}
              href={`#${link.toLowerCase()}`}
              className="px-4 py-2 rounded-full text-sm font-medium transition-colors"
              style={{ color: tokens.mutedForeground }}
            >
              {link}
            </motion.a>
          ))}
        </div>
        <motion.button
          whileHover={{ boxShadow: '0px 1px 3px 1px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.30)' }}
          whileTap={{ scale: 0.95, boxShadow: 'none' }}
          className="px-6 h-10 rounded-full text-sm font-medium transition-shadow"
          style={{ backgroundColor: tokens.accent, color: tokens.accentForeground }}
        >
          Get Started
        </motion.button>
      </div>
    </motion.nav>
  )
}

function Hero() {
  return (
    <section className="pt-32 pb-20 px-4 min-h-[90vh] flex flex-col justify-center" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-6xl mx-auto w-full text-center">
        <FadeUp>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: m3Ease }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 text-sm font-medium"
            style={{ backgroundColor: tokens.secondaryContainer, color: tokens.onSecondaryContainer }}
          >
            <Star className="w-4 h-4" /> Introducing MaterialDash 3.0
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-normal tracking-tight mb-6" style={{ color: tokens.foreground }}>
            {TAGLINE}
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed" style={{ color: tokens.mutedForeground }}>
            {DESCRIPTION}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              whileHover={{ boxShadow: '0px 2px 6px 2px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.30)' }}
              whileTap={{ scale: 0.95, boxShadow: 'none' }}
              className="h-14 px-8 rounded-full text-base font-medium transition-shadow w-full sm:w-auto"
              style={{ backgroundColor: tokens.accent, color: tokens.accentForeground }}
            >
              Download for Android
            </motion.button>
            <motion.button
              whileHover={{ backgroundColor: tokens.surfaceContainerHigh }}
              whileTap={{ scale: 0.95 }}
              className="h-14 px-8 rounded-full text-base font-medium border transition-colors w-full sm:w-auto"
              style={{ borderColor: tokens.border, color: tokens.accent }}
            >
              Open Web App
            </motion.button>
          </div>
        </FadeUp>

        <FadeUp delay={0.2}>
          <div className="mt-20 mx-auto max-w-5xl rounded-[32px] overflow-hidden p-2" style={{ backgroundColor: tokens.surfaceContainerHigh }}>
            <div
              className="w-full aspect-[16/9] rounded-[24px] shadow-lg"
              style={{
                backgroundImage: 'url("https://images.unsplash.com/photo-1618761714954-0b8cd0026356?q=80&w=2070&auto=format&fit=crop")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

function Stats() {
  return (
    <section className="py-16" style={{ backgroundColor: tokens.surfaceContainer }}>
      <div className="max-w-6xl mx-auto px-4">
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATS.map((stat) => (
              <motion.div
                key={stat.label}
                variants={staggerItem}
                className="p-6 rounded-[24px] text-center"
                style={{ backgroundColor: tokens.background }}
              >
                <p className="text-4xl font-normal mb-1" style={{ color: tokens.accent }}>{stat.value}</p>
                <p className="text-sm font-medium tracking-wide" style={{ color: tokens.mutedForeground }}>{stat.label}</p>
              </motion.div>
            ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

function Features() {
  return (
    <section id="features" className="py-24 px-4" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-6xl mx-auto">
        <FadeUp>
          <div className="mb-16">
            <h2 className="text-4xl font-normal tracking-tight mb-4" style={{ color: tokens.foreground }}>
              Built on Material Principles
            </h2>
            <p className="text-lg max-w-2xl" style={{ color: tokens.mutedForeground }}>
              Every interaction is designed to feel natural, responsive, and unmistakably modern.
            </p>
          </div>
        </FadeUp>
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FEATURES.map(feature => (
              <motion.div
                key={feature.title}
                variants={staggerItem}
                whileHover={{ y: -4, boxShadow: '0px 4px 8px 3px rgba(0, 0, 0, 0.15), 0px 1px 3px 0px rgba(0, 0, 0, 0.30)' }}
                className="p-8 rounded-[28px] transition-shadow duration-300"
                style={{ backgroundColor: tokens.surfaceContainerHigh }}
              >
                <div className="w-12 h-12 rounded-[16px] flex items-center justify-center mb-6" style={{ backgroundColor: tokens.secondaryContainer, color: tokens.onSecondaryContainer }}>
                    <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="font-medium text-xl mb-2 tracking-tight" style={{ color: tokens.foreground }}>{feature.title}</h3>
                <p className="text-base leading-relaxed" style={{ color: tokens.mutedForeground }}>{feature.description}</p>
              </motion.div>
            ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

function ProductDetail() {
  return (
    <section className="py-24 px-4" style={{ backgroundColor: tokens.surfaceContainer }}>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
        <div className="flex-1 w-full">
            <FadeUp>
               <div className="rounded-[32px] overflow-hidden aspect-square shadow-md" style={{ backgroundColor: tokens.secondaryContainer }}>
                  <div className="w-full h-full p-8 flex flex-col justify-between">
                     <div className="flex justify-between items-start">
                        <div className="w-16 h-16 rounded-full" style={{ backgroundColor: tokens.accent }} />
                        <div className="w-24 h-8 rounded-full" style={{ backgroundColor: tokens.background }} />
                     </div>
                     <div className="space-y-4">
                        <div className="w-full h-24 rounded-[20px]" style={{ backgroundColor: tokens.background }} />
                        <div className="w-3/4 h-24 rounded-[20px]" style={{ backgroundColor: tokens.background }} />
                     </div>
                  </div>
               </div>
            </FadeUp>
        </div>
        <div className="flex-1">
          <FadeUp delay={0.2}>
            <h2 className="text-4xl font-normal tracking-tight mb-6" style={{ color: tokens.foreground }}>
              Your workspace, completely personalized.
            </h2>
            <div className="space-y-6">
              <p className="text-lg leading-relaxed" style={{ color: tokens.mutedForeground }}>
                MaterialDash uses the new dynamic color system to extract dominant colors from your wallpaper or a chosen seed color, applying a harmonious palette across the entire app.
              </p>
              <ul className="space-y-4">
                  {['Accessible contrast ratios guaranteed', 'Light and dark mode support', 'Seamless transition animations'].map((item) => (
                      <li key={item} className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: tokens.accent, color: tokens.accentForeground }}>
                              <Check className="w-4 h-4" />
                          </div>
                          <span style={{ color: tokens.foreground }}>{item}</span>
                      </li>
                  ))}
              </ul>
              <div className="pt-4">
                 <motion.button
                    whileHover={{ backgroundColor: tokens.surfaceContainerHigh }}
                    whileTap={{ scale: 0.95 }}
                    className="h-12 px-6 rounded-full text-sm font-medium border flex items-center gap-2 transition-colors"
                    style={{ borderColor: tokens.border, color: tokens.accent }}
                  >
                    Learn about Dynamic Color <ArrowRight className="w-4 h-4" />
                  </motion.button>
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
    <section id="pricing" className="py-24 px-4" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-6xl mx-auto">
        <FadeUp>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-normal tracking-tight mb-4" style={{ color: tokens.foreground }}>Simple, transparent pricing</h2>
            <p className="text-lg" style={{ color: tokens.mutedForeground }}>Choose the plan that fits your workflow.</p>
          </div>
        </FadeUp>
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRICING.map(tier => (
              <motion.div
                key={tier.name}
                variants={staggerItem}
                whileHover={{ y: -4, boxShadow: '0px 4px 8px 3px rgba(0, 0, 0, 0.15), 0px 1px 3px 0px rgba(0, 0, 0, 0.30)' }}
                className="p-8 rounded-[28px] relative transition-all duration-300 flex flex-col"
                style={{
                  backgroundColor: tier.highlighted ? tokens.secondaryContainer : tokens.surfaceContainerHigh,
                }}
              >
                <div className="mb-6">
                   <h3 className="font-medium text-2xl mb-2" style={{ color: tokens.foreground }}>{tier.name}</h3>
                   <div className="flex items-baseline gap-1 mb-2">
                     <span className="text-4xl font-normal" style={{ color: tokens.foreground }}>{tier.price}</span>
                     <span className="text-sm font-medium" style={{ color: tokens.mutedForeground }}>/ {tier.period}</span>
                   </div>
                   <p className="text-sm" style={{ color: tokens.mutedForeground }}>{tier.description}</p>
                </div>

                <ul className="space-y-4 mb-8 flex-grow">
                  {tier.features.map(f => (
                    <li key={f} className="flex items-center gap-3 text-sm">
                      <Check className="h-5 w-5 flex-shrink-0" style={{ color: tokens.accent }} />
                      <span style={{ color: tokens.foreground }}>{f}</span>
                    </li>
                  ))}
                </ul>
                <motion.button
                  whileHover={{ boxShadow: tier.highlighted ? '0px 2px 6px 2px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.30)' : 'none', backgroundColor: !tier.highlighted ? tokens.surfaceContainer : undefined }}
                  whileTap={{ scale: 0.95, boxShadow: 'none' }}
                  className="w-full h-12 rounded-full font-medium text-sm transition-all"
                  style={tier.highlighted
                    ? { backgroundColor: tokens.accent, color: tokens.accentForeground }
                    : { backgroundColor: 'transparent', color: tokens.accent, border: `1px solid ${tokens.border}` }
                  }
                >
                  {tier.cta}
                </motion.button>
              </motion.div>
            ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

function Testimonials() {
  return (
    <section id="testimonials" className="py-24 px-4" style={{ backgroundColor: tokens.surfaceContainerHigh }}>
      <div className="max-w-6xl mx-auto">
        <FadeUp>
          <div className="mb-16">
            <h2 className="text-4xl font-normal tracking-tight mb-4" style={{ color: tokens.foreground }}>Loved by users</h2>
          </div>
        </FadeUp>
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map(t => (
              <motion.div
                key={t.name}
                variants={staggerItem}
                className="p-8 rounded-[24px]"
                style={{ backgroundColor: tokens.background }}
              >
                <div className="flex mb-6 gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" style={{ color: tokens.accent }} />
                  ))}
                </div>
                <p className="text-base leading-relaxed mb-8" style={{ color: tokens.foreground }}>"{t.text}"</p>
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg" style={{ backgroundColor: tokens.secondaryContainer, color: tokens.onSecondaryContainer }}>
                      {t.name.charAt(0)}
                   </div>
                  <div>
                    <p className="font-medium text-sm" style={{ color: tokens.foreground }}>{t.name}</p>
                    <p className="text-xs tracking-wide" style={{ color: tokens.mutedForeground }}>{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="py-24 px-4" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-3xl mx-auto">
        <FadeUp>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-normal tracking-tight" style={{ color: tokens.foreground }}>Frequently Asked Questions</h2>
          </div>
        </FadeUp>
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, i) => (
            <FadeUp key={i} delay={i * 0.05}>
              <div className="rounded-[24px] overflow-hidden" style={{ backgroundColor: tokens.surfaceContainer }}>
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  aria-expanded={openIndex === i}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-medium text-lg" style={{ color: tokens.foreground }}>{item.q}</span>
                  <motion.span
                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: m3Ease }}
                  >
                    <ChevronDown className="h-6 w-6 flex-shrink-0" style={{ color: tokens.mutedForeground }} />
                  </motion.span>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openIndex === i ? 'auto' : 0, opacity: openIndex === i ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: m3Ease }}
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

function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setTimeout(() => setStatus('success'), 1200)
  }

  return (
    <section className="py-24 px-4" style={{ backgroundColor: tokens.surfaceContainerHigh }}>
      <div className="max-w-4xl mx-auto rounded-[32px] p-8 md:p-16 text-center" style={{ backgroundColor: tokens.secondaryContainer }}>
        <FadeUp>
          <h2 className="text-3xl md:text-4xl font-normal tracking-tight mb-4" style={{ color: tokens.onSecondaryContainer }}>Stay updated</h2>
          <p className="text-lg mb-8 max-w-xl mx-auto" style={{ color: tokens.onSecondaryContainer, opacity: 0.8 }}>
            Get the latest updates on new material features and releases.
          </p>
          {status === 'success' ? (
            <p className="font-medium flex items-center justify-center gap-2" style={{ color: tokens.accent }}>
                <Check className="w-5 h-5"/> You are subscribed!
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
              <label htmlFor="newsletter-email" className="sr-only">Email address</label>
              <input
                id="newsletter-email"
                type="email"
                required
                autoComplete="email"
                placeholder="Email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="flex-1 h-14 px-6 rounded-full text-base transition-colors focus:outline-none focus:ring-2"
                style={{ backgroundColor: tokens.background, color: tokens.foreground, '--tw-ring-color': tokens.accent } as React.CSSProperties}
              />
              <motion.button
                type="submit"
                disabled={status === 'loading'}
                whileHover={{ boxShadow: '0px 1px 3px 1px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.30)' }}
                whileTap={{ scale: 0.95, boxShadow: 'none' }}
                className="h-14 px-8 rounded-full font-medium text-base disabled:opacity-60 transition-shadow"
                style={{ backgroundColor: tokens.accent, color: tokens.accentForeground }}
              >
                {status === 'loading' ? 'Submitting' : 'Subscribe'}
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
    Product: ['Features', 'Integrations', 'Pricing', 'Changelog'],
    Resources: ['Documentation', 'Material Guidelines', 'Community', 'Blog'],
    Company: ['About', 'Careers', 'Contact', 'Partners'],
    Legal: ['Privacy', 'Terms', 'Security'],
  }

  return (
    <footer className="py-16 px-4" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
             <div className="flex items-center gap-2 mb-4">
                 <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: tokens.accent, color: tokens.accentForeground }}>
                    <Layout className="w-5 h-5" />
                 </div>
                <p className="font-medium text-xl" style={{ color: tokens.foreground }}>{PRODUCT_NAME}</p>
             </div>
            <p className="text-sm leading-relaxed" style={{ color: tokens.mutedForeground }}>
              Applying Material Design 3 principles to everyday organization.
            </p>
          </div>
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <p className="font-medium text-base mb-4" style={{ color: tokens.foreground }}>{group}</p>
              <ul className="space-y-3">
                {items.map(item => (
                  <li key={item}>
                    <a href="#" className="text-sm hover:underline" style={{ color: tokens.mutedForeground }}>
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
            © {new Date().getFullYear()} {PRODUCT_NAME}.
          </p>
          <a
            href="/"
            className="text-sm font-medium px-4 py-2 rounded-full transition-colors"
            style={{ color: tokens.accent, backgroundColor: tokens.surfaceContainer }}
          >
            ← Back to Styles
          </a>
        </div>
      </div>
    </footer>
  )
}

// ─────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────
export default function MaterialPage() {
  return (
    <div className={`min-h-screen font-sans ${roboto.variable}`} style={{ backgroundColor: tokens.background }}>
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
