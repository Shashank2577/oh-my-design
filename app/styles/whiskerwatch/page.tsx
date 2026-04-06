'use client'

import { motion, useReducedMotion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import {
  Eye, Video, Calendar, Heart, MessageCircle, Star, Shield, Lock
} from 'lucide-react'

const primaryFont = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-primary',
  display: 'swap',
  weight: ['400', '600', '700'],
  style: ['normal', 'italic']
})

const secondaryFont = Inter({
  subsets: ['latin'],
  variable: '--font-secondary',
  display: 'swap',
})

const tokens = {
  background: '#1C1917', // Stone Dust
  surface: '#292524',    // Soft Charcoal
  accent1: '#FDE047',    // Cat-Eye Gold
  accent2: '#F472B6',    // Paw-Pad Pink
  border: 'rgba(253, 224, 71, 0.2)',
  textHigh: '#FAFAF9',
  textLow: '#A8A29E',
}

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-5% 0px' })
  const shouldReduce = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      initial={shouldReduce ? false : { opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.2, delay, ease: [0.2, 0.8, 0.2, 1] }} // Slower, stealthy ease
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
        visible: { transition: { staggerChildren: 0.2 } }, // Slower stagger
      }}
    >
      {children}
    </motion.div>
  )
}

const staggerItem: import('framer-motion').Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.2, 0.8, 0.2, 1] } },
}

const PRODUCT_NAME = 'WhiskerWatch'
const TAGLINE = 'A Quiet Presence When You\'re Away.'
const DESCRIPTION = 'Premium, unobtrusive in-home care for the discerning feline. We respect their space, provide detailed updates, and offer peace of mind.'

const NAV_LINKS = ['Services', 'Caregivers', 'Live Feed', 'Contact']

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-700"
      style={{
        backgroundColor: isScrolled ? `${tokens.background}F2` : 'transparent',
        backdropFilter: isScrolled ? 'blur(10px)' : 'none',
        borderBottom: isScrolled ? `1px solid ${tokens.border}` : '1px solid transparent',
        paddingTop: isScrolled ? '0' : '1.5rem'
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <span className="font-primary italic font-semibold text-2xl flex items-center gap-3 tracking-wide" style={{ color: tokens.textHigh }}>
          <Eye className="w-6 h-6" style={{ color: tokens.accent1 }} />
          {PRODUCT_NAME}
        </span>
        <div className="hidden md:flex items-center gap-10 font-secondary text-sm tracking-widest uppercase">
          {NAV_LINKS.map(link => (
            <motion.a
              key={link}
              href={`#${link.toLowerCase().replace(' ', '-')}`}
              className="transition-colors relative overflow-hidden group py-2"
              style={{ color: tokens.textLow }}
              whileHover={{ color: tokens.textHigh }}
            >
              {link}
              <motion.span
                className="absolute bottom-0 left-0 w-full h-[1px] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"
                style={{ backgroundColor: tokens.accent1 }}
              />
            </motion.a>
          ))}
        </div>
        <motion.button
          whileHover={{ backgroundColor: 'rgba(253, 224, 71, 0.1)', borderColor: tokens.accent1 }}
          className="px-6 py-2 border font-secondary text-sm uppercase tracking-widest transition-all duration-500"
          style={{ borderColor: tokens.border, color: tokens.textHigh }}
        >
          Inquire
        </motion.button>
      </div>
    </motion.nav>
  )
}

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ backgroundColor: tokens.background }}>
      {/* Soft Focus Background Elements */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <motion.div
          className="w-[800px] h-[800px] rounded-full blur-[100px] opacity-20"
          style={{ backgroundColor: tokens.accent1 }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ filter: "blur(20px)", opacity: 0 }}
          animate={{ filter: "blur(0px)", opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="mb-8"
        >
          <Eye className="w-12 h-12 mx-auto mb-8" style={{ color: tokens.accent1 }} strokeWidth={1} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
          className="font-primary text-5xl md:text-7xl lg:text-8xl mb-8 leading-tight tracking-wide"
          style={{ color: tokens.textHigh }}
        >
          {TAGLINE}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1 }}
          className="font-secondary text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed tracking-wide font-light"
          style={{ color: tokens.textLow }}
        >
          {DESCRIPTION}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.5 }}
        >
          <motion.button
            whileHover={{
              background: `linear-gradient(45deg, transparent, ${tokens.accent1}10)`,
              borderColor: tokens.accent1
            }}
            className="px-10 py-4 border font-secondary uppercase tracking-[0.2em] text-sm transition-all duration-700 relative overflow-hidden group"
            style={{ borderColor: tokens.border, color: tokens.textHigh }}
          >
            <span className="relative z-10">Schedule a Consultation</span>
          </motion.button>
        </motion.div>
      </div>

      {/* The "Cat-Eye" Blink Effect on load */}
      <motion.div
        className="fixed inset-0 bg-black z-50 pointer-events-none"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 1.5, ease: "circIn", delay: 0.2 }}
        style={{ originY: 0.5 }}
      />
    </section>
  )
}

function LiveCam() {
  const [activeEvent, setActiveEvent] = useState<number | null>(null)

  const events = [
    { time: '10:00 AM', label: 'Breakfast', icon: Heart, x: '20%' },
    { time: '1:30 PM', label: 'Deep Sleep', icon: Star, x: '50%' },
    { time: '4:15 PM', label: 'Playtime', icon: Eye, x: '80%' },
  ]

  return (
    <section id="live-feed" className="py-32" style={{ backgroundColor: tokens.surface }}>
      <div className="max-w-6xl mx-auto px-6">
        <FadeUp>
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="font-primary text-4xl md:text-5xl mb-4 italic" style={{ color: tokens.textHigh }}>Observant, Never Intrusive.</h2>
              <p className="font-secondary text-lg tracking-wide font-light max-w-lg" style={{ color: tokens.textLow }}>
                Optional secure video check-ins and an intelligent activity timeline keep you connected to their world.
              </p>
            </div>
            <div className="flex items-center gap-2 font-secondary text-sm uppercase tracking-widest mt-6 md:mt-0" style={{ color: tokens.accent1 }}>
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: tokens.accent1 }} />
              Live Connection
            </div>
          </div>
        </FadeUp>

        <div className="relative">
          {/* Video Container (Aperture Wipe entrance) */}
          <motion.div
            initial={{ clipPath: "circle(0% at 50% 50%)" }}
            whileInView={{ clipPath: "circle(100% at 50% 50%)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="w-full aspect-video bg-black relative border overflow-hidden"
            style={{ borderColor: tokens.border }}
          >
            {/* Simulated grainy video feed */}
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />

            {/* Night vision toggle hint */}
            <div className="absolute top-6 left-6 font-secondary text-xs uppercase tracking-widest flex items-center gap-2" style={{ color: tokens.textLow }}>
              <Video className="w-4 h-4" /> Cam 01 - Living Room
            </div>
          </motion.div>

          {/* Timeline */}
          <div className="mt-8 relative h-16">
            <div className="absolute top-1/2 left-0 right-0 h-px -translate-y-1/2" style={{ backgroundColor: tokens.border }} />

            {events.map((event, i) => (
              <div
                key={i}
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center group cursor-pointer"
                style={{ left: event.x }}
                onMouseEnter={() => setActiveEvent(i)}
                onMouseLeave={() => setActiveEvent(null)}
              >
                <div
                  className="w-3 h-3 rounded-full transition-all duration-300 relative z-10"
                  style={{
                    backgroundColor: activeEvent === i ? tokens.accent1 : tokens.surface,
                    border: `1px solid ${tokens.accent1}`,
                    boxShadow: activeEvent === i ? `0 0 10px ${tokens.accent1}` : 'none'
                  }}
                />

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: activeEvent === i ? 1 : 0, y: activeEvent === i ? 0 : 10 }}
                  className="absolute top-6 whitespace-nowrap text-center pointer-events-none"
                >
                  <p className="font-secondary text-xs font-bold tracking-widest uppercase mb-1" style={{ color: tokens.textHigh }}>{event.label}</p>
                  <p className="font-secondary text-xs tracking-wide" style={{ color: tokens.textLow }}>{event.time}</p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Services() {
  const services = [
    { title: 'In-Home Visits', desc: 'Detailed 45-minute visits focusing on feeding, litter maintenance, and engaging play or quiet companionship, depending on their mood.' },
    { title: 'Overnight Stays', desc: 'For cats who prefer a human presence through the night. Includes evening and morning routines seamlessly integrated.' },
    { title: 'Medical Admin', desc: 'Experienced in administering oral medications, injections, and subcutaneous fluids with minimal stress.' }
  ]

  return (
    <section id="services" className="py-32" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-6xl mx-auto px-6">
        <StaggerContainer>
          <div className="grid md:grid-cols-3 gap-12">
            {services.map((s, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                className="group border-l p-8 transition-colors duration-700"
                style={{ borderColor: tokens.border }}
                whileHover={{ backgroundColor: tokens.surface }}
              >
                <h3 className="font-primary text-3xl mb-6 italic" style={{ color: tokens.textHigh }}>{s.title}</h3>
                <p className="font-secondary text-sm leading-relaxed tracking-wide font-light" style={{ color: tokens.textLow }}>
                  {s.desc}
                </p>
                <div className="mt-8 flex items-center gap-2 font-secondary text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ color: tokens.accent1 }}>
                  Learn More <span className="text-lg leading-none">→</span>
                </div>
              </motion.div>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  )
}

function Trust() {
  return (
    <section className="py-32 border-y" style={{ backgroundColor: tokens.surface, borderColor: tokens.border }}>
      <div className="max-w-4xl mx-auto px-6 text-center">
        <FadeUp>
          <Shield className="w-12 h-12 mx-auto mb-8" style={{ color: tokens.accent1 }} strokeWidth={1} />
          <h2 className="font-primary text-4xl md:text-5xl mb-8 leading-snug" style={{ color: tokens.textHigh }}>
            "Discretion is our watchword. Security is our foundation."
          </h2>
          <p className="font-secondary text-lg max-w-2xl mx-auto tracking-wide font-light leading-relaxed" style={{ color: tokens.textLow }}>
            Every caregiver is thoroughly vetted, insured, and trained in feline behavior. We treat your home and your privacy with the utmost respect.
          </p>
        </FadeUp>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="py-20" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
        <div>
          <span className="font-primary italic font-semibold text-2xl flex items-center gap-3 tracking-wide mb-4" style={{ color: tokens.textHigh }}>
            <Eye className="w-6 h-6" style={{ color: tokens.accent1 }} />
            {PRODUCT_NAME}
          </span>
          <p className="font-secondary text-sm tracking-wide font-light" style={{ color: tokens.textLow }}>
            Serving discerning felines since 2024.
          </p>
        </div>

        <div className="flex gap-12 font-secondary text-xs uppercase tracking-widest" style={{ color: tokens.textLow }}>
          <div className="flex flex-col gap-4">
            <a href="#" className="hover:text-white transition-colors duration-300">About</a>
            <a href="#" className="hover:text-white transition-colors duration-300">Services</a>
            <a href="#" className="hover:text-white transition-colors duration-300">Rates</a>
          </div>
          <div className="flex flex-col gap-4">
            <a href="#" className="hover:text-white transition-colors duration-300">Privacy</a>
            <a href="#" className="hover:text-white transition-colors duration-300">Terms</a>
            <a href="#" className="hover:text-white transition-colors duration-300">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function WhiskerWatchPage() {
  // Shadow Follower logic
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className={`${primaryFont.variable} ${secondaryFont.variable} font-primary selection:bg-yellow-900 selection:text-white min-h-screen`} style={{ backgroundColor: tokens.background }}>
      {/* Shadow Follower */}
      <motion.div
        className="fixed w-64 h-64 rounded-full pointer-events-none z-0 mix-blend-screen blur-[80px]"
        style={{ backgroundColor: `${tokens.accent1}05` }}
        animate={{ x: mousePos.x - 128, y: mousePos.y - 128 }}
        transition={{ type: "spring", stiffness: 30, damping: 20, mass: 2 }} // Delayed, stalker movement
      />

      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <Services />
          <LiveCam />
          <Trust />
        </main>
        <Footer />
      </div>
    </div>
  )
}