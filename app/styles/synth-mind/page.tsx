'use client'

import React, { useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Plus_Jakarta_Sans, Syne, Space_Mono } from 'next/font/google'
import { Menu, X, ArrowRight, Zap, Orbit, Cpu, Sparkles, Check, Star, ChevronDown } from 'lucide-react'

const syne = Syne({ subsets: ['latin'], variable: '--font-syne' })
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-jakarta' })
const spaceMono = Space_Mono({ weight: ['400', '700'], subsets: ['latin'], variable: '--font-space' })

const tokens = {
  background: '#03001C',
  surface: 'rgba(48, 25, 52, 0.4)',
  accent1: '#B6EADA',
  accent2: '#5B8FB9',
  border: 'rgba(182, 234, 218, 0.2)',
  textHigh: '#B6EADA',
  textMuted: 'rgba(182, 234, 218, 0.6)'
}

const PRODUCT_NAME = "SynthMind"

// Components
const Blob = () => {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null
  return (
  <motion.div
    className="absolute inset-0 z-0 pointer-events-none opacity-40 blur-[100px]"
    animate={{
      scale: [1, 1.2, 0.9, 1.1, 1],
      rotate: [0, 90, -45, 180, 0],
      borderRadius: ["40%", "60%", "30%", "70%", "40%"]
    }}
    transition={{
      duration: 20,
      repeat: Infinity,
      ease: "easeInOut"
    }}
    style={{
      background: `radial-gradient(circle at center, ${tokens.accent2} 0%, transparent 70%)`
    }}
  />
  )
}

const FadeUp = ({ children, delay = 0, className = '' }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
    className={className}
  >
    {children}
  </motion.div>
)

const ChromaticPulse = ({ children }: { children: React.ReactNode }) => {
  const [pulse, setPulse] = useState(false)
  useEffect(() => {
    const interval = setInterval(() => setPulse(true), 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      animate={pulse ? {
        textShadow: [
          "0 0 0 transparent, 0 0 0 transparent",
          `2px 0 0 red, -2px 0 0 cyan`,
          "0 0 0 transparent, 0 0 0 transparent"
        ]
      } : {}}
      transition={{ duration: 0.5 }}
      onAnimationComplete={() => setPulse(false)}
    >
      {children}
    </motion.div>
  )
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-md border-b" style={{ borderColor: tokens.border, backgroundColor: 'rgba(3, 0, 28, 0.8)' }}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className={`text-2xl font-bold ${syne.className}`} style={{ color: tokens.textHigh }}>
          <ChromaticPulse>{PRODUCT_NAME}</ChromaticPulse>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          {['Latent Space', 'Models', 'Pricing'].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} className={`text-sm tracking-wider ${spaceMono.className} hover:text-white transition-colors`} style={{ color: tokens.textMuted }}>
              /{item}
            </a>
          ))}
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: `0 0 20px ${tokens.accent1}40` }}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-2 rounded-full text-sm font-bold ${jakarta.className}`}
            style={{ backgroundColor: tokens.accent1, color: tokens.background }}
          >
            Enter Node
          </motion.button>
        </div>
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)} style={{ color: tokens.textHigh }}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b"
            style={{ borderColor: tokens.border, backgroundColor: tokens.surface }}
          >
            <div className="p-6 flex flex-col space-y-4">
              {['Latent Space', 'Models', 'Pricing'].map(item => (
                <a key={item} href={`#${item.toLowerCase()}`} className={`text-sm ${spaceMono.className}`} style={{ color: tokens.textHigh }}>
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

function Hero() {
  const [prompt, setPrompt] = useState("A surreal dreamscape of neon flora")
  const [chars, setChars] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setChars(prev => (prev < prompt.length ? prev + 1 : prev))
    }, 50)
    return () => clearInterval(interval)
  }, [prompt])

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      <Blob />
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <FadeUp delay={0.2}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8" style={{ borderColor: tokens.border, backgroundColor: tokens.surface }}>
            <Sparkles className="w-4 h-4" style={{ color: tokens.accent1 }} />
            <span className={`text-xs uppercase tracking-widest ${spaceMono.className}`} style={{ color: tokens.textHigh }}>
              v4 Latent Engine Live
            </span>
          </div>
        </FadeUp>
        <FadeUp delay={0.4}>
          <h1 className={`text-6xl md:text-8xl font-black mb-8 leading-tight ${syne.className}`} style={{ color: tokens.textHigh }}>
            DREAM IN <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r" style={{ backgroundImage: `linear-gradient(to right, ${tokens.accent1}, ${tokens.accent2})` }}>
              ALGORITHMS
            </span>
          </h1>
        </FadeUp>
        <FadeUp delay={0.6}>
          <p className={`text-xl md:text-2xl mb-12 max-w-2xl mx-auto leading-relaxed ${jakarta.className}`} style={{ color: tokens.textMuted }}>
            Tap into the neural subconscious. SynthMind translates your intent into ethereal, amorphous digital realities.
          </p>
        </FadeUp>

        <FadeUp delay={0.8} className="max-w-xl mx-auto relative">
          <div className="absolute -inset-1 rounded-2xl blur-lg opacity-50" style={{ background: `linear-gradient(to right, ${tokens.accent1}, ${tokens.accent2})` }} />
          <div className="relative flex items-center p-2 rounded-2xl border backdrop-blur-xl" style={{ borderColor: tokens.border, backgroundColor: 'rgba(3,0,28,0.9)' }}>
            <div className={`flex-1 px-4 text-left ${spaceMono.className}`} style={{ color: tokens.textHigh }}>
              &gt; {prompt.substring(0, chars)}<span className="animate-pulse">_</span>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-xl font-bold flex items-center gap-2 ${jakarta.className}`}
              style={{ backgroundColor: tokens.accent1, color: tokens.background }}
              onClick={() => setChars(0)}
            >
              Generate <Zap className="w-4 h-4" />
            </motion.button>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

function Stats() {
  return (
    <section className="py-20 border-y" style={{ borderColor: tokens.border, backgroundColor: tokens.surface }}>
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {[
          { label: "Parameters", value: "1.2T" },
          { label: "Latent Depth", value: "256x" },
          { label: "Generation", value: "400ms" },
          { label: "Dreams", value: "∞" }
        ].map((stat, i) => (
          <FadeUp key={stat.label} delay={i * 0.1}>
            <div className={`text-4xl md:text-5xl font-bold mb-2 ${syne.className}`} style={{ color: tokens.textHigh }}>
              {stat.value}
            </div>
            <div className={`text-xs uppercase tracking-widest ${spaceMono.className}`} style={{ color: tokens.textMuted }}>
              {stat.label}
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  )
}

function Features() {
  const features = [
    { icon: Orbit, title: "Amorphous Morphing", desc: "Fluid, non-destructive editing that feels organic rather than mechanical." },
    { icon: Cpu, title: "Neural Sync", desc: "Real-time bridge between your prompts and the latent space structure." },
    { icon: Sparkles, title: "Ethereal Upscale", desc: "Add infinite detail without losing the surreal aesthetic of the original." }
  ]
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute right-0 top-1/2 w-96 h-96 blur-[150px] opacity-30 rounded-full" style={{ backgroundColor: tokens.accent1 }} />
      <div className="max-w-6xl mx-auto px-6">
        <FadeUp>
          <h2 className={`text-4xl md:text-6xl font-bold mb-16 max-w-2xl ${syne.className}`} style={{ color: tokens.textHigh }}>
            Architecture of the Subconscious
          </h2>
        </FadeUp>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <FadeUp key={f.title} delay={i * 0.2}>
              <motion.div
                whileHover={{ y: -10, backgroundColor: tokens.surface }}
                className="p-8 rounded-3xl border transition-colors duration-500"
                style={{ borderColor: tokens.border, backgroundColor: 'transparent' }}
              >
                <f.icon className="w-10 h-10 mb-6" style={{ color: tokens.accent2 }} />
                <h3 className={`text-xl font-bold mb-4 ${jakarta.className}`} style={{ color: tokens.textHigh }}>{f.title}</h3>
                <p className={`text-sm leading-relaxed ${spaceMono.className}`} style={{ color: tokens.textMuted }}>{f.desc}</p>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProductDetail() {
  return (
    <section className="py-32 bg-black relative">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <FadeUp>
          <div className="aspect-square rounded-full border border-dashed flex items-center justify-center relative p-12" style={{ borderColor: tokens.border }}>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border-2 border-transparent"
              style={{ borderLeftColor: tokens.accent1, borderRightColor: tokens.accent2 }}
            />
            <motion.div
              animate={{
                borderRadius: ["30% 70% 70% 30% / 30% 30% 70% 70%", "70% 30% 30% 70% / 70% 70% 30% 30%", "30% 70% 70% 30% / 30% 30% 70% 70%"]
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className="w-full h-full"
              style={{ background: `linear-gradient(135deg, ${tokens.accent1}, ${tokens.accent2})`, opacity: 0.8, filter: 'blur(20px)' }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className={`text-xs uppercase tracking-widest ${spaceMono.className}`} style={{ color: tokens.background }}>Latent Visualizer</span>
            </div>
          </div>
        </FadeUp>
        <div>
          <FadeUp>
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${syne.className}`} style={{ color: tokens.textHigh }}>
              Navigate the Latent Space
            </h2>
            <p className={`text-lg mb-8 leading-relaxed ${jakarta.className}`} style={{ color: tokens.textMuted }}>
              Don't just prompt. Explore. Our 3D latent visualizer lets you drift between concepts, discovering liminal aesthetics that words alone cannot describe.
            </p>
            <ul className="space-y-4 mb-8">
              {['Real-time unblurring', 'Concept blending', 'Seed isolation'].map((item, i) => (
                <li key={i} className={`flex items-center gap-3 ${spaceMono.className} text-sm`} style={{ color: tokens.textHigh }}>
                  <Check className="w-4 h-4" style={{ color: tokens.accent1 }} /> {item}
                </li>
              ))}
            </ul>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}

function Pricing() {
  const tiers = [
    { name: "Lucid", price: "$0", desc: "Basic dream generation.", features: ["720p output", "Standard queues", "Community models"] },
    { name: "Astral", price: "$49", desc: "Deep neural access.", features: ["4k ethereal upscale", "Priority node access", "Private latent spaces"], active: true },
    { name: "Singularity", price: "Custom", desc: "For enterprise consciousness.", features: ["Dedicated GPU clusters", "Custom model fine-tuning", "API access"] }
  ]
  return (
    <section className="py-32 relative">
      <div className="max-w-6xl mx-auto px-6">
        <FadeUp className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${syne.className}`} style={{ color: tokens.textHigh }}>Compute Access</h2>
          <p className={`text-lg ${spaceMono.className}`} style={{ color: tokens.textMuted }}>Select your neural bandwidth.</p>
        </FadeUp>
        <div className="grid md:grid-cols-3 gap-8">
          {tiers.map((tier, i) => (
            <FadeUp key={tier.name} delay={i * 0.2}>
              <div className={`p-8 rounded-3xl border relative overflow-hidden h-full flex flex-col ${tier.active ? 'backdrop-blur-md' : ''}`}
                style={{
                  borderColor: tier.active ? tokens.accent1 : tokens.border,
                  backgroundColor: tier.active ? 'rgba(182, 234, 218, 0.05)' : tokens.surface
                }}>
                {tier.active && <div className="absolute top-0 right-0 p-4 text-xs font-bold uppercase tracking-wider" style={{ color: tokens.accent1 }}>Most Popular</div>}
                <h3 className={`text-2xl font-bold mb-2 ${syne.className}`} style={{ color: tokens.textHigh }}>{tier.name}</h3>
                <div className={`text-4xl font-bold mb-4 ${jakarta.className}`} style={{ color: tokens.textHigh }}>{tier.price}</div>
                <p className={`text-sm mb-8 ${spaceMono.className}`} style={{ color: tokens.textMuted }}>{tier.desc}</p>
                <ul className="space-y-4 mb-8 flex-1">
                  {tier.features.map((f, j) => (
                    <li key={j} className={`flex items-center gap-3 text-sm ${jakarta.className}`} style={{ color: tokens.textHigh }}>
                      <Check className="w-4 h-4" style={{ color: tokens.accent2 }} /> {f}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 rounded-xl font-bold ${jakarta.className} transition-colors`}
                  style={{
                    backgroundColor: tier.active ? tokens.accent1 : 'transparent',
                    color: tier.active ? tokens.background : tokens.textHigh,
                    border: `1px solid ${tier.active ? tokens.accent1 : tokens.border}`
                  }}>
                  {tier.price === 'Custom' ? 'Contact Node' : 'Initialize'}
                </button>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}

function Testimonials() {
  const [activeIdx, setActiveIdx] = useState(0)
  const testimonials = [
    { text: "It feels less like using a tool and more like conversing with an alien intelligence.", author: "E. Ripley", role: "Digital Artist" },
    { text: "The amorphous morphing completely changed how I think about visual transitions.", author: "J. Carmack", role: "Creative Director" },
    { text: "Uncanny, surreal, and absolutely essential for our studio's workflow.", author: "S. L.", role: "Concept Designer" }
  ]

  useEffect(() => {
    const int = setInterval(() => setActiveIdx(p => (p + 1) % testimonials.length), 5000)
    return () => clearInterval(int)
  }, [])

  return (
    <section className="py-32 bg-black border-y" style={{ borderColor: tokens.border }}>
      <div className="max-w-4xl mx-auto px-6 text-center">
        <FadeUp>
          <div className="flex justify-center mb-8">
            <Orbit className="w-12 h-12 animate-spin-slow" style={{ color: tokens.accent2 }} />
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
              animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              exit={{ opacity: 0, filter: 'blur(10px)', y: -20 }}
              transition={{ duration: 0.8 }}
            >
              <p className={`text-2xl md:text-4xl leading-relaxed mb-8 ${syne.className}`} style={{ color: tokens.textHigh }}>
                "{testimonials[activeIdx].text}"
              </p>
              <div className={spaceMono.className}>
                <div className="text-lg font-bold" style={{ color: tokens.accent1 }}>{testimonials[activeIdx].author}</div>
                <div className="text-sm uppercase tracking-widest" style={{ color: tokens.textMuted }}>{testimonials[activeIdx].role}</div>
              </div>
            </motion.div>
          </AnimatePresence>
        </FadeUp>
      </div>
    </section>
  )
}

function FAQ() {
  const faqs = [
    { q: "How is SynthMind different from other image generators?", a: "We focus on latent space exploration rather than raw text-to-image. It's about drifting between concepts and discovering new aesthetics organically." },
    { q: "Can I use my own fine-tuned models?", a: "Yes, Astral and Singularity tier users can upload custom LoRAs to bias the subconscious engine." },
    { q: "What is 'Amorphous Morphing'?", a: "It's our proprietary rendering technique that dissolves noise into coherent shapes using fluid dynamics algorithms, avoiding standard pixelation." }
  ]
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="py-32">
      <div className="max-w-3xl mx-auto px-6">
        <FadeUp className="mb-16">
          <h2 className={`text-4xl font-bold ${syne.className}`} style={{ color: tokens.textHigh }}>Neural Queries</h2>
        </FadeUp>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <FadeUp key={i} delay={i * 0.1}>
              <div className="border rounded-2xl overflow-hidden" style={{ borderColor: tokens.border, backgroundColor: tokens.surface }}>
                <button
                  className="w-full flex items-center justify-between p-6 text-left"
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  <span className={`font-bold ${jakarta.className}`} style={{ color: tokens.textHigh }}>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-500 ${open === i ? 'rotate-180' : ''}`} style={{ color: tokens.accent1 }} />
                </button>
                <AnimatePresence>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className={`p-6 pt-0 text-sm leading-relaxed ${spaceMono.className}`} style={{ color: tokens.textMuted }}>
                        {faq.a}
                      </div>
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
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 z-0" style={{ background: `radial-gradient(circle at bottom, ${tokens.surface} 0%, transparent 70%)` }} />
      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
        <FadeUp>
          <h2 className={`text-4xl font-bold mb-6 ${syne.className}`} style={{ color: tokens.textHigh }}>Join the Collective Consciousness</h2>
          <p className={`mb-10 ${spaceMono.className}`} style={{ color: tokens.textMuted }}>Receive transmissions on model updates and new latent discoveries.</p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter neural link (email)"
              className={`flex-1 px-6 py-4 rounded-xl border bg-black/50 backdrop-blur text-sm focus:outline-none focus:border-[${tokens.accent1}] ${jakarta.className}`}
              style={{ borderColor: tokens.border, color: tokens.textHigh }}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-8 py-4 rounded-xl font-bold ${jakarta.className}`}
              style={{ backgroundColor: tokens.accent1, color: tokens.background }}
            >
              Sync
            </motion.button>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="py-12 border-t" style={{ borderColor: tokens.border, backgroundColor: 'black' }}>
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className={`text-2xl font-bold ${syne.className}`} style={{ color: tokens.textHigh }}>{PRODUCT_NAME}</div>
        <div className={`text-sm ${spaceMono.className}`} style={{ color: tokens.textMuted }}>
          &copy; 2026 Latent Labs. All rights reserved.
        </div>
        <div className="flex gap-6">
          {['Twitter', 'Discord', 'GitHub'].map(l => (
            <a key={l} href="#" className={`text-sm hover:text-[${tokens.accent1}] transition-colors ${jakarta.className}`} style={{ color: tokens.textMuted }}>{l}</a>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default function SynthMindPage() {
  return (
    <div className={`min-h-screen selection:bg-[${tokens.accent1}] selection:text-black`} style={{ backgroundColor: tokens.background }}>
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
