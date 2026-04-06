'use client'

import { motion, useReducedMotion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Space_Grotesk, Roboto_Mono } from 'next/font/google'
import {
  Star, ChevronDown, ArrowRight, Check, MonitorPlay, Users, Layers, LayoutPanelLeft,
  Volume2, Settings, Zap, Video
} from 'lucide-react'

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space', display: 'swap' })
const robotoMono = Roboto_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' })

const tokens = {
  background: '#080808',
  surface: '#1A1A1A',
  accent1: '#9146FF',
  accent2: '#FF4500',
  border: 'rgba(145, 70, 255, 0.4)',
  textHigh: '#EFEEF1',
  textLow: '#ADADB8',
}

function FadeUp({ children, delay = 0, y = 28 }: { children: React.ReactNode; delay?: number, y?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-5% 0px' })
  const shouldReduce = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      initial={shouldReduce ? false : { opacity: 0, y }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.23, 1, 0.32, 1] }}
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
        visible: { transition: { staggerChildren: 0.1 } },
      }}
    >
      {children}
    </motion.div>
  )
}

import type { Variants } from 'framer-motion'

const staggerItem: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { type: 'spring' as const, stiffness: 500, damping: 35 } },
}

export default function StreamStackPage() {
  return (
    <div className={`${spaceGrotesk.variable} ${robotoMono.variable} font-sans min-h-screen selection:bg-[#9146FF] selection:text-white`} style={{ backgroundColor: tokens.background, color: tokens.textHigh }}>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Features />
        <UniqueSection />
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

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed top-0 left-0 right-0 z-50 border-b"
      style={{
        backgroundColor: scrolled ? 'rgba(8, 8, 8, 0.8)' : tokens.background,
        borderColor: scrolled ? tokens.border : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none'
      }}
    >
      <div className="max-w-[1600px] mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded bg-[#9146FF] flex items-center justify-center">
            <MonitorPlay className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight">StreamStack</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {['Features', 'Layouts', 'Pricing', 'Docs'].map(link => (
            <motion.a
              key={link}
              href={`#${link.toLowerCase()}`}
              whileHover={{ color: '#fff', textShadow: '0 0 8px rgba(255,255,255,0.5)' }}
              className="text-sm font-medium transition-colors"
              style={{ color: tokens.textLow }}
            >
              {link}
            </motion.a>
          ))}
        </div>
        <div className="flex gap-4">
           <motion.button
             whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(145, 70, 255, 0.5)' }}
             whileTap={{ scale: 0.95 }}
             className="px-5 h-9 rounded text-sm font-bold bg-[#9146FF] text-white transition-shadow"
           >
             Launch App
           </motion.button>
        </div>
      </div>
    </motion.nav>
  )
}

function Hero() {
  return (
    <section className="min-h-[90vh] flex flex-col justify-center pt-24 pb-12 relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none"
           style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="max-w-[1600px] mx-auto px-6 w-full relative z-10 flex flex-col lg:flex-row items-center gap-16">
        <div className="flex-1">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#1A1A1A] border mb-6"
            style={{ borderColor: tokens.border }}
          >
            <span className="w-2 h-2 rounded-full bg-[#FF4500] animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-wider text-[#FF4500]">System Online</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-6xl md:text-8xl font-bold leading-[1.1] tracking-tight mb-6"
          >
            The Director&apos;s <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9146FF] to-[#00D1FF]">
              Cut of Live
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl mb-10 max-w-2xl"
            style={{ color: tokens.textLow }}
          >
            Modular, immersive, and control-centric. Turn your browser into a master control room. Orchestrate multiple streams with drag-and-drop physics and zero latency.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(145, 70, 255, 0.6)' }}
              whileTap={{ scale: 0.98 }}
              className="h-12 px-8 rounded font-bold flex items-center justify-center gap-2 bg-[#9146FF] text-white"
            >
              Start Stacking <ArrowRight className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02, backgroundColor: '#222' }}
              whileTap={{ scale: 0.98 }}
              className="h-12 px-8 rounded font-bold border flex items-center justify-center gap-2 bg-[#1A1A1A]"
              style={{ borderColor: tokens.border, color: tokens.textHigh }}
            >
              <Settings className="w-4 h-4" /> View Documentation
            </motion.button>
          </motion.div>
        </div>

        {/* Hero Visual: Simulated Multi-stream layout */}
        <motion.div
          className="flex-1 w-full aspect-video bg-[#1A1A1A] border rounded-lg p-2 grid grid-cols-3 grid-rows-3 gap-2 relative shadow-[0_0_50px_rgba(145,70,255,0.15)]"
          style={{ borderColor: tokens.border }}
          initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 30, delay: 0.4 }}
        >
           {/* Main Stage */}
           <motion.div className="col-span-2 row-span-2 bg-black rounded relative group overflow-hidden border border-[#333]">
              <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/50 rounded font-mono text-[10px] backdrop-blur flex items-center gap-1">
                 <span className="w-1.5 h-1.5 rounded-full bg-[#FF4500]" /> LIVE
              </div>
              <motion.div
                className="absolute inset-0 border-2 border-transparent group-hover:border-[#9146FF] transition-colors"
                animate={{ boxShadow: ['0 0 0px #9146FF', '0 0 20px rgba(145,70,255,0)'], transition: { repeat: Infinity, duration: 2 } }}
              />
           </motion.div>
           {/* Side streams */}
           {[1,2].map(i => (
              <motion.div key={i} className="bg-[#111] rounded border border-[#333] relative group">
                 <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
           ))}
           {/* Bottom streams */}
           {[3,4,5].map(i => (
              <motion.div key={i} className="bg-[#111] rounded border border-[#333]" />
           ))}
        </motion.div>
      </div>
    </section>
  )
}

function Stats() {
  const stats = [
    { value: '0ms', label: 'Added Latency' },
    { value: '16', label: 'Max Concurrent Streams' },
    { value: '4K', label: 'Resolution Support' },
    { value: '100%', label: 'Layout Flexibility' },
  ]
  return (
    <section className="py-12 border-y border-[#333] bg-[#111]">
      <div className="max-w-[1600px] mx-auto px-6">
        <StaggerContainer>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map(stat => (
              <motion.div key={stat.label} variants={staggerItem} className="flex flex-col gap-1">
                <p className="text-4xl font-bold font-mono text-[#9146FF]">{stat.value}</p>
                <p className="text-xs font-mono uppercase tracking-widest text-[#ADADB8]">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  )
}

function Features() {
  const features = [
    { icon: LayoutPanelLeft, title: 'Infinite Layouts', description: 'Drag, drop, snap. Create your perfect multi-monitor setup within a single browser tab.' },
    { icon: Volume2, title: 'Per-Stream Mixer', description: 'Independent audio controls for every feed with visual waveforms to track who is speaking.' },
    { icon: Zap, title: 'Zero Latency Feel', description: 'Built on a high-performance stack that prioritizes video decoding speed above all else.' },
    { icon: Users, title: 'Squad Mode', description: 'Share your layout instantly with friends via a simple URL. Watch exactly what they watch.' },
    { icon: Layers, title: 'HUD Overlays', description: 'Toggle chat, stats, and alerts as transparent overlays over any video feed.' },
    { icon: Video, title: 'Main Stage Focus', description: 'Double-click any stream to instantly swap it to the main stage position.' },
  ]

  return (
    <section id="features" className="py-24">
      <div className="max-w-[1600px] mx-auto px-6">
        <FadeUp>
          <div className="mb-16 max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Master Control Room</h2>
            <p className="text-lg text-[#ADADB8]">
              Professional-grade tools for consuming multiple live feeds simultaneously. Designed for esports, events, and power viewers.
            </p>
          </div>
        </FadeUp>
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={staggerItem}
                whileHover={{ y: -5, backgroundColor: '#222' }}
                className="p-8 rounded bg-[#1A1A1A] border border-[#333] transition-colors"
              >
                <div className="w-10 h-10 rounded bg-[#9146FF]/20 flex items-center justify-center mb-6">
                  <feature.icon className="h-5 w-5 text-[#9146FF]" />
                </div>
                <h3 className="font-bold text-xl mb-3 tracking-tight">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-[#ADADB8]">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  )
}

function UniqueSection() {
  // Simulate an interactive layout demo
  const [layout, setLayout] = useState([1, 2, 3, 4])

  const swapToMain = (id: number) => {
    setLayout(prev => {
      const newLayout = [...prev]
      const mainIdx = newLayout.indexOf(id)
      const currentMain = newLayout[0]
      newLayout[0] = id
      newLayout[mainIdx] = currentMain
      return newLayout
    })
  }

  return (
    <section id="layouts" className="py-24 bg-[#111] border-y border-[#333]">
      <div className="max-w-[1600px] mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <FadeUp>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">The &quot;Main Stage&quot; Morph</h2>
            <p className="text-lg mb-8 text-[#ADADB8]">
              Don&apos;t miss a moment. Click any stream in the grid to smoothly transition it to the primary viewing position while others reorganize around it. Layout snaps instantly with `framer-motion` spring physics.
            </p>
            <div className="flex gap-4">
              <button className="px-4 py-2 bg-[#9146FF]/20 text-[#9146FF] text-sm font-mono rounded border border-[#9146FF]/50 hover:bg-[#9146FF]/30 transition">
                // Try clicking a small screen
              </button>
            </div>
          </FadeUp>

          <FadeUp delay={0.2}>
            <div className="aspect-video bg-[#1A1A1A] border border-[#333] rounded p-4 grid grid-cols-3 grid-rows-3 gap-4 relative">
               {layout.map((id, index) => {
                  const isMain = index === 0;
                  return (
                    <motion.div
                      layout
                      key={id}
                      onClick={() => !isMain && swapToMain(id)}
                      className={`${isMain ? 'col-span-2 row-span-3' : 'col-span-1 row-span-1'} bg-black rounded border border-[#333] relative cursor-pointer group overflow-hidden flex items-center justify-center`}
                      initial={false}
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                      whileHover={{ borderColor: '#9146FF' }}
                    >
                      <span className="font-mono text-[#333] text-4xl font-bold">{id}</span>
                      {!isMain && (
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity backdrop-blur-sm">
                          <span className="text-xs font-bold text-white uppercase tracking-widest bg-[#9146FF] px-2 py-1 rounded">Focus</span>
                        </div>
                      )}
                      {/* Fake Bitrate Line */}
                      <svg className="absolute bottom-2 left-2 right-2 h-6 opacity-30" preserveAspectRatio="none">
                        <motion.path
                          d={isMain ? "M0,10 Q5,0 10,10 T20,10 T30,5 T40,15 T50,10 T60,5 T70,10 T80,15 T90,5 T100,10" : "M0,5 L100,5"}
                          stroke="#9146FF" strokeWidth="2" fill="none"
                          animate={{ d: isMain ? ["M0,10 Q5,0 10,10 T20,10 T30,5 T40,15 T50,10 T60,5 T70,10 T80,15 T90,5 T100,10", "M0,10 Q5,15 10,10 T20,10 T30,15 T40,5 T50,10 T60,15 T70,10 T80,5 T90,15 T100,10"] : undefined }}
                          transition={{ repeat: Infinity, duration: 1, repeatType: "mirror" }}
                        />
                      </svg>
                    </motion.div>
                  )
               })}
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}

function ProductDetail() {
  return (
    <section className="py-24">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <FadeUp>
          <div className="w-16 h-16 mx-auto bg-[#1A1A1A] border border-[#333] rounded mb-8 flex items-center justify-center">
             <Settings className="w-8 h-8 text-[#9146FF]" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Built for Power Users</h2>
          <p className="text-lg text-[#ADADB8] mb-8 leading-relaxed">
            We ripped out the unnecessary bloat of standard video players. StreamStack uses WebRTC and custom rendering pipelines to ensure that watching 4 streams uses less CPU than watching 1 on a standard platform.
          </p>
          <div className="inline-flex items-center gap-4 text-sm font-mono text-[#ADADB8] bg-[#111] px-4 py-2 rounded border border-[#333]">
             <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-500" /> CPU: Normal</span>
             <span className="w-px h-4 bg-[#333]" />
             <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-500" /> RAM: Stable</span>
             <span className="w-px h-4 bg-[#333]" />
             <span className="flex items-center gap-2 text-[#9146FF]">GPU ACCEL: ON</span>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

function Pricing() {
  const plans = [
    { name: 'Viewer', price: '$0', period: 'forever', desc: 'Basic multi-stream viewing.', features: ['Up to 4 streams', 'Standard layouts', 'Community support'] },
    { name: 'Director', price: '$9', period: '/mo', desc: 'For the ultimate broadcast experience.', features: ['Unlimited streams', 'Custom layout saving', 'Audio mixer saving', 'No ads overlay', 'Priority routing'], highlighted: true },
    { name: 'Tournament', price: '$49', period: '/mo', desc: 'For organizers and watch parties.', features: ['Synchronized squad viewing', 'Custom branding', 'API access', '24/7 Support'] },
  ]

  return (
    <section id="pricing" className="py-24 bg-[#111] border-y border-[#333]">
      <div className="max-w-[1600px] mx-auto px-6">
        <FadeUp>
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Simple Subscriptions</h2>
            <p className="text-lg text-[#ADADB8]">Upgrade your control room when you need more power.</p>
          </div>
        </FadeUp>
        <StaggerContainer>
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <motion.div
                key={plan.name}
                variants={staggerItem}
                className="p-8 rounded bg-[#1A1A1A] border relative flex flex-col"
                style={{ borderColor: plan.highlighted ? '#9146FF' : '#333' }}
              >
                {plan.highlighted && (
                  <div className="absolute top-0 right-8 transform -translate-y-1/2 bg-[#9146FF] text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded">
                    Pro Pick
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-mono font-bold">{plan.price}</span>
                  <span className="text-[#ADADB8] text-sm">{plan.period}</span>
                </div>
                <p className="text-sm text-[#ADADB8] mb-8 flex-1">{plan.desc}</p>
                <ul className="space-y-4 mb-8">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-3 text-sm">
                      <div className="w-4 h-4 rounded-full bg-[#9146FF]/20 flex items-center justify-center flex-shrink-0">
                         <Check className="w-3 h-3 text-[#9146FF]" />
                      </div>
                      <span className="text-[#EFEEF1]">{f}</span>
                    </li>
                  ))}
                </ul>
                <motion.button
                  whileHover={{ scale: 1.02, backgroundColor: plan.highlighted ? '#7a3be0' : '#333' }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 rounded font-bold transition-colors"
                  style={{
                    backgroundColor: plan.highlighted ? '#9146FF' : '#222',
                    color: '#fff',
                    border: plan.highlighted ? 'none' : '1px solid #444'
                  }}
                >
                  Select Plan
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
  const reviews = [
    { text: "I can't go back to normal viewing. Having 4 POV streams up during a tournament with perfect sync is game-changing.", author: "ProPlayer99", role: "Twitch Partner" },
    { text: "The audio mixer alone is worth the sub. Finally I can lower the volume of the main cast and boost player comms.", author: "EsportsFan", role: "Power Viewer" },
    { text: "Layout snap is incredibly satisfying. It feels like snapping windows in an OS, but built for video.", author: "TechStreamer", role: "Content Creator" }
  ]
  return (
    <section className="py-24">
      <div className="max-w-[1600px] mx-auto px-6">
         <StaggerContainer>
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                className="p-6 bg-[#111] border border-[#333] rounded"
              >
                <div className="flex gap-1 mb-4">
                  {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-[#9146FF] text-[#9146FF]" />)}
                </div>
                <p className="text-[#EFEEF1] mb-6 text-sm leading-relaxed">&quot;{r.text}&quot;</p>
                <div>
                  <p className="font-bold text-sm font-mono">{r.author}</p>
                  <p className="text-xs text-[#ADADB8]">{r.role}</p>
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
  const faqs = [
    { q: 'Does it use more bandwidth?', a: 'Yes, downloading multiple video streams requires more bandwidth. However, our engine optimizes decoding so CPU/RAM usage remains low.' },
    { q: 'Can I log in with Twitch/YouTube?', a: 'Yes, OAuth integration allows you to bring your subscriptions, chat privileges, and emotes directly into StreamStack.' },
    { q: 'Is there a desktop app?', a: 'StreamStack is currently a web application optimized for Chromium-based browsers, but a standalone Electron app is in beta.' }
  ]
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq" className="py-24 bg-[#111] border-t border-[#333]">
      <div className="max-w-3xl mx-auto px-6">
        <FadeUp>
          <h2 className="text-3xl font-bold mb-10 text-center tracking-tight">System Queries</h2>
        </FadeUp>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              className="border border-[#333] bg-[#1A1A1A] rounded"
            >
              <button
                className="w-full px-6 py-4 text-left font-bold text-sm flex justify-between items-center"
                onClick={() => setOpen(open === i ? null : i)}
              >
                {faq.q}
                <ChevronDown className={`w-4 h-4 text-[#9146FF] transition-transform ${open === i ? 'rotate-180' : ''}`} />
              </button>
              <motion.div
                initial={false}
                animate={{ height: open === i ? 'auto' : 0, opacity: open === i ? 1 : 0 }}
                className="overflow-hidden"
              >
                <p className="px-6 pb-4 text-sm text-[#ADADB8] leading-relaxed">{faq.a}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Newsletter() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-2xl mx-auto px-6 text-center relative z-10">
        <FadeUp>
          <div className="inline-flex items-center justify-center w-12 h-12 rounded bg-[#9146FF]/20 text-[#9146FF] mb-6">
             <Zap className="w-6 h-6" />
          </div>
          <h2 className="text-3xl font-bold mb-4 tracking-tight">Initialize Connection</h2>
          <p className="text-[#ADADB8] mb-8 text-sm">Join the beta testing ring. Get early access to new layout engines and platform integrations.</p>
          <form className="flex flex-col sm:flex-row gap-2" onSubmit={e => e.preventDefault()}>
            <input
              type="email"
              placeholder="user@system.local"
              className="flex-1 px-4 py-3 bg-[#111] border border-[#333] rounded text-sm text-white font-mono focus:outline-none focus:border-[#9146FF] transition-colors"
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 bg-[#9146FF] text-white font-bold rounded text-sm tracking-wide"
            >
              Execute
            </motion.button>
          </form>
        </FadeUp>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="py-8 border-t border-[#333] bg-[#080808]">
      <div className="max-w-[1600px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-[#ADADB8]">
        <div className="flex items-center gap-2">
           <MonitorPlay className="w-4 h-4 text-[#9146FF]" /> StreamStack v3.0.1
        </div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">Github</a>
          <a href="#" className="hover:text-white transition-colors">Discord</a>
          <a href="#" className="hover:text-white transition-colors">Status</a>
        </div>
      </div>
    </footer>
  )
}
