'use client'

/**
 * PAGE TEMPLATE — oh-my-design
 *
 * Copy this file to app/styles/[slug]/page.tsx
 * Replace STYLE_NAME, colors, fonts, and content
 * Follow designprompts_dev_all_styles.md for the design system
 */

import { motion, useReducedMotion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
// Replace fonts with those specified in the design system:
import { Playfair_Display, Lora, Inter, JetBrains_Mono } from 'next/font/google'
import {
  Star, ChevronDown, ArrowRight, Check, Users, Zap, Globe, Shield,
  BookOpen, Layout, Palette, Code2, BarChart, Lock
} from 'lucide-react'

// ─────────────────────────────────────────────
// FONTS — replace with style-specific fonts
// ─────────────────────────────────────────────
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

// ─────────────────────────────────────────────
// DESIGN TOKENS — replace ALL values per style
// ─────────────────────────────────────────────
const tokens = {
  background: '#F9F9F7',
  backgroundAlt: '#F5F5F5',
  foreground: '#111111',
  muted: '#E5E5E0',
  mutedForeground: '#525252',
  border: '#111111',
  accent: '#CC0000',
  accentForeground: '#F9F9F7',
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
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

// ─────────────────────────────────────────────
// DATA — replace with style-appropriate content
// ─────────────────────────────────────────────
const PRODUCT_NAME = 'ProductName'
const TAGLINE = 'The product tagline goes here'
const DESCRIPTION = 'A compelling description of what this product does and why it matters.'

const NAV_LINKS = ['Features', 'Pricing', 'Testimonials', 'FAQ']

const STATS = [
  { value: '50K+', label: 'Active Users' },
  { value: '99.9%', label: 'Uptime' },
  { value: '140+', label: 'Countries' },
  { value: '4.9/5', label: 'Rating' },
]

const FEATURES = [
  { icon: BookOpen, title: 'Feature One', description: 'Describe the first key feature and its benefit to users.' },
  { icon: Layout, title: 'Feature Two', description: 'Describe the second key feature and its benefit to users.' },
  { icon: Palette, title: 'Feature Three', description: 'Describe the third key feature and its benefit to users.' },
  { icon: Code2, title: 'Feature Four', description: 'Describe the fourth key feature and its benefit to users.' },
  { icon: BarChart, title: 'Feature Five', description: 'Describe the fifth key feature and its benefit to users.' },
  { icon: Lock, title: 'Feature Six', description: 'Describe the sixth key feature and its benefit to users.' },
]

const PRICING = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for individuals getting started.',
    features: ['5 projects', '1 user', 'Basic analytics', 'Email support'],
    cta: 'Get started',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$29',
    period: 'per month',
    description: 'For growing teams that need more power.',
    features: ['Unlimited projects', '10 users', 'Advanced analytics', 'Priority support', 'Custom domains', 'API access'],
    cta: 'Start free trial',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: '$99',
    period: 'per month',
    description: 'For large organizations with custom needs.',
    features: ['Everything in Pro', 'Unlimited users', 'SSO / SAML', 'Dedicated support', 'SLA guarantee', 'Custom integrations'],
    cta: 'Contact sales',
    highlighted: false,
  },
]

const TESTIMONIALS = [
  {
    name: 'Alexandra Chen',
    role: 'Product Manager',
    company: 'Acme Corp',
    text: 'This product completely transformed how our team works. The results have been incredible.',
    rating: 5,
  },
  {
    name: 'Marcus Williams',
    role: 'CTO',
    company: 'StartupXYZ',
    text: 'I\'ve tried many tools in this space, but nothing comes close. The quality is exceptional.',
    rating: 5,
  },
  {
    name: 'Sofia Rodriguez',
    role: 'Designer',
    company: 'Creative Studio',
    text: 'The attention to detail is remarkable. Every interaction feels intentional and polished.',
    rating: 5,
  },
]

const FAQ_ITEMS = [
  { q: 'How do I get started?', a: 'Sign up for a free account and follow the onboarding wizard. You\'ll be up and running in under 5 minutes.' },
  { q: 'Can I cancel anytime?', a: 'Yes, absolutely. There are no long-term commitments. Cancel your subscription at any time from your account settings.' },
  { q: 'Do you offer a free trial?', a: 'Yes! All Pro features are available free for 14 days. No credit card required.' },
  { q: 'What payment methods do you accept?', a: 'We accept all major credit cards, PayPal, and bank transfers for Enterprise plans.' },
  { q: 'Is my data secure?', a: 'Security is our top priority. All data is encrypted in transit and at rest. We\'re SOC 2 Type II certified.' },
  { q: 'Do you have an API?', a: 'Yes, we offer a comprehensive REST API with full documentation available for Pro and Enterprise customers.' },
]

// ─────────────────────────────────────────────
// COMPONENTS
// ─────────────────────────────────────────────

function Navbar() {
  return (
    <nav
      className="sticky top-0 z-50 border-b-4 bg-[#F9F9F7]"
      style={{ borderColor: tokens.border }}
    >
      <div className="px-4 h-16 flex items-center justify-between">
        <span className="font-[family-name:var(--font-playfair)] font-black text-2xl uppercase tracking-tighter" style={{ color: tokens.foreground }}>
          {PRODUCT_NAME}
        </span>
        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="font-mono text-xs uppercase tracking-widest hover:bg-[#111111] hover:text-white px-2 py-1 transition-colors"
              style={{ color: tokens.foreground }}
            >
              {link}
            </a>
          ))}
        </div>
        <button
          className="px-6 h-10 font-mono text-xs uppercase tracking-widest transition-colors duration-200"
          style={{ backgroundColor: tokens.border, color: tokens.background, borderRadius: '0px' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = tokens.foreground;
            e.currentTarget.style.border = `1px solid ${tokens.border}`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = tokens.border;
            e.currentTarget.style.color = tokens.background;
            e.currentTarget.style.border = 'none';
          }}
        >
          Subscribe
        </button>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section className="border-b border-black">
      {/* Edition Metadata */}
      <div className="flex flex-col sm:flex-row justify-between items-center py-2 px-4 border-b border-black font-mono text-xs uppercase tracking-widest" style={{ color: tokens.foreground }}>
        <span>Vol. 1.0</span>
        <span className="hidden sm:inline">All the News That's Fit to Print</span>
        <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div className="col-span-1 lg:col-span-8 p-6 lg:p-12 lg:border-r border-black flex flex-col justify-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="font-mono text-xs uppercase tracking-[0.2em] mb-4"
            style={{ color: tokens.accent }}
          >
            Breaking Development
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl sm:text-7xl lg:text-9xl font-black font-[family-name:var(--font-playfair)] leading-[0.9] tracking-tighter mb-6"
            style={{ color: tokens.foreground }}
          >
            {TAGLINE}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl mb-10 max-w-2xl leading-relaxed font-[family-name:var(--font-lora)]"
            style={{ color: tokens.mutedForeground }}
          >
            <span className="float-left text-7xl leading-[0.8] mr-3 font-[family-name:var(--font-playfair)]" style={{ color: tokens.foreground }}>A</span>
            {DESCRIPTION.substring(1)}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button
              className="h-12 px-8 font-mono text-sm uppercase tracking-widest transition-all duration-200"
              style={{ backgroundColor: tokens.border, color: tokens.background, borderRadius: '0px' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = tokens.foreground;
                e.currentTarget.style.border = `1px solid ${tokens.border}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = tokens.border;
                e.currentTarget.style.color = tokens.background;
                e.currentTarget.style.border = 'none';
              }}
            >
              Read Full Story
            </button>
            <button
              className="h-12 px-8 font-mono text-sm uppercase tracking-widest border transition-all duration-200"
              style={{ borderColor: tokens.border, color: tokens.foreground, borderRadius: '0px', backgroundColor: 'transparent' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = tokens.border;
                e.currentTarget.style.color = tokens.background;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = tokens.foreground;
              }}
            >
              View Demo
            </button>
          </motion.div>
        </div>

        {/* Hero Visual — Sidebar Column */}
        <div className="col-span-1 lg:col-span-4 border-t lg:border-t-0 border-black p-6 flex flex-col gap-6">
          <FadeUp delay={0.4}>
            <div
              className="w-full aspect-[4/3] md:aspect-square bg-[radial-gradient(#000_1px,transparent_1px)] opacity-30 [background-size:16px_16px] grayscale hover:sepia-[50%] transition-all duration-500"
              style={{ border: `1px solid ${tokens.border}`, borderRadius: '0px' }}
            >
              {/* Image Placeholder */}
              <div className="w-full h-full flex items-center justify-center font-mono text-xs uppercase tracking-widest" style={{ color: tokens.foreground }}>
                Fig. 1.1
              </div>
            </div>
          </FadeUp>
          <div>
            <h3 className="font-[family-name:var(--font-playfair)] font-bold text-2xl mb-2" style={{ color: tokens.foreground }}>Editorial Note</h3>
            <p className="font-[family-name:var(--font-lora)] text-sm leading-relaxed" style={{ color: tokens.mutedForeground }}>
              This visual arrangement mirrors the discipline of classic editorial layout, emphasizing legibility and structural hierarchy.
            </p>
          </div>
          <div className="mt-auto border-t border-black pt-4">
             <p className="font-mono text-xs tracking-widest uppercase" style={{ color: tokens.foreground }}>Author: Desk Editor</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Stats() {
  return (
    <section className="border-b border-black overflow-hidden bg-black text-white">
      {/* Marquee Ticker */}
      <div className="flex whitespace-nowrap py-3 items-center">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="flex gap-8 items-center"
        >
          {[...STATS, ...STATS, ...STATS, ...STATS].map((stat, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="w-2 h-2 bg-[#CC0000]" />
              <span className="font-mono uppercase text-xs tracking-widest">
                {stat.label}: <span className="font-bold">{stat.value}</span>
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function Features() {
  return (
    <section id="features" className="border-b border-black newsprint-texture" style={{ backgroundColor: tokens.background }}>
      <div className="grid grid-cols-1 md:grid-cols-12">
        <div className="md:col-span-3 border-b md:border-b-0 md:border-r border-black p-6 md:p-8 flex flex-col justify-between">
          <FadeUp>
            <p className="font-mono text-xs uppercase tracking-widest mb-4" style={{ color: tokens.accent }}>02. Features</p>
            <h2 className="text-4xl font-black font-[family-name:var(--font-playfair)] leading-tight mb-4" style={{ color: tokens.foreground }}>
              Core Competencies
            </h2>
            <p className="font-[family-name:var(--font-lora)] text-sm leading-relaxed mb-8" style={{ color: tokens.mutedForeground }}>
              A systematic approach to functionality, prioritizing reliability and structural integrity above all else.
            </p>
          </FadeUp>
        </div>
        <div className="md:col-span-9 p-6 md:p-8">
          <StaggerContainer>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {FEATURES.map(feature => (
                <motion.div
                  key={feature.title}
                  variants={staggerItem}
                  className="hard-shadow-hover p-6 border transition-all duration-200 cursor-pointer bg-[#F9F9F7]"
                  style={{ borderColor: tokens.border, borderRadius: '0px' }}
                >
                  <div className="border border-black h-12 w-12 flex items-center justify-center mb-6 transition-colors group-hover:bg-black group-hover:text-white">
                    <feature.icon className="h-5 w-5" strokeWidth={1} style={{ color: tokens.foreground }} />
                  </div>
                  <h3 className="font-[family-name:var(--font-playfair)] font-bold text-xl mb-3" style={{ color: tokens.foreground }}>{feature.title}</h3>
                  <p className="font-[family-name:var(--font-lora)] text-sm leading-relaxed" style={{ color: tokens.mutedForeground }}>{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </div>
    </section>
  )
}

function ProductDetail() {
  return (
    <section className="border-b border-black bg-[#111111] text-[#F9F9F7]">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-5 p-8 lg:p-16 border-b lg:border-b-0 lg:border-r border-[#333333] flex flex-col justify-center">
          <FadeUp>
            <div className="mb-8">
              <span className="font-mono text-xs tracking-widest uppercase bg-[#CC0000] text-white px-2 py-1">In Focus</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-playfair)] font-bold mb-8 leading-tight">
              A detailed examination of structural integrity and modern utility.
            </h2>
            <div className="py-8 text-left font-serif text-2xl text-neutral-400 tracking-[1em]">
              ✧ ✧ ✧
            </div>
          </FadeUp>
        </div>
        <div className="lg:col-span-7 p-8 lg:p-16 text-justify columns-1 sm:columns-2 gap-8">
          <FadeUp delay={0.2}>
            <p className="font-[family-name:var(--font-lora)] text-sm leading-relaxed text-neutral-300 mb-6">
              <span className="float-left text-5xl leading-[0.8] mr-2 font-[family-name:var(--font-playfair)] text-[#CC0000]">L</span>
              orem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
            <p className="font-[family-name:var(--font-lora)] text-sm leading-relaxed text-neutral-300 mb-6">
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris.
            </p>
            <p className="font-[family-name:var(--font-lora)] text-sm leading-relaxed text-neutral-300 mb-6">
              Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam.
            </p>
            <p className="font-[family-name:var(--font-lora)] text-sm leading-relaxed text-neutral-300">
              Maecenas fermentum consequat mi. Donec fermentum. Pellentesque malesuada nulla a mi. Duis sapien sem, aliquet nec, commodo eget, consequat quis, neque. Aliquam faucibus, elit ut dictum aliquet, felis nisl adipiscing sapien, sed malesuada diam lacus eget erat. Cras mollis scelerisque nunc.
            </p>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}

function Pricing() {
  return (
    <section id="pricing" className="border-b border-black newsprint-texture" style={{ backgroundColor: tokens.background }}>
      <div className="border-b border-black p-6 md:p-8 text-center">
        <FadeUp>
          <p className="font-mono text-xs uppercase tracking-widest mb-4" style={{ color: tokens.accent }}>03. Subscription</p>
          <h2 className="text-4xl font-black font-[family-name:var(--font-playfair)] leading-tight" style={{ color: tokens.foreground }}>
            Access the Archives
          </h2>
        </FadeUp>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3">
        {PRICING.map((tier, index) => (
          <div key={tier.name} className={`p-6 md:p-8 flex flex-col ${index !== 2 ? 'border-b md:border-b-0 md:border-r border-black' : ''} ${tier.highlighted ? 'bg-[#F0F0F0]' : 'bg-transparent'}`}>
            <FadeUp delay={index * 0.1}>
              {tier.highlighted && (
                <div className="mb-4">
                  <span className="font-mono text-[10px] uppercase tracking-widest bg-[#CC0000] text-white px-2 py-1">Editor's Choice</span>
                </div>
              )}
              <h3 className="font-[family-name:var(--font-playfair)] font-bold text-2xl mb-2" style={{ color: tokens.foreground }}>{tier.name}</h3>
              <div className="flex items-baseline gap-1 mb-4 border-b border-dashed border-black pb-4">
                <span className="text-5xl font-black font-[family-name:var(--font-playfair)]" style={{ color: tokens.foreground }}>{tier.price}</span>
                <span className="font-mono text-xs uppercase tracking-widest" style={{ color: tokens.mutedForeground }}>/ {tier.period}</span>
              </div>
              <p className="font-[family-name:var(--font-lora)] text-sm leading-relaxed mb-6 h-12" style={{ color: tokens.mutedForeground }}>{tier.description}</p>

              <ul className="space-y-4 mb-8 flex-grow">
                {tier.features.map(f => (
                  <li key={f} className="flex items-start gap-3">
                    <Check className="h-4 w-4 mt-1 flex-shrink-0" style={{ color: tokens.foreground }} />
                    <span className="font-[family-name:var(--font-lora)] text-sm" style={{ color: tokens.foreground }}>{f}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full h-12 font-mono text-xs uppercase tracking-widest transition-all duration-200 mt-auto ${tier.highlighted ? 'bg-[#CC0000] text-white hover:bg-black' : 'border border-black bg-transparent text-black hover:bg-black hover:text-white'}`}
                style={{ borderRadius: '0px' }}
              >
                {tier.cta}
              </button>
            </FadeUp>
          </div>
        ))}
      </div>
    </section>
  )
}

function Testimonials() {
  return (
    <section id="testimonials" className="border-b border-black" style={{ backgroundColor: tokens.background }}>
      <div className="grid grid-cols-1 md:grid-cols-12">
        <div className="md:col-span-3 border-b md:border-b-0 md:border-r border-black p-6 md:p-8 flex flex-col justify-between">
          <FadeUp>
            <p className="font-mono text-xs uppercase tracking-widest mb-4" style={{ color: tokens.accent }}>04. Opinion</p>
            <h2 className="text-4xl font-black font-[family-name:var(--font-playfair)] leading-tight mb-4" style={{ color: tokens.foreground }}>
              Public Discourse
            </h2>
            <p className="font-[family-name:var(--font-lora)] text-sm leading-relaxed mb-8" style={{ color: tokens.mutedForeground }}>
              Selected letters and commentary from our readership.
            </p>
          </FadeUp>
        </div>
        <div className="md:col-span-9 p-6 md:p-8">
          <StaggerContainer>
            <div className="columns-1 sm:columns-2 gap-8">
              {TESTIMONIALS.map(t => (
                <motion.div
                  key={t.name}
                  variants={staggerItem}
                  className="mb-8 break-inside-avoid"
                >
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-current" style={{ color: tokens.foreground }} />
                    ))}
                  </div>
                  <p className="font-[family-name:var(--font-lora)] text-base italic leading-relaxed mb-4" style={{ color: tokens.foreground }}>"{t.text}"</p>
                  <div className="border-t border-dashed border-black pt-2">
                    <p className="font-mono text-xs uppercase tracking-widest" style={{ color: tokens.foreground }}>{t.name}</p>
                    <p className="font-mono text-[10px] uppercase tracking-widest" style={{ color: tokens.mutedForeground }}>{t.role}, {t.company}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </div>
    </section>
  )
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="border-b border-black newsprint-texture" style={{ backgroundColor: tokens.background }}>
      <div className="grid grid-cols-1 md:grid-cols-12">
        <div className="md:col-span-4 lg:col-span-5 p-6 md:p-8 border-b md:border-b-0 md:border-r border-black flex flex-col justify-center">
          <FadeUp>
            <p className="font-mono text-xs uppercase tracking-widest mb-4" style={{ color: tokens.accent }}>05. Information</p>
            <h2 className="text-4xl md:text-5xl font-black font-[family-name:var(--font-playfair)] leading-tight mb-6" style={{ color: tokens.foreground }}>
              Inquiries &<br />Clarifications
            </h2>
            <p className="font-[family-name:var(--font-lora)] text-sm leading-relaxed" style={{ color: tokens.mutedForeground }}>
              Answers to commonly raised questions regarding our publication, subscription models, and distribution methodology.
            </p>
          </FadeUp>
        </div>
        <div className="md:col-span-8 lg:col-span-7">
          <div className="divide-y divide-black">
            {FAQ_ITEMS.map((item, i) => (
              <div key={i} className="bg-[#F9F9F7] transition-colors hover:bg-[#F5F5F5]">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  aria-expanded={openIndex === i}
                  className="w-full flex items-start justify-between p-6 md:p-8 text-left"
                >
                  <span className="font-[family-name:var(--font-playfair)] font-bold text-lg md:text-xl pr-8" style={{ color: tokens.foreground }}>{item.q}</span>
                  <motion.span
                    animate={{ rotate: openIndex === i ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="mt-1"
                  >
                    <span className="text-xl leading-none" style={{ color: tokens.foreground }}>+</span>
                  </motion.span>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openIndex === i ? 'auto' : 0, opacity: openIndex === i ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  style={{ overflow: 'hidden' }}
                >
                  <p className="px-6 md:px-8 pb-8 font-[family-name:var(--font-lora)] text-sm leading-relaxed" style={{ color: tokens.mutedForeground }}>
                    {item.a}
                  </p>
                </motion.div>
              </div>
            ))}
          </div>
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
    <section className="border-b border-black" style={{ backgroundColor: tokens.background }}>
      <div className="grid grid-cols-1 md:grid-cols-12">
        <div className="md:col-span-5 p-8 lg:p-16 border-b md:border-b-0 md:border-r border-black flex flex-col justify-center">
          <FadeUp>
            <div className="mb-6">
              <span className="font-mono text-xs tracking-widest uppercase bg-black text-white px-2 py-1">Direct Delivery</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-black font-[family-name:var(--font-playfair)] leading-tight mb-4" style={{ color: tokens.foreground }}>
              The Morning Briefing
            </h2>
            <p className="font-[family-name:var(--font-lora)] text-sm leading-relaxed mb-8" style={{ color: tokens.mutedForeground }}>
              Curated intelligence delivered directly to your inbox. No superfluous content, only the essential dispatches.
            </p>
          </FadeUp>
        </div>
        <div className="md:col-span-7 p-8 lg:p-16 flex items-center bg-[#111111] text-[#F9F9F7]">
          <div className="w-full max-w-md">
            <FadeUp delay={0.2}>
              {status === 'success' ? (
                <div className="border border-[#F9F9F7] p-6 text-center">
                  <p className="font-mono text-sm uppercase tracking-widest text-[#F9F9F7]">Dispatch Confirmed</p>
                  <p className="font-[family-name:var(--font-lora)] text-sm mt-2 text-neutral-400">Your address has been added to our registry.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <label htmlFor="newsletter-email" className="font-mono text-xs uppercase tracking-widest text-neutral-400">Electronic Mail Address</label>
                  <div className="flex flex-col sm:flex-row gap-0">
                    <input
                      id="newsletter-email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="address@example.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="flex-1 h-12 px-4 border border-[#F9F9F7] bg-transparent font-mono text-sm placeholder:text-neutral-600 focus-visible:outline-none focus-visible:bg-[#1A1A1A]"
                      style={{ borderRadius: '0px', color: '#F9F9F7' }}
                    />
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="h-12 px-8 font-mono text-sm uppercase tracking-widest border border-[#F9F9F7] bg-[#F9F9F7] text-[#111111] transition-colors hover:bg-transparent hover:text-[#F9F9F7] disabled:opacity-60 mt-4 sm:mt-0 sm:ml-[-1px]"
                      style={{ borderRadius: '0px' }}
                    >
                      {status === 'loading' ? 'Processing...' : 'Subscribe'}
                    </button>
                  </div>
                </form>
              )}
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  const links = {
    Sections: ['World News', 'Business', 'Technology', 'Opinion'],
    Company: ['Masthead', 'Careers', 'Contact', 'Journalistic Standards'],
    Services: ['Subscriptions', 'Reprints', 'Archives', 'Syndication'],
    Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Preferences'],
  }

  return (
    <footer className="newsprint-texture" style={{ backgroundColor: tokens.background }}>
      <div className="p-8 lg:p-12">
        <div className="flex justify-center mb-12">
           <span className="font-[family-name:var(--font-playfair)] font-black text-4xl uppercase tracking-tighter" style={{ color: tokens.foreground }}>
            {PRODUCT_NAME}
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 border-y border-black py-12">
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <p className="font-mono text-xs uppercase tracking-widest mb-6 font-bold" style={{ color: tokens.foreground }}>{group}</p>
              <ul className="space-y-3">
                {items.map(item => (
                  <li key={item}>
                    <a href="#" className="font-[family-name:var(--font-lora)] text-sm hover:underline decoration-1 underline-offset-4" style={{ color: tokens.mutedForeground }}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs tracking-widest uppercase">
          <p style={{ color: tokens.mutedForeground }}>
            © {new Date().getFullYear()} {PRODUCT_NAME} Publishing Company.
          </p>
          <p style={{ color: tokens.mutedForeground }}>
            Edition: Vol 1.0 | Printed in NYC
          </p>
          <a
            href="/"
            className="px-3 py-1 border transition-colors hover:bg-black hover:text-white"
            style={{ borderColor: tokens.border, color: tokens.foreground, borderRadius: '0px' }}
          >
            ← Directory
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
    <div className={`${playfair.variable} ${lora.variable} ${inter.variable} ${jetbrains.variable} font-sans min-h-screen selection:bg-[#111111] selection:text-white pb-12`} style={{ backgroundColor: tokens.background }}>
      <style dangerouslySetInnerHTML={{__html: `
        .newsprint-texture::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(0deg, transparent 98%, rgba(0,0,0,0.02) 100%),
            linear-gradient(90deg, transparent 98%, rgba(0,0,0,0.02) 100%);
          background-size: 3px 3px;
          pointer-events: none;
          opacity: 0.5;
        }

        .hard-shadow-hover:hover {
          box-shadow: 4px 4px 0px 0px #111111;
          transform: translate(-2px, -2px);
        }
      `}} />
      <div
        className="pointer-events-none fixed inset-0 z-[-1]"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%23111111' fill-opacity='0.04' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E")` }}
      />

      <div className="max-w-screen-xl mx-auto border-x border-black bg-[#F9F9F7] relative">
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
    </div>
  )
}
