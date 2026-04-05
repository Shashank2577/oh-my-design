'use client'

/**
 * PAGE TEMPLATE — oh-my-design
 *
 * Copy this file to app/styles/[slug]/page.tsx
 * Replace STYLE_NAME, colors, fonts, and content
 * Follow designprompts_dev_all_styles.md for the design system
 */

import { motion, useReducedMotion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
// Replace fonts with those specified in the design system:
import { Inter } from 'next/font/google'
import {
  Star, ChevronDown, ArrowRight, Check, Activity, ShieldCheck, Database,
  Briefcase, LineChart, Cpu, Building2, Workflow, Globe, Settings, Lock,
  Users, Shield
} from 'lucide-react'

// ─────────────────────────────────────────────
// FONTS — replace with style-specific fonts
// ─────────────────────────────────────────────
const bodyFont = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

// ─────────────────────────────────────────────
// DESIGN TOKENS — replace ALL values per style
// ─────────────────────────────────────────────
const tokens = {
  background: '#FFFFFF',
  backgroundAlt: '#F9FAFB', // Tailwinds gray-50
  foreground: '#0F172A',    // Tailwinds slate-900
  muted: '#F1F5F9',         // Tailwinds slate-100
  mutedForeground: '#64748B',// Tailwinds slate-500
  border: '#E2E8F0',        // Tailwinds slate-200
  accent: '#0052CC',        // Corporate Blue from designprompts
  accentForeground: '#FFFFFF',
}

// ─────────────────────────────────────────────
// MOTION HELPERS
// ─────────────────────────────────────────────
function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-5% 0px' })
  const shouldReduce = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      initial={shouldReduce ? false : { opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.3, delay, ease: 'easeOut' as const }} // Enterprise uses 300ms ease-out
    >
      {children}
    </motion.div>
  )
}

function StaggerContainer({ children }: { children: React.ReactNode }) {
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
    >
      {children}
    </motion.div>
  )
}

const staggerItem: import('framer-motion').Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' as const } }, // 300ms ease-out
}

// ─────────────────────────────────────────────
// DATA — replace with style-appropriate content
// ─────────────────────────────────────────────
const PRODUCT_NAME = 'NexusCorp'
const TAGLINE = 'Enterprise scalability for modern workflows.'
const DESCRIPTION = 'A comprehensive platform designed to streamline operations, enhance security, and drive growth for large-scale organizations. Built on trust and engineered for performance.'

const NAV_LINKS = ['Solutions', 'Platform', 'Enterprise', 'Resources']

const STATS = [
  { value: '99.99%', label: 'Guaranteed Uptime SLA' },
  { value: 'SOC 2', label: 'Type II Certified' },
  { value: '150+', label: 'Global Data Centers' },
  { value: '24/7', label: 'Dedicated Support' },
]

const FEATURES = [
  { icon: ShieldCheck, title: 'Enterprise-Grade Security', description: 'Advanced role-based access control, SSO integration, and end-to-end encryption to protect your data.' },
  { icon: Database, title: 'Scalable Infrastructure', description: 'Built on a globally distributed architecture that seamlessly handles millions of concurrent transactions.' },
  { icon: LineChart, title: 'Advanced Analytics', description: 'Real-time dashboards, custom reporting, and predictive insights powered by machine learning algorithms.' },
  { icon: Workflow, title: 'Workflow Automation', description: 'Streamline complex operational processes with our intuitive, drag-and-drop workflow builder.' },
  { icon: Globe, title: 'Global Compliance', description: 'Out-of-the-box compliance with GDPR, HIPAA, CCPA, and industry-specific regulatory requirements.' },
  { icon: Settings, title: 'Custom Integrations', description: 'Robust REST APIs, webhooks, and pre-built connectors for all your existing enterprise software.' },
]

const PRICING = [
  {
    name: 'Professional',
    price: '$49',
    period: 'per user/mo',
    description: 'For growing teams requiring advanced tools.',
    features: ['Up to 50 users', 'Standard analytics', 'Email & chat support', '100GB secure storage'],
    cta: 'Start trial',
    highlighted: false,
  },
  {
    name: 'Business',
    price: '$99',
    period: 'per user/mo',
    description: 'For mid-market companies scaling operations.',
    features: ['Unlimited users', 'Advanced reporting', 'Priority 24/7 support', '1TB secure storage', 'Custom workflows'],
    cta: 'Contact sales',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'annual contract',
    description: 'For large organizations with complex needs.',
    features: ['Everything in Business', 'Dedicated success manager', 'Custom SLA & deployment', 'Unlimited storage', 'On-premise options'],
    cta: 'Request demo',
    highlighted: false,
  },
]

const TESTIMONIALS = [
  {
    name: 'Sarah Jenkins',
    role: 'Chief Information Officer',
    company: 'GlobalTech Solutions',
    text: 'NexusCorp has fundamentally transformed our IT infrastructure. The platform\'s reliability and security features exceed our rigorous enterprise standards.',
    rating: 5,
  },
  {
    name: 'David Chen',
    role: 'VP of Operations',
    company: 'Stellar Logistics',
    text: 'The transition was seamless. We consolidated three legacy systems into NexusCorp, reducing operational overhead by 40% in the first quarter alone.',
    rating: 5,
  },
  {
    name: 'Elena Rostova',
    role: 'Director of Compliance',
    company: 'FinServe International',
    text: 'For a financial institution, data governance is non-negotiable. NexusCorp\'s audit trails and compliance tools provide the exact visibility we require.',
    rating: 5,
  },
]

const FAQ_ITEMS = [
  { q: 'How does the implementation process work for Enterprise clients?', a: 'We assign a dedicated implementation team consisting of a project manager, solutions architect, and technical specialists to ensure a smooth transition. Typical enterprise deployments take 4-8 weeks depending on complexity.' },
  { q: 'Do you offer on-premise deployment options?', a: 'Yes. While our primary offering is a multi-tenant cloud solution, we provide single-tenant private cloud and on-premise deployment options for organizations with strict data residency or regulatory requirements.' },
  { q: 'What is your Service Level Agreement (SLA)?', a: 'Our standard Enterprise contract includes a financially backed 99.99% uptime guarantee. We also offer custom SLAs for mission-critical deployments that require higher availability thresholds.' },
  { q: 'How does your platform handle data migration from legacy systems?', a: 'Our migration tools and data engineers support extraction, transformation, and loading (ETL) from most major enterprise platforms. We ensure data integrity through rigorous validation protocols.' },
  { q: 'Is single sign-on (SSO) supported?', a: 'Yes. We support SAML 2.0 and OpenID Connect, integrating seamlessly with major identity providers including Okta, Microsoft Entra ID (Azure AD), Ping Identity, and Google Workspace.' },
  { q: 'What level of support is included in the Enterprise plan?', a: 'Enterprise clients receive 24/7/365 priority support with a guaranteed 1-hour response time for critical issues, access to a dedicated Technical Account Manager, and quarterly business reviews.' },
]

// ─────────────────────────────────────────────
// COMPONENTS
// ─────────────────────────────────────────────

function Navbar() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 border-b bg-white/90 backdrop-blur-md"
      style={{ borderColor: tokens.border }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Building2 className="h-6 w-6" style={{ color: tokens.accent }} />
          <span className="font-bold text-lg tracking-tight" style={{ color: tokens.foreground }}>
            {PRODUCT_NAME}
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-sm font-medium transition-colors hover:text-blue-600"
              style={{ color: tokens.mutedForeground }}
            >
              {link}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <a href="#" className="text-sm font-medium hidden sm:block" style={{ color: tokens.foreground }}>
            Sign In
          </a>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-5 h-10 rounded text-sm font-medium shadow-sm"
            style={{ backgroundColor: tokens.accent, color: tokens.accentForeground }}
          >
            Request Demo
          </motion.button>
        </div>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section className="min-h-dvh flex items-center pt-20" style={{ backgroundColor: tokens.backgroundAlt }}>
      <div className="max-w-7xl mx-auto px-6 py-20 w-full grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1, delayChildren: 0.1 }}
          className="max-w-2xl"
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-6 border"
            style={{ borderColor: tokens.border, color: tokens.foreground, backgroundColor: tokens.background }}
          >
            <Activity className="h-3 w-3" style={{ color: tokens.accent }} />
            <span>Trusted by Fortune 500 Companies</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 tracking-tight"
            style={{ color: tokens.foreground }}
          >
            {TAGLINE}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="text-lg mb-10 max-w-xl leading-relaxed"
            style={{ color: tokens.mutedForeground }}
          >
            {DESCRIPTION}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="h-12 px-8 rounded font-semibold flex items-center justify-center gap-2 shadow-md"
              style={{ backgroundColor: tokens.accent, color: tokens.accentForeground }}
            >
              Contact Sales <ArrowRight className="h-4 w-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="h-12 px-8 rounded font-semibold border bg-white"
              style={{ borderColor: tokens.border, color: tokens.foreground }}
            >
              Read the Whitepaper
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Hero Visual — Enterprise Data Viz Hint */}
        <FadeUp delay={0.4}>
          <div className="relative w-full h-80 md:h-[500px] rounded-xl overflow-hidden shadow-2xl border bg-white" style={{ borderColor: tokens.border }}>
             {/* Abstract data dashboard representation */}
             <div className="absolute top-0 left-0 right-0 h-12 border-b flex items-center px-4 gap-2" style={{ borderColor: tokens.border, backgroundColor: tokens.backgroundAlt }}>
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
             </div>
             <div className="absolute top-12 left-0 bottom-0 w-16 border-r flex flex-col items-center py-4 gap-6" style={{ borderColor: tokens.border, backgroundColor: tokens.backgroundAlt }}>
                 <div className="w-8 h-8 rounded bg-blue-100 flex items-center justify-center"><Activity className="h-4 w-4 text-blue-600"/></div>
                 <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center"><Database className="h-4 w-4 text-gray-500"/></div>
                 <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center"><Users className="h-4 w-4 text-gray-500"/></div>
             </div>
             <div className="absolute top-16 left-24 right-8 bottom-8 flex flex-col gap-4">
                 <div className="h-1/3 w-full rounded bg-blue-50 border border-blue-100 p-4">
                    <div className="h-4 w-32 bg-blue-200 rounded mb-4" />
                    <div className="flex items-end gap-2 h-16">
                        {[40, 70, 45, 90, 65, 100, 80].map((h, i) => (
                           <div key={i} className="flex-1 bg-blue-500 rounded-t opacity-80" style={{ height: `${h}%` }} />
                        ))}
                    </div>
                 </div>
                 <div className="flex-1 flex gap-4">
                    <div className="flex-1 rounded border p-4" style={{ borderColor: tokens.border }}>
                        <div className="h-4 w-24 bg-gray-200 rounded mb-4" />
                        <div className="h-24 w-24 rounded-full border-8 border-blue-500 mx-auto mt-4" style={{ borderRightColor: '#e2e8f0' }} />
                    </div>
                    <div className="flex-1 rounded border p-4" style={{ borderColor: tokens.border }}>
                        <div className="h-4 w-24 bg-gray-200 rounded mb-4" />
                        <div className="space-y-2 mt-4">
                            <div className="h-2 w-full bg-gray-100 rounded"><div className="h-full bg-blue-500 rounded w-[75%]" /></div>
                            <div className="h-2 w-full bg-gray-100 rounded"><div className="h-full bg-blue-400 rounded w-[50%]" /></div>
                            <div className="h-2 w-full bg-gray-100 rounded"><div className="h-full bg-blue-300 rounded w-[83%]" /></div>
                        </div>
                    </div>
                 </div>
             </div>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

function Stats() {
  return (
    <section className="border-b" style={{ borderColor: tokens.border, backgroundColor: tokens.background }}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-10 text-sm font-semibold tracking-wide uppercase" style={{ color: tokens.mutedForeground }}>
          Trusted by industry leaders
        </div>
        <StaggerContainer>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x" style={{ borderColor: tokens.border }}>
            {STATS.map((stat, i) => (
              <motion.div key={stat.label} variants={staggerItem} className={`text-center ${i === 0 ? '' : 'pl-8'}`}>
                <p className="text-4xl font-extrabold mb-2" style={{ color: tokens.accent }}>{stat.value}</p>
                <p className="text-sm font-medium" style={{ color: tokens.foreground }}>{stat.label}</p>
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
    <section id="features" className="py-24" style={{ backgroundColor: tokens.backgroundAlt }}>
      <div className="max-w-7xl mx-auto px-6">
        <FadeUp>
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight" style={{ color: tokens.foreground }}>
              Enterprise capabilities, uncompromising performance
            </h2>
            <p className="text-lg" style={{ color: tokens.mutedForeground }}>
              Our platform provides the foundational infrastructure and advanced tools required by modern enterprises to operate securely at global scale.
            </p>
          </div>
        </FadeUp>
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURES.map(feature => (
              <motion.div
                key={feature.title}
                variants={staggerItem}
                whileHover={{ y: -4, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)' }}
                transition={{ duration: 0.3 }}
                className="p-8 rounded-lg bg-white border"
                style={{ borderColor: tokens.border }}
              >
                <div className="w-12 h-12 rounded bg-blue-50 flex items-center justify-center mb-6">
                  <feature.icon className="h-6 w-6" style={{ color: tokens.accent }} strokeWidth={1.5} />
                </div>
                <h3 className="font-bold text-xl mb-3" style={{ color: tokens.foreground }}>{feature.title}</h3>
                <p className="text-base leading-relaxed" style={{ color: tokens.mutedForeground }}>{feature.description}</p>
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
    <section className="py-24 border-y" style={{ borderColor: tokens.border, backgroundColor: tokens.background }}>
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <FadeUp>
          <div>
            <div className="flex items-center gap-2 mb-6">
                <Shield className="h-5 w-5" style={{ color: tokens.accent }} />
                <span className="font-semibold text-sm uppercase tracking-wider" style={{ color: tokens.accent }}>Bank-Grade Security</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight" style={{ color: tokens.foreground }}>
              Protecting your most valuable assets with defense-in-depth architecture
            </h2>
            <div className="space-y-6">
              <p className="text-lg leading-relaxed" style={{ color: tokens.mutedForeground }}>
                Security isn't an afterthought—it's built into the foundation of NexusCorp. Our platform employs a multi-layered security model designed to exceed the compliance requirements of highly regulated industries including finance, healthcare, and government.
              </p>
              <ul className="space-y-4">
                 <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 mt-0.5" style={{ color: tokens.accent }} />
                    <span style={{ color: tokens.foreground }} className="font-medium">Data encryption at rest (AES-256) and in transit (TLS 1.3)</span>
                 </li>
                 <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 mt-0.5" style={{ color: tokens.accent }} />
                    <span style={{ color: tokens.foreground }} className="font-medium">Granular Role-Based Access Control (RBAC) and Audit Logs</span>
                 </li>
                 <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 mt-0.5" style={{ color: tokens.accent }} />
                    <span style={{ color: tokens.foreground }} className="font-medium">Continuous vulnerability scanning and penetration testing</span>
                 </li>
              </ul>
            </div>
          </div>
        </FadeUp>
        <FadeUp delay={0.2}>
          <div className="rounded-xl border p-8 bg-slate-50 relative overflow-hidden" style={{ borderColor: tokens.border }}>
             {/* Security dashboard mockup */}
             <div className="flex justify-between items-center mb-8 border-b pb-4" style={{ borderColor: tokens.border }}>
                 <div className="font-semibold text-sm">Security Posture Overview</div>
                 <div className="px-2 py-1 rounded text-xs bg-green-100 text-green-700 font-medium">All Systems Nominal</div>
             </div>
             <div className="space-y-6">
                 <div>
                     <div className="flex justify-between text-sm mb-2"><span className="text-slate-500">Threat Detection</span><span className="font-medium text-slate-900">Active</span></div>
                     <div className="h-2 w-full bg-slate-200 rounded"><div className="h-full bg-green-500 rounded w-full" /></div>
                 </div>
                 <div>
                     <div className="flex justify-between text-sm mb-2"><span className="text-slate-500">Encryption Status</span><span className="font-medium text-slate-900">100% Encrypted</span></div>
                     <div className="h-2 w-full bg-slate-200 rounded"><div className="h-full bg-blue-500 rounded w-full" /></div>
                 </div>
                 <div>
                     <div className="flex justify-between text-sm mb-2"><span className="text-slate-500">Access Anomalies (24h)</span><span className="font-medium text-slate-900">0 Events</span></div>
                     <div className="h-2 w-full bg-slate-200 rounded"><div className="h-full bg-slate-400 rounded w-[2%]" /></div>
                 </div>
             </div>
             <div className="mt-8 pt-6 border-t flex justify-between items-center" style={{ borderColor: tokens.border }}>
                 <div className="text-sm font-medium text-slate-600">Last Audit: 2 mins ago</div>
                 <Lock className="h-5 w-5 text-slate-400" />
             </div>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

function Pricing() {
  return (
    <section id="pricing" className="py-24" style={{ backgroundColor: tokens.backgroundAlt }}>
      <div className="max-w-7xl mx-auto px-6">
        <FadeUp>
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight" style={{ color: tokens.foreground }}>Predictable pricing for scale</h2>
            <p className="text-lg" style={{ color: tokens.mutedForeground }}>Transparent plans designed to align with your organization's growth and deployment requirements.</p>
          </div>
        </FadeUp>
        <StaggerContainer>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {PRICING.map(tier => (
              <motion.div
                key={tier.name}
                variants={staggerItem}
                className="p-8 rounded-xl bg-white border relative flex flex-col"
                style={{
                  borderColor: tier.highlighted ? tokens.accent : tokens.border,
                  boxShadow: tier.highlighted ? '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' : '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                  borderWidth: tier.highlighted ? '2px' : '1px'
                }}
              >
                {tier.highlighted && (
                  <span
                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 text-xs font-bold rounded-full uppercase tracking-wide"
                    style={{ backgroundColor: tokens.accent, color: tokens.accentForeground }}
                  >
                    Recommended
                  </span>
                )}
                <div className="mb-8">
                    <h3 className="font-bold text-2xl mb-2" style={{ color: tokens.foreground }}>{tier.name}</h3>
                    <p className="text-sm min-h-[40px]" style={{ color: tokens.mutedForeground }}>{tier.description}</p>
                </div>
                <div className="mb-8 pb-8 border-b" style={{ borderColor: tokens.border }}>
                  <div className="flex items-end gap-1">
                    <span className="text-5xl font-extrabold tracking-tight" style={{ color: tokens.foreground }}>{tier.price}</span>
                  </div>
                  <div className="text-sm font-medium mt-1" style={{ color: tokens.mutedForeground }}>{tier.period}</div>
                </div>
                <ul className="space-y-4 mb-10 flex-1">
                  {tier.features.map(f => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <Check className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: tokens.accent }} />
                      <span className="font-medium" style={{ color: tokens.foreground }}>{f}</span>
                    </li>
                  ))}
                </ul>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full h-12 rounded font-semibold text-base transition-colors"
                  style={tier.highlighted
                    ? { backgroundColor: tokens.accent, color: tokens.accentForeground }
                    : { backgroundColor: tokens.muted, color: tokens.foreground }
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
    <section id="testimonials" className="py-24 border-t" style={{ borderColor: tokens.border, backgroundColor: tokens.background }}>
      <div className="max-w-7xl mx-auto px-6">
        <FadeUp>
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight" style={{ color: tokens.foreground }}>Trusted by global enterprises</h2>
            <p className="text-lg" style={{ color: tokens.mutedForeground }}>Hear how leading organizations are achieving operational excellence with NexusCorp.</p>
          </div>
        </FadeUp>
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map(t => (
              <motion.div
                key={t.name}
                variants={staggerItem}
                className="p-8 rounded-lg border bg-slate-50 flex flex-col"
                style={{ borderColor: tokens.border }}
              >
                <div className="flex mb-6">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" style={{ color: tokens.accent }} />
                  ))}
                </div>
                <p className="text-base leading-relaxed mb-8 flex-1 italic" style={{ color: tokens.foreground }}>"{t.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-500">
                      {t.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-bold text-sm" style={{ color: tokens.foreground }}>{t.name}</p>
                    <p className="text-sm font-medium" style={{ color: tokens.mutedForeground }}>{t.role}, {t.company}</p>
                  </div>
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
    <section id="faq" className="py-24 border-t" style={{ borderColor: tokens.border, backgroundColor: tokens.backgroundAlt }}>
      <div className="max-w-4xl mx-auto px-6">
        <FadeUp>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4" style={{ color: tokens.foreground }}>Frequently Asked Questions</h2>
            <p className="text-lg" style={{ color: tokens.mutedForeground }}>Details on deployment, security, and support.</p>
          </div>
        </FadeUp>
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, i) => (
            <FadeUp key={i} delay={i * 0.05}>
              <div className="border bg-white rounded-lg shadow-sm" style={{ borderColor: tokens.border }}>
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  aria-expanded={openIndex === i}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-semibold text-lg" style={{ color: tokens.foreground }}>{item.q}</span>
                  <motion.span
                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="ml-4 flex-shrink-0 p-1 rounded-full bg-slate-50"
                  >
                    <ChevronDown className="h-5 w-5" style={{ color: tokens.mutedForeground }} />
                  </motion.span>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openIndex === i ? 'auto' : 0, opacity: openIndex === i ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' as const }}
                  style={{ overflow: 'hidden' }}
                >
                  <div className="px-6 pb-6 pt-2 border-t mt-2" style={{ borderColor: tokens.border }}>
                      <p className="text-base leading-relaxed" style={{ color: tokens.mutedForeground }}>
                        {item.a}
                      </p>
                  </div>
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
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setTimeout(() => setStatus('success'), 1200)
  }

  return (
    <section className="py-24 border-y" style={{ borderColor: tokens.border, backgroundColor: tokens.background }}>
      <div className="max-w-4xl mx-auto px-6 text-center">
        <FadeUp>
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-blue-50 mb-6">
              <Activity className="h-8 w-8" style={{ color: tokens.accent }} />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight" style={{ color: tokens.foreground }}>Stay informed on enterprise tech</h2>
          <p className="text-lg mb-10 max-w-2xl mx-auto" style={{ color: tokens.mutedForeground }}>
            Subscribe to our quarterly executive brief for insights on security, scalability, and digital transformation.
          </p>
          {status === 'success' ? (
            <div className="p-4 rounded-lg bg-green-50 border border-green-200 inline-block">
                <p className="font-semibold text-green-800 flex items-center gap-2"><Check className="h-5 w-5"/> Subscription confirmed. Welcome aboard.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <label htmlFor="newsletter-email" className="sr-only">Corporate email address</label>
              <input
                id="newsletter-email"
                type="email"
                required
                autoComplete="email"
                placeholder="name@company.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="flex-1 h-12 px-4 rounded border text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                style={{ borderColor: tokens.border, backgroundColor: tokens.background, color: tokens.foreground }}
              />
              <motion.button
                type="submit"
                disabled={status === 'loading'}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="h-12 px-8 rounded font-semibold text-base shadow-sm disabled:opacity-70"
                style={{ backgroundColor: tokens.accent, color: tokens.accentForeground }}
              >
                {status === 'loading' ? 'Processing...' : 'Subscribe'}
              </motion.button>
            </form>
          )}
          <p className="text-xs mt-4 text-slate-400">By subscribing, you agree to our Privacy Policy. You can unsubscribe at any time.</p>
        </FadeUp>
      </div>
    </section>
  )
}

function Footer() {
  const links = {
    Solutions: ['Enterprise Security', 'Workflow Automation', 'Data Governance', 'Cloud Migration'],
    Platform: ['Architecture', 'Integrations', 'API Documentation', 'System Status'],
    Company: ['About NexusCorp', 'Leadership', 'Careers', 'Investor Relations'],
    Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Trust Center'],
  }

  return (
    <footer className="py-20" style={{ backgroundColor: tokens.foreground, color: tokens.muted }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-16">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
                <Building2 className="h-6 w-6 text-white" />
                <span className="font-bold text-xl text-white tracking-tight">{PRODUCT_NAME}</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm mb-6">
              Empowering global enterprises with secure, scalable, and compliant infrastructure.
            </p>
            <div className="flex gap-4">
                <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center cursor-pointer hover:bg-slate-700 transition-colors"></div>
                <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center cursor-pointer hover:bg-slate-700 transition-colors"></div>
                <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center cursor-pointer hover:bg-slate-700 transition-colors"></div>
            </div>
          </div>
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <p className="font-semibold text-sm mb-6 text-white">{group}</p>
              <ul className="space-y-4">
                {items.map(item => (
                  <li key={item}>
                    <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-slate-800 gap-4">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} {PRODUCT_NAME} Inc. All rights reserved.
          </p>
          <a
            href="/"
            className="text-sm text-slate-400 hover:text-white transition-colors"
          >
            ← Back to all styles
          </a>
        </div>
      </div>
    </footer>
  )
}

// ─────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────
export default function StylePage() {
  return (
    <div className={`${bodyFont.variable} font-sans`} style={{ backgroundColor: tokens.background }}>
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
