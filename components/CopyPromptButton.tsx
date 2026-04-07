'use client'

import { useState } from 'react'
import { Clipboard, Check } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface CopyPromptButtonProps {
  prompt: string
}

export function CopyPromptButton({ prompt }: CopyPromptButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const ease = [0.23, 1, 0.32, 1] as const

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.3, ease }}
            className="bg-zinc-900/90 text-white text-sm font-medium px-3 py-1.5 rounded-md shadow-lg"
          >
            Copied!
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={handleCopy}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2, ease }}
        className="w-12 h-12 bg-zinc-900/90 hover:bg-zinc-800 text-white rounded-full flex items-center justify-center shadow-lg border border-white/10 backdrop-blur-sm transition-colors focus:outline-none focus:ring-2 focus:ring-white/20"
        aria-label="Copy Prompt"
        title="Copy Prompt"
      >
        <AnimatePresence mode="wait">
          {copied ? (
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
