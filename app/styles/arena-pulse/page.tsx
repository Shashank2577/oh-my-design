'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { 
  Zap, 
  Activity, 
  TrendingUp, 
  Trophy, 
  Users, 
  ShieldCheck, 
  ChevronDown, 
  ArrowRight,
  Heart,
  Flame,
  Target,
  Globe,
  Timer,
  BarChart3
} from 'lucide-react'
import { Inter, Montserrat } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '900'] })

// --- Design Tokens ---
const tokens = {
  colors: {
    background: "#0A0A0A",
    surface: "#121212",
    accent1: "#FF3E00", // Pulse Orange
    accent2: "#00F3FF", // High Oxygen Cyan
    border: "rgba(255, 62, 0, 0.2)",
    textHigh: "#FFFFFF",
    textLow: "#757575"
  },
  physics: {
    liquid: { type: "spring" as any, stiffness: 100, damping: 10, mass: 1.5 }
  }
}

// --- Components ---

const PulseButton = ({ children, variant = 'primary', className = '' }: any) => (
  <motion.button
    whileHover={{ scale: 1.05, boxShadow: `0 0 30px ${variant === 'primary' ? 'rgba(255, 62, 0, 0.4)' : 'rgba(0, 243, 255, 0.2)'}` }}
    whileTap={{ scale: 0.95 }}
    className={`px-10 py-5 rounded-full ${montserrat.className} font-black text-lg transition-all relative group overflow-hidden ${
      variant === 'primary' 
        ? `bg-[#FF3E00] text-white` 
        : `bg-transparent text-[#00F3FF] border-2 border-[#00F3FF]/30 hover:border-[#00F3FF]`
    } ${className}`}
  >
    <span className="relative z-10 flex items-center justify-center gap-3 italic uppercase tracking-tighter">
      {children}
      <Zap size={20} className="fill-current" />
    </span>
    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
  </motion.button>
)

const AthleticCard = ({ children, className = '' }: any) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    whileHover={{ scale: 1.02 }}
    className={`bg-[#121212] border border-white/5 p-10 rounded-[32px] relative group overflow-hidden ${className}`}
  >
    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-20 transition-opacity">
      <Activity size={80} strokeWidth={1} />
    </div>
    <div className="absolute inset-0 bg-gradient-to-br from-[#FF3E00]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    {children}
  </motion.div>
)

// --- Sections ---

const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 bg-[#0A0A0A]/80 backdrop-blur-xl px-8 py-6 border-b border-white/5">
    <div className="max-w-7xl mx-auto flex items-center justify-between">
      <div className={`flex items-center gap-2 ${montserrat.className} text-2xl font-black tracking-tighter text-white italic`}>
        <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Infinity }}>
          <Activity className="text-[#FF3E00]" size={28} />
        </motion.div>
        ARENA<span className="text-[#FF3E00]">PULSE</span>
      </div>
      <div className="hidden md:flex items-center gap-10 text-[#757575] font-bold text-[10px] tracking-[0.4em] uppercase">
        {['The Engine', 'Athletes', 'Arena', 'Connect'].map(item => (
          <a key={item} href="#" className="hover:text-white transition-colors">{item}</a>
        ))}
      </div>
      <PulseButton className="hidden md:block py-3 px-8 text-xs font-black">ENTER_ARENA</PulseButton>
    </div>
  </nav>
)

const Hero = () => {
  return (
    <section className="pt-40 pb-20 px-8 relative overflow-hidden min-h-screen flex items-center bg-[#0A0A0A]">
      <div className="absolute inset-0 z-0">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[800px] bg-[#FF3E00]/10 rounded-full blur-[150px]" 
        />
      </div>
      
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={tokens.physics.liquid}
        >
          <div className="flex items-center gap-3 mb-10">
            <div className="w-2 h-2 bg-[#FF3E00] rounded-full animate-ping" />
            <span className={`text-[10px] font-black text-[#FF3E00] tracking-[0.5em] uppercase ${inter.className}`}>Biometric_Sync_V3.0</span>
          </div>
          <h1 className={`${montserrat.className} text-7xl md:text-[9rem] font-black text-white leading-[0.8] mb-12 uppercase italic tracking-tighter`}>
            FEEL THE <br/> <span className="text-[#FF3E00] drop-shadow-[0_0_40px_rgba(255,62,0,0.5)]">POWER.</span>
          </h1>
          <p className={`text-[#757575] text-2xl max-w-xl mb-16 leading-relaxed font-medium ${inter.className}`}>
            Arena Pulse is the world's first liquid-power sports engine. Track every heartbeat, every flex, and every victory in high-fidelity motion.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-10">
            <PulseButton>BEGIN_SYNC</PulseButton>
            <div className={`flex items-center gap-4 text-white font-black tracking-widest text-xs cursor-pointer group`}>
              THE_PROTOCOL <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform text-[#FF3E00]" />
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...tokens.physics.liquid, delay: 0.2 }}
          className="relative"
        >
          <div className="bg-[#121212] border border-white/5 p-10 rounded-[60px] shadow-[0_50px_100px_rgba(255,62,0,0.15)] relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#FF3E00]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center justify-between mb-16">
              <div className={`${montserrat.className} text-2xl font-black text-white italic`}>Pulse HUD V.01</div>
              <div className="flex gap-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="w-2 h-2 rounded-full bg-[#FF3E00] animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                ))}
              </div>
            </div>
            <div className="space-y-10 relative z-10">
              {[
                { label: 'Muscle Load', val: '92.4%', color: '#FF3E00' },
                { label: 'Oxygen Saturation', val: '98%', color: '#00F3FF' },
                { label: 'Victory Probability', val: '84%', color: '#10B981' }
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between mb-4">
                    <span className="text-xs font-black text-[#757575] uppercase tracking-[0.2em]">{item.label}</span>
                    <span className="text-sm font-black text-white">{item.val}</span>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: item.val }}
                      transition={{ duration: 2, delay: 0.5 + i * 0.2 }}
                      className="h-full"
                      style={{ backgroundColor: item.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="absolute -top-10 -right-10 bg-[#FF3E00] text-white p-8 rounded-[30px] shadow-2xl rotate-12"
          >
            <Timer size={32} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

const StatsBar = () => (
  <section className="py-24 border-y border-white/5 bg-[#050505]">
    <div className="max-w-7xl mx-auto px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-16 text-center">
        {[
          { label: 'Athletes Synced', value: '450K+', icon: Users },
          { label: 'Avg HR Sync', value: '72 BPM', icon: Heart },
          { label: 'Victory ROI', value: '12.4X', icon: Trophy },
          { label: 'Global Data', value: '4.8TB', icon: Globe }
        ].map((stat, i) => (
          <motion.div key={i} whileHover={{ y: -5 }}>
            <div className={`${montserrat.className} text-6xl font-black text-white mb-2 italic`}>{stat.value}</div>
            <div className="text-[#757575] text-[10px] font-black uppercase tracking-[0.4em]">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)

const Features = () => (
  <section className="py-32 px-8 bg-[#0A0A0A]">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-24">
        <h2 className={`${montserrat.className} text-5xl md:text-6xl font-black text-white mb-6 uppercase italic tracking-tighter`}>LIQUID POWER TECH</h2>
        <p className={`text-[#757575] max-w-2xl mx-auto text-lg leading-relaxed ${inter.className}`}>We use biometric physics to translate human potential into digital dominance.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {[
          { title: 'Muscle-Flex HUD', desc: 'Interfaces that expand and contract based on real-time biometric load and muscle-flex signals.', icon: Zap },
          { title: 'Oxygen Sync', desc: 'Glow-based color systems that respond to the breathing-rhythm and oxygen levels of the athlete.', icon: Activity },
          { title: 'Victory Reveal', desc: 'Section transitions that use high-impact strobe reveals and chromatic aberration for big wins.', icon: Trophy },
          { title: 'Pulse Radar', desc: 'Circular sweep visualization highlighting high-performance blips across the global athlete map.', icon: Target },
          { title: 'Biometric Vault', desc: 'Encrypted storage for proprietary athlete scouting data and high-stakes performance logs.', icon: ShieldCheck },
          { title: 'Load Analytics', desc: 'Predictive ROI analytics that map the long-term impact of physical training cycles.', icon: BarChart3 }
        ].map((feature, i) => (
          <AthleticCard key={i}>
            <div className="w-16 h-16 bg-[#FF3E00]/10 rounded-2xl flex items-center justify-center mb-10">
              <feature.icon className="text-[#FF3E00]" size={32} />
            </div>
            <h3 className={`${montserrat.className} text-2xl font-black text-white mb-4 uppercase italic tracking-tighter`}>{feature.title}</h3>
            <p className="text-[#757575] text-sm leading-relaxed">{feature.desc}</p>
          </AthleticCard>
        ))}
      </div>
    </div>
  </section>
)

const ProductDetail = () => (
  <section className="py-32 px-8 bg-[#0D0D0D] relative overflow-hidden">
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-24 items-center">
        <div className="relative p-10 border-4 border-dashed border-[#FF3E00]/20 rounded-[80px]">
          <div className="aspect-square bg-[#121212] rounded-[60px] shadow-2xl flex items-center justify-center overflow-hidden relative group">
            <motion.div 
              animate={{ scale: [1, 1.1, 1], rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#FF3E0011_0%,_transparent_70%)]" 
            />
            <Activity className="text-[#FF3E00]/20 animate-pulse" size={200} />
            <div className="absolute bottom-10 left-10 right-10 bg-black/90 backdrop-blur-md p-10 rounded-[40px] border border-white/5 shadow-xl">
              <div className={`${montserrat.className} text-2xl font-black text-white mb-2 italic`}>The Performance Lab</div>
              <p className="text-[#757575] text-sm font-medium">Testing biometric frequency across 120+ professional athletes.</p>
            </div>
          </div>
          <div className="absolute -top-10 -left-10 bg-[#00F3FF] text-black p-8 rounded-full shadow-2xl rotate-12">
            <Flame size={32} />
          </div>
        </div>
        <div>
          <div className={`mb-10 ${inter.className} text-[#00F3FF] font-black tracking-[0.5em] uppercase text-[10px]`}>[ LIQUID_POWER_ENGINEERING ]</div>
          <h2 className={`${montserrat.className} text-6xl font-black text-white mb-10 leading-[0.9] uppercase italic tracking-tighter`}>A PULSE THAT <br/> <span className="text-[#FF3E00]">DOMINATES.</span></h2>
          <div className={`space-y-8 text-[#757575] text-xl leading-relaxed ${inter.className}`}>
            <p>Traditional sports tech is static. Arena Pulse is liquid. We treat every data point as a living signal, flowing at the speed of human potential to provide you with an instant map of victory.</p>
            <p>Our implementation of biometric physics and rhythmic transitions ensures that your brand isn't just seen—it's felt in the athlete's DNA.</p>
          </div>
          <PulseButton className="mt-12">CONNECT_MAIN_ARENA</PulseButton>
        </div>
      </div>
    </div>
  </section>
)

const Footer = () => (
  <footer className="py-24 px-8 bg-black border-t border-white/5">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-16 mb-24">
        <div className="col-span-2">
          <div className={`flex items-center gap-2 ${montserrat.className} text-2xl font-black tracking-tight text-white italic mb-8`}>
            <Activity className="text-[#FF3E00]" size={28} />
            ARENA<span className="text-[#FF3E00]">PULSE</span>
          </div>
          <p className="text-[#757575] text-sm leading-relaxed max-w-xs font-medium uppercase tracking-widest leading-loose">The global standard for liquid-power sports telemetry and biometric ROI. Mission-critical and high-fidelity since 2026.</p>
        </div>
        {[
          { title: 'Engine', links: ['Athletes', 'Telemetry', 'Success', 'Pricing'] },
          { title: 'Foundry', links: ['The Lab', 'Biometrics', 'Careers', 'Brand'] },
          { title: 'Connect', links: ['Instagram', 'LinkedIn', 'Discord', 'Mainframe'] }
        ].map(group => (
          <div key={group.title}>
            <div className="text-[10px] font-black text-white uppercase tracking-[0.4em] mb-10">{group.title}</div>
            <ul className="space-y-6">
              {group.links.map(link => (
                <li key={link}><a href="#" className="text-sm font-bold text-[#757575] hover:text-[#FF3E00] transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="text-[#757575] text-[10px] font-black uppercase tracking-[0.6em]">© 2026 ARENAPULSE ATHLETIC SYSTEMS. PULSE_ENCRYPTED.</div>
        <div className="flex gap-10">
          <Activity className="text-[#757575] hover:text-[#FF3E00] cursor-pointer transition-colors" size={20} />
          <Flame className="text-[#757575] hover:text-[#FF3E00] cursor-pointer transition-colors" size={20} />
        </div>
      </div>
    </div>
  </footer>
)

export default function ArenaPulse() {
  return (
    <div className={`min-h-screen bg-[#0A0A0A] text-white overflow-x-hidden ${inter.className}`}>
      <Navbar />
      <Hero />
      <StatsBar />
      <Features />
      <ProductDetail />
      <Footer />
      
      {/* --- Global Effects --- */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.05] contrast-150 mix-blend-overlay">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <filter id="arena-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100" height="100" filter="url(#arena-noise)" />
        </svg>
      </div>
      
      </div>
  )
}
