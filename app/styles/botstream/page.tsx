import { Variants } from 'framer-motion'
'use client'

import { motion, useReducedMotion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google'
import {
  Mic, Activity, Users, Settings, MessageSquare, Play,
  Pause, ArrowRight, Check, Shield, BarChart, Zap
} from 'lucide-react'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

const tokens = {
  background: '#08090A',
  surface: 'rgba(255, 255, 255, 0.03)',
  accent1: '#3B82F6', // Stream Blue
  accent2: '#F43F5E', // Pulse Rose
  border: 'rgba(255, 255, 255, 0.1)',
  textHigh: '#FFFFFF',
  textLow: 'rgba(255, 255, 255, 0.6)',
}

function FadeUp({ children, delay = 0, className = "", style }: { children: React.ReactNode; delay?: number; className?: string; style?: React.CSSProperties }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-5% 0px' })
  const shouldReduce = useReducedMotion()

  return (
    <motion.div ref={ref} className={className} style={style} initial={shouldReduce ? false : { opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
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
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] } },
}

const PRODUCT_NAME = 'BotStream'
const TAGLINE = 'The Silent Observer of Your Meetings'
const DESCRIPTION = 'AI-driven meeting assistant that listens, understands, and acts. Transcribe, summarize, and extract action items in real-time.'

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b" style={{ borderColor: tokens.border, backgroundColor: 'rgba(8, 9, 10, 0.8)' }}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <span className={`font-bold text-lg ${spaceGrotesk.className}`} style={{ color: tokens.textHigh }}>
          {PRODUCT_NAME}
        </span>
        <div className="hidden md:flex items-center gap-8">
          {['Features', 'Intelligence', 'Pricing', 'FAQ'].map(link => (
            <a key={link} href={`#${link.toLowerCase()}`} className="text-sm transition-colors hover:text-white" style={{ color: tokens.textLow }}>
              {link}
            </a>
          ))}
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-5 h-10 rounded-full text-sm font-medium"
          style={{ backgroundColor: tokens.accent1, color: '#fff' }}
        >
          Start Listening
        </motion.button>
      </div>
    </nav>
  )
}

function Hero() {
  const [isPlaying, setIsPlaying] = useState(true)

  return (
    <section className="min-h-screen flex items-center pt-24 relative overflow-hidden" style={{ backgroundColor: tokens.background }}>
      {/* The Breathing Background */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        animate={{
          background: [
            `radial-gradient(circle at 50% 50%, ${tokens.accent1}10 0%, transparent 50%)`,
            `radial-gradient(circle at 50% 50%, ${tokens.accent1}20 0%, transparent 60%)`,
            `radial-gradient(circle at 50% 50%, ${tokens.accent1}10 0%, transparent 50%)`
          ]
        }}
        transition={{ duration: 5, repeat: Infinity, ease: [0.42, 0, 0.58, 1] as [number, number, number, number] }}
      />

      <div className="max-w-6xl mx-auto px-6 py-12 w-full relative z-10 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.15, delayChildren: 0.1 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-6 text-xs font-mono uppercase tracking-wider ${jetbrainsMono.className}`}
            style={{ borderColor: tokens.border, color: tokens.accent1, backgroundColor: tokens.surface }}
          >
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: tokens.accent2 }} />
            Live Listening
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className={`text-5xl md:text-6xl font-bold leading-tight mb-6 ${spaceGrotesk.className}`}
            style={{ color: tokens.textHigh }}
          >
            {TAGLINE}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl mb-10 max-w-lg leading-relaxed"
            style={{ color: tokens.textLow }}
          >
            {DESCRIPTION}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="h-14 px-8 rounded-full font-medium flex items-center justify-center gap-2"
              style={{ backgroundColor: tokens.textHigh, color: tokens.background }}
            >
              <Mic className="h-4 w-4" /> Connect Calendar
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="h-14 px-8 rounded-full font-medium border flex items-center justify-center gap-2"
              style={{ borderColor: tokens.border, color: tokens.textHigh, backgroundColor: tokens.surface }}
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />} Demo
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Hero Visual - Voice Orbs and Sentiment Waveform */}
        <FadeUp delay={0.4} className="h-[400px] rounded-3xl border relative overflow-hidden flex flex-col justify-between p-6" style={{ borderColor: tokens.border, backgroundColor: tokens.surface }}>
          <div className="flex justify-between items-start">
            <div className="flex gap-4">
              {/* Voice Orbs */}
              <motion.div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'rgba(59, 130, 246, 0.2)' }}
                animate={isPlaying ? { scale: [1, 1.2, 1], filter: ['brightness(1)', 'brightness(1.5)', 'brightness(1)'] } : {}}
                transition={{ duration: 1.5, repeat: Infinity, type: 'spring', stiffness: 50, damping: 10, mass: 2 }}
              >
                <div className="w-8 h-8 rounded-full" style={{ backgroundColor: tokens.accent1 }} />
              </motion.div>
              <motion.div
                className="w-12 h-12 rounded-full flex items-center justify-center mt-4"
                style={{ backgroundColor: 'rgba(244, 63, 94, 0.1)' }}
                animate={isPlaying ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: tokens.textLow }} />
              </motion.div>
            </div>
            <div className={`text-xs ${jetbrainsMono.className}`} style={{ color: tokens.textLow }}>
              00:14:23
            </div>
          </div>

          {/* Action Item Pop */}
          <div className="flex flex-col gap-2">
            <motion.div
               initial={{ opacity: 0, x: -20 }}
               animate={isPlaying ? { opacity: 1, x: 0 } : { opacity: 0 }}
               transition={{ delay: 1 }}
               className="self-end max-w-[80%] p-3 rounded-2xl rounded-tr-sm border"
               style={{ borderColor: tokens.border, backgroundColor: 'rgba(255, 255, 255, 0.05)', color: tokens.textHigh }}
            >
               <span style={{ color: tokens.accent1 }} className="mr-2 text-xs uppercase font-bold">Action</span>
               Sarah to send the Q3 report by Friday.
            </motion.div>
            <motion.div
               initial={{ opacity: 0, x: -20 }}
               animate={isPlaying ? { opacity: 1, x: 0 } : { opacity: 0 }}
               transition={{ delay: 2.5 }}
               className="self-start max-w-[80%] p-3 rounded-2xl rounded-tl-sm border"
               style={{ borderColor: tokens.border, backgroundColor: 'rgba(255, 255, 255, 0.05)', color: tokens.textHigh }}
            >
               We need to align on the budget before the next meeting.
            </motion.div>
          </div>

          {/* Sentiment Waveform */}
          <div className="h-12 w-full flex items-end gap-1 mt-4">
             {Array.from({ length: 40 }).map((_, i) => (
               <motion.div
                 key={i}
                 className="flex-1 rounded-t-sm"
                 style={{ backgroundColor: i > 25 ? tokens.accent1 : tokens.textLow }}
                 animate={isPlaying ? { height: ['20%', `${typeof window !== 'undefined' ? Math.random() * 80 + 20 : 50}%`, '20%'] } : { height: '20%' }}
                 transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.05, type: 'spring', stiffness: 800, damping: 50 }}
               />
             ))}
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

function Stats() {
  return (
    <section className="border-y" style={{ borderColor: tokens.border, backgroundColor: tokens.background }}>
      <div className="max-w-6xl mx-auto px-6 py-16">
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { v: '10M+', l: 'Hours Transcribed' },
            { v: '99%', l: 'Accuracy' },
            { v: '<200ms', l: 'Latency' },
            { v: '50+', l: 'Languages' },
          ].map(stat => (
            <motion.div key={stat.l} variants={staggerItem} className="text-center">
              <p className={`text-4xl md:text-5xl font-bold mb-2 ${spaceGrotesk.className}`} style={{ color: tokens.textHigh }}>{stat.v}</p>
              <p className={`text-sm ${jetbrainsMono.className}`} style={{ color: tokens.textLow }}>{stat.l}</p>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

function Features() {
  const features = [
    { icon: Activity, title: 'Sentiment Tracking', desc: 'Real-time analysis of meeting tone and engagement.' },
    { icon: MessageSquare, title: 'Live Summaries', desc: 'Key points slide into view instantly.' },
    { icon: Zap, title: 'Action Extraction', desc: 'Automatically pins tasks to your project board.' },
    { icon: Users, title: 'Speaker Diarization', desc: 'Flawlessly identifies who is speaking when.' },
    { icon: Shield, title: 'Enterprise Security', desc: 'End-to-end encryption for sensitive calls.' },
    { icon: BarChart, title: 'Insights Dashboard', desc: 'Track talk time, interruptions, and flow.' },
  ]

  return (
    <section id="features" className="py-32" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-6xl mx-auto px-6">
        <FadeUp className="text-center mb-20">
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${spaceGrotesk.className}`} style={{ color: tokens.textHigh }}>
            Harmony in every call.
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: tokens.textLow }}>
            Tools that breathe with your participants, providing context without distraction.
          </p>
        </FadeUp>
        <StaggerContainer className="grid md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              variants={staggerItem}
              whileHover={{ y: -5, backgroundColor: 'rgba(255, 255, 255, 0.06)' }}
              className="p-8 rounded-3xl border transition-colors"
              style={{ borderColor: tokens.border, backgroundColor: tokens.surface }}
            >
              <f.icon className="h-8 w-8 mb-6" style={{ color: tokens.accent1 }} strokeWidth={1.5} />
              <h3 className={`text-xl font-bold mb-3 ${spaceGrotesk.className}`} style={{ color: tokens.textHigh }}>{f.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: tokens.textLow }}>{f.desc}</p>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

function Intelligence() {
  return (
    <section id="intelligence" className="py-32 border-y relative overflow-hidden" style={{ borderColor: tokens.border, backgroundColor: '#050607' }}>
       {/* Background wave */}
       <div className="absolute inset-0 opacity-20 flex items-center">
         <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-32">
           <motion.path
              d="M0,50 Q25,20 50,50 T100,50 L100,100 L0,100 Z"
              fill={tokens.accent1}
              animate={{ d: ["M0,50 Q25,20 50,50 T100,50 L100,100 L0,100 Z", "M0,50 Q25,80 50,50 T100,50 L100,100 L0,100 Z", "M0,50 Q25,20 50,50 T100,50 L100,100 L0,100 Z"] }}
              transition={{ duration: 10, repeat: Infinity, ease: [0.42, 0, 0.58, 1] as [number, number, number, number] }}
           />
         </svg>
       </div>
      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <FadeUp>
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-8" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', border: `1px solid ${tokens.accent1}` }}>
            <Activity className="h-8 w-8" style={{ color: tokens.accent1 }} />
          </div>
          <h2 className={`text-4xl md:text-5xl font-bold mb-8 ${spaceGrotesk.className}`} style={{ color: tokens.textHigh }}>
            Sentiment shifts, mapped.
          </h2>
          <p className="text-lg leading-relaxed mb-8" style={{ color: tokens.textLow }}>
            BotStream uses slow, atmospheric color bleeding to indicate the emotional tone of the meeting. From high-tension moments (Rose) to collaborative consensus (Blue), you see the unseen dynamics.
          </p>
        </FadeUp>
      </div>
    </section>
  )
}

function Pricing() {
  return (
    <section id="pricing" className="py-32" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-6xl mx-auto px-6">
        <FadeUp className="text-center mb-20">
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${spaceGrotesk.className}`} style={{ color: tokens.textHigh }}>Simple plans.</h2>
        </FadeUp>
        <StaggerContainer className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {[
            { n: 'Pro', p: '$15', desc: 'For independent professionals.', cta: 'Start Trial', features: ['Unlimited meetings', 'Live transcription', 'Action extraction', 'Integrations'] },
            { n: 'Team', p: '$49', desc: 'For collaborative teams.', cta: 'Get Team', features: ['Everything in Pro', 'Shared knowledge base', 'Sentiment analysis', 'Admin controls'], hl: true }
          ].map(tier => (
            <motion.div
              key={tier.n}
              variants={staggerItem}
              className="p-10 rounded-3xl border relative flex flex-col"
              style={{
                borderColor: tier.hl ? tokens.accent1 : tokens.border,
                backgroundColor: tier.hl ? 'rgba(59, 130, 246, 0.05)' : tokens.surface,
              }}
            >
              <h3 className={`text-2xl font-bold mb-2 ${spaceGrotesk.className}`} style={{ color: tokens.textHigh }}>{tier.n}</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className={`text-5xl font-bold ${spaceGrotesk.className}`} style={{ color: tokens.textHigh }}>{tier.p}</span>
                <span className={`text-sm ${jetbrainsMono.className}`} style={{ color: tokens.textLow }}>/ user / month</span>
              </div>
              <p className="text-sm mb-8" style={{ color: tokens.textLow }}>{tier.desc}</p>
              <ul className="space-y-4 mb-10 flex-1">
                {tier.features.map(f => (
                  <li key={f} className="flex items-center gap-3 text-sm">
                    <Check className="h-5 w-5" style={{ color: tokens.accent1 }} />
                    <span style={{ color: tokens.textHigh }}>{f}</span>
                  </li>
                ))}
              </ul>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full h-14 rounded-full font-medium text-sm"
                style={tier.hl
                  ? { backgroundColor: tokens.accent1, color: '#fff' }
                  : { backgroundColor: tokens.surface, color: tokens.textHigh, border: `1px solid ${tokens.border}` }}
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

function Footer() {
  return (
    <footer className="py-12 border-t" style={{ backgroundColor: tokens.background, borderColor: tokens.border }}>
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <span className={`font-bold text-xl ${spaceGrotesk.className}`} style={{ color: tokens.textHigh }}>{PRODUCT_NAME}</span>
        <div className="flex gap-6 text-sm" style={{ color: tokens.textLow }}>
          <a href="#" className="hover:text-white transition-colors">Twitter</a>
          <a href="#" className="hover:text-white transition-colors">GitHub</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
        </div>
      </div>
    </footer>
  )
}

export default function BotStreamPage() {
  return (
    <div className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans selection:bg-blue-500/30`} style={{ backgroundColor: tokens.background, color: tokens.textHigh }}>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Features />
        <Intelligence />
        <Pricing />
      </main>
      <Footer />
    </div>
  )
}
