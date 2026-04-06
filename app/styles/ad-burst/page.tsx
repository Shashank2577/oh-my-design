'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { 
  Zap, 
  TrendingUp, 
  Target, 
  Users, 
  Sparkles, 
  Rocket, 
  ChevronDown, 
  ArrowRight,
  MousePointer2,
  Share2,
  Trophy,
  Activity,
  Flame,
  Globe,
  Layout
} from 'lucide-react'
import { Syne, Inter } from 'next/font/google'

const syne = Syne({ subsets: ['latin'], weight: ['400', '700', '800'] })
const inter = Inter({ subsets: ['latin'] })

// --- Design Tokens ---
const tokens = {
  colors: {
    background: "#000000",
    surface: "#111111",
    accent1: "#F9004D", // Flash Pink
    accent2: "#FFD700", // Gold
    border: "rgba(249, 0, 77, 0.3)",
    textHigh: "#FFFFFF",
    textLow: "#A0A0A0"
  },
  physics: {
    explosive: { type: "spring" as any, stiffness: 300, damping: 15, mass: 0.7 }
  }
}

// --- Components ---

const BurstButton = ({ children, variant = 'primary', className = '' }: any) => (
  <motion.button
    whileHover={{ scale: 1.1, rotate: [0, -1, 1, -1, 0] }}
    whileTap={{ scale: 0.9 }}
    className={`px-10 py-5 rounded-sm ${syne.className} font-extrabold text-lg transition-all relative group overflow-hidden ${
      variant === 'primary' 
        ? `bg-[#F9004D] text-white shadow-[0_0_30px_rgba(249,0,77,0.4)]` 
        : `bg-transparent text-white border-2 border-white/20 hover:border-[#F9004D]`
    } ${className}`}
  >
    <span className="relative z-10 flex items-center justify-center gap-3 uppercase italic tracking-tighter">
      {children}
      <Zap size={20} className="fill-current" />
    </span>
    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
  </motion.button>
)

const FragmentCard = ({ children, className = '' }: any) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
    viewport={{ once: true }}
    whileHover={{ scale: 1.05, rotate: 1 }}
    className={`bg-[#111111] border border-white/5 p-10 relative group overflow-hidden ${className}`}
    style={{ clipPath: 'polygon(0 0, 95% 0, 100% 5%, 100% 100%, 5% 100%, 0 95%)' }}
  >
    <div className="absolute top-0 left-0 w-full h-1 bg-[#F9004D] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    {children}
  </motion.div>
)

// --- Sections ---

const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 px-8 py-10">
    <div className="max-w-7xl mx-auto flex items-center justify-between">
      <div className={`flex items-center gap-2 ${syne.className} text-3xl font-extrabold tracking-tighter text-white italic`}>
        <Flame className="text-[#F9004D] fill-[#F9004D]" size={32} />
        AD<span className="text-[#F9004D]">BURST</span>
      </div>
      <div className="hidden md:flex items-center gap-12 text-[10px] font-black tracking-[0.5em] uppercase text-white/40">
        {['Campaigns', 'Velocity', 'Reach', 'Foundry'].map(item => (
          <a key={item} href="#" className="hover:text-white transition-colors relative group">
            {item}
            <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-[#F9004D] scale-x-0 group-hover:scale-x-100 transition-transform" />
          </a>
        ))}
      </div>
      <BurstButton className="hidden md:block py-3 px-8 text-xs">LAUNCH_CAMPAIGN</BurstButton>
    </div>
  </nav>
)

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center px-8 overflow-hidden">
      <div className="absolute inset-0 z-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: "50%", 
              y: "50%", 
              opacity: 0, 
              scale: 0 
            }}
            animate={{ 
              x: `${Math.random() * 100}%`, 
              y: `${Math.random() * 100}%`, 
              opacity: [0, 0.2, 0], 
              scale: Math.random() * 2 
            }}
            transition={{ 
              duration: Math.random() * 5 + 5, 
              repeat: Infinity, 
              delay: Math.random() * 5 
            }}
            className="absolute w-1 h-1 bg-[#F9004D] rounded-full blur-[2px]"
          />
        ))}
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={tokens.physics.explosive}
        >
          <div className="flex items-center gap-3 mb-10">
            <div className="px-4 py-1 bg-[#F9004D] text-white text-[10px] font-black tracking-widest uppercase italic shadow-[0_0_20px_#F9004D]">
              Viral_Engine_Active
            </div>
          </div>
          <h1 className={`${syne.className} text-8xl md:text-[14rem] font-extrabold text-white leading-[0.75] mb-16 uppercase italic tracking-tighter`}>
            TOTAL <br/> <span className="text-[#F9004D] drop-shadow-[0_0_40px_rgba(249,0,77,0.5)]">IMPACT.</span>
          </h1>
          <p className={`text-white/40 text-2xl max-w-2xl mb-20 leading-relaxed font-medium ${inter.className}`}>
            AdBurst is the big-bang generator for campaigns that refuse to be ignored. Explosive reach, high-velocity conversion, and total digital dominance.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-12">
            <BurstButton>IGNITE_REACH</BurstButton>
            <div className={`flex items-center gap-4 text-white font-black tracking-widest text-sm cursor-pointer group`}>
              VIEW_THE_SHOCKWAVE <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform text-[#F9004D]" />
            </div>
          </div>
        </motion.div>
      </div>
      
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute -right-40 -bottom-40 w-96 h-96 bg-[#F9004D]/20 rounded-full blur-[150px]"
      />
    </section>
  )
}

const StatsBar = () => (
  <section className="py-24 border-y border-white/5 bg-[#050505]">
    <div className="max-w-7xl mx-auto px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
        {[
          { label: 'Impressions', value: '4.8B', icon: Globe },
          { label: 'Viral Coeff', value: '12.4', icon: Activity },
          { label: 'Growth Rate', value: '340%', icon: TrendingUp },
          { label: 'Campaigns', value: '8.2K', icon: Layout }
        ].map((stat, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.1, color: tokens.colors.accent1 }}
            className="flex flex-col items-center group"
          >
            <div className={`${syne.className} text-6xl font-extrabold text-white mb-2 italic`}>{stat.value}</div>
            <div className="text-[10px] tracking-[0.5em] uppercase font-black text-white/20 group-hover:text-[#F9004D] transition-colors">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)

const CampaignCore = () => {
  const [exploded, setExploded] = useState(false)
  
  return (
    <section className="py-40 px-8 bg-black relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className={`${syne.className} text-5xl md:text-7xl font-extrabold text-white mb-20 uppercase italic`}>THE_CAMPAIGN_CORE</h2>
        <div className="relative h-[500px] flex items-center justify-center">
          <motion.div
            animate={exploded ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
            onClick={() => setExploded(true)}
            className="w-40 h-40 bg-[#F9004D] rounded-full cursor-pointer shadow-[0_0_100px_#F9004D] flex items-center justify-center relative z-20"
          >
            <span className="text-white font-black text-xs uppercase tracking-widest">Ignite</span>
          </motion.div>
          
          <AnimatePresence>
            {exploded && [...Array(40)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                animate={{ 
                  scale: Math.random() * 2, 
                  x: (Math.random() - 0.5) * 800, 
                  y: (Math.random() - 0.5) * 600,
                  opacity: 0
                }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute w-4 h-4 bg-[#F9004D] rotate-45 z-10"
              />
            ))}
          </AnimatePresence>
          
          <AnimatePresence>
            {exploded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 flex flex-col items-center justify-center"
              >
                <div className={`${syne.className} text-[15rem] font-black text-white italic opacity-10`}>REACH</div>
                <div className="mt-10">
                  <BurstButton onClick={() => setExploded(false)}>REBOOT_CORE</BurstButton>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

const Features = () => (
  <section className="py-32 px-8">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-start justify-between mb-24 gap-12">
        <h2 className={`${syne.className} text-6xl font-extrabold uppercase italic leading-none text-white`}>MOMENTUM <br/><span className="text-[#F9004D]">PROTOCOLS</span></h2>
        <p className="text-white/30 max-w-md text-xl leading-relaxed font-medium">Deploy high-energy campaign architecture built for explosive digital growth.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-10">
        {[
          { title: 'Viral Big Bang', desc: 'Campaign launches that utilize shard-physics to reveal your brand to millions instantly.', icon: Rocket },
          { title: 'Momentum Reveal', desc: 'Section transitions that use shattering geometric masks to maintain high engagement.', icon: Sparkles },
          { title: 'Particle Tracker', desc: 'Real-time social proof visualization using thousands of interactive 2D nodes.', icon: Users },
          { title: 'Shockwave ROI', desc: 'Predictive analytics that map the radial impact of every creative decision.', icon: Target },
          { title: 'Hype Multiplier', desc: 'AI-driven sentiment amplification that identifies and ignites viral clusters.', icon: Zap },
          { title: 'Velocity Control', desc: 'A modular dashboard for throttling campaign energy based on live response data.', icon: Activity }
        ].map((feature, i) => (
          <FragmentCard key={i}>
            <div className="w-16 h-16 bg-[#F9004D]/10 flex items-center justify-center mb-8 rotate-12 group-hover:rotate-0 transition-transform duration-500">
              <feature.icon className="text-[#F9004D]" size={32} />
            </div>
            <h3 className={`${syne.className} text-2xl font-extrabold text-white mb-4 uppercase tracking-tighter italic`}>{feature.title}</h3>
            <p className="text-white/40 text-sm leading-relaxed font-medium">{feature.desc}</p>
          </FragmentCard>
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
          <div className="aspect-video bg-black border border-white/10 rounded-sm overflow-hidden relative p-1">
            <div className="absolute inset-0 bg-[#F9004D]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="w-full h-full border border-dashed border-[#F9004D]/30 flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="relative"
              >
                <Target className="text-[#F9004D]/20" size={200} />
                <motion.div 
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 bg-[#F9004D] rounded-full blur-3xl opacity-20"
                />
              </motion.div>
            </div>
          </div>
          <div className="absolute -top-10 -left-10 bg-[#F9004D] text-white p-8 rounded-sm shadow-2xl rotate-6">
            <div className={`${syne.className} text-3xl font-extrabold italic`}>99.9% REACH</div>
          </div>
        </div>
        <div>
          <div className={`mb-10 ${syne.className} text-[#F9004D] font-black tracking-[0.5em] uppercase text-[10px]`}>[ VIRAL_ARCHITECTURE ]</div>
          <h2 className={`${syne.className} text-6xl font-extrabold text-white mb-10 leading-[0.9] uppercase italic`}>BEYOND THE <br/> <span className="text-[#F9004D]">SHOCKWAVE.</span></h2>
          <div className={`space-y-8 text-white/40 text-xl leading-relaxed font-medium ${inter.className}`}>
            <p>Traditional campaigns are linear. AdBurst is explosive. We don't just reach audiences; we saturate the digital environment with your brand's kinetic energy.</p>
            <p>Our implementation of fragment-physics and big-bang reveals ensures that every user interaction is high-impact and unforgettable.</p>
          </div>
          <BurstButton className="mt-12">CONNECT_MAIN_CORE</BurstButton>
        </div>
      </div>
    </div>
  </section>
)

const Pricing = () => (
  <section className="py-32 px-8">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-24">
        <h2 className={`${syne.className} text-6xl font-extrabold uppercase italic text-white`}>FISSION <br/><span className="text-[#F9004D]">PLANS</span></h2>
        <p className="text-white/20 mt-6 tracking-[0.3em] text-[10px] uppercase font-black">Choose your level of explosive growth.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-12">
        {[
          { name: 'Spark', price: '$5K', features: ['Single Campaign', 'Standard Core', 'Viral Analytics', 'Basic Fragment Kit'] },
          { name: 'Fission', price: '$15K', features: ['Unlimited Campaigns', 'Advanced Big Bang', 'Full Fragment Kit', 'Predictive ROI', 'Priority Node'], highlight: true },
          { name: 'Supernova', price: '$50K', features: ['White-label Platform', 'Custom Physics Core', 'Dedicated Edge Node', '24/7 War Room', 'Global Saturation'] }
        ].map((tier, i) => (
          <FragmentCard key={i} className={tier.highlight ? 'border-[#F9004D]/50 -translate-y-4 shadow-[0_30px_100px_rgba(249,0,77,0.15)]' : ''}>
            {tier.highlight && (
              <div className="absolute top-0 right-10 bg-[#F9004D] text-white px-6 py-2 font-black text-[10px] tracking-widest uppercase italic">
                MOST_EXPLOSIVE
              </div>
            )}
            <div className={`${syne.className} text-3xl font-extrabold text-white mb-4 uppercase italic`}>{tier.name}</div>
            <div className="flex items-baseline gap-2 mb-12">
              <span className={`${syne.className} text-6xl font-extrabold text-white`}>{tier.price}</span>
              <span className="text-white/20 text-[10px] font-black tracking-widest uppercase">/ LAUNCH</span>
            </div>
            <ul className="space-y-6 mb-16">
              {tier.features.map(f => (
                <li key={f} className="flex items-center gap-4 text-xs font-bold text-white/40 uppercase tracking-widest">
                  <Zap size={14} className="text-[#F9004D] fill-[#F9004D]" />
                  {f}
                </li>
              ))}
            </ul>
            <BurstButton className="w-full" variant={tier.highlight ? 'primary' : 'secondary'}>INITIALIZE_PLAN</BurstButton>
          </FragmentCard>
        ))}
      </div>
    </div>
  </section>
)

const Testimonials = () => (
  <section className="py-32 px-8 bg-[#050505] border-y border-white/5">
    <div className="max-w-7xl mx-auto">
      <h2 className={`${syne.className} text-5xl font-extrabold uppercase mb-24 text-center italic text-white`}>SURVIVORS_OF_THE_<span className="text-[#F9004D]">SHOCKWAVE</span></h2>
      <div className="grid md:grid-cols-3 gap-16">
        {[
          { name: 'Dr. Sarah Jen', role: 'Growth Lead', company: 'NeuralNote', quote: 'AdBurst didn\'t just increase our traffic; they created a digital big bang. The initial reach was staggering.' },
          { name: 'Marcus Thorne', role: 'Founder', company: 'Velocity', quote: 'The energy of the Fragment Kit matches the intensity of our brand perfectly. High-fidelity motion at its best.' },
          { name: 'Alex Rivera', role: 'CEO', company: 'Prism Studio', quote: 'They understand digital momentum like no one else. The Campaign Core visualizer is a masterclass in engagement.' }
        ].map((t, i) => (
          <div key={i} className="flex flex-col gap-10 p-10 bg-[#111111] border border-white/5 relative group">
            <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-[#F9004D] opacity-30 group-hover:opacity-100 transition-opacity" />
            <div className="flex gap-1 mb-2">
              {[...Array(5)].map((_, j) => (
                <Zap key={j} size={16} className="text-[#F9004D] fill-[#F9004D]" />
              ))}
            </div>
            <p className={`${syne.className} text-2xl font-bold text-white leading-tight italic`}>"{t.quote}"</p>
            <div>
              <div className={`${syne.className} text-lg font-extrabold text-white uppercase italic`}>{t.name}</div>
              <div className="text-[10px] font-black text-[#F9004D] uppercase tracking-[0.3em] mt-2">{t.role} // {t.company}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
)

const Footer = () => (
  <footer className="py-24 px-8 bg-black">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-16 mb-24">
        <div className="col-span-2">
          <div className={`${syne.className} text-3xl font-extrabold uppercase text-white mb-8 italic`}>AD<span className="text-[#F9004D]">BURST</span></div>
          <p className="text-white/30 text-xs leading-loose font-black uppercase tracking-[0.2em] max-w-xs">Generating the viral shockwaves of the digital era. Explosive, high-fidelity, and unapologetically bold.</p>
        </div>
        {[
          { title: 'Campaigns', links: ['The Core', 'Fragments', 'Reach', 'Foundry'] },
          { title: 'Analytics', links: ['Velocity', 'ROI Radar', 'Impact', 'Predict'] },
          { title: 'Network', links: ['Discord', 'Twitter', 'Mainframe', 'Terminal'] }
        ].map(group => (
          <div key={group.title}>
            <div className="text-[10px] font-black text-white uppercase tracking-[0.4em] mb-8">{group.title}</div>
            <ul className="space-y-6">
              {group.links.map(link => (
                <li key={link}><a href="#" className="text-white/30 text-[10px] font-black tracking-[0.3em] uppercase hover:text-[#F9004D] transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-white/20 text-[10px] font-black tracking-[0.5em] uppercase">© 2026 ADBURST IMPACT LABS. ALL EXPLOSIONS RESERVED.</div>
        <div className="flex gap-8">
          <Share2 className="text-[#F9004D] hover:scale-125 transition-transform cursor-pointer" size={18} />
          <Trophy className="text-[#F9004D] hover:scale-125 transition-transform cursor-pointer" size={18} />
        </div>
      </div>
    </div>
  </footer>
)

export default function AdBurst() {
  return (
    <div className={`min-h-screen bg-black text-white overflow-x-hidden ${inter.className}`}>
      <Navbar />
      <Hero />
      <StatsBar />
      <CampaignCore />
      <Features />
      <ProductDetail />
      <Pricing />
      <Testimonials />
      <Footer />
      
      {/* --- Global Effects --- */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.08] contrast-150 mix-blend-screen">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <filter id="burst-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100" height="100" filter="url(#burst-noise)" />
        </svg>
      </div>
    </div>
  )
}
