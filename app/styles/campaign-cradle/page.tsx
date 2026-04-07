'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { 
  Layers, 
  Layout, 
  MousePointer2, 
  Sparkles, 
  ShieldCheck, 
  ChevronDown, 
  ArrowRight,
  TrendingUp,
  Zap,
  Target,
  Award,
  Share2,
  PenTool,
  Grid3X3,
  Box,
  FileText,
  Hammer,
  History,
  Cloud,
  Users
} from 'lucide-react'
import { Space_Mono, Barlow, Inter } from 'next/font/google'

const spaceMono = Space_Mono({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-space-mono' })
const barlow = Barlow({ subsets: ['latin'], weight: ['400', '700', '900'], variable: '--font-barlow' })
const inter = Inter({ subsets: ['latin'] })

// --- Design Tokens ---
const tokens = {
  colors: {
    background: "#002B5B", // Blueprint Blue
    surface: "rgba(255, 255, 255, 0.05)",
    accent1: "#FFD700", // Construction Yellow
    accent2: "#FFFFFF", // Grid White
    border: "rgba(255, 255, 255, 0.2)",
    textHigh: "#FFFFFF",
    textLow: "#8FB9E0"
  },
  physics: {
    structural: { type: "spring" as any, stiffness: 200, damping: 30, mass: 1 }
  }
}

// --- Components ---

const CradleButton = ({ children, variant = 'primary', className = '' }: any) => (
  <motion.button
    whileHover={{ scale: 1.05, boxShadow: `0 0 20px ${variant === 'primary' ? 'rgba(255, 215, 0, 0.4)' : 'rgba(255, 255, 255, 0.1)'}` }}
    whileTap={{ scale: 0.95 }}
    className={`px-10 py-4 ${spaceMono.className} font-bold text-xs tracking-[0.2em] transition-all relative group overflow-hidden border ${
      variant === 'primary' 
        ? `bg-[#FFD700] text-black border-[#FFD700]` 
        : `bg-transparent text-white border-white/20`
    } ${className}`}
  >
    <span className="relative z-10 flex items-center justify-center gap-3 uppercase">
      {children}
      <PenTool size={14} className="group-hover:rotate-45 transition-transform" />
    </span>
    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
  </motion.button>
)

const BlueprintCard = ({ children, className = '', title = '' }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ y: -10, borderColor: '#FFD700' }}
    className={`bg-white/5 border border-white/10 p-10 relative group overflow-hidden ${className}`}
  >
    <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20 pointer-events-none" />
    {title && <div className={`${spaceMono.className} text-[8px] font-bold text-[#FFD700] uppercase tracking-[0.4em] mb-8`}>{title}</div>}
    {children}
  </motion.div>
)

// --- Sections ---

const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 bg-[#002B5B]/80 backdrop-blur-md px-8 py-6 border-b border-white/10">
    <div className="max-w-7xl mx-auto flex items-center justify-between">
      <div className={`flex items-center gap-3 ${spaceMono.className} text-xl font-bold tracking-widest text-white uppercase`}>
        <Layout className="text-[#FFD700]" size={24} />
        CAMPAIGN<span className="text-[#FFD700]">CRADLE</span>
      </div>
      <div className="hidden md:flex items-center gap-10 text-[#8FB9E0] font-bold text-[10px] tracking-[0.4em] uppercase">
        {['Blueprints', 'Funnel', 'Resources', 'Mainframe'].map(item => (
          <a key={item} href="#" className="hover:text-white transition-colors">{item}</a>
        ))}
      </div>
      <CradleButton className="hidden md:block py-2 text-[10px]" variant="secondary">AUTH_PLANNER</CradleButton>
    </div>
  </nav>
)

const Hero = () => {
  return (
    <section className="pt-40 pb-20 px-8 relative overflow-hidden min-h-screen flex items-center bg-[#002B5B]">
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30" />
        <motion.div 
          animate={{ x: [-100, 100, -100] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-0 w-full h-px bg-white/20" 
        />
      </div>
      
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={tokens.physics.structural}
        >
          <div className="flex items-center gap-3 mb-10">
            <div className="w-3 h-3 border-2 border-[#FFD700] rotate-45 animate-pulse" />
            <span className={`text-[10px] font-bold text-[#FFD700] tracking-[0.5em] uppercase ${spaceMono.className}`}>Structural_integrity_V3.0</span>
          </div>
          <h1 className={`${barlow.className} text-7xl md:text-[9rem] font-black text-white leading-[0.8] mb-12 uppercase tracking-tighter`}>
            BUILD THE <br/> <span className="text-[#FFD700]">VISION.</span>
          </h1>
          <p className={`text-[#8FB9E0] text-xl max-w-xl mb-16 leading-relaxed font-medium ${inter.className}`}>
            CampaignCradle is the architectural engine for high-stakes marketing. Plan, structuralize, and build your digital legacy with blueprint precision.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-10">
            <CradleButton>START_BUILDING</CradleButton>
            <div className={`flex items-center gap-4 text-white font-bold tracking-widest text-[10px] cursor-pointer group`}>
              VIEW_BLUEPRINTS <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform text-[#FFD700]" />
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ ...tokens.physics.structural, delay: 0.2 }}
          className="relative"
        >
          <div className="bg-white/5 border border-white/20 p-10 rounded-sm shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-[#FFD700]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center justify-between mb-16 border-b border-white/10 pb-6">
              <div className={`${spaceMono.className} text-[10px] text-white font-bold tracking-widest`}>SCHEMA_ID: 08492-B</div>
              <div className="flex gap-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="w-2 h-2 border border-white/40" />
                ))}
              </div>
            </div>
            <div className="space-y-10 relative z-10">
               {[
                 { label: 'Market Depth', val: '1,402m', color: '#FFD700' },
                 { label: 'Brand Tension', val: '92.4%', color: '#FFFFFF' },
                 { label: 'Growth Vector', val: '3.4X', color: '#10B981' }
               ].map((item, i) => (
                 <div key={i}>
                   <div className="flex justify-between mb-4">
                     <span className="text-[10px] font-bold text-[#8FB9E0] uppercase tracking-widest">{item.label}</span>
                     <span className={`${spaceMono.className} text-sm font-bold text-white`}>{item.val}</span>
                   </div>
                   <div className="h-1 w-full bg-white/5 overflow-hidden">
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
            className="absolute -top-10 -right-10 bg-[#FFD700] text-black p-8 rounded-sm shadow-2xl rotate-12"
          >
            <Hammer size={32} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

const StatsBar = () => (
  <section className="py-24 border-y border-white/10 bg-[#002B5B]">
    <div className="max-w-7xl mx-auto px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-16 text-center">
        {[
          { label: 'Blueprints Drawn', value: '45K', icon: FileText },
          { label: 'Structures Built', value: '1.2K', icon: Box },
          { label: 'Accuracy Score', value: '99.9', icon: ShieldCheck },
          { label: 'Daily Leads', value: '8.2K', icon: Users }
        ].map((stat, i) => (
          <motion.div key={i} whileHover={{ y: -5 }}>
            <div className={`${barlow.className} text-6xl font-black text-white mb-2 italic`}>{stat.value}</div>
            <div className="text-[#FFD700] text-[10px] font-bold uppercase tracking-[0.4em]">{stat.label}</div>
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
          <h2 className={`${barlow.className} text-7xl font-black text-white mb-6 uppercase italic tracking-tighter leading-none`}>THE_MASTER_PLAN</h2>
          <p className={`text-[#8FB9E0] max-w-xl ${inter.className}`}>Deploy structural campaign architecture built for professional marketing environments.</p>
        </div>
        <CradleButton variant="secondary" className="md:mb-4 text-[10px]">ALL_SCHEMA_VIEW</CradleButton>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {[
          { title: 'Blueprint Reveal', desc: 'Interfaces that build themselves in front of the user, starting as SVG wireframes.', icon: PenTool },
          { title: 'Funnel Builder', desc: 'A vertical drag-and-drop pipeline for mapping customer journeys with liquid lead flow.', icon: Target },
          { title: 'Grid Snap UI', desc: 'SATISFYING UI interactions where elements snap into a visible background grid.', icon: Grid3X3 },
          { title: 'Strategic Vault', desc: 'Encrypted storage for proprietary plan logic and historical performance data.', icon: ShieldCheck },
          { title: 'Sub-ms Sync', desc: 'Synchronized plan updates across all collaborative devices with zero drift.', icon: Cloud,
  Users },
          { title: 'Plan Rollback', desc: 'Scrub through historical plan versions with real-time visual UI restoration.', icon: History }
        ].map((feature, i) => (
          <BlueprintCard key={i} title={`PROTOCOL_0${i + 1}`}>
            <div className="w-16 h-16 bg-[#FFD700]/10 flex items-center justify-center mb-10 rotate-12 group-hover:rotate-0 transition-transform duration-500">
              <feature.icon className="text-[#FFD700]" size={32} />
            </div>
            <h3 className={`${barlow.className} text-2xl font-black text-white mb-4 uppercase tracking-tighter italic`}>{feature.title}</h3>
            <p className="text-[#8FB9E0] text-sm leading-relaxed font-medium">{feature.desc}</p>
          </BlueprintCard>
        ))}
      </div>
    </div>
  </section>
)

const ProductDetail = () => (
  <section className="py-32 px-8 bg-[#002B5B] relative overflow-hidden">
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-24 items-center">
        <div className="order-2 lg:order-1 relative group">
           <div className="aspect-video bg-black border border-white/10 p-10 relative overflow-hidden">
              <div className="absolute inset-0 bg-[#FFD700]/5 group-hover:opacity-100 opacity-0 transition-opacity" />
              <div className="w-full h-full border border-dashed border-[#FFD700]/20 rounded-sm flex flex-col items-center justify-center text-center">
                 <PenTool className="text-[#FFD700]/20 animate-spin-slow" size={150} />
                 <div className="mt-8 text-[8px] font-bold text-[#FFD700] uppercase tracking-[0.5em]">Rendering_Structural_Data</div>
              </div>
              <motion.div 
                animate={{ x: [0, 400, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                className="absolute top-0 left-0 w-0.5 h-full bg-[#FFD700] shadow-[0_0_15px_#FFD700]"
              />
           </div>
           <div className="absolute -bottom-8 -left-8 bg-white text-black p-8 rounded-sm shadow-2xl rotate-6">
              <div className={`${spaceMono.className} text-xl font-black`}>BLUEPRINT_VERIFIED</div>
           </div>
        </div>
        <div className="order-1 lg:order-2">
          <div className={`${spaceMono.className} text-[#FFD700] text-[10px] tracking-[0.5em] font-bold mb-10 uppercase`}>[ ENGINE_ARCHITECTURE ]</div>
          <h2 className={`${barlow.className} text-7xl font-black text-white mb-10 leading-[0.9] uppercase italic tracking-tighter`}>CRAFTED BY <br/><span className="text-[#FFD700]">CALCULATION.</span></h2>
          <div className={`space-y-8 text-[#8FB9E0] text-xl leading-relaxed font-medium ${inter.className}`}>
            <p>Traditional plans are guesses. CampaignCradle plans are architectures. We treat every marketing variable as a load-bearing element, ensuring your strategy is stable under pressure.</p>
            <p>Our implementation of structural physics and blueprint-sync ensures that the brand legacy is as permanent as the building blocks.</p>
          </div>
          <CradleButton className="mt-12">CONNECT_MAIN_BLUEPRINT</CradleButton>
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
           <div className={`flex items-center gap-3 ${spaceMono.className} text-xl font-black tracking-widest text-white uppercase mb-10`}>
            <Layout className="text-[#FFD700]" size={24} />
            CAMPAIGN<span className="text-[#FFD700]">CRADLE</span>
          </div>
          <p className={`text-[#8FB9E0] text-[10px] max-w-xs leading-loose font-bold uppercase tracking-[0.2em] ${spaceMono.className}`}>The global standard for structural campaign planning and high-fidelity marketing architecture. Precise since 2026.</p>
        </div>
        {[
          { title: 'Structures', links: ['Blueprints', 'Funnel', 'Nodes', 'Pricing'] },
          { title: 'Foundry', links: ['About Us', 'Legitimacy', 'Careers', 'Brand'] },
          { title: 'Connect', links: ['Discord', 'Twitter', 'GitHub', 'Mainframe'] }
        ].map(group => (
          <div key={group.title}>
            <div className={`${spaceMono.className} text-xs font-black text-white mb-10 uppercase tracking-widest`}>{group.title}</div>
            <ul className="space-y-6">
              {group.links.map(link => (
                <li key={link}><a href="#" className={`${spaceMono.className} text-[8px] text-[#8FB9E0] font-black uppercase tracking-[0.3em] hover:text-[#FFD700] transition-colors`}>{link}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
        <div className={`${spaceMono.className} text-[8px] text-[#8FB9E0] uppercase tracking-[0.5em] font-black`}>© 2026 CAMPAIGNCRADLE HUB CORP. BLUEPRINT_ENCRYPTED.</div>
        <div className="flex gap-10">
           <Hammer className="text-[#8FB9E0] hover:text-[#FFD700] cursor-pointer transition-colors" size={18} />
           <PenTool className="text-[#8FB9E0] hover:text-[#FFD700] cursor-pointer transition-colors" size={18} />
        </div>
      </div>
    </div>
  </footer>
)

export default function CampaignCradle() {
  return (
    <div className={`min-h-screen bg-[#002B5B] text-white overflow-x-hidden ${inter.className} ${spaceMono.variable} ${barlow.variable}`}>
      <Navbar />
      <Hero />
      <StatsBar />
      <Features />
      <ProductDetail />
      <Footer />
      
      {/* --- Global Effects --- */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.05] contrast-150 mix-blend-screen">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <filter id="cradle-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100" height="100" filter="url(#cradle-noise)" />
        </svg>
      </div>
    </div>
  )
}
