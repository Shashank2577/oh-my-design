'use client'

import { motion, useReducedMotion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Fraunces, Inter } from 'next/font/google'
import {
  Star, ChevronDown, ArrowRight, Check, Shield, ShieldCheck, HeartPulse, Activity, Stethoscope, BriefcaseMedical, PhoneCall, Zap,
  Lock, Key
} from 'lucide-react'

const headingsFont = Fraunces({
  subsets: ['latin'],
  variable: '--font-headings',
  display: 'swap',
})

const bodyFont = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const tokens = {
  background: '#F8FAFC',
  backgroundAlt: '#FFFFFF',
  foreground: '#0F172A',
  muted: '#F1F5F9',
  mutedForeground: '#64748B',
  border: '#E2E8F0',
  accent1: '#1E293B',
  accent2: '#10B981',
}

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
      transition={{ type: "spring", stiffness: 100, damping: 10, delay, mass: 1.2 }}
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
        visible: { transition: { staggerChildren: 0.15 } },
      }}
    >
      {children}
    </motion.div>
  )
}

const staggerItem: import('framer-motion').Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100, damping: 10, mass: 1.2 } },
}

const PRODUCT_NAME = 'VaultPet'
const TAGLINE = 'The Digital Vault for Pet Health.'
const DESCRIPTION = 'Uncompromising coverage for the uncompromising pet parent. Engineered for security, transparency, and rapid response.'

const NAV_LINKS = ['Coverage', 'Pricing', 'Claims', 'FAQ']

const STATS = [
  { value: '$120M+', label: 'Claims Paid' },
  { value: '98%', label: 'Approval Rate' },
  { value: '48h', label: 'Avg Payout Time' },
  { value: '250K+', label: 'Protected Pets' },
]

const FEATURES = [
  { icon: ShieldCheck, title: 'Comprehensive Core', description: 'Illnesses, accidents, hereditary conditions, and congenital defects—all covered standard.' },
  { icon: Stethoscope, title: 'Exam Fees Included', description: 'We cover the cost of the vet exam for covered conditions, saving you an average of $75 per visit.' },
  { icon: HeartPulse, title: 'Prescription Meds', description: 'FDA-approved prescriptions, supplements, and even specialized diets when prescribed for a covered condition.' },
  { icon: BriefcaseMedical, title: 'Alternative Therapies', description: 'Acupuncture, chiropractic care, and physical therapy are fully covered under all standard policies.' },
  { icon: Zap, title: 'Instant Claims', description: 'Submit a photo of your invoice via our app. Our AI-assisted review process begins instantly.' },
  { icon: Lock, title: 'Locked-in Rates', description: 'Your base premium is locked in for the first 3 years. No surprise hikes just because your pet ages.' },
]

const PRICING = [
  {
    name: 'Essential Shield',
    price: '$28',
    period: 'per month',
    description: 'Accident and critical illness coverage.',
    features: ['$5,000 Annual Limit', '80% Reimbursement', '$500 Deductible', 'Accident & Illness'],
    cta: 'Select Shield',
    highlighted: false,
  },
  {
    name: 'Vault Standard',
    price: '$45',
    period: 'per month',
    description: 'Comprehensive coverage for total peace of mind.',
    features: ['Unlimited Annual Limit', '90% Reimbursement', '$250 Deductible', 'Exam Fees Included', 'Alternative Therapies'],
    cta: 'Lock In Rate',
    highlighted: true,
  },
  {
    name: 'Vault Premium',
    price: '$68',
    period: 'per month',
    description: 'Standard coverage + preventative care.',
    features: ['Everything in Standard', 'Vaccinations', 'Annual Wellness Exams', 'Flea & Tick Prevention', 'Dental Cleaning'],
    cta: 'Secure Premium',
    highlighted: false,
  },
]

const TESTIMONIALS = [
  {
    name: 'Sarah Jenkins',
    role: 'Golden Retriever Owner',
    company: 'Member since 2021',
    text: 'When Max tore his ACL, the surgery was $4,500. VaultPet approved the claim in 24 hours and I had the funds in my account two days later. Incredible security.',
    rating: 5,
  },
  {
    name: 'David Reynolds',
    role: 'French Bulldog Owner',
    company: 'Member since 2023',
    text: 'Other companies hit me with massive rate hikes after year one. VaultPet kept their promise. My rate has been locked in, just like they said.',
    rating: 5,
  },
  {
    name: 'Elena Rostova',
    role: 'Maine Coon Owner',
    company: 'Member since 2020',
    text: 'The app is built like a banking app. Extremely secure, clear trails of every claim, and absolute transparency on what is covered.',
    rating: 5,
  },
]

const FAQ_ITEMS = [
  { q: 'Is there a waiting period?', a: 'Yes. 14 days for illnesses and 48 hours for accidents. Orthopedic conditions have a 6-month waiting period.' },
  { q: 'Can I use any vet?', a: 'Yes. You can visit any licensed veterinarian, specialist, or emergency clinic in the US or Canada.' },
  { q: 'How does reimbursement work?', a: 'You pay your vet at checkout, then submit the invoice through our app. We process it and direct deposit the reimbursement into your bank account.' },
  { q: 'Are pre-existing conditions covered?', a: 'Like all pet insurance, we do not cover pre-existing conditions. A condition is considered pre-existing if symptoms were present before your policy effective date or during the waiting period.' },
]

function Navbar() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300"
      style={{ borderColor: tokens.border, backgroundColor: `${tokens.background}f0`, backdropFilter: 'blur(10px)' }}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Shield className="h-6 w-6" style={{ color: tokens.accent2 }} strokeWidth={2.5} />
          <span className={`font-bold text-2xl tracking-tight ${headingsFont.variable} font-serif`} style={{ color: tokens.accent1 }}>
            {PRODUCT_NAME}
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-sm font-semibold transition-colors hover:opacity-70"
              style={{ color: tokens.mutedForeground }}
            >
              {link}
            </a>
          ))}
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98, y: 2 }} // Mechanical click
          className="px-6 h-12 rounded font-bold text-sm shadow-[inset_0_-3px_0_rgba(0,0,0,0.2)] active:shadow-none"
          style={{ backgroundColor: tokens.accent1, color: tokens.backgroundAlt }}
        >
          Get Quote
        </motion.button>
      </div>
    </nav>
  )
}

function NumberTicker({ value, label }: { value: string, label: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-5% 0px' })

  return (
    <motion.div ref={ref} className="text-center">
      <motion.div
        className="overflow-hidden h-12"
      >
        <motion.div
          initial={{ y: 50 }}
          animate={isInView ? { y: 0 } : {}}
          transition={{ type: "spring", stiffness: 50, damping: 20, delay: 0.2 }}
          className={`text-5xl font-bold tracking-tight mb-2 ${headingsFont.variable} font-serif`}
          style={{ color: tokens.accent1 }}
        >
          {value}
        </motion.div>
      </motion.div>
      <p className="text-sm font-semibold uppercase tracking-wider" style={{ color: tokens.mutedForeground }}>{label}</p>
    </motion.div>
  )
}


function Hero() {
  return (
    <section className="min-h-dvh flex flex-col justify-center pt-20 relative overflow-hidden" style={{ backgroundColor: tokens.background }}>
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{ backgroundImage: `radial-gradient(${tokens.border} 1px, transparent 1px)`, backgroundSize: '24px 24px' }}></div>
      <div className="max-w-7xl mx-auto px-6 py-24 w-full relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.15, delayChildren: 0.1 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 10, mass: 1.2 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded border mb-6"
              style={{ borderColor: tokens.border, backgroundColor: tokens.backgroundAlt }}
            >
              <Lock className="h-4 w-4" style={{ color: tokens.accent2 }} />
              <span className="text-xs font-bold tracking-widest uppercase" style={{ color: tokens.mutedForeground }}>Bank-Grade Security</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 10, delay: 0.1, mass: 1.2 }}
              className={`text-5xl md:text-7xl font-bold leading-[1.1] mb-6 ${headingsFont.variable} font-serif`}
              style={{ color: tokens.accent1 }}
            >
              {TAGLINE}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 10, delay: 0.2, mass: 1.2 }}
              className="text-lg md:text-xl mb-10 max-w-xl font-medium leading-relaxed"
              style={{ color: tokens.mutedForeground }}
            >
              {DESCRIPTION}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 10, delay: 0.3, mass: 1.2 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98, y: 2 }} // Mechanical click
                className="h-14 px-8 rounded font-bold shadow-[inset_0_-4px_0_rgba(0,0,0,0.2)] active:shadow-none flex items-center justify-center gap-2"
                style={{ backgroundColor: tokens.accent2, color: tokens.backgroundAlt }}
              >
                Protect Your Pet <ArrowRight className="h-5 w-5" />
              </motion.button>
            </motion.div>
          </motion.div>

          <FadeUp delay={0.4} className="relative hidden md:block">
             <div className="relative w-full aspect-square max-w-md mx-auto">
                <motion.div
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 80, damping: 12, delay: 0.5 }}
                  className="absolute inset-0 rounded-full border-[16px]"
                  style={{ borderColor: tokens.border }}
                />
                 <motion.div
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 80, damping: 12, delay: 0.7 }}
                  className="absolute inset-4 rounded-full border-[12px] border-dashed"
                  style={{ borderColor: tokens.mutedForeground }}
                />
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 150, damping: 15, delay: 0.9 }}
                >
                  <Shield className="h-48 w-48" style={{ color: tokens.accent1 }} strokeWidth={1.5} />
                </motion.div>
             </div>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}

function Stats() {
  return (
    <section className="border-y py-16" style={{ borderColor: tokens.border, backgroundColor: tokens.backgroundAlt }}>
      <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {STATS.map(stat => (
              <NumberTicker key={stat.label} value={stat.value} label={stat.label} />
            ))}
          </div>
      </div>
    </section>
  )
}

function ShieldVisualizer() {
  const [activePlates, setActivePlates] = useState<number[]>([0])

  const togglePlate = (index: number) => {
    if (activePlates.includes(index) && activePlates.length > 1) {
      setActivePlates(activePlates.filter(i => i !== index))
    } else if (!activePlates.includes(index)) {
      setActivePlates([...activePlates, index])
    }
  }

  const plates = [
    { name: 'Accidents', icon: Zap, pos: { top: '10%', left: '50%', transform: 'translate(-50%, 0)' } },
    { name: 'Illnesses', icon: Stethoscope, pos: { top: '40%', left: '15%' } },
    { name: 'Dental', icon: ShieldCheck, pos: { top: '40%', right: '15%' } },
    { name: 'Wellness', icon: HeartPulse, pos: { bottom: '15%', left: '50%', transform: 'translate(-50%, 0)' } },
  ]

  return (
    <div className="grid md:grid-cols-2 gap-16 items-center">
      <div className="relative aspect-square w-full max-w-sm mx-auto" style={{ perspective: '1000px' }}>
        <motion.div
          animate={{ rotateY: [0, 5, -5, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: [0.42, 0, 0.58, 1] }}
          className="absolute inset-0"
        >
          <Shield className="w-full h-full opacity-10" style={{ color: tokens.accent1 }} strokeWidth={1} />

          {plates.map((plate, i) => (
             <motion.div
                key={i}
                className="absolute"
                style={{ ...plate.pos }}
                initial={false}
                animate={{
                  scale: activePlates.includes(i) ? 1 : 0.8,
                  opacity: activePlates.includes(i) ? 1 : 0.4,
                  z: activePlates.includes(i) ? 50 : 0
                }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
             >
                <div
                  className="w-20 h-24 rounded shadow-lg flex flex-col items-center justify-center gap-2 border-2 backdrop-blur-sm"
                  style={{
                    backgroundColor: activePlates.includes(i) ? `${tokens.accent2}cc` : `${tokens.backgroundAlt}cc`,
                    borderColor: activePlates.includes(i) ? tokens.accent2 : tokens.border,
                    color: activePlates.includes(i) ? tokens.backgroundAlt : tokens.mutedForeground
                  }}
                >
                  <plate.icon className="w-8 h-8" strokeWidth={2} />
                </div>
             </motion.div>
          ))}
        </motion.div>
      </div>

      <div>
        <h3 className={`text-3xl font-bold mb-6 ${headingsFont.variable} font-serif`} style={{ color: tokens.accent1 }}>
          Build Your Armor
        </h3>
        <p className="text-lg mb-8" style={{ color: tokens.mutedForeground }}>
          Customize your coverage to fit your pet's specific needs. Every piece clicks into place, providing a solid wall of protection.
        </p>
        <div className="space-y-4">
          {plates.map((plate, i) => (
            <motion.button
              key={i}
              onClick={() => togglePlate(i)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98, y: 2 }} // Mechanical selection click
              className="w-full p-4 flex items-center justify-between rounded border-2 transition-colors text-left"
              style={{
                borderColor: activePlates.includes(i) ? tokens.accent2 : tokens.border,
                backgroundColor: activePlates.includes(i) ? `${tokens.accent2}10` : tokens.backgroundAlt
              }}
            >
              <div className="flex items-center gap-4">
                <plate.icon className="w-6 h-6" style={{ color: activePlates.includes(i) ? tokens.accent2 : tokens.mutedForeground }} />
                <span className="font-bold text-lg" style={{ color: tokens.accent1 }}>{plate.name} Coverage</span>
              </div>
              <motion.div
                initial={false}
                animate={{ rotate: activePlates.includes(i) ? 0 : -90, opacity: activePlates.includes(i) ? 1 : 0 }}
              >
                <Check className="w-6 h-6" style={{ color: tokens.accent2 }} />
              </motion.div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  )
}

function Features() {
  return (
    <section id="coverage" className="py-24" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-7xl mx-auto px-6">
        <FadeUp>
          <div className="mb-16 max-w-2xl">
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${headingsFont.variable} font-serif`} style={{ color: tokens.accent1 }}>
              Fortified Coverage
            </h2>
            <p className="text-xl font-medium" style={{ color: tokens.mutedForeground }}>
              No loopholes. No hidden clauses. Just rock-solid financial protection for when the unexpected strikes.
            </p>
          </div>
        </FadeUp>
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feature, i) => (
              <motion.div
                key={feature.title}
                variants={staggerItem}
                className="p-8 border bg-gradient-to-br transition-all duration-300 relative overflow-hidden group"
                style={{
                  borderColor: tokens.border,
                  backgroundColor: tokens.backgroundAlt,
                  //@ts-ignore
                  '--tw-gradient-from': `${tokens.backgroundAlt} var(--tw-gradient-from-position)`,
                  '--tw-gradient-to': `${tokens.background} var(--tw-gradient-to-position)`,
                  '--tw-gradient-stops': 'var(--tw-gradient-from), var(--tw-gradient-to)',
                }}
              >
                {/* Metallic Sheen effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-1000 ease-in-out pointer-events-none" />

                <feature.icon className="h-8 w-8 mb-6" style={{ color: tokens.accent1 }} strokeWidth={2} />
                <h3 className="font-bold text-xl mb-3" style={{ color: tokens.accent1 }}>{feature.title}</h3>
                <p className="font-medium leading-relaxed" style={{ color: tokens.mutedForeground }}>{feature.description}</p>
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
    <section className="py-24 border-y" style={{ borderColor: tokens.border, backgroundColor: tokens.backgroundAlt }}>
      <div className="max-w-7xl mx-auto px-6">
        <ShieldVisualizer />
      </div>
    </section>
  )
}

function Pricing() {
  const [locked, setLocked] = useState(false)

  return (
    <section id="pricing" className="py-24" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-7xl mx-auto px-6">
        <FadeUp>
          <div className="text-center mb-16 relative">
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${headingsFont.variable} font-serif`} style={{ color: tokens.accent1 }}>Secure Your Rate</h2>
            <p className="text-xl font-medium max-w-2xl mx-auto" style={{ color: tokens.mutedForeground }}>
              Choose your vault. We lock the base rate for 3 years.
            </p>
          </div>
        </FadeUp>

        {/* The Policy Lock Overlay */}
        <div className="relative">
          <motion.div
            initial={false}
            animate={{
              opacity: locked ? 1 : 0,
              pointerEvents: locked ? 'auto' : 'none',
              backdropFilter: locked ? 'blur(4px)' : 'blur(0px)'
            }}
            className="absolute inset-0 z-20 flex items-center justify-center bg-black/5 rounded-xl"
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={locked ? { scale: 1, y: 0 } : { scale: 0.8, y: 20 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="bg-white p-8 rounded-xl shadow-2xl flex flex-col items-center border-4"
              style={{ borderColor: tokens.accent2 }}
            >
              <motion.div
                animate={locked ? { rotate: [0, 90, 180] } : {}}
                transition={{ type: "spring", stiffness: 100, damping: 10, delay: 0.2 }}
              >
                <Lock className="w-16 h-16 mb-4" style={{ color: tokens.accent2 }} />
              </motion.div>
              <h3 className={`text-2xl font-bold mb-2 ${headingsFont.variable} font-serif`} style={{ color: tokens.accent1 }}>Rate Locked</h3>
              <p style={{ color: tokens.mutedForeground }}>Your premium is secure.</p>
              <button
                onClick={() => setLocked(false)}
                className="mt-6 px-6 py-2 rounded text-sm font-bold bg-gray-100"
              >
                Edit Plan
              </button>
            </motion.div>
          </motion.div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            {PRICING.map(tier => (
              <motion.div
                key={tier.name}
                variants={staggerItem}
                className="p-8 border-2 bg-white relative flex flex-col"
                style={{
                  borderColor: tier.highlighted ? tokens.accent1 : tokens.border,
                }}
              >
                {tier.highlighted && (
                  <div
                    className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 text-xs font-bold tracking-widest uppercase flex items-center gap-2"
                    style={{ backgroundColor: tokens.accent1, color: tokens.backgroundAlt }}
                  >
                    <Star className="w-3 h-3 fill-current" /> Most Secured
                  </div>
                )}
                <h3 className={`font-bold text-2xl mb-2 ${headingsFont.variable} font-serif`} style={{ color: tokens.accent1 }}>{tier.name}</h3>
                <p className="text-sm font-medium mb-6 min-h-[40px]" style={{ color: tokens.mutedForeground }}>{tier.description}</p>
                <div className="flex items-baseline gap-1 mb-8 pb-8 border-b" style={{ borderColor: tokens.border }}>
                  <span className="text-5xl font-bold" style={{ color: tokens.accent1 }}>{tier.price}</span>
                  <span className="text-sm font-bold uppercase tracking-wider" style={{ color: tokens.mutedForeground }}>{tier.period}</span>
                </div>
                <ul className="space-y-4 mb-8 flex-grow">
                  {tier.features.map(f => (
                    <li key={f} className="flex items-start gap-3 text-sm font-medium">
                      <Check className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: tokens.accent2 }} strokeWidth={3} />
                      <span style={{ color: tokens.foreground }}>{f}</span>
                    </li>
                  ))}
                </ul>
                <motion.button
                  onClick={() => setLocked(true)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98, y: 2 }} // Mechanical click
                  className="w-full h-14 rounded font-bold uppercase tracking-widest text-sm shadow-[inset_0_-4px_0_rgba(0,0,0,0.2)] active:shadow-none"
                  style={tier.highlighted
                    ? { backgroundColor: tokens.accent1, color: tokens.backgroundAlt }
                    : { backgroundColor: tokens.muted, color: tokens.accent1 }
                  }
                >
                  {tier.cta}
                </motion.button>
              </motion.div>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  )
}

function Testimonials() {
  return (
    <section id="claims" className="py-24 border-y" style={{ borderColor: tokens.border, backgroundColor: tokens.backgroundAlt }}>
      <div className="max-w-7xl mx-auto px-6">
        <FadeUp>
          <div className="mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${headingsFont.variable} font-serif`} style={{ color: tokens.accent1 }}>
              Promises Kept
            </h2>
            <p className="text-xl font-medium" style={{ color: tokens.mutedForeground }}>
              When the worst happens, we deliver. Fast.
            </p>
          </div>
        </FadeUp>
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map(t => (
            <motion.div
              key={t.name}
              variants={staggerItem}
              className="p-8 border bg-gray-50 relative"
              style={{ borderColor: tokens.border }}
            >
              <div className="absolute top-8 right-8">
                <ShieldCheck className="w-8 h-8 opacity-20" style={{ color: tokens.accent1 }} />
              </div>
              <div className="flex mb-6 gap-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" style={{ color: tokens.accent2 }} />
                ))}
              </div>
              <p className="text-lg font-medium leading-relaxed mb-8" style={{ color: tokens.foreground }}>"{t.text}"</p>
              <div>
                <p className="font-bold" style={{ color: tokens.accent1 }}>{t.name}</p>
                <p className="text-sm font-medium" style={{ color: tokens.mutedForeground }}>{t.role} • {t.company}</p>
              </div>
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
    <section id="faq" className="py-24" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-3xl mx-auto px-6">
        <FadeUp>
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${headingsFont.variable} font-serif`} style={{ color: tokens.accent1 }}>Clear Terms</h2>
          </div>
        </FadeUp>
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, i) => (
            <FadeUp key={i} delay={i * 0.05}>
              <div className="border bg-white" style={{ borderColor: tokens.border }}>
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  aria-expanded={openIndex === i}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-bold text-lg" style={{ color: tokens.accent1 }}>{item.q}</span>
                  <motion.span
                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  >
                    <ChevronDown className="h-6 w-6 flex-shrink-0" style={{ color: tokens.mutedForeground }} />
                  </motion.span>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openIndex === i ? 'auto' : 0, opacity: openIndex === i ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                  style={{ overflow: 'hidden' }}
                >
                  <p className="px-6 pb-6 text-base font-medium leading-relaxed" style={{ color: tokens.mutedForeground }}>
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
    setTimeout(() => setStatus('success'), 1200)
  }

  return (
    <section className="py-24" style={{ backgroundColor: tokens.accent1 }}>
      <div className="max-w-3xl mx-auto px-6 text-center">
        <FadeUp>
          <Shield className="w-12 h-12 mx-auto mb-6" style={{ color: tokens.accent2 }} strokeWidth={2} />
          <h2 className={`text-4xl font-bold mb-6 ${headingsFont.variable} font-serif text-white`}>Audit Our Policy</h2>
          <p className="text-xl mb-10 text-slate-300 font-medium">
            Download our full, unredacted sample policy document. Read every word before you commit.
          </p>
          {status === 'success' ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="inline-flex items-center gap-2 font-bold px-6 py-4 rounded bg-emerald-500/20 text-emerald-400"
            >
              <Check className="w-6 h-6" /> Policy Sent to Email
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <label htmlFor="newsletter-email" className="sr-only">Email address</label>
              <input
                id="newsletter-email"
                type="email"
                required
                autoComplete="email"
                placeholder="Secure email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="flex-1 h-14 px-4 rounded border-2 bg-slate-800/50 text-white font-mono placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                style={{ borderColor: tokens.mutedForeground }}
              />
              <motion.button
                type="submit"
                disabled={status === 'loading'}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98, y: 2 }}
                className="h-14 px-8 rounded font-bold uppercase tracking-widest text-sm shadow-[inset_0_-4px_0_rgba(0,0,0,0.2)] disabled:opacity-60 flex items-center justify-center min-w-[200px]"
                style={{ backgroundColor: tokens.accent2, color: tokens.backgroundAlt }}
              >
                {status === 'loading' ? 'Encrypting...' : 'Get Document'}
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
    Coverage: ['Dogs', 'Cats', 'Puppies', 'Kittens', 'Exotics'],
    Company: ['About Us', 'Careers', 'Financials', 'Press'],
    Support: ['File a Claim', 'Find a Vet', 'Contact Us', 'FAQ'],
    Legal: ['Privacy Policy', 'Terms of Service', 'Disclosures', 'Licensing'],
  }

  return (
    <footer className="py-20" style={{ backgroundColor: tokens.backgroundAlt, borderTop: `1px solid ${tokens.border}` }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-12 mb-16">
          <div className="col-span-2 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Shield className="h-6 w-6" style={{ color: tokens.accent1 }} strokeWidth={2.5} />
              <span className={`font-bold text-2xl tracking-tight ${headingsFont.variable} font-serif`} style={{ color: tokens.accent1 }}>
                {PRODUCT_NAME}
              </span>
            </div>
            <p className="text-base font-medium leading-relaxed max-w-sm" style={{ color: tokens.mutedForeground }}>
              The digital vault for pet health. Absolute security and transparency for the modern pet owner.
            </p>
          </div>
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <p className="font-bold mb-6 tracking-widest uppercase text-xs" style={{ color: tokens.accent1 }}>{group}</p>
              <ul className="space-y-4">
                {items.map(item => (
                  <li key={item}>
                    <a href="#" className="text-sm font-medium transition-colors hover:text-slate-900" style={{ color: tokens.mutedForeground }}>
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
            © {new Date().getFullYear()} {PRODUCT_NAME} Underwriting. All rights reserved.
          </p>
          <a
            href="/"
            className="text-sm font-bold hover:underline"
            style={{ color: tokens.accent1 }}
          >
            ← Back to Directory
          </a>
        </div>
      </div>
    </footer>
  )
}

export default function StylePage() {
  return (
    <div className={`${bodyFont.variable} font-sans selection:bg-emerald-200 selection:text-slate-900`} style={{ backgroundColor: tokens.background, color: tokens.foreground }}>
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
