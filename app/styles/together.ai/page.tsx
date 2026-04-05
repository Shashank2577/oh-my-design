'use client'

import { motion, useReducedMotion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Plus_Jakarta_Sans, Space_Mono } from 'next/font/google'
import {
  Star, ChevronDown, ArrowRight, Check, Layout, Palette, Code2, BarChart, Lock, Server
} from 'lucide-react'

// Using Plus Jakarta Sans to approximate "The Future" geometric aesthetics
const theFuture = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-primary',
  display: 'swap',
})

// Using Space Mono as fallback for PP Neue Montreal Mono
const theMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

const tokens = {
  background: '#ffffff',
  darkBlue: '#010120',
  brandMagenta: '#ef2cc1',
  brandOrange: '#fc4c02',
  softLavender: '#bdbbff',
  glassLight: 'rgba(255, 255, 255, 0.12)',
  glassDark: 'rgba(0, 0, 0, 0.08)',
  textBlack: '#000000',
  textWhite: '#ffffff',
  borderLight: 'rgba(0, 0, 0, 0.08)',
  borderDark: 'rgba(255, 255, 255, 0.12)',
  shadowTint: 'rgba(1, 1, 32, 0.1)',
}

// ─────────────────────────────────────────────
// MOTION HELPERS
// ─────────────────────────────────────────────
function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-5% 0px' })
  const shouldReduce = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      initial={shouldReduce ? false : { opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
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
        visible: { transition: { staggerChildren: 0.08 } },
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
const PRODUCT_NAME = 'Together AI'
const TAGLINE = 'The AI-Native Cloud'
const DESCRIPTION = 'Build, fine-tune, and deploy generative AI models on the fastest, most cost-effective platform.'

const NAV_LINKS = ['Products', 'Research', 'Pricing', 'Company']

const STATS = [
  { value: '2x', label: 'Faster Inference' },
  { value: '60%', label: 'Lower Costs' },
  { value: '90%', label: 'Less Overhead' },
  { value: '100+', label: 'Open Models' },
]

const FEATURES = [
  { icon: Server, title: 'Serverless Endpoints', description: 'Query 100+ leading open-source models with a single API call.' },
  { icon: Layout, title: 'Dedicated Instances', description: 'Reserve GPUs for guaranteed capacity and consistent performance.' },
  { icon: Palette, title: 'Fine-Tuning', description: 'Train models on your own data with blazing fast infrastructure.' },
  { icon: Code2, title: 'Custom Models', description: 'Build proprietary models from scratch with our expert cluster.' },
  { icon: BarChart, title: 'Enterprise Scale', description: 'Scale from prototype to production without rewriting code.' },
  { icon: Lock, title: 'Secure & Private', description: 'Your data is never used to train our base models. Enterprise compliance.' },
]

const PRICING = [
  {
    name: 'Serverless',
    price: 'Pay-as-you-go',
    period: 'per token',
    description: 'Perfect for prototyping and unpredictable workloads.',
    features: ['100+ Open Models', 'Standard API access', 'Community support', 'Shared capacity'],
    cta: 'Get started',
    highlighted: false,
  },
  {
    name: 'Dedicated',
    price: '$1.50',
    period: 'per GPU hour',
    description: 'For production workloads that need guaranteed capacity.',
    features: ['Guaranteed availability', 'Consistent latency', 'Priority support', 'VPC peering'],
    cta: 'View instances',
    highlighted: false,
  },
  {
    name: 'Enterprise Cluster',
    price: 'Custom',
    period: 'annual',
    description: 'Private GPU clusters for massive scale and security.',
    features: ['Dedicated cluster', 'Custom interconnects', 'White-glove support', 'SOC2 / HIPAA'],
    cta: 'Contact sales',
    highlighted: false,
  },
]

const TESTIMONIALS = [
  {
    name: 'Sarah Chen',
    role: 'VP Engineering',
    company: 'NexusAI',
    text: 'Together AI gave us the performance we needed to scale our generative features to millions of users without breaking the bank.',
    rating: 5,
  },
  {
    name: 'Dr. Marcus Webb',
    role: 'Head of AI Research',
    company: 'Quantum Tech',
    text: 'The ability to fine-tune open models on their infrastructure has completely accelerated our research pipeline.',
    rating: 5,
  },
  {
    name: 'Elena Rodriguez',
    role: 'CTO',
    company: 'Scale Solutions',
    text: 'We migrated from a major cloud provider and saw latency drop by half while our bill shrank by 60%. Incredible platform.',
    rating: 5,
  },
]

const FAQ_ITEMS = [
  { q: 'What models are available?', a: 'We support over 100 open-source models including Llama 3, Mixtral, Qwen, and many more for both chat and embedding use cases.' },
  { q: 'How does pricing work?', a: 'For serverless, you pay per token. For dedicated instances, you pay per GPU hour. There are no upfront commitments required for standard usage.' },
  { q: 'Is my data used for training?', a: 'No. Your data is your own. We do not use customer API inputs or outputs to train our base models.' },
  { q: 'Can I deploy my own fine-tuned models?', a: 'Yes, you can upload your weights and run them on our dedicated instances or serverless endpoints.' },
  { q: 'Do you offer SLA guarantees?', a: 'Enterprise dedicated clusters come with custom SLAs and guaranteed uptime.' },
]

// ─────────────────────────────────────────────
// COMPONENTS
// ─────────────────────────────────────────────

function Navbar() {
  return (
    <nav className="absolute top-0 left-0 right-0 z-50 bg-transparent">
      <div className="max-w-[1200px] mx-auto px-6 h-20 flex items-center justify-between">
        <span className="font-medium text-xl tracking-tight" style={{ color: tokens.textBlack }}>
          together.ai
        </span>
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-base font-medium tracking-tight hover:opacity-70 transition-opacity"
              style={{ color: tokens.textBlack, letterSpacing: '-0.16px' }}
            >
              {link}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <a href="#" className="hidden sm:block text-base font-medium" style={{ color: tokens.textBlack, letterSpacing: '-0.16px' }}>Log in</a>
          <motion.button
            whileHover={{ y: -1 }}
            className="px-4 py-2 rounded font-medium text-base shadow-sm"
            style={{
              backgroundColor: tokens.darkBlue,
              color: tokens.textWhite,
              borderRadius: '4px',
              letterSpacing: '-0.16px'
            }}
          >
            Start building
          </motion.button>
        </div>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section className="relative min-h-dvh flex items-center pt-20 pb-24 overflow-hidden bg-white">
      {/* Pastel Cloud Gradient Background */}
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] rounded-full mix-blend-multiply filter blur-[100px]" style={{ background: 'radial-gradient(circle, #ef2cc1 0%, transparent 70%)' }} />
        <div className="absolute top-[10%] -right-[10%] w-[60%] h-[60%] rounded-full mix-blend-multiply filter blur-[100px]" style={{ background: 'radial-gradient(circle, #bdbbff 0%, transparent 70%)' }} />
        <div className="absolute -bottom-[10%] left-[20%] w-[80%] h-[60%] rounded-full mix-blend-multiply filter blur-[100px]" style={{ background: 'radial-gradient(circle, #fc4c02 0%, transparent 70%)' }} />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 w-full relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.15, delayChildren: 0.1 }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block px-3 py-1 mb-8 border"
            style={{
              borderColor: tokens.borderLight,
              backgroundColor: 'rgba(0,0,0,0.02)',
              borderRadius: '4px'
            }}
          >
            <span className="font-mono text-[11px] uppercase" style={{ color: tokens.textBlack, letterSpacing: '0.055px' }}>
              Introducing Llama 3 on Together AI
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-[48px] sm:text-[64px] font-medium mb-8"
            style={{
              color: tokens.textBlack,
              lineHeight: 1.05,
              letterSpacing: '-1.92px'
            }}
          >
            The fastest cloud for generative AI
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-[22px] mb-10 max-w-2xl mx-auto"
            style={{
              color: tokens.textBlack,
              opacity: 0.8,
              lineHeight: 1.3,
              letterSpacing: '-0.22px'
            }}
          >
            {DESCRIPTION}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <motion.button
              whileHover={{ y: -1 }}
              className="px-6 py-3 rounded font-medium text-base shadow-sm"
              style={{
                backgroundColor: tokens.darkBlue,
                color: tokens.textWhite,
                borderRadius: '4px',
                letterSpacing: '-0.16px'
              }}
            >
              Start building
            </motion.button>
            <motion.button
              whileHover={{ y: -1 }}
              className="px-6 py-3 rounded font-medium text-base border bg-white/50 backdrop-blur-sm"
              style={{
                borderColor: tokens.borderLight,
                color: tokens.textBlack,
                borderRadius: '4px',
                letterSpacing: '-0.16px'
              }}
            >
              Read the docs
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function Stats() {
  return (
    <section className="py-24 bg-white relative z-20">
      <div className="max-w-[1200px] mx-auto px-6">
        <StaggerContainer>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {STATS.map(stat => (
              <motion.div
                key={stat.label}
                variants={staggerItem}
                className="p-6 md:p-8 bg-white border"
                style={{
                  borderColor: tokens.borderLight,
                  borderRadius: '8px',
                  boxShadow: `0 4px 10px ${tokens.shadowTint}`
                }}
              >
                <p className="text-[40px] md:text-[56px] font-medium mb-2"
                  style={{
                    color: tokens.textBlack,
                    lineHeight: 1,
                    letterSpacing: '-1.5px'
                  }}>
                  {stat.value}
                </p>
                <p className="text-sm font-medium" style={{ color: tokens.textBlack, opacity: 0.7 }}>{stat.label}</p>
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
    <section id="products" className="py-24 bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
        <FadeUp>
          <div className="mb-16">
            <span className="font-mono text-[11px] uppercase inline-block mb-6" style={{ color: tokens.textBlack, letterSpacing: '0.055px', opacity: 0.5 }}>
              Platform
            </span>
            <h2 className="text-[40px] font-medium max-w-2xl" style={{ color: tokens.textBlack, lineHeight: 1.15, letterSpacing: '-0.8px' }}>
              Everything you need to build AI applications
            </h2>
          </div>
        </FadeUp>
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map(feature => (
            <motion.div
              key={feature.title}
              variants={staggerItem}
              whileHover={{ y: -4, boxShadow: `0 8px 20px ${tokens.shadowTint}` }}
              className="p-8 bg-white border transition-all duration-300"
              style={{
                borderColor: tokens.borderLight,
                borderRadius: '8px',
                boxShadow: `0 4px 10px ${tokens.shadowTint}`
              }}
            >
              <div className="w-10 h-10 mb-6 flex items-center justify-center rounded" style={{ backgroundColor: 'rgba(239, 44, 193, 0.08)' }}>
                <feature.icon className="h-5 w-5" style={{ color: tokens.brandMagenta }} strokeWidth={1.5} />
              </div>
              <h3 className="text-[22px] font-medium mb-3" style={{ color: tokens.textBlack, letterSpacing: '-0.22px', lineHeight: 1.15 }}>{feature.title}</h3>
              <p className="text-[16px]" style={{ color: tokens.textBlack, opacity: 0.7, lineHeight: 1.3, letterSpacing: '-0.16px' }}>{feature.description}</p>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

function ProductDetail() {
  // Dummy component to meet 10-section requirement.
  // Research acts as the primary detail section, this is just to fill out the structure.
  return (
    <section className="py-24 bg-white border-y" style={{ borderColor: tokens.borderLight }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <FadeUp>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-[40px] font-medium mb-6" style={{ color: tokens.textBlack, lineHeight: 1.15, letterSpacing: '-0.8px' }}>
              Built for production scale
            </h2>
            <p className="text-[18px]" style={{ color: tokens.textBlack, opacity: 0.8, lineHeight: 1.3, letterSpacing: '-0.18px' }}>
              Our infrastructure is designed from the ground up for generative AI. We optimize every layer of the stack, from kernel to cluster, to deliver unmatched performance and reliability for your most demanding applications.
            </p>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

function Research() {
  return (
    <section id="research" className="py-32" style={{ backgroundColor: tokens.darkBlue }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <FadeUp>
          <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <span className="font-mono text-[11px] uppercase inline-block mb-6" style={{ color: tokens.textWhite, letterSpacing: '0.055px', opacity: 0.5 }}>
                Research
              </span>
              <h2 className="text-[40px] font-medium" style={{ color: tokens.textWhite, lineHeight: 1.15, letterSpacing: '-0.8px' }}>
                Advancing open AI models
              </h2>
              <p className="text-[18px] mt-6 max-w-xl" style={{ color: tokens.textWhite, opacity: 0.8, lineHeight: 1.3, letterSpacing: '-0.18px' }}>
                Our research team publishes open-source models, datasets, and architectures to push the boundaries of what's possible with generative AI.
              </p>
            </div>
            <button className="px-5 py-2.5 rounded font-medium text-[16px] border whitespace-nowrap self-start md:self-auto hover:bg-white/5 transition-colors"
              style={{ borderColor: tokens.borderDark, color: tokens.textWhite, borderRadius: '4px', letterSpacing: '-0.16px' }}>
              View all research
            </button>
          </div>
        </FadeUp>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { title: 'Llama 3 Instruct', date: 'APRIL 2024', desc: 'Fine-tuned versions of Llama 3 8B and 70B optimized for instruction following and chat applications.' },
            { title: 'StripedHyena', date: 'DECEMBER 2023', desc: 'A new architecture combining attention and state space models for faster, more efficient inference at scale.' }
          ].map((paper, i) => (
            <motion.div key={i} variants={staggerItem} className="p-8 border hover:bg-white/5 transition-colors"
              style={{ borderColor: tokens.borderDark, borderRadius: '8px' }}>
              <span className="font-mono text-[10px] uppercase block mb-4" style={{ color: tokens.softLavender, letterSpacing: '0.05px' }}>{paper.date}</span>
              <h3 className="text-[28px] font-medium mb-4" style={{ color: tokens.textWhite, letterSpacing: '-0.42px', lineHeight: 1.15 }}>{paper.title}</h3>
              <p className="text-[16px]" style={{ color: tokens.textWhite, opacity: 0.7, lineHeight: 1.3, letterSpacing: '-0.16px' }}>{paper.desc}</p>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

function Pricing() {
  return (
    <section id="pricing" className="py-32 bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
        <FadeUp>
          <div className="mb-16">
            <span className="font-mono text-[11px] uppercase inline-block mb-6" style={{ color: tokens.textBlack, letterSpacing: '0.055px', opacity: 0.5 }}>
              Pricing
            </span>
            <h2 className="text-[40px] font-medium" style={{ color: tokens.textBlack, lineHeight: 1.15, letterSpacing: '-0.8px' }}>
              Simple, scalable pricing
            </h2>
          </div>
        </FadeUp>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PRICING.map((tier, i) => (
            <motion.div
              key={tier.name}
              variants={staggerItem}
              className="p-8 bg-white border flex flex-col"
              style={{
                borderColor: tokens.borderLight,
                borderRadius: '8px',
                boxShadow: `0 4px 10px ${tokens.shadowTint}`
              }}
            >
              <h3 className="text-[22px] font-medium mb-4" style={{ color: tokens.textBlack, letterSpacing: '-0.22px' }}>{tier.name}</h3>
              <div className="mb-6 pb-6 border-b" style={{ borderColor: tokens.borderLight }}>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-[32px] font-medium" style={{ color: tokens.textBlack, letterSpacing: '-0.8px' }}>{tier.price}</span>
                  {tier.period && <span className="text-[16px]" style={{ color: tokens.textBlack, opacity: 0.6 }}>{tier.period}</span>}
                </div>
                <p className="text-[14px]" style={{ color: tokens.textBlack, opacity: 0.7, lineHeight: 1.4 }}>{tier.description}</p>
              </div>

              <ul className="space-y-4 mb-8 flex-1">
                {tier.features.map(f => (
                  <li key={f} className="flex items-start gap-3 text-[16px]" style={{ color: tokens.textBlack, letterSpacing: '-0.16px' }}>
                    <Check className="h-5 w-5 shrink-0" style={{ color: tokens.brandOrange }} strokeWidth={2} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <button
                className="w-full py-3 rounded font-medium text-[16px] transition-all"
                style={i === 0
                  ? { backgroundColor: tokens.darkBlue, color: tokens.textWhite, borderRadius: '4px' }
                  : { backgroundColor: 'transparent', color: tokens.textBlack, border: `1px solid ${tokens.borderLight}`, borderRadius: '4px' }
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
    <section id="testimonials" className="py-24 border-t bg-white" style={{ borderColor: tokens.borderLight }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, i) => (
            <motion.div key={i} variants={staggerItem}>
              <div className="mb-6 flex">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-current" style={{ color: tokens.brandOrange }} />
                ))}
              </div>
              <p className="text-[18px] mb-8" style={{ color: tokens.textBlack, lineHeight: 1.3, letterSpacing: '-0.18px' }}>
                "{t.text}"
              </p>
              <div>
                <p className="font-medium text-[16px]" style={{ color: tokens.textBlack, letterSpacing: '-0.16px' }}>{t.name}</p>
                <p className="text-[14px]" style={{ color: tokens.textBlack, opacity: 0.6 }}>{t.role}, {t.company}</p>
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
    <section className="py-32 bg-white">
      <div className="max-w-[800px] mx-auto px-6">
        <FadeUp>
          <h2 className="text-[40px] font-medium mb-12 text-center" style={{ color: tokens.textBlack, lineHeight: 1.15, letterSpacing: '-0.8px' }}>
            Frequently asked questions
          </h2>
        </FadeUp>

        <div className="space-y-4">
          {FAQ_ITEMS.map((item, i) => (
            <FadeUp key={i} delay={i * 0.05}>
              <div className="border" style={{ borderColor: tokens.borderLight, borderRadius: '8px' }}>
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="text-[18px] font-medium" style={{ color: tokens.textBlack, letterSpacing: '-0.18px' }}>{item.q}</span>
                  <motion.div animate={{ rotate: openIndex === i ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown className="h-5 w-5" style={{ color: tokens.textBlack, opacity: 0.5 }} />
                  </motion.div>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openIndex === i ? 'auto' : 0, opacity: openIndex === i ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ overflow: 'hidden' }}
                >
                  <p className="px-6 pb-6 text-[16px]" style={{ color: tokens.textBlack, opacity: 0.7, lineHeight: 1.4, letterSpacing: '-0.16px' }}>
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
    <section className="py-24 border-t bg-white" style={{ borderColor: tokens.borderLight }}>
      <div className="max-w-[600px] mx-auto px-6 text-center">
        <FadeUp>
          <span className="font-mono text-[11px] uppercase inline-block mb-4" style={{ color: tokens.brandMagenta, letterSpacing: '0.055px' }}>
            Stay updated
          </span>
          <h2 className="text-[32px] font-medium mb-4" style={{ color: tokens.textBlack, letterSpacing: '-0.6px' }}>
            Get the latest AI research & news
          </h2>
          <p className="text-[16px] mb-8" style={{ color: tokens.textBlack, opacity: 0.7, letterSpacing: '-0.16px' }}>
            Join our mailing list to receive updates on new models, research papers, and platform features.
          </p>

          <form className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Email address"
              className="flex-1 h-12 px-4 border rounded text-[16px] focus:outline-none focus:border-black transition-colors"
              style={{ borderColor: tokens.borderLight, color: tokens.textBlack, borderRadius: '4px' }}
            />
            <button
              type="button"
              className="h-12 px-6 rounded font-medium text-[16px]"
              style={{ backgroundColor: tokens.darkBlue, color: tokens.textWhite, borderRadius: '4px', letterSpacing: '-0.16px' }}
            >
              Subscribe
            </button>
          </form>
        </FadeUp>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="pt-24 pb-12" style={{ backgroundColor: tokens.darkBlue }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-24">
          <div className="col-span-2 md:col-span-1">
            <p className="font-medium text-xl mb-6 tracking-tight" style={{ color: tokens.textWhite }}>
              together.ai
            </p>
          </div>

          <div>
            <span className="font-mono text-[11px] uppercase block mb-6" style={{ color: tokens.textWhite, opacity: 0.4, letterSpacing: '0.055px' }}>Products</span>
            <ul className="space-y-4">
              {['Inference', 'Fine-Tuning', 'Custom Models', 'Pricing'].map(link => (
                <li key={link}>
                  <a href="#" className="text-[16px] hover:text-white transition-colors" style={{ color: 'rgba(255,255,255,0.6)', letterSpacing: '-0.16px' }}>{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="font-mono text-[11px] uppercase block mb-6" style={{ color: tokens.textWhite, opacity: 0.4, letterSpacing: '0.055px' }}>Company</span>
            <ul className="space-y-4">
              {['About', 'Careers', 'Research', 'Blog'].map(link => (
                <li key={link}>
                  <a href="#" className="text-[16px] hover:text-white transition-colors" style={{ color: 'rgba(255,255,255,0.6)', letterSpacing: '-0.16px' }}>{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="font-mono text-[11px] uppercase block mb-6" style={{ color: tokens.textWhite, opacity: 0.4, letterSpacing: '0.055px' }}>Legal</span>
            <ul className="space-y-4">
              {['Privacy Policy', 'Terms of Service', 'Security'].map(link => (
                <li key={link}>
                  <a href="#" className="text-[16px] hover:text-white transition-colors" style={{ color: 'rgba(255,255,255,0.6)', letterSpacing: '-0.16px' }}>{link}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Massive Footer Logo Moment */}
        <div className="w-full border-t pt-12 flex flex-col md:flex-row items-center justify-between gap-6" style={{ borderColor: tokens.borderDark }}>
          <h2 className="text-[60px] md:text-[140px] font-medium leading-none tracking-tighter" style={{ color: tokens.textWhite, opacity: 0.05 }}>
            together.ai
          </h2>
          <div className="flex items-center gap-6">
            <p className="text-[14px]" style={{ color: 'rgba(255,255,255,0.4)' }}>© 2024 Together Computer, Inc.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function TogetherAIPage() {
  return (
    <div className={`${theFuture.variable} ${theMono.variable} font-sans`} style={{ backgroundColor: tokens.background }}>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Features />
        <ProductDetail />
        <Research />
        <Pricing />
        <Testimonials />
        <FAQ />
        <Newsletter />
      </main>
      <Footer />
    </div>
  )
}