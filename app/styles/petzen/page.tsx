'use client'

import React, { useState } from 'react'
import { motion, useScroll, useTransform, useSpring, useInView, Variants } from 'framer-motion'
import { ArrowRight, Sparkles, Heart, ShieldCheck, Star, ChevronDown, Check, Menu, X, Wind, Cloud, Smile } from 'lucide-react'
import { Plus_Jakarta_Sans, Quicksand } from 'next/font/google'

const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-jakarta' })
const quicksand = Quicksand({ subsets: ['latin'], variable: '--font-quicksand' })

const tokens = {
  background: '#F5F3FF',
  surface: 'rgba(255, 255, 255, 0.5)',
  accent: '#A78BFA',
  accent2: '#2DD4BF',
  border: 'rgba(167, 139, 250, 0.2)',
  textHigh: '#4C1D95',
  textLow: '#7C3AED',
}

const PRODUCT_NAME = "PetZen"

// Framer Motion Variants
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as const } }
}

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
}

const breathe: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 2, ease: "easeInOut" } }
}

const floatAnimation = {
  y: [0, -10, 0],
  transition: {
    duration: 6,
    repeat: Infinity,
    ease: "easeInOut"
  }
}

// Components
const ZenSection = ({ children, className = '', id = '', style = {} }: { children: React.ReactNode, className?: string, id?: string, style?: React.CSSProperties }) => (
  <section id={id} className={`py-24 relative overflow-hidden ${className}`} style={style}>
    {children}
  </section>
)

const AuraGlow = ({ className = '', color = tokens.accent }: { className?: string, color?: string }) => (
  <motion.div
    animate={{
      opacity: [0.3, 0.6, 0.3],
      scale: [1, 1.1, 1]
    }}
    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    className={`absolute rounded-full blur-[100px] pointer-events-none ${className}`}
    style={{ backgroundColor: color }}
  />
)

export default function PetZenPage() {
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])

  return (
    <div className={`${jakarta.variable} ${quicksand.variable} font-sans min-h-screen text-[${tokens.textHigh}] selection:bg-purple-200`} style={{ backgroundColor: tokens.background, color: tokens.textHigh }}>
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

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 backdrop-blur-xl border-b border-white/20" style={{ backgroundColor: 'rgba(245, 243, 255, 0.7)' }}>
      <div className="max-w-6xl mx-auto px-6 h-24 flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-2xl tracking-tight" style={{ fontFamily: 'var(--font-quicksand)', color: tokens.textHigh }}>
          <Sparkles className="h-6 w-6" style={{ color: tokens.accent2 }} />
          {PRODUCT_NAME}
        </div>

        <div className="hidden md:flex items-center gap-10 text-sm font-medium">
          {['Therapy', 'Method', 'Pricing'].map((item) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              whileHover={{ opacity: 0.7 }}
              style={{ color: tokens.textLow }}
              className="transition-opacity"
            >
              {item}
            </motion.a>
          ))}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-3 rounded-full text-white shadow-lg shadow-purple-500/20"
            style={{ backgroundColor: tokens.accent }}
          >
            Start Journey
          </motion.button>
        </div>

        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)} style={{ color: tokens.textHigh }}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <ZenSection className="pt-48 pb-32 text-center min-h-[90vh] flex items-center">
      <AuraGlow className="w-[800px] h-[800px] -top-40 -left-40" color={tokens.accent} />
      <AuraGlow className="w-[600px] h-[600px] top-20 -right-20" color={tokens.accent2} />

      <div className="max-w-4xl mx-auto px-6 relative z-10 w-full">
        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="flex flex-col items-center">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-10 border border-white/40 backdrop-blur-md" style={{ backgroundColor: tokens.surface }}>
            <Wind className="h-4 w-4" style={{ color: tokens.accent2 }} />
            <span className="text-sm font-medium tracking-wide" style={{ color: tokens.textLow }}>The Deep Breath for Pets</span>
          </motion.div>

          <motion.h1 variants={fadeUp} className="text-6xl md:text-8xl font-bold mb-8 leading-tight tracking-tight" style={{ fontFamily: 'var(--font-quicksand)', color: tokens.textHigh }}>
            Peace of Mind.<br/>Peace of Paws.
          </motion.h1>

          <motion.p variants={fadeUp} className="text-xl md:text-2xl mb-12 max-w-2xl font-light leading-relaxed" style={{ color: tokens.textLow }}>
            A harmonious blend of sound therapy, calming frequencies, and guided wellness to lower anxiety and restore balance.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-6">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-10 py-4 rounded-full text-white text-lg shadow-xl shadow-purple-500/20"
              style={{ backgroundColor: tokens.accent }}
            >
              Begin Session
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.8)' }}
              whileTap={{ scale: 0.98 }}
              className="px-10 py-4 rounded-full text-lg border border-white/50 backdrop-blur-sm"
              style={{ color: tokens.textHigh, backgroundColor: tokens.surface }}
            >
              Listen to Sample
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </ZenSection>
  )
}

function Stats() {
  const stats = [
    { label: 'Pets Calmed', value: '50k+' },
    { label: 'Anxiety Reduction', value: '85%' },
    { label: 'Veterinarian Approved', value: '100%' },
  ]

  return (
    <section className="py-20 relative z-10">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center p-12 rounded-[3rem] backdrop-blur-xl border border-white/40 shadow-2xl shadow-purple-900/5"
          style={{ backgroundColor: tokens.surface }}
        >
          {stats.map((s, i) => (
            <motion.div key={i} variants={fadeUp}>
              <div className="text-5xl font-bold mb-3 tracking-tighter" style={{ color: tokens.accent2 }}>{s.value}</div>
              <div className="text-lg font-medium" style={{ color: tokens.textLow }}>{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function Features() {
  const features = [
    { icon: <Wind />, title: 'Binaural Beats', desc: 'Frequencies specifically tuned to the hearing range of dogs and cats to induce deep relaxation.' },
    { icon: <Cloud />, title: 'Visual Therapy', desc: 'Slow, morphing color palettes designed to lower heart rates through ambient lighting.' },
    { icon: <Smile />, title: 'Guided Massage', desc: 'Audio instructions for pet parents to perform calming TTouch massage techniques.' },
  ]

  return (
    <ZenSection id="therapy">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-24"
        >
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold mb-6 tracking-tight" style={{ fontFamily: 'var(--font-quicksand)' }}>The Healing Frequency</motion.h2>
          <motion.p variants={fadeUp} className="text-xl max-w-2xl mx-auto font-light" style={{ color: tokens.textLow }}>Science-backed methods designed to soothe the nervous system.</motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-10"
        >
          {features.map((f, i) => (
            <motion.div key={i} variants={breathe} animate={floatAnimation as any} className="relative group">
              <div className="p-10 rounded-[2.5rem] border border-white/40 backdrop-blur-xl transition-all duration-700 hover:bg-white/60" style={{ backgroundColor: tokens.surface }}>
                <div className="p-5 rounded-2xl mb-8 inline-block" style={{ backgroundColor: 'white', color: tokens.accent }}>
                  {f.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 tracking-tight" style={{ color: tokens.textHigh }}>{f.title}</h3>
                <p className="leading-relaxed font-light" style={{ color: tokens.textLow }}>{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </ZenSection>
  )
}

function ProductDetail() {
  return (
    <ZenSection id="method">
      <AuraGlow className="w-[1000px] h-[1000px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20" color={tokens.accent2} />
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="w-full md:w-1/2"
          >
            <div className="aspect-square rounded-full p-12 flex items-center justify-center relative overflow-hidden backdrop-blur-3xl border border-white/30 shadow-2xl" style={{ backgroundColor: tokens.surface }}>
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-full"
                style={{ background: `radial-gradient(circle, ${tokens.accent} 0%, transparent 70%)` }}
              />
              <motion.div
                animate={{
                  scale: [1.2, 1, 1.2],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute inset-0 rounded-full"
                style={{ background: `radial-gradient(circle, ${tokens.accent2} 0%, transparent 70%)` }}
              />
              <div className="relative z-10 text-center">
                <Heart className="w-24 h-24 mx-auto mb-6 drop-shadow-lg" style={{ color: 'white' }} />
                <h3 className="text-3xl font-bold tracking-tight text-white drop-shadow-md">Zen Mode</h3>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="w-full md:w-1/2"
          >
            <motion.h2 variants={fadeUp} className="text-4xl md:text-6xl font-bold mb-8 tracking-tight" style={{ fontFamily: 'var(--font-quicksand)' }}>
              A sanctuary in your living room.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-xl mb-10 font-light leading-relaxed" style={{ color: tokens.textLow }}>
              Whether it's fireworks, thunderstorms, or separation anxiety, PetZen creates an immediate environment of calm through scientifically proven sensory inputs.
            </motion.p>

            <div className="space-y-8">
              {['Smart TV & Casting Support', 'Offline Downloads', 'Customizable Soundscapes'].map((item, i) => (
                <motion.div key={i} variants={fadeUp} className="flex items-center gap-6">
                  <div className="p-3 rounded-2xl shadow-sm bg-white" style={{ color: tokens.accent2 }}>
                    <Check className="h-6 w-6" />
                  </div>
                  <span className="text-xl font-medium tracking-tight" style={{ color: tokens.textHigh }}>{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </ZenSection>
  )
}

function Pricing() {
  return (
    <ZenSection id="pricing">
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight" style={{ fontFamily: 'var(--font-quicksand)' }}>Accessible Serenity</h2>
          <p className="text-xl font-light" style={{ color: tokens.textLow }}>Choose the path to peace.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
          <motion.div
            whileHover={{ y: -5 }}
            className="p-12 rounded-[3rem] border border-white/50 backdrop-blur-xl"
            style={{ backgroundColor: tokens.surface }}
          >
            <h3 className="text-2xl font-bold mb-2 tracking-tight">Monthly</h3>
            <div className="text-5xl font-bold mb-8" style={{ color: tokens.accent }}>$9.99</div>
            <ul className="space-y-5 mb-10 font-light">
              <li className="flex items-center gap-3"><Check className="h-5 w-5" style={{ color: tokens.accent2 }}/> Full Sound Library</li>
              <li className="flex items-center gap-3"><Check className="h-5 w-5" style={{ color: tokens.accent2 }}/> Visual Therapy Modes</li>
            </ul>
            <button className="w-full py-4 rounded-full font-bold text-lg bg-white shadow-sm transition-shadow hover:shadow-md" style={{ color: tokens.accent }}>
              Start Free Trial
            </button>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="p-12 rounded-[3rem] relative overflow-hidden shadow-2xl shadow-purple-500/20"
            style={{ backgroundColor: tokens.textHigh }}
          >
            <div className="absolute top-0 right-0 px-6 py-2 text-sm font-bold rounded-bl-2xl text-white" style={{ backgroundColor: tokens.accent2 }}>
              Best Value
            </div>
            <h3 className="text-2xl font-bold mb-2 tracking-tight text-white">Annual</h3>
            <div className="text-5xl font-bold mb-8 text-white">$79.99 <span className="text-xl font-light opacity-60">/yr</span></div>
            <ul className="space-y-5 mb-10 font-light text-white/80">
              <li className="flex items-center gap-3"><Check className="h-5 w-5" style={{ color: tokens.accent2 }}/> Everything in Monthly</li>
              <li className="flex items-center gap-3"><Check className="h-5 w-5" style={{ color: tokens.accent2 }}/> 2 Months Free</li>
              <li className="flex items-center gap-3"><Check className="h-5 w-5" style={{ color: tokens.accent2 }}/> Expert Consultations</li>
            </ul>
            <button className="w-full py-4 rounded-full font-bold text-lg text-white transition-opacity hover:opacity-90" style={{ backgroundColor: tokens.accent2 }}>
              Subscribe Yearly
            </button>
          </motion.div>
        </div>
      </div>
    </ZenSection>
  )
}

function Testimonials() {
  const reviews = [
    { text: "The fireworks used to terrify our rescue. Playing PetZen completely changed our 4th of July experience. He just slept.", author: "Michael B.", pet: "Owner of Luna" },
    { text: "I use the visual therapy mode on the TV when I leave for work. The difference in her separation anxiety is night and day.", author: "Jessica T.", pet: "Owner of Barnaby" },
  ]

  return (
    <ZenSection>
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-20 tracking-tight" style={{ fontFamily: 'var(--font-quicksand)' }}>Stories of Calm</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {reviews.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.3, duration: 1 }}
              className="p-12 rounded-[3rem] border border-white/40 backdrop-blur-xl"
              style={{ backgroundColor: tokens.surface }}
            >
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, j) => <Star key={j} className="w-5 h-5 fill-current" style={{ color: tokens.accent2 }} />)}
              </div>
              <p className="text-xl mb-8 font-light leading-relaxed" style={{ color: tokens.textLow }}>&quot;{r.text}&quot;</p>
              <div>
                <p className="font-bold text-lg">{r.author}</p>
                <p className="text-sm opacity-70">{r.pet}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </ZenSection>
  )
}

function FAQ() {
  const faqs = [
    { q: "How quickly does it work?", a: "Many pets show signs of relaxation within 5-10 minutes of beginning a session, as their heart rate synchronizes with the audio rhythms." },
    { q: "Can I leave it on while I'm at work?", a: "Yes! PetZen is designed to run indefinitely. We recommend the 'Continuous Flow' mode for long periods of absence." },
    { q: "Is it safe for all animals?", a: "Our frequencies are specifically tested for dogs and cats. While safe for other pets, the efficacy is optimized for canine and feline hearing ranges." },
  ]

  return (
    <ZenSection>
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 tracking-tight" style={{ fontFamily: 'var(--font-quicksand)' }}>Understanding PetZen</h2>
        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <FAQItem key={i} question={faq.q} answer={faq.a} />
          ))}
        </div>
      </div>
    </ZenSection>
  )
}

function FAQItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div
      className="border border-white/40 rounded-3xl overflow-hidden backdrop-blur-xl"
      style={{ backgroundColor: tokens.surface }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-8 py-6 flex items-center justify-between font-bold text-lg text-left tracking-tight"
      >
        {question}
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
          <ChevronDown className="w-6 h-6" style={{ color: tokens.accent }} />
        </motion.div>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        className="overflow-hidden px-8"
      >
        <p className="pb-6 font-light leading-relaxed" style={{ color: tokens.textLow }}>{answer}</p>
      </motion.div>
    </motion.div>
  )
}

function Newsletter() {
  return (
    <ZenSection className="border-t border-white/20">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-6 tracking-tight" style={{ fontFamily: 'var(--font-quicksand)' }}>A Breath of Fresh Air</h2>
        <p className="text-xl mb-10 font-light" style={{ color: tokens.textLow }}>Receive weekly tips on pet wellness and anxiety management.</p>
        <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto" onSubmit={e => e.preventDefault()}>
          <input
            type="email"
            placeholder="your@email.com"
            className="flex-1 px-8 py-4 rounded-full border border-white/50 focus:outline-none focus:border-purple-400 bg-white/50 backdrop-blur-sm"
          />
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-10 py-4 rounded-full text-white font-bold whitespace-nowrap shadow-lg shadow-purple-500/20"
            style={{ backgroundColor: tokens.accent }}
          >
            Subscribe
          </motion.button>
        </form>
      </div>
    </ZenSection>
  )
}

function Footer() {
  return (
    <footer className="py-16 text-center backdrop-blur-xl border-t border-white/20" style={{ backgroundColor: 'rgba(245, 243, 255, 0.5)' }}>
      <div className="flex justify-center items-center gap-2 font-bold text-2xl mb-6 tracking-tight" style={{ fontFamily: 'var(--font-quicksand)', color: tokens.textHigh }}>
        <Sparkles className="h-6 w-6" style={{ color: tokens.accent2 }} />
        {PRODUCT_NAME}
      </div>
      <p className="font-light" style={{ color: tokens.textLow }}>© 2026 {PRODUCT_NAME}. Breathe deep.</p>
    </footer>
  )
}
