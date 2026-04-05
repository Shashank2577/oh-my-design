'use client'

import { motion, useReducedMotion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { JetBrains_Mono } from 'next/font/google'
import {
  Terminal, ShieldAlert, Cpu, Network, Database, Lock,
  Code2, Server, Command, ChevronDown
} from 'lucide-react'

// ─────────────────────────────────────────────
// FONTS
// ─────────────────────────────────────────────
const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

// ─────────────────────────────────────────────
// DESIGN TOKENS
// ─────────────────────────────────────────────
const tokens = {
  background: '#0a0a0a',
  foreground: '#33ff00',
  muted: '#1f521f',
  mutedForeground: '#1f521f',
  border: '#1f521f',
  accent: '#33ff00',
  accentForeground: '#0a0a0a',
  amber: '#ffb000',
  red: '#ff3333',
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
const PRODUCT_NAME = 'TERM_OS'
const TAGLINE = 'ROOT ACCESS GRANTED.'
const DESCRIPTION = 'DEPLOY SCALABLE INFRASTRUCTURE WITH COMMAND-LINE PRECISION. BYPASS THE GUI AND INTERACT DIRECTLY WITH THE MAINFRAME.'

const NAV_LINKS = ['FEATURES', 'PRICING', 'LOGS', 'HELP']

const STATS = [
  { value: '99.99%', label: 'UPTIME' },
  { value: '0.2MS', label: 'LATENCY' },
  { value: '10K+', label: 'NODES' },
  { value: '[OK]', label: 'SYS_STATUS' },
]

const FEATURES = [
  { icon: Terminal, title: 'DIRECT_ACCESS', description: 'EXECUTE COMMANDS WITH ZERO OVERHEAD. RAW TCP/UDP SOCKETS EXPOSED.' },
  { icon: ShieldAlert, title: 'SECURE_TUNNEL', description: 'END-TO-END ENCRYPTION USING CURVE25519 AND CHACHA20-POLY1305.' },
  { icon: Cpu, title: 'RESOURCE_ALLOC', description: 'DYNAMIC LOAD BALANCING ACROSS ALL DISTRIBUTED WORKER NODES.' },
  { icon: Network, title: 'PACKET_INSPECT', description: 'DEEP PACKET INSPECTION AND REAL-TIME NETWORK TRAFFIC ANALYSIS.' },
  { icon: Database, title: 'STATE_STORE', description: 'IN-MEMORY KEY-VALUE STORE WITH MILLISECOND READ/WRITE PERFORMANCE.' },
  { icon: Lock, title: 'ZERO_TRUST', description: 'MUTUAL TLS AUTHENTICATION FOR ALL INTERNAL MICROSERVICES.' },
]

const PRICING = [
  {
    name: 'GUEST',
    price: '$0',
    period: 'MO',
    description: 'READ-ONLY ACCESS.',
    features: ['1 SSH KEY', '100 REQ/SEC', 'COMMUNITY LOGS'],
    cta: '[ INIT_GUEST ]',
    highlighted: false,
  },
  {
    name: 'USER',
    price: '$29',
    period: 'MO',
    description: 'STANDARD PRIVILEGES.',
    features: ['10 SSH KEYS', '10K REQ/SEC', 'PRIORITY QUEUE', 'PRIVATE TUNNELS'],
    cta: '[ INIT_USER ]',
    highlighted: true,
  },
  {
    name: 'ROOT',
    price: '$99',
    period: 'MO',
    description: 'FULL SYSTEM CONTROL.',
    features: ['UNLIMITED KEYS', 'NO RATE LIMITS', 'DEDICATED IP', 'KERNEL ACCESS'],
    cta: '[ SU_ROOT ]',
    highlighted: false,
  },
]

const TESTIMONIALS = [
  {
    name: 'user_0x1A',
    role: 'SYSADMIN',
    company: 'SECTOR_7',
    text: 'FINALLY A TOOL THAT DOESNT HIDE BEHIND A BLOATED GUI. PURE TERMINAL BLISS.',
    rating: 5,
  },
  {
    name: 'netrunner99',
    role: 'OPERATOR',
    company: 'THE_GRID',
    text: 'LATENCY IS NON-EXISTENT. I CAN DEPLOY STACKS FASTER THAN I CAN TYPE.',
    rating: 5,
  },
  {
    name: 'root_admin',
    role: 'ARCHITECT',
    company: 'MAINFRAME_INC',
    text: 'SECURITY PROTOCOLS ARE SOLID. THIS IS THE ONLY TERMINAL I TRUST FOR PROD.',
    rating: 5,
  },
]

const FAQ_ITEMS = [
  { q: '> ./query --faq "START"', a: 'DOWNLOAD THE BINARY, CHMOD +X, AND RUN ./INSTALL.SH.' },
  { q: '> ./query --faq "CANCEL"', a: 'EXECUTE `RM -RF /OPT/TERMOS`. NO SUBSCRIPTION LOCK-IN.' },
  { q: '> ./query --faq "TRIAL"', a: '14-DAY TRIAL INCLUDED. RUN `TERMOS --TRIAL`.' },
  { q: '> ./query --faq "PAYMENT"', a: 'WE ACCEPT CRYPTO (BTC, XMR) AND STANDARD FIAT CARDS.' },
  { q: '> ./query --faq "SECURITY"', a: 'ALL DATA IS ENCRYPTED AT REST USING AES-256-GCM.' },
  { q: '> ./query --faq "API"', a: 'YES. REFER TO THE MAN PAGES: `MAN TERMOS_API`.' },
]

// ─────────────────────────────────────────────
// COMPONENTS
// ─────────────────────────────────────────────

function BlinkingCursor() {
  return (
    <motion.span
      animate={{ opacity: [1, 0, 1] }}
      transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
      className="inline-block w-[10px] h-[1em] ml-1 align-bottom bg-current"
    />
  )
}

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-dashed" style={{ borderColor: tokens.border, backgroundColor: tokens.background }}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <span className="font-bold text-lg tracking-widest text-shadow-glow">
          {PRODUCT_NAME}
        </span>
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-sm transition-colors hover:bg-[#33ff00] hover:text-black px-2"
              style={{ color: tokens.foreground }}
            >
              {link}
            </a>
          ))}
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-4 h-8 text-sm font-medium border uppercase hover:bg-[#33ff00] hover:text-black transition-colors"
          style={{ borderColor: tokens.accent, color: tokens.accent }}
        >
          [ LOGIN ]
        </motion.button>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section className="min-h-dvh flex items-center pt-16 relative overflow-hidden" style={{ backgroundColor: tokens.background }}>
      {/* Subtle Scanlines Overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-10 opacity-20"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(51, 255, 0, 0.3) 2px, rgba(51, 255, 0, 0.3) 4px)'
        }}
      />
      <div className="max-w-6xl mx-auto px-6 py-24 w-full relative z-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.15, delayChildren: 0.1 }}
          className="max-w-3xl"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm uppercase tracking-widest mb-4"
            style={{ color: tokens.amber }}
          >
            SYS_MSG: {PRODUCT_NAME} V.2.0.4 ONLINE.
          </motion.p>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-4xl md:text-6xl font-bold leading-tight mb-6 uppercase text-shadow-glow"
            style={{ color: tokens.foreground }}
          >
            <span className="opacity-50 mr-2">{'>'}</span>
            {TAGLINE}
            <BlinkingCursor />
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm md:text-base mb-10 max-w-2xl leading-relaxed uppercase"
            style={{ color: tokens.foreground }}
          >
            {DESCRIPTION}
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.button
              whileTap={{ y: 1 }}
              className="h-12 px-6 font-bold flex items-center gap-2 uppercase hover:bg-[#33ff00] hover:text-black border transition-colors"
              style={{ backgroundColor: tokens.background, color: tokens.accent, borderColor: tokens.accent }}
            >
              [ CONNECT ]
            </motion.button>
            <motion.button
              whileTap={{ y: 1 }}
              className="h-12 px-6 font-bold border border-dashed uppercase hover:bg-[#1f521f] transition-colors"
              style={{ borderColor: tokens.border, color: tokens.foreground }}
            >
              [ READ_DOCS ]
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Hero Visual */}
        <FadeUp delay={0.4}>
          <div className="mt-16 w-full p-4 border border-dashed" style={{ borderColor: tokens.border, backgroundColor: '#050505' }}>
            <div className="flex border-b border-dashed pb-2 mb-4" style={{ borderColor: tokens.border }}>
              <span className="text-xs uppercase" style={{ color: tokens.muted }}>+--- TERMINAL_SESSION ---+</span>
            </div>
            <pre className="text-xs overflow-x-auto whitespace-pre-wrap" style={{ color: tokens.foreground }}>
{`user@termos:~$ ping server -c 4
PING server (192.168.1.1): 56 data bytes
64 bytes from 192.168.1.1: icmp_seq=0 ttl=64 time=0.042 ms
64 bytes from 192.168.1.1: icmp_seq=1 ttl=64 time=0.038 ms
64 bytes from 192.168.1.1: icmp_seq=2 ttl=64 time=0.040 ms
64 bytes from 192.168.1.1: icmp_seq=3 ttl=64 time=0.041 ms

--- server ping statistics ---
4 packets transmitted, 4 packets received, 0.0% packet loss
user@termos:~$ ./deploy.sh
[INFO] INITIALIZING DEPLOYMENT...
[INFO] ALLOCATING RESOURCES... [|||||||||||||||||] 100%
[SUCCESS] DEPLOYMENT COMPLETE.`}
            </pre>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

function Stats() {
  return (
    <section className="border-y border-dashed relative z-20" style={{ borderColor: tokens.border, backgroundColor: tokens.background }}>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <StaggerContainer>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat, i) => (
              <motion.div key={stat.label} variants={staggerItem} className="text-left">
                <p className="text-xs mb-1" style={{ color: tokens.muted }}>VAR_{i} =</p>
                <p className="text-2xl font-bold text-shadow-glow" style={{ color: tokens.foreground }}>{stat.value}</p>
                <p className="text-xs" style={{ color: tokens.amber }}>// {stat.label}</p>
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
    <section id="features" className="py-24 relative z-20" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-6xl mx-auto px-6">
        <FadeUp>
          <div className="mb-16 border border-dashed p-4" style={{ borderColor: tokens.border }}>
            <p className="text-xs uppercase mb-2" style={{ color: tokens.amber }}>{'>'} ./list_modules</p>
            <h2 className="text-2xl md:text-3xl font-bold uppercase text-shadow-glow" style={{ color: tokens.foreground }}>
              SYSTEM_CAPABILITIES
            </h2>
          </div>
        </FadeUp>
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FEATURES.map((feature, i) => (
              <motion.div
                key={feature.title}
                variants={staggerItem}
                className="p-6 border group hover:bg-[#050505] transition-colors"
                style={{ borderColor: tokens.border }}
              >
                <div className="flex justify-between items-start mb-4">
                  <feature.icon className="h-6 w-6 group-hover:text-[#ffb000] transition-colors" style={{ color: tokens.accent }} strokeWidth={1.5} />
                  <span className="text-xs" style={{ color: tokens.muted }}>[MOD_0{i+1}]</span>
                </div>
                <h3 className="font-bold text-sm mb-2 uppercase" style={{ color: tokens.foreground }}>{feature.title}</h3>
                <p className="text-xs leading-relaxed uppercase" style={{ color: tokens.foreground }}>{feature.description}</p>
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
    <section className="py-24 border-y border-dashed relative z-20" style={{ borderColor: tokens.border, backgroundColor: tokens.background }}>
      <div className="max-w-4xl mx-auto px-6">
        <FadeUp>
          <div className="border border-dashed p-8 bg-[#050505]" style={{ borderColor: tokens.border }}>
            <div className="flex justify-between items-center border-b border-dashed pb-4 mb-8" style={{ borderColor: tokens.border }}>
               <h2 className="text-xl md:text-2xl font-bold uppercase text-shadow-glow" style={{ color: tokens.foreground }}>
                README.TXT
              </h2>
              <span className="text-xs" style={{ color: tokens.muted }}>SIZE: 4.2KB</span>
            </div>

            <div className="space-y-6 text-left text-sm uppercase leading-relaxed" style={{ color: tokens.foreground }}>
              <p>
                {'>'} TERMS OF OPERATION: THIS SYSTEM IS DESIGNED FOR MAXIMUM EFFICIENCY. WE ELIMINATED THE GUI TO REDUCE MEMORY FOOTPRINT AND INCREASE EXECUTION SPEED.
              </p>
              <p>
                {'>'} ARCHITECTURE: A DISTRIBUTED MESH NETWORK ALLOWS FOR PEER-TO-PEER DATA TRANSFER WITHOUT A CENTRAL POINT OF FAILURE. NODES COMMUNICATE VIA CUSTOM BINARY PROTOCOLS OVER TCP.
              </p>
              <p>
                {'>'} SECURITY: EVERYTHING IS AUDITED. EVERY REQUEST IS LOGGED. ZERO-TRUST IS NOT A BUZZWORD; IT IS THE DEFAULT STATE.
              </p>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

function Pricing() {
  return (
    <section id="pricing" className="py-24 relative z-20" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-6xl mx-auto px-6">
        <FadeUp>
          <div className="mb-16">
            <p className="text-xs uppercase mb-2" style={{ color: tokens.amber }}>{'>'} CAT /ETC/BILLING/TIERS.CONF</p>
            <h2 className="text-2xl md:text-3xl font-bold uppercase text-shadow-glow" style={{ color: tokens.foreground }}>ACCESS_LEVELS</h2>
          </div>
        </FadeUp>
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRICING.map(tier => (
              <motion.div
                key={tier.name}
                variants={staggerItem}
                className="p-6 border relative bg-[#050505]"
                style={{
                  borderColor: tier.highlighted ? tokens.accent : tokens.border,
                }}
              >
                {tier.highlighted && (
                  <span
                    className="absolute -top-3 left-4 px-2 py-0.5 text-[10px] font-bold uppercase border"
                    style={{ backgroundColor: tokens.background, color: tokens.accent, borderColor: tokens.accent }}
                  >
                    * RECOMMENDED *
                  </span>
                )}
                <h3 className="font-bold text-lg mb-4 uppercase border-b border-dashed pb-2" style={{ color: tokens.foreground, borderColor: tokens.border }}>
                  {tier.name}
                </h3>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-3xl font-bold text-shadow-glow" style={{ color: tokens.foreground }}>{tier.price}</span>
                  <span className="text-xs" style={{ color: tokens.amber }}>/{tier.period}</span>
                </div>
                <p className="text-xs mb-6 uppercase" style={{ color: tokens.foreground }}>{tier.description}</p>

                <div className="mb-8">
                  <p className="text-xs mb-2 uppercase" style={{ color: tokens.muted }}>--- CAPABILITIES ---</p>
                  <ul className="space-y-2">
                    {tier.features.map(f => (
                      <li key={f} className="flex items-center gap-2 text-xs uppercase">
                        <span style={{ color: tokens.accent }}>{'>'}</span>
                        <span style={{ color: tokens.foreground }}>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <motion.button
                  whileTap={{ y: 1 }}
                  className="w-full h-10 font-bold text-sm border uppercase hover:bg-[#33ff00] hover:text-black transition-colors"
                  style={tier.highlighted
                    ? { backgroundColor: tokens.background, color: tokens.accent, borderColor: tokens.accent }
                    : { backgroundColor: tokens.background, color: tokens.foreground, borderColor: tokens.border }
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
    <section id="logs" className="py-24 border-y border-dashed relative z-20" style={{ borderColor: tokens.border, backgroundColor: tokens.background }}>
      <div className="max-w-6xl mx-auto px-6">
        <FadeUp>
          <div className="mb-16">
            <p className="text-xs uppercase mb-2" style={{ color: tokens.amber }}>{'>'} TAIL -F /VAR/LOG/USER_FEEDBACK.LOG</p>
            <h2 className="text-2xl md:text-3xl font-bold uppercase text-shadow-glow" style={{ color: tokens.foreground }}>SYS_LOGS</h2>
          </div>
        </FadeUp>
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                variants={staggerItem}
                className="p-6 border border-dashed hover:bg-[#050505] transition-colors"
                style={{ borderColor: tokens.border }}
              >
                <div className="text-xs mb-4" style={{ color: tokens.muted }}>
                  [TS_{1000 + i * 42}] LOG_ENTRY:
                </div>
                <p className="text-sm leading-relaxed mb-6 uppercase" style={{ color: tokens.foreground }}>"{t.text}"</p>
                <div className="border-t border-dashed pt-4" style={{ borderColor: tokens.border }}>
                  <p className="font-bold text-xs uppercase" style={{ color: tokens.amber }}>AUTH: {t.name}</p>
                  <p className="text-xs uppercase" style={{ color: tokens.muted }}>UID: {t.role} @ {t.company}</p>
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
  return (
    <section id="help" className="py-24 relative z-20" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-3xl mx-auto px-6">
        <FadeUp>
          <div className="mb-16 border border-dashed p-4" style={{ borderColor: tokens.border }}>
            <p className="text-xs uppercase mb-2" style={{ color: tokens.amber }}>{'>'} MAN TERMOS</p>
            <h2 className="text-2xl md:text-3xl font-bold uppercase text-shadow-glow" style={{ color: tokens.foreground }}>MANUAL_PAGES</h2>
          </div>
        </FadeUp>
        <div className="space-y-6">
          {FAQ_ITEMS.map((item, i) => (
            <FadeUp key={i} delay={i * 0.05}>
              <div className="border-l-2 pl-4" style={{ borderColor: tokens.border }}>
                <p className="font-bold text-sm mb-2 uppercase" style={{ color: tokens.accent }}>{item.q}</p>
                <p className="text-sm uppercase leading-relaxed" style={{ color: tokens.foreground }}>
                  <span className="opacity-50 mr-2">{'|'}</span>
                  {item.a}
                </p>
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
    <section className="py-24 border-y border-dashed relative z-20" style={{ borderColor: tokens.border, backgroundColor: '#050505' }}>
      <div className="max-w-2xl mx-auto px-6">
        <FadeUp>
          <h2 className="text-2xl font-bold mb-4 uppercase text-shadow-glow" style={{ color: tokens.foreground }}>BROADCAST_RECEIVER</h2>
          <p className="text-sm mb-8 uppercase" style={{ color: tokens.foreground }}>
            SUBSCRIBE TO THE GLOBAL BROADCAST CHANNEL FOR CRITICAL SYSTEM UPDATES.
          </p>

          <div className="p-6 border border-dashed" style={{ borderColor: tokens.border }}>
            {status === 'success' ? (
              <p className="font-bold text-sm uppercase" style={{ color: tokens.accent }}>[OK] CONNECTION ESTABLISHED. AWAITING DATA.</p>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 flex items-center border-b" style={{ borderColor: tokens.accent }}>
                  <span className="mr-2" style={{ color: tokens.accent }}>{'>'}</span>
                  <input
                    type="email"
                    required
                    placeholder="ENTER_EMAIL_ADDR..."
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="flex-1 h-10 bg-transparent text-sm uppercase focus:outline-none"
                    style={{ color: tokens.foreground }}
                  />
                  {status === 'idle' && <BlinkingCursor />}
                </div>
                <motion.button
                  type="submit"
                  disabled={status === 'loading'}
                  whileTap={{ y: 1 }}
                  className="h-10 px-6 font-bold text-sm border uppercase hover:bg-[#33ff00] hover:text-black transition-colors disabled:opacity-50"
                  style={{ backgroundColor: tokens.background, color: tokens.accent, borderColor: tokens.accent }}
                >
                  {status === 'loading' ? '[ WAIT ]' : '[ SUBSCRIBE ]'}
                </motion.button>
              </form>
            )}
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

function Footer() {
  const links = {
    SYSTEM: ['CORE_DUMP', 'METRICS', 'CHANGELOG', 'ROADMAP'],
    ORG: ['ABOUT', 'TERMINALS', 'CAREERS', 'PGP_KEYS'],
    DOCS: ['MAN_PAGES', 'API_REF', 'GUIDES', 'UPTIME'],
    LEGAL: ['PRIVACY', 'TOS', 'COOKIES', 'SEC_AUDIT'],
  }

  return (
    <footer className="py-16 relative z-20" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <p className="font-bold text-lg mb-3 tracking-widest text-shadow-glow" style={{ color: tokens.foreground }}>{PRODUCT_NAME}</p>
            <p className="text-xs uppercase leading-relaxed" style={{ color: tokens.muted }}>
              EOF. END OF TRANSMISSION.
            </p>
          </div>
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <p className="font-bold text-xs mb-4 uppercase" style={{ color: tokens.amber }}>[{group}]</p>
              <ul className="space-y-2">
                {items.map(item => (
                  <li key={item}>
                    <a href="#" className="text-xs uppercase hover:underline hover:text-[#33ff00]" style={{ color: tokens.foreground }}>
                      {'>'} {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-dashed gap-4" style={{ borderColor: tokens.border }}>
          <p className="text-xs uppercase" style={{ color: tokens.muted }}>
            COPYRIGHT (C) 2084 {PRODUCT_NAME}.
          </p>
          <a
            href="/"
            className="text-xs px-3 py-1 border hover:bg-[#1f521f] transition-colors uppercase"
            style={{ borderColor: tokens.border, color: tokens.foreground }}
          >
            [ CD .. ]
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
    <div className={`${jetbrains.variable} font-mono min-h-screen selection:bg-[#33ff00] selection:text-black`} style={{ backgroundColor: tokens.background }}>
      <style dangerouslySetInnerHTML={{__html: `
        .text-shadow-glow {
          text-shadow: 0 0 5px rgba(51, 255, 0, 0.5);
        }
      `}} />
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
