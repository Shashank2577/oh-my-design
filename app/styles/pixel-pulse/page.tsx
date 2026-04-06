'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Zap, 
  Cpu, 
  Layers, 
  LayoutGrid, 
  Scan, 
  ChevronRight, 
  Terminal,
  Search,
  Activity,
  Box,
  Code2,
  MousePointer2,
  Sparkles,
  ArrowRight
} from 'lucide-react'
import { Inter, JetBrains_Mono } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
const mono = JetBrains_Mono({ subsets: ['latin'] })

// --- Design Tokens ---
const tokens = {
  colors: {
    background: "#080808",
    surface: "#121212",
    accent1: "#00FFCC", // Neon Mint
    accent2: "#7000FF", // Deep Cyber
    border: "rgba(0, 255, 204, 0.1)",
    textHigh: "#FFFFFF",
    textLow: "#757575"
  },
  physics: {
    snappy: { type: "spring" as any, stiffness: 400, damping: 20 },
    reform: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as any }
  }
}

// --- Components ---

const PixelButton = ({ children, variant = 'primary', className = '' }: any) => (
  <motion.button
    whileHover={{ scale: 1.05, boxShadow: `0 0 20px ${variant === 'primary' ? tokens.colors.accent1 : 'rgba(255,255,255,0.1)'}` }}
    whileTap={{ scale: 0.95 }}
    className={`px-8 py-4 ${mono.className} text-[10px] font-black tracking-[0.3em] relative group overflow-hidden border ${
      variant === 'primary' 
        ? `bg-[#00FFCC] text-black border-[#00FFCC]` 
        : `bg-transparent text-white border-white/20`
    } ${className}`}
  >
    <div className="absolute top-0 left-0 w-1 h-1 bg-current opacity-50 m-0.5" />
    <div className="absolute bottom-0 right-0 w-1 h-1 bg-current opacity-50 m-0.5" />
    <span className="relative z-10 flex items-center justify-center gap-2 uppercase">{children}</span>
  </motion.button>
)

const PulseCard = ({ children, className = '' }: any) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    className={`bg-[#121212] border border-white/5 p-8 relative overflow-hidden group ${className}`}
  >
    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00FFCC] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#7000FF] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    {children}
  </motion.div>
)

// --- Sections ---

const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/80 backdrop-blur-xl px-6 py-6">
    <div className="max-w-7xl mx-auto flex items-center justify-between">
      <div className={`flex items-center gap-2 ${inter.className} text-xl font-black tracking-tighter`}>
        <div className="w-6 h-6 bg-[#00FFCC] rounded-sm animate-pulse" />
        PIXEL<span className="text-[#00FFCC]">PULSE</span>
      </div>
      <div className="hidden md:flex items-center gap-10 text-[#757575] font-bold text-[10px] tracking-[0.4em] uppercase">
        {['Artifacts', 'Protocol', 'Lab', 'Mainframe'].map(item => (
          <a key={item} href="#" className="hover:text-[#00FFCC] transition-colors">{item}</a>
        ))}
      </div>
      <PixelButton className="hidden md:block py-2 text-[8px]" variant="secondary">AUTH_NODE</PixelButton>
    </div>
  </nav>
)

const Hero = () => {
  return (
    <section className="pt-32 pb-20 px-6 relative overflow-hidden min-h-screen flex items-center">
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
        <div className="w-full h-full bg-[linear-gradient(rgba(0,255,204,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,204,0.5)_1px,transparent_1px)] bg-[size:20px_20px]" />
      </div>
      
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={tokens.physics.snappy}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className={`px-2 py-1 border border-[#00FFCC]/30 text-[#00FFCC] text-[8px] font-black tracking-widest uppercase ${mono.className}`}>
              [ STATUS: REFORMING_GRID ]
            </div>
          </div>
          <h1 className={`${inter.className} text-7xl md:text-9xl font-black text-white leading-[0.8] mb-10 uppercase tracking-tighter`}>
            DIGITAL <br/> <span className="text-[#00FFCC] drop-shadow-[0_0_20px_#00FFCC]">ARTISANS.</span>
          </h1>
          <p className={`text-[#757575] text-lg max-w-xl mb-12 leading-relaxed ${inter.className}`}>
            PixelPulse is a high-fidelity digital studio celebrating the atom of the web. We build pixel-perfect interfaces with rhythmic motion and technical excellence.
          </p>
          <div className="flex flex-wrap gap-6">
            <PixelButton>INITIALIZE_PROJECT</PixelButton>
            <PixelButton variant="secondary">VIEW_LAB_LOGS</PixelButton>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...tokens.physics.snappy, delay: 0.2 }}
          className="relative"
        >
          <div className="aspect-square bg-black border border-white/10 p-8 rounded-sm shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-[#00FFCC]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="grid grid-cols-8 gap-2 h-full">
              {[...Array(64)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: Math.random() * 0.5 + 0.1, scale: 1 }}
                  transition={{ delay: i * 0.01, duration: 0.5 }}
                  whileHover={{ backgroundColor: '#00FFCC', opacity: 1, scale: 1.2 }}
                  className="bg-white/10 rounded-[1px]"
                />
              ))}
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className={`${mono.className} text-[10px] text-[#00FFCC] font-black uppercase tracking-[0.5em] bg-black/80 px-4 py-2 border border-[#00FFCC]/30`}>
                REALTIME_SCAN
              </div>
            </div>
          </div>
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="absolute -top-6 -right-6 bg-[#7000FF] text-white p-4 rounded-sm shadow-2xl rotate-12"
          >
            <Cpu size={32} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

const StatsBar = () => (
  <section className="py-12 border-y border-white/5 bg-black">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {[
          { label: 'Pixels Rendered', value: '4.8B+', icon: LayoutGrid },
          { label: 'Grid Accuracy', value: '100%', icon: Scan },
          { label: 'Live Artifacts', value: '142', icon: Box },
          { label: 'Sync Velocity', value: '4.2ms', icon: Activity }
        ].map((stat, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05, color: tokens.colors.accent1 }}
            className="flex flex-col items-center text-center group"
          >
            <stat.icon className="text-[#757575] group-hover:text-[#00FFCC] mb-3 transition-colors" size={20} />
            <div className={`${inter.className} text-4xl font-black text-white`}>{stat.value}</div>
            <div className={`${mono.className} text-[8px] text-[#757575] uppercase tracking-[0.4em] font-bold mt-2`}>{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)

const Features = () => (
  <section className="py-24 px-6 bg-[#080808]">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
        <div>
          <h2 className={`${inter.className} text-5xl md:text-6xl font-black text-white mb-4 uppercase italic tracking-tighter`}>CORE_PROTOCOLS</h2>
          <p className={`text-[#757575] max-w-xl ${inter.className}`}>Deploy high-density digital craftsmanship for the modern mainframe.</p>
        </div>
        <PixelButton variant="secondary" className="md:mb-2 text-[8px]">ALL_SYSTEMS</PixelButton>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {[
          { title: 'Pixel Reform', desc: 'Elements load as a scattered cloud of pixels that snap together into their final form.', icon: LayoutGrid },
          { title: 'Grid Light-Sweep', desc: 'Horizontal and vertical laser lines that sweep the grid, lighting up container borders.', icon: Scan },
          { title: 'RGB Split FX', desc: 'High-frequency chromatic aberration effects during transitions and hover states.', icon: Activity },
          { title: 'Terminal Inputs', desc: 'Command-line style input fields with blinking underscore cursors and ghost text.', icon: Terminal },
          { title: '1px Precision', desc: 'Persistent low-opacity 10px grid that acts as the foundation for the entire UI.', icon: Code2 },
          { title: 'Magnetic Nodes', desc: 'Grid intersections that react to mouse proximity by expanding and glowing.', icon: MousePointer2 }
        ].map((feature, i) => (
          <PulseCard key={i}>
            <feature.icon className="text-[#00FFCC] mb-6" size={32} />
            <h3 className={`${inter.className} text-xl font-bold text-white mb-3 uppercase tracking-tighter italic`}>{feature.title}</h3>
            <p className={`text-[#757575] text-xs leading-relaxed ${inter.className}`}>{feature.desc}</p>
          </PulseCard>
        ))}
      </div>
    </div>
  </section>
)

const ProductDetail = () => (
  <section className="py-24 px-6 relative">
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-24 items-center">
        <div className="relative group">
           <div className="aspect-square bg-black border border-white/5 rounded-sm p-4 relative overflow-hidden">
              <div className="absolute inset-0 bg-[#00FFCC]/5 group-hover:opacity-100 opacity-0 transition-opacity" />
              <div className="w-full h-full border border-dashed border-[#00FFCC]/20 rounded-sm flex items-center justify-center">
                 <Box className="text-[#00FFCC]/20 animate-bounce" size={150} />
              </div>
              <motion.div 
                animate={{ x: [0, 300, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                className="absolute top-0 left-0 w-0.5 h-full bg-[#00FFCC] shadow-[0_0_15px_#00FFCC]"
              />
           </div>
           <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-sm shadow-2xl -rotate-6">
              <div className={`${mono.className} text-black text-xl font-black`}>PIXEL_PERFECT</div>
           </div>
        </div>
        <div>
          <div className={`${mono.className} text-[#7000FF] text-[10px] tracking-[0.5em] font-bold mb-6 uppercase`}>[ THE_ENGINE ]</div>
          <h2 className={`${inter.className} text-5xl md:text-6xl font-black text-white mb-8 italic uppercase leading-[0.9] tracking-tighter`}>CRAFTED AT THE <br/><span className="text-[#00FFCC]">ATOMIC LEVEL.</span></h2>
          <div className={`space-y-6 text-[#757575] text-lg leading-relaxed ${inter.className}`}>
            <p>At PixelPulse, we don't just design; we engineer. We treat every pixel as a distinct unit of value, carefully orchestrating its motion and light to create a singular, cohesive experience.</p>
            <p>Our 1px grid foundation ensures that every element is balanced, responsive, and aesthetically balanced within the digital void.</p>
          </div>
          <PixelButton className="mt-12">EXPLORE_THE_GRID</PixelButton>
        </div>
      </div>
    </div>
  </section>
)

const Pricing = () => (
  <section className="py-24 px-6 bg-[#080808]">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <h2 className={`${inter.className} text-5xl font-black text-white mb-4 uppercase italic tracking-tighter`}>NODE_LICENSING</h2>
        <p className={`text-[#757575] ${inter.className}`}>Select your level of integration with the Pulse.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {[
          { name: 'Core_Node', price: '$5K', features: ['Custom Artifact Design', 'Standard Grid Set', 'Pixel Animation Kit', 'Public API'] },
          { name: 'High_Pulse', price: '$15K', features: ['Full Protocol Access', 'Infinite Sub-nodes', 'RGB Split Suite', 'Private Edge Node', '24/7 Support'], highlight: true },
          { name: 'Mainframe', price: '$50K', features: ['White-label Platform', 'Quantum Crypto Ready', 'Dedicated Lab Access', 'Direct Studio Seat', 'Source Control'] }
        ].map((tier, i) => (
          <PulseCard key={i} className={tier.highlight ? 'border-[#00FFCC]/50 shadow-[0_0_40px_rgba(0,255,204,0.1)]' : ''}>
            {tier.highlight && (
              <div className="absolute top-0 right-0 bg-[#00FFCC] text-black px-4 py-1 ${mono.className} text-[8px] font-black uppercase tracking-widest">
                OPTIMIZED
              </div>
            )}
            <div className={`${inter.className} text-2xl font-black text-white mb-2 uppercase italic tracking-tighter`}>{tier.name}</div>
            <div className="flex items-baseline gap-2 mb-10">
              <span className={`${inter.className} text-6xl font-black text-white`}>{tier.price}</span>
              <span className={`${mono.className} text-[10px] text-[#757575]`}>/ INITIAL</span>
            </div>
            <ul className="space-y-5 mb-12">
              {tier.features.map(f => (
                <li key={f} className="flex items-center gap-3 text-[10px] text-[#757575] font-bold uppercase tracking-widest">
                  <div className="w-1.5 h-1.5 bg-[#00FFCC]" />
                  {f}
                </li>
              ))}
            </ul>
            <PixelButton className="w-full" variant={tier.highlight ? 'primary' : 'secondary'}>INITIALIZE_NODE</PixelButton>
          </PulseCard>
        ))}
      </div>
    </div>
  </section>
)

const Testimonials = () => (
  <section className="py-24 px-6 relative">
    <div className="max-w-7xl mx-auto">
      <h2 className={`${inter.className} text-5xl font-black text-white mb-20 italic uppercase tracking-tighter`}>CLIENT_FEEDBACK</h2>
      <div className="grid md:grid-cols-3 gap-12">
        {[
          { name: 'Dr. Sarah Jen', role: 'Founder', company: 'NeuralNote', quote: 'PixelPulse captured the technical depth of our product with unmatched precision. The grid-based reveal was stunning.' },
          { name: 'Marcus Thorne', role: 'Lead', company: 'Velocity', quote: 'Their attention to detail at the atomic level is what sets them apart. Rhythmic, sharp, and digitally crafted.' },
          { name: 'Alex Rivera', role: 'CEO', company: 'Prism Studio', quote: 'The perfect partner for technical visionaries. Their RGB split transitions added a layer of depth we didn\'t know we needed.' }
        ].map((t, i) => (
          <div key={i} className="flex flex-col gap-8">
            <div className="flex gap-1">
              {[...Array(5)].map((_, j) => (
                <div key={j} className="w-2 h-2 bg-[#00FFCC] rotate-45" />
              ))}
            </div>
            <p className={`${inter.className} text-2xl font-bold text-white leading-tight italic tracking-tighter`}>"{t.quote}"</p>
            <div>
              <div className={`${inter.className} text-lg font-black text-[#00FFCC] uppercase tracking-tighter`}>{t.name}</div>
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
    <section className="py-24 px-6 bg-[#080808]">
      <div className="max-w-3xl mx-auto">
        <h2 className={`${inter.className} text-5xl font-black text-white mb-16 text-center italic uppercase tracking-tighter`}>TECHNICAL_FAQ</h2>
        <div className="space-y-4">
          {[
            { q: 'What is Pixel-Reform?', a: 'It is our proprietary loading technique where UI components are initially rendered as a cloud of scattered pixels before snapping into their final high-fidelity positions.' },
            { q: 'Is the 1px grid customizable?', a: 'Yes. High_Pulse and Mainframe tiers allow full control over grid density, opacity, and light-sweep frequency via our technical dashboard.' },
            { q: 'Do you offer custom artifacts?', a: 'Absolutely. We specialize in building unique 3D digital artifacts that reflect your brand\'s core technical identity.' },
            { q: 'How is motion-sync handled?', a: 'All animations are synchronized to a global heartbeat frequency, ensuring that every transition and pulse is in perfect rhythmic alignment.' }
          ].map((item, i) => (
            <div key={i} className={`bg-[#121212] border border-white/5 overflow-hidden transition-all duration-300 ${open === i ? 'border-[#00FFCC]' : ''}`}>
              <button 
                onClick={() => setOpen(open === i ? -1 : i)}
                className="w-full p-6 flex items-center justify-between text-left"
              >
                <span className={`${inter.className} text-sm text-white font-black uppercase tracking-widest`}>{item.q}</span>
                <ChevronRight className={`text-[#00FFCC] transition-transform ${open === i ? 'rotate-180' : ''}`} />
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
  <section className="py-24 px-6 border-y border-white/5 bg-black relative overflow-hidden">
    <div className="max-w-4xl mx-auto text-center relative z-10">
      <div className={`inline-block mb-10 px-4 py-1 border border-[#00FFCC] text-[#00FFCC] ${mono.className} text-[8px] font-black uppercase tracking-[0.5em] bg-[#00FFCC]/5`}>
        [ CONNECTION_STABLE ]
      </div>
      <h2 className={`${inter.className} text-7xl md:text-8xl font-black text-white mb-8 italic uppercase tracking-tighter`}>JOIN_THE_GRID.</h2>
      <p className={`text-[#757575] mb-12 max-w-xl mx-auto text-lg ${inter.className}`}>Join 14,000+ digital artisans receiving weekly artifacts and protocol updates.</p>
      <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
        <input 
          type="email" 
          placeholder="USER_ID@GRID.NODE" 
          className={`flex-1 bg-[#121212] border border-white/10 px-6 py-4 text-[#00FFCC] focus:outline-none focus:border-[#00FFCC] transition-colors ${mono.className} text-[10px] font-black tracking-widest uppercase`}
        />
        <PixelButton>SUBSCRIBE</PixelButton>
      </div>
    </div>
  </section>
)

const Footer = () => (
  <footer className="py-20 px-6 bg-[#080808]">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-16">
        <div className="col-span-2">
           <div className={`flex items-center gap-2 ${inter.className} text-xl font-black tracking-tighter mb-6 uppercase`}>
            <div className="w-4 h-4 bg-[#00FFCC] rounded-sm" />
            PIXEL<span className="text-[#00FFCC]">PULSE</span>
          </div>
          <p className={`text-[#757575] text-[10px] max-w-xs leading-loose font-bold uppercase tracking-[0.2em] ${mono.className}`}>The global standard for high-fidelity digital craftsmanship and rhythmic motion design. Atomic precision since 2026.</p>
        </div>
        {[
          { title: 'Artifacts', links: ['Showcase', 'Lab_Logs', 'Protocol', 'Pricing'] },
          { title: 'Foundry', links: ['About', 'Foundry', 'Careers', 'Brand'] },
          { title: 'Connect', links: ['Discord', 'Terminal', 'GitHub', 'Mainframe'] }
        ].map(group => (
          <div key={group.title}>
            <div className={`${inter.className} text-xs font-black text-white mb-6 uppercase tracking-widest`}>{group.title}</div>
            <ul className="space-y-4">
              {group.links.map(link => (
                <li key={link}><a href="#" className={`${mono.className} text-[8px] text-[#757575] font-black uppercase tracking-[0.3em] hover:text-[#00FFCC] transition-colors`}>{link}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className={`${mono.className} text-[8px] text-[#757575] uppercase tracking-[0.5em] font-black`}>© 2026 PIXELPULSE STUDIO. GRID_ENCRYPTED.</div>
        <div className="flex gap-6">
           <Code2 className="text-[#757575] hover:text-[#00FFCC] cursor-pointer" size={16} />
           <Activity className="text-[#757575] hover:text-[#7000FF] cursor-pointer" size={16} />
        </div>
      </div>
    </div>
  </footer>
)

export default function PixelPulse() {
  return (
    <div className={`min-h-screen bg-[#080808] text-white overflow-x-hidden ${inter.className}`}>
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
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.05] contrast-150 mix-blend-screen">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <filter id="pixel-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.95" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100" height="100" filter="url(#pixel-noise)" />
        </svg>
      </div>
    </div>
  )
}
