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
import { Outfit, DM_Sans, Bangers } from 'next/font/google'
import {
  Star, ChevronDown, ArrowRight, Check, Users, Zap, Globe, Shield,
  BookOpen, Layout, Palette, Code2, BarChart, Lock, Sparkles, Flame, Rocket
} from 'lucide-react'

// ─────────────────────────────────────────────
// FONTS — replace with style-specific fonts
// ─────────────────────────────────────────────
const headingFont = Outfit({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
  weight: ['700', '800', '900']
})

const bodyFont = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['400', '500', '700']
})

const displayFont = Bangers({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400']
})

// ─────────────────────────────────────────────
// DESIGN TOKENS — replace ALL values per style
// ─────────────────────────────────────────────
const tokens = {
  background: '#0D0D1A',
  foreground: '#FFFFFF',
  muted: '#2D1B4E',
  borderBase: '#FF3AF2',
  accent1: '#FF3AF2', // Magenta
  accent2: '#00F5D4', // Cyan
  accent3: '#FFE600', // Yellow
  accent4: '#FF6B35', // Orange
  accent5: '#7B2FFF', // Purple
}

const ACCENTS = [tokens.accent1, tokens.accent2, tokens.accent3, tokens.accent4, tokens.accent5];

// ─────────────────────────────────────────────
// CUSTOM CSS & KEYFRAMES
// ─────────────────────────────────────────────
const customStyles = `
  .max-text-shadow-single { text-shadow: 2px 2px 0px ${tokens.accent5}; }
  .max-text-shadow-double { text-shadow: 2px 2px 0px ${tokens.accent5}, 4px 4px 0px ${tokens.accent1}; }
  .max-text-shadow-triple { text-shadow: 2px 2px 0px ${tokens.accent5}, 4px 4px 0px ${tokens.accent1}, 6px 6px 0px ${tokens.accent2}; }
  .max-text-shadow-mega { text-shadow: 4px 4px 0px ${tokens.accent5}, 8px 8px 0px ${tokens.accent1}, 12px 12px 0px ${tokens.accent2}; }

  .max-gradient-text {
    background: linear-gradient(90deg, ${tokens.accent1}, ${tokens.accent2}, ${tokens.accent3}, ${tokens.accent1});
    background-size: 300% 100%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: gradient-shift 5s ease infinite;
  }

  .pattern-checker {
    background-image: repeating-linear-gradient(45deg, ${tokens.accent5}20 25%, transparent 25%, transparent 75%, ${tokens.accent5}20 75%, ${tokens.accent5}20), repeating-linear-gradient(45deg, ${tokens.accent5}20 25%, ${tokens.background} 25%, ${tokens.background} 75%, ${tokens.accent5}20 75%, ${tokens.accent5}20);
    background-position: 0 0, 20px 20px;
    background-size: 40px 40px;
  }

  .pattern-dots {
    background-image: radial-gradient(${tokens.accent2}30 2px, transparent 2px);
    background-size: 24px 24px;
  }

  @keyframes gradient-shift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  @keyframes float {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    25%      { transform: translateY(-15px) rotate(5deg); }
    75%      { transform: translateY(15px) rotate(-5deg); }
  }
  .animate-float { animation: float 6s ease-in-out infinite; }

  @keyframes pulse-glow {
    0%, 100% { transform: scale(1); box-shadow: 0 0 10px ${tokens.accent1}, 0 0 20px ${tokens.accent1}; }
    50%      { transform: scale(1.05); box-shadow: 0 0 25px ${tokens.accent1}, 0 0 50px ${tokens.accent1}; }
  }
  .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }

  @keyframes spin-slow {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  .animate-spin-slow { animation: spin-slow 20s linear infinite; }

  @keyframes wiggle {
    0%, 100% { transform: rotate(-3deg); }
    50%      { transform: rotate(3deg); }
  }
  .animate-wiggle { animation: wiggle 1s ease-in-out infinite; }

  @keyframes bounce-subtle {
    0%, 100% { transform: translateY(0); }
    50%      { transform: translateY(-10px); }
  }
  .animate-bounce-subtle { animation: bounce-subtle 2s ease-in-out infinite; }

  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.15s !important;
    }
  }
`;

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
      transition={{ duration: 0.6, delay, ease: [0.23, 1, 0.32, 1] }}
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
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] } },
}

// ─────────────────────────────────────────────
// DATA — replace with style-appropriate content
// ─────────────────────────────────────────────
const PRODUCT_NAME = 'ProductName'
const TAGLINE = 'The product tagline goes here'
const DESCRIPTION = 'A compelling description of what this product does and why it matters.'

const NAV_LINKS = ['Features', 'Pricing', 'Testimonials', 'FAQ']

const STATS = [
  { value: '50K+', label: 'Active Users' },
  { value: '99.9%', label: 'Uptime' },
  { value: '140+', label: 'Countries' },
  { value: '4.9/5', label: 'Rating' },
]

const FEATURES = [
  { icon: BookOpen, title: 'Feature One', description: 'Describe the first key feature and its benefit to users.' },
  { icon: Layout, title: 'Feature Two', description: 'Describe the second key feature and its benefit to users.' },
  { icon: Palette, title: 'Feature Three', description: 'Describe the third key feature and its benefit to users.' },
  { icon: Code2, title: 'Feature Four', description: 'Describe the fourth key feature and its benefit to users.' },
  { icon: BarChart, title: 'Feature Five', description: 'Describe the fifth key feature and its benefit to users.' },
  { icon: Lock, title: 'Feature Six', description: 'Describe the sixth key feature and its benefit to users.' },
]

const PRICING = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for individuals getting started.',
    features: ['5 projects', '1 user', 'Basic analytics', 'Email support'],
    cta: 'Get started',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$29',
    period: 'per month',
    description: 'For growing teams that need more power.',
    features: ['Unlimited projects', '10 users', 'Advanced analytics', 'Priority support', 'Custom domains', 'API access'],
    cta: 'Start free trial',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: '$99',
    period: 'per month',
    description: 'For large organizations with custom needs.',
    features: ['Everything in Pro', 'Unlimited users', 'SSO / SAML', 'Dedicated support', 'SLA guarantee', 'Custom integrations'],
    cta: 'Contact sales',
    highlighted: false,
  },
]

const TESTIMONIALS = [
  {
    name: 'Alexandra Chen',
    role: 'Product Manager',
    company: 'Acme Corp',
    text: 'This product completely transformed how our team works. The results have been incredible.',
    rating: 5,
  },
  {
    name: 'Marcus Williams',
    role: 'CTO',
    company: 'StartupXYZ',
    text: 'I\'ve tried many tools in this space, but nothing comes close. The quality is exceptional.',
    rating: 5,
  },
  {
    name: 'Sofia Rodriguez',
    role: 'Designer',
    company: 'Creative Studio',
    text: 'The attention to detail is remarkable. Every interaction feels intentional and polished.',
    rating: 5,
  },
]

const FAQ_ITEMS = [
  { q: 'How do I get started?', a: 'Sign up for a free account and follow the onboarding wizard. You\'ll be up and running in under 5 minutes.' },
  { q: 'Can I cancel anytime?', a: 'Yes, absolutely. There are no long-term commitments. Cancel your subscription at any time from your account settings.' },
  { q: 'Do you offer a free trial?', a: 'Yes! All Pro features are available free for 14 days. No credit card required.' },
  { q: 'What payment methods do you accept?', a: 'We accept all major credit cards, PayPal, and bank transfers for Enterprise plans.' },
  { q: 'Is my data secure?', a: 'Security is our top priority. All data is encrypted in transit and at rest. We\'re SOC 2 Type II certified.' },
  { q: 'Do you have an API?', a: 'Yes, we offer a comprehensive REST API with full documentation available for Pro and Enterprise customers.' },
]

// ─────────────────────────────────────────────
// COMPONENTS
// ─────────────────────────────────────────────

function Navbar() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 border-b-8 backdrop-blur-sm"
      style={{ borderColor: tokens.borderBase, backgroundColor: `${tokens.background}DD` }}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <span className="font-heading font-black text-3xl uppercase tracking-tighter flex items-center gap-2 max-text-shadow-single">
          <Sparkles className="h-6 w-6 animate-wiggle" style={{ color: tokens.accent3 }} />
          {PRODUCT_NAME}
        </span>
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link, i) => (
            <motion.a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-lg font-bold uppercase tracking-widest px-4 py-2 border-2 border-transparent transition-all"
              whileHover={{
                scale: 1.1,
                rotate: i % 2 === 0 ? 3 : -3,
                backgroundColor: ACCENTS[i % 5],
                borderColor: ACCENTS[(i + 1) % 5],
                color: '#0D0D1A',
                boxShadow: `4px 4px 0px ${ACCENTS[(i + 2) % 5]}`
              }}
            >
              {link}
            </motion.a>
          ))}
        </div>
        <motion.button
          whileHover={{ scale: 1.1, rotate: 2 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 h-12 border-4 text-lg font-bold uppercase tracking-widest flex items-center gap-2"
          style={{
            backgroundColor: tokens.accent2,
            color: '#0D0D1A',
            borderColor: tokens.accent3,
            boxShadow: `6px 6px 0px ${tokens.accent1}`
          }}
        >
          Get started <ArrowRight className="h-5 w-5" />
        </motion.button>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section className="relative min-h-dvh flex items-center pt-24 overflow-hidden border-b-8" style={{ borderColor: tokens.accent2, backgroundColor: tokens.background }}>
      {/* Floating Shapes */}
      <div className="absolute top-1/4 right-1/4 animate-float opacity-80 mix-blend-screen z-0">
        <div className="w-32 h-32 bg-[#FF3AF2] rounded-full filter blur-[40px]"></div>
      </div>
      <div className="absolute bottom-1/4 left-1/4 animate-float opacity-80 mix-blend-screen z-0" style={{ animationDelay: '2s' }}>
        <div className="w-48 h-48 bg-[#00F5D4] rounded-full filter blur-[60px]"></div>
      </div>
      <div className="absolute top-1/3 left-10 w-16 h-16 border-8 border-[#FFE600] animate-spin-slow z-0"></div>
      <div className="absolute bottom-1/3 right-10 w-24 h-24 border-[12px] border-[#FF6B35] rounded-full animate-bounce-subtle z-0"></div>

      <div className="max-w-7xl mx-auto px-6 py-24 w-full relative z-10 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: 'spring', bounce: 0.5 }}
          className="w-full flex flex-col items-center"
        >
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="inline-block px-6 py-2 mb-8 border-4 uppercase tracking-widest font-bold text-xl animate-pulse-glow"
            style={{
              backgroundColor: tokens.accent5,
              borderColor: tokens.accent3,
              color: tokens.foreground,
              boxShadow: `8px 8px 0px ${tokens.accent2}`
            }}
          >
            Introducing {PRODUCT_NAME} <Flame className="inline h-6 w-6 ml-2" />
          </motion.div>

          <h1 className="font-heading font-black uppercase text-7xl md:text-9xl leading-[0.9] mb-8 max-text-shadow-mega -rotate-2">
            <span className="block mb-2">The product</span>
            <span className="block max-gradient-text">tagline goes</span>
            <span className="block">here!!</span>
          </h1>

          <p className="text-xl md:text-3xl font-bold mb-12 max-w-3xl leading-relaxed px-8 py-6 border-4"
             style={{
               backgroundColor: `${tokens.muted}CC`,
               borderColor: tokens.accent4,
               boxShadow: `8px 8px 0px ${tokens.accent1}`
             }}>
            {DESCRIPTION}
          </p>

          <div className="flex flex-col sm:flex-row gap-8 mt-8">
            <motion.button
              whileHover={{ scale: 1.1, rotate: -2, y: -4 }}
              whileTap={{ scale: 0.9, y: 4, boxShadow: 'none' }}
              className="h-20 px-12 text-2xl font-black uppercase tracking-widest flex items-center gap-4 border-[6px]"
              style={{
                backgroundColor: tokens.accent3,
                color: '#0D0D1A',
                borderColor: tokens.accent1,
                boxShadow: `10px 10px 0px ${tokens.accent5}`
              }}
            >
              Start for free <Rocket className="h-8 w-8 animate-wiggle" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 2, y: -4 }}
              whileTap={{ scale: 0.9, y: 4, boxShadow: 'none' }}
              className="h-20 px-12 text-2xl font-black uppercase tracking-widest border-[6px]"
              style={{
                backgroundColor: 'transparent',
                color: tokens.foreground,
                borderColor: tokens.accent2,
                boxShadow: `10px 10px 0px ${tokens.accent4}`
              }}
            >
              View demo
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function Stats() {
  return (
    <section className="border-b-8 pattern-dots py-24" style={{ borderColor: tokens.accent5, backgroundColor: tokens.muted }}>
      <div className="max-w-7xl mx-auto px-6">
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={staggerItem}
                whileHover={{ scale: 1.05, rotate: i % 2 === 0 ? 2 : -2 }}
                className="text-center p-8 border-4 relative overflow-hidden group"
                style={{
                  backgroundColor: ACCENTS[i % 5],
                  borderColor: ACCENTS[(i + 2) % 5],
                  boxShadow: `8px 8px 0px ${ACCENTS[(i + 1) % 5]}`
                }}
              >
                <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full mix-blend-overlay opacity-20 bg-white group-hover:scale-150 transition-transform duration-500"></div>
                <p className="font-heading font-black text-6xl mb-2 text-[#0D0D1A]" style={{ textShadow: `2px 2px 0px #FFFFFF` }}>
                  {stat.value}
                </p>
                <p className="text-xl font-bold uppercase tracking-widest text-[#0D0D1A] bg-white inline-block px-3 py-1 border-2 border-[#0D0D1A]">
                  {stat.label}
                </p>
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
    <section id="features" className="py-32 border-b-8 relative overflow-hidden" style={{ borderColor: tokens.accent1, backgroundColor: tokens.background }}>
      <div className="absolute top-10 left-10 w-32 h-32 border-8 border-dashed rounded-full animate-spin-slow opacity-50" style={{ borderColor: tokens.accent2 }}></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 border-[16px] animate-wiggle opacity-50" style={{ borderColor: tokens.accent4 }}></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <FadeUp>
          <div className="text-center mb-24 relative">
            <span className="absolute -top-12 left-1/2 -translate-x-1/2 font-display text-8xl opacity-10" style={{ color: tokens.accent1 }}>FEATURES</span>
            <p className="inline-block px-4 py-1 border-4 uppercase tracking-widest font-bold text-xl mb-6 -rotate-2" style={{ backgroundColor: tokens.accent3, color: '#0D0D1A', borderColor: tokens.accent5 }}>Features</p>
            <h2 className="font-heading font-black uppercase text-6xl md:text-8xl mb-4 max-text-shadow-triple" style={{ color: tokens.foreground }}>
              Everything you need
            </h2>
            <p className="text-2xl font-bold max-w-2xl mx-auto px-6 py-4 border-4" style={{ backgroundColor: `${tokens.accent1}30`, borderColor: tokens.accent2 }}>
              Powerful features designed for teams that care about quality and fun.
            </p>
          </div>
        </FadeUp>
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {FEATURES.map((feature, i) => (
              <motion.div
                key={feature.title}
                variants={staggerItem}
                whileHover={{ scale: 1.05, rotate: i % 2 === 0 ? 3 : -3, y: -10 }}
                className="p-10 border-[6px] relative bg-[#0D0D1A] group transition-all"
                style={{
                  borderColor: ACCENTS[(i + 3) % 5],
                  boxShadow: `12px 12px 0px ${ACCENTS[i % 5]}`
                }}
              >
                <div className="absolute -top-6 -right-6 p-4 border-4 bg-[#0D0D1A] group-hover:rotate-180 transition-transform duration-500"
                     style={{ borderColor: ACCENTS[(i + 1) % 5] }}>
                  <feature.icon className="h-10 w-10" style={{ color: ACCENTS[i % 5] }} strokeWidth={3} />
                </div>
                <h3 className="font-heading font-black uppercase text-3xl mb-4" style={{ color: ACCENTS[(i + 2) % 5] }}>{feature.title}</h3>
                <p className="text-lg font-bold leading-relaxed" style={{ color: tokens.foreground }}>{feature.description}</p>

                <div className="mt-8 h-4 w-full border-b-4 border-dashed" style={{ borderColor: ACCENTS[(i + 4) % 5] }}></div>
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
    <section className="py-32 border-b-8 pattern-checker" style={{ borderColor: tokens.accent4, backgroundColor: tokens.background }}>
      <div className="max-w-5xl mx-auto px-6">
        <FadeUp>
          <div className="border-[8px] p-12 md:p-20 relative bg-[#0D0D1A]" style={{ borderColor: tokens.accent1, boxShadow: `20px 20px 0px ${tokens.accent3}` }}>
            <div className="absolute -top-10 -left-10 w-24 h-24 bg-[#00F5D4] rounded-full mix-blend-screen filter blur-[20px] animate-pulse-glow"></div>
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#FF3AF2] rounded-full mix-blend-screen filter blur-[30px] animate-pulse-glow" style={{ animationDelay: '1s' }}></div>

            <p className="inline-block px-4 py-1 border-4 uppercase tracking-widest font-bold text-xl mb-8 rotate-2" style={{ backgroundColor: tokens.accent2, color: '#0D0D1A', borderColor: tokens.accent1 }}>About</p>
            <h2 className="font-heading font-black uppercase text-5xl md:text-7xl mb-12 leading-[1.1] max-text-shadow-double" style={{ color: tokens.foreground }}>
              Built for the way you work and play
            </h2>
            <div className="space-y-8 text-left text-xl font-bold leading-relaxed border-l-8 pl-8" style={{ borderColor: tokens.accent5 }}>
              <p style={{ color: tokens.foreground }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
              </p>
              <p style={{ color: tokens.foreground }}>
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.
              </p>
              <p className="p-6 border-4 border-dashed bg-[#0D0D1A]" style={{ borderColor: tokens.accent3, color: tokens.accent2 }}>
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
              </p>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

function Pricing() {
  return (
    <section id="pricing" className="py-32 border-b-8 relative overflow-hidden" style={{ borderColor: tokens.accent3, backgroundColor: tokens.background }}>
      <div className="absolute top-0 right-0 w-full h-full pattern-dots opacity-50 z-0"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <FadeUp>
          <div className="text-center mb-24">
            <h2 className="font-display text-8xl md:text-[10rem] mb-4 text-center leading-none" style={{ color: tokens.accent5 }}>
              <span className="block -rotate-3 hover:rotate-3 transition-transform">CHOOSE</span>
              <span className="block rotate-2 hover:-rotate-2 transition-transform" style={{ color: tokens.accent2 }}>YOUR</span>
              <span className="block -rotate-1 hover:rotate-1 transition-transform max-text-shadow-mega" style={{ color: tokens.accent1 }}>DESTINY</span>
            </h2>
          </div>
        </FadeUp>
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-8 items-center">
            {PRICING.map((tier, i) => (
              <motion.div
                key={tier.name}
                variants={staggerItem}
                whileHover={{ scale: tier.highlighted ? 1.1 : 1.05, rotate: i === 1 ? 0 : (i === 0 ? -2 : 2) }}
                className={`p-10 border-[6px] relative bg-[#0D0D1A] ${tier.highlighted ? 'md:-translate-y-8 z-20' : 'z-10'}`}
                style={{
                  borderColor: tier.highlighted ? tokens.accent1 : ACCENTS[(i + 2) % 5],
                  boxShadow: tier.highlighted ? `16px 16px 0px ${tokens.accent3}, 32px 32px 0px ${tokens.accent2}` : `8px 8px 0px ${ACCENTS[i % 5]}`,
                }}
              >
                {tier.highlighted && (
                  <div
                    className="absolute -top-6 left-1/2 -translate-x-1/2 px-6 py-2 border-4 font-black uppercase text-xl animate-bounce-subtle"
                    style={{ backgroundColor: tokens.accent3, color: '#0D0D1A', borderColor: tokens.accent1 }}
                  >
                    Most popular
                  </div>
                )}
                <h3 className="font-heading font-black uppercase text-4xl mb-2" style={{ color: tier.highlighted ? tokens.accent2 : tokens.foreground }}>{tier.name}</h3>
                <div className="flex items-baseline gap-2 mb-4 p-4 border-4" style={{ backgroundColor: `${ACCENTS[i % 5]}20`, borderColor: ACCENTS[i % 5] }}>
                  <span className="font-heading font-black text-6xl" style={{ color: tokens.foreground }}>{tier.price}</span>
                  <span className="text-xl font-bold uppercase tracking-widest" style={{ color: ACCENTS[(i + 1) % 5] }}>/ {tier.period}</span>
                </div>
                <p className="text-lg font-bold mb-8" style={{ color: tokens.foreground }}>{tier.description}</p>
                <ul className="space-y-4 mb-10">
                  {tier.features.map(f => (
                    <li key={f} className="flex items-center gap-4 text-lg font-bold">
                      <div className="p-1 border-2" style={{ borderColor: tokens.accent2, backgroundColor: tokens.accent1 }}>
                        <Check className="h-5 w-5" style={{ color: '#0D0D1A' }} strokeWidth={4} />
                      </div>
                      <span style={{ color: tokens.foreground }}>{f}</span>
                    </li>
                  ))}
                </ul>
                <motion.button
                  whileHover={{ scale: 1.05, x: 4, y: 4, boxShadow: 'none' }}
                  className="w-full h-16 border-[6px] font-black uppercase text-2xl tracking-widest transition-all"
                  style={tier.highlighted
                    ? { backgroundColor: tokens.accent1, color: '#0D0D1A', borderColor: tokens.accent3, boxShadow: `8px 8px 0px ${tokens.accent2}` }
                    : { backgroundColor: 'transparent', color: tokens.foreground, borderColor: ACCENTS[(i + 3) % 5], boxShadow: `8px 8px 0px ${ACCENTS[(i + 4) % 5]}` }
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
    <section id="testimonials" className="py-32 border-b-8 relative" style={{ borderColor: tokens.accent2, backgroundColor: tokens.muted }}>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <FadeUp>
          <div className="text-center mb-24">
            <h2 className="font-heading font-black uppercase text-6xl md:text-8xl mb-4 max-text-shadow-double" style={{ color: tokens.accent1 }}>
              Loved by teams
            </h2>
            <div className="inline-block p-4 border-[6px] bg-[#0D0D1A] -rotate-2" style={{ borderColor: tokens.accent3, boxShadow: `10px 10px 0px ${tokens.accent5}` }}>
              <p className="font-display text-5xl md:text-7xl" style={{ color: tokens.foreground }}>EVERYWHERE</p>
            </div>
          </div>
        </FadeUp>
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                variants={staggerItem}
                whileHover={{ scale: 1.05, rotate: i % 2 === 0 ? 4 : -4 }}
                className="p-8 border-[6px] bg-[#0D0D1A] transition-all relative"
                style={{
                  borderColor: ACCENTS[(i + 4) % 5],
                  boxShadow: `12px 12px 0px ${ACCENTS[(i + 1) % 5]}`,
                  top: i % 2 === 1 ? '40px' : '0px'
                }}
              >
                <div className="flex mb-6 gap-1 p-2 border-4 inline-flex" style={{ backgroundColor: ACCENTS[i % 5], borderColor: '#0D0D1A' }}>
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-6 w-6 fill-current animate-spin-slow" style={{ color: '#0D0D1A' }} />
                  ))}
                </div>
                <p className="text-xl font-bold leading-relaxed mb-8" style={{ color: tokens.foreground }}>"{t.text}"</p>
                <div className="pt-6 border-t-4 border-dashed" style={{ borderColor: ACCENTS[(i + 2) % 5] }}>
                  <p className="font-heading font-black uppercase text-2xl" style={{ color: ACCENTS[(i + 3) % 5] }}>{t.name}</p>
                  <p className="text-lg font-bold" style={{ color: tokens.foreground }}>{t.role} @ {t.company}</p>
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
    <section id="faq" className="py-32 border-b-8 pattern-dots" style={{ borderColor: tokens.accent4, backgroundColor: tokens.background }}>
      <div className="max-w-4xl mx-auto px-6">
        <FadeUp>
          <div className="text-center mb-20">
            <h2 className="font-heading font-black uppercase text-7xl md:text-9xl mb-8 max-text-shadow-mega" style={{ color: tokens.accent2 }}>
              FAQ?!
            </h2>
            <p className="inline-block px-8 py-3 border-[6px] uppercase tracking-widest font-black text-2xl rotate-2" style={{ backgroundColor: tokens.accent5, color: '#0D0D1A', borderColor: tokens.accent3, boxShadow: `8px 8px 0px ${tokens.accent1}` }}>
              We've got answers
            </p>
          </div>
        </FadeUp>
        <div className="space-y-8">
          {FAQ_ITEMS.map((item, i) => (
            <FadeUp key={i} delay={i * 0.05}>
              <div className="border-[6px] transition-all" style={{
                borderColor: openIndex === i ? ACCENTS[(i + 1) % 5] : ACCENTS[i % 5],
                backgroundColor: openIndex === i ? `${ACCENTS[i % 5]}20` : '#0D0D1A',
                boxShadow: openIndex === i ? `8px 8px 0px ${ACCENTS[(i + 2) % 5]}` : `4px 4px 0px ${ACCENTS[(i + 3) % 5]}`
              }}>
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  aria-expanded={openIndex === i}
                  className="w-full flex items-center justify-between p-8 text-left transition-colors"
                  style={{ backgroundColor: openIndex === i ? ACCENTS[i % 5] : 'transparent' }}
                >
                  <span className="font-heading font-black uppercase text-2xl" style={{ color: openIndex === i ? '#0D0D1A' : tokens.foreground }}>{item.q}</span>
                  <motion.span
                    animate={{ rotate: openIndex === i ? 180 : 0, scale: openIndex === i ? 1.2 : 1 }}
                    transition={{ duration: 0.3, type: 'spring' }}
                    className="p-2 border-4 rounded-full"
                    style={{
                      borderColor: openIndex === i ? '#0D0D1A' : ACCENTS[(i + 4) % 5],
                      backgroundColor: openIndex === i ? tokens.foreground : 'transparent'
                    }}
                  >
                    <ChevronDown className="h-8 w-8 flex-shrink-0" style={{ color: '#0D0D1A' }} strokeWidth={4} />
                  </motion.span>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openIndex === i ? 'auto' : 0, opacity: openIndex === i ? 1 : 0 }}
                  transition={{ duration: 0.3, type: 'spring', bounce: 0.3 }}
                  style={{ overflow: 'hidden' }}
                >
                  <p className="p-8 text-xl font-bold leading-relaxed border-t-[6px]" style={{ color: tokens.foreground, borderColor: ACCENTS[i % 5] }}>
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
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setTimeout(() => setStatus('success'), 1200)
  }

  return (
    <section className="py-32 border-b-8 relative overflow-hidden pattern-checker" style={{ borderColor: tokens.accent1, backgroundColor: tokens.accent5 }}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl bg-[#0D0D1A] border-8 rounded-[100px] z-0 opacity-80" style={{ borderColor: tokens.accent2 }}></div>

      <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
        <FadeUp>
          <h2 className="font-heading font-black uppercase text-6xl md:text-8xl mb-8 max-text-shadow-double -rotate-2" style={{ color: tokens.foreground }}>
            STAY IN THE LOOP
          </h2>
          <p className="text-2xl font-bold mb-12 p-4 border-4 bg-[#0D0D1A] rotate-1" style={{ color: tokens.foreground, borderColor: tokens.accent3 }}>
            Get updates on new features and releases. No spam, ever.
          </p>
          {status === 'success' ? (
            <div className="p-8 border-[6px] bg-[#0D0D1A] animate-bounce-subtle" style={{ borderColor: tokens.accent2, boxShadow: `12px 12px 0px ${tokens.accent3}` }}>
              <p className="font-heading font-black uppercase text-4xl" style={{ color: tokens.accent2 }}>✓ YOU'RE ON THE LIST!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-6">
              <label htmlFor="newsletter-email" className="sr-only">Email address</label>
              <input
                id="newsletter-email"
                type="email"
                required
                autoComplete="email"
                placeholder="YOUR@EMAIL.COM"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="flex-1 h-20 px-8 border-[6px] text-2xl font-bold uppercase tracking-wider placeholder:text-[#666] outline-none focus:scale-105 transition-transform"
                style={{ borderColor: tokens.accent4, backgroundColor: '#0D0D1A', color: tokens.foreground, boxShadow: `8px 8px 0px ${tokens.accent1}` }}
              />
              <motion.button
                type="submit"
                disabled={status === 'loading'}
                whileHover={{ scale: 1.1, rotate: 2 }}
                whileTap={{ scale: 0.95, boxShadow: 'none', y: 4, x: 4 }}
                className="h-20 px-10 border-[6px] font-black uppercase text-2xl tracking-widest disabled:opacity-60 animate-pulse-glow"
                style={{ backgroundColor: tokens.accent3, color: '#0D0D1A', borderColor: tokens.accent1, boxShadow: `8px 8px 0px ${tokens.accent2}` }}
              >
                {status === 'loading' ? 'WAIT...' : 'SUBSCRIBE'}
              </motion.button>
            </form>
          )}
        </FadeUp>
      </div>
    </section>
  )
}

function Footer() {
  const links = {
    Product: ['Features', 'Pricing', 'Changelog', 'Roadmap'],
    Company: ['About', 'Blog', 'Careers', 'Press'],
    Resources: ['Documentation', 'API', 'Guides', 'Status'],
    Legal: ['Privacy', 'Terms', 'Cookies', 'Security'],
  }

  return (
    <footer className="py-24 relative overflow-hidden" style={{ backgroundColor: '#0D0D1A' }}>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-12 mb-20">
          <div className="col-span-2">
            <p className="font-display text-5xl mb-6 max-text-shadow-single" style={{ color: tokens.accent2 }}>{PRODUCT_NAME}</p>
            <p className="text-xl font-bold leading-relaxed p-4 border-4" style={{ color: tokens.foreground, borderColor: tokens.accent5, backgroundColor: `${tokens.accent1}20` }}>
              Building the future, one bold and chaotic feature at a time.
            </p>
          </div>
          {Object.entries(links).map(([group, items], i) => (
            <div key={group}>
              <p className="font-heading font-black uppercase text-2xl mb-6 inline-block pb-2 border-b-4" style={{ color: ACCENTS[i % 5], borderColor: ACCENTS[(i + 2) % 5] }}>{group}</p>
              <ul className="space-y-4">
                {items.map((item, j) => (
                  <li key={item}>
                    <motion.a
                      href="#"
                      whileHover={{ x: 10, color: ACCENTS[(i + j) % 5] }}
                      className="text-lg font-bold uppercase tracking-wider block transition-colors"
                      style={{ color: tokens.foreground }}
                    >
                      {item}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between pt-12 border-t-[8px] gap-8" style={{ borderColor: tokens.accent1 }}>
          <p className="text-xl font-bold uppercase tracking-widest p-3 border-4" style={{ color: tokens.foreground, borderColor: tokens.accent3 }}>
            © 2026 {PRODUCT_NAME}. ALL RIGHTS RESERVED.
          </p>
          <motion.a
            href="/"
            whileHover={{ scale: 1.1, rotate: -2 }}
            className="text-lg font-black uppercase tracking-widest px-6 py-3 border-[6px]"
            style={{ borderColor: tokens.accent2, color: tokens.accent4, boxShadow: `6px 6px 0px ${tokens.accent5}` }}
          >
            ← ALL STYLES
          </motion.a>
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
    <div className={`${bodyFont.variable} ${headingFont.variable} ${displayFont.variable} font-sans min-h-screen overflow-hidden`} style={{ backgroundColor: tokens.background, color: tokens.foreground }}>
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />
      <div className="fixed inset-0 pointer-events-none pattern-checker opacity-30 z-0" />
      <Navbar />
      <main className="relative z-10">
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
