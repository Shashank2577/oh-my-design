'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { STYLES, StyleMeta } from '@/lib/styles-registry'
import { 
  Zap, 
  Sparkles, 
  Layers, 
  ChevronRight, 
  Search,
  LayoutGrid,
  Filter
} from 'lucide-react'

export default function Home() {
  const [filter, setFilter] = useState<'all' | 'V1' | 'V2' | 'V3'>('all')
  const [search, setSearch] = useState('')

  const filteredStyles = STYLES.filter(style => {
    const matchesVersion = filter === 'all' || style.version === filter
    const matchesSearch = style.name.toLowerCase().includes(search.toLowerCase()) || 
                         style.vibe.toLowerCase().includes(search.toLowerCase())
    return matchesVersion && matchesSearch && style.built
  })

  const StyleCard = ({ style }: { style: StyleMeta }) => (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="group relative"
    >
      <Link href={`/styles/${style.slug}`}>
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-slate-300 hover:shadow-xl transition-all h-full flex flex-col">
          <div 
            className="h-32 w-full transition-transform group-hover:scale-105 duration-500" 
            style={{ backgroundColor: style.accentColor }}
          >
            <div className="w-full h-full bg-black/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold tracking-widest text-black flex items-center gap-2">
                VIEW DEMO <ChevronRight size={14} />
              </div>
            </div>
          </div>
          <div className="p-6 flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                {style.version || 'V1'} // {style.category}
              </span>
              {style.version === 'V3' && <Zap size={14} className="text-yellow-400 fill-yellow-400" />}
            </div>
            <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2">
              {style.name}
            </h3>
            <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">
              {style.vibe}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  )

  return (
    <main className="min-h-screen bg-slate-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full text-blue-600 text-xs font-bold uppercase tracking-widest mb-6"
          >
            <Sparkles size={14} />
            The Ultimate Design System Showcase
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter mb-8"
          >
            OH MY <span className="text-blue-600">DESIGN.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed"
          >
            Explore {STYLES.length}+ production-grade landing pages across three distinct eras of digital aesthetics.
          </motion.p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16 bg-white p-4 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-2xl w-full md:w-auto">
            {(['all', 'V1', 'V2', 'V3'] as const).map((v) => (
              <button
                key={v}
                onClick={() => setFilter(v)}
                className={`flex-1 md:flex-none px-6 py-2 rounded-xl text-sm font-bold uppercase tracking-widest transition-all ${
                  filter === v 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {v}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text"
              placeholder="Search styles, vibes, or brands..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-6 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm font-medium"
            />
          </div>
        </div>

        {/* Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {filteredStyles.map((style) => (
            <StyleCard key={style.slug} style={style} />
          ))}
        </motion.div>

        {filteredStyles.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
            <LayoutGrid className="mx-auto text-slate-300 mb-4" size={48} />
            <h3 className="text-xl font-bold text-slate-900 mb-2">No matching designs found</h3>
            <p className="text-slate-500">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </main>
  )
}
