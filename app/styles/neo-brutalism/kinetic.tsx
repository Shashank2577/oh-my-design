'use client'

import { motion, useReducedMotion, useInView, useScroll, useTransform, useVelocity, useSpring } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Space_Grotesk } from 'next/font/google'
import {
  Star, ChevronDown, ArrowRight, Check, Zap, Eye, Target, Palette, Box, MessageSquare
} from 'lucide-react'

/**
 * NEO-BRUTALISM - KINETIC DESIGN PROTOCOL
 * 
 * Features:
 * 1. Hard-Shadow Detachment: Shadows move at different rates than containers during scroll.
 * 2. Snappy 90-Degree Rotations: Elements snap into place from extreme angles.
 * 3. Kinetic Velocity Skew: Extreme container distortion based on scroll speed.
 */

// ─────────────────────────────────────────────
// FONTS
// ─────────────────────────────────────────────
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-space',
  display: 'swap',
})

// ─────────────────────────────────────────────
// DESIGN TOKENS
// ─────────────────────────────────────────────
const tokens = {
  background: '#FFFDF5', // Cream
  foreground: '#000000', // Pure Black
  accent: '#FF6B6B',     // Hot Red
  secondary: '#FFD93D',  // Vivid Yellow
  muted: '#C4B5FD',      // Soft Violet
  white: '#FFFFFF',
  
  // Shadows
  shadowSm: '4px 4px 0px 0px #000',
  shadowMd: '8px 8px 0px 0px #000',
  shadowLg: '12px 12px 0px 0px #000',
  shadowXl: '16px 16px 0px 0px #000',
}

// ─────────────────────────────────────────────
// KINETIC COMPONENTS
// ─────────────────────────────────────────────

/**
 * HardShadowCard: A card where the black shadow "detaches" or deepens on scroll.
 */
function HardShadowCard({ children, className = '', bg = 'white', rotate = 0 }: any) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  // Shadow "detaches" from 8px to 32px based on scroll
  const shadowOffset = useTransform(scrollYProgress, [0, 1], [8, 32])
  
  return (
    <motion.div
      ref={ref}
      className={`border-4 border-black p-8 relative ${className}`}
      style={{ 
        backgroundColor: bg,
        transform: `rotate(${rotate}deg)`,
        boxShadow: useTransform(shadowOffset, v => `${v}px ${v}px 0px 0px #000`)
      }}
      whileHover={{ scale: 1.02, rotate: 0 }}
    >
      {children}
    </motion.div>
  )
}

/**
 * SnappyEntrance: Elements that snap from 90 degrees into position.
 */
function SnappyEntrance({ children, delay = 0, initialRotate = 90 }: any) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-10%" })
  
  return (
    <motion.div
      ref={ref}
      initial={{ rotate: initialRotate, scale: 0.5, opacity: 0 }}
      animate={isInView ? { rotate: 0, scale: 1, opacity: 1 } : {}}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 20, 
        delay 
      }}
    >
      {children}
    </motion.div>
  )
}

/**
 * VelocitySkew: Distortion that reacts to scroll speed.
 */
function VelocitySkew({ children }: { children: React.ReactNode }) {
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, { stiffness: 400, damping: 50 })
  
  // Map velocity to skewX and skewY (-15deg to 15deg)
  const skew = useTransform(smoothVelocity, [-2000, 2000], [-15, 15])
  
  return (
    <motion.div style={{ skewY: skew }}>
      {children}
    </motion.div>
  )
}

// ─────────────────────────────────────────────
// REUSABLE COMPONENTS
// ─────────────────────────────────────────────
function BrutalButton({ variant = 'primary', children, className = '', onClick }: any) {
  let bg = tokens.accent
  if (variant === 'secondary') bg = tokens.secondary
  if (variant === 'white') bg = tokens.white

  return (
    <motion.button
      className={`relative uppercase font-black tracking-widest text-lg border-4 border-black h-16 px-10 flex items-center justify-center gap-3 ${className}`}
      style={{ backgroundColor: bg, boxShadow: tokens.shadowMd }}
      whileHover={{ y: -4, x: -4, boxShadow: tokens.shadowLg }}
      whileTap={{ y: 4, x: 4, boxShadow: '0px 0px 0px 0px #000' }}
      onClick={onClick}
    >
      {children}
    </motion.button>
  )
}

// ─────────────────────────────────────────────
// SECTIONS
// ─────────────────────────────────────────────

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b-8 border-black">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <motion.div 
          className="font-black text-3xl tracking-tighter bg-black text-white px-4 py-1 -rotate-2"
          whileHover={{ rotate: 0, scale: 1.1 }}
        >
          REBEL.IO
        </motion.div>
        <div className="hidden md:flex items-center gap-10 font-black text-sm tracking-widest">
          {['MANIFESTO', 'ARSENAL', 'PRICING', 'TRANSMISSIONS'].map(link => (
            <a key={link} href="#" className="hover:bg-[#FFD93D] px-2 transition-colors">{link}</a>
          ))}
        </div>
        <BrutalButton className="h-12 px-6 text-sm" variant="secondary">JOIN THE RIOT</BrutalButton>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 border-b-8 border-black bg-[#FFFDF5] overflow-hidden">
      {/* Kinetic Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#000 2px, transparent 2px)', backgroundSize: '30px 30px' }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-24 w-full relative z-10 grid lg:grid-cols-2 gap-16 items-center">
        <VelocitySkew>
          <div className="max-w-3xl">
            <SnappyEntrance initialRotate={-45}>
              <div className="inline-block bg-[#C4B5FD] border-4 border-black px-4 py-2 mb-8 font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_#000]">
                Kinetic Protocol Active
              </div>
            </SnappyEntrance>
            
            <h1 className="text-7xl md:text-9xl font-black leading-[0.8] tracking-tighter mb-8 uppercase">
              <span className="block">DESIGN</span>
              <span className="block text-[#FF6B6B]" style={{ textShadow: '6px 6px 0px #000' }}>THAT</span>
              <motion.span 
                className="block bg-[#FFD93D] inline-block border-4 border-black px-4 mt-4 -rotate-3 shadow-[12px_12px_0px_0px_#000]"
                whileHover={{ rotate: 0, scale: 1.05 }}
              >
                SCREAMS
              </motion.span>
            </h1>
            
            <p className="text-2xl font-bold mb-12 max-w-xl leading-tight bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_#000]">
              Embrace the border. Embrace the shadow. Join the digital revolution against polished minimalism.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <BrutalButton>START RIOT <ArrowRight size={24} strokeWidth={4} /></BrutalButton>
              <BrutalButton variant="white">MANIFESTO</BrutalButton>
            </div>
          </div>
        </VelocitySkew>

        <div className="relative h-[500px] hidden lg:block">
          <SnappyEntrance delay={0.2} initialRotate={90}>
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#C4B5FD] border-8 border-black shadow-[20px_20px_0px_0px_#000] flex items-center justify-center">
              <Star className="w-48 h-48 fill-[#FFD93D]" />
            </div>
          </SnappyEntrance>
          <SnappyEntrance delay={0.4} initialRotate={-90}>
            <div className="absolute bottom-0 left-0 w-96 h-64 bg-[#FF6B6B] border-8 border-black shadow-[24px_24px_0px_0px_#000] p-8 flex flex-col justify-between">
              <div className="text-5xl font-black text-white italic">NO BLUR.</div>
              <div className="text-5xl font-black text-white text-right italic">NO MERCY.</div>
            </div>
          </SnappyEntrance>
        </div>
      </div>
    </section>
  )
}

function Features() {
  const features = [
    { title: 'HIGH VOLTAGE', icon: Zap, bg: '#FFD93D' },
    { title: 'HARD TARGETS', icon: Target, bg: '#C4B5FD' },
    { title: 'SOLID SHADOWS', icon: Box, bg: '#FF6B6B' }
  ]

  return (
    <section className="py-32 border-b-8 border-black bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-24 text-center">
          <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter">
            <span className="bg-black text-white px-6 inline-block -rotate-2">BRUTAL</span> ARSENAL
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {features.map((f, i) => (
            <HardShadowCard key={i} bg={f.bg} rotate={i % 2 === 0 ? -2 : 2}>
              <div className="w-20 h-20 bg-white border-4 border-black flex items-center justify-center mb-8 shadow-[4px_4px_0px_0px_#000]">
                <f.icon size={40} strokeWidth={3} />
              </div>
              <h3 className="text-4xl font-black mb-4 uppercase">{f.title}</h3>
              <p className="font-bold text-lg uppercase leading-tight">
                Shadows that detach. UI that snaps. Brutalism evolved for the kinetic web.
              </p>
            </HardShadowCard>
          ))}
        </div>
      </div>
    </section>
  )
}

function Pricing() {
  return (
    <section className="py-32 border-b-8 border-black bg-[#FFD93D] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <VelocitySkew>
          <div className="bg-white border-8 border-black p-12 md:p-20 shadow-[24px_24px_0px_0px_#000] relative">
            <div className="absolute -top-10 -right-6 bg-[#FF6B6B] text-white border-4 border-black px-8 py-4 font-black text-3xl rotate-12 shadow-[8px_8px_0px_0px_#000]">
              LIMITED SLOTS
            </div>
            <h2 className="text-6xl md:text-8xl font-black mb-12 uppercase tracking-tighter">JOIN THE CULT</h2>
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <p className="text-3xl font-black uppercase leading-none border-l-8 border-black pl-6">
                  EVERYTHING YOU NEED TO DESTROY CORPORATE DESIGN.
                </p>
                <ul className="space-y-4">
                  {['0px Border Radius', '100% Saturation', 'Solid 45deg Shadows', 'Monospace Mandatory'].map(item => (
                    <li key={item} className="flex items-center gap-4 text-xl font-black uppercase">
                      <Check className="bg-black text-[#00FF41] rounded-none" size={24} strokeWidth={4} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-[#C4B5FD] border-8 border-black p-10 shadow-[16px_16px_0px_0px_#000] rotate-2">
                <div className="text-7xl font-black mb-2">$99</div>
                <div className="text-xl font-black uppercase mb-8">Per Lifetime. No Subs.</div>
                <BrutalButton className="w-full bg-black text-white" variant="primary">PAY US NOW</BrutalButton>
              </div>
            </div>
          </div>
        </VelocitySkew>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="py-20 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="text-5xl font-black tracking-tighter italic">REBEL.IO</div>
        <div className="flex gap-12 font-black text-sm tracking-widest uppercase">
          <a href="#" className="hover:text-[#FF6B6B] transition-colors">Twitter</a>
          <a href="#" className="hover:text-[#FFD93D] transition-colors">Discord</a>
          <a href="#" className="hover:text-[#C4B5FD] transition-colors">Github</a>
        </div>
        <div className="text-xs font-bold opacity-50 uppercase tracking-[0.3em]">
          © 2026 UNPOLISHED CORP. ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  )
}

export default function NeoBrutalismPage() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <div className={`${spaceGrotesk.variable} font-space bg-[#FFFDF5] text-black selection:bg-[#FF6B6B] selection:text-white`}>
      <Navbar />
      <main className="overflow-hidden">
        <Hero />
        <Features />
        <Pricing />
      </main>
      <Footer />
    </div>
  )
}
