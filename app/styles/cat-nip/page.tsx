'use client'

import { motion, useReducedMotion, useInView, useSpring } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Syne, Space_Mono } from 'next/font/google'
import {
  Star, ChevronDown, ArrowRight, Check, Target, MousePointer2, Zap, Battery,
  Wifi, ShieldAlert, Sparkles
} from 'lucide-react'

const headingsFont = Syne({
  subsets: ['latin'],
  weight: ['800'],
  variable: '--font-headings',
  display: 'swap',
})

const bodyFont = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const tokens = {
  background: '#0F0F0F', // Night Hunter
  backgroundAlt: '#1A1A1A',
  foreground: '#FFFFFF',
  muted: '#2A2A2A',
  mutedForeground: '#888888',
  border: 'rgba(255, 0, 122, 0.3)',
  accent1: '#FF007A', // Neon Pink
  accent2: '#00FFD1', // Electric Mint
}

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-5% 0px' })
  const shouldReduce = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={shouldReduce ? false : { opacity: 0, y: 50, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ type: "spring", stiffness: 200, damping: 20, delay }}
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
        visible: { transition: { staggerChildren: 0.1 } },
      }}
    >
      {children}
    </motion.div>
  )
}

const staggerItem: import('framer-motion').Variants = {
  hidden: { opacity: 0, scale: 0.8, rotate: -5 },
  visible: { opacity: 1, scale: 1, rotate: 0, transition: { type: "spring" as const, stiffness: 300, damping: 15 } },
}

const PRODUCT_NAME = 'CAT_NIP'
const TAGLINE = 'THE CHASE IS ON.'
const DESCRIPTION = 'HYPER-REACTIVE LASERS. UNPREDICTABLE PATHS. THE ONLY TOY THAT CAN KEEP UP WITH THEIR APEX PREDATOR INSTINCTS.'

const NAV_LINKS = ['GEAR', 'METRICS', 'PLANS', 'INTEL']

const STATS = [
  { value: '1.2M', label: 'POUNCES LOGGED' },
  { value: '10K+', label: 'ACTIVE HUNTERS' },
  { value: '0.01s', label: 'LASER LATENCY' },
  { value: '4.9/5', label: 'LETHALITY SCORE' },
]

const FEATURES = [
  { icon: Target, title: 'AI-DRIVEN PATHING', description: 'No predictable loops. Our algorithm learns your cat\'s hunting style and adapts the laser path to keep them guessing.' },
  { icon: Zap, title: 'HYPER-SPEED MOTORS', description: 'Dual brushless motors allow the laser to dart across the room faster than a feline eye can track.' },
  { icon: Wifi, title: 'REMOTE CONTROL APP', description: 'Take over manual control from anywhere in the world. Play with your cat while you are stuck at the office.' },
  { icon: Battery, title: '14-DAY BATTERY', description: 'High-density cells mean you charge it twice a month. Auto-sleep mode engages when no motion is detected.' },
  { icon: ShieldAlert, title: 'EYE-SAFE LASER', description: 'Class IIIA laser is specifically calibrated to be highly visible to cats but completely safe for direct eye exposure.' },
  { icon: Sparkles, title: 'MULTI-SURFACE GRIP', description: 'Suction cup base and adjustable tripod mean you can mount it on floors, walls, or even the ceiling.' },
]

const PRICING = [
  {
    name: 'PREDATOR_LITE',
    price: '$49',
    period: '/UNIT',
    description: 'THE ENTRY-LEVEL CHASE.',
    features: ['Standard AI Pathing', 'Manual App Control', '7-Day Battery', 'Desk Mount'],
    cta: 'INITIATE',
    highlighted: false,
  },
  {
    name: 'APEX_PRO',
    price: '$89',
    period: '/UNIT',
    description: 'UNRESTRICTED HUNTING POTENTIAL.',
    features: ['Adaptive Deep Learning AI', 'Global Remote Access', '14-Day Battery', 'All-Surface Mount Kit', 'Multi-Cat Tracking'],
    cta: 'UPGRADE HUNT',
    highlighted: true,
  },
  {
    name: 'SWARM_SYSTEM',
    price: '$199',
    period: '/3 UNITS',
    description: 'TOTAL ENVIRONMENTAL DOMINATION.',
    features: ['3 Synchronized Pro Units', 'Room-to-Room Handoff', 'Infinite Battery (Docked)', 'Lifetime Warranty', 'VIP Support'],
    cta: 'DEPLOY SWARM',
    highlighted: false,
  },
]

const TESTIMONIALS = [
  {
    name: 'AGENT M.',
    role: 'OWNER OF "SHADOW"',
    company: 'DEPLOYED: 2023',
    text: 'MY BENGAL DESTROYED EVERY OTHER TOY. THIS IS THE FIRST THING THAT ACTUALLY EXHAUSTS HER. THE AI PATHING IS TERRIFYINGLY GOOD.',
    rating: 5,
  },
  {
    name: 'DIRECTOR K.',
    role: 'OWNER OF "GHOST"',
    company: 'DEPLOYED: 2024',
    text: 'MANUAL CONTROL FROM MY DESK AT WORK IS INCREDIBLE. I CAN SEE HIM GOING CRAZY ON THE NANNY CAM. WORTH EVERY PENNY.',
    rating: 5,
  },
  {
    name: 'OPERATIVE J.',
    role: 'OWNER OF "VIPER"',
    company: 'DEPLOYED: 2023',
    text: 'I BOUGHT THE SWARM SYSTEM. THE WAY THE LASER HANDS OFF BETWEEN ROOMS IS LIKE SOMETHING OUT OF A SCI-FI MOVIE.',
    rating: 5,
  },
]

const FAQ_ITEMS = [
  { q: 'IS THE LASER SAFE FOR MY CATS EYES?', a: 'YES. WE USE A CLASS IIIA LASER, WHICH IS THE STANDARD FOR PET TOYS. IT IS BRIGHT ENOUGH TO TRIGGER PREY DRIVE BUT CALIBRATED TO PREVENT RETINAL DAMAGE.' },
  { q: 'CAN IT TRACK MULTIPLE CATS?', a: 'THE APEX PRO MODEL USES INFRARED SENSORS TO DETECT MULTIPLE HEAT SIGNATURES, ADJUSTING THE LASER PATH TO ENGAGE ALL TARGETS IN THE ROOM.' },
  { q: 'DOES IT WORK ON CARPET?', a: 'THE TOY ITSELF CAN BE MOUNTED ANYWHERE. THE LASER IS VISIBLE ON ALMOST ALL SURFACES, THOUGH IT IS MOST INTENSE ON HARD FLOORS.' },
  { q: 'WHAT HAPPENS IF THEY CATCH IT?', a: 'THEY CANT. BUT SERIOUSLY, WE RECOMMEND ENDING PLAY SESSIONS BY POINTING THE LASER AT A PHYSICAL TREAT SO THEY GET THE SATISFACTION OF A "KILL".' },
]


// Custom hook for the laser string follower
function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  return mousePosition;
}

function LaserFollower() {
  const mouse = useMousePosition();

  // High stiffness, low damping for super snappy movement
  const springConfig = { damping: 25, stiffness: 1000, mass: 0.1 };
  const cursorX = useSpring(mouse.x, springConfig);
  const cursorY = useSpring(mouse.y, springConfig);

  return (
    <motion.div
      className="fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none z-[100] mix-blend-screen"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: '-50%',
        translateY: '-50%',
        backgroundColor: tokens.accent1,
        boxShadow: `0 0 20px 10px ${tokens.accent1}`,
      }}
    />
  )
}

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b bg-black/80 backdrop-blur-md" style={{ borderColor: tokens.border }}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Zap className="h-6 w-6" style={{ color: tokens.accent2 }} strokeWidth={3} />
          <span className={`font-black text-2xl tracking-tighter ${headingsFont.variable} font-headings`} style={{ color: tokens.foreground }}>
            {PRODUCT_NAME}
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <motion.a
              key={link}
              href={`#${link.toLowerCase()}`}
              className={`text-sm font-bold tracking-widest transition-colors ${bodyFont.variable} font-body`}
              style={{ color: tokens.mutedForeground }}
              whileHover={{
                color: tokens.foreground,
                textShadow: `0 0 8px ${tokens.accent2}`,
                x: [0, 5, -5, 0] // Darting effect
              }}
              transition={{ duration: 0.2 }}
            >
              {link}
            </motion.a>
          ))}
        </div>
        <motion.button
          whileHover={{
            scale: 1.05,
            boxShadow: `0 0 20px ${tokens.accent1}`,
            borderColor: tokens.accent1
          }}
          whileTap={{ scale: 0.95 }}
          className={`px-8 h-12 border-2 font-bold text-sm tracking-widest ${bodyFont.variable} font-body bg-transparent`}
          style={{ borderColor: tokens.accent1, color: tokens.accent1 }}
        >
          [ PURCHASE ]
        </motion.button>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section className="min-h-dvh flex items-center pt-20 relative overflow-hidden" style={{ backgroundColor: tokens.background }}>
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10"
           style={{
             backgroundImage: `linear-gradient(${tokens.accent2} 1px, transparent 1px), linear-gradient(90deg, ${tokens.accent2} 1px, transparent 1px)`,
             backgroundSize: '50px 50px',
             transform: 'perspective(500px) rotateX(60deg) translateY(-100px) translateZ(-200px)'
           }}>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-24 w-full relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`inline-flex items-center gap-2 px-4 py-2 border mb-8 ${bodyFont.variable} font-body text-xs font-bold tracking-widest`}
            style={{ borderColor: tokens.accent2, color: tokens.accent2, backgroundColor: `${tokens.accent2}10` }}
          >
            <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
            TARGET ACQUIRED
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className={`text-6xl md:text-9xl font-black leading-[0.9] mb-8 tracking-tighter ${headingsFont.variable} font-headings`}
            style={{ color: tokens.foreground }}
          >
            {TAGLINE}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`text-lg md:text-xl mb-12 max-w-2xl mx-auto tracking-widest leading-relaxed ${bodyFont.variable} font-body`}
            style={{ color: tokens.mutedForeground }}
          >
            {DESCRIPTION}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <motion.button
              whileHover={{
                scale: 1.05,
                backgroundColor: tokens.foreground,
                color: tokens.background
              }}
              whileTap={{ scale: 0.95 }}
              className={`h-16 px-12 font-bold tracking-widest text-lg transition-colors ${bodyFont.variable} font-body flex items-center justify-center gap-3 relative overflow-hidden group`}
              style={{ backgroundColor: tokens.accent1, color: tokens.foreground }}
            >
              <div className="absolute inset-0 w-full h-full bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
              LOCK ON <Target className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function Stats() {
  return (
    <section className="border-y relative overflow-hidden" style={{ borderColor: tokens.border, backgroundColor: tokens.backgroundAlt }}>
      {/* Scanning Line */}
      <motion.div
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 3, repeat: Infinity, ease: [0, 0, 1, 1] }}
        className="absolute inset-y-0 w-1/4 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent z-0 pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <StaggerContainer>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map(stat => (
              <motion.div
                key={stat.label}
                variants={staggerItem}
                className="text-center"
                whileHover={{ scale: 1.1, color: tokens.accent2 }}
              >
                <p className={`text-4xl md:text-5xl font-black mb-2 tracking-tighter ${headingsFont.variable} font-headings`} style={{ color: tokens.foreground }}>{stat.value}</p>
                <p className={`text-xs font-bold tracking-widest ${bodyFont.variable} font-body`} style={{ color: tokens.mutedForeground }}>[{stat.label}]</p>
              </motion.div>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  )
}

function PlayfulnessGauge() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="p-12 border relative overflow-hidden bg-black flex flex-col items-center justify-center"
      style={{ borderColor: tokens.muted }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <h3 className={`text-2xl font-black tracking-tighter mb-8 ${headingsFont.variable} font-headings text-center text-white`}>
        PREY DRIVE METER
      </h3>

      <div className="relative w-64 h-32 overflow-hidden">
        {/* Gauge Arc */}
        <svg viewBox="0 0 100 50" className="w-full h-full overflow-visible">
          <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke={tokens.muted} strokeWidth="4" strokeLinecap="round" />
          <path
            d="M 10 50 A 40 40 0 0 1 90 50"
            fill="none"
            stroke={isHovered ? tokens.accent1 : tokens.accent2}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="125.6"
            strokeDashoffset={isHovered ? "20" : "80"}
            style={{ transition: 'stroke-dashoffset 0.5s ease-out, stroke 0.3s' }}
          />
        </svg>

        {/* Needle */}
        <motion.div
          className="absolute bottom-0 left-1/2 w-1 h-24 bg-white origin-bottom"
          animate={isHovered ? {
            rotate: [60, 75, 65, 80, 70, 85, 60], // Overload jitter
            filter: ["drop-shadow(0 0 5px red)", "drop-shadow(0 0 10px red)"]
          } : {
            rotate: -40,
            filter: "drop-shadow(0 0 0px transparent)"
          }}
          transition={isHovered ? {
            rotate: { repeat: Infinity, duration: 0.2 },
            filter: { repeat: Infinity, duration: 0.1 }
          } : {
            type: "spring", stiffness: 100, damping: 10
          }}
          style={{ marginLeft: '-2px' }}
        />

        {/* Center Dot */}
        <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white" />
      </div>

      <div className="mt-8 text-center h-8">
        {isHovered ? (
          <motion.p
            animate={{ opacity: [1, 0, 1], x: [-2, 2, -2] }}
            transition={{ repeat: Infinity, duration: 0.1 }}
            className={`text-xl font-bold tracking-widest ${bodyFont.variable} font-body text-red-500`}
          >
            CRITICAL OVERLOAD
          </motion.p>
        ) : (
          <p className={`text-sm font-bold tracking-widest ${bodyFont.variable} font-body text-gray-500`}>
            AWAITING TARGET
          </p>
        )}
      </div>

      {/* Glitch Overlay */}
      {isHovered && (
        <div className="absolute inset-0 bg-red-500/10 mix-blend-screen pointer-events-none" />
      )}
    </motion.div>
  )
}

function Features() {
  return (
    <section id="gear" className="py-24 relative" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-7xl mx-auto px-6">
        <FadeUp>
          <div className="mb-20">
            <h2 className={`text-5xl md:text-7xl font-black tracking-tighter mb-6 ${headingsFont.variable} font-headings`} style={{ color: tokens.foreground }}>
              SYSTEM SPECS
            </h2>
          </div>
        </FadeUp>
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feature, i) => (
              <motion.div
                key={feature.title}
                variants={staggerItem}
                whileHover={{
                  scale: 1.02,
                  borderColor: tokens.accent2,
                  boxShadow: `0 0 20px ${tokens.accent2}20`
                }}
                className="p-8 border bg-black/50 backdrop-blur-sm group transition-colors"
                style={{ borderColor: tokens.muted }}
              >
                <feature.icon className="h-10 w-10 mb-8 transition-colors group-hover:text-cyan-400" style={{ color: tokens.mutedForeground }} strokeWidth={1.5} />
                <h3 className={`font-bold text-xl mb-4 tracking-widest ${bodyFont.variable} font-body`} style={{ color: tokens.foreground }}>
                  {feature.title}
                </h3>
                <p className={`text-sm leading-relaxed ${bodyFont.variable} font-body`} style={{ color: tokens.mutedForeground }}>
                  {feature.description}
                </p>
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
    <section id="metrics" className="py-24 border-y overflow-hidden" style={{ borderColor: tokens.border, backgroundColor: tokens.backgroundAlt }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <FadeUp>
            <h2 className={`text-5xl md:text-6xl font-black tracking-tighter mb-6 ${headingsFont.variable} font-headings`} style={{ color: tokens.foreground }}>
              ANALYZE THE HUNT
            </h2>
            <p className={`text-lg mb-8 leading-relaxed tracking-widest ${bodyFont.variable} font-body`} style={{ color: tokens.mutedForeground }}>
              EVERY SWIPE, EVERY POUNCE, EVERY MISSED CALCULATION. THE APP DOES NOT JUST CONTROL THE LASER; IT PROFILES YOUR CAT'S PREDATORY EFFICIENCY.
            </p>
            <motion.button
              whileHover={{ x: 10, color: tokens.accent2 }}
              className={`font-bold text-lg tracking-widest flex items-center gap-4 ${bodyFont.variable} font-body bg-transparent`}
              style={{ color: tokens.accent1 }}
            >
              [ VIEW METRICS ] <ArrowRight className="h-5 w-5" />
            </motion.button>
          </FadeUp>

          <FadeUp delay={0.2}>
             <PlayfulnessGauge />
          </FadeUp>
        </div>
      </div>
    </section>
  )
}

function Pricing() {
  return (
    <section id="plans" className="py-24" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-7xl mx-auto px-6">
        <FadeUp>
          <div className="mb-20 text-center">
            <h2 className={`text-5xl md:text-7xl font-black tracking-tighter mb-6 ${headingsFont.variable} font-headings`} style={{ color: tokens.foreground }}>
              ACQUISITION TIERS
            </h2>
          </div>
        </FadeUp>
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRICING.map(tier => (
              <motion.div
                key={tier.name}
                variants={staggerItem}
                whileHover={{ y: -10, borderColor: tier.highlighted ? tokens.accent1 : tokens.accent2 }}
                className="p-8 border bg-black relative flex flex-col group transition-colors"
                style={{
                  borderColor: tier.highlighted ? tokens.accent1 : tokens.muted,
                }}
              >
                {tier.highlighted && (
                  <div
                    className={`absolute top-0 right-0 px-4 py-1 text-xs font-bold tracking-widest ${bodyFont.variable} font-body`}
                    style={{ backgroundColor: tokens.accent1, color: tokens.foreground }}
                  >
                    [ RECOMMENDED ]
                  </div>
                )}
                <h3 className={`font-bold text-2xl mb-2 tracking-widest mt-4 ${bodyFont.variable} font-body`} style={{ color: tokens.foreground }}>{tier.name}</h3>
                <p className={`text-xs mb-8 min-h-[40px] tracking-widest ${bodyFont.variable} font-body`} style={{ color: tokens.mutedForeground }}>{tier.description}</p>
                <div className={`flex items-end gap-2 mb-8 pb-8 border-b ${bodyFont.variable} font-body`} style={{ borderColor: tokens.muted }}>
                  <span className={`text-6xl font-black tracking-tighter ${headingsFont.variable} font-headings`} style={{ color: tokens.foreground }}>{tier.price}</span>
                  <span className="text-sm tracking-widest pb-2" style={{ color: tokens.mutedForeground }}>{tier.period}</span>
                </div>
                <ul className="space-y-4 mb-10 flex-grow">
                  {tier.features.map(f => (
                    <li key={f} className={`flex items-start gap-3 text-sm tracking-widest ${bodyFont.variable} font-body`}>
                      <span className="text-cyan-500 mt-1">»</span>
                      <span style={{ color: tokens.foreground }}>{f}</span>
                    </li>
                  ))}
                </ul>
                <motion.button
                  whileHover={{ backgroundColor: tier.highlighted ? tokens.foreground : tokens.accent2, color: tokens.background }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full h-14 border font-bold tracking-widest text-sm transition-colors ${bodyFont.variable} font-body`}
                  style={tier.highlighted
                    ? { backgroundColor: tokens.accent1, color: tokens.foreground, borderColor: tokens.accent1 }
                    : { backgroundColor: 'transparent', color: tokens.foreground, borderColor: tokens.muted }
                  }
                >
                  {tier.cta}
                </motion.button>
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
    <section id="intel" className="py-24 border-y relative overflow-hidden" style={{ borderColor: tokens.border, backgroundColor: tokens.backgroundAlt }}>
      {/* Static noise overlay */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-screen pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <FadeUp>
          <div className="mb-20">
            <h2 className={`text-5xl md:text-7xl font-black tracking-tighter mb-6 ${headingsFont.variable} font-headings`} style={{ color: tokens.foreground }}>FIELD REPORTS</h2>
          </div>
        </FadeUp>
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map(t => (
              <motion.div
                key={t.name}
                variants={staggerItem}
                whileHover={{ x: [0, 5, -5, 0] }} // Darting effect on hover
                transition={{ duration: 0.2 }}
                className="p-8 border bg-black"
                style={{ borderColor: tokens.muted }}
              >
                <p className={`text-sm tracking-widest leading-loose mb-8 ${bodyFont.variable} font-body`} style={{ color: tokens.foreground }}>
                  "{t.text}"
                </p>
                <div className={`border-t pt-6 ${bodyFont.variable} font-body`} style={{ borderColor: tokens.muted }}>
                  <p className="font-bold text-cyan-400 mb-1 tracking-widest">{t.name}</p>
                  <p className="text-xs text-gray-500 tracking-widest">{t.role}</p>
                  <p className="text-xs text-gray-600 tracking-widest mt-1">{t.company}</p>
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
    <section className="py-24" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-3xl mx-auto px-6">
        <FadeUp>
          <div className="text-center mb-20">
            <h2 className={`text-4xl md:text-5xl font-black tracking-tighter ${headingsFont.variable} font-headings`} style={{ color: tokens.foreground }}>
              DEBRIEFING
            </h2>
          </div>
        </FadeUp>
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, i) => (
            <FadeUp key={i} delay={i * 0.05}>
              <div className="border bg-black" style={{ borderColor: openIndex === i ? tokens.accent1 : tokens.muted }}>
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  aria-expanded={openIndex === i}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className={`font-bold text-sm tracking-widest ${bodyFont.variable} font-body`} style={{ color: openIndex === i ? tokens.accent1 : tokens.foreground }}>{item.q}</span>
                  <span className={`font-bold ${bodyFont.variable} font-body`} style={{ color: tokens.mutedForeground }}>
                    {openIndex === i ? '[-]' : '[+]'}
                  </span>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openIndex === i ? 'auto' : 0, opacity: openIndex === i ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                  style={{ overflow: 'hidden' }}
                >
                  <p className={`px-6 pb-6 text-sm tracking-widest leading-loose ${bodyFont.variable} font-body`} style={{ color: tokens.mutedForeground }}>
                    {item.a}
                  </p>
                </motion.div>
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
    <section className="py-24 border-y relative overflow-hidden" style={{ borderColor: tokens.border, backgroundColor: tokens.backgroundAlt }}>
      {/* Glitch lines */}
      <motion.div
        animate={{ opacity: [0.1, 0.3, 0.1], scaleY: [1, 2, 1] }}
        transition={{ repeat: Infinity, duration: 0.1, repeatType: 'reverse' }}
        className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] pointer-events-none"
      />

      <div className="max-w-2xl mx-auto px-6 text-center relative z-10">
        <FadeUp>
          <h2 className={`text-4xl md:text-5xl font-black tracking-tighter mb-6 ${headingsFont.variable} font-headings text-white`}>
            ESTABLISH CONNECTION
          </h2>
          <p className={`text-sm tracking-widest mb-10 text-gray-400 ${bodyFont.variable} font-body`}>
            ENTER YOUR FREQUENCY TO RECEIVE FIRMWARE UPDATES AND TACTICAL CAT MEMES.
          </p>

          {status === 'success' ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`inline-block border border-cyan-500 bg-cyan-900/20 text-cyan-400 px-8 py-4 font-bold tracking-widest text-sm ${bodyFont.variable} font-body`}
            >
              CONNECTION SECURED.
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                required
                placeholder="ENTER_EMAIL"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className={`flex-1 h-14 px-6 border bg-black text-white focus:outline-none focus:border-cyan-400 transition-colors tracking-widest text-sm ${bodyFont.variable} font-body placeholder:text-gray-600`}
                style={{ borderColor: tokens.muted }}
              />
              <motion.button
                type="submit"
                disabled={status === 'loading'}
                whileHover={{ backgroundColor: tokens.foreground, color: tokens.background }}
                whileTap={{ scale: 0.95 }}
                className={`h-14 px-8 border font-bold tracking-widest text-sm disabled:opacity-50 transition-colors ${bodyFont.variable} font-body`}
                style={{ backgroundColor: tokens.accent1, color: tokens.foreground, borderColor: tokens.accent1 }}
              >
                {status === 'loading' ? 'SYNCING...' : 'TRANSMIT'}
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
    HARDWARE: ['Apex Pro', 'Predator Lite', 'Swarm Hub', 'Mounts'],
    SOFTWARE: ['App Download', 'API Docs', 'Firmware', 'Status'],
    AGENCY: ['About', 'Careers', 'Press Kit', 'Contact'],
    PROTOCOLS: ['Privacy', 'Terms', 'Safety Specs', 'Returns'],
  }

  return (
    <footer className="py-20" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-12 mb-16">
          <div className="col-span-2 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <Zap className="h-6 w-6" style={{ color: tokens.accent1 }} />
              <span className={`font-black text-2xl tracking-tighter ${headingsFont.variable} font-headings`} style={{ color: tokens.foreground }}>
                {PRODUCT_NAME}
              </span>
            </div>
            <p className={`text-xs tracking-widest leading-loose max-w-sm ${bodyFont.variable} font-body`} style={{ color: tokens.mutedForeground }}>
              THE CHASE IS ON. ADVANCED FELINE ENTERTAINMENT SYSTEMS DESIGNED FOR APEX PREDATORS.
            </p>
          </div>
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <p className={`font-bold text-xs tracking-widest mb-6 ${bodyFont.variable} font-body`} style={{ color: tokens.accent2 }}>[{group}]</p>
              <ul className="space-y-4">
                {items.map(item => (
                  <li key={item}>
                    <motion.a
                      href="#"
                      className={`text-xs tracking-widest transition-colors ${bodyFont.variable} font-body`}
                      style={{ color: tokens.mutedForeground }}
                      whileHover={{ color: tokens.foreground, x: 5 }}
                    >
                      {item}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t gap-4" style={{ borderColor: tokens.muted }}>
          <p className={`text-xs tracking-widest ${bodyFont.variable} font-body`} style={{ color: tokens.mutedForeground }}>
            © {new Date().getFullYear()} {PRODUCT_NAME} SYSTEMS. END OF TRANSMISSION.
          </p>
          <a
            href="/"
            className={`text-xs tracking-widest font-bold hover:text-white transition-colors ${bodyFont.variable} font-body`}
            style={{ color: tokens.accent1 }}
          >
            {'< RETURN TO DIRECTORY'}
          </a>
        </div>
      </div>
    </footer>
  )
}

export default function StylePage() {
  return (
    <div className={`font-sans selection:bg-pink-500/30 selection:text-white`} style={{ backgroundColor: tokens.background, color: tokens.foreground }}>
      {/* Hide standard cursor to show custom laser */}
      <style dangerouslySetInnerHTML={{__html: `
        body { cursor: none; }
        a, button, input { cursor: none !important; }
      `}} />
      <LaserFollower />
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
