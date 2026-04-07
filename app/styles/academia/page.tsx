'use client'

import { motion, useReducedMotion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Cormorant_Garamond, Crimson_Pro, Cinzel } from 'next/font/google'
import {
  BookOpen, Feather, Library, ScrollText, Landmark, Search,
  ChevronDown, ArrowRight, Shield, Award, Users, Star
} from 'lucide-react'

// ─────────────────────────────────────────────
// FONTS
// ─────────────────────────────────────────────
const headingFont = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-heading',
  display: 'swap',
})

const bodyFont = Crimson_Pro({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-body',
  display: 'swap',
})

const displayFont = Cinzel({
  subsets: ['latin'],
  weight: ['500', '600'],
  variable: '--font-display',
  display: 'swap',
})

// ─────────────────────────────────────────────
// DESIGN TOKENS
// ─────────────────────────────────────────────
const tokens = {
  background: '#1C1714', // Deep Mahogany
  backgroundAlt: '#251E19', // Aged Oak
  foreground: '#E8DFD4', // Antique Parchment
  muted: '#3D332B', // Worn Leather
  mutedForeground: '#9C8B7A', // Faded Ink
  border: '#4A3F35', // Wood Grain
  accent: '#C9A962', // Polished Brass
  accentSecondary: '#8B2635', // Library Crimson
  accentForeground: '#1C1714', // Dark on Brass
}

// ─────────────────────────────────────────────
// UTILS & EFFECTS
// ─────────────────────────────────────────────
const archTopStyle = {
  borderRadius: '40% 40% 0 0 / 20% 20% 0 0'
}

const engravedTextEffect = {
  textShadow: '1px 1px 1px rgba(0,0,0,0.4), -1px -1px 1px rgba(255,255,255,0.1)'
}

const brassGradient = 'linear-gradient(180deg, #D4B872 0%, #C9A962 50%, #B8953F 100%)'

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
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
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
        visible: { transition: { staggerChildren: 0.08 } },
      }}
      className={className}
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
// DECORATIVE COMPONENTS
// ─────────────────────────────────────────────
const OrnateDivider = () => (
  <div className="relative w-64 mx-auto my-12 h-px flex items-center justify-center">
    <div className="absolute inset-0" style={{ background: `linear-gradient(90deg, transparent 0%, ${tokens.border} 20%, ${tokens.accent} 50%, ${tokens.border} 80%, transparent 100%)` }} />
    <div className="absolute bg-[#1C1714] px-3 text-[12px]" style={{ color: tokens.accent }}>
      ❧
    </div>
  </div>
)

const CornerFlourish = ({ size = 24, thickness = 2 }) => (
  <>
    <div className="absolute top-0 left-0 transition-opacity duration-300 opacity-60 group-hover:opacity-100 pointer-events-none" style={{ width: size, height: size, borderTop: `${thickness}px solid ${tokens.accent}`, borderLeft: `${thickness}px solid ${tokens.accent}`, borderTopLeftRadius: '2px' }} />
    <div className="absolute bottom-0 right-0 transition-opacity duration-300 opacity-60 group-hover:opacity-100 pointer-events-none" style={{ width: size, height: size, borderBottom: `${thickness}px solid ${tokens.accent}`, borderRight: `${thickness}px solid ${tokens.accent}`, borderBottomRightRadius: '2px' }} />
  </>
)

const VolumeLabel = ({ number, title }: { number: string; title?: string }) => (
  <div className="flex flex-col items-center mb-8">
    <p className={`text-xs uppercase tracking-[0.25em] mb-2 ${displayFont.className}`} style={{ color: tokens.accent }}>
      Volume {number}
    </p>
    {title && (
      <h2 className={`text-4xl md:text-5xl tracking-tight leading-[1.1] text-center ${headingFont.className}`} style={{ color: tokens.foreground }}>
        {title}
      </h2>
    )}
  </div>
)

const WaxSeal = () => (
  <div className="absolute -top-3 right-6 w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
       style={{
         background: 'radial-gradient(circle at 30% 30%, #a82e40 0%, #8B2635 60%, #5a1822 100%)',
         boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.2), inset 0 -2px 4px rgba(0,0,0,0.3), 0 4px 8px rgba(0,0,0,0.4)',
         border: '1px solid #a82e40'
       }}>
    <Star className="w-5 h-5 text-[#E8DFD4] opacity-80" fill="currentColor" />
  </div>
)

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────
const PRODUCT_NAME = 'Lumina Lexicon'
const TAGLINE = 'Where Knowledge Meets Antiquity'
const DESCRIPTION = 'A distinguished digital repository curated for the pursuit of higher learning. We bridge the timeless traditions of classical academia with the frontier of modern research.'

const NAV_LINKS = ['Collections', 'Fellowships', 'Testimonials', 'Inquiries']

const STATS = [
  { value: 'XII', label: 'Centuries of Archives' },
  { value: 'IV', label: 'Million Volumes' },
  { value: 'C', label: 'Esteemed Scholars' },
  { value: 'X', label: 'Global Campuses' },
]

const FEATURES = [
  { icon: ScrollText, title: 'Archival Manuscripts', description: 'Access digitized manuscripts dating back to the Renaissance, meticulously restored.' },
  { icon: Landmark, title: 'Classical Architecture', description: 'A structured environment designed to foster contemplation and deep intellectual focus.' },
  { icon: BookOpen, title: 'Curated Curricula', description: 'Structured learning paths crafted by leading academics across fifty disciplines.' },
  { icon: Feather, title: 'Scholarly Discourse', description: 'Engage in rigorous peer review and debate with verified academic professionals.' },
  { icon: Library, title: 'The Great Halls', description: 'Navigate our vast taxonomy of knowledge through an intuitive, dignified interface.' },
  { icon: Search, title: 'Antiquarian Search', description: 'Advanced semantic indexing that comprehends classical Latin and Greek texts.' },
]

const PRICING = [
  {
    name: 'Reader',
    price: 'Complimentary',
    period: 'perpetual',
    description: 'For the casual observer of the humanities.',
    features: ['Access to public archives', 'Monthly gazette', 'Standard reading rooms'],
    cta: 'Register',
    highlighted: false,
  },
  {
    name: 'Scholar',
    price: 'XXV',
    period: 'per mensem',
    description: 'For the dedicated academic researcher.',
    features: ['Full archival access', 'Annotation tools', 'Private study carrels', 'Priority publication'],
    cta: 'Matriculate',
    highlighted: true,
  },
  {
    name: 'Fellow',
    price: 'C',
    period: 'per mensem',
    description: 'For tenured professors and institutions.',
    features: ['Everything in Scholar', 'Directorial privileges', 'Special collections access', 'Dedicated archivist'],
    cta: 'Inquire',
    highlighted: false,
  },
]

const TESTIMONIALS = [
  {
    name: 'Dr. Eleanor Vance',
    role: 'Professor of Antiquities',
    company: 'Oxford University',
    text: 'A profound resource. It perfectly balances the gravity of physical archives with the swiftness of digital retrieval.',
  },
  {
    name: 'Prof. Julian Morrow',
    role: 'Dean of Humanities',
    company: 'Hampden College',
    text: 'The most dignified digital environment I have encountered. It respects the text and the reader alike.',
  },
  {
    name: 'Arthur Pendelton',
    role: 'Head Archivist',
    company: 'The Royal Society',
    text: 'Impeccable curation. The attention to typographical detail makes extended reading an absolute pleasure.',
  },
]

const FAQ_ITEMS = [
  { q: 'How does one gain admittance?', a: 'Admittance is open to all seekers of knowledge. Simply register your credentials at the primary desk to begin your journey.' },
  { q: 'Are physical tomes available?', a: 'While our primary interface is digital, we maintain partnerships with several prestigious physical libraries for inter-library loans.' },
  { q: 'Is the archive peer-reviewed?', a: 'Indubitably. All contemporary additions are subject to a rigorous blind review by our board of fellows.' },
  { q: 'What is the policy on dissemination?', a: 'We encourage the sharing of knowledge. Scholars may excerpt and cite texts under standard academic fair use guidelines.' },
]

// ─────────────────────────────────────────────
// COMPONENTS
// ─────────────────────────────────────────────

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b transition-colors duration-500" style={{ backgroundColor: `${tokens.background}f0`, borderColor: tokens.border, backdropFilter: 'blur(8px)' }}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <span className={`font-medium text-2xl tracking-wide ${headingFont.className}`} style={{ color: tokens.accent }}>
          {PRODUCT_NAME}
        </span>
        <div className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className={`text-xs uppercase tracking-[0.2em] transition-all duration-300 ${displayFont.className}`}
              style={{ color: tokens.foreground }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = tokens.accent;
                e.currentTarget.style.letterSpacing = '0.25em';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = tokens.foreground;
                e.currentTarget.style.letterSpacing = '0.2em';
              }}
            >
              {link}
            </a>
          ))}
        </div>
        <motion.button
          whileHover={{ filter: 'brightness(1.1)', boxShadow: '0 4px 12px rgba(201,169,98,0.3)' }}
          whileTap={{ boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.5)' }}
          className={`h-10 px-6 rounded text-xs uppercase tracking-[0.15em] transition-all duration-150 ${displayFont.className}`}
          style={{
            background: brassGradient,
            color: tokens.accentForeground,
            ...engravedTextEffect,
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(0,0,0,0.2), 0 2px 8px rgba(0,0,0,0.3)'
          }}
        >
          Admittance
        </motion.button>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section className="min-h-screen pt-32 pb-24 relative flex flex-col md:flex-row items-center justify-center max-w-7xl mx-auto px-6 gap-12">
      {/* Decorative Frame for Hero Content */}
      <div className="absolute inset-6 md:inset-12 border pointer-events-none z-0 hidden md:block" style={{ borderColor: tokens.border }}>
         <CornerFlourish size={40} thickness={2} />
      </div>

      <div className="w-full md:w-5/12 flex flex-col justify-center relative z-10">
        <FadeUp>
          <p className={`text-xs uppercase tracking-[0.3em] mb-6 ${displayFont.className}`} style={{ color: tokens.accent }}>
            Volume I
          </p>
          <h1 className={`text-5xl md:text-7xl leading-[1.05] tracking-tight mb-8 ${headingFont.className}`} style={{ color: tokens.foreground }}>
            {TAGLINE}
          </h1>
          <p className="text-lg leading-relaxed mb-10" style={{ color: tokens.mutedForeground }}>
            {DESCRIPTION}
          </p>
          <div className="flex flex-col sm:flex-row gap-6">
            <motion.button
              whileHover={{ filter: 'brightness(1.1)', boxShadow: '0 4px 12px rgba(201,169,98,0.3)' }}
              whileTap={{ boxShadow: 'inset 0 4px 8px rgba(0,0,0,0.5)' }}
              className={`h-12 px-8 rounded text-xs uppercase tracking-[0.15em] transition-all duration-150 ${displayFont.className}`}
              style={{
                background: brassGradient,
                color: tokens.accentForeground,
                ...engravedTextEffect,
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(0,0,0,0.2), 0 2px 8px rgba(0,0,0,0.3)'
              }}
            >
              Enter Archives
            </motion.button>
            <motion.button
              className={`h-12 px-8 rounded border-2 text-xs uppercase tracking-[0.15em] transition-all duration-300 ${displayFont.className}`}
              style={{ borderColor: tokens.accent, color: tokens.accent }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = tokens.accentSecondary;
                e.currentTarget.style.borderColor = tokens.accentSecondary;
                e.currentTarget.style.color = tokens.foreground;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.borderColor = tokens.accent;
                e.currentTarget.style.color = tokens.accent;
              }}
            >
              Peruse Catalog
            </motion.button>
          </div>
        </FadeUp>
      </div>

      <div className="w-full md:w-5/12 flex justify-center relative z-10 mt-12 md:mt-0">
        <FadeUp delay={0.2} className="w-full max-w-sm">
          <div className="relative group p-3" style={{ border: `1px solid ${tokens.border}` }}>
            <div className="overflow-hidden relative bg-[#251E19]" style={archTopStyle}>
              {/* Image Placeholder with Sepia Effect */}
              <div
                className="w-full aspect-[3/4] bg-cover bg-center transition-all duration-700 ease-out group-hover:scale-105"
                style={{
                  backgroundImage: 'url("https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1000&auto=format&fit=crop")',
                  filter: 'sepia(0.6) contrast(0.95) brightness(0.9)'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.filter = 'sepia(0) contrast(1) brightness(1)' }}
                onMouseLeave={(e) => { e.currentTarget.style.filter = 'sepia(0.6) contrast(0.95) brightness(0.9)' }}
              />
              <div className="absolute inset-0 border-2 pointer-events-none" style={{ borderColor: `${tokens.accent}30`, ...archTopStyle }} />
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

function Stats() {
  return (
    <section className="py-24 relative" style={{ backgroundColor: tokens.backgroundAlt }}>
      <div className="absolute top-0 left-0 right-0 border-t" style={{ borderColor: tokens.border }} />
      <div className="absolute bottom-0 left-0 right-0 border-b" style={{ borderColor: tokens.border }} />

      <div className="max-w-6xl mx-auto px-6">
        <FadeUp>
          <VolumeLabel number="II" />
        </FadeUp>
        <StaggerContainer>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x" style={{ borderColor: `${tokens.border}80` }}>
            {STATS.map(stat => (
              <motion.div
                key={stat.label}
                variants={staggerItem}
                className="text-center py-6 px-4 group transition-all duration-300"
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(28,23,20,0.5)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent'
                }}
              >
                <p className={`text-4xl md:text-5xl mb-3 transition-transform duration-500 group-hover:scale-[1.05] ${headingFont.className}`} style={{ color: tokens.foreground }}>
                  {stat.value}
                </p>
                <p className={`text-xs uppercase tracking-[0.2em] transition-colors duration-500 ${displayFont.className}`} style={{ color: tokens.mutedForeground }}>
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
    <section id="collections" className="py-32 relative">
      <div className="max-w-6xl mx-auto px-6">
        <FadeUp>
          <VolumeLabel number="III" title="The Archives" />
          <OrnateDivider />
        </FadeUp>
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {FEATURES.map((feature, i) => (
              <motion.div
                key={feature.title}
                variants={staggerItem}
                className="group relative p-10 rounded transition-all duration-300 ease-out"
                style={{ backgroundColor: tokens.backgroundAlt, border: `1px solid ${tokens.border}` }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${tokens.accent}80`;
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = tokens.border;
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <CornerFlourish size={20} thickness={1} />

                <div className="mb-6 w-12 h-12 rounded-full border flex items-center justify-center bg-[#1C1714] transition-colors duration-300 group-hover:border-[#C9A962]" style={{ borderColor: `${tokens.accent}40` }}>
                  <feature.icon className="h-5 w-5" style={{ color: tokens.accent }} strokeWidth={1.5} />
                </div>

                <h3 className={`text-2xl mb-4 ${headingFont.className}`} style={{ color: tokens.foreground }}>
                  {feature.title}
                </h3>
                <p className="text-base leading-relaxed" style={{ color: tokens.mutedForeground }}>
                  {feature.description}
                </p>
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
    <section className="py-32 relative">
      <div className="max-w-4xl mx-auto px-6">
        <FadeUp>
          <VolumeLabel number="IV" title="A Proclamation" />
          <OrnateDivider />
        </FadeUp>

        <FadeUp delay={0.2}>
          <div className="relative p-12 mt-12 rounded text-center" style={{ backgroundColor: 'rgba(37,30,25,0.5)', border: `1px solid ${tokens.border}` }}>
            <CornerFlourish size={32} thickness={1} />

            <div className="space-y-6 text-lg leading-[1.7] text-left">
              <p style={{ color: tokens.mutedForeground }}>
                <span className={`float-left mr-4 leading-[0.8] text-7xl mt-2 ${displayFont.className}`} style={{ color: tokens.accent, textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
                  I
                </span>
                n an age characterized by fleeting information and ephemeral discourse, the Lumina Lexicon stands as a bastion of permanence. We have meticulously assembled the greatest philosophical, scientific, and literary works known to civilization, presenting them within an environment that honors their gravity.
              </p>
              <p style={{ color: tokens.mutedForeground }}>
                Every pixel, every typographic choice, every interaction has been engineered not merely for efficiency, but for reverence. Here, reading is not consumption; it is a profound communion with the minds that shaped our history. Step into the digital halls, where the light of knowledge never dims.
              </p>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

function Pricing() {
  return (
    <section id="fellowships" className="py-32 relative" style={{ backgroundColor: tokens.backgroundAlt }}>
      <div className="absolute top-0 left-0 right-0 border-t" style={{ borderColor: tokens.border }} />
      <div className="absolute bottom-0 left-0 right-0 border-b" style={{ borderColor: tokens.border }} />

      <div className="max-w-6xl mx-auto px-6">
        <FadeUp>
          <VolumeLabel number="V" title="Admittance & Fellowships" />
          <OrnateDivider />
        </FadeUp>

        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {PRICING.map((tier) => (
              <motion.div
                key={tier.name}
                variants={staggerItem}
                className="relative p-10 rounded transition-all duration-300"
                style={{
                  backgroundColor: tokens.background,
                  border: tier.highlighted ? `2px solid ${tokens.accent}` : `1px solid ${tokens.border}`,
                  boxShadow: tier.highlighted ? `inset 0 0 0 4px ${tokens.backgroundAlt}, 0 8px 32px rgba(0,0,0,0.3)` : 'none'
                }}
              >
                {tier.highlighted && <WaxSeal />}
                {tier.highlighted && <CornerFlourish size={24} thickness={2} />}

                <div className="text-center mb-8 pb-8 border-b" style={{ borderColor: tokens.border }}>
                  <h3 className={`text-2xl mb-4 ${headingFont.className}`} style={{ color: tokens.foreground }}>
                    {tier.name}
                  </h3>
                  <div className="flex justify-center items-baseline gap-2 mb-4">
                    <span className={`text-4xl ${headingFont.className}`} style={{ color: tokens.foreground }}>{tier.price}</span>
                  </div>
                  <p className={`text-xs uppercase tracking-[0.2em] ${displayFont.className}`} style={{ color: tokens.accent }}>
                    {tier.period}
                  </p>
                </div>

                <p className="text-base mb-8 text-center" style={{ color: tokens.mutedForeground }}>
                  {tier.description}
                </p>

                <ul className="space-y-4 mb-10">
                  {tier.features.map(f => (
                    <li key={f} className="flex items-start gap-3">
                      <span className="text-[10px] mt-1.5" style={{ color: tokens.accent }}>❧</span>
                      <span className="text-sm" style={{ color: tokens.foreground }}>{f}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full h-12 rounded text-xs uppercase tracking-[0.15em] transition-all duration-150 ${displayFont.className}`}
                  style={{
                    background: tier.highlighted ? brassGradient : 'transparent',
                    border: tier.highlighted ? 'none' : `1px solid ${tokens.accent}`,
                    color: tier.highlighted ? tokens.accentForeground : tokens.accent,
                    ...(tier.highlighted ? engravedTextEffect : {}),
                    boxShadow: tier.highlighted ? 'inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(0,0,0,0.2), 0 2px 8px rgba(0,0,0,0.3)' : 'none'
                  }}
                  onMouseEnter={(e) => {
                    if(tier.highlighted) {
                      e.currentTarget.style.filter = 'brightness(1.1)';
                    } else {
                      e.currentTarget.style.backgroundColor = tokens.accentSecondary;
                      e.currentTarget.style.borderColor = tokens.accentSecondary;
                      e.currentTarget.style.color = tokens.foreground;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if(tier.highlighted) {
                      e.currentTarget.style.filter = 'brightness(1)';
                    } else {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.borderColor = tokens.accent;
                      e.currentTarget.style.color = tokens.accent;
                    }
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
    <section id="testimonials" className="py-32 relative">
      <div className="max-w-6xl mx-auto px-6">
        <FadeUp>
          <VolumeLabel number="VI" title="Distinguished Patrons" />
          <OrnateDivider />
        </FadeUp>

        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {TESTIMONIALS.map(t => (
              <motion.div
                key={t.name}
                variants={staggerItem}
                className="p-10 rounded relative text-center"
                style={{ backgroundColor: tokens.backgroundAlt, border: `1px solid ${tokens.border}` }}
              >
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#1C1714] px-4" style={{ color: tokens.accent }}>
                  ❧
                </div>
                <p className={`text-xl leading-relaxed mb-8 italic ${headingFont.className}`} style={{ color: tokens.foreground }}>
                  &ldquo;{t.text}&rdquo;
                </p>
                <div>
                  <p className={`text-sm uppercase tracking-widest mb-1 ${displayFont.className}`} style={{ color: tokens.foreground }}>
                    {t.name}
                  </p>
                  <p className="text-xs" style={{ color: tokens.mutedForeground }}>
                    {t.role}, {t.company}
                  </p>
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

  const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI'];

  return (
    <section id="inquiries" className="py-32 relative" style={{ backgroundColor: tokens.backgroundAlt }}>
      <div className="absolute top-0 left-0 right-0 border-t" style={{ borderColor: tokens.border }} />
      <div className="max-w-3xl mx-auto px-6">
        <FadeUp>
          <VolumeLabel number="VII" title="Common Inquiries" />
          <OrnateDivider />
        </FadeUp>

        <div className="mt-16 space-y-4">
          {FAQ_ITEMS.map((item, i) => (
            <FadeUp key={i} delay={i * 0.1}>
              <div
                className="rounded overflow-hidden transition-colors duration-300"
                style={{ border: `1px solid ${tokens.border}`, backgroundColor: tokens.background }}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                  style={{ '--tw-ring-color': tokens.accent, '--tw-ring-offset-color': tokens.background } as any}
                >
                  <div className="flex items-center gap-6">
                    <span className={`text-lg w-8 ${displayFont.className}`} style={{ color: tokens.accent }}>
                      {romanNumerals[i]}.
                    </span>
                    <span className={`text-xl ${headingFont.className}`} style={{ color: tokens.foreground }}>
                      {item.q}
                    </span>
                  </div>
                  <motion.div
                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="h-5 w-5" style={{ color: tokens.accent }} />
                  </motion.div>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openIndex === i ? 'auto' : 0, opacity: openIndex === i ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  style={{ overflow: 'hidden' }}
                >
                  <div className="px-6 pb-6 pt-2 md:ml-14 ml-0">
                    <p className="text-base leading-relaxed" style={{ color: tokens.mutedForeground }}>
                      {item.a}
                    </p>
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
    <section className="py-32 relative">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <FadeUp>
          <VolumeLabel number="VIII" title="The Society Gazette" />
          <p className="text-lg mb-10" style={{ color: tokens.mutedForeground }}>
            Subscribe to receive our periodic dispatches concerning new acquisitions, scholarly debates, and forthcoming exhibitions.
          </p>

          {status === 'success' ? (
            <p className={`text-xl italic ${headingFont.className}`} style={{ color: tokens.accent }}>
              Your missive has been received. Welcome to the society.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <label htmlFor="newsletter-email" className="sr-only">Email address</label>
              <input
                id="newsletter-email"
                type="email"
                required
                placeholder="Enter your correspondence address..."
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full sm:w-96 h-12 px-4 rounded bg-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
                style={{
                  border: `1px solid ${tokens.border}`,
                  color: tokens.foreground,
                  backgroundColor: tokens.backgroundAlt,
                  '--tw-ring-color': `${tokens.accent}80`,
                  '--tw-ring-offset-color': tokens.background
                } as any}
              />
              <motion.button
                type="submit"
                disabled={status === 'loading'}
                whileHover={{ filter: 'brightness(1.1)' }}
                whileTap={{ boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.5)' }}
                className={`h-12 px-8 rounded text-xs uppercase tracking-[0.15em] transition-all duration-150 disabled:opacity-60 whitespace-nowrap w-full sm:w-auto ${displayFont.className}`}
                style={{
                  background: brassGradient,
                  color: tokens.accentForeground,
                  ...engravedTextEffect,
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(0,0,0,0.2), 0 2px 8px rgba(0,0,0,0.3)'
                }}
              >
                {status === 'loading' ? 'Sealing...' : 'Subscribe'}
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
    Library: ['Archives', 'Collections', 'Rare Books', 'Manuscripts'],
    Institution: ['About', 'Fellows', 'Careers', 'Endowment'],
    Resources: ['Citations', 'API', 'Guidelines', 'Help Desk'],
    Legal: ['Privacy', 'Terms', 'Copyright', 'Security'],
  }

  return (
    <footer className="py-20 relative border-t" style={{ backgroundColor: tokens.background, borderColor: tokens.border }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-12 mb-16">
          <div className="col-span-2">
            <span className={`font-medium text-2xl tracking-wide mb-6 block ${headingFont.className}`} style={{ color: tokens.accent }}>
              {PRODUCT_NAME}
            </span>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: tokens.mutedForeground }}>
              Preserving the intellect of yesteryear for the scholars of tomorrow.
            </p>
          </div>
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <p className={`text-xs uppercase tracking-[0.2em] mb-6 ${displayFont.className}`} style={{ color: tokens.foreground }}>
                {group}
              </p>
              <ul className="space-y-4">
                {items.map(item => (
                  <li key={item}>
                    <a href="#" className="text-sm transition-colors hover:text-[#C9A962]" style={{ color: tokens.mutedForeground }}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t" style={{ borderColor: tokens.border }}>
          <p className={`text-xs uppercase tracking-widest ${displayFont.className}`} style={{ color: tokens.mutedForeground }}>
            © MMXXVI {PRODUCT_NAME}. All rights reserved.
          </p>
          <a
            href="/"
            className={`text-xs uppercase tracking-[0.2em] transition-colors mt-4 md:mt-0 ${displayFont.className}`}
            style={{ color: tokens.accent }}
            onMouseEnter={(e) => e.currentTarget.style.color = tokens.foreground}
            onMouseLeave={(e) => e.currentTarget.style.color = tokens.accent}
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
export default function AcademiaPage() {
  return (
    <div className={`min-h-screen relative ${bodyFont.className}`} style={{ backgroundColor: tokens.background }}>
      {/* Texture Overlays */}
      <div
        className="fixed inset-0 pointer-events-none mix-blend-overlay z-0"
        style={{
          opacity: 0.03,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, transparent 50%, rgba(28,23,20,0.4) 100%)'
        }}
      />

      <div className="relative z-10 selection:bg-[#C9A962] selection:text-[#1C1714]">
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
