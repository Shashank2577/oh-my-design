'use client'

import { motion, useReducedMotion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Orbitron, Share_Tech_Mono } from 'next/font/google'
import {
  Zap, Disc, Waves, Music, Star, ArrowRight,
  MonitorPlay, Terminal, Sparkles, Check
} from 'lucide-react'

// ─────────────────────────────────────────────
// FONTS
// ─────────────────────────────────────────────
const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
})

const shareTechMono = Share_Tech_Mono({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

// ─────────────────────────────────────────────
// DESIGN TOKENS
// ─────────────────────────────────────────────
const tokens = {
  background: '#090014',
  foreground: '#E0E0E0',
  card: '#1a103c',
  magenta: '#FF00FF',
  cyan: '#00FFFF',
  orange: '#FF9900',
  border: '#2D1B4E',
}

// ─────────────────────────────────────────────
// MOTION HELPERS
// ─────────────────────────────────────────────
function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-5% 0px' })
  const shouldReduce = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      initial={shouldReduce ? false : { opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

function StaggerContainer({ children }: { children: React.ReactNode }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-5% 0px' })
  const shouldReduce = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      initial={shouldReduce ? false : 'hidden'}
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.08 } },
      }}
    >
      {children}
    </motion.div>
  )
}

const staggerItem: import('framer-motion').Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────
const PRODUCT_NAME = 'NEON_DREAM'
const TAGLINE = 'SYNTHETIC REALITY WAITS'
const DESCRIPTION = 'JACK INTO THE VIRTUAL GRID. EXPERIENCE CLOUD COMPUTING AT THE SPEED OF LIGHT WITH OUR RETRO-FUTURISTIC MAINFRAME.'

const NAV_LINKS = ['SYSTEMS', 'PLANS', 'NETWORK', 'FILES']

const STATS = [
  { value: '1.2TB/s', label: 'BANDWIDTH' },
  { value: '99.9%', label: 'STABILITY' },
  { value: '∞', label: 'VIRTUAL_SPACE' },
  { value: '2088', label: 'BUILD_YEAR' },
]

const FEATURES = [
  { icon: MonitorPlay, title: 'VIRTUAL_DESKTOP', description: 'STREAM FULL DESKTOP ENVIRONMENTS DIRECTLY TO YOUR CORTEX CORTEX WITH ZERO LATENCY.' },
  { icon: Terminal, title: 'SYNTH_TERMINAL', description: 'EXECUTE COMMANDS IN A FULLY IMMERSIVE 3D COMMAND LINE ENVIRONMENT.' },
  { icon: Disc, title: 'LASER_STORAGE', description: 'BACKUP YOUR DIGITAL CONSCIOUSNESS ON OUR UNBREAKABLE OPTICAL ARRAYS.' },
  { icon: Waves, title: 'OUTRUN_PROTOCOL', description: 'BYPASS STANDARD ISP LIMITS USING OUR PROPRIETARY HIGHWAY ROUTING SYSTEM.' },
  { icon: Music, title: 'AESTHETIC_SYNC', description: 'AUTO-GENERATED CHILLWAVE SOUNDTRACKS THAT MATCH YOUR PRODUCTIVITY STATE.' },
  { icon: Sparkles, title: 'NEON_RENDER', description: 'REAL-TIME RAYTRACING FOR ALL UI ELEMENTS. EVERYTHING GLOWS.' },
]

const PRICING = [
  {
    name: 'CASSETTE',
    price: '¥0',
    period: 'MO',
    description: 'ANALOG TIER. GOOD FOR STARTERS.',
    features: ['64KB RAM', '1 VIRTUAL DISK', 'STANDARD COLORS', 'DIAL-UP SPEEDS'],
    cta: 'INITIATE',
    highlighted: false,
  },
  {
    name: 'LASERDISC',
    price: '¥29',
    period: 'MO',
    description: 'HIGH DEFINITION DIGITAL TIER.',
    features: ['16MB RAM', 'UNLIMITED DISKS', 'NEON COLORSPACE', 'FIBER SPEEDS', 'BBS ACCESS'],
    cta: 'UPGRADE NOW',
    highlighted: true,
  },
  {
    name: 'HOLOGRAM',
    price: '¥99',
    period: 'MO',
    description: 'DIRECT CORTICAL UPLOAD TIER.',
    features: ['INFINITE RAM', 'QUANTUM STORAGE', 'CUSTOM HOLOGRAMS', 'NEURAL SPEEDS', 'PRIVATE GRID'],
    cta: 'TRANSCEND',
    highlighted: false,
  },
]

const TESTIMONIALS = [
  {
    name: 'KID_C-RON',
    role: 'CYBER-JOCKEY',
    company: 'ARCADE_CITY',
    text: 'THE AESTHETICS ARE UNMATCHED. MY PRODUCTIVITY SKYROCKETED ONCE I JACKED INTO THE NEON GRID.',
    rating: 5,
  },
  {
    name: 'AURA_99',
    role: 'SYNTH_WEAVER',
    company: 'NEO_TOKYO',
    text: 'I HAVE NEVER EXPERIENCED SUCH SMOOTH RENDER SPEEDS. THE OUTRUN PROTOCOL IS REVOLUTIONARY.',
    rating: 5,
  },
  {
    name: 'DATA_GHOST',
    role: 'HACKER',
    company: 'THE_SPRAWL',
    text: 'FINALLY A SYSTEM THAT UNDERSTANDS TRUE CYBERSPACE. THE TERMINAL INTERFACE IS FLAWLESS.',
    rating: 5,
  },
]

const FAQ_ITEMS = [
  { q: 'DO I NEED NEURAL IMPLANTS?', a: 'NO IMPLANTS REQUIRED. OUR SYSTEMS INTERFACE DIRECTLY WITH STANDARD OPTICAL RECEPTORS VIA RETRO-MONITORS.' },
  { q: 'CAN I EXPORT MY CORTICAL DATA?', a: 'YES. ALL DATA CAN BE BACKED UP TO PHYSICAL MAGNETIC TAPE OR STANDARD CLOUD PROTOCOLS.' },
  { q: 'WHAT IS THE OUTRUN PROTOCOL?', a: 'A PROPRIETARY ROUTING SYSTEM THAT BYPASSES MAINSTREAM NETWORKS, OFFERING UNPRECEDENTED SPEEDS.' },
  { q: 'DO YOU ACCEPT DIGITAL CURRENCY?', a: 'WE ACCEPT ALL MAJOR DIGITAL CREDITS, BIT-COINS, AND ARCADE TOKENS.' },
  { q: 'HOW DO I CUSTOMIZE THE NEON COLORS?', a: 'ACCESS THE CONTROL PANEL TERMINAL AND RUN `COLORCFG --NEON`. COMPLETE RGB CONTROL IS YOURS.' },
  { q: 'IS THE SYSTEM Y2K COMPLIANT?', a: 'OUR SYSTEMS ARE BUILT FOR THE YEAR 2088. Y2K WAS A BUMP IN THE ROAD WE PASSED LONG AGO.' },
]

// ─────────────────────────────────────────────
// COMPONENTS
// ─────────────────────────────────────────────

function GlobalEffects() {
  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        /* Perspective Grid */
        .vapor-grid {
          background-image:
            linear-gradient(transparent 95%, rgba(255, 0, 255, 0.8) 95%),
            linear-gradient(90deg, transparent 95%, rgba(255, 0, 255, 0.8) 95%);
          background-size: 40px 40px;
          transform: perspective(500px) rotateX(60deg) translateY(-100px) scale(2);
          mask-image: linear-gradient(to bottom, transparent, black 80%);
          -webkit-mask-image: linear-gradient(to bottom, transparent, black 80%);
          z-index: 0;
        }

        /* CRT Scanlines */
        .scanlines {
          background: linear-gradient(rgba(18,16,20,0) 50%, rgba(0,0,0,0.25) 50%);
          background-size: 100% 4px;
          z-index: 50;
          pointer-events: none;
        }

        /* Glitch Animation */
        @keyframes vaporGlitch {
          0%, 100% { transform: translate(0); text-shadow: -2px 0 #00FFFF, 2px 0 #FF00FF; }
          20% { transform: translate(-2px, 1px); text-shadow: 2px 0 #00FFFF, -2px 0 #FF00FF; }
          40% { transform: translate(1px, -1px); text-shadow: -2px 0 #00FFFF, 2px 0 #FF00FF; }
          60% { transform: translate(-1px, 2px); text-shadow: 2px 0 #00FFFF, -2px 0 #FF00FF; }
          80% { transform: translate(2px, -1px); text-shadow: -2px 0 #00FFFF, 2px 0 #FF00FF; }
        }
        .vapor-glitch-hover:hover {
          animation: vaporGlitch 0.2s linear infinite;
        }

        .glow-text {
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        }
        .glow-magenta {
          text-shadow: 0 0 10px #FF00FF, 0 0 20px #FF00FF;
        }
        .glow-cyan {
          text-shadow: 0 0 10px #00FFFF, 0 0 20px #00FFFF;
        }
      `}} />
      <div className="fixed inset-0 scanlines" />
    </>
  )
}

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 border-b-2 bg-[#090014]/80 backdrop-blur-md" style={{ borderColor: tokens.magenta }}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <span className="font-heading font-black text-2xl uppercase tracking-wider glow-cyan" style={{ color: tokens.cyan }}>
          {PRODUCT_NAME}
        </span>
        <div className="hidden md:flex items-center gap-8 font-mono">
          {NAV_LINKS.map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-sm tracking-widest uppercase transition-all duration-200 hover:text-[#00FFFF] vapor-glitch-hover"
              style={{ color: tokens.foreground }}
            >
              {link}
            </a>
          ))}
        </div>
        <motion.button
          className="group relative h-10 px-6 font-mono text-sm tracking-widest uppercase -skew-x-12 transform border-2 transition-all duration-200 hover:skew-x-0"
          style={{ borderColor: tokens.cyan, color: tokens.cyan, backgroundColor: 'transparent' }}
          whileHover={{
            backgroundColor: tokens.cyan,
            color: '#000',
            boxShadow: `0 0 20px ${tokens.cyan}`
          }}
        >
          <span className="inline-block skew-x-12 transform group-hover:skew-x-0 transition-transform duration-200">
            CONNECT
          </span>
        </motion.button>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section className="min-h-dvh flex items-center pt-16 relative overflow-hidden bg-[#090014]">
      {/* Background Sun */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[100px] opacity-30 z-0 bg-gradient-to-b from-[#FF9900] to-[#FF00FF]" />

      {/* Perspective Grid Floor */}
      <div className="absolute bottom-0 left-0 right-0 h-[60vh] vapor-grid" />

      <div className="max-w-6xl mx-auto px-6 py-24 w-full relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.15, delayChildren: 0.1 }}
          className="max-w-4xl text-center mx-auto"
        >
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-mono text-lg uppercase tracking-widest mb-6 glow-magenta"
            style={{ color: tokens.magenta }}
          >
            {'>'} SYSTEM_READY
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="font-heading font-black text-6xl md:text-8xl leading-tight mb-8 uppercase"
          >
            <span className="bg-gradient-to-r from-[#FF9900] via-[#FF00FF] to-[#00FFFF] bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(255,0,255,0.6)]">
              {TAGLINE}
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-mono text-xl md:text-2xl mb-12 max-w-2xl mx-auto leading-relaxed uppercase"
            style={{ color: tokens.foreground }}
          >
            {DESCRIPTION}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row justify-center gap-6"
          >
            <motion.button
              className="group relative h-14 px-10 font-mono text-lg font-bold tracking-widest uppercase -skew-x-12 transform border-2 transition-all duration-200 hover:skew-x-0"
              style={{ borderColor: tokens.magenta, backgroundColor: tokens.magenta, color: '#fff' }}
              whileHover={{
                scale: 1.05,
                boxShadow: `0 0 30px ${tokens.magenta}`
              }}
            >
              <span className="inline-block skew-x-12 transform group-hover:skew-x-0 transition-transform duration-200">
                START_SESSION
              </span>
            </motion.button>
            <motion.button
              className="group relative h-14 px-10 font-mono text-lg font-bold tracking-widest uppercase -skew-x-12 transform border-2 transition-all duration-200 hover:skew-x-0"
              style={{ borderColor: tokens.cyan, backgroundColor: 'transparent', color: tokens.cyan }}
              whileHover={{
                backgroundColor: tokens.cyan,
                color: '#000',
                boxShadow: `0 0 20px ${tokens.cyan}`
              }}
            >
              <span className="inline-block flex items-center gap-2 skew-x-12 transform group-hover:skew-x-0 transition-transform duration-200">
                VIEW_SPECS <ArrowRight className="h-5 w-5" />
              </span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function Stats() {
  return (
    <section className="relative z-20 border-y-2 border-[#FF00FF]/50 bg-[#090014]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <StaggerContainer>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map(stat => (
              <motion.div key={stat.label} variants={staggerItem} className="text-center font-mono">
                <p className="font-heading font-black text-4xl md:text-5xl mb-2 glow-cyan" style={{ color: tokens.cyan }}>
                  {stat.value}
                </p>
                <p className="text-sm tracking-widest uppercase" style={{ color: tokens.magenta }}>
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  )
}

function Features() {
  return (
    <section id="systems" className="py-24 relative z-10 bg-[#090014]">
      {/* Decorative Dot Pattern */}
      <div
        className="absolute inset-0 z-0 opacity-20"
        style={{ backgroundImage: `radial-gradient(${tokens.magenta} 1px, transparent 1px)`, backgroundSize: '20px 20px' }}
      />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <FadeUp>
          <div className="text-center mb-16">
            <p className="font-mono text-sm uppercase tracking-widest mb-3 glow-magenta" style={{ color: tokens.magenta }}>
              {'>'} DIR /SYSTEMS
            </p>
            <h2 className="font-heading font-black text-4xl md:text-6xl mb-4 uppercase glow-cyan" style={{ color: tokens.cyan }}>
              CORE_MODULES
            </h2>
          </div>
        </FadeUp>
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FEATURES.map(feature => (
              <motion.div
                key={feature.title}
                variants={staggerItem}
                className="group relative p-8 bg-[#1a103c]/80 backdrop-blur-md border border-[#FF00FF]/30 border-t-2 border-t-[#00FFFF] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(0,255,255,0.2)]"
              >
                <div className="mb-6 relative w-12 h-12 flex items-center justify-center">
                  <div className="absolute inset-0 border-2 border-[#FF00FF] rotate-45 group-hover:rotate-90 transition-transform duration-500" />
                  <feature.icon className="h-6 w-6 relative z-10 group-hover:scale-110 transition-transform" style={{ color: tokens.cyan }} />
                </div>
                <h3 className="font-heading font-semibold text-2xl mb-3 uppercase drop-shadow-[0_0_5px_rgba(0,255,255,0.8)]" style={{ color: tokens.cyan }}>
                  {feature.title}
                </h3>
                <p className="font-mono text-sm leading-relaxed uppercase" style={{ color: tokens.foreground, opacity: 0.8 }}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  )
}

function ProductDetail() {
  return (
    <section id="network" className="py-24 relative z-10 bg-[#090014]">
      <div className="max-w-5xl mx-auto px-6">
        <FadeUp>
          <div className="border-2 border-[#00FFFF] bg-black/80 shadow-[0_0_20px_rgba(0,255,255,0.2)]">
            {/* Title Bar */}
            <div className="flex items-center justify-between bg-[#00FFFF]/10 border-b-2 border-[#00FFFF] px-4 py-3">
              <span className="font-mono text-sm uppercase tracking-widest glow-cyan" style={{ color: tokens.cyan }}>
                VIEWER.EXE
              </span>
              <div className="flex gap-2">
                <div className="h-3 w-3 bg-[#FF00FF] shadow-[0_0_5px_#FF00FF]" />
                <div className="h-3 w-3 bg-[#00FFFF] shadow-[0_0_5px_#00FFFF]" />
                <div className="h-3 w-3 bg-[#FF9900] shadow-[0_0_5px_#FF9900]" />
              </div>
            </div>
            {/* Content */}
            <div className="p-8 md:p-12">
              <h2 className="font-heading font-black text-4xl md:text-5xl mb-8 uppercase bg-gradient-to-r from-[#FF00FF] to-[#00FFFF] bg-clip-text text-transparent">
                THE FUTURE IS NOW
              </h2>
              <div className="space-y-6 font-mono text-lg uppercase leading-relaxed text-[#E0E0E0]/90">
                <p>
                  {'>'} OUR VIRTUAL INFRASTRUCTURE IS BUILT ON THE ASHES OF THE OLD WEB. WE'VE CONSTRUCTED A NEON UTOPIA WHERE BANDWIDTH IS INFINITE AND RESOLUTION IS FLAWLESS.
                </p>
                <p>
                  {'>'} PLUG INTO THE MAIN FRAME AND LEAVE THE ANALOG WORLD BEHIND. THE GRID OFFERS UNPARALLELED CREATIVE FREEDOM WITHOUT CORPORATE OVERSIGHT.
                </p>
                <p className="text-[#FF00FF] glow-magenta">
                  {'>'} AESTHETICS ARE NOT A LUXURY. THEY ARE A REQUIREMENT.
                </p>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

function Pricing() {
  return (
    <section id="plans" className="py-24 relative z-10 bg-[#090014]">
      <div className="max-w-7xl mx-auto px-6">
        <FadeUp>
          <div className="text-center mb-16">
            <p className="font-mono text-sm uppercase tracking-widest mb-3 glow-cyan" style={{ color: tokens.cyan }}>
              {'>'} CHOOSE_ACCESS_LEVEL
            </p>
            <h2 className="font-heading font-black text-4xl md:text-6xl mb-4 uppercase glow-magenta" style={{ color: tokens.magenta }}>
              SUBSCRIPTIONS
            </h2>
          </div>
        </FadeUp>
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PRICING.map((tier, i) => (
              <motion.div
                key={tier.name}
                variants={staggerItem}
                className="relative p-8 bg-[#1a103c]/90 backdrop-blur-md border-2 transition-all duration-300"
                style={{
                  borderColor: tier.highlighted ? tokens.cyan : `${tokens.magenta}40`,
                  boxShadow: tier.highlighted ? `0 0 30px rgba(0,255,255,0.2)` : 'none',
                  transform: tier.highlighted ? 'scale(1.05)' : 'scale(1)',
                  zIndex: tier.highlighted ? 10 : 1
                }}
              >
                {tier.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#00FFFF] text-black font-mono font-bold px-4 py-1 text-xs uppercase tracking-widest shadow-[0_0_10px_#00FFFF]">
                    RECOMMENDED
                  </div>
                )}
                <h3 className="font-heading font-bold text-3xl mb-2 uppercase" style={{ color: tokens.foreground }}>
                  {tier.name}
                </h3>
                <div className="flex items-baseline gap-2 mb-4 font-mono">
                  <span className="text-5xl font-black" style={{ color: tier.highlighted ? tokens.cyan : tokens.magenta, textShadow: `0 0 10px ${tier.highlighted ? tokens.cyan : tokens.magenta}` }}>
                    {tier.price}
                  </span>
                  <span className="text-sm uppercase text-[#E0E0E0]/60">/ {tier.period}</span>
                </div>
                <p className="font-mono text-sm mb-8 uppercase text-[#E0E0E0]/80 h-10">
                  {tier.description}
                </p>
                <ul className="space-y-4 mb-8 font-mono text-sm uppercase">
                  {tier.features.map(f => (
                    <li key={f} className="flex items-start gap-3">
                      <Check className="h-5 w-5 shrink-0" style={{ color: tier.highlighted ? tokens.cyan : tokens.magenta }} />
                      <span style={{ color: tokens.foreground }}>{f}</span>
                    </li>
                  ))}
                </ul>
                <motion.button
                  className="w-full group relative h-12 px-6 font-mono text-sm font-bold tracking-widest uppercase -skew-x-12 transform border-2 transition-all duration-200 hover:skew-x-0"
                  style={tier.highlighted
                    ? { borderColor: tokens.cyan, backgroundColor: tokens.cyan, color: '#000' }
                    : { borderColor: tokens.magenta, backgroundColor: 'transparent', color: tokens.magenta }
                  }
                  whileHover={{
                    backgroundColor: tier.highlighted ? tokens.cyan : tokens.magenta,
                    color: tier.highlighted ? '#000' : '#fff',
                    boxShadow: `0 0 20px ${tier.highlighted ? tokens.cyan : tokens.magenta}`
                  }}
                >
                  <span className="inline-block skew-x-12 transform group-hover:skew-x-0 transition-transform duration-200">
                    {tier.cta}
                  </span>
                </motion.button>
              </motion.div>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  )
}

function Testimonials() {
  return (
    <section className="py-24 relative z-10 bg-[#090014]">
      {/* Perspective Grid Floor */}
      <div className="absolute bottom-0 left-0 right-0 h-[40vh] vapor-grid opacity-50" style={{ transform: 'perspective(500px) rotateX(70deg) translateY(-50px) scale(2)' }}/>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <FadeUp>
          <div className="text-center mb-16">
            <h2 className="font-heading font-black text-4xl md:text-6xl mb-4 uppercase bg-gradient-to-r from-[#FF9900] to-[#FF00FF] bg-clip-text text-transparent">
              USER_LOGS
            </h2>
          </div>
        </FadeUp>
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map(t => (
              <motion.div
                key={t.name}
                variants={staggerItem}
                className="p-8 bg-[#1a103c]/90 backdrop-blur-md border-l-4 border-l-[#FF00FF] border-r border-y border-[#FF00FF]/20"
              >
                <div className="flex mb-6">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" style={{ color: tokens.orange, filter: `drop-shadow(0 0 5px ${tokens.orange})` }} />
                  ))}
                </div>
                <p className="font-mono text-sm leading-relaxed mb-8 uppercase text-[#E0E0E0]">
                  "{t.text}"
                </p>
                <div className="font-mono text-xs uppercase">
                  <p className="font-bold text-[#00FFFF] mb-1 glow-cyan">{'<'}{t.name}{'>'}</p>
                  <p className="text-[#FF00FF]">{t.role} @ {t.company}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  )
}

function FAQ() {
  return (
    <section className="py-24 relative z-10 bg-[#090014]">
      <div className="max-w-4xl mx-auto px-6">
        <FadeUp>
          <div className="text-center mb-16">
            <p className="font-mono text-sm uppercase tracking-widest mb-3 glow-magenta" style={{ color: tokens.magenta }}>
              {'>'} HELP.TXT
            </p>
            <h2 className="font-heading font-black text-4xl md:text-5xl uppercase glow-cyan" style={{ color: tokens.cyan }}>
              QUERY_DATABASE
            </h2>
          </div>
        </FadeUp>
        <div className="space-y-6">
          {FAQ_ITEMS.map((item, i) => (
            <FadeUp key={i} delay={i * 0.05}>
              <div className="border-2 border-[#00FFFF]/30 bg-[#1a103c]/50 backdrop-blur hover:border-[#00FFFF] transition-colors">
                <div className="p-6">
                  <p className="font-mono font-bold text-sm mb-3 uppercase" style={{ color: tokens.cyan }}>
                    <span className="text-[#FF00FF] mr-2">Q:</span>{item.q}
                  </p>
                  <p className="font-mono text-sm leading-relaxed uppercase text-[#E0E0E0]/80">
                    <span className="text-[#FF9900] mr-2">A:</span>{item.a}
                  </p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}

function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setTimeout(() => setStatus('success'), 1200)
  }

  return (
    <section className="py-32 relative z-10 bg-[#090014] overflow-hidden">
      {/* Massive Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[800px] rounded-full blur-[120px] opacity-20 bg-gradient-to-r from-[#FF00FF] to-[#00FFFF] z-0 pointer-events-none" />

      <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
        <FadeUp>
          <h2 className="font-heading font-black text-5xl md:text-6xl mb-6 uppercase drop-shadow-[0_0_20px_rgba(255,0,255,0.8)]" style={{ color: tokens.magenta }}>
            JOIN_THE_GRID
          </h2>
          <p className="font-mono text-lg mb-10 uppercase text-[#E0E0E0]/80">
            TRANSMIT YOUR CONTACT SIGNAL FOR NETWORK UPDATES.
          </p>

          <div className="bg-black/60 p-8 border-2 border-[#FF00FF] shadow-[0_0_30px_rgba(255,0,255,0.3)] backdrop-blur-lg">
            {status === 'success' ? (
              <p className="font-mono font-bold text-lg uppercase glow-cyan" style={{ color: tokens.cyan }}>
                [ SIGNAL_RECEIVED. WELCOME. ]
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  required
                  placeholder="ENTER_SIGNAL_ADDR..."
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="flex-1 h-14 px-4 bg-black/50 border-b-2 border-[#00FFFF] font-mono text-sm uppercase text-[#00FFFF] placeholder:text-[#00FFFF]/30 focus:outline-none focus:bg-[#00FFFF]/10 focus:shadow-[0_0_15px_rgba(0,255,255,0.3)] transition-all"
                />
                <motion.button
                  type="submit"
                  disabled={status === 'loading'}
                  className="group relative h-14 px-8 font-mono text-sm font-bold tracking-widest uppercase -skew-x-12 transform border-2 transition-all duration-200 hover:skew-x-0 disabled:opacity-50"
                  style={{ borderColor: tokens.magenta, backgroundColor: tokens.magenta, color: '#fff' }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: `0 0 20px ${tokens.magenta}`
                  }}
                >
                  <span className="inline-block skew-x-12 transform group-hover:skew-x-0 transition-transform duration-200">
                    {status === 'loading' ? 'TRANSMITTING...' : 'CONNECT'}
                  </span>
                </motion.button>
              </form>
            )}
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

function Footer() {
  const links = {
    DIRECTORIES: ['/FEATURES', '/PRICING', '/UPDATES', '/ROADMAP'],
    CORPORATION: ['/ABOUT_US', '/CAREERS', '/PRESS', '/CONTACT'],
    DATABANKS: ['/MANUALS', '/API_DOCS', '/GUIDES', '/STATUS'],
    PROTOCOLS: ['/PRIVACY', '/TERMS', '/COOKIES', '/SECURITY'],
  }

  return (
    <footer className="py-16 relative z-10 bg-[#090014] border-t-2 border-[#2D1B4E]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-16">
          <div className="col-span-2 md:col-span-1">
            <p className="font-heading font-black text-2xl mb-4 uppercase glow-cyan" style={{ color: tokens.cyan }}>
              {PRODUCT_NAME}
            </p>
            <p className="font-mono text-sm leading-relaxed uppercase text-[#E0E0E0]/60">
              BUILDING TOMORROW'S VIRTUAL REALITY, TODAY.
            </p>
          </div>
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <p className="font-mono font-bold text-sm mb-6 uppercase glow-magenta" style={{ color: tokens.magenta }}>
                {group}
              </p>
              <ul className="space-y-3 font-mono">
                {items.map(item => (
                  <li key={item}>
                    <a href="#" className="text-sm uppercase text-[#E0E0E0]/70 hover:text-[#00FFFF] hover:drop-shadow-[0_0_5px_#00FFFF] transition-all">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-[#2D1B4E] gap-4 font-mono text-xs uppercase text-[#E0E0E0]/50">
          <p>
            © 2088 {PRODUCT_NAME} INC. ALL RIGHTS RESERVED.
          </p>
          <a
            href="/"
            className="px-4 py-2 border border-[#2D1B4E] hover:border-[#FF00FF] hover:text-[#FF00FF] transition-colors"
          >
            {'<'} RETURN_TO_BASE
          </a>
        </div>
      </div>
    </footer>
  )
}

// ─────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────
export default function StylePage() {
  return (
    <div className={`${orbitron.variable} ${shareTechMono.variable} min-h-screen selection:bg-[#FF00FF] selection:text-white`} style={{ backgroundColor: tokens.background }}>
      <GlobalEffects />
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Features />
        <ProductDetail />
        <Pricing />
        <Testimonials />
        <FAQ />
        <Newsletter />
      </main>
      <Footer />
    </div>
  )
}
