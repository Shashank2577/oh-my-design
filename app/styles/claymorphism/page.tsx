'use client'

import { Nunito, DM_Sans } from 'next/font/google'
import {
  Star, Check, Layout, Palette, Code2, BarChart, Lock, Settings
} from 'lucide-react'
import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// 1. Font imports via next/font/google
const nunito = Nunito({
  subsets: ['latin'],
  weight: ['700', '800', '900'],
  variable: '--font-heading',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-body',
  display: 'swap',
})

// 3. Design token constants
const tokens = {
  background: '#F4F1FA',
  foreground: '#332F3A',
  muted: '#635F69',
  accent: '#7C3AED',
  accentSecondary: '#DB2777',
  accentTertiary: '#0EA5E9',
  success: '#10B981',
  warning: '#F59E0B',
  cardBg: 'rgba(255, 255, 255, 0.7)', // white/70
}

const shadows = {
  surface: '30px 30px 60px #cdc6d9, -30px -30px 60px #ffffff, inset 10px 10px 20px rgba(139, 92, 246, 0.05), inset -10px -10px 20px rgba(255, 255, 255, 0.8)',
  card: '16px 16px 32px rgba(160, 150, 180, 0.2), -10px -10px 24px rgba(255, 255, 255, 0.9), inset 6px 6px 12px rgba(139, 92, 246, 0.03), inset -6px -6px 12px rgba(255, 255, 255, 1)',
  cardHover: '20px 20px 40px rgba(160, 150, 180, 0.25), -12px -12px 30px rgba(255, 255, 255, 1), inset 6px 6px 12px rgba(139, 92, 246, 0.03), inset -6px -6px 12px rgba(255, 255, 255, 1)',
  button: '12px 12px 24px rgba(139, 92, 246, 0.3), -8px -8px 16px rgba(255, 255, 255, 0.4), inset 4px 4px 8px rgba(255, 255, 255, 0.4), inset -4px -4px 8px rgba(0, 0, 0, 0.1)',
  buttonHover: '16px 16px 32px rgba(139, 92, 246, 0.4), -10px -10px 20px rgba(255, 255, 255, 0.5), inset 4px 4px 8px rgba(255, 255, 255, 0.4), inset -4px -4px 8px rgba(0, 0, 0, 0.1)',
  pressed: 'inset 10px 10px 20px #d9d4e3, inset -10px -10px 20px #ffffff',
}

const EASE = [0.23, 1, 0.32, 1] as const;

function AnimatedSection({ children, className, delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) {
  return (
    <motion.section
      className={className}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </motion.section>
  )
}

function AnimatedButton({ children, className, style, hoverShadow, activeShadow, ...props }: any) {
  return (
    <motion.button
      className={className}
      style={style}
      whileHover={{ scale: 1.02, boxShadow: hoverShadow }}
      whileTap={{ scale: 0.98, boxShadow: activeShadow }}
      transition={{ duration: 0.3, ease: EASE }}
      {...props}
    >
      {children}
    </motion.button>
  )
}

function AnimatedCard({ children, className, style, hoverShadow }: any) {
  return (
    <motion.div
      className={className}
      style={style}
      whileHover={{ y: -5, boxShadow: hoverShadow }}
      transition={{ duration: 0.4, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

function AnimatedFAQ({ question, answer, tokens, shadows }: any) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div
      className="p-6 md:p-8 rounded-[32px] cursor-pointer backdrop-blur-xl"
      style={{ backgroundColor: tokens.cardBg, boxShadow: shadows.card }}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex justify-between items-center gap-4">
        <h3 className="font-black text-xl" style={{ fontFamily: 'var(--font-heading)', color: tokens.foreground }}>
          {question}
        </h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
          style={{ backgroundColor: tokens.background, boxShadow: shadows.button }}
        >
          <span style={{ color: tokens.accent, fontWeight: 'bold' }}>↓</span>
        </motion.div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="pt-4 font-medium" style={{ color: tokens.muted }}>
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function AnimatedNewsletterForm({ tokens, shadows }: any) {
  return (
    <form className="relative z-10 flex flex-col sm:flex-row gap-4 max-w-xl mx-auto" onSubmit={(e) => e.preventDefault()}>
      <motion.input
        type="email"
        placeholder="Enter your email"
        className="flex-grow h-14 px-6 rounded-[24px] bg-transparent outline-none font-bold"
        style={{ color: tokens.foreground, boxShadow: shadows.pressed }}
        whileFocus={{ scale: 1.01 }}
        transition={{ duration: 0.3, ease: EASE }}
      />
      <AnimatedButton
        className="h-14 px-8 rounded-[24px] font-bold text-white whitespace-nowrap"
        style={{ background: `linear-gradient(to bottom right, #A78BFA, ${tokens.accent})`, boxShadow: shadows.button }}
        hoverShadow={shadows.buttonHover}
        activeShadow={shadows.pressed}
      >
        Subscribe Now
      </AnimatedButton>
    </form>
  )
}

function BackgroundBlobs() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <motion.div
        animate={{
          y: [0, -30, 0],
          x: [0, 20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: EASE
        }}
        className="absolute top-[10%] left-[5%] w-96 h-96 rounded-full blur-3xl opacity-20"
        style={{ backgroundColor: '#7C3AED' }}
      />
      <motion.div
        animate={{
          y: [0, 40, 0],
          x: [0, -20, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: EASE
        }}
        className="absolute bottom-[10%] right-[5%] w-[30rem] h-[30rem] rounded-full blur-3xl opacity-20"
        style={{ backgroundColor: '#DB2777' }}
      />
    </div>
  )
}

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────
const PRODUCT_NAME = 'ClayFlow'
const TAGLINE = 'A tactile workspace for playful teams'
const DESCRIPTION = 'Squishy, bouncy, and deeply satisfying. Work doesn\'t have to feel like work when your tools are this fun to use.'

const NAV_LINKS = ['Features', 'Pricing', 'Testimonials', 'FAQ']

const STATS = [
  { value: '50K+', label: 'Happy Users', color: 'from-[#A78BFA] to-[#7C3AED]' },
  { value: '99.9%', label: 'Uptime', color: 'from-[#F472B6] to-[#DB2777]' },
  { value: '140+', label: 'Countries', color: 'from-[#38BDF8] to-[#0EA5E9]' },
  { value: '4.9/5', label: 'Rating', color: 'from-[#34D399] to-[#10B981]' },
]

const FEATURES = [
  { icon: Layout, title: 'Bouncy Layouts', description: 'Everything snaps into place with satisfying, physics-based precision.' },
  { icon: Palette, title: 'Candy Colors', description: 'A vibrant palette that keeps your team energized and focused.' },
  { icon: Settings, title: 'Squishy Controls', description: 'Sliders and toggles that feel like you\'re playing with premium digital clay.' },
  { icon: Code2, title: 'No-Code Magic', description: 'Build complex workflows without writing a single line of boring code.' },
  { icon: BarChart, title: 'Puffy Analytics', description: 'Charts so thick and satisfying you\'ll want to reach out and squeeze them.' },
  { icon: Lock, title: 'Solid Security', description: 'Fort Knox level protection wrapped in a friendly, approachable exterior.' },
]

const PRICING = [
  {
    name: 'Starter',
    price: '$0',
    period: 'forever',
    description: 'Perfect for individuals getting started with digital clay.',
    features: ['3 Projects', 'Basic Colors', 'Standard Support'],
    cta: 'Start Free',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$19',
    period: 'per month',
    description: 'For growing teams that need more squish and bounce.',
    features: ['Unlimited Projects', 'Custom Palettes', 'Priority Support', 'Advanced Analytics'],
    cta: 'Get Pro',
    highlighted: true,
  },
  {
    name: 'Studio',
    price: '$49',
    period: 'per month',
    description: 'For large organizations with complex, tactile needs.',
    features: ['Everything in Pro', 'Custom Domains', '24/7 Support', 'Dedicated Manager'],
    cta: 'Contact Sales',
    highlighted: false,
  },
]

const TESTIMONIALS = [
  {
    name: 'Mia Wong',
    role: 'Creative Director',
    company: 'Squish Design',
    text: 'I\'ve never used software that felt so... tangible. It\'s like molding ideas with my bare hands.',
    rating: 5,
  },
  {
    name: 'Leo Patel',
    role: 'Product Manager',
    company: 'Bouncy Inc',
    text: 'Our team\'s productivity skyrocketed because everyone actually enjoys interacting with the interface.',
    rating: 5,
  },
  {
    name: 'Zoe Ramirez',
    role: 'Freelance Illustrator',
    company: 'Zoe Art',
    text: 'The colors and the subtle shadows make everything look so premium and inviting. I love it.',
    rating: 5,
  },
]

const FAQ_ITEMS = [
  { q: 'Is it actually clay?', a: 'Only digitally! We use advanced CSS box-shadows and backdrop filters to simulate the look and feel of premium, high-fidelity matte silicone.' },
  { q: 'Does it work on mobile?', a: 'Absolutely. The squishiness scales perfectly down to your phone, with touch targets designed for thumbs.' },
  { q: 'Can I change the colors?', a: 'Yes! Pro and Studio plans allow you to customize the candy-store palette to match your brand\'s specific flavor.' },
  { q: 'What happens if I press a button too hard?', a: 'It will squish delightfully, but no screens will be harmed in the process.' },
  { q: 'Is my data safe?', a: 'Yes, behind 256-bit encryption. Safe, secure, and softly rounded.' },
  { q: 'Do you offer a free trial?', a: 'We have a free-forever plan! You can poke around as long as you like.' },
]

// ─────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────
export default function StylePage() {
  return (
    <div className={`${dmSans.variable} ${nunito.variable} font-sans min-h-screen relative overflow-hidden`} style={{ backgroundColor: tokens.background }}>
      <BackgroundBlobs />
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

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 pt-4 px-4 md:px-6">
      <div
        className="max-w-5xl mx-auto h-16 md:h-20 rounded-[32px] md:rounded-[40px] flex items-center justify-between px-6 backdrop-blur-xl"
        style={{ backgroundColor: tokens.cardBg, boxShadow: shadows.card }}
      >
        <span className="font-heading font-black text-xl tracking-tight" style={{ color: tokens.accent, fontFamily: 'var(--font-heading)' }}>
          {PRODUCT_NAME}
        </span>
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-base font-bold transition-colors hover:opacity-80"
              style={{ color: tokens.muted }}
            >
              {link}
            </a>
          ))}
        </div>
        <AnimatedButton
          className="h-11 px-6 rounded-[20px] font-bold text-white text-sm"
          style={{ background: `linear-gradient(to bottom right, #A78BFA, ${tokens.accent})`, boxShadow: shadows.button }}
          hoverShadow={shadows.buttonHover}
          activeShadow={shadows.pressed}
        >
          Get Started
        </AnimatedButton>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section className="min-h-screen flex items-center pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <AnimatedSection delay={0.1} className="max-w-2xl text-center lg:text-left">
            <h1
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.1] mb-6"
              style={{ fontFamily: 'var(--font-heading)', color: tokens.foreground }}
            >
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(to right, ${tokens.foreground} 20%, ${tokens.accent} 60%, ${tokens.accentTertiary})` }}>
                {TAGLINE}
              </span>
            </h1>
            <p className="text-lg md:text-xl mb-10 leading-relaxed font-medium" style={{ color: tokens.muted }}>
              {DESCRIPTION}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <AnimatedButton
                className="h-16 px-8 rounded-[24px] font-bold text-white text-lg w-full sm:w-auto"
                style={{ background: `linear-gradient(to bottom right, #A78BFA, ${tokens.accent})`, boxShadow: shadows.button }}
                hoverShadow={shadows.buttonHover}
                activeShadow={shadows.pressed}
              >
                Start for free
              </AnimatedButton>
              <AnimatedButton
                className="h-16 px-8 rounded-[24px] font-bold text-lg w-full sm:w-auto bg-white"
                style={{ color: tokens.foreground, boxShadow: shadows.button }}
                hoverShadow={shadows.buttonHover}
                activeShadow={shadows.pressed}
              >
                View demo
              </AnimatedButton>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.4} className="relative hidden lg:block">
            {/* 3D Composition Placeholder */}
            <div
              className="w-full aspect-square rounded-[60px] relative overflow-hidden backdrop-blur-xl animate-[clay-float-slow_12s_ease-in-out_infinite]"
              style={{ backgroundColor: tokens.cardBg, boxShadow: shadows.card }}
            >
                <div className="absolute top-10 right-10 w-32 h-32 rounded-full shadow-lg" style={{ background: `linear-gradient(to bottom right, #F472B6, ${tokens.accentSecondary})`, boxShadow: shadows.button }} />
                <div className="absolute bottom-10 left-10 w-48 h-48 rounded-[32px] shadow-lg" style={{ background: `linear-gradient(to bottom right, #38BDF8, ${tokens.accentTertiary})`, boxShadow: shadows.button }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full shadow-lg backdrop-blur-md" style={{ background: 'rgba(255,255,255,0.4)', boxShadow: shadows.card }} />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}

function Stats() {
  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {STATS.map((stat, i) => (
            <AnimatedSection key={stat.label} delay={i * 0.1}>
              <AnimatedCard
                className="p-8 text-center backdrop-blur-xl flex flex-col items-center justify-center rounded-[32px]"
                style={{ backgroundColor: tokens.cardBg, boxShadow: shadows.card }}
                hoverShadow={shadows.cardHover}
              >
                <div className="w-16 h-16 rounded-full mb-4 animate-[clay-breathe_6s_ease-in-out_infinite]" style={{ background: `linear-gradient(to bottom right, ${stat.color.split(' ')[1]}, ${stat.color.split(' ')[3]})`, boxShadow: shadows.button }} />
                <p className="text-4xl md:text-5xl font-black mb-1" style={{ fontFamily: 'var(--font-heading)', color: tokens.foreground }}>{stat.value}</p>
                <p className="text-sm font-bold tracking-wide uppercase" style={{ color: tokens.muted }}>{stat.label}</p>
              </AnimatedCard>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

function Features() {
  return (
    <section id="features" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-6" style={{ fontFamily: 'var(--font-heading)', color: tokens.foreground }}>
            Everything you need
          </h2>
          <p className="text-lg font-medium max-w-2xl mx-auto" style={{ color: tokens.muted }}>
            Playful, tactile features designed to make your daily tasks feel less like work and more like play.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, i) => (
            <AnimatedSection key={feature.title} delay={i * 0.1} className={i === 0 ? "md:col-span-2 md:row-span-2" : ""}>
               <AnimatedCard
                className={`p-8 h-full flex flex-col backdrop-blur-xl rounded-[32px]`}
                style={{ backgroundColor: tokens.cardBg, boxShadow: shadows.card }}
                hoverShadow={shadows.cardHover}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                  style={{ background: `linear-gradient(to bottom right, #A78BFA, ${tokens.accent})`, boxShadow: shadows.button }}
                >
                  <feature.icon className="h-6 w-6 text-white" strokeWidth={2.5} />
                </div>
                <h3 className={`font-black mb-3 ${i === 0 ? 'text-3xl' : 'text-2xl'}`} style={{ fontFamily: 'var(--font-heading)', color: tokens.foreground }}>{feature.title}</h3>
                <p className="font-medium leading-relaxed" style={{ color: tokens.muted }}>{feature.description}</p>
              </AnimatedCard>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProductDetail() {
  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <AnimatedSection className="order-2 lg:order-1">
             <div
              className="w-full aspect-square md:aspect-[4/3] rounded-[48px] relative overflow-hidden backdrop-blur-xl flex items-center justify-center p-8"
              style={{ backgroundColor: tokens.cardBg, boxShadow: shadows.card }}
            >
              <div className="w-full h-full rounded-[32px] overflow-hidden relative" style={{ boxShadow: shadows.pressed, backgroundColor: '#EFEBF5' }}>
                  {/* Abstract content inside pressed area */}
                  <div className="absolute top-8 left-8 w-1/2 h-12 rounded-[20px] bg-white shadow-sm" />
                  <div className="absolute top-24 left-8 w-3/4 h-8 rounded-[16px] bg-white shadow-sm" />
                  <div className="absolute top-36 left-8 w-2/3 h-8 rounded-[16px] bg-white shadow-sm" />

                  <div className="absolute bottom-8 right-8 w-16 h-16 rounded-full" style={{ background: `linear-gradient(to bottom right, #38BDF8, ${tokens.accentTertiary})`, boxShadow: shadows.button }} />
              </div>
            </div>
          </AnimatedSection>
          <AnimatedSection className="order-1 lg:order-2">
            <h2 className="text-4xl md:text-5xl font-black mb-6" style={{ fontFamily: 'var(--font-heading)', color: tokens.foreground }}>
              Built for the way you naturally work
            </h2>
            <div className="space-y-6">
              <p className="text-lg font-medium leading-relaxed" style={{ color: tokens.muted }}>
                We believe software should feel tangible. When you press a button, it should squish. When you drag an item, it should have weight.
              </p>
              <ul className="space-y-4">
                {['Tactile feedback on every interaction', 'Physics-based animations', 'Joyful color palettes'].map(item => (
                  <li key={item} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: tokens.success, boxShadow: shadows.button }}>
                      <Check className="w-4 h-4 text-white" strokeWidth={3} />
                    </div>
                    <span className="font-bold text-lg" style={{ color: tokens.foreground }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}

function Pricing() {
  return (
    <section id="pricing" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-6" style={{ fontFamily: 'var(--font-heading)', color: tokens.foreground }}>
            Simple, transparent pricing
          </h2>
          <p className="text-lg font-medium" style={{ color: tokens.muted }}>No surprises. Cancel anytime.</p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {PRICING.map((tier, i) => (
            <AnimatedSection key={tier.name} delay={i * 0.1}>
              <AnimatedCard
                className={`p-8 backdrop-blur-xl relative flex flex-col ${tier.highlighted ? 'rounded-[40px] md:scale-110 z-10' : 'rounded-[32px] opacity-90'}`}
                style={{
                  backgroundColor: tier.highlighted ? '#ffffff' : tokens.cardBg,
                  boxShadow: tier.highlighted ? shadows.cardHover : shadows.card
                }}
                hoverShadow={shadows.cardHover}
              >
                {tier.highlighted && (
                  <span
                    className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 text-sm font-bold uppercase tracking-wider rounded-full text-white"
                    style={{ background: `linear-gradient(to right, #F472B6, ${tokens.accentSecondary})`, boxShadow: shadows.button }}
                  >
                    Most popular
                  </span>
                )}
                <h3 className="font-black text-2xl mb-2" style={{ fontFamily: 'var(--font-heading)', color: tokens.foreground }}>{tier.name}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-5xl font-black" style={{ fontFamily: 'var(--font-heading)', color: tokens.foreground }}>{tier.price}</span>
                  <span className="text-sm font-bold" style={{ color: tokens.muted }}>/ {tier.period}</span>
                </div>
                <p className="text-sm font-medium mb-8 flex-grow" style={{ color: tokens.muted }}>{tier.description}</p>
                <ul className="space-y-4 mb-8">
                  {tier.features.map(f => (
                    <li key={f} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: tokens.success, boxShadow: shadows.button }}>
                        <Check className="w-3 h-3 text-white" strokeWidth={3} />
                      </div>
                      <span className="font-bold text-sm" style={{ color: tokens.foreground }}>{f}</span>
                    </li>
                  ))}
                </ul>
                <AnimatedButton
                  className={`w-full h-14 rounded-[20px] font-bold text-sm ${tier.highlighted ? 'text-white' : 'text-gray-900 bg-white'}`}
                  style={tier.highlighted
                    ? { background: `linear-gradient(to bottom right, #A78BFA, ${tokens.accent})`, boxShadow: shadows.button }
                    : { boxShadow: shadows.button }
                  }
                  hoverShadow={shadows.buttonHover}
                  activeShadow={shadows.pressed}
                >
                  {tier.cta}
                </AnimatedButton>
              </AnimatedCard>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

function Testimonials() {
  return (
    <section id="testimonials" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black" style={{ fontFamily: 'var(--font-heading)', color: tokens.foreground }}>
            Loved by playful teams
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, i) => (
            <AnimatedSection key={t.name} delay={i * 0.1}>
              <AnimatedCard
                className="p-8 rounded-[32px] backdrop-blur-xl h-full flex flex-col"
                style={{ backgroundColor: tokens.cardBg, boxShadow: shadows.card }}
                hoverShadow={shadows.cardHover}
              >
                <div className="flex mb-6 gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current text-yellow-400" />
                  ))}
                </div>
                <p className="text-lg font-medium leading-relaxed mb-8 flex-grow" style={{ color: tokens.foreground }}>&quot;{t.text}&quot;</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full" style={{ background: `linear-gradient(to bottom right, #A78BFA, ${tokens.accentTertiary})`, boxShadow: shadows.button }} />
                  <div>
                    <p className="font-black text-base" style={{ fontFamily: 'var(--font-heading)', color: tokens.foreground }}>{t.name}</p>
                    <p className="text-sm font-bold" style={{ color: tokens.muted }}>{t.role} · {t.company}</p>
                  </div>
                </div>
              </AnimatedCard>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQ() {
  return (
    <section id="faq" className="py-24">
      <div className="max-w-3xl mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black" style={{ fontFamily: 'var(--font-heading)', color: tokens.foreground }}>
            Common questions
          </h2>
        </AnimatedSection>

        <div className="space-y-6">
          {FAQ_ITEMS.map((item, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <AnimatedFAQ question={item.q} answer={item.a} tokens={tokens} shadows={shadows} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

function Newsletter() {
  return (
    <section className="py-24">
      <div className="max-w-4xl mx-auto px-6">
        <AnimatedSection>
           <div
            className="p-12 md:p-16 rounded-[48px] text-center backdrop-blur-xl relative overflow-hidden"
            style={{ backgroundColor: tokens.cardBg, boxShadow: shadows.card }}
          >
            <div className="absolute -top-24 -left-24 w-48 h-48 rounded-full blur-3xl opacity-50" style={{ backgroundColor: tokens.accent }} />
            <div className="absolute -bottom-24 -right-24 w-48 h-48 rounded-full blur-3xl opacity-50" style={{ backgroundColor: tokens.accentSecondary }} />

            <h2 className="text-4xl font-black mb-4 relative z-10" style={{ fontFamily: 'var(--font-heading)', color: tokens.foreground }}>Stay in the loop</h2>
            <p className="text-lg font-medium mb-10 relative z-10" style={{ color: tokens.muted }}>
              Get updates on new features and squishy releases.
            </p>

            <AnimatedNewsletterForm tokens={tokens} shadows={shadows} />
          </div>
        </AnimatedSection>
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
    <footer className="pt-24 pb-12 relative z-10">
      <div
        className="max-w-7xl mx-auto px-6 pt-16 pb-8 rounded-t-[60px] backdrop-blur-xl"
        style={{ backgroundColor: tokens.cardBg, boxShadow: shadows.card }}
      >
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-16 px-4 md:px-12">
          <div className="col-span-2 md:col-span-1">
            <p className="font-black text-2xl mb-4" style={{ fontFamily: 'var(--font-heading)', color: tokens.accent }}>{PRODUCT_NAME}</p>
            <p className="font-bold text-sm" style={{ color: tokens.muted }}>
              Building the future, one squish at a time.
            </p>
          </div>
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <p className="font-black text-lg mb-6" style={{ fontFamily: 'var(--font-heading)', color: tokens.foreground }}>{group}</p>
              <ul className="space-y-4">
                {items.map(item => (
                  <li key={item}>
                    <a href="#" className="font-bold text-sm hover:opacity-80 transition-opacity" style={{ color: tokens.muted }}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 px-4 md:px-12 border-t border-gray-200/50 gap-4">
          <p className="font-bold text-sm" style={{ color: tokens.muted }}>
            © 2026 {PRODUCT_NAME}. All rights reserved.
          </p>
          <a
            href="/"
            className="font-black text-sm px-6 py-3 rounded-full bg-white transition-all hover:-translate-y-1"
            style={{ color: tokens.foreground, boxShadow: shadows.button }}
          >
            ← All styles
          </a>
        </div>
      </div>
    </footer>
  )
}
