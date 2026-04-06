import { Variants } from 'framer-motion'
'use client'

import { motion, useReducedMotion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import { Fraunces, JetBrains_Mono } from 'next/font/google'
import { Inter } from 'next/font/google' // using Inter as fallback for Satoshi
import {
  Sparkles, History, AlignLeft, Settings2, Play, MousePointer2
} from 'lucide-react'

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  axes: ['opsz', 'SOFT', 'WONK'],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

const satoshiFallback = Inter({
  subsets: ['latin'],
  variable: '--font-satoshi',
  display: 'swap',
})

const tokens = {
  background: '#FFFFFF', // Pure Paper
  surface: '#F3F4F6', // Stone
  accent1: '#000000', // Obsidian Ink
  accent2: '#E2E8F0', // Shadow Gray
  border: '#D1D5DB',
  textHigh: '#111827',
}

function FadeUp({ children, delay = 0, className = "", style }: { children: React.ReactNode; delay?: number; className?: string; style?: React.CSSProperties }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-5% 0px' })
  const shouldReduce = useReducedMotion()

  return (
    <motion.div ref={ref} className={className} style={style} initial={shouldReduce ? false : { opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, type: 'spring', stiffness: 150, damping: 20 }}
    >
      {children}
    </motion.div>
  )
}

function Hero() {
  const { scrollY } = useScroll()
  const weight = useTransform(scrollY, [0, 500], [400, 900])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  return (
    <section className="min-h-screen flex flex-col justify-center pt-24 relative px-6 md:px-12" style={{ backgroundColor: tokens.background }}>

      <div className="max-w-7xl mx-auto w-full relative z-10 grid md:grid-cols-12 gap-12 items-center">

        <div className="md:col-span-7">
           <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className={`uppercase tracking-widest text-xs font-bold mb-6 ${satoshiFallback.className}`}
              style={{ color: tokens.textHigh }}
           >
              Engineering the Prompt
           </motion.p>

           <motion.h1
             style={{ fontWeight: weight, color: tokens.textHigh }}
             className={`text-6xl md:text-8xl leading-[1.1] mb-8 ${fraunces.className}`}
           >
             The Weight<br/>of Words.
           </motion.h1>

           <motion.p
              style={{ opacity }}
              className={`text-xl md:text-2xl max-w-lg leading-relaxed ${satoshiFallback.className}`}
           >
             Treat words as physical objects. Experiment with gravity, stack history, and mold AI responses with monumental precision.
           </motion.p>
        </div>

        <div className="md:col-span-5 relative h-[500px] flex items-center justify-center">
           {/* Prompt Versioning Stack Mockup */}
           {[1, 2, 3].map((item, i) => (
             <motion.div
               key={i}
               className="absolute w-full max-w-sm p-8 rounded-xl shadow-2xl bg-white border"
               style={{
                 borderColor: tokens.border,
                 zIndex: 10 - i,
               }}
               initial={{ y: 200, opacity: 0, rotateX: 20, scale: 0.8 }}
               animate={{ y: i * -20, opacity: 1 - (i * 0.2), rotateX: 0, scale: 1 - (i * 0.05) }}
               transition={{ delay: 0.5 + (i * 0.1), type: 'spring', stiffness: 200, damping: 25 }}
               whileHover={i === 0 ? { y: -30, scale: 1.02 } : {}}
             >
                <div className="flex justify-between items-center mb-4">
                  <span className={`text-xs uppercase font-bold ${satoshiFallback.className}`}>v1.0.{3 - i}</span>
                  <span className={`text-xs text-gray-400 ${jetbrainsMono.className}`}>Tokens: 142</span>
                </div>
                <p className={`text-lg leading-relaxed ${fraunces.className}`} style={{ color: tokens.textHigh }}>
                  "Generate a highly detailed architectural visualization of a Brutalist museum..."
                </p>
                {i === 0 && (
                  <div className="mt-6 flex justify-end">
                    <button className={`w-10 h-10 rounded-full flex items-center justify-center bg-black text-white`}>
                       <Play className="w-4 h-4 fill-current" />
                    </button>
                  </div>
                )}
             </motion.div>
           ))}
        </div>

      </div>
    </section>
  )
}

function TokenWeightSection() {
  const [sliderVal, setSliderVal] = useState(50)

  // Transform slider value to visual weight (font weight)
  const previewWeight = 100 + (sliderVal * 8) // maps 0-100 to 100-900

  return (
    <section className="py-32" style={{ backgroundColor: tokens.surface }}>
       <div className="max-w-5xl mx-auto px-6 text-center">
          <FadeUp>
             <h2 className={`text-5xl font-bold mb-16 ${fraunces.className}`}>Tactile Control</h2>
          </FadeUp>

          <FadeUp delay={0.2} className="bg-white p-12 rounded-2xl shadow-xl border" style={{ borderColor: tokens.border }}>
             <p
                className={`text-4xl md:text-6xl transition-all duration-300 mb-16 ${fraunces.className}`}
                style={{ fontWeight: previewWeight }}
             >
                emphasize
             </p>

             <div className="max-w-md mx-auto">
               <div className="flex justify-between text-xs font-bold uppercase mb-4" style={{ color: tokens.textHigh }}>
                 <span>Subtle</span>
                 <span className={jetbrainsMono.className}>{(sliderVal / 100).toFixed(2)} w</span>
                 <span>Monumental</span>
               </div>
               {/* Heavy-duty slider mockup */}
               <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden cursor-pointer">
                 <div className="absolute top-0 left-0 h-full bg-black" style={{ width: `${sliderVal}%` }} />
                 <input
                   type="range"
                   min="0" max="100"
                   value={sliderVal}
                   onChange={(e) => setSliderVal(parseInt(e.target.value))}
                   className="absolute inset-0 w-full opacity-0 cursor-pointer"
                 />
               </div>
             </div>
          </FadeUp>
       </div>
    </section>
  )
}

export default function PromptPalacePage() {
  return (
    <div className={`${fraunces.variable} ${jetbrainsMono.variable} ${satoshiFallback.variable} font-sans selection:bg-black selection:text-white`} style={{ backgroundColor: tokens.background, color: tokens.textHigh }}>
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 mix-blend-difference text-white">
         <span className={`font-bold text-xl uppercase tracking-widest ${satoshiFallback.className}`}>
           Palace
         </span>
      </nav>
      <main>
        <Hero />
        <TokenWeightSection />
      </main>
    </div>
  )
}
