"use client"

import React, { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Check, ChevronDown, Menu, Star, Edit, Search, FileText, Code2, Zap, Terminal } from 'lucide-react'
import { JetBrains_Mono, PT_Serif } from 'next/font/google'

const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })
const ptSerif = PT_Serif({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-serif' })

const tokens = {
  background: '#f2f1ed',
  backgroundAlt: '#e6e5e0',
  foreground: '#26251e',
  mutedForeground: '#66655e',
  accent: '#f54e00',
  accentForeground: '#ffffff',
  border: 'rgba(38, 37, 30, 0.1)',
}

const PRODUCT_NAME = 'Cursor'

const STATS = [
  { label: 'Lines written', value: '1B+' },
  { label: 'Time saved', value: '500k hrs' },
  { label: 'Active users', value: '100k+' },
]

const FEATURES = [
  { icon: Search, title: 'Codebase Answers', description: 'Ask questions about your entire codebase and get accurate answers with citations.' },
  { icon: Edit, title: 'Copilot++', description: 'Predicts your next edit, not just your next word. Tab to accept multi-line changes.' },
  { icon: FileText, title: 'Docs Search', description: 'Third-party documentation is indexed and available directly in your editor.' },
  { icon: Code2, title: 'Code Generation', description: 'Generate entire functions or files from simple natural language prompts.' },
  { icon: Zap, title: 'Fast Execution', description: 'Built on a customized VS Code fork for maximum performance and familiarity.' },
  { icon: Terminal, title: 'Terminal Integrated', description: 'AI assist directly in your terminal for command generation and error fixing.' },
]

const PRICING_TIERS = [
  {
    name: 'Basic',
    price: 'Free',
    period: 'forever',
    description: 'Perfect for getting started with AI-assisted coding.',
    features: ['Basic autocomplete', '50 slow GPT-4 requests/mo', 'Unlimited GPT-3.5', 'Community support'],
    cta: 'Download',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$20',
    period: 'per month',
    description: 'For professionals who code every day.',
    features: ['Copilot++', '500 fast GPT-4 requests/mo', 'Unlimited slow GPT-4', 'Priority support'],
    cta: 'Start Pro Trial',
    highlighted: true,
  },
  {
    name: 'Business',
    price: '$40',
    period: 'per user/mo',
    description: 'For teams that need security and administration.',
    features: ['Everything in Pro', 'Centralized billing', 'Admin dashboard', 'Zero data retention policy', 'SAML SSO'],
    cta: 'Contact Sales',
    highlighted: false,
  },
]

const TESTIMONIALS = [
  { name: 'Alex Rivera', role: 'Senior Engineer', company: 'TechNova', text: 'It feels less like a tool and more like a pair programmer that has read every file in our monorepo.', rating: 5 },
  { name: 'Samira Jones', role: 'Indie Hacker', company: 'Self-employed', text: 'Copilot++ is magic. It frequently writes the exact 10 lines of boilerplate I was about to type.', rating: 5 },
  { name: 'David Chen', role: 'CTO', company: 'BuildFast', text: 'We rolled this out to the entire engineering team. The productivity gains were visible within the first week.', rating: 5 },
]

const FAQ_ITEMS = [
  { q: 'Is it compatible with my VS Code extensions?', a: 'Yes. Since Cursor is a fork of VS Code, nearly all your favorite extensions, themes, and keybindings work out of the box.' },
  { q: 'Are my code snippets sent to the cloud?', a: 'By default, yes, to power the AI features. However, we offer a strict "Privacy Mode" where no code is stored or used for training.' },
  { q: 'What models power the AI?', a: 'We use a combination of top-tier models including GPT-4, Claude 3 Opus, and our own custom-trained models for specific tasks.' },
  { q: 'Can I use my own API keys?', a: 'Yes, you can input your own OpenAI or Anthropic API keys to use the editor without a Pro subscription.' },
  { q: 'Does it work offline?', a: 'The core editor functions perfectly offline, but AI features require an internet connection.' },
  { q: 'How is this different from GitHub Copilot?', a: 'Cursor integrates AI at the editor level, allowing it to read your whole codebase, write multiple files at once, and deeply understand your context.' },
]

function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const shouldReduceMotion = useReducedMotion()
  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
      whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay, ease: [0.25, 1, 0.5, 1] }}
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
        visible: { transition: { staggerChildren: 0.1 } },
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
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] } }
}

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b" style={{ borderColor: tokens.border, backgroundColor: 'rgba(242, 241, 237, 0.8)' }}>
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-xl" style={{ color: tokens.foreground }}>
          <div className="w-4 h-4 rounded-full bg-[#f54e00]" />
          {PRODUCT_NAME}
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium">
          {['Features', 'Pricing', 'Blog', 'Forum'].map(item => (
            <a key={item} href="#" className="hover:opacity-70 transition-opacity" style={{ color: tokens.foreground }}>
              {item}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <a href="#" className="hidden md:block text-sm font-medium hover:opacity-70" style={{ color: tokens.foreground }}>Sign In</a>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-4 py-1.5 text-sm font-medium rounded-full"
            style={{ backgroundColor: tokens.foreground, color: tokens.background }}
          >
            Download
          </motion.button>
        </div>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section className="pt-40 pb-20 overflow-hidden" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-5xl mx-auto px-6 text-center">
        <FadeUp>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-6 leading-none" style={{ color: tokens.foreground, letterSpacing: '-0.04em' }}>
            Built for<br />productive coding.
          </h1>
        </FadeUp>
        <FadeUp delay={0.1}>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-10 font-serif leading-relaxed" style={{ color: tokens.mutedForeground }}>
            The AI code editor that understands your entire codebase. Write, edit, and navigate code faster than ever before.
          </p>
        </FadeUp>
        <FadeUp delay={0.2}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 rounded-full font-medium flex items-center justify-center gap-2 text-lg shadow-sm"
              style={{ backgroundColor: tokens.accent, color: tokens.accentForeground }}
            >
              Download for Mac <ArrowRight className="h-5 w-5" />
            </motion.button>
            <p className="text-sm font-medium" style={{ color: tokens.mutedForeground }}>
              Also available for Windows & Linux
            </p>
          </div>
        </FadeUp>
        <FadeUp delay={0.3} className="mt-20">
          <div className="w-full aspect-[16/10] rounded-2xl border shadow-xl overflow-hidden bg-[#1e1e1e] flex flex-col text-left" style={{ borderColor: tokens.border }}>
             <div className="h-10 border-b flex items-center px-4 gap-2" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
               <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
               <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
               <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
             </div>
             <div className="flex-1 p-6 font-mono text-sm leading-loose overflow-hidden">
               <span style={{ color: '#569cd6' }}>function</span> <span style={{ color: '#dcdcaa' }}>calculateFibonacci</span>(n: <span style={{ color: '#4ec9b0' }}>number</span>): <span style={{ color: '#4ec9b0' }}>number</span> {'{'} <br/>
               &nbsp;&nbsp;<span style={{ color: '#6a9955' }}>// The AI suggested the rest of this function</span><br/>
               <span style={{ opacity: 0.7 }}>
                 &nbsp;&nbsp;<span style={{ color: '#c586c0' }}>if</span> (n {'<='} <span style={{ color: '#b5cea8' }}>1</span>) <span style={{ color: '#c586c0' }}>return</span> n;<br/>
                 &nbsp;&nbsp;<span style={{ color: '#c586c0' }}>return</span> calculateFibonacci(n - <span style={{ color: '#b5cea8' }}>1</span>) + calculateFibonacci(n - <span style={{ color: '#b5cea8' }}>2</span>);<br/>
               </span>
               {'}'}<span className="inline-block w-2 h-4 bg-[#f54e00] ml-1 animate-pulse" />
             </div>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

function Stats() {
  return (
    <section className="py-20 border-y" style={{ borderColor: tokens.border, backgroundColor: tokens.backgroundAlt }}>
      <div className="max-w-5xl mx-auto px-6">
        <StaggerContainer>
          <div className="flex flex-wrap justify-between gap-8 text-center md:text-left">
            {STATS.map(stat => (
              <motion.div key={stat.label} variants={staggerItem} className="flex-1 min-w-[150px]">
                <p className="text-4xl font-bold mb-2 tracking-tight" style={{ color: tokens.foreground }}>{stat.value}</p>
                <p className="text-sm font-medium" style={{ color: tokens.mutedForeground }}>{stat.label}</p>
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
      <div className="max-w-5xl mx-auto px-6">
        <FadeUp>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight" style={{ color: tokens.foreground }}>Everything you need.</h2>
            <p className="text-xl font-serif max-w-2xl mx-auto" style={{ color: tokens.mutedForeground }}>A carefully crafted set of tools designed to keep you in flow.</p>
          </div>
        </FadeUp>
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURES.map(f => (
              <motion.div
                key={f.title}
                variants={staggerItem}
                className="p-6 rounded-2xl"
                style={{ backgroundColor: tokens.backgroundAlt }}
              >
                <div className="w-10 h-10 rounded-full mb-6 flex items-center justify-center" style={{ backgroundColor: tokens.foreground }}>
                  <f.icon className="h-5 w-5" style={{ color: tokens.background }} />
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ color: tokens.foreground }}>{f.title}</h3>
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
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <FadeUp>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight leading-tight" style={{ color: tokens.foreground }}>Chat with your entire codebase.</h2>
            <p className="text-lg font-serif mb-8 leading-relaxed" style={{ color: tokens.mutedForeground }}>
              Instead of painstakingly tracing execution paths, just ask. The AI indexes your repository locally to understand the relationships between files, providing accurate answers with exact line citations.
            </p>
            <ul className="space-y-4 font-medium text-sm">
              {['Understands local workspace', 'References third-party docs', 'Maintains chat history'].map(item => (
                <li key={item} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: tokens.foreground }}>
                    <Check className="h-3 w-3" style={{ color: tokens.background }} />
                  </div>
                  <span style={{ color: tokens.foreground }}>{item}</span>
                </li>
              ))}
            </ul>
          </FadeUp>
          <FadeUp delay={0.2}>
             <div className="aspect-square rounded-2xl border p-6 flex flex-col gap-4 shadow-sm" style={{ backgroundColor: tokens.background, borderColor: tokens.border }}>
               <div className="flex gap-3">
                 <div className="w-8 h-8 rounded-full bg-gray-200 shrink-0" />
                 <div className="bg-gray-100 rounded-2xl rounded-tl-none p-4 text-sm" style={{ color: tokens.foreground }}>
                   How does the authentication flow work in this project?
                 </div>
               </div>
               <div className="flex gap-3 flex-row-reverse">
                 <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: tokens.accent }}>
                    <div className="w-3 h-3 rounded-full bg-white" />
                 </div>
                 <div className="rounded-2xl rounded-tr-none p-4 text-sm" style={{ backgroundColor: tokens.foreground, color: tokens.background }}>
                   The authentication flow is handled in <code>src/auth/jwt.ts</code>. When a user logs in, the <code>generateToken</code> function creates a signed JWT, which is then verified in the middleware found in <code>src/middleware/auth.ts</code>.
                 </div>
               </div>
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
      <div className="max-w-5xl mx-auto px-6">
        <FadeUp>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 tracking-tight" style={{ color: tokens.foreground }}>Simple pricing.</h2>
            <p className="text-xl font-serif" style={{ color: tokens.mutedForeground }}>Start for free, upgrade when you need more power.</p>
          </div>
        </FadeUp>
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRICING_TIERS.map(tier => (
              <motion.div
                key={tier.name}
                variants={staggerItem}
                className="p-8 rounded-3xl border flex flex-col"
                style={{
                  borderColor: tier.highlighted ? tokens.foreground : tokens.border,
                  backgroundColor: tier.highlighted ? tokens.foreground : tokens.backgroundAlt,
                  color: tier.highlighted ? tokens.background : tokens.foreground
                }}
              >
                <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
                <div className="mb-4 flex items-baseline gap-1">
                  <span className="text-4xl font-bold tracking-tight">{tier.price}</span>
                  <span className="text-sm opacity-70">/ {tier.period}</span>
                </div>
                <p className="text-sm mb-8 opacity-80">{tier.description}</p>
                <ul className="space-y-4 mb-8 flex-1">
                  {tier.features.map(f => (
                    <li key={f} className="flex items-center gap-3 text-sm font-medium">
                      <Check className="h-4 w-4 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 rounded-full font-medium"
                  style={tier.highlighted
                    ? { backgroundColor: tokens.background, color: tokens.foreground }
                    : { backgroundColor: tokens.foreground, color: tokens.background }
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
      <div className="max-w-5xl mx-auto px-6">
        <FadeUp>
          <div className="text-center mb-16">
             <h2 className="text-4xl font-bold mb-4 tracking-tight" style={{ color: tokens.foreground }}>Loved by developers.</h2>
          </div>
        </FadeUp>
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map(t => (
              <motion.div
                key={t.name}
                variants={staggerItem}
                className="p-8 rounded-2xl"
                style={{ backgroundColor: tokens.background }}
              >
                <div className="flex mb-6">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" style={{ color: tokens.accent }} />
                  ))}
                </div>
                <p className="text-base font-serif leading-relaxed mb-6 italic" style={{ color: tokens.mutedForeground }}>"{t.text}"</p>
                <div>
                  <p className="font-bold text-sm" style={{ color: tokens.foreground }}>{t.name}</p>
                  <p className="text-sm" style={{ color: tokens.mutedForeground }}>{t.role}, {t.company}</p>
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
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight" style={{ color: tokens.foreground }}>Frequently Asked Questions</h2>
          </div>
        </FadeUp>
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, i) => (
            <div key={i} className="border-b" style={{ borderColor: tokens.border }}>
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between py-6 text-left"
              >
                <span className="font-bold text-lg" style={{ color: tokens.foreground }}>{item.q}</span>
                <motion.span animate={{ rotate: openIndex === i ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown className="h-5 w-5" style={{ color: tokens.mutedForeground }} />
                </motion.span>
              </button>
              <motion.div
                initial={false}
                animate={{ height: openIndex === i ? 'auto' : 0, opacity: openIndex === i ? 1 : 0 }}
                transition={{ duration: 0.2 }}
                style={{ overflow: 'hidden' }}
              >
                <p className="pb-6 text-base font-serif leading-relaxed" style={{ color: tokens.mutedForeground }}>
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
      <div className="max-w-xl mx-auto px-6 text-center">
        <FadeUp>
          <h2 className="text-3xl font-bold mb-4 tracking-tight" style={{ color: tokens.foreground }}>Get updates.</h2>
          <p className="text-lg font-serif mb-8" style={{ color: tokens.mutedForeground }}>
            Subscribe to our newsletter for product updates and tips.
          </p>
          <form className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Email address"
              className="flex-1 px-4 py-3 rounded-full border bg-transparent focus:outline-none"
              style={{ borderColor: tokens.border, color: tokens.foreground }}
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 rounded-full font-medium"
              style={{ backgroundColor: tokens.foreground, color: tokens.background }}
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
    Product: ['Download', 'Pricing', 'Changelog', 'Docs'],
    Company: ['About', 'Careers', 'Blog', 'Contact'],
    Legal: ['Privacy', 'Terms', 'Security'],
  }

  return (
    <footer className="py-16 border-t" style={{ borderColor: tokens.border, backgroundColor: tokens.background }}>
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 font-bold mb-4 text-xl" style={{ color: tokens.foreground }}>
              <div className="w-4 h-4 rounded-full bg-[#f54e00]" />
              {PRODUCT_NAME}
            </div>
          </div>
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <p className="font-bold mb-4" style={{ color: tokens.foreground }}>{group}</p>
              <ul className="space-y-3">
                {items.map(item => (
                  <li key={item}>
                    <a href="#" className="text-sm hover:opacity-70 font-medium transition-opacity" style={{ color: tokens.mutedForeground }}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm font-medium" style={{ color: tokens.mutedForeground }}>
          <p>© 2026 {PRODUCT_NAME} Inc.</p>
          <a href="/" className="hover:opacity-70 transition-opacity">← All styles</a>
        </div>
      </div>
    </footer>
  )
}

export default function StylePage() {
  return (
    <div className={`${jetbrainsMono.variable} ${ptSerif.variable} font-sans`} style={{ backgroundColor: tokens.background }}>
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
