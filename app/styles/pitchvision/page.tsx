'use client';

import React, { useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Archivo, Inter } from 'next/font/google';
import { Activity, Map, Video, Zap, ChevronRight, BarChart2, Shield, Circle, Menu, X, ArrowUpRight } from 'lucide-react';

const archivo = Archivo({ subsets: ['latin'], weight: ['400', '600', '700', '900'] });
const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600'] });

const TOKENS = {
  background: '#0A0F0D',
  surface: '#141C18',
  accent1: '#00FF85',
  accent2: '#38003C',
  border: '#1F2924',
  textHigh: '#FFFFFF',
  textLow: '#8E9B94',
};

// --- Physics ---
const fluidTransition = {
  type: "spring" as const,
  stiffness: 150,
  damping: 30,
  mass: 0.8
};

// --- Shared Components ---
function GhostButton({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`relative px-6 py-3 border border-white/20 text-white overflow-hidden group ${className}`}
    >
      <span className="relative z-10 font-medium tracking-wide">{children}</span>
      <motion.div
        className="absolute inset-0 border border-[#00FF85] opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ borderRadius: 'inherit' }}
      />
      <div className="absolute inset-0 bg-[#00FF85]/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
    </motion.button>
  );
}

// --- Sections ---

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={fluidTransition}
      className="fixed top-0 w-full z-50 px-6 py-4 bg-[#0A0F0D]/80 backdrop-blur-md border-b border-[#1F2924]"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className={`text-2xl ${archivo.className} font-bold flex items-center gap-2 text-white tracking-tight`}>
          <div className="w-6 h-6 rounded-full bg-[#00FF85] flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-[#0A0F0D]" />
          </div>
          PitchVision
        </div>
        <div className={`hidden md:flex gap-8 ${inter.className} text-[#8E9B94] text-sm font-medium`}>
          <a href="#" className="hover:text-[#00FF85] transition-colors">Tactics</a>
          <a href="#" className="hover:text-[#00FF85] transition-colors">Heatmaps</a>
          <a href="#" className="hover:text-[#00FF85] transition-colors">Players</a>
          <a href="#" className="hover:text-[#00FF85] transition-colors">API</a>
        </div>
        <div className="hidden md:block">
          <GhostButton className="rounded-full text-sm">Request Demo</GhostButton>
        </div>
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden absolute top-full left-0 w-full bg-[#0A0F0D] border-b border-[#1F2924] flex flex-col items-center py-6 gap-6"
          >
            <a href="#" className={`text-white/70 ${inter.className}`}>Tactics</a>
            <a href="#" className={`text-white/70 ${inter.className}`}>Heatmaps</a>
            <a href="#" className={`text-white/70 ${inter.className}`}>Players</a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

function Hero() {
  const { scrollY } = useScroll();
  const rotateX = useTransform(scrollY, [0, 800], [0, 45]);
  const scale = useTransform(scrollY, [0, 800], [1, 0.8]);

  return (
    <section className="relative min-h-screen pt-32 pb-20 overflow-hidden flex flex-col items-center justify-center bg-[#0A0F0D]">
      <div className="relative z-10 text-center max-w-4xl px-6 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={fluidTransition}
        >
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00FF85]/10 border border-[#00FF85]/20 text-[#00FF85] ${inter.className} text-xs font-medium mb-8`}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF85] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00FF85]"></span>
            </span>
            LIVE MATCH TRACKING V2.4
          </div>
          <h1 className={`text-5xl md:text-[88px] text-white font-bold leading-[1.1] tracking-tight mb-6 ${archivo.className}`}>
            See the <span className="text-[#00FF85]">Beautiful Game</span> <br className="hidden md:block"/> in High Definition
          </h1>
          <p className={`text-lg text-[#8E9B94] mb-10 max-w-2xl mx-auto ${inter.className}`}>
            Advanced spatial analytics and tactical visualization for elite football clubs. Turn every pass, run, and formation into actionable intelligence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`bg-[#00FF85] text-[#0A0F0D] rounded-full px-8 py-3 ${inter.className} font-semibold flex items-center justify-center gap-2`}
            >
              Analyze Match <ArrowUpRight size={18} />
            </motion.button>
            <GhostButton className="rounded-full border-white/20">Read the Whitepaper</GhostButton>
          </div>
        </motion.div>
      </div>

      {/* Perspective Pitch 3D Visualization */}
      <motion.div
        style={{ rotateX, scale }}
        className="w-[800px] h-[500px] max-w-[90vw] border-[0.5px] border-[#1F2924] rounded-lg bg-[#141C18]/50 backdrop-blur-sm relative perspective-1000 transform-gpu"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,255,133,0.1)_0%,transparent_70%)]" />

        {/* Pitch Lines */}
        <div className="absolute inset-4 border-[0.5px] border-white/20 rounded-sm" />
        <div className="absolute inset-y-4 left-1/2 w-[0.5px] bg-white/20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-[0.5px] border-white/20 rounded-full" />

        {/* Nodes and Links (Passing Network) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 500">
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, ease: [0.42, 0, 0.58, 1] as [number, number, number, number], repeat: Infinity, repeatType: "reverse" }}
            d="M 200 250 Q 400 100 600 250"
            fill="none"
            stroke="url(#pass-gradient)"
            strokeWidth="2"
          />
          <defs>
            <linearGradient id="pass-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="100%" stopColor="#00FF85" />
            </linearGradient>
          </defs>
        </svg>

        <div className="absolute top-[50%] left-[25%] -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.5)] z-10" />
        <div className="absolute top-[50%] left-[75%] -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#00FF85] rounded-full shadow-[0_0_20px_rgba(0,255,133,0.8)] z-10" />

        {/* Organic Heatmap overlay */}
        <motion.div
          animate={{ scale: [0.8, 1.1, 0.8], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: [0.42, 0, 0.58, 1] as [number, number, number, number] }}
          className="absolute top-[30%] left-[60%] w-48 h-48 bg-[#38003C] rounded-full blur-3xl opacity-50 mix-blend-screen"
        />
      </motion.div>
    </section>
  );
}

function Stats() {
  const stats = [
    { label: "Matches Tracked", value: "10,000+" },
    { label: "Data Points/Game", value: "3.2M" },
    { label: "Predictive Model", value: "92%" },
    { label: "Top Tier Clubs", value: "45" }
  ];

  return (
    <section className="py-20 px-6 border-y border-[#1F2924] bg-[#141C18]">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ ...fluidTransition, delay: i * 0.1 }}
            className="text-center"
          >
            <div className={`text-4xl md:text-5xl text-white font-bold mb-2 ${archivo.className}`}>{stat.value}</div>
            <div className={`text-[#8E9B94] text-sm font-medium ${inter.className}`}>{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Features() {
  const features = [
    { icon: <Map />, title: "Spatial Control Maps", desc: "Visualize which zones your team truly dominates in real-time with organic heatmap bleeds." },
    { icon: <Activity />, title: "Passing Networks", desc: "Interactive node-link diagrams revealing the heartbeat and flow of your midfield." },
    { icon: <Video />, title: "Optical Tracking", desc: "Broadcast feed integration utilizing computer vision to map player coordinates instantly." },
    { icon: <Shield />, title: "Defensive Shape", desc: "Analyze the elasticity of your backline and identify gaps before they are exploited." },
    { icon: <Zap />, title: "xG Simulator", desc: "Predict expected goals from any coordinate on the pitch using historical datasets." },
    { icon: <BarChart2 />, title: "Player Load", desc: "Monitor sprint intensity and distance covered to prevent late-game fatigue." }
  ];

  return (
    <section className="py-32 px-6 bg-[#0A0F0D]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 md:flex justify-between items-end">
          <div className="max-w-2xl">
            <h2 className={`text-4xl md:text-6xl text-white font-bold mb-6 tracking-tight ${archivo.className}`}>Tactical Clarity</h2>
            <p className={`text-[#8E9B94] text-lg ${inter.className}`}>Move beyond basic stats. Understand the shape, flow, and intent of every single play.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              viewport={{ once: true }}
              transition={{ ...fluidTransition, delay: i * 0.1 }}
              className="p-8 border-[0.5px] border-[#1F2924] rounded-2xl bg-gradient-to-b from-[#141C18] to-transparent group"
            >
              <div className="w-12 h-12 rounded-full bg-[#00FF85]/10 flex items-center justify-center text-[#00FF85] mb-6 group-hover:scale-110 transition-transform">
                {feat.icon}
              </div>
              <h3 className={`text-xl text-white font-semibold mb-3 ${archivo.className}`}>{feat.title}</h3>
              <p className={`text-[#8E9B94] text-sm leading-relaxed ${inter.className}`}>{feat.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductDetail() {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <section className="py-32 px-6 bg-[#141C18] relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className={`text-4xl md:text-5xl text-white font-bold tracking-tight mb-6 ${archivo.className}`}>
            The <span className="text-[#00FF85]">Offside Line</span> Cursor
          </h2>
          <div className={`space-y-6 text-[#8E9B94] text-lg ${inter.className}`}>
            <p>
              We bring the precision of VAR directly into your analysis workflow. Our interface provides exact alignment tools for tactical breakdown.
            </p>
            <p>
              Hover over the visualization to see our crosshair alignment tool in action. It calculates distances, gaps in the defensive line, and optimal passing lanes in milliseconds.
            </p>
          </div>
        </div>

        <div
          className="relative h-[400px] border-[0.5px] border-[#1F2924] rounded-xl bg-[#0A0F0D] overflow-hidden cursor-none"
          onMouseMove={handleMouseMove}
        >
          {/* Tactical Nodes */}
          <div className="absolute top-[40%] left-[30%] w-3 h-3 rounded-full bg-white/50" />
          <div className="absolute top-[60%] left-[40%] w-3 h-3 rounded-full bg-white/50" />
          <div className="absolute top-[30%] left-[70%] w-3 h-3 rounded-full bg-[#38003C]" />
          <div className="absolute top-[70%] left-[80%] w-3 h-3 rounded-full bg-[#38003C]" />

          {/* Offside Line Crosshairs */}
          <motion.div
            className="absolute top-0 bottom-0 w-[1px] bg-[#00FF85]/50"
            animate={{ left: `${mousePos.x}%` }}
            transition={{ type: "tween", ease: "backOut", duration: 0.1 }}
          />
          <motion.div
            className="absolute left-0 right-0 h-[1px] bg-[#00FF85]/50"
            animate={{ top: `${mousePos.y}%` }}
            transition={{ type: "tween", ease: "backOut", duration: 0.1 }}
          />

          <motion.div
            className="absolute w-4 h-4 border border-[#00FF85] rounded-full -translate-x-1/2 -translate-y-1/2"
            animate={{ left: `${mousePos.x}%`, top: `${mousePos.y}%` }}
            transition={{ type: "tween", ease: "backOut", duration: 0.1 }}
          />
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const plans = [
    { name: "Academy", price: "$499", desc: "Core tracking for youth development.", features: ["2D Pitch Visualizer", "Basic Heatmaps", "Match Reports"] },
    { name: "First Team", price: "$1,499", desc: "Advanced tools for professional squads.", features: ["Passing Networks", "Live Broadcast Sync", "Optical Tracking", "Custom Dashboards"], highlight: true },
    { name: "Club Wide", price: "Custom", desc: "Enterprise solution for entire organizations.", features: ["API Access", "Raw Data Export", "Predictive Injury Models"] }
  ];

  return (
    <section className="py-32 px-6 bg-[#0A0F0D]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className={`text-4xl md:text-5xl text-white font-bold mb-4 ${archivo.className}`}>Equip Your Staff</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className={`p-8 rounded-2xl border-[0.5px] ${plan.highlight ? 'border-[#00FF85] bg-[#00FF85]/5' : 'border-[#1F2924] bg-[#141C18]'} relative flex flex-col`}
            >
              {plan.highlight && <div className={`absolute top-0 right-8 -translate-y-1/2 bg-[#00FF85] text-[#0A0F0D] px-3 py-1 text-xs font-bold rounded-full ${inter.className}`}>POPULAR</div>}
              <h3 className={`text-2xl text-white font-bold mb-2 ${archivo.className}`}>{plan.name}</h3>
              <p className={`text-[#8E9B94] text-sm mb-8 h-10 ${inter.className}`}>{plan.desc}</p>
              <div className={`text-5xl text-white font-bold mb-8 ${archivo.className}`}>
                {plan.price}<span className="text-lg text-[#8E9B94] font-normal">/mo</span>
              </div>
              <ul className={`space-y-4 mb-12 flex-1 ${inter.className}`}>
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-3 text-sm text-[#8E9B94]">
                    <Circle size={8} fill={plan.highlight ? "#00FF85" : "currentColor"} className={plan.highlight ? "text-[#00FF85]" : ""} /> {f}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-3 rounded-full font-medium transition-colors ${plan.highlight ? 'bg-[#00FF85] text-[#0A0F0D] hover:bg-white' : 'border border-white/20 text-white hover:bg-white/10'} ${inter.className}`}>
                Select Plan
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const reviews = [
    { name: "Marco Silva", role: "Head Coach", company: "Premier League Club", text: "PitchVision changed how we prepare. We don't just see where the ball went, we see the spatial control we had while it was moving." },
    { name: "Elena Rostova", role: "Chief Analyst", company: "European Champions", text: "The passing network visualization instantly highlights when our midfield pivot is being isolated. It's invaluable during halftime." },
    { name: "James Thorne", role: "Sporting Director", company: "National Team", text: "We use the optical tracking data to evaluate potential signings. If a player doesn't fit our required heatmaps, we know immediately." }
  ];

  return (
    <section className="py-32 px-6 bg-[#141C18] border-y border-[#1F2924]">
      <div className="max-w-7xl mx-auto">
        <h2 className={`text-4xl md:text-5xl text-center text-white font-bold mb-20 tracking-tight ${archivo.className}`}>Trusted by the Elite</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((rev, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ ...fluidTransition, delay: i * 0.1 }}
              className="bg-[#0A0F0D] p-8 rounded-2xl border-[0.5px] border-[#1F2924]"
            >
              <p className={`text-white text-lg mb-8 leading-relaxed ${inter.className}`}>"{rev.text}"</p>
              <div className={`text-[#00FF85] font-semibold ${archivo.className}`}>{rev.name}</div>
              <div className={`text-[#8E9B94] text-sm ${inter.className}`}>{rev.role}, {rev.company}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = [
    { q: "How quickly is data available after a match?", a: "For optical tracking clients, basic spatial data is available live with a 2-second delay. Full predictive models render within 15 minutes post-match." },
    { q: "Do we need to install stadium cameras?", a: "No. Our V2.4 engine can extract optical coordinates directly from standard tactical broadcast feeds using advanced computer vision." },
    { q: "Can we export the data to our own data warehouse?", a: "Yes. The Club Wide tier includes a robust REST API and automated CSV/JSON exports to Amazon S3 or Google Cloud Storage." },
    { q: "Is the interface mobile-friendly?", a: "The core dashboards are optimized for iPad and tablet use, specifically designed for sideline adjustments by the coaching staff." },
    { q: "How accurate is the xG simulator?", a: "Our expected goals model is trained on over 5 million shots and incorporates defensive positioning, not just shot location." },
    { q: "Do you cover lower-tier leagues?", a: "We actively track top 5 European leagues. Custom tracking for lower leagues can be arranged by providing raw video feeds." }
  ];

  return (
    <section className="py-32 px-6 bg-[#0A0F0D]">
      <div className="max-w-4xl mx-auto">
        <h2 className={`text-4xl md:text-5xl text-center text-white font-bold mb-16 tracking-tight ${archivo.className}`}>Briefing Room</h2>
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
          {faqs.map((faq, i) => (
            <div key={i}>
              <h3 className={`text-lg text-white font-semibold mb-2 ${archivo.className}`}>{faq.q}</h3>
              <p className={`text-[#8E9B94] text-sm leading-relaxed ${inter.className}`}>{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Newsletter() {
  return (
    <section className="py-32 px-6 bg-[#141C18] relative overflow-hidden flex justify-center">
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 8, repeat: Infinity, ease: [0.42, 0, 0.58, 1] as [number, number, number, number] }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#00FF85] rounded-full blur-[100px] pointer-events-none"
      />

      <div className="max-w-2xl w-full relative z-10 bg-[#0A0F0D] border-[0.5px] border-[#1F2924] rounded-3xl p-12 text-center shadow-2xl">
        <h2 className={`text-3xl md:text-4xl text-white font-bold mb-4 ${archivo.className}`}>The Tactical Brief</h2>
        <p className={`text-[#8E9B94] mb-8 ${inter.className}`}>
          Join 5,000+ analysts receiving our weekly breakdown of modern football trends driven by data.
        </p>
        <form className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            placeholder="name@club.com"
            className={`flex-1 bg-[#141C18] border border-[#1F2924] rounded-full text-white px-6 py-3 focus:outline-none focus:border-[#00FF85] transition-colors ${inter.className}`}
          />
          <button
            className={`bg-white text-[#0A0F0D] rounded-full px-8 py-3 font-semibold hover:bg-[#00FF85] transition-colors ${inter.className}`}
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#0A0F0D] pt-20 pb-10 px-6 border-t border-[#1F2924]">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-2 md:col-span-1">
          <div className={`text-xl ${archivo.className} font-bold flex items-center gap-2 text-white mb-4`}>
            <div className="w-4 h-4 rounded-full bg-[#00FF85] flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-[#0A0F0D]" />
            </div>
            PitchVision
          </div>
          <p className={`text-[#8E9B94] text-sm ${inter.className}`}>
            Clinical analytics for the beautiful game.
          </p>
        </div>

        <div>
          <h4 className={`text-white mb-4 font-semibold ${archivo.className}`}>Product</h4>
          <ul className={`space-y-2 text-[#8E9B94] text-sm ${inter.className}`}>
            <li><a href="#" className="hover:text-white transition-colors">Tactics Board</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Optical Tracking</a></li>
            <li><a href="#" className="hover:text-white transition-colors">API Docs</a></li>
          </ul>
        </div>

        <div>
          <h4 className={`text-white mb-4 font-semibold ${archivo.className}`}>Resources</h4>
          <ul className={`space-y-2 text-[#8E9B94] text-sm ${inter.className}`}>
            <li><a href="#" className="hover:text-white transition-colors">Case Studies</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Whitepapers</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
          </ul>
        </div>

        <div>
          <h4 className={`text-white mb-4 font-semibold ${archivo.className}`}>Company</h4>
          <ul className={`space-y-2 text-[#8E9B94] text-sm ${inter.className}`}>
            <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
          </ul>
        </div>
      </div>
      <div className={`text-center text-[#8E9B94] text-sm ${inter.className} pt-8 border-t border-[#1F2924]`}>
        © {new Date().getFullYear()} PitchVision Analytics Ltd. All rights reserved.
      </div>
    </footer>
  );
}

export default function PitchVisionPage() {
  return (
    <div className="min-h-screen bg-[#0A0F0D] text-white selection:bg-[#00FF85]/30">
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
  );
}
