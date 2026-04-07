'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { 
  Zap, 
  Trophy, 
  Target, 
  Users, 
  TrendingUp, 
  Activity, 
  ChevronRight, 
  Shield, 
  Play,
  ArrowRight,
  Flame,
  Globe,
  Timer,
  LayoutGrid,
  Monitor
} from 'lucide-react'
import { Inter, Montserrat, JetBrains_Mono } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '900'] })
const mono = JetBrains_Mono({ subsets: ['latin'] })

// --- Design Tokens ---
const tokens = {
  colors: {
    background: "#050505",
    surface: "#111111",
    accent1: "#00FF66", // Ladder Green
    accent2: "#FFFFFF", // Strobe White
    border: "rgba(0, 255, 102, 0.2)",
    textHigh: "#FFFFFF",
    textLow: "#757575"
  },
  physics: {
    snappy: { type: "spring" as any, stiffness: 500, damping: 20 }
  }
}

// --- Components ---

const LadderButton = ({ children, variant = 'primary', className = '' }: any) => (
  <motion.button
    whileHover={{ scale: 1.05, skewX: -5 }}
    whileTap={{ scale: 0.95 }}
    className={`px-10 py-4 ${montserrat.className} font-black text-xs tracking-[0.2em] transition-all relative group overflow-hidden ${
      variant === 'primary' 
        ? `bg-[#00FF66] text-black italic` 
        : `bg-transparent text-[#00FF66] border border-[#00FF66]/30 italic`
    } ${className}`}
  >
    <span className="relative z-10 flex items-center justify-center gap-3 uppercase">
      {children}
      <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
    </span>
    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
  </motion.button>
)

const BracketCard = ({ children, className = '', title = '' }: any) => (
  <motion.div
    initial={{ opacity: 0, x: 30 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    whileHover={{ x: 5, borderColor: '#00FF66' }}
    className={`bg-[#111111] border border-white/5 p-8 relative group overflow-hidden ${className}`}
  >
    <div className="absolute left-0 top-0 w-1 h-full bg-[#00FF66] scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top" />
    {title && <div className={`${mono.className} text-[8px] font-bold text-[#00FF66] uppercase tracking-[0.4em] mb-6`}>{title}</div>}
    {children}
  </motion.div>
)

// --- Sections ---

const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/80 backdrop-blur-xl px-6 py-6">
    <div className="max-w-7xl mx-auto flex items-center justify-between">
      <div className={`flex items-center gap-2 ${montserrat.className} text-2xl font-black tracking-tighter text-white italic`}>
        <Trophy className="text-[#00FF66]" size={28} />
        LEAGUE<span className="text-[#00FF66]">LADDER</span>
      </div>
      <div className="hidden md:flex items-center gap-10 text-[#757575] font-bold text-[10px] tracking-[0.4em] uppercase">
        {['Tournaments', 'Brackets', 'Standings', 'Join'].map(item => (
          <a key={item} href="#" className="hover:text-[#00FF66] transition-colors">{item}</a>
        ))}
      </div>
      <LadderButton className="hidden md:block py-2 text-[10px]" variant="secondary">AUTH_PLAYER</LadderButton>
    </div>
  </nav>
)

const Hero = () => {
  return (
    <section className="pt-40 pb-20 px-6 relative overflow-hidden min-h-screen flex items-center bg-black">
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="w-full h-full bg-[linear-gradient(#111111_1px,transparent_1px),linear-gradient(90deg,#111111_1px,transparent_1px)] bg-[size:40px_40px]" />
        <motion.div 
          animate={{ x: [-100, 100, -100] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-0 w-full h-px bg-[#00FF66] shadow-[0_0_20px_#00FF66]" 
        />
      </div>
      
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={tokens.physics.snappy}
        >
          <div className="flex items-center gap-3 mb-10">
            <div className="px-3 py-1 bg-[#00FF66]/10 border border-[#00FF66]/30 text-[#00FF66] text-[8px] font-black tracking-widest uppercase italic">
              Tournament_Core_V3.0
            </div>
          </div>
          <h1 className={`${montserrat.className} text-7xl md:text-[10rem] font-black text-white leading-[0.8] mb-12 uppercase italic tracking-tighter`}>
            CLIMB THE <br/> <span className="text-[#00FF66] drop-shadow-[0_0_30px_#00FF66]">LADDER.</span>
          </h1>
          <p className={`text-[#757575] text-xl max-w-xl mb-16 leading-relaxed font-medium ${inter.className}`}>
            League Ladder is the high-velocity hub for competitive organizations. Real-time bracket sync, live match shunts, and elite tournament management.
          </p>
          <div className="flex flex-wrap gap-8">
            <LadderButton>START_TOURNAMENT</LadderButton>
            <div className={`flex items-center gap-4 text-white font-black tracking-widest text-[10px] cursor-pointer group`}>
              VIEW_GLOBAL_SEEDING <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform text-[#00FF66]" />
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ ...tokens.physics.snappy, delay: 0.2 }}
          className="relative"
        >
          <div className="bg-[#111111] border border-white/5 p-10 rounded-sm shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-[#00FF66]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center justify-between mb-16 border-b border-white/5 pb-6">
              <div className={`${mono.className} text-[10px] text-[#00FF66] font-bold tracking-widest`}>FINALS_BRACKET_ID: 8492</div>
              <Activity className="text-[#00FF66]" size={18} />
            </div>
            <div className="space-y-10 relative z-10">
              {[
                { t1: 'CYBER_PUNKS', t2: 'NEON_KNIGHTS', s1: '2', s2: '1' },
                { t1: 'DATA_DRIFTERS', t2: 'GRID_WALKERS', s1: '0', s2: '3' },
                { t1: 'PULSE_PILOTS', t2: 'VOID_VECTORS', s1: '1', s2: '1', live: true }
              ].map((match, i) => (
                <div key={i} className="flex items-center gap-6">
                  <div className="flex-1 space-y-3">
                    <div className={`flex justify-between items-center p-3 border ${match.s1 > match.s2 ? 'bg-[#00FF66]/10 border-[#00FF66]/30' : 'bg-black/20 border-white/5'}`}>
                      <span className={`${mono.className} text-[10px] font-bold text-white`}>{match.t1}</span>
                      <span className={`${mono.className} text-xs font-black text-white`}>{match.s1}</span>
                    </div>
                    <div className={`flex justify-between items-center p-3 border ${match.s2 > match.s1 ? 'bg-[#00FF66]/10 border-[#00FF66]/30' : 'bg-black/20 border-white/5'}`}>
                      <span className={`${mono.className} text-[10px] font-bold text-white`}>{match.t2}</span>
                      <span className={`${mono.className} text-xs font-black text-white`}>{match.s2}</span>
                    </div>
                  </div>
                  {match.live && (
                    <motion.div 
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="px-2 py-1 bg-red-500 text-white text-[8px] font-black uppercase italic"
                    >
                      Live
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="absolute -top-10 -right-10 bg-[#00FF66] text-black p-8 rounded-sm shadow-2xl rotate-12"
          >
            <Flame size={32} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

const StatsBar = () => (
  <section className="py-24 border-y border-white/5 bg-[#050505]">
    <div className="max-w-7xl mx-auto px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-16 text-center">
        {[
          { label: 'Active Leagues', value: '850', icon: Target },
          { label: 'Total Prizes', value: '$12M', icon: Trophy },
          { label: 'Matches/Hr', value: '4.2K', icon: Zap },
          { label: 'Global Rank', value: '#01', icon: TrendingUp }
        ].map((stat, i) => (
          <motion.div key={i} whileHover={{ y: -5 }}>
            <div className={`${montserrat.className} text-6xl font-black text-white mb-2 italic`}>{stat.value}</div>
            <div className="text-[#757575] text-[10px] font-black uppercase tracking-[0.4em]">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)

const Features = () => (
  <section className="py-32 px-8 bg-black">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-12">
        <div>
          <h2 className={`${montserrat.className} text-7xl font-black text-white mb-6 uppercase italic tracking-tighter`}>HUB_MODULES</h2>
          <p className={`text-[#757575] max-w-xl ${inter.className}`}>Deploy high-energy tournament infrastructure for professional eSports leagues.</p>
        </div>
        <LadderButton variant="secondary" className="md:mb-4 text-[10px]">ALL_SYSTEMS_VIEW</LadderButton>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {[
          { title: 'Bracket Physics', desc: 'Real-time dynamic scaling of tournament brackets based on live winner progression.', icon: LayoutGrid },
          { title: 'Match Shunt', desc: 'Section entries that mimic match-starts, utilizing high-impact scale and motion blur.', icon: Activity },
          { title: 'Strobe Standings', desc: 'Rhythmic, high-contrast list views for league standings with victory-glow effects.', icon: Zap },
          { title: 'Broadcast HUD', desc: 'Low-resource UI components designed for direct integration into OBS and live streams.', icon: Monitor },
          { title: 'Seeding Vault', desc: 'Encrypted storage for proprietary player ranking data and historical win-loss logs.', icon: Shield },
          { title: 'Victory Reveal', desc: 'Theatrical section transitions celebrating tournament winners with RGB split effects.', icon: Trophy }
        ].map((feature, i) => (
          <BracketCard key={i} title={`MODULE_0${i + 1}`}>
            <feature.icon className="text-[#00FF66] mb-8" size={32} />
            <h3 className={`${montserrat.className} text-2xl font-black text-white mb-4 uppercase tracking-tighter italic`}>{feature.title}</h3>
            <p className={`text-[#757575] text-sm leading-relaxed ${inter.className}`}>{feature.desc}</p>
          </BracketCard>
        ))}
      </div>
    </div>
  </section>
)

const ProductDetail = () => (
  <section className="py-32 px-8 bg-[#080808] relative overflow-hidden">
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-24 items-center">
        <div className="order-2 lg:order-1 relative group">
           <div className="aspect-video bg-black border border-white/5 p-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-[#00FF66]/5 group-hover:opacity-100 opacity-0 transition-opacity" />
              <div className="w-full h-full flex items-center justify-center">
                 <Target className="text-[#00FF66]/20 animate-spin-slow" size={150} />
              </div>
              <motion.div 
                animate={{ x: [0, 400, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                className="absolute top-0 left-0 w-0.5 h-full bg-[#00FF66] shadow-[0_0_15px_#00FF66]"
              />
           </div>
           <div className="absolute -bottom-8 -left-8 bg-white text-black p-8 rounded-sm shadow-2xl rotate-6">
              <div className={`${mono.className} text-xl font-black`}>BROADCAST_READY</div>
           </div>
        </div>
        <div className="order-1 lg:order-2">
          <div className={`${mono.className} text-[#00FF66] text-[10px] tracking-[0.5em] font-bold mb-10 uppercase`}>[ HUB_ARCHITECTURE ]</div>
          <h2 className={`${montserrat.className} text-7xl font-black text-white mb-10 leading-[0.9] uppercase italic tracking-tighter`}>BUILT FOR THE <br/><span className="text-[#00FF66]">HIGH-STAKES.</span></h2>
          <div className={`space-y-8 text-[#757575] text-xl leading-relaxed ${inter.className}`}>
            <p>Traditional league tables are static documents. League Ladder is a performance engine. We treat every win as a rhythmic revelation, ensuring that the hierarchy is as powerful as the play.</p>
            <p>Our implementation of bracket physics and strobe reveals ensures that the brand remains at the pinnacle of digital excellence.</p>
          </div>
          <LadderButton className="mt-12">CONNECT_MAIN_HUB</LadderButton>
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
           <div className={`flex items-center gap-3 ${montserrat.className} text-2xl font-black tracking-tighter text-white italic mb-10`}>
            <Trophy className="text-[#00FF66]" size={28} />
            LEAGUE<span className="text-[#00FF66]">LADDER</span>
          </div>
          <p className={`text-[#757575] text-[10px] max-w-xs leading-loose font-black uppercase tracking-[0.2em] ${mono.className}`}>The global standard for professional eSports tournament management and high-energy league table analytics. Mission-critical since 2026.</p>
        </div>
        {[
          { title: 'Engine', links: ['Tournaments', 'Brackets', 'Standings', 'Pricing'] },
          { title: 'Agency', links: ['Services', 'Roster', 'Foundry', 'Legal'] },
          { title: 'Connect', links: ['Discord', 'Terminal', 'GitHub', 'Mainframe'] }
        ].map(group => (
          <div key={group.title}>
            <div className={`${montserrat.className} text-xs font-black text-white mb-10 uppercase tracking-widest`}>{group.title}</div>
            <ul className="space-y-6">
              {group.links.map(link => (
                <li key={link}><a href="#" className={`${mono.className} text-[8px] text-[#757575] font-black uppercase tracking-[0.3em] hover:text-[#00FF66] transition-colors`}>{link}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
        <div className={`${mono.className} text-[8px] text-[#757575] uppercase tracking-[0.5em] font-black`}>© 2026 LEAGUELADDER HUB CORP. BROADCAST_ENCRYPTED.</div>
        <div className="flex gap-10">
           <Zap className="text-[#757575] hover:text-[#00FF66] cursor-pointer" size={18} />
           <Globe className="text-[#757575] hover:text-[#00FF66] cursor-pointer" size={18} />
        </div>
      </div>
    </div>
  </footer>
)

export default function LeagueLadder() {
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
          <filter id="ladder-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.95" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100" height="100" filter="url(#ladder-noise)" />
        </svg>
      </div>
      
      </div>
  )
}
