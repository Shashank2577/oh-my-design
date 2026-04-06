'use client'

import { motion, useReducedMotion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import { Roboto_Mono, Michroma } from 'next/font/google'
import {
  Cpu, Mouse, Keyboard, Crosshair, ThermometerSun, Layers, Search, Zap
} from 'lucide-react'

const robotoMono = Roboto_Mono({ subsets: ['latin'], variable: '--font-roboto-mono' })
const michroma = Michroma({ weight: '400', subsets: ['latin'], variable: '--font-michroma' })

const tokens = {
  background: '#121212', // Carbon
  surface: '#1A1A1A',
  accent: '#39FF14', // Neon Green / PCB
  material: '#333333', // Brushed Aluminum
  border: 'rgba(255, 255, 255, 0.1)',
  textHigh: '#FFFFFF',
  textLow: '#888888'
}

const PRODUCT_NAME = 'ProGear'
const TAGLINE = 'ENGINEERED FOR DOMINANCE'
const DESCRIPTION = 'Unleash your potential with hardware built for the top 1%. Precision optics, mechanical perfection, and zero-latency wireless technology.'

// Reusable technical styles
const techBorder = {
  border: `1px solid ${tokens.border}`,
  background: 'linear-gradient(180deg, rgba(26,26,26,0.8) 0%, rgba(18,18,18,0.9) 100%)',
  boxShadow: `inset 0 1px 0 rgba(255,255,255,0.05)`
}

export default function ProGearPage() {
  return (
    <div className={`${robotoMono.variable} ${michroma.variable} font-sans min-h-screen text-white bg-[#121212] overflow-hidden`}>
      {/* Blueprint Grid Background */}
      <div className="fixed inset-0 pointer-events-none opacity-5 z-0"
           style={{ backgroundImage: 'linear-gradient(#39FF14 1px, transparent 1px), linear-gradient(90deg, #39FF14 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <Navbar />
      <main className="relative z-10">
        <Hero />
        <SpecsBar />
        <ExplodedViewSection />
        <ThermalMapSection />
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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#121212]/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Cpu className="w-6 h-6" style={{ color: tokens.accent }} />
          <span className="font-heading text-xl tracking-widest uppercase" style={{ fontFamily: 'var(--font-michroma)' }}>{PRODUCT_NAME}</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-xs font-bold tracking-widest uppercase text-gray-400">
          {['Hardware', 'Specs', 'Telemetry'].map(link => (
            <a key={link} href={`#`} className="hover:text-[#39FF14] transition-colors relative group">
              {link}
              <span className="absolute -bottom-6 left-0 w-full h-[2px] bg-[#39FF14] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </a>
          ))}
        </div>
        <button className="px-6 py-2 text-xs font-bold tracking-widest uppercase border border-white/20 hover:border-[#39FF14] hover:text-[#39FF14] transition-colors">
          Initialize
        </button>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section className="min-h-screen flex items-center pt-20 relative">
      {/* Ambient Rotation Background */}
      <motion.div
        animate={{ rotateY: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full pointer-events-none"
        style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
      >
         <div className="w-full h-full border border-[#39FF14]/10 rounded-full rotate-x-60" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-3 mb-6">
             <div className="w-2 h-2 rounded-full bg-[#39FF14] animate-pulse" />
             <span className="text-xs tracking-widest text-[#39FF14] uppercase font-bold">System Online</span>
          </div>
          <h1 className="font-heading text-5xl md:text-7xl leading-tight mb-6 uppercase" style={{ fontFamily: 'var(--font-michroma)' }}>
            {TAGLINE}
          </h1>
          <p className="text-sm tracking-wide text-gray-400 max-w-md mb-10 leading-relaxed font-mono">
            {DESCRIPTION}
          </p>
          <div className="flex gap-4">
            <button className="px-8 py-4 bg-[#39FF14] text-black text-xs font-bold uppercase tracking-widest skew-x-[-10deg] hover:bg-white transition-colors">
               <span className="skew-x-[10deg] block">Deploy Now</span>
            </button>
            <button className="px-8 py-4 border border-white/20 text-xs font-bold uppercase tracking-widest skew-x-[-10deg] hover:border-[#39FF14] transition-colors">
               <span className="skew-x-[10deg] block">View Schematics</span>
            </button>
          </div>
        </motion.div>

        {/* 3D Hardware Representation (Abstract) */}
        <div className="h-[500px] w-full flex justify-center items-center relative perspective-1000">
           <motion.div
              animate={{ rotateY: [0, 15, -15, 0], rotateX: [0, 5, -5, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className="w-64 h-80 relative preserve-3d"
           >
              {/* Outer Shell */}
              <div className="absolute inset-0 border border-white/20 bg-gradient-to-b from-[#333] to-[#111] rounded-3xl shadow-2xl overflow-hidden">
                 {/* Internal PCB visual */}
                 <div className="absolute inset-4 border border-[#39FF14]/30 rounded-2xl bg-[#111] grid grid-cols-4 grid-rows-6 gap-1 p-2">
                    {[...Array(24)].map((_, i) => (
                       <div key={i} className="bg-white/5 rounded-sm" />
                    ))}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-black border border-[#39FF14] rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(57,255,20,0.5)]">
                       <Zap className="w-6 h-6 text-[#39FF14]" />
                    </div>
                 </div>
              </div>
           </motion.div>

           {/* UI Zoom Reticle */}
           <motion.div
             className="absolute top-1/4 right-1/4 w-16 h-16 border-2 border-[#39FF14] rounded-full flex items-center justify-center"
             animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
             transition={{ duration: 2, repeat: Infinity }}
           >
             <Crosshair className="w-8 h-8 text-[#39FF14]" />
           </motion.div>
        </div>
      </div>
    </section>
  )
}

function SpecsBar() {
  return (
    <section className="py-6 border-y border-white/10 bg-[#0A0A0A] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center text-xs font-mono tracking-widest text-gray-500 uppercase">
        <div className="flex items-center gap-2"><span className="text-white">POLLING:</span> 8000HZ</div>
        <div className="flex items-center gap-2"><span className="text-white">SWITCHES:</span> OPTICAL V3</div>
        <div className="flex items-center gap-2"><span className="text-white">WEIGHT:</span> 49G</div>
        <div className="flex items-center gap-2"><span className="text-white">SENSOR:</span> FOCUS PRO</div>
      </div>
    </section>
  )
}

function ExplodedViewSection() {
  const { scrollYProgress } = useScroll()
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 0])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, 100])

  return (
    <section className="py-32 relative">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

        {/* Exploded View Animation */}
        <div className="h-[600px] w-full relative flex flex-col justify-center items-center gap-4 perspective-1000">
           <motion.div style={{ y: y1 }} className="w-48 h-32 border border-white/20 bg-[#222] rounded-t-3xl shadow-lg relative flex items-center justify-center">
              <span className="text-[10px] font-mono text-gray-500 absolute top-2 left-2">TOP_SHELL_ALU</span>
              <Mouse className="w-8 h-8 text-white/30" />
           </motion.div>

           <motion.div style={{ y: y2 }} className="w-48 h-12 border border-[#39FF14] bg-black shadow-[0_0_20px_rgba(57,255,20,0.2)] relative flex items-center justify-center">
              <span className="text-[10px] font-mono text-[#39FF14] absolute top-1 left-2">PCB_OPTICAL_ARRAY</span>
              <div className="flex gap-2">
                 <div className="w-2 h-2 rounded-full bg-[#39FF14] animate-pulse" />
                 <div className="w-2 h-2 rounded-full bg-[#39FF14] animate-pulse delay-75" />
              </div>
           </motion.div>

           <motion.div style={{ y: y3 }} className="w-48 h-24 border border-white/20 bg-[#111] rounded-b-3xl shadow-lg relative flex items-center justify-center">
              <span className="text-[10px] font-mono text-gray-500 absolute bottom-2 left-2">BASE_PTFE</span>
              <div className="w-16 h-8 border border-white/10 rounded-full" />
           </motion.div>
        </div>

        <div>
          <h2 className="font-heading text-4xl mb-6 uppercase" style={{ fontFamily: 'var(--font-michroma)' }}>Deconstructed Perfection</h2>
          <p className="text-sm font-mono text-gray-400 mb-8 leading-relaxed">
            Every component engineered to shave milliseconds off your reaction time. Scroll to analyze the internal architecture.
          </p>
          <div className="space-y-4">
             {['Aerospace-grade Aluminum Shell', 'Zero-debounce Optical Switches', 'Frictionless PTFE Skates'].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4 border border-white/5 bg-white/5 hover:border-[#39FF14]/50 transition-colors">
                   <div className="text-[#39FF14] font-mono text-xs">0{i+1}</div>
                   <div className="text-sm uppercase tracking-wide">{item}</div>
                </div>
             ))}
          </div>
        </div>

      </div>
    </section>
  )
}

function ThermalMapSection() {
  return (
    <section className="py-32 bg-black border-y border-white/10 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
        <h2 className="font-heading text-4xl mb-4 uppercase" style={{ fontFamily: 'var(--font-michroma)' }}>Thermal Efficiency</h2>
        <p className="font-mono text-sm text-gray-500 mb-16 uppercase tracking-widest">Hover to scan heat dissipation</p>

        <div className="max-w-2xl mx-auto aspect-[16/9] border border-white/20 bg-[#111] rounded-lg relative overflow-hidden group cursor-crosshair">
           {/* Base Image Placeholder */}
           <div className="absolute inset-0 flex items-center justify-center">
              <Cpu className="w-32 h-32 text-white/10" />
           </div>

           {/* Thermal Overlay on Hover */}
           <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-green-500 to-red-600 opacity-0 group-hover:opacity-60 transition-opacity duration-500 mix-blend-overlay" />

           {/* Scanning Line */}
           <motion.div
             className="absolute top-0 bottom-0 left-0 w-1 bg-[#39FF14] shadow-[0_0_10px_#39FF14] opacity-0 group-hover:opacity-100"
             animate={{ x: ["0%", "800%", "0%"] }}
             transition={{ duration: 4, ease: "linear", repeat: Infinity }}
           />

           <div className="absolute bottom-4 right-4 text-xs font-mono text-[#39FF14] opacity-0 group-hover:opacity-100 transition-opacity">
              PEAK TEMP: 32.4°C
           </div>
        </div>
      </div>
    </section>
  )
}

function Pricing() {
  return (
    <section className="py-32">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
           <h2 className="font-heading text-4xl uppercase mb-2" style={{ fontFamily: 'var(--font-michroma)' }}>Loadouts</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
           <div className="p-8" style={techBorder}>
              <div className="text-xs font-mono text-gray-500 mb-2">BASE_MODEL</div>
              <h3 className="font-heading text-2xl uppercase mb-6" style={{ fontFamily: 'var(--font-michroma)' }}>ProGear Standard</h3>
              <div className="text-4xl font-mono mb-8">$129</div>
              <ul className="space-y-4 mb-8 font-mono text-sm text-gray-400">
                 <li className="flex items-center gap-2"><div className="w-1 h-1 bg-white" /> 1000Hz Polling</li>
                 <li className="flex items-center gap-2"><div className="w-1 h-1 bg-white" /> Mechanical Switches</li>
                 <li className="flex items-center gap-2"><div className="w-1 h-1 bg-white" /> Standard Skates</li>
              </ul>
              <button className="w-full py-4 border border-white/20 font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-colors">Select</button>
           </div>

           <div className="p-8 relative" style={{ ...techBorder, borderColor: tokens.accent }}>
              <div className="absolute top-0 left-0 w-full h-[1px] bg-[#39FF14] shadow-[0_0_10px_#39FF14]" />
              <div className="text-xs font-mono text-[#39FF14] mb-2">FLAGSHIP_MODEL</div>
              <h3 className="font-heading text-2xl uppercase mb-6 text-[#39FF14]" style={{ fontFamily: 'var(--font-michroma)' }}>ProGear Elite</h3>
              <div className="text-4xl font-mono mb-8">$249</div>
              <ul className="space-y-4 mb-8 font-mono text-sm text-gray-300">
                 <li className="flex items-center gap-2"><div className="w-1 h-1 bg-[#39FF14]" /> 8000Hz Wireless Polling</li>
                 <li className="flex items-center gap-2"><div className="w-1 h-1 bg-[#39FF14]" /> Optical Switches V3</li>
                 <li className="flex items-center gap-2"><div className="w-1 h-1 bg-[#39FF14]" /> Glass Skates Included</li>
                 <li className="flex items-center gap-2"><div className="w-1 h-1 bg-[#39FF14]" /> Carbon Fiber Shell</li>
              </ul>
              <button className="w-full py-4 bg-[#39FF14] text-black font-bold uppercase tracking-widest text-xs hover:bg-white transition-colors">Select Elite</button>
           </div>
        </div>
      </div>
    </section>
  )
}

function Testimonials() {
  return (
    <section className="py-24 border-y border-white/10 bg-[#080808]">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="font-mono text-sm text-center text-[#39FF14] mb-12 uppercase tracking-widest">{">"} {">"} Verified Telemetry</h2>
        <div className="grid md:grid-cols-3 gap-6">
           {[
             { n: 's1mple', g: 'CS2', t: '"The 8K polling makes tracking feel supernatural. Zero latency."' },
             { n: 'TenZ', g: 'Valorant', t: '"Lightest shape I\'ve ever used without sacrificing structural integrity."' },
             { n: 'Faker', g: 'LoL', t: '"Switches actuate instantly. Crucial for high APM micro-management."' }
           ].map((t, i) => (
             <div key={i} className="p-6 bg-black border border-white/5 relative group">
                {/* Macro focus text effect */}
                <p className="font-mono text-sm text-gray-400 mb-6 leading-relaxed group-hover:scale-105 group-hover:text-white transition-all origin-left">
                  {t.t}
                </p>
                <div className="flex justify-between items-center border-t border-white/10 pt-4 mt-auto">
                   <div className="font-heading text-sm uppercase" style={{ fontFamily: 'var(--font-michroma)' }}>{t.n}</div>
                   <div className="text-xs font-mono bg-white/10 px-2 py-1">{t.g}</div>
                </div>
             </div>
           ))}
        </div>
      </div>
    </section>
  )
}

function FAQ() {
  return (
    <section className="py-32">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="font-heading text-4xl text-center mb-16 uppercase" style={{ fontFamily: 'var(--font-michroma)' }}>System Queries</h2>
        <div className="space-y-4 font-mono text-sm">
           {[
             { q: "Battery life on 8K polling?", a: "> 24 hours of continuous competitive use. Rapid charge 0-100% in 30 mins." },
             { q: "Is software required?", a: "> Plug and play. On-board memory stores 5 profiles. Software optional for macros." }
           ].map((faq, i) => (
             <div key={i} className="p-6 border border-white/10 bg-[#111]">
                <h3 className="text-[#39FF14] mb-2">{faq.q}</h3>
                <p className="text-gray-500">{faq.a}</p>
             </div>
           ))}
        </div>
      </div>
    </section>
  )
}

function Newsletter() {
  return (
    <section className="py-24 border-y border-[#39FF14]/30 bg-black relative overflow-hidden">
       {/* Blueprint Mode toggle visual */}
       <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#39FF14 1px, transparent 1px), linear-gradient(90deg, #39FF14 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

      <div className="max-w-xl mx-auto px-6 text-center relative z-10">
        <h2 className="font-heading text-2xl uppercase mb-4" style={{ fontFamily: 'var(--font-michroma)' }}>Awaiting Input</h2>
        <p className="font-mono text-sm text-gray-400 mb-8">Register for early access to prototype hardware drops.</p>
        <div className="flex border border-white/20 p-1 bg-[#111]">
           <span className="p-3 text-[#39FF14] font-mono">{">"}</span>
           <input type="email" placeholder="ENTER_EMAIL_ADDR" className="flex-1 bg-transparent outline-none font-mono text-sm text-white placeholder-gray-600" />
           <button className="px-6 bg-white/10 hover:bg-[#39FF14] hover:text-black font-bold font-mono text-xs transition-colors">EXECUTE</button>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="py-8 bg-black text-center border-t border-white/5">
      <div className="font-heading text-xl uppercase tracking-widest mb-2" style={{ fontFamily: 'var(--font-michroma)' }}>{PRODUCT_NAME}</div>
      <p className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">SYS.VER.2026 // END_OF_FILE</p>
    </footer>
  )
}
