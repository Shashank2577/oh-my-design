'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { 
  Palette, 
  Sparkles, 
  Layers, 
  Cloud, 
  ChevronDown, 
  ArrowRight,
  Zap,
  Globe,
  Sun,
  Moon,
  Wind,
  Droplets,
  MousePointer2,
  Maximize2
} from 'lucide-react'
import { Inter, Space_Grotesk } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
const space = Space_Grotesk({ subsets: ['latin'] })

// --- Design Tokens ---
const tokens = {
  colors: {
    background: "#FFFFFF",
    surface: "rgba(255, 255, 255, 0.4)",
    accents: ["#FF3E00", "#00F3FF", "#7000FF", "#FFD700", "#FF00F5"],
    border: "rgba(0, 0, 0, 0.05)",
    textHigh: "#000000",
    textLow: "rgba(0, 0, 0, 0.4)"
  },
  physics: {
    fluid: { type: "spring" as any, stiffness: 100, damping: 20 }
  }
}

// --- Components ---

const CloudButton = ({ children, variant = 'primary', className = '', color = '#000' }: any) => (
  <motion.button
    whileHover={{ scale: 1.05, borderRadius: '40px' }}
    whileTap={{ scale: 0.95 }}
    className={`px-10 py-4 rounded-[20px] ${space.className} font-bold text-lg transition-all relative group overflow-hidden ${
      variant === 'primary' 
        ? `text-white` 
        : `bg-transparent border-2`
    } ${className}`}
    style={{ backgroundColor: variant === 'primary' ? color : 'transparent', borderColor: color, color: variant === 'primary' ? '#FFF' : color }}
  >
    <span className="relative z-10 flex items-center justify-center gap-3 uppercase tracking-widest text-xs">{children}</span>
    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
  </motion.button>
)

const BlobCard = ({ children, className = '', color = '#000' }: any) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    whileHover={{ scale: 1.02, borderRadius: '60px' }}
    className={`bg-white/40 backdrop-blur-3xl border border-white/20 p-10 rounded-[40px] relative group overflow-hidden ${className}`}
  >
    <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color }}>
      <Sparkles size={24} />
    </div>
    {children}
  </motion.div>
)

// --- Sections ---

const Navbar = ({ accent = '#000' }: any) => (
  <nav className="fixed top-0 w-full z-50 bg-white/40 backdrop-blur-xl px-8 py-6 border-b border-black/5">
    <div className="max-w-7xl mx-auto flex items-center justify-between">
      <div className={`flex items-center gap-3 ${space.className} text-2xl font-black tracking-tighter`} style={{ color: accent }}>
        <Cloud size={28} strokeWidth={3} />
        COLOR<span className="font-light opacity-40">CLOUD</span>
      </div>
      <div className="hidden md:flex items-center gap-12 text-black/40 font-bold text-[10px] tracking-[0.4em] uppercase">
        {['Prism', 'Theory', 'Alchemies', 'Laboratory'].map(item => (
          <a key={item} href="#" className="hover:text-black transition-colors">{item}</a>
        ))}
      </div>
      <CloudButton className="hidden md:block py-2 text-[10px]" variant="secondary" color={accent}>INITIALIZE_FLOW</CloudButton>
    </div>
  </nav>
)

const Hero = ({ accent = '#000' }: any) => {
  return (
    <section className="pt-40 pb-20 px-8 relative overflow-hidden min-h-screen flex items-center bg-white">
      <div className="absolute inset-0 z-0">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -50, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: [0.42, 0, 0.58, 1] }}
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full blur-[120px] opacity-20"
          style={{ backgroundColor: accent }}
        />
        <div className="absolute inset-0 bg-white/40 backdrop-blur-[100px]" />
      </div>
      
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={tokens.physics.fluid}
        >
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-1 rounded-full" style={{ backgroundColor: accent }} />
            <span className={`text-[10px] font-black tracking-[0.5em] uppercase ${space.className}`} style={{ color: accent }}>Chromesthesia_Active_v3.0</span>
          </div>
          <h1 className={`${space.className} text-7xl md:text-[10rem] font-black leading-[0.8] mb-12 uppercase tracking-tighter`} style={{ color: accent }}>
            LIQUID <br/> <span className="opacity-20 font-light">LIGHT.</span>
          </h1>
          <p className={`text-black/40 text-xl max-w-xl mb-16 leading-relaxed font-medium ${inter.className}`}>
            ColorCloud is an artistic playground for digital alchemists. We treat light as a material, building fluid, high-fidelity experiences that morph with your creativity.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-10">
            <CloudButton color={accent}>EXPLORE_PRISM</CloudButton>
            <div className={`flex items-center gap-4 font-black tracking-widest text-xs cursor-pointer group`} style={{ color: accent }}>
              THE_THEORY <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="relative"
        >
          <div className="aspect-square bg-white/40 border border-white/20 p-1 rounded-[80px] shadow-[0_50px_100px_rgba(0,0,0,0.05)] relative overflow-hidden group">
            <div className="absolute inset-0 flex items-center justify-center">
               <motion.div 
                animate={{ 
                  borderRadius: ["40% 60% 70% 30% / 40% 50% 60% 50%", "60% 40% 30% 70% / 50% 60% 40% 60%", "40% 60% 70% 30% / 40% 50% 60% 50%"],
                  rotate: 360
                }}
                transition={{ duration: 15, repeat: Infinity, ease: [0, 0, 1, 1] }}
                className="w-80 h-80 opacity-40 blur-3xl"
                style={{ backgroundColor: accent }}
               />
            </div>
            <div className="w-full h-full border-4 border-dashed border-black/5 rounded-[80px] flex flex-col items-center justify-center text-center p-12 relative z-10">
               <Palette className="mb-8" style={{ color: accent }} size={100} strokeWidth={1} />
               <div className="space-y-4">
                  <div className={`${space.className} text-3xl font-black uppercase italic`} style={{ color: accent }}>The Alchemy Lab</div>
                  <p className="text-[10px] font-bold text-black/40 uppercase tracking-[0.4em]">Testing_Chromesthesia_v3.0</p>
               </div>
            </div>
          </div>
          <motion.div 
            animate={{ scale: [1, 1.1, 1], rotate: [5, -5, 5] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="absolute -top-10 -right-10 text-white p-10 rounded-full shadow-2xl rotate-12"
            style={{ backgroundColor: accent }}
          >
            <Sparkles size={32} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

const StatsBar = ({ accent }: any) => (
  <section className="py-24 border-y border-black/5 bg-white">
    <div className="max-w-7xl mx-auto px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-16 text-center">
        {[
          { label: 'Colors Merged', value: '4.8B', icon: Palette },
          { label: 'Prisms Created', value: '1.2K', icon: Sparkles },
          { label: 'Alchemy ROI', value: '12.4X', icon: Zap },
          { label: 'Global Nodes', value: '150+', icon: Globe }
        ].map((stat, i) => (
          <motion.div key={i} whileHover={{ y: -5 }}>
            <div className={`${space.className} text-6xl font-black mb-2 italic`} style={{ color: accent }}>{stat.value}</div>
            <div className="text-black/20 text-[10px] font-black uppercase tracking-[0.4em]">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)

const Features = ({ accent }: any) => (
  <section className="py-32 px-8 bg-[#FDFCF0]">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-24">
        <h2 className={`${space.className} text-5xl md:text-6xl font-black mb-6 uppercase tracking-tighter`} style={{ color: accent }}>BEYOND THE HEX</h2>
        <p className={`text-black/40 max-w-2xl mx-auto text-lg leading-relaxed ${inter.className} font-medium`}>We use fluid dynamics to ensure every digital hue is in phase with human emotion.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {[
          { title: 'Blob Morphing', desc: 'Interfaces that shift their organic form every 2 seconds, maintaining a constant creative flow.', icon: Droplets },
          { title: 'Liquid Gradients', desc: 'Background meshes that react to mouse movement like a pool of digital pigment.', icon: Wind },
          { title: 'Prism Refraction', desc: 'High-frequency chromatic aberration effects during transitions and focus states.', icon: Sparkles },
          { title: 'Aura Sync', desc: 'Glow-based color systems that respond to the emotional weight of your brand assets.', icon: Sun },
          { title: 'Alchemy Vault', desc: 'Encrypted storage for proprietary color formulas and high-value creative logs.', icon: Moon },
          { title: 'Harmony Metrics', desc: 'Predictive ROI analytics that map the long-term impact of emotional brand loyalty.', icon: Zap }
        ].map((feature, i) => (
          <BlobCard key={i} color={accent}>
            <div className="w-16 h-16 bg-black/5 rounded-full flex items-center justify-center mb-10">
              <feature.icon style={{ color: accent }} size={32} />
            </div>
            <h3 className={`${space.className} text-2xl font-bold mb-4 uppercase tracking-tighter`} style={{ color: accent }}>{feature.title}</h3>
            <p className="text-black/40 text-sm leading-relaxed font-medium">{feature.desc}</p>
          </BlobCard>
        ))}
      </div>
    </div>
  </section>
)

const ProductDetail = ({ accent }: any) => (
  <section className="py-32 px-8 bg-white relative overflow-hidden">
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-24 items-center">
        <div className="relative p-10 border-4 border-dashed border-black/5 rounded-[80px]">
          <div className="aspect-square bg-white rounded-[60px] shadow-2xl flex items-center justify-center overflow-hidden relative group">
            <motion.div 
              animate={{ scale: [1, 1.1, 1], rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: [0, 0, 1, 1] }}
              className="absolute inset-0 bg-gradient-to-tr from-black/5 to-transparent" 
            />
            <Maximize2 className="text-black/10 animate-pulse" size={200} />
            <div className="absolute bottom-10 left-10 right-10 bg-white/90 backdrop-blur-md p-10 rounded-[40px] border border-black/5 shadow-xl">
              <div className={`${space.className} text-2xl font-black mb-2`} style={{ color: accent }}>The Prism Lab</div>
              <p className="text-black/40 text-sm font-medium">Testing spectral frequency across 1,200+ unique hue clusters.</p>
            </div>
          </div>
          <div className="absolute -top-10 -left-10 text-white p-8 rounded-full shadow-2xl rotate-12" style={{ backgroundColor: accent }}>
            <Sun size={32} />
          </div>
        </div>
        <div>
          <div className={`mb-10 ${inter.className} font-black tracking-[0.5em] uppercase text-[10px]`} style={{ color: accent }}>[ SPECTRAL_ENGINEERING ]</div>
          <h2 className={`${space.className} text-7xl font-black mb-10 leading-[0.9] uppercase tracking-tighter`} style={{ color: accent }}>A FLOW THAT <br/> <span className="opacity-20 font-light">NEVER ENDS.</span></h2>
          <div className={`space-y-8 text-black/40 text-xl leading-relaxed ${inter.className} font-medium`}>
            <p>Traditional palettes are static codes. ColorCloud is immediate. We treat every hue as a living signal, flowing at the speed of human potential to provide you with an instant map of emotion.</p>
            <p>Our implementation of spectral physics and rhythmic transitions ensures that your brand remains at the pinnacle of digital excellence.</p>
          </div>
          <CloudButton color={accent} className="mt-12">CONNECT_MAIN_PRISM</CloudButton>
        </div>
      </div>
    </div>
  </section>
)

const Footer = ({ accent }: any) => (
  <footer className="py-24 px-8 bg-white border-t border-black/5">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-16 mb-24">
        <div className="col-span-2">
          <div className={`flex items-center gap-2 ${space.className} text-2xl font-black tracking-tight mb-8`} style={{ color: accent }}>
            <Cloud size={28} strokeWidth={3} />
            COLOR<span className="font-light opacity-40">CLOUD</span>
          </div>
          <p className="text-black/40 text-sm leading-relaxed max-w-xs font-medium uppercase tracking-widest leading-loose">The global standard for fluid color design and spectral ROI analytics. Artistic since 2026.</p>
        </div>
        {[
          { title: 'Prism', links: ['Fluid Blobs', 'Gradients', 'Refraction', 'Pricing'] },
          { title: 'Foundry', links: ['The Lab', 'Alchemy', 'Careers', 'Brand'] },
          { title: 'Connect', links: ['Instagram', 'LinkedIn', 'Discord', 'Terminal'] }
        ].map(group => (
          <div key={group.title}>
            <div className="text-[10px] font-black text-black uppercase tracking-[0.4em] mb-10">{group.title}</div>
            <ul className="space-y-6">
              {group.links.map(link => (
                <li key={link}><a href="#" className="text-sm font-bold text-black/40 hover:text-black transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="pt-12 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="text-black/20 text-[10px] font-black uppercase tracking-[0.6em]">© 2026 COLORCLOUD SPECTRAL CORP. PRISM_ENCRYPTED.</div>
        <div className="flex gap-10">
          <Palette className="text-black/20 hover:text-black cursor-pointer transition-colors" size={20} />
          <Sparkles className="text-black/20 hover:text-black cursor-pointer transition-colors" size={20} />
        </div>
      </div>
    </div>
  </footer>
)

export default function ColorCloud() {
  const [accent, setAccent] = useState(tokens.colors.accents[0])
  
  useEffect(() => {
    const interval = setInterval(() => {
      setAccent(tokens.colors.accents[Math.floor(Math.random() * tokens.colors.accents.length)])
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className={`min-h-screen bg-white text-black overflow-x-hidden ${inter.className}`}>
      <Navbar accent={accent} />
      <Hero accent={accent} />
      <StatsBar accent={accent} />
      <Features accent={accent} />
      <ProductDetail accent={accent} />
      <Footer accent={accent} />
      
      {/* --- Global Effects --- */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03] contrast-150 mix-blend-multiply">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <filter id="cloud-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100" height="100" filter="url(#cloud-noise)" />
        </svg>
      </div>
    </div>
  )
}
