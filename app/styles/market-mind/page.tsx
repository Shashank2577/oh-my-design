'use client'

/**
 * STYLE 99: MarketMind (Strategic Consulting) - V3 HIGH DENSITY
 * 
 * Philosophy: Cerebral, interconnected, and illuminating. "Seeing the Unseen."
 * Vibe: "The War Room"—dimly lit, high-tech, and focused on the big picture.
 * Unique Section: Competitor Landscape Map (Voronoi-inspired)
 */

import { motion, useReducedMotion, useInView, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect, useMemo } from 'react'
import { Instrument_Sans, Inter, JetBrains_Mono } from 'next/font/google'
import {
  Brain, Search, Target, Compass, Network, Activity, 
  BarChart3, Globe, Lock, ArrowRight, Check, Star, 
  ChevronDown, MessageSquare, Lightbulb, Zap
} from 'lucide-react'

// ─────────────────────────────────────────────
// FONTS
// ─────────────────────────────────────────────
const displayFont = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

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
  background: '#080A0E',
  backgroundAlt: '#0C0F14',
  surface: 'rgba(20, 25, 35, 0.6)',
  foreground: '#F0F4F8',
  muted: '#1A1D23',
  mutedForeground: '#7A8C99',
  border: 'rgba(0, 209, 255, 0.15)',
  accent1: '#00D1FF', // Synapse Blue
  accent2: '#7000FF', // Intuition Purple
  accentForeground: '#FFFFFF',
  easeOut: 'cubic-bezier(0.23, 1, 0.32, 1)',
}

// ─────────────────────────────────────────────
// MOTION HELPERS
// ─────────────────────────────────────────────

function TerminalOverlay() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03]">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />
    </div>
  )
}

function SynapsePulse() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[-20%] left-[-10%] w-[1000px] h-[1000px] rounded-full"
        style={{
          background: `radial-gradient(circle, ${tokens.accent1}25 0%, transparent 70%)`,
        }}
      />
    </div>
  )
}

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const shouldReduce = useReducedMotion()

  return (
    <motion.div
      initial={shouldReduce ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay, ease: tokens.easeOut }}
    >
      {children}
    </motion.div>
  )
}

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────
const PRODUCT_NAME = 'MarketMind'
const TAGLINE = 'Decoding the Structural Unseen'
const DESCRIPTION = 'Advanced strategic consulting powered by spatial intelligence and deep network analysis. We transform market complexity into actionable competitive advantage.'

const NAV_LINKS = ['Intelligence', 'Strategy', 'Analysis', 'Insights']

const STATS = [
  { value: '12.4B', label: 'Data Points' },
  { value: '450+', label: 'Strategic Audits' },
  { value: '14ms', label: 'Inference Speed' },
  { value: '98%', label: 'Accuracy' },
]

const CORE_PILLARS = [
  { icon: Brain, title: 'Neural Auditing', description: 'Mapping the cognitive landscape of market segments using high-fidelity sentiment vectors.' },
  { icon: Network, title: 'Network Topology', description: 'Visualizing competitor ecosystems to identify hidden structural dependencies and risks.' },
  { icon: Target, title: 'Precision Targeting', description: 'Multi-dimensional market penetration strategies backed by deep embedding analysis.' },
  { icon: Search, title: 'Pattern Recognition', description: 'Detecting subtle behavior shifts before they manifest as mainstream market trends.' },
]

const VORONOI_DATA = [
  { name: 'Core Alpha', size: 100, x: 50, y: 50, color: tokens.accent1 },
  { name: 'Emergent Beta', size: 60, x: 20, y: 30, color: tokens.accent2 },
  { name: 'Legacy Delta', size: 80, x: 80, y: 20, color: '#5C6B7A' },
  { name: 'Disruptor Epsilon', size: 40, x: 70, y: 70, color: tokens.accent1 },
  { name: 'Growth Gamma', size: 70, x: 30, y: 80, color: tokens.accent2 },
]

// ─────────────────────────────────────────────
// COMPONENTS
// ─────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[110] transition-[padding,background-color,border-color,backdrop-filter] duration-500 ${scrolled ? 'py-4 backdrop-blur-2xl border-b bg-black/80' : 'py-10 bg-transparent'}`}
      style={{ borderColor: scrolled ? tokens.border : 'transparent' }}
    >
      <div className="max-w-[1400px] mx-auto px-10 flex items-center justify-between">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="relative">
            <Brain className="h-6 w-6 relative z-10 text-blue-400" aria-hidden="true" />
            <motion.div 
              className="absolute inset-0 blur-lg bg-blue-400" 
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </div>
          <span className="font-display font-bold text-2xl tracking-tighter text-[#F0F4F8]">
            {PRODUCT_NAME}
          </span>
        </div>
        <div className="hidden lg:flex items-center gap-12">
          {NAV_LINKS.map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-[10px] font-black uppercase tracking-[0.4em] transition-colors text-white/40 hover:text-white"
            >
              {link}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-transform shadow-[0_0_20px_rgba(0,209,255,0.2)] bg-blue-400 text-black"
          >
            Access Terminal
          </motion.button>
        </div>
      </div>
    </nav>
  )
}

function Hero() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 100])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center pt-24 overflow-hidden bg-[#080A0E]">
      <SynapsePulse />
      
      {/* Background Mesh */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <svg className="w-full h-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-hero" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#00D1FF" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-hero)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-10">
        <motion.div className="lg:col-span-8" style={{ y, opacity }}>
          <FadeUp>
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 mb-8">
              <span className="flex h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-400">
                Nexus Intelligence Layer v4.12
              </span>
            </div>
          </FadeUp>
          
          <motion.h1
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: tokens.easeOut }}
            className="text-[clamp(3rem,7vw,6.5rem)] font-display font-bold leading-[0.9] mb-10 tracking-tighter text-[#F0F4F8]"
          >
            Decoding the <br/>
            <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">
              Structural Unseen
            </span>
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex flex-col md:flex-row gap-12 items-start"
          >
            <p className="text-lg max-w-sm leading-relaxed text-white/70 font-medium">
              We operate at the fringe of market logic, where data becomes narrative and risk becomes structural.
            </p>
            
            <div className="flex flex-col gap-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="group relative px-10 py-5 bg-white text-black font-black text-[10px] uppercase tracking-[0.3em] rounded-full overflow-hidden transition-transform shadow-[0_20px_50px_rgba(255,255,255,0.1)]"
              >
                <span className="relative z-10">Initiate Strategy Audit</span>
                <motion.div 
                  className="absolute inset-0 bg-blue-400 z-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"
                />
              </motion.button>
              
              <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] opacity-60 hover:opacity-100 transition-opacity cursor-pointer group">
                <span>View Protocol Ledger</span>
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-2" />
              </div>
            </div>
          </motion.div>
        </motion.div>
        
        <div className="hidden lg:flex lg:col-span-4 flex-col justify-end pb-12">
          <FadeUp delay={0.6}>
            <div className="p-8 rounded-[2rem] border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-transparent opacity-50" />
              <div className="flex gap-1.5 mb-6">
                {[1,2,3,4].map(i => <div key={i} className="h-1 w-10 rounded-full bg-blue-500/20 group-hover:bg-blue-500/40 transition-colors" />)}
              </div>
              <p className="text-[11px] font-mono leading-relaxed text-white/50 mb-6">
                Active monitoring of <span className="text-white font-bold">12.4B</span> points across 4 regions. <br/>
                Market entropy: <span className="text-emerald-400 font-bold">0.244 (STABLE)</span>.
              </p>
              <div className="h-40 w-full bg-black/40 rounded-2xl border border-white/5 relative overflow-hidden flex items-center justify-center">
                <motion.div 
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 360]
                  }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-24 h-24 border border-blue-500/20 rounded-full flex items-center justify-center"
                >
                  <div className="w-16 h-16 border border-blue-500/10 rounded-full" />
                </motion.div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Activity className="h-6 w-6 text-blue-500/40" />
                </div>
                <motion.div 
                  animate={{ x: [-200, 200] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute bottom-0 h-[1px] w-full bg-blue-400/30"
                />
              </div>
            </div>
          </FadeUp>
        </div>

        {/* Hero Interactive Element */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
          <span className="text-[9px] font-black uppercase tracking-[0.5em] text-white/30 text-center">Descend</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-px h-12 bg-gradient-to-b from-blue-500/50 to-transparent"
          />
        </div>
      </div>
    </section>
  )
}

function LandscapeMap() {
  const [activeId, setActiveId] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100
    })
  }

  return (
    <section className="py-24 relative overflow-hidden bg-[#080A0E]">
      <div className="max-w-[1400px] mx-auto px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
          <div className="lg:col-span-5">
            <FadeUp>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-[2px] w-10 bg-blue-500" />
                <p className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-400">Visualization Layer</p>
              </div>
              <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-display font-bold mb-8 leading-[0.95] tracking-tighter text-white">
                Dynamic <br/>
                <span className="opacity-40 italic font-medium text-white">Spatial Mapping</span>
              </h2>
              <div className="space-y-6 max-w-sm text-white/70 leading-relaxed text-base">
                <p>
                  We visualize your market as a high-dimensional vector field. Every node is a weighted coordinate of capability and influence.
                </p>
                <div className="p-6 rounded-3xl border border-blue-500/20 bg-blue-500/5 shadow-[inset_0_0_20px_rgba(0,209,255,0.05)]">
                  <p className="text-sm italic opacity-80 leading-relaxed">
                    Interact with the field to detect structural anomalies. Predictive entropy thresholds are updated in real-time.
                  </p>
                </div>
              </div>
              
              <div className="mt-12 flex flex-wrap gap-3">
                {VORONOI_DATA.map((node, i) => (
                  <motion.button 
                    key={i}
                    onMouseEnter={() => setActiveId(i)}
                    onMouseLeave={() => setActiveId(null)}
                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-4 px-5 py-3 rounded-2xl border border-white/10 bg-white/[0.05] text-left transition-all"
                  >
                    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: node.color }} />
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/80">{node.name}</span>
                  </motion.button>
                ))}
              </div>
            </FadeUp>
          </div>

          <div 
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="lg:col-span-7 relative aspect-[4/3] rounded-[3rem] border border-white/10 bg-black/60 overflow-hidden cursor-crosshair group shadow-[0_50px_120px_rgba(0,0,0,0.6)]"
          >
            {/* Field Grid */}
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `radial-gradient(#00D1FF 1.5px, transparent 1.5px)`, backgroundSize: '50px 50px' }} />

            <svg viewBox="0 0 100 100" className="w-full h-full relative z-10 p-10">
              {/* Lines connecting to mouse with spring-like lag */}
              {VORONOI_DATA.map((node, i) => (
                <motion.line
                  key={`line-${i}`}
                  x1={node.x}
                  y1={node.y}
                  x2={mousePos.x}
                  y2={mousePos.y}
                  stroke="#00D1FF"
                  strokeWidth="0.1"
                  strokeDasharray="1 1"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: activeId === i ? 0.8 : 0.15,
                    stroke: activeId === i ? "#00D1FF" : '#fff'
                  }}
                  transition={{ duration: 0.3 }}
                />
              ))}

              {/* Data Nodes */}
              {VORONOI_DATA.map((node, i) => (
                <g key={i}>
                  <motion.circle
                    cx={node.x}
                    cy={node.y}
                    r={node.size / 25}
                    fill={node.color}
                    initial={{ opacity: 0.4 }}
                    animate={{ 
                      opacity: activeId === i ? 1 : 0.4,
                      r: activeId === i ? node.size / 18 : node.size / 25
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />
                  <motion.circle
                    cx={node.x}
                    cy={node.y}
                    r={node.size / 12}
                    fill="none"
                    stroke={node.color}
                    strokeWidth="0.2"
                    initial={{ scale: 0 }}
                    animate={{ 
                      scale: activeId === i ? [1, 1.4, 1] : 0,
                      opacity: activeId === i ? [0.6, 0, 0.6] : 0
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </g>
              ))}
            </svg>

            {/* Float HUD Information */}
            <AnimatePresence>
              {activeId !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.9 }}
                  transition={{ duration: 0.2, ease: tokens.easeOut }}
                  className="absolute top-10 right-10 p-8 rounded-[2rem] bg-black/95 border border-white/20 backdrop-blur-3xl max-w-[260px] z-20 shadow-2xl"
                >
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-400 mb-4">Node Analysis</p>
                  <h3 className="text-xl font-bold mb-6 tracking-tight text-white">{VORONOI_DATA[activeId].name}</h3>
                  <div className="space-y-4 font-mono text-xs">
                    <div className="flex justify-between border-b border-white/10 pb-2">
                      <span className="text-white/40 uppercase tracking-tighter">Saturation</span> 
                      <span className="text-white font-bold">{VORONOI_DATA[activeId].size}%</span>
                    </div>
                    <div className="flex justify-between border-b border-white/10 pb-2">
                      <span className="text-white/40 uppercase tracking-tighter">Coord</span> 
                      <span className="text-white font-bold">[{VORONOI_DATA[activeId].x},{VORONOI_DATA[activeId].y}]</span>
                    </div>
                    <div className="flex justify-between pt-2">
                      <span className="text-white/40 uppercase tracking-tighter">Integrity</span> 
                      <span className="text-emerald-400 font-black tracking-widest uppercase">Stable</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Frame Details */}
            <div className="absolute bottom-8 left-8 flex items-center gap-4 text-[10px] font-mono text-white/30 tracking-[0.3em] uppercase">
              <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
              Field_Scan_Active // ID: 0x99
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function CorePillars() {
  return (
    <section className="py-24 relative border-y border-white/10 bg-[#0C0F14]">
      <div className="max-w-[1400px] mx-auto px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 mb-24">
          <div className="lg:col-span-7">
            <FadeUp>
              <h2 className="text-5xl md:text-7xl font-display font-bold mb-10 tracking-tighter text-white">Strategic Domains</h2>
              <p className="max-w-2xl text-white/50 leading-relaxed text-xl font-medium">
                Our methodology operates at the nexus of network topology, cognitive science, and quantitative risk modeling.
              </p>
            </FadeUp>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CORE_PILLARS.map((pillar, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: tokens.easeOut }}
              whileHover={{ y: -15, borderColor: 'rgba(0,209,255,0.3)', backgroundColor: 'rgba(255,255,255,0.03)' }}
              className="group p-10 rounded-[3rem] border border-white/10 bg-white/[0.02] flex flex-col gap-10 transition-all duration-500"
            >
              <div className="h-16 w-16 rounded-[1.5rem] bg-blue-500/10 border border-blue-500/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-500/20 transition-all duration-500">
                <pillar.icon className="h-8 w-8 text-blue-400" strokeWidth={1} />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold tracking-tight text-white">{pillar.title}</h3>
                <p className="text-white/40 leading-relaxed text-xs font-medium group-hover:text-white/60 transition-colors duration-500">
                  {pillar.description}
                </p>
              </div>
              <div className="mt-auto flex items-center gap-6 text-[10px] font-black uppercase tracking-[0.4em] opacity-40 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                <span style={{ color: tokens.accent1 }}>Deploy Module</span>
                <div className="h-px flex-1 bg-white/10" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Stats() {
  return (
    <section className="py-20 border-b border-white/10 bg-[#080A0E]">
      <div className="max-w-[1400px] mx-auto px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
          {STATS.map((stat, i) => (
            <div key={i} className="flex flex-col gap-4 group">
              <motion.span 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="text-5xl md:text-6xl font-display font-bold tracking-tighter text-white group-hover:text-blue-400 transition-colors duration-500"
              >
                {stat.value}
              </motion.span>
              <div className="flex items-center gap-4">
                <div className="h-px w-8 bg-blue-500/40 group-hover:w-12 transition-all duration-500" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section className="py-32 relative overflow-hidden bg-[#080A0E]">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent pointer-events-none" />
      
      <div className="max-w-5xl mx-auto px-10 relative z-10 text-center">
        <FadeUp>
          <h2 className="text-6xl md:text-8xl font-display font-bold mb-10 tracking-tighter text-white uppercase">Access the <br/> Network</h2>
          <p className="text-xl text-white/50 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
            Ready to decode the structural complexity of your market? Connect to our intelligence terminal.
          </p>
          
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form 
                key="form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onSubmit={handleSubmit} 
                className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto p-3 rounded-[3rem] bg-white/[0.03] border border-white/10 focus-within:border-blue-500/50 transition-all duration-500"
              >
                <input
                  type="email"
                  required
                  placeholder="Secure node identifier (Email)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-8 py-5 rounded-full bg-transparent text-base focus:outline-none placeholder:text-white/20 text-white"
                />
                <button
                  type="submit"
                  className="px-10 py-5 rounded-full bg-white text-black font-black text-[10px] uppercase tracking-[0.3em] hover:scale-105 active:scale-95 transition-all shadow-2xl"
                >
                  Authorize
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-12 rounded-[3.5rem] border border-emerald-500/30 bg-emerald-500/5 backdrop-blur-3xl shadow-2xl"
              >
                <div className="h-16 w-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-8">
                  <Check className="h-8 w-8 text-emerald-400" />
                </div>
                <h3 className="text-3xl font-bold mb-4 text-white tracking-tight">Handshake Complete</h3>
                <p className="text-emerald-400/60 text-base font-mono italic uppercase tracking-widest">Verification pending... Check secure terminal in 24h.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </FadeUp>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="py-24 border-t border-white/10 bg-[#0C0F14]">
      <div className="max-w-[1400px] mx-auto px-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-3 mb-8">
              <Brain className="h-7 w-7 text-blue-400" />
              <span className="font-display font-bold text-2xl tracking-tighter text-white">MarketMind</span>
            </div>
            <p className="text-[11px] leading-relaxed text-white/30 max-w-xs font-mono uppercase tracking-widest">
              Strategic Nexus <br/>
              LON — NYC — TYO
            </p>
          </div>
          {['Resources', 'Protocol', 'Infrastructure'].map((group) => (
            <div key={group}>
              <h4 className="text-[10px] font-black uppercase tracking-[0.5em] mb-8 text-white/20">{group}</h4>
              <ul className="space-y-4 text-[11px] font-bold text-white/40">
                <li><a href="#" className="hover:text-blue-400 transition-colors uppercase tracking-widest">Neural Ledger</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors uppercase tracking-widest">Market Map v4</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors uppercase tracking-widest">API Status</a></li>
              </ul>
            </div>
          ))}
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between pt-10 border-t border-white/5 gap-10">
          <p className="text-[9px] font-black text-white/20 tracking-[0.5em] uppercase">
            © 2026 MARKETMIND STRATEGY GROUP // 0x99_ROOT
          </p>
          <div className="flex gap-10 text-[9px] font-black text-white/20 tracking-[0.5em] uppercase">
            <a href="/" className="hover:text-white transition-colors underline decoration-blue-500/50 underline-offset-8">Return to Showcase</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ─────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────

export default function MarketMindPage() {
  return (
    <div className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable} font-sans selection:bg-blue-500/40 text-white min-h-screen bg-[#080A0E]`}>
      <TerminalOverlay />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <Stats />
        <CorePillars />
        <LandscapeMap />
        
        {/* Deep Analysis Section - High Contrast */}
        <section className="py-24 border-t border-white/10 relative overflow-hidden bg-[#080A0E]">
          <div className="absolute inset-0 bg-blue-500/5 opacity-20 pointer-events-none" />
          <div className="max-w-[1000px] mx-auto px-10 relative z-10">
            <FadeUp>
              <div className="flex flex-col gap-16">
                <div className="p-16 rounded-[3.5rem] bg-gradient-to-br from-blue-500/10 to-purple-600/10 border border-white/10 shadow-2xl relative">
                  <div className="absolute top-10 right-10 flex gap-2">
                    <div className="h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(0,209,255,0.5)]" />
                    <div className="h-2 w-2 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(112,0,255,0.5)]" />
                  </div>
                  <Lightbulb className="h-10 w-10 text-blue-400 mb-10" />
                  <h3 className="text-3xl md:text-5xl font-display font-bold mb-8 leading-tight text-white tracking-tighter italic">
                    "The future is not a destination, but a frequency we must tune into."
                  </h3>
                  <div className="h-[2px] w-24 bg-gradient-to-r from-blue-500 to-transparent mb-8" />
                  <p className="text-base font-mono text-white/40 uppercase tracking-[0.3em]">
                    — Elias Thorne, Chief Strategist
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-6 p-10 rounded-[2.5rem] border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-colors duration-500">
                    <h4 className="text-xl font-black flex items-center gap-4 text-white uppercase tracking-tighter">
                      <Zap className="h-5 w-5 text-blue-400" />
                      Dynamic Refactoring
                    </h4>
                    <p className="text-sm text-white/50 leading-relaxed font-medium">
                      Our models don't just predict; they refactor your internal logic in real-time. We provide the "Cognitive Infrastructure" needed to withstand rapid disruptors.
                    </p>
                  </div>
                  <div className="space-y-6 p-10 rounded-[2.5rem] border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-colors duration-500">
                    <h4 className="text-xl font-black flex items-center gap-4 text-white uppercase tracking-tighter">
                      <Activity className="h-5 w-5 text-blue-400" />
                      Entropy Reduction
                    </h4>
                    <p className="text-sm text-white/50 leading-relaxed font-medium">
                      By identifying noise in your supply chain and communication channels, we reduce the total entropy of organization, leading to 20%+ efficiency gains.
                    </p>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </section>

        <Contact />
      </main>
      <Footer />
    </div>
  )
}