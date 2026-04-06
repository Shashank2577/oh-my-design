'use client'

import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Inter, Outfit, Space_Grotesk } from 'next/font/google'
import {
  Network, Search, Compass, Share2, Layers, Map,
  Zap, ArrowRight, ChevronDown, Check, Fingerprint
} from 'lucide-react'

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const tokens = {
  background: '#020617', // Deepest Blue
  surface: 'rgba(30, 41, 59, 0.5)', // Slate Glass
  accent1: '#38BDF8', // Sky Point
  accent2: '#818CF8', // Indigo Path
  border: 'rgba(56, 189, 248, 0.2)',
  glow: 'rgba(56, 189, 248, 0.4)',
  textHigh: '#F1F5F9',
  textLow: '#94A3B8'
}

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-5% 0px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function PointCloud({ children, delay = 0, className = "", style }: { children: React.ReactNode; delay?: number; className?: string; style?: React.CSSProperties }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9, rotateZ: -5 }}
      animate={isInView ? { opacity: 1, scale: 1, rotateZ: 0 } : {}}
      transition={{ type: "spring", stiffness: 100, damping: 20, delay }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  )
}

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-md" style={{ borderColor: tokens.border, backgroundColor: `${tokens.background}CC` }}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Network className="h-6 w-6" style={{ color: tokens.accent1 }} />
          <span className={`font-bold text-xl tracking-tight ${spaceGrotesk.className}`} style={{ color: tokens.textHigh }}>
            SemanticSync
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {['Embeddings', 'Search', 'Graph', 'Docs'].map(link => (
            <a key={link} href={`#${link.toLowerCase()}`} className={`text-sm transition-colors hover:text-white ${inter.className}`} style={{ color: tokens.textLow }}>
              {link}
            </a>
          ))}
        </div>
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: `0 0 20px ${tokens.glow}` }}
          whileTap={{ scale: 0.95 }}
          className={`px-6 h-10 rounded-full text-sm font-medium ${outfit.className}`}
          style={{ backgroundColor: tokens.accent1, color: tokens.background }}
        >
          Explore Latent Space
        </motion.button>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section className="min-h-screen flex items-center pt-24 pb-16 overflow-hidden relative" style={{ backgroundColor: tokens.background }}>
      {/* Abstract Vector Field Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
         <motion.div
           animate={{ rotate: 360 }}
           transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
           className="w-[150vw] h-[150vw] max-w-[1500px] max-h-[1500px] absolute opacity-20"
           style={{
             background: `radial-gradient(circle at center, ${tokens.accent2} 0%, transparent 60%)`,
             filter: 'blur(100px)'
           }}
         />
         <div className="absolute inset-0" style={{ backgroundImage: `radial-gradient(${tokens.accent1} 1px, transparent 1px)`, backgroundSize: '40px 40px', opacity: 0.1 }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-16 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.2 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex items-center gap-2 mb-8 px-4 py-2 rounded-full border inline-flex ${outfit.className}`}
            style={{ backgroundColor: tokens.surface, borderColor: tokens.border, backdropFilter: 'blur(10px)' }}
          >
            <Compass className="h-4 w-4" style={{ color: tokens.accent1 }} />
            <span className="text-sm" style={{ color: tokens.accent1 }}>New Embedding Model v4.0</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-6xl md:text-7xl font-bold leading-tight mb-6 ${spaceGrotesk.className}`}
            style={{ color: tokens.textHigh }}
          >
            Navigate <br />
            <span style={{ color: tokens.accent2 }}>Latent Space.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-lg mb-10 max-w-xl leading-relaxed ${inter.className}`}
            style={{ color: tokens.textLow }}
          >
            Visualize the high-dimensional world of vector embeddings. Make abstract concepts of semantic similarity visible, searchable, and fundamentally understandable in 3D space.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: `0 0 25px ${tokens.glow}` }}
              whileTap={{ scale: 0.95 }}
              className={`h-14 px-8 rounded-full font-medium flex items-center justify-center gap-2 text-lg ${outfit.className}`}
              style={{ backgroundColor: tokens.accent1, color: tokens.background }}
            >
              Start Syncing <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </motion.div>

        {/* 3D Point Cloud Representation */}
        <div className="relative h-[500px] flex items-center justify-center">
           <motion.div
             animate={{ rotateY: 360, rotateX: 360 }}
             transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
             className="relative w-64 h-64 transform-style-3d"
           >
              {Array.from({ length: 40 }).map((_, i) => {
                 const rx = Math.random() * 360;
                 const ry = Math.random() * 360;
                 const tz = Math.random() * 150 + 50;
                 return (
                   <div
                     key={i}
                     className="absolute w-2 h-2 rounded-full"
                     style={{
                       backgroundColor: i % 3 === 0 ? tokens.accent2 : tokens.accent1,
                       boxShadow: `0 0 10px ${i % 3 === 0 ? tokens.accent2 : tokens.accent1}`,
                       transform: `rotateX(${rx}deg) rotateY(${ry}deg) translateZ(${tz}px)`,
                     }}
                   />
                 )
              })}
              {/* Connecting Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ transform: 'scale(2)' }}>
                 <motion.path
                   d="M 128 128 L 50 50 M 128 128 L 200 80 M 128 128 L 100 200"
                   stroke={tokens.accent2}
                   strokeWidth="1"
                   strokeOpacity="0.5"
                   fill="none"
                   initial={{ pathLength: 0 }}
                   animate={{ pathLength: 1 }}
                   transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                 />
              </svg>
           </motion.div>
        </div>
      </div>
    </section>
  )
}

function StatGrid() {
  return (
    <section className="py-12 border-y" style={{ borderColor: tokens.border, backgroundColor: tokens.surface, backdropFilter: 'blur(10px)' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
             { label: 'Vectors Indexed', val: '500M+' },
             { label: 'Query Latency', val: '<15ms' },
             { label: 'Dimensions', val: '1536' },
             { label: 'Accuracy Recall', val: '99.2%' }
          ].map((stat, i) => (
            <FadeUp key={stat.label} delay={i * 0.1} className="text-center">
              <p className={`text-4xl font-bold mb-2 ${spaceGrotesk.className}`} style={{ color: tokens.textHigh }}>{stat.val}</p>
              <p className={`text-sm tracking-wide ${outfit.className}`} style={{ color: tokens.accent1 }}>{stat.label}</p>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}

const FEATURES = [
  { icon: Search, title: 'Semantic Similarity Search', desc: 'Find meaning, not just keywords. Retrieve contextually relevant data across billions of vectors.' },
  { icon: Network, title: 'Vector Relationship Web', desc: 'A 3D spider-web that connects similar data points on hover to show clustering.' },
  { icon: Compass, title: 'Dimension Projection Map', desc: 'A 2D minimap that helps orient you within the vast 3D latent space.' },
  { icon: Map, title: 'Latent-Space Navigator', desc: 'Draggable grids where moving the cursor morphs a central concept between semantic states.' },
  { icon: Fingerprint, title: 'Point-to-Point Laser', desc: 'Clicking two points draws a straight, glowing laser measuring their exact semantic distance.' },
  { icon: Layers, title: 'The Dimension Warp', desc: 'Data points collapse and explode when switching between different embedding models.' }
]

function Features() {
  return (
    <section className="py-24" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-7xl mx-auto px-6">
        <FadeUp>
          <div className="mb-16 text-center">
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${spaceGrotesk.className}`} style={{ color: tokens.textHigh }}>
              Spatial <span style={{ color: tokens.accent2 }}>Intelligence</span>
            </h2>
            <p className={`text-lg max-w-2xl mx-auto ${inter.className}`} style={{ color: tokens.textLow }}>
              Explore the geometric properties of language and images.
            </p>
          </div>
        </FadeUp>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, i) => (
            <PointCloud key={feature.title} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -5, boxShadow: `0 10px 30px ${tokens.glow}`, borderColor: tokens.accent1 }}
                className="p-8 rounded-2xl border bg-opacity-50 backdrop-blur-md h-full transition-colors"
                style={{ borderColor: tokens.border, backgroundColor: tokens.surface }}
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: `${tokens.accent1}20` }}>
                  <feature.icon className="w-6 h-6" style={{ color: tokens.accent1 }} />
                </div>
                <h3 className={`text-xl font-bold mb-3 ${outfit.className}`} style={{ color: tokens.textHigh }}>{feature.title}</h3>
                <p className={`text-sm leading-relaxed ${inter.className}`} style={{ color: tokens.textLow }}>{feature.desc}</p>
              </motion.div>
            </PointCloud>
          ))}
        </div>
      </div>
    </section>
  )
}

function VectorVisualizer() {
  return (
    <section className="py-24 border-y overflow-hidden relative" style={{ borderColor: tokens.border, backgroundColor: tokens.surface }}>
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <FadeUp>
           <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${spaceGrotesk.className}`} style={{ color: tokens.textHigh }}>
              Similarity <span style={{ color: tokens.accent1 }}>Pulse</span>
            </h2>
            <p className={`text-lg mb-8 leading-relaxed ${inter.className}`} style={{ color: tokens.textLow }}>
              When a vector is selected, an energetic, radiating ripple highlights semantically identical points, pulling them into focus.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`h-12 px-8 rounded-full font-medium border flex items-center justify-center gap-2 ${outfit.className}`}
              style={{ borderColor: tokens.accent1, color: tokens.accent1 }}
            >
              Try Interactive Demo
            </motion.button>
        </FadeUp>

        <div className="relative h-96 rounded-2xl border p-6 flex items-center justify-center overflow-hidden" style={{ borderColor: tokens.border, backgroundColor: tokens.background }}>
           {/* Center Point */}
           <div className="absolute w-4 h-4 rounded-full z-10" style={{ backgroundColor: tokens.textHigh, boxShadow: `0 0 20px ${tokens.textHigh}` }} />

           {/* Radiating Ripples */}
           {[1, 2, 3].map((circle) => (
             <motion.div
               key={circle}
               initial={{ scale: 0, opacity: 0.8 }}
               animate={{ scale: 4, opacity: 0 }}
               transition={{ duration: 3, repeat: Infinity, delay: circle * 1 }}
               className="absolute w-32 h-32 rounded-full border-2"
               style={{ borderColor: tokens.accent1 }}
             />
           ))}

           {/* Semantic Matches pulling in */}
           {[0, 72, 144, 216, 288].map((angle, i) => (
             <motion.div
               key={angle}
               initial={{ x: Math.cos(angle * Math.PI / 180) * 150, y: Math.sin(angle * Math.PI / 180) * 150, opacity: 0 }}
               animate={{ x: Math.cos(angle * Math.PI / 180) * 80, y: Math.sin(angle * Math.PI / 180) * 80, opacity: 1 }}
               transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", delay: 1 }}
               className="absolute w-3 h-3 rounded-full"
               style={{ backgroundColor: tokens.accent2, boxShadow: `0 0 10px ${tokens.accent2}` }}
             />
           ))}
        </div>
      </div>
    </section>
  )
}

const PRICING = [
  { name: 'Starter', price: 'Free', desc: 'Great for prototyping.', features: ['1M Vectors', 'Shared compute', 'Community support'] },
  { name: 'Growth', price: '$79', desc: 'For production apps.', features: ['20M Vectors', 'Dedicated instances', '99.9% Uptime SLA', 'Priority support'] },
  { name: 'Scale', price: 'Custom', desc: 'Billion-scale needs.', features: ['Unlimited Vectors', 'Multi-region deployment', 'Custom models', '24/7 Phone support'] }
]

function Pricing() {
  return (
    <section className="py-24" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-7xl mx-auto px-6">
         <FadeUp>
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${spaceGrotesk.className}`} style={{ color: tokens.textHigh }}>Scalable Storage</h2>
            <p className={`text-lg ${inter.className}`} style={{ color: tokens.textLow }}>Serverless vector databases that scale with your embeddings.</p>
          </div>
        </FadeUp>

        <div className="grid md:grid-cols-3 gap-8">
          {PRICING.map((tier, i) => (
            <PointCloud key={tier.name} delay={i * 0.1} className="p-8 rounded-2xl border relative flex flex-col backdrop-blur-md" style={{ borderColor: i === 1 ? tokens.accent1 : tokens.border, backgroundColor: tokens.surface }}>
              {i === 1 && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: tokens.accent1, color: tokens.background }}>
                  RECOMMENDED
                </div>
              )}
              <h3 className={`text-2xl font-bold mb-2 ${outfit.className}`} style={{ color: tokens.textHigh }}>{tier.name}</h3>
              <p className={`text-sm mb-6 ${inter.className}`} style={{ color: tokens.textLow }}>{tier.desc}</p>
              <div className="mb-8">
                <span className={`text-5xl font-bold ${spaceGrotesk.className}`} style={{ color: tokens.textHigh }}>{tier.price}</span>
                {i !== 2 && <span className={`text-sm ${inter.className}`} style={{ color: tokens.textLow }}>/mo</span>}
              </div>

              <ul className="space-y-4 mb-8 flex-1">
                {tier.features.map(f => (
                  <li key={f} className={`flex items-center gap-3 text-sm ${outfit.className}`} style={{ color: tokens.textHigh }}>
                    <Check className="w-5 h-5" style={{ color: tokens.accent2 }} />
                    {f}
                  </li>
                ))}
              </ul>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full py-4 rounded-full font-bold transition-colors ${outfit.className}`}
                style={{
                  backgroundColor: i === 1 ? tokens.accent1 : 'transparent',
                  border: `1px solid ${i === 1 ? tokens.accent1 : tokens.border}`,
                  color: i === 1 ? tokens.background : tokens.textHigh
                }}
              >
                {i === 2 ? 'Contact Sales' : 'Get Started'}
              </motion.button>
            </PointCloud>
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="py-24 border-y" style={{ borderColor: tokens.border, backgroundColor: tokens.surface }}>
      <div className="max-w-3xl mx-auto px-6">
        <FadeUp>
          <h2 className={`text-4xl md:text-5xl font-bold mb-12 text-center ${spaceGrotesk.className}`} style={{ color: tokens.textHigh }}>Knowledge Graph</h2>
        </FadeUp>

        <div className="space-y-4">
          {[
            { q: "What embedding models do you support?", a: "We support OpenAI, Cohere, HuggingFace, and custom models you bring yourself." },
            { q: "How fast is the similarity search?", a: "P99 latency is under 15ms for databases up to 100M vectors using our proprietary HNSW implementation." },
            { q: "Can I filter by metadata?", a: "Yes, pre-filtering and post-filtering are fully supported with our SQL-like metadata querying." }
          ].map((item, i) => (
            <div key={i} className="border rounded-xl backdrop-blur-sm" style={{ borderColor: open === i ? tokens.accent1 : tokens.border, backgroundColor: tokens.background }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className={`w-full p-6 text-left flex justify-between items-center ${outfit.className}`}
                style={{ color: tokens.textHigh }}
              >
                <span className="font-bold text-lg">{item.q}</span>
                <ChevronDown className={`w-5 h-5 transition-transform ${open === i ? 'rotate-180' : ''}`} style={{ color: tokens.accent1 }} />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className={`p-6 pt-0 leading-relaxed ${inter.className}`} style={{ color: tokens.textLow }}>
                      {item.a}
                    </p>
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

function Newsletter() {
  return (
    <section className="py-24" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-2xl mx-auto px-6 text-center">
        <FadeUp>
          <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: `${tokens.accent1}20` }}>
             <Share2 className="w-8 h-8" style={{ color: tokens.accent1 }} />
          </div>
          <h2 className={`text-4xl font-bold mb-4 ${spaceGrotesk.className}`} style={{ color: tokens.textHigh }}>Sync Your Inbox</h2>
          <p className={`text-lg mb-8 ${inter.className}`} style={{ color: tokens.textLow }}>Get updates on vector DB performance, new embedding models, and search algorithms.</p>

          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="name@company.com"
              className={`flex-1 bg-transparent px-6 py-4 rounded-full border text-sm focus:outline-none ${outfit.className}`}
              style={{ color: tokens.textHigh, borderColor: tokens.border, backgroundColor: tokens.surface }}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-8 py-4 rounded-full font-bold ${outfit.className}`}
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
    <footer className="py-12 border-t" style={{ borderColor: tokens.border, backgroundColor: tokens.surface }}>
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
           <Network className="w-6 h-6" style={{ color: tokens.accent1 }} />
           <span className={`font-bold ${spaceGrotesk.className}`} style={{ color: tokens.textHigh }}>SemanticSync</span>
        </div>

        <div className={`flex gap-8 text-sm ${outfit.className}`} style={{ color: tokens.textLow }}>
          <a href="#" className="hover:text-white transition-colors">API Reference</a>
          <a href="#" className="hover:text-white transition-colors">Python SDK</a>
          <a href="#" className="hover:text-white transition-colors">Discord</a>
        </div>
      </div>
    </footer>
  )
}

export default function SemanticSyncPage() {
  return (
    <div className={`min-h-screen ${inter.variable} ${outfit.variable} ${spaceGrotesk.variable} selection:bg-sky-500/30`} style={{ backgroundColor: tokens.background }}>
      <Navbar />
      <main>
        <Hero />
        <StatGrid />
        <Features />
        <VectorVisualizer />
        <Pricing />
        <FAQ />
        <Newsletter />
      </main>
      <Footer />
    </div>
  )
}
