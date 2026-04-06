'use client'

import React, { useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Syne, JetBrains_Mono } from 'next/font/google'
import { ThermometerSun, Droplets, Leaf, ShieldAlert, Settings2, Wind, Eye, CheckCircle2, ChevronRight, Activity, ArrowRight, Sun, Moon } from 'lucide-react'

const syne = Syne({ subsets: ['latin'], variable: '--font-syne' })
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains' })

const TOKENS = {
  background: '#1C1917', // Obsidian
  surface: '#292524', // Deep Shale
  accent1: '#84CC16', // Venom Green
  accent2: '#EA580C', // Heat Lamp Orange
  border: '#44403C',
  textHigh: '#F5F5F4',
  textLow: '#A8A29E',
}

// Custom Framer Motion Variants
const theBlink: import('framer-motion').Variants = {
  animate: {
    scaleY: [1, 0.1, 1],
    transition: {
      duration: 0.2,
      repeat: Infinity,
      repeatDelay: 10,
      ease: "easeInOut" as const
    }
  }
}

const slitherTransition: import('framer-motion').Variants = {
  hidden: { opacity: 0, x: -50, y: 20 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 80,
      damping: 20,
      mass: 1.5
    }
  }
}

const heatPulse = {
  hover: {
    scale: 1.05,
    boxShadow: `0 0 40px ${TOKENS.accent2}40`,
    transition: { type: "spring" as const, stiffness: 100, damping: 40 }
  }
}

function ScalyBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0 mix-blend-overlay"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20h2V0h2v20h2V0h2v20h2V0h2v20h2V0h2v20h2v2H20v-1.5zM0 20h2v20H0V20zm4 0h2v20H4V20zm4 0h2v20H8V20zm4 0h2v20h-2V20zm4 0h2v20h-2V20zm4 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2z' fill='%23FFFFFF' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        backgroundSize: '40px 40px'
      }}
    />
  )
}

function HumidityGauge({ humidity }: { humidity: number }) {
  const [blur, setBlur] = useState(0)

  useEffect(() => {
    // Calculate blur based on humidity (higher humidity = more blur/fog)
    // 50% = 0px, 100% = 10px
    const blurAmount = Math.max(0, (humidity - 50) / 5)
    setBlur(blurAmount)
  }, [humidity])

  return (
    <div className="relative w-full max-w-sm aspect-square mx-auto">
      {/* Outer Ring */}
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
        <circle
          cx="50" cy="50" r="45"
          fill="none"
          stroke={TOKENS.surface}
          strokeWidth="4"
        />
        <motion.circle
          cx="50" cy="50" r="45"
          fill="none"
          stroke={TOKENS.accent1}
          strokeWidth="4"
          strokeDasharray="283"
          initial={{ strokeDashoffset: 283 }}
          animate={{ strokeDashoffset: 283 - (283 * humidity) / 100 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="drop-shadow-[0_0_8px_rgba(132,204,22,0.5)]"
        />
      </svg>

      {/* Inner Fog Container */}
      <div
        className="absolute inset-4 rounded-full flex flex-col items-center justify-center overflow-hidden transition-all duration-1000"
        style={{
          backgroundColor: TOKENS.background,
          border: `2px solid ${TOKENS.border}`
        }}
      >
        <motion.div
          className="absolute inset-0 z-10 transition-all duration-1000"
          style={{
            backdropFilter: `blur(${blur}px)`,
            backgroundColor: `rgba(255,255,255,${blur * 0.01})`
          }}
        />
        <div className="relative z-20 text-center font-mono" style={{ fontFamily: 'var(--font-jetbrains)' }}>
          <Droplets className="mx-auto mb-2" size={24} color={TOKENS.accent1} />
          <div className="text-4xl font-bold" style={{ color: TOKENS.textHigh }}>{humidity}%</div>
          <div className="text-xs uppercase mt-1 tracking-widest" style={{ color: TOKENS.textLow }}>Humidity</div>
        </div>
      </div>
    </div>
  )
}

function UVSpectrumScroll() {
  const { scrollYProgress } = useScroll()
  const backgroundColor = useTransform(scrollYProgress, [0, 1], [TOKENS.surface, TOKENS.accent2])

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 z-50 origin-left"
      style={{ scaleX: scrollYProgress, backgroundColor }}
    />
  )
}

export default function ReptileRoomPage() {
  const [demoHumidity, setDemoHumidity] = useState(65)

  // Simulate changing humidity
  useEffect(() => {
    const interval = setInterval(() => {
      setDemoHumidity(prev => {
        const next = prev + (Math.random() * 10 - 5)
        return Math.min(95, Math.max(40, next))
      })
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className={`min-h-screen ${syne.variable} ${jetbrains.variable}`} style={{ backgroundColor: TOKENS.background, color: TOKENS.textHigh }}>
      <ScalyBackground />
      <UVSpectrumScroll />

      {/* 1. Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-40 px-6 py-4 flex justify-between items-center bg-opacity-90 backdrop-blur-md border-b" style={{ borderColor: TOKENS.border, backgroundColor: TOKENS.background }}>
        <div className="flex items-center gap-3">
          <motion.div variants={theBlink} animate="animate" className="w-8 h-8 rounded-full flex items-center justify-center border-2" style={{ borderColor: TOKENS.accent1 }}>
            <Eye size={16} color={TOKENS.accent1} />
          </motion.div>
          <span className="font-bold text-xl uppercase tracking-widest" style={{ fontFamily: 'var(--font-syne)' }}>ReptileRoom</span>
        </div>

        <div className="hidden md:flex gap-8 group">
          {['Terrariums', 'Climate', 'Nutrition'].map((item) => (
            <motion.a
              key={item}
              href="#"
              className="text-sm font-mono uppercase tracking-wider relative overflow-hidden"
              style={{ color: TOKENS.textLow, fontFamily: 'var(--font-jetbrains)' }}
              whileHover="hover"
              initial="rest"
            >
              <motion.span
                className="absolute inset-0 bg-current opacity-10"
                variants={{ rest: { y: "100%" }, hover: { y: "0%" } }}
                transition={{ duration: 0.1 }}
              />
              {item}
            </motion.a>
          ))}
        </div>

        <button className="px-6 py-2 text-sm font-mono uppercase tracking-wider border transition-colors hover:bg-opacity-10"
                style={{ borderColor: TOKENS.accent1, color: TOKENS.accent1, fontFamily: 'var(--font-jetbrains)' }}>
          System Check
        </button>
      </nav>

      <main className="pt-32 pb-24 relative z-10 space-y-32">

        {/* 2. Hero */}
        <section className="px-6 md:px-12 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 min-h-[70vh]">
          <div className="flex-1 space-y-8">
            <motion.div
              initial="hidden" animate="visible" variants={slitherTransition}
              className="inline-flex items-center gap-2 px-3 py-1 text-xs font-mono uppercase border"
              style={{ borderColor: TOKENS.border, color: TOKENS.textLow, fontFamily: 'var(--font-jetbrains)' }}
            >
              <Activity size={14} color={TOKENS.accent2} /> Env Status: Nominal
            </motion.div>

            <motion.h1
              initial="hidden" animate="visible" variants={slitherTransition} custom={1}
              className="text-6xl md:text-8xl font-black uppercase leading-none tracking-tight"
              style={{ fontFamily: 'var(--font-syne)' }}
            >
              Primal <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r" style={{ backgroundImage: `linear-gradient(to right, ${TOKENS.accent1}, ${TOKENS.accent2})` }}>
                Precision
              </span>
            </motion.h1>

            <motion.p
              initial="hidden" animate="visible" variants={slitherTransition} custom={2}
              className="text-lg md:text-xl max-w-lg font-mono leading-relaxed"
              style={{ color: TOKENS.textLow, fontFamily: 'var(--font-jetbrains)' }}
            >
              Advanced terrarium management for exotic species. Monitor heat, humidity, and lighting with surgical accuracy.
            </motion.p>

            <motion.div initial="hidden" animate="visible" variants={slitherTransition} custom={3}>
              <motion.button
                whileHover={heatPulse.hover}
                className="px-8 py-4 font-bold uppercase tracking-widest text-sm flex items-center gap-3 transition-colors"
                style={{ backgroundColor: TOKENS.surface, color: TOKENS.textHigh, border: `1px solid ${TOKENS.border}` }}
              >
                Initialize Setup <ArrowRight size={18} color={TOKENS.accent1} />
              </motion.button>
            </motion.div>
          </div>

          <div className="flex-1 w-full relative">
             <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-black opacity-50 z-10 pointer-events-none" />
             <div className="aspect-square bg-black border relative overflow-hidden" style={{ borderColor: TOKENS.border }}>
               {/* Abstract heat lamp glow */}
               <motion.div
                 className="absolute -top-1/4 -right-1/4 w-3/4 h-3/4 rounded-full blur-3xl opacity-30"
                 style={{ backgroundColor: TOKENS.accent2 }}
                 animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                 transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               />
               <div className="absolute bottom-8 left-8 right-8 font-mono text-sm space-y-2 z-20" style={{ fontFamily: 'var(--font-jetbrains)', color: TOKENS.textLow }}>
                 <div className="flex justify-between border-b pb-1" style={{ borderColor: TOKENS.border }}><span>Zone_A_Temp:</span> <span style={{ color: TOKENS.accent2 }}>32.4°C</span></div>
                 <div className="flex justify-between border-b pb-1" style={{ borderColor: TOKENS.border }}><span>UVB_Index:</span> <span style={{ color: TOKENS.accent1 }}>High</span></div>
                 <div className="flex justify-between"><span>Status:</span> <span>Active_Basking</span></div>
               </div>
             </div>
          </div>
        </section>

        {/* 3. Stats */}
        <section className="px-6 md:px-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { val: '24/7', label: 'Monitoring' },
              { val: '0.1°C', label: 'Accuracy' },
              { val: '12+', label: 'Species Profiles' },
              { val: '99.9%', label: 'Uptime' }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slitherTransition}
                className="p-6 border bg-opacity-50"
                style={{ borderColor: TOKENS.border, backgroundColor: TOKENS.surface }}
              >
                <div className="text-3xl font-bold mb-1" style={{ fontFamily: 'var(--font-syne)', color: TOKENS.textHigh }}>{stat.val}</div>
                <div className="text-xs font-mono uppercase tracking-widest" style={{ color: TOKENS.textLow, fontFamily: 'var(--font-jetbrains)' }}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 4. Unique Section: Habitat Humidity Tracker */}
        <section className="px-6 md:px-12 max-w-5xl mx-auto py-16 border" style={{ borderColor: TOKENS.border, backgroundColor: TOKENS.surface }}>
          <div className="grid md:grid-cols-2 gap-12 items-center p-8">
            <div>
              <h2 className="text-3xl font-bold uppercase mb-4" style={{ fontFamily: 'var(--font-syne)' }}>Atmospheric <br/><span style={{ color: TOKENS.accent1 }}>Control</span></h2>
              <p className="font-mono text-sm leading-relaxed mb-8" style={{ color: TOKENS.textLow, fontFamily: 'var(--font-jetbrains)' }}>
                Real-time humidity tracking with particle-fog visualization.
                As humidity increases, the interface mimics the terrarium environment, providing intuitive visual feedback on moisture levels crucial for shedding and respiratory health.
              </p>

              <div className="space-y-4 font-mono text-xs" style={{ fontFamily: 'var(--font-jetbrains)' }}>
                <div className="flex items-center justify-between p-3 border" style={{ borderColor: TOKENS.border }}>
                  <span className="flex items-center gap-2"><ThermometerSun size={14} color={TOKENS.accent2}/> Target Hum:</span>
                  <span>65% - 75%</span>
                </div>
                <div className="flex items-center justify-between p-3 border" style={{ borderColor: TOKENS.border }}>
                  <span className="flex items-center gap-2"><Wind size={14} color={TOKENS.accent1}/> Misting Sys:</span>
                  <span>Auto (Standby)</span>
                </div>
              </div>
            </div>

            <div className="bg-black p-8 border" style={{ borderColor: TOKENS.border }}>
               <HumidityGauge humidity={Math.round(demoHumidity)} />
               <div className="text-center mt-6">
                 <input
                   type="range"
                   min="40" max="95"
                   value={demoHumidity}
                   onChange={(e) => setDemoHumidity(Number(e.target.value))}
                   className="w-full accent-[#84CC16]"
                 />
                 <div className="text-xs font-mono mt-2" style={{ color: TOKENS.textLow, fontFamily: 'var(--font-jetbrains)' }}>Manual Override Demo</div>
               </div>
            </div>
          </div>
        </section>

        {/* 5. Features */}
        <section className="px-6 md:px-12 max-w-7xl mx-auto">
          <div className="mb-12 border-b pb-4" style={{ borderColor: TOKENS.border }}>
            <h2 className="text-3xl font-bold uppercase" style={{ fontFamily: 'var(--font-syne)' }}>Core Systems</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: <ThermometerSun/>, title: 'Thermal Gradients', desc: 'Manage basking spots and cool zones independently to ensure proper thermoregulation.' },
              { icon: <Droplets/>, title: 'Moisture Control', desc: 'Automated misting and fogging schedules based on specific species requirements.' },
              { icon: <Sun/>, title: 'UVB Scheduling', desc: 'Simulate natural photoperiods with dawn/dusk transitions and UV index tracking.' },
              { icon: <Leaf/>, title: 'Bioactive Support', desc: 'Track soil moisture and lighting to maintain healthy plant life in naturalistic setups.' },
              { icon: <ShieldAlert/>, title: 'Critical Alerts', desc: 'Instant notifications for temperature spikes or equipment failures.' },
              { icon: <Settings2/>, title: 'Custom Profiles', desc: 'Load pre-configured environmental parameters for over 50 reptile and amphibian species.' }
            ].map((feat, i) => (
              <motion.div
                key={i}
                whileHover={heatPulse.hover}
                className="p-6 border bg-black group relative overflow-hidden"
                style={{ borderColor: TOKENS.border }}
              >
                {/* Scaly texture overlay on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
                     style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='10' viewBox='0 0 10 10' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5 0l5 5-5 5L0 5z' fill='%23FFFFFF' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")` }} />

                <div className="mb-4" style={{ color: TOKENS.accent1 }}>{feat.icon}</div>
                <h3 className="font-bold uppercase mb-2 text-lg" style={{ fontFamily: 'var(--font-syne)' }}>{feat.title}</h3>
                <p className="text-sm font-mono leading-relaxed" style={{ color: TOKENS.textLow, fontFamily: 'var(--font-jetbrains)' }}>{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 6. Product Detail */}
        <section className="px-6 md:px-12 max-w-7xl mx-auto border" style={{ borderColor: TOKENS.border, backgroundColor: TOKENS.surface }}>
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 p-8 md:p-16 border-b md:border-b-0 md:border-r" style={{ borderColor: TOKENS.border }}>
              <h2 className="text-4xl font-bold uppercase leading-tight mb-6" style={{ fontFamily: 'var(--font-syne)' }}>
                Cold-Blooded <br/>
                <span style={{ color: TOKENS.accent2 }}>Logistics</span>
              </h2>
              <p className="font-mono text-sm leading-relaxed mb-6" style={{ color: TOKENS.textLow, fontFamily: 'var(--font-jetbrains)' }}>
                Reptiles rely entirely on their environment to survive. We don&apos;t believe in guesswork. ReptileRoom transforms your terrarium into a data-driven habitat.
              </p>
              <p className="font-mono text-sm leading-relaxed" style={{ color: TOKENS.textLow, fontFamily: 'var(--font-jetbrains)' }}>
                By continuously analyzing sensor data against species-specific profiles, our system predicts and corrects micro-climate drifts before they affect your animal's health.
              </p>
            </div>
            <div className="w-full md:w-1/2 bg-black p-8 relative flex items-center justify-center overflow-hidden">
               {/* Simulated Data Stream */}
               <div className="absolute inset-0 opacity-20 pointer-events-none"
                    style={{ backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(132, 204, 22, 0.3) 25%, rgba(132, 204, 22, 0.3) 26%, transparent 27%, transparent 74%, rgba(132, 204, 22, 0.3) 75%, rgba(132, 204, 22, 0.3) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(132, 204, 22, 0.3) 25%, rgba(132, 204, 22, 0.3) 26%, transparent 27%, transparent 74%, rgba(132, 204, 22, 0.3) 75%, rgba(132, 204, 22, 0.3) 76%, transparent 77%, transparent)', backgroundSize: '50px 50px' }} />

               <div className="font-mono text-xs space-y-2 w-full max-w-xs relative z-10" style={{ color: TOKENS.accent1, fontFamily: 'var(--font-jetbrains)' }}>
                 <motion.div initial={{ x: -10 }} animate={{ x: 0 }} transition={{ repeat: Infinity, duration: 1 }}>{`> RECV: SENSOR_A_DATA`}</motion.div>
                 <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ repeat: Infinity, duration: 1.5 }}>{`> PARSING... [OK]`}</motion.div>
                 <div>{`> TEMP: 31.2C | HUM: 68%`}</div>
                 <motion.div initial={{ x: -10 }} animate={{ x: 0 }} transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}>{`> EVALUATING PROFILE: P_REG_01`}</motion.div>
                 <div style={{ color: TOKENS.accent2 }}>{`> ACTION: ENGAGE_MIST_SYS`}</div>
                 <motion.div animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 0.5 }}>{`_`}</motion.div>
               </div>
            </div>
          </div>
        </section>

        {/* 7. Pricing */}
        <section className="px-6 md:px-12 max-w-7xl mx-auto">
           <div className="text-center mb-16">
            <h2 className="text-3xl font-bold uppercase mb-2" style={{ fontFamily: 'var(--font-syne)' }}>Deployment Plans</h2>
            <p className="font-mono text-sm" style={{ color: TOKENS.textLow, fontFamily: 'var(--font-jetbrains)' }}>Hardware integration sold separately.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Hatchling', price: '$0', desc: 'Basic manual logging.', features: ['1 Habitat profile', 'Manual data entry', 'Basic care guides'] },
              { name: 'Keeper', price: '$15', desc: 'Automated monitoring.', features: ['Up to 3 Habitats', 'Sensor integration', 'Alert notifications'], featured: true },
              { name: 'Facility', price: '$49', desc: 'Breeder level control.', features: ['Unlimited Habitats', 'Advanced analytics', 'API access'] }
            ].map((plan, i) => (
              <div key={i} className="border p-8 relative flex flex-col bg-black" style={{ borderColor: plan.featured ? TOKENS.accent1 : TOKENS.border }}>
                {plan.featured && (
                  <div className="absolute top-0 right-0 px-3 py-1 text-xs font-bold uppercase bg-opacity-20" style={{ backgroundColor: TOKENS.accent1, color: TOKENS.accent1 }}>
                    Active
                  </div>
                )}
                <h3 className="text-xl font-bold uppercase mb-2" style={{ fontFamily: 'var(--font-syne)' }}>{plan.name}</h3>
                <div className="text-3xl font-mono mb-4" style={{ fontFamily: 'var(--font-jetbrains)' }}>{plan.price}<span className="text-sm" style={{ color: TOKENS.textLow }}>/mo</span></div>
                <p className="text-sm font-mono mb-8 h-10" style={{ color: TOKENS.textLow, fontFamily: 'var(--font-jetbrains)' }}>{plan.desc}</p>

                <ul className="space-y-4 mb-8 flex-1">
                  {plan.features.map((feat, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm font-mono" style={{ fontFamily: 'var(--font-jetbrains)' }}>
                      <CheckCircle2 size={16} color={plan.featured ? TOKENS.accent1 : TOKENS.textLow} className="shrink-0 mt-0.5" />
                      <span style={{ color: TOKENS.textHigh }}>{feat}</span>
                    </li>
                  ))}
                </ul>

                <button className="w-full py-4 text-sm font-bold uppercase tracking-widest border transition-all"
                        style={{
                          backgroundColor: plan.featured ? TOKENS.accent1 : 'transparent',
                          color: plan.featured ? 'black' : TOKENS.textHigh,
                          borderColor: plan.featured ? TOKENS.accent1 : TOKENS.border
                        }}>
                  Select Plan
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* 8. Testimonials */}
        <section className="px-6 md:px-12 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold uppercase mb-12 border-b pb-4" style={{ fontFamily: 'var(--font-syne)', borderColor: TOKENS.border }}>Field Reports</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { quote: "The precision is unmatched. I can finally maintain the exact micro-climate required for my rare chameleon species without constantly checking analog gauges.", author: "Dr. Aris Vance", role: "Herpetologist" },
              { quote: "ReptileRoom&apos;s alert system saved my entire rack during a power fluctuation. The interface feels like mission control for my breeding facility.", author: "Sarah Croft", role: "Morph Breeder" },
              { quote: "Integrating the smart plugs with their API took minutes. The heat pulse visualizations let me see exactly how the gradient works across the enclosure.", author: "James Lin", role: "Exotics Keeper" }
            ].map((t, i) => (
              <div key={i} className="p-8 border bg-black" style={{ borderColor: TOKENS.border }}>
                <p className="font-mono text-sm leading-relaxed mb-6" style={{ color: TOKENS.textHigh, fontFamily: 'var(--font-jetbrains)' }}>"{t.quote}"</p>
                <div className="flex items-center gap-4 border-t pt-4" style={{ borderColor: TOKENS.border }}>
                  <div className="w-10 h-10 bg-gray-800 rounded-sm border" style={{ borderColor: TOKENS.border }} />
                  <div>
                    <div className="font-bold uppercase text-sm" style={{ fontFamily: 'var(--font-syne)' }}>{t.author}</div>
                    <div className="text-xs font-mono" style={{ color: TOKENS.textLow, fontFamily: 'var(--font-jetbrains)' }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 9. FAQ */}
        <section className="px-6 md:px-12 max-w-3xl mx-auto">
           <h2 className="text-3xl font-bold uppercase mb-8 text-center" style={{ fontFamily: 'var(--font-syne)' }}>Technical Specs (FAQ)</h2>

           <div className="space-y-2">
             {[
               { q: "What hardware is compatible?", a: "We support major IoT platforms including SmartThings, HomeAssistant, and direct integration with popular WiFi thermostats/hygrometers." },
               { q: "Is the data stored locally or in the cloud?", a: "All basic functions work locally. Historical analytics and mobile push notifications require cloud connectivity." },
               { q: "Can I create custom species profiles?", a: "Yes, the Keeper tier allows you to define custom temperature gradients, humidity ranges, and UV schedules." },
               { q: "How fast is the alert system?", a: "Alerts are dispatched within 2 seconds of a detected parameter breach." },
               { q: "Does it control lighting?", a: "Yes, you can schedule complex dawn-to-dusk lighting cycles including UVB and ceramic heat emitters." },
               { q: "What if the internet goes down?", a: "Local automation rules continue to run on your local network hub to maintain habitat stability." }
             ].map((faq, i) => (
               <details key={i} className="group border bg-black" style={{ borderColor: TOKENS.border }}>
                 <summary className="font-mono text-sm p-4 cursor-pointer flex justify-between items-center outline-none" style={{ color: TOKENS.textHigh, fontFamily: 'var(--font-jetbrains)' }}>
                   <span><span style={{ color: TOKENS.accent1 }}>{`>`}</span> {faq.q}</span>
                   <ChevronRight size={16} className="transition-transform group-open:rotate-90" style={{ color: TOKENS.textLow }} />
                 </summary>
                 <div className="p-4 pt-0 text-sm font-mono leading-relaxed border-t mt-2" style={{ color: TOKENS.textLow, fontFamily: 'var(--font-jetbrains)', borderColor: TOKENS.border }}>
                   {faq.a}
                 </div>
               </details>
             ))}
           </div>
        </section>

        {/* 10. Newsletter */}
        <section className="px-6 md:px-12 max-w-7xl mx-auto">
          <div className="border p-12 text-center relative overflow-hidden bg-black" style={{ borderColor: TOKENS.accent1 }}>
            {/* Scanline effect */}
            <motion.div
              className="absolute inset-0 border-b z-10 pointer-events-none"
              style={{ borderColor: TOKENS.accent1, height: '10%' }}
              animate={{ y: ['-100%', '1000%'] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
            />

            <ShieldAlert size={48} color={TOKENS.accent1} className="mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold uppercase mb-4 relative z-20" style={{ fontFamily: 'var(--font-syne)' }}>Secure Your Habitat</h2>
            <p className="font-mono text-sm max-w-md mx-auto mb-8 relative z-20" style={{ color: TOKENS.textLow, fontFamily: 'var(--font-jetbrains)' }}>
              Enter coordinates to receive technical updates and firmware patch notes.
            </p>

            <div className="flex flex-col md:flex-row gap-0 max-w-md mx-auto relative z-20 border" style={{ borderColor: TOKENS.border }}>
              <div className="flex-1 flex items-center px-4" style={{ backgroundColor: TOKENS.surface }}>
                <span className="font-mono text-sm mr-2" style={{ color: TOKENS.accent1, fontFamily: 'var(--font-jetbrains)' }}>{`>`}</span>
                <input
                  type="email"
                  placeholder="admin@local.host"
                  className="w-full bg-transparent outline-none font-mono text-sm py-4"
                  style={{ color: TOKENS.textHigh, fontFamily: 'var(--font-jetbrains)' }}
                />
              </div>
              <button className="px-8 py-4 font-bold uppercase text-sm border-l hover:bg-opacity-80 transition-colors"
                      style={{ backgroundColor: TOKENS.accent1, color: 'black', borderColor: TOKENS.border }}>
                Execute
              </button>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t py-12 px-6 md:px-12 mt-20 bg-black relative z-10" style={{ borderColor: TOKENS.border }}>
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 font-mono text-xs" style={{ fontFamily: 'var(--font-jetbrains)' }}>
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Eye size={16} color={TOKENS.accent1} />
              <span className="font-bold uppercase text-sm" style={{ fontFamily: 'var(--font-syne)', color: TOKENS.textHigh }}>ReptileRoom</span>
            </div>
            <p className="max-w-xs leading-relaxed" style={{ color: TOKENS.textLow }}>
              Precision environmental control software for serious herpetologists and breeders.
            </p>
          </div>

          <div>
            <div className="font-bold mb-4 uppercase" style={{ color: TOKENS.textHigh }}>System</div>
            <ul className="space-y-2" style={{ color: TOKENS.textLow }}>
              <li><a href="#" className="hover:text-white transition-colors">Architecture</a></li>
              <li><a href="#" className="hover:text-white transition-colors">API Docs</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Hardware Sync</a></li>
            </ul>
          </div>

          <div>
            <div className="font-bold mb-4 uppercase" style={{ color: TOKENS.textHigh }}>Terminal</div>
            <ul className="space-y-2" style={{ color: TOKENS.textLow }}>
              <li><a href="#" className="hover:text-white transition-colors">Logs</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Support Protocol</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t flex justify-between font-mono text-xs" style={{ borderColor: TOKENS.border, color: TOKENS.textLow, fontFamily: 'var(--font-jetbrains)' }}>
          <div>SYS_VER: 3.0.4 // © 2024</div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">[GH]</a>
            <a href="#" className="hover:text-white transition-colors">[TW]</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
