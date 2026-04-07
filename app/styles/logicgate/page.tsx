'use client'

import { motion, useReducedMotion, useInView, Variants } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Fira_Code, Public_Sans } from 'next/font/google'
// Geist is a custom font sometimes, we'll use a fallback or standard sans for it if not available, or Inter
import { Inter } from 'next/font/google'
import {
  Cpu, GitBranch, Zap, Server, Settings, CheckCircle, Database, LayoutTemplate
} from 'lucide-react'

// Using Inter as a fallback for Geist if Geist isn't configured in Next.js by default
const geistFallback = Inter({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
  weight: ['400', '600', '800'],
})

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

const tokens = {
  background: '#111827', // Deep Navy
  surface: '#1F2937', // Steel Gray
  accent1: '#F59E0B', // Circuit Amber
  accent2: '#38B2AC', // Logic Teal
  border: '#374151',
  glow: 'rgba(245, 158, 11, 0.4)',
  textHigh: '#FFFFFF',
  textLow: '#9CA3AF',
}

function FadeUp({ children, delay = 0, className = "", style }: { children: React.ReactNode; delay?: number; className?: string; style?: React.CSSProperties }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-5% 0px' })
  const shouldReduce = useReducedMotion()

  return (
    <motion.div ref={ref} className={className} style={style} initial={shouldReduce ? false : { opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

function StaggerContainer({ children, className = "", style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-5% 0px' })
  const shouldReduce = useReducedMotion()

  return (
    <motion.div ref={ref} className={className} style={style} initial={shouldReduce ? false : 'hidden'}
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

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] } },
}

const PRODUCT_NAME = 'LogicGate'
const TAGLINE = 'Industrial-Grade Workflow Automation'
const DESCRIPTION = 'Build robust logic pipelines. Triggers, actions, and connections that snap with tactile satisfaction.'

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b" style={{ borderColor: tokens.border, backgroundColor: 'rgba(17, 24, 39, 0.9)' }}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
           <Cpu className="h-5 w-5" style={{ color: tokens.accent1 }} />
           <span className={`font-bold text-lg tracking-tight ${geistFallback.className}`} style={{ color: tokens.textHigh }}>
             {PRODUCT_NAME}
           </span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {['Nodes', 'Execution', 'Security', 'Pricing'].map(link => (
            <a key={link} href={`#${link.toLowerCase()}`} className={`text-sm transition-colors hover:text-white ${publicSans.className}`} style={{ color: tokens.textLow }}>
              {link}
            </a>
          ))}
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`px-5 h-10 rounded text-sm font-semibold uppercase tracking-wider ${publicSans.className}`}
          style={{ backgroundColor: tokens.accent1, color: '#000', boxShadow: `0 0 10px ${tokens.glow}` }}
        >
          Initialize
        </motion.button>
      </div>
    </nav>
  )
}

function NodeCard({ title, type, delay }: { title: string, type: 'trigger' | 'action', delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, type: 'spring', stiffness: 400, damping: 25 }}
      className="p-4 rounded-md border flex items-center gap-4 bg-opacity-50 relative overflow-hidden"
      style={{ borderColor: tokens.border, backgroundColor: tokens.surface }}
    >
       <div className="absolute left-0 top-0 bottom-0 w-1" style={{ backgroundColor: type === 'trigger' ? tokens.accent1 : tokens.accent2 }} />
       <div className="w-10 h-10 rounded flex items-center justify-center border" style={{ borderColor: tokens.border, backgroundColor: tokens.background }}>
          {type === 'trigger' ? <Zap className="h-5 w-5" style={{ color: tokens.accent1 }} /> : <Database className="h-5 w-5" style={{ color: tokens.accent2 }} />}
       </div>
       <div>
          <div className={`text-xs uppercase mb-1 ${firaCode.className}`} style={{ color: type === 'trigger' ? tokens.accent1 : tokens.accent2 }}>{type}</div>
          <div className={`text-sm font-semibold ${publicSans.className}`} style={{ color: tokens.textHigh }}>{title}</div>
       </div>
       {type === 'action' && (
         <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 transform translate-x-1/2" style={{ borderColor: tokens.border, backgroundColor: tokens.background }} />
       )}
       {type === 'trigger' && (
         <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 transform -translate-x-1/2" style={{ borderColor: tokens.border, backgroundColor: tokens.background }} />
       )}
    </motion.div>
  )
}

function Hero() {
  return (
    <section className="min-h-screen flex items-center pt-24 relative overflow-hidden" style={{ backgroundColor: tokens.background }}>
      {/* Pulse Check Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20" style={{ backgroundImage: `radial-gradient(${tokens.border} 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

      <div className="max-w-7xl mx-auto px-6 py-12 w-full relative z-10 grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`inline-flex items-center gap-2 px-3 py-1 rounded border mb-6 text-xs uppercase ${firaCode.className}`}
            style={{ borderColor: tokens.accent2, color: tokens.accent2, backgroundColor: 'rgba(56, 178, 172, 0.1)' }}
          >
            System Online
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-5xl md:text-7xl font-extrabold leading-tight mb-6 tracking-tight ${geistFallback.className}`}
            style={{ color: tokens.textHigh }}
          >
            {TAGLINE}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-lg md:text-xl mb-10 max-w-lg leading-relaxed ${publicSans.className}`}
            style={{ color: tokens.textLow }}
          >
            {DESCRIPTION}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`h-12 px-8 rounded font-semibold flex items-center justify-center gap-2 uppercase tracking-wide text-sm ${publicSans.className}`}
              style={{ backgroundColor: tokens.textHigh, color: tokens.background }}
            >
              Build Pipeline
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`h-12 px-8 rounded font-semibold border flex items-center justify-center gap-2 uppercase tracking-wide text-sm ${publicSans.className}`}
              style={{ borderColor: tokens.border, color: tokens.textHigh, backgroundColor: tokens.surface }}
            >
              Read Docs
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Visual Logic Builder Mockup */}
        <div className="relative h-[500px] w-full rounded-xl border p-8 flex flex-col items-center justify-center" style={{ borderColor: tokens.border, backgroundColor: tokens.background, boxShadow: 'inset 0 0 50px rgba(0,0,0,0.5)' }}>

           {/* Grid Pattern inner */}
           <div className="absolute inset-0 pointer-events-none opacity-30" style={{ backgroundImage: `linear-gradient(${tokens.surface} 1px, transparent 1px), linear-gradient(90deg, ${tokens.surface} 1px, transparent 1px)`, backgroundSize: '20px 20px' }} />

           <div className="relative z-10 w-full max-w-sm flex flex-col gap-12 items-center">
              <NodeCard title="Webhook Received" type="trigger" delay={0.5} />

              {/* Animated Connection Line */}
              <div className="absolute top-[88px] bottom-[280px] w-1 flex items-center justify-center" style={{ backgroundColor: tokens.border }}>
                 <motion.div
                    className="w-2 h-8 rounded-full"
                    style={{ backgroundColor: tokens.accent1, boxShadow: `0 0 10px ${tokens.accent1}` }}
                    animate={{ y: [-40, 100] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: [0, 0, 1, 1] }}
                 />
              </div>

              <NodeCard title="Format Payload" type="action" delay={0.8} />

              {/* Animated Connection Line */}
              <div className="absolute top-[248px] bottom-[120px] w-1 flex items-center justify-center" style={{ backgroundColor: tokens.border }}>
                 <motion.div
                    className="w-2 h-8 rounded-full"
                    style={{ backgroundColor: tokens.accent2, boxShadow: `0 0 10px ${tokens.accent2}` }}
                    animate={{ y: [-40, 100] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: [0, 0, 1, 1], delay: 0.75 }}
                 />
              </div>

              <NodeCard title="Insert to Database" type="action" delay={1.1} />
           </div>

           {/* Variable Inspector Hover Mock */}
           <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2 }}
              className="absolute right-[-40px] top-1/2 p-4 rounded border backdrop-blur-md"
              style={{ borderColor: tokens.accent2, backgroundColor: 'rgba(31, 41, 55, 0.8)', color: tokens.textHigh }}
           >
              <div className={`text-xs uppercase mb-2 ${firaCode.className}`} style={{ color: tokens.accent2 }}>Payload Data</div>
              <pre className={`text-xs ${firaCode.className}`} style={{ color: tokens.textLow }}>
{`{
  "id": "evt_9x",
  "type": "payment",
  "status": "success"
}`}
              </pre>
           </motion.div>
        </div>
      </div>
    </section>
  )
}

function Features() {
  const features = [
    { icon: GitBranch, title: 'Branching Logic', desc: 'Complex conditions made visual and tactile.' },
    { icon: Cpu, title: 'High-Throughput', desc: 'Engineered to handle millions of events per second.' },
    { icon: LayoutTemplate, title: 'Templates', desc: 'Start fast with pre-built mechanical blueprints.' },
    { icon: Server, title: 'Self-Hosted Options', desc: 'Run on your own infrastructure for total control.' },
  ]

  return (
    <section className="py-24 border-y" style={{ borderColor: tokens.border, backgroundColor: tokens.background }}>
      <div className="max-w-7xl mx-auto px-6">
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              variants={staggerItem}
              whileHover={{ scale: 1.02 }}
              className="p-6 rounded border relative overflow-hidden"
              style={{ borderColor: tokens.border, backgroundColor: tokens.surface }}
            >
              <div className="absolute top-0 right-0 w-16 h-16 transform translate-x-8 -translate-y-8 rounded-full opacity-10" style={{ backgroundColor: tokens.accent1 }} />
              <f.icon className="h-6 w-6 mb-4" style={{ color: tokens.accent1 }} strokeWidth={1.5} />
              <h3 className={`text-lg font-bold mb-2 ${geistFallback.className}`} style={{ color: tokens.textHigh }}>{f.title}</h3>
              <p className={`text-sm ${publicSans.className}`} style={{ color: tokens.textLow }}>{f.desc}</p>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

export default function LogicGatePage() {
  return (
    <div className={`${geistFallback.variable} ${firaCode.variable} ${publicSans.variable} font-sans selection:bg-amber-500/30`} style={{ backgroundColor: tokens.background, color: tokens.textHigh }}>
      <Navbar />
      <main>
        <Hero />
        <Features />
      </main>
      
      </div>
  )
}
