'use client'

import { motion, useReducedMotion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import { Playfair_Display, Lato } from 'next/font/google'
import {
  Star, ChevronDown, ArrowRight, Check, MapPin, Wind, Flag,
  Clock, Sun, Droplet
} from 'lucide-react'

// ─────────────────────────────────────────────
// FONTS
// ─────────────────────────────────────────────
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const lato = Lato({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
  variable: '--font-lato',
  display: 'swap',
})

// ─────────────────────────────────────────────
// DESIGN TOKENS
// ─────────────────────────────────────────────
const tokens = {
  background: '#F4F7F4', // Early Morning Mist
  surface: '#FFFFFF', // Clubhouse White
  accent1: '#1B5E20', // Fairway Green
  accent2: '#D4AF37', // Trophy Gold
  border: '#E0E0E0',
  textHigh: '#2E3B2E',
  textLow: '#7B8C7B',
}

// ─────────────────────────────────────────────
// MOTION HELPERS
// ─────────────────────────────────────────────
function SoftFade({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-5% 0px' })
  const shouldReduce = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      initial={shouldReduce ? false : { opacity: 0, filter: 'blur(10px)' }}
      animate={isInView ? { opacity: 1, filter: 'blur(0px)' } : {}}
      transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function WindDrift({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const shouldReduce = useReducedMotion()
  return (
    <motion.div
      animate={shouldReduce ? {} : { x: [0, 10, 0] }}
      transition={{ repeat: Infinity, duration: 5, ease: [0.42, 0, 0.58, 1] as [number, number, number, number], delay }}
    >
      {children}
    </motion.div>
  )
}

function StaggerContainer({ children, className = '' }: { children: React.ReactNode; className?: string }) {
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
        visible: { transition: { staggerChildren: 0.15 } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const staggerItem: import('framer-motion').Variants = {
  hidden: { opacity: 0, filter: 'blur(10px)' },
  visible: { opacity: 1, filter: 'blur(0px)', transition: { duration: 1, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] } },
}

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────
const PRODUCT_NAME = 'Golfer\'s Edge'
const TAGLINE = 'Master the Wind, Own the Course.'
const DESCRIPTION = 'Precision data and serene analytics for the dedicated golfer. Experience your game through the lens of luxury and technology.'

const NAV_LINKS = ['Features', 'Pricing', 'Testimonials', 'FAQ']

const STATS = [
  { value: '18+', label: 'Courses Mapped' },
  { value: '1.2m', label: 'Swings Analyzed' },
  { value: '0.1mph', label: 'Wind Precision' },
  { value: '4.9', label: 'App Store Rating' },
]

const FEATURES = [
  { icon: Wind, title: 'Wind-Vector Mapping', description: 'Real-time wind speed and direction overlaid on high-resolution course maps.' },
  { icon: MapPin, title: 'Pin-Point Accuracy', description: 'GPS distances with elevation adjustments to the exact pin location.' },
  { icon: Sun, title: 'Solar Glare Prediction', description: 'Know exactly when and where the sun will impact your line of sight.' },
  { icon: Clock, title: 'Pace of Play', description: 'Intelligent tracking to keep you perfectly timed throughout your round.' },
  { icon: Droplet, title: 'Dew & Moisture', description: 'Early morning moisture data affecting green speeds and roll.' },
  { icon: Flag, title: 'Tournament Mode', description: 'USGA compliant mode disabling certain features for competitive play.' },
]

const PRICING = [
  {
    name: 'Weekend',
    price: '$9',
    period: 'per month',
    description: 'For the casual golfer seeking better course management.',
    features: ['Basic GPS', 'Scorecard', 'Wind estimates', 'Email support'],
    cta: 'Start Free Trial',
    highlighted: false,
  },
  {
    name: 'Clubhouse',
    price: '$29',
    period: 'per month',
    description: 'The ultimate tool for the competitive amateur.',
    features: ['Precision Wind-Vectors', 'Elevation adjustments', 'Club recommendations', 'Priority support', 'Swing analysis', 'Advanced stats'],
    cta: 'Join the Club',
    highlighted: true,
  },
  {
    name: 'Pro Tour',
    price: '$99',
    period: 'per month',
    description: 'Designed for touring professionals and their caddies.',
    features: ['Everything in Clubhouse', 'Tournament mode', 'Caddie connect', 'Concierge support', 'Custom course mapping', 'API access'],
    cta: 'Contact Sales',
    highlighted: false,
  },
]

const TESTIMONIALS = [
  {
    name: 'William Harrison',
    role: 'Amateur Champion',
    company: 'Oakmont',
    text: 'Golfer\'s Edge provides a clarity I\'ve never experienced before. It\'s like having a tour caddie in my pocket.',
    rating: 5,
  },
  {
    name: 'Sarah Jenkins',
    role: 'Teaching Professional',
    company: 'Pebble Beach',
    text: 'I recommend this to all my students. The wind-vector mapping alone saves them 2-3 strokes a round.',
    rating: 5,
  },
  {
    name: 'David Rossi',
    role: 'Scratch Golfer',
    company: 'St Andrews',
    text: 'The elegance of the interface combined with the precision of the data makes it an indispensable part of my routine.',
    rating: 5,
  },
]

const FAQ_ITEMS = [
  { q: 'Is Golfer\'s Edge USGA compliant?', a: 'Yes, we offer a dedicated Tournament Mode that disables wind and elevation data to comply with USGA rules during competitive play.' },
  { q: 'How accurate is the wind data?', a: 'Our wind data is sourced from hyper-local weather stations and updated every 5 minutes, providing accuracy within 0.1 mph.' },
  { q: 'Can I use it on my Apple Watch?', a: 'Absolutely. Golfer\'s Edge has a fully featured Apple Watch companion app for quick distances and scorekeeping.' },
  { q: 'Do you cover courses internationally?', a: 'Yes, we have over 18,000 courses mapped globally, with new courses added weekly.' },
  { q: 'What happens if I lose cell service?', a: 'You can download course maps for offline use before your round, ensuring you have GPS data even in remote areas.' },
]

// ─────────────────────────────────────────────
// COMPONENTS
// ─────────────────────────────────────────────

function Navbar() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-opacity-90 backdrop-blur-md border-b"
      style={{ borderColor: tokens.border, backgroundColor: `${tokens.surface}E6` }}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <span className={`font-bold text-2xl tracking-wide ${playfair.className}`} style={{ color: tokens.textHigh }}>
          {PRODUCT_NAME}
        </span>
        <div className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-sm tracking-wide transition-colors hover:text-[#1B5E20]"
              style={{ color: tokens.textLow }}
            >
              {link}
            </a>
          ))}
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 h-10 rounded-full text-sm tracking-wider transition-all"
          style={{ backgroundColor: tokens.surface, color: tokens.textHigh, border: `1px solid ${tokens.accent2}` }}
        >
          MEMBER LOGIN
        </motion.button>
      </div>
    </nav>
  )
}

function Hero() {
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 500], [0, 100])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  return (
    <section className="relative min-h-dvh flex items-center justify-center overflow-hidden pt-20" style={{ backgroundColor: tokens.background }}>
      {/* Background Element representing Wind/Mist */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background: `radial-gradient(circle at 70% 30%, ${tokens.surface} 0%, transparent 50%)`,
          y: y1
        }}
      />

      <div className="max-w-5xl mx-auto px-6 py-24 w-full relative z-10 text-center">
        <motion.div style={{ opacity }}>
          <SoftFade delay={0.2}>
            <p className="text-sm uppercase tracking-[0.3em] mb-6" style={{ color: tokens.accent1 }}>
              Elevate Your Game
            </p>
          </SoftFade>

          <SoftFade delay={0.4}>
            <h1 className={`text-6xl md:text-8xl font-normal leading-tight mb-8 ${playfair.className}`} style={{ color: tokens.textHigh }}>
              {TAGLINE}
            </h1>
          </SoftFade>

          <SoftFade delay={0.6}>
            <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed font-light" style={{ color: tokens.textLow }}>
              {DESCRIPTION}
            </p>
          </SoftFade>

          <SoftFade delay={0.8}>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <motion.button
                whileHover={{ scale: 1.02, backgroundColor: tokens.accent2, color: tokens.surface }}
                whileTap={{ scale: 0.98 }}
                className="h-14 px-10 rounded-full text-sm uppercase tracking-widest transition-colors duration-300"
                style={{ backgroundColor: tokens.accent1, color: tokens.surface }}
              >
                Join the Club
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="h-14 px-10 rounded-full text-sm uppercase tracking-widest bg-transparent transition-colors duration-300"
                style={{ color: tokens.textHigh, border: `1px solid ${tokens.border}` }}
              >
                View Course Map
              </motion.button>
            </div>
          </SoftFade>
        </motion.div>
      </div>
    </section>
  )
}

function Stats() {
  return (
    <section className="py-20" style={{ backgroundColor: tokens.surface, borderTop: `1px solid ${tokens.border}`, borderBottom: `1px solid ${tokens.border}` }}>
      <div className="max-w-6xl mx-auto px-6">
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {STATS.map((stat, i) => (
            <motion.div key={stat.label} variants={staggerItem} className="text-center">
              <WindDrift delay={i * 0.5}>
                <p className={`text-5xl font-light mb-3 ${playfair.className}`} style={{ color: tokens.accent2 }}>{stat.value}</p>
              </WindDrift>
              <p className="text-sm uppercase tracking-widest" style={{ color: tokens.textLow }}>{stat.label}</p>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

function Features() {
  return (
    <section id="features" className="py-32" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-6xl mx-auto px-6">
        <SoftFade>
          <div className="text-center mb-20">
            <h2 className={`text-5xl md:text-6xl mb-6 ${playfair.className}`} style={{ color: tokens.textHigh }}>
              Precision in Every Detail
            </h2>
            <div className="w-24 h-px mx-auto mb-6" style={{ backgroundColor: tokens.accent2 }} />
            <p className="text-xl max-w-2xl mx-auto font-light" style={{ color: tokens.textLow }}>
              Advanced analytics presented with unparalleled clarity.
            </p>
          </div>
        </SoftFade>
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-16">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              variants={staggerItem}
              className="text-center group"
            >
              <div className="flex justify-center mb-6">
                <WindDrift delay={i * 0.2}>
                  <div className="p-4 rounded-full transition-colors duration-500" style={{ backgroundColor: tokens.surface, border: `1px solid ${tokens.border}` }}>
                    <feature.icon className="h-6 w-6" style={{ color: tokens.accent1 }} strokeWidth={1} />
                  </div>
                </WindDrift>
              </div>
              <h3 className={`text-2xl mb-4 ${playfair.className}`} style={{ color: tokens.textHigh }}>{feature.title}</h3>
              <p className="text-base font-light leading-relaxed" style={{ color: tokens.textLow }}>{feature.description}</p>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

function ProductDetail() {
  const { scrollYProgress } = useScroll()
  const horizonY = useTransform(scrollYProgress, [0, 1], [0, 100])

  return (
    <section className="py-32 relative overflow-hidden" style={{ backgroundColor: tokens.surface, borderBottom: `1px solid ${tokens.border}` }}>
      {/* Horizon Line Scroll Effect */}
      <motion.div
        className="absolute left-0 right-0 h-px w-full"
        style={{ backgroundColor: tokens.accent2, opacity: 0.3, y: horizonY }}
      />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <SoftFade>
          <div className="text-center">
            <h2 className={`text-4xl md:text-6xl mb-10 ${playfair.className}`} style={{ color: tokens.textHigh }}>
              The Quiet Before the Swing
            </h2>
            <div className="space-y-8 text-center max-w-3xl mx-auto">
              <p className="text-xl font-light leading-loose" style={{ color: tokens.textLow }}>
                Golfer's Edge is designed to disappear until you need it. The interface mimics the serenity of a dew-swept fairway at dawn, providing deep, tactical insights without visual noise.
              </p>
              <p className="text-xl font-light leading-loose" style={{ color: tokens.textLow }}>
                Our proprietary wind-vector technology doesn't just show wind speed; it visualizes the exact drift path of your ball based on local topography and live meteorological data.
              </p>
            </div>
          </div>
        </SoftFade>
      </div>
    </section>
  )
}

function Pricing() {
  return (
    <section id="pricing" className="py-32" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-6xl mx-auto px-6">
        <SoftFade>
          <div className="text-center mb-20">
            <h2 className={`text-5xl md:text-6xl mb-6 ${playfair.className}`} style={{ color: tokens.textHigh }}>Membership Tiers</h2>
            <div className="w-24 h-px mx-auto mb-6" style={{ backgroundColor: tokens.accent2 }} />
          </div>
        </SoftFade>
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PRICING.map(tier => (
            <motion.div
              key={tier.name}
              variants={staggerItem}
              className="p-10 flex flex-col items-center text-center transition-all duration-500 group"
              style={{
                backgroundColor: tokens.surface,
                border: `1px solid ${tier.highlighted ? tokens.accent2 : tokens.border}`,
                boxShadow: tier.highlighted ? `0 20px 40px -10px ${tokens.accent2}20` : 'none',
              }}
            >
              <h3 className={`text-2xl mb-2 ${playfair.className}`} style={{ color: tokens.textHigh }}>{tier.name}</h3>
              <p className="text-sm font-light mb-8 h-10" style={{ color: tokens.textLow }}>{tier.description}</p>

              <div className="flex items-baseline gap-1 mb-8">
                <span className={`text-5xl font-light ${playfair.className}`} style={{ color: tokens.accent1 }}>{tier.price}</span>
                <span className="text-sm uppercase tracking-widest" style={{ color: tokens.textLow }}>/mo</span>
              </div>

              <div className="w-full h-px mb-8" style={{ backgroundColor: tokens.border }} />

              <ul className="space-y-4 mb-10 flex-1">
                {tier.features.map(f => (
                  <li key={f} className="text-sm font-light" style={{ color: tokens.textHigh }}>
                    {f}
                  </li>
                ))}
              </ul>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full h-12 rounded-full text-sm uppercase tracking-widest transition-colors duration-300"
                style={tier.highlighted
                  ? { backgroundColor: tokens.accent1, color: tokens.surface }
                  : { backgroundColor: 'transparent', color: tokens.textHigh, border: `1px solid ${tokens.accent2}` }
                }
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

function Testimonials() {
  return (
    <section id="testimonials" className="py-32 relative" style={{ backgroundColor: tokens.surface, borderTop: `1px solid ${tokens.border}`, borderBottom: `1px solid ${tokens.border}` }}>
      <div className="max-w-6xl mx-auto px-6">
        <SoftFade>
          <div className="text-center mb-20">
            <h2 className={`text-5xl md:text-6xl mb-6 ${playfair.className}`} style={{ color: tokens.textHigh }}>From the Fairway</h2>
            <div className="w-24 h-px mx-auto" style={{ backgroundColor: tokens.accent2 }} />
          </div>
        </SoftFade>
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {TESTIMONIALS.map(t => (
            <motion.div
              key={t.name}
              variants={staggerItem}
              className="text-center px-4"
            >
              <div className="flex justify-center mb-6">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current mx-1" style={{ color: tokens.accent2 }} />
                ))}
              </div>
              <p className={`text-xl leading-relaxed mb-8 italic ${playfair.className}`} style={{ color: tokens.textHigh }}>"{t.text}"</p>
              <div>
                <p className="text-sm uppercase tracking-widest mb-1" style={{ color: tokens.textHigh }}>{t.name}</p>
                <p className="text-xs font-light tracking-wider" style={{ color: tokens.textLow }}>{t.role} · {t.company}</p>
              </div>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="py-32" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-3xl mx-auto px-6">
        <SoftFade>
          <div className="text-center mb-20">
            <h2 className={`text-5xl md:text-6xl mb-6 ${playfair.className}`} style={{ color: tokens.textHigh }}>Common Inquiries</h2>
            <div className="w-24 h-px mx-auto" style={{ backgroundColor: tokens.accent2 }} />
          </div>
        </SoftFade>
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, i) => (
            <SoftFade key={i} delay={i * 0.1}>
              <div className="border-b" style={{ borderColor: tokens.border }}>
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  aria-expanded={openIndex === i}
                  className="w-full flex items-center justify-between py-6 text-left"
                >
                  <span className={`text-xl ${playfair.className}`} style={{ color: tokens.textHigh }}>{item.q}</span>
                  <motion.span
                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                    transition={{ duration: 0.5, ease: [0.42, 0, 0.58, 1] as [number, number, number, number] }}
                  >
                    <ChevronDown className="h-5 w-5 font-light" style={{ color: tokens.accent2 }} />
                  </motion.span>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openIndex === i ? 'auto' : 0, opacity: openIndex === i ? 1 : 0 }}
                  transition={{ duration: 0.5, ease: [0.42, 0, 0.58, 1] as [number, number, number, number] }}
                  style={{ overflow: 'hidden' }}
                >
                  <p className="pb-8 text-base font-light leading-relaxed" style={{ color: tokens.textLow }}>
                    {item.a}
                  </p>
                </motion.div>
              </div>
            </SoftFade>
          ))}
        </div>
      </div>
    </section>
  )
}

function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setTimeout(() => setStatus('success'), 1500)
  }

  return (
    <section className="py-32" style={{ backgroundColor: tokens.surface, borderTop: `1px solid ${tokens.border}` }}>
      <div className="max-w-xl mx-auto px-6 text-center">
        <SoftFade>
          <h2 className={`text-4xl md:text-5xl mb-6 ${playfair.className}`} style={{ color: tokens.textHigh }}>The First Tee</h2>
          <p className="text-lg font-light mb-12" style={{ color: tokens.textLow }}>
            Join our private mailing list for exclusive course updates, feature releases, and insights from touring professionals.
          </p>
          {status === 'success' ? (
            <motion.p
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className={`text-xl italic ${playfair.className}`} style={{ color: tokens.accent1 }}
            >
              Welcome to the club.
            </motion.p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <label htmlFor="newsletter-email" className="sr-only">Email address</label>
              <input
                id="newsletter-email"
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="h-14 bg-transparent border-b text-center text-lg transition-colors focus:outline-none"
                style={{
                  borderColor: tokens.border,
                  color: tokens.textHigh,
                  fontFamily: 'var(--font-lato)'
                }}
              />
              <motion.button
                type="submit"
                disabled={status === 'loading'}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="h-14 rounded-full text-sm uppercase tracking-widest transition-colors duration-300"
                style={{ backgroundColor: tokens.accent1, color: tokens.surface }}
              >
                {status === 'loading' ? 'Requesting...' : 'Request Access'}
              </motion.button>
            </form>
          )}
        </SoftFade>
      </div>
    </section>
  )
}

function Footer() {
  const links = {
    Platform: ['Course Map', 'Wind Technology', 'Swing Analytics', 'Pricing'],
    Company: ['Our Story', 'Careers', 'Press', 'Contact'],
    Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy'],
  }

  return (
    <footer className="py-20" style={{ backgroundColor: tokens.background, borderTop: `1px solid ${tokens.border}` }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1">
            <p className={`text-2xl mb-4 ${playfair.className}`} style={{ color: tokens.textHigh }}>{PRODUCT_NAME}</p>
            <p className="text-sm font-light leading-relaxed" style={{ color: tokens.textLow }}>
              Master the Wind,<br/>Own the Course.
            </p>
          </div>
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <p className="text-sm uppercase tracking-widest mb-6" style={{ color: tokens.textHigh }}>{group}</p>
              <ul className="space-y-4">
                {items.map(item => (
                  <li key={item}>
                    <a href="#" className="text-sm font-light transition-colors hover:text-[#1B5E20]" style={{ color: tokens.textLow }}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t gap-4" style={{ borderColor: tokens.border }}>
          <p className="text-xs font-light tracking-wider" style={{ color: tokens.textLow }}>
            © {new Date().getFullYear()} {PRODUCT_NAME}. All rights reserved.
          </p>
          <a
            href="/"
            className="text-xs font-light tracking-wider uppercase"
            style={{ color: tokens.textLow }}
          >
            ← Back to Styles
          </a>
        </div>
      </div>
    </footer>
  )
}

// ─────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────
export default function GolfersEdgePage() {
  return (
    <div className={`${lato.variable} ${playfair.variable} font-sans`} style={{ backgroundColor: tokens.background, color: tokens.textHigh }}>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Features />
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
