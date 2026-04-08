'use client'

/**
 * PAGE TEMPLATE — Terminal CLI
 *
 * Implements the "Terminal CLI" aesthetic defined in DESIGN_SYSTEM.md.
 * Features:
 * - Monospace supremacy (JetBrains Mono)
 * - CRT Phosphor persistence effect
 * - Blinking cursor that teleports to active scroll sections
 * - High-fidelity Framer Motion usage
 * - Heavily commented code explaining design choices
 */

import { motion, useReducedMotion, useInView, useScroll, useSpring } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { JetBrains_Mono } from 'next/font/google'
import {
  Star, ChevronDown, ArrowRight, Check, Users, Zap, Globe, Shield,
  BookOpen, Layout, Palette, Code2, BarChart, Lock, Terminal
} from 'lucide-react'

// ─────────────────────────────────────────────
// FONTS
// ─────────────────────────────────────────────
// Monospace Supremacy: Every single character uses JetBrains Mono.
const bodyFont = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

// ─────────────────────────────────────────────
// DESIGN TOKENS
// ─────────────────────────────────────────────
// The palette mimics a phosphor monitor.
const tokens = {
  background: '#0a0a0a', // Deep black, allows scanlines to show
  foreground: '#33ff00', // Bright Neon Green
  secondary: '#ffb000',  // Amber for accents/warnings
  muted: '#1f521f',      // Dimmed green for borders/inactive
  border: '#1f521f',     // Dimmed green
  error: '#ff3333',
}

// Global text shadow for phosphor glow effect
const phosphorGlow = '0 0 5px rgba(51, 255, 0, 0.5)'

// ─────────────────────────────────────────────
// MOTION HELPERS
// ─────────────────────────────────────────────
// FadeUp component for simple entrance animations
function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-5% 0px' })
  const shouldReduce = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={shouldReduce ? false : { opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay, ease: 'linear' }} // Snappy, linear transitions fit the CLI theme
    >
      {children}
    </motion.div>
  )
}

// StaggerContainer for lists of items
function StaggerContainer({ children, className = '' }: { children: React.ReactNode; className?: string }) {
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
        visible: { transition: { staggerChildren: 0.1 } }, // Fast stagger
      }}
    >
      {children}
    </motion.div>
  )
}

const staggerItem: import('framer-motion').Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2, ease: 'linear' } },
}

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────
const PRODUCT_NAME = 'SYS_CORE_V1'
const TAGLINE = 'OPTIMIZE SYSTEM PERFORMANCE'
const DESCRIPTION = '> INITIALIZING CORE PROTOCOLS...\n> ESTABLISHING SECURE CONNECTION...\n> READY. A COMPREHENSIVE SUITE FOR SYSTEM MANAGEMENT AND DEPLOYMENT.'

const NAV_LINKS = ['[ FEATURES ]', '[ PRICING ]', '[ TESTIMONIALS ]', '[ FAQ ]']
const NAV_IDS = ['features', 'pricing', 'testimonials', 'faq']

const STATS = [
  { value: '50K+', label: 'ACTIVE_NODES' },
  { value: '99.9%', label: 'UPTIME_RATIO' },
  { value: '140+', label: 'GLOBAL_REGIONS' },
  { value: '[OK]', label: 'SYS_STATUS' },
]

const FEATURES = [
  { icon: Terminal, title: 'SECURE_SHELL', description: 'ENCRYPTED TERMINAL ACCESS TO ALL MANAGED NODES.' },
  { icon: Code2, title: 'AUTO_DEPLOY', description: 'AUTOMATED PIPELINES FOR RAPID CODE DISTRIBUTION.' },
  { icon: Zap, title: 'PERF_MONITOR', description: 'REAL-TIME METRICS AND RESOURCE UTILIZATION GRAPHS.' },
  { icon: Shield, title: 'THREAT_DETECT', description: 'HEURISTIC ANALYSIS AND INTRUSION PREVENTION SYSTEM.' },
  { icon: Globe, title: 'GLOBAL_CDN', description: 'DISTRIBUTED EDGE NETWORK FOR LOW-LATENCY DELIVERY.' },
  { icon: Lock, title: 'ZERO_TRUST', description: 'IDENTITY-AWARE PROXY AND STRICT ACCESS CONTROLS.' },
]

const PRICING = [
  {
    name: 'BASIC_USER',
    price: '$0',
    period: '/MO',
    description: 'LOCAL INSTANCE ONLY.',
    features: ['1_LOCAL_NODE', 'BASIC_LOGGING', 'COMMUNITY_SUPPORT'],
    cta: '[ INIT_BASIC ]',
    highlighted: false,
  },
  {
    name: 'SYS_ADMIN',
    price: '$29',
    period: '/MO',
    description: 'FOR PROFESSIONAL DEPLOYMENTS.',
    features: ['UNLIMITED_NODES', 'ADVANCED_TELEMETRY', 'PRIORITY_QUEUE', 'API_ACCESS'],
    cta: '[ INIT_ADMIN ]',
    highlighted: true,
  },
  {
    name: 'MAINFRAME',
    price: '$99',
    period: '/MO',
    description: 'ENTERPRISE-GRADE ARCHITECTURE.',
    features: ['EVERYTHING_IN_ADMIN', 'DEDICATED_SERVER', 'SLA_99.99%', 'CUSTOM_BINARIES'],
    cta: '[ CONTACT_SALES ]',
    highlighted: false,
  },
]

const TESTIMONIALS = [
  {
    name: 'ALEX_CHEN',
    role: 'ROOT_ADMIN',
    company: 'ACME_CORP',
    text: '> "SYS_CORE_V1 OPTIMIZED OUR DEPLOYMENTS BY 400%. OUTSTANDING ARTIFACT."',
    rating: 5,
  },
  {
    name: 'M_WILLIAMS',
    role: 'DEV_OPS_LEAD',
    company: 'STARTUP_XYZ',
    text: '> "THE CLI INTERFACE IS FLAWLESS. EXACTLY WHAT WE NEEDED FOR AUTOMATION."',
    rating: 5,
  },
  {
    name: 'S_RODRIGUEZ',
    role: 'SEC_ENG',
    company: 'DEFENSE_NET',
    text: '> "ZERO-TRUST IMPLEMENTATION IS ROBUST. HIGHLY RECOMMENDED FOR SECURE ENVS."',
    rating: 5,
  },
]

const FAQ_ITEMS = [
  { q: '> HOW DO I INITIALIZE?', a: '$ curl -sSL https://syscore.io/install.sh | bash\n$ syscore init' },
  { q: '> CAN I TERMINATE PROCESS?', a: 'YES. EXECUTE `syscore terminate --force` TO CANCEL SUBSCRIPTION.' },
  { q: '> IS THERE A SANDBOX?', a: 'ALL SYS_ADMIN FEATURES AVAILABLE IN SANDBOX MODE FOR 14 DAYS.' },
  { q: '> ACCEPTED PROTOCOLS?', a: 'HTTPS, SSH, AND CUSTOM TCP SOCKETS.' },
]

// ─────────────────────────────────────────────
// COMPONENTS
// ─────────────────────────────────────────────

// CRT Overlay: A pointer-events-none overlay with scanlines.
function CRTOverlay() {
  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden mix-blend-overlay opacity-30">
      <div 
        className="w-full h-full"
        style={{
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 0, 0, 0.4) 2px,
            rgba(0, 0, 0, 0.4) 4px
          )`
        }}
      />
    </div>
  )
}

// Active Section Tracker for Cursor Teleportation
function useActiveSection() {
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', ...NAV_IDS]
      let current = 'hero'
      for (const id of sections) {
        const element = document.getElementById(id)
        if (element) {
          const rect = element.getBoundingClientRect()
          // If the top of the section is within the top half of the viewport
          if (rect.top <= window.innerHeight / 2) {
            current = id
          }
        }
      }
      setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial check
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return activeSection
}

// Typewriter effect component for text
function TypewriterText({ text, delay = 0, speed = 0.03 }: { text: string; delay?: number; speed?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-5% 0px' })
  const shouldReduce = useReducedMotion()
  
  if (shouldReduce) return <span>{text}</span>

  const characters = text.split('')

  return (
    <span ref={ref}>
      {characters.map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.1, delay: delay + index * speed }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  )
}

function Navbar({ activeSection }: { activeSection: string }) {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-40 border-b bg-opacity-90 backdrop-blur-sm"
      style={{ borderColor: tokens.border, backgroundColor: tokens.background, textShadow: phosphorGlow }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <span className="font-bold text-lg tracking-widest" style={{ color: tokens.foreground }}>
          {PRODUCT_NAME} {activeSection === 'hero' && <span className="animate-pulse">_</span>}
        </span>
        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link, index) => {
            const id = NAV_IDS[index]
            const isActive = activeSection === id
            return (
              <a
                key={link}
                href={`#${id}`}
                className="text-sm transition-colors hover:bg-[#33ff00] hover:text-black px-2 py-1 uppercase"
                style={{ color: isActive ? tokens.secondary : tokens.foreground }}
              >
                {link} {isActive && <span className="animate-pulse text-[#33ff00]">_</span>}
              </a>
            )
          })}
        </div>
        <motion.button
          whileHover={{ backgroundColor: tokens.foreground, color: tokens.background }}
          whileTap={{ scale: 0.98, y: 1 }}
          className="px-4 h-10 text-sm font-bold border uppercase"
          style={{ borderColor: tokens.foreground, color: tokens.foreground }}
        >
          [ LOGIN ]
        </motion.button>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section id="hero" className="min-h-dvh flex flex-col justify-center pt-16 relative" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-6xl mx-auto px-6 py-24 w-full" style={{ textShadow: phosphorGlow }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.2 }}
          className="max-w-3xl"
        >
          <p className="text-sm tracking-widest mb-4 uppercase font-bold" style={{ color: tokens.secondary }}>
            {`> ./start_sequence.sh`}
          </p>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-8 uppercase" style={{ color: tokens.foreground }}>
            <TypewriterText text={TAGLINE} />
          </h1>
          <div className="text-lg md:text-xl mb-10 max-w-2xl leading-relaxed whitespace-pre-line" style={{ color: tokens.muted }}>
             <TypewriterText text={DESCRIPTION} delay={1} speed={0.01}/>
          </div>
          <FadeUp delay={1.5} className="flex flex-col sm:flex-row gap-6">
            <motion.button
              whileHover={{ backgroundColor: tokens.foreground, color: tokens.background }}
              whileTap={{ y: 2 }}
              className="h-14 px-8 font-bold flex items-center justify-center gap-2 border-2 uppercase tracking-widest"
              style={{ borderColor: tokens.foreground, color: tokens.foreground, backgroundColor: 'transparent' }}
            >
              [ EXECUTE_START ] <ArrowRight className="h-5 w-5" />
            </motion.button>
            <motion.button
              whileHover={{ backgroundColor: tokens.muted, color: tokens.foreground }}
              whileTap={{ y: 2 }}
              className="h-14 px-8 font-bold border-2 border-dashed uppercase tracking-widest"
              style={{ borderColor: tokens.muted, color: tokens.muted }}
            >
              [ VIEW_MANUAL ]
            </motion.button>
          </FadeUp>
        </motion.div>

        {/* ASCII Art / Raw Data Visualizer */}
        <FadeUp delay={2}>
          <div
            className="mt-20 w-full p-6 border text-xs sm:text-sm overflow-hidden"
            style={{ borderColor: tokens.border, color: tokens.muted }}
          >
            <pre className="whitespace-pre-wrap">
{`[SYSTEM_LOAD]: |||||||||||||||||||||........ [72%]
[MEM_USAGE]  : |||||||||||||.................. [45%]
[NET_I/O]    : 1.2GB/s TX | 0.8GB/s RX
[UPTIME]     : 94 DAYS, 12:44:03

       +-----------------------+
       |   DATA_STREAM_ACTIVE  |
       +-----------------------+
                |   |
                V   V
        01010101010101010101`}
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
      <div className="max-w-6xl mx-auto px-6 py-12" style={{ textShadow: phosphorGlow }}>
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map(stat => (
            <motion.div key={stat.label} variants={staggerItem} className="text-center">
              <p className="text-4xl font-bold mb-2" style={{ color: tokens.foreground }}>{stat.value}</p>
              <p className="text-sm uppercase tracking-widest" style={{ color: tokens.muted }}>{stat.label}</p>
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
      <div className="max-w-6xl mx-auto px-6" style={{ textShadow: phosphorGlow }}>
        <FadeUp className="mb-16">
          <p className="text-sm tracking-widest mb-3 uppercase font-bold" style={{ color: tokens.secondary }}>{`> cat features.txt`}</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 uppercase" style={{ color: tokens.foreground }}>
            CORE_MODULES
          </h2>
          <p className="text-lg max-w-2xl" style={{ color: tokens.muted }}>
            SYSTEM CAPABILITIES AND INTEGRATED TOOLS.
          </p>
        </FadeUp>
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURES.map(feature => (
            <motion.div
              key={feature.title}
              variants={staggerItem}
              whileHover={{ backgroundColor: '#111111' }}
              className="p-6 border group"
              style={{ borderColor: tokens.border }}
            >
              <div className="mb-4 flex items-center gap-3">
                 <feature.icon className="h-6 w-6" style={{ color: tokens.foreground }} strokeWidth={2} />
                 <h3 className="font-bold text-lg uppercase" style={{ color: tokens.foreground }}>{feature.title}</h3>
              </div>
              <p className="text-sm leading-relaxed uppercase" style={{ color: tokens.muted }}>{feature.description}</p>
              <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="animate-pulse" style={{ color: tokens.foreground }}>_</span>
              </div>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

function ProductDetail() {
  return (
    <section className="py-24 border-y relative overflow-hidden" style={{ borderColor: tokens.border, backgroundColor: tokens.background }}>
       {/* Decorative ASCII background */}
       <div className="absolute top-0 right-0 opacity-10 text-xs pointer-events-none select-none overflow-hidden h-full w-1/2 flex justify-end" style={{ color: tokens.foreground }}>
         <pre>
{`
01001000 01100101 01101100 01101100 01101111
01010111 01101111 01110010 01101100 01100100
01010011 01111001 01110011 01110100 01100101
01101101 01000011 01101111 01110010 01100101
`}
         </pre>
       </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10" style={{ textShadow: phosphorGlow }}>
        <FadeUp>
          <p className="text-sm tracking-widest mb-4 uppercase font-bold" style={{ color: tokens.secondary }}>{`> ./about.sh`}</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-8 uppercase" style={{ color: tokens.foreground }}>
            ARCHITECTURE_OVERVIEW
          </h2>
          <div className="space-y-6 text-left border-l-2 pl-6" style={{ borderColor: tokens.border }}>
            <p className="text-lg leading-relaxed uppercase" style={{ color: tokens.muted }}>
              DESIGNED FOR MAXIMUM EFFICIENCY. MINIMAL OVERHEAD. NO GUI BLOAT. DIRECT ACCESS TO SYSTEM PRIMITIVES.
            </p>
            <p className="text-lg leading-relaxed uppercase" style={{ color: tokens.muted }}>
              BUILT ON A HIGH-PERFORMANCE RUST CORE. GUARANTEED MEMORY SAFETY. CONCURRENCY WITHOUT DATA RACES.
            </p>
            <div className="bg-[#111111] p-4 border" style={{ borderColor: tokens.border }}>
               <code className="text-sm" style={{ color: tokens.foreground }}>
                 $ syscore status<br/>
                 [OK] DAEMON RUNNING<br/>
                 [OK] MEMORY ALLOC: 12MB<br/>
                 [OK] THREADS ACTIVE: 4
               </code>
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
      <div className="max-w-6xl mx-auto px-6" style={{ textShadow: phosphorGlow }}>
        <FadeUp className="mb-16">
          <p className="text-sm tracking-widest mb-3 uppercase font-bold" style={{ color: tokens.secondary }}>{`> less pricing.cfg`}</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 uppercase" style={{ color: tokens.foreground }}>ACCESS_TIERS</h2>
          <p className="text-lg uppercase" style={{ color: tokens.muted }}>SELECT REQUIRED CLEARANCE LEVEL.</p>
        </FadeUp>
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PRICING.map(tier => (
            <motion.div
              key={tier.name}
              variants={staggerItem}
              className="p-8 border relative flex flex-col"
              style={{
                borderColor: tier.highlighted ? tokens.foreground : tokens.border,
                backgroundColor: tier.highlighted ? '#0a1a0a' : 'transparent',
              }}
            >
              {tier.highlighted && (
                <div 
                  className="absolute top-0 left-0 w-full h-1" 
                  style={{ backgroundColor: tokens.foreground }}
                />
              )}
              <h3 className="font-bold text-xl mb-4 uppercase tracking-widest" style={{ color: tokens.foreground }}>[{tier.name}]</h3>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-4xl font-bold" style={{ color: tokens.foreground }}>{tier.price}</span>
                <span className="text-sm font-bold" style={{ color: tokens.muted }}>{tier.period}</span>
              </div>
              <p className="text-sm mb-6 uppercase h-10" style={{ color: tokens.muted }}>{tier.description}</p>
              
              <div className="mb-8 font-mono text-sm space-y-2 uppercase flex-grow" style={{ color: tokens.muted }}>
                 {tier.features.map(f => (
                    <div key={f} className="flex gap-2">
                       <span style={{ color: tokens.foreground }}>*</span> <span>{f}</span>
                    </div>
                 ))}
              </div>

              <motion.button
                whileHover={{ backgroundColor: tier.highlighted ? tokens.background : tokens.foreground, color: tier.highlighted ? tokens.foreground : tokens.background }}
                whileTap={{ y: 2 }}
                className="w-full h-12 font-bold text-sm border-2 uppercase tracking-widest mt-auto"
                style={{ 
                  backgroundColor: tier.highlighted ? tokens.foreground : 'transparent', 
                  color: tier.highlighted ? tokens.background : tokens.foreground,
                  borderColor: tokens.foreground 
                }}
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
    <section id="testimonials" className="py-24 border-y" style={{ borderColor: tokens.border, backgroundColor: tokens.background }}>
      <div className="max-w-6xl mx-auto px-6" style={{ textShadow: phosphorGlow }}>
        <FadeUp className="mb-16">
          <p className="text-sm tracking-widest mb-3 uppercase font-bold" style={{ color: tokens.secondary }}>{`> tail -n 3 /var/log/feedback.log`}</p>
          <h2 className="text-4xl md:text-5xl font-bold uppercase" style={{ color: tokens.foreground }}>SYSTEM_LOGS</h2>
        </FadeUp>
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map(t => (
            <motion.div
              key={t.name}
              variants={staggerItem}
              className="p-6 border border-dashed"
              style={{ borderColor: tokens.border }}
            >
              <div className="flex mb-4 gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} style={{ color: i < t.rating ? tokens.foreground : tokens.muted }}>[X]</span>
                ))}
              </div>
              <p className="text-sm leading-relaxed mb-6 uppercase" style={{ color: tokens.foreground }}>{t.text}</p>
              <div className="border-t pt-4" style={{ borderColor: tokens.border }}>
                <p className="font-bold text-sm uppercase" style={{ color: tokens.secondary }}>USR: {t.name}</p>
                <p className="text-xs uppercase" style={{ color: tokens.muted }}>GRP: {t.role} @ {t.company}</p>
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
    <section id="faq" className="py-24" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-3xl mx-auto px-6" style={{ textShadow: phosphorGlow }}>
        <FadeUp className="mb-16">
          <p className="text-sm tracking-widest mb-3 uppercase font-bold" style={{ color: tokens.secondary }}>{`> man syscore`}</p>
          <h2 className="text-4xl md:text-5xl font-bold uppercase" style={{ color: tokens.foreground }}>MANUAL_PAGES</h2>
        </FadeUp>
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, i) => (
            <FadeUp key={i} delay={i * 0.1}>
              <div className="border" style={{ borderColor: openIndex === i ? tokens.foreground : tokens.border }}>
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-[#111111]"
                >
                  <span className="font-bold uppercase" style={{ color: openIndex === i ? tokens.foreground : tokens.muted }}>{item.q}</span>
                  <span style={{ color: tokens.foreground }}>{openIndex === i ? '[-]' : '[+]'}</span>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openIndex === i ? 'auto' : 0, opacity: openIndex === i ? 1 : 0 }}
                  transition={{ duration: 0.2, ease: 'linear' }}
                  style={{ overflow: 'hidden' }}
                >
                  <div className="p-4 border-t bg-[#050505]" style={{ borderColor: tokens.border }}>
                    <pre className="text-sm whitespace-pre-wrap font-mono uppercase leading-relaxed" style={{ color: tokens.foreground }}>
                      {item.a}
                    </pre>
                  </div>
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
    <section className="py-24 border-y" style={{ borderColor: tokens.border, backgroundColor: tokens.background }}>
      <div className="max-w-2xl mx-auto px-6 text-left" style={{ textShadow: phosphorGlow }}>
        <FadeUp>
          <p className="text-sm tracking-widest mb-3 uppercase font-bold" style={{ color: tokens.secondary }}>{`> ./subscribe.sh`}</p>
          <h2 className="text-4xl font-bold mb-4 uppercase" style={{ color: tokens.foreground }}>AWAITING_INPUT</h2>
          <p className="text-lg mb-8 uppercase" style={{ color: tokens.muted }}>
            ENTER EMAIL TO RECEIVE SYSTEM BROADCASTS.
          </p>
          
          <div className="p-6 border bg-black" style={{ borderColor: tokens.border }}>
            {status === 'success' ? (
              <p className="font-bold uppercase" style={{ color: tokens.foreground }}>
                [OK] EMAIL ADDED TO BROADCAST LIST.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex items-center">
                  <span className="mr-2" style={{ color: tokens.secondary }}>user@host:~$</span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="flex-1 bg-transparent border-none outline-none text-lg font-mono uppercase"
                    style={{ color: tokens.foreground }}
                    autoFocus={false}
                    disabled={status === 'loading'}
                  />
                  {/* Blinking block cursor at the end of input if empty, otherwise standard behavior */}
                  {email.length === 0 && <span className="animate-pulse" style={{ color: tokens.foreground }}>█</span>}
                </div>
                
                <div className="text-xs uppercase mt-4" style={{ color: tokens.muted }}>
                  TYPE EMAIL AND PRESS [ENTER] OR CLICK [EXECUTE].
                </div>

                <motion.button
                  type="submit"
                  disabled={status === 'loading'}
                  whileHover={{ backgroundColor: tokens.foreground, color: tokens.background }}
                  whileTap={{ y: 2 }}
                  className="h-10 px-6 font-bold text-sm border-2 uppercase tracking-widest self-start"
                  style={{ borderColor: tokens.foreground, color: tokens.foreground, backgroundColor: 'transparent' }}
                >
                  {status === 'loading' ? '[ PROCESSING... ]' : '[ EXECUTE ]'}
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
    ROOT: ['/bin', '/etc', '/var/log', '/home'],
    CONFIG: ['network.cfg', 'users.cfg', 'security.pem', 'deploy.yml'],
    NETWORK: ['ping', 'traceroute', 'netstat', 'ifconfig'],
    SYS_ADMIN: ['man', 'chmod', 'chown', 'kill'],
  }

  return (
    <footer className="py-16 pb-32" style={{ backgroundColor: tokens.background, borderTop: `1px solid ${tokens.border}`, textShadow: phosphorGlow }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1 border-r pr-4" style={{ borderColor: tokens.border }}>
            <p className="font-bold text-lg mb-4 uppercase" style={{ color: tokens.foreground }}>[{PRODUCT_NAME}]</p>
            <p className="text-xs leading-relaxed uppercase font-bold" style={{ color: tokens.muted }}>
              VERSION: 1.0.4<br/>
              BUILD: 8A4F2C<br/>
              KERNEL: LINUX 6.1<br/>
              STATUS: ONLINE
            </p>
          </div>
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <p className="font-bold text-sm mb-4 uppercase" style={{ color: tokens.secondary }}>-- {group}</p>
              <ul className="space-y-2">
                {items.map(item => (
                  <li key={item}>
                    <a href="#" className="text-sm hover:underline uppercase flex items-center gap-2 group" style={{ color: tokens.muted }}>
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: tokens.foreground }}>{'>'}</span> 
                      <span className="group-hover:text-[#33ff00] transition-colors">{item}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t gap-4 uppercase" style={{ borderColor: tokens.border }}>
          <p className="text-xs font-bold" style={{ color: tokens.muted }}>
            [C] 2026 {PRODUCT_NAME}. END OF FILE.
          </p>
          <a
            href="/"
            className="text-xs px-3 py-1 border hover:bg-[#33ff00] hover:text-black transition-colors"
            style={{ borderColor: tokens.border, color: tokens.muted }}
          >
            [cd ..]
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
  const activeSection = useActiveSection()

  return (
    <div className={`${bodyFont.variable} font-mono uppercase`} style={{ backgroundColor: tokens.background, minHeight: '100vh' }}>
      <CRTOverlay />
      <Navbar activeSection={activeSection} />
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
      {/* Global styles for selection and scrollbar to match theme */}
      <style dangerouslySetInnerHTML={{__html: `
        ::selection {
          background-color: ${tokens.foreground};
          color: ${tokens.background};
        }
        ::-webkit-scrollbar {
          width: 12px;
          background: ${tokens.background};
          border-left: 1px solid ${tokens.border};
        }
        ::-webkit-scrollbar-thumb {
          background: ${tokens.muted};
          border: 1px solid ${tokens.background};
        }
        ::-webkit-scrollbar-thumb:hover {
          background: ${tokens.foreground};
        }
      `}} />
    </div>
  )
}
