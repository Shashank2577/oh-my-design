'use client'

/**
 * TENSOR-TRACK: Industrial Neural Processing
 * A Kinetic Design Protocol Implementation
 * 
 * Features:
 * - Scroll-coupled SVG cables that 'plug in' (pathLength)
 * - 3D Dashboard Tilt responsive to scroll velocity
 * - LED Status indicators for system health
 * - High-fidelity Framer Motion animations
 */

import { 
  motion, 
  useScroll, 
  useTransform, 
  useInView, 
  useSpring, 
  AnimatePresence, 
  useVelocity 
} from 'framer-motion'
import { useRef, useState, useEffect, useMemo } from 'react'
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import {
  Activity, BarChart3, Database, Workflow, Cpu, Zap,
  Layers, ArrowRight, ChevronDown, Command, Terminal,
  Cpu as GpuIcon, Globe, ShieldAlert, Radio
} from 'lucide-react'

// --- FONTS ---
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

// --- DESIGN TOKENS (LED STATUS PALETTE) ---
const tokens = {
  background: '#090A0C', // Deep industrial void
  surface: '#12141A',    // Elevated rack-mount surface
  accent1: '#FF4D4D',    // Status: Critical (Red LED)
  accent2: '#00F0FF',    // Status: Active (Cyan LED)
  accent3: '#32FF7E',    // Status: Success (Green LED)
  metric: '#E5E7EB',     // Standard readout
  border: 'rgba(255, 77, 77, 0.2)', // Machined edge
  textHigh: '#F9FAFB',
  textLow: '#9CA3AF'
}

// --- IMAGES (GENERATED VIA G TOOL) ---
const IMAGES = {
  hero: '/styles/tensor-track/images/generated-1775619011307.png',
  features: '/styles/tensor-track/images/generated-1775619035557.png',
  cta: '/styles/tensor-track/images/generated-1775619065048.png'
}

// --- COMPONENTS ---

/**
 * Cable: SVG path that animates its pathLength based on section scroll progress.
 * Simulates data cables plugging into hardware modules.
 */
function Cable({ scrollProgress, d, color = tokens.accent1 }: { scrollProgress: any; d: string; color?: string }) {
  const pathLength = useSpring(scrollProgress, { stiffness: 100, damping: 30 })
  
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ overflow: 'visible' }}>
      <motion.path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeDasharray="0 1"
        style={{ pathLength, opacity: 0.3 }}
      />
      <motion.circle
        style={{ offsetPath: `path("${d}")`, offsetDistance: useTransform(pathLength as any, [0, 1], ["0%", "100%"]) } as any}
        r="4"
        fill={color}
        className="shadow-lg shadow-red-500/50"
      />
    </svg>
  )
}

/**
 * LEDIndicator: A pulsing light simulating hardware status.
 */
function LEDIndicator({ color = tokens.accent2, size = 8, active = true }: { color?: string; size?: number; active?: boolean }) {
  return (
    <motion.div
      animate={active ? { 
        boxShadow: [`0 0 ${size}px ${color}`, `0 0 ${size * 3}px ${color}`, `0 0 ${size}px ${color}`],
        opacity: [0.7, 1, 0.7]
      } : { opacity: 0.3 }}
      transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
      style={{ 
        width: size, 
        height: size, 
        borderRadius: '50%', 
        backgroundColor: color,
        display: 'inline-block'
      }}
    />
  )
}

/**
 * TiltCard: A component that pitches forward/backward based on scroll velocity.
 * Implements the 3D Dashboard Tilt requirement.
 */
function TiltCard({ children, velocity }: { children: React.ReactNode; velocity: any }) {
  const rotateX = useTransform(velocity, [-2000, 2000], [15, -15])
  const smoothRotateX = useSpring(rotateX, { stiffness: 100, damping: 30 })
  
  return (
    <motion.div
      style={{ 
        perspective: 1000,
        rotateX: smoothRotateX
      }}
      className="w-full"
    >
      {children}
    </motion.div>
  )
}

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-md" style={{ borderColor: tokens.border, backgroundColor: `${tokens.background}CC` }}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Activity className="h-5 w-5" style={{ color: tokens.accent1 }} />
          <span className={`font-bold text-lg tracking-tight ${spaceGrotesk.className}`} style={{ color: tokens.textHigh }}>
            TensorTrack<span className="text-[10px] ml-1 opacity-50 font-mono">v4.2.0</span>
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {['Telemetry', 'Clusters', 'Lineage', 'Archive'].map(link => (
            <a key={link} href={`#${link.toLowerCase()}`} className={`text-xs uppercase tracking-widest transition-colors hover:text-white ${jetbrainsMono.className}`} style={{ color: tokens.textLow }}>
              {link}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 rounded bg-black/40 border border-white/5">
            <LEDIndicator color={tokens.accent3} size={6} />
            <span className={`text-[10px] ${jetbrainsMono.className}`} style={{ color: tokens.accent3 }}>CORE_SYNC_OK</span>
          </div>
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: tokens.textHigh, color: tokens.background }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 h-9 rounded text-xs font-bold flex items-center gap-2 uppercase tracking-wider ${spaceGrotesk.className} transition-colors`}
            style={{ border: `1px solid ${tokens.accent1}`, color: tokens.accent1 }}
          >
            Terminal <Command className="w-3 h-3" />
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
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section ref={containerRef} className="min-h-screen flex items-center pt-24 pb-16 overflow-hidden relative" style={{ backgroundColor: tokens.background }}>
      {/* Background Image with Industrial Neural Processing theme */}
      <motion.div 
        style={{ y, opacity }}
        className="absolute inset-0 z-0 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background to-background z-10" style={{ background: `linear-gradient(to bottom, transparent, ${tokens.background} 90%)` }} />
        <img 
          src={IMAGES.hero} 
          alt="Industrial Neural Core" 
          className="w-full h-full object-cover opacity-40 grayscale hover:grayscale-0 transition-all duration-1000"
        />
        {/* Scanning Line */}
        <motion.div 
          animate={{ y: ["0%", "100%"] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 right-0 h-[1px] bg-red-500/50 z-20 shadow-[0_0_15px_rgba(255,77,77,0.5)]"
        />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className={`inline-flex items-center gap-2 px-3 py-1 mb-8 rounded border border-white/10 bg-white/5 ${jetbrainsMono.className}`}>
              <Radio className="w-3 h-3 text-red-500 animate-pulse" />
              <span className="text-[10px] tracking-tighter uppercase" style={{ color: tokens.textLow }}>Uplink established // Protocol: 0x88FF</span>
            </div>
            
            <h1 className={`text-7xl md:text-9xl font-black tracking-tighter leading-[0.85] mb-8 ${spaceGrotesk.className}`} style={{ color: tokens.textHigh }}>
              TENSOR<br />
              <span style={{ color: tokens.accent1 }}>TRACK.</span>
            </h1>

            <p className={`text-lg md:text-xl mb-10 max-w-xl leading-relaxed ${inter.className}`} style={{ color: tokens.textLow }}>
              High-frequency neural telemetry for distributed clusters. 
              <span className="block mt-4 text-sm opacity-60 font-mono tracking-tight uppercase">
                // Throughput: 14.8 PB/day <br />
                // Latency: 0.12ms RMS <br />
                // Status: Operational
              </span>
            </p>

            <div className="flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: `0 0 20px ${tokens.accent1}44` }}
                whileTap={{ scale: 0.98 }}
                className={`h-14 px-8 rounded font-black flex items-center justify-center gap-3 text-lg uppercase tracking-tighter ${spaceGrotesk.className}`}
                style={{ backgroundColor: tokens.accent1, color: tokens.background }}
              >
                Initalize System <Zap className="w-5 h-5 fill-current" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02, backgroundColor: 'white', color: 'black' }}
                whileTap={{ scale: 0.98 }}
                className={`h-14 px-8 rounded font-bold border flex items-center justify-center text-lg uppercase tracking-tighter ${spaceGrotesk.className}`}
                style={{ borderColor: tokens.border, color: tokens.textHigh }}
              >
                Documentation
              </motion.button>
            </div>
          </motion.div>

          <div className="relative">
             {/* 3D Dashboard Mockup */}
             <motion.div
               initial={{ opacity: 0, rotateY: 20, scale: 0.8 }}
               animate={{ opacity: 1, rotateY: 0, scale: 1 }}
               transition={{ duration: 1.2, delay: 0.2 }}
               className="relative z-10 p-6 rounded border border-white/10 bg-black/60 backdrop-blur-xl shadow-2xl"
             >
               <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
                 <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50" />
                 </div>
                 <div className={`text-[10px] uppercase tracking-widest ${jetbrainsMono.className}`} style={{ color: tokens.textLow }}>Terminal_v4.log</div>
               </div>

               <div className={`space-y-3 font-mono text-[11px] leading-none ${jetbrainsMono.className}`}>
                 <div className="flex gap-4"><span className="text-blue-500">[SYS]</span> <span>Kernel initialized...</span></div>
                 <div className="flex gap-4"><span className="text-green-500">[OK ]</span> <span>GPU_CLUSTER_01: ONLINE (8x H100)</span></div>
                 <div className="flex gap-4"><span className="text-yellow-500">[WRN]</span> <span>Spike detected at node 0xFA42</span></div>
                 <div className="flex gap-4"><span className="text-red-500">[ERR]</span> <span>Protocol mismatch at 0x88: Retrying...</span></div>
                 <div className="flex gap-4"><span className="text-cyan-500">[LOG]</span> <span>Epoch 42 complete. Loss: 0.0024</span></div>
                 <motion.div 
                   animate={{ opacity: [1, 0, 1] }}
                   transition={{ repeat: Infinity, duration: 0.8 }}
                   className="w-2 h-4 bg-red-500"
                 />
               </div>
             </motion.div>
             {/* Decorative cable shadow */}
             <div className="absolute -inset-4 bg-red-500/5 blur-3xl rounded-full" />
          </div>
        </div>
      </div>
    </section>
  )
}

function StatsBoard() {
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)

  return (
    <section className="py-24 relative overflow-hidden" style={{ backgroundColor: tokens.surface }}>
       <div className="max-w-7xl mx-auto px-6 relative z-10">
          <TiltCard velocity={scrollVelocity}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1">
              {[
                { label: 'Compute Ingest', val: '84.2', unit: 'TB/s', status: tokens.accent2, trend: '+12%' },
                { label: 'Neural Density', val: '1.2M', unit: 'OPS', status: tokens.accent3, trend: 'NOMINAL' },
                { label: 'Cluster Load', val: '98.4', unit: '%', status: tokens.accent1, trend: 'HIGH' },
                { label: 'Sync Latency', val: '0.04', unit: 'ms', status: tokens.accent2, trend: '-2ms' }
              ].map((stat, i) => (
                <div key={i} className="p-8 bg-black/40 border border-white/5 flex flex-col gap-6 group hover:bg-black/60 transition-all">
                  <div className="flex justify-between items-start">
                    <div className={`text-[10px] uppercase tracking-[0.2em] ${jetbrainsMono.className}`} style={{ color: tokens.textLow }}>
                      {stat.label}
                    </div>
                    <LEDIndicator color={stat.status} />
                  </div>
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className={`text-4xl font-black ${spaceGrotesk.className}`} style={{ color: tokens.textHigh }}>{stat.val}</span>
                      <span className={`text-xs ${jetbrainsMono.className}`} style={{ color: tokens.textLow }}>{stat.unit}</span>
                    </div>
                    <div className={`text-[10px] mt-2 font-mono ${stat.status === tokens.accent1 ? 'text-red-500' : 'text-cyan-500'}`}>
                      STATUS: {stat.trend}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TiltCard>
       </div>
    </section>
  )
}

function FeatureGrid() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  // Data cable paths connecting the grid
  const cables = [
    "M 0 100 Q 200 150 400 100 T 800 120",
    "M 1200 300 Q 1000 350 800 300 T 400 320",
    "M 200 0 L 200 800"
  ]

  return (
    <section ref={sectionRef} className="py-32 relative overflow-hidden" style={{ backgroundColor: tokens.background }}>
      {/* Scroll-coupled cables */}
      <Cable scrollProgress={scrollYProgress} d={cables[0]} color={tokens.accent1} />
      <Cable scrollProgress={scrollYProgress} d={cables[1]} color={tokens.accent2} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className={`text-5xl md:text-7xl font-black tracking-tighter mb-8 uppercase leading-[0.9] ${spaceGrotesk.className}`} style={{ color: tokens.textHigh }}>
                HARDWARE<br />
                <span style={{ color: tokens.accent2 }}>ACCELERATED</span><br />
                TELEMETRY.
              </h2>
              <p className={`text-lg mb-12 max-w-lg leading-relaxed ${inter.className}`} style={{ color: tokens.textLow }}>
                Our ingestion engine is written in Rust and CUDA, bypassing standard kernel bottlenecks 
                to provide true sub-millisecond visibility into your largest training runs.
              </p>
              
              <div className="space-y-6">
                {[
                  { icon: GpuIcon, text: "Zero-copy GPU direct memory access" },
                  { icon: ShieldAlert, text: "Real-time deadlock & spike detection" },
                  { icon: Globe, text: "Distributed multi-region cluster sync" }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4 group"
                  >
                    <div className="p-2 rounded bg-white/5 border border-white/10 group-hover:border-red-500/50 transition-colors">
                      <item.icon className="w-4 h-4" style={{ color: tokens.accent1 }} />
                    </div>
                    <span className={`text-xs uppercase tracking-widest ${jetbrainsMono.className}`} style={{ color: tokens.textHigh }}>{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="lg:w-1/2 relative">
             <motion.div
               whileHover={{ scale: 1.02 }}
               className="rounded border border-white/10 overflow-hidden bg-white/5 p-2"
             >
                <img 
                  src={IMAGES.features} 
                  alt="Industrial Telemetry Stream" 
                  className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700"
                />
             </motion.div>
             {/* Decorative element */}
             <div className="absolute -top-10 -right-10 w-40 h-40 border-t border-r border-red-500/30" />
             <div className="absolute -bottom-10 -left-10 w-40 h-40 border-b border-l border-cyan-500/30" />
          </div>
        </div>
      </div>
    </section>
  )
}

function ArchitectureSection() {
  return (
    <section className="py-24 border-y border-white/5" style={{ backgroundColor: tokens.surface }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 flex items-center gap-4">
          <Terminal className="w-6 h-6 text-red-500" />
          <h2 className={`text-2xl font-bold uppercase tracking-[0.3em] ${spaceGrotesk.className}`} style={{ color: tokens.textHigh }}>
            System Architecture
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {[
            { title: "Edge Ingest", desc: "Native binary agents deployed directly to your GPU nodes for zero-latency capture.", id: "01" },
            { title: "Stream Router", desc: "Highly available Kafka-based routing ensuring data integrity across clusters.", id: "02" },
            { title: "Neural Index", desc: "TimescaleDB optimized for high-velocity telemetry and experiment diffing.", id: "03" }
          ].map((item, i) => (
            <div key={i} className="relative p-10 border border-white/5 bg-black/20 hover:border-red-500/20 transition-all group">
               <span className={`absolute top-4 right-6 text-4xl font-black opacity-5 ${spaceGrotesk.className}`}>{item.id}</span>
               <h3 className={`text-xl font-bold mb-4 uppercase ${spaceGrotesk.className}`} style={{ color: tokens.textHigh }}>{item.title}</h3>
               <p className={`text-sm leading-relaxed ${inter.className}`} style={{ color: tokens.textLow }}>{item.desc}</p>
               <motion.div 
                 className="absolute bottom-0 left-0 h-1 bg-red-500"
                 initial={{ width: 0 }}
                 whileInView={{ width: '100%' }}
                 transition={{ duration: 1, delay: i * 0.2 }}
               />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTASection() {
  return (
    <section className="py-48 relative overflow-hidden" style={{ backgroundColor: tokens.background }}>
      <img 
        src={IMAGES.cta} 
        alt="Command Center" 
        className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none"
      />
      
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className={`text-6xl md:text-8xl font-black tracking-tighter mb-8 uppercase leading-none ${spaceGrotesk.className}`} style={{ color: tokens.textHigh }}>
            READY TO <span className="text-red-500">SCALE?</span>
          </h2>
          <p className={`text-xl mb-12 ${inter.className}`} style={{ color: tokens.textLow }}>
            Join 500+ research labs monitoring the next generation of AI.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
             <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`h-16 px-12 rounded bg-white text-black font-black text-xl uppercase tracking-tighter ${spaceGrotesk.className}`}
              >
                Request Access
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`h-16 px-12 rounded border border-white/20 text-white font-black text-xl uppercase tracking-tighter ${spaceGrotesk.className}`}
              >
                View Pricing
              </motion.button>
          </div>

          <div className={`mt-16 flex items-center justify-center gap-8 ${jetbrainsMono.className}`}>
            <div className="flex items-center gap-2">
               <LEDIndicator color={tokens.accent3} size={6} />
               <span className="text-[10px] uppercase opacity-50">Cluster Sync Active</span>
            </div>
            <div className="flex items-center gap-2">
               <LEDIndicator color={tokens.accent3} size={6} />
               <span className="text-[10px] uppercase opacity-50">Auth Systems OK</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="py-24 border-t border-white/5" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <Activity className="h-6 w-6" style={{ color: tokens.accent1 }} />
              <span className={`font-bold text-xl tracking-tight uppercase ${spaceGrotesk.className}`} style={{ color: tokens.textHigh }}>
                TensorTrack
              </span>
            </div>
            <p className={`max-w-xs text-sm leading-relaxed ${inter.className}`} style={{ color: tokens.textLow }}>
              The high-velocity telemetry platform for the industrial age of artificial intelligence.
            </p>
          </div>
          <div>
            <h4 className={`text-xs font-bold uppercase tracking-[0.2em] mb-6 ${jetbrainsMono.className}`} style={{ color: tokens.textHigh }}>Product</h4>
            <ul className={`space-y-4 text-sm ${inter.className}`} style={{ color: tokens.textLow }}>
              <li><a href="#" className="hover:text-red-500 transition-colors">Telemetry</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors">Experiments</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors">Clusters</a></li>
            </ul>
          </div>
          <div>
            <h4 className={`text-xs font-bold uppercase tracking-[0.2em] mb-6 ${jetbrainsMono.className}`} style={{ color: tokens.textHigh }}>Legal</h4>
            <ul className={`space-y-4 text-sm ${inter.className}`} style={{ color: tokens.textLow }}>
              <li><a href="#" className="hover:text-red-500 transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors">Terms</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors">Security</a></li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-12 border-t border-white/5">
           <div className={`text-[10px] uppercase tracking-widest ${jetbrainsMono.className}`} style={{ color: tokens.textLow }}>
             © 2024 TensorTrack Systems // All Rights Reserved
           </div>
           <div className="flex gap-6">
             <Globe className="w-4 h-4 text-white/20 hover:text-red-500 cursor-pointer transition-colors" />
             <Activity className="w-4 h-4 text-white/20 hover:text-red-500 cursor-pointer transition-colors" />
             <Zap className="w-4 h-4 text-white/20 hover:text-red-500 cursor-pointer transition-colors" />
           </div>
        </div>
      </div>
    </footer>
  )
}

export default function TensorTrackPage() {
  return (
    <div className={`min-h-screen ${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} selection:bg-red-500/30 text-white`} style={{ backgroundColor: tokens.background }}>
      <Navbar />
      <main>
        <Hero />
        <StatsBoard />
        <FeatureGrid />
        <ArchitectureSection />
        <CTASection />
      </main>
      <Footer />
      
      {/* Global Background Grid */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-10" style={{ backgroundImage: `radial-gradient(${tokens.accent1} 0.5px, transparent 0.5px)`, backgroundSize: '40px 40px' }} />
    </div>
  )
}
