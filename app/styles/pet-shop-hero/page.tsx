'use client'

import { motion, useReducedMotion, useInView, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Bebas_Neue, Inter } from 'next/font/google'
import {
  ShoppingCart, ChevronDown, ArrowRight, Check, Star,
  Package, Zap, Shield, Search, Menu, Filter, Heart
} from 'lucide-react'

// ─────────────────────────────────────────────
// FONTS
// ─────────────────────────────────────────────
const primaryFont = Bebas_Neue({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-primary',
  display: 'swap',
})

const secondaryFont = Inter({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-secondary',
  display: 'swap',
})

// ─────────────────────────────────────────────
// DESIGN TOKENS
// ─────────────────────────────────────────────
const tokens = {
  background: '#F0F2F5',
  backgroundAlt: '#FFFFFF',
  surface: '#FFFFFF',
  foreground: '#2F3542',
  muted: '#F1F2F6',
  mutedForeground: '#747D8C',
  border: '#E1E4E8',
  accent1: '#FFD700',
  accent2: '#FF4757',
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
      transition={{ type: "spring", stiffness: 200, damping: 20, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function StaggerImpact({ children }: { children: React.ReactNode }) {
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
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 15 }
  },
}

function HeroButton({ children, onClick, className = '', primary = true, type = 'button', disabled = false }: { children: React.ReactNode, onClick?: () => void, className?: string, primary?: boolean, type?: 'button' | 'submit' | 'reset', disabled?: boolean }) {
    return (
        <motion.button
            type={type}
            disabled={disabled}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-8 py-4 font-bold uppercase tracking-wider text-lg relative overflow-hidden group ${className}`}
            style={{
                backgroundColor: primary ? tokens.accent1 : tokens.surface,
                color: primary ? '#000000' : tokens.foreground,
                border: primary ? 'none' : `2px solid ${tokens.foreground}`,
                borderRadius: '4px' // very slight rounding for a sharper look
            }}
            onClick={onClick}
        >
            {/* Shimmer effect */}
            {primary && (
                <motion.div
                    className="absolute inset-0 -translate-x-full"
                    style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)' }}
                    animate={{ translateX: ['-100%', '200%'] }}
                    transition={{ repeat: Infinity, duration: 2, ease: [0, 0, 1, 1] as [number, number, number, number], repeatDelay: 3 }}
                />
            )}
            <span className="relative z-10 flex items-center justify-center gap-2">
                {children}
            </span>
        </motion.button>
    )
}

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────
const PRODUCT_NAME = 'PetShopHero'
const TAGLINE = 'Unleash The Joy.'
const DESCRIPTION = 'Premium gear, treats, and toys for the everyday hero in your life. Because they deserve the best.'

const NAV_LINKS = ['Shop All', 'New Arrivals', 'Brands', 'Offers']

const STATS = [
  { value: '500K+', label: 'Happy Pets' },
  { value: '24/7', label: 'Support' },
  { value: '100%', label: 'Guarantee' },
  { value: '5k+', label: 'Products' },
]

const FEATURES = [
  { icon: Package, title: 'Same-Day Dispatch', description: 'Order before 2 PM and your pet\'s new favorite thing leaves our warehouse today.' },
  { icon: Zap, title: 'Hero Deals', description: 'Exclusive flash sales that reward our most loyal customers with massive savings.' },
  { icon: Shield, title: 'Vet Approved', description: 'Every treat and supplement is rigorously tested and approved by our board of veterinarians.' },
  { icon: Star, title: 'Premium Quality', description: 'We source only the highest quality materials, ensuring toys last longer and play harder.' },
  { icon: Heart, title: 'Give Back', description: 'Every purchase helps fund local shelters. You buy, we donate.' },
  { icon: Check, title: 'Easy Returns', description: 'Not a perfect fit? No problem. Free returns for 30 days, no questions asked.' },
]

const PRICING = [
  {
    name: 'Hero Starter',
    price: '$29',
    period: '/month',
    description: 'A curated box of 2 tough toys and 2 bags of natural treats.',
    features: ['2 Durable Toys', '2 Natural Treats', 'Free Shipping', 'Cancel Anytime'],
    cta: 'Subscribe Now',
    highlighted: false,
  },
  {
    name: 'Hero Pro',
    price: '$49',
    period: '/month',
    description: 'The ultimate monthly reward. 3 toys, 3 treats, and a surprise accessory.',
    features: ['3 Premium Toys', '3 Artisan Treats', '1 Surprise Accessory', 'Priority Support', 'Double Donation'],
    cta: 'Get Pro',
    highlighted: true,
  },
  {
    name: 'Hero Elite',
    price: '$89',
    period: '/month',
    description: 'For the multi-pet household or the very spoiled single child.',
    features: ['5 Premium Toys', '5 Artisan Treats', '2 Surprise Accessories', 'VIP Flash Sale Access', 'Dedicated Concierge'],
    cta: 'Join Elite',
    highlighted: false,
  },
]

const TESTIMONIALS = [
  {
    name: 'Alex D.',
    role: 'Owner of Buster',
    company: 'Pitbull Mix',
    text: 'Finally, toys that Buster can\'t destroy in 5 minutes! The monthly box is the highlight of his week.',
    rating: 5,
  },
  {
    name: 'Maria S.',
    role: 'Owner of Whiskers',
    company: 'Maine Coon',
    text: 'The shipping is incredibly fast, and the treats are so high quality. Whiskers is obsessed.',
    rating: 5,
  },
  {
    name: 'Jordan T.',
    role: 'Owner of Zeus',
    company: 'German Shepherd',
    text: 'I love that my purchases help shelters. It feels good to spoil my dog and help others at the same time.',
    rating: 5,
  },
]

const FAQ_ITEMS = [
  { q: 'How fast is shipping?', a: 'We offer same-day dispatch for orders placed before 2 PM. Standard shipping takes 2-4 business days.' },
  { q: 'What is your return policy?', a: 'We offer a 30-day, no-questions-asked return policy. If your pet doesn\'t love it, send it back for a full refund.' },
  { q: 'Are your treats made in the USA?', a: 'Yes! All of our treats are sourced and manufactured in the USA using only natural ingredients.' },
  { q: 'Can I customize my subscription box?', a: 'Absolutely. You can update your pet\'s profile at any time to account for allergies, heavy chewers, or size changes.' },
  { q: 'Do you ship internationally?', a: 'Currently, we only ship within the US and Canada, but we are looking to expand soon!' },
  { q: 'How much do you donate?', a: 'We donate 5% of all profits directly to a rotating list of verified, no-kill shelters.' },
]

// ─────────────────────────────────────────────
// COMPONENTS
// ─────────────────────────────────────────────

function Navbar() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 border-b"
      style={{ borderColor: tokens.border, backgroundColor: tokens.surface }}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
            <Zap className="h-6 w-6" style={{ color: tokens.accent2 }} fill={tokens.accent2} />
            <span className="font-primary text-3xl tracking-wide uppercase mt-1" style={{ color: tokens.foreground }}>
            {PRODUCT_NAME}
            </span>
        </div>

        <div className="hidden md:flex flex-1 max-w-md mx-8 relative">
            <input
                type="text"
                placeholder="Search for toys, treats, brands..."
                className="w-full h-10 pl-10 pr-4 rounded-full border text-sm font-medium focus:outline-none transition-colors"
                style={{ backgroundColor: tokens.muted, borderColor: 'transparent', color: tokens.foreground }}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: tokens.mutedForeground }} />
        </div>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-sm font-bold uppercase tracking-wider transition-colors hover:opacity-70"
              style={{ color: tokens.foreground }}
            >
              {link}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <ShoppingCart className="h-6 w-6" style={{ color: tokens.foreground }} />
            </motion.button>
            <motion.button className="md:hidden" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Menu className="h-6 w-6" style={{ color: tokens.foreground }} />
            </motion.button>
        </div>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section className="min-h-[90dvh] flex items-center pt-20 relative overflow-hidden" style={{ backgroundColor: tokens.background }}>
      {/* Dynamic background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute top-0 right-0 w-[50vw] h-[100vh]"
            style={{ background: `linear-gradient(135deg, transparent, ${tokens.accent1}40)` }}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] }}
          />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 w-full relative z-10 flex flex-col md:flex-row items-center gap-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex-1"
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="inline-block px-4 py-1 mb-6 border-2 font-bold uppercase tracking-widest text-sm"
            style={{ borderColor: tokens.accent2, color: tokens.accent2, backgroundColor: 'white' }}
          >
            🔥 Super Sale: Up to 50% Off
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.1 }}
            className="font-primary text-7xl md:text-9xl leading-[0.85] mb-6 uppercase"
            style={{ color: tokens.foreground }}
          >
            Unleash<br/><span style={{ color: tokens.accent2 }}>The Joy.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
            className="text-lg md:text-xl mb-10 max-w-md font-medium leading-relaxed"
            style={{ color: tokens.mutedForeground }}
          >
            {DESCRIPTION}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <HeroButton>
              Shop Collection
            </HeroButton>
          </motion.div>
        </motion.div>

        {/* Floating Product Hero Image Placeholder */}
        <motion.div
            className="flex-1 w-full h-[500px] relative"
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}
        >
            <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center border-4" style={{ backgroundColor: tokens.surface, borderColor: tokens.accent1 }}>
                <p className="font-primary text-4xl text-gray-300">Product Image</p>
                {/* Floating Treat Particles */}
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-8 h-8 rounded-full"
                        style={{ backgroundColor: tokens.accent2, opacity: 0.5 }}
                        animate={{
                            y: [0, -20, 0],
                            x: [0, (i % 2 === 0 ? 10 : -10), 0],
                            rotate: [0, 180, 360]
                        }}
                        transition={{ duration: 3 + i, repeat: Infinity, ease: [0.42, 0, 0.58, 1] as [number, number, number, number] }}
                        initial={{ top: `${20 + i * 15}%`, left: `${10 + i * 20}%` }}
                    />
                ))}
            </div>
        </motion.div>
      </div>
    </section>
  )
}

function ShopByVibe() {
    const [activeVibe, setActiveVibe] = useState('couchPotato')

    const vibes = [
        { id: 'couchPotato', name: 'The Couch Potato', color: '#89CFF0', icon: '💤' },
        { id: 'athlete', name: 'The Athlete', color: '#FF4757', icon: '⚡' },
        { id: 'thinker', name: 'The Thinker', color: '#6C5CE7', icon: '🧩' },
    ]

    return (
        <section className="py-24 relative overflow-hidden transition-colors duration-700" style={{ backgroundColor: tokens.backgroundAlt }}>
            <div className="max-w-7xl mx-auto px-6">
                <FadeUp>
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b-2 pb-6" style={{ borderColor: tokens.border }}>
                        <div>
                            <h2 className="font-primary text-5xl md:text-7xl uppercase" style={{ color: tokens.foreground }}>Shop by Vibe</h2>
                            <p className="font-medium text-lg mt-2" style={{ color: tokens.mutedForeground }}>Find the perfect gear for their personality.</p>
                        </div>
                    </div>
                </FadeUp>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {vibes.map((vibe) => (
                        <motion.button
                            key={vibe.id}
                            onClick={() => setActiveVibe(vibe.id)}
                            className="p-8 rounded-2xl flex flex-col items-center justify-center border-4 transition-colors relative overflow-hidden group"
                            style={{
                                borderColor: activeVibe === vibe.id ? vibe.color : tokens.border,
                                backgroundColor: activeVibe === vibe.id ? vibe.color : tokens.surface,
                                color: activeVibe === vibe.id ? 'white' : tokens.foreground
                            }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <span className="text-5xl mb-4 block group-hover:scale-125 transition-transform">{vibe.icon}</span>
                            <span className="font-primary text-3xl uppercase tracking-wider">{vibe.name}</span>
                        </motion.button>
                    ))}
                </div>

                {/* Vibe Products Grid */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeVibe}
                        initial={{ opacity: 0, rotateY: -90, scale: 0.8 }}
                        animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                        exit={{ opacity: 0, rotateY: 90, scale: 0.8 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-6"
                    >
                        {[1, 2, 3, 4].map((item) => (
                            <div key={item} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 group cursor-pointer">
                                <div className="aspect-square bg-gray-100 rounded-lg mb-4 relative overflow-hidden">
                                    {/* Hover Add to Cart overlay */}
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <motion.button
                                            whileTap={{ scale: 0.9 }}
                                            className="bg-white text-black font-bold uppercase px-6 py-3 rounded text-sm"
                                        >
                                            + Add
                                        </motion.button>
                                    </div>
                                </div>
                                <h4 className="font-bold text-gray-900 mb-1">Vibe Product {item}</h4>
                                <p className="font-bold text-lg" style={{ color: tokens.accent2 }}>$24.99</p>
                            </div>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    )
}

function Stats() {
  return (
    <section className="py-20 border-y-4" style={{ borderColor: tokens.foreground, backgroundColor: tokens.accent1 }}>
      <div className="max-w-7xl mx-auto px-6">
        <StaggerImpact>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map(stat => (
              <motion.div key={stat.label} variants={staggerItem} className="text-center">
                <p className="font-primary text-6xl md:text-7xl text-black leading-none mb-2">{stat.value}</p>
                <p className="font-bold text-sm tracking-widest uppercase text-black">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </StaggerImpact>
      </div>
    </section>
  )
}

function Features() {
  return (
    <section id="features" className="py-32" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-7xl mx-auto px-6">
        <FadeUp>
          <div className="text-center mb-20">
            <h2 className="font-primary text-6xl md:text-8xl uppercase tracking-wide mb-6" style={{ color: tokens.foreground }}>
              Why We're Different
            </h2>
          </div>
        </FadeUp>

        <StaggerImpact>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FEATURES.map(feature => (
              <motion.div
                key={feature.title}
                variants={staggerItem}
                className="p-8 bg-white border-2 hover:shadow-xl transition-shadow"
                style={{ borderColor: tokens.border }}
                whileHover={{ y: -5, borderColor: tokens.accent1 }}
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: tokens.accent1 }}>
                    <feature.icon className="h-6 w-6 text-black" strokeWidth={2.5} />
                </div>
                <h3 className="font-primary text-3xl uppercase tracking-wider mb-3" style={{ color: tokens.foreground }}>{feature.title}</h3>
                <p className="text-base font-medium leading-relaxed" style={{ color: tokens.mutedForeground }}>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </StaggerImpact>
      </div>
    </section>
  )
}

function Pricing() {
  return (
    <section id="offers" className="py-32" style={{ backgroundColor: tokens.backgroundAlt }}>
      <div className="max-w-7xl mx-auto px-6">
        <FadeUp>
          <div className="text-center mb-20">
            <h2 className="font-primary text-6xl md:text-8xl uppercase tracking-wide mb-4" style={{ color: tokens.foreground }}>Hero Subscriptions</h2>
            <p className="font-bold text-xl" style={{ color: tokens.mutedForeground }}>The easiest way to keep their tail wagging.</p>
          </div>
        </FadeUp>

        <StaggerImpact>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PRICING.map(tier => (
              <motion.div
                key={tier.name}
                variants={staggerItem}
                className="p-10 border-4 relative flex flex-col bg-white"
                style={{
                  borderColor: tier.highlighted ? tokens.accent2 : tokens.border,
                  transform: tier.highlighted ? 'scale(1.05)' : 'scale(1)',
                  zIndex: tier.highlighted ? 10 : 1
                }}
              >
                {tier.highlighted && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-6 py-2 font-primary text-xl tracking-widest text-white uppercase" style={{ backgroundColor: tokens.accent2 }}>
                    Best Value
                  </div>
                )}
                <h3 className="font-primary text-4xl uppercase tracking-wide mb-2" style={{ color: tokens.foreground }}>{tier.name}</h3>
                <p className="text-sm font-medium h-12 mb-6" style={{ color: tokens.mutedForeground }}>{tier.description}</p>
                <div className="flex items-end gap-1 mb-8 pb-8 border-b-2" style={{ borderColor: tokens.border }}>
                  <span className="font-primary text-6xl leading-none" style={{ color: tokens.foreground }}>{tier.price}</span>
                  <span className="font-bold text-sm mb-1" style={{ color: tokens.mutedForeground }}>{tier.period}</span>
                </div>

                <ul className="space-y-4 mb-10 flex-1">
                  {tier.features.map(f => (
                    <li key={f} className="flex items-center gap-3">
                      <Check className="h-5 w-5" style={{ color: tokens.accent2 }} strokeWidth={3} />
                      <span className="font-bold text-sm" style={{ color: tokens.foreground }}>{f}</span>
                    </li>
                  ))}
                </ul>
                <HeroButton primary={tier.highlighted} className="w-full text-sm">
                  {tier.cta}
                </HeroButton>
              </motion.div>
            ))}
          </div>
        </StaggerImpact>
      </div>
    </section>
  )
}

function Testimonials() {
  return (
    <section className="py-32 border-y-2" style={{ borderColor: tokens.border, backgroundColor: tokens.background }}>
      <div className="max-w-7xl mx-auto px-6">
        <FadeUp>
          <div className="mb-16">
            <h2 className="font-primary text-6xl md:text-8xl uppercase tracking-wide" style={{ color: tokens.foreground }}>The Word on<br/>the Street</h2>
          </div>
        </FadeUp>

        <StaggerImpact>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map(t => (
              <motion.div
                key={t.name}
                variants={staggerItem}
                className="p-8 bg-white border-2"
                style={{ borderColor: tokens.border }}
              >
                <div className="flex mb-6">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" style={{ color: tokens.accent1 }} />
                  ))}
                </div>
                <p className="font-medium text-lg leading-relaxed mb-8" style={{ color: tokens.foreground }}>"{t.text}"</p>
                <div className="pt-6 border-t-2" style={{ borderColor: tokens.muted }}>
                  <p className="font-bold text-base" style={{ color: tokens.foreground }}>{t.name}</p>
                  <p className="font-medium text-sm" style={{ color: tokens.mutedForeground }}>{t.role} · {t.company}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </StaggerImpact>
      </div>
    </section>
  )
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="py-32" style={{ backgroundColor: tokens.backgroundAlt }}>
      <div className="max-w-4xl mx-auto px-6">
        <FadeUp>
          <div className="text-center mb-20">
            <h2 className="font-primary text-6xl md:text-8xl uppercase tracking-wide" style={{ color: tokens.foreground }}>FAQS</h2>
          </div>
        </FadeUp>
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, i) => (
            <FadeUp key={i} delay={i * 0.05}>
              <div className="border-2 bg-white" style={{ borderColor: tokens.border }}>
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  aria-expanded={openIndex === i}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-bold text-lg" style={{ color: tokens.foreground }}>{item.q}</span>
                  <motion.div
                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="h-6 w-6" style={{ color: tokens.accent2 }} strokeWidth={3} />
                  </motion.div>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openIndex === i ? 'auto' : 0, opacity: openIndex === i ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] }}
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
    setTimeout(() => setStatus('success'), 1000)
  }

  return (
    <section className="py-32" style={{ backgroundColor: tokens.foreground }}>
      <div className="max-w-4xl mx-auto px-6 text-center">
        <FadeUp>
          <h2 className="font-primary text-6xl md:text-8xl text-white uppercase tracking-wide mb-4">Join The Pack</h2>
          <p className="font-medium text-lg mb-12" style={{ color: tokens.mutedForeground }}>
            Get 15% off your first order, plus exclusive access to flash sales.
          </p>

          {status === 'success' ? (
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="font-primary text-4xl text-white uppercase tracking-wider"
            >
              Welcome to the team! Check your inbox.
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
              <input
                type="email"
                required
                placeholder="ENTER YOUR EMAIL"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="flex-1 h-16 px-6 border-4 font-bold text-sm uppercase tracking-wider focus:outline-none"
                style={{ borderColor: tokens.border, backgroundColor: 'white', color: tokens.foreground }}
              />
              <HeroButton type="submit" disabled={status === 'loading'} className="h-16">
                {status === 'loading' ? 'Sending...' : 'Subscribe'}
              </HeroButton>
            </form>
          )}
        </FadeUp>
      </div>
    </section>
  )
}

function Footer() {
  const links = {
    Shop: ['All Products', 'Toys', 'Treats', 'Accessories', 'Sale'],
    Help: ['Track Order', 'Returns', 'FAQ', 'Contact Us'],
    About: ['Our Story', 'Shelter Partners', 'Careers', 'Blog'],
  }

  return (
    <footer className="py-20" style={{ backgroundColor: tokens.backgroundAlt, borderTop: `2px solid ${tokens.border}` }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-16">
          <div className="col-span-2 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
                <Zap className="h-6 w-6" style={{ color: tokens.accent2 }} fill={tokens.accent2} />
                <span className="font-primary text-3xl tracking-wide uppercase mt-1" style={{ color: tokens.foreground }}>
                {PRODUCT_NAME}
                </span>
            </div>
            <p className="text-sm font-medium leading-relaxed max-w-sm" style={{ color: tokens.mutedForeground }}>
              Because they are the heroes of our everyday lives. Equipping them with the best gear since 2026.
            </p>
          </div>
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <p className="font-primary text-2xl uppercase tracking-wider mb-6" style={{ color: tokens.foreground }}>{group}</p>
              <ul className="space-y-4">
                {items.map(item => (
                  <li key={item}>
                    <a href="#" className="text-sm font-bold uppercase tracking-wider hover:text-black transition-colors" style={{ color: tokens.mutedForeground }}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t-2 gap-4" style={{ borderColor: tokens.border }}>
          <p className="text-sm font-bold uppercase tracking-wider" style={{ color: tokens.mutedForeground }}>
            © 2026 {PRODUCT_NAME}. All rights reserved.
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
        <ShopByVibe />
        <Stats />
        <Features />
        <Pricing />
        <Testimonials />
        <FAQ />
        <Newsletter />
      </main>
      <Footer />
    </div>
  )
}
