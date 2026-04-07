'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { 
  ShieldCheck, 
  Lock, 
  Key, 
  Eye, 
  EyeOff, 
  Zap, 
  Activity, 
  TrendingUp, 
  ChevronDown, 
  ArrowRight,
  Globe,
  RefreshCw,
  Signal,
  Network,
  Radio,
  Sparkles,
  Search,
  Code2,
  Terminal,
  Cpu,
  Layers,
  LayoutGrid,
  Box,
  Fingerprint,
  Mail,
  Send
} from 'lucide-react'
import { JetBrains_Mono, Inter, Space_Grotesk } from 'next/font/google'

const mono = JetBrains_Mono({ subsets: ['latin'] })
const inter = Inter({ subsets: ['latin'] })
const space = Space_Grotesk({ subsets: ['latin'] })

// --- Design Tokens ---
const tokens = {
  colors: {
    background: "#050505",
    surface: "#0A0A0A",
    accent1: "#10B981", // Armor Green
    accent2: "#64748B", // Shield Slate
    border: "rgba(16, 185, 129, 0.1)",
    textHigh: "#FFFFFF",
    textLow: "#555555"
  },
  physics: {
    vault: { type: "spring" as any, stiffness: 300, damping: 30, mass: 1 }
  }
}

// --- Components ---

const SecureButton = ({ children, variant = 'primary', className = '' }: any) => (
  <motion.button
    whileHover={{ scale: 1.02, backgroundColor: variant === 'primary' ? '#10B981' : '#1A1A1A' }}
    whileTap={{ scale: 0.98 }}
    className={`px-8 py-4 ${space.className} text-xs font-black tracking-widest relative group overflow-hidden border ${
      variant === 'primary' 
        ? `bg-[#10B981] text-black border-[#10B981]` 
        : `bg-transparent text-white border-white/10`
    } ${className}`}
  >
    <span className="relative z-10 flex items-center justify-center gap-2 uppercase italic">
      {children}
      <ShieldCheck size={14} className="group-hover:scale-110 transition-transform" />
    </span>
    <div className="absolute top-0 left-0 w-1 h-1 bg-white opacity-50 m-1" />
  </motion.button>
)

const VaultCard = ({ children, className = '', title = '' }: any) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    whileHover={{ y: -5, borderColor: '#10B981' }}
    className={`bg-[#0A0A0A] border border-white/5 p-10 rounded-sm relative group overflow-hidden ${className}`}
  >
    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-20 transition-opacity">
      <Lock size={80} strokeWidth={1} />
    </div>
    {title && <div className={`${mono.className} text-[8px] font-bold text-[#10B981] uppercase tracking-[0.4em] mb-10`}>{title}</div>}
    {children}
  </motion.div>
)

// --- Sections ---

const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 bg-[#050505]/80 backdrop-blur-xl px-8 py-6 border-b border-white/5">
    <div className="max-w-7xl mx-auto flex items-center justify-between">
      <div className={`flex items-center gap-3 ${space.className} text-xl font-black tracking-tighter text-white italic`}>
        <ShieldCheck className="text-[#10B981]" size={24} />
        SECURE<span className="text-[#10B981]">SENT</span>
      </div>
      <div className="hidden md:flex items-center gap-10 text-[#555555] font-bold text-[10px] tracking-[0.4em] uppercase">
        {['The Vault', 'Encryption', 'Mainframe', 'Connect'].map(item => (
          <a key={item} href="#" className="hover:text-[#10B981] transition-colors">{item}</a>
        ))}
      </div>
      <SecureButton className="hidden md:block py-2 text-[10px]" variant="secondary">AUTH_KEY</SecureButton>
    </div>
  </nav>
)

const Hero = () => {
  return (
    <section className="pt-40 pb-20 px-8 relative overflow-hidden min-h-screen flex items-center bg-black">
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-[radial-gradient(circle_at_50%_50%,_#10B98108_0%,_transparent_70%)]" />
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
          transition={tokens.physics.vault}
        >
          <div className="flex items-center gap-3 mb-10">
            <div className="w-2 h-2 bg-[#10B981] rounded-full animate-ping" />
            <span className={`text-[10px] font-black text-[#10B981] tracking-[0.5em] uppercase ${mono.className}`}>Encryption_Ready_v3.0_Active</span>
          </div>
          <h1 className={`${space.className} text-7xl md:text-[10rem] font-black text-white leading-[0.8] mb-12 uppercase italic tracking-tighter`}>
            READ THE <br/> <span className="text-[#10B981] drop-shadow-[0_0_30px_#10B981]">SECRET.</span>
          </h1>
          <p className={`text-[#555555] text-xl max-w-xl mb-16 leading-relaxed font-medium ${inter.className}`}>
            SecureSent is the high-fidelity ecosystem for scalable encrypted communication. Orchestrate millions of keys with sub-ms multi-device sync and zero drift.
          </p>
          <div className="flex flex-wrap gap-8">
            <SecureButton>INITIALIZE_VAULT</SecureButton>
            <div className={`flex items-center gap-4 text-white font-black tracking-widest text-[10px] cursor-pointer group`}>
              CONNECT_MAIN_KEY <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform text-[#10B981]" />
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="relative"
        >
          <div className="bg-[#0A0A0A] border border-white/5 p-10 rounded-sm shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-[#10B981]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center justify-between mb-16 border-b border-white/5 pb-6">
              <div className={`${mono.className} text-[10px] text-[#10B981] font-bold tracking-widest`}>VAULT_MASTER_ID: 8492-S</div>
              <Signal className="text-[#10B981]" size={18} />
            </div>
            <div className="space-y-8 relative z-10">
               {[
                 { label: 'Key Entropy', val: 'Elite', trend: 'STABLE' },
                 { label: 'Sync Latency', val: '4.2ms', trend: 'OPTIMAL' },
                 { label: 'Global Uptime', val: '99.9%', trend: 'SYNCED' }
               ].map((item, i) => (
                 <div key={i} className="flex items-center justify-between p-4 bg-black/40 border border-white/5">
                   <div>
                     <div className="text-[8px] font-black text-[#555555] uppercase tracking-widest mb-1">{item.label}</div>
                     <div className={`${mono.className} text-xl font-bold text-white`}>{item.val}</div>
                   </div>
                   <div className="text-[10px] font-black text-[#10B981]">{item.trend}</div>
                 </div>
               ))}
            </div>
            <div className="mt-16 p-6 bg-black/20 border border-white/5 rounded-sm flex items-center justify-between">
               <div className="flex items-center gap-4">
                  <Fingerprint className="text-[#10B981]" size={24} />
                  <div>
                    <div className="text-[10px] font-black text-white uppercase tracking-widest">Biometric Verified</div>
                    <div className="text-[8px] text-[#555555] uppercase tracking-widest">Secure_Handshake_Complete</div>
                  </div>
               </div>
               <ShieldCheck className="text-[#10B981]" size={24} />
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
          { label: 'Keys Generated', value: '1.2M+', icon: Key },
          { label: 'Sync Accuracy', value: '99.9%', icon: ShieldCheck },
          { label: 'Avg Latency', value: '4.2MS', icon: Timer },
          { label: 'Daily Nodes', value: '850', icon: Zap }
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
          <h2 className={`${space.className} text-6xl font-black text-white mb-6 uppercase italic tracking-tighter`}>VAULT_MODULES</h2>
          <p className={`text-[#555555] max-w-xl ${inter.className}`}>Deploy high-frequency encryption infrastructure for professional digital environments.</p>
        </div>
        <SecureButton variant="secondary" className="md:mb-4 text-[10px]">ALL_SYSTEMS_VIEW</SecureButton>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {[
          { title: 'Zero-Drift Sync', desc: 'A proprietary clock-sync architecture that eliminates key drift across multi-device networks.', icon: RefreshCw },
          { title: 'Pulse Telemetry', desc: 'Real-time undulation analytics mapping global signal patterns across the digital grid.', icon: Signal },
          { title: 'Handshake Reveal', desc: 'Section transitions that use high-impact vertical scrolling and motion-blur reveals.', icon: Signal },
          { title: 'Key Vault', desc: 'Onyx-grade 256-bit encryption for proprietary sync-logic and match telemetry.', icon: ShieldCheck },
          { title: 'Latency Guard', desc: 'AI-driven predictive shunting that anticipates and corrects network spikes instantly.', icon: Zap },
          { title: 'History Ticker', desc: 'Vertical scrolling match-timeline with high-contrast strobe reveals for key events.', icon: Activity }
        ].map((feature, i) => (
          <VaultCard key={i} title={`PROTOCOL_0${i + 1}`}>
            <div className="w-16 h-16 bg-[#10B981]/5 rounded-full flex items-center justify-center mb-10">
              <feature.icon className="text-[#10B981]" size={32} />
            </div>
            <h3 className={`${space.className} text-xl font-bold text-white mb-4 uppercase tracking-tighter italic`}>{feature.title}</h3>
            <p className={`text-[#555555] text-xs leading-relaxed ${inter.className}`}>{feature.desc}</p>
          </VaultCard>
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
              <div className={`${mono.className} text-xl font-black`}>VAULT_CERTIFIED</div>
           </div>
        </div>
        <div className="order-1 lg:order-2">
          <div className={`${mono.className} text-[#10B981] text-[10px] tracking-[0.5em] font-bold mb-10 uppercase`}>[ HUB_ARCHITECTURE ]</div>
          <h2 className={`${space.className} text-6xl font-black text-white mb-10 italic uppercase leading-[0.9] tracking-tighter`}>IN PHASE WITH <br/><span className="text-[#10B981]">THE SECRET.</span></h2>
          <div className={`space-y-8 text-[#555555] text-xl leading-relaxed ${inter.className}`}>
            <p>Traditional communication is reactive. SecureSent is proactive. We treat every message signal as a unit of value, carefully orchestrating its motion and light to ensure your secret is always in phase.</p>
            <p>Our implementation of zero-drift physics and rhythmic transitions ensures that the communication legacy is as powerful as the play.</p>
          </div>
          <SecureButton className="mt-12">CONNECT_MAIN_VAULT</SecureButton>
        </div>
      </div>
    </div>
  </section>
)

const Footer = () => (
  <footer className="py-24 px-6 bg-black border-t border-white/5">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-16">
        <div className="col-span-2">
           <div className={`flex items-center gap-2 ${space.className} text-xl font-black tracking-tighter text-white italic mb-10`}>
            <ShieldCheck className="text-[#10B981]" size={24} />
            SECURE<span className="text-[#10B981]">SENT</span>
          </div>
          <p className={`text-[#555555] text-[10px] max-w-xs leading-loose font-black uppercase tracking-[0.2em] ${mono.className}`}>The global standard for professional encrypted communication and high-energy vault analytics. Secure-first since 2026.</p>
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
        <div className={`${mono.className} text-[8px] text-[#555555] uppercase tracking-[0.5em] font-black`}>© 2026 SECURESENT HUB CORP. VAULT_ENCRYPTED.</div>
        <div className="flex gap-10">
           <Zap className="text-[#555555] hover:text-[#10B981] cursor-pointer" size={18} />
           <Globe className="text-[#555555] hover:text-[#10B981] cursor-pointer" size={18} />
        </div>
      </div>
    </div>
  </footer>
)

const Timer = ({ className, size }: any) => <Clock className={className} size={size} />
import { Clock } from 'lucide-react'

export default function SecureSent() {
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
          <filter id="secure-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.95" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100" height="100" filter="url(#secure-noise)" />
        </svg>
      </div>
      
      </div>
  )
}
