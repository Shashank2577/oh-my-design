'use client'

/**
 * CLAYMORPHISM MOTION WRAPPERS
 * 
 * Part of the Kinetic Design Protocol.
 * Focuses on high-stiffness spring physics and tactile feedback.
 */

import { motion, useReducedMotion, useInView, useScroll, useTransform, useSpring } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'

// 1. KINETIC CONSTANTS
// High stiffness (400) + Damping (25) = "Buoyant" feel of physical clay.
const KINETIC_SPRING = {
  type: 'spring' as const,
  stiffness: 400,
  damping: 25,
  mass: 1
}

// ─────────────────────────────────────────────
// COMPONENTS
// ─────────────────────────────────────────────

/**
 * AnimatedSection: Viewport entry wrapper with a springy pop.
 */
export function AnimatedSection({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number, className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' })
  const shouldReduce = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      initial={shouldReduce ? false : { opacity: 0, scale: 0.9, y: 32 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ ...KINETIC_SPRING, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/**
 * AnimatedButton: Simulates physical compression (squish) on press.
 */
export function AnimatedButton({ children, className, style, hoverShadow, activeShadow, type = "button", ...props }: any) {
  return (
    <motion.button
      type={type}
      className={className}
      style={style}
      whileHover={{ 
        y: -4, 
        scale: 1.05,
        boxShadow: hoverShadow
      }}
      whileTap={{ 
        scale: 0.92, 
        y: 2,
        boxShadow: activeShadow
      }}
      transition={KINETIC_SPRING}
      {...props}
    >
      {children}
    </motion.button>
  )
}

/**
 * AnimatedCard: Floats upward with expanded volume on hover.
 */
export function AnimatedCard({ children, className, style, hoverShadow, ...props }: any) {
  return (
    <motion.div
      className={className}
      style={style}
      whileHover={{ 
        y: -12, 
        scale: 1.02,
        boxShadow: hoverShadow 
      }}
      transition={KINETIC_SPRING}
      {...props}
    >
      {children}
    </motion.div>
  )
}

/**
 * AnimatedInput: Uses an inner shadow to simulate being "pressed" into the surface.
 */
export function AnimatedInput({ className, style, focusShadow, ...props }: any) {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <motion.input
      className={className}
      animate={{
        scale: isFocused ? 1.01 : 1,
        boxShadow: isFocused ? focusShadow : style.boxShadow
      }}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      transition={KINETIC_SPRING}
      {...props}
    />
  )
}

/**
 * AnimatedFAQ: Concave expansion with springy rotation.
 */
export function AnimatedFAQ({ question, answer, tokens, shadows }: any) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div
      className="rounded-[32px] overflow-hidden backdrop-blur-xl relative"
      style={{
        backgroundColor: isOpen ? '#EFEBF5' : tokens.cardBg,
        boxShadow: isOpen ? shadows.pressed : shadows.card
      }}
      animate={{
        backgroundColor: isOpen ? '#EFEBF5' : tokens.cardBg,
        boxShadow: isOpen ? shadows.pressed : shadows.card
      }}
      transition={{ duration: 0.3 }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between p-8 text-left"
      >
        <span className="font-black text-xl" style={{ fontFamily: 'var(--font-heading)', color: tokens.foreground }}>{question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={KINETIC_SPRING}
          className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
          style={{ backgroundColor: 'white', boxShadow: shadows.button }}
        >
          <ChevronDown className="h-5 w-5 text-gray-900" strokeWidth={3} />
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={KINETIC_SPRING}
        style={{ overflow: 'hidden' }}
      >
        <p className="px-8 pb-8 text-base font-medium leading-relaxed" style={{ color: tokens.muted }}>
          {answer}
        </p>
      </motion.div>
    </motion.div>
  )
}

/**
 * BackgroundBlobs: Provides the ambient 3D environment.
 */
export function BackgroundBlobs() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <>
      <style>{`
        @keyframes clay-float-slow {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(3deg); }
        }
        @keyframes clay-breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `}</style>
      <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
        <div className="absolute -top-[10%] -left-[10%] h-[60vh] w-[60vh] rounded-full blur-3xl bg-[#8B5CF6]/10 animate-[clay-float-slow_12s_ease-in-out_infinite]" />
        <div className="absolute top-[20%] -right-[10%] h-[60vh] w-[60vh] rounded-full blur-3xl bg-[#EC4899]/10 animate-[clay-float-slow_15s_ease-in-out_infinite] [animation-delay:2s]" />
        <div className="absolute -bottom-[10%] left-[20%] h-[60vh] w-[60vh] rounded-full blur-3xl bg-[#0EA5E9]/10 animate-[clay-float-slow_14s_ease-in-out_infinite] [animation-delay:4s]" />
      </div>
    </>
  )
}
