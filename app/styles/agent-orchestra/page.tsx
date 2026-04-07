'use client'

import React, { useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Roboto_Mono, Inter, Archivo } from 'next/font/google'
import { Menu, X, Share2, Workflow, Terminal, Users, Cpu, Server, CheckCircle2, AlertCircle, ChevronDown, Activity, Settings, ArrowRight } from 'lucide-react'

// Using Archivo as a substitute for Uncut Sans for a rational, wide, modern look
const headingFont = Archivo({ subsets: ['latin'], variable: '--font-heading', weight: ['400', '600', '700', '900'] })
const monoFont = Roboto_Mono({ subsets: ['latin'], variable: '--font-mono' })
const uiFont = Inter({ subsets: ['latin'], variable: '--font-ui' })

const tokens = {
  background: '#050505',
  surface: '#111111',
  accent1: '#60A5FA', // Primary Agent (Blue)
  accent2: '#FACC15', // Task Gold
  border: 'rgba(96, 165, 250, 0.4)',
  textHigh: '#F3F4F6',
  textMuted: '#9CA3AF'
}

const PRODUCT_NAME = "AgentOrchestra"

const FadeUp = ({ children, delay = 0, className = '' }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6, delay, ease: [0.23, 1, 0.32, 1] }}
    className={className}
  >
    {children}
  </motion.div>
)

// Signature Element: The "Symphony" Sidebar
const SymphonySidebar = () => {
  const logs = [
    { a: "Agent_Alpha", act: "Decomposing task...", time: "0ms", c: tokens.accent1 },
    { a: "Agent_Beta", act: "Scraping data...", time: "42ms", c: tokens.accent2 },
    { a: "Agent_Gamma", act: "Analyzing sentiment...", time: "120ms", c: "#34D399" },
    { a: "System", act: "Merging outputs...", time: "300ms", c: tokens.textHigh },
  ]
  return (
    <div className="fixed left-0 top-0 bottom-0 w-64 border-r hidden lg:block z-40 pt-24 overflow-hidden bg-[#050505]" style={{ borderColor: tokens.border }}>
      <div className={`px-4 pb-4 text-xs font-bold uppercase tracking-widest ${uiFont.className}`} style={{ color: tokens.textMuted }}>Live Orchestration</div>
      <div className="relative h-full flex flex-col items-start px-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={i}
            className={`w-full flex items-start gap-2 mb-4 text-xs ${monoFont.className}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: [0, 1, 0.5], x: 0, y: [-20, 0] }}
            transition={{ duration: 3, delay: i * 0.5, repeat: Infinity, repeatDelay: 5 }}
          >
            <div className="w-1 h-full min-h-[20px] rounded-full" style={{ backgroundColor: logs[i % logs.length].c }} />
            <div>
              <div style={{ color: logs[i % logs.length].c }}>{logs[i % logs.length].a}</div>
              <div style={{ color: tokens.textMuted }}>{logs[i % logs.length].act}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-md border-b bg-[#050505]/80" style={{ borderColor: tokens.border }}>
      <div className="max-w-7xl mx-auto px-6 lg:pl-72 h-16 flex items-center justify-between">
        <div className={`flex items-center gap-2 text-xl font-bold ${headingFont.className}`} style={{ color: tokens.textHigh }}>
          <Workflow className="w-5 h-5" style={{ color: tokens.accent1 }} /> {PRODUCT_NAME}
        </div>
        <div className="hidden md:flex items-center space-x-8">
          {['Delegation', 'Nodes', 'Pricing'].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} className={`text-sm hover:text-white transition-colors ${uiFont.className}`} style={{ color: tokens.textMuted }}>
              {item}
            </a>
          ))}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-5 py-2 rounded text-sm font-bold ${uiFont.className} flex items-center gap-2`}
            style={{ backgroundColor: tokens.accent1, color: tokens.background }}
          >
            Deploy Swarm
          </motion.button>
        </div>
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)} style={{ color: tokens.textHigh }}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b"
            style={{ borderColor: tokens.border, backgroundColor: tokens.surface }}
          >
            <div className="p-6 flex flex-col space-y-4">
              {['Delegation', 'Nodes', 'Pricing'].map(item => (
                <a key={item} href={`#${item.toLowerCase()}`} className={`text-sm ${uiFont.className}`} style={{ color: tokens.textHigh }}>
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 lg:pl-64 overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: `linear-gradient(${tokens.accent1} 1px, transparent 1px), linear-gradient(90deg, ${tokens.accent1} 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-12 w-full">
        <FadeUp delay={0.1}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#111111] border mb-6" style={{ borderColor: tokens.border }}>
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: tokens.accent2 }} />
            <span className={`text-xs ${monoFont.className}`} style={{ color: tokens.textHigh }}>System Status: 12 Agents Idle</span>
          </div>
        </FadeUp>
        <FadeUp delay={0.2}>
          <h1 className={`text-5xl md:text-7xl font-black mb-6 tracking-tight ${headingFont.className}`} style={{ color: tokens.textHigh }}>
            DELEGATE <br />
            COMPLEXITY. <br />
            <span style={{ color: tokens.accent1 }}>ORCHESTRATE</span> <br />
            RESULTS.
          </h1>
        </FadeUp>
        <FadeUp delay={0.3}>
          <p className={`text-lg md:text-xl mb-10 max-w-2xl ${uiFont.className}`} style={{ color: tokens.textMuted }}>
            Don't build one massive prompt. Build a symphony. AgentOrchestra delegates your goals to specialized AI agents working in perfect parallel harmony.
          </p>
        </FadeUp>
        <FadeUp delay={0.4}>
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-8 py-3 rounded font-bold ${uiFont.className} flex items-center justify-center gap-2`}
              style={{ backgroundColor: tokens.accent1, color: tokens.background }}
            >
              Start Conductor <ArrowRight className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-8 py-3 rounded font-bold ${uiFont.className} border`}
              style={{ borderColor: tokens.border, color: tokens.textHigh, backgroundColor: tokens.surface }}
            >
              View Node Graph
            </motion.button>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

function Stats() {
  return (
    <section className="py-20 border-y lg:ml-64 relative z-10" style={{ borderColor: tokens.border, backgroundColor: tokens.surface }}>
      <div className="max-w-5xl mx-auto px-6 lg:px-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        {[
          { label: "Active Swarms", value: "8,402" },
          { label: "Tasks Delegated", value: "1.2M" },
          { label: "Parallel Speedup", value: "40x" },
          { label: "Error Recovery", value: "99.9%" }
        ].map((stat, i) => (
          <FadeUp key={stat.label} delay={i * 0.1}>
            <div className={`text-3xl font-black mb-2 ${headingFont.className}`} style={{ color: tokens.textHigh }}>{stat.value}</div>
            <div className={`text-xs uppercase tracking-widest ${uiFont.className}`} style={{ color: tokens.textMuted }}>{stat.label}</div>
          </FadeUp>
        ))}
      </div>
    </section>
  )
}

function Features() {
  const features = [
    { icon: Share2, title: "Task Delegation Map", desc: "Watch the Conductor node automatically break down your high-level goal into parallel sub-tasks." },
    { icon: Users, title: "Capability Radar", desc: "Instantly view the collective strengths of your active agent pool across coding, research, and writing." },
    { icon: Workflow, title: "Agent Output Mixer", desc: "A deterministic pipeline that blends different agent results into a single, cohesive final answer." }
  ]
  return (
    <section className="py-32 relative z-10 lg:ml-64">
      <div className="max-w-5xl mx-auto px-6 lg:px-12">
        <FadeUp>
          <h2 className={`text-4xl md:text-5xl font-black mb-16 ${headingFont.className}`} style={{ color: tokens.textHigh }}>
            System Architecture
          </h2>
        </FadeUp>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <FadeUp key={f.title} delay={i * 0.2}>
              <motion.div
                whileHover={{ y: -5, borderColor: tokens.accent1 }}
                className="p-8 border bg-[#111111] transition-colors h-full"
                style={{ borderColor: tokens.border }}
              >
                <f.icon className="w-8 h-8 mb-6" style={{ color: tokens.accent2 }} />
                <h3 className={`text-xl font-bold mb-3 ${headingFont.className}`} style={{ color: tokens.textHigh }}>{f.title}</h3>
                <p className={`text-sm leading-relaxed ${uiFont.className}`} style={{ color: tokens.textMuted }}>{f.desc}</p>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProductDetail() {
  return (
    <section className="py-32 relative z-10 border-y lg:ml-64 bg-[#050505]" style={{ borderColor: tokens.border }}>
      <div className="max-w-6xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <FadeUp>
            <div className={`inline-block px-2 py-1 text-xs font-bold mb-4 ${monoFont.className}`} style={{ backgroundColor: `${tokens.accent1}33`, color: tokens.accent1 }}>PROCEDURAL_NODES</div>
            <h2 className={`text-4xl font-black mb-6 ${headingFont.className}`} style={{ color: tokens.textHigh }}>
              Procedural Agent States
            </h2>
            <p className={`text-lg mb-8 ${uiFont.className}`} style={{ color: tokens.textMuted }}>
              Agents aren't black boxes. Monitor their cognitive load in real-time. Nodes breathe and pulse when busy, and dynamically reallocate resources when blocked.
            </p>
            <div className="space-y-4">
              {[
                { label: "Idle", color: tokens.textMuted, icon: Server },
                { label: "Thinking", color: tokens.accent1, icon: Cpu },
                { label: "Blocked", color: '#EF4444', icon: AlertCircle },
                { label: "Done", color: '#10B981', icon: CheckCircle2 },
              ].map((state, i) => (
                <div key={i} className={`flex items-center gap-4 ${uiFont.className} text-sm font-bold`} style={{ color: tokens.textHigh }}>
                  <state.icon className="w-5 h-5" style={{ color: state.color }} /> {state.label}
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
        <div className="relative h-96 border bg-[#111111] flex items-center justify-center p-8 overflow-hidden" style={{ borderColor: tokens.border }}>
          {/* Mock Node Map */}
          <div className="absolute top-10 text-center">
            <motion.div className="w-16 h-16 border-2 mx-auto rounded-lg flex items-center justify-center relative z-10 bg-[#111111]" style={{ borderColor: tokens.accent1 }}>
              <Settings className="w-8 h-8 animate-spin-slow" style={{ color: tokens.accent1 }} />
            </motion.div>
            <div className={`text-xs mt-2 ${monoFont.className}`} style={{ color: tokens.textHigh }}>Conductor</div>
          </div>

          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            <motion.path d="M 50% 100 Q 20% 180, 20% 250" fill="none" stroke={tokens.border} strokeWidth="2" />
            <motion.path d="M 50% 100 Q 50% 180, 50% 250" fill="none" stroke={tokens.border} strokeWidth="2" />
            <motion.path d="M 50% 100 Q 80% 180, 80% 250" fill="none" stroke={tokens.border} strokeWidth="2" />

            {/* Animated Pulses along paths */}
            <motion.circle r="3" fill={tokens.accent2} animate={{ offsetDistance: ["0%", "100%"] }} style={{ offsetPath: "path('M 250 100 Q 100 180, 100 250')" }} transition={{ duration: 2, repeat: Infinity }} />
          </svg>

          <div className="absolute bottom-16 w-full flex justify-between px-10">
            {[1, 2, 3].map((n) => (
              <div key={n} className="text-center">
                <motion.div
                  animate={{ scale: [1, 1.1, 1], borderColor: [tokens.border, tokens.accent2, tokens.border] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: n * 0.2 }}
                  className="w-12 h-12 border-2 mx-auto rounded-full flex items-center justify-center bg-[#111111] relative z-10"
                >
                  <Cpu className="w-5 h-5" style={{ color: tokens.textHigh }} />
                </motion.div>
                <div className={`text-xs mt-2 ${monoFont.className}`} style={{ color: tokens.textMuted }}>Agent_0{n}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Pricing() {
  const tiers = [
    { name: "Local Swarm", price: "Free", desc: "Run agents on your own hardware.", features: ["Up to 3 concurrent agents", "Local LLM support", "Basic routing"] },
    { name: "Cloud Conductor", price: "$49", unit: "/mo", desc: "Managed multi-agent infrastructure.", features: ["Up to 50 concurrent agents", "OpenAI/Anthropic integration", "Persistent memory", "Web scraping tools"], highlight: true },
    { name: "Enterprise Hive", price: "Custom", desc: "For complex organizational workflows.", features: ["Unlimited agents", "VPC deployment", "Custom tool integration", "Dedicated support"] }
  ]
  return (
    <section className="py-32 relative z-10 lg:ml-64">
      <div className="max-w-5xl mx-auto px-6 lg:px-12">
        <FadeUp className="text-center mb-16">
          <h2 className={`text-4xl font-black mb-4 ${headingFont.className}`} style={{ color: tokens.textHigh }}>Compute Tiers</h2>
        </FadeUp>
        <div className="grid md:grid-cols-3 gap-6">
          {tiers.map((tier, i) => (
            <FadeUp key={tier.name} delay={i * 0.1}>
              <div className={`p-8 border h-full flex flex-col relative bg-[#111111]`} style={{ borderColor: tier.highlight ? tokens.accent1 : tokens.border }}>
                {tier.highlight && <div className={`absolute top-0 right-0 px-3 py-1 text-xs font-bold ${uiFont.className}`} style={{ backgroundColor: tokens.accent1, color: tokens.background }}>RECOMMENDED</div>}
                <h3 className={`text-xl font-bold mb-2 ${headingFont.className}`} style={{ color: tokens.textHigh }}>{tier.name}</h3>
                <div className={`text-4xl font-black mb-2 ${headingFont.className}`} style={{ color: tokens.textHigh }}>
                  {tier.price} <span className="text-sm font-normal" style={{ color: tokens.textMuted }}>{tier.unit}</span>
                </div>
                <p className={`text-sm mb-8 ${uiFont.className}`} style={{ color: tokens.textMuted }}>{tier.desc}</p>
                <ul className="space-y-4 mb-8 flex-1">
                  {tier.features.map((f, j) => (
                    <li key={j} className={`flex items-center gap-3 text-sm ${uiFont.className}`} style={{ color: tokens.textHigh }}>
                      <CheckCircle2 className="w-4 h-4" style={{ color: tokens.accent2 }} /> {f}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 font-bold ${uiFont.className} transition-colors border`}
                  style={{
                    backgroundColor: tier.highlight ? tokens.accent1 : 'transparent',
                    color: tier.highlight ? tokens.background : tokens.textHigh,
                    borderColor: tier.highlight ? tokens.accent1 : tokens.border
                  }}>
                  {tier.price === 'Custom' ? 'Contact Sales' : 'Deploy'}
                </button>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}

function Testimonials() {
  const testimonials = [
    { text: "Moving from a single massive prompt to a multi-agent system reduced our hallucination rate by 80%. AgentOrchestra makes it visible.", author: "Dr. K. Chen", role: "AI Lead" },
    { text: "The task delegation map is beautiful. I can literally watch the logic tree branch out and resolve itself in real-time.", author: "S. Williams", role: "Systems Engineer" },
    { text: "Finally, a framework that treats AI agents like microservices. Robust, fault-tolerant, and observable.", author: "M. Patel", role: "CTO" }
  ]
  return (
    <section className="py-32 border-y relative z-10 lg:ml-64 bg-[#050505]" style={{ borderColor: tokens.border }}>
      <div className="max-w-5xl mx-auto px-6 lg:px-12">
        <FadeUp className="mb-16">
          <h2 className={`text-4xl font-black ${headingFont.className}`} style={{ color: tokens.textHigh }}>System Logs (Reviews)</h2>
        </FadeUp>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <FadeUp key={i} delay={i * 0.2}>
              <div className="p-6 border bg-[#111111]" style={{ borderColor: tokens.border }}>
                <Activity className="w-5 h-5 mb-4" style={{ color: tokens.accent1 }} />
                <p className={`text-sm leading-relaxed mb-6 ${uiFont.className}`} style={{ color: tokens.textHigh }}>"{t.text}"</p>
                <div className={monoFont.className}>
                  <div className="text-xs font-bold" style={{ color: tokens.accent2 }}>{t.author}</div>
                  <div className="text-xs" style={{ color: tokens.textMuted }}>{t.role}</div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQ() {
  const faqs = [
    { q: "How are tasks divided?", a: "The Conductor Agent uses an LLM to read your prompt and generate a JSON task graph. It then provisions specialized worker agents for each node in the graph." },
    { q: "What happens if an agent fails?", a: "The system features automatic error recovery. If an agent loops or fails, the Conductor will terminate it and spin up a new instance with revised instructions." },
    { q: "Can agents talk to each other?", a: "Yes, agents can pass messages via a shared scratchpad or direct node-to-node communication depending on the workflow architecture you choose." }
  ]
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="py-32 relative z-10 lg:ml-64">
      <div className="max-w-3xl mx-auto px-6 lg:px-12">
        <FadeUp className="mb-16">
          <h2 className={`text-4xl font-black ${headingFont.className}`} style={{ color: tokens.textHigh }}>Diagnostic Queries</h2>
        </FadeUp>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <FadeUp key={i} delay={i * 0.1}>
              <div className="border bg-[#111111]" style={{ borderColor: tokens.border }}>
                <button
                  className="w-full flex items-center justify-between p-6 text-left"
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  <span className={`font-bold ${headingFont.className}`} style={{ color: tokens.textHigh }}>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 transition-transform ${open === i ? 'rotate-180' : ''}`} style={{ color: tokens.textMuted }} />
                </button>
                <AnimatePresence>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className={`p-6 pt-0 text-sm leading-relaxed ${uiFont.className}`} style={{ color: tokens.textMuted }}>
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}

function Newsletter() {
  return (
    <section className="py-32 relative z-10 lg:ml-64 border-t bg-[#050505]" style={{ borderColor: tokens.border }}>
      <div className="max-w-2xl mx-auto px-6 lg:px-12 text-center">
        <FadeUp>
          <Terminal className="w-12 h-12 mx-auto mb-6" style={{ color: tokens.accent1 }} />
          <h2 className={`text-3xl font-black mb-4 ${headingFont.className}`} style={{ color: tokens.textHigh }}>Subscribe to System Updates</h2>
          <p className={`text-sm mb-8 ${uiFont.className}`} style={{ color: tokens.textMuted }}>Get the latest on new agent tools, orchestration patterns, and platform updates.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="admin@domain.com"
              className={`flex-1 px-4 py-3 border bg-[#111111] text-sm ${monoFont.className} focus:outline-none focus:border-[${tokens.accent1}]`}
              style={{ borderColor: tokens.border, color: tokens.textHigh }}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-8 py-3 font-bold ${uiFont.className}`}
              style={{ backgroundColor: tokens.accent1, color: tokens.background }}
            >
              Initialize
            </motion.button>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="py-12 border-t relative z-10 lg:ml-64" style={{ borderColor: tokens.border, backgroundColor: tokens.background }}>
      <div className="max-w-5xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className={`flex items-center gap-2 text-xl font-bold ${headingFont.className}`} style={{ color: tokens.textHigh }}>
          <Workflow className="w-5 h-5" style={{ color: tokens.accent1 }} /> {PRODUCT_NAME}
        </div>
        <div className={`text-xs ${monoFont.className}`} style={{ color: tokens.textMuted }}>
          &copy; 2026 AgentOrchestra Inc. System Active.
        </div>
        <div className="flex gap-6">
          {['Documentation', 'GitHub', 'Status'].map(l => (
            <a key={l} href="#" className={`text-sm hover:text-[${tokens.accent1}] transition-colors ${uiFont.className}`} style={{ color: tokens.textMuted }}>{l}</a>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default function AgentOrchestraPage() {
  return (
    <div className={`min-h-screen selection:bg-[${tokens.accent1}] selection:text-[${tokens.background}]`} style={{ backgroundColor: tokens.background }}>
      <SymphonySidebar />
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Features />
        <ProductDetail />
        <Pricing />
        <Testimonials />
        <FAQ />
        <Newsletter />
      </main>
      <Footer />
      
      </div>
  )
}
