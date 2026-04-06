'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { 
  Zap, 
  TrendingUp, 
  Activity, 
  Globe, 
  Search, 
  ChevronDown, 
  ArrowUpRight,
  Clock,
  Shield,
  BarChart3,
  Cpu,
  Signal,
  Radio,
  Radar
} from 'lucide-react'
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google'

const space = Space_Grotesk({ subsets: ['latin'] })
const inter = Inter({ subsets: ['latin'] })
const mono = JetBrains_Mono({ subsets: ['latin'] })

// --- Design Tokens ---
const tokens = {
  colors: {
    background: "#050505",
    surface: "#0F0F0F",
    accent1: "#00FF66", // Pulse Green
    accent2: "#7000FF", // Signal Purple
    border: "#1A1A1A",
    textHigh: "#FFFFFF",
    textLow: "#666666"
  },
  physics: {
    pulse: { scale: [1, 1.05, 1], transition: { duration: 2, repeat: Infinity } }
  }
}

// --- Components ---

const TrendButton = ({ children, variant = 'primary', className = '' }: any) => (
  <motion.button
    whileHover={{ scale: 1.02, backgroundColor: variant === 'primary' ? '#00FF66' : '#1A1A1A' }}
    whileTap={{ scale: 0.98 }}
    className={`px-8 py-4 ${space.className} text-xs font-black tracking-widest relative group overflow-hidden ${
      variant === 'primary' 
        ? `bg-[#00FF66] text-black` 
        : `bg-transparent text-white border border-[#1A1A1A]`
    } ${className}`}
  >
    <span className="relative z-10 flex items-center justify-center gap-2 uppercase italic">{children}</span>
    <div className="absolute top-0 left-0 w-full h-full bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
  </motion.button>
)

const DataCard = ({ children, title = '', value = '', trend = '', className = '' }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={`bg-[#0F0F0F] border border-[#1A1A1A] p-8 relative group overflow-hidden ${className}`}
  >
    <div className="flex justify-between items-start mb-6">
      <div className="text-[10px] font-black text-[#666666] uppercase tracking-[0.3em]">{title}</div>
      <div className="text-[#00FF66] animate-pulse"><Signal size={14} /></div>
    </div>
    <div className={`${mono.className} text-4xl font-bold text-white mb-2`}>{value}</div>
    <div className={`text-[10px] font-bold ${trend.startsWith('+') ? 'text-[#00FF66]' : 'text-red-500'} uppercase tracking-widest`}>{trend} vToday</div>
    {children}
  </motion.div>
)

// --- Sections ---

const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 border-b border-[#1A1A1A] bg-black/80 backdrop-blur-xl px-6 py-6">
    <div className="max-w-7xl mx-auto flex items-center justify-between">
      <div className={`flex items-center gap-3 ${space.className} text-2xl font-black tracking-tighter text-white italic`}>
        <Radio className="text-[#00FF66]" size={28} />
        TREND<span className="text-[#00FF66]">TRACKER</span>
      </div>
      <div className="hidden md:flex items-center gap-10 text-[#666666] font-bold text-[10px] tracking-[0.4em] uppercase">
        {['Live Pulse', 'Nodes', 'Mainframe', 'Archive'].map(item => (
          <a key={item} href="#" className="hover:text-[#00FF66] transition-colors">{item}</a>
        ))}
      </div>
      <TrendButton className="hidden md:block py-2 text-[10px]" variant="secondary">AUTH_TERMINAL</TrendButton>
    </div>
  </nav>
)

const Hero = () => {
  return (
    <section className="pt-40 pb-20 px-6 relative overflow-hidden min-h-screen flex items-center bg-black">
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="w-full h-full bg-[radial-gradient(circle_at_50%_50%,_#00FF6611_0%,_transparent_70%)]" />
        <motion.div 
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute inset-0 bg-[linear-gradient(#1A1A1A_1px,transparent_1px),linear-gradient(90deg,#1A1A1A_1px,transparent_1px)] bg-[size:60px_60px]" 
        />
      </div>
      
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <div className="flex items-center gap-3 mb-10">
            <div className="w-2 h-2 bg-[#00FF66] rounded-full animate-ping" />
            <span className={`text-[10px] font-black text-[#00FF66] tracking-[0.5em] uppercase ${mono.className}`}>Connection_Ready_v3.0</span>
          </div>
          <h1 className={`${space.className} text-7xl md:text-[10rem] font-black text-white leading-[0.8] mb-12 uppercase italic tracking-tighter`}>
            READ THE <br/> <span className="text-[#00FF66] drop-shadow-[0_0_30px_#00FF66]">PULSE.</span>
          </h1>
          <p className={`text-[#666666] text-xl max-w-xl mb-16 leading-relaxed ${inter.className}`}>
            TrendTracker identifies global shifts before they become mainstream. High-fidelity data visualization for the modern intelligence agent.
          </p>
          <div className="flex flex-wrap gap-8">
            <TrendButton>INITIALIZE_SCAN</TrendButton>
            <div className={`flex items-center gap-4 text-white font-black tracking-widest text-[10px] cursor-pointer group`}>
              CONNECT_NODE <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform text-[#00FF66]" />
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="relative"
        >
          <div className="bg-[#0F0F0F] border border-[#1A1A1A] p-10 rounded-sm shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-[#00FF66]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center justify-between mb-16 border-b border-[#1A1A1A] pb-6">
              <div className={`${mono.className} text-[10px] text-[#00FF66] font-bold tracking-widest`}>GLOBAL_NODE_ID: 8492-X</div>
              <Activity className="text-[#00FF66]" size={18} />
            </div>
            <div className="h-64 flex items-end gap-2 px-4 pb-4 border-b border-[#1A1A1A]">
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${Math.random() * 80 + 20}%` }}
                  transition={{ repeat: Infinity, duration: 2, repeatType: 'mirror', delay: i * 0.1 }}
                  className={`flex-1 ${i % 4 === 0 ? 'bg-[#7000FF]' : 'bg-[#00FF66]'}`}
                />
              ))}
            </div>
            <div className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                  <Zap size={16} className="text-[#00FF66]" />
                </div>
                <div>
                  <div className="text-[10px] font-black text-white uppercase tracking-widest">Anomaly Detected</div>
                  <div className="text-[8px] text-[#666666] uppercase tracking-widest">Sub-ms Response Required</div>
                </div>
              </div>
              <Radar className="text-[#7000FF]" size={24} />
            </div>
          </div>
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute -top-10 -right-10 opacity-20"
          >
            <Radar size={150} className="text-[#00FF66]" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

const StatsGrid = () => (
  <section className="py-12 px-6 bg-black">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DataCard title="Active Pulse Nodes" value="1,402" trend="+12.4%" />
        <DataCard title="Data Ingestion" value="4.8TB/s" trend="+4.2%" />
        <DataCard title="Global Velocity" value="94.2%" trend="-1.8%" />
        <DataCard title="Predictive Acc" value="99.9%" trend="+0.1%" />
      </div>
    </div>
  </section>
)

const Features = () => (
  <section className="py-32 px-6 bg-black">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-12">
        <div>
          <h2 className={`${space.className} text-6xl font-black text-white mb-6 uppercase italic tracking-tighter`}>TACTICAL_MODULES</h2>
          <p className={`text-[#666666] max-w-xl ${inter.className}`}>Deploy high-frequency intelligence modules for global trend detection.</p>
        </div>
        <TrendButton variant="secondary" className="md:mb-4 text-[10px]">ALL_SYSTEMS_VIEW</TrendButton>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {[
          { title: 'Heartbeat Monitor', desc: 'Real-time undulation analytics mapping global sentiment patterns across digital inventory.', icon: Activity },
          { title: 'Node Network', desc: 'Visual network representation of detected anomalies and trend clusters.', icon: Cpu },
          { title: 'Predictive ROI', desc: 'AI-driven outcome probability mapping based on the last 5 minutes of global flow.', icon: TrendingUp },
          { title: 'Secure Vault', desc: 'Onyx-grade 256-bit encryption for proprietary scouting and intelligence data.', icon: Shield },
          { title: 'Sub-ms Sync', desc: 'Synchronized data streaming across 120+ exchanges with zero drift architecture.', icon: Zap },
          { title: 'History Ticker', desc: 'Vertical scrolling match-timeline with high-contrast strobe reveals for key events.', icon: Clock }
        ].map((feature, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -5 }}
            className="bg-[#0F0F0F] border border-[#1A1A1A] p-10 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-20 transition-opacity">
              <feature.icon size={80} />
            </div>
            <feature.icon className="text-[#00FF66] mb-8" size={32} />
            <h3 className={`${space.className} text-xl font-bold text-white mb-4 uppercase tracking-tighter italic`}>{feature.title}</h3>
            <p className={`text-[#666666] text-xs leading-relaxed ${inter.className}`}>{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)

const ProductDetail = () => (
  <section className="py-32 px-6 relative bg-[#080808] overflow-hidden">
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-24 items-center">
        <div className="order-2 lg:order-1 relative group">
           <div className="aspect-video bg-black border border-[#1A1A1A] p-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-[#00FF66]/5 group-hover:opacity-100 opacity-0 transition-opacity" />
              <div className="w-full h-full flex items-center justify-center">
                 <Signal className="text-[#00FF66]/20 animate-bounce" size={150} />
              </div>
              <motion.div 
                animate={{ x: [0, 400, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                className="absolute top-0 left-0 w-0.5 h-full bg-[#00FF66] shadow-[0_0_15px_#00FF66]"
              />
           </div>
           <div className="absolute -bottom-8 -left-8 bg-[#7000FF] text-white p-8 rounded-sm shadow-2xl rotate-6">
              <div className={`${mono.className} text-xl font-black`}>REALTIME_SCAN</div>
           </div>
        </div>
        <div className="order-1 lg:order-2">
          <div className={`${mono.className} text-[#00FF66] text-[10px] tracking-[0.5em] font-bold mb-10 uppercase`}>[ CORE_ARCHITECTURE ]</div>
          <h2 className={`${space.className} text-6xl font-black text-white mb-10 italic uppercase leading-[0.9] tracking-tighter`}>BUILT FOR THE <br/><span className="text-[#00FF66]">HIGH-SPEED.</span></h2>
          <div className={`space-y-8 text-[#666666] text-xl leading-relaxed ${inter.className}`}>
            <p>Traditional analytics are reactive. TrendTracker is proactive. We treat every data point as a photon, moving at the speed of light to provide you with an instant map of tomorrow.</p>
            <p>Our implementation of sub-ms telemetry and pulse-based visualization ensures that you are always in phase with the global digital environment.</p>
          </div>
          <TrendButton className="mt-12">CONNECT_MAIN_NODE</TrendButton>
        </div>
      </div>
    </div>
  </section>
)

const Footer = () => (
  <footer className="py-24 px-6 bg-black border-t border-[#1A1A1A]">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-16 mb-24">
        <div className="col-span-2">
           <div className={`flex items-center gap-3 ${space.className} text-2xl font-black tracking-tighter text-white italic mb-10`}>
            <Radio className="text-[#00FF66]" size={28} />
            TREND<span className="text-[#00FF66]">TRACKER</span>
          </div>
          <p className={`text-[#666666] text-[10px] max-w-xs leading-loose font-black uppercase tracking-[0.2em] ${mono.className}`}>The global standard for high-frequency trend detection and real-time pulse analytics. Professional since 2026.</p>
        </div>
        {[
          { title: 'Protocols', links: ['Pulse_Engine', 'Telemetry', 'Nodes', 'Pricing'] },
          { title: 'Security', links: ['Encryption', 'Mainframe', 'Legal', 'Privacy'] },
          { title: 'Connect', links: ['Discord', 'Terminal', 'GitHub', 'Mainframe'] }
        ].map(group => (
          <div key={group.title}>
            <div className={`${space.className} text-xs font-black text-white mb-10 uppercase tracking-widest`}>{group.title}</div>
            <ul className="space-y-6">
              {group.links.map(link => (
                <li key={link}><a href="#" className={`${mono.className} text-[8px] text-[#666666] font-black uppercase tracking-[0.3em] hover:text-[#00FF66] transition-colors`}>{link}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="pt-12 border-t border-[#1A1A1A] flex flex-col md:flex-row justify-between items-center gap-10">
        <div className={`${mono.className} text-[8px] text-[#666666] uppercase tracking-[0.5em] font-black`}>© 2026 TRENDTRACKER SYSTEMS. PULSE_ENCRYPTED.</div>
        <div className="flex gap-10">
           <Zap className="text-[#666666] hover:text-[#00FF66] cursor-pointer" size={18} />
           <Globe className="text-[#666666] hover:text-[#00FF66] cursor-pointer" size={18} />
        </div>
      </div>
    </div>
  </footer>
)

export default function TrendTracker() {
  return (
    <div className={`min-h-screen bg-black text-white overflow-x-hidden ${inter.className}`}>
      <Navbar />
      <Hero />
      <StatsGrid />
      <Features />
      <ProductDetail />
      <Footer />
      
      {/* --- Global Effects --- */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.05] contrast-150 mix-blend-screen">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <filter id="trend-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.95" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100" height="100" filter="url(#trend-noise)" />
        </svg>
      </div>
    </div>
  )
}
