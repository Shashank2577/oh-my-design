'use client'

import { motion, useReducedMotion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import { Fredoka, Quicksand } from 'next/font/google'
import {
  Star, ChevronDown, ArrowRight, Check, Dog, Bone, Heart, Sparkles, Smile, Sun,
  Award, Clock, Video
} from 'lucide-react'

// Using Fredoka since Fredoka One is deprecated in next/font
const headingsFont = Fredoka({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-headings',
  display: 'swap',
})

const bodyFont = Quicksand({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const tokens = {
  background: '#FFF9E6', // Soft Sun
  backgroundAlt: '#FFFFFF',
  foreground: '#2D3436',
  muted: '#FFF0C2',
  mutedForeground: '#636E72',
  border: 'rgba(255, 107, 107, 0.2)',
  accent1: '#FF6B6B', // Kibble Red
  accent2: '#4D96FF', // Playtime Blue
}

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-5% 0px' })
  const shouldReduce = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={shouldReduce ? false : { opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ type: "spring", stiffness: 600, damping: 10, mass: 0.5, delay }}
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
        visible: { transition: { staggerChildren: 0.1 } },
      }}
    >
      {children}
    </motion.div>
  )
}

const staggerItem: import('framer-motion').Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { type: "spring" as const, stiffness: 300, damping: 20 } },
}

const PRODUCT_NAME = 'PuppyPrimer'
const TAGLINE = 'Train with Joy. Bond for Life.'
const DESCRIPTION = 'The playful, positive-reinforcement training app that turns stubborn pups into perfect companions. Every lesson is a game, every milestone is a party!'

const NAV_LINKS = ['Games', 'Milestones', 'Pricing', 'Pawtners']

const STATS = [
  { value: '1M+', label: 'Treats Earned' },
  { value: '50k+', label: 'Happy Pups' },
  { value: '100+', label: 'Video Games' },
  { value: '4.9/5', label: 'App Rating' },
]

const FEATURES = [
  { icon: Sparkles, title: 'Positive Vibes Only', description: 'We strictly use positive reinforcement. No yelling, no shock collars. Just love, treats, and good times.' },
  { icon: Video, title: 'Bite-Sized Videos', description: 'Watch quick, 2-minute video demonstrations of every trick before you try it with your furry friend.' },
  { icon: Award, title: 'Earn Real Treats', description: 'Complete challenges to earn "Bones" in the app, which can be redeemed for real treats shipped to your door!' },
  { icon: Clock, title: '5 Minutes a Day', description: 'Puppies have short attention spans. Our daily games are designed to be quick, effective, and exhausting.' },
  { icon: Heart, title: 'Socialization Guides', description: 'Step-by-step checklists to safely introduce your pup to new people, places, and other animals.' },
  { icon: Smile, title: 'Potty Training Magic', description: 'Our predictive algorithm reminds you exactly when to take them out, practically eliminating indoor accidents.' },
]

const PRICING = [
  {
    name: 'Puppy Basics',
    price: '$0',
    period: 'forever',
    description: 'Start off on the right paw.',
    features: ['Potty Training Guide', 'First 5 Basic Commands', 'Bite Inhibition Tips', 'Community Forum Access'],
    cta: 'Start Playing',
    highlighted: false,
  },
  {
    name: 'Good Citizen',
    price: '$12',
    period: 'per month',
    description: 'Everything you need for a well-behaved dog.',
    features: ['All 100+ Training Games', 'Video Library Access', 'Daily Routine Planner', 'Socialization Checklist', 'Direct Vet-Tech Chat'],
    cta: 'Unlock Everything',
    highlighted: true,
  },
  {
    name: 'Top Dog',
    price: '$99',
    period: 'per year',
    description: 'The ultimate bonding experience.',
    features: ['Everything in Good Citizen', '2 Months Free', 'Monthly Treat Box Delivery', '1-on-1 Virtual Coaching', 'Advanced Trick Library'],
    cta: 'Get Top Dog',
    highlighted: false,
  },
]

const TESTIMONIALS = [
  {
    name: 'Jessica & "Barnaby"',
    role: 'Golden Doodle',
    company: 'Graduated 2023',
    text: 'Barnaby used to chew EVERYTHING. The "Leave It" game in this app completely saved my furniture and my sanity!',
    rating: 5,
  },
  {
    name: 'Mike & "Rocket"',
    role: 'Jack Russell Terrier',
    company: 'Graduated 2024',
    text: 'I thought Rocket was untrainable. Turns out, we just needed to make it a game. He loves the app as much as I do.',
    rating: 5,
  },
  {
    name: 'Chloe & "Luna"',
    role: 'Rescue Mix',
    company: 'Graduated 2023',
    text: 'The socialization checklist gave me so much confidence. Luna used to be terrified of loud noises, now she’s a brave girl.',
    rating: 5,
  },
]

const FAQ_ITEMS = [
  { q: 'Is my dog too old for PuppyPrimer?', a: 'You can definitely teach an old dog new tricks! While geared towards puppies, our positive reinforcement games work for dogs of all ages.' },
  { q: 'What kind of treats do I need?', a: 'Any high-value treat your dog loves! We recommend small, soft treats so they don\'t spend too much time chewing between repetitions.' },
  { q: 'How long does shipping take for earned treats?', a: 'If you earn a physical treat box through our Top Dog plan or by cashing in your in-app "Bones", it usually arrives within 3-5 business days.' },
  { q: 'Can I use the app offline?', a: 'Yes! Once you download a video lesson, it\'s saved to your phone so you can train in the park where cell service might be spotty.' },
]

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b" style={{ borderColor: tokens.border }}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: [0, -15, 15, -15, 15, 0], scale: 1.1 }}
            transition={{ duration: 0.5 }}
          >
            <Dog className="h-8 w-8" style={{ color: tokens.accent1 }} strokeWidth={2.5} />
          </motion.div>
          <span className={`font-bold text-2xl tracking-tight ${headingsFont.variable} font-headings`} style={{ color: tokens.accent2 }}>
            {PRODUCT_NAME}
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <motion.a
              key={link}
              href={`#${link.toLowerCase()}`}
              className={`text-lg font-bold ${headingsFont.variable} font-headings transition-colors`}
              style={{ color: tokens.mutedForeground }}
              whileHover={{ y: -3, color: tokens.accent1 }}
            >
              {link}
            </motion.a>
          ))}
        </div>
        <motion.button
          whileHover={{ scale: 1.1, scaleY: 0.9 }} // Squishy click
          whileTap={{ scale: 0.9, scaleY: 1.1 }}
          className={`px-6 h-12 rounded-full font-bold text-lg shadow-[0_4px_0_rgba(0,0,0,0.1)] hover:shadow-[0_2px_0_rgba(0,0,0,0.1)] hover:translate-y-[2px] transition-all ${headingsFont.variable} font-headings`}
          style={{ backgroundColor: tokens.accent1, color: tokens.backgroundAlt }}
        >
          Play Now
        </motion.button>
      </div>
    </nav>
  )
}

function BouncyText({ text, className = "", style }: { text: string, className?: string, style?: React.CSSProperties }) {
  const letters = Array.from(text);

  return (
    <motion.div className={`flex flex-wrap ${className}`} style={style}>
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          whileHover={{ y: -10, color: tokens.accent2 }}
          transition={{ type: "spring", stiffness: 600, damping: 10, mass: 0.5 }}
          style={{ display: letter === " " ? "inline" : "inline-block" }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.div>
  );
}

function Hero() {
  return (
    <section className="min-h-dvh flex items-center pt-20 relative overflow-hidden" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-7xl mx-auto px-6 py-24 w-full grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.15, delayChildren: 0.1 }}
          className="z-10"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 font-bold text-lg ${headingsFont.variable} font-headings`}
            style={{ backgroundColor: '#FFE3E3', color: tokens.accent1 }}
          >
            <Sparkles className="h-5 w-5" />
            <span>#1 Rated Training App</span>
          </motion.div>

          <BouncyText
            text={TAGLINE}
            className={`text-6xl md:text-8xl font-bold leading-[1.1] mb-6 ${headingsFont.variable} font-headings`}
            style={{ color: tokens.foreground }}
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl mb-10 max-w-xl font-medium leading-relaxed"
            style={{ color: tokens.mutedForeground }}
          >
            {DESCRIPTION}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05, scaleY: 0.95 }}
              whileTap={{ scale: 0.95, scaleY: 1.05 }}
              className={`h-16 px-8 rounded-full font-bold text-xl shadow-[0_6px_0_#D94A4A] hover:translate-y-[2px] hover:shadow-[0_4px_0_#D94A4A] active:translate-y-[6px] active:shadow-none transition-all flex items-center justify-center gap-2 ${headingsFont.variable} font-headings`}
              style={{ backgroundColor: tokens.accent1, color: tokens.backgroundAlt }}
            >
              Start Free Trial <ArrowRight className="h-6 w-6" />
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Playful Hero Visual */}
        <FadeUp delay={0.4} className="relative hidden md:block">
           <div className="relative w-full aspect-square max-w-lg mx-auto">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: [0, 0, 1, 1] }}
                className="absolute inset-0 rounded-full border-[20px] border-dashed"
                style={{ borderColor: tokens.muted }}
              />
              <motion.div
                className="absolute inset-8 rounded-full overflow-hidden"
                style={{ backgroundColor: tokens.accent2 }}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {/* Dog placeholder */}
                <div className="w-full h-full flex flex-col items-center justify-center text-white">
                   <Dog className="w-48 h-48 mb-4" />
                   <h2 className={`text-4xl font-bold ${headingsFont.variable} font-headings`}>Woof!</h2>
                </div>
              </motion.div>

              {/* Floating Treats */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    rotate: [0, 15, -15, 0]
                  }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2
                  }}
                >
                  <Bone className="w-12 h-12" style={{ color: tokens.accent1, fill: '#FFE3E3' }} />
                </motion.div>
              ))}
           </div>
        </FadeUp>
      </div>
    </section>
  )
}

function Stats() {
  return (
    <section className="py-16" style={{ backgroundColor: tokens.accent2 }}>
      <div className="max-w-7xl mx-auto px-6">
        <StaggerContainer>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={staggerItem}
                className="text-center p-6 rounded-3xl"
                style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                whileHover={{ y: -10, backgroundColor: 'rgba(255,255,255,0.2)' }}
              >
                <p className={`text-5xl font-bold mb-2 text-white ${headingsFont.variable} font-headings`}>{stat.value}</p>
                <p className="text-xl text-white/80 font-bold">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  )
}

function MilestoneTracker() {
  const { scrollYProgress } = useScroll();
  const yRange = useTransform(scrollYProgress, [0.3, 0.6], [0, 100]);
  const dogScale = useTransform(scrollYProgress, [0.3, 0.6], [0.5, 1.2]);

  const milestones = [
    { title: "Welcome Home", desc: "Setting up the crate & first nights." },
    { title: "Potty Pro", desc: "No more indoor accidents!" },
    { title: "Basic Manners", desc: "Sit, stay, and down." },
    { title: "Leash Master", desc: "Walking nicely without pulling." },
  ]

  return (
    <div className="relative py-20 pl-8 md:pl-24">
      {/* The Track */}
      <div className="absolute left-8 md:left-24 top-0 bottom-0 w-4 rounded-full" style={{ backgroundColor: tokens.muted }}>
        <motion.div
          className="absolute top-0 w-full rounded-full"
          style={{
            backgroundColor: tokens.accent1,
            height: useTransform(yRange, v => `${v}%`)
          }}
        />

        {/* The Dog Handle */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 -ml-2"
          style={{
            top: useTransform(yRange, v => `calc(${v}% - 24px)`),
            scale: dogScale
          }}
        >
          <div className="bg-white p-2 rounded-full shadow-lg border-4" style={{ borderColor: tokens.accent1 }}>
            <Dog className="w-8 h-8" style={{ color: tokens.accent1 }} />
          </div>
        </motion.div>
      </div>

      <div className="space-y-32">
        {milestones.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ margin: "-20% 0px" }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="pl-16 relative"
          >
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full border-4 bg-white" style={{ borderColor: tokens.accent2 }} />
            <h3 className={`text-4xl font-bold mb-2 ${headingsFont.variable} font-headings`} style={{ color: tokens.foreground }}>{m.title}</h3>
            <p className="text-xl" style={{ color: tokens.mutedForeground }}>{m.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function Features() {
  return (
    <section id="games" className="py-24 relative" style={{ backgroundColor: tokens.backgroundAlt }}>
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-64 h-64 opacity-10 pointer-events-none">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill={tokens.accent2} d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,81.3,-46.3C90.8,-33.5,96.8,-18,97.2,-2.3C97.6,13.4,92.5,29.3,83.3,42.7C74.1,56.1,60.8,67,46.1,74.9C31.4,82.8,15.7,87.7,-0.4,88.4C-16.5,89.1,-33,85.6,-46.9,77.5C-60.8,69.4,-72.1,56.7,-80.6,41.9C-89.1,27.1,-94.8,10.2,-94.5,-6.4C-94.2,-23,-87.9,-39.3,-77.8,-52C-67.7,-64.7,-53.8,-73.8,-39.2,-80.5C-24.6,-87.2,-9.3,-91.5,3.6,-96.5C16.5,-101.5,30.6,-83.6,44.7,-76.4Z" transform="translate(100 100)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <FadeUp>
          <div className="text-center mb-20">
            <h2 className={`text-5xl md:text-6xl font-bold mb-6 ${headingsFont.variable} font-headings`} style={{ color: tokens.foreground }}>
              Train Better, Not Harder
            </h2>
            <p className="text-2xl max-w-3xl mx-auto font-medium" style={{ color: tokens.mutedForeground }}>
              Say goodbye to boring obedience classes. Say hello to fun, interactive games that your dog actually wants to play.
            </p>
          </div>
        </FadeUp>
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURES.map((feature, i) => (
              <motion.div
                key={feature.title}
                variants={staggerItem}
                whileHover={{ y: -10, scale: 1.02 }}
                className="p-8 rounded-[40px] border-4 bg-white"
                style={{ borderColor: tokens.muted }}
              >
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6" style={{ backgroundColor: '#FFE3E3' }}>
                  <feature.icon className="h-8 w-8" style={{ color: tokens.accent1 }} strokeWidth={2.5} />
                </div>
                <h3 className={`font-bold text-2xl mb-4 ${headingsFont.variable} font-headings`} style={{ color: tokens.foreground }}>{feature.title}</h3>
                <p className="text-lg leading-relaxed font-medium" style={{ color: tokens.mutedForeground }}>{feature.description}</p>
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
    <section id="milestones" className="py-24 border-y overflow-hidden" style={{ borderColor: tokens.border, backgroundColor: tokens.background }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <FadeUp>
            <h2 className={`text-5xl md:text-6xl font-bold mb-6 ${headingsFont.variable} font-headings`} style={{ color: tokens.foreground }}>
              Watch Them Grow
            </h2>
            <p className="text-2xl font-medium mb-8 leading-relaxed" style={{ color: tokens.mutedForeground }}>
              Track every little victory. From their first successful "Sit" to walking off-leash like a pro.
            </p>
            <motion.button
              whileHover={{ scale: 1.05, scaleY: 0.95 }}
              whileTap={{ scale: 0.95, scaleY: 1.05 }}
              className={`h-16 px-8 rounded-full font-bold text-xl shadow-[0_6px_0_#3376D9] active:translate-y-[6px] active:shadow-none transition-all flex items-center justify-center gap-2 ${headingsFont.variable} font-headings`}
              style={{ backgroundColor: tokens.accent2, color: tokens.backgroundAlt }}
            >
              See the Curriculum <ArrowRight className="h-6 w-6" />
            </motion.button>
          </FadeUp>

          <MilestoneTracker />
        </div>
      </div>
    </section>
  )
}

function Pricing() {
  return (
    <section id="pricing" className="py-24" style={{ backgroundColor: tokens.backgroundAlt }}>
      <div className="max-w-7xl mx-auto px-6">
        <FadeUp>
          <div className="text-center mb-20">
            <h2 className={`text-5xl md:text-6xl font-bold mb-6 ${headingsFont.variable} font-headings`} style={{ color: tokens.foreground }}>Pick Your Playbook</h2>
            <p className="text-2xl font-medium" style={{ color: tokens.mutedForeground }}>No hidden fees. Just lots of treats.</p>
          </div>
        </FadeUp>
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PRICING.map(tier => (
              <motion.div
                key={tier.name}
                variants={staggerItem}
                whileHover={{ y: -10 }}
                className="p-10 rounded-[40px] border-4 relative bg-white flex flex-col"
                style={{
                  borderColor: tier.highlighted ? tokens.accent1 : tokens.muted,
                }}
              >
                {tier.highlighted && (
                  <div
                    className={`absolute -top-5 left-1/2 -translate-x-1/2 px-6 py-2 text-sm font-bold tracking-widest uppercase flex items-center gap-2 rounded-full ${headingsFont.variable} font-headings`}
                    style={{ backgroundColor: tokens.accent1, color: tokens.backgroundAlt }}
                  >
                    <Star className="w-4 h-4 fill-current" /> Most Pawpular
                  </div>
                )}
                <h3 className={`font-bold text-3xl mb-2 ${headingsFont.variable} font-headings`} style={{ color: tokens.foreground }}>{tier.name}</h3>
                <p className="text-lg font-medium mb-8 min-h-[56px]" style={{ color: tokens.mutedForeground }}>{tier.description}</p>
                <div className="flex items-baseline gap-2 mb-10">
                  <span className={`text-6xl font-bold ${headingsFont.variable} font-headings`} style={{ color: tokens.foreground }}>{tier.price}</span>
                  <span className="text-lg font-bold text-gray-400">/ {tier.period}</span>
                </div>
                <ul className="space-y-5 mb-10 flex-grow">
                  {tier.features.map(f => (
                    <li key={f} className="flex items-center gap-3 text-lg font-medium">
                      <div className="bg-green-100 p-1 rounded-full">
                        <Check className="h-5 w-5 text-green-500" strokeWidth={3} />
                      </div>
                      <span style={{ color: tokens.foreground }}>{f}</span>
                    </li>
                  ))}
                </ul>
                <motion.button
                  whileHover={{ scale: 1.05, scaleY: 0.95 }}
                  whileTap={{ scale: 0.95, scaleY: 1.05 }}
                  className={`w-full h-16 rounded-full font-bold text-xl transition-all shadow-[0_6px_0_rgba(0,0,0,0.1)] active:translate-y-[6px] active:shadow-none ${headingsFont.variable} font-headings`}
                  style={tier.highlighted
                    ? { backgroundColor: tokens.accent1, color: tokens.backgroundAlt, boxShadow: '0 6px 0 #D94A4A' }
                    : { backgroundColor: tokens.muted, color: tokens.foreground }
                  }
                >
                  {tier.cta}
                </motion.button>
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
    <section id="pawtners" className="py-24 border-y" style={{ borderColor: tokens.border, backgroundColor: tokens.background }}>
      <div className="max-w-7xl mx-auto px-6">
        <FadeUp>
          <div className="text-center mb-20">
            <h2 className={`text-5xl md:text-6xl font-bold mb-6 ${headingsFont.variable} font-headings`} style={{ color: tokens.foreground }}>Good Boys & Girls</h2>
            <p className="text-2xl font-medium" style={{ color: tokens.mutedForeground }}>Don't just take our bark for it.</p>
          </div>
        </FadeUp>
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map(t => (
              <motion.div
                key={t.name}
                variants={staggerItem}
                whileHover={{ rotate: [-1, 1, -1, 0] }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
                className="p-10 rounded-[40px] border-4 bg-white"
                style={{ borderColor: tokens.muted }}
              >
                <div className="flex mb-6 gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-6 w-6 fill-current" style={{ color: '#FFC700' }} />
                  ))}
                </div>
                <p className="text-xl font-medium leading-relaxed mb-8" style={{ color: tokens.foreground }}>"{t.text}"</p>
                <div>
                  <p className={`font-bold text-2xl mb-1 ${headingsFont.variable} font-headings`} style={{ color: tokens.accent1 }}>{t.name}</p>
                  <p className="text-lg font-bold" style={{ color: tokens.mutedForeground }}>{t.role}</p>
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
    <section id="faq" className="py-24" style={{ backgroundColor: tokens.backgroundAlt }}>
      <div className="max-w-3xl mx-auto px-6">
        <FadeUp>
          <div className="text-center mb-20">
            <h2 className={`text-5xl md:text-6xl font-bold ${headingsFont.variable} font-headings`} style={{ color: tokens.foreground }}>Fetch Some Answers</h2>
          </div>
        </FadeUp>
        <div className="space-y-6">
          {FAQ_ITEMS.map((item, i) => (
            <FadeUp key={i} delay={i * 0.05}>
              <div className="border-4 rounded-[30px] overflow-hidden transition-all duration-300"
                   style={{ borderColor: openIndex === i ? tokens.accent1 : tokens.muted, backgroundColor: 'white' }}>
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  aria-expanded={openIndex === i}
                  className="w-full flex items-center justify-between p-8 text-left"
                >
                  <span className={`font-bold text-2xl ${headingsFont.variable} font-headings`} style={{ color: tokens.foreground }}>{item.q}</span>
                  <motion.div
                    animate={{ rotate: openIndex === i ? 180 : 0, backgroundColor: openIndex === i ? tokens.accent1 : tokens.muted }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  >
                    <ChevronDown className="h-8 w-8" style={{ color: openIndex === i ? 'white' : tokens.foreground }} />
                  </motion.div>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openIndex === i ? 'auto' : 0, opacity: openIndex === i ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                  style={{ overflow: 'hidden' }}
                >
                  <p className="px-8 pb-8 text-lg font-medium leading-relaxed" style={{ color: tokens.mutedForeground }}>
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
    <section className="py-24" style={{ backgroundColor: tokens.accent2 }}>
      <div className="max-w-4xl mx-auto px-6 text-center">
        <FadeUp>
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
             <Bone className="w-12 h-12" style={{ color: tokens.accent2 }} strokeWidth={2.5} />
          </div>
          <h2 className={`text-5xl md:text-6xl font-bold mb-6 text-white ${headingsFont.variable} font-headings`}>Get the Free Training Cheatsheet!</h2>
          <p className="text-2xl mb-12 text-blue-100 font-medium">
            Join 50,000+ pup parents getting our best training tips delivered every Tuesday.
          </p>

          {status === 'success' ? (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 15 }}
              className="inline-flex items-center gap-3 font-bold text-2xl px-8 py-6 rounded-full bg-white"
              style={{ color: tokens.accent1 }}
            >
              <Sparkles className="w-8 h-8" /> Treats incoming! Check your inbox.
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className={`flex-1 h-20 px-8 rounded-full border-4 text-xl font-bold focus:outline-none transition-colors ${headingsFont.variable} font-headings`}
                style={{ borderColor: 'transparent', backgroundColor: 'white', color: tokens.foreground }}
              />
              <motion.button
                type="submit"
                disabled={status === 'loading'}
                whileHover={{ scale: 1.05, scaleY: 0.95 }}
                whileTap={{ scale: 0.95, scaleY: 1.05 }}
                className={`h-20 px-10 rounded-full font-bold text-2xl shadow-[0_6px_0_#D94A4A] active:translate-y-[6px] active:shadow-none disabled:opacity-60 transition-all ${headingsFont.variable} font-headings`}
                style={{ backgroundColor: tokens.accent1, color: tokens.backgroundAlt }}
              >
                {status === 'loading' ? 'Sending...' : 'Fetch!'}
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
    Play: ['Games Library', 'Potty Tracker', 'Socialization', 'Milestones'],
    Learn: ['Blog', 'Vet Chat', 'Training Philosophy', 'Breed Guides'],
    Company: ['About Us', 'Careers', 'Partner Vets', 'Press'],
    Legal: ['Privacy', 'Terms', 'Cookies', 'Support'],
  }

  return (
    <footer className="py-20" style={{ backgroundColor: tokens.background, borderTop: `4px solid ${tokens.muted}` }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-12 mb-16">
          <div className="col-span-2 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <Dog className="h-8 w-8" style={{ color: tokens.accent1 }} strokeWidth={2.5} />
              <span className={`font-bold text-3xl tracking-tight ${headingsFont.variable} font-headings`} style={{ color: tokens.accent2 }}>
                {PRODUCT_NAME}
              </span>
            </div>
            <p className="text-lg font-medium leading-relaxed max-w-sm" style={{ color: tokens.mutedForeground }}>
              Making dog training so fun, you'll forget you're doing it.
            </p>
          </div>
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <p className={`font-bold text-xl mb-6 ${headingsFont.variable} font-headings`} style={{ color: tokens.foreground }}>{group}</p>
              <ul className="space-y-4">
                {items.map(item => (
                  <li key={item}>
                    <motion.a
                      href="#"
                      className="text-lg font-medium inline-block"
                      style={{ color: tokens.mutedForeground }}
                      whileHover={{ x: 5, color: tokens.accent1 }}
                    >
                      {item}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between pt-10 border-t-4 gap-6" style={{ borderColor: tokens.muted }}>
          <p className="text-lg font-bold" style={{ color: tokens.mutedForeground }}>
            © {new Date().getFullYear()} {PRODUCT_NAME} Inc. Good Boy Rights Reserved.
          </p>
          <a
            href="/"
            className="text-lg font-bold hover:underline"
            style={{ color: tokens.accent2 }}
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
    <div className={`${bodyFont.variable} font-sans selection:bg-pink-200`} style={{ backgroundColor: tokens.background, color: tokens.foreground }}>
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
