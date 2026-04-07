'use client'

import { motion, useReducedMotion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Inter } from 'next/font/google'
import {
  Star, ChevronDown, ArrowRight, Check, MapPin, Navigation, Car, Package, Shield,
  CreditCard, Menu, X
} from 'lucide-react'

const PROMPT = `
# Design System Inspiration of Uber

## 1. Visual Theme & Atmosphere

Uber's design language is a masterclass in confident minimalism -- a black-and-white universe where every pixel serves a purpose and nothing decorates without earning its place. The entire experience is built on a stark duality: jet black (\`#000000\`) and pure white (\`#ffffff\`), with virtually no mid-tone grays diluting the message. This isn't the sterile minimalism of a startup that hasn't finished designing -- it's the deliberate restraint of a brand so established it can afford to whisper.

The signature typeface, UberMove, is a proprietary geometric sans-serif with a distinctly square, engineered quality. Headlines in UberMove Bold at 52px carry the weight of a billboard -- authoritative, direct, unapologetic. The companion face UberMoveText handles body copy and buttons with a slightly softer, more readable character at medium weight (500). Together, they create a typographic system that feels like a transit map: clear, efficient, built for scanning at speed.

What makes Uber's design truly distinctive is its use of full-bleed photography and illustration paired with pill-shaped interactive elements (999px border-radius). Navigation chips, CTA buttons, and category selectors all share this capsule shape, creating a tactile, thumb-friendly interface language that's unmistakably Uber. The illustrations -- warm, slightly stylized scenes of drivers, riders, and cityscapes -- inject humanity into what could otherwise be a cold, monochrome system. The site alternates between white content sections and a full-black footer, with card-based layouts using the gentlest possible shadows (rgba(0,0,0,0.12-0.16)) to create subtle lift without breaking the flat aesthetic.

**Key Characteristics:**
- Pure black-and-white foundation with virtually no mid-tone grays in the UI chrome
- UberMove (headlines) + UberMoveText (body/UI) -- proprietary geometric sans-serif family
- Pill-shaped everything: buttons, chips, nav items all use 999px border-radius
- Warm, human illustrations contrasting the stark monochrome interface
- Card-based layout with whisper-soft shadows (0.12-0.16 opacity)
- 8px spacing grid with compact, information-dense layouts
- Bold photography integrated as full-bleed hero backgrounds
- Black footer anchoring the page with a dark, high-contrast environment

## 2. Color Palette & Roles

### Primary
- **Uber Black** (\`#000000\`): The defining brand color -- used for primary buttons, headlines, navigation text, and the footer. Not "near-black" or "off-black," but true, uncompromising black.
- **Pure White** (\`#ffffff\`): The primary surface color and inverse text. Used for page backgrounds, card surfaces, and text on black elements.

### Interactive & Button States
- **Hover Gray** (\`#e2e2e2\`): White button hover state -- a clean, cool light gray that provides clear feedback without warmth.
- **Hover Light** (\`#f3f3f3\`): Subtle hover for elevated white buttons -- barely-there gray for gentle interaction feedback.
- **Chip Gray** (\`#efefef\`): Background for secondary/filter buttons and navigation chips -- a neutral, ultra-light gray.
`;

// Using Inter as fallback for UberMove / UberMoveText
const interFont = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const tokens = {
  uberBlack: '#000000',
  pureWhite: '#ffffff',
  hoverGray: '#e2e2e2',
  hoverLight: '#f3f3f3',
  chipGray: '#efefef',
  bodyGray: '#4b4b4b',
  mutedGray: '#afafaf',
  borderBlack: '#000000',
  shadowLight: 'rgba(0, 0, 0, 0.12) 0px 4px 16px 0px',
  shadowMedium: 'rgba(0, 0, 0, 0.16) 0px 4px 16px 0px',
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
      initial={shouldReduce ? false : { opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
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
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] as const } },
}

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────
const PRODUCT_NAME = 'Uber'
const TAGLINE = 'Go anywhere with Uber'
const DESCRIPTION = 'Request a ride, hop in, and go.'

const NAV_LINKS = ['Ride', 'Drive', 'Business', 'Uber Eats', 'About']

const STATS = [
  { value: '10,000+', label: 'Cities worldwide' },
  { value: '130M+', label: 'Monthly active platform consumers' },
  { value: '7.1B', label: 'Trips in 2022' },
  { value: '24/7', label: 'Support available' },
]

const FEATURES = [
  { icon: Car, title: 'Ride', description: 'Request a ride at any time and on any day of the year.' },
  { icon: Package, title: 'Delivery', description: 'Food delivery, grocery, and alcohol delivery.' },
  { icon: Navigation, title: 'Reserve', description: 'Schedule a ride up to 90 days in advance.' },
  { icon: Shield, title: 'Safety', description: 'Every ride is tracked from start to finish.' },
  { icon: CreditCard, title: 'Payment', description: 'Cashless payment is automatic and secure.' },
  { icon: MapPin, title: 'Airports', description: 'Rides to and from more than 600 airports worldwide.' },
]

const PRICING = [
  {
    name: 'UberX',
    price: 'Affordable',
    period: 'everyday rides',
    description: 'Everyday rides, always affordable.',
    features: ['1-4 riders', 'Everyday cars', 'Affordable prices', 'Available everywhere'],
    cta: 'Request UberX',
    highlighted: false,
  },
  {
    name: 'Comfort',
    price: 'Premium',
    period: 'newer cars',
    description: 'Newer cars with extra legroom.',
    features: ['1-4 riders', 'Extra legroom', 'Top-rated drivers', 'Temperature control'],
    cta: 'Request Comfort',
    highlighted: true,
  },
  {
    name: 'Uber Black',
    price: 'Luxury',
    period: 'professional drivers',
    description: 'Premium rides in luxury cars.',
    features: ['1-4 riders', 'Luxury vehicles', 'Professional drivers', 'Premium support'],
    cta: 'Request Black',
    highlighted: false,
  },
]

const TESTIMONIALS = [
  {
    name: 'Michael',
    role: 'Rider',
    company: 'Since 2015',
    text: 'I use Uber for all my airport trips. The reliability and ease of use make travel so much less stressful.',
    rating: 5,
  },
  {
    name: 'Sarah',
    role: 'Driver',
    company: 'Since 2018',
    text: 'Driving with Uber gives me the flexibility to earn on my own schedule, which is perfect for my family.',
    rating: 5,
  },
  {
    name: 'David',
    role: 'Business Traveler',
    company: 'Since 2016',
    text: 'Uber for Business simplifies expensing completely. I never have to worry about paper receipts anymore.',
    rating: 5,
  },
]

const FAQ_ITEMS = [
  { q: 'Can I request a ride in advance?', a: 'Yes, with Uber Reserve you can schedule a ride up to 90 days in advance.' },
  { q: 'How is the price calculated?', a: 'Upfront pricing is calculated based on estimated time and distance of the route, plus base fare and current demand.' },
  { q: 'Can I pay with cash?', a: 'Cash payments are available in select cities. You can also pay with credit cards, debit cards, PayPal, and more.' },
  { q: 'How do I contact support?', a: 'You can contact 24/7 support directly through the Help section in the Uber app.' },
  { q: 'What safety features are included?', a: 'Safety features include GPS tracking, driver screening, emergency assistance button, and RideCheck.' },
]

// ─────────────────────────────────────────────
// COMPONENTS
// ─────────────────────────────────────────────

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white">
      <div className="max-w-[1136px] mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <span className="font-bold text-2xl tracking-tight" style={{ color: tokens.uberBlack }}>
            Uber
          </span>
          <div className="hidden lg:flex items-center gap-2">
            {NAV_LINKS.map((link, i) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(' ', '-')}`}
                className="px-4 py-2 rounded-full text-sm font-medium transition-colors"
                style={{
                  color: i === 0 ? tokens.pureWhite : tokens.uberBlack,
                  backgroundColor: i === 0 ? tokens.uberBlack : 'transparent',
                }}
                onMouseEnter={(e) => {
                  if (i !== 0) e.currentTarget.style.backgroundColor = tokens.chipGray
                }}
                onMouseLeave={(e) => {
                  if (i !== 0) e.currentTarget.style.backgroundColor = 'transparent'
                }}
              >
                {link}
              </a>
            ))}
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <a href="#" className="text-sm font-medium hover:bg-gray-100 px-4 py-2 rounded-full transition-colors" style={{ color: tokens.uberBlack }}>EN</a>
          <a href="#" className="text-sm font-medium hover:bg-gray-100 px-4 py-2 rounded-full transition-colors" style={{ color: tokens.uberBlack }}>Log in</a>
          <button
            className="px-4 py-2 rounded-full text-sm font-medium transition-colors"
            style={{ backgroundColor: tokens.uberBlack, color: tokens.pureWhite }}
          >
            Sign up
          </button>
        </div>

        <button
          className="lg:hidden p-2 rounded-full hover:bg-gray-100"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-16 left-0 right-0 bg-white border-b shadow-lg p-4 flex flex-col gap-2 h-screen">
           {NAV_LINKS.map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(' ', '-')}`}
              className="px-4 py-3 text-lg font-medium"
              style={{ color: tokens.uberBlack }}
              onClick={() => setIsOpen(false)}
            >
              {link}
            </a>
          ))}
          <div className="mt-4 pt-4 border-t flex flex-col gap-2">
            <button className="px-4 py-3 rounded-full text-lg font-medium text-left" style={{ color: tokens.uberBlack, backgroundColor: tokens.chipGray }}>Log in</button>
            <button className="px-4 py-3 rounded-full text-lg font-medium text-center" style={{ color: tokens.pureWhite, backgroundColor: tokens.uberBlack }}>Sign up</button>
          </div>
        </div>
      )}
    </nav>
  )
}

function Hero() {
  return (
    <section className="pt-16 min-h-dvh flex items-center bg-white">
      <div className="max-w-[1136px] mx-auto w-full px-4 md:px-6 py-12 md:py-24">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">

          <div className="flex-1 w-full max-w-xl">
            <FadeUp>
              <h1 className="text-[52px] font-bold leading-[1.23] tracking-tight mb-6" style={{ color: tokens.uberBlack }}>
                {TAGLINE}
              </h1>
              <p className="text-base mb-8" style={{ color: tokens.bodyGray, lineHeight: 1.5 }}>
                {DESCRIPTION}
              </p>

              {/* Input forms */}
              <div className="flex flex-col gap-4 mb-8">
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-black" />
                  <input
                    type="text"
                    placeholder="Enter pickup location"
                    className="w-full h-12 pl-10 pr-4 rounded-lg border focus:outline-none focus:ring-2 focus:ring-black bg-[#f3f3f3] border-transparent"
                    style={{ color: tokens.uberBlack }}
                  />
                </div>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-none bg-black" />
                  <input
                    type="text"
                    placeholder="Enter destination"
                    className="w-full h-12 pl-10 pr-4 rounded-lg border focus:outline-none focus:ring-2 focus:ring-black bg-[#f3f3f3] border-transparent"
                    style={{ color: tokens.uberBlack }}
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  className="px-6 py-3 rounded-full font-medium text-base transition-colors hover:opacity-80"
                  style={{ backgroundColor: tokens.uberBlack, color: tokens.pureWhite }}
                >
                  See prices
                </button>
              </div>
            </FadeUp>
          </div>

          <div className="flex-1 w-full relative h-[400px] lg:h-[600px]">
            <FadeUp delay={0.2} className="w-full h-full">
              {/* Illustration Placeholder */}
              <div
                className="w-full h-full rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden relative"
              >
                 <div className="absolute inset-0 bg-[#e2e2e2] opacity-50" />
                 {/* Stylized geometric shapes to represent a warm illustration */}
                 <div className="absolute bottom-0 left-10 w-32 h-64 bg-[#d0d0d0] rounded-t-full" />
                 <div className="absolute bottom-0 right-20 w-48 h-48 bg-[#c0c0c0] rounded-full" />
                 <div className="absolute top-20 right-10 w-16 h-16 bg-[#a0a0a0] rounded-full" />
              </div>
            </FadeUp>
          </div>

        </div>
      </div>
    </section>
  )
}

function Stats() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-[1136px] mx-auto px-4 md:px-6">
        <StaggerContainer>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map(stat => (
              <motion.div key={stat.label} variants={staggerItem}>
                <p className="text-[36px] font-bold mb-2 tracking-tight" style={{ color: tokens.uberBlack, lineHeight: 1.22 }}>{stat.value}</p>
                <p className="text-base" style={{ color: tokens.bodyGray, lineHeight: 1.5 }}>{stat.label}</p>
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
    <section id="drive" className="py-24 bg-[#f3f3f3]">
      <div className="max-w-[1136px] mx-auto px-4 md:px-6">
        <FadeUp>
          <h2 className="text-[36px] font-bold mb-12 tracking-tight" style={{ color: tokens.uberBlack, lineHeight: 1.22 }}>
            Focused on safety, wherever you go
          </h2>
        </FadeUp>
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FEATURES.slice(0, 3).map(feature => (
              <motion.div
                key={feature.title}
                variants={staggerItem}
                className="bg-white rounded-xl p-6 flex flex-col"
                style={{ boxShadow: tokens.shadowLight }}
              >
                <feature.icon className="h-8 w-8 mb-6" style={{ color: tokens.uberBlack }} strokeWidth={1.5} />
                <h3 className="font-bold text-[20px] mb-2" style={{ color: tokens.uberBlack, lineHeight: 1.4 }}>{feature.title}</h3>
                <p className="text-base mb-6 flex-1" style={{ color: tokens.bodyGray, lineHeight: 1.5 }}>{feature.description}</p>
                <a href="#" className="font-medium text-base underline underline-offset-4" style={{ color: tokens.uberBlack }}>
                  Learn more
                </a>
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
    <section id="business" className="py-24 bg-white">
      <div className="max-w-[1136px] mx-auto px-4 md:px-6">
        <div className="flex flex-col-reverse lg:flex-row gap-12 items-center">
          <div className="flex-1 w-full">
            <FadeUp className="w-full h-[400px] rounded-xl overflow-hidden bg-gray-100 relative">
               <div className="absolute inset-0 bg-[#e2e2e2] opacity-50" />
               <div className="absolute inset-4 bg-white rounded-lg shadow-sm p-6 flex flex-col">
                 <div className="w-32 h-4 bg-gray-200 rounded mb-4" />
                 <div className="w-full h-32 bg-gray-100 rounded mb-4" />
                 <div className="w-48 h-4 bg-gray-200 rounded" />
               </div>
            </FadeUp>
          </div>
          <div className="flex-1">
            <FadeUp>
              <h2 className="text-[36px] font-bold mb-6 tracking-tight" style={{ color: tokens.uberBlack, lineHeight: 1.22 }}>
                Uber for Business
              </h2>
              <p className="text-base mb-8" style={{ color: tokens.bodyGray, lineHeight: 1.5 }}>
                A platform for managing global rides and meals, and local deliveries, for companies of any size.
              </p>
              <button
                className="px-6 py-3 rounded-full font-medium text-base transition-colors hover:opacity-80"
                style={{ backgroundColor: tokens.uberBlack, color: tokens.pureWhite }}
              >
                Get started
              </button>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  )
}

function Pricing() {
  return (
    <section id="ride" className="py-24 bg-white">
      <div className="max-w-[1136px] mx-auto px-4 md:px-6">
        <FadeUp>
          <h2 className="text-[36px] font-bold mb-12 tracking-tight" style={{ color: tokens.uberBlack, lineHeight: 1.22 }}>
            Choose your ride
          </h2>
        </FadeUp>

        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRICING.map(tier => (
              <motion.div
                key={tier.name}
                variants={staggerItem}
                className="p-6 rounded-xl flex flex-col"
                style={{
                  backgroundColor: tokens.pureWhite,
                  boxShadow: tier.highlighted ? tokens.shadowMedium : tokens.shadowLight
                }}
              >
                <div className="h-32 bg-[#f3f3f3] rounded-lg mb-6 flex items-center justify-center">
                   <Car size={48} color={tokens.mutedGray} />
                </div>
                <h3 className="font-bold text-[24px] mb-1" style={{ color: tokens.uberBlack, lineHeight: 1.33 }}>{tier.name}</h3>
                <p className="text-sm mb-4" style={{ color: tokens.bodyGray }}>{tier.description}</p>

                <ul className="space-y-3 mb-8 flex-1">
                  {tier.features.map(f => (
                    <li key={f} className="flex items-center gap-3 text-sm" style={{ color: tokens.bodyGray }}>
                      <Check className="h-4 w-4 shrink-0" style={{ color: tokens.uberBlack }} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className="w-full py-3 rounded-full font-medium text-base transition-colors hover:bg-[#e2e2e2]"
                  style={tier.highlighted
                    ? { backgroundColor: tokens.uberBlack, color: tokens.pureWhite }
                    : { backgroundColor: tokens.chipGray, color: tokens.uberBlack }
                  }
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
    <section className="py-24 bg-[#f3f3f3]">
      <div className="max-w-[1136px] mx-auto px-4 md:px-6">
        <FadeUp>
          <h2 className="text-[36px] font-bold mb-12 tracking-tight" style={{ color: tokens.uberBlack, lineHeight: 1.22 }}>
            What people are saying
          </h2>
        </FadeUp>
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                className="bg-white rounded-xl p-8"
                style={{ boxShadow: tokens.shadowLight }}
              >
                <div className="flex mb-6">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-current" style={{ color: tokens.uberBlack }} />
                  ))}
                </div>
                <p className="text-base mb-8" style={{ color: tokens.uberBlack, lineHeight: 1.5 }}>
                  "{t.text}"
                </p>
                <div>
                  <p className="font-bold text-base" style={{ color: tokens.uberBlack }}>{t.name}</p>
                  <p className="text-sm" style={{ color: tokens.bodyGray }}>{t.role}</p>
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
    <section className="py-24 bg-white">
      <div className="max-w-[800px] mx-auto px-4 md:px-6">
        <FadeUp>
          <h2 className="text-[36px] font-bold mb-12 tracking-tight" style={{ color: tokens.uberBlack, lineHeight: 1.22 }}>
            Frequently asked questions
          </h2>
        </FadeUp>

        <div className="divide-y" style={{ borderColor: '#e2e2e2' }}>
          {FAQ_ITEMS.map((item, i) => (
            <FadeUp key={i} delay={i * 0.05}>
              <div className="py-6">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between text-left"
                >
                  <span className="text-[18px] font-medium" style={{ color: tokens.uberBlack, lineHeight: 1.33 }}>{item.q}</span>
                  <motion.div animate={{ rotate: openIndex === i ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown className="h-6 w-6" style={{ color: tokens.uberBlack }} />
                  </motion.div>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openIndex === i ? 'auto' : 0, opacity: openIndex === i ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ overflow: 'hidden' }}
                >
                  <p className="pt-4 text-base" style={{ color: tokens.bodyGray, lineHeight: 1.5 }}>
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
  return (
    <section className="py-24 bg-white border-t" style={{ borderColor: '#e2e2e2' }}>
      <div className="max-w-[1136px] mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row gap-12 items-center justify-between">
          <FadeUp className="flex-1">
            <h2 className="text-[36px] font-bold mb-4 tracking-tight" style={{ color: tokens.uberBlack, lineHeight: 1.22 }}>
              Sign up to ride
            </h2>
            <p className="text-base" style={{ color: tokens.bodyGray, lineHeight: 1.5 }}>
              Enter your email to get started.
            </p>
          </FadeUp>

          <FadeUp delay={0.2} className="w-full md:w-auto flex-1 max-w-md">
            <form className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="Email address"
                className="w-full h-14 px-4 rounded-lg border focus:outline-none focus:ring-2 focus:ring-black bg-[#f3f3f3] border-transparent"
                style={{ color: tokens.uberBlack }}
              />
              <button
                type="button"
                className="h-14 px-8 rounded-full font-medium text-base transition-colors hover:opacity-80 flex items-center justify-between"
                style={{ backgroundColor: tokens.uberBlack, color: tokens.pureWhite }}
              >
                Continue <ArrowRight size={20} />
              </button>
            </form>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  const links = {
    Company: ['About us', 'Our offerings', 'Newsroom', 'Investors', 'Blog', 'Careers'],
    Products: ['Ride', 'Drive', 'Deliver', 'Eat', 'Uber for Business', 'Uber Freight'],
    Global: ['Safety', 'Diversity and Inclusion', 'Sustainability'],
    Travel: ['Reserve', 'Airports', 'Cities'],
  }

  return (
    <footer className="pt-20 pb-12" style={{ backgroundColor: tokens.uberBlack }}>
      <div className="max-w-[1136px] mx-auto px-4 md:px-6">
        <div className="mb-16">
           <span className="font-bold text-2xl tracking-tight" style={{ color: tokens.pureWhite }}>
            Uber
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <p className="font-medium text-lg mb-6" style={{ color: tokens.pureWhite }}>{group}</p>
              <ul className="space-y-4">
                {items.map(item => (
                  <li key={item}>
                    <a href="#" className="text-sm hover:underline" style={{ color: tokens.mutedGray }}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6" style={{ borderTop: '1px solid #333' }}>
          <div className="flex items-center gap-6">
            <p className="text-sm" style={{ color: tokens.mutedGray }}>© 2024 Uber Technologies Inc.</p>
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-sm hover:underline" style={{ color: tokens.mutedGray }}>Privacy</a>
            <a href="#" className="text-sm hover:underline" style={{ color: tokens.mutedGray }}>Accessibility</a>
            <a href="#" className="text-sm hover:underline" style={{ color: tokens.mutedGray }}>Terms</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function UberPage() {
  return (
    <div className={`${interFont.variable} font-sans`} style={{ backgroundColor: tokens.pureWhite }}>
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
