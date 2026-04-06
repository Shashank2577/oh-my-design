'use client'

import React, { useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Dog, Box, Heart, Zap, Check, ChevronDown, Bone, Star } from 'lucide-react'
import { Bangers, Lexend } from 'next/font/google'

const bangers = Bangers({ subsets: ['latin'], weight: '400', variable: '--font-bangers' })
const lexend = Lexend({ subsets: ['latin'], variable: '--font-lexend' })

// ─────────────────────────────────────────────
// DESIGN TOKENS
// ─────────────────────────────────────────────
const tokens = {
  background: '#F4EDE4', // Recycled Kraft
  surface: '#FFFFFF', // Bright Label
  accent: '#FF6B00', // Safety Orange
  accent2: '#2D9CDB', // Toy Blue
  border: '#D9C5B2', // Box Edge
  foreground: '#3E2723', // Dark Bark
  mutedForeground: '#8D6E63',
}

const PRODUCT_NAME = "BarkBoxer"

// ─────────────────────────────────────────────
// MOTION ARCHITECTURE
// ─────────────────────────────────────────────
const physics = {
  unboxing: { type: 'spring', stiffness: 180, damping: 12, mass: 1.2 } as const,
  squeak: { type: 'spring', stiffness: 500, damping: 5 } as const,
}

// Scroll Tumble Entrance
function TumbleUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotate: -10, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ ...physics.unboxing, delay }}
    >
      {children}
    </motion.div>
  )
}

function StaggerTumble({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        show: { transition: { staggerChildren: 0.15 } }
      }}
    >
      {children}
    </motion.div>
  )
}

const tumbleItem: import('framer-motion').Variants = {
  hidden: { opacity: 0, y: 40, rotate: 10, scale: 0.8 },
  show: { opacity: 1, y: 0, rotate: 0, scale: 1, transition: physics.unboxing }
}

// Squeak Button Component
interface SqueakButtonProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  onClick?: () => void
  type?: "button" | "submit" | "reset"
  disabled?: boolean
}

function SqueakButton({ children, className = '', onClick, type = 'button', disabled, style }: SqueakButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={disabled ? undefined : { scale: 0.9, rotate: [0, -5, 5, -5, 0], transition: physics.squeak }}
      className={`font-bangers tracking-wider uppercase shadow-[4px_4px_0px_0px] active:shadow-[0px_0px_0px_0px] active:translate-y-1 active:translate-x-1 transition-all ${className} ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
      style={{
        backgroundColor: tokens.accent,
        color: tokens.surface,
        borderColor: tokens.foreground,
        boxShadow: disabled ? `0px 0px 0px 0px ${tokens.foreground}` : `4px 4px 0px 0px ${tokens.foreground}`,
        ...style
      }}
    >
      {children}
    </motion.button>
  )
}

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────
const FEATURES = [
  { icon: Zap, title: "Tough Toys", desc: "Built for super chewers. Kevlar stitching, hidden layers." },
  { icon: Heart, title: "Healthy Treats", desc: "All-natural ingredients, zero weird fillers." },
  { icon: Bone, title: "Customizable", desc: "Allergies? Picky? We customize every single box." },
]

const STATS = [
  { value: "2M+", label: "Happy Pups" },
  { value: "10M+", label: "Toys Destroyed" },
  { value: "4.9/5", label: "Average Rating" },
]

const PRICING = [
  {
    name: "The Pup",
    price: "$22",
    period: "mo",
    description: "Perfect for small dogs and light chewers.",
    features: ["2 Toys", "2 Bags of Treats", "1 Chew"],
    cta: "Get the Pup Box",
    highlighted: false
  },
  {
    name: "Super Chewer",
    price: "$29",
    period: "mo",
    description: "Our toughest toys for serious jaws.",
    features: ["2 Tough Toys", "2 Bags of Treats", "2 Meaty Chews"],
    cta: "Get Super Chewer",
    highlighted: true
  }
]

const TESTIMONIALS = [
  {
    name: "Buster's Mom",
    role: "Golden Retriever Parent",
    text: "Buster used to destroy toys in 5 minutes. BarkBoxer toys actually last! Plus the unboxing is his favorite part of the month.",
    rating: 5
  },
  {
    name: "Max & Luna",
    role: "Terrier Mixes",
    text: "We love the treats! Mom loves that they don't have wheat or soy. It's a win-win for the whole pack.",
    rating: 5
  },
  {
    name: "Duke's Dad",
    role: "Pitbull Owner",
    text: "The Super Chewer box is a game changer. Finally, toys that fight back.",
    rating: 5
  }
]

const FAQ_ITEMS = [
  { q: "What if my dog destroys a toy?", a: "We replace it for free, no questions asked! That's our Scout's Honor guarantee." },
  { q: "Can I customize for allergies?", a: "Absolutely. When you sign up, you'll tell us about any allergies and we'll ensure your box is safe." },
  { q: "How do I cancel?", a: "You can pause or cancel anytime right from your account dashboard." },
  { q: "When does it ship?", a: "We ship on the 15th of every month. You'll get a tracking link so you can wait by the door with your pup." }
]

// ─────────────────────────────────────────────
// COMPONENTS
// ─────────────────────────────────────────────
function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={physics.unboxing}
      className="sticky top-0 z-50 border-b-4 bg-opacity-95 backdrop-blur"
      style={{ backgroundColor: tokens.background, borderColor: tokens.foreground }}
    >
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <motion.div
            whileHover={{ rotate: [0, -10, 10, -10, 0] }}
            transition={physics.squeak}
          >
            <Box className="h-8 w-8" style={{ color: tokens.accent }} />
          </motion.div>
          <span className="text-3xl font-bangers tracking-wide" style={{ color: tokens.foreground }}>
            {PRODUCT_NAME}
          </span>
        </div>
        <div className="hidden md:flex gap-8">
          {['Features', 'Box Plans', 'Reviews'].map(item => (
            <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-lg font-bangers tracking-wider hover:scale-110 transition-transform" style={{ color: tokens.foreground }}>
              {item}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <a href="#" className="hidden sm:block text-lg font-bangers tracking-wider hover:underline" style={{ color: tokens.foreground }}>Log In</a>
          <SqueakButton className="px-6 py-2 rounded-xl text-xl border-2">
            Get Started
          </SqueakButton>
        </div>
      </div>
    </motion.nav>
  )
}

function Hero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div className="z-10 relative">
          <TumbleUp>
            <div className="inline-block px-4 py-1 rounded-full border-2 mb-6 font-bangers tracking-wider text-xl transform -rotate-2" style={{ borderColor: tokens.foreground, backgroundColor: tokens.accent2, color: tokens.surface }}>
              #1 Monthly Box for Good Boys & Girls
            </div>
          </TumbleUp>
          <TumbleUp delay={0.1}>
            <h1 className="text-7xl md:text-8xl font-bangers leading-[0.9] mb-6 uppercase" style={{ color: tokens.foreground }}>
              Unbox Pure <span style={{ color: tokens.accent, WebkitTextStroke: `2px ${tokens.foreground}` }}>Joy.</span>
            </h1>
          </TumbleUp>
          <TumbleUp delay={0.2}>
            <p className="text-xl mb-8 font-lexend max-w-md" style={{ color: tokens.mutedForeground }}>
              Tough toys, healthy treats, and messy unboxing fun delivered right to your door.
            </p>
          </TumbleUp>
          <TumbleUp delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4">
              <SqueakButton className="h-16 px-8 rounded-2xl text-2xl border-4 flex items-center justify-center gap-3">
                <Box className="w-6 h-6" /> Claim Your Box
              </SqueakButton>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="h-16 px-8 rounded-2xl font-bangers text-2xl tracking-wider border-4 flex items-center justify-center gap-2"
                style={{ backgroundColor: tokens.surface, color: tokens.foreground, borderColor: tokens.foreground, boxShadow: `4px 4px 0px 0px ${tokens.foreground}` }}
              >
                See Inside
              </motion.button>
            </div>
          </TumbleUp>
        </div>

        <div className="relative h-[500px] w-full perspective-[1000px]">
          <motion.div
            initial={{ rotateY: 90, opacity: 0, scale: 0.5 }}
            animate={{ rotateY: -10, opacity: 1, scale: 1 }}
            transition={{ ...physics.unboxing, delay: 0.4 }}
            className="absolute inset-0 bg-cover bg-center rounded-3xl border-8 border-white shadow-2xl transform-style-preserve-3d"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80")',
              borderColor: tokens.surface,
              boxShadow: `12px 12px 0px 0px ${tokens.accent}`
            }}
          >
            {/* Flap animations */}
            <motion.div
              initial={{ rotateX: 0 }}
              animate={{ rotateX: -110 }}
              transition={{ ...physics.unboxing, delay: 1 }}
              className="absolute -top-4 left-0 right-0 h-16 origin-bottom border-4"
              style={{ backgroundColor: tokens.border, borderColor: tokens.foreground }}
            />
          </motion.div>
        </div>
      </div>

      {/* Background decorations */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute -top-20 -right-20 opacity-20 pointer-events-none"
      >
        <Bone className="w-96 h-96" style={{ color: tokens.border }} />
      </motion.div>
    </section>
  )
}

function Stats() {
  return (
    <section className="py-12 border-y-4" style={{ backgroundColor: tokens.surface, borderColor: tokens.foreground }}>
      <div className="max-w-6xl mx-auto px-6">
        <StaggerTumble>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-center">
            {STATS.map(s => (
              <motion.div key={s.label} variants={tumbleItem} className="flex flex-col items-center">
                <span className="text-5xl font-bangers" style={{ color: tokens.accent, textShadow: `2px 2px 0px ${tokens.foreground}` }}>{s.value}</span>
                <span className="text-lg font-bangers tracking-wider mt-2" style={{ color: tokens.foreground }}>{s.label}</span>
              </motion.div>
            ))}
          </div>
        </StaggerTumble>
      </div>
    </section>
  )
}

function Features() {
  return (
    <section id="features" className="py-24 overflow-hidden relative" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-6xl mx-auto px-6">
        <TumbleUp>
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bangers uppercase" style={{ color: tokens.foreground }}>
              What&apos;s in the <span className="underline decoration-4 underline-offset-4" style={{ textDecorationColor: tokens.accent2 }}>Box?</span>
            </h2>
          </div>
        </TumbleUp>

        <StaggerTumble>
          <div className="grid md:grid-cols-3 gap-8">
            {FEATURES.map((f, i) => (
              <motion.div
                key={i}
                variants={tumbleItem}
                whileHover={{ y: -10, rotate: i % 2 === 0 ? 2 : -2 }}
                className="p-8 rounded-3xl border-4 relative overflow-hidden group"
                style={{ backgroundColor: tokens.surface, borderColor: tokens.foreground, boxShadow: `8px 8px 0px 0px ${tokens.foreground}` }}
              >
                <div className="absolute -right-6 -top-6 bg-opacity-20 rounded-full w-32 h-32 transform group-hover:scale-150 transition-transform duration-500" style={{ backgroundColor: tokens.accent }} />
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center border-4 mb-6 relative z-10 transform -rotate-6" style={{ backgroundColor: tokens.accent2, borderColor: tokens.foreground }}>
                  <f.icon className="h-8 w-8" style={{ color: tokens.surface }} />
                </div>
                <h3 className="text-3xl font-bangers mb-3 relative z-10" style={{ color: tokens.foreground }}>{f.title}</h3>
                <p className="font-lexend text-lg leading-relaxed relative z-10" style={{ color: tokens.mutedForeground }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </StaggerTumble>
      </div>
    </section>
  )
}

function ProductDetail() {
  return (
    <section className="py-24 border-y-4" style={{ backgroundColor: tokens.accent, borderColor: tokens.foreground }}>
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <TumbleUp>
          <div className="relative">
            <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-3xl border-4" style={{ backgroundColor: tokens.foreground, borderColor: tokens.foreground }} />
            <motion.img
              src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80"
              alt="Dog playing with toy"
              className="relative rounded-3xl border-4 object-cover w-full h-[400px]"
              style={{ borderColor: tokens.foreground }}
              whileHover={{ rotate: -2, scale: 1.02 }}
              transition={physics.unboxing}
            />
          </div>
        </TumbleUp>

        <div>
          <TumbleUp delay={0.1}>
            <h2 className="text-5xl md:text-6xl font-bangers uppercase mb-6" style={{ color: tokens.surface, textShadow: `3px 3px 0px ${tokens.foreground}` }}>
              Designed for Destruction.
            </h2>
            <p className="text-xl font-lexend mb-8" style={{ color: tokens.surface }}>
              We know your pup goes hard. That&apos;s why our Super Chewer toys are made with natural rubber and tough nylon. If they defeat it, we replace it.
            </p>
            <ul className="space-y-4 font-bangers text-2xl tracking-wide" style={{ color: tokens.surface }}>
              {["No Fluff, No Mess", "Tested by Heavy Chewers", "100% Satisfaction Guarantee"].map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + (i * 0.1) }}
                  className="flex items-center gap-3"
                >
                  <div className="p-1 rounded-md border-2" style={{ backgroundColor: tokens.surface, borderColor: tokens.foreground }}>
                    <Check className="w-5 h-5" style={{ color: tokens.foreground }} />
                  </div>
                  <span style={{ textShadow: `2px 2px 0px ${tokens.foreground}` }}>{item}</span>
                </motion.li>
              ))}
            </ul>
          </TumbleUp>
        </div>
      </div>
    </section>
  )
}

function Pricing() {
  return (
    <section id="box-plans" className="py-24" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-5xl mx-auto px-6">
        <TumbleUp>
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bangers uppercase" style={{ color: tokens.foreground }}>
              Pick Your <span style={{ color: tokens.accent2, textShadow: `2px 2px 0px ${tokens.foreground}` }}>Plan</span>
            </h2>
          </div>
        </TumbleUp>

        <StaggerTumble>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {PRICING.map((tier) => (
              <motion.div
                key={tier.name}
                variants={tumbleItem}
                whileHover={{ y: -8 }}
                className="p-8 rounded-3xl border-4 relative flex flex-col"
                style={tier.highlighted
                  ? { backgroundColor: tokens.surface, borderColor: tokens.foreground, boxShadow: `12px 12px 0px 0px ${tokens.accent}` }
                  : { backgroundColor: tokens.surface, borderColor: tokens.foreground, boxShadow: `8px 8px 0px 0px ${tokens.foreground}` }
                }
              >
                {tier.highlighted && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full border-4 font-bangers tracking-wider text-lg rotate-2" style={{ backgroundColor: tokens.accent, color: tokens.surface, borderColor: tokens.foreground }}>
                    Most Popular
                  </div>
                )}

                <h3 className="text-4xl font-bangers mb-2" style={{ color: tokens.foreground }}>{tier.name}</h3>
                <div className="flex items-end gap-1 mb-4">
                  <span className="text-6xl font-bangers" style={{ color: tokens.foreground }}>{tier.price}</span>
                  <span className="text-xl font-bangers mb-1" style={{ color: tokens.mutedForeground }}>/{tier.period}</span>
                </div>
                <p className="font-lexend text-lg mb-8" style={{ color: tokens.mutedForeground }}>{tier.description}</p>

                <ul className="space-y-4 mb-8 flex-1">
                  {tier.features.map(f => (
                    <li key={f} className="flex items-center gap-3 font-lexend text-lg">
                      <Zap className="h-5 w-5 flex-shrink-0" style={{ color: tokens.accent2 }} />
                      <span style={{ color: tokens.foreground }}>{f}</span>
                    </li>
                  ))}
                </ul>

                <SqueakButton
                  className="w-full h-16 rounded-2xl text-2xl border-4"
                  style={tier.highlighted ? { backgroundColor: tokens.accent, color: tokens.surface } : { backgroundColor: tokens.border, color: tokens.foreground }}
                >
                  {tier.cta}
                </SqueakButton>
              </motion.div>
            ))}
          </div>
        </StaggerTumble>
      </div>
    </section>
  )
}

function Testimonials() {
  return (
    <section id="reviews" className="py-24 border-y-4 overflow-hidden relative" style={{ borderColor: tokens.foreground, backgroundColor: tokens.surface }}>
      {/* Background stamp */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none text-[30vw] font-bangers uppercase whitespace-nowrap rotate-[-15deg]">
        Woof Woof
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <TumbleUp>
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bangers uppercase" style={{ color: tokens.foreground }}>
              Happy <span style={{ color: tokens.accent, textShadow: `2px 2px 0px ${tokens.foreground}` }}>Tails</span>
            </h2>
          </div>
        </TumbleUp>

        <StaggerTumble>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                variants={tumbleItem}
                className="p-8 rounded-3xl border-4 relative"
                style={{
                  backgroundColor: tokens.background,
                  borderColor: tokens.foreground,
                  boxShadow: `6px 6px 0px 0px ${tokens.border}`,
                  transform: `rotate(${i % 2 === 0 ? 2 : -2}deg)`
                }}
              >
                <div className="flex mb-4 gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-6 w-6 fill-current" style={{ color: tokens.accent }} />
                  ))}
                </div>
                <p className="font-lexend text-lg leading-relaxed mb-6" style={{ color: tokens.foreground }}>&quot;{t.text}&quot;</p>
                <div>
                  <p className="font-bangers text-2xl tracking-wide" style={{ color: tokens.foreground }}>{t.name}</p>
                  <p className="font-lexend text-sm" style={{ color: tokens.mutedForeground }}>{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </StaggerTumble>
      </div>
    </section>
  )
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-24" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-3xl mx-auto px-6">
        <TumbleUp>
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bangers uppercase" style={{ color: tokens.foreground }}>
              Got Questions?
            </h2>
          </div>
        </TumbleUp>

        <div className="space-y-4">
          {FAQ_ITEMS.map((item, i) => (
            <TumbleUp key={i} delay={i * 0.1}>
              <div className="border-4 rounded-2xl overflow-hidden" style={{ borderColor: tokens.foreground, backgroundColor: tokens.surface, boxShadow: openIndex === i ? `4px 4px 0px 0px ${tokens.foreground}` : `0px 0px 0px 0px ${tokens.foreground}` }}>
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-bangers text-2xl tracking-wide" style={{ color: tokens.foreground }}>{item.q}</span>
                  <motion.span
                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  >
                    <ChevronDown className="h-6 w-6 flex-shrink-0" style={{ color: tokens.foreground }} />
                  </motion.span>
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div className="px-6 pb-6 pt-2 border-t-2" style={{ borderColor: tokens.border }}>
                        <p className="font-lexend text-lg leading-relaxed" style={{ color: tokens.mutedForeground }}>
                          {item.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </TumbleUp>
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
    <section className="py-24 border-y-4 overflow-hidden" style={{ borderColor: tokens.foreground, backgroundColor: tokens.accent2 }}>
      <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
        <TumbleUp>
          <div className="inline-block bg-white p-4 rounded-full border-4 mb-6 transform rotate-6" style={{ borderColor: tokens.foreground }}>
            <Dog className="w-12 h-12" style={{ color: tokens.foreground }} />
          </div>
          <h2 className="text-5xl md:text-6xl font-bangers uppercase mb-4" style={{ color: tokens.surface, textShadow: `3px 3px 0px ${tokens.foreground}` }}>
            Join the Pack!
          </h2>
          <p className="text-xl font-lexend mb-8" style={{ color: tokens.surface }}>
            Sign up for pup-dates, special offers, and cute dog photos.
          </p>

          {status === 'success' ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white p-6 rounded-2xl border-4 inline-block transform -rotate-2"
              style={{ borderColor: tokens.foreground }}
            >
              <p className="font-bangers text-3xl" style={{ color: tokens.accent }}>Pawsome! You&apos;re on the list.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="flex-1 h-16 px-6 rounded-2xl border-4 font-lexend text-lg focus:outline-none focus:ring-4 focus:ring-offset-0"
                style={{ borderColor: tokens.foreground, backgroundColor: tokens.surface, color: tokens.foreground }}
              />
              <SqueakButton
                type="submit"
                disabled={status === 'loading'}
                className="h-16 px-8 rounded-2xl text-2xl border-4 disabled:opacity-60"
                style={{ backgroundColor: tokens.accent, color: tokens.surface }}
              >
                {status === 'loading' ? 'Fetching...' : 'Subscribe'}
              </SqueakButton>
            </form>
          )}
        </TumbleUp>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="py-16 pb-8" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Box className="h-8 w-8" style={{ color: tokens.accent }} />
              <span className="text-4xl font-bangers tracking-wide" style={{ color: tokens.foreground }}>
                {PRODUCT_NAME}
              </span>
            </div>
            <p className="font-lexend text-lg" style={{ color: tokens.mutedForeground }}>
              Delivering joy to dogs everywhere, one box at a time.
            </p>
          </div>

          <div>
            <p className="font-bangers text-2xl mb-4" style={{ color: tokens.foreground }}>Shop</p>
            <ul className="space-y-3 font-lexend text-lg">
              {['Box Plans', 'Gift a Box', 'Super Chewer', 'Treats'].map(item => (
                <li key={item}>
                  <a href="#" className="hover:underline" style={{ color: tokens.mutedForeground }}>{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-bangers text-2xl mb-4" style={{ color: tokens.foreground }}>About</p>
            <ul className="space-y-3 font-lexend text-lg">
              {['Our Story', 'Careers', 'Rescue Partners', 'Blog'].map(item => (
                <li key={item}>
                  <a href="#" className="hover:underline" style={{ color: tokens.mutedForeground }}>{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-bangers text-2xl mb-4" style={{ color: tokens.foreground }}>Support</p>
            <ul className="space-y-3 font-lexend text-lg">
              {['FAQ', 'Contact Us', 'Shipping', 'Returns'].map(item => (
                <li key={item}>
                  <a href="#" className="hover:underline" style={{ color: tokens.mutedForeground }}>{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t-4 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderColor: tokens.border }}>
          <p className="font-lexend" style={{ color: tokens.mutedForeground }}>
            © {new Date().getFullYear()} {PRODUCT_NAME}. All rights reserved.
          </p>
          <a
            href="/"
            className="font-bangers text-xl px-6 py-2 rounded-xl border-4 transition-transform hover:scale-105"
            style={{ borderColor: tokens.foreground, color: tokens.foreground, backgroundColor: tokens.surface }}
          >
            ← Back to Gallery
          </a>
        </div>
      </div>
    </footer>
  )
}

// ─────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────
export default function BarkBoxerPage() {
  return (
    <div className={`min-h-screen ${bangers.variable} ${lexend.variable}`} style={{ backgroundColor: tokens.background }}>
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