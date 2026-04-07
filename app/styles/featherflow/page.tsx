'use client'

import React, { useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Lora, Work_Sans } from 'next/font/google'
import { Cloud, Wind, Feather, Bird, Music, Play, Pause, ChevronDown, Check, ArrowRight, Star } from 'lucide-react'

const lora = Lora({ subsets: ['latin'], variable: '--font-lora' })
const workSans = Work_Sans({ subsets: ['latin'], variable: '--font-work-sans' })

const TOKENS = {
  background: '#F1F5F9', // Clear Sky
  surface: '#FFFFFF',
  accent1: '#38BDF8', // Wing Blue
  accent2: '#F472B6', // Flamingo Pink
  border: 'rgba(0, 0, 0, 0.05)',
  textHigh: '#1E293B',
  textLow: '#94A3B8',
}

// Custom Framer Motion Variants
const glidingEntry: import('framer-motion').Variants = {
  hidden: { opacity: 0, y: 50, transition: { type: 'spring' as const, stiffness: 120, damping: 30 } },
  visible: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 120, damping: 30 } },
}

const flockingLayout: import('framer-motion').Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Staggered but randomized below
      delayChildren: 0.1,
    },
  },
}

const featherDriftHover = {
  rotate: [0, 5, -5, 0],
  transition: { duration: 1.5, ease: [0.42, 0, 0.58, 1] as [number, number, number, number] }
}

function FlockingContainer({ children, className }: { children: React.ReactNode, className?: string }) {
  const [delays, setDelays] = useState<number[]>([])

  useEffect(() => {
    // Generate random delays after hydration
    const childrenCount = React.Children.count(children)
    const randomDelays = Array.from({ length: childrenCount }, () => Math.random() * 0.2)
    setDelays(randomDelays)
  }, [children])

  return (
    <motion.div
      variants={flockingLayout}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={className}
    >
      {React.Children.map(children, (child, index) => {
        // Use pre-calculated random delay or 0 if not ready
        const randomDelay = delays[index] || 0
        return (
          <motion.div
            variants={glidingEntry}
            custom={randomDelay}
          >
            {child}
          </motion.div>
        )
      })}
    </motion.div>
  )
}

function CloudParallax() {
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 2000], [0, -200])
  const y2 = useTransform(scrollY, [0, 2000], [0, -400])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      <motion.div style={{ y: y1, opacity: 0.3 }} className="absolute top-[10%] left-[5%]">
        <Cloud size={120} color={TOKENS.accent1} />
      </motion.div>
      <motion.div style={{ y: y2, opacity: 0.2 }} className="absolute top-[30%] right-[10%]">
        <Cloud size={200} color={TOKENS.textLow} />
      </motion.div>
      <motion.div style={{ y: y1, opacity: 0.4 }} className="absolute top-[60%] left-[20%]">
        <Cloud size={150} color={TOKENS.accent1} />
      </motion.div>
      <motion.div style={{ y: y2, opacity: 0.15 }} className="absolute top-[80%] right-[30%]">
        <Cloud size={180} color={TOKENS.textLow} />
      </motion.div>
    </div>
  )
}

export default function FeatherFlowPage() {
  return (
    <div className={`min-h-screen font-sans ${workSans.variable} ${lora.variable} overflow-hidden`} style={{ backgroundColor: TOKENS.background, color: TOKENS.textHigh }}>
      <CloudParallax />

      {/* 1. Navbar */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] }}
        className="fixed top-0 left-0 right-0 z-50 px-8 py-6 flex justify-between items-center backdrop-blur-md"
        style={{ borderBottom: `1px solid ${TOKENS.border}` }}
      >
        <div className="flex items-center gap-3">
          <motion.div whileHover={featherDriftHover}>
            <Feather size={28} color={TOKENS.accent1} />
          </motion.div>
          <span className="font-serif text-2xl font-semibold tracking-wide" style={{ fontFamily: 'var(--font-lora)' }}>FeatherFlow</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm uppercase tracking-widest font-medium" style={{ color: TOKENS.textLow }}>
          <a href="#" className="hover:text-black transition-colors">Aviary</a>
          <a href="#" className="hover:text-black transition-colors">Nutrition</a>
          <a href="#" className="hover:text-black transition-colors">Community</a>
        </div>
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-2 rounded-full text-sm tracking-wide transition-colors"
          style={{ backgroundColor: TOKENS.surface, border: `1px solid ${TOKENS.border}` }}
        >
          Join Nest
        </motion.button>
      </motion.nav>

      <main className="pt-32 px-4 md:px-12 max-w-7xl mx-auto space-y-40 pb-40">

        {/* 2. Hero */}
        <section className="min-h-[70vh] flex flex-col justify-center items-center text-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] }}
            className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent to-[#F1F5F9] opacity-50"
            style={{
              backgroundImage: `radial-gradient(circle at 50% 30%, rgba(56, 189, 248, 0.1) 0%, transparent 60%)`
            }}
          />
          <FlockingContainer className="flex flex-col items-center">
            <span className="inline-block px-4 py-1 rounded-full text-xs font-semibold tracking-widest uppercase mb-6" style={{ backgroundColor: 'rgba(244, 114, 182, 0.1)', color: TOKENS.accent2 }}>
              Light as Air
            </span>
            <h1 className="text-6xl md:text-8xl font-serif leading-tight mb-8" style={{ fontFamily: 'var(--font-lora)' }}>
              Elevate Your <br/>
              <span className="italic" style={{ color: TOKENS.accent1 }}>Avian Companion</span>
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl mb-12 font-light leading-relaxed" style={{ color: TOKENS.textLow }}>
              A sanctuary for bird care, nutrition, and harmony. Discover a spacious, rhythmic approach to living with your feathered friends.
            </p>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              className="px-8 py-4 rounded-full text-white text-lg font-medium flex items-center gap-3"
              style={{ backgroundColor: TOKENS.accent1, boxShadow: `0 20px 40px rgba(56, 189, 248, 0.3)` }}
            >
              Take Flight <ArrowRight size={20} />
            </motion.button>
          </FlockingContainer>
        </section>

        {/* 3. Stats */}
        <section>
          <FlockingContainer className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '12k+', label: 'Happy Birds' },
              { value: '99%', label: 'Health Score' },
              { value: '50+', label: 'Species' },
              { value: '4.9', label: 'Nest Rating' }
            ].map((stat, i) => (
              <div key={i} className="text-center p-8 rounded-3xl" style={{ backgroundColor: TOKENS.surface, boxShadow: `0 10px 30px ${TOKENS.border}` }}>
                <div className="text-4xl md:text-5xl font-serif mb-2" style={{ color: TOKENS.accent1, fontFamily: 'var(--font-lora)' }}>{stat.value}</div>
                <div className="text-sm uppercase tracking-widest" style={{ color: TOKENS.textLow }}>{stat.label}</div>
              </div>
            ))}
          </FlockingContainer>
        </section>

        {/* 4. Unique Section: Songbird Audio Library */}
        <section className="py-20 relative">
          <div className="text-center mb-16 relative z-10">
            <h2 className="text-4xl font-serif mb-4" style={{ fontFamily: 'var(--font-lora)' }}>Songbird Audio Library</h2>
            <p className="text-lg" style={{ color: TOKENS.textLow }}>Identify calls and understand their language.</p>
          </div>

          <div className="relative h-96 flex justify-center items-center max-w-lg mx-auto">
            {/* Circular sequencer mock */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: [0, 0, 1, 1] as [number, number, number, number] }}
              className="absolute w-80 h-80 rounded-full border border-dashed"
              style={{ borderColor: TOKENS.accent1 }}
            />

            {[0, 60, 120, 180, 240, 300].map((angle, i) => {
              const rad = (angle * Math.PI) / 180;
              const x = Math.cos(rad) * 160;
              const y = Math.sin(rad) * 160;

              return (
                <AudioFeather key={i} x={x} y={y} />
              )
            })}

            <div className="w-24 h-24 rounded-full flex items-center justify-center relative z-10" style={{ backgroundColor: TOKENS.surface, boxShadow: `0 10px 30px ${TOKENS.border}` }}>
              <Music size={32} color={TOKENS.accent2} />
            </div>
          </div>
        </section>

        {/* 5. Features */}
        <section>
          <div className="mb-16">
            <h2 className="text-4xl font-serif mb-4" style={{ fontFamily: 'var(--font-lora)' }}>The Flock&apos;s Favorites</h2>
            <p className="text-lg" style={{ color: TOKENS.textLow }}>Everything you need for a happy habitat.</p>
          </div>
          <FlockingContainer className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Nutritional Plans', icon: <Bird/>, desc: 'Tailored seed and fresh food diets for specific breeds.' },
              { title: 'Habitat Design', icon: <Cloud/>, desc: 'Create airy, enriching environments that promote natural behavior.' },
              { title: 'Health Tracking', icon: <Feather/>, desc: 'Monitor weight, molt cycles, and vocalizations.' },
              { title: 'Behavioral Training', icon: <Check/>, desc: 'Positive reinforcement techniques for step-ups and tricks.' },
              { title: 'Social Integration', icon: <Wind/>, desc: 'Safely introduce new birds to your existing flock.' },
              { title: 'Avian Vet Finder', icon: <Star/>, desc: 'Locate certified avian specialists in your area.' }
            ].map((feature, i) => (
              <div key={i} className="p-8 rounded-3xl relative overflow-hidden group" style={{ backgroundColor: TOKENS.surface, boxShadow: `0 10px 30px ${TOKENS.border}` }}>
                <motion.div
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-6"
                  style={{ backgroundColor: 'rgba(56, 189, 248, 0.1)', color: TOKENS.accent1 }}
                  whileHover={featherDriftHover}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-serif mb-3" style={{ fontFamily: 'var(--font-lora)' }}>{feature.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: TOKENS.textLow }}>{feature.desc}</p>

                {/* Decorative background feather */}
                <div className="absolute -bottom-6 -right-6 opacity-5 transition-transform group-hover:scale-110 group-hover:-rotate-12 duration-700 pointer-events-none">
                  <Feather size={120} />
                </div>
              </div>
            ))}
          </FlockingContainer>
        </section>

        {/* 6. Product Detail */}
        <section className="flex flex-col md:flex-row gap-16 items-center relative z-10">
          <div className="w-full md:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] }}
              className="aspect-square rounded-full p-8 flex items-center justify-center relative"
              style={{ backgroundImage: `linear-gradient(135deg, ${TOKENS.surface} 0%, #E2E8F0 100%)`, boxShadow: `0 20px 50px ${TOKENS.border}` }}
            >
               <motion.div
                 animate={{ y: [0, -15, 0], rotate: [0, 2, -2, 0] }}
                 transition={{ repeat: Infinity, duration: 6, ease: [0.42, 0, 0.58, 1] as [number, number, number, number] }}
               >
                 <div className="w-64 h-64 rounded-full flex items-center justify-center" style={{ backgroundColor: TOKENS.accent1 }}>
                   <Bird size={80} color="white" />
                 </div>
               </motion.div>
            </motion.div>
          </div>
          <div className="w-full md:w-1/2 space-y-6">
            <h2 className="text-4xl font-serif leading-tight" style={{ fontFamily: 'var(--font-lora)' }}>
              Designed for the <br/><span className="italic" style={{ color: TOKENS.accent2 }}>Free Spirit</span>
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: TOKENS.textLow }}>
              FeatherFlow isn&apos;t just an app; it&apos;s a philosophy. We believe that caring for birds requires understanding their need for space, rhythm, and mental stimulation.
            </p>
            <p className="text-lg leading-relaxed" style={{ color: TOKENS.textLow }}>
              Our tools are built to feel as light and unobtrusive as possible, allowing you to focus on the bond you share with your companion, whether they are a tiny finch or a majestic macaw.
            </p>
          </div>
        </section>

        {/* 7. Pricing */}
        <section>
          <div className="text-center mb-16 relative z-10">
            <h2 className="text-4xl font-serif mb-4" style={{ fontFamily: 'var(--font-lora)' }}>Select Your Nest</h2>
            <p className="text-lg" style={{ color: TOKENS.textLow }}>Plans for solitary birds and whole flocks.</p>
          </div>
          <FlockingContainer className="grid md:grid-cols-3 gap-8 items-center">
            {[
              { name: 'Finch', price: '$0', desc: 'Perfect for a single small companion.', features: ['Basic tracking', 'Community access', 'Standard nutrition info'] },
              { name: 'Parrot', price: '$12', desc: 'Advanced tools for the dedicated owner.', features: ['Audio library access', 'Vet locator', 'Custom diet plans'], featured: true },
              { name: 'Aviary', price: '$29', desc: 'Manage multiple species with ease.', features: ['Unlimited birds', 'Breeding tracking', 'Priority vet support'] },
            ].map((plan, i) => (
              <div key={i} className={`p-8 rounded-3xl relative ${plan.featured ? 'scale-105 z-20' : 'z-10'}`}
                   style={{
                     backgroundColor: TOKENS.surface,
                     boxShadow: plan.featured ? `0 20px 50px rgba(56, 189, 248, 0.2)` : `0 10px 30px ${TOKENS.border}`,
                     border: plan.featured ? `2px solid ${TOKENS.accent1}` : 'none'
                   }}>
                {plan.featured && <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 bg-white rounded-full text-xs font-bold uppercase tracking-widest" style={{ color: TOKENS.accent1, border: `1px solid ${TOKENS.accent1}` }}>Most Popular</div>}
                <h3 className="text-2xl font-serif mb-2" style={{ fontFamily: 'var(--font-lora)' }}>{plan.name}</h3>
                <div className="text-4xl font-bold mb-4">{plan.price}<span className="text-sm font-normal text-gray-400">/mo</span></div>
                <p className="text-sm mb-8" style={{ color: TOKENS.textLow }}>{plan.desc}</p>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feat, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm">
                      <Check size={16} color={TOKENS.accent1} /> {feat}
                    </li>
                  ))}
                </ul>
                <button className="w-full py-3 rounded-full font-medium transition-colors"
                        style={{ backgroundColor: plan.featured ? TOKENS.accent1 : TOKENS.background, color: plan.featured ? 'white' : TOKENS.textHigh }}>
                  Choose Plan
                </button>
              </div>
            ))}
          </FlockingContainer>
        </section>

        {/* 8. Testimonials */}
        <section>
          <h2 className="text-4xl font-serif mb-12 text-center relative z-10" style={{ fontFamily: 'var(--font-lora)' }}>Voices from the Canopy</h2>
          <FlockingContainer className="grid md:grid-cols-3 gap-8">
            {[
              { quote: "FeatherFlow changed how I interact with my Cockatiel. The audio library helped me understand his chirps perfectly.", author: "Sarah Jenkins", role: "Bird Enthusiast" },
              { quote: "The habitat design tips are incredibly thoughtful. My Macaw's feathers have never looked so vibrant.", author: "Marcus Thorne", role: "Rescue Volunteer" },
              { quote: "It feels so light and easy to use. Logging my parakeets' diet is no longer a chore.", author: "Elena Rostova", role: "Avian Photographer" }
            ].map((testimonial, i) => (
              <div key={i} className="p-8 rounded-3xl relative z-10" style={{ backgroundColor: TOKENS.surface, boxShadow: `0 10px 30px ${TOKENS.border}` }}>
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(5)].map((_, j) => <Star key={j} size={16} fill="currentColor" className="mr-1" />)}
                </div>
                <p className="text-lg italic mb-6 leading-relaxed" style={{ color: TOKENS.textHigh, fontFamily: 'var(--font-lora)' }}>&quot;{testimonial.quote}&quot;</p>
                <div>
                  <div className="font-medium">{testimonial.author}</div>
                  <div className="text-sm uppercase tracking-widest mt-1" style={{ color: TOKENS.textLow }}>{testimonial.role}</div>
                </div>
              </div>
            ))}
          </FlockingContainer>
        </section>

        {/* 9. FAQ */}
        <section className="max-w-3xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif mb-4" style={{ fontFamily: 'var(--font-lora)' }}>Common Questions</h2>
          </div>
          <div className="space-y-4">
            {[
              { q: 'Is it suitable for all bird species?', a: 'Yes, our database covers everything from small finches to large macaws.' },
              { q: 'How does the audio library work?', a: 'You can listen to common calls for various species to help decode your bird\'s behavior.' },
              { q: 'Can I track multiple birds?', a: 'Absolutely. The Aviary plan allows you to manage an unlimited number of profiles.' },
              { q: 'Are the nutrition plans vet-approved?', a: 'Our guidelines are sourced from certified avian veterinarians.' },
              { q: 'Is there a community feature?', a: 'Yes, you can connect with other owners to share tips and photos.' },
              { q: 'How do I cancel my subscription?', a: 'You can easily cancel anytime from your account settings.' }
            ].map((faq, i) => (
              <details key={i} className="group rounded-2xl p-6 cursor-pointer" style={{ backgroundColor: TOKENS.surface, boxShadow: `0 5px 15px ${TOKENS.border}` }}>
                <summary className="flex justify-between items-center font-serif text-lg outline-none" style={{ fontFamily: 'var(--font-lora)' }}>
                  {faq.q}
                  <span className="transition-transform duration-300 group-open:rotate-180" style={{ color: TOKENS.accent1 }}>
                    <ChevronDown size={20} />
                  </span>
                </summary>
                <div className="mt-4 text-sm leading-relaxed" style={{ color: TOKENS.textLow }}>
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* 10. Newsletter */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden z-10"
            style={{ backgroundColor: TOKENS.accent1, color: 'white' }}
          >
            <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 20% 150%, white 0%, transparent 50%)' }} />
            <Feather size={48} className="mx-auto mb-6 opacity-80" />
            <h2 className="text-4xl md:text-5xl font-serif mb-6 relative z-10" style={{ fontFamily: 'var(--font-lora)' }}>Join the Flock</h2>
            <p className="text-lg md:text-xl mb-10 opacity-90 relative z-10 max-w-xl mx-auto">
              Subscribe for weekly tips on avian health, training, and exclusive community updates.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center max-w-lg mx-auto relative z-10">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-6 py-4 rounded-full flex-grow text-black outline-none"
                style={{ border: 'none' }}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="px-8 py-4 rounded-full font-medium"
                style={{ backgroundColor: TOKENS.textHigh, color: 'white' }}
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t py-12 px-4 md:px-12 text-sm relative z-10" style={{ borderColor: TOKENS.border, color: TOKENS.textLow, backgroundColor: TOKENS.background }}>
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4 text-black">
              <Feather size={20} color={TOKENS.accent1} />
              <span className="font-serif text-xl" style={{ fontFamily: 'var(--font-lora)' }}>FeatherFlow</span>
            </div>
            <p className="max-w-xs">Elevating the standard of care for avian companions through mindful design and expert knowledge.</p>
          </div>
          <div>
            <h4 className="font-medium text-black mb-4 uppercase tracking-widest text-xs">Product</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-black transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Audio Library</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-black mb-4 uppercase tracking-widest text-xs">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-black transition-colors">Bird Guide</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Vet Directory</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Blog</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-black mb-4 uppercase tracking-widest text-xs">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-black transition-colors">About</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Privacy</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto flex justify-between items-center pt-8 border-t" style={{ borderColor: TOKENS.border }}>
          <p>© 2024 FeatherFlow. All rights reserved.</p>
          <div className="flex gap-4">
            <TwitterIcon />
            <GithubIcon />
          </div>
        </div>
      </footer>
    </div>
  )
}

// Sub-components

function AudioFeather({ x, y }: { x: number, y: number }) {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <motion.div
      className="absolute flex items-center justify-center cursor-pointer z-10"
      style={{ x, y }}
      whileHover={{ scale: 1.2 }}
      onClick={() => setIsPlaying(!isPlaying)}
    >
      <div className="relative">
        {isPlaying && (
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ backgroundColor: TOKENS.accent1, opacity: 0.2 }}
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ repeat: Infinity, duration: 1 }}
          />
        )}
        <div className="w-12 h-12 rounded-full flex items-center justify-center relative z-10" style={{ backgroundColor: TOKENS.surface, boxShadow: `0 5px 15px ${TOKENS.border}` }}>
           {isPlaying ? <Pause size={16} color={TOKENS.accent1} /> : <Feather size={16} color={TOKENS.textLow} />}
        </div>
        
      </div>
    </motion.div>
  )
}

function TwitterIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
    </svg>
  )
}

function GithubIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
    </svg>
  )
}
