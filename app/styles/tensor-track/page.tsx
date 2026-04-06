'use client'

import { motion, useScroll, useTransform, useInView, useSpring, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import {
  Activity, BarChart3, Database, Workflow, Cpu, Zap,
  Layers, ArrowRight, ChevronDown, Check, Command
} from 'lucide-react'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const tokens = {
  background: '#090A0C',
  surface: '#12141A',
  accent1: '#FF4D4D',
  accent2: '#00F0FF',
  metric: '#E5E7EB',
  border: 'rgba(255, 77, 77, 0.2)',
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

function DataStream({ children, delay = 0, className = "", style }: { children: React.ReactNode; delay?: number; className?: string; style?: React.CSSProperties }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-5% 0px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 25, delay }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  )
}

function MetricPulse({ active = true, children, className = "", style }: { active?: boolean; children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <motion.div
      animate={active ? { filter: ["brightness(1)", "brightness(1.5)", "brightness(1)"] } : {}}
      transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  )
}

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-md" style={{ borderColor: tokens.border, backgroundColor: `${tokens.background}E6` }}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Activity className="h-5 w-5" style={{ color: tokens.accent1 }} />
          <span className={`font-bold text-lg tracking-tight ${spaceGrotesk.className}`} style={{ color: tokens.textHigh }}>
            TensorTrack
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {['Dashboard', 'Experiments', 'Pipelines', 'Alerts'].map(link => (
            <a key={link} href={`#${link.toLowerCase()}`} className={`text-sm transition-colors hover:text-white ${inter.className}`} style={{ color: tokens.textLow }}>
              {link}
            </a>
          ))}
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-5 h-9 rounded text-sm font-bold flex items-center gap-2 ${spaceGrotesk.className}`}
          style={{ backgroundColor: tokens.accent1, color: tokens.background }}
        >
          Deploy <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section className="min-h-screen flex items-center pt-24 pb-16 overflow-hidden relative" style={{ backgroundColor: tokens.background }}>
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        {/* Abstract streaming background */}
        <motion.div
          animate={{ x: ["0%", "-100%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute w-[200%] h-full flex opacity-10"
        >
           <div className="w-1/2 h-full" style={{ background: `repeating-linear-gradient(90deg, transparent, transparent 40px, ${tokens.accent1} 40px, ${tokens.accent1} 41px)` }} />
           <div className="w-1/2 h-full" style={{ background: `repeating-linear-gradient(90deg, transparent, transparent 40px, ${tokens.accent1} 40px, ${tokens.accent1} 41px)` }} />
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-8 ${jetbrainsMono.className}`}
          style={{ borderColor: tokens.border, backgroundColor: `${tokens.accent1}10` }}
        >
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: tokens.accent1, boxShadow: `0 0 8px ${tokens.accent1}` }} />
          <span className="text-xs font-bold uppercase tracking-wider" style={{ color: tokens.accent1 }}>Streaming 10M+ EPS</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className={`text-6xl md:text-8xl font-black tracking-tighter leading-none mb-6 ${spaceGrotesk.className}`}
          style={{ color: tokens.textHigh }}
        >
          REAL-TIME <br />
          <span style={{ color: tokens.accent1 }}>AI TELEMETRY.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className={`text-lg md:text-xl mb-10 max-w-2xl ${inter.className}`}
          style={{ color: tokens.textLow }}
        >
          High-frequency data streaming and experiment tracking for machine learning infrastructure. Monitor GPU clusters, loss curves, and data pipelines with sub-millisecond latency.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
           <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`h-14 px-8 rounded font-bold flex items-center justify-center gap-2 text-lg ${spaceGrotesk.className}`}
              style={{ backgroundColor: tokens.accent1, color: tokens.background }}
            >
              <Command className="w-5 h-5" /> Start Tracking
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`h-14 px-8 rounded font-bold border flex items-center justify-center text-lg ${spaceGrotesk.className}`}
              style={{ borderColor: tokens.border, color: tokens.textHigh }}
            >
              View Dashboard
            </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

function LiveMetrics() {
  return (
    <section className="py-12 border-y" style={{ borderColor: tokens.border, backgroundColor: tokens.surface }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Active Jobs', val: '1,492', icon: Zap, color: tokens.accent1 },
            { label: 'Ingest Rate', val: '84GB/s', icon: Database, color: tokens.accent2 },
            { label: 'GPU Util', val: '98.4%', icon: Cpu, color: tokens.metric },
            { label: 'Avg Latency', val: '0.4ms', icon: Activity, color: tokens.accent1 }
          ].map((stat, i) => (
            <DataStream key={i} delay={i * 0.1} className="p-4 rounded border flex items-center gap-4" style={{ borderColor: tokens.border, backgroundColor: tokens.background }}>
              <div className="p-3 rounded" style={{ backgroundColor: `${stat.color}15` }}>
                <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
              </div>
              <div>
                <MetricPulse className={`text-xl font-bold ${jetbrainsMono.className}`} style={{ color: tokens.textHigh }}>{stat.val}</MetricPulse>
                <div className={`text-xs uppercase tracking-wider ${inter.className}`} style={{ color: tokens.textLow }}>{stat.label}</div>
              </div>
            </DataStream>
          ))}
        </div>
      </div>
    </section>
  )
}

const FEATURES = [
  { icon: BarChart3, title: 'High-Frequency Charts', desc: 'Render millions of data points smoothly with WebGL-accelerated plotting.' },
  { icon: Layers, title: 'Multi-Experiment Diffing', desc: 'Overlay and compare hundreds of training runs to spot anomalies instantly.' },
  { icon: Workflow, title: 'Pipeline Visualizer', desc: 'Track data lineage and transformation steps before they hit your models.' },
  { icon: Database, title: 'Infinite Retention', desc: 'Cold storage integration ensures you never lose a single metric from past runs.' },
  { icon: Cpu, title: 'Hardware Profiling', desc: 'Correlate loss spikes directly with GPU thermal throttling or memory pressure.' },
  { icon: Zap, title: 'Alerting Rules', desc: 'Trigger webhooks when NaN loss is detected or validation accuracy plateaus.' }
]

function Features() {
  return (
    <section className="py-24 relative" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-7xl mx-auto px-6">
        <FadeUp>
          <div className="mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 uppercase ${spaceGrotesk.className}`} style={{ color: tokens.textHigh }}>
              Built for <span style={{ color: tokens.accent1 }}>Velocity</span>
            </h2>
            <p className={`text-lg max-w-2xl ${inter.className}`} style={{ color: tokens.textLow }}>
              When training costs thousands per hour, you can't afford blind spots.
            </p>
          </div>
        </FadeUp>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, i) => (
            <FadeUp key={feature.title} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -5, borderColor: tokens.accent1 }}
                className="p-8 rounded border transition-colors h-full"
                style={{ borderColor: tokens.border, backgroundColor: tokens.surface }}
              >
                <feature.icon className="w-8 h-8 mb-6" style={{ color: tokens.accent2 }} strokeWidth={1.5} />
                <h3 className={`text-xl font-bold mb-3 ${spaceGrotesk.className}`} style={{ color: tokens.textHigh }}>{feature.title}</h3>
                <p className={`text-sm leading-relaxed ${inter.className}`} style={{ color: tokens.textLow }}>{feature.desc}</p>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}

function LogStream() {
  const [logs, setLogs] = useState<string[]>([])

  useEffect(() => {
    const messages = [
      "Epoch 42: Loss=0.241, Acc=0.91",
      "WARN: GPU_3 Temp > 85C",
      "Checkpoint saved to s3://models/v4",
      "Starting validation phase...",
      "Downloading dataset batch #8492",
      "Gradient norm scaled by 0.5"
    ]
    const interval = setInterval(() => {
      setLogs(prev => {
        const next = [messages[Math.floor(Math.random() * messages.length)], ...prev].slice(0, 5)
        return next
      })
    }, 800)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-24 border-y overflow-hidden" style={{ borderColor: tokens.border, backgroundColor: tokens.surface }}>
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <div className="relative h-96 rounded border p-4 overflow-hidden flex flex-col" style={{ borderColor: tokens.border, backgroundColor: tokens.background }}>
           <div className="flex gap-2 mb-4 pb-4 border-b" style={{ borderColor: tokens.border }}>
             <div className="w-3 h-3 rounded-full bg-red-500" />
             <div className="w-3 h-3 rounded-full bg-yellow-500" />
             <div className="w-3 h-3 rounded-full bg-green-500" />
           </div>
           <div className="flex-1 relative">
             <AnimatePresence>
               {logs.map((log, i) => (
                 <motion.div
                   key={`${log}-${i}`}
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1 - (i * 0.2), y: i * 30 }}
                   exit={{ opacity: 0 }}
                   className={`absolute w-full text-sm flex gap-4 ${jetbrainsMono.className}`}
                   style={{ color: log.includes('WARN') ? tokens.accent1 : tokens.textLow }}
                 >
                   <span style={{ color: tokens.accent2 }}>{new Date().toISOString().split('T')[1].slice(0,-1)}</span>
                   <span>{log}</span>
                 </motion.div>
               ))}
             </AnimatePresence>
           </div>
        </div>

        <FadeUp>
           <h2 className={`text-4xl md:text-5xl font-bold mb-6 uppercase ${spaceGrotesk.className}`} style={{ color: tokens.textHigh }}>
              Live <span style={{ color: tokens.accent2 }}>Telemetry</span>
            </h2>
            <p className={`text-lg mb-8 leading-relaxed ${inter.className}`} style={{ color: tokens.textLow }}>
              Stream logs, metrics, and hardware stats directly from your distributed cluster to your browser with zero noticeable latency.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`h-12 px-6 rounded font-bold border flex items-center justify-center gap-2 ${spaceGrotesk.className}`}
              style={{ borderColor: tokens.accent2, color: tokens.accent2 }}
            >
              Explore WebSockets API
            </motion.button>
        </FadeUp>
      </div>
    </section>
  )
}

function DataVisualizer() {
  return (
     <section className="py-24" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-7xl mx-auto px-6 text-center">
        <FadeUp>
          <h2 className={`text-3xl md:text-5xl font-bold mb-16 uppercase ${spaceGrotesk.className}`} style={{ color: tokens.textHigh }}>High-Speed Plotting</h2>
        </FadeUp>

        <div className="w-full h-80 rounded border relative overflow-hidden" style={{ borderColor: tokens.border, backgroundColor: tokens.surface }}>
           {/* Simulated chart */}
           <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
             <defs>
               <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
                 <stop offset="0%" stopColor={tokens.accent1} stopOpacity="0.5" />
                 <stop offset="100%" stopColor={tokens.accent1} stopOpacity="0" />
               </linearGradient>
             </defs>
             <motion.path
               d="M 0 300 Q 100 150 200 200 T 400 100 T 600 180 T 800 50 T 1000 120 L 1000 300 L 0 300 Z"
               fill="url(#grad1)"
               initial={{ y: 50, opacity: 0 }}
               whileInView={{ y: 0, opacity: 1 }}
               transition={{ duration: 1 }}
             />
             <motion.path
               d="M 0 300 Q 100 150 200 200 T 400 100 T 600 180 T 800 50 T 1000 120"
               stroke={tokens.accent1}
               strokeWidth="3"
               fill="none"
               initial={{ pathLength: 0 }}
               whileInView={{ pathLength: 1 }}
               transition={{ duration: 1.5, ease: "easeOut" }}
             />
           </svg>
           {/* Scanning line */}
           <motion.div
             animate={{ x: ["0%", "100%"] }}
             transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
             className="absolute top-0 bottom-0 w-1 bg-white"
             style={{ boxShadow: `0 0 10px 2px ${tokens.textHigh}` }}
           />
        </div>
      </div>
    </section>
  )
}

const PRICING = [
  { name: 'Developer', price: 'Free', desc: 'Up to 2 concurrent training runs.', cta: 'Start Free' },
  { name: 'Team', price: '$99', desc: 'Up to 50 concurrent runs + SSO.', cta: 'Upgrade' },
  { name: 'Cluster', price: 'Custom', desc: 'Unlimited scale for massive jobs.', cta: 'Contact' }
]

function Pricing() {
  return (
    <section className="py-24 border-y" style={{ borderColor: tokens.border, backgroundColor: tokens.surface }}>
      <div className="max-w-7xl mx-auto px-6">
         <FadeUp>
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-5xl font-bold mb-4 uppercase ${spaceGrotesk.className}`} style={{ color: tokens.textHigh }}>Plans & Limits</h2>
          </div>
        </FadeUp>

        <div className="grid md:grid-cols-3 gap-6">
          {PRICING.map((tier, i) => (
            <DataStream key={tier.name} delay={i * 0.1} className="p-8 rounded border flex flex-col" style={{ borderColor: tokens.border, backgroundColor: tokens.background }}>
              <h3 className={`text-2xl font-bold mb-2 uppercase ${spaceGrotesk.className}`} style={{ color: tokens.textHigh }}>{tier.name}</h3>
              <div className="mb-4">
                <span className={`text-5xl font-bold ${jetbrainsMono.className}`} style={{ color: tokens.accent1 }}>{tier.price}</span>
              </div>
              <p className={`text-sm mb-8 flex-1 ${inter.className}`} style={{ color: tokens.textLow }}>{tier.desc}</p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full py-4 rounded font-bold transition-colors uppercase ${spaceGrotesk.className}`}
                style={{ backgroundColor: i === 1 ? tokens.accent1 : 'transparent', border: `1px solid ${i === 1 ? tokens.accent1 : tokens.border}`, color: i === 1 ? tokens.background : tokens.textHigh }}
              >
                {tier.cta}
              </motion.button>
            </DataStream>
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="py-24" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-3xl mx-auto px-6">
        <FadeUp>
          <h2 className={`text-3xl md:text-5xl font-bold mb-12 text-center uppercase ${spaceGrotesk.className}`} style={{ color: tokens.textHigh }}>System Queries</h2>
        </FadeUp>

        <div className="space-y-4">
          {[
            { q: "Is there a python SDK?", a: "Yes, `pip install tensortrack` gives you a fully typed client." },
            { q: "How much overhead does logging add?", a: "Logging is asynchronous and adds <0.5ms per step." },
            { q: "Can I self-host?", a: "Cluster plans include a Docker-compose setup for VPC deployment." }
          ].map((item, i) => (
            <div key={i} className="border rounded" style={{ borderColor: open === i ? tokens.accent1 : tokens.border }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className={`w-full p-6 text-left flex justify-between items-center ${inter.className}`}
                style={{ color: tokens.textHigh }}
              >
                <span className="font-bold">{item.q}</span>
                <ChevronDown className={`w-5 h-5 transition-transform ${open === i ? 'rotate-180' : ''}`} style={{ color: tokens.accent1 }} />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className={`p-6 pt-0 text-sm ${inter.className}`} style={{ color: tokens.textLow }}>
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
    <section className="py-24 border-y" style={{ borderColor: tokens.border, backgroundColor: tokens.surface }}>
      <div className="max-w-xl mx-auto px-6 text-center">
        <FadeUp>
          <h2 className={`text-3xl font-bold mb-4 uppercase ${spaceGrotesk.className}`} style={{ color: tokens.textHigh }}>Stay Updated</h2>
          <p className={`text-sm mb-8 ${inter.className}`} style={{ color: tokens.textLow }}>Join the mailing list for changelogs and platform updates.</p>

          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="EMAIL ADDRESS"
              className={`flex-1 bg-transparent border rounded px-4 py-3 text-sm focus:outline-none focus:border-red-500 uppercase ${jetbrainsMono.className}`}
              style={{ borderColor: tokens.border, color: tokens.textHigh }}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-8 rounded font-bold uppercase ${spaceGrotesk.className}`}
              style={{ backgroundColor: tokens.textHigh, color: tokens.background }}
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
    <footer className="py-12" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
           <Activity className="w-6 h-6" style={{ color: tokens.accent1 }} />
           <span className={`font-bold uppercase tracking-widest ${spaceGrotesk.className}`} style={{ color: tokens.textHigh }}>TensorTrack</span>
        </div>

        <div className={`flex gap-8 text-sm uppercase tracking-wider ${jetbrainsMono.className}`} style={{ color: tokens.textLow }}>
          <a href="#" className="hover:text-white transition-colors">API</a>
          <a href="#" className="hover:text-white transition-colors">Github</a>
          <a href="#" className="hover:text-white transition-colors">Twitter</a>
        </div>
      </div>
    </footer>
  )
}

export default function TensorTrackPage() {
  return (
    <div className={`min-h-screen ${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} selection:bg-red-500/30`} style={{ backgroundColor: tokens.background }}>
      <Navbar />
      <main>
        <Hero />
        <LiveMetrics />
        <Features />
        <LogStream />
        <DataVisualizer />
        <Pricing />
        <FAQ />
        <Newsletter />
      </main>
      <Footer />
    </div>
  )
}
