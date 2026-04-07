'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  BookOpen, 
  Sparkles, 
  ScrollText, 
  PenTool, 
  Globe, 
  ChevronDown, 
  MessageCircle,
  Shield,
  Star,
  ArrowRight,
  UserPlus,
  Play
} from 'lucide-react'
import { Fraunces, Inter, Homemade_Apple } from 'next/font/google'

const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-fraunces' })
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const script = Homemade_Apple({ weight: '400', subsets: ['latin'], variable: '--font-script' })

// --- Design Tokens ---
const tokens = {
  colors: {
    background: "#0A0A0A",
    surface: "#141414",
    accent1: "#D4AF37", // Story Gold
    accent2: "#FDFCF0", // Parchment
    border: "rgba(212, 175, 55, 0.2)",
    textHigh: "#FFFFFF",
    textLow: "#888888"
  },
  physics: {
    narrative: { type: "spring" as any, stiffness: 100, damping: 20 },
    ink: { duration: 1.5, ease: [0.42, 0, 0.58, 1] as any }
  }
}

// --- Components ---

const NarrativeButton = ({ children, variant = 'primary', className = '' }: any) => (
  <motion.button
    whileHover={{ scale: 1.02, letterSpacing: '0.05em' }}
    whileTap={{ scale: 0.98 }}
    className={`px-10 py-4 ${fraunces.className} font-semibold transition-all relative overflow-hidden group ${
      variant === 'primary' 
        ? `bg-[#D4AF37] text-black` 
        : `bg-transparent text-[#D4AF37] border border-[#D4AF37]/30`
    } ${className}`}
  >
    <span className="relative z-10 flex items-center justify-center gap-2 uppercase tracking-widest text-xs">{children}</span>
    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
  </motion.button>
)

const StoryCard = ({ children, className = '', annotation = '' }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={`bg-[#141414] border border-white/5 p-10 relative group ${className}`}
  >
    <div className="absolute top-0 left-0 w-full h-0.5 bg-[#D4AF37] scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
    {children}
    {annotation && (
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        className={`absolute -right-4 -top-4 ${script.className} text-[#D4AF37] text-sm bg-[#0A0A0A] px-4 py-2 border border-[#D4AF37]/20 rotate-6 shadow-2xl z-20 pointer-events-none`}
      >
        {annotation}
      </motion.div>
    )}
  </motion.div>
)

// --- Sections ---

const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 px-8 py-10">
    <div className="max-w-7xl mx-auto flex items-center justify-between">
      <div className={`flex items-center gap-3 ${fraunces.className} text-3xl font-bold tracking-tighter text-[#D4AF37]`}>
        <PenTool size={28} />
        BRAND<span className="text-white italic font-light">STORY</span>
      </div>
      <div className="hidden md:flex items-center gap-12 text-[#888888] font-bold text-[10px] tracking-[0.4em] uppercase">
        {['The Path', 'Archive', 'Legacy', 'Connect'].map(item => (
          <a key={item} href="#" className="hover:text-[#D4AF37] transition-colors relative group">
            {item}
            <span className="absolute -bottom-2 left-0 w-0 h-px bg-[#D4AF37] group-hover:w-full transition-all" />
          </a>
        ))}
      </div>
      <NarrativeButton className="hidden md:block py-2 px-6 text-[10px]" variant="secondary">BEGIN_JOURNEY</NarrativeButton>
    </div>
  </nav>
)

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center px-8 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,_#D4AF3711_0%,_transparent_50%)]" />
        <motion.div 
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-full bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-10" 
        />
      </div>
      
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={tokens.physics.narrative}
        >
          <div className={`mb-8 ${script.className} text-[#D4AF37] text-2xl`}>Once upon a pixel...</div>
          <h1 className={`${fraunces.className} text-7xl md:text-[9rem] font-bold text-white leading-[0.85] mb-12 uppercase`}>
            EVERY <br/> <span className="italic text-[#D4AF37]">LEGACY</span> <br/> HAS A START.
          </h1>
          <p className={`text-white/40 text-xl max-w-xl mb-16 leading-relaxed ${inter.className}`}>
            We craft immersive brand narratives that transcend the digital screen. Your story, told through high-fidelity motion and cinematic design.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-10">
            <NarrativeButton>READ THE ARCHIVE</NarrativeButton>
            <div className={`flex items-center gap-4 text-[#D4AF37] ${fraunces.className} font-bold tracking-widest text-xs cursor-pointer group`}>
              THE_MANIFESTO <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
            </div>
          </div>
        </motion.div>
      </div>
      
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: [0.42, 0, 0.58, 1] }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-[#D4AF37]/30 flex flex-col items-center gap-4"
      >
        <div className="text-[8px] tracking-[0.6em] uppercase font-black">Scroll_Down</div>
        <div className="w-px h-24 bg-gradient-to-b from-[#D4AF37]/30 to-transparent" />
      </motion.div>
    </section>
  )
}

const StatsBar = () => (
  <section className="py-24 border-y border-white/5 bg-[#0A0A0A]">
    <div className="max-w-7xl mx-auto px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-16">
        {[
          { label: 'Chapters Written', value: '450+', icon: BookOpen },
          { label: 'Global Reach', value: '120M', icon: Globe },
          { label: 'Narrative ROI', value: '2.4X', icon: Sparkles },
          { label: 'Legacy Years', value: '15+', icon: ScrollText }
        ].map((stat, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -5 }}
            className="flex flex-col items-center text-center"
          >
            <div className={`${fraunces.className} text-5xl font-bold text-white mb-2`}>{stat.value}</div>
            <div className="text-[10px] tracking-[0.4em] uppercase font-black text-[#D4AF37]">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)

const Features = () => (
  <section className="py-32 px-8">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-12">
        <div>
          <h2 className={`${fraunces.className} text-6xl font-bold uppercase leading-none text-white`}>NARRATIVE <br/><span className="text-[#D4AF37] italic">ELEMENTS</span></h2>
        </div>
        <p className="text-white/30 max-w-md text-lg leading-relaxed ${inter.className}">We use cinematic frameworks to ensure your brand's voice is heard across the digital noise.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-10">
        {[
          { title: 'Cinematic Flow', desc: 'Section transitions that move with the rhythm of a film edit, utilizing soft-focus and slow-fades.', icon: Play, note: 'Directed by Light' },
          { title: 'The Golden Line', desc: 'A persistent, hand-drawn gold SVG path that guides the user\'s eye through the story.', icon: PenTool, note: 'Signature Style' },
          { title: 'Semantic Depth', desc: 'Layered information architecture where details reveal themselves as the user dives deeper.', icon: Layers, note: '03 Layers' },
          { title: 'Legacy Archives', desc: 'A repository system designed to preserve and celebrate brand history over time.', icon: ScrollText, note: 'Permanent Records' },
          { title: 'Interactive Annotations', desc: 'Hover-triggered handwritten notes that provide "behind-the-scenes" context.', icon: MessageCircle, note: 'Personal Touch' },
          { title: 'Aura Branding', desc: 'Glow-based color systems that respond to the emotional weight of the content.', icon: Sparkles, note: 'Vibrant Response' }
        ].map((feature, i) => (
          <StoryCard key={i} annotation={feature.note}>
            <div className="w-12 h-12 border border-[#D4AF37]/30 flex items-center justify-center mb-8 rotate-45 group-hover:rotate-0 transition-transform duration-500">
              <feature.icon className="text-[#D4AF37] -rotate-45 group-hover:rotate-0 transition-transform duration-500" size={24} />
            </div>
            <h3 className={`${fraunces.className} text-2xl font-bold text-white mb-4 uppercase tracking-tighter`}>{feature.title}</h3>
            <p className="text-white/40 text-sm leading-relaxed">{feature.desc}</p>
          </StoryCard>
        ))}
      </div>
    </div>
  </section>
)

const ProductDetail = () => (
  <section className="py-32 px-8 bg-[#0D0D0D] relative overflow-hidden">
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-24 items-center">
        <div className="relative group">
          <div className="aspect-[4/5] bg-[#141414] border border-white/5 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60" />
            <div className="absolute bottom-12 left-12 right-12">
              <div className={`${script.className} text-[#D4AF37] text-3xl mb-4`}>Scene 01: The Vision</div>
              <p className="text-white/60 text-lg leading-relaxed italic">"It wasn't just a product. It was a movement that started in a garage and ended in the hearts of millions."</p>
            </div>
          </div>
          <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-[#D4AF37] p-8 flex items-center justify-center text-black font-bold rotate-12 group-hover:rotate-0 transition-transform duration-700 shadow-2xl">
            <div className={`${fraunces.className} text-center leading-tight uppercase text-sm`}>LEGACY <br/> VERIFIED</div>
          </div>
        </div>
        <div>
          <div className={`mb-8 ${fraunces.className} text-[#D4AF37] font-black tracking-[0.5em] uppercase text-[10px]`}>[ THE_ARCHITECTURE_OF_STORY ]</div>
          <h2 className={`${fraunces.className} text-6xl font-bold text-white mb-10 leading-[0.9]`}>BEYOND THE <br/> <span className="italic text-[#D4AF37]">SURFACE.</span></h2>
          <div className={`space-y-8 text-white/40 text-xl leading-relaxed ${inter.className}`}>
            <p>Traditional marketing treats the user as a target. At BrandStory, we treat them as a reader. Every scroll is a page-turn, every click is a choice in the narrative path.</p>
            <p>Our "Gold Line" design system ensures that even the most complex enterprise data feels part of a cohesive, human-centered journey.</p>
          </div>
          <NarrativeButton className="mt-12">EXPLORE THE ARCHIVE</NarrativeButton>
        </div>
      </div>
    </div>
  </section>
)

const Pricing = () => (
  <section className="py-32 px-8">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-24">
        <h2 className={`${fraunces.className} text-6xl font-bold uppercase text-white`}>MEMBERSHIP <br/><span className="text-[#D4AF37] italic">TIERS</span></h2>
        <p className="text-white/30 mt-6 tracking-[0.2em] text-[10px] uppercase font-black">Support the future of storytelling.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-12">
        {[
          { name: 'Observer', price: '$0', features: ['Monthly Digest', 'Public Archive Access', 'Standard Narrative', 'Community Hub'] },
          { name: 'Author', price: '$49', features: ['Custom Narrative Kit', 'Unlimited Chapters', 'Gold Line Suite', 'Priority Rendering', 'Studio Support'], highlight: true },
          { name: 'Visionary', price: '$199', features: ['Full Studio Access', 'White-label Archive', '3D Spatial Mapping', 'Custom Font Foundry', 'Direct Creative Seat'] }
        ].map((tier, i) => (
          <StoryCard key={i} className={tier.highlight ? 'border-[#D4AF37]/50 -translate-y-4 shadow-[0_20px_80px_rgba(212,175,55,0.1)]' : ''}>
            {tier.highlight && (
              <div className="absolute top-0 right-10 bg-[#D4AF37] text-black px-6 py-2 font-black text-[10px] tracking-widest uppercase">
                MOST_CHOSEN
              </div>
            )}
            <div className={`${fraunces.className} text-3xl font-bold text-white mb-4 uppercase italic`}>{tier.name}</div>
            <div className="flex items-baseline gap-2 mb-12">
              <span className={`${fraunces.className} text-6xl font-bold text-white`}>{tier.price}</span>
              <span className="text-white/20 text-[10px] font-black tracking-widest uppercase">/ CYCLE</span>
            </div>
            <ul className="space-y-6 mb-16">
              {tier.features.map(f => (
                <li key={f} className="flex items-center gap-4 text-xs font-bold text-white/40 uppercase tracking-widest">
                  <PenTool size={14} className="text-[#D4AF37]" />
                  {f}
                </li>
              ))}
            </ul>
            <NarrativeButton className="w-full" variant={tier.highlight ? 'primary' : 'secondary'}>BEGIN_CHAPTER</NarrativeButton>
          </StoryCard>
        ))}
      </div>
    </div>
  </section>
)

const Testimonials = () => (
  <section className="py-32 px-8 bg-[#0D0D0D] border-y border-white/5">
    <div className="max-w-7xl mx-auto">
      <h2 className={`${fraunces.className} text-5xl font-bold uppercase mb-24 text-center italic text-[#D4AF37]`}>VOICES_OF_LEGACY</h2>
      <div className="grid md:grid-cols-3 gap-16">
        {[
          { name: 'Julian Vane', role: 'CEO', company: 'NeuralNote', quote: 'BrandStory transformed our technical whitepaper into a cinematic experience that resonated with investors on an emotional level.' },
          { name: 'Elena Sterling', role: 'Director', company: 'Prism Studio', quote: 'The attention to detail—from the ink-bleed transitions to the golden line—is unmatched in the digital space.' },
          { name: 'Marcus Thorne', role: 'Lead', company: 'Velocity', quote: 'They didn\'t just build a site; they built a museum for our brand\'s future. Every scroll feels like a revelation.' }
        ].map((t, i) => (
          <div key={i} className="flex flex-col gap-8">
            <div className="flex gap-1">
              {[...Array(5)].map((_, j) => (
                <Star key={j} size={16} className="text-[#D4AF37] fill-[#D4AF37]" />
              ))}
            </div>
            <p className={`${fraunces.className} text-2xl font-bold text-white leading-tight italic`}>"{t.quote}"</p>
            <div>
              <div className={`${fraunces.className} text-lg font-bold text-white uppercase`}>{t.name}</div>
              <div className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.3em] mt-2">{t.role} // {t.company}</div>
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
    <section className="py-32 px-8">
      <div className="max-w-3xl mx-auto">
        <h2 className={`${fraunces.className} text-5xl font-bold uppercase mb-16 text-center text-white`}>CHAPTER_QUERIES</h2>
        <div className="space-y-6">
          {[
            { q: 'What is a "Golden Line" system?', a: 'It is a guiding visual anchor that uses SVG pathLength animations to lead the user\'s eyes through the most critical parts of your brand narrative.' },
            { q: 'How long does a story take?', a: 'Crafting a legacy takes time. Author tiers typically span 6-8 weeks, while Visionary projects are 3-month immersive creative intensives.' },
            { q: 'Can we integrate with existing CRM?', a: 'Yes. Our Story-to-CRM bridge ensures that every narrative interaction is captured and analyzed for conversion potential.' },
            { q: 'Do you offer custom typography?', a: 'Visionary members get access to our in-house font foundry to develop a proprietary typeface unique to their brand story.' }
          ].map((item, i) => (
            <div key={i} className={`border-b border-white/10 overflow-hidden transition-all duration-500 ${open === i ? 'pb-8' : 'pb-0'}`}>
              <button 
                onClick={() => setOpen(open === i ? -1 : i)}
                className="w-full py-8 flex items-center justify-between text-left"
              >
                <span className={`${fraunces.className} text-xl font-bold text-white uppercase tracking-tighter`}>{item.q}</span>
                <div className={`w-8 h-8 border border-[#D4AF37]/20 flex items-center justify-center transition-transform ${open === i ? 'rotate-45' : ''}`}>
                  <ChevronDown size={16} className="text-[#D4AF37]" />
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
  <section className="py-32 px-8 border-y border-white/5 relative overflow-hidden bg-[#0A0A0A]">
    <div className="max-w-4xl mx-auto text-center relative z-10">
      <div className={`mb-12 ${script.className} text-[#D4AF37] text-4xl`}>Stay in the loop...</div>
      <h2 className={`${fraunces.className} text-7xl font-bold uppercase italic text-white mb-8`}>THE_NARRATIVE_DROP.</h2>
      <p className="text-white/30 mb-12 max-w-xl mx-auto tracking-[0.3em] text-[10px] font-black uppercase">Weekly chapters from the forefront of digital legacy.</p>
      <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
        <input 
          type="email" 
          placeholder="READER_IDENTITY@DOMAIN.ORG" 
          className="flex-1 bg-white/5 border border-white/10 px-8 py-4 text-white focus:outline-none focus:border-[#D4AF37] transition-all text-[10px] font-black tracking-widest uppercase"
        />
        <NarrativeButton>SUBSCRIBE</NarrativeButton>
      </div>
    </div>
  </section>
)

const Footer = () => (
  <footer className="py-24 px-8 bg-[#0A0A0A]">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-16 mb-24">
        <div className="col-span-2">
          <div className={`${fraunces.className} text-2xl font-bold uppercase text-[#D4AF37] mb-8`}>BRAND<span className="text-white italic">STORY</span></div>
          <p className="text-white/30 text-xs leading-loose font-bold uppercase tracking-[0.2em] max-w-xs">Writing the future of digital identity. Narrative-first, high-fidelity, and uncompromisingly premium.</p>
        </div>
        {[
          { title: 'Chapters', links: ['The Path', 'Archive', 'Legacy', 'Vision'] },
          { title: 'Studio', links: ['Process', 'Pricing', 'Foundry', 'Careers'] },
          { title: 'Connect', links: ['Twitter', 'Discord', 'LinkedIn', 'Journal'] }
        ].map(group => (
          <div key={group.title}>
            <div className="text-[10px] font-black text-white uppercase tracking-[0.4em] mb-8">{group.title}</div>
            <ul className="space-y-6">
              {group.links.map(link => (
                <li key={link}><a href="#" className="text-white/30 text-[10px] font-bold tracking-[0.3em] uppercase hover:text-[#D4AF37] transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-white/20 text-[10px] font-black tracking-[0.5em] uppercase">© 2026 BRANDSTORY NARRATIVE LABS. ALL CHAPTERS RESERVED.</div>
        <div className="flex gap-8">
          <PenTool className="text-[#D4AF37] hover:scale-125 transition-transform cursor-pointer" size={18} />
          <ScrollText className="text-[#D4AF37] hover:scale-125 transition-transform cursor-pointer" size={18} />
        </div>
      </div>
    </div>
  </footer>
)

const Layers = ({ className, size }: any) => <div className={className}><svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/></svg></div>

export default function BrandStory() {
  return (
    <div className={`min-h-screen bg-[#0A0A0A] text-white overflow-x-hidden ${inter.className} ${fraunces.variable} ${script.variable}`}>
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
          <filter id="story-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100" height="100" filter="url(#story-noise)" />
        </svg>
      </div>
      
      </div>
  )
}
