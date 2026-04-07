'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { 
  Camera, 
  Maximize2, 
  ChevronRight, 
  Zap, 
  Target, 
  Award, 
  Users, 
  Shield, 
  Play,
  ArrowRight,
  Focus,
  Aperture,
  Film,
  ThermometerSun,
  Layout,
  Share2,
  Image as ImageIcon
} from 'lucide-react'
import { Cormorant_Garamond, Inter, JetBrains_Mono } from 'next/font/google'

const cormorant = Cormorant_Garamond({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-cormorant' })
const inter = Inter({ subsets: ['latin'] })
const mono = JetBrains_Mono({ subsets: ['latin'] })

// --- Design Tokens ---
const tokens = {
  colors: {
    background: "#050505",
    surface: "#121212",
    accent1: "#FFFFFF", // Flash White
    accent2: "#333333", // Shadow Grey
    border: "#1F1F1F",
    textHigh: "#FFFFFF",
    textLow: "#666666"
  },
  physics: {
    cinematic: { type: "spring" as any, stiffness: 100, damping: 20, mass: 1.5 }
  }
}

// --- Components ---

const StudioButton = ({ children, variant = 'primary', className = '' }: any) => (
  <motion.button
    whileHover={{ scale: 1.05, letterSpacing: '0.1em' }}
    whileTap={{ scale: 0.95 }}
    className={`px-12 py-5 ${cormorant.className} font-bold text-lg transition-all relative group overflow-hidden ${
      variant === 'primary' 
        ? `bg-white text-black` 
        : `bg-transparent text-white border border-white/20`
    } ${className}`}
  >
    <span className="relative z-10 flex items-center justify-center gap-3 uppercase italic tracking-tighter">
      {children}
      <Focus size={18} className={variant === 'primary' ? 'text-black' : 'text-white'} />
    </span>
    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
  </motion.button>
)

const FrameCard = ({ children, className = '', title = '' }: any) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    whileHover={{ y: -5 }}
    className={`bg-[#121212] border border-[#1F1F1F] p-10 relative group overflow-hidden ${className}`}
  >
    <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
      <Aperture className="text-white" size={24} />
    </div>
    {title && <div className={`${mono.className} text-[8px] font-bold text-[#666666] uppercase tracking-[0.4em] mb-8`}>{title}</div>}
    {children}
  </motion.div>
)

// --- Sections ---

const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 px-8 py-10 bg-gradient-to-b from-black to-transparent">
    <div className="max-w-7xl mx-auto flex items-center justify-between">
      <div className={`flex items-center gap-3 ${cormorant.className} text-3xl font-bold tracking-tighter text-white uppercase italic`}>
        <Camera size={28} />
        STUDIO<span className="font-light opacity-40 not-italic ml-1">STACK</span>
      </div>
      <div className="hidden md:flex items-center gap-12 text-[#666666] font-bold text-[10px] tracking-[0.5em] uppercase">
        {['The Shot', 'Archives', 'Legacy', 'Connect'].map(item => (
          <a key={item} href="#" className="hover:text-white transition-colors relative group">
            {item}
            <span className="absolute -bottom-2 left-0 w-full h-px bg-white scale-x-0 group-hover:scale-x-100 transition-transform" />
          </a>
        ))}
      </div>
      <StudioButton className="hidden md:block py-2 px-8 text-[10px]" variant="secondary">INITIALIZE_SHOT</StudioButton>
    </div>
  </nav>
)

const Hero = () => {
  const [flash, setFlash] = useState(false)
  
  const triggerFlash = () => {
    setFlash(true)
    setTimeout(() => setFlash(false), 100)
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center px-8 overflow-hidden bg-black">
      <AnimatePresence>
        {flash && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-white pointer-events-none" 
          />
        )}
      </AnimatePresence>
      
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#FFFFFF08_0%,_transparent_60%)]" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')] opacity-30" />
      </div>
      
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`inline-block mb-10 px-8 py-2 border border-white/10 rounded-full text-[10px] tracking-[0.6em] font-black uppercase text-white/40 ${inter.className}`}
        >
          High-Fidelity Optical Foundry
        </motion.div>
        <h1 className={`${cormorant.className} text-8xl md:text-[14rem] font-bold text-white leading-[0.8] mb-16 uppercase italic tracking-tighter`}>
          CAPTURE <br/> <span className="opacity-20 font-light not-italic">THE LIGHT.</span>
        </h1>
        <p className={`text-white/40 text-2xl max-w-2xl mx-auto mb-20 leading-relaxed font-medium ${inter.className}`}>
          StudioStack is the digital darkroom for elite visual storytellers. We turn light and motion into permanent cinematic artifacts that command attention.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-12">
          <StudioButton onClick={triggerFlash}>TRIGGER_EXPOSURE</StudioButton>
          <div className={`flex items-center gap-4 text-white font-black tracking-widest text-sm cursor-pointer group`}>
            VIEW_THE_PORTFOLIO <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
          </div>
        </div>
      </div>
      
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: [0.42, 0, 0.58, 1] }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/20 flex flex-col items-center gap-4"
      >
        <div className="text-[8px] tracking-[0.6em] uppercase font-black">Scroll_to_Expose</div>
        <div className="w-px h-24 bg-gradient-to-b from-white/20 to-transparent" />
      </motion.div>
    </section>
  )
}

const StatsBar = () => (
  <section className="py-24 border-y border-white/5 bg-[#050505]">
    <div className="max-w-7xl mx-auto px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-16 text-center">
        {[
          { label: 'Exposures Built', value: '1.2K+', icon: Camera },
          { label: 'Optical Sync', value: '99.9%', icon: Focus },
          { label: 'Digital ROI', value: '12.4X', icon: Zap },
          { label: 'Global Clients', value: '150+', icon: Users }
        ].map((stat, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.1 }}
            className="flex flex-col items-center group"
          >
            <div className={`${cormorant.className} text-7xl font-bold text-white mb-2 italic`}>{stat.value}</div>
            <div className="text-[10px] tracking-[0.5em] uppercase font-black text-white/20 group-hover:text-white transition-colors">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)

const Features = () => (
  <section className="py-32 px-8 bg-black">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-start justify-between mb-24 gap-12">
        <h2 className={`${cormorant.className} text-7xl font-bold uppercase italic leading-none text-white`}>OPTICAL <br/><span className="text-white/20 not-italic">PROTOCOLS</span></h2>
        <p className="text-white/30 max-w-md text-xl leading-relaxed font-medium">Deploy light-sensitive presentation architecture built for high-stakes storytelling.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-10">
        {[
          { title: 'Shutter Flash', desc: 'Section transitions that use high-impact strobe reveals and chromatic aberration for maximum drama.', icon: Aperture },
          { title: 'Viewfinder HUD', desc: 'A persistent, low-opacity overlay of a camera viewfinder including focus points and battery levels.', icon: Focus },
          { title: 'Film-Strip Scroll', desc: 'A horizontal scroller that feels like pulling a physical film reel, utilizing high-stiffness spring physics.', icon: Film },
          { title: 'Exposure Reveal', desc: 'Interfaces that build themselves in front of the user, starting as overexposed white wireframes.', icon: ThermometerSun },
          { title: 'Impact Metrics', desc: 'Predictive analytics that map the psychological weight of every image in your portfolio.', icon: Target },
          { title: 'Secure Negative', desc: 'Onyx-grade encryption for proprietary photography and digital intellectual property.', icon: Shield }
        ].map((feature, i) => (
          <FrameCard key={i}>
            <div className="w-16 h-16 border border-white/10 flex items-center justify-center mb-10 rotate-45 group-hover:rotate-0 transition-transform duration-500 bg-white/5">
              <feature.icon className="text-white -rotate-45 group-hover:rotate-0 transition-transform duration-500" size={32} />
            </div>
            <h3 className={`${cormorant.className} text-3xl font-bold text-white mb-4 uppercase tracking-tighter italic`}>{feature.title}</h3>
            <p className="text-white/40 text-sm leading-relaxed font-medium">{feature.desc}</p>
          </FrameCard>
        ))}
      </div>
    </div>
  </section>
)

const ProductDetail = () => (
  <section className="py-32 px-8 bg-[#080808] relative overflow-hidden">
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-24 items-center">
        <div className="relative group">
          <div className="aspect-square bg-black border border-white/5 p-8 relative overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#FFFFFF08_0%,_transparent_70%)]" />
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: [0, 0, 1, 1] }}
              className="absolute inset-0 border border-dashed border-white/10 rounded-full"
            />
            <Focus className="text-white/10" size={300} strokeWidth={0.5} />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <div className={`${mono.className} text-6xl font-bold text-white italic`}>f/1.4</div>
              <div className="text-[10px] font-black text-white/40 uppercase tracking-[0.5em] mt-2">DEPTH_RENDER_SYNC</div>
            </div>
          </div>
          <div className="absolute -bottom-10 -right-10 bg-white text-black p-12 rounded-sm shadow-2xl rotate-6 group-hover:rotate-0 transition-transform duration-700">
            <div className={`${cormorant.className} text-3xl font-bold italic`}>STUDIO_CERTIFIED</div>
          </div>
        </div>
        <div>
          <div className={`mb-10 ${mono.className} text-white font-black tracking-[0.6em] uppercase text-[10px]`}>[ OPTICAL_ARCHITECTURE ]</div>
          <h2 className={`${cormorant.className} text-7xl font-bold text-white mb-10 leading-[0.9] uppercase italic tracking-tighter`}>BEYOND THE <br/> <span className="opacity-20 not-italic">EXPOSURE.</span></h2>
          <div className={`space-y-10 text-white/40 text-xl leading-relaxed font-medium ${inter.className}`}>
            <p>Traditional portfolios are static grids. StudioStack is a cinematic event. We treat every image as a scene, every transition as a revelation, and every pixel as a photon.</p>
            <p>Our implementation of shutter physics and optical HUDs ensures that your audience remains captivated from the first frame to the final close.</p>
          </div>
          <StudioButton className="mt-16">CONNECT_STUDIO_NODE</StudioButton>
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
          <div className={`${cormorant.className} text-3xl font-bold uppercase text-white mb-8 italic`}>STUDIO<span className="font-light opacity-40 not-italic ml-1">STACK</span></div>
          <p className="text-white/30 text-xs leading-loose font-black uppercase tracking-[0.2em] max-w-xs">Building the theatrical future of digital photography and high-stakes visual storytelling. Light-sensitive since 2026.</p>
        </div>
        {[
          { title: 'The Shot', links: ['Archives', 'Viewfinder', 'Metadata', 'Pricing'] },
          { title: 'Agency', links: ['About Us', 'Darkroom', 'Careers', 'Brand'] },
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
        <div className="text-white/20 text-[10px] font-black uppercase tracking-[0.6em]">© 2026 STUDIOSTACK OPTICAL CORP. ALL EXPOSURES RESERVED.</div>
        <div className="flex gap-10">
          <Share2 className="text-white/20 hover:text-white transition-colors cursor-pointer" size={20} />
          <Award className="text-white/20 hover:text-white transition-colors cursor-pointer" size={20} />
        </div>
      </div>
    </div>
  </footer>
)

export default function StudioStack() {
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
          <filter id="studio-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100" height="100" filter="url(#studio-noise)" />
        </svg>
      </div>
    </div>
  )
}
