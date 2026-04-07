'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { 
  Heart, 
  Sparkles, 
  Users, 
  Smile, 
  MessageCircle, 
  ShieldCheck, 
  ChevronDown, 
  ArrowRight,
  HandHeart,
  TrendingUp,
  Globe,
  Star,
  Zap,
  Layout,
  Palette
} from 'lucide-react'
import { DM_Sans, Inter } from 'next/font/google'

const dmSans = DM_Sans({ subsets: ['latin'] })
const inter = Inter({ subsets: ['latin'] })

// --- Design Tokens ---
const tokens = {
  colors: {
    background: "#FDFCF0", // Soft Parchment
    surface: "#FFFFFF",
    accent1: "#F43F5E", // Empathy Rose
    accent2: "#6366F1", // Connection Indigo
    border: "#F1F5F9",
    textHigh: "#0F172A",
    textLow: "#64748B"
  },
  physics: {
    fluid: { type: "spring" as any, stiffness: 150, damping: 25, mass: 1.2 }
  }
}

// --- Components ---

const BondButton = ({ children, variant = 'primary', className = '' }: any) => (
  <motion.button
    whileHover={{ scale: 1.05, y: -2 }}
    whileTap={{ scale: 0.95 }}
    className={`px-10 py-5 rounded-2xl ${dmSans.className} font-bold text-lg transition-all relative group shadow-xl ${
      variant === 'primary' 
        ? `bg-[#F43F5E] text-white shadow-[0_20px_40px_rgba(244,63,94,0.2)]` 
        : `bg-white text-[#0F172A] border-2 border-[#F1F5F9]`
    } ${className}`}
  >
    <span className="relative z-10 flex items-center justify-center gap-3">
      {children}
      <Heart size={20} className={variant === 'primary' ? 'fill-white' : 'text-[#F43F5E]'} />
    </span>
    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
  </motion.button>
)

const EmpathyCard = ({ children, className = '' }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ scale: 1.02 }}
    className={`bg-white p-10 rounded-[40px] shadow-[0_40px_80px_rgba(0,0,0,0.03)] border border-[#F1F5F9] relative group ${className}`}
  >
    <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity">
      <Sparkles className="text-[#F43F5E]" size={24} />
    </div>
    {children}
  </motion.div>
)

// --- Sections ---

const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 bg-[#FDFCF0]/80 backdrop-blur-md px-8 py-6 border-b border-[#F1F5F9]">
    <div className="max-w-7xl mx-auto flex items-center justify-between">
      <div className={`flex items-center gap-2 ${dmSans.className} text-2xl font-black tracking-tight text-[#0F172A]`}>
        <HandHeart className="text-[#F43F5E]" size={28} />
        BRAND<span className="text-[#F43F5E]">BOND</span>
      </div>
      <div className="hidden md:flex items-center gap-10 text-[10px] font-black tracking-[0.3em] uppercase text-[#64748B]">
        {['Resonance', 'Impact', 'Stories', 'Vision'].map(item => (
          <a key={item} href="#" className="hover:text-[#F43F5E] transition-colors">{item}</a>
        ))}
      </div>
      <BondButton className="hidden md:block py-3 px-8 text-xs font-black">START_BONDING</BondButton>
    </div>
  </nav>
)

const Hero = () => {
  return (
    <section className="pt-40 pb-20 px-8 relative overflow-hidden min-h-screen flex items-center bg-[#FDFCF0]">
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#F43F5E]/10 rounded-full blur-[120px] -mr-96 -mt-96" 
        />
        <motion.div 
          animate={{ scale: [1.2, 1, 1.2], rotate: [90, 0, 90] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-[#6366F1]/10 rounded-full blur-[120px] -ml-96 -mb-96" 
        />
      </div>
      
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={tokens.physics.fluid}
        >
          <div className="flex items-center gap-2 mb-8 px-4 py-2 bg-white rounded-full w-fit shadow-sm border border-[#F1F5F9]">
            <Smile className="text-[#F43F5E]" size={16} />
            <span className={`text-[10px] font-black text-[#64748B] tracking-widest uppercase ${inter.className}`}>Emotional Intelligence V3.0</span>
          </div>
          <h1 className={`${dmSans.className} text-7xl md:text-8xl font-black text-[#0F172A] leading-[1.1] mb-10`}>
            BUILT FOR <br/> <span className="text-[#F43F5E]">RESONANCE.</span>
          </h1>
          <p className={`text-[#64748B] text-xl max-w-xl mb-12 leading-relaxed ${inter.className}`}>
            BrandBond crafts digital experiences that speak to the heart. We use sentiment-driven motion to build deep, lasting connections between brands and people.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-8">
            <BondButton>CREATE_CONNECTION</BondButton>
            <div className={`flex items-center gap-4 text-[#0F172A] font-bold tracking-widest text-xs cursor-pointer group`}>
              OUR_PHILOSOPHY <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform text-[#F43F5E]" />
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...tokens.physics.fluid, delay: 0.2 }}
          className="relative"
        >
          <div className="bg-white p-10 rounded-[60px] shadow-[0_50px_100px_rgba(0,0,0,0.05)] border border-[#F1F5F9] relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#F43F5E]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center justify-between mb-12">
              <div className={`${dmSans.className} text-2xl font-black text-[#0F172A]`}>Sentiment Pulse</div>
              <div className="flex gap-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="w-2 h-2 rounded-full bg-[#F43F5E] animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                ))}
              </div>
            </div>
            <div className="space-y-8 relative z-10">
              {[
                { label: 'Trust Index', val: '98%', color: '#F43F5E' },
                { label: 'Emotional Depth', val: '2.4X', color: '#6366F1' },
                { label: 'User Harmony', val: 'A+', color: '#10B981' }
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-6 bg-[#FDFCF0] rounded-3xl border border-[#F1F5F9]">
                  <div className="text-sm font-black text-[#64748B] uppercase tracking-widest">{item.label}</div>
                  <div className={`${dmSans.className} text-3xl font-black`} style={{ color: item.color }}>{item.val}</div>
                </div>
              ))}
            </div>
          </div>
          <motion.div 
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="absolute -bottom-10 -right-10 bg-[#6366F1] text-white p-8 rounded-full shadow-2xl rotate-12"
          >
            <Sparkles size={32} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

const StatsBar = () => (
  <section className="py-24 border-y border-[#F1F5F9] bg-white">
    <div className="max-w-7xl mx-auto px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-16 text-center">
        {[
          { label: 'Connections', value: '4.8M+', icon: HandHeart },
          { label: 'Retention', value: '94%', icon: Heart },
          { label: 'Impact Score', value: '12.4', icon: Zap },
          { label: 'Global reach', value: '150+', icon: Globe }
        ].map((stat, i) => (
          <motion.div key={i} whileHover={{ y: -5 }}>
            <div className={`${dmSans.className} text-5xl font-black text-[#0F172A] mb-2`}>{stat.value}</div>
            <div className="text-[#64748B] text-[10px] font-black uppercase tracking-[0.4em]">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)

const Features = () => (
  <section className="py-32 px-8 bg-[#FDFCF0]">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-24">
        <h2 className={`${dmSans.className} text-5xl md:text-6xl font-black text-[#0F172A] mb-6`}>BEYOND THE INTERFACE</h2>
        <p className={`text-[#64748B] max-w-2xl mx-auto text-lg leading-relaxed ${inter.className}`}>We use empathy-driven engineering to ensure every pixel serves a human connection.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {[
          { title: 'Fluid Narratives', desc: 'Interfaces that transition like thoughts, utilizing liquid spring physics and soft-masks.', icon: Layout },
          { title: 'Sentiment Mapping', desc: 'Real-time analysis of user interaction patterns to suggest mood-aligned content shifts.', icon: Palette },
          { title: 'Aura Branding', desc: 'Glow-based color systems that respond to the emotional weight of your brand assets.', icon: Sparkles },
          { title: 'Harmony UX', desc: 'User journeys designed to minimize cognitive friction and maximize emotional reward.', icon: Smile },
          { title: 'Empathy Vault', desc: 'Encrypted storage for proprietary customer sentiment data and resonance logs.', icon: ShieldCheck },
          { title: 'Bond Metrics', desc: 'Predictive ROI analytics that map the long-term value of emotional brand loyalty.', icon: TrendingUp }
        ].map((feature, i) => (
          <EmpathyCard key={i}>
            <div className="w-16 h-16 bg-[#F43F5E]/5 rounded-3xl flex items-center justify-center mb-8">
              <feature.icon className="text-[#F43F5E]" size={32} />
            </div>
            <h3 className={`${dmSans.className} text-2xl font-bold text-[#0F172A] mb-4`}>{feature.title}</h3>
            <p className="text-[#64748B] text-sm leading-relaxed">{feature.desc}</p>
          </EmpathyCard>
        ))}
      </div>
    </div>
  </section>
)

const ProductDetail = () => (
  <section className="py-32 px-8 bg-white relative overflow-hidden">
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-24 items-center">
        <div className="relative p-10 border-4 border-dashed border-[#F1F5F9] rounded-[80px]">
          <div className="aspect-square bg-[#FDFCF0] rounded-[60px] shadow-2xl flex items-center justify-center overflow-hidden relative group">
            <motion.div 
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute inset-0 bg-gradient-to-tr from-[#F43F5E]/10 to-transparent" 
            />
            <HandHeart className="text-[#F43F5E]/20" size={200} />
            <div className="absolute bottom-10 left-10 right-10 bg-white/90 backdrop-blur-md p-8 rounded-[40px] border border-[#F1F5F9] shadow-xl">
              <div className={`${dmSans.className} text-2xl font-black text-[#0F172A] mb-2`}>The Resonance Lab</div>
              <p className="text-[#64748B] text-sm font-medium">Testing emotional frequency across 40+ touchpoints.</p>
            </div>
          </div>
          <div className="absolute -top-10 -left-10 bg-[#10B981] text-white p-8 rounded-full shadow-2xl rotate-12">
            <Star size={32} />
          </div>
        </div>
        <div>
          <div className={`mb-10 ${inter.className} text-[#6366F1] font-black tracking-[0.5em] uppercase text-[10px]`}>[ HUMAN_CENTERED_ENGINEERING ]</div>
          <h2 className={`${dmSans.className} text-6xl font-black text-[#0F172A] mb-10 leading-[1.1]`}>A BOND THAT <br/> <span className="text-[#F43F5E]">LASTS.</span></h2>
          <div className={`space-y-8 text-[#64748B] text-xl leading-relaxed ${inter.className}`}>
            <p>Traditional branding is about shouting. BrandBond is about listening. We treat every digital interaction as a conversation, ensuring your brand feels human, approachable, and trusted.</p>
            <p>Our implementation of fluid physics and sentiment-aware transitions ensures that your site isn't just visited—it's experienced.</p>
          </div>
          <BondButton className="mt-12">EXPLORE_RESONANCE</BondButton>
        </div>
      </div>
    </div>
  </section>
)

const Footer = () => (
  <footer className="py-24 px-8 bg-white border-t border-[#F1F5F9]">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-16 mb-24">
        <div className="col-span-2">
          <div className={`flex items-center gap-2 ${dmSans.className} text-2xl font-black tracking-tight text-[#0F172A] mb-8`}>
            <HandHeart className="text-[#F43F5E]" size={28} />
            BRAND<span className="text-[#F43F5E]">BOND</span>
          </div>
          <p className="text-[#64748B] text-sm leading-relaxed max-w-xs font-medium">Creating resonant digital legacies through emotional intelligence and high-fidelity motion design. Human-centered since 2026.</p>
        </div>
        {[
          { title: 'Resonance', links: ['Fluid Narratives', 'Impact', 'Success Tickers', 'Pricing'] },
          { title: 'Studio', links: ['About Us', 'Empathy Vault', 'Careers', 'Brand'] },
          { title: 'Connect', links: ['Instagram', 'LinkedIn', 'Discord', 'Support'] }
        ].map(group => (
          <div key={group.title}>
            <div className="text-[10px] font-black text-[#0F172A] uppercase tracking-[0.4em] mb-10">{group.title}</div>
            <ul className="space-y-6">
              {group.links.map(link => (
                <li key={link}><a href="#" className="text-sm font-bold text-[#64748B] hover:text-[#F43F5E] transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="pt-12 border-t border-[#F1F5F9] flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="text-[#64748B] text-[10px] font-black uppercase tracking-[0.6em]">© 2026 BRANDBOND EMOTIONAL CORP. ALL RIGHTS RESERVED.</div>
        <div className="flex gap-10">
          <Heart className="text-[#F43F5E] hover:scale-125 transition-transform cursor-pointer fill-[#F43F5E]" size={20} />
          <Smile className="text-[#6366F1] hover:scale-125 transition-transform cursor-pointer" size={20} />
        </div>
      </div>
    </div>
  </footer>
)

export default function BrandBond() {
  return (
    <div className={`min-h-screen bg-[#FDFCF0] text-[#0F172A] overflow-x-hidden ${dmSans.className}`}>
      <Navbar />
      <Hero />
      <StatsBar />
      <Features />
      <ProductDetail />
      <Footer />
      
      {/* --- Global Effects --- */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03] contrast-150 mix-blend-multiply">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <filter id="bond-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100" height="100" filter="url(#bond-noise)" />
        </svg>
      </div>
    </div>
  )
}
