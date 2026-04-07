'use client'

import { motion, useScroll, useTransform, useInView, useSpring, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Inter, Geist, JetBrains_Mono } from 'next/font/google'
import {
  Shield, Layers, Activity, Database, GitMerge, Cpu,
  Terminal, Workflow, History, Check, ArrowRight, ChevronDown
} from 'lucide-react'

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const tokens = {
  background: '#05070A',
  surface: '#0F1218',
  accent1: '#8B5CF6',
  accent2: '#10B981',
  metric: '#38BDF8',
  border: 'rgba(139, 92, 246, 0.2)',
  textHigh: '#F8FAFC',
  textLow: '#94A3B8'
}

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-5% 0px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

function TensorSlice({ children, delay = 0, className = "", style }: { children: React.ReactNode; delay?: number; className?: string; style?: React.CSSProperties }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-5% 0px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, z: 100, rotateX: 10 }}
      animate={isInView ? { opacity: 1, z: 0, rotateX: 0 } : {}}
      transition={{
        type: "spring", stiffness: 400, damping: 30,
        delay
      }}
      className={className}
      style={{ perspective: 1000, ...style }}
    >
      {children}
    </motion.div>
  )
}

function WeightsDraw({ children, delay = 0, className = "", style }: { children: React.ReactNode; delay?: number; className?: string; style?: React.CSSProperties }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-5% 0px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, pathLength: 0 }}
      animate={isInView ? { opacity: 1, pathLength: 1 } : {}}
      transition={{ duration: 1.5, delay, ease: [0.42, 0, 0.58, 1] }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  )
}

function ConvergencePulse({ active = true, children, className = "", style }: { active?: boolean; children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <motion.div
      animate={active ? { scale: [1, 1.02, 1] } : {}}
      transition={{ repeat: Infinity, duration: 1.5, ease: [0.42, 0, 0.58, 1] }}
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
          <Layers className="h-5 w-5" style={{ color: tokens.accent1 }} />
          <span className={`font-bold text-lg tracking-tight ${geist.className}`} style={{ color: tokens.textHigh }}>
            ModelMaster
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {['Registry', 'Training', 'Deployments', 'Audit'].map(link => (
            <a key={link} href={`#${link.toLowerCase()}`} className={`text-sm transition-colors hover:text-white ${inter.className}`} style={{ color: tokens.textLow }}>
              {link}
            </a>
          ))}
        </div>
        <motion.button
          whileHover={{ scale: 1.02, backgroundColor: tokens.accent1 }}
          whileTap={{ scale: 0.98 }}
          className={`px-5 h-9 rounded text-sm font-medium border ${inter.className}`}
          style={{ borderColor: tokens.accent1, color: tokens.textHigh, backgroundColor: 'transparent' }}
        >
          Console
        </motion.button>
      </div>
    </nav>
  )
}

function Hero() {
  const [epoch, setEpoch] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setEpoch(e => (e + 1) % 1000)
    }, 100)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="min-h-screen flex items-center pt-24 pb-16 overflow-hidden relative" style={{ backgroundColor: tokens.background }}>
      {/* Background weights shimmer */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
         <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke={tokens.accent1} strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
         </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.15 }}
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`flex items-center gap-2 mb-6 px-3 py-1.5 rounded border inline-flex ${jetbrainsMono.className}`}
            style={{ backgroundColor: tokens.surface, borderColor: tokens.border }}
          >
            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: tokens.accent2 }} />
            <span className="text-xs" style={{ color: tokens.accent2 }}>v2.4.0 Live</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-5xl md:text-7xl font-bold leading-tight mb-6 ${geist.className}`}
            style={{ color: tokens.textHigh }}
          >
            Aviation Control for AI.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-lg mb-8 max-w-xl leading-relaxed ${inter.className}`}
            style={{ color: tokens.textLow }}
          >
            Treat model weights as high-value intellectual property. Master the ML lifecycle with mathematical precision, audit trails, and the weight of history.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`h-12 px-8 rounded font-medium flex items-center justify-center gap-2 ${inter.className}`}
              style={{ backgroundColor: tokens.accent1, color: tokens.textHigh }}
            >
              Initialize Workspace
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`h-12 px-8 rounded font-medium border flex items-center justify-center gap-2 ${inter.className}`}
              style={{ borderColor: tokens.border, color: tokens.textHigh }}
            >
              View Documentation
            </motion.button>
          </motion.div>
        </motion.div>

        <TensorSlice delay={0.4} className="relative h-96 w-full rounded border overflow-hidden flex flex-col" style={{ backgroundColor: tokens.surface, borderColor: tokens.border }}>
          <div className="border-b p-3 flex justify-between items-center" style={{ borderColor: tokens.border }}>
            <span className={`text-xs uppercase tracking-wider ${jetbrainsMono.className}`} style={{ color: tokens.textLow }}>Training Progress</span>
            <span className={`text-xs ${jetbrainsMono.className}`} style={{ color: tokens.metric }}>Epoch: {epoch.toString().padStart(4, '0')}</span>
          </div>
          <div className="flex-1 p-6 relative flex items-center justify-center">
             <ConvergencePulse className="absolute inset-0 flex items-center justify-center">
               <div className="w-48 h-48 rounded-full border-2 border-dashed opacity-20" style={{ borderColor: tokens.accent1, animation: 'spin 10s linear infinite' }} />
               <div className="w-32 h-32 rounded-full border border-dashed opacity-40 absolute" style={{ borderColor: tokens.accent2, animation: 'spin 15s linear infinite reverse' }} />
               <div className="w-16 h-16 rounded-full border border-solid absolute flex items-center justify-center" style={{ borderColor: tokens.metric, backgroundColor: `${tokens.metric}10` }}>
                 <Cpu className="w-6 h-6" style={{ color: tokens.metric }} />
               </div>
             </ConvergencePulse>
          </div>
        </TensorSlice>
      </div>
    </section>
  )
}

const STATS = [
  { value: '10M+', label: 'Parameters Managed' },
  { value: '99.99%', label: 'Traceability' },
  { value: '<1ms', label: 'Inference Latency' },
  { value: '0', label: 'Compliance Breaches' },
]

function Stats() {
  return (
    <section className="py-12 border-y" style={{ borderColor: tokens.border, backgroundColor: tokens.surface }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat, i) => (
            <FadeUp key={stat.label} delay={i * 0.1}>
              <div className="text-center">
                <p className={`text-3xl md:text-4xl font-bold mb-2 ${geist.className}`} style={{ color: tokens.textHigh }}>{stat.value}</p>
                <p className={`text-xs uppercase tracking-wider ${jetbrainsMono.className}`} style={{ color: tokens.textLow }}>{stat.label}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}

const FEATURES = [
  { icon: Shield, title: 'Immutable Audit Trails', desc: 'Cryptographically signed model versions ensure complete lineage and compliance tracking.' },
  { icon: Layers, title: 'Tensor Slicing', desc: 'Inspect high-dimensional weight matrices with our interactive z-axis visualization tools.' },
  { icon: GitMerge, title: 'Branching & Merging', desc: 'Experiment freely with git-like workflows for model architectures and hyperparameters.' },
  { icon: Activity, title: 'Convergence Pulse', desc: 'Real-time telemetry on loss landscapes and gradient norms during training runs.' },
  { icon: Database, title: 'Dataset Binding', desc: 'Hard-link model checkpoints to the exact dataset snapshots used for training.' },
  { icon: Terminal, title: 'CLI Native', desc: 'Fully programmable interface designed for integration into existing CI/CD pipelines.' },
]

function Features() {
  return (
    <section className="py-24" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-7xl mx-auto px-6">
        <FadeUp>
          <div className="mb-16">
            <h2 className={`text-3xl md:text-5xl font-bold mb-4 ${geist.className}`} style={{ color: tokens.textHigh }}>
              Surgical Precision
            </h2>
            <p className={`text-lg max-w-2xl ${inter.className}`} style={{ color: tokens.textLow }}>
              Engineered for data scientists who demand absolute control over their ML assets.
            </p>
          </div>
        </FadeUp>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, i) => (
            <TensorSlice key={feature.title} delay={i * 0.1} className={`p-6 rounded border ${tokens.surface} hover:border-opacity-50 transition-colors`} style={{ borderColor: tokens.border, backgroundColor: tokens.surface }}>
              <feature.icon className="w-6 h-6 mb-4" style={{ color: tokens.accent1 }} />
              <h3 className={`text-lg font-bold mb-2 ${geist.className}`} style={{ color: tokens.textHigh }}>{feature.title}</h3>
              <p className={`text-sm leading-relaxed ${inter.className}`} style={{ color: tokens.textLow }}>{feature.desc}</p>
            </TensorSlice>
          ))}
        </div>
      </div>
    </section>
  )
}

function Architecture() {
  return (
    <section className="py-24 border-y overflow-hidden" style={{ borderColor: tokens.border, backgroundColor: tokens.surface }}>
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <FadeUp>
           <h2 className={`text-3xl md:text-5xl font-bold mb-6 ${geist.className}`} style={{ color: tokens.textHigh }}>
              Architecture Skeleton
            </h2>
            <p className={`text-lg mb-8 leading-relaxed ${inter.className}`} style={{ color: tokens.textLow }}>
              Interactive 3D wireframes of your model's layers. Rotate and explode CNN or Transformer blocks to reveal sub-modules and inspect weight distributions.
            </p>
            <ul className="space-y-4">
              {['Inspect activation maps', 'Visualize attention heads', 'Track vanishing gradients'].map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`flex items-center gap-3 text-sm ${jetbrainsMono.className}`}
                  style={{ color: tokens.textHigh }}
                >
                  <Check className="w-4 h-4" style={{ color: tokens.accent2 }} />
                  {item}
                </motion.li>
              ))}
            </ul>
        </FadeUp>

        <div className="relative h-80 perspective-1000">
           <motion.div
             animate={{ rotateY: 360 }}
             transition={{ duration: 20, repeat: Infinity, ease: [0, 0, 1, 1] }}
             className="w-full h-full transform-style-3d relative flex items-center justify-center"
           >
              {[0, 1, 2].map((layer) => (
                <motion.div
                  key={layer}
                  className="absolute w-48 h-48 border bg-opacity-10 backdrop-blur-sm"
                  style={{
                    borderColor: tokens.accent1,
                    backgroundColor: `${tokens.accent1}10`,
                    transform: `translateZ(${(layer - 1) * 60}px)`,
                  }}
                />
              ))}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                 <motion.path
                   d="M 150 160 L 250 160 M 150 160 L 200 100"
                   stroke={tokens.accent2}
                   strokeWidth="2"
                   fill="none"
                   initial={{ pathLength: 0 }}
                   whileInView={{ pathLength: 1 }}
                   transition={{ duration: 2, repeat: Infinity }}
                 />
              </svg>
           </motion.div>
        </div>
      </div>
    </section>
  )
}

function VersionComparison() {
  const [position, setPosition] = useState(50)

  return (
    <section className="py-24" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-7xl mx-auto px-6">
        <FadeUp>
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-5xl font-bold mb-4 ${geist.className}`} style={{ color: tokens.textHigh }}>Version Comparison</h2>
            <p className={`text-lg max-w-2xl mx-auto ${inter.className}`} style={{ color: tokens.textLow }}>
              Split-screen slider morphs confusion matrices and loss curves between model iterations.
            </p>
          </div>
        </FadeUp>

        <div className="relative h-96 w-full max-w-4xl mx-auto rounded border overflow-hidden cursor-ew-resize select-none" style={{ borderColor: tokens.border }}
             onMouseMove={(e) => {
               const rect = e.currentTarget.getBoundingClientRect();
               const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
               setPosition((x / rect.width) * 100);
             }}
        >
           {/* v1.0 underneath */}
           <div className="absolute inset-0 p-8 flex flex-col justify-end" style={{ backgroundColor: tokens.surface }}>
             <span className={`text-xl font-bold ${geist.className}`} style={{ color: tokens.textLow }}>v1.0.0</span>
             <div className="w-full h-32 border-b-2 border-l-2 mt-4 relative" style={{ borderColor: tokens.border }}>
                <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                  <path d="M 0 120 Q 50 100 100 80 T 200 60 T 300 50" stroke={tokens.textLow} strokeWidth="2" fill="none" />
                </svg>
             </div>
           </div>

           {/* v2.0 on top, clipped */}
           <div className="absolute inset-0 p-8 flex flex-col justify-end overflow-hidden border-r"
                style={{ backgroundColor: `${tokens.accent1}10`, borderColor: tokens.accent1, clipPath: `inset(0 ${100 - position}% 0 0)` }}>
             <span className={`text-xl font-bold ${geist.className}`} style={{ color: tokens.accent1 }}>v2.0.0</span>
             <div className="w-full h-32 border-b-2 border-l-2 mt-4 relative" style={{ borderColor: tokens.accent1 }}>
                <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                  <path d="M 0 120 Q 50 60 100 40 T 200 20 T 300 10" stroke={tokens.accent1} strokeWidth="2" fill="none" />
                </svg>
             </div>
           </div>

           {/* Slider handle */}
           <div className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize" style={{ left: `${position}%`, transform: 'translateX(-50%)' }}>
             <div className="absolute top-1/2 left-1/2 w-4 h-8 bg-white rounded flex items-center justify-center -translate-x-1/2 -translate-y-1/2">
                <div className="w-0.5 h-4 bg-black opacity-50" />
             </div>
           </div>
        </div>
      </div>
    </section>
  )
}

const PRICING = [
  { name: 'Research', price: '$0', desc: 'For independent researchers and students.', features: ['10 Models', 'Local execution', 'Basic telemetry'] },
  { name: 'Lab', price: '$299', desc: 'For focused ML teams.', features: ['Unlimited Models', 'Cloud sync', 'Advanced slicing', 'API Access'] },
  { name: 'Enterprise', price: 'Custom', desc: 'Aviation control for orgs.', features: ['SSO', 'Audit logs', 'VPC peering', 'Dedicated support'] }
]

function Pricing() {
  return (
    <section className="py-24 border-y" style={{ borderColor: tokens.border, backgroundColor: tokens.surface }}>
      <div className="max-w-7xl mx-auto px-6">
         <FadeUp>
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-5xl font-bold mb-4 ${geist.className}`} style={{ color: tokens.textHigh }}>Scalable Infrastructure</h2>
          </div>
        </FadeUp>

        <div className="grid md:grid-cols-3 gap-6">
          {PRICING.map((tier, i) => (
            <TensorSlice key={tier.name} delay={i * 0.1} className="p-8 rounded border flex flex-col" style={{ borderColor: tokens.border, backgroundColor: tokens.background }}>
              <h3 className={`text-xl font-bold mb-2 ${geist.className}`} style={{ color: tokens.textHigh }}>{tier.name}</h3>
              <div className="mb-4">
                <span className={`text-4xl font-bold ${jetbrainsMono.className}`} style={{ color: tokens.textHigh }}>{tier.price}</span>
                {tier.price !== 'Custom' && <span className={`text-sm ${inter.className}`} style={{ color: tokens.textLow }}>/mo</span>}
              </div>
              <p className={`text-sm mb-8 ${inter.className}`} style={{ color: tokens.textLow }}>{tier.desc}</p>

              <ul className="space-y-3 mb-8 flex-1">
                {tier.features.map(f => (
                  <li key={f} className={`flex items-center gap-2 text-sm ${jetbrainsMono.className}`} style={{ color: tokens.textHigh }}>
                    <Check className="w-4 h-4" style={{ color: tokens.accent2 }} />
                    {f}
                  </li>
                ))}
              </ul>

              <button className={`w-full py-3 rounded font-medium transition-colors ${inter.className}`} style={{ backgroundColor: i === 1 ? tokens.accent1 : 'transparent', border: `1px solid ${i === 1 ? tokens.accent1 : tokens.border}`, color: tokens.textHigh }}>
                {i === 2 ? 'Contact Sales' : 'Deploy Now'}
              </button>
            </TensorSlice>
          ))}
        </div>
      </div>
    </section>
  )
}

function CheckpointGallery() {
  return (
    <section className="py-24 overflow-hidden" style={{ backgroundColor: tokens.background }}>
       <div className="max-w-7xl mx-auto px-6 mb-12">
          <FadeUp>
             <h2 className={`text-3xl md:text-5xl font-bold mb-4 ${geist.className}`} style={{ color: tokens.textHigh }}>Checkpoint Gallery</h2>
             <p className={`text-lg ${inter.className}`} style={{ color: tokens.textLow }}>Horizontal film-strip of saved model states.</p>
          </FadeUp>
       </div>

       <div className="flex gap-4 px-6 overflow-x-auto pb-8 snap-x hide-scrollbar">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="min-w-[300px] p-6 rounded border snap-center flex-shrink-0"
              style={{ borderColor: tokens.border, backgroundColor: tokens.surface }}
            >
               <div className="flex justify-between items-center mb-4 pb-4 border-b" style={{ borderColor: tokens.border }}>
                  <span className={`text-sm font-bold ${jetbrainsMono.className}`} style={{ color: tokens.textHigh }}>ckpt_{i * 1000}.pt</span>
                  <History className="w-4 h-4" style={{ color: tokens.accent1 }} />
               </div>
               <div className={`space-y-2 text-xs ${jetbrainsMono.className}`} style={{ color: tokens.textLow }}>
                 <div className="flex justify-between"><span>Loss:</span> <span style={{ color: tokens.metric }}>{(1.5 / i).toFixed(4)}</span></div>
                 <div className="flex justify-between"><span>Acc:</span> <span style={{ color: tokens.accent2 }}>{(0.8 + (i*0.02)).toFixed(4)}</span></div>
                 <div className="flex justify-between"><span>Size:</span> <span>4.2GB</span></div>
               </div>
            </motion.div>
          ))}
       </div>
    </section>
  )
}

const FAQ_ITEMS = [
  { q: "How are weights stored?", a: "We use a content-addressable storage system optimized for large tensors, heavily inspired by git but built for machine learning." },
  { q: "Can I host it on-premise?", a: "Yes, Enterprise customers can deploy ModelMaster fully on-premise within their own VPC." },
  { q: "Which frameworks are supported?", a: "PyTorch, TensorFlow, JAX, and ONNX are supported out of the box." },
  { q: "Is there a performance overhead?", a: "The tracking overhead is negligible (<1ms per step) and happens entirely asynchronously." }
]

function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="py-24 border-y" style={{ borderColor: tokens.border, backgroundColor: tokens.surface }}>
      <div className="max-w-3xl mx-auto px-6">
        <FadeUp>
          <h2 className={`text-3xl md:text-5xl font-bold mb-12 text-center ${geist.className}`} style={{ color: tokens.textHigh }}>Frequently Asked</h2>
        </FadeUp>

        <div className="space-y-4">
          {FAQ_ITEMS.map((item, i) => (
            <div key={i} className="border rounded overflow-hidden transition-colors" style={{ borderColor: open === i ? tokens.accent1 : tokens.border }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className={`w-full p-6 text-left flex justify-between items-center ${inter.className}`}
                style={{ color: tokens.textHigh }}
              >
                <span className="font-medium">{item.q}</span>
                <ChevronDown className={`w-5 h-5 transition-transform ${open === i ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className={`p-6 pt-0 text-sm leading-relaxed ${inter.className}`} style={{ color: tokens.textLow }}>
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
      <div className="max-w-xl mx-auto px-6 text-center">
        <FadeUp>
          <Terminal className="w-8 h-8 mx-auto mb-6" style={{ color: tokens.accent1 }} />
          <h2 className={`text-2xl font-bold mb-4 ${geist.className}`} style={{ color: tokens.textHigh }}>Join the Early Access List</h2>
          <p className={`text-sm mb-8 ${inter.className}`} style={{ color: tokens.textLow }}>Get technical deep-dives on MLOps and product updates.</p>

          <div className="flex gap-2">
            <input
              type="email"
              placeholder="root@localhost"
              className={`flex-1 bg-transparent border rounded px-4 py-2 text-sm focus:outline-none focus:border-purple-500 ${jetbrainsMono.className}`}
              style={{ borderColor: tokens.border, color: tokens.textHigh }}
            />
            <button className={`px-6 rounded font-medium text-sm ${inter.className}`} style={{ backgroundColor: tokens.accent1, color: tokens.textHigh }}>
              Subscribe
            </button>
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
           <Layers className="w-5 h-5" style={{ color: tokens.accent1 }} />
           <span className={`font-bold ${geist.className}`} style={{ color: tokens.textHigh }}>ModelMaster</span>
        </div>

        <div className={`flex gap-6 text-sm ${jetbrainsMono.className}`} style={{ color: tokens.textLow }}>
          <a href="#" className="hover:text-white transition-colors">Docs</a>
          <a href="#" className="hover:text-white transition-colors">GitHub</a>
          <a href="#" className="hover:text-white transition-colors">Status</a>
        </div>
      </div>
    </footer>
  )
}

export default function ModelMasterPage() {
  return (
    <div className={`min-h-screen ${inter.variable} ${geist.variable} ${jetbrainsMono.variable} selection:bg-purple-500/30`} style={{ backgroundColor: tokens.background }}>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Features />
        <Architecture />
        <VersionComparison />
        <Pricing />
        <CheckpointGallery />
        <FAQ />
        <Newsletter />
      </main>
      <Footer />
    </div>
  )
}
