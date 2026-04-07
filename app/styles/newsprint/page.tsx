'use client'

/**
 * PAGE: Newsprint
 */

import { motion, useReducedMotion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Playfair_Display, Source_Serif_4, Inter } from 'next/font/google'
import {
  Star, ChevronDown, ArrowRight, Check, BookOpen, Layout,
  Palette, Code2, BarChart, Lock
} from 'lucide-react'

// ─────────────────────────────────────────────
// FONTS
// ─────────────────────────────────────────────
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-source-serif',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

// ─────────────────────────────────────────────
// DESIGN TOKENS (Newsprint)
// ─────────────────────────────────────────────
const tokens = {
  background: '#F9F7F1',     // Warm off-white/cream paper
  backgroundAlt: '#F2EFE9',  // Slightly darker cream for panels
  foreground: '#1A1A1A',     // Deep ink black
  muted: '#E5E2DA',          // Light gray for borders/backgrounds
  mutedForeground: '#5A5A5A',// Gray ink
  border: '#1A1A1A',         // Black ruled lines
  accent: '#B22222',         // Editorial red accent
  accentForeground: '#FFFFFF',
}

// ─────────────────────────────────────────────
// MOTION HELPERS
// ─────────────────────────────────────────────
const springEase = [0.23, 1, 0.32, 1] as const

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-5% 0px' })
  const shouldReduce = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      initial={shouldReduce ? false : { opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: springEase }}
    >
      {children}
    </motion.div>
  )
}

function StaggerContainer({ children, className, style }: { children: React.ReactNode; className?: string, style?: React.CSSProperties }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-5% 0px' })
  const shouldReduce = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
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

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: springEase } },
}

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────
const PRODUCT_NAME = 'THE DAILY GAZETTE'
const TAGLINE = 'Publishing for the Modern Era'
const DESCRIPTION = 'A robust editorial platform designed to elevate your content, combining the timeless aesthetic of broadsheet journalism with cutting-edge digital performance.'

const NAV_LINKS = ['Features', 'About', 'Pricing', 'Testimonials', 'FAQ']

const STATS = [
  { value: '1.2M', label: 'Daily Readers' },
  { value: '14+', label: 'Years in Print' },
  { value: '500k', label: 'Subscribers' },
  { value: '99%', label: 'Fact-Check Accuracy' },
]

const FEATURES = [
  { icon: BookOpen, title: 'Editorial Control', description: 'Complete oversight over publishing workflows, from draft to final print.' },
  { icon: Layout, title: 'Column Layouts', description: 'Authentic multi-column grid systems that adapt flawlessly to any screen.' },
  { icon: Palette, title: 'Typography Engine', description: 'Advanced kerning, hyphenation, and drop-cap support for perfect reading.' },
  { icon: Code2, title: 'Clean Architecture', description: 'Built on a lightning-fast static generation framework.' },
  { icon: BarChart, title: 'Reader Analytics', description: 'Deep insights into subscriber engagement and article performance.' },
  { icon: Lock, title: 'Paywall Integration', description: 'Flexible monetization strategies with secure, seamless access control.' },
]

const PRICING = [
  {
    name: 'Local Edition',
    price: '$0',
    period: 'free forever',
    description: 'Perfect for independent writers starting out.',
    features: ['1 Publication', 'Basic analytics', 'Standard layouts', 'Community support'],
    cta: 'Start Writing',
    highlighted: false,
  },
  {
    name: 'National Desk',
    price: '$29',
    period: 'per month',
    description: 'For growing newsrooms and editorial teams.',
    features: ['Unlimited articles', 'Advanced analytics', 'Custom domains', 'Paywall features', 'Priority support'],
    cta: 'Subscribe Now',
    highlighted: true,
  },
  {
    name: 'Global Syndicate',
    price: '$99',
    period: 'per month',
    description: 'For enterprise media organizations.',
    features: ['Everything in National', 'Multi-site management', 'API access', 'Dedicated account manager', 'White-labeling'],
    cta: 'Contact Sales',
    highlighted: false,
  },
]

const TESTIMONIALS = [
  {
    name: 'Eleanor Vance',
    role: 'Editor-in-Chief',
    company: 'The Morning Standard',
    text: 'This platform brought the dignity of print back to our digital presence. The typographic control is unparalleled.',
    rating: 5,
  },
  {
    name: 'Jameson Locke',
    role: 'Investigative Journalist',
    company: 'Independent',
    text: 'A truly distraction-free writing environment that lets the story take center stage. Absolutely essential for my work.',
    rating: 5,
  },
  {
    name: 'Sarah Chen',
    role: 'Publisher',
    company: 'City Chronicle',
    text: 'Implementing their paywall increased our digital subscription revenue by 40% in just three months.',
    rating: 5,
  },
]

const FAQ_ITEMS = [
  { q: 'How do I migrate my existing content?', a: 'We offer automated import tools for WordPress, Ghost, and Substack. For enterprise clients, our team handles full white-glove migration.' },
  { q: 'Can I customize the typography?', a: 'Yes. While we provide curated editorial font pairings out-of-the-box, you have full CSS control over all typographic elements.' },
  { q: 'Is there a revenue share on subscriptions?', a: 'No. You keep 100% of your subscription revenue (minus standard Stripe processing fees). We only charge for the platform.' },
  { q: 'Do you support print-ready PDF export?', a: 'Yes, the Global Syndicate plan includes automated typesetting and CMYK-ready PDF exports.' },
  { q: 'What happens if I exceed my bandwidth limit?', a: 'We do not hard-cap bandwidth. If your publication goes viral, your site stays up. We will contact you to discuss upgrading if sustained traffic increases significantly.' },
  { q: 'Is the platform secure?', a: 'We employ enterprise-grade security, including regular penetration testing, DDoS protection, and strict access controls.' },
]

// ─────────────────────────────────────────────
// COMPONENTS
// ─────────────────────────────────────────────

function Navbar() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 border-b-2"
      style={{ borderColor: tokens.border, backgroundColor: tokens.background }}
    >
      <div className="border-b" style={{ borderColor: tokens.border }}>
        <div className="max-w-7xl mx-auto px-6 h-8 flex items-center justify-between text-xs font-serif uppercase tracking-widest" style={{ color: tokens.mutedForeground }}>
          <span>{mounted ? new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'Loading Date...'}</span>
          <span>Vol. CXXIV — No. 42</span>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <span className={`font-bold text-2xl tracking-tighter ${playfair.className}`} style={{ color: tokens.foreground }}>
          {PRODUCT_NAME}
        </span>
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className={`text-sm uppercase tracking-widest transition-colors hover:opacity-70 ${inter.className}`}
              style={{ color: tokens.foreground }}
            >
              {link}
            </a>
          ))}
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`px-6 h-10 border-2 text-xs font-bold uppercase tracking-widest ${inter.className}`}
          style={{ backgroundColor: tokens.foreground, color: tokens.background, borderColor: tokens.foreground }}
        >
          Subscribe
        </motion.button>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section className="pt-32 pb-16 border-b-4" style={{ backgroundColor: tokens.background, borderColor: tokens.foreground }}>
      <div className="max-w-6xl mx-auto px-6">
        <FadeUp>
          <div className="text-center border-b-2 pb-12 mb-12" style={{ borderColor: tokens.border }}>
            <h1 className={`text-6xl md:text-8xl font-black mb-6 leading-none ${playfair.className}`} style={{ color: tokens.foreground }}>
              {TAGLINE}
            </h1>
            <p className={`text-xl md:text-2xl max-w-3xl mx-auto italic ${sourceSerif.className}`} style={{ color: tokens.mutedForeground }}>
              {DESCRIPTION}
            </p>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-3 order-2 md:order-1 border-t-2 md:border-t-0 md:border-r-2 pt-8 md:pt-0 pr-0 md:pr-8" style={{ borderColor: tokens.border }}>
             <FadeUp delay={0.2}>
                <h3 className={`font-bold text-xl mb-4 uppercase ${inter.className}`} style={{ color: tokens.foreground }}>Latest Dispatches</h3>
                <ul className="space-y-6">
                  {[1, 2, 3].map((i) => (
                    <li key={i} className="border-b pb-4 last:border-0" style={{ borderColor: tokens.muted }}>
                      <span className={`text-xs font-bold uppercase tracking-widest mb-1 block ${inter.className}`} style={{ color: tokens.accent }}>Opinion</span>
                      <a href="#" className={`text-lg font-bold hover:underline leading-snug ${playfair.className}`} style={{ color: tokens.foreground }}>
                        The Future of Digital Typography Lies in the Past
                      </a>
                    </li>
                  ))}
                </ul>
             </FadeUp>
          </div>

          <div className="md:col-span-9 order-1 md:order-2">
            <FadeUp delay={0.1}>
              <div
                className="w-full aspect-[16/9] mb-6 grayscale hover:grayscale-0 transition-all duration-700 border-2"
                style={{ backgroundColor: tokens.muted, borderColor: tokens.border, backgroundImage: 'url("https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2070&auto=format&fit=crop")', backgroundSize: 'cover', backgroundPosition: 'center' }}
              />
              <div className="flex justify-between items-center border-b-2 pb-4 mb-4" style={{ borderColor: tokens.border }}>
                <span className={`text-sm uppercase tracking-widest font-bold ${inter.className}`} style={{ color: tokens.foreground }}>Lead Story</span>
                <span className={`text-sm italic ${sourceSerif.className}`} style={{ color: tokens.mutedForeground }}>By Editorial Board</span>
              </div>
              <h2 className={`text-4xl md:text-5xl font-bold mb-4 leading-tight ${playfair.className}`} style={{ color: tokens.foreground }}>
                A New Era for Digital Publishing Dawns as Traditional Boundaries Blur
              </h2>
              <div className={`text-lg leading-relaxed columns-1 md:columns-2 gap-8 ${sourceSerif.className}`} style={{ color: tokens.foreground }}>
                <p className="mb-4">
                  <span className="float-left text-6xl leading-none pr-2 pt-1 font-bold" style={{ color: tokens.accent }}>L</span>
                  orem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <p className="mb-4">
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
                <p>
                  Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est.
                </p>
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  )
}

function Stats() {
  return (
    <section className="py-12 border-b-2" style={{ borderColor: tokens.border, backgroundColor: tokens.backgroundAlt }}>
      <div className="max-w-6xl mx-auto px-6">
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x-0 md:divide-x-2" style={{ borderColor: tokens.border }}>
            {STATS.map((stat, i) => (
              <motion.div key={stat.label} variants={staggerItem} className={`text-center px-4 ${i !== 0 ? 'border-t-2 md:border-t-0 pt-6 md:pt-0' : ''}`} style={{ borderColor: tokens.border }}>
                <p className={`text-5xl font-black mb-2 ${playfair.className}`} style={{ color: tokens.foreground }}>{stat.value}</p>
                <p className={`text-xs uppercase tracking-widest font-bold ${inter.className}`} style={{ color: tokens.mutedForeground }}>{stat.label}</p>
              </motion.div>
            ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

function Features() {
  return (
    <section id="features" className="py-20 border-b-2" style={{ backgroundColor: tokens.background, borderColor: tokens.border }}>
      <div className="max-w-6xl mx-auto px-6">
        <FadeUp>
          <div className="text-center mb-16 border-b-2 pb-8" style={{ borderColor: tokens.border }}>
            <h2 className={`text-4xl md:text-5xl font-black uppercase tracking-tight mb-4 ${playfair.className}`} style={{ color: tokens.foreground }}>
              Features of Note
            </h2>
            <p className={`text-xl italic ${sourceSerif.className}`} style={{ color: tokens.mutedForeground }}>
              Comprehensive tools for the modern newsroom.
            </p>
          </div>
        </FadeUp>
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {FEATURES.map(feature => (
              <motion.div
                key={feature.title}
                variants={staggerItem}
                className="relative"
              >
                <div className="border-t-4 mb-4" style={{ borderColor: tokens.foreground, width: '40px' }} />
                <h3 className={`font-bold text-2xl mb-3 ${playfair.className}`} style={{ color: tokens.foreground }}>{feature.title}</h3>
                <p className={`text-base leading-relaxed ${sourceSerif.className}`} style={{ color: tokens.foreground }}>{feature.description}</p>
              </motion.div>
            ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

function ProductDetail() {
  return (
    <section className="py-20 border-b-4" style={{ borderColor: tokens.foreground, backgroundColor: tokens.backgroundAlt }}>
      <div className="max-w-4xl mx-auto px-6">
        <FadeUp>
          <div className="border-2 p-8 md:p-12" style={{ borderColor: tokens.border, backgroundColor: tokens.background }}>
            <div className="text-center mb-8 border-b-2 pb-8" style={{ borderColor: tokens.border }}>
               <span className={`text-xs uppercase tracking-widest font-bold block mb-2 ${inter.className}`} style={{ color: tokens.accent }}>Editorial Vision</span>
              <h2 className={`text-4xl md:text-5xl font-black ${playfair.className}`} style={{ color: tokens.foreground }}>
                The Manifesto
              </h2>
            </div>
            <div className={`space-y-6 text-lg leading-relaxed columns-1 md:columns-2 gap-8 ${sourceSerif.className}`} style={{ color: tokens.foreground }}>
              <p>
                <span className="float-left text-6xl leading-none pr-2 pt-1 font-bold" style={{ color: tokens.foreground }}>W</span>
                e believe that reading should be a pleasure, not a chore. The screen is a new canvas, but the principles of good typography and layout remain unchanged since Gutenberg.
              </p>
              <p>
                Our platform honors the tradition of print by bringing column grids, strict baselines, and thoughtful typographic pairings to the web, ensuring your words carry the weight they deserve.
              </p>
               <p>
                 In an era of fleeting attention spans, a well-crafted reading experience is a competitive advantage. It signals authority, commands respect, and fosters deep engagement.
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
    <section id="pricing" className="py-20 border-b-2" style={{ backgroundColor: tokens.background, borderColor: tokens.border }}>
      <div className="max-w-6xl mx-auto px-6">
        <FadeUp>
          <div className="text-center mb-16 border-b-2 pb-8" style={{ borderColor: tokens.border }}>
            <h2 className={`text-4xl md:text-5xl font-black uppercase tracking-tight mb-4 ${playfair.className}`} style={{ color: tokens.foreground }}>Subscription Tiers</h2>
            <p className={`text-xl italic ${sourceSerif.className}`} style={{ color: tokens.mutedForeground }}>Select the edition that suits your needs.</p>
          </div>
        </FadeUp>
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PRICING.map(tier => (
              <motion.div
                key={tier.name}
                variants={staggerItem}
                className="p-8 border-2 flex flex-col"
                style={{
                  borderColor: tokens.border,
                  backgroundColor: tier.highlighted ? tokens.foreground : tokens.backgroundAlt,
                  color: tier.highlighted ? tokens.background : tokens.foreground
                }}
              >
                <div className="border-b-2 pb-6 mb-6" style={{ borderColor: tier.highlighted ? tokens.background : tokens.border }}>
                  <h3 className={`font-black text-2xl mb-2 uppercase ${playfair.className}`}>{tier.name}</h3>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className={`text-4xl font-bold ${inter.className}`}>{tier.price}</span>
                    <span className={`text-sm italic ${sourceSerif.className}`}>/ {tier.period}</span>
                  </div>
                  <p className={`text-sm italic ${sourceSerif.className}`}>{tier.description}</p>
                </div>

                <ul className={`space-y-4 mb-8 flex-grow ${sourceSerif.className}`}>
                  {tier.features.map(f => (
                    <li key={f} className="flex items-start gap-3 text-base">
                      <span className="mt-1" style={{ color: tier.highlighted ? tokens.background : tokens.accent }}>■</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full h-12 border-2 font-bold uppercase tracking-widest text-xs ${inter.className}`}
                  style={tier.highlighted
                    ? { backgroundColor: tokens.background, color: tokens.foreground, borderColor: tokens.background }
                    : { backgroundColor: tokens.foreground, color: tokens.background, borderColor: tokens.foreground }
                  }
                >
                  {tier.cta}
                </motion.button>
              </motion.div>
            ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

function Testimonials() {
  return (
    <section id="testimonials" className="py-20 border-b-2" style={{ borderColor: tokens.border, backgroundColor: tokens.backgroundAlt }}>
      <div className="max-w-6xl mx-auto px-6">
        <FadeUp>
          <div className="text-center mb-16 border-b-2 pb-8" style={{ borderColor: tokens.border }}>
            <h2 className={`text-4xl md:text-5xl font-black uppercase tracking-tight mb-4 ${playfair.className}`} style={{ color: tokens.foreground }}>Letters to the Editor</h2>
          </div>
        </FadeUp>
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map(t => (
              <motion.div
                key={t.name}
                variants={staggerItem}
                className="p-8 border-2 border-b-8"
                style={{ borderColor: tokens.border, backgroundColor: tokens.background }}
              >
                <div className="flex mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" style={{ color: tokens.accent }} />
                  ))}
                </div>
                <p className={`text-lg leading-relaxed italic mb-8 ${sourceSerif.className}`} style={{ color: tokens.foreground }}>&ldquo;{t.text}&rdquo;</p>
                <div className="border-t-2 pt-4" style={{ borderColor: tokens.border }}>
                  <p className={`font-bold text-sm uppercase tracking-wider ${inter.className}`} style={{ color: tokens.foreground }}>{t.name}</p>
                  <p className={`text-sm italic ${sourceSerif.className}`} style={{ color: tokens.mutedForeground }}>{t.role}, {t.company}</p>
                </div>
              </motion.div>
            ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="py-20 border-b-4" style={{ backgroundColor: tokens.background, borderColor: tokens.foreground }}>
      <div className="max-w-3xl mx-auto px-6">
        <FadeUp>
          <div className="text-center mb-16 border-b-2 pb-8" style={{ borderColor: tokens.border }}>
            <h2 className={`text-4xl md:text-5xl font-black uppercase tracking-tight mb-4 ${playfair.className}`} style={{ color: tokens.foreground }}>Inquiries & Clarifications</h2>
          </div>
        </FadeUp>
        <div className="space-y-0 border-t-2 border-b-2" style={{ borderColor: tokens.border }}>
          {FAQ_ITEMS.map((item, i) => (
            <FadeUp key={i} delay={i * 0.05}>
              <div className="border-b-2 last:border-b-0" style={{ borderColor: tokens.border }}>
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  aria-expanded={openIndex === i}
                  className="w-full flex items-center justify-between py-6 text-left"
                >
                  <span className={`font-bold text-xl ${playfair.className}`} style={{ color: tokens.foreground }}>{item.q}</span>
                  <motion.span
                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: springEase }}
                  >
                    <ChevronDown className="h-6 w-6 flex-shrink-0" style={{ color: tokens.foreground }} />
                  </motion.span>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openIndex === i ? 'auto' : 0, opacity: openIndex === i ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: springEase }}
                  style={{ overflow: 'hidden' }}
                >
                  <p className={`pb-6 text-lg leading-relaxed ${sourceSerif.className}`} style={{ color: tokens.foreground }}>
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
    <section className="py-24 border-b-2" style={{ borderColor: tokens.border, backgroundColor: tokens.backgroundAlt }}>
      <div className="max-w-2xl mx-auto px-6 text-center">
        <FadeUp>
          <h2 className={`text-4xl md:text-5xl font-black uppercase tracking-tight mb-4 ${playfair.className}`} style={{ color: tokens.foreground }}>The Sunday Edition</h2>
          <p className={`text-xl italic mb-8 ${sourceSerif.className}`} style={{ color: tokens.mutedForeground }}>
            A weekly dispatch of our finest long-form essays, delivered to your inbox.
          </p>
          {status === 'success' ? (
             <div className="border-2 p-4" style={{ borderColor: tokens.border, backgroundColor: tokens.background }}>
                <p className={`font-bold text-lg ${playfair.className}`} style={{ color: tokens.foreground }}>Subscription Confirmed.</p>
             </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-0 border-2" style={{ borderColor: tokens.border }}>
              <label htmlFor="newsletter-email" className="sr-only">Email address</label>
              <input
                id="newsletter-email"
                type="email"
                required
                autoComplete="email"
                placeholder="reader@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className={`flex-1 h-14 px-4 text-lg focus:outline-none ${sourceSerif.className}`}
                style={{ backgroundColor: tokens.background, color: tokens.foreground }}
              />
              <motion.button
                type="submit"
                disabled={status === 'loading'}
                className={`h-14 px-8 font-bold uppercase tracking-widest text-xs border-l-2 disabled:opacity-60 ${inter.className}`}
                style={{ backgroundColor: tokens.foreground, color: tokens.background, borderColor: tokens.border }}
              >
                {status === 'loading' ? 'Submitting...' : 'Subscribe'}
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
    Sections: ['Politics', 'Business', 'Technology', 'Arts & Culture'],
    Company: ['Masthead', 'Careers', 'Ethics Policy', 'Contact'],
    Services: ['Subscriptions', 'Syndication', 'Archives', 'Crossword'],
    Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Settings'],
  }

  return (
    <footer className="py-16 pb-8" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-16">
          <div className="col-span-2 md:col-span-1">
            <p className={`font-black text-xl mb-4 leading-tight uppercase ${playfair.className}`} style={{ color: tokens.foreground }}>{PRODUCT_NAME}</p>
            <p className={`text-sm leading-relaxed italic ${sourceSerif.className}`} style={{ color: tokens.mutedForeground }}>
               Printed digitally since 2010. All the news that's fit to parse.
            </p>
          </div>
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <p className={`font-bold text-xs uppercase tracking-widest mb-6 ${inter.className}`} style={{ color: tokens.foreground }}>{group}</p>
              <ul className={`space-y-3 ${sourceSerif.className}`}>
                {items.map(item => (
                  <li key={item}>
                    <a href="#" className="text-base hover:underline" style={{ color: tokens.mutedForeground }}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between pt-6 border-t-2 gap-4" style={{ borderColor: tokens.border }}>
          <p className={`text-sm uppercase tracking-widest font-bold ${inter.className}`} style={{ color: tokens.foreground }}>
            © {new Date().getFullYear()} {PRODUCT_NAME}
          </p>
          <a
            href="/"
            className={`text-xs uppercase tracking-widest font-bold hover:underline ${inter.className}`}
            style={{ color: tokens.accent }}
          >
            ← Return to Directory
          </a>
        </div>
      </div>
    </footer>
  )
}

// ─────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────
export default function NewsprintPage() {
  return (
    <div className={`min-h-screen selection:bg-black selection:text-white ${inter.variable} ${sourceSerif.variable} ${playfair.variable}`} style={{ backgroundColor: tokens.background }}>
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
