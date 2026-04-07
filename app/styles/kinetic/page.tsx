'use client'

import { motion, useReducedMotion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Space_Grotesk } from 'next/font/google'
import {
  Star, ArrowRight, Check, Zap, Plus, Hash, MoveRight, ArrowUpRight, Maximize2
} from 'lucide-react'

// ─────────────────────────────────────────────
// FONTS
// ─────────────────────────────────────────────
const bodyFont = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

// ─────────────────────────────────────────────
// DESIGN TOKENS
// ─────────────────────────────────────────────
const tokens = {
  background: '#09090B',
  foreground: '#FAFAFA',
  muted: '#27272A',
  mutedForeground: '#A1A1AA',
  border: '#3F3F46',
  accent: '#DFE104',
  accentForeground: '#000000',
}

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────
const PRODUCT_NAME = 'KINETIC'
const TAGLINE = 'THE NEW STANDARD'
const DESCRIPTION = 'Relentless motion. Aggressive scale. A synthetic reality drenched in brutalist geometry and acid yellow energy.'

const NAV_LINKS = ['FEATURES', 'SYSTEM', 'TESTIMONIALS', 'FAQ']

const STATS = [
  { value: '50K+', label: 'ACTIVE USERS' },
  { value: '99.9%', label: 'UPTIME SLA' },
  { value: '140+', label: 'COUNTRIES' },
  { value: '4.9/5', label: 'USER RATING' },
]

const FEATURES = [
  { icon: Zap, title: 'HIGH ENERGY', description: 'Aggressive uppercase treatment and massive numerical elements that refuse to be ignored.' },
  { icon: Hash, title: 'BRUTAL GRID', description: 'Hairline grid dividers create connected systems with zero border-radius.' },
  { icon: MoveRight, title: 'RELENTLESS', description: 'Infinite marquees that never stop moving, keeping the visual rhythm fast and loud.' },
  { icon: Maximize2, title: 'FLUID SCALE', description: 'Viewport-responsive typography that scales dramatically from mobile to ultra-wide displays.' },
  { icon: ArrowUpRight, title: 'INSTANT FLIP', description: 'Hard color inversions on hover. No soft fades, just instant digital state changes.' },
  { icon: Plus, title: 'MAX CONTRAST', description: 'Off-white on rich black with acid yellow accents. Pushing contrast to the extremes.' },
]

const PRICING = [
  {
    name: 'CORE',
    price: '$0',
    period: 'FOREVER',
    description: 'ESSENTIAL TOOLS FOR INDIVIDUAL CREATORS.',
    features: ['5 PROJECTS', '1 USER', 'BASIC ANALYTICS', 'COMMUNITY SUPPORT'],
    cta: 'GET CORE',
    highlighted: false,
  },
  {
    name: 'PRO',
    price: '$29',
    period: 'PER MONTH',
    description: 'ADVANCED POWER FOR GROWING TEAMS.',
    features: ['UNLIMITED PROJECTS', '10 USERS', 'ADVANCED ANALYTICS', 'PRIORITY SUPPORT', 'CUSTOM DOMAINS'],
    cta: 'UPGRADE TO PRO',
    highlighted: true,
  },
  {
    name: 'MAX',
    price: '$99',
    period: 'PER MONTH',
    description: 'UNLIMITED SCALE FOR ENTERPRISE.',
    features: ['EVERYTHING IN PRO', 'UNLIMITED USERS', 'SSO / SAML', 'DEDICATED SUPPORT', 'SLA GUARANTEE'],
    cta: 'CONTACT SALES',
    highlighted: false,
  },
]

const TESTIMONIALS = [
  {
    name: 'ALEXANDRA CHEN',
    role: 'PRODUCT LEAD',
    company: 'ACME CORP',
    text: 'THIS PRODUCT COMPLETELY TRANSFORMED HOW OUR TEAM WORKS. THE RESULTS HAVE BEEN INCREDIBLE.',
    rating: 5,
  },
  {
    name: 'MARCUS WILLIAMS',
    role: 'CTO',
    company: 'STARTUPXYZ',
    text: 'I HAVE TRIED MANY TOOLS IN THIS SPACE, BUT NOTHING COMES CLOSE. THE QUALITY IS EXCEPTIONAL.',
    rating: 5,
  },
  {
    name: 'SOFIA RODRIGUEZ',
    role: 'DESIGNER',
    company: 'CREATIVE STUDIO',
    text: 'THE ATTENTION TO DETAIL IS REMARKABLE. EVERY INTERACTION FEELS INTENTIONAL AND POLISHED.',
    rating: 5,
  },
]

const FAQ_ITEMS = [
  { q: 'HOW DO I GET STARTED?', a: 'SIGN UP FOR A FREE ACCOUNT AND FOLLOW THE ONBOARDING WIZARD. YOU WILL BE UP AND RUNNING IN UNDER 5 MINUTES.' },
  { q: 'CAN I CANCEL ANYTIME?', a: 'YES. THERE ARE NO LONG-TERM COMMITMENTS. CANCEL YOUR SUBSCRIPTION AT ANY TIME FROM YOUR ACCOUNT SETTINGS.' },
  { q: 'DO YOU OFFER A FREE TRIAL?', a: 'YES. ALL PRO FEATURES ARE AVAILABLE FREE FOR 14 DAYS. NO CREDIT CARD REQUIRED.' },
  { q: 'WHAT PAYMENT METHODS DO YOU ACCEPT?', a: 'WE ACCEPT ALL MAJOR CREDIT CARDS, PAYPAL, AND BANK TRANSFERS FOR ENTERPRISE PLANS.' },
  { q: 'IS MY DATA SECURE?', a: 'SECURITY IS OUR TOP PRIORITY. ALL DATA IS ENCRYPTED IN TRANSIT AND AT REST. WE ARE SOC 2 TYPE II CERTIFIED.' },
  { q: 'DO YOU HAVE AN API?', a: 'YES, WE OFFER A COMPREHENSIVE REST API WITH FULL DOCUMENTATION AVAILABLE FOR PRO AND ENTERPRISE CUSTOMERS.' },
]

// ─────────────────────────────────────────────
// MOTION HELPERS
// ─────────────────────────────────────────────
function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-5% 0px' })
  const shouldReduce = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={shouldReduce ? false : { opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay, ease: [0.23, 1, 0.32, 1] }}
    >
      {children}
    </motion.div>
  )
}

// ─────────────────────────────────────────────
// COMPONENTS
// ─────────────────────────────────────────────

function Navbar() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 border-b-2"
      style={{ borderColor: tokens.border, backgroundColor: tokens.background }}
    >
      <div className="max-w-[95vw] mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        <span className="font-bold text-2xl tracking-tighter" style={{ color: tokens.foreground }}>
          {PRODUCT_NAME}
        </span>
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-sm font-bold tracking-widest transition-colors hover:text-[#DFE104]"
              style={{ color: tokens.mutedForeground }}
            >
              {link}
            </a>
          ))}
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="h-12 px-8 font-bold text-sm tracking-wider uppercase"
          style={{ backgroundColor: tokens.accent, color: tokens.accentForeground }}
        >
          START NOW
        </motion.button>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center pt-20 border-b-2" style={{ borderColor: tokens.border, backgroundColor: tokens.background }}>
      <div className="max-w-[95vw] mx-auto px-4 sm:px-6 py-20 w-full relative">
        <FadeUp>
          <h1
            className="font-bold uppercase tracking-tighter leading-[0.8] mb-8"
            style={{
              color: tokens.foreground,
              fontSize: 'clamp(4rem, 12vw, 12rem)'
            }}
          >
            {TAGLINE}
          </h1>
          <div className="max-w-2xl">
            <p
              className="text-xl md:text-3xl font-medium leading-tight mb-12 uppercase"
              style={{ color: tokens.mutedForeground }}
            >
              {DESCRIPTION}
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="h-16 px-10 font-bold text-lg tracking-wider uppercase flex items-center justify-center gap-3"
                style={{ backgroundColor: tokens.accent, color: tokens.accentForeground }}
              >
                DEPLOY SYSTEM <ArrowRight className="h-6 w-6" />
              </motion.button>
              <motion.button
                whileHover={{ backgroundColor: tokens.foreground, color: tokens.background }}
                whileTap={{ scale: 0.95 }}
                className="h-16 px-10 font-bold text-lg tracking-wider uppercase border-2 transition-colors duration-100"
                style={{ borderColor: tokens.border, color: tokens.foreground, backgroundColor: 'transparent' }}
              >
                VIEW DOCS
              </motion.button>
            </div>
          </div>
        </FadeUp>

        {/* Giant decorative text behind */}
        <div
          className="absolute top-0 right-0 pointer-events-none select-none font-bold opacity-10 tracking-tighter hidden lg:block"
          style={{ fontSize: 'clamp(10rem, 25vw, 30rem)', lineHeight: '0.8', color: tokens.muted, zIndex: 0 }}
        >
          K-99
        </div>
      </div>
    </section>
  )
}

function Stats() {
  // We use CSS animation for marquee since we can't be sure react-fast-marquee is installed
  return (
    <section className="border-b-2 overflow-hidden flex items-center h-40" style={{ borderColor: tokens.border, backgroundColor: tokens.accent }}>
      <div className="flex whitespace-nowrap animate-[marquee_20s_linear_infinite]">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center">
            {STATS.map(stat => (
              <div key={stat.label} className="flex items-center mx-12">
                <span className="text-6xl md:text-8xl font-bold tracking-tighter" style={{ color: tokens.accentForeground }}>{stat.value}</span>
                <span className="ml-4 text-xl md:text-2xl font-bold tracking-widest" style={{ color: tokens.accentForeground }}>{stat.label}</span>
                <span className="mx-12 text-6xl font-bold" style={{ color: tokens.accentForeground }}>*</span>
              </div>
            ))}
          </div>
        ))}
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}} />
    </section>
  )
}

function Features() {
  return (
    <section id="features" className="py-32 border-b-2" style={{ borderColor: tokens.border, backgroundColor: tokens.background }}>
      <div className="max-w-[95vw] mx-auto px-4 sm:px-6">
        <FadeUp>
          <div className="mb-20">
            <h2 className="font-bold tracking-tighter leading-none mb-6 uppercase" style={{ color: tokens.foreground, fontSize: 'clamp(3rem, 8vw, 8rem)' }}>
              SYSTEM<br/>CAPABILITIES
            </h2>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#3F3F46] border-2 border-[#3F3F46]">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              className="group p-10 flex flex-col justify-between min-h-[320px] transition-colors duration-150 relative overflow-hidden"
              style={{ backgroundColor: tokens.background }}
              whileHover={{ backgroundColor: tokens.accent }}
            >
              <div className="mb-12 relative z-10">
                <feature.icon className="h-12 w-12 mb-8 transition-colors duration-150 group-hover:text-black" style={{ color: tokens.accent }} strokeWidth={2} />
                <h3 className="font-bold text-3xl md:text-4xl uppercase tracking-tight mb-4 transition-colors duration-150 group-hover:text-black" style={{ color: tokens.foreground }}>
                  {feature.title}
                </h3>
                <p className="text-lg md:text-xl font-medium transition-colors duration-150 group-hover:text-black/80 uppercase" style={{ color: tokens.mutedForeground }}>
                  {feature.description}
                </p>
              </div>

              <div className="absolute -bottom-10 -right-4 font-bold text-[8rem] leading-none opacity-20 transition-colors duration-150 group-hover:text-black group-hover:opacity-20 pointer-events-none select-none" style={{ color: tokens.muted }}>
                0{i + 1}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProductDetail() {
  return (
    <section className="py-32 border-b-2" style={{ borderColor: tokens.border, backgroundColor: tokens.background }}>
      <div className="max-w-[95vw] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <FadeUp>
            <h2 className="font-bold tracking-tighter leading-[0.9] uppercase" style={{ color: tokens.foreground, fontSize: 'clamp(3rem, 6vw, 6rem)' }}>
              NO SOFT EDGES.<br/>
              NO SUBTLE FADES.<br/>
              JUST RAW POWER.
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <div className="space-y-8">
              <p className="text-2xl font-medium leading-tight uppercase" style={{ color: tokens.mutedForeground }}>
                THIS ARCHITECTURE IS DESIGNED FOR MAXIMUM IMPACT. WE STRIPPED AWAY EVERYTHING UNNECESSARY TO LEAVE ONLY WHAT DRIVES RESULTS.
              </p>
              <p className="text-2xl font-medium leading-tight uppercase" style={{ color: tokens.mutedForeground }}>
                BUILT ON A FOUNDATION OF BRUTALIST GEOMETRY AND ACID ACCENTS, THE INTERFACE DEMANDS ATTENTION AND REWARDS DECISIVE ACTION.
              </p>
              <motion.button
                whileHover={{ backgroundColor: tokens.foreground, color: tokens.background }}
                whileTap={{ scale: 0.95 }}
                className="mt-8 h-16 px-10 font-bold text-lg tracking-wider uppercase border-2 transition-colors duration-100"
                style={{ borderColor: tokens.border, color: tokens.foreground, backgroundColor: 'transparent' }}
              >
                READ MANIFESTO
              </motion.button>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}

function Pricing() {
  return (
    <section id="pricing" className="py-32 border-b-2" style={{ borderColor: tokens.border, backgroundColor: tokens.background }}>
      <div className="max-w-[95vw] mx-auto px-4 sm:px-6">
        <FadeUp>
          <div className="mb-20">
            <h2 className="font-bold tracking-tighter leading-none mb-6 uppercase" style={{ color: tokens.foreground, fontSize: 'clamp(3rem, 8vw, 8rem)' }}>
              ACCESS<br/>TIERS
            </h2>
          </div>
        </FadeUp>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-[#3F3F46] border-2 border-[#3F3F46]">
          {PRICING.map((tier) => (
            <motion.div
              key={tier.name}
              className="group p-10 flex flex-col h-full transition-colors duration-150 relative"
              style={{
                backgroundColor: tier.highlighted ? tokens.muted : tokens.background
              }}
              whileHover={{ backgroundColor: tokens.accent }}
            >
              {tier.highlighted && (
                <div className="absolute top-0 right-0 bg-[#DFE104] text-black font-bold text-xs tracking-widest px-4 py-2 uppercase border-b-2 border-l-2 border-[#3F3F46] group-hover:border-black group-hover:bg-black group-hover:text-[#DFE104] transition-colors duration-150">
                  RECOMMENDED
                </div>
              )}
              <h3 className="font-bold text-4xl uppercase tracking-tighter mb-2 transition-colors duration-150 group-hover:text-black" style={{ color: tokens.foreground }}>
                {tier.name}
              </h3>
              <p className="text-sm font-bold tracking-widest mb-10 transition-colors duration-150 group-hover:text-black/80 uppercase" style={{ color: tokens.mutedForeground }}>
                {tier.description}
              </p>

              <div className="mb-12">
                <span className="text-7xl font-bold tracking-tighter transition-colors duration-150 group-hover:text-black" style={{ color: tokens.foreground }}>{tier.price}</span>
                <span className="text-xl font-bold tracking-wider ml-2 transition-colors duration-150 group-hover:text-black/80 uppercase" style={{ color: tokens.mutedForeground }}>/ {tier.period}</span>
              </div>

              <ul className="space-y-4 mb-12 flex-grow">
                {tier.features.map(f => (
                  <li key={f} className="flex items-start gap-4 text-lg font-medium uppercase">
                    <Check className="h-6 w-6 flex-shrink-0 transition-colors duration-150 group-hover:text-black" style={{ color: tokens.accent }} strokeWidth={3} />
                    <span className="transition-colors duration-150 group-hover:text-black" style={{ color: tokens.foreground }}>{f}</span>
                  </li>
                ))}
              </ul>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full h-16 font-bold text-lg tracking-wider uppercase border-2 transition-colors duration-150"
                style={{
                  backgroundColor: tier.highlighted ? tokens.accent : 'transparent',
                  color: tier.highlighted ? tokens.accentForeground : tokens.foreground,
                  borderColor: tier.highlighted ? tokens.accent : tokens.border
                }}
              >
                {tier.cta}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Testimonials() {
  return (
    <section id="testimonials" className="py-32 border-b-2" style={{ borderColor: tokens.border, backgroundColor: tokens.background }}>
      <div className="max-w-[95vw] mx-auto px-4 sm:px-6">
        <FadeUp>
          <div className="mb-20">
            <h2 className="font-bold tracking-tighter leading-none mb-6 uppercase" style={{ color: tokens.foreground, fontSize: 'clamp(3rem, 8vw, 8rem)' }}>
              FIELD<br/>REPORTS
            </h2>
          </div>
        </FadeUp>

        {/* We use a simple grid here instead of marquee for variation, but keeping the brutalist styling */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              className="p-10 border-2 flex flex-col justify-between"
              style={{ borderColor: tokens.border, backgroundColor: tokens.background }}
              whileHover={{ backgroundColor: tokens.muted }}
            >
              <div className="mb-12">
                <div className="flex mb-8 gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-6 w-6" style={{ fill: tokens.accent, color: tokens.accent }} />
                  ))}
                </div>
                <p className="text-2xl font-bold uppercase leading-tight" style={{ color: tokens.foreground }}>
                  "{t.text}"
                </p>
              </div>
              <div className="pt-8 border-t-2" style={{ borderColor: tokens.border }}>
                <p className="font-bold text-xl uppercase tracking-tight" style={{ color: tokens.foreground }}>{t.name}</p>
                <p className="text-sm font-bold tracking-widest uppercase mt-2" style={{ color: tokens.mutedForeground }}>{t.role} // {t.company}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="py-32 border-b-2" style={{ borderColor: tokens.border, backgroundColor: tokens.background }}>
      <div className="max-w-[95vw] mx-auto px-4 sm:px-6">
        <FadeUp>
          <div className="mb-20">
            <h2 className="font-bold tracking-tighter leading-none mb-6 uppercase" style={{ color: tokens.foreground, fontSize: 'clamp(3rem, 8vw, 8rem)' }}>
              SYSTEM<br/>QUERIES
            </h2>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-0">
          {FAQ_ITEMS.map((item, i) => (
            <div key={i} className="border-b-2" style={{ borderColor: tokens.border }}>
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
                className="w-full flex items-center justify-between py-8 text-left transition-colors duration-150 hover:bg-[#27272A] px-4 -mx-4"
              >
                <span className="font-bold text-xl md:text-2xl uppercase tracking-tight pr-8" style={{ color: tokens.foreground }}>{item.q}</span>
                <motion.span
                  animate={{ rotate: openIndex === i ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0"
                >
                  <Plus className="h-8 w-8" style={{ color: tokens.accent }} />
                </motion.span>
              </button>
              <motion.div
                initial={false}
                animate={{ height: openIndex === i ? 'auto' : 0, opacity: openIndex === i ? 1 : 0 }}
                transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                style={{ overflow: 'hidden' }}
              >
                <p className="pb-8 font-medium text-lg uppercase leading-tight px-4 -mx-4" style={{ color: tokens.mutedForeground }}>
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
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setTimeout(() => setStatus('success'), 1200)
  }

  return (
    <section className="py-32 border-b-2" style={{ borderColor: tokens.border, backgroundColor: tokens.background }}>
      <div className="max-w-[95vw] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <FadeUp>
            <h2 className="font-bold tracking-tighter leading-[0.9] uppercase" style={{ color: tokens.foreground, fontSize: 'clamp(3rem, 6vw, 6rem)' }}>
              INITIALIZE<br/>CONNECTION
            </h2>
            <p className="text-2xl font-medium mt-8 uppercase max-w-xl" style={{ color: tokens.mutedForeground }}>
              RECEIVE CRITICAL SYSTEM UPDATES. NO SPAM, ONLY SIGNAL.
            </p>
          </FadeUp>

          <FadeUp delay={0.2} className="w-full">
            {status === 'success' ? (
              <div className="h-24 flex items-center border-b-2 border-[#DFE104]">
                <p className="font-bold text-3xl uppercase tracking-widest" style={{ color: tokens.accent }}>CONNECTION ESTABLISHED_</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-6 w-full">
                <label htmlFor="newsletter-email" className="sr-only">Email address</label>
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="ENTER_EMAIL_ADDRESS"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="flex-1 h-20 px-0 bg-transparent border-b-2 font-bold text-2xl uppercase tracking-wider placeholder-[#A1A1AA] transition-colors focus:outline-none focus:border-[#DFE104]"
                  style={{ borderColor: tokens.border, color: tokens.foreground }}
                />
                <motion.button
                  type="submit"
                  disabled={status === 'loading'}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="h-20 px-10 font-bold text-xl tracking-widest uppercase flex-shrink-0 disabled:opacity-50"
                  style={{ backgroundColor: tokens.accent, color: tokens.accentForeground }}
                >
                  {status === 'loading' ? 'SYNCING...' : 'CONNECT'}
                </motion.button>
              </form>
            )}
          </FadeUp>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  const links = {
    PRODUCT: ['FEATURES', 'PRICING', 'CHANGELOG', 'ROADMAP'],
    COMPANY: ['ABOUT', 'BLOG', 'CAREERS', 'PRESS'],
    RESOURCES: ['DOCUMENTATION', 'API', 'GUIDES', 'STATUS'],
    LEGAL: ['PRIVACY', 'TERMS', 'COOKIES', 'SECURITY'],
  }

  return (
    <footer className="py-20 relative overflow-hidden" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-[95vw] mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-24">
          <div className="col-span-2 md:col-span-1">
            <p className="font-bold text-3xl tracking-tighter mb-6" style={{ color: tokens.foreground }}>{PRODUCT_NAME}</p>
            <p className="text-lg font-medium uppercase" style={{ color: tokens.mutedForeground }}>
              THE NEW STANDARD FOR DIGITAL ARCHITECTURE.
            </p>
          </div>
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <p className="font-bold text-lg tracking-widest mb-8 uppercase" style={{ color: tokens.foreground }}>{group}</p>
              <ul className="space-y-4">
                {items.map(item => (
                  <li key={item}>
                    <a href="#" className="text-base font-bold tracking-wider uppercase hover:text-[#DFE104] transition-colors duration-100" style={{ color: tokens.mutedForeground }}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pt-12 border-t-2 gap-8" style={{ borderColor: tokens.border }}>
          <p className="text-sm font-bold tracking-widest uppercase" style={{ color: tokens.mutedForeground }}>
            © {new Date().getFullYear()} {PRODUCT_NAME}. ALL RIGHTS RESERVED.
          </p>
          <a
            href="/"
            className="text-sm font-bold tracking-widest px-6 py-3 border-2 uppercase hover:bg-[#FAFAFA] hover:text-[#09090B] transition-colors duration-100"
            style={{ borderColor: tokens.border, color: tokens.foreground }}
          >
            RETURN TO ALL STYLES
          </a>
        </div>
      </div>

      {/* Noise Texture Overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </footer>
  )
}

// ─────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────
export default function KineticPage() {
  return (
    <div className={`${bodyFont.variable} font-sans selection:bg-[#DFE104] selection:text-black`} style={{ backgroundColor: tokens.background }}>
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