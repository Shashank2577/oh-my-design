'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Space_Grotesk, Outfit, JetBrains_Mono } from 'next/font/google'
import { Menu, X, ArrowRight, Database, Box, Hexagon, Crosshair, ChevronDown, Check, Activity, Target } from 'lucide-react'

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-grotesk' })
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' })
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains' })

const tokens = {
  background: '#020617',
  surface: 'rgba(30, 41, 59, 0.5)',
  accent1: '#38BDF8',
  accent2: '#818CF8',
  border: 'rgba(56, 189, 248, 0.2)',
  textHigh: '#F1F5F9',
  textMuted: 'rgba(241, 245, 249, 0.6)'
}

const PRODUCT_NAME = "VectorVault"

const PointCloud = () => {
  const [points, setPoints] = useState<any[]>([])
  useEffect(() => {
    setPoints(Array.from({ length: 50 }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      backgroundColor: Math.random() > 0.5 ? tokens.accent1 : tokens.accent2,
      delay: Math.random() * 10,
      duration: Math.random() * 10 + 10,
      yMax: Math.random() * 40 - 20,
      xMax: Math.random() * 40 - 20
    })))
  }, [])

  return (
  <div className="absolute inset-0 z-0 pointer-events-none opacity-30 overflow-hidden">
    {points.map((p, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 rounded-full"
        style={{
          left: p.left,
          top: p.top,
          backgroundColor: p.backgroundColor,
          boxShadow: `0 0 10px ${tokens.accent1}`
        }}
        animate={{
          y: [0, p.yMax, 0],
          x: [0, p.xMax, 0],
          opacity: [0.2, 1, 0.2]
        }}
        transition={{
          duration: p.duration,
          repeat: Infinity,
          ease: [0.42, 0, 0.58, 1]
        }}
      />
    ))}
  </div>
  )
}

const FadeUp = ({ children, delay = 0, className = '', style }: { children: React.ReactNode, delay?: number, className?: string, style?: React.CSSProperties }) => (
  <motion.div
    initial={{ opacity: 0, z: -100, y: 50 }}
    whileInView={{ opacity: 1, z: 0, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    className={className} style={{ ...style, transformStyle: "preserve-3d" }}

  >
    {children}
  </motion.div>
)

const CoordinateHUD = () => {
  const [coords, setCoords] = useState({ x: 0, y: 0, z: 0 })
  useEffect(() => {
    const handleScroll = () => {
      setCoords({
        x: Number((window.scrollY * 0.1).toFixed(2)),
        y: Number((Math.sin(window.scrollY * 0.01) * 100).toFixed(2)),
        z: Number((Math.cos(window.scrollY * 0.01) * 100).toFixed(2))
      })
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className={`fixed bottom-6 right-6 z-50 p-4 border rounded bg-[${tokens.background}]/80 backdrop-blur-md ${jetbrains.className} text-xs`} style={{ borderColor: tokens.border, color: tokens.accent1 }}>
      <div>X: {coords.x}</div>
      <div>Y: {coords.y}</div>
      <div>Z: {coords.z}</div>
    </div>
  )
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-xl border-b" style={{ borderColor: tokens.border, backgroundColor: 'rgba(2, 6, 23, 0.7)' }}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className={`flex items-center gap-2 text-xl font-bold ${spaceGrotesk.className}`} style={{ color: tokens.textHigh }}>
          <Hexagon className="w-6 h-6" style={{ color: tokens.accent1 }} /> {PRODUCT_NAME}
        </div>
        <div className="hidden md:flex items-center space-x-8">
          {['Dimensionality', 'Architecture', 'Nodes'].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} className={`text-sm hover:text-white transition-colors ${outfit.className}`} style={{ color: tokens.textMuted }}>
              {item}
            </a>
          ))}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-5 py-2 rounded text-sm font-medium ${outfit.className} flex items-center gap-2 border`}
            style={{ borderColor: tokens.accent1, color: tokens.accent1 }}
          >
            Connect <ArrowRight className="w-4 h-4" />
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
              {['Dimensionality', 'Architecture', 'Nodes'].map(item => (
                <a key={item} href={`#${item.toLowerCase()}`} className={`text-sm ${outfit.className}`} style={{ color: tokens.textHigh }}>
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
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden" style={{ perspective: 1000 }}>
      <PointCloud />
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <FadeUp delay={0.1}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm border mb-8" style={{ borderColor: tokens.border, backgroundColor: tokens.surface }}>
            <Activity className="w-4 h-4 animate-pulse" style={{ color: tokens.accent1 }} />
            <span className={`text-xs uppercase tracking-wider ${jetbrains.className}`} style={{ color: tokens.textHigh }}>
              v2.0 Embeddings Engine Online
            </span>
          </div>
        </FadeUp>
        <FadeUp delay={0.2}>
          <h1 className={`text-6xl md:text-8xl font-bold mb-6 tracking-tight ${spaceGrotesk.className}`} style={{ color: tokens.textHigh }}>
            MAP THE <span style={{ color: tokens.accent1 }}>HIGH</span><br />
            DIMENSIONAL <span style={{ color: tokens.accent2 }}>SPACE</span>
          </h1>
        </FadeUp>
        <FadeUp delay={0.3}>
          <p className={`text-xl mb-10 max-w-2xl mx-auto ${outfit.className}`} style={{ color: tokens.textMuted }}>
            Store, index, and query vector embeddings at hyperscale. VectorVault visualizes semantic similarity in 3D space.
          </p>
        </FadeUp>
        <FadeUp delay={0.4}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-8 py-3 rounded font-medium ${outfit.className}`}
              style={{ backgroundColor: tokens.accent1, color: tokens.background }}
            >
              Deploy Cluster
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-8 py-3 rounded font-medium border ${outfit.className}`}
              style={{ borderColor: tokens.border, color: tokens.textHigh, backgroundColor: tokens.surface }}
            >
              View Documentation
            </motion.button>
          </div>
        </FadeUp>
      </div>
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className={`text-xs ${jetbrains.className}`} style={{ color: tokens.accent1 }}>SCROLL TO INJECT</div>
        <div className="w-[1px] h-12" style={{ background: `linear-gradient(to bottom, ${tokens.accent1}, transparent)` }} />
      </motion.div>
    </section>
  )
}

function Stats() {
  return (
    <section className="py-20 border-y relative z-10" style={{ borderColor: tokens.border, backgroundColor: 'rgba(2, 6, 23, 0.8)', backdropFilter: 'blur(10px)' }}>
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
        {[
          { label: "Query Latency", value: "< 10ms" },
          { label: "Vector Dimensions", value: "Up to 1536" },
          { label: "Throughput", value: "1M QPS" },
          { label: "Uptime", value: "99.99%" }
        ].map((stat, i) => (
          <FadeUp key={stat.label} delay={i * 0.1} className="border-l pl-6" style={{ borderColor: tokens.border }}>
            <div className={`text-3xl font-bold mb-2 ${spaceGrotesk.className}`} style={{ color: tokens.textHigh }}>{stat.value}</div>
            <div className={`text-xs uppercase tracking-widest ${jetbrains.className}`} style={{ color: tokens.textMuted }}>{stat.label}</div>
          </FadeUp>
        ))}
      </div>
    </section>
  )
}

function Features() {
  const features = [
    { icon: Crosshair, title: "Similarity Search", desc: "Find nearest neighbors in milliseconds using optimized HNSW algorithms." },
    { icon: Box, title: "Spatial Clustering", desc: "Automatically group vectors into semantic namespaces." },
    { icon: Database, title: "Multi-modal Sync", desc: "Map text, images, and audio into the same vast embedding space." }
  ]
  return (
    <section className="py-32 relative z-10">
      <div className="max-w-6xl mx-auto px-6">
        <FadeUp>
          <h2 className={`text-4xl md:text-5xl font-bold mb-16 ${spaceGrotesk.className}`} style={{ color: tokens.textHigh }}>
            Architectural Supremacy
          </h2>
        </FadeUp>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <FadeUp key={f.title} delay={i * 0.2}>
              <motion.div
                whileHover={{ scale: 1.02, backgroundColor: tokens.surface }}
                className="p-8 rounded-lg border h-full transition-colors"
                style={{ borderColor: tokens.border, backgroundColor: 'transparent' }}
              >
                <div className="w-12 h-12 rounded bg-opacity-10 mb-6 flex items-center justify-center border" style={{ backgroundColor: `${tokens.accent1}20`, borderColor: tokens.accent1 }}>
                  <f.icon className="w-6 h-6" style={{ color: tokens.accent1 }} />
                </div>
                <h3 className={`text-xl font-bold mb-3 ${spaceGrotesk.className}`} style={{ color: tokens.textHigh }}>{f.title}</h3>
                <p className={`text-sm leading-relaxed ${outfit.className}`} style={{ color: tokens.textMuted }}>{f.desc}</p>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProductDetail() {
  const [similarity, setSimilarity] = useState(0.85)
  const [nodes, setNodes] = useState<any[]>([])

  useEffect(() => {
    setNodes(Array.from({ length: 30 }).map(() => ({
      left: `${10 + Math.random() * 80}%`,
      top: `${10 + Math.random() * 80}%`,
      backgroundColor: Math.random() > 0.5 ? tokens.accent1 : tokens.accent2,
      threshold: Math.random()
    })))
  }, [])

  return (
    <section className="py-32 relative z-10 overflow-hidden bg-black/50 border-y" style={{ borderColor: tokens.border }}>
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <FadeUp>
            <h2 className={`text-4xl font-bold mb-6 ${spaceGrotesk.className}`} style={{ color: tokens.textHigh }}>
              Visualize Semantic Distance
            </h2>
            <p className={`text-lg mb-8 ${outfit.className}`} style={{ color: tokens.textMuted }}>
              Adjust the similarity threshold to expand your cluster view. Watch as the engine snaps to relevant nodes in the high-dimensional web.
            </p>
            <div className="mb-8">
              <div className="flex justify-between mb-2">
                <span className={`text-xs ${jetbrains.className}`} style={{ color: tokens.textMuted }}>Similarity Threshold</span>
                <span className={`text-xs font-bold ${jetbrains.className}`} style={{ color: tokens.accent1 }}>{similarity.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0" max="1" step="0.01"
                value={similarity}
                onChange={e => setSimilarity(parseFloat(e.target.value))}
                className="w-full accent-[#38BDF8]"
              />
            </div>
            <ul className="space-y-3">
              {['Dynamic indexing', 'Cosine similarity', 'Dot product optimization'].map((item, i) => (
                <li key={i} className={`flex items-center gap-3 text-sm ${outfit.className}`} style={{ color: tokens.textHigh }}>
                  <Target className="w-4 h-4" style={{ color: tokens.accent1 }} /> {item}
                </li>
              ))}
            </ul>
          </FadeUp>
        </div>
        <div className="relative h-96 border rounded-lg overflow-hidden flex items-center justify-center bg-[#020617]" style={{ borderColor: tokens.border }}>
          {nodes.map((node, i) => {
            const isVisible = node.threshold < similarity
            return (
              <motion.div
                key={i}
                initial={false}
                animate={{
                  scale: isVisible ? 1 : 0,
                  opacity: isVisible ? 1 : 0,
                }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  left: node.left,
                  top: node.top,
                  backgroundColor: node.backgroundColor,
                  boxShadow: `0 0 10px ${tokens.accent1}`
                }}
              />
            )
          })}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-32 h-32 border border-dashed rounded-full animate-spin-slow" style={{ borderColor: tokens.accent1, opacity: similarity }} />
            <div className="absolute w-48 h-48 border border-dashed rounded-full animate-spin-reverse-slow" style={{ borderColor: tokens.accent2, opacity: similarity * 0.5 }} />
          </div>
        </div>
      </div>
    </section>
  )
}

function Pricing() {
  const tiers = [
    { name: "Developer", price: "Free", desc: "For prototyping models.", features: ["1M Vectors", "1GB Storage", "Community Support"] },
    { name: "Production", price: "$0.05", unit: "/ GB", desc: "Pay as you scale.", features: ["Infinite Vectors", "Auto-scaling", "SLA 99.9%"], highlight: true },
    { name: "Enterprise", price: "Custom", desc: "Dedicated infrastructure.", features: ["VPC Peering", "SOC2 Compliance", "Dedicated Support"] }
  ]

  return (
    <section className="py-32 relative z-10">
      <div className="max-w-6xl mx-auto px-6">
        <FadeUp className="text-center mb-16">
          <h2 className={`text-4xl font-bold mb-4 ${spaceGrotesk.className}`} style={{ color: tokens.textHigh }}>Scalable Dimensions</h2>
        </FadeUp>
        <div className="grid md:grid-cols-3 gap-6">
          {tiers.map((tier, i) => (
            <FadeUp key={tier.name} delay={i * 0.1}>
              <div className={`p-8 border rounded-lg h-full flex flex-col relative ${tier.highlight ? 'bg-[#1E293B]' : 'bg-transparent'}`} style={{ borderColor: tier.highlight ? tokens.accent1 : tokens.border }}>
                {tier.highlight && <div className={`absolute top-0 right-0 p-3 text-xs font-bold ${jetbrains.className}`} style={{ backgroundColor: tokens.accent1, color: tokens.background }}>RECOMMENDED</div>}
                <h3 className={`text-xl font-bold mb-2 ${spaceGrotesk.className}`} style={{ color: tokens.textHigh }}>{tier.name}</h3>
                <div className={`text-4xl font-bold mb-1 ${spaceGrotesk.className}`} style={{ color: tokens.textHigh }}>
                  {tier.price} <span className="text-sm font-normal text-gray-400">{tier.unit}</span>
                </div>
                <p className={`text-sm mb-8 ${outfit.className}`} style={{ color: tokens.textMuted }}>{tier.desc}</p>
                <ul className="space-y-4 mb-8 flex-1">
                  {tier.features.map((f, j) => (
                    <li key={j} className={`flex items-center gap-3 text-sm ${outfit.className}`} style={{ color: tokens.textHigh }}>
                      <Check className="w-4 h-4" style={{ color: tokens.accent1 }} /> {f}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 rounded font-medium ${outfit.className} transition-colors`}
                  style={{
                    backgroundColor: tier.highlight ? tokens.accent1 : 'transparent',
                    color: tier.highlight ? tokens.background : tokens.textHigh,
                    border: `1px solid ${tier.highlight ? tokens.accent1 : tokens.border}`
                  }}>
                  {tier.price === 'Custom' ? 'Contact Sales' : 'Deploy'}
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
    { text: "It maps semantic space flawlessly. Querying embeddings has never been this fast.", author: "Dr. A. Turing", role: "AI Researcher" },
    { text: "The spatial visualization tools help us debug our RAG pipelines in real time.", author: "L. Lovelace", role: "Data Engineer" },
    { text: "Infinite scaling with zero configuration. It just works.", author: "M. Hamilton", role: "Lead Architect" }
  ]
  return (
    <section className="py-32 border-y relative z-10 bg-[#020617]" style={{ borderColor: tokens.border }}>
      <div className="max-w-6xl mx-auto px-6">
        <FadeUp className="text-center mb-16">
          <h2 className={`text-4xl font-bold ${spaceGrotesk.className}`} style={{ color: tokens.textHigh }}>Node Feedback</h2>
        </FadeUp>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <FadeUp key={i} delay={i * 0.2}>
              <div className="p-8 border rounded-lg" style={{ borderColor: tokens.border, backgroundColor: tokens.surface }}>
                <div className="mb-6 flex gap-1">
                  {[1,2,3,4,5].map(s => <Hexagon key={s} className="w-4 h-4" style={{ color: tokens.accent1, fill: tokens.accent1 }} />)}
                </div>
                <p className={`text-sm leading-relaxed mb-6 ${outfit.className}`} style={{ color: tokens.textHigh }}>"{t.text}"</p>
                <div>
                  <div className={`font-bold text-sm ${spaceGrotesk.className}`} style={{ color: tokens.accent2 }}>{t.author}</div>
                  <div className={`text-xs ${jetbrains.className}`} style={{ color: tokens.textMuted }}>{t.role}</div>
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
    { q: "What embedding models are supported?", a: "We support OpenAI, Cohere, HuggingFace, and custom models via our open API." },
    { q: "How do you handle dimensionality reduction?", a: "The 3D viewer uses an optimized t-SNE / UMAP approximation for real-time visualization of high-dimensional data." },
    { q: "Is it fully managed?", a: "Yes, VectorVault Serverless is fully managed. You just connect via SDK and send embeddings." }
  ]
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="py-32 relative z-10">
      <div className="max-w-3xl mx-auto px-6">
        <FadeUp className="mb-16 text-center">
          <h2 className={`text-4xl font-bold ${spaceGrotesk.className}`} style={{ color: tokens.textHigh }}>System Architecture FAQ</h2>
        </FadeUp>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <FadeUp key={i} delay={i * 0.1}>
              <div className="border rounded-lg overflow-hidden transition-colors" style={{ borderColor: open === i ? tokens.accent1 : tokens.border, backgroundColor: tokens.surface }}>
                <button
                  className="w-full flex items-center justify-between p-6 text-left"
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  <span className={`font-bold ${spaceGrotesk.className}`} style={{ color: tokens.textHigh }}>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 transition-transform ${open === i ? 'rotate-180' : ''}`} style={{ color: tokens.textMuted }} />
                </button>
                <AnimatePresence>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className={`p-6 pt-0 text-sm ${outfit.className}`} style={{ color: tokens.textMuted }}>
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
    <section className="py-32 relative z-10 border-t bg-[#020617]" style={{ borderColor: tokens.border }}>
      <div className="max-w-2xl mx-auto px-6 text-center">
        <FadeUp>
          <h2 className={`text-3xl font-bold mb-4 ${spaceGrotesk.className}`} style={{ color: tokens.textHigh }}>Initialize Ping</h2>
          <p className={`text-sm mb-8 ${outfit.className}`} style={{ color: tokens.textMuted }}>Subscribe to receive architectural updates and new features.</p>
          <div className="flex gap-4">
            <input
              type="email"
              placeholder="user@domain.com"
              className={`flex-1 px-4 py-3 rounded border bg-transparent text-sm ${jetbrains.className} focus:outline-none focus:border-[${tokens.accent1}]`}
              style={{ borderColor: tokens.border, color: tokens.textHigh }}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded font-bold ${outfit.className}`}
              style={{ backgroundColor: tokens.accent1, color: tokens.background }}
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
    <footer className="py-12 border-t relative z-10" style={{ borderColor: tokens.border, backgroundColor: tokens.background }}>
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className={`flex items-center gap-2 text-xl font-bold ${spaceGrotesk.className}`} style={{ color: tokens.textHigh }}>
          <Hexagon className="w-5 h-5" style={{ color: tokens.accent1 }} /> {PRODUCT_NAME}
        </div>
        <div className={`text-xs ${jetbrains.className}`} style={{ color: tokens.textMuted }}>
          &copy; 2026 VectorVault DB. Open Source.
        </div>
        <div className="flex gap-6">
          {['Docs', 'GitHub', 'Status'].map(l => (
            <a key={l} href="#" className={`text-sm hover:text-[${tokens.accent1}] transition-colors ${outfit.className}`} style={{ color: tokens.textMuted }}>{l}</a>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default function VectorVaultPage() {
  return (
    <div className={`min-h-screen selection:bg-[${tokens.accent1}] selection:text-[${tokens.background}]`} style={{ backgroundColor: tokens.background }}>
      <CoordinateHUD />
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
