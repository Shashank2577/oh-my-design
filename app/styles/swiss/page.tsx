'use client'

/**
 * SWISS / INTERNATIONAL TYPOGRAPHIC STYLE
 *
 * Kinetic Design Protocol:
 * - Strict grid snaps
 * - Typographic scale shifts
 * - High-fidelity mechanical Framer Motion usage
 */

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import { Inter } from 'next/font/google'
import {
  ArrowRight,
  Plus,
  ArrowUpRight,
  ChevronDown,
  Layers,
  Box,
  Compass,
  Grid,
  Type,
  Maximize
} from 'lucide-react'

// ─────────────────────────────────────────────
// FONTS
// ─────────────────────────────────────────────
const interFont = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  // Swiss style utilizes extreme weights: 400, 500, 700, 900
})

// ─────────────────────────────────────────────
// DESIGN TOKENS
// ─────────────────────────────────────────────
const tokens = {
  background: '#FFFFFF', // Pure White
  foreground: '#000000', // Pure Black
  muted: '#F2F2F2',      // Light Gray
  accent: '#FF3000',     // Swiss Red
  border: '#000000',     // Pure Black
}

// ─────────────────────────────────────────────
// CSS PATTERNS
// ─────────────────────────────────────────────
const patterns = {
  grid: {
    backgroundImage: `linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)`,
    backgroundSize: '24px 24px',
  },
  dots: {
    backgroundImage: `radial-gradient(rgba(0,0,0,0.04) 2px, transparent 2px)`,
    backgroundSize: '16px 16px',
  },
  diagonal: {
    backgroundImage: `repeating-linear-gradient(45deg, rgba(0,0,0,0.02) 0px, rgba(0,0,0,0.02) 1px, transparent 1px, transparent 10px)`,
  },
}

const NoiseOverlay = () => (
  <div
    className="pointer-events-none fixed inset-0 z-50 opacity-[0.015]"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      backgroundRepeat: "repeat",
    }}
  />
)

// ─────────────────────────────────────────────
// MOTION HELPERS
// ─────────────────────────────────────────────

// Mechanical fade and slide that respects grid alignment
function GridSnapReveal({ children, delay = 0, direction = 'y' }: { children: React.ReactNode; delay?: number, direction?: 'y' | 'x' }) {
  const ref = useRef(null)
  const shouldReduce = useReducedMotion()

  const initial = shouldReduce ? false : { opacity: 0, [direction]: direction === 'y' ? 24 : -24 }
  const animate = { opacity: 1, [direction]: 0 }

  return (
    <motion.div
      ref={ref}
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.4, delay, ease: 'linear' }}
    >
      {children}
    </motion.div>
  )
}

function StaggerContainer({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) {
  const ref = useRef(null)
  const shouldReduce = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      initial={shouldReduce ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, margin: '-5% 0px' }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.1, delayChildren: delay } },
      }}
    >
      {children}
    </motion.div>
  )
}

const snapItem = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.2, ease: 'linear' } },
}

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────
const PRODUCT_NAME = 'BASE.GRID'
const TAGLINE = 'OBJECTIVE\nCOMMUNICATION'
const DESCRIPTION = 'A framework for universal clarity. Mathematical precision meets logical structure. Content dictates form.'

const NAV_LINKS = ['SYSTEM', 'METHOD', 'TESTIMONY', 'FAQ']

const STATS = [
  { value: '99.9', label: 'UPTIME %' },
  { value: '10K+', label: 'NODES' },
  { value: '0.1s', label: 'LATENCY' },
  { value: '140', label: 'REGIONS' },
]

const FEATURES = [
  { icon: Grid, title: 'GRID SYSTEM', description: 'Mathematical precision underlying all layout decisions. Invisible structure made visible.' },
  { icon: Type, title: 'TYPOGRAPHY', description: 'Grotesque forms utilized for objective communication. Hierarchy through scale and weight alone.' },
  { icon: Box, title: 'MODULARITY', description: 'Interchangeable structural components that maintain visual integrity in any configuration.' },
  { icon: Layers, title: 'ASYMMETRY', description: 'Dynamic visual tension achieved through calculated offset alignment and active negative space.' },
  { icon: Maximize, title: 'SCALABILITY', description: 'Responsive adaptation governed by strict mathematical ratios rather than arbitrary breakpoints.' },
  { icon: Compass, title: 'CLARITY', description: 'Absolute elimination of the superfluous. Decoration is removed in favor of pure function.' },
]

const PRICING = [
  {
    name: 'CORE',
    price: '00',
    period: 'MONTH',
    description: 'ESSENTIAL STRUCTURAL ELEMENTS.',
    features: ['BASE GRID SYSTEM', 'STANDARD TYPOGRAPHY', 'COMMUNITY SUPPORT'],
    cta: 'INITIATE',
    highlighted: false,
  },
  {
    name: 'PROFESSIONAL',
    price: '45',
    period: 'MONTH',
    description: 'ADVANCED COMPOSITIONAL TOOLS.',
    features: ['DYNAMIC ASYMMETRY', 'EXTENDED FONT WEIGHTS', 'PRIORITY SUPPORT', 'CUSTOM PATTERNS'],
    cta: 'SELECT',
    highlighted: true,
  },
  {
    name: 'ENTERPRISE',
    price: '90',
    period: 'MONTH',
    description: 'UNLIMITED ARCHITECTURAL SCALE.',
    features: ['DEDICATED INFRASTRUCTURE', 'SLA GUARANTEE', 'CUSTOM IMPLEMENTATION', '24/7 SUPPORT'],
    cta: 'CONTACT',
    highlighted: false,
  },
]

const TESTIMONIALS = [
  {
    name: 'M. BILL',
    role: 'ARCHITECT',
    company: 'FORM A.G.',
    text: 'FUNCTION DICTATES THE ENTIRE COMPOSITION. A TRIUMPH OF OBJECTIVE DESIGN.',
  },
  {
    name: 'J. MÜLLER-BROCKMANN',
    role: 'DIRECTOR',
    company: 'ZÜRICH STUDIO',
    text: 'THE VISIBLE SKELETON PROVIDES UNPRECEDENTED CLARITY. ORNAMENTATION IS FINALLY ELIMINATED.',
  },
  {
    name: 'A. FRUTIGER',
    role: 'TYPOGRAPHER',
    company: 'TYPE FOUNDRY',
    text: 'A NEUTRAL VESSEL FOR MEANING. LEGIBILITY IS PRIORITIZED ABOVE ALL SUBJECTIVE EXPRESSION.',
  },
]

const FAQ_ITEMS = [
  { q: 'WHAT IS THE UNDERLYING GRID STRUCTURE?', a: 'THE SYSTEM UTILIZES A MODULAR 12-COLUMN BASE WITH STRICT 24PX VERTICAL RHYTHM SNAP POINTS.' },
  { q: 'HOW ARE ANIMATIONS HANDLED?', a: 'MOTION IS MECHANICAL AND LINEAR. WE REJECT ORGANIC EASING IN FAVOR OF INSTANT, SNAPPY TRANSITIONS.' },
  { q: 'CAN I MODIFY THE COLOR PALETTE?', a: 'THE PALETTE IS RESTRICTED TO BLACK, WHITE, AND SIGNAL RED TO MAINTAIN OBJECTIVITY AND UNIVERSAL INTELLIGIBILITY.' },
  { q: 'IS THE TYPOGRAPHY CUSTOMIZABLE?', a: 'WE MANDATE GROTESQUE SANS-SERIFS. INTER IS PROVIDED AS THE DEFAULT NEUTRAL COMMUNICATOR.' },
]

// ─────────────────────────────────────────────
// COMPONENTS
// ─────────────────────────────────────────────

function SectionLabel({ number, text }: { number: string, text: string }) {
  return (
    <div className="flex items-center gap-4 mb-12">
      <span className="text-xl font-black" style={{ color: tokens.accent }}>{number}</span>
      <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase" style={{ color: tokens.foreground }}>
        {text}
      </h2>
    </div>
  )
}

function Navbar() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 border-b-4 bg-white"
      style={{ borderColor: tokens.border, backgroundColor: tokens.background }}
    >
      <div className="flex h-16 w-full items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <div className="h-6 w-6 bg-black" />
          <span className="font-black text-xl tracking-tighter uppercase" style={{ color: tokens.foreground }}>
            {PRODUCT_NAME}
          </span>
        </div>
        
        <div className="hidden md:flex h-full">
          {NAV_LINKS.map((link, i) => (
            <motion.a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="h-full px-8 flex items-center border-l-4 font-bold text-sm tracking-widest uppercase transition-colors"
              style={{ borderColor: tokens.border, color: tokens.foreground }}
              whileHover={{ backgroundColor: tokens.foreground, color: tokens.background }}
              transition={{ duration: 0 }}
            >
              <div className="overflow-hidden">
                <motion.div
                  initial={{ y: 0 }}
                  whileHover={{ y: -24 }}
                  transition={{ duration: 0.15, ease: 'linear' }}
                  className="flex flex-col gap-6"
                >
                  <span>{link}</span>
                  <span style={{ color: tokens.accent }}>{link}</span>
                </motion.div>
              </div>
            </motion.a>
          ))}
        </div>
        
        <motion.button
          className="h-10 px-6 border-2 font-black text-sm tracking-widest uppercase flex items-center gap-2 md:hidden"
          style={{ borderColor: tokens.border, backgroundColor: tokens.accent, color: tokens.background }}
        >
          MENU
        </motion.button>
      </div>
    </nav>
  )
}

function Hero() {
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 1000], [0, 200])
  const y2 = useTransform(scrollY, [0, 1000], [0, -100])

  return (
    <section className="min-h-dvh pt-16 flex flex-col md:flex-row relative border-b-4 overflow-hidden" style={{ borderColor: tokens.border, backgroundColor: tokens.background }}>
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 pointer-events-none z-0" style={patterns.grid} />
      
      {/* Left Column - Typography */}
      <div className="flex-1 p-6 md:p-12 lg:p-24 flex flex-col justify-center border-b-4 md:border-b-0 md:border-r-4 relative z-10" style={{ borderColor: tokens.border }}>
        <GridSnapReveal direction="x">
          <div className="inline-block px-4 py-1 mb-8 border-2 font-bold tracking-widest text-xs uppercase" style={{ borderColor: tokens.border, backgroundColor: tokens.muted, color: tokens.foreground }}>
            SYSTEM VERSION 3.0
          </div>
        </GridSnapReveal>
        
        <GridSnapReveal delay={0.1}>
          <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black leading-[0.85] tracking-tighter uppercase whitespace-pre-line mb-12" style={{ color: tokens.foreground }}>
            {TAGLINE}
          </h1>
        </GridSnapReveal>

        <GridSnapReveal delay={0.2}>
          <div className="max-w-md border-l-4 pl-6" style={{ borderColor: tokens.accent }}>
            <p className="text-lg md:text-xl font-medium leading-relaxed uppercase" style={{ color: tokens.foreground }}>
              {DESCRIPTION}
            </p>
          </div>
        </GridSnapReveal>

        <GridSnapReveal delay={0.3}>
          <div className="mt-12 flex flex-col sm:flex-row gap-4">
            <motion.button
              whileHover={{ backgroundColor: tokens.accent, color: tokens.background, scale: 1.05 }}
              className="h-16 px-10 border-4 font-black tracking-widest uppercase flex items-center justify-center gap-4 transition-colors duration-150"
              style={{ borderColor: tokens.border, backgroundColor: tokens.foreground, color: tokens.background }}
            >
              INITIALIZE <ArrowRight className="w-6 h-6" />
            </motion.button>
            <motion.button
              whileHover={{ backgroundColor: tokens.foreground, color: tokens.background }}
              className="h-16 px-10 border-4 font-black tracking-widest uppercase transition-colors duration-150"
              style={{ borderColor: tokens.border, backgroundColor: 'transparent', color: tokens.foreground }}
            >
              DOCUMENTATION
            </motion.button>
          </div>
        </GridSnapReveal>
      </div>

      {/* Right Column - Abstract Composition */}
      <div className="flex-1 relative min-h-[50vh] md:min-h-full bg-white z-0 overflow-hidden" style={patterns.dots}>
        <motion.div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full mix-blend-multiply" style={{ y: y1, backgroundColor: tokens.accent }} />
        <motion.div className="absolute bottom-1/4 right-1/4 w-72 h-72 border-[16px] mix-blend-multiply" style={{ y: y2, borderColor: tokens.foreground }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-1 bg-black" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-full bg-black" />
      </div>
    </section>
  )
}

function Stats() {
  return (
    <section className="border-b-4 bg-white" style={{ borderColor: tokens.border }}>
      <div className="grid grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat, i) => (
          <motion.div
            key={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover="hover"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { delay: i * 0.1 } },
              hover: { backgroundColor: tokens.foreground, color: tokens.background }
            }}
            className="p-8 md:p-12 border-b-4 lg:border-b-0 border-r-4 last:border-r-0 flex flex-col justify-between aspect-square group transition-colors duration-150"
            style={{ borderColor: tokens.border, color: tokens.foreground }}
          >
            <div className="flex justify-between items-start">
              <span className="font-bold tracking-widest text-sm uppercase">{stat.label}</span>
              <motion.div variants={{ hover: { rotate: 90, color: tokens.accent } }} transition={{ duration: 0.15, ease: 'linear' }}>
                <Plus className="w-8 h-8" strokeWidth={3} />
              </motion.div>
            </div>
            <motion.div variants={{ hover: { scale: 1.05, originX: 0, originY: 1 } }} transition={{ duration: 0.15, ease: 'linear' }}>
              <span className="text-6xl md:text-8xl font-black tracking-tighter block leading-none">{stat.value}</span>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function Features() {
  return (
    <section id="system" className="border-b-4" style={{ borderColor: tokens.border, backgroundColor: tokens.muted }}>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr]">
        
        {/* Sidebar */}
        <div className="p-8 md:p-12 lg:p-24 border-b-4 lg:border-b-0 lg:border-r-4 relative" style={{ borderColor: tokens.border }}>
          <div className="absolute inset-0 pointer-events-none" style={patterns.diagonal} />
          <div className="relative z-10 sticky top-32">
            <SectionLabel number="01." text="SYSTEM ARCHITECTURE" />
            <p className="text-xl font-medium uppercase mt-8" style={{ color: tokens.foreground }}>
              THE FOUNDATION IS BUILT ON STRICT MATHEMATICAL PRINCIPLES. EVERY ELEMENT IS POSITIONED WITH PURPOSE.
            </p>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 bg-white">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true, margin: '-10% 0px' }}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { delay: (i % 2) * 0.1 } },
                hover: { backgroundColor: tokens.accent, color: tokens.background }
              }}
              className="p-8 md:p-12 border-b-4 md:border-r-4 group transition-colors duration-150"
              style={{ borderColor: tokens.border, color: tokens.foreground }}
            >
              <div className="mb-16 flex justify-between items-start">
                <feature.icon className="w-12 h-12" strokeWidth={2} />
                <span className="font-bold text-2xl tracking-tighter">{(i + 1).toString().padStart(2, '0')}</span>
              </div>
              <h3 className="text-3xl font-black mb-4 tracking-tighter uppercase">{feature.title}</h3>
              <p className="text-lg font-medium leading-relaxed uppercase group-hover:text-black/80">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Method() {
  return (
    <section id="method" className="border-b-4 bg-white" style={{ borderColor: tokens.border }}>
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[80vh]">
        {/* Composition Block */}
        <div className="border-b-4 lg:border-b-0 lg:border-r-4 relative overflow-hidden" style={{ borderColor: tokens.border }}>
          <div className="absolute inset-0" style={patterns.grid} />
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: 'linear' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 border-4 bg-white flex items-center justify-center"
            style={{ borderColor: tokens.border }}
          >
            <div className="w-1/2 h-1/2 bg-black rounded-full mix-blend-multiply" />
            <div className="absolute w-full h-4 bg-red-600 mix-blend-multiply" style={{ backgroundColor: tokens.accent }} />
          </motion.div>
        </div>

        {/* Text Block */}
        <div className="p-8 md:p-12 lg:p-24 flex flex-col justify-center">
          <SectionLabel number="02." text="METHODOLOGY" />
          <div className="space-y-8">
            <p className="text-2xl md:text-4xl font-black leading-tight uppercase tracking-tighter" style={{ color: tokens.foreground }}>
              OBJECTIVITY OVER SUBJECTIVITY. THE DESIGN MUST RECEDE TO LET THE CONTENT SPEAK.
            </p>
            <div className="w-full h-2 bg-black" />
            <p className="text-xl font-medium leading-relaxed uppercase max-w-xl" style={{ color: tokens.foreground }}>
              PERSONAL ORNAMENTATION IS ELIMINATED IN FAVOR OF FUNCTIONAL COMMUNICATION. THE DESIGNER IS NOT AN ARTIST EXPRESSING THEMSELVES, BUT A CONDUIT FOR INFORMATION.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Pricing() {
  return (
    <section className="border-b-4" style={{ borderColor: tokens.border, backgroundColor: tokens.muted }}>
      <div className="p-8 md:p-12 lg:p-24 border-b-4" style={{ borderColor: tokens.border }}>
        <SectionLabel number="03." text="LICENSING" />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 bg-white">
        {PRICING.map((tier, i) => (
          <motion.div
            key={i}
            whileHover="hover"
            className="border-b-4 lg:border-b-0 lg:border-r-4 last:border-r-0 flex flex-col group relative"
            style={{ 
              borderColor: tokens.border,
              backgroundColor: tier.highlighted ? tokens.foreground : tokens.background,
              color: tier.highlighted ? tokens.background : tokens.foreground
            }}
          >
            {tier.highlighted && <div className="absolute top-0 left-0 w-full h-2" style={{ backgroundColor: tokens.accent }} />}
            
            <div className="p-8 md:p-12 flex-1 border-b-4" style={{ borderColor: tokens.border }}>
              <h3 className="text-3xl font-black tracking-tighter uppercase mb-2">{tier.name}</h3>
              <div className="flex items-start gap-1 mb-8">
                <span className="text-2xl font-bold mt-2">$</span>
                <span className="text-7xl font-black tracking-tighter">{tier.price}</span>
                <span className="text-sm font-bold tracking-widest mt-10">/{tier.period}</span>
              </div>
              <p className="text-sm font-bold tracking-widest uppercase mb-12 h-10">{tier.description}</p>
              
              <ul className="space-y-4">
                {tier.features.map(f => (
                  <li key={f} className="flex items-center gap-4 text-sm font-bold tracking-widest uppercase">
                    <div className="w-2 h-2 rounded-none" style={{ backgroundColor: tier.highlighted ? tokens.accent : tokens.foreground }} />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            
            <motion.button
              variants={{
                hover: { 
                  backgroundColor: tier.highlighted ? tokens.background : tokens.accent, 
                  color: tier.highlighted ? tokens.foreground : tokens.background 
                }
              }}
              transition={{ duration: 0 }}
              className="p-8 font-black text-2xl tracking-tighter uppercase flex justify-between items-center transition-colors duration-150"
              style={{ 
                backgroundColor: tier.highlighted ? tokens.foreground : tokens.background,
                color: tier.highlighted ? tokens.background : tokens.foreground
              }}
            >
              {tier.cta} <ArrowUpRight className="w-8 h-8" />
            </motion.button>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function Testimonials() {
  return (
    <section id="testimony" className="border-b-4 bg-white" style={{ borderColor: tokens.border }}>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr]">
        <div className="p-8 md:p-12 lg:p-24 border-b-4 lg:border-b-0 lg:border-r-4 relative" style={{ borderColor: tokens.border }}>
          <div className="absolute inset-0" style={patterns.dots} />
          <div className="relative z-10 sticky top-32 bg-white p-6 border-4" style={{ borderColor: tokens.border }}>
             <SectionLabel number="04." text="TESTIMONY" />
             <div className="w-16 h-16 bg-black rounded-full mt-12" />
          </div>
        </div>
        
        <div className="divide-y-4" style={{ borderColor: tokens.border }}>
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              whileHover="hover"
              className="p-8 md:p-12 group transition-colors duration-150"
            >
              <p className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-[1.1] mb-12 transition-colors duration-150 group-hover:text-[#FF3000]" style={{ color: tokens.foreground }}>
                "{t.text}"
              </p>
              <div className="flex justify-between items-end border-t-4 pt-4" style={{ borderColor: tokens.border }}>
                <div>
                  <p className="font-black text-xl uppercase tracking-tighter" style={{ color: tokens.foreground }}>{t.name}</p>
                  <p className="font-bold text-sm uppercase tracking-widest" style={{ color: tokens.accent }}>{t.role}</p>
                </div>
                <p className="font-bold text-sm uppercase tracking-widest" style={{ color: tokens.foreground }}>{t.company}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  return (
    <section id="faq" className="border-b-4 bg-white" style={{ borderColor: tokens.border }}>
      <div className="p-8 md:p-12 lg:p-24 border-b-4" style={{ borderColor: tokens.border }}>
        <SectionLabel number="05." text="FAQ" />
      </div>
      
      <div className="divide-y-4" style={{ borderColor: tokens.border }}>
        {FAQ_ITEMS.map((item, i) => {
          const isOpen = openIdx === i
          return (
            <motion.div
              key={i}
              className="overflow-hidden transition-colors duration-150"
              style={{ backgroundColor: isOpen ? tokens.accent : tokens.background }}
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : i)}
                className="w-full p-8 md:p-12 flex justify-between items-center text-left"
              >
                <span className="text-2xl md:text-4xl font-black uppercase tracking-tighter" style={{ color: isOpen ? tokens.background : tokens.foreground }}>
                  {item.q}
                </span>
                <motion.div
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.15, ease: 'linear' }}
                  style={{ color: isOpen ? tokens.background : tokens.foreground }}
                >
                  <Plus className="w-10 h-10 flex-shrink-0" strokeWidth={3} />
                </motion.div>
              </button>
              <motion.div
                initial={false}
                animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.2, ease: 'linear' }}
              >
                <div className="px-8 md:px-12 pb-12">
                  <p className="text-xl font-medium uppercase leading-relaxed max-w-4xl" style={{ color: tokens.background }}>
                    {item.a}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}

function Newsletter() {
  return (
    <section className="border-b-4 bg-black" style={{ borderColor: tokens.border, color: tokens.background }}>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="p-8 md:p-12 lg:p-24 border-b-4 lg:border-b-0 lg:border-r-4 flex flex-col justify-center" style={{ borderColor: tokens.border }}>
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-6">
            SUBSCRIBE TO<br />UPDATES
          </h2>
          <p className="text-xl font-bold tracking-widest uppercase" style={{ color: tokens.accent }}>
            NO SPAM. ONLY PURE DATA.
          </p>
        </div>
        
        <div className="p-8 md:p-12 lg:p-24 flex items-center bg-black relative overflow-hidden">
          <div className="absolute inset-0 opacity-20" style={patterns.diagonal} />
          <form className="w-full relative z-10" onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col border-4" style={{ borderColor: tokens.background }}>
              <input 
                type="email" 
                placeholder="EMAIL ADDRESS" 
                className="p-6 text-2xl font-bold uppercase tracking-widest bg-transparent outline-none focus:bg-white focus:text-black transition-colors duration-150"
                required
              />
              <button 
                type="submit"
                className="p-6 border-t-4 text-2xl font-black uppercase tracking-tighter flex justify-between items-center hover:bg-[#FF3000] transition-colors duration-150"
                style={{ borderColor: tokens.background }}
              >
                SUBMIT <ArrowRight className="w-8 h-8" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-white" style={{ color: tokens.foreground }}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-b-4" style={{ borderColor: tokens.border }}>
        <div className="p-8 md:p-12 border-b-4 md:border-b-0 md:border-r-4 flex flex-col justify-between min-h-[300px]" style={{ borderColor: tokens.border }}>
          <div className="flex items-center gap-4">
            <div className="h-8 w-8 bg-black" />
            <span className="font-black text-2xl tracking-tighter uppercase">{PRODUCT_NAME}</span>
          </div>
          <p className="font-bold text-sm tracking-widest uppercase mt-12">
            ZÜRICH, CH<br />
            1957 — PRESENT
          </p>
        </div>
        
        {['INDEX', 'RESOURCES', 'LEGAL'].map((col, i) => (
          <div key={col} className="p-8 md:p-12 border-b-4 lg:border-b-0 md:border-r-4 last:border-r-0" style={{ borderColor: tokens.border }}>
            <h4 className="font-black text-xl tracking-tighter uppercase mb-8" style={{ color: tokens.accent }}>{col}</h4>
            <ul className="space-y-4">
              {[1, 2, 3, 4].map(link => (
                <li key={link}>
                  <a href="#" className="font-bold text-sm tracking-widest uppercase hover:bg-black hover:text-white px-2 -ml-2 transition-colors duration-0 inline-block">
                    {col} ITEM 0{link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      
      <div className="p-8 flex flex-col md:flex-row justify-between items-center font-bold text-sm tracking-widest uppercase">
        <p>© {new Date().getFullYear()} {PRODUCT_NAME}</p>
        <a href="/" className="mt-4 md:mt-0 hover:bg-black hover:text-white px-2 py-1 border-2 transition-colors duration-0" style={{ borderColor: tokens.border }}>
          ← RETURN TO GALLERY
        </a>
      </div>
    </footer>
  )
}

// ─────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────
export default function SwissPage() {
  return (
    <div className={`${interFont.variable} font-sans min-h-screen`} style={{ backgroundColor: tokens.background }}>
      <NoiseOverlay />
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Features />
        <Method />
        <Pricing />
        <Testimonials />
        <FAQ />
        <Newsletter />
      </main>
      <Footer />
    </div>
  )
}
