'use client'

import { motion, useReducedMotion, useInView, Variants } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { JetBrains_Mono, Inter } from 'next/font/google'
import { Michroma } from 'next/font/google'
import {
  Code2, Terminal, Cpu, GitBranch, AlertCircle, Activity,
  Play, Search, ChevronRight
} from 'lucide-react'

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

const michroma = Michroma({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-michroma',
  display: 'swap',
})

const tokens = {
  background: '#010409', // Deep Code
  surface: '#0D1117', // Panel Dark
  accent1: '#58A6FF', // Link Blue
  accent2: '#D29922', // Warning Gold
  border: '#30363D',
  error: '#F85149',
  textHigh: '#E6EDF3',
  textLow: '#8B949E',
}

function FadeUp({ children, delay = 0, className = "", style }: { children: React.ReactNode; delay?: number; className?: string; style?: React.CSSProperties }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-5% 0px' })
  const shouldReduce = useReducedMotion()

  return (
    <motion.div ref={ref} className={className} style={style} initial={shouldReduce ? false : { opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

function MatrixRain() {
  const [columns, setColumns] = useState<number>(0)

  useEffect(() => {
    setColumns(Math.floor(window.innerWidth / 20))
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.03] z-0 flex justify-between">
       {Array.from({ length: columns }).map((_, i) => (
         <motion.div
           key={i}
           className={`text-xs ${jetbrainsMono.className} text-white flex flex-col`}
           initial={{ y: -1000 }}
           animate={{ y: ['-100%', '100%'] }}
           transition={{ duration: (i % 5) + 5, repeat: Infinity, ease: 'linear', delay: -(i % 10) }}
         >
           {Array.from({ length: 40 }).map((_, j) => (
             <span key={j}>{j % 2 === 0 ? '1' : '0'}</span>
           ))}
         </motion.div>
       ))}
    </div>
  )
}

function CodeSnippet({ code, language, delay }: { code: string, language: string, delay: number }) {
  return (
    <motion.div
       initial={{ opacity: 0, x: 20 }}
       animate={{ opacity: 1, x: 0 }}
       transition={{ delay, duration: 0.5 }}
       className="rounded-md border overflow-hidden mb-4 relative group"
       style={{ borderColor: tokens.border, backgroundColor: tokens.surface }}
    >
       <div className="flex items-center px-4 py-2 border-b text-xs" style={{ borderColor: tokens.border, color: tokens.textLow }}>
         <span className={inter.className}>{language}</span>
       </div>
       <pre className={`p-4 text-xs overflow-x-auto ${jetbrainsMono.className}`} style={{ color: tokens.textHigh }}>
         <code>{code}</code>
       </pre>
       <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" style={{ boxShadow: `inset 0 0 20px ${tokens.accent1}20` }} />
    </motion.div>
  )
}

function Hero() {
  return (
    <section className="min-h-screen flex items-center pt-24 relative overflow-hidden" style={{ backgroundColor: tokens.background }}>
      <MatrixRain />

      <div className="max-w-7xl mx-auto px-6 py-12 w-full relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-sm border mb-6 text-xs uppercase ${inter.className}`}
            style={{ borderColor: tokens.accent1, color: tokens.accent1, backgroundColor: 'rgba(88, 166, 255, 0.1)' }}
          >
            v4.0 Released
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-4xl md:text-6xl font-bold leading-tight mb-6 uppercase tracking-wider ${michroma.className}`}
            style={{ color: tokens.textHigh }}
          >
            See the Matrix.<br/>Ship the Code.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-base md:text-lg mb-10 max-w-lg leading-relaxed ${inter.className}`}
            style={{ color: tokens.textLow }}
          >
            Immersive, high-density dev tools. Code flows across your screen with unmatched performance and zero latency.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row gap-4"
          >
             <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`h-12 px-8 rounded-sm font-semibold flex items-center justify-center gap-2 text-sm ${inter.className}`}
              style={{ backgroundColor: tokens.accent1, color: tokens.background }}
            >
              <Terminal className="w-4 h-4" /> Download CLI
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Diff-Morph Canvas Mockup */}
        <div className="relative h-[500px] w-full flex flex-col justify-center">

           <CodeSnippet
              delay={0.5}
              language="src/engine.rs"
              code={`pub fn execute(process: &mut Process) -> Result<(), Error> {
    while process.status == Status::Running {
        let op = process.fetch_next()?;
        process.execute(op)?;
    }
    Ok(())
}`}
           />

           {/* Live Debugger Line */}
           <motion.div
             className="absolute w-full h-[2px] z-20 pointer-events-none"
             style={{ backgroundColor: tokens.accent1, top: '220px', boxShadow: `0 0 10px ${tokens.accent1}` }}
             animate={{ y: [0, 40, 0, 80, 0] }}
             transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
           />

           <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 1 }}
             className="absolute -right-4 top-1/2 p-3 rounded border text-xs flex flex-col gap-2 backdrop-blur-md z-30"
             style={{ borderColor: tokens.border, backgroundColor: 'rgba(13, 17, 23, 0.9)', color: tokens.textHigh }}
           >
              <div className="flex items-center gap-2" style={{ color: tokens.accent1 }}>
                 <Activity className="w-3 h-3" /> Heap: 14MB
              </div>
              <div className="flex items-center gap-2" style={{ color: tokens.accent2 }}>
                 <AlertCircle className="w-3 h-3" /> GC Pause: 2ms
              </div>
           </motion.div>

        </div>
      </div>
    </section>
  )
}

export default function CodeFlowPage() {
  return (
    <div className={`${inter.variable} ${jetbrainsMono.variable} ${michroma.variable} font-sans selection:bg-blue-500/30`} style={{ backgroundColor: tokens.background, color: tokens.textHigh }}>
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b" style={{ borderColor: tokens.border, backgroundColor: 'rgba(1, 4, 9, 0.8)' }}>
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <Code2 className="h-5 w-5" style={{ color: tokens.accent1 }} />
             <span className={`font-bold text-sm tracking-widest ${michroma.className}`} style={{ color: tokens.textHigh }}>
               CODEFLOW
             </span>
          </div>
        </div>
      </nav>
      <main>
        <Hero />
      </main>
      
      </div>
  )
}
