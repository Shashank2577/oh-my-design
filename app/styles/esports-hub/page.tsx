'use client'

import { motion, useReducedMotion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import {
  Star, ChevronDown, ArrowRight, Check, Zap, Target, Shield,
  Gamepad2, Trophy, Flame
} from 'lucide-react'

// ─────────────────────────────────────────────
// FONTS
// ─────────────────────────────────────────────
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

// ─────────────────────────────────────────────
// DESIGN TOKENS
// ─────────────────────────────────────────────
const tokens = {
  background: '#000000',
  surface: '#121212',
  accent1: '#00FF41', // Matrix Green
  accent2: '#FFFFFF', // Pure Info
  border: '#333333',
  textHigh: '#FFFFFF',
  textLow: '#888888',
}

// ─────────────────────────────────────────────
// MOTION HELPERS
// ─────────────────────────────────────────────
function Unfold3D({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' })
  const shouldReduce = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      initial={shouldReduce ? false : { rotateX: 90, opacity: 0, transformPerspective: 1000 }}
      animate={isInView ? { rotateX: 0, opacity: 1 } : {}}
      transition={{ type: "spring", stiffness: 150, damping: 20, delay }}
      style={{ transformOrigin: 'top' }}
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
        visible: { transition: { staggerChildren: 0.1 } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const staggerItem: import('framer-motion').Variants = {
  hidden: { rotateX: 90, opacity: 0, transformPerspective: 1000, transformOrigin: 'top' },
  visible: { rotateX: 0, opacity: 1, transition: { type: "spring" as const, stiffness: 150, damping: 20 } },
}

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────
const PRODUCT_NAME = 'Esports Hub'
const TAGLINE = 'THE NEWS NETWORK OF THE FUTURE'
const DESCRIPTION = 'Real-time updates, deep-dive analytics, and breaking news from the cutting edge of competitive gaming.'

const NAV_LINKS = ['Live', 'Tournaments', 'Teams', 'Analytics']

const STATS = [
  { value: '2.4M', label: 'LIVE VIEWERS' },
  { value: '150+', label: 'PRO TEAMS' },
  { value: '0.01s', label: 'DATA LATENCY' },
  { value: '24/7', label: 'COVERAGE' },
]

const FEATURES = [
  { icon: Zap, title: 'INSTANT ALERTS', description: 'Get breaking roster changes and match results before the stream even catches up.' },
  { icon: Target, title: 'META TRACKER', description: 'Live analysis of pick/ban rates and weapon loadouts across top-tier tournaments.' },
  { icon: Shield, title: 'VERIFIED LEAKS', description: 'Our reputation system filters the noise to bring you credible insider information.' },
  { icon: Gamepad2, title: 'MATCH HUD', description: 'Overlay live stats, player economy, and minimap data on your second monitor.' },
  { icon: Trophy, title: 'TOURNAMENT BRACKETS', description: 'Auto-updating brackets that morph and restructure in real-time as matches conclude.' },
  { icon: Flame, title: 'HYPE METER', description: 'Social sentiment analysis that tells you which matches are generating the most buzz.' },
]

const PRICING = [
  {
    name: 'CASUAL',
    price: 'FREE',
    period: 'FOREVER',
    description: 'Basic access to the news feed and standard match stats.',
    features: ['Live News Feed', 'Basic Match Stats', 'Community Forums', 'Ad-Supported'],
    cta: 'INITIATE',
    highlighted: false,
  },
  {
    name: 'PRO-USER',
    price: '$7.99',
    period: 'MONTH',
    description: 'Deep analytics and ad-free experience for the hardcore fan.',
    features: ['Advanced Analytics', 'Zero Ads', 'Custom Alerts', 'Beta Feature Access', 'VOD Library', 'Pro Discord Access'],
    cta: 'UPGRADE STATUS',
    highlighted: true,
  },
  {
    name: 'ORG TIER',
    price: '$49.99',
    period: 'MONTH',
    description: 'Raw API access and scouting tools for professional teams.',
    features: ['Everything in Pro', 'API Access', 'Scouting Database', 'Raw Telemetry DL', 'Custom Dashboards', 'Dedicated Support'],
    cta: 'REQUEST KEY',
    highlighted: false,
  },
]

const TESTIMONIALS = [
  {
    name: 'NINJA',
    role: 'CONTENT CREATOR',
    company: 'INDEPENDENT',
    text: 'If I need to know what happened in a match while I was live, Esports Hub is the only tab I open.',
    rating: 5,
  },
  {
    name: 'FROSKURINN',
    role: 'ANALYST',
    company: 'BROADCAST',
    text: 'The data depth here is insane. It\'s replaced three different tools in my pre-show prep workflow.',
    rating: 5,
  },
  {
    name: 'FAKER_FAN_99',
    role: 'USER',
    company: 'COMMUNITY',
    text: 'The breaking news ticker is faster than Twitter. I literally knew about the roster swap before the org announced it.',
    rating: 5,
  },
]

const FAQ_ITEMS = [
  { q: 'WHAT GAMES DO YOU COVER?', a: 'Currently tracking Tier-1 tournaments for League of Legends, Valorant, CS2, Dota 2, and Rocket League.' },
  { q: 'HOW FAST ARE LIVE UPDATES?', a: 'Our data hooks directly into tournament APIs where available, providing sub-second latency on score and economy updates.' },
  { q: 'CAN I CUSTOMIZE MY FEED?', a: 'Yes. Pro-users can filter the news and live HUD by specific teams, regions, or game titles.' },
  { q: 'DO YOU HAVE A MOBILE APP?', a: 'The progressive web app (PWA) is optimized for mobile, offering the exact same functionality as the desktop site.' },
]

// ─────────────────────────────────────────────
// COMPONENTS
// ─────────────────────────────────────────────

function BreakingTicker() {
  const shouldReduce = useReducedMotion()
  return (
    <div className="w-full overflow-hidden flex items-center border-b" style={{ backgroundColor: tokens.accent1, borderColor: tokens.background, height: '32px' }}>
      <div className="px-4 font-bold text-sm z-10 flex-shrink-0" style={{ backgroundColor: tokens.accent1, color: tokens.background, fontFamily: 'var(--font-space-grotesk)' }}>
        BREAKING_
      </div>
      <motion.div
        className="flex whitespace-nowrap text-sm font-bold"
        animate={shouldReduce ? {} : { x: ["100%", "-100%"] }}
        transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
        style={{ color: tokens.background, fontFamily: 'var(--font-jetbrains-mono)' }}
      >
        <span>FAZE CLAN SECURES MAJOR CHAMPIONSHIP // SENTINELS ANNOUNCE SURPRISE ROSTER SWAP // PATCH 14.2 LEAKED: ASSASSINS NERFED // TOKYO MASTERS VIEWERSHIP BREAKS RECORDS //</span>
        <span className="ml-8">FAZE CLAN SECURES MAJOR CHAMPIONSHIP // SENTINELS ANNOUNCE SURPRISE ROSTER SWAP // PATCH 14.2 LEAKED: ASSASSINS NERFED // TOKYO MASTERS VIEWERSHIP BREAKS RECORDS //</span>
      </motion.div>
    </div>
  )
}

function Navbar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex flex-col">
      <BreakingTicker />
      <nav
        className="border-b"
        style={{ borderColor: tokens.border, backgroundColor: `${tokens.background}F2`, backdropFilter: 'blur(8px)' }}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-bold text-2xl tracking-tighter" style={{ color: tokens.accent2, fontFamily: 'var(--font-space-grotesk)' }}>
            ESPORTS<span style={{ color: tokens.accent1 }}>HUB</span>
          </span>
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(link => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-sm tracking-widest transition-colors relative group"
                style={{ color: tokens.textLow, fontFamily: 'var(--font-jetbrains-mono)' }}
              >
                {link}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 transition-all group-hover:w-full" style={{ backgroundColor: tokens.accent1 }}></span>
              </a>
            ))}
          </div>
          <motion.button
            whileHover={{ backgroundColor: tokens.accent2, color: tokens.background }}
            whileTap={{ scale: 0.95 }}
            className="px-5 h-8 text-xs font-bold tracking-widest transition-colors"
            style={{ backgroundColor: 'transparent', color: tokens.accent1, border: `1px solid ${tokens.accent1}`, fontFamily: 'var(--font-jetbrains-mono)' }}
          >
            SYS_LOGIN
          </motion.button>
        </div>
      </nav>
    </div>
  )
}

function Hero() {
  return (
    <section className="min-h-dvh flex items-center pt-24" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-7xl mx-auto px-6 py-24 w-full grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ rotateX: 90, opacity: 0 }}
          animate={{ rotateX: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 150, damping: 20 }}
          style={{ transformOrigin: 'top' }}
        >
          <div className="mb-6 flex items-center gap-2">
            <span className="w-2 h-2 animate-pulse" style={{ backgroundColor: tokens.accent1 }}></span>
            <span className="text-xs tracking-widest" style={{ color: tokens.accent1, fontFamily: 'var(--font-jetbrains-mono)' }}>LIVE_FEED_ACTIVE</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-none mb-6 tracking-tight uppercase" style={{ color: tokens.accent2, fontFamily: 'var(--font-space-grotesk)' }}>
            {TAGLINE}
          </h1>

          <p className="text-lg mb-10 leading-relaxed" style={{ color: tokens.textLow, fontFamily: 'var(--font-jetbrains-mono)' }}>
            {DESCRIPTION}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="h-12 px-8 font-bold text-sm tracking-widest flex items-center justify-center gap-2"
              style={{ backgroundColor: tokens.accent1, color: tokens.background, fontFamily: 'var(--font-jetbrains-mono)' }}
            >
              ENTER_HUB <ArrowRight className="h-4 w-4" />
            </motion.button>
          </div>
        </motion.div>

        <Unfold3D delay={0.2}>
          <div className="relative aspect-square md:aspect-[4/3] border flex flex-col" style={{ borderColor: tokens.border, backgroundColor: tokens.surface }}>
            {/* Terminal Header */}
            <div className="h-8 border-b flex items-center px-4 gap-2" style={{ borderColor: tokens.border, backgroundColor: tokens.background }}>
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: tokens.border }}></div>
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: tokens.border }}></div>
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: tokens.border }}></div>
              <span className="ml-auto text-xs" style={{ color: tokens.textLow, fontFamily: 'var(--font-jetbrains-mono)' }}>data_stream.exe</span>
            </div>

            {/* Holographic preview content */}
            <div className="flex-1 p-6 relative overflow-hidden">
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `linear-gradient(${tokens.accent1} 1px, transparent 1px), linear-gradient(90deg, ${tokens.accent1} 1px, transparent 1px)`, backgroundSize: '20px 20px' }}></div>
              <motion.div
                className="space-y-4 relative z-10"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {[1, 2, 3].map((i) => (
                  <div key={i} className="border p-4 bg-black/50 backdrop-blur" style={{ borderColor: tokens.border }}>
                    <div className="text-xs mb-2" style={{ color: tokens.accent1, fontFamily: 'var(--font-jetbrains-mono)' }}>{`[10:42:${i}5_AM]`}</div>
                    <div className="h-4 w-3/4 mb-2" style={{ backgroundColor: tokens.border }}></div>
                    <div className="h-4 w-1/2" style={{ backgroundColor: tokens.border }}></div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </Unfold3D>
      </div>
    </section>
  )
}

function Stats() {
  return (
    <section className="border-y" style={{ borderColor: tokens.border, backgroundColor: tokens.surface }}>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat) => (
            <motion.div key={stat.label} variants={staggerItem} className="flex flex-col">
              <span className="text-4xl md:text-5xl font-bold tracking-tighter mb-1" style={{ color: tokens.accent2, fontFamily: 'var(--font-space-grotesk)' }}>
                {stat.value}
              </span>
              <span className="text-xs tracking-widest" style={{ color: tokens.textLow, fontFamily: 'var(--font-jetbrains-mono)' }}>
                //{stat.label}
              </span>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

function Features() {
  return (
    <section id="features" className="py-24" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-7xl mx-auto px-6">
        <Unfold3D>
          <div className="mb-16">
            <p className="text-sm tracking-widest mb-2" style={{ color: tokens.accent1, fontFamily: 'var(--font-jetbrains-mono)' }}>SYS_MODULES</p>
            <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tight" style={{ color: tokens.accent2, fontFamily: 'var(--font-space-grotesk)' }}>
              CORE CAPABILITIES
            </h2>
          </div>
        </Unfold3D>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              variants={staggerItem}
              className="p-8 border group relative overflow-hidden"
              style={{ borderColor: tokens.border, backgroundColor: tokens.surface }}
            >
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-4 h-4 border-t border-r" style={{ borderColor: tokens.accent1 }}></div>

              <feature.icon className="h-8 w-8 mb-6" style={{ color: tokens.accent1 }} strokeWidth={1.5} />
              <h3 className="font-bold text-xl mb-3 tracking-tight uppercase" style={{ color: tokens.accent2, fontFamily: 'var(--font-space-grotesk)' }}>
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: tokens.textLow, fontFamily: 'var(--font-jetbrains-mono)' }}>
                {feature.description}
              </p>

              {/* Hover effect - OCR scanline */}
              <motion.div
                className="absolute left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100"
                style={{ backgroundColor: tokens.accent1, top: '0%' }}
                animate={{ top: ["0%", "100%", "0%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

function Pricing() {
  return (
    <section id="pricing" className="py-24 border-y" style={{ borderColor: tokens.border, backgroundColor: tokens.surface }}>
      <div className="max-w-7xl mx-auto px-6">
        <Unfold3D>
          <div className="text-center mb-16">
            <p className="text-sm tracking-widest mb-2" style={{ color: tokens.accent1, fontFamily: 'var(--font-jetbrains-mono)' }}>ACCESS_LEVELS</p>
            <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tight" style={{ color: tokens.accent2, fontFamily: 'var(--font-space-grotesk)' }}>
              UPGRADE YOUR HUD
            </h2>
          </div>
        </Unfold3D>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PRICING.map(tier => (
            <motion.div
              key={tier.name}
              variants={staggerItem}
              className="p-8 border flex flex-col relative"
              style={{
                borderColor: tier.highlighted ? tokens.accent1 : tokens.border,
                backgroundColor: tokens.background,
              }}
            >
              {tier.highlighted && (
                <div className="absolute top-0 right-0 px-3 py-1 text-xs font-bold" style={{ backgroundColor: tokens.accent1, color: tokens.background, fontFamily: 'var(--font-jetbrains-mono)' }}>
                  RECOMMENDED
                </div>
              )}

              <h3 className="font-bold text-2xl mb-2 tracking-tight" style={{ color: tokens.accent2, fontFamily: 'var(--font-space-grotesk)' }}>{tier.name}</h3>
              <div className="flex items-end gap-2 mb-4">
                <span className="text-4xl font-bold" style={{ color: tokens.accent1, fontFamily: 'var(--font-jetbrains-mono)' }}>{tier.price}</span>
                <span className="text-sm mb-1" style={{ color: tokens.textLow, fontFamily: 'var(--font-jetbrains-mono)' }}>/{tier.period}</span>
              </div>
              <p className="text-sm mb-8" style={{ color: tokens.textLow, fontFamily: 'var(--font-jetbrains-mono)' }}>{tier.description}</p>

              <ul className="space-y-4 mb-10 flex-1">
                {tier.features.map(f => (
                  <li key={f} className="flex items-start gap-3 text-sm" style={{ fontFamily: 'var(--font-jetbrains-mono)' }}>
                    <span className="text-xs mt-0.5" style={{ color: tokens.accent1 }}>{'>'}</span>
                    <span style={{ color: tokens.accent2 }}>{f}</span>
                  </li>
                ))}
              </ul>

              <motion.button
                whileHover={{ backgroundColor: tier.highlighted ? tokens.accent2 : tokens.accent1, color: tokens.background }}
                whileTap={{ scale: 0.95 }}
                className="w-full h-12 font-bold text-sm tracking-widest transition-colors"
                style={tier.highlighted
                  ? { backgroundColor: tokens.accent1, color: tokens.background, fontFamily: 'var(--font-jetbrains-mono)' }
                  : { backgroundColor: 'transparent', color: tokens.accent2, border: `1px solid ${tokens.border}`, fontFamily: 'var(--font-jetbrains-mono)' }
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
    <section className="py-24" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-7xl mx-auto px-6">
        <Unfold3D>
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tight" style={{ color: tokens.accent2, fontFamily: 'var(--font-space-grotesk)' }}>
              USER_LOGS
            </h2>
          </div>
        </Unfold3D>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map(t => (
            <motion.div
              key={t.name}
              variants={staggerItem}
              className="p-6 border relative"
              style={{ borderColor: tokens.border, backgroundColor: tokens.surface }}
            >
              {/* Sticky-tape aesthetic in corner */}
              <div className="absolute -top-2 -right-2 w-8 h-8 opacity-50" style={{ background: `linear-gradient(45deg, transparent 50%, ${tokens.accent1} 50%)` }}></div>

              <p className="text-sm leading-relaxed mb-8" style={{ color: tokens.textHigh, fontFamily: 'var(--font-jetbrains-mono)' }}>"{t.text}"</p>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 border flex items-center justify-center font-bold text-lg" style={{ borderColor: tokens.border, backgroundColor: tokens.background, color: tokens.accent1, fontFamily: 'var(--font-space-grotesk)' }}>
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-sm tracking-tight" style={{ color: tokens.accent2, fontFamily: 'var(--font-space-grotesk)' }}>{t.name}</p>
                  <p className="text-xs tracking-widest" style={{ color: tokens.textLow, fontFamily: 'var(--font-jetbrains-mono)' }}>{t.role}</p>
                </div>
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
    <section id="faq" className="py-24 border-y" style={{ borderColor: tokens.border, backgroundColor: tokens.surface }}>
      <div className="max-w-3xl mx-auto px-6">
        <Unfold3D>
          <div className="mb-16 text-center">
            <p className="text-sm tracking-widest mb-2" style={{ color: tokens.accent1, fontFamily: 'var(--font-jetbrains-mono)' }}>QUERY_DATABASE</p>
            <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tight" style={{ color: tokens.accent2, fontFamily: 'var(--font-space-grotesk)' }}>
              FAQ
            </h2>
          </div>
        </Unfold3D>

        <div className="space-y-4">
          {FAQ_ITEMS.map((item, i) => (
            <Unfold3D key={i} delay={i * 0.1}>
              <div className="border" style={{ borderColor: tokens.border, backgroundColor: tokens.background }}>
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-bold tracking-tight text-lg" style={{ color: tokens.accent2, fontFamily: 'var(--font-space-grotesk)' }}>{item.q}</span>
                  <motion.div
                    animate={{ rotateX: openIndex === i ? 180 : 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  >
                    <ChevronDown className="h-5 w-5" style={{ color: tokens.accent1 }} />
                  </motion.div>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openIndex === i ? 'auto' : 0, opacity: openIndex === i ? 1 : 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  style={{ overflow: 'hidden' }}
                >
                  <div className="px-6 pb-6 pt-2 border-t mx-6 mt-2 text-sm leading-relaxed" style={{ borderColor: tokens.border, color: tokens.textLow, fontFamily: 'var(--font-jetbrains-mono)' }}>
                    {item.a}
                  </div>
                </motion.div>
              </div>
            </Unfold3D>
          ))}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="py-16" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2">
            <span className="font-bold text-3xl tracking-tighter block mb-4" style={{ color: tokens.accent2, fontFamily: 'var(--font-space-grotesk)' }}>
              ESPORTS<span style={{ color: tokens.accent1 }}>HUB</span>
            </span>
            <p className="text-sm max-w-sm" style={{ color: tokens.textLow, fontFamily: 'var(--font-jetbrains-mono)' }}>
              The newspaper from the future. Fast updates, glitchy breaking news, and pure data for the competitive gaming ecosystem.
            </p>
          </div>

          <div>
            <p className="font-bold text-sm tracking-widest mb-6" style={{ color: tokens.accent1, fontFamily: 'var(--font-jetbrains-mono)' }}>DATA_LINKS</p>
            <ul className="space-y-4">
              {['Live Matches', 'Tournament DB', 'Player Stats', 'API Docs'].map(item => (
                <li key={item}>
                  <a href="#" className="text-sm transition-colors hover:text-white" style={{ color: tokens.textLow, fontFamily: 'var(--font-jetbrains-mono)' }}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-bold text-sm tracking-widest mb-6" style={{ color: tokens.accent1, fontFamily: 'var(--font-jetbrains-mono)' }}>SYS_INFO</p>
            <ul className="space-y-4">
              {['Status', 'Terms of Use', 'Privacy Protocol', 'Contact_Admin'].map(item => (
                <li key={item}>
                  <a href="#" className="text-sm transition-colors hover:text-white" style={{ color: tokens.textLow, fontFamily: 'var(--font-jetbrains-mono)' }}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderColor: tokens.border }}>
          <p className="text-xs tracking-widest" style={{ color: tokens.textLow, fontFamily: 'var(--font-jetbrains-mono)' }}>
            © 2026 {PRODUCT_NAME} // ALL RIGHTS RESERVED
          </p>
          <a
            href="/"
            className="text-xs px-4 py-2 border tracking-widest transition-colors hover:bg-white/5"
            style={{ borderColor: tokens.border, color: tokens.textLow, fontFamily: 'var(--font-jetbrains-mono)' }}
          >
            {'< RETURN_TO_BASE'}
          </a>
        </div>
      </div>
    </footer>
  )
}

// ─────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────
export default function EsportsHubPage() {
  return (
    <div className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans selection:bg-[#00FF41] selection:text-black`} style={{ backgroundColor: tokens.background, color: tokens.textHigh }}>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Features />
        <Pricing />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />
      
      </div>
  )
}
