'use client'

import { motion, useReducedMotion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Archivo_Black, Inter } from 'next/font/google'
import {
  Activity, ArrowUpRight, PlayCircle, Zap, Globe, Trophy, CircleDot, RefreshCw
} from 'lucide-react'

const archivoBlack = Archivo_Black({ weight: '400', subsets: ['latin'], variable: '--font-archivo' })
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

const tokens = {
  background: '#FFFFFF',
  primary: '#EE242C', // Urgent Red
  secondary: '#2D2D2D', // Stadium Grey
  notification: '#3B82F6', // Info Blue
  textHigh: '#111111',
  textLow: '#666666'
}

const PRODUCT_NAME = 'MatchDay Sync'
const TAGLINE = 'Live. Loud. Now.'
const DESCRIPTION = 'Real-time updates, crowd sentiment, and momentum tracking. Feel the pulse of the stadium from anywhere in the world.'

// Reusable physics configs
const bouncePhysics = { type: 'spring' as const, stiffness: 700, damping: 10 }
const joltPhysics = { type: 'spring' as const, stiffness: 400, damping: 25 }

export default function MatchDaySyncPage() {
  const [pulseScale, setPulseScale] = useState(1)

  // Live Pulse Effect
  useEffect(() => {
    const interval = setInterval(() => {
      setPulseScale(1.05)
      setTimeout(() => setPulseScale(1), 150)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className={`${archivoBlack.variable} ${inter.variable} font-sans min-h-screen text-[#111111]`} style={{ backgroundColor: tokens.background }}>
      <Navbar />

      {/* Live Ticker */}
      <div className="fixed top-16 left-0 right-0 h-10 border-b border-gray-200 bg-white z-40 overflow-hidden flex items-center">
         <motion.div
           className="flex whitespace-nowrap items-center font-bold text-sm"
           animate={{ x: ["0%", "-50%"] }}
           transition={{ duration: 20, ease: "linear", repeat: Infinity }}
         >
           {[...Array(6)].map((_, i) => (
             <div key={i} className="flex items-center gap-4 px-8 border-r border-gray-200">
               <span className="text-red-500 animate-pulse">● LIVE</span>
               <span>MCI 2 - 1 ARS (74&apos;)</span>
               <span>De Bruyne Goal</span>
               <span className="text-blue-500">VAR Check Complete</span>
             </div>
           ))}
         </motion.div>
      </div>

      <main className="pt-26 relative z-10">
        <Hero pulseScale={pulseScale} />
        <Stats />
        <Features />
        <MomentumSection />
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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 h-16">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CircleDot className="w-6 h-6 text-red-500 animate-pulse" />
          <span className="font-heading text-2xl tracking-tight uppercase" style={{ fontFamily: 'var(--font-archivo)' }}>SYNC</span>
        </div>
        <div className="hidden md:flex items-center gap-6 font-bold text-sm">
          {['Matches', 'Momentum', 'Hype'].map(link => (
            <a key={link} href={`#`} className="hover:text-red-500 transition-colors uppercase">
              {link}
            </a>
          ))}
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-2 bg-black text-white font-bold uppercase text-sm rounded-sm"
        >
          Go Live
        </motion.button>
      </div>
    </nav>
  )
}

function Hero({ pulseScale }: { pulseScale: number }) {
  return (
    <section className="min-h-[90vh] flex flex-col justify-center items-center pt-20 pb-12">
      <div className="max-w-5xl mx-auto px-6 text-center w-full">

        <motion.div
           initial={{ y: -50, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           transition={bouncePhysics}
           className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-full font-bold text-sm mb-8 uppercase tracking-wide"
        >
           <Activity className="w-4 h-4" /> Live Match Detected
        </motion.div>

        <motion.h1
          className="text-7xl md:text-[9rem] font-heading uppercase leading-[0.85] mb-6 tracking-tighter"
          style={{ fontFamily: 'var(--font-archivo)' }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={bouncePhysics}
        >
          {TAGLINE}
        </motion.h1>

        <p className="text-xl md:text-2xl font-medium max-w-2xl mx-auto mb-10" style={{ color: tokens.textLow }}>
          {DESCRIPTION}
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-20">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="h-16 px-10 bg-red-600 text-white font-heading text-xl uppercase tracking-wide flex items-center justify-center gap-3"
            style={{ fontFamily: 'var(--font-archivo)' }}
          >
            <PlayCircle className="w-6 h-6" /> Join Sync
          </motion.button>
        </div>

        {/* Live Scoreboard Hero Graphic */}
        <motion.div
           animate={{ scale: pulseScale }}
           transition={{ duration: 0.1 }}
           className="w-full max-w-3xl mx-auto bg-[#2D2D2D] text-white rounded-xl p-8 shadow-2xl relative overflow-hidden"
        >
           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-blue-500" />
           <div className="flex justify-between items-center">
              <div className="text-center flex-1">
                 <div className="text-5xl font-heading mb-2">MCI</div>
                 <div className="text-sm font-bold text-gray-400">HOME</div>
              </div>
              <div className="text-6xl md:text-8xl font-heading px-8 bg-black/30 rounded-lg">
                 2 - 1
              </div>
              <div className="text-center flex-1">
                 <div className="text-5xl font-heading mb-2">ARS</div>
                 <div className="text-sm font-bold text-gray-400">AWAY</div>
              </div>
           </div>

           <div className="mt-8 bg-black/50 h-3 rounded-full overflow-hidden flex">
              <div className="bg-red-500 h-full" style={{ width: '65%' }} />
              <div className="bg-blue-500 h-full" style={{ width: '35%' }} />
           </div>
           <div className="text-center mt-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
              Live Momentum
           </div>
        </motion.div>

      </div>
    </section>
  )
}

function Stats() {
  return (
    <section className="py-12 border-y border-gray-200 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
        {[
           { v: '< 50ms', l: 'Data Latency' },
           { v: '2.4M', l: 'Concurrent Fans' },
           { v: '10k+', l: 'Events/Sec' },
           { v: '100%', l: 'Hype' }
        ].map((s, i) => (
           <motion.div
             key={i}
             initial={{ y: 20, opacity: 0 }}
             whileInView={{ y: 0, opacity: 1 }}
             viewport={{ once: true }}
             transition={{ delay: i * 0.1, ...bouncePhysics }}
             className="text-center"
           >
              <div className="text-4xl md:text-5xl font-heading text-red-600 mb-2" style={{ fontFamily: 'var(--font-archivo)' }}>{s.v}</div>
              <div className="font-bold text-sm uppercase text-gray-500">{s.l}</div>
           </motion.div>
        ))}
      </div>
    </section>
  )
}

function Features() {
  const features = [
    { icon: Activity, title: 'Hype-Meter', desc: 'Real-time gauge driven by social sentiment and crowd noise.' },
    { icon: ArrowUpRight, title: 'Momentum Slider', desc: 'Dual-color bar representing which team is dominating.' },
    { icon: RefreshCw, title: 'Pull-to-Refresh', desc: 'Elastic interactions that bounce data right into your UI.' }
  ]
  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-5xl md:text-7xl font-heading uppercase mb-16 text-center" style={{ fontFamily: 'var(--font-archivo)' }}>
          Don&apos;t Blink.
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, y: -10 }}
              transition={bouncePhysics}
              className="p-8 bg-gray-100 rounded-xl border-2 border-transparent hover:border-black cursor-pointer"
            >
               <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
                  <f.icon className="w-6 h-6 text-red-600" />
               </div>
               <h3 className="text-2xl font-heading uppercase mb-4" style={{ fontFamily: 'var(--font-archivo)' }}>{f.title}</h3>
               <p className="font-medium text-gray-600 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function MomentumSection() {
  return (
    <section className="py-32 bg-black text-white relative overflow-hidden">
      {/* Background Pulse Rings */}
      <motion.div
         animate={{ scale: [1, 2, 3], opacity: [0.5, 0, 0] }}
         transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
         className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border-4 border-red-500 rounded-full"
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-16">
         <div className="flex-1">
            <h2 className="text-5xl md:text-7xl font-heading uppercase mb-6" style={{ fontFamily: 'var(--font-archivo)' }}>Feel The Shift</h2>
            <p className="text-xl text-gray-400 font-medium mb-8">
               Our Momentum Engine analyzes thousands of data points per second. When the game changes, your screen reacts instantly.
            </p>
            <button className="px-8 py-4 bg-white text-black font-heading uppercase text-xl hover:bg-red-500 hover:text-white transition-colors">
               View Demo
            </button>
         </div>
         <div className="flex-1 w-full bg-[#1A1A1A] p-8 rounded-xl border border-gray-800">
            <div className="text-center font-bold text-gray-500 mb-4 uppercase text-sm tracking-widest">Live Dominance</div>

            {/* Animated Momentum Bar */}
            <div className="relative h-20 bg-gray-900 rounded-lg overflow-hidden flex items-center p-2 gap-2">
               <motion.div
                 animate={{ width: ['40%', '70%', '45%'] }}
                 transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                 className="h-full bg-red-600 rounded-md relative flex items-center justify-end px-4"
               >
                 <ArrowUpRight className="text-white w-8 h-8" />
               </motion.div>
               <motion.div
                 animate={{ width: ['60%', '30%', '55%'] }}
                 transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                 className="h-full bg-blue-600 rounded-md relative flex items-center px-4"
               >
                 <ArrowUpRight className="text-white w-8 h-8 rotate-180" />
               </motion.div>
            </div>
         </div>
      </div>
    </section>
  )
}

function Pricing() {
  return (
    <section className="py-32 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-5xl md:text-7xl font-heading uppercase text-center mb-16" style={{ fontFamily: 'var(--font-archivo)' }}>Season Pass</h2>

        <div className="grid md:grid-cols-2 gap-8">
           <div className="bg-white p-10 border border-gray-200 rounded-xl shadow-sm">
              <h3 className="text-3xl font-heading uppercase mb-2" style={{ fontFamily: 'var(--font-archivo)' }}>Fan</h3>
              <div className="text-5xl font-black mb-6">$0<span className="text-xl text-gray-400">/mo</span></div>
              <ul className="space-y-4 mb-8 font-medium">
                 <li>Basic Live Scores</li>
                 <li>Standard Latency (2s)</li>
                 <li>Ads Enabled</li>
              </ul>
              <button className="w-full py-4 border-2 border-black font-bold uppercase hover:bg-black hover:text-white transition-colors">Start Free</button>
           </div>

           <div className="bg-black text-white p-10 rounded-xl shadow-2xl relative transform md:-translate-y-4">
              <div className="absolute -top-4 right-8 bg-red-600 text-white font-bold uppercase px-4 py-1 text-sm rounded-sm transform rotate-3">Ultra</div>
              <h3 className="text-3xl font-heading uppercase mb-2 text-red-500" style={{ fontFamily: 'var(--font-archivo)' }}>Hooligan</h3>
              <div className="text-5xl font-black mb-6">$15<span className="text-xl text-gray-400">/mo</span></div>
              <ul className="space-y-4 mb-8 font-medium text-gray-300">
                 <li>Momentum Engine Access</li>
                 <li>Zero Latency ({"<50ms"})</li>
                 <li>Ad-Free Experience</li>
                 <li>Haptic Feedback App</li>
              </ul>
              <button className="w-full py-4 bg-red-600 font-bold uppercase text-xl hover:bg-white hover:text-black transition-colors">Upgrade Now</button>
           </div>
        </div>
      </div>
    </section>
  )
}

function Testimonials() {
  return (
    <section className="py-24 border-y border-gray-200">
      <div className="max-w-6xl mx-auto px-6 overflow-hidden">
        <motion.div
           animate={{ x: ["0%", "-50%"] }}
           transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
           className="flex gap-8 w-max"
        >
           {[1, 2, 3, 4].map((i) => (
             <div key={i} className="w-[400px] p-8 bg-gray-100 rounded-xl border border-gray-200">
                <div className="flex text-yellow-400 mb-4">★★★★★</div>
                <p className="text-lg font-medium mb-6">"The momentum slider literally predicted the comeback before it happened on TV. Unbelievable tech."</p>
                <div className="font-bold uppercase text-sm">@SoccerFan99</div>
             </div>
           ))}
        </motion.div>
      </div>
    </section>
  )
}

function FAQ() {
  return (
    <section className="py-32 bg-white">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-5xl font-heading uppercase mb-12" style={{ fontFamily: 'var(--font-archivo)' }}>Rules of Play</h2>
        <div className="space-y-6 text-left">
           {[
             { q: "Is it faster than my TV broadcast?", a: "Yes. TV broadcasts have a 5-10 second delay. We get data direct from the stadium sensors." },
             { q: "What sports are supported?", a: "Soccer, Basketball, American Football, and Cricket. More coming soon." }
           ].map((faq, i) => (
             <div key={i} className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                <h3 className="font-heading text-xl uppercase mb-2">{faq.q}</h3>
                <p className="font-medium text-gray-600">{faq.a}</p>
             </div>
           ))}
        </div>
      </div>
    </section>
  )
}

function Newsletter() {
  return (
    <section className="py-32 bg-red-600 text-white text-center">
      <div className="max-w-2xl mx-auto px-6">
        <h2 className="text-6xl font-heading uppercase mb-6" style={{ fontFamily: 'var(--font-archivo)' }}>Get The Call</h2>
        <p className="text-xl font-medium mb-10">Sign up for beta access to our new Haptic Engine.</p>
        <div className="flex gap-2 max-w-md mx-auto">
           <input type="email" placeholder="ENTER EMAIL" className="flex-1 px-4 py-4 font-bold uppercase text-black outline-none border-4 border-transparent focus:border-black" />
           <button className="px-8 bg-black text-white font-heading text-xl uppercase hover:bg-white hover:text-black transition-colors">Go</button>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="py-12 text-center bg-black text-white">
      <div className="font-heading text-3xl uppercase tracking-tighter mb-4" style={{ fontFamily: 'var(--font-archivo)' }}>{PRODUCT_NAME}</div>
      <p className="text-sm font-bold uppercase text-gray-500">© 2026. Data over everything.</p>
    </footer>
  )
}
