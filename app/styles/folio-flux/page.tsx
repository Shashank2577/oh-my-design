'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { 
  Palette, 
  Layers, 
  ChevronRight, 
  Mail,
  Camera,
  Globe,
  Layout,
  Maximize2,
  MousePointer2,
  Sparkles,
  ArrowRight
} from 'lucide-react'
import { Bricolage_Grotesque, Inter } from 'next/font/google'

const bricolage = Bricolage_Grotesque({ subsets: ['latin'] })
const inter = Inter({ subsets: ['latin'] })

// --- Design Tokens (Dynamic) ---
const projects = [
  { id: 1, name: 'Aether Lab', cat: 'Digital Art', color: '#FF3E00', bg: '#FFFFFF' },
  { id: 2, name: 'Neon Noir', cat: 'Cinematography', color: '#00F3FF', bg: '#0A0A0A' },
  { id: 3, name: 'Terra Form', cat: 'Architecture', color: '#10B981', bg: '#F3F4F6' },
  { id: 4, name: 'Prism Corp', cat: 'Branding', color: '#7000FF', bg: '#000000' }
]

// --- Components ---

const FluxButton = ({ children, variant = 'primary', accent = '#000000', className = '' }: any) => (
  <motion.button
    whileHover={{ scale: 1.05, letterSpacing: '0.1em' }}
    whileTap={{ scale: 0.95 }}
    className={`px-12 py-5 ${bricolage.className} font-extrabold text-lg tracking-tight relative group overflow-hidden ${
      variant === 'primary' 
        ? `text-white` 
        : `bg-transparent border`
    } ${className}`}
    style={{ backgroundColor: variant === 'primary' ? accent : 'transparent', borderColor: accent, color: variant === 'primary' ? '#FFF' : accent }}
  >
    <span className="relative z-10 flex items-center justify-center gap-2 uppercase">{children}</span>
    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
  </motion.button>
)

const MorphCard = ({ children, className = '', accent = '#000' }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={`relative group ${className}`}
  >
    <div className="absolute inset-0 -m-4 bg-gradient-to-br from-transparent to-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
    <div className="relative z-10">{children}</div>
  </motion.div>
)

// --- Sections ---

const Navbar = ({ accent = '#000' }: any) => (
  <nav className="fixed top-0 w-full z-50 px-10 py-12">
    <div className="max-w-7xl mx-auto flex items-center justify-between">
      <div className={`flex items-center gap-3 ${bricolage.className} text-3xl font-black tracking-tighter`} style={{ color: accent }}>
        FOLIO<span className="font-light opacity-40">FLUX</span>
      </div>
      <div className="hidden md:flex items-center gap-16 text-[10px] font-black tracking-[0.5em] uppercase" style={{ color: accent }}>
        {['Gallery', 'Vision', 'Studio', 'Contact'].map(item => (
          <a key={item} href="#" className="hover:opacity-50 transition-opacity relative group">
            {item}
            <span className="absolute -bottom-2 left-0 w-0 h-1 transition-all group-hover:w-full" style={{ backgroundColor: accent }} />
          </a>
        ))}
      </div>
      <FluxButton className="hidden md:block py-2 px-8 text-[10px]" variant="secondary" accent={accent}>COLLABORATE</FluxButton>
    </div>
  </nav>
)

const Hero = ({ accent = '#000' }: any) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-10 overflow-hidden">
      <div className="max-w-6xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`inline-block mb-10 px-8 py-3 border rounded-full text-[10px] tracking-[0.6em] font-black uppercase ${inter.className}`}
          style={{ borderColor: `${accent}22`, color: accent }}
        >
          Living Multi-Disciplinary Studio
        </motion.div>
        <h1 className={`${bricolage.className} text-8xl md:text-[14rem] font-black leading-[0.75] mb-16 uppercase italic tracking-tighter`} style={{ color: accent }}>
          DYNAMISM <br/> <span className="opacity-20 font-light">DEFINED.</span>
        </h1>
        <p className={`text-xl max-w-2xl mx-auto mb-20 leading-relaxed font-medium ${inter.className} opacity-60`} style={{ color: accent }}>
          We are an adaptive creative agency that morphs visual identities into living digital ecosystems. High-fidelity motion is our primary material.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-12">
          <FluxButton accent={accent}>EXPLORE_WORK</FluxButton>
          <div className={`flex items-center gap-4 ${bricolage.className} font-black tracking-widest text-sm cursor-pointer group`} style={{ color: accent }}>
            THE_PROCESS <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
          </div>
        </div>
      </div>
      
      <motion.div 
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: [0.42, 0, 0.58, 1] }}
        className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6"
        style={{ color: accent, opacity: 0.2 }}
      >
        <div className="text-[10px] tracking-[0.8em] uppercase font-black">Scroll</div>
        <div className="w-px h-32 bg-current" />
      </motion.div>
    </section>
  )
}

const ProjectSlider = ({ setAccent }: any) => {
  const [active, setActive] = useState(0)
  
  useEffect(() => {
    setAccent(projects[active].color)
  }, [active])

  return (
    <section className="py-32 px-10 border-y transition-colors duration-1000" style={{ backgroundColor: projects[active].bg, borderColor: `${projects[active].color}11` }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-20">
          <h2 className={`${bricolage.className} text-6xl font-black uppercase tracking-tighter`} style={{ color: projects[active].color }}>
            SELECTED <br/> <span className="font-light opacity-30">SNAPSHOTS</span>
          </h2>
          <div className="flex gap-4">
            {projects.map((_, i) => (
              <button 
                key={i} 
                onClick={() => setActive(i)}
                className={`w-12 h-12 border-2 flex items-center justify-center font-black ${active === i ? 'text-white' : ''} transition-all`}
                style={{ 
                  borderColor: projects[active].color,
                  backgroundColor: active === i ? projects[active].color : 'transparent',
                  color: active === i ? '#FFF' : projects[active].color
                }}
              >
                0{i + 1}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: -100, filter: 'blur(20px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: 100, filter: 'blur(20px)' }}
              transition={{ duration: 0.8, ease: "circOut" }}
              className="aspect-square bg-neutral-200 rounded-3xl overflow-hidden relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-tr opacity-20" style={{ backgroundImage: `linear-gradient(to top right, ${projects[active].color}, transparent)` }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <Maximize2 size={100} style={{ color: projects[active].color }} className="opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
              </div>
            </motion.div>
          </AnimatePresence>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ delay: 0.2 }}
            >
              <div className={`text-[10px] font-black uppercase tracking-[0.5em] mb-6`} style={{ color: projects[active].color }}>{projects[active].cat}</div>
              <h3 className={`${bricolage.className} text-8xl font-black uppercase mb-10 tracking-tighter`} style={{ color: projects[active].color }}>{projects[active].name}</h3>
              <p className="text-xl leading-relaxed opacity-60 mb-12" style={{ color: projects[active].color }}>An immersive study in how light and motion can define brand sentiment within high-performance enterprise environments.</p>
              <FluxButton accent={projects[active].color} variant="secondary">VIEW_CASE_STUDY</FluxButton>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

const Features = ({ accent }: any) => (
  <section className="py-40 px-10">
    <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-16">
      {[
        { title: 'Liquid Branding', desc: 'Identities that morph and flow across breakpoints and user sentiments.', icon: Palette },
        { title: 'Temporal UX', desc: 'Interfaces that respect time, utilizing frame-perfect easing and pacing.', icon: Layers },
        { title: 'Motion Systems', desc: 'Scalable animation architectures built for high-velocity deployment.', icon: Sparkles }
      ].map((f, i) => (
        <MorphCard key={i} accent={accent}>
          <div className="w-20 h-20 border-2 flex items-center justify-center mb-10 rotate-12 group-hover:rotate-0 transition-transform duration-500" style={{ borderColor: `${accent}33` }}>
            <f.icon style={{ color: accent }} size={32} />
          </div>
          <h3 className={`${bricolage.className} text-3xl font-black uppercase mb-6 tracking-tighter`} style={{ color: accent }}>{f.title}</h3>
          <p className="text-lg leading-relaxed opacity-50 font-medium" style={{ color: accent }}>{f.desc}</p>
        </MorphCard>
      ))}
    </div>
  </section>
)

const Testimonials = ({ accent }: any) => (
  <section className="py-40 px-10 border-t" style={{ borderColor: `${accent}11` }}>
    <div className="max-w-5xl mx-auto text-center">
      <h2 className={`${bricolage.className} text-5xl font-black uppercase mb-32 tracking-tighter`} style={{ color: accent }}>
        VOICES_FROM_THE_<span className="font-light opacity-30 italic">FLUX</span>
      </h2>
      <div className="space-y-32">
        {[
          { name: 'Aki Hiro', role: 'CD', company: 'Prism Studio', quote: 'FolioFlux isn\'t just a site; it\'s a living performance of our work. The transitions are unparalleled.' },
          { name: 'Sarah Jen', role: 'Founder', company: 'NeuralNote', quote: 'They captured the complex association-logic of our product through pure motion and color shift.' }
        ].map((t, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="flex flex-col items-center"
          >
            <p className={`${bricolage.className} text-5xl md:text-7xl font-bold leading-tight italic mb-12 tracking-tight`} style={{ color: accent }}>"{t.quote}"</p>
            <div className="flex flex-col items-center">
              <div className="w-12 h-1 bg-current mb-6 opacity-20" style={{ color: accent }} />
              <div className="text-lg font-black uppercase tracking-widest" style={{ color: accent }}>{t.name}</div>
              <div className="text-xs font-bold opacity-40 uppercase tracking-[0.4em] mt-2" style={{ color: accent }}>{t.role} // {t.company}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)

const Footer = ({ accent }: any) => (
  <footer className="py-32 px-10 border-t" style={{ borderColor: `${accent}11` }}>
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-20 mb-32">
        <div className="col-span-2">
          <div className={`${bricolage.className} text-4xl font-black tracking-tighter mb-10`} style={{ color: accent }}>
            FOLIO<span className="font-light opacity-40">FLUX</span>
          </div>
          <p className="text-lg leading-relaxed opacity-40 font-medium max-w-sm" style={{ color: accent }}>The infinite gallery for high-fidelity visionaries. Morphing the boundaries of the digital grid.</p>
        </div>
        {[
          { title: 'Archive', links: ['Showreel', 'Snapshots', 'Concepts', 'Vision'] },
          { title: 'Flux', links: ['Studio', 'Pricing', 'Process', 'Connect'] },
          { title: 'Social', links: ['Instagram', 'Dribbble', 'LinkedIn', 'Journal'] }
        ].map(group => (
          <div key={group.title}>
            <div className="text-[10px] font-black uppercase tracking-[0.5em] mb-10" style={{ color: accent }}>{group.title}</div>
            <ul className="space-y-6">
              {group.links.map(link => (
                <li key={link}><a href="#" className="text-sm font-bold uppercase tracking-widest hover:opacity-50 transition-opacity" style={{ color: accent }}>{link}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="pt-12 border-t flex flex-col md:flex-row justify-between items-center gap-10" style={{ borderColor: `${accent}11` }}>
        <div className="text-[10px] font-black uppercase tracking-[0.6em]" style={{ color: accent, opacity: 0.3 }}>© 2026 FOLIOFLUX ADAPTIVE SYSTEMS. ALL RIGHTS RESERVED.</div>
        <div className="flex gap-10">
          <Camera size={20} style={{ color: accent }} className="opacity-30 hover:opacity-100 cursor-pointer transition-opacity" />
          <Globe size={20} style={{ color: accent }} className="opacity-30 hover:opacity-100 cursor-pointer transition-opacity" />
        </div>
      </div>
    </div>
  </footer>
)

export default function FolioFlux() {
  const [accent, setAccent] = useState('#000000')
  const [mounted, setSetMounted] = useState(false)
  
  useEffect(() => setSetMounted(true), [])

  if (!mounted) return <div className="min-h-screen bg-white" />

  return (
    <motion.div 
      animate={{ backgroundColor: accent === '#FFFFFF' ? '#000' : '#FFF' }} // Inverse logic for dynamic contrast if needed, but let's stick to spec
      className={`min-h-screen overflow-x-hidden ${inter.className}`}
      style={{ backgroundColor: projects.find(p => p.color === accent)?.bg || '#FFF', transition: 'background-color 1s ease' }}
    >
      <Navbar accent={accent} />
      <Hero accent={accent} />
      <ProjectSlider setAccent={setAccent} />
      <Features accent={accent} />
      <Testimonials accent={accent} />
      <Footer accent={accent} />
      
      {/* --- Cursor Follower (Folio Signature) --- */}
      <motion.div 
        className="fixed top-0 left-0 w-40 h-40 rounded-full pointer-events-none z-[100] mix-blend-difference border-2"
        style={{ borderColor: accent, x: useMotionValue(0), y: useMotionValue(0) }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
      />
    </motion.div>
  )
}
