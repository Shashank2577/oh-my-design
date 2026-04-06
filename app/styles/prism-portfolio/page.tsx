'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { 
  Palette, 
  Layers, 
  Box, 
  Sparkles, 
  MousePointer2, 
  ChevronRight, 
  Mail,
  Camera,
  Send,
  Globe,
  Layout
} from 'lucide-react'
import { Syne, Inter } from 'next/font/google'

const syne = Syne({ subsets: ['latin'], weight: ['400', '700', '800'] })
const inter = Inter({ subsets: ['latin'] })

// --- Design Tokens ---
const tokens = {
  colors: {
    background: "#000000",
    surface: "rgba(20, 20, 20, 0.5)",
    accent1: "#00FFF0", // Cyan Prism
    accent2: "#FF00F5", // Magenta Prism
    accent3: "#FFFF00", // Yellow Prism
    border: "rgba(255, 255, 255, 0.1)",
    textHigh: "#FFFFFF",
    textLow: "#A0A0A0"
  },
  physics: {
    floating: {
      y: [-10, 10, -10],
      transition: { repeat: Infinity, duration: 5, ease: "easeInOut" }
    },
    prismatic: {
      textShadow: [
        "2px 2px 0px #00FFF0, -2px -2px 0px #FF00F5",
        "-2px 2px 0px #00FFF0, 2px -2px 0px #FF00F5",
        "2px -2px 0px #00FFF0, -2px -2px 0px #FF00F5",
        "2px 2px 0px #00FFF0, -2px -2px 0px #FF00F5"
      ],
      transition: { repeat: Infinity, duration: 2 }
    }
  }
}



// --- Components ---

const PrismButton = ({ children, variant = 'primary', className = '' }: any) => (
  <motion.button
    whileHover={{ scale: 1.05, letterSpacing: '0.1em' }}
    whileTap={{ scale: 0.95 }}
    className={`px-10 py-4 ${syne.className} font-extrabold text-sm tracking-widest relative group overflow-hidden ${
      variant === 'primary' 
        ? `bg-white text-black` 
        : `bg-transparent text-white border border-white/20`
    } ${className}`}
  >
    <span className="relative z-10 flex items-center justify-center gap-2 uppercase">{children}</span>
    <div className="absolute inset-0 bg-gradient-to-r from-[#00FFF0] via-[#FF00F5] to-[#FFFF00] opacity-0 group-hover:opacity-20 transition-opacity" />
  </motion.button>
)

const GlassPrismCard = ({ children, className = '' }: any) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    whileHover={{ y: -10 }}
    className={`bg-white/5 border border-white/10 backdrop-blur-2xl p-10 relative overflow-hidden group ${className}`}
  >
    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00FFF0] via-[#FF00F5] to-[#FFFF00] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    {children}
  </motion.div>
)

// --- Sections ---

const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 px-6 py-8">
    <div className="max-w-7xl mx-auto flex items-center justify-between">
      <div className={`flex items-center gap-3 ${syne.className} text-2xl font-extrabold tracking-tighter`}>
        <div className="w-8 h-8 bg-white rotate-45 flex items-center justify-center">
          <Box className="text-black -rotate-45" size={16} />
        </div>
        PRISM<span className="font-light opacity-50">STUDIO</span>
      </div>
      <div className="hidden md:flex items-center gap-12 text-[10px] font-bold tracking-[0.4em] uppercase">
        {['Work', 'Vision', 'Process', 'Contact'].map(item => (
          <a key={item} href="#" className="hover:text-[#00FFF0] transition-colors relative group">
            {item}
            <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-[#00FFF0] group-hover:width-full transition-all" />
          </a>
        ))}
      </div>
      <PrismButton className="hidden md:block py-2 px-6 text-[10px]">HIRE_US</PrismButton>
    </div>
  </nav>
)

const Hero = () => {
  const { scrollYProgress } = useScroll()
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360])

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <motion.div 
          style={{ rotate }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full"
        />
        <motion.div 
          style={{ rotate: useTransform(scrollYProgress, [0, 1], [360, 0]) }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/10 rounded-full"
        />
      </div>
      
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`inline-block mb-8 px-6 py-2 border border-white/10 rounded-full text-[10px] tracking-[0.5em] font-bold uppercase ${inter.className}`}
        >
          Creative Visionary Agency
        </motion.div>
        <motion.h1 
          animate={tokens.physics.prismatic as any}
          className={`${syne.className} text-7xl md:text-[12rem] font-extrabold leading-[0.8] mb-12 uppercase italic`}
        >
          REFRACT <br/> REALITY.
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className={`text-white/50 text-xl max-w-2xl mx-auto mb-16 leading-relaxed ${inter.className}`}
        >
          We build digital experiences that live at the intersection of high-fidelity motion and chromatic beauty.
        </motion.p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
          <PrismButton>VIEW_PORTFOLIO</PrismButton>
          <PrismButton variant="secondary">OUR_PROCESS</PrismButton>
        </div>
      </div>
      
      <motion.div 
        animate={tokens.physics.floating as any}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/20 flex flex-col items-center gap-4"
      >
        <div className="text-[10px] tracking-[0.5em] uppercase font-bold">Scroll</div>
        <div className="w-px h-20 bg-gradient-to-b from-white/20 to-transparent" />
      </motion.div>
    </section>
  )
}

const StatsBar = () => (
  <section className="py-24 border-y border-white/5 relative overflow-hidden">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
        {[
          { label: 'Awards Won', value: '42', icon: Award },
          { label: 'Happy Clients', value: '150+', icon: Users },
          { label: 'Projects Live', value: '280+', icon: Layers },
          { label: 'Coffee Cups', value: '12K', icon: Sparkles }
        ].map((stat, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.1 }}
            className="flex flex-col items-center text-center"
          >
            <div className={`${syne.className} text-6xl font-extrabold text-white mb-2`}>{stat.value}</div>
            <div className="text-[10px] tracking-[0.4em] uppercase font-bold text-white/30">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)

const Features = () => (
  <section className="py-32 px-6">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-start justify-between mb-24 gap-12">
        <h2 className={`${syne.className} text-6xl font-extrabold uppercase italic leading-none`}>OUR_CORE <br/><span className="text-white/20">CAPABILITIES</span></h2>
        <p className="text-white/40 max-w-md text-lg leading-relaxed">We don't just design; we engineer emotions through light and motion.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {[
          { title: 'Chromatic Branding', desc: 'Brand identities that shift and evolve based on user interaction and digital environment.', icon: Palette },
          { title: '3D Spatial Design', desc: 'Moving beyond flat screens into immersive 3D environments using perspective mapping.', icon: Box },
          { title: 'Motion Manifestos', desc: 'Interactive storytelling driven by physics-based animations and scroll-triggered events.', icon: Layers },
          { title: 'Prismatic UX', desc: 'User experiences designed to delight through light refraction and subtle color theory.', icon: Sparkles },
          { title: 'Fluid Interfaces', desc: 'Liquid-smooth transitions that eliminate page-load friction and maintain focus.', icon: MousePointer2 },
          { title: 'Visionary Strategy', desc: 'Strategic consulting for brands that want to lead the next era of the digital web.', icon: Globe }
        ].map((feature, i) => (
          <GlassPrismCard key={i}>
            <feature.icon className="text-[#00FFF0] mb-8" size={40} />
            <h3 className={`${syne.className} text-2xl font-extrabold text-white mb-4 uppercase tracking-tighter`}>{feature.title}</h3>
            <p className="text-white/40 text-sm leading-relaxed">{feature.desc}</p>
          </GlassPrismCard>
        ))}
      </div>
    </div>
  </section>
)

const ProductDetail = () => (
  <section className="py-32 px-6 bg-white text-black overflow-hidden relative">
    <div className="absolute top-0 right-0 p-20 opacity-10">
      <Box size={400} strokeWidth={1} className="rotate-12" />
    </div>
    <div className="max-w-7xl mx-auto relative z-10">
      <div className="grid lg:grid-cols-2 gap-24 items-center">
        <div>
          <div className="text-[10px] tracking-[0.5em] font-bold uppercase mb-8 opacity-50">Experimental Lab // V3.0</div>
          <h2 className={`${syne.className} text-6xl font-extrabold uppercase leading-[0.9] mb-12`}>BEYOND THE <br/> STATIC GRID.</h2>
          <div className="space-y-8 text-black/60 text-xl leading-relaxed">
            <p>The web is no longer a static document. It is a living, breathing canvas of light. At Prism, we treat every pixel as a photon, waiting to be directed.</p>
            <p>Our implementation of chromatic aberration and 3D depth isn't just aesthetic—it's a fundamental shift in how users perceive digital value.</p>
          </div>
          <PrismButton className="mt-12 !bg-black !text-white">LEARN_MORE</PrismButton>
        </div>
        <div className="relative">
          <div className="aspect-square bg-black rounded-3xl p-12 flex flex-col justify-between group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#00FFF0] via-[#FF00F5] to-[#FFFF00] opacity-0 group-hover:opacity-20 transition-opacity" />
            <div className="flex justify-between items-start">
              <Box className="text-white" size={48} strokeWidth={1} />
              <div className="text-white/30 text-[10px] font-bold tracking-[0.4em] uppercase">Render_ID: 8492</div>
            </div>
            <div className="space-y-4">
              <div className={`${syne.className} text-4xl text-white font-extrabold`}>92.4%</div>
              <div className="text-white/40 text-[10px] font-bold tracking-[0.4em] uppercase italic">Engagement Multiplier</div>
            </div>
          </div>
          <motion.div 
            animate={{ rotate: -5, y: [0, 20, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -bottom-10 -left-10 bg-[#FF00F5] p-10 rounded-2xl shadow-2xl"
          >
            <Sparkles className="text-white" size={32} />
          </motion.div>
        </div>
      </div>
    </div>
  </section>
)

const Pricing = () => (
  <section className="py-32 px-6">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-24">
        <h2 className={`${syne.className} text-6xl font-extrabold uppercase`}>INVESTMENT_TIERS</h2>
        <p className="text-white/30 mt-4 tracking-widest text-[10px] uppercase font-bold">Scaling vision into reality.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-12">
        {[
          { name: 'Prism_Light', price: '$5K', features: ['Custom Brand Identity', '3-Page Landing Set', 'Standard Motion Kit', 'Mobile Optimization'] },
          { name: 'Prism_Full', price: '$15K', features: ['Full Spatial UX', 'Unlimited Sub-pages', 'Custom 3D Assets', 'Advanced Motion Kit', '24/7 Vision Support'], highlight: true },
          { name: 'Prism_Omni', price: '$50K', features: ['Web3 Integration', 'AR/VR Laboratory', 'Custom Physics Engine', 'White-label Platform', 'Visionary Board Seat'] }
        ].map((tier, i) => (
          <GlassPrismCard key={i} className={tier.highlight ? 'border-[#00FFF0]/50' : ''}>
            <div className={`${syne.className} text-2xl font-extrabold text-white mb-2 uppercase`}>{tier.name}</div>
            <div className="flex items-baseline gap-2 mb-12">
              <span className={`${syne.className} text-6xl font-extrabold text-white`}>{tier.price}</span>
              <span className="text-white/20 text-[10px] font-bold tracking-widest">/ START</span>
            </div>
            <ul className="space-y-6 mb-16">
              {tier.features.map(f => (
                <li key={f} className="flex items-center gap-4 text-xs font-bold text-white/40 uppercase tracking-wider">
                  <ChevronRight size={14} className="text-[#00FFF0]" />
                  {f}
                </li>
              ))}
            </ul>
            <PrismButton className="w-full" variant={tier.highlight ? 'primary' : 'secondary'}>SECURE_SLOT</PrismButton>
          </GlassPrismCard>
        ))}
      </div>
    </div>
  </section>
)

const Testimonials = () => (
  <section className="py-32 px-6 bg-white/5 border-y border-white/5">
    <div className="max-w-7xl mx-auto">
      <h2 className={`${syne.className} text-5xl font-extrabold uppercase mb-24 text-center italic`}>VOICES_FROM_BEYOND</h2>
      <div className="grid md:grid-cols-3 gap-16">
        {[
          { name: 'Alex Rivera', role: 'CEO', company: 'NeuralNote', quote: 'Prism redefined how we think about light on the web. The chromatic aberrations added a depth we didn\'t think was possible.' },
          { name: 'Sophia Chen', role: 'Director', company: 'Velocity', quote: 'The spatial UX they built for our scoreboard increased engagement by 40% in the first week. Visionary work.' },
          { name: 'Marcus Vane', role: 'Lead', company: 'FragLine', quote: 'They didn\'t just give us a site; they gave us a digital weapon. The mechanical physics are unmatched.' }
        ].map((t, i) => (
          <div key={i} className="flex flex-col gap-8">
            <div className="flex gap-1">
              {[...Array(5)].map((_, j) => (
                <div key={j} className="w-2 h-2 bg-gradient-to-tr from-[#00FFF0] to-[#FF00F5] rotate-45" />
              ))}
            </div>
            <p className={`${syne.className} text-2xl font-bold text-white leading-tight italic`}>"{t.quote}"</p>
            <div>
              <div className={`${syne.className} text-lg font-extrabold text-white uppercase`}>{t.name}</div>
              <div className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em] mt-1">{t.role} // {t.company}</div>
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
    <section className="py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className={`${syne.className} text-5xl font-extrabold uppercase mb-16 text-center`}>CURIOUS_MINDS</h2>
        <div className="space-y-6">
          {[
            { q: 'What is Chromatic Aberration?', a: 'It is an optical effect where light is refracted through a lens into its constituent colors. We mimic this digitally to create depth and experimental beauty.' },
            { q: 'How long does a project take?', a: 'Light tiers take 4-6 weeks. Full and Omni tiers are intensive processes spanning 3-6 months depending on the spatial complexity.' },
            { q: 'Do you handle 3D modeling?', a: 'Yes. Our in-house spatial lab handles everything from low-poly assets to high-fidelity physics-based models.' },
            { q: 'Can we integrate with Web3?', a: 'Absolutely. We specialize in building the front-end for the next generation of decentralized and prismatic applications.' }
          ].map((item, i) => (
            <div key={i} className={`border-b border-white/10 overflow-hidden transition-all duration-500 ${open === i ? 'pb-8' : 'pb-0'}`}>
              <button 
                onClick={() => setOpen(open === i ? -1 : i)}
                className="w-full py-8 flex items-center justify-between text-left"
              >
                <span className={`${syne.className} text-xl font-extrabold text-white uppercase tracking-tighter`}>{item.q}</span>
                <div className={`w-6 h-6 border border-white/20 flex items-center justify-center transition-transform ${open === i ? 'rotate-45' : ''}`}>
                  <ChevronRight size={14} />
                </div>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="text-white/40 text-sm leading-relaxed"
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
  <section className="py-32 px-6 border-y border-white/5 relative overflow-hidden bg-black">
    <div className="absolute inset-0 bg-gradient-to-tr from-[#00FFF0]/5 to-[#FF00F5]/5" />
    <div className="max-w-4xl mx-auto text-center relative z-10">
      <div className="w-12 h-12 bg-white rotate-45 mx-auto mb-12 flex items-center justify-center">
        <Mail className="text-black -rotate-45" size={20} />
      </div>
      <h2 className={`${syne.className} text-7xl font-extrabold uppercase italic mb-8`}>ENTER_THE_PRISM.</h2>
      <p className="text-white/30 mb-12 max-w-xl mx-auto tracking-widest text-[10px] font-bold uppercase">Weekly vision drops and experimental motion labs.</p>
      <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
        <input 
          type="email" 
          placeholder="SOURCE_EMAIL" 
          className="flex-1 bg-white/5 border border-white/10 px-8 py-4 text-white focus:outline-none focus:border-white transition-all text-xs font-bold tracking-widest uppercase"
        />
        <PrismButton>SUBSCRIBE</PrismButton>
      </div>
    </div>
  </section>
)

const Footer = () => (
  <footer className="py-24 px-6">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-16 mb-24">
        <div className="col-span-2">
          <div className={`${syne.className} text-2xl font-extrabold uppercase mb-8`}>PRISM<span className="font-light opacity-50">STUDIO</span></div>
          <p className="text-white/30 text-xs leading-loose font-bold uppercase tracking-[0.2em] max-w-xs">Building the visual language of the prismatic era. Spatial, high-fidelity, and uncompromisingly creative.</p>
        </div>
        {[
          { title: 'Vision', links: ['Work', 'Lab', 'Strategy', 'Archive'] },
          { title: 'Agency', links: ['About', 'Vision', 'Careers', 'Brand'] },
          { title: 'Connect', links: ['Twitter', 'Instagram', 'Figma', 'Behance'] }
        ].map(group => (
          <div key={group.title}>
            <div className="text-[10px] font-bold text-white uppercase tracking-[0.4em] mb-8">{group.title}</div>
            <ul className="space-y-6">
              {group.links.map(link => (
                <li key={link}><a href="#" className="text-white/30 text-[10px] font-bold tracking-[0.3em] uppercase hover:text-[#00FFF0] transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-white/20 text-[10px] font-bold tracking-[0.5em] uppercase">© 2026 PRISM STUDIO LABS. ALL LIGHTS RESERVED.</div>
        <div className="flex gap-8">
          <Camera className="text-white/20 hover:text-white transition-colors cursor-pointer" size={18} />
          <Send className="text-white/20 hover:text-white transition-colors cursor-pointer" size={18} />
          <Layout className="text-white/20 hover:text-white transition-colors cursor-pointer" size={18} />
        </div>
      </div>
    </div>
  </footer>
)

const Award = ({ className, size }: any) => <Sparkles className={className} size={size} />
const Users = ({ className, size }: any) => <MousePointer2 className={className} size={size} />

export default function PrismPortfolio() {
  return (
    <div className={`min-h-screen bg-black text-white overflow-x-hidden ${inter.className}`}>
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
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.08] mix-blend-overlay contrast-150">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <filter id="prism-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100" height="100" filter="url(#prism-noise)" />
        </svg>
      </div>
    </div>
  )
}
