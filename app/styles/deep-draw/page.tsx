'use client'

import React, { useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Bricolage_Grotesque, Inter, Cormorant_Garamond } from 'next/font/google'
import { Menu, X, Paintbrush, Palette, Sparkles, Wand2, ArrowRight, Layers, Image as ImageIcon, ChevronDown, Check } from 'lucide-react'

const bricolage = Bricolage_Grotesque({ subsets: ['latin'], variable: '--font-brico' })
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const cormorant = Cormorant_Garamond({ weight: ['400', '600', '700'], subsets: ['latin'], variable: '--font-cormorant' })

const tokens = {
  background: '#121212',
  surface: '#1E1E1E',
  accent1: '#F472B6',
  accent2: '#A78BFA',
  border: 'rgba(244, 114, 182, 0.3)',
  textHigh: '#FFFFFF',
  textMuted: 'rgba(255, 255, 255, 0.6)'
}

const PRODUCT_NAME = "DeepDraw"

// Components
const DiffusionParticles = () => {
  const [particles, setParticles] = useState<any[]>([])
  useEffect(() => {
    setParticles(Array.from({ length: 40 }).map(() => ({
      width: Math.random() * 100 + 50,
      height: Math.random() * 100 + 50,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      background: `radial-gradient(circle, ${Math.random() > 0.5 ? tokens.accent1 : tokens.accent2}20 0%, transparent 70%)`,
      xMax: Math.random() * 100 - 50,
      yMax: Math.random() * 100 - 50,
      duration: Math.random() * 10 + 10
    })))
  }, [])

  return (
  <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden mix-blend-screen opacity-50">
    {particles.map((p, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full"
        style={{
          width: p.width,
          height: p.height,
          left: p.left,
          top: p.top,
          background: p.background,
          filter: 'blur(20px)'
        }}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.1, 0.4, 0.1],
          x: [0, p.xMax, 0],
          y: [0, p.yMax, 0]
        }}
        transition={{
          duration: p.duration,
          repeat: Infinity,
          ease: [0.42, 0, 0.58, 1] as [number, number, number, number]
        }}
      />
    ))}
  </div>
  )
}

const FadeUp = ({ children, delay = 0, className = '', style }: { children: React.ReactNode, delay?: number, className?: string, style?: React.CSSProperties }) => (
  <motion.div
    initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
    className={className}
    style={style}
  >
    {children}
  </motion.div>
)

const BrushStrokeUI = ({ children, color = tokens.accent1 }: { children: React.ReactNode, color?: string }) => (
  <motion.div className="relative group inline-block">
    {children}
    <motion.svg
      className="absolute -bottom-2 left-0 w-full h-3 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
      viewBox="0 0 100 10"
      preserveAspectRatio="none"
    >
      <motion.path
        d="M0 5 Q 25 0, 50 5 T 100 5"
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileHover={{ pathLength: 1 }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] }}
      />
    </motion.svg>
  </motion.div>
)

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-xl border-b" style={{ borderColor: tokens.border, backgroundColor: 'rgba(18, 18, 18, 0.8)' }}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className={`flex items-center gap-2 text-2xl font-bold ${bricolage.className}`} style={{ color: tokens.textHigh }}>
          <BrushStrokeUI><span className="flex items-center gap-2"><Paintbrush className="w-6 h-6" style={{ color: tokens.accent1 }} /> {PRODUCT_NAME}</span></BrushStrokeUI>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          {['Gallery', 'Studio', 'Pricing'].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} className={`text-sm hover:text-white transition-colors ${inter.className}`} style={{ color: tokens.textMuted }}>
              {item}
            </a>
          ))}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-2 rounded-full text-sm font-medium ${inter.className} relative overflow-hidden group`}
            style={{ backgroundColor: tokens.surface, color: tokens.textHigh, border: `1px solid ${tokens.border}` }}
          >
            <span className="relative z-10 flex items-center gap-2">Start Painting <ArrowRight className="w-4 h-4" /></span>
            <div className="absolute inset-0 z-0 bg-gradient-to-r from-[${tokens.accent1}] to-[${tokens.accent2}] opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
          </motion.button>
        </div>
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)} style={{ color: tokens.textHigh }}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b"
            style={{ borderColor: tokens.border, backgroundColor: tokens.surface }}
          >
            <div className="p-6 flex flex-col space-y-4">
              {['Gallery', 'Studio', 'Pricing'].map(item => (
                <a key={item} href={`#${item.toLowerCase()}`} className={`text-sm ${inter.className}`} style={{ color: tokens.textHigh }}>
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

function Hero() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => p < 100 ? p + 1 : 0)
    }, 100)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      <DiffusionParticles />
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <FadeUp delay={0.1}>
          <div className={`italic text-xl mb-6 ${cormorant.className}`} style={{ color: tokens.accent1 }}>
            The process is the art.
          </div>
        </FadeUp>
        <FadeUp delay={0.2}>
          <h1 className={`text-6xl md:text-8xl font-black mb-8 leading-tight ${bricolage.className}`} style={{ color: tokens.textHigh }}>
            DIFFUSE YOUR <br />
            <span className="relative inline-block">
              <span className="relative z-10">IMAGINATION</span>
              <motion.div
                className="absolute inset-0 z-0 bg-gradient-to-r"
                style={{ backgroundImage: `linear-gradient(to right, ${tokens.accent1}, ${tokens.accent2})`, opacity: 0.3, filter: 'blur(10px)' }}
                animate={{ filter: ['blur(10px)', 'blur(20px)', 'blur(10px)'] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
            </span>
          </h1>
        </FadeUp>
        <FadeUp delay={0.3}>
          <p className={`text-lg md:text-xl mb-12 max-w-2xl mx-auto ${inter.className}`} style={{ color: tokens.textMuted }}>
            A generative studio that mirrors the diffusion process. Watch your prompts unblur into masterpieces layer by layer.
          </p>
        </FadeUp>
        <FadeUp delay={0.4} className="max-w-2xl mx-auto">
          <div className="p-2 rounded-2xl border bg-black/50 backdrop-blur flex items-center gap-4" style={{ borderColor: tokens.border }}>
            <div className={`flex-1 px-4 text-left ${inter.className}`} style={{ color: tokens.textHigh }}>
              "A majestic library built into the branches of a giant sequoia tree, golden hour lighting, oil painting..."
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-xl font-bold flex items-center gap-2 ${inter.className}`}
              style={{ background: `linear-gradient(135deg, ${tokens.accent1}, ${tokens.accent2})`, color: '#fff' }}
            >
              Generate <Sparkles className="w-4 h-4" />
            </motion.button>
          </div>
          <div className="mt-4 flex items-center gap-4 px-4">
            <div className="flex-1 h-1 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r"
                style={{ backgroundImage: `linear-gradient(to right, ${tokens.accent1}, ${tokens.accent2})`, width: `${progress}%` }}
              />
            </div>
            <div className={`text-xs ${inter.className}`} style={{ color: tokens.textMuted }}>Latent Progress: {progress}%</div>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

function Stats() {
  return (
    <section className="py-20 border-y" style={{ borderColor: tokens.border, backgroundColor: tokens.surface }}>
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {[
          { label: "Artworks Generated", value: "50M+" },
          { label: "Custom Styles", value: "1,200" },
          { label: "Active Artists", value: "250K" },
          { label: "Avg Generation", value: "4s" }
        ].map((stat, i) => (
          <FadeUp key={stat.label} delay={i * 0.1}>
            <div className={`text-4xl font-black mb-2 ${bricolage.className}`} style={{ color: tokens.textHigh }}>{stat.value}</div>
            <div className={`text-sm ${inter.className}`} style={{ color: tokens.textMuted }}>{stat.label}</div>
          </FadeUp>
        ))}
      </div>
    </section>
  )
}

function Features() {
  const features = [
    { icon: Layers, title: "Layer-Stack Inspector", desc: "View the generation history of your image. Peel back layers to find the perfect iteration." },
    { icon: Palette, title: "Style Morphing", desc: "Smoothly transition between different artistic filters and historical art movements in real-time." },
    { icon: Wand2, title: "Brush-Path Tracer", desc: "Watch as the AI predicts and animates brush strokes before they solidify into pixels." }
  ]
  return (
    <section className="py-32 relative">
      <div className="max-w-6xl mx-auto px-6">
        <FadeUp>
          <h2 className={`text-4xl md:text-5xl font-black mb-16 text-center ${bricolage.className}`} style={{ color: tokens.textHigh }}>
            The Digital Canvas
          </h2>
        </FadeUp>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <FadeUp key={f.title} delay={i * 0.2}>
              <motion.div
                whileHover={{ y: -5 }}
                className="p-8 rounded-2xl border bg-black/30"
                style={{ borderColor: tokens.border }}
              >
                <div className="w-12 h-12 rounded-full mb-6 flex items-center justify-center border" style={{ backgroundColor: `${tokens.accent1}20`, borderColor: tokens.accent1 }}>
                  <f.icon className="w-6 h-6" style={{ color: tokens.accent1 }} />
                </div>
                <h3 className={`text-xl font-bold mb-3 ${bricolage.className}`} style={{ color: tokens.textHigh }}>{f.title}</h3>
                <p className={`text-sm leading-relaxed ${inter.className}`} style={{ color: tokens.textMuted }}>{f.desc}</p>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProductDetail() {
  return (
    <section className="py-32 bg-black border-y" style={{ borderColor: tokens.border }}>
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <FadeUp>
            <div className={`italic text-2xl mb-4 ${cormorant.className}`} style={{ color: tokens.accent2 }}>
              From noise to nuance.
            </div>
            <h2 className={`text-4xl md:text-5xl font-black mb-6 ${bricolage.className}`} style={{ color: tokens.textHigh }}>
              Cinematic Unblurring
            </h2>
            <p className={`text-lg mb-8 leading-relaxed ${inter.className}`} style={{ color: tokens.textMuted }}>
              DeepDraw doesn't just show you a progress bar. It visually unblurs your creation, sharpening the latent noise into distinct shapes and finally into breathtaking detail.
            </p>
            <ul className="space-y-4">
              {['Real-time preview', 'Interrupt and edit', 'Save generation steps as video'].map((item, i) => (
                <li key={i} className={`flex items-center gap-3 text-sm ${inter.className}`} style={{ color: tokens.textHigh }}>
                  <Check className="w-5 h-5" style={{ color: tokens.accent1 }} /> {item}
                </li>
              ))}
            </ul>
          </FadeUp>
        </div>
        <FadeUp>
          <div className="aspect-square rounded-2xl overflow-hidden relative border" style={{ borderColor: tokens.border }}>
            <motion.div
              animate={{ filter: ['blur(40px)', 'blur(20px)', 'blur(5px)', 'blur(0px)', 'blur(40px)'] }}
              transition={{ duration: 8, repeat: Infinity, ease: [0.42, 0, 0.58, 1] as [number, number, number, number] }}
              className="absolute inset-0"
              style={{ background: `linear-gradient(45deg, ${tokens.accent1}, ${tokens.accent2}, #38BDF8)` }}
            >
              <div className="w-full h-full opacity-50 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
            </motion.div>
            <div className="absolute inset-0 flex items-center justify-center mix-blend-overlay">
              <ImageIcon className="w-32 h-32 text-white opacity-20" />
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

function Pricing() {
  const tiers = [
    { name: "Sketch", price: "$0", desc: "For hobbyists.", features: ["100 generations/mo", "Standard resolution", "Public gallery"] },
    { name: "Canvas", price: "$19", desc: "For enthusiasts.", features: ["Unlimited generations", "4k upscaling", "Private mode", "Commercial use"], highlight: true },
    { name: "Studio", price: "$49", desc: "For professionals.", features: ["Custom style training", "API access", "Priority rendering", "Team collaboration"] }
  ]
  return (
    <section className="py-32 relative">
      <div className="max-w-6xl mx-auto px-6">
        <FadeUp className="text-center mb-16">
          <h2 className={`text-4xl font-black mb-4 ${bricolage.className}`} style={{ color: tokens.textHigh }}>Studio Access</h2>
          <p className={`text-lg ${cormorant.className} italic`} style={{ color: tokens.textMuted }}>Invest in your digital atelier.</p>
        </FadeUp>
        <div className="grid md:grid-cols-3 gap-8">
          {tiers.map((tier, i) => (
            <FadeUp key={tier.name} delay={i * 0.1}>
              <div className={`p-8 rounded-2xl border h-full flex flex-col relative ${tier.highlight ? 'bg-black/50 backdrop-blur' : 'bg-transparent'}`}
                style={{ borderColor: tier.highlight ? tokens.accent1 : tokens.border }}>
                {tier.highlight && <div className="absolute top-0 right-0 px-3 py-1 text-xs font-bold rounded-bl-lg" style={{ backgroundColor: tokens.accent1, color: '#000' }}>POPULAR</div>}
                <h3 className={`text-2xl font-bold mb-2 ${bricolage.className}`} style={{ color: tokens.textHigh }}>{tier.name}</h3>
                <div className={`text-4xl font-black mb-4 ${bricolage.className}`} style={{ color: tokens.textHigh }}>{tier.price}</div>
                <p className={`text-sm mb-8 ${inter.className}`} style={{ color: tokens.textMuted }}>{tier.desc}</p>
                <ul className="space-y-4 mb-8 flex-1">
                  {tier.features.map((f, j) => (
                    <li key={j} className={`flex items-center gap-3 text-sm ${inter.className}`} style={{ color: tokens.textHigh }}>
                      <Check className="w-4 h-4" style={{ color: tokens.accent2 }} /> {f}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 rounded-xl font-bold ${inter.className} transition-transform hover:scale-105 active:scale-95`}
                  style={{
                    background: tier.highlight ? `linear-gradient(to right, ${tokens.accent1}, ${tokens.accent2})` : 'transparent',
                    color: tier.highlight ? '#fff' : tokens.textHigh,
                    border: tier.highlight ? 'none' : `1px solid ${tokens.border}`
                  }}>
                  Choose Plan
                </button>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}

function Testimonials() {
  const testimonials = [
    { text: "The unblurring process feels magical every single time. It's not just a tool, it's an experience.", author: "Vincent V.", role: "Digital Painter" },
    { text: "The layer-stack inspector completely changed how I prompt. I can now isolate exactly which word caused a specific detail.", author: "Frida K.", role: "Concept Artist" },
    { text: "DeepDraw's style morphing is unparalleled. Blending Art Deco with Cyberpunk has never been smoother.", author: "Pablo P.", role: "Art Director" }
  ]
  return (
    <section className="py-32 bg-[#121212] border-y relative overflow-hidden" style={{ borderColor: tokens.border }}>
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#F472B6] via-transparent to-transparent" />
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <FadeUp className="text-center mb-16">
          <h2 className={`text-4xl font-black ${bricolage.className}`} style={{ color: tokens.textHigh }}>Curator Reviews</h2>
        </FadeUp>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <FadeUp key={i} delay={i * 0.2}>
              <div className="p-8 border rounded-2xl bg-black/40 backdrop-blur" style={{ borderColor: tokens.border }}>
                <p className={`text-lg italic leading-relaxed mb-6 ${cormorant.className}`} style={{ color: tokens.textHigh }}>"{t.text}"</p>
                <div>
                  <div className={`font-bold ${inter.className}`} style={{ color: tokens.accent1 }}>{t.author}</div>
                  <div className={`text-xs uppercase tracking-wider ${inter.className}`} style={{ color: tokens.textMuted }}>{t.role}</div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQ() {
  const faqs = [
    { q: "Can I sell the art I generate?", a: "Yes, on the Canvas and Studio plans, you own full commercial rights to the images you generate." },
    { q: "What is the 'Brush-Path Tracer'?", a: "It's an optional visual mode that animates the generation process to look like an invisible artist is painting your prompt in real-time." },
    { q: "How do I train my own style?", a: "Studio members can upload 15-20 reference images to train a custom LoRA model that can be applied to any future prompt." }
  ]
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="py-32">
      <div className="max-w-3xl mx-auto px-6">
        <FadeUp className="mb-16 text-center">
          <h2 className={`text-4xl font-black ${bricolage.className}`} style={{ color: tokens.textHigh }}>Common Inquiries</h2>
        </FadeUp>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <FadeUp key={i} delay={i * 0.1}>
              <div className="border rounded-2xl overflow-hidden" style={{ borderColor: tokens.border, backgroundColor: tokens.surface }}>
                <button
                  className="w-full flex items-center justify-between p-6 text-left"
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  <span className={`font-bold text-lg ${bricolage.className}`} style={{ color: tokens.textHigh }}>{faq.q}</span>
                  <motion.div animate={{ rotate: open === i ? 180 : 0 }}>
                    <ChevronDown className="w-5 h-5" style={{ color: tokens.accent1 }} />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className={`p-6 pt-0 text-sm leading-relaxed ${inter.className}`} style={{ color: tokens.textMuted }}>
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}

function Newsletter() {
  return (
    <section className="py-32 relative border-t bg-[#121212]" style={{ borderColor: tokens.border }}>
      <div className="max-w-2xl mx-auto px-6 text-center relative z-10">
        <FadeUp>
          <div className="mb-6 flex justify-center">
            <Palette className="w-12 h-12" style={{ color: tokens.accent2 }} />
          </div>
          <h2 className={`text-4xl font-black mb-4 ${bricolage.className}`} style={{ color: tokens.textHigh }}>Join the Gallery</h2>
          <p className={`mb-10 text-lg italic ${cormorant.className}`} style={{ color: tokens.textMuted }}>Get weekly prompts, style guides, and model updates.</p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className={`flex-1 px-6 py-4 rounded-xl border bg-black/50 text-sm focus:outline-none focus:border-[${tokens.accent1}] ${inter.className}`}
              style={{ borderColor: tokens.border, color: tokens.textHigh }}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-8 py-4 rounded-xl font-bold ${inter.className}`}
              style={{ background: `linear-gradient(to right, ${tokens.accent1}, ${tokens.accent2})`, color: '#fff' }}
            >
              Subscribe
            </motion.button>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="py-12 border-t" style={{ borderColor: tokens.border, backgroundColor: 'black' }}>
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className={`flex items-center gap-2 text-xl font-bold ${bricolage.className}`} style={{ color: tokens.textHigh }}>
          <Paintbrush className="w-5 h-5" style={{ color: tokens.accent1 }} /> {PRODUCT_NAME}
        </div>
        <div className={`text-sm ${inter.className}`} style={{ color: tokens.textMuted }}>
          &copy; 2026 DeepDraw Studio. Crafted with AI.
        </div>
        <div className="flex gap-6">
          {['Terms', 'Privacy', 'Twitter'].map(l => (
            <a key={l} href="#" className={`text-sm hover:text-[${tokens.accent1}] transition-colors ${inter.className}`} style={{ color: tokens.textMuted }}>{l}</a>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default function DeepDrawPage() {
  return (
    <div className={`min-h-screen selection:bg-[${tokens.accent1}] selection:text-white`} style={{ backgroundColor: tokens.background }}>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Features />
        <ProductDetail />
        <Pricing />
        <Testimonials />
        <FAQ />
        <Newsletter />
      </main>
      <Footer />
      
      </div>
  )
}
