'use client'

/**
 * MOTION MANIFESTO - KINETIC DESIGN PROTOCOL
 * Style: Mechanical Inertia
 * 
 * This page implements the "Kinetic Design Protocol" which emphasizes 
 * physical momentum, velocity-based distortion, and high-energy 
 * spring physics to simulate the feeling of heavy, precise machinery.
 */

import React, { useState, useEffect, useRef } from 'react'
import { 
  motion, 
  AnimatePresence, 
  useScroll, 
  useTransform, 
  useVelocity, 
  useSpring,
  useAnimationFrame
} from 'framer-motion'
import { 
  Zap, 
  Activity, 
  TrendingUp, 
  Play, 
  Monitor, 
  ChevronRight, 
  ArrowRight,
  Sparkles,
  Layers,
  Award,
  Video,
  Share2,
  MousePointer2,
  Move,
  Flame,
  LayoutGrid,
  Target,
  ShieldCheck,
  Settings,
  Cpu,
  Gauge
} from 'lucide-react'
import { Inter, Space_Grotesk } from 'next/font/google'

// --- Fonts ---
const inter = Inter({ subsets: ['latin'] })
const space = Space_Grotesk({ subsets: ['latin'], weight: ['400', '700'] })

// --- Design Tokens (from DESIGN_SYSTEM.md) ---
const tokens = {
  colors: {
    background: "#000000",
    surface: "#050505",
    accent1: "#FAFF00", // Electric Lemon
    accent2: "#00E0FF", // Cine Blue
    border: "#222222",
    textHigh: "#FFFFFF",
    textLow: "#555555"
  },
  // High-stiffness spring for "jiggles" and mechanical rebounds
  physics: {
    mechanical: { 
      type: "spring" as const, 
      stiffness: 600, 
      damping: 15, 
      mass: 1 
    },
    heavy: {
      type: "spring" as const,
      stiffness: 200,
      damping: 30,
      mass: 2
    }
  }
}

// --- Background Pattern Component ---
/**
 * Shifting Background Pattern
 * Transitions from Static (sharp) to Flow (blurred/moving) based on scroll speed.
 */
const ShiftingBackground = () => {
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  
  // Transform velocity into blur and opacity shifts
  // As speed increases, the background becomes more "fluid"
  const blurValue = useSpring(useTransform(scrollVelocity, [-2000, 2000], [0, 8]), { stiffness: 100, damping: 30 })
  const opacityValue = useSpring(useTransform(scrollVelocity, [-2000, 2000], [0.05, 0.2]), { stiffness: 100, damping: 30 })
  
  return (
    <motion.div 
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
      style={{ opacity: opacityValue, filter: `blur(${blurValue}px)` }}
    >
      {/* Dynamic Grid Pattern */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(#222_1px,transparent_1px)] [background-size:40px_40px]" 
        style={{ transform: 'scale(1.1)' }}
      />
      
      {/* Secondary Flowing Lines */}
      <motion.div 
        animate={{ 
          x: [-20, 20],
          y: [-20, 20]
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity, 
          repeatType: "reverse",
          ease: "linear" 
        }}
        className="absolute inset-0 border-[40px] border-[#FAFF00]/5 rounded-[100px] blur-3xl"
      />
    </motion.div>
  )
}

// --- Kinetic UI Components ---

/**
 * Kinetic Button
 * Implements skewing on hover and a high-stiffness spring on tap.
 */
const KineticButton = ({ children, variant = 'primary', className = '' }: any) => (
  <motion.button
    whileHover={{ 
      scale: 1.05, 
      skewX: -12,
      boxShadow: `0 0 30px ${variant === 'primary' ? 'rgba(250,255,0,0.4)' : 'rgba(0,224,255,0.2)'}`
    }}
    whileTap={{ 
      scale: 0.95, 
      skewX: 0,
      transition: tokens.physics.mechanical 
    }}
    transition={tokens.physics.mechanical}
    className={`px-10 py-5 rounded-none ${space.className} font-black text-sm transition-all relative group overflow-hidden border-2 ${
      variant === 'primary' 
        ? `bg-[#FAFF00] text-black border-[#FAFF00]` 
        : `bg-transparent text-white border-[#222222] hover:border-[#00E0FF]`
    } ${className}`}
  >
    <span className="relative z-10 flex items-center justify-center gap-3 uppercase italic tracking-tighter">
      {children}
      <Zap size={16} className={variant === 'primary' ? 'fill-black' : 'fill-[#00E0FF] text-[#00E0FF]'} />
    </span>
    {/* Animated Glint Effect */}
    <motion.div 
      animate={{ x: ["-100%", "200%"] }}
      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 pointer-events-none"
    />
  </motion.button>
)

/**
 * Distortion Card
 * Implements extreme skewing based on scroll velocity.
 * When scroll stops, it "jiggles" back to normal using a stiff spring.
 */
const DistortionCard = ({ children, className = '', title = '', index = 0 }: any) => {
  const { scrollY } = useScroll()
  const velocity = useVelocity(scrollY)
  
  // Extreme skewing: up to 15 degrees at high speeds
  const skew = useSpring(
    useTransform(velocity, [-3000, 3000], [-15, 15]), 
    tokens.physics.mechanical
  )
  
  // Scale distortion based on speed (stretching effect)
  const scaleY = useSpring(
    useTransform(velocity, [-3000, 3000], [1.1, 1.1]),
    tokens.physics.mechanical
  )

  return (
    <motion.div
      style={{ skewY: skew, scaleY }}
      initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={tokens.physics.mechanical}
      className={`bg-[#050505] border border-[#222222] p-12 relative group overflow-hidden ${className}`}
    >
      {/* Mechanical Corner Accents */}
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#FAFF00] opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#00E0FF] opacity-0 group-hover:opacity-100 transition-opacity" />
      
      {title && (
        <div className="flex items-center gap-4 mb-8">
          <div className="w-10 h-px bg-[#222222] group-hover:bg-[#FAFF00] transition-colors" />
          <span className={`${space.className} text-[10px] font-black text-[#555555] group-hover:text-white uppercase tracking-[0.4em] italic`}>
            {title}
          </span>
        </div>
      )}
      {children}
    </motion.div>
  )
}

// --- Layout Sections ---

const Navbar = () => (
  <nav className="fixed top-0 w-full z-[100] bg-black/90 backdrop-blur-md px-10 py-6 border-b border-[#222222]">
    <div className="max-w-screen-2xl mx-auto flex items-center justify-between">
      <motion.div 
        whileHover={{ skewX: -10 }}
        className={`flex items-center gap-4 ${space.className} text-2xl font-black tracking-tighter text-white uppercase italic cursor-pointer`}
      >
        <div className="p-2 bg-[#FAFF00] text-black">
          <Cpu size={24} />
        </div>
        MOTION<span className="text-[#FAFF00]">MANIFESTO</span>
      </motion.div>
      
      <div className="hidden lg:flex items-center gap-16 text-[10px] font-black tracking-[0.5em] uppercase text-[#555555]">
        {['Engines', 'Telemetry', 'Blueprints', 'Node_Connect'].map(item => (
          <a key={item} href="#" className="hover:text-[#FAFF00] transition-colors relative group">
            {item}
            <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-[#FAFF00] group-hover:w-full transition-all duration-300" />
          </a>
        ))}
      </div>
      
      <KineticButton className="hidden sm:block py-3 px-8 text-[10px]">INITIATE_CORE</KineticButton>
    </div>
  </nav>
)

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center pt-20 px-10 relative overflow-hidden bg-black">
      {/* Mechanical Inertia Hero Asset - AI Generated Concept */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full z-0 opacity-40">
        {/* Simulating the "Mechanical Inertia" background via CSS and framer motion */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] border border-[#222222]/50 rounded-full"
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-dashed border-[#FAFF00]/20 rounded-full"
        />
      </div>

      <div className="max-w-screen-2xl mx-auto grid lg:grid-cols-2 gap-20 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={tokens.physics.mechanical}
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 border border-[#FAFF00]/30 bg-[#FAFF00]/5 mb-10">
            <Gauge size={14} className="text-[#FAFF00]" />
            <span className={`${space.className} text-[10px] font-black text-[#FAFF00] tracking-[0.4em] uppercase`}>
              STATUS: HIGH_VELOCITY_ENABLED
            </span>
          </div>
          
          <h1 className={`${space.className} text-[clamp(4rem,10vw,12rem)] font-black text-white leading-[0.85] uppercase italic tracking-tighter mb-12`}>
            PHYSICAL <br/>
            <span className="text-transparent border-t-2 border-b-2 border-[#FAFF00] py-2">MOMENTUM.</span>
          </h1>
          
          <p className={`text-xl text-[#555555] max-w-xl mb-16 font-medium leading-relaxed ${inter.className}`}>
            MotionManifesto is a kinetic design system built for the next era of high-fidelity interfaces. We treat UI as heavy machinery, governed by the laws of inertia and mechanical precision.
          </p>
          
          <div className="flex flex-wrap items-center gap-12">
            <KineticButton>LAUNCH_STUDIO</KineticButton>
            <motion.div 
              whileHover={{ x: 10 }}
              className="flex items-center gap-4 text-white text-xs font-black tracking-widest cursor-pointer group"
            >
              TECHNICAL_SPECS <ArrowRight className="text-[#FAFF00] group-hover:scale-125 transition-transform" size={20} />
            </motion.div>
          </div>
        </motion.div>

        {/* Hero Asset - Mechanical Core */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: 15 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={tokens.physics.heavy}
          className="relative hidden lg:block"
        >
          <div className="aspect-square bg-[#050505] border border-[#222222] p-2 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#FAFF00]/5 via-transparent to-[#00E0FF]/5" />
            
            <div className="w-full h-full border border-[#222222] flex flex-col items-center justify-center relative">
               {/* Central Mechanical Pulse */}
               <motion.div 
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 5, repeat: Infinity }}
                className="relative z-10"
               >
                  <Settings size={200} strokeWidth={0.5} className="text-white opacity-20" />
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  >
                    <Settings size={100} strokeWidth={1} className="text-[#FAFF00]" />
                  </motion.div>
               </motion.div>
               
               {/* Telemetry Overlays */}
               <div className="absolute top-10 left-10 text-[8px] font-black text-[#555555] tracking-widest uppercase">
                  Telemetry_Input: 0882-X <br/>
                  Buffer_State: Stable
               </div>
               <div className="absolute bottom-10 right-10 text-[8px] font-black text-[#FAFF00] tracking-widest uppercase">
                  Mechanical_Inertia_Engine_v4.0
               </div>
            </div>
          </div>
          
          {/* Floating Mechanical Tags */}
          <motion.div 
            animate={{ y: [-10, 10] }}
            transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
            className="absolute -top-10 -right-10 bg-[#FAFF00] text-black px-6 py-4 font-black italic text-xl shadow-[20px_20px_0_rgba(0,0,0,1)]"
          >
            ACTIVE_CORE
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

const MetricsSection = () => (
  <section className="py-20 border-y border-[#222222] bg-[#050505]">
    <div className="max-w-screen-2xl mx-auto px-10">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
        {[
          { label: 'Torque Output', value: '850Nm', icon: Activity, color: '#FAFF00' },
          { label: 'Latency Rate', value: '0.02ms', icon: Zap, color: '#00E0FF' },
          { label: 'System Load', value: '14.2%', icon: Gauge, color: '#FFFFFF' },
          { label: 'Thermal Sync', value: 'Optimal', icon: ShieldCheck, color: '#FAFF00' }
        ].map((metric, i) => (
          <motion.div 
            key={i}
            whileHover={{ y: -10, skewX: -5 }}
            className="p-8 border-l border-[#222222] group"
          >
            <metric.icon className="mb-6 opacity-30 group-hover:opacity-100 transition-opacity" style={{ color: metric.color }} size={24} />
            <div className={`${space.className} text-5xl font-black text-white mb-2 italic tracking-tighter`}>{metric.value}</div>
            <div className="text-[10px] font-black text-[#555555] uppercase tracking-[0.4em]">{metric.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)

const ProtocolSection = () => (
  <section className="py-40 px-10 bg-black">
    <div className="max-w-screen-2xl mx-auto">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-32 gap-12">
        <motion.div
          initial={{ opacity: 0, skewX: 20 }}
          whileInView={{ opacity: 1, skewX: 0 }}
          viewport={{ once: true }}
          transition={tokens.physics.mechanical}
        >
          <h2 className={`${space.className} text-7xl lg:text-9xl font-black text-white mb-8 uppercase italic tracking-tighter leading-[0.85]`}>
            KINETIC_ <br/> <span className="text-[#00E0FF]">PROTOCOLS.</span>
          </h2>
          <p className="text-[#555555] max-w-xl text-lg font-medium">
            Every movement on the page is governed by high-stiffness physical models, ensuring that users feel the mass of the data they interact with.
          </p>
        </motion.div>
        <KineticButton variant="secondary" className="lg:mb-4">VIEW_ALL_LOGS</KineticButton>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {[
          { title: 'Velocity Skew', desc: 'Elements distort on the Y-axis based on scroll speed, creating a realistic sense of atmospheric drag.', icon: Move },
          { title: 'Inertia Buffering', desc: 'Scroll stops are cushioned with high-stiffness spring "jiggles" that settle data accurately.', icon: Activity },
          { title: 'Thermal Displacement', desc: 'Heatmaps of user interaction causing subtle chromatic aberration on active UI nodes.', icon: Flame },
          { title: 'Mechanical Hover', desc: 'Hover states that use mass and momentum to scale, rather than linear transitions.', icon: Target },
          { title: 'Logic Encryption', desc: 'Every kinetic unit is verified against our proprietary motion-logic architecture.', icon: ShieldCheck },
          { title: 'Render Telemetry', desc: 'Real-time feedback on frame-delivery performance within the active browser environment.', icon: Monitor }
        ].map((feature, i) => (
          <DistortionCard key={i} index={i} title={`PROTOCOL_NODE_0${i + 1}`}>
            <div className="w-16 h-16 bg-[#111] border border-[#222] flex items-center justify-center mb-10 group-hover:bg-[#FAFF00] group-hover:text-black transition-colors duration-500">
              <feature.icon size={28} />
            </div>
            <h3 className={`${space.className} text-2xl font-black text-white mb-4 uppercase italic tracking-tighter`}>{feature.title}</h3>
            <p className="text-[#555555] text-sm leading-relaxed font-medium mb-10">{feature.desc}</p>
            <motion.div 
              whileHover={{ x: 5 }}
              className="flex items-center gap-2 text-[10px] font-black text-[#FAFF00] tracking-widest uppercase cursor-pointer"
            >
              RUN_SIMULATION <ChevronRight size={14} />
            </motion.div>
          </DistortionCard>
        ))}
      </div>
    </div>
  </section>
)

const TechnicalShowcase = () => (
  <section className="py-40 px-10 bg-[#050505] relative overflow-hidden">
    {/* Decorative Technical Elements */}
    <div className="absolute top-0 right-0 p-20 opacity-10 pointer-events-none">
      <Settings size={600} strokeWidth={0.2} className="animate-spin-slow" />
    </div>

    <div className="max-w-screen-2xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-32 items-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={tokens.physics.heavy}
          className="relative"
        >
          {/* AI Generated Features Asset simulation */}
          <div className="aspect-square bg-black border border-[#222222] p-20 relative flex items-center justify-center">
             <div className="absolute inset-0 bg-[linear-gradient(rgba(250,255,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(250,255,0,0.05)_1px,transparent_1px)] [background-size:20px_20px]" />
             
             <motion.div 
              animate={{ 
                rotate: 360,
                scale: [1, 1.05, 1]
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-full h-full border-2 border-dashed border-[#FAFF00]/20 rounded-full flex items-center justify-center"
             >
                <div className="w-3/4 h-3/4 border-2 border-[#00E0FF]/20 rounded-full flex items-center justify-center">
                   <div className="w-1/2 h-1/2 border border-white/10 rounded-full" />
                </div>
             </motion.div>
             
             {/* Center Label */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center bg-black p-8 border border-[#222]">
                <div className={`${space.className} text-4xl font-black text-white italic mb-2`}>CORE_V4</div>
                <div className="text-[10px] font-black text-[#FAFF00] tracking-[0.5em] uppercase">Mechanical_Verified</div>
             </div>
          </div>
          
          <div className="absolute -bottom-10 -right-10 bg-white text-black p-10 rotate-3 shadow-2xl">
            <div className={`${space.className} text-2xl font-black italic`}>TELEM_VALID</div>
          </div>
        </motion.div>

        <div>
          <div className={`${space.className} text-[#FAFF00] text-[10px] tracking-[0.5em] font-black mb-10 uppercase italic`}>
            [ ENGINE_BLUEPRINT_ACCESS ]
          </div>
          <h2 className={`${space.className} text-7xl lg:text-8xl font-black text-white mb-10 leading-[0.9] uppercase italic tracking-tighter`}>
            BEYOND THE <br/><span className="text-transparent border-b-4 border-[#00E0FF]">STATIC.</span>
          </h2>
          <div className="space-y-8 text-[#555555] text-xl font-medium leading-relaxed">
            <p>Traditional digital design treats screens as flat surfaces. We treat them as heavy mechanical environments where every user action triggers a physical reaction.</p>
            <p>Our Inertia Engine ensures that interfaces don't just "appear"—they settle with the weight and precision of industrial engineering.</p>
          </div>
          
          <div className="mt-20 flex flex-col sm:flex-row items-start gap-10">
            <KineticButton>DECRYPT_SPECS</KineticButton>
            <div className="flex items-center gap-6">
              {[Activity, Target, Cpu].map((Icon, i) => (
                <div key={i} className="p-4 bg-[#111] border border-[#222] text-[#555] hover:text-[#FAFF00] transition-colors">
                  <Icon size={20} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
)

const Footer = () => (
  <footer className="py-32 px-10 bg-black border-t border-[#222222]">
    <div className="max-w-screen-2xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-20 mb-32">
        <div className="lg:col-span-2">
          <div className={`flex items-center gap-4 ${space.className} text-3xl font-black tracking-tighter text-white uppercase italic mb-10 cursor-pointer`}>
            <div className="p-2 bg-[#FAFF00] text-black">
              <Cpu size={28} />
            </div>
            MOTION<span className="text-[#FAFF00]">MANIFESTO</span>
          </div>
          <p className="text-[#555555] text-sm font-medium leading-loose uppercase tracking-[0.2em] max-w-sm">
            THE GLOBAL STANDARD FOR HIGH-FIDELITY KINETIC INTERFACES AND MECHANICAL INERTIA ARCHITECTURE. BUILT FOR PRECISION.
          </p>
        </div>
        
        {[
          { title: 'Logistics', links: ['Showreel', 'Telemetry', 'Engines', 'Artifacts'] },
          { title: 'Blueprints', links: ['Kinetic_v4', 'Thermal_Sync', 'Logic_Gates', 'Safety'] },
          { title: 'Terminal', links: ['SSH_Connect', 'Node_Map', 'Status_Log', 'Access'] }
        ].map((group, i) => (
          <div key={i}>
            <div className="text-[10px] font-black text-white uppercase tracking-[0.5em] mb-12">{group.title}</div>
            <ul className="space-y-6">
              {group.links.map(link => (
                <li key={link}>
                  <a href="#" className="text-sm font-bold text-[#555555] hover:text-[#FAFF00] transition-colors flex items-center gap-3 group">
                    <div className="w-0 h-0.5 bg-[#FAFF00] group-hover:w-4 transition-all" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      
      <div className="pt-16 border-t border-[#222222] flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="text-[10px] font-black text-[#555555] uppercase tracking-[0.6em]">
          © 2026 MOTION_MANIFESTO_CORP // ENCRYPTED_ACCESS_ONLY
        </div>
        <div className="flex gap-12 text-[#555555]">
          <motion.div whileHover={{ scale: 1.2, color: '#FAFF00' }} className="cursor-pointer transition-colors">
            <Share2 size={20} />
          </motion.div>
          <motion.div whileHover={{ scale: 1.2, color: '#00E0FF' }} className="cursor-pointer transition-colors">
            <Award size={20} />
          </motion.div>
          <motion.div whileHover={{ scale: 1.2, color: '#FAFF00' }} className="cursor-pointer transition-colors">
            <Monitor size={20} />
          </motion.div>
        </div>
      </div>
    </div>
  </footer>
)

// --- Main Page Component ---

export default function MotionManifestoPage() {
  return (
    <div className={`min-h-screen bg-black text-white overflow-x-hidden ${inter.className} selection:bg-[#FAFF00] selection:text-black`}>
      {/* Background kinetic pattern */}
      <ShiftingBackground />
      
      {/* HUD / Navigation */}
      <Navbar />
      
      {/* Main Content Sections */}
      <main className="relative z-10">
        <Hero />
        <MetricsSection />
        <ProtocolSection />
        <TechnicalShowcase />
        
        {/* Call to Action - Mechanical Inertia Theme */}
        <section className="py-40 px-10 relative overflow-hidden">
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={tokens.physics.heavy}
            className="max-w-6xl mx-auto bg-[#FAFF00] p-20 text-black relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:opacity-20 transition-opacity">
              <Zap size={300} strokeWidth={2} />
            </div>
            
            <div className="relative z-10 text-center">
              <h2 className={`${space.className} text-6xl lg:text-8xl font-black uppercase italic tracking-tighter mb-12`}>
                IGNITE THE <br/> <span className="bg-black text-white px-4">ENGINE.</span>
              </h2>
              <p className="text-xl font-bold uppercase tracking-widest mb-16 max-w-2xl mx-auto opacity-70">
                Are you ready to deploy the future of kinetic architecture? Connect your node to the manifesto.
              </p>
              <motion.button 
                whileHover={{ scale: 1.1, skewX: -10 }}
                whileTap={{ scale: 0.9 }}
                className="bg-black text-white px-16 py-8 text-2xl font-black italic uppercase tracking-tighter shadow-2xl"
              >
                ACCESS_TERMINAL
              </motion.button>
            </div>
          </motion.div>
        </section>
      </main>
      
      <Footer />
      
      {/* Global Grain/Noise Overlay for that industrial mechanical feel */}
      <div className="fixed inset-0 pointer-events-none z-[1000] opacity-[0.03] contrast-150 mix-blend-overlay">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>

      {/* Frame Telemetry HUD (Bottom Left) */}
      <div className="fixed bottom-10 left-10 z-[100] hidden xl:block">
        <div className="p-4 border border-[#222] bg-black/80 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-2 h-2 bg-[#FAFF00] rounded-full animate-pulse" />
            <span className="text-[8px] font-black text-[#555] tracking-widest uppercase">System_Active_Node_77</span>
          </div>
          <div className="flex items-center gap-4">
             <div className="h-1 w-20 bg-[#222] overflow-hidden">
                <motion.div 
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="h-full w-10 bg-[#FAFF00]"
                />
             </div>
             <span className="text-[8px] font-black text-white tracking-widest uppercase">60_FPS</span>
          </div>
        </div>
      </div>
    </div>
  )
}
