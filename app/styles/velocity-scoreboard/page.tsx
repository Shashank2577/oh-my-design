'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { 
  Zap, 
  Trophy, 
  Users, 
  Activity, 
  BarChart3, 
  Shield, 
  ChevronDown, 
  Mail, 
  ArrowRight,
  TrendingUp,
  Clock,
  Globe
} from 'lucide-react'
import { Bebas_Neue, Inter, JetBrains_Mono } from 'next/font/google'

const bebas = Bebas_Neue({ weight: '400', subsets: ['latin'] })
const inter = Inter({ subsets: ['latin'] })
const mono = JetBrains_Mono({ subsets: ['latin'] })

// --- Design Tokens ---
const tokens = {
  colors: {
    background: "#050505",
    surface: "#121212",
    accent1: "#CCFF00", // Electric Volt
    accent2: "#FF3D00", // Redline
    border: "#1A1A1A",
    glass: "rgba(255, 255, 255, 0.05)",
    textHigh: "#FFFFFF",
    textLow: "#757575"
  },
  physics: {
    primary: { type: "spring", stiffness: 500, damping: 15, mass: 1 },
    stable: { type: "spring", stiffness: 400, damping: 25 }
  }
}

// --- Components ---

const VelocityButton = ({ children, variant = 'primary', className = '' }: any) => (
  <motion.button
    whileHover={{ scale: 1.05, boxShadow: `0 0 20px ${variant === 'primary' ? tokens.colors.accent1 : 'rgba(255,255,255,0.1)'}` }}
    whileTap={{ scale: 0.95 }}
    className={`px-8 py-4 ${bebas.className} text-xl tracking-wider transition-all duration-150 relative overflow-hidden group ${
      variant === 'primary' 
        ? `bg-[${tokens.colors.accent1}] text-black border-l-4 border-[${tokens.colors.accent1}]` 
        : `bg-transparent text-white border border-[${tokens.colors.border}] border-l-4 border-white`
    } ${className}`}
    style={{ 
      backgroundColor: variant === 'primary' ? tokens.colors.accent1 : 'transparent',
      borderLeftColor: variant === 'primary' ? tokens.colors.accent1 : '#FFFFFF'
    }}
  >
    <span className="relative z-10 flex items-center gap-2">{children}</span>
    <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
  </motion.button>
)

const GlassCard = ({ children, className = '' }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ z: 50, rotateX: 2, rotateY: -2, scale: 1.02 }}
    className={`bg-[${tokens.colors.surface}] border border-[${tokens.colors.border}] backdrop-blur-xl p-8 relative overflow-hidden group ${className}`}
    style={{ backgroundColor: tokens.colors.surface, borderColor: tokens.colors.border }}
  >
    <div className="absolute top-0 left-0 w-1 h-full bg-[#CCFF00] scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />
    {children}
  </motion.div>
)

// --- Sections ---

const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 border-b border-[#1A1A1A] bg-black/80 backdrop-blur-md px-6 py-4">
    <div className="max-w-7xl mx-auto flex items-center justify-between">
      <div className={`flex items-center gap-2 ${bebas.className} text-3xl italic tracking-tighter`}>
        <Zap className="text-[#CCFF00] fill-[#CCFF00]" />
        VELOCITY<span className="text-[#CCFF00]">SCORE</span>
      </div>
      <div className="hidden md:flex items-center gap-8 text-[#757575] font-medium uppercase text-xs tracking-widest">
        {['Live Matches', 'Analysis', 'Players', 'Leagues'].map(item => (
          <a key={item} href="#" className="hover:text-[#CCFF00] transition-colors">{item}</a>
        ))}
      </div>
      <VelocityButton className="hidden md:block py-2 text-sm">LAUNCH HUD</VelocityButton>
    </div>
  </nav>
)

const Hero = () => (
  <section className="pt-32 pb-20 px-6 relative overflow-hidden min-h-screen flex items-center">
    <div className="absolute inset-0 z-0 opacity-20">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_#CCFF0022_0%,_transparent_70%)]" />
    </div>
    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={tokens.physics.primary as any}
      >
        <motion.div 
          initial={{ filter: 'blur(10px)' }}
          animate={{ filter: 'blur(0px)' }}
          className={`inline-block mb-4 px-3 py-1 bg-[#CCFF00] text-black ${bebas.className} text-lg`}
        >
          LIVE DATA STREAM ACTIVE
        </motion.div>
        <h1 className={`${bebas.className} text-7xl md:text-9xl text-white leading-[0.9] mb-6`}>
          OWN THE <span className="text-[#CCFF00]">MOMENTUM.</span>
        </h1>
        <p className="text-[#757575] text-lg max-w-xl mb-10 leading-relaxed">
          The world's most intense sports data engine. Real-time physics-based analytics for high-stakes decisions. Mission Control starts here.
        </p>
        <div className="flex flex-wrap gap-4">
          <VelocityButton>GET REAL-TIME FEED</VelocityButton>
          <VelocityButton variant="secondary">VIEW MATCH ENGINE</VelocityButton>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, filter: 'blur(20px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ ...(tokens.physics.primary as any), delay: 0.2 }}
        className="relative"
      >
        <div className="aspect-square bg-gradient-to-br from-[#CCFF00] to-[#FF3D00] rounded-full blur-[100px] opacity-20 absolute inset-0 animate-pulse" />
        <div className="relative border border-[#1A1A1A] bg-[#121212]/50 backdrop-blur-3xl p-4 rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between mb-8 p-4 border-b border-[#1A1A1A]">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded bg-white/10 animate-pulse" />
              <div className={`${bebas.className} text-2xl`}>LIV vs MCI</div>
            </div>
            <div className={`${mono.className} text-[#CCFF00] text-xl`}>84' : 12\"</div>
          </div>
          <div className="h-64 flex items-end gap-1 px-4 pb-4">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${Math.random() * 80 + 20}%` }}
                transition={{ repeat: Infinity, duration: 2, repeatType: 'mirror', delay: i * 0.1 }}
                className={`flex-1 ${i % 3 === 0 ? 'bg-[#FF3D00]' : 'bg-[#CCFF00]'}`}
              />
            ))}
          </div>
          <div className={`p-4 ${bebas.className} text-center text-[#CCFF00] text-xl border-t border-[#1A1A1A]`}>
            MOMENTUM SWING: +24% (LIV)
          </div>
        </div>
      </motion.div>
    </div>
  </section>
)

const StatsBar = () => (
  <section className="py-12 border-y border-[#1A1A1A] bg-black">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {[
          { label: 'Live Events', value: '1.2M+', icon: Zap },
          { label: 'Data Accuracy', value: '99.9%', icon: Shield },
          { label: 'Active Users', value: '450K', icon: Users },
          { label: 'Avg Latency', value: '4.2ms', icon: Clock }
        ].map((stat, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -5 }}
            className="flex flex-col items-center text-center"
          >
            <stat.icon className="text-[#CCFF00] mb-2" size={24} />
            <div className={`${bebas.className} text-4xl text-white`}>{stat.value}</div>
            <div className="text-[#757575] text-xs uppercase tracking-widest">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)

const Features = () => (
  <section className="py-24 px-6">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <h2 className={`${bebas.className} text-6xl text-white mb-4`}>CORE ENGINE FEATURES</h2>
          <p className="text-[#757575] max-w-xl">Harness the power of physics-based sports intelligence. Velocity provides sub-millisecond updates for professional analysis.</p>
        </div>
        <VelocityButton variant="secondary" className="md:mb-2">EXPLORE FULL TECH</VelocityButton>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {[
          { title: 'Momentum Graph', desc: 'Real-time undulation analytics showing live pressure shifts across the field.', icon: Activity },
          { title: 'Tachometer HUD', desc: 'Circular RPM-style gauges for match progress and player stamina tracking.', icon: TrendingUp },
          { title: 'Redline Alerts', desc: 'Sub-second notifications for high-impact events like goals, cards, and DRS.', icon: Zap },
          { title: 'Global Sync', desc: 'Synchronized data streaming across 120+ leagues with zero drift architecture.', icon: Globe },
          { title: 'Predictive Load', desc: 'AI-driven outcome probability mapping based on the last 5 minutes of play.', icon: BarChart3 },
          { title: 'Onyx Security', desc: 'Enterprise-grade encryption for proprietary scouting and strategy data.', icon: Shield }
        ].map((feature, i) => (
          <GlassCard key={i}>
            <feature.icon className="text-[#CCFF00] mb-6" size={32} />
            <h3 className={`${bebas.className} text-3xl text-white mb-3`}>{feature.title}</h3>
            <p className="text-[#757575] text-sm leading-relaxed">{feature.desc}</p>
          </GlassCard>
        ))}
      </div>
    </div>
  </section>
)

const ProductDetail = () => (
  <section className="py-24 px-6 bg-[#080808]">
    <div className="max-w-4xl mx-auto">
      <div className="relative border border-[#1A1A1A] p-12 overflow-hidden">
        <div className="absolute top-0 right-0 p-8">
          <Zap className="text-[#CCFF00]/10" size={200} />
        </div>
        <div className={`mb-8 ${mono.className} text-[#CCFF00] text-sm tracking-widest`}>[ SYSTEM_SPECIFICATIONS ]</div>
        <h2 className={`${bebas.className} text-6xl text-white mb-8 leading-tight`}>A MISSION CONTROL BUILT FOR THE <span className="text-[#FF3D00]">ULTRA-FAST</span>.</h2>
        <div className="space-y-6 text-[#757575] text-lg leading-relaxed">
          <p>Velocity Scoreboard is more than a dashboard. It is a biological extension of the match itself. Every jump in momentum, every redline shift in pressure, is captured by our proprietary engine and delivered with 4.2ms latency.</p>
          <p>We believe that in the highest levels of competition, data shouldn't just be read—it should be felt. Our beveled interface and speed-blur transitions are designed to keep your focus sharp and your instincts primed.</p>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-8">
          <div className="border-l border-[#CCFF00] pl-6">
            <div className={`${bebas.className} text-3xl text-white`}>4.2MS</div>
            <div className="text-xs text-[#757575] uppercase tracking-widest">Global Latency</div>
          </div>
          <div className="border-l border-[#FF3D00] pl-6">
            <div className={`${bebas.className} text-3xl text-white`}>120+</div>
            <div className="text-xs text-[#757575] uppercase tracking-widest">Leagues Tracked</div>
          </div>
        </div>
      </div>
    </div>
  </section>
)

const Pricing = () => (
  <section className="py-24 px-6">
    <div className="max-w-7xl mx-auto">
      <h2 className={`${bebas.className} text-6xl text-white mb-16 text-center`}>LICENSING TIERS</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {[
          { name: 'Scout', price: '$0', features: ['3 Live Leagues', 'Basic Momentum', 'Mobile App', 'Standard HUD'] },
          { name: 'Analyst', price: '$29', features: ['All Live Leagues', 'Advanced Heatmaps', 'Predictive Engine', 'Custom HUD', 'API Access'], highlight: true },
          { name: 'Elite', price: '$99', features: ['Private Server', 'White-labeling', 'Human Support', 'Sub-1ms Latency', 'Proprietary Filters'] }
        ].map((tier, i) => (
          <GlassCard key={i} className={tier.highlight ? 'border-[#CCFF00] ring-1 ring-[#CCFF00]/30' : ''}>
            {tier.highlight && (
              <div className={`absolute top-0 right-0 bg-[#CCFF00] text-black px-4 py-1 ${bebas.className} text-sm`}>
                MOST POPULAR
              </div>
            )}
            <div className={`${bebas.className} text-2xl text-[#757575] mb-2`}>{tier.name}</div>
            <div className="flex items-baseline gap-2 mb-8">
              <span className={`${bebas.className} text-6xl text-white`}>{tier.price}</span>
              <span className="text-[#757575] text-sm">/ MONTH</span>
            </div>
            <ul className="space-y-4 mb-10">
              {tier.features.map(f => (
                <li key={f} className="flex items-center gap-3 text-sm text-[#757575]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#CCFF00]" />
                  {f}
                </li>
              ))}
            </ul>
            <VelocityButton className="w-full" variant={tier.highlight ? 'primary' : 'secondary'}>SELECT TIER</VelocityButton>
          </GlassCard>
        ))}
      </div>
    </div>
  </section>
)

const Testimonials = () => (
  <section className="py-24 px-6 bg-[#080808]">
    <div className="max-w-7xl mx-auto">
      <h2 className={`${bebas.className} text-6xl text-white mb-16`}>TRUSTED BY PROS</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {[
          { name: 'Marcus Chen', role: 'Head Analyst', company: 'Apex eSports', quote: 'Velocity is the first HUD that actually keeps up with my thought process. The speed-blur transitions are genius.' },
          { name: 'Elena Rodriguez', role: 'General Manager', company: 'Madrid United', quote: 'The momentum graph changed how we scout players. We can see high-pressure performance in a way stats alone never showed.' },
          { name: 'Satoshi Tanaka', role: 'CTO', company: 'Global Score', quote: 'Integration was seamless. Their 4.2ms latency claim is the real deal. Our users have never been happier.' }
        ].map((t, i) => (
          <GlassCard key={i}>
            <div className="flex gap-1 mb-6">
              {[...Array(5)].map((_, j) => (
                <Zap key={j} size={16} className="text-[#CCFF00] fill-[#CCFF00]" />
              ))}
            </div>
            <p className="text-white text-lg italic mb-8 leading-relaxed">"{t.quote}"</p>
            <div>
              <div className={`${bebas.className} text-2xl text-white`}>{t.name}</div>
              <div className="text-xs text-[#CCFF00] uppercase tracking-widest">{t.role} | {t.company}</div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  </section>
)

const FAQ = () => {
  const [open, setOpen] = useState(0)
  return (
    <section className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className={`${bebas.className} text-6xl text-white mb-12 text-center`}>SYSTEM FAQ</h2>
        <div className="space-y-4">
          {[
            { q: 'How is momentum calculated?', a: 'Our engine processes over 150 live data points including possession, position, intensity, and historical pressure to generate a live undulation graph.' },
            { q: 'What is Redline technology?', a: 'Redline is our sub-second notification protocol that ensures you receive match-critical updates before they appear on any broadcast.' },
            { q: 'Can I customize the HUD?', a: 'Yes. Analyst and Elite tiers allow full UI customization, including color mapping, data density, and animation physics settings.' },
            { q: 'Does it work with eSports?', a: 'Absolutely. We support CS2, Dota 2, and League of Legends with specialized HUDs for kill-feeds and gold momentum.' },
            { q: 'Is there a mobile version?', a: 'Yes, our mobile app features the same beveled design and tactile feedback optimized for touch surfaces.' },
            { q: 'How secure is my data?', a: 'All account data is encrypted with Onyx-grade 256-bit protocols, used by some of the worlds leading financial institutions.' }
          ].map((item, i) => (
            <div key={i} className={`border border-[${tokens.colors.border}] bg-[#121212] overflow-hidden transition-all duration-300 ${open === i ? 'ring-1 ring-[#CCFF00]/50' : ''}`}>
              <button 
                onClick={() => setOpen(open === i ? -1 : i)}
                className="w-full p-6 flex items-center justify-between text-left"
              >
                <span className={`${bebas.className} text-2xl text-white`}>{item.q}</span>
                <ChevronDown className={`text-[#CCFF00] transition-transform ${open === i ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-6 pb-6 text-[#757575] text-sm"
                  >
                    {item.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const Newsletter = () => (
  <section className="py-24 px-6 border-y border-[#1A1A1A]">
    <div className="max-w-4xl mx-auto text-center">
      <div className={`inline-block mb-6 px-4 py-1 border border-[#CCFF00] text-[#CCFF00] ${mono.className} text-xs`}>
        [ CONNECTION_ESTABLISHED ]
      </div>
      <h2 className={`${bebas.className} text-7xl text-white mb-6`}>STAY REDLINED.</h2>
      <p className="text-[#757575] mb-10 max-w-xl mx-auto">Join 450,000+ analysts receiving daily momentum shifts and tactical deep-dives directly to their inbox.</p>
      <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
        <input 
          type="email" 
          placeholder="ENTER_EMAIL_ADDR" 
          className={`flex-1 bg-[#121212] border border-[#1A1A1A] px-6 py-4 text-white focus:outline-none focus:border-[#CCFF00] transition-colors ${mono.className}`}
        />
        <VelocityButton>SUBSCRIBE</VelocityButton>
      </div>
    </div>
  </section>
)

const Footer = () => (
  <footer className="py-20 px-6 bg-black">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-16">
        <div className="col-span-2">
          <div className={`${bebas.className} text-3xl italic mb-6`}>
            VELOCITY<span className="text-[#CCFF00]">SCORE</span>
          </div>
          <p className="text-[#757575] text-sm max-w-xs leading-relaxed">The global standard for live sports momentum analytics. Speed-focused, physics-driven, and built for elite decision making.</p>
        </div>
        {[
          { title: 'Product', links: ['HUD Engine', 'API Docs', 'Leagues', 'Pricing'] },
          { title: 'Company', links: ['About', 'Scouting', 'Careers', 'Brand'] },
          { title: 'Legal', links: ['Privacy', 'Terms', 'Security', 'Onyx-Ref'] }
        ].map(group => (
          <div key={group.title}>
            <div className={`${bebas.className} text-xl text-white mb-6`}>{group.title}</div>
            <ul className="space-y-4">
              {group.links.map(link => (
                <li key={link}><a href="#" className="text-[#757575] text-sm hover:text-[#CCFF00] transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="pt-8 border-t border-[#1A1A1A] flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-[#757575] text-xs uppercase tracking-widest">© 2026 VELOCITY SCOREBOARD ENGINE. ALL RIGHTS RESERVED.</div>
        <div className="flex gap-6">
          {['TWITTER', 'GITHUB', 'LINKEDIN'].map(social => (
            <a key={social} href="#" className="text-[#757575] text-xs hover:text-[#CCFF00] transition-colors">{social}</a>
          ))}
        </div>
      </div>
    </div>
  </footer>
)

export default function VelocityScoreboard() {
  return (
    <div className={`min-h-screen bg-[${tokens.colors.background}] text-white overflow-x-hidden ${inter.className}`} style={{ backgroundColor: tokens.colors.background }}>
      <Navbar />
      <Hero />
      <StatsBar />
      <Features />
      <ProductDetail />
      <Pricing />
      <Testimonials />
      <FAQ />
      <Newsletter />
      <Footer />
      
      {/* --- Global Effects --- */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03] contrast-150 mix-blend-overlay">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100" height="100" filter="url(#noise)" />
        </svg>
      </div>
      
      </div>
  )
}
