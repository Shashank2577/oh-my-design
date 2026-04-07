'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Scissors, 
  PenTool, 
  ScrollText, 
  Trash2, 
  Shield,
  Maximize2, 
  ChevronRight, 
  ArrowRight,
  Sparkles,
  Zap,
  TrendingUp,
  Target,
  Users,
  FileText,
  Share2,
  Bookmark
} from 'lucide-react'
import { Fraunces, Inter, JetBrains_Mono } from 'next/font/google'

const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-fraunces' })
const inter = Inter({ subsets: ['latin'] })
const mono = JetBrains_Mono({ subsets: ['latin'] })

// --- Design Tokens ---
const tokens = {
  colors: {
    background: "#FFFFFF",
    surface: "#F0F0F0",
    accent1: "#FF0000", // Surgical Red
    accent2: "#000000", // Ink Black
    border: "#E5E5E5",
    textHigh: "#000000",
    textLow: "#666666"
  },
  physics: {
    slashing: { type: "spring" as any, stiffness: 600, damping: 10, mass: 0.5 }
  }
}

// --- Components ---

const SlashedButton = ({ children, variant = 'primary', className = '' }: any) => (
  <motion.button
    whileHover={{ skewX: -10, scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={`px-10 py-4 ${fraunces.className} font-black text-lg transition-all relative group overflow-hidden ${
      variant === 'primary' 
        ? `bg-[#FF0000] text-white` 
        : `bg-transparent text-black border-2 border-black`
    } ${className}`}
    style={{ borderRadius: '0' }}
  >
    <span className="relative z-10 flex items-center justify-center gap-3 uppercase">
      {children}
      <Scissors size={18} className="group-hover:rotate-45 transition-transform" />
    </span>
    <div className="absolute inset-0 bg-black/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
  </motion.button>
)

const ClippingCard = ({ children, className = '', title = '' }: any) => (
  <motion.div
    initial={{ opacity: 0, x: -30 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    whileHover={{ x: 10, skewX: -2 }}
    className={`bg-[#F0F0F0] border border-[#E5E5E5] p-10 relative group ${className}`}
    style={{ clipPath: 'polygon(0 0, 95% 0, 100% 5%, 100% 100%, 5% 100%, 0 95%)' }}
  >
    <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-100 transition-opacity">
      <div className="w-10 h-10 border-t-2 border-r-2 border-[#FF0000]" />
    </div>
    {title && <div className={`${mono.className} text-[10px] font-black text-[#FF0000] uppercase tracking-[0.4em] mb-8`}>{title}</div>}
    {children}
  </motion.div>
)

// --- Sections ---

const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md px-8 py-6 border-b border-[#E5E5E5]">
    <div className="max-w-7xl mx-auto flex items-center justify-between">
      <div className={`flex items-center gap-3 ${fraunces.className} text-2xl font-black tracking-tighter text-black uppercase`}>
        <Scissors className="text-[#FF0000]" size={28} />
        COPY<span className="text-[#FF0000] italic">CUTTER</span>
      </div>
      <div className="hidden md:flex items-center gap-12 text-[#666666] font-bold text-[10px] tracking-[0.5em] uppercase">
        {['The Edit', 'Drafts', 'Proofs', 'Archive'].map(item => (
          <a key={item} href="#" className="hover:text-[#FF0000] transition-colors relative group">
            {item}
            <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-[#FF0000] group-hover:w-full transition-all" />
          </a>
        ))}
      </div>
      <SlashedButton className="hidden md:block py-2 px-8 text-xs font-black">START_EDIT</SlashedButton>
    </div>
  </nav>
)

const Hero = () => {
  return (
    <section className="pt-40 pb-20 px-8 relative overflow-hidden min-h-screen flex items-center bg-white">
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
        <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
      </div>
      
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={tokens.physics.slashing}
        >
          <div className="flex items-center gap-3 mb-10">
            <div className="w-12 h-0.5 bg-[#FF0000]" />
            <span className={`text-[10px] font-black text-[#FF0000] tracking-[0.6em] uppercase ${mono.className}`}>System_Status: Surgical</span>
          </div>
          <h1 className={`${fraunces.className} text-7xl md:text-[10rem] font-black text-black leading-[0.8] mb-12 uppercase tracking-tighter`}>
            CUT THE <br/> <span className="text-[#FF0000] italic">NOISE.</span>
          </h1>
          <p className={`text-[#666666] text-xl max-w-xl mb-16 leading-relaxed font-medium ${inter.className}`}>
            CopyCutter treats text as a physical medium. Slice, rearrange, and optimize your message with surgical precision and brutalist clarity.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-10">
            <SlashedButton>EXECUTE_DRAFT</SlashedButton>
            <div className={`flex items-center gap-4 text-black font-black tracking-widest text-xs cursor-pointer group`}>
              VIEW_THE_MANUSCRIPT <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform text-[#FF0000]" />
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: 10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ ...tokens.physics.slashing, delay: 0.2 }}
          className="relative"
        >
          <div className="bg-[#F0F0F0] border border-[#E5E5E5] p-1 shadow-[0_50px_100px_rgba(0,0,0,0.05)] relative overflow-hidden group">
            <div className="absolute inset-0 bg-[#FF0000]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="bg-white p-8 space-y-8 relative z-10">
               <div className="flex justify-between items-center border-b-4 border-black pb-6">
                  <div className={`${fraunces.className} text-3xl font-black uppercase italic`}>Issue No. 01</div>
                  <div className={`${mono.className} text-xs font-bold`}>APRIL_2026</div>
               </div>
               <div className="space-y-4">
                  <div className="h-4 w-full bg-black/10 rounded-sm" />
                  <div className="h-4 w-[90%] bg-black/10 rounded-sm" />
                  <div className="h-4 w-full bg-[#FF0000]/20 rounded-sm" />
                  <div className="h-4 w-[80%] bg-black/10 rounded-sm" />
               </div>
               <div className="pt-8 grid grid-cols-2 gap-8 border-t border-black/5">
                  <div>
                    <div className="text-[8px] font-black text-[#666666] uppercase tracking-widest mb-2">Clarity Score</div>
                    <div className={`${mono.className} text-2xl font-black text-[#FF0000]`}>98.2%</div>
                  </div>
                  <div>
                    <div className="text-[8px] font-black text-[#666666] uppercase tracking-widest mb-2">Impact Index</div>
                    <div className={`${mono.className} text-2xl font-black text-black`}>Elite</div>
                  </div>
               </div>
            </div>
          </div>
          <motion.div 
            animate={{ rotate: [-5, 5, -5] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="absolute -top-10 -right-10 bg-black text-white p-10 rounded-sm shadow-2xl rotate-6"
          >
            <PenTool size={32} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

const StatsBar = () => (
  <section className="py-24 border-y border-[#E5E5E5] bg-white">
    <div className="max-w-7xl mx-auto px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-16 text-center">
        {[
          { label: 'Lines Sliced', value: '4.8M', icon: Scissors },
          { label: 'Clarity Gain', value: '2.4X', icon: Target },
          { label: 'Active Editors', value: '850', icon: Users },
          { label: 'Words Reduced', value: '340K', icon: Trash2 }
        ].map((stat, i) => (
          <motion.div key={i} whileHover={{ y: -5 }}>
            <div className={`${fraunces.className} text-6xl font-black text-black mb-2`}>{stat.value}</div>
            <div className="text-[#FF0000] text-[10px] font-black uppercase tracking-[0.4em]">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)

const Features = () => (
  <section className="py-32 px-8 bg-[#F0F0F0]">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-12">
        <div>
          <h2 className={`${fraunces.className} text-7xl font-black text-black mb-6 uppercase italic tracking-tighter`}>THE_CUT_LIST</h2>
          <p className={`text-[#666666] max-w-xl ${inter.className} font-medium`}>Deploy surgical content optimization architecture for modern editorial environments.</p>
        </div>
        <SlashedButton variant="secondary" className="md:mb-4 text-[10px]">ALL_PROTOCOLS</SlashedButton>
      </div>
      <div className="grid md:grid-cols-3 gap-10">
        {[
          { title: 'Slashing Transitions', desc: 'Moving between sections triggers a diagonal cut animation that physically separates views.', icon: Scissors },
          { title: 'Ink-Bleed Reveal', desc: 'Headlines load with a subtle ink-spreading effect, mimicking physical printing processes.', icon: FileText },
          { title: 'Headline A/B Tester', desc: 'Split-screen container where two headlines are slashed together for real-time comparison.', icon: Target },
          { title: 'Drafting Marks', desc: 'Corner crop marks and proofread annotations that appear rhythmically on scroll.', icon: PenTool },
          { title: 'Surgical Analytics', desc: 'Predictive ROI mapping focusing on word-count reduction and impact maximization.', icon: Activity },
          { title: 'Manuscript Vault', desc: 'Onyx-grade encrypted storage for proprietary content strategy and brand narratives.', icon: ShieldCheck }
        ].map((feature, i) => (
          <ClippingCard key={i} title={`PROTOCOL_0${i + 1}`}>
            <div className="w-16 h-16 bg-[#FF0000]/5 flex items-center justify-center mb-10 rotate-12 group-hover:rotate-0 transition-transform duration-500">
              <feature.icon className="text-[#FF0000]" size={32} />
            </div>
            <h3 className={`${fraunces.className} text-2xl font-black text-black mb-4 uppercase tracking-tighter italic`}>{feature.title}</h3>
            <p className="text-[#666666] text-sm leading-relaxed font-medium">{feature.desc}</p>
          </ClippingCard>
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
           <div className="aspect-[4/5] bg-[#F0F0F0] border border-[#E5E5E5] p-10 relative overflow-hidden">
              <div className="absolute inset-0 bg-[#FF0000]/5 group-hover:opacity-100 opacity-0 transition-opacity" />
              <div className="w-full h-full border border-dashed border-black/20 flex flex-col items-center justify-center text-center">
                 <Scissors className="text-black/10 animate-bounce" size={150} strokeWidth={1} />
                 <div className="mt-12 space-y-4">
                    <div className={`${fraunces.className} text-3xl font-black uppercase italic`}>Surgical Prep</div>
                    <p className="text-[10px] font-bold text-[#666666] uppercase tracking-[0.4em]">Optimizing_Manuscript_v3.0</p>
                 </div>
              </div>
              <motion.div 
                animate={{ x: [0, 400, 0], skewX: [0, 45, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                className="absolute top-0 left-0 w-1 h-full bg-[#FF0000] shadow-[0_0_15px_#FF0000]"
              />
           </div>
           <div className="absolute -bottom-8 -left-8 bg-black text-white p-8 rounded-sm shadow-2xl -rotate-6">
              <div className={`${mono.className} text-xl font-black uppercase`}>Edit_Verified</div>
           </div>
        </div>
        <div className="order-1 lg:order-2">
          <div className={`${mono.className} text-[#FF0000] text-[10px] tracking-[0.5em] font-bold mb-10 uppercase`}>[ THE_ARCHITECTURE_OF_EDIT ]</div>
          <h2 className={`${fraunces.className} text-7xl font-black text-black mb-10 leading-[0.9] uppercase italic tracking-tighter`}>BEYOND THE <br/><span className="text-[#FF0000]">SURFACE.</span></h2>
          <div className={`space-y-8 text-[#666666] text-xl leading-relaxed font-medium ${inter.className}`}>
            <p>Traditional content tools treat text as a static document. CopyCutter treats it as a living organism. We slice away the unnecessary to reveal the essential core of your brand's voice.</p>
            <p>Our implementation of kinetic editorial physics ensures that every word has the weight of an executive decision.</p>
          </div>
          <SlashedButton className="mt-12">CONNECT_MAIN_DRAFT</SlashedButton>
        </div>
      </div>
    </div>
  </section>
)

const Footer = () => (
  <footer className="py-24 px-8 bg-white border-t border-[#E5E5E5]">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-16 mb-24">
        <div className="col-span-2">
           <div className={`flex items-center gap-3 ${fraunces.className} text-2xl font-black tracking-tighter text-black uppercase mb-10`}>
            <Scissors className="text-[#FF0000]" size={28} />
            COPY<span className="text-[#FF0000] italic">CUTTER</span>
          </div>
          <p className={`text-[#666666] text-[10px] max-w-xs leading-loose font-black uppercase tracking-[0.2em] ${mono.className}`}>The global standard for surgical content optimization and brutalist editorial design. Decisive since 2026.</p>
        </div>
        {[
          { title: 'The Edit', links: ['Slicing', 'Manuscripts', 'Foundry', 'Pricing'] },
          { title: 'Agency', links: ['About Us', 'Legitimacy', 'Careers', 'Brand'] },
          { title: 'Connect', links: ['Twitter', 'LinkedIn', 'Support', 'Journal'] }
        ].map(group => (
          <div key={group.title}>
            <div className={`${fraunces.className} text-xs font-black text-black mb-10 uppercase tracking-widest`}>{group.title}</div>
            <ul className="space-y-6">
              {group.links.map(link => (
                <li key={link}><a href="#" className={`${mono.className} text-[8px] text-[#666666] font-black uppercase tracking-[0.3em] hover:text-[#FF0000] transition-colors`}>{link}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="pt-12 border-t border-[#E5E5E5] flex flex-col md:flex-row justify-between items-center gap-10">
        <div className={`${mono.className} text-[8px] text-[#666666] uppercase tracking-[0.5em] font-black`}>© 2026 COPYCUTTER EDITORIAL CORP. SURGICAL_ENCRYPTED.</div>
        <div className="flex gap-10">
           <PenTool className="text-[#666666] hover:text-[#FF0000] cursor-pointer transition-colors" size={18} />
           <ScrollText className="text-[#666666] hover:text-[#FF0000] cursor-pointer transition-colors" size={18} />
        </div>
      </div>
    </div>
  </footer>
)

const Activity = ({ className, size }: any) => <TrendingUp className={className} size={size} />
const ShieldCheck = ({ className, size }: any) => <Shield className={className} size={size} />

export default function CopyCutter() {
  return (
    <div className={`min-h-screen bg-white text-black overflow-x-hidden ${inter.className} ${fraunces.variable}`}>
      <Navbar />
      <Hero />
      <StatsBar />
      <Features />
      <ProductDetail />
      <Footer />
      
      {/* --- Global Effects --- */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03] contrast-150 mix-blend-multiply">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <filter id="cutter-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100" height="100" filter="url(#cutter-noise)" />
        </svg>
      </div>
      
      </div>
  )
}
