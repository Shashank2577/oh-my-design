'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { 
  GitBranch, 
  GitCommit, Users,
  GitMerge, 
  GitPullRequest, 
  Zap, 
  Activity, 
  TrendingUp, 
  ShieldCheck, 
  ChevronDown, 
  ArrowRight,
  Globe,
  RefreshCw,
  Signal,
  Network,
  Radio,
  Sparkles,
  Search,
  Code2,
  Terminal,
  Cpu,
  Layers,
  LayoutGrid
} from 'lucide-react'
import { JetBrains_Mono, Inter, Space_Grotesk } from 'next/font/google'

const mono = JetBrains_Mono({ subsets: ['latin'] })
const inter = Inter({ subsets: ['latin'] })
const space = Space_Grotesk({ subsets: ['latin'] })

// --- Design Tokens ---
const tokens = {
  colors: {
    background: "#050505",
    surface: "#0A0A0A",
    accent1: "#F97316", // Git Orange
    accent2: "#A855F7", // Merge Purple
    border: "rgba(249, 115, 22, 0.1)",
    textHigh: "#FFFFFF",
    textLow: "#555555"
  },
  physics: {
    branch: { type: "spring" as any, stiffness: 200, damping: 20, mass: 1 }
  }
}

// --- Components ---

const GitButton = ({ children, variant = 'primary', className = '' }: any) => (
  <motion.button
    whileHover={{ scale: 1.02, backgroundColor: variant === 'primary' ? '#F97316' : '#1A1A1A' }}
    whileTap={{ scale: 0.98 }}
    className={`px-8 py-4 ${space.className} text-xs font-black tracking-widest relative group overflow-hidden border ${
      variant === 'primary' 
        ? `bg-[#F97316] text-white border-[#F97316]` 
        : `bg-transparent text-white border-white/10`
    } ${className}`}
  >
    <span className="relative z-10 flex items-center justify-center gap-2 uppercase italic">
      {children}
      <GitCommit size={14} className="group-hover:rotate-180 transition-transform duration-700" />
    </span>
    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
  </motion.button>
)

const RepoCard = ({ children, className = '', title = '' }: any) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    whileHover={{ x: 5, borderColor: '#F97316' }}
    className={`bg-[#0A0A0A] border border-white/5 p-10 rounded-sm relative group overflow-hidden ${className}`}
  >
    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-20 transition-opacity">
      <GitBranch size={80} strokeWidth={1} />
    </div>
    {title && <div className={`${mono.className} text-[8px] font-bold text-[#F97316] uppercase tracking-[0.4em] mb-10`}>{title}</div>}
    {children}
  </motion.div>
)

// --- Sections ---

const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 bg-[#050505]/80 backdrop-blur-xl px-8 py-6 border-b border-white/5">
    <div className="max-w-7xl mx-auto flex items-center justify-between">
      <div className={`flex items-center gap-3 ${space.className} text-xl font-black tracking-tighter text-white italic`}>
        <GitPullRequest className="text-[#F97316]" size={24} />
        GIT<span className="text-[#F97316]">GLOW</span>
      </div>
      <div className="hidden md:flex items-center gap-10 text-[#555555] font-bold text-[10px] tracking-[0.4em] uppercase">
        {['The Repo', 'Branches', 'Mainframe', 'Connect'].map(item => (
          <a key={item} href="#" className="hover:text-[#F97316] transition-colors">{item}</a>
        ))}
      </div>
      <GitButton className="hidden md:block py-2 text-[10px]" variant="secondary">AUTH_TERMINAL</GitButton>
    </div>
  </nav>
)

const Hero = () => {
  return (
    <section className="pt-40 pb-20 px-8 relative overflow-hidden min-h-screen flex items-center bg-[#050505]">
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-[radial-gradient(circle_at_50%_50%,_#F9731608_0%,_transparent_70%)]" />
        <motion.div 
          animate={{ opacity: [0.05, 0.15, 0.05] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute inset-0 bg-[linear-gradient(#1A1A1A_1px,transparent_1px),linear-gradient(90deg,#1A1A1A_1px,transparent_1px)] bg-[size:50px_50px]" 
        />
      </div>
      
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={tokens.physics.branch}
        >
          <div className="flex items-center gap-3 mb-10">
            <div className="w-2 h-2 bg-[#F97316] rounded-full animate-ping" />
            <span className={`text-[10px] font-black text-[#F97316] tracking-[0.5em] uppercase ${mono.className}`}>Source_Control_v3.0_Active</span>
          </div>
          <h1 className={`${space.className} text-7xl md:text-[10rem] font-black text-white leading-[0.8] mb-12 uppercase italic tracking-tighter`}>
            SPATIAL <br/> <span className="text-[#F97316] drop-shadow-[0_0_30px_#F97316]">HISTORY.</span>
          </h1>
          <p className={`text-[#555555] text-xl max-w-xl mb-16 leading-relaxed font-medium ${inter.className}`}>
            GitGlow is the high-fidelity ecosystem for scalable version control. Orchestrate millions of commits with sub-ms multi-device sync and zero drift.
          </p>
          <div className="flex flex-wrap gap-8">
            <GitButton>INITIALIZE_REPO</GitButton>
            <div className={`flex items-center gap-4 text-white font-black tracking-widest text-[10px] cursor-pointer group`}>
              CONNECT_MAIN_BRANCH <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform text-[#F97316]" />
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...tokens.physics.branch, delay: 0.2 }}
          className="relative"
        >
          <div className="bg-[#0A0A0A] border border-white/5 p-10 rounded-sm shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-[#F97316]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center justify-between mb-16 border-b border-white/5 pb-6">
              <div className={`${mono.className} text-[10px] text-[#F97316] font-bold tracking-widest`}>REPO_MASTER_ID: 8492-G</div>
              <Signal className="text-[#F97316]" size={18} />
            </div>
            <div className="space-y-8 relative z-10">
               {[
                 { label: 'Commit Density', val: '1,402/hr', trend: 'STABLE' },
                 { label: 'Merge Latency', val: '12ms', trend: 'OPTIMAL' },
                 { label: 'Node Uptime', val: '99.9%', trend: 'SYNCED' }
               ].map((item, i) => (
                 <div key={i} className="flex items-center justify-between p-4 bg-black/40 border border-white/5">
                   <div>
                     <div className="text-[8px] font-black text-[#555555] uppercase tracking-widest mb-1">{item.label}</div>
                     <div className={`${mono.className} text-xl font-bold text-white`}>{item.val}</div>
                   </div>
                   <div className="text-[10px] font-black text-[#F97316]">{item.trend}</div>
                 </div>
               ))}
            </div>
            <div className="mt-12 h-32 bg-black border border-white/5 rounded-sm overflow-hidden flex items-end gap-1 px-4 pb-4">
               {[...Array(20)].map((_, i) => (
                 <motion.div
                   key={i}
                   initial={{ height: 0 }}
                   animate={{ height: `${Math.random() * 80 + 20}%` }}
                   transition={{ repeat: Infinity, duration: 2, repeatType: 'mirror', delay: i * 0.1 }}
                   className="flex-1 bg-[#F97316]/40"
                 />
               ))}
            </div>
          </div>
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-10 -right-10 opacity-20 pointer-events-none"
          >
            <RefreshCw size={200} className="text-[#F97316]" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

const StatsBar = () => (
  <section className="py-24 border-y border-white/5 bg-black">
    <div className="max-w-7xl mx-auto px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-16 text-center">
        {[
          { label: 'Commits Pushed', value: '4.8B+', icon: GitCommit },
          { label: 'Active Orgs', value: '1.2K+', icon: Users },
          { label: 'Sync Accuracy', value: '99.9%', icon: ShieldCheck },
          { label: 'Daily Nodes', value: '850', icon: Zap }
        ].map((stat, i) => (
          <motion.div key={i} whileHover={{ y: -5 }}>
            <div className={`${space.className} text-6xl font-black text-white mb-2 italic tracking-tighter`}>{stat.value}</div>
            <div className="text-[#555555] text-[10px] font-black uppercase tracking-[0.4em]">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)

const Features = () => (
  <section className="py-32 px-8 bg-[#020202]">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-12">
        <div>
          <h2 className={`${space.className} text-6xl font-black text-white mb-6 uppercase italic tracking-tighter`}>SOURCE_MODULES</h2>
          <p className={`text-[#555555] max-w-xl ${inter.className}`}>Deploy high-performance synchronization infrastructure for professional match engines.</p>
        </div>
        <GitButton variant="secondary" className="md:mb-4 text-[10px]">ALL_SYSTEMS_VIEW</GitButton>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {[
          { title: 'Spatial Commit History', desc: 'Real-time 3D visualization of your repository evolution mapping branch-physics and merge-rhythms.', icon: GitBranch },
          { title: 'Pulse Telemetry', desc: 'Interfaces that maintain a constant rhythmic pulse through subtle micro-animations on all grid cells.', icon: Activity },
          { title: 'Global Sync', desc: 'Sub-ms multi-device synchronization for high-stakes digital agency environments.', icon: RefreshCw },
          { title: 'Foundry Logic', desc: 'A proprietary creative engine that builds unique visual typefaces for your brand story.', icon: Code2 },
          { title: 'Secure Vault', desc: 'Onyx-grade 256-bit encryption for proprietary plan logic and historical performance data.', icon: ShieldCheck },
          { title: 'History Ticker', desc: 'Vertical scrolling match-timeline with high-contrast strobe reveals for key events.', icon: Terminal }
        ].map((feature, i) => (
          <RepoCard key={i} title={`PROTOCOL_0${i + 1}`}>
            <div className="w-16 h-16 bg-[#F97316]/5 rounded-full flex items-center justify-center mb-10">
              <feature.icon className="text-[#F97316]" size={32} />
            </div>
            <h3 className={`${space.className} text-xl font-bold text-white mb-4 uppercase tracking-tighter italic`}>{feature.title}</h3>
            <p className={`text-[#555555] text-xs leading-relaxed ${inter.className}`}>{feature.desc}</p>
          </RepoCard>
        ))}
      </div>
    </div>
  </section>
)

const ProductDetail = () => (
  <section className="py-32 px-8 bg-black relative overflow-hidden">
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-24 items-center">
        <div className="order-2 lg:order-1 relative group">
           <div className="aspect-video bg-[#0A0A0A] border border-white/5 p-10 relative overflow-hidden">
              <div className="absolute inset-0 bg-[#F97316]/5 group-hover:opacity-100 opacity-0 transition-opacity" />
              <div className="w-full h-full border border-dashed border-[#F97316]/20 rounded-sm flex items-center justify-center">
                 <Cpu className="text-[#F97316]/20 animate-spin-slow" size={150} />
              </div>
              <motion.div 
                animate={{ y: [0, 400, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                className="absolute top-0 left-0 w-0.5 h-full bg-[#F97316] shadow-[0_0_15px_#F97316]"
              />
           </div>
           <div className="absolute -bottom-8 -left-8 bg-white text-black p-8 rounded-sm shadow-2xl rotate-6">
              <div className={`${mono.className} text-xl font-black`}>GIT_CERTIFIED</div>
           </div>
        </div>
        <div className="order-1 lg:order-2">
          <div className={`${mono.className} text-[#F97316] text-[10px] tracking-[0.5em] font-bold mb-10 uppercase`}>[ HUB_ARCHITECTURE ]</div>
          <h2 className={`${space.className} text-6xl font-black text-white mb-10 italic uppercase leading-[0.9] tracking-tighter`}>IN PHASE WITH <br/><span className="text-[#F97316]">THE SOURCE.</span></h2>
          <div className={`space-y-8 text-[#555555] text-xl leading-relaxed ${inter.className}`}>
            <p>Traditional version control is delayed. GitGlow is immediate. We treat every commit signal as a photon, moving at the speed of human potential to ensure your ecosystem is in perfect phase.</p>
            <p>Our implementation of zero-drift physics and rhythmic transitions ensures that the communication legacy is as powerful as the play.</p>
          </div>
          <GitButton className="mt-12">CONNECT_MAIN_SOURCE</GitButton>
        </div>
      </div>
    </div>
  </section>
)

const Footer = () => (
  <footer className="py-24 px-6 bg-[#020202] border-t border-white/5">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-16">
        <div className="col-span-2">
           <div className={`flex items-center gap-2 ${space.className} text-xl font-black tracking-tighter text-white italic mb-10`}>
            <GitPullRequest className="text-[#F97316]" size={24} />
            GIT<span className="text-[#F97316]">GLOW</span>
          </div>
          <p className={`text-[#555555] text-[10px] max-w-xs leading-loose font-black uppercase tracking-[0.2em] ${mono.className}`}>The global standard for professional version control and high-energy source analytics. Source-first since 2026.</p>
        </div>
        {[
          { title: 'The Repo', links: ['Commits', 'Branches', 'Mainframe', 'Pricing'] },
          { title: 'Agency', links: ['About Us', 'Diagnostic', 'Careers', 'Brand'] },
          { title: 'Connect', links: ['Discord', 'Terminal', 'GitHub', 'Mainframe'] }
        ].map(group => (
          <div key={group.title}>
            <div className={`${space.className} text-xs font-black text-white mb-10 uppercase tracking-widest`}>{group.title}</div>
            <ul className="space-y-6">
              {group.links.map(link => (
                <li key={link}><a href="#" className={`${mono.className} text-[8px] text-[#555555] font-black uppercase tracking-[0.3em] hover:text-[#F97316] transition-colors`}>{link}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
        <div className={`${mono.className} text-[8px] text-[#555555] uppercase tracking-[0.5em] font-black`}>© 2026 GITGLOW HUB CORP. SOURCE_ENCRYPTED.</div>
        <div className="flex gap-10">
           <Zap className="text-[#555555] hover:text-[#F97316] cursor-pointer" size={18} />
           <Globe className="text-[#555555] hover:text-[#F97316] cursor-pointer" size={18} />
        </div>
      </div>
    </div>
  </footer>
)

export default function GitGlow() {
  return (
    <div className={`min-h-screen bg-black text-white overflow-x-hidden ${inter.className}`}>
      <Navbar />
      <Hero />
      <StatsBar />
      <Features />
      <ProductDetail />
      <Footer />
      
      {/* --- Global Effects --- */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.05] contrast-150 mix-blend-screen">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <filter id="git-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.95" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100" height="100" filter="url(#git-noise)" />
        </svg>
      </div>
    </div>
  )
}
