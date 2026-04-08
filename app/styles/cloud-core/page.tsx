'use client'

/**
 * CLOUD CORE - KINETIC DESIGN PROTOCOL
 * Style: Global Infrastructure
 * 
 * This page implements the "Kinetic Design Protocol" for the Cloud Core style.
 * Key Features:
 * 1. SVG Path Connectivity: Dynamic SVG lines that "connect" UI nodes as they enter the viewport.
 * 2. Velocity-Responsive Data Motes: Background particles that stretch and accelerate based on scroll speed.
 * 3. High-Fidelity Motion: Using mass, stiffness, and damping to create a "solid infrastructure" feel.
 * 4. Technical Aesthetic: Deep blues, glowing cyans, and JetBrains Mono for a code-centric vibe.
 */

import React, { useState, useEffect, useRef, useMemo } from 'react'
import { 
  motion, 
  AnimatePresence, 
  useScroll, 
  useTransform, 
  useVelocity, 
  useSpring,
  useAnimationFrame,
  useInView
} from 'framer-motion'
import { 
  Cloud, 
  Cpu, 
  Database, 
  Globe, 
  Network, 
  Zap, 
  Server, 
  Shield, 
  Activity, 
  Layers, 
  ChevronRight, 
  ArrowRight,
  Monitor,
  Command,
  Code,
  Lock,
  Wifi,
  Terminal,
  Share2,
  HardDrive
} from 'lucide-react'
import { Inter, JetBrains_Mono } from 'next/font/google'

// --- Fonts ---
const inter = Inter({ subsets: ['latin'] })
const jetbrains = JetBrains_Mono({ subsets: ['latin'] })

// --- Design Tokens ---
const tokens = {
  colors: {
    background: "#020617", // Deep Midnight
    surface: "#0f172a",    // Infrastructure Slate
    accent1: "#38bdf8",    // Data Cyan
    accent2: "#818cf8",    // Packet Indigo
    glow: "rgba(56, 189, 248, 0.4)",
    textHigh: "#f8fafc",   // Fiber White
    textLow: "#64748b"     // Ether Grey
  },
  physics: {
    infrastructure: { 
      type: "spring" as const, 
      stiffness: 400, 
      damping: 25, 
      mass: 1 
    },
    heavy: {
      type: "spring" as const,
      stiffness: 150,
      damping: 30,
      mass: 2
    }
  }
}

// --- Background Components ---

/**
 * Data Motes Background
 * Particles that respond to scroll velocity.
 * They stretch on the Y-axis and speed up when the user scrolls fast.
 */
const DataMotes = () => {
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  
  // Transform velocity into stretch and opacity
  const stretch = useSpring(useTransform(scrollVelocity, [-3000, 3000], [1, 5]), { stiffness: 100, damping: 30 })
  const opacity = useSpring(useTransform(scrollVelocity, [-3000, 3000], [0.1, 0.4]), { stiffness: 100, damping: 30 })
  
  // Generate static motes once
  const motes = useMemo(() => {
    return Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 20 + 10
    }))
  }, [])

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#020617]">
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:60px_60px]" 
      />
      
      {motes.map((mote) => (
        <motion.div
          key={mote.id}
          className="absolute rounded-full bg-[#38bdf8]"
          style={{
            left: `${mote.x}%`,
            top: `${mote.y}%`,
            width: mote.size,
            height: mote.size,
            opacity: opacity,
            scaleY: stretch
          }}
          animate={{
            y: [0, 1000]
          }}
          transition={{
            duration: mote.duration,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </div>
  )
}

/**
 * SVG Connectivity Path
 * Connects two points with a technical-looking path.
 */
const ConnectivityPath = ({ fromRef, toRef, active = false }: any) => {
  const [path, setPath] = useState("")
  const containerRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const updatePath = () => {
      if (!fromRef.current || !toRef.current || !containerRef.current) return
      
      const fromRect = fromRef.current.getBoundingClientRect()
      const toRect = toRef.current.getBoundingClientRect()
      const containerRect = containerRef.current.getBoundingClientRect()
      
      // Calculate coordinates relative to the SVG container
      const startX = fromRect.left + fromRect.width / 2 - containerRect.left
      const startY = fromRect.top + fromRect.height / 2 - containerRect.top
      const endX = toRect.left + toRect.width / 2 - containerRect.left
      const endY = toRect.top + toRect.height / 2 - containerRect.top
      
      // Create a stepped path for a technical "circuit board" look
      const midY = (startY + endY) / 2
      setPath(`M ${startX} ${startY} L ${startX} ${midY} L ${endX} ${midY} L ${endX} ${endY}`)
    }

    updatePath()
    // Update on resize and scroll to keep connections in sync
    window.addEventListener('resize', updatePath)
    window.addEventListener('scroll', updatePath)
    return () => {
      window.removeEventListener('resize', updatePath)
      window.removeEventListener('scroll', updatePath)
    }
  }, [fromRef, toRef])

  return (
    <svg 
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
    >
      <motion.path
        d={path}
        fill="none"
        stroke={active ? "#38bdf8" : "#1e293b"}
        strokeWidth="1"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ 
          pathLength: active ? 1 : 0.2, 
          opacity: active ? 0.6 : 0.2 
        }}
        transition={{ duration: 1, ease: "easeInOut" }}
      />
      {active && (
        <motion.path
          d={path}
          fill="none"
          stroke="#38bdf8"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 0] }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            ease: "linear",
            times: [0, 0.5, 1]
          }}
          className="blur-[2px]"
        />
      )}
    </svg>
  )
}

// --- UI Components ---

/**
 * Infrastructure Node
 * A glowing circular container used as a focal point for connectivity.
 */
const InfrastructureNode = React.forwardRef(({ icon: Icon, active = false, className = "" }: any, ref: any) => (
  <motion.div
    ref={ref}
    whileHover={{ scale: 1.1, boxShadow: `0 0 20px ${tokens.colors.glow}` }}
    className={`w-16 h-16 rounded-full border border-[#1e293b] flex items-center justify-center bg-[#0f172a] relative z-10 transition-colors ${
      active ? "border-[#38bdf8] text-[#38bdf8]" : "text-[#64748b]"
    } ${className}`}
  >
    <Icon size={24} />
    {active && (
      <motion.div 
        layoutId="node-glow"
        className="absolute inset-0 rounded-full bg-[#38bdf8]/10 blur-xl"
      />
    )}
  </motion.div>
))
InfrastructureNode.displayName = "InfrastructureNode"

/**
 * Technical Card
 * Uses high-stiffness springs for interaction.
 */
const TechCard = ({ title, desc, icon: Icon, index }: any) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ ...tokens.physics.infrastructure, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="p-8 bg-[#0f172a]/50 border border-[#1e293b] backdrop-blur-sm relative group overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-16 h-16 opacity-[0.05] group-hover:opacity-10 transition-opacity">
        <Icon size={64} />
      </div>
      <div className="mb-6 inline-flex p-3 bg-[#38bdf8]/10 border border-[#38bdf8]/20 text-[#38bdf8]">
        <Icon size={20} />
      </div>
      <h3 className={`${jetbrains.className} text-xl font-bold text-white mb-4 uppercase tracking-tighter`}>
        {title}
      </h3>
      <p className="text-[#64748b] text-sm leading-relaxed mb-8">
        {desc}
      </p>
      <div className="flex items-center gap-2 text-[10px] font-bold text-[#38bdf8] uppercase tracking-[0.2em]">
        <span>Execute_Node</span>
        <ArrowRight size={12} />
      </div>
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#38bdf8]/30" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#38bdf8]/30" />
    </motion.div>
  )
}

// --- Layout Sections ---

const Navbar = () => (
  <nav className="fixed top-0 w-full z-[100] px-10 py-8 flex justify-between items-center border-b border-[#1e293b]/50 bg-[#020617]/80 backdrop-blur-xl">
    <div className={`flex items-center gap-3 ${jetbrains.className} text-xl font-black text-white tracking-tighter uppercase`}>
      <div className="p-2 bg-[#38bdf8] text-black">
        <Network size={20} />
      </div>
      Cloud<span className="text-[#38bdf8]">Core</span>
    </div>
    
    <div className="hidden lg:flex items-center gap-12 text-[10px] font-bold uppercase tracking-[0.4em] text-[#64748b]">
      {['Network', 'Infrastructure', 'Encryption', 'Telemetry'].map(item => (
        <a key={item} href="#" className="hover:text-white transition-colors relative group">
          {item}
          <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-[#38bdf8] group-hover:w-full transition-all" />
        </a>
      ))}
    </div>

    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${jetbrains.className} text-[10px] font-bold uppercase tracking-[0.3em] px-8 py-3 bg-[#38bdf8] text-black`}
    >
      Connect_Secure
    </motion.button>
  </nav>
)

const Hero = ({ startNodeRef }: any) => {
  return (
    <section className="min-h-screen pt-40 px-10 relative flex items-center justify-center overflow-hidden">
      <div className="max-w-screen-2xl mx-auto grid lg:grid-cols-2 gap-20 items-center relative z-10">
        <div>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={tokens.physics.infrastructure}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-12 bg-[#38bdf8]" />
              <span className={`${jetbrains.className} text-[10px] font-bold text-[#38bdf8] uppercase tracking-[0.5em]`}>
                System_Status: Operational
              </span>
            </div>
            
            <h1 className={`${jetbrains.className} text-[clamp(4rem,8vw,10rem)] font-black text-white leading-[0.9] uppercase tracking-tighter mb-12`}>
              Global <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38bdf8] to-[#818cf8]">Infrastructure.</span>
            </h1>
            
            <p className={`text-xl text-[#64748b] max-w-xl mb-16 font-medium leading-relaxed ${inter.className}`}>
              High-performance cloud architecture built on a foundation of physical precision and global interconnectedness.
            </p>
            
            <div className="flex flex-wrap items-center gap-10">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: `0 0 30px ${tokens.colors.glow}` }}
                whileTap={{ scale: 0.95 }}
                className={`${jetbrains.className} px-12 py-6 bg-white text-black font-black uppercase tracking-widest text-sm`}
              >
                Launch_Cluster
              </motion.button>
              
              <div className="flex items-center gap-4 text-[#64748b] text-xs font-bold uppercase tracking-widest cursor-pointer hover:text-white transition-colors">
                View_Protocol <ArrowRight size={18} />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="relative flex justify-center">
          {/* Central Hero Visual - Simulated Global Node */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={tokens.physics.heavy}
            className="w-[500px] h-[500px] rounded-full border border-[#1e293b] relative flex items-center justify-center bg-[#0f172a]/20 backdrop-blur-sm"
          >
            <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,#38bdf8_0%,transparent_20%)] animate-spin-slow opacity-20" />
            
            {/* The primary node where connectivity starts */}
            <InfrastructureNode 
              ref={startNodeRef} 
              icon={Globe} 
              active 
              className="w-32 h-32"
            />
            
            {/* Orbiting Elements */}
            {[Cpu, Shield, Database, Wifi].map((Icon, i) => (
              <motion.div
                key={i}
                animate={{
                  rotate: [i * 90, i * 90 + 360]
                }}
                transition={{
                  duration: 40 + i * 10,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute w-full h-full"
              >
                <div 
                  className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 bg-[#0f172a] border border-[#1e293b] rounded-lg text-[#38bdf8]"
                >
                  <Icon size={20} />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

const ConnectivitySection = ({ fromRef }: any) => {
  const node1Ref = useRef(null)
  const node2Ref = useRef(null)
  const node3Ref = useRef(null)
  
  const node1InView = useInView(node1Ref, { margin: "-200px" })
  const node2InView = useInView(node2Ref, { margin: "-200px" })
  const node3InView = useInView(node3Ref, { margin: "-200px" })

  return (
    <section className="py-40 px-10 relative bg-[#020617]">
      {/* Connecting Paths */}
      <ConnectivityPath fromRef={fromRef} toRef={node1Ref} active={node1InView} />
      <ConnectivityPath fromRef={node1Ref} toRef={node2Ref} active={node2InView} />
      <ConnectivityPath fromRef={node2Ref} toRef={node3Ref} active={node3InView} />

      <div className="max-w-screen-2xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-3 gap-32">
          {/* Node 1 */}
          <div className="flex flex-col items-center text-center">
            <InfrastructureNode ref={node1Ref} icon={Server} active={node1InView} className="mb-12" />
            <h2 className={`${jetbrains.className} text-4xl font-bold text-white mb-6 uppercase tracking-tighter`}>
              Massive_Scale
            </h2>
            <p className="text-[#64748b] max-w-xs leading-relaxed">
              Global clusters designed for extreme concurrency and low-latency data replication.
            </p>
          </div>

          {/* Node 2 */}
          <div className="flex flex-col items-center text-center">
            <InfrastructureNode ref={node2Ref} icon={Lock} active={node2InView} className="mb-12" />
            <h2 className={`${jetbrains.className} text-4xl font-bold text-white mb-6 uppercase tracking-tighter`}>
              Secure_Core
            </h2>
            <p className="text-[#64748b] max-w-xs leading-relaxed">
              Encryption at every layer, from physical fiber paths to virtual logic gates.
            </p>
          </div>

          {/* Node 3 */}
          <div className="flex flex-col items-center text-center">
            <InfrastructureNode ref={node3Ref} icon={Zap} active={node3InView} className="mb-12" />
            <h2 className={`${jetbrains.className} text-4xl font-bold text-white mb-6 uppercase tracking-tighter`}>
              Ultra_Speed
            </h2>
            <p className="text-[#64748b] max-w-xs leading-relaxed">
              Proprietary data routing protocols ensuring sub-millisecond packet delivery.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

const FeatureGrid = () => (
  <section className="py-40 px-10 bg-[#020617] relative">
    <div className="max-w-screen-2xl mx-auto">
      <div className="mb-32">
        <div className={`${jetbrains.className} text-[#38bdf8] text-[10px] font-bold uppercase tracking-[0.6em] mb-10`}>
          [ INFRASTRUCTURE_SPECS ]
        </div>
        <h2 className={`${jetbrains.className} text-7xl lg:text-9xl font-black text-white uppercase tracking-tighter leading-[0.8]`}>
          Core_Capabilities.
        </h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {[
          { title: 'Data_Liquidity', desc: 'Seamless migration of massive datasets between global zones with zero downtime.', icon: Activity },
          { title: 'Neural_Routing', desc: 'AI-driven network path optimization based on real-time traffic telemetry.', icon: Cpu },
          { title: 'Fiber_Slicing', desc: 'Virtualization of physical fiber paths for dedicated high-bandwidth pipelines.', icon: Wifi },
          { title: 'Quantum_Sync', desc: 'Atomic clock synchronization across all global nodes for perfect data consistency.', icon: Layers },
          { title: 'Edge_Orchestra', desc: 'Distributed compute execution at the farthest nodes of the global network.', icon: Command },
          { title: 'Logical_Vault', desc: 'Hardware-level isolation for high-security government and financial workloads.', icon: Shield }
        ].map((feature, i) => (
          <TechCard key={i} {...feature} index={i} />
        ))}
      </div>
    </div>
  </section>
)

const Footer = () => (
  <footer className="py-32 px-10 bg-[#020617] border-t border-[#1e293b]/50">
    <div className="max-w-screen-2xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-20 mb-32">
        <div className="lg:col-span-2">
          <div className={`flex items-center gap-3 ${jetbrains.className} text-3xl font-black text-white tracking-tighter uppercase mb-12`}>
            <div className="p-2 bg-[#38bdf8] text-black">
              <Network size={28} />
            </div>
            Cloud<span className="text-[#38bdf8]">Core</span>
          </div>
          <p className="text-[#64748b] text-sm leading-loose uppercase tracking-[0.2em] max-w-sm">
            The global standard for interconnected infrastructure. Precision engineered for the next generation of data.
          </p>
        </div>
        
        {[
          { title: 'Infrastructure', links: ['Zones', 'Regions', 'Fiber', 'Compute'] },
          { title: 'Security', links: ['Protocol', 'Encryption', 'Vault', 'Compliance'] },
          { title: 'Telemetry', links: ['Network_Log', 'Traffic', 'Sync', 'Uptime'] }
        ].map((group, i) => (
          <div key={i}>
            <div className={`${jetbrains.className} text-[10px] font-bold text-white uppercase tracking-[0.5em] mb-12`}>
              {group.title}
            </div>
            <ul className="space-y-6 text-[#64748b] text-sm font-bold uppercase tracking-widest">
              {group.links.map(link => (
                <li key={link} className="hover:text-[#38bdf8] transition-colors cursor-pointer flex items-center gap-2 group">
                  <div className="w-0 h-px bg-[#38bdf8] group-hover:w-4 transition-all" />
                  {link}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      
      <div className="pt-16 border-t border-[#1e293b]/50 flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="text-[8px] font-bold text-[#64748b] uppercase tracking-[0.8em]">
          © 2026 Cloud_Core_Infrastructure // All_Nodes_Secure
        </div>
        <div className="flex gap-10 text-[#64748b]">
          {[Share2, Terminal, Code].map((Icon, i) => (
            <Icon key={i} size={20} className="hover:text-[#38bdf8] cursor-pointer transition-colors" />
          ))}
        </div>
      </div>
    </div>
  </footer>
)

// --- Main Page Component ---

export default function CloudCorePage() {
  const startNodeRef = useRef(null)

  return (
    <div className={`min-h-screen bg-[#020617] text-white overflow-x-hidden ${inter.className} selection:bg-[#38bdf8] selection:text-black`}>
      {/* Background kinetic data motes */}
      <DataMotes />
      
      {/* Navigation */}
      <Navbar />
      
      {/* Main Content */}
      <main className="relative z-10">
        <Hero startNodeRef={startNodeRef} />
        <ConnectivitySection fromRef={startNodeRef} />
        <FeatureGrid />
        
        {/* Call To Action */}
        <section className="py-40 px-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={tokens.physics.heavy}
            className="max-w-6xl mx-auto bg-gradient-to-br from-[#0f172a] to-[#020617] border border-[#38bdf8]/30 p-24 text-center relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#38bdf8] to-transparent opacity-50" />
            
            <div className="relative z-10">
              <h2 className={`${jetbrains.className} text-6xl lg:text-8xl font-black text-white uppercase tracking-tighter mb-12`}>
                Deploy to the <br/> <span className="text-[#38bdf8]">Edge.</span>
              </h2>
              <p className="text-xl text-[#64748b] mb-16 max-w-2xl mx-auto leading-relaxed">
                Connect your organization to the most reliable global infrastructure ever engineered. Secure, scalable, and interconnected.
              </p>
              
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: `0 0 50px ${tokens.colors.glow}` }}
                whileTap={{ scale: 0.95 }}
                className={`${jetbrains.className} px-20 py-8 bg-[#38bdf8] text-black font-black uppercase tracking-[0.3em] text-xl`}
              >
                Access_Terminal
              </motion.button>
            </div>

            {/* Background HUD Decor */}
            <div className="absolute bottom-10 right-10 text-[8px] font-bold text-[#38bdf8]/20 text-left uppercase tracking-[0.5em] pointer-events-none">
              Node_ID: CC-GLOBAL-01 <br/>
              Encryption: AES-512-GCM <br/>
              Protocol: KINETIC_V4
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />

      {/* Global Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[1000] opacity-[0.02] mix-blend-overlay">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>

      {/* System Telemetry HUD */}
      <div className="fixed bottom-10 left-10 z-[100] hidden xl:block">
        <div className={`p-6 border border-[#1e293b] bg-[#020617]/90 backdrop-blur-md ${jetbrains.className}`}>
          <div className="flex items-center gap-3 mb-4">
            <motion.div 
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="w-2 h-2 bg-[#38bdf8] rounded-full" 
            />
            <span className="text-[8px] font-bold text-[#64748b] tracking-[0.5em] uppercase">Connectivity_Live</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between gap-10">
              <span className="text-[8px] text-[#64748b]">Lat: 0.02ms</span>
              <span className="text-[8px] text-[#38bdf8]">Sync: OK</span>
            </div>
            <div className="h-0.5 w-32 bg-[#1e293b] overflow-hidden">
               <motion.div 
                 animate={{ x: ["-100%", "100%"] }}
                 transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                 className="h-full w-10 bg-[#38bdf8]"
               />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
