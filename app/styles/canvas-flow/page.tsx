'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, Reorder } from 'framer-motion'
import { 
  Box, 
  Layers, 
  MousePointer2, 
  Sparkles, 
  ChevronRight, 
  Layout,
  Maximize2,
  Minimize2,
  Grid3X3,
  Undo2,
  Trash2,
  Eye,
  EyeOff,
  Move,
  Type,
  Image as ImageIcon,
  Palette,
  Cloud,
  History
} from 'lucide-react'
import { Inter, JetBrains_Mono } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
const mono = JetBrains_Mono({ subsets: ['latin'] })

// --- Design Tokens ---
const tokens = {
  colors: {
    background: "#191919",
    surface: "#2C2C2C",
    accent1: "#3B82F6", // Action Blue
    accent2: "#10B981", // Success Emerald
    border: "#3F3F3F",
    textHigh: "#F3F4F6",
    textLow: "#9CA3AF"
  },
  physics: {
    panning: { duration: 0.5, ease: "circOut" as any },
    floating: {
      y: [0, -5, 0],
      transition: { duration: 2, repeat: Infinity }
    }
  }
}

// --- Components ---

const ToolButton = ({ children, active = false, onClick }: any) => (
  <motion.button
    whileHover={{ scale: 1.1, backgroundColor: '#3F3F3F' }}
    whileTap={{ scale: 0.9 }}
    onClick={onClick}
    className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${
      active ? 'bg-[#3B82F6] text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'text-[#9CA3AF]'
    }`}
  >
    {children}
  </motion.button>
)

const CanvasCard = ({ children, title = '' }: any) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    className="bg-[#2C2C2C] border border-[#3F3F3F] rounded-xl overflow-hidden group shadow-2xl"
  >
    <div className="bg-[#333333] px-4 py-2 border-b border-[#3F3F3F] flex items-center justify-between">
      <div className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest">{title}</div>
      <div className="flex gap-1.5">
        <div className="w-2 h-2 rounded-full bg-white/10" />
        <div className="w-2 h-2 rounded-full bg-white/10" />
      </div>
    </div>
    <div className="p-6">{children}</div>
  </motion.div>
)

// --- Sections ---

const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 border-b border-[#3F3F3F] bg-[#191919]/90 backdrop-blur-xl px-6 py-4">
    <div className="max-w-7xl mx-auto flex items-center justify-between">
      <div className={`flex items-center gap-2 ${inter.className} text-xl font-bold tracking-tighter text-white`}>
        <div className="w-8 h-8 bg-[#3B82F6] rounded-lg flex items-center justify-center rotate-12">
          <Box className="text-white -rotate-12" size={18} />
        </div>
        CANVAS<span className="text-[#3B82F6]">FLOW</span>
      </div>
      <div className="hidden md:flex items-center gap-10 text-[#9CA3AF] font-bold text-[10px] tracking-[0.3em] uppercase">
        {['Workspace', 'Engine', 'Plugins', 'Foundry'].map(item => (
          <a key={item} href="#" className="hover:text-white transition-colors">{item}</a>
        ))}
      </div>
      <div className="flex items-center gap-4">
        <ToolButton><Cloud size={18} /></ToolButton>
        <button className={`px-6 py-2 bg-[#3B82F6] text-white rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-[#2563EB] transition-colors ${inter.className}`}>
          GO_PRO
        </button>
      </div>
    </div>
  </nav>
)

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center px-6 overflow-hidden bg-[#191919]">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="w-full h-full bg-[linear-gradient(#3F3F3F_1px,transparent_1px),linear-gradient(90deg,#3F3F3F_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
      </div>
      
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={tokens.physics.panning}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="px-3 py-1 bg-[#3B82F6]/10 border border-[#3B82F6]/20 text-[#3B82F6] text-[10px] font-bold tracking-widest uppercase rounded-md">
              Infinite_Canvas_V3.0
            </div>
          </div>
          <h1 className={`${inter.className} text-7xl md:text-8xl font-black text-white leading-[0.9] mb-10 tracking-tighter`}>
            DESIGN <br/> <span className="text-[#3B82F6]">WITHOUT</span> <br/> BOUNDS.
          </h1>
          <p className={`text-[#9CA3AF] text-xl max-w-xl mb-12 leading-relaxed ${inter.className}`}>
            CanvasFlow is the spatial workspace for visionary teams. Pan, zoom, and layer your ideas across an infinite, high-fidelity digital grid.
          </p>
          <div className="flex flex-wrap gap-6">
            <button className={`px-10 py-4 bg-[#3B82F6] text-white rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-[#2563EB] transition-all shadow-[0_20px_40px_rgba(59,130,246,0.3)]`}>
              ENTER_WORKSPACE
            </button>
            <div className={`flex items-center gap-4 text-white font-bold tracking-widest text-xs cursor-pointer group`}>
              VIEW_DEMO_VIDEO <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...tokens.physics.panning, delay: 0.2 }}
          className="relative"
        >
          <div className="bg-[#2C2C2C] border border-[#3F3F3F] p-2 rounded-2xl shadow-2xl overflow-hidden group">
            <div className="bg-[#333333] p-4 flex items-center justify-between border-b border-[#3F3F3F]">
              <div className="flex gap-4">
                <ToolButton active><MousePointer2 size={16} /></ToolButton>
                <ToolButton><Move size={16} /></ToolButton>
                <ToolButton><Type size={16} /></ToolButton>
                <ToolButton><ImageIcon size={16} /></ToolButton>
              </div>
              <div className="flex gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#3F3F3F] flex items-center justify-center text-[#9CA3AF] hover:text-white cursor-pointer"><Undo2 size={14} /></div>
                <div className="w-8 h-8 rounded-lg bg-[#3F3F3F] flex items-center justify-center text-[#9CA3AF] hover:text-white cursor-pointer"><Grid3X3 size={14} /></div>
              </div>
            </div>
            <div className="relative h-96 bg-[#191919] overflow-hidden">
               <div className="absolute inset-0 bg-[linear-gradient(#3F3F3F_1px,transparent_1px),linear-gradient(90deg,#3F3F3F_1px,transparent_1px)] bg-[size:20px_20px] opacity-10" />
               <motion.div 
                drag
                dragConstraints={{ left: 0, right: 300, top: 0, bottom: 200 }}
                className="absolute top-20 left-20 w-40 h-40 bg-[#3B82F6]/20 border-2 border-[#3B82F6] rounded-xl flex items-center justify-center cursor-move group/box"
               >
                  <Box className="text-[#3B82F6]" size={40} />
                  <div className="absolute -top-3 -left-3 w-6 h-6 bg-white border-2 border-[#3B82F6] rounded-sm opacity-0 group-hover/box:opacity-100 transition-opacity" />
                  <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-white border-2 border-[#3B82F6] rounded-sm opacity-0 group-hover/box:opacity-100 transition-opacity" />
               </motion.div>
               <motion.div 
                animate={{ x: [300, 320, 300], y: [100, 120, 100] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute top-40 left-80 w-32 h-20 bg-[#10B981]/20 border-2 border-[#10B981] rounded-lg"
               />
            </div>
            <div className="p-4 bg-[#2C2C2C] flex items-center justify-between border-t border-[#3F3F3F]">
              <div className={`${mono.className} text-[10px] text-[#9CA3AF]`}>X: 1,402.4  Y: 842.1</div>
              <div className={`${mono.className} text-[10px] text-[#3B82F6]`}>ZOOM: 100%</div>
            </div>
          </div>
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#3B82F6]/10 rounded-full blur-[80px] animate-pulse" />
        </motion.div>
      </div>
    </section>
  )
}

const LayersPanel = () => {
  const [items, setItems] = useState(['Background', 'Hero_Shape', 'Navigation', 'CTA_Button', 'Grid_Overlay'])
  
  return (
    <section className="py-24 px-6 bg-[#191919]">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <CanvasCard title="Active Workspace">
            <div className="aspect-video bg-black/40 rounded-lg border border-dashed border-[#3F3F3F] flex items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-[#3B82F6]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <Maximize2 className="text-[#3F3F3F] group-hover:text-[#3B82F6] transition-colors" size={60} />
              <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-md text-[10px] text-[#3B82F6] font-bold">FRAME_RENDER_ACTIVE</div>
            </div>
          </CanvasCard>
        </div>
        <div>
          <CanvasCard title="Layer Stack">
            <Reorder.Group axis="y" values={items} onReorder={setItems} className="space-y-2">
              {items.map((item) => (
                <Reorder.Item 
                  key={item} 
                  value={item}
                  className="bg-[#333333] border border-[#3F3F3F] p-4 rounded-lg flex items-center justify-between cursor-grab active:cursor-grabbing hover:border-[#3B82F6]/40 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Layers size={14} className="text-[#9CA3AF]" />
                    <span className="text-xs font-bold text-[#F3F4F6]">{item}</span>
                  </div>
                  <div className="flex gap-2">
                    <Eye size={14} className="text-[#9CA3AF] hover:text-[#3B82F6] cursor-pointer" />
                    <Trash2 size={14} className="text-[#9CA3AF] hover:text-red-500 cursor-pointer" />
                  </div>
                </Reorder.Item>
              ))}
            </Reorder.Group>
            <button className="w-full mt-6 py-3 border border-dashed border-[#3F3F3F] text-[#9CA3AF] text-[10px] font-black tracking-widest uppercase hover:text-white hover:border-white/20 transition-all rounded-lg">
              ADD_NEW_LAYER
            </button>
          </CanvasCard>
        </div>
      </div>
    </section>
  )
}

const Features = () => (
  <section className="py-24 px-6">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
        <div>
          <h2 className={`${inter.className} text-5xl md:text-6xl font-black text-white mb-4 tracking-tighter uppercase italic`}>CORE_ENGINE</h2>
          <p className={`text-[#9CA3AF] max-w-xl ${inter.className}`}>Deploy high-performance spatial navigation architecture for design-driven teams.</p>
        </div>
        <button className={`px-8 py-3 border border-[#3F3F3F] text-white rounded-lg text-[10px] font-black tracking-[0.3em] uppercase hover:bg-white/5 transition-all`}>
          ALL_MODULES_VIEW
        </button>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {[
          { title: 'Infinite Grid', desc: 'A background grid that scales and fades as you zoom, maintaining a constant sense of orientation.', icon: Grid3X3 },
          { title: 'History Scrub', desc: 'Scrub through your last 50 design changes with real-time UI animation rollback.', icon: History },
          { title: 'Spatial Sync', desc: 'Cloud-synchronized canvas updates with zero-lag for global collaborative sessions.', icon: Cloud },
          { title: 'Layout Morph', desc: 'Fluid layoutId transitions that move elements between frames with spring physics.', icon: Layout },
          { title: 'Numerical Scrub', desc: 'Highly precise input fields with drag-to-change functionality for rapid iterating.', icon: MousePointer2 },
          { title: 'Style Generator', desc: 'Dynamic style extraction that builds interactive color and font palettes instantly.', icon: Palette }
        ].map((feature, i) => (
          <CanvasCard key={i} title={feature.title}>
            <feature.icon className="text-[#3B82F6] mb-6" size={32} />
            <p className={`text-[#9CA3AF] text-sm leading-relaxed ${inter.className}`}>{feature.desc}</p>
          </CanvasCard>
        ))}
      </div>
    </div>
  </section>
)

const Footer = () => (
  <footer className="py-20 px-6 bg-[#191919] border-t border-[#3F3F3F]">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-16">
        <div className="col-span-2">
           <div className={`flex items-center gap-2 ${inter.className} text-xl font-bold tracking-tighter text-white mb-6 uppercase`}>
            <Box className="text-[#3B82F6]" size={24} />
            CANVAS<span className="text-[#3B82F6]">FLOW</span>
          </div>
          <p className={`text-[#9CA3AF] text-[10px] max-w-xs leading-loose font-bold uppercase tracking-[0.2em] ${mono.className}`}>The global standard for spatial design navigation and high-fidelity canvas orchestration. Professional since 2026.</p>
        </div>
        {[
          { title: 'Engine', links: ['Canvas', 'Foundry', 'Spatial', 'API'] },
          { title: 'Company', links: ['About', 'Foundry', 'Careers', 'Brand'] },
          { title: 'Social', links: ['Discord', 'Twitter', 'GitHub', 'LinkedIn'] }
        ].map(group => (
          <div key={group.title}>
            <div className={`${inter.className} text-xs font-black text-white mb-6 uppercase tracking-widest`}>{group.title}</div>
            <ul className="space-y-4">
              {group.links.map(link => (
                <li key={link}><a href="#" className={`${mono.className} text-[8px] text-[#9CA3AF] font-black uppercase tracking-[0.3em] hover:text-[#3B82F6] transition-colors`}>{link}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="pt-8 border-t border-[#3F3F3F] flex flex-col md:flex-row justify-between items-center gap-6">
        <div className={`${mono.className} text-[8px] text-[#9CA3AF] uppercase tracking-[0.5em] font-black`}>© 2026 CANVASFLOW SYSTEMS. STUDIO_ENCRYPTED.</div>
        <div className="flex gap-6">
           <Maximize2 className="text-[#9CA3AF] hover:text-[#3B82F6] cursor-pointer" size={16} />
           <Minimize2 className="text-[#9CA3AF] hover:text-[#3B82F6] cursor-pointer" size={16} />
        </div>
      </div>
    </div>
  </footer>
)

export default function CanvasFlow() {
  return (
    <div className={`min-h-screen bg-[#191919] text-white overflow-x-hidden ${inter.className}`}>
      <Navbar />
      <Hero />
      <LayersPanel />
      <Features />
      <Footer />
      
      {/* --- Global Effects --- */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.05] contrast-150 mix-blend-overlay">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <filter id="canvas-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100" height="100" filter="url(#canvas-noise)" />
        </svg>
      </div>
      
      </div>
  )
}
