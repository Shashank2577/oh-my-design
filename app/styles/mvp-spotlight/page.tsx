'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { 
  Trophy, 
  Star, 
  Zap, 
  Activity, 
  TrendingUp, 
  Users, 
  ChevronRight, 
  Shield, 
  Play,
  ArrowRight,
  Target,
  Award,
  Video,
  Share2
} from 'lucide-react'
import { Playfair_Display, Montserrat, JetBrains_Mono, Inter } from 'next/font/google'

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '700', '900'] })
const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '900'] })
const inter = Inter({ subsets: ['latin'] })
const mono = JetBrains_Mono({ subsets: ['latin'] })

// --- Design Tokens ---
const tokens = {
  colors: {
    background: "#000000",
    surface: "#0A0A0A",
    accent1: "#FFFFFF", // Spotlight White
    accent2: "#B8860B", // Elite Gold
    border: "rgba(255, 255, 255, 0.1)",
    textHigh: "#FFFFFF",
    textLow: "#666666"
  },
  physics: {
    theatrical: { type: "spring" as any, stiffness: 80, damping: 20, mass: 1.2 }
  }
}

// --- Components ---

const SpotlightButton = ({ children, variant = 'primary', className = '' }: any) => (
  <motion.button
    whileHover={{ scale: 1.05, letterSpacing: '0.1em' }}
    whileTap={{ scale: 0.95 }}
    className={`px-12 py-5 ${montserrat.className} font-black text-xs tracking-[0.2em] transition-all relative group overflow-hidden ${
      variant === 'primary' 
        ? `bg-white text-black` 
        : `bg-transparent text-white border border-white/20 hover:border-white`
    } ${className}`}
  >
    <span className="relative z-10 flex items-center justify-center gap-3 uppercase italic">
      {children}
      <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
    </span>
    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
  </motion.button>
)

const HighlightCard = ({ children, className = '', title = '' }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={`bg-[#0A0A0A] border border-white/5 p-10 relative group overflow-hidden ${className}`}
  >
    <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
      <Star className="text-white fill-white" size={20} />
    </div>
    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
    {title && <div className={`${montserrat.className} text-[10px] font-black text-[#666666] uppercase tracking-[0.4em] mb-8`}>{title}</div>}
    {children}
  </motion.div>
)

// --- Sections ---

const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 px-8 py-10 bg-gradient-to-b from-black to-transparent">
    <div className="max-w-7xl mx-auto flex items-center justify-between">
      <div className={`flex items-center gap-3 ${playfair.className} text-3xl font-black tracking-tighter text-white italic`}>
        <Trophy size={32} />
        MVP<span className="font-light opacity-40 not-italic ml-1">SPOTLIGHT</span>
      </div>
      <div className="hidden md:flex items-center gap-12 text-[#666666] font-bold text-[10px] tracking-[0.5em] uppercase">
        {['The Profile', 'Highlights', 'Metrics', 'Agency'].map(item => (
          <a key={item} href="#" className="hover:text-white transition-colors relative group">
            {item}
            <span className="absolute -bottom-2 left-0 w-full h-px bg-white scale-x-0 group-hover:scale-x-100 transition-transform" />
          </a>
        ))}
      </div>
      <SpotlightButton className="hidden md:block py-2 px-8 text-[10px]" variant="secondary">SIGN_PLAYER</SpotlightButton>
    </div>
  </nav>
)

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center px-8 overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <motion.div 
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,_#FFFFFF0A_0%,_transparent_60%)]" 
        />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')] opacity-30" />
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={tokens.physics.theatrical}
        >
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-1 bg-white" />
            <span className={`text-[10px] font-black text-white tracking-[0.6em] uppercase ${montserrat.className}`}>Elite_Roster_V3.0</span>
          </div>
          <h1 className={`${playfair.className} text-8xl md:text-[12rem] font-black text-white leading-[0.8] mb-16 uppercase italic tracking-tighter`}>
            BORN <br/> <span className="text-white/20 not-italic">FOR THIS.</span>
          </h1>
          <p className={`text-white/40 text-2xl max-w-2xl mb-20 leading-relaxed font-medium ${inter.className}`}>
            MVP Spotlight is the theatrical stage for world-class athletes. We turn player statistics into cinematic legacies that command attention.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-12">
            <SpotlightButton>VIEW_FULL_PROFILE</SpotlightButton>
            <div className={`flex items-center gap-4 text-white font-black tracking-widest text-xs cursor-pointer group`}>
              THE_SHOWREEL <Video size={20} className="group-hover:scale-110 transition-transform text-white" />
            </div>
          </div>
        </motion.div>
      </div>
      
      <motion.div 
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/20 flex flex-col items-center gap-6"
      >
        <div className="text-[10px] tracking-[0.8em] uppercase font-black">Scroll</div>
        <div className="w-px h-32 bg-gradient-to-b from-white/30 to-transparent" />
      </motion.div>
    </section>
  )
}

const StatsBar = () => (
  <section className="py-24 border-y border-white/5 bg-[#050505]">
    <div className="max-w-7xl mx-auto px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-16 text-center">
        {[
          { label: 'All-Star Games', value: '08', icon: Star },
          { label: 'Championships', value: '03', icon: Trophy },
          { label: 'Avg PPG', value: '32.4', icon: Activity },
          { label: 'Market Value', value: '$120M', icon: TrendingUp }
        ].map((stat, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.1 }}
            className="flex flex-col items-center group"
          >
            <div className={`${playfair.className} text-7xl font-black text-white mb-2 italic`}>{stat.value}</div>
            <div className="text-[10px] tracking-[0.5em] uppercase font-black text-white/20 group-hover:text-white transition-colors">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)

const Highlights = () => (
  <section className="py-40 px-8 bg-black">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-12">
        <h2 className={`${playfair.className} text-7xl font-black uppercase italic leading-none text-white`}>CAREER <br/><span className="text-white/20 not-italic">PEAKS</span></h2>
        <p className="text-white/30 max-w-md text-xl leading-relaxed font-medium">Capturing the singular moments that define a global sporting legacy.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-10">
        {[
          { title: 'The Buzzer Beater', desc: 'Game 7, 2024. A singular shot that echoed across the league and redefined the season.', date: 'NOV_2024', icon: Zap },
          { title: 'Defensive Masterclass', desc: 'Shutting down the worlds leading offense through pure focus and biometric precision.', date: 'JAN_2025', icon: Shield },
          { title: 'MVP Coronation', desc: 'The moment individual talent transformed into permanent league legend.', date: 'MAY_2025', icon: Award },
          { title: 'Global Impact', desc: 'Transcending the sport to become a cultural icon and philanthropic visionary.', date: 'JUL_2025', icon: Target },
          { title: 'Statistical Anomaly', desc: 'Breaking every recorded metric for performance under high-stakes pressure.', date: 'SEP_2025', icon: Activity },
          { title: 'Victory Parade', desc: 'Celebrating with the city that believed in the dream from the very first flex.', date: 'DEC_2025', icon: Users }
        ].map((h, i) => (
          <HighlightCard key={i} title={h.date}>
            <h3 className={`${playfair.className} text-3xl font-black text-white mb-6 uppercase tracking-tighter italic`}>{h.title}</h3>
            <p className="text-white/40 text-sm leading-relaxed font-medium mb-10">{h.desc}</p>
            <div className="flex items-center gap-4 text-white/20 font-black text-[10px] tracking-widest cursor-pointer hover:text-white transition-colors group">
              VIEW_REPLAY <Play size={12} className="fill-current group-hover:scale-125 transition-transform" />
            </div>
          </HighlightCard>
        ))}
      </div>
    </div>
  </section>
)

const ProductDetail = () => (
  <section className="py-40 px-8 bg-[#080808] relative overflow-hidden">
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-24 items-center">
        <div className="relative group">
          <div className="aspect-square bg-black border border-white/5 rounded-full p-16 relative overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#FFFFFF08_0%,_transparent_70%)]" />
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border border-dashed border-white/10 rounded-full"
            />
            <Activity className="text-white/10" size={300} strokeWidth={0.5} />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <div className={`${montserrat.className} text-6xl font-black text-white italic`}>99.9%</div>
              <div className="text-[10px] font-black text-white/40 uppercase tracking-[0.5em] mt-2">PERFORMANCE_SYNC</div>
            </div>
          </div>
          <div className="absolute -top-10 -right-10 bg-white text-black p-12 rounded-sm shadow-2xl rotate-12 group-hover:rotate-0 transition-transform duration-700">
            <div className={`${playfair.className} text-3xl font-black italic`}>ELITE_TIER</div>
          </div>
        </div>
        <div>
          <div className={`mb-10 ${montserrat.className} text-white font-black tracking-[0.6em] uppercase text-[10px]`}>[ BIOMETRIC_ARCHITECTURE ]</div>
          <h2 className={`${playfair.className} text-7xl font-black text-white mb-10 leading-[0.9] uppercase italic tracking-tighter`}>BEYOND THE <br/> <span className="opacity-20 not-italic">PHYSICAL.</span></h2>
          <div className={`space-y-10 text-white/40 text-xl leading-relaxed font-medium ${inter.className}`}>
            <p>Traditional profiles are static. MVP Spotlight is a performance engine. We treat every athletic signal as a theatrical revelation, ensuring that the legacy is as powerful as the play.</p>
            <p>Our implementation of cinematic spotlights and high-fidelity reveals ensures that the brand remains at the pinnacle of digital excellence.</p>
          </div>
          <SpotlightButton className="mt-16">CONNECT_PROFILE_NODE</SpotlightButton>
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
          <div className={`${playfair.className} text-3xl font-black uppercase text-white mb-8 italic`}>MVP<span className="font-light opacity-40 not-italic ml-1">SPOTLIGHT</span></div>
          <p className="text-white/30 text-xs leading-loose font-black uppercase tracking-[0.2em] max-w-xs">Building the theatrical future of athletic identity and performance profiles. Professional since 2026.</p>
        </div>
        {[
          { title: 'The Profile', links: ['Stats', 'Highlights', 'Biometrics', 'Legacy'] },
          { title: 'Agency', links: ['Services', 'Roster', 'Journal', 'Pricing'] },
          { title: 'Connect', links: ['Twitter', 'Discord', 'LinkedIn', 'Terminal'] }
        ].map(group => (
          <div key={group.title}>
            <div className="text-[10px] font-black text-white uppercase tracking-[0.4em] mb-10">{group.title}</div>
            <ul className="space-y-6">
              {group.links.map(link => (
                <li key={link}><a href="#" className="text-white/30 text-[10px] font-black tracking-[0.3em] uppercase hover:text-white transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="text-white/20 text-[10px] font-black uppercase tracking-[0.6em]">© 2026 MVPSPOTLIGHT ROSTER CORP. ALL PROFILES RESERVED.</div>
        <div className="flex gap-10">
          <Share2 className="text-white/20 hover:text-white transition-colors cursor-pointer" size={20} />
          <Trophy className="text-white/20 hover:text-white transition-colors cursor-pointer" size={20} />
        </div>
      </div>
    </div>
  </footer>
)

export default function MVPSpotlight() {
  return (
    <div className={`min-h-screen bg-black text-white overflow-x-hidden ${inter.className}`}>
      <Navbar />
      <Hero />
      <StatsBar />
      <Highlights />
      <ProductDetail />
      <Footer />
      
      {/* --- Global Effects --- */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.08] contrast-150 mix-blend-overlay">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <filter id="spotlight-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100" height="100" filter="url(#spotlight-noise)" />
        </svg>
      </div>
    </div>
  )
}
