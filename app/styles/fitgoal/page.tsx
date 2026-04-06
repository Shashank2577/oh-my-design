'use client'

import { motion, useReducedMotion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Oswald, Inter } from 'next/font/google'
import {
  Star, ChevronDown, ArrowRight, Check, Activity, Target, Flame,
  HeartPulse, Dumbbell, Droplets
} from 'lucide-react'

// ─────────────────────────────────────────────
// FONTS
// ─────────────────────────────────────────────
const oswald = Oswald({
  subsets: ['latin'],
  variable: '--font-oswald',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

// ─────────────────────────────────────────────
// DESIGN TOKENS
// ─────────────────────────────────────────────
const tokens = {
  background: '#0F172A', // Deep Midnight
  surface: '#1E293B', // Lactic Slate
  accent1: '#38BDF8', // Oxygen Blue
  accent2: '#F472B6', // Burn Pink
  border: 'rgba(56, 189, 248, 0.2)',
  textHigh: '#F8FAFC',
  textLow: '#94A3B8',
}

// ─────────────────────────────────────────────
// MOTION HELPERS
// ─────────────────────────────────────────────
function BreathingContainer({ children, className = '', style }: { children?: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const shouldReduce = useReducedMotion()
  return (
    <motion.div
      animate={shouldReduce ? {} : { scale: [1, 1.02, 1] }}
      transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} // 15 breaths per minute
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  )
}

function FluidEnter({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' })
  const shouldReduce = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      initial={shouldReduce ? false : { opacity: 0, y: 40, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ type: "spring", stiffness: 100, damping: 20, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function StaggerContainer({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' })
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
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring" as const, stiffness: 120, damping: 20 } },
}

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────
const PRODUCT_NAME = 'FitGoal'
const TAGLINE = 'FEEL THE PUMP. TRUST THE PROCESS.'
const DESCRIPTION = 'An organic, fluid approach to fitness tracking. No rigid boxes, just your progress moving and growing with you.'

const NAV_LINKS = ['Workouts', 'Nutrition', 'Recovery', 'Coaching']

const STATS = [
  { value: '12M', label: 'WORKOUTS LOGGED' },
  { value: '450K', label: 'ACTIVE ATHLETES' },
  { value: '8.4', label: 'AVG WEEKLY HOURS' },
  { value: '96%', label: 'GOAL COMPLETION' },
]

const FEATURES = [
  { icon: Target, title: 'DYNAMIC GOAL SETTING', description: 'Goals that adapt to your daily readiness. If you\'re fully recovered, the app pushes you harder.' },
  { icon: Activity, title: 'MUSCLE FATIGUE MAP', description: 'A 3D silhouette showing exactly which muscle groups need rest and which are ready to work.' },
  { icon: Flame, title: 'METABOLIC BURN', description: 'Real-time estimation of your metabolic rate and caloric expenditure based on your heart rate zones.' },
  { icon: HeartPulse, title: 'RECOVERY INDEX', description: 'Wake up to a simple score that tells you how well your nervous system has recovered overnight.' },
  { icon: Dumbbell, title: 'PROGRESSIVE OVERLOAD', description: 'Smart suggestions for weight and rep increases to ensure you never hit a plateau.' },
  { icon: Droplets, title: 'HYDRATION FLOW', description: 'Log your water intake with a satisfying fluid animation that fills up your daily goal.' },
]

const PRICING = [
  {
    name: 'STARTER',
    price: 'FREE',
    period: 'FOREVER',
    description: 'Get moving with basic tracking and a selection of curated workouts.',
    features: ['Basic Workout Logging', 'Bodyweight Programs', 'Hydration Tracker', 'Community Access'],
    cta: 'START FREE',
    highlighted: false,
  },
  {
    name: 'ATHLETE',
    price: '$14.99',
    period: 'MONTH',
    description: 'Unlock the full potential of your body with advanced analytics and mapping.',
    features: ['Muscle Fatigue Map', 'Recovery Index', 'Smart Overload', 'Nutrition Integration', 'Apple Health Sync'],
    cta: 'BECOME AN ATHLETE',
    highlighted: true,
  },
  {
    name: 'COACH',
    price: '$39.99',
    period: 'MONTH',
    description: 'For personal trainers managing multiple clients and their progress.',
    features: ['Everything in Athlete', 'Client Dashboard', 'Custom Program Builder', 'In-App Messaging', 'Client Analytics'],
    cta: 'GET COACH ACCESS',
    highlighted: false,
  },
]

const TESTIMONIALS = [
  {
    name: 'MARCUS JOHNSON',
    role: 'POWERLIFTER',
    company: 'TEAM IRON',
    text: 'The fatigue map changed everything for me. I stopped overtraining my shoulders and my bench press finally moved.',
    rating: 5,
  },
  {
    name: 'ELENA RODRIGUEZ',
    role: 'CROSSFIT COMPETITOR',
    company: 'ELITE FITNESS',
    text: 'It doesn\'t feel like a spreadsheet. The app feels alive. The way the progress bars fill up is weirdly motivating.',
    rating: 5,
  },
  {
    name: 'DAVID CHEN',
    role: 'CASUAL RUNNER',
    company: 'WEEKEND WARRIORS',
    text: 'I love that it adjusts my goals if I had a bad night of sleep. It feels like it\'s actually working with my body, not against it.',
    rating: 5,
  },
]

const FAQ_ITEMS = [
  { q: 'DOES IT CONNECT TO MY APPLE WATCH OR GARMIN?', a: 'Yes, FitGoal integrates seamlessly with Apple Health, Garmin Connect, and Whoop to pull in your heart rate and sleep data.' },
  { q: 'WHAT IF I MISS A WORKOUT?', a: 'The app dynamically adjusts. It won\'t punish you; it simply recalculates your week to ensure you still hit the optimal stimulus for growth.' },
  { q: 'CAN I CREATE MY OWN ROUTINES?', a: 'Athlete and Coach tier users have full access to our database of 800+ exercises to build custom routines from scratch.' },
  { q: 'HOW DOES THE FATIGUE MAP WORK?', a: 'It uses the volume (sets x reps x weight) of your logged workouts and cross-references it with your sleep and recovery data to estimate local muscle fatigue.' },
]

// ─────────────────────────────────────────────
// COMPONENTS
// ─────────────────────────────────────────────

function Navbar() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{ backgroundColor: `${tokens.background}E6`, backdropFilter: 'blur(10px)', borderBottom: `1px solid ${tokens.border}` }}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <span className="font-bold text-2xl tracking-wide uppercase" style={{ color: tokens.textHigh, fontFamily: 'var(--font-oswald)' }}>
          FIT<span style={{ color: tokens.accent1 }}>GOAL</span>
        </span>
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-sm font-medium tracking-wide uppercase transition-colors"
              style={{ color: tokens.textLow, fontFamily: 'var(--font-inter)' }}
            >
              {link}
            </a>
          ))}
        </div>
        <motion.button
          whileHover={{ scale: 1.05, backgroundColor: tokens.accent1, color: tokens.background }}
          whileTap={{ scale: 0.95, borderRadius: "20px" }}
          className="px-6 h-10 rounded-full text-sm font-bold tracking-wider transition-colors"
          style={{ backgroundColor: 'transparent', color: tokens.accent1, border: `2px solid ${tokens.accent1}`, fontFamily: 'var(--font-oswald)' }}
        >
          START NOW
        </motion.button>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section className="relative min-h-dvh flex items-center pt-20 overflow-hidden" style={{ backgroundColor: tokens.background }}>
      {/* Organic Background Blobs */}
      <BreathingContainer className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full mix-blend-screen filter blur-[100px] opacity-30" style={{ backgroundColor: tokens.accent1 }} />
      <BreathingContainer className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full mix-blend-screen filter blur-[80px] opacity-20" style={{ backgroundColor: tokens.accent2 }} />

      <div className="max-w-6xl mx-auto px-6 py-24 w-full relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <FluidEnter delay={0.1}>
              <p className="text-sm font-bold tracking-[0.2em] mb-4 uppercase" style={{ color: tokens.accent2, fontFamily: 'var(--font-inter)' }}>
                YOUR BODY IS NOT A MACHINE
              </p>
            </FluidEnter>

            <FluidEnter delay={0.2}>
              <h1 className="text-6xl md:text-8xl font-bold leading-tight mb-6 uppercase" style={{ color: tokens.textHigh, fontFamily: 'var(--font-oswald)' }}>
                {TAGLINE}
              </h1>
            </FluidEnter>

            <FluidEnter delay={0.3}>
              <p className="text-lg md:text-xl mb-10 leading-relaxed max-w-xl mx-auto md:mx-0" style={{ color: tokens.textLow, fontFamily: 'var(--font-inter)' }}>
                {DESCRIPTION}
              </p>
            </FluidEnter>

            <FluidEnter delay={0.4}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <motion.button
                  whileHover={{ scale: 1.05, filter: "brightness(1.1)" }}
                  whileTap={{ scale: 0.95, borderRadius: "10px" }} // Squishy click
                  className="h-14 px-8 rounded-2xl font-bold text-lg tracking-wider flex items-center justify-center gap-2"
                  style={{ backgroundColor: tokens.accent1, color: tokens.background, fontFamily: 'var(--font-oswald)' }}
                >
                  GET THE APP <ArrowRight className="h-5 w-5" />
                </motion.button>
              </div>
            </FluidEnter>
          </div>

          <div className="flex-1 w-full max-w-md">
            <FluidEnter delay={0.5}>
              <div className="aspect-[9/16] rounded-[40px] relative overflow-hidden" style={{ backgroundColor: tokens.surface, border: `2px solid ${tokens.border}`, boxShadow: `0 20px 50px -10px ${tokens.accent1}40` }}>
                {/* Mockup UI */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end pb-12">
                  <h3 className="text-3xl font-bold mb-4 uppercase" style={{ color: tokens.textHigh, fontFamily: 'var(--font-oswald)' }}>DAILY READINESS</h3>

                  {/* Fluid Progress Bar Mockup */}
                  <div className="h-40 w-full rounded-3xl relative overflow-hidden mb-4" style={{ backgroundColor: tokens.background }}>
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 rounded-b-3xl"
                      style={{ backgroundColor: tokens.accent1, height: '75%' }}
                      animate={{
                        borderTopLeftRadius: ["100px", "50px", "100px"],
                        borderTopRightRadius: ["50px", "100px", "50px"],
                      }}
                      transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                    >
                      <div className="absolute inset-0 opacity-30" style={{ background: `linear-gradient(to top, transparent, ${tokens.textHigh})` }}></div>
                    </motion.div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-5xl font-bold" style={{ color: tokens.textHigh, fontFamily: 'var(--font-oswald)', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>75%</span>
                    </div>
                  </div>

                  <p className="text-center font-medium" style={{ color: tokens.textLow, fontFamily: 'var(--font-inter)' }}>Ready to push hard today.</p>
                </div>
              </div>
            </FluidEnter>
          </div>
        </div>
      </div>
    </section>
  )
}

function Stats() {
  return (
    <section className="py-16 relative" style={{ backgroundColor: tokens.surface, borderTop: `1px solid ${tokens.border}`, borderBottom: `1px solid ${tokens.border}` }}>
      <div className="max-w-7xl mx-auto px-6">
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map(stat => (
            <motion.div key={stat.label} variants={staggerItem} className="text-center">
              <p className="text-4xl md:text-5xl font-bold mb-2 uppercase" style={{ color: tokens.accent1, fontFamily: 'var(--font-oswald)' }}>{stat.value}</p>
              <p className="text-sm font-bold tracking-wider uppercase" style={{ color: tokens.textLow, fontFamily: 'var(--font-inter)' }}>{stat.label}</p>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

function Features() {
  return (
    <section id="features" className="py-24 relative overflow-hidden" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <FluidEnter>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 uppercase" style={{ color: tokens.textHigh, fontFamily: 'var(--font-oswald)' }}>
              GROW WITH EVERY REP
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: tokens.textLow, fontFamily: 'var(--font-inter)' }}>
              Stop guessing. Let the app analyze your readiness and prescribe the exact dose of stress you need to adapt and grow.
            </p>
          </div>
        </FluidEnter>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              variants={staggerItem}
              whileHover={{ scale: 1.03, backgroundColor: `${tokens.surface}E6` }} // Muscle flex effect
              className="p-8 rounded-[32px] border relative overflow-hidden group transition-colors duration-300"
              style={{ borderColor: tokens.border, backgroundColor: tokens.surface }}
            >
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ backgroundColor: `${tokens.accent1}20` }}>
                <feature.icon className="h-7 w-7" style={{ color: tokens.accent1 }} strokeWidth={2} />
              </div>
              <h3 className="font-bold text-2xl mb-3 uppercase" style={{ color: tokens.textHigh, fontFamily: 'var(--font-oswald)' }}>{feature.title}</h3>
              <p className="text-base leading-relaxed" style={{ color: tokens.textLow, fontFamily: 'var(--font-inter)' }}>{feature.description}</p>

              {/* Soft sheen on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none" style={{ background: `linear-gradient(135deg, transparent, ${tokens.textHigh}, transparent)` }}></div>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

function Pricing() {
  return (
    <section id="pricing" className="py-24" style={{ backgroundColor: tokens.surface, borderTop: `1px solid ${tokens.border}` }}>
      <div className="max-w-7xl mx-auto px-6">
        <FluidEnter>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 uppercase" style={{ color: tokens.textHigh, fontFamily: 'var(--font-oswald)' }}>
              CHOOSE YOUR PATH
            </h2>
            <p className="text-lg" style={{ color: tokens.textLow, fontFamily: 'var(--font-inter)' }}>Cancel anytime. No lock-in contracts.</p>
          </div>
        </FluidEnter>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PRICING.map((tier, index) => (
            <motion.div
              key={tier.name}
              variants={staggerItem}
              className="p-8 rounded-[40px] flex flex-col relative"
              style={{
                borderColor: tier.highlighted ? tokens.accent2 : tokens.border,
                borderWidth: tier.highlighted ? '2px' : '1px',
                borderStyle: 'solid',
                backgroundColor: tokens.background,
                transform: tier.highlighted ? 'scale(1.05)' : 'scale(1)',
                zIndex: tier.highlighted ? 10 : 1
              }}
            >
              {tier.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 text-sm font-bold rounded-full uppercase tracking-wider" style={{ backgroundColor: tokens.accent2, color: tokens.background, fontFamily: 'var(--font-oswald)' }}>
                  Most Popular
                </div>
              )}

              <h3 className="font-bold text-3xl mb-2 uppercase" style={{ color: tier.highlighted ? tokens.accent2 : tokens.accent1, fontFamily: 'var(--font-oswald)' }}>{tier.name}</h3>
              <p className="text-sm mb-6 h-10" style={{ color: tokens.textLow, fontFamily: 'var(--font-inter)' }}>{tier.description}</p>

              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-5xl font-bold" style={{ color: tokens.textHigh, fontFamily: 'var(--font-oswald)' }}>{tier.price}</span>
                <span className="text-sm font-bold uppercase tracking-widest" style={{ color: tokens.textLow, fontFamily: 'var(--font-inter)' }}>/ {tier.period}</span>
              </div>

              <ul className="space-y-4 mb-10 flex-1">
                {tier.features.map(f => (
                  <li key={f} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${tier.highlighted ? tokens.accent2 : tokens.accent1}30` }}>
                      <Check className="h-3 w-3" style={{ color: tier.highlighted ? tokens.accent2 : tokens.accent1 }} strokeWidth={3} />
                    </div>
                    <span className="text-sm font-medium" style={{ color: tokens.textHigh, fontFamily: 'var(--font-inter)' }}>{f}</span>
                  </li>
                ))}
              </ul>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95, borderRadius: "15px" }}
                className="w-full h-14 rounded-2xl font-bold text-lg tracking-wider uppercase transition-colors"
                style={tier.highlighted
                  ? { backgroundColor: tokens.accent2, color: tokens.background, fontFamily: 'var(--font-oswald)' }
                  : { backgroundColor: 'transparent', color: tokens.accent1, border: `2px solid ${tokens.accent1}`, fontFamily: 'var(--font-oswald)' }
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
    <section id="testimonials" className="py-24" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-7xl mx-auto px-6">
        <FluidEnter>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold uppercase" style={{ color: tokens.textHigh, fontFamily: 'var(--font-oswald)' }}>ATHLETE STORIES</h2>
          </div>
        </FluidEnter>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map(t => (
            <motion.div
              key={t.name}
              variants={staggerItem}
              className="p-8 rounded-[32px] border"
              style={{ borderColor: tokens.border, backgroundColor: tokens.surface }}
            >
              <div className="flex mb-6">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" style={{ color: tokens.accent1 }} />
                ))}
              </div>
              <p className="text-lg leading-relaxed mb-8 font-medium italic" style={{ color: tokens.textHigh, fontFamily: 'var(--font-inter)' }}>"{t.text}"</p>
              <div>
                <p className="font-bold text-xl uppercase tracking-wide" style={{ color: tokens.accent2, fontFamily: 'var(--font-oswald)' }}>{t.name}</p>
                <p className="text-xs font-bold tracking-widest uppercase" style={{ color: tokens.textLow, fontFamily: 'var(--font-inter)' }}>{t.role} · {t.company}</p>
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
    <section id="faq" className="py-24" style={{ backgroundColor: tokens.surface, borderTop: `1px solid ${tokens.border}`, borderBottom: `1px solid ${tokens.border}` }}>
      <div className="max-w-3xl mx-auto px-6">
        <FluidEnter>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold uppercase" style={{ color: tokens.textHigh, fontFamily: 'var(--font-oswald)' }}>COMMON QUESTIONS</h2>
          </div>
        </FluidEnter>

        <div className="space-y-4">
          {FAQ_ITEMS.map((item, i) => (
            <FluidEnter key={i} delay={i * 0.1}>
              <div className="rounded-[24px] overflow-hidden" style={{ backgroundColor: tokens.background, border: `1px solid ${tokens.border}` }}>
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-bold text-lg uppercase tracking-wide" style={{ color: tokens.textHigh, fontFamily: 'var(--font-oswald)' }}>{item.q}</span>
                  <motion.div
                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${tokens.accent1}20` }}
                  >
                    <ChevronDown className="h-5 w-5" style={{ color: tokens.accent1 }} strokeWidth={2.5} />
                  </motion.div>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openIndex === i ? 'auto' : 0, opacity: openIndex === i ? 1 : 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  style={{ overflow: 'hidden' }}
                >
                  <p className="px-6 pb-6 text-base leading-relaxed" style={{ color: tokens.textLow, fontFamily: 'var(--font-inter)' }}>
                    {item.a}
                  </p>
                </motion.div>
              </div>
            </FluidEnter>
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
    setTimeout(() => setStatus('success'), 1200)
  }

  return (
    <section className="py-24" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-2xl mx-auto px-6 text-center">
        <FluidEnter>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 uppercase" style={{ color: tokens.textHigh, fontFamily: 'var(--font-oswald)' }}>JOIN THE MOVEMENT</h2>
          <p className="text-lg mb-8" style={{ color: tokens.textLow, fontFamily: 'var(--font-inter)' }}>
            Get early access to new features and weekly science-based training tips.
          </p>
          {status === 'success' ? (
            <motion.p
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-2xl font-bold uppercase" style={{ color: tokens.accent1, fontFamily: 'var(--font-oswald)' }}
            >
              WELCOME TO THE TEAM.
            </motion.p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center">
              <label htmlFor="newsletter-email" className="sr-only">Email address</label>
              <input
                id="newsletter-email"
                type="email"
                required
                placeholder="YOUR@EMAIL.COM"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full sm:w-auto flex-1 h-14 px-6 rounded-full border-2 text-sm font-bold tracking-wider placeholder:text-slate-600 focus:outline-none"
                style={{ borderColor: tokens.border, backgroundColor: tokens.surface, color: tokens.textHigh, fontFamily: 'var(--font-inter)' }}
              />
              <motion.button
                type="submit"
                disabled={status === 'loading'}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="h-14 px-8 rounded-full font-bold text-lg tracking-wider uppercase disabled:opacity-60"
                style={{ backgroundColor: tokens.accent2, color: tokens.background, fontFamily: 'var(--font-oswald)' }}
              >
                {status === 'loading' ? 'JOINING...' : 'SUBSCRIBE'}
              </motion.button>
            </form>
          )}
        </FluidEnter>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="py-16" style={{ backgroundColor: tokens.surface, borderTop: `1px solid ${tokens.border}` }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2 md:col-span-1">
            <span className="font-bold text-3xl tracking-wide uppercase mb-4 block" style={{ color: tokens.textHigh, fontFamily: 'var(--font-oswald)' }}>
              FIT<span style={{ color: tokens.accent1 }}>GOAL</span>
            </span>
            <p className="text-sm" style={{ color: tokens.textLow, fontFamily: 'var(--font-inter)' }}>
              Feel the pump. Trust the process.
            </p>
          </div>
          <div>
            <p className="font-bold text-lg mb-4 uppercase tracking-wide" style={{ color: tokens.textHigh, fontFamily: 'var(--font-oswald)' }}>PRODUCT</p>
            <ul className="space-y-3">
              {['Features', 'Pricing', 'Apple Watch', 'Android'].map(item => (
                <li key={item}>
                  <a href="#" className="text-sm font-medium transition-colors hover:text-white" style={{ color: tokens.textLow, fontFamily: 'var(--font-inter)' }}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-bold text-lg mb-4 uppercase tracking-wide" style={{ color: tokens.textHigh, fontFamily: 'var(--font-oswald)' }}>COMPANY</p>
            <ul className="space-y-3">
              {['About Us', 'Careers', 'Blog', 'Contact'].map(item => (
                <li key={item}>
                  <a href="#" className="text-sm font-medium transition-colors hover:text-white" style={{ color: tokens.textLow, fontFamily: 'var(--font-inter)' }}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-bold text-lg mb-4 uppercase tracking-wide" style={{ color: tokens.textHigh, fontFamily: 'var(--font-oswald)' }}>LEGAL</p>
            <ul className="space-y-3">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(item => (
                <li key={item}>
                  <a href="#" className="text-sm font-medium transition-colors hover:text-white" style={{ color: tokens.textLow, fontFamily: 'var(--font-inter)' }}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t gap-4" style={{ borderColor: tokens.border }}>
          <p className="text-sm font-medium" style={{ color: tokens.textLow, fontFamily: 'var(--font-inter)' }}>
            © {new Date().getFullYear()} {PRODUCT_NAME}. ALL RIGHTS RESERVED.
          </p>
          <a
            href="/"
            className="text-sm font-bold tracking-wider uppercase transition-colors hover:text-white"
            style={{ color: tokens.accent1, fontFamily: 'var(--font-inter)' }}
          >
            ← BACK TO STYLES
          </a>
        </div>
      </div>
    </footer>
  )
}

// ─────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────
export default function FitGoalPage() {
  return (
    <div className={`${oswald.variable} ${inter.variable} font-sans`} style={{ backgroundColor: tokens.background, color: tokens.textHigh }}>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Features />
        <Pricing />
        <Testimonials />
        <FAQ />
        <Newsletter />
      </main>
      <Footer />
    </div>
  )
}
