'use client'

import { motion, useReducedMotion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Inter, Space_Mono } from 'next/font/google'
import {
  Terminal, Sparkles, Command, Cpu, Layers, GitBranch, ArrowRight, Check, Search, Share2, Shield, Menu, X, ChevronDown
} from 'lucide-react'

// Using Inter as a fallback for Matter (which is geometric but approachable)
const interFont = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

// Using Space Mono as fallback for Geist Mono / Matter Mono
const monoFont = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

// Warp Design Tokens
const tokens = {
  // Canvas
  deepVoid: '#121110', // Earthy near-black

  // Text
  warmParchment: '#faf9f6',
  ashGray: '#afaeac',
  stoneGray: '#868584',
  mutedPurple: '#666469',

  // Surfaces & Borders
  earthGray: '#353534',
  darkCharcoal: '#222120',
  mistBorder: 'rgba(226, 226, 226, 0.15)', // Adjusted opacity for better contrast
  frostedVeil: 'rgba(255, 255, 255, 0.04)',
}

// ─────────────────────────────────────────────
// MOTION HELPERS
// ─────────────────────────────────────────────
function FadeUp({ children, delay = 0, className = "", style }: { children: React.ReactNode; delay?: number; className?: string; style?: React.CSSProperties }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-5% 0px' })
  const shouldReduce = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      initial={shouldReduce ? false : { opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
      style={style}
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
      initial={shouldReduce ? false : 'hidden'}
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const staggerItem: import('framer-motion').Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
}

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────
const PRODUCT_NAME = 'Warp'
const TAGLINE = 'The terminal for the 21st century'
const DESCRIPTION = 'Warp is a modern, Rust-based terminal with AI built in so you and your team can build great software, faster.'

const NAV_LINKS = ['Features', 'Warp AI', 'Warp Drive', 'Pricing', 'Blog']

const FEATURES = [
  { icon: Terminal, title: 'Input like an IDE', description: 'Click anywhere to move your cursor. Select, copy, and paste just like you would in a modern code editor. No more fighting with your terminal.' },
  { icon: Layers, title: 'Blocks, not walls of text', description: 'Every command and its output is grouped into a Block. Copy, share, or save entire command outputs with a single click.' },
  { icon: Sparkles, title: 'AI built-in', description: 'Forget a command? Just ask Warp AI to generate it for you. Or use it to debug obscure error messages directly in your terminal.' },
  { icon: Share2, title: 'Warp Drive', description: 'Save your most-used commands and share them securely with your team. Turn tribal knowledge into executable workflows.' },
  { icon: Command, title: 'Command Palette', description: 'Navigate your terminal, run workflows, and access settings without taking your hands off the keyboard.' },
  { icon: Cpu, title: 'Native Performance', description: 'Built from the ground up in Rust and rendered on the GPU. Warp is blazingly fast and extremely resource efficient.' },
]

const PRICING = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'For individuals looking to supercharge their terminal experience.',
    features: ['Modern text editing', 'Blocks & visual history', 'Basic Warp AI', 'Local command saving'],
    cta: 'Download Warp',
    highlighted: false,
  },
  {
    name: 'Team',
    price: '$12',
    period: 'per user / month',
    description: 'For teams that want to share knowledge and commands securely.',
    features: ['Everything in Free', 'Shared team workflows', 'Advanced Warp AI', 'Team access controls'],
    cta: 'Start Free Trial',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For organizations needing advanced security and administration.',
    features: ['Everything in Team', 'SSO / SAML', 'SOC2 compliance', 'Dedicated support', 'Centralized billing'],
    cta: 'Contact Sales',
    highlighted: false,
  },
]

const TESTIMONIALS = [
  {
    name: 'David Heinemeier Hansson',
    role: 'CEO, Vercel',
    text: 'Warp is the first terminal I\'ve used that feels like it belongs in this decade. The IDE-like text editing is a game changer.',
  },
  {
    name: 'Guillermo Rauch',
    role: 'Founder',
    text: 'The blocks feature fundamentally changes how I interact with my terminal history. Being able to copy a specific output effortlessly is magic.',
  },
  {
    name: 'Malte Ubl',
    role: 'CTO',
    text: 'Warp AI has become my pair programmer for bash scripting. It understands the context of my terminal and gives me exactly what I need.',
  },
]

const FAQ_ITEMS = [
  { q: 'Is Warp available on Windows or Linux?', a: 'Warp is currently available for macOS and Linux. Windows support is actively in development.' },
  { q: 'Does Warp support my existing dotfiles?', a: 'Yes! Warp is compatible with bash, zsh, and fish. It works seamlessly with your existing aliases, functions, and environment variables.' },
  { q: 'Is Warp open source?', a: 'Warp is a closed-source application built in Rust, but we are committed to building an open ecosystem around it.' },
  { q: 'What does "Blocks" mean?', a: 'Unlike traditional terminals that output a continuous stream of text, Warp separates every command and its output into distinct, interactive elements called Blocks.' },
]

// ─────────────────────────────────────────────
// COMPONENTS
// ─────────────────────────────────────────────

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#121110]/80 backdrop-blur-md border-b" style={{ borderColor: tokens.mistBorder }}>
      <div className="max-w-[1500px] mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <span className="font-medium text-xl" style={{ color: tokens.warmParchment }}>
            Warp
          </span>
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(link => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(' ', '-')}`}
                className="text-[16px] transition-colors"
                style={{ color: tokens.stoneGray, fontWeight: 400 }}
                onMouseEnter={(e) => e.currentTarget.style.color = tokens.warmParchment}
                onMouseLeave={(e) => e.currentTarget.style.color = tokens.stoneGray}
              >
                {link}
              </a>
            ))}
          </div>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <a href="#" className="text-[16px] transition-colors" style={{ color: tokens.stoneGray, fontWeight: 400 }}
             onMouseEnter={(e) => e.currentTarget.style.color = tokens.warmParchment}
             onMouseLeave={(e) => e.currentTarget.style.color = tokens.stoneGray}>
            Sign in
          </a>
          <button
            className="px-4 py-2 rounded-[50px] text-[16px] transition-colors hover:bg-[#454545]"
            style={{
              backgroundColor: tokens.earthGray,
              color: tokens.ashGray,
              fontWeight: 500,
            }}
          >
            Download
          </button>
        </div>

        <button
          className="md:hidden text-[#faf9f6]"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-[#121110] border-b p-6 flex flex-col gap-4" style={{ borderColor: tokens.mistBorder }}>
           {NAV_LINKS.map(link => (
              <a key={link} href={`#${link.toLowerCase().replace(' ', '-')}`} className="text-[18px]" style={{ color: tokens.warmParchment }}>
                {link}
              </a>
            ))}
            <div className="h-px w-full my-2" style={{ backgroundColor: tokens.mistBorder }} />
            <a href="#" className="text-[18px]" style={{ color: tokens.warmParchment }}>Sign in</a>
            <button className="w-full py-3 mt-2 rounded-[50px] text-[16px]" style={{ backgroundColor: tokens.earthGray, color: tokens.warmParchment }}>
              Download
            </button>
        </div>
      )}
    </nav>
  )
}

function Hero() {
  return (
    <section className="pt-32 pb-24 relative overflow-hidden" style={{ backgroundColor: tokens.deepVoid }}>
      <div className="max-w-[1500px] mx-auto px-6 relative z-10 flex flex-col items-center text-center">

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="max-w-[900px] mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-3 py-1 mb-10 rounded-[6px]"
            style={{ backgroundColor: tokens.frostedVeil }}
          >
            <span className="text-[12px] uppercase" style={{ color: tokens.warmParchment, fontWeight: 400, letterSpacing: '2.4px' }}>
              Warp for Linux is now available
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-[48px] md:text-[64px] lg:text-[80px] mb-8"
            style={{
              color: tokens.warmParchment,
              fontWeight: 400,
              lineHeight: 1.0,
              letterSpacing: '-2.4px'
            }}
          >
            {TAGLINE}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[18px] md:text-[20px] mb-12 max-w-[640px] mx-auto"
            style={{
              color: tokens.ashGray,
              lineHeight: 1.4,
              letterSpacing: '-0.2px'
            }}
          >
            {DESCRIPTION}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
             <button
              className="px-8 py-4 rounded-[50px] text-[16px] transition-colors hover:bg-[#454545] w-full sm:w-auto"
              style={{
                backgroundColor: tokens.earthGray,
                color: tokens.warmParchment,
                fontWeight: 500,
              }}
            >
              Download Warp
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Hero Terminal Mockup */}
      <FadeUp delay={0.4} className="mt-20 max-w-[1200px] mx-auto px-6">
        <div className="w-full aspect-video md:aspect-[21/9] rounded-[12px] bg-[#1a1918] overflow-hidden border flex flex-col" style={{ borderColor: tokens.mistBorder }}>
           <div className="h-10 border-b flex items-center px-4 gap-2 bg-[#222120]" style={{ borderColor: tokens.mistBorder }}>
             <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
             <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
             <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
           </div>
           <div className="flex-1 p-6 font-mono text-[14px]" style={{ color: tokens.warmParchment, fontFamily: 'var(--font-mono)' }}>
             <div className="flex items-center gap-2 mb-4">
                <span style={{ color: tokens.stoneGray }}>~</span>
                <span style={{ color: tokens.ashGray }}>git status</span>
             </div>
             <div className="mb-6 pl-4 border-l-2" style={{ borderColor: tokens.earthGray, color: tokens.ashGray }}>
                <p>On branch main</p>
                <p>Your branch is up to date with 'origin/main'.</p>
                <p className="mt-2">nothing to commit, working tree clean</p>
             </div>

             <div className="flex items-center gap-2 mb-4">
                <span style={{ color: '#01F7F7' }}>❯</span>
                <div className="w-2 h-5 bg-white/80 animate-pulse" />
             </div>
           </div>
        </div>
      </FadeUp>
    </section>
  )
}

function ProductPhilosophy() {
  return (
    <section className="py-32" style={{ backgroundColor: tokens.deepVoid }}>
       <div className="max-w-[1500px] mx-auto px-6">
         <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="flex-1">
              <FadeUp>
                <span className="text-[12px] uppercase block mb-6" style={{ color: tokens.stoneGray, letterSpacing: '2.4px' }}>
                  A modern approach
                </span>
                <h2 className="text-[40px] md:text-[48px] mb-8" style={{ color: tokens.warmParchment, fontWeight: 400, letterSpacing: '-0.48px', lineHeight: 1.2 }}>
                  Terminals haven't changed in 40 years. We thought it was time.
                </h2>
                <p className="text-[20px] mb-8" style={{ color: tokens.ashGray, lineHeight: 1.4, letterSpacing: '-0.2px' }}>
                  We built Warp to bring the terminal into the modern era. By treating commands and their outputs as distinct blocks, adding IDE-like text editing, and building AI directly into the interface, Warp makes the CLI accessible to everyone.
                </p>
                <a href="#" className="inline-flex items-center gap-2 text-[16px] border-b pb-1" style={{ color: tokens.warmParchment, borderColor: tokens.mistBorder }}>
                  Read our manifesto <ArrowRight size={16} />
                </a>
              </FadeUp>
            </div>
            <div className="flex-1 w-full">
              {/* Nature Photography Stand-in */}
              <FadeUp className="w-full aspect-[4/3] rounded-[12px] bg-[#1a1a18] overflow-hidden border relative" style={{ borderColor: tokens.mistBorder }}>
                 <div className="absolute inset-0 opacity-40 mix-blend-overlay" style={{ background: 'linear-gradient(to bottom right, #4a3c31, #1a2a22)' }} />
                 {/* Abstract nature representation */}
                 <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-black/80 to-transparent" />
                 <div className="absolute inset-0 flex items-center justify-center text-[#868584] font-mono text-sm opacity-50">
                    [Nature / Landscape Photography]
                 </div>
              </FadeUp>
            </div>
         </div>
       </div>
    </section>
  )
}

function Features() {
  return (
    <section id="features" className="py-32" style={{ backgroundColor: tokens.deepVoid, borderTop: `1px solid ${tokens.mistBorder}` }}>
      <div className="max-w-[1500px] mx-auto px-6">
        <FadeUp>
          <div className="mb-20 text-center max-w-[800px] mx-auto">
            <span className="text-[12px] uppercase block mb-6" style={{ color: tokens.stoneGray, letterSpacing: '2.4px' }}>
              Features
            </span>
            <h2 className="text-[48px] md:text-[56px]" style={{ color: tokens.warmParchment, fontWeight: 400, letterSpacing: '-0.56px', lineHeight: 1.2 }}>
              Everything you need to stay in flow.
            </h2>
          </div>
        </FadeUp>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              variants={staggerItem}
              className="p-8 rounded-[12px] flex flex-col"
              style={{
                backgroundColor: 'transparent',
                border: `1px solid ${tokens.mistBorder}`,
              }}
            >
              <div className="w-12 h-12 mb-8 flex items-center justify-center rounded-[8px]" style={{ backgroundColor: tokens.darkCharcoal }}>
                <feature.icon className="h-6 w-6" style={{ color: tokens.warmParchment }} strokeWidth={1.5} />
              </div>
              <h3 className="text-[22px] mb-4" style={{ color: tokens.warmParchment, fontWeight: 500, lineHeight: 1.14 }}>{feature.title}</h3>
              <p className="text-[18px] flex-1" style={{ color: tokens.ashGray, lineHeight: 1.3, letterSpacing: '-0.18px' }}>{feature.description}</p>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

function BlocksFeature() {
  return (
    <section className="py-32" style={{ backgroundColor: tokens.deepVoid }}>
      <div className="max-w-[1500px] mx-auto px-6">
        <div className="flex flex-col-reverse lg:flex-row gap-16 items-center">
          <div className="flex-1 w-full">
            <FadeUp className="w-full aspect-[4/3] rounded-[12px] bg-[#1a1918] overflow-hidden border flex flex-col p-4 gap-4" style={{ borderColor: tokens.mistBorder }}>
                {/* Mock Blocks UI */}
                <div className="bg-[#222120] rounded-[8px] border p-4" style={{ borderColor: tokens.mistBorder }}>
                   <div className="flex items-center gap-2 mb-2 font-mono text-[13px] text-[#faf9f6]">
                      <span className="text-[#afaeac]">~</span>
                      <span>echo "Hello, Blocks"</span>
                   </div>
                   <div className="font-mono text-[13px] text-[#afaeac] pl-4 border-l-2 border-[#353534]">
                      Hello, Blocks
                   </div>
                </div>
                <div className="bg-[#222120] rounded-[8px] border p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.1)]" style={{ borderColor: tokens.mistBorder }}>
                   <div className="flex items-center justify-between mb-2">
                     <div className="flex items-center gap-2 font-mono text-[13px] text-[#faf9f6]">
                        <span className="text-[#afaeac]">~</span>
                        <span>ls -la</span>
                     </div>
                     <div className="flex gap-2">
                        <div className="w-6 h-6 rounded bg-[#353534]" />
                        <div className="w-6 h-6 rounded bg-[#353534]" />
                     </div>
                   </div>
                   <div className="font-mono text-[13px] text-[#afaeac] pl-4 border-l-2 border-[#01F7F7]">
                      total 24<br/>
                      drwxr-xr-x   5 user  staff   160 Oct 12 10:00 .<br/>
                      drwxr-xr-x  10 user  staff   320 Oct 12 09:00 ..<br/>
                      -rw-r--r--   1 user  staff   120 Oct 12 10:00 README.md
                   </div>
                </div>
            </FadeUp>
          </div>
          <div className="flex-1">
            <FadeUp>
              <span className="text-[12px] uppercase block mb-6" style={{ color: tokens.stoneGray, letterSpacing: '2.4px' }}>
                Core Concept
              </span>
              <h2 className="text-[40px] md:text-[48px] mb-8" style={{ color: tokens.warmParchment, fontWeight: 400, letterSpacing: '-0.48px', lineHeight: 1.2 }}>
                Blocks, not walls of text.
              </h2>
              <p className="text-[20px] mb-8" style={{ color: tokens.ashGray, lineHeight: 1.4, letterSpacing: '-0.2px' }}>
                In traditional terminals, everything is one continuous stream. In Warp, every command and its output is grouped into a distinct Block.
              </p>
              <ul className="space-y-4 mb-8">
                {['Copy command output with one click', 'Share a secure web link to a Block', 'Search within a specific Block\'s output'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-[18px]" style={{ color: tokens.ashGray }}>
                    <Check className="h-5 w-5 shrink-0" style={{ color: tokens.warmParchment }} strokeWidth={1.5} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  )
}

function Pricing() {
  return (
    <section id="pricing" className="py-32" style={{ backgroundColor: tokens.deepVoid, borderTop: `1px solid ${tokens.mistBorder}` }}>
      <div className="max-w-[1500px] mx-auto px-6">
        <FadeUp>
          <div className="text-center mb-20">
            <span className="text-[12px] uppercase block mb-6" style={{ color: tokens.stoneGray, letterSpacing: '2.4px' }}>
              Pricing
            </span>
            <h2 className="text-[48px] md:text-[56px] mb-6" style={{ color: tokens.warmParchment, fontWeight: 400, letterSpacing: '-0.56px', lineHeight: 1.2 }}>
              Simple, transparent pricing.
            </h2>
          </div>
        </FadeUp>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PRICING.map((tier) => (
            <motion.div
              key={tier.name}
              variants={staggerItem}
              className="p-10 rounded-[14px] flex flex-col"
              style={{
                backgroundColor: tier.highlighted ? tokens.frostedVeil : 'transparent',
                border: `1px solid ${tokens.mistBorder}`,
              }}
            >
              <h3 className="text-[32px] mb-2" style={{ color: tokens.warmParchment, fontWeight: 400 }}>{tier.name}</h3>
              <p className="text-[16px] h-12 mb-8" style={{ color: tokens.stoneGray }}>{tier.description}</p>

              <div className="mb-10 pb-10 border-b" style={{ borderColor: tokens.mistBorder }}>
                <div className="flex items-baseline gap-2">
                  <span className="text-[48px]" style={{ color: tokens.warmParchment, fontWeight: 400, letterSpacing: '-0.48px' }}>{tier.price}</span>
                  {tier.period && <span className="text-[16px]" style={{ color: tokens.stoneGray }}>{tier.period}</span>}
                </div>
              </div>

              <ul className="space-y-5 mb-12 flex-1">
                {tier.features.map(f => (
                  <li key={f} className="flex items-start gap-4 text-[18px]" style={{ color: tokens.ashGray }}>
                    <Check className="h-5 w-5 shrink-0 mt-0.5" style={{ color: tokens.warmParchment }} strokeWidth={1.5} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <button
                className="w-full py-4 rounded-[50px] text-[16px] transition-colors hover:bg-[#454545]"
                style={tier.highlighted
                  ? { backgroundColor: tokens.warmParchment, color: tokens.deepVoid, fontWeight: 500 }
                  : { backgroundColor: tokens.earthGray, color: tokens.ashGray, fontWeight: 500 }
                }
              >
                {tier.cta}
              </button>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

function Testimonials() {
  return (
    <section className="py-32" style={{ backgroundColor: tokens.deepVoid, borderTop: `1px solid ${tokens.mistBorder}` }}>
      <div className="max-w-[1500px] mx-auto px-6">
        <FadeUp>
           <div className="mb-20 text-center">
             <span className="text-[12px] uppercase block mb-6" style={{ color: tokens.stoneGray, letterSpacing: '2.4px' }}>
                Don't take our word for it
             </span>
           </div>
        </FadeUp>
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              variants={staggerItem}
              className="flex flex-col"
            >
              <p className="text-[24px] mb-10 flex-1" style={{ color: tokens.warmParchment, lineHeight: 1.4, letterSpacing: '-0.4px' }}>
                "{t.text}"
              </p>
              <div className="border-t pt-6" style={{ borderColor: tokens.mistBorder }}>
                <p className="text-[18px]" style={{ color: tokens.ashGray }}>{t.name}</p>
                <p className="text-[16px]" style={{ color: tokens.stoneGray }}>{t.role}</p>
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
    <section className="py-32" style={{ backgroundColor: tokens.deepVoid, borderTop: `1px solid ${tokens.mistBorder}` }}>
      <div className="max-w-[800px] mx-auto px-6">
        <FadeUp>
          <div className="text-center mb-20">
            <h2 className="text-[48px]" style={{ color: tokens.warmParchment, fontWeight: 400, letterSpacing: '-0.48px', lineHeight: 1.2 }}>
              Frequently asked questions
            </h2>
          </div>
        </FadeUp>

        <div className="divide-y" style={{ borderColor: tokens.mistBorder }}>
          {FAQ_ITEMS.map((item, i) => (
            <FadeUp key={i} delay={i * 0.05}>
              <div className="py-8">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between text-left group"
                >
                  <span className="text-[24px]" style={{ color: tokens.warmParchment, fontWeight: 400, letterSpacing: '-0.4px' }}>{item.q}</span>
                  <motion.div animate={{ rotate: openIndex === i ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <ChevronDown className="h-6 w-6" style={{ color: tokens.stoneGray }} />
                  </motion.div>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openIndex === i ? 'auto' : 0, opacity: openIndex === i ? 1 : 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  style={{ overflow: 'hidden' }}
                >
                  <p className="pt-6 text-[18px]" style={{ color: tokens.ashGray, lineHeight: 1.6 }}>
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

function CTA() {
  return (
    <section className="py-40 relative overflow-hidden" style={{ backgroundColor: tokens.deepVoid, borderTop: `1px solid ${tokens.mistBorder}` }}>
       {/* Background Nature Image Hint */}
       <div className="absolute inset-0 opacity-20 mix-blend-overlay" style={{ background: 'linear-gradient(to top, #121110, transparent), radial-gradient(circle at center, #5a4c41, #121110 70%)' }} />

       <div className="max-w-[800px] mx-auto px-6 text-center relative z-10">
          <FadeUp>
             <h2 className="text-[56px] md:text-[64px] mb-8" style={{ color: tokens.warmParchment, fontWeight: 400, letterSpacing: '-0.56px', lineHeight: 1.1 }}>
               Ready to upgrade your terminal?
             </h2>
             <p className="text-[20px] mb-12" style={{ color: tokens.ashGray, lineHeight: 1.4 }}>
               Join hundreds of thousands of developers who have already made the switch to Warp.
             </p>
             <button
                className="px-10 py-5 rounded-[50px] text-[18px] transition-colors hover:bg-[#454545]"
                style={{
                  backgroundColor: tokens.earthGray,
                  color: tokens.warmParchment,
                  fontWeight: 500,
                }}
              >
                Download Warp for Free
              </button>
          </FadeUp>
       </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="pt-24 pb-12" style={{ backgroundColor: tokens.deepVoid, borderTop: `1px solid ${tokens.mistBorder}` }}>
      <div className="max-w-[1500px] mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-24">
          <div className="col-span-2">
            <span className="font-medium text-2xl mb-8 block" style={{ color: tokens.warmParchment }}>
              Warp
            </span>
            <p className="text-[16px] max-w-sm" style={{ color: tokens.stoneGray, lineHeight: 1.6 }}>
              The terminal for the 21st century. Built in Rust for speed, natively integrated with AI for intelligence.
            </p>
          </div>

          <div>
            <p className="text-[12px] uppercase mb-6" style={{ color: tokens.warmParchment, letterSpacing: '1.4px' }}>Product</p>
            <ul className="space-y-4">
              {['Features', 'Warp AI', 'Warp Drive', 'Pricing', 'Changelog'].map(link => (
                <li key={link}>
                  <a href="#" className="text-[16px] hover:text-[#faf9f6] transition-colors" style={{ color: tokens.ashGray }}>{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[12px] uppercase mb-6" style={{ color: tokens.warmParchment, letterSpacing: '1.4px' }}>Resources</p>
            <ul className="space-y-4">
              {['Documentation', 'Blog', 'Community', 'Security', 'Support'].map(link => (
                <li key={link}>
                  <a href="#" className="text-[16px] hover:text-[#faf9f6] transition-colors" style={{ color: tokens.ashGray }}>{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[12px] uppercase mb-6" style={{ color: tokens.warmParchment, letterSpacing: '1.4px' }}>Company</p>
            <ul className="space-y-4">
              {['About', 'Careers', 'Contact', 'Press', 'Terms & Privacy'].map(link => (
                <li key={link}>
                  <a href="#" className="text-[16px] hover:text-[#faf9f6] transition-colors" style={{ color: tokens.ashGray }}>{link}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <p className="text-[14px]" style={{ color: tokens.stoneGray }}>© {new Date().getFullYear()} Warp. All rights reserved.</p>
          <div className="flex gap-6">
             <a href="#" className="text-[14px] hover:underline" style={{ color: tokens.mutedPurple }}>Twitter</a>
             <a href="#" className="text-[14px] hover:underline" style={{ color: tokens.mutedPurple }}>GitHub</a>
             <a href="#" className="text-[14px] hover:underline" style={{ color: tokens.mutedPurple }}>Discord</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function WarpPage() {
  return (
    <div className={`${interFont.variable} ${monoFont.variable} font-sans`} style={{ backgroundColor: tokens.deepVoid }}>
      <Navbar />
      <main>
        <Hero />
        <ProductPhilosophy />
        <Features />
        <BlocksFeature />
        <Pricing />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />
      
      </div>
  )
}
