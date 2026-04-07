'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { 
  Zap, 
  Activity, 
  Target, 
  Users, 
  ChevronRight, 
  Shield, 
  TrendingUp,
  Play,
  ArrowRight,
  ClipboardList,
  Timer,
  BarChart3,
  Dumbbell,
  Video,
  Monitor,
  CheckCircle2
} from 'lucide-react'
import { Inter, JetBrains_Mono, Space_Grotesk } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
const mono = JetBrains_Mono({ subsets: ['latin'] })
const space = Space_Grotesk({ subsets: ['latin'] })

// --- Design Tokens ---
const tokens = {
  colors: {
    background: "#080808",
    surface: "#121212",
    accent1: "#3B82F6", // Tactical Blue
    accent2: "#F97316", // Instructional Orange
    border: "#1F1F1F",
    textHigh: "#FFFFFF",
    textLow: "#757575"
  },
  physics: {
    tactical: { type: "spring" as any, stiffness: 300, damping: 25 }
  }
}

// --- Components ---

const DrillButton = ({ children, variant = 'primary', className = '' }: any) => (
  <motion.button
    whileHover={{ scale: 1.02, backgroundColor: variant === 'primary' ? '#3B82F6' : '#1A1A1A' }}
    whileTap={{ scale: 0.98 }}
    className={`px-8 py-4 ${space.className} text-xs font-black tracking-widest relative group overflow-hidden border ${
      variant === 'primary' 
        ? `bg-[#3B82F6] text-white border-[#3B82F6]` 
        : `bg-transparent text-white border-[#1F1F1F]`
    } ${className}`}
  >
    <span className="relative z-10 flex items-center justify-center gap-2 uppercase">
      {children}
      <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
    </span>
    <div className="absolute top-0 left-0 w-1 h-1 bg-white opacity-50 m-1" />
  </motion.button>
)

const TacticalCard = ({ children, className = '', title = '' }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ borderColor: '#3B82F6' }}
    className={`bg-[#121212] border border-[#1F1F1F] p-8 relative group overflow-hidden ${className}`}
  >
    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
      <ClipboardList size={60} strokeWidth={1} />
    </div>
    {title && <div className={`${mono.className} text-[8px] font-bold text-[#3B82F6] uppercase tracking-[0.4em] mb-6`}>{title}</div>}
    {children}
  </motion.div>
)

// --- Sections ---

const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 border-b border-[#1F1F1F] bg-black/90 backdrop-blur-xl px-6 py-6">
    <div className="max-w-7xl mx-auto flex items-center justify-between">
      <div className={`flex items-center gap-3 ${space.className} text-xl font-black tracking-tighter text-white uppercase`}>
        <Dumbbell className="text-[#3B82F6]" size={24} />
        DRILL<span className="text-[#3B82F6]">MASTER</span>
      </div>
      <div className="hidden md:flex items-center gap-10 text-[#757575] font-bold text-[10px] tracking-[0.4em] uppercase">
        {['Drills', 'Metrics', 'Live Sync', 'Coaching'].map(item => (
          <a key={item} href="#" className="hover:text-[#3B82F6] transition-colors">{item}</a>
        ))}
      </div>
      <DrillButton className="hidden md:block py-2 text-[10px]" variant="secondary">AUTH_COACH</DrillButton>
    </div>
  </nav>
)

const Hero = () => {
  return (
    <section className="pt-40 pb-20 px-6 relative overflow-hidden min-h-screen flex items-center bg-black">
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="w-full h-full bg-[linear-gradient(#1F1F1F_1px,transparent_1px),linear-gradient(90deg,#1F1F1F_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>
      
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={tokens.physics.tactical}
        >
          <div className="flex items-center gap-3 mb-10">
            <div className={`px-2 py-1 border border-[#3B82F6]/30 text-[#3B82F6] text-[8px] font-black tracking-widest uppercase ${mono.className}`}>
              [ STATUS: COACHING_ENGINE_ACTIVE ]
            </div>
          </div>
          <h1 className={`${space.className} text-7xl md:text-9xl font-black text-white leading-[0.8] mb-12 uppercase italic tracking-tighter`}>
            ENGINEER <br/> <span className="text-[#3B82F6] drop-shadow-[0_0_30px_#3B82F6]">ELITE.</span>
          </h1>
          <p className={`text-[#757575] text-xl max-w-xl mb-16 leading-relaxed ${inter.className}`}>
            DrillMaster is the technical command deck for elite coaching. Precision-grade drill sequencing, real-time biometric HUDs, and high-fidelity player sync.
          </p>
          <div className="flex flex-wrap gap-8">
            <DrillButton>START_DRIL_V3</DrillButton>
            <div className={`flex items-center gap-4 text-white font-black tracking-widest text-[10px] cursor-pointer group`}>
              VIEW_SYSTEM_SPEC <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform text-[#3B82F6]" />
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...tokens.physics.tactical, delay: 0.2 }}
          className="relative"
        >
          <div className="bg-[#121212] border border-[#1F1F1F] p-8 rounded-sm shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-[#3B82F6]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center justify-between mb-12 border-b border-[#1F1F1F] pb-6">
              <div className={`${mono.className} text-[10px] text-[#3B82F6] font-bold tracking-widest`}>SESSION_08492_ACTIVE</div>
              <Activity className="text-[#3B82F6]" size={18} />
            </div>
            <div className="space-y-8 relative z-10">
              {[
                { label: 'Player Velocity', val: '12.4m/s', trend: '+4.2%' },
                { label: 'Muscle Fatigue', val: 'Low', trend: 'STABLE' },
                { label: 'Sync Accuracy', val: '99.9%', trend: 'OPTIMAL' }
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-black/20 border border-[#1F1F1F]">
                  <div>
                    <div className="text-[8px] font-black text-[#757575] uppercase tracking-widest mb-1">{item.label}</div>
                    <div className={`${mono.className} text-xl font-bold text-white`}>{item.val}</div>
                  </div>
                  <div className="text-[10px] font-black text-[#3B82F6]">{item.trend}</div>
                </div>
              ))}
            </div>
            <div className="mt-12 h-32 bg-black border border-[#1F1F1F] rounded-sm overflow-hidden flex items-end gap-1 px-4 pb-4">
               {[...Array(20)].map((_, i) => (
                 <motion.div
                   key={i}
                   initial={{ height: 0 }}
                   animate={{ height: `${Math.random() * 80 + 20}%` }}
                   transition={{ repeat: Infinity, duration: 2, repeatType: 'mirror', delay: i * 0.1 }}
                   className="flex-1 bg-[#3B82F6]/40"
                 />
               ))}
            </div>
          </div>
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="absolute -top-10 -right-10 bg-[#F97316] text-white p-6 rounded-sm shadow-2xl rotate-12"
          >
            <Timer size={32} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

const StatsBar = () => (
  <section className="py-24 border-y border-[#1F1F1F] bg-black">
    <div className="max-w-7xl mx-auto px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-16 text-center">
        {[
          { label: 'Certified Coaches', value: '1.2K', icon: Users },
          { label: 'Drills Completed', value: '450K+', icon: CheckCircle2 },
          { label: 'Avg ROI Increase', value: '340%', icon: TrendingUp },
          { label: 'System Uptime', value: '99.9%', icon: Shield }
        ].map((stat, i) => (
          <motion.div key={i} whileHover={{ y: -5 }}>
            <div className={`${space.className} text-6xl font-black text-white mb-2 italic`}>{stat.value}</div>
            <div className="text-[#757575] text-[10px] font-black uppercase tracking-[0.4em]">{stat.label}</div>
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
          <h2 className={`${space.className} text-6xl font-black text-white mb-6 uppercase italic tracking-tighter`}>TACTICAL_MODULES</h2>
          <p className={`text-[#757575] max-w-xl ${inter.className}`}>Deploy high-performance coaching architecture built for professional organizations.</p>
        </div>
        <DrillButton variant="secondary" className="md:mb-4 text-[10px]">ALL_SYSTEMS_VIEW</DrillButton>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {[
          { title: 'Drill Sequencing', desc: 'Real-time dynamic scaling of training sessions based on live biometric load signals.', icon: ClipboardList },
          { title: 'Load Monitoring', desc: 'Interfaces that expand and contract based on real-time fatigue and heart-rate data.', icon: Activity },
          { title: 'Player Sync HUD', desc: 'Low-resource UI components designed for direct tablet and handheld device integration.', icon: Monitor },
          { title: 'Tactical Vault', desc: 'Encrypted storage for proprietary drill-logic and historical performance logs.', icon: Shield },
          { title: 'Sub-ms Telemetry', desc: 'Synchronized data streaming across all devices with zero drift architecture.', icon: Zap },
          { title: 'Video Overlay', desc: 'Theatrical drill overlays for live performance analysis and instant feedback.', icon: Video }
        ].map((feature, i) => (
          <TacticalCard key={i} title={`PROTOCOL_0${i + 1}`}>
            <feature.icon className="text-[#3B82F6] mb-8" size={32} />
            <h3 className={`${space.className} text-xl font-bold text-white mb-4 uppercase tracking-tighter italic`}>{feature.title}</h3>
            <p className={`text-[#757575] text-xs leading-relaxed ${inter.className}`}>{feature.desc}</p>
          </TacticalCard>
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
           <div className="aspect-video bg-[#121212] border border-[#1F1F1F] p-10 relative overflow-hidden">
              <div className="absolute inset-0 bg-[#3B82F6]/5 group-hover:opacity-100 opacity-0 transition-opacity" />
              <div className="w-full h-full border border-dashed border-[#3B82F6]/20 rounded-sm flex items-center justify-center">
                 <Target className="text-[#3B82F6]/20 animate-spin-slow" size={150} />
              </div>
              <motion.div 
                animate={{ x: [0, 400, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                className="absolute top-0 left-0 w-0.5 h-full bg-[#3B82F6] shadow-[0_0_15px_#3B82F6]"
              />
           </div>
           <div className="absolute -bottom-8 -left-8 bg-white text-black p-8 rounded-sm shadow-2xl rotate-6">
              <div className={`${mono.className} text-xl font-black`}>COACH_CERTIFIED</div>
           </div>
        </div>
        <div className="order-1 lg:order-2">
          <div className={`${mono.className} text-[#3B82F6] text-[10px] tracking-[0.5em] font-bold mb-10 uppercase`}>[ ENGINE_ARCHITECTURE ]</div>
          <h2 className={`${space.className} text-6xl font-black text-white mb-10 leading-[0.9] uppercase italic tracking-tighter`}>BUILT FOR THE <br/><span className="text-[#3B82F6]">PERFECTIONISTS.</span></h2>
          <div className={`space-y-8 text-[#757575] text-xl leading-relaxed ${inter.className}`}>
            <p>Traditional coaching tools are reactive. DrillMaster is proactive. We treat every athletic signal as a unit of value, carefully orchestrating its motion and light to create a singular, high-fidelity experience.</p>
            <p>Our implementation of tactical physics and biometric HUDs ensures that the coaching legacy is as powerful as the play.</p>
          </div>
          <DrillButton className="mt-12">CONNECT_COACH_NODE</DrillButton>
        </div>
      </div>
    </div>
  </section>
)

const Footer = () => (
  <footer className="py-24 px-6 bg-[#080808] border-t border-[#1F1F1F]">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-16 mb-24">
        <div className="col-span-2">
           <div className={`flex items-center gap-3 ${space.className} text-xl font-black tracking-tighter text-white uppercase mb-10`}>
            <Dumbbell className="text-[#3B82F6]" size={24} />
            DRILL<span className="text-[#3B82F6]">MASTER</span>
          </div>
          <p className={`text-[#757575] text-[10px] max-w-xs leading-loose font-black uppercase tracking-[0.2em] ${mono.className}`}>The global standard for professional sports coaching management and high-energy drill analytics. Technical since 2026.</p>
        </div>
        {[
          { title: 'Protocols', links: ['Drills', 'Metrics', 'Live Sync', 'Pricing'] },
          { title: 'Agency', links: ['About Us', 'Coaching', 'Careers', 'Brand'] },
          { title: 'Connect', links: ['Discord', 'Twitter', 'GitHub', 'Mainframe'] }
        ].map(group => (
          <div key={group.title}>
            <div className={`${space.className} text-xs font-black text-white mb-10 uppercase tracking-widest`}>{group.title}</div>
            <ul className="space-y-6">
              {group.links.map(link => (
                <li key={link}><a href="#" className={`${mono.className} text-[8px] text-[#757575] font-black uppercase tracking-[0.3em] hover:text-[#3B82F6] transition-colors`}>{link}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="pt-12 border-t border-[#1F1F1F] flex flex-col md:flex-row justify-between items-center gap-10">
        <div className={`${mono.className} text-[8px] text-[#757575] uppercase tracking-[0.5em] font-black`}>© 2026 DRILLMASTER COACHING CORP. ENGINE_ENCRYPTED.</div>
        <div className="flex gap-10">
           <Zap className="text-[#757575] hover:text-[#3B82F6] cursor-pointer" size={18} />
           <BarChart3 className="text-[#757575] hover:text-[#3B82F6] cursor-pointer" size={18} />
        </div>
      </div>
    </div>
  </footer>
)

export default function DrillMaster() {
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
          <filter id="drill-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.95" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100" height="100" filter="url(#drill-noise)" />
        </svg>
      </div>
    </div>
  )
}
