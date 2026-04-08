'use client'

/**
 * CYBERPUNK HUD INTERFACE — Kinetic Design Protocol
 * 
 * This page implements a high-fidelity cyberpunk aesthetic following the 
 * "High-Tech, Low-Life" ethos. It features a tactical HUD interface with:
 * - Persistent scanline overlays for CRT simulation.
 * - Velocity-based typographic corruption (glitch) using Framer Motion's useVelocity.
 * - Advanced Framer Motion animations for system "initialization."
 * - Heavy industrial tokens and chamfered structural elements.
 */

import { 
  motion, 
  useReducedMotion, 
  useInView, 
  useScroll, 
  useVelocity, 
  useTransform, 
  useSpring,
  AnimatePresence
} from 'framer-motion'
import { useRef, useState, useEffect, useMemo } from 'react'
import { Orbitron, Share_Tech_Mono, JetBrains_Mono } from 'next/font/google'
import {
  Star, ChevronDown, ArrowRight, Check, Users, Zap, Globe, Shield,
  BookOpen, Layout, Palette, Code2, BarChart, Lock, Terminal, Activity,
  Cpu, HardDrive, Wifi, Radio, Layers
} from 'lucide-react'

// ─────────────────────────────────────────────
// FONTS - Tactical Typography
// ─────────────────────────────────────────────
const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const shareTechMono = Share_Tech_Mono({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-accent',
  display: 'swap',
})

// ─────────────────────────────────────────────
// DESIGN TOKENS - Neon & The Void
// ─────────────────────────────────────────────
const tokens = {
  background: '#050508', // Deep Void
  backgroundAlt: '#0a0a12', // Surface
  foreground: '#e0e0e0', // High-contrast data
  muted: '#1a1a2e',
  mutedForeground: '#6b7280',
  border: '#1a1a2e',
  accent: '#00ff88', // Neon Green
  accentSecondary: '#ff00ff', // Magenta
  accentTertiary: '#00d4ff', // Cyan
  error: '#ff2a2a', // Crimson
  accentForeground: '#050508',
}

const styles = {
  neonGlow: '0 0 10px #00ff88, 0 0 20px #00ff8840',
  neonGlowSm: '0 0 5px #00ff88, 0 0 10px #00ff8830',
  neonGlowLg: '0 0 15px #00ff88, 0 0 30px #00ff8860',
  neonGlowSecondary: '0 0 10px #ff00ff, 0 0 25px #ff00ff60',
  neonGlowTertiary: '0 0 10px #00d4ff, 0 0 25px #00d4ff60',
  glitchShadow: '0 0 15px rgba(0, 255, 136, 0.6)',
  // 45-degree chamfered corners for tactical feel
  chamferPath: 'polygon(0 15px, 15px 0, calc(100% - 15px) 0, 100% 15px, 100% calc(100% - 15px), calc(100% - 15px) 100%, 15px 100%, 0 calc(100% - 15px))',
  chamferPathSm: 'polygon(0 8px, 8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px))',
}

// ─────────────────────────────────────────────
// KINETIC HELPERS - Glitch & Motion
// ─────────────────────────────────────────────

/**
 * GlitchText: Corrupts text content based on scroll velocity.
 * Uses useVelocity to detect fast movements and applies a "corruption" 
 * effect where characters swap with random symbols.
 */
function GlitchText({ text, className, style }: { text: string; className?: string; style?: any }) {
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  
  // Transform velocity into a "glitch intensity" (0 to 1)
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 })
  const glitchIntensity = useTransform(smoothVelocity, [-3000, 0, 3000], [1, 0, 1])
  
  const [displayText, setDisplayText] = useState(text)
  const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?/\\0123456789'

  useEffect(() => {
    return glitchIntensity.onChange((v) => {
      if (v > 0.1) {
        // High velocity: swap characters with symbols
        const corrupted = text.split('').map(char => {
          if (char === ' ') return ' '
          return Math.random() < v ? symbols[Math.floor(Math.random() * symbols.length)] : char
        }).join('')
        setDisplayText(corrupted)
      } else {
        setDisplayText(text)
      }
    })
  }, [glitchIntensity, text])

  return (
    <motion.span 
      className={className} 
      style={{ 
        ...style,
        display: 'inline-block',
        // Slight horizontal jitter during high velocity
        x: useTransform(glitchIntensity, [0, 1], [0, (Math.random() - 0.5) * 10]),
        filter: useTransform(glitchIntensity, [0, 1], ['none', 'hue-rotate(90deg) contrast(150%)'])
      }}
    >
      {displayText}
    </motion.span>
  )
}

/**
 * Scanlines: Persistent horizontal line overlay to simulate CRT/HUD refresh.
 */
function Scanlines() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[60] overflow-hidden">
      {/* Moving scanline pulse */}
      <motion.div 
        animate={{ y: ['-100%', '100%'] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-x-0 h-40 bg-gradient-to-b from-transparent via-accent/5 to-transparent"
      />
      {/* Persistent fine scanlines */}
      <div 
        className="absolute inset-0 opacity-[0.08]" 
        style={{ 
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #000 2px, #000 4px)',
          backgroundSize: '100% 4px'
        }} 
      />
      {/* Vignette & Grain */}
      <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.5)] pointer-events-none" />
    </div>
  )
}

function HUDFrame({ children, className, title = "SYS.LOG", color = tokens.accent }: { children: React.ReactNode; className?: string; title?: string; color?: string }) {
  return (
    <div className={`relative ${className}`} style={{ clipPath: styles.chamferPath }}>
      {/* Main Border */}
      <div className="absolute inset-0 border border-current opacity-20" style={{ color }} />
      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2" style={{ borderColor: color }} />
      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2" style={{ borderColor: color }} />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2" style={{ borderColor: color }} />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2" style={{ borderColor: color }} />
      
      {/* Title Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-current/10 border-b border-current/20" style={{ color }}>
        <span className="font-accent text-[10px] uppercase tracking-[0.2em] font-bold">{title}</span>
        <div className="flex gap-1">
          <div className="w-1.5 h-1.5 bg-current animate-pulse" />
          <div className="w-1.5 h-1.5 bg-current/40" />
        </div>
      </div>
      
      {/* Content Area */}
      <div className="p-6">
        {children}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// DATA - Tactical Intel
// ─────────────────────────────────────────────
const PRODUCT_NAME = 'NEURAL_OS'
const TAGLINE = 'SURVIVE THE INFOCALYPSE'
const DESCRIPTION = 'Next-generation tactical interface for decentralized data streams. Encrypted, resilient, and aggressively optimized for the sprawl.'

const NAV_LINKS = ['UPLINK', 'NODES', 'PRICING', 'TERMINAL']

const STATS = [
  { value: '404TB', label: 'DATA_PULSE' },
  { value: '0.04ms', label: 'LATENCY' },
  { value: '∞', label: 'UPTIME' },
  { value: '1.0.4', label: 'VERSION' },
]

const FEATURES = [
  { icon: Cpu, title: 'Neural Compute', description: 'Real-time adaptive processing for high-velocity data packets.' },
  { icon: Shield, title: 'Pulse Encryption', description: 'Quantum-resistant multi-layered security protocols.' },
  { icon: Wifi, title: 'Sprawl Connect', description: 'Decentralized nodes across every major urban sprawl.' },
  { icon: Layers, title: 'Holo Render', description: 'High-density holographic data visualization.' },
  { icon: Zap, title: 'Flash Sync', description: 'Zero-latency synchronization across global terminal networks.' },
  { icon: Lock, title: 'Ghost Mode', description: 'Invisible operation in hostile network environments.' },
]

// ─────────────────────────────────────────────
// COMPONENTS
// ─────────────────────────────────────────────

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b bg-black/90 backdrop-blur-xl" style={{ borderColor: tokens.border }}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Terminal className="h-6 w-6" style={{ color: tokens.accent }} />
          <GlitchText text={PRODUCT_NAME} className="font-black text-xl uppercase tracking-widest font-heading" style={{ color: tokens.accent }} />
        </div>
        
        <div className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map(link => (
            <a key={link} href="#" className="text-xs font-accent uppercase tracking-[0.3em] hover:text-accent transition-all duration-300 relative group">
              {link}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.05, boxShadow: styles.neonGlow }}
          whileTap={{ scale: 0.95 }}
          className="px-6 h-10 text-[10px] font-accent uppercase tracking-widest border-2 font-bold transform -skew-x-12"
          style={{ borderColor: tokens.accent, color: tokens.accent }}
        >
          <span className="inline-block skew-x-12">INITIALIZE_SESSION</span>
        </motion.button>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section className="min-h-screen pt-32 pb-20 relative overflow-hidden flex flex-col justify-center">
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
        style={{ backgroundImage: `linear-gradient(${tokens.border} 1px, transparent 1px), linear-gradient(90deg, ${tokens.border} 1px, transparent 1px)`, backgroundSize: '50px 50px' }} />
      
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        >
          <div className="inline-flex items-center gap-3 px-4 py-1 mb-8 border border-accent/30 bg-accent/5 rounded-full">
            <Activity className="h-4 w-4 animate-pulse" style={{ color: tokens.accent }} />
            <span className="text-[10px] font-accent uppercase tracking-widest font-bold" style={{ color: tokens.accent }}>SYSTEM_READY // CLEARANCE: LEVEL_4</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black font-heading leading-tight mb-8">
            <GlitchText text={TAGLINE} />
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-xl font-body leading-relaxed border-l-4 pl-6" style={{ borderColor: tokens.accentTertiary }}>
            {DESCRIPTION}
          </p>
          
          <div className="flex flex-wrap gap-6">
            <motion.button
              whileHover={{ x: 10, boxShadow: styles.neonGlow }}
              className="h-16 px-10 bg-accent text-accent-foreground font-accent font-black uppercase tracking-[0.2em] flex items-center gap-4 group"
            >
              UPLINK_NOW <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
            </motion.button>
            <button className="h-16 px-10 border-2 border-accentSecondary text-accentSecondary font-accent font-black uppercase tracking-[0.2em] hover:bg-accentSecondary/10 transition-colors">
              VIEW_SCHEMATICS
            </button>
          </div>
        </motion.div>

        {/* Hero Visual - Tactical HUD Placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="relative aspect-square"
        >
          <HUDFrame title="VISUAL_FEED_01" color={tokens.accentTertiary} className="w-full h-full bg-black/40 backdrop-blur-md">
            <div className="absolute inset-0 flex items-center justify-center">
               {/* Animated HUD Circles */}
               <div className="absolute w-4/5 h-4/5 border border-dashed border-accentTertiary/30 rounded-full animate-[spin_30s_linear_infinite]" />
               <div className="absolute w-3/5 h-3/5 border-2 border-accent/20 rounded-full animate-[spin_20s_linear_infinite_reverse]" />
               <div className="absolute w-2/5 h-2/5 border border-accentSecondary/40 rounded-full animate-pulse" />
               
               {/* Tactical Crosshair */}
               <div className="relative z-10 text-center">
                 <div className="w-16 h-16 border-t-2 border-l-2 border-accent absolute -top-8 -left-8" />
                 <div className="w-16 h-16 border-b-2 border-r-2 border-accent absolute -bottom-8 -right-8" />
                 <span className="font-heading font-black text-4xl" style={{ color: tokens.accent }}>+</span>
               </div>
               
               {/* Data Overlay */}
               <div className="absolute top-10 right-10 text-right space-y-2 font-accent text-[8px] opacity-60">
                 <p>X_COORD: 104.22</p>
                 <p>Y_COORD: 992.10</p>
                 <p>Z_DEPTH: 0.04</p>
               </div>
            </div>
            {/* Asset Placeholder Note */}
            <div className="absolute bottom-4 left-4 text-[8px] font-accent opacity-30 italic">
              // ASSET: HERO_HUD_GEN_AI_v4
            </div>
          </HUDFrame>
        </motion.div>
      </div>
    </section>
  )
}

function Stats() {
  return (
    <section className="py-20 bg-accent/5 border-y border-accent/20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12">
        {STATS.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="text-center"
          >
            <p className="text-4xl md:text-6xl font-black font-heading mb-2" style={{ color: tokens.foreground, textShadow: styles.neonGlowSm }}>{stat.value}</p>
            <p className="text-[10px] font-accent uppercase tracking-[0.4em]" style={{ color: tokens.accentTertiary }}>{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function Features() {
  return (
    <section className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20 flex flex-col md:flex-row justify-between items-end gap-10">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-black font-heading mb-6 uppercase tracking-wider italic">
              <GlitchText text="HARDWARE_OVERRIDE" />
            </h2>
            <p className="text-xl text-muted-foreground font-body leading-relaxed">
              Equip your node with military-grade modules designed to survive the most hostile data storms.
            </p>
          </div>
          <div className="font-accent text-[10px] opacity-40 uppercase tracking-[0.3em]">
            // MODULE_044_B_CLEARANCE
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="p-8 border border-white/5 bg-white/5 backdrop-blur-sm relative group overflow-hidden"
              style={{ clipPath: styles.chamferPathSm }}
            >
              {/* Animated Corner Pulse */}
              <div className="absolute top-0 right-0 w-2 h-2 bg-accent opacity-0 group-hover:opacity-100 transition-opacity animate-ping" />
              
              <div className="mb-8 w-14 h-14 bg-accent/10 flex items-center justify-center transform rotate-12 group-hover:rotate-0 transition-transform duration-500">
                <feature.icon className="h-7 w-7" style={{ color: tokens.accent }} />
              </div>
              
              <h3 className="text-2xl font-black font-heading mb-4 uppercase tracking-wide group-hover:text-accent transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-muted-foreground font-body leading-relaxed mb-6">
                {feature.description}
              </p>
              
              <div className="flex items-center gap-2 text-[10px] font-accent text-accentTertiary opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="w-1 h-1 bg-accentTertiary rounded-full" /> STATUS: OPTIMIZED
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function TerminalSection() {
  const [logs, setLogs] = useState<string[]>([
    'NEURAL_OS v1.0.4 initialization sequence...',
    'Kernel modules loading: OK',
    'Neural link established with node 0xFA42',
    'Firewall status: ACTIVE (QUANTUM_LEVEL)',
    'Entering Sprawl environment...',
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      const newLog = `System ping at ${new Date().toLocaleTimeString()} [LATENCY: ${(Math.random() * 0.1).toFixed(3)}ms]`
      setLogs(prev => [...prev.slice(-4), newLog])
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-32 bg-black overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6">
        <HUDFrame title="COMMAND_TERMINAL" color={tokens.accentSecondary} className="bg-black/60 font-mono">
          <div className="space-y-4 text-sm md:text-base">
            <div className="flex items-center gap-3">
              <span style={{ color: tokens.accentSecondary }}>root@sprawl:~$</span>
              <motion.span 
                animate={{ opacity: [1, 1, 0, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, times: [0, 0.5, 0.5, 1], ease: "linear" }}
                className="w-2 h-5 bg-accentSecondary"
              />
            </div>
            <div className="space-y-2 opacity-80">
              {logs.map((log, i) => (
                <motion.p 
                  key={i} 
                  initial={{ opacity: 0, x: -10 }} 
                  animate={{ opacity: 1, x: 0 }}
                  style={{ color: tokens.accentSecondary }}
                >
                  <span className="opacity-40 mr-3">[{i}]</span> {log}
                </motion.p>
              ))}
            </div>
          </div>
        </HUDFrame>
      </div>
    </section>
  )
}

function Pricing() {
  return (
    <section className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-black font-heading mb-4 uppercase italic">CLEARANCE_TIERS</h2>
          <p className="font-accent text-sm tracking-[0.4em]" style={{ color: tokens.accentTertiary }}>// SELECT YOUR PROTOCOL</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {['FREELANCER', 'CORPORATE', 'LEGEND'].map((tier, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02, rotate: 1 }}
              className={`p-10 border-2 relative overflow-hidden flex flex-col`}
              style={{ 
                borderColor: i === 1 ? tokens.accent : tokens.border,
                backgroundColor: i === 1 ? 'rgba(0, 255, 136, 0.03)' : 'transparent',
                clipPath: styles.chamferPath
              }}
            >
              {i === 1 && (
                <div className="absolute top-0 right-0 px-4 py-1 bg-accent text-accent-foreground text-[8px] font-black uppercase tracking-widest font-accent">
                  RECOMMENDED
                </div>
              )}
              
              <h3 className="text-3xl font-black font-heading mb-6 tracking-wider">{tier}</h3>
              <div className="flex items-baseline gap-2 mb-10">
                <span className="text-5xl font-black font-heading">$</span>
                <span className="text-7xl font-black font-heading">{i === 0 ? '0' : i === 1 ? '29' : '99'}</span>
                <span className="text-xs font-accent opacity-40">/MO</span>
              </div>
              
              <ul className="space-y-6 mb-12 flex-1">
                {[1, 2, 3, 4].map((f) => (
                  <li key={f} className="flex items-center gap-4 text-sm font-body">
                    <Check className="h-4 w-4" style={{ color: tokens.accent }} />
                    <span className="opacity-80 uppercase tracking-wide">Protocol Module_{f}A</span>
                  </li>
                ))}
              </ul>

              <button 
                className={`h-14 font-black font-accent uppercase tracking-widest transition-all duration-300 ${
                  i === 1 ? 'bg-accent text-accent-foreground hover:shadow-[0_0_20px_#00ff88]' : 'border border-white/20 hover:border-accent hover:text-accent'
                }`}
              >
                ACCESS_GRANTED
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="py-20 border-t border-accent/20 bg-black">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="flex items-center gap-4">
          <Terminal className="h-8 w-8" style={{ color: tokens.accent }} />
          <div>
            <p className="font-black font-heading text-2xl uppercase tracking-widest" style={{ color: tokens.accent }}>{PRODUCT_NAME}</p>
            <p className="text-[10px] font-accent opacity-40 uppercase tracking-[0.3em]">Built for the sprawl // 2026.10.14</p>
          </div>
        </div>

        <div className="flex gap-10">
          {['GITHUB', 'MATRIX', 'FEED'].map(l => (
            <a key={l} href="#" className="font-accent text-[10px] font-bold tracking-[0.5em] hover:text-accent transition-colors">{l}</a>
          ))}
        </div>

        <div className="font-accent text-[10px] opacity-40 text-right">
          <p>STATUS: OPERATIONAL</p>
          <p>UPLINK: SECURE</p>
        </div>
      </div>
    </footer>
  )
}

// ─────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────
export default function CyberpunkPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className={`min-h-screen ${orbitron.variable} ${jetbrainsMono.variable} ${shareTechMono.variable} font-body bg-black text-white selection:bg-accent selection:text-accent-foreground`}>
      {/* HUD Kinetic Overlays */}
      <Scanlines />
      
      {/* Static Scanline Overlay (Figma-like) */}
      <div className="fixed inset-0 pointer-events-none z-[55] opacity-[0.03]" 
        style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} 
      />

      <Navbar />
      
      <main className="relative">
        <Hero />
        <Stats />
        <Features />
        <TerminalSection />
        <Pricing />
        
        {/* CTA SECTION - Tactical Final Frame */}
        <section className="py-40 relative flex justify-center items-center">
           <div className="max-w-4xl w-full px-6">
              <HUDFrame title="CRITICAL_ACTION" color={tokens.accent} className="text-center py-20 bg-accent/5 backdrop-blur-xl">
                 <h2 className="text-5xl md:text-7xl font-black font-heading mb-8 uppercase italic">INITIALIZE_CONNECTION</h2>
                 <p className="text-xl mb-12 opacity-60 max-w-xl mx-auto font-body">
                   The data stream waits for no one. Secure your node in the global network before the next pulse.
                 </p>
                 <motion.button
                   whileHover={{ scale: 1.1, boxShadow: styles.neonGlow }}
                   className="h-20 px-16 bg-accent text-accent-foreground font-black font-accent text-2xl uppercase tracking-[0.2em] -skew-x-12"
                 >
                   <span className="inline-block skew-x-12">CONNECT_NOW</span>
                 </motion.button>
                 
                 <div className="mt-12 flex justify-center gap-10 opacity-40">
                    <div className="flex items-center gap-2 text-[10px] font-accent">
                      <Wifi className="h-3 w-3" /> SIGNAL_LOCKED
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-accent">
                      <Cpu className="h-3 w-3" /> SYNC_COMPLETE
                    </div>
                 </div>
              </HUDFrame>
           </div>
        </section>
      </main>

      <Footer />

      {/* Persistent HUD Markers (Floating Decorative Elements) */}
      <div className="fixed bottom-10 left-10 z-[70] pointer-events-none hidden lg:block">
        <div className="p-4 border border-accent/20 bg-black/40 backdrop-blur-sm font-accent text-[8px] space-y-1" style={{ clipPath: styles.chamferPathSm }}>
          <p className="flex justify-between gap-10 text-accentTertiary"><span>NODES:</span> <span>10,242</span></p>
          <p className="flex justify-between gap-10 text-accent"><span>SYS_HEALTH:</span> <span>100%</span></p>
          <div className="w-full h-1 bg-white/5 mt-2 overflow-hidden">
            <motion.div 
              animate={{ x: ['-100%', '100%'] }} 
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="w-1/2 h-full bg-accent" 
            />
          </div>
        </div>
      </div>
    </div>
  )
}
