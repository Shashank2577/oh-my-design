'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { STYLES, StyleMeta } from '@/lib/styles-registry'
import {
  Zap,
  Sparkles,
  ChevronRight,
  Search,
  LayoutGrid,
  ExternalLink,
  Tag,
} from 'lucide-react'

/* ─── Mini Browser Preview ─────────────────────────────── */
function MiniPreview({ style }: { style: StyleMeta }) {
  const accent = style.accentColor

  // Generate a deterministic pattern based on slug
  const hash = style.slug.split('').reduce((a, c) => a + c.charCodeAt(0), 0)
  const pattern = hash % 5
  const darkBg = isColorDark(accent)
  const textColor = darkBg ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.5)'
  const lineColor = darkBg ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.08)'
  const blockColor = darkBg ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.06)'

  return (
    <div className="relative w-full h-full overflow-hidden" style={{ backgroundColor: accent }}>
      {/* Browser Chrome */}
      <div
        className="flex items-center gap-1.5 px-3 py-2"
        style={{ backgroundColor: darkBg ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.06)' }}
      >
        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: darkBg ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.15)' }} />
        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: darkBg ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.15)' }} />
        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: darkBg ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.15)' }} />
        <div
          className="flex-1 h-3.5 rounded-full ml-2 mr-8"
          style={{ backgroundColor: darkBg ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }}
        />
      </div>

      {/* Mini Page Content - varies by pattern */}
      <div className="px-4 pt-3 pb-4">
        {/* Nav dots */}
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-2 rounded-full" style={{ backgroundColor: textColor }} />
          <div className="flex gap-2">
            <div className="w-6 h-1.5 rounded-full" style={{ backgroundColor: lineColor }} />
            <div className="w-6 h-1.5 rounded-full" style={{ backgroundColor: lineColor }} />
            <div className="w-6 h-1.5 rounded-full" style={{ backgroundColor: lineColor }} />
          </div>
        </div>

        {pattern === 0 && (
          /* Hero-centered layout */
          <div className="flex flex-col items-center text-center gap-2">
            <div className="w-20 h-2.5 rounded-full" style={{ backgroundColor: textColor }} />
            <div className="w-28 h-1.5 rounded-full" style={{ backgroundColor: lineColor }} />
            <div className="w-16 h-4 rounded-md mt-1" style={{ backgroundColor: darkBg ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)' }} />
            <div className="grid grid-cols-3 gap-2 mt-3 w-full">
              <div className="h-8 rounded-md" style={{ backgroundColor: blockColor }} />
              <div className="h-8 rounded-md" style={{ backgroundColor: blockColor }} />
              <div className="h-8 rounded-md" style={{ backgroundColor: blockColor }} />
            </div>
          </div>
        )}

        {pattern === 1 && (
          /* Split hero layout */
          <div className="flex gap-3">
            <div className="flex-1 flex flex-col gap-1.5">
              <div className="w-16 h-2.5 rounded-full" style={{ backgroundColor: textColor }} />
              <div className="w-full h-1.5 rounded-full" style={{ backgroundColor: lineColor }} />
              <div className="w-3/4 h-1.5 rounded-full" style={{ backgroundColor: lineColor }} />
              <div className="w-12 h-3.5 rounded-md mt-1" style={{ backgroundColor: darkBg ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)' }} />
            </div>
            <div className="w-16 h-16 rounded-lg" style={{ backgroundColor: blockColor }} />
          </div>
        )}

        {pattern === 2 && (
          /* Card grid layout */
          <div className="flex flex-col gap-2">
            <div className="w-24 h-2 rounded-full mb-1" style={{ backgroundColor: textColor }} />
            <div className="grid grid-cols-2 gap-2">
              <div className="h-10 rounded-lg" style={{ backgroundColor: blockColor }} />
              <div className="h-10 rounded-lg" style={{ backgroundColor: blockColor }} />
              <div className="h-10 rounded-lg" style={{ backgroundColor: blockColor }} />
              <div className="h-10 rounded-lg" style={{ backgroundColor: blockColor }} />
            </div>
          </div>
        )}

        {pattern === 3 && (
          /* Dashboard layout */
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <div className="flex-1 h-8 rounded-lg" style={{ backgroundColor: blockColor }} />
              <div className="flex-1 h-8 rounded-lg" style={{ backgroundColor: blockColor }} />
              <div className="flex-1 h-8 rounded-lg" style={{ backgroundColor: blockColor }} />
            </div>
            <div className="w-full h-14 rounded-lg" style={{ backgroundColor: blockColor }} />
          </div>
        )}

        {pattern === 4 && (
          /* Magazine layout */
          <div className="flex flex-col gap-2">
            <div className="w-full h-10 rounded-lg" style={{ backgroundColor: blockColor }} />
            <div className="flex gap-2">
              <div className="flex-1 flex flex-col gap-1">
                <div className="w-full h-1.5 rounded-full" style={{ backgroundColor: lineColor }} />
                <div className="w-3/4 h-1.5 rounded-full" style={{ backgroundColor: lineColor }} />
                <div className="w-full h-1.5 rounded-full" style={{ backgroundColor: lineColor }} />
              </div>
              <div className="flex-1 flex flex-col gap-1">
                <div className="w-full h-1.5 rounded-full" style={{ backgroundColor: lineColor }} />
                <div className="w-2/3 h-1.5 rounded-full" style={{ backgroundColor: lineColor }} />
                <div className="w-full h-1.5 rounded-full" style={{ backgroundColor: lineColor }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
        <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <div className="bg-white/95 backdrop-blur-md px-5 py-2.5 rounded-full text-xs font-bold tracking-widest text-slate-900 flex items-center gap-2 shadow-lg">
            VIEW DEMO <ExternalLink size={12} />
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Helpers ──────────────────────────────────────────── */
function isColorDark(hex: string): boolean {
  const c = hex.replace('#', '')
  const r = parseInt(c.substring(0, 2), 16)
  const g = parseInt(c.substring(2, 4), 16)
  const b = parseInt(c.substring(4, 6), 16)
  return (r * 299 + g * 587 + b * 114) / 1000 < 128
}

/* ─── Style Card ───────────────────────────────────────── */
function StyleCard({ style }: { style: StyleMeta }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      whileHover={{ y: -6, transition: { duration: 0.2, ease: [0.23, 1, 0.32, 1] } }}
      className="group relative"
    >
      <Link href={`/styles/${style.slug}`}>
        <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden hover:border-slate-300 hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
          {/* Mini Preview */}
          <div className="h-40 w-full overflow-hidden">
            <MiniPreview style={style} />
          </div>

          {/* Content */}
          <div className="p-5 flex-1 flex flex-col">
            {/* Version & Category */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-black uppercase tracking-[0.15em] px-2 py-0.5 rounded-md ${
                  style.version === 'V3' ? 'bg-amber-50 text-amber-600' :
                  style.version === 'V2' ? 'bg-violet-50 text-violet-600' :
                  'bg-slate-100 text-slate-500'
                }`}>
                  {style.version || 'V1'}
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  {style.category}
                </span>
              </div>
              {style.version === 'V3' && <Zap size={13} className="text-amber-400 fill-amber-400" />}
            </div>

            {/* Name */}
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-1.5">
              {style.name}
            </h3>

            {/* Vibe */}
            <p className="text-sm text-slate-500 leading-relaxed mb-3 line-clamp-2">
              {style.vibe}
            </p>

            {/* Best For Tags */}
            <div className="mt-auto flex items-center gap-1.5 flex-wrap">
              <Tag size={11} className="text-slate-300 shrink-0" />
              {style.bestFor.split(',').slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-medium text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full border border-slate-100"
                >
                  {tag.trim()}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

/* ─── Home Page ────────────────────────────────────────── */
export default function Home() {
  const [filter, setFilter] = useState<'all' | 'V1' | 'V2' | 'V3'>('all')
  const [search, setSearch] = useState('')

  const builtStyles = useMemo(() => STYLES.filter(s => s.built), [])

  const versionCounts = useMemo(() => ({
    all: builtStyles.length,
    V1: builtStyles.filter(s => s.version === 'V1' || !s.version).length,
    V2: builtStyles.filter(s => s.version === 'V2').length,
    V3: builtStyles.filter(s => s.version === 'V3').length,
  }), [builtStyles])

  const filteredStyles = useMemo(() =>
    builtStyles.filter(style => {
      const matchesVersion = filter === 'all' || style.version === filter
      const matchesSearch = !search ||
        style.name.toLowerCase().includes(search.toLowerCase()) ||
        style.vibe.toLowerCase().includes(search.toLowerCase()) ||
        style.bestFor.toLowerCase().includes(search.toLowerCase()) ||
        style.category.toLowerCase().includes(search.toLowerCase())
      return matchesVersion && matchesSearch
    }),
    [builtStyles, filter, search]
  )

  return (
    <main className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ease: [0.23, 1, 0.32, 1] }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full text-blue-600 text-xs font-bold uppercase tracking-widest mb-6"
          >
            <Sparkles size={14} />
            The Ultimate Design System Showcase
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
            className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter mb-6"
          >
            OH MY <span className="text-blue-600">DESIGN.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed"
          >
            Explore {builtStyles.length} production-grade landing pages across three distinct eras of digital aesthetics.
          </motion.p>
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
          className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 bg-white p-3 rounded-2xl border border-slate-200 shadow-sm"
        >
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl w-full md:w-auto">
            {(['all', 'V1', 'V2', 'V3'] as const).map((v) => (
              <button
                key={v}
                onClick={() => setFilter(v)}
                className={`flex-1 md:flex-none px-5 py-2 rounded-lg text-sm font-bold uppercase tracking-wider transition-all flex items-center gap-2 justify-center ${
                  filter === v
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {v === 'all' ? 'All' : v}
                <span className={`text-[10px] font-medium ${
                  filter === v ? 'text-blue-400' : 'text-slate-400'
                }`}>
                  {versionCounts[v]}
                </span>
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search styles, vibes, categories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-6 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm font-medium"
            />
          </div>
        </motion.div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-slate-400 font-medium">
            Showing <span className="text-slate-600 font-bold">{filteredStyles.length}</span> designs
          </p>
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredStyles.map((style) => (
              <StyleCard key={style.slug} style={style} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredStyles.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200"
          >
            <LayoutGrid className="mx-auto text-slate-300 mb-4" size={48} />
            <h3 className="text-xl font-bold text-slate-900 mb-2">No matching designs found</h3>
            <p className="text-slate-500">Try adjusting your search or filters.</p>
          </motion.div>
        )}
      </div>
    </main>
  )
}
