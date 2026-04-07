'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { 
  Zap, 
  TrendingUp, 
  Target, 
  Users, 
  BarChart, 
  ShieldCheck, 
  ChevronDown, 
  ArrowRight,
  MousePointer2,
  Sparkles,
  Rocket,
  CheckCircle2,
  DollarSign
} from 'lucide-react'
import { Lexend, Inter } from 'next/font/google'

const lexend = Lexend({ subsets: ['latin'] })
const inter = Inter({ subsets: ['latin'] })

// --- Design Tokens ---
const tokens = {
  colors: {
    background: "#FFFFFF",
    surface: "#F3F4F6",
    accent1: "#6366F1", // Magnet Indigo
    accent2: "#F43F5E", // Conversion Rose
    border: "#E5E7EB",
    textHigh: "#111827",
    textLow: "#6B7280"
  },
  physics: {
    magnet: { type: "spring" as any, stiffness: 700, damping: 10 }
  }
}

// --- Components ---

const MagneticButton = ({ children, variant = 'primary', className = '' }: any) => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return
    const { clientX, clientY } = e
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect()
    const centerX = left + width / 2
    const centerY = top + height / 2
    const distanceX = clientX - centerX
    const distanceY = clientY - centerY
    
    if (Math.abs(distanceX) < 150 && Math.abs(distanceY) < 150) {
      setPosition({ x: distanceX * 0.2, y: distanceY * 0.2 })
    } else {
      setPosition({ x: 0, y: 0 })
    }
  }

  const resetPosition = () => setPosition({ x: 0, y: 0 })

  return (
    <motion.button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetPosition}
      animate={{ x: position.x, y: position.y }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`px-10 py-5 rounded-xl ${lexend.className} font-extrabold text-lg transition-all relative group shadow-2xl ${
        variant === 'primary' 
          ? `bg-[#6366F1] text-white` 
          : `bg-white text-[#111827] border-2 border-[#E5E7EB]`
      } ${className}`}
    >
      <span className="relative z-10 flex items-center justify-center gap-3">
        {children}
        <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
      </span>
      <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
    </motion.button>
  )
}

const FeatureCard = ({ children, icon: Icon, title = '', desc = '' }: any) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const [rotate, setRotate] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    const { left, top, width, height } = cardRef.current.getBoundingClientRect()
    const centerX = left + width / 2
    const centerY = top + height / 2
    const x = (e.clientY - centerY) / 10
    const y = (centerX - e.clientX) / 10
    setRotate({ x, y })
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setRotate({ x: 0, y: 0 })}
      animate={{ rotateX: rotate.x, rotateY: rotate.y }}
      className="bg-white border-2 border-[#E5E7EB] p-10 rounded-[32px] shadow-sm hover:shadow-2xl hover:border-[#6366F1]/20 transition-all duration-300"
    >
      <div className="w-16 h-16 bg-[#6366F1]/10 rounded-2xl flex items-center justify-center mb-8">
        <Icon className="text-[#6366F1]" size={32} />
      </div>
      <h3 className={`${lexend.className} text-2xl font-bold text-[#111827] mb-4`}>{title}</h3>
      <p className="text-[#6B7280] leading-relaxed mb-6">{desc}</p>
      {children}
    </motion.div>
  )
}

// --- Sections ---

const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md px-8 py-6 border-b border-[#E5E7EB]">
    <div className="max-w-7xl mx-auto flex items-center justify-between">
      <div className={`flex items-center gap-2 ${lexend.className} text-2xl font-black tracking-tight text-[#111827]`}>
        <Target className="text-[#6366F1]" size={28} />
        MARKET<span className="text-[#6366F1]">MAGNET</span>
      </div>
      <div className="hidden md:flex items-center gap-10 text-[10px] font-black tracking-[0.3em] uppercase text-[#111827]">
        {['Strategy', 'Solutions', 'Success', 'About'].map(item => (
          <a key={item} href="#" className="hover:text-[#6366F1] transition-colors">{item}</a>
        ))}
      </div>
      <MagneticButton className="hidden md:block py-3 px-8 text-xs font-black">GET_CONVERTING</MagneticButton>
    </div>
  </nav>
)

const Hero = () => {
  return (
    <section className="pt-40 pb-20 px-8 relative overflow-hidden min-h-screen flex items-center">
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_#6366F111_0%,_transparent_70%)]" />
      </div>
      
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={tokens.physics.magnet}
        >
          <div className="flex items-center gap-2 mb-8 px-4 py-2 bg-[#F43F5E]/10 rounded-full w-fit">
            <Rocket className="text-[#F43F5E]" size={16} />
            <span className={`text-[10px] font-black text-[#F43F5E] tracking-widest uppercase ${inter.className}`}>Hyper-Growth Initialized</span>
          </div>
          <h1 className={`${lexend.className} text-7xl md:text-8xl font-black text-[#111827] leading-[1] mb-10`}>
            PULL YOUR <br/> <span className="text-[#6366F1]">AUDIENCE.</span>
          </h1>
          <p className={`text-[#6B7280] text-xl max-w-xl mb-12 leading-relaxed ${inter.className}`}>
            MarketMagnet uses behavioral physics to attract, engage, and convert. The ultimate persuasive engine for results-driven teams.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-8">
            <MagneticButton>START_ATTRACTING</MagneticButton>
            <div className="flex items-center gap-4 text-[#111827] font-bold">
              <div className="flex -space-x-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-[#E5E7EB]" />
                ))}
              </div>
              <span className="text-sm">+12k Users Joined</span>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...tokens.physics.magnet, delay: 0.2 }}
          className="relative"
        >
          <div className="bg-white p-8 rounded-[40px] shadow-[0_50px_100px_rgba(99,102,241,0.15)] border border-[#E5E7EB]">
            <div className="flex items-center justify-between mb-12">
              <div className={`${lexend.className} text-xl font-black text-[#111827]`}>Growth Metric HUD</div>
              <BarChart className="text-[#6366F1]" />
            </div>
            <div className="space-y-10">
              {[
                { label: 'Conversion Velocity', value: '92.4%', color: '#6366F1' },
                { label: 'Magnetic Reach', value: '4.8M', color: '#F43F5E' },
                { label: 'ROI Multiplier', value: '12.4X', color: '#10B981' }
              ].map((stat, i) => (
                <div key={i}>
                  <div className="flex justify-between mb-3">
                    <span className="text-xs font-black text-[#6B7280] uppercase tracking-widest">{stat.label}</span>
                    <span className="text-sm font-black text-[#111827]">{stat.value}</span>
                  </div>
                  <div className="h-2 w-full bg-[#F3F4F6] rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '85%' }}
                      transition={{ duration: 2, delay: 0.5 + i * 0.2 }}
                      className="h-full"
                      style={{ backgroundColor: stat.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="absolute -top-10 -right-10 bg-[#F43F5E] text-white p-6 rounded-3xl shadow-2xl rotate-12"
          >
            <DollarSign size={32} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

const StatsBar = () => (
  <section className="py-20 bg-[#111827] text-white overflow-hidden relative">
    <div className="absolute inset-0 opacity-10">
      <div className="w-full h-full bg-[radial-gradient(circle_at_20%_50%,_#6366F1_0%,_transparent_50%)]" />
    </div>
    <div className="max-w-7xl mx-auto px-8 relative z-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
        {[
          { label: 'Conversions', value: '1.2M+', icon: CheckCircle2 },
          { label: 'Client Growth', value: '340%', icon: TrendingUp },
          { label: 'Campaigns Live', value: '850', icon: Zap },
          { label: 'Security Score', value: '99.9', icon: ShieldCheck }
        ].map((stat, i) => (
          <motion.div key={i} whileHover={{ scale: 1.1 }}>
            <div className={`${lexend.className} text-5xl font-black mb-2`}>{stat.value}</div>
            <div className="text-[#6B7280] text-[10px] font-black uppercase tracking-[0.4em]">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)

const ROICalculator = () => {
  const [spend, setSpend] = useState(5000)
  return (
    <section className="py-32 px-8 bg-[#F3F4F6]">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white p-16 rounded-[50px] shadow-2xl border border-[#E5E7EB] text-center">
          <h2 className={`${lexend.className} text-4xl font-black text-[#111827] mb-12`}>MAGNETIC ROI CALCULATOR</h2>
          <div className="mb-16">
            <div className="flex justify-between mb-6">
              <span className="text-sm font-black text-[#6B7280] uppercase">Monthly Spend</span>
              <span className="text-2xl font-black text-[#6366F1]">$ {spend.toLocaleString()}</span>
            </div>
            <input 
              type="range" 
              min="1000" 
              max="50000" 
              step="1000"
              value={spend}
              onChange={(e) => setSpend(Number(e.target.value))}
              className="w-full h-3 bg-[#E5E7EB] rounded-full appearance-none cursor-pointer accent-[#6366F1]"
            />
          </div>
          <div className="grid grid-cols-2 gap-10">
            <div className="p-10 bg-[#F3F4F6] rounded-3xl">
              <div className="text-[10px] font-black text-[#6B7280] uppercase tracking-widest mb-4">Projected Profit</div>
              <motion.div 
                key={spend}
                initial={{ scale: 0.8, color: '#111827' }}
                animate={{ scale: 1.2, color: '#10B981' }}
                className={`${lexend.className} text-5xl font-black`}
              >
                $ {(spend * 3.4).toLocaleString()}
              </motion.div>
            </div>
            <div className="p-10 bg-[#F3F4F6] rounded-3xl">
              <div className="text-[10px] font-black text-[#6B7280] uppercase tracking-widest mb-4">Lead Velocity</div>
              <motion.div 
                key={spend}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1.2 }}
                className={`${lexend.className} text-5xl font-black text-[#6366F1]`}
              >
                +{(spend / 100).toFixed(0)}%
              </motion.div>
            </div>
          </div>
          <MagneticButton className="mt-16 w-full">INITIALIZE_CAMPAIGN</MagneticButton>
        </div>
      </div>
    </section>
  )
}

const Features = () => (
  <section className="py-32 px-8">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-24">
        <h2 className={`${lexend.className} text-5xl md:text-6xl font-black text-[#111827] mb-6`}>THE MAGNET KIT</h2>
        <p className="text-[#6B7280] max-w-2xl mx-auto text-lg leading-relaxed">Persuasive technology built to attract high-intent users and never let go.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-10">
        {[
          { title: 'Magnetic CTA', desc: 'Custom physics-based buttons that attract the user\'s cursor when within proximity.', icon: MousePointer2 },
          { title: 'Persuasion Flow', desc: 'Intelligent section sequencing that mirrors psychological commitment patterns.', icon: Sparkles },
          { title: 'Success Tickers', desc: 'Real-time social proof banners that flicker with high-frequency conversion updates.', icon: Zap },
          { title: 'Velocity Map', desc: 'Visualization of user movement patterns through your conversion funnel.', icon: TrendingUp },
          { title: 'Conversion Vault', desc: 'Encrypted storage for proprietary campaign strategy and customer data.', icon: ShieldCheck },
          { title: 'Pulse Alerts', desc: 'Instant notifications when a high-value prospect enters your digital orbit.', icon: BarChart }
        ].map((feature, i) => (
          <FeatureCard key={i} icon={feature.icon} title={feature.title} desc={feature.desc} />
        ))}
      </div>
    </div>
  </section>
)

const Footer = () => (
  <footer className="py-24 px-8 bg-white border-t border-[#E5E7EB]">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-16 mb-24">
        <div className="col-span-2">
          <div className={`flex items-center gap-2 ${lexend.className} text-2xl font-black text-[#111827] mb-8`}>
            <Target className="text-[#6366F1]" size={28} />
            MARKET<span className="text-[#6366F1]">MAGNET</span>
          </div>
          <p className="text-[#6B7280] text-sm leading-relaxed max-w-xs">Building the future of persuasive marketing through behavioral physics and high-fidelity motion.</p>
        </div>
        {[
          { title: 'Engine', links: ['Magnetic Kit', 'Analytics', 'Conversion', 'Pricing'] },
          { title: 'Success', links: ['Case Studies', 'ROI Map', 'Testimonials', 'Blog'] },
          { title: 'Connect', links: ['Twitter', 'LinkedIn', 'Support', 'Mainframe'] }
        ].map(group => (
          <div key={group.title}>
            <div className="text-[10px] font-black text-[#111827] uppercase tracking-[0.4em] mb-10">{group.title}</div>
            <ul className="space-y-6">
              {group.links.map(link => (
                <li key={link}><a href="#" className="text-sm font-bold text-[#6B7280] hover:text-[#6366F1] transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="pt-12 border-t border-[#E5E7EB] flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="text-[#6B7280] text-[10px] font-black uppercase tracking-[0.6em]">© 2026 MARKETMAGNET GROWTH CORP. ALL RIGHTS RESERVED.</div>
        <div className="flex gap-10">
          <TrendingUp className="text-[#6B7280] hover:text-[#6366F1] cursor-pointer transition-colors" size={20} />
          <Target className="text-[#6B7280] hover:text-[#6366F1] cursor-pointer transition-colors" size={20} />
        </div>
      </div>
    </div>
  </footer>
)

export default function MarketMagnet() {
  return (
    <div className={`min-h-screen bg-white text-[#111827] overflow-x-hidden ${inter.className}`}>
      <Navbar />
      <Hero />
      <StatsBar />
      <Features />
      <ROICalculator />
      <Footer />
      
      {/* --- Global Effects --- */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03] contrast-150 mix-blend-multiply">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <filter id="magnet-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100" height="100" filter="url(#magnet-noise)" />
        </svg>
      </div>
      
      </div>
  )
}
