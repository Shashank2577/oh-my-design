'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, useDragControls, AnimatePresence } from 'framer-motion'
import { Permanent_Marker, Fira_Sans } from 'next/font/google'
import { ArrowRight, Check, Star, ChevronDown, Activity, Play, Trophy, Users, Shield, Target, Plus, X } from 'lucide-react'

const permanentMarker = Permanent_Marker({ subsets: ['latin'], weight: ['400'], variable: '--font-marker' })
const firaSans = Fira_Sans({ subsets: ['latin'], weight: ['400', '600', '700', '900'], variable: '--font-fira' })

const tokens = {
  background: '#E0E0E0', // Sidewalk Grey
  surface: '#FFFFFF', // Plywood
  accent: '#FF00FF', // Neon Pink
  accent2: '#000000', // Grip-tape Black
  border: '#000000',
  textHigh: '#000000',
  textLow: '#4A4A4A'
}

const PRODUCT_NAME = "SHRED.SYS"

const kickflipEntry: import('framer-motion').Variants = {
  hidden: { rotateX: 360, rotateY: 180, scale: 0, opacity: 0 },
  visible: {
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    opacity: 1,
    transition: { type: 'spring', stiffness: 200, damping: 15 }
  }
}

function StickerButton({ children, className = '', onClick, style }: { children: React.ReactNode, className?: string, onClick?: () => void, style?: React.CSSProperties }) {
  return (
    <motion.button
      whileHover={{
        scale: 1.05,
        rotate: (Math.random() - 0.5) * 10,
        boxShadow: "4px 4px 0px #000"
      }}
      whileTap={{
        scale: 0.95,
        boxShadow: "0px 0px 0px #000",
        y: 4,
        x: 4
      }}
      onClick={onClick}
      className={`relative px-8 py-4 font-fira font-black uppercase tracking-wider bg-white border-4 border-black text-black transition-shadow duration-200 ${className}`}
      style={{
        boxShadow: "8px 8px 0px #000",
        ...style
      }}
    >
      {/* Tape effect on corners */}
      <div className="absolute -top-2 -left-2 w-6 h-6 bg-[#E0E0E0] border-2 border-black rotate-45 z-[-1]"></div>
      <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-[#E0E0E0] border-2 border-black rotate-45 z-[-1]"></div>

      <span className="relative z-10">{children}</span>
    </motion.button>
  )
}

function SectionWrapper({ children, className = '', id, style }: { children: React.ReactNode, className?: string, id?: string, style?: React.CSSProperties }) {
  return (
    <motion.section
      id={id}
      style={style}
      variants={kickflipEntry}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={`relative z-10 py-24 ${className}`}
    >
      {children}
    </motion.section>
  )
}

function StickerSlap({ children, delay = 0, className = '' }: { children: React.ReactNode, delay?: number, className?: string }) {
  const rotation = (Math.random() - 0.5) * 20
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0, rotate: rotation - 45 }}
      whileInView={{ scale: 1, opacity: 1, rotate: rotation }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 400, damping: 15, delay }}
      className={`absolute z-20 ${className}`}
    >
      {children}
    </motion.div>
  )
}

function TrickComboBuilder() {
  const [combo, setCombo] = useState<string[]>([])
  const [showSpray, setShowSpray] = useState(false)

  const tricks = [
    { id: 'kickflip', name: 'Kickflip', color: '#FF00FF' },
    { id: 'treflip', name: 'Tre Flip', color: '#00FFFF' },
    { id: 'boardslide', name: 'Boardslide', color: '#FFFF00' },
    { id: 'crook', name: 'Crooked Grind', color: '#00FF00' },
    { id: 'manual', name: 'Manual', color: '#FF9900' }
  ]

  const addToCombo = (trickId: string) => {
    setCombo([...combo, trickId])
    if (combo.length >= 2) {
      setShowSpray(true)
      setTimeout(() => setShowSpray(false), 2000)
    }
  }

  const clearCombo = () => setCombo([])

  return (
    <div className="relative w-full max-w-4xl mx-auto p-8 bg-white border-4 border-black shadow-[12px_12px_0px_#000] my-20">

      {/* Background Spray Animation */}
      <AnimatePresence>
        {showSpray && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden"
          >
            <div className="font-marker text-9xl text-[#FF00FF] opacity-30 whitespace-nowrap transform -rotate-12">
              SICK COMBO!
            </div>
            {/* SVG Spray splatters */}
            <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
              {[...Array(20)].map((_, i) => (
                <motion.circle
                  key={i}
                  cx={Math.random() * 100 + "%"}
                  cy={Math.random() * 100 + "%"}
                  r={Math.random() * 20 + 5}
                  fill={['#FF00FF', '#00FFFF', '#FFFF00'][Math.floor(Math.random() * 3)]}
                  initial={{ r: 0, opacity: 1 }}
                  animate={{ r: Math.random() * 20 + 5, opacity: 0 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              ))}
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10">
        <div className="flex justify-between items-center mb-8 border-b-4 border-black pb-4">
          <h3 className="font-marker text-4xl text-black">Line Builder</h3>
          <button onClick={clearCombo} className="font-fira font-bold uppercase text-[#FF00FF] hover:text-black">Clear</button>
        </div>

        {/* Trick Pool */}
        <div className="flex flex-wrap gap-4 mb-12">
          {tricks.map((trick) => (
            <motion.button
              key={trick.id}
              whileHover={{ scale: 1.1, rotate: (Math.random() - 0.5) * 10 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => addToCombo(trick.id)}
              className="px-4 py-2 font-fira font-black uppercase border-2 border-black bg-[#E0E0E0] hover:bg-white text-black shadow-[4px_4px_0px_#000]"
            >
              + {trick.name}
            </motion.button>
          ))}
        </div>

        {/* Combo Display Area */}
        <div className="min-h-[150px] bg-[#E0E0E0] border-4 border-black p-4 flex flex-wrap gap-2 items-center">
          <AnimatePresence>
            {combo.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="font-marker text-[#4A4A4A] text-xl w-full text-center"
              >
                Build your line...
              </motion.div>
            ) : (
              combo.map((trickId, index) => {
                const trick = tricks.find(t => t.id === trickId)!
                return (
                  <React.Fragment key={`${trickId}-${index}`}>
                    <motion.div
                      layout
                      initial={{ scale: 0, rotate: -20 }}
                      animate={{ scale: 1, rotate: 0 }}
                      className="px-6 py-3 font-fira font-black uppercase text-white border-2 border-black"
                      style={{ backgroundColor: trick.color, textShadow: "1px 1px 0px #000" }}
                    >
                      {trick.name}
                    </motion.div>
                    {index < combo.length - 1 && (
                      <motion.div layout className="font-fira font-black text-2xl text-black">
                        →
                      </motion.div>
                    )}
                  </React.Fragment>
                )
              })
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default function SkateParkPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })

  // Grind scroll effect
  const grindJitter = useTransform(scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [0, 5, -5, 5, -5, 0]
  )

  return (
    <div ref={containerRef} className={`${permanentMarker.variable} ${firaSans.variable} bg-[#E0E0E0] min-h-screen text-black overflow-x-hidden selection:bg-[#FF00FF] selection:text-white`}>

      {/* Background Texture (Asphalt/Concrete) */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-10"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center bg-transparent pointer-events-none">
        <div className="font-marker text-5xl text-black drop-shadow-[4px_4px_0px_#FF00FF] pointer-events-auto rotate-[-2deg]">
          {PRODUCT_NAME}
        </div>
        <div className="hidden md:flex gap-8 font-fira font-black uppercase text-xl pointer-events-auto">
          <a href="#features" className="hover:text-[#FF00FF] hover:-translate-y-1 transition-all">Features</a>
          <a href="#pricing" className="hover:text-[#FF00FF] hover:-translate-y-1 transition-all">Pricing</a>
          <a href="#faq" className="hover:text-[#FF00FF] hover:-translate-y-1 transition-all">FAQ</a>
        </div>
        <StickerButton className="!px-6 !py-2 !text-lg pointer-events-auto">Sign In</StickerButton>
      </nav>

      <main className="relative pt-32">
        {/* Hero */}
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 pt-20">

          <StickerSlap delay={0.2} className="top-20 left-10 hidden md:block">
            <div className="px-4 py-2 bg-[#00FFFF] border-4 border-black font-fira font-black uppercase rotate-[-15deg] shadow-[4px_4px_0px_#000]">
              RADICAL!
            </div>
          </StickerSlap>

          <StickerSlap delay={0.4} className="bottom-40 right-20 hidden md:block">
            <div className="px-4 py-2 bg-[#FFFF00] border-4 border-black font-marker text-2xl rotate-[10deg] shadow-[4px_4px_0px_#000]">
              100% Core
            </div>
          </StickerSlap>

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div variants={kickflipEntry} initial="hidden" animate="visible">
              <h1 className="font-fira text-[80px] md:text-[110px] font-black uppercase leading-[0.8] mb-8 text-black mix-blend-multiply">
                Drop In &<br/>
                <span className="font-marker text-[#FF00FF] block mt-4 transform -rotate-3 text-[100px] md:text-[140px]">
                  Destroy
                </span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="bg-white border-4 border-black p-6 md:p-8 max-w-2xl mx-auto mb-10 transform rotate-1 shadow-[8px_8px_0px_#000]"
            >
              <p className="font-fira text-xl font-bold uppercase text-[#4A4A4A]">
                The ultimate session tracker for spots, clips, and homies. No corporate bullshit. Just pure skateboarding.
              </p>
            </motion.div>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
              className="flex justify-center gap-6"
            >
              <StickerButton className="bg-[#FF00FF] text-white !text-2xl py-6 px-10">Get The App</StickerButton>
            </motion.div>
          </div>
        </section>

        {/* Stats Strip */}
        <section className="bg-black py-8 overflow-hidden border-y-8 border-white transform -skew-y-2 my-12 z-20 relative">
          <motion.div
            style={{ x: grindJitter }}
            className="max-w-6xl mx-auto grid grid-cols-4 gap-4 px-6"
          >
            {[
              { val: '1M+', label: 'Spots Added' },
              { val: '500K', label: 'Clips Uploaded' },
              { val: '10K', label: 'Local Crews' },
              { val: '∞', label: 'Broken Boards' }
            ].map((stat, i) => (
              <div key={i} className="text-center transform skew-y-2">
                <div className="font-marker text-4xl md:text-5xl text-[#00FFFF] mb-1 drop-shadow-[2px_2px_0px_#FF00FF]">{stat.val}</div>
                <div className="font-fira font-black text-xs md:text-sm uppercase text-white tracking-widest">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </section>

        {/* Features */}
        <SectionWrapper id="features" className="px-6 relative">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-marker text-7xl md:text-9xl text-black mb-16 transform -rotate-2">Toolbox</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: Target, title: 'Spot Radar', desc: 'Find un-capped ledges, perfect rails, and hidden pools. Updated by the community.', color: '#00FFFF' },
                { icon: Play, title: 'Clip Stash', desc: 'Upload raw footy. Tag the tricks. Tag the spot. Build your sponsor me tape.', color: '#FFFF00' },
                { icon: Users, title: 'Crew Link', desc: 'See where the homies are skating in real-time. Drop a pin and start a session.', color: '#FF00FF' },
                { icon: Shield, title: 'Bust Meter', desc: 'Real-time reports on security and cops at popular spots. Don\'t get a ticket.', color: '#00FF00' },
                { icon: Trophy, title: 'Bounty Board', desc: 'Local shops post cash or gear for NBDs at iconic spots. Go get paid.', color: '#FF9900' },
                { icon: Activity, title: 'Trick Dex', desc: 'Log your progression. From your first ollie to your first tre flip down a set.', color: '#FFFFFF' }
              ].map((f, i) => (
                <motion.div
                  key={i}
                  variants={kickflipEntry}
                  whileHover={{
                    scale: 1.05,
                    rotate: (Math.random() - 0.5) * 5,
                    zIndex: 10
                  }}
                  className="p-8 bg-white border-4 border-black shadow-[8px_8px_0px_#000] flex flex-col"
                >
                  <div className="w-16 h-16 border-4 border-black flex items-center justify-center mb-6 shadow-[4px_4px_0px_#000] rotate-3" style={{ backgroundColor: f.color }}>
                    <f.icon className="w-8 h-8 text-black" />
                  </div>
                  <h3 className="font-fira text-2xl font-black uppercase mb-3 text-black">{f.title}</h3>
                  <p className="font-fira font-bold text-[#4A4A4A]">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </SectionWrapper>

        {/* Trick Combo Builder (Unique Section) */}
        <SectionWrapper className="px-6">
          <TrickComboBuilder />
        </SectionWrapper>

        {/* Product Detail */}
        <SectionWrapper className="px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <motion.div variants={kickflipEntry} className="order-2 md:order-1 relative h-[500px] w-full border-8 border-black bg-white shadow-[16px_16px_0px_#000] p-4 transform -rotate-2">
              {/* Abstract Video Player UI */}
              <div className="w-full h-full bg-[#E0E0E0] border-4 border-black relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDBMOCA4Wk04IDBMMCA4WiIgc3Ryb2tlPSIjZTBlMGUwIiBzdHJva2Utd2lkdGg9IjEiPjwvcGF0aD4KPC9zdmc+')] opacity-50"></div>

                <div className="w-20 h-20 bg-[#FF00FF] rounded-full border-4 border-black flex items-center justify-center shadow-[4px_4px_0px_#000] z-10">
                  <Play className="w-10 h-10 text-black ml-2" />
                </div>

                <div className="absolute bottom-4 left-4 right-4 bg-white border-4 border-black p-2 flex justify-between items-center">
                  <div className="font-marker text-xl text-black">MACBA Session</div>
                  <div className="font-fira font-black">01:45</div>
                </div>
              </div>

              <StickerSlap delay={0.6} className="-top-10 -right-10">
                <div className="px-3 py-1 bg-black text-white font-marker text-xl rotate-12 border-2 border-white">
                  RAW FILE
                </div>
              </StickerSlap>
            </motion.div>

            <motion.div variants={kickflipEntry} className="order-1 md:order-2">
              <h2 className="font-marker text-6xl md:text-8xl mb-8 leading-none transform rotate-2">Keep It<br/>Grimey</h2>
              <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_#000]">
                <p className="font-fira font-bold text-lg mb-4 text-[#4A4A4A]">
                  We didn't build this for scooter kids or rollerbladers. This is built by skateboarders, for skateboarders.
                </p>
                <p className="font-fira font-bold text-lg text-[#4A4A4A]">
                  Every feature exists because we needed it in the streets. Spot moderation is handled by local OGs to make sure spots aren't blown out by kooks.
                </p>
              </div>
            </motion.div>
          </div>
        </SectionWrapper>

        {/* Pricing */}
        <SectionWrapper id="pricing" className="px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-marker text-7xl md:text-9xl text-center mb-16">Support<br/>Your Local</h2>

            <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              {[
                { name: 'Homie', price: 'Free', desc: 'Everything you need to skate.', features: ['Spot map access', 'Upload clips', 'Join crews'], color: '#00FFFF' },
                { name: 'Pro', price: '$5', desc: 'Support the servers. Get perks.', features: ['No ads anywhere', 'High-res video uploads', 'Custom app icon'], highlighted: true, color: '#FF00FF' }
              ].map((tier, i) => (
                <motion.div
                  key={i}
                  variants={kickflipEntry}
                  whileHover={{ y: -10 }}
                  className="bg-white border-8 border-black p-8 relative flex flex-col"
                  style={{
                    boxShadow: tier.highlighted ? `16px 16px 0px ${tier.color}` : '16px 16px 0px #000',
                    transform: tier.highlighted ? 'rotate(2deg)' : 'rotate(-2deg)'
                  }}
                >
                  <h3 className="font-marker text-5xl mb-2 text-black">{tier.name}</h3>
                  <div className="mb-6 font-fira font-black flex items-end gap-2 border-b-4 border-black pb-4">
                    <span className="text-6xl text-black">{tier.price}</span>
                    {tier.price !== 'Free' && <span className="text-xl mb-1 text-[#4A4A4A]">/mo</span>}
                  </div>
                  <p className="font-fira font-bold text-lg mb-8 text-[#4A4A4A] h-12">{tier.desc}</p>
                  <ul className="space-y-4 mb-12 flex-1">
                    {tier.features.map((f, j) => (
                      <li key={j} className="flex items-center font-fira font-black uppercase text-black">
                        <Check className="w-6 h-6 mr-3 border-2 border-black" style={{ backgroundColor: tier.color }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <StickerButton className="w-full text-xl" style={{ backgroundColor: tier.color, color: tier.highlighted ? '#fff' : '#000' }}>
                    Select {tier.name}
                  </StickerButton>
                </motion.div>
              ))}
            </div>
          </div>
        </SectionWrapper>

        {/* Testimonials */}
        <SectionWrapper className="px-6 bg-black text-white transform -skew-y-2 py-32 border-y-8 border-[#FF00FF] my-20">
          <div className="max-w-6xl mx-auto transform skew-y-2">
            <h2 className="font-marker text-7xl text-center mb-16 text-[#00FFFF]">Word on the Street</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: 'Jimmy', role: 'Filmer', quote: "Finally an app that doesn't compress my clips to shit. The spot radar is insanely accurate." },
                { name: 'Sarah', role: 'Local Pro', quote: "The bounty board paid for my last two setups. It's hype seeing the local shops get involved." },
                { name: 'Mike', role: 'Old Head', quote: "I thought it was wack at first, but it actually keeps the scene tight. Good shit." }
              ].map((t, i) => (
                <motion.div
                  key={i}
                  variants={kickflipEntry}
                  className="bg-white text-black border-4 border-black p-6 relative"
                  style={{ transform: `rotate(${(Math.random() - 0.5) * 6}deg)` }}
                >
                  {/* Tape */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-6 bg-[#E0E0E0] border-2 border-black z-10 opacity-80"></div>

                  <p className="font-marker text-2xl mb-6">"{t.quote}"</p>
                  <div className="flex justify-between items-end border-t-4 border-black pt-4">
                    <div className="font-fira font-black uppercase text-xl">{t.name}</div>
                    <div className="font-fira font-bold text-sm bg-black text-white px-2 py-1">{t.role}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </SectionWrapper>

        {/* FAQ */}
        <SectionWrapper id="faq" className="px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-marker text-7xl text-center mb-16">WTF? (FAQ)</h2>
            <div className="space-y-6">
              {[
                { q: "Are my secret spots safe?", a: "Yes. You can mark spots as 'Crew Only'. They won't show up on the global map." },
                { q: "How do you stop scooters from joining?", a: "We have a strictly enforced community moderation system. Post scooter clips, get banned. Simple." },
                { q: "Is Android supported?", a: "Yeah, we're on Google Play. It works on your cracked screen phone." },
                { q: "Can shops run their own bounties?", a: "Verified local skate shops can post bounties for free. Support your local." },
                { q: "How do I get verified?", a: "Get sponsored, film a part, or have 5 verified users vouch for you." }
              ].map((faq, i) => (
                <FAQItem key={i} question={faq.q} answer={faq.a} />
              ))}
            </div>
          </div>
        </SectionWrapper>

        {/* Newsletter */}
        <SectionWrapper className="px-6 pb-32">
          <div className="max-w-3xl mx-auto bg-[#FFFF00] border-8 border-black p-12 text-center relative shadow-[16px_16px_0px_#000] transform rotate-1">
            <StickerSlap delay={0} className="-top-6 -left-6">
              <div className="w-16 h-16 bg-[#FF00FF] rounded-full border-4 border-black flex items-center justify-center font-marker text-2xl text-white">
                NEW!
              </div>
            </StickerSlap>

            <h2 className="font-marker text-6xl md:text-7xl text-black mb-4">The Zine</h2>
            <p className="font-fira font-bold text-xl mb-8 uppercase text-black">Get monthly updates, trick tips, and spot checks.</p>
            <form className="flex flex-col sm:flex-row gap-4 justify-center max-w-xl mx-auto">
              <input
                type="email"
                placeholder="YOUR EMAIL"
                className="flex-1 px-6 py-4 font-fira font-black text-xl uppercase bg-white border-4 border-black focus:outline-none placeholder:text-[#4A4A4A] shadow-[4px_4px_0px_#000]"
              />
              <StickerButton className="bg-black text-white text-xl">Sign Up</StickerButton>
            </form>
          </div>
        </SectionWrapper>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white pt-20 pb-10 px-6 border-t-8 border-[#FF00FF]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="font-marker text-5xl mb-6 text-[#00FFFF]">{PRODUCT_NAME}</div>
            <p className="font-fira font-bold text-lg max-w-sm text-gray-400">
              Built by skateboarders in California. Designed for the streets worldwide.
            </p>
          </div>
          <div>
            <h4 className="font-fira font-black uppercase text-xl mb-4 border-b-2 border-white pb-2 inline-block">The App</h4>
            <ul className="space-y-3 font-fira font-bold text-gray-400">
              <li><a href="#" className="hover:text-[#FF00FF] hover:translate-x-2 transition-transform inline-block">Features</a></li>
              <li><a href="#" className="hover:text-[#FF00FF] hover:translate-x-2 transition-transform inline-block">Pro Tier</a></li>
              <li><a href="#" className="hover:text-[#FF00FF] hover:translate-x-2 transition-transform inline-block">For Shops</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-fira font-black uppercase text-xl mb-4 border-b-2 border-white pb-2 inline-block">Legal Shit</h4>
            <ul className="space-y-3 font-fira font-bold text-gray-400">
              <li><a href="#" className="hover:text-[#00FFFF] hover:translate-x-2 transition-transform inline-block">Privacy</a></li>
              <li><a href="#" className="hover:text-[#00FFFF] hover:translate-x-2 transition-transform inline-block">Terms</a></li>
              <li><a href="#" className="hover:text-[#00FFFF] hover:translate-x-2 transition-transform inline-block">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center pt-8 border-t-2 border-gray-800 font-fira font-bold uppercase text-sm text-gray-500">
          <div>© 2026 {PRODUCT_NAME}. SKATE AND DESTROY.</div>
          <a href="/" className="mt-4 md:mt-0 hover:text-white flex items-center gap-2">
            EXIT PARK <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </footer>
    </div>
  )
}

function FAQItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="bg-white border-4 border-black shadow-[8px_8px_0px_#000] mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 flex justify-between items-center text-left"
      >
        <span className="font-fira font-black text-2xl uppercase text-black">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          className="bg-[#00FFFF] border-2 border-black p-1"
        >
          <Plus className="text-black w-6 h-6" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-6 pt-0 border-t-4 border-black mt-4">
              <p className="font-fira font-bold text-lg text-[#4A4A4A] mt-4">{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
