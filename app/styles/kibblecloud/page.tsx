'use client'

import { motion, useReducedMotion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Fraunces, Source_Sans_3 } from 'next/font/google'
import {
  Cloud, Leaf, Droplet, Star, ShoppingBag,
  Check, ChevronRight, PlayCircle, Truck, Calendar
} from 'lucide-react'

const primaryFont = Fraunces({
  subsets: ['latin'],
  variable: '--font-primary',
  display: 'swap',
})

const secondaryFont = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-secondary',
  display: 'swap',
})

const tokens = {
  background: '#FFFFFF',
  surface: '#F9FAFB',
  accent1: '#EA580C', // Fresh Carrot
  accent2: '#65A30D', // Leafy Green
  border: '#F3F4F6',
  textHigh: '#374151',
  textLow: '#6B7280',
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
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
    >
      {children}
    </motion.div>
  )
}

function StaggerContainer({ children }: { children: React.ReactNode }) {
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
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] } },
}

const PRODUCT_NAME = 'KibbleCloud'
const TAGLINE = 'Farm-Fresh Nutrition, Delivered.'
const DESCRIPTION = 'Custom-portioned, human-grade meals for your pet. Prepared with fresh ingredients and delivered to your door exactly when you need them.'

const NAV_LINKS = ['Our Food', 'How it Works', 'Reviews', 'FAQ']

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: isScrolled ? 'rgba(255,255,255,0.9)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(10px)' : 'none',
        borderBottom: isScrolled ? `1px solid ${tokens.border}` : '1px solid transparent',
        paddingTop: isScrolled ? '0' : '1rem'
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <span className="font-primary font-bold text-2xl flex items-center gap-2" style={{ color: tokens.accent1 }}>
          <Cloud className="w-8 h-8" />
          {PRODUCT_NAME}
        </span>
        <div className="hidden md:flex items-center gap-8 font-secondary">
          {NAV_LINKS.map(link => (
            <motion.a
              key={link}
              href={`#${link.toLowerCase().replace(' ', '-')}`}
              className="font-medium transition-colors"
              style={{ color: tokens.textHigh }}
              whileHover={{ color: tokens.accent1 }}
            >
              {link}
            </motion.a>
          ))}
        </div>
        <motion.button
          whileHover={{ scale: 1.05, paddingLeft: '1.75rem', paddingRight: '1.75rem' }}
          whileTap={{ scale: 0.95 }}
          className="px-6 h-12 rounded-full font-secondary font-semibold text-white transition-all shadow-md"
          style={{ backgroundColor: tokens.accent2 }}
        >
          Build a Plan
        </motion.button>
      </div>
    </motion.nav>
  )
}

function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden" style={{ backgroundColor: tokens.background }}>
      {/* Background Floaty Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 right-[10%] w-32 h-32 rounded-full opacity-20 blur-2xl"
          style={{ backgroundColor: tokens.accent1 }}
          animate={{ y: [0, -30, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: [0.42, 0, 0.58, 1] as [number, number, number, number] }}
        />
        <motion.div
          className="absolute bottom-20 left-[10%] w-48 h-48 rounded-full opacity-20 blur-3xl"
          style={{ backgroundColor: tokens.accent2 }}
          animate={{ y: [0, 40, 0], x: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: [0.42, 0, 0.58, 1] as [number, number, number, number] }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.2, delayChildren: 0.1 }}
          className="max-w-xl"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 font-secondary font-semibold text-sm"
            style={{ backgroundColor: tokens.surface, color: tokens.accent2, border: `1px solid ${tokens.border}` }}
          >
            <Leaf className="w-4 h-4" /> 100% Organic Ingredients
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-7xl font-primary leading-[1.1] mb-6"
            style={{ color: tokens.textHigh }}
          >
            {TAGLINE}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-lg mb-10 font-secondary leading-relaxed"
            style={{ color: tokens.textLow }}
          >
            {DESCRIPTION}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="h-14 px-8 rounded-full font-secondary font-bold text-white shadow-lg flex items-center justify-center gap-2"
              style={{ backgroundColor: tokens.accent1 }}
            >
              Get Started <ChevronRight className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: tokens.surface }}
              whileTap={{ scale: 0.95 }}
              className="h-14 px-8 rounded-full font-secondary font-semibold flex items-center justify-center gap-2 transition-colors"
              style={{ color: tokens.textHigh, border: `1px solid ${tokens.border}` }}
            >
              <PlayCircle className="w-5 h-5" style={{ color: tokens.accent1 }} /> See How It's Made
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Hero Visual */}
        <div className="relative h-[600px] hidden lg:flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] }}
            className="relative w-96 h-96 rounded-full flex items-center justify-center shadow-2xl"
            style={{ backgroundColor: tokens.surface, border: `1px solid ${tokens.border}` }}
          >
            {/* Inner Plate */}
            <div className="w-80 h-80 rounded-full bg-white shadow-inner flex items-center justify-center relative overflow-hidden">
              {/* Abstract Representation of Food */}
              <motion.div
                className="absolute"
                animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: [0.42, 0, 0.58, 1] as [number, number, number, number] }}
              >
                <div className="w-48 h-48 rounded-full opacity-50 blur-xl" style={{ backgroundColor: tokens.accent1 }} />
              </motion.div>
              <motion.div
                className="absolute"
                animate={{ y: [0, 15, 0], x: [0, -10, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: [0.42, 0, 0.58, 1] as [number, number, number, number] }}
              >
                <div className="w-40 h-40 rounded-full opacity-50 blur-xl mix-blend-multiply" style={{ backgroundColor: tokens.accent2 }} />
              </motion.div>
              <ShoppingBag className="w-24 h-24 relative z-10" style={{ color: tokens.textHigh }} strokeWidth={1} />
            </div>

            {/* Floating Ingredient Badges */}
            <motion.div
              className="absolute -top-4 right-10 bg-white p-3 rounded-2xl shadow-lg border flex items-center gap-2"
              style={{ borderColor: tokens.border }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: [0.42, 0, 0.58, 1] as [number, number, number, number], delay: 1 }}
            >
              <Leaf className="w-5 h-5" style={{ color: tokens.accent2 }} />
              <span className="font-secondary text-sm font-semibold" style={{ color: tokens.textHigh }}>Fresh Veggies</span>
            </motion.div>

            <motion.div
              className="absolute bottom-10 -left-6 bg-white p-3 rounded-2xl shadow-lg border flex items-center gap-2"
              style={{ borderColor: tokens.border }}
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: [0.42, 0, 0.58, 1] as [number, number, number, number], delay: 0.5 }}
            >
              <Droplet className="w-5 h-5" style={{ color: tokens.accent1 }} />
              <span className="font-secondary text-sm font-semibold" style={{ color: tokens.textHigh }}>Rich in Omega-3</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function Benefits() {
  const benefits = [
    { title: 'Human-Grade Quality', desc: 'If you wouldn\'t eat it, neither should they. 100% whole foods.' },
    { title: 'Perfectly Portioned', desc: 'Pre-packaged meals tailored to their age, weight, and activity level.' },
    { title: 'Delivered Fresh', desc: 'Cooked gently and frozen immediately to lock in nutrients.' }
  ]

  return (
    <section className="py-20" style={{ backgroundColor: tokens.surface }}>
      <div className="max-w-7xl mx-auto px-6">
        <StaggerContainer>
          <div className="grid md:grid-cols-3 gap-10">
            {benefits.map((b, i) => (
              <motion.div key={i} variants={staggerItem} className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center bg-white shadow-sm border" style={{ borderColor: tokens.border }}>
                  <Check className="w-8 h-8" style={{ color: tokens.accent2 }} />
                </div>
                <h3 className="font-primary text-2xl mb-3" style={{ color: tokens.textHigh }}>{b.title}</h3>
                <p className="font-secondary" style={{ color: tokens.textLow }}>{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  )
}

function IngredientPie() {
  const ingredients = [
    { name: 'Lean Protein', pct: '50%', color: tokens.accent1 },
    { name: 'Fresh Vegetables', pct: '30%', color: tokens.accent2 },
    { name: 'Healthy Fats', pct: '10%', color: '#EAB308' },
    { name: 'Essential Vitamins', pct: '10%', color: '#3B82F6' }
  ]

  return (
    <section id="our-food" className="py-24" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <FadeUp>
            <h2 className="font-primary text-4xl md:text-5xl mb-6" style={{ color: tokens.textHigh }}>What's in the bowl?</h2>
            <p className="font-secondary text-lg mb-8 leading-relaxed" style={{ color: tokens.textLow }}>
              We believe in complete transparency. Every recipe is formulated by veterinary nutritionists using only recognizable, whole-food ingredients.
            </p>
            <div className="space-y-6">
              {ingredients.map((ing, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white shadow-sm" style={{ backgroundColor: ing.color }}>
                    {ing.pct}
                  </div>
                  <span className="font-primary text-xl" style={{ color: tokens.textHigh }}>{ing.name}</span>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>

        <div className="relative h-[400px] flex items-center justify-center">
          <FadeUp delay={0.2}>
            <div className="relative w-80 h-80 rounded-full shadow-2xl flex items-center justify-center overflow-hidden" style={{ backgroundColor: tokens.surface }}>
              {/* Simulated Pie Chart */}
              <div className="absolute inset-0" style={{ background: `conic-gradient(${tokens.accent1} 0% 50%, ${tokens.accent2} 50% 80%, #EAB308 80% 90%, #3B82F6 90% 100%)` }} />
              {/* Center cutout to make it a donut */}
              <div className="absolute w-40 h-40 rounded-full bg-white flex items-center justify-center shadow-inner">
                <span className="font-primary text-2xl font-bold" style={{ color: tokens.textHigh }}>100% Real</span>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}

function HowItWorks() {
  const steps = [
    { icon: Droplet, title: 'Tell us about your pet', desc: 'Age, weight, breed, and activity level help us calculate their exact caloric needs.' },
    { icon: Cloud, title: 'We cook & portion', desc: 'Meals are gently cooked in our human-grade kitchens and portioned specifically for them.' },
    { icon: Truck, title: 'Delivered to your door', desc: 'Arrives frozen. Just thaw, open, and pour. Regular deliveries ensure you never run out.' }
  ]

  return (
    <section id="how-it-works" className="py-24 border-y" style={{ backgroundColor: tokens.surface, borderColor: tokens.border }}>
      <div className="max-w-6xl mx-auto px-6">
        <FadeUp>
          <div className="text-center mb-16">
            <h2 className="font-primary text-4xl md:text-5xl mb-4" style={{ color: tokens.textHigh }}>Farm to Bowl in 3 Steps</h2>
            <p className="font-secondary text-lg" style={{ color: tokens.textLow }}>A subscription that makes mealtime effortless.</p>
          </div>
        </FadeUp>

        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 -translate-y-1/2 bg-white rounded-full overflow-hidden">
             <motion.div
              className="h-full"
              style={{ backgroundColor: tokens.accent2 }}
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: [0.42, 0, 0.58, 1] as [number, number, number, number] }}
            />
          </div>

          <div className="grid md:grid-cols-3 gap-12 relative z-10">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.4 }}
                className="bg-white p-8 rounded-[2rem] shadow-sm border text-center relative"
                style={{ borderColor: tokens.border }}
              >
                <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6 border-4 border-white shadow-md" style={{ backgroundColor: tokens.accent2 }}>
                  <span className="font-bold text-white text-xl">{i + 1}</span>
                </div>
                <h3 className="font-primary text-xl mb-3" style={{ color: tokens.textHigh }}>{step.title}</h3>
                <p className="font-secondary" style={{ color: tokens.textLow }}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Testimonials() {
  const reviews = [
    { text: "Since switching, his coat is shinier and he has so much more energy. The pre-portioned packs are a lifesaver.", author: "Amanda K.", pet: "Mom to Buster" },
    { text: "I love knowing exactly what my dog is eating. The ingredients look like real food because they are real food.", author: "David P.", pet: "Dad to Bella" },
    { text: "Delivery is always on time, and customer service is fantastic. Highly recommend KibbleCloud!", author: "Jessica T.", pet: "Mom to Charlie" },
  ]

  return (
    <section id="reviews" className="py-24" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-6xl mx-auto px-6">
        <FadeUp>
          <div className="text-center mb-16">
            <h2 className="font-primary text-4xl md:text-5xl mb-4" style={{ color: tokens.textHigh }}>Happy Pets, Happy People</h2>
          </div>
        </FadeUp>
        <StaggerContainer>
          <div className="grid md:grid-cols-3 gap-8">
            {reviews.map((r, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                className="p-8 rounded-[2rem] border bg-white shadow-sm flex flex-col"
                style={{ borderColor: tokens.border }}
              >
                <div className="flex gap-1 mb-6">
                  {[1,2,3,4,5].map(star => <Star key={star} className="w-5 h-5 fill-current" style={{ color: '#EAB308' }} />)}
                </div>
                <p className="font-secondary text-lg italic mb-8 flex-grow" style={{ color: tokens.textLow }}>"{r.text}"</p>
                <div>
                  <p className="font-primary font-bold text-lg" style={{ color: tokens.textHigh }}>{r.author}</p>
                  <p className="font-secondary text-sm" style={{ color: tokens.accent1 }}>{r.pet}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  )
}

function CTA() {
  return (
    <section className="py-24 relative overflow-hidden" style={{ backgroundColor: tokens.accent2 }}>
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <FadeUp>
          <h2 className="font-primary text-4xl md:text-5xl font-bold mb-6 text-white">Ready for a Healthier Pet?</h2>
          <p className="font-secondary text-xl text-green-100 mb-10 max-w-2xl mx-auto">Take our 2-minute quiz to get a customized meal plan and 50% off your first box.</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="h-16 px-10 rounded-full font-secondary font-bold text-lg bg-white shadow-xl flex items-center justify-center gap-2 mx-auto"
            style={{ color: tokens.accent2 }}
          >
            Start Your Trial <ChevronRight className="w-5 h-5" />
          </motion.button>
        </FadeUp>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="py-12" style={{ backgroundColor: tokens.background, borderTop: `1px solid ${tokens.border}` }}>
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8 mb-12">
        <div className="col-span-2">
          <span className="font-primary font-bold text-2xl flex items-center gap-2 mb-4" style={{ color: tokens.accent1 }}>
            <Cloud className="w-8 h-8" />
            {PRODUCT_NAME}
          </span>
          <p className="font-secondary text-sm max-w-sm" style={{ color: tokens.textLow }}>
            We're on a mission to improve pet health through real, transparent nutrition.
          </p>
        </div>
        <div className="font-secondary text-sm space-y-3">
          <h4 className="font-bold font-primary" style={{ color: tokens.textHigh }}>Company</h4>
          <p><a href="#" className="hover:underline" style={{ color: tokens.textLow }}>About Us</a></p>
          <p><a href="#" className="hover:underline" style={{ color: tokens.textLow }}>Careers</a></p>
          <p><a href="#" className="hover:underline" style={{ color: tokens.textLow }}>Contact</a></p>
        </div>
        <div className="font-secondary text-sm space-y-3">
          <h4 className="font-bold font-primary" style={{ color: tokens.textHigh }}>Support</h4>
          <p><a href="#" className="hover:underline" style={{ color: tokens.textLow }}>FAQ</a></p>
          <p><a href="#" className="hover:underline" style={{ color: tokens.textLow }}>Shipping</a></p>
          <p><a href="#" className="hover:underline" style={{ color: tokens.textLow }}>Returns</a></p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 font-secondary text-sm" style={{ borderColor: tokens.border, color: tokens.textLow }}>
        <p>© 2026 {PRODUCT_NAME}. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Terms of Service</a>
        </div>
      </div>
    </footer>
  )
}

export default function KibbleCloudPage() {
  return (
    <div className={`${primaryFont.variable} ${secondaryFont.variable} font-primary`}>
      <Navbar />
      <main>
        <Hero />
        <Benefits />
        <IngredientPie />
        <HowItWorks />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
      
      </div>
  )
}