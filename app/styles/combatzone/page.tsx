'use client'

import React, { useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Anton, Work_Sans } from 'next/font/google'
import { ArrowRight, Check, Star, ChevronDown, Activity, Play, Trophy, Users, Shield, Target, Zap } from 'lucide-react'

const anton = Anton({ subsets: ['latin'], weight: ['400'], variable: '--font-anton' })
const workSans = Work_Sans({ subsets: ['latin'], weight: ['400', '600', '700', '800'], variable: '--font-work' })

const tokens = {
  background: '#000000', // The Void
  surface: '#1A1A1A', // Concrete
  accent: '#D32F2F', // Blood Red
  accent2: '#FFD700', // Championship Gold
  border: '#333333',
  textHigh: '#FFFFFF',
  textLow: '#666666'
}

const PRODUCT_NAME = "BLOOD&IRON"

function CombatButton({ children, className = '', onClick }: { children: React.ReactNode, className?: string, onClick?: () => void }) {
  const [isImpact, setIsImpact] = useState(false)

  return (
    <div className="relative inline-block">
      <AnimatePresence>
        {isImpact && (
          <motion.div
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 0, scale: 1.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-white z-20 pointer-events-none"
          />
        )}
      </AnimatePresence>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.95 }}
        onClick={(e) => {
          setIsImpact(true)
          setTimeout(() => setIsImpact(false), 300)
          if(onClick) onClick()
        }}
        className={`relative px-8 py-4 font-anton text-2xl uppercase tracking-wider overflow-hidden group ${className}`}
        style={{
          backgroundColor: tokens.background,
          color: tokens.textHigh,
          border: `2px solid ${tokens.accent}`,
          clipPath: 'polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%)' // Rough, torn edges look approximation
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#D32F2F] to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
        <span className="relative z-10">{children}</span>
      </motion.button>
    </div>
  )
}

function SectionWrapper({ children, className = '', id, style }: { children: React.ReactNode, className?: string, id?: string, style?: React.CSSProperties }) {
  return (
    <motion.section
      id={id}
      style={style}
      initial={{ y: 100, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ type: "spring", stiffness: 100, damping: 10, mass: 2 }} // Heavyweight Drop
      className={`relative z-10 py-24 ${className}`}
    >
      {children}
    </motion.section>
  )
}

function TaleOfTheTape() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="relative w-full max-w-4xl mx-auto h-[400px] flex items-center justify-center border-y-4 border-[#333333] my-20 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* "VS" Center */}
      <div className="absolute z-30 font-anton text-8xl text-[#FFD700] mix-blend-difference pointer-events-none">
        VS
      </div>

      {/* Sparks Particle System */}
      <AnimatePresence>
        {isHovered && (
          <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
                animate={{
                  opacity: 0,
                  scale: Math.random() * 2 + 1,
                  x: (Math.random() - 0.5) * 400,
                  y: (Math.random() - 0.5) * 400
                }}
                transition={{ duration: 0.5 + Math.random() * 0.5, ease: "easeOut" }}
                className="absolute w-2 h-2 bg-[#FFD700]"
                style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Fighter 1 */}
      <motion.div
        initial={{ x: -500 }}
        whileInView={{ x: 0 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="w-1/2 h-full bg-[#1A1A1A] border-r-2 border-[#333333] flex flex-col justify-center items-end pr-12 relative"
      >
        <motion.div
          animate={{ scale: isHovered ? 1.1 : 1, transformOrigin: 'right center' }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          className="text-right"
        >
          <div className="font-work text-[#D32F2F] font-bold tracking-widest uppercase mb-2">Red Corner</div>
          <div className="font-anton text-6xl text-white mb-4">THE<br/>STRIKER</div>
          <div className="flex flex-col gap-2 font-work text-sm text-[#666666] uppercase">
            <div className="flex justify-between w-48"><span className="text-white">Power</span> <span>95</span></div>
            <div className="h-1 bg-[#333333] w-48"><div className="h-full bg-[#D32F2F] w-[95%]" /></div>
            <div className="flex justify-between w-48"><span className="text-white">Speed</span> <span>88</span></div>
            <div className="h-1 bg-[#333333] w-48"><div className="h-full bg-[#D32F2F] w-[88%]" /></div>
          </div>
        </motion.div>
      </motion.div>

      {/* Fighter 2 */}
      <motion.div
        initial={{ x: 500 }}
        whileInView={{ x: 0 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="w-1/2 h-full bg-[#1A1A1A] border-l-2 border-[#333333] flex flex-col justify-center items-start pl-12 relative"
      >
        <motion.div
          animate={{ scale: isHovered ? 1.1 : 1, transformOrigin: 'left center' }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          className="text-left"
        >
          <div className="font-work text-[#FFD700] font-bold tracking-widest uppercase mb-2">Blue Corner</div>
          <div className="font-anton text-6xl text-white mb-4">THE<br/>GRAPPLER</div>
          <div className="flex flex-col gap-2 font-work text-sm text-[#666666] uppercase">
            <div className="flex justify-between w-48"><span>85</span> <span className="text-white">Power</span></div>
            <div className="h-1 bg-[#333333] w-48 flex justify-end"><div className="h-full bg-[#FFD700] w-[85%]" /></div>
            <div className="flex justify-between w-48"><span>98</span> <span className="text-white">Tech</span></div>
            <div className="h-1 bg-[#333333] w-48 flex justify-end"><div className="h-full bg-[#FFD700] w-[98%]" /></div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default function CombatZonePage() {
  const { scrollYProgress } = useScroll()

  return (
    <div className={`${anton.variable} ${workSans.variable} bg-[#000000] min-h-screen text-white overflow-x-hidden selection:bg-[#D32F2F] selection:text-white`}>

      {/* Noise Texture Overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-40 p-6 flex justify-between items-center bg-[#000000]/90 backdrop-blur-md border-b-2 border-[#333333]">
        <div className="font-anton text-3xl tracking-widest text-[#FFFFFF] drop-shadow-[2px_2px_0px_#D32F2F]">
          {PRODUCT_NAME}
        </div>
        <div className="hidden md:flex gap-8 font-work text-sm font-bold uppercase tracking-widest text-[#666666]">
          <a href="#roster" className="hover:text-white transition-colors">The Roster</a>
          <a href="#gym" className="hover:text-white transition-colors">The Gym</a>
          <a href="#contracts" className="hover:text-white transition-colors">Contracts</a>
        </div>
        <CombatButton className="!px-6 !py-2 !text-lg">Step In</CombatButton>
      </nav>

      <main className="relative pt-32">
        {/* Hero */}
        <section className="relative min-h-[90vh] flex items-center justify-center px-6 overflow-hidden">
          {/* Background Strobe Effect on load */}
          <motion.div
            className="absolute inset-0 bg-white z-0 pointer-events-none"
            initial={{ opacity: 1 }}
            animate={{ opacity: [1, 0, 1, 0] }}
            transition={{ duration: 0.2, times: [0, 0.3, 0.6, 1] }}
          />

          <div className="max-w-5xl mx-auto text-center relative z-10 flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100, damping: 10, mass: 2 }}
            >
              <h1 className="font-anton text-[100px] md:text-[140px] leading-[0.8] uppercase mb-8 drop-shadow-[4px_4px_0px_#D32F2F]">
                Unleash<br/>The Beast
              </h1>
            </motion.div>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="font-work text-xl md:text-2xl font-bold uppercase text-[#666666] mb-12 max-w-2xl"
            >
              The most brutal, raw, and unforgiving training management system for elite combat sports athletes. No excuses. Just results.
            </motion.p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-6"
            >
              <CombatButton>Sign The Contract</CombatButton>
              <button className="font-anton text-2xl uppercase tracking-widest text-[#FFFFFF] hover:text-[#D32F2F] transition-colors flex items-center justify-center gap-2">
                <Play className="fill-current w-6 h-6" /> Watch Tape
              </button>
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-[#D32F2F] py-12 border-y-4 border-[#1A1A1A]">
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-6 text-black">
            {[
              { val: '50K+', label: 'Fighters Broken' },
              { val: '1M+', label: 'Rounds Sparred' },
              { val: '99%', label: 'Win Rate' },
              { val: '0', label: 'Excuses' }
            ].map((stat, i) => (
              <div key={i} className="text-center font-anton uppercase">
                <div className="text-5xl md:text-7xl mb-2">{stat.val}</div>
                <div className="font-work font-black tracking-widest text-sm md:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <SectionWrapper id="roster" className="px-6 bg-[#000000]">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-anton text-7xl md:text-9xl text-center uppercase mb-20 text-[#1A1A1A] drop-shadow-[2px_2px_0px_#333333]">
              The Arsenal
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: Zap, title: 'Impact Tracking', desc: 'Measure strike velocity and power using integrated heavy bag sensors.' },
                { icon: Activity, title: 'Cardio Engine', desc: 'Push your VO2 max with dynamic, unforgiving interval structures.' },
                { icon: Shield, title: 'Damage Control', desc: 'Track recovery metrics and prevent overtraining before it snaps you.' },
                { icon: Target, title: 'Striking Analytics', desc: 'Analyze combo speed, accuracy, and volume across thousands of rounds.' },
                { icon: Users, title: 'Camp Management', desc: 'Coordinate sparring partners, coaches, and nutritionists in one bloody place.' },
                { icon: Trophy, title: 'Fight Simulation', desc: 'Replicate championship rounds with escalating difficulty algorithms.' }
              ].map((f, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05, borderColor: tokens.accent }}
                  className="p-8 bg-[#1A1A1A] border-2 border-[#333333] flex flex-col items-start transition-colors"
                >
                  <f.icon className="w-12 h-12 text-[#D32F2F] mb-6" />
                  <h3 className="font-anton text-3xl uppercase mb-4">{f.title}</h3>
                  <p className="font-work text-[#666666] font-semibold">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </SectionWrapper>

        {/* Tale of the Tape (Unique Section) */}
        <SectionWrapper className="px-0 bg-[#000000]">
          <TaleOfTheTape />
        </SectionWrapper>

        {/* Product Detail */}
        <SectionWrapper id="gym" className="px-6 bg-[#1A1A1A] border-y-4 border-[#333333]">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="font-work text-[#FFD700] font-black uppercase tracking-widest mb-4">The Grudge Match</div>
              <h2 className="font-anton text-6xl md:text-8xl uppercase mb-8 leading-[0.9]">Built In<br/>Blood & Sweat</h2>
              <p className="font-work text-lg text-[#666666] font-semibold mb-6">
                Most fitness apps are built for joggers. We built Blood&Iron for killers. The interface is raw, the data is brutal, and the feedback doesn't care about your feelings.
              </p>
              <p className="font-work text-lg text-[#666666] font-semibold mb-8">
                Every feature is designed to simulate the pressure of the championship rounds. If you want pretty charts, go somewhere else. If you want to win, you're in the right place.
              </p>
              <CombatButton>Enter The Gym</CombatButton>
            </div>
            <div className="relative aspect-square border-8 border-[#333333] bg-[#000000] p-8 flex flex-col justify-between">
              {/* Abstract gritty UI visual */}
              <div className="flex justify-between items-center border-b-4 border-[#D32F2F] pb-4">
                <span className="font-anton text-4xl text-[#D32F2F]">HR: 185</span>
                <span className="font-anton text-4xl text-white animate-pulse">RND 5</span>
              </div>
              <div className="space-y-4">
                <div className="h-4 bg-[#1A1A1A] w-full"><div className="h-full bg-[#FFD700] w-[45%]" /></div>
                <div className="h-4 bg-[#1A1A1A] w-full"><div className="h-full bg-[#D32F2F] w-[80%]" /></div>
                <div className="h-4 bg-[#1A1A1A] w-full"><div className="h-full bg-white w-[65%]" /></div>
              </div>
              <div className="text-center font-anton text-6xl text-[#333333]">PUSH</div>
            </div>
          </div>
        </SectionWrapper>

        {/* Pricing */}
        <SectionWrapper id="contracts" className="px-6 bg-[#000000]">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-anton text-7xl md:text-9xl text-center uppercase mb-20 text-white">
              The Contracts
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: 'Amateur', price: '$0', desc: 'Just stepping into the gym.', features: ['Basic tracking', 'Community forums', 'Standard workouts'] },
                { name: 'Pro', price: '$29', desc: 'For those who get paid to fight.', features: ['Advanced analytics', 'Camp management', 'Strike sensors'], highlighted: true },
                { name: 'Champion', price: '$99', desc: 'Full camp enterprise solution.', features: ['Team accounts', 'AI fight sim', 'Coach dashboard'] }
              ].map((tier, i) => (
                <div
                  key={i}
                  className={`p-8 flex flex-col ${tier.highlighted ? 'border-4 border-[#D32F2F] bg-[#1A1A1A] relative transform md:-translate-y-4' : 'border-2 border-[#333333] bg-[#000000]'}`}
                >
                  {tier.highlighted && (
                    <div className="absolute top-0 right-0 bg-[#D32F2F] text-white font-anton px-4 py-1 text-xl uppercase transform translate-x-2 -translate-y-4 rotate-3">
                      Main Event
                    </div>
                  )}
                  <h3 className="font-anton text-4xl uppercase mb-2 text-white">{tier.name}</h3>
                  <div className="mb-6 pb-6 border-b-2 border-[#333333]">
                    <span className="font-anton text-6xl text-[#FFD700]">{tier.price}</span>
                    <span className="font-work text-sm font-bold uppercase text-[#666666] ml-2">/ month</span>
                  </div>
                  <p className="font-work text-[#666666] font-semibold mb-8 h-12">{tier.desc}</p>
                  <ul className="space-y-4 mb-12 flex-1">
                    {tier.features.map((f, j) => (
                      <li key={j} className="flex items-center font-work font-bold text-white uppercase">
                        <Check className="w-5 h-5 text-[#D32F2F] mr-3 font-black" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button
                    className={`w-full py-4 font-anton text-2xl uppercase transition-colors ${
                      tier.highlighted
                        ? 'bg-[#D32F2F] text-white hover:bg-white hover:text-[#D32F2F]'
                        : 'bg-[#1A1A1A] text-white hover:bg-[#333333]'
                    }`}
                  >
                    Sign Here
                  </button>
                </div>
              ))}
            </div>
          </div>
        </SectionWrapper>

        {/* Testimonials */}
        <SectionWrapper className="px-6 bg-[#1A1A1A] border-y-4 border-[#333333]">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-anton text-7xl text-center uppercase mb-16 text-[#D32F2F]">Blood Testimonials</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: 'Iron Mike', role: 'Heavyweight Contender', text: "It tracks everything. If I slack off in round 4 of sparring, my coach knows before I even take off my gloves." },
                { name: 'Sarah "The Razor"', role: 'Strawweight Champ', text: "The camp management feature saved my last title fight. Kept my nutrition, S&C, and striking coaches perfectly aligned." },
                { name: 'Coach Greg', role: 'Head Striking Coach', text: "I don't train anyone who isn't on this system. Period. The data doesn't lie, even when fighters do." }
              ].map((t, i) => (
                <div key={i} className="p-8 border-2 border-[#333333] bg-[#000000]">
                  <div className="flex gap-1 mb-6">
                    {[1,2,3,4,5].map(star => <Star key={star} className="w-5 h-5 fill-[#FFD700] text-[#FFD700]" />)}
                  </div>
                  <p className="font-work font-bold text-[#666666] text-lg italic mb-6 uppercase">"{t.text}"</p>
                  <div>
                    <div className="font-anton text-2xl text-white uppercase">{t.name}</div>
                    <div className="font-work font-bold text-[#D32F2F] text-sm uppercase">{t.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SectionWrapper>

        {/* FAQ */}
        <SectionWrapper className="px-6 bg-[#000000]">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-anton text-7xl text-center uppercase mb-16 text-white">Weigh-In Questions</h2>
            <div className="space-y-4">
              {[
                { q: "Do the sensors fit in 4oz gloves?", a: "Yes. They are designed to fit seamlessly under hand wraps for both MMA and Boxing gloves." },
                { q: "Is the data private?", a: "Only you and your authorized coaches have access. We use military-grade encryption." },
                { q: "Can I use it for BJJ?", a: "Currently optimized for striking, but our grapple-metric beta is launching next quarter." },
                { q: "What happens if I break the sensor?", a: "Pro and Champion tiers include unlimited hardware replacements. We know you hit hard." },
                { q: "Do I need wifi in the gym?", a: "No. The system stores up to 50 hours of offline data and syncs when you reconnect." },
                { q: "How do I cancel?", a: "Just hit the button in your settings. No bullshit, no runaround." }
              ].map((faq, i) => (
                <FAQItem key={i} question={faq.q} answer={faq.a} />
              ))}
            </div>
          </div>
        </SectionWrapper>

        {/* Newsletter */}
        <SectionWrapper className="px-6 bg-[#D32F2F] border-y-4 border-[#1A1A1A]">
          <div className="max-w-3xl mx-auto text-center py-12">
            <h2 className="font-anton text-7xl md:text-8xl uppercase text-black mb-6">Join The Fight</h2>
            <p className="font-work font-bold text-black text-xl mb-8 uppercase">Get training tips from world champions sent straight to your inbox.</p>
            <form className="flex flex-col sm:flex-row gap-4 justify-center">
              <input
                type="email"
                placeholder="YOUR EMAIL"
                className="px-6 py-4 font-work font-bold text-xl uppercase bg-black text-white border-2 border-black focus:border-white outline-none w-full sm:w-2/3"
              />
              <button className="px-8 py-4 font-anton text-2xl uppercase bg-white text-black hover:bg-black hover:text-white transition-colors border-2 border-white">
                Submit
              </button>
            </form>
          </div>
        </SectionWrapper>
      </main>

      {/* Footer */}
      <footer className="bg-[#000000] pt-24 pb-12 px-6 border-t-2 border-[#333333]">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-12 mb-16">
          <div className="col-span-2">
            <div className="font-anton text-5xl text-white mb-6 drop-shadow-[2px_2px_0px_#D32F2F]">{PRODUCT_NAME}</div>
            <p className="font-work font-bold text-[#666666] uppercase max-w-sm">
              The premier training software for combat athletes who refuse to lose.
            </p>
          </div>
          <div>
            <h4 className="font-anton text-2xl text-white uppercase mb-4">Gym</h4>
            <ul className="space-y-2 font-work font-bold text-sm text-[#666666] uppercase">
              <li><a href="#" className="hover:text-[#D32F2F] transition-colors">Equipment</a></li>
              <li><a href="#" className="hover:text-[#D32F2F] transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-[#D32F2F] transition-colors">App</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-anton text-2xl text-white uppercase mb-4">Team</h4>
            <ul className="space-y-2 font-work font-bold text-sm text-[#666666] uppercase">
              <li><a href="#" className="hover:text-[#D32F2F] transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-[#D32F2F] transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-[#D32F2F] transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-anton text-2xl text-white uppercase mb-4">Rules</h4>
            <ul className="space-y-2 font-work font-bold text-sm text-[#666666] uppercase">
              <li><a href="#" className="hover:text-[#D32F2F] transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-[#D32F2F] transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center pt-8 border-t-2 border-[#333333] font-work font-bold text-sm text-[#666666] uppercase">
          <div>© 2026 {PRODUCT_NAME}. TAP OUT ANYTIME.</div>
          <a href="/" className="mt-4 md:mt-0 hover:text-white transition-colors">← Leave The Ring</a>
        </div>
      </footer>
    </div>
  )
}

function FAQItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b-2 border-[#333333]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex justify-between items-center text-left"
      >
        <span className="font-anton text-2xl text-white uppercase tracking-wide">{question}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
          <ChevronDown className="text-[#D32F2F] w-8 h-8" />
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
            <p className="font-work font-bold text-[#666666] uppercase pb-6">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
