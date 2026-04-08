'use client'

/**
 * PAGE TEMPLATE — oh-my-design
 *
 * Style: GrowthGrid (Batch 10 - V3)
 * Vibe: Silicon Valley Lab, Science of Scale
 */

import { motion, useReducedMotion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { IBM_Plex_Mono, Archivo_Black } from 'next/font/google'
import {
  ArrowRight, Check, Zap,
  BarChart, GitCommit, Crosshair, Terminal, Network, ShieldCheck
} from 'lucide-react'

// ─────────────────────────────────────────────
// FONTS
// ─────────────────────────────────────────────
const ibmPlexMono = IBM_Plex_Mono({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const archivoBlack = Archivo_Black({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-headings',
  display: 'swap',
})

// ─────────────────────────────────────────────
// DESIGN TOKENS
// ─────────────────────────────────────────────
const tokens = {
  background: '#000000', // Grid Void
  surface: '#111111',    // Module
  accent1: '#00FF41',    // Matrix Green
  accent2: '#333333',    // Graphite
  border: '#222222',
  gridLine: 'rgba(0, 255, 65, 0.05)',
  textHigh: '#FFFFFF',
  textLow: '#A0A0A0',
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
      initial={shouldReduce ? false : { opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, delay, type: 'spring', stiffness: 400, damping: 30, mass: 0.8 }}
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

const staggerItem = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { type: 'spring' as const, stiffness: 400, damping: 30 } },
}

const dataPop = {
  hidden: { opacity: 0, scale: 0 },
  visible: { opacity: 1, scale: [0, 1.2, 1], transition: { type: 'spring' as const, stiffness: 500, damping: 15 } }
}

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────
const PRODUCT_NAME = 'GrowthGrid'
const TAGLINE = 'THE SCIENCE OF SCALE'
const DESCRIPTION = 'Exponential growth requires rigorous experimentation. Automate your testing, analyze the data, and scale your winning variations to infinity.'

const NAV_LINKS = ['Features', 'Tracker', 'Pricing', 'FAQ']

const STATS = [
  { value: '4.2M', label: 'EXPERIMENTS_RUN' },
  { value: '312%', label: 'AVG_GROWTH_MULT' },
  { value: '0.9ms', label: 'VAR_INFERENCE' },
  { value: '100%', label: 'STAT_SIGNIFICANCE' },
]

const FEATURES = [
  { icon: BarChart, title: 'A/B/N Testing Engine', description: 'Run multivariate tests at scale with zero-latency variation delivery.' },
  { icon: Network, title: 'Multi-Armed Bandit', description: 'Automatically route traffic to the winning variations in real-time.' },
  { icon: Crosshair, title: 'Audience Targeting', description: 'Define complex segments using boolean logic and behavioral data.' },
  { icon: Terminal, title: 'Developer SDK', description: 'Native integrations for React, Next.js, and raw Node environments.' },
  { icon: GitCommit, title: 'Event Tracking', description: 'Capture custom events with sub-millisecond precision.' },
  { icon: ShieldCheck, title: 'Statistical Rigor', description: 'Bayesian and Frequentist models to ensure complete confidence.' },
]

const PRICING = [
  {
    name: 'STARTUP_NODE',
    price: '$299',
    period: 'MO',
    description: 'Essential experimentation for growing startups.',
    features: ['10K Monthly Tracked Users', 'Unlimited Experiments', 'Basic Support', 'API Access'],
    cta: 'INITIATE',
    highlighted: false,
  },
  {
    name: 'GROWTH_CLUSTER',
    price: '$999',
    period: 'MO',
    description: 'Advanced analytics and scale for mid-market.',
    features: ['100K Monthly Tracked Users', 'Multi-Armed Bandits', 'Priority Slack Support', 'Custom Audiences'],
    cta: 'SCALE_UP',
    highlighted: true,
  },
  {
    name: 'ENTERPRISE_GRID',
    price: 'CUSTOM',
    period: 'YR',
    description: 'Infinite scaling for global organizations.',
    features: ['Unlimited MTUs', 'Dedicated Account Mgr', 'On-Premise Deployment', 'SLA Guarantee'],
    cta: 'CONTACT_SALES',
    highlighted: false,
  },
]

const TESTIMONIALS = [
  {
    name: 'Dr. Sarah Chen',
    role: 'VP_GROWTH @ ACME_CORP',
    text: '> "GrowthGrid transformed our intuition-based marketing into a deterministic science. We increased conversion by 40% in Q1." // END',
    rating: 5,
  },
  {
    name: 'Marcus Weaver',
    role: 'LEAD_ENG @ STARTUP_X',
    text: '> "The SDK is flawlessly implemented. Sub-millisecond latency on variation assignment means zero flicker for our users." // END',
    rating: 5,
  },
  {
    name: 'Elena Rostova',
    role: 'DATA_SCI @ MEGA_BRAND',
    text: '> "Finally, a platform that understands statistical significance properly. The Bayesian reporting saves us hours every week." // END',
    rating: 5,
  },
]

const FAQ_ITEMS = [
  { q: 'WHAT_IS_THE_PERFORMANCE_IMPACT?', a: '> Our edge-computing architecture ensures variation assignment under 1ms globally. No layout shifts, no flicker.' },
  { q: 'HOW_DO_YOU_HANDLE_STATISTICAL_SIGNIFICANCE?', a: '> We provide both Frequentist and Bayesian engines. You set your confidence thresholds, we alert you when it\'s safe to scale.' },
  { q: 'CAN_I_RUN_MULTI_ARMED_BANDIT_TESTS?', a: '> Yes. Our MAB engine automatically shifts traffic toward winning variations in real-time, minimizing regret.' },
  { q: 'DO_YOU_SUPPORT_SERVER_SIDE_TESTING?', a: '> Absolutely. SDKs are available for Node, Python, Go, and Ruby, along with a REST API for any environment.' },
]

// ─────────────────────────────────────────────
// COMPONENTS
// ─────────────────────────────────────────────

/**
 * Sticky Metrics Header Component
 * This fulfills the requirement for sticky metrics headers. It remains fixed
 * at the top of the viewport (below the navbar) using position: sticky.
 */
function StickyMetricsHeader() {
  const { scrollY } = useScroll()
  // Transform scroll position into a slowly ticking number to simulate live metrics
  const liveMetric1 = useTransform(scrollY, [0, 5000], [4200000, 4210000])
  const liveMetric2 = useTransform(scrollY, [0, 5000], [312, 345])

  const [displayM1, setDisplayM1] = useState('4,200,000')
  const [displayM2, setDisplayM2] = useState('312%')

  // Update the displayed metrics based on scroll transformations
  useEffect(() => {
    const unsub1 = liveMetric1.on('change', (v) => {
      setDisplayM1(Math.floor(v).toLocaleString())
    })
    const unsub2 = liveMetric2.on('change', (v) => {
      setDisplayM2(Math.floor(v) + '%')
    })
    return () => {
      unsub1()
      unsub2()
    }
  }, [liveMetric1, liveMetric2])

  return (
    <div className="sticky top-16 z-40 w-full border-b backdrop-blur-md overflow-hidden" style={{ borderColor: tokens.border, backgroundColor: `${tokens.background}E6` }}>
      {/* Background scanline for the sticky header to enhance the tech vibe */}
      <motion.div 
        className="absolute inset-0 w-full h-[200%] opacity-10 pointer-events-none"
        style={{ background: `linear-gradient(transparent, ${tokens.accent1}, transparent)` }}
        animate={{ y: ['-100%', '100%'] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
      />
      <div className="max-w-7xl mx-auto px-6 h-10 flex items-center justify-between text-[10px] font-bold tracking-widest uppercase" style={{ color: tokens.textHigh }}>
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#00FF41] animate-pulse" /> LIVE_METRICS</span>
          <span className="hidden sm:inline">EXPERIMENTS_RUN: <span style={{ color: tokens.accent1 }}>{displayM1}</span></span>
          <span className="hidden sm:inline">GROWTH_MULT: <span style={{ color: tokens.accent1 }}>{displayM2}</span></span>
        </div>
        <div className="flex items-center gap-4 text-[#A0A0A0]">
          <span>VAR_INFERENCE: 0.9ms</span>
          <span className="hidden md:inline">SYSTEM_STATUS: OPTIMAL</span>
        </div>
      </div>
    </div>
  )
}

// Infinite Background Grid
function BackgroundGrid() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const { scrollY } = useScroll()
  const yOffset = useTransform(scrollY, [0, 5000], [0, 200])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-black">
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, ${tokens.gridLine} 1px, transparent 1px),
            linear-gradient(to bottom, ${tokens.gridLine} 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          x: mousePos.x,
          y: yOffset,
        }}
      />
      <motion.div
        className="absolute inset-0"
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        style={{
          background: `radial-gradient(circle at 50% 50%, ${tokens.accent1}0A 0%, transparent 70%)`
        }}
      />
    </div>
  )
}

function Navbar() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-md"
      style={{ borderColor: tokens.border, backgroundColor: `${tokens.background}CC` }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            className="w-4 h-4 border"
            style={{ borderColor: tokens.accent1 }}
          />
          <span className={`${archivoBlack.variable} font-headings text-lg tracking-wider uppercase`} style={{ color: tokens.textHigh }}>
            {PRODUCT_NAME}
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-sm font-medium tracking-widest transition-colors hover:text-[#00FF41]"
              style={{ color: tokens.textLow }}
            >
              [ {link} ]
            </a>
          ))}
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-5 h-10 text-sm font-bold tracking-widest uppercase relative overflow-hidden group border"
          style={{ backgroundColor: tokens.surface, color: tokens.accent1, borderColor: tokens.accent1 }}
        >
          <span className="relative z-10">Deploy</span>
          <motion.div
            className="absolute inset-0 z-0 bg-[#00FF41]"
            initial={{ y: '100%' }}
            whileHover={{ y: 0 }}
            transition={{ duration: 0.2 }}
          />
          <motion.div
            className="absolute inset-0 z-10 text-black flex items-center justify-center opacity-0 group-hover:opacity-100 font-bold"
            initial={{ y: '100%' }}
            whileHover={{ y: 0 }}
            transition={{ duration: 0.2 }}
          >
            Deploy
          </motion.div>
        </motion.button>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section className="min-h-dvh flex items-center pt-16 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 py-24 w-full relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.15, delayChildren: 0.1 }}
          className="max-w-4xl"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 mb-6 border text-xs font-bold tracking-widest"
            style={{ borderColor: tokens.accent1, color: tokens.accent1, backgroundColor: `${tokens.accent1}10` }}
          >
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: tokens.accent1 }} />
            SYSTEMS_ONLINE
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className={`${archivoBlack.variable} font-headings text-6xl md:text-8xl leading-none mb-6 uppercase tracking-tight`}
            style={{ color: tokens.textHigh }}
          >
            {TAGLINE}
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-start gap-4 mb-10 max-w-2xl"
          >
            <span className="text-[#00FF41] mt-1">{'>'}</span>
            <p className="text-lg md:text-xl leading-relaxed" style={{ color: tokens.textLow }}>
              {DESCRIPTION}
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="h-14 px-8 font-bold tracking-widest uppercase flex items-center justify-center gap-2 border"
              style={{ backgroundColor: tokens.accent1, color: '#000000', borderColor: tokens.accent1 }}
            >
              INITIALIZE_WORKSPACE <ArrowRight className="h-4 w-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02, backgroundColor: tokens.surface }}
              whileTap={{ scale: 0.98 }}
              className="h-14 px-8 font-bold tracking-widest uppercase flex items-center justify-center border"
              style={{ borderColor: tokens.border, color: tokens.textHigh }}
            >
              READ_DOCS
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Hero Visual - Fractal Loading Grid */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] hidden lg:block opacity-60">
          <div className="relative w-full h-full">
            <motion.div 
              className="absolute inset-0 border-2" 
              style={{ borderColor: tokens.accent1 }}
              animate={{ rotate: 90 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
               {/* Decorative grid nodes */}
               <div className="absolute top-0 left-0 w-2 h-2 bg-[#00FF41] -translate-x-1/2 -translate-y-1/2" />
               <div className="absolute top-0 right-0 w-2 h-2 bg-[#00FF41] translate-x-1/2 -translate-y-1/2" />
               <div className="absolute bottom-0 left-0 w-2 h-2 bg-[#00FF41] -translate-x-1/2 translate-y-1/2" />
               <div className="absolute bottom-0 right-0 w-2 h-2 bg-[#00FF41] translate-x-1/2 translate-y-1/2" />
               
               <motion.div 
                 className="absolute inset-[10%] border"
                 style={{ borderColor: tokens.border }}
                 animate={{ rotate: -180 }}
                 transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
               />
               <motion.div 
                 className="absolute inset-[25%] border"
                 style={{ borderColor: tokens.border }}
                 animate={{ rotate: 360 }}
                 transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
               >
                 <motion.div 
                    className="absolute inset-0 bg-[#00FF41] opacity-20"
                    animate={{ scale: [1, 0.8, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                 />
               </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-6 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <span className="text-xs tracking-widest text-[#555] rotate-90 origin-left translate-y-6">SCROLL</span>
        <motion.div 
          className="w-px h-16 bg-[#333]"
          style={{ originY: 0 }}
          animate={{ scaleY: [0, 1, 0], y: [0, 20, 20] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.div>
    </section>
  )
}

/**
 * Interactive Data Visualization (Graph) building on scroll.
 * Fulfills the requirement for charts/graphs that build on scroll using Framer Motion.
 */
function ScrollInteractiveGraph() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end center"]
  })

  // Map scroll progress to the SVG path drawing length
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1])
  // Fade in the nodes as the line reaches them
  const node1Opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1])
  const node2Opacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1])
  const node3Opacity = useTransform(scrollYProgress, [0.6, 0.8], [0, 1])
  const node4Opacity = useTransform(scrollYProgress, [0.8, 1], [0, 1])

  return (
    <div ref={ref} className="w-full h-64 mt-12 relative border border-dashed p-4" style={{ borderColor: tokens.border }}>
      {/* Background grid for the chart */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
        backgroundImage: `linear-gradient(${tokens.border} 1px, transparent 1px), linear-gradient(90deg, ${tokens.border} 1px, transparent 1px)`,
        backgroundSize: '20px 20px'
      }} />
      
      {/* Axis labels */}
      <div className="absolute left-2 bottom-2 text-[10px] tracking-widest" style={{ color: tokens.textLow }}>TIME (t)</div>
      <div className="absolute left-2 top-2 text-[10px] tracking-widest rotate-90 origin-left" style={{ color: tokens.textLow }}>GROWTH (Δ)</div>

      {/* The SVG Line Graph */}
      <svg className="w-full h-full relative z-10" viewBox="0 0 1000 300" preserveAspectRatio="none">
        {/* Base prediction line (dotted) */}
        <path 
          d="M 0 250 L 250 200 L 500 180 L 750 150 L 1000 100" 
          fill="none" 
          stroke={tokens.textLow} 
          strokeWidth="2" 
          strokeDasharray="5,5" 
          opacity="0.3"
        />
        {/* Actual growth line drawn on scroll */}
        <motion.path 
          d="M 0 250 Q 200 240, 250 180 T 500 120 T 750 60 T 1000 20" 
          fill="none" 
          stroke={tokens.accent1} 
          strokeWidth="4"
          style={{ pathLength }}
        />
        
        {/* Data Nodes mapped to scroll progress */}
        <motion.circle cx="250" cy="180" r="6" fill={tokens.background} stroke={tokens.accent1} strokeWidth="3" style={{ opacity: node1Opacity }} />
        <motion.circle cx="500" cy="120" r="6" fill={tokens.background} stroke={tokens.accent1} strokeWidth="3" style={{ opacity: node2Opacity }} />
        <motion.circle cx="750" cy="60" r="6" fill={tokens.background} stroke={tokens.accent1} strokeWidth="3" style={{ opacity: node3Opacity }} />
        <motion.circle cx="1000" cy="20" r="8" fill={tokens.accent1} style={{ opacity: node4Opacity }} />
      </svg>
      
      {/* Floating data labels for the nodes */}
      <motion.div className="absolute top-[50%] left-[23%] text-xs font-bold" style={{ color: tokens.accent1, opacity: node1Opacity }}>+14%</motion.div>
      <motion.div className="absolute top-[30%] left-[48%] text-xs font-bold" style={{ color: tokens.accent1, opacity: node2Opacity }}>+42%</motion.div>
      <motion.div className="absolute top-[10%] left-[73%] text-xs font-bold" style={{ color: tokens.accent1, opacity: node3Opacity }}>+89%</motion.div>
      <motion.div className="absolute top-[-5%] left-[92%] text-xs font-bold bg-[#000] border px-2 py-1" style={{ color: tokens.accent1, borderColor: tokens.accent1, opacity: node4Opacity }}>+312% PEAK</motion.div>
    </div>
  )
}

function Stats() {
  return (
    <section className="border-y relative z-10" style={{ borderColor: tokens.border, backgroundColor: `${tokens.surface}F0` }}>
      <div className="max-w-6xl mx-auto px-6 py-12">
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat, i) => (
            <motion.div key={stat.label} variants={staggerItem} className="flex flex-col border-l pl-4" style={{ borderColor: tokens.border }}>
              <span className="text-xs mb-2 tracking-widest" style={{ color: tokens.textLow }}>{`[ 0${i + 1} ]`} {stat.label}</span>
              <motion.span 
                variants={dataPop}
                className={`${archivoBlack.variable} font-headings text-4xl md:text-5xl tracking-tight`} 
                style={{ color: tokens.accent1 }}
              >
                {stat.value}
              </motion.span>
            </motion.div>
          ))}
        </StaggerContainer>
        
        {/* Integrating the interactive graph below the static stats */}
        <FadeUp delay={0.3}>
          <ScrollInteractiveGraph />
        </FadeUp>
      </div>
    </section>
  )
}

function Features() {
  return (
    <section id="features" className="py-24 relative z-10">
      <div className="max-w-6xl mx-auto px-6">
        <FadeUp>
          <div className="mb-16 border-b pb-8" style={{ borderColor: tokens.border }}>
            <span className="text-xs tracking-widest uppercase mb-4 block" style={{ color: tokens.accent1 }}>// CORE_MODULES</span>
            <h2 className={`${archivoBlack.variable} font-headings text-4xl md:text-5xl uppercase tracking-tight`} style={{ color: tokens.textHigh }}>
              System Capabilities
            </h2>
          </div>
        </FadeUp>
        
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              variants={staggerItem}
              whileHover={{ scale: 0.98, backgroundColor: tokens.surface }}
              className="p-8 border relative group cursor-crosshair"
              style={{ borderColor: tokens.border, backgroundColor: tokens.background }}
            >
              <div className="absolute top-2 right-2 text-[10px]" style={{ color: tokens.textLow }}>{`A-${i}4`}</div>
              <motion.div 
                 className="absolute inset-0 border border-transparent pointer-events-none"
                 whileHover={{ borderColor: tokens.accent1 }}
              />
              <div className="w-12 h-12 mb-6 flex items-center justify-center border" style={{ borderColor: tokens.border, backgroundColor: tokens.surface }}>
                <feature.icon className="h-5 w-5" style={{ color: tokens.accent1 }} strokeWidth={1.5} />
              </div>
              <h3 className="font-bold tracking-wide uppercase mb-3 text-lg" style={{ color: tokens.textHigh }}>{feature.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: tokens.textLow }}>{feature.description}</p>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

function ExperimentTracker() {
  // Kanban board visualization
  const columns = ['BACKLOG', 'RUNNING', 'SIGNIFICANT']
  const cards = [
    { id: 'T-101', col: 1, title: 'Hero Headline Var B', status: 'active', lift: '+12%' },
    { id: 'T-102', col: 1, title: 'Pricing CTA Color', status: 'active', lift: '-2%' },
    { id: 'T-098', col: 2, title: 'Signup Flow Steps', status: 'won', lift: '+45%' },
    { id: 'T-099', col: 0, title: 'Nav Reorder', status: 'pending', lift: '--' },
  ]

  return (
    <section id="tracker" className="py-24 border-y relative z-10 overflow-hidden" style={{ borderColor: tokens.border, backgroundColor: tokens.surface }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          <div className="flex-1 w-full">
            <FadeUp>
              <span className="text-xs tracking-widest uppercase mb-4 block" style={{ color: tokens.accent1 }}>// LIVE_TRACKER</span>
              <h2 className={`${archivoBlack.variable} font-headings text-4xl md:text-5xl uppercase tracking-tight mb-6`} style={{ color: tokens.textHigh }}>
                Experiment Kanban
              </h2>
              <p className="text-lg leading-relaxed mb-8 max-w-xl" style={{ color: tokens.textLow }}>
                Cards snap into place with high magnetic force. When an experiment reaches significance, the system automatically routes traffic to the winner.
              </p>
              
              <div className="space-y-4 text-sm font-medium tracking-wide" style={{ color: tokens.textHigh }}>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5" style={{ color: tokens.accent1 }} />
                  <span>Real-time Bayesian updates</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5" style={{ color: tokens.accent1 }} />
                  <span>Automated traffic reallocation</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5" style={{ color: tokens.accent1 }} />
                  <span>Segment-specific breakdowns</span>
                </div>
              </div>
            </FadeUp>
          </div>

          <div className="flex-1 w-full relative h-[400px]">
            {/* Minimalist Kanban Board */}
            <div className="absolute inset-0 grid grid-cols-3 gap-4">
              {columns.map((colName, colIdx) => (
                <div key={colName} className="flex flex-col border-t border-r border-l border-dashed pt-4 px-2" style={{ borderColor: tokens.border, backgroundColor: tokens.background }}>
                  <div className="text-[10px] tracking-widest mb-4 flex justify-between" style={{ color: tokens.textLow }}>
                    <span>{colName}</span>
                    <span>{cards.filter(c => c.col === colIdx).length}</span>
                  </div>
                  
                  <div className="space-y-3 relative h-full">
                    <AnimatePresence>
                      {cards.filter(c => c.col === colIdx).map((card, i) => (
                        <motion.div
                          key={card.id}
                          layoutId={`card-${card.id}`}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ type: 'spring', stiffness: 500, damping: 25, mass: 0.5, delay: i * 0.1 }}
                          className="p-3 border text-xs"
                          style={{ 
                            borderColor: card.status === 'won' ? tokens.accent1 : tokens.border,
                            backgroundColor: tokens.surface
                          }}
                        >
                          <div className="flex justify-between items-center mb-2">
                            <span style={{ color: tokens.textLow }}>{card.id}</span>
                            {card.status === 'won' && <Zap className="w-3 h-3" style={{ color: tokens.accent1 }} />}
                          </div>
                          <div className="font-bold mb-2 truncate" style={{ color: tokens.textHigh }}>{card.title}</div>
                          <div className="flex justify-between items-end">
                            <div className="w-12 h-1 bg-[#222]">
                               <motion.div 
                                 className="h-full bg-white" 
                                 initial={{ width: 0 }} 
                                 animate={{ width: card.status === 'won' ? '100%' : card.status === 'active' ? '60%' : '0%' }}
                               />
                            </div>
                            <span style={{ color: card.status === 'won' ? tokens.accent1 : tokens.textLow }}>{card.lift}</span>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                    
                    {/* Simulated Particle Blast for winning column */}
                    {colIdx === 2 && (
                       <motion.div 
                         className="absolute inset-0 pointer-events-none"
                         animate={{ opacity: [0, 1, 0] }}
                         transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                       >
                         {Array.from({length: 10}).map((_, j) => (
                            <motion.div 
                              key={j}
                              className="absolute w-1 h-1 bg-[#00FF41]"
                              initial={{ left: '50%', top: '50%', scale: 0 }}
                              animate={{ 
                                left: `${Math.random() * 100}%`, 
                                top: `${Math.random() * 100}%`,
                                scale: [0, 1, 0],
                                opacity: [1, 0]
                              }}
                              transition={{ duration: 1, ease: 'easeOut' }}
                            />
                         ))}
                       </motion.div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  )
}

function Pricing() {
  return (
    <section id="pricing" className="py-24 relative z-10">
      <div className="max-w-6xl mx-auto px-6">
        <FadeUp>
          <div className="mb-16 border-b pb-8 text-center" style={{ borderColor: tokens.border }}>
            <span className="text-xs tracking-widest uppercase mb-4 block" style={{ color: tokens.accent1 }}>// RESOURCE_ALLOCATION</span>
            <h2 className={`${archivoBlack.variable} font-headings text-4xl md:text-5xl uppercase tracking-tight`} style={{ color: tokens.textHigh }}>
              Select Infrastructure
            </h2>
          </div>
        </FadeUp>
        
        <StaggerContainer className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {PRICING.map(tier => (
            <motion.div
              key={tier.name}
              variants={staggerItem}
              whileHover={{ y: -5 }}
              className="p-8 border relative"
              style={{
                borderColor: tier.highlighted ? tokens.accent1 : tokens.border,
                backgroundColor: tokens.surface,
              }}
            >
              {tier.highlighted && (
                <div 
                  className="absolute -top-3 left-6 px-3 py-1 text-[10px] font-bold tracking-widest uppercase"
                  style={{ backgroundColor: tokens.accent1, color: '#000000' }}
                >
                  RECOMMENDED_CONFIG
                </div>
              )}
              <h3 className="font-bold tracking-widest text-lg mb-4 uppercase" style={{ color: tokens.textHigh }}>{tier.name}</h3>
              <div className="flex items-baseline gap-2 mb-4 border-b pb-6" style={{ borderColor: tokens.border }}>
                <span className={`${archivoBlack.variable} font-headings text-5xl`} style={{ color: tokens.textHigh }}>{tier.price}</span>
                <span className="text-xs tracking-widest" style={{ color: tokens.textLow }}>/ {tier.period}</span>
              </div>
              <p className="text-sm mb-8 h-10" style={{ color: tokens.textLow }}>{tier.description}</p>
              
              <ul className="space-y-4 mb-8">
                {tier.features.map(f => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <span className="text-[#00FF41] mt-0.5">{'>'}</span>
                    <span style={{ color: tokens.textHigh }}>{f}</span>
                  </li>
                ))}
              </ul>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full h-12 font-bold tracking-widest uppercase text-xs border flex items-center justify-center gap-2"
                style={tier.highlighted
                  ? { backgroundColor: tokens.accent1, color: '#000000', borderColor: tokens.accent1 }
                  : { backgroundColor: 'transparent', color: tokens.textHigh, borderColor: tokens.border }
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
    <section id="testimonials" className="py-24 border-y relative z-10" style={{ borderColor: tokens.border, backgroundColor: `${tokens.surface}80` }}>
      <div className="max-w-6xl mx-auto px-6">
        <FadeUp>
          <div className="mb-16">
            <span className="text-xs tracking-widest uppercase mb-4 block" style={{ color: tokens.accent1 }}>// USER_TELEMETRY</span>
            <h2 className={`${archivoBlack.variable} font-headings text-3xl md:text-4xl uppercase tracking-tight`} style={{ color: tokens.textHigh }}>
              Network Feedback
            </h2>
          </div>
        </FadeUp>
        
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map(t => (
            <motion.div
              key={t.name}
              variants={staggerItem}
              className="p-6 border flex flex-col justify-between"
              style={{ borderColor: tokens.border, backgroundColor: tokens.background }}
            >
              <p className="text-sm leading-relaxed mb-8" style={{ color: tokens.textHigh }}>{t.text}</p>
              <div className="border-t pt-4 flex justify-between items-end" style={{ borderColor: tokens.border }}>
                <div>
                  <p className="font-bold text-sm tracking-wide mb-1 uppercase" style={{ color: tokens.textHigh }}>{t.name}</p>
                  <p className="text-[10px] tracking-widest" style={{ color: tokens.textLow }}>{t.role}</p>
                </div>
                <div className="flex gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <div key={i} className="w-1.5 h-3 bg-[#00FF41]" />
                  ))}
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
    <section id="faq" className="py-24 relative z-10">
      <div className="max-w-3xl mx-auto px-6">
        <FadeUp>
          <div className="mb-12 border-b pb-6" style={{ borderColor: tokens.border }}>
            <span className="text-xs tracking-widest uppercase mb-4 block" style={{ color: tokens.accent1 }}>// QUERY_SYSTEM</span>
            <h2 className={`${archivoBlack.variable} font-headings text-4xl uppercase tracking-tight`} style={{ color: tokens.textHigh }}>
              Knowledge Base
            </h2>
          </div>
        </FadeUp>
        
        <div className="space-y-2">
          {FAQ_ITEMS.map((item, i) => (
            <FadeUp key={i} delay={i * 0.05}>
              <div className="border" style={{ borderColor: tokens.border, backgroundColor: tokens.surface }}>
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  aria-expanded={openIndex === i}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-bold text-sm tracking-wide uppercase" style={{ color: tokens.textHigh }}>{item.q}</span>
                  <motion.div
                    animate={{ rotate: openIndex === i ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="text-[#00FF41] font-bold text-lg">{openIndex === i ? '-' : '+'}</span>
                  </motion.div>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openIndex === i ? 'auto' : 0, opacity: openIndex === i ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  style={{ overflow: 'hidden' }}
                >
                  <p className="px-6 pb-6 text-sm leading-relaxed" style={{ color: tokens.textLow }}>
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
    <section className="py-24 border-y relative z-10 overflow-hidden" style={{ borderColor: tokens.border, backgroundColor: tokens.background }}>
      {/* Background scanline effect */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00FF41]/5 to-transparent w-full h-[100px]"
        animate={{ top: ['-10%', '110%'] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
      />
      
      <div className="max-w-2xl mx-auto px-6 text-center relative z-10">
        <FadeUp>
          <div className="w-16 h-16 border mx-auto mb-8 flex items-center justify-center bg-black" style={{ borderColor: tokens.accent1 }}>
            <Terminal className="w-6 h-6" style={{ color: tokens.accent1 }} />
          </div>
          <h2 className={`${archivoBlack.variable} font-headings text-4xl mb-4 uppercase`} style={{ color: tokens.textHigh }}>Establish Link</h2>
          <p className="text-sm mb-8 tracking-widest uppercase" style={{ color: tokens.textLow }}>
            Receive system updates and optimization protocols.
          </p>
          
          {status === 'success' ? (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }}
              className="p-4 border inline-block text-sm font-bold tracking-widest" 
              style={{ borderColor: tokens.accent1, color: tokens.accent1 }}
            >
              CONNECTION_ESTABLISHED
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-0 border" style={{ borderColor: tokens.border }}>
              <span className="flex items-center px-4 font-bold" style={{ color: tokens.accent1, backgroundColor: tokens.surface }}>{'>_'}</span>
              <input
                type="email"
                required
                placeholder="ENTER_EMAIL_ADDRESS..."
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="flex-1 h-14 px-4 text-sm bg-black focus:outline-none"
                style={{ color: tokens.textHigh }}
              />
              <motion.button
                type="submit"
                disabled={status === 'loading'}
                whileHover={{ backgroundColor: tokens.textHigh, color: '#000000' }}
                className="h-14 px-8 font-bold text-xs tracking-widest uppercase border-l transition-colors disabled:opacity-50"
                style={{ backgroundColor: tokens.surface, color: tokens.textHigh, borderColor: tokens.border }}
              >
                {status === 'loading' ? 'PROCESSING' : 'EXECUTE'}
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
    PLATFORM: ['Features', 'Integrations', 'SDK Docs', 'Changelog'],
    COMPANY: ['About', 'Careers', 'Blog', 'Contact'],
    LEGAL: ['Privacy', 'Terms', 'Security', 'Status'],
  }

  return (
    <footer className="py-16 relative z-10" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 border-b pb-12" style={{ borderColor: tokens.border }}>
          <div className="md:col-span-1">
            <p className={`${archivoBlack.variable} font-headings text-xl mb-4 tracking-widest uppercase`} style={{ color: tokens.textHigh }}>{PRODUCT_NAME}</p>
            <p className="text-xs tracking-widest leading-relaxed uppercase" style={{ color: tokens.textLow }}>
              Scientific growth. <br />
              Infinite scale.
            </p>
          </div>
          
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <p className="font-bold text-xs mb-6 tracking-widest uppercase" style={{ color: tokens.textHigh }}>{group}</p>
              <ul className="space-y-4">
                {items.map(item => (
                  <li key={item}>
                    <a href="#" className="text-xs hover:text-[#00FF41] transition-colors tracking-wide uppercase" style={{ color: tokens.textLow }}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] tracking-widest uppercase font-bold" style={{ color: tokens.textLow }}>
          <p>
            SYSTEM_TIME: {new Date().getFullYear()} © {PRODUCT_NAME}. ALL_RIGHTS_RESERVED.
          </p>
          <a
            href="/"
            className="px-4 py-2 border hover:bg-white hover:text-black transition-colors"
            style={{ borderColor: tokens.border }}
          >
            {'< RETURN_TO_ROOT'}
          </a>
        </div>
      </div>
    </footer>
  )
}

// ─────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────
export default function GrowthGridPage() {
  return (
    <div className={`${ibmPlexMono.variable} font-body selection:bg-[#00FF41] selection:text-black min-h-screen relative`} style={{ backgroundColor: tokens.background }}>
      <BackgroundGrid />
      <Navbar />
      <StickyMetricsHeader />
      <main>
        <Hero />
        <Stats />
        <Features />
        <ExperimentTracker />
        <Pricing />
        <Testimonials />
        <FAQ />
        <Newsletter />
      </main>
      <Footer />
    </div>
  )
}
