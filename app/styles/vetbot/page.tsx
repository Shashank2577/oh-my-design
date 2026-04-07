'use client'

import React, { useState } from 'react'
import { motion, useScroll, useTransform, useSpring, useInView, Variants } from 'framer-motion'
import { ArrowRight, Bot, Activity, ShieldCheck, Star, ChevronDown, Check, Menu, X, Zap, HeartPulse, ShieldAlert } from 'lucide-react'
import { Inter, Space_Grotesk } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space' })

const tokens = {
  background: '#F0F4F8', // Sanitized Blue
  surface: '#FFFFFF',    // Clinical White
  accent: '#0077B6',     // Medical Teal
  accent2: '#FF9F1C',    // Emergency Alert
  border: '#D9E2EC',
  textHigh: '#102A43',
  textLow: '#627D98',
}

const PRODUCT_NAME = "VetBot"

// Framer Motion Variants
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } }
}

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const pulseAnim: Variants = {
  hidden: { scale: 0.9, opacity: 0.5 },
  visible: {
    scale: [1, 1.05, 1],
    opacity: [0.8, 1, 0.8],
    transition: { duration: 2, repeat: Infinity, ease: [0.42, 0, 0.58, 1] }
  }
}

// Components
const ClinicalSection = ({ children, className = '', id = '', style = {} }: { children: React.ReactNode, className?: string, id?: string, style?: React.CSSProperties }) => (
  <section id={id} className={`py-20 relative ${className}`} style={style}>
    {children}
  </section>
)

export default function VetBotPage() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  return (
    <div className={`${inter.variable} ${spaceGrotesk.variable} font-sans min-h-screen text-[${tokens.textHigh}] selection:bg-[#0077B6] selection:text-white`} style={{ backgroundColor: tokens.background, color: tokens.textHigh }}>
      {/* Background grid for clinical feel */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.05] z-0" style={{ backgroundImage: 'linear-gradient(#0077B6 1px, transparent 1px), linear-gradient(90deg, #0077B6 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

      <motion.div
        className="fixed top-0 left-0 right-0 h-1 z-50 origin-left"
        style={{ scaleX, backgroundColor: tokens.accent }}
      />

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
      <Footer />
    </div>
  )
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-b" style={{ borderColor: tokens.border }}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight" style={{ fontFamily: 'var(--font-space)', color: tokens.textHigh }}>
          <Bot className="h-6 w-6" style={{ color: tokens.accent }} />
          {PRODUCT_NAME}
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          {['Diagnostic', 'Triage', 'Plans'].map((item) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              whileHover={{ color: tokens.accent }}
              style={{ color: tokens.textLow }}
              className="transition-colors"
            >
              {item}
            </motion.a>
          ))}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-5 py-2 rounded-md text-white font-medium text-sm flex items-center gap-2"
            style={{ backgroundColor: tokens.accent }}
          >
            <Activity className="w-4 h-4" /> Start Analysis
          </motion.button>
        </div>

        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)} style={{ color: tokens.textHigh }}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <ClinicalSection className="pt-32 pb-20 overflow-hidden bg-white border-b" style={{ borderColor: tokens.border }}>
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="w-full md:w-1/2">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-6 border bg-[#F0F4F8]" style={{ borderColor: tokens.border }}>
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: tokens.accent2 }}></div>
              <span className="text-xs font-bold uppercase tracking-wider" style={{ color: tokens.textLow }}>System Online</span>
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight" style={{ fontFamily: 'var(--font-space)', color: tokens.textHigh }}>
              Immediate <br/>Veterinary <br/>Intelligence.
            </motion.h1>

            <motion.p variants={fadeUp} className="text-lg md:text-xl mb-8 max-w-lg" style={{ color: tokens.textLow }}>
              Advanced AI triage and diagnostic support for pet parents. Get immediate, clinical-grade analysis of symptoms before heading to the ER.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 rounded-md text-white font-bold text-lg flex items-center justify-center gap-2"
                style={{ backgroundColor: tokens.accent }}
              >
                <Activity className="w-5 h-5" /> Begin Triage
              </motion.button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2 relative flex justify-center"
          >
            {/* "The Pulse" UI Entity */}
            <div className="relative w-80 h-80 flex items-center justify-center">
              <motion.div
                variants={pulseAnim}
                initial="hidden"
                animate="visible"
                className="absolute inset-0 rounded-full blur-3xl opacity-20"
                style={{ backgroundColor: tokens.accent }}
              />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: [0, 0, 1, 1] }}
                className="absolute inset-4 rounded-full border border-dashed opacity-50"
                style={{ borderColor: tokens.accent }}
              />
              <div className="w-40 h-40 bg-white rounded-full shadow-2xl flex items-center justify-center border-4 relative z-10" style={{ borderColor: tokens.accent }}>
                <Bot className="w-16 h-16" style={{ color: tokens.accent }} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </ClinicalSection>
  )
}

function Stats() {
  const stats = [
    { label: 'Analyses Run', value: '1.2M+' },
    { label: 'Avg. Response', value: '0.8s' },
    { label: 'Clinical Accuracy', value: '94%' },
  ]

  return (
    <section className="py-10 border-b bg-white" style={{ borderColor: tokens.border }}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="flex flex-col md:flex-row justify-between text-center md:text-left gap-8"
        >
          {stats.map((s, i) => (
            <motion.div key={i} variants={fadeUp} className="flex items-center gap-4">
              <div className="text-3xl font-bold tracking-tighter" style={{ fontFamily: 'var(--font-space)', color: tokens.accent }}>{s.value}</div>
              <div className="text-sm font-medium uppercase tracking-wide" style={{ color: tokens.textLow }}>{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function Features() {
  const features = [
    { icon: <HeartPulse />, title: 'Symptom Analyzer', desc: 'Input vitals and behaviors for real-time comparison against millions of veterinary records.' },
    { icon: <ShieldAlert />, title: 'Emergency Triage', desc: 'Instantly categorizes severity (Green, Yellow, Red) to tell you if an ER visit is necessary.' },
    { icon: <Zap />, title: 'Treatment Dictionary', desc: 'Plain-english explanations of common medications, dosages, and expected side effects.' },
  ]

  return (
    <ClinicalSection id="diagnostic">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="mb-16"
        >
          <motion.div variants={fadeUp} className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: tokens.accent }}>Core Systems</motion.div>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-space)' }}>Diagnostic Capabilities</motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {features.map((f, i) => (
            <motion.div key={i} variants={fadeUp} className="group cursor-default">
              <div className="p-8 bg-white border rounded-lg transition-all duration-300 hover:shadow-lg" style={{ borderColor: tokens.border }}>
                <div className="p-3 rounded-md inline-block mb-6 bg-[#F0F4F8]" style={{ color: tokens.accent }}>
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ fontFamily: 'var(--font-space)', color: tokens.textHigh }}>{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: tokens.textLow }}>{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </ClinicalSection>
  )
}

function ProductDetail() {
  return (
    <ClinicalSection id="triage" className="bg-white border-y" style={{ borderColor: tokens.border }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full md:w-1/2"
          >
            <div className="border rounded-xl p-6 bg-[#F0F4F8]" style={{ borderColor: tokens.border }}>
              <div className="bg-white border rounded-lg p-6 shadow-sm mb-4 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-[#F0F4F8]" style={{ color: tokens.textLow }}>U</div>
                <div>
                  <p className="text-sm mb-1 font-medium">My dog ate a grape about 20 minutes ago.</p>
                  <p className="text-xs text-gray-400">10:42 AM</p>
                </div>
              </div>
              <div className="bg-white border rounded-lg p-6 shadow-sm flex items-start gap-4 border-l-4" style={{ borderLeftColor: tokens.accent2 }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: tokens.accent, color: 'white' }}><Bot className="w-5 h-5"/></div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-orange-100" style={{ color: tokens.accent2 }}>URGENT</span>
                    <span className="text-xs text-gray-400">10:42 AM</span>
                  </div>
                  <p className="text-sm mb-1 font-medium">Grapes are highly toxic to dogs and can cause acute kidney failure. Please contact your vet or the Pet Poison Helpline immediately.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="w-full md:w-1/2"
          >
            <motion.div variants={fadeUp} className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: tokens.accent }}>Interface</motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold mb-6 tracking-tight" style={{ fontFamily: 'var(--font-space)' }}>
              Trust in Motion.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-base mb-6 leading-relaxed" style={{ color: tokens.textLow }}>
              Our chat interface is designed to emulate the calm, precise environment of a clinical setting. No fluff, no delays. Just actionable intelligence when you need it most.
            </motion.p>

            <div className="space-y-4">
              {['Trained on peer-reviewed veterinary journals', 'HIPAA-compliant data handling', 'Integration with local ER wait times'].map((item, i) => (
                <motion.div key={i} variants={fadeUp} className="flex items-center gap-3">
                  <Check className="w-5 h-5" style={{ color: tokens.accent }} />
                  <span className="text-sm font-medium" style={{ color: tokens.textHigh }}>{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </ClinicalSection>
  )
}

function Pricing() {
  return (
    <ClinicalSection id="plans">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight" style={{ fontFamily: 'var(--font-space)' }}>Coverage Plans</h2>
          <p className="text-base" style={{ color: tokens.textLow }}>Select the tier appropriate for your household.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <motion.div
            whileHover={{ y: -2 }}
            className="p-8 border rounded-xl bg-white"
            style={{ borderColor: tokens.border }}
          >
            <h3 className="text-lg font-bold mb-1">Standard Triage</h3>
            <div className="text-3xl font-bold mb-6" style={{ fontFamily: 'var(--font-space)', color: tokens.textHigh }}>Free</div>
            <ul className="space-y-3 mb-8 text-sm">
              <li className="flex items-start gap-3"><Check className="h-4 w-4 mt-0.5" style={{ color: tokens.accent }}/> <span>Basic symptom checker</span></li>
              <li className="flex items-start gap-3"><Check className="h-4 w-4 mt-0.5" style={{ color: tokens.accent }}/> <span>Standard response time</span></li>
              <li className="flex items-start gap-3"><Check className="h-4 w-4 mt-0.5" style={{ color: tokens.accent }}/> <span>1 Pet Profile</span></li>
            </ul>
            <button className="w-full py-3 rounded border text-sm font-bold transition-colors hover:bg-[#F0F4F8]" style={{ borderColor: tokens.border, color: tokens.textHigh }}>
              Create Account
            </button>
          </motion.div>

          <motion.div
            whileHover={{ y: -2 }}
            className="p-8 border-2 rounded-xl relative bg-white shadow-lg"
            style={{ borderColor: tokens.accent }}
          >
            <div className="absolute top-0 right-0 px-3 py-1 text-xs font-bold text-white rounded-bl-lg" style={{ backgroundColor: tokens.accent }}>
              Recommended
            </div>
            <h3 className="text-lg font-bold mb-1">VetBot Plus</h3>
            <div className="text-3xl font-bold mb-6" style={{ fontFamily: 'var(--font-space)', color: tokens.accent }}>$12 <span className="text-xs font-normal text-gray-500">/mo</span></div>
            <ul className="space-y-3 mb-8 text-sm">
              <li className="flex items-start gap-3"><Check className="h-4 w-4 mt-0.5" style={{ color: tokens.accent }}/> <span>Priority API processing</span></li>
              <li className="flex items-start gap-3"><Check className="h-4 w-4 mt-0.5" style={{ color: tokens.accent }}/> <span>Unlimited Pet Profiles</span></li>
              <li className="flex items-start gap-3"><Check className="h-4 w-4 mt-0.5" style={{ color: tokens.accent }}/> <span>Live Vet Connect (2x/yr)</span></li>
            </ul>
            <button className="w-full py-3 rounded text-sm font-bold text-white transition-opacity hover:opacity-90" style={{ backgroundColor: tokens.accent }}>
              Upgrade Now
            </button>
          </motion.div>
        </div>
      </div>
    </ClinicalSection>
  )
}

function Testimonials() {
  const reviews = [
    { text: "VetBot correctly identified my cat's urinary blockage symptoms and told me to go to the ER immediately. It saved his life.", author: "J. Simmons", role: "Verified User" },
    { text: "As a clinician, I appreciate that VetBot doesn't diagnose, but rather triages efficiently. It helps clients make informed decisions.", author: "Dr. A. Patel", role: "DVM" },
  ]

  return (
    <ClinicalSection className="bg-white border-y" style={{ borderColor: tokens.border }}>
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-2xl font-bold text-center mb-12" style={{ fontFamily: 'var(--font-space)' }}>Clinical Feedback</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 border rounded-lg bg-[#F0F4F8]"
              style={{ borderColor: tokens.border }}
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-current" style={{ color: tokens.accent2 }} />)}
              </div>
              <p className="text-sm mb-6 leading-relaxed" style={{ color: tokens.textHigh }}>"{r.text}"</p>
              <div>
                <p className="font-bold text-sm">{r.author}</p>
                <p className="text-xs" style={{ color: tokens.textLow }}>{r.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </ClinicalSection>
  )
}

function FAQ() {
  const faqs = [
    { q: "Is VetBot a replacement for a real veterinarian?", a: "No. VetBot is a triage and informational tool. It cannot legally diagnose conditions or prescribe medications." },
    { q: "What data is it trained on?", a: "VetBot uses a proprietary LLM trained exclusively on peer-reviewed veterinary literature, textbooks, and anonymized clinical case studies." },
    { q: "Is my pet's data secure?", a: "Yes. All data is encrypted at rest and in transit, complying with standard medical data privacy regulations." },
  ]

  return (
    <ClinicalSection>
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-2xl font-bold text-center mb-10" style={{ fontFamily: 'var(--font-space)' }}>System Inquiries</h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FAQItem key={i} question={faq.q} answer={faq.a} />
          ))}
        </div>
      </div>
    </ClinicalSection>
  )
}

function FAQItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div
      className="border rounded-lg bg-white overflow-hidden"
      style={{ borderColor: tokens.border }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between font-bold text-sm text-left hover:bg-[#F0F4F8] transition-colors"
      >
        <span>{question}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
          <ChevronDown className="w-4 h-4" style={{ color: tokens.textLow }} />
        </motion.div>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        className="overflow-hidden px-6"
      >
        <p className="pb-4 text-sm" style={{ color: tokens.textLow }}>{answer}</p>
      </motion.div>
    </motion.div>
  )
}

function Newsletter() {
  return (
    <ClinicalSection className="bg-white border-t" style={{ borderColor: tokens.border }}>
      <div className="max-w-xl mx-auto px-6 text-center">
        <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: 'var(--font-space)' }}>System Updates</h2>
        <p className="text-sm mb-6" style={{ color: tokens.textLow }}>Receive notifications about new diagnostic models and features.</p>
        <form className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto" onSubmit={e => e.preventDefault()}>
          <input
            type="email"
            placeholder="email@address.com"
            className="flex-1 px-4 py-3 border rounded-md focus:outline-none focus:border-[#0077B6] text-sm"
            style={{ borderColor: tokens.border }}
          />
          <button
            className="px-6 py-3 rounded-md text-sm font-bold text-white transition-opacity hover:opacity-90 whitespace-nowrap"
            style={{ backgroundColor: tokens.accent }}
          >
            Initialize
          </button>
        </form>
      </div>
    </ClinicalSection>
  )
}

function Footer() {
  return (
    <footer className="py-8 text-center border-t bg-[#F0F4F8]" style={{ borderColor: tokens.border }}>
      <div className="flex justify-center items-center gap-2 font-bold mb-2 tracking-tight" style={{ fontFamily: 'var(--font-space)', color: tokens.textHigh }}>
        <Bot className="h-5 w-5" style={{ color: tokens.accent }} />
        {PRODUCT_NAME}
        
      </div>
      <p className="text-xs" style={{ color: tokens.textLow }}>© 2026 {PRODUCT_NAME}. Artificial Intelligence. Real Care.</p>
    </footer>
  )
}
