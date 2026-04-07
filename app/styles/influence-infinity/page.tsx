'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { 
  Users, 
  Globe, 
  Sparkles, 
  ShieldCheck, 
  ChevronDown, 
  ArrowRight,
  TrendingUp,
  Zap,
  Layout,
  Target,
  Award,
  Share2,
  Hexagon,
  Network,
  Activity,
  PenTool
} from 'lucide-react'
import { Tenor_Sans, Inter, JetBrains_Mono } from 'next/font/google'

const tenor = Tenor_Sans({ weight: '400', subsets: ['latin'], variable: '--font-tenor' })
const inter = Inter({ subsets: ['latin'] })
const mono = JetBrains_Mono({ subsets: ['latin'] })

// --- Design Tokens ---
const tokens = {
  colors: {
    background: "#0A0A0A",
    surface: "#1A1A1A",
    accent1: "#D4AF37", // Influence Gold
    accent2: "#FFFFFF", // Pure White
    border: "rgba(212, 175, 55, 0.2)",
    textHigh: "#FFFFFF",
    textLow: "#999999"
  },
  physics: {
    drift: { animate: { x: [0, 5, 0], y: [0, -5, 0] }, transition: { duration: 5, repeat: Infinity } }
  }
}

// --- Components ---

const InfluenceButton = ({ children, variant = 'primary', className = '' }: any) => (
  <motion.button
    whileHover={{ scale: 1.02, letterSpacing: '0.1em' }}
    whileTap={{ scale: 0.98 }}
    className={`px-10 py-4 ${tenor.className} font-semibold transition-all relative group overflow-hidden border ${
      variant === 'primary' 
        ? `bg-[#D4AF37] text-black border-[#D4AF37]` 
        : `bg-transparent text-[#D4AF37] border-[#D4AF37]/30`
    } ${className}`}
  >
    <span className="relative z-10 flex items-center justify-center gap-3 uppercase tracking-widest text-xs">{children}</span>
    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
  </motion.button>
)

const HexCard = ({ children, className = '', title = '' }: any) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    className={`bg-[#1A1A1A] border border-white/5 p-10 relative group ${className}`}
    style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' }}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    <div className="relative z-10 flex flex-col items-center text-center">
      {children}
      {title && <div className={`${tenor.className} text-xl text-[#D4AF37] mt-4 uppercase`}>{title}</div>}
    </div>
  </motion.div>
)

// --- Sections ---

const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 bg-[#0A0A0A]/80 backdrop-blur-xl px-8 py-6 border-b border-[#D4AF37]/10">
    <div className="max-w-7xl mx-auto flex items-center justify-between">
      <div className={`flex items-center gap-3 ${tenor.className} text-2xl font-black tracking-widest text-[#D4AF37]`}>
        <Hexagon size={28} />
        INFLUENCE<span className="text-white font-light">INFINITY</span>
      </div>
      <div className="hidden md:flex items-center gap-12 text-[#999999] font-bold text-[10px] tracking-[0.4em] uppercase">
        {['Inner Circle', 'Network', 'Impact', 'Mainframe'].map(item => (
          <a key={item} href="#" className="hover:text-[#D4AF37] transition-colors">{item}</a>
        ))}
      </div>
      <InfluenceButton className="hidden md:block py-2 text-[10px]" variant="secondary">AUTH_WALLET</InfluenceButton>
    </div>
  </nav>
)

const Hero = () => {
  return (
    <section className="pt-40 pb-20 px-8 relative overflow-hidden min-h-screen flex items-center bg-black">
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] border border-[#D4AF37]/5 rounded-full" 
        />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
      </div>
      
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <div className="flex items-center gap-3 mb-10">
            <div className="w-2 h-2 bg-[#D4AF37] rounded-full animate-pulse shadow-[0_0_10px_#D4AF37]" />
            <span className={`text-[10px] font-black text-[#D4AF37] tracking-[0.5em] uppercase ${mono.className}`}>Connection_Established_v3.0</span>
          </div>
          <h1 className={`${tenor.className} text-7xl md:text-[9rem] font-black text-white leading-[0.8] mb-12 uppercase tracking-tighter`}>
            INNER <br/> <span className="text-[#D4AF37] drop-shadow-[0_0_30px_rgba(212,175,55,0.3)]">CIRCLE.</span>
          </h1>
          <p className={`text-[#999999] text-xl max-w-xl mb-16 leading-relaxed font-medium ${inter.className}`}>
            InfluenceInfinity is the high-stakes network for premium brand connection. Orchestrate global impact with hexagonal precision and elite digital craftsmanship.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-10">
            <InfluenceButton>ENTER_THE_CIRCLE</InfluenceButton>
            <div className={`flex items-center gap-4 text-white font-black tracking-widest text-[10px] cursor-pointer group`}>
              VIEW_GLOBAL_MAP <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform text-[#D4AF37]" />
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="relative"
        >
          <div className="bg-[#1A1A1A] border border-white/5 p-1 rounded-[60px] shadow-[0_50px_100px_rgba(212,175,55,0.1)] relative overflow-hidden group">
            <div className="absolute inset-0 bg-[#D4AF37]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="w-full aspect-square border border-[#D4AF37]/20 rounded-[60px] flex items-center justify-center p-12">
               <motion.div animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="relative">
                  <Globe className="text-[#D4AF37]/20" size={250} strokeWidth={0.5} />
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <Users className="text-[#D4AF37]" size={100} />
                  </motion.div>
               </motion.div>
            </div>
          </div>
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="absolute -top-10 -right-10 bg-[#D4AF37] text-black p-8 rounded-[30px] shadow-2xl rotate-12"
          >
            <Award size={32} />
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
          { label: 'Network Nodes', value: '1.2M+', icon: Users },
          { label: 'Total Reach', value: '4.8B', icon: Globe },
          { label: 'Impact ROI', value: '12.4X', icon: Zap },
          { label: 'Global rank', value: '#01', icon: Award }
        ].map((stat, i) => (
          <motion.div key={i} whileHover={{ y: -5 }}>
            <div className={`${tenor.className} text-6xl font-black text-white mb-2`}>{stat.value}</div>
            <div className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.4em]">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)

const Features = () => (
  <section className="py-32 px-8 bg-black">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-24">
        <h2 className={`${tenor.className} text-5xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter`}>HEXAGONAL ARCHITECTURE</h2>
        <p className={`text-[#999999] max-w-2xl mx-auto text-lg leading-relaxed ${inter.className}`}>We use interconnected logic to ensure every influencer bond is permanent and high-value.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {[
          { title: 'Inner Circle HUD', desc: 'Interfaces that expand and contract based on real-time network activity and user seniority.', icon: Network },
          { title: 'Aura Hover FX', desc: 'Section transitions that use high-fidelity golden halos and soft-focus reveals.', icon: Sparkles },
          { title: 'Honeycomb Grid', desc: 'Rhythmic, high-contrast grid systems for influencer discovery and talent mapping.', icon: Hexagon },
          { title: 'Mainframe Sync', desc: 'Sub-ms multi-device synchronization for high-stakes digital agency environments.', icon: Activity },
          { title: 'Influence Vault', desc: 'Encrypted storage for proprietary talent data and high-value campaign logs.', icon: ShieldCheck },
          { title: 'Metric Radar', desc: 'Predictive ROI analytics that map the long-term impact of emotional brand loyalty.', icon: TrendingUp }
        ].map((feature, i) => (
          <HexCard key={i} title={feature.title}>
            <div className="w-16 h-16 bg-[#D4AF37]/5 rounded-full flex items-center justify-center mb-6">
              <feature.icon className="text-[#D4AF37]" size={32} />
            </div>
            <p className="text-[#999999] text-xs leading-relaxed">{feature.desc}</p>
          </HexCard>
        ))}
      </div>
    </div>
  </section>
)

const ProductDetail = () => (
  <section className="py-32 px-8 bg-[#0A0A0A] relative overflow-hidden">
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-24 items-center">
        <div className="relative p-10 border-4 border-dashed border-[#D4AF37]/20 rounded-[80px]">
          <div className="aspect-square bg-black rounded-[60px] shadow-2xl flex items-center justify-center overflow-hidden relative group">
            <motion.div 
              animate={{ scale: [1, 1.1, 1], rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#D4AF3711_0%,_transparent_70%)]" 
            />
            <PenTool className="text-[#D4AF37]/20" size={200} />
            <div className="absolute bottom-10 left-10 right-10 bg-black/90 backdrop-blur-md p-10 rounded-[40px] border border-white/5 shadow-xl">
              <div className={`${tenor.className} text-2xl font-black text-[#D4AF37] mb-2`}>The Influence Lab</div>
              <p className="text-[#999999] text-sm font-medium">Testing brand frequency across 1,200+ elite creators.</p>
            </div>
          </div>
          <div className="absolute -top-10 -left-10 bg-white text-black p-8 rounded-full shadow-2xl rotate-12">
            <Sparkles size={32} />
          </div>
        </div>
        <div>
          <div className={`mb-10 ${inter.className} text-[#D4AF37] font-black tracking-[0.5em] uppercase text-[10px]`}>[ ELITE_NETWORK_ENGINEERING ]</div>
          <h2 className={`${tenor.className} text-6xl font-black text-white mb-10 leading-[0.9] uppercase tracking-tighter`}>A BOND THAT <br/> <span className="text-[#D4AF37]">DOMINATES.</span></h2>
          <div className={`space-y-8 text-[#999999] text-xl leading-relaxed ${inter.className}`}>
            <p>Traditional agencies focus on numbers. InfluenceInfinity focuses on depth. We treat every digital connection as a high-value asset, ensuring your brand feels exclusive and trusted.</p>
            <p>Our implementation of hexagonal physics and aura transitions ensures that your site isn't just visited—it's revered.</p>
          </div>
          <InfluenceButton className="mt-12">CONNECT_MAIN_NODE</InfluenceButton>
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
          <div className={`flex items-center gap-2 ${tenor.className} text-2xl font-black tracking-tight text-[#D4AF37] mb-8 uppercase`}>
            <Hexagon className="text-[#D4AF37]" size={28} />
            INFLUENCE<span className="text-white">INFINITY</span>
          </div>
          <p className="text-[#999999] text-sm leading-relaxed max-w-xs font-medium uppercase tracking-widest leading-loose">The global standard for professional influencer network management and high-stakes digital agency analytics. Elite since 2026.</p>
        </div>
        {[
          { title: 'The Circle', links: ['Inner Circle', 'Branding', 'Success', 'Pricing'] },
          { title: 'Foundry', links: ['The Lab', 'Mainframe', 'Careers', 'Brand'] },
          { title: 'Connect', links: ['Instagram', 'LinkedIn', 'Discord', 'Terminal'] }
        ].map(group => (
          <div key={group.title}>
            <div className="text-[10px] font-black text-white uppercase tracking-[0.4em] mb-10">{group.title}</div>
            <ul className="space-y-6">
              {group.links.map(link => (
                <li key={link}><a href="#" className="text-sm font-bold text-[#999999] hover:text-[#D4AF37] transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="text-[#999999] text-[10px] font-black uppercase tracking-[0.6em]">© 2026 INFLUENCEINFINITY HUB CORP. NETWORK_ENCRYPTED.</div>
        <div className="flex gap-10">
          <Activity className="text-[#999999] hover:text-[#D4AF37] cursor-pointer transition-colors" size={20} />
          <Share2 className="text-[#999999] hover:text-[#D4AF37] cursor-pointer transition-colors" size={20} />
        </div>
      </div>
    </div>
  </footer>
)

export default function InfluenceInfinity() {
  return (
    <div className={`min-h-screen bg-black text-white overflow-x-hidden ${inter.className}`}>
      <Navbar />
      <Hero />
      <StatsBar />
      <Features />
      <ProductDetail />
      <Footer />
      
      {/* --- Global Effects --- */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.05] contrast-150 mix-blend-overlay">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <filter id="influence-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100" height="100" filter="url(#influence-noise)" />
        </svg>
      </div>
      
      </div>
  )
}
