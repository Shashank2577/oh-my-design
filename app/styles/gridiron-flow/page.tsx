'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, useInView, useVelocity } from 'framer-motion'
import { 
  ArrowRight, Activity, Zap, Shield, BarChart3, 
  ChevronDown, Check, Star, Menu, X, Crosshair, Map, Navigation,
  Flag, Goal
} from 'lucide-react'
import { Teko, Public_Sans } from 'next/font/google'

// ─────────────────────────────────────────────
// FONTS
// ─────────────────────────────────────────────
const displayFont = Teko({ subsets: ['latin'], weight: ['400', '700'] })
const bodyFont = Public_Sans({ subsets: ['latin'] })

// ─────────────────────────────────────────────
// TOKENS & SYSTEM
// ─────────────────────────────────────────────
const tokens = {
  background: '#121A12', // Deep Turf Green
  backgroundAlt: '#1E291E', // Endzone Grey
  foreground: '#FFFFFF',
  mutedForeground: '#A9B2A9',
  accent: '#F2F2F2', // Yard-line White
  accentForeground: '#121A12', 
  accent2: '#8B4513', // Pigskin Brown
  border: 'rgba(255, 255, 255, 0.2)', // Chalk lines
}

const PRODUCT_NAME = "GRIDIRON FLOW"

// Impact Physics: Camera shake/jolt on element entry
const impactSpring = {
  type: 'spring',
  stiffness: 400,
  damping: 15,
  mass: 1.5,
} as const

// ─────────────────────────────────────────────
// ANIMATION WRAPPERS
// ─────────────────────────────────────────────
// ImpactUp: Elements enter from below with a slight rotation and bounce, 
// mimicking the 'hit' of a football player or a heavy object dropping onto the field.
function ImpactUp({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) {
  return (
    <motion.div
      initial={{ y: 80, opacity: 0, rotate: -2 }}
      whileInView={{ y: 0, opacity: 1, rotate: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ ...impactSpring, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function StaggerContainer({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        visible: { transition: { staggerChildren: 0.15 } }
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const staggerItem = {
  hidden: { y: 40, opacity: 0, scale: 0.95 },
  visible: { 
    y: 0, 
    opacity: 1, 
    scale: 1,
    transition: impactSpring
  }
}

// ─────────────────────────────────────────────
// CONTENT DATA
// ─────────────────────────────────────────────
const STATS = [
  { label: 'Plays Analyzed', value: '4.2M' },
  { label: 'Teams Using GF', value: '120+' },
  { label: 'Avg. Yard Gain', value: '+3.5y' },
  { label: 'Win Probability Inc.', value: '18%' }
]

const FEATURES = [
  { icon: Crosshair, title: 'Precision Route Mapping', text: 'Draw and analyze routes with millimeter precision on our virtual turf.' },
  { icon: Activity, title: 'Kinetic Tracking', text: 'Measure player momentum, impact force, and acceleration in real-time.' },
  { icon: Map, title: 'Tactical Playbook', text: 'Interactive chalk-talk interface that turns raw plays into executable strategy.' },
  { icon: Shield, title: 'Defensive Formation AI', text: 'Predict opposing formations based on historical snap data.' }
]

const PRICING_TIERS = [
  {
    name: 'ROOKIE',
    price: '$49',
    period: 'mo',
    description: 'Essential analytics for high school programs.',
    features: ['Basic route mapping', 'Game day summaries', 'Up to 50 players'],
    cta: 'Start Scouting',
    highlighted: false
  },
  {
    name: 'VETERAN',
    price: '$199',
    period: 'mo',
    description: 'Advanced telemetry for competitive collegiate teams.',
    features: ['Kinetic tracking integration', 'Unlimited players', 'Real-time sideline sync'],
    cta: 'Upgrade Playbook',
    highlighted: true
  },
  {
    name: 'FRANCHISE',
    price: 'Custom',
    period: 'yr',
    description: 'Full-spectrum War Room setup for pro organizations.',
    features: ['Custom AI modeling', 'API Access', 'Dedicated strategists'],
    cta: 'Contact Front Office',
    highlighted: false
  }
]

const TESTIMONIALS = [
  { name: 'Coach Taylor', role: 'Head Coach', company: 'State U', text: 'Gridiron Flow turned our offense from predictable to unstoppable. The kinetic data is unmatched.', rating: 5 },
  { name: 'Marcus Johnson', role: 'Offensive Coordinator', company: 'City Hawks', text: 'The chalk-talk interface is exactly what we needed to get the whole squad on the same page.', rating: 5 },
  { name: 'Sarah Jenkins', role: 'Lead Analyst', company: 'Pro Scout Network', text: 'We evaluate thousands of plays. This platform handles the momentum of our data perfectly.', rating: 5 }
]

const FAQ_ITEMS = [
  { q: 'How does the kinetic tracking work?', a: 'We integrate with standard wearable RFID tags in player pads to track XYZ coordinates 100 times per second.' },
  { q: 'Can we import our existing playbook?', a: 'Yes. Gridiron Flow supports importing standard Visio and HUDL playbook formats directly into our tactical engine.' },
  { q: 'Is there a limit to how many games we can analyze?', a: 'The Veteran and Franchise tiers offer unlimited game analysis. Rookie tier is capped at 15 games per season.' }
]

// ─────────────────────────────────────────────
// COMPONENTS
// ─────────────────────────────────────────────

// ─────────────────────────────────────────────
// COMPONENT: Yard-line Progress Indicator
// Visualizes page scroll depth as "yards gained". Includes scroll-velocity
// stretching physics to reinforce the "Gridiron Flow" momentum theme.
// ─────────────────────────────────────────────
function YardLineProgress() {
  // Capture scroll progress globally
  const { scrollYProgress } = useScroll();
  
  // Track the velocity of the scroll to create a dynamic stretching effect
  const scrollVelocity = useVelocity(scrollYProgress);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });

  // Calculate the scale stretch (height) of the marker based on velocity
  // When velocity is 0, scale is 1. When high, scale increases, making it look like a stretched ball/marker.
  const velocityScaleY = useTransform(smoothVelocity, [-1, 0, 1], [2, 1, 2]);

  // Map 0-1 scroll progress to 0-100 yards for the label
  const yards = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const displayYards = useTransform(yards, y => Math.round(y));

  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 h-64 w-12 z-50 flex items-center justify-center hidden md:flex">
      {/* Background Line Track */}
      <div className="absolute inset-y-0 w-[2px] bg-white/20 left-1/2 -translate-x-1/2"></div>
      
      {/* The moving marker element. Notice we apply the scaleY driven by velocity here. */}
      <motion.div 
        className="absolute w-8 h-8 rounded-full border-2 bg-[#121A12] flex items-center justify-center shadow-lg"
        style={{ 
          borderColor: tokens.accent,
          top: useTransform(scrollYProgress, [0, 1], ['0%', '100%']),
          translateY: '-50%',
          scaleY: velocityScaleY
        }}
      >
        <motion.span 
          className={`${displayFont.className} text-xs font-bold`}
          style={{ color: tokens.accent }}
        >
          {displayYards}
        </motion.span>
      </motion.div>

      {/* Static Yard markers indicating 25-yard intervals */}
      {[0, 25, 50, 75, 100].map(y => (
        <div 
          key={y} 
          className="absolute w-full h-[1px] bg-white/20 left-0"
          style={{ top: `${y}%` }}
        />
      ))}
    </div>
  )
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <nav className="fixed top-0 w-full z-40 backdrop-blur-md border-b" style={{ borderColor: tokens.border, backgroundColor: `${tokens.background}E6` }}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <div className="w-8 h-8 rounded-sm rotate-45 border-2 flex items-center justify-center" style={{ borderColor: tokens.accent }}>
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: tokens.accent2 }} />
          </div>
          <span className={`${displayFont.className} font-bold text-2xl tracking-wide uppercase`} style={{ color: tokens.foreground }}>
            {PRODUCT_NAME}
          </span>
        </motion.div>
        
        <div className="hidden md:flex items-center gap-8">
          {['Playbook', 'Analytics', 'Recruiting', 'Pricing'].map(link => (
            <a key={link} href="#" className={`${displayFont.className} text-lg uppercase tracking-wider hover:opacity-100 opacity-70 transition-opacity`} style={{ color: tokens.foreground }}>
              {link}
            </a>
          ))}
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`${displayFont.className} px-6 py-2 rounded-sm font-bold text-xl uppercase tracking-wider`}
            style={{ backgroundColor: tokens.accent, color: tokens.accentForeground }}
          >
            Draft Now
          </motion.button>
        </div>

        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X color={tokens.foreground} /> : <Menu color={tokens.foreground} />}
        </button>
      </div>

      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden p-6 border-b"
          style={{ backgroundColor: tokens.backgroundAlt, borderColor: tokens.border }}
        >
          <div className="flex flex-col gap-4">
             {['Playbook', 'Analytics', 'Recruiting', 'Pricing'].map(link => (
              <a key={link} href="#" className={`${displayFont.className} text-xl uppercase tracking-wider`} style={{ color: tokens.foreground }}>
                {link}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  )
}

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden" style={{ backgroundColor: tokens.background }}>
      {/* Field Lines Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none flex flex-col justify-between py-20">
        {Array.from({ length: 11 }).map((_, i) => (
          <div key={i} className="w-full h-[2px] bg-white relative">
            <span className={`${displayFont.className} absolute left-8 -top-6 text-2xl font-bold text-white`}>
              {i < 5 ? i * 10 : (10 - i) * 10}
            </span>
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <ImpactUp>
              <div className="inline-block px-3 py-1 border mb-6 rounded-sm" style={{ borderColor: tokens.accent2, color: tokens.accent2 }}>
                <span className="text-xs font-bold tracking-widest uppercase">Version 3.0 Live</span>
              </div>
            </ImpactUp>
            
            <ImpactUp delay={0.1}>
              <h1 className={`${displayFont.className} text-6xl md:text-[100px] font-black leading-[0.9] uppercase tracking-tighter mb-6`} style={{ color: tokens.foreground }}>
                Control The <br/>
                <span style={{ color: tokens.accent2 }}>Trenches.</span>
              </h1>
            </ImpactUp>

            <ImpactUp delay={0.2}>
              <p className="text-xl mb-10 max-w-lg" style={{ color: tokens.mutedForeground }}>
                Tactical play-calling meets heavy-impact analytics. Outsmart the defense with kinetic telemetry and real-time chalk-talk strategies.
              </p>
            </ImpactUp>

            <ImpactUp delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button 
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className={`${displayFont.className} h-14 px-8 flex items-center justify-center gap-3 font-bold text-2xl uppercase tracking-wider`}
                  style={{ backgroundColor: tokens.accent, color: tokens.accentForeground }}
                >
                  Enter War Room
                  <ArrowRight className="h-5 w-5" />
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className={`${displayFont.className} h-14 px-8 flex items-center justify-center gap-3 font-bold text-2xl uppercase tracking-wider border-2`}
                  style={{ borderColor: tokens.border, color: tokens.foreground }}
                >
                  View Playbook
                </motion.button>
              </div>
            </ImpactUp>
          </div>

          <ImpactUp delay={0.4} className="relative aspect-square">
            <div className="absolute inset-0 rounded-sm border-4 flex items-center justify-center overflow-hidden" style={{ borderColor: tokens.border, backgroundColor: tokens.backgroundAlt }}>
              {/* Tactical Diagram Animation */}
              <svg viewBox="0 0 100 100" className="w-full h-full p-8 opacity-80">
                <motion.circle cx="20" cy="80" r="4" fill={tokens.accent2} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1 }} />
                <motion.circle cx="40" cy="80" r="4" fill={tokens.foreground} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.1 }} />
                <motion.circle cx="60" cy="80" r="4" fill={tokens.foreground} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.2 }} />
                <motion.circle cx="80" cy="80" r="4" fill={tokens.foreground} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.3 }} />
                
                {/* Routes */}
                <motion.path 
                  d="M20,80 C20,60 10,40 10,20" 
                  fill="none" 
                  stroke={tokens.accent2} 
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 1.5, ease: "easeOut" }}
                />
                <motion.path 
                  d="M40,80 L40,50 L70,30" 
                  fill="none" 
                  stroke={tokens.accent} 
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 1.6, ease: "easeOut" }}
                />
                <motion.path 
                  d="M80,80 L80,20" 
                  fill="none" 
                  stroke={tokens.accent} 
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 1.7, ease: "easeOut" }}
                />
              </svg>
            </div>
          </ImpactUp>
        </div>
      </div>
    </section>
  )
}

function Stats() {
  return (
    <section className="py-20 border-y-2 relative" style={{ borderColor: tokens.border, backgroundColor: tokens.backgroundAlt }}>
      <div className="absolute top-0 bottom-0 left-1/2 w-0.5 -translate-x-1/2 opacity-20 hidden md:block" style={{ backgroundColor: tokens.foreground }}></div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {STATS.map(stat => (
            <motion.div key={stat.label} variants={staggerItem} className="text-center">
              <p className={`${displayFont.className} text-5xl md:text-7xl font-black uppercase mb-2`} style={{ color: tokens.foreground }}>
                {stat.value}
              </p>
              <p className="text-sm font-bold uppercase tracking-widest" style={{ color: tokens.accent2 }}>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

function Features() {
  return (
    <section id="features" className="py-32" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-7xl mx-auto px-6">
        <ImpactUp>
          <div className="mb-20">
            <h2 className={`${displayFont.className} text-6xl md:text-[80px] font-black uppercase leading-none mb-6`} style={{ color: tokens.foreground }}>
              Heavy Artillery <br/>
              <span style={{ color: tokens.mutedForeground }}>For the Sideline.</span>
            </h2>
          </div>
        </ImpactUp>
        
        <StaggerContainer className="grid md:grid-cols-2 gap-8">
          {FEATURES.map((feat, i) => (
            <motion.div 
              key={i}
              variants={staggerItem}
              className="p-10 border-2 relative overflow-hidden group"
              style={{ borderColor: tokens.border, backgroundColor: tokens.backgroundAlt }}
            >
              <div className="absolute -right-10 -top-10 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                <feat.icon size={200} />
              </div>
              <div className="w-16 h-16 border-2 flex items-center justify-center mb-8 bg-black/20" style={{ borderColor: tokens.accent2 }}>
                <feat.icon className="h-8 w-8" style={{ color: tokens.accent2 }} />
              </div>
              <h3 className={`${displayFont.className} text-3xl font-bold uppercase mb-4 tracking-wide`} style={{ color: tokens.foreground }}>
                {feat.title}
              </h3>
              <p className="text-lg" style={{ color: tokens.mutedForeground }}>
                {feat.text}
              </p>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

function ProductDetail() {
  return (
    <section className="py-32 overflow-hidden border-y-2" style={{ borderColor: tokens.border, backgroundColor: tokens.backgroundAlt }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <ImpactUp>
            <h2 className={`${displayFont.className} text-5xl md:text-7xl font-black uppercase leading-[0.9] mb-8`} style={{ color: tokens.foreground }}>
              Analyze Every <br/>
              <span style={{ color: tokens.accent2 }}>Inch Of Turf.</span>
            </h2>
            <div className="space-y-6">
              {[
                "Measure closing speed on defensive backs.",
                "Calculate offensive line push in the trenches.",
                "Map exact catch radiuses for receivers."
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="mt-1 w-6 h-6 border flex items-center justify-center shrink-0" style={{ borderColor: tokens.accent2, backgroundColor: `${tokens.accent2}33` }}>
                    <Check className="h-4 w-4" style={{ color: tokens.accent }} />
                  </div>
                  <p className="text-lg" style={{ color: tokens.mutedForeground }}>{item}</p>
                </div>
              ))}
            </div>
          </ImpactUp>
          
          <ImpactUp delay={0.2} className="relative">
            <div className="aspect-[4/3] border-4 p-2 relative" style={{ borderColor: tokens.border }}>
               {/* Decorative corner accents */}
               <div className="absolute -top-2 -left-2 w-4 h-4 border-t-4 border-l-4" style={{ borderColor: tokens.accent2 }}></div>
               <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-4 border-r-4" style={{ borderColor: tokens.accent2 }}></div>
               
               <div className="w-full h-full bg-[#121A12] relative overflow-hidden flex items-center justify-center">
                 {/* Yard lines inside the detail box */}
                 <div className="absolute inset-0 flex flex-col justify-between py-8 opacity-20 pointer-events-none">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="w-full h-[1px] bg-white"></div>
                    ))}
                 </div>
                 
                 <motion.div 
                    animate={{ 
                      y: [0, -20, 0],
                      rotate: [0, 5, 0]
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="w-32 h-48 border-2 border-dashed flex items-center justify-center relative z-10"
                    style={{ borderColor: tokens.accent2, backgroundColor: 'rgba(139, 69, 19, 0.1)' }}
                 >
                    <Goal className="w-12 h-12 opacity-50" style={{ color: tokens.accent }} />
                 </motion.div>
               </div>
            </div>
          </ImpactUp>
        </div>
      </div>
    </section>
  )
}

function Pricing() {
  return (
    <section id="pricing" className="py-32" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-7xl mx-auto px-6">
        <ImpactUp>
          <div className="text-center mb-20">
            <h2 className={`${displayFont.className} text-6xl md:text-[80px] font-black uppercase leading-none mb-6`} style={{ color: tokens.foreground }}>
              Draft Your <br/>
              <span style={{ color: tokens.accent2 }}>Contract.</span>
            </h2>
          </div>
        </ImpactUp>

        <StaggerContainer className="grid md:grid-cols-3 gap-8">
          {PRICING_TIERS.map((tier) => (
            <motion.div
              key={tier.name}
              variants={staggerItem}
              className={`p-8 border-2 relative flex flex-col ${tier.highlighted ? 'scale-105 z-10' : ''}`}
              style={{ 
                borderColor: tier.highlighted ? tokens.accent2 : tokens.border,
                backgroundColor: tokens.backgroundAlt 
              }}
            >
              {tier.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#8B4513] text-white text-xs font-bold uppercase tracking-widest">
                  Starting Roster
                </div>
              )}
              <h3 className={`${displayFont.className} text-3xl font-bold uppercase mb-2`} style={{ color: tokens.foreground }}>{tier.name}</h3>
              <div className="flex items-baseline gap-2 mb-4 border-b-2 pb-6" style={{ borderColor: tokens.border }}>
                <span className={`${displayFont.className} text-5xl font-black`} style={{ color: tokens.foreground }}>{tier.price}</span>
                <span className="text-sm font-bold uppercase tracking-widest" style={{ color: tokens.mutedForeground }}>/ {tier.period}</span>
              </div>
              <p className="text-sm mb-8 flex-grow" style={{ color: tokens.mutedForeground }}>{tier.description}</p>
              
              <ul className="space-y-4 mb-10">
                {tier.features.map(f => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <Flag className="h-5 w-5 shrink-0" style={{ color: tokens.accent2 }} />
                    <span style={{ color: tokens.foreground }}>{f}</span>
                  </li>
                ))}
              </ul>

              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`${displayFont.className} w-full h-14 font-bold text-xl uppercase tracking-wider border-2`}
                style={tier.highlighted
                  ? { backgroundColor: tokens.accent2, color: tokens.foreground, borderColor: tokens.accent2 }
                  : { backgroundColor: 'transparent', color: tokens.foreground, borderColor: tokens.border }
                }
              >
                {tier.cta}
              </motion.button>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

function Testimonials() {
  return (
    <section id="testimonials" className="py-32 border-y-2" style={{ borderColor: tokens.border, backgroundColor: tokens.backgroundAlt }}>
      <div className="max-w-7xl mx-auto px-6">
        <ImpactUp>
          <div className="mb-20">
            <h2 className={`${displayFont.className} text-5xl md:text-7xl font-black uppercase leading-none mb-6`} style={{ color: tokens.foreground }}>
              Post-Game <br/>
              <span style={{ color: tokens.mutedForeground }}>Press Conference.</span>
            </h2>
          </div>
        </ImpactUp>
        
        <StaggerContainer className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map(t => (
            <motion.div
              key={t.name}
              variants={staggerItem}
              className="p-8 border-2 relative"
              style={{ borderColor: tokens.border, backgroundColor: tokens.background }}
            >
              {/* Quote Mark Decoration */}
              <div className={`${displayFont.className} absolute top-4 right-6 text-6xl opacity-10`} style={{ color: tokens.foreground }}>"</div>
              
              <div className="flex mb-6">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" style={{ color: tokens.accent2 }} />
                ))}
              </div>
              <p className="text-lg leading-relaxed mb-8 italic" style={{ color: tokens.foreground }}>"{t.text}"</p>
              <div className="border-t-2 pt-4" style={{ borderColor: tokens.border }}>
                <p className={`${displayFont.className} font-bold text-2xl uppercase tracking-wide`} style={{ color: tokens.foreground }}>{t.name}</p>
                <p className="text-sm font-bold uppercase tracking-widest" style={{ color: tokens.accent2 }}>{t.role} · {t.company}</p>
              </div>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="py-32" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-4xl mx-auto px-6">
        <ImpactUp>
          <div className="text-center mb-20">
            <h2 className={`${displayFont.className} text-6xl md:text-[80px] font-black uppercase leading-none mb-6`} style={{ color: tokens.foreground }}>
              Coaches' <br/>
              <span style={{ color: tokens.accent2 }}>Rulebook.</span>
            </h2>
          </div>
        </ImpactUp>
        
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, i) => (
            <ImpactUp key={i} delay={i * 0.1}>
              <div className="border-2" style={{ borderColor: tokens.border }}>
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left"
                  style={{ backgroundColor: tokens.backgroundAlt }}
                >
                  <span className={`${displayFont.className} text-2xl font-bold uppercase tracking-wide pr-8`} style={{ color: tokens.foreground }}>{item.q}</span>
                  <motion.span
                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="shrink-0"
                  >
                    <ChevronDown className="h-6 w-6" style={{ color: tokens.accent2 }} />
                  </motion.span>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openIndex === i ? 'auto' : 0, opacity: openIndex === i ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  style={{ overflow: 'hidden' }}
                >
                  <div className="p-6 border-t-2" style={{ borderColor: tokens.border, backgroundColor: tokens.background }}>
                    <p className="text-lg leading-relaxed" style={{ color: tokens.mutedForeground }}>
                      {item.a}
                    </p>
                  </div>
                </motion.div>
              </div>
            </ImpactUp>
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
    <section className="py-32 border-y-2 relative overflow-hidden" style={{ borderColor: tokens.border, backgroundColor: tokens.accent2 }}>
      {/* Decorative slant */}
      <div className="absolute inset-0 opacity-10" style={{ 
        backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 2px, transparent 2px, transparent 10px)'
      }}></div>

      <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
        <ImpactUp>
          <h2 className={`${displayFont.className} text-5xl md:text-7xl font-black uppercase mb-6`} style={{ color: tokens.foreground }}>
            Join the Training Camp
          </h2>
          <p className="text-xl mb-10 font-bold" style={{ color: tokens.foreground }}>
            Get weekly scouting reports and product updates.
          </p>
          
          {status === 'success' ? (
            <div className="inline-block px-8 py-4 border-4 bg-[#121A12]" style={{ borderColor: tokens.foreground }}>
              <p className={`${displayFont.className} text-3xl font-black uppercase`} style={{ color: tokens.foreground }}>You're on the roster.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center">
              <input
                type="email"
                required
                placeholder="YOUR EMAIL"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className={`${displayFont.className} flex-1 max-w-sm h-16 px-6 border-4 text-2xl uppercase tracking-wider bg-[#121A12] placeholder:text-gray-500 outline-none focus:border-white transition-colors`}
                style={{ borderColor: tokens.foreground, color: tokens.foreground }}
              />
              <motion.button
                type="submit"
                disabled={status === 'loading'}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`${displayFont.className} h-16 px-10 font-black text-2xl uppercase tracking-widest bg-white disabled:opacity-60`}
                style={{ color: tokens.accentForeground }}
              >
                {status === 'loading' ? 'SCOUTING...' : 'SUBSCRIBE'}
              </motion.button>
            </form>
          )}
        </ImpactUp>
      </div>
    </section>
  )
}

function Footer() {
  const links = {
    Tactics: ['Playbook', 'Pricing', 'Changelog', 'Roadmap'],
    Franchise: ['About Us', 'Coaches', 'Careers', 'Press'],
    Resources: ['Docs', 'API', 'Scouting Reports', 'Status'],
    Legal: ['Privacy', 'Terms', 'Security'],
  }

  return (
    <footer className="py-20" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-12 mb-16">
          <div className="col-span-2 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
               <div className="w-6 h-6 rounded-sm rotate-45 border-2 flex items-center justify-center" style={{ borderColor: tokens.accent }}>
                 <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: tokens.accent2 }} />
               </div>
               <span className={`${displayFont.className} font-bold text-3xl tracking-wide uppercase`} style={{ color: tokens.foreground }}>
                 {PRODUCT_NAME}
               </span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: tokens.mutedForeground }}>
              Engineering the ultimate advantage on the gridiron. Precision data for the modern coaching staff.
            </p>
          </div>
          
          {Object.entries(links).map(([group, items]) => (
            <div key={group} className="col-span-1">
              <p className={`${displayFont.className} font-bold text-xl uppercase tracking-wider mb-6`} style={{ color: tokens.foreground }}>{group}</p>
              <ul className="space-y-3">
                {items.map(item => (
                  <li key={item}>
                    <a href="#" className="text-sm font-bold uppercase tracking-wider hover:opacity-100 opacity-60 transition-opacity" style={{ color: tokens.mutedForeground }}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t-2" style={{ borderColor: tokens.border }}>
          <p className="text-sm font-bold uppercase tracking-widest" style={{ color: tokens.mutedForeground }}>
            © {new Date().getFullYear()} {PRODUCT_NAME}. ALL RIGHTS RESERVED.
          </p>
          <a
            href="/"
            className={`${displayFont.className} text-lg uppercase tracking-wider px-4 py-2 border-2 hover:bg-white/5 transition-colors`}
            style={{ borderColor: tokens.border, color: tokens.foreground }}
          >
            ← BACK TO LOCKER ROOM
          </a>
        </div>
      </div>
    </footer>
  )
}

// ─────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────
export default function GridironFlowPage() {
  return (
    <div className={`${bodyFont.className} min-h-screen selection:bg-[#8B4513] selection:text-white`} style={{ backgroundColor: tokens.background }}>
      <YardLineProgress />
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
