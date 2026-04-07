'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { 
  Cpu, 
  MessageSquare, 
  Zap, 
  Activity, 
  TrendingUp, 
  ShieldCheck, 
  ChevronDown, 
  ArrowRight,
  Bot,
  Users,
  Signal,
  Globe,
  Network,
  Radio,
  Sparkles,
  Terminal,
  Code2,
  Share2
} from 'lucide-react'
import { JetBrains_Mono, Inter, Outfit } from 'next/font/google'

const mono = JetBrains_Mono({ subsets: ['latin'] })
const inter = Inter({ subsets: ['latin'] })
const outfit = Outfit({ subsets: ['latin'] })

// --- Design Tokens ---
const tokens = {
  colors: {
    background: "#020408",
    surface: "#0A0D14",
    accent1: "#6366F1", // Neural Indigo
    accent2: "#10B981", // Synapse Green
    border: "rgba(99, 102, 241, 0.1)",
    glow: "rgba(99, 102, 241, 0.4)",
    textHigh: "#F8FAFC",
    textLow: "#94A3B8"
  },
  physics: {
    stream: { type: "spring" as any, stiffness: 200, damping: 30, mass: 1 },
    pulse: { scale: [1, 1.1, 1], transition: { duration: 3, repeat: Infinity } }
  }
}

// --- Components ---

const BotButton = ({ children, variant = 'primary', className = '' }: any) => (
  <motion.button
    whileHover={{ scale: 1.02, boxShadow: `0 0 30px ${variant === 'primary' ? tokens.colors.glow : 'rgba(255,255,255,0.05)'}` }}
    whileTap={{ scale: 0.98 }}
    className={`px-8 py-4 rounded-xl ${outfit.className} font-bold transition-all relative overflow-hidden group ${
      variant === 'primary' 
        ? `bg-gradient-to-r from-[#6366F1] to-[#10B981] text-white` 
        : `bg-[#0A0D14] text-white border border-[${tokens.colors.border}]`
    } ${className}`}
  >
    <span className="relative z-10 flex items-center justify-center gap-2 uppercase tracking-widest text-xs">{children}</span>
    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
  </motion.button>
)

const StreamCard = ({ children, className = '', title = '' }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={`bg-[#0A0D14] border border-white/5 p-8 rounded-2xl relative group overflow-hidden ${className}`}
  >
    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#6366F1] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    {title && <div className={`${mono.className} text-[8px] font-bold text-[#6366F1] uppercase tracking-[0.4em] mb-6`}>{title}</div>}
    {children}
  </motion.div>
)

// --- Sections ---

const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 bg-[#020408]/80 backdrop-blur-xl px-8 py-6 border-b border-white/5">
    <div className="max-w-7xl mx-auto flex items-center justify-between">
      <div className={`flex items-center gap-2 ${outfit.className} text-xl font-black tracking-tight text-white uppercase`}>
        <div className="w-8 h-8 bg-gradient-to-tr from-[#6366F1] to-[#10B981] rounded-lg flex items-center justify-center">
          <Bot className="text-white" size={18} />
        </div>
        BOT<span className="text-[#6366F1]">STREAM</span>
      </div>
      <div className="hidden md:flex items-center gap-10 text-[#94A3B8] font-bold text-[10px] tracking-[0.4em] uppercase">
        {['Streams', 'Logic', 'Nodes', 'Mainframe'].map(item => (
          <a key={item} href="#" className="hover:text-white transition-colors">{item}</a>
        ))}
      </div>
      <BotButton className="hidden md:block py-2 text-[10px]" variant="secondary">AUTH_TERMINAL</BotButton>
    </div>
  </nav>
)

const Hero = () => {
  return (
    <section className="pt-40 pb-20 px-8 relative overflow-hidden min-h-screen flex items-center bg-[#020408]">
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[800px] bg-[#6366F1]/10 rounded-full blur-[150px]" 
        />
      </div>
      
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={tokens.physics.stream}
        >
          <div className="flex items-center gap-3 mb-10">
            <div className="w-2 h-2 bg-[#6366F1] rounded-full animate-pulse shadow-[0_0_10px_#6366F1]" />
            <span className={`text-[10px] font-black text-[#6366F1] tracking-[0.5em] uppercase ${mono.className}`}>AI_Stream_V3.0_Active</span>
          </div>
          <h1 className={`${outfit.className} text-7xl md:text-[9rem] font-black text-white leading-[0.8] mb-12 uppercase tracking-tighter`}>
            STREAM <br/> <span className="text-[#6366F1] drop-shadow-[0_0_30px_#6366F1]">LOGIC.</span>
          </h1>
          <p className={`text-[#94A3B8] text-xl max-w-xl mb-16 leading-relaxed font-medium ${inter.className}`}>
            BotStream is the high-fidelity match engine for AI agents. Orchestrate thousands of real-time message streams with precision-grade visual feedback.
          </p>
          <div className="flex flex-wrap gap-8">
            <BotButton>INITIALIZE_BOT</BotButton>
            <div className={`flex items-center gap-4 text-white font-black tracking-widest text-[10px] cursor-pointer group`}>
              VIEW_STREAM_HUD <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform text-[#6366F1]" />
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...tokens.physics.stream, delay: 0.2 }}
          className="relative"
        >
          <div className="bg-[#0A0D14] border border-white/5 p-10 rounded-[40px] shadow-[0_50px_100px_rgba(99,102,241,0.15)] relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#6366F1]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center justify-between mb-16">
              <div className={`${outfit.className} text-2xl font-black text-white`}>Active Stream HUD</div>
              <div className="flex gap-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="w-2 h-2 rounded-full bg-[#6366F1] animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                ))}
              </div>
            </div>
            <div className="space-y-8 relative z-10">
              {[
                { label: 'Token Velocity', val: '4.2K/s', color: '#6366F1' },
                { label: 'Neural Latency', val: '12ms', color: '#10B981' },
                { label: 'Sync Accuracy', val: '99.9%', color: '#00F3FF' }
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between mb-4">
                    <span className="text-xs font-black text-[#94A3B8] uppercase tracking-[0.2em]">{item.label}</span>
                    <span className="text-sm font-black text-white">{item.val}</span>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '85%' }}
                      transition={{ duration: 2, delay: 0.5 + i * 0.2 }}
                      className="h-full"
                      style={{ backgroundColor: item.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="absolute -top-10 -right-10 bg-[#6366F1] text-white p-8 rounded-[30px] shadow-2xl rotate-12"
          >
            <Sparkles size={32} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

const StatsBar = () => (
  <section className="py-24 border-y border-white/5 bg-[#020408]">
    <div className="max-w-7xl mx-auto px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-16 text-center">
        {[
          { label: 'Bot Sessions', value: '1.2M+', icon: Users },
          { label: 'Sync Uptime', value: '99.9%', icon: ShieldCheck },
          { label: 'Token Throughput', value: '4.8B', icon: Zap },
          { label: 'Global Nodes', value: '150+', icon: Globe }
        ].map((stat, i) => (
          <motion.div key={i} whileHover={{ y: -5 }}>
            <div className={`${outfit.className} text-6xl font-black text-white mb-2`}>{stat.value}</div>
            <div className="text-[#94A3B8] text-[10px] font-black uppercase tracking-[0.4em]">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)

const Features = () => (
  <section className="py-32 px-8 bg-[#020408]">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-24">
        <h2 className={`${outfit.className} text-5xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter`}>STREAM_ARCHITECTURE</h2>
        <p className={`text-[#94A3B8] max-w-2xl mx-auto text-lg leading-relaxed ${inter.className}`}>We use high-fidelity neural shunting to ensure every bot interaction is in phase with the mainframe.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {[
          { title: 'Neural Pulse HUD', desc: 'Interfaces that expand and contract based on real-time token velocity and neural load.', icon: Activity },
          { title: 'Stream Relay', desc: 'Section transitions that use high-impact vertical scrolling and motion-blur reveals.', icon: Signal },
          { title: 'Strobe Analytics', desc: 'Rhythmic, high-contrast data visualizations for bot performance and error rates.', icon: Zap },
          { title: 'Mainframe Sync', desc: 'Sub-ms multi-device synchronization for high-stakes digital bot environments.', icon: Network },
          { title: 'Private Vault', desc: 'Encrypted storage for proprietary bot-logic and historical interaction logs.', icon: ShieldCheck },
          { title: 'History Ticker', desc: 'Vertical scrolling match-timeline with high-contrast strobe reveals for key events.', icon: Terminal }
        ].map((feature, i) => (
          <StreamCard key={i} title={`PROTOCOL_0${i + 1}`}>
            <div className="w-16 h-16 bg-[#6366F1]/10 rounded-2xl flex items-center justify-center mb-10">
              <feature.icon className="text-[#6366F1]" size={32} />
            </div>
            <h3 className={`${outfit.className} text-2xl font-black text-white mb-4 uppercase tracking-tighter`}>{feature.title}</h3>
            <p className="text-[#94A3B8] text-sm leading-relaxed">{feature.desc}</p>
          </StreamCard>
        ))}
      </div>
    </div>
  </section>
)

const ProductDetail = () => (
  <section className="py-32 px-8 bg-[#0A0D14] relative overflow-hidden">
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-24 items-center">
        <div className="relative p-10 border-4 border-dashed border-[#6366F1]/20 rounded-[80px]">
          <div className="aspect-square bg-[#020408] rounded-[60px] shadow-2xl flex items-center justify-center overflow-hidden relative group">
            <motion.div 
              animate={{ scale: [1, 1.1, 1], rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#6366F111_0%,_transparent_70%)]" 
            />
            <Cpu className="text-[#6366F1]/20 animate-pulse" size={200} />
            <div className="absolute bottom-10 left-10 right-10 bg-black/90 backdrop-blur-md p-10 rounded-[40px] border border-white/5 shadow-xl">
              <div className={`${outfit.className} text-2xl font-black text-white mb-2`}>The Bot Lab</div>
              <p className="text-[#94A3B8] text-sm font-medium">Testing stream frequency across 1,400+ active AI agents.</p>
            </div>
          </div>
          <div className="absolute -top-10 -left-10 bg-[#10B981] text-black p-8 rounded-full shadow-2xl rotate-12">
            <Sparkles size={32} />
          </div>
        </div>
        <div>
          <div className={`mb-10 ${inter.className} text-[#10B981] font-black tracking-[0.5em] uppercase text-[10px]`}>[ NEURAL_SHUNTER_ENGINEERING ]</div>
          <h2 className={`${outfit.className} text-6xl font-black text-white mb-10 leading-[0.9] uppercase tracking-tighter`}>A STREAM THAT <br/> <span className="text-[#6366F1]">NEVER ENDS.</span></h2>
          <div className={`space-y-8 text-[#94A3B8] text-xl leading-relaxed ${inter.className}`}>
            <p>Traditional bot logs are static files. BotStream is immediate. We treat every message signal as a unit of value, carefully orchestrating its motion and light to ensure your bot ecosystem is always in phase.</p>
            <p>Our implementation of neural physics and rhythmic transitions ensures that the bot legacy is as powerful as the logic.</p>
          </div>
          <BotButton className="mt-12">CONNECT_MAIN_STREAM</BotButton>
        </div>
      </div>
    </div>
  </section>
)

const Footer = () => (
  <footer className="py-24 px-8 bg-black border-t border-white/5">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-16 mb-24">
        <div className="col-span-2">
          <div className={`flex items-center gap-2 ${outfit.className} text-2xl font-black tracking-tight text-white uppercase mb-8`}>
            <Bot className="text-[#6366F1]" size={28} />
            BOT<span className="text-[#6366F1]">STREAM</span>
          </div>
          <p className="text-[#94A3B8] text-sm leading-relaxed max-w-xs font-medium uppercase tracking-widest leading-loose">The global standard for professional AI bot management and high-energy message stream analytics. Technical since 2026.</p>
        </div>
        {[
          { title: 'Engine', links: ['Streams', 'Logic', 'Nodes', 'Pricing'] },
          { title: 'Foundry', links: ['The Lab', 'Mainframe', 'Careers', 'Brand'] },
          { title: 'Connect', links: ['Instagram', 'LinkedIn', 'Discord', 'Terminal'] }
        ].map(group => (
          <div key={group.title}>
            <div className="text-[10px] font-black text-white uppercase tracking-[0.4em] mb-10">{group.title}</div>
            <ul className="space-y-6">
              {group.links.map(link => (
                <li key={link}><a href="#" className="text-sm font-bold text-[#94A3B8] hover:text-[#6366F1] transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="text-[#94A3B8] text-[10px] font-black uppercase tracking-[0.6em]">© 2026 BOTSTREAM NEURAL CORP. STREAM_ENCRYPTED.</div>
        <div className="flex gap-10">
          <Activity className="text-[#94A3B8] hover:text-[#6366F1] cursor-pointer transition-colors" size={20} />
          <Radio className="text-[#94A3B8] hover:text-[#6366F1] cursor-pointer transition-colors" size={20} />
        </div>
      </div>
    </div>
  </footer>
)

export default function BotStream() {
  return (
    <div className={`min-h-screen bg-[#020408] text-white overflow-x-hidden ${inter.className}`}>
      <Navbar />
      <Hero />
      <StatsBar />
      <Features />
      <ProductDetail />
      <Footer />
      
      {/* --- Global Effects --- */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.05] contrast-150 mix-blend-overlay">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <filter id="bot-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100" height="100" filter="url(#bot-noise)" />
        </svg>
      </div>
    </div>
  )
}
