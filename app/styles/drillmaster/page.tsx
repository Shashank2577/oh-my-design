'use client'

import { motion, useReducedMotion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Public_Sans, Indie_Flower } from 'next/font/google'
import {
  PenTool, ChevronDown, ArrowRight, Check, Target, Users, Layout, Zap, Award, BookOpen
} from 'lucide-react'

const publicSans = Public_Sans({ subsets: ['latin'], variable: '--font-public-sans' })
const indieFlower = Indie_Flower({ weight: '400', subsets: ['latin'], variable: '--font-indie-flower' })

const tokens = {
  background: '#0D2A1F',
  surface: 'rgba(13, 42, 31, 0.8)',
  lines: 'rgba(255, 255, 255, 0.8)',
  accent: '#FACC15',
  foreground: '#FFFFFF',
  mutedForeground: 'rgba(255, 255, 255, 0.6)',
  border: 'rgba(255, 255, 255, 0.2)'
}

const PRODUCT_NAME = 'DrillMaster'
const TAGLINE = 'The Playbook, Evolved.'
const DESCRIPTION = 'Tactical precision meets fluid strategy. Turn complex plays into visual stories with our interactive coaching canvas.'

function ChalkPath({ d, delay = 0, style }: { d: string; delay?: number, style?: React.CSSProperties }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' })
  return (
    <motion.path
      ref={ref}
      d={d}
      stroke={tokens.lines}
      strokeWidth={2}
      fill="none"
      initial={{ pathLength: 0, opacity: 0.5 }}
      animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
      transition={{ duration: 2, ease: "linear", delay }}
      style={{ strokeDasharray: '5,5', ...style }}
    />
  )
}

function MagneticNode({ children, className, style }: { children: React.ReactNode, className?: string, style?: React.CSSProperties }) {
  return (
    <motion.div
      drag
      dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 800, damping: 40 }}
      className={`cursor-grab active:cursor-grabbing ${className}`}
      style={style}
    >
      {children}
    </motion.div>
  )
}

export default function DrillMasterPage() {
  const shouldReduce = useReducedMotion()
  const { scrollYProgress } = useScroll()

  return (
    <div className={`${publicSans.variable} ${indieFlower.variable} font-sans min-h-screen text-white relative overflow-hidden`} style={{ backgroundColor: tokens.background }}>
      {/* Texture Overlay */}
      <div className="pointer-events-none fixed inset-0 opacity-[0.03] mix-blend-overlay z-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }} />

      <Navbar />
      <main className="relative z-10">
        <Hero />
        <Stats />
        <Features />
        <TacticalCanvasSection />
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
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-md"
      style={{ borderColor: tokens.border, backgroundColor: tokens.surface }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <PenTool className="w-5 h-5" style={{ color: tokens.accent }} />
          <span className="font-bold text-xl uppercase tracking-widest">{PRODUCT_NAME}</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {['Features', 'Pricing', 'Testimonials'].map(link => (
            <a key={link} href={`#${link.toLowerCase()}`} className="text-sm tracking-wide hover:text-accent transition-colors" style={{ color: tokens.lines }}>
              {link}
            </a>
          ))}
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-5 h-10 rounded text-sm font-bold uppercase tracking-wider text-black"
          style={{ backgroundColor: tokens.accent }}
        >
          Draft Play
        </motion.button>
      </div>
    </motion.nav>
  )
}

function Hero() {
  return (
    <section className="min-h-screen flex items-center pt-24 pb-16 relative">
      {/* Background Chalk Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <ChalkPath d="M 100,100 C 300,200 400,100 800,400" />
        <ChalkPath d="M 200,600 C 500,500 600,800 1000,200" delay={0.5} />
      </svg>

      <div className="max-w-6xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, staggerChildren: 0.2 }}
        >
          <motion.p className="font-handwritten text-2xl mb-4" style={{ color: tokens.accent, fontFamily: 'var(--font-indie-flower)' }}>
            Design the winning strategy.
          </motion.p>
          <motion.h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-6 leading-[0.9]">
            {TAGLINE}
          </motion.h1>
          <motion.p className="text-lg mb-8 max-w-lg" style={{ color: tokens.mutedForeground }}>
            {DESCRIPTION}
          </motion.p>
          <div className="flex flex-wrap gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="h-14 px-8 font-bold uppercase tracking-widest text-black flex items-center gap-2"
              style={{ backgroundColor: tokens.accent }}
            >
              Start Drawing <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>

        {/* Hero Interactive Board */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, type: 'spring' }}
          className="relative aspect-[4/3] rounded-xl border-2 flex items-center justify-center overflow-hidden"
          style={{ borderColor: tokens.border, backgroundColor: 'rgba(0,0,0,0.2)' }}
        >
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
             {/* Pitch lines */}
             <path d="M 50,50 L 50,350 L 450,350 L 450,50 Z" stroke={tokens.lines} fill="none" strokeWidth={2} opacity={0.3} />
             <path d="M 250,50 L 250,350" stroke={tokens.lines} fill="none" strokeWidth={2} opacity={0.3} />
             <circle cx="250" cy="200" r="50" stroke={tokens.lines} fill="none" strokeWidth={2} opacity={0.3} />

             {/* Animated Play */}
             <ChalkPath d="M 100,300 C 150,200 200,100 300,100" delay={1} style={{ stroke: tokens.accent, strokeDasharray: 'none', strokeWidth: 4 }} />
             <ChalkPath d="M 300,100 L 400,150" delay={2.5} style={{ stroke: tokens.lines, strokeDasharray: 'none', strokeWidth: 3 }} />
          </svg>

          <MagneticNode className="absolute left-[80px] top-[280px] w-8 h-8 rounded-full border-2 bg-black flex items-center justify-center font-bold text-xs" style={{ borderColor: tokens.accent }}>
            X
          </MagneticNode>
          <MagneticNode className="absolute left-[280px] top-[80px] w-8 h-8 rounded-full border-2 bg-black flex items-center justify-center font-bold text-xs" style={{ borderColor: tokens.lines }}>
            O
          </MagneticNode>
           <MagneticNode className="absolute left-[380px] top-[130px] w-8 h-8 rounded-full border-2 bg-black flex items-center justify-center font-bold text-xs" style={{ borderColor: tokens.lines }}>
            O
          </MagneticNode>
        </motion.div>
      </div>
    </section>
  )
}

function Stats() {
  const stats = [
    { v: '10K+', l: 'Coaches' },
    { v: '1M+', l: 'Plays Drawn' },
    { v: '50+', l: 'Sports' },
    { v: '99%', l: 'Win Rate' }
  ]
  return (
    <section className="py-12 border-y" style={{ borderColor: tokens.border, backgroundColor: 'rgba(0,0,0,0.1)' }}>
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="text-center"
          >
            <div className="text-4xl md:text-5xl font-black mb-2" style={{ color: tokens.accent }}>{s.v}</div>
            <div className="text-sm font-handwritten tracking-widest uppercase" style={{ color: tokens.lines, fontFamily: 'var(--font-indie-flower)' }}>{s.l}</div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function Features() {
  const features = [
    { icon: Target, title: 'Tactical Canvas', desc: 'Interactive SVG board with snap-to-grid mechanics.' },
    { icon: Layout, title: 'Play Animator', desc: 'Scrubbable timeline for multi-phase strategy viewing.' },
    { icon: Zap, title: 'Vision Cone', desc: 'Animated SVG paths representing player field-of-view.' }
  ]
  return (
    <section id="features" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl font-black uppercase mb-4">Precision Tools</h2>
          <p className="font-handwritten text-xl" style={{ color: tokens.accent, fontFamily: 'var(--font-indie-flower)' }}>Everything you need to formulate the perfect plan.</p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -10 }}
              className="p-8 border-2 rounded-xl relative overflow-hidden group"
              style={{ borderColor: tokens.border, backgroundColor: 'rgba(0,0,0,0.2)' }}
            >
              <f.icon className="w-10 h-10 mb-6" style={{ color: tokens.accent }} />
              <h3 className="text-2xl font-bold uppercase mb-4">{f.title}</h3>
              <p style={{ color: tokens.mutedForeground }}>{f.desc}</p>

              {/* Hover Chalk dust effect */}
              <motion.div
                 className="absolute inset-0 bg-white opacity-0 group-hover:opacity-5 transition-opacity duration-300"
                 style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function TacticalCanvasSection() {
  return (
    <section className="py-24 border-y overflow-hidden" style={{ borderColor: tokens.border }}>
      <div className="max-w-6xl mx-auto px-6">
         <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1">
               <h2 className="text-4xl font-black uppercase mb-6">Magnetic Paths</h2>
               <p className="text-lg mb-6" style={{ color: tokens.mutedForeground }}>
                 Lines automatically bend around defender icons. Draw plays in real-time as you scroll.
               </p>
               <p className="font-handwritten text-2xl" style={{ color: tokens.accent, fontFamily: 'var(--font-indie-flower)' }}>
                  Watch the play unfold...
               </p>
            </div>
            <div className="flex-1 relative aspect-square border-2 rounded-full overflow-hidden flex justify-center items-center" style={{ borderColor: tokens.accent, backgroundColor: 'rgba(0,0,0,0.3)' }}>
               <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                  <ChalkPath d="M 20,80 Q 50,20 80,80" delay={0} style={{ stroke: tokens.lines, strokeWidth: 1 }} />
                  <circle cx="50" cy="50" r="5" fill="none" stroke={tokens.accent} strokeWidth="1" />
               </svg>
            </div>
         </div>
      </div>
    </section>
  )
}

function Pricing() {
  return (
    <section id="pricing" className="py-24">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-black uppercase mb-16">Recruitment Cost</h2>
        <div className="grid md:grid-cols-2 gap-8">
           <motion.div
             whileHover={{ scale: 1.02 }}
             className="p-8 border-2 rounded-xl text-left"
             style={{ borderColor: tokens.border }}
           >
              <h3 className="text-2xl font-bold uppercase mb-2">Amateur</h3>
              <div className="text-4xl font-black mb-6">$0<span className="text-lg text-gray-400">/mo</span></div>
              <ul className="space-y-4 mb-8">
                 {['Basic canvas', '10 saved plays', 'Community access'].map((f, i) => (
                    <li key={i} className="flex gap-2 items-center"><Check className="w-4 h-4 text-white" /> <span className="font-handwritten" style={{ fontFamily: 'var(--font-indie-flower)'}}>{f}</span></li>
                 ))}
              </ul>
              <button className="w-full py-4 font-bold uppercase border-2 hover:bg-white hover:text-black transition-colors" style={{ borderColor: tokens.lines }}>Draft</button>
           </motion.div>

           <motion.div
             whileHover={{ scale: 1.02 }}
             className="p-8 border-2 rounded-xl text-left relative overflow-hidden"
             style={{ borderColor: tokens.accent, backgroundColor: 'rgba(250, 204, 21, 0.05)' }}
           >
              <div className="absolute top-4 right-4 text-xs font-bold bg-yellow-400 text-black px-2 py-1 uppercase rounded">Pro</div>
              <h3 className="text-2xl font-bold uppercase mb-2" style={{ color: tokens.accent }}>Professional</h3>
              <div className="text-4xl font-black mb-6">$29<span className="text-lg text-gray-400">/mo</span></div>
              <ul className="space-y-4 mb-8">
                 {['Unlimited plays', 'Play animator', 'Team collaboration', 'Export to PDF/Video'].map((f, i) => (
                    <li key={i} className="flex gap-2 items-center"><Check className="w-4 h-4" style={{ color: tokens.accent }}/> <span className="font-handwritten" style={{ fontFamily: 'var(--font-indie-flower)'}}>{f}</span></li>
                 ))}
              </ul>
              <button className="w-full py-4 font-bold uppercase text-black" style={{ backgroundColor: tokens.accent }}>Sign Pro Contract</button>
           </motion.div>
        </div>
      </div>
    </section>
  )
}

function Testimonials() {
  return (
    <section id="testimonials" className="py-24 border-y" style={{ borderColor: tokens.border, backgroundColor: 'rgba(0,0,0,0.2)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-black uppercase text-center mb-16">Hall of Fame</h2>
        <div className="grid md:grid-cols-3 gap-6">
           {[1, 2, 3].map((i) => (
              <motion.div
                 key={i}
                 initial={{ opacity: 0, scale: 0.9 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
                 className="p-6 border-2 rounded-xl"
                 style={{ borderColor: tokens.border }}
              >
                 <div className="flex mb-4">
                    {[...Array(5)].map((_, j) => <Award key={j} className="w-5 h-5" style={{ color: tokens.accent }} />)}
                 </div>
                 <p className="font-handwritten text-lg mb-6 leading-relaxed" style={{ fontFamily: 'var(--font-indie-flower)'}}>
                   "DrillMaster completely changed how I communicate with my team. The visual clarity is unmatched."
                 </p>
                 <div className="font-bold uppercase tracking-widest text-sm">— Coach Taylor</div>
              </motion.div>
           ))}
        </div>
      </div>
    </section>
  )
}

function FAQ() {
  const faqs = [
    { q: "Can I use it on a tablet during games?", a: "Yes, our touch interface is optimized for courtside adjustments." },
    { q: "Are custom field layouts supported?", a: "Absolutely. Choose from 50+ presets or draw your own boundaries." },
    { q: "How do I share plays with players?", a: "Export as animated GIFs, videos, or send a secure link." }
  ]
  return (
    <section className="py-24">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-4xl font-black uppercase text-center mb-16">Chalk Talk (FAQ)</h2>
        <div className="space-y-4">
           {faqs.map((faq, i) => (
              <details key={i} className="group border-2 rounded p-6 cursor-pointer" style={{ borderColor: tokens.border }}>
                 <summary className="font-bold text-xl uppercase flex justify-between items-center list-none">
                    {faq.q}
                    <ChevronDown className="w-6 h-6 transition-transform group-open:rotate-180" style={{ color: tokens.accent }} />
                 </summary>
                 <p className="mt-4 font-handwritten text-lg" style={{ color: tokens.mutedForeground, fontFamily: 'var(--font-indie-flower)' }}>{faq.a}</p>
              </details>
           ))}
        </div>
      </div>
    </section>
  )
}

function Newsletter() {
  return (
    <section className="py-24 border-y" style={{ borderColor: tokens.border, backgroundColor: tokens.accent }}>
      <div className="max-w-2xl mx-auto px-6 text-center text-black">
        <h2 className="text-4xl font-black uppercase mb-4">Join the Roster</h2>
        <p className="font-handwritten text-2xl mb-8 font-bold" style={{ fontFamily: 'var(--font-indie-flower)' }}>Get weekly drills and tactical breakdowns.</p>
        <form className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto" onSubmit={e => e.preventDefault()}>
           <input type="email" placeholder="coach@team.com" className="flex-1 px-4 py-3 rounded border-2 border-black bg-transparent placeholder-black/50 font-bold outline-none focus:bg-white" />
           <button className="px-8 py-3 rounded bg-black text-white font-black uppercase tracking-widest">Subscribe</button>
        </form>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="py-12 text-center" style={{ backgroundColor: 'black' }}>
      <div className="flex items-center justify-center gap-2 mb-6">
         <PenTool className="w-6 h-6" style={{ color: tokens.accent }} />
         <span className="font-black text-2xl uppercase tracking-widest">{PRODUCT_NAME}</span>
      </div>
      <p className="font-handwritten mb-8" style={{ color: tokens.mutedForeground, fontFamily: 'var(--font-indie-flower)' }}>Tactics drawn to perfection.</p>
      <p className="text-xs font-bold uppercase tracking-widest" style={{ color: tokens.lines }}>© 2026 {PRODUCT_NAME}. All rights reserved.</p>
    </footer>
  )
}
