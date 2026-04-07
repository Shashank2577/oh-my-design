'use client'

import { motion, useReducedMotion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google'
import {
  Zap, Lock, Layers, Globe, Check, ChevronDown,
  ArrowRight, Link, Shield, Activity, Coins, Box
} from 'lucide-react'

// ─────────────────────────────────────────────
// FONTS
// ─────────────────────────────────────────────
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const jetBrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

// ─────────────────────────────────────────────
// DESIGN TOKENS
// ─────────────────────────────────────────────
const tokens = {
  background: '#030304',
  surface: '#0F1115',
  foreground: '#FFFFFF',
  muted: '#94A3B8',
  border: '#1E293B',
  primary: '#F7931A',
  secondary: '#EA580C',
  tertiary: '#FFD600',
}

// ─────────────────────────────────────────────
// MOTION HELPERS
// ─────────────────────────────────────────────
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
        visible: { transition: { staggerChildren: 0.08 } },
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

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────
const PRODUCT_NAME = 'NEXUS_PROTOCOL'
const TAGLINE = 'THE FUTURE OF DECENTRALIZED FINANCE'
const DESCRIPTION = 'A SECURE, SCALABLE, AND FULLY DECENTRALIZED PROTOCOL DESIGNED TO POWER THE NEXT GENERATION OF FINANCIAL INFRASTRUCTURE.'

const NAV_LINKS = ['ECOSYSTEM', 'DEVELOPERS', 'GOVERNANCE', 'EXPLORER']

const STATS = [
  { value: '$12.4B', label: 'TOTAL_VALUE_LOCKED' },
  { value: '8.2M', label: 'ACTIVE_WALLETS' },
  { value: '450+', label: 'INTEGRATIONS' },
  { value: '1.2S', label: 'BLOCK_TIME' },
]

const FEATURES = [
  { icon: Lock, title: 'CRYPTOGRAPHIC_SECURITY', description: 'STATE-OF-THE-ART ENCRYPTION SECURES EVERY TRANSACTION ON THE LEDGER.' },
  { icon: Zap, title: 'LIGHTNING_FAST', description: 'OPTIMIZED CONSENSUS ALGORITHMS ENABLE NEAR-INSTANT SETTLEMENT SPEEDS.' },
  { icon: Layers, title: 'CROSS-CHAIN_COMPATIBILITY', description: 'SEAMLESSLY MOVE ASSETS BETWEEN MULTIPLE SUPPORTED BLOCKCHAINS.' },
  { icon: Globe, title: 'GLOBAL_ACCESSIBILITY', description: 'PERMISSIONLESS INFRASTRUCTURE AVAILABLE TO ANYONE, ANYWHERE.' },
  { icon: Shield, title: 'AUDITED_SMART_CONTRACTS', description: 'RIGOROUSLY TESTED BY TOP TIER SECURITY FIRMS.' },
  { icon: Coins, title: 'YIELD_GENERATION', description: 'STAKE YOUR ASSETS TO EARN PASSIVE REWARDS IN OUR LIQUIDITY POOLS.' },
]

const PRICING = [
  {
    name: 'NODE_OPERATOR',
    price: '0.05 ETH',
    period: 'EPOCH',
    description: 'RUN A LIGHT NODE AND SECURE THE NETWORK.',
    features: ['BASIC VALIDATION', 'COMMUNITY VOTING', 'STANDARD REWARDS', 'DISCORD ACCESS'],
    cta: 'START_NODE',
    highlighted: false,
  },
  {
    name: 'VALIDATOR_PRO',
    price: '0.5 ETH',
    period: 'EPOCH',
    description: 'FOR PROFESSIONAL INFRASTRUCTURE PROVIDERS.',
    features: ['FULL ARCHIVE NODE', 'PROPOSAL RIGHTS', 'BOOSTED REWARDS', 'VIP SUPPORT', 'API_ACCESS'],
    cta: 'BECOME_VALIDATOR',
    highlighted: true,
  },
  {
    name: 'INSTITUTIONAL',
    price: '5.0 ETH',
    period: 'EPOCH',
    description: 'ENTERPRISE-GRADE STAKING SOLUTIONS.',
    features: ['WHITELABEL NODES', 'BOARD SEAT', 'MAXIMUM YIELD', 'DEDICATED REP', 'CUSTOM_SLA'],
    cta: 'CONTACT_TEAM',
    highlighted: false,
  },
]

const TESTIMONIALS = [
  {
    name: '0xAlpha',
    role: 'DEFI_RESEARCHER',
    company: 'CRYPTO_VENTURES',
    text: 'THE SCALABILITY OF NEXUS PROTOCOL IS UNMATCHED. IT HAS COMPLETELY CHANGED HOW WE DEPLOY CAPITAL.',
    rating: 5,
  },
  {
    name: 'Satoshi_Fan',
    role: 'SMART_CONTRACT_DEV',
    company: 'BLOCK_BUILDERS',
    text: 'THE DOCUMENTATION IS PRISTINE, AND THE TESTNET ENVIRONMENT IS FLAWLESS. A DEVELOPER\'S DREAM.',
    rating: 5,
  },
  {
    name: 'Yield_Farmer_Joe',
    role: 'LIQUIDITY_PROVIDER',
    company: 'DEGEN_FUNDS',
    text: 'I\'VE BEEN FARMING HERE FOR MONTHS. THE APY IS STABLE AND THE PLATFORM IS INCREDIBLY SECURE.',
    rating: 5,
  },
]

const FAQ_ITEMS = [
  { q: 'HOW DO I CONNECT MY WALLET?', a: 'CLICK THE "CONNECT" BUTTON IN THE TOP RIGHT. WE SUPPORT METAMASK, WALLETCONNECT, AND HARDWARE WALLETS.' },
  { q: 'WHAT ARE THE GAS FEES?', a: 'OUR LAYER 2 SOLUTION KEEPS FEES CONSISTENTLY UNDER $0.01 PER TRANSACTION.' },
  { q: 'IS THE PROTOCOL OPEN SOURCE?', a: 'YES, ALL CONTRACTS ARE VERIFIED AND AVAILABLE ON OUR GITHUB REPOSITORY.' },
  { q: 'HOW DOES GOVERNANCE WORK?', a: 'TOKEN HOLDERS CAN PROPOSE AND VOTE ON PROTOCOL UPGRADES VIA OUR SNAPSHOT PORTAL.' },
  { q: 'WHAT HAPPENS IF A TRANSACTION FAILS?', a: 'FAILED TRANSACTIONS ARE REVERTED IMMEDIATELY, AND GAS IS REFUNDED MINUS THE BASE FEE.' },
  { q: 'HOW CAN I RUN A NODE?', a: 'CHECK OUR DOCUMENTATION FOR HARDWARE REQUIREMENTS AND SETUP INSTRUCTIONS.' },
]

// ─────────────────────────────────────────────
// COMPONENTS
// ─────────────────────────────────────────────

function GlobalStyles() {
  return (
    <style dangerouslySetInnerHTML={{__html: `
      .bg-grid-pattern {
        background-size: 50px 50px;
        background-image:
          linear-gradient(to right, rgba(30, 41, 59, 0.5) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(30, 41, 59, 0.5) 1px, transparent 1px);
        mask-image: radial-gradient(circle at center, black 40%, transparent 100%);
        -webkit-mask-image: radial-gradient(circle at center, black 40%, transparent 100%);
      }
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-20px); }
      }
      .animate-float {
        animation: float 8s ease-in-out infinite;
      }
    `}} />
  )
}

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#030304]/80 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <span className="font-heading font-bold text-xl tracking-tight flex items-center gap-2" style={{ color: tokens.foreground }}>
          <Box className="h-6 w-6" style={{ color: tokens.primary }} />
          {PRODUCT_NAME}
        </span>
        <div className="hidden md:flex items-center gap-8 font-mono text-sm">
          {NAV_LINKS.map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="transition-colors hover:text-[#F7931A]"
              style={{ color: tokens.muted }}
            >
              {link}
            </a>
          ))}
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="h-10 px-6 rounded-full font-mono text-sm font-bold uppercase transition-all shadow-[0_0_20px_-5px_rgba(234,88,12,0.5)] hover:shadow-[0_0_30px_-5px_rgba(247,147,26,0.6)]"
          style={{ backgroundImage: `linear-gradient(to right, ${tokens.secondary}, ${tokens.primary})`, color: tokens.foreground }}
        >
          CONNECT_WALLET
        </motion.button>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section className="min-h-dvh flex items-center pt-20 relative overflow-hidden bg-[#030304]">
      {/* Background Grid & Blurs */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 z-0" />
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#F7931A] opacity-10 blur-[120px] rounded-full z-0 pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-[#EA580C] opacity-10 blur-[100px] rounded-full z-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-24 w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.15, delayChildren: 0.1 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#F7931A]/30 bg-[#F7931A]/10 mb-6 font-mono text-xs text-[#F7931A]"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F7931A] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F7931A]"></span>
            </span>
            MAINNET V2 IS LIVE
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="font-heading text-5xl md:text-7xl font-bold leading-tight mb-6"
            style={{ color: tokens.foreground }}
          >
            <span className="block">THE FUTURE OF</span>
            <span className="bg-gradient-to-r from-[#F7931A] to-[#FFD600] bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(247,147,26,0.3)]">
              DECENTRALIZED FINANCE
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-body text-lg mb-10 max-w-lg leading-relaxed"
            style={{ color: tokens.muted }}
          >
            {DESCRIPTION}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="h-12 px-8 rounded-full font-body font-semibold flex items-center justify-center gap-2 shadow-[0_0_20px_-5px_rgba(234,88,12,0.5)] hover:shadow-[0_0_30px_-5px_rgba(247,147,26,0.6)] transition-all"
              style={{ backgroundImage: `linear-gradient(to right, ${tokens.secondary}, ${tokens.primary})`, color: tokens.foreground }}
            >
              START_BUILDING <ArrowRight className="h-4 w-4" />
            </motion.button>
            <motion.button
              whileHover={{ backgroundColor: 'rgba(255,255,255,0.1)', borderColor: '#fff' }}
              whileTap={{ scale: 0.95 }}
              className="h-12 px-8 rounded-full font-body font-semibold border-2 flex items-center justify-center transition-all"
              style={{ borderColor: 'rgba(255,255,255,0.2)', color: tokens.foreground }}
            >
              EXPLORE_ECOSYSTEM
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Hero 3D Abstract Graphic */}
        <FadeUp delay={0.4}>
          <div className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center">
            {/* Outer Ring */}
            <div className="absolute w-[300px] h-[300px] md:w-[400px] md:h-[400px] border border-[#F7931A]/30 rounded-full animate-[spin_15s_linear_infinite]" />
            <div className="absolute w-[300px] h-[300px] md:w-[400px] md:h-[400px] border border-[#EA580C]/20 rounded-full animate-[spin_10s_linear_infinite_reverse] rotate-45" />

            {/* Center Orb */}
            <div className="relative z-10 w-[150px] h-[150px] md:w-[200px] md:h-[200px] rounded-full animate-float shadow-[0_0_50px_rgba(247,147,26,0.4)]"
                 style={{ background: `radial-gradient(circle at 30% 30%, ${tokens.tertiary}, ${tokens.primary}, ${tokens.secondary})` }}
            >
              <div className="absolute inset-0 bg-black/20 rounded-full backdrop-blur-sm" />
            </div>

            {/* Floating Elements */}
            <div className="absolute top-[20%] right-[10%] animate-float" style={{ animationDelay: '1s' }}>
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-3 shadow-[0_0_20px_rgba(247,147,26,0.15)] flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-[#F7931A]/20 flex items-center justify-center">
                  <Activity className="h-4 w-4 text-[#F7931A]" />
                </div>
                <div>
                  <p className="font-mono text-[10px] text-[#94A3B8]">CURRENT_TPS</p>
                  <p className="font-mono text-sm font-bold text-white">4,285</p>
                </div>
              </div>
            </div>

            <div className="absolute bottom-[20%] left-[10%] animate-float" style={{ animationDelay: '2s' }}>
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-3 shadow-[0_0_20px_rgba(247,147,26,0.15)] flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-[#FFD600]/20 flex items-center justify-center">
                  <Shield className="h-4 w-4 text-[#FFD600]" />
                </div>
                <div>
                  <p className="font-mono text-[10px] text-[#94A3B8]">LATEST_BLOCK</p>
                  <p className="font-mono text-sm font-bold text-white">#184,902</p>
                </div>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

function Stats() {
  return (
    <section className="border-y border-white/10 relative z-20 bg-[#0F1115]">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <StaggerContainer>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={staggerItem}
                className={`text-left ${i !== 0 ? 'lg:border-l lg:border-white/10 lg:pl-8' : ''}`}
              >
                <p className="font-mono text-xs mb-2 tracking-widest" style={{ color: tokens.muted }}>{stat.label}</p>
                <p className="font-heading text-3xl md:text-4xl font-bold" style={{ color: tokens.foreground }}>{stat.value}</p>
              </motion.div>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  )
}

function Features() {
  return (
    <section id="ecosystem" className="py-24 relative z-10 bg-[#030304]">
      <div className="max-w-7xl mx-auto px-6">
        <FadeUp>
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4" style={{ color: tokens.foreground }}>
              BUILT FOR THE DECENTRALIZED WEB
            </h2>
            <p className="font-body text-lg max-w-2xl mx-auto" style={{ color: tokens.muted }}>
              OUR ARCHITECTURE PROVIDES THE FOUNDATION FOR SECURE, HIGH-PERFORMANCE BLOCKCHAIN APPLICATIONS.
            </p>
          </div>
        </FadeUp>
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map(feature => (
              <motion.div
                key={feature.title}
                variants={staggerItem}
                className="group relative p-8 rounded-2xl border border-white/10 bg-[#0F1115] hover:-translate-y-1 hover:border-[#F7931A]/50 hover:shadow-[0_0_30px_-10px_rgba(247,147,26,0.2)] transition-all duration-300 overflow-hidden"
              >
                {/* Watermark Icon */}
                <feature.icon className="absolute -right-4 -bottom-4 h-32 w-32 opacity-5 group-hover:opacity-10 group-hover:text-[#F7931A] transition-all duration-500" strokeWidth={1} />

                <div className="relative z-10">
                  <div className="h-12 w-12 rounded-lg bg-[#EA580C]/10 border border-[#EA580C]/30 flex items-center justify-center mb-6 group-hover:shadow-[0_0_20px_rgba(234,88,12,0.4)] transition-all duration-300">
                    <feature.icon className="h-6 w-6" style={{ color: tokens.primary }} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-heading font-semibold text-xl mb-3" style={{ color: tokens.foreground }}>{feature.title}</h3>
                  <p className="font-body text-sm leading-relaxed" style={{ color: tokens.muted }}>{feature.description}</p>
                </div>
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
    <section id="developers" className="py-24 border-y border-white/10 relative z-10 bg-[#0F1115] overflow-hidden">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#F7931A]/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <FadeUp>
          <div>
            <h2 className="font-heading text-3xl md:text-5xl font-bold mb-6" style={{ color: tokens.foreground }}>
              THE CONSENSUS ENGINE
            </h2>
            <div className="space-y-6 font-body text-lg leading-relaxed text-[#94A3B8]">
              <p>
                NEXUS PROTOCOL UTILIZES A NOVEL PROOF-OF-STAKE ALGORITHM THAT GUARANTEES FINALITY IN UNDER TWO SECONDS WHILE MAINTAINING STRICT BYZANTINE FAULT TOLERANCE.
              </p>
              <p>
                EVERY NODE VERIFIES EVERY TRANSACTION. THE CRYPTOGRAPHIC ACCURACY IS ABSOLUTE, ENSURING YOUR ASSETS REMAIN SECURE UNDER ANY NETWORK CONDITIONS.
              </p>
            </div>
            <div className="mt-8 flex items-center gap-4">
              <span className="font-mono text-sm text-[#F7931A] px-3 py-1 rounded-lg border border-[#F7931A]/30 bg-[#F7931A]/10">
                CURRENT_EPOCH: 48,902
              </span>
            </div>
          </div>
        </FadeUp>

        {/* Timeline / How It Works Visual */}
        <FadeUp delay={0.2}>
          <div className="relative pl-8">
            {/* Vertical Line */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-[#F7931A] via-[#F7931A]/50 to-transparent" />

            <div className="space-y-12">
              {[
                { title: 'TRANSACTION_INITIATED', desc: 'USER SIGNS PAYLOAD VIA WALLET' },
                { title: 'MEMPOOL_VALIDATION', desc: 'NETWORK NODES VERIFY CRYPTOGRAPHIC SIGNATURE' },
                { title: 'BLOCK_PROPOSAL', desc: 'VALIDATOR ASSEMBLES AND BROADCASTS BLOCK' },
                { title: 'FINALITY_ACHIEVED', desc: 'CONSENSUS REACHED. STATE IS UPDATED GLOBALLY' },
              ].map((step, i) => (
                <div key={i} className="relative">
                  {/* Node Dot */}
                  <div className="absolute -left-[37px] top-1 h-4 w-4 rounded-full border-2 border-[#0F1115] bg-[#F7931A] shadow-[0_0_10px_rgba(247,147,26,0.8)]" />

                  <div className="bg-[#030304] border border-white/10 rounded-xl p-6 relative">
                    {/* Corner Accents */}
                    <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#F7931A] rounded-tl-xl" />
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#F7931A] rounded-br-xl" />

                    <h4 className="font-mono text-sm font-bold text-white mb-2">{step.title}</h4>
                    <p className="font-mono text-xs text-[#94A3B8]">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

function Pricing() {
  return (
    <section id="governance" className="py-24 relative z-10 bg-[#030304]">
      <div className="max-w-7xl mx-auto px-6">
        <FadeUp>
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4" style={{ color: tokens.foreground }}>SECURE THE NETWORK</h2>
            <p className="font-body text-lg text-[#94A3B8]">CHOOSE YOUR VALIDATOR TIER AND START EARNING YIELD.</p>
          </div>
        </FadeUp>
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRICING.map(tier => (
              <motion.div
                key={tier.name}
                variants={staggerItem}
                className="relative p-8 rounded-2xl border transition-all duration-300 bg-[#0F1115]"
                style={{
                  borderColor: tier.highlighted ? tokens.primary : 'rgba(255,255,255,0.1)',
                  transform: tier.highlighted ? 'scale(1.05)' : 'scale(1)',
                  zIndex: tier.highlighted ? 10 : 1,
                  boxShadow: tier.highlighted ? `0 0 40px -10px rgba(247,147,26,0.15)` : 'none',
                  opacity: tier.highlighted ? 1 : 0.8
                }}
                whileHover={{ opacity: 1, scale: tier.highlighted ? 1.05 : 1.02 }}
              >
                {tier.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#EA580C] to-[#F7931A] text-white font-mono text-xs font-bold px-3 py-1 rounded-full shadow-[0_0_10px_rgba(247,147,26,0.5)]">
                    OPTIMAL_YIELD
                  </div>
                )}
                <h3 className="font-mono text-sm font-bold tracking-widest mb-4 text-[#94A3B8]">{tier.name}</h3>
                <div className="mb-6">
                  <span className="font-heading text-4xl font-bold text-white">{tier.price}</span>
                  <span className="font-mono text-sm text-[#94A3B8]"> / {tier.period}</span>
                </div>
                <p className="font-body text-sm mb-8 text-[#94A3B8] h-10">{tier.description}</p>
                <ul className="space-y-4 mb-8">
                  {tier.features.map(f => (
                    <li key={f} className="flex items-center gap-3 font-mono text-xs">
                      <Check className="h-4 w-4 shrink-0 text-[#F7931A]" />
                      <span className="text-white">{f}</span>
                    </li>
                  ))}
                </ul>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full h-12 rounded-full font-mono text-sm font-bold border transition-all"
                  style={tier.highlighted
                    ? { backgroundImage: `linear-gradient(to right, ${tokens.secondary}, ${tokens.primary})`, color: tokens.foreground, borderColor: 'transparent', boxShadow: `0 0 20px -5px rgba(234,88,12,0.5)` }
                    : { backgroundColor: 'transparent', color: tokens.foreground, borderColor: 'rgba(255,255,255,0.2)' }
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
    <section className="py-24 border-y border-white/10 relative z-10 bg-[#0F1115]">
      <div className="max-w-7xl mx-auto px-6">
        <FadeUp>
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-white">ON-CHAIN VERIFIED REVIEWS</h2>
          </div>
        </FadeUp>
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map(t => (
              <motion.div
                key={t.name}
                variants={staggerItem}
                className="p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm"
              >
                <div className="flex mb-6 gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <div key={i} className="h-2 w-8 bg-[#FFD600] rounded-full shadow-[0_0_10px_rgba(255,214,0,0.5)]" />
                  ))}
                </div>
                <p className="font-body text-sm leading-relaxed mb-6 text-white">"{t.text}"</p>
                <div>
                  <p className="font-mono font-bold text-sm text-[#F7931A]">{t.name}</p>
                  <p className="font-mono text-xs text-[#94A3B8]">{t.role} // {t.company}</p>
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
    <section id="explorer" className="py-24 relative z-10 bg-[#030304]">
      <div className="max-w-3xl mx-auto px-6">
        <FadeUp>
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-white">KNOWLEDGE_BASE</h2>
          </div>
        </FadeUp>
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, i) => (
            <FadeUp key={i} delay={i * 0.05}>
              <div className="border border-white/10 rounded-xl overflow-hidden bg-[#0F1115] transition-colors hover:border-white/20">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F7931A]"
                >
                  <span className="font-mono text-sm font-bold text-white">{item.q}</span>
                  <motion.span
                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="h-5 w-5 text-[#F7931A]" />
                  </motion.span>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openIndex === i ? 'auto' : 0, opacity: openIndex === i ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  style={{ overflow: 'hidden' }}
                >
                  <p className="px-6 pb-6 font-body text-sm leading-relaxed text-[#94A3B8]">
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
    <section className="py-24 border-y border-white/10 relative z-10 bg-[#0F1115] overflow-hidden">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#F7931A]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="max-w-2xl mx-auto px-6 text-center relative z-10">
        <FadeUp>
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4 text-white">SUBSCRIBE TO PROTOCOL UPDATES</h2>
          <p className="font-body text-lg mb-8 text-[#94A3B8]">
            RECEIVE CRITICAL NETWORK ALERTS AND GOVERNANCE PROPOSALS DIRECTLY.
          </p>
          {status === 'success' ? (
            <p className="font-mono font-bold text-[#FFD600] drop-shadow-[0_0_10px_rgba(255,214,0,0.5)]">TX_CONFIRMED. SUBSCRIPTION ACTIVE.</p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                required
                placeholder="WALLET_ADDRESS_OR_EMAIL"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="flex-1 h-12 px-4 rounded-lg bg-black/50 border-b-2 border-white/20 font-mono text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#F7931A] focus:shadow-[0_10px_20px_-10px_rgba(247,147,26,0.3)] transition-all"
              />
              <motion.button
                type="submit"
                disabled={status === 'loading'}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="h-12 px-8 rounded-full font-mono text-sm font-bold disabled:opacity-60 shadow-[0_0_20px_-5px_rgba(234,88,12,0.5)]"
                style={{ backgroundImage: `linear-gradient(to right, ${tokens.secondary}, ${tokens.primary})`, color: tokens.foreground }}
              >
                {status === 'loading' ? 'PROCESSING...' : 'SIGN_TX'}
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
    PROTOCOL: ['ECOSYSTEM', 'WHITE_PAPER', 'TOKENOMICS', 'AUDITS'],
    DEVELOPERS: ['DOCUMENTATION', 'GITHUB', 'BOUNTIES', 'GRANTS'],
    GOVERNANCE: ['FORUM', 'SNAPSHOT', 'DELEGATES', 'TREASURY'],
    SOCIAL: ['TWITTER_X', 'DISCORD', 'TELEGRAM', 'MIRROR'],
  }

  return (
    <footer className="py-16 relative z-10 bg-[#030304]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <p className="font-heading font-bold text-xl mb-3 text-white flex items-center gap-2">
              <Box className="h-5 w-5 text-[#F7931A]" />
              {PRODUCT_NAME}
            </p>
            <p className="font-body text-sm leading-relaxed text-[#94A3B8]">
              DECENTRALIZING THE WORLD'S FINANCIAL INFRASTRUCTURE ONE BLOCK AT A TIME.
            </p>
          </div>
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <p className="font-mono text-xs font-bold mb-4 text-[#F7931A]">{group}</p>
              <ul className="space-y-3">
                {items.map(item => (
                  <li key={item}>
                    <a href="#" className="font-mono text-xs text-[#94A3B8] hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10 gap-4">
          <p className="font-mono text-xs text-[#94A3B8]">
            © 2026 {PRODUCT_NAME}. ALL RIGHTS RESERVED.
          </p>
          <a
            href="/"
            className="font-mono text-xs px-4 py-2 rounded-full border border-white/20 text-white hover:bg-white/10 transition-all"
          >
            {'<-'} RETURN_TO_DIRECTORY
          </a>
        </div>
      </div>
    </footer>
  )
}

// ─────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────
export default function StylePage() {
  return (
    <div className={`${spaceGrotesk.variable} ${inter.variable} ${jetBrains.variable} min-h-screen bg-[#030304] text-white selection:bg-[#F7931A] selection:text-black overflow-x-hidden`}>
      <GlobalStyles />
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
