'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { 
  Box, 
  Layers, 
  Sparkles, 
  ChevronRight, 
  ArrowRight,
  Target,
  Zap,
  Globe,
  Monitor,
  Activity,
  Award,
  Users,
  Layout,
  Palette,
  Camera,
  Share2,
  MousePointer2,
  Rocket,
} from 'lucide-react'
import { Syne, Inter } from 'next/font/google'

const syne = Syne({ subsets: ['latin'], weight: ['400', '700', '800'] })
const inter = Inter({ subsets: ['latin'] })

// --- Design Tokens ---
const tokens = {
  colors: {
    background: "#000000",
    surface: "#0A0A0A",
    accent1: "#FF3E00", // Impact Orange
    accent2: "#00F3FF", // High Oxygen Cyan
    border: "rgba(255, 255, 255, 0.1)",
    textHigh: "#FFFFFF",
    textLow: "#666666"
  },
  physics: {
    orbit: { animate: { rotate: 360 }, transition: { duration: 20, repeat: Infinity, ease: [0, 0, 1, 1] } }
  }
}

// --- Components ---

const AgencyButton = ({ children, variant = 'primary', className = '' }: any) => (
  <motion.button
    whileHover={{ scale: 1.05, letterSpacing: '0.1em' }}
    whileTap={{ scale: 0.95 }}
    className={`px-12 py-5 ${syne.className} font-extrabold text-lg transition-all relative group overflow-hidden ${
      variant === 'primary' 
        ? `bg-white text-black` 
        : `bg-transparent text-white border border-white/20`
    } ${className}`}
  >
    <span className="relative z-10 flex items-center justify-center gap-3 uppercase italic tracking-tighter">
      {children}
      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
    </span>
    <div className="absolute inset-0 bg-gradient-to-r from-[#FF3E00] to-[#00F3FF] opacity-0 group-hover:opacity-20 transition-opacity" />
  </motion.button>
)

const OrbitCard = ({ children, className = '', title = '' }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ y: -10 }}
    className={`bg-[#0A0A0A] border border-white/5 p-12 relative group overflow-hidden ${className}`}
  >
    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF3E00] to-[#00F3FF] scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
    {title && <div className={`${syne.className} text-[10px] font-black text-[#FF3E00] uppercase tracking-[0.4em] mb-10`}>{title}</div>}
    {children}
  </motion.div>
)

// --- Sections ---

const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 px-8 py-10 bg-gradient-to-b from-black to-transparent">
    <div className="max-w-7xl mx-auto flex items-center justify-between">
      <div className={`flex items-center gap-3 ${syne.className} text-3xl font-extrabold tracking-tighter text-white uppercase italic`}>
        <div className="w-8 h-8 border-2 border-white rotate-45 flex items-center justify-center">
          <div className="w-4 h-4 bg-white -rotate-45" />
        </div>
        ADAGENCY<span className="text-white/40">360</span>
      </div>
      <div className="hidden md:flex items-center gap-12 text-[#666666] font-bold text-[10px] tracking-[0.5em] uppercase">
        {['The Orbit', 'Modules', 'Impact', 'Network'].map(item => (
          <a key={item} href="#" className="hover:text-white transition-colors relative group">
            {item}
            <span className="absolute -bottom-2 left-0 w-full h-px bg-white scale-x-0 group-hover:scale-x-100 transition-transform" />
          </a>
        ))}
      </div>
      <AgencyButton className="hidden md:block py-2 px-8 text-[10px]" variant="secondary">AUTH_AGENCY</AgencyButton>
    </div>
  </nav>
)

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-8 overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: [0, 0, 1, 1] }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] border border-white/5 rounded-full" 
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 60, repeat: Infinity, ease: [0, 0, 1, 1] }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full" 
        />
      </div>
      
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`inline-block mb-10 px-8 py-2 border border-white/10 rounded-full text-[10px] tracking-[0.6em] font-black uppercase text-white/40 ${inter.className}`}
        >
          Full-Service Impact Foundry
        </motion.div>
        <h1 className={`${syne.className} text-8xl md:text-[12rem] font-extrabold text-white leading-[0.8] mb-16 uppercase italic tracking-tighter`}>
          ORBITAL <br/> <span className="text-[#FF3E00] drop-shadow-[0_0_40px_rgba(255,62,0,0.3)]">REACH.</span>
        </h1>
        <p className={`text-white/40 text-2xl max-w-2xl mx-auto mb-20 leading-relaxed font-medium ${inter.className}`}>
          AdAgency360 is the high-stakes engine for global digital saturation. We turn creative energy into permanent digital gravity that pulls audiences in.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-12">
          <AgencyButton>INITIALIZE_CAMPAIGN</AgencyButton>
          <div className={`flex items-center gap-4 text-white font-black tracking-widest text-sm cursor-pointer group`}>
            THE_360_VIEW <Globe size={20} className="group-hover:scale-110 transition-transform text-[#00F3FF]" />
          </div>
        </div>
      </div>
      
      <motion.div 
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: [0.42, 0, 0.58, 1] }}
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
          { label: 'Impressions', value: '4.8B+', icon: Globe },
          { label: 'Campaigns', value: '850', icon: Layout },
          { label: 'Market ROI', value: '12.4X', icon: Zap },
          { label: 'Global Rank', value: '#01', icon: Award }
        ].map((stat, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.1 }}
            className="flex flex-col items-center group"
          >
            <div className={`${syne.className} text-7xl font-extrabold text-white mb-2 italic`}>{stat.value}</div>
            <div className="text-[10px] tracking-[0.5em] uppercase font-black text-white/20 group-hover:text-[#FF3E00] transition-colors">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)

const Features = () => (
  <section className="py-40 px-8 bg-black">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-12">
        <h2 className={`${syne.className} text-7xl font-extrabold uppercase italic leading-none text-white`}>AGENCY <br/><span className="text-white/20 not-italic">MODULES</span></h2>
        <p className="text-white/30 max-w-md text-xl leading-relaxed font-medium">Deploy 360-degree impact architecture built for global brand saturation.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-10">
        {[
          { title: 'Orbital Service', desc: 'Interfaces that orbit the user\'s focus, utilizing high-fidelity 3D perspective mapping and rotation.', icon: Rocket },
          { title: 'Impact Reveal', desc: 'Section entries that use high-impact strobe reveals and chromatic aberration for big brand drops.', icon: Sparkles },
          { title: 'Global Sync', desc: 'Sub-ms multi-device synchronization for high-stakes digital agency environments.', icon: Activity },
          { title: 'Foundry Logic', desc: 'A proprietary creative engine that builds unique visual typefaces for your brand story.', icon: Palette },
          { title: 'Network Vault', desc: 'Encrypted storage for proprietary talent data and high-value interaction logs.', icon: ShieldCheck },
          { title: '360 Analytics', desc: 'Predictive ROI analytics that map the long-term impact of emotional brand loyalty.', icon: TrendingUp }
        ].map((feature, i) => (
          <OrbitCard key={i} title={`PROTOCOL_0${i + 1}`}>
            <div className="w-16 h-16 border border-white/10 flex items-center justify-center mb-10 rotate-45 group-hover:rotate-0 transition-transform duration-500 bg-white/5">
              <feature.icon className="text-white -rotate-45 group-hover:rotate-0 transition-transform duration-500" size={32} />
            </div>
            <h3 className={`${syne.className} text-2xl font-extrabold text-white mb-4 uppercase tracking-tighter italic`}>{feature.title}</h3>
            <p className="text-white/40 text-sm leading-relaxed font-medium">{feature.desc}</p>
          </OrbitCard>
        ))}
      </div>
    </div>
  </section>
)

const ProductDetail = () => (
  <section className="py-40 px-8 bg-[#080808] relative overflow-hidden">
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-24 items-center">
        <div className="order-2 lg:order-1 relative group">
          <div className="aspect-square bg-black border border-white/5 rounded-full p-16 relative overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#FFFFFF08_0%,_transparent_70%)]" />
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: [0, 0, 1, 1] }}
              className="absolute inset-0 border border-dashed border-white/10 rounded-full"
            />
            <Activity className="text-white/10" size={300} strokeWidth={0.5} />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <div className={`${syne.className} text-6xl font-extrabold text-white italic`}>360°</div>
              <div className="text-[10px] font-black text-white/40 uppercase tracking-[0.5em] mt-2">SATURATION_SYNC</div>
            </div>
          </div>
          <div className="absolute -top-10 -right-10 bg-[#FF3E00] text-black p-12 rounded-sm shadow-2xl rotate-12 group-hover:rotate-0 transition-transform duration-700">
            <div className={`${syne.className} text-3xl font-extrabold italic`}>ELITE_AGENCY</div>
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <div className={`${syne.className} text-[#00F3FF] font-black tracking-[0.6em] uppercase text-[10px]`}>[ AGENCY_ARCHITECTURE ]</div>
          <h2 className={`${syne.className} text-7xl font-extrabold text-white mb-10 leading-[0.9] uppercase italic tracking-tighter`}>BEYOND THE <br/> <span className="text-white/20 not-italic">SATURATION.</span></h2>
          <div className={`space-y-10 text-white/40 text-xl leading-relaxed font-medium ${inter.className}`}>
            <p>Traditional agencies focus on one angle. AdAgency360 focuses on the entire orbit. We treat every digital signal as a unit of value, carefully orchestrating its motion and light to ensure your brand is always alive.</p>
            <p>Our implementation of orbital physics and high-fidelity reveals ensures that your legacy is as permanent as the stars.</p>
          </div>
          <AgencyButton className="mt-16">CONNECT_AGENCY_NODE</AgencyButton>
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
          <div className={`${syne.className} text-3xl font-extrabold uppercase text-white mb-8 italic`}>ADAGENCY<span className="font-light opacity-40 not-italic ml-1">360</span></div>
          <p className="text-white/30 text-xs leading-loose font-black uppercase tracking-[0.2em] max-w-xs">Building the orbital future of digital impact and high-stakes agency analytics. Professional since 2026.</p>
        </div>
        {[
          { title: 'The Orbit', links: ['Services', 'Modules', 'Impact', 'Pricing'] },
          { title: 'Agency', links: ['About Us', 'Legitimacy', 'Careers', 'Brand'] },
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
        <div className="text-white/20 text-[10px] font-black uppercase tracking-[0.6em]">© 2026 ADAGENCY360 IMPACT CORP. ALL ORBITS RESERVED.</div>
        <div className="flex gap-10">
          <Share2 className="text-white/20 hover:text-white transition-colors cursor-pointer" size={20} />
          <Award className="text-white/20 hover:text-white transition-colors cursor-pointer" size={20} />
        </div>
      </div>
    </div>
  </footer>
)

const ShieldCheck = ({ className, size }: any) => <ShieldCheckOriginal className={className} size={size} />
import { ShieldCheck as ShieldCheckOriginal, TrendingUp as TrendingUpIcon } from 'lucide-react'
const TrendingUp = ({ className, size }: any) => <TrendingUpIcon className={className} size={size} />

export default function AdAgency360() {
  return (
    <div className={`min-h-screen bg-black text-white overflow-x-hidden ${inter.className}`}>
      <Navbar />
      <Hero />
      <StatsBar />
      <Features />
      <ProductDetail />
      <Footer />
      
      {/* --- Global Effects --- */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.08] contrast-150 mix-blend-overlay">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <filter id="agency-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100" height="100" filter="url(#agency-noise)" />
        </svg>
      </div>
      
      </div>
  )
}
