'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { 
  LayoutGrid, 
  TrendingUp, 
  Target, 
  Users, 
  Zap, 
  ShieldCheck, 
  ChevronDown, 
  ArrowRight,
  Maximize2,
  Box,
  Cpu,
  Globe,
  Plus,
  RefreshCw,
  Search,
  Activity,
  Layers,
  Sparkles
} from 'lucide-react'
import { Inter, JetBrains_Mono, Space_Grotesk } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
const mono = JetBrains_Mono({ subsets: ['latin'] })
const space = Space_Grotesk({ subsets: ['latin'] })

// --- Design Tokens ---
const tokens = {
  colors: {
    background: "#080808",
    surface: "#121212",
    accent1: "#10B981", // Growth Green
    accent2: "#3B82F6", // Logic Blue
    border: "#1F1F1F",
    textHigh: "#FFFFFF",
    textLow: "#757575"
  },
  physics: {
    grid: { type: "spring" as any, stiffness: 300, damping: 25 }
  }
}

// --- Components ---

const GrowthButton = ({ children, variant = 'primary', className = '' }: any) => (
  <motion.button
    whileHover={{ scale: 1.02, backgroundColor: variant === 'primary' ? '#10B981' : '#1A1A1A' }}
    whileTap={{ scale: 0.98 }}
    className={`px-8 py-4 ${space.className} text-xs font-black tracking-widest relative group overflow-hidden border ${
      variant === 'primary' 
        ? `bg-[#10B981] text-black border-[#10B981]` 
        : `bg-transparent text-white border-[#1F1F1F]`
    } ${className}`}
  >
    <span className="relative z-10 flex items-center justify-center gap-2 uppercase">
      {children}
      <Plus size={14} className="group-hover:rotate-90 transition-transform duration-500" />
    </span>
    <div className="absolute top-0 left-0 w-1 h-1 bg-white opacity-50 m-1" />
  </motion.button>
)

const LogicCard = ({ children, className = '', title = '' }: any) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    whileHover={{ borderColor: '#10B981' }}
    className={`bg-[#121212] border border-[#1F1F1F] p-8 relative group overflow-hidden ${className}`}
  >
    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
      <LayoutGrid size={60} strokeWidth={1} />
    </div>
    {title && <div className={`${mono.className} text-[8px] font-bold text-[#10B981] uppercase tracking-[0.4em] mb-6`}>{title}</div>}
    {children}
  </motion.div>
)

// --- Sections ---

const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 border-b border-[#1F1F1F] bg-black/90 backdrop-blur-xl px-6 py-6">
    <div className="max-w-7xl mx-auto flex items-center justify-between">
      <div className={`flex items-center gap-2 ${space.className} text-xl font-black tracking-tighter text-white uppercase`}>
        <LayoutGrid className="text-[#10B981]" size={24} />
        GROWTH<span className="text-[#10B981]">GRID</span>
      </div>
      <div className="hidden md:flex items-center gap-10 text-[#757575] font-bold text-[10px] tracking-[0.4em] uppercase">
        {['The Logic', 'Expansion', 'Nodes', 'Connect'].map(item => (
          <a key={item} href="#" className="hover:text-[#10B981] transition-colors">{item}</a>
        ))}
      </div>
      <GrowthButton className="hidden md:block py-2 text-[10px]" variant="secondary">AUTH_NODE</GrowthButton>
    </div>
  </nav>
)

const Hero = () => {
  return (
    <section className="pt-40 pb-20 px-8 relative overflow-hidden min-h-screen flex items-center bg-black">
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="w-full h-full bg-[linear-gradient(#1F1F1F_1px,transparent_1px),linear-gradient(90deg,#1F1F1F_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>
      
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={tokens.physics.grid}
        >
          <div className="flex items-center gap-3 mb-10">
            <div className={`px-2 py-1 border border-[#10B981]/30 text-[#10B981] text-[8px] font-black tracking-widest uppercase ${mono.className}`}>
              [ STATUS: GRID_SCALING_ACTIVE ]
            </div>
          </div>
          <h1 className={`${space.className} text-7xl md:text-9xl font-black text-white leading-[0.8] mb-12 uppercase italic tracking-tighter`}>
            SCALE THE <br/> <span className="text-[#10B981] drop-shadow-[0_0_30px_#10B981]">LOGIC.</span>
          </h1>
          <p className={`text-[#757575] text-xl max-w-xl mb-16 leading-relaxed font-medium ${inter.className}`}>
            GrowthGrid is the high-fidelity ecosystem for scalable digital expansion. We treat every lead as a node, building systems that grow with mathematical precision.
          </p>
          <div className="flex flex-wrap gap-8">
            <GrowthButton>INITIALIZE_NODE</GrowthButton>
            <div className={`flex items-center gap-4 text-white font-black tracking-widest text-[10px] cursor-pointer group`}>
              VIEW_SYSTEM_SPEC <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform text-[#10B981]" />
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...tokens.physics.grid, delay: 0.2 }}
          className="relative"
        >
          <div className="bg-[#121212] border border-[#1F1F1F] p-10 rounded-sm shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-[#10B981]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center justify-between mb-16 border-b border-[#1F1F1F] pb-6">
              <div className={`${mono.className} text-[10px] text-[#10B981] font-bold tracking-widest`}>GRID_NODE_ID: 8492-G</div>
              <Activity className="text-[#10B981]" size={18} />
            </div>
            <div className="grid grid-cols-3 gap-6 relative z-10">
               {[...Array(9)].map((_, i) => (
                 <motion.div
                   key={i}
                   initial={{ opacity: 0, scale: 0.5 }}
                   animate={{ opacity: 1, scale: 1 }}
                   transition={{ delay: 0.4 + i * 0.1 }}
                   className="aspect-square bg-white/5 border border-white/10 flex items-center justify-center group/node"
                 >
                    <Plus size={14} className="text-[#10B981] opacity-20 group-hover/node:opacity-100 transition-opacity" />
                 </motion.div>
               ))}
            </div>
            <div className="mt-16 p-6 bg-black/40 border border-[#1F1F1F] rounded-sm">
               <div className="flex justify-between items-center mb-4">
                  <div className="text-[8px] font-black text-[#757575] uppercase tracking-widest">Growth Velocity</div>
                  <div className={`${mono.className} text-xs font-bold text-[#10B981]`}>3.4X</div>
               </div>
               <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    animate={{ x: [-400, 400] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="h-full w-40 bg-gradient-to-r from-transparent via-[#10B981] to-transparent" 
                  />
               </div>
            </div>
          </div>
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-10 -right-10 opacity-20 pointer-events-none"
          >
            <RefreshCw size={200} className="text-[#10B981]" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

const StatsBar = () => (
  <section className="py-24 border-y border-[#1F1F1F] bg-black">
    <div className="max-w-7xl mx-auto px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-16 text-center">
        {[
          { label: 'Active Nodes', value: '1.2M+', icon: Users },
          { label: 'Total Volume', value: '4.8B', icon: Globe },
          { label: 'Growth ROI', value: '12.4X', icon: Zap },
          { label: 'System Uptime', value: '99.9%', icon: ShieldCheck }
        ].map((stat, i) => (
          <motion.div key={i} whileHover={{ y: -5 }}>
            <div className={`${space.className} text-6xl font-black text-white mb-2 italic tracking-tighter`}>{stat.value}</div>
            <div className="text-[#757575] text-[10px] font-black uppercase tracking-[0.4em]">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)

const Features = () => (
  <section className="py-32 px-8 bg-[#080808]">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-12">
        <div>
          <h2 className={`${space.className} text-6xl font-black text-white mb-6 uppercase italic tracking-tighter`}>CELLULAR_MODULES</h2>
          <p className={`text-[#757575] max-w-xl ${inter.className}`}>Deploy high-performance grid architecture built for data-driven expansion.</p>
        </div>
        <GrowthButton variant="secondary" className="md:mb-4 text-[10px]">ALL_SYSTEMS_VIEW</GrowthButton>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {[
          { title: 'Node Scaling', desc: 'Real-time dynamic expansion of UI components based on live user interaction density.', icon: Maximize2 },
          { title: 'Grid Pulse HUD', desc: 'Interfaces that maintain a constant rhythmic pulse through subtle micro-animations on all grid cells.', icon: Activity },
          { title: 'Sync Analytics', desc: 'Rhythmic, high-contrast data visualizations for global node performance and reach.', icon: Zap },
          { title: 'Mainframe Sync', desc: 'Sub-ms multi-device synchronization for high-stakes digital agency environments.', icon: RefreshCw },
          { title: 'Strategic Vault', desc: 'Encrypted storage for proprietary plan logic and historical performance data.', icon: ShieldCheck },
          { title: 'ROI Radar', desc: 'Circular sweep visualization highlighting high-performance blips across the global growth map.', icon: Target }
        ].map((feature, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -5 }}
            className="bg-[#121212] border border-[#1F1F1F] p-10 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-20 transition-opacity">
              <feature.icon size={80} />
            </div>
            <feature.icon className="text-[#10B981]" size={32} />
            <h3 className={`${space.className} text-xl font-bold text-white mb-4 uppercase tracking-tighter italic`}>{feature.title}</h3>
            <p className={`text-[#757575] text-xs leading-relaxed ${inter.className}`}>{feature.desc}</p>
          </motion.div>
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
           <div className="aspect-video bg-[#121212] border border-[#1F1F1F] p-10 relative overflow-hidden">
              <div className="absolute inset-0 bg-[#10B981]/5 group-hover:opacity-100 opacity-0 transition-opacity" />
              <div className="w-full h-full border border-dashed border-[#10B981]/20 rounded-sm flex items-center justify-center">
                 <Box className="text-[#10B981]/20 animate-spin-slow" size={150} />
              </div>
              <motion.div 
                animate={{ y: [0, 400, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                className="absolute top-0 left-0 w-0.5 h-full bg-[#10B981] shadow-[0_0_15px_#10B981]"
              />
           </div>
           <div className="absolute -bottom-8 -left-8 bg-white text-black p-8 rounded-sm shadow-2xl rotate-6">
              <div className={`${mono.className} text-xl font-black`}>GRID_VERIFIED</div>
           </div>
        </div>
        <div className="order-1 lg:order-2">
          <div className={`${mono.className} text-[#10B981] text-[10px] tracking-[0.5em] font-bold mb-10 uppercase`}>[ HUB_ARCHITECTURE ]</div>
          <h2 className={`${space.className} text-6xl font-black text-white mb-10 leading-[0.9] uppercase italic tracking-tighter`}>BUILT FOR THE <br/><span className="text-[#10B981]">CELLULAR.</span></h2>
          <div className={`space-y-8 text-[#757575] text-xl leading-relaxed ${inter.className}`}>
            <p>Traditional expansion tools are static files. GrowthGrid is immediate. We treat every data point as a cellular unit of value, ensuring that your expansion is stable and scalable.</p>
            <p>Our implementation of grid physics and rhythmic transitions ensures that the growth legacy is as powerful as the logic.</p>
          </div>
          <GrowthButton className="mt-12">CONNECT_MAIN_NODE</GrowthButton>
        </div>
      </div>
    </div>
  </section>
)

const Footer = () => (
  <footer className="py-24 px-6 bg-[#080808] border-t border-[#1F1F1F]">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-16">
        <div className="col-span-2">
           <div className={`flex items-center gap-3 ${space.className} text-xl font-black tracking-tighter text-white uppercase mb-10`}>
            <LayoutGrid className="text-[#10B981]" size={24} />
            GROWTH<span className="text-[#10B981]">GRID</span>
          </div>
          <p className={`text-[#757575] text-[10px] max-w-xs leading-loose font-black uppercase tracking-[0.2em] ${mono.className}`}>The global standard for cellular digital expansion and high-fidelity node analytics. Systematic since 2026.</p>
        </div>
        {[
          { title: 'The Grid', links: ['Logic', 'Nodes', 'Expansion', 'Pricing'] },
          { title: 'Agency', links: ['About Us', 'Legitimacy', 'Careers', 'Brand'] },
          { title: 'Connect', links: ['Discord', 'Terminal', 'GitHub', 'Mainframe'] }
        ].map(group => (
          <div key={group.title}>
            <div className={`${space.className} text-xs font-black text-white mb-10 uppercase tracking-widest`}>{group.title}</div>
            <ul className="space-y-6">
              {group.links.map(link => (
                <li key={link}><a href="#" className={`${mono.className} text-[8px] text-[#757575] font-black uppercase tracking-[0.3em] hover:text-[#10B981] transition-colors`}>{link}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="pt-12 border-t border-[#1F1F1F] flex flex-col md:flex-row justify-between items-center gap-10">
        <div className={`${mono.className} text-[8px] text-[#757575] uppercase tracking-[0.5em] font-black`}>© 2026 GROWTHGRID HUB CORP. GRID_ENCRYPTED.</div>
        <div className="flex gap-10">
           <Zap className="text-[#757575] hover:text-[#10B981] cursor-pointer" size={18} />
           <Globe className="text-[#757575] hover:text-[#10B981] cursor-pointer" size={18} />
        </div>
      </div>
    </div>
  </footer>
)

export default function GrowthGrid() {
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
          <filter id="grid-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.95" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100" height="100" filter="url(#grid-noise)" />
        </svg>
      </div>
      
      </div>
  )
}
