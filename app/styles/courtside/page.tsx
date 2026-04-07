'use client'

import React, { useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Teko, Kanit } from 'next/font/google'
import { ArrowRight, Check, Star, ChevronDown, Activity, Play, Trophy, Users, Shield, Target } from 'lucide-react'

const teko = Teko({ subsets: ['latin'], weight: ['400', '600', '700'], variable: '--font-teko' })
const kanit = Kanit({ subsets: ['latin'], weight: ['400', '500', '700', '800'], variable: '--font-kanit' })

const tokens = {
  background: '#0F0F0F',
  surface: '#F5DEB3', // Polished Maple Texture approximation
  surfaceDark: '#1A1A1A',
  accent: '#FF6B00', // Spalding Orange
  accentDark: '#cc5500',
  accent2: '#2D2D2D', // Asphalt
  border: 'rgba(255, 107, 0, 0.3)',
  textHigh: '#FFFFFF',
  textLow: '#888888',
  textSurface: '#2D2D2D'
}

const reboundSpring: import('framer-motion').Transition = { type: 'spring', stiffness: 600, damping: 12, mass: 0.7 }
const jumpVariants: import('framer-motion').Variants = {
  hidden: { y: 100, opacity: 0 },
  visible: { y: [100, -20, 0], opacity: 1, transition: reboundSpring }
}

const PRODUCT_NAME = "HOOPMETRICS"

function ShotClockBg() {
  const [seconds, setSeconds] = useState(24)
  const isBuzzer = seconds <= 5

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(s => (s > 0 ? s - 1 : 24))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none flex items-center justify-center overflow-hidden z-0">
      <motion.div
        animate={{ color: isBuzzer ? tokens.accent : 'rgba(45,45,45,0.1)' }}
        className="text-[40vw] font-teko font-bold leading-none select-none opacity-20"
      >
        {seconds.toString().padStart(2, '0')}
      </motion.div>
      <AnimatePresence>
        {isBuzzer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.2, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="absolute inset-0 border-[16px]"
            style={{ borderColor: tokens.accent }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

function CourtButton({ children, className = '', onClick }: { children: React.ReactNode, className?: string, onClick?: () => void }) {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 })

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onMouseMove={(e: React.MouseEvent<HTMLButtonElement>) => {
        const rect = e.currentTarget.getBoundingClientRect()
        setMousePos({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100
        })
      }}
      onClick={onClick}
      className={`relative overflow-hidden rounded-xl font-kanit font-bold tracking-wide uppercase px-8 py-4 ${className}`}
      style={{ backgroundColor: tokens.accent, color: tokens.textHigh }}
    >
      <div
        className="absolute inset-0 opacity-50 pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(255,255,255,0.4) 0%, transparent 60%)`
        }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  )
}

function SectionWrapper({ children, className = '', id, style }: { children: React.ReactNode, className?: string, id?: string, style?: React.CSSProperties }) {
  return (
    <motion.section
      id={id}
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={`relative z-10 py-24 ${className}`}
    >
      {children}
    </motion.section>
  )
}

export default function CourtSidePage() {
  const { scrollYProgress } = useScroll()
  const yBg = useTransform(scrollYProgress, [0, 1], [0, 200])

  return (
    <div className={`${teko.variable} ${kanit.variable} bg-[#0F0F0F] min-h-screen text-white overflow-x-hidden`}>
      <ShotClockBg />

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center bg-[#0F0F0F]/80 backdrop-blur-md border-b" style={{ borderColor: tokens.border }}>
        <div className="font-teko text-3xl font-bold tracking-wider" style={{ color: tokens.accent }}>{PRODUCT_NAME}</div>
        <div className="hidden md:flex gap-8 font-kanit text-sm uppercase tracking-widest" style={{ color: tokens.textLow }}>
          <a href="#features" className="hover:text-white transition-colors">Playbook</a>
          <a href="#stats" className="hover:text-white transition-colors">Stats</a>
          <a href="#pricing" className="hover:text-white transition-colors">Draft</a>
        </div>
        <CourtButton className="!px-6 !py-2 text-sm">Join Team</CourtButton>
      </nav>

      <main className="relative pt-32">
        {/* Hero */}
        <SectionWrapper id="hero" className="min-h-[80vh] flex items-center justify-center text-center px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div variants={jumpVariants}>
              <h1 className="font-teko text-[120px] leading-[0.9] font-bold mb-6 uppercase tracking-tighter" style={{ color: tokens.textHigh }}>
                Above the Rim Analytics
              </h1>
            </motion.div>
            <motion.p variants={jumpVariants} className="font-kanit text-xl md:text-2xl mb-10 max-w-2xl mx-auto" style={{ color: tokens.textLow }}>
              Elite tracking for elite performers. Measure every squeak, snap, and swish with millisecond precision.
            </motion.p>
            <motion.div variants={jumpVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
              <CourtButton>Start Free Trial <ArrowRight className="inline ml-2" /></CourtButton>
              <button className="px-8 py-4 rounded-xl font-kanit font-bold uppercase tracking-wide border-2 hover:bg-white/5 transition-colors" style={{ borderColor: tokens.border, color: tokens.textHigh }}>
                Watch Film <Play className="inline ml-2 w-5 h-5" />
              </button>
            </motion.div>
          </div>
        </SectionWrapper>

        {/* Stats */}
        <SectionWrapper id="stats" className="bg-[#1A1A1A] border-y" style={{ borderColor: tokens.border }}>
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Teams Using', value: '1,000+' },
              { label: 'Shots Tracked', value: '50M+' },
              { label: 'Accuracy', value: '99.9%' },
              { label: 'Uptime', value: '24/7/365' }
            ].map((stat, i) => (
              <motion.div
                key={i}
                variants={jumpVariants}
                className="text-center"
              >
                <div className="font-teko text-6xl font-bold mb-2" style={{ color: tokens.accent }}>{stat.value}</div>
                <div className="font-kanit text-sm uppercase tracking-widest" style={{ color: tokens.textLow }}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </SectionWrapper>

        {/* Features */}
        <SectionWrapper id="features" className="px-6">
          <div className="max-w-6xl mx-auto">
            <motion.h2 variants={jumpVariants} className="font-teko text-7xl font-bold text-center mb-16 uppercase">
              The Playbook
            </motion.h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Activity, title: 'Real-Time Telemetry', desc: 'Instant feedback on shot arc, release speed, and entry angle.' },
                { icon: Target, title: 'Heatmaps', desc: 'Visualize your hot zones and cold spots on the court dynamically.' },
                { icon: Users, title: 'Roster Management', desc: 'Track player loads, manage minutes, and optimize rotations.' },
                { icon: Shield, title: 'Defensive Metrics', desc: 'Calculate contest rates, blow-bys, and defensive impact scores.' },
                { icon: Trophy, title: 'Leaderboards', desc: 'Gamify practice with team-wide shooting leaderboards.' },
                { icon: Play, title: 'Video Sync', desc: 'Automatically sync stats with game film for instant breakdown.' }
              ].map((f, i) => (
                <motion.div
                  key={i}
                  variants={jumpVariants}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="p-8 rounded-2xl border"
                  style={{ backgroundColor: tokens.surfaceDark, borderColor: tokens.border }}
                >
                  <f.icon className="w-10 h-10 mb-6" style={{ color: tokens.accent }} />
                  <h3 className="font-kanit text-xl font-bold mb-3 uppercase tracking-wide">{f.title}</h3>
                  <p className="font-kanit text-sm leading-relaxed" style={{ color: tokens.textLow }}>{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </SectionWrapper>

        {/* Product Detail */}
        <SectionWrapper className="px-6 bg-[#F5DEB3] text-[#2D2D2D]">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <motion.div variants={jumpVariants}>
              <div className="font-kanit text-sm font-bold uppercase tracking-widest mb-4" style={{ color: tokens.accentDark }}>The Hardwood Advantage</div>
              <h2 className="font-teko text-7xl font-bold leading-none mb-6 uppercase">Built for the Grind</h2>
              <p className="font-kanit text-lg mb-6 leading-relaxed">
                We didn't just build a spreadsheet. We built a system that understands the physics of basketball. From the squeak of the sneaker to the snap of the net, every movement is quantified.
              </p>
              <p className="font-kanit text-lg leading-relaxed">
                Whether you're running a high school program or an elite professional squad, our analytics give you the marginal gains needed to secure the championship.
              </p>
            </motion.div>
            <motion.div variants={jumpVariants} className="relative aspect-square rounded-3xl overflow-hidden border-8 border-[#2D2D2D]">
              {/* Abstract Court graphic */}
              <div className="absolute inset-0 bg-[#F5DEB3] border-[16px] border-[#2D2D2D] m-4 rounded-xl flex items-center justify-center">
                <div className="w-32 h-32 rounded-full border-8 border-[#2D2D2D]" />
                <div className="absolute w-1/2 h-full border-r-8 border-[#2D2D2D] left-0" />
              </div>
            </motion.div>
          </div>
        </SectionWrapper>

        {/* Pricing */}
        <SectionWrapper id="pricing" className="px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div variants={jumpVariants} className="text-center mb-16">
              <h2 className="font-teko text-7xl font-bold uppercase">Draft Your Plan</h2>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: 'Rookie', price: 'Free', period: '', desc: 'For pickup games', features: ['Basic stats', 'Single player', 'Community access'] },
                { name: 'Starter', price: '$29', period: '/mo', desc: 'For dedicated hoopers', features: ['Advanced metrics', 'Video sync', 'Shot charts'], highlighted: true },
                { name: 'Franchise', price: '$99', period: '/mo', desc: 'For entire programs', features: ['Full roster', 'Custom reports', 'API access'] }
              ].map((tier, i) => (
                <motion.div
                  key={i}
                  variants={jumpVariants}
                  whileHover={{ y: -20, transition: reboundSpring }}
                  className={`p-8 rounded-3xl border-2 flex flex-col ${tier.highlighted ? 'relative' : ''}`}
                  style={{
                    backgroundColor: tier.highlighted ? tokens.surfaceDark : tokens.background,
                    borderColor: tier.highlighted ? tokens.accent : tokens.border
                  }}
                >
                  {tier.highlighted && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#FF6B00] text-white px-4 py-1 rounded-full font-kanit text-xs font-bold uppercase tracking-widest">
                      Most Popular
                    </div>
                  )}
                  <h3 className="font-teko text-4xl font-bold uppercase mb-2">{tier.name}</h3>
                  <div className="mb-4">
                    <span className="font-teko text-6xl font-bold" style={{ color: tier.highlighted ? tokens.accent : tokens.textHigh }}>{tier.price}</span>
                    <span className="font-kanit text-sm" style={{ color: tokens.textLow }}>{tier.period}</span>
                  </div>
                  <p className="font-kanit text-sm mb-8" style={{ color: tokens.textLow }}>{tier.desc}</p>
                  <ul className="space-y-4 mb-8 flex-1">
                    {tier.features.map((f, j) => (
                      <li key={j} className="flex items-center font-kanit text-sm">
                        <Check className="w-5 h-5 mr-3" style={{ color: tokens.accent }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button
                    className="w-full py-4 rounded-xl font-kanit font-bold uppercase tracking-wide border-2 transition-colors"
                    style={{
                      backgroundColor: tier.highlighted ? tokens.accent : 'transparent',
                      borderColor: tokens.accent,
                      color: tokens.textHigh
                    }}
                  >
                    Select Plan
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </SectionWrapper>

        {/* Testimonials */}
        <SectionWrapper className="bg-[#1A1A1A] border-y" style={{ borderColor: tokens.border }}>
          <div className="max-w-6xl mx-auto px-6">
            <motion.h2 variants={jumpVariants} className="font-teko text-7xl font-bold text-center mb-16 uppercase">Hall of Fame</motion.h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: 'Marcus T.', role: 'Head Coach', quote: "HoopMetrics completely changed our rotation strategy. We won the state championship because of the data." },
                { name: 'Sarah J.', role: 'Shooting Guard', quote: "Seeing my heatmaps in real-time helped me fix my mechanics from the left wing." },
                { name: 'David W.', role: 'Trainer', quote: "The video sync feature alone is worth the price. Immediate feedback for my clients." }
              ].map((t, i) => (
                <motion.div
                  key={i}
                  variants={jumpVariants}
                  className="p-8 rounded-2xl border bg-[#0F0F0F]"
                  style={{ borderColor: tokens.border }}
                >
                  <div className="flex gap-1 mb-6">
                    {[1,2,3,4,5].map(star => <Star key={star} className="w-5 h-5 fill-current" style={{ color: tokens.accent }} />)}
                  </div>
                  <p className="font-kanit text-lg italic mb-6" style={{ color: tokens.textLow }}>"{t.quote}"</p>
                  <div className="font-kanit">
                    <div className="font-bold uppercase" style={{ color: tokens.textHigh }}>{t.name}</div>
                    <div className="text-sm" style={{ color: tokens.accent }}>{t.role}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </SectionWrapper>

        {/* FAQ */}
        <SectionWrapper className="px-6">
          <div className="max-w-3xl mx-auto">
            <motion.h2 variants={jumpVariants} className="font-teko text-7xl font-bold text-center mb-16 uppercase">Scouting Report (FAQ)</motion.h2>
            <div className="space-y-4">
              {[
                { q: "How does the tracking work?", a: "We use a combination of computer vision and proprietary algorithms to track the ball and players using just standard game footage." },
                { q: "Do I need special hardware?", a: "No. Any standard 1080p camera or high-end smartphone works perfectly." },
                { q: "How long does video sync take?", a: "Our cloud servers process game film in about 15 minutes post-upload." },
                { q: "Can I export data?", a: "Yes, all data can be exported to CSV or accessed via our API on the Franchise plan." },
                { q: "Is it suitable for youth leagues?", a: "Absolutely. We have plans tailored for all levels of play." },
                { q: "What's the cancellation policy?", a: "Cancel anytime. No long-term contracts required." }
              ].map((faq, i) => (
                <FAQItem key={i} question={faq.q} answer={faq.a} />
              ))}
            </div>
          </div>
        </SectionWrapper>

        {/* Newsletter */}
        <SectionWrapper className="bg-[#FF6B00] text-[#0F0F0F] text-center px-6">
          <div className="max-w-2xl mx-auto py-12">
            <motion.h2 variants={jumpVariants} className="font-teko text-7xl font-bold mb-6 uppercase">Get on the Roster</motion.h2>
            <motion.p variants={jumpVariants} className="font-kanit text-xl mb-8 font-medium">Subscribe for product updates, coaching tips, and exclusive offers.</motion.p>
            <motion.form variants={jumpVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-6 py-4 rounded-xl font-kanit text-lg w-full sm:w-auto flex-1 bg-[#0F0F0F] text-white border-2 border-transparent focus:border-white outline-none"
              />
              <button className="px-8 py-4 rounded-xl font-kanit font-bold uppercase tracking-wide bg-[#0F0F0F] text-white hover:bg-[#1A1A1A] transition-colors">
                Subscribe
              </button>
            </motion.form>
          </div>
        </SectionWrapper>
      </main>

      {/* Footer */}
      <footer className="bg-[#0F0F0F] border-t py-16 px-6" style={{ borderColor: tokens.border }}>
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-2">
            <div className="font-teko text-4xl font-bold mb-4" style={{ color: tokens.accent }}>{PRODUCT_NAME}</div>
            <p className="font-kanit text-sm max-w-sm mb-6" style={{ color: tokens.textLow }}>
              Elevating the game through data. Built for players, coaches, and fans who respect the grind.
            </p>
          </div>
          <div>
            <h4 className="font-kanit font-bold uppercase mb-4 text-white">Product</h4>
            <ul className="space-y-2 font-kanit text-sm" style={{ color: tokens.textLow }}>
              <li><a href="#" className="hover:text-white">Features</a></li>
              <li><a href="#" className="hover:text-white">Pricing</a></li>
              <li><a href="#" className="hover:text-white">Case Studies</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-kanit font-bold uppercase mb-4 text-white">Company</h4>
            <ul className="space-y-2 font-kanit text-sm" style={{ color: tokens.textLow }}>
              <li><a href="#" className="hover:text-white">About</a></li>
              <li><a href="#" className="hover:text-white">Careers</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-kanit font-bold uppercase mb-4 text-white">Legal</h4>
            <ul className="space-y-2 font-kanit text-sm" style={{ color: tokens.textLow }}>
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-16 pt-8 border-t flex flex-col md:flex-row justify-between items-center font-kanit text-sm" style={{ borderColor: tokens.border, color: tokens.textLow }}>
          <div>© 2026 {PRODUCT_NAME}. All rights reserved.</div>
          <a href="/" className="mt-4 md:mt-0 hover:text-white transition-colors">← Back to Styles</a>
        </div>
      </footer>
      
      </div>
  )
}

function FAQItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div
      variants={jumpVariants}
      className="border-b"
      style={{ borderColor: tokens.border }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex justify-between items-center text-left"
      >
        <span className="font-kanit text-lg font-bold uppercase" style={{ color: tokens.textHigh }}>{question}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
          <ChevronDown style={{ color: tokens.accent }} />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="font-kanit pb-6" style={{ color: tokens.textLow }}>{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
