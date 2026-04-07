'use client'

import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Inter, Fira_Code, Public_Sans } from 'next/font/google'
import {
  Layers, Workflow, Box, Network, Fingerprint, Database,
  ArrowRight, Shield, Zap, Check, ChevronDown
} from 'lucide-react'

const firaCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-fira',
  display: 'swap',
})

const publicSans = Public_Sans({
  subsets: ['latin'],
  variable: '--font-public',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const tokens = {
  background: '#111827',
  surface: '#1F2937',
  accent1: '#F59E0B',
  accent2: '#38B2AC',
  border: '#374151',
  glow: 'rgba(245, 158, 11, 0.4)',
  textHigh: '#F9FAFB',
  textLow: '#9CA3AF'
}

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-5% 0px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function LayerSpread({ children, delay = 0, className = "", style }: { children: React.ReactNode; delay?: number; className?: string; style?: React.CSSProperties }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, z: -100, rotateX: 15 }}
      animate={isInView ? { opacity: 1, z: 0, rotateX: 0 } : {}}
      transition={{ type: "spring", stiffness: 200, damping: 25, delay }}
      className={className}
      style={{ perspective: 1200, ...style }}
    >
      {children}
    </motion.div>
  )
}

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-md" style={{ borderColor: tokens.border, backgroundColor: `${tokens.background}CC` }}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Layers className="h-6 w-6" style={{ color: tokens.accent1 }} />
          <span className={`font-bold text-xl tracking-tight ${publicSans.className}`} style={{ color: tokens.textHigh }}>
            LayerLogic
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {['Visualizer', 'Connectors', 'Pricing', 'Docs'].map(link => (
            <a key={link} href={`#${link.toLowerCase()}`} className={`text-sm transition-colors hover:text-white ${inter.className}`} style={{ color: tokens.textLow }}>
              {link}
            </a>
          ))}
        </div>
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: `0 0 15px ${tokens.glow}` }}
          whileTap={{ scale: 0.95 }}
          className={`px-6 h-10 rounded text-sm font-medium border ${firaCode.className}`}
          style={{ borderColor: tokens.accent1, color: tokens.accent1, backgroundColor: `${tokens.accent1}10` }}
        >
          Build_Flow()
        </motion.button>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section className="min-h-screen flex items-center pt-24 pb-16 overflow-hidden relative" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.15 }}
          className="relative z-10"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`flex items-center gap-2 mb-8 px-4 py-2 rounded border inline-flex ${firaCode.className}`}
            style={{ backgroundColor: tokens.surface, borderColor: tokens.border }}
          >
            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: tokens.accent2, boxShadow: `0 0 10px ${tokens.accent2}` }} />
            <span className="text-xs" style={{ color: tokens.accent2 }}>v3.0 Engine Active</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-6xl md:text-7xl font-bold leading-tight mb-6 ${publicSans.className}`}
            style={{ color: tokens.textHigh }}
          >
            Tactile Logic <br />
            <span style={{ color: tokens.accent1 }}>Automation.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-lg mb-10 max-w-xl leading-relaxed ${inter.className}`}
            style={{ color: tokens.textLow }}
          >
            Build with high-end machinery. Treat workflow automation like physical engineering with connectors that have snap, weight, and perfect mechanical precision.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: `0 0 20px ${tokens.glow}` }}
              whileTap={{ scale: 0.95 }}
              className={`h-14 px-8 rounded font-medium flex items-center justify-center gap-2 text-lg ${publicSans.className}`}
              style={{ backgroundColor: tokens.accent1, color: tokens.background }}
            >
              Start Building
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Layered 3D Visual */}
        <div className="relative h-[500px] perspective-1200 flex items-center justify-center">
           <motion.div
             animate={{ rotateX: [20, 30, 20], rotateY: [-20, -10, -20] }}
             transition={{ duration: 10, repeat: Infinity, ease: [0.42, 0, 0.58, 1] }}
             className="relative w-full max-w-md h-full transform-style-3d"
           >
              {[1, 2, 3].map((layer) => (
                <motion.div
                  key={layer}
                  initial={{ z: 0, opacity: 0 }}
                  animate={{ z: layer * 80, opacity: 1 }}
                  transition={{ delay: layer * 0.2, type: "spring", stiffness: 100 }}
                  className="absolute inset-0 m-auto w-64 h-64 border-2 rounded-xl bg-opacity-20 backdrop-blur-md flex items-center justify-center"
                  style={{
                    borderColor: layer === 3 ? tokens.accent1 : tokens.border,
                    backgroundColor: tokens.surface,
                    boxShadow: layer === 3 ? `0 0 30px ${tokens.glow}` : 'none'
                  }}
                >
                   {layer === 3 && <Workflow className="w-16 h-16" style={{ color: tokens.accent1 }} />}
                   {layer === 2 && <Box className="w-12 h-12" style={{ color: tokens.accent2 }} />}
                   {layer === 1 && <Database className="w-12 h-12" style={{ color: tokens.textLow }} />}
                </motion.div>
              ))}

              {/* Connecting Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ transform: 'translateZ(120px)' }}>
                 <motion.path
                   d="M 100 200 Q 150 150 200 250 T 300 150"
                   stroke={tokens.accent2}
                   strokeWidth="3"
                   fill="none"
                   initial={{ pathLength: 0 }}
                   animate={{ pathLength: 1 }}
                   transition={{ duration: 2, repeat: Infinity }}
                 />
              </svg>
           </motion.div>
        </div>
      </div>
    </section>
  )
}

function StatGrid() {
  return (
    <section className="py-12 border-y" style={{ borderColor: tokens.border, backgroundColor: tokens.surface }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
             { label: 'Nodes Executed', val: '2.4B' },
             { label: 'Uptime', val: '99.999%' },
             { label: 'Avg Latency', val: '12ms' },
             { label: 'Connectors', val: '450+' }
          ].map((stat, i) => (
            <FadeUp key={stat.label} delay={i * 0.1} className="text-center">
              <p className={`text-4xl font-bold mb-2 ${firaCode.className}`} style={{ color: tokens.accent1 }}>{stat.val}</p>
              <p className={`text-sm uppercase tracking-widest ${publicSans.className}`} style={{ color: tokens.textLow }}>{stat.label}</p>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}

const FEATURES = [
  { icon: Workflow, title: 'Visual Logic Builder', desc: 'Drag, drop, and snap nodes together with magnetic tension and precision.' },
  { icon: Zap, title: 'Execution Pulse', desc: 'Watch light pulses travel through active workflows in real-time as data flows.' },
  { icon: Database, title: 'Variable Inspector', desc: 'Hover over any connector to see real-time data states and types inside the flow.' },
  { icon: Shield, title: 'Tactile Connectors', desc: 'Ports pulse and wires snap into place with a satisfying visual jolt.' },
  { icon: Network, title: 'Parallel Execution', desc: 'Branch your logic infinitely without performance degradation.' },
  { icon: Fingerprint, title: 'Audit Logs', desc: 'Every execution is mechanically recorded for complete traceability.' }
]

function Features() {
  return (
    <section className="py-24" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-7xl mx-auto px-6">
        <FadeUp>
          <div className="mb-16 text-center">
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${publicSans.className}`} style={{ color: tokens.textHigh }}>
              Mechanical <span style={{ color: tokens.accent2 }}>Precision</span>
            </h2>
            <p className={`text-lg max-w-2xl mx-auto ${inter.className}`} style={{ color: tokens.textLow }}>
              We treat software automation like hardware engineering. Robust, inspectable, and satisfying to build.
            </p>
          </div>
        </FadeUp>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, i) => (
            <LayerSpread key={feature.title} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -5, boxShadow: `0 10px 30px rgba(0,0,0,0.5)` }}
                className="p-8 rounded-xl border bg-opacity-50 backdrop-blur-sm h-full"
                style={{ borderColor: tokens.border, backgroundColor: tokens.surface }}
              >
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-6" style={{ backgroundColor: `${tokens.accent2}20` }}>
                  <feature.icon className="w-6 h-6" style={{ color: tokens.accent2 }} />
                </div>
                <h3 className={`text-xl font-bold mb-3 ${publicSans.className}`} style={{ color: tokens.textHigh }}>{feature.title}</h3>
                <p className={`text-sm leading-relaxed ${inter.className}`} style={{ color: tokens.textLow }}>{feature.desc}</p>
              </motion.div>
            </LayerSpread>
          ))}
        </div>
      </div>
    </section>
  )
}

function WorkflowDemo() {
  return (
    <section className="py-24 border-y overflow-hidden relative" style={{ borderColor: tokens.border, backgroundColor: tokens.surface }}>
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <div className="relative h-96 rounded-xl border p-6 flex flex-col justify-between" style={{ borderColor: tokens.border, backgroundColor: tokens.background }}>
           <div className="flex justify-between">
              <motion.div
                animate={{ boxShadow: [`0 0 0px ${tokens.glow}`, `0 0 20px ${tokens.glow}`, `0 0 0px ${tokens.glow}`] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="p-4 rounded border flex items-center gap-3" style={{ borderColor: tokens.accent1, backgroundColor: tokens.surface }}>
                 <Zap className="w-5 h-5" style={{ color: tokens.accent1 }} />
                 <span className={`text-sm font-bold ${firaCode.className}`} style={{ color: tokens.textHigh }}>Webhook Trigger</span>
              </motion.div>
           </div>

           <div className="absolute top-1/4 bottom-1/4 left-1/2 w-1 -translate-x-1/2" style={{ backgroundColor: tokens.border }}>
              <motion.div
                animate={{ top: ["0%", "100%"] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: [0, 0, 1, 1] }}
                className="absolute w-full h-8 blur-sm"
                style={{ backgroundColor: tokens.accent2 }}
              />
           </div>

           <div className="flex justify-center">
              <motion.div className="p-4 rounded border flex items-center gap-3" style={{ borderColor: tokens.border, backgroundColor: tokens.surface }}>
                 <Database className="w-5 h-5" style={{ color: tokens.textLow }} />
                 <span className={`text-sm font-bold ${firaCode.className}`} style={{ color: tokens.textHigh }}>Postgres Upsert</span>
              </motion.div>
           </div>
        </div>

        <FadeUp>
           <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${publicSans.className}`} style={{ color: tokens.textHigh }}>
              The Execution <span style={{ color: tokens.accent1 }}>Pulse</span>
            </h2>
            <p className={`text-lg mb-8 leading-relaxed ${inter.className}`} style={{ color: tokens.textLow }}>
              See your logic in action. Light pulses travel through active workflows, giving you a real-time visual heartbeat of your automated systems.
            </p>
            <ul className="space-y-4 mb-8">
              {['Visual debugging', 'Live data inspector', 'Step-by-step playback'].map((item, i) => (
                <li key={i} className={`flex items-center gap-3 text-sm ${publicSans.className}`} style={{ color: tokens.textLow }}>
                  <div className="p-1 rounded-full" style={{ backgroundColor: `${tokens.accent2}20` }}>
                    <Check className="w-4 h-4" style={{ color: tokens.accent2 }} />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
        </FadeUp>
      </div>
    </section>
  )
}

const PRICING = [
  { name: 'Developer', price: 'Free', desc: 'For personal projects.', features: ['10 Active Workflows', '1,000 Executions/mo', 'Community Support'] },
  { name: 'Pro', price: '$49', desc: 'For independent creators.', features: ['Unlimited Workflows', '50,000 Executions/mo', 'Priority Support', 'Custom Integrations'] },
  { name: 'Enterprise', price: 'Custom', desc: 'For large teams.', features: ['Dedicated Infrastructure', 'SLA Guarantee', 'On-premise option', 'White-glove onboarding'] }
]

function Pricing() {
  return (
    <section className="py-24" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-7xl mx-auto px-6">
         <FadeUp>
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${publicSans.className}`} style={{ color: tokens.textHigh }}>Simple Pricing</h2>
            <p className={`text-lg ${inter.className}`} style={{ color: tokens.textLow }}>Pay for executions, not connectors.</p>
          </div>
        </FadeUp>

        <div className="grid md:grid-cols-3 gap-8">
          {PRICING.map((tier, i) => (
            <LayerSpread key={tier.name} delay={i * 0.1} className="p-8 rounded-xl border relative flex flex-col" style={{ borderColor: i === 1 ? tokens.accent1 : tokens.border, backgroundColor: tokens.surface }}>
              {i === 1 && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: tokens.accent1, color: tokens.background }}>
                  MOST POPULAR
                </div>
              )}
              <h3 className={`text-2xl font-bold mb-2 ${publicSans.className}`} style={{ color: tokens.textHigh }}>{tier.name}</h3>
              <p className={`text-sm mb-6 ${inter.className}`} style={{ color: tokens.textLow }}>{tier.desc}</p>
              <div className="mb-8">
                <span className={`text-5xl font-bold ${firaCode.className}`} style={{ color: tokens.textHigh }}>{tier.price}</span>
                {i !== 2 && <span className={`text-sm ${inter.className}`} style={{ color: tokens.textLow }}>/mo</span>}
              </div>

              <ul className="space-y-4 mb-8 flex-1">
                {tier.features.map(f => (
                  <li key={f} className={`flex items-center gap-3 text-sm ${publicSans.className}`} style={{ color: tokens.textHigh }}>
                    <Check className="w-4 h-4" style={{ color: tokens.accent2 }} />
                    {f}
                  </li>
                ))}
              </ul>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full py-4 rounded-lg font-bold transition-colors ${publicSans.className}`}
                style={{
                  backgroundColor: i === 1 ? tokens.accent1 : 'transparent',
                  border: `1px solid ${i === 1 ? tokens.accent1 : tokens.border}`,
                  color: i === 1 ? tokens.background : tokens.textHigh
                }}
              >
                {i === 2 ? 'Contact Sales' : 'Start Building'}
              </motion.button>
            </LayerSpread>
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="py-24 border-y" style={{ borderColor: tokens.border, backgroundColor: tokens.surface }}>
      <div className="max-w-3xl mx-auto px-6">
        <FadeUp>
          <h2 className={`text-4xl md:text-5xl font-bold mb-12 text-center ${publicSans.className}`} style={{ color: tokens.textHigh }}>Common Logic</h2>
        </FadeUp>

        <div className="space-y-4">
          {[
            { q: "Can I write custom code nodes?", a: "Yes, you can write custom Node.js or Python snippets that execute within the flow." },
            { q: "Is there a limit to workflow complexity?", a: "No hard limits. Our visualizer handles thousands of nodes smoothly using WebGL rendering." },
            { q: "How are errors handled?", a: "Configure fallback paths and global error handlers that trigger notifications automatically." }
          ].map((item, i) => (
            <div key={i} className="border rounded-xl" style={{ borderColor: open === i ? tokens.accent2 : tokens.border }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className={`w-full p-6 text-left flex justify-between items-center ${publicSans.className}`}
                style={{ color: tokens.textHigh }}
              >
                <span className="font-bold text-lg">{item.q}</span>
                <ChevronDown className={`w-5 h-5 transition-transform ${open === i ? 'rotate-180' : ''}`} style={{ color: open === i ? tokens.accent2 : tokens.textLow }} />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className={`p-6 pt-0 leading-relaxed ${inter.className}`} style={{ color: tokens.textLow }}>
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Newsletter() {
  return (
    <section className="py-24" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-2xl mx-auto px-6 text-center">
        <FadeUp>
          <Layers className="w-12 h-12 mx-auto mb-6" style={{ color: tokens.accent1 }} />
          <h2 className={`text-4xl font-bold mb-4 ${publicSans.className}`} style={{ color: tokens.textHigh }}>Join the Network</h2>
          <p className={`text-lg mb-8 ${inter.className}`} style={{ color: tokens.textLow }}>Get updates on new connectors, features, and automation tips.</p>

          <div className="flex flex-col sm:flex-row gap-4 p-2 rounded-lg border" style={{ borderColor: tokens.border, backgroundColor: tokens.surface }}>
            <input
              type="email"
              placeholder="name@company.com"
              className={`flex-1 bg-transparent px-4 py-3 text-sm focus:outline-none ${firaCode.className}`}
              style={{ color: tokens.textHigh }}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-8 py-3 rounded font-bold ${publicSans.className}`}
              style={{ backgroundColor: tokens.accent2, color: tokens.background }}
            >
              Subscribe
            </motion.button>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="py-12 border-t" style={{ borderColor: tokens.border, backgroundColor: tokens.surface }}>
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
           <Layers className="w-6 h-6" style={{ color: tokens.accent1 }} />
           <span className={`font-bold ${publicSans.className}`} style={{ color: tokens.textHigh }}>LayerLogic</span>
        </div>

        <div className={`flex gap-8 text-sm ${publicSans.className}`} style={{ color: tokens.textLow }}>
          <a href="#" className="hover:text-white transition-colors">Integrations</a>
          <a href="#" className="hover:text-white transition-colors">Documentation</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
        </div>
      </div>
    </footer>
  )
}

export default function LayerLogicPage() {
  return (
    <div className={`min-h-screen ${inter.variable} ${firaCode.variable} ${publicSans.variable} selection:bg-amber-500/30`} style={{ backgroundColor: tokens.background }}>
      <Navbar />
      <main>
        <Hero />
        <StatGrid />
        <Features />
        <WorkflowDemo />
        <Pricing />
        <FAQ />
        <Newsletter />
      </main>
      <Footer />
    </div>
  )
}
