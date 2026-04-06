'use client'

import { motion, useReducedMotion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Outfit, JetBrains_Mono } from 'next/font/google'
import {
  TrendingUp, Activity, BarChart3, ShieldAlert, Zap, Globe, Clock, ChevronDown, Lock, Check, ArrowRight
} from 'lucide-react'

const outfitFont = Outfit({ subsets: ['latin'], variable: '--font-outfit', display: 'swap' })
const jbMonoFont = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' })

const tokens = {
  background: '#0F172A',
  surface: '#1E293B',
  accent1: '#10B981', // Profit Green
  accent2: '#F43F5E', // Risk Red
  border: '#334155',
  textHigh: '#F8FAFC',
  textLow: '#94A3B8',
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
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
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
        visible: { transition: { staggerChildren: 0.05 } },
      }}
    >
      {children}
    </motion.div>
  )
}

import type { Variants } from 'framer-motion'

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 20 } },
}

export default function BetEdgePage() {
  return (
    <div className={`${outfitFont.variable} ${jbMonoFont.variable} font-sans min-h-screen selection:bg-[#10B981] selection:text-[#0F172A]`} style={{ backgroundColor: tokens.background, color: tokens.textHigh }}>
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
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b bg-[#0F172A]/90 backdrop-blur" style={{ borderColor: tokens.border }}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-[#10B981]" />
          <span className="font-bold text-xl tracking-tight">BetEdge</span>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <LiveTicker />
          {['Markets', 'Live', 'Pro', 'Log In'].map(link => (
            <motion.a
              key={link}
              href={`#${link.toLowerCase()}`}
              whileHover={{ color: tokens.textHigh }}
              className="text-sm font-medium transition-colors"
              style={{ color: link === 'Log In' ? tokens.textHigh : tokens.textLow }}
            >
              {link}
            </motion.a>
          ))}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-4 h-9 rounded bg-[#10B981] text-[#0F172A] text-sm font-bold shadow-[0_2px_10px_rgba(16,185,129,0.3)]"
          >
            Deposit
          </motion.button>
        </div>
      </div>
    </nav>
  )
}

function LiveTicker() {
  return (
    <div className="hidden lg:flex items-center gap-4 bg-[#1E293B] border border-[#334155] rounded px-3 py-1 mr-4 overflow-hidden w-64 h-8 relative">
       <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#1E293B] to-transparent z-10" />
       <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#1E293B] to-transparent z-10" />
       <motion.div
         animate={{ x: [0, -500] }}
         transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
         className="flex gap-4 font-mono text-xs whitespace-nowrap"
       >
          <span className="text-[#10B981]">BTC/USD +2.4%</span>
          <span className="text-[#F43F5E]">LAL -4.5</span>
          <span className="text-[#10B981]">MCI 2.10</span>
          <span className="text-[#10B981]">BTC/USD +2.4%</span>
          <span className="text-[#F43F5E]">LAL -4.5</span>
          <span className="text-[#10B981]">MCI 2.10</span>
       </motion.div>
    </div>
  )
}

// Split-flap number component
function FlipNumber({ value, suffix = '', trend = 'neutral' }: { value: string, suffix?: string, trend?: 'up' | 'down' | 'neutral' }) {
  const color = trend === 'up' ? tokens.accent1 : trend === 'down' ? tokens.accent2 : tokens.textHigh;

  return (
    <div className="flex items-baseline gap-1">
      <div className="flex gap-1">
        {value.split('').map((char, i) => (
          <div key={i} className="relative bg-[#1E293B] border border-[#334155] rounded px-2 py-1 overflow-hidden" style={{ width: char === '.' ? 'auto' : '1.5em', textAlign: 'center' }}>
            <motion.span
               key={char}
               initial={{ rotateX: -90, opacity: 0 }}
               animate={{ rotateX: 0, opacity: 1 }}
               transition={{ duration: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
               className="font-mono font-bold block"
               style={{ color }}
            >
              {char}
            </motion.span>
            {/* Horizontal line for mechanical effect */}
            <div className="absolute left-0 right-0 top-1/2 h-px bg-[#0F172A] opacity-50 z-10" />
          </div>
        ))}
      </div>
      <span className="text-sm font-mono text-[#94A3B8]">{suffix}</span>
    </div>
  )
}

function Hero() {
  const [odds, setOdds] = useState('2.45')
  const [trend, setTrend] = useState<'neutral'|'up'|'down'>('neutral')

  useEffect(() => {
    const interval = setInterval(() => {
      const isUp = Math.random() > 0.5;
      const change = (Math.random() * 0.1).toFixed(2);
      const current = parseFloat(odds);
      const next = isUp ? current + parseFloat(change) : current - parseFloat(change);

      setTrend(isUp ? 'up' : 'down');
      setOdds(next.toFixed(2));

      setTimeout(() => setTrend('neutral'), 1000);
    }, 3000)
    return () => clearInterval(interval)
  }, [odds])

  return (
    <section className="pt-32 pb-20 px-6 relative">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <FadeUp>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1E293B] border border-[#334155] rounded text-xs font-mono mb-6">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              IN-PLAY ACTIVE
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Precision in <br /> every second.
            </h1>
            <p className="text-lg text-[#94A3B8] mb-8 max-w-lg">
              Financial terminal speed meets sports betting. Execute in-play bets with mechanical precision and split-flap instant updates.
            </p>
            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.02, backgroundColor: '#0ea371' }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-[#10B981] text-[#0F172A] rounded font-bold flex items-center gap-2"
              >
                Open Exchange <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </FadeUp>
        </div>

        <FadeUp delay={0.2}>
           {/* Mechanical Odds Card */}
           <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-8 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#10B981] opacity-5 blur-[100px]" />

              <div className="flex justify-between items-start mb-8">
                 <div>
                    <p className="text-sm text-[#94A3B8] mb-1">Live Match</p>
                    <p className="font-bold text-xl">LAL vs BOS</p>
                 </div>
                 <div className="text-right">
                    <p className="text-sm text-[#94A3B8] mb-1 font-mono">Q4 02:14</p>
                    <p className="font-bold text-xl font-mono text-[#F8FAFC]">104 - 102</p>
                 </div>
              </div>

              <div className="space-y-4">
                 <div className="p-4 border border-[#334155] rounded flex justify-between items-center bg-[#0F172A]">
                    <span className="font-medium text-[#94A3B8]">LAL Moneyline</span>
                    <FlipNumber value={odds} trend={trend} />
                 </div>
                 <div className="p-4 border border-[#334155] rounded flex justify-between items-center bg-[#0F172A] opacity-50 relative overflow-hidden">
                    {/* Simulated "Locked" State grid overlay */}
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_25%,rgba(255,255,255,0.05)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.05)_75%,rgba(255,255,255,0.05)_100%)] bg-[length:20px_20px]" />
                    <span className="font-medium text-[#94A3B8] flex items-center gap-2"><Lock className="w-4 h-4"/> BOS Moneyline</span>
                    <span className="font-mono text-[#94A3B8]">SUSPENDED</span>
                 </div>
              </div>
           </div>
        </FadeUp>
      </div>
    </section>
  )
}

function Stats() {
  const stats = [
    { value: '<50', unit: 'ms', label: 'Execution Latency' },
    { value: '99.99', unit: '%', label: 'Uptime SLA' },
    { value: '$12M', unit: '+', label: 'Daily Volume' },
    { value: '0', unit: '%', label: 'Hidden Fees' },
  ]
  return (
    <section className="py-12 border-y border-[#334155] bg-[#1E293B]">
      <div className="max-w-7xl mx-auto px-6">
        <StaggerContainer>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div key={i} variants={staggerItem} className="text-center md:text-left">
                <div className="flex items-baseline justify-center md:justify-start gap-1 mb-1">
                   <span className="text-3xl md:text-4xl font-bold font-mono text-[#F8FAFC]">{stat.value}</span>
                   <span className="text-xl font-mono text-[#10B981]">{stat.unit}</span>
                </div>
                <p className="text-sm text-[#94A3B8]">{stat.label}</p>
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
    { icon: Zap, title: 'Instant Execution', desc: 'Zero-latency feel. Our matching engine executes trades the millisecond they are received.' },
    { icon: BarChart3, title: 'Deep Liquidity', desc: 'Aggregated pools ensure your large stakes are matched without slippage.' },
    { icon: Activity, title: 'Live API Access', desc: 'Direct WebSocket feeds for quantitative bettors and algorithmic trading.' },
    { icon: ShieldAlert, title: 'Risk Management', desc: 'Set automated stop-losses and cash-out triggers to protect your bankroll.' }
  ]

  return (
    <section id="features" className="py-24 bg-[#0F172A]">
      <div className="max-w-7xl mx-auto px-6">
        <FadeUp>
          <div className="mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Built for the sharp.</h2>
            <p className="text-[#94A3B8] max-w-xl text-lg">Leave the casual sportsbooks behind. We provide the tools necessary for professional market making.</p>
          </div>
        </FadeUp>

        <StaggerContainer>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
               <motion.div
                 key={i}
                 variants={staggerItem}
                 className="p-6 bg-[#1E293B] border border-[#334155] rounded group hover:border-[#10B981] transition-colors"
               >
                 <div className="w-10 h-10 rounded bg-[#0F172A] border border-[#334155] flex items-center justify-center mb-6 group-hover:bg-[#10B981]/10 transition-colors">
                    <f.icon className="w-5 h-5 text-[#94A3B8] group-hover:text-[#10B981] transition-colors" />
                 </div>
                 <h3 className="font-bold text-lg mb-2">{f.title}</h3>
                 <p className="text-sm text-[#94A3B8] leading-relaxed">{f.desc}</p>
               </motion.div>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  )
}

function UniqueSection() {
  const [stake, setStake] = useState(100)
  const odds = 2.50
  const payout = stake * odds

  return (
    <section id="pro" className="py-24 border-y border-[#334155] bg-[#1E293B]">
      <div className="max-w-7xl mx-auto px-6">
         <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeUp>
               <h2 className="text-4xl md:text-5xl font-bold mb-6">Risk / Reward Slider</h2>
               <p className="text-[#94A3B8] mb-8 text-lg">
                  Visualize your exposure instantly. Our dual-axis slider feels heavy to move, emphasizing the weight of your financial decisions.
               </p>
               <div className="flex gap-4 text-sm font-mono text-[#94A3B8]">
                 <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#10B981]"></span> Green: Payout</span>
                 <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#F43F5E]"></span> Red: Liability</span>
               </div>
            </FadeUp>

            <FadeUp delay={0.2}>
               <div className="bg-[#0F172A] p-8 rounded-xl border border-[#334155]">
                  <div className="flex justify-between mb-8 font-mono">
                     <div>
                        <p className="text-[#94A3B8] text-sm mb-1">STAKE</p>
                        <p className="text-2xl font-bold">${stake.toFixed(2)}</p>
                     </div>
                     <div className="text-right">
                        <p className="text-[#94A3B8] text-sm mb-1">PAYOUT</p>
                        <motion.p
                          key={payout}
                          initial={{ y: -10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1, color: tokens.accent1 }}
                          transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                          className="text-2xl font-bold"
                        >
                          ${payout.toFixed(2)}
                        </motion.p>
                     </div>
                  </div>

                  <div className="relative h-2 bg-[#334155] rounded-full mb-8">
                     <motion.div
                        className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-[#F43F5E] to-[#10B981] rounded-full"
                        style={{ width: `${Math.min(100, stake / 10)}%` }}
                        layout
                     />
                     <input
                        type="range"
                        min="10" max="1000" step="10"
                        value={stake}
                        onChange={(e) => setStake(Number(e.target.value))}
                        className="absolute inset-0 w-full opacity-0 cursor-ew-resize"
                     />
                     {/* Custom Thumb */}
                     <motion.div
                       className="absolute top-1/2 -mt-3 w-6 h-6 bg-white rounded-full shadow cursor-grab active:cursor-grabbing border-2 border-[#1E293B]"
                       style={{ left: `calc(${Math.min(100, stake / 10)}% - 12px)` }}
                       whileHover={{ scale: 1.1 }}
                       whileTap={{ scale: 0.9 }}
                     />
                  </div>

                  <button className="w-full py-4 bg-[#1E293B] hover:bg-[#334155] border border-[#334155] rounded font-bold font-mono transition-colors">
                     PLACE ORDER
                  </button>
               </div>
            </FadeUp>
         </div>
      </div>
    </section>
  )
}

function ProductDetail() {
  return (
    <section className="py-24 bg-[#0F172A]">
      <div className="max-w-4xl mx-auto px-6 text-center">
         <FadeUp>
           <Globe className="w-12 h-12 text-[#10B981] mx-auto mb-6" />
           <h2 className="text-3xl md:text-4xl font-bold mb-6">Global Liquidity Pool</h2>
           <p className="text-lg text-[#94A3B8] leading-relaxed">
              We aggregate odds from the world&apos;s sharpest bookmakers and betting exchanges, presenting them in a single, unified interface. Get matched instantly at the best available price without managing multiple accounts.
           </p>
         </FadeUp>
      </div>
    </section>
  )
}

function Pricing() {
  return (
    <section className="py-24 bg-[#1E293B] border-y border-[#334155]">
      <div className="max-w-3xl mx-auto px-6 text-center">
         <FadeUp>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Flat 2% Commission.</h2>
            <p className="text-lg text-[#94A3B8] mb-10">We only win when you win. Commission is charged strictly on net market profits.</p>

            <div className="grid sm:grid-cols-2 gap-6 text-left">
               <div className="p-6 bg-[#0F172A] rounded border border-[#334155]">
                  <h3 className="font-bold mb-2">Standard Bookmaker</h3>
                  <p className="font-mono text-[#F43F5E] text-2xl mb-4">~5-8% Margin</p>
                  <p className="text-sm text-[#94A3B8]">Hidden in the odds. You lose value on every bet placed, win or lose.</p>
               </div>
               <div className="p-6 bg-[#0F172A] rounded border border-[#10B981] relative">
                  <div className="absolute top-0 right-0 bg-[#10B981] text-[#0F172A] text-xs font-bold px-2 py-1 rounded-bl">BETEDGE</div>
                  <h3 className="font-bold mb-2">Exchange Model</h3>
                  <p className="font-mono text-[#10B981] text-2xl mb-4">2.0% Flat</p>
                  <p className="text-sm text-[#94A3B8]">Transparent. Only applied to net winnings on a market.</p>
               </div>
            </div>
         </FadeUp>
      </div>
    </section>
  )
}

function Testimonials() {
  return (
    <section className="py-24 bg-[#0F172A]">
      <div className="max-w-7xl mx-auto px-6">
         <FadeUp>
            <h2 className="text-3xl font-bold mb-12 text-center">Trusted by Syndicates</h2>
         </FadeUp>
         <StaggerContainer>
            <div className="grid md:grid-cols-3 gap-6">
               {[1,2,3].map((i) => (
                  <motion.div key={i} variants={staggerItem} className="p-6 border border-[#334155] rounded bg-[#1E293B]">
                     <p className="text-[#94A3B8] mb-6 text-sm">&quot;The API stability is unmatched. We execute thousands of micro-bets daily and latency is consistently under 50ms. It&apos;s the only platform we trust for high-frequency strategies.&quot;</p>
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded bg-[#0F172A] border border-[#334155]" />
                        <div>
                           <p className="font-bold text-sm">Quant_Fund_{i}</p>
                           <p className="text-xs text-[#94A3B8] font-mono">API VOLUME: TIER 1</p>
                        </div>
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
    { q: 'How are funds secured?', a: 'All client funds are held in ring-fenced accounts at Tier-1 banks, completely separate from operational capital.' },
    { q: 'Is there an API rate limit?', a: 'Standard accounts have a 10 req/s limit. Institutional accounts have dedicated endpoints with no hard limits.' },
    { q: 'Can I use a VPN?', a: 'For security and compliance reasons, VPN usage is restricted. Account verification is required before API access.' }
  ]
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="py-24 bg-[#1E293B] border-y border-[#334155]">
      <div className="max-w-3xl mx-auto px-6">
        <FadeUp>
          <h2 className="text-3xl font-bold mb-10">Documentation / FAQ</h2>
        </FadeUp>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div key={i} className="border border-[#334155] bg-[#0F172A] rounded">
              <button
                className="w-full px-6 py-4 text-left font-bold text-sm flex justify-between items-center"
                onClick={() => setOpen(open === i ? null : i)}
              >
                {faq.q}
                <ChevronDown className={`w-4 h-4 text-[#94A3B8] transition-transform ${open === i ? 'rotate-180' : ''}`} />
              </button>
              <motion.div
                initial={false}
                animate={{ height: open === i ? 'auto' : 0, opacity: open === i ? 1 : 0 }}
                className="overflow-hidden"
              >
                <p className="px-6 pb-4 text-sm text-[#94A3B8]">{faq.a}</p>
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
    <section className="py-24 bg-[#0F172A] text-center">
      <div className="max-w-xl mx-auto px-6">
        <FadeUp>
          <h2 className="text-3xl font-bold mb-4">Get the Edge</h2>
          <p className="text-[#94A3B8] mb-8">Subscribe for weekly market insights, API updates, and liquidity alerts.</p>
          <div className="flex gap-2">
             <input type="email" placeholder="EMAIL ADDRESS" className="flex-1 bg-[#1E293B] border border-[#334155] rounded px-4 py-3 font-mono text-sm focus:outline-none focus:border-[#10B981]" />
             <button className="bg-[#10B981] text-[#0F172A] font-bold px-6 py-3 rounded text-sm hover:bg-[#0ea371] transition-colors">SUBSCRIBE</button>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="py-8 bg-[#0F172A] border-t border-[#334155]">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#94A3B8] font-mono">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-[#10B981]" /> BETEDGE CORP 2026
        </div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">API DOCS</a>
          <a href="#" className="hover:text-white transition-colors">TERMS</a>
          <a href="#" className="hover:text-white transition-colors">RESPONSIBLE GAMING</a>
        </div>
      </div>
    </footer>
  )
}
