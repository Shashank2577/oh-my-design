'use client'

/**
 * PAGE TEMPLATE — oh-my-design
 * BotStream Style Implementation
 */

import { motion, useReducedMotion, useInView, useScroll, useTransform, useVelocity, useSpring, useAnimationFrame } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google'
import {
  Mic, Activity, Waves, Volume2, Shield, Settings, Play, ChevronDown, ArrowRight, Check, Sparkles, MessageSquare, Plus,
} from 'lucide-react'

// ─────────────────────────────────────────────
// FONTS
// ─────────────────────────────────────────────
const headingFont = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-heading',
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
  background: '#08090A', // Obsidian
  surface: 'rgba(255, 255, 255, 0.03)', // Frosted Glass
  accent1: '#3B82F6', // Stream Blue
  accent2: '#F43F5E', // Pulse Rose
  border: 'rgba(255, 255, 255, 0.1)',
  textHigh: '#FFFFFF',
  textLow: '#A0A0A0', // Added for contrast matching
}

// ─────────────────────────────────────────────
// MOTION HELPERS & PHYSICS
// ─────────────────────────────────────────────

// Base physics for BotStream
const orbPhysics = { type: 'spring' as const, stiffness: 50, damping: 10, mass: 2 }
const waveformPhysics = { type: 'spring' as const, stiffness: 800, damping: 50 }
const sentimentPhysics = { type: 'spring' as const, stiffness: 100, damping: 40 }

function FadeUp({ children, delay = 0, className }: { children: React.ReactNode; delay?: number, className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-5% 0px' })
  const shouldReduce = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      initial={shouldReduce ? false : { opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ type: 'spring', stiffness: 100, damping: 20, delay }}
      className={className}
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
  hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: sentimentPhysics },
}

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────
const PRODUCT_NAME = 'BotStream'
const TAGLINE = 'The harmonious meeting assistant.'
const DESCRIPTION = 'BotStream listens, analyzes, and orchestrates your meetings in real-time, providing unobtrusive insights and sentiment analysis.'

const NAV_LINKS = ['Features', 'Pricing', 'Testimonials', 'FAQ']

const STATS = [
  { value: '1.2M+', label: 'Meetings Orchestrated' },
  { value: '99.9%', label: 'Transcription Accuracy' },
  { value: '<50ms', label: 'Sentiment Latency' },
  { value: '4.9/5', label: 'User Satisfaction' },
]

const FEATURES = [
  { icon: Waves, title: 'Sentiment Waveform', description: 'Real-time emotion tracking visualized as a fluid wave.' },
  { icon: Activity, title: 'Voice Orbs', description: 'Dynamic avatars that pulse with speech frequency.' },
  { icon: Mic, title: 'Silent Observer', description: 'Unobtrusive background processing with zero interference.' },
  { icon: Volume2, title: 'Audio Proximity', description: 'Focus shifts visually to the dominant speaker.' },
  { icon: MessageSquare, title: 'Action Item Pop', description: 'Auto-captures commitments and pins them instantly.' },
  { icon: Shield, title: 'Enterprise Secure', description: 'End-to-end encrypted audio processing.' },
]

const PRICING = [
  {
    name: 'Observer',
    price: '$0',
    period: 'forever',
    description: 'Basic transcription for individuals.',
    features: ['10 hours/month', 'Standard transcription', 'Text export'],
    cta: 'Get started',
    highlighted: false,
  },
  {
    name: 'Orchestrator',
    price: '$49',
    period: 'per month',
    description: 'Full sentiment analysis and voice orbs.',
    features: ['Unlimited hours', 'Real-time sentiment', 'Action item capture', 'Voice orb visualization'],
    cta: 'Start free trial',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'per year',
    description: 'Dedicated infrastructure for large teams.',
    features: ['Everything in Orchestrator', 'On-premise deployment', 'Custom AI models', 'SLA guarantee'],
    cta: 'Contact sales',
    highlighted: false,
  },
]

const TESTIMONIALS = [
  {
    name: 'Elena Rostova',
    role: 'VP of Product',
    company: 'TechFlow',
    text: 'BotStream feels less like a tool and more like an intuitive co-pilot. The sentiment analysis is eerily accurate.',
    rating: 5,
  },
  {
    name: 'David Chen',
    role: 'Lead Designer',
    company: 'Creative OS',
    text: 'The visual feedback is stunning. It transforms a boring meeting into a living, breathing collaborative space.',
    rating: 5,
  },
  {
    name: 'Sarah Jenkins',
    role: 'Operations Director',
    company: 'GlobalCorp',
    text: 'Action item capture has saved us countless hours. It just works, silently and efficiently in the background.',
    rating: 5,
  },
]

const FAQ_ITEMS = [
  { q: 'How does the sentiment analysis work?', a: 'Our AI models analyze vocal tone, cadence, and word choice in real-time to generate a fluid sentiment score.' },
  { q: 'Is my meeting data private?', a: 'Absolutely. We use end-to-end encryption and do not train our public models on your meeting audio.' },
  { q: 'Does it work with Zoom/Teams/Meet?', a: 'Yes, BotStream seamlessly integrates as a silent participant in all major video conferencing platforms.' },
  { q: 'What is the "Breathing Background"?', a: 'It is a visual metronome for your meeting, pulsing at 12-18 BPM to encourage a calm, focused environment.' },
]

// ─────────────────────────────────────────────
// CUSTOM COMPONENTS (V3 Specific)
// ─────────────────────────────────────────────

// Breathing Orb (Hero)
function BreathingOrb({ scrollYProgress }: { scrollYProgress: any }) {
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.5])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.2])
  
  // Create a continuous breathing effect
  const [breath, setBreath] = useState(1)
  
  useEffect(() => {
    let animationFrame: number;
    let startTime: number | null = null;
    
    // 12-18 BPM roughly equals 1 cycle every 4 seconds
    const cycleDuration = 4000; 

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      
      // Sine wave from 0.95 to 1.05
      const currentBreath = 1 + Math.sin((progress / cycleDuration) * Math.PI * 2) * 0.05;
      setBreath(currentBreath);
      
      animationFrame = requestAnimationFrame(animate);
    }
    
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <motion.div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-96 md:h-96 rounded-full mix-blend-screen pointer-events-none"
      style={{
        scale,
        opacity,
        scaleX: breath,
        scaleY: breath,
        background: `radial-gradient(circle, ${tokens.accent1}40 0%, ${tokens.accent2}10 50%, transparent 70%)`,
        filter: 'blur(30px)'
      }}
      transition={orbPhysics}
    />
  )
}

// Liquid SVG Blobs that split/merge on scroll
function LiquidBlobs() {
  const { scrollY } = useScroll()
  const velocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(velocity, { damping: 50, stiffness: 400 })
  const blobSpread = useTransform(smoothVelocity, [-1000, 0, 1000], [40, 0, 40])
  
  const [time, setTime] = useState(0)
  
  useAnimationFrame((t) => {
    setTime(t / 1000)
  })

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden opacity-30">
      <svg width="100%" height="100%" className="absolute inset-0">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="20" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 30 -10" result="goo" />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
        <g filter="url(#goo)">
          <motion.circle 
            cx="30%" 
            cy="40%" 
            r="150" 
            fill={tokens.accent1} 
            style={{ x: blobSpread, y: Math.sin(time * 0.5) * 50 }}
            className="mix-blend-screen"
          />
          <motion.circle 
            cx="70%" 
            cy="60%" 
            r="100" 
            fill={tokens.accent2} 
            style={{ x: useTransform(blobSpread, v => -v), y: Math.cos(time * 0.7) * 40 }}
            className="mix-blend-screen"
          />
          <motion.circle 
            cx="50%" 
            cy="50%" 
            r="200" 
            fill={`${tokens.accent1}80`} 
            style={{ y: Math.sin(time * 0.3) * 80 }}
            className="mix-blend-screen"
          />
        </g>
      </svg>
    </div>
  )
}

// Velocity-driven ripples
function VelocityRipples() {
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 })
  const yShift = useTransform(smoothVelocity, [-1000, 1000], [-50, 50])
  const opacityShift = useTransform(smoothVelocity, [-1000, 0, 1000], [0.3, 0.05, 0.3])

  return (
    <motion.div 
      className="fixed inset-0 pointer-events-none z-[-2]"
      style={{ y: yShift, opacity: opacityShift }}
    >
      {/* Horizontal grid lines that warp */}
      <div className="absolute inset-0 flex flex-col justify-between py-10">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="w-full h-[1px]" style={{ background: tokens.border }} />
        ))}
      </div>
    </motion.div>
  )
}

// Sentiment Waveform Line
function WaveformLine() {
  const [points, setPoints] = useState('')
  
  useAnimationFrame((t) => {
    const time = t / 1000
    let path = `M 0 50 `
    for (let i = 0; i <= 100; i++) {
      const x = i
      // Create a complex wave using multiple sine functions
      const y = 50 + Math.sin(time * 2 + i * 0.1) * 15 + Math.cos(time * 3 + i * 0.05) * 10
      path += `L ${x} ${y} `
    }
    setPoints(path)
  })

  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full stroke-current fill-none">
      <motion.path 
        d={points} 
        strokeWidth="2" 
        strokeLinecap="round"
        style={{ filter: `drop-shadow(0 0 8px ${tokens.accent1})` }}
      />
    </svg>
  )
}


// ─────────────────────────────────────────────
// PAGE SECTIONS
// ─────────────────────────────────────────────

function Navbar() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-md"
      style={{ borderColor: tokens.border, backgroundColor: `${tokens.background}80` }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <span className={`${headingFont.className} font-bold text-xl tracking-tight`} style={{ color: tokens.textHigh }}>
          {PRODUCT_NAME}
        </span>
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-sm transition-colors hover:text-white"
              style={{ color: tokens.textLow }}
            >
              {link}
            </a>
          ))}
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-5 h-10 rounded-full text-sm font-medium relative overflow-hidden"
          style={{ backgroundColor: tokens.accent1, color: tokens.textHigh }}
          transition={sentimentPhysics}
        >
          <span className="relative z-10">Start Syncing</span>
        </motion.button>
      </div>
    </nav>
  )
}

function Hero() {
  const { scrollYProgress } = useScroll()
  
  return (
    <section className="relative min-h-dvh flex items-center pt-16 overflow-hidden">
      <BreathingOrb scrollYProgress={scrollYProgress} />
      
      <div className="max-w-6xl mx-auto px-6 py-24 w-full relative z-10 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={sentimentPhysics}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-8"
          style={{ borderColor: tokens.border, backgroundColor: tokens.surface }}
        >
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: tokens.accent2 }} />
          <span className={`${monoFont.className} text-xs tracking-wider`} style={{ color: tokens.textLow }}>
            LIVE SENTIMENT ACTIVE
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...sentimentPhysics, delay: 0.1 }}
          className={`${headingFont.className} text-6xl md:text-8xl font-bold tracking-tighter mb-6 leading-tight`}
          style={{ color: tokens.textHigh }}
        >
          Meetings that <br/>
          <span className="italic font-light" style={{ color: tokens.accent1 }}>breathe</span> with you.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...sentimentPhysics, delay: 0.2 }}
          className="text-lg md:text-xl mb-10 max-w-2xl leading-relaxed mx-auto"
          style={{ color: tokens.textLow }}
        >
          {DESCRIPTION}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...sentimentPhysics, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="h-14 px-8 rounded-full font-medium flex items-center gap-2"
            style={{ backgroundColor: tokens.textHigh, color: tokens.background }}
          >
            Connect Assistant <ArrowRight className="h-4 w-4" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="h-14 px-8 rounded-full font-medium border flex items-center gap-2 backdrop-blur-sm"
            style={{ borderColor: tokens.border, color: tokens.textHigh, backgroundColor: tokens.surface }}
          >
            <Play className="h-4 w-4 fill-current" /> Watch Demo
          </motion.button>
        </motion.div>
        
        {/* Abstract Audio Visualizer Mockup */}
        <FadeUp delay={0.5} className="w-full max-w-4xl mt-20 relative">
           <div className="w-full h-48 md:h-64 rounded-2xl border flex items-center justify-center overflow-hidden relative"
                style={{ borderColor: tokens.border, backgroundColor: tokens.surface }}>
             <div className="absolute inset-0" style={{ color: tokens.accent1 }}>
                <WaveformLine />
             </div>
             
             {/* Floating Voice Orbs */}
             <motion.div 
               animate={{ y: [0, -10, 0], scale: [1, 1.1, 1] }} 
               transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
               className="absolute top-1/4 left-1/4 w-12 h-12 rounded-full mix-blend-screen blur-md"
               style={{ backgroundColor: tokens.accent2 }}
             />
             <motion.div 
               animate={{ y: [0, 15, 0], scale: [1, 1.2, 1] }} 
               transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
               className="absolute bottom-1/3 right-1/4 w-16 h-16 rounded-full mix-blend-screen blur-md"
               style={{ backgroundColor: tokens.accent1 }}
             />
           </div>
        </FadeUp>
      </div>
    </section>
  )
}

function Stats() {
  return (
    <section className="border-y py-16" style={{ borderColor: tokens.border, backgroundColor: `${tokens.background}80` }}>
      <div className="max-w-6xl mx-auto px-6">
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/5">
          {STATS.map((stat, i) => (
            <motion.div key={stat.label} variants={staggerItem} className={`text-center ${i !== 0 ? 'pl-8' : ''}`}>
              <p className={`${monoFont.className} text-4xl font-bold mb-2`} style={{ color: tokens.accent1 }}>{stat.value}</p>
              <p className="text-sm tracking-wide" style={{ color: tokens.textLow }}>{stat.label}</p>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

function Features() {
  return (
    <section id="features" className="py-32 relative">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <FadeUp>
          <div className="mb-20">
            <h2 className={`${headingFont.className} text-4xl md:text-5xl font-bold mb-6`} style={{ color: tokens.textHigh }}>
              Silent orchestration.
            </h2>
            <p className="text-xl max-w-2xl" style={{ color: tokens.textLow }}>
              Advanced machine learning models process audio streams on the edge, providing instant visual feedback without breaking the flow of conversation.
            </p>
          </div>
        </FadeUp>
        
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              variants={staggerItem}
              whileHover={{ scale: 1.02, backgroundColor: `rgba(255,255,255,0.05)` }}
              transition={sentimentPhysics}
              className="p-8 rounded-2xl border backdrop-blur-sm group"
              style={{ borderColor: tokens.border, backgroundColor: tokens.surface }}
            >
              <div className="w-12 h-12 rounded-full mb-6 flex items-center justify-center transition-colors"
                   style={{ backgroundColor: `${tokens.accent1}20` }}>
                <feature.icon className="h-6 w-6" style={{ color: tokens.accent1 }} strokeWidth={1.5} />
              </div>
              <h3 className={`${headingFont.className} text-xl font-semibold mb-3`} style={{ color: tokens.textHigh }}>{feature.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: tokens.textLow }}>{feature.description}</p>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

function ProductDetail() {
  return (
    <section className="py-32 border-y relative overflow-hidden" style={{ borderColor: tokens.border, backgroundColor: `${tokens.background}80` }}>
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #3B82F6 0%, transparent 50%)' }} />
      <div className="max-w-5xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-16">
        <div className="flex-1">
          <FadeUp>
            <div className="inline-flex items-center gap-2 mb-6">
              <Sparkles className="h-5 w-5" style={{ color: tokens.accent2 }} />
              <span className={`${monoFont.className} text-sm uppercase tracking-widest`} style={{ color: tokens.accent2 }}>Live Capture</span>
            </div>
            <h2 className={`${headingFont.className} text-4xl md:text-5xl font-bold mb-6`} style={{ color: tokens.textHigh }}>
              Action Item Pop
            </h2>
            <div className="space-y-6 text-lg leading-relaxed" style={{ color: tokens.textLow }}>
              <p>
                As your team discusses next steps, BotStream's NLP engine detects commitments and automatically generates action items.
              </p>
              <p>
                These items "pop" into a side-panel, allowing participants to instantly review and assign them without ever switching tabs.
              </p>
            </div>
          </FadeUp>
        </div>
        
        {/* Interactive Mockup */}
        <div className="flex-1 w-full">
          <FadeUp delay={0.2}>
            <div className="p-6 rounded-2xl border flex flex-col gap-4" style={{ borderColor: tokens.border, backgroundColor: tokens.surface }}>
              <div className="flex items-center justify-between pb-4 border-b" style={{ borderColor: tokens.border }}>
                <span className={`${monoFont.className} text-sm text-white`}>Action Items (3)</span>
                <Plus className="h-4 w-4" style={{ color: tokens.textLow }} />
              </div>
              
              <StaggerContainer className="flex flex-col gap-3">
                {[
                  "Draft Q3 marketing copy",
                  "Review server architecture",
                  "Schedule follow-up with client"
                ].map((item, idx) => (
                   <motion.div 
                     key={idx} 
                     variants={staggerItem}
                     className="p-4 rounded-xl border flex gap-3 items-start"
                     style={{ borderColor: tokens.border, backgroundColor: `${tokens.background}` }}
                   >
                     <div className="w-5 h-5 rounded border mt-0.5 flex-shrink-0" style={{ borderColor: tokens.textLow }} />
                     <p className="text-sm" style={{ color: tokens.textHigh }}>{item}</p>
                   </motion.div>
                ))}
              </StaggerContainer>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}

function Pricing() {
  return (
    <section id="pricing" className="py-32 relative">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <FadeUp>
          <div className="text-center mb-20">
            <h2 className={`${headingFont.className} text-4xl md:text-5xl font-bold mb-6`} style={{ color: tokens.textHigh }}>
              Clear pricing. <br/> Zero friction.
            </h2>
          </div>
        </FadeUp>
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PRICING.map((tier, i) => (
            <motion.div
              key={tier.name}
              variants={staggerItem}
              whileHover={{ y: -8 }}
              transition={sentimentPhysics}
              className="p-8 rounded-3xl border relative flex flex-col"
              style={{
                borderColor: tier.highlighted ? tokens.accent1 : tokens.border,
                backgroundColor: tier.highlighted ? `${tokens.accent1}0a` : tokens.surface,
              }}
            >
              {tier.highlighted && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 rounded-full text-xs font-bold tracking-wider uppercase"
                     style={{ backgroundColor: tokens.accent1, color: '#fff' }}>
                  Recommended
                </div>
              )}
              <h3 className={`${headingFont.className} text-2xl font-bold mb-2`} style={{ color: tokens.textHigh }}>{tier.name}</h3>
              <p className="text-sm mb-6 h-10" style={{ color: tokens.textLow }}>{tier.description}</p>
              
              <div className="flex items-baseline gap-1 mb-8 pb-8 border-b" style={{ borderColor: tokens.border }}>
                <span className={`${monoFont.className} text-5xl font-bold tracking-tight`} style={{ color: tokens.textHigh }}>{tier.price}</span>
                <span className="text-sm" style={{ color: tokens.textLow }}>/ {tier.period}</span>
              </div>
              
              <ul className="space-y-4 mb-8 flex-1">
                {tier.features.map(f => (
                  <li key={f} className="flex items-center gap-3 text-sm">
                    <Check className="h-5 w-5 flex-shrink-0" style={{ color: tokens.accent1 }} />
                    <span style={{ color: tokens.textHigh }}>{f}</span>
                  </li>
                ))}
              </ul>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full h-14 rounded-full font-medium text-sm transition-colors"
                style={tier.highlighted
                  ? { backgroundColor: tokens.accent1, color: '#fff' }
                  : { backgroundColor: 'transparent', color: tokens.textHigh, border: `1px solid ${tokens.border}` }
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
    <section id="testimonials" className="py-32 border-y relative overflow-hidden" style={{ borderColor: tokens.border, backgroundColor: `${tokens.background}80` }}>
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <FadeUp>
          <div className="mb-20">
            <h2 className={`${headingFont.className} text-4xl md:text-5xl font-bold`} style={{ color: tokens.textHigh }}>
              Trusted by<br/>visionary teams.
            </h2>
          </div>
        </FadeUp>
        
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map(t => (
            <motion.div
              key={t.name}
              variants={staggerItem}
              className="p-8 rounded-2xl border flex flex-col justify-between"
              style={{ borderColor: tokens.border, backgroundColor: tokens.surface }}
            >
              <p className="text-lg leading-relaxed mb-8" style={{ color: tokens.textHigh }}>"{t.text}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border" style={{ borderColor: tokens.border, backgroundColor: tokens.background }} />
                <div>
                  <p className="font-semibold text-sm" style={{ color: tokens.textHigh }}>{t.name}</p>
                  <p className="text-xs mt-1" style={{ color: tokens.textLow }}>{t.role} at {t.company}</p>
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
    <section id="faq" className="py-32 relative">
      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <FadeUp>
          <div className="mb-16">
            <h2 className={`${headingFont.className} text-4xl md:text-5xl font-bold mb-4`} style={{ color: tokens.textHigh }}>FAQ</h2>
          </div>
        </FadeUp>
        
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, i) => (
            <FadeUp key={i} delay={i * 0.1}>
              <div className="border rounded-2xl overflow-hidden backdrop-blur-sm" style={{ borderColor: tokens.border, backgroundColor: tokens.surface }}>
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  aria-expanded={openIndex === i}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                >
                  <span className="font-medium text-lg" style={{ color: tokens.textHigh }}>{item.q}</span>
                  <motion.div
                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                    transition={sentimentPhysics}
                    className="flex-shrink-0 ml-4 w-8 h-8 rounded-full flex items-center justify-center border"
                    style={{ borderColor: tokens.border }}
                  >
                    <ChevronDown className="h-4 w-4" style={{ color: tokens.textHigh }} />
                  </motion.div>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openIndex === i ? 'auto' : 0, opacity: openIndex === i ? 1 : 0 }}
                  transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                  style={{ overflow: 'hidden' }}
                >
                  <p className="px-6 pb-6 text-base leading-relaxed" style={{ color: tokens.textLow }}>
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
    setTimeout(() => setStatus('success'), 1500)
  }

  return (
    <section className="py-32 border-y relative overflow-hidden" style={{ borderColor: tokens.border, backgroundColor: tokens.background }}>
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-64 blur-[100px] opacity-20 pointer-events-none rounded-full" style={{ backgroundColor: tokens.accent1 }} />
      
      <div className="max-w-xl mx-auto px-6 text-center relative z-10">
        <FadeUp>
          <h2 className={`${headingFont.className} text-3xl md:text-4xl font-bold mb-4`} style={{ color: tokens.textHigh }}>
            Join the beta ring.
          </h2>
          <p className="text-lg mb-10" style={{ color: tokens.textLow }}>
            Get early access to new AI models and features.
          </p>
          
          {status === 'success' ? (
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              className="p-4 rounded-full border inline-flex items-center gap-2 px-6"
              style={{ borderColor: tokens.accent1, backgroundColor: `${tokens.accent1}10` }}
            >
              <Check className="w-5 h-5" style={{ color: tokens.accent1 }} />
              <span className="font-medium" style={{ color: tokens.accent1 }}>Transmission confirmed.</span>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="relative max-w-md mx-auto flex items-center">
              <input
                type="email"
                required
                placeholder="Enter your email..."
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full h-14 pl-6 pr-32 rounded-full border text-base focus:outline-none transition-colors"
                style={{ 
                  borderColor: tokens.border, 
                  backgroundColor: tokens.surface, 
                  color: tokens.textHigh 
                }}
              />
              <motion.button
                type="submit"
                disabled={status === 'loading'}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="absolute right-1 top-1 bottom-1 px-6 rounded-full font-medium text-sm disabled:opacity-50"
                style={{ backgroundColor: tokens.textHigh, color: tokens.background }}
              >
                {status === 'loading' ? 'Sending...' : 'Subscribe'}
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
    Platform: ['Features', 'Integrations', 'Pricing', 'Changelog'],
    Resources: ['Documentation', 'API Reference', 'Blog', 'Community'],
    Company: ['About', 'Careers', 'Contact', 'Press'],
    Legal: ['Privacy', 'Terms', 'Security', 'Cookies'],
  }

  return (
    <footer className="py-20 relative z-10" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-12 mb-16">
          <div className="col-span-2">
            <p className={`${headingFont.className} font-bold text-2xl mb-4`} style={{ color: tokens.textHigh }}>{PRODUCT_NAME}</p>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: tokens.textLow }}>
              Harmonizing human conversation with artificial intelligence.
            </p>
          </div>
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <p className="font-semibold text-sm mb-6 uppercase tracking-wider" style={{ color: tokens.textHigh }}>{group}</p>
              <ul className="space-y-4">
                {items.map(item => (
                  <li key={item}>
                    <a href="#" className="text-sm hover:text-white transition-colors" style={{ color: tokens.textLow }}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t" style={{ borderColor: tokens.border }}>
          <p className="text-sm" style={{ color: tokens.textLow }}>
            © {new Date().getFullYear()} {PRODUCT_NAME}. All rights reserved.
          </p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
             <div className="w-2 h-2 rounded-full" style={{ backgroundColor: tokens.accent1 }} />
             <span className={`${monoFont.className} text-xs uppercase`} style={{ color: tokens.textLow }}>Systems Operational</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ─────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────
export default function BotStreamPage() {
  return (
    <div className={`${bodyFont.variable} ${headingFont.variable} ${monoFont.variable} font-sans min-h-screen relative`} style={{ backgroundColor: tokens.background }}>
      <LiquidBlobs />
      <VelocityRipples />
      
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
