'use client'

import { useState, useEffect } from 'react'
import { Clipboard, Check, Loader2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'

interface CopyPromptButtonProps {
  prompt?: string
  slug?: string
}

export function CopyPromptButton({ prompt: initialPrompt, slug: initialSlug }: CopyPromptButtonProps) {
  const [copied, setCopied] = useState(false)
  const [prompt, setPrompt] = useState(initialPrompt)
  const [loading, setLoading] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  // Only render on client to avoid hydration issues
  useEffect(() => {
    setMounted(true)
  }, [])

  const slug = initialSlug || pathname?.split('/').filter(Boolean).pop() || ''

  useEffect(() => {
    if (mounted && !prompt && slug && slug !== 'styles') {
      console.log(`[CopyPromptButton] Fetching prompt for slug: ${slug}`)
      setLoading(true)
      fetch(`/prompts/${slug}.json`)
        .then(res => {
          if (!res.ok) throw new Error(`Prompt not found for ${slug}`)
          return res.json()
        })
        .then(data => {
          console.log(`[CopyPromptButton] Successfully fetched prompt for ${slug}`)
          setPrompt(data.prompt)
          setLoading(false)
        })
        .catch(err => {
          console.error(`[CopyPromptButton] Failed to fetch prompt for ${slug}:`, err)
          setLoading(false)
        })
    }
  }, [mounted, prompt, slug])

  const handleCopy = async () => {
    if (!prompt) return
    try {
      await navigator.clipboard.writeText(prompt)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const ease = [0.23, 1, 0.32, 1] as const

  if (!mounted || !slug || slug === 'styles') return null
  if (!prompt && !loading) return null

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex items-center gap-2">
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.3, ease }}
            className="bg-zinc-900 text-white text-sm font-medium px-3 py-1.5 rounded-md shadow-2xl border border-white/10"
          >
            Copied!
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={handleCopy}
        disabled={loading}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2, ease }}
        className="w-12 h-12 bg-zinc-900 hover:bg-zinc-800 text-white rounded-full flex items-center justify-center shadow-2xl border border-white/10 backdrop-blur-sm transition-colors focus:outline-none focus:ring-2 focus:ring-white/20 disabled:opacity-50"
        aria-label="Copy Prompt"
        title="Copy Prompt"
      >
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Loader2 className="w-5 h-5 animate-spin text-zinc-400" />
            </motion.div>
          ) : copied ? (
            <motion.div
              key="check"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2, ease }}
            >
              <Check className="w-5 h-5 text-green-400" />
            </motion.div>
          ) : (
            <motion.div
              key="clipboard"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2, ease }}
            >
              <Clipboard className="w-5 h-5" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  )
}
