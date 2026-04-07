'use client'

import { motion, useReducedMotion, useInView, useScroll, useTransform, useSpring } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Montserrat, Open_Sans } from 'next/font/google'
import {
  Heart, ChevronDown, ArrowRight, Check, MapPin,
  Search, Calendar, FileText, Home, Shield, Dog, Users
} from 'lucide-react'

// ─────────────────────────────────────────────
// FONTS
// ─────────────────────────────────────────────
const primaryFont = Montserrat({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-primary',
  display: 'swap',
})

const secondaryFont = Open_Sans({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-secondary',
  display: 'swap',
})

// ─────────────────────────────────────────────
// DESIGN TOKENS
// ─────────────────────────────────────────────
const tokens = {
  background: '#FFFFFF',
  backgroundAlt: '#F9F9F9',
  surface: '#FFFFFF',
  foreground: '#2D3436',
  muted: '#F1F2F6',
  mutedForeground: '#B2BEC3',
  border: '#DFE6E9',
  accent1: '#6C5CE7',
  accent2: '#00B894',
}

// ─────────────────────────────────────────────
// MOTION HELPERS
// ─────────────────────────────────────────────
function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number, className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-5% 0px' })
  const shouldReduce = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      initial={shouldReduce ? false : { opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ type: "spring", stiffness: 200, damping: 15, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function StaggerTension({ children }: { children: React.ReactNode }) {
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
        visible: { transition: { staggerChildren: 0.1 } },
      }}
    >
      {children}
    </motion.div>
  )
}

const staggerItem: import('framer-motion').Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 200, damping: 10 }
  },
}

function LeashPullButton({ children, onClick, className, primary = true }: { children: React.ReactNode, onClick?: () => void, className?: string, primary?: boolean }) {
    return (
        <motion.button
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ y: 2, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className={`px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors border-b-4 ${className}`}
            style={primary ? {
                backgroundColor: tokens.accent1,
                color: '#FFFFFF',
                borderColor: '#5446C1'
            } : {
                backgroundColor: tokens.surface,
                color: tokens.foreground,
                borderColor: tokens.border,
                borderTopWidth: '1px',
                borderLeftWidth: '1px',
                borderRightWidth: '1px',
            }}
            onClick={onClick}
        >
            {children}
        </motion.button>
    )
}

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────
const PRODUCT_NAME = 'AdoptFlow'
const TAGLINE = 'The Journey Home, Simplified.'
const DESCRIPTION = 'A clear, step-by-step pathway to bringing your new best friend home. We guide you from the first click to the final cuddle.'

const NAV_LINKS = ['Find a Pet', 'How it Works', 'Success Stories', 'FAQ']

const STATS = [
  { value: '12K+', label: 'Adoptions' },
  { value: '48h', label: 'Avg Process' },
  { value: '99%', label: 'Match Rate' },
  { value: '500+', label: 'Shelters' },
]

const FEATURES = [
  { icon: Search, title: 'Smart Matching', description: 'Our algorithm finds pets that perfectly fit your lifestyle, living situation, and experience.' },
  { icon: Calendar, title: 'Easy Scheduling', description: 'Book meet-and-greets instantly without endless back-and-forth emails.' },
  { icon: FileText, title: 'Paperless Process', description: 'Complete all applications and agreements digitally in one secure place.' },
  { icon: Home, title: 'Home Checks', description: 'Guided virtual home checks make ensuring a safe environment quick and painless.' },
  { icon: Shield, title: 'Vetted Shelters', description: 'We only partner with ethical, verified shelters and rescues.' },
  { icon: Dog, title: 'Post-Adoption Support', description: 'Access a library of training resources and 24/7 vet chat for the first month.' },
]

const PRICING = [
  {
    name: 'Basic Match',
    price: '$0',
    period: 'to browse',
    description: 'Start your journey and see who is waiting for you.',
    features: ['Browse available pets', 'Save favorites', 'Basic matching quiz'],
    cta: 'Start Browsing',
    highlighted: false,
  },
  {
    name: 'Fast Track',
    price: '$49',
    period: 'application fee',
    description: 'Everything you need to complete the adoption process smoothly.',
    features: ['Priority application review', 'Digital document signing', 'Instant scheduling', 'Virtual home check'],
    cta: 'Apply Now',
    highlighted: true,
  },
  {
    name: 'VIP Welcome',
    price: '$149',
    period: 'includes adoption',
    description: 'The ultimate welcome home package for your new family member.',
    features: ['Everything in Fast Track', '1 month free vet chat', 'Starter kit delivery', 'Personalized training plan', 'Adoption fee included'],
    cta: 'Get the Package',
    highlighted: false,
  },
]

const TESTIMONIALS = [
  {
    name: 'Jessica T.',
    role: 'Adopted Max',
    company: 'Golden Retriever',
    text: 'I was dreading the paperwork, but AdoptFlow made it feel like a breeze. The progress tracker kept me sane!',
    rating: 5,
  },
  {
    name: 'Mark & Luis',
    role: 'Adopted Bella & Luna',
    company: 'Bonded Pair',
    text: 'The communication with the shelter through the app was so fast. We brought our girls home three days after applying.',
    rating: 5,
  },
  {
    name: 'Sarah K.',
    role: 'Adopted Oliver',
    company: 'Tabby Cat',
    text: 'I loved the smart matching. It connected me with a cat I might have scrolled past, but he is the absolute perfect fit for my apartment.',
    rating: 5,
  },
]

const FAQ_ITEMS = [
  { q: 'How long does the adoption process take?', a: 'With AdoptFlow, the average time from application to bringing your pet home is 48 hours, significantly faster than traditional methods.' },
  { q: 'Is the application fee refundable?', a: 'If your application is denied by the shelter, your fee is 100% refunded. If you choose to back out, it is held as a credit for future applications.' },
  { q: 'How do virtual home checks work?', a: 'You simply record a short, guided video tour of your home using our app, highlighting areas like the yard, living space, and potential hazards.' },
  { q: 'Do you cover adoption fees?', a: 'Our VIP Welcome package includes the standard shelter adoption fee. For other tiers, the adoption fee is paid directly to the shelter.' },
  { q: 'What if it’s not a good fit?', a: 'We have a 30-day "grace period." If it’s truly not working out, we help coordinate a safe return to the shelter and offer support during the process.' },
  { q: 'Are the pets vaccinated and spayed/neutered?', a: 'Yes, all our partner shelters ensure pets are up-to-date on age-appropriate vaccines and are spayed/neutered before going home.' },
]

// ─────────────────────────────────────────────
// COMPONENTS
// ─────────────────────────────────────────────

function Navbar() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 border-b"
      style={{ borderColor: tokens.border, backgroundColor: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(8px)' }}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
            <Heart className="h-6 w-6" style={{ color: tokens.accent1 }} fill={tokens.accent1} />
            <span className="font-bold text-xl tracking-tight" style={{ color: tokens.foreground }}>
            {PRODUCT_NAME}
            </span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-sm font-medium transition-colors hover:opacity-70"
              style={{ color: tokens.foreground }}
            >
              {link}
            </a>
          ))}
        </div>
        <LeashPullButton className="px-6 py-2 text-sm">
          Get Started
        </LeashPullButton>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section className="min-h-dvh flex items-center pt-20 relative overflow-hidden" style={{ backgroundColor: tokens.background }}>
      {/* Abstract path background */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
         <svg width="100%" height="100%" viewBox="0 0 1000 1000" preserveAspectRatio="none">
             <motion.path
                d="M 0 500 C 200 400, 300 800, 500 500 C 700 200, 800 600, 1000 500"
                stroke={tokens.accent1}
                strokeWidth="4"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 3, ease: [0.42, 0, 0.58, 1] }}
             />
         </svg>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-24 w-full relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl flex flex-col items-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="px-4 py-1.5 rounded-full text-sm font-bold tracking-wide uppercase mb-6 flex items-center gap-2"
            style={{ backgroundColor: `${tokens.accent2}15`, color: tokens.accent2 }}
          >
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: tokens.accent2 }} />
            Over 12,000 Happy Tails
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold leading-[1.1] mb-6 tracking-tight"
            style={{ color: tokens.foreground }}
          >
            {TAGLINE}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
            className="text-lg md:text-xl mb-10 max-w-2xl leading-relaxed"
            style={{ color: tokens.mutedForeground }}
          >
            {DESCRIPTION}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <LeashPullButton>
              Start the Journey <ArrowRight className="h-5 w-5" />
            </LeashPullButton>
            <LeashPullButton primary={false}>
              Browse Pets
            </LeashPullButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function AdoptionJourneyMap() {
    const ref = useRef(null)
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start center", "end center"] })
    const pathLength = useSpring(scrollYProgress, { stiffness: 100, damping: 20 })

    const steps = [
        { title: "Apply", icon: FileText },
        { title: "Match", icon: Search },
        { title: "Meet", icon: Users },
        { title: "Home", icon: Home },
    ]

    return (
        <section ref={ref} className="py-32 relative" style={{ backgroundColor: tokens.backgroundAlt }}>
            <div className="max-w-5xl mx-auto px-6 text-center">
                <FadeUp>
                    <h2 className="text-4xl font-bold mb-24" style={{ color: tokens.foreground }}>The Path Forward</h2>
                </FadeUp>

                <div className="relative h-24 flex justify-between items-center mb-12">
                    {/* Background track */}
                    <div className="absolute left-0 right-0 h-2 top-1/2 -translate-y-1/2 rounded-full" style={{ backgroundColor: tokens.border }} />

                    {/* Animated path */}
                    <motion.div
                        className="absolute left-0 h-2 top-1/2 -translate-y-1/2 rounded-full origin-left"
                        style={{ backgroundColor: tokens.accent2, scaleX: pathLength, width: '100%' }}
                    />

                    {steps.map((step, i) => {
                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        const isReached = useTransform(scrollYProgress, [i / (steps.length - 1) - 0.1, i / (steps.length - 1)], [0, 1])

                        return (
                        <div key={i} className="relative z-10 flex flex-col items-center">
                            <motion.div
                                className="w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-colors duration-300"
                                style={{
                                    backgroundColor: tokens.surface,
                                    border: `4px solid ${tokens.border}`,
                                }}
                                animate={{
                                    borderColor: isReached.get() > 0.5 ? tokens.accent2 : tokens.border,
                                    scale: isReached.get() > 0.5 ? 1.1 : 1
                                }}
                            >
                                <step.icon className="w-6 h-6" style={{ color: tokens.foreground }} />
                            </motion.div>
                            <h3 className="font-bold text-lg" style={{ color: tokens.foreground }}>{step.title}</h3>
                        </div>
                    )})}
                </div>
            </div>
        </section>
    )
}

function Stats() {
  return (
    <section className="py-24 border-y" style={{ borderColor: tokens.border, backgroundColor: tokens.background }}>
      <div className="max-w-6xl mx-auto px-6">
        <StaggerTension>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map(stat => (
              <motion.div key={stat.label} variants={staggerItem} className="text-center">
                <p className="text-5xl font-bold mb-2 tracking-tight" style={{ color: tokens.foreground }}>{stat.value}</p>
                <p className="font-medium text-sm tracking-wide uppercase" style={{ color: tokens.mutedForeground }}>{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </StaggerTension>
      </div>
    </section>
  )
}

function Features() {
  return (
    <section id="how it works" className="py-32" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-6xl mx-auto px-6">
        <FadeUp>
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight" style={{ color: tokens.foreground }}>
              Everything handled.
            </h2>
            <p className="text-xl max-w-2xl mx-auto" style={{ color: tokens.mutedForeground }}>
              We've smoothed out every bump in the road.
            </p>
          </div>
        </FadeUp>

        <StaggerTension>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FEATURES.map(feature => (
              <motion.div
                key={feature.title}
                variants={staggerItem}
                className="p-8 rounded-2xl flex flex-col relative overflow-hidden group"
                style={{ backgroundColor: tokens.backgroundAlt, border: `1px solid ${tokens.border}` }}
              >
                <div className="absolute top-0 left-0 w-1 h-full transition-all duration-300 scale-y-0 group-hover:scale-y-100" style={{ backgroundColor: tokens.accent1 }} />

                <div className="p-3 rounded-xl mb-6 w-fit" style={{ backgroundColor: `${tokens.accent1}15` }}>
                    <feature.icon className="h-6 w-6" style={{ color: tokens.accent1 }} strokeWidth={2} />
                </div>
                <h3 className="font-bold text-xl mb-3" style={{ color: tokens.foreground }}>{feature.title}</h3>
                <p className="text-base leading-relaxed" style={{ color: tokens.mutedForeground }}>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </StaggerTension>
      </div>
    </section>
  )
}

function ProductDetail() {
  return (
    <section className="py-32 border-y" style={{ borderColor: tokens.border, backgroundColor: tokens.backgroundAlt }}>
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
            <FadeUp>
                <div className="relative h-96 w-full rounded-3xl overflow-hidden shadow-2xl" style={{ backgroundColor: tokens.surface, border: `1px solid ${tokens.border}` }}>
                    <div className="absolute inset-0 flex flex-col justify-between p-8">
                         <div className="flex justify-between items-center">
                            <div className="w-12 h-12 rounded-full bg-gray-200" />
                            <div className="px-3 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: `${tokens.accent2}20`, color: tokens.accent2 }}>99% Match</div>
                         </div>
                         <div>
                             <div className="h-6 w-32 rounded mb-2 bg-gray-200" />
                             <div className="h-4 w-48 rounded bg-gray-100" />
                         </div>
                    </div>
                </div>
            </FadeUp>
            <FadeUp delay={0.2}>
            <div>
                <h2 className="text-4xl font-bold mb-6 tracking-tight" style={{ color: tokens.foreground }}>
                Meet your match, not just a profile.
                </h2>
                <div className="space-y-6">
                <p className="text-lg leading-relaxed" style={{ color: tokens.mutedForeground }}>
                    Our matching algorithm goes beyond just size and breed. We look at energy levels, experience, and living situations to suggest companions that will truly thrive with you.
                </p>
                <ul className="space-y-4">
                    {[
                        'Behavioral analysis integration',
                        'Lifestyle compatibility scoring',
                        'Real-time shelter inventory sync'
                    ].map((item, i) => (
                        <li key={i} className="flex items-center gap-3">
                            <div className="p-1 rounded-full" style={{ backgroundColor: tokens.accent2 }}>
                                <Check className="w-4 h-4 text-white" strokeWidth={3} />
                            </div>
                            <span className="font-medium" style={{ color: tokens.foreground }}>{item}</span>
                        </li>
                    ))}
                </ul>
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
      <div className="max-w-6xl mx-auto px-6">
        <FadeUp>
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight" style={{ color: tokens.foreground }}>Transparent pricing.</h2>
            <p className="text-xl" style={{ color: tokens.mutedForeground }}>No hidden fees, just happy tails.</p>
          </div>
        </FadeUp>

        <StaggerTension>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PRICING.map((tier, index) => (
              <motion.div
                key={tier.name}
                variants={staggerItem}
                className="p-8 rounded-3xl relative flex flex-col"
                style={{
                  backgroundColor: tokens.surface,
                  border: `2px solid ${tier.highlighted ? tokens.accent1 : tokens.border}`,
                  boxShadow: tier.highlighted ? `0 20px 40px -10px ${tokens.accent1}30` : 'none',
                  marginTop: tier.highlighted ? '-1rem' : '0',
                  marginBottom: tier.highlighted ? '-1rem' : '0',
                  zIndex: tier.highlighted ? 10 : 1
                }}
              >
                {tier.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white" style={{ backgroundColor: tokens.accent1 }}>
                    Most Popular
                  </div>
                )}
                <h3 className="font-bold text-2xl mb-4" style={{ color: tokens.foreground }}>{tier.name}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-5xl font-bold tracking-tight" style={{ color: tokens.foreground }}>{tier.price}</span>
                </div>
                <p className="text-sm font-medium uppercase tracking-wide mb-6 pb-6 border-b" style={{ color: tokens.mutedForeground, borderColor: tokens.border }}>
                    {tier.period}
                </p>
                <p className="text-base mb-8 leading-relaxed h-12" style={{ color: tokens.foreground }}>{tier.description}</p>
                <ul className="space-y-4 mb-10 flex-1">
                  {tier.features.map(f => (
                    <li key={f} className="flex items-start gap-3">
                      <Check className="h-5 w-5 shrink-0" style={{ color: tokens.accent2 }} strokeWidth={2.5} />
                      <span style={{ color: tokens.foreground }} className="leading-relaxed font-medium">{f}</span>
                    </li>
                  ))}
                </ul>
                <LeashPullButton primary={tier.highlighted} className="w-full">
                  {tier.cta}
                </LeashPullButton>
              </motion.div>
            ))}
          </div>
        </StaggerTension>
      </div>
    </section>
  )
}

function Testimonials() {
  return (
    <section id="success stories" className="py-32 border-y overflow-hidden" style={{ borderColor: tokens.border, backgroundColor: tokens.backgroundAlt }}>
      <div className="max-w-7xl mx-auto px-6">
        <FadeUp>
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight" style={{ color: tokens.foreground }}>Journeys completed.</h2>
          </div>
        </FadeUp>

        <div className="flex flex-col md:flex-row gap-8">
            {TESTIMONIALS.map((t, i) => (
              <FadeUp key={t.name} delay={i * 0.1} className="flex-1">
                <div className="p-8 rounded-3xl h-full flex flex-col" style={{ backgroundColor: tokens.surface, border: `1px solid ${tokens.border}` }}>
                    <div className="flex mb-6">
                        {Array.from({ length: t.rating }).map((_, i) => (
                        <Heart key={i} className="h-5 w-5 mr-1" fill={tokens.accent1} style={{ color: tokens.accent1 }} />
                        ))}
                    </div>
                    <p className="text-lg leading-relaxed mb-8 flex-1 font-medium" style={{ color: tokens.foreground }}>"{t.text}"</p>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gray-200 shrink-0" />
                        <div>
                            <p className="font-bold text-base" style={{ color: tokens.foreground }}>{t.name}</p>
                            <p className="text-sm font-medium" style={{ color: tokens.mutedForeground }}>{t.role} · {t.company}</p>
                        </div>
                    </div>
                </div>
              </FadeUp>
            ))}
        </div>
      </div>
    </section>
  )
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="py-32" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-3xl mx-auto px-6">
        <FadeUp>
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight" style={{ color: tokens.foreground }}>Questions?</h2>
          </div>
        </FadeUp>
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, i) => (
            <FadeUp key={i} delay={i * 0.05}>
              <div
                className="rounded-2xl overflow-hidden transition-all duration-300"
                style={{
                    backgroundColor: openIndex === i ? tokens.backgroundAlt : tokens.surface,
                    border: `1px solid ${openIndex === i ? tokens.accent1 : tokens.border}`
                }}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  aria-expanded={openIndex === i}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-bold text-lg" style={{ color: tokens.foreground }}>{item.q}</span>
                  <motion.div
                    animate={{ rotate: openIndex === i ? 180 : 0, backgroundColor: openIndex === i ? tokens.accent1 : tokens.muted }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="w-8 h-8 flex items-center justify-center rounded-full shrink-0"
                  >
                    <ChevronDown className="h-5 w-5" style={{ color: openIndex === i ? '#FFF' : tokens.foreground }} />
                  </motion.div>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openIndex === i ? 'auto' : 0, opacity: openIndex === i ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                  style={{ overflow: 'hidden' }}
                >
                  <p className="px-6 pb-6 text-base leading-relaxed font-medium" style={{ color: tokens.mutedForeground }}>
                    {item.a}
                  </p>
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
    setTimeout(() => setStatus('success'), 1500)
  }

  return (
    <section className="py-32" style={{ backgroundColor: tokens.backgroundAlt }}>
      <div className="max-w-4xl mx-auto px-6">
        <FadeUp>
          <div className="p-12 rounded-3xl relative overflow-hidden" style={{ backgroundColor: tokens.accent1 }}>
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />

            <div className="relative z-10 text-center text-white">
                <h2 className="text-4xl font-bold mb-4 tracking-tight">Ready to meet them?</h2>
                <p className="text-xl mb-10 max-w-xl mx-auto opacity-90">
                    Join our waitlist to be notified when new shelters in your area join the network.
                </p>
                {status === 'success' ? (
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="inline-flex items-center gap-2 font-bold text-xl bg-white text-[#6C5CE7] px-8 py-4 rounded-xl"
                    >
                        <Check className="w-6 h-6" strokeWidth={3} /> You're on the list!
                    </motion.div>
                ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
                    <input
                        type="email"
                        required
                        placeholder="your@email.com"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="flex-1 h-16 px-6 rounded-xl border-none text-lg font-medium text-gray-900 focus:ring-4 focus:ring-white/30 outline-none transition-all"
                    />
                    <motion.button
                        type="submit"
                        disabled={status === 'loading'}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="h-16 px-8 rounded-xl font-bold text-lg bg-gray-900 text-white disabled:opacity-60 transition-transform"
                    >
                        {status === 'loading' ? 'Joining...' : 'Join Waitlist'}
                    </motion.button>
                    </form>
                )}
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

function Footer() {
  const links = {
    Process: ['How it Works', 'Pricing', 'Shelter Partners', 'Success Stories'],
    Resources: ['Training Guide', 'Vet Finder', 'Blog', 'Checklist'],
    Company: ['About Us', 'Careers', 'Press', 'Contact'],
  }

  return (
    <footer className="py-20" style={{ backgroundColor: tokens.background, borderTop: `1px solid ${tokens.border}` }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-16">
          <div className="col-span-2 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
                <Heart className="h-6 w-6" style={{ color: tokens.accent1 }} fill={tokens.accent1} />
                <span className="font-bold text-2xl tracking-tight" style={{ color: tokens.foreground }}>
                {PRODUCT_NAME}
                </span>
            </div>
            <p className="text-base leading-relaxed font-medium max-w-sm" style={{ color: tokens.mutedForeground }}>
              Simplifying the journey to your new best friend. Making adoption faster, safer, and more joyful.
            </p>
          </div>
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <p className="font-bold text-base mb-6 tracking-tight" style={{ color: tokens.foreground }}>{group}</p>
              <ul className="space-y-4">
                {items.map(item => (
                  <li key={item}>
                    <a href="#" className="text-base font-medium hover:opacity-100 transition-opacity" style={{ color: tokens.mutedForeground }}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t gap-4" style={{ borderColor: tokens.border }}>
          <p className="text-sm font-medium" style={{ color: tokens.mutedForeground }}>
            © {new Date().getFullYear()} {PRODUCT_NAME}. All rights reserved.
          </p>
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
    <div className={`${primaryFont.variable} ${secondaryFont.variable} font-sans`} style={{ backgroundColor: tokens.background }}>
      <Navbar />
      <main>
        <Hero />
        <AdoptionJourneyMap />
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
