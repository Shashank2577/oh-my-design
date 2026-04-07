'use client'

import React, { useState } from 'react'
import { motion, useScroll, useTransform, useSpring, useInView, Variants } from 'framer-motion'
import { ArrowRight, Leaf, Heart, ShieldCheck, Star, ChevronDown, Check, Menu, X, Droplets, Sun, Wind } from 'lucide-react'
import { Caveat, Nunito } from 'next/font/google'

const caveat = Caveat({ subsets: ['latin'], variable: '--font-caveat' })
const nunito = Nunito({ subsets: ['latin'], variable: '--font-nunito' })

const tokens = {
  background: '#FFFBEB',
  surface: '#FEF3C7',
  accent: '#D97706',
  accent2: '#059669',
  border: 'rgba(217, 119, 6, 0.2)',
  textHigh: '#451A03',
  textLow: '#92400E',
}

const PRODUCT_NAME = "SnoutSnack"

// Framer Motion Variants
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } }
}

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
}

const organicGrow: Variants = {
  hidden: { opacity: 0, scale: 0.8, rotate: -5 },
  visible: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 1, ease: [0.23, 1, 0.32, 1] } }
}

// Components
const OrganicSection = ({ children, className = '', id = '', style = {} }: { children: React.ReactNode, className?: string, id?: string, style?: React.CSSProperties }) => (
  <section id={id} className={`py-24 relative overflow-hidden ${className}`} style={style}>
    {children}
  </section>
)

const WaterColorStain = ({ className = '' }: { className?: string }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 0.4, scale: 1 }}
    transition={{ duration: 1.5, ease: [0.42, 0, 0.58, 1] }}
    className={`absolute rounded-full blur-3xl pointer-events-none ${className}`}
    style={{ backgroundColor: tokens.surface }}
  />
)

export default function SnoutSnackPage() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  return (
    <div className={`${nunito.variable} ${caveat.variable} font-sans min-h-screen text-[${tokens.textHigh}]`} style={{ backgroundColor: tokens.background, color: tokens.textHigh }}>
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
    <nav className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md border-b" style={{ borderColor: tokens.border, backgroundColor: 'rgba(255, 251, 235, 0.8)' }}>
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-2xl" style={{ fontFamily: 'var(--font-caveat)', color: tokens.accent }}>
          <Leaf className="h-6 w-6" style={{ color: tokens.accent2 }} />
          {PRODUCT_NAME}
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          {['Features', 'Ingredients', 'Pricing'].map((item) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              whileHover={{ y: -2, color: tokens.accent2 }}
              style={{ color: tokens.textLow }}
            >
              {item}
            </motion.a>
          ))}
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: tokens.accent }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 rounded-full text-white font-bold"
            style={{ backgroundColor: tokens.accent2 }}
          >
            Shop Now
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
    <OrganicSection className="pt-40 pb-32 text-center">
      <WaterColorStain className="w-[600px] h-[600px] -top-20 -left-20 opacity-30" />
      <WaterColorStain className="w-[500px] h-[500px] top-40 -right-20 opacity-20" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="flex flex-col items-center">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 border" style={{ borderColor: tokens.border, backgroundColor: tokens.surface }}>
            <Sun className="h-4 w-4" style={{ color: tokens.accent }} />
            <span className="text-sm font-medium" style={{ color: tokens.textLow }}>100% Organic Ingredients</span>
          </motion.div>

          <motion.h1 variants={fadeUp} className="text-6xl md:text-8xl font-bold mb-6" style={{ fontFamily: 'var(--font-caveat)', color: tokens.textHigh }}>
            Farm-to-Bowl <br/> Goodness
          </motion.h1>

          <motion.p variants={fadeUp} className="text-xl md:text-2xl mb-10 max-w-2xl" style={{ color: tokens.textLow }}>
            Wholesome, handcrafted treats that your dog will love, made with the same care as the food on your own table.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-full text-white font-bold text-lg shadow-lg"
              style={{ backgroundColor: tokens.accent2 }}
            >
              Explore Treats
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-full font-bold text-lg border-2"
              style={{ borderColor: tokens.accent, color: tokens.accent }}
            >
              Our Story
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </OrganicSection>
  )
}

function Stats() {
  const stats = [
    { label: 'Happy Tails', value: '10k+' },
    { label: 'Sourced Locally', value: '100%' },
    { label: 'Artificial Additives', value: '0' },
  ]

  return (
    <section className="py-16 border-y" style={{ borderColor: tokens.border, backgroundColor: tokens.surface }}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
        >
          {stats.map((s, i) => (
            <motion.div key={i} variants={fadeUp}>
              <div className="text-5xl font-bold mb-2" style={{ fontFamily: 'var(--font-caveat)', color: tokens.accent2 }}>{s.value}</div>
              <div className="text-lg font-medium" style={{ color: tokens.textLow }}>{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function Features() {
  const features = [
    { icon: <Leaf />, title: 'Real Ingredients', desc: 'No unpronounceable chemicals. Just real meat, veggies, and grains.' },
    { icon: <Heart />, title: 'Slow Baked', desc: 'Baked slowly in small batches to preserve nutrients and flavor.' },
    { icon: <Droplets />, title: 'Digestive Support', desc: 'Rich in natural prebiotics for a happy, healthy tummy.' },
  ]

  return (
    <OrganicSection id="features">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-caveat)' }}>Nature&apos;s Best</motion.h2>
          <motion.p variants={fadeUp} className="text-lg max-w-2xl mx-auto" style={{ color: tokens.textLow }}>Everything your dog needs, nothing they don&apos;t.</motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-12"
        >
          {features.map((f, i) => (
            <motion.div key={i} variants={organicGrow} className="relative group">
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" style={{ backgroundColor: tokens.surface }}></div>
              <div className="relative p-8 rounded-3xl border text-center flex flex-col items-center z-10 bg-white/50 backdrop-blur-sm" style={{ borderColor: tokens.border }}>
                <div className="p-4 rounded-full mb-6" style={{ backgroundColor: tokens.surface, color: tokens.accent2 }}>
                  {f.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3" style={{ color: tokens.textHigh }}>{f.title}</h3>
                <p style={{ color: tokens.textLow }}>{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </OrganicSection>
  )
}

function ProductDetail() {
  return (
    <OrganicSection id="ingredients" className="bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="w-full md:w-1/2"
          >
            <div className="aspect-square rounded-[3rem] p-12 flex items-center justify-center relative overflow-hidden" style={{ backgroundColor: tokens.surface }}>
              <WaterColorStain className="w-full h-full inset-0 opacity-50" />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: [0, 0, 1, 1] }}
                className="w-full h-full border-4 rounded-full border-dashed opacity-30 absolute"
                style={{ borderColor: tokens.accent }}
              />
              <div className="relative z-10 text-center">
                <Leaf className="w-32 h-32 mx-auto mb-6" style={{ color: tokens.accent2 }} />
                <h3 className="text-3xl font-bold" style={{ fontFamily: 'var(--font-caveat)', color: tokens.textHigh }}>Harvest Crunch</h3>
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
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'var(--font-caveat)' }}>
              Transparent Sourcing
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg mb-8" style={{ color: tokens.textLow }}>
              We partner directly with organic farms to ensure every ingredient is traceable, sustainable, and purely nutritious.
            </motion.p>

            <div className="space-y-6">
              {['Free-range chicken', 'Organic sweet potatoes', 'Fresh blueberries'].map((item, i) => (
                <motion.div key={i} variants={fadeUp} className="flex items-center gap-4">
                  <div className="p-2 rounded-full" style={{ backgroundColor: tokens.surface }}>
                    <Check className="h-5 w-5" style={{ color: tokens.accent2 }} />
                  </div>
                  <span className="text-xl font-medium" style={{ color: tokens.textHigh }}>{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </OrganicSection>
  )
}

function Pricing() {
  return (
    <OrganicSection id="pricing">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-caveat)' }}>Honest Pricing</h2>
          <p className="text-lg" style={{ color: tokens.textLow }}>Subscribe & save for regular deliveries of freshness.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <motion.div
            whileHover={{ y: -10 }}
            className="p-8 rounded-[2rem] border bg-white"
            style={{ borderColor: tokens.border }}
          >
            <h3 className="text-2xl font-bold mb-2">One-Time Pack</h3>
            <div className="text-4xl font-bold mb-6" style={{ fontFamily: 'var(--font-caveat)', color: tokens.accent }}>$18</div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-2"><Check className="h-5 w-5 text-green-600"/> 12oz Bag</li>
              <li className="flex items-center gap-2"><Check className="h-5 w-5 text-green-600"/> Standard Shipping</li>
            </ul>
            <button className="w-full py-4 rounded-full font-bold border-2" style={{ borderColor: tokens.accent, color: tokens.accent }}>
              Add to Cart
            </button>
          </motion.div>

          <motion.div
            whileHover={{ y: -10 }}
            className="p-8 rounded-[2rem] border-2 relative overflow-hidden"
            style={{ borderColor: tokens.accent2, backgroundColor: tokens.surface }}
          >
            <div className="absolute top-0 right-0 px-4 py-1 text-white text-sm font-bold rounded-bl-xl" style={{ backgroundColor: tokens.accent2 }}>
              Most Popular
            </div>
            <h3 className="text-2xl font-bold mb-2">Monthly Harvest</h3>
            <div className="text-4xl font-bold mb-6" style={{ fontFamily: 'var(--font-caveat)', color: tokens.accent2 }}>$15 <span className="text-lg font-normal">/mo</span></div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-2"><Check className="h-5 w-5 text-green-600"/> 12oz Bag</li>
              <li className="flex items-center gap-2"><Check className="h-5 w-5 text-green-600"/> Free Shipping</li>
              <li className="flex items-center gap-2"><Check className="h-5 w-5 text-green-600"/> Surprise Samples</li>
            </ul>
            <button className="w-full py-4 rounded-full font-bold text-white shadow-lg" style={{ backgroundColor: tokens.accent2 }}>
              Subscribe Now
            </button>
          </motion.div>
        </div>
      </div>
    </OrganicSection>
  )
}

function Testimonials() {
  const reviews = [
    { text: "My golden retriever has a sensitive stomach, but these treats have been absolutely perfect. He goes crazy for them!", author: "Sarah M.", pet: "Max's Mom" },
    { text: "Love the transparency of the ingredients. It actually smells like real food when you open the bag.", author: "David K.", pet: "Bella's Dad" },
    { text: "The subscription box is the highlight of our month. The little handwritten notes are such a sweet touch.", author: "Emily R.", pet: "Charlie's Mom" },
  ]

  return (
    <OrganicSection className="bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16" style={{ fontFamily: 'var(--font-caveat)' }}>Wags of Approval</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="p-8 rounded-[2rem] relative"
              style={{ backgroundColor: tokens.surface }}
            >
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, j) => <Star key={j} className="w-5 h-5 fill-current" />)}
              </div>
              <p className="text-lg mb-6 italic" style={{ color: tokens.textLow }}>&quot;{r.text}&quot;</p>
              <div>
                <p className="font-bold">{r.author}</p>
                <p className="text-sm" style={{ color: tokens.accent }}>{r.pet}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </OrganicSection>
  )
}

function FAQ() {
  const faqs = [
    { q: "Where do you source your ingredients?", a: "We work strictly with certified organic farms within a 100-mile radius of our kitchen to minimize carbon footprint and ensure freshness." },
    { q: "Are the treats grain-free?", a: "We offer both grain-free options and treats made with wholesome, ancient grains. You can filter by dietary needs in our shop." },
    { q: "How long do the treats last?", a: "Because we don't use artificial preservatives, our treats are best enjoyed within 6 weeks of opening. Store in a cool, dry place." },
  ]

  return (
    <OrganicSection>
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12" style={{ fontFamily: 'var(--font-caveat)' }}>Curious Minds</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <FAQItem key={i} question={faq.q} answer={faq.a} />
          ))}
        </div>
      </div>
    </OrganicSection>
  )
}

function FAQItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div
      className="border rounded-2xl overflow-hidden bg-white"
      style={{ borderColor: tokens.border }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between font-bold text-left"
      >
        {question}
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
          <ChevronDown className="w-5 h-5" style={{ color: tokens.accent }} />
        </motion.div>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        className="overflow-hidden px-6"
      >
        <p className="pb-4" style={{ color: tokens.textLow }}>{answer}</p>
      </motion.div>
    </motion.div>
  )
}

function Newsletter() {
  return (
    <OrganicSection className="bg-[#FEF3C7] border-y" style={{ borderColor: tokens.border }}>
      <div className="max-w-2xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-caveat)' }}>Join the Pack</h2>
        <p className="text-lg mb-8" style={{ color: tokens.textLow }}>Get recipes, nutrition tips, and 10% off your first order.</p>
        <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto" onSubmit={e => e.preventDefault()}>
          <input
            type="email"
            placeholder="your@email.com"
            className="flex-1 px-6 py-4 rounded-full border-none focus:ring-2 outline-none"
            style={{}}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-full text-white font-bold whitespace-nowrap"
            style={{ backgroundColor: tokens.accent }}
          >
            Subscribe
          </motion.button>
        </form>
      </div>
    </OrganicSection>
  )
}

function Footer() {
  return (
    <footer className="py-12 text-center" style={{ backgroundColor: tokens.background }}>
      <div className="flex justify-center items-center gap-2 font-bold text-2xl mb-6" style={{ fontFamily: 'var(--font-caveat)', color: tokens.accent }}>
        <Leaf className="h-6 w-6" style={{ color: tokens.accent2 }} />
        {PRODUCT_NAME}
        
      </div>
      <p style={{ color: tokens.textLow }}>© 2026 {PRODUCT_NAME}. Nourishing naturally.</p>
    </footer>
  )
}
