'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { 
  Box, 
  Layers, 
  MousePointer2, 
  Sparkles, 
  ChevronRight, 
  ArrowRight,
  Target,
  Award,
  Zap,
  Layout,
  LayoutGrid,
  Code2,
  Scan,
  Activity,
  Terminal,
  Cpu,
  Monitor
} from 'lucide-react'
import { Inter, JetBrains_Mono } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
const mono = JetBrains_Mono({ subsets: ['latin'] })

// --- Design Tokens ---
const tokens = {
  colors: {
    background: "#08090A", // Deep Slate
    surface: "#111315", // Console
    accent1: "#00FFCC", // Electric Mint
    accent2: "#7000FF", // Deep Cyber
    border: "rgba(0, 255, 204, 0.15)",
    textHigh: "#FFFFFF",
    textLow: "#4A5568"
  },
  physics: {
    pixel: { type: "spring" as any, stiffness: 400, damping: 20 }
  }
}

// --- Components ---

const PixelButton = ({ children, variant = 'primary', className = '' }: any) => (
  <motion.button
    whileHover={{ scale: 1.05, boxShadow: `0 0 25px ${variant === 'primary' ? 'rgba(0, 255, 204, 0.4)' : 'rgba(255, 255, 255, 0.1)'}` }}
    whileTap={{ scale: 0.95 }}
    className={`px-10 py-4 ${mono.className} text-[10px] font-black tracking-[0.3em] relative group overflow-hidden border ${
      variant === 'primary' 
        ? `bg-[#00FFCC] text-black border-[#00FFCC]` 
        : `bg-transparent text-white border-white/20`
    } ${className}`}
  >
    <div className="absolute top-0 left-0 w-1.5 h-1.5 bg-current opacity-50 m-0.5" />
    <div className="absolute bottom-0 right-0 w-1.5 h-1.5 bg-current opacity-50 m-0.5" />
    <span className="relative z-10 flex items-center justify-center gap-2 uppercase">{children}</span>
  </motion.button>
)

const VectorCard = ({ children, className = '', title = '' }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ y: -5 }}
    className={`bg-[#111315] border border-white/5 p-10 relative group overflow-hidden ${className}`}
  >
    <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#00FFCC] opacity-30 group-hover:opacity-100 transition-opacity" />
    <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#00FFCC] opacity-30 group-hover:opacity-100 transition-opacity" />
    {title && <div className={`${mono.className} text-[8px] font-bold text-[#00FFCC] uppercase tracking-[0.4em] mb-8`}>{title}</div>}
    {children}
  </motion.div>
)

// --- Sections ---

const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 bg-[#08090A]/80 backdrop-blur-xl px-8 py-6 border-b border-white/5">
    <div className="max-w-7xl mx-auto flex items-center justify-between">
      <div className={`flex items-center gap-3 ${inter.className} text-xl font-black tracking-tighter text-white uppercase`}>
        <div className="w-6 h-6 bg-[#00FFCC] rotate-45 flex items-center justify-center">
          <Scan className="text-black -rotate-45" size={14} strokeWidth={3} />
        </div>
        PIXEL<span className="text-[#00FFCC]">PERFECT</span>
      </div>
      <div className="hidden md:flex items-center gap-10 text-[#4A5568] font-bold text-[10px] tracking-[0.4em] uppercase">
        {['Artifacts', 'Protocol', 'Foundry', 'Agency'].map(item => (
          <a key={item} href="#" className="hover:text-white transition-colors">{item}</a>
        ))}
      </div>
      <PixelButton className="hidden md:block py-2 text-[8px]" variant="secondary">AUTH_NODE</PixelButton>
    </div>
  </nav>
)

const Hero = () => {
  return (
    <section className="pt-40 pb-20 px-8 relative overflow-hidden min-h-screen flex items-center bg-[#08090A]">
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="w-full h-full bg-[linear-gradient(rgba(0,255,204,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,204,0.05)_1px,transparent_1px)] bg-[size:20px:20px]" />
        <motion.div 
          animate={{ y: ["0%", "100%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#00FFCC] to-transparent shadow-[0_0_20px_#00FFCC]" 
        />
      </div>
      
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={tokens.physics.pixel}
        >
          <div className="flex items-center gap-3 mb-10">
            <div className="w-2 h-2 bg-[#00FFCC] rounded-full animate-pulse shadow-[0_0_10px_#00FFCC]" />
            <span className={`text-[10px] font-black text-[#00FFCC] tracking-[0.5em] uppercase ${mono.className}`}>System_Load_Active_v3.0</span>
          </div>
          <h1 className={`${inter.className} text-7xl md:text-[10rem] font-black text-white leading-[0.8] mb-12 uppercase tracking-tighter`}>
            DIGITAL <br/> <span className="text-[#00FFCC] drop-shadow-[0_0_30px_#00FFCC]">CRAFT.</span>
          </h1>
          <p className={`text-[#4A5568] text-xl max-w-xl mb-16 leading-relaxed font-medium ${inter.className}`}>
            PixelPerfect is a love letter to the 1px grid. We build sharp, technical, and illuminated digital experiences for technical visionaries.
          </p>
          <div className="flex flex-wrap gap-8">
            <PixelButton>INITIALIZE_PROJECT</PixelButton>
            <div className={`flex items-center gap-4 text-white font-black tracking-widest text-[10px] cursor-pointer group`}>
              CONNECT_FOUNDRY <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform text-[#00FFCC]" />
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...tokens.physics.pixel, delay: 0.2 }}
          className="relative"
        >
          <div className="bg-[#111315] border border-white/5 p-10 rounded-sm shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-[#00FFCC]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center justify-between mb-16 border-b border-white/5 pb-6">
              <div className={`${mono.className} text-[10px] text-white font-bold tracking-widest`}>X: 1,402.4  Y: 842.1</div>
              <Activity className="text-[#00FFCC]" size={18} />
            </div>
            <div className="grid grid-cols-4 gap-4 relative z-10">
               {[...Array(12)].map((_, i) => (
                 <motion.div
                   key={i}
                   initial={{ opacity: 0 }}
                   animate={{ opacity: Math.random() * 0.5 + 0.1 }}
                   transition={{ duration: 2, repeat: Infinity, repeatType: 'mirror' }}
                   className="aspect-square bg-white/5 border border-white/10 rounded-sm flex items-center justify-center group/pixel"
                 >
                    <div className="w-1 h-1 bg-[#00FFCC] opacity-0 group-hover/pixel:opacity-100 transition-opacity" />
                 </motion.div>
               ))}
            </div>
            <div className="mt-16 p-6 bg-black/40 border border-white/5 rounded-sm">
               <div className="flex justify-between items-center mb-4">
                  <div className="text-[8px] font-black text-[#4A5568] uppercase tracking-widest">Vector_Accuracy</div>
                  <div className={`${mono.className} text-xs font-bold text-[#00FFCC]`}>99.99%</div>
               </div>
               <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    animate={{ x: [-400, 400] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="h-full w-40 bg-gradient-to-r from-transparent via-[#00FFCC] to-transparent" 
                  />
               </div>
            </div>
          </div>
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-10 -right-10 opacity-20 pointer-events-none"
          >
            <LayoutGrid size={200} className="text-[#00FFCC]" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

const StatsBar = () => (
  <section className="py-24 border-y border-white/5 bg-black">
    <div className="max-w-7xl mx-auto px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-16 text-center">
        {[
          { label: 'Pixels Rendered', value: '4.8B+', icon: LayoutGrid },
          { label: 'Grid Accuracy', value: '100%', icon: Scan },
          { label: 'Live Artifacts', value: '142', icon: Box },
          { label: 'Sync Velocity', value: '4.2ms', icon: Activity }
        ].map((stat, i) => (
          <motion.div key={i} whileHover={{ y: -5 }}>
            <div className={`${inter.className} text-6xl font-black text-white mb-2 italic tracking-tighter`}>{stat.value}</div>
            <div className="text-[#4A5568] text-[10px] font-black uppercase tracking-[0.4em]">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)

const Features = () => (
  <section className="py-32 px-8 bg-[#08090A]">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-12">
        <div>
          <h2 className={`${inter.className} text-7xl font-black text-white mb-6 uppercase italic tracking-tighter`}>CORE_PROTOCOLS</h2>
          <p className={`text-[#4A5568] max-w-xl ${inter.className}`}>Deploy high-density digital craftsmanship for the modern mainframe.</p>
        </div>
        <PixelButton variant="secondary" className="md:mb-4 text-[10px]">ALL_SYSTEMS_VIEW</PixelButton>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {[
          { title: 'Pixel Reform', desc: 'Elements load as a scattered cloud of pixels that snap together into their final form.', icon: LayoutGrid },
          { title: 'Grid Light-Sweep', desc: 'Horizontal and vertical laser lines that sweep the grid, lighting up container borders.', icon: Scan },
          { title: 'RGB Split FX', desc: 'High-frequency chromatic aberration effects during transitions and hover states.', icon: Activity },
          { title: 'Terminal Inputs', desc: 'Command-line style input fields with blinking underscore cursors and ghost text.', icon: Terminal },
          { title: '1px Precision', desc: 'Persistent low-opacity 10px grid that acts as the foundation for the entire UI.', icon: Code2 },
          { title: 'Magnetic Nodes', desc: 'Grid intersections that react to mouse proximity by expanding and glowing.', icon: MousePointer2 }
        ].map((feature, i) => (
          <VectorCard key={i} title={`PROTOCOL_0${i + 1}`}>
            <feature.icon className="text-[#00FFCC] mb-8" size={32} />
            <h3 className={`${inter.className} text-xl font-bold text-white mb-4 uppercase tracking-tighter italic`}>{feature.title}</h3>
            <p className={`text-[#4A5568] text-xs leading-relaxed ${inter.className}`}>{feature.desc}</p>
          </VectorCard>
        ))}
      </div>
    </div>
  </section>
)

const ProductDetail = () => (
  <section className="py-32 px-8 bg-black relative overflow-hidden">
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-24 items-center">
        <div className="order-2 lg:order-1 relative group">
           <div className="aspect-video bg-[#111315] border border-white/5 p-10 relative overflow-hidden">
              <div className="absolute inset-0 bg-[#00FFCC]/5 group-hover:opacity-100 opacity-0 transition-opacity" />
              <div className="w-full h-full border border-dashed border-[#00FFCC]/20 rounded-sm flex items-center justify-center">
                 <Cpu className="text-[#00FFCC]/20 animate-spin-slow" size={150} />
              </div>
              <motion.div 
                animate={{ x: [0, 400, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                className="absolute top-0 left-0 w-0.5 h-full bg-[#00FFCC] shadow-[0_0_15px_#00FFCC]"
              />
           </div>
           <div className="absolute -bottom-8 -left-8 bg-white text-black p-8 rounded-sm shadow-2xl rotate-6">
              <div className={`${mono.className} text-xl font-black`}>FOUNDRY_VERIFIED</div>
           </div>
        </div>
        <div className="order-1 lg:order-2">
          <div className={`${mono.className} text-[#00FFCC] text-[10px] tracking-[0.5em] font-bold mb-10 uppercase`}>[ HUB_ARCHITECTURE ]</div>
          <h2 className={`${inter.className} text-7xl font-black text-white mb-10 leading-[0.9] uppercase italic tracking-tighter`}>CRAFTED AT THE <br/><span className="text-[#00FFCC]">ATOMIC LEVEL.</span></h2>
          <div className={`space-y-8 text-[#4A5568] text-xl leading-relaxed ${inter.className}`}>
            <p>At PixelPerfect, we don't just design; we engineer. We treat every pixel as a distinct unit of value, carefully orchestrating its motion and light to create a singular, cohesive experience.</p>
            <p>Our 1px grid foundation ensures that every element is balanced, responsive, and aesthetically balanced within the digital void.</p>
          </div>
          <PixelButton className="mt-12">CONNECT_MAIN_FOUNDRY</PixelButton>
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
           <div className={`flex items-center gap-2 ${inter.className} text-xl font-black tracking-tighter text-white uppercase mb-10`}>
            <div className="w-4 h-4 bg-[#00FFCC] rounded-sm" />
            PIXEL<span className="text-[#00FFCC]">PERFECT</span>
          </div>
          <p className={`text-[#4A5568] text-[10px] max-w-xs leading-loose font-black uppercase tracking-[0.2em] ${mono.className}`}>The global standard for high-fidelity digital craftsmanship and rhythmic motion design. Atomic precision since 2026.</p>
        </div>
        {[
          { title: 'Artifacts', links: ['Showcase', 'Lab_Logs', 'Protocol', 'Pricing'] },
          { title: 'Foundry', links: ['About', 'Foundry', 'Careers', 'Brand'] },
          { title: 'Connect', links: ['Discord', 'Terminal', 'GitHub', 'Mainframe'] }
        ].map(group => (
          <div key={group.title}>
            <div className={`${inter.className} text-xs font-black text-white mb-10 uppercase tracking-widest`}>{group.title}</div>
            <ul className="space-y-6">
              {group.links.map(link => (
                <li key={link}><a href="#" className={`${mono.className} text-[8px] text-[#4A5568] font-black uppercase tracking-[0.3em] hover:text-[#00FFCC] transition-colors`}>{link}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
        <div className={`${mono.className} text-[8px] text-[#4A5568] uppercase tracking-[0.5em] font-black`}>© 2026 PIXELPERFECT STUDIO. GRID_ENCRYPTED.</div>
        <div className="flex gap-10">
           <Code2 className="text-[#4A5568] hover:text-[#00FFCC] cursor-pointer" size={18} />
           <Activity className="text-[#4A5568] hover:text-[#00FFCC] cursor-pointer" size={18} />
        </div>
      </div>
    </div>
  </footer>
)

export default function PixelPerfect() {
  return (
    <div className={`min-h-screen bg-[#08090A] text-white overflow-x-hidden ${inter.className}`}>
      <Navbar />
      <Hero />
      <StatsBar />
      <Features />
      <ProductDetail />
      <Footer />
      
      {/* --- Global Effects --- */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.05] contrast-150 mix-blend-screen">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <filter id="pixel-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.95" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100" height="100" filter="url(#pixel-noise)" />
        </svg>
      </div>
      
      </div>
  )
}
