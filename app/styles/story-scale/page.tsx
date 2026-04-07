'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { 
  BookOpen, 
  ScrollText, 
  PenTool, 
  Layers, 
  Maximize2, 
  ChevronRight, 
  ArrowRight,
  Sparkles,
  Zap,
  Target,
  Globe,
  Users,
  Video,
  Film,
  Type,
  Share2,
  Bookmark,
  Play
} from 'lucide-react'
import { Fraunces, Inter, JetBrains_Mono } from 'next/font/google'

const fraunces = Fraunces({ subsets: ['latin'], weight: ['400', '700', '900'], variable: '--font-fraunces' })
const inter = Inter({ subsets: ['latin'] })
const mono = JetBrains_Mono({ subsets: ['latin'] })

// --- Design Tokens ---
const tokens = {
  colors: {
    background: "#FDFCF0", // Manuscript Tan
    surface: "#FFFFFF",
    accent1: "#1A1A1A", // Ink Black
    accent2: "#D4AF37", // Story Gold
    border: "rgba(0, 0, 0, 0.05)",
    textHigh: "#1A1A1A",
    textLow: "#888888"
  },
  physics: {
    narrative: { type: "spring" as any, stiffness: 100, damping: 20, mass: 1.2 }
  }
}

// --- Components ---

const StoryButton = ({ children, variant = 'primary', className = '' }: any) => (
  <motion.button
    whileHover={{ scale: 1.02, letterSpacing: '0.05em' }}
    whileTap={{ scale: 0.98 }}
    className={`px-10 py-4 ${fraunces.className} font-bold text-xs tracking-[0.2em] transition-all relative group overflow-hidden border ${
      variant === 'primary' 
        ? `bg-[#1A1A1A] text-white border-[#1A1A1A]` 
        : `bg-transparent text-[#1A1A1A] border-black/20`
    } ${className}`}
  >
    <span className="relative z-10 flex items-center justify-center gap-2 uppercase">
      {children}
      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
    </span>
    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
  </motion.button>
)

const SceneCard = ({ children, className = '', title = '' }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ y: -5 }}
    className={`bg-white border border-black/5 p-10 relative group ${className}`}
    style={{ boxShadow: '0 40px 80px rgba(0,0,0,0.02)' }}
  >
    <div className="absolute top-0 left-0 w-full h-0.5 bg-[#1A1A1A] scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
    {title && <div className={`${mono.className} text-[8px] font-bold text-[#888888] uppercase tracking-[0.4em] mb-8`}>{title}</div>}
    {children}
  </motion.div>
)

// --- Sections ---

const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 bg-[#FDFCF0]/80 backdrop-blur-md px-8 py-6 border-b border-black/5">
    <div className="max-w-7xl mx-auto flex items-center justify-between">
      <div className={`flex items-center gap-3 ${fraunces.className} text-2xl font-black tracking-tighter text-[#1A1A1A] uppercase`}>
        <ScrollText className="text-black" size={28} />
        STORY<span className="font-light opacity-40 italic">SCALE</span>
      </div>
      <div className="hidden md:flex items-center gap-12 text-[#888888] font-bold text-[10px] tracking-[0.4em] uppercase">
        {['The Arc', 'Archives', 'Legacy', 'Foundry'].map(item => (
          <a key={item} href="#" className="hover:text-black transition-colors">{item}</a>
        ))}
      </div>
      <StoryButton className="hidden md:block py-2 text-[10px]" variant="secondary">AUTH_AUTHOR</StoryButton>
    </div>
  </nav>
)

const Hero = () => {
  return (
    <section className="pt-40 pb-20 px-8 relative overflow-hidden min-h-screen flex items-center bg-[#FDFCF0]">
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
      </div>
      
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={tokens.physics.narrative}
        >
          <div className="flex items-center gap-3 mb-10">
            <div className="w-12 h-px bg-black" />
            <span className={`text-[10px] font-bold text-black tracking-[0.6em] uppercase ${mono.className}`}>Narrative_Foundry_V3.0</span>
          </div>
          <h1 className={`${fraunces.className} text-7xl md:text-[10rem] font-black text-[#1A1A1A] leading-[0.8] mb-12 uppercase tracking-tighter`}>
            SCALE THE <br/> <span className="font-light opacity-20 italic">SCRIPT.</span>
          </h1>
          <p className={`text-[#888888] text-xl max-w-xl mb-16 leading-relaxed font-medium ${inter.className}`}>
            StoryScale is the high-fidelity ecosystem for architectural storytelling. Map narrative arcs, orchestrate characters, and build digital legacies at scale.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-10">
            <StoryButton>START_WRITING</StoryButton>
            <div className={`flex items-center gap-4 text-black font-black tracking-widest text-[10px] cursor-pointer group`}>
              THE_MANIFESTO <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform text-black" />
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: 0.2 }}
          className="relative"
        >
          <div className="bg-white border border-black/5 p-10 rounded-sm shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center justify-between mb-16 border-b-2 border-black pb-6">
              <div className={`${fraunces.className} text-2xl font-bold italic`}>Scene 01: The Setup</div>
              <div className={`${mono.className} text-[10px] text-[#888888]`}>INT. OFFICE - DAY</div>
            </div>
            <div className="space-y-8 relative z-10">
               <div className="space-y-4">
                  <div className="h-2 w-full bg-black/5" />
                  <div className="h-2 w-[90%] bg-black/5" />
                  <div className="h-2 w-full bg-black/5" />
               </div>
               <div className="flex flex-col items-center gap-4 text-center">
                  <div className="text-[10px] font-black uppercase tracking-[0.4em]">CHARACTER_A</div>
                  <p className="italic text-lg leading-relaxed">"The arc must be perfect. Every scene a revelation, every word a choice."</p>
               </div>
               <div className="space-y-4">
                  <div className="h-2 w-[80%] bg-black/5 mx-auto" />
                  <div className="h-2 w-[60%] bg-black/5 mx-auto" />
               </div>
            </div>
          </div>
          <motion.div 
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 5 }}
            className="absolute -top-10 -right-10 bg-[#1A1A1A] text-white p-8 rounded-sm shadow-2xl rotate-12"
          >
            <PenTool size={32} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

const StatsBar = () => (
  <section className="py-24 border-y border-black/5 bg-white">
    <div className="max-w-7xl mx-auto px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-16 text-center">
        {[
          { label: 'Words Written', value: '450M+', icon: Type },
          { label: 'Arcs Mapped', value: '12K', icon: Target },
          { label: 'Story ROI', value: '3.4X', icon: Zap },
          { label: 'Global reach', value: '150+', icon: Globe }
        ].map((stat, i) => (
          <motion.div key={i} whileHover={{ y: -5 }}>
            <div className={`${fraunces.className} text-6xl font-bold text-[#1A1A1A] mb-2`}>{stat.value}</div>
            <div className="text-[#888888] text-[10px] font-black uppercase tracking-[0.4em]">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)

const Features = () => (
  <section className="py-32 px-8 bg-[#FDFCF0]">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-12">
        <div>
          <h2 className={`${fraunces.className} text-7xl font-black text-[#1A1A1A] mb-6 uppercase italic tracking-tighter leading-none`}>NARRATIVE <br/> <span className="font-light opacity-20 not-italic">MODULES</span></h2>
          <p className={`text-[#888888] max-w-xl ${inter.className}`}>Deploy structural storytelling architecture built for professional scriptwriting.</p>
        </div>
        <StoryButton variant="secondary" className="md:mb-4 text-[10px]">ALL_SYSTEMS_VIEW</StoryButton>
      </div>
      <div className="grid md:grid-cols-3 gap-10">
        {[
          { title: 'Arc Visualization', desc: 'Real-time dynamic scaling of narrative arcs based on live emotional load signals.', icon: Target },
          { title: 'Page-Turn Reveal', desc: 'Section transitions that use high-impact vertical scrolling and motion-blur reveals.', icon: BookOpen },
          { title: 'Character Sync', desc: 'Sub-ms multi-device synchronization for high-stakes digital agency environments.', icon: Users },
          { title: 'Legacy Foundry', desc: 'A proprietary creative engine that builds unique visual typefaces for your story.', icon: Type },
          { title: 'Script Vault', desc: 'Encrypted storage for proprietary plan logic and historical performance data.', icon: ShieldCheck },
          { title: 'Theatrical Export', desc: 'High-fidelity cinematic overlays for live performance analysis and instant feedback.', icon: Film }
        ].map((feature, i) => (
          <SceneCard key={i} title={`ACT_0${i + 1}`}>
            <div className="w-16 h-16 bg-black/5 rounded-full flex items-center justify-center mb-10 rotate-12 group-hover:rotate-0 transition-transform duration-500">
              <feature.icon className="text-black" size={32} />
            </div>
            <h3 className={`${fraunces.className} text-2xl font-bold text-[#1A1A1A] mb-4 uppercase tracking-tighter italic`}>{feature.title}</h3>
            <p className="text-[#888888] text-sm leading-relaxed font-medium">{feature.desc}</p>
          </SceneCard>
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
           <div className="aspect-[4/5] bg-[#FDFCF0] border border-black/5 p-10 relative overflow-hidden">
              <div className="absolute inset-0 bg-black/5 group-hover:opacity-100 opacity-0 transition-opacity" />
              <div className="w-full h-full border border-dashed border-black/20 flex flex-col items-center justify-center text-center">
                 <ScrollText className="text-black/10 animate-bounce" size={150} strokeWidth={1} />
                 <div className="mt-12 space-y-4">
                    <div className={`${fraunces.className} text-3xl font-bold uppercase italic`}>Manuscript Prep</div>
                    <p className="text-[10px] font-bold text-[#888888] uppercase tracking-[0.4em]">Rendering_Structural_Data</p>
                 </div>
              </div>
              <motion.div 
                animate={{ y: [0, 400, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                className="absolute top-0 left-0 w-full h-px bg-black shadow-[0_0_15px_black]"
              />
           </div>
           <div className="absolute -bottom-8 -left-8 bg-black text-white p-8 rounded-sm shadow-2xl rotate-6">
              <div className={`${mono.className} text-xl font-black uppercase`}>Script_Verified</div>
           </div>
        </div>
        <div className="order-1 lg:order-2">
          <div className={`${mono.className} text-black text-[10px] font-bold mb-10 uppercase tracking-[0.5em]`}>[ ENGINE_ARCHITECTURE ]</div>
          <h2 className={`${fraunces.className} text-7xl font-black text-[#1A1A1A] mb-10 leading-[0.9] uppercase italic tracking-tighter`}>CRAFTED BY <br/><span className="font-light opacity-20 not-italic">NARRATIVE.</span></h2>
          <div className={`space-y-8 text-[#888888] text-xl leading-relaxed font-medium ${inter.className}`}>
            <p>Traditional scripts are flat documents. StoryScale scripts are architectures. We treat every narrative variable as a load-bearing element, ensuring your story is stable under pressure.</p>
            <p>Our implementation of structural physics and act-sync ensures that the brand legacy is as permanent as the building blocks.</p>
          </div>
          <StoryButton className="mt-12">CONNECT_MAIN_SCRIPT</StoryButton>
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
           <div className={`flex items-center gap-3 ${fraunces.className} text-2xl font-black tracking-tighter text-[#1A1A1A] uppercase mb-10`}>
            <ScrollText className="text-black" size={28} />
            STORY<span className="font-light opacity-40 italic">SCALE</span>
          </div>
          <p className={`text-[#888888] text-[10px] max-w-xs leading-loose font-black uppercase tracking-[0.2em] ${mono.className}`}>The global standard for professional scriptwriting management and high-energy narrative analytics. Cinematic since 2026.</p>
        </div>
        {[
          { title: 'The Arc', links: ['Slicing', 'Manuscripts', 'Foundry', 'Pricing'] },
          { title: 'Agency', links: ['About Us', 'Legitimacy', 'Careers', 'Brand'] },
          { title: 'Connect', links: ['Twitter', 'LinkedIn', 'Support', 'Journal'] }
        ].map(group => (
          <div key={group.title}>
            <div className={`${fraunces.className} text-xs font-black text-black mb-10 uppercase tracking-widest`}>{group.title}</div>
            <ul className="space-y-6">
              {group.links.map(link => (
                <li key={link}><a href="#" className={`${mono.className} text-[8px] text-[#888888] font-black uppercase tracking-[0.3em] hover:text-black transition-colors`}>{link}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="pt-12 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-10">
        <div className={`${mono.className} text-[8px] text-[#888888] uppercase tracking-[0.5em] font-black`}>© 2026 STORYSCALE NARRATIVE CORP. CHAPTER_ENCRYPTED.</div>
        <div className="flex gap-10">
           <PenTool className="text-[#888888] hover:text-black cursor-pointer transition-colors" size={18} />
           <Bookmark className="text-[#888888] hover:text-black cursor-pointer transition-colors" size={18} />
        </div>
      </div>
    </div>
  </footer>
)

const ShieldCheck = ({ className, size }: any) => <ShieldCheckOriginal className={className} size={size} />
import { ShieldCheck as ShieldCheckOriginal } from 'lucide-react'

export default function StoryScale() {
  return (
    <div className={`min-h-screen bg-[#FDFCF0] text-[#1A1A1A] overflow-x-hidden ${inter.className} ${fraunces.variable}`}>
      <Navbar />
      <Hero />
      <StatsBar />
      <Features />
      <ProductDetail />
      <Footer />
      
      {/* --- Global Effects --- */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03] contrast-150 mix-blend-multiply">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <filter id="story-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100" height="100" filter="url(#story-noise)" />
        </svg>
      </div>
    </div>
  )
}
