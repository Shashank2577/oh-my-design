'use client'

import { motion, useReducedMotion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Montserrat, JetBrains_Mono } from 'next/font/google'
import {
  MapPin, Battery, Activity, ShieldAlert,
  Settings, Navigation, SignalHigh, Check
} from 'lucide-react'

const primaryFont = Montserrat({
  subsets: ['latin'],
  variable: '--font-primary',
  display: 'swap',
  weight: ['400', '600', '800']
})

const secondaryFont = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-secondary',
  display: 'swap',
})

const tokens = {
  background: '#111827',
  surface: '#1F2937',
  accent1: '#84CC16',
  accent2: '#FB923C',
  border: 'rgba(132, 204, 22, 0.3)',
  textHigh: '#F9FAFB',
  textLow: '#9CA3AF',
}

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-5% 0px' })
  const shouldReduce = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      initial={shouldReduce ? false : { opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
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

const staggerItem: import('framer-motion').Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

const PRODUCT_NAME = 'Pawsitive Tech'
const TAGLINE = 'EXPLORE SAFELY. TRACK PRECISELY.'
const DESCRIPTION = 'The ultimate GPS and fitness tracker for the adventurous pet. Real-time location, activity monitoring, and safe-zone alerts built for the great outdoors.'

const NAV_LINKS = ['Features', 'App', 'Tech Specs', 'Support']

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300"
      style={{
        backgroundColor: isScrolled ? `${tokens.background}F2` : 'transparent',
        backdropFilter: isScrolled ? 'blur(10px)' : 'none',
        borderBottom: isScrolled ? `1px solid ${tokens.border}` : '1px solid transparent'
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <span className="font-bold text-xl tracking-widest uppercase flex items-center gap-2" style={{ color: tokens.textHigh }}>
          <Navigation className="w-6 h-6" style={{ color: tokens.accent1 }} />
          {PRODUCT_NAME}
        </span>
        <div className="hidden md:flex items-center gap-8 font-secondary text-sm">
          {NAV_LINKS.map(link => (
            <motion.a
              key={link}
              href={`#${link.toLowerCase().replace(' ', '-')}`}
              className="transition-colors"
              style={{ color: tokens.textLow }}
              whileHover={{ color: tokens.accent1 }}
            >
              // {link}
            </motion.a>
          ))}
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-5 py-2 rounded-full border border-opacity-30 text-sm font-semibold transition-colors hover:brightness-110"
          style={{
            backgroundColor: `${tokens.accent1}33`,
            borderColor: tokens.accent1,
            color: tokens.accent1
          }}
        >
          Buy Now
        </motion.button>
      </div>
    </motion.nav>
  )
}

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden" style={{ backgroundColor: tokens.background }}>
      {/* Topographic Background Pattern */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `radial-gradient(circle at center, transparent 0%, ${tokens.background} 70%), url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 10 C 20 20, 40 20, 50 10 C 60 0, 80 0, 90 10 M 10 30 C 30 50, 50 10, 90 30 M 10 50 C 40 30, 60 70, 90 50 M 10 70 C 30 90, 70 50, 90 70 M 10 90 C 20 80, 80 80, 90 90' stroke='white' fill='transparent' stroke-width='0.5'/%3E%3C/svg%3E")`,
        backgroundSize: '100px 100px'
      }} />

      <div className="max-w-7xl mx-auto px-6 py-24 w-full grid lg:grid-cols-2 gap-16 items-center z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.2, delayChildren: 0.1 }}
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 border mb-6 font-secondary text-xs tracking-wider uppercase"
            style={{ borderColor: tokens.border, color: tokens.accent1, backgroundColor: `${tokens.accent1}10` }}
          >
            <SignalHigh className="w-3 h-3 animate-pulse" />
            Global GPS Coverage Active
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 uppercase tracking-tight"
            style={{ color: tokens.textHigh }}
          >
            {TAGLINE}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-lg mb-10 leading-relaxed"
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
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="h-14 px-8 font-bold uppercase tracking-wider flex items-center justify-center gap-2"
              style={{ backgroundColor: tokens.accent1, color: tokens.background }}
            >
              Order Tracker
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: `${tokens.accent2}10` }}
              whileTap={{ scale: 0.95 }}
              className="h-14 px-8 font-bold uppercase tracking-wider border flex items-center justify-center gap-2 transition-colors"
              style={{ borderColor: tokens.accent2, color: tokens.accent2 }}
            >
              Watch Video
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Safe Zone Radar Graphic */}
        <div className="relative h-[500px] flex items-center justify-center hidden lg:flex">
          <motion.div
            className="absolute rounded-full border border-dashed"
            style={{ borderColor: tokens.accent1, width: '400px', height: '400px' }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute rounded-full"
            style={{ backgroundColor: `${tokens.accent1}10`, width: '400px', height: '400px' }}
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.1, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="relative z-10 w-24 h-24 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(132,204,22,0.5)]" style={{ backgroundColor: tokens.surface }}>
            <MapPin className="w-10 h-10" style={{ color: tokens.accent1 }} />
          </div>

          {/* Tracking Point */}
          <motion.div
            className="absolute w-4 h-4 rounded-full shadow-[0_0_15px_rgba(251,146,60,0.8)]"
            style={{ backgroundColor: tokens.accent2 }}
            animate={{
              x: [0, 100, 150, 50, -50, -120, -80, 0],
              y: [0, -50, 80, 150, 100, 20, -60, 0]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          />

          {/* Dashboard overlay */}
          <motion.div
            className="absolute bottom-0 right-0 p-4 border bg-opacity-90 backdrop-blur"
            style={{ backgroundColor: tokens.surface, borderColor: tokens.border }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
          >
            <div className="flex flex-col gap-2 font-secondary text-sm">
              <div className="flex justify-between gap-8"><span style={{ color: tokens.textLow }}>LAT:</span> <span style={{ color: tokens.textHigh }}>45.5230 N</span></div>
              <div className="flex justify-between gap-8"><span style={{ color: tokens.textLow }}>LNG:</span> <span style={{ color: tokens.textHigh }}>122.6764 W</span></div>
              <div className="flex justify-between gap-8"><span style={{ color: tokens.textLow }}>BATT:</span> <span style={{ color: tokens.accent1 }}>87%</span></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function DataReadout() {
  return (
    <section className="py-12 border-y" style={{ backgroundColor: tokens.surface, borderColor: tokens.border }}>
      <div className="max-w-7xl mx-auto px-6">
        <StaggerContainer>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 font-secondary">
            {[
              { value: '3s', label: 'UPDATE FREQUENCY' },
              { value: '14d', label: 'BATTERY LIFE' },
              { value: '100%', label: 'WATERPROOF' },
              { value: '<5m', label: 'ACCURACY' },
            ].map((stat, i) => (
              <motion.div key={i} variants={staggerItem} className="flex flex-col items-center justify-center p-4">
                <p className="text-3xl font-bold mb-2 tracking-tight" style={{ color: tokens.accent1 }}>{stat.value}</p>
                <p className="text-xs tracking-widest uppercase" style={{ color: tokens.textLow }}>{stat.label}</p>
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
    { icon: MapPin, title: 'Live Tracking', desc: 'Follow their every step in real-time with sub-5-meter accuracy using combined GPS & LTE.' },
    { icon: ShieldAlert, title: 'Virtual Fences', desc: 'Set custom safe zones. Get instant alerts on your phone the moment they step out.' },
    { icon: Activity, title: 'Activity Logging', desc: 'Track daily steps, active minutes, and rest time to monitor their overall health and fitness.' },
    { icon: Battery, title: 'Extended Battery', desc: 'Up to 14 days of battery life on a single charge. Power-saving mode activates when resting.' },
  ]

  return (
    <section id="features" className="py-24" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-7xl mx-auto px-6">
        <FadeUp>
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 uppercase" style={{ color: tokens.textHigh }}>Built for the Wild</h2>
            <p className="text-lg max-w-2xl font-secondary" style={{ color: tokens.textLow }}>Rugged technology for the most demanding environments.</p>
          </div>
        </FadeUp>
        <StaggerContainer>
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                whileHover={{ scale: 1.02 }}
                className="p-8 border bg-opacity-50 relative overflow-hidden group"
                style={{ backgroundColor: tokens.surface, borderColor: tokens.border }}
              >
                {/* Background texture */}
                <div className="absolute -right-10 -top-10 opacity-5 group-hover:opacity-10 transition-opacity">
                  <f.icon className="w-48 h-48" style={{ color: tokens.accent1 }} />
                </div>

                <div className="w-14 h-14 border flex items-center justify-center mb-6" style={{ borderColor: tokens.border, backgroundColor: tokens.background }}>
                  <f.icon className="w-6 h-6" style={{ color: tokens.accent1 }} />
                </div>
                <h3 className="text-2xl font-bold mb-3 uppercase" style={{ color: tokens.textHigh }}>{f.title}</h3>
                <p className="leading-relaxed" style={{ color: tokens.textLow }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  )
}

function SafeZonePulse() {
  return (
    <section className="py-24 overflow-hidden relative" style={{ backgroundColor: tokens.surface }}>
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
        <div className="flex-1">
          <FadeUp>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 uppercase" style={{ color: tokens.textHigh }}>Safe Zone Alerts</h2>
            <p className="text-lg mb-8 leading-relaxed" style={{ color: tokens.textLow }}>
              Draw custom boundaries around your yard, park, or campsite. The moment your pet crosses the line, your phone lights up.
            </p>
            <ul className="space-y-4 mb-8 font-secondary text-sm">
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5" style={{ color: tokens.accent1 }} />
                <span style={{ color: tokens.textHigh }}>Instant push notifications</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5" style={{ color: tokens.accent1 }} />
                <span style={{ color: tokens.textHigh }}>Multiple zone support</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5" style={{ color: tokens.accent1 }} />
                <span style={{ color: tokens.textHigh }}>Share alerts with family</span>
              </li>
            </ul>
          </FadeUp>
        </div>

        <div className="flex-1 relative h-[400px] w-full flex items-center justify-center border" style={{ borderColor: tokens.border, backgroundColor: tokens.background }}>
          {/* Interactive Safe Zone Demo */}
          <div className="relative w-64 h-64 border-2 border-dashed rounded-full flex items-center justify-center" style={{ borderColor: tokens.accent1 }}>
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ backgroundColor: tokens.accent1 }}
              animate={{ opacity: [0.1, 0.2, 0.1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />

            {/* The Pet */}
            <motion.div
              className="absolute w-4 h-4 rounded-full shadow-[0_0_15px_rgba(251,146,60,1)] z-10"
              style={{ backgroundColor: tokens.accent2 }}
              animate={{
                x: [0, 80, 140, 80, 0], // Leaves zone at 140
              }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Alert State */}
            <motion.div
              className="absolute inset-0 rounded-full border-4 pointer-events-none"
              style={{ borderColor: tokens.accent2 }}
              animate={{
                opacity: [0, 0, 1, 0, 0],
                scale: [1, 1, 1.1, 1.2, 1]
              }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', times: [0, 0.4, 0.5, 0.6, 1] }}
            />
          </div>

          <div className="absolute top-4 left-4 font-secondary text-xs uppercase tracking-widest" style={{ color: tokens.textLow }}>
            Simulation Active
          </div>
        </div>
      </div>
    </section>
  )
}

function TechSpecs() {
  const specs = [
    { label: 'Weight', value: '28g (1 oz)' },
    { label: 'Dimensions', value: '45 x 30 x 15 mm' },
    { label: 'Network', value: 'LTE-M / NB-IoT / GSM' },
    { label: 'GPS', value: 'GPS, GLONASS, Galileo' },
    { label: 'Waterproof Rating', value: 'IP68 (Immersion up to 1m)' },
    { label: 'Attachment', value: 'Fits collars up to 1.5" wide' },
  ]

  return (
    <section id="tech-specs" className="py-24" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-4xl mx-auto px-6">
        <FadeUp>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-12 text-center uppercase" style={{ color: tokens.textHigh }}>Tech Specs</h2>
        </FadeUp>
        <div className="border" style={{ borderColor: tokens.border }}>
          {specs.map((spec, i) => (
            <div key={i} className="flex flex-col sm:flex-row border-b last:border-0 p-6" style={{ borderColor: tokens.border }}>
              <div className="sm:w-1/3 font-bold uppercase tracking-wider mb-2 sm:mb-0" style={{ color: tokens.textHigh }}>{spec.label}</div>
              <div className="sm:w-2/3 font-secondary" style={{ color: tokens.textLow }}>{spec.value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Pricing() {
  return (
    <section className="py-24 border-y relative overflow-hidden" style={{ backgroundColor: tokens.surface, borderColor: tokens.border }}>
      <div className="max-w-6xl mx-auto px-6 relative z-10 flex flex-col md:flex-row gap-12 items-center">
        <div className="flex-1">
          <FadeUp>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 uppercase" style={{ color: tokens.textHigh }}>Gear Up</h2>
            <p className="text-lg mb-8 font-secondary" style={{ color: tokens.textLow }}>Choose your hardware, then select a subscription plan in the app for GPS data.</p>
          </FadeUp>
        </div>

        <div className="flex-1 w-full max-w-md">
          <FadeUp delay={0.2}>
            <div className="border p-8 bg-opacity-90 backdrop-blur relative overflow-hidden" style={{ borderColor: tokens.accent1, backgroundColor: tokens.background }}>
              {/* Scanline overlay */}
              <motion.div
                className="absolute inset-0 w-full h-[2px] opacity-20 pointer-events-none"
                style={{ backgroundColor: tokens.accent1 }}
                animate={{ y: [0, 400, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              />

              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold uppercase" style={{ color: tokens.textHigh }}>Tracker Pro</h3>
                  <p className="font-secondary text-sm" style={{ color: tokens.accent1 }}>IN STOCK</p>
                </div>
                <div className="text-4xl font-bold" style={{ color: tokens.textHigh }}>$49</div>
              </div>

              <ul className="space-y-4 mb-8 font-secondary text-sm">
                <li className="flex items-center gap-3"><Check className="w-4 h-4" style={{ color: tokens.accent1 }} /><span style={{ color: tokens.textLow }}>Tracker Unit</span></li>
                <li className="flex items-center gap-3"><Check className="w-4 h-4" style={{ color: tokens.accent1 }} /><span style={{ color: tokens.textLow }}>Rubber Collar Mount</span></li>
                <li className="flex items-center gap-3"><Check className="w-4 h-4" style={{ color: tokens.accent1 }} /><span style={{ color: tokens.textLow }}>Magnetic Charging Cable</span></li>
              </ul>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full h-14 font-bold uppercase tracking-wider transition-colors hover:bg-opacity-90"
                style={{ backgroundColor: tokens.accent1, color: tokens.background }}
              >
                Add to Cart
              </motion.button>
              <p className="text-center text-xs font-secondary mt-4" style={{ color: tokens.textLow }}>*Subscription required for GPS tracking (starts at $5/mo)</p>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="py-12" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        <div className="md:col-span-2">
          <span className="font-bold text-xl tracking-widest uppercase flex items-center gap-2 mb-4" style={{ color: tokens.textHigh }}>
            <Navigation className="w-6 h-6" style={{ color: tokens.accent1 }} />
            {PRODUCT_NAME}
          </span>
          <p className="font-secondary text-sm max-w-xs" style={{ color: tokens.textLow }}>Engineered for adventure. Built for peace of mind.</p>
        </div>
        <div className="font-secondary text-sm flex flex-col gap-2">
          <h4 className="font-bold uppercase text-white mb-2">Support</h4>
          <a href="#" className="hover:text-white transition-colors" style={{ color: tokens.textLow }}>Help Center</a>
          <a href="#" className="hover:text-white transition-colors" style={{ color: tokens.textLow }}>Coverage Map</a>
          <a href="#" className="hover:text-white transition-colors" style={{ color: tokens.textLow }}>Manuals</a>
        </div>
        <div className="font-secondary text-sm flex flex-col gap-2">
          <h4 className="font-bold uppercase text-white mb-2">Company</h4>
          <a href="#" className="hover:text-white transition-colors" style={{ color: tokens.textLow }}>About</a>
          <a href="#" className="hover:text-white transition-colors" style={{ color: tokens.textLow }}>Blog</a>
          <a href="#" className="hover:text-white transition-colors" style={{ color: tokens.textLow }}>Press</a>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4 font-secondary text-xs" style={{ borderColor: tokens.border, color: tokens.textLow }}>
        <p>© 2026 {PRODUCT_NAME}. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Terms of Service</a>
        </div>
      </div>
    </footer>
  )
}

export default function PawsitiveTechPage() {
  return (
    <div className={`${primaryFont.variable} ${secondaryFont.variable} font-primary selection:bg-lime-500 selection:text-black`}>
      <Navbar />
      <main>
        <Hero />
        <DataReadout />
        <Features />
        <SafeZonePulse />
        <TechSpecs />
        <Pricing />
      </main>
      <Footer />
    </div>
  )
}