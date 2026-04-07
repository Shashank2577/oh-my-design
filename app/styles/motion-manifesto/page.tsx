'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useVelocity, useSpring } from 'framer-motion'
import { 
  Zap, 
  Activity, 
  TrendingUp, 
  Play, 
  Monitor, 
  ChevronRight, 
  ArrowRight,
  Sparkles,
  Layers,
  Award,
  Video,
  Share2,
  MousePointer2,
  Move,
  Flame,
  LayoutGrid,
  Target
} from 'lucide-react'
import { Inter, Space_Grotesk } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
const space = Space_Grotesk({ subsets: ['latin'], weight: ['400', '700'] })

// --- Design Tokens ---
const tokens = {
  colors: {
    background: "#000000",
    surface: "#111111",
    accent1: "#FAFF00", // Electric Lemon
    accent2: "#00E0FF", // Cine Blue
    border: "#222222",
    textHigh: "#FFFFFF",
    textLow: "#555555"
  },
  physics: {
    elastic: { type: "spring" as any, stiffness: 400, damping: 10, mass: 0.5 }
  }
}

// --- Components ---

const KineticButton = ({ children, variant = 'primary', className = '' }: any) => (
  <motion.button
    whileHover={{ scale: 1.1, skewX: -10 }}
    whileTap={{ scale: 0.9, skewX: 0 }}
    className={`px-10 py-5 rounded-sm ${space.className} font-black text-lg transition-all relative group overflow-hidden ${
      variant === 'primary' 
        ? `bg-[#FAFF00] text-black shadow-[0_0_40px_rgba(250,255,0,0.3)]` 
        : `bg-transparent text-white border-2 border-[#222222] hover:border-[#FAFF00]`
    } ${className}`}
  >
    <span className="relative z-10 flex items-center justify-center gap-3 uppercase italic tracking-tighter">
      {children}
      <Zap size={20} className={variant === 'primary' ? 'fill-black' : 'fill-[#FAFF00] text-[#FAFF00]'} />
    </span>
    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
  </motion.button>
)

const ElasticCard = ({ children, className = '', title = '' }: any) => {
  const { scrollY } = useScroll()
  const velocity = useVelocity(scrollY)
  const skew = useSpring(useTransform(velocity, [-1000, 1000], [-5, 5]), { stiffness: 400, damping: 30 })

  return (
    <motion.div
      style={{ skewY: skew }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
      className={`bg-[#111111] border border-[#222222] p-10 relative group overflow-hidden ${className}`}
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-[#FAFF00] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      {title && <div className={`${space.className} text-[10px] font-black text-[#FAFF00] uppercase tracking-[0.4em] mb-8 italic`}>{title}</div>}
      {children}
    </motion.div>
  )
}

// --- Sections ---

const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-xl px-8 py-8 border-b border-[#222222]">
    <div className="max-w-7xl mx-auto flex items-center justify-between">
      <div className={`flex items-center gap-3 ${space.className} text-3xl font-black tracking-tighter text-white uppercase italic`}>
        <motion.div 
          animate={{ rotate: [0, 10, -10, 0] }} 
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Activity className="text-[#FAFF00]" size={32} />
        </motion.div>
        MOTION<span className="text-[#FAFF00]">MANIFESTO</span>
      </div>
      <div className="hidden md:flex items-center gap-12 text-[#555555] font-bold text-[10px] tracking-[0.5em] uppercase">
        {['The Reel', 'Logic', 'Artifacts', 'Connect'].map(item => (
          <a key={item} href="#" className="hover:text-[#FAFF00] transition-colors">{item}</a>
        ))}
      </div>
      <KineticButton className="hidden md:block py-3 px-8 text-xs font-black">START_MANIFESTO</KineticButton>
    </div>
  </nav>
)

const Hero = () => {
  return (
    <section className="pt-40 pb-20 px-8 relative overflow-hidden min-h-screen flex items-center bg-black">
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#FAFF00]/10 rounded-full blur-[150px] -mr-96 -mt-96" 
        />
        <motion.div 
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#FAFF00] to-transparent shadow-[0_0_20px_#FAFF00] opacity-20" 
        />
      </div>
      
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, skewX: 20 }}
          animate={{ opacity: 1, skewX: 0 }}
          transition={tokens.physics.elastic}
        >
          <div className="flex items-center gap-3 mb-10">
            <div className="w-2 h-2 bg-[#FAFF00] rounded-full animate-ping shadow-[0_0_10px_#FAFF00]" />
            <span className={`text-[10px] font-black text-[#FAFF00] tracking-[0.5em] uppercase ${space.className}`}>Kinetic_System_Active_v3.0</span>
          </div>
          <h1 className={`${space.className} text-7xl md:text-[10rem] font-black text-white leading-[0.8] mb-12 uppercase italic tracking-tighter`}>
            ALWAYS <br/> <span className="text-[#FAFF00] drop-shadow-[0_0_30px_#FAFF00]">ON.</span>
          </h1>
          <p className={`text-[#555555] text-xl max-w-xl mb-16 leading-relaxed font-medium ${inter.className}`}>
            MotionManifesto is the ultimate showcase for animation prowess. We treat every pixel as a kinetic unit, building systems where nothing is ever truly still.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-10">
            <KineticButton>IGNITE_SHOWREEL</KineticButton>
            <div className={`flex items-center gap-4 text-white font-black tracking-widest text-xs cursor-pointer group`}>
              VIEW_PROTOCOLS <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform text-[#FAFF00]" />
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ ...tokens.physics.elastic, delay: 0.2 }}
          className="relative"
        >
          <div className="aspect-square bg-[#111111] border border-[#222222] p-10 rounded-sm shadow-[0_50px_100px_rgba(250,255,0,0.15)] relative overflow-hidden group">
            <div className="absolute inset-0 bg-[#FAFF00]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="w-full h-full border border-dashed border-[#FAFF00]/30 flex flex-col items-center justify-center text-center">
               <motion.div 
                animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
               >
                  <Monitor className="text-[#FAFF00] drop-shadow-[0_0_20px_rgba(250,255,0,0.5)]" size={150} strokeWidth={1} />
               </motion.div>
               <div className="mt-12 space-y-4">
                  <div className={`${space.className} text-3xl font-black text-white italic uppercase`}>Active Render HUD</div>
                  <div className="px-4 py-1 bg-[#FAFF00] text-black text-[10px] font-black uppercase tracking-widest mx-auto w-fit">Live Output</div>
               </div>
            </div>
          </div>
          <motion.div 
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute -top-10 -right-10 bg-[#FAFF00] text-black p-8 rounded-full shadow-2xl rotate-12"
          >
            <Flame size={32} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

const StatsBar = () => (
  <section className="py-24 border-y border-[#222222] bg-[#050505]">
    <div className="max-w-7xl mx-auto px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-16 text-center">
        {[
          { label: 'Frames Built', value: '4.8B', icon: Video },
          { label: 'Rhythm Sync', value: '100%', icon: Activity },
          { label: 'Growth ROI', value: '12.4X', icon: Zap },
          { label: 'Global rank', value: '#01', icon: Award }
        ].map((stat, i) => (
          <motion.div key={i} whileHover={{ scale: 1.1 }}>
            <div className={`${space.className} text-6xl font-black text-white mb-2 italic`}>{stat.value}</div>
            <div className="text-[#FAFF00] text-[10px] font-black uppercase tracking-[0.4em]">{stat.label}</div>
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
          <h2 className={`${space.className} text-7xl font-black text-white mb-6 uppercase italic tracking-tighter leading-none`}>KINETIC_MODULES</h2>
          <p className={`text-[#555555] max-w-xl ${inter.className}`}>Deploy high-frequency animation architecture for professional studio environments.</p>
        </div>
        <KineticButton variant="secondary" className="md:mb-4 text-[10px]">ALL_SYSTEMS_VIEW</KineticButton>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {[
          { title: 'Micro-Loop FX', desc: 'Interfaces that maintain a constant rhythmic pulse through subtle micro-animations on all icons.', icon: Activity },
          { title: 'Rubber-Band Expand', desc: 'Showreel transitions that use high-stiffness spring physics to feel tactile and bouncy.', icon: Move },
          { title: 'Elastic Cards', desc: 'Containers that stretch and skew slightly based on the users scroll velocity.', icon: LayoutGrid },
          { title: 'Pulse Radar', desc: 'Circular sweep visualization highlighting high-performance blips across the global work map.', icon: Target },
          { title: 'Manifesto Scroll', desc: 'Vertical marquees of text that accelerate and blur as the user scrolls faster.', icon: Activity },
          { title: 'Timeline Vault', desc: 'Encrypted storage for proprietary animation logic and frame-perfect project history.', icon: ShieldCheck }
        ].map((feature, i) => (
          <ElasticCard key={i} title={`PROTOCOL_0${i + 1}`}>
            <div className="w-16 h-16 bg-[#FAFF00]/10 rounded-full flex items-center justify-center mb-10">
              <feature.icon className="text-[#FAFF00]" size={32} />
            </div>
            <h3 className={`${space.className} text-2xl font-black text-white mb-4 uppercase tracking-tighter italic`}>{feature.title}</h3>
            <p className="text-[#555555] text-sm leading-relaxed font-medium">{feature.desc}</p>
          </ElasticCard>
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
           <div className="aspect-square bg-black border border-[#222222] p-16 relative overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-[#FAFF00]/5 group-hover:opacity-100 opacity-0 transition-opacity" />
              <div className="w-full h-full border border-dashed border-[#FAFF00]/20 rounded-full flex items-center justify-center">
                 <MousePointer2 className="text-[#FAFF00]/20 animate-spin-slow" size={150} />
              </div>
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 border-t-2 border-[#FAFF00] rounded-full shadow-[0_0_15px_#FAFF00]"
              />
           </div>
           <div className="absolute -bottom-8 -left-8 bg-white text-black p-8 rounded-sm shadow-2xl rotate-6">
              <div className={`${space.className} text-xl font-black italic`}>RENDER_VERIFIED</div>
           </div>
        </div>
        <div className="order-1 lg:order-2">
          <div className={`${space.className} text-[#FAFF00] text-[10px] tracking-[0.5em] font-bold mb-10 uppercase`}>[ ENGINE_ARCHITECTURE ]</div>
          <h2 className={`${space.className} text-7xl font-black text-white mb-10 leading-[0.9] uppercase italic tracking-tighter`}>BEYOND THE <br/><span className="text-[#FAFF00]">STILLNESS.</span></h2>
          <div className={`space-y-10 text-[#555555] text-xl leading-relaxed font-medium ${inter.className}`}>
            <p>Traditional studios focus on the final frame. MotionManifesto focuses on the journey. We treat every digital signal as a kinetic opportunity, ensuring that your brand is always alive.</p>
            <p>Our implementation of rhythmic physics and temporal transitions ensures that your site remains at the pinnacle of digital excellence.</p>
          </div>
          <KineticButton className="mt-16">CONNECT_STUDIO_NODE</KineticButton>
        </div>
      </div>
    </div>
  </section>
)

const Footer = () => (
  <footer className="py-24 px-8 bg-black border-t border-[#222222]">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-16 mb-24">
        <div className="col-span-2">
          <div className={`flex items-center gap-2 ${space.className} text-2xl font-black tracking-tight text-white italic mb-8 uppercase`}>
            <Activity className="text-[#FAFF00]" size={28} />
            MOTION<span className="text-[#FAFF00]">MANIFESTO</span>
          </div>
          <p className="text-[#555555] text-sm leading-relaxed max-w-xs font-medium uppercase tracking-widest leading-loose">The global standard for professional animation studio design and high-fidelity kinetic analytics. Always on since 2026.</p>
        </div>
        {[
          { title: 'The Reel', links: ['Showreel', 'Logic', 'Artifacts', 'Pricing'] },
          { title: 'Agency', links: ['About Us', 'Legitimacy', 'Careers', 'Brand'] },
          { title: 'Connect', links: ['Instagram', 'LinkedIn', 'Discord', 'Terminal'] }
        ].map(group => (
          <div key={group.title}>
            <div className="text-[10px] font-black text-white uppercase tracking-[0.4em] mb-10">{group.title}</div>
            <ul className="space-y-6">
              {group.links.map(link => (
                <li key={link}><a href="#" className="text-sm font-bold text-[#555555] hover:text-[#FAFF00] transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="pt-12 border-t border-[#222222] flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="text-[#555555] text-[10px] font-black uppercase tracking-[0.6em]">© 2026 MOTIONMANIFESTO HUB CORP. KINETIC_ENCRYPTED.</div>
        <div className="flex gap-10">
          <Share2 className="text-[#555555] hover:text-[#FAFF00] cursor-pointer transition-colors" size={20} />
          <Award className="text-[#555555] hover:text-[#FAFF00] cursor-pointer transition-colors" size={20} />
        </div>
      </div>
    </div>
  </footer>
)

const ShieldCheck = ({ className, size }: any) => <ShieldCheckOriginal className={className} size={size} />
import { ShieldCheck as ShieldCheckOriginal } from 'lucide-react'

export default function MotionManifesto() {
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
          <filter id="manifesto-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.95" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100" height="100" filter="url(#manifesto-noise)" />
        </svg>
      </div>
      
      </div>
  )
}
