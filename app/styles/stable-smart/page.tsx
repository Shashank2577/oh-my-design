'use client'

import { motion, useReducedMotion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Cormorant_Garamond, Tenor_Sans } from 'next/font/google'
import {
  Star, ChevronDown, ArrowRight, Check, Activity, ShieldCheck, Map, Clock, Target,
  ChevronRight, ArrowUpRight
} from 'lucide-react'

const headingsFont = Cormorant_Garamond({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-headings',
  display: 'swap',
})

const bodyFont = Tenor_Sans({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const tokens = {
  background: '#F4F1EA', // Light Saddle
  backgroundAlt: '#FFFFFF',
  foreground: '#2C3333',
  muted: '#DCD7C9',
  mutedForeground: '#A5A58D',
  border: '#DCD7C9',
  accent1: '#4A3728', // Bridle Brown
  accent2: '#2D5A27', // Paddock Green
}

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-5% 0px' })
  const shouldReduce = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={shouldReduce ? false : { opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      // Heavy rhythmic transition (Gallop)
      transition={{ type: "spring", stiffness: 80, damping: 25, mass: 2, delay }}
    >
      {children}
    </motion.div>
  )
}

function StaggerContainer({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-5% 0px' })
  const shouldReduce = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={shouldReduce ? false : 'hidden'}
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.2 } },
      }}
    >
      {children}
    </motion.div>
  )
}

const staggerItem: import('framer-motion').Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 80, damping: 25, mass: 1.5 } },
}

const PRODUCT_NAME = 'StableSmart'
const TAGLINE = 'Equestrian Elegance. Driven by Data.'
const DESCRIPTION = 'The premier performance and health tracking system for elite equine athletes. Understand their rhythm, maximize their power, and ensure their legacy.'

const NAV_LINKS = ['Performance', 'Health', 'Pricing', 'Stable']

const STATS = [
  { value: '10K+', label: 'HORSES TRACKED' },
  { value: '99.8%', label: 'SENSOR ACCURACY' },
  { value: '50M', label: 'STRIDES ANALYZED' },
  { value: '24/7', label: 'VET MONITORING' },
]

const FEATURES = [
  { icon: Activity, title: 'Gait Analysis', description: 'Real-time biomechanical feedback on symmetry, stride length, and suspension to detect subtle lameness before it becomes an injury.' },
  { icon: ShieldCheck, title: 'Health Baseline', description: 'Continuous monitoring of resting heart rate, respiratory rate, and HRV to establish your horse\'s unique baseline.' },
  { icon: Map, title: 'Paddock Tracking', description: 'GPS enabled paddock tracking shows you exactly how much your horse moves when turned out, ensuring adequate active rest.' },
  { icon: Clock, title: 'Recovery Metrics', description: 'Post-workout heart rate recovery analysis to objectively measure fitness gains over the competition season.' },
  { icon: Target, title: 'Jump Analytics', description: 'Measure take-off power, trajectory, and landing impact for showjumpers and eventers to refine their technique.' },
  { icon: ArrowUpRight, title: 'Predictive Insights', description: 'Our AI flags deviations from normal patterns, alerting you and your vet to potential colic or virus symptoms early.' },
]

const PRICING = [
  {
    name: 'The Amateur',
    price: '$89',
    period: 'per month',
    description: 'Essential tracking for the dedicated amateur owner.',
    features: ['1 Horse Profile', 'Basic Gait Analysis', 'Health Baselines', 'Export to Vet'],
    cta: 'Begin Tracking',
    highlighted: false,
  },
  {
    name: 'The Professional',
    price: '$249',
    period: 'per month',
    description: 'Advanced metrics for the competitive stable.',
    features: ['Up to 5 Horses', 'Advanced Jump Analytics', 'Predictive Alerts', 'Paddock GPS', 'Priority Support'],
    cta: 'Upgrade Stable',
    highlighted: true,
  },
  {
    name: 'The Syndicate',
    price: '$899',
    period: 'per month',
    description: 'Comprehensive oversight for breeding and racing operations.',
    features: ['Unlimited Horses', 'Custom Reporting', 'API Access', 'Dedicated Account Manager', 'On-site Hardware Setup'],
    cta: 'Contact Sales',
    highlighted: false,
  },
]

const TESTIMONIALS = [
  {
    name: 'William H.',
    role: 'Grand Prix Showjumper',
    company: 'Wellington, FL',
    text: 'StableSmart identified a slight asymmetry in my mare\'s left hind push-off weeks before she showed any visible signs of lameness. It saved our season.',
    rating: 5,
  },
  {
    name: 'Eleanor D.',
    role: 'Dressage Trainer',
    company: 'Warendorf, GER',
    text: 'The ability to quantify suspension and cadence has transformed how I explain collection to my students. The data is indisputable.',
    rating: 5,
  },
  {
    name: 'James L.',
    role: 'Thoroughbred Breeder',
    company: 'Lexington, KY',
    text: 'The 24/7 health monitoring alerted us to a mild colic episode at 2 AM. By the time we got to the barn, the vet was already on their way.',
    rating: 5,
  },
]

const FAQ_ITEMS = [
  { q: 'Is the sensor uncomfortable for the horse?', a: 'Not at all. The sensor weighs less than 50 grams and attaches seamlessly to the girth or saddle pad. Most horses don\'t even notice it\'s there.' },
  { q: 'How long does the battery last?', a: 'The sensor boasts a 14-day battery life on a single charge with average daily riding (1-2 hours). It fully recharges in under an hour.' },
  { q: 'Does it work for all disciplines?', a: 'Yes. While we have specific analytics for Jumping and Dressage, the core gait, fitness, and health metrics are invaluable for endurance, eventing, racing, and western disciplines.' },
  { q: 'Can my vet access the data?', a: 'Absolutely. You can grant read-only access to your veterinarian, allowing them to view historical data and receive alerts if health baselines deviate.' },
]


function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b bg-white/90 backdrop-blur-md" style={{ borderColor: tokens.border }}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ y: [0, -3, 0, -3, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: [0.42, 0, 0.58, 1] }}
          >
             <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center" style={{ borderColor: tokens.accent1 }}>
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: tokens.accent2 }} />
             </div>
          </motion.div>
          <span className={`font-semibold text-2xl tracking-wide ${headingsFont.variable} font-headings`} style={{ color: tokens.foreground }}>
            {PRODUCT_NAME}
          </span>
        </div>
        <div className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className={`text-sm tracking-[0.2em] uppercase transition-colors hover:text-green-800 ${bodyFont.variable} font-body`}
              style={{ color: tokens.mutedForeground }}
            >
              {link}
            </a>
          ))}
        </div>
        <motion.button
          whileHover={{ scale: 1.02, backgroundColor: tokens.foreground }}
          whileTap={{ scale: 0.98 }}
          className={`px-8 h-12 border text-xs tracking-[0.2em] uppercase ${bodyFont.variable} font-body transition-colors`}
          style={{ borderColor: tokens.accent1, color: tokens.backgroundAlt, backgroundColor: tokens.accent1 }}
        >
          Book Demo
        </motion.button>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section className="min-h-dvh flex items-center pt-20 relative overflow-hidden" style={{ backgroundColor: tokens.background }}>
      {/* Rhythmic Pulse Background */}
      <motion.div
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: [0.42, 0, 0.58, 1] }}
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, ${tokens.muted} 0%, transparent 70%)`,
        }}
      />

      <div className="max-w-7xl mx-auto px-6 py-24 w-full grid md:grid-cols-2 gap-16 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.2, delayChildren: 0.1 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 80, damping: 25 }}
            className={`inline-block px-4 py-1 mb-8 text-xs tracking-[0.2em] uppercase border ${bodyFont.variable} font-body`}
            style={{ borderColor: tokens.accent2, color: tokens.accent2 }}
          >
            A New Era of Horsemanship
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 80, damping: 25, mass: 2 }}
            className={`text-6xl md:text-8xl font-semibold leading-[1.1] mb-8 ${headingsFont.variable} font-headings`}
            style={{ color: tokens.foreground }}
          >
            Equestrian Elegance. <br />
            <span className="italic opacity-80">Driven by Data.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 80, damping: 25, mass: 1.5 }}
            className={`text-lg md:text-xl mb-12 max-w-xl leading-relaxed ${bodyFont.variable} font-body`}
            style={{ color: tokens.foreground, opacity: 0.8 }}
          >
            {DESCRIPTION}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 80, damping: 25 }}
            className="flex flex-col sm:flex-row gap-6"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`h-14 px-10 border text-sm tracking-[0.2em] uppercase ${bodyFont.variable} font-body flex items-center justify-center gap-4 transition-colors`}
              style={{ backgroundColor: tokens.accent2, color: tokens.backgroundAlt, borderColor: tokens.accent2 }}
            >
              Explore Sensor <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Hero Visual - Paddock Parallax */}
        <FadeUp delay={0.4} className="relative hidden md:block h-[600px] w-full">
           <div className="absolute inset-0 rounded-t-full overflow-hidden border border-b-0" style={{ borderColor: tokens.muted }}>
             {/* Simulated slow, majestic map pan */}
             <motion.div
               animate={{ scale: [1, 1.15, 1] }}
               transition={{ duration: 20, repeat: Infinity, ease: [0, 0, 1, 1] }}
               className="w-full h-full bg-cover bg-center"
               style={{
                 backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0V0zm20 20h20v20H20V20zM0 20h20v20H0V20z' fill='%23DCD7C9' fill-opacity='0.2' fill-rule='evenodd'/%3E%3C/svg%3E")`,
                 backgroundColor: tokens.backgroundAlt
               }}
             />

             {/* Simulated Horse Path */}
             <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
               <motion.path
                 d="M 20 80 Q 40 20, 80 50 T 60 90"
                 fill="none"
                 stroke={tokens.accent2}
                 strokeWidth="0.5"
                 strokeDasharray="2 2"
                 initial={{ pathLength: 0 }}
                 animate={{ pathLength: 1 }}
                 transition={{ duration: 10, repeat: Infinity, ease: [0, 0, 1, 1] }}
               />
               <motion.circle
                 r="1.5"
                 fill={tokens.accent1}
                 animate={{
                   offsetDistance: ["0%", "100%"]
                 }}
                 style={{ offsetPath: "path('M 20 80 Q 40 20, 80 50 T 60 90')" } as any}
                 transition={{ duration: 10, repeat: Infinity, ease: [0, 0, 1, 1] }}
               />
             </svg>
           </div>
        </FadeUp>
      </div>
    </section>
  )
}

function Stats() {
  return (
    <section className="border-y" style={{ borderColor: tokens.border, backgroundColor: tokens.backgroundAlt }}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <StaggerContainer>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {STATS.map(stat => (
              <motion.div key={stat.label} variants={staggerItem}>
                <p className={`text-4xl md:text-5xl font-semibold mb-4 ${headingsFont.variable} font-headings`} style={{ color: tokens.accent1 }}>{stat.value}</p>
                <p className={`text-xs tracking-[0.2em] uppercase ${bodyFont.variable} font-body`} style={{ color: tokens.mutedForeground }}>{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  )
}

function StrideLengthCalculator() {
  const [stride, setStride] = useState(50) // 0 to 100 percentage

  // Calculate derived metrics based on stride length
  const powerOutput = Math.round(500 + (stride * 5)); // Fake metric
  const suspension = (0.2 + (stride * 0.003)).toFixed(2); // Fake metric

  return (
    <div className="p-10 border bg-white" style={{ borderColor: tokens.border }}>
       <h3 className={`text-3xl font-semibold mb-2 ${headingsFont.variable} font-headings`} style={{ color: tokens.foreground }}>Biomechanical Simulator</h3>
       <p className={`text-sm mb-12 ${bodyFont.variable} font-body`} style={{ color: tokens.mutedForeground }}>Drag the slider to adjust stride length and observe the impact on power metrics.</p>

       <div className="mb-16 relative h-32 flex items-center justify-center">
          {/* SVG Horse Silhouette Morphing */}
          <svg viewBox="0 0 200 100" className="w-full max-w-sm overflow-visible">
            {/* Very simple abstract representation of a horse stretching */}
            <motion.path
               d={`M 50 50 Q 100 ${40 - (stride * 0.2)}, ${150 + (stride * 0.5)} 50`}
               fill="none"
               stroke={tokens.accent1}
               strokeWidth="4"
               strokeLinecap="round"
            />
            {/* Front Leg */}
            <motion.line x1="50" y1="50" x2={50 - (stride * 0.2)} y2={90 - (stride * 0.1)} stroke={tokens.accent1} strokeWidth="4" strokeLinecap="round" />
            {/* Hind Leg */}
            <motion.line x1={150 + (stride * 0.5)} y1="50" x2={130 + (stride * 0.7)} y2="90" stroke={tokens.accent1} strokeWidth="4" strokeLinecap="round" />

            {/* Data Points flying out */}
            <motion.text
               x={150 + (stride * 0.5)} y="30"
               className={`${bodyFont.variable} font-body text-[10px]`}
               fill={tokens.accent2}
               animate={{ opacity: [0.5, 1, 0.5] }}
               transition={{ duration: 2, repeat: Infinity }}
            >
               + PUSH OFF ANGLE
            </motion.text>
          </svg>
       </div>

       <div className="mb-12">
          <div className="flex justify-between mb-4 text-xs tracking-[0.1em] uppercase">
             <span style={{ color: tokens.mutedForeground }}>Collected</span>
             <span style={{ color: tokens.accent2 }}>Extended</span>
          </div>
          <input
             type="range"
             min="0"
             max="100"
             value={stride}
             onChange={(e) => setStride(parseInt(e.target.value))}
             className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
             style={{ accentColor: tokens.accent1 }}
          />
       </div>

       <div className="grid grid-cols-2 gap-8 border-t pt-8" style={{ borderColor: tokens.muted }}>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] mb-2" style={{ color: tokens.mutedForeground }}>Power Output</p>
            <p className={`text-3xl font-semibold ${headingsFont.variable} font-headings`} style={{ color: tokens.foreground }}>{powerOutput} W</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] mb-2" style={{ color: tokens.mutedForeground }}>Suspension Time</p>
            <p className={`text-3xl font-semibold ${headingsFont.variable} font-headings`} style={{ color: tokens.foreground }}>{suspension} s</p>
          </div>
       </div>
    </div>
  )
}

function Features() {
  return (
    <section id="performance" className="py-32" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-7xl mx-auto px-6">
        <FadeUp>
          <div className="mb-20 md:w-2/3">
            <h2 className={`text-5xl md:text-6xl font-semibold mb-6 ${headingsFont.variable} font-headings`} style={{ color: tokens.foreground }}>
              Precision Analytics
            </h2>
            <p className={`text-xl leading-relaxed ${bodyFont.variable} font-body`} style={{ color: tokens.mutedForeground }}>
              Move beyond feeling. Quantify your horse's performance with clinical accuracy to fine-tune training programs and prevent overexertion.
            </p>
          </div>
        </FadeUp>
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-12">
            {FEATURES.map((feature, i) => (
              <motion.div
                key={feature.title}
                variants={staggerItem}
                className="group cursor-pointer"
              >
                <div className="mb-6 inline-block p-4 rounded-full border transition-colors group-hover:bg-white" style={{ borderColor: tokens.border }}>
                   <feature.icon className="h-6 w-6" style={{ color: tokens.accent1 }} strokeWidth={1.5} />
                </div>
                <h3 className={`text-2xl font-semibold mb-4 ${headingsFont.variable} font-headings`} style={{ color: tokens.foreground }}>{feature.title}</h3>
                <p className={`text-base leading-relaxed ${bodyFont.variable} font-body`} style={{ color: tokens.mutedForeground }}>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  )
}

function ProductDetail() {
  return (
    <section id="health" className="py-32 border-y overflow-hidden" style={{ borderColor: tokens.border, backgroundColor: tokens.backgroundAlt }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <FadeUp>
            <h2 className={`text-5xl md:text-6xl font-semibold mb-8 ${headingsFont.variable} font-headings`} style={{ color: tokens.foreground }}>
              The Anatomy of a Perfect Stride
            </h2>
            <p className={`text-lg mb-8 leading-relaxed ${bodyFont.variable} font-body`} style={{ color: tokens.mutedForeground }}>
              Every horse has a unique rhythm. By establishing a biomechanical baseline, StableSmart helps you identify minute changes in cadence or power output that may indicate early-stage discomfort.
            </p>
            <ul className="space-y-6 mb-10">
               {['Measure left/right push-off symmetry', 'Track suspension time over oxers', 'Monitor cardiovascular recovery rate'].map((item, i) => (
                 <li key={i} className="flex items-center gap-4">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: tokens.accent2 }} />
                    <span className={`text-base ${bodyFont.variable} font-body`} style={{ color: tokens.foreground }}>{item}</span>
                 </li>
               ))}
            </ul>
          </FadeUp>

          <FadeUp delay={0.2}>
             <StrideLengthCalculator />
          </FadeUp>
        </div>
      </div>
    </section>
  )
}

function Pricing() {
  return (
    <section id="pricing" className="py-32" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-7xl mx-auto px-6">
        <FadeUp>
          <div className="text-center mb-24">
            <h2 className={`text-5xl md:text-6xl font-semibold mb-6 ${headingsFont.variable} font-headings`} style={{ color: tokens.foreground }}>Investment in Excellence</h2>
            <p className={`text-xl ${bodyFont.variable} font-body`} style={{ color: tokens.mutedForeground }}>Select the level of oversight your stable requires.</p>
          </div>
        </FadeUp>
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PRICING.map((tier, index) => (
              <motion.div
                key={tier.name}
                variants={staggerItem}
                className="bg-white border relative flex flex-col transition-all hover:shadow-xl"
                style={{
                  borderColor: tier.highlighted ? tokens.accent2 : tokens.border,
                }}
              >
                <div className="p-10 border-b flex-grow" style={{ borderColor: tokens.border }}>
                   <h3 className={`text-3xl font-semibold mb-4 ${headingsFont.variable} font-headings`} style={{ color: tokens.foreground }}>{tier.name}</h3>
                   <p className={`text-sm mb-8 min-h-[40px] ${bodyFont.variable} font-body`} style={{ color: tokens.mutedForeground }}>{tier.description}</p>
                   <div className="flex items-baseline gap-2 mb-2">
                     <span className={`text-5xl font-semibold ${headingsFont.variable} font-headings`} style={{ color: tokens.foreground }}>{tier.price}</span>
                   </div>
                   <span className={`text-xs uppercase tracking-[0.2em] ${bodyFont.variable} font-body`} style={{ color: tokens.mutedForeground }}>{tier.period}</span>
                </div>

                <div className="p-10 bg-gray-50 flex-grow flex flex-col">
                   <ul className="space-y-6 mb-10 flex-grow">
                     {tier.features.map(f => (
                       <li key={f} className={`flex items-start gap-4 text-sm ${bodyFont.variable} font-body`}>
                         <Check className="h-4 w-4 mt-0.5 shrink-0" style={{ color: tokens.accent2 }} />
                         <span style={{ color: tokens.foreground }}>{f}</span>
                       </li>
                     ))}
                   </ul>
                   <motion.button
                     whileHover={{ scale: 1.02 }}
                     whileTap={{ scale: 0.98 }}
                     className={`w-full h-14 border text-xs tracking-[0.2em] uppercase transition-colors ${bodyFont.variable} font-body`}
                     style={tier.highlighted
                       ? { backgroundColor: tokens.accent2, color: tokens.backgroundAlt, borderColor: tokens.accent2 }
                       : { backgroundColor: 'transparent', color: tokens.foreground, borderColor: tokens.accent1 }
                     }
                   >
                     {tier.cta}
                   </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  )
}

function Testimonials() {
  return (
    <section id="stable" className="py-32 border-y" style={{ borderColor: tokens.border, backgroundColor: tokens.backgroundAlt }}>
      <div className="max-w-7xl mx-auto px-6">
        <FadeUp>
          <div className="mb-24 text-center">
            <h2 className={`text-5xl md:text-6xl font-semibold mb-6 ${headingsFont.variable} font-headings`} style={{ color: tokens.foreground }}>From the Paddock</h2>
          </div>
        </FadeUp>
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {TESTIMONIALS.map(t => (
              <motion.div
                key={t.name}
                variants={staggerItem}
                className="relative"
              >
                <div className="mb-8">
                  <span className={`text-8xl leading-none absolute -top-8 -left-4 opacity-10 ${headingsFont.variable} font-headings`} style={{ color: tokens.accent1 }}>"</span>
                  <p className={`text-lg leading-loose relative z-10 ${bodyFont.variable} font-body`} style={{ color: tokens.foreground }}>{t.text}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full grayscale" />
                  <div>
                    <p className={`font-semibold text-lg ${headingsFont.variable} font-headings`} style={{ color: tokens.foreground }}>{t.name}</p>
                    <p className={`text-xs uppercase tracking-[0.1em] ${bodyFont.variable} font-body`} style={{ color: tokens.mutedForeground }}>{t.role}</p>
                  </div>
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
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-32" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-4xl mx-auto px-6">
        <FadeUp>
          <div className="text-center mb-20">
            <h2 className={`text-5xl md:text-6xl font-semibold ${headingsFont.variable} font-headings`} style={{ color: tokens.foreground }}>Inquiries</h2>
          </div>
        </FadeUp>
        <div className="space-y-2">
          {FAQ_ITEMS.map((item, i) => (
            <FadeUp key={i} delay={i * 0.1}>
              <div className="border-b" style={{ borderColor: tokens.border }}>
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  aria-expanded={openIndex === i}
                  className="w-full flex items-center justify-between py-8 text-left"
                >
                  <span className={`text-xl font-semibold ${headingsFont.variable} font-headings`} style={{ color: tokens.foreground }}>{item.q}</span>
                  <motion.div
                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="h-5 w-5" style={{ color: tokens.mutedForeground }} />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.42, 0, 0.58, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <p className={`pb-8 text-base leading-relaxed ${bodyFont.variable} font-body`} style={{ color: tokens.mutedForeground }}>
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeUp>
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
    <section className="py-32 border-y" style={{ borderColor: tokens.border, backgroundColor: tokens.backgroundAlt }}>
      <div className="max-w-3xl mx-auto px-6 text-center">
        <FadeUp>
          <h2 className={`text-5xl font-semibold mb-6 ${headingsFont.variable} font-headings`} style={{ color: tokens.foreground }}>The Inside Track</h2>
          <p className={`text-lg mb-12 ${bodyFont.variable} font-body`} style={{ color: tokens.mutedForeground }}>
            Receive monthly insights on equine sports science and biomechanics directly to your inbox.
          </p>

          {status === 'success' ? (
            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className={`text-lg italic ${headingsFont.variable} font-headings`}
              style={{ color: tokens.accent2 }}
            >
              Subscription confirmed. Welcome to the stable.
            </motion.p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-0 max-w-xl mx-auto border" style={{ borderColor: tokens.border }}>
              <input
                type="email"
                required
                placeholder="Email Address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className={`flex-1 h-16 px-6 bg-transparent focus:outline-none text-sm ${bodyFont.variable} font-body`}
                style={{ color: tokens.foreground }}
              />
              <motion.button
                type="submit"
                disabled={status === 'loading'}
                whileHover={{ backgroundColor: tokens.accent2 }}
                className={`h-16 px-10 text-xs tracking-[0.2em] uppercase transition-colors disabled:opacity-50 ${bodyFont.variable} font-body`}
                style={{ backgroundColor: tokens.accent1, color: tokens.backgroundAlt }}
              >
                {status === 'loading' ? 'Subscribing' : 'Subscribe'}
              </motion.button>
            </form>
          )}
        </FadeUp>
      </div>
    </section>
  )
}

function Footer() {
  const links = {
    Platform: ['Sensor Hardware', 'App Features', 'Veterinary Portal', 'Pricing'],
    Resources: ['Case Studies', 'Biomechanical Research', 'Help Center', 'Blog'],
    Company: ['Our Story', 'Careers', 'Contact', 'Press'],
    Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy'],
  }

  return (
    <footer className="py-24" style={{ backgroundColor: tokens.foreground, color: tokens.backgroundAlt }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-16 mb-24">
          <div className="col-span-2 md:col-span-2">
             <span className={`font-semibold text-3xl tracking-wide mb-6 block ${headingsFont.variable} font-headings`}>
              {PRODUCT_NAME}
            </span>
            <p className={`text-sm leading-loose opacity-70 max-w-sm ${bodyFont.variable} font-body`}>
              Bridging the gap between classical horsemanship and modern sports science. For the horse, for the sport.
            </p>
          </div>
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <p className={`text-xs uppercase tracking-[0.2em] mb-8 opacity-50 ${bodyFont.variable} font-body`}>{group}</p>
              <ul className="space-y-4">
                {items.map(item => (
                  <li key={item}>
                    <a href="#" className={`text-sm opacity-80 hover:opacity-100 transition-opacity ${bodyFont.variable} font-body`}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className={`flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10 gap-4 text-xs tracking-widest uppercase opacity-50 ${bodyFont.variable} font-body`}>
          <p>
            © {new Date().getFullYear()} {PRODUCT_NAME} LTD.
          </p>
          <a href="/" className="hover:opacity-100 transition-opacity">
            RETURN TO DIRECTORY
          </a>
        </div>
      </div>
    </footer>
  )
}

export default function StylePage() {
  return (
    <div className={`selection:bg-green-900/20`} style={{ backgroundColor: tokens.background, color: tokens.foreground }}>
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
