'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { 
  Trophy, 
  Star, 
  Zap, 
  Users, 
  ChevronRight, 
  Shield, 
  Play,
  ArrowRight,
  Target,
  Award,
  Box,
  LayoutGrid,
  Sparkles,
  Flame,
  Globe,
  Camera
} from 'lucide-react'
import { Inter, Montserrat, Space_Grotesk } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '900'] })
const space = Space_Grotesk({ subsets: ['latin'] })

// --- Design Tokens ---
const tokens = {
  colors: {
    background: "#050505",
    surface: "#111111",
    accent1: "#FACC15", // Cave Gold
    accent2: "#3B82F6", // Stadium Blue
    border: "rgba(250, 204, 21, 0.2)",
    textHigh: "#FFFFFF",
    textLow: "#757575"
  },
  physics: {
    float: {
      y: [-10, 10, -10],
      rotate: [-2, 2, -2],
      transition: { duration: 4, repeat: Infinity, ease: [0.42, 0, 0.58, 1] }
    }
  }
}

// --- Components ---

const CaveButton = ({ children, variant = 'primary', className = '' }: any) => (
  <motion.button
    whileHover={{ scale: 1.05, boxShadow: `0 0 30px ${variant === 'primary' ? 'rgba(250, 204, 21, 0.4)' : 'rgba(59, 130, 246, 0.2)'}` }}
    whileTap={{ scale: 0.95 }}
    className={`px-10 py-4 rounded-xl ${space.className} font-black text-xs tracking-[0.2em] transition-all relative group overflow-hidden border ${
      variant === 'primary' 
        ? `bg-[#FACC15] text-black border-[#FACC15]` 
        : `bg-transparent text-[#3B82F6] border-[#3B82F6]/30 hover:border-[#3B82F6]`
    } ${className}`}
  >
    <span className="relative z-10 flex items-center justify-center gap-2 uppercase italic">
      {children}
      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
    </span>
    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
  </motion.button>
)

const CaseCard = ({ children, title = '', rarity = 'Common' }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="bg-[#111111] border border-white/5 p-8 rounded-[32px] relative group overflow-hidden flex flex-col items-center text-center"
  >
    <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
      <Sparkles className="text-[#FACC15]" size={20} />
    </div>
    <div className={`mb-6 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${
      rarity === 'Legendary' ? 'bg-[#FACC15] text-black shadow-[0_0_20px_#FACC15]' : 'bg-white/10 text-white/40'
    }`}>
      {rarity}
    </div>
    <div className="w-full aspect-square bg-black/40 rounded-2xl mb-8 flex items-center justify-center relative overflow-hidden">
       <motion.div animate={tokens.physics.float as any}>
          {children}
       </motion.div>
       <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
    </div>
    <h3 className={`${montserrat.className} text-xl font-black text-white uppercase italic tracking-tighter mb-2`}>{title}</h3>
    <div className="text-[10px] font-bold text-[#757575] uppercase tracking-widest">Digital Asset ID: 8492</div>
  </motion.div>
)

// --- Sections ---

const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 bg-[#050505]/80 backdrop-blur-xl px-8 py-6 border-b border-white/5">
    <div className="max-w-7xl mx-auto flex items-center justify-between">
      <div className={`flex items-center gap-3 ${montserrat.className} text-2xl font-black tracking-tighter text-white italic`}>
        <Box className="text-[#FACC15]" size={28} />
        FAN<span className="text-[#FACC15]">CAVE</span>
      </div>
      <div className="hidden md:flex items-center gap-10 text-[#757575] font-bold text-[10px] tracking-[0.4em] uppercase">
        {['Market', 'The Case', 'Stats', 'Agency'].map(item => (
          <a key={item} href="#" className="hover:text-[#FACC15] transition-colors">{item}</a>
        ))}
      </div>
      <CaveButton className="hidden md:block py-2 text-[10px]" variant="secondary">AUTH_WALLET</CaveButton>
    </div>
  </nav>
)

const Hero = () => {
  return (
    <section className="pt-40 pb-20 px-8 relative overflow-hidden min-h-screen flex items-center bg-black">
      <div className="absolute inset-0 z-0">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[800px] bg-[#FACC15]/5 rounded-full blur-[150px]" 
        />
      </div>
      
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <div className="flex items-center gap-3 mb-10">
            <div className="w-2 h-2 bg-[#FACC15] rounded-full animate-pulse" />
            <span className={`text-[10px] font-black text-[#FACC15] tracking-[0.5em] uppercase ${space.className}`}>Market_Sync_Ready_v3.0</span>
          </div>
          <h1 className={`${montserrat.className} text-7xl md:text-[10rem] font-black text-white leading-[0.8] mb-12 uppercase italic tracking-tighter`}>
            OWN THE <br/> <span className="text-[#FACC15] drop-shadow-[0_0_30px_#FACC15]">LEGEND.</span>
          </h1>
          <p className={`text-[#757575] text-xl max-w-xl mb-16 leading-relaxed font-medium ${inter.className}`}>
            FanCave is the ultimate vault for high-stakes sports memorabilia. Interactive 3D assets, authenticated history, and elite digital ownership.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-10">
            <CaveButton>START_COLLECTING</CaveButton>
            <div className={`flex items-center gap-4 text-white font-black tracking-widest text-[10px] cursor-pointer group`}>
              VIEW_VAULT_METRICS <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform text-[#FACC15]" />
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="relative"
        >
          <div className="aspect-square bg-[#111111] border border-white/5 rounded-[60px] p-1 shadow-[0_50px_100px_rgba(250,204,21,0.1)] relative overflow-hidden group">
            <div className="absolute inset-0 bg-[#FACC15]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="w-full h-full border border-dashed border-[#FACC15]/20 rounded-[60px] flex flex-col items-center justify-center text-center p-12">
               <motion.div animate={tokens.physics.float as any}>
                  <Trophy className="text-[#FACC15] drop-shadow-[0_0_20px_rgba(250,204,21,0.5)]" size={150} strokeWidth={1} />
               </motion.div>
               <div className="mt-12 space-y-4">
                  <div className={`${montserrat.className} text-3xl font-black text-white italic uppercase`}>The Golden Boot</div>
                  <div className="px-4 py-1 bg-[#FACC15] text-black text-[10px] font-black uppercase tracking-widest mx-auto w-fit">Legendary Item</div>
               </div>
            </div>
          </div>
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: [0, 0, 1, 1] }}
            className="absolute -top-10 -right-10 opacity-20 pointer-events-none"
          >
            <LayoutGrid size={200} className="text-[#FACC15]" />
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
          { label: 'Total Volume', value: '$450M', icon: Trophy },
          { label: 'Active Vaults', value: '12K+', icon: Shield },
          { label: 'Daily Trades', value: '8.2K', icon: Zap },
          { label: 'Global Rank', value: '#01', icon: Award }
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

const TheCase = () => (
  <section className="py-40 px-8 bg-black">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-12">
        <div>
          <h2 className={`${montserrat.className} text-7xl font-black text-white mb-6 uppercase italic tracking-tighter`}>THE_GLASS_CASE</h2>
          <p className={`text-[#757575] max-w-xl ${inter.className}`}>Deploy high-fidelity digital showcases for elite sports memorabilia.</p>
        </div>
        <CaveButton variant="secondary" className="md:mb-4 text-[10px]">ALL_ASSETS_VIEW</CaveButton>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {[
          { title: 'Victory Ring', rarity: 'Legendary', icon: Target },
          { title: 'Signed Jersey', rarity: 'Epic', icon: Users },
          { title: 'Match Ball', rarity: 'Legendary', icon: Star },
          { title: 'Elite Medal', rarity: 'Common', icon: Award },
          { title: 'Legacy Cap', rarity: 'Rare', icon: Zap },
          { title: 'Stadium Turf', rarity: 'Epic', icon: Flame }
        ].map((item, i) => (
          <CaseCard key={i} title={item.title} rarity={item.rarity}>
            <item.icon className="text-[#FACC15]" size={80} strokeWidth={1} />
          </CaseCard>
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
           <div className="aspect-square bg-black border border-white/5 rounded-full p-16 relative overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-[#FACC15]/5 group-hover:opacity-100 opacity-0 transition-opacity" />
              <div className="w-full h-full border border-dashed border-[#FACC15]/20 rounded-full flex items-center justify-center">
                 <Camera className="text-[#FACC15]/20 animate-spin-slow" size={150} />
              </div>
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: [0, 0, 1, 1] }}
                className="absolute inset-0 border-t-2 border-[#FACC15] rounded-full shadow-[0_0_15px_#FACC15]"
              />
           </div>
           <div className="absolute -bottom-8 -left-8 bg-white text-black p-8 rounded-sm shadow-2xl rotate-6">
              <div className={`${space.className} text-xl font-black`}>VAULT_VERIFIED</div>
           </div>
        </div>
        <div className="order-1 lg:order-2">
          <div className={`${space.className} text-[#FACC15] text-[10px] tracking-[0.5em] font-bold mb-10 uppercase`}>[ VAULT_ARCHITECTURE ]</div>
          <h2 className={`${montserrat.className} text-7xl font-black text-white mb-10 leading-[0.9] uppercase italic tracking-tighter`}>PROTECT THE <br/><span className="text-[#FACC15]">LEGACY.</span></h2>
          <div className={`space-y-8 text-[#757575] text-xl leading-relaxed ${inter.className}`}>
            <p>Memorabilia isn't just about the past. It's about permanent digital value. FanCave treats every asset as a legendary artifact, ensuring its history and beauty are preserved forever.</p>
            <p>Our implementation of interactive 3D physics and strobe reveals ensures that your collection remains at the pinnacle of digital excellence.</p>
          </div>
          <CaveButton className="mt-12">CONNECT_MAIN_VAULT</CaveButton>
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
            <Box className="text-[#FACC15]" size={28} />
            FAN<span className="text-[#FACC15]">CAVE</span>
          </div>
          <p className={`text-[#757575] text-[10px] max-w-xs leading-loose font-black uppercase tracking-[0.2em] ${space.className}`}>The global standard for professional sports memorabilia vaults and high-stakes digital assets. Secure since 2026.</p>
        </div>
        {[
          { title: 'The Case', links: ['Market', 'Trade', 'The Vault', 'Pricing'] },
          { title: 'Foundry', links: ['About Us', 'Legitimacy', 'Careers', 'Brand'] },
          { title: 'Connect', links: ['Discord', 'Terminal', 'GitHub', 'LinkedIn'] }
        ].map(group => (
          <div key={group.title}>
            <div className={`${montserrat.className} text-xs font-black text-white mb-10 uppercase tracking-widest`}>{group.title}</div>
            <ul className="space-y-6">
              {group.links.map(link => (
                <li key={link}><a href="#" className={`${space.className} text-[8px] text-[#757575] font-black uppercase tracking-[0.3em] hover:text-[#FACC15] transition-colors`}>{link}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
        <div className={`${space.className} text-[8px] text-[#757575] uppercase tracking-[0.5em] font-black`}>© 2026 FANCAVE HUB CORP. VAULT_ENCRYPTED.</div>
        <div className="flex gap-10">
           <Zap className="text-[#757575] hover:text-[#FACC15] cursor-pointer" size={18} />
           <Globe className="text-[#757575] hover:text-[#FACC15] cursor-pointer" size={18} />
        </div>
      </div>
    </div>
  </footer>
)

export default function FanCave() {
  return (
    <div className={`min-h-screen bg-black text-white overflow-x-hidden ${inter.className}`}>
      <Navbar />
      <Hero />
      <StatsBar />
      <TheCase />
      <ProductDetail />
      <Footer />
      
      {/* --- Global Effects --- */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.05] contrast-150 mix-blend-screen">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <filter id="cave-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.95" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100" height="100" filter="url(#cave-noise)" />
        </svg>
      </div>
      
      </div>
  )
}
