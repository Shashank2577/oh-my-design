'use client'

/**
 * MAXIMALISM - KINETIC DESIGN PROTOCOL
 * Style: Sensory Overload
 * 
 * This page implements the "Kinetic Design Protocol" with a focus on 
 * extreme visual density, overlapping layers, and high-energy interactions.
 * 
 * KEY FEATURES:
 * 1. 5+ Layers of Parallax: Creating a deep, immersive 3D space using scroll-linked transforms.
 * 2. Element Collisions: Interactive elements that "react" and "bump" into each other on scroll.
 * 3. High-Fidelity Framer Motion: Using spring physics for all animations to ensure a tactile, responsive feel.
 * 4. Sensory Overload Ethos: Vibrance, complexity, and unapologetic abundance in every pixel.
 */

import React, { useRef, useMemo } from 'react'
import { 
  motion, 
  useScroll, 
  useTransform, 
  useSpring, 
  useVelocity,
  AnimatePresence
} from 'framer-motion'
import { 
  Zap, 
  Sparkles, 
  Layers, 
  Activity, 
  Cpu, 
  Orbit, 
  Trophy, 
  Rocket, 
  Fingerprint, 
  Globe, 
  Box, 
  Compass, 
  ZapOff,
  Star,
  Flame,
  Dna,
  Infinity as InfinityIcon
} from 'lucide-react'
import { Inter, Syne, Space_Mono } from 'next/font/google'

// --- Fonts ---
const inter = Inter({ subsets: ['latin'] })
const syne = Syne({ subsets: ['latin'], weight: ['400', '700', '800'] })
const mono = Space_Mono({ subsets: ['latin'], weight: ['400', '700'] })

// --- Design Tokens (from DESIGN_SYSTEM.md) ---
const tokens = {
  colors: {
    primaryBg: "#120458", // Deep Cosmic Purple
    voidBlack: "#000000",
    hyperPink: "#FF00FF",
    electricCyan: "#00FFFF",
    solarFlare: "#FAFF00",
    pureWhite: "#FFFFFF",
    silverMist: "#A0A0A0"
  },
  physics: {
    // High-energy spring with low damping for that "maximalist" snap
    kinetic: { 
      type: "spring" as const, 
      stiffness: 400, 
      damping: 20, 
      mass: 1 
    },
    heavy: {
      type: "spring" as const,
      stiffness: 100,
      damping: 30,
      mass: 2
    }
  }
}

// --- Parallax Layer Component ---
/**
 * ParallaxLayer
 * A wrapper that offsets its children based on the scroll position.
 * @param speed - The factor of scroll offset to apply (e.g., 0.5 means it moves at half speed)
 */
const ParallaxLayer = ({ children, speed = 0.5, className = "", style = {} }: any) => {
  const { scrollY } = useScroll()
  // Transform scroll position into a Y offset based on speed
  const y = useTransform(scrollY, [0, 5000], [0, 5000 * speed])
  
  return (
    <motion.div style={{ y, ...style }} className={`absolute inset-0 ${className}`}>
      {children}
    </motion.div>
  )
}

// --- Collision Element Component ---
/**
 * CollisionElement
 * An element that reacts visually when it reaches a certain scroll threshold.
 * It simulates a "collision" by scaling, rotating, or shifting abruptly.
 */
const CollisionElement = ({ children, threshold = 0.5, className = "", index = 0 }: any) => {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Collision triggers: When the element passes the threshold in the viewport
  const scale = useTransform(scrollYProgress, 
    [threshold - 0.05, threshold, threshold + 0.05], 
    [1, 1.4, 1.2]
  )
  const rotate = useTransform(scrollYProgress, 
    [threshold - 0.1, threshold, threshold + 0.1], 
    [index % 2 === 0 ? -5 : 5, index % 2 === 0 ? 15 : -15, 0]
  )
  const xOffset = useTransform(scrollYProgress, 
    [threshold - 0.05, threshold, threshold + 0.05], 
    [0, index % 2 === 0 ? 50 : -50, 0]
  )

  const springScale = useSpring(scale, tokens.physics.kinetic)
  const springRotate = useSpring(rotate, tokens.physics.kinetic)
  const springX = useSpring(xOffset, tokens.physics.kinetic)

  return (
    <motion.div 
      ref={containerRef}
      style={{ scale: springScale, rotate: springRotate, x: springX }}
      className={`relative z-20 ${className}`}
    >
      {children}
    </motion.div>
  )
}

// --- Background Components ---

/**
 * Noise Texture Overlay
 */
const NoiseOverlay = () => (
  <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.05] mix-blend-overlay">
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <filter id="noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noise)" />
    </svg>
  </div>
)

/**
 * Layered Parallax Background
 */
const LayeredBackground = () => {
  return (
    <div className="fixed inset-0 z-0 bg-[#120458] overflow-hidden">
      {/* Layer 1: Deep Distant Stars (Speed 0.05) */}
      <ParallaxLayer speed={0.05}>
        <div className="absolute inset-0 bg-[radial-gradient(white_1px,transparent_1px)] [background-size:100px_100px] opacity-20" />
      </ParallaxLayer>

      {/* Layer 2: Cosmic Clouds (Speed 0.1) */}
      <ParallaxLayer speed={0.1}>
        <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_30%_30%,rgba(255,0,255,0.1)_0%,transparent_50%)]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_70%_70%,rgba(0,255,255,0.1)_0%,transparent_50%)]" />
      </ParallaxLayer>

      {/* Layer 3: Geometric Grid (Speed 0.2) */}
      <ParallaxLayer speed={0.2}>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] [background-size:50px_50px]" />
      </ParallaxLayer>

      {/* Layer 4: Floating Shapes (Speed 0.4) */}
      <ParallaxLayer speed={0.4}>
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] border border-[#FF00FF]/10 rounded-full"
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 right-1/4 w-[700px] h-[700px] border border-[#00FFFF]/10 rounded-full"
        />
      </ParallaxLayer>

      {/* Layer 5: Foreground Dust (Speed 0.8) */}
      <ParallaxLayer speed={0.8}>
        <div className="absolute inset-0 bg-[radial-gradient(white_2px,transparent_2px)] [background-size:200px_200px] opacity-10" />
      </ParallaxLayer>
    </div>
  )
}

// --- UI Sections ---

const Navbar = () => (
  <nav className="fixed top-0 left-0 w-full z-[1000] p-8">
    <div className="max-w-screen-2xl mx-auto flex items-center justify-between mix-blend-difference">
      <motion.div 
        whileHover={{ scale: 1.1, rotate: -2 }}
        className={`${syne.className} text-4xl font-black text-white uppercase tracking-tighter flex items-center gap-2`}
      >
        <div className="w-12 h-12 bg-[#FF00FF] rounded-none flex items-center justify-center">
          <Orbit size={32} />
        </div>
        MAXIMALISM
      </motion.div>

      <div className={`hidden lg:flex items-center gap-12 ${mono.className} text-[10px] font-bold tracking-[0.4em] uppercase text-white/70`}>
        {['Sensory', 'Overload', 'Kinetic', 'Logic'].map(item => (
          <motion.a 
            key={item} 
            href="#" 
            whileHover={{ scale: 1.2, color: "#FF00FF", y: -2 }}
            className="hover:text-white transition-colors"
          >
            {item}
          </motion.a>
        ))}
      </div>

      <motion.button 
        whileHover={{ scale: 1.05, skewX: -10, boxShadow: "10px 10px 0px #00FFFF" }}
        whileTap={{ scale: 0.95 }}
        className={`${syne.className} bg-[#FF00FF] text-white px-8 py-4 font-extrabold uppercase italic tracking-tighter text-sm`}
      >
        ENTER_CORE
      </motion.button>
    </div>
  </nav>
)

const Hero = () => {
  const { scrollY } = useScroll()
  const velocity = useVelocity(scrollY)
  const skew = useSpring(useTransform(velocity, [-3000, 3000], [-10, 10]), tokens.physics.kinetic)
  const scale = useSpring(useTransform(velocity, [-3000, 3000], [1, 1.1]), tokens.physics.kinetic)

  return (
    <section className="min-h-screen relative flex items-center justify-center px-10 pt-32 overflow-hidden">
      <motion.div 
        style={{ skewY: skew, scale }}
        className="max-w-7xl mx-auto text-center relative z-10"
      >
        <CollisionElement threshold={0.1}>
          <div className={`inline-flex items-center gap-4 px-6 py-2 bg-white text-black mb-12 ${mono.className} text-xs font-bold tracking-[0.5em] uppercase`}>
            <Zap size={16} fill="black" />
            PROTOCOL_07: SENSORY_OVERLOAD
          </div>
        </CollisionElement>

        <h1 className={`${syne.className} text-[clamp(4rem,15vw,18rem)] font-extrabold text-white leading-[0.75] uppercase italic tracking-tighter mb-16 relative`}>
          <motion.span 
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ ...tokens.physics.kinetic, delay: 0.2 }}
            className="block"
          >
            MORE IS
          </motion.span>
          <motion.span 
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ ...tokens.physics.kinetic, delay: 0.4 }}
            className="block text-transparent bg-clip-text bg-gradient-to-r from-[#FF00FF] via-[#00FFFF] to-[#FAFF00] py-4"
          >
            ALWAYS MORE.
          </motion.span>
        </h1>

        <div className="flex flex-wrap justify-center items-center gap-12 mt-20">
          <motion.button 
            whileHover={{ scale: 1.1, rotate: -5 }}
            className={`${syne.className} text-3xl font-black text-white underline decoration-[#FF00FF] decoration-8 underline-offset-8 uppercase italic cursor-pointer`}
          >
            LAUNCH_EXPLOSION
          </motion.button>
          
          <div className="flex items-center gap-6">
            {[Box, Globe, Dna].map((Icon, i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 1.5, rotate: 180, color: "#00FFFF" }}
                className="p-6 border-4 border-white/20 text-white cursor-help"
              >
                <Icon size={32} />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Overlapping Hero Graphics */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <ParallaxLayer speed={0.15}>
          <div className="absolute top-[20%] left-[-5%] w-[40vw] h-[40vw] border-[40px] border-[#FF00FF]/20 rounded-full mix-blend-screen animate-pulse" />
        </ParallaxLayer>
        <ParallaxLayer speed={0.3}>
          <div className="absolute bottom-[10%] right-[-10%] w-[50vw] h-[50vw] border-[60px] border-[#00FFFF]/20 rotate-45 mix-blend-screen" />
        </ParallaxLayer>
      </div>
    </section>
  )
}

const FeatureGrid = () => {
  const features = [
    { title: 'Chromatic Surge', icon: Sparkles, color: '#FF00FF', desc: 'Saturated color systems that bleed beyond their containers, creating a vibrant digital landscape.' },
    { title: 'Fractal Motion', icon: InfinityIcon, color: '#00FFFF', desc: 'Recursive animation loops that maintain energy across every viewport transition.' },
    { title: 'Hyper-Layering', icon: Layers, color: '#FAFF00', desc: 'Deep-stack parallax architecture with 5+ independent planes of visual movement.' },
    { title: 'Collision Logic', icon: Activity, color: '#FFFFFF', desc: 'Interactive elements that simulate physical presence through scroll-linked repulsion.' },
    { title: 'Aesthetic Excess', icon: Flame, color: '#FF00FF', desc: 'Rejecting minimalism for a dense, unadorned experience that rewards discovery.' },
    { title: 'Core Telemetry', icon: Cpu, color: '#00FFFF', desc: 'Real-time performance monitoring within high-vibrance rendering environments.' }
  ]

  return (
    <section className="py-40 px-10 relative z-10 bg-[#000000]/50 backdrop-blur-3xl">
      <div className="max-w-screen-2xl mx-auto">
        <div className="mb-32 flex flex-col items-center text-center">
          <div className={`${mono.className} text-[#FF00FF] text-xs font-bold tracking-[0.8em] mb-8 uppercase`}>
            [ DATA_DENSITY_STREAMS ]
          </div>
          <h2 className={`${syne.className} text-7xl lg:text-9xl font-extrabold text-white leading-none uppercase italic tracking-tighter`}>
            VISUAL <br/> <span className="text-transparent border-4 border-[#00FFFF] px-4">OVERFLOW.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
          {features.map((feature, i) => (
            <CollisionElement key={i} index={i} threshold={0.4}>
              <motion.div 
                whileHover={{ y: -20, backgroundColor: feature.color, color: "#000000" }}
                className="bg-[#120458] border-2 border-white/10 p-16 h-full flex flex-col transition-all duration-300 group cursor-crosshair"
              >
                <div className="mb-12">
                  <feature.icon size={64} className="group-hover:scale-150 transition-transform duration-500" />
                </div>
                <h3 className={`${syne.className} text-4xl font-black mb-8 uppercase italic tracking-tighter`}>{feature.title}</h3>
                <p className={`text-lg leading-relaxed font-medium opacity-60 group-hover:opacity-100 ${inter.className}`}>
                  {feature.desc}
                </p>
                <div className="mt-auto pt-12 flex items-center justify-between">
                  <span className={`${mono.className} text-[10px] font-bold tracking-widest`}>ST_NODE_{i + 1}</span>
                  <div className="w-12 h-px bg-white/20 group-hover:bg-black transition-colors" />
                </div>
              </motion.div>
            </CollisionElement>
          ))}
        </div>
      </div>
    </section>
  )
}

const Showcase = () => (
  <section className="py-60 relative overflow-hidden bg-[#120458]">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,255,0.15)_0%,transparent_70%)]" />
    
    <div className="max-w-screen-2xl mx-auto px-10 grid lg:grid-cols-2 gap-32 items-center relative z-10">
      <div className="relative">
        <CollisionElement threshold={0.5} index={1}>
          <div className="aspect-[4/5] bg-black border-8 border-[#FF00FF] p-4 relative overflow-hidden group">
            <div className="absolute inset-0 bg-[#FF00FF]/10 z-0" />
            <div className="w-full h-full border-4 border-[#00FFFF] flex items-center justify-center relative z-10">
               {/* Simulating the "Sensory Overload" Hero Asset */}
               <motion.div 
                animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="w-3/4 h-3/4 border-2 border-dashed border-white/30 rounded-full flex items-center justify-center"
               >
                  <Orbit size={120} className="text-white opacity-40" />
               </motion.div>
               
               <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className={`${syne.className} text-9xl font-black text-white/10 mix-blend-overlay rotate-90`}>OVERLOAD</div>
               </div>
            </div>
            
            {/* HUD Overlays */}
            <div className={`absolute bottom-8 left-8 ${mono.className} text-[8px] font-bold text-[#FF00FF] tracking-[0.5em] uppercase`}>
              VERIFIED_ESTHETIC_V7.2
            </div>
          </div>
        </CollisionElement>
        
        {/* Overlapping Tags */}
        <motion.div 
          animate={{ x: [-10, 10], y: [-10, 10] }}
          transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
          className="absolute -top-10 -left-10 bg-[#FAFF00] text-black px-12 py-6 text-4xl font-black italic shadow-[20px_20px_0_#FF00FF] z-30"
        >
          MAX_POWER
        </motion.div>
      </div>

      <div>
        <div className={`${mono.className} text-[#00FFFF] text-xs font-bold tracking-[0.6em] mb-12 uppercase`}>
          [ AESTHETIC_PHILOSOPHY ]
        </div>
        <h2 className={`${syne.className} text-8xl lg:text-9xl font-extrabold text-white leading-tight uppercase italic tracking-tighter mb-12`}>
          REJECT <br/> <span className="bg-[#FF00FF] text-white px-6 py-2">BORING.</span>
        </h2>
        <div className="space-y-10 text-2xl font-bold text-white/70 leading-relaxed italic">
          <p>The digital age shouldn't be monochrome. We embrace the noise, the color, and the density of high-fidelity existence.</p>
          <p>Sensory Overload is not a bug; it's a feature of modern living. We build interfaces that match the speed of thought.</p>
        </div>
        
        <div className="mt-20 flex flex-wrap gap-8">
          <motion.button 
            whileHover={{ scale: 1.1, x: 20 }}
            className={`${syne.className} bg-[#00FFFF] text-black px-12 py-6 text-xl font-black uppercase italic tracking-tighter shadow-[10px_10px_0_#FFFFFF]`}
          >
            DECODE_DATA
          </motion.button>
          <div className="flex gap-4">
             {[Trophy, Rocket, Fingerprint].map((Icon, i) => (
               <div key={i} className="p-6 bg-white/5 border-2 border-white/10 text-white hover:bg-[#FF00FF] transition-colors">
                  <Icon size={24} />
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  </section>
)

const Footer = () => (
  <footer className="py-40 px-10 bg-black border-t-8 border-[#FF00FF] relative overflow-hidden">
    {/* Background Decorative Text */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap opacity-[0.02] pointer-events-none select-none">
      <span className={`${syne.className} text-[30rem] font-black italic`}>MAXIMALISM</span>
    </div>

    <div className="max-w-screen-2xl mx-auto relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-32 mb-40">
        <div className="lg:col-span-2">
          <div className={`${syne.className} text-6xl font-black text-white uppercase italic tracking-tighter mb-12 flex items-center gap-4`}>
            <div className="w-16 h-16 bg-[#00FFFF] flex items-center justify-center">
              <InfinityIcon size={40} className="text-black" />
            </div>
            MAX
          </div>
          <p className="text-2xl font-bold text-white/40 uppercase tracking-widest leading-loose max-w-xl">
            THE GLOBAL STANDARD FOR SENSORY OVERLOAD AND MAXIMALIST INTERFACE DESIGN. EMBRACING THE NOISE SINCE 2026.
          </p>
        </div>

        {[
          { title: 'Streams', links: ['Hyper_Color', 'Fractal_Motion', 'Collision_Log', 'Telemetry'] },
          { title: 'Archive', links: ['Case_Studies', 'Blueprints', 'Asset_Vault', 'Protocols'] }
        ].map((group, i) => (
          <div key={i}>
            <div className={`${mono.className} text-[#FF00FF] text-[10px] font-bold tracking-[0.6em] mb-12 uppercase`}>{group.title}</div>
            <ul className="space-y-6">
              {group.links.map(link => (
                <li key={link}>
                  <motion.a 
                    href="#" 
                    whileHover={{ x: 10, color: "#00FFFF" }}
                    className="text-xl font-black text-white/60 uppercase italic transition-colors block"
                  >
                    {link}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="pt-20 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-12">
        <div className={`${mono.className} text-[10px] font-bold text-white/30 tracking-[0.8em] uppercase`}>
          © 2026 MAX_CORP // UNAPOLOGETIC_EXISTENCE
        </div>
        <div className="flex gap-12 text-white/50">
          {[Star, ZapOff, Compass].map((Icon, i) => (
            <motion.div key={i} whileHover={{ scale: 1.5, color: "#FF00FF", rotate: 360 }} className="cursor-pointer transition-colors">
              <Icon size={24} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </footer>
)

// --- Main Page Component ---

export default function MaximalismPage() {
  return (
    <div className={`min-h-screen bg-black text-white overflow-x-hidden selection:bg-[#FAFF00] selection:text-black ${inter.className}`}>
      {/* Texture & Parallax Background */}
      <NoiseOverlay />
      <LayeredBackground />
      
      {/* Navigation */}
      <Navbar />
      
      {/* Content Layers */}
      <main className="relative z-10">
        <Hero />
        
        {/* Collision Interaction Section */}
        <section className="py-20 border-y-2 border-white/10 bg-white/5 backdrop-blur-md">
          <div className="max-w-screen-2xl mx-auto px-10 flex flex-wrap justify-between items-center gap-12">
            {[
              { label: 'Saturation', val: '140%', icon: Activity },
              { label: 'Layer Density', val: '08+', icon: Layers },
              { label: 'Motion Velocity', val: '6.2m/s', icon: Zap },
              { label: 'Visual Noise', val: 'Minimal', icon: Sparkles }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 1.1, color: "#FAFF00" }}
                className="flex items-center gap-6 group cursor-wait"
              >
                <stat.icon className="text-[#FF00FF] group-hover:text-[#FAFF00]" size={32} />
                <div>
                  <div className={`${syne.className} text-5xl font-black italic tracking-tighter`}>{stat.val}</div>
                  <div className={`${mono.className} text-[10px] font-bold uppercase tracking-widest opacity-40`}>{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <FeatureGrid />
        <Showcase />

        {/* Massive Call to Action */}
        <section className="py-60 px-10 relative overflow-hidden">
          <div className="max-w-7xl mx-auto relative z-10">
            <CollisionElement threshold={0.5}>
              <div className="bg-[#FF00FF] p-24 text-center relative overflow-hidden group shadow-[40px_40px_0_#00FFFF]">
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none" />
                <div className="absolute -top-20 -right-20 p-20 opacity-10 group-hover:rotate-45 transition-transform duration-700">
                  <Orbit size={500} />
                </div>

                <h2 className={`${syne.className} text-7xl lg:text-[10rem] font-black text-white leading-none uppercase italic tracking-tighter mb-16 relative z-10`}>
                  DIVE INTO <br/> <span className="bg-black text-[#FAFF00] px-8">THE VOID.</span>
                </h2>
                <p className={`text-2xl font-bold uppercase tracking-[0.3em] mb-20 max-w-2xl mx-auto text-black/70 ${mono.className}`}>
                  THE SYSTEM IS READY. ARE YOU PREPARED FOR THE SENSORY OVERLOAD?
                </p>
                <motion.button 
                  whileHover={{ scale: 1.1, rotate: 2, skewX: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-white text-black px-20 py-10 text-4xl font-black uppercase italic tracking-tighter shadow-2xl hover:bg-[#FAFF00] transition-colors"
                >
                  INITIALIZE_OVERLOAD
                </motion.button>
              </div>
            </CollisionElement>
          </div>
        </section>
      </main>

      {/* Persistent HUD Element (Bottom Right) */}
      <div className="fixed bottom-12 right-12 z-[1000] mix-blend-difference hidden md:block">
        <div className="p-6 border-4 border-white flex flex-col items-end gap-2">
          <div className="flex items-center gap-3">
             <div className="w-3 h-3 bg-[#00FFFF] rounded-none animate-ping" />
             <span className={`${mono.className} text-xs font-bold text-white tracking-widest uppercase`}>LIVE_TELEMETRY</span>
          </div>
          <div className={`${syne.className} text-4xl font-black text-white italic`}>60_FPS</div>
        </div>
      </div>
    </div>
  )
}
