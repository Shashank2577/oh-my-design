'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { 
  Mail, 
  Send, 
  Inbox, 
  Users, 
  Zap, 
  Activity, 
  ChevronDown, 
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Globe,
  Bell,
  RefreshCw,
  Search,
  Layout,
  Layers,
  Sparkles,
  Cpu,
  Clock
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
    accent1: "#3B82F6", // Inbox Blue
    accent2: "#FACC15", // Delivery Gold
    border: "#1A1A1A",
    textHigh: "#FFFFFF",
    textLow: "#666666"
  },
  physics: {
    wave: { type: "spring" as any, stiffness: 100, damping: 20, mass: 1.5 }
  }
}

// --- Components ---

const ElevateButton = ({ children, variant = 'primary', className = '' }: any) => (
  <motion.button
    whileHover={{ scale: 1.02, backgroundColor: variant === 'primary' ? '#3B82F6' : '#1A1A1A' }}
    whileTap={{ scale: 0.98 }}
    className={`px-8 py-4 ${space.className} text-xs font-black tracking-widest relative group overflow-hidden border ${
      variant === 'primary' 
        ? `bg-[#3B82F6] text-white border-[#3B82F6]` 
        : `bg-transparent text-white border-[#1A1A1A]`
    } ${className}`}
  >
    <span className="relative z-10 flex items-center justify-center gap-2 uppercase italic">
      {children}
      <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
    </span>
    <div className="absolute top-0 left-0 w-full h-full bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
  </motion.button>
)

const MessageCard = ({ children, className = '', title = '' }: any) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    whileHover={{ x: 5, borderColor: '#3B82F6' }}
    className={`bg-[#0F0F0F] border border-[#1A1A1A] p-8 relative group overflow-hidden ${className}`}
  >
    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-20 transition-opacity">
      <Mail size={80} strokeWidth={1} />
    </div>
    {title && <div className={`${mono.className} text-[8px] font-bold text-[#3B82F6] uppercase tracking-[0.4em] mb-6`}>{title}</div>}
    {children}
  </motion.div>
)

// --- Sections ---

const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 bg-[#050505]/80 backdrop-blur-xl px-8 py-6 border-b border-white/5">
    <div className="max-w-7xl mx-auto flex items-center justify-between">
      <div className={`flex items-center gap-3 ${space.className} text-xl font-black tracking-tighter text-white italic`}>
        <Mail className="text-[#3B82F6]" size={24} />
        EMAIL<span className="text-[#3B82F6]">ELEVATE</span>
      </div>
      <div className="hidden md:flex items-center gap-10 text-[#666666] font-bold text-[10px] tracking-[0.4em] uppercase">
        {['The Flow', 'Delivery', 'Nodes', 'Connect'].map(item => (
          <a key={item} href="#" className="hover:text-[#3B82F6] transition-colors">{item}</a>
        ))}
      </div>
      <ElevateButton className="hidden md:block py-2 text-[10px]" variant="secondary">AUTH_NODE</ElevateButton>
    </div>
  </nav>
)

const Hero = () => {
  const [messages, setMessages] = useState<any[]>([])
  
  useEffect(() => {
    const interval = setInterval(() => {
      const newMsg = {
        id: Math.random().toString(36).substr(2, 9),
        status: Math.random() > 0.3 ? 'DELIVERED' : 'PENDING'
      }
      setMessages(prev => [newMsg, ...prev].slice(0, 5))
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="pt-40 pb-20 px-8 relative overflow-hidden min-h-screen flex items-center bg-black">
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="w-full h-full bg-[radial-gradient(circle_at_50%_50%,_#3B82F611_0%,_transparent_70%)]" />
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
          transition={tokens.physics.wave}
        >
          <div className="flex items-center gap-3 mb-10">
            <div className="w-2 h-2 bg-[#3B82F6] rounded-full animate-ping" />
            <span className={`text-[10px] font-black text-[#3B82F6] tracking-[0.5em] uppercase ${mono.className}`}>Protocol_Ready_v3.0</span>
          </div>
          <h1 className={`${space.className} text-7xl md:text-[10rem] font-black text-white leading-[0.8] mb-12 uppercase italic tracking-tighter`}>
            SEND THE <br/> <span className="text-[#3B82F6] drop-shadow-[0_0_30px_#3B82F6]">PULSE.</span>
          </h1>
          <p className={`text-[#666666] text-xl max-w-xl mb-16 leading-relaxed font-medium ${inter.className}`}>
            EmailElevate is the high-fidelity delivery engine for modern digital communication. Orchestrate millions of messages with sub-ms multi-device sync.
          </p>
          <div className="flex flex-wrap gap-8">
            <ElevateButton>INITIALIZE_FLOW</ElevateButton>
            <div className={`flex items-center gap-4 text-white font-black tracking-widest text-[10px] cursor-pointer group`}>
              VIEW_DELIVERY_HUB <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform text-[#3B82F6]" />
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
            <div className="absolute inset-0 bg-[#3B82F6]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center justify-between mb-16 border-b border-[#1A1A1A] pb-6">
              <div className={`${mono.className} text-[10px] text-[#3B82F6] font-bold tracking-widest`}>DELIVERY_NODE_ID: 8492-Z</div>
              <Activity className="text-[#3B82F6]" size={18} />
            </div>
            <div className="space-y-6 relative z-10">
              <AnimatePresence mode="popLayout">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex items-center justify-between p-4 bg-black/40 border border-[#1A1A1A]"
                  >
                    <div className="flex items-center gap-4">
                      <Mail size={14} className="text-[#3B82F6]" />
                      <div className={`${mono.className} text-[10px] text-white`}>MSG_{msg.id}</div>
                    </div>
                    <div className={`text-[8px] font-black uppercase tracking-widest ${msg.status === 'DELIVERED' ? 'text-[#10B981]' : 'text-[#FACC15]'}`}>
                      {msg.status}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            <div className="mt-16 flex items-center justify-between p-6 bg-black/20 border border-[#1A1A1A] rounded-sm">
               <div className="flex items-center gap-4">
                  <RefreshCw className="text-[#3B82F6] animate-spin-slow" size={18} />
                  <div>
                    <div className="text-[10px] font-black text-white uppercase tracking-widest">Global Sync Active</div>
                    <div className="text-[8px] text-[#666666] uppercase tracking-widest">Sub-ms Multi-Device Lag</div>
                  </div>
               </div>
               <TrendingUp className="text-[#10B981]" size={24} />
            </div>
          </div>
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-10 -right-10 opacity-20 pointer-events-none"
          >
            <RefreshCw size={200} className="text-[#3B82F6]" />
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
          { label: 'Messages Sent', value: '4.8B+', icon: Send },
          { label: 'Avg Latency', value: '4.2MS', icon: Timer },
          { label: 'Uptime Score', value: '99.9%', icon: ShieldCheck },
          { label: 'Daily Nodes', value: '850', icon: Zap }
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
  <section className="py-32 px-8 bg-[#020202]">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-12">
        <div>
          <h2 className={`${space.className} text-6xl font-black text-white mb-6 uppercase italic tracking-tighter`}>FLOW_MODULES</h2>
          <p className={`text-[#666666] max-w-xl ${inter.className}`}>Deploy high-frequency delivery infrastructure for professional digital communication.</p>
        </div>
        <ElevateButton variant="secondary" className="md:mb-4 text-[10px]">ALL_SYSTEMS_VIEW</ElevateButton>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {[
          { title: 'Zero-Drift Sync', desc: 'A proprietary clock-sync architecture that eliminates message drift across multi-device networks.', icon: RefreshCw },
          { title: 'Pulse Analytics', desc: 'Real-time undulation analytics mapping global message patterns across the digital grid.', icon: Activity },
          { title: 'Broadcast Relay', desc: 'Low-resource UI components designed for direct television and streaming integration.', icon: Globe },
          { title: 'Secure Vault', desc: 'Onyx-grade 256-bit encryption for proprietary delivery-logic and message telemetry.', icon: ShieldCheck },
          { title: 'Latency Guard', desc: 'AI-driven predictive shunting that anticipates and corrects network spikes instantly.', icon: Zap },
          { title: 'Inbox History', desc: 'A modular dashboard for tracking historical delivery-accuracy and node performance.', icon: Inbox }
        ].map((feature, i) => (
          <MessageCard key={i} title={`PROTOCOL_0${i + 1}`}>
            <div className="w-16 h-16 bg-[#3B82F6]/5 rounded-full flex items-center justify-center mb-10">
              <feature.icon className="text-[#3B82F6]" size={32} />
            </div>
            <h3 className={`${space.className} text-xl font-bold text-white mb-4 uppercase tracking-tighter italic`}>{feature.title}</h3>
            <p className={`text-[#666666] text-xs leading-relaxed ${inter.className}`}>{feature.desc}</p>
          </MessageCard>
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
           <div className="aspect-video bg-[#0A0A0A] border border-[#1A1A1A] p-10 relative overflow-hidden">
              <div className="absolute inset-0 bg-[#3B82F6]/5 group-hover:opacity-100 opacity-0 transition-opacity" />
              <div className="w-full h-full border border-dashed border-[#3B82F6]/20 rounded-sm flex items-center justify-center">
                 <Cpu className="text-[#3B82F6]/20 animate-spin-slow" size={150} />
              </div>
              <motion.div 
                animate={{ y: [0, 400, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                className="absolute top-0 left-0 w-0.5 h-full bg-[#3B82F6] shadow-[0_0_15px_#3B82F6]"
              />
           </div>
           <div className="absolute -bottom-8 -left-8 bg-white text-black p-8 rounded-sm shadow-2xl rotate-6">
              <div className={`${mono.className} text-xl font-black`}>SYNC_CERTIFIED</div>
           </div>
        </div>
        <div className="order-1 lg:order-2">
          <div className={`${mono.className} text-[#3B82F6] text-[10px] tracking-[0.5em] font-bold mb-10 uppercase`}>[ HUB_ARCHITECTURE ]</div>
          <h2 className={`${space.className} text-6xl font-black text-white mb-10 italic uppercase leading-[0.9] tracking-tighter`}>IN PHASE WITH <br/><span className="text-[#3B82F6]">REALITY.</span></h2>
          <div className={`space-y-8 text-[#666666] text-xl leading-relaxed ${inter.className}`}>
            <p>Traditional message updates are delayed. EmailElevate is immediate. We treat every message signal as a unit of value, moving at the speed of human potential to ensure your ecosystem is in perfect phase.</p>
            <p>Our implementation of zero-drift physics and rhythmic transitions ensures that the communication legacy is as powerful as the play.</p>
          </div>
          <ElevateButton className="mt-12">CONNECT_MAIN_SYNC</ElevateButton>
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
            <Mail className="text-[#3B82F6]" size={28} />
            EMAIL<span className="text-[#3B82F6]">ELEVATE</span>
          </div>
          <p className={`text-[#666666] text-[10px] max-w-xs leading-loose font-black uppercase tracking-[0.2em] ${mono.className}`}>The global standard for sub-ms multi-device synchronization and high-energy message stream analytics. Professional since 2026.</p>
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
                <li key={link}><a href="#" className={`${mono.className} text-[8px] text-[#666666] font-black uppercase tracking-[0.3em] hover:text-[#3B82F6] transition-colors`}>{link}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="pt-12 border-t border-[#1A1A1A] flex flex-col md:flex-row justify-between items-center gap-10">
        <div className={`${mono.className} text-[8px] text-[#666666] uppercase tracking-[0.5em] font-black`}>© 2026 EMAILELEVATE HUB CORP. BROADCAST_ENCRYPTED.</div>
        <div className="flex gap-10">
           <Zap className="text-[#666666] hover:text-[#3B82F6] cursor-pointer" size={18} />
           <Globe className="text-[#666666] hover:text-[#3B82F6] cursor-pointer" size={18} />
        </div>
      </div>
    </div>
  </footer>
)

const Timer = ({ className, size }: any) => <Clock className={className} size={size} />

export default function EmailElevate() {
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
          <filter id="elevate-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.95" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100" height="100" filter="url(#elevate-noise)" />
        </svg>
      </div>
      
      </div>
  )
}
