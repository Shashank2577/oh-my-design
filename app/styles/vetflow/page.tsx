'use client'

import { motion, useReducedMotion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Plus_Jakarta_Sans, Inter } from 'next/font/google'
import {
  Star, ChevronDown, ArrowRight, Check, Activity, Heart, Shield,
  FileText, Calendar, Clock, Phone, Stethoscope, Video, Bone
} from 'lucide-react'

const primaryFont = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-primary',
  display: 'swap',
})

const secondaryFont = Inter({
  subsets: ['latin'],
  variable: '--font-secondary',
  display: 'swap',
})

const tokens = {
  background: '#F0FDF4',
  backgroundAlt: '#F0F9FF', // Breathing alt
  surface: '#FFFFFF',
  accent1: '#0EA5E9',
  accent2: '#6366F1',
  border: '#E0F2FE',
  textHigh: '#0F172A',
  textLow: '#64748B',
}

function FadeUp({ children, delay = 0, yOffset = 20 }: { children: React.ReactNode; delay?: number; yOffset?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-5% 0px' })
  const shouldReduce = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      initial={shouldReduce ? false : { opacity: 0, y: yOffset }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] }}
    >
      {children}
    </motion.div>
  )
}

function StaggerContainer({ children, staggerDelay = 0.1 }: { children: React.ReactNode, staggerDelay?: number }) {
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
        visible: { transition: { staggerChildren: staggerDelay } },
      }}
    >
      {children}
    </motion.div>
  )
}

const staggerItem: import('framer-motion').Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] } },
}

const PRODUCT_NAME = 'VetFlow'
const TAGLINE = 'Modern Care for Your Best Friend'
const DESCRIPTION = 'Reduce anxiety with transparent, professional, and calming veterinary clinic services. We bring healing hands and modern tech to pet healthcare.'

const NAV_LINKS = ['Services', 'Clinic', 'Emergency', 'FAQ']

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300"
      style={{
        backgroundColor: isScrolled ? `${tokens.surface}E6` : 'transparent',
        backdropFilter: isScrolled ? 'blur(10px)' : 'none',
        borderBottom: isScrolled ? `1px solid ${tokens.border}` : '1px solid transparent'
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <span className="font-bold text-2xl tracking-tight flex items-center gap-2" style={{ color: tokens.accent1 }}>
          <Stethoscope className="w-6 h-6" />
          {PRODUCT_NAME}
        </span>
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <motion.a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-sm font-medium transition-colors"
              style={{ color: link === 'Emergency' ? tokens.accent2 : tokens.textLow }}
              whileHover={{ color: link === 'Emergency' ? tokens.accent1 : tokens.textHigh }}
            >
              {link}
            </motion.a>
          ))}
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="px-6 h-12 rounded-full text-sm font-semibold text-white shadow-lg shadow-blue-500/20"
          style={{ backgroundColor: tokens.accent2 }}
        >
          Book Visit
        </motion.button>
      </div>
    </motion.nav>
  )
}

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Breathing Background */}
      <motion.div
        className="absolute inset-0 -z-10"
        animate={{ backgroundColor: [tokens.background, tokens.backgroundAlt, tokens.background] }}
        transition={{ duration: 8, repeat: Infinity, ease: [0.42, 0, 0.58, 1] as [number, number, number, number] }}
      />

      {/* Organic Wave Separator */}
      <div className="absolute bottom-0 left-0 right-0 text-white translate-y-1">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-12 md:h-24">
          <motion.path
            d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
            fill={tokens.surface}
            animate={{
              d: [
                "M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z",
                "M0,64L80,58.7C160,53,320,43,480,48C640,53,800,75,960,80C1120,85,1280,75,1360,69.3L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z",
                "M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
              ]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: [0.42, 0, 0.58, 1] as [number, number, number, number] }}
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-24 w-full grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.2, delayChildren: 0.1 }}
          className="max-w-2xl"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 bg-white/60 border shadow-sm backdrop-blur-sm"
            style={{ borderColor: tokens.border }}
          >
            <Activity className="w-4 h-4" style={{ color: tokens.accent1 }} />
            <span className="text-sm font-medium" style={{ color: tokens.accent2 }}>24/7 Virtual Care Available</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold leading-tight mb-6"
            style={{ color: tokens.textHigh }}
          >
            {TAGLINE}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl mb-10 leading-relaxed font-secondary"
            style={{ color: tokens.textLow }}
          >
            {DESCRIPTION}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="h-14 px-8 rounded-full font-medium flex items-center justify-center gap-2 text-white shadow-lg shadow-blue-500/20"
              style={{ backgroundColor: tokens.accent1 }}
            >
              Find a Clinic <ArrowRight className="h-5 w-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,1)' }}
              whileTap={{ scale: 0.98 }}
              className="h-14 px-8 rounded-full font-medium flex items-center justify-center gap-2 bg-white/60 border backdrop-blur-sm transition-colors"
              style={{ borderColor: tokens.border, color: tokens.textHigh }}
            >
              View Services
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Floating Cards Graphic */}
        <div className="relative h-[600px] hidden lg:block">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] as [number, number, number, number], delay: 0.2 }}
            className="absolute right-0 top-10 w-80 p-6 rounded-[2rem] bg-white shadow-2xl border"
            style={{ borderColor: tokens.border, boxShadow: '0 25px 50px -12px rgba(14, 165, 233, 0.15)' }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-blue-50 text-blue-500">
                <Heart className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold" style={{ color: tokens.textHigh }}>Bella's Checkup</h3>
                <p className="text-sm" style={{ color: tokens.textLow }}>Today at 2:30 PM</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '75%' }}
                  transition={{ duration: 1.5, delay: 1 }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: tokens.accent1 }}
                />
              </div>
              <p className="text-xs text-right font-medium" style={{ color: tokens.accent1 }}>On Track</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] as [number, number, number, number], delay: 0.4 }}
            className="absolute left-10 bottom-20 w-72 p-6 rounded-[2rem] bg-white/90 backdrop-blur-md shadow-2xl border"
            style={{ borderColor: tokens.border, boxShadow: '0 25px 50px -12px rgba(99, 102, 241, 0.15)' }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold" style={{ color: tokens.textHigh }}>Vitals</h3>
              <Activity className="w-5 h-5" style={{ color: tokens.accent2 }} />
            </div>
            <div className="flex items-end gap-2 h-16">
              {[40, 70, 45, 90, 65, 85, 55].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                  className="flex-1 rounded-t-sm"
                  style={{ backgroundColor: i === 3 ? tokens.accent2 : tokens.border }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function Stats() {
  return (
    <section className="py-12" style={{ backgroundColor: tokens.surface }}>
      <div className="max-w-6xl mx-auto px-6">
        <StaggerContainer>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x" style={{ borderColor: tokens.border }}>
            {[
              { value: '15+', label: 'Years Experience' },
              { value: '10k+', label: 'Happy Pets' },
              { value: '24/7', label: 'Emergency Care' },
              { value: '4.9', label: 'Star Rating' },
            ].map((stat, i) => (
              <motion.div key={i} variants={staggerItem} className="text-center px-4">
                <p className="text-4xl font-bold mb-2" style={{ color: tokens.accent1 }}>{stat.value}</p>
                <p className="text-sm font-medium" style={{ color: tokens.textLow }}>{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  )
}

function SymptomChecker() {
  const [activeNode, setActiveNode] = useState(0)

  const nodes = [
    { id: 0, question: "What seems to be the problem?", options: ["Lethargy", "Not Eating", "Limping"] },
    { id: 1, question: "How long has it been going on?", options: ["Just started", "1-2 days", "Over a week"] },
    { id: 2, question: "Any other symptoms?", options: ["Vomiting", "Fever", "None"] },
    { id: 3, result: "Based on these symptoms, we recommend scheduling a non-emergency visit within 48 hours." }
  ]

  return (
    <section className="py-24" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-4xl mx-auto px-6">
        <FadeUp>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: tokens.textHigh }}>Interactive Symptom Checker</h2>
            <p className="text-lg" style={{ color: tokens.textLow }}>Find clarity quickly with our guided flow.</p>
          </div>
        </FadeUp>

        <div className="relative bg-white rounded-3xl p-8 shadow-xl border" style={{ borderColor: tokens.border }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeNode}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="min-h-[200px] flex flex-col justify-center"
            >
              {nodes[activeNode].question && (
                <>
                  <h3 className="text-2xl font-semibold mb-8 text-center" style={{ color: tokens.textHigh }}>{nodes[activeNode].question}</h3>
                  <div className="flex flex-wrap justify-center gap-4">
                    {nodes[activeNode].options?.map((opt, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setActiveNode(Math.min(activeNode + 1, nodes.length - 1))}
                        className="px-6 py-3 rounded-full border-2 font-medium transition-colors"
                        style={{ borderColor: tokens.border, color: tokens.textHigh }}
                      >
                        {opt}
                      </motion.button>
                    ))}
                  </div>
                </>
              )}
              {nodes[activeNode].result && (
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center bg-blue-50 text-blue-500">
                    <Check className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4" style={{ color: tokens.textHigh }}>Recommendation</h3>
                  <p className="text-lg mb-8" style={{ color: tokens.textLow }}>{nodes[activeNode].result}</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveNode(0)}
                    className="text-sm font-semibold underline"
                    style={{ color: tokens.accent1 }}
                  >
                    Start Over
                  </motion.button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

function Features() {
  const features = [
    { icon: FileText, title: 'Digital Records', desc: 'Access your pet\'s complete medical history anytime.' },
    { icon: Video, title: 'Telehealth', desc: 'Consult with our vets from the comfort of home.' },
    { icon: Shield, title: 'Preventative Care', desc: 'Custom wellness plans tailored to your pet\'s breed and age.' },
    { icon: Phone, title: '24/7 Triage', desc: 'Always available when you need immediate advice.' },
    { icon: Calendar, title: 'Easy Scheduling', desc: 'Book and modify appointments with a few taps.' },
    { icon: Bone, title: 'Nutrition Plans', desc: 'Expert advice on diet and supplements.' },
  ]

  return (
    <section id="services" className="py-24" style={{ backgroundColor: tokens.surface }}>
      <div className="max-w-6xl mx-auto px-6">
        <FadeUp>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: tokens.textHigh }}>Comprehensive Care</h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: tokens.textLow }}>Everything your pet needs to thrive, managed simply.</p>
          </div>
        </FadeUp>
        <StaggerContainer>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                whileHover={{ y: -5 }}
                className="p-8 rounded-[2rem] bg-white border shadow-sm group hover:shadow-md transition-shadow"
                style={{ borderColor: tokens.border }}
              >
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-colors" style={{ backgroundColor: `${tokens.accent1}15` }}>
                  <f.icon className="w-6 h-6" style={{ color: tokens.accent1 }} />
                </div>
                <h3 className="text-xl font-semibold mb-3" style={{ color: tokens.textHigh }}>{f.title}</h3>
                <p className="font-secondary leading-relaxed" style={{ color: tokens.textLow }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  )
}

function HandHoldProgress() {
  const steps = ['Book', 'Consult', 'Heal']
  return (
    <section className="py-24" style={{ backgroundColor: tokens.backgroundAlt }}>
      <div className="max-w-4xl mx-auto px-6 text-center">
        <FadeUp>
          <h2 className="text-3xl md:text-4xl font-bold mb-16" style={{ color: tokens.textHigh }}>Your Journey with Us</h2>
        </FadeUp>
        <div className="flex justify-between relative">
          <div className="absolute top-1/2 left-0 right-0 h-1 -translate-y-1/2 bg-white rounded-full z-0 overflow-hidden">
            <motion.div
              className="h-full bg-blue-400"
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: [0.42, 0, 0.58, 1] as [number, number, number, number] }}
            />
          </div>
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.8, type: 'spring' }}
              className="relative z-10 flex flex-col items-center gap-4"
            >
              <div className="w-16 h-16 rounded-full bg-white border-4 flex items-center justify-center shadow-lg" style={{ borderColor: tokens.accent1 }}>
                <Check className="w-6 h-6" style={{ color: tokens.accent1 }} />
              </div>
              <span className="font-semibold" style={{ color: tokens.textHigh }}>{step}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Pricing() {
  const plans = [
    { name: 'Basic Checkup', price: '$85', desc: 'Standard wellness exam.' },
    { name: 'Puppy/Kitten Plan', price: '$150', desc: 'Includes first vaccines and deworming.' },
    { name: 'Comprehensive', price: '$250', desc: 'Full blood work, exam, and dental check.' }
  ]

  return (
    <section id="clinic" className="py-24" style={{ backgroundColor: tokens.surface }}>
      <div className="max-w-6xl mx-auto px-6">
        <FadeUp>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: tokens.textHigh }}>Transparent Pricing</h2>
            <p className="text-lg" style={{ color: tokens.textLow }}>No hidden fees, just honest care.</p>
          </div>
        </FadeUp>
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((p, i) => (
            <FadeUp key={i} delay={i * 0.1}>
              <div className="p-8 rounded-[2rem] border bg-white shadow-sm flex flex-col h-full" style={{ borderColor: tokens.border }}>
                <h3 className="text-xl font-semibold mb-2" style={{ color: tokens.textHigh }}>{p.name}</h3>
                <p className="font-secondary mb-6 flex-grow" style={{ color: tokens.textLow }}>{p.desc}</p>
                <div className="text-4xl font-bold mb-6" style={{ color: tokens.accent1 }}>{p.price}</div>
                <button className="w-full py-3 rounded-full font-semibold transition-colors bg-blue-50 hover:bg-blue-100" style={{ color: tokens.accent1 }}>
                  Schedule
                </button>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}

function Testimonials() {
  const reviews = [
    { text: "The telehealth option saved me a stressful trip with my anxious cat. The vet was incredibly calm and thorough.", author: "Sarah M.", pet: "Owner of Luna" },
    { text: "VetFlow's app makes managing vaccines and records so easy. I love the transparency.", author: "James T.", pet: "Owner of Max" },
    { text: "When my dog got sick on a Sunday, their triage line guided me through exactly what to do.", author: "Emily R.", pet: "Owner of Cooper" },
  ]

  return (
    <section className="py-24" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-6xl mx-auto px-6">
        <FadeUp>
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center" style={{ color: tokens.textHigh }}>Stories of Healing</h2>
        </FadeUp>
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <FadeUp key={i} delay={i * 0.1}>
              <div className="p-8 rounded-[2rem] bg-white border" style={{ borderColor: tokens.border }}>
                <div className="flex gap-1 mb-6">
                  {[1,2,3,4,5].map(star => <Star key={star} className="w-4 h-4 fill-current" style={{ color: tokens.accent2 }} />)}
                </div>
                <p className="font-secondary italic mb-6 leading-relaxed" style={{ color: tokens.textLow }}>"{r.text}"</p>
                <div>
                  <p className="font-semibold" style={{ color: tokens.textHigh }}>{r.author}</p>
                  <p className="text-sm" style={{ color: tokens.textLow }}>{r.pet}</p>
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
  const [open, setOpen] = useState<number | null>(null)
  const faqs = [
    { q: "Do you accept pet insurance?", a: "Yes, we work with all major pet insurance providers and can submit claims directly for you." },
    { q: "What happens in a telehealth visit?", a: "You'll connect with a vet via video. We'll observe your pet, ask questions, and determine if an in-person visit is needed or prescribe treatment." },
    { q: "Are emergency services available 24/7?", a: "Our virtual triage is 24/7. We partner with local 24-hour hospitals for physical emergencies requiring immediate attention." }
  ]

  return (
    <section id="faq" className="py-24" style={{ backgroundColor: tokens.surface }}>
      <div className="max-w-3xl mx-auto px-6">
        <FadeUp>
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center" style={{ color: tokens.textHigh }}>Common Questions</h2>
        </FadeUp>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <FadeUp key={i} delay={i * 0.1}>
              <div className="border rounded-[1.5rem] overflow-hidden" style={{ borderColor: tokens.border }}>
                <button
                  className="w-full px-6 py-4 flex items-center justify-between font-semibold"
                  style={{ color: tokens.textHigh, backgroundColor: open === i ? tokens.background : 'transparent' }}
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  {faq.q}
                  <motion.div animate={{ rotate: open === i ? 180 : 0 }}>
                    <ChevronDown className="w-5 h-5" style={{ color: tokens.textLow }} />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                    >
                      <div className="px-6 pb-4 font-secondary" style={{ color: tokens.textLow }}>
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTA() {
  return (
    <section className="py-24 relative overflow-hidden" style={{ backgroundColor: tokens.accent1 }}>
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <FadeUp>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Ready for a Better Vet Experience?</h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">Register today and get your first telehealth consultation free.</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="h-14 px-10 rounded-full font-bold text-lg bg-white shadow-xl transition-shadow"
            style={{ color: tokens.accent1 }}
          >
            Create Free Account
          </motion.button>
        </FadeUp>
      </div>
      {/* Decorative background element */}
      <div className="absolute inset-0 opacity-10">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
          <path d="M0,50 Q25,25 50,50 T100,50 L100,100 L0,100 Z" fill="white" />
        </svg>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="py-12" style={{ backgroundColor: tokens.surface, borderTop: `1px solid ${tokens.border}` }}>
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2 font-bold text-xl" style={{ color: tokens.accent1 }}>
          <Stethoscope className="w-6 h-6" /> {PRODUCT_NAME}
        </div>
        <div className="flex gap-6 text-sm font-medium" style={{ color: tokens.textLow }}>
          <a href="#" className="hover:text-slate-900 transition-colors">Privacy</a>
          <a href="#" className="hover:text-slate-900 transition-colors">Terms</a>
          <a href="#" className="hover:text-slate-900 transition-colors">Contact</a>
        </div>
        <p className="text-sm" style={{ color: tokens.textLow }}>© 2026 {PRODUCT_NAME}. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default function VetFlowPage() {
  return (
    <div className={`${primaryFont.variable} ${secondaryFont.variable} font-primary selection:bg-blue-100`}>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <SymptomChecker />
        <Features />
        <HandHoldProgress />
        <Pricing />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}