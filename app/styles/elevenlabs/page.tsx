"use client"

import React, { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Check, ChevronDown, Menu, Star, Play, Mic, Globe, Settings, Waves, Headphones } from 'lucide-react'
import { Inter, Space_Mono } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })
const spaceMono = Space_Mono({ subsets: ['latin'], weight: '400', variable: '--font-mono' })

const tokens = {
  background: '#ffffff',
  backgroundAlt: '#f5f5f5',
  foreground: '#000000',
  mutedForeground: '#777169',
  accent: '#f5f2ef',
  accentForeground: '#000000',
  border: 'rgba(0, 0, 0, 0.05)',
  shadow: 'rgba(0,0,0,0.06) 0px 0px 0px 1px, rgba(0,0,0,0.04) 0px 4px 4px',
}

const PRODUCT_NAME = 'ElevenLabs'

const STATS = [
  { label: 'Voices', value: '1,000+' },
  { label: 'Languages', value: '29' },
  { label: 'Audio Generated', value: '100 yrs' },
]

const FEATURES = [
  { icon: Mic, title: 'Voice Cloning', description: 'Clone your voice from just a minute of audio with unprecedented accuracy.' },
  { icon: Globe, title: 'Multilingual', description: 'Generate speech in 29 languages while maintaining the original speaker\'s voice.' },
  { icon: Settings, title: 'Fine-grained Control', description: 'Adjust pacing, emotion, and emphasis to get exactly the performance you need.' },
  { icon: Waves, title: 'Sound Effects', description: 'Generate high-quality sound effects from text descriptions.' },
  { icon: Play, title: 'Real-time API', description: 'Stream audio with latency under 400ms for conversational AI applications.' },
  { icon: Headphones, title: 'Audiobook Creation', description: 'Purpose-built tools for long-form content generation.' },
]

const PRICING_TIERS = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for exploring voice AI.',
    features: ['10,000 characters/mo', '3 custom voices', 'API access', 'Attribution required'],
    cta: 'Get Started',
    highlighted: false,
  },
  {
    name: 'Creator',
    price: '$22',
    period: 'per month',
    description: 'For content creators and independent developers.',
    features: ['100,000 characters/mo', '30 custom voices', 'Professional Voice Cloning', 'Commercial rights'],
    cta: 'Subscribe',
    highlighted: true,
  },
  {
    name: 'Pro',
    price: '$99',
    period: 'per month',
    description: 'For growing businesses and professional studios.',
    features: ['500,000 characters/mo', '160 custom voices', 'Highest quality audio', 'Usage analytics'],
    cta: 'Subscribe',
    highlighted: false,
  },
]

const TESTIMONIALS = [
  { name: 'James Clear', role: 'Author', company: 'Atomic Habits', text: 'The quality is indistinguishable from a human narrator. It\'s completely changed how we produce audio content.', rating: 5 },
  { name: 'Sarah Drasner', role: 'VP Engineering', company: 'TechCorp', text: 'The API is incredibly well-designed, and the low latency makes it perfect for our interactive AI agents.', rating: 5 },
  { name: 'Markus Persson', role: 'Game Developer', company: 'Indie Studios', text: 'We used it to voice thousands of NPCs in our latest game. The emotional range is astounding.', rating: 5 },
]

const FAQ_ITEMS = [
  { q: 'Is the generated audio royalty-free?', a: 'Yes, on all paid plans, you have full commercial rights to the audio you generate.' },
  { q: 'How much audio do I need to clone a voice?', a: 'You can create a high-quality clone with just 1-3 minutes of clean, noise-free audio.' },
  { q: 'What languages do you support?', a: 'We currently support 29 languages, including English, Spanish, French, German, Mandarin, and Hindi.' },
  { q: 'Do you offer custom enterprise pricing?', a: 'Yes, we offer custom character limits, SLAs, and dedicated support for enterprise customers.' },
  { q: 'Can I use it for real-time applications?', a: 'Yes, our WebSocket API supports streaming audio generation with sub-400ms latency.' },
  { q: 'Is it safe to use?', a: 'We have strict safety measures in place, including voice verification for cloning and proactive monitoring for misuse.' },
]

function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const shouldReduceMotion = useReducedMotion()
  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
      whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function StaggerContainer({ children, className = '', style = {} }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const shouldReduceMotion = useReducedMotion()
  return (
    <motion.div
      initial={shouldReduceMotion ? "visible" : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={{
        visible: { transition: { staggerChildren: 0.1 } },
        hidden: {}
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  )
}

const staggerItem: import('framer-motion').Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
}

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-lg tracking-tight" style={{ color: tokens.foreground }}>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
             <path d="M4 12V20M8 8V20M12 4V20M16 10V20M20 14V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {PRODUCT_NAME}
        </div>
        <div className="hidden md:flex gap-8 text-[13px] font-medium tracking-[0.01em]">
          {['Products', 'Research', 'Pricing', 'Company'].map(item => (
            <a key={item} href="#" className="hover:opacity-70 transition-opacity" style={{ color: tokens.foreground }}>
              {item}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <a href="#" className="hidden md:block text-[13px] font-medium hover:opacity-70" style={{ color: tokens.foreground }}>Log in</a>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-4 py-2 text-[13px] font-semibold rounded-full shadow-sm"
            style={{ backgroundColor: tokens.foreground, color: tokens.background }}
          >
            Sign up
          </motion.button>
        </div>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section className="pt-40 pb-20 overflow-hidden relative" style={{ backgroundColor: tokens.background }}>
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
        <FadeUp>
          <h1 className="text-6xl md:text-8xl font-light mb-8 leading-[1.05] tracking-tight" style={{ color: tokens.foreground }}>
            Generative Voice AI
          </h1>
        </FadeUp>
        <FadeUp delay={0.1}>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-12 tracking-[0.01em] leading-relaxed" style={{ color: tokens.mutedForeground }}>
            Create the most realistic speech in any language, using the most powerful AI voice generator.
          </p>
        </FadeUp>
        <FadeUp delay={0.2}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-3.5 rounded-full font-medium flex items-center justify-center gap-2 text-[15px]"
              style={{ backgroundColor: tokens.foreground, color: tokens.background }}
            >
              Get Started Free
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-3.5 rounded-full font-medium text-[15px] flex items-center gap-2"
              style={{ backgroundColor: tokens.accent, color: tokens.foreground, boxShadow: 'rgba(78,50,23,0.04) 0px 6px 16px' }}
            >
              <Play className="w-4 h-4" /> Listen to samples
            </motion.button>
          </div>
        </FadeUp>
        <FadeUp delay={0.3} className="mt-24">
          <div className="w-full max-w-3xl mx-auto aspect-[21/9] rounded-[32px] overflow-hidden flex items-center justify-center bg-white" style={{ boxShadow: tokens.shadow }}>
             <div className="w-full p-8 flex flex-col gap-6">
                <div className="flex items-center justify-between">
                   <div className="flex gap-2 items-center">
                     <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                       <Play className="w-4 h-4 ml-0.5" />
                     </div>
                     <span className="text-sm font-medium">Rachel (American)</span>
                   </div>
                   <div className="flex gap-1 items-end h-8 opacity-20">
                     {Array.from({length: 30}).map((_, i) => (
                       <div key={i} className="w-1 bg-black rounded-full" style={{ height: `${Math.random() * 100}%` }} />
                     ))}
                   </div>
                </div>
                <textarea
                  readOnly
                  value="It was a bright cold day in April, and the clocks were striking thirteen."
                  className="w-full h-24 resize-none outline-none text-xl md:text-2xl font-light text-center leading-relaxed"
                  style={{ color: tokens.foreground }}
                />
             </div>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

function Stats() {
  return (
    <section className="py-20 border-y" style={{ borderColor: tokens.border, backgroundColor: tokens.backgroundAlt }}>
      <div className="max-w-6xl mx-auto px-6">
        <StaggerContainer>
          <div className="flex flex-wrap justify-between gap-8 text-center md:text-left">
            {STATS.map(stat => (
              <motion.div key={stat.label} variants={staggerItem} className="flex-1 min-w-[150px]">
                <p className="text-4xl font-light mb-2 tracking-tight" style={{ color: tokens.foreground }}>{stat.value}</p>
                <p className="text-sm tracking-wide uppercase font-semibold" style={{ color: tokens.mutedForeground }}>{stat.label}</p>
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
    <section id="features" className="py-32" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-6xl mx-auto px-6">
        <FadeUp>
          <div className="mb-20">
            <h2 className="text-4xl md:text-5xl font-light mb-6 tracking-tight" style={{ color: tokens.foreground }}>Unmatched Quality.</h2>
          </div>
        </FadeUp>
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {FEATURES.map(f => (
              <motion.div
                key={f.title}
                variants={staggerItem}
              >
                <div className="w-12 h-12 rounded-full mb-6 flex items-center justify-center" style={{ backgroundColor: tokens.backgroundAlt }}>
                  <f.icon className="h-5 w-5" style={{ color: tokens.foreground }} />
                </div>
                <h3 className="text-lg font-medium mb-3" style={{ color: tokens.foreground }}>{f.title}</h3>
                <p className="text-[15px] leading-relaxed tracking-[0.01em]" style={{ color: tokens.mutedForeground }}>{f.description}</p>
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
    <section className="py-32 bg-white border-t" style={{ borderColor: tokens.border }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <FadeUp>
            <h2 className="text-4xl md:text-5xl font-light mb-8 tracking-tight leading-tight" style={{ color: tokens.foreground }}>Designed for Developers</h2>
            <p className="text-lg mb-8 leading-relaxed tracking-[0.01em]" style={{ color: tokens.mutedForeground }}>
              Integrate the most advanced voice AI into your applications with just a few lines of code. Our WebSocket API delivers audio with sub-400ms latency, perfect for real-time conversational agents.
            </p>
            <ul className="space-y-4 mb-8">
              {['REST & WebSocket APIs', 'Python & Node.js SDKs', 'Comprehensive Documentation'].map(item => (
                <li key={item} className="flex items-center gap-3 text-[15px] font-medium">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center bg-gray-100">
                    <Check className="h-3 w-3" />
                  </div>
                  <span style={{ color: tokens.foreground }}>{item}</span>
                </li>
              ))}
            </ul>
          </FadeUp>
          <FadeUp delay={0.2}>
             <div className="rounded-[24px] overflow-hidden bg-[#fafafa]" style={{ boxShadow: tokens.shadow }}>
               <div className="h-12 border-b flex items-center px-6 gap-2" style={{ borderColor: tokens.border }}>
                 <div className="w-3 h-3 rounded-full bg-red-400" />
                 <div className="w-3 h-3 rounded-full bg-amber-400" />
                 <div className="w-3 h-3 rounded-full bg-green-400" />
               </div>
               <div className="p-8 font-mono text-[13px] leading-relaxed overflow-x-auto">
                 <span style={{ color: '#000' }}>import</span> {'{'} ElevenLabsClient {'}'} <span style={{ color: '#000' }}>from</span> <span style={{ color: '#666' }}>"elevenlabs"</span>;<br/><br/>
                 <span style={{ color: '#000' }}>const</span> client = <span style={{ color: '#000' }}>new</span> ElevenLabsClient();<br/><br/>
                 <span style={{ color: '#000' }}>const</span> audio = <span style={{ color: '#000' }}>await</span> client.generate({'{'}<br/>
                 &nbsp;&nbsp;voice: <span style={{ color: '#666' }}>"Rachel"</span>,<br/>
                 &nbsp;&nbsp;text: <span style={{ color: '#666' }}>"Hello, world!"</span><br/>
                 {'}'});
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
    <section id="pricing" className="py-32 border-t" style={{ borderColor: tokens.border, backgroundColor: tokens.backgroundAlt }}>
      <div className="max-w-6xl mx-auto px-6">
        <FadeUp>
          <div className="text-center mb-20">
            <h2 className="text-4xl font-light mb-4 tracking-tight" style={{ color: tokens.foreground }}>Pricing that scales</h2>
          </div>
        </FadeUp>
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PRICING_TIERS.map(tier => (
              <motion.div
                key={tier.name}
                variants={staggerItem}
                className="p-8 rounded-[32px] bg-white flex flex-col"
                style={{
                  boxShadow: tokens.shadow,
                  transform: tier.highlighted ? 'scale(1.02)' : 'none'
                }}
              >
                <h3 className="text-lg font-medium mb-4">{tier.name}</h3>
                <div className="mb-4 flex items-baseline gap-1">
                  <span className="text-4xl font-light tracking-tight">{tier.price}</span>
                  <span className="text-[13px] text-gray-500">/ {tier.period}</span>
                </div>
                <p className="text-[15px] text-gray-500 mb-8 leading-relaxed h-12">{tier.description}</p>
                <ul className="space-y-4 mb-10 flex-1">
                  {tier.features.map(f => (
                    <li key={f} className="flex items-center gap-3 text-[14px]">
                      <Check className="h-4 w-4 text-black shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3.5 rounded-full font-medium text-[15px]"
                  style={tier.highlighted
                    ? { backgroundColor: tokens.foreground, color: tokens.background }
                    : { backgroundColor: tokens.backgroundAlt, color: tokens.foreground }
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
    <section id="testimonials" className="py-32 bg-white border-t" style={{ borderColor: tokens.border }}>
      <div className="max-w-6xl mx-auto px-6">
        <FadeUp>
          <div className="mb-20">
             <h2 className="text-4xl font-light tracking-tight" style={{ color: tokens.foreground }}>Loved by creators.</h2>
          </div>
        </FadeUp>
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {TESTIMONIALS.map(t => (
              <motion.div key={t.name} variants={staggerItem}>
                <div className="flex mb-6">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-black text-black" />
                  ))}
                </div>
                <p className="text-[15px] leading-relaxed mb-6" style={{ color: tokens.mutedForeground }}>"{t.text}"</p>
                <div>
                  <p className="font-medium text-[15px]" style={{ color: tokens.foreground }}>{t.name}</p>
                  <p className="text-[13px]" style={{ color: tokens.mutedForeground }}>{t.role}, {t.company}</p>
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
    <section id="faq" className="py-32 border-t" style={{ borderColor: tokens.border, backgroundColor: tokens.backgroundAlt }}>
      <div className="max-w-3xl mx-auto px-6">
        <FadeUp>
          <div className="mb-16">
            <h2 className="text-4xl font-light tracking-tight" style={{ color: tokens.foreground }}>Questions?</h2>
          </div>
        </FadeUp>
        <div className="space-y-2">
          {FAQ_ITEMS.map((item, i) => (
            <div key={i} className="bg-white rounded-2xl" style={{ boxShadow: tokens.shadow }}>
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="font-medium text-[15px]" style={{ color: tokens.foreground }}>{item.q}</span>
                <motion.span animate={{ rotate: openIndex === i ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown className="h-4 w-4" style={{ color: tokens.mutedForeground }} />
                </motion.span>
              </button>
              <motion.div
                initial={false}
                animate={{ height: openIndex === i ? 'auto' : 0, opacity: openIndex === i ? 1 : 0 }}
                transition={{ duration: 0.2 }}
                style={{ overflow: 'hidden' }}
              >
                <p className="px-6 pb-6 text-[15px] leading-relaxed" style={{ color: tokens.mutedForeground }}>
                  {item.a}
                </p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Newsletter() {
  return (
    <section className="py-32 bg-white border-t" style={{ borderColor: tokens.border }}>
      <div className="max-w-xl mx-auto px-6 text-center">
        <FadeUp>
          <h2 className="text-3xl font-light mb-4 tracking-tight" style={{ color: tokens.foreground }}>Stay informed.</h2>
          <p className="text-[15px] mb-8" style={{ color: tokens.mutedForeground }}>
            Get the latest updates on new voices, features, and research.
          </p>
          <form className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="name@email.com"
              className="flex-1 px-6 py-3.5 rounded-full border bg-white focus:outline-none focus:ring-2 focus:ring-gray-200 text-[15px]"
              style={{ borderColor: tokens.border, color: tokens.foreground, boxShadow: 'rgba(0,0,0,0.02) 0px 2px 4px inset' }}
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-3.5 rounded-full font-medium text-[15px]"
              style={{ backgroundColor: tokens.foreground, color: tokens.background }}
            >
              Subscribe
            </motion.button>
          </form>
        </FadeUp>
      </div>
    </section>
  )
}

function Footer() {
  const links = {
    Products: ['Speech Synthesis', 'Voice Cloning', 'Voice Library', 'Dubbing'],
    Resources: ['Documentation', 'API Reference', 'Help Center', 'Blog'],
    Company: ['About', 'Careers', 'Ethics', 'Contact'],
    Legal: ['Privacy', 'Terms', 'Security'],
  }

  return (
    <footer className="py-20 border-t" style={{ borderColor: tokens.border, backgroundColor: tokens.backgroundAlt }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-20">
          <div className="col-span-2 md:col-span-1">
             <div className="flex items-center gap-2 font-bold text-lg tracking-tight mb-4" style={{ color: tokens.foreground }}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
                 <path d="M4 12V20M8 8V20M12 4V20M16 10V20M20 14V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {PRODUCT_NAME}
            </div>
          </div>
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <p className="font-semibold text-[13px] mb-6 uppercase tracking-wider" style={{ color: tokens.foreground }}>{group}</p>
              <ul className="space-y-4">
                {items.map(item => (
                  <li key={item}>
                    <a href="#" className="text-[14px] hover:opacity-70 transition-opacity" style={{ color: tokens.mutedForeground }}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-[13px]" style={{ color: tokens.mutedForeground }}>
          <p>© 2026 {PRODUCT_NAME}.</p>
          <a href="/" className="hover:opacity-70 transition-opacity">All styles</a>
        </div>
      </div>
    </footer>
  )
}

export default function StylePage() {
  return (
    <div className={`${inter.variable} ${spaceMono.variable} font-sans`} style={{ backgroundColor: tokens.background }}>
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
