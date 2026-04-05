"use client"

import React, { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Check, ChevronDown, Menu, Star, PenTool, Layout, Box, Users, Settings, Zap, Play } from 'lucide-react'
import { Inter, Space_Mono } from 'next/font/google'

// Using Inter with a wide range of weights as a proxy for figmaSans
const inter = Inter({ subsets: ['latin'], variable: '--font-sans', weight: ['300', '400', '500', '600', '700'] })
const spaceMono = Space_Mono({ subsets: ['latin'], variable: '--font-mono', weight: ['400', '700'] })

const tokens = {
  background: '#ffffff',
  backgroundAlt: '#f5f5f5',
  foreground: '#000000',
  mutedForeground: '#555555',
  accent: '#000000',
  accentForeground: '#ffffff',
  border: 'rgba(0, 0, 0, 0.1)',
}

const PRODUCT_NAME = 'Figma'

const STATS = [
  { label: 'Designers', value: '4M+' },
  { label: 'Components', value: '1B+' },
  { label: 'Plugins', value: '3,000+' },
]

const FEATURES = [
  { icon: PenTool, title: 'Vector Networks', description: 'A modern pen tool. Draw in any direction. No more merging or connecting to the path\'s original point.' },
  { icon: Layout, title: 'Auto Layout', description: 'Design stretches to fill its container. Buttons can resize with their text, and lists can rearrange themselves.' },
  { icon: Box, title: 'Components', description: 'Stop updating the same thing over and over. Change the main component, and watch the updates apply across all your files.' },
  { icon: Users, title: 'Multiplayer', description: 'Co-design in the same file at the same time. Never worry about overriding someone else\'s work.' },
  { icon: Settings, title: 'Dev Mode', description: 'A new workspace in Figma designed for developers. Get the code and specs you need to build faster.' },
  { icon: Zap, title: 'Variables', description: 'Create tokens for colors, sizing, and more. Switch between light and dark modes with a single click.' },
]

const PRICING_TIERS = [
  {
    name: 'Starter',
    price: 'Free',
    period: 'forever',
    description: 'For trying things out.',
    features: ['3 Figma and 3 FigJam files', 'Unlimited personal files', 'Unlimited collaborators', 'Plugins and templates'],
    cta: 'Get Started',
    highlighted: false,
  },
  {
    name: 'Professional',
    price: '$12',
    period: 'per editor/mo',
    description: 'For you and your team.',
    features: ['Unlimited Figma files', 'Unlimited version history', 'Shared and private projects', 'Team libraries', 'Advanced prototyping'],
    cta: 'Upgrade to Professional',
    highlighted: true,
  },
  {
    name: 'Organization',
    price: '$45',
    period: 'per editor/mo',
    description: 'For scaling design across your company.',
    features: ['Everything in Professional', 'Org-wide libraries', 'Design system analytics', 'Branching and merging', 'Centralized file management'],
    cta: 'Contact Sales',
    highlighted: false,
  },
]

const TESTIMONIALS = [
  { name: 'Diana Smith', role: 'Product Designer', company: 'TechCorp', text: 'It completely changed how our team works. The collaboration features mean we can review and iterate in real-time.', rating: 5 },
  { name: 'John Doe', role: 'Frontend Engineer', company: 'Startup.io', text: 'Dev Mode is incredible. It bridges the gap between design and development, saving me hours of manual inspection.', rating: 5 },
  { name: 'Alice Johnson', role: 'Design Lead', company: 'Enterprise Inc', text: 'The component system and auto-layout make maintaining a design system across hundreds of files actually manageable.', rating: 5 },
]

const FAQ_ITEMS = [
  { q: 'Is it free for students?', a: 'Yes! We offer a free Professional plan for students and educators.' },
  { q: 'Can I use it offline?', a: 'It is primarily a web-based tool. You need an internet connection to open files, but you can continue working on already open files if you lose connection.' },
  { q: 'How does Dev Mode work?', a: 'Dev Mode provides a dedicated interface for developers to inspect designs, extract CSS/code snippets, and export assets without accidentally modifying the design.' },
  { q: 'What are Variables?', a: 'Variables store reusable values like colors, numbers, and strings, allowing you to create dynamic themes (like light/dark mode) and more flexible components.' },
  { q: 'Can I import Sketch files?', a: 'Yes, you can easily import your existing Sketch files directly into the platform.' },
  { q: 'What is FigJam?', a: 'FigJam is an online whiteboard for teams to brainstorm, diagram, and collaborate before jumping into detailed design.' },
]

function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const shouldReduceMotion = useReducedMotion()
  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
      whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay, ease: [0.25, 1, 0.5, 1] }}
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
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] } }
}

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b" style={{ borderColor: tokens.border }}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight" style={{ color: tokens.foreground }}>
          {/* Simple figma-like logo shape */}
          <div className="flex flex-col gap-[2px]">
             <div className="flex gap-[2px]">
               <div className="w-3 h-3 bg-red-500 rounded-l-full rounded-tr-full"></div>
               <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
             </div>
             <div className="flex gap-[2px]">
               <div className="w-3 h-3 bg-purple-500 rounded-l-full rounded-br-full"></div>
               <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
             </div>
             <div className="w-3 h-3 bg-green-500 rounded-l-full rounded-b-full"></div>
          </div>
          {PRODUCT_NAME}
        </div>
        <div className="hidden md:flex gap-8 text-[15px] font-medium">
          {['Products', 'Enterprise', 'Pricing', 'Community', 'Company'].map(item => (
            <a key={item} href="#" className="hover:opacity-70 transition-opacity" style={{ color: tokens.foreground }}>
              {item}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <a href="#" className="hidden md:block text-[15px] font-medium hover:opacity-70" style={{ color: tokens.foreground }}>Log in</a>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-5 py-2 text-[15px] font-medium rounded-full"
            style={{ backgroundColor: tokens.foreground, color: tokens.background }}
          >
            Get started for free
          </motion.button>
        </div>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section className="pt-32 pb-24 overflow-hidden" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-7xl mx-auto px-6 text-center">
        <FadeUp>
          <h1 className="text-[72px] md:text-[96px] font-semibold tracking-[-0.04em] mb-6 leading-[0.95]" style={{ color: tokens.foreground }}>
            How you design,<br />align, and build
          </h1>
        </FadeUp>
        <FadeUp delay={0.1}>
          <p className="text-[24px] max-w-3xl mx-auto mb-12 font-normal leading-[1.3]" style={{ color: tokens.foreground, letterSpacing: '-0.01em' }}>
            Figma is the leading collaborative design tool for building meaningful products. Seamlessly connect design and development in one platform.
          </p>
        </FadeUp>
        <FadeUp delay={0.2}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 rounded-full font-medium flex items-center justify-center text-[18px]"
              style={{ backgroundColor: tokens.foreground, color: tokens.background }}
            >
              Get started for free
            </motion.button>
          </div>
        </FadeUp>
        <FadeUp delay={0.3} className="mt-20 relative">
          {/* Vibrant hero gradient representation */}
          <div className="w-full aspect-[16/9] rounded-[24px] overflow-hidden flex flex-col relative border" style={{ borderColor: tokens.border }}>
             <div className="absolute inset-0 bg-gradient-to-br from-green-400 via-yellow-300 via-pink-400 to-purple-500 opacity-90"></div>

             {/* Faux UI Chrome */}
             <div className="relative z-10 w-full h-12 bg-white/90 backdrop-blur flex items-center px-4 justify-between border-b" style={{ borderColor: tokens.border }}>
                <div className="flex gap-2">
                  <div className="w-6 h-6 rounded bg-black/10 flex items-center justify-center"><Menu className="w-3 h-3" /></div>
                  <div className="w-6 h-6 rounded bg-black/10 flex items-center justify-center"><ChevronDown className="w-3 h-3" /></div>
                </div>
                <div className="flex gap-2 bg-black/5 px-3 py-1 rounded-md text-xs font-medium">
                  Drafts / Hero Banner <ChevronDown className="w-3 h-3 ml-2" />
                </div>
                <div className="flex gap-2 items-center">
                  <div className="w-6 h-6 rounded-full bg-blue-500 border-2 border-white shadow-sm z-10" />
                  <div className="w-6 h-6 rounded-full bg-red-500 border-2 border-white shadow-sm -ml-3 z-20" />
                  <div className="px-3 py-1 bg-black text-white rounded text-xs font-medium ml-2">Share</div>
                  <div className="w-6 h-6 rounded bg-black/10 flex items-center justify-center ml-2"><Play className="w-3 h-3" /></div>
                </div>
             </div>

             {/* Interactive elements simulation */}
             <div className="relative z-10 flex-1 flex items-center justify-center">
                <div className="w-64 h-64 border-2 border-blue-500 rounded-[32px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-dashed flex items-center justify-center bg-white/20 backdrop-blur-sm">
                   {/* Selection handles */}
                   <div className="w-2 h-2 bg-white border border-blue-500 absolute -top-1 -left-1"></div>
                   <div className="w-2 h-2 bg-white border border-blue-500 absolute -top-1 -right-1"></div>
                   <div className="w-2 h-2 bg-white border border-blue-500 absolute -bottom-1 -left-1"></div>
                   <div className="w-2 h-2 bg-white border border-blue-500 absolute -bottom-1 -right-1"></div>
                   <span className="text-2xl font-bold tracking-tight">Design System</span>
                </div>

                {/* Multiplayer cursors */}
                <div className="absolute top-1/3 left-1/3 flex flex-col">
                  <div className="w-4 h-5 border-l-2 border-t-2 border-blue-500 transform -skew-x-12"></div>
                  <div className="bg-blue-500 text-white text-[10px] px-2 py-0.5 rounded-sm rounded-tl-none font-medium w-max">User 1</div>
                </div>
                <div className="absolute bottom-1/3 right-1/4 flex flex-col">
                  <div className="w-4 h-5 border-l-2 border-t-2 border-red-500 transform -skew-x-12"></div>
                  <div className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-sm rounded-tl-none font-medium w-max">User 2</div>
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
    <section className="py-24 border-y" style={{ borderColor: tokens.border, backgroundColor: tokens.backgroundAlt }}>
      <div className="max-w-7xl mx-auto px-6">
        <StaggerContainer>
          <div className="flex flex-wrap justify-between gap-8 text-center md:text-left">
            {STATS.map(stat => (
              <motion.div key={stat.label} variants={staggerItem} className="flex-1">
                <p className="text-[56px] font-semibold mb-2 tracking-tight leading-none" style={{ color: tokens.foreground }}>{stat.value}</p>
                <p className="text-[18px] font-medium" style={{ color: tokens.foreground }}>{stat.label}</p>
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
      <div className="max-w-7xl mx-auto px-6">
        <FadeUp>
          <div className="mb-20">
            <h2 className="text-[56px] font-semibold mb-6 tracking-tight leading-none" style={{ color: tokens.foreground }}>Explore what's possible.</h2>
          </div>
        </FadeUp>
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {FEATURES.map(f => (
              <motion.div key={f.title} variants={staggerItem}>
                <div className="w-12 h-12 rounded-[16px] mb-6 flex items-center justify-center bg-black/5">
                  <f.icon className="h-6 w-6" style={{ color: tokens.foreground }} />
                </div>
                <h3 className="text-[24px] font-medium mb-3 tracking-tight" style={{ color: tokens.foreground }}>{f.title}</h3>
                <p className="text-[16px] leading-[1.5]" style={{ color: tokens.mutedForeground }}>{f.description}</p>
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
    <section className="py-32 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <FadeUp>
            <div className="inline-block px-3 py-1 bg-white/20 rounded-md font-mono text-[11px] font-bold uppercase tracking-widest mb-6">Dev Mode</div>
            <h2 className="text-[56px] font-semibold mb-6 tracking-tight leading-none">A new space for developers.</h2>
            <p className="text-[20px] mb-8 leading-[1.4] text-white/80 font-normal">
              Bring design and development closer together. Dev Mode is a new workspace in Figma that gives developers everything they need to navigate designs and translate them into code.
            </p>
            <ul className="space-y-4 mb-8">
              {['Inspect designs with code snippets', 'Export assets instantly', 'Track what is ready for dev'].map(item => (
                <li key={item} className="flex items-center gap-3 text-[18px]">
                  <Check className="h-5 w-5 text-green-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </FadeUp>
          <FadeUp delay={0.2}>
             <div className="rounded-[16px] border border-white/20 bg-[#1e1e1e] overflow-hidden flex flex-col h-[400px]">
                <div className="flex border-b border-white/10 h-10">
                   <div className="px-4 flex items-center border-r border-white/10 font-mono text-xs text-white/60">Inspect</div>
                   <div className="px-4 flex items-center border-r border-white/10 font-mono text-xs text-white/60 bg-white/5">Code</div>
                </div>
                <div className="flex-1 p-6 font-mono text-sm overflow-y-auto leading-loose">
                  <div className="text-white/40 mb-2">/* Button component CSS */</div>
                  <div><span className="text-blue-400">.button</span> {'{'}</div>
                  <div className="pl-4">
                     <span className="text-blue-300">display</span>: flex;<br/>
                     <span className="text-blue-300">flex-direction</span>: row;<br/>
                     <span className="text-blue-300">justify-content</span>: center;<br/>
                     <span className="text-blue-300">align-items</span>: center;<br/>
                     <span className="text-blue-300">padding</span>: 12px 24px;<br/>
                     <span className="text-blue-300">gap</span>: 8px;<br/>
                     <br/>
                     <span className="text-blue-300">width</span>: 140px;<br/>
                     <span className="text-blue-300">height</span>: 48px;<br/>
                     <br/>
                     <span className="text-blue-300">background</span>: var(--brand-color);<br/>
                     <span className="text-blue-300">border-radius</span>: 50px;<br/>
                  </div>
                  <div>{'}'}</div>
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
      <div className="max-w-7xl mx-auto px-6">
        <FadeUp>
          <div className="mb-20 text-center">
            <h2 className="text-[56px] font-semibold tracking-tight" style={{ color: tokens.foreground }}>Find the plan for you.</h2>
          </div>
        </FadeUp>
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRICING_TIERS.map(tier => (
              <motion.div
                key={tier.name}
                variants={staggerItem}
                className="p-8 rounded-[24px] border flex flex-col"
                style={{
                  borderColor: tokens.border,
                  backgroundColor: tokens.background
                }}
              >
                <h3 className="text-[24px] font-semibold mb-2">{tier.name}</h3>
                <p className="text-[15px] mb-6 h-10" style={{ color: tokens.mutedForeground }}>{tier.description}</p>
                <div className="mb-8 flex items-baseline gap-1">
                  <span className="text-[48px] font-bold tracking-tight leading-none">{tier.price}</span>
                  <span className="text-[14px]" style={{ color: tokens.mutedForeground }}>{tier.period}</span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 rounded-full font-medium text-[15px] mb-8"
                  style={tier.highlighted
                    ? { backgroundColor: tokens.foreground, color: tokens.background }
                    : { backgroundColor: tokens.backgroundAlt, color: tokens.foreground, border: `1px solid ${tokens.border}` }
                  }
                >
                  {tier.cta}
                </motion.button>

                <ul className="space-y-4 flex-1">
                  {tier.features.map(f => (
                    <li key={f} className="flex gap-3 text-[15px]">
                      <Check className="h-5 w-5 shrink-0" style={{ color: tokens.foreground }} />
                      <span style={{ color: tokens.foreground }}>{f}</span>
                    </li>
                  ))}
                </ul>
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
    <section id="testimonials" className="py-32 border-t" style={{ borderColor: tokens.border, backgroundColor: tokens.backgroundAlt }}>
      <div className="max-w-7xl mx-auto px-6">
        <FadeUp>
          <div className="mb-20 text-center">
             <h2 className="text-[56px] font-semibold tracking-tight" style={{ color: tokens.foreground }}>What people are saying.</h2>
          </div>
        </FadeUp>
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map(t => (
              <motion.div
                key={t.name}
                variants={staggerItem}
                className="p-8 rounded-[24px] bg-white border"
                style={{ borderColor: tokens.border }}
              >
                <div className="flex mb-6 gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-black text-black" />
                  ))}
                </div>
                <p className="text-[18px] leading-[1.4] mb-8 font-normal" style={{ color: tokens.foreground }}>"{t.text}"</p>
                <div>
                  <p className="font-semibold text-[15px]" style={{ color: tokens.foreground }}>{t.name}</p>
                  <p className="text-[15px]" style={{ color: tokens.mutedForeground }}>{t.role}, {t.company}</p>
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
    <section id="faq" className="py-32 border-t" style={{ borderColor: tokens.border, backgroundColor: tokens.background }}>
      <div className="max-w-4xl mx-auto px-6">
        <FadeUp>
          <div className="text-center mb-20">
            <h2 className="text-[56px] font-semibold tracking-tight" style={{ color: tokens.foreground }}>Frequently asked questions.</h2>
          </div>
        </FadeUp>
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, i) => (
            <div key={i} className="border-b" style={{ borderColor: tokens.border }}>
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between py-6 text-left"
              >
                <span className="font-medium text-[20px]" style={{ color: tokens.foreground }}>{item.q}</span>
                <motion.span animate={{ rotate: openIndex === i ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown className="h-6 w-6" style={{ color: tokens.foreground }} />
                </motion.span>
              </button>
              <motion.div
                initial={false}
                animate={{ height: openIndex === i ? 'auto' : 0, opacity: openIndex === i ? 1 : 0 }}
                transition={{ duration: 0.2 }}
                style={{ overflow: 'hidden' }}
              >
                <p className="pb-8 text-[18px] leading-[1.5]" style={{ color: tokens.mutedForeground }}>
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
    <section className="py-32 border-t" style={{ borderColor: tokens.border, backgroundColor: tokens.backgroundAlt }}>
      <div className="max-w-xl mx-auto px-6 text-center">
        <FadeUp>
          <h2 className="text-[40px] font-semibold mb-4 tracking-tight" style={{ color: tokens.foreground }}>Stay in the loop.</h2>
          <p className="text-[18px] mb-8" style={{ color: tokens.mutedForeground }}>
            Get design tips, news, and resources delivered to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Email address"
              className="flex-1 px-6 py-4 rounded-full border bg-white focus:outline-none focus:ring-2 focus:ring-black/10 text-[16px]"
              style={{ borderColor: tokens.border, color: tokens.foreground }}
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 rounded-full font-medium text-[16px]"
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
    UseCases: ['UI Design', 'UX Design', 'Prototyping', 'Graphic Design'],
    Explore: ['Design Features', 'Prototyping Features', 'Design Systems', 'Downloads'],
    Resources: ['Blog', 'Best Practices', 'Support', 'Developers'],
    Company: ['About', 'Careers', 'Contact', 'Privacy'],
  }

  return (
    <footer className="py-20 border-t" style={{ borderColor: tokens.border, backgroundColor: tokens.background }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-20">
          <div className="col-span-2 md:col-span-1">
             <div className="flex items-center gap-2 font-bold text-xl tracking-tight mb-4" style={{ color: tokens.foreground }}>
              <div className="flex flex-col gap-[2px]">
                 <div className="flex gap-[2px]">
                   <div className="w-3 h-3 bg-red-500 rounded-l-full rounded-tr-full"></div>
                   <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                 </div>
                 <div className="flex gap-[2px]">
                   <div className="w-3 h-3 bg-purple-500 rounded-l-full rounded-br-full"></div>
                   <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                 </div>
                 <div className="w-3 h-3 bg-green-500 rounded-l-full rounded-b-full"></div>
              </div>
              {PRODUCT_NAME}
            </div>
          </div>
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <p className="font-semibold text-[16px] mb-6" style={{ color: tokens.foreground }}>{group.replace(/([A-Z])/g, ' $1').trim()}</p>
              <ul className="space-y-4">
                {items.map(item => (
                  <li key={item}>
                    <a href="#" className="text-[16px] hover:underline" style={{ color: tokens.mutedForeground }}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[14px]" style={{ color: tokens.mutedForeground }}>
          <p>© 2026 {PRODUCT_NAME} Inc.</p>
          <a href="/" className="hover:text-black">All styles</a>
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
