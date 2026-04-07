'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Archivo_Black, Space_Grotesk } from 'next/font/google'
import { CheckSquare, Bone, Star, Check, Goal, Users, Clock, ShieldCheck, Play, Square, Settings } from 'lucide-react'

const archivoBlack = Archivo_Black({ subsets: ['latin'], weight: '400', variable: '--font-archivo-black' })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' })

const TOKENS = {
  background: '#ECFCCB', // Field Green
  surface: '#FFFFFF',
  accent1: '#65A30D', // Coach Green
  accent2: '#CA8A04', // Reward Gold
  border: '#BEF264',
  textHigh: '#1A2E05',
  textLow: '#4D7C0F',
}

// Custom Framer Motion Variants
const commandSnap: import('framer-motion').Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 500,
      damping: 30
    }
  }
}

const rewardBurst: import('framer-motion').Variants = {
  initial: { scale: 1, rotate: 0 },
  burst: {
    scale: [1, 1.5, 1],
    rotate: [0, 360],
    transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] }
  }
}

function PawPath() {
  const { scrollYProgress } = useScroll()
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-20">
      <svg className="w-full h-full" viewBox="0 0 100 1000" preserveAspectRatio="none">
        <motion.path
          d="M 50,0 Q 80,100 50,200 T 50,400 T 50,600 T 50,800 T 50,1000"
          fill="none"
          stroke={TOKENS.accent1}
          strokeWidth="2"
          strokeDasharray="10 10"
          style={{ pathLength }}
        />
      </svg>
    </div>
  )
}

function ChalkButton({ children, className, primary = true, onClick }: { children: React.ReactNode, className?: string, primary?: boolean, onClick?: () => void }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`relative px-8 py-4 font-bold text-lg ${className}`}
      style={{
        fontFamily: 'var(--font-archivo-black)',
        color: primary ? 'white' : TOKENS.textHigh,
        backgroundColor: primary ? TOKENS.accent1 : TOKENS.surface
      }}
    >
      <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
         {/* Chalk-like border using multiple irregular paths */}
         <path d="M 5,5 L 95%,3 L 97%,95% L 2%,97% Z" fill="none" stroke={primary ? 'transparent' : TOKENS.textHigh} strokeWidth="2" strokeDasharray="4 2" />
         <path d="M 3,7 L 96%,4 L 95%,96% L 4%,95% Z" fill="none" stroke={primary ? 'transparent' : TOKENS.textHigh} strokeWidth="1" strokeDasharray="2 4" opacity="0.5"/>
      </svg>
      {children}
    </motion.button>
  )
}

function CommandAudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [activeCommand, setActiveCommand] = useState('Sit')

  const commands = [
    { name: 'Sit', desc: 'Short, sharp single whistle.' },
    { name: 'Come', desc: 'Two short bursts.' },
    { name: 'Stay', desc: 'Long, sustained tone.' }
  ]

  const handlePlay = (cmdName: string) => {
    setActiveCommand(cmdName)
    setIsPlaying(true)
    setTimeout(() => setIsPlaying(false), 2000) // Mock playback duration
  }

  return (
    <div className="bg-white p-8 border-4 relative" style={{ borderColor: TOKENS.border }}>
      {/* Tape decoration */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-gray-200 rotate-2 opacity-50" />

      <h3 className="text-2xl uppercase mb-6 text-center" style={{ fontFamily: 'var(--font-archivo-black)', color: TOKENS.textHigh }}>Whistle Commands</h3>

      <div className="flex flex-col gap-4">
        {commands.map((cmd) => (
          <div key={cmd.name} className="flex items-center gap-4 p-4 border-2" style={{ borderColor: activeCommand === cmd.name && isPlaying ? TOKENS.accent1 : TOKENS.border, backgroundColor: TOKENS.background }}>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handlePlay(cmd.name)}
              className="w-12 h-12 flex items-center justify-center bg-white border-2 rounded-full shrink-0"
              style={{ borderColor: TOKENS.accent1, color: TOKENS.accent1 }}
            >
              {activeCommand === cmd.name && isPlaying ? <Square fill="currentColor" size={16}/> : <Play fill="currentColor" size={16}/>}
            </motion.button>
            <div className="flex-1">
              <div className="font-bold uppercase text-lg" style={{ fontFamily: 'var(--font-archivo-black)', color: TOKENS.textHigh }}>{cmd.name}</div>
              <div className="text-sm font-medium" style={{ fontFamily: 'var(--font-space-grotesk)', color: TOKENS.textLow }}>{cmd.desc}</div>
            </div>

            {/* Waveform Visualization (Mock) */}
            <div className="h-8 w-24 flex items-center gap-1">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-2 bg-current rounded-full"
                  style={{ color: activeCommand === cmd.name && isPlaying ? TOKENS.accent1 : TOKENS.border }}
                  animate={activeCommand === cmd.name && isPlaying ? {
                    height: ['20%', '100%', '20%']
                  } : { height: '20%' }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    delay: i * 0.1
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function StarCheckbox({ label, defaultChecked = false }: { label: string, defaultChecked?: boolean }) {
  const [checked, setChecked] = useState(defaultChecked)

  return (
    <div
      className="flex items-center gap-4 cursor-pointer group"
      onClick={() => setChecked(!checked)}
    >
      <motion.div
        variants={rewardBurst}
        initial="initial"
        animate={checked ? "burst" : "initial"}
        className="w-8 h-8 flex items-center justify-center border-2 shrink-0 transition-colors"
        style={{
          borderColor: checked ? TOKENS.accent2 : TOKENS.textLow,
          backgroundColor: checked ? TOKENS.accent2 : 'transparent',
          color: checked ? 'white' : 'transparent'
        }}
      >
        <Star fill="currentColor" size={16} />
      </motion.div>
      <span className="text-lg font-bold" style={{ fontFamily: 'var(--font-space-grotesk)', color: checked ? TOKENS.textHigh : TOKENS.textLow, textDecoration: checked ? 'line-through' : 'none' }}>
        {label}
      </span>
    </div>
  )
}

function GoalBadge({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <motion.div
      variants={commandSnap}
      className="relative p-6 bg-white flex flex-col items-center text-center group overflow-hidden"
    >
      {/* Stitch border */}
      <div className="absolute inset-1 pointer-events-none border-2 border-dashed" style={{ borderColor: TOKENS.border }} />

      <motion.div
        className="mb-4 text-white p-4 rounded-full"
        style={{ backgroundColor: TOKENS.accent1 }}
        whileHover={{ rotate: [0, -10, 10, -10, 10, 0] }}
        transition={{ duration: 0.5 }}
      >
        {icon}
      </motion.div>
      <h3 className="text-xl uppercase mb-2" style={{ fontFamily: 'var(--font-archivo-black)', color: TOKENS.textHigh }}>{title}</h3>
      <p className="font-medium text-sm leading-relaxed" style={{ fontFamily: 'var(--font-space-grotesk)', color: TOKENS.textLow }}>{desc}</p>

      {/* Holographic Treat Hover Effect */}
      <motion.div
        className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
        initial={{ y: 0 }}
        whileHover={{ y: 40 }}
      >
        <Bone fill={TOKENS.accent2} color={TOKENS.accent2} size={24} />
      </motion.div>
    </motion.div>
  )
}

export default function PawStepPage() {
  return (
    <div className={`min-h-screen relative overflow-hidden ${archivoBlack.variable} ${spaceGrotesk.variable}`} style={{ backgroundColor: TOKENS.background, color: TOKENS.textHigh }}>
      <PawPath />

      {/* 1. Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center bg-white/90 backdrop-blur-sm border-b-4" style={{ borderColor: TOKENS.border }}>
        <div className="flex items-center gap-3">
          <div className="bg-black text-white p-2 rounded-sm transform -rotate-6">
            <Goal size={24} color={TOKENS.accent1} />
          </div>
          <span className="text-2xl uppercase tracking-tighter" style={{ fontFamily: 'var(--font-archivo-black)' }}>PawStep</span>
        </div>

        <div className="hidden md:flex gap-8 uppercase font-bold text-sm tracking-wider" style={{ fontFamily: 'var(--font-space-grotesk)', color: TOKENS.textLow }}>
          <a href="#" className="hover:text-black transition-colors">Programs</a>
          <a href="#" className="hover:text-black transition-colors">Methodology</a>
          <a href="#" className="hover:text-black transition-colors">Trainers</a>
        </div>

        <button className="hidden md:block px-6 py-2 border-2 uppercase font-bold text-sm hover:bg-black hover:text-white transition-colors" style={{ borderColor: TOKENS.textHigh, fontFamily: 'var(--font-space-grotesk)' }}>
          Log In
        </button>
      </nav>

      <main className="pt-32 px-4 md:px-8 max-w-6xl mx-auto relative z-10 space-y-32 pb-32">

        {/* 2. Hero */}
        <section className="text-center flex flex-col items-center justify-center min-h-[70vh]">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="mb-8"
          >
            <span className="inline-block px-4 py-2 border-2 uppercase font-bold text-sm bg-white transform rotate-2" style={{ borderColor: TOKENS.accent1, color: TOKENS.accent1, fontFamily: 'var(--font-space-grotesk)' }}>
              Structured Play. Real Results.
            </span>
          </motion.div>

          <motion.h1
            className="text-6xl md:text-8xl uppercase leading-[0.9] mb-8"
            style={{ fontFamily: 'var(--font-archivo-black)' }}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 30, delay: 0.1 }}
          >
            Master The <br/> <span style={{ color: TOKENS.accent1 }}>Basics.</span>
          </motion.h1>

          <motion.p
            className="text-xl max-w-2xl mb-12 font-medium leading-relaxed"
            style={{ fontFamily: 'var(--font-space-grotesk)', color: TOKENS.textLow }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            A step-by-step, positive reinforcement training platform. Build an unbreakable bond through discipline, consistency, and a lot of rewards.
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-6"
          >
            <ChalkButton>Start Training</ChalkButton>
            <ChalkButton primary={false}>View Playbook</ChalkButton>
          </motion.div>
        </section>

        {/* 3. Stats */}
        <section>
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            transition={{ staggerChildren: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { val: '10k+', label: 'Graduates' },
              { val: '50+', label: 'Step Drills' },
              { val: '98%', label: 'Success Rate' },
              { val: '100%', label: 'Positive' }
            ].map((stat, i) => (
              <motion.div key={i} variants={commandSnap} className="bg-white border-4 p-6 text-center transform hover:-translate-y-2 transition-transform" style={{ borderColor: TOKENS.border }}>
                <div className="text-4xl md:text-5xl mb-2" style={{ fontFamily: 'var(--font-archivo-black)', color: TOKENS.accent1 }}>{stat.val}</div>
                <div className="uppercase font-bold text-sm" style={{ fontFamily: 'var(--font-space-grotesk)', color: TOKENS.textHigh }}>{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* 4. Unique Section: Command Audio Player */}
        <section className="flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2">
            <CommandAudioPlayer />
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="text-4xl md:text-5xl uppercase mb-6" style={{ fontFamily: 'var(--font-archivo-black)' }}>The Tone of <span style={{ color: TOKENS.accent2 }}>Success</span></h2>
            <p className="text-lg font-medium mb-8 leading-relaxed" style={{ fontFamily: 'var(--font-space-grotesk)', color: TOKENS.textLow }}>
              Consistency is key. Dogs respond better to clear, consistent auditory cues than to complex verbal commands. Our whistle training module standardizes your communication, cutting through environmental noise.
            </p>
            <div className="bg-white border-4 p-6 inline-block" style={{ borderColor: TOKENS.accent2 }}>
              <div className="flex items-center gap-4 mb-2 text-yellow-500">
                <Star fill="currentColor"/> <Star fill="currentColor"/> <Star fill="currentColor"/>
              </div>
              <div className="uppercase font-bold text-sm tracking-wider" style={{ fontFamily: 'var(--font-space-grotesk)' }}>Pro Tip: Always follow a successful whistle command with an immediate high-value reward.</div>
            </div>
          </div>
        </section>

        {/* 5. Features (Methodology) */}
        <section>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl uppercase mb-4" style={{ fontFamily: 'var(--font-archivo-black)' }}>The Playbook</h2>
            <p className="text-xl font-medium" style={{ fontFamily: 'var(--font-space-grotesk)', color: TOKENS.textLow }}>Core principles of the PawStep method.</p>
          </div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            transition={{ staggerChildren: 0.1 }}
            className="grid md:grid-cols-3 gap-8"
          >
            <GoalBadge icon={<CheckSquare size={32}/>} title="Clear Criteria" desc="Break complex behaviors down into simple, achievable steps to prevent frustration." />
            <GoalBadge icon={<ShieldCheck size={32}/>} title="Consistency" desc="Same command, same tone, every single time. Predictability breeds confidence." />
            <GoalBadge icon={<Clock size={32}/>} title="Timing" desc="Mark the exact moment the right choice is made with precision markers." />
            <GoalBadge icon={<Bone size={32}/>} title="High Reward" desc="Build motivation using high-value treats and structured play sessions." />
            <GoalBadge icon={<Users size={32}/>} title="Pack Leadership" desc="Establish calm, assertive guidance without resorting to dominance theory." />
            <GoalBadge icon={<Settings size={32}/>} title="Generalization" desc="Proof behaviors across different environments and distraction levels." />
          </motion.div>
        </section>

        {/* 6. Product Detail (Checklist Demo) */}
        <section className="bg-white border-8 p-8 md:p-16 relative" style={{ borderColor: TOKENS.textHigh }}>
          {/* Decorative clip */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-8 bg-gray-300 rounded-full border-4 border-black" />

          <div className="flex flex-col md:flex-row gap-12">
            <div className="w-full md:w-1/2">
               <h2 className="text-4xl md:text-6xl uppercase mb-6" style={{ fontFamily: 'var(--font-archivo-black)' }}>Daily <br/><span style={{ color: TOKENS.accent1 }}>Drills</span></h2>
               <p className="text-lg font-medium leading-relaxed mb-8" style={{ fontFamily: 'var(--font-space-grotesk)', color: TOKENS.textLow }}>
                 Training isn&apos;t an event; it&apos;s a lifestyle. Our app provides daily micro-drills that take less than 5 minutes. Check them off to build streaks and unlock advanced masterclasses.
               </p>
               <ChalkButton>Download App</ChalkButton>
            </div>
            <div className="w-full md:w-1/2 bg-gray-50 border-4 p-8 flex flex-col justify-center" style={{ borderColor: TOKENS.border }}>
              <div className="uppercase font-bold text-sm tracking-widest mb-6 border-b-2 pb-2" style={{ fontFamily: 'var(--font-space-grotesk)', borderColor: TOKENS.border }}>Today&apos;s Tasks</div>
              <div className="space-y-6">
                <StarCheckbox label="5-Minute Leash Walk Focus" defaultChecked={true} />
                <StarCheckbox label="Doorway Boundary Drill" />
                <StarCheckbox label="'Leave It' with Low-Value Item" />
                <StarCheckbox label="Target Touching (Hand)" />
              </div>
            </div>
          </div>
        </section>

        {/* 7. Pricing */}
        <section>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl uppercase mb-4" style={{ fontFamily: 'var(--font-archivo-black)' }}>Join the Pack</h2>
            <p className="text-xl font-medium" style={{ fontFamily: 'var(--font-space-grotesk)', color: TOKENS.textLow }}>Select your training intensity.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
             {[
               { name: 'Puppy Primer', price: 'Free', desc: 'Basic obedience fundamentals.', features: ['7-Day starter course', 'Potty training tracker', 'Basic commands list'] },
               { name: 'Field Master', price: '$12/mo', desc: 'Complete access to all drills.', features: ['Full video library', 'Daily drill generation', 'Whistle audio toolkit'], featured: true },
               { name: 'Pro Coach', price: '$49/mo', desc: '1-on-1 virtual guidance.', features: ['Everything in Field Master', 'Weekly video review', 'Custom training plan'] }
             ].map((plan, i) => (
               <div key={i} className="bg-white border-4 p-8 relative flex flex-col" style={{ borderColor: plan.featured ? TOKENS.accent1 : TOKENS.border, transform: plan.featured ? 'scale(1.05)' : 'none', zIndex: plan.featured ? 10 : 1 }}>
                 {plan.featured && (
                   <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black text-white px-4 py-1 uppercase font-bold text-xs tracking-widest" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                     Most Popular
                   </div>
                 )}
                 <h3 className="text-2xl uppercase mb-2" style={{ fontFamily: 'var(--font-archivo-black)' }}>{plan.name}</h3>
                 <div className="text-4xl font-bold mb-4" style={{ color: plan.featured ? TOKENS.accent1 : TOKENS.textHigh }}>{plan.price}</div>
                 <p className="font-medium text-sm mb-8" style={{ fontFamily: 'var(--font-space-grotesk)', color: TOKENS.textLow }}>{plan.desc}</p>

                 <ul className="space-y-4 mb-8 flex-1">
                   {plan.features.map((feat, j) => (
                     <li key={j} className="flex items-start gap-3 font-medium text-sm" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                       <Check size={20} className="shrink-0" color={TOKENS.accent1} /> {feat}
                     </li>
                   ))}
                 </ul>

                 <button className="w-full py-4 border-2 uppercase font-bold tracking-wider hover:bg-black hover:text-white transition-colors"
                         style={{
                           fontFamily: 'var(--font-space-grotesk)',
                           borderColor: TOKENS.textHigh,
                           backgroundColor: plan.featured ? TOKENS.accent1 : 'transparent',
                           color: plan.featured ? 'white' : TOKENS.textHigh
                         }}>
                   Select Plan
                 </button>
               </div>
             ))}
          </div>
        </section>

        {/* 8. Testimonials */}
        <section>
          <div className="bg-black text-white p-8 md:p-16 relative overflow-hidden">
             {/* Large background quote mark */}
             <div className="absolute top-0 left-4 text-[200px] leading-none opacity-10 font-serif">"</div>

             <h2 className="text-4xl md:text-5xl uppercase mb-12 text-center relative z-10" style={{ fontFamily: 'var(--font-archivo-black)' }}>Field Reports</h2>

             <div className="grid md:grid-cols-2 gap-12 relative z-10">
               {[
                 { q: "My rescue had terrible leash reactivity. The structured 5-minute drills broke the problem down into manageable steps. Walks are actually enjoyable now.", a: "Mark & Buster" },
                 { q: "The whistle training module is a game changer. Recall at the dog park went from 50% to 100% in just two weeks.", a: "Sarah & Daisy" },
                 { q: "I love the daily checklists. It keeps me accountable and makes sure we&apos;re always making progress, even on busy days.", a: "David & Apollo" },
                 { q: "Clear, concise, and incredibly effective. No fluff, just practical methodology that works for real-world situations.", a: "Elena & Chief" }
               ].map((t, i) => (
                 <div key={i} className="flex gap-4">
                   <div className="w-2 h-full bg-white opacity-20 shrink-0" />
                   <div>
                     <p className="text-lg font-medium mb-4 leading-relaxed" style={{ fontFamily: 'var(--font-space-grotesk)' }}>"{t.q}"</p>
                     <div className="uppercase font-bold text-sm tracking-widest" style={{ color: TOKENS.accent1 }}>{t.a}</div>
                   </div>
                 </div>
               ))}
             </div>
          </div>
        </section>

        {/* 9. FAQ */}
        <section className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl uppercase mb-12 text-center" style={{ fontFamily: 'var(--font-archivo-black)' }}>Pre-Game Briefing</h2>

          <div className="space-y-6">
            {[
              { q: "Is this suitable for puppies?", a: "Yes, the Puppy Primer program is specifically designed for dogs under 6 months." },
              { q: "What kind of training methods do you use?", a: "We are strictly LIMA (Least Intrusive, Minimally Aversive) and focus heavily on positive reinforcement and structural management." },
              { q: "Do I need special equipment?", a: "Just a standard leash, collar/harness, high-value treats, and a training whistle (optional but recommended)." },
              { q: "How long are the daily drills?", a: "Most drills are designed to take 3-5 minutes. We believe in short, highly focused sessions." },
              { q: "Can I cancel my subscription?", a: "Yes, you can cancel or pause your subscription at any time directly from the dashboard." }
            ].map((faq, i) => (
              <div key={i} className="bg-white border-4 p-6" style={{ borderColor: TOKENS.border }}>
                <h3 className="text-xl uppercase font-bold mb-2 flex items-center gap-3" style={{ fontFamily: 'var(--font-archivo-black)' }}>
                  <div className="w-8 h-8 bg-black text-white flex items-center justify-center text-sm">{i+1}</div>
                  {faq.q}
                </h3>
                <p className="font-medium text-gray-600 pl-11" style={{ fontFamily: 'var(--font-space-grotesk)' }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 10. Newsletter */}
        <section>
          <div className="bg-white border-8 p-12 md:p-24 text-center" style={{ borderColor: TOKENS.accent1 }}>
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.5 }}
              className="inline-block mb-6 bg-black p-4 rounded-full"
            >
              <Goal size={48} color={TOKENS.accent1} />
            </motion.div>
            <h2 className="text-4xl md:text-6xl uppercase mb-6" style={{ fontFamily: 'var(--font-archivo-black)' }}>Stay <span style={{ color: TOKENS.accent1 }}>Sharp.</span></h2>
            <p className="text-xl font-medium max-w-xl mx-auto mb-10" style={{ fontFamily: 'var(--font-space-grotesk)', color: TOKENS.textLow }}>
              Join 50,000+ owners receiving our weekly training tip and drill breakdown. No spam, just actionable advice.
            </p>
            <form className="flex flex-col sm:flex-row justify-center max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="ENTER EMAIL"
                className="px-6 py-4 border-4 uppercase font-bold tracking-wider outline-none focus:border-black flex-1"
                style={{ borderColor: TOKENS.border, fontFamily: 'var(--font-space-grotesk)' }}
              />
              <button className="px-8 py-4 bg-black text-white uppercase font-bold tracking-widest hover:bg-gray-800 transition-colors" style={{ fontFamily: 'var(--font-archivo-black)' }}>
                Subscribe
              </button>
            </form>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-white border-t-8 py-16 px-6 md:px-12 relative z-10" style={{ borderColor: TOKENS.textHigh }}>
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 font-medium" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
          <div className="col-span-2">
             <div className="flex items-center gap-2 mb-6">
              <div className="bg-black text-white p-1 rounded-sm transform -rotate-6">
                <Goal size={20} color={TOKENS.accent1} />
              </div>
              <span className="text-2xl uppercase tracking-tighter" style={{ fontFamily: 'var(--font-archivo-black)' }}>PawStep</span>
            </div>
            <p className="max-w-sm mb-6 text-gray-600">Structured training methodology for the modern dog owner. Build the bond you&apos;ve always wanted.</p>
          </div>

          <div>
            <h4 className="uppercase font-bold mb-4 tracking-widest text-black">Programs</h4>
            <ul className="space-y-2 text-gray-600">
              <li><a href="#" className="hover:text-black hover:underline">Puppy Primer</a></li>
              <li><a href="#" className="hover:text-black hover:underline">Field Master</a></li>
              <li><a href="#" className="hover:text-black hover:underline">Pro Coach</a></li>
              <li><a href="#" className="hover:text-black hover:underline">Whistle Kit</a></li>
            </ul>
          </div>

          <div>
            <h4 className="uppercase font-bold mb-4 tracking-widest text-black">Company</h4>
            <ul className="space-y-2 text-gray-600">
              <li><a href="#" className="hover:text-black hover:underline">About Us</a></li>
              <li><a href="#" className="hover:text-black hover:underline">Methodology</a></li>
              <li><a href="#" className="hover:text-black hover:underline">Trainers</a></li>
              <li><a href="#" className="hover:text-black hover:underline">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="max-w-6xl mx-auto pt-12 mt-12 border-t-2 border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-bold uppercase tracking-widest text-gray-400" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
          <p>© 2024 PAWSTEP INC.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-black">Terms</a>
            <a href="#" className="hover:text-black">Privacy</a>
          </div>
        </div>
      </footer>
      
      </div>
  )
}
