'use client'

/**
 * Industrial Skeuomorphism Style Landing Page
 */

import { motion, useReducedMotion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Inter, Space_Mono } from 'next/font/google'
import {
  Star, ChevronDown, ArrowRight, Check, Zap, Shield,
  Layers, Cpu, Activity, Database, HardDrive, Terminal
} from 'lucide-react'
import type { Variants } from 'framer-motion'

// ─────────────────────────────────────────────
// FONTS
// ─────────────────────────────────────────────
const bodyFont = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const monoFont = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

// ─────────────────────────────────────────────
// DESIGN TOKENS
// ─────────────────────────────────────────────
const tokens = {
  background: '#e0e5ec',
  backgroundAlt: '#e0e5ec',
  foreground: '#2d3748',
  muted: '#babecc',
  mutedForeground: '#718096',
  border: '#cbd5e0',
  accent: '#FF6B00',
  accentForeground: '#FFFFFF',

  shadowCard: '9px 9px 16px rgba(163,177,198,0.6), -9px -9px 16px rgba(255,255,255, 0.5)',
  shadowFloating: '12px 12px 20px rgba(163,177,198,0.7), -12px -12px 20px rgba(255,255,255, 0.6)',
  shadowRecessed: 'inset 6px 6px 12px rgba(163,177,198,0.6), inset -6px -6px 12px rgba(255,255,255, 0.5)',
  shadowPressed: 'inset 4px 4px 8px rgba(163,177,198,0.8), inset -4px -4px 8px rgba(255,255,255, 0.7)',
}

const PRODUCT_NAME = "SYS.CORE"

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────
const STATS = [
  { label: 'SYSTEM UPTIME', value: '99.999%' },
  { label: 'NODES ONLINE', value: '14,204' },
  { label: 'LATENCY', value: '< 2ms' },
  { label: 'SECURITY RATING', value: 'A++' },
]

const FEATURES = [
  {
    title: 'Hardware Acceleration',
    description: 'Direct access to raw metal. No virtualization overhead slowing down your compute cycles.',
    icon: Cpu,
  },
  {
    title: 'Redundant Architecture',
    description: 'Failover systems built into the core. If a node drops, the mesh reroutes instantly.',
    icon: Layers,
  },
  {
    title: 'Encrypted Pipelines',
    description: 'End-to-end military-grade encryption protocols running continuously on all data streams.',
    icon: Shield,
  },
  {
    title: 'Real-time Telemetry',
    description: 'Sub-millisecond metric collection. Know exactly what your systems are doing at all times.',
    icon: Activity,
  },
  {
    title: 'Distributed Storage',
    description: 'Petabyte-scale cold and hot storage arrays synced globally across secure data centers.',
    icon: Database,
  },
  {
    title: 'Command Line Interface',
    description: 'Powerful CLI tooling for automation. Everything in the dashboard is available via terminal.',
    icon: Terminal,
  },
]

const PRICING_TIERS = [
  {
    name: 'STANDARD',
    price: '$0',
    period: 'mo',
    description: 'Essential compute for small deployments and testing environments.',
    features: ['1 CPU Core', '2GB RAM Allocation', '10GB SSD Storage', 'Community Support'],
    cta: 'INITIALIZE',
    highlighted: false,
  },
  {
    name: 'PROFESSIONAL',
    price: '$49',
    period: 'mo',
    description: 'Production-ready infrastructure with guaranteed resources and SLA.',
    features: ['4 CPU Cores', '16GB RAM Allocation', '250GB NVMe Storage', 'Priority Support'],
    cta: 'DEPLOY PRO',
    highlighted: true,
  },
  {
    name: 'ENTERPRISE',
    price: '$299',
    period: 'mo',
    description: 'Dedicated hardware clusters for massive scale operations.',
    features: ['16 CPU Cores', '64GB RAM Allocation', '2TB NVMe Storage', '24/7 Dedicated Support'],
    cta: 'CONTACT SALES',
    highlighted: false,
  },
]

const TESTIMONIALS = [
  {
    text: "This infrastructure is solid like a tank. We've pushed petabytes through the system and haven't seen a single drop in performance or reliability.",
    name: "Sarah Jenkins",
    role: "Lead Systems Engineer",
    company: "DataCorp",
    rating: 5,
  },
  {
    text: "The telemetry dashboard is incredible. I feel like I'm sitting in front of a real physical control panel. The tactile feedback is oddly satisfying.",
    name: "Marcus Chen",
    role: "DevOps Director",
    company: "Quantum Logistics",
    rating: 5,
  },
  {
    text: "Finally, a platform that doesn't hide everything behind overly simple UI. It gives us the raw power and control we need for our industrial applications.",
    name: "Elena Rodriguez",
    role: "CTO",
    company: "ManufactureX",
    rating: 5,
  },
]

const FAQ_ITEMS = [
  {
    q: 'How quickly can we provision new nodes?',
    a: 'Bare metal provisioning takes less than 45 seconds from command execution to fully online status. Virtualized containers are instant.',
  },
  {
    q: 'Is there a limit to bandwidth?',
    a: 'All tiers include unmetered inbound traffic. Outbound traffic is subject to fair use policies on the Standard tier, but unlimited on Pro and Enterprise.',
  },
  {
    q: 'Can we self-host the control plane?',
    a: 'Yes, Enterprise customers receive physical installation media to deploy the control plane within their own air-gapped networks.',
  },
  {
    q: 'What redundancy protocols are in place?',
    a: 'We operate on a N+2 redundancy model for all critical infrastructure, including power, cooling, and network uplinks across all datacenters.',
  },
  {
    q: 'Do you offer API access?',
    a: 'Every function available in the dashboard or CLI is accessible via our RESTful API. Documentation is available in the developer portal.',
  },
  {
    q: 'How does the billing cycle work?',
    a: 'Billing is calculated hourly based on active resources. You are only charged for what you use, invoiced at the end of each calendar month.',
  },
]

// ─────────────────────────────────────────────
// MOTION HELPERS
// ─────────────────────────────────────────────
function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.6, delay, ease: [0.175, 0.885, 0.32, 1.275] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function StaggerContainer({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.1 }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.175, 0.885, 0.32, 1.275] } }
}

// ─────────────────────────────────────────────
// INDUSTRIAL UI COMPONENTS
// ─────────────────────────────────────────────
function LedIndicator({ status = "online", className = "" }: { status?: "online" | "warning" | "offline", className?: string }) {
  const color = status === "online" ? "#22c55e" : status === "warning" ? "#eab308" : "#ef4444";
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <div
        className="w-2.5 h-2.5 rounded-full z-10"
        style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}` }}
      />
      {status === "online" && (
        <div
          className="absolute w-2.5 h-2.5 rounded-full animate-pulse opacity-50"
          style={{ backgroundColor: color, boxShadow: `0 0 12px 4px ${color}` }}
        />
      )}
    </div>
  )
}

function ScrewHead({ className = "" }: { className?: string }) {
  return (
    <div
      className={`w-4 h-4 rounded-full flex items-center justify-center ${className}`}
      style={{
        boxShadow: tokens.shadowRecessed,
        background: `linear-gradient(135deg, ${tokens.muted}50, transparent)`
      }}
    >
      <div className="w-2.5 h-[1px] bg-black/20 rotate-45" />
    </div>
  )
}

function VentSlot({ className = "" }: { className?: string }) {
  return (
    <div
      className={`w-1.5 h-8 rounded-full ${className}`}
      style={{
        boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.2), inset -1px -1px 2px rgba(255,255,255,0.5)',
        backgroundColor: '#c0c5cc'
      }}
    />
  )
}

function BoltedCard({ children, className = "", elevated = false }: { children: React.ReactNode, className?: string, elevated?: boolean }) {
  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.3, ease: 'easeOut' } }}
      className={`relative rounded-xl p-8 transition-shadow duration-300 ${className}`}
      style={{
        backgroundColor: tokens.background,
        boxShadow: elevated ? tokens.shadowFloating : tokens.shadowCard,
        border: '1px solid rgba(255,255,255,0.2)'
      }}
    >
      {/* Corner Screws */}
      <ScrewHead className="absolute top-3 left-3" />
      <ScrewHead className="absolute top-3 right-3" />
      <ScrewHead className="absolute bottom-3 left-3" />
      <ScrewHead className="absolute bottom-3 right-3" />

      {children}
    </motion.div>
  )
}

function IndustrialButton({ children, primary = false, className = "", onClick, type, disabled }: { children: React.ReactNode, primary?: boolean, className?: string, onClick?: () => void, type?: "button" | "submit" | "reset", disabled?: boolean }) {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <motion.button
      onClick={onClick}
      type={type}
      disabled={disabled}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      onTouchStart={() => setIsPressed(true)}
      onTouchEnd={() => setIsPressed(false)}
      animate={{ y: isPressed ? 2 : 0 }}
      transition={{ duration: 0.15 }}
      className={`relative px-8 py-4 rounded-lg font-bold tracking-wider text-sm disabled:opacity-50 ${className}`}
      style={{
        backgroundColor: tokens.background,
        color: primary ? tokens.accent : tokens.foreground,
        boxShadow: isPressed ? tokens.shadowPressed : tokens.shadowCard,
        border: '1px solid rgba(255,255,255,0.2)'
      }}
    >
      {/* Accent strip for primary buttons */}
      {primary && !isPressed && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-1 rounded-b-md" style={{ backgroundColor: tokens.accent }} />
      )}
      <span className={monoFont.className}>{children}</span>
    </motion.button>
  )
}

// ─────────────────────────────────────────────
// SECTIONS
// ─────────────────────────────────────────────
function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 py-4 px-6 md:px-12 transition-all duration-300"
         style={{ backgroundColor: `${tokens.background}f0`, backdropFilter: 'blur(8px)' }}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ boxShadow: tokens.shadowCard }}>
            <HardDrive className="h-5 w-5" style={{ color: tokens.foreground }} />
          </div>
          <span className={`font-bold text-xl tracking-tight ${monoFont.className}`} style={{ color: tokens.foreground }}>
            {PRODUCT_NAME}
          </span>
          <div className="hidden md:flex items-center gap-2 ml-4 px-3 py-1.5 rounded-full" style={{ boxShadow: tokens.shadowRecessed }}>
            <LedIndicator />
            <span className={`text-xs ${monoFont.className}`} style={{ color: tokens.mutedForeground }}>SYS.ONLINE</span>
          </div>
        </div>

        {/* Desktop Nav */}
        <div className={`hidden md:flex items-center gap-8 ${monoFont.className} text-sm`}>
          <a href="#features" className="hover:text-[var(--accent)] transition-colors" style={{ color: tokens.foreground }}>MODULES</a>
          <a href="#pricing" className="hover:text-[var(--accent)] transition-colors" style={{ color: tokens.foreground }}>PRICING</a>
          <IndustrialButton primary>INITIALIZE</IndustrialButton>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden w-12 h-12 rounded-lg flex items-center justify-center"
          style={{ boxShadow: isOpen ? tokens.shadowPressed : tokens.shadowCard }}
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="space-y-1.5">
            <div className="w-5 h-0.5" style={{ backgroundColor: tokens.foreground }} />
            <div className="w-5 h-0.5" style={{ backgroundColor: tokens.foreground }} />
            <div className="w-5 h-0.5" style={{ backgroundColor: tokens.foreground }} />
          </div>
        </button>
      </div>

      {/* Mobile Nav */}
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        className="md:hidden overflow-hidden"
      >
        <div className={`flex flex-col gap-4 pt-6 pb-4 ${monoFont.className}`}>
          <a href="#features" className="block p-4 rounded-lg text-center" style={{ boxShadow: tokens.shadowRecessed, color: tokens.foreground }}>MODULES</a>
          <a href="#pricing" className="block p-4 rounded-lg text-center" style={{ boxShadow: tokens.shadowRecessed, color: tokens.foreground }}>PRICING</a>
          <IndustrialButton primary className="w-full">INITIALIZE</IndustrialButton>
        </div>
      </motion.div>
    </nav>
  )
}

function Hero() {
  return (
    <section className="pt-32 pb-16 md:pt-48 md:pb-32 px-6 md:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

        {/* Text Content */}
        <div className="col-span-1 lg:col-span-7 z-10 order-2 lg:order-1">
          <FadeUp>
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full mb-8" style={{ boxShadow: tokens.shadowRecessed }}>
              <LedIndicator />
              <span className={`text-xs uppercase tracking-widest ${monoFont.className}`} style={{ color: tokens.mutedForeground }}>
                System v2.4 Online
              </span>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 leading-tight uppercase" style={{ color: tokens.foreground }}>
              Industrial <br/>
              <span style={{ color: tokens.accent }}>Infrastructure.</span>
            </h1>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p className="text-lg md:text-xl mb-10 max-w-2xl leading-relaxed" style={{ color: tokens.mutedForeground }}>
              Raw, uncompromising compute power built for applications that cannot fail.
              Tactile control, military-grade reliability, and deep system access.
            </p>
          </FadeUp>

          <FadeUp delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-6">
              <IndustrialButton primary className="w-full sm:w-auto">
                <span className="flex items-center justify-center gap-2">
                  <Zap className="w-4 h-4" /> DEPLOY CLUSTER
                </span>
              </IndustrialButton>
              <IndustrialButton className="w-full sm:w-auto">
                VIEW SCHEMATICS
              </IndustrialButton>
            </div>
          </FadeUp>
        </div>

        {/* Device Visualization */}
        <div className="col-span-1 lg:col-span-5 order-1 lg:order-2">
          <FadeUp delay={0.4} className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-square flex items-center justify-center">
            {/* Base Chassis */}
            <motion.div
              className="absolute inset-4 rounded-3xl"
              style={{
                backgroundColor: tokens.background,
                boxShadow: tokens.shadowFloating,
                border: '2px solid rgba(255,255,255,0.4)'
              }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5 }}
            >
              {/* Outer Bezel Details */}
              <div className="absolute top-4 left-4 right-4 h-8 flex justify-between items-center px-4">
                <div className="flex gap-2">
                  <ScrewHead />
                  <ScrewHead />
                </div>
                <div className="flex gap-1.5">
                  <VentSlot className="h-6" />
                  <VentSlot className="h-6" />
                  <VentSlot className="h-6" />
                  <VentSlot className="h-6" />
                </div>
              </div>

              {/* Screen Recess */}
              <div
                className="absolute top-16 left-6 right-6 bottom-16 rounded-xl p-2"
                style={{
                  boxShadow: tokens.shadowRecessed,
                  backgroundColor: '#1a202c'
                }}
              >
                {/* Inner Screen */}
                <div className="w-full h-full rounded-lg bg-black relative overflow-hidden border border-gray-800">
                  {/* CRT Scanlines */}
                  <div className="absolute inset-0 pointer-events-none opacity-20"
                       style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #fff 2px, #fff 4px)' }} />

                  {/* Screen Content */}
                  <div className={`p-6 ${monoFont.className} text-[#22c55e] h-full flex flex-col`}>
                    <div className="flex justify-between items-center mb-4 border-b border-[#22c55e]/30 pb-2">
                      <span className="text-xs">SYS.CORE // TML</span>
                      <LedIndicator />
                    </div>

                    <div className="space-y-2 text-sm flex-1 opacity-80">
                      <p>&gt; INITIALIZING SECURE BOOT...</p>
                      <p>&gt; MOUNTING VOLUMES [OK]</p>
                      <p>&gt; STARTING MESH ROUTER...</p>
                      <motion.p
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                      >&gt; ESTABLISHING UPLINK_</motion.p>
                    </div>

                    {/* Telemetry charts */}
                    <div className="h-16 flex items-end gap-1 mt-auto">
                      {[40, 70, 45, 90, 60, 30, 80, 50, 75, 100].map((h, i) => (
                        <motion.div
                          key={i}
                          className="flex-1 bg-[#22c55e]"
                          initial={{ height: `${h}%` }}
                          animate={{ height: [`${h}%`, `${Math.random() * 100}%`, `${h}%`] }}
                          transition={{ repeat: Infinity, duration: 2 + Math.random() * 2 }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom controls */}
              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full" style={{ boxShadow: tokens.shadowCard }} />
                  <div className="w-8 h-8 rounded-full" style={{ boxShadow: tokens.shadowCard }} />
                </div>
                <div className="px-4 py-1.5 rounded bg-black flex items-center gap-2 border border-gray-700 shadow-inner">
                  <span className={`text-[10px] text-red-500 ${monoFont.className}`}>PWR</span>
                  <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_#ef4444]" />
                </div>
              </div>
            </motion.div>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}

function Stats() {
  return (
    <section className="py-16 md:py-24 px-6 md:px-12 border-y border-white/20">
      <div className="max-w-7xl mx-auto">
        <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((stat, i) => (
            <motion.div key={i} variants={staggerItem} className="flex flex-col items-center text-center">
              <div className={`text-4xl md:text-5xl font-black mb-2 tracking-tight`} style={{ color: tokens.foreground }}>
                {stat.value}
              </div>
              <div className={`text-xs md:text-sm font-bold tracking-widest ${monoFont.className}`} style={{ color: tokens.mutedForeground }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

function Features() {
  return (
    <section id="features" className="py-24 md:py-32 px-6 md:px-12 relative">
      <div className="max-w-7xl mx-auto">
        <FadeUp>
          <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-black uppercase mb-6" style={{ color: tokens.foreground }}>
                Hardware Modules
              </h2>
              <p className="text-lg" style={{ color: tokens.mutedForeground }}>
                Physical-grade components designed for maximum durability. Each module operates independently, ensuring system-wide stability even during isolated failures.
              </p>
            </div>
          </div>
        </FadeUp>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, i) => (
            <motion.div key={i} variants={staggerItem} className="group h-full">
              <BoltedCard className="h-full flex flex-col">
                <div className="flex justify-between items-start mb-6">
                  {/* Recessed Icon Housing */}
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12"
                    style={{ boxShadow: tokens.shadowRecessed }}
                  >
                    <feature.icon className="w-8 h-8" style={{ color: tokens.accent }} />
                  </div>
                  <div className={`text-xs opacity-50 ${monoFont.className}`}>MOD_0{i+1}</div>
                </div>

                <h3 className="text-xl font-bold mb-4 uppercase" style={{ color: tokens.foreground }}>{feature.title}</h3>
                <p className="text-sm leading-relaxed flex-1" style={{ color: tokens.mutedForeground }}>
                  {feature.description}
                </p>

                <div className="mt-8 pt-6 border-t border-white/20 flex items-center justify-between">
                  <span className={`text-xs ${monoFont.className}`} style={{ color: tokens.foreground }}>STATUS: ACTIVE</span>
                  <LedIndicator />
                </div>
              </BoltedCard>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

function ProductDetail() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-12 bg-white/5 border-y border-white/20 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          <FadeUp className="order-2 lg:order-1 relative">
            <div className="aspect-[4/3] rounded-2xl relative z-10" style={{ boxShadow: tokens.shadowFloating, backgroundColor: tokens.background }}>
               {/* Screws and vents */}
              <div className="absolute top-4 left-4 right-4 flex justify-between">
                <ScrewHead />
                <ScrewHead />
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex justify-between">
                <ScrewHead />
                <ScrewHead />
              </div>

              {/* Inner recessed area simulating an image placeholder but industrial */}
              <div className="absolute inset-10 rounded-lg overflow-hidden" style={{ boxShadow: tokens.shadowRecessed, backgroundColor: '#2d3748' }}>
                <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                   <Activity className="w-24 h-24 text-gray-700" />
                </div>
              </div>

              {/* Floating stats card */}
              <motion.div
                className="absolute -right-8 -bottom-8 p-6 rounded-xl hidden md:block"
                style={{ backgroundColor: tokens.background, boxShadow: tokens.shadowCard }}
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              >
                <div className={`text-xs mb-2 ${monoFont.className}`} style={{ color: tokens.mutedForeground }}>THROUGHPUT</div>
                <div className="text-3xl font-black" style={{ color: tokens.foreground }}>1.2 TB/s</div>
              </motion.div>
            </div>

            {/* Background mechanical decoration */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] rounded-full border-[20px] border-black/5 blur-xl" />
          </FadeUp>

          <div className="order-1 lg:order-2">
            <FadeUp>
              <div className={`inline-block px-3 py-1 bg-black/5 rounded mb-6 text-sm font-bold ${monoFont.className}`} style={{ color: tokens.accent }}>
                // ARCHITECTURE OVERVIEW
              </div>
              <h2 className="text-3xl md:text-4xl font-black uppercase mb-8" style={{ color: tokens.foreground }}>
                Built like a tank. <br/>Runs like a watch.
              </h2>

              <div className="space-y-6 text-lg" style={{ color: tokens.mutedForeground }}>
                <p>
                  Most cloud platforms abstract away the hardware until you can't tell what you're running on. We do the opposite. We expose the raw metal so you can tune it perfectly to your workload.
                </p>
                <p>
                  The chassis is constructed from redundant micro-services pinned to physical CPU cores. Memory isn't swapped; it's pre-allocated and locked. Network paths are physically segregated to ensure zero cross-talk.
                </p>
              </div>

              <ul className="mt-10 space-y-4">
                {['Direct memory access', 'Kernel bypass networking', 'Dedicated PCIe lanes'].map((item, i) => (
                  <li key={i} className="flex items-center gap-4">
                    <div className="w-6 h-6 rounded flex items-center justify-center" style={{ boxShadow: tokens.shadowRecessed }}>
                      <Check className="w-4 h-4" style={{ color: tokens.accent }} />
                    </div>
                    <span className="font-bold" style={{ color: tokens.foreground }}>{item}</span>
                  </li>
                ))}
              </ul>
            </FadeUp>
          </div>

        </div>
      </div>
    </section>
  )
}

function Pricing() {
  return (
    <section id="pricing" className="py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <FadeUp>
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-4xl md:text-5xl font-black uppercase mb-6" style={{ color: tokens.foreground }}>Resource Allocation</h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: tokens.mutedForeground }}>
              Transparent pricing based on actual hardware reserved for your cluster. No hidden fees or virtualization taxes.
            </p>
          </div>
        </FadeUp>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 lg:gap-8">
          {PRICING_TIERS.map((tier, i) => (
            <motion.div key={tier.name} variants={staggerItem}>
              <BoltedCard elevated={tier.highlighted} className={`h-full flex flex-col ${tier.highlighted ? 'md:-translate-y-4' : ''}`}>

                {/* Hanging Hole Detail */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#cbd5e0] border-4 border-[#e0e5ec] shadow-inner flex items-center justify-center z-10">
                  <div className="w-4 h-4 rounded-full bg-gray-900 shadow-inner" />
                </div>

                <div className={`text-center mb-8 pt-4 border-b border-white/20 pb-8`}>
                  <h3 className={`text-lg font-bold mb-4 tracking-widest ${monoFont.className}`} style={{ color: tier.highlighted ? tokens.accent : tokens.foreground }}>
                    {tier.name}
                  </h3>
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-5xl font-black" style={{ color: tokens.foreground }}>{tier.price}</span>
                    <span className={`text-sm ${monoFont.className}`} style={{ color: tokens.mutedForeground }}>/{tier.period}</span>
                  </div>
                </div>

                <p className="text-sm mb-8 min-h-[40px]" style={{ color: tokens.mutedForeground }}>{tier.description}</p>

                <ul className="space-y-4 mb-10 flex-1">
                  {tier.features.map(f => (
                    <li key={f} className="flex items-start gap-3">
                      <div className="mt-0.5">
                        <Check className="w-4 h-4" style={{ color: tier.highlighted ? tokens.accent : tokens.foreground }} />
                      </div>
                      <span className="text-sm font-medium" style={{ color: tokens.foreground }}>{f}</span>
                    </li>
                  ))}
                </ul>

                <IndustrialButton primary={tier.highlighted} className="w-full">
                  {tier.cta}
                </IndustrialButton>
              </BoltedCard>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

function Testimonials() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-12 border-y border-white/20 bg-white/5 relative overflow-hidden">
      {/* Decorative pipes background */}
      <div className="absolute top-1/3 left-0 w-full h-3 opacity-20 hidden md:block"
           style={{ backgroundColor: tokens.muted, boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3)' }} />
      <div className="absolute bottom-1/3 left-0 w-full h-3 opacity-20 hidden md:block"
           style={{ backgroundColor: tokens.muted, boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3)' }} />

      <div className="max-w-7xl mx-auto relative z-10">
        <FadeUp>
          <div className="mb-16 md:mb-24">
            <h2 className="text-4xl md:text-5xl font-black uppercase mb-6" style={{ color: tokens.foreground }}>Field Reports</h2>
          </div>
        </FadeUp>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, i) => (
            <motion.div key={i} variants={staggerItem}>
              <BoltedCard className={`h-full group ${i % 2 === 0 ? 'rotate-1' : '-rotate-1'}`}>
                 {/* Masking tape detail */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-yellow-200/40 backdrop-blur-sm -skew-x-12 flex items-center justify-center z-10">
                  <span className={`text-[10px] text-yellow-900 font-bold ${monoFont.className}`}>LOG #{i+348}</span>
                </div>

                <div className="flex gap-1 mb-6 pt-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-current" style={{ color: tokens.accent }} />
                  ))}
                </div>

                <p className="text-sm leading-relaxed mb-8 flex-1 font-medium" style={{ color: tokens.foreground }}>
                  "{t.text}"
                </p>

                <div className="flex items-center gap-4 pt-6 border-t border-white/20">
                  <div className="w-12 h-12 rounded bg-gray-400 grayscale group-hover:grayscale-0 transition-all duration-500" style={{ boxShadow: tokens.shadowRecessed }} />
                  <div>
                    <div className="font-bold text-sm uppercase" style={{ color: tokens.foreground }}>{t.name}</div>
                    <div className={`text-xs mt-1 ${monoFont.className}`} style={{ color: tokens.mutedForeground }}>{t.role} @ {t.company}</div>
                  </div>
                </div>
              </BoltedCard>
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
    <section className="py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        <FadeUp>
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-4xl md:text-5xl font-black uppercase mb-6" style={{ color: tokens.foreground }}>Technical Specs & FAQ</h2>
          </div>
        </FadeUp>

        <div className="space-y-6">
          {FAQ_ITEMS.map((item, i) => (
            <FadeUp key={i} delay={i * 0.1}>
              <div
                className="rounded-xl overflow-hidden transition-all duration-300"
                style={{
                  backgroundColor: tokens.background,
                  boxShadow: openIndex === i ? tokens.shadowPressed : tokens.shadowCard,
                  border: '1px solid rgba(255,255,255,0.2)'
                }}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-bold text-lg" style={{ color: tokens.foreground }}>{item.q}</span>
                  <motion.div
                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ boxShadow: tokens.shadowRecessed }}
                  >
                    <ChevronDown className="w-4 h-4" style={{ color: tokens.foreground }} />
                  </motion.div>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openIndex === i ? 'auto' : 0, opacity: openIndex === i ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="p-6 pt-0 text-sm leading-relaxed border-t border-black/5 mt-2" style={{ color: tokens.mutedForeground }}>
                    <div className="pt-4">{item.a}</div>
                  </div>
                </motion.div>
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
    setTimeout(() => setStatus('success'), 1500)
  }

  return (
    <section className="py-24 md:py-32 px-6 md:px-12 border-t border-white/20">
      <div className="max-w-3xl mx-auto text-center">
        <FadeUp>
          <div className="w-16 h-16 rounded-full mx-auto mb-8 flex items-center justify-center" style={{ boxShadow: tokens.shadowRecessed }}>
            <Terminal className="w-8 h-8" style={{ color: tokens.accent }} />
          </div>
          <h2 className="text-3xl md:text-4xl font-black uppercase mb-4" style={{ color: tokens.foreground }}>Establish Uplink</h2>
          <p className="text-lg mb-10" style={{ color: tokens.mutedForeground }}>
            Subscribe to system updates, security patches, and deployment logs.
          </p>

          {status === 'success' ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`p-6 rounded-lg font-bold text-xl inline-flex items-center gap-3 ${monoFont.className}`}
              style={{ color: '#22c55e', boxShadow: tokens.shadowRecessed }}
            >
              <LedIndicator status="online" /> UPLINK ESTABLISHED
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="relative max-w-sm w-full mx-auto sm:mx-0">
                <input
                  type="email"
                  required
                  placeholder="admin@sys.core"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className={`w-full h-14 px-6 rounded-lg text-sm focus:outline-none transition-shadow ${monoFont.className}`}
                  style={{
                    backgroundColor: tokens.background,
                    color: tokens.foreground,
                    boxShadow: tokens.shadowRecessed
                  }}
                />
              </div>
              <IndustrialButton type="submit" primary disabled={status === 'loading'} className="h-14">
                {status === 'loading' ? 'CONNECTING...' : 'SUBSCRIBE'}
              </IndustrialButton>
            </form>
          )}
        </FadeUp>
      </div>
    </section>
  )
}

function Footer() {
  const links = {
    Modules: ['Compute', 'Storage', 'Network', 'Security'],
    Company: ['About', 'Careers', 'Manifesto', 'Contact'],
    Resources: ['Documentation', 'API Reference', 'Status', 'Terminal Guide'],
  }

  return (
    <footer className="py-16 md:py-24 px-6 md:px-12 border-t-4" style={{ borderColor: tokens.foreground, backgroundColor: tokens.background }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-16">
          <div className="lg:col-span-2">
            <div className={`font-black text-2xl tracking-tight mb-4 flex items-center gap-3 ${monoFont.className}`} style={{ color: tokens.foreground }}>
              <div className="w-8 h-8 rounded bg-black flex items-center justify-center shadow-inner">
                <HardDrive className="w-4 h-4 text-white" />
              </div>
              {PRODUCT_NAME}
            </div>
            <p className="text-sm leading-relaxed max-w-sm mb-6" style={{ color: tokens.mutedForeground }}>
              Industrial-grade compute infrastructure. No abstractions, no hand-holding. Just raw power.
            </p>
            <div className="flex gap-4">
              {[1,2,3].map(i => (
                <a key={i} href="#" className="w-10 h-10 rounded flex items-center justify-center transition-transform hover:-translate-y-1" style={{ boxShadow: tokens.shadowCard }}>
                  <div className="w-4 h-4 bg-gray-400 rounded-sm" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <h4 className="font-bold uppercase mb-6" style={{ color: tokens.foreground }}>{group}</h4>
              <ul className="space-y-4">
                {items.map(item => (
                  <li key={item}>
                    <a href="#" className={`text-sm hover:underline hover:text-[var(--accent)] transition-colors ${monoFont.className}`} style={{ color: tokens.mutedForeground }}>
                      &gt; {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-black/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className={`text-xs font-bold ${monoFont.className}`} style={{ color: tokens.mutedForeground }}>
            © 2026 {PRODUCT_NAME} SYSTEMS. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className={`text-xs ${monoFont.className}`} style={{ color: tokens.mutedForeground }}>PRIVACY POLICY</a>
            <a href="#" className={`text-xs ${monoFont.className}`} style={{ color: tokens.mutedForeground }}>TERMS OF SERVICE</a>
            <a href="/" className={`text-xs px-4 py-2 rounded font-bold transition-shadow hover:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.2)]`}
               style={{ backgroundColor: tokens.background, color: tokens.foreground, border: '1px solid rgba(0,0,0,0.1)' }}>
              RETURN TO HUB
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ─────────────────────────────────────────────
// PAGE EXPORT
// ─────────────────────────────────────────────
export default function IndustrialPage() {
  return (
    <div className={`${bodyFont.variable} ${monoFont.variable} font-sans min-h-screen text-[16px] selection:bg-[var(--accent)] selection:text-white`} style={{ backgroundColor: tokens.background, color: tokens.foreground }}>
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
