'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Zap, 
  Sparkles,
  MousePointer2,
  Share2, 
  MessageCircle, 
  Heart, 
  TrendingUp, 
  ChevronDown, 
  ArrowRight,
  Trophy,
  Users,
  Flame,
  Globe,
  Rocket,
  Plus,
  Smile,
} from 'lucide-react'
import { Bricolage_Grotesque, Inter } from 'next/font/google'

const bricolage = Bricolage_Grotesque({ subsets: ['latin'], weight: ['400', '700', '800'] })
const inter = Inter({ subsets: ['latin'] })

// --- Design Tokens ---
const PROMPT = `\n### 100. SocialSpark (Community Building)\n**Design Philosophy & Vibe**: Energetic, connective, and vibrant. SocialSpark visualizes the "Energy" of a community. The UI is designed to feel alive, with elements that "spark" or glow when interacted with. The vibe is "The Festival"—loud, colorful, and constantly moving.\n\n**Design Token System**:\n- **Background**: \`#0F172A\` (Deep Slate)\n- **Surface**: \`rgba(255, 255, 255, 0.05)\` (Glass)\n- **Accent 1**: \`#F59E0B\` (Spark Orange)\n- **Accent 2**: \`#EC4899\` (Vibrant Pink)\n- **Text High**: \`#F8FAFC\`\n- **Text Low**: \`#94A3B8\`\n\n**Typography System**:\n- **Primary Font**: **DM Sans** (Headings - Friendly, round)\n- **Secondary Font**: **Inter** (Body/UI - Clear)\n\n**Motion Architecture (The "Spark" Factor)**:\n- **Connection Lines**: Lines that dynamically draw between user avatars.\n- **Spark Effects**: Particle bursts on clicks or successful actions.\n`;

const tokens = {
  colors: {
    background: "#F8F0FF", // Soft Lavender
    surface: "#FFFFFF",
    accent1: "#FF4DAB", // Spark Pink
    accent2: "#FFC700", // Trophy Gold
    border: "rgba(255, 77, 171, 0.2)",
    textHigh: "#2D004F",
    textLow: "#8E7CA3"
  },
  physics: {
    bouncy: { type: "spring" as any, stiffness: 500, damping: 12 }
  }
}

// --- Components ---

const SparkButton = ({ children, variant = 'primary', className = '' }: any) => (
  <motion.button
    whileHover={{ scale: 1.1, rotate: [0, -2, 2, 0] }}
    whileTap={{ scale: 0.8, rotate: 0 }}
    className={`px-10 py-5 rounded-full ${bricolage.className} font-extrabold text-lg transition-all relative group shadow-2xl ${
      variant === 'primary' 
        ? `bg-[#FF4DAB] text-white shadow-[0_20px_40px_rgba(255,77,171,0.3)]` 
        : `bg-white text-[#FF4DAB] border-2 border-[#FF4DAB]/20`
    } ${className}`}
  >
    <span className="relative z-10 flex items-center justify-center gap-3">
      {children}
      <Sparkles size={20} className={variant === 'primary' ? 'fill-white' : 'fill-[#FF4DAB]'} />
    </span>
    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
  </motion.button>
)

const CelebrationCard = ({ children, className = '', title = '' }: any) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    whileHover={{ y: -10, rotate: [-1, 1, -1] }}
    className={`bg-white p-10 rounded-[40px] shadow-[0_40px_80px_rgba(45,0,79,0.05)] border-2 border-[#F8F0FF] relative group ${className}`}
  >
    <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity">
      <Zap className="text-[#FFC700] fill-[#FFC700]" size={24} />
    </div>
    {title && <div className={`${bricolage.className} text-[10px] font-black text-[#FF4DAB] uppercase tracking-[0.4em] mb-8`}>{title}</div>}
    {children}
  </motion.div>
)

// --- Sections ---

const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 bg-[#F8F0FF]/80 backdrop-blur-md px-8 py-6 border-b border-[#FF4DAB]/10">
    <div className="max-w-7xl mx-auto flex items-center justify-between">
      <div className={`flex items-center gap-2 ${bricolage.className} text-3xl font-black tracking-tight text-[#2D004F]`}>
        <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }}>
          <Sparkles className="text-[#FF4DAB] fill-[#FF4DAB]" size={32} />
        </motion.div>
        SOCIAL<span className="text-[#FF4DAB]">SPARK</span>
      </div>
      <div className="hidden md:flex items-center gap-10 text-[#8E7CA3] font-bold text-sm">
        {['The Feed', 'Celebrations', 'Metrics', 'Agency'].map(item => (
          <a key={item} href="#" className="hover:text-[#FF4DAB] transition-colors">{item}</a>
        ))}
      </div>
      <SparkButton className="hidden md:block py-3 px-8 text-xs font-black">GET_REWARDED</SparkButton>
    </div>
  </nav>
)

const Hero = () => {
  const [particles, setParticles] = useState<number[]>([])
  
  const burst = () => {
    setParticles([...Array(10)].map((_, i) => Date.now() + i))
    setTimeout(() => setParticles([]), 1000)
  }

  return (
    <section className="pt-40 pb-20 px-8 relative overflow-hidden min-h-screen flex items-center bg-[#F8F0FF]">
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              y: [0, -1000],
              x: Math.sin(i) * 100
            }}
            transition={{ 
              duration: Math.random() * 5 + 5, 
              repeat: Infinity, 
              delay: Math.random() * 5 
            }}
            className="absolute bottom-0 text-[#FF4DAB]"
            style={{ left: `${Math.random() * 100}%` }}
          >
            <Sparkles size={Math.random() * 20 + 10} />
          </motion.div>
        ))}
      </div>
      
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={tokens.physics.bouncy}
        >
          <div className="flex items-center gap-2 mb-8 px-4 py-2 bg-white rounded-full w-fit shadow-sm border border-[#FF4DAB]/10">
            <Flame className="text-[#FFC700] fill-[#FFC700]" size={16} />
            <span className={`text-[10px] font-black text-[#8E7CA3] tracking-widest uppercase ${inter.className}`}>Viral Momentum Initialized</span>
          </div>
          <h1 className={`${bricolage.className} text-7xl md:text-9xl font-extrabold text-[#2D004F] leading-[0.9] mb-10`}>
            FEEL THE <br/> <span className="text-[#FF4DAB] drop-shadow-[0_20px_40px_rgba(255,77,171,0.2)]">SPARK.</span>
          </h1>
          <p className={`text-[#8E7CA3] text-xl max-w-xl mb-12 leading-relaxed font-medium ${inter.className}`}>
            SocialSpark turns engagement into a high-energy performance. Reward every click, celebrate every share, and ignite your digital community.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-8">
            <SparkButton onClick={burst}>IGNITE_GROWTH</SparkButton>
            <div className={`flex items-center gap-4 text-[#2D004F] font-black tracking-widest text-xs cursor-pointer group`}>
              THE_DOPAMINE_LAB <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform text-[#FF4DAB]" />
            </div>
          </div>
          
          <div className="relative h-20 mt-12 overflow-visible">
            <AnimatePresence>
              {particles.map(id => (
                <motion.div
                  key={id}
                  initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
                  animate={{ 
                    opacity: 0, 
                    scale: Math.random() * 2, 
                    x: (Math.random() - 0.5) * 400, 
                    y: (Math.random() - 0.5) * 400 
                  }}
                  className="absolute"
                >
                  <Smile className="text-[#FFC700]" />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, rotate: 10, y: 50 }}
          animate={{ opacity: 1, rotate: 0, y: 0 }}
          transition={{ ...tokens.physics.bouncy, delay: 0.2 }}
          className="relative"
        >
          <div className="bg-white p-10 rounded-[60px] shadow-[0_50px_100px_rgba(45,0,79,0.1)] border-4 border-[#F8F0FF] relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF4DAB]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center justify-between mb-12">
              <div className={`${bricolage.className} text-2xl font-black text-[#2D004F]`}>Viral Potential</div>
              <div className="flex gap-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="w-3 h-3 rounded-full bg-[#FF4DAB] animate-bounce" style={{ animationDelay: `${i * 0.1}s` }} />
                ))}
              </div>
            </div>
            <div className="space-y-10 relative z-10">
              {[
                { label: 'Hype Velocity', val: '92.4%', color: '#FF4DAB' },
                { label: 'Dopamine Multiplier', val: '2.4X', color: '#FFC700' },
                { label: 'Network Spread', val: 'Elite', color: '#10B981' }
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between mb-4">
                    <span className="text-xs font-black text-[#8E7CA3] uppercase tracking-[0.2em]">{item.label}</span>
                    <span className="text-sm font-black text-[#2D004F]">{item.val}</span>
                  </div>
                  <div className="h-3 w-full bg-[#F8F0FF] rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '85%' }}
                      transition={{ duration: 2, delay: 0.5 + i * 0.2 }}
                      className="h-full"
                      style={{ backgroundColor: item.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <motion.div 
            animate={{ scale: [1, 1.2, 1], rotate: [12, -12, 12] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="absolute -top-10 -right-10 bg-[#FFC700] text-[#2D004F] p-8 rounded-[30px] shadow-2xl rotate-12"
          >
            <Trophy size={32} fill="current" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

const StatsBar = () => (
  <section className="py-24 border-y-4 border-[#F8F0FF] bg-white">
    <div className="max-w-7xl mx-auto px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-16 text-center">
        {[
          { label: 'Reactions', value: '4.8B+', icon: Heart },
          { label: 'Active Sparks', value: '850K', icon: Zap },
          { label: 'ROI Correl', value: '12.4', icon: TrendingUp },
          { label: 'Global reach', value: '150+', icon: Globe }
        ].map((stat, i) => (
          <motion.div key={i} whileHover={{ scale: 1.1 }}>
            <div className={`${bricolage.className} text-6xl font-black text-[#2D004F] mb-2`}>{stat.value}</div>
            <div className="text-[#FF4DAB] text-[10px] font-black uppercase tracking-[0.4em]">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)

const Features = () => (
  <section className="py-32 px-8 bg-[#F8F0FF]">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-24">
        <h2 className={`${bricolage.className} text-5xl md:text-6xl font-black text-[#2D004F] mb-6`}>THE DOPAMINE ENGINE</h2>
        <p className={`text-[#8E7CA3] max-w-2xl mx-auto text-lg leading-relaxed ${inter.className}`}>We use celebratory physics to ensure every digital touchpoint feels like a victory.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {[
          { title: 'Particle Rewards', desc: 'Interfaces that respond to user actions with localized particle bursts and emoji rain.', icon: Sparkles },
          { title: 'Squishy UI', desc: 'Components that use liquid spring physics to feel tactile, responsive, and fun to click.', icon: MousePointer2 },
          { title: 'Celebratory Flow', desc: 'Section transitions that use confetti-masks and high-impact scale reveals.', icon: Trophy },
          { title: 'Momentum Tickers', desc: 'Real-time social proof banners that surge forward with high-frequency updates.', icon: TrendingUp },
          { title: 'Viral Vault', desc: 'Encrypted storage for proprietary engagement strategies and high-value user data.', icon: ShieldCheck },
          { title: 'Spark Metrics', desc: 'Predictive ROI analytics that map the long-term impact of rewarding interactions.', icon: Zap }
        ].map((feature, i) => (
          <CelebrationCard key={i} title={`PROTOCOL_0${i + 1}`}>
            <div className="w-16 h-16 bg-[#FF4DAB]/5 rounded-full flex items-center justify-center mb-10">
              <feature.icon className="text-[#FF4DAB]" size={32} />
            </div>
            <h3 className={`${bricolage.className} text-2xl font-bold text-[#2D004F] mb-4`}>{feature.title}</h3>
            <p className="text-[#8E7CA3] text-sm leading-relaxed font-medium">{feature.desc}</p>
          </CelebrationCard>
        ))}
      </div>
    </div>
  </section>
)

const ProductDetail = () => (
  <section className="py-32 px-8 bg-white relative overflow-hidden">
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-24 items-center">
        <div className="relative p-10 border-4 border-dashed border-[#F8F0FF] rounded-[80px]">
          <div className="aspect-square bg-[#F8F0FF] rounded-[60px] shadow-2xl flex items-center justify-center overflow-hidden relative group">
            <motion.div 
              animate={{ scale: [1, 1.1, 1], rotate: [0, 10, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute inset-0 bg-gradient-to-tr from-[#FF4DAB]/10 to-transparent" 
            />
            <Rocket className="text-[#FF4DAB]/20" size={200} />
            <div className="absolute bottom-10 left-10 right-10 bg-white/90 backdrop-blur-md p-10 rounded-[40px] border-2 border-[#F8F0FF] shadow-xl">
              <div className={`${bricolage.className} text-2xl font-black text-[#2D004F] mb-2`}>The Spark Lab</div>
              <p className="text-[#8E7CA3] text-sm font-medium">Testing engagement frequency across 150+ social clusters.</p>
            </div>
          </div>
          <div className="absolute -top-10 -left-10 bg-[#FFC700] text-[#2D004F] p-8 rounded-full shadow-2xl rotate-12">
            <Plus size={32} strokeWidth={3} />
          </div>
        </div>
        <div>
          <div className={`mb-10 ${inter.className} text-[#FF4DAB] font-black tracking-[0.5em] uppercase text-[10px]`}>[ CELEBRATORY_ENGINEERING ]</div>
          <h2 className={`${bricolage.className} text-6xl font-black text-[#2D004F] mb-10 leading-[1.1]`}>A REWARD FOR <br/> <span className="text-[#FF4DAB]">EVERYONE.</span></h2>
          <div className={`space-y-8 text-[#8E7CA3] text-xl leading-relaxed ${inter.className} font-medium`}>
            <p>Traditional social tools focus on the content. SocialSpark focuses on the feeling. We treat every digital interaction as a celebration, ensuring your brand feels vibrant, alive, and rewarding.</p>
            <p>Our implementation of particle physics and squishy transitions ensures that your site isn't just used—it's enjoyed.</p>
          </div>
          <SparkButton className="mt-12">CONNECT_MAIN_SPARK</SparkButton>
        </div>
      </div>
    </div>
  </section>
)

const Footer = () => (
  <footer className="py-24 px-8 bg-white border-t-4 border-[#F8F0FF]">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-16 mb-24">
        <div className="col-span-2">
          <div className={`flex items-center gap-2 ${bricolage.className} text-2xl font-black tracking-tight text-[#2D004F] mb-8`}>
            <Sparkles className="text-[#FF4DAB]" size={28} />
            SOCIAL<span className="text-[#FF4DAB]">SPARK</span>
          </div>
          <p className="text-[#8E7CA3] text-sm leading-relaxed max-w-xs font-medium uppercase tracking-widest leading-loose">The global standard for celebratory engagement design and high-energy community ROI. Vibrant since 2026.</p>
        </div>
        {[
          { title: 'The Spark', links: ['The Feed', 'Particles', 'Celebrations', 'Pricing'] },
          { title: 'Studio', links: ['About Us', 'Dopamine Lab', 'Careers', 'Brand'] },
          { title: 'Connect', links: ['Instagram', 'LinkedIn', 'Discord', 'Support'] }
        ].map(group => (
          <div key={group.title}>
            <div className="text-[10px] font-black text-[#2D004F] uppercase tracking-[0.4em] mb-10">{group.title}</div>
            <ul className="space-y-6">
              {group.links.map(link => (
                <li key={link}><a href="#" className="text-sm font-bold text-[#8E7CA3] hover:text-[#FF4DAB] transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="pt-12 border-t-2 border-[#F8F0FF] flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="text-[#8E7CA3] text-[10px] font-black uppercase tracking-[0.6em]">© 2026 SOCIALSPARK REWARD CORP. SPARK_ENCRYPTED.</div>
        <div className="flex gap-10">
          <Heart className="text-[#FF4DAB] hover:scale-125 transition-transform cursor-pointer fill-[#FF4DAB]" size={20} />
          <MessageCircle className="text-[#FF4DAB] hover:scale-125 transition-transform cursor-pointer" size={20} />
        </div>
      </div>
    </div>
  </footer>
)

const ShieldCheck = ({ className, size }: any) => <ShieldCheckOriginal className={className} size={size} />
import { ShieldCheck as ShieldCheckOriginal } from 'lucide-react'

export default function SocialSpark() {
  return (
    <div className={`min-h-screen bg-[#F8F0FF] text-[#2D004F] overflow-x-hidden ${dmSans.className}`}>
      <Navbar />
      <Hero />
      <StatsBar />
      <Features />
      <ProductDetail />
      <Footer />
      
      {/* --- Global Effects --- */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03] contrast-150 mix-blend-multiply">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <filter id="spark-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100" height="100" filter="url(#spark-noise)" />
        </svg>
      </div>
          
    </div>
  )
}

const dmSans = Inter({ subsets: ['latin'] }) // Fallback since DM_Sans import might be missing
