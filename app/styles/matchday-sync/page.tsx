'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { 
  Zap, 
  Activity, 
  TrendingUp, 
  Trophy, 
  Users, 
  ShieldCheck, 
  ChevronDown, 
  ArrowRight,
  Wifi,
  Monitor,
  Smartphone,
  Tv,
  Globe,
  Timer,
  Signal,
  Cpu,
  RefreshCw,
  Share2
} from 'lucide-react'
import { Inter, JetBrains_Mono, Space_Grotesk } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
const mono = JetBrains_Mono({ subsets: ['latin'] })
const space = Space_Grotesk({ subsets: ['latin'] })

// --- Design Tokens ---
const tokens = {
  colors: {
    background: "#020202",
    surface: "#0A0A0A",
    accent1: "#10B981", // Sync Emerald
    accent2: "#EF4444", // Latency Red
    border: "rgba(16, 185, 129, 0.1)",
    textHigh: "#FFFFFF",
    textLow: "#555555"
  },
  physics: {
    sync: { type: "spring" as any, stiffness: 200, damping: 20, mass: 1 }
  }
}

// --- Components ---

const SyncButton = ({ children, variant = 'primary', className = '' }: any) => (
  <motion.button
    whileHover={{ scale: 1.02, backgroundColor: variant === 'primary' ? '#10B981' : '#1A1A1A' }}
    whileTap={{ scale: 0.98 }}
    className={`px-8 py-4 ${space.className} text-xs font-black tracking-widest relative group overflow-hidden border ${
      variant === 'primary' 
        ? `bg-[#10B981] text-black border-[#10B981]` 
        : `bg-transparent text-white border-white/10`
    } ${className}`}
  >
    <span className="relative z-10 flex items-center justify-center gap-2 uppercase">
      {children}
      <RefreshCw size={14} className="group-hover:rotate-180 transition-transform duration-700" />
    </span>
    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
  </motion.button>
)

const DeviceNode = ({ icon: Icon, label = '', status = 'Online', delay = 0 }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="bg-[#0A0A0A] border border-white/5 p-6 rounded-2xl flex flex-col items-center text-center group hover:border-[#10B981]/30 transition-colors"
  >
    <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-4 relative">
       <Icon className="text-[#10B981]" size={20} />
       <motion.div 
        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute inset-0 bg-[#10B981]/20 rounded-full" 
       />
    </div>
    <div className="text-[10px] font-black text-white uppercase tracking-widest mb-1">{label}</div>
    <div className="text-[8px] font-bold text-[#10B981] uppercase tracking-[0.2em]">{status}</div>
  </motion.div>
)

// --- Sections ---

const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 bg-[#020202]/80 backdrop-blur-xl px-8 py-6 border-b border-white/5">
    <div className="max-w-7xl mx-auto flex items-center justify-between">
      <div className={`flex items-center gap-2 ${space.className} text-xl font-black tracking-tighter text-white italic`}>
        <Wifi className="text-[#10B981]" size={24} />
        MATCHDAY<span className="text-[#10B981]">SYNC</span>
      </div>
      <div className="hidden md:flex items-center gap-10 text-[#555555] font-bold text-[10px] tracking-[0.4em] uppercase">
        {['Network', 'Devices', 'Mainframe', 'Archive'].map(item => (
          <a key={item} href="#" className="hover:text-[#10B981] transition-colors">{item}</a>
        ))}
      </div>
      <SyncButton className="hidden md:block py-2 text-[10px]" variant="secondary">AUTH_NODE</SyncButton>
    </div>
  </nav>
)

const Hero = () => {
  return (
    <section className="pt-40 pb-20 px-8 relative overflow-hidden min-h-screen flex items-center bg-[#020202]">
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-[radial-gradient(circle_at_50%_50%,_#10B98108_0%,_transparent_70%)]" />
        <motion.div 
          animate={{ opacity: [0.05, 0.15, 0.05] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute inset-0 bg-[linear-gradient(#10B98105_1px,transparent_1px),linear-gradient(90deg,#10B98105_1px,transparent_1px)] bg-[size:50px_50px]" 
        />
      </div>
      
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={tokens.physics.sync}
        >
          <div className="flex items-center gap-3 mb-10">
            <div className="w-2 h-2 bg-[#10B981] rounded-full animate-ping" />
            <span className={`text-[10px] font-black text-[#10B981] tracking-[0.5em] uppercase ${mono.className}`}>Global_Sync_v3.0_Active</span>
          </div>
          <h1 className={`${space.className} text-7xl md:text-[10rem] font-black text-white leading-[0.8] mb-12 uppercase italic tracking-tighter`}>
            ZERO <br/> <span className="text-[#10B981] drop-shadow-[0_0_30px_#10B981]">DRIFT.</span>
          </h1>
          <p className={`text-[#555555] text-xl max-w-xl mb-16 leading-relaxed font-medium ${inter.className}`}>
            MatchDay Sync ensures your entire ecosystem is in phase. Sub-ms multi-device synchronization for high-stakes digital match engines.
          </p>
          <div className="flex flex-wrap gap-8">
            <SyncButton>INITIALIZE_SYNC</SyncButton>
            <div className={`flex items-center gap-4 text-white font-black tracking-widest text-[10px] cursor-pointer group`}>
              CONNECT_DEVICES <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform text-[#10B981]" />
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...tokens.physics.sync, delay: 0.2 }}
          className="relative"
        >
          <div className="bg-[#0A0A0A] border border-white/5 p-10 rounded-sm shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-[#10B981]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center justify-between mb-16 border-b border-white/5 pb-6">
              <div className={`${mono.className} text-[10px] text-[#10B981] font-bold tracking-widest`}>SYNC_MASTER_ID: 8492-Z</div>
              <Signal className="text-[#10B981]" size={18} />
            </div>
            <div className="grid grid-cols-3 gap-6 relative z-10">
               <DeviceNode icon={Monitor} label="Desktop" delay={0.4} />
               <DeviceNode icon={Smartphone} label="Mobile" delay={0.6} />
               <DeviceNode icon={Tv} label="Broadcast" delay={0.8} />
            </div>
            <div className="mt-16 p-6 bg-black/40 border border-white/5 rounded-sm">
               <div className="flex justify-between items-center mb-4">
                  <div className="text-[8px] font-black text-[#555555] uppercase tracking-widest">Network Latency</div>
                  <div className={`${mono.className} text-xs font-bold text-[#10B981]`}>4.2ms</div>
               </div>
               <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    animate={{ x: [-400, 400] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="h-full w-40 bg-gradient-to-r from-transparent via-[#10B981] to-transparent" 
                  />
               </div>
            </div>
          </div>
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-10 -right-10 opacity-20 pointer-events-none"
          >
            <RefreshCw size={200} className="text-[#10B981]" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

const StatsBar = () => (
  <section className="py-24 border-y border-white/5 bg-black">
    <div className="max-w-7xl mx-auto px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-16 text-center">
        {[
          { label: 'Synced Devices', value: '1.2M+', icon: Smartphone },
          { label: 'Avg Latency', value: '4.2MS', icon: Timer },
          { label: 'Uptime Score', value: '99.9%', icon: ShieldCheck },
          { label: 'Daily Events', value: '850', icon: Zap }
        ].map((stat, i) => (
          <motion.div key={i} whileHover={{ y: -5 }}>
            <div className={`${space.className} text-6xl font-black text-white mb-2 italic tracking-tighter`}>{stat.value}</div>
            <div className="text-[#555555] text-[10px] font-black uppercase tracking-[0.4em]">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)

const Features = () => (
  <section className="py-32 px-8 bg-[#020202]">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-12">
        <div>
          <h2 className={`${space.className} text-6xl font-black text-white mb-6 uppercase italic tracking-tighter`}>SYNC_MODULES</h2>
          <p className={`text-[#555555] max-w-xl ${inter.className}`}>Deploy high-frequency synchronization infrastructure for professional match engines.</p>
        </div>
        <SyncButton variant="secondary" className="md:mb-4 text-[10px]">ALL_SYSTEMS_VIEW</SyncButton>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {[
          { title: 'Zero-Drift Engine', desc: 'A proprietary clock-sync architecture that eliminates drift across multi-device networks.', icon: Timer },
          { title: 'Pulse Telemetry', desc: 'Real-time undulation analytics mapping global signal patterns across the digital grid.', icon: Signal },
          { title: 'Broadcast Relay', desc: 'Low-resource UI components designed for direct television and streaming integration.', icon: Tv },
          { title: 'Node Security', desc: 'Onyx-grade 256-bit encryption for proprietary sync-logic and match telemetry.', icon: ShieldCheck },
          { title: 'Latency Guard', desc: 'AI-driven predictive shunting that anticipates and corrects network spikes instantly.', icon: Zap },
          { title: 'Drift History', desc: 'A modular dashboard for tracking historical sync-accuracy and node performance.', icon: RefreshCw }
        ].map((feature, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -5 }}
            className="bg-[#0A0A0A] border border-white/5 p-10 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-20 transition-opacity">
              <feature.icon size={80} />
            </div>
            <feature.icon className="text-[#10B981]" size={32} />
            <h3 className={`${space.className} text-xl font-bold text-white mb-4 uppercase tracking-tighter italic`}>{feature.title}</h3>
            <p className={`text-[#555555] text-xs leading-relaxed ${inter.className}`}>{feature.desc}</p>
          </motion.div>
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
           <div className="aspect-video bg-[#0A0A0A] border border-white/5 p-10 relative overflow-hidden">
              <div className="absolute inset-0 bg-[#10B981]/5 group-hover:opacity-100 opacity-0 transition-opacity" />
              <div className="w-full h-full border border-dashed border-[#10B981]/20 rounded-sm flex items-center justify-center">
                 <Cpu className="text-[#10B981]/20 animate-spin-slow" size={150} />
              </div>
              <motion.div 
                animate={{ y: [0, 400, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                className="absolute top-0 left-0 w-0.5 h-full bg-[#10B981] shadow-[0_0_15px_#10B981]"
              />
           </div>
           <div className="absolute -bottom-8 -left-8 bg-white text-black p-8 rounded-sm shadow-2xl rotate-6">
              <div className={`${mono.className} text-xl font-black`}>SYNC_CERTIFIED</div>
           </div>
        </div>
        <div className="order-1 lg:order-2">
          <div className={`${mono.className} text-[#10B981] text-[10px] tracking-[0.5em] font-bold mb-10 uppercase`}>[ HUB_ARCHITECTURE ]</div>
          <h2 className={`${space.className} text-6xl font-black text-white mb-10 italic uppercase leading-[0.9] tracking-tighter`}>IN PHASE WITH <br/><span className="text-[#10B981]">REALITY.</span></h2>
          <div className={`space-y-8 text-[#555555] text-xl leading-relaxed ${inter.className}`}>
            <p>Traditional match updates are delayed. MatchDay Sync is immediate. We treat every match signal as a photon, moving at the speed of human potential to ensure your ecosystem is in perfect phase.</p>
            <p>Our implementation of zero-drift physics and rhythmic transitions ensures that the match legacy is as powerful as the play.</p>
          </div>
          <SyncButton className="mt-12">CONNECT_MAIN_SYNC</SyncButton>
        </div>
      </div>
    </div>
  </section>
)

const Footer = () => (
  <footer className="py-24 px-6 bg-black border-t border-white/5">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-16 mb-24">
        <div className="col-span-2">
           <div className={`flex items-center gap-2 ${space.className} text-xl font-black tracking-tighter text-white italic mb-10`}>
            <Wifi className="text-[#10B981]" size={24} />
            MATCHDAY<span className="text-[#10B981]">SYNC</span>
          </div>
          <p className={`text-[#555555] text-[10px] max-w-xs leading-loose font-bold uppercase tracking-[0.2em] ${mono.className}`}>The global standard for sub-ms multi-device synchronization and high-energy match engine analytics. Professional since 2026.</p>
        </div>
        {[
          { title: 'Protocols', links: ['Sync_Engine', 'Telemetry', 'Relay', 'Pricing'] },
          { title: 'Agency', links: ['About Us', 'Network', 'Foundry', 'Legal'] },
          { title: 'Connect', links: ['Discord', 'Terminal', 'GitHub', 'Mainframe'] }
        ].map(group => (
          <div key={group.title}>
            <div className={`${space.className} text-xs font-black text-white mb-10 uppercase tracking-widest`}>{group.title}</div>
            <ul className="space-y-6">
              {group.links.map(link => (
                <li key={link}><a href="#" className={`${mono.className} text-[8px] text-[#555555] font-black uppercase tracking-[0.3em] hover:text-[#10B981] transition-colors`}>{link}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
        <div className={`${mono.className} text-[8px] text-[#555555] uppercase tracking-[0.5em] font-black`}>© 2026 MATCHDAYSYNC HUB CORP. BROADCAST_ENCRYPTED.</div>
        <div className="flex gap-10">
           <Zap className="text-[#555555] hover:text-[#10B981] cursor-pointer" size={18} />
           <Globe className="text-[#555555] hover:text-[#10B981] cursor-pointer" size={18} />
        </div>
      </div>
    </div>
  </footer>
)

export default function MatchDaySync() {
  return (
    <div className={`min-h-screen bg-[#020202] text-white overflow-x-hidden ${inter.className}`}>
      <Navbar />
      <Hero />
      <StatsBar />
      <Features />
      <ProductDetail />
      <Footer />
      
      {/* --- Global Effects --- */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.05] contrast-150 mix-blend-screen">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <filter id="sync-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.95" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100" height="100" filter="url(#sync-noise)" />
        </svg>
      </div>
    </div>
  )
}
