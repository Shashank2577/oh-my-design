'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Terminal, 
  Target, 
  Cpu, 
  Zap, 
  Shield, 
  TrendingUp, 
  Share2, 
  MessageSquare, 
  ChevronRight,
  Monitor,
  Award,
  Wifi
} from 'lucide-react'
import { Orbitron, JetBrains_Mono, Inter } from 'next/font/google'

const orbitron = Orbitron({ subsets: ['latin'], weight: ['400', '900'] })
const mono = JetBrains_Mono({ subsets: ['latin'] })
const inter = Inter({ subsets: ['latin'] })

// --- Design Tokens ---
const tokens = {
  colors: {
    background: "#0B0E11",
    surface: "#161B22",
    accent1: "#00F3FF", // Cyan Neon
    accent2: "#FF00F5", // Magenta Pulse
    border: "rgba(0, 243, 255, 0.2)",
    textHigh: "#00F3FF",
    textLow: "#586069"
  },
  physics: {
    mechanical: { type: "spring", stiffness: 600, damping: 30 },
    glitch: {
      x: [0, -2, 2, 0],
      opacity: [1, 0.8, 0.9, 1],
      transition: { repeat: Infinity, duration: 0.2, repeatDelay: 5 }
    }
  }
}


// --- Components ---

const FragButton = ({ children, variant = 'primary', className = '' }: any) => (
  <motion.button
    whileHover={{ skewX: -10, scale: 1.05, boxShadow: `0 0 20px ${variant === 'primary' ? tokens.colors.accent1 : tokens.colors.accent2}` }}
    whileTap={{ scale: 0.95 }}
    className={`px-8 py-3 ${orbitron.className} text-sm font-black tracking-widest relative group overflow-hidden ${
      variant === 'primary' 
        ? `bg-[#00F3FF] text-black` 
        : `bg-transparent text-[#FF0055] border-2 border-[#FF0055]`
    } ${className}`}
    style={{ clipPath: 'polygon(10% 0, 100% 0, 90% 100%, 0% 100%)' }}
  >
    <span className="relative z-10 flex items-center gap-2 uppercase">{children}</span>
    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
  </motion.button>
)

const HUDCard = ({ children, className = '' }: any) => (
  <motion.div
    initial={{ opacity: 0, skewY: 2 }}
    whileInView={{ opacity: 1, skewY: 0 }}
    viewport={{ once: true }}
    whileHover={{ scale: 1.02 }}
    className={`bg-[#161B22]/80 border border-[${tokens.colors.border}] p-8 relative overflow-hidden group ${className}`}
    style={{ borderColor: tokens.colors.border }}
  >
    <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#00F3FF] opacity-50" />
    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#00F3FF] opacity-50" />
    <div className="absolute inset-0 bg-gradient-to-br from-[#00F3FF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    {children}
  </motion.div>
)

// --- Sections ---

const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 border-b border-[#00F3FF]/20 bg-[#0B0E11]/90 backdrop-blur-xl px-6 py-4">
    <div className="max-w-7xl mx-auto flex items-center justify-between">
      <div className={`flex items-center gap-2 ${orbitron.className} text-2xl font-black italic tracking-tighter text-[#00F3FF]`}>
        <Target size={28} />
        FRAG<span className="text-white">LINE</span>
      </div>
      <div className="hidden md:flex items-center gap-8 text-[#586069] font-bold text-[10px] tracking-[0.3em] uppercase">
        {['Roster', 'Matches', 'Stats', 'Gear'].map(item => (
          <a key={item} href="#" className="hover:text-[#00F3FF] transition-colors">{item}</a>
        ))}
      </div>
      <FragButton className="hidden md:block py-2 text-[10px]">AUTH_TERMINAL</FragButton>
    </div>
  </nav>
)

const Hero = () => {
  const [glitch, setGlitch] = useState(false)
  
  useEffect(() => {
    const interval = setInterval(() => setGlitch(prev => !prev), 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="pt-32 pb-20 px-6 relative overflow-hidden min-h-screen flex items-center">
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div className="w-full h-full bg-[linear-gradient(rgba(0,243,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,243,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>
      
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={tokens.physics.mechanical as any}
        >
          <motion.div 
            animate={glitch ? (tokens.physics.glitch as any) : {}}
            className={`inline-block mb-6 px-4 py-1 border border-[#00F3FF] text-[#00F3FF] ${mono.className} text-xs tracking-widest bg-[#00F3FF]/5`}
          >
            [ SYSTEM_INITIALIZED_V3.0 ]
          </motion.div>
          <h1 className={`${orbitron.className} text-7xl md:text-9xl font-black text-white leading-[0.8] mb-8 uppercase italic`}>
            DIGITAL <br/> <span className="text-[#00F3FF] drop-shadow-[0_0_20px_#00F3FF]">DOMINANCE.</span>
          </h1>
          <p className={`text-[#586069] text-lg max-w-xl mb-12 leading-relaxed ${inter.className}`}>
            FragLine is the ultimate HUD for elite eSports organizations. Real-time telemetry, kill-feed analytics, and holographic roster management.
          </p>
          <div className="flex flex-wrap gap-6">
            <FragButton>EXECUTE_PROTOCOL</FragButton>
            <FragButton variant="secondary">VIEW_LIVE_GRID</FragButton>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9, skewY: 10 }}
          animate={{ opacity: 1, scale: 1, skewY: 0 }}
          transition={{ ...(tokens.physics.mechanical as any), delay: 0.2 }}
          className="relative"
        >
          <div className="relative z-10 border border-[#00F3FF]/30 bg-[#161B22]/60 backdrop-blur-3xl p-6 rounded-sm overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#00F3FF]/10 to-[#FF0055]/10 opacity-50" />
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#00F3FF]/20">
              <div className="flex items-center gap-3">
                <Monitor className="text-[#00F3FF]" size={20} />
                <div className={`${mono.className} text-[10px] text-[#00F3FF] font-bold`}>TERMINAL://LIVE_FEED_01</div>
              </div>
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-[#FF0055] animate-pulse" />
                <div className="w-2 h-2 bg-[#00F3FF]" />
              </div>
            </div>
            
            <div className="space-y-4 mb-8">
              {[
                { time: '14:22:04', event: 'SYSTEM_READY', status: 'OK' },
                { time: '14:22:05', event: 'SYNC_MATCH_DATA', status: 'IN_PROGRESS' },
                { time: '14:22:08', event: 'ROSTER_ACTIVE', status: 'VERIFIED' }
              ].map((log, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.2 }}
                  className={`flex items-center justify-between ${mono.className} text-[10px]`}
                >
                  <span className="text-[#586069]">{log.time}</span>
                  <span className="text-white font-bold">{log.event}</span>
                  <span className={log.status === 'OK' || log.status === 'VERIFIED' ? 'text-[#00F3FF]' : 'text-[#FF0055]'}>{log.status}</span>
                </motion.div>
              ))}
            </div>
            
            <div className="relative h-48 bg-black/60 rounded border border-[#00F3FF]/10 overflow-hidden">
               <div className="absolute inset-0 flex items-center justify-center">
                  <Target className="text-[#00F3FF]/20" size={120} />
               </div>
               <motion.div 
                animate={{ y: [0, 180, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#00F3FF] to-transparent shadow-[0_0_10px_#00F3FF]" 
               />
               <div className="absolute inset-0 p-4">
                  <div className={`${mono.className} text-[8px] text-[#00F3FF] opacity-50 space-y-1`}>
                    <div>LATENCY: 14MS</div>
                    <div>FPS: 240</div>
                    <div>PACKET_LOSS: 0%</div>
                  </div>
               </div>
            </div>
          </div>
          
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#00F3FF]/20 rounded-full blur-[80px] animate-pulse" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#FF0055]/20 rounded-full blur-[80px] animate-pulse delay-1000" />
        </motion.div>
      </div>
    </section>
  )
}

const StatsBar = () => (
  <section className="py-12 border-y border-[#00F3FF]/10 bg-black/40">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {[
          { label: 'Active Org', value: '140+', icon: Shield },
          { label: 'Live Data', value: '4.2TB/s', icon: Wifi },
          { label: 'Win Rate', value: '92.4%', icon: TrendingUp },
          { label: 'Hardware Sync', value: '<1MS', icon: Cpu }
        ].map((stat, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -5, color: tokens.colors.accent1 }}
            className="flex flex-col items-center text-center group"
          >
            <stat.icon className="text-[#586069] group-hover:text-[#00F3FF] mb-3 transition-colors" size={20} />
            <div className={`${orbitron.className} text-3xl font-black text-white`}>{stat.value}</div>
            <div className={`${mono.className} text-[8px] text-[#586069] uppercase tracking-[0.4em] font-bold mt-2`}>{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)

const Features = () => (
  <section className="py-24 px-6 bg-[#0B0E11]">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
        <div>
          <h2 className={`${orbitron.className} text-5xl md:text-6xl font-black text-white mb-4 italic`}>HUD_MODULES</h2>
          <p className={`text-[#586069] max-w-xl ${inter.className}`}>Deploy mission-critical interfaces for professional competitive gaming.</p>
        </div>
        <FragButton variant="secondary" className="md:mb-2 text-[10px]">ALL_SYSTEMS</FragButton>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {[
          { title: 'Kill-Feed Timeline', desc: 'Real-time vertical match events with terminal-style scrolling and instant highlight triggers.', icon: Terminal },
          { title: 'Reticle Cursor', desc: 'Custom targeting reticle cursor that interacts with UI elements via physics-based pulses.', icon: Target },
          { title: 'Holographic Cards', desc: '3D mouse-responsive glass cards with animated RGB splitting and glitching overlays.', icon: Monitor },
          { title: 'System Boot Sequence', desc: 'High-impact initialization sequence for first-load engagement and branding.', icon: Cpu },
          { title: 'Scanning Inputs', desc: 'Mechanical input fields with vertical laser-scan line animations during focus states.', icon: Zap },
          { title: 'Achievement Trophies', desc: 'Digital asset gallery with high-contrast strobe reveals and victory-glow effects.', icon: Award }
        ].map((feature, i) => (
          <HUDCard key={i}>
            <feature.icon className="text-[#00F3FF] mb-6" size={32} />
            <h3 className={`${orbitron.className} text-xl font-black text-white mb-3 italic uppercase`}>{feature.title}</h3>
            <p className={`text-[#586069] text-xs leading-relaxed ${inter.className}`}>{feature.desc}</p>
          </HUDCard>
        ))}
      </div>
    </div>
  </section>
)

const ProductDetail = () => (
  <section className="py-24 px-6 relative">
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-20 items-center">
        <div className="order-2 lg:order-1 relative">
           <div className="aspect-video bg-white/5 border border-[#00F3FF]/20 rounded p-4 relative overflow-hidden group">
              <div className="absolute inset-0 bg-[#00F3FF]/5 group-hover:opacity-100 opacity-0 transition-opacity" />
              <div className="absolute top-4 left-4 ${mono.className} text-[8px] text-[#00F3FF]">FILE_VIEWER: SCHEMA_V3.SVG</div>
              <div className="w-full h-full border border-dashed border-[#00F3FF]/30 rounded flex items-center justify-center">
                 <Target className="text-[#00F3FF]/40 animate-spin-slow" size={100} />
              </div>
           </div>
           <motion.div 
            animate={{ x: [0, 20, 0], y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute -top-6 -right-6 bg-[#FF0055] text-white p-4 rounded-sm shadow-2xl skew-x-12"
           >
              <div className={`${orbitron.className} text-xl font-black`}>99.9% UPTIME</div>
           </motion.div>
        </div>
        <div className="order-1 lg:order-2">
          <div className={`${mono.className} text-[#FF0055] text-[10px] tracking-[0.5em] font-bold mb-6 uppercase`}>[ CORE_ARCHITECTURE ]</div>
          <h2 className={`${orbitron.className} text-5xl md:text-6xl font-black text-white mb-8 italic uppercase leading-[0.9]`}>ENGINEERED FOR <br/><span className="text-[#00F3FF]">VICTORY.</span></h2>
          <div className={`space-y-6 text-[#586069] text-lg leading-relaxed ${inter.className}`}>
            <p>FragLine is not just a theme; it is a weapon. Built on a zero-latency frame-sync architecture, it ensures your roster and match data are always in phase with reality.</p>
            <p>Every pixel is optimized for high-stakes broadcast and professional scouting environments, utilizing mechanical spring physics and kinetic depth to maintain focus.</p>
          </div>
          <FragButton className="mt-12">INITIALIZE_NODE</FragButton>
        </div>
      </div>
    </div>
  </section>
)

const Pricing = () => (
  <section className="py-24 px-6 bg-[#0B0E11]">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <h2 className={`${orbitron.className} text-5xl font-black text-white mb-4 italic`}>LICENSE_PROTOCOLS</h2>
        <p className={`text-[#586069] ${inter.className}`}>Choose your level of operational integration.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {[
          { name: 'Rookie', price: '$0', features: ['3 Team Slots', 'Standard HUD', 'Basic Analytics', 'Public API'] },
          { name: 'Pro_Line', price: '$49', features: ['Unlimited Teams', 'Custom Glitch FX', 'Live Ticker Support', 'Private API', 'Priority Sync'], highlight: true },
          { name: 'Org_Overlord', price: '$199', features: ['White-label HUD', 'Full Source Access', 'Dedicated Node', '24/7 Terminal Support', 'Quantum Crypto'] }
        ].map((tier, i) => (
          <HUDCard key={i} className={tier.highlight ? 'border-[#FF0055] ring-1 ring-[#FF0055]/30' : ''}>
            <div className={`${orbitron.className} text-xl font-black text-white mb-2 uppercase`}>{tier.name}</div>
            <div className="flex items-baseline gap-2 mb-8">
              <span className={`${orbitron.className} text-5xl font-black text-white`}>{tier.price}</span>
              <span className={`${mono.className} text-[10px] text-[#586069]`}>/ CYCLE</span>
            </div>
            <ul className="space-y-4 mb-12">
              {tier.features.map(f => (
                <li key={f} className="flex items-center gap-3 text-[10px] text-[#586069] font-bold uppercase tracking-widest">
                  <ChevronRight size={12} className="text-[#00F3FF]" />
                  {f}
                </li>
              ))}
            </ul>
            <FragButton className="w-full" variant={tier.highlight ? 'secondary' : 'primary'}>SELECT_PROTOCOL</FragButton>
          </HUDCard>
        ))}
      </div>
    </div>
  </section>
)

const Testimonials = () => (
  <section className="py-24 px-6 relative bg-black/20">
    <div className="max-w-7xl mx-auto text-center">
      <h2 className={`${orbitron.className} text-5xl font-black text-white mb-20 italic`}>COMMS_LOGS</h2>
      <div className="grid md:grid-cols-3 gap-12">
        {[
          { name: 'X_Ghost_X', role: 'Captain', company: 'Neon Knights', quote: 'The HUD responsiveness is insane. Every kill-feed update feels immediate and tactile.' },
          { name: 'Vortex_Manager', role: 'GM', company: 'Titan eSports', quote: 'FragLine simplified our talent tracking. The 3D roster view is a game changer for drafting.' },
          { name: 'Code_Runner', role: 'Developer', company: 'StreamStack', quote: 'Integrating the FragLine API was effortless. Their mechanical physics engine is top tier.' }
        ].map((t, i) => (
          <div key={i} className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#00F3FF] to-[#FF0055] rounded blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
            <div className="relative p-8 bg-[#161B22] border border-white/5 rounded flex flex-col items-center">
              <p className={`text-white text-lg font-bold mb-8 leading-relaxed italic ${inter.className}`}>"{t.quote}"</p>
              <div className={`${orbitron.className} text-sm text-[#00F3FF] font-black`}>{t.name}</div>
              <div className={`${mono.className} text-[8px] text-[#586069] font-bold mt-1`}>{t.role} | {t.company}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
)

const FAQ = () => {
  const [open, setOpen] = useState(0)
  return (
    <section className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className={`${orbitron.className} text-5xl font-black text-white mb-16 text-center italic`}>TERMINAL_FAQ</h2>
        <div className="space-y-4">
          {[
            { q: 'Is FragLine compatible with OBS?', a: 'Yes. Our HUDs are optimized for low-resource browser sources and can be directly integrated into OBS or vMix.' },
            { q: 'What is Mechanical Spring Physics?', a: 'It refers to our animation engine which mimics physical weight and momentum for UI elements, ensuring a tactile response.' },
            { q: 'Can I custom-brand the terminal?', a: 'Org_Overlord tier allows full CSS overrides and SVG injection for custom branding and color schemes.' },
            { q: 'Does it support live telemetry?', a: 'Absolutely. We provide WebSocket integration for CS2, Valorant, and League of Legends telemetry data.' }
          ].map((item, i) => (
            <div key={i} className={`bg-[#161B22]/50 border border-[#00F3FF]/10 rounded-sm overflow-hidden transition-all duration-300 ${open === i ? 'border-[#00F3FF]/40' : ''}`}>
              <button 
                onClick={() => setOpen(open === i ? -1 : i)}
                className="w-full p-6 flex items-center justify-between text-left"
              >
                <span className={`${orbitron.className} text-sm text-white font-black uppercase tracking-widest`}>{item.q}</span>
                <ChevronRight className={`text-[#00F3FF] transition-transform ${open === i ? 'rotate-90' : ''}`} />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className={`px-6 pb-6 text-[#586069] text-xs font-bold leading-relaxed ${mono.className}`}
                  >
                    {item.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const Newsletter = () => (
  <section className="py-24 px-6 border-y border-[#00F3FF]/10 bg-black/60 relative overflow-hidden">
    <div className="absolute top-0 right-0 p-8 opacity-5">
      <Target size={300} className="text-[#00F3FF]" />
    </div>
    <div className="max-w-4xl mx-auto text-center relative z-10">
      <div className={`inline-block mb-6 px-4 py-1 border border-[#FF0055] text-[#FF0055] ${mono.className} text-[8px] font-black uppercase tracking-[0.5em] bg-[#FF0055]/5`}>
        [ CONNECTION_READY ]
      </div>
      <h2 className={`${orbitron.className} text-6xl md:text-8xl font-black text-white mb-8 italic uppercase`}>RECEIVE_DECOY.</h2>
      <p className={`text-[#586069] mb-12 max-w-xl mx-auto text-lg ${inter.className}`}>Join the network of 140+ organizations receiving real-time HUD updates and meta shifts.</p>
      <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
        <input 
          type="email" 
          placeholder="USER_ID@NETWORK.NODE" 
          className={`flex-1 bg-black/40 border border-[#00F3FF]/30 rounded-sm px-6 py-4 text-[#00F3FF] focus:outline-none focus:border-[#00F3FF] transition-colors ${mono.className} text-xs font-black`}
        />
        <FragButton>CONNECT</FragButton>
      </div>
    </div>
  </section>
)

const Footer = () => (
  <footer className="py-20 px-6 bg-[#0B0E11]">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-16">
        <div className="col-span-2">
           <div className={`flex items-center gap-2 ${orbitron.className} text-2xl font-black italic tracking-tighter text-[#00F3FF] mb-6`}>
            <Target size={28} />
            FRAG<span className="text-white">LINE</span>
          </div>
          <p className={`text-[#586069] text-[10px] max-w-xs leading-loose font-bold uppercase tracking-[0.2em] ${mono.className}`}>The global standard for professional eSports broadcast HUDs and roster analytics. Mission-critical and zero-latency.</p>
        </div>
        {[
          { title: 'Protocols', links: ['HUD_Engine', 'Telemetry', 'Broadcast', 'Pricing'] },
          { title: 'Security', links: ['Encryption', 'Nodes', 'Legal', 'Privacy'] },
          { title: 'Comms', links: ['Discord', 'Terminal', 'GitHub', 'Mainframe'] }
        ].map(group => (
          <div key={group.title}>
            <div className={`${orbitron.className} text-xs font-black text-white mb-6 uppercase tracking-widest`}>{group.title}</div>
            <ul className="space-y-4">
              {group.links.map(link => (
                <li key={link}><a href="#" className={`${mono.className} text-[8px] text-[#586069] font-black uppercase tracking-[0.3em] hover:text-[#00F3FF] transition-colors`}>{link}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="pt-8 border-t border-[#00F3FF]/10 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className={`${mono.className} text-[8px] text-[#586069] uppercase tracking-[0.5em] font-black`}>© 2026 FRAGLINE SYSTEMS. BROADCAST_ENCRYPTED.</div>
        <div className="flex gap-6">
           <Zap className="text-[#586069] hover:text-[#00F3FF] cursor-pointer" size={16} />
           <Cpu className="text-[#586069] hover:text-[#FF0055] cursor-pointer" size={16} />
        </div>
      </div>
    </div>
  </footer>
)

export default function FragLine() {
  return (
    <div className={`min-h-screen bg-[#0B0E11] text-white overflow-x-hidden ${inter.className}`}>
      <Navbar />
      <Hero />
      <StatsBar />
      <Features />
      <ProductDetail />
      <Pricing />
      <Testimonials />
      <FAQ />
      <Newsletter />
      <Footer />
      
      {/* --- Global Effects --- */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.05] contrast-150 mix-blend-screen">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.95" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100" height="100" filter="url(#noise)" />
        </svg>
      </div>
      
      </div>
  )
}
