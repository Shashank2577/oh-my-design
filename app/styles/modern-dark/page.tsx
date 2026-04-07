'use client'

import { motion, useReducedMotion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Inter } from 'next/font/google'
import {
  Star, ChevronDown, ArrowRight, Check, Users, Zap, Globe, Shield,
  BookOpen, Layout, Palette, Code2, BarChart, Lock, AppWindow, Cpu, Menu, X
} from 'lucide-react'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const TOKENS = {
  colors: {
    bgDeep: '#020203',
    bgBase: '#050506',
    bgElevated: '#0a0a0c',
    surface: 'rgba(255, 255, 255, 0.05)',
    surfaceHover: 'rgba(255, 255, 255, 0.08)',
    foreground: '#EDEDEF',
    foregroundMuted: '#8A8F98',
    foregroundSubtle: 'rgba(255, 255, 255, 0.60)',
    accent: '#5E6AD2',
    accentBright: '#6872D9',
    accentGlow: 'rgba(94, 106, 210, 0.3)',
    borderDefault: 'rgba(255, 255, 255, 0.06)',
    borderHover: 'rgba(255, 255, 255, 0.10)',
    borderAccent: 'rgba(94, 106, 210, 0.30)',
  },
  shadows: {
    card: '0 0 0 1px rgba(255,255,255,0.06), 0 2px 20px rgba(0,0,0,0.4), 0 0 40px rgba(0,0,0,0.2)',
    cardHover: '0 0 0 1px rgba(255,255,255,0.1), 0 8px 40px rgba(0,0,0,0.5), 0 0 80px rgba(94,106,210,0.1)',
    cta: '0 0 0 1px rgba(94,106,210,0.5), 0 4px 12px rgba(94,106,210,0.3), inset 0 1px 0 0 rgba(255,255,255,0.2)',
    innerHighlight: 'inset 0 1px 0 0 rgba(255,255,255,0.1)'
  }
}

const easeOutExpo = [0.16, 1, 0.3, 1] as const

// --- COMPONENTS ---

function SpotlightCard({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/[0.06] shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_2px_20px_rgba(0,0,0,0.4),0_0_40px_rgba(0,0,0,0.2)] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_8px_40px_rgba(0,0,0,0.5),0_0_80px_rgba(94,106,210,0.1)] transition-all duration-300 ${className}`}
      whileHover={{ y: -4 }}
      transition={{ ease: easeOutExpo, duration: 0.3 }}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(94,106,210,0.15), transparent 40%)`
        }}
      />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.1] to-transparent" />
      <div className="relative z-10 h-full">
        {children}
      </div>
    </motion.div>
  )
}

function PrimaryButton({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ ease: easeOutExpo, duration: 0.2 }}
      className={`group relative overflow-hidden rounded-lg bg-[#5E6AD2] hover:bg-[#6872D9] text-white px-6 py-3 font-medium transition-colors duration-200 shadow-[0_0_0_1px_rgba(94,106,210,0.5),0_4px_12px_rgba(94,106,210,0.3),inset_0_1px_0_0_rgba(255,255,255,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5E6AD2]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050506] ${className}`}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-shimmer" />
    </motion.button>
  )
}

function SecondaryButton({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ ease: easeOutExpo, duration: 0.2 }}
      className={`group relative overflow-hidden rounded-lg bg-white/[0.05] hover:bg-white/[0.08] text-[#EDEDEF] px-6 py-3 font-medium transition-colors duration-200 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5E6AD2]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050506] ${className}`}
    >
      {children}
    </motion.button>
  )
}

// --- CONTENT ---

const DATA = {
  features: [
    { title: "Quantum Routing", description: "Dynamic pathways that adapt in real-time, reducing latency by up to 40% globally.", icon: Zap, colSpan: "col-span-1 md:col-span-2", rowSpan: "row-span-1" },
    { title: "Neural Analytics", description: "Predictive insights powered by deep learning models that understand your traffic before it arrives.", icon: BarChart, colSpan: "col-span-1 md:col-span-2", rowSpan: "row-span-1" },
    { title: "Absolute Zero Trust", description: "Cryptographically verified handshakes at every node. If it isn't signed, it doesn't pass.", icon: Shield, colSpan: "col-span-1 md:col-span-2", rowSpan: "row-span-1" },
    { title: "Edge Computing", description: "Deploy compute directly to the edge. Run your code milliseconds away from your users.", icon: Cpu, colSpan: "col-span-1 md:col-span-3", rowSpan: "row-span-1" },
    { title: "Global Mesh Network", description: "A self-healing network that routes around outages instantly. 100% uptime SLA.", icon: Globe, colSpan: "col-span-1 md:col-span-3", rowSpan: "row-span-1" },
  ],
  stats: [
    { value: "40ms", label: "Global Latency" },
    { value: "99.999%", label: "Uptime SLA" },
    { value: "50Tbps", label: "Network Capacity" },
    { value: "250+", label: "Edge Locations" }
  ],
  steps: [
    { title: "Connect", description: "Deploy our lightweight agent to your infrastructure with a single command.", icon: Layout },
    { title: "Configure", description: "Define your routing rules using our declarative configuration language.", icon: Code2 },
    { title: "Observe", description: "Monitor traffic in real-time through our high-fidelity dashboard.", icon: AppWindow }
  ],
  pricing: [
    { name: "Developer", price: "$0", description: "Perfect for side projects and testing.", features: ["Global Edge Network", "100GB Bandwidth", "Community Support", "Basic Analytics"], cta: "Start Free", popular: false },
    { name: "Pro", price: "$49", description: "For production applications requiring scale.", features: ["Global Edge Network", "1TB Bandwidth", "Priority Support", "Neural Analytics", "Custom SSL"], cta: "Upgrade to Pro", popular: true },
    { name: "Enterprise", price: "Custom", description: "For massive scale and custom requirements.", features: ["Dedicated Infrastructure", "Unlimited Bandwidth", "24/7 Phone Support", "SLA Guarantee", "Custom Contracts"], cta: "Contact Sales", popular: false }
  ],
  faqs: [
    { q: "How quickly does routing adapt?", a: "Our quantum routing algorithm recalculates optimal paths every 50ms based on global network conditions." },
    { q: "Do you support custom certificates?", a: "Yes, Pro and Enterprise plans support fully custom SSL/TLS certificates with automated renewal." },
    { q: "What happens if a node goes down?", a: "Traffic is instantly rerouted to the next nearest healthy node without dropping active connections." }
  ],
  testimonials: [
    { quote: "Latency dropped by 60% across our entire European user base. It felt like we rewrote our entire backend.", author: "Sarah Chen", role: "CTO at Nexus" },
    { quote: "The neural analytics gave us insights into attack vectors we didn't even know existed. Indispensable.", author: "Marcus Thorne", role: "Head of Security, Aethel" }
  ]
}


export default function ModernDarkPage() {
  const prefersReducedMotion = useReducedMotion()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Floating animation for blobs
  const floatAnimation = {
    y: prefersReducedMotion ? 0 : [0, -20, 0],
    rotate: prefersReducedMotion ? 0 : [0, 1, 0],
    transition: {
      duration: 10,
      ease: [0.42, 0, 0.58, 1] as const,
      repeat: Infinity,
    }
  }

  const floatAnimationSecondary = {
    y: prefersReducedMotion ? 0 : [0, 15, 0],
    rotate: prefersReducedMotion ? 0 : [0, -1, 0],
    transition: {
      duration: 8,
      ease: [0.42, 0, 0.58, 1] as const,
      repeat: Infinity,
    }
  }

  // Fade Up Entrance
  const fadeUpVariant = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOutExpo } }
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  }

  return (
    <div className={`min-h-screen bg-[#050506] text-[#EDEDEF] ${inter.variable} font-sans selection:bg-[#5E6AD2]/30 overflow-hidden relative`}>

      {/* Background System */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Base Gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#0a0a0f_0%,#050506_50%,#020203_100%)]" />

        {/* Noise Texture */}
        <div
          className="absolute inset-0 opacity-[0.015] mix-blend-overlay"
          style={{ backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjAwIDIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZUZpbHRlciI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgibm9pc2VGaWx0ZXIpIi8+PC9zdmc+')" }}
        />

        {/* Animated Gradient Blobs */}
        <motion.div animate={floatAnimation} className="absolute top-[-20%] left-[20%] w-[900px] h-[1400px] rounded-full bg-[#5E6AD2]/25 blur-[150px]" />
        <motion.div animate={floatAnimationSecondary} className="absolute top-[10%] left-[-10%] w-[600px] h-[800px] rounded-full bg-fuchsia-600/15 blur-[120px]" />
        <motion.div animate={floatAnimation} className="absolute top-[40%] right-[-10%] w-[500px] h-[700px] rounded-full bg-indigo-500/12 blur-[100px]" />

        {/* Grid Overlay */}
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 border-b border-white/[0.06] bg-[#050506]/50 backdrop-blur-xl">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#5E6AD2] to-[#6872D9] flex items-center justify-center shadow-[0_0_0_1px_rgba(94,106,210,0.5),inset_0_1px_0_0_rgba(255,255,255,0.2)]">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold tracking-tight text-lg">Aura</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#8A8F98]">
            <a href="#" className="hover:text-[#EDEDEF] transition-colors">Features</a>
            <a href="#" className="hover:text-[#EDEDEF] transition-colors">Documentation</a>
            <a href="#" className="hover:text-[#EDEDEF] transition-colors">Pricing</a>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <a href="#" className="text-sm font-medium text-[#8A8F98] hover:text-[#EDEDEF] transition-colors">Log in</a>
            <PrimaryButton className="py-2 px-4 text-sm">Sign Up</PrimaryButton>
          </div>

          <button className="md:hidden text-[#8A8F98] hover:text-[#EDEDEF]" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={{ height: isMobileMenuOpen ? 'auto' : 0, opacity: isMobileMenuOpen ? 1 : 0 }}
          className="md:hidden overflow-hidden bg-[#050506]/95 backdrop-blur-xl border-b border-white/[0.06]"
        >
          <div className="px-6 py-4 flex flex-col gap-4">
            <a href="#" className="text-lg font-medium text-[#8A8F98] hover:text-[#EDEDEF]">Features</a>
            <a href="#" className="text-lg font-medium text-[#8A8F98] hover:text-[#EDEDEF]">Documentation</a>
            <a href="#" className="text-lg font-medium text-[#8A8F98] hover:text-[#EDEDEF]">Pricing</a>
            <div className="h-px bg-white/[0.06] my-2" />
            <a href="#" className="text-lg font-medium text-[#8A8F98] hover:text-[#EDEDEF]">Log in</a>
            <PrimaryButton className="w-full justify-center">Sign Up</PrimaryButton>
          </div>
        </motion.div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10">

        {/* Hero Section */}
        <section className="container mx-auto px-6 py-24 md:py-32 lg:py-40 flex flex-col items-center text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl flex flex-col items-center"
          >
            <motion.div variants={fadeUpVariant} className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/30 bg-accent/10 text-xs font-mono tracking-widest text-[#6872D9] mb-8">
              <span className="w-2 h-2 rounded-full bg-[#5E6AD2] animate-pulse" />
              AURA V2 IS LIVE
            </motion.div>

            <motion.h1 variants={fadeUpVariant} className="text-4xl md:text-5xl lg:text-7xl font-semibold tracking-tight leading-[1.1] mb-6">
              The edge network for the <br className="hidden md:block" />
              <span className="bg-gradient-to-r from-[#5E6AD2] via-indigo-400 to-[#5E6AD2] bg-[length:200%_auto] animate-gradient-x bg-clip-text text-transparent">next generation</span> of apps.
            </motion.h1>

            <motion.p variants={fadeUpVariant} className="text-lg md:text-xl text-[#8A8F98] mb-10 max-w-2xl leading-relaxed">
              Deploy your infrastructure globally in milliseconds. Aura provides quantum routing, neural analytics, and absolute zero trust security out of the box.
            </motion.p>

            <motion.div variants={fadeUpVariant} className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <PrimaryButton className="w-full sm:w-auto">Get Started Free</PrimaryButton>
              <SecondaryButton className="w-full sm:w-auto">Read the Docs</SecondaryButton>
            </motion.div>
          </motion.div>

          <motion.div
             initial={{ opacity: 0, y: 40 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.4, ease: easeOutExpo }}
             className="w-full max-w-5xl mt-20 relative rounded-2xl border border-white/[0.06] bg-[#0a0a0c]/80 backdrop-blur-md shadow-2xl overflow-hidden aspect-video flex items-center justify-center"
          >
             <div className="absolute inset-0 bg-gradient-to-t from-[#020203] via-transparent to-transparent z-10" />
             {/* Mock Dashboard UI */}
             <div className="absolute top-0 w-full h-12 border-b border-white/[0.06] flex items-center px-4 gap-2 bg-white/[0.02]">
                <div className="w-3 h-3 rounded-full bg-white/20" />
                <div className="w-3 h-3 rounded-full bg-white/20" />
                <div className="w-3 h-3 rounded-full bg-white/20" />
             </div>
             <div className="w-full h-full p-8 pt-20 grid grid-cols-3 gap-6">
                <div className="col-span-2 space-y-6">
                   <div className="h-48 rounded-xl bg-white/[0.03] border border-white/[0.06] relative overflow-hidden">
                     <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-[#5E6AD2]/20 to-transparent" />
                     {/* Fake chart line */}
                     <svg className="absolute bottom-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                        <path d="M0,100 L0,50 Q25,30 50,60 T100,20 L100,100 Z" fill="rgba(94,106,210,0.1)" />
                        <path d="M0,50 Q25,30 50,60 T100,20" fill="none" stroke="#5E6AD2" strokeWidth="2" />
                     </svg>
                   </div>
                   <div className="grid grid-cols-2 gap-6">
                      <div className="h-24 rounded-xl bg-white/[0.03] border border-white/[0.06]" />
                      <div className="h-24 rounded-xl bg-white/[0.03] border border-white/[0.06]" />
                   </div>
                </div>
                <div className="col-span-1 rounded-xl bg-white/[0.03] border border-white/[0.06]" />
             </div>
          </motion.div>
        </section>

        {/* Separator */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Stats Section */}
        <section className="container mx-auto px-6 py-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {DATA.stats.map((stat, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5, ease: easeOutExpo } }
                }}
                className="flex flex-col items-center md:items-start"
              >
                <div className="text-4xl md:text-5xl font-semibold tracking-tight text-[#EDEDEF] mb-2">{stat.value}</div>
                <div className="text-sm font-mono tracking-widest text-[#8A8F98] uppercase">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Features Bento Grid */}
        <section className="container mx-auto px-6 py-24 md:py-32">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">Unprecedented performance.</h2>
            <p className="text-lg text-[#8A8F98] max-w-2xl">Everything you need to scale globally, built into a single platform with developer experience at its core.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-6 auto-rows-[220px]">
            {DATA.features.map((feature, i) => (
              <SpotlightCard key={i} className={`p-8 flex flex-col justify-end ${feature.colSpan} ${feature.rowSpan}`}>
                 <div className="w-12 h-12 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center mb-6 text-[#EDEDEF]">
                   <feature.icon className="w-6 h-6 text-[#6872D9]" />
                 </div>
                 <h3 className="text-xl font-semibold tracking-tight mb-2">{feature.title}</h3>
                 <p className="text-sm text-[#8A8F98]">{feature.description}</p>
              </SpotlightCard>
            ))}
          </div>
        </section>

        {/* Separator */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Pricing */}
        <section className="container mx-auto px-6 py-24 md:py-32">
           <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">Simple, transparent pricing.</h2>
            <p className="text-lg text-[#8A8F98] max-w-2xl mx-auto">Start for free, scale infinitely.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {DATA.pricing.map((tier, i) => (
              <SpotlightCard key={i} className={`p-8 flex flex-col relative ${tier.popular ? 'border-accent/30 shadow-[0_0_80px_rgba(94,106,210,0.1)] md:-translate-y-4' : ''}`}>
                {tier.popular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-[#5E6AD2] to-transparent" />
                )}
                <h3 className="text-xl font-semibold tracking-tight mb-2">{tier.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-semibold">{tier.price}</span>
                  {tier.price !== "Custom" && <span className="text-[#8A8F98] ml-2">/month</span>}
                </div>
                <p className="text-sm text-[#8A8F98] mb-8 h-10">{tier.description}</p>

                <ul className="space-y-4 mb-8 flex-1">
                  {tier.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm text-[#EDEDEF]">
                      <div className="w-5 h-5 rounded-full bg-white/[0.05] flex items-center justify-center">
                        <Check className="w-3 h-3 text-[#6872D9]" />
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>

                {tier.popular ? (
                  <PrimaryButton className="w-full">{tier.cta}</PrimaryButton>
                ) : (
                  <SecondaryButton className="w-full">{tier.cta}</SecondaryButton>
                )}
              </SpotlightCard>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="container mx-auto px-6 py-24 md:py-32 relative">
           <div className="absolute inset-0 bg-gradient-to-b from-[#5E6AD2]/10 to-transparent opacity-50 rounded-3xl blur-3xl -z-10" />
           <div className="rounded-3xl border border-white/[0.06] bg-gradient-to-b from-white/[0.05] to-transparent p-12 md:p-20 text-center relative overflow-hidden">
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-[#5E6AD2]/50 to-transparent" />
             <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-6">Ready to deploy?</h2>
             <p className="text-xl text-[#8A8F98] mb-10 max-w-2xl mx-auto">Join thousands of developers building the future of the web on Aura.</p>
             <PrimaryButton className="text-lg px-8 py-4">Start Building Free</PrimaryButton>
           </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/[0.06] bg-[#020203] py-12 text-[#8A8F98] text-sm">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
           <div className="flex items-center gap-2 text-[#EDEDEF]">
            <Zap className="w-4 h-4 text-[#5E6AD2]" />
            <span className="font-semibold tracking-tight">Aura</span>
          </div>
          <p>© 2024 Aura Technologies Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#EDEDEF] transition-colors">Twitter</a>
            <a href="#" className="hover:text-[#EDEDEF] transition-colors">GitHub</a>
            <a href="#" className="hover:text-[#EDEDEF] transition-colors">Discord</a>
          </div>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }
      `}} />
      
      </div>
  )
}
