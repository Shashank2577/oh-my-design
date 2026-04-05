'use client'

import { motion, useReducedMotion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Geist, Geist_Mono } from 'next/font/google'
import {
  Star, ChevronDown, ArrowRight, Check, Triangle, LayoutTemplate, Layers, GitBranch,
  TerminalSquare, Workflow, Zap, Box, BarChart3, Fingerprint, Lock, Shield, Cpu, RefreshCw
} from 'lucide-react'

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
  display: 'swap',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
})

const tokens = {
  vercelBlack: '#171717',
  pureWhite: '#ffffff',
  trueBlack: '#000000',
  shipRed: '#ff5b4f',
  previewPink: '#de1d8d',
  developBlue: '#0a72ef',
  linkBlue: '#0072f5',
  focusBlue: 'hsla(212, 100%, 48%, 1)',
  gray900: '#171717',
  gray600: '#4d4d4d',
  gray500: '#666666',
  gray400: '#808080',
  gray100: '#ebebeb',
  gray50: '#fafafa',
  badgeBg: '#ebf5ff',
  badgeText: '#0068d6',

  // Signature Vercel shadow-as-border
  borderShadow: '0px 0px 0px 1px rgba(0,0,0,0.08)',
  lightRing: '0px 0px 0px 1px rgb(235, 235, 235)',
  subtleCardShadow: '0px 0px 0px 1px rgba(0,0,0,0.08), 0px 2px 2px rgba(0,0,0,0.04)',
  fullCardShadow: '0px 0px 0px 1px rgba(0,0,0,0.08), 0px 2px 2px rgba(0,0,0,0.04), 0px 8px 8px -8px rgba(0,0,0,0.04), inset 0px 0px 0px 1px #fafafa',
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
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
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
        visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const staggerItem: import('framer-motion').Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────
const PRODUCT_NAME = 'Vercel'
const TAGLINE = 'Your complete platform for the web.'
const DESCRIPTION = 'Vercel provides the developer tools and cloud infrastructure to build, scale, and secure a faster, more personalized web.'

const NAV_LINKS = ['Products', 'Solutions', 'Resources', 'Enterprise', 'Docs', 'Pricing']

const STATS = [
  { value: '99.99%', label: 'Uptime SLA' },
  { value: '10M+', label: 'Deployments/week' },
  { value: '300+', label: 'Global edge regions' },
  { value: '10x', label: 'Faster build times' },
]

const WORKFLOW = [
  { step: 'Develop', color: tokens.developBlue, title: 'Build with the tools you love.', desc: 'Vercel integrates with your favorite frameworks and git providers. Develop locally and push to instantly deploy.' },
  { step: 'Preview', color: tokens.previewPink, title: 'Iterate with your team.', desc: 'Every push gets a live preview URL. Gather feedback, run tests, and collaborate seamlessly before shipping.' },
  { step: 'Ship', color: tokens.shipRed, title: 'Deploy to the edge.', desc: 'Merge to main and your site goes live globally in seconds. Scale automatically without managing infrastructure.' }
]

// Hack to get Globe icon without extra import
const Globe = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><path d="M2 12h20"/></svg>;

const FEATURES = [
  { icon: Zap, title: 'Next.js Native', description: 'Built by the creators of Next.js, delivering the absolute best performance and developer experience for the framework.' },
  { icon: Globe, title: 'Edge Network', description: 'Serve content closer to your users with our global edge network, ensuring sub-millisecond response times worldwide.' },
  { icon: Shield, title: 'Enterprise Security', description: 'SOC2 Type II, HIPAA, and GDPR compliant infrastructure with DDoS protection and web application firewall built-in.' },
  { icon: Cpu, title: 'Serverless Functions', description: 'Run backend code securely without managing servers. Scale instantly from zero to billions of requests.' },
  { icon: BarChart3, title: 'Web Analytics', description: 'Privacy-friendly, real-time analytics to understand your audience and optimize performance metrics.' },
  { icon: RefreshCw, title: 'Instant Rollbacks', description: 'Revert to any previous deployment instantly if something goes wrong in production. Zero downtime.' },
]


const PRICING = [
  {
    name: 'Hobby',
    price: '$0',
    period: 'forever',
    description: 'For personal projects and hobby sites.',
    features: ['Deploy from CLI or personal git integrations', 'Built-in CI/CD', 'Automatic HTTPS/SSL', 'Previews for every push'],
    cta: 'Deploy',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$20',
    period: 'per user / month',
    description: 'For teams collaborating on multiple projects.',
    features: ['Shared team workspace', 'Concurrent builds', 'Password protection', 'Advanced analytics', 'Email support'],
    cta: 'Start Free Trial',
    highlighted: false,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For organizations with advanced security and scale.',
    features: ['SAML SSO', 'SOC2 / HIPAA compliance', 'Dedicated success manager', '99.99% uptime SLA', 'Custom WAF rules'],
    cta: 'Contact Sales',
    highlighted: false,
  },
]

const TESTIMONIALS = [
  {
    name: 'Guillermo Rauch',
    role: 'CEO',
    company: 'Vercel', // Using internal for aesthetic reasons
    text: 'Vercel enables developers to build and deploy faster than ever before, removing the friction between an idea and a global application.',
    rating: 5,
  },
  {
    name: 'Jane Doe',
    role: 'VP Engineering',
    company: 'TechCorp',
    text: 'Moving to Vercel cut our deployment times by 80% and drastically improved our core web vitals. It just works.',
    rating: 5,
  },
  {
    name: 'John Smith',
    role: 'Lead Architect',
    company: 'Startup Inc',
    text: 'The preview deployments have completely transformed how our product, design, and engineering teams collaborate.',
    rating: 5,
  },
]

const FAQ_ITEMS = [
  { q: 'What frameworks do you support?', a: 'While we are the creators of Next.js, Vercel provides first-class support for over 35 frontend frameworks including Svelte, Nuxt, Vue, React, Angular, and more.' },
  { q: 'How does billing work for bandwidth?', a: 'Every plan includes a generous amount of bandwidth. If you exceed this limit, you are charged a low flat rate per GB. We never cut off your site for a spike in traffic.' },
  { q: 'Can I host my database on Vercel?', a: 'Vercel is primarily a frontend cloud. We offer Vercel Postgres, KV, and Edge Config, and we integrate seamlessly with major database providers like Supabase, PlanetScale, and Neon.' },
  { q: 'What is the Edge Network?', a: 'Our global Edge Network automatically caches your static assets and serverless functions close to your users, ensuring sub-millisecond response times regardless of their location.' },
  { q: 'Do you offer SLAs?', a: 'Yes, our Enterprise plan includes a 99.99% uptime SLA with financial backing.' },
]

// ─────────────────────────────────────────────
// COMPONENTS
// ─────────────────────────────────────────────

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md" style={{ boxShadow: tokens.borderShadow }}>
      <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          {/* Vercel Logo (Triangle) */}
          <div className="flex items-center justify-center">
            <svg height="24" viewBox="0 0 75 65" fill="#171717"><path d="M37.59.25l36.95 64H.64l36.95-64z"></path></svg>
          </div>

          <div className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(' ', '-')}`}
                className="text-[14px] transition-colors hover:text-black"
                style={{ color: tokens.gray600, fontWeight: 500 }}
              >
                {link}
              </a>
            ))}
          </div>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <a href="#" className="text-[14px] hover:text-black transition-colors" style={{ color: tokens.gray600, fontWeight: 500 }}>Log In</a>
          <a href="#" className="text-[14px] hover:text-black transition-colors" style={{ color: tokens.gray600, fontWeight: 500 }}>Contact Sales</a>
          <button
            className="px-4 py-1.5 rounded-[6px] text-[14px] transition-all"
            style={{
              backgroundColor: tokens.vercelBlack,
              color: tokens.pureWhite,
              fontWeight: 500,
            }}
          >
            Sign Up
          </button>
        </div>

        <button
          className="md:hidden w-8 h-8 rounded-full border flex items-center justify-center"
          style={{ borderColor: tokens.gray100 }}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <span className="text-sm">✕</span> : <span className="text-sm">☰</span>}
        </button>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section className="pt-32 pb-24 bg-white relative overflow-hidden">
      {/* Subtle pastel gradient wash in background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-30 pointer-events-none"
           style={{ background: 'radial-gradient(ellipse at top, rgba(222, 29, 141, 0.15), rgba(10, 114, 239, 0.15), transparent 70%)' }} />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-[800px] mx-auto text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center px-3 py-1 mb-8 rounded-full"
            style={{ backgroundColor: tokens.badgeBg, color: tokens.badgeText, boxShadow: tokens.borderShadow }}
          >
            <span className="text-[12px]" style={{ fontWeight: 500 }}>Vercel Ship is here. Watch the keynote →</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-[48px] md:text-[72px] lg:text-[96px] mb-8"
            style={{
              color: tokens.vercelBlack,
              fontWeight: 600,
              lineHeight: 1,
              letterSpacing: '-0.06em', // Equivalent to approx -2.88px at display sizes
            }}
          >
            Your complete platform for the web.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-[20px] md:text-[24px] mb-12 max-w-[640px] mx-auto"
            style={{
              color: tokens.gray600,
              lineHeight: 1.6,
              fontWeight: 400
            }}
          >
            {DESCRIPTION}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              className="w-full sm:w-auto px-6 py-3 rounded-[6px] text-[16px] transition-colors"
              style={{
                backgroundColor: tokens.vercelBlack,
                color: tokens.pureWhite,
                fontWeight: 500,
              }}
            >
              Start Deploying
            </button>
            <button
              className="w-full sm:w-auto px-6 py-3 rounded-[6px] text-[16px] transition-colors hover:bg-gray-50"
              style={{
                backgroundColor: tokens.pureWhite,
                color: tokens.vercelBlack,
                fontWeight: 500,
                boxShadow: tokens.borderShadow
              }}
            >
              Get a Demo
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function WorkflowSection() {
  return (
    <section className="py-32 bg-white border-t" style={{ borderColor: tokens.gray100 }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <FadeUp>
          <div className="text-center mb-24">
            <h2 className="text-[32px] md:text-[40px] mb-6" style={{ color: tokens.vercelBlack, fontWeight: 600, letterSpacing: '-0.04em', lineHeight: 1.2 }}>
              Explore the Vercel way
            </h2>
          </div>
        </FadeUp>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {WORKFLOW.map((w, i) => (
            <motion.div key={w.step} variants={staggerItem} className="relative z-10">
              <div className="mb-6 flex items-center gap-4">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: `${w.color}20`, color: w.color }}>
                  {i === 0 && <TerminalSquare size={16} />}
                  {i === 1 && <GitBranch size={16} />}
                  {i === 2 && <Layers size={16} />}
                </div>
                <span className="font-mono text-[12px] uppercase tracking-wider" style={{ color: w.color, fontWeight: 500 }}>
                  {w.step}
                </span>
              </div>
              <h3 className="text-[24px] mb-4" style={{ color: tokens.vercelBlack, fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.33 }}>
                {w.title}
              </h3>
              <p className="text-[16px]" style={{ color: tokens.gray600, lineHeight: 1.6, fontWeight: 400 }}>
                {w.desc}
              </p>
            </motion.div>
          ))}
          {/* Subtle connecting line behind items on desktop */}
          <div className="hidden md:block absolute top-[16px] left-[10%] right-[10%] h-[1px] z-0" style={{ background: `linear-gradient(to right, ${tokens.developBlue}20, ${tokens.previewPink}20, ${tokens.shipRed}20)` }} />
        </StaggerContainer>
      </div>
    </section>
  )
}

function Stats() {
  return (
    <section className="py-24 bg-white border-t" style={{ borderColor: tokens.gray100 }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map(stat => (
            <motion.div
              key={stat.label}
              variants={staggerItem}
              className="p-8 rounded-[8px] bg-white transition-shadow duration-300 hover:shadow-md"
              style={{ boxShadow: tokens.subtleCardShadow }}
            >
              <p className="text-[40px] md:text-[48px] mb-2"
                style={{
                  color: tokens.vercelBlack,
                  fontWeight: 600,
                  letterSpacing: '-0.05em',
                  lineHeight: 1
                }}>
                {stat.value}
              </p>
              <p className="text-[16px]" style={{ color: tokens.gray600, fontWeight: 400 }}>{stat.label}</p>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

function Features() {
  return (
    <section id="products" className="py-32 bg-white border-t" style={{ borderColor: tokens.gray100 }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <FadeUp>
          <div className="mb-16 max-w-[800px]">
            <h2 className="text-[32px] md:text-[40px] mb-6" style={{ color: tokens.vercelBlack, fontWeight: 600, letterSpacing: '-0.04em', lineHeight: 1.2 }}>
              Everything you need to build the best web experiences.
            </h2>
            <p className="text-[20px]" style={{ color: tokens.gray600, lineHeight: 1.6, fontWeight: 400 }}>
              Our comprehensive suite of tools helps you build, scale, and secure your applications with zero configuration.
            </p>
          </div>
        </FadeUp>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map(feature => (
            <motion.div
              key={feature.title}
              variants={staggerItem}
              className="p-8 rounded-[8px] bg-white flex flex-col transition-shadow duration-300 hover:shadow-md"
              style={{ boxShadow: tokens.subtleCardShadow }}
            >
              <div className="w-10 h-10 mb-6 flex items-center justify-center rounded-[6px]" style={{ boxShadow: tokens.lightRing }}>
                <feature.icon className="h-5 w-5" style={{ color: tokens.vercelBlack }} strokeWidth={1.5} />
              </div>
              <h3 className="text-[20px] mb-3" style={{ color: tokens.vercelBlack, fontWeight: 600, letterSpacing: '-0.02em' }}>{feature.title}</h3>
              <p className="text-[16px] flex-1" style={{ color: tokens.gray600, lineHeight: 1.6, fontWeight: 400 }}>{feature.description}</p>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

function ProductDetail() {
  return (
    <section className="py-32 bg-[#fafafa] border-y" style={{ borderColor: tokens.gray100 }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="flex-1 w-full">
            <FadeUp>
              <div className="inline-flex items-center gap-2 mb-6">
                <span className="font-mono text-[12px] uppercase tracking-wider" style={{ color: tokens.gray500, fontWeight: 500 }}>
                  Infrastructure
                </span>
              </div>
              <h2 className="text-[32px] md:text-[40px] mb-6" style={{ color: tokens.vercelBlack, fontWeight: 600, letterSpacing: '-0.04em', lineHeight: 1.2 }}>
                Global Edge Network
              </h2>
              <p className="text-[18px] mb-8" style={{ color: tokens.gray600, lineHeight: 1.6, fontWeight: 400 }}>
                Vercel's Edge Network enables you to store content and run compute in regions close to your users or your data. This ensures your site is fast, secure, and highly available everywhere in the world.
              </p>
              <ul className="space-y-4 mb-10">
                {['Sub-millisecond global routing', 'Automatic asset compression and caching', 'DDoS mitigation and web application firewall'].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[16px]" style={{ color: tokens.vercelBlack, fontWeight: 500 }}>
                    <Check className="h-5 w-5 shrink-0" style={{ color: tokens.gray400 }} strokeWidth={2} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <button
                className="px-6 py-3 rounded-[6px] text-[14px] transition-colors hover:bg-gray-50"
                style={{
                  backgroundColor: tokens.pureWhite,
                  color: tokens.vercelBlack,
                  fontWeight: 500,
                  boxShadow: tokens.borderShadow
                }}
              >
                Explore Infrastructure
              </button>
            </FadeUp>
          </div>

          <div className="flex-1 w-full">
            <FadeUp className="relative rounded-[12px] bg-white p-2" style={{ boxShadow: tokens.fullCardShadow }}>
              {/* Mock Dashboard UI */}
              <div className="w-full h-[400px] rounded-[8px] bg-[#fafafa] flex flex-col" style={{ boxShadow: tokens.borderShadow }}>
                <div className="h-12 border-b flex items-center px-4 gap-2" style={{ borderColor: tokens.gray100 }}>
                  <div className="w-3 h-3 rounded-full bg-gray-300" />
                  <div className="w-3 h-3 rounded-full bg-gray-300" />
                  <div className="w-3 h-3 rounded-full bg-gray-300" />
                  <div className="ml-4 h-6 w-64 bg-white rounded flex items-center px-2" style={{ boxShadow: tokens.borderShadow }}>
                    <span className="font-mono text-[10px] text-gray-500">https://edge-network-demo.vercel.app</span>
                  </div>
                </div>
                <div className="flex-1 p-6 flex flex-col gap-4">
                  <div className="h-8 w-32 bg-gray-200 rounded" />
                  <div className="flex gap-4">
                     <div className="h-32 flex-1 bg-white rounded" style={{ boxShadow: tokens.borderShadow }} />
                     <div className="h-32 flex-1 bg-white rounded" style={{ boxShadow: tokens.borderShadow }} />
                  </div>
                  <div className="h-40 w-full bg-white rounded mt-4" style={{ boxShadow: tokens.borderShadow }} />
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  )
}

function Pricing() {
  return (
    <section id="pricing" className="py-32 bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
        <FadeUp>
          <div className="text-center mb-16">
            <h2 className="text-[32px] md:text-[40px] mb-6" style={{ color: tokens.vercelBlack, fontWeight: 600, letterSpacing: '-0.04em', lineHeight: 1.2 }}>
              Scale your application, not your infrastructure.
            </h2>
          </div>
        </FadeUp>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PRICING.map((tier) => (
            <motion.div
              key={tier.name}
              variants={staggerItem}
              className="p-8 rounded-[8px] bg-white flex flex-col"
              style={{
                boxShadow: tier.name === 'Pro' ? tokens.fullCardShadow : tokens.subtleCardShadow
              }}
            >
              <h3 className="text-[24px] mb-2" style={{ color: tokens.vercelBlack, fontWeight: 600, letterSpacing: '-0.03em' }}>{tier.name}</h3>
              <p className="text-[14px] h-10 mb-6" style={{ color: tokens.gray600 }}>{tier.description}</p>

              <div className="mb-8 pb-8 border-b" style={{ borderColor: tokens.gray100 }}>
                <div className="flex items-baseline gap-1">
                  <span className="text-[32px]" style={{ color: tokens.vercelBlack, fontWeight: 600, letterSpacing: '-0.04em' }}>{tier.price}</span>
                  {tier.period && <span className="text-[14px]" style={{ color: tokens.gray600 }}>{tier.period}</span>}
                </div>
              </div>

              <ul className="space-y-4 mb-8 flex-1">
                {tier.features.map(f => (
                  <li key={f} className="flex items-start gap-3 text-[14px]" style={{ color: tokens.gray900 }}>
                    <Check className="h-4 w-4 shrink-0" style={{ color: tokens.gray400 }} strokeWidth={2} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <button
                className="w-full py-2.5 rounded-[6px] text-[14px] transition-colors"
                style={tier.name === 'Pro'
                  ? { backgroundColor: tokens.vercelBlack, color: tokens.pureWhite, fontWeight: 500 }
                  : { backgroundColor: tokens.pureWhite, color: tokens.vercelBlack, fontWeight: 500, boxShadow: tokens.borderShadow }
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
    <section className="py-32 bg-[#fafafa] border-y" style={{ borderColor: tokens.gray100 }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <FadeUp>
           <h2 className="text-[24px] mb-12 text-center" style={{ color: tokens.vercelBlack, fontWeight: 600, letterSpacing: '-0.03em' }}>
              Trusted by the best frontend teams
           </h2>
        </FadeUp>
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              variants={staggerItem}
              className="p-8 rounded-[8px] bg-white"
              style={{ boxShadow: tokens.subtleCardShadow }}
            >
              <div className="mb-6 flex">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-current" style={{ color: tokens.vercelBlack }} />
                ))}
              </div>
              <p className="text-[16px] mb-8" style={{ color: tokens.gray900, lineHeight: 1.6, fontWeight: 400 }}>
                "{t.text}"
              </p>
              <div>
                <p className="font-semibold text-[14px]" style={{ color: tokens.vercelBlack }}>{t.name}</p>
                <p className="text-[14px]" style={{ color: tokens.gray500 }}>{t.role}, {t.company}</p>
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
          <h2 className="text-[32px] md:text-[40px] mb-12" style={{ color: tokens.vercelBlack, fontWeight: 600, letterSpacing: '-0.04em', lineHeight: 1.2 }}>
            Frequently asked questions
          </h2>
        </FadeUp>

        <div className="space-y-4">
          {FAQ_ITEMS.map((item, i) => (
            <FadeUp key={i} delay={i * 0.05}>
              <div className="rounded-[8px] bg-white transition-all duration-200"
                   style={{ boxShadow: openIndex === i ? tokens.subtleCardShadow : tokens.borderShadow }}>
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="text-[16px]" style={{ color: tokens.vercelBlack, fontWeight: 500 }}>{item.q}</span>
                  <motion.div animate={{ rotate: openIndex === i ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown className="h-5 w-5" style={{ color: tokens.gray400 }} />
                  </motion.div>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openIndex === i ? 'auto' : 0, opacity: openIndex === i ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ overflow: 'hidden' }}
                >
                  <p className="px-6 pb-6 text-[16px]" style={{ color: tokens.gray600, lineHeight: 1.6 }}>
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
    <section className="py-32 bg-white border-t" style={{ borderColor: tokens.gray100 }}>
      <div className="max-w-[800px] mx-auto px-6 text-center">
        <FadeUp>
          <h2 className="text-[32px] md:text-[40px] mb-6" style={{ color: tokens.vercelBlack, fontWeight: 600, letterSpacing: '-0.04em', lineHeight: 1.2 }}>
            Ready to deploy?
          </h2>
          <p className="text-[18px] mb-10" style={{ color: tokens.gray600, lineHeight: 1.6 }}>
            Start building with a free account. Get access to our Edge Network, CI/CD, and more.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
             <button
              className="w-full sm:w-auto px-8 py-3 rounded-[6px] text-[16px] transition-colors"
              style={{
                backgroundColor: tokens.vercelBlack,
                color: tokens.pureWhite,
                fontWeight: 500,
              }}
            >
              Start Deploying
            </button>
            <button
              className="w-full sm:w-auto px-8 py-3 rounded-[6px] text-[16px] transition-colors hover:bg-gray-50"
              style={{
                backgroundColor: tokens.pureWhite,
                color: tokens.vercelBlack,
                fontWeight: 500,
                boxShadow: tokens.borderShadow
              }}
            >
              Contact Sales
            </button>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="pt-24 pb-12 bg-[#fafafa] border-t" style={{ borderColor: tokens.gray100 }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-24">
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
             <div className="flex items-center justify-start mb-6">
                <svg height="24" viewBox="0 0 75 65" fill="#171717"><path d="M37.59.25l36.95 64H.64l36.95-64z"></path></svg>
             </div>
          </div>

          <div>
            <p className="text-[14px] mb-6" style={{ color: tokens.vercelBlack, fontWeight: 500 }}>Products</p>
            <ul className="space-y-4">
              {['Infrastructure', 'Next.js', 'Vercel AI', 'Analytics', 'Previews'].map(link => (
                <li key={link}>
                  <a href="#" className="text-[14px] hover:text-black transition-colors" style={{ color: tokens.gray600 }}>{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[14px] mb-6" style={{ color: tokens.vercelBlack, fontWeight: 500 }}>Resources</p>
            <ul className="space-y-4">
              {['Docs', 'Templates', 'Guides', 'Help', 'API Reference'].map(link => (
                <li key={link}>
                  <a href="#" className="text-[14px] hover:text-black transition-colors" style={{ color: tokens.gray600 }}>{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[14px] mb-6" style={{ color: tokens.vercelBlack, fontWeight: 500 }}>Company</p>
            <ul className="space-y-4">
              {['About', 'Blog', 'Careers', 'Changelog', 'Contact Us'].map(link => (
                <li key={link}>
                  <a href="#" className="text-[14px] hover:text-black transition-colors" style={{ color: tokens.gray600 }}>{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[14px] mb-6" style={{ color: tokens.vercelBlack, fontWeight: 500 }}>Legal</p>
            <ul className="space-y-4">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(link => (
                <li key={link}>
                  <a href="#" className="text-[14px] hover:text-black transition-colors" style={{ color: tokens.gray600 }}>{link}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6" style={{ borderTop: `1px solid ${tokens.gray100}` }}>
          <div className="flex items-center gap-6">
            <a href="#" className="text-[14px]" style={{ color: tokens.linkBlue }}>Status: All systems operational</a>
          </div>
          <p className="text-[14px]" style={{ color: tokens.gray500 }}>© {new Date().getFullYear()} Vercel Inc.</p>
        </div>
      </div>
    </footer>
  )
}

export default function VercelPage() {
  return (
    <div className={`${geistSans.variable} ${geistMono.variable} font-sans`} style={{ backgroundColor: tokens.pureWhite }}>
      <Navbar />
      <main>
        <Hero />
        <WorkflowSection />
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
