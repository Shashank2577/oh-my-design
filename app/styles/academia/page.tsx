'use client'

/**
 * ACADEMIA - KINETIC DESIGN PROTOCOL
 * Style: Refined Scholarly
 * 
 * This page implements "The Unfolding Archive" protocol, focusing on 
 * intellectual rigor, timeless materials, and the deliberate pace 
 * of analog research. 
 * 
 * Key Features:
 * 1. Ink-Bleed Reveal: Radial mask transitions simulating ink soaking into paper.
 * 2. Unfolding Parchment: Scroll-triggered 3D rotations for section transitions.
 * 3. Archival Aesthetics: High-fidelity grain, parchment textures, and formal institutional typography.
 */

import React, { useRef, useState, useEffect } from 'react'
import { 
  motion, 
  useScroll, 
  useTransform, 
  useSpring, 
  AnimatePresence,
  useInView 
} from 'framer-motion'
import { 
  Book, 
  Library, 
  Search, 
  PenTool, 
  History, 
  Archive, 
  Compass, 
  Feather,
  Quote,
  Stamp,
  Globe,
  Award,
  BookOpen,
  Mail,
  ChevronRight,
  ArrowRight,
  Scale,
  GraduationCap
} from 'lucide-react'
import { EB_Garamond, IBM_Plex_Mono, Lora } from 'next/font/google'

// --- Fonts ---
const ebGaramond = EB_Garamond({ subsets: ['latin'], weight: ['400', '700'], style: ['normal', 'italic'] })
const ibmPlexMono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '700'] })
const lora = Lora({ subsets: ['latin'], weight: ['400', '700'] })

// --- Design Tokens (as per DESIGN_SYSTEM.md) ---
const tokens = {
  colors: {
    ink: "#0A0A0A",
    parchment: "#F5F2EA",
    oxfordBlue: "#1A2C42",
    crimson: "#8B0000",
    gold: "#D4AF37",
    shadow: "rgba(0, 0, 0, 0.08)"
  },
  physics: {
    deliberate: { 
      type: "spring" as const, 
      stiffness: 80, 
      damping: 25, 
      mass: 1.5 
    },
    unfold: {
      type: "spring" as const,
      stiffness: 120,
      damping: 30,
      mass: 1
    }
  }
}

// --- Kinetic UI Components ---

/**
 * InkBleedReveal
 * Simulates ink soaking into a surface using a radial mask that expands over time.
 * This component wraps children and reveals them when they enter the viewport.
 */
const InkBleedReveal = ({ children, delay = 0, duration = 2 }: { children: React.ReactNode, delay?: number, duration?: number }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  return (
    <motion.div
      ref={ref}
      initial={{ 
        maskImage: "radial-gradient(circle at center, black 0%, transparent 0%)",
      }}
      animate={isInView ? { 
        maskImage: "radial-gradient(circle at center, black 150%, transparent 160%)",
      } : {}}
      transition={{ duration, delay, ease: [0.19, 1, 0.22, 1] }} // Archival Ease
      className="relative"
    >
      {children}
    </motion.div>
  )
}

/**
 * UnfoldingSection
 * Simulates a section of parchment unfolding as the user scrolls.
 * Uses 3D rotations on the X-axis for that "folding map" effect.
 */
const UnfoldingSection = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const container = useRef(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"]
  })
  
  // Rotate from -15deg (folded) to 0deg (flat) and then 15deg (folding away)
  const rotateX = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [-20, 0, 0, 20])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.95, 1, 1, 0.95])
  
  const springRotateX = useSpring(rotateX, tokens.physics.unfold)
  
  return (
    <motion.section
      ref={container}
      style={{ 
        rotateX: springRotateX, 
        opacity,
        scale,
        perspective: "2000px",
        transformOrigin: "center top"
      }}
      className={`min-h-[80vh] flex flex-col justify-center py-20 px-10 relative ${className}`}
    >
      {/* Texture Overlay */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/parchment.png')] opacity-10 pointer-events-none mix-blend-multiply" />
      {children}
    </motion.section>
  )
}

/**
 * ScholarlyButton
 * A formal, high-fidelity button with gold-leaf hover effects and a wax-seal inspired interaction.
 */
const ScholarlyButton = ({ children, variant = 'primary', className = '' }: any) => (
  <motion.button
    whileHover={{ 
      y: -2,
      boxShadow: `0 10px 30px ${tokens.colors.shadow}`,
      borderColor: tokens.colors.gold
    }}
    whileTap={{ scale: 0.98 }}
    transition={tokens.physics.deliberate}
    className={`px-8 py-4 border relative group overflow-hidden ${ibmPlexMono.className} text-[10px] font-bold tracking-[0.3em] uppercase transition-all ${
      variant === 'primary' 
        ? `bg-[#0A0A0A] text-[#F5F2EA] border-[#0A0A0A]` 
        : `bg-transparent text-[#0A0A0A] border-[#0A0A0A]/20`
    } ${className}`}
  >
    <span className="relative z-10 flex items-center justify-center gap-3">
      {children}
      <Feather size={14} className={variant === 'primary' ? 'text-[#D4AF37]' : 'text-[#8B0000]'} />
    </span>
    {/* Archival Glint */}
    <motion.div 
      initial={{ x: "-100%" }}
      whileHover={{ x: "100%" }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 pointer-events-none"
    />
  </motion.button>
)

// --- Background Components ---

/**
 * ArchiveBackground
 * Fixed background with parchment texture and subtle grain.
 */
const ArchiveBackground = () => (
  <div className="fixed inset-0 z-0 bg-[#F5F2EA] pointer-events-none">
    {/* High-fidelity Grain */}
    <div className="absolute inset-0 opacity-[0.05] pointer-events-none contrast-150 mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/graphy-very-light.png')]" />
    
    {/* Subtle Vignette */}
    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/5" />
    
    {/* Archival Grid - subtle rule lines */}
    <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(0,0,0,1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,1)_1px,transparent_1px)] [background-size:100px_100px]" />
  </div>
)

// --- Page Content ---

const Navbar = () => (
  <nav className="fixed top-0 w-full z-[100] bg-[#F5F2EA]/80 backdrop-blur-sm border-b border-[#0A0A0A]/10 px-10 py-6">
    <div className="max-w-7xl mx-auto flex items-center justify-between">
      <motion.div 
        whileHover={{ scale: 1.02 }}
        className={`flex items-center gap-4 ${ebGaramond.className} text-2xl font-bold text-[#0A0A0A] cursor-pointer`}
      >
        <div className="p-2 border border-[#0A0A0A] bg-[#0A0A0A] text-[#D4AF37]">
          <Library size={24} />
        </div>
        ACADEMIA
      </motion.div>
      
      <div className={`hidden lg:flex items-center gap-12 ${ibmPlexMono.className} text-[9px] font-bold tracking-[0.4em] uppercase text-[#0A0A0A]/50`}>
        {['The_Archives', 'Curriculum', 'Scholarly_Pubs', 'Terminal'].map(item => (
          <a key={item} href="#" className="hover:text-[#8B0000] transition-colors relative group">
            {item}
            <motion.span 
              className="absolute -bottom-2 left-0 w-0 h-[1px] bg-[#8B0000] group-hover:w-full transition-all duration-300" 
            />
          </a>
        ))}
      </div>
      
      <ScholarlyButton variant="secondary" className="hidden sm:block">REQUEST_ACCESS</ScholarlyButton>
    </div>
  </nav>
)

const Hero = () => {
  return (
    <UnfoldingSection className="pt-40">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center relative z-10">
        <InkBleedReveal>
          <div className={`inline-flex items-center gap-3 px-4 py-2 bg-[#1A2C42]/5 border border-[#1A2C42]/10 mb-10 ${ibmPlexMono.className}`}>
            <Archive size={12} className="text-[#1A2C42]" />
            <span className="text-[9px] font-bold text-[#1A2C42] tracking-[0.4em] uppercase">
              ARCHIVAL_SYSTEM_ACTIVE // V.26
            </span>
          </div>
          
          <h1 className={`${ebGaramond.className} text-[clamp(3.5rem,7vw,10rem)] font-bold text-[#0A0A0A] leading-[0.9] mb-12`}>
            INTELLECTUAL <br/>
            <span className="italic text-[#8B0000]">RIGOR.</span>
          </h1>
          
          <p className={`${lora.className} text-xl text-[#0A0A0A]/70 max-w-xl mb-16 leading-relaxed italic`}>
            "The mind is not a vessel to be filled, but a fire to be kindled." — Plutarch. Explore the archival foundations of timeless knowledge.
          </p>
          
          <div className="flex flex-wrap items-center gap-10">
            <ScholarlyButton>OPEN_MANUSCRIPT</ScholarlyButton>
            <motion.div 
              whileHover={{ x: 5 }}
              className={`flex items-center gap-3 text-[#0A0A0A] text-[10px] font-bold tracking-[0.3em] uppercase cursor-pointer group ${ibmPlexMono.className}`}
            >
              BROWSE_CATALOGUE <ArrowRight size={16} className="text-[#8B0000] transition-transform group-hover:translate-x-2" />
            </motion.div>
          </div>
        </InkBleedReveal>

        {/* Hero Asset - Simulated via CSS and Framer Motion */}
        <div className="relative hidden lg:block">
           <motion.div
            initial={{ opacity: 0, rotate: -5, scale: 0.9 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            transition={tokens.physics.deliberate}
            className="aspect-[4/5] bg-white p-1 shadow-2xl relative overflow-hidden group"
           >
              {/* Paper Texture and Content Simulation */}
              <div className="absolute inset-0 bg-[#F5F2EA] p-16 flex flex-col justify-between border border-[#0A0A0A]/5">
                 <div className="space-y-4">
                    <div className="w-16 h-[2px] bg-[#8B0000] mb-8" />
                    <div className={`${ebGaramond.className} text-4xl font-bold text-[#0A0A0A]`}>Tractatus Logico-Philosophicus</div>
                    <div className={`${ibmPlexMono.className} text-[10px] text-[#0A0A0A]/40 uppercase tracking-widest`}>MS. Cod. 1204 // 1921</div>
                 </div>
                 
                 <div className="space-y-6">
                    <div className="h-[1px] w-full bg-[#0A0A0A]/10" />
                    <div className="flex justify-between items-end">
                       <div className={`${lora.className} text-sm text-[#0A0A0A]/60 italic max-w-[200px]`}>
                          The world is everything that is the case.
                       </div>
                       <Stamp size={48} className="text-[#8B0000]/20" />
                    </div>
                 </div>
              </div>
              
              {/* Gold Leaf Corner */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#D4AF37]/10 -rotate-45 translate-x-12 -translate-y-12 border border-[#D4AF37]/30" />
           </motion.div>
           
           {/* Floating Annotations */}
           <motion.div 
            animate={{ y: [-10, 10] }}
            transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
            className={`absolute -top-12 -left-12 bg-[#1A2C42] text-[#F5F2EA] p-6 ${ibmPlexMono.className} text-[9px] font-bold tracking-[0.3em] uppercase shadow-xl`}
           >
              CURRICULUM_REF: ALPHA_01
           </motion.div>
        </div>
      </div>
    </UnfoldingSection>
  )
}

const Metrics = () => (
  <UnfoldingSection className="bg-[#0A0A0A] text-[#F5F2EA]">
    <div className="max-w-7xl mx-auto px-10">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
        {[
          { label: 'Archival Records', value: '1.2M', icon: Archive, color: '#D4AF37' },
          { label: 'Citations', value: '850K', icon: BookOpen, color: '#8B0000' },
          { label: 'Peer Reviews', value: '14K', icon: Scale, color: '#F5F2EA' },
          { label: 'Fellowships', value: '122', icon: GraduationCap, color: '#D4AF37' }
        ].map((metric, i) => (
          <motion.div 
            key={i}
            whileHover={{ scale: 1.05 }}
            className="p-8 border-l border-[#F5F2EA]/10 group"
          >
            <metric.icon className="mb-6 opacity-30 group-hover:opacity-100 transition-opacity" style={{ color: metric.color }} size={24} />
            <div className={`${ebGaramond.className} text-5xl font-bold mb-2 italic tracking-tighter`}>{metric.value}</div>
            <div className={`${ibmPlexMono.className} text-[9px] font-bold text-[#F5F2EA]/40 uppercase tracking-[0.4em]`}>{metric.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </UnfoldingSection>
)

const TheArchives = () => {
  const archives = [
    { title: 'Classical Manuscripts', desc: 'Preserving the original texts from the Greco-Roman period with high-fidelity digitization.', icon: Feather },
    { title: 'Modern Dialectics', desc: 'A curated collection of post-enlightenment philosophical works and critical essays.', icon: Compass },
    { title: 'Scientific Archives', desc: 'Historical scientific journals dating back to the formation of the Royal Society.', icon: Globe },
    { title: 'Institutional Honors', desc: 'Cataloguing the academic achievements and awards of our global scholarly network.', icon: Award },
    { title: 'Correspondence', desc: 'Annotated letters from leading intellectuals of the 20th century.', icon: Mail },
    { title: 'Legal Precedents', desc: 'A comprehensive database of historical legal cases and their societal impact.', icon: Scale }
  ]

  return (
    <UnfoldingSection>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-32 gap-12">
          <InkBleedReveal>
            <h2 className={`${ebGaramond.className} text-7xl lg:text-8xl font-bold text-[#0A0A0A] mb-8 leading-[0.9]`}>
              ARCHIVAL <br/> <span className="text-[#8B0000]">DOMAINS.</span>
            </h2>
            <p className={`${lora.className} text-[#0A0A0A]/60 max-w-xl text-lg italic`}>
              The Academia protocol categorizes human knowledge into six distinct archival domains, each governed by rigorous standards of preservation and peer verification.
            </p>
          </InkBleedReveal>
          <ScholarlyButton variant="secondary" className="lg:mb-4">VIEW_ALL_CATALOGUES</ScholarlyButton>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
          {archives.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group border-b border-[#0A0A0A]/10 pb-12"
            >
              <div className="flex items-center gap-6 mb-8">
                <div className="w-12 h-12 border border-[#0A0A0A]/10 flex items-center justify-center group-hover:bg-[#0A0A0A] group-hover:text-[#D4AF37] transition-all duration-500">
                  <item.icon size={20} />
                </div>
                <div className={`${ibmPlexMono.className} text-[9px] font-bold text-[#0A0A0A]/30 uppercase tracking-[0.4em]`}>DOMAIN_00{i + 1}</div>
              </div>
              <h3 className={`${ebGaramond.className} text-3xl font-bold text-[#0A0A0A] mb-6 italic`}>{item.title}</h3>
              <p className={`${lora.className} text-[#0A0A0A]/50 text-base leading-relaxed mb-10`}>{item.desc}</p>
              <motion.div 
                whileHover={{ x: 5 }}
                className={`flex items-center gap-3 text-[9px] font-bold text-[#8B0000] tracking-[0.3em] uppercase cursor-pointer ${ibmPlexMono.className}`}
              >
                REQUEST_DOCUMENTS <ChevronRight size={14} />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </UnfoldingSection>
  )
}

const TechnicalCurriculum = () => (
  <UnfoldingSection className="bg-[#1A2C42] text-[#F5F2EA] overflow-hidden">
    <div className="absolute top-0 right-0 p-20 opacity-[0.05] pointer-events-none">
      <Library size={600} strokeWidth={0.1} />
    </div>

    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-32 items-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={tokens.physics.deliberate}
          className="relative"
        >
          {/* Simulated Scholarly Asset */}
          <div className="aspect-square bg-[#0A0A0A] p-2 shadow-2xl relative flex items-center justify-center border border-[#F5F2EA]/10">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-30 pointer-events-none" />
             
             {/* Central Illuminated Circle */}
             <motion.div 
              animate={{ 
                rotate: 360,
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="w-3/4 h-3/4 border-2 border-dashed border-[#D4AF37]/30 rounded-full flex items-center justify-center"
             >
                <div className="w-1/2 h-1/2 border border-[#F5F2EA]/10 rounded-full flex items-center justify-center">
                   <Globe size={100} strokeWidth={0.5} className="text-[#D4AF37]" />
                </div>
             </motion.div>
             
             {/* Corner Accents */}
             <div className="absolute top-10 left-10 ${ibmPlexMono.className} text-[8px] text-[#F5F2EA]/30 tracking-widest uppercase">
                System_Curriculum_Map <br/>
                Verification: Stable
             </div>
             <div className="absolute bottom-10 right-10 ${ibmPlexMono.className} text-[8px] text-[#D4AF37] tracking-widest uppercase">
                Illuminated_Archive_v4.0
             </div>
          </div>
          
          <div className="absolute -bottom-10 -left-10 bg-[#8B0000] text-[#F5F2EA] p-10 -rotate-3 shadow-2xl border border-[#F5F2EA]/20">
            <div className={`${ebGaramond.className} text-2xl font-bold italic`}>VERITAS.</div>
          </div>
        </motion.div>

        <InkBleedReveal>
          <div className={`${ibmPlexMono.className} text-[#D4AF37] text-[9px] tracking-[0.5em] font-bold mb-10 uppercase italic`}>
            [ CURRICULUM_TECHNICAL_SPECS ]
          </div>
          <h2 className={`${ebGaramond.className} text-7xl lg:text-8xl font-bold text-[#F5F2EA] mb-10 leading-[0.9]`}>
            THE BEYOND <br/><span className="italic text-[#D4AF37]">OBSERVABLE.</span>
          </h2>
          <div className={`${lora.className} space-y-8 text-[#F5F2EA]/60 text-xl italic leading-relaxed`}>
            <p>Scholarly research is more than the accumulation of data; it is the refinement of perception through historical context and technical precision.</p>
            <p>Our curriculum engine leverages semantic mapping to connect disparate archival nodes into a coherent intellectual journey.</p>
          </div>
          
          <div className="mt-20 flex flex-col sm:flex-row items-start gap-10">
            <ScholarlyButton>ENROLL_FELLOWSHIP</ScholarlyButton>
            <div className="flex items-center gap-6">
              {[Archive, PenTool, Search].map((Icon, i) => (
                <motion.div 
                  key={i} 
                  whileHover={{ y: -5, color: tokens.colors.gold }}
                  className="p-4 bg-[#F5F2EA]/5 border border-[#F5F2EA]/10 text-[#F5F2EA]/40 cursor-pointer transition-colors"
                >
                  <Icon size={18} />
                </motion.div>
              ))}
            </div>
          </div>
        </InkBleedReveal>
      </div>
    </div>
  </UnfoldingSection>
)

const Footer = () => (
  <footer className="py-32 px-10 bg-[#0A0A0A] text-[#F5F2EA] border-t border-[#D4AF37]/20 relative z-10">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-20 mb-32">
        <div className="lg:col-span-2">
          <div className={`flex items-center gap-4 ${ebGaramond.className} text-3xl font-bold text-[#F5F2EA] uppercase mb-10 cursor-pointer`}>
            <div className="p-2 border border-[#D4AF37] bg-transparent text-[#D4AF37]">
              <Library size={28} />
            </div>
            ACADEMIA
          </div>
          <p className={`${ibmPlexMono.className} text-[#F5F2EA]/40 text-[9px] font-bold leading-loose uppercase tracking-[0.2em] max-w-sm`}>
            THE GLOBAL STANDARD FOR ARCHIVAL RESEARCH AND INTELLECTUAL RIGOR. BUILT ON TRADITION, REFINED BY PRECISION.
          </p>
        </div>
        
        {[
          { title: 'The Archives', links: ['Classical', 'Modern', 'Scientific', 'Legal'] },
          { title: 'Fellowships', links: ['Admissions', 'Grants', 'Research', 'Faculty'] },
          { title: 'Terminal', links: ['SSH_Connect', 'Node_Map', 'Status_Log', 'Security'] }
        ].map((group, i) => (
          <div key={i}>
            <div className={`${ibmPlexMono.className} text-[9px] font-bold text-[#D4AF37] uppercase tracking-[0.5em] mb-12`}>{group.title}</div>
            <ul className="space-y-6">
              {group.links.map(link => (
                <li key={link}>
                  <a href="#" className={`${ebGaramond.className} text-base italic text-[#F5F2EA]/60 hover:text-[#D4AF37] transition-colors flex items-center gap-3 group`}>
                    <div className="w-0 h-[1px] bg-[#D4AF37] group-hover:w-4 transition-all" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      
      <div className="pt-16 border-t border-[#F5F2EA]/10 flex flex-col md:flex-row justify-between items-center gap-10">
        <div className={`${ibmPlexMono.className} text-[8px] font-bold text-[#F5F2EA]/30 uppercase tracking-[0.6em]`}>
          © 2026 ACADEMIA_CORP // PROPRIETARY_ARCHIVES // ALL_RIGHTS_RESERVED
        </div>
        <div className="flex gap-12 text-[#F5F2EA]/40">
          <motion.div whileHover={{ scale: 1.2, color: tokens.colors.gold }} className="cursor-pointer transition-colors">
            <Globe size={18} />
          </motion.div>
          <motion.div whileHover={{ scale: 1.2, color: tokens.colors.crimson }} className="cursor-pointer transition-colors">
            <Award size={18} />
          </motion.div>
          <motion.div whileHover={{ scale: 1.2, color: tokens.colors.oxfordBlue }} className="cursor-pointer transition-colors">
            <Search size={18} />
          </motion.div>
        </div>
      </div>
    </div>
  </footer>
)

// --- Main Page Component ---

export default function AcademiaPage() {
  return (
    <div className={`min-h-screen bg-[#F5F2EA] text-[#0A0A0A] overflow-x-hidden ${ebGaramond.className} selection:bg-[#8B0000] selection:text-[#F5F2EA]`}>
      {/* Archival Background Layers */}
      <ArchiveBackground />
      
      {/* Navigation HUD */}
      <Navbar />
      
      {/* Main Content Sections with Kinetic Protocols */}
      <main className="relative z-10">
        <Hero />
        <Metrics />
        <TheArchives />
        <TechnicalCurriculum />
        
        {/* Call to Action - Final Seal */}
        <section className="py-40 px-10 relative overflow-hidden">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={tokens.physics.deliberate}
            className="max-w-5xl mx-auto bg-[#8B0000] p-24 text-[#F5F2EA] relative overflow-hidden group shadow-[0_50px_100px_rgba(0,0,0,0.3)]"
          >
            {/* Wax Seal Decoration */}
            <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:opacity-20 transition-opacity">
              <Stamp size={300} strokeWidth={1} />
            </div>
            
            <div className="relative z-10 text-center">
              <h2 className={`${ebGaramond.className} text-6xl lg:text-8xl font-bold uppercase italic tracking-tighter mb-12`}>
                SEAL THE <br/> <span className="bg-[#F5F2EA] text-[#8B0000] px-4">CONVENANT.</span>
              </h2>
              <p className={`${lora.className} text-xl italic tracking-wide mb-16 max-w-2xl mx-auto opacity-70`}>
                "Knowledge is the only wealth that can be given away without being diminished." Join the archival fellowship.
              </p>
              <motion.button 
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className={`bg-[#F5F2EA] text-[#0A0A0A] px-16 py-8 text-xl font-bold italic uppercase tracking-tighter shadow-2xl ${ibmPlexMono.className}`}
              >
                APPLY_FOR_ACCESS
              </motion.button>
            </div>
          </motion.div>
        </section>
      </main>
      
      <Footer />
      
      {/* Global Texture Overlay - Archival Grain */}
      <div className="fixed inset-0 pointer-events-none z-[1000] opacity-[0.03] contrast-150 mix-blend-multiply">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>

      {/* Archival HUD (Bottom Left) */}
      <div className="fixed bottom-10 left-10 z-[100] hidden xl:block">
        <div className="p-6 border border-[#0A0A0A]/10 bg-[#F5F2EA]/90 backdrop-blur-sm shadow-xl">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-2 h-2 bg-[#8B0000] rounded-full animate-pulse" />
            <span className={`${ibmPlexMono.className} text-[8px] font-bold text-[#0A0A0A]/40 tracking-widest uppercase`}>Archival_Node_Verified // 0x882</span>
          </div>
          <div className="flex items-center gap-6">
             <div className="h-[1px] w-24 bg-[#0A0A0A]/10 overflow-hidden relative">
                <motion.div 
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="h-full w-12 bg-[#D4AF37]"
                />
             </div>
             <span className={`${ibmPlexMono.className} text-[8px] font-bold text-[#0A0A0A] tracking-widest uppercase`}>SYNC_STABLE</span>
          </div>
        </div>
      </div>
    </div>
  )
}
