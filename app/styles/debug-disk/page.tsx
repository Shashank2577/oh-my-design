'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { 
  Cpu, 
  Terminal, 
  Zap, 
  Activity, 
  TrendingUp, 
  ShieldCheck, 
  ChevronDown, 
  ArrowRight,
  Bug,
  Code2,
  Signal,
  Network,
  Radio,
  Sparkles,
  Search,
  RefreshCw,
  HardDrive,
  Database,
  Layers,
  LayoutGrid
} from 'lucide-react'
import { JetBrains_Mono, Inter, Space_Grotesk } from 'next/font/google'

const mono = JetBrains_Mono({ subsets: ['latin'] })
const inter = Inter({ subsets: ['latin'] })
const space = Space_Grotesk({ subsets: ['latin'] })

// --- Design Tokens ---
const tokens = {
  colors: {
    background: "#050505",
    surface: "#0F0F0F",
    accent1: "#FF3E00", // Debug Orange
    accent2: "#00F3FF", // Logic Cyan
    border: "#1A1A1A",
    textHigh: "#FFFFFF",
    textLow: "#666666"
  },
  physics: {
    tactical: { type: "spring" as any, stiffness: 300, damping: 25 }
  }
}

// --- Components ---

const DebugButton = ({ children, variant = 'primary', className = '' }: any) => (
  <motion.button
    whileHover={{ scale: 1.02, backgroundColor: variant === 'primary' ? '#FF3E00' : '#1A1A1A' }}
    whileTap={{ scale: 0.98 }}
    className={`px-8 py-4 ${mono.className} text-xs font-black tracking-widest relative group overflow-hidden border ${
      variant === 'primary' 
        ? `bg-[#FF3E00] text-black border-[#FF3E00]` 
        : `bg-transparent text-white border-[#1A1A1A]`
    } ${className}`}
  >
    <span className="relative z-10 flex items-center justify-center gap-2 uppercase">
      {children}
      <Bug size={14} className="group-hover:rotate-12 transition-transform" />
    </span>
    <div className="absolute top-0 left-0 w-1 h-1 bg-white opacity-50 m-1" />
  </motion.button>
)

const ConsoleCard = ({ children, className = '', title = '' }: any) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    whileHover={{ borderColor: '#FF3E00' }}
    className={`bg-[#0F0F0F] border border-[#1A1A1A] p-8 relative group overflow-hidden ${className}`}
  >
    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
      <HardDrive size={60} strokeWidth={1} />
    </div>
    {title && <div className={`${mono.className} text-[8px] font-bold text-[#FF3E00] uppercase tracking-[0.4em] mb-6`}>{title}</div>}
    {children}
  </motion.div>
)

// --- Sections ---

const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 bg-[#050505]/80 backdrop-blur-xl px-8 py-6 border-b border-white/5">
    <div className="max-w-7xl mx-auto flex items-center justify-between">
      <div className={`flex items-center gap-2 ${space.className} text-xl font-black tracking-tighter text-white uppercase italic`}>
        <Bug className="text-[#FF3E00]" size={24} />
        DEBUG<span className="text-[#FF3E00]">DISK</span>
      </div>
      <div className="hidden md:flex items-center gap-10 text-[#666666] font-bold text-[10px] tracking-[0.4em] uppercase">
        {['The Scan', 'Logic', 'Nodes', 'Mainframe'].map(item => (
          <a key={item} href="#" className="hover:text-[#FF3E00] transition-colors">{item}</a>
        ))}
      </div>
      <DebugButton className="hidden md:block py-2 text-[10px]" variant="secondary">AUTH_DEBUGGER</DebugButton>
    </div>
  </nav>
)

const Hero = () => {
  return (
    <section className="pt-40 pb-20 px-8 relative overflow-hidden min-h-screen flex items-center bg-black">
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-[radial-gradient(circle_at_50%_50%,_#FF3E0008_0%,_transparent_70%)]" />
        <motion.div 
          animate={{ opacity: [0.05, 0.15, 0.05] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute inset-0 bg-[linear-gradient(#1A1A1A_1px,transparent_1px),linear-gradient(90deg,#1A1A1A_1px,transparent_1px)] bg-[size:50px_50px]" 
        />
      </div>
      
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={tokens.physics.tactical}
        >
          <div className="flex items-center gap-3 mb-10">
            <div className="w-2 h-2 bg-[#FF3E00] rounded-full animate-ping shadow-[0_0_10px_#FF3E00]" />
            <span className={`text-[10px] font-black text-[#FF3E00] tracking-[0.5em] uppercase ${mono.className}`}>System_Scanner_v3.0_Active</span>
          </div>
          <h1 className={`${space.className} text-7xl md:text-[10rem] font-black text-white leading-[0.8] mb-12 uppercase italic tracking-tighter`}>
            READ THE <br/> <span className="text-[#FF3E00] drop-shadow-[0_0_30px_#FF3E00]">ERRORS.</span>
          </h1>
          <p className={`text-[#666666] text-xl max-w-xl mb-16 leading-relaxed font-medium ${inter.className}`}>
            DebugDisk is the high-fidelity diagnostic engine for complex digital environments. Identify anomalies, map logic gates, and fix the web at scale.
          </p>
          <div className="flex flex-wrap gap-8">
            <DebugButton>INITIALIZE_SCAN</DebugButton>
            <div className={`flex items-center gap-4 text-white font-black tracking-widest text-[10px] cursor-pointer group`}>
              CONNECT_MAIN_NODE <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform text-[#FF3E00]" />
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...tokens.physics.tactical, delay: 0.2 }}
          className="relative"
        >
          <div className="bg-[#0F0F0F] border border-[#1A1A1A] p-10 rounded-sm shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-[#FF3E00]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center justify-between mb-16 border-b border-[#1A1A1A] pb-6">
              <div className={`${mono.className} text-[10px] text-white font-bold tracking-widest`}>SCAN_MASTER_ID: 8492-D</div>
              <Signal className="text-[#FF3E00]" size={18} />
            </div>
            <div className="space-y-8 relative z-10">
               {[
                 { label: 'Logic Entropy', val: '4.2%', trend: 'STABLE' },
                 { label: 'Data Latency', val: '12ms', trend: 'OPTIMAL' },
                 { label: 'Node Uptime', val: '99.9%', trend: 'SYNCED' }
               ].map((item, i) => (
                 <div key={i} className="flex items-center justify-between p-4 bg-black/40 border border-[#1A1A1A]">
                   <div>
                     <div className="text-[8px] font-black text-[#666666] uppercase tracking-widest mb-1">{item.label}</div>
                     <div className={`${mono.className} text-xl font-bold text-white`}>{item.val}</div>
                   </div>
                   <div className="text-[10px] font-black text-[#FF3E00]">{item.trend}</div>
                 </div>
               ))}
            </div>
            <div className="mt-12 h-32 bg-black border border-[#1A1A1A] rounded-sm overflow-hidden flex items-end gap-1 px-4 pb-4">
               {[...Array(20)].map((_, i) => (
                 <motion.div
                   key={i}
                   initial={{ height: 0 }}
                   animate={{ height: `${Math.random() * 80 + 20}%` }}
                   transition={{ repeat: Infinity, duration: 2, repeatType: 'mirror', delay: i * 0.1 }}
                   className="flex-1 bg-[#FF3E00]/40"
                 />
               ))}
            </div>
          </div>
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-10 -right-10 opacity-20 pointer-events-none"
          >
            <RefreshCw size={200} className="text-[#FF3E00]" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

const StatsBar = () => (
  <section className="py-24 border-y border-[#1A1A1A] bg-black">
    <div className="max-w-7xl mx-auto px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-16 text-center">
        {[
          { label: 'Bugs Fixed', value: '1.2M+', icon: Bug },
          { label: 'Data Accuracy', value: '99.9%', icon: ShieldCheck },
          { label: 'Avg Latency', value: '4.2MS', icon: Zap },
          { label: 'Daily Nodes', value: '850', icon: Activity }
        ].map((stat, i) => (
          <motion.div key={i} whileHover={{ y: -5 }}>
            <div className={`${space.className} text-6xl font-black text-white mb-2 italic tracking-tighter`}>{stat.value}</div>
            <div className="text-[#666666] text-[10px] font-black uppercase tracking-[0.4em]">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)

const Features = () => (
  <section className="py-32 px-8 bg-[#080808]">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-12">
        <div>
          <h2 className={`${space.className} text-6xl font-black text-white mb-6 uppercase italic tracking-tighter`}>DIAGNOSTIC_MODULES</h2>
          <p className={`text-[#666666] max-w-xl ${inter.className}`}>Deploy high-frequency synchronization infrastructure for professional match engines.</p>
        </div>
        <DebugButton variant="secondary" className="md:mb-4 text-[10px]">ALL_SYSTEMS_VIEW</DebugButton>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {[
          { title: 'Entropy Mapping', desc: 'Real-time undulation analytics mapping global signal patterns across the digital grid.', icon: Signal },
          { title: 'Node Diagnostics', desc: 'Interfaces that maintain a constant rhythmic pulse through subtle micro-animations on all grid cells.', icon: Activity },
          { title: 'Predictive ROI', desc: 'AI-driven outcome probability mapping based on the last 5 minutes of global flow.', icon: TrendingUp },
          { title: 'Secure Vault', desc: 'Onyx-grade 256-bit encryption for proprietary scouting and intelligence data.', icon: ShieldCheck },
          { title: 'Sub-ms Sync', desc: 'Synchronized data streaming across 120+ exchanges with zero drift architecture.', icon: Zap },
          { title: 'History Ticker', desc: 'Vertical scrolling match-timeline with high-contrast strobe reveals for key events.', icon: Terminal }
        ].map((feature, i) => (
          <ConsoleCard key={i} title={`PROTOCOL_0${i + 1}`}>
            <feature.icon className="text-[#FF3E00]" size={32} />
            <h3 className={`${space.className} text-xl font-bold text-white mb-4 uppercase tracking-tighter italic`}>{feature.title}</h3>
            <p className={`text-[#666666] text-xs leading-relaxed ${inter.className}`}>{feature.desc}</p>
          </ConsoleCard>
        ))}
      </div>
    </div>
  </section>
)

const ProductDetail = () => (
  <section className="py-32 px-8 bg-black relative overflow-hidden">
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-24 items-center">
        <div className="order-2 lg:order-1 relative group">
           <div className="aspect-video bg-[#0F0F0F] border border-[#1A1A1A] p-10 relative overflow-hidden">
              <div className="absolute inset-0 bg-[#FF3E00]/5 group-hover:opacity-100 opacity-0 transition-opacity" />
              <div className="w-full h-full border border-dashed border-[#FF3E00]/20 rounded-sm flex items-center justify-center">
                 <Database className="text-[#FF3E00]/20 animate-spin-slow" size={150} />
              </div>
              <motion.div 
                animate={{ y: [0, 400, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                className="absolute top-0 left-0 w-0.5 h-full bg-[#FF3E00] shadow-[0_0_15px_#FF3E00]"
              />
           </div>
           <div className="absolute -bottom-8 -left-8 bg-white text-black p-8 rounded-sm shadow-2xl rotate-6">
              <div className={`${mono.className} text-xl font-black`}>DIAGNOSTIC_CERTIFIED</div>
           </div>
        </div>
        <div className="order-1 lg:order-2">
          <div className={`${mono.className} text-[#FF3E00] text-[10px] tracking-[0.5em] font-bold mb-10 uppercase`}>[ HUB_ARCHITECTURE ]</div>
          <h2 className={`${space.className} text-6xl font-black text-white mb-10 italic uppercase leading-[0.9] tracking-tighter`}>IN PHASE WITH <br/><span className="text-[#FF3E00]">THE DATA.</span></h2>
          <div className={`space-y-8 text-[#666666] text-xl leading-relaxed ${inter.className}`}>
            <p>Traditional diagnostics are reactive. DebugDisk is proactive. We treat every data point as a unit of value, carefully orchestrating its motion and light to ensure your ecosystem is always in phase.</p>
            <p>Our implementation of tactical physics and console HUDs ensures that the diagnostic legacy is as powerful as the code.</p>
          </div>
          <DebugButton className="mt-12">CONNECT_MAIN_SCANNER</DebugButton>
        </div>
      </div>
    </div>
  </section>
)

const Footer = () => (
  <footer className="py-24 px-6 bg-[#080808] border-t border-[#1A1A1A]">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-16">
        <div className="col-span-2">
           <div className={`flex items-center gap-3 ${space.className} text-2xl font-black tracking-tighter text-white italic mb-10`}>
            <Bug className="text-[#FF3E00]" size={28} />
            DEBUG<span className="text-[#FF3E00]">DISK</span>
          </div>
          <p className={`text-[#666666] text-[10px] max-w-xs leading-loose font-black uppercase tracking-[0.2em] ${mono.className}`}>The global standard for high-fidelity digital diagnostics and high-energy diagnostic analytics. Professional since 2026.</p>
        </div>
        {[
          { title: 'Protocols', links: ['The Scan', 'Nodes', 'Mainframe', 'Pricing'] },
          { title: 'Agency', links: ['About Us', 'Diagnostic', 'Careers', 'Brand'] },
          { title: 'Connect', links: ['Discord', 'Terminal', 'GitHub', 'Mainframe'] }
        ].map(group => (
          <div key={group.title}>
            <div className={`${space.className} text-xs font-black text-white mb-10 uppercase tracking-widest`}>{group.title}</div>
            <ul className="space-y-6">
              {group.links.map(link => (
                <li key={link}><a href="#" className={`${mono.className} text-[8px] text-[#666666] font-black uppercase tracking-[0.3em] hover:text-[#FF3E00] transition-colors`}>{link}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="pt-12 border-t border-[#1A1A1A] flex flex-col md:flex-row justify-between items-center gap-10">
        <div className={`${mono.className} text-[8px] text-[#666666] uppercase tracking-[0.5em] font-black`}>© 2026 DEBUGDISK HUB CORP. SCAN_ENCRYPTED.</div>
        <div className="flex gap-10">
           <Zap className="text-[#666666] hover:text-[#FF3E00] cursor-pointer" size={18} />
           <Globe className="text-[#666666] hover:text-[#FF3E00] cursor-pointer" size={18} />
        </div>
      </div>
    </div>
  </footer>
)

export default function DebugDisk() {
  return (
    <div className={`min-h-screen bg-black text-white overflow-x-hidden ${inter.className}`}>
      <Navbar />
      <Hero />
      <StatsBar />
      <Features />
      <ProductDetail />
      <Footer />
      
      {/* --- Global Effects --- */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.05] contrast-150 mix-blend-screen">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <filter id="debug-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.95" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100" height="100" filter="url(#debug-noise)" />
        </svg>
      </div>
    </div>
  )
}
