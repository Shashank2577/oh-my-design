'use client'

/**
 * CLAYMORPHISM STYLE PAGE
 * 
 * DESIGN PROTOCOL: KINETIC DESIGN (BUOYANCY + TACTILE SHADOWS)
 * ETHOS: PLAYFUL, 3D, TOUCHABLE
 * MOTION: HIGH-STIFFNESS SPRINGS (STIFFNESS: 400, DAMPING: 25)
 */

import { Nunito, DM_Sans } from 'next/font/google'
import {
  Star, Check, Layout, Palette, Code2, BarChart, Lock, Settings, 
  ArrowRight, MousePointer2, Sparkles, Layers, Box
} from 'lucide-react'
import * as React from 'react'
import { 
  motion, 
  AnimatePresence, 
  useScroll, 
  useTransform, 
  useSpring,
  useReducedMotion
} from 'framer-motion'

// 1. FONT CONFIGURATION
// Nunito for headings - its rounded terminals complement the claymorphic aesthetic.
const nunito = Nunito({
  subsets: ['latin'],
  weight: ['700', '800', '900'],
  variable: '--font-heading',
  display: 'swap',
})

// DM Sans for body - high legibility with a modern geometric feel.
const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-body',
  display: 'swap',
})

// 2. DESIGN TOKENS
// A vibrant, candy-like palette that feels edible and premium.
const tokens = {
  background: '#F4F1FA', // Soft lavender mist
  foreground: '#332F3A', // Deep charcoal
  muted: '#635F69',      // Graphite
  accent: '#7C3AED',     // Royal Violet
  accentSecondary: '#DB2777', // Rose Pink
  accentTertiary: '#0EA5E9',  // Sky Blue
  success: '#10B981',    // Emerald
  cardBg: 'rgba(255, 255, 255, 0.7)', // Translucent frost
}

// 3. SHADOW TOKENS
// Multi-layered shadows create the "volume" effect of clay.
// Inner shadows create the concave "pushed in" look.
const shadows = {
  // Surface level (concave background)
  surface: '30px 30px 60px #cdc6d9, -30px -30px 60px #ffffff, inset 10px 10px 20px rgba(139, 92, 246, 0.05), inset -10px -10px 20px rgba(255, 255, 255, 0.8)',
  
  // Standalone card (outer volume + inner sheen)
  card: '16px 16px 32px rgba(160, 150, 180, 0.2), -10px -10px 24px rgba(255, 255, 255, 0.9), inset 6px 6px 12px rgba(139, 92, 246, 0.03), inset -6px -6px 12px rgba(255, 255, 255, 1)',
  
  // Elevated hover state
  cardHover: '24px 24px 48px rgba(160, 150, 180, 0.3), -12px -12px 30px rgba(255, 255, 255, 1), inset 8px 8px 16px rgba(139, 92, 246, 0.04), inset -8px -8px 16px rgba(255, 255, 255, 1)',
  
  // Interactive button
  button: '12px 12px 24px rgba(139, 92, 246, 0.3), -8px -8px 16px rgba(255, 255, 255, 0.4), inset 4px 4px 8px rgba(255, 255, 255, 0.4), inset -4px -4px 8px rgba(0, 0, 0, 0.1)',
  buttonHover: '16px 16px 32px rgba(139, 92, 246, 0.4), -10px -10px 20px rgba(255, 255, 255, 0.5), inset 4px 4px 8px rgba(255, 255, 255, 0.4), inset -4px -4px 8px rgba(0, 0, 0, 0.1)',
  
  // Pressed state (swaps outer volume for inner depression)
  pressed: 'inset 10px 10px 20px #d9d4e3, inset -10px -10px 20px #ffffff',
}

// 4. MOTION CONSTANTS (Kinetic Design Protocol)
// High-stiffness springs simulate the "buoyancy" of high-quality silicone/clay.
const KINETIC_SPRING = {
  type: 'spring' as const,
  stiffness: 400, // Very snappy
  damping: 25,    // Controlled rebound
  mass: 1,
}

// ─────────────────────────────────────────────
// MOTION WRAPPER COMPONENTS
// ─────────────────────────────────────────────

/**
 * AnimatedSection handles viewport entry with a spring "pop".
 */
function AnimatedSection({ children, className, delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) {
  const shouldReduce = useReducedMotion()
  return (
    <motion.section
      className={className}
      initial={shouldReduce ? false : { opacity: 0, scale: 0.9, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ ...KINETIC_SPRING, delay }}
    >
      {children}
    </motion.section>
  )
}

/**
 * AnimatedButton simulates the physical squish of clay when pressed.
 */
function AnimatedButton({ children, className, style, hoverShadow, activeShadow, ...props }: any) {
  return (
    <motion.button
      className={className}
      style={style}
      whileHover={{ 
        scale: 1.05, 
        y: -4,
        boxShadow: hoverShadow || shadows.buttonHover 
      }}
      whileTap={{ 
        scale: 0.95, 
        y: 2,
        boxShadow: activeShadow || shadows.pressed 
      }}
      transition={KINETIC_SPRING}
      {...props}
    >
      {children}
    </motion.button>
  )
}

/**
 * AnimatedCard floats upward on hover, expanding its volume.
 */
function AnimatedCard({ children, className, style, hoverShadow }: any) {
  return (
    <motion.div
      className={className}
      style={style}
      whileHover={{ 
        y: -12, 
        scale: 1.02,
        boxShadow: hoverShadow || shadows.cardHover 
      }}
      transition={KINETIC_SPRING}
    >
      {children}
    </motion.div>
  )
}

/**
 * ScrollShadowContainer: Elements inside this container shift their shadows
 * as the user scrolls, simulating a moving light source.
 */
function ScrollShadowContainer({ children, className }: { children: React.ReactNode, className?: string }) {
  const { scrollYProgress } = useScroll()
  
  // Calculate dynamic shadow offsets based on scroll position
  const shadowX = useTransform(scrollYProgress, [0, 1], [16, 8])
  const shadowY = useTransform(scrollYProgress, [0, 1], [16, 32])
  
  // Use springs to smooth out the shadow movement
  const springX = useSpring(shadowX, { stiffness: 100, damping: 30 })
  const springY = useSpring(shadowY, { stiffness: 100, damping: 30 })

  return (
    <motion.div 
      className={className}
      style={{
        boxShadow: `${springX.get()}px ${springY.get()}px 32px rgba(160, 150, 180, 0.2), -10px -10px 24px rgba(255, 255, 255, 0.9)`
      } as any}
    >
      {children}
    </motion.div>
  )
}

// ─────────────────────────────────────────────
// UI COMPONENTS
// ─────────────────────────────────────────────

function BackgroundBlobs() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Dynamic blobs that react to "gravity" */}
      <motion.div
        animate={{
          y: [0, -60, 0],
          x: [0, 40, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[5%] left-[10%] w-[40rem] h-[40rem] rounded-full blur-[100px] opacity-20"
        style={{ backgroundColor: tokens.accent }}
      />
      <motion.div
        animate={{
          y: [0, 80, 0],
          x: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-[5%] right-[10%] w-[45rem] h-[45rem] rounded-full blur-[120px] opacity-20"
        style={{ backgroundColor: tokens.accentSecondary }}
      />
    </div>
  )
}

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 pt-6 px-6">
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={KINETIC_SPRING}
        className="max-w-5xl mx-auto h-20 rounded-[40px] flex items-center justify-between px-8 backdrop-blur-xl"
        style={{ backgroundColor: tokens.cardBg, boxShadow: shadows.card }}
      >
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ backgroundColor: tokens.accent, boxShadow: shadows.button }}>
                <Box className="w-6 h-6 text-white" />
            </div>
            <span className="font-heading font-black text-2xl tracking-tight" style={{ color: tokens.accent, fontFamily: 'var(--font-heading)' }}>
                ClayFlow
            </span>
        </div>
        
        <div className="hidden md:flex items-center gap-10">
          {['Features', 'Pricing', 'Docs'].map(link => (
            <motion.a
              key={link}
              href={`#${link.toLowerCase()}`}
              whileHover={{ scale: 1.1, color: tokens.accent }}
              className="text-base font-bold transition-colors"
              style={{ color: tokens.muted }}
            >
              {link}
            </motion.a>
          ))}
        </div>

        <AnimatedButton
          className="h-12 px-8 rounded-[24px] font-bold text-white text-sm"
          style={{ background: `linear-gradient(to bottom right, #A78BFA, ${tokens.accent})`, boxShadow: shadows.button }}
        >
          Get Started
        </AnimatedButton>
      </motion.div>
    </nav>
  )
}

function Hero() {
  return (
    <section className="min-h-screen flex items-center pt-32 pb-20 relative">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="max-w-2xl">
            <AnimatedSection delay={0.1}>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 bg-white/50 backdrop-blur-sm" style={{ boxShadow: shadows.button }}>
                    <Sparkles className="w-4 h-4 text-violet-600" />
                    <span className="text-sm font-black uppercase tracking-wider text-violet-600">The Future is Squishy</span>
                </div>
                <h1
                className="text-6xl md:text-8xl font-black tracking-tight leading-[1.05] mb-8"
                style={{ fontFamily: 'var(--font-heading)', color: tokens.foreground }}
                >
                Build with <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(to bottom right, ${tokens.accent}, ${tokens.accentSecondary})` }}>Tactile</span> Precision.
                </h1>
                <p className="text-xl md:text-2xl mb-12 leading-relaxed font-medium text-slate-600">
                Experience the world&apos;s first claymorphic design engine. Mold, stretch, and animate your interfaces with physical intuition.
                </p>
                <div className="flex flex-col sm:flex-row gap-6">
                <AnimatedButton
                    className="h-20 px-12 rounded-[32px] font-black text-white text-xl w-full sm:w-auto flex items-center justify-center gap-3"
                    style={{ background: `linear-gradient(to bottom right, #A78BFA, ${tokens.accent})`, boxShadow: shadows.button }}
                >
                    Start Crafting <ArrowRight className="w-6 h-6" />
                </AnimatedButton>
                <AnimatedButton
                    className="h-20 px-12 rounded-[32px] font-black text-xl w-full sm:w-auto bg-white flex items-center justify-center gap-3"
                    style={{ color: tokens.foreground, boxShadow: shadows.button }}
                >
                    View Gallery
                </AnimatedButton>
                </div>
            </AnimatedSection>
          </div>

          <AnimatedSection delay={0.4} className="relative">
            {/* The "Hero Blob" - A complex clay composition */}
            <div
              className="w-full aspect-square rounded-[80px] relative backdrop-blur-xl animate-[clay-float-slow_10s_ease-in-out_infinite] flex items-center justify-center"
              style={{ backgroundColor: tokens.cardBg, boxShadow: shadows.card }}
            >
                {/* Floating Elements */}
                <motion.div 
                    animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
                    transition={{ duration: 6, repeat: Infinity }}
                    className="absolute -top-10 -right-10 w-48 h-48 rounded-[40px] flex items-center justify-center" 
                    style={{ background: `linear-gradient(to bottom right, #F472B6, ${tokens.accentSecondary})`, boxShadow: shadows.button }}
                >
                    <Layers className="w-20 h-20 text-white opacity-80" />
                </motion.div>

                <motion.div 
                    animate={{ y: [0, 30, 0], rotate: [0, -15, 0] }}
                    transition={{ duration: 8, repeat: Infinity }}
                    className="absolute -bottom-10 -left-10 w-56 h-56 rounded-full flex items-center justify-center" 
                    style={{ background: `linear-gradient(to bottom right, #38BDF8, ${tokens.accentTertiary})`, boxShadow: shadows.button }}
                >
                    <MousePointer2 className="w-24 h-24 text-white opacity-80" />
                </motion.div>

                {/* Center Core */}
                <div className="w-2/3 h-2/3 rounded-full backdrop-blur-md flex items-center justify-center relative overflow-hidden" style={{ background: 'rgba(255,255,255,0.4)', boxShadow: shadows.card }}>
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent" />
                    <motion.div 
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="w-40 h-40 rounded-3xl bg-white shadow-inner flex items-center justify-center"
                        style={{ boxShadow: shadows.pressed }}
                    >
                        <Box className="w-20 h-20" style={{ color: tokens.accent }} />
                    </motion.div>
                </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}

function Features() {
  const features = [
    { icon: Layout, title: 'Bouncy Layouts', desc: 'Interfaces that react with physical momentum.' },
    { icon: Palette, title: 'Candy Shades', desc: 'Vibrant palettes that keep users energized.' },
    { icon: Settings, title: 'Tactile Inputs', desc: 'Controls that feel like premium silicone.' },
  ]

  return (
    <section id="features" className="py-32">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection className="text-center mb-24">
            <h2 className="text-5xl md:text-6xl font-black mb-6" style={{ fontFamily: 'var(--font-heading)', color: tokens.foreground }}>
                Interactive by Nature
            </h2>
            <p className="text-xl font-medium max-w-2xl mx-auto" style={{ color: tokens.muted }}>
                Every component is a tactile experience. moldable, responsive, and alive.
            </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-10">
          {features.map((feature, i) => (
            <AnimatedSection key={feature.title} delay={i * 0.1}>
               <AnimatedCard
                className="p-12 h-full flex flex-col items-center text-center backdrop-blur-xl rounded-[48px]"
                style={{ backgroundColor: tokens.cardBg, boxShadow: shadows.card }}
              >
                <div
                  className="w-20 h-20 rounded-[30px] flex items-center justify-center mb-10"
                  style={{ background: `linear-gradient(to bottom right, #A78BFA, ${tokens.accent})`, boxShadow: shadows.button }}
                >
                  <feature.icon className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-3xl font-black mb-6" style={{ fontFamily: 'var(--font-heading)', color: tokens.foreground }}>{feature.title}</h3>
                <p className="text-lg font-medium leading-relaxed" style={{ color: tokens.muted }}>{feature.desc}</p>
              </AnimatedCard>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProductShowcase() {
    return (
        <section className="py-32 bg-white/30 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-24 items-center">
                    <AnimatedSection>
                        <div className="p-4 rounded-[60px] bg-slate-200/50" style={{ boxShadow: shadows.pressed }}>
                            <div className="aspect-video rounded-[48px] bg-white overflow-hidden relative" style={{ boxShadow: shadows.card }}>
                                {/* Simulated Clay Dashboard */}
                                <div className="absolute inset-0 p-10 flex gap-8">
                                    <div className="w-1/4 h-full rounded-3xl bg-slate-50 shadow-inner flex flex-col gap-6 p-6" style={{ boxShadow: shadows.pressed }}>
                                        {[1,2,3,4].map(i => <div key={i} className="h-8 w-full rounded-xl bg-slate-200" />)}
                                    </div>
                                    <div className="flex-1 flex flex-col gap-8">
                                        <div className="h-32 w-full rounded-[32px] bg-violet-50 flex items-center px-10 gap-6" style={{ boxShadow: shadows.card }}>
                                            <div className="w-16 h-16 rounded-2xl bg-violet-600 shadow-lg" />
                                            <div className="space-y-3">
                                                <div className="h-4 w-48 rounded bg-violet-200" />
                                                <div className="h-4 w-32 rounded bg-violet-100" />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-8 flex-1">
                                            <div className="rounded-[32px] bg-pink-50 shadow-lg p-8" style={{ boxShadow: shadows.card }}>
                                                <div className="w-12 h-12 rounded-xl bg-pink-500 mb-4" />
                                                <div className="h-4 w-full rounded bg-pink-200" />
                                            </div>
                                            <div className="rounded-[32px] bg-sky-50 shadow-lg p-8" style={{ boxShadow: shadows.card }}>
                                                <div className="w-12 h-12 rounded-xl bg-sky-500 mb-4" />
                                                <div className="h-4 w-full rounded bg-sky-200" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </AnimatedSection>

                    <AnimatedSection delay={0.2}>
                        <h2 className="text-5xl font-black mb-8" style={{ fontFamily: 'var(--font-heading)', color: tokens.foreground }}>
                            The feel of physical craft, in code.
                        </h2>
                        <div className="space-y-10">
                            {[
                                { t: 'Spring Buoyancy', d: 'High-stiffness physics for instant, satisfying feedback.' },
                                { t: 'Light Shifting', d: 'Shadows that react to your scroll position.' },
                                { t: 'Matte Textures', d: 'Non-glare, premium finishes for eye comfort.' }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-6">
                                    <div className="w-14 h-14 rounded-2xl shrink-0 flex items-center justify-center bg-white" style={{ boxShadow: shadows.button }}>
                                        <Check className="w-8 h-8 text-emerald-500" strokeWidth={3} />
                                    </div>
                                    <div>
                                        <h4 className="text-2xl font-black mb-2" style={{ color: tokens.foreground }}>{item.t}</h4>
                                        <p className="text-lg font-medium text-slate-500">{item.d}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </AnimatedSection>
                </div>
            </div>
        </section>
    )
}

function Pricing() {
    return (
        <section id="pricing" className="py-32">
            <div className="max-w-7xl mx-auto px-6">
                <AnimatedSection className="text-center mb-24">
                    <h2 className="text-5xl font-black mb-6" style={{ fontFamily: 'var(--font-heading)', color: tokens.foreground }}>Fair & Transparent</h2>
                </AnimatedSection>

                <div className="grid md:grid-cols-3 gap-10">
                    {[
                        { name: 'Maker', price: '$0', color: tokens.accentTertiary },
                        { name: 'Studio', price: '$29', color: tokens.accent, featured: true },
                        { name: 'Agency', price: '$99', color: tokens.accentSecondary },
                    ].map((tier, i) => (
                        <AnimatedSection key={tier.name} delay={i * 0.1}>
                            <AnimatedCard 
                                className={`p-12 rounded-[48px] backdrop-blur-xl relative flex flex-col h-full ${tier.featured ? 'scale-110 z-10' : ''}`}
                                style={{ backgroundColor: tokens.cardBg, boxShadow: tier.featured ? shadows.cardHover : shadows.card }}
                            >
                                <h3 className="text-3xl font-black mb-2" style={{ color: tokens.foreground }}>{tier.name}</h3>
                                <div className="flex items-baseline gap-2 mb-8">
                                    <span className="text-6xl font-black" style={{ color: tier.color }}>{tier.price}</span>
                                    <span className="text-slate-400 font-bold">/mo</span>
                                </div>
                                <ul className="space-y-6 mb-12 flex-1">
                                    {[1,2,3].map(j => (
                                        <li key={j} className="flex items-center gap-4">
                                            <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
                                                <Check className="w-4 h-4 text-emerald-600" />
                                            </div>
                                            <span className="font-bold text-slate-600">Premium Feature {j}</span>
                                        </li>
                                    ))}
                                </ul>
                                <AnimatedButton 
                                    className="w-full h-16 rounded-3xl font-black text-white text-lg"
                                    style={{ background: tier.featured ? `linear-gradient(to right, ${tokens.accent}, ${tokens.accentSecondary})` : tokens.foreground, boxShadow: shadows.button }}
                                >
                                    Select Plan
                                </AnimatedButton>
                            </AnimatedCard>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
    )
}

function Footer() {
    return (
        <footer className="py-20">
            <div className="max-w-7xl mx-auto px-6">
                <div className="h-px w-full bg-slate-200 mb-20" />
                <div className="flex flex-col md:flex-row justify-between items-center gap-10">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-violet-600 shadow-lg flex items-center justify-center">
                            <Box className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-heading font-black text-xl" style={{ color: tokens.accent }}>ClayFlow</span>
                    </div>
                    <p className="font-bold text-slate-400">© 2026 ClayFlow Engine. Built with tactile joy.</p>
                    <div className="flex gap-10">
                        {['Twitter', 'Discord', 'Github'].map(s => (
                            <a key={s} href="#" className="font-black text-slate-600 hover:text-violet-600 transition-colors">{s}</a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default function ClaymorphismPage() {
  return (
    <div className={`${nunito.variable} ${dmSans.variable} font-sans min-h-screen relative overflow-hidden`} style={{ backgroundColor: tokens.background }}>
      {/* 
        The BackgroundBlobs provide the ambient environment.
        They use low-frequency movement to avoid distraction while maintaining depth.
      */}
      <BackgroundBlobs />
      
      {/* 
        The Surface Overlay provides the "inner shadow" of the whole screen,
        giving the impression that the interface is recessed into a large clay block.
      */}
      <div className="fixed inset-0 pointer-events-none z-50 ring-[40px] ring-inset ring-white/10" style={{ boxShadow: 'inset 0 0 100px rgba(0,0,0,0.02)' }} />

      <Navbar />

      <main className="relative z-10">
        <Hero />
        <Features />
        <ProductShowcase />
        <Pricing />
      </main>

      <Footer />

      {/* Global CSS for kinetic animations that are too complex for framer alone */}
      <style jsx global>{`
        @keyframes clay-float-slow {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(3deg); }
        }
        @keyframes clay-breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        /* Smooth scrolling for that premium feel */
        html {
          scroll-behavior: smooth;
        }

        /* Selection styling */
        ::selection {
          background: #7C3AED;
          color: white;
        }
      `}</style>
    </div>
  )
}
