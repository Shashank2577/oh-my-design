'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { STYLES, StyleMeta } from '@/lib/styles-registry'
import { Layers, ChevronRight } from 'lucide-react'

export function DesignSwitcher() {
  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const slug = pathname?.split('/').filter(Boolean).pop() || ''
  const style = STYLES.find(s => s.slug === slug)

  if (!style || !style.variants || style.variants.length < 2) return null

  const currentVariantId = searchParams.get('v') || style.variants.find(v => v.isDefault)?.id || style.variants[0].id
  const currentVariant = style.variants.find(v => v.id === currentVariantId) || style.variants[0]

  const handleSwitch = (id: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('v', id)
    router.push(`${pathname}?${params.toString()}`)
    setIsOpen(false)
  }

  // Adaptive Styling logic
  const isNeoBrutalism = slug === 'neo-brutalism'
  const isAcademia = slug === 'academia'
  const isKinetic = currentVariantId === 'kinetic'

  const containerStyle = isNeoBrutalism 
    ? "bg-[#FFD93D] border-4 border-black shadow-[8px_8px_0px_0px_#000]" 
    : isAcademia 
      ? "bg-[#251E19] border border-[#C9A962] text-[#E8DFD4] shadow-2xl"
      : "bg-white/10 backdrop-blur-xl border border-white/20 text-white shadow-2xl"

  const pillStyle = isNeoBrutalism
    ? "bg-black text-white border-2 border-black"
    : isAcademia
      ? "bg-[#C9A962] text-[#1C1714]"
      : "bg-white text-black"

  return (
    <div className="fixed bottom-6 left-6 z-[9999] flex flex-col items-start gap-3">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className={`p-2 rounded-2xl flex flex-col gap-1 min-w-[200px] ${containerStyle}`}
          >
            <div className="px-3 py-2 text-[10px] uppercase tracking-widest opacity-50 font-bold">
              Switch Narrative
            </div>
            {style.variants.map((v) => (
              <button
                key={v.id}
                onClick={() => handleSwitch(v.id)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all font-bold text-sm
                  ${v.id === currentVariantId 
                    ? pillStyle 
                    : "hover:bg-black/10 dark:hover:bg-white/10"
                  }
                  ${isNeoBrutalism ? "rounded-none uppercase tracking-tighter" : ""}
                `}
              >
                {v.label}
                {v.id === currentVariantId && <ChevronRight size={14} />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`h-14 px-6 rounded-full flex items-center gap-3 font-bold shadow-2xl transition-all
          ${containerStyle}
          ${isNeoBrutalism ? "rounded-none h-16 border-4 shadow-[4px_4px_0px_0px_#000]" : ""}
        `}
      >
        <Layers size={20} className={isNeoBrutalism ? "text-black" : ""} />
        <span className={isNeoBrutalism ? "uppercase tracking-tighter" : ""}>
          Switch Design: {currentVariant?.label}
        </span>
      </motion.button>
    </div>
  )
}
