'use client'

import { motion, useReducedMotion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Cinzel, Montserrat } from 'next/font/google'
import {
  Diamond, Box, Shield, Star, Crown, Layers, Zap, Hexagon, Maximize
} from 'lucide-react'

const cinzel = Cinzel({ subsets: ['latin'], variable: '--font-cinzel' })
const montserrat = Montserrat({ subsets: ['latin'], weight: ['300', '400', '600'], variable: '--font-montserrat' })

const tokens = {
  background: '#0F0F1A',
  surface: '#1A1A2E',
  accent: '#D4AF37', // Gold Leaf
  textHigh: '#FFFFFF',
  textLow: '#A0A0B0',
}

const PRODUCT_NAME = 'FanCave'
const TAGLINE = 'Curate The Rare.'
const DESCRIPTION = 'A digital sanctuary for your most prized collectibles. Experience tangible ownership in the digital realm with museum-grade 3D display technology.'

function CardViewer({ children }: { children: React.ReactNode }) {
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    // Max rotation of 15 degrees
    const rotateXValue = ((y - centerY) / centerY) * -15
    const rotateYValue = ((x - centerX) / centerX) * 15

    setRotateX(rotateXValue)
    setRotateY(rotateYValue)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <div
      className="perspective-1000 w-full h-full flex items-center justify-center"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        animate={{ rotateX, rotateY }}
        transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 2 }}
        className="w-full h-full relative preserve-3d"
      >
        {children}
      </motion.div>
    </div>
  )
}

export default function FanCavePage() {
  const { scrollY } = useScroll()
  const bgY = useTransform(scrollY, [0, 1000], [0, 200])

  return (
    <div className={`${cinzel.variable} ${montserrat.variable} font-sans min-h-screen text-white overflow-hidden`}
         style={{ background: `radial-gradient(circle at 50% 0%, #2A2A4A 0%, ${tokens.background} 70%)` }}>

      {/* Ambient Dust Particles (simplified via CSS background pattern for performance) */}
      <div className="fixed inset-0 pointer-events-none opacity-20 mix-blend-screen"
           style={{ backgroundImage: 'radial-gradient(circle, #D4AF37 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      <Navbar />
      <main className="relative z-10">
        <Hero />
        <Stats />
        <Features />
        <VaultSection />
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
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Diamond className="w-6 h-6" style={{ color: tokens.accent }} />
          <span className="font-serif text-2xl tracking-widest">{PRODUCT_NAME}</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {['Vault', 'Market', 'Prestige'].map(link => (
            <a key={link} href={`#`} className="text-sm tracking-[0.2em] uppercase hover:text-[#D4AF37] transition-colors" style={{ color: tokens.textLow }}>
              {link}
            </a>
          ))}
        </div>
        <button className="px-6 py-2 border text-sm tracking-[0.2em] uppercase transition-all duration-300 hover:bg-[#D4AF37] hover:text-black hover:border-[#D4AF37]"
                style={{ borderColor: tokens.accent, color: tokens.accent }}>
          Connect Wallet
        </button>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section className="min-h-screen flex items-center pt-20">
      <div className="max-w-7xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] }}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="h-[1px] w-12" style={{ backgroundColor: tokens.accent }} />
            <p className="text-xs tracking-[0.3em] uppercase" style={{ color: tokens.accent }}>Premium Artifacts</p>
          </div>
          <h1 className="font-serif text-6xl md:text-8xl leading-tight mb-8 drop-shadow-2xl">
            {TAGLINE}
          </h1>
          <p className="text-lg font-light tracking-wide max-w-lg mb-10 leading-relaxed" style={{ color: tokens.textLow }}>
            {DESCRIPTION}
          </p>
          <button className="px-10 py-4 font-serif text-lg tracking-widest text-black relative group overflow-hidden"
                  style={{ backgroundColor: tokens.accent }}>
            <span className="relative z-10">Enter The Vault</span>
            <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
          </button>
        </motion.div>

        <div className="h-[600px] w-full py-12">
          <CardViewer>
             <div className="w-full max-w-[380px] aspect-[2/3] mx-auto rounded-xl relative overflow-hidden shadow-2xl border"
                  style={{ borderColor: 'rgba(212, 175, 55, 0.4)', background: 'linear-gradient(145deg, #1A1A2E, #0F0F1A)', boxShadow: '0 30px 60px rgba(0,0,0,0.8), 0 0 40px rgba(212, 175, 55, 0.2)' }}>
                {/* Glint effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />

                <div className="absolute inset-4 border border-white/10 rounded-lg p-6 flex flex-col justify-between">
                   <div className="flex justify-between items-start">
                      <Crown className="w-8 h-8" style={{ color: tokens.accent }} />
                      <div className="text-right">
                         <div className="text-xs tracking-[0.2em]" style={{ color: tokens.textLow }}>EDITION</div>
                         <div className="font-serif text-xl" style={{ color: tokens.accent }}>1/1</div>
                      </div>
                   </div>

                   <div className="text-center">
                     {/* Holographic placeholder */}
                     <motion.div
                       animate={{ y: [-5, 5, -5] }}
                       transition={{ repeat: Infinity, duration: 4, ease: [0.42, 0, 0.58, 1] as [number, number, number, number] }}
                       className="w-32 h-32 mx-auto rounded-full mix-blend-screen opacity-80"
                       style={{ background: 'radial-gradient(circle, #D4AF37 0%, transparent 70%)', filter: 'blur(10px)' }}
                     />
                   </div>

                   <div>
                      <div className="text-xs tracking-widest mb-1" style={{ color: tokens.textLow }}>ARTIFACT NO. 042</div>
                      <h3 className="font-serif text-2xl">The Golden Standard</h3>
                   </div>
                </div>
             </div>
          </CardViewer>
        </div>
      </div>
    </section>
  )
}

function Stats() {
  return (
    <section className="py-20 border-y border-white/5 bg-black/20">
      <div className="max-w-6xl mx-auto px-6 flex justify-around flex-wrap gap-8">
        {[
          { v: '$12M+', l: 'Volume Traded' },
          { v: '8,402', l: 'Artifacts Secured' },
          { v: '0.01%', l: 'Authentication Error' }
        ].map((s, i) => (
          <div key={i} className="text-center">
            <div className="font-serif text-4xl mb-3 drop-shadow-md" style={{ color: tokens.accent }}>{s.v}</div>
            <div className="text-xs tracking-[0.2em] uppercase font-light" style={{ color: tokens.textLow }}>{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

function Features() {
  const features = [
    { icon: Box, title: '3D Card Viewer', desc: 'Full 360-degree rotation with realistic lighting shaders.' },
    { icon: Shield, title: 'Holographic Vault', desc: 'Military-grade security with scanning laser transitions.' },
    { icon: Zap, title: 'Rarity Meter', desc: 'Liquid-fill gauges that glow based on item scarcity.' }
  ]
  return (
    <section className="py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-24">
          <h2 className="font-serif text-4xl md:text-5xl mb-6">Museum-Grade Display</h2>
          <p className="font-light tracking-wide max-w-2xl mx-auto" style={{ color: tokens.textLow }}>
            We treat digital items with the reverence of physical artifacts, emphasizing texture, lighting, and rarity.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10, backgroundColor: 'rgba(212, 175, 55, 0.05)' }}
              transition={{ duration: 0.3 }}
              className="p-10 border rounded-sm"
              style={{ borderColor: 'rgba(255,255,255,0.05)', backgroundColor: tokens.surface }}
            >
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-8 bg-black/50 border border-white/10">
                <f.icon className="w-6 h-6" style={{ color: tokens.accent }} />
              </div>
              <h3 className="font-serif text-xl mb-4">{f.title}</h3>
              <p className="font-light text-sm leading-relaxed" style={{ color: tokens.textLow }}>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function VaultSection() {
  return (
    <section className="py-32 bg-black relative overflow-hidden">
      {/* Laser Scanning line */}
      <motion.div
        animate={{ top: ['0%', '100%', '0%'] }}
        transition={{ duration: 8, ease: [0, 0, 1, 1] as [number, number, number, number], repeat: Infinity }}
        className="absolute left-0 right-0 h-[2px] z-20 pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.8), transparent)', boxShadow: '0 0 20px rgba(212, 175, 55, 0.5)' }}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-16">
        <div className="flex-1">
          <h2 className="font-serif text-4xl md:text-5xl mb-6">The Holographic Vault</h2>
          <p className="font-light tracking-wide text-lg mb-8" style={{ color: tokens.textLow }}>
            Secure your rarest pieces behind our proprietary cryptographic grid. Every interaction is verified. Every artifact is eternally preserved.
          </p>
          <div className="flex items-center gap-4">
             <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                   className="h-full rounded-full"
                   style={{ backgroundColor: tokens.accent }}
                   initial={{ width: 0 }}
                   whileInView={{ width: '99.9%' }}
                   transition={{ duration: 2, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] }}
                   viewport={{ once: true }}
                />
             </div>
             <span className="text-sm font-bold tracking-widest" style={{ color: tokens.accent }}>99.9% UPTIME</span>
          </div>
        </div>

        <div className="flex-1">
           {/* Abstract Vault Visualization */}
           <div className="aspect-square border border-white/10 rounded-full relative flex items-center justify-center p-8" style={{ background: 'radial-gradient(circle, #1A1A2E 0%, transparent 70%)' }}>
              <div className="w-full h-full border border-white/5 rounded-full flex items-center justify-center animate-spin-slow" style={{ animationDuration: '20s' }}>
                 <div className="w-2/3 h-2/3 border border-[#D4AF37]/30 rounded-full flex items-center justify-center animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '15s' }}>
                    <Hexagon className="w-16 h-16" style={{ color: tokens.accent }} />
                 </div>
              </div>
           </div>
        </div>
      </div>
    </section>
  )
}

function Pricing() {
  return (
    <section className="py-32">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="font-serif text-4xl mb-4">Membership Tiers</h2>
          <div className="w-16 h-[1px] mx-auto" style={{ backgroundColor: tokens.accent }} />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
           <div className="p-10 border border-white/10 bg-[#1A1A2E]/50 backdrop-blur-sm relative">
              <h3 className="font-serif text-2xl mb-2">Collector</h3>
              <div className="text-4xl font-light mb-8">Free</div>
              <ul className="space-y-4 mb-10 text-sm tracking-wide font-light" style={{ color: tokens.textLow }}>
                 <li className="flex items-center gap-3"><div className="w-1 h-1 rounded-full bg-white/30" /> Store up to 50 artifacts</li>
                 <li className="flex items-center gap-3"><div className="w-1 h-1 rounded-full bg-white/30" /> Standard 3D viewer</li>
                 <li className="flex items-center gap-3"><div className="w-1 h-1 rounded-full bg-white/30" /> Community access</li>
              </ul>
              <button className="w-full py-4 border border-white/20 text-xs tracking-widest uppercase hover:bg-white/5 transition-colors">Join Free</button>
           </div>

           <div className="p-10 border relative overflow-hidden" style={{ borderColor: tokens.accent, backgroundColor: '#1A1A2E' }}>
              <div className="absolute top-0 right-0 bg-[#D4AF37] text-black text-xs font-bold tracking-widest px-4 py-1 uppercase">Curator</div>
              <h3 className="font-serif text-2xl mb-2 text-[#D4AF37]">Curator</h3>
              <div className="text-4xl font-light mb-8">2.5<span className="text-lg"> ETH</span><span className="text-xs text-white/50 block tracking-widest uppercase mt-1">Lifetime Pass</span></div>
              <ul className="space-y-4 mb-10 text-sm tracking-wide font-light text-white/80">
                 <li className="flex items-center gap-3"><div className="w-1 h-1 rounded-full bg-[#D4AF37]" /> Unlimited vault storage</li>
                 <li className="flex items-center gap-3"><div className="w-1 h-1 rounded-full bg-[#D4AF37]" /> High-res glint shaders</li>
                 <li className="flex items-center gap-3"><div className="w-1 h-1 rounded-full bg-[#D4AF37]" /> Early access to mints</li>
                 <li className="flex items-center gap-3"><div className="w-1 h-1 rounded-full bg-[#D4AF37]" /> Physical framing service</li>
              </ul>
              <button className="w-full py-4 text-black text-xs tracking-widest uppercase" style={{ backgroundColor: tokens.accent }}>Mint Pass</button>
           </div>
        </div>
      </div>
    </section>
  )
}

function Testimonials() {
  return (
    <section className="py-24 border-y border-white/5 relative bg-[#0F0F1A]/80 backdrop-blur-lg">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="font-serif text-3xl text-center mb-16 opacity-80">Revered by Collectors</h2>
        <div className="grid md:grid-cols-3 gap-12 text-center">
           {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col items-center">
                 <div className="w-12 h-12 rounded-full border border-[#D4AF37]/50 mb-6 flex items-center justify-center bg-black/50">
                    <Star className="w-4 h-4 text-[#D4AF37] fill-current" />
                 </div>
                 <p className="font-serif text-lg leading-relaxed mb-6">"The tactile feel of the 3D viewer makes digital ownership finally click. It's beautiful."</p>
                 <div className="text-xs tracking-[0.2em] uppercase font-light" style={{ color: tokens.accent }}>0xALEX...9A2F</div>
              </div>
           ))}
        </div>
      </div>
    </section>
  )
}

function FAQ() {
  return (
    <section className="py-32">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="font-serif text-4xl text-center mb-16">Inquiries</h2>
        <div className="space-y-2">
           {[
             { q: "Which blockchains are supported?", a: "Currently Ethereum and Polygon. Solana integration is in beta." },
             { q: "How does the physical framing work?", a: "Curator pass holders receive one free museum-quality physical print with embedded NFC verification per year." }
           ].map((faq, i) => (
              <details key={i} className="group border-b border-white/10 p-6 cursor-pointer">
                 <summary className="font-serif text-xl list-none flex justify-between items-center">
                    {faq.q}
                    <span className="text-[#D4AF37] group-open:rotate-45 transition-transform duration-300">+</span>
                 </summary>
                 <p className="mt-6 font-light tracking-wide text-sm leading-relaxed" style={{ color: tokens.textLow }}>{faq.a}</p>
              </details>
           ))}
        </div>
      </div>
    </section>
  )
}

function Newsletter() {
  return (
    <section className="py-32 text-center">
      <div className="max-w-xl mx-auto px-6">
        <Diamond className="w-8 h-8 mx-auto mb-8" style={{ color: tokens.accent }} />
        <h2 className="font-serif text-3xl mb-4">Join the Inner Circle</h2>
        <p className="font-light tracking-wide text-sm mb-10" style={{ color: tokens.textLow }}>Receive private invitations to curated drops and auctions.</p>
        <div className="flex border-b border-white/30 focus-within:border-[#D4AF37] transition-colors pb-2">
           <input type="email" placeholder="Your email address" className="flex-1 bg-transparent outline-none font-serif text-lg placeholder-white/30" />
           <button className="text-xs tracking-[0.2em] uppercase hover:text-[#D4AF37] transition-colors">Subscribe</button>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="py-12 border-t border-white/5 text-center bg-black">
      <span className="font-serif text-xl tracking-widest mb-4 block opacity-80">{PRODUCT_NAME}</span>
      <p className="text-xs tracking-[0.3em] uppercase opacity-40">© 2026. Rare & Immutable.</p>
    </footer>
  )
}
