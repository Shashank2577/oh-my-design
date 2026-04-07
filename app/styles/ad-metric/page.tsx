'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Zap, 
  BarChart3, 
  Activity, 
  Target, 
  Cpu, 
  Shield, 
  ChevronDown, 
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  Clock,
  Globe,
  Monitor,
  Terminal,
  Search,
  Bell
} from 'lucide-react'
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google'

const space = Space_Grotesk({ subsets: ['latin'] })
const inter = Inter({ subsets: ['latin'] })
const mono = JetBrains_Mono({ subsets: ['latin'] })

// --- Design Tokens ---
const tokens = {
  colors: {
    background: "#050505",
    surface: "#121212",
    accent1: "#00FF41", // Matrix Green
    accent2: "#FF073A", // Neon Red
    metric: "#00D1FF", // Info Blue
    border: "#1F1F1F",
    textHigh: "#FFFFFF",
    textLow: "#757575"
  },
  physics: {
    ping: { scale: [1, 1.2, 1], filter: ["brightness(1)", "brightness(2)", "brightness(1)"] },
    snappy: { type: "spring" as any, stiffness: 400, damping: 30 }
  }
}

// --- Components ---

const MetricButton = ({ children, variant = 'primary', className = '' }: any) => (
  <motion.button
    whileHover={{ scale: 1.02, backgroundColor: variant === 'primary' ? '#00FF41' : '#1A1A1A' }}
    whileTap={{ scale: 0.98 }}
    className={`px-6 py-3 ${space.className} text-xs font-bold tracking-widest relative group overflow-hidden border ${
      variant === 'primary' 
        ? `bg-[#00FF41] text-black border-[#00FF41]` 
        : `bg-transparent text-white border-[#1F1F1F]`
    } ${className}`}
  >
    <span className="relative z-10 flex items-center justify-center gap-2 uppercase">{children}</span>
    <div className="absolute top-0 left-0 w-1 h-1 bg-white opacity-50 m-1" />
  </motion.button>
)

const TacticalCard = ({ children, title = '', value = '', trend = 0, className = '' }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={`bg-[#121212] border border-[#1F1F1F] p-6 relative group overflow-hidden ${className}`}
  >
    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
      <Monitor size={60} strokeWidth={1} />
    </div>
    <div className="flex justify-between items-start mb-4">
      <div className="text-[10px] font-black text-[#757575] uppercase tracking-widest">{title}</div>
      {trend !== 0 && (
        <div className={`flex items-center gap-1 text-[10px] font-bold ${trend > 0 ? 'text-[#00FF41]' : 'text-[#FF073A]'}`}>
          {trend > 0 ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
          {Math.abs(trend)}%
        </div>
      )}
    </div>
    <div className={`${mono.className} text-3xl font-bold text-white mb-2`}>{value}</div>
    <div className="h-1 w-full bg-[#1F1F1F] rounded-full overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        whileInView={{ width: '70%' }}
        transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
        className={`h-full ${trend > 0 ? 'bg-[#00FF41]' : 'bg-[#00D1FF]'}`}
      />
    </div>
    {children}
  </motion.div>
)

// --- Sections ---

const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 border-b border-[#1F1F1F] bg-black/90 backdrop-blur-xl px-6 py-4">
    <div className="max-w-7xl mx-auto flex items-center justify-between">
      <div className={`flex items-center gap-2 ${space.className} text-xl font-black tracking-tighter`}>
        <Activity className="text-[#00FF41]" size={24} />
        AD<span className="text-[#00D1FF]">METRIC</span>
        <div className="ml-2 px-2 py-0.5 bg-[#00FF41]/10 text-[#00FF41] text-[8px] font-bold border border-[#00FF41]/20">LIVE_V3</div>
      </div>
      <div className="hidden md:flex items-center gap-8 text-[#757575] font-bold text-[10px] tracking-[0.3em] uppercase">
        {['Campaigns', 'Real-Time', 'Inventory', 'Nodes'].map(item => (
          <a key={item} href="#" className="hover:text-[#00FF41] transition-colors">{item}</a>
        ))}
      </div>
      <div className="flex items-center gap-6">
        <Bell size={18} className="text-[#757575] hover:text-white cursor-pointer" />
        <MetricButton className="py-2 text-[10px]">AUTH_TERMINAL</MetricButton>
      </div>
    </div>
  </nav>
)

const Hero = () => {
  const [bids, setBids] = useState<any[]>([])
  
  useEffect(() => {
    const interval = setInterval(() => {
      const newBid = {
        id: Math.random().toString(36).substr(2, 9),
        val: (Math.random() * 5).toFixed(2),
        status: Math.random() > 0.3 ? 'WON' : 'LOST'
      }
      setBids(prev => [newBid, ...prev].slice(0, 5))
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="pt-32 pb-20 px-6 relative overflow-hidden min-h-screen flex items-center">
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="w-full h-full bg-[linear-gradient(#1F1F1F_1px,transparent_1px),linear-gradient(90deg,#1F1F1F_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>
      
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={tokens.physics.snappy}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-2 h-2 bg-[#00FF41] rounded-full animate-pulse shadow-[0_0_10px_#00FF41]" />
            <span className={`text-[10px] font-black text-[#00FF41] tracking-[0.4em] uppercase ${mono.className}`}>SYSTEM_LOAD_STABLE</span>
          </div>
          <h1 className={`${space.className} text-7xl md:text-8xl font-black text-white leading-[0.9] mb-8 uppercase italic`}>
            PRECISION <br/> <span className="text-[#00D1FF] drop-shadow-[0_0_20px_#00D1FF]">PERFORMANCE.</span>
          </h1>
          <p className={`text-[#757575] text-lg max-w-xl mb-12 leading-relaxed ${inter.className}`}>
            AdMetric is the high-frequency command deck for modern digital inventory. Track conversions, bids, and ROI with sub-millisecond precision.
          </p>
          <div className="flex flex-wrap gap-6">
            <MetricButton>LAUNCH_DASHBOARD</MetricButton>
            <MetricButton variant="secondary">API_DOCUMENTATION</MetricButton>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...tokens.physics.snappy, delay: 0.2 }}
          className="relative"
        >
          <div className="bg-[#121212] border border-[#1F1F1F] p-1 rounded-sm shadow-2xl overflow-hidden group">
            <div className="bg-[#1A1A1A] p-4 flex items-center justify-between border-b border-[#1F1F1F]">
              <div className="flex items-center gap-2">
                <Terminal size={14} className="text-[#00D1FF]" />
                <span className={`${mono.className} text-[10px] text-white font-bold`}>LIVE_BID_STREAM</span>
              </div>
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-[#FF073A]/20" />
                <div className="w-2 h-2 rounded-full bg-[#00FF41]/20" />
              </div>
            </div>
            <div className="p-6 space-y-4 h-80 overflow-hidden relative">
              <AnimatePresence mode="popLayout">
                {bids.map((bid) => (
                  <motion.div
                    key={bid.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex items-center justify-between p-3 border border-[#1F1F1F] bg-black/40"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`${mono.className} text-[10px] text-[#757575]`}>{bid.id}</div>
                      <div className={`${mono.className} text-xs font-bold text-white`}>$ {bid.val}</div>
                    </div>
                    <div className={`px-2 py-0.5 rounded-sm ${mono.className} text-[8px] font-black ${bid.status === 'WON' ? 'bg-[#00FF41]/10 text-[#00FF41]' : 'bg-[#FF073A]/10 text-[#FF073A]'}`}>
                      {bid.status}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-[#121212] to-transparent" />
            </div>
            <div className="p-4 bg-black/20 flex items-center justify-between border-t border-[#1F1F1F]">
              <div className={`${mono.className} text-[10px] text-[#00FF41]`}>ACTIVE_NODES: 1,402</div>
              <div className={`${mono.className} text-[10px] text-[#00D1FF]`}>LATENCY: 4.2ms</div>
            </div>
          </div>
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#00FF41]/10 rounded-full blur-[80px] animate-pulse" />
        </motion.div>
      </div>
    </section>
  )
}

const StatsGrid = () => (
  <section className="py-12 px-6 bg-black">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <TacticalCard title="Real-time Impressions" value="1.24M" trend={12.4} />
        <TacticalCard title="Global CTR" value="4.82%" trend={-2.1} />
        <TacticalCard title="Bid Win Rate" value="94.2%" trend={5.7} />
        <TacticalCard title="Daily ROI" value="3.4X" trend={18.9} />
      </div>
    </div>
  </section>
)

const Features = () => (
  <section className="py-24 px-6">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
        <div>
          <h2 className={`${space.className} text-5xl md:text-6xl font-black text-white mb-4 uppercase italic`}>TACTICAL_MODULES</h2>
          <p className={`text-[#757575] max-w-xl ${inter.className}`}>Deploy high-frequency infrastructure for competitive advertising environments.</p>
        </div>
        <MetricButton variant="secondary" className="md:mb-2 text-[10px]">ALL_SYSTEMS_VIEW</MetricButton>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {[
          { title: 'Momentum Analysis', desc: 'Real-time undulation analytics showing live pressure shifts across digital inventory.', icon: Activity },
          { title: 'Winning Node Graph', desc: 'Visual network representation of successful bid paths and conversion clusters.', icon: Cpu },
          { title: 'ROI Performance Radar', desc: 'Circular sweep visualization highlighting top-performing campaign blips.', icon: Target },
          { title: 'Protocol Security', desc: 'Onyx-grade 256-bit encryption for proprietary scouting and strategy data.', icon: Shield },
          { title: 'Sub-ms Telemetry', desc: 'Synchronized data streaming across 120+ exchanges with zero drift architecture.', icon: Zap },
          { title: 'Predictive Load', desc: 'AI-driven outcome probability mapping based on the last 5 minutes of flow.', icon: BarChart3 }
        ].map((feature, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -5 }}
            className="bg-[#121212] border border-[#1F1F1F] p-8 relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-[#00D1FF] scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />
            <feature.icon className="text-[#00D1FF] mb-6" size={32} />
            <h3 className={`${space.className} text-xl font-bold text-white mb-3 uppercase tracking-tighter italic`}>{feature.title}</h3>
            <p className={`text-[#757575] text-xs leading-relaxed ${inter.className}`}>{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)

const ProductDetail = () => (
  <section className="py-24 px-6 relative bg-[#080808]">
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-20 items-center">
        <div className="order-2 lg:order-1 relative">
           <div className="aspect-video bg-black border border-[#1F1F1F] p-4 relative overflow-hidden group">
              <div className="absolute inset-0 bg-[#00FF41]/5 group-hover:opacity-100 opacity-0 transition-opacity" />
              <div className="absolute top-4 left-4 ${mono.className} text-[8px] text-[#00FF41]">SYSTEM_SCHEMA_V3.0</div>
              <div className="w-full h-full flex items-center justify-center">
                 <Cpu className="text-[#00FF41]/20 animate-spin-slow" size={120} />
              </div>
              <motion.div 
                animate={{ y: [0, 200, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: [0, 0, 1, 1] }}
                className="absolute top-0 left-0 w-full h-0.5 bg-[#00FF41] shadow-[0_0_15px_#00FF41]"
              />
           </div>
        </div>
        <div className="order-1 lg:order-2">
          <div className={`${mono.className} text-[#00FF41] text-[10px] tracking-[0.5em] font-bold mb-6 uppercase`}>[ CORE_ARCHITECTURE ]</div>
          <h2 className={`${space.className} text-5xl md:text-6xl font-black text-white mb-8 italic uppercase leading-[0.9]`}>DATA IS THE <br/><span className="text-[#00D1FF]">REVOLUTION.</span></h2>
          <div className={`space-y-6 text-[#757575] text-lg leading-relaxed ${inter.className}`}>
            <p>AdMetric is not just a tool; it is a tactical advantage. Built on a zero-latency sync architecture, it ensures your campaigns are always ahead of the market curve.</p>
            <p>Every impression is analyzed, every bid is tracked, and every conversion is celebrated with precision-grade visual feedback.</p>
          </div>
          <MetricButton className="mt-12">INITIALIZE_NODE</MetricButton>
        </div>
      </div>
    </div>
  </section>
)

const Pricing = () => (
  <section className="py-24 px-6">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <h2 className={`${space.className} text-5xl font-black text-white mb-4 italic uppercase`}>LICENSE_PROTOCOLS</h2>
        <p className={`text-[#757575] ${inter.className}`}>Choose your level of operational integration.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {[
          { name: 'Terminal', price: '$0', features: ['3 Active Campaigns', 'Standard HUD', 'Basic Analytics', 'Public API'] },
          { name: 'Command', price: '$49', features: ['Unlimited Campaigns', 'Heatmap Access', 'Predictive Engine', 'Private API', 'Priority Sync'], highlight: true },
          { name: 'Mainframe', price: '$199', features: ['White-label HUD', 'Full Source Access', 'Dedicated Edge Node', '24/7 Tech Support', 'Quantum Ready'] }
        ].map((tier, i) => (
          <motion.div 
            key={i} 
            whileHover={{ y: -10 }}
            className={`bg-[#121212] border p-10 relative overflow-hidden flex flex-col h-full ${tier.highlight ? 'border-[#00D1FF] shadow-[0_0_30px_rgba(0,209,255,0.1)]' : 'border-[#1F1F1F]'}`}
          >
            {tier.highlight && (
              <div className="absolute top-0 right-0 bg-[#00D1FF] text-black px-4 py-1 ${space.className} text-[8px] font-black uppercase tracking-widest">
                RECOMMENDED
              </div>
            )}
            <div className={`${space.className} text-2xl font-black text-white mb-2 uppercase italic`}>{tier.name}</div>
            <div className="flex items-baseline gap-2 mb-10">
              <span className={`${space.className} text-6xl font-black text-white`}>{tier.price}</span>
              <span className={`${mono.className} text-[10px] text-[#757575]`}>/ CYCLE</span>
            </div>
            <ul className="space-y-5 mb-12 flex-1">
              {tier.features.map(f => (
                <li key={f} className="flex items-center gap-3 text-[10px] text-[#757575] font-bold uppercase tracking-widest">
                  <div className="w-1.5 h-1.5 bg-[#00D1FF]" />
                  {f}
                </li>
              ))}
            </ul>
            <MetricButton className="w-full" variant={tier.highlight ? 'primary' : 'secondary'}>SELECT_PROTOCOL</MetricButton>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)

const Testimonials = () => (
  <section className="py-24 px-6 relative bg-black/40 border-y border-[#1F1F1F]">
    <div className="max-w-7xl mx-auto">
      <h2 className={`${space.className} text-5xl font-black text-white mb-20 italic uppercase`}>COMMS_LOGS</h2>
      <div className="grid md:grid-cols-3 gap-12">
        {[
          { name: 'X_Ghost_X', role: 'Campaign Lead', company: 'Neon Labs', quote: 'The real-time bid stream is addictive. It\'s the first time I feel actually connected to our inventory.' },
          { name: 'Vortex_Manager', role: 'CTO', company: 'Titan Ad-Tech', quote: 'AdMetric simplified our entire reporting stack. The ROI radar is a game changer for morning standups.' },
          { name: 'Code_Runner', role: 'Lead Architect', company: 'StreamStack', quote: 'Integration was 4.2ms of pure joy. Their technical monospaced aesthetic is perfect for dev-first marketing.' }
        ].map((t, i) => (
          <div key={i} className="flex flex-col gap-8">
            <div className="flex gap-1">
              {[...Array(5)].map((_, j) => (
                <div key={j} className="w-2 h-2 bg-[#00FF41] rounded-full" />
              ))}
            </div>
            <p className={`${space.className} text-2xl font-bold text-white leading-tight italic`}>"{t.quote}"</p>
            <div>
              <div className={`${space.className} text-lg font-black text-[#00D1FF] uppercase`}>{t.name}</div>
              <div className={`${mono.className} text-[8px] text-[#757575] font-bold mt-2 uppercase tracking-widest`}>{t.role} // {t.company}</div>
            </div>
          </div>
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
        <h2 className={`${space.className} text-5xl font-black text-white mb-16 text-center italic uppercase`}>TERMINAL_FAQ</h2>
        <div className="space-y-4">
          {[
            { q: 'Is AdMetric GDPR compliant?', a: 'Yes. All data processing occurs on encrypted edge-nodes with full PII masking protocols initialized by default.' },
            { q: 'What is ROI Radar technology?', a: 'It is a proprietary visualization engine that maps campaign performance across a circular coordinate plane for instant trend detection.' },
            { q: 'Can I custom-brand the HUD?', a: 'Mainframe tier allows full CSS overrides and SVG injection for custom branding and color schemes.' },
            { q: 'How fast is the bid sync?', a: 'Our global edge-network ensures bid synchronization happens in under 4.2ms, creating a "zero-lag" experience.' }
          ].map((item, i) => (
            <div key={i} className={`bg-[#121212] border border-[#1F1F1F] overflow-hidden transition-all duration-300 ${open === i ? 'border-[#00D1FF]' : ''}`}>
              <button 
                onClick={() => setOpen(open === i ? -1 : i)}
                className="w-full p-6 flex items-center justify-between text-left"
              >
                <span className={`${space.className} text-sm text-white font-black uppercase tracking-widest`}>{item.q}</span>
                <ChevronDown className={`text-[#00D1FF] transition-transform ${open === i ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className={`px-6 pb-6 text-[#757575] text-xs font-bold leading-relaxed ${mono.className}`}
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
  <section className="py-24 px-6 border-y border-[#1F1F1F] bg-black relative overflow-hidden">
    <div className="absolute top-0 right-0 p-8 opacity-5">
      <Target size={300} className="text-[#00FF41]" />
    </div>
    <div className="max-w-4xl mx-auto text-center relative z-10">
      <div className={`inline-block mb-6 px-4 py-1 border border-[#00FF41] text-[#00FF41] ${mono.className} text-[8px] font-black uppercase tracking-[0.5em] bg-[#00FF41]/5`}>
        [ CONNECTION_ESTABLISHED ]
      </div>
      <h2 className={`${space.className} text-6xl md:text-8xl font-black text-white mb-8 italic uppercase`}>RECEIVE_DECOY.</h2>
      <p className={`text-[#757575] mb-12 max-w-xl mx-auto text-lg ${inter.className}`}>Join the network of 1,400+ organizations receiving real-time HUD updates and market shifts.</p>
      <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
        <input 
          type="email" 
          placeholder="SOURCE_IDENTITY@NODE.ORG" 
          className={`flex-1 bg-[#121212] border border-[#1F1F1F] px-6 py-4 text-white focus:outline-none focus:border-[#00D1FF] transition-colors ${mono.className} text-[10px] font-black tracking-widest uppercase`}
        />
        <MetricButton>SUBSCRIBE</MetricButton>
      </div>
    </div>
  </section>
)

const Footer = () => (
  <footer className="py-20 px-6 bg-[#050505]">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-16">
        <div className="col-span-2">
           <div className={`flex items-center gap-2 ${space.className} text-xl font-black tracking-tighter mb-6 uppercase`}>
            <Activity className="text-[#00FF41]" size={24} />
            AD<span className="text-[#00D1FF]">METRIC</span>
          </div>
          <p className={`text-[#757575] text-[10px] max-w-xs leading-loose font-bold uppercase tracking-[0.2em] ${mono.className}`}>The global standard for real-time digital inventory telemetry and campaign ROI. Mission-critical and zero-latency.</p>
        </div>
        {[
          { title: 'Protocols', links: ['HUD_Engine', 'Telemetry', 'Inventory', 'Pricing'] },
          { title: 'Security', links: ['Encryption', 'PII_Masking', 'Nodes', 'Legal'] },
          { title: 'Connect', links: ['Discord', 'Terminal', 'GitHub', 'Mainframe'] }
        ].map(group => (
          <div key={group.title}>
            <div className={`${space.className} text-xs font-black text-white mb-6 uppercase tracking-widest`}>{group.title}</div>
            <ul className="space-y-4">
              {group.links.map(link => (
                <li key={link}><a href="#" className={`${mono.className} text-[8px] text-[#757575] font-black uppercase tracking-[0.3em] hover:text-[#00FF41] transition-colors`}>{link}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="pt-8 border-t border-[#1F1F1F] flex flex-col md:flex-row justify-between items-center gap-6">
        <div className={`${mono.className} text-[8px] text-[#757575] uppercase tracking-[0.5em] font-black`}>© 2026 ADMETRIC SYSTEMS. ENCRYPTED_V3.</div>
        <div className="flex gap-6">
           <Zap className="text-[#757575] hover:text-[#00FF41] cursor-pointer" size={16} />
           <Globe className="text-[#757575] hover:text-[#00D1FF] cursor-pointer" size={16} />
        </div>
      </div>
    </div>
  </footer>
)

export default function AdMetric() {
  return (
    <div className={`min-h-screen bg-[#050505] text-white overflow-x-hidden ${inter.className}`}>
      <Navbar />
      <Hero />
      <StatsGrid />
      <Features />
      <ProductDetail />
      <Pricing />
      <Testimonials />
      <FAQ />
      <Newsletter />
      <Footer />
      
      {/* --- Global Effects --- */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.05] contrast-150 mix-blend-screen">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <filter id="ad-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.95" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100" height="100" filter="url(#ad-noise)" />
        </svg>
      </div>
      
      </div>
  )
}
