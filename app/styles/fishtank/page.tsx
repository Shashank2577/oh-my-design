'use client'

import React, { useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Check, ChevronDown, Activity, Droplets, Fish, Layers, Zap, Shield, Database, Cpu } from 'lucide-react'
import { Space_Mono, Plus_Jakarta_Sans } from 'next/font/google'

const spaceMono = Space_Mono({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-space-mono' })
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-jakarta' })

// ─────────────────────────────────────────────
// DESIGN TOKENS
// ─────────────────────────────────────────────
const tokens = {
  background: '#001219', // Abyssal Blue
  surface: '#00212E', // Deep Reef
  accent: '#94D2BD', // Seafoam Glow
  accent2: '#EE9B00', // Clownfish Amber
  border: 'rgba(148, 210, 189, 0.1)',
  foreground: '#E9D8A6',
  mutedForeground: '#005F73',
}

const PRODUCT_NAME = "FishTank"

// ─────────────────────────────────────────────
// MOTION ARCHITECTURE
// ─────────────────────────────────────────────
const physics = {
  buoyancy: { type: 'spring', stiffness: 40, damping: 25, mass: 2 } as const,
  bloop: { type: 'spring', stiffness: 300, damping: 15 } as const,
}

function BuoyancyUp({ children, delay = 0, className = '' }: { children: React.ReactNode, delay?: number, className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ ...physics.buoyancy, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function StaggerBuoyancy({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        show: { transition: { staggerChildren: 0.15 } }
      }}
    >
      {children}
    </motion.div>
  )
}

const buoyancyItem: import('framer-motion').Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: physics.buoyancy }
}

function BioluminescenceText({ children }: { children: React.ReactNode }) {
  return (
    <motion.span
      animate={{ opacity: [0.6, 1, 0.6], textShadow: [`0 0 10px ${tokens.accent}`, `0 0 20px ${tokens.accent}`, `0 0 10px ${tokens.accent}`] }}
      transition={{ duration: 3, repeat: Infinity, ease: [0.42, 0, 0.58, 1] as [number, number, number, number] }}
      style={{ color: tokens.accent }}
    >
      {children}
    </motion.span>
  )
}

function SchoolingDataBackground() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-30">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight
          }}
          animate={{
            x: [null, Math.random() * window.innerWidth, Math.random() * window.innerWidth],
            y: [null, Math.random() * window.innerHeight, Math.random() * window.innerHeight],
          }}
          transition={{
            duration: 20 + Math.random() * 20,
            repeat: Infinity,
            ease: [0, 0, 1, 1] as [number, number, number, number]
          }}
          className="absolute font-space-mono text-[10px]"
          style={{ color: tokens.mutedForeground }}
        >
          {Math.random() > 0.5 ? '10110' : '01001'}
        </motion.div>
      ))}
      {/* Bioluminescence ambient glow */}
      <motion.div
        animate={{ opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 5, repeat: Infinity, ease: [0.42, 0, 0.58, 1] as [number, number, number, number] }}
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[100px]"
        style={{ backgroundColor: tokens.accent }}
      />
      <motion.div
        animate={{ opacity: [0.05, 0.15, 0.05] }}
        transition={{ duration: 7, repeat: Infinity, ease: [0.42, 0, 0.58, 1] as [number, number, number, number], delay: 2 }}
        className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] rounded-full blur-[120px]"
        style={{ backgroundColor: tokens.accent2 }}
      />
    </div>
  )
}

function DataButton({ children, className = '', style, onClick, type = "button", disabled }: { children: React.ReactNode, className?: string, style?: React.CSSProperties, onClick?: () => void, type?: "button" | "submit" | "reset", disabled?: boolean }) {
  return (
    <motion.button
      whileHover={disabled ? undefined : { scale: 1.05, textShadow: `0 0 8px currentColor` }}
      whileTap={disabled ? undefined : { scale: 0.95 }}
      className={`font-space-mono uppercase tracking-widest text-sm border rounded-sm relative overflow-hidden group ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      style={style}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      <span className="relative z-10">{children}</span>
      {!disabled && (
         <motion.div
            className="absolute inset-0 opacity-20 group-hover:opacity-100 transition-opacity"
            style={{ backgroundColor: 'currentColor' }}
         />
      )}
    </motion.button>
  )
}

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────
const FEATURES = [
  { icon: Activity, title: "Parameter Telemetry", desc: "Real-time monitoring of pH, salinity, ammonia, and temperature with neural-net predictive alerts." },
  { icon: Droplets, title: "Fluid Dynamics Engine", desc: "Automated dosing and water change schedules based on actual metabolic consumption rates." },
  { icon: Zap, title: "Spectrum Control", desc: "Bioluminescent-mimicking LED control with weather and lunar cycle synchronization." },
]

const STATS = [
  { value: "99.9%", label: "Uptime" },
  { value: "4.2M", label: "Data Points/Hr" },
  { value: "<5ms", label: "Reaction Time" },
]

const PRICING = [
  {
    name: "Nano",
    price: "$29",
    period: "mo",
    description: "Core telemetry for single display tanks.",
    features: ["Basic parameter logging", "Email alerts", "30-day data retention", "1 Controller node"],
    cta: "Deploy Nano",
    highlighted: false
  },
  {
    name: "Abyss",
    price: "$89",
    period: "mo",
    description: "Enterprise-grade intelligence for multi-system breeders.",
    features: ["Predictive AI alerts", "Automated dosing API", "Unlimited data retention", "Up to 5 Controller nodes"],
    cta: "Initialize Abyss",
    highlighted: true
  }
]

const TESTIMONIALS = [
  {
    name: "Dr. Aris Thorne",
    role: "Marine Biologist",
    text: "The telemetry granularity provided by FishTank is unprecedented. We caught an ammonia spike 12 hours before it would have become fatal to our cephalopod exhibit.",
    rating: 5
  },
  {
    name: "Sarah Chen",
    role: "Reef Breeder",
    text: "Since migrating to the Abyss plan, our acropora growth rates have increased by 40%. The automated spectrum and dosing algorithms are flawless.",
    rating: 5
  },
  {
    name: "James Volkov",
    role: "Public Aquarium Tech",
    text: "Managing 50,000 gallons used to require a team of 4. Now, FishTank acts as our central nervous system. The AI predictions are terrifyingly accurate.",
    rating: 5
  }
]

const FAQ_ITEMS = [
  { q: "Is the hardware proprietary?", a: "No. FishTank's core OS is compatible with most standard marine aquarium probes (Apex, GHL, Seneye) via our universal bridge module." },
  { q: "What happens if my internet goes down?", a: "FishTank controllers have local failover. They will continue to execute their last known safe algorithm and cache data locally until uplink is restored." },
  { q: "How does the AI predictive modeling work?", a: "We aggregate anonymized telemetry from thousands of systems globally. Our models learn the subtle precursor parameter shifts that indicate impending crashes." },
  { q: "Can I write my own automation scripts?", a: "Yes, the Abyss tier includes full access to our REST API and webhook system for custom node.js or python integrations." }
]

// ─────────────────────────────────────────────
// COMPONENTS
// ─────────────────────────────────────────────
function Navbar() {
  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={physics.buoyancy}
      className="fixed top-0 w-full z-50 bg-opacity-80 backdrop-blur-md border-b"
      style={{ backgroundColor: 'rgba(0, 18, 25, 0.8)', borderColor: tokens.border }}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Fish className="h-6 w-6" style={{ color: tokens.accent }} />
          <span className="text-xl font-space-mono font-bold tracking-widest uppercase" style={{ color: tokens.foreground }}>
            {PRODUCT_NAME}
          </span>
        </div>
        <div className="hidden md:flex gap-8">
          {['Telemetry', 'Architecture', 'Nodes'].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-space-mono uppercase tracking-widest hover:text-accent transition-colors" style={{ color: tokens.mutedForeground }}>
              {item}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <a href="#" className="hidden sm:block text-sm font-space-mono uppercase tracking-widest hover:opacity-80 transition-opacity" style={{ color: tokens.foreground }}>[ Login ]</a>
          <DataButton className="px-6 py-2" style={{ backgroundColor: 'transparent', borderColor: tokens.accent, color: tokens.accent }}>
            Initialize
          </DataButton>
        </div>
      </div>
    </motion.nav>
  )
}

function Hero() {
  return (
    <section className="relative pt-32 pb-24 min-h-screen flex items-center overflow-hidden" style={{ backgroundColor: tokens.background }}>
      <SchoolingDataBackground />
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10 w-full">
        <div>
          <BuoyancyUp>
            <div className="inline-flex items-center gap-2 px-3 py-1 border rounded-sm mb-8 font-space-mono text-xs uppercase tracking-widest" style={{ borderColor: tokens.border, color: tokens.accent }}>
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: tokens.accent }} />
              System Online v3.4.1
            </div>
          </BuoyancyUp>
          <BuoyancyUp delay={0.1}>
            <h1 className="text-5xl md:text-7xl font-jakarta font-bold leading-tight mb-6" style={{ color: tokens.foreground }}>
              Submerged <br/>
              <BioluminescenceText>Intelligence.</BioluminescenceText>
            </h1>
          </BuoyancyUp>
          <BuoyancyUp delay={0.2}>
            <p className="text-lg md:text-xl font-jakarta leading-relaxed max-w-lg mb-10" style={{ color: tokens.mutedForeground }}>
              Enterprise-grade telemetry and predictive AI automation for marine ecosystems. Monitor, predict, and control the abyss.
            </p>
          </BuoyancyUp>
          <BuoyancyUp delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4">
              <DataButton className="h-12 px-8" style={{ backgroundColor: tokens.accent, borderColor: tokens.accent, color: tokens.background }}>
                Deploy Node
              </DataButton>
              <DataButton className="h-12 px-8" style={{ backgroundColor: 'transparent', borderColor: tokens.mutedForeground, color: tokens.foreground }}>
                View Documentation
              </DataButton>
            </div>
          </BuoyancyUp>
        </div>

        <div className="relative h-[500px] w-full hidden lg:block perspective-1000">
           <motion.div
             animate={{
               y: [-10, 10, -10],
               rotateX: [5, -5, 5],
               rotateY: [-5, 5, -5]
             }}
             transition={{ duration: 10, repeat: Infinity, ease: [0.42, 0, 0.58, 1] as [number, number, number, number] }}
             className="w-full h-full transform-style-3d relative"
           >
             {/* Abstract Dashboard UI */}
             <div className="absolute inset-0 rounded-xl border p-6 bg-opacity-50 backdrop-blur-md" style={{ borderColor: tokens.border, backgroundColor: tokens.surface, boxShadow: `0 0 40px rgba(0, 18, 25, 0.8)` }}>
                <div className="flex justify-between items-center mb-8 border-b pb-4" style={{ borderColor: tokens.border }}>
                  <div className="font-space-mono text-xs uppercase" style={{ color: tokens.accent }}>System Overview</div>
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: tokens.accent }} />
                    <div className="w-3 h-3 rounded-full opacity-30" style={{ backgroundColor: tokens.accent2 }} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  {[
                    { label: 'pH', value: '8.2', status: 'Stable' },
                    { label: 'Temp', value: '78.5°', status: 'Optimal' },
                    { label: 'Salinity', value: '1.025', status: 'Stable' },
                    { label: 'ORP', value: '350mv', status: 'Rising' }
                  ].map((stat, i) => (
                    <div key={i} className="p-4 border rounded-sm" style={{ borderColor: tokens.border, backgroundColor: 'rgba(0,0,0,0.2)' }}>
                      <div className="font-space-mono text-[10px] uppercase mb-1" style={{ color: tokens.mutedForeground }}>{stat.label}</div>
                      <div className="font-space-mono text-2xl" style={{ color: tokens.foreground }}>{stat.value}</div>
                      <div className="font-space-mono text-[10px] mt-1" style={{ color: tokens.accent }}>{stat.status}</div>
                    </div>
                  ))}
                </div>

                {/* Graph placeholder */}
                <div className="h-32 border rounded-sm relative overflow-hidden" style={{ borderColor: tokens.border }}>
                   <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                     <motion.path
                        d="M0,100 L0,50 Q25,20 50,50 T100,40 L100,100 Z"
                        fill={`rgba(148, 210, 189, 0.1)`}
                     />
                     <motion.path
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, ease: [0.42, 0, 0.58, 1] as [number, number, number, number] }}
                        d="M0,50 Q25,20 50,50 T100,40"
                        fill="none"
                        stroke={tokens.accent}
                        strokeWidth="2"
                     />
                   </svg>
                </div>
             </div>
           </motion.div>
        </div>
      </div>
    </section>
  )
}

function Stats() {
  return (
    <section className="py-16 border-y relative z-10" style={{ backgroundColor: tokens.surface, borderColor: tokens.border }}>
      <div className="max-w-7xl mx-auto px-6">
        <StaggerBuoyancy>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x" style={{ borderColor: tokens.border }}>
            {STATS.map(s => (
              <motion.div key={s.label} variants={buoyancyItem} className="flex flex-col items-center py-4 md:py-0">
                <span className="text-4xl font-space-mono font-bold mb-2" style={{ color: tokens.foreground }}>{s.value}</span>
                <span className="text-xs font-space-mono uppercase tracking-widest" style={{ color: tokens.mutedForeground }}>{s.label}</span>
              </motion.div>
            ))}
          </div>
        </StaggerBuoyancy>
      </div>
    </section>
  )
}

function Features() {
  return (
    <section id="telemetry" className="py-24 relative z-10" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-7xl mx-auto px-6">
        <BuoyancyUp>
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-jakarta font-bold mb-4" style={{ color: tokens.foreground }}>
              Core Subsystems
            </h2>
            <div className="h-1 w-20" style={{ backgroundColor: tokens.accent }} />
          </div>
        </BuoyancyUp>

        <StaggerBuoyancy>
          <div className="grid md:grid-cols-3 gap-8">
            {FEATURES.map((f, i) => (
              <motion.div
                key={i}
                variants={buoyancyItem}
                whileHover={{ y: -10, boxShadow: `0 10px 30px -10px ${tokens.accent}` }}
                className="p-8 border rounded-sm bg-opacity-50 backdrop-blur-sm transition-all duration-300"
                style={{ borderColor: tokens.border, backgroundColor: tokens.surface }}
              >
                <div className="w-12 h-12 flex items-center justify-center mb-6 border" style={{ borderColor: tokens.accent, backgroundColor: 'rgba(148, 210, 189, 0.1)' }}>
                  <f.icon className="h-6 w-6" style={{ color: tokens.accent }} />
                </div>
                <h3 className="text-xl font-jakarta font-bold mb-3" style={{ color: tokens.foreground }}>{f.title}</h3>
                <p className="font-jakarta text-sm leading-relaxed" style={{ color: tokens.mutedForeground }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </StaggerBuoyancy>
      </div>
    </section>
  )
}

function ProductDetail() {
  return (
    <section id="architecture" className="py-24 border-y relative overflow-hidden" style={{ borderColor: tokens.border, backgroundColor: tokens.surface }}>
      {/* Background grid */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: `linear-gradient(${tokens.accent} 1px, transparent 1px), linear-gradient(90deg, ${tokens.accent} 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center relative z-10">
        <div className="order-2 md:order-1 relative">
           <BuoyancyUp>
              <div className="relative aspect-square border p-8 rounded-full" style={{ borderColor: tokens.border }}>
                 {/* Central Core */}
                 <div className="absolute inset-0 m-auto w-32 h-32 border rounded-full flex items-center justify-center bg-black z-20" style={{ borderColor: tokens.accent }}>
                    <Cpu className="w-10 h-10 animate-pulse" style={{ color: tokens.accent }} />
                 </div>

                 {/* Orbiting Elements */}
                 <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: [0, 0, 1, 1] as [number, number, number, number] }}
                    className="absolute inset-8 border border-dashed rounded-full z-10"
                    style={{ borderColor: tokens.mutedForeground }}
                 >
                    <div className="absolute top-0 left-1/2 -mt-4 -ml-4 w-8 h-8 bg-black border rounded-full flex items-center justify-center" style={{ borderColor: tokens.accent2 }}>
                       <Database className="w-4 h-4" style={{ color: tokens.accent2 }} />
                    </div>
                 </motion.div>

                 <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: [0, 0, 1, 1] as [number, number, number, number] }}
                    className="absolute inset-0 border border-dotted rounded-full z-10"
                    style={{ borderColor: tokens.mutedForeground }}
                 >
                    <div className="absolute bottom-0 right-1/4 -mb-4 -mr-4 w-8 h-8 bg-black border rounded-full flex items-center justify-center" style={{ borderColor: tokens.accent }}>
                       <Shield className="w-4 h-4" style={{ color: tokens.accent }} />
                    </div>
                 </motion.div>
              </div>
           </BuoyancyUp>
        </div>

        <div className="order-1 md:order-2">
          <BuoyancyUp>
            <div className="font-space-mono text-xs uppercase tracking-widest mb-4" style={{ color: tokens.accent2 }}>Neural-Net Architecture</div>
            <h2 className="text-3xl md:text-5xl font-jakarta font-bold mb-6" style={{ color: tokens.foreground }}>
              Pre-cognitive <br/>Ecosystem Defense.
            </h2>
            <p className="text-lg font-jakarta mb-8" style={{ color: tokens.mutedForeground }}>
              Traditional controllers react to bad parameters. FishTank's AI models analyze the velocity of parameter changes to predict crashes days before they happen.
            </p>

            <ul className="space-y-6 font-space-mono text-sm">
              {[
                { icon: Layers, text: "Multi-layered sensor aggregation" },
                { icon: Database, text: "Cloud-synced baseline comparison" },
                { icon: Shield, text: "Automated isolation protocols" }
              ].map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + (i * 0.1) }}
                  className="flex items-center gap-4"
                  style={{ color: tokens.foreground }}
                >
                  <item.icon className="w-5 h-5" style={{ color: tokens.accent }} />
                  {item.text}
                </motion.li>
              ))}
            </ul>
          </BuoyancyUp>
        </div>
      </div>
    </section>
  )
}

function Pricing() {
  return (
    <section id="nodes" className="py-24 relative z-10" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-5xl mx-auto px-6">
        <BuoyancyUp>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-jakarta font-bold mb-4" style={{ color: tokens.foreground }}>
              Node Licensing
            </h2>
            <p className="font-space-mono text-sm uppercase tracking-widest" style={{ color: tokens.mutedForeground }}>
              Select telemetry tier
            </p>
          </div>
        </BuoyancyUp>

        <StaggerBuoyancy>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {PRICING.map((tier) => (
              <motion.div
                key={tier.name}
                variants={buoyancyItem}
                whileHover={{ y: -5, boxShadow: tier.highlighted ? `0 0 20px rgba(148, 210, 189, 0.2)` : `0 0 20px rgba(0, 95, 115, 0.2)` }}
                className="p-8 border relative flex flex-col"
                style={tier.highlighted
                  ? { backgroundColor: tokens.surface, borderColor: tokens.accent }
                  : { backgroundColor: 'transparent', borderColor: tokens.border }
                }
              >
                {tier.highlighted && (
                  <div className="absolute top-0 right-0 px-3 py-1 border-b border-l font-space-mono text-[10px] uppercase tracking-widest" style={{ backgroundColor: 'rgba(148, 210, 189, 0.1)', color: tokens.accent, borderColor: tokens.accent }}>
                    Enterprise Recommended
                  </div>
                )}

                <h3 className="text-2xl font-space-mono font-bold uppercase mb-2" style={{ color: tokens.foreground }}>{tier.name}</h3>
                <div className="flex items-end gap-1 mb-4">
                  <span className="text-4xl font-space-mono" style={{ color: tokens.foreground }}>{tier.price}</span>
                  <span className="text-sm font-space-mono mb-1" style={{ color: tokens.mutedForeground }}>/{tier.period}</span>
                </div>
                <p className="font-jakarta text-sm mb-8 h-10" style={{ color: tokens.mutedForeground }}>{tier.description}</p>

                <ul className="space-y-4 mb-8 flex-1 font-space-mono text-xs">
                  {tier.features.map(f => (
                    <li key={f} className="flex items-start gap-3">
                      <span className="mt-0.5" style={{ color: tier.highlighted ? tokens.accent : tokens.mutedForeground }}>{'>'}</span>
                      <span style={{ color: tokens.foreground }}>{f}</span>
                    </li>
                  ))}
                </ul>

                <DataButton
                  className="w-full h-12"
                  style={tier.highlighted
                    ? { backgroundColor: 'transparent', borderColor: tokens.accent, color: tokens.accent }
                    : { backgroundColor: 'transparent', borderColor: tokens.border, color: tokens.foreground }}
                >
                  {tier.cta}
                </DataButton>
              </motion.div>
            ))}
          </div>
        </StaggerBuoyancy>
      </div>
    </section>
  )
}

function Testimonials() {
  return (
    <section className="py-24 border-y relative z-10" style={{ borderColor: tokens.border, backgroundColor: tokens.surface }}>
      <div className="max-w-7xl mx-auto px-6">
        <BuoyancyUp>
          <div className="mb-16">
            <h2 className="text-3xl font-jakarta font-bold mb-2" style={{ color: tokens.foreground }}>
              Operator Logs
            </h2>
            <div className="h-1 w-10" style={{ backgroundColor: tokens.accent2 }} />
          </div>
        </BuoyancyUp>

        <StaggerBuoyancy>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                variants={buoyancyItem}
                className="p-6 border bg-opacity-50"
                style={{
                  borderColor: tokens.border,
                  backgroundColor: 'rgba(0,0,0,0.2)'
                }}
              >
                <div className="font-space-mono text-[10px] uppercase tracking-widest mb-4 flex justify-between" style={{ color: tokens.mutedForeground }}>
                  <span>LOG_ENTRY_{i+1}</span>
                  <span style={{ color: tokens.accent2 }}>RATING: {t.rating}.0</span>
                </div>
                <p className="font-jakarta text-sm leading-relaxed mb-6" style={{ color: tokens.foreground }}>"{t.text}"</p>
                <div className="border-t pt-4" style={{ borderColor: tokens.border }}>
                  <p className="font-space-mono font-bold text-sm" style={{ color: tokens.accent }}>{t.name}</p>
                  <p className="font-space-mono text-xs" style={{ color: tokens.mutedForeground }}>{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </StaggerBuoyancy>
      </div>
    </section>
  )
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-24 relative z-10" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-3xl mx-auto px-6">
        <BuoyancyUp>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-jakarta font-bold" style={{ color: tokens.foreground }}>
              Query Database
            </h2>
          </div>
        </BuoyancyUp>

        <div className="space-y-4">
          {FAQ_ITEMS.map((item, i) => (
            <BuoyancyUp key={i} delay={i * 0.1}>
              <div className="border" style={{ borderColor: tokens.border, backgroundColor: tokens.surface }}>
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-space-mono text-sm uppercase tracking-wider" style={{ color: tokens.foreground }}>{item.q}</span>
                  <motion.span
                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  >
                    <ChevronDown className="h-5 w-5" style={{ color: tokens.mutedForeground }} />
                  </motion.span>
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div className="px-6 pb-6 pt-2 border-t" style={{ borderColor: tokens.border }}>
                        <p className="font-jakarta text-sm leading-relaxed" style={{ color: tokens.mutedForeground }}>
                          {item.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </BuoyancyUp>
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
    <section className="py-24 border-y relative overflow-hidden z-10" style={{ borderColor: tokens.border, backgroundColor: 'rgba(0, 18, 25, 0.9)' }}>
      <div className="absolute inset-0 z-0">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-2xl bg-gradient-to-r from-transparent via-[rgba(148,210,189,0.05)] to-transparent" />
      </div>

      <div className="max-w-2xl mx-auto px-6 text-center relative z-10">
        <BuoyancyUp>
          <Fish className="w-10 h-10 mx-auto mb-6 opacity-50" style={{ color: tokens.accent }} />
          <h2 className="text-3xl font-space-mono font-bold uppercase tracking-widest mb-4" style={{ color: tokens.foreground }}>
            Establish Uplink
          </h2>
          <p className="font-jakarta text-sm mb-8" style={{ color: tokens.mutedForeground }}>
            Subscribe to firmware patch notes and marine AI research findings.
          </p>

          {status === 'success' ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-4 border inline-block"
              style={{ borderColor: tokens.accent, backgroundColor: 'rgba(148, 210, 189, 0.1)' }}
            >
              <p className="font-space-mono text-sm uppercase tracking-widest" style={{ color: tokens.accent }}>Uplink Established</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                required
                placeholder="ENTER_EMAIL_ADDRESS"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="flex-1 h-12 px-4 border font-space-mono text-sm focus:outline-none focus:border-accent bg-transparent transition-colors"
                style={{ borderColor: tokens.border, color: tokens.foreground }}
              />
              <DataButton
                type="submit"
                disabled={status === 'loading'}
                className="h-12 px-8"
                style={{ backgroundColor: 'transparent', borderColor: tokens.accent, color: tokens.accent }}
              >
                {status === 'loading' ? 'Connecting...' : 'Connect'}
              </DataButton>
            </form>
          )}
        </BuoyancyUp>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="py-16 relative z-10" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Fish className="h-6 w-6" style={{ color: tokens.accent }} />
              <span className="text-xl font-space-mono font-bold tracking-widest uppercase" style={{ color: tokens.foreground }}>
                {PRODUCT_NAME}
              </span>
            </div>
            <p className="font-jakarta text-sm max-w-sm" style={{ color: tokens.mutedForeground }}>
              Intelligent marine telemetry. Operating in depths previously thought impossible.
            </p>
          </div>

          <div>
            <p className="font-space-mono text-xs uppercase tracking-widest mb-4" style={{ color: tokens.foreground }}>Hardware</p>
            <ul className="space-y-3 font-jakarta text-sm">
              {['Controllers', 'Sensors', 'Dosing Pumps', 'Lighting'].map(item => (
                <li key={item}>
                  <a href="#" className="hover:text-accent transition-colors" style={{ color: tokens.mutedForeground }}>{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-space-mono text-xs uppercase tracking-widest mb-4" style={{ color: tokens.foreground }}>Software</p>
            <ul className="space-y-3 font-jakarta text-sm">
              {['API Docs', 'Webhooks', 'OS Dashboard', 'Status'].map(item => (
                <li key={item}>
                  <a href="#" className="hover:text-accent transition-colors" style={{ color: tokens.mutedForeground }}>{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderColor: tokens.border }}>
          <p className="font-space-mono text-xs" style={{ color: tokens.mutedForeground }}>
            SYS_TIME: {new Date().getFullYear()} // {PRODUCT_NAME}_CORP
          </p>
          <a
            href="/"
            className="font-space-mono text-xs uppercase tracking-widest border px-4 py-2 hover:bg-white/5 transition-colors"
            style={{ borderColor: tokens.border, color: tokens.foreground }}
          >
            [ Disconnect ]
          </a>
        </div>
      </div>
    </footer>
  )
}

// ─────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────
export default function FishTankPage() {
  return (
    <div className={`min-h-screen ${spaceMono.variable} ${jakarta.variable} font-jakarta selection:bg-teal-900 selection:text-teal-100`} style={{ backgroundColor: tokens.background }}>
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
