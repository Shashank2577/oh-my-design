'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Poppins, Roboto_Mono } from 'next/font/google';
import { Play, MessageSquare, Zap, Trophy, Shield, Crosshair, Menu, X, ArrowRight } from 'lucide-react';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '600', '800', '900'] });
const robotoMono = Roboto_Mono({ subsets: ['latin'], weight: ['400', '700'] });

const TOKENS = {
  background: '#0D0D10',
  surface: '#1A1A22',
  accent1: '#9146FF',
  accent2: '#FFB800',
  border: 'rgba(145, 70, 255, 0.4)',
  textHigh: '#FFFFFF',
  textLow: '#ADADB8',
};

// --- Physics ---
const springPop = {
  type: "spring" as const,
  stiffness: 400,
  damping: 20,
  mass: 0.5
};

const slideOut = {
  type: "spring" as const,
  stiffness: 300,
  damping: 25
};

// --- Shared Components ---
function GlowButton({ children, className = "", primary = true }: { children: React.ReactNode, className?: string, primary?: boolean }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`relative px-8 py-3 rounded-md font-bold overflow-hidden group ${className} ${primary ? 'bg-[#9146FF] text-white' : 'bg-[#1A1A22] text-[#9146FF] border border-[#9146FF]'}`}
    >
      {primary && (
        <div className="absolute inset-0 bg-[#FFB800] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out" />
      )}
      <span className="relative z-10">{children}</span>
      {primary && (
        <div className="absolute inset-0 shadow-[0_0_20px_rgba(145,70,255,0.6)] group-hover:shadow-[0_0_30px_rgba(255,184,0,0.6)] transition-shadow" />
      )}
    </motion.button>
  );
}

// --- Sections ---

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={slideOut}
      className="fixed top-0 w-full z-50 px-6 py-4 bg-[#0D0D10]/90 backdrop-blur-lg border-b border-[rgba(145,70,255,0.4)]"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className={`text-2xl ${poppins.className} font-black flex items-center gap-2 text-white italic`}>
          <Crosshair className="text-[#9146FF]" /> E-LEAGUE PRO
        </div>
        <div className={`hidden md:flex gap-8 ${poppins.className} text-[#ADADB8] font-bold text-sm uppercase`}>
          <a href="#" className="hover:text-white transition-colors">Overlays</a>
          <a href="#" className="hover:text-white transition-colors">Widgets</a>
          <a href="#" className="hover:text-white transition-colors">Alerts</a>
          <a href="#" className="hover:text-white transition-colors">Pricing</a>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <span className={`flex items-center gap-2 text-xs font-bold text-[#FFB800] ${robotoMono.className}`}>
            <span className="w-2 h-2 rounded-full bg-[#FFB800] animate-pulse" /> LIVE
          </span>
          <GlowButton className="text-sm py-2 px-6">Get Started</GlowButton>
        </div>
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={slideOut}
            className="md:hidden absolute top-full right-0 w-64 h-screen bg-[#1A1A22] border-l border-[#9146FF]/30 flex flex-col p-6 gap-6"
          >
            <a href="#" className={`text-white font-bold uppercase ${poppins.className}`}>Overlays</a>
            <a href="#" className={`text-white font-bold uppercase ${poppins.className}`}>Widgets</a>
            <a href="#" className={`text-white font-bold uppercase ${poppins.className}`}>Alerts</a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

function Hero() {
  const [chatItems, setChatItems] = useState([
    { id: 1, user: "NinjaFan99", msg: "POGGERS", color: "#FF5555" },
    { id: 2, user: "ProSniper", msg: "Insane shot!", color: "#55FF55" },
    { id: 3, user: "StreamKing", msg: "W", color: "#5555FF" }
  ]);
  const [particles, setParticles] = useState<{ emoji: string, xDir: number, duration: number, delay: number, left: string }[]>([]);

  useEffect(() => {
    // Generate particles only on the client to avoid SSR hydration mismatches
    const emojis = ['🔥', '💯', '✨', '💀', '👾'];
    const newParticles = Array.from({ length: 15 }).map(() => ({
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      xDir: Math.random() > 0.5 ? 100 : -100,
      duration: 10 + Math.random() * 10,
      delay: Math.random() * 5,
      left: `${Math.random() * 100}%`
    }));
    setParticles(newParticles);

    const interval = setInterval(() => {
      setChatItems(prev => {
        const newId = prev.length ? prev[prev.length - 1].id + 1 : 1;
        const msgs = ["GG", "Kappa", "HYPE", "No way", "LUL", "10/10"];
        const colors = ["#FF5555", "#55FF55", "#5555FF", "#FFFF55", "#FF55FF"];
        const newItem = {
          id: newId,
          user: `User_${Math.floor(Math.random() * 1000)}`,
          msg: msgs[Math.floor(Math.random() * msgs.length)],
          color: colors[Math.floor(Math.random() * colors.length)]
        };
        return [...prev.slice(-4), newItem];
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen pt-32 pb-20 overflow-hidden flex items-center bg-[#0D0D10]">
      {/* Floating Emoji Particles Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
        {particles.map((p, i) => (
          <motion.div
            key={i}
            animate={{
              y: ['100vh', '-10vh'],
              x: [0, p.xDir]
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "linear",
              delay: p.delay
            }}
            className="absolute text-2xl"
            style={{ left: p.left }}
          >
            {p.emoji}
          </motion.div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={slideOut}
        >
          <motion.div
            animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
            className={`inline-flex items-center gap-2 px-3 py-1 rounded bg-[#9146FF]/20 border border-[#9146FF] text-[#9146FF] ${robotoMono.className} text-xs font-bold mb-8`}
          >
            <Zap size={14} /> NEW OVERLAYS ADDED
          </motion.div>
          <h1 className={`text-6xl md:text-8xl text-white font-black uppercase leading-none mb-6 ${poppins.className} italic`}>
            Level Up Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9146FF] to-[#FFB800]">Broadcast</span>
          </h1>
          <p className={`text-lg text-[#ADADB8] mb-10 max-w-lg font-medium ${poppins.className}`}>
            Hyper-reactive stream overlays, widgets, and alerts designed for professional eSports creators. Engage your chat like never before.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <GlowButton className="flex items-center justify-center gap-2">
              <Play size={20} /> Login with Twitch
            </GlowButton>
            <GlowButton primary={false} className="flex items-center justify-center gap-2">
              View Gallery
            </GlowButton>
          </div>
        </motion.div>

        {/* Live Stream Mockup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ ...springPop, delay: 0.2 }}
          className="relative aspect-video bg-[#1A1A22] rounded-xl border border-[#9146FF]/40 shadow-[0_0_50px_rgba(145,70,255,0.2)] overflow-hidden transform-gpu flex"
        >
          {/* Main Video Area */}
          <div className="flex-1 relative bg-black flex items-center justify-center">
            <Play size={64} className="text-white/20" />

            {/* Webcam Frame Morph */}
            <motion.div
              animate={{
                scale: [1, 1.02, 1],
                borderColor: ['rgba(145,70,255,0.8)', 'rgba(255,184,0,0.8)', 'rgba(145,70,255,0.8)']
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute bottom-4 left-4 w-48 aspect-video bg-zinc-800 rounded-md border-2 overflow-hidden shadow-lg"
            >
              <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            </motion.div>

            {/* Donation Alert */}
            <motion.div
              animate={{ y: [0, -10, 0], opacity: [0, 1, 0] }}
              transition={{ duration: 4, repeat: Infinity, repeatDelay: 2 }}
              className="absolute top-10 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#FFB800] to-[#FF5555] px-6 py-2 rounded-full text-black font-bold flex items-center gap-2 shadow-lg"
            >
              <Trophy size={18} /> New Sub: KingSlayer
            </motion.div>
          </div>

          {/* Chat Sidebar */}
          <div className="w-64 bg-[#0D0D10] border-l border-white/10 flex flex-col">
            <div className={`p-3 border-b border-white/10 text-white font-bold text-sm ${poppins.className} flex justify-between items-center`}>
              Stream Chat <span className="text-[#9146FF] text-xs">12.4k</span>
            </div>
            <div className="flex-1 p-3 flex flex-col justify-end gap-2 overflow-hidden relative">
              <AnimatePresence initial={false}>
                {chatItems.map(item => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: 20, scale: 0.8 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={springPop}
                    className={`text-sm ${robotoMono.className} break-words`}
                  >
                    <span style={{ color: item.color }} className="font-bold">{item.user}: </span>
                    <span className="text-white/90">{item.msg}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Stats() {
  const stats = [
    { label: "Active Streamers", value: "250K+" },
    { label: "Alerts Fired", value: "1.2B" },
    { label: "Uptime", value: "99.99%" },
    { label: "Supported Platforms", value: "6" }
  ];

  return (
    <section className="py-12 px-6 border-y border-[#1A1A22] bg-[#0D0D10]">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...springPop, delay: i * 0.1 }}
            className="flex flex-col items-center"
          >
            <div className={`text-4xl text-white font-black mb-1 ${poppins.className}`}>{stat.value}</div>
            <div className={`text-[#ADADB8] uppercase text-xs font-bold ${robotoMono.className}`}>{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Features() {
  const features = [
    { icon: <Zap />, title: "Instant Alerts", desc: "Zero-latency notifications for subs, donos, and follows with custom particle effects." },
    { icon: <MessageSquare />, title: "Chat Integration", desc: "On-screen chat widgets that highlight mentions and filter out bot spam automatically." },
    { icon: <Trophy />, title: "Dynamic Goals", desc: "Sub and donation goals that react to progress with growing hype animations." },
    { icon: <Shield />, title: "Cloud Hosted", desc: "No local software required. Everything runs smoothly in the browser via OBS browser source." },
    { icon: <Crosshair />, title: "Game Sync", desc: "Overlays that change color or state based on your in-game status (supported titles only)." },
    { icon: <Play />, title: "Media Share", desc: "Let viewers play videos on stream safely with our auto-moderation tools." }
  ];

  return (
    <section className="py-32 px-6 bg-[#1A1A22]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className={`text-4xl md:text-6xl text-white font-black uppercase italic mb-4 ${poppins.className}`}>The Streamer's Toolkit</h2>
          <p className={`text-[#ADADB8] max-w-2xl mx-auto ${poppins.className}`}>Everything you need to turn a basic broadcast into a professional production.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(145,70,255,0.15)" }}
              className="bg-[#0D0D10] p-8 rounded-lg border border-white/5 hover:border-[#9146FF]/50 transition-colors group"
            >
              <div className="w-12 h-12 rounded-md bg-[#1A1A22] border border-white/10 flex items-center justify-center text-[#9146FF] mb-6 group-hover:scale-110 group-hover:bg-[#9146FF] group-hover:text-white transition-all">
                {feat.icon}
              </div>
              <h3 className={`text-2xl text-white font-bold mb-3 ${poppins.className}`}>{feat.title}</h3>
              <p className={`text-[#ADADB8] text-sm ${robotoMono.className} leading-relaxed`}>{feat.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductDetail() {
  return (
    <section className="py-32 px-6 bg-[#0D0D10] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-[#9146FF] opacity-[0.03] blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div className="order-2 lg:order-1 relative">
          <div className="bg-[#1A1A22] border border-[#9146FF]/30 rounded-xl p-6 shadow-2xl">
            <div className={`text-white font-bold mb-4 flex items-center justify-between ${poppins.className}`}>
              <span>Real-time Event Feed</span>
              <span className="flex items-center gap-2 text-xs text-[#00FF41]">
                <span className="w-2 h-2 rounded-full bg-[#00FF41] animate-pulse" /> Connected
              </span>
            </div>
            <div className="space-y-3">
              {[
                { type: "DONATION", user: "EpicGamer", amount: "$50.00", color: "#FFB800" },
                { type: "SUBSCRIBER", user: "StreamSniper", amount: "Tier 1", color: "#9146FF" },
                { type: "FOLLOWER", user: "NewViewer123", amount: "", color: "#00FF41" }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className="bg-[#0D0D10] p-4 rounded border-l-4"
                  style={{ borderLeftColor: item.color }}
                >
                  <div className={`text-xs font-bold mb-1`} style={{ color: item.color }}>{item.type}</div>
                  <div className={`text-white text-sm ${robotoMono.className}`}>
                    <span className="font-bold">{item.user}</span> {item.amount && `- ${item.amount}`}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <h2 className={`text-4xl md:text-5xl text-white font-black italic uppercase mb-6 ${poppins.className}`}>
            Hyper-Reactive <br/> Architecture
          </h2>
          <div className={`space-y-6 text-[#ADADB8] text-lg ${poppins.className}`}>
            <p>
              Stop wrestling with clunky software. Our widgets are built on modern web tech, meaning they load instantly, consume near-zero CPU, and react to events in milliseconds.
            </p>
            <p>
              Customize every pixel using our visual editor. Add custom CSS/HTML if you're a power user. When you're ready, copy a single URL into your broadcasting software and you're live.
            </p>
          </div>
          <GlowButton primary={false} className="mt-8 flex items-center gap-2">
            Explore Dashboard <ArrowRight size={18} />
          </GlowButton>
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const plans = [
    { name: "Amateur", price: "$0", desc: "Basic overlays for new streamers.", features: ["Standard Alerts", "Chat Widget", "720p Media Share"] },
    { name: "Pro", price: "$9.99", desc: "Premium tools for growing channels.", features: ["Custom CSS/HTML", "Zero Watermarks", "1080p Media Share", "Priority Support"], highlight: true },
    { name: "Partner", price: "$24.99", desc: "For full-time broadcasters and orgs.", features: ["Dedicated Server Nodes", "Custom API Access", "Multiple Channel Sync"] }
  ];

  return (
    <section className="py-32 px-6 bg-[#1A1A22]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className={`text-4xl md:text-5xl text-white font-black italic uppercase mb-4 ${poppins.className}`}>Choose Your Loadout</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className={`p-8 rounded-xl border ${plan.highlight ? 'border-[#9146FF] bg-gradient-to-b from-[#9146FF]/10 to-[#1A1A22] shadow-[0_0_30px_rgba(145,70,255,0.15)]' : 'border-white/10 bg-[#0D0D10]'} relative flex flex-col`}
            >
              {plan.highlight && <div className={`absolute -top-3 left-1/2 -translate-x-1/2 bg-[#FFB800] text-black px-4 py-1 text-xs font-bold rounded-full uppercase ${poppins.className}`}>Most Popular</div>}
              <h3 className={`text-2xl text-white font-black uppercase mb-2 ${poppins.className}`}>{plan.name}</h3>
              <p className={`text-[#ADADB8] text-sm mb-8 h-10 ${poppins.className}`}>{plan.desc}</p>
              <div className={`text-5xl text-white font-black mb-8 ${poppins.className}`}>
                {plan.price}<span className="text-lg text-[#ADADB8] font-normal">/mo</span>
              </div>
              <ul className={`space-y-4 mb-12 flex-1 ${robotoMono.className} text-sm`}>
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-3 text-white/80">
                    <Crosshair size={14} className={plan.highlight ? "text-[#9146FF]" : "text-white/30"} /> {f}
                  </li>
                ))}
              </ul>
              <GlowButton primary={plan.highlight} className="w-full">
                Select {plan.name}
              </GlowButton>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const reviews = [
    { name: "NinjaFan99", role: "Variety Streamer", text: "The custom CSS capabilities let me build an overlay that exactly matches my brand. My chat engagement has doubled." },
    { name: "FPS_Legend", role: "Pro Player", text: "Zero impact on my game performance. The alerts fire instantly and look incredibly crisp on stream." },
    { name: "CozyGamerGirl", role: "VTuber", text: "The dynamic sub goals look amazing. My community loves seeing the hype bar explode when we hit a milestone." }
  ];

  return (
    <section className="py-32 px-6 bg-[#0D0D10] border-y border-[#1A1A22]">
      <div className="max-w-7xl mx-auto">
        <h2 className={`text-4xl text-center text-white font-black italic uppercase mb-20 ${poppins.className}`}>Streamer Shoutouts</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((rev, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ ...springPop, delay: i * 0.1 }}
              className="bg-[#1A1A22] p-8 rounded-lg border border-white/5 relative"
            >
              <div className="text-[#9146FF] text-4xl font-serif absolute top-4 left-4 opacity-20">"</div>
              <p className={`text-white text-md mb-8 relative z-10 ${poppins.className}`}>"{rev.text}"</p>
              <div className={`text-[#FFB800] font-bold ${robotoMono.className}`}>{rev.name}</div>
              <div className={`text-[#ADADB8] text-xs uppercase mt-1 ${poppins.className}`}>{rev.role}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = [
    { q: "Is it compatible with OBS Studio?", a: "Yes, fully compatible with OBS Studio, Streamlabs Desktop, XSplit, and any broadcasting software that supports browser sources." },
    { q: "Do you support YouTube and Kick?", a: "We currently support Twitch, YouTube, Facebook Gaming, Kick, and Trovo natively." },
    { q: "Can I import my own alert sounds?", a: "Absolutely. You can upload custom audio files (MP3/OGG) and videos (WebM/MP4) for all your alerts." },
    { q: "Does it cause lag?", a: "No. Our widgets are heavily optimized web pages rendered by your broadcasting software. They use negligible CPU/RAM." },
    { q: "How do I trigger test alerts?", a: "Your dashboard includes an emulator where you can fire test events to ensure everything looks perfect before going live." },
    { q: "Can I use it on console?", a: "Console streamers need to stream through a capture card to a PC running broadcasting software to use our overlays." }
  ];

  return (
    <section className="py-32 px-6 bg-[#1A1A22]">
      <div className="max-w-4xl mx-auto">
        <h2 className={`text-4xl text-center text-white font-black italic uppercase mb-16 ${poppins.className}`}>Command Line / FAQ</h2>
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-[#0D0D10] p-6 rounded border border-white/5">
              <h3 className={`text-lg text-white font-bold mb-3 flex items-start gap-2 ${poppins.className}`}>
                <span className="text-[#9146FF] mt-1">{`>`}</span> {faq.q}
              </h3>
              <p className={`text-[#ADADB8] text-sm ${robotoMono.className} leading-relaxed pl-5`}>{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Newsletter() {
  return (
    <section className="py-32 px-6 bg-[#0D0D10] relative overflow-hidden flex justify-center">
      {/* Real-time Ticker Marquee */}
      <motion.div
        animate={{ x: ["0%", "-100%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 left-0 w-[200%] bg-[#FFB800] text-black py-2 flex whitespace-nowrap z-0 font-bold uppercase tracking-widest text-sm"
      >
        <span className="mx-4">NEW DONATION: ANON $100</span> • <span className="mx-4">TOP SUB: NINJA</span> • <span className="mx-4">HYPE TRAIN LEVEL 5</span> • <span className="mx-4">NEW DONATION: ANON $100</span> • <span className="mx-4">TOP SUB: NINJA</span> • <span className="mx-4">HYPE TRAIN LEVEL 5</span> •
      </motion.div>

      <div className="max-w-2xl w-full relative z-10 bg-[#1A1A22] border border-[#9146FF]/50 rounded-xl p-12 text-center shadow-2xl mt-8">
        <h2 className={`text-3xl md:text-4xl text-white font-black italic uppercase mb-4 ${poppins.className}`}>Join the Beta</h2>
        <p className={`text-[#ADADB8] mb-8 ${robotoMono.className} text-sm`}>
          Get early access to our next-gen 3D widgets and AI chat moderation tools.
        </p>
        <form className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            placeholder="streamer@email.com"
            className={`flex-1 bg-[#0D0D10] border border-white/20 rounded text-white px-6 py-3 focus:outline-none focus:border-[#9146FF] transition-colors ${robotoMono.className} text-sm`}
          />
          <GlowButton className="py-3">
            Sign Up
          </GlowButton>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#0D0D10] pt-20 pb-10 px-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-2 md:col-span-1">
          <div className={`text-2xl ${poppins.className} font-black flex items-center gap-2 text-white italic mb-4`}>
            <Crosshair className="text-[#9146FF]" /> E-LEAGUE
          </div>
          <p className={`text-[#ADADB8] text-sm ${robotoMono.className}`}>
            Broadcast tools for the modern creator.
          </p>
        </div>

        <div>
          <h4 className={`text-white mb-4 font-bold uppercase ${poppins.className}`}>Products</h4>
          <ul className={`space-y-2 text-[#ADADB8] text-sm ${robotoMono.className}`}>
            <li><a href="#" className="hover:text-white transition-colors">Alert Box</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Chat Box</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Event List</a></li>
          </ul>
        </div>

        <div>
          <h4 className={`text-white mb-4 font-bold uppercase ${poppins.className}`}>Community</h4>
          <ul className={`space-y-2 text-[#ADADB8] text-sm ${robotoMono.className}`}>
            <li><a href="#" className="hover:text-[#9146FF] transition-colors">Discord</a></li>
            <li><a href="#" className="hover:text-[#9146FF] transition-colors">Twitter</a></li>
            <li><a href="#" className="hover:text-[#9146FF] transition-colors">YouTube</a></li>
          </ul>
        </div>

        <div>
          <h4 className={`text-white mb-4 font-bold uppercase ${poppins.className}`}>Legal</h4>
          <ul className={`space-y-2 text-[#ADADB8] text-sm ${robotoMono.className}`}>
            <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
          </ul>
        </div>
      </div>
      <div className={`text-center text-[#ADADB8] text-xs ${robotoMono.className} pt-8 border-t border-white/10 flex justify-center items-center gap-2`}>
        <div className="w-2 h-2 bg-green-500 rounded-full" /> ALL SYSTEMS OPERATIONAL
      </div>
    </footer>
  );
}

export default function ELeagueProPage() {
  return (
    <div className="min-h-screen bg-[#0D0D10] text-white selection:bg-[#9146FF]/30">
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
