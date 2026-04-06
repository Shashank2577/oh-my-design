'use client'

import { motion, useReducedMotion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { VT323, Press_Start_2P } from 'next/font/google'
import {
  Trophy, Gamepad2, Skull, Coins, Zap, Shield, Users, ArrowRight, ChevronDown
} from 'lucide-react'

const vt323 = VT323({ weight: '400', subsets: ['latin'], variable: '--font-vt', display: 'swap' })
const pressStart = Press_Start_2P({ weight: '400', subsets: ['latin'], variable: '--font-press', display: 'swap' })

const tokens = {
  background: '#120458',
  surface: '#2D033B',
  accent1: '#FF00FF',
  accent2: '#00FFFF',
  textHigh: '#FFFF00',
  textLow: '#810CA8',
  border: '4px solid #FF00FF'
}

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-5% 0px' })
  const shouldReduce = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      initial={shouldReduce ? false : { opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.1, delay, ease: 'linear' }} // linear for 8-bit feel without TS error
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
        visible: { transition: { staggerChildren: 0.15 } },
      }}
    >
      {children}
    </motion.div>
  )
}

import type { Variants } from 'framer-motion'

const staggerItem: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.1, ease: 'linear' } },
}

export default function RetroLeaguePage() {
  const [shake, setShake] = useState(false)

  // Trigger screen shake
  const triggerShake = () => {
    setShake(true)
    setTimeout(() => setShake(false), 200)
  }

  return (
    <div
       className={`${vt323.variable} ${pressStart.variable} font-sans min-h-screen relative overflow-x-hidden`}
       style={{ backgroundColor: tokens.background, color: tokens.textHigh }}
    >
      {/* Scanline Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-20 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px]" />

      {/* CRT Flicker */}
      <motion.div
        animate={{ opacity: [1, 0.95, 1] }}
        transition={{ repeat: Infinity, duration: 0.1, ease: 'linear' }}
        className="fixed inset-0 pointer-events-none z-[99]"
      />

      <motion.div animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}} transition={{ duration: 0.2 }}>
        <Navbar onShake={triggerShake} />
        <main>
          <Hero onShake={triggerShake} />
          <Stats />
          <Features />
          <UniqueSection onShake={triggerShake} />
          <ProductDetail />
          <Pricing onShake={triggerShake} />
          <Testimonials />
          <FAQ />
          <Newsletter />
        </main>
        <Footer />
      </motion.div>
    </div>
  )
}

function Navbar({ onShake }: { onShake: () => void }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#120458] border-b-[4px] border-[#FF00FF]">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Gamepad2 className="w-8 h-8 text-[#00FFFF]" />
          <span className="font-[family-name:var(--font-press)] text-sm mt-1 text-[#FFFF00]">RETRO<br/>LEAGUE</span>
        </div>
        <div className="hidden md:flex items-center gap-6 font-[family-name:var(--font-press)] text-xs">
          {['PLAY', 'ROSTER', 'STORE'].map(link => (
            <motion.a
              key={link}
              href={`#${link.toLowerCase()}`}
              whileHover={{ color: tokens.accent2, y: -2 }}
              className="text-[#FFFF00] transition-transform"
            >
              {link}
            </motion.a>
          ))}
        </div>
        <button
          onClick={onShake}
          className="px-4 py-2 bg-[#FF00FF] border-[4px] border-white text-white font-[family-name:var(--font-press)] text-xs shadow-[4px_4px_0_#00FFFF] active:shadow-none active:translate-x-1 active:translate-y-1"
        >
          INSERT COIN
        </button>
      </div>
    </nav>
  )
}

function Hero({ onShake }: { onShake: () => void }) {
  return (
    <section className="min-h-screen flex items-center justify-center pt-16 relative">
      <div className="max-w-4xl mx-auto px-6 text-center z-10">
        <FadeUp>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-[family-name:var(--font-press)] mb-8 leading-tight text-[#FFFF00] drop-shadow-[4px_4px_0_#FF00FF]">
            WELCOME TO <br/>THE LEAGUE
          </h1>
          <p className="font-[family-name:var(--font-vt)] text-3xl md:text-4xl mb-12 text-[#00FFFF]">
            NO MICROTRANSACTIONS. NO LOOTBOXES.<br/>JUST PURE 16-BIT GLORY.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button
              onClick={onShake}
              className="px-8 py-4 bg-[#FF00FF] border-[4px] border-white text-white font-[family-name:var(--font-press)] text-sm shadow-[8px_8px_0_#00FFFF] active:shadow-none active:translate-x-2 active:translate-y-2 hover:bg-[#CC00CC]"
            >
              START GAME
            </button>
            <p className="font-[family-name:var(--font-vt)] text-2xl text-[#FF00FF] animate-pulse">
              PRESS START TO PLAY
            </p>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

function Stats() {
  const stats = [
    { label: 'HIGH SCORE', val: '999,999' },
    { label: 'PLAYERS', val: '1P/2P' },
    { label: 'CREDITS', val: 'FREE' }
  ]
  return (
    <section className="py-8 bg-[#2D033B] border-y-[4px] border-[#00FFFF]">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex justify-between items-center font-[family-name:var(--font-press)] text-sm md:text-base">
          {stats.map((s, i) => (
             <div key={i} className="text-center">
               <p className="text-[#FF00FF] mb-2">{s.label}</p>
               <p className="text-[#FFFF00] animate-pulse">{s.val}</p>
             </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Features() {
  const features = [
    { icon: Trophy, title: 'LEADERBOARDS', desc: 'GLOBAL RANKING SYSTEM.' },
    { icon: Users, title: 'CO-OP MODE', desc: 'PLAY WITH FRIENDS.' },
    { icon: Zap, title: 'POWER-UPS', desc: 'UNLOCK SECRET MOVES.' },
    { icon: Shield, title: 'NO CHEATS', desc: 'FAIR PLAY GUARANTEED.' }
  ]
  return (
    <section className="py-24" id="play">
      <div className="max-w-6xl mx-auto px-6">
        <FadeUp>
          <h2 className="font-[family-name:var(--font-press)] text-2xl md:text-4xl text-center mb-16 text-[#00FFFF] drop-shadow-[2px_2px_0_#FF00FF]">
            GAME FEATURES
          </h2>
        </FadeUp>
        <StaggerContainer>
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((f, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                className="bg-[#2D033B] border-[4px] border-[#FF00FF] p-6 flex items-start gap-4"
              >
                <div className="w-16 h-16 bg-[#FF00FF] flex items-center justify-center shrink-0 shadow-[4px_4px_0_#00FFFF]">
                   <f.icon className="w-8 h-8 text-white" />
                </div>
                <div>
                   <h3 className="font-[family-name:var(--font-press)] text-sm text-[#FFFF00] mb-2">{f.title}</h3>
                   <p className="font-[family-name:var(--font-vt)] text-2xl text-white">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  )
}

function UniqueSection({ onShake }: { onShake: () => void }) {
  const [cheatCode, setCheatCode] = useState('')
  const [unlocked, setUnlocked] = useState(false)

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toUpperCase()
    setCheatCode(val)
    if (val === 'UPUPDOWNDOWN') {
      setUnlocked(true)
      onShake()
    }
  }

  return (
    <section className="py-24 bg-[#2D033B] border-y-[4px] border-[#FF00FF]">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <FadeUp>
           <h2 className="font-[family-name:var(--font-press)] text-2xl text-[#FFFF00] mb-8">TROPHY ROOM</h2>

           <div className="flex justify-center gap-8 mb-16">
              {[1,2,3].map(i => (
                 <motion.div
                   key={i}
                   whileHover={{ y: -10 }}
                   className="w-24 h-24 bg-[#120458] border-[4px] border-[#00FFFF] flex items-center justify-center relative group"
                 >
                    <Trophy className={`w-12 h-12 ${i === 2 ? 'text-[#FF00FF]' : 'text-gray-500'}`} />
                    <div className="absolute -top-8 hidden group-hover:block font-[family-name:var(--font-press)] text-[10px] text-[#FFFF00] whitespace-nowrap animate-pulse">
                      {i === 2 ? 'NEW RECORD!' : 'LOCKED'}
                    </div>
                 </motion.div>
              ))}
           </div>

           <div className="max-w-md mx-auto">
              <p className="font-[family-name:var(--font-vt)] text-2xl text-[#00FFFF] mb-4">ENTER SECRET CODE:</p>
              <div className="relative">
                 <input
                   type="text"
                   value={cheatCode}
                   onChange={handleInput}
                   maxLength={12}
                   className="w-full bg-black border-[4px] border-[#FF00FF] p-4 font-[family-name:var(--font-press)] text-white text-center focus:outline-none focus:border-[#00FFFF]"
                 />
                 {!cheatCode && (
                    <motion.div
                       animate={{ opacity: [1, 0, 1] }}
                       transition={{ duration: 1, repeat: Infinity }}
                       className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-[family-name:var(--font-press)] text-[#FF00FF]"
                    >
                       _
                    </motion.div>
                 )}
              </div>
              {unlocked && (
                 <p className="mt-4 font-[family-name:var(--font-press)] text-sm text-[#00FFFF] animate-bounce">
                    CHEAT UNLOCKED!
                 </p>
              )}
           </div>
        </FadeUp>
      </div>
    </section>
  )
}

function ProductDetail() {
  return (
    <section className="py-24">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <FadeUp>
           <Skull className="w-16 h-16 text-[#FF00FF] mx-auto mb-8" />
           <h2 className="font-[family-name:var(--font-press)] text-2xl mb-8 text-[#00FFFF]">BOSS BATTLES AWAIT</h2>
           <p className="font-[family-name:var(--font-vt)] text-3xl leading-relaxed text-white">
              BUILD YOUR ROSTER, TRAIN YOUR PLAYERS, AND DEFEAT THE CHAMPIONS. EVERY MATCH IS A TEST OF SKILL. NO PAY TO WIN.
           </p>
        </FadeUp>
      </div>
    </section>
  )
}

function Pricing({ onShake }: { onShake: () => void }) {
  return (
    <section id="store" className="py-24 bg-[#2D033B] border-y-[4px] border-[#00FFFF]">
      <div className="max-w-4xl mx-auto px-6">
        <FadeUp>
          <h2 className="font-[family-name:var(--font-press)] text-2xl text-center mb-16 text-[#FFFF00]">ITEM SHOP</h2>
        </FadeUp>
        <StaggerContainer>
          <div className="grid md:grid-cols-3 gap-8">
            {['1UP', 'CONTINUE', 'SEASON PASS'].map((item, i) => (
              <motion.div
                key={item}
                variants={staggerItem}
                className="bg-black border-[4px] border-[#FF00FF] p-6 text-center"
              >
                <Coins className="w-12 h-12 text-[#FFFF00] mx-auto mb-4" />
                <h3 className="font-[family-name:var(--font-press)] text-xs text-white mb-4">{item}</h3>
                <p className="font-[family-name:var(--font-vt)] text-4xl text-[#00FFFF] mb-6">${(i+1)*5}.00</p>
                <button
                  onClick={onShake}
                  className="w-full py-2 bg-[#FF00FF] text-white font-[family-name:var(--font-press)] text-xs border-[2px] border-white active:bg-white active:text-[#FF00FF]"
                >
                  BUY NOW
                </button>
              </motion.div>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  )
}

function Testimonials() {
  return (
    <section className="py-24">
      <div className="max-w-5xl mx-auto px-6">
        <FadeUp>
          <h2 className="font-[family-name:var(--font-press)] text-2xl text-center mb-16 text-[#00FFFF]">PLAYER REVIEWS</h2>
        </FadeUp>
        <StaggerContainer>
          <div className="grid md:grid-cols-2 gap-8">
             {[1,2,3,4].map(i => (
                <motion.div key={i} variants={staggerItem} className="bg-[#2D033B] p-6 border-[4px] border-[#FFFF00] relative">
                   <div className="absolute -top-4 -left-4 w-8 h-8 bg-[#FF00FF] border-[2px] border-white text-white font-[family-name:var(--font-press)] text-xs flex items-center justify-center">
                     P{i}
                   </div>
                   <p className="font-[family-name:var(--font-vt)] text-2xl text-white mb-4">&quot;BEST GAME SINCE &apos;94. CONTROLS ARE TIGHT.&quot;</p>
                   <div className="flex text-[#00FFFF]">
                     {'★'.repeat(5)}
                   </div>
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
    { q: 'CONTROLLER SUPPORT?', a: 'PLUG AND PLAY. ALL PADS RECOGNIZED.' },
    { q: 'ONLINE MULTIPLAYER?', a: 'ROLLBACK NETCODE ENABLED.' },
    { q: 'SAVE DATA?', a: 'PASSWORD SYSTEM OVERHAULED. CLOUD SAVES ACTIVE.' }
  ]
  return (
    <section className="py-24 bg-[#2D033B] border-y-[4px] border-[#FF00FF]">
      <div className="max-w-3xl mx-auto px-6">
        <FadeUp>
          <h2 className="font-[family-name:var(--font-press)] text-2xl text-center mb-16 text-[#FFFF00]">MANUAL / FAQ</h2>
          <div className="space-y-6">
             {faqs.map((faq, i) => (
                <div key={i} className="bg-black border-[4px] border-[#00FFFF] p-6">
                   <h3 className="font-[family-name:var(--font-press)] text-sm text-[#FF00FF] mb-4">Q: {faq.q}</h3>
                   <p className="font-[family-name:var(--font-vt)] text-2xl text-white">A: {faq.a}</p>
                </div>
             ))}
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

function Newsletter() {
  return (
    <section className="py-24 text-center">
      <div className="max-w-2xl mx-auto px-6">
        <FadeUp>
          <h2 className="font-[family-name:var(--font-press)] text-2xl text-[#00FFFF] mb-8">JOIN THE MAILING LIST</h2>
          <p className="font-[family-name:var(--font-vt)] text-2xl text-white mb-8">GET CHEAT CODES AND UPDATE NEWS.</p>
          <div className="flex justify-center items-center gap-4">
            <input type="email" placeholder="EMAIL_ADDRESS" className="bg-black border-[4px] border-[#FFFF00] p-4 font-[family-name:var(--font-press)] text-xs text-white focus:outline-none flex-1 max-w-sm" />
            <button className="px-6 py-4 bg-[#00FFFF] border-[4px] border-white text-black font-[family-name:var(--font-press)] text-xs hover:bg-white transition-colors">
              SUBMIT
            </button>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="py-8 bg-black border-t-[4px] border-[#FF00FF]">
      <div className="max-w-6xl mx-auto px-6 text-center font-[family-name:var(--font-vt)] text-xl text-[#810CA8]">
         <p className="mb-2">© 1994-2026 RETRO LEAGUE CO. ALL RIGHTS RESERVED.</p>
         <p>CREDITS | OPTIONS | QUIT</p>
      </div>
    </footer>
  )
}
