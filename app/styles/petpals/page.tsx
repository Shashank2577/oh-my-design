'use client'

import React, { useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Check, ChevronDown, Dog, Cat, Heart, MessageCircle, MapPin, Bone, Star } from 'lucide-react'
import { Quicksand } from 'next/font/google'

const quicksand = Quicksand({ subsets: ['latin'], variable: '--font-quicksand' })

// ─────────────────────────────────────────────
// DESIGN TOKENS
// ─────────────────────────────────────────────
const tokens = {
  background: '#F0FDF4', // Park Green Tint
  surface: '#FFFFFF', // Poodle White
  accent: '#FBBF24', // Golden Retriever
  accent2: '#EC4899', // Leash Pink
  border: '#DCFCE7',
  foreground: '#064E3B',
  mutedForeground: '#6B7280',
}

const PRODUCT_NAME = "PetPals"

// ─────────────────────────────────────────────
// MOTION ARCHITECTURE
// ─────────────────────────────────────────────
const physics = {
  pop: { type: 'spring', stiffness: 400, damping: 15, mass: 0.8 } as const,
  nudge: { type: 'spring', stiffness: 200, damping: 20 } as const,
  feed: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } as const
}

function PawPop({ children, delay = 0, className = '' }: { children: React.ReactNode, delay?: number, className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ ...physics.pop, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function StaggerPop({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        show: { transition: { staggerChildren: 0.1 } }
      }}
    >
      {children}
    </motion.div>
  )
}

const popItem: import('framer-motion').Variants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  show: { opacity: 1, scale: 1, y: 0, transition: physics.pop }
}

function NudgeButton({ children, className = '', style, onClick, type = "button", disabled }: { children: React.ReactNode, className?: string, style?: React.CSSProperties, onClick?: () => void, type?: "button" | "submit" | "reset", disabled?: boolean }) {
  return (
    <motion.button
      whileHover={disabled ? undefined : { scale: 1.05, y: -2, rotate: 1 }}
      whileTap={disabled ? undefined : { scale: 0.95 }}
      transition={physics.nudge}
      className={`rounded-full font-bold shadow-sm hover:shadow-md transition-shadow ${className} ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
      style={style}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </motion.button>
  )
}

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────
const FEATURES = [
  { icon: MapPin, title: "Find Local Playdates", desc: "Connect with pets in your neighborhood for park meetups." },
  { icon: Heart, title: "Share Cute Moments", desc: "Post photos and videos of your pet's best moments." },
  { icon: MessageCircle, title: "Pet Parent Chat", desc: "Ask for advice, find sitters, or just chat about pets." },
]

const STATS = [
  { value: "500k+", label: "Happy Pets" },
  { value: "2M+", label: "Playdates Made" },
  { value: "50k+", label: "Dog Parks Mapped" },
]

const PRICING = [
  {
    name: "Good Boy",
    price: "Free",
    period: "forever",
    description: "Everything you need to make furry friends.",
    features: ["Create pet profiles", "Find local parks", "Join community groups"],
    cta: "Join for Free",
    highlighted: false
  },
  {
    name: "Top Dog",
    price: "$5.99",
    period: "mo",
    description: "Premium features for the ultimate pet socialite.",
    features: ["Unlimited profile photos", "Ad-free experience", "Verified badge", "See who liked your pet"],
    cta: "Upgrade to Top Dog",
    highlighted: true
  }
]

const TESTIMONIALS = [
  {
    name: "Sarah & Max",
    role: "Golden Retriever Duo",
    text: "Max used to be so shy at the dog park. Thanks to PetPals, we found a regular playgroup, and now he can't wait to go!",
    rating: 5
  },
  {
    name: "David & Luna",
    role: "Cat Dad",
    text: "I didn't think a pet app would be for cats, but the indoor cat parent community here is amazing. Great advice and cute pics.",
    rating: 5
  },
  {
    name: "Emma & Charlie",
    role: "Adopted Mixed Breed",
    text: "Moved to a new city and didn't know anyone. PetPals helped me meet other dog owners in my building immediately.",
    rating: 5
  }
]

const FAQ_ITEMS = [
  { q: "Is PetPals just for dogs?", a: "Not at all! While dogs are very active on the app, we have communities for cats, birds, reptiles, and more." },
  { q: "Is my location public?", a: "No. You have full control over your privacy settings. You can choose to show your general neighborhood or keep it completely private." },
  { q: "Can I manage multiple pets?", a: "Yes! You can create individual profiles for all your pets under one main owner account." },
  { q: "How do playdates work?", a: "You can create a public event at a local park or invite specific friends for a private meetup." }
]

// ─────────────────────────────────────────────
// COMPONENTS
// ─────────────────────────────────────────────
function BlobBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          x: [0, 20, 0],
          y: [0, -20, 0],
          borderRadius: ["40% 60% 70% 30% / 40% 50% 60% 50%", "60% 40% 30% 70% / 60% 30% 70% 40%", "40% 60% 70% 30% / 40% 50% 60% 50%"]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: [0, 0, 1, 1] }}
        className="absolute -top-20 -left-20 w-96 h-96 opacity-40 blur-3xl"
        style={{ backgroundColor: tokens.accent }}
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: [0, -30, 0],
          y: [0, 30, 0],
          borderRadius: ["50% 50% 50% 50%", "30% 70% 70% 30% / 30% 30% 70% 70%", "50% 50% 50% 50%"]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: [0, 0, 1, 1], delay: 2 }}
        className="absolute top-40 -right-20 w-[30rem] h-[30rem] opacity-30 blur-3xl"
        style={{ backgroundColor: tokens.border }}
      />
    </div>
  )
}

function Navbar() {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={physics.pop}
      className="sticky top-0 z-50 bg-opacity-80 backdrop-blur-md"
      style={{ backgroundColor: tokens.background }}
    >
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <motion.div
            whileHover={{ rotate: 15, scale: 1.1 }}
            transition={physics.nudge}
            className="p-2 rounded-2xl"
            style={{ backgroundColor: tokens.accent }}
          >
            <Dog className="h-6 w-6" style={{ color: tokens.surface }} />
          </motion.div>
          <span className="text-2xl font-bold" style={{ color: tokens.foreground }}>
            {PRODUCT_NAME}
          </span>
        </div>
        <div className="hidden md:flex gap-8">
          {['Community', 'Features', 'Premium'].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} className="font-semibold hover:opacity-70 transition-opacity" style={{ color: tokens.foreground }}>
              {item}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <a href="#" className="hidden sm:block font-bold hover:opacity-70" style={{ color: tokens.foreground }}>Log In</a>
          <NudgeButton className="px-6 py-2.5" style={{ backgroundColor: tokens.accent, color: tokens.foreground }}>
            Get the App
          </NudgeButton>
        </div>
      </div>
    </motion.nav>
  )
}

function Hero() {
  return (
    <section className="relative pt-32 pb-24 overflow-hidden" style={{ backgroundColor: tokens.background }}>
      <BlobBackground />
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
        <div>
          <PawPop>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm font-bold shadow-sm" style={{ backgroundColor: tokens.surface, color: tokens.accent2 }}>
              <Heart className="w-4 h-4 fill-current" /> Over 500k pets connected
            </div>
          </PawPop>
          <PawPop delay={0.1}>
            <h1 className="text-6xl md:text-7xl font-bold leading-[1.1] mb-6" style={{ color: tokens.foreground }}>
              The social network for <span style={{ color: tokens.accent }}>tails & whiskers.</span>
            </h1>
          </PawPop>
          <PawPop delay={0.2}>
            <p className="text-xl mb-8 font-medium leading-relaxed" style={{ color: tokens.mutedForeground }}>
              Connect with local pet parents, arrange playdates, and share your furry friend's best moments with a community that actually cares.
            </p>
          </PawPop>
          <PawPop delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4">
              <NudgeButton className="h-14 px-8 text-lg" style={{ backgroundColor: tokens.foreground, color: tokens.surface }}>
                Download App
              </NudgeButton>
              <NudgeButton className="h-14 px-8 text-lg border-2" style={{ backgroundColor: 'transparent', borderColor: tokens.border, color: tokens.foreground }}>
                Explore the Park
              </NudgeButton>
            </div>
          </PawPop>
        </div>

        <div className="relative h-[600px] w-full">
          <PawPop delay={0.4} className="absolute inset-0">
            <div className="absolute inset-0 rounded-[3rem] shadow-2xl overflow-hidden transform rotate-3" style={{ background: `linear-gradient(to top right, ${tokens.accent}, ${tokens.accent2})` }}>
               <img
                  src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80"
                  alt="Happy dog looking at phone"
                  className="w-full h-full object-cover opacity-90 mix-blend-overlay"
                />
            </div>
          </PawPop>

          {/* Floating Social UI Cards */}
          <PawPop delay={0.6} className="absolute top-10 -left-10">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: [0.42, 0, 0.58, 1] }}
              className="p-4 rounded-2xl shadow-xl flex items-center gap-4"
              style={{ backgroundColor: tokens.surface }}
            >
              <img src="https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&q=80&w=100&h=100" className="w-12 h-12 rounded-full object-cover" alt="Dog avatar" />
              <div>
                <p className="font-bold text-sm" style={{ color: tokens.foreground }}>Max is at the park!</p>
                <p className="text-xs" style={{ color: tokens.mutedForeground }}>2 mins ago</p>
              </div>
            </motion.div>
          </PawPop>

          <PawPop delay={0.8} className="absolute bottom-20 -right-10">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: [0.42, 0, 0.58, 1], delay: 1 }}
              className="p-4 rounded-2xl shadow-xl flex items-center gap-3"
              style={{ backgroundColor: tokens.surface }}
            >
              <div className="p-2 rounded-full" style={{ backgroundColor: tokens.border }}>
                <Heart className="w-6 h-6 fill-current" style={{ color: tokens.accent2 }} />
              </div>
              <div>
                <p className="font-bold text-sm" style={{ color: tokens.foreground }}>Luna liked your photo</p>
              </div>
            </motion.div>
          </PawPop>
        </div>
      </div>
    </section>
  )
}

function Stats() {
  return (
    <section className="py-16 relative z-10" style={{ backgroundColor: tokens.surface }}>
      <div className="max-w-6xl mx-auto px-6">
        <StaggerPop>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x" style={{ borderColor: tokens.border }}>
            {STATS.map(s => (
              <motion.div key={s.label} variants={popItem} className="flex flex-col items-center py-4 md:py-0">
                <span className="text-5xl font-extrabold mb-2" style={{ color: tokens.foreground }}>{s.value}</span>
                <span className="text-lg font-semibold" style={{ color: tokens.mutedForeground }}>{s.label}</span>
              </motion.div>
            ))}
          </div>
        </StaggerPop>
      </div>
    </section>
  )
}

function Features() {
  return (
    <section id="features" className="py-24 relative overflow-hidden" style={{ backgroundColor: tokens.background }}>
      <div className="absolute right-0 top-0 w-[40rem] h-[40rem] rounded-full opacity-20 -translate-y-1/2 translate-x-1/2 blur-3xl" style={{ backgroundColor: tokens.accent2 }} />
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <PawPop>
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: tokens.foreground }}>
              Everything you need for a happy pet life.
            </h2>
          </div>
        </PawPop>

        <StaggerPop>
          <div className="grid md:grid-cols-3 gap-8">
            {FEATURES.map((f, i) => (
              <motion.div
                key={i}
                variants={popItem}
                whileHover={{ y: -10 }}
                transition={physics.nudge}
                className="p-8 rounded-[2rem] shadow-sm hover:shadow-xl transition-shadow bg-white relative overflow-hidden group"
              >
                <div className="w-16 h-16 rounded-[1.5rem] flex items-center justify-center mb-6" style={{ backgroundColor: tokens.border }}>
                  <f.icon className="h-8 w-8" style={{ color: tokens.foreground }} />
                </div>
                <h3 className="text-2xl font-bold mb-3" style={{ color: tokens.foreground }}>{f.title}</h3>
                <p className="font-medium text-lg leading-relaxed" style={{ color: tokens.mutedForeground }}>{f.desc}</p>
                <div className="absolute bottom-0 left-0 h-1.5 w-0 group-hover:w-full transition-all duration-300" style={{ backgroundColor: tokens.accent }} />
              </motion.div>
            ))}
          </div>
        </StaggerPop>
      </div>
    </section>
  )
}

function ProductDetail() {
  const [activeTab, setActiveTab] = useState(0)

  const tabs = [
    { name: 'Discover', icon: MapPin, img: "https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?auto=format&fit=crop&q=80" },
    { name: 'Community Feed', icon: Heart, img: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80" },
    { name: 'Groups', icon: MessageCircle, img: "https://images.unsplash.com/photo-1522276498395-f4f68f7f8454?auto=format&fit=crop&q=80" }
  ]

  return (
    <section className="py-24" style={{ backgroundColor: tokens.surface }}>
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <PawPop>
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: tokens.foreground }}>
              Your neighborhood, <br/><span style={{ color: tokens.accent2 }}>mapped for paws.</span>
            </h2>
            <p className="text-xl font-medium mb-10" style={{ color: tokens.mutedForeground }}>
              Find the best local dog parks, pet-friendly cafes, and hidden walking trails recommended by other pet parents.
            </p>

            <div className="space-y-4">
              {tabs.map((tab, i) => (
                <button
                  key={tab.name}
                  onClick={() => setActiveTab(i)}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${activeTab === i ? 'shadow-md' : 'hover:bg-gray-50'}`}
                  style={{ backgroundColor: activeTab === i ? tokens.background : 'transparent' }}
                >
                  <div className="p-3 rounded-xl" style={{ backgroundColor: activeTab === i ? tokens.surface : tokens.border }}>
                    <tab.icon className="w-6 h-6" style={{ color: activeTab === i ? tokens.accent2 : tokens.foreground }} />
                  </div>
                  <span className="text-xl font-bold" style={{ color: tokens.foreground }}>{tab.name}</span>
                </button>
              ))}
            </div>
          </PawPop>
        </div>

        <div className="relative">
          <PawPop delay={0.2}>
             <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={physics.pop}
                className="relative h-[500px] rounded-[3rem] overflow-hidden shadow-2xl"
              >
                <img src={tabs[activeTab].img} alt={tabs[activeTab].name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-8">
                   <p className="text-white text-2xl font-bold">{tabs[activeTab].name}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Decorative blobbies */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: [0, 0, 1, 1] }}
              className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full flex items-center justify-center shadow-lg"
              style={{ backgroundColor: tokens.accent }}
            >
              <Bone className="w-10 h-10 text-white transform -rotate-45" />
            </motion.div>
          </PawPop>
        </div>
      </div>
    </section>
  )
}

function Pricing() {
  return (
    <section id="premium" className="py-24 relative overflow-hidden" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <PawPop>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: tokens.foreground }}>
              Treat your pet to Premium
            </h2>
            <p className="text-xl font-medium" style={{ color: tokens.mutedForeground }}>
              Unlock the full park experience with Top Dog.
            </p>
          </div>
        </PawPop>

        <StaggerPop>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {PRICING.map((tier) => (
              <motion.div
                key={tier.name}
                variants={popItem}
                whileHover={{ y: -8 }}
                className="p-10 rounded-[2.5rem] relative flex flex-col bg-white"
                style={tier.highlighted
                  ? { boxShadow: `0 20px 40px -10px ${tokens.border}`, border: `2px solid ${tokens.accent}` }
                  : { boxShadow: `0 10px 30px -10px rgba(0,0,0,0.05)` }
                }
              >
                {tier.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-sm font-bold shadow-md" style={{ backgroundColor: tokens.accent, color: tokens.foreground }}>
                    Most Popular
                  </div>
                )}

                <h3 className="text-3xl font-bold mb-2" style={{ color: tokens.foreground }}>{tier.name}</h3>
                <div className="flex items-end gap-1 mb-4">
                  <span className="text-5xl font-extrabold" style={{ color: tokens.foreground }}>{tier.price}</span>
                  {tier.price !== 'Free' && <span className="text-lg font-semibold mb-1" style={{ color: tokens.mutedForeground }}>/{tier.period}</span>}
                </div>
                <p className="font-medium text-lg mb-8" style={{ color: tokens.mutedForeground }}>{tier.description}</p>

                <ul className="space-y-4 mb-8 flex-1">
                  {tier.features.map(f => (
                    <li key={f} className="flex items-center gap-3 font-medium text-lg">
                      <div className="p-1 rounded-full" style={{ backgroundColor: tokens.border }}>
                        <Check className="h-4 w-4" style={{ color: tokens.foreground }} />
                      </div>
                      <span style={{ color: tokens.foreground }}>{f}</span>
                    </li>
                  ))}
                </ul>

                <NudgeButton
                  className="w-full h-14 text-lg"
                  style={tier.highlighted ? { backgroundColor: tokens.accent, color: tokens.foreground } : { backgroundColor: tokens.background, color: tokens.foreground }}
                >
                  {tier.cta}
                </NudgeButton>
              </motion.div>
            ))}
          </div>
        </StaggerPop>
      </div>
    </section>
  )
}

function Testimonials() {
  return (
    <section id="community" className="py-24 relative overflow-hidden" style={{ backgroundColor: tokens.surface }}>
      <div className="max-w-6xl mx-auto px-6">
        <PawPop>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold" style={{ color: tokens.foreground }}>
              Loved by the pack
            </h2>
          </div>
        </PawPop>

        <StaggerPop>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                variants={popItem}
                className="p-8 rounded-[2rem] relative bg-white border-2"
                style={{
                  borderColor: tokens.background,
                  boxShadow: `0 10px 30px -10px rgba(0,0,0,0.05)`
                }}
              >
                <div className="flex mb-6 gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" style={{ color: tokens.accent }} />
                  ))}
                </div>
                <p className="font-medium text-lg leading-relaxed mb-6" style={{ color: tokens.foreground }}>"{t.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold" style={{ backgroundColor: tokens.background, color: tokens.accent2 }}>
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-lg" style={{ color: tokens.foreground }}>{t.name}</p>
                    <p className="font-medium text-sm" style={{ color: tokens.mutedForeground }}>{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </StaggerPop>
      </div>
    </section>
  )
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-24" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-3xl mx-auto px-6">
        <PawPop>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold" style={{ color: tokens.foreground }}>
              Curious? Ask away.
            </h2>
          </div>
        </PawPop>

        <div className="space-y-4">
          {FAQ_ITEMS.map((item, i) => (
            <PawPop key={i} delay={i * 0.1}>
              <div className="rounded-2xl overflow-hidden bg-white shadow-sm transition-shadow hover:shadow-md">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-bold text-lg" style={{ color: tokens.foreground }}>{item.q}</span>
                  <motion.span
                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    className="p-1 rounded-full"
                    style={{ backgroundColor: tokens.background }}
                  >
                    <ChevronDown className="h-6 w-6" style={{ color: tokens.foreground }} />
                  </motion.span>
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div className="px-6 pb-6">
                        <p className="font-medium text-lg leading-relaxed" style={{ color: tokens.mutedForeground }}>
                          {item.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </PawPop>
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
    <section className="py-24 relative overflow-hidden" style={{ backgroundColor: tokens.accent }}>
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white opacity-20 rounded-full blur-3xl translate-y-1/2 translate-x-1/2" />

      <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
        <PawPop>
          <div className="inline-flex justify-center mb-6">
            <div className="bg-white p-4 rounded-full shadow-lg">
              <Dog className="w-10 h-10" style={{ color: tokens.foreground }} />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: tokens.foreground }}>
            Join the Newsletter Pack
          </h2>
          <p className="text-xl font-medium mb-10" style={{ color: tokens.foreground, opacity: 0.8 }}>
            Get the best pet care tips and cute photos delivered weekly.
          </p>

          {status === 'success' ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white p-6 rounded-2xl inline-block shadow-lg"
            >
              <p className="font-bold text-2xl flex items-center gap-2" style={{ color: tokens.foreground }}>
                <Heart className="w-6 h-6 fill-current" style={{ color: tokens.accent2 }} />
                Welcome to the pack!
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto bg-white p-2 rounded-full shadow-lg">
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="flex-1 h-14 px-6 rounded-full font-medium text-lg focus:outline-none"
                style={{ color: tokens.foreground }}
              />
              <NudgeButton
                type="submit"
                disabled={status === 'loading'}
                className="h-14 px-8 text-lg w-full sm:w-auto"
                style={{ backgroundColor: tokens.foreground, color: tokens.surface }}
              >
                {status === 'loading' ? 'Fetching...' : 'Subscribe'}
              </NudgeButton>
            </form>
          )}
        </PawPop>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="py-16 pb-8" style={{ backgroundColor: tokens.surface }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-xl" style={{ backgroundColor: tokens.accent }}>
                <Dog className="h-6 w-6" style={{ color: tokens.surface }} />
              </div>
              <span className="text-2xl font-bold" style={{ color: tokens.foreground }}>
                {PRODUCT_NAME}
              </span>
            </div>
            <p className="font-medium text-lg" style={{ color: tokens.mutedForeground }}>
              Connecting pets and their people.
            </p>
          </div>

          <div>
            <p className="font-bold text-xl mb-4" style={{ color: tokens.foreground }}>App</p>
            <ul className="space-y-3 font-medium text-lg">
              {['Download', 'Features', 'Premium', 'Safety'].map(item => (
                <li key={item}>
                  <a href="#" className="hover:opacity-70 transition-opacity" style={{ color: tokens.mutedForeground }}>{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-bold text-xl mb-4" style={{ color: tokens.foreground }}>Community</p>
            <ul className="space-y-3 font-medium text-lg">
              {['Guidelines', 'Events', 'Blog', 'Stories'].map(item => (
                <li key={item}>
                  <a href="#" className="hover:opacity-70 transition-opacity" style={{ color: tokens.mutedForeground }}>{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-bold text-xl mb-4" style={{ color: tokens.foreground }}>Support</p>
            <ul className="space-y-3 font-medium text-lg">
              {['Help Center', 'Contact', 'Privacy', 'Terms'].map(item => (
                <li key={item}>
                  <a href="#" className="hover:opacity-70 transition-opacity" style={{ color: tokens.mutedForeground }}>{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t-2 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderColor: tokens.border }}>
          <p className="font-medium" style={{ color: tokens.mutedForeground }}>
            © {new Date().getFullYear()} {PRODUCT_NAME}. All rights reserved.
          </p>
          <a
            href="/"
            className="font-bold px-6 py-2 rounded-full transition-colors hover:bg-gray-50"
            style={{ color: tokens.foreground }}
          >
            ← Back to Gallery
          </a>
        </div>
      </div>
    </footer>
  )
}

// ─────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────
export default function PetPalsPage() {
  return (
    <div className={`min-h-screen ${quicksand.variable} font-sans`} style={{ backgroundColor: tokens.background }}>
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
