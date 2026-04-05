'use client'

import { motion, useReducedMotion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Inter } from 'next/font/google'
import {
  Zap, ChevronDown, ArrowRight, Check, TerminalSquare, Copy, Layers, Command, Cpu, Shield, Box
} from 'lucide-react'

// Hack for Github
const Github = ({ className, style }: { className?: string; style?: React.CSSProperties }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>;

// Using Inter for Body/UI
const interFont = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

// Design Tokens
const tokens = {
  // Canvas & Surfaces
  abyssBlack: '#050507',
  carbonSurface: '#101010',
  warmCharcoal: '#3d3a39',

  // Accents
  signalGreen: '#00d992',
  mintGreen: '#2fd6a1',
  softPurple: '#818cf8',
  dashedSlate: 'rgba(79, 93, 117, 0.4)',

  // Text
  snowWhite: '#f2f2f2',
  pureWhite: '#ffffff',
  warmParchment: '#b8b3b0',
  steelSlate: '#8b949e',
  fogGray: '#bdbdbd',

  // Shadows
  ambientHaze: 'rgba(92, 88, 85, 0.2) 0px 0px 15px',
  dramaticFloat: 'rgba(0, 0, 0, 0.7) 0px 20px 60px, rgba(148, 163, 184, 0.1) 0px 0px 0px 1px inset',
  greenGlow: 'drop-shadow(0 0 8px rgba(0, 217, 146, 0.6))',
}

// ─────────────────────────────────────────────
// MOTION HELPERS
// ─────────────────────────────────────────────
function FadeUp({ children, delay = 0, className = "", style }: { children: React.ReactNode; delay?: number; className?: string; style?: React.CSSProperties }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-5% 0px' })
  const shouldReduce = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      initial={shouldReduce ? false : { opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  )
}

function StaggerContainer({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-5% 0px' })
  const shouldReduce = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      initial={shouldReduce ? false : 'hidden'}
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.1 } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const staggerItem: import('framer-motion').Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────
const PRODUCT_NAME = 'VoltAgent'
const TAGLINE = 'The AI Agent Engineering Platform'
const DESCRIPTION = 'Build, deploy, and monitor autonomous AI agents with a developer-first framework. Type-safe, observable, and built for production systems.'

const NAV_LINKS = ['Platform', 'Use Cases', 'Docs', 'Blog']

const STATS = [
  { value: '10ms', label: 'Inference Latency' },
  { value: '100k+', label: 'Agent Runs/Day' },
  { value: '99.99%', label: 'Uptime SLA' },
  { value: 'Zero', label: 'Configuration' },
]

const FEATURES = [
  { icon: TerminalSquare, title: 'Code-First Agents', description: 'Define agents using pure TypeScript. No drag-and-drop builders, just code you can version control and test.', code: `const agent = new VoltAgent({\n  model: 'gpt-4-turbo',\n  tools: [searchTool, dbTool],\n  system: 'You are an SRE assistant.'\n});` },
  { icon: Layers, title: 'Multi-Agent Orchestration', description: 'Create complex workflows where specialized agents coordinate to solve hard problems autonomously.', code: `const workflow = new Workflow([\n  researchAgent,\n  codingAgent,\n  reviewAgent\n]);\n\nawait workflow.run(task);` },
  { icon: Cpu, title: 'Native Observability', description: 'Every thought, tool call, and decision is logged. Replay agent trajectories to debug hallucinations.', code: `volt.on('agent:thought', (t) => {\n  console.log(t.reasoning);\n});\n\nvolt.trace.export('./trace.json');` },
  { icon: Shield, title: 'Sandboxed Execution', description: 'Agents run in secure, isolated environments. Restrict tool access with granular permission policies.', code: `const pool = new Sandbox({\n  network: 'restricted',\n  fs: 'readonly:/data',\n  timeout: '30s'\n});` },
]

const PRICING = [
  {
    name: 'Developer',
    price: 'Free',
    period: 'forever',
    description: 'Perfect for local development and prototyping.',
    features: ['1,000 agent runs / month', 'Local observability dashboard', 'Community support', 'Basic tool library'],
    cta: 'Start building',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$49',
    period: 'per seat / month',
    description: 'For teams deploying agents to production.',
    features: ['100,000 agent runs / month', 'Cloud observability & tracing', 'Email support', 'Custom tool registry', 'Sandboxed execution'],
    cta: 'Start Free Trial',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For mission-critical autonomous systems.',
    features: ['Unlimited runs', 'SOC2 / HIPAA compliance', 'Dedicated Slack channel', 'VPC peering', 'SLA guarantees'],
    cta: 'Contact sales',
    highlighted: false,
  },
]

const TESTIMONIALS = [
  {
    name: 'Alex Chen',
    role: 'Lead AI Engineer',
    company: 'Nexus',
    text: 'VoltAgent finally gives us the primitives we need to treat AI agents like standard software components. The tracing alone saved us weeks of debugging.',
    rating: 5,
  },
  {
    name: 'Sarah Williams',
    role: 'CTO',
    company: 'DataFlow',
    text: 'We moved our entire support automation to VoltAgent. The code-first approach meant our developers could actually maintain and review the system changes.',
    rating: 5,
  },
  {
    name: 'James Rodriguez',
    role: 'Staff Software Engineer',
    company: 'FinTech Systems',
    text: 'The sandboxed execution environment gave our security team the confidence to let autonomous agents interact with our internal APIs safely.',
    rating: 5,
  },
]

const FAQ_ITEMS = [
  { q: 'Which LLMs does VoltAgent support?', a: 'We support OpenAI, Anthropic, Mistral, and local models via Ollama. You can swap models with a single line of configuration without changing your agent logic.' },
  { q: 'Is it really just code?', a: 'Yes. VoltAgent is a TypeScript framework. There are no proprietary YAML formats or visual builders. If you know JS/TS, you know VoltAgent.' },
  { q: 'How does the tracing work?', a: 'Every agent run emits OpenTelemetry-compatible traces. You can view these in our cloud dashboard, or export them to Datadog, Honeycomb, or Grafana.' },
  { q: 'Can I self-host?', a: 'The core open-source framework is fully self-hostable. The Enterprise plan includes options for self-hosting the observability and orchestration control plane.' },
]

// ─────────────────────────────────────────────
// COMPONENTS
// ─────────────────────────────────────────────

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#050507]/90 backdrop-blur-md border-b" style={{ borderColor: tokens.warmCharcoal }}>
      <div className="max-w-[1440px] mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <Zap className="h-6 w-6" style={{ color: tokens.signalGreen, filter: tokens.greenGlow }} />
            <span className="font-bold text-lg" style={{ color: tokens.snowWhite, fontFamily: 'system-ui, -apple-system, sans-serif' }}>
              VoltAgent
            </span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map(link => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(' ', '-')}`}
                className="text-[14.45px] transition-colors hover:text-white"
                style={{ color: tokens.snowWhite, fontWeight: 500 }}
              >
                {link}
              </a>
            ))}
          </div>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <a href="#" className="flex items-center gap-2 text-[14px]" style={{ color: tokens.steelSlate }}>
            <Github className="h-4 w-4" />
            <span>Star us</span>
          </a>
          <div className="w-px h-4" style={{ backgroundColor: tokens.warmCharcoal }} />
          <a href="#" className="text-[14.45px] transition-colors hover:text-white" style={{ color: tokens.snowWhite, fontWeight: 500 }}>Sign In</a>
          <button
            className="px-4 py-2 rounded-[6px] text-[14.45px] transition-all"
            style={{
              backgroundColor: tokens.carbonSurface,
              color: tokens.mintGreen,
              border: `1px solid ${tokens.warmCharcoal}`,
              fontWeight: 500,
            }}
          >
            Get Started
          </button>
        </div>

        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          <ChevronDown className="h-6 w-6" style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
        </button>
      </div>
    </nav>
  )
}

function Hero() {
  const copyToClipboard = () => {
    // mock copy
  }

  return (
    <section className="pt-32 pb-24 relative overflow-hidden" style={{ backgroundColor: tokens.abyssBlack }}>
      <div className="max-w-[1280px] mx-auto px-6 relative z-10 flex flex-col items-center text-center">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 mb-8 rounded-[9999px]"
          style={{ border: `1px solid ${tokens.warmCharcoal}`, backgroundColor: tokens.carbonSurface }}
        >
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: tokens.signalGreen, boxShadow: `0 0 8px ${tokens.signalGreen}` }} />
          <span className="text-[12px] uppercase" style={{ color: tokens.warmParchment, fontWeight: 600, letterSpacing: '1px', fontFamily: 'system-ui, sans-serif' }}>VoltAgent v2.0 is live</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-[40px] md:text-[60px] max-w-[900px] mx-auto mb-6"
          style={{
            color: tokens.pureWhite,
            fontFamily: 'system-ui, -apple-system, sans-serif',
            fontWeight: 400,
            lineHeight: 1.05,
            letterSpacing: '-0.65px'
          }}
        >
          The <span style={{ color: tokens.signalGreen }}>AI Agent</span> Engineering Platform
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[18px] md:text-[20px] mb-12 max-w-[640px] mx-auto"
          style={{ color: tokens.warmParchment, lineHeight: 1.6 }}
        >
          {DESCRIPTION}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-full max-w-[500px] mb-8"
        >
          {/* Code Block / Primary CTA */}
          <div className="flex items-center justify-between p-4 rounded-[6.4px] w-full" style={{ backgroundColor: tokens.carbonSurface, border: `1px solid ${tokens.warmCharcoal}` }}>
            <div className="flex items-center gap-3 overflow-x-auto">
              <span style={{ color: tokens.softPurple, fontFamily: 'SFMono-Regular, Consolas, monospace', fontSize: '14px' }}>$</span>
              <code style={{ color: tokens.snowWhite, fontFamily: 'SFMono-Regular, Consolas, monospace', fontSize: '14px', whiteSpace: 'nowrap' }}>
                npm create voltagent-app@latest
              </code>
            </div>
            <button onClick={copyToClipboard} className="p-2 rounded-[4px] hover:bg-white/5 transition-colors" aria-label="Copy to clipboard">
              <Copy className="h-4 w-4" style={{ color: tokens.steelSlate }} />
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
           <button
            className="px-6 py-3 rounded-[6px] text-[16px] transition-all hover:bg-white/5"
            style={{
              backgroundColor: 'transparent',
              color: tokens.snowWhite,
              border: `1px solid ${tokens.warmCharcoal}`,
              fontWeight: 500,
            }}
          >
            Read the Documentation
          </button>
        </motion.div>
      </div>

      {/* Decorative Grid Background */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{
        backgroundImage: `linear-gradient(to right, ${tokens.warmCharcoal} 1px, transparent 1px), linear-gradient(to bottom, ${tokens.warmCharcoal} 1px, transparent 1px)`,
        backgroundSize: '40px 40px',
        maskImage: 'radial-gradient(ellipse at top, black 20%, transparent 70%)'
      }} />
    </section>
  )
}

function CodeShowcase() {
  return (
    <section className="py-24" style={{ backgroundColor: tokens.abyssBlack }}>
       <div className="max-w-[1280px] mx-auto px-6">
         <FadeUp className="rounded-[8px] overflow-hidden" style={{ border: `1px solid ${tokens.warmCharcoal}`, backgroundColor: tokens.carbonSurface, boxShadow: tokens.dramaticFloat }}>
            <div className="flex items-center gap-2 px-4 py-3 border-b" style={{ borderColor: tokens.warmCharcoal, backgroundColor: '#0a0a0c' }}>
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
              <span className="ml-4 text-[12px] font-mono" style={{ color: tokens.steelSlate }}>agent.ts</span>
            </div>
            <div className="p-6 overflow-x-auto">
              <pre style={{ fontFamily: 'SFMono-Regular, Consolas, monospace', fontSize: '14px', lineHeight: 1.5, color: tokens.snowWhite }}>
<span style={{ color: tokens.softPurple }}>import</span> {'{ VoltAgent, tools }'} <span style={{ color: tokens.softPurple }}>from</span> <span style={{ color: tokens.mintGreen }}>'@voltagent/core'</span>;{'\n\n'}
<span style={{ color: tokens.steelSlate }}>// Define a type-safe agent in pure TypeScript</span>{'\n'}
<span style={{ color: tokens.softPurple }}>const</span> researcher = <span style={{ color: tokens.softPurple }}>new</span> VoltAgent({'{'}{'\n'}
  name: <span style={{ color: tokens.mintGreen }}>'DeepResearch'</span>,{'\n'}
  model: <span style={{ color: tokens.mintGreen }}>'claude-3-opus'</span>,{'\n'}
  tools: [tools.webSearch, tools.readDocument],{'\n'}
  system: <span style={{ color: tokens.mintGreen }}>'You are an expert researcher. Analyze the given topic thoroughly.'</span>,{'\n'}
  config: {'{'}{'\n'}
    maxSteps: <span style={{ color: '#ffba00' }}>15</span>,{'\n'}
    temperature: <span style={{ color: '#ffba00' }}>0.2</span>{'\n'}
  {'}'}{'\n'}
{'}'});{'\n\n'}
<span style={{ color: tokens.steelSlate }}>// Execute with native OpenTelemetry tracing</span>{'\n'}
<span style={{ color: tokens.softPurple }}>const</span> result = <span style={{ color: tokens.softPurple }}>await</span> researcher.run(<span style={{ color: tokens.mintGreen }}>'Explain the architecture of Transformer models.'</span>);{'\n'}
console.log(result.output);
              </pre>
            </div>
         </FadeUp>
       </div>
    </section>
  )
}

function Features() {
  return (
    <section id="platform" className="py-24" style={{ backgroundColor: tokens.abyssBlack }}>
      <div className="max-w-[1280px] mx-auto px-6">
        <FadeUp>
          <div className="mb-16 max-w-[800px]">
            <h2 className="text-[36px]" style={{ color: tokens.pureWhite, fontFamily: 'system-ui, sans-serif', letterSpacing: '-0.9px', lineHeight: 1.11 }}>
              Everything you need to build production agents.
            </h2>
            <p className="text-[18px] mt-4" style={{ color: tokens.warmParchment, lineHeight: 1.6 }}>
              A comprehensive toolkit for orchestration, tool execution, and observability.
            </p>
          </div>
        </FadeUp>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              variants={staggerItem}
              className="p-8 rounded-[8px] flex flex-col"
              style={{
                backgroundColor: tokens.carbonSurface,
                border: i === 0 ? `2px solid ${tokens.signalGreen}` : `1px solid ${tokens.warmCharcoal}`,
                boxShadow: i === 0 ? tokens.ambientHaze : 'none'
              }}
            >
              <div className="mb-6 flex items-center justify-between">
                 <feature.icon className="h-6 w-6" style={{ color: i === 0 ? tokens.signalGreen : tokens.snowWhite }} strokeWidth={1.5} />
              </div>
              <h3 className="text-[20px] mb-3" style={{ color: tokens.pureWhite, fontWeight: 600 }}>{feature.title}</h3>
              <p className="text-[16px] mb-6 flex-1" style={{ color: tokens.warmParchment, lineHeight: 1.5 }}>{feature.description}</p>

              {/* Mini Code Block */}
              <div className="p-4 rounded-[4px] mt-auto" style={{ backgroundColor: '#0a0a0c', border: `1px solid ${tokens.warmCharcoal}` }}>
                 <pre style={{ fontFamily: 'SFMono-Regular, Consolas, monospace', fontSize: '12px', color: tokens.steelSlate, overflowX: 'auto' }}>
                   {feature.code}
                 </pre>
              </div>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

function Stats() {
  return (
    <section className="py-24" style={{ backgroundColor: tokens.abyssBlack, borderTop: `1px solid ${tokens.warmCharcoal}` }}>
      <div className="max-w-[1280px] mx-auto px-6">
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat, i) => (
            <motion.div key={stat.label} variants={staggerItem} className="flex flex-col">
              <span className="text-[36px]" style={{ color: tokens.pureWhite, fontFamily: 'system-ui, sans-serif', letterSpacing: '-0.9px', lineHeight: 1.11 }}>
                {stat.value}
              </span>
              <span className="text-[14px] mt-2" style={{ color: tokens.steelSlate }}>
                {stat.label}
              </span>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}


function Pricing() {
  return (
    <section id="pricing" className="py-24" style={{ backgroundColor: tokens.abyssBlack }}>
      <div className="max-w-[1280px] mx-auto px-6">
        <FadeUp>
          <div className="text-center mb-16">
            <h2 className="text-[36px] mb-4" style={{ color: tokens.pureWhite, fontFamily: 'system-ui, sans-serif', letterSpacing: '-0.9px', lineHeight: 1.11 }}>
              Pricing that scales with your agents.
            </h2>
            <p className="text-[18px]" style={{ color: tokens.warmParchment }}>Start free. Upgrade when you hit production.</p>
          </div>
        </FadeUp>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PRICING.map((tier, i) => (
            <motion.div
              key={tier.name}
              variants={staggerItem}
              className="p-8 rounded-[8px] flex flex-col"
              style={{
                backgroundColor: tokens.carbonSurface,
                border: tier.highlighted ? `2px solid ${tokens.signalGreen}` : `1px solid ${tokens.warmCharcoal}`,
                boxShadow: tier.highlighted ? tokens.ambientHaze : 'none'
              }}
            >
              <h3 className="text-[20px] mb-2" style={{ color: tokens.snowWhite, fontWeight: 600 }}>{tier.name}</h3>
              <p className="text-[14px] h-10 mb-6" style={{ color: tokens.steelSlate }}>{tier.description}</p>

              <div className="mb-8 pb-8 border-b" style={{ borderColor: tokens.warmCharcoal }}>
                <div className="flex items-baseline gap-2">
                  <span className="text-[36px]" style={{ color: tokens.pureWhite, fontFamily: 'system-ui, sans-serif', letterSpacing: '-0.9px' }}>{tier.price}</span>
                  {tier.period && <span className="text-[14px]" style={{ color: tokens.steelSlate }}>{tier.period}</span>}
                </div>
              </div>

              <ul className="space-y-4 mb-8 flex-1">
                {tier.features.map(f => (
                  <li key={f} className="flex items-start gap-3 text-[14px]" style={{ color: tokens.warmParchment }}>
                    <Check className="h-4 w-4 shrink-0" style={{ color: tokens.signalGreen }} strokeWidth={2} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <button
                className="w-full py-3 rounded-[6px] text-[14px] transition-all"
                style={tier.highlighted
                  ? { backgroundColor: tokens.carbonSurface, color: tokens.mintGreen, border: `1px solid ${tokens.signalGreen}`, fontWeight: 500 }
                  : { backgroundColor: 'transparent', color: tokens.snowWhite, border: `1px solid ${tokens.warmCharcoal}`, fontWeight: 500 }
                }
              >
                {tier.cta}
              </button>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

function Testimonials() {
  return (
    <section className="py-24" style={{ backgroundColor: tokens.abyssBlack, borderTop: `1px solid ${tokens.warmCharcoal}` }}>
      <div className="max-w-[1280px] mx-auto px-6">
        <FadeUp>
           <h2 className="text-[24px] mb-12 text-center" style={{ color: tokens.pureWhite, fontFamily: 'system-ui, sans-serif', letterSpacing: '-0.6px', fontWeight: 700 }}>
              Trusted by engineering teams
           </h2>
        </FadeUp>
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              variants={staggerItem}
              className="p-8 rounded-[8px]"
              style={{ backgroundColor: tokens.carbonSurface, border: `1px solid ${tokens.warmCharcoal}` }}
            >
              <p className="text-[16px] mb-8" style={{ color: tokens.warmParchment, lineHeight: 1.6 }}>
                "{t.text}"
              </p>
              <div>
                <p className="font-semibold text-[14px]" style={{ color: tokens.snowWhite }}>{t.name}</p>
                <p className="text-[14px]" style={{ color: tokens.steelSlate }}>{t.role}, {t.company}</p>
              </div>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-24" style={{ backgroundColor: tokens.abyssBlack }}>
      <div className="max-w-[800px] mx-auto px-6">
        <FadeUp>
          <h2 className="text-[36px] mb-12 text-center" style={{ color: tokens.pureWhite, fontFamily: 'system-ui, sans-serif', letterSpacing: '-0.9px', lineHeight: 1.11 }}>
            Frequently Asked Questions
          </h2>
        </FadeUp>

        <div className="space-y-4">
          {FAQ_ITEMS.map((item, i) => (
            <FadeUp key={i} delay={i * 0.05}>
              <div className="rounded-[8px] transition-all duration-200"
                   style={{ backgroundColor: tokens.carbonSurface, border: `1px solid ${tokens.warmCharcoal}` }}>
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="text-[16px]" style={{ color: tokens.snowWhite, fontWeight: 500 }}>{item.q}</span>
                  <motion.div animate={{ rotate: openIndex === i ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown className="h-5 w-5" style={{ color: tokens.steelSlate }} />
                  </motion.div>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openIndex === i ? 'auto' : 0, opacity: openIndex === i ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ overflow: 'hidden' }}
                >
                  <p className="px-6 pb-6 text-[16px]" style={{ color: tokens.warmParchment, lineHeight: 1.6 }}>
                    {item.a}
                  </p>
                </motion.div>
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
    <section className="py-24" style={{ backgroundColor: tokens.abyssBlack, borderTop: `1px solid ${tokens.warmCharcoal}` }}>
      <div className="max-w-[800px] mx-auto px-6 text-center">
        <FadeUp>
          <h2 className="text-[36px] mb-6" style={{ color: tokens.pureWhite, fontFamily: 'system-ui, sans-serif', letterSpacing: '-0.9px', lineHeight: 1.11 }}>
            Ready to build agents?
          </h2>
          <p className="text-[18px] mb-10" style={{ color: tokens.warmParchment, lineHeight: 1.6 }}>
            Install the CLI and scaffold your first agent in under a minute.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
             <button
              className="w-full sm:w-auto px-8 py-4 rounded-[8px] text-[16px] transition-colors"
              style={{
                backgroundColor: tokens.carbonSurface,
                color: tokens.snowWhite,
                border: `3px solid ${tokens.warmCharcoal}`,
                fontWeight: 500,
              }}
            >
              Read Documentation
            </button>
            <button
              className="w-full sm:w-auto px-8 py-4 rounded-[8px] text-[16px] transition-colors"
              style={{
                backgroundColor: tokens.carbonSurface,
                color: tokens.mintGreen,
                border: `3px solid ${tokens.warmCharcoal}`,
                fontWeight: 500,
              }}
            >
              Get Started
            </button>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="pt-24 pb-12" style={{ backgroundColor: tokens.abyssBlack, borderTop: `1px solid ${tokens.warmCharcoal}` }}>
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-24">
          <div className="col-span-2 md:col-span-4 lg:col-span-2">
             <div className="flex items-center gap-2 mb-6">
                <Zap className="h-6 w-6" style={{ color: tokens.signalGreen, filter: tokens.greenGlow }} />
                <span className="font-bold text-lg" style={{ color: tokens.snowWhite, fontFamily: 'system-ui, sans-serif' }}>
                  VoltAgent
                </span>
             </div>
             <p className="text-[14px]" style={{ color: tokens.steelSlate, lineHeight: 1.6, maxWidth: '300px' }}>
                The developer-first framework for building, deploying, and monitoring autonomous AI agents.
             </p>
          </div>

          <div>
            <p className="text-[14px] mb-6 uppercase tracking-[0.5px]" style={{ color: tokens.snowWhite, fontWeight: 600, fontFamily: 'system-ui, sans-serif' }}>Product</p>
            <ul className="space-y-4">
              {['Framework', 'Observability', 'Registry', 'Pricing'].map(link => (
                <li key={link}>
                  <a href="#" className="text-[14px] transition-colors" style={{ color: tokens.fogGray }}>{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[14px] mb-6 uppercase tracking-[0.5px]" style={{ color: tokens.snowWhite, fontWeight: 600, fontFamily: 'system-ui, sans-serif' }}>Resources</p>
            <ul className="space-y-4">
              {['Documentation', 'Examples', 'Blog', 'Changelog'].map(link => (
                <li key={link}>
                  <a href="#" className="text-[14px] transition-colors" style={{ color: tokens.fogGray }}>{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[14px] mb-6 uppercase tracking-[0.5px]" style={{ color: tokens.snowWhite, fontWeight: 600, fontFamily: 'system-ui, sans-serif' }}>Community</p>
            <ul className="space-y-4">
              {['GitHub', 'Discord', 'Twitter', 'YouTube'].map(link => (
                <li key={link}>
                  <a href="#" className="text-[14px] transition-colors" style={{ color: tokens.fogGray }}>{link}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6" style={{ borderTop: `1px solid ${tokens.warmCharcoal}` }}>
          <p className="text-[14px]" style={{ color: tokens.steelSlate }}>© {new Date().getFullYear()} VoltAgent Inc.</p>
          <div className="flex gap-6">
            <a href="#" className="text-[14px]" style={{ color: tokens.steelSlate }}>Privacy</a>
            <a href="#" className="text-[14px]" style={{ color: tokens.steelSlate }}>Terms</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function VoltAgentPage() {
  return (
    <div className={`${interFont.variable} font-sans`} style={{ backgroundColor: tokens.abyssBlack }}>
      <Navbar />
      <main>
        <Hero />
        <CodeShowcase />
        <Features />
        <Stats />
        <Pricing />
        <Testimonials />
        <FAQ />
        <Newsletter />
      </main>
      <Footer />
    </div>
  )
}
