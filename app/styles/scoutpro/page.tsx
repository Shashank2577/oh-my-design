'use client'

import { motion, useReducedMotion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Inter, Chivo_Mono } from 'next/font/google'
import {
  Star, ChevronDown, ArrowRight, Check, Search, Crosshair,
  Database, Eye, Lock, Map
} from 'lucide-react'

// ─────────────────────────────────────────────
// FONTS
// ─────────────────────────────────────────────
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const chivoMono = Chivo_Mono({
  subsets: ['latin'],
  variable: '--font-chivo-mono',
  display: 'swap',
})

// ─────────────────────────────────────────────
// DESIGN TOKENS
// ─────────────────────────────────────────────
const tokens = {
  background: '#0A0F14', // Deep Sea Blue-Black
  surface: '#151D26', // Dossier Grey
  accent1: '#00FFC2', // Sonar Green
  accent2: '#FFB800', // Potential Gold
  border: 'rgba(0, 255, 194, 0.2)',
  textHigh: '#E0E6ED',
  textLow: '#64748B',
}

// ─────────────────────────────────────────────
// MOTION HELPERS
// ─────────────────────────────────────────────
function RadialReveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' })
  const shouldReduce = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      initial={shouldReduce ? false : { clipPath: "circle(0% at 50% 50%)" }}
      animate={isInView ? { clipPath: "circle(150% at 50% 50%)" } : {}}
      transition={{ type: "spring", stiffness: 100, damping: 20, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function StaggerContainer({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' })
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
  hidden: { opacity: 0, scale: 0.9, filter: 'blur(5px)' },
  visible: { opacity: 1, scale: 1, filter: 'blur(0px)', transition: { type: "spring" as const, stiffness: 200, damping: 20 } },
}

function SonarPulse({ active }: { active: boolean }) {
  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden opacity-20">
      {active && [1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-solid"
          style={{ borderColor: tokens.accent1 }}
          initial={{ width: 0, height: 0, opacity: 1 }}
          animate={{ width: "200vw", height: "200vw", opacity: 0 }}
          transition={{ duration: 4, repeat: Infinity, delay: i * 1.3, ease: [0, 0, 1, 1] }}
        />
      ))}
    </div>
  )
}

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────
const PRODUCT_NAME = 'ScoutPro'
const TAGLINE = 'IDENTIFY THE UNSEEN.'
const DESCRIPTION = 'Advanced talent identification matrix. Filter through the noise and discover high-potential assets before they hit the radar.'

const NAV_LINKS = ['Database', 'Watchlists', 'Reports', 'Intel']

const STATS = [
  { value: '450K+', label: 'PROFILES' },
  { value: '1.2B', label: 'DATA POINTS' },
  { value: '94%', label: 'PREDICTION ACCURACY' },
  { value: '24/7', label: 'MONITORING' },
]

const FEATURES = [
  { icon: Crosshair, title: 'TARGET LOCK', description: 'Pinpoint specific trait combinations using our proprietary 40-point heuristic model.' },
  { icon: Eye, title: 'HIDDEN GEM RADAR', description: 'Surfaces players outperforming their expected metrics in lower-tier leagues.' },
  { icon: Database, title: 'DEEP DOSSIERS', description: 'Comprehensive historical data, injury reports, and psychological profiling.' },
  { icon: Map, title: 'GEOSPATIAL TRACKING', description: 'Visualize talent density across regions to optimize physical scouting routes.' },
  { icon: Lock, title: 'ENCRYPTED WATCHLISTS', description: 'Keep your targets secure. Your interest in a player is never leaked to the network.' },
  { icon: Search, title: 'SEMANTIC SEARCH', description: 'Search using natural language: "Find me a left-footed playmaker under 21 with high stamina."' },
]

const PRICING = [
  {
    name: 'SCOUT',
    price: '$299',
    period: 'MONTH',
    description: 'Essential data access for independent scouts and small agencies.',
    features: ['Standard Database Access', 'Basic Filtering', 'Up to 50 Tracked Players', 'Weekly Reports'],
    cta: 'REQUEST ACCESS',
    highlighted: false,
  },
  {
    name: 'AGENCY',
    price: '$999',
    period: 'MONTH',
    description: 'Advanced analytics and predictive modeling for established firms.',
    features: ['Hidden Gem Radar', 'Semantic Search', 'Unlimited Tracking', 'Custom Alerts', 'API Access (Read)'],
    cta: 'INITIATE CONTRACT',
    highlighted: true,
  },
  {
    name: 'SYNDICATE',
    price: 'CUSTOM',
    period: 'ANNUAL',
    description: 'Enterprise deployment for top-tier clubs and national federations.',
    features: ['Everything in Agency', 'Private Database Integration', 'Full API Access', 'Dedicated Analyst', 'On-Premises Option'],
    cta: 'CONTACT COMMAND',
    highlighted: false,
  },
]

const TESTIMONIALS = [
  {
    name: 'J. BLACKWOOD',
    role: 'HEAD OF RECRUITMENT',
    company: 'PREMIER LEAGUE CLUB',
    text: 'ScoutPro found us our starting midfielder while he was still playing in the second division of Brazil. The ROI is astronomical.',
    rating: 5,
  },
  {
    name: 'M. SVENSSON',
    role: 'INDEPENDENT SCOUT',
    company: 'NORDIC REGION',
    text: 'The interface makes sifting through thousands of players feel surgical. It respects my time and highlights the anomalies perfectly.',
    rating: 5,
  },
  {
    name: 'DR. A. CHEN',
    role: 'DATA SCIENTIST',
    company: 'SPORTS ANALYTICS CO.',
    text: 'The predictive accuracy of their heuristic models is currently unmatched in the industry. It\'s not just data; it\'s actionable intelligence.',
    rating: 5,
  },
]

const FAQ_ITEMS = [
  { q: 'WHERE DO YOU SOURCE YOUR DATA?', a: 'We aggregate from 40+ licensed providers and supplement with our own proprietary computer vision analysis of match footage.' },
  { q: 'HOW OFTEN IS THE DATABASE UPDATED?', a: 'Match data is updated within 15 minutes of the final whistle. Biographical and contract data is updated daily.' },
  { q: 'IS MY SEARCH HISTORY PRIVATE?', a: 'Strictly. We employ zero-knowledge architecture for your queries and watchlists. We cannot see who you are tracking.' },
  { q: 'DO YOU PROVIDE VIDEO FOOTAGE?', a: 'Yes, Deep Dossiers include automatically clipped highlights tagged to specific events and metrics.' },
]

// ─────────────────────────────────────────────
// COMPONENTS
// ─────────────────────────────────────────────

function Navbar() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-colors"
      style={{ backgroundColor: `${tokens.background}F2`, borderBottom: `1px solid ${tokens.border}`, backdropFilter: 'blur(8px)' }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: tokens.accent1 }}></div>
          <span className="font-bold text-xl tracking-widest" style={{ color: tokens.textHigh, fontFamily: 'var(--font-inter)' }}>
            SCOUTPRO
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-sm font-medium tracking-widest uppercase transition-colors hover:text-white"
              style={{ color: tokens.textLow, fontFamily: 'var(--font-inter)' }}
            >
              {link}
            </a>
          ))}
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-5 h-8 rounded-full text-xs font-bold tracking-widest flex items-center gap-2"
          style={{ backgroundColor: tokens.surface, color: tokens.accent1, border: `1px solid ${tokens.accent1}`, fontFamily: 'var(--font-chivo-mono)' }}
        >
          <Lock className="w-3 h-3" /> LOGIN
        </motion.button>
      </div>
    </nav>
  )
}

function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5,
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section className="relative min-h-dvh flex items-center justify-center overflow-hidden pt-16" style={{ backgroundColor: tokens.background }}>
      <SonarPulse active={true} />

      {/* Interactive Radar Grid Background */}
      <motion.div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(${tokens.accent1} 1px, transparent 1px), linear-gradient(90deg, ${tokens.accent1} 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          backgroundPosition: 'center center'
        }}
        animate={{
          x: mousePos.x * -20,
          y: mousePos.y * -20,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
      />

      <div className="max-w-5xl mx-auto px-6 py-24 w-full relative z-10 text-center">
        <RadialReveal>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-8" style={{ backgroundColor: `${tokens.accent1}10`, border: `1px solid ${tokens.border}` }}>
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: tokens.accent1 }}></span>
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: tokens.accent1, fontFamily: 'var(--font-chivo-mono)' }}>System Online // V4.2.0</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 tracking-tighter" style={{ color: tokens.textHigh, fontFamily: 'var(--font-inter)' }}>
            {TAGLINE}
          </h1>

          <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed" style={{ color: tokens.textLow, fontFamily: 'var(--font-inter)' }}>
            {DESCRIPTION}
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6 items-center">
            {/* Primary Search Anchor */}
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: [0.42, 0, 0.58, 1] }}
              className="relative"
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-16 h-16 rounded-full flex items-center justify-center relative z-10"
                style={{ backgroundColor: tokens.accent1, color: tokens.background }}
              >
                <Search className="w-6 h-6" />
              </motion.button>
              <div className="absolute inset-0 rounded-full animate-ping opacity-50" style={{ backgroundColor: tokens.accent1 }}></div>
            </motion.div>

            <span className="text-sm font-bold tracking-widest uppercase" style={{ color: tokens.textLow, fontFamily: 'var(--font-chivo-mono)' }}>
              INITIALIZE SCAN
            </span>
          </div>
        </RadialReveal>
      </div>
    </section>
  )
}

function Stats() {
  return (
    <section className="py-16 relative" style={{ backgroundColor: tokens.surface, borderTop: `1px solid ${tokens.border}`, borderBottom: `1px solid ${tokens.border}` }}>
      <div className="max-w-7xl mx-auto px-6">
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map(stat => (
            <motion.div key={stat.label} variants={staggerItem} className="text-center">
              <p className="text-4xl md:text-5xl font-bold tracking-tight mb-2" style={{ color: tokens.textHigh, fontFamily: 'var(--font-inter)' }}>{stat.value}</p>
              <p className="text-xs font-bold tracking-widest uppercase" style={{ color: tokens.accent2, fontFamily: 'var(--font-chivo-mono)' }}>{stat.label}</p>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

function Features() {
  return (
    <section id="features" className="py-32 relative overflow-hidden" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <RadialReveal>
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tighter" style={{ color: tokens.textHigh, fontFamily: 'var(--font-inter)' }}>
              ANALYTICAL DEPTH
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: tokens.textLow, fontFamily: 'var(--font-inter)' }}>
              Tools designed to cut through bias and deliver pure, actionable insight.
            </p>
          </div>
        </RadialReveal>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              variants={staggerItem}
              whileHover={{ scale: 1.02 }}
              className="p-8 rounded-2xl relative overflow-hidden group"
              style={{ backgroundColor: tokens.surface, border: `1px solid ${tokens.border}` }}
            >
              {/* Top Secret Watermark */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 pointer-events-none transform -rotate-12">
                <span className="text-6xl font-black uppercase" style={{ color: tokens.textHigh, fontFamily: 'var(--font-inter)' }}>CLASSIFIED</span>
              </div>

              <div className="w-12 h-12 rounded-full flex items-center justify-center mb-6 relative" style={{ backgroundColor: `${tokens.accent1}10` }}>
                <feature.icon className="h-6 w-6 relative z-10" style={{ color: tokens.accent1 }} strokeWidth={1.5} />
                <motion.div
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100"
                  style={{ border: `1px solid ${tokens.accent1}` }}
                  animate={{ scale: [1, 1.5], opacity: [1, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </div>
              <h3 className="font-bold text-xl mb-3 tracking-wide" style={{ color: tokens.textHigh, fontFamily: 'var(--font-inter)' }}>{feature.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: tokens.textLow, fontFamily: 'var(--font-inter)' }}>{feature.description}</p>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

function Pricing() {
  return (
    <section id="pricing" className="py-32" style={{ backgroundColor: tokens.surface, borderTop: `1px solid ${tokens.border}` }}>
      <div className="max-w-7xl mx-auto px-6">
        <RadialReveal>
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tighter" style={{ color: tokens.textHigh, fontFamily: 'var(--font-inter)' }}>
              CLEARANCE LEVELS
            </h2>
          </div>
        </RadialReveal>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PRICING.map(tier => (
            <motion.div
              key={tier.name}
              variants={staggerItem}
              className="p-8 rounded-2xl flex flex-col relative"
              style={{
                borderColor: tier.highlighted ? tokens.accent1 : tokens.border,
                backgroundColor: tokens.background,
                borderWidth: '1px',
                borderStyle: 'solid',
                boxShadow: tier.highlighted ? `0 0 30px ${tokens.accent1}10` : 'none'
              }}
            >
              {tier.highlighted && (
                <div className="absolute top-0 right-0 px-3 py-1 text-xs font-bold rounded-bl-lg tracking-widest uppercase" style={{ backgroundColor: tokens.accent1, color: tokens.background, fontFamily: 'var(--font-chivo-mono)' }}>
                  OPTIMAL
                </div>
              )}

              <h3 className="font-bold text-2xl mb-2 tracking-wide uppercase" style={{ color: tokens.textHigh, fontFamily: 'var(--font-inter)' }}>{tier.name}</h3>
              <p className="text-sm mb-6 h-10" style={{ color: tokens.textLow, fontFamily: 'var(--font-inter)' }}>{tier.description}</p>

              <div className="flex items-baseline gap-2 mb-8">
                <span className="text-5xl font-bold tracking-tighter" style={{ color: tokens.textHigh, fontFamily: 'var(--font-inter)' }}>{tier.price}</span>
                <span className="text-xs font-bold tracking-widest uppercase" style={{ color: tokens.accent2, fontFamily: 'var(--font-chivo-mono)' }}>/ {tier.period}</span>
              </div>

              <ul className="space-y-4 mb-10 flex-1">
                {tier.features.map(f => (
                  <li key={f} className="flex items-center gap-3">
                    <Check className="h-4 w-4 flex-shrink-0" style={{ color: tier.highlighted ? tokens.accent1 : tokens.textLow }} strokeWidth={2} />
                    <span className="text-sm" style={{ color: tokens.textHigh, fontFamily: 'var(--font-inter)' }}>{f}</span>
                  </li>
                ))}
              </ul>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full h-12 rounded-lg font-bold text-xs tracking-widest uppercase transition-colors flex items-center justify-center gap-2"
                style={tier.highlighted
                  ? { backgroundColor: tokens.accent1, color: tokens.background, fontFamily: 'var(--font-chivo-mono)' }
                  : { backgroundColor: 'transparent', color: tokens.accent1, border: `1px solid ${tokens.accent1}`, fontFamily: 'var(--font-chivo-mono)' }
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
    <section id="intel" className="py-32" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-7xl mx-auto px-6">
        <RadialReveal>
          <div className="text-center mb-20">
            <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: tokens.accent2, fontFamily: 'var(--font-chivo-mono)' }}>FIELD REPORTS</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter" style={{ color: tokens.textHigh, fontFamily: 'var(--font-inter)' }}>OPERATIVE LOGS</h2>
          </div>
        </RadialReveal>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map(t => (
            <motion.div
              key={t.name}
              variants={staggerItem}
              className="p-8 rounded-2xl relative"
              style={{ backgroundColor: tokens.surface, border: `1px solid ${tokens.border}` }}
            >
              <div className="flex mb-6">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current mr-1" style={{ color: tokens.accent2 }} />
                ))}
              </div>
              <p className="text-sm leading-relaxed mb-8" style={{ color: tokens.textHigh, fontFamily: 'var(--font-inter)' }}>"{t.text}"</p>
              <div>
                <p className="font-bold text-sm tracking-wide" style={{ color: tokens.textHigh, fontFamily: 'var(--font-inter)' }}>{t.name}</p>
                <p className="text-xs tracking-widest uppercase mt-1" style={{ color: tokens.textLow, fontFamily: 'var(--font-chivo-mono)' }}>{t.role}</p>
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
    <section className="py-32" style={{ backgroundColor: tokens.surface, borderTop: `1px solid ${tokens.border}` }}>
      <div className="max-w-3xl mx-auto px-6">
        <RadialReveal>
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter" style={{ color: tokens.textHigh, fontFamily: 'var(--font-inter)' }}>DEBRIEFING</h2>
          </div>
        </RadialReveal>

        <div className="space-y-4">
          {FAQ_ITEMS.map((item, i) => (
            <RadialReveal key={i} delay={i * 0.1}>
              <div className="rounded-xl overflow-hidden" style={{ backgroundColor: tokens.background, border: `1px solid ${tokens.border}` }}>
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-bold text-sm tracking-wide" style={{ color: tokens.textHigh, fontFamily: 'var(--font-inter)' }}>{item.q}</span>
                  <motion.div
                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  >
                    <ChevronDown className="h-5 w-5" style={{ color: tokens.textLow }} />
                  </motion.div>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openIndex === i ? 'auto' : 0, opacity: openIndex === i ? 1 : 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  style={{ overflow: 'hidden' }}
                >
                  <p className="px-6 pb-6 text-sm leading-relaxed" style={{ color: tokens.textLow, fontFamily: 'var(--font-inter)' }}>
                    {item.a}
                  </p>
                </motion.div>
              </div>
            </RadialReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="py-16" style={{ backgroundColor: tokens.background, borderTop: `1px solid ${tokens.border}` }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2">
            <span className="font-bold text-2xl tracking-widest block mb-4" style={{ color: tokens.textHigh, fontFamily: 'var(--font-inter)' }}>
              SCOUTPRO
            </span>
            <p className="text-sm max-w-sm" style={{ color: tokens.textLow, fontFamily: 'var(--font-inter)' }}>
              Identify the unseen. The ultimate talent discovery matrix for professional organizations.
            </p>
          </div>
          <div>
            <p className="font-bold text-xs tracking-widest uppercase mb-4" style={{ color: tokens.accent1, fontFamily: 'var(--font-chivo-mono)' }}>SYSTEMS</p>
            <ul className="space-y-3">
              {['Database Login', 'API Documentation', 'System Status'].map(item => (
                <li key={item}>
                  <a href="#" className="text-sm transition-colors hover:text-white" style={{ color: tokens.textLow, fontFamily: 'var(--font-inter)' }}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-bold text-xs tracking-widest uppercase mb-4" style={{ color: tokens.accent1, fontFamily: 'var(--font-chivo-mono)' }}>PROTOCOLS</p>
            <ul className="space-y-3">
              {['Privacy Protocol', 'Terms of Service', 'Data Encryption'].map(item => (
                <li key={item}>
                  <a href="#" className="text-sm transition-colors hover:text-white" style={{ color: tokens.textLow, fontFamily: 'var(--font-inter)' }}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t gap-4" style={{ borderColor: tokens.border }}>
          <p className="text-xs tracking-widest uppercase" style={{ color: tokens.textLow, fontFamily: 'var(--font-chivo-mono)' }}>
            © {new Date().getFullYear()} {PRODUCT_NAME}. SECURE CONNECTION.
          </p>
          <a
            href="/"
            className="text-xs font-bold tracking-widest uppercase transition-colors hover:text-white"
            style={{ color: tokens.accent1, fontFamily: 'var(--font-chivo-mono)' }}
          >
            ← DISCONNECT
          </a>
        </div>
      </div>
    </footer>
  )
}

// ─────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────
export default function ScoutProPage() {
  return (
    <div className={`${inter.variable} ${chivoMono.variable} font-sans`} style={{ backgroundColor: tokens.background, color: tokens.textHigh }}>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Features />
        <Pricing />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />
      
      </div>
  )
}
