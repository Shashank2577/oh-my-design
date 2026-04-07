'use client'

import React, { useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Check, ChevronDown, Scissors, Droplets, Sparkles, Star, Calendar, Clock, StarHalf } from 'lucide-react'
import { Tenor_Sans, Inter } from 'next/font/google'

const tenorSans = Tenor_Sans({ subsets: ['latin'], weight: '400', variable: '--font-tenor-sans' })
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

// ─────────────────────────────────────────────
// DESIGN TOKENS
// ─────────────────────────────────────────────
const tokens = {
  background: '#F8FAFC', // Soap Foam
  surface: '#FFFFFF',
  accent: '#22D3EE', // Fresh Water
  accent2: '#94A3B8', // Steel Scissors
  border: 'rgba(34, 211, 238, 0.2)',
  foreground: '#0F172A',
  mutedForeground: '#64748B',
}

const PRODUCT_NAME = "GroomGlide"

// ─────────────────────────────────────────────
// MOTION ARCHITECTURE
// ─────────────────────────────────────────────
const physics = {
  trimMask: { duration: 1.2, ease: "circOut" } as const,
  bubbleDrift: { type: 'spring', stiffness: 50, damping: 30 } as const,
  snap: { type: 'spring', stiffness: 350, damping: 25 } as const,
}

function RevealUp({ children, delay = 0, className = '' }: { children: React.ReactNode, delay?: number, className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] as [number, number, number, number], delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function StaggerReveal({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        show: { transition: { staggerChildren: 0.1 } }
      }}
    >
      {children}
    </motion.div>
  )
}

const revealItem: import('framer-motion').Variants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] } }
}

function BubbleBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [-20, -100 - (Math.random() * 200)],
            x: Math.random() * 100 - 50,
            opacity: [0, 0.5, 0],
            scale: [0.5, Math.random() + 1, 0.5]
          }}
          transition={{
            duration: 8 + Math.random() * 10,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: [0, 0, 1, 1] as [number, number, number, number]
          }}
          className="absolute rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            bottom: '-10%',
            width: `${20 + Math.random() * 60}px`,
            height: `${20 + Math.random() * 60}px`,
            background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), rgba(255,255,255,0.1))`,
            boxShadow: `inset 0 0 20px ${tokens.border}`,
            backdropFilter: 'blur(2px)'
          }}
        />
      ))}
    </div>
  )
}

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────
const FEATURES = [
  { icon: Droplets, title: "Ozone Spa Baths", desc: "Deep cleaning microscopic bubbles that revitalize skin and coat." },
  { icon: Scissors, title: "Precision Styling", desc: "Breed-specific or custom cuts by master groomers." },
  { icon: Sparkles, title: "De-shedding Treatment", desc: "Reduce shedding by up to 90% with our specialized tools." },
]

const STATS = [
  { value: "10k+", label: "Pets Styled" },
  { value: "4.9", label: "Average Rating" },
  { value: "12", label: "Master Groomers" },
]

const PRICING = [
  {
    name: "The Freshen Up",
    price: "$55",
    period: "visit",
    description: "Perfect for between-haircut maintenance.",
    features: ["Ozone bath & blowout", "Nail trim & file", "Ear cleaning", "Teeth brushing"],
    cta: "Book Appointment",
    highlighted: false
  },
  {
    name: "The Full Glide",
    price: "$95",
    period: "visit",
    description: "Our signature head-to-paw transformation.",
    features: ["Everything in Freshen Up", "Full body precision haircut", "De-shedding treatment", "Paw pad trim & balm"],
    cta: "Book Appointment",
    highlighted: true
  }
]

const TESTIMONIALS = [
  {
    name: "Eleanor R.",
    role: "Poodle Owner",
    text: "The transformation is always incredible. GroomGlide treats my senior poodle with such care, and he always leaves looking show-ready.",
    rating: 5
  },
  {
    name: "Marcus T.",
    role: "Golden Retriever Dad",
    text: "The de-shedding treatment is a lifesaver. My house is finally fur-free, and my Golden's coat has never been so soft and shiny.",
    rating: 5
  },
  {
    name: "Sophia L.",
    role: "Cat Mom",
    text: "Finding a place that grooms cats calmly is hard. The 'Spa-Tech' environment here is so quiet and serene, my Persian actually enjoyed it.",
    rating: 5
  }
]

const FAQ_ITEMS = [
  { q: "How long does a full groom take?", a: "Typically 1.5 to 3 hours depending on your pet's size, coat condition, and behavior. We never rush the process to ensure a stress-free experience." },
  { q: "Can I stay and watch?", a: "To keep pets calm and focused on their groomer, we recommend parents drop off. However, our salon features glass viewing windows if you prefer to observe discreetly." },
  { q: "Do you require vaccinations?", a: "Yes, for the safety of all our guests, we require proof of up-to-date Rabies, DHPP, and Bordetella vaccinations." },
  { q: "What products do you use?", a: "We use only premium, hypoallergenic, and tearless shampoos and conditioners. We also have specialized medical baths available upon request." }
]

// ─────────────────────────────────────────────
// COMPONENTS
// ─────────────────────────────────────────────
function Navbar() {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] }}
      className="fixed top-0 w-full z-50 bg-opacity-70 backdrop-blur-xl border-b transition-colors"
      style={{ backgroundColor: 'rgba(248, 250, 252, 0.7)', borderColor: tokens.border }}
    >
      <div className="max-w-7xl mx-auto px-8 h-24 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Sparkles className="h-6 w-6" style={{ color: tokens.accent }} />
          <span className="text-2xl font-tenor-sans tracking-wide uppercase" style={{ color: tokens.foreground }}>
            {PRODUCT_NAME}
          </span>
        </div>
        <div className="hidden md:flex gap-10">
          {['Services', 'Gallery', 'About'].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-sm tracking-widest uppercase hover:opacity-60 transition-opacity" style={{ color: tokens.foreground }}>
              {item}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-6">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-3 text-sm tracking-widest uppercase text-white rounded-none relative overflow-hidden group"
            style={{ backgroundColor: tokens.foreground }}
          >
            <span className="relative z-10">Book Now</span>
            <div className="absolute inset-0 transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out" style={{ backgroundColor: tokens.accent }} />
          </motion.button>
        </div>
      </div>
    </motion.nav>
  )
}

function Hero() {
  return (
    <section className="relative pt-40 pb-32 overflow-hidden min-h-screen flex items-center" style={{ backgroundColor: tokens.background }}>
      <BubbleBackground />
      <div className="max-w-7xl mx-auto px-8 w-full relative z-10">
        <div className="max-w-3xl">
          <RevealUp>
            <div className="inline-flex items-center gap-2 mb-8">
              <div className="h-px w-12" style={{ backgroundColor: tokens.accent }} />
              <span className="text-sm tracking-widest uppercase" style={{ color: tokens.accent }}>Premium Pet Spa</span>
            </div>
          </RevealUp>
          <RevealUp delay={0.1}>
            <h1 className="text-6xl md:text-8xl font-tenor-sans leading-tight mb-8" style={{ color: tokens.foreground }}>
              Satisfyingly <br />
              <span className="italic font-light text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(to right, ${tokens.accent}, ${tokens.accent2})` }}>Clean.</span>
            </h1>
          </RevealUp>
          <RevealUp delay={0.2}>
            <p className="text-lg md:text-xl font-light leading-relaxed max-w-xl mb-12" style={{ color: tokens.mutedForeground }}>
              Experience the ASMR of pet grooming. From scruffy to sleek with precision styling and ozone spa baths.
            </p>
          </RevealUp>
          <RevealUp delay={0.3}>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-10 py-4 text-sm tracking-widest uppercase text-white relative overflow-hidden group border"
              style={{ backgroundColor: 'transparent', borderColor: tokens.foreground, color: tokens.foreground }}
            >
              <span className="relative z-10 group-hover:text-white transition-colors duration-500">View Services</span>
              <div className="absolute inset-0 transform scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-500 ease-out" style={{ backgroundColor: tokens.foreground }} />
            </motion.button>
          </RevealUp>
        </div>
      </div>

      {/* Interactive Mask Reveal Image */}
      <motion.div
        initial={{ clipPath: 'inset(100% 0 0 0)' }}
        animate={{ clipPath: 'inset(0% 0 0 0)' }}
        transition={{ duration: 1.5, ease: [0.7, 0, 0.3, 1] as [number, number, number, number], delay: 0.5 }}
        className="absolute right-0 top-0 w-1/2 h-full hidden lg:block"
      >
        <img
          src="https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80"
          alt="Sleek groomed dog"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#F8FAFC]" />
      </motion.div>
    </section>
  )
}

function Stats() {
  return (
    <section className="py-20 border-y" style={{ backgroundColor: tokens.surface, borderColor: tokens.border }}>
      <div className="max-w-7xl mx-auto px-8">
        <StaggerReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 divide-y md:divide-y-0 md:divide-x" style={{ borderColor: tokens.border }}>
            {STATS.map(s => (
              <motion.div key={s.label} variants={revealItem} className="flex flex-col items-center py-6 md:py-0 text-center">
                <span className="text-5xl font-tenor-sans mb-3" style={{ color: tokens.foreground }}>{s.value}</span>
                <span className="text-sm tracking-widest uppercase text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(to right, ${tokens.accent2}, ${tokens.mutedForeground})` }}>{s.label}</span>
              </motion.div>
            ))}
          </div>
        </StaggerReveal>
      </div>
    </section>
  )
}

function Features() {
  return (
    <section id="services" className="py-32 relative" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-7xl mx-auto px-8">
        <RevealUp>
          <div className="mb-20 text-center">
            <h2 className="text-4xl md:text-5xl font-tenor-sans" style={{ color: tokens.foreground }}>
              The Glide Experience
            </h2>
          </div>
        </RevealUp>

        <StaggerReveal>
          <div className="grid md:grid-cols-3 gap-12">
            {FEATURES.map((f, i) => (
              <motion.div
                key={i}
                variants={revealItem}
                className="group cursor-pointer"
              >
                <div className="mb-8 relative overflow-hidden rounded-2xl p-8 border bg-white/50 backdrop-blur-sm transition-all duration-500 group-hover:bg-white" style={{ borderColor: tokens.border }}>
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6 relative z-10 bg-white shadow-sm transition-transform duration-500 group-hover:scale-110">
                    <f.icon className="h-6 w-6" style={{ color: tokens.accent }} />
                  </div>
                  <h3 className="text-2xl font-tenor-sans mb-4 relative z-10" style={{ color: tokens.foreground }}>{f.title}</h3>
                  <p className="font-light text-sm leading-relaxed relative z-10" style={{ color: tokens.mutedForeground }}>{f.desc}</p>

                  {/* Hover gradient sweep */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500" style={{ background: `linear-gradient(to bottom right, ${tokens.accent}, ${tokens.accent2})` }} />
                </div>
              </motion.div>
            ))}
          </div>
        </StaggerReveal>
      </div>
    </section>
  )
}

function ProductDetail() {
  return (
    <section id="gallery" className="py-32" style={{ backgroundColor: tokens.surface }}>
      <div className="max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-20 items-center">
        <div className="relative group">
          <RevealUp className="relative h-[600px] w-full overflow-hidden rounded-sm">
            {/* Scruffy Image (Background) */}
            <img
              src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80"
              alt="Before grooming"
              className="absolute inset-0 w-full h-full object-cover filter grayscale"
            />
            {/* Sleek Image (Foreground Masked) */}
            <motion.div
              className="absolute inset-0"
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 2, ease: "circOut" }}
            >
              <img
                src="https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?auto=format&fit=crop&q=80"
                alt="After grooming"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-y-0 right-0 w-1 shadow-[0_0_20px_rgba(34,211,238,0.5)]" style={{ backgroundColor: tokens.accent }} />
            </motion.div>
          </RevealUp>
        </div>

        <div>
          <RevealUp>
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="h-px w-8" style={{ backgroundColor: tokens.accent2 }} />
              <span className="text-xs tracking-widest uppercase" style={{ color: tokens.mutedForeground }}>Transformation</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-tenor-sans mb-8 leading-tight" style={{ color: tokens.foreground }}>
              From Scruffy <br/>to Sleek.
            </h2>
            <p className="text-lg font-light leading-relaxed mb-10" style={{ color: tokens.mutedForeground }}>
              Our signature technique combines advanced grooming technology with artistic precision. We don't just cut hair; we sculpt the coat to highlight your pet's natural structure.
            </p>

            <ul className="space-y-6">
              {["Consultation & Coat Analysis", "Ozone Deep Cleanse", "Precision Hand-Scissoring"].map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + (i * 0.1), duration: 0.6 }}
                  className="flex items-center gap-4 text-sm tracking-wide"
                  style={{ color: tokens.foreground }}
                >
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: tokens.accent }} />
                  {item}
                </motion.li>
              ))}
            </ul>
          </RevealUp>
        </div>
      </div>
    </section>
  )
}

function Pricing() {
  return (
    <section className="py-32" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-5xl mx-auto px-8">
        <RevealUp>
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-tenor-sans" style={{ color: tokens.foreground }}>
              Menu of Services
            </h2>
          </div>
        </RevealUp>

        <StaggerReveal>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {PRICING.map((tier) => (
              <motion.div
                key={tier.name}
                variants={revealItem}
                whileHover={{ y: -5 }}
                transition={physics.snap}
                className="p-10 bg-white relative group border"
                style={tier.highlighted
                  ? { borderColor: tokens.accent, boxShadow: `0 20px 40px -10px ${tokens.border}` }
                  : { borderColor: tokens.border }
                }
              >
                {tier.highlighted && (
                  <div className="absolute top-0 right-0 p-4">
                     <Sparkles className="w-5 h-5" style={{ color: tokens.accent }} />
                  </div>
                )}

                <h3 className="text-2xl font-tenor-sans mb-4" style={{ color: tokens.foreground }}>{tier.name}</h3>
                <p className="font-light text-sm mb-8 h-10" style={{ color: tokens.mutedForeground }}>{tier.description}</p>

                <div className="flex items-start gap-1 mb-10 pb-10 border-b" style={{ borderColor: tokens.border }}>
                  <span className="text-4xl font-tenor-sans" style={{ color: tokens.foreground }}>{tier.price}</span>
                  <span className="text-sm mt-1" style={{ color: tokens.mutedForeground }}>/{tier.period}</span>
                </div>

                <ul className="space-y-4 mb-10">
                  {tier.features.map(f => (
                    <li key={f} className="flex items-center gap-3 text-sm font-light">
                      <Check className="h-4 w-4" style={{ color: tokens.accent }} />
                      <span style={{ color: tokens.foreground }}>{f}</span>
                    </li>
                  ))}
                </ul>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 text-sm tracking-widest uppercase transition-colors"
                  style={tier.highlighted
                    ? { backgroundColor: tokens.foreground, color: tokens.surface }
                    : { backgroundColor: 'transparent', color: tokens.foreground, border: `1px solid ${tokens.foreground}` }
                  }
                >
                  {tier.cta}
                </motion.button>
              </motion.div>
            ))}
          </div>
        </StaggerReveal>
      </div>
    </section>
  )
}

function Testimonials() {
  return (
    <section className="py-32 border-y" style={{ borderColor: tokens.border, backgroundColor: tokens.surface }}>
      <div className="max-w-7xl mx-auto px-8">
        <RevealUp>
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-tenor-sans" style={{ color: tokens.foreground }}>
              Client Reflections
            </h2>
          </div>
        </RevealUp>

        <StaggerReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                variants={revealItem}
                className="p-8 border bg-gradient-to-b from-white to-transparent"
                style={{ borderColor: tokens.border }}
              >
                <div className="flex mb-6 gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" style={{ color: tokens.accent }} />
                  ))}
                </div>
                <p className="font-light text-sm leading-relaxed mb-8 italic" style={{ color: tokens.mutedForeground }}>"{t.text}"</p>
                <div>
                  <p className="text-sm tracking-wide uppercase mb-1" style={{ color: tokens.foreground }}>{t.name}</p>
                  <p className="text-xs" style={{ color: tokens.accent2 }}>{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </StaggerReveal>
      </div>
    </section>
  )
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="about" className="py-32" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-3xl mx-auto px-8">
        <RevealUp>
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-tenor-sans" style={{ color: tokens.foreground }}>
              Salon Details
            </h2>
          </div>
        </RevealUp>

        <div className="space-y-4">
          {FAQ_ITEMS.map((item, i) => (
            <RevealUp key={i} delay={i * 0.1}>
              <div className="border bg-white transition-all duration-300" style={{ borderColor: openIndex === i ? tokens.accent : tokens.border }}>
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="text-lg font-tenor-sans" style={{ color: tokens.foreground }}>{item.q}</span>
                  <motion.span
                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                    transition={{ duration: 0.4, ease: "circOut" }}
                  >
                    <ChevronDown className="h-5 w-5" style={{ color: tokens.mutedForeground }} />
                  </motion.span>
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "circOut" }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div className="px-6 pb-6 border-t pt-4 mx-6" style={{ borderColor: tokens.border }}>
                        <p className="font-light text-sm leading-relaxed" style={{ color: tokens.mutedForeground }}>
                          {item.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </RevealUp>
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
    <section className="py-32 relative overflow-hidden" style={{ backgroundColor: tokens.foreground }}>
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent" />

      <div className="max-w-2xl mx-auto px-8 text-center relative z-10">
        <RevealUp>
          <h2 className="text-4xl md:text-5xl font-tenor-sans mb-6 text-white">
            Join the List
          </h2>
          <p className="text-sm font-light mb-12" style={{ color: tokens.accent2 }}>
            Subscribe for exclusive offers, grooming tips, and early access to holiday bookings.
          </p>

          {status === 'success' ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 border"
              style={{ borderColor: tokens.border, backgroundColor: 'rgba(255,255,255,0.05)' }}
            >
              <p className="text-sm tracking-widest uppercase text-white">Thank you. You are subscribed.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                required
                placeholder="EMAIL ADDRESS"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="flex-1 h-14 px-6 bg-transparent border text-sm text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors"
                style={{ borderColor: tokens.mutedForeground }}
              />
              <motion.button
                type="submit"
                disabled={status === 'loading'}
                whileHover={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                className="h-14 px-10 text-sm tracking-widest uppercase text-white border disabled:opacity-60 transition-colors"
                style={{ borderColor: tokens.surface }}
              >
                {status === 'loading' ? 'Processing' : 'Subscribe'}
              </motion.button>
            </form>
          )}
        </RevealUp>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="py-20" style={{ backgroundColor: tokens.surface }}>
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="h-5 w-5" style={{ color: tokens.accent }} />
              <span className="text-xl font-tenor-sans tracking-wide uppercase" style={{ color: tokens.foreground }}>
                {PRODUCT_NAME}
              </span>
            </div>
            <p className="font-light text-sm max-w-sm" style={{ color: tokens.mutedForeground }}>
              Elevating pet care through precision, patience, and premium products.
            </p>
          </div>

          <div>
            <p className="text-xs tracking-widest uppercase mb-6" style={{ color: tokens.foreground }}>Salon</p>
            <ul className="space-y-4 text-sm font-light">
              {['Services', 'Our Groomers', 'Gallery', 'Booking Policy'].map(item => (
                <li key={item}>
                  <a href="#" className="hover:opacity-70 transition-opacity" style={{ color: tokens.mutedForeground }}>{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs tracking-widest uppercase mb-6" style={{ color: tokens.foreground }}>Connect</p>
            <ul className="space-y-4 text-sm font-light">
              {['Instagram', 'Facebook', 'Contact Us', 'Careers'].map(item => (
                <li key={item}>
                  <a href="#" className="hover:opacity-70 transition-opacity" style={{ color: tokens.mutedForeground }}>{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderColor: tokens.border }}>
          <p className="text-xs font-light" style={{ color: tokens.mutedForeground }}>
            © {new Date().getFullYear()} {PRODUCT_NAME}.
          </p>
          <a
            href="/"
            className="text-xs tracking-widest uppercase hover:opacity-70 transition-opacity"
            style={{ color: tokens.foreground }}
          >
            Return to Gallery
          </a>
        </div>
      </div>
    </footer>
  )
}

// ─────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────
export default function GroomGlidePage() {
  return (
    <div className={`min-h-screen ${tenorSans.variable} ${inter.variable} font-inter selection:bg-cyan-100`} style={{ backgroundColor: tokens.background }}>
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
