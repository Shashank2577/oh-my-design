'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence, useVelocity, useSpring, useMotionValue } from 'framer-motion'
import { Plus_Jakarta_Sans, Syne, Space_Mono } from 'next/font/google'
import { Menu, X, ArrowRight, Zap, Orbit, Cpu, Sparkles, Check, ChevronDown, GitBranch, MessageSquare } from 'lucide-react'

/**
 * SYNTH-MIND: LATENT DREAMSCAPE
 * 
 * This style exploration focuses on the "Kinetic Design Protocol", featuring:
 * 1. Cinematic unblurring/resolving of images on scroll.
 * 2. Chromatic aberration pulses on hover.
 * 3. Velocity-based typography weight shifting.
 * 4. High-fidelity fluid motion using Framer Motion.
 */

const syne = Syne({ subsets: ['latin'], variable: '--font-syne', weight: ['400', '500', '600', '700', '800'] })
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-jakarta' })
const spaceMono = Space_Mono({ weight: ['400', '700'], subsets: ['latin'], variable: '--font-space' })

// Design Tokens defined in DESIGN_SYSTEM.md
const tokens = {
  background: '#03001C',
  surface: 'rgba(48, 25, 52, 0.4)',
  accent1: '#B6EADA', // Mint
  accent2: '#5B8FB9', // Azure
  border: 'rgba(182, 234, 218, 0.2)',
  textHigh: '#B6EADA',
  textMuted: 'rgba(182, 234, 218, 0.6)'
}

const PRODUCT_NAME = "SynthMind"

// --- KINETIC COMPONENTS ---

/**
 * ChromaticAberration: Wraps an element and applies an RGB split effect on hover.
 */
const ChromaticAberration = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <motion.div 
      className={`relative ${className}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Red Channel */}
      <motion.div
        animate={isHovered ? { x: -2, opacity: 0.5 } : { x: 0, opacity: 0 }}
        className="absolute inset-0 pointer-events-none text-red-500 mix-blend-screen"
        transition={{ type: 'spring', stiffness: 500, damping: 15 }}
      >
        {children}
      </motion.div>
      
      {/* Blue Channel */}
      <motion.div
        animate={isHovered ? { x: 2, opacity: 0.5 } : { x: 0, opacity: 0 }}
        className="absolute inset-0 pointer-events-none text-cyan-400 mix-blend-screen"
        transition={{ type: 'spring', stiffness: 500, damping: 15 }}
      >
        {children}
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}

/**
 * ResolvingImage: An image that unblurs as it enters the viewport and scrolls.
 */
const ResolvingImage = ({ src, alt, className = '' }: { src: string, alt: string, className?: string }) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"]
  })

  // Map scroll progress to blur and scale
  const blur = useTransform(scrollYProgress, [0, 1], [40, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])
  
  // Smooth the transitions
  const smoothBlur = useSpring(blur, { stiffness: 100, damping: 30 })
  const smoothScale = useSpring(scale, { stiffness: 100, damping: 30 })

  return (
    <div ref={ref} className={`overflow-hidden rounded-3xl ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        style={{ 
          filter: useTransform(smoothBlur, (v) => `blur(${v}px)`),
          scale: smoothScale,
          opacity
        }}
        className="w-full h-full object-cover"
      />
    </div>
  )
}

/**
 * VelocityText: Typography that shifts weight/skew based on scroll velocity.
 */
const VelocityText = ({ children, className = '', style = {} }: { children: React.ReactNode, className?: string, style?: React.CSSProperties }) => {
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  
  // Map velocity to font-weight and skew
  // Higher velocity = thinner weight and more skew
  const weight = useTransform(scrollVelocity, [-2000, 0, 2000], [400, 800, 400])
  const skew = useTransform(scrollVelocity, [-2000, 0, 2000], [-10, 0, 10])
  
  const smoothWeight = useSpring(weight, { stiffness: 100, damping: 30 })
  const smoothSkew = useSpring(skew, { stiffness: 100, damping: 30 })

  return (
    <motion.div 
      className={className}
      style={{ 
        ...style,
        fontWeight: smoothWeight,
        skewX: smoothSkew
      }}
    >
      {children}
    </motion.div>
  )
}

// --- LAYOUT COMPONENTS ---

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { scrollY } = useScroll()
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 0.9])
  
  return (
    <motion.nav 
      className="fixed top-0 w-full z-50 backdrop-blur-md border-b" 
      style={{ 
        borderColor: tokens.border, 
        backgroundColor: useTransform(bgOpacity, (v) => `rgba(3, 0, 28, ${v})`) 
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className={`text-2xl font-bold ${syne.className}`} style={{ color: tokens.textHigh }}>
          <ChromaticAberration>
            <a href="#">{PRODUCT_NAME}</a>
          </ChromaticAberration>
        </div>
        
        <div className="hidden md:flex items-center space-x-10">
          {['Latent Space', 'Models', 'Compute', 'Collective'].map(item => (
            <a 
              key={item} 
              href={`#${item.toLowerCase().replace(' ', '-')}`} 
              className={`text-xs tracking-[0.2em] uppercase ${spaceMono.className} hover:text-white transition-colors relative group`} 
              style={{ color: tokens.textMuted }}
            >
              {item}
              <motion.span 
                className="absolute -bottom-1 left-0 w-0 h-px bg-current group-hover:w-full transition-all"
                style={{ backgroundColor: tokens.accent1 }}
              />
            </a>
          ))}
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: `0 0 25px ${tokens.accent1}50` }}
            whileTap={{ scale: 0.95 }}
            className={`px-8 py-2.5 rounded-full text-sm font-bold tracking-tight ${jakarta.className}`}
            style={{ backgroundColor: tokens.accent1, color: tokens.background }}
          >
            Sync Now
          </motion.button>
        </div>
        
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)} style={{ color: tokens.textHigh }}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden border-b absolute top-20 left-0 w-full"
            style={{ borderColor: tokens.border, backgroundColor: 'rgba(3, 0, 28, 0.95)' }}
          >
            <div className="p-8 flex flex-col space-y-6">
              {['Latent Space', 'Models', 'Compute', 'Collective'].map(item => (
                <a key={item} href="#" className={`text-lg ${syne.className}`} style={{ color: tokens.textHigh }}>
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Animated Blobs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] blur-[120px] rounded-full opacity-20"
          style={{ background: tokens.accent1 }}
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            x: [0, -50, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] blur-[150px] rounded-full opacity-20"
          style={{ background: tokens.accent2 }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border mb-10" style={{ borderColor: tokens.border, backgroundColor: tokens.surface }}>
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: tokens.accent1 }} />
            <span className={`text-[10px] uppercase tracking-[0.3em] ${spaceMono.className}`} style={{ color: tokens.textHigh }}>
              Latent V5 Protocol Active
            </span>
          </div>
        </motion.div>

        <VelocityText className={`text-7xl md:text-[10rem] font-black mb-10 leading-[0.9] tracking-tighter ${syne.className}`}>
          SYNTHETIC <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r" style={{ backgroundImage: `linear-gradient(to right, ${tokens.accent1}, ${tokens.accent2})` }}>
            CONSCIOUS
          </span>
        </VelocityText>

        <motion.p 
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className={`text-xl md:text-2xl mb-14 max-w-3xl mx-auto leading-relaxed ${jakarta.className}`} 
          style={{ color: tokens.textMuted }}
        >
          Dissolve the barrier between biological intent and digital execution. 
          Navigate the dreamscape of artificial intuition.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <ChromaticAberration>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-10 py-5 rounded-2xl font-bold text-lg flex items-center gap-3 ${jakarta.className}`}
              style={{ backgroundColor: tokens.accent1, color: tokens.background }}
            >
              Enter the Latent Space <ArrowRight className="w-5 h-5" />
            </motion.button>
          </ChromaticAberration>
          
          <button className={`px-10 py-5 rounded-2xl font-bold text-lg border hover:bg-white/5 transition-colors ${jakarta.className}`} style={{ borderColor: tokens.border, color: tokens.textHigh }}>
            View Artifacts
          </button>
        </motion.div>
      </div>

      {/* Hero Asset - Cinematic Unblurring */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-5xl px-6 h-64 md:h-96">
        <ResolvingImage 
          src="https://images.unsplash.com/photo-1633167606207-d840b5070fc2?auto=format&fit=crop&q=80&w=2000" 
          alt="Neural Dreamscape"
          className="w-full h-full shadow-2xl shadow-cyan-500/20"
        />
      </div>
    </section>
  )
}

function Features() {
  const features = [
    { 
      icon: Orbit, 
      title: "Amorphous Morphing", 
      desc: "Liquid-state geometry that adapts to your mental throughput. Non-linear, non-destructive.",
      img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800"
    },
    { 
      icon: Cpu, 
      title: "Synaptic Bridge", 
      desc: "Zero-latency neural telemetry. Map your cortical patterns directly to latent seed vectors.",
      img: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=800"
    },
    { 
      icon: Sparkles, 
      title: "Ethereal Resolution", 
      desc: "Upscale your imagination into infinite detail while preserving the dream-state aesthetic.",
      img: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=800"
    }
  ]

  return (
    <section className="py-40 bg-black/50 relative overflow-hidden" id="latent-space">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-8">
          <div className="max-w-2xl">
            <h2 className={`text-4xl md:text-7xl font-bold mb-8 ${syne.className}`} style={{ color: tokens.textHigh }}>
              CORE <br />
              <span style={{ color: tokens.accent2 }}>PROTOCOLS</span>
            </h2>
            <p className={`text-xl ${jakarta.className} max-w-lg`} style={{ color: tokens.textMuted }}>
              The infrastructure of artificial intuition. Engineered for the next evolution of human creativity.
            </p>
          </div>
          <div className={`text-[10px] uppercase tracking-[0.5em] mb-4 ${spaceMono.className}`} style={{ color: tokens.accent1 }}>
            [ Latent Layer 03 ]
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {features.map((f, i) => (
            <motion.div 
              key={f.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: i * 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="group"
            >
              <ResolvingImage src={f.img} alt={f.title} className="aspect-[4/3] mb-10 grayscale group-hover:grayscale-0 transition-all duration-700" />
              <div className="flex items-start gap-6">
                <div className="p-3 rounded-xl border shrink-0 transition-colors group-hover:bg-cyan-500/10" style={{ borderColor: tokens.border }}>
                  <f.icon className="w-6 h-6" style={{ color: tokens.accent1 }} />
                </div>
                <div>
                  <h3 className={`text-2xl font-bold mb-4 ${syne.className}`} style={{ color: tokens.textHigh }}>{f.title}</h3>
                  <p className={`text-sm leading-relaxed ${spaceMono.className}`} style={{ color: tokens.textMuted }}>{f.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTA() {
  return (
    <section className="py-60 relative overflow-hidden" id="collective">
      {/* Background radial gradient */}
      <div className="absolute inset-0 z-0" style={{ background: `radial-gradient(circle at center, rgba(182, 234, 218, 0.05) 0%, transparent 70%)` }} />
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <VelocityText className={`text-6xl md:text-9xl font-black mb-12 ${syne.className}`} style={{ color: tokens.textHigh }}>
            JOIN THE <br /> COLLECTIVE
          </VelocityText>
          
          <p className={`text-xl md:text-2xl mb-16 max-w-2xl mx-auto ${jakarta.className}`} style={{ color: tokens.textMuted }}>
            Become a node in the global dreamscape. Sync your consciousness with thousands of other digital visionaries.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <ChromaticAberration>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`px-12 py-6 rounded-2xl font-black text-xl tracking-tight shadow-2xl shadow-cyan-500/20 ${jakarta.className}`}
                style={{ backgroundColor: tokens.accent1, color: tokens.background }}
              >
                Initialize Neural Link
              </motion.button>
            </ChromaticAberration>
            
            <a href="#" className={`text-lg font-bold flex items-center gap-2 hover:opacity-70 transition-opacity ${spaceMono.className}`} style={{ color: tokens.textHigh }}>
              Explore Documentation <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Floating geometric elements */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute border border-dashed rounded-full pointer-events-none"
          style={{ 
            borderColor: tokens.border,
            width: (i + 1) * 200,
            height: (i + 1) * 200,
            top: '50%',
            left: '50%',
            x: '-50%',
            y: '-50%'
          }}
          animate={{ 
            rotate: i % 2 === 0 ? 360 : -360,
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ 
            duration: 30 + i * 10, 
            repeat: Infinity, 
            ease: 'linear' 
          }}
        />
      ))}
    </section>
  )
}

function Footer() {
  return (
    <footer className="py-24 border-t" style={{ borderColor: tokens.border, backgroundColor: 'black' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-16 mb-24">
          <div className="col-span-2">
            <div className={`text-3xl font-bold mb-8 ${syne.className}`} style={{ color: tokens.textHigh }}>
              <ChromaticAberration>{PRODUCT_NAME}</ChromaticAberration>
            </div>
            <p className={`text-lg max-w-sm ${jakarta.className}`} style={{ color: tokens.textMuted }}>
              Pushing the boundaries of what is possible between human imagination and machine intelligence.
            </p>
          </div>
          <div>
            <h4 className={`text-xs uppercase tracking-[0.3em] mb-8 ${spaceMono.className}`} style={{ color: tokens.accent1 }}>Social</h4>
            <div className="flex flex-col space-y-4">
              {[
                { name: 'Twitter', icon: X },
                { name: 'Discord', icon: MessageSquare },
                { name: 'GitHub', icon: GitBranch }
              ].map(item => (
                <a key={item.name} href="#" className="flex items-center gap-3 hover:text-white transition-colors" style={{ color: tokens.textMuted }}>
                  <item.icon className="w-5 h-5" />
                  <span className={jakarta.className}>{item.name}</span>
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className={`text-xs uppercase tracking-[0.3em] mb-8 ${spaceMono.className}`} style={{ color: tokens.accent1 }}>Status</h4>
            <div className={`flex items-center gap-3 ${spaceMono.className} text-sm`} style={{ color: tokens.textHigh }}>
              <div className="w-2 h-2 rounded-full bg-green-500" />
              All Nodes Operational
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-12 border-t" style={{ borderColor: tokens.border }}>
          <div className={`text-xs ${spaceMono.className}`} style={{ color: tokens.textMuted }}>
            &copy; 2026 SynthMind Latent Labs. Universal Consciousness License.
          </div>
          <div className="flex gap-10">
            {['Privacy', 'Terms', 'Security'].map(item => (
              <a key={item} href="#" className={`text-xs uppercase tracking-widest hover:text-white transition-colors ${spaceMono.className}`} style={{ color: tokens.textMuted }}>
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function SynthMindPage() {
  return (
    <div className={`min-h-screen selection:bg-[#B6EADA] selection:text-[#03001C] overflow-x-hidden`} style={{ backgroundColor: tokens.background }}>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <CTA />
      </main>
      <Footer />
      
      {/* Global Scroll Indicator */}
      <motion.div 
        className="fixed bottom-0 left-0 h-1 z-[100]"
        style={{ 
          backgroundColor: tokens.accent1,
          width: useTransform(useScroll().scrollYProgress, [0, 1], ['0%', '100%'])
        }}
      />
    </div>
  )
}
