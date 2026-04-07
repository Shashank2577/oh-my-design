'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { 
  Presentation, 
  Sparkles, 
  Layers, 
  Monitor, 
  MousePointer2, 
  ChevronRight, 
  Play,
  ArrowRight,
  Shield,
  Zap,
  Layout,
  Trophy,
  Users,
  Target,
  ChevronDown
} from 'lucide-react'
import { Playfair_Display, Inter } from 'next/font/google'

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '700', '900'] })
const inter = Inter({ subsets: ['latin'] })

// --- Design Tokens ---
const tokens = {
  colors: {
    background: "#000000",
    surface: "#0A0A0A",
    accent1: "#FFFFFF", // Pure Spotlight
    accent2: "#B8860B", // Dark Gold
    border: "rgba(255, 255, 255, 0.1)",
    textHigh: "#FFFFFF",
    textLow: "#666666"
  },
  physics: {
    theatrical: { type: "spring" as any, stiffness: 80, damping: 20, mass: 1.5 }
  }
}

// --- Components ---

const PitchButton = ({ children, variant = 'primary', className = '' }: any) => (
  <motion.button
    whileHover={{ scale: 1.05, letterSpacing: '0.1em' }}
    whileTap={{ scale: 0.95 }}
    className={`px-12 py-5 ${playfair.className} font-black text-lg transition-all relative group overflow-hidden ${
      variant === 'primary' 
        ? `bg-white text-black` 
        : `bg-transparent text-white border border-white/20`
    } ${className}`}
  >
    <span className="relative z-10 flex items-center justify-center gap-3 uppercase italic tracking-tighter">
      {children}
      <Play size={18} className={variant === 'primary' ? 'fill-black' : ''} />
    </span>
    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
  </motion.button>
)

const SlideCard = ({ children, className = '' }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={`bg-[#0A0A0A] border border-white/5 p-12 relative group overflow-hidden ${className}`}
  >
    <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity">
      <Sparkles className="text-white" size={24} />
    </div>
    {children}
  </motion.div>
)

// --- Sections ---

const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 px-8 py-10">
    <div className="max-w-7xl mx-auto flex items-center justify-between">
      <div className={`flex items-center gap-3 ${playfair.className} text-3xl font-black tracking-tighter text-white italic`}>
        <Presentation size={32} />
        PITCH<span className="font-light opacity-40">PERFECT</span>
      </div>
      <div className="hidden md:flex items-center gap-12 text-[10px] font-black tracking-[0.5em] uppercase text-white/40">
        {['The Deck', 'Showcase', 'Vision', 'Connect'].map(item => (
          <a key={item} href="#" className="hover:text-white transition-colors relative group">
            {item}
            <span className="absolute -bottom-2 left-0 w-full h-px bg-white scale-x-0 group-hover:scale-x-100 transition-transform" />
          </a>
        ))}
      </div>
      <PitchButton className="hidden md:block py-2 px-8 text-[10px]" variant="secondary">START_DECK</PitchButton>
    </div>
  </nav>
)

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-8 overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#FFFFFF08_0%,_transparent_60%)]" />
        <motion.div 
          animate={{ opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')] opacity-20" 
        />
      </div>
      
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`inline-block mb-10 px-8 py-2 border border-white/10 rounded-full text-[10px] tracking-[0.6em] font-black uppercase text-white/40 ${inter.className}`}
        >
          Theatrical Presentation Foundry
        </motion.div>
        <h1 className={`${playfair.className} text-8xl md:text-[14rem] font-black text-white leading-[0.8] mb-16 uppercase italic tracking-tighter`}>
          HERO <br/> <span className="opacity-20 font-light not-italic">REVEAL.</span>
        </h1>
        <p className={`text-white/40 text-2xl max-w-2xl mx-auto mb-20 leading-relaxed font-medium ${inter.className}`}>
          PitchPerfect is the theatrical Sales Deck engine for high-stakes narratives. We turn simple presentations into unforgettable cinematic events.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-12">
          <PitchButton>BEGIN_THE_PITCH</PitchButton>
          <div className={`flex items-center gap-4 text-white font-black tracking-widest text-sm cursor-pointer group`}>
            VIEW_THE_SHOWREEL <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
          </div>
        </div>
      </div>
      
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: [0.42, 0, 0.58, 1] }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/20 flex flex-col items-center gap-4"
      >
        <div className="text-[8px] tracking-[0.6em] uppercase font-black">Scroll_to_View</div>
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
          { label: 'Decks Built', value: '1.2K+', icon: Presentation },
          { label: 'Funding Raised', value: '$4.8B', icon: Trophy },
          { label: 'Pitch ROI', value: '12.4X', icon: Zap },
          { label: 'Global Clients', value: '150+', icon: Users }
        ].map((stat, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.1 }}
            className="flex flex-col items-center group"
          >
            <div className={`${playfair.className} text-6xl font-black text-white mb-2 italic`}>{stat.value}</div>
            <div className="text-[10px] tracking-[0.4em] uppercase font-black text-white/20 group-hover:text-white transition-colors">{stat.label}</div>
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
        <h2 className={`${playfair.className} text-6xl font-black uppercase italic leading-none text-white`}>PITCH <br/><span className="text-white/20 not-italic">PROTOCOLS</span></h2>
        <p className="text-white/30 max-w-md text-xl leading-relaxed font-medium">Deploy theatrical presentation architecture built for high-stakes storytelling.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-10">
        {[
          { title: 'Spotlight Focal', desc: 'Custom cursor technology that creates a theatrical spotlight effect on hovered elements.', icon: MousePointer2 },
          { title: 'Slide Transition', desc: 'Full-page scroll-jacking that mimics the fluid movement of an elite keynote presentation.', icon: Layout },
          { title: 'Hero Reveals', desc: 'Section entries that utilize high-impact scale and blur-reveals for maximum dramatic weight.', icon: Sparkles },
          { title: 'Legacy Foundry', desc: 'A proprietary font engine that builds unique theatrical typefaces for your deck.', icon: Layers },
          { title: 'Impact Metrics', desc: 'Predictive analytics that map the psychological weight of every slide in your pitch.', icon: Target },
          { title: 'Secure Deck', desc: 'Onyx-grade encryption for proprietary sales data and narrative intellectual property.', icon: Shield }
        ].map((feature, i) => (
          <SlideCard key={i}>
            <div className="w-16 h-16 border border-white/10 flex items-center justify-center mb-10 rotate-45 group-hover:rotate-0 transition-transform duration-500 bg-white/5">
              <feature.icon className="text-white -rotate-45 group-hover:rotate-0 transition-transform duration-500" size={32} />
            </div>
            <h3 className={`${playfair.className} text-2xl font-black text-white mb-4 uppercase tracking-tighter italic`}>{feature.title}</h3>
            <p className="text-white/40 text-sm leading-relaxed font-medium">{feature.desc}</p>
          </SlideCard>
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
          <div className="aspect-video bg-black border border-white/5 p-8 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex justify-between items-start">
              <div className={`${playfair.className} text-xl font-black text-white italic`}>SLIDE_01: VISION</div>
              <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
            </div>
            <div className="space-y-4">
              <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  transition={{ duration: 2 }}
                  className="h-full bg-white"
                />
              </div>
              <div className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em]">Rendering_Pitch_Asset_v3.0</div>
            </div>
          </div>
          <div className="absolute -bottom-10 -right-10 bg-white text-black p-10 rounded-sm shadow-2xl rotate-6 group-hover:rotate-0 transition-transform duration-700">
            <div className={`${playfair.className} text-2xl font-black italic`}>100% IMPACT</div>
          </div>
        </div>
        <div>
          <div className={`mb-10 ${playfair.className} text-white font-black tracking-[0.5em] uppercase text-[10px]`}>[ THE_ARCHITECTURE_OF_PITCH ]</div>
          <h2 className={`${playfair.className} text-6xl font-black text-white mb-10 leading-[0.9] uppercase italic`}>BEYOND THE <br/> <span className="opacity-20 font-light not-italic">KEYNOTE.</span></h2>
          <div className={`space-y-8 text-white/40 text-xl leading-relaxed font-medium ${inter.className}`}>
            <p>Traditional sales decks are boring documents. PitchPerfect turns them into cinematic events. We treat every slide as a scene, every transition as a revelation.</p>
            <p>Our implementation of slide-jacking and spotlight focal technology ensures that your audience remains captivated from the first pixel to the final close.</p>
          </div>
          <PitchButton className="mt-12">CONNECT_DECK_NODE</PitchButton>
        </div>
      </div>
    </div>
  </section>
)

const FAQ = () => {
  const [open, setOpen] = useState(0)
  return (
    <section className="py-32 px-8 bg-black">
      <div className="max-w-3xl mx-auto">
        <h2 className={`${playfair.className} text-5xl font-black uppercase mb-16 text-center italic text-white`}>PITCH_QUERIES</h2>
        <div className="space-y-6">
          {[
            { q: 'What is Spotlight Focal technology?', a: 'It is a custom interaction system that follows the user\'s mouse and creates a theatrical lighting effect, naturally guiding attention to your deck\'s most important points.' },
            { q: 'Can I export my deck?', a: 'Yes. All PitchPerfect decks can be exported as high-fidelity interactive HTML bundles or as static, high-res PDF presentations for offline viewing.' },
            { q: 'How long does a build take?', a: 'Crafting a theatrical experience requires focus. Standard decks take 2-3 weeks, while full narrative productions span 1-2 months.' },
            { q: 'Does it work with existing data?', a: 'Absolutely. Our API bridge allows you to pull real-time data from your existing CRM or analytics stack directly into your slide visualizations.' }
          ].map((item, i) => (
            <div key={i} className={`border-b border-white/10 overflow-hidden transition-all duration-500 ${open === i ? 'pb-10' : 'pb-0'}`}>
              <button 
                onClick={() => setOpen(open === i ? -1 : i)}
                className="w-full py-10 flex items-center justify-between text-left"
              >
                <span className={`${playfair.className} text-xl font-bold text-white uppercase tracking-tighter`}>{item.q}</span>
                <div className={`w-8 h-8 border border-white/20 flex items-center justify-center transition-transform ${open === i ? 'rotate-45' : ''}`}>
                  <ChevronDown size={16} />
                </div>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="text-white/40 text-sm leading-relaxed font-medium"
                  >
                    {item.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const Footer = () => (
  <footer className="py-24 px-8 bg-black border-t border-white/5">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-16 mb-24">
        <div className="col-span-2">
          <div className={`${playfair.className} text-3xl font-black uppercase text-white mb-8 italic`}>PITCH<span className="font-light opacity-40">PERFECT</span></div>
          <p className="text-white/30 text-xs leading-loose font-black uppercase tracking-[0.2em] max-w-xs">Building the theatrical future of digital sales and storytelling. Narrative-first and high-fidelity since 2026.</p>
        </div>
        {[
          { title: 'The Deck', links: ['Slides', 'Spotlight', 'Foundry', 'Pricing'] },
          { title: 'Analysis', links: ['Impact Map', 'ROI Radar', 'Archive', 'Lab'] },
          { title: 'Network', links: ['Twitter', 'Discord', 'GitHub', 'Mainframe'] }
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
        <div className="text-white/20 text-[10px] font-black tracking-[0.5em] uppercase">© 2026 PITCHPERFECT KEYNOTE CORP. ALL PRESENTATIONS RESERVED.</div>
        <div className="flex gap-10">
          <Presentation className="text-white/20 hover:text-white transition-colors cursor-pointer" size={20} />
          <Play className="text-white/20 hover:text-white transition-colors cursor-pointer" size={20} />
        </div>
      </div>
    </div>
  </footer>
)

export default function PitchPerfect() {
  return (
    <div className={`min-h-screen bg-black text-white overflow-x-hidden ${inter.className}`}>
      <Navbar />
      <Hero />
      <StatsBar />
      <Features />
      <ProductDetail />
      <FAQ />
      <Footer />
      
      {/* --- Global Effects --- */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.05] contrast-150 mix-blend-overlay">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <filter id="pitch-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100" height="100" filter="url(#pitch-noise)" />
        </svg>
      </div>
    </div>
  )
}
