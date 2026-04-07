'use client'

import React, { useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Outfit, Inter } from 'next/font/google'
import { Heart, Activity, Siren, ShieldAlert, HeartPulse, UserPlus, Gift, ArrowRight, HeartHandshake, Home } from 'lucide-react'

const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' })
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

const TOKENS = {
  background: '#FFFFFF',
  surface: '#FFF1F2', // Soft Heart
  accent1: '#E11D48', // Urgent Red
  accent2: '#4F46E5', // Rescue Blue
  border: '#F43F5E',
  textHigh: '#111827',
  textLow: '#9CA3AF',
}

// Custom Framer Motion Variants
const theHeartbeat: import('framer-motion').Variants = {
  animate: {
    scale: [1, 1.05, 1],
    transition: { duration: 0.8, repeat: Infinity, ease: [0.42, 0, 0.58, 1] as [number, number, number, number] }
  }
}

const impactReveal: import('framer-motion').Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 600,
      damping: 10,
      mass: 0.5
    }
  }
}

function LifeLineDraw({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`relative ${className}`}>
      {children}
      <svg className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-12 pointer-events-none opacity-20 -z-10" preserveAspectRatio="none">
         <motion.path
           d="M 0,24 L 20%,24 L 22%,0 L 26%,48 L 28%,24 L 100%,24"
           fill="none"
           stroke={TOKENS.accent1}
           strokeWidth="2"
           initial={{ pathLength: 0 }}
           whileInView={{ pathLength: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 1.5, ease: [0.42, 0, 0.58, 1] as [number, number, number, number] }}
         />
      </svg>
    </div>
  )
}

function PulseButton({ children, className, onClick, primary = true }: { children: React.ReactNode, className?: string, onClick?: () => void, primary?: boolean }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`relative rounded-full px-8 py-4 font-bold overflow-hidden ${className}`}
      style={{
        backgroundColor: primary ? TOKENS.accent1 : TOKENS.surface,
        color: primary ? 'white' : TOKENS.accent1,
        border: primary ? 'none' : `2px solid ${TOKENS.border}`
      }}
    >
      {/* Pulse ring */}
      <motion.div
        className="absolute inset-0 rounded-full border-2"
        style={{ borderColor: primary ? 'white' : TOKENS.accent1, opacity: 0.5 }}
        animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] }}
      />
      <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
    </motion.button>
  )
}

function SuccessStoryTimeline() {
  const [activeMilestone, setActiveMilestone] = useState<number | null>(null)

  const milestones = [
    { id: 1, title: 'Rescue Call', desc: 'Alert received about an abandoned litter.', icon: <Siren size={20}/> },
    { id: 2, title: 'Medical Triage', desc: 'Emergency care and vaccinations administered.', icon: <Activity size={20}/> },
    { id: 3, title: 'Foster Care', desc: 'Placed in a loving temporary home to socialize.', icon: <Heart size={20}/> },
    { id: 4, title: 'Adoption Day', desc: 'Matched with their forever family!', icon: <Home size={20}/> },
  ]

  return (
    <div className="py-12 relative flex">
      {/* Central Line */}
      <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 bg-gray-100 -translate-x-1/2 rounded-full overflow-hidden">
        <motion.div
          className="w-full bg-red-500 origin-top"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: activeMilestone !== null ? (activeMilestone + 1) / milestones.length : 0 }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] }}
          style={{ backgroundColor: TOKENS.accent1 }}
        />
      </div>

      <div className="flex flex-col gap-12 w-full">
        {milestones.map((m, i) => (
          <div key={m.id}
               className={`flex flex-col md:flex-row items-start md:items-center w-full relative z-10 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
               onClick={() => setActiveMilestone(i)}>

            <div className={`w-full md:w-1/2 ${i % 2 === 0 ? 'md:pl-16' : 'md:pr-16 text-left md:text-right'} pl-16 pr-4 cursor-pointer`}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className={`p-6 rounded-2xl border-2 transition-colors ${activeMilestone === i ? 'bg-red-50' : 'bg-white'}`}
                style={{ borderColor: activeMilestone === i ? TOKENS.accent1 : '#F3F4F6' }}
              >
                <h3 className="text-xl font-bold mb-2 flex items-center gap-3" style={{ fontFamily: 'var(--font-outfit)', justifyContent: i % 2 === 0 ? 'flex-start' : 'flex-end' }}>
                  <span className="md:hidden" style={{ color: activeMilestone === i ? TOKENS.accent1 : TOKENS.textLow }}>{m.icon}</span>
                  {m.title}
                </h3>
                <p className="text-sm" style={{ color: TOKENS.textLow }}>{m.desc}</p>
              </motion.div>
            </div>

            {/* Icon Node */}
            <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center border-4 border-white transition-colors duration-300"
                 style={{ backgroundColor: activeMilestone !== null && i <= activeMilestone ? TOKENS.accent1 : '#E5E7EB', color: 'white' }}>
               {m.icon}
               {activeMilestone === i && (
                 <motion.div className="absolute inset-0 rounded-full bg-red-500 opacity-30" animate={{ scale: [1, 1.5], opacity: [0.3, 0] }} transition={{ repeat: Infinity, duration: 1 }} />
               )}
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}

function LiveTicker() {
  const [count, setCount] = useState(1240)

  useEffect(() => {
    const interval = setInterval(() => {
      if(Math.random() > 0.7) {
        setCount(prev => prev + 1)
      }
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white py-3 px-4 z-50 overflow-hidden flex items-center">
      <div className="flex items-center gap-2 px-4 border-r border-gray-700 whitespace-nowrap">
        <motion.div variants={theHeartbeat} animate="animate">
          <Heart fill={TOKENS.accent1} color={TOKENS.accent1} size={16} />
        </motion.div>
        <span className="font-bold text-sm">LIVE UPDATES</span>
      </div>
      <div className="flex-1 overflow-hidden relative h-6">
        <motion.div
          className="absolute whitespace-nowrap flex gap-12 text-sm"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: [0, 0, 1, 1] as [number, number, number, number] }}
        >
           <span>🚨 Emergency rescue team dispatched to Sector 4.</span>
           <span className="text-red-400 font-bold">❤️ {count} Lives Saved This Year!</span>
           <span>🐾 Bella just found her forever home.</span>
           <span>⭐ Anonymous donor pledged $500.</span>
           <span>🚨 Emergency rescue team dispatched to Sector 4.</span>
           <span className="text-red-400 font-bold">❤️ {count} Lives Saved This Year!</span>
           <span>🐾 Bella just found her forever home.</span>
           <span>⭐ Anonymous donor pledged $500.</span>
        </motion.div>
      </div>
    </div>
  )
}

export default function RescueRhythmPage() {
  const [donatePulse, setDonatePulse] = useState(false)

  const handleDonate = () => {
    setDonatePulse(true)
    setTimeout(() => setDonatePulse(false), 500)
  }

  return (
    <motion.div
      className={`min-h-screen pb-16 ${outfit.variable} ${inter.variable} overflow-hidden`}
      style={{ backgroundColor: TOKENS.background, color: TOKENS.textHigh }}
      animate={donatePulse ? { scale: [1, 1.02, 1], backgroundColor: ['#FFFFFF', '#FFF1F2', '#FFFFFF'] } : {}}
      transition={{ duration: 0.5, type: "spring" }}
    >
      {/* 1. Navbar */}
      <nav className="px-6 py-4 flex justify-between items-center bg-white border-b sticky top-0 z-40" style={{ borderColor: TOKENS.surface }}>
        <div className="flex items-center gap-2">
          <motion.div variants={theHeartbeat} animate="animate">
            <HeartPulse size={32} color={TOKENS.accent1} />
          </motion.div>
          <span className="font-bold text-2xl tracking-tight" style={{ fontFamily: 'var(--font-outfit)' }}>RescueRhythm</span>
        </div>

        <div className="hidden md:flex gap-6 font-medium text-sm" style={{ fontFamily: 'var(--font-inter)' }}>
          <a href="#" className="hover:text-red-600 transition-colors">Emergency</a>
          <a href="#" className="hover:text-red-600 transition-colors">Adopt</a>
          <a href="#" className="hover:text-red-600 transition-colors">Volunteer</a>
        </div>

        <PulseButton primary={false} className="py-2 px-6 text-sm" onClick={handleDonate}>
          <Gift size={16} /> Donate Now
        </PulseButton>
      </nav>

      <main className="px-4 md:px-8 max-w-6xl mx-auto space-y-32 pt-20">

        {/* 2. Hero */}
        <section className="text-center flex flex-col items-center">
          <motion.div
            initial="hidden" animate="visible" variants={impactReveal}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold uppercase mb-8"
            style={{ backgroundColor: TOKENS.surface, color: TOKENS.accent1 }}
          >
            <Siren size={16} /> 24/7 Crisis Response Active
          </motion.div>

          <LifeLineDraw className="w-full max-w-4xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="text-6xl md:text-8xl font-black leading-tight mb-6"
              style={{ fontFamily: 'var(--font-outfit)' }}
            >
              Every Second <br/> <span style={{ color: TOKENS.accent1 }}>Counts.</span>
            </motion.h1>
          </LifeLineDraw>

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            className="text-xl max-w-2xl mb-12"
            style={{ color: TOKENS.textLow, fontFamily: 'var(--font-inter)' }}
          >
            We are the frontline of animal rescue. From emergency medical extraction to finding the perfect forever home, our mission is driven by the heartbeat of hope.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <PulseButton onClick={handleDonate} className="text-lg">
              Support Our Mission <ArrowRight size={20} />
            </PulseButton>
            <button className="px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors" style={{ fontFamily: 'var(--font-inter)' }}>
              Report an Emergency
            </button>
          </motion.div>
        </section>

        {/* 3. Stats */}
        <section>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { val: '15m', label: 'Avg Response Time', icon: <Siren/> },
              { val: '1.2k', label: 'Lives Saved', icon: <HeartPulse/> },
              { val: '850', label: 'Successful Adoptions', icon: <Home/> },
              { val: '99%', label: 'Survival Rate', icon: <Activity/> }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={impactReveal}
                className="p-8 rounded-3xl text-center border-2"
                style={{ borderColor: TOKENS.surface }}
              >
                <div className="flex justify-center mb-4" style={{ color: TOKENS.accent2 }}>{stat.icon}</div>
                <div className="text-4xl md:text-5xl font-black mb-2" style={{ fontFamily: 'var(--font-outfit)', color: TOKENS.textHigh }}>{stat.val}</div>
                <div className="text-sm font-bold uppercase" style={{ color: TOKENS.textLow }}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 4. Unique Section: Success Story Timeline */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black mb-4" style={{ fontFamily: 'var(--font-outfit)' }}>The Journey of <span style={{ color: TOKENS.accent1 }}>Hope</span></h2>
            <p className="text-lg" style={{ color: TOKENS.textLow, fontFamily: 'var(--font-inter)' }}>Follow the path from rescue to recovery. Click a milestone to see the impact.</p>
          </div>

          <SuccessStoryTimeline />
        </section>

        {/* 5. Features */}
        <section>
          <h2 className="text-4xl md:text-5xl font-black mb-12 text-center" style={{ fontFamily: 'var(--font-outfit)' }}>How We Save Lives</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Siren size={32}/>, title: 'Rapid Extraction', desc: 'Our dedicated ambulances are equipped with ICU-level tech for critical transport.' },
              { icon: <ShieldAlert size={32}/>, title: 'Abuse Intervention', desc: 'Working with local authorities to safely remove animals from harmful environments.' },
              { icon: <Activity size={32}/>, title: 'Trauma Surgery', desc: 'In-house veterinary surgeons on standby 24/7 for life-saving procedures.' },
              { icon: <HeartHandshake size={32}/>, title: 'Rehabilitation', desc: 'Behavioral specialists work to rebuild trust and prepare pets for adoption.' },
              { icon: <Home size={32}/>, title: 'Vetted Adoptions', desc: 'Rigorous screening process to ensure our rescues never face abandonment again.' },
              { icon: <UserPlus size={32}/>, title: 'Foster Network', desc: 'A vast community of trained fosters providing temporary safe havens.' }
            ].map((feat, i) => (
              <motion.div
                key={i}
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={impactReveal}
                className="p-8 rounded-3xl bg-white relative group overflow-hidden"
                style={{ border: `1px solid ${TOKENS.surface}` }}
              >
                {/* Background pulse on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                     style={{ background: `radial-gradient(circle at top right, ${TOKENS.surface}, transparent)` }} />

                <div className="mb-6 p-4 rounded-2xl inline-block" style={{ backgroundColor: TOKENS.surface, color: TOKENS.accent1 }}>
                  {feat.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: 'var(--font-outfit)' }}>{feat.title}</h3>
                <p className="leading-relaxed" style={{ color: TOKENS.textLow, fontFamily: 'var(--font-inter)' }}>{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 6. Product Detail (Mission) */}
        <section className="flex flex-col md:flex-row gap-12 items-center bg-gray-900 rounded-[3rem] p-8 md:p-16 text-white overflow-hidden relative">
          {/* Subtle heartbeat background */}
          <motion.div
            className="absolute inset-0 opacity-10 pointer-events-none"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: [0.42, 0, 0.58, 1] as [number, number, number, number] }}
            style={{ backgroundImage: `radial-gradient(circle at center, ${TOKENS.accent1} 0%, transparent 70%)` }}
          />

          <div className="w-full md:w-1/2 relative z-10">
            <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight" style={{ fontFamily: 'var(--font-outfit)' }}>
              Compassion in <br/><span style={{ color: TOKENS.accent1 }}>Action.</span>
            </h2>
            <p className="text-lg leading-relaxed mb-6 font-light" style={{ color: '#D1D5DB', fontFamily: 'var(--font-inter)' }}>
              RescueRhythm was founded on a simple principle: no animal should suffer in silence. We operate a highly coordinated dispatch system, treating animal rescue with the same urgency as human paramedics.
            </p>
            <p className="text-lg leading-relaxed font-light" style={{ color: '#D1D5DB', fontFamily: 'var(--font-inter)' }}>
              Your donations fuel our fleet, stock our surgical suites, and keep the lights on in our rehabilitation centers. We don&apos;t just save lives; we rebuild them.
            </p>
          </div>

          <div className="w-full md:w-1/2 relative z-10 flex justify-center">
            {/* "Polaroid" style cards */}
            <div className="relative w-72 h-80">
              <motion.div
                className="absolute inset-0 bg-white p-4 rounded-xl shadow-2xl origin-bottom-right"
                initial={{ rotate: 10 }}
                whileHover={{ rotate: 5, scale: 1.05, zIndex: 10 }}
                transition={{ type: "spring" }}
              >
                <div className="w-full h-4/5 bg-gray-200 rounded-lg mb-4 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=400)' }}/>
                <div className="font-bold text-black text-center" style={{ fontFamily: 'var(--font-outfit)' }}>Max - Rescued 2023</div>
              </motion.div>
              <motion.div
                className="absolute inset-0 bg-white p-4 rounded-xl shadow-2xl origin-bottom-left"
                initial={{ rotate: -10 }}
                whileHover={{ rotate: -5, scale: 1.05, zIndex: 10 }}
                transition={{ type: "spring" }}
              >
                <div className="w-full h-4/5 bg-gray-200 rounded-lg mb-4 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&q=80&w=400)' }}/>
                <div className="font-bold text-black text-center" style={{ fontFamily: 'var(--font-outfit)' }}>Luna - Adopted</div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 7. Pricing (Donation Tiers) */}
        <section>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4" style={{ fontFamily: 'var(--font-outfit)' }}>Fund the <span style={{ color: TOKENS.accent1 }}>Frontline</span></h2>
            <p className="text-lg" style={{ color: TOKENS.textLow, fontFamily: 'var(--font-inter)' }}>100% of your donation goes directly to animal care.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Protector', price: '$25', period: 'monthly', desc: 'Provides basic vaccines and food for one rescue.', features: ['Monthly newsletter', 'Sticker pack'] },
              { name: 'Lifesaver', price: '$50', period: 'monthly', desc: 'Covers emergency transport and initial triage.', features: ['Sponsor a specific rescue', 'Quarterly updates', 'T-shirt'], featured: true },
              { name: 'Guardian', price: '$100', period: 'monthly', desc: 'Funds critical surgeries and long-term rehab.', features: ['VIP shelter tours', 'Name on hero wall', 'Direct impact reports'] }
            ].map((tier, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className={`p-8 rounded-3xl relative border-2 ${tier.featured ? 'shadow-xl' : ''}`}
                style={{
                  borderColor: tier.featured ? TOKENS.accent1 : TOKENS.surface,
                  backgroundColor: 'white'
                }}
              >
                {tier.featured && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 rounded-full text-sm font-bold text-white shadow-lg" style={{ backgroundColor: TOKENS.accent1 }}>
                    Most Impactful
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: 'var(--font-outfit)' }}>{tier.name}</h3>
                <div className="mb-4">
                  <span className="text-5xl font-black">{tier.price}</span>
                  <span className="text-gray-500 font-medium">/{tier.period}</span>
                </div>
                <p className="mb-8 font-medium" style={{ color: TOKENS.textHigh }}>{tier.desc}</p>
                <ul className="space-y-4 mb-8 text-sm" style={{ color: TOKENS.textLow }}>
                  {tier.features.map((feat, j) => (
                    <li key={j} className="flex items-center gap-3">
                      <Heart size={16} fill={TOKENS.accent1} color={TOKENS.accent1} /> {feat}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={handleDonate}
                  className="w-full py-4 rounded-full font-bold transition-all hover:scale-105 active:scale-95"
                  style={{
                    backgroundColor: tier.featured ? TOKENS.accent1 : TOKENS.surface,
                    color: tier.featured ? 'white' : TOKENS.accent1
                  }}
                >
                  Give Monthly
                </button>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 8. Testimonials */}
        <section>
          <h2 className="text-4xl md:text-5xl font-black mb-12 text-center" style={{ fontFamily: 'var(--font-outfit)' }}>Voices of Rescue</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { quote: "When I found that injured stray, RescueRhythm was there in 12 minutes. The professionalism and care they showed was incredible. That dog is now my best friend.", author: "Michael T.", role: "Adopter" },
              { quote: "As a veterinary surgeon, I partner with many shelters. The medical facilities and protocols at RescueRhythm are second to none. They give every animal a fighting chance.", author: "Dr. Sarah Jenkins", role: "Partner Vet" },
              { quote: "Fostering for them is so supported. They provide all medical care and food. All I have to do is provide love and a safe space while they recover.", author: "Emily R.", role: "Foster Parent" },
              { quote: "Donating here feels different. Their transparency and the updates I get on the specific animals my money helps save make it incredibly rewarding.", author: "David L.", role: "Guardian Donor" }
            ].map((t, i) => (
              <div key={i} className="p-8 rounded-3xl" style={{ backgroundColor: '#F9FAFB' }}>
                <p className="text-lg italic mb-6" style={{ color: TOKENS.textHigh, fontFamily: 'var(--font-inter)' }}>"{t.quote}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-gray-500 font-bold" style={{ fontFamily: 'var(--font-outfit)' }}>
                    {t.author.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-lg" style={{ fontFamily: 'var(--font-outfit)' }}>{t.author}</div>
                    <div className="text-sm font-medium" style={{ color: TOKENS.accent1 }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 9. FAQ */}
        <section className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black mb-12 text-center" style={{ fontFamily: 'var(--font-outfit)' }}>Questions?</h2>

          <div className="space-y-4">
            {[
              { q: "What should I do if I find an injured animal?", a: "Do not move them unless they are in immediate danger. Call our 24/7 hotline immediately with your exact location." },
              { q: "How long is the adoption process?", a: "Typically 3-5 days. We require an application, a brief interview, and sometimes a home check to ensure the perfect match." },
              { q: "Can I volunteer if I have no medical experience?", a: "Absolutely! We need dog walkers, kennel attendants, administrative help, and event volunteers." },
              { q: "Is my donation tax-deductible?", a: "Yes, RescueRhythm is a registered 501(c)(3) non-profit organization." },
              { q: "Do you take in surrendered pets?", a: "We prioritize emergency street rescues and abuse cases, but we do accept owner surrenders when space permits." }
            ].map((faq, i) => (
              <div key={i} className="p-6 rounded-2xl border-2" style={{ borderColor: TOKENS.surface }}>
                <h3 className="text-xl font-bold mb-2 flex items-start gap-2" style={{ fontFamily: 'var(--font-outfit)' }}>
                  <span style={{ color: TOKENS.accent1 }}>Q.</span> {faq.q}
                </h3>
                <p className="text-gray-600 pl-6" style={{ fontFamily: 'var(--font-inter)' }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 10. Newsletter */}
        <section>
          <div className="rounded-[3rem] p-12 md:p-24 text-center text-white relative overflow-hidden" style={{ backgroundColor: TOKENS.accent2 }}>
            <motion.div
              className="absolute inset-0 opacity-20"
              animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
              transition={{ duration: 20, repeat: Infinity, ease: [0, 0, 1, 1] as [number, number, number, number] }}
              style={{ backgroundImage: 'radial-gradient(circle, #FFFFFF 2px, transparent 2.5px)', backgroundSize: '40px 40px' }}
            />
            <div className="relative z-10">
              <HeartPulse size={64} className="mx-auto mb-6" />
              <h2 className="text-4xl md:text-5xl font-black mb-6" style={{ fontFamily: 'var(--font-outfit)' }}>Stay on the Pulse</h2>
              <p className="text-xl mb-10 max-w-2xl mx-auto opacity-90 font-light" style={{ fontFamily: 'var(--font-inter)' }}>
                Get weekly updates on successful rescues, urgent needs, and upcoming adoption events in your area.
              </p>
              <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-6 py-4 rounded-full text-black font-medium focus:outline-none focus:ring-4 focus:ring-red-300 transition-all"
                  required
                />
                <PulseButton className="px-10">
                  Subscribe
                </PulseButton>
              </form>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="mt-32 pt-16 pb-24 px-6 md:px-8 border-t" style={{ borderColor: TOKENS.surface }}>
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <HeartPulse size={24} color={TOKENS.accent1} />
              <span className="font-black text-2xl tracking-tight" style={{ fontFamily: 'var(--font-outfit)' }}>RescueRhythm</span>
            </div>
            <p className="text-gray-500 mb-6 max-w-sm" style={{ fontFamily: 'var(--font-inter)' }}>
              A registered 501(c)(3) non-profit organization dedicated to emergency animal rescue and rehabilitation.
            </p>
            <div className="flex gap-4">
              {/* Social icons */}
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 cursor-pointer">TW</div>
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 cursor-pointer">IG</div>
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 cursor-pointer">FB</div>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4 uppercase tracking-wider text-sm" style={{ fontFamily: 'var(--font-outfit)' }}>Get Involved</h4>
            <ul className="space-y-3 text-gray-500 font-medium text-sm" style={{ fontFamily: 'var(--font-inter)' }}>
              <li><a href="#" className="hover:text-red-500 transition-colors">Adopt</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors">Foster</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors">Volunteer</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors">Donate</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 uppercase tracking-wider text-sm" style={{ fontFamily: 'var(--font-outfit)' }}>Our Mission</h4>
            <ul className="space-y-3 text-gray-500 font-medium text-sm" style={{ fontFamily: 'var(--font-inter)' }}>
              <li><a href="#" className="hover:text-red-500 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors">Success Stories</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors">Financials</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors">Careers</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 uppercase tracking-wider text-sm" style={{ fontFamily: 'var(--font-outfit)' }}>Emergency</h4>
            <ul className="space-y-3 text-gray-500 font-medium text-sm" style={{ fontFamily: 'var(--font-inter)' }}>
              <li><span className="text-red-500 font-bold">1-800-RESCUE-9</span></li>
              <li><a href="#" className="hover:text-red-500 transition-colors">Report Abuse</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors">Found a stray?</a></li>
            </ul>
          </div>
        </div>

        <div className="max-w-6xl mx-auto pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400 font-medium" style={{ borderColor: TOKENS.surface, fontFamily: 'var(--font-inter)' }}>
          <p>© 2024 RescueRhythm. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-800">Privacy Policy</a>
            <a href="#" className="hover:text-gray-800">Terms of Service</a>
          </div>
        </div>
      </footer>

      <LiveTicker />
    </motion.div>
  )
}
