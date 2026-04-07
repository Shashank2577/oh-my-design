'use client';

import React, { useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Russo_One, Public_Sans } from 'next/font/google';
import { Shield, ChevronRight, CheckCircle, Crosshair, Target, Activity, Menu, X } from 'lucide-react';

const bigShoulders = Russo_One({ subsets: ['latin'], weight: ['400'] });
const publicSans = Public_Sans({ subsets: ['latin'], weight: ['400', '600', '700'] });

const TOKENS = {
  background: '#121A12',
  surface: '#1E291E',
  accent1: '#F2F2F2',
  accent2: '#8B4513',
  border: 'rgba(255, 255, 255, 0.2)',
  textHigh: '#FFFFFF',
  textLow: '#A9B2A9',
};

// --- Physics ---
const impactEntry = {
  type: "spring" as const,
  stiffness: 200,
  damping: 25,
  mass: 1.5
};

// --- Shared Components ---
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 mb-12">
      <div className="h-[2px] w-12 bg-white/30" />
      <h2 className={`${bigShoulders.className} text-4xl md:text-6xl text-white uppercase tracking-wider font-black`}>
        {children}
      </h2>
      <div className="h-[2px] flex-1 bg-white/10" />
    </div>
  );
}

// --- Sections ---

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={impactEntry}
      className="fixed top-0 w-full z-50 px-6 py-4 border-b-4 border-[#8B4513] bg-[#121A12]"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className={`text-3xl ${bigShoulders.className} font-black flex items-center gap-2 text-white uppercase tracking-widest`}>
          <Shield className="text-[#8B4513]" size={32} /> WAR ROOM
        </div>
        <div className={`hidden md:flex gap-8 ${publicSans.className} text-[#A9B2A9] text-sm uppercase font-bold tracking-widest`}>
          <a href="#" className="hover:text-white transition-colors">Playbook</a>
          <a href="#" className="hover:text-white transition-colors">Roster</a>
          <a href="#" className="hover:text-white transition-colors">Draft</a>
          <a href="#" className="hover:text-white transition-colors">Intel</a>
        </div>
        <div className="hidden md:block">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`bg-white text-[#121A12] px-8 py-3 ${publicSans.className} uppercase font-bold tracking-widest text-sm border-b-4 border-gray-400 hover:mt-1 hover:border-b-0 hover:mb-1 transition-all`}
          >
            Draft Now
          </motion.button>
        </div>
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden absolute top-full left-0 w-full bg-[#1E291E] border-b border-white/10 flex flex-col items-center py-6 gap-6"
          >
            <a href="#" className={`text-white/70 ${publicSans.className} uppercase font-bold`}>Playbook</a>
            <a href="#" className={`text-white/70 ${publicSans.className} uppercase font-bold`}>Roster</a>
            <a href="#" className={`text-white/70 ${publicSans.className} uppercase font-bold`}>Draft</a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative min-h-screen pt-24 overflow-hidden flex items-center bg-[#121A12]">
      {/* Field Background */}
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 z-0 flex flex-col justify-between py-20 opacity-20 pointer-events-none"
      >
        {[...Array(11)].map((_, i) => (
          <div key={i} className="flex items-center w-full">
            <div className={`text-[#F2F2F2] ${bigShoulders.className} text-4xl font-black w-16 text-right pr-4 opacity-50`}>
              {i === 0 || i === 10 ? 'G' : `${i < 5 ? i * 10 : (10 - i) * 10}`}
            </div>
            <div className={`h-1 w-full ${i % 5 === 0 ? 'bg-white' : 'bg-white/30'}`} />
            <div className={`text-[#F2F2F2] ${bigShoulders.className} text-4xl font-black w-16 text-left pl-4 opacity-50 rotate-180`}>
              {i === 0 || i === 10 ? 'G' : `${i < 5 ? i * 10 : (10 - i) * 10}`}
            </div>
          </div>
        ))}
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={impactEntry}
          >
            <div className={`inline-block px-4 py-1 bg-[#8B4513] text-white ${publicSans.className} uppercase font-bold tracking-widest text-xs mb-6`}>
              First Down & Ten
            </div>
            <h1 className={`text-6xl md:text-8xl lg:text-[100px] text-white leading-none font-black uppercase mb-6 ${bigShoulders.className}`}>
              Dominate <br /> The <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#A9B2A9]">Gridiron</span>
            </h1>
            <p className={`text-xl text-[#A9B2A9] mb-10 max-w-lg leading-relaxed ${publicSans.className}`}>
              Advanced analytics and tactical playcalling for the modern coach. Turn raw talent into an unstoppable franchise.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`bg-white text-[#121A12] px-10 py-4 ${publicSans.className} uppercase font-bold tracking-widest border-b-4 border-gray-400 hover:mt-1 hover:border-b-0 hover:mb-1 transition-all flex items-center justify-center gap-2`}
              >
                Start Free Trial <ChevronRight size={20} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`bg-[#1E291E] text-white px-10 py-4 ${publicSans.className} uppercase font-bold tracking-widest border-b-4 border-[#121A12] hover:mt-1 hover:border-b-0 hover:mb-1 transition-all`}
              >
                View Playbook
              </motion.button>
            </div>
          </motion.div>

          {/* Tactical Board Hero Image Replacement */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ ...impactEntry, delay: 0.2 }}
            className="relative w-full aspect-square max-w-lg mx-auto bg-[#1E291E] border-4 border-white/20 p-8 transform-gpu"
            style={{ backgroundImage: 'radial-gradient(#ffffff33 1px, transparent 1px)', backgroundSize: '20px 20px' }}
          >
            {/* Chalk lines drawn with SVG */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 1, ease: [0.23, 1, 0.32, 1] }}
                d="M 20 80 Q 40 40 80 20"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 1.5, ease: [0.23, 1, 0.32, 1] }}
                d="M 50 80 L 50 40 L 70 40"
                fill="none"
                stroke="#8B4513"
                strokeWidth="3"
              />
            </svg>

            {/* Player Nodes */}
            <div className="absolute bottom-[20%] left-[20%] w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold text-xs">QB</div>
            <div className="absolute bottom-[20%] left-[50%] w-8 h-8 rounded-full border-2 border-white text-white flex items-center justify-center font-bold text-xs">C</div>
            <div className="absolute bottom-[20%] left-[80%] w-8 h-8 rounded-full border-2 border-white text-white flex items-center justify-center font-bold text-xs">WR</div>

            <div className="absolute top-[20%] right-[20%]">
               <Crosshair size={32} className="text-[#8B4513]" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const stats = [
    { label: "Franchises", value: "32" },
    { label: "Plays Analyzed", value: "1.4M" },
    { label: "Predictive Acc.", value: "94%" },
    { label: "Championships", value: "12" }
  ];

  return (
    <section className="py-20 px-6 bg-[#1E291E] border-y border-white/10 relative">
      {/* Cut grass mask overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#000_10px,#000_20px)]" />

      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, delay: i * 0.1 }}
            className="flex flex-col items-center justify-center p-6 border-2 border-white/5 bg-[#121A12]"
          >
            <div className={`text-5xl md:text-7xl text-white mb-2 font-black ${bigShoulders.className}`}>{stat.value}</div>
            <div className={`text-[#A9B2A9] uppercase font-bold tracking-widest text-xs text-center ${publicSans.className}`}>{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Features() {
  const features = [
    { icon: <Target />, title: "Precision Targeting", desc: "Analyze defensive weaknesses down to the yard line with our proprietary heatmaps." },
    { icon: <Shield />, title: "Blitz Protection", desc: "Automated offensive line adjustments based on pre-snap defensive formations." },
    { icon: <Activity />, title: "Fatigue Tracking", desc: "Real-time biometric data keeps your stars fresh for the fourth quarter." },
    { icon: <Crosshair />, title: "Draft Optics", desc: "Uncover hidden collegiate gems with our deep-learning scouting algorithms." },
    { icon: <CheckCircle />, title: "Chalk Talk AI", desc: "Instantly generate whiteboard diagrams from raw game footage." },
    { icon: <Shield />, title: "Zone Defense", desc: "Perfect your coverage shells with simulated offensive routing." }
  ];

  return (
    <section className="py-32 px-6 bg-[#121A12]">
      <div className="max-w-7xl mx-auto">
        <SectionTitle>The Arsenal</SectionTitle>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ ...impactEntry, delay: i * 0.1 }}
              className="bg-[#1E291E] border border-white/10 p-8 hover:border-white/30 transition-colors group"
            >
              <div className="w-14 h-14 bg-[#121A12] border border-white/20 flex items-center justify-center text-white mb-6 group-hover:text-[#8B4513] group-hover:border-[#8B4513] transition-colors">
                {feat.icon}
              </div>
              <h3 className={`text-3xl text-white mb-4 uppercase font-bold ${bigShoulders.className}`}>{feat.title}</h3>
              <p className={`text-[#A9B2A9] ${publicSans.className}`}>{feat.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductDetail() {
  return (
    <section className="py-32 px-6 bg-[#1E291E] border-y-8 border-[#8B4513] relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionTitle>The War Room</SectionTitle>
            <div className={`space-y-6 text-[#A9B2A9] text-lg leading-relaxed ${publicSans.className}`}>
              <p>
                Games aren't won on Sunday. They are won on Tuesday morning in the film room. WAR ROOM is the definitive platform for coaches who demand absolute control over their strategic preparation.
              </p>
              <p>
                Our "Chalk-Talk" engine translates complex video data into actionable 2D vector plays. Every motion, every block, and every route is mapped against our historical database of defensive tendencies.
              </p>
              <ul className="space-y-4 mt-8">
                {['Dynamic Play Call Sheets', 'Opponent Tendency Mapping', 'Real-time Sideline Sync'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-white font-bold uppercase tracking-wider text-sm">
                    <div className="w-2 h-2 bg-[#8B4513]" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="relative">
            {/* Play-by-Play Scroller Placeholder */}
            <div className="bg-[#121A12] border-4 border-white/20 p-6 h-[500px] overflow-hidden relative">
              <div className="absolute left-10 top-0 bottom-0 w-1 bg-white/10" />
              <div className="space-y-12 pt-10">
                {[
                  { down: "1st & 10", play: "HB Dive", yards: "+4" },
                  { down: "2nd & 6", play: "PA Crossers", yards: "+18" },
                  { down: "1st & 10", play: "WR Screen", yards: "-2" },
                  { down: "2nd & 12", play: "Four Verticals", yards: "INC" },
                ].map((play, i) => (
                  <motion.div
                    key={i}
                    initial={{ x: 50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ margin: "-100px" }}
                    transition={impactEntry}
                    className="relative pl-20"
                  >
                    <div className="absolute left-[-16px] top-1 w-8 h-8 bg-[#8B4513] rounded-full border-4 border-[#121A12] flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                    <div className={`text-2xl text-white font-black uppercase ${bigShoulders.className}`}>{play.down}</div>
                    <div className={`text-white/70 ${publicSans.className} font-bold`}>{play.play} <span className="text-[#A9B2A9] font-normal ml-2">({play.yards})</span></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const plans = [
    { name: "Coordinator", price: "$299", desc: "Essential film breakdown for high school programs.", features: ["Basic Chalk-Talk", "100GB Film Storage", "Standard Support"] },
    { name: "Head Coach", price: "$899", desc: "Advanced analytics for collegiate competition.", features: ["Predictive AI Engine", "Unlimited Storage", "Real-time Sideline Sync", "Opponent Scouting"], highlight: true },
    { name: "Franchise", price: "Custom", desc: "Enterprise deployment for professional organizations.", features: ["Custom Data Integration", "Dedicated Data Scientist", "On-premise Hosting"] }
  ];

  return (
    <section className="py-32 px-6 bg-[#121A12]">
      <div className="max-w-7xl mx-auto">
        <SectionTitle>Recruit Your Staff</SectionTitle>
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className={`p-8 border-4 ${plan.highlight ? 'border-[#8B4513] bg-[#1E291E]' : 'border-white/10 bg-[#121A12]'} flex flex-col`}
            >
              {plan.highlight && <div className={`text-[#8B4513] font-bold uppercase tracking-widest text-xs mb-4 ${publicSans.className}`}>League Standard</div>}
              <h3 className={`text-4xl text-white uppercase font-black mb-2 ${bigShoulders.className}`}>{plan.name}</h3>
              <p className={`text-[#A9B2A9] mb-8 h-12 ${publicSans.className}`}>{plan.desc}</p>
              <div className={`text-6xl text-white font-black mb-8 ${bigShoulders.className}`}>
                {plan.price}<span className="text-xl text-[#A9B2A9] font-normal">/mo</span>
              </div>
              <ul className={`space-y-4 mb-12 flex-1 ${publicSans.className}`}>
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-3 text-white">
                    <CheckCircle size={16} className={plan.highlight ? "text-[#8B4513]" : "text-white/50"} /> {f}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-4 uppercase font-bold tracking-widest text-sm border-b-4 transition-all ${plan.highlight ? 'bg-white text-[#121A12] border-gray-400 hover:border-b-0 hover:mt-1 hover:mb-1' : 'bg-[#1E291E] text-white border-[#121A12] hover:border-white/20'} ${publicSans.className}`}>
                Draft Protocol
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
    { name: "Coach Taylor", role: "Head Coach", company: "Panthers", text: "WAR ROOM completely overhauled our offensive scheme. We're seeing defensive rotations before the snap." },
    { name: "M. Johnson", role: "Defensive Coord.", company: "State Univ", text: "The Chalk-Talk AI saves my staff 20 hours a week in film breakdown. It's the most powerful tool we've ever used." },
    { name: "D. Smith", role: "GM", company: "Pro Franchise", text: "The draft optics module identified three late-round picks that are now starting for us. Incredible ROI." }
  ];

  return (
    <section className="py-32 px-6 bg-[#1E291E]">
      <div className="max-w-7xl mx-auto">
        <SectionTitle>Locker Room Talk</SectionTitle>
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((rev, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ ...impactEntry, delay: i * 0.1 }}
              className="bg-[#121A12] p-8 border-l-4 border-white/20"
            >
              <p className={`text-white text-lg mb-8 ${publicSans.className}`}>"{rev.text}"</p>
              <div className={`text-white font-black uppercase tracking-widest text-xl ${bigShoulders.className}`}>{rev.name}</div>
              <div className={`text-[#A9B2A9] text-sm uppercase font-bold ${publicSans.className}`}>{rev.role} // {rev.company}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = [
    { q: "Is WAR ROOM compatible with Hudl?", a: "Yes, we offer seamless two-way integration with major film exchange platforms including Hudl and XOS." },
    { q: "Do players need their own accounts?", a: "Players can be granted 'Roster' access to view assigned plays and film clips via our mobile app." },
    { q: "How secure is our playbook data?", a: "We utilize AES-256 encryption. Your proprietary schemes are locked down tighter than Fort Knox." },
    { q: "Does the AI work for college rules?", a: "The analytics engine can be toggled between High School, NCAA, and NFL rule sets and field dimensions." },
    { q: "What hardware is required for sideline sync?", a: "Any standard tablet works. Our local mesh network ensures sync even without stadium WiFi." },
    { q: "Can we export diagrams to PDF?", a: "Yes, fully formatted play call sheets and wristband inserts can be generated and exported instantly." }
  ];

  return (
    <section className="py-32 px-6 bg-[#121A12]">
      <div className="max-w-4xl mx-auto">
        <SectionTitle>Post-Game Presser</SectionTitle>
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
          {faqs.map((faq, i) => (
            <div key={i}>
              <h3 className={`text-2xl text-white font-black uppercase mb-3 ${bigShoulders.className}`}>{faq.q}</h3>
              <p className={`text-[#A9B2A9] ${publicSans.className} leading-relaxed`}>{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Newsletter() {
  return (
    <section className="py-32 px-6 bg-[#8B4513] relative overflow-hidden">
      {/* Texture overlay */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />

      <div className="max-w-3xl mx-auto relative z-10 text-center">
        <h2 className={`text-5xl md:text-7xl text-white font-black uppercase mb-6 ${bigShoulders.className}`}>Two-Minute Drill</h2>
        <p className={`text-white/80 mb-10 text-lg ${publicSans.className} font-bold uppercase tracking-wider`}>
          Sign up for weekly schematic breakdowns and analytics insights straight to your inbox.
        </p>
        <form className="flex flex-col sm:flex-row gap-4 justify-center max-w-xl mx-auto">
          <input
            type="email"
            placeholder="COACH@TEAM.COM"
            className={`bg-[#121A12] border-2 border-white/20 text-white px-6 py-4 w-full focus:outline-none focus:border-white ${publicSans.className} font-bold uppercase`}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`bg-white text-[#121A12] px-8 py-4 uppercase font-black tracking-widest text-lg ${bigShoulders.className} border-b-4 border-gray-400`}
          >
            Hut Hut
          </motion.button>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#121A12] pt-20 pb-10 px-6 border-t-8 border-[#1E291E]">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-2 md:col-span-1">
          <div className={`text-3xl ${bigShoulders.className} font-black flex items-center gap-2 text-white uppercase tracking-widest mb-6`}>
            <Shield className="text-[#8B4513]" size={32} /> WAR ROOM
          </div>
          <p className={`text-[#A9B2A9] ${publicSans.className} font-bold uppercase text-sm`}>
            Dominate the Gridiron.
          </p>
        </div>

        <div>
          <h4 className={`text-white mb-6 uppercase tracking-widest font-black text-xl ${bigShoulders.className}`}>Offense</h4>
          <ul className={`space-y-3 text-[#A9B2A9] ${publicSans.className} font-bold uppercase text-sm`}>
            <li><a href="#" className="hover:text-white transition-colors">Playbook</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Passing Charts</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Run Game</a></li>
          </ul>
        </div>

        <div>
          <h4 className={`text-white mb-6 uppercase tracking-widest font-black text-xl ${bigShoulders.className}`}>Defense</h4>
          <ul className={`space-y-3 text-[#A9B2A9] ${publicSans.className} font-bold uppercase text-sm`}>
            <li><a href="#" className="hover:text-white transition-colors">Coverage</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Blitz Packages</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Tendencies</a></li>
          </ul>
        </div>

        <div>
          <h4 className={`text-white mb-6 uppercase tracking-widest font-black text-xl ${bigShoulders.className}`}>Front Office</h4>
          <ul className={`space-y-3 text-[#A9B2A9] ${publicSans.className} font-bold uppercase text-sm`}>
            <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
          </ul>
        </div>
      </div>
      <div className={`text-center text-[#A9B2A9] text-sm font-bold uppercase ${publicSans.className} pt-8 border-t border-white/10`}>
        © {new Date().getFullYear()} WAR ROOM ANALYTICS. ALL RIGHTS RESERVED.
      </div>
    </footer>
  );
}

export default function GridironFlowPage() {
  return (
    <div className="min-h-screen bg-[#121A12] text-white selection:bg-[#8B4513]/50">
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
