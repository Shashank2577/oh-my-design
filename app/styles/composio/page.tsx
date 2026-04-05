"use client"

import React, { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Check, ChevronDown, Menu, Star, Activity, Shield, Zap, Terminal, Code, Cpu } from 'lucide-react'
import { JetBrains_Mono } from 'next/font/google'

const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })

const tokens = {
  background: '#0f0f0f',
  backgroundAlt: '#0a0a0a',
  foreground: '#ffffff',
  mutedForeground: 'rgba(255, 255, 255, 0.6)',
  accent: '#0007cd',
  accentForeground: '#ffffff',
  accentGlow: 'rgba(0, 255, 255, 0.12)',
  border: 'rgba(255, 255, 255, 0.10)',
  borderHighlight: 'rgba(255, 255, 255, 0.12)',
}

const PRODUCT_NAME = 'Composio'

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────
const STATS = [
  { label: 'Latency', value: '< 10ms' },
  { label: 'Uptime', value: '99.999%' },
  { label: 'Requests/sec', value: '100k+' },
]

const FEATURES = [
  { icon: Terminal, title: 'CLI Native', description: 'Everything is configurable via our rust-based CLI. No GUI required.' },
  { icon: Zap, title: 'Edge Execution', description: 'Deploy functions to 300+ edge locations automatically.' },
  { icon: Shield, title: 'Zero Trust', description: 'mTLS by default for all internal service communication.' },
  { icon: Code, title: 'Type Safe', description: 'End-to-end type safety from database to client.' },
  { icon: Cpu, title: 'WASM Support', description: 'Compile your modules to WebAssembly for near-native performance.' },
  { icon: Activity, title: 'Observability', description: 'Distributed tracing built directly into the core runtime.' },
]

const PRICING_TIERS = [
  {
    name: 'Hobby',
    price: '$0',
    period: 'forever',
    description: 'For personal projects and experiments.',
    features: ['10,000 requests/mo', '1GB Edge Storage', 'Community Support'],
    cta: 'Start Building',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$49',
    period: 'per month',
    description: 'For production applications and small teams.',
    features: ['1M requests/mo', '10GB Edge Storage', 'Email Support', 'Custom Domains'],
    cta: 'Start Trial',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'yearly',
    description: 'For organizations with advanced needs.',
    features: ['Unlimited requests', 'Dedicated Infrastructure', '24/7 Phone Support', 'SLA Guarantees', 'SSO & Advanced Auth'],
    cta: 'Contact Sales',
    highlighted: false,
  },
]

const TESTIMONIALS = [
  { name: 'Sarah Chen', role: 'Staff Engineer', company: 'TechCorp', text: 'It completely transformed how we ship backend services. The latency improvements alone were worth the migration.', rating: 5 },
  { name: 'Michael Rodriguez', role: 'CTO', company: 'Startup.io', text: 'The edge execution model combined with type safety across the stack gives us immense confidence when deploying.', rating: 5 },
  { name: 'Elena Rostova', role: 'Lead Developer', company: 'Enterprise Inc', text: 'Finally, a platform that feels like it was built by developers who understand the pain points of distributed systems.', rating: 5 },
]

const FAQ_ITEMS = [
  { q: 'How does it integrate with existing CI/CD?', a: 'We provide native GitHub Actions, GitLab CI components, and a standalone CLI tool that can be dropped into any pipeline.' },
  { q: 'What is the pricing for bandwidth?', a: 'Bandwidth is billed at $0.05/GB after your tier\'s included allowance is exceeded. Internal traffic between services is free.' },
  { q: 'Do you support custom WebAssembly runtimes?', a: 'Yes, you can bring your own WASM modules compiled from Rust, Go, or AssemblyScript.' },
  { q: 'How does the distributed tracing work?', a: 'We automatically inject OpenTelemetry headers into all requests passing through our gateway.' },
  { q: 'Is there a self-hosted option?', a: 'We offer a self-hosted enterprise version for companies with strict compliance or data residency requirements.' },
  { q: 'What databases are supported?', a: 'We offer managed Postgres and Redis, but you can securely connect to any external database via our encrypted tunnels.' },
]

// ─────────────────────────────────────────────
// ANIMATION WRAPPERS
// ─────────────────────────────────────────────
function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const shouldReduceMotion = useReducedMotion()
  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
      whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function StaggerContainer({ children, className = '', style = {} }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const shouldReduceMotion = useReducedMotion()
  return (
    <motion.div
      initial={shouldReduceMotion ? "visible" : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={{
        visible: { transition: { staggerChildren: 0.05 } },
        hidden: {}
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  )
}

const staggerItem: import('framer-motion').Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }
}

// ─────────────────────────────────────────────
// SECTIONS
// ─────────────────────────────────────────────
function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-md" style={{ borderColor: tokens.border, backgroundColor: 'rgba(15, 15, 15, 0.8)' }}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold" style={{ color: tokens.foreground }}>
          <div className="w-5 h-5 bg-[#0007cd] mr-1" />
          {PRODUCT_NAME}
        </div>
        <div className="hidden md:flex gap-6 text-sm">
          {['Features', 'Documentation', 'Pricing', 'Changelog'].map(item => (
            <a key={item} href="#" className="transition-colors hover:text-white" style={{ color: tokens.mutedForeground }}>
              {item}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <a href="#" className="hidden md:block text-sm transition-colors hover:text-white" style={{ color: tokens.mutedForeground }}>Sign in</a>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-4 py-2 text-sm font-medium transition-shadow hover:shadow-[4px_4px_0_0_rgba(0,137,255,0.4)]"
            style={{ backgroundColor: tokens.accent, color: tokens.accentForeground, border: `1px solid #0089ff` }}
          >
            Deploy Now
          </motion.button>
          <Menu className="md:hidden h-5 w-5" style={{ color: tokens.foreground }} />
        </div>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section className="pt-40 pb-24 relative overflow-hidden" style={{ backgroundColor: tokens.background }}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[120px] pointer-events-none opacity-20" style={{ background: 'radial-gradient(circle, #00ffff 0%, transparent 70%)' }} />
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <FadeUp>
          <div className="inline-flex items-center gap-2 px-3 py-1 border text-xs mb-8 font-mono" style={{ borderColor: tokens.border, color: tokens.mutedForeground, backgroundColor: tokens.backgroundAlt }}>
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#00ffff', boxShadow: '0 0 8px #00ffff' }}></span>
            v2.4.0 is now available
          </div>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-6 leading-[0.87]" style={{ color: tokens.foreground }}>
            The universal<br />execution engine.
          </h1>
        </FadeUp>
        <FadeUp delay={0.2}>
          <p className="text-xl md:text-2xl max-w-2xl mb-10 leading-snug" style={{ color: tokens.mutedForeground }}>
            Deploy global APIs, background workers, and persistent connections to the edge in milliseconds. Built entirely on Rust for zero-overhead performance.
          </p>
        </FadeUp>
        <FadeUp delay={0.3}>
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 font-medium flex items-center justify-center gap-2 transition-shadow hover:shadow-[4px_4px_0_0_rgba(0,137,255,0.4)]"
              style={{ backgroundColor: tokens.accent, color: tokens.accentForeground, border: `1px solid #0089ff` }}
            >
              Start Building <ArrowRight className="h-4 w-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 font-mono text-sm flex items-center justify-center gap-2 border"
              style={{ backgroundColor: tokens.backgroundAlt, color: tokens.mutedForeground, borderColor: tokens.border }}
            >
              <Terminal className="h-4 w-4" /> npm i -g composio
            </motion.button>
          </div>
        </FadeUp>
        <FadeUp delay={0.4} className="mt-20">
          <div className="w-full aspect-[16/9] border bg-black relative flex items-center justify-center overflow-hidden group shadow-[8px_8px_0_0_rgba(255,255,255,0.05)]" style={{ borderColor: tokens.borderHighlight }}>
             <div className="absolute inset-0 bg-[url('https://transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
             <pre className="font-mono text-sm md:text-base text-left w-full h-full p-8 overflow-hidden" style={{ color: tokens.mutedForeground }}>
              <code style={{ color: '#00ffff' }}>$ composio deploy --prod</code><br/>
              <code className="text-gray-500">Deploying to 300+ edge locations...</code><br/>
              <code className="text-gray-500">Compiling WASM modules...</code><br/>
              <code className="text-gray-500">Optimizing routes...</code><br/>
              <code style={{ color: '#00ff00' }}>✓ Deployment successful (412ms)</code><br/>
              <br/>
              <code>https://api.composio.dev/v1/</code><span className="animate-pulse">_</span>
             </pre>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

function Stats() {
  return (
    <section className="py-20 border-y" style={{ borderColor: tokens.border, backgroundColor: tokens.backgroundAlt }}>
      <div className="max-w-6xl mx-auto px-6">
        <StaggerContainer>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <motion.div variants={staggerItem}>
              <p className="text-sm uppercase font-mono mb-2" style={{ color: tokens.mutedForeground }}>Global Edge</p>
              <p className="text-4xl font-bold" style={{ color: tokens.foreground }}>300+</p>
            </motion.div>
            {STATS.map(stat => (
              <motion.div key={stat.label} variants={staggerItem}>
                <p className="text-sm uppercase font-mono mb-2" style={{ color: tokens.mutedForeground }}>{stat.label}</p>
                <p className="text-4xl font-bold" style={{ color: tokens.foreground }}>{stat.value}</p>
              </motion.div>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  )
}

function Features() {
  return (
    <section id="features" className="py-24" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-6xl mx-auto px-6">
        <FadeUp>
          <div className="mb-16">
            <h2 className="text-4xl font-bold mb-4 leading-tight" style={{ color: tokens.foreground }}>Engineered for<br/>extreme scale.</h2>
            <p className="text-lg max-w-2xl" style={{ color: tokens.mutedForeground }}>We stripped away everything that slows you down.</p>
          </div>
        </FadeUp>
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FEATURES.map(f => (
              <motion.div
                key={f.title}
                variants={staggerItem}
                className="p-8 border bg-[#000000] transition-colors hover:border-[#00ffff]/30 group"
                style={{ borderColor: tokens.border }}
              >
                <div className="h-12 w-12 border flex items-center justify-center mb-6 group-hover:shadow-[0_0_15px_rgba(0,255,255,0.3)] transition-shadow" style={{ borderColor: tokens.border, backgroundColor: tokens.backgroundAlt }}>
                  <f.icon className="h-5 w-5" style={{ color: '#00ffff' }} />
                </div>
                <h3 className="text-lg font-bold mb-3" style={{ color: tokens.foreground }}>{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: tokens.mutedForeground }}>{f.description}</p>
              </motion.div>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  )
}

function ProductDetail() {
  return (
    <section className="py-24 border-t" style={{ borderColor: tokens.border, backgroundColor: tokens.backgroundAlt }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <FadeUp>
            <h2 className="text-4xl font-bold mb-6 leading-[0.9]" style={{ color: tokens.foreground }}>Write once.<br/>Run everywhere.</h2>
            <p className="text-lg mb-8 leading-relaxed" style={{ color: tokens.mutedForeground }}>
              Our proprietary hypervisor isolates your code at the V8 isolate level, allowing for single-digit millisecond cold starts while maintaining strict security boundaries. Connect instantly to managed Postgres with built-in connection pooling.
            </p>
            <ul className="space-y-4 mb-8">
              {[
                'V8 Isolate Security Model',
                'Built-in Connection Pooling',
                'Distributed KV Storage'
              ].map(item => (
                <li key={item} className="flex items-center gap-3 font-mono text-sm">
                  <Check className="h-4 w-4" style={{ color: '#00ffff' }} />
                  <span style={{ color: tokens.foreground }}>{item}</span>
                </li>
              ))}
            </ul>
          </FadeUp>
          <FadeUp delay={0.2}>
            <div className="aspect-square border bg-black p-8 shadow-[8px_8px_0_0_rgba(255,255,255,0.05)]" style={{ borderColor: tokens.borderHighlight }}>
              <pre className="font-mono text-sm h-full flex flex-col justify-center" style={{ color: tokens.mutedForeground }}>
                <code><span style={{ color: '#0089ff' }}>import</span> {'{ db }'} <span style={{ color: '#0089ff' }}>from</span> <span style={{ color: '#00ffff' }}>'@composio/data'</span></code><br/><br/>
                <code><span style={{ color: '#0089ff' }}>export default async function</span>(req) {'{'}</code><br/>
                <code>  <span style={{ color: '#0089ff' }}>const</span> user = <span style={{ color: '#0089ff' }}>await</span> db.users.findUnique({'{'}</code><br/>
                <code>    where: {'{'} id: req.user.id {'}'}</code><br/>
                <code>  {'}'})</code><br/><br/>
                <code>  <span style={{ color: '#0089ff' }}>return new</span> Response(JSON.stringify(user))</code><br/>
                <code>{'}'}</code>
              </pre>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}

function Pricing() {
  return (
    <section id="pricing" className="py-24 border-t" style={{ borderColor: tokens.border, backgroundColor: tokens.background }}>
      <div className="max-w-6xl mx-auto px-6">
        <FadeUp>
          <div className="mb-16">
            <h2 className="text-4xl font-bold mb-4" style={{ color: tokens.foreground }}>Transparent pricing.</h2>
            <p className="text-lg" style={{ color: tokens.mutedForeground }}>No artificial limits. Pay for what you use.</p>
          </div>
        </FadeUp>
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRICING_TIERS.map(tier => (
              <motion.div
                key={tier.name}
                variants={staggerItem}
                className="p-8 border bg-black flex flex-col"
                style={{ borderColor: tier.highlighted ? '#0089ff' : tokens.border }}
              >
                <h3 className="text-xl font-bold mb-2" style={{ color: tokens.foreground }}>{tier.name}</h3>
                <div className="mb-4 flex items-baseline gap-1">
                  <span className="text-4xl font-bold font-mono" style={{ color: tokens.foreground }}>{tier.price}</span>
                  <span className="text-sm" style={{ color: tokens.mutedForeground }}>/ {tier.period}</span>
                </div>
                <p className="text-sm mb-8" style={{ color: tokens.mutedForeground }}>{tier.description}</p>
                <ul className="space-y-4 mb-8 flex-1">
                  {tier.features.map(f => (
                    <li key={f} className="flex items-center gap-3 text-sm">
                      <Check className="h-4 w-4" style={{ color: tier.highlighted ? '#00ffff' : tokens.mutedForeground }} />
                      <span style={{ color: tokens.foreground }}>{f}</span>
                    </li>
                  ))}
                </ul>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 font-medium transition-colors"
                  style={tier.highlighted
                    ? { backgroundColor: tokens.accent, color: tokens.accentForeground, border: `1px solid #0089ff` }
                    : { backgroundColor: 'transparent', color: tokens.foreground, border: `1px solid ${tokens.border}` }
                  }
                >
                  {tier.cta}
                </motion.button>
              </motion.div>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  )
}

function Testimonials() {
  return (
    <section id="testimonials" className="py-24 border-t" style={{ borderColor: tokens.border, backgroundColor: tokens.backgroundAlt }}>
      <div className="max-w-6xl mx-auto px-6">
        <FadeUp>
          <div className="mb-16">
            <h2 className="text-4xl font-bold mb-4" style={{ color: tokens.foreground }}>Trusted by engineers.</h2>
          </div>
        </FadeUp>
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map(t => (
              <motion.div
                key={t.name}
                variants={staggerItem}
                className="p-8 border bg-black"
                style={{ borderColor: tokens.border }}
              >
                <div className="flex mb-6">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" style={{ color: '#00ffff' }} />
                  ))}
                </div>
                <p className="text-sm leading-relaxed mb-6 font-mono" style={{ color: tokens.foreground }}>"{t.text}"</p>
                <div>
                  <p className="font-bold text-sm" style={{ color: tokens.foreground }}>{t.name}</p>
                  <p className="text-xs mt-1" style={{ color: tokens.mutedForeground }}>{t.role} @ {t.company}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  )
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="py-24 border-t" style={{ borderColor: tokens.border, backgroundColor: tokens.background }}>
      <div className="max-w-3xl mx-auto px-6">
        <FadeUp>
          <div className="mb-16">
            <h2 className="text-4xl font-bold mb-4" style={{ color: tokens.foreground }}>Technical FAQ</h2>
          </div>
        </FadeUp>
        <div className="border" style={{ borderColor: tokens.border }}>
          {FAQ_ITEMS.map((item, i) => (
            <div key={i} className="border-b last:border-b-0 bg-black" style={{ borderColor: tokens.border }}>
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="font-bold font-mono text-sm" style={{ color: tokens.foreground }}>{item.q}</span>
                <motion.span animate={{ rotate: openIndex === i ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown className="h-4 w-4" style={{ color: tokens.mutedForeground }} />
                </motion.span>
              </button>
              <motion.div
                initial={false}
                animate={{ height: openIndex === i ? 'auto' : 0, opacity: openIndex === i ? 1 : 0 }}
                transition={{ duration: 0.2 }}
                style={{ overflow: 'hidden' }}
              >
                <p className="px-6 pb-6 text-sm leading-relaxed" style={{ color: tokens.mutedForeground }}>
                  {item.a}
                </p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Newsletter() {
  return (
    <section className="py-24 border-t" style={{ borderColor: tokens.border, backgroundColor: tokens.backgroundAlt }}>
      <div className="max-w-2xl mx-auto px-6 text-center">
        <FadeUp>
          <h2 className="text-4xl font-bold mb-4" style={{ color: tokens.foreground }}>System Status Updates</h2>
          <p className="text-lg mb-8 font-mono text-sm" style={{ color: tokens.mutedForeground }}>
            Subscribe to our engineering changelog.
          </p>
          <form className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="developer@company.com"
              className="flex-1 px-4 py-3 border font-mono text-sm focus:outline-none focus:border-[#00ffff]"
              style={{ borderColor: tokens.border, backgroundColor: '#000000', color: tokens.foreground }}
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 font-medium transition-shadow hover:shadow-[4px_4px_0_0_rgba(0,137,255,0.4)]"
              style={{ backgroundColor: tokens.accent, color: tokens.accentForeground, border: `1px solid #0089ff` }}
            >
              Subscribe
            </motion.button>
          </form>
        </FadeUp>
      </div>
    </section>
  )
}

function Footer() {
  const links = {
    Platform: ['Edge Functions', 'Database', 'Storage', 'CLI'],
    Resources: ['Documentation', 'API Reference', 'Examples', 'Blog'],
    Company: ['About', 'Careers', 'Twitter', 'GitHub'],
    Legal: ['Privacy', 'Terms', 'Security', 'Status'],
  }

  return (
    <footer className="py-16 border-t" style={{ borderColor: tokens.border, backgroundColor: tokens.background }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-16">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 font-bold mb-4" style={{ color: tokens.foreground }}>
              <div className="w-4 h-4 bg-[#0007cd]" />
              {PRODUCT_NAME}
            </div>
          </div>
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <p className="font-bold text-sm mb-4 font-mono" style={{ color: tokens.foreground }}>{group}</p>
              <ul className="space-y-3">
                {items.map(item => (
                  <li key={item}>
                    <a href="#" className="text-sm hover:text-white transition-colors" style={{ color: tokens.mutedForeground }}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs" style={{ borderColor: tokens.border }}>
          <p style={{ color: tokens.mutedForeground }}>
            © 2026 {PRODUCT_NAME} Inc.
          </p>
          <a href="/" className="hover:text-white transition-colors" style={{ color: tokens.mutedForeground }}>
            ← SYSTEM.ROOT
          </a>
        </div>
      </div>
    </footer>
  )
}

export default function StylePage() {
  return (
    <div className={`${jetbrainsMono.variable} font-sans`} style={{ backgroundColor: tokens.background }}>
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
