'use client'

/**
 * CODEFLOW: A Spatial Data Narrative Style
 * 
 * Part of the Kinetic Design Protocol.
 * 
 * Key Features:
 * - Z-Axis Scroll Narrative: Content flies toward the screen from the depth.
 * - Velocity-Responsive Matrix Rain: Gutter animations react to scroll speed.
 * - Cyber-Noir Aesthetic: High contrast, neon accents, and data density.
 * - Framer Motion High-Fidelity: useScroll, useTransform, useVelocity, and Springs.
 */

import { motion, useScroll, useTransform, useVelocity, useSpring, useMotionValue } from 'framer-motion'
import { useRef, useState, useEffect, useMemo } from 'react'
import { JetBrains_Mono, Inter } from 'next/font/google'
import { 
  Code2, 
  Cpu, 
  Zap, 
  Layers, 
  Database, 
  Terminal, 
  ShieldCheck, 
  Activity,
  ArrowRight,
  ChevronRight,
  Monitor,
  Command,
  Box,
  Share2
} from 'lucide-react'

// ─────────────────────────────────────────────
// FONTS
// ─────────────────────────────────────────────

// JetBrains Mono for that technical, "in the editor" feel
const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

// Inter for clean, legible UI elements
const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

// ─────────────────────────────────────────────
// DESIGN TOKENS
// ─────────────────────────────────────────────

const tokens = {
  background: '#050505', // Deep Void Black
  surface: '#121212',    // Dark Glass
  primary: '#00F0FF',    // Neon Cyber Blue
  secondary: '#00FF41',  // Matrix Green
  accent: '#BC00FF',     // Pulse Purple
  muted: '#2A2A2A',      // Graphite
  text: '#E0E0E0',       // High-Vis Silver
  border: '#333333',
}

// ─────────────────────────────────────────────
// UTILITIES / HELPERS
// ─────────────────────────────────────────────

/**
 * MatrixGutter Component
 * 
 * Implements the "Velocity-Triggered Matrix Rain" requirement.
 * Uses useVelocity to track scroll speed and increase the opacity/glow 
 * of the falling characters in the gutters.
 */
function MatrixGutter({ side }: { side: 'left' | 'right' }) {
  const { scrollY } = useScroll()
  
  // Track the raw velocity of the scroll
  const scrollVelocity = useVelocity(scrollY)
  const [intensity, setIntensity] = useState(0)

  // Use a spring to smooth out the intensity fluctuations
  const smoothIntensity = useSpring(intensity, { stiffness: 100, damping: 30 })

  useEffect(() => {
    // We listen to velocity changes to update the visual "intensity"
    return scrollVelocity.on('change', (v) => {
      // Normalize velocity: 0 to 2000px/s mapped to 0 to 1
      const normalized = Math.min(Math.abs(v) / 2000, 1)
      setIntensity(normalized)
    })
  }, [scrollVelocity])

  // Random katakana/char set for the matrix effect
  const characters = useMemo(() => 
    Array.from({ length: 50 }).map(() => 
      String.fromCharCode(0x30A0 + Math.floor(Math.random() * 96))
    ), [])

  return (
    <div 
      className={`fixed top-0 bottom-0 w-16 z-20 overflow-hidden hidden lg:block`}
      style={{ 
        [side]: 0, 
        borderRight: side === 'left' ? `1px solid ${tokens.muted}` : 'none',
        borderLeft: side === 'right' ? `1px solid ${tokens.muted}` : 'none',
        backgroundColor: 'rgba(0,0,0,0.8)',
        backdropFilter: 'blur(4px)'
      }}
    >
      <div className="flex flex-col items-center py-4 space-y-1">
        {characters.map((char, i) => (
          <motion.span
            key={i}
            className="text-[10px] font-mono leading-none"
            style={{ 
              color: tokens.secondary,
              // Intensity affects opacity and text shadow
              opacity: 0.1 + intensity * 0.9,
              textShadow: intensity > 0.4 ? `0 0 8px ${tokens.secondary}` : 'none'
            }}
            animate={{
              // Perpetual falling animation
              y: [0, 20],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 1.5 + Math.random() * 3,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5
            }}
          >
            {char}
          </motion.span>
        ))}
      </div>
      
      {/* Velocity Status Indicator at the bottom of gutter */}
      <div className="absolute bottom-4 left-0 right-0 flex flex-col items-center">
        <div className="w-1 h-24 bg-zinc-800 relative overflow-hidden">
            <motion.div 
                className="absolute bottom-0 left-0 right-0 bg-cyan-400"
                style={{ height: useTransform(smoothIntensity, [0, 1], ['0%', '100%']) }}
            />
        </div>
        <span className="text-[8px] font-mono text-zinc-600 mt-2 rotate-90 origin-center whitespace-nowrap">VELOCITY_SYNC</span>
      </div>
    </div>
  )
}

/**
 * ZAxisSection Component
 * 
 * Implements the "Z-Axis scroll narrative".
 * Content starts far away (negative translateZ) and "flies" toward the user (positive translateZ).
 */
function ZAxisSection({ children, index }: { children: React.ReactNode; index: number }) {
  const sectionRef = useRef(null)
  
  // Track scroll progress specifically for this section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  // 1. Translation: From -2000px (deep distance) to 1000px (past the viewer)
  const translateZ = useTransform(scrollYProgress, [0, 0.5, 1], [-2000, 0, 2000])
  
  // 2. Opacity: Fade in early, stay solid, then fade out as it gets too close/fast
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.8, 1], [0, 1, 1, 0])
  
  // 3. Scale: Physical growth as it approaches
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 1, 3])
  
  // 4. Blur: Distance blur and "motion" blur when passing by
  const blurValue = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [15, 0, 0, 30])
  const blur = useTransform(blurValue, (v) => `blur(${v}px)`)

  return (
    <section 
      ref={sectionRef}
      className="h-[150vh] flex items-center justify-center relative perspective-[1200px] overflow-visible pointer-events-none"
    >
      <motion.div
        style={{ 
          translateZ, 
          opacity, 
          scale,
          filter: blur,
          transformStyle: 'preserve-3d'
        }}
        className="w-full max-w-5xl px-8 pointer-events-auto"
      >
        {children}
      </motion.div>
    </section>
  )
}

/**
 * CyberButton Component
 * 
 * A high-contrast, themed button with hover animations.
 */
function CyberButton({ children, primary = true, className = "" }: { children: React.ReactNode, primary?: boolean, className?: string }) {
  return (
    <motion.button
      whileHover={{ 
        scale: 1.02, 
        boxShadow: `0 0 25px ${primary ? tokens.primary + '66' : tokens.accent + '66'}` 
      }}
      whileTap={{ scale: 0.98 }}
      className={`relative px-10 py-5 font-mono font-bold tracking-tighter uppercase transition-all overflow-hidden border-2 ${className}`}
      style={{
        backgroundColor: 'transparent',
        borderColor: primary ? tokens.primary : tokens.accent,
        color: primary ? tokens.primary : tokens.accent,
      }}
    >
      {/* Glitch Overlay on Hover */}
      <motion.div 
        className="absolute inset-0 bg-white/5 -translate-x-full hover:translate-x-full transition-transform duration-500 ease-in-out"
      />
      
      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2" style={{ borderColor: primary ? tokens.primary : tokens.accent }} />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2" style={{ borderColor: primary ? tokens.primary : tokens.accent }} />

      <span className="relative z-10 flex items-center justify-center gap-3">
        {children}
      </span>
    </motion.button>
  )
}

// ─────────────────────────────────────────────
// DATA / CONTENT
// ─────────────────────────────────────────────

const FEATURES = [
  { 
    icon: Box, 
    title: 'Spatial Logic', 
    description: 'Code isn\'t just text anymore. It\'s a geometric construct in a 3D execution grid.' 
  },
  { 
    icon: Activity, 
    title: 'Velocity Core', 
    description: 'Real-time synchronization that adapts its compute cycles to your interaction speed.' 
  },
  { 
    icon: ShieldCheck, 
    title: 'Dark Phase Crypt', 
    description: 'Security protocols that operate in the high-frequency gaps of the data stream.' 
  },
]

// ─────────────────────────────────────────────
// PAGE COMPONENTS
// ─────────────────────────────────────────────

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-10 lg:px-24 h-24 flex items-center justify-between pointer-events-none font-mono">
      {/* Branding */}
      <div className="flex items-center gap-4 pointer-events-auto cursor-pointer group">
        <div className="relative w-10 h-10 flex items-center justify-center">
          <motion.div 
            className="absolute inset-0 border-2 border-cyan-400"
            animate={{ rotate: [0, 90, 180, 270, 360] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
          <Code2 className="w-6 h-6 text-[#00F0FF]" />
        </div>
        <div className="flex flex-col">
            <span className="text-xl font-black tracking-[0.2em] text-[#00F0FF]">CODEFLOW.SYS</span>
            <span className="text-[8px] text-zinc-500 tracking-[0.5em]">SPATIAL_OS_V2.1</span>
        </div>
      </div>

      {/* Navigation */}
      <div className="hidden md:flex items-center gap-10 pointer-events-auto">
        {['System', 'Archive', 'Nodes', 'Uplink'].map(link => (
          <a 
            key={link} 
            href="#" 
            className="text-[10px] tracking-[0.4em] uppercase text-zinc-400 hover:text-[#00F0FF] transition-colors relative group"
          >
            {link}
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#00F0FF] group-hover:w-full transition-all" />
          </a>
        ))}
        <CyberButton className="text-[10px] px-6 py-2">Initialize</CyberButton>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <ZAxisSection index={0}>
      <div className="text-center space-y-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-3 px-4 py-1.5 border border-[#00FF41] bg-[#00FF41]/5 text-[#00FF41] text-[9px] tracking-[0.5em] uppercase font-mono"
        >
          <div className="w-2 h-2 rounded-full bg-[#00FF41] animate-pulse" />
          Neural Link Established // ID: 0xFF82
        </motion.div>
        
        <h1 className="text-7xl md:text-9xl font-black italic tracking-tighter text-white leading-none">
          THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-[#BC00FF]">VOID</span> IS YOUR <br/> COMPILER.
        </h1>
        
        <p className="text-lg md:text-2xl text-zinc-400 max-w-3xl mx-auto font-mono leading-relaxed uppercase tracking-tighter">
          Escape the flat screen. Build logic that lives in the Z-axis. 
          Experience the high-velocity spatial narrative of Codeflow.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-6 pt-12">
          <CyberButton>Access the Kernel <Command size={18} /></CyberButton>
          <CyberButton primary={false}>Watch Node-Stream <Monitor size={18} /></CyberButton>
        </div>
      </div>
    </ZAxisSection>
  )
}

function Features() {
  return (
    <ZAxisSection index={1}>
      <div className="space-y-16">
        <div className="flex items-end justify-between border-b border-zinc-800 pb-8">
            <h2 className="text-4xl md:text-6xl font-black italic text-white uppercase italic">
                System <span className="text-[#BC00FF]">Modules</span>
            </h2>
            <span className="font-mono text-[10px] text-zinc-500 mb-2">0x03_ACTIVE_MODULES</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {FEATURES.map((f, i) => (
            <motion.div 
                key={i}
                whileHover={{ y: -10, borderColor: tokens.accent }}
                className="p-10 border border-zinc-800 bg-[#121212]/50 backdrop-blur-2xl relative group transition-colors"
            >
                {/* Background ID */}
                <div className="absolute top-4 right-4 text-[10px] font-mono text-zinc-800">
                    ID_MOD_0{i+1}
                </div>
                
                <div className="w-14 h-14 flex items-center justify-center border border-zinc-700 mb-8 group-hover:border-[#BC00FF] transition-colors">
                    <f.icon className="text-[#BC00FF]" size={28} />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4 tracking-tighter uppercase italic">{f.title}</h3>
                <p className="text-zinc-400 font-mono text-sm leading-relaxed">{f.description}</p>
                
                <div className="mt-10 flex items-center gap-3 text-[9px] tracking-[0.3em] text-[#00F0FF] uppercase font-bold cursor-pointer hover:gap-5 transition-all">
                    Link Module <ArrowRight size={14} />
                </div>
            </motion.div>
            ))}
        </div>
      </div>
    </ZAxisSection>
  )
}

function UplinkCTA() {
  return (
    <ZAxisSection index={2}>
      <div className="relative p-1 lg:p-2 bg-gradient-to-br from-[#00F0FF] via-[#BC00FF] to-[#00F0FF] bg-[length:200%_200%] animate-gradient-xy">
        <div className="bg-[#050505] p-16 lg:p-24 relative overflow-hidden flex flex-col items-center text-center space-y-10">
            {/* Background Data Flow */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="h-full w-full bg-[repeating-linear-gradient(0deg,transparent,transparent_20px,rgba(0,240,255,0.1)_20px,rgba(0,240,255,0.1)_21px)]" />
            </div>

            <h2 className="text-5xl md:text-8xl font-black italic text-white uppercase leading-none">
                Ready to <br/> <span className="text-[#BC00FF] underline decoration-8">Ascend</span>?
            </h2>
            
            <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl font-mono leading-relaxed">
                Join 50k+ architects building the spatial future. <br/>
                Request your unique beta-uplink today.
            </p>
            
            <div className="pt-10 flex flex-col items-center gap-6">
                <CyberButton primary={false} className="px-16 py-8 text-2xl">
                    Request Uplink <Share2 size={24} />
                </CyberButton>
                <span className="font-mono text-[10px] text-zinc-600 tracking-[0.6em]">EST_LATENCY_20MS</span>
            </div>
        </div>
      </div>
    </ZAxisSection>
  )
}

// ─────────────────────────────────────────────
// MAIN PAGE COMPONENT
// ─────────────────────────────────────────────

export default function CodeflowStylePage() {
  return (
    <div 
      className={`min-h-[600vh] bg-[#050505] text-white selection:bg-[#00F0FF] selection:text-black ${mono.variable} ${sans.variable} font-sans overflow-x-hidden`}
    >
      {/* Background Ambience & Perspective Setup */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Central Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.03)_0%,transparent_70%)]" />
        
        {/* Scanline Effect */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,118,0.03))] z-10 pointer-events-none bg-[length:100%_2px,3px_100%]" />

        {/* Dynamic Grid Background */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{ 
            backgroundImage: `linear-gradient(${tokens.muted} 1px, transparent 1px), linear-gradient(90deg, ${tokens.muted} 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
            maskImage: 'radial-gradient(circle at center, black, transparent 90%)'
          }} 
        />
      </div>

      {/* Kinetic Elements: Gutters */}
      <MatrixGutter side="left" />
      <MatrixGutter side="right" />

      {/* Nav & UI Overlay */}
      <Navbar />

      {/* Scrollable Narrative Content */}
      <main className="relative z-10">
        <Hero />
        <Features />
        <UplinkCTA />
      </main>

      {/* Persistent System Info Bar */}
      <footer className="fixed bottom-6 left-0 right-0 z-50 px-24 flex items-center justify-between font-mono text-[9px] tracking-[0.4em] text-zinc-600 uppercase pointer-events-none">
        <div className="flex items-center gap-6">
            <span>STATUS: NOMINAL</span>
            <span className="text-[#00FF41]">LINK_STABLE</span>
        </div>
        <div className="flex items-center gap-6">
            <span>BITRATE: 12.4 GBPS</span>
            <span>SEC_LAYER: V3_ACTIVE</span>
        </div>
      </footer>

      {/* Global CSS for some custom animations */}
      <style jsx global>{`
        @keyframes gradient-xy {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-xy {
          animation: gradient-xy 15s ease infinite;
        }
      `}</style>
    </div>
  )
}
