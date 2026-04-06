'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { 
  BrainCircuit, 
  Sparkles, 
  Network, 
  Cpu, 
  Search, 
  ChevronDown, 
  MessageSquare,
  Lock,
  Cloud,
  Zap,
  ArrowRight,
  Share2
} from 'lucide-react'
import { Outfit, Inter, JetBrains_Mono } from 'next/font/google'

const outfit = Outfit({ subsets: ['latin'] })
const inter = Inter({ subsets: ['latin'] })
const mono = JetBrains_Mono({ subsets: ['latin'] })

// --- Design Tokens ---
const tokens = {
  colors: {
    background: "#020408",
    surface: "#0A0D14",
    accent: "#6366F1", // Neural Indigo
    secondary: "#10B981", // Synapse Green
    border: "rgba(99, 102, 241, 0.1)",
    glow: "rgba(99, 102, 241, 0.4)",
    textHigh: "#F8FAFC",
    textLow: "#94A3B8"
  },
  physics: {
    fluid: { type: "spring", stiffness: 200, damping: 30 },
    snappy: { type: "spring", stiffness: 500, damping: 20 }
  }
}

// --- Components ---

const NeuralButton = ({ children, variant = 'primary', className = '' }: any) => (
  <motion.button
    whileHover={{ scale: 1.02, boxShadow: `0 0 30px ${variant === 'primary' ? tokens.colors.glow : 'rgba(255,255,255,0.05)'}` }}
    whileTap={{ scale: 0.98 }}
    className={`px-8 py-4 rounded-full ${outfit.className} font-semibold transition-all relative overflow-hidden group ${
      variant === 'primary' 
        ? `bg-gradient-to-r from-[#6366F1] to-[#10B981] text-white` 
        : `bg-[#0A0D14] text-white border border-[${tokens.colors.border}]`
    } ${className}`}
  >
    <span className="relative z-10 flex items-center gap-2">{children}</span>
    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
  </motion.button>
)

const SynapseCard = ({ children, className = '' }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={`bg-[#0A0D14] border border-[${tokens.colors.border}] rounded-2xl p-8 relative group ${className}`}
    style={{ borderColor: tokens.colors.border }}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-[#6366F1]/5 to-[#10B981]/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
    <div className="relative z-10">{children}</div>
  </motion.div>
)

// --- Sections ---

const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#020408]/80 backdrop-blur-xl px-6 py-4">
    <div className="max-w-7xl mx-auto flex items-center justify-between">
      <div className={`flex items-center gap-2 ${outfit.className} text-2xl font-bold`}>
        <div className="w-10 h-10 bg-gradient-to-tr from-[#6366F1] to-[#10B981] rounded-xl flex items-center justify-center">
          <BrainCircuit className="text-white" size={24} />
        </div>
        NEURAL<span className="bg-gradient-to-r from-[#6366F1] to-[#10B981] bg-clip-text text-transparent">NOTE</span>
      </div>
      <div className="hidden md:flex items-center gap-8 text-[#94A3B8] font-medium text-sm">
        {['Neural Engine', 'Graph View', 'API', 'Pricing'].map(item => (
          <a key={item} href="#" className="hover:text-white transition-colors">{item}</a>
        ))}
      </div>
      <NeuralButton className="hidden md:block py-2 text-sm">START SYNCING</NeuralButton>
    </div>
  </nav>
)

const Hero = () => {
  const [text, setText] = useState('')
  const fullText = "Notes that think for you."
  
  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      setText(fullText.slice(0, i))
      i++
      if (i > fullText.length) clearInterval(interval)
    }, 100)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="pt-32 pb-20 px-6 relative overflow-hidden min-h-screen flex items-center">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#6366F1]/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#10B981]/10 rounded-full blur-[120px] animate-pulse delay-1000" />
      </div>
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={tokens.physics.fluid as any}
        >
          <div className="flex items-center gap-2 mb-6 px-4 py-2 bg-white/5 border border-white/10 rounded-full w-fit">
            <Sparkles className="text-[#10B981]" size={16} />
            <span className="text-xs text-[#94A3B8] font-medium tracking-wider uppercase">V3.0 Neural Engine Live</span>
          </div>
          <h1 className={`${outfit.className} text-7xl md:text-8xl font-bold text-white leading-[1.1] mb-6`}>
            {text}<span className="inline-block w-2 h-16 bg-[#6366F1] ml-2 animate-pulse" />
          </h1>
          <p className="text-[#94A3B8] text-xl max-w-xl mb-10 leading-relaxed">
            The first AI-native note-taking workspace that builds a thought-graph of your mind. Connect dots you didn't know existed.
          </p>
          <div className="flex flex-wrap gap-4">
            <NeuralButton>BEGIN FREE SYNC</NeuralButton>
            <NeuralButton variant="secondary">EXPLORE THE GRAPH</NeuralButton>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...(tokens.physics.fluid as any), delay: 0.2 }}
          className="relative"
        >
          <div className="bg-[#0A0D14] border border-white/10 rounded-3xl p-6 shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#6366F1]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center gap-2 mb-8 border-b border-white/5 pb-4">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
              <span className={`ml-4 ${mono.className} text-[#94A3B8] text-xs`}>~/thoughts/neural-mapping.md</span>
            </div>
            <div className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 }}
                className="flex items-start gap-4"
              >
                <div className="w-8 h-8 rounded-lg bg-[#6366F1]/20 flex items-center justify-center shrink-0">
                  <Cpu className="text-[#6366F1]" size={16} />
                </div>
                <div className="p-4 bg-white/5 rounded-2xl rounded-tl-none border border-white/5">
                  <p className="text-sm text-white leading-relaxed">I've analyzed your last 3 meetings. You're developing a recurring theme around <span className="text-[#10B981] font-bold">\"Semantic Latency\"</span>. Should I link this to your project notes?</p>
                </div>
              </motion.div>
              <div className="flex justify-end">
                <div className="p-4 bg-[#6366F1] rounded-2xl rounded-tr-none">
                  <p className="text-sm text-white">Yes, please. Map the connections.</p>
                </div>
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="relative h-48 rounded-xl border border-white/5 bg-black/40 overflow-hidden"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-full h-full">
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{ 
                          x: [Math.random()*100, Math.random()*200], 
                          y: [Math.random()*100, Math.random()*150] 
                        }}
                        transition={{ duration: 10, repeat: Infinity, repeatType: 'mirror' }}
                        className="absolute w-2 h-2 bg-[#6366F1] rounded-full shadow-[0_0_10px_#6366F1]"
                      />
                    ))}
                    <svg className="w-full h-full">
                      <motion.line x1="20%" y1="30%" x2="70%" y2="60%" stroke="#6366F1" strokeWidth="1" strokeDasharray="4 4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} />
                      <motion.line x1="70%" y1="60%" x2="40%" y2="80%" stroke="#10B981" strokeWidth="1" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.5 }} />
                    </svg>
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[10px] text-[#10B981] font-bold uppercase tracking-widest">Thought-Graph Real-time Mapping</div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

const StatsBar = () => (
  <section className="py-12 border-y border-white/5 bg-[#020408]">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {[
          { label: 'Neural Connections', value: '450M+', icon: Network },
          { label: 'Uptime', value: '99.99%', icon: Zap },
          { label: 'Sync Speed', value: '< 10ms', icon: Cpu },
          { label: 'Encrypted', value: '256-AES', icon: Lock }
        ].map((stat, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -5 }}
            className="flex flex-col items-center text-center"
          >
            <stat.icon className="text-[#10B981] mb-2" size={24} />
            <div className={`${outfit.className} text-4xl font-bold text-white`}>{stat.value}</div>
            <div className="text-[#94A3B8] text-xs uppercase tracking-widest font-bold">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)

const Features = () => (
  <section className="py-24 px-6 bg-[#020408]">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <h2 className={`${outfit.className} text-5xl md:text-6xl font-bold text-white mb-6`}>BEYOND THE PAGE</h2>
        <p className="text-[#94A3B8] max-w-2xl mx-auto text-lg leading-relaxed">Traditional notes are static. NeuralNote is a living cognitive environment that evolves with your projects.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {[
          { title: 'Thought-Graph', desc: 'Visual network of your notes. See how disparate ideas connect across time.', icon: Network },
          { title: 'Sentiment Sync', desc: 'AI analysis of your meeting tones and writing styles to suggest relevant mood-aligned tasks.', icon: BrainCircuit },
          { title: 'Quantum Search', desc: 'Find notes based on concepts, even if you don\'t remember the specific keywords.', icon: Search },
          { title: 'Cloud-Neural Sync', desc: 'Zero-latency synchronization across all devices with sub-10ms cognitive indexing.', icon: Cloud },
          { title: 'Private-First AI', desc: 'Your neural graph stays on your device. We use local-first AI for maximum security.', icon: Lock },
          { title: 'Semantic API', desc: 'Connect your neural graph to your existing toolchain for automated workflow triggers.', icon: Zap }
        ].map((feature, i) => (
          <SynapseCard key={i}>
            <div className="w-12 h-12 bg-[#6366F1]/10 rounded-xl flex items-center justify-center mb-6">
              <feature.icon className="text-[#6366F1]" size={24} />
            </div>
            <h3 className={`${outfit.className} text-2xl font-bold text-white mb-3`}>{feature.title}</h3>
            <p className="text-[#94A3B8] text-sm leading-relaxed">{feature.desc}</p>
          </SynapseCard>
        ))}
      </div>
    </div>
  </section>
)

const ProductDetail = () => (
  <section className="py-24 px-6 relative overflow-hidden">
    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#6366F1]/5 rounded-full blur-[150px] -mr-96 -mt-96" />
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-20 items-center">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#6366F1] to-[#10B981] blur-[100px] opacity-10" />
          <div className="grid grid-cols-2 gap-4">
            <motion.div whileHover={{ scale: 1.05 }} className="h-64 bg-white/5 rounded-3xl border border-white/10 p-8 flex flex-col justify-end">
              <div className="text-[#10B981] font-bold text-3xl mb-2">94%</div>
              <div className="text-[#94A3B8] text-xs uppercase tracking-widest font-bold">Concept Retention</div>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} className="h-64 bg-white/5 rounded-3xl border border-white/10 p-8 flex flex-col justify-end translate-y-12">
              <div className="text-[#6366F1] font-bold text-3xl mb-2">2.4X</div>
              <div className="text-[#94A3B8] text-xs uppercase tracking-widest font-bold">Speed of Thought</div>
            </motion.div>
          </div>
        </div>
        <div>
          <div className={`mb-6 ${mono.className} text-[#6366F1] text-sm tracking-widest uppercase`}>[ COGNITIVE_ARCHITECTURE ]</div>
          <h2 className={`${outfit.className} text-5xl md:text-6xl font-bold text-white mb-8 leading-tight`}>A BRAIN THAT <br/><span className="bg-gradient-to-r from-[#6366F1] to-[#10B981] bg-clip-text text-transparent">NEVER FORGETS.</span></h2>
          <div className="space-y-6 text-[#94A3B8] text-lg leading-relaxed">
            <p>Traditional note-taking apps are digital graveyards where ideas go to die. NeuralNote uses conceptual clustering to ensure that every note you take is alive, connected, and ready to be rediscovered.</p>
            <p>Our Semantic Graph Engine doesn't just store text; it stores meaning. By analyzing the entities and intents within your notes, we create an interactive map of your expertise.</p>
          </div>
          <NeuralButton className="mt-12">LEARN ABOUT THE GRAPH</NeuralButton>
        </div>
      </div>
    </div>
  </section>
)

const Pricing = () => (
  <section className="py-24 px-6 bg-[#020408]">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className={`${outfit.className} text-5xl font-bold text-white mb-4`}>SELECT YOUR NEURAL SCALE</h2>
        <p className="text-[#94A3B8]">Join the cognitive revolution. Scale your mind as your ideas grow.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {[
          { name: 'Synapse', price: '$0', features: ['1,000 Neural Nodes', 'Basic Thought-Graph', '24h AI Context', 'Local-only Storage'] },
          { name: 'Cortex', price: '$19', features: ['Unlimited Nodes', 'Full Graph View', '7-day AI Context', 'Cloud Sync', 'Team Collab'], highlight: true },
          { name: 'Omni', price: '$49', features: ['Enterprise API', 'Custom AI Models', 'Infinite AI Context', 'Dedicated Graph GPU', 'Onyx Security'] }
        ].map((tier, i) => (
          <SynapseCard key={i} className={tier.highlight ? 'border-[#6366F1] ring-1 ring-[#6366F1]/20' : ''}>
            <div className={`${outfit.className} text-xl font-bold text-white mb-2`}>{tier.name}</div>
            <div className="flex items-baseline gap-2 mb-8">
              <span className={`${outfit.className} text-5xl font-bold text-white`}>{tier.price}</span>
              <span className="text-[#94A3B8] text-sm">/ mo</span>
            </div>
            <ul className="space-y-4 mb-10">
              {tier.features.map(f => (
                <li key={f} className="flex items-center gap-3 text-sm text-[#94A3B8]">
                  <Sparkles size={14} className="text-[#10B981]" />
                  {f}
                </li>
              ))}
            </ul>
            <NeuralButton className="w-full" variant={tier.highlight ? 'primary' : 'secondary'}>UPGRADE NOW</NeuralButton>
          </SynapseCard>
        ))}
      </div>
    </div>
  </section>
)

const Testimonials = () => (
  <section className="py-24 px-6 relative">
    <div className="max-w-7xl mx-auto">
      <h2 className={`${outfit.className} text-5xl font-bold text-white mb-16`}>COGNITIVE SUCCESS</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {[
          { name: 'Dr. Sarah Jen', role: 'Neuroscientist', quote: 'NeuralNote is the first tool that actually mirrors the associative nature of the human brain.' },
          { name: 'Julian Vane', role: 'Lead Architect', quote: 'The graph view helped me see a critical architectural flaw by connecting two notes I wrote 6 months apart.' },
          { name: 'Aki Hiro', role: 'Content Creator', quote: 'I never have writer\'s block anymore. The AI suggests conceptual links that spark my creativity instantly.' }
        ].map((t, i) => (
          <SynapseCard key={i}>
            <div className="flex gap-1 mb-6">
              {[...Array(5)].map((_, j) => (
                <Sparkles key={j} size={14} className="text-[#10B981]" />
              ))}
            </div>
            <p className="text-white text-lg italic mb-8 leading-relaxed">"{t.quote}"</p>
            <div>
              <div className={`${outfit.className} text-xl font-bold text-white`}>{t.name}</div>
              <div className="text-[#6366F1] text-xs font-bold uppercase tracking-widest">{t.role}</div>
            </div>
          </SynapseCard>
        ))}
      </div>
    </div>
  </section>
)

const FAQ = () => {
  const [open, setOpen] = useState(0)
  return (
    <section className="py-24 px-6 bg-[#020408]">
      <div className="max-w-3xl mx-auto">
        <h2 className={`${outfit.className} text-5xl font-bold text-white mb-12 text-center`}>NEURAL FAQ</h2>
        <div className="space-y-4">
          {[
            { q: 'Is my data used to train AI?', a: 'No. We believe in cognitive privacy. Your notes are processed locally or on dedicated private containers that do not contribute to general model training.' },
            { q: 'What is a "Neural Node"?', a: 'A node is any single piece of information—a note, an image, a task, or a contact—that exists within your thought-graph.' },
            { q: 'Can I export my graph?', a: 'Yes. You can export your entire thought-graph as a JSON or Markdown bundle, ensuring you have full ownership of your data.' },
            { q: 'How fast is the sync?', a: 'Our global edge-network ensures synchronization happens in under 10ms, creating a "zero-lag" experience across devices.' }
          ].map((item, i) => (
            <div key={i} className={`bg-[#0A0D14] border border-white/5 rounded-2xl overflow-hidden transition-all ${open === i ? 'border-[#6366F1]/30' : ''}`}>
              <button 
                onClick={() => setOpen(open === i ? -1 : i)}
                className="w-full p-6 flex items-center justify-between text-left"
              >
                <span className={`${outfit.className} text-xl font-bold text-white`}>{item.q}</span>
                <ChevronDown className={`text-[#6366F1] transition-transform ${open === i ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-6 pb-6 text-[#94A3B8] text-sm"
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
  <section className="py-24 px-6 border-y border-white/5 bg-[#020408] relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-[#6366F1]/10 to-[#10B981]/10 opacity-30" />
    <div className="max-w-4xl mx-auto text-center relative z-10">
      <h2 className={`${outfit.className} text-6xl font-bold text-white mb-6`}>READY TO SCALE?</h2>
      <p className="text-[#94A3B8] mb-10 max-w-xl mx-auto">Join 150,000+ pioneers building their second brain with NeuralNote.</p>
      <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
        <input 
          type="email" 
          placeholder="NEURAL_ID@HOST.COM" 
          className={`flex-1 bg-white/5 border border-white/10 rounded-full px-8 py-4 text-white focus:outline-none focus:border-[#6366F1] transition-colors ${mono.className} text-sm`}
        />
        <NeuralButton>JOIN LIST</NeuralButton>
      </div>
    </div>
  </section>
)

const Footer = () => (
  <footer className="py-20 px-6 bg-[#020408]">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-16">
        <div className="col-span-2">
          <div className={`${outfit.className} text-2xl font-bold mb-6`}>
            NEURAL<span className="text-[#6366F1]">NOTE</span>
          </div>
          <p className="text-[#94A3B8] text-sm max-w-xs leading-relaxed">The cognitive workspace of the future. Built for thinkers, engineered for discovery.</p>
        </div>
        {[
          { title: 'Platform', links: ['Neural Engine', 'Graph View', 'API', 'Docs'] },
          { title: 'Privacy', links: ['Local-First', 'Encryption', 'Terms', 'Safety'] },
          { title: 'Social', links: ['Discord', 'Twitter', 'GitHub', 'LinkedIn'] }
        ].map(group => (
          <div key={group.title}>
            <div className={`${outfit.className} text-lg font-bold text-white mb-6`}>{group.title}</div>
            <ul className="space-y-4">
              {group.links.map(link => (
                <li key={link}><a href="#" className="text-[#94A3B8] text-sm hover:text-white transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-[#94A3B8] text-[10px] uppercase tracking-widest font-bold">© 2026 NEURALNOTE COGNITIVE CORP. ALL RIGHTS RESERVED.</div>
        <div className="flex gap-6">
          <Share2 className="text-[#94A3B8] hover:text-[#6366F1] transition-colors" size={20} />
          <Cloud className="text-[#94A3B8] hover:text-[#10B981] transition-colors" size={20} />
        </div>
      </div>
    </div>
  </footer>
)

export default function NeuralNote() {
  return (
    <div className={`min-h-screen bg-[#020408] text-white overflow-x-hidden ${inter.className}`}>
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
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.05] contrast-150 mix-blend-overlay">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100" height="100" filter="url(#noise)" />
        </svg>
      </div>
    </div>
  )
}
