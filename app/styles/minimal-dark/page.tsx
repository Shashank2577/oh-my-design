'use client'

/**
 * Minimal Dark Style Page
 * High-contrast, clean lines, dark aesthetic. Perfect for developer tools.
 */

import { motion, useReducedMotion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Inter, JetBrains_Mono } from 'next/font/google'
import {
  Terminal, Code2, Zap, GitBranch, Cpu, Database,
  ArrowRight, Check, Star, ChevronDown
} from 'lucide-react'

// ─────────────────────────────────────────────
// FONTS
// ─────────────────────────────────────────────
const bodyFont = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const monoFont = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

// ─────────────────────────────────────────────
// DESIGN TOKENS
// ─────────────────────────────────────────────
const tokens = {
  background: '#0B0C10',
  backgroundAlt: '#12141A',
  foreground: '#FFFFFF',
  muted: '#1F222B',
  mutedForeground: '#8B949E',
  border: '#30363D',
  accent: '#64FFDA', // Cyan
  accentForeground: '#0B0C10',
  error: '#FF7B72',
}

// ─────────────────────────────────────────────
// MOTION HELPERS
// ─────────────────────────────────────────────
function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-5% 0px' })
  const shouldReduce = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      initial={shouldReduce ? false : { opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function StaggerContainer({ children, className = '' }: { children: React.ReactNode; className?: string }) {
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
      className={className}
    >
      {children}
    </motion.div>
  )
}

const staggerItem: import('framer-motion').Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────
const PRODUCT_NAME = 'dev_flow'
const TAGLINE = 'Code at the speed of thought.'
const DESCRIPTION = 'A minimal, high-performance development environment built for the modern web. Forget the bloat, focus on the code.'

const NAV_LINKS = ['Features', 'Pricing', 'Docs', 'Changelog']

const STATS = [
  { value: '0.1ms', label: 'Latency' },
  { value: '99.99%', label: 'Uptime' },
  { value: '50M+', label: 'Deployments' },
  { value: '10k+', label: 'Developers' },
]

const FEATURES = [
  { icon: Terminal, title: 'Integrated CLI', description: 'Powerful command-line tools built right into your workflow. No context switching.' },
  { icon: Zap, title: 'Instant Hot Reload', description: 'See your changes in milliseconds. Our custom bundler is optimized for speed.' },
  { icon: GitBranch, title: 'Git Native', description: 'Seamless version control. Commit, push, and resolve conflicts without leaving the editor.' },
  { icon: Code2, title: 'Intelligent Autocomplete', description: 'AI-assisted code completion that learns from your codebase and coding style.' },
  { icon: Cpu, title: 'Low Memory Footprint', description: 'Written in Rust to ensure your development environment stays fast and lightweight.' },
  { icon: Database, title: 'Local DB Sync', description: 'Automatically spin up and sync local databases that match your production schema.' },
]

const PRICING = [
  {
    name: 'Hobby',
    price: '$0',
    period: '/mo',
    description: 'Perfect for side projects and learning.',
    features: ['Up to 3 projects', 'Community support', 'Standard compute', 'Basic analytics'],
    cta: 'Start Free',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$19',
    period: '/mo',
    description: 'For professional developers and small teams.',
    features: ['Unlimited projects', 'Priority support', 'High-performance compute', 'Advanced analytics', 'Custom domains'],
    cta: 'Upgrade to Pro',
    highlighted: true,
  },
  {
    name: 'Team',
    price: '$49',
    period: '/user/mo',
    description: 'For growing teams that need collaboration.',
    features: ['Everything in Pro', 'Role-based access', 'SSO integration', 'Dedicated account manager', 'Audit logs'],
    cta: 'Contact Sales',
    highlighted: false,
  },
]

const TESTIMONIALS = [
  {
    name: 'Sarah Chen',
    role: 'Senior Engineer @ TechCorp',
    text: 'dev_flow completely changed how I work. It\'s fast, stays out of my way, and just works. I can\'t imagine going back.',
    rating: 5,
  },
  {
    name: 'Alex Rivera',
    role: 'Indie Developer',
    text: 'The absolute best environment for shipping quickly. The instant hot reload is like magic. Worth every penny.',
    rating: 5,
  },
  {
    name: 'Jordan Lee',
    role: 'CTO @ StartupX',
    text: 'We moved our entire engineering team to dev_flow. Onboarding takes minutes instead of days. Incredible tool.',
    rating: 5,
  },
]

const FAQ_ITEMS = [
  { q: 'Does it support my framework?', a: 'Yes. dev_flow supports React, Vue, Svelte, Angular, and vanilla JS out of the box with zero configuration required.' },
  { q: 'Can I self-host?', a: 'Self-hosting is available on our Enterprise plan. Contact sales for more information.' },
  { q: 'How does it handle environment variables?', a: 'We have a secure, encrypted secrets manager built-in that syncs across your team automatically.' },
  { q: 'Is there an API available?', a: 'Yes, full REST and GraphQL APIs are available for Pro and Team customers to integrate into existing CI/CD pipelines.' },
  { q: 'What happens if I go over my limits?', a: 'We\'ll never stop your workflow. We\'ll notify you and give you a 7-day grace period to upgrade or reduce usage.' },
  { q: 'Do you offer a student discount?', a: 'Yes, students and educators get 50% off the Pro plan with a valid .edu email address.' },
]

// ─────────────────────────────────────────────
// COMPONENTS
// ─────────────────────────────────────────────

function Navbar() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 border-b border-opacity-50 backdrop-blur-md"
      style={{ borderColor: tokens.border, backgroundColor: `${tokens.background}E6` }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Terminal className="h-5 w-5" style={{ color: tokens.accent }} />
          <span className={`font-bold text-lg tracking-tight ${monoFont.className}`} style={{ color: tokens.foreground }}>
            {PRODUCT_NAME}
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-sm transition-colors hover:opacity-100"
              style={{ color: tokens.mutedForeground }}
              onMouseEnter={(e) => e.currentTarget.style.color = tokens.foreground}
              onMouseLeave={(e) => e.currentTarget.style.color = tokens.mutedForeground}
            >
              {link}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <a href="#" className="hidden sm:block text-sm" style={{ color: tokens.mutedForeground }}>
            Log in
          </a>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`px-4 h-9 rounded text-sm font-medium ${monoFont.className}`}
            style={{ backgroundColor: tokens.accent, color: tokens.accentForeground }}
          >
            Deploy Now
          </motion.button>
        </div>
      </div>
    </nav>
  )
}

function Hero() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <section className="min-h-[90vh] flex items-center pt-20" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-6xl mx-auto px-6 py-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1, delayChildren: 0.1 }}
            className="max-w-2xl"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-6 text-xs uppercase tracking-wider ${monoFont.className}`}
              style={{ borderColor: tokens.border, color: tokens.accent, backgroundColor: `${tokens.accent}10` }}
            >
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: tokens.accent }} />
              v2.0 is now live
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold leading-tight mb-6 tracking-tight"
              style={{ color: tokens.foreground }}
            >
              {TAGLINE}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl mb-10 leading-relaxed"
              style={{ color: tokens.mutedForeground }}
            >
              {DESCRIPTION}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`h-12 px-6 rounded font-medium flex items-center justify-center gap-2 ${monoFont.className} text-sm`}
                style={{ backgroundColor: tokens.accent, color: tokens.accentForeground }}
              >
                Start Building <ArrowRight className="h-4 w-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02, backgroundColor: tokens.muted }}
                whileTap={{ scale: 0.98 }}
                className={`h-12 px-6 rounded font-medium border flex items-center justify-center gap-2 ${monoFont.className} text-sm`}
                style={{ borderColor: tokens.border, color: tokens.foreground }}
              >
                <Terminal className="h-4 w-4" /> Read Docs
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Code Window Visual */}
          <FadeUp delay={0.4} className="hidden lg:block w-full">
            <div
              className="w-full rounded-lg border overflow-hidden shadow-2xl"
              style={{ borderColor: tokens.border, backgroundColor: tokens.backgroundAlt }}
            >
              <div className="h-10 border-b flex items-center px-4 gap-2" style={{ borderColor: tokens.border }}>
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: tokens.border }} />
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: tokens.border }} />
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: tokens.border }} />
                </div>
                <div className={`mx-auto text-xs ${monoFont.className}`} style={{ color: tokens.mutedForeground }}>
                  ~/dev_flow/app.tsx
                </div>
              </div>
              <div className={`p-6 text-sm ${monoFont.className} leading-relaxed overflow-x-auto`}>
                <div style={{ color: tokens.mutedForeground }}>// Initialize dev_flow</div>
                <div className="mt-2" style={{ color: tokens.accent }}>import</div> <span style={{ color: tokens.foreground }}>{'{'} init {'}'}</span> <div className="inline" style={{ color: tokens.accent }}>from</div> <span style={{ color: '#FF7B72' }}>'dev_flow'</span>
                <div className="mt-4" style={{ color: tokens.foreground }}>
                  <span style={{ color: tokens.accent }}>const</span> app = init({'{'}
                </div>
                <div className="pl-4" style={{ color: tokens.foreground }}>
                  environment: <span style={{ color: '#FF7B72' }}>'production'</span>,
                </div>
                <div className="pl-4" style={{ color: tokens.foreground }}>
                  hotReload: <span style={{ color: tokens.accent }}>true</span>,
                </div>
                <div className="pl-4" style={{ color: tokens.foreground }}>
                  port: <span style={{ color: '#79C0FF' }}>3000</span>
                </div>
                <div style={{ color: tokens.foreground }}>{'}'})</div>
                <div className="mt-4" style={{ color: tokens.foreground }}>
                  app.start().then(() =&gt; {'{'}
                </div>
                <div className="pl-4" style={{ color: tokens.mutedForeground }}>
                  console.log(<span style={{ color: '#FF7B72' }}>'Ready in 0.1ms'</span>)
                </div>
                <div style={{ color: tokens.foreground }}>{'}'})</div>
                {mounted && (
                   <motion.div
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="inline-block w-2 h-4 ml-1 align-middle"
                    style={{ backgroundColor: tokens.accent }}
                  />
                )}
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}

function Stats() {
  return (
    <section className="py-12 border-y" style={{ borderColor: tokens.border, backgroundColor: tokens.backgroundAlt }}>
      <div className="max-w-6xl mx-auto px-6">
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map(stat => (
            <motion.div key={stat.label} variants={staggerItem} className="flex flex-col items-center md:items-start">
              <p className={`text-3xl md:text-4xl font-bold mb-2 ${monoFont.className}`} style={{ color: tokens.foreground }}>
                {stat.value}
              </p>
              <p className="text-sm uppercase tracking-widest" style={{ color: tokens.mutedForeground }}>
                {stat.label}
              </p>
            </motion.div>
          ))}
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
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight" style={{ color: tokens.foreground }}>
              Everything you need.<br/>Nothing you don't.
            </h2>
            <p className="text-lg max-w-2xl" style={{ color: tokens.mutedForeground }}>
              Designed for focus. We stripped away the visual noise so you can concentrate on shipping features.
            </p>
          </div>
        </FadeUp>
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map(feature => (
            <motion.div
              key={feature.title}
              variants={staggerItem}
              className="p-6 rounded-lg border group hover:border-opacity-100 transition-colors duration-300"
              style={{ borderColor: tokens.border, backgroundColor: tokens.backgroundAlt }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = tokens.mutedForeground}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = tokens.border}
            >
              <div className="h-10 w-10 rounded border flex items-center justify-center mb-6" style={{ borderColor: tokens.border, backgroundColor: tokens.background }}>
                <feature.icon className="h-5 w-5" style={{ color: tokens.accent }} strokeWidth={1.5} />
              </div>
              <h3 className="font-semibold text-lg mb-2" style={{ color: tokens.foreground }}>{feature.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: tokens.mutedForeground }}>{feature.description}</p>
            </motion.div>
          ))}
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
          <div className="flex flex-col md:flex-row gap-12 items-start">
             <div className="md:w-1/3">
                <div className={`text-xs uppercase tracking-widest mb-4 ${monoFont.className}`} style={{ color: tokens.accent }}>
                  Architecture
                </div>
                <h2 className="text-3xl font-bold tracking-tight mb-4" style={{ color: tokens.foreground }}>
                  Built on Rust. <br/>Deployed anywhere.
                </h2>
             </div>
            <div className="md:w-2/3 space-y-6">
              <p className="text-lg leading-relaxed" style={{ color: tokens.mutedForeground }}>
                Our core engine is rewritten from the ground up in Rust, providing predictable performance and minimal memory overhead. You get the speed of native code with the flexibility of modern web tools.
              </p>
              <p className="text-lg leading-relaxed" style={{ color: tokens.mutedForeground }}>
                The CLI integrates seamlessly with your existing CI/CD pipelines. Whether you deploy to Vercel, AWS, or your own bare-metal servers, <span style={{ color: tokens.foreground }}>dev_flow</span> generates optimized builds that just work.
              </p>
              <ul className="space-y-3 mt-4">
                 {['Zero-config build system', 'Native TypeScript support', 'WASM module integration'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm" style={{ color: tokens.foreground }}>
                      <Check className="h-4 w-4" style={{ color: tokens.accent }} />
                      {item}
                    </li>
                 ))}
              </ul>
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
          <div className="mb-16">
             <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight" style={{ color: tokens.foreground }}>Simple pricing</h2>
             <p className="text-lg" style={{ color: tokens.mutedForeground }}>Start free, upgrade when you need more power.</p>
          </div>
        </FadeUp>
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PRICING.map(tier => (
            <motion.div
              key={tier.name}
              variants={staggerItem}
              className="p-8 rounded-lg border relative flex flex-col"
              style={{
                borderColor: tier.highlighted ? tokens.accent : tokens.border,
                backgroundColor: tokens.backgroundAlt,
              }}
            >
              {tier.highlighted && (
                <div
                  className={`absolute top-0 right-8 -translate-y-1/2 px-3 py-1 text-[10px] uppercase tracking-widest rounded-sm ${monoFont.className}`}
                  style={{ backgroundColor: tokens.accent, color: tokens.accentForeground }}
                >
                  Recommended
                </div>
              )}
              <h3 className={`font-semibold text-xl mb-4 ${monoFont.className}`} style={{ color: tokens.foreground }}>{tier.name}</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-4xl font-bold tracking-tight" style={{ color: tokens.foreground }}>{tier.price}</span>
                <span className="text-sm" style={{ color: tokens.mutedForeground }}>{tier.period}</span>
              </div>
              <p className="text-sm mb-8 flex-grow" style={{ color: tokens.mutedForeground }}>{tier.description}</p>

              <ul className="space-y-4 mb-8">
                {tier.features.map(f => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <Check className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: tier.highlighted ? tokens.accent : tokens.mutedForeground }} />
                    <span style={{ color: tokens.foreground }}>{f}</span>
                  </li>
                ))}
              </ul>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full h-10 rounded text-sm font-medium border ${monoFont.className}`}
                style={tier.highlighted
                  ? { backgroundColor: tokens.accent, color: tokens.accentForeground, borderColor: tokens.accent }
                  : { backgroundColor: 'transparent', color: tokens.foreground, borderColor: tokens.border }
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
    <section id="testimonials" className="py-24 border-y" style={{ borderColor: tokens.border, backgroundColor: tokens.backgroundAlt }}>
      <div className="max-w-6xl mx-auto px-6">
        <FadeUp>
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight" style={{ color: tokens.foreground }}>Trusted by engineers</h2>
          </div>
        </FadeUp>
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              variants={staggerItem}
              className="p-8 rounded-lg border"
              style={{ borderColor: tokens.border, backgroundColor: tokens.background }}
            >
              <div className="flex mb-6 gap-1">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-current" style={{ color: tokens.accent }} />
                ))}
              </div>
              <p className="text-sm leading-relaxed mb-6" style={{ color: tokens.foreground }}>"{t.text}"</p>
              <div>
                <p className="font-medium text-sm" style={{ color: tokens.foreground }}>{t.name}</p>
                <p className={`text-xs mt-1 ${monoFont.className}`} style={{ color: tokens.mutedForeground }}>{t.role}</p>
              </div>
            </motion.div>
          ))}
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
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight" style={{ color: tokens.foreground }}>FAQ</h2>
          </div>
        </FadeUp>
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, i) => (
            <FadeUp key={i} delay={i * 0.05}>
              <div className="border rounded-lg overflow-hidden" style={{ borderColor: tokens.border }}>
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  aria-expanded={openIndex === i}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-opacity-50 transition-colors"
                  style={{ backgroundColor: openIndex === i ? tokens.backgroundAlt : tokens.background }}
                >
                  <span className="font-medium text-sm" style={{ color: tokens.foreground }}>{item.q}</span>
                  <motion.span
                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="h-4 w-4 flex-shrink-0" style={{ color: tokens.mutedForeground }} />
                  </motion.span>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openIndex === i ? 'auto' : 0, opacity: openIndex === i ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  style={{ overflow: 'hidden', backgroundColor: tokens.backgroundAlt }}
                >
                  <p className="px-6 pb-6 text-sm leading-relaxed" style={{ color: tokens.mutedForeground }}>
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
    setTimeout(() => setStatus('success'), 1000)
  }

  return (
    <section className="py-24 border-y" style={{ borderColor: tokens.border, backgroundColor: tokens.backgroundAlt }}>
      <div className="max-w-xl mx-auto px-6">
        <FadeUp>
          <div className="flex flex-col items-center text-center">
            <Terminal className="h-8 w-8 mb-6" style={{ color: tokens.accent }} />
            <h2 className="text-3xl font-bold mb-4 tracking-tight" style={{ color: tokens.foreground }}>Stay in the loop</h2>
            <p className="text-sm mb-8" style={{ color: tokens.mutedForeground }}>
              Subscribe to our newsletter for product updates and technical deep-dives. Zero spam.
            </p>
            {status === 'success' ? (
              <div className={`px-4 py-3 rounded border text-sm flex items-center gap-2 ${monoFont.className}`} style={{ borderColor: tokens.accent, color: tokens.accent, backgroundColor: `${tokens.accent}10` }}>
                <Check className="h-4 w-4" /> Subscribed successfully
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full">
                <label htmlFor="newsletter-email" className="sr-only">Email address</label>
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="hello@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className={`flex-1 h-10 px-4 rounded border text-sm outline-none transition-colors ${monoFont.className}`}
                  style={{
                    borderColor: tokens.border,
                    backgroundColor: tokens.background,
                    color: tokens.foreground,
                  }}
                  onFocus={(e) => e.target.style.borderColor = tokens.mutedForeground}
                  onBlur={(e) => e.target.style.borderColor = tokens.border}
                />
                <motion.button
                  type="submit"
                  disabled={status === 'loading'}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`h-10 px-6 rounded font-medium text-sm disabled:opacity-50 ${monoFont.className}`}
                  style={{ backgroundColor: tokens.foreground, color: tokens.background }}
                >
                  {status === 'loading' ? '...' : 'Subscribe'}
                </motion.button>
              </form>
            )}
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

function Footer() {
  const links = {
    Product: ['Features', 'Integrations', 'Pricing', 'Changelog'],
    Resources: ['Documentation', 'API Reference', 'Blog', 'Community'],
    Company: ['About', 'Careers', 'Contact', 'Legal'],
  }

  return (
    <footer className="py-16" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Terminal className="h-5 w-5" style={{ color: tokens.accent }} />
              <span className={`font-bold tracking-tight ${monoFont.className}`} style={{ color: tokens.foreground }}>
                {PRODUCT_NAME}
              </span>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: tokens.mutedForeground }}>
              Building the future of software development, one keystroke at a time.
            </p>
          </div>
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <p className={`font-semibold text-xs mb-4 uppercase tracking-widest ${monoFont.className}`} style={{ color: tokens.foreground }}>{group}</p>
              <ul className="space-y-3">
                {items.map(item => (
                  <li key={item}>
                    <a href="#" className="text-sm transition-colors hover:text-white" style={{ color: tokens.mutedForeground }}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t gap-4" style={{ borderColor: tokens.border }}>
          <p className={`text-xs ${monoFont.className}`} style={{ color: tokens.mutedForeground }}>
            © 2026 {PRODUCT_NAME}. All rights reserved.
          </p>
          <div className="flex gap-4">
             <a href="#" className="text-xs transition-colors hover:text-white" style={{ color: tokens.mutedForeground }}>Twitter</a>
             <a href="#" className="text-xs transition-colors hover:text-white" style={{ color: tokens.mutedForeground }}>GitHub</a>
             <a href="#" className="text-xs transition-colors hover:text-white" style={{ color: tokens.mutedForeground }}>Discord</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ─────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────
export default function MinimalDarkPage() {
  return (
    <div className={`${bodyFont.variable} ${monoFont.variable} font-sans min-h-screen selection:bg-[#64FFDA] selection:text-[#0B0C10]`} style={{ backgroundColor: tokens.background }}>
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
