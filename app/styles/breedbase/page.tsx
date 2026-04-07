'use client'

import React, { useState } from 'react'
import { motion, useScroll, useTransform, useSpring, useInView, Variants } from 'framer-motion'
import { ArrowRight, BookOpen, Search, Filter, Star, ChevronDown, Check, Menu, X, Image as ImageIcon, Info, History } from 'lucide-react'
import { Playfair_Display, Source_Sans_3 } from 'next/font/google'

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })
const sourceSans = Source_Sans_3({ subsets: ['latin'], variable: '--font-source-sans' })

const tokens = {
  background: '#FDFCF0', // Aged Vellum
  surface: '#FFFFFF',    // Pure Paper
  accent: '#1B4332',     // Botanical Green
  accent2: '#D4AF37',    // Archive Gold
  border: 'rgba(27, 67, 50, 0.1)',
  textHigh: '#081C15',   // Deep Ink
  textLow: '#52796F',
}

const PRODUCT_NAME = "BreedBase"

// Framer Motion Variants
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } }
}

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const inkBleed: Variants = {
  hidden: { opacity: 0, filter: 'blur(10px)', scale: 0.95 },
  visible: { opacity: 1, filter: 'blur(0px)', scale: 1, transition: { duration: 1.2, ease: [0.23, 1, 0.32, 1] } }
}

// Components
const ArchiveSection = ({ children, className = '', id = '', style = {} }: { children: React.ReactNode, className?: string, id?: string, style?: React.CSSProperties }) => (
  <section id={id} className={`py-24 relative ${className}`} style={style}>
    {children}
  </section>
)

export default function BreedBasePage() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  return (
    <div className={`${playfair.variable} ${sourceSans.variable} font-sans min-h-screen text-[${tokens.textHigh}] selection:bg-[#D4AF37] selection:text-white`} style={{ backgroundColor: tokens.background, color: tokens.textHigh }}>
      {/* Paper texture overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] mix-blend-multiply z-50" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

      <motion.div
        className="fixed top-0 left-0 right-0 h-1 z-50 origin-left"
        style={{ scaleX, backgroundColor: tokens.accent2 }}
      />

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

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 border-b backdrop-blur-md" style={{ borderColor: tokens.border, backgroundColor: 'rgba(253, 252, 240, 0.9)' }}>
      <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3 font-bold text-2xl tracking-wide" style={{ fontFamily: 'var(--font-playfair)', color: tokens.textHigh }}>
          <BookOpen className="h-6 w-6" style={{ color: tokens.accent }} />
          {PRODUCT_NAME}
        </div>

        <div className="hidden md:flex items-center gap-10 text-sm font-semibold tracking-widest uppercase">
          {['Directory', 'History', 'Premium'].map((item) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              whileHover={{ color: tokens.accent2 }}
              style={{ color: tokens.textLow }}
              className="transition-colors"
            >
              {item}
            </motion.a>
          ))}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-2 rounded-sm text-white font-medium tracking-widest uppercase text-xs"
            style={{ backgroundColor: tokens.accent }}
          >
            Subscribe
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
    <ArchiveSection className="pt-40 pb-32 text-center border-b" style={{ borderColor: tokens.border }}>
      <div className="max-w-4xl mx-auto px-8 relative z-10">
        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="flex flex-col items-center">
          <motion.div variants={fadeUp} className="mb-8" style={{ color: tokens.accent2 }}>
            <BookOpen className="h-12 w-12 mx-auto opacity-80" />
          </motion.div>

          <motion.h1 variants={fadeUp} className="text-6xl md:text-8xl font-bold mb-8 leading-tight tracking-tight" style={{ fontFamily: 'var(--font-playfair)', color: tokens.textHigh }}>
            The Living Archive<br/><span className="italic font-light opacity-80">of Canine History</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="text-lg md:text-xl mb-12 max-w-2xl font-light leading-relaxed" style={{ color: tokens.textLow }}>
            A meticulously curated digital museum documenting over 400 recognized breeds. Explore lineages, historical origins, and detailed physiological records.
          </motion.p>

          <motion.div variants={fadeUp} className="w-full max-w-2xl relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5" style={{ color: tokens.textLow }} />
            </div>
            <input
              type="text"
              placeholder="Search by breed, group, or origin..."
              className="w-full pl-12 pr-4 py-4 bg-white border outline-none text-lg rounded-sm transition-shadow focus:shadow-md"
              style={{ borderColor: tokens.border, color: tokens.textHigh }}
            />
            <div className="absolute inset-y-0 right-0 pr-2 flex items-center">
              <button className="px-4 py-2 text-sm uppercase tracking-wider font-semibold text-white rounded-sm" style={{ backgroundColor: tokens.accent }}>
                Search
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </ArchiveSection>
  )
}

function Stats() {
  const stats = [
    { label: 'Documented Breeds', value: '400+' },
    { label: 'Historical Archives', value: '18th C.' },
    { label: 'Curated Entries', value: '2.5k' },
  ]

  return (
    <section className="py-12 border-b bg-white/50" style={{ borderColor: tokens.border }}>
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="flex flex-col md:flex-row justify-around text-center gap-8"
        >
          {stats.map((s, i) => (
            <motion.div key={i} variants={fadeUp} className="flex flex-col">
              <div className="text-4xl font-bold mb-2" style={{ fontFamily: 'var(--font-playfair)', color: tokens.accent }}>{s.value}</div>
              <div className="text-xs uppercase tracking-widest font-semibold" style={{ color: tokens.textLow }}>{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function Features() {
  const features = [
    { icon: <History />, title: 'Lineage Tracing', desc: 'Interactive family trees mapping the genetic history and cross-breeding origins of modern companions.' },
    { icon: <ImageIcon />, title: 'Archival Photography', desc: 'Restored vintage photographs comparing historical breed standards to contemporary physiology.' },
    { icon: <Info />, title: 'Detailed Physiognomy', desc: 'Scholarly breakdowns of skeletal structure, coat types, and specialized anatomical adaptations.' },
  ]

  return (
    <ArchiveSection id="directory">
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="text-center mb-20"
        >
          <motion.div variants={fadeUp} className="text-sm uppercase tracking-widest font-bold mb-4" style={{ color: tokens.accent2 }}>Curated Collections</motion.div>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'var(--font-playfair)' }}>Scholarly Depth.</motion.h2>
          <motion.div variants={fadeUp} className="h-px w-24 mx-auto" style={{ backgroundColor: tokens.accent2 }}></motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-12"
        >
          {features.map((f, i) => (
            <motion.div key={i} variants={inkBleed} className="group cursor-pointer">
              <div className="p-8 border bg-white h-full transition-shadow duration-500 hover:shadow-xl relative overflow-hidden" style={{ borderColor: tokens.border }}>
                <div className="absolute top-0 left-0 w-1 h-0 bg-current transition-all duration-500 group-hover:h-full" style={{ color: tokens.accent2 }}></div>
                <div className="mb-6 opacity-80" style={{ color: tokens.accent }}>
                  {f.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)', color: tokens.textHigh }}>{f.title}</h3>
                <p className="leading-relaxed font-light" style={{ color: tokens.textLow }}>{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </ArchiveSection>
  )
}

function ProductDetail() {
  return (
    <ArchiveSection id="history" className="border-y bg-white" style={{ borderColor: tokens.border }}>
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <motion.div
            initial={{ opacity: 0, filter: 'grayscale(100%) blur(5px)' }}
            whileInView={{ opacity: 1, filter: 'grayscale(20%) blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
            className="w-full md:w-1/2"
          >
            <div className="aspect-[3/4] p-4 border" style={{ borderColor: tokens.border, backgroundColor: tokens.background }}>
              <div className="w-full h-full border border-dashed flex flex-col items-center justify-center relative p-8 text-center" style={{ borderColor: tokens.accent2 }}>
                <div className="absolute inset-0 bg-black/5" />
                <BookOpen className="w-16 h-16 mb-6 opacity-50" style={{ color: tokens.accent }} />
                <h3 className="text-3xl font-bold mb-2 z-10" style={{ fontFamily: 'var(--font-playfair)', color: tokens.textHigh }}>Canis Lupus Familiaris</h3>
                <p className="font-light italic z-10" style={{ color: tokens.textLow }}>Fig. 1 — Anatomical Study</p>
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
            <motion.div variants={fadeUp} className="text-sm uppercase tracking-widest font-bold mb-4" style={{ color: tokens.accent2 }}>The Archives</motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold mb-8 leading-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
              Preserving the past. Understanding the present.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg mb-8 font-light leading-relaxed" style={{ color: tokens.textLow }}>
              Our database goes beyond basic statistics. We compile historical texts, origin records, and working-class history to provide a complete picture of how human and canine evolution have intertwined.
            </motion.p>

            <div className="space-y-6">
              {['Extinct breed records', 'Working group classifications', 'Genetic health predispositions'].map((item, i) => (
                <motion.div key={i} variants={fadeUp} className="flex items-center gap-4 border-b pb-4" style={{ borderColor: tokens.border }}>
                  <span className="font-bold text-sm" style={{ color: tokens.accent2 }}>{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-lg font-medium" style={{ color: tokens.textHigh }}>{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </ArchiveSection>
  )
}

function Pricing() {
  return (
    <ArchiveSection id="premium">
      <div className="max-w-5xl mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'var(--font-playfair)' }}>Library Access</h2>
          <p className="text-lg font-light" style={{ color: tokens.textLow }}>Choose your level of research access.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <motion.div
            whileHover={{ y: -5 }}
            className="p-10 border bg-white"
            style={{ borderColor: tokens.border }}
          >
            <h3 className="text-xl uppercase tracking-widest font-bold mb-2">Public Library</h3>
            <div className="text-4xl font-bold mb-8" style={{ fontFamily: 'var(--font-playfair)', color: tokens.accent }}>Free</div>
            <ul className="space-y-4 mb-10">
              <li className="flex items-start gap-3"><Check className="h-5 w-5 mt-0.5 opacity-70" style={{ color: tokens.accent }}/> <span className="font-light">Basic breed statistics</span></li>
              <li className="flex items-start gap-3"><Check className="h-5 w-5 mt-0.5 opacity-70" style={{ color: tokens.accent }}/> <span className="font-light">Standard imagery</span></li>
              <li className="flex items-start gap-3"><Check className="h-5 w-5 mt-0.5 opacity-70" style={{ color: tokens.accent }}/> <span className="font-light">Limited search capabilities</span></li>
            </ul>
            <button className="w-full py-4 border text-sm uppercase tracking-widest font-bold transition-colors hover:bg-black/5" style={{ borderColor: tokens.accent, color: tokens.accent }}>
              Start Browsing
            </button>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="p-10 border shadow-xl relative"
            style={{ borderColor: tokens.accent2, backgroundColor: tokens.surface }}
          >
            <div className="absolute top-0 right-0 px-4 py-1 text-xs uppercase tracking-widest font-bold text-white" style={{ backgroundColor: tokens.accent2 }}>
              Scholarly Access
            </div>
            <h3 className="text-xl uppercase tracking-widest font-bold mb-2">The Archives</h3>
            <div className="text-4xl font-bold mb-8" style={{ fontFamily: 'var(--font-playfair)', color: tokens.accent2 }}>$4.99 <span className="text-sm font-light uppercase tracking-normal text-gray-500">/month</span></div>
            <ul className="space-y-4 mb-10">
              <li className="flex items-start gap-3"><Check className="h-5 w-5 mt-0.5" style={{ color: tokens.accent2 }}/> <span className="font-light">Full historical texts & lineage trees</span></li>
              <li className="flex items-start gap-3"><Check className="h-5 w-5 mt-0.5" style={{ color: tokens.accent2 }}/> <span className="font-light">High-res vintage photography</span></li>
              <li className="flex items-start gap-3"><Check className="h-5 w-5 mt-0.5" style={{ color: tokens.accent2 }}/> <span className="font-light">Ad-free reading experience</span></li>
            </ul>
            <button className="w-full py-4 text-sm uppercase tracking-widest font-bold text-white transition-opacity hover:opacity-90" style={{ backgroundColor: tokens.accent }}>
              Subscribe Now
            </button>
          </motion.div>
        </div>
      </div>
    </ArchiveSection>
  )
}

function Testimonials() {
  const reviews = [
    { text: "An indispensable resource for canine historians and serious breeders alike. The depth of the archival photography is unmatched online.", author: "Dr. Eleanor Vance", role: "Veterinary Historian" },
    { text: "Finally, a digital encyclopedia that treats the subject with the scholarly respect it deserves. The UI feels like reading a rare first edition.", author: "Thomas Wright", role: "AKC Judge" },
  ]

  return (
    <ArchiveSection className="border-t bg-white" style={{ borderColor: tokens.border }}>
      <div className="max-w-6xl mx-auto px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16" style={{ fontFamily: 'var(--font-playfair)' }}>Peer Reviewed</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {reviews.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="p-10 border relative bg-[#FDFCF0]"
              style={{ borderColor: tokens.border }}
            >
              <div className="absolute -top-4 -left-4 text-6xl opacity-20 font-serif" style={{ color: tokens.accent2 }}>&quot;</div>
              <p className="text-lg mb-8 font-light italic leading-relaxed relative z-10" style={{ color: tokens.textHigh }}>{r.text}</p>
              <div className="border-t pt-4" style={{ borderColor: tokens.border }}>
                <p className="font-bold uppercase tracking-wider text-sm">{r.author}</p>
                <p className="text-xs uppercase tracking-widest mt-1" style={{ color: tokens.accent2 }}>{r.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </ArchiveSection>
  )
}

function FAQ() {
  const faqs = [
    { q: "How frequently is the database updated?", a: "The archives are updated quarterly as new historical documents are verified and digitized by our research team." },
    { q: "Are extinct breeds included?", a: "Yes. We maintain extensive records on extinct breeds, including the Turnspit Dog, the Talbot Hound, and the Alpine Mastiff, detailing their lineages into modern breeds." },
    { q: "Can I use the images for my own research?", a: "Subscribers to 'The Archives' are granted limited educational licensing for high-resolution images. Commercial use requires a separate inquiry." },
  ]

  return (
    <ArchiveSection>
      <div className="max-w-3xl mx-auto px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" style={{ fontFamily: 'var(--font-playfair)' }}>Inquiries</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <FAQItem key={i} question={faq.q} answer={faq.a} />
          ))}
        </div>
      </div>
    </ArchiveSection>
  )
}

function FAQItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div
      className="border bg-white"
      style={{ borderColor: tokens.border }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-8 py-6 flex items-center justify-between font-bold text-left transition-colors hover:bg-black/5"
      >
        <span style={{ fontFamily: 'var(--font-playfair)', fontSize: '1.1rem' }}>{question}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
          <ChevronDown className="w-5 h-5 opacity-50" />
        </motion.div>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        className="overflow-hidden px-8"
      >
        <p className="pb-6 font-light leading-relaxed" style={{ color: tokens.textLow }}>{answer}</p>
      </motion.div>
    </motion.div>
  )
}

function Newsletter() {
  return (
    <ArchiveSection className="border-t bg-white" style={{ borderColor: tokens.border }}>
      <div className="max-w-2xl mx-auto px-8 text-center">
        <div className="mb-6 opacity-50" style={{ color: tokens.accent }}>
          <BookOpen className="w-8 h-8 mx-auto" />
        </div>
        <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>The Quarterly Ledger</h2>
        <p className="text-lg mb-8 font-light" style={{ color: tokens.textLow }}>Subscribe to receive digests of newly digitized archival records.</p>
        <form className="flex flex-col sm:flex-row gap-0 max-w-md mx-auto border" style={{ borderColor: tokens.border }} onSubmit={e => e.preventDefault()}>
          <input
            type="email"
            placeholder="Email address"
            className="flex-1 px-6 py-4 bg-transparent focus:outline-none placeholder-gray-400 font-light"
          />
          <button
            className="px-8 py-4 text-sm uppercase tracking-widest font-bold text-white transition-colors"
            style={{ backgroundColor: tokens.accent }}
          >
            Subscribe
          </button>
        </form>
      </div>
    </ArchiveSection>
  )
}

function Footer() {
  return (
    <footer className="py-12 text-center border-t" style={{ borderColor: tokens.border, backgroundColor: tokens.background }}>
      <div className="flex justify-center items-center gap-2 font-bold text-xl mb-4 tracking-wide" style={{ fontFamily: 'var(--font-playfair)', color: tokens.textHigh }}>
        {PRODUCT_NAME}
        
      </div>
      <p className="font-light text-sm uppercase tracking-widest" style={{ color: tokens.textLow }}>© 2026 {PRODUCT_NAME}. All rights reserved.</p>
    </footer>
  )
}
