"use client"

import React, { useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence, Variants } from 'framer-motion'
import { Playfair_Display, Source_Serif_4, JetBrains_Mono } from 'next/font/google'
import { ArrowRight, Check, LayoutGrid, Zap, Shield, Globe, Lock, Code } from 'lucide-react'

// ─────────────────────────────────────────────
// FONTS
// ─────────────────────────────────────────────
const displayFont = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
})

const bodyFont = Source_Serif_4({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-source-serif',
})

const monoFont = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains',
})

// ─────────────────────────────────────────────
// TOKENS (Monochrome)
// ─────────────────────────────────────────────
const tokens = {
  background: '#FFFFFF',
  foreground: '#000000',
  muted: '#F5F5F5',
  mutedForeground: '#525252',
  accent: '#000000',
  accentForeground: '#FFFFFF',
  border: '#000000',
  borderLight: '#E5E5E5',
  card: '#FFFFFF',
  cardForeground: '#000000',
  ring: '#000000',
}

// ─────────────────────────────────────────────
// CONTENT
// ─────────────────────────────────────────────
const PRODUCT_NAME = "MONOLITH."

const HERO = {
  headline: "Absolute Clarity.",
  subheadline: "Stripped of the unnecessary. A structural approach to modern design logic, favoring absolute precision over ornament. This is digital architecture.",
  cta1: "Commence",
  cta2: "Examine Docs",
}

const STATS = [
  { value: "0.00", label: "COMPROMISE" },
  { value: "99.9", label: "UPTIME" },
  { value: "10k+", label: "DEPLOYMENTS" },
]

const FEATURES = [
  { icon: LayoutGrid, title: "Structural Integrity", description: "Built on foundational principles of layout and typography. Nothing superfluous." },
  { icon: Zap, title: "Unmitigated Velocity", description: "Zero-latency rendering. Optimized pathways delivering content instantaneously." },
  { icon: Shield, title: "Absolute Security", description: "Impermeable cryptographic boundaries protecting data at rest and in transit." },
  { icon: Globe, title: "Universal Delivery", description: "Distributed globally. Accessible instantly regardless of geographic origin." },
  { icon: Lock, title: "Immutable Audit", description: "Cryptographically verifiable event logging for all state changes." },
  { icon: Code, title: "Syntax Precision", description: "Typed strictly. Engineered for maximum developer exactitude and correctness." },
]

const PRICING = [
  { tier: "ESSENTIAL", price: "$0", period: "forever", description: "The foundational tier for individual practitioners.", features: ["Single tenant", "Standard API access", "Community support"], cta: "Initiate Free", highlighted: false },
  { tier: "PROFESSIONAL", price: "$49", period: "per month", description: "Unrestricted access for dedicated professionals.", features: ["Unlimited tenants", "Prioritized API pathways", "Dedicated support channel", "Advanced analytics"], cta: "Select Professional", highlighted: true },
  { tier: "ENTERPRISE", price: "Custom", period: "annually", description: "Bespoke architectural solutions for large scale operations.", features: ["Custom SLAs", "On-premise deployment", "Dedicated account engineer", "Source code access"], cta: "Contact Sales", highlighted: false },
]

const TESTIMONIALS = [
  { name: "E.. Roark", role: "Principal Architect", company: "Stanton", text: "Finally, a tool that respects the fundamental principles of structure and form. It gets out of the way and lets the logic speak for itself.", rating: 5 },
  { name: "A. Rand", role: "Director of Operations", company: "Taggart", text: "Efficiency is not merely a feature, it is the moral imperative of this software. The lack of ornament is its greatest strength.", rating: 5 },
  { name: "H. Roark", role: "Lead Engineer", company: "Cameron", text: "I do not build to have clients. I have clients in order to build. This platform allows me to build exactly what must be built, without compromise.", rating: 5 },
]

const FAQ_ITEMS = [
  { q: "Is the color palette adjustable?", a: "No. The absence of color is a deliberate architectural decision, not a configurable setting. True clarity requires absolute contrast." },
  { q: "How do I deploy a project?", a: "Commit your code to the primary branch. Our CI/CD pipeline enforces strict testing paradigms before automated global distribution." },
  { q: "Do you offer custom integrations?", a: "We provide an unopinionated, strictly typed API. You construct what you require using these foundational primitives." },
  { q: "What is your uptime guarantee?", a: "Our service level agreement stipulates 99.99% availability. Any deviation is unacceptable." },
  { q: "Is the data encrypted?", a: "Yes. All data is encrypted using AES-256 at rest and TLS 1.3 in transit. Security is axiomatic." },
  { q: "Can I self-host?", a: "Self-hosting is restricted to the Enterprise tier, requiring rigorous operational audits prior to deployment." },
]

// ─────────────────────────────────────────────
// ANIMATION VARIANTS
// ─────────────────────────────────────────────
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
}

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

// ─────────────────────────────────────────────
// COMPONENTS
// ─────────────────────────────────────────────

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay } },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
    >
      {children}
    </motion.div>
  )
}

function StaggerContainer({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
    >
      {children}
    </motion.div>
  )
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
        scrolled ? 'bg-white py-4' : 'bg-transparent py-6'
      }`}
      style={{ borderColor: scrolled ? tokens.border : 'transparent' }}
    >
      <div className="max-w-7xl mx-auto px-8 md:px-12 flex items-center justify-between">
        <a href="#" className={`text-2xl font-bold tracking-tighter ${displayFont.className}`} style={{ color: tokens.foreground }}>
          {PRODUCT_NAME}
        </a>
        <div className="hidden md:flex items-center gap-8">
          {['Principles', 'Structure', 'Documentation', 'Access'].map(link => (
            <a key={link} href={`#${link.toLowerCase()}`} className="text-sm font-medium tracking-wide uppercase hover:underline underline-offset-4" style={{ color: tokens.foreground, fontFamily: monoFont.style.fontFamily }}>
              {link}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <a href="#" className="text-sm font-medium tracking-wide uppercase hidden md:block hover:underline underline-offset-4" style={{ color: tokens.foreground, fontFamily: monoFont.style.fontFamily }}>
            Authenticate
          </a>
          <motion.button
            whileHover={{ backgroundColor: tokens.foreground, color: tokens.background }}
            className="px-6 py-3 text-sm font-bold uppercase tracking-widest border-2 transition-colors"
            style={{ borderColor: tokens.border, color: tokens.foreground, fontFamily: monoFont.style.fontFamily }}
          >
            Deploy
          </motion.button>
        </div>
      </div>
    </nav>
  )
}

function Hero() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 100])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  return (
    <section className="relative pt-48 pb-32 overflow-hidden flex items-center min-h-[90vh]">
      <div className="absolute inset-0 z-0 pointer-events-none grid grid-cols-12 gap-4 max-w-7xl mx-auto px-8 md:px-12 opacity-10">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="h-full border-l" style={{ borderColor: tokens.border }} />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-8 md:px-12 relative z-10 w-full">
        <motion.div style={{ y, opacity }} className="max-w-5xl">
          <motion.h1
            className={`text-6xl md:text-8xl lg:text-[10rem] font-bold leading-none tracking-tighter mb-8 ${displayFont.className}`}
            style={{ color: tokens.foreground }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            Absolute<br />
            <span className="italic font-light">Clarity.</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="w-24 h-px mb-8"
            style={{ backgroundColor: tokens.border }}
          />

          <motion.p
            className={`text-xl md:text-3xl max-w-3xl leading-relaxed mb-16 ${bodyFont.className}`}
            style={{ color: tokens.mutedForeground }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            {HERO.subheadline}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-10 py-5 text-sm font-bold uppercase tracking-widest border-2 flex items-center justify-center gap-3"
              style={{ backgroundColor: tokens.foreground, color: tokens.background, borderColor: tokens.border, fontFamily: monoFont.style.fontFamily }}
            >
              {HERO.cta1} <ArrowRight className="h-4 w-4" />
            </motion.button>
            <motion.button
              whileHover={{ backgroundColor: tokens.muted }}
              whileTap={{ scale: 0.98 }}
              className="px-10 py-5 text-sm font-bold uppercase tracking-widest border-2 flex items-center justify-center gap-3 transition-colors"
              style={{ backgroundColor: 'transparent', color: tokens.foreground, borderColor: tokens.border, fontFamily: monoFont.style.fontFamily }}
            >
              {HERO.cta2}
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-12 left-8 md:left-12 flex flex-col items-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <span className="text-xs uppercase tracking-widest rotate-90 origin-left mb-8" style={{ color: tokens.foreground, fontFamily: monoFont.style.fontFamily }}>Scroll</span>
        <div className="w-px h-16 bg-black/20 relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full h-1/2 bg-black"
            animate={{ y: [0, 64] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          />
        </div>
      </motion.div>
    </section>
  )
}

function Stats() {
  return (
    <section className="py-24 border-y-2" style={{ borderColor: tokens.border, backgroundColor: tokens.background }}>
      <div className="max-w-7xl mx-auto px-8 md:px-12">
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={staggerItem}
                className={`p-12 border-b-2 md:border-b-0 ${i !== STATS.length - 1 ? 'md:border-r-2' : ''}`}
                style={{ borderColor: tokens.border }}
              >
                <p className={`text-6xl md:text-8xl font-bold tracking-tighter mb-4 ${displayFont.className}`} style={{ color: tokens.foreground }}>
                  {stat.value}
                </p>
                <div className="h-px w-12 mb-4" style={{ backgroundColor: tokens.border }} />
                <p className="text-sm font-bold uppercase tracking-widest" style={{ color: tokens.mutedForeground, fontFamily: monoFont.style.fontFamily }}>
                  {stat.label}
                </p>
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
    <section id="structure" className="py-32" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-7xl mx-auto px-8 md:px-12">
        <FadeUp>
          <div className="mb-24 max-w-4xl">
            <h2 className={`text-5xl md:text-7xl font-bold tracking-tighter mb-8 ${displayFont.className}`} style={{ color: tokens.foreground }}>
              Structural<br />Integrity.
            </h2>
            <p className={`text-2xl leading-relaxed ${bodyFont.className}`} style={{ color: tokens.mutedForeground }}>
              Every component engineered with absolute precision. No superfluous elements. Function dictates form completely.
            </p>
          </div>
        </FadeUp>

        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-l-2 border-t-2" style={{ borderColor: tokens.border }}>
            {FEATURES.map((feature, i) => (
              <motion.div
                key={feature.title}
                variants={staggerItem}
                className="p-12 border-r-2 border-b-2 hover:bg-black/5 transition-colors duration-300"
                style={{ borderColor: tokens.border }}
              >
                <feature.icon className="h-8 w-8 mb-8" style={{ color: tokens.foreground }} strokeWidth={1.5} />
                <h3 className={`text-2xl font-bold mb-4 ${displayFont.className}`} style={{ color: tokens.foreground }}>{feature.title}</h3>
                <p className={`text-lg leading-relaxed ${bodyFont.className}`} style={{ color: tokens.mutedForeground }}>{feature.description}</p>
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
    <section className="py-32 border-y-2" style={{ borderColor: tokens.border, backgroundColor: tokens.background }}>
      <div className="max-w-7xl mx-auto px-8 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <FadeUp>
            <div>
              <p className="text-sm font-bold uppercase tracking-widest mb-6" style={{ color: tokens.foreground, fontFamily: monoFont.style.fontFamily }}>
                [ System Architecture ]
              </p>
              <h2 className={`text-5xl md:text-6xl font-bold tracking-tighter mb-8 ${displayFont.className}`} style={{ color: tokens.foreground }}>
                Radical reduction of complexity.
              </h2>
              <div className="w-16 h-1 mb-8 bg-black" />
              <p className={`text-xl leading-relaxed mb-8 ${bodyFont.className}`} style={{ color: tokens.mutedForeground }}>
                We removed everything that did not serve the core function. The result is a monolithic architecture of unparalleled stability and performance.
              </p>
              <ul className="space-y-6">
                {[
                  "Deterministic state resolution",
                  "Cryptographic verification",
                  "Immutable append-only ledgers"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="mt-1 h-2 w-2 rounded-none bg-black flex-shrink-0" />
                    <span className={`text-lg ${bodyFont.className}`} style={{ color: tokens.foreground }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeUp>

          <FadeUp delay={0.2}>
            <div className="relative aspect-square border-2 p-8 flex flex-col justify-between" style={{ borderColor: tokens.border, backgroundColor: tokens.muted }}>
              <div className="flex justify-between items-start">
                <span className="text-xs uppercase tracking-widest" style={{ fontFamily: monoFont.style.fontFamily }}>FIG. 1</span>
                <span className="text-xs uppercase tracking-widest" style={{ fontFamily: monoFont.style.fontFamily }}>SYSTEM STATE</span>
              </div>

              <div className="absolute inset-0 flex items-center justify-center p-16">
                 {/* Abstract geometric visualization */}
                 <div className="w-full h-full border-2 border-black relative">
                    <div className="absolute top-1/2 left-0 w-full h-px bg-black" />
                    <div className="absolute left-1/2 top-0 h-full w-px bg-black" />
                    <div className="absolute inset-4 border border-black/30" />
                    <div className="absolute inset-12 border border-black/30 rounded-full" />
                    <div className="absolute top-1/2 left-1/2 w-8 h-8 bg-black -translate-x-1/2 -translate-y-1/2" />
                 </div>
              </div>

              <div className="flex justify-between items-end">
                <span className="text-xs uppercase tracking-widest" style={{ fontFamily: monoFont.style.fontFamily }}>X: 45.92</span>
                <span className="text-xs uppercase tracking-widest" style={{ fontFamily: monoFont.style.fontFamily }}>Y: 12.04</span>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}

function Pricing() {
  return (
    <section id="pricing" className="py-32" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-7xl mx-auto px-8 md:px-12">
        <FadeUp>
          <div className="text-center mb-24">
            <h2 className={`text-5xl md:text-7xl font-bold tracking-tighter mb-8 ${displayFont.className}`} style={{ color: tokens.foreground }}>
              Economic Parameters.
            </h2>
            <div className="w-24 h-1 bg-black mx-auto" />
          </div>
        </FadeUp>

        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PRICING.map((tier, i) => (
              <motion.div
                key={tier.tier}
                variants={staggerItem}
                className={`p-10 border-2 flex flex-col ${tier.highlighted ? 'bg-black text-white relative' : 'bg-white text-black'}`}
                style={{ borderColor: tokens.border }}
              >
                {tier.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-black border-2 border-black px-4 py-1 text-xs font-bold uppercase tracking-widest" style={{ fontFamily: monoFont.style.fontFamily }}>
                    Standard Deployment
                  </div>
                )}

                <p className="text-sm font-bold uppercase tracking-widest mb-8" style={{ fontFamily: monoFont.style.fontFamily, color: tier.highlighted ? tokens.background : tokens.foreground }}>
                  {tier.tier}
                </p>
                <div className="mb-6 flex items-baseline gap-2">
                  <span className={`text-6xl font-bold tracking-tighter ${displayFont.className}`} style={{ color: tier.highlighted ? tokens.background : tokens.foreground }}>{tier.price}</span>
                  <span className="text-sm font-medium uppercase tracking-widest" style={{ color: tier.highlighted ? tokens.background : tokens.mutedForeground, opacity: 0.7, fontFamily: monoFont.style.fontFamily }}>/ {tier.period}</span>
                </div>
                <div className="h-px w-full mb-8 bg-current opacity-20" />
                <p className={`text-lg mb-8 h-16 ${bodyFont.className}`} style={{ color: tier.highlighted ? tokens.background : tokens.mutedForeground, opacity: tier.highlighted ? 0.9 : 1 }}>{tier.description}</p>

                <ul className="space-y-4 mb-12 flex-1">
                  {tier.features.map(f => (
                    <li key={f} className="flex items-start gap-4">
                      <Check className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: tier.highlighted ? tokens.background : tokens.foreground }} strokeWidth={2} />
                      <span className={`text-lg ${bodyFont.className}`} style={{ color: tier.highlighted ? tokens.background : tokens.foreground }}>{f}</span>
                    </li>
                  ))}
                </ul>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-5 text-sm font-bold uppercase tracking-widest border-2 transition-colors ${
                    tier.highlighted
                      ? 'bg-white text-black border-white hover:bg-transparent hover:text-white'
                      : 'bg-black text-white border-black hover:bg-transparent hover:text-black'
                  }`}
                  style={{ fontFamily: monoFont.style.fontFamily }}
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
    <section id="testimonials" className="py-32 border-y-2" style={{ borderColor: tokens.border, backgroundColor: tokens.muted }}>
      <div className="max-w-7xl mx-auto px-8 md:px-12">
        <FadeUp>
          <div className="mb-24 flex items-center gap-8">
             <h2 className={`text-5xl md:text-6xl font-bold tracking-tighter ${displayFont.className}`} style={{ color: tokens.foreground }}>
              Verifications.
            </h2>
            <div className="h-px flex-1 bg-black opacity-20" />
          </div>
        </FadeUp>

        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-l-2 border-t-2 bg-white" style={{ borderColor: tokens.border }}>
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                variants={staggerItem}
                className="p-12 border-r-2 border-b-2"
                style={{ borderColor: tokens.border, backgroundColor: tokens.background }}
              >
                <div className="flex mb-8 gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <div key={i} className="w-3 h-3 bg-black rounded-none" />
                  ))}
                </div>
                <p className={`text-xl leading-relaxed mb-12 italic ${displayFont.className}`} style={{ color: tokens.foreground }}>"{t.text}"</p>
                <div className="mt-auto">
                  <p className="font-bold text-sm uppercase tracking-widest mb-1" style={{ color: tokens.foreground, fontFamily: monoFont.style.fontFamily }}>{t.name}</p>
                  <p className="text-xs uppercase tracking-widest" style={{ color: tokens.mutedForeground, fontFamily: monoFont.style.fontFamily }}>{t.role}, {t.company}</p>
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
    <section id="faq" className="py-32" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-4xl mx-auto px-8 md:px-12">
        <FadeUp>
          <div className="text-center mb-24">
            <h2 className={`text-5xl md:text-7xl font-bold tracking-tighter mb-8 ${displayFont.className}`} style={{ color: tokens.foreground }}>
              Interrogations.
            </h2>
            <div className="w-16 h-1 bg-black mx-auto" />
          </div>
        </FadeUp>

        <div className="border-t-2" style={{ borderColor: tokens.border }}>
          {FAQ_ITEMS.map((item, i) => (
            <FadeUp key={i} delay={i * 0.05}>
              <div className="border-b-2" style={{ borderColor: tokens.border }}>
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  aria-expanded={openIndex === i}
                  className="w-full flex items-center justify-between py-8 text-left group hover:bg-black/5 px-4 transition-colors"
                >
                  <span className={`text-2xl font-bold pr-8 ${displayFont.className}`} style={{ color: tokens.foreground }}>{item.q}</span>
                  <motion.div
                    animate={{ rotate: openIndex === i ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-8 h-8 flex items-center justify-center border-2 border-black flex-shrink-0"
                  >
                    <div className="w-4 h-px bg-black absolute" />
                    <div className="h-4 w-px bg-black absolute" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                      style={{ overflow: 'hidden' }}
                    >
                      <p className={`px-4 pb-8 text-xl leading-relaxed max-w-3xl ${bodyFont.className}`} style={{ color: tokens.mutedForeground }}>
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
    <section className="py-32 border-y-2 bg-black text-white" style={{ borderColor: tokens.border }}>
      <div className="max-w-4xl mx-auto px-8 md:px-12 text-center">
        <FadeUp>
          <h2 className={`text-5xl md:text-7xl font-bold tracking-tighter mb-8 ${displayFont.className}`}>
            Establish Contact.
          </h2>
          <p className={`text-2xl mb-12 opacity-80 ${bodyFont.className}`}>
            Subscribe to the transmission log. Low frequency. High density.
          </p>

          {status === 'success' ? (
            <p className="text-xl font-bold uppercase tracking-widest border-2 border-white py-6 inline-block px-12" style={{ fontFamily: monoFont.style.fontFamily }}>
              TRANSMISSION RECEIVED
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-0 max-w-2xl mx-auto">
              <label htmlFor="newsletter-email" className="sr-only">Email address</label>
              <input
                id="newsletter-email"
                type="email"
                required
                autoComplete="email"
                placeholder="ADDRESS@NODE.COM"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="flex-1 h-16 px-6 border-2 border-white bg-transparent text-white placeholder-white/50 text-sm font-bold uppercase tracking-widest focus:outline-none focus:bg-white/10 transition-colors rounded-none"
                style={{ fontFamily: monoFont.style.fontFamily }}
              />
              <motion.button
                type="submit"
                disabled={status === 'loading'}
                whileHover={{ backgroundColor: 'transparent', color: 'white' }}
                whileTap={{ scale: 0.98 }}
                className="h-16 px-12 font-bold text-sm uppercase tracking-widest bg-white text-black border-2 border-white disabled:opacity-60 transition-colors rounded-none mt-4 sm:mt-0 sm:-ml-2"
                style={{ fontFamily: monoFont.style.fontFamily }}
              >
                {status === 'loading' ? 'PROCESSING' : 'INITIATE'}
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
    Architecture: ['Documentation', 'Principles', 'Manifesto', 'Changelog'],
    Operations: ['Status', 'Telemetry', 'Security', 'Compliance'],
    Entity: ['About', 'Careers', 'Press', 'Contact'],
    Legal: ['Terms', 'Privacy', 'DPA', 'Cookies'],
  }

  return (
    <footer className="py-24" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-7xl mx-auto px-8 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-12 md:gap-8 mb-24">
          <div className="col-span-2">
            <a href="#" className={`text-4xl font-bold tracking-tighter block mb-6 ${displayFont.className}`} style={{ color: tokens.foreground }}>
              {PRODUCT_NAME}
            </a>
            <p className={`text-lg max-w-sm ${bodyFont.className}`} style={{ color: tokens.mutedForeground }}>
              Structured logic for digital environments.
            </p>
          </div>

          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <p className="font-bold text-sm uppercase tracking-widest mb-6" style={{ color: tokens.foreground, fontFamily: monoFont.style.fontFamily }}>{group}</p>
              <ul className="space-y-4">
                {items.map(item => (
                  <li key={item}>
                    <a href="#" className="text-sm font-medium uppercase tracking-wider hover:text-black hover:underline underline-offset-4 transition-all" style={{ color: tokens.mutedForeground, fontFamily: monoFont.style.fontFamily }}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t-2 gap-6" style={{ borderColor: tokens.border }}>
          <p className="text-xs uppercase tracking-widest font-bold" style={{ color: tokens.foreground, fontFamily: monoFont.style.fontFamily }}>
            © {new Date().getFullYear()} {PRODUCT_NAME}. ALL RIGHTS RESERVED.
          </p>
          <a
            href="/"
            className="text-xs font-bold uppercase tracking-widest px-6 py-3 border-2 hover:bg-black hover:text-white transition-colors"
            style={{ borderColor: tokens.border, color: tokens.foreground, fontFamily: monoFont.style.fontFamily }}
          >
            ← RETURN TO INDEX
          </a>
        </div>
      </div>
    </footer>
  )
}

// ─────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────
export default function MonochromeStylePage() {
  return (
    <div className={`min-h-screen ${bodyFont.variable} ${displayFont.variable} ${monoFont.variable}`} style={{ backgroundColor: tokens.background, color: tokens.foreground }}>
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
