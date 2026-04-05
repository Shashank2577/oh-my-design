'use client'

import { motion, useReducedMotion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Outfit } from 'next/font/google'
import {
  Check, ArrowRight, ChevronDown, Circle, Square, Triangle, Quote,
  Layout, MousePointer, PaintBucket, Type, Layers, Box
} from 'lucide-react'

// ─────────────────────────────────────────────
// FONTS
// ─────────────────────────────────────────────
const bodyFont = Outfit({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  variable: '--font-body',
  display: 'swap',
})

// ─────────────────────────────────────────────
// DESIGN TOKENS
// ─────────────────────────────────────────────
const tokens = {
  background: '#F0F0F0',
  foreground: '#121212',
  primaryRed: '#D02020',
  primaryBlue: '#1040C0',
  primaryYellow: '#F0C020',
  border: '#121212',
  muted: '#E0E0E0',
  white: '#FFFFFF',
}

// ─────────────────────────────────────────────
// MOTION HELPERS
// ─────────────────────────────────────────────
function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-5% 0px' })
  const shouldReduce = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={shouldReduce ? false : { opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.3, delay, ease: 'easeOut' as const }}
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
      className={className}
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

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' as const } },
}

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────
const PRODUCT_NAME = 'KONSTRUKT'
const TAGLINE = 'FORM FOLLOWS FUNCTION'
const DESCRIPTION = 'A geometric approach to digital creation. Build interfaces with mathematical precision and uncompromising clarity. Reject the superfluous.'

const NAV_LINKS = ['Features', 'Pricing', 'Testimonials', 'FAQ']

const STATS = [
  { value: '99', label: 'COMPONENTS', shape: 'square' },
  { value: '14', label: 'TEMPLATES', shape: 'circle' },
  { value: '3', label: 'PRIMARIES', shape: 'triangle' },
  { value: '1', label: 'SYSTEM', shape: 'rotated-square' },
]

const FEATURES = [
  { icon: Layout, title: 'MODULAR GRID', description: 'Absolute control over spatial organization. The grid is law.' },
  { icon: MousePointer, title: 'PRECISE INPUT', description: 'Interactions engineered for maximum efficiency and clarity.' },
  { icon: PaintBucket, title: 'PURE COLOR', description: 'Unadulterated primary colors. No gradients, no compromise.' },
  { icon: Type, title: 'OBJECTIVE TYPE', description: 'Typography as structure. Legible, objective, undeniable.' },
  { icon: Layers, title: 'HARD SHADOWS', description: 'Depth achieved through solid color stacking, not blur.' },
  { icon: Box, title: 'GEOMETRIC FORMS', description: 'Everything is built from circles, squares, and triangles.' },
]

const PRICING = [
  {
    name: 'BASIC',
    price: '$0',
    period: 'MONTH',
    description: 'Essential tools for functional design.',
    features: ['3 Projects', 'Core components', 'Community support'],
    cta: 'START FREE',
    highlighted: false,
    color: tokens.primaryBlue,
  },
  {
    name: 'PRO',
    price: '$29',
    period: 'MONTH',
    description: 'Advanced systems for professionals.',
    features: ['Unlimited projects', 'Full component library', 'Priority support', 'Export to code'],
    cta: 'GO PRO',
    highlighted: true,
    color: tokens.primaryRed,
  },
  {
    name: 'TEAM',
    price: '$99',
    period: 'MONTH',
    description: 'Scale your design operations.',
    features: ['Everything in Pro', 'Unlimited users', 'Shared libraries', 'Custom domains'],
    cta: 'CONTACT SALES',
    highlighted: false,
    color: tokens.primaryYellow,
  },
]

const TESTIMONIALS = [
  {
    name: 'WALTER GROPIUS',
    role: 'DIRECTOR',
    company: 'BAUHAUS',
    text: 'A profound return to functionalism. This system strips away the unnecessary, leaving only what is true and useful.',
  },
  {
    name: 'ANNI ALBERS',
    role: 'WEAVER',
    company: 'TEXTILES',
    text: 'The geometric constraints foster true creativity. It provides the rigid framework necessary for expressive composition.',
  },
  {
    name: 'LASZLO MOHOLY-NAGY',
    role: 'MASTER',
    company: 'METAL WORKSHOP',
    text: 'Light, space, and motion reduced to their fundamental elements. The interface becomes an extension of thought.',
  },
]

const FAQ_ITEMS = [
  { q: 'WHAT IS THE CORE PHILOSOPHY?', a: 'Form follows function. Every element must have a purpose. Decoration without utility is rejected.' },
  { q: 'CAN I USE GRADIENTS?', a: 'No. The system uses only solid primary colors, black, white, and gray. Pure color provides maximum clarity.' },
  { q: 'WHY NO ROUNDED CORNERS?', a: 'We embrace the binary extremes: sharp 90-degree angles for structural elements, and perfect circles for focal points. Nothing in between.' },
  { q: 'HOW DO I CREATE DEPTH?', a: 'Through hard offset shadows (4px or 8px) and overlapping geometric layers. Never use blurred drop shadows.' },
  { q: 'IS THE TYPOGRAPHY FLEXIBLE?', a: 'We use Outfit, a geometric sans-serif. Use extreme contrasts in scale and weight to establish clear hierarchy.' },
  { q: 'HOW DO I START?', a: 'Click the primary action button. The system is designed to be self-evident. No manual is required.' },
]

// ─────────────────────────────────────────────
// COMPONENTS
// ─────────────────────────────────────────────

function Button({ children, variant = 'primary', className = '' }: { children: React.ReactNode, variant?: 'primary' | 'secondary' | 'yellow' | 'outline' | 'ghost', className?: string }) {
  const baseClasses = "uppercase font-bold tracking-widest px-8 h-14 border-2 md:border-4 border-black transition-all duration-200 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex items-center justify-center gap-2"

  const variants = {
    primary: "bg-[#D02020] text-white shadow-[4px_4px_0px_0px_black] hover:bg-[#D02020]/90",
    secondary: "bg-[#1040C0] text-white shadow-[4px_4px_0px_0px_black] hover:bg-[#1040C0]/90",
    yellow: "bg-[#F0C020] text-black shadow-[4px_4px_0px_0px_black] hover:bg-[#F0C020]/90",
    outline: "bg-white text-black shadow-[4px_4px_0px_0px_black] hover:bg-gray-100",
    ghost: "border-none text-black hover:bg-gray-200",
  }

  return (
    <button className={`${baseClasses} ${variants[variant]} ${className}`}>
      {children}
    </button>
  )
}

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b-4 border-black bg-[#F0F0F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            <div className="w-6 h-6 rounded-full bg-[#D02020] border-2 border-black mix-blend-multiply" />
            <div className="w-6 h-6 bg-[#1040C0] border-2 border-black mix-blend-multiply" />
            <div className="w-6 h-6 bg-[#F0C020] border-2 border-black mix-blend-multiply" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
          </div>
          <span className="font-black text-2xl tracking-tighter text-black uppercase">
            {PRODUCT_NAME}
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8 border-l-4 border-r-4 border-black px-8 h-full">
          {NAV_LINKS.map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-sm font-bold uppercase tracking-widest text-black hover:text-[#D02020] transition-colors"
            >
              {link}
            </a>
          ))}
        </div>

        <div className="flex items-center">
          <Button variant="primary" className="hidden sm:flex h-12 px-6">
            GET ACCESS
          </Button>
          <button className="md:hidden w-12 h-12 border-2 border-black bg-[#F0C020] flex flex-col items-center justify-center gap-1.5 shadow-[2px_2px_0px_0px_black] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all">
            <span className="w-6 h-0.5 bg-black" />
            <span className="w-6 h-0.5 bg-black" />
            <span className="w-6 h-0.5 bg-black" />
          </button>
        </div>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section className="min-h-dvh pt-20 flex flex-col lg:flex-row border-b-4 border-black bg-[#F0F0F0]">
      <div className="w-full lg:w-1/2 p-6 md:p-12 lg:p-24 flex flex-col justify-center border-b-4 lg:border-b-0 lg:border-r-4 border-black relative">
        {/* Dot pattern background */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
             style={{ backgroundImage: 'radial-gradient(#121212 2px, transparent 2px)', backgroundSize: '20px 20px' }} />

        <div className="relative z-10 max-w-xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' as const }}
          >
            <div className="inline-block bg-[#121212] text-white px-4 py-2 font-bold uppercase tracking-widest text-sm mb-8">
              {PRODUCT_NAME} V1.0
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' as const }}
            className="text-5xl sm:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tighter uppercase mb-8"
          >
            {TAGLINE}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' as const }}
            className="text-lg md:text-xl font-medium leading-relaxed mb-12 max-w-md"
          >
            {DESCRIPTION}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' as const }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button variant="primary">
              START BUILDING <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button variant="outline">
              VIEW DOCS
            </Button>
          </motion.div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 bg-[#1040C0] relative min-h-[50vh] overflow-hidden flex items-center justify-center p-8">
        {/* Abstract Geometric Composition */}
        <motion.div
          className="relative w-full max-w-md aspect-square"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' as const }}
        >
          {/* Large Circle */}
          <motion.div
            className="absolute top-[10%] left-[10%] w-[60%] h-[60%] rounded-full bg-[#D02020] border-4 border-black mix-blend-normal shadow-[8px_8px_0px_0px_black]"
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          />

          {/* Rotated Square */}
          <motion.div
            className="absolute top-[30%] right-[10%] w-[50%] h-[50%] bg-[#F0C020] border-4 border-black mix-blend-normal shadow-[8px_8px_0px_0px_black]"
            initial={{ rotate: 45 }}
            animate={{ rotate: [45, 45, 135, 135, 225, 225, 315, 315, 405] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", times: [0, 0.1, 0.25, 0.35, 0.5, 0.6, 0.75, 0.85, 1] }}
          />

          {/* Triangle */}
          <motion.div
            className="absolute bottom-[10%] left-[25%] w-[50%] h-[50%] bg-[#F0F0F0] border-4 border-black mix-blend-normal shadow-[8px_8px_0px_0px_black] flex items-center justify-center"
            style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
            whileHover={{ scale: 1.1 }}
          >
            <div className="mt-8">
              <Triangle className="w-12 h-12 text-black fill-black" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function Stats() {
  return (
    <section className="bg-[#F0C020] border-b-4 border-black">
      <div className="max-w-7xl mx-auto">
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y-4 sm:divide-y-0 sm:divide-x-4 divide-black">
          {STATS.map((stat, i) => (
            <motion.div key={stat.label} variants={staggerItem} className="p-12 text-center group relative overflow-hidden">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"
                   style={{ backgroundImage: 'radial-gradient(#121212 2px, transparent 2px)', backgroundSize: '10px 10px' }} />

              <div className="relative z-10">
                <div className="flex justify-center mb-6">
                  {stat.shape === 'square' && <div className="w-12 h-12 bg-black transition-transform duration-300 group-hover:rotate-90 group-hover:scale-110" />}
                  {stat.shape === 'circle' && <div className="w-12 h-12 rounded-full bg-black transition-transform duration-300 group-hover:scale-110" />}
                  {stat.shape === 'triangle' && <div className="w-12 h-12 bg-black transition-transform duration-300 group-hover:rotate-180 group-hover:scale-110" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />}
                  {stat.shape === 'rotated-square' && <div className="w-12 h-12 bg-black rotate-45 transition-transform duration-300 group-hover:rotate-[135deg] group-hover:scale-110" />}
                </div>
                <p className="text-6xl md:text-7xl font-black tracking-tighter text-black mb-2">{stat.value}</p>
                <p className="font-bold uppercase tracking-widest text-black/80">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

function Features() {
  const bgColors = ['bg-[#F0F0F0]', 'bg-[#F0F0F0]', 'bg-[#F0F0F0]', 'bg-[#F0F0F0]', 'bg-[#F0F0F0]', 'bg-[#F0F0F0]']
  const accentColors = ['bg-[#D02020]', 'bg-[#1040C0]', 'bg-[#F0C020]', 'bg-[#D02020]', 'bg-[#1040C0]', 'bg-[#F0C020]']
  const shapes = ['rounded-full', 'rounded-none', 'polygon(50% 0%, 0% 100%, 100% 100%)']

  return (
    <section id="features" className="py-16 md:py-24 border-b-4 border-black bg-[#F0F0F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp>
          <div className="mb-16 border-l-8 border-[#D02020] pl-6">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 max-w-2xl">
              SYSTEMATIC COMPONENTS
            </h2>
            <p className="text-xl font-medium max-w-2xl">
              A comprehensive toolkit for the modern rationalist. Everything you need, nothing you don't.
            </p>
          </div>
        </FadeUp>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              variants={staggerItem}
              whileHover={{ y: -8 }}
              className={`p-8 border-4 border-black shadow-[8px_8px_0px_0px_black] ${bgColors[i]} relative overflow-hidden group`}
            >
              {/* Decorative Corner */}
              <div
                className={`absolute top-0 right-0 w-16 h-16 border-l-4 border-b-4 border-black ${accentColors[i]} ${i % 2 === 0 ? '' : 'rounded-bl-full'}`}
              />

              <div className="w-16 h-16 bg-white border-4 border-black shadow-[4px_4px_0px_0px_black] flex items-center justify-center mb-8 relative z-10 transition-transform duration-300 group-hover:scale-110">
                <feature.icon className="w-8 h-8 text-black" strokeWidth={2.5} />
              </div>

              <h3 className="font-black text-2xl uppercase tracking-tight mb-4 relative z-10">{feature.title}</h3>
              <p className="font-medium text-lg relative z-10">{feature.description}</p>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

function ProductDetail() {
  return (
    <section className="flex flex-col lg:flex-row border-b-4 border-black bg-[#D02020]">
      <div className="w-full lg:w-1/2 p-8 md:p-16 lg:p-24 flex items-center justify-center border-b-4 lg:border-b-0 lg:border-r-4 border-black relative overflow-hidden">
        {/* Abstract Face Composition */}
        <div className="relative w-full max-w-md aspect-square">
          {/* Eye 1 */}
          <motion.div
            className="absolute top-[20%] left-[10%] w-[30%] h-[30%] rounded-full bg-white border-4 border-black shadow-[8px_8px_0px_0px_black] flex items-center justify-center"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-1/3 h-1/3 rounded-full bg-black" />
          </motion.div>

          {/* Eye 2 */}
          <motion.div
            className="absolute top-[20%] right-[10%] w-[30%] h-[30%] rounded-none bg-[#1040C0] border-4 border-black shadow-[8px_8px_0px_0px_black] flex items-center justify-center rotate-45"
            animate={{ rotate: [45, 45, 135, 135] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-1/3 h-1/3 bg-black -rotate-45" />
          </motion.div>

          {/* Nose Line */}
          <div className="absolute top-[40%] left-[50%] w-2 h-[30%] bg-black -translate-x-1/2 shadow-[4px_4px_0px_0px_black]" />

          {/* Mouth */}
          <motion.div
            className="absolute bottom-[10%] left-[20%] w-[60%] h-[15%] rounded-full bg-[#F0C020] border-4 border-black shadow-[8px_8px_0px_0px_black]"
            whileHover={{ height: '25%', bottom: '5%' }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          />
        </div>
      </div>

      <div className="w-full lg:w-1/2 p-8 md:p-16 lg:p-24 bg-white flex flex-col justify-center">
        <FadeUp>
          <div className="inline-block bg-[#D02020] text-white px-4 py-2 font-bold uppercase tracking-widest text-sm mb-8 shadow-[4px_4px_0px_0px_black]">
            THE MANIFESTO
          </div>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 text-black">
            RADICAL SIMPLICITY
          </h2>
          <div className="space-y-6 text-lg font-medium">
            <p>
              We believe that true beauty arises from absolute functionality. In a digital landscape cluttered with arbitrary decoration, we provide the tools for structural integrity.
            </p>
            <p>
              Every component is a building block. Every color is a signal. Every font is a vessel for meaning. There is no room for ambiguity.
            </p>
            <ul className="mt-8 space-y-4">
              <li className="flex items-start gap-4">
                <div className="mt-1 w-6 h-6 rounded-full bg-[#D02020] border-2 border-black flex-shrink-0" />
                <span><strong className="font-bold uppercase tracking-widest text-sm block mb-1">Color as Code</strong> Primaries are used to direct attention and indicate state, never merely to decorate.</span>
              </li>
              <li className="flex items-start gap-4">
                <div className="mt-1 w-6 h-6 bg-[#1040C0] border-2 border-black flex-shrink-0" />
                <span><strong className="font-bold uppercase tracking-widest text-sm block mb-1">Geometry as Structure</strong> Strict adherence to basic shapes ensures visual harmony and rational construction.</span>
              </li>
              <li className="flex items-start gap-4">
                <div className="mt-1 w-6 h-6 bg-[#F0C020] border-2 border-black flex-shrink-0" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
                <span><strong className="font-bold uppercase tracking-widest text-sm block mb-1">Typography as Voice</strong> A single, objective typeface used with rigorous hierarchical discipline.</span>
              </li>
            </ul>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

function Pricing() {
  return (
    <section id="pricing" className="py-24 border-b-4 border-black bg-[#F0F0F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp>
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">ACCESS</h2>
            <p className="text-xl font-medium">Straightforward plans for rational builders.</p>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {PRICING.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-5% 0px' }}
              transition={{ duration: 0.3, ease: 'easeOut' as const, delay: i * 0.1 }}
              className={`border-4 border-black bg-white p-8 ${tier.highlighted ? 'md:-mt-4 md:mb-4 shadow-[12px_12px_0px_0px_black]' : 'shadow-[8px_8px_0px_0px_black]'}`}
              whileHover={{ y: -8 }}
            >
              <div
                className={`w-full h-4 mb-8 border-b-4 border-black ${i === 0 ? 'bg-[#1040C0]' : i === 1 ? 'bg-[#D02020]' : 'bg-[#F0C020]'}`}
                style={{ marginLeft: '-2rem', paddingRight: '4rem', width: 'calc(100% + 4rem)' }}
              />

              <h3 className="font-black text-3xl uppercase tracking-tighter mb-2">{tier.name}</h3>
              <p className="font-medium text-sm h-10 mb-6">{tier.description}</p>

              <div className="flex items-baseline gap-1 mb-8 pb-8 border-b-4 border-black">
                <span className="text-6xl font-black tracking-tighter">{tier.price}</span>
                <span className="font-bold uppercase tracking-widest text-sm">/ {tier.period}</span>
              </div>

              <ul className="space-y-4 mb-10 h-48">
                {tier.features.map(f => (
                  <li key={f} className="flex items-center gap-3 font-medium">
                    <Check className="w-5 h-5" strokeWidth={3} />
                    {f}
                  </li>
                ))}
              </ul>

              <Button
                variant={i === 0 ? 'outline' : i === 1 ? 'primary' : 'yellow'}
                className="w-full"
              >
                {tier.cta}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Testimonials() {
  return (
    <section id="testimonials" className="py-24 border-b-4 border-black bg-[#1040C0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp>
          <div className="mb-16 border-l-8 border-[#F0C020] pl-6">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white">REVIEWS</h2>
          </div>
        </FadeUp>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              variants={staggerItem}
              className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_black] group hover:-translate-y-2 transition-transform duration-300 relative"
            >
              <div className={`absolute top-4 right-4 w-12 h-12 border-4 border-black flex items-center justify-center ${i === 0 ? 'bg-[#D02020]' : i === 1 ? 'bg-[#F0C020]' : 'bg-[#1040C0]'}`}>
                <Quote className="w-6 h-6 text-white" strokeWidth={3} fill="currentColor" />
              </div>

              <div className="mb-8 pr-12">
                <p className="font-bold text-xl uppercase tracking-tighter border-b-4 border-black pb-4 mb-4 group-hover:bg-[#121212] group-hover:text-white transition-colors p-2 -ml-2 w-[calc(100%+16px)]">
                  {t.name}
                </p>
                <p className="font-bold uppercase tracking-widest text-sm text-[#D02020]">
                  {t.role} // {t.company}
                </p>
              </div>
              <p className="font-medium text-lg leading-relaxed">
                {t.text}
              </p>
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
    <section id="faq" className="py-24 border-b-4 border-black bg-[#F0F0F0]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp>
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">INQUIRIES</h2>
          </div>
        </FadeUp>

        <div className="space-y-6">
          {FAQ_ITEMS.map((item, i) => (
            <FadeUp key={i} delay={i * 0.1}>
              <div className={`border-4 border-black shadow-[6px_6px_0px_0px_black] transition-colors duration-200 ${openIndex === i ? 'bg-[#D02020] text-white' : 'bg-white text-black'}`}>
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  aria-expanded={openIndex === i}
                  className="w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none"
                >
                  <span className="font-black text-xl md:text-2xl uppercase tracking-tighter pr-8">{item.q}</span>
                  <motion.div
                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut' as const }}
                    className={`flex-shrink-0 w-10 h-10 border-4 ${openIndex === i ? 'border-white bg-[#F0C020]' : 'border-black bg-[#1040C0]'} flex items-center justify-center`}
                  >
                    <ChevronDown className={`w-6 h-6 ${openIndex === i ? 'text-black' : 'text-white'}`} strokeWidth={3} />
                  </motion.div>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openIndex === i ? 'auto' : 0, opacity: openIndex === i ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' as const }}
                  style={{ overflow: 'hidden' }}
                >
                  <div className={`p-6 md:p-8 pt-0 font-medium text-lg border-t-4 ${openIndex === i ? 'bg-[#FFF9C4] border-black text-black' : 'border-transparent'}`}>
                    <div className={openIndex === i ? 'pt-6' : ''}>
                      {item.a}
                    </div>
                  </div>
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
    <section className="py-24 border-b-4 border-black bg-[#F0C020]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <FadeUp>
          <div className="inline-block bg-black text-white px-4 py-2 font-bold uppercase tracking-widest text-sm mb-8 shadow-[4px_4px_0px_0px_white]">
            NEWSLETTER
          </div>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8">STAY INFORMED</h2>

          {status === 'success' ? (
            <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_black] inline-block">
              <p className="font-black text-2xl uppercase tracking-tighter text-[#D02020] flex items-center gap-4">
                <Check strokeWidth={4} className="w-8 h-8" /> CONFIRMED
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row justify-center max-w-2xl mx-auto gap-4 sm:gap-0">
              <label htmlFor="newsletter-email" className="sr-only">Email address</label>
              <input
                id="newsletter-email"
                type="email"
                required
                placeholder="YOUR@EMAIL.COM"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="flex-1 h-16 px-6 border-4 border-black bg-white font-bold text-lg uppercase focus:outline-none focus:ring-0 focus:border-[#1040C0] shadow-[4px_4px_0px_0px_black] sm:shadow-none sm:border-r-0 placeholder:text-black/30"
              />
              <Button
                variant="primary"
                className="h-16 px-8 sm:shadow-[4px_4px_0px_0px_black]"
              >
                {status === 'loading' ? 'PROCESSING' : 'SUBSCRIBE'}
              </Button>
            </form>
          )}
        </FadeUp>
      </div>
    </section>
  )
}

function Footer() {
  const links = {
    SYSTEM: ['Components', 'Templates', 'Guidelines', 'Changelog'],
    STUDIO: ['About', 'Manifesto', 'Careers', 'Contact'],
    LEGAL: ['Privacy', 'Terms', 'Imprint'],
  }

  return (
    <footer className="bg-[#121212] pt-20 pb-10 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] border-8 border-[#1040C0] rounded-full translate-x-1/2 -translate-y-1/2 opacity-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] border-8 border-[#D02020] translate-x-[-20%] translate-y-[20%] opacity-20 pointer-events-none rotate-45" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-8 mb-16">
          <div className="col-span-2 md:col-span-1 border-l-4 border-[#F0C020] pl-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 bg-[#D02020] border-2 border-white" />
              <span className="font-black text-2xl tracking-tighter uppercase">{PRODUCT_NAME}</span>
            </div>
            <p className="font-medium text-white/70 max-w-xs">
              Form follows function. Geometric precision for modern digital interfaces.
            </p>
          </div>

          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <p className="font-black text-xl uppercase tracking-tighter mb-6 pb-2 border-b-4 border-white/20 inline-block">{group}</p>
              <ul className="space-y-3">
                {items.map(item => (
                  <li key={item}>
                    <a href="#" className="font-bold uppercase tracking-widest text-sm text-white/70 hover:text-[#00FFFF] hover:pl-2 transition-all relative group flex items-center">
                      <span className="opacity-0 group-hover:opacity-100 absolute -left-4 text-[#00FFFF] transition-opacity">&gt;</span>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t-4 border-white/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-bold uppercase tracking-widest text-xs text-white/50">
            © 2026 {PRODUCT_NAME}. ALL RIGHTS RESERVED.
          </p>
          <a
            href="/"
            className="font-bold uppercase tracking-widest text-xs px-6 py-3 border-2 border-white hover:bg-white hover:text-black transition-colors"
          >
            RETURN TO INDEX
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
    <div className={`${bodyFont.variable} font-sans bg-[#F0F0F0] text-[#121212] selection:bg-[#D02020] selection:text-white`}>
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