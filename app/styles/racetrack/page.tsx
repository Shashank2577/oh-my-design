'use client'

import React, { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useSpring, useVelocity, AnimatePresence } from 'framer-motion'
import { Titillium_Web, Space_Mono } from 'next/font/google'
import { ArrowRight, Check, Star, ChevronDown, Activity, Settings, Zap, Map, Radio, Gauge } from 'lucide-react'

const titillium = Titillium_Web({ subsets: ['latin'], weight: ['400', '600', '700', '900'], variable: '--font-titillium' })
const spaceMono = Space_Mono({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-space' })

const tokens = {
  background: '#050505', // Carbon Fiber Black
  surface: '#111111', // Paddock Grey
  surfaceDark: '#0A0A0A',
  accent: '#E10600', // F1 Red
  accent2: '#00D2BE', // Pit-lane Teal
  border: '#252525',
  textHigh: '#FFFFFF',
  textLow: '#676767',
  textMid: '#A0A0A0'
}

const PRODUCT_NAME = "APEX TELEMETRY"

function RaceButton({ children, className = '', onClick }: { children: React.ReactNode, className?: string, onClick?: () => void }) {
  const [isDrs, setIsDrs] = useState(false)

  return (
    <motion.button
      onHoverStart={() => setIsDrs(true)}
      onHoverEnd={() => setIsDrs(false)}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`relative px-8 py-3 font-titillium font-bold uppercase tracking-wider overflow-hidden group ${className}`}
      style={{
        backgroundColor: tokens.accent,
        color: tokens.textHigh,
        transform: 'skewX(-15deg)', // Parallelogram shape
        borderRadius: '2px'
      }}
    >
      <motion.div
        className="absolute inset-0 z-0 bg-white opacity-0 mix-blend-overlay"
        animate={{ opacity: isDrs ? 0.3 : 0 }}
      />
      <div className="relative z-10 flex items-center justify-center" style={{ transform: 'skewX(15deg)' }}>
        {children}
        <motion.div
          animate={{ x: isDrs ? 10 : 0, opacity: isDrs ? 1 : 0.5 }}
          className="ml-2 flex items-center"
        >
          <ArrowRight className="w-5 h-5" />
        </motion.div>
      </div>
    </motion.button>
  )
}

function SectionWrapper({ children, className = '', id, style }: { children: React.ReactNode, className?: string, id?: string, style?: React.CSSProperties }) {
  return (
    <motion.section
      id={id}
      style={style}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className={`relative z-10 py-24 ${className}`}
    >
      {children}
    </motion.section>
  )
}

function TelemetryTeleporter() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] })

  // Create a velocity-based blur value
  const scrollVelocity = useVelocity(scrollYProgress)
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 })
  const velocityBlur = useTransform(smoothVelocity, [-0.5, 0, 0.5], [10, 0, 10])

  // Horizontal movement based on scroll
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"])

  // Speed and RPM values
  const speedValue = useTransform(scrollYProgress, [0, 1], [180, 320])
  const rpmValue = useTransform(scrollYProgress, [0, 1], [8000, 12500])

  // Minimap dot position
  const dotProgress = useTransform(scrollYProgress, [0, 1], [0, 100])

  return (
    <section ref={containerRef} className="relative h-[200vh] bg-[#050505]">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden border-y border-[#252525]">

        {/* Blurry background track */}
        <motion.div
          className="absolute inset-0 opacity-20 pointer-events-none flex items-center"
          style={{ filter: velocityBlur }}
        >
          <motion.div style={{ x }} className="flex whitespace-nowrap text-[30vw] font-titillium font-black text-[#252525] select-none uppercase leading-none">
            ///////// FLAT OUT ///////// FLAT OUT /////////
          </motion.div>
        </motion.div>

        {/* Foreground HUD */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 w-full flex flex-col md:flex-row justify-between items-center">

          <div className="w-full md:w-1/3 mb-12 md:mb-0">
            <h2 className="font-titillium text-5xl font-bold uppercase mb-4 text-white">Live Telemetry</h2>
            <p className="font-space text-sm text-[#A0A0A0] leading-relaxed">
              Track every input, every g-force, every microsecond. Our system provides pit-wall level data directly to your dashboard.
            </p>
          </div>

          {/* Telemetry Display */}
          <div className="flex gap-8 md:gap-16 items-center">
            <div className="text-center">
              <div className="font-space text-[#00D2BE] text-xs uppercase mb-2">Speed (KM/H)</div>
              <motion.div className="font-titillium text-6xl md:text-8xl font-black text-white">
                {/* Framer motion trick to display numbers */}
                <motion.span>{speedValue.get() ? Math.round(speedValue.get()) : 0}</motion.span>
              </motion.div>
            </div>
            <div className="w-px h-24 bg-[#252525]" />
            <div className="text-center">
              <div className="font-space text-[#00D2BE] text-xs uppercase mb-2">RPM</div>
              <motion.div className="font-titillium text-6xl md:text-8xl font-black text-white">
                <motion.span>{rpmValue.get() ? Math.round(rpmValue.get()) : 0}</motion.span>
              </motion.div>
            </div>
          </div>

        </div>

        {/* Mini-map */}
        <div className="absolute bottom-8 right-8 w-48 h-32 border border-[#252525] bg-[#111111]/80 backdrop-blur-sm p-4 rounded-lg hidden md:block">
          <svg viewBox="0 0 100 60" className="w-full h-full stroke-[#252525] stroke-2 fill-none">
            <path id="track-path" d="M10,30 C10,10 30,10 50,30 C70,50 90,50 90,30 C90,10 70,10 50,10 C30,10 10,10 10,30 Z" />
          </svg>
          {/* A simple implementation of the dot following a path */}
          <motion.div
            className="absolute w-3 h-3 bg-[#E10600] rounded-full shadow-[0_0_10px_#E10600]"
            style={{
              left: `calc(10% + ${dotProgress.get() * 0.8}%)`, // Rough approximation for straight line
              top: '50%',
              translateY: '-50%'
            }}
          />
        </div>
      </div>
    </section>
  )
}

export default function RaceTrackPage() {
  const { scrollY } = useScroll()
  const gForceTilt = useTransform(scrollY, [0, 1000], [0, 5]) // Tilt elements based on scroll position

  return (
    <div className={`${titillium.variable} ${spaceMono.variable} bg-[#050505] min-h-screen text-white selection:bg-[#E10600] selection:text-white`}>

      {/* Background Grid Pattern */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(${tokens.border} 1px, transparent 1px), linear-gradient(90deg, ${tokens.border} 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center bg-[#050505]/90 backdrop-blur-md border-b border-[#252525]">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-[#E10600] rounded-sm flex items-center justify-center transform -skew-x-12">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="font-titillium text-2xl font-black tracking-widest uppercase">{PRODUCT_NAME}</span>
        </div>
        <div className="hidden md:flex gap-8 font-space text-xs uppercase tracking-widest text-[#A0A0A0]">
          <a href="#features" className="hover:text-[#00D2BE] transition-colors">Systems</a>
          <a href="#telemetry" className="hover:text-[#00D2BE] transition-colors">Telemetry</a>
          <a href="#pricing" className="hover:text-[#00D2BE] transition-colors">Constructors</a>
        </div>
        <RaceButton className="!px-6 !py-2 text-sm">Paddock Pass</RaceButton>
      </nav>

      <main className="relative pt-32">
        {/* Hero */}
        <section className="relative min-h-[85vh] flex items-center px-6 overflow-hidden">
          <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center relative z-10">
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            >
              <div className="font-space text-[#E10600] text-sm uppercase tracking-[0.2em] mb-4 flex items-center">
                <span className="w-2 h-2 bg-[#E10600] rounded-full mr-3 animate-pulse"></span>
                Sector 1 / Green Flag
              </div>
              <h1 className="font-titillium text-7xl md:text-[100px] leading-[0.85] font-black uppercase mb-8">
                Data At<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#676767]">300 KM/H</span>
              </h1>
              <p className="font-space text-[#A0A0A0] text-sm leading-relaxed mb-10 max-w-md">
                Precision engineering meets cloud analytics. Reduce lap times, optimize setups, and dominate the circuit with real-time constructor data.
              </p>
              <div className="flex gap-6">
                <RaceButton>Start Engine</RaceButton>
                <button className="font-space text-xs uppercase tracking-widest text-white hover:text-[#00D2BE] transition-colors flex items-center gap-2">
                  <PlayIcon className="w-4 h-4" /> View Documentation
                </button>
              </div>
            </motion.div>

            {/* Abstract Car / Aero visual */}
            <motion.div
              className="relative aspect-square flex items-center justify-center perspective-[1000px]"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.div
                className="w-full h-full border border-[#252525] rounded-full relative"
                animate={{ rotateZ: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: [0, 0, 1, 1] }}
              >
                <div className="absolute top-0 left-1/2 w-4 h-4 bg-[#E10600] -translate-x-1/2 -translate-y-1/2 shadow-[0_0_20px_#E10600]" />
              </motion.div>
              <div className="absolute w-3/4 h-3/4 border border-[#00D2BE]/30 rounded-full border-dashed" />
              <div className="absolute font-titillium text-9xl font-black text-[#111111] opacity-50 z-[-1]">01</div>
            </motion.div>
          </div>
        </section>

        {/* Stats Strip */}
        <section className="border-y border-[#252525] bg-[#0A0A0A]">
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-[#252525]">
            {[
              { val: '1.2ms', label: 'Latency' },
              { val: '300+', label: 'Channels' },
              { val: '99.99%', label: 'Reliability' },
              { val: '10TB', label: 'Data / Lap' }
            ].map((stat, i) => (
              <div key={i} className="px-6 py-10 flex flex-col items-center justify-center text-center group">
                <div className="font-titillium text-4xl md:text-5xl font-black text-white group-hover:text-[#00D2BE] transition-colors mb-2">{stat.val}</div>
                <div className="font-space text-[#676767] text-xs uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Features Grid */}
        <SectionWrapper id="features" className="px-6 bg-[#050505]">
          <div className="max-w-6xl mx-auto">
            <div className="mb-16 flex justify-between items-end">
              <div>
                <h2 className="font-titillium text-5xl font-black uppercase text-white mb-2">Paddock Systems</h2>
                <div className="h-1 w-20 bg-[#E10600]"></div>
              </div>
              <div className="font-space text-xs text-[#A0A0A0] hidden md:block">SYS.VER. 4.0.2</div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Activity, title: 'Aero Mapping', desc: 'Real-time downforce calculations across 40 different wing configurations.' },
                { icon: Gauge, title: 'Tyre Degradation', desc: 'Thermal imaging combined with pressure sensors to predict the exact cliff drop-off.' },
                { icon: Map, title: 'GPS Tracking', desc: 'Centimeter-perfect positioning for optimal racing line analysis.' },
                { icon: Radio, title: 'Radio Comms', desc: 'Encrypted, low-latency pit-to-car communication with automated transcription.' },
                { icon: Settings, title: 'Power Unit', desc: 'MGU-K and MGU-H deployment optimization for maximum straight-line speed.' },
                { icon: Zap, title: 'ERS Management', desc: 'Automated battery deployment strategies based on competitor slipstreams.' }
              ].map((f, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -5, backgroundColor: '#111111' }}
                  className="p-8 border border-[#252525] bg-[#0A0A0A] relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#E10600]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <f.icon className="w-8 h-8 text-[#00D2BE] mb-6" />
                  <h3 className="font-titillium text-xl font-bold uppercase text-white mb-3">{f.title}</h3>
                  <p className="font-space text-xs text-[#A0A0A0] leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </SectionWrapper>

        {/* Telemetry Scroll Jack Section */}
        <div id="telemetry">
          <TelemetryTeleporter />
        </div>

        {/* Product Detail (Pit-Stop Morph) */}
        <SectionWrapper className="px-6 bg-[#0A0A0A] border-y border-[#252525] py-32">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="font-titillium text-5xl font-black uppercase text-white mb-6">The 1.8s Pit Stop</h2>
                <p className="font-space text-sm text-[#A0A0A0] leading-relaxed mb-6">
                  Races are won and lost in the pit lane. Our predictive maintenance algorithms analyze millions of data points per second to tell you exactly when to box.
                </p>
                <p className="font-space text-sm text-[#A0A0A0] leading-relaxed mb-8">
                  We don't just provide data; we provide decisions. The system alerts the crew 10 seconds before an unexpected stop, ensuring tires are hot and ready.
                </p>
                <ul className="space-y-4 font-space text-sm">
                  <li className="flex items-center text-white"><Check className="w-4 h-4 text-[#00D2BE] mr-3" /> Machine-learning tire models</li>
                  <li className="flex items-center text-white"><Check className="w-4 h-4 text-[#00D2BE] mr-3" /> Competitor undercut probability</li>
                  <li className="flex items-center text-white"><Check className="w-4 h-4 text-[#00D2BE] mr-3" /> Automated flag-state adaptations</li>
                </ul>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#E10600]/20 to-transparent" style={{ clipPath: 'polygon(0 20%, 100% 0, 100% 80%, 0 100%)' }} />
                <div className="aspect-[4/3] bg-[#111111] border border-[#252525] p-6 flex flex-col justify-between relative z-10" style={{ transform: 'skewY(-2deg)' }}>
                  <div className="flex justify-between items-start font-space text-xs text-[#676767] uppercase">
                    <span>BOX BOX BOX</span>
                    <span className="text-[#E10600] animate-pulse">L 42/70</span>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 bg-[#252525] w-full"><div className="h-full bg-[#00D2BE] w-[85%]" /></div>
                    <div className="h-2 bg-[#252525] w-full"><div className="h-full bg-white w-[60%]" /></div>
                    <div className="h-2 bg-[#252525] w-full"><div className="h-full bg-[#E10600] w-[95%]" /></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SectionWrapper>

        {/* Pricing */}
        <SectionWrapper id="pricing" className="px-6 bg-[#050505]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-titillium text-5xl font-black uppercase text-white mb-2">Constructor Budgets</h2>
              <p className="font-space text-xs text-[#A0A0A0] uppercase">Cost Cap Compliant</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: 'F3', price: 'Free', period: '', desc: 'Basic telemetry for junior series', features: ['10Hz GPS', 'Basic Aero', 'Community Forum'] },
                { name: 'F2', price: '$2K', period: '/race', desc: 'Advanced data for feeder series', features: ['50Hz GPS', 'Live Pit-Wall', 'Radio Comms'], highlighted: true },
                { name: 'F1', price: 'Custom', period: '', desc: 'Full works team deployment', features: ['1000Hz Sensors', 'AI Strategist', 'On-Site Eng'] }
              ].map((tier, i) => (
                <div
                  key={i}
                  className={`p-8 border ${tier.highlighted ? 'border-[#E10600] bg-[#111111]' : 'border-[#252525] bg-[#0A0A0A]'} relative`}
                >
                  {tier.highlighted && (
                    <div className="absolute top-0 right-0 bg-[#E10600] text-white text-[10px] font-space px-3 py-1 uppercase font-bold tracking-widest">
                      Pole Position
                    </div>
                  )}
                  <h3 className="font-titillium text-3xl font-bold uppercase text-white mb-2">{tier.name}</h3>
                  <div className="mb-6 border-b border-[#252525] pb-6">
                    <span className="font-titillium text-5xl font-black text-white">{tier.price}</span>
                    <span className="font-space text-xs text-[#676767] uppercase">{tier.period}</span>
                  </div>
                  <p className="font-space text-sm text-[#A0A0A0] mb-8 h-10">{tier.desc}</p>
                  <ul className="space-y-4 mb-8">
                    {tier.features.map((f, j) => (
                      <li key={j} className="flex items-center font-space text-sm text-white">
                        <Check className="w-4 h-4 text-[#00D2BE] mr-3" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button
                    className={`w-full py-4 font-titillium font-bold uppercase tracking-wider transition-colors ${
                      tier.highlighted
                        ? 'bg-[#E10600] text-white hover:bg-[#C10500]'
                        : 'bg-transparent border border-[#252525] text-white hover:border-white'
                    }`}
                  >
                    Select Engine
                  </button>
                </div>
              ))}
            </div>
          </div>
        </SectionWrapper>

        {/* Testimonials */}
        <SectionWrapper className="px-6 border-y border-[#252525] bg-[#0A0A0A]">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-titillium text-4xl font-black uppercase text-white mb-12 text-center">Post-Race Interviews</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: 'Max V.', role: 'World Champion', text: "The delta times are incredibly accurate. It feels like cheating, but it's just better engineering." },
                { name: 'Toto W.', role: 'Team Principal', text: "We found 2 tenths in sector three just by analyzing the AI's suggested downforce maps." },
                { name: 'Gianpiero L.', role: 'Race Engineer', text: "The radio integration alone makes this indispensable. Crystal clear comms even at 320km/h." }
              ].map((t, i) => (
                <div key={i} className="p-8 border border-[#252525] bg-[#050505]">
                  <div className="flex mb-6">
                    {[1,2,3,4,5].map(star => <Star key={star} className="w-4 h-4 fill-[#00D2BE] text-[#00D2BE]" />)}
                  </div>
                  <p className="font-space text-sm text-[#A0A0A0] italic mb-6 leading-relaxed">"{t.text}"</p>
                  <div>
                    <div className="font-titillium font-bold uppercase text-white text-lg">{t.name}</div>
                    <div className="font-space text-xs text-[#E10600] uppercase tracking-wider">{t.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SectionWrapper>

        {/* FAQ */}
        <SectionWrapper className="px-6 bg-[#050505]">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-titillium text-4xl font-black uppercase text-white mb-12 text-center">Technical Regulations</h2>
            <div className="space-y-2">
              {[
                { q: "Is the hardware FIA homologated?", a: "Yes, our sensors meet all current technical directives for the 2026 regulations." },
                { q: "What is the data retention policy?", a: "Data is stored encrypted in cold storage for 5 years per sporting regulations." },
                { q: "Can we integrate legacy sensors?", a: "The Apex API supports most standard CAN bus protocols." },
                { q: "How is cloud security handled?", a: "End-to-end encryption with dedicated private servers for each constructor." },
                { q: "What's the SLA on race weekends?", a: "We guarantee 99.999% uptime Thursday through Sunday with 2 engineers on-site." },
                { q: "Do you offer CFD integration?", a: "Yes, we integrate with major CFD packages to compare virtual vs track data." }
              ].map((faq, i) => (
                <FAQItem key={i} question={faq.q} answer={faq.a} />
              ))}
            </div>
          </div>
        </SectionWrapper>

        {/* Newsletter */}
        <SectionWrapper className="px-6 bg-[#E10600] border-y border-[#252525]">
          <div className="max-w-2xl mx-auto text-center py-8">
            <h2 className="font-titillium text-5xl font-black uppercase text-white mb-4">Join the Grid</h2>
            <p className="font-space text-white/80 text-sm mb-8">Receive weekly technical updates and setup guides.</p>
            <form className="flex flex-col sm:flex-row gap-0">
              <input
                type="email"
                placeholder="EMAIL ADDRESS"
                className="flex-1 bg-white text-black font-space text-sm px-6 py-4 outline-none uppercase placeholder:text-gray-400"
              />
              <button className="bg-[#111111] text-white font-titillium font-bold uppercase tracking-widest px-8 py-4 hover:bg-[#252525] transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </SectionWrapper>
      </main>

      {/* Footer */}
      <footer className="bg-[#050505] pt-20 pb-10 px-6 border-t border-[#252525]">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-10 mb-16">
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-5 h-5 text-[#E10600]" />
              <span className="font-titillium text-2xl font-black uppercase text-white">{PRODUCT_NAME}</span>
            </div>
            <p className="font-space text-xs text-[#676767] leading-relaxed max-w-sm">
              The premier data infrastructure for elite motorsport. Providing the marginal gains that define world championships.
            </p>
          </div>
          <div>
            <h4 className="font-space text-xs text-white uppercase tracking-widest mb-4">Platform</h4>
            <ul className="space-y-3 font-space text-xs text-[#676767]">
              <li><a href="#" className="hover:text-[#00D2BE] transition-colors">Telemetry</a></li>
              <li><a href="#" className="hover:text-[#00D2BE] transition-colors">Aero Maps</a></li>
              <li><a href="#" className="hover:text-[#00D2BE] transition-colors">Strategy AI</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-space text-xs text-white uppercase tracking-widest mb-4">Company</h4>
            <ul className="space-y-3 font-space text-xs text-[#676767]">
              <li><a href="#" className="hover:text-[#00D2BE] transition-colors">About</a></li>
              <li><a href="#" className="hover:text-[#00D2BE] transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-[#00D2BE] transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-space text-xs text-white uppercase tracking-widest mb-4">Legal</h4>
            <ul className="space-y-3 font-space text-xs text-[#676767]">
              <li><a href="#" className="hover:text-[#00D2BE] transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-[#00D2BE] transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center pt-8 border-t border-[#252525] font-space text-xs text-[#676767]">
          <div>© 2026 {PRODUCT_NAME}. ALL RIGHTS RESERVED.</div>
          <a href="/" className="mt-4 md:mt-0 hover:text-white transition-colors flex items-center gap-2">
            PADDOCK EXIT <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </footer>
    </div>
  )
}

function FAQItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border border-[#252525] bg-[#0A0A0A]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex justify-between items-center text-left"
      >
        <span className="font-titillium text-lg font-bold uppercase text-white">{question}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
          <ChevronDown className="text-[#00D2BE] w-5 h-5" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="font-space text-sm text-[#A0A0A0] px-6 pb-6 leading-relaxed border-t border-[#252525] pt-4 mt-2">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function PlayIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}
