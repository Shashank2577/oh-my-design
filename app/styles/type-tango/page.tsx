'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { 
  Type, 
  Sparkles,
  Globe,
  Layers, 
  PenTool, 
  Maximize2, 
  ChevronRight, 
  ArrowRight,
  Zap,
  Award,
  Users,
  Target,
  Share2,
  Bookmark,
  MousePointer2,
  Scan,
  Activity,
  Palette
} from 'lucide-react'
import { Fraunces, Inter, JetBrains_Mono, Bricolage_Grotesque } from 'next/font/google'

const fraunces = Fraunces({ subsets: ['latin'], weight: ['400', '700', '900'], variable: '--font-fraunces' })
const inter = Inter({ subsets: ['latin'] })
const mono = JetBrains_Mono({ subsets: ['latin'] })
const bricolage = Bricolage_Grotesque({ subsets: ['latin'], weight: ['400', '800'], variable: '--font-bricolage' })

// --- Design Tokens ---
const tokens = {
  colors: {
    background: "#FFFFFF",
    surface: "#F0F0F0",
    accent1: "#000000", // Ink Black
    accent2: "#FF0000", // Proofing Red
    border: "rgba(0, 0, 0, 0.1)",
    textHigh: "#000000",
    textLow: "#888888"
  },
  physics: {
    kinetic: { type: "spring" as any, stiffness: 200, damping: 15, mass: 1 }
  }
}

// --- Components ---

const TangoButton = ({ children, variant = 'primary', className = '' }: any) => (
  <motion.button
    whileHover={{ scale: 1.05, letterSpacing: '0.1em' }}
    whileTap={{ scale: 0.95 }}
    className={`px-12 py-5 ${bricolage.className} font-black text-lg transition-all relative group overflow-hidden border ${
      variant === 'primary' 
        ? `bg-black text-white border-black shadow-[0_20px_40px_rgba(0,0,0,0.1)]` 
        : `bg-transparent text-black border-black/20`
    } ${className}`}
  >
    <span className="relative z-10 flex items-center justify-center gap-3 uppercase italic tracking-tighter">
      {children}
      <Type size={18} className="group-hover:rotate-12 transition-transform" />
    </span>
    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
  </motion.button>
)

const GlyphCard = ({ children, className = '', title = '' }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ y: -10, skewX: -2 }}
    className={`bg-white border border-black/5 p-12 relative group ${className}`}
    style={{ boxShadow: '0 40px 80px rgba(0,0,0,0.02)' }}
  >
    <div className="absolute top-0 left-0 w-1 h-full bg-black scale-y-0 group-hover:scale-y-100 transition-transform duration-700 origin-top" />
    {title && <div className={`${mono.className} text-[8px] font-bold text-black uppercase tracking-[0.4em] mb-10`}>{title}</div>}
    {children}
  </motion.div>
)

// --- Sections ---

const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md px-8 py-8 border-b border-black/5">
    <div className="max-w-7xl mx-auto flex items-center justify-between">
      <div className={`flex items-center gap-3 ${bricolage.className} text-3xl font-black tracking-tighter text-black uppercase italic`}>
        <Type className="text-black" size={32} strokeWidth={3} />
        TYPE<span className="font-light opacity-40 not-italic ml-1">TANGO</span>
      </div>
      <div className="hidden md:flex items-center gap-12 text-[#888888] font-bold text-[10px] tracking-[0.5em] uppercase">
        {['The Foundry', 'Glyphs', 'Layouts', 'Connect'].map(item => (
          <a key={item} href="#" className="hover:text-black transition-colors relative group">
            {item}
            <span className="absolute -bottom-2 left-0 w-full h-px bg-black scale-x-0 group-hover:scale-x-100 transition-transform" />
          </a>
        ))}
      </div>
      <TangoButton className="hidden md:block py-2 px-8 text-[10px]" variant="secondary">AUTH_FOUNDRY</TangoButton>
    </div>
  </nav>
)

const Hero = () => {
  const [weight, setWeight] = useState(400)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setWeight(prev => prev === 400 ? 900 : 400)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center px-8 overflow-hidden bg-white">
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="w-full h-full bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>
      
      <div className="max-w-6xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`inline-block mb-10 px-8 py-2 border border-black/10 rounded-full text-[10px] font-black uppercase text-black/40 ${inter.className} tracking-[0.6em]`}
        >
          High-Fidelity Typography Foundry
        </motion.div>
        <motion.h1 
          animate={{ fontWeight: weight }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className={`${fraunces.className} text-8xl md:text-[14rem] text-black leading-[0.8] mb-16 uppercase italic tracking-tighter`}
        >
          DANCE WITH <br/> <span className="opacity-20 not-italic">THE FONT.</span>
        </motion.h1>
        <p className={`text-black/40 text-2xl max-w-2xl mx-auto mb-20 leading-relaxed font-medium ${inter.className}`}>
          TypeTango is the digital foundry for high-stakes editorial design. We treat every character as a kinetic artifact, building systems that move with rhythmic grace.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-12">
          <TangoButton>START_THE_TANGO</TangoButton>
          <div className={`flex items-center gap-4 text-black font-black tracking-widest text-sm cursor-pointer group`}>
            VIEW_THE_GLYPHS <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform text-black" />
          </div>
        </div>
      </div>
      
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-black/20 flex flex-col items-center gap-4"
      >
        <div className="text-[8px] tracking-[0.6em] uppercase font-black">Scroll_to_Read</div>
        <div className="w-px h-24 bg-gradient-to-b from-black/20 to-transparent" />
      </motion.div>
    </section>
  )
}

const StatsBar = () => (
  <section className="py-24 border-y border-black/5 bg-white">
    <div className="max-w-7xl mx-auto px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-16 text-center">
        {[
          { label: 'Characters Rendered', value: '4.8B', icon: Type },
          { label: 'Custom Fonts', value: '1.2K', icon: Sparkles },
          { label: 'Editorial ROI', value: '12.4X', icon: Zap },
          { label: 'Global reach', value: '150+', icon: Globe }
        ].map((stat, i) => (
          <motion.div key={i} whileHover={{ y: -5 }}>
            <div className={`${bricolage.className} text-6xl font-black text-black mb-2 italic`}>{stat.value}</div>
            <div className="text-black/20 text-[10px] font-black uppercase tracking-[0.4em]">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)

const Features = () => (
  <section className="py-32 px-8 bg-[#F0F0F0]">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-start justify-between mb-24 gap-12">
        <h2 className={`${fraunces.className} text-7xl font-black uppercase italic leading-none text-black`}>FOUNDRY <br/><span className="text-black/20 not-italic">MODULES</span></h2>
        <p className="text-black/30 max-w-md text-xl leading-relaxed font-medium">Deploy high-fidelity typography architecture built for global brand saturation.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-10">
        {[
          { title: 'Kinetic Weight', desc: 'Interfaces that shift their font-weight based on user interaction and digital environment.', icon: Type },
          { title: 'Tango Transitions', desc: 'Section entries that use high-impact rhythmic scaling and blur-reveals for maximum weight.', icon: Sparkles },
          { title: 'Global Glyphs', desc: 'Sub-ms multi-device synchronization for high-stakes digital agency environments.', icon: Globe },
          { title: 'Foundry Logic', desc: 'A proprietary creative engine that builds unique visual typefaces for your brand story.', icon: Palette },
          { title: 'Script Vault', desc: 'Encrypted storage for proprietary font formulas and high-value creative logs.', icon: Bookmark },
          { title: 'Impact Metrics', desc: 'Predictive ROI analytics that map the long-term impact of emotional brand loyalty.', icon: Target }
        ].map((feature, i) => (
          <GlyphCard key={i} title={`PROTOCOL_0${i + 1}`}>
            <div className="w-16 h-16 bg-black/5 rounded-full flex items-center justify-center mb-10 rotate-12 group-hover:rotate-0 transition-transform duration-500">
              <feature.icon className="text-black" size={32} />
            </div>
            <h3 className={`${bricolage.className} text-2xl font-black text-black mb-4 uppercase tracking-tighter italic`}>{feature.title}</h3>
            <p className="text-black/40 text-sm leading-relaxed font-medium">{feature.desc}</p>
          </GlyphCard>
        ))}
      </div>
    </div>
  </section>
)

const ProductDetail = () => (
  <section className="py-32 px-8 bg-white relative overflow-hidden">
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-24 items-center">
        <div className="order-2 lg:order-1 relative group">
           <div className="aspect-[4/5] bg-[#F0F0F0] border border-black/5 p-10 relative overflow-hidden">
              <div className="absolute inset-0 bg-black/5 group-hover:opacity-100 opacity-0 transition-opacity" />
              <div className="w-full h-full border border-dashed border-black/20 flex flex-col items-center justify-center text-center">
                 <Type className="text-black/10 animate-bounce" size={150} strokeWidth={1} />
                 <div className="mt-12 space-y-4">
                    <div className={`${fraunces.className} text-3xl font-black uppercase italic`}>The Font Lab</div>
                    <p className="text-[10px] font-bold text-black/40 uppercase tracking-[0.4em]">Testing_Chromesthesia_v3.0</p>
                 </div>
              </div>
              <motion.div 
                animate={{ y: [0, 400, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                className="absolute top-0 left-0 w-full h-px bg-black shadow-[0_0_15px_black]"
              />
           </div>
           <div className="absolute -bottom-8 -left-8 bg-black text-white p-8 rounded-sm shadow-2xl rotate-6">
              <div className={`${mono.className} text-xl font-black uppercase`}>Foundry_Verified</div>
           </div>
        </div>
        <div className="order-1 lg:order-2">
          <div className={`${mono.className} text-black text-[10px] font-bold mb-10 uppercase tracking-[0.5em]`}>[ ENGINE_ARCHITECTURE ]</div>
          <h2 className={`${fraunces.className} text-7xl font-black text-black mb-10 leading-[0.9] uppercase italic tracking-tighter`}>CRAFTED BY <br/><span className="font-light opacity-20 not-italic">TYPOGRAPHY.</span></h2>
          <div className={`space-y-8 text-black/40 text-xl leading-relaxed font-medium ${inter.className}`}>
            <p>Traditional type is a flat document. TypeTango type is an architecture. We treat every character as a load-bearing element, ensuring your story is stable under pressure.</p>
            <p>Our implementation of structural physics and act-sync ensures that the brand legacy is as permanent as the building blocks.</p>
          </div>
          <TangoButton className="mt-12">CONNECT_MAIN_FOUNDRY</TangoButton>
        </div>
      </div>
    </div>
  </section>
)

const Footer = () => (
  <footer className="py-24 px-8 bg-white border-t border-black/5">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-16 mb-24">
        <div className="col-span-2">
           <div className={`flex items-center gap-3 ${bricolage.className} text-2xl font-black tracking-tighter text-black uppercase mb-10`}>
            <Type className="text-black" size={28} />
            TYPE<span className="font-light opacity-40 italic">TANGO</span>
          </div>
          <p className={`text-black/40 text-[10px] max-w-xs leading-loose font-black uppercase tracking-[0.2em] ${mono.className}`}>The global standard for professional typography management and high-energy kinetic analytics. Cinematic since 2026.</p>
        </div>
        {[
          { title: 'The Foundry', links: ['Slicing', 'Manuscripts', 'Foundry', 'Pricing'] },
          { title: 'Agency', links: ['About Us', 'Legitimacy', 'Careers', 'Brand'] },
          { title: 'Connect', links: ['Twitter', 'LinkedIn', 'Support', 'Journal'] }
        ].map(group => (
          <div key={group.title}>
            <div className={`${bricolage.className} text-xs font-black text-black mb-10 uppercase tracking-widest`}>{group.title}</div>
            <ul className="space-y-6">
              {group.links.map(link => (
                <li key={link}><a href="#" className={`${mono.className} text-[8px] text-black/40 font-black uppercase tracking-[0.3em] hover:text-black transition-colors`}>{link}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="pt-12 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-10">
        <div className={`${mono.className} text-[8px] text-black/20 uppercase tracking-[0.5em] font-black`}>© 2026 TYPETANGO FOUNDRY CORP. CHARACTER_ENCRYPTED.</div>
        <div className="flex gap-10">
           <PenTool className="text-black/20 hover:text-black cursor-pointer transition-colors" size={18} />
           <Bookmark className="text-black/20 hover:text-black cursor-pointer transition-colors" size={18} />
        </div>
      </div>
    </div>
  </footer>
)

export default function TypeTango() {
  return (
    <div className={`min-h-screen bg-white text-black overflow-x-hidden ${inter.className} ${fraunces.variable} ${bricolage.variable}`}>
      <Navbar />
      <Hero />
      <StatsBar />
      <Features />
      <ProductDetail />
      <Footer />
      
      {/* --- Global Effects --- */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03] contrast-150 mix-blend-multiply">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <filter id="tango-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100" height="100" filter="url(#tango-noise)" />
        </svg>
      </div>
    </div>
  )
}
