'use client'

import { motion, useReducedMotion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Playfair_Display, Inter } from 'next/font/google'
import {
  Star, ChevronDown, ArrowRight, Check,
  BookOpen, Layout, Palette, Code2, BarChart, Lock
} from 'lucide-react'

// ─────────────────────────────────────────────
// FONTS
// ─────────────────────────────────────────────
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['300', '400', '500'],
})

// ─────────────────────────────────────────────
// DESIGN TOKENS
// ─────────────────────────────────────────────
const tokens = {
  background: '#F9F8F6',     // Warm Alabaster
  foreground: '#1A1A1A',     // Rich Charcoal
  mutedBackground: '#EBE5DE',// Pale Taupe
  mutedForeground: '#6C6863',// Warm Grey
  accent: '#D4AF37',         // Metallic Gold
  accentForeground: '#FFFFFF',// Pure White
  border: '#1A1A1A',
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
      initial={shouldReduce ? false : { opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }} // Luxury easing
      className={className}
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
        visible: { transition: { staggerChildren: 0.15 } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const } },
}

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────
const PRODUCT_NAME = 'AURA'
const TAGLINE = 'Curated for the extraordinary.'
const DESCRIPTION = 'An invitation to experience software designed without compromise. We craft digital environments for those who appreciate the space between the elements as much as the elements themselves.'

const NAV_LINKS = ['Collection', 'Journal', 'Atelier', 'Inquiry']

const STATS = [
  { value: 'XII', label: 'Years of Mastery' },
  { value: 'M', label: 'Curated Artifacts' },
  { value: 'IV', label: 'Global Ateliers' },
  { value: 'LTD', label: 'Exclusive Access' },
]

const FEATURES = [
  { icon: Layout, title: 'Spatial Harmony', description: 'Every pixel is positioned with mathematical precision to create environments that breathe.' },
  { icon: Palette, title: 'Tactile Materials', description: 'Digital textures that invite touch, selected from a palette of the world\'s rarest digital pigments.' },
  { icon: Lock, title: 'Private Enclaves', description: 'Secure spaces designed for quiet contemplation, protected by invisible walls of cryptographic stone.' },
  { icon: Code2, title: 'Bespoke Architecture', description: 'Structures tailored to your exact measurements, discarding the notion of mass production.' },
  { icon: BarChart, title: 'Refined Insights', description: 'Data presented as a narrative, allowing patterns to emerge organically without force.' },
  { icon: BookOpen, title: 'Editorial Control', description: 'Tools that respect the author, fading into the background when the act of creation begins.' },
]

const PRICING = [
  {
    name: 'Edition.01',
    price: '$4,500',
    period: 'annual',
    description: 'An introduction to the curated experience.',
    features: ['Curated Access', 'Bespoke Onboarding', 'Quarterly Reviews'],
    cta: 'Inquire',
    highlighted: false,
  },
  {
    name: 'Edition.02',
    price: '$12,000',
    period: 'annual',
    description: 'The definitive expression of our philosophy.',
    features: ['Unlimited Access', 'Dedicated Concierge', 'Priority Commissioning', 'Private Events'],
    cta: 'Apply for Membership',
    highlighted: true,
  },
  {
    name: 'Bespoke',
    price: 'Unpublished',
    period: '',
    description: 'Commissioned pieces for the uncompromising.',
    features: ['Infinite Canvas', 'Director Access', 'White-glove Assembly'],
    cta: 'Private Consultation',
    highlighted: false,
  },
]

const TESTIMONIALS = [
  {
    name: 'Eleanor Vance',
    role: 'Creative Director',
    company: 'Maison Noir',
    text: 'A profound shift in how we interact with our audience. It doesn\'t just present our work; it elevates it to an art form.',
    rating: 5,
  },
  {
    name: 'Julian Blackwood',
    role: 'Founder',
    company: 'Atelier',
    text: 'There is a quiet confidence in this product that is rare in technology today. It speaks only when necessary, and what it says is perfect.',
    rating: 5,
  },
  {
    name: 'Sophia Laurent',
    role: 'Curator',
    company: 'Galerie Moderne',
    text: 'It respects the space. The interface feels less like software and more like a beautifully bound volume waiting to be read.',
    rating: 5,
  },
]

const FAQ_ITEMS = [
  { q: 'Is there a waiting list for Edition.02?', a: 'We maintain a curated list of prospective members to ensure the quality of experience for our current clientele. The current consideration period is approximately four weeks.' },
  { q: 'Do you offer private consultations?', a: 'Yes. Private viewings of our bespoke capabilities can be arranged through our concierge team in Paris, New York, or via secure digital enclave.' },
  { q: 'Can the architecture be modified?', a: 'While Edition.01 and Edition.02 offer structured environments, Bespoke commissions allow for complete architectural freedom within our design philosophy.' },
  { q: 'How is data security handled?', a: 'With the utmost discretion. Our infrastructure is private, segregated, and employs cryptographic standards typically reserved for institutional finance.' },
]

// ─────────────────────────────────────────────
// COMPONENTS
// ─────────────────────────────────────────────

function GridLines() {
  return (
    <div className="fixed inset-0 pointer-events-none flex justify-center z-0 opacity-20">
      <div className="w-full max-w-[1600px] h-full flex justify-between px-8 md:px-16">
        <div className="w-px h-full" style={{ backgroundColor: tokens.border }} />
        <div className="w-px h-full hidden md:block" style={{ backgroundColor: tokens.border }} />
        <div className="w-px h-full hidden md:block" style={{ backgroundColor: tokens.border }} />
        <div className="w-px h-full" style={{ backgroundColor: tokens.border }} />
      </div>
    </div>
  )
}

function NoiseOverlay() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-50 opacity-[0.02]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      }}
    />
  )
}

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-[#F9F8F6]/90 backdrop-blur-md border-b" style={{ borderColor: `${tokens.border}1A` }}>
      <div className="max-w-[1600px] mx-auto px-8 md:px-16 h-20 flex items-center justify-between">
        <span className="font-heading text-2xl font-semibold tracking-wider uppercase">
          {PRODUCT_NAME}
        </span>
        <div className="hidden md:flex items-center gap-12">
          {NAV_LINKS.map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-xs uppercase tracking-[0.25em] font-medium transition-colors duration-500 hover:text-[#D4AF37]"
            >
              {link}
            </a>
          ))}
        </div>
        <button className="h-10 px-8 border text-xs uppercase tracking-[0.2em] font-medium transition-colors duration-500 hover:bg-[#1A1A1A] hover:text-white" style={{ borderColor: tokens.border }}>
          Inquire
        </button>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section className="relative min-h-dvh pt-32 pb-20 flex items-center">
      <div className="max-w-[1600px] mx-auto px-8 md:px-16 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

        {/* Text Content: Spans columns 1-7 */}
        <div className="lg:col-span-7 z-10 relative mt-12 lg:mt-0">
          <StaggerContainer>
            <div className="flex items-center gap-4 mb-12">
              <motion.div variants={staggerItem} className="h-px w-12" style={{ backgroundColor: tokens.border }} />
              <motion.span variants={staggerItem} className="text-xs uppercase tracking-[0.3em] font-medium" style={{ color: tokens.mutedForeground }}>
                Volume .01
              </motion.span>
            </div>

            <motion.h1
              variants={staggerItem}
              className="font-heading text-5xl md:text-7xl lg:text-9xl leading-[0.9] tracking-tight mb-12"
            >
              Curated <br />
              <span className="italic font-light">Excellence.</span>
            </motion.h1>

            <motion.p
              variants={staggerItem}
              className="text-lg md:text-xl leading-relaxed max-w-md mb-16"
              style={{ color: tokens.mutedForeground }}
            >
              {DESCRIPTION}
            </motion.p>

            <motion.div variants={staggerItem} className="flex flex-col sm:flex-row gap-6">
              {/* Primary Button with Gold Slide */}
              <button className="group relative h-14 px-10 overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.25)] transition-shadow duration-500" style={{ backgroundColor: tokens.foreground }}>
                <span className="absolute inset-0 bg-[#D4AF37] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]" />
                <span className="relative z-10 text-white text-xs uppercase tracking-[0.2em] font-medium flex items-center gap-3">
                  Discover Edition.01 <ArrowRight className="w-4 h-4" />
                </span>
              </button>
            </motion.div>
          </StaggerContainer>
        </div>

        {/* Visual Content: Spans columns 8-12 */}
        <div className="lg:col-span-5 relative mt-16 lg:mt-0">
          <FadeUp delay={0.4}>
            <div className="relative group">
              {/* Vertical Label */}
              <div className="absolute -left-12 top-1/2 -translate-y-1/2 hidden lg:block rotate-180" style={{ writingMode: 'vertical-rl' }}>
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#6C6863]">Editorial / Vol. 01</span>
              </div>

              {/* Image Placeholder */}
              <div
                className="w-full aspect-[3/4] bg-[#EBE5DE] grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[2000ms] shadow-[0_8px_32px_rgba(0,0,0,0.12)] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.04)]"
                style={{ background: 'linear-gradient(145deg, #EBE5DE, #D6D2CC)' }}
              />
            </div>
          </FadeUp>
        </div>

      </div>
    </section>
  )
}

function Stats() {
  return (
    <section className="py-24 md:py-32 border-t" style={{ borderColor: `${tokens.border}1A`, backgroundColor: tokens.background }}>
      <div className="max-w-[1600px] mx-auto px-8 md:px-16">
        <StaggerContainer>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-16">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={staggerItem}
                className={`flex flex-col ${i % 2 !== 0 ? 'mt-0 md:mt-12' : ''}`} // Asymmetrical staggered layout
              >
                <span className="font-heading text-4xl md:text-5xl mb-4 text-[#D4AF37] italic">{stat.value}</span>
                <span className="text-xs uppercase tracking-[0.2em] font-medium" style={{ color: tokens.foreground }}>{stat.label}</span>
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
    <section id="collection" className="py-24 md:py-32 border-t" style={{ borderColor: `${tokens.border}1A`, backgroundColor: tokens.background }}>
      <div className="max-w-[1600px] mx-auto px-8 md:px-16">

        <FadeUp className="mb-24 md:mb-32">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-xs uppercase tracking-[0.3em] font-medium" style={{ color: tokens.mutedForeground }}>Volume .02</span>
            <div className="h-px w-12" style={{ backgroundColor: tokens.border }} />
          </div>
          <h2 className="font-heading text-5xl md:text-7xl leading-[1.1] max-w-3xl">
            The space between <br />
            <span className="italic font-light text-[#D4AF37]">thought and creation.</span>
          </h2>
        </FadeUp>

        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-start">
            {/* Image Column */}
            <div className="md:col-span-5 md:col-start-2 group relative">
               <div className="absolute -left-12 top-1/2 -translate-y-1/2 hidden lg:block rotate-180" style={{ writingMode: 'vertical-rl' }}>
                 <span className="text-[10px] uppercase tracking-[0.3em] text-[#6C6863]">Atelier / Process</span>
               </div>
               <div
                 className="w-full aspect-[3/4] bg-[#EBE5DE] grayscale group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-[2000ms] ease-out shadow-[0_4px_24px_rgba(0,0,0,0.08)] group-hover:shadow-[0_12px_40px_rgba(0,0,0,0.15)] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.04)]"
                 style={{ background: 'linear-gradient(135deg, #EBE5DE, #D6D2CC)' }}
               />
            </div>

            {/* Features List Column */}
            <div className="md:col-span-4 md:col-start-8 flex flex-col gap-16 md:mt-24">
              {FEATURES.slice(0, 3).map((feature, i) => (
                <motion.div key={feature.title} variants={staggerItem} className="group cursor-default">
                  <h3 className="font-heading text-3xl mb-4 group-hover:text-[#D4AF37] transition-colors duration-700">{feature.title}</h3>
                  <p className="text-base leading-relaxed text-[#6C6863]">
                    {i === 0 && (
                      <span className="float-left text-7xl leading-[0.8] mr-3 font-heading text-[#1A1A1A]">
                        {feature.description.charAt(0)}
                      </span>
                    )}
                    {i === 0 ? feature.description.substring(1) : feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </StaggerContainer>
      </div>
    </section>
  )
}

function ProductDetail() {
  return (
    <section className="py-24 md:py-40 bg-[#1A1A1A] text-white">
      <div className="max-w-[1600px] mx-auto px-8 md:px-16 grid grid-cols-1 md:grid-cols-12 gap-16">
        <div className="md:col-span-8 md:col-start-3">
          <FadeUp>
            <div className="flex items-center justify-center gap-4 mb-16">
              <div className="h-px w-12 bg-white/20" />
              <span className="text-xs uppercase tracking-[0.3em] font-medium text-white/60">Volume .03</span>
              <div className="h-px w-12 bg-white/20" />
            </div>

            <h2 className="font-heading text-4xl md:text-6xl lg:text-7xl leading-tight text-center mb-20">
              The architecture of <br />
              <span className="italic font-light text-[#D4AF37]">absolute focus.</span>
            </h2>

            <div className="text-lg md:text-xl leading-relaxed text-white/70 max-w-2xl mx-auto">
              <p className="mb-8">
                <span className="float-left text-7xl leading-[0.8] mr-4 font-heading text-white">A</span>
                distillation of what matters. We removed the noise, the clutter, and the demands on your attention. What remains is a pristine environment that respects your time and elevates your work.
              </p>
              <p>
                Every interaction has been choreographed to feel effortless. From the tactile feedback of the interface to the slow, deliberate transitions that guide your eye—it is a digital sanctuary.
              </p>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}

function Pricing() {
  return (
    <section id="inquiry" className="py-24 md:py-32" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-[1600px] mx-auto px-8 md:px-16">

        <FadeUp className="mb-24">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-xs uppercase tracking-[0.3em] font-medium" style={{ color: tokens.mutedForeground }}>Volume .04</span>
            <div className="h-px w-12" style={{ backgroundColor: tokens.border }} />
          </div>
          <h2 className="font-heading text-5xl md:text-7xl leading-tight">
            Acquisition <br />
            <span className="italic font-light text-[#D4AF37]">& Access</span>
          </h2>
        </FadeUp>

        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {PRICING.map((tier) => (
              <motion.div
                key={tier.name}
                variants={staggerItem}
                className="group relative pt-12 pb-16 px-8 md:px-12 flex flex-col bg-transparent transition-colors duration-700 hover:bg-[#F9F8F6]/50"
                style={{
                  borderTop: tier.highlighted ? `4px solid ${tokens.accent}` : `1px solid ${tokens.border}`,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
                }}
              >
                <h3 className="font-heading text-3xl mb-4 group-hover:text-[#D4AF37] transition-colors duration-500">{tier.name}</h3>

                <div className="flex items-baseline gap-2 mb-8">
                  <span className="font-heading text-4xl md:text-5xl">{tier.price}</span>
                  {tier.period && <span className="text-xs uppercase tracking-[0.1em]" style={{ color: tokens.mutedForeground }}>/ {tier.period}</span>}
                </div>

                <p className="text-sm mb-12 h-10" style={{ color: tokens.mutedForeground }}>{tier.description}</p>

                <ul className="space-y-6 mb-16 flex-1">
                  {tier.features.map(feature => (
                    <li key={feature} className="flex items-start gap-4 text-sm">
                      <span className="text-[#D4AF37] mt-1 text-[10px]">♦</span>
                      <span style={{ color: tokens.foreground }}>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className="w-full h-12 border text-xs uppercase tracking-[0.2em] font-medium transition-all duration-500"
                  style={{
                    borderColor: tier.highlighted ? 'transparent' : tokens.border,
                    backgroundColor: tier.highlighted ? tokens.foreground : 'transparent',
                    color: tier.highlighted ? tokens.accentForeground : tokens.foreground
                  }}
                >
                  {tier.cta}
                </button>
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
    <section className="py-24 md:py-32 border-t" style={{ borderColor: `${tokens.border}1A`, backgroundColor: tokens.background }}>
      <div className="max-w-[1600px] mx-auto px-8 md:px-16">

        <FadeUp className="mb-24">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-xs uppercase tracking-[0.3em] font-medium" style={{ color: tokens.mutedForeground }}>Volume .05</span>
            <div className="h-px w-12" style={{ backgroundColor: tokens.border }} />
          </div>
          <h2 className="font-heading text-5xl md:text-7xl leading-tight">
            Voices of <br />
            <span className="italic font-light text-[#D4AF37]">distinction.</span>
          </h2>
        </FadeUp>

        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 lg:gap-16">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                variants={staggerItem}
                className={`group relative pl-6 md:pl-8 border-l transition-all duration-700 hover:border-[#D4AF37] ${i === 1 ? 'md:mt-16' : ''} ${i === 2 ? 'md:mt-32' : ''}`}
                style={{ borderColor: `${tokens.border}20` }}
              >
                <div className="flex gap-1 mb-8 transition-transform duration-700 group-hover:scale-110 origin-left">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-current text-[#D4AF37]" strokeWidth={0} />
                  ))}
                </div>

                <p className="font-heading text-2xl md:text-3xl leading-relaxed mb-12 italic text-[#1A1A1A]">
                  "{t.text}"
                </p>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#EBE5DE] grayscale group-hover:grayscale-0 transition-all duration-[1500ms] shadow-[0_2px_8px_rgba(0,0,0,0.1)]" />
                  <div>
                    <p className="text-sm font-medium uppercase tracking-[0.15em] group-hover:text-[#D4AF37] transition-colors duration-500">{t.name}</p>
                    <p className="text-xs text-[#6C6863] mt-1">{t.role}, {t.company}</p>
                  </div>
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
    <section className="py-24 md:py-32 bg-[#1A1A1A] text-white">
      <div className="max-w-[1600px] mx-auto px-8 md:px-16 grid grid-cols-1 md:grid-cols-12 gap-16">

        <div className="md:col-span-5">
          <FadeUp>
            <div className="flex items-center gap-4 mb-8">
              <span className="text-xs uppercase tracking-[0.3em] font-medium text-white/60">Volume .06</span>
              <div className="h-px w-12 bg-white/20" />
            </div>
            <h2 className="font-heading text-5xl md:text-6xl leading-tight">
              Inquiries & <br />
              <span className="italic font-light text-[#D4AF37]">clarifications.</span>
            </h2>
          </FadeUp>
        </div>

        <div className="md:col-span-6 md:col-start-7">
          <div className="space-y-0 border-t border-white/20">
            {FAQ_ITEMS.map((item, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <div className="border-b border-white/20 group">
                  <button
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    aria-expanded={openIndex === i}
                    className="w-full py-8 flex items-center justify-between text-left focus-visible:outline-none focus-visible:text-[#D4AF37]"
                  >
                    <span className={`font-heading text-2xl transition-colors duration-500 ${openIndex === i ? 'text-[#D4AF37]' : 'group-hover:text-[#D4AF37]'}`}>
                      {item.q}
                    </span>
                    <motion.div
                      animate={{ rotate: openIndex === i ? 90 : 0 }}
                      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className={`flex-shrink-0 w-8 h-8 border flex items-center justify-center transition-colors duration-500 ${openIndex === i ? 'border-[#D4AF37] text-[#D4AF37]' : 'border-white/20 text-white/60'}`}
                    >
                      <span className="text-xl leading-none font-light">+</span>
                    </motion.div>
                  </button>
                  <motion.div
                    initial={false}
                    animate={{
                      height: openIndex === i ? 'auto' : 0,
                      opacity: openIndex === i ? 1 : 0,
                      marginBottom: openIndex === i ? 32 : 0
                    }}
                    transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                    style={{ overflow: 'hidden' }}
                  >
                    <p className="text-white/70 leading-relaxed text-lg max-w-xl pr-12">
                      {item.a}
                    </p>
                  </motion.div>
                </div>
              </FadeUp>
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
    setTimeout(() => setStatus('success'), 1500)
  }

  return (
    <section className="py-24 md:py-40" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-[1600px] mx-auto px-8 md:px-16 text-center">
        <FadeUp>
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="h-px w-12" style={{ backgroundColor: tokens.border }} />
            <span className="text-xs uppercase tracking-[0.3em] font-medium" style={{ color: tokens.mutedForeground }}>Volume .07</span>
            <div className="h-px w-12" style={{ backgroundColor: tokens.border }} />
          </div>

          <h2 className="font-heading text-5xl md:text-7xl leading-[0.9] mb-16">
            Join the <br />
            <span className="italic font-light text-[#D4AF37]">inner circle.</span>
          </h2>

          <div className="max-w-md mx-auto">
            {status === 'success' ? (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-heading text-2xl italic text-[#D4AF37]"
              >
                Welcome to the collection.
              </motion.p>
            ) : (
              <form onSubmit={handleSubmit} className="relative group">
                <label htmlFor="email" className="sr-only">Email Address</label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="Your email address"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full bg-transparent border-b border-[#1A1A1A]/20 pb-4 text-center text-lg focus:outline-none focus:border-[#D4AF37] transition-colors duration-500 font-sans placeholder:font-heading placeholder:italic placeholder:text-[#6C6863]"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="absolute right-0 bottom-4 text-xs uppercase tracking-[0.2em] font-medium hover:text-[#D4AF37] transition-colors duration-500 disabled:opacity-50"
                >
                  {status === 'loading' ? 'Sending...' : 'Subscribe'}
                </button>
              </form>
            )}
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

function Footer() {
  const links = {
    Collection: ['Edition.01', 'Edition.02', 'Bespoke', 'Archive'],
    Journal: ['Philosophy', 'Exhibitions', 'Conversations', 'Index'],
    Atelier: ['About', 'Careers', 'Press', 'Contact'],
    Legal: ['Privacy', 'Terms', 'Cookies'],
  }

  return (
    <footer className="py-24 md:py-32 border-t" style={{ borderColor: `${tokens.border}1A`, backgroundColor: tokens.background }}>
      <div className="max-w-[1600px] mx-auto px-8 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8 mb-32">

          <div className="md:col-span-4">
            <span className="font-heading text-4xl mb-8 block uppercase tracking-wider">{PRODUCT_NAME}</span>
            <p className="text-[#6C6863] text-sm leading-relaxed max-w-xs mb-8">
              Curating exceptional digital experiences for those who demand excellence in every interaction.
            </p>
            <div className="text-[10px] uppercase tracking-[0.3em] font-medium text-[#1A1A1A]">
              Paris — New York — Tokyo
            </div>
          </div>

          <div className="md:col-span-7 md:col-start-6 grid grid-cols-2 sm:grid-cols-4 gap-12">
            {Object.entries(links).map(([group, items]) => (
              <div key={group}>
                <p className="text-[10px] uppercase tracking-[0.3em] font-bold mb-8 text-[#1A1A1A]">{group}</p>
                <ul className="space-y-4">
                  {items.map(item => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-sm text-[#6C6863] transition-colors duration-500 hover:text-[#D4AF37]"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t" style={{ borderColor: `${tokens.border}1A` }}>
          <p className="text-xs uppercase tracking-[0.2em] text-[#6C6863] mb-4 md:mb-0">
            © {new Date().getFullYear()} {PRODUCT_NAME}. All rights reserved.
          </p>
          <a
            href="/"
            className="text-[10px] uppercase tracking-[0.3em] transition-colors duration-500 hover:text-[#D4AF37]"
          >
            Return to Index
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
    <div className={`${playfair.variable} ${inter.variable} font-sans min-h-dvh relative selection:bg-[#D4AF37] selection:text-white`} style={{ backgroundColor: tokens.background, color: tokens.foreground }}>
      <NoiseOverlay />
      <GridLines />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <Stats />
        <Features />
        <ProductDetail />
        <Pricing />
        <Testimonials />
        <FAQ />
        <Newsletter />
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  )
}
