'use client'

import { motion, useReducedMotion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'

// ─────────────────────────────────────────────
// MOTION WRAPPER COMPONENTS
// ─────────────────────────────────────────────

export function AnimatedSection({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number, className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-5% 0px' })
  const shouldReduce = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      initial={shouldReduce ? false : { opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ type: 'spring', duration: 0.8, bounce: 0.4, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function AnimatedButton({ children, className, style, hoverShadow, activeShadow, type = "button", ...props }: any) {
  const [isHovered, setIsHovered] = useState(false)
  const [isActive, setIsActive] = useState(false)

  return (
    <motion.button
      type={type}
      className={className}
      style={{
        ...style,
        boxShadow: isActive ? activeShadow : (isHovered ? hoverShadow : style.boxShadow)
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onMouseDown={() => setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
      onMouseLeave={() => setIsActive(false)}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.92, y: 0 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      {...props}
    >
      {children}
    </motion.button>
  )
}

export function AnimatedCard({ children, className, style, hoverShadow, ...props }: any) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className={className}
      style={{
        ...style,
        boxShadow: isHovered ? hoverShadow : style.boxShadow
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function AnimatedInput({ className, style, focusShadow, ...props }: any) {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <input
      className={className}
      style={{
        ...style,
        boxShadow: isFocused ? focusShadow : style.boxShadow
      }}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      {...props}
    />
  )
}

export function AnimatedNewsletterForm({ tokens, shadows }: any) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setTimeout(() => setStatus('success'), 1200)
  }

  if (status === 'success') {
    return (
      <p className="font-bold text-lg" style={{ color: tokens.success }}>
        ✓ You&apos;re on the list! Prepare for squishiness.
      </p>
    )
  }

  return (
    <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto relative z-10" onSubmit={handleSubmit}>
      <label htmlFor="newsletter-email" className="sr-only">Email address</label>
      <AnimatedInput
        id="newsletter-email"
        type="email"
        required
        value={email}
        onChange={(e: any) => setEmail(e.target.value)}
        placeholder="your@email.com"
        className="flex-1 h-16 px-6 rounded-2xl font-bold text-lg outline-none"
        style={{ backgroundColor: '#EFEBF5', color: tokens.foreground, boxShadow: shadows.pressed }}
        focusShadow={`0 0 0 4px rgba(124, 58, 237, 0.2), ${shadows.pressed}`}
      />
      <AnimatedButton
        type="submit"
        disabled={status === 'loading'}
        className="h-16 px-8 rounded-2xl font-black text-white text-lg w-full sm:w-auto disabled:opacity-70"
        style={{ background: `linear-gradient(to bottom right, #A78BFA, ${tokens.accent})`, boxShadow: shadows.button }}
        hoverShadow={shadows.buttonHover}
        activeShadow={shadows.pressed}
      >
        {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
      </AnimatedButton>
    </form>
  )
}

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
          transition={{ type: 'spring', duration: 0.4, bounce: 0.4 }}
          className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
          style={{ backgroundColor: 'white', boxShadow: shadows.button }}
        >
          <ChevronDown className="h-5 w-5 text-gray-900" strokeWidth={3} />
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ type: 'spring', duration: 0.4, bounce: 0.3 }}
        style={{ overflow: 'hidden' }}
      >
        <p className="px-8 pb-8 text-base font-medium leading-relaxed" style={{ color: tokens.muted }}>
          {answer}
        </p>
      </motion.div>
    </motion.div>
  )
}

export function BackgroundBlobs() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <>
      <style>{`
        @keyframes clay-float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }
        @keyframes clay-float-delayed {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-2deg); }
        }
        @keyframes clay-float-slow {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(5deg); }
        }
        @keyframes clay-breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }
      `}</style>
      <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
        <div className="absolute -top-[10%] -left-[10%] h-[60vh] w-[60vh] rounded-full blur-3xl bg-[#8B5CF6]/10 animate-[clay-float_8s_ease-in-out_infinite]" />
        <div className="absolute top-[20%] -right-[10%] h-[60vh] w-[60vh] rounded-full blur-3xl bg-[#EC4899]/10 animate-[clay-float-delayed_10s_ease-in-out_infinite] [animation-delay:2s]" />
        <div className="absolute -bottom-[10%] left-[20%] h-[60vh] w-[60vh] rounded-full blur-3xl bg-[#0EA5E9]/10 animate-[clay-float_9s_ease-in-out_infinite] [animation-delay:4s]" />
      </div>
    </>
  )
}
