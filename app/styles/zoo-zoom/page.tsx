'use client'

import { motion, useReducedMotion, useInView, useScroll, useTransform, useSpring } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Syncopate, Space_Grotesk } from 'next/font/google'
import {
  Compass, ChevronDown, ArrowRight, Check, MapPin,
  Search, Eye, Globe, Navigation, ArrowUpRight
} from 'lucide-react'

// ─────────────────────────────────────────────
// FONTS
// ─────────────────────────────────────────────
const primaryFont = Syncopate({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-primary',
  display: 'swap',
})

const secondaryFont = Space_Grotesk({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-secondary',
  display: 'swap',
})

// ─────────────────────────────────────────────
// DESIGN TOKENS
// ─────────────────────────────────────────────
const tokens = {
  background: '#0A0A0A',
  backgroundAlt: '#111111',
  surface: 'rgba(255, 255, 255, 0.05)',
  foreground: '#FFFFFF',
  muted: '#2A2A2A',
  mutedForeground: '#BDBDBD',
  border: 'rgba(255, 255, 255, 0.2)',
  accent1: '#8BC34A',
  accent2: '#E91E63',
}

// ─────────────────────────────────────────────
// MOTION HELPERS
// ─────────────────────────────────────────────
function SpatialReveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number, className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-5% 0px' })
  const shouldReduce = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      initial={shouldReduce ? false : { opacity: 0, scale: 1.1, z: -100 }}
      animate={isInView ? { opacity: 1, scale: 1, z: 0 } : {}}
      transition={{ duration: 1.2, ease: "circOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function StaggerSpatial({ children }: { children: React.ReactNode }) {
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
        visible: { transition: { staggerChildren: 0.15 } },
      }}
    >
      {children}
    </motion.div>
  )
}

const staggerItem: import('framer-motion').Variants = {
  hidden: { opacity: 0, y: 50, rotateX: 20 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 }
  },
}

function PanningBackground() {
    const shouldReduce = useReducedMotion()

    if (shouldReduce) return null

    return (
        <div className="absolute inset-0 z-0 overflow-hidden opacity-30 pointer-events-none">
            {/* Simulating a panoramic view with rotating gradients */}
            <motion.div
                className="absolute -inset-[100%]"
                style={{
                    background: `conic-gradient(from 0deg, ${tokens.background}, ${tokens.accent1}10, ${tokens.background}, ${tokens.accent2}10, ${tokens.background})`,
                    filter: 'blur(100px)'
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            />
        </div>
    )
}

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────
const PRODUCT_NAME = 'ZOOZOOM'
const TAGLINE = 'WILDLIFE. UNBOUND.'
const DESCRIPTION = 'Step through the portal. Experience the worlds most diverse habitats in stunning 360-degree panoramas, bringing conservation to your living room.'

const NAV_LINKS = ['Habitats', 'Species', 'Conservation', 'VR Access']

const STATS = [
  { value: '360°', label: 'Immersive Views' },
  { value: '50+', label: 'Global Habitats' },
  { value: '4K', label: 'Resolution' },
  { value: 'LIVE', label: 'Audio Feeds' },
]

const FEATURES = [
  { icon: Eye, title: 'Panoramic Vision', description: 'Look around freely with mouse, touch, or gyroscope controls in our custom 360-degree player.' },
  { icon: Search, title: 'Micro-Zoom', description: 'Zoom in up to 100x to see the intricate details of a poison dart frog or a butterfly\'s wing.' },
  { icon: Globe, title: 'Live Climate Data', description: 'Real-time temperature, humidity, and weather overlays matched to the physical habitat.' },
  { icon: Navigation, title: 'Spatial Audio', description: 'Directional soundscapes that change as you rotate your view, putting you in the center of the jungle.' },
  { icon: MapPin, title: 'Global Waypoints', description: 'Instantly travel between connected biomes—from the Amazon to the Congo—with a single click.' },
  { icon: Check, title: 'Conservation Impact', description: 'Every minute watched contributes to our partner wildlife funds protecting these exact locations.' },
]

const PRICING = [
  {
    name: 'Explorer',
    price: '$0',
    period: 'forever',
    description: 'A glimpse into the wild.',
    features: ['5 basic habitats', '720p resolution', 'Standard audio', 'Desktop/Mobile only'],
    cta: 'Start Exploring',
    highlighted: false,
  },
  {
    name: 'Naturalist',
    price: '$12',
    period: '/month',
    description: 'Full immersion for nature lovers.',
    features: ['All 50+ habitats', '4K resolution', 'Spatial Audio', 'VR Headset support', 'Live weather overlays'],
    cta: 'Unlock the Wild',
    highlighted: true,
  },
  {
    name: 'Expedition',
    price: '$29',
    period: '/month',
    description: 'The ultimate tool for educators and enthusiasts.',
    features: ['Everything in Naturalist', '8K resolution options', 'Private guided tours (AI)', 'Downloadable offline zones', 'Commercial license'],
    cta: 'Join Expedition',
    highlighted: false,
  },
]

const TESTIMONIALS = [
  {
    name: 'Dr. Jane M.',
    role: 'Conservation Biologist',
    company: 'Earth First',
    text: 'ZooZoom brings the field to the classroom. The spatial audio alone is revolutionizing how my students understand biome density.',
    rating: 5,
  },
  {
    name: 'Marcus K.',
    role: 'VR Enthusiast',
    company: 'Tech Reviews',
    text: 'I put on my headset and spent three hours just sitting in the virtual Serengeti. It’s breathtakingly realistic.',
    rating: 5,
  },
  {
    name: 'Sarah L.',
    role: 'Parent',
    company: 'Homeschool',
    text: 'My kids are obsessed. They can "travel" to the Amazon rainforest before breakfast. It’s the best educational tool we own.',
    rating: 5,
  },
]

const FAQ_ITEMS = [
  { q: 'Do I need a VR headset?', a: 'No! While ZooZoom is incredible in VR, our 360-degree panoramas work perfectly in your standard web browser or mobile device using click-and-drag or gyroscope.' },
  { q: 'Are these live feeds?', a: 'They are high-definition, 24-hour recorded loops combined with live data overlays (weather, time of day) to ensure the highest possible visual quality without buffering.' },
  { q: 'How does it help conservation?', a: 'We pledge 20% of all subscription revenue directly to the wildlife reserves and parks featured on our platform to help protect the real habitats.' },
  { q: 'What internet speed do I need?', a: 'For the standard 720p experience, a basic 5Mbps connection is fine. For 4K VR immersion, we recommend at least 25Mbps.' },
  { q: 'Can I use this in my classroom?', a: 'Yes, our Expedition tier includes educational licenses, lesson plans, and the ability to host guided group "dives" into specific habitats.' },
  { q: 'What habitats are coming next?', a: 'We release a new biome every quarter. Next up: The Deep Sea Thermal Vents and the High Himalayas.' },
]

// ─────────────────────────────────────────────
// COMPONENTS
// ─────────────────────────────────────────────

function Navbar() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-md"
      style={{ borderColor: tokens.border, backgroundColor: 'rgba(10, 10, 10, 0.7)' }}
    >
      <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
        <div className="flex items-center gap-3">
            <Compass className="h-8 w-8" style={{ color: tokens.accent1 }} strokeWidth={1.5} />
            <span className="font-primary font-bold text-2xl tracking-widest uppercase" style={{ color: tokens.foreground }}>
            {PRODUCT_NAME}
            </span>
        </div>
        <div className="hidden md:flex items-center gap-12">
          {NAV_LINKS.map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="font-secondary text-sm font-medium uppercase tracking-widest transition-colors hover:opacity-70"
              style={{ color: tokens.foreground }}
            >
              {link}
            </a>
          ))}
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 font-secondary font-medium uppercase tracking-widest text-xs border"
          style={{ borderColor: tokens.accent1, color: tokens.accent1, backgroundColor: 'transparent' }}
        >
          Enter Portal
        </motion.button>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section className="min-h-dvh flex items-center pt-24 relative overflow-hidden perspective-1000" style={{ backgroundColor: tokens.background }}>
      <PanningBackground />

      <div className="max-w-7xl mx-auto px-6 py-24 w-full relative z-10 text-center">
        <SpatialReveal>
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 mb-12 border rounded-full backdrop-blur-sm"
            style={{ borderColor: tokens.border, backgroundColor: tokens.surface }}
            whileHover={{ scale: 1.05, borderColor: tokens.accent2 }}
          >
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: tokens.accent2 }} />
            <span className="font-secondary text-xs uppercase tracking-widest" style={{ color: tokens.mutedForeground }}>New Habitat: Amazon Canopy</span>
          </motion.div>

          <h1
            className="font-primary text-6xl md:text-8xl lg:text-9xl font-bold leading-[1.1] mb-8 tracking-tighter"
            style={{ color: tokens.foreground }}
          >
            {TAGLINE.split('. ').map((part, i) => (
                <span key={i} className="block">{part}{i === 0 ? '.' : ''}</span>
            ))}
          </h1>

          <p
            className="font-secondary text-lg md:text-xl mb-16 max-w-2xl mx-auto leading-relaxed"
            style={{ color: tokens.mutedForeground }}
          >
            {DESCRIPTION}
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: tokens.accent2, borderColor: tokens.accent2 }}
              whileTap={{ scale: 0.95 }}
              className="h-16 px-10 font-primary font-bold uppercase tracking-widest text-sm transition-colors border"
              style={{ backgroundColor: tokens.accent1, color: tokens.background, borderColor: tokens.accent1 }}
            >
              Start Exploring
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: tokens.surface }}
              whileTap={{ scale: 0.95 }}
              className="h-16 px-10 font-primary font-bold uppercase tracking-widest text-sm border flex items-center justify-center gap-3"
              style={{ borderColor: tokens.border, color: tokens.foreground }}
            >
              <Eye className="w-5 h-5" /> Watch Trailer
            </motion.button>
          </div>
        </SpatialReveal>
      </div>

      {/* Decorative compass lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20 flex items-center justify-center">
          <div className="w-[800px] h-[800px] rounded-full border border-dashed animate-[spin_120s_linear_infinite]" style={{ borderColor: tokens.border }} />
          <div className="absolute w-[600px] h-[600px] rounded-full border animate-[spin_60s_linear_infinite_reverse]" style={{ borderColor: tokens.border }} />
          <div className="absolute w-[1px] h-full" style={{ backgroundColor: tokens.border }} />
          <div className="absolute h-[1px] w-full" style={{ backgroundColor: tokens.border }} />
      </div>
    </section>
  )
}

function ExplorerMap() {
    const [zoomed, setZoomed] = useState(false)

    return (
        <section className="py-32 relative overflow-hidden" style={{ backgroundColor: tokens.backgroundAlt }}>
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="font-primary text-4xl md:text-5xl font-bold uppercase tracking-widest" style={{ color: tokens.foreground }}>Global Portal</h2>
                </div>

                <motion.div
                    className="relative w-full aspect-video rounded-3xl overflow-hidden cursor-crosshair border"
                    style={{ borderColor: tokens.border, backgroundColor: tokens.background }}
                    animate={{ scale: zoomed ? 1.05 : 1 }}
                    transition={{ duration: 1.5, ease: "circOut" }}
                >
                    {/* Placeholder for a 3D globe / map */}
                    <div className="absolute inset-0 opacity-40 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-center bg-no-repeat bg-contain filter invert" />

                    {/* Interactive Hotspots */}
                    {[
                        { top: '40%', left: '30%', name: 'Amazon Rainforest', color: tokens.accent1 },
                        { top: '60%', left: '55%', name: 'Serengeti', color: tokens.accent2 },
                        { top: '30%', left: '75%', name: 'Himalayas', color: '#FFF' },
                    ].map((spot, i) => (
                        <motion.div
                            key={i}
                            className="absolute flex flex-col items-center group"
                            style={{ top: spot.top, left: spot.left }}
                            whileHover={{ zIndex: 10 }}
                            onClick={() => setZoomed(!zoomed)}
                        >
                            <motion.div
                                className="w-6 h-6 rounded-full flex items-center justify-center relative"
                                style={{ backgroundColor: `${spot.color}30`, border: `1px solid ${spot.color}` }}
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ repeat: Infinity, duration: 2, delay: i * 0.5 }}
                            >
                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: spot.color }} />
                                {/* Scanning pulse */}
                                <motion.div
                                    className="absolute inset-0 rounded-full"
                                    style={{ border: `1px solid ${spot.color}` }}
                                    animate={{ scale: [1, 3], opacity: [1, 0] }}
                                    transition={{ repeat: Infinity, duration: 2, delay: i * 0.5 }}
                                />
                            </motion.div>
                            <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md px-4 py-2 border font-secondary text-xs uppercase tracking-widest whitespace-nowrap" style={{ borderColor: spot.color, backgroundColor: 'rgba(0,0,0,0.8)', color: spot.color }}>
                                {spot.name} <br/> <span className="text-white">Click to Dive</span>
                            </div>
                        </motion.div>
                    ))}

                    {/* Overlay effects based on zoom */}
                    <motion.div
                        className="absolute inset-0 pointer-events-none"
                        animate={{ opacity: zoomed ? 1 : 0 }}
                        style={{ background: 'radial-gradient(circle, transparent 30%, rgba(0,0,0,0.8) 100%)' }}
                    />
                </motion.div>
            </div>
        </section>
    )
}

function Stats() {
  return (
    <section className="py-24 border-y" style={{ borderColor: tokens.border, backgroundColor: tokens.background }}>
      <div className="max-w-7xl mx-auto px-6">
        <StaggerSpatial>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map(stat => (
              <motion.div key={stat.label} variants={staggerItem} className="text-center p-8 border" style={{ borderColor: tokens.border, backgroundColor: tokens.surface }}>
                <p className="font-primary text-4xl md:text-5xl font-bold mb-4 tracking-tighter" style={{ color: tokens.accent1 }}>{stat.value}</p>
                <p className="font-secondary text-xs uppercase tracking-widest" style={{ color: tokens.mutedForeground }}>{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </StaggerSpatial>
      </div>
    </section>
  )
}

function Features() {
  return (
    <section id="features" className="py-32" style={{ backgroundColor: tokens.backgroundAlt }}>
      <div className="max-w-7xl mx-auto px-6">
        <SpatialReveal>
          <div className="mb-20">
            <h2 className="font-primary text-5xl md:text-6xl font-bold uppercase tracking-tighter mb-6" style={{ color: tokens.foreground }}>
              Beyond Reality
            </h2>
            <div className="h-1 w-24" style={{ backgroundColor: tokens.accent2 }} />
          </div>
        </SpatialReveal>

        <StaggerSpatial>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FEATURES.map(feature => (
              <motion.div
                key={feature.title}
                variants={staggerItem}
                className="p-8 border bg-transparent relative group overflow-hidden"
                style={{ borderColor: tokens.border }}
              >
                {/* Hover bracket effect */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 transition-all group-hover:w-8 group-hover:h-8" style={{ borderColor: tokens.accent1 }} />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 transition-all group-hover:w-8 group-hover:h-8" style={{ borderColor: tokens.accent1 }} />

                <feature.icon className="h-8 w-8 mb-8" style={{ color: tokens.foreground }} strokeWidth={1} />
                <h3 className="font-primary font-bold text-xl uppercase tracking-widest mb-4" style={{ color: tokens.foreground }}>{feature.title}</h3>
                <p className="font-secondary text-sm leading-relaxed" style={{ color: tokens.mutedForeground }}>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </StaggerSpatial>
      </div>
    </section>
  )
}

function ProductDetail() {
  const { scrollYProgress } = useScroll()
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -100])

  return (
    <section className="py-40 border-y relative overflow-hidden" style={{ borderColor: tokens.border, backgroundColor: tokens.background }}>
      <div className="absolute inset-0 pointer-events-none opacity-10">
         <div className="w-full h-full border border-dashed" style={{ borderColor: tokens.border }} />
      </div>

      <div className="max-w-5xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
            <SpatialReveal>
            <div>
                <h2 className="font-primary text-4xl md:text-5xl font-bold uppercase tracking-tighter mb-8" style={{ color: tokens.foreground }}>
                Immersive Audio
                </h2>
                <div className="space-y-6 font-secondary">
                <p className="text-base leading-relaxed" style={{ color: tokens.mutedForeground }}>
                    Sight is only half the experience. Our proprietary spatial audio engine maps sound to your viewport in real-time.
                </p>
                <p className="text-base leading-relaxed" style={{ color: tokens.mutedForeground }}>
                    Turn left, and the rustle of leaves follows. Look up, and the call of a Macaw passes overhead.
                </p>
                <div className="pt-6">
                     <motion.button className="flex items-center gap-2 text-sm uppercase tracking-widest font-bold" style={{ color: tokens.accent2 }}>
                         Hear the difference <ArrowRight className="w-4 h-4" />
                     </motion.button>
                </div>
                </div>
            </div>
            </SpatialReveal>
            <SpatialReveal delay={0.2}>
                <motion.div
                    className="aspect-square rounded-full border border-dashed relative flex items-center justify-center"
                    style={{ borderColor: tokens.border, y: yParallax }}
                >
                    <div className="absolute w-full h-[1px]" style={{ backgroundColor: tokens.border }} />
                    <div className="absolute h-full w-[1px]" style={{ backgroundColor: tokens.border }} />

                    {/* Audio wave visualization */}
                    <div className="w-3/4 h-3/4 rounded-full flex items-center justify-center relative">
                        {[...Array(3)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute rounded-full border"
                                style={{ borderColor: tokens.accent1 }}
                                initial={{ width: '20%', height: '20%', opacity: 1 }}
                                animate={{ width: '100%', height: '100%', opacity: 0 }}
                                transition={{ duration: 2, repeat: Infinity, delay: i * 0.6, ease: "easeOut" }}
                            />
                        ))}
                        <div className="w-16 h-16 rounded-full z-10" style={{ backgroundColor: tokens.accent1 }} />
                    </div>
                </motion.div>
            </SpatialReveal>
        </div>
      </div>
    </section>
  )
}

function Pricing() {
  return (
    <section id="pricing" className="py-32" style={{ backgroundColor: tokens.backgroundAlt }}>
      <div className="max-w-7xl mx-auto px-6">
        <SpatialReveal>
          <div className="text-center mb-24">
            <h2 className="font-primary text-5xl md:text-6xl font-bold uppercase tracking-tighter mb-6" style={{ color: tokens.foreground }}>Access Tiers</h2>
          </div>
        </SpatialReveal>

        <StaggerSpatial>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PRICING.map(tier => (
              <motion.div
                key={tier.name}
                variants={staggerItem}
                className="p-10 border relative flex flex-col backdrop-blur-sm"
                style={{
                  borderColor: tier.highlighted ? tokens.accent1 : tokens.border,
                  backgroundColor: tier.highlighted ? 'rgba(139, 195, 74, 0.05)' : tokens.surface,
                }}
              >
                {tier.highlighted && (
                  <div className="absolute top-0 right-0 p-4">
                    <div className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: tokens.accent1 }} />
                  </div>
                )}
                <h3 className="font-primary text-3xl font-bold uppercase tracking-widest mb-4" style={{ color: tokens.foreground }}>{tier.name}</h3>
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="font-primary text-5xl font-bold" style={{ color: tokens.foreground }}>{tier.price}</span>
                  <span className="font-secondary text-sm uppercase tracking-widest" style={{ color: tokens.mutedForeground }}>{tier.period}</span>
                </div>
                <p className="font-secondary text-sm mb-10 h-10 leading-relaxed" style={{ color: tokens.mutedForeground }}>{tier.description}</p>
                <ul className="space-y-6 mb-12 flex-1 font-secondary">
                  {tier.features.map(f => (
                    <li key={f} className="flex items-start gap-4 text-sm">
                      <Check className="h-4 w-4 mt-0.5 shrink-0" style={{ color: tier.highlighted ? tokens.accent1 : tokens.mutedForeground }} />
                      <span style={{ color: tokens.foreground }}>{f}</span>
                    </li>
                  ))}
                </ul>
                <motion.button
                  whileHover={{ backgroundColor: tier.highlighted ? tokens.foreground : tokens.surface }}
                  className="w-full py-4 border font-primary text-xs font-bold uppercase tracking-widest transition-colors"
                  style={tier.highlighted
                    ? { backgroundColor: tokens.accent1, color: tokens.background, borderColor: tokens.accent1 }
                    : { backgroundColor: 'transparent', color: tokens.foreground, borderColor: tokens.border }
                  }
                >
                  {tier.cta}
                </motion.button>
              </motion.div>
            ))}
          </div>
        </StaggerSpatial>
      </div>
    </section>
  )
}

function Testimonials() {
  return (
    <section id="testimonials" className="py-32 border-y" style={{ borderColor: tokens.border, backgroundColor: tokens.background }}>
      <div className="max-w-7xl mx-auto px-6">
        <SpatialReveal>
          <div className="mb-20 flex justify-between items-end">
            <h2 className="font-primary text-5xl md:text-6xl font-bold uppercase tracking-tighter" style={{ color: tokens.foreground }}>Field Reports</h2>
            <div className="hidden md:flex gap-4">
                 <div className="w-12 h-12 border rounded-full flex items-center justify-center" style={{ borderColor: tokens.border, color: tokens.foreground }}>←</div>
                 <div className="w-12 h-12 border rounded-full flex items-center justify-center" style={{ borderColor: tokens.border, color: tokens.foreground }}>→</div>
            </div>
          </div>
        </SpatialReveal>

        <StaggerSpatial>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map(t => (
              <motion.div
                key={t.name}
                variants={staggerItem}
                className="p-10 border bg-transparent flex flex-col justify-between"
                style={{ borderColor: tokens.border }}
              >
                <p className="font-secondary text-base leading-relaxed mb-12" style={{ color: tokens.foreground }}>"{t.text}"</p>
                <div>
                  <p className="font-primary font-bold text-sm uppercase tracking-widest mb-2" style={{ color: tokens.accent2 }}>{t.name}</p>
                  <p className="font-secondary text-xs uppercase tracking-widest" style={{ color: tokens.mutedForeground }}>{t.role} // {t.company}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </StaggerSpatial>
      </div>
    </section>
  )
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="py-32" style={{ backgroundColor: tokens.backgroundAlt }}>
      <div className="max-w-4xl mx-auto px-6">
        <SpatialReveal>
          <div className="mb-20">
            <h2 className="font-primary text-5xl md:text-6xl font-bold uppercase tracking-tighter" style={{ color: tokens.foreground }}>Logistics</h2>
          </div>
        </SpatialReveal>
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, i) => (
            <SpatialReveal key={i} delay={i * 0.1}>
              <div className="border bg-transparent" style={{ borderColor: openIndex === i ? tokens.accent1 : tokens.border }}>
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  aria-expanded={openIndex === i}
                  className="w-full flex items-center justify-between p-8 text-left"
                >
                  <span className="font-secondary font-medium text-lg pr-8" style={{ color: tokens.foreground }}>{item.q}</span>
                  <motion.div
                    animate={{ rotate: openIndex === i ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ArrowUpRight className="h-6 w-6" style={{ color: openIndex === i ? tokens.accent1 : tokens.mutedForeground }} />
                  </motion.div>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openIndex === i ? 'auto' : 0, opacity: openIndex === i ? 1 : 0 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  style={{ overflow: 'hidden' }}
                >
                  <p className="px-8 pb-8 font-secondary text-sm leading-relaxed" style={{ color: tokens.mutedForeground }}>
                    {item.a}
                  </p>
                </motion.div>
              </div>
            </SpatialReveal>
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
    setTimeout(() => setStatus('success'), 1500)
  }

  return (
    <section className="py-40 border-y relative overflow-hidden" style={{ borderColor: tokens.border, backgroundColor: tokens.background }}>
      <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-20" />
      </div>

      <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
        <SpatialReveal>
          <h2 className="font-primary text-5xl md:text-6xl font-bold uppercase tracking-tighter mb-8" style={{ color: tokens.foreground }}>Signal Intercept</h2>
          <p className="font-secondary text-lg mb-12" style={{ color: tokens.mutedForeground }}>
            Receive coordinates for new habitat drops before public broadcast.
          </p>
          {status === 'success' ? (
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-secondary font-bold text-sm uppercase tracking-widest px-8 py-4 border inline-block"
                style={{ borderColor: tokens.accent1, color: tokens.accent1 }}
            >
              Signal Confirmed. Awaiting drop.
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center">
              <input
                type="email"
                required
                placeholder="ENTER FREQUENCY (EMAIL)"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full sm:w-96 h-14 px-6 border bg-transparent font-secondary text-xs uppercase tracking-widest focus:outline-none"
                style={{ borderColor: tokens.border, color: tokens.foreground }}
              />
              <motion.button
                type="submit"
                disabled={status === 'loading'}
                whileHover={{ backgroundColor: tokens.foreground, color: tokens.background }}
                className="h-14 px-8 border font-primary text-xs font-bold uppercase tracking-widest transition-colors"
                style={{ borderColor: tokens.border, color: tokens.foreground, backgroundColor: 'transparent' }}
              >
                {status === 'loading' ? 'Syncing...' : 'Lock In'}
              </motion.button>
            </form>
          )}
        </SpatialReveal>
      </div>
    </section>
  )
}

function Footer() {
  const links = {
    Portal: ['All Habitats', 'VR Setup', 'Audio Guide', 'Status'],
    Mission: ['Conservation', 'Partners', 'Careers', 'Press'],
    Data: ['Privacy', 'Terms', 'Cookies', 'Security'],
  }

  return (
    <footer className="py-24" style={{ backgroundColor: tokens.backgroundAlt }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-16 mb-24">
          <div className="col-span-2 md:col-span-2">
            <div className="flex items-center gap-3 mb-8">
                <Compass className="h-6 w-6" style={{ color: tokens.accent1 }} strokeWidth={2} />
                <span className="font-primary font-bold text-xl tracking-widest uppercase" style={{ color: tokens.foreground }}>
                {PRODUCT_NAME}
                </span>
            </div>
            <p className="font-secondary text-sm leading-relaxed max-w-sm" style={{ color: tokens.mutedForeground }}>
              Connecting humanity to the wild through immersive technology, funding conservation one view at a time.
            </p>
          </div>
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <p className="font-primary font-bold text-sm uppercase tracking-widest mb-8" style={{ color: tokens.foreground }}>{group}</p>
              <ul className="space-y-4">
                {items.map(item => (
                  <li key={item}>
                    <a href="#" className="font-secondary text-xs uppercase tracking-widest hover:text-white transition-colors" style={{ color: tokens.mutedForeground }}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t gap-4" style={{ borderColor: tokens.border }}>
          <p className="font-secondary text-xs uppercase tracking-widest" style={{ color: tokens.mutedForeground }}>
            © {new Date().getFullYear()} {PRODUCT_NAME}. All rights reserved.
          </p>
          <div className="flex gap-4">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: tokens.accent1 }} />
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: tokens.accent2 }} />
          </div>
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
    <div className={`${primaryFont.variable} ${secondaryFont.variable} font-sans selection:bg-[#8BC34A] selection:text-black`} style={{ backgroundColor: tokens.background }}>
      <Navbar />
      <main>
        <Hero />
        <ExplorerMap />
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
