'use client'

import { motion, useReducedMotion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Bungee, Public_Sans } from 'next/font/google'
import {
  Star, ChevronDown, ArrowRight, Check, Users, MessageCircle, BarChart2, Shield,
  Globe, Megaphone, ThumbsUp, Activity, UserPlus, Heart
} from 'lucide-react'

const bungeeFont = Bungee({ weight: '400', subsets: ['latin'], variable: '--font-bungee', display: 'swap' })
const publicSansFont = Public_Sans({ subsets: ['latin'], variable: '--font-public-sans', display: 'swap' })

const tokens = {
  background: '#FFFFFF',
  surface: '#F3F4F6',
  accent1: '#FF005C',
  accent2: '#00D1FF',
  border: '#E5E7EB',
  textHigh: '#111827',
  textLow: '#6B7280',
}

function FadeUp({ children, delay = 0, y = 28 }: { children: React.ReactNode; delay?: number, y?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-5% 0px' })
  const shouldReduce = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      initial={shouldReduce ? false : { opacity: 0, y }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1], type: 'spring', stiffness: 200, damping: 15 }}
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
        visible: { transition: { staggerChildren: 0.08 } },
      }}
    >
      {children}
    </motion.div>
  )
}

import type { Variants } from 'framer-motion'

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 400, damping: 15, mass: 0.8 } },
}

export default function FanVoicePage() {
  return (
    <div className={`${bungeeFont.variable} ${publicSansFont.variable} font-sans overflow-x-hidden`} style={{ backgroundColor: tokens.background, color: tokens.textHigh }}>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Features />
        <UniqueSection />
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
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      className="fixed top-0 left-0 right-0 z-50 border-b"
      style={{
        backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.9)' : tokens.background,
        borderColor: tokens.border,
        backdropFilter: scrolled ? 'blur(10px)' : 'none'
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <span className="font-[family-name:var(--font-bungee)] text-2xl tracking-wider text-[#FF005C]">
          FANVOICE
        </span>
        <div className="hidden md:flex items-center gap-8">
          {['Features', 'Hype Train', 'Pricing', 'FAQ'].map(link => (
            <motion.a
              key={link}
              href={`#${link.toLowerCase().replace(' ', '-')}`}
              whileHover={{ scale: 1.1, color: tokens.accent1 }}
              className="text-sm font-bold uppercase transition-colors"
              style={{ color: tokens.textHigh }}
            >
              {link}
            </motion.a>
          ))}
        </div>
        <motion.button
          whileHover={{ scale: 1.05, rotate: [-2, 2, 0] }}
          whileTap={{ scale: 0.95, y: 4 }}
          className="px-6 h-12 rounded-full font-bold uppercase text-white shadow-[0_6px_0_#CC004A]"
          style={{ backgroundColor: tokens.accent1 }}
        >
          Join The Crowd
        </motion.button>
      </div>
    </motion.nav>
  )
}

function Hero() {
  return (
    <section className="min-h-dvh flex items-center pt-20 relative overflow-hidden">
      <WaveBackground />
      <div className="max-w-7xl mx-auto px-6 py-24 w-full relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
            className="inline-block mb-6 px-4 py-2 rounded-full border-2 font-bold uppercase text-sm"
            style={{ borderColor: tokens.accent2, color: tokens.accent2, backgroundColor: `${tokens.accent2}10` }}
          >
            The Loudest Community Platform
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 40, rotateX: -20 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
            className="text-6xl md:text-8xl lg:text-9xl font-[family-name:var(--font-bungee)] leading-[0.9] mb-8"
            style={{ color: tokens.textHigh }}
          >
            BE HEARD. <br />
            <span style={{ color: tokens.accent1 }}>MAKE NOISE.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl mb-12 font-medium"
            style={{ color: tokens.textLow }}
          >
            Move away from sterile forums into a stadium-seating social experience. The digital roar of the crowd starts here.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05, rotate: -2 }}
              whileTap={{ scale: 0.95, y: 4 }}
              className="h-16 px-10 rounded-2xl font-[family-name:var(--font-bungee)] text-xl text-white shadow-[0_8px_0_#CC004A] flex items-center justify-center gap-3"
              style={{ backgroundColor: tokens.accent1 }}
            >
              Start Roaring <Megaphone className="h-6 w-6" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileTap={{ scale: 0.95, y: 4 }}
              className="h-16 px-10 rounded-2xl font-[family-name:var(--font-bungee)] text-xl shadow-[0_8px_0_#00A7CC] flex items-center justify-center"
              style={{ backgroundColor: tokens.accent2, color: tokens.textHigh }}
            >
              See Live Demo
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function WaveBackground() {
  return (
    <div className="absolute inset-0 z-0 opacity-10 pointer-events-none overflow-hidden">
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 20, repeat: Infinity, ease: [0, 0, 1, 1] }}
        className="flex h-full w-[200%]"
      >
        <div className="w-1/2 h-full bg-[radial-gradient(circle_at_center,_#FF005C_2px,_transparent_2px)] bg-[size:40px_40px]" />
        <div className="w-1/2 h-full bg-[radial-gradient(circle_at_center,_#FF005C_2px,_transparent_2px)] bg-[size:40px_40px]" />
      </motion.div>
    </div>
  )
}

function Stats() {
  const stats = [
    { value: '10M+', label: 'Active Fans' },
    { value: '500K', label: 'Daily Votes' },
    { value: '99%', label: 'Hype Rate' },
    { value: '24/7', label: 'Loudness' },
  ]
  return (
    <section className="border-y-4 py-16" style={{ borderColor: tokens.textHigh, backgroundColor: tokens.surface }}>
      <div className="max-w-7xl mx-auto px-6">
        <StaggerContainer>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map(stat => (
              <motion.div key={stat.label} variants={staggerItem} className="text-center">
                <p className="text-5xl md:text-6xl font-[family-name:var(--font-bungee)] mb-2" style={{ color: tokens.accent1 }}>{stat.value}</p>
                <p className="text-lg font-bold uppercase tracking-wider" style={{ color: tokens.textHigh }}>{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  )
}

function Features() {
  const features = [
    { icon: Users, title: 'Stadium Seating', description: 'See where everyone stands on hot topics with spatial UI.' },
    { icon: Activity, title: 'Weighted Polls', description: 'Polls that physically tilt based on the weight of public opinion.' },
    { icon: MessageCircle, title: 'Floating Comments', description: 'New comments pop in like speech bubbles from the crowd.' },
    { icon: Heart, title: 'Hype Interaction', description: 'Every like adds to the global hype train visualizer.' },
    { icon: UserPlus, title: 'Squad Building', description: 'Form your own fan clubs and roar together.' },
    { icon: Shield, title: 'Anti-Troll Armor', description: 'Community-driven moderation keeps the vibes high.' },
  ]

  return (
    <section id="features" className="py-32" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-7xl mx-auto px-6">
        <FadeUp>
          <div className="mb-20">
            <h2 className="text-5xl md:text-7xl font-[family-name:var(--font-bungee)] mb-6 uppercase">
              The <span style={{ color: tokens.accent2 }}>Arsenal</span>
            </h2>
            <p className="text-xl max-w-2xl font-medium" style={{ color: tokens.textLow }}>
              Tools built to amplify your voice and visualize the momentum of your fanbase.
            </p>
          </div>
        </FadeUp>
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                variants={staggerItem}
                whileHover={{ scale: 1.03, rotate: i % 2 === 0 ? 2 : -2 }}
                className="p-8 rounded-[2rem] border-4 relative overflow-hidden"
                style={{
                  borderColor: tokens.border,
                  backgroundColor: tokens.background,
                  borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%'
                }}
              >
                <div className="absolute inset-0 opacity-0 hover:opacity-10 transition-opacity bg-current" style={{ color: tokens.accent1 }} />
                <feature.icon className="h-12 w-12 mb-6" style={{ color: tokens.accent1 }} strokeWidth={2.5} />
                <h3 className="font-bold text-2xl mb-3 uppercase tracking-wide" style={{ color: tokens.textHigh }}>{feature.title}</h3>
                <p className="text-lg" style={{ color: tokens.textLow }}>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  )
}

function UniqueSection() {
  const [votes, setVotes] = useState(50)
  const [hype, setHype] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setHype(prev => (prev + 1) % 100)
    }, 50)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="hype-train" className="py-32 border-y-4" style={{ borderColor: tokens.textHigh, backgroundColor: tokens.surface }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <FadeUp>
            <h2 className="text-5xl md:text-7xl font-[family-name:var(--font-bungee)] mb-6 uppercase">
              Ride The <br/><span style={{ color: tokens.accent1 }}>Hype Train</span>
            </h2>
            <p className="text-xl mb-8 font-medium" style={{ color: tokens.textLow }}>
              Watch the collective energy of the crowd push the conversation forward. Live avatars, physical polls, and massive momentum.
            </p>
            <div className="space-y-8">
              <div className="p-6 bg-white border-4 rounded-3xl" style={{ borderColor: tokens.border }}>
                <p className="font-bold uppercase mb-4">Physical Polling</p>
                <div className="flex justify-between mb-2">
                  <span className="font-[family-name:var(--font-bungee)]">TEAM A</span>
                  <span className="font-[family-name:var(--font-bungee)]">TEAM B</span>
                </div>
                <motion.div
                  className="h-8 rounded-full flex overflow-hidden cursor-pointer"
                  style={{ backgroundColor: tokens.border }}
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect()
                    const x = e.clientX - rect.left
                    setVotes(Math.round((x / rect.width) * 100))
                  }}
                  animate={{ rotateZ: (votes - 50) / 10 }} // Tilt effect
                  transition={{ type: 'spring', stiffness: 200, damping: 10, mass: 2 }}
                >
                  <motion.div
                    className="h-full"
                    style={{ backgroundColor: tokens.accent1 }}
                    animate={{ width: `${votes}%` }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  />
                  <motion.div
                    className="h-full"
                    style={{ backgroundColor: tokens.accent2 }}
                    animate={{ width: `${100 - votes}%` }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  />
                </motion.div>
                <p className="text-center text-sm font-bold text-gray-400 mt-2">Click to vote and tilt</p>
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={0.2}>
            <div className="relative h-[400px] border-4 rounded-3xl overflow-hidden bg-white flex flex-col" style={{ borderColor: tokens.border }}>
              <div className="flex-1 relative overflow-hidden p-6">
                <p className="font-bold text-center uppercase tracking-widest text-gray-400 mb-8">Live Feed</p>

                {/* Simulated live comments */}
                <motion.div
                  animate={{ y: [0, -100] }}
                  transition={{ duration: 4, repeat: Infinity, ease: [0, 0, 1, 1] }}
                  className="space-y-4"
                >
                  {[104, 892, 451, 933, 212].map((id, i) => (
                    <motion.div
                      key={id}
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: i * 0.5, type: 'spring' }}
                      className="bg-gray-100 p-4 rounded-2xl rounded-bl-none max-w-[80%] border-2"
                      style={{ borderColor: i % 2 === 0 ? tokens.accent1 : tokens.accent2 }}
                    >
                      <p className="font-bold text-sm mb-1">{`User_${id}`}</p>
                      <p className="text-sm">LET&apos;S GOOOOO!!! 🔥🔥🔥</p>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* Hype Train Visualizer */}
              <div className="h-24 border-t-4 flex items-center relative overflow-hidden" style={{ borderColor: tokens.border, backgroundColor: tokens.accent1 }}>
                 <motion.div
                   className="absolute whitespace-nowrap text-4xl"
                   animate={{ x: ['100%', '-100%'] }}
                   transition={{ duration: 5, repeat: Infinity, ease: [0, 0, 1, 1] }}
                 >
                   🚂 💨 💨 💨 💨 💨 💨
                 </motion.div>
                 <motion.div
                    className="absolute inset-0 bg-white/20"
                    animate={{ x: [`${hype}%`, `${hype - 100}%`] }}
                    transition={{ duration: 0, ease: [0, 0, 1, 1] }}
                 />
                 <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="font-[family-name:var(--font-bungee)] text-white text-3xl drop-shadow-md">HYPE TRAIN ACTIVE</span>
                 </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}

function ProductDetail() {
  return (
    <section className="py-32" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-4xl mx-auto px-6 text-center">
        <FadeUp>
          <h2 className="text-5xl md:text-7xl font-[family-name:var(--font-bungee)] mb-8 uppercase">
            Built For <br/>The <span style={{ color: tokens.accent2 }}>Crowd</span>
          </h2>
          <div className="space-y-8 text-xl font-medium" style={{ color: tokens.textLow }}>
            <p>
              We believe that communities shouldn&apos;t feel like spreadsheets. They should feel alive, loud, and impactful.
            </p>
            <p>
              By combining physics-based UI with real-time web sockets, FanVoice turns every poll, comment, and like into a physical force that shapes the layout of the platform.
            </p>
            <motion.div
               whileHover={{ scale: 1.1, rotate: 5 }}
               className="inline-block p-6 rounded-full border-4 mt-8 bg-yellow-100"
               style={{ borderColor: '#FBBF24' }}
            >
               <span className="text-4xl">⚡️</span>
            </motion.div>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

function Pricing() {
  const plans = [
    { name: 'Rookie', price: 'Free', desc: 'Join the crowd and start shouting.', features: ['Public stadiums', 'Basic voting', 'Standard avatars'] },
    { name: 'Ultra', price: '$5/mo', desc: 'Stand in the front row.', features: ['Custom megaphones', 'Hype multiplier', 'VIP lounges', 'No ads'], highlighted: true },
    { name: 'Organizer', price: '$49/mo', desc: 'Host your own stadium.', features: ['Unlimited fans', 'Custom domains', 'Analytics dashboard', 'Priority support'] },
  ]

  return (
    <section id="pricing" className="py-32 border-y-4" style={{ borderColor: tokens.textHigh, backgroundColor: tokens.background }}>
      <div className="max-w-7xl mx-auto px-6">
        <FadeUp>
          <h2 className="text-5xl md:text-7xl font-[family-name:var(--font-bungee)] mb-16 text-center uppercase">Get Your <span style={{ color: tokens.accent1 }}>Tickets</span></h2>
        </FadeUp>
        <StaggerContainer>
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                variants={staggerItem}
                whileHover={{ y: -10, scale: 1.02 }}
                className="p-8 rounded-3xl border-4 relative bg-white"
                style={{
                  borderColor: plan.highlighted ? tokens.accent1 : tokens.textHigh,
                  boxShadow: plan.highlighted ? `8px 8px 0 ${tokens.accent1}` : `8px 8px 0 ${tokens.textHigh}`
                }}
              >
                {plan.highlighted && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#00D1FF] text-black font-bold uppercase rounded-full border-2 border-black rotate-[-2deg]">
                    Most Popular
                  </div>
                )}
                <h3 className="text-3xl font-[family-name:var(--font-bungee)] mb-2 uppercase">{plan.name}</h3>
                <p className="text-5xl font-bold mb-4" style={{ color: plan.highlighted ? tokens.accent1 : tokens.textHigh }}>{plan.price}</p>
                <p className="mb-8 font-medium" style={{ color: tokens.textLow }}>{plan.desc}</p>
                <ul className="space-y-4 mb-8">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-3 font-bold">
                      <Check className="h-6 w-6" style={{ color: tokens.accent2 }} strokeWidth={3} /> {f}
                    </li>
                  ))}
                </ul>
                <motion.button
                  whileTap={{ scale: 0.95, y: 4 }}
                  className="w-full py-4 rounded-xl font-bold uppercase border-2 text-white"
                  style={{
                    backgroundColor: plan.highlighted ? tokens.accent1 : tokens.textHigh,
                    borderColor: 'transparent',
                    boxShadow: plan.highlighted ? `0 4px 0 #CC004A` : `0 4px 0 #000`
                  }}
                >
                  Get {plan.name}
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
  const reviews = [
    { name: 'Alex', handle: '@sportsfan99', text: 'Literally the wildest place on the internet during a match.' },
    { name: 'Sam', handle: '@sam_streams', text: 'The hype train feature is addictive. I love seeing my avatar ride it.' },
    { name: 'Jordan', handle: '@jordan_dev', text: 'Physics in UI? Mind blown. It feels so tactile and real.' }
  ]
  return (
    <section className="py-32" style={{ backgroundColor: tokens.surface }}>
      <div className="max-w-7xl mx-auto px-6">
        <FadeUp>
           <h2 className="text-5xl md:text-7xl font-[family-name:var(--font-bungee)] mb-16 text-center uppercase">Word On The <span style={{ color: tokens.accent2 }}>Street</span></h2>
        </FadeUp>
        <StaggerContainer>
          <div className="grid md:grid-cols-3 gap-8">
            {reviews.map((r, i) => (
              <motion.div
                key={r.name}
                variants={staggerItem}
                whileHover={{ scale: 1.05, rotate: i % 2 === 0 ? 3 : -3 }}
                className="bg-white p-8 rounded-2xl border-4"
                style={{ borderColor: tokens.textHigh, borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%' }}
              >
                <div className="flex gap-1 mb-4 text-[#FFC700]">
                  {[1,2,3,4,5].map(s => <Star key={s} className="fill-current h-6 w-6" />)}
                </div>
                <p className="text-xl font-medium mb-6 uppercase">"{r.text}"</p>
                <p className="font-[family-name:var(--font-bungee)] text-xl text-[#FF005C]">{r.name}</p>
                <p className="font-bold text-gray-500">{r.handle}</p>
              </motion.div>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  )
}

function FAQ() {
  const faqs = [
    { q: 'Is it really that loud?', a: 'Visually? Yes. Audibly? Only if you turn on the stadium SFX in settings.' },
    { q: 'Can I embed polls?', a: 'Absolutely. Take the hype train to your own website with our widget.' },
    { q: 'How does moderation work?', a: 'Community-led downvotes sink bad takes to the bottom of the stadium, physically.' }
  ]
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq" className="py-32 border-t-4" style={{ borderColor: tokens.textHigh, backgroundColor: tokens.background }}>
      <div className="max-w-4xl mx-auto px-6">
        <FadeUp>
          <h2 className="text-5xl md:text-7xl font-[family-name:var(--font-bungee)] mb-16 text-center uppercase">Interrogation <span style={{ color: tokens.accent1 }}>Room</span></h2>
        </FadeUp>
        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              className="border-4 rounded-2xl overflow-hidden bg-white"
              style={{ borderColor: tokens.textHigh }}
              initial={false}
              animate={{ backgroundColor: open === i ? tokens.surface : '#FFF' }}
            >
              <button
                className="w-full p-6 text-left font-bold text-xl uppercase flex justify-between items-center"
                onClick={() => setOpen(open === i ? null : i)}
              >
                {faq.q}
                <motion.div animate={{ rotate: open === i ? 180 : 0 }}>
                  <ChevronDown className="h-8 w-8" style={{ color: tokens.accent1 }} strokeWidth={3} />
                </motion.div>
              </button>
              <motion.div
                initial={false}
                animate={{ height: open === i ? 'auto' : 0, opacity: open === i ? 1 : 0 }}
                className="overflow-hidden"
              >
                <p className="p-6 pt-0 text-lg font-medium" style={{ color: tokens.textLow }}>{faq.a}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Newsletter() {
  return (
    <section className="py-32 bg-black text-white overflow-hidden relative">
      <motion.div
         animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
         transition={{ duration: 10, repeat: Infinity, ease: [0.42, 0, 0.58, 1] }}
         className="absolute -right-20 -top-20 w-96 h-96 bg-[#FF005C] rounded-full mix-blend-screen filter blur-[100px] opacity-50"
      />
      <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
        <FadeUp>
          <h2 className="text-5xl md:text-7xl font-[family-name:var(--font-bungee)] mb-8 uppercase text-white">Join The <span style={{ color: tokens.accent2 }}>Megaphone</span></h2>
          <p className="text-xl mb-10 font-medium text-gray-400">Get updates on new features. No spam, just hype.</p>
          <form className="flex flex-col sm:flex-row gap-4" onSubmit={e => e.preventDefault()}>
            <input
              type="email"
              placeholder="YOUR EMAIL HERE"
              className="flex-1 p-6 text-xl font-bold uppercase rounded-xl border-4 border-white bg-transparent focus:outline-none focus:border-[#00D1FF]"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-6 rounded-xl font-[family-name:var(--font-bungee)] text-2xl uppercase border-4 border-transparent text-black"
              style={{ backgroundColor: tokens.accent2 }}
            >
              SUBSCRIBE
            </motion.button>
          </form>
        </FadeUp>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="py-12 border-t-4 bg-white" style={{ borderColor: tokens.textHigh }}>
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <span className="font-[family-name:var(--font-bungee)] text-3xl text-[#FF005C]">FANVOICE</span>
        <div className="flex gap-6 font-bold uppercase text-sm">
          <a href="#" className="hover:text-[#00D1FF] transition-colors">Twitter</a>
          <a href="#" className="hover:text-[#00D1FF] transition-colors">Discord</a>
          <a href="#" className="hover:text-[#00D1FF] transition-colors">Terms</a>
        </div>
        <p className="font-bold text-gray-400">© 2026 OH-MY-DESIGN</p>
        
      </div>
    </footer>
  )
}
