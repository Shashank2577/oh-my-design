'use client';

import React, { useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Bodoni_Moda, Tenor_Sans } from 'next/font/google';
import { Award, Star, Shield, Crown, ChevronRight, CheckCircle, Diamond, ArrowUpRight, Menu, X } from 'lucide-react';

const bodoni = Bodoni_Moda({ subsets: ['latin'], style: ['normal', 'italic'] });
const tenor = Tenor_Sans({ weight: '400', subsets: ['latin'] });

const TOKENS = {
  background: '#050505',
  surface: '#FFFFFF',
  silver: '#C0C0C0',
  gold: '#D4AF37',
  glow: '0 30px 60px rgba(212, 175, 55, 0.2)',
  glowStrong: '0 0px 80px rgba(212, 175, 55, 0.4)',
};

// --- Physics ---
const antiGravityProps = {
  animate: {
    y: [-10, 10, -10],
    rotateX: [-2, 2, -2],
    rotateY: [-2, 2, -2],
  },
  transition: {
    duration: 6,
    repeat: Infinity,
    ease: [0.42, 0, 0.58, 1] as const
  }
};

// --- Shared Components ---
function GoldenGlowText({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10 bg-gradient-to-br from-[#D4AF37] via-[#FFF8D6] to-[#C0C0C0] text-transparent bg-clip-text">
        {children}
      </span>
      <span className="absolute inset-0 blur-xl bg-gradient-to-br from-[#D4AF37] to-transparent opacity-30 z-0"></span>
    </span>
  );
}

// --- Sections ---

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 w-full z-50 px-6 py-6 border-b border-white/5 bg-[#050505]/80 backdrop-blur-xl"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className={`text-2xl ${bodoni.className} flex items-center gap-2 text-white`}>
          <Crown className="text-[#D4AF37]" /> Legacy
        </div>
        <div className={`hidden md:flex gap-8 ${tenor.className} text-white/70 text-sm tracking-widest uppercase`}>
          <a href="#" className="hover:text-[#D4AF37] transition-colors">Exhibits</a>
          <a href="#" className="hover:text-[#D4AF37] transition-colors">Pedestals</a>
          <a href="#" className="hover:text-[#D4AF37] transition-colors">Pricing</a>
          <a href="#" className="hover:text-[#D4AF37] transition-colors">About</a>
        </div>
        <div className="hidden md:block">
          <motion.button
            whileHover={{ scale: 1.05, textShadow: "0 0 8px rgba(212,175,55,0.5)" }}
            className={`border border-[#D4AF37]/50 text-[#D4AF37] px-6 py-2 ${tenor.className} tracking-widest text-sm hover:bg-[#D4AF37]/10 transition-colors`}
          >
            Enter Vault
          </motion.button>
        </div>
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden absolute top-full left-0 w-full bg-[#050505] border-b border-white/10 flex flex-col items-center py-6 gap-6"
          >
            <a href="#" className={`text-white/70 ${tenor.className}`}>Exhibits</a>
            <a href="#" className={`text-white/70 ${tenor.className}`}>Pedestals</a>
            <a href="#" className={`text-white/70 ${tenor.className}`}>Pricing</a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

function Hero() {
  const { scrollY } = useScroll();
  const zTrans = useTransform(scrollY, [0, 1000], [0, 500]);
  const opacityTrans = useTransform(scrollY, [0, 500], [1, 0]);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth) * 2 - 1;
    const y = (clientY / window.innerHeight) * 2 - 1;
    setMousePos({ x, y });
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 perspective-1000"
      onMouseMove={handleMouseMove}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.05)_0%,#050505_100%)] pointer-events-none" />

      {/* 3D Pedestal Background Elements */}
      <motion.div
        style={{ z: zTrans, opacity: opacityTrans, rotateX: mousePos.y * 10, rotateY: mousePos.x * 10 }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div className="w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] border border-white/5 rounded-full absolute" />
        <div className="w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] border border-[#D4AF37]/10 rounded-full absolute" />
        <motion.div
          animate={{ rotateZ: 360 }}
          transition={{ duration: 100, repeat: Infinity, ease: [0, 0, 1, 1] }}
          className="w-[20vw] h-[20vw] max-w-[250px] max-h-[250px] border border-[#C0C0C0]/20 rounded-full absolute border-dashed"
        />
      </motion.div>

      <div className="relative z-10 text-center max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div className={`flex items-center justify-center gap-4 mb-8 text-[#D4AF37] ${tenor.className} tracking-[0.2em] text-sm`}>
            <span className="w-12 h-px bg-[#D4AF37]/50" />
            THE DIGITAL MUSEUM
            <span className="w-12 h-px bg-[#D4AF37]/50" />
          </div>
          <h1 className={`text-5xl md:text-8xl text-white mb-8 leading-tight ${bodoni.className}`}>
            Immortalize Your <br />
            <GoldenGlowText>Greatest Triumphs</GoldenGlowText>
          </h1>
          <p className={`text-xl text-white/50 mb-12 max-w-2xl mx-auto leading-relaxed ${tenor.className}`}>
            A spatial gallery for the modern achiever. Curate, display, and celebrate your milestones in a stunning 3D environment designed to revere history.
          </p>
          <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`bg-gradient-to-r from-[#D4AF37] to-[#C0C0C0] text-black px-10 py-4 ${tenor.className} tracking-widest text-sm font-bold flex items-center gap-3`}
            >
              CURATE COLLECTION <ArrowUpRight size={18} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.05)" }}
              className={`border border-white/20 text-white px-10 py-4 ${tenor.className} tracking-widest text-sm hover:border-[#D4AF37]/50 transition-colors`}
            >
              VIEW GALLERY
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Foreground Element */}
      <motion.div
        {...antiGravityProps}
        className="absolute bottom-10 right-10 md:bottom-20 md:right-32 w-32 h-32 hidden md:flex items-center justify-center"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37] to-[#C0C0C0] rounded-full blur-3xl opacity-20" />
        <Award size={64} className="text-[#D4AF37] relative z-10" />
      </motion.div>
    </section>
  );
}

function Stats() {
  const stats = [
    { label: "Milestones Displayed", value: "2.4M" },
    { label: "Digital Exhibits", value: "15K+" },
    { label: "Precious Assets", value: "8.9M" },
    { label: "Curator Satisfaction", value: "99.9%" }
  ];

  return (
    <section className="py-24 px-6 border-y border-white/5 bg-black/50 relative z-20">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 divide-x divide-white/5">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.8 }}
            className="text-center px-4"
          >
            <div className={`text-3xl md:text-5xl text-white mb-2 ${bodoni.className}`}>{stat.value}</div>
            <div className={`text-white/40 uppercase tracking-widest text-xs ${tenor.className}`}>{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Features() {
  const features = [
    { icon: <Star size={32} />, title: "Golden Aura", desc: "Ambient occlusion-style glow highlights your most prestigious items automatically." },
    { icon: <Crown size={32} />, title: "Pedestal Engine", desc: "Rotating 3D bases with physical reflection planes for hyper-realistic display." },
    { icon: <Diamond size={32} />, title: "Infinite Hallway", desc: "Parallax-driven halls that create a boundless sense of spatial depth." },
    { icon: <Shield size={32} />, title: "Vault Security", desc: "Military-grade encryption ensures your legacy remains untampered." },
    { icon: <Award size={32} />, title: "Achievement Burst", desc: "Clicking items triggers a glorious 3D expansion and celebration." },
    { icon: <CheckCircle size={32} />, title: "Curator Analytics", desc: "Track how often visitors admire your collection with heatmaps." }
  ];

  return (
    <section className="py-32 px-6 relative z-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h2 className={`text-4xl md:text-6xl text-white mb-6 ${bodoni.className}`}>The Architect's <GoldenGlowText>Toolkit</GoldenGlowText></h2>
          <p className={`text-white/50 max-w-2xl mx-auto ${tenor.className} text-lg`}>Everything required to construct a digital monument to your success.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, z: -100 }}
              whileInView={{ opacity: 1, z: 0 }}
              whileHover={{ y: -10, boxShadow: TOKENS.glow }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-white/5 border border-white/10 p-10 hover:border-[#D4AF37]/30 transition-all group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 rounded-bl-full blur-2xl group-hover:bg-[#D4AF37]/20 transition-colors" />
              <div className="text-[#C0C0C0] group-hover:text-[#D4AF37] transition-colors mb-6 flex items-center justify-center w-12 h-12">
                {feat.icon}
              </div>
              <h3 className={`text-2xl text-white mb-4 ${bodoni.className}`}>{feat.title}</h3>
              <p className={`text-white/50 leading-relaxed ${tenor.className}`}>{feat.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductDetail() {
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section className="py-32 px-6 bg-gradient-to-b from-[#050505] to-[#111111] overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
        <div className="relative h-[600px] flex items-center justify-center perspective-1000">
          <motion.div
            style={{ y: yParallax }}
            className="absolute inset-0 bg-[#FFFFFF] rounded-t-full shadow-[0_0_100px_rgba(212,175,55,0.15)] overflow-hidden"
          >
            {/* Marble Texture Approximation */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-radial-gradient(circle at 0 0, transparent 0, #000 1px, transparent 1px, transparent 100%)', backgroundSize: '20px 20px' }}></div>
            <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-black/20 to-transparent" />

            {/* 3D Model Proxy */}
            <motion.div
              {...antiGravityProps}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-64 bg-gradient-to-br from-[#D4AF37] to-[#8B7322] shadow-2xl"
              style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
            >
              <div className="absolute inset-0 bg-white/20 blur-sm" />
            </motion.div>
          </motion.div>
        </div>

        <div>
          <h2 className={`text-4xl md:text-6xl text-white mb-8 leading-tight ${bodoni.className}`}>
            A Spatial Museum, <br />
            <span className="text-[#C0C0C0] italic">Infinite & Glorious</span>
          </h2>
          <div className={`space-y-6 text-white/60 text-lg leading-relaxed ${tenor.className}`}>
            <p>
              Move away from flat, lifeless lists of achievements. Legacy builds a persistent, 3D architectural space where your milestones possess physical presence.
            </p>
            <p>
              Trophies bob gently in anti-gravity chambers. Walls reflect the golden aura of your highest accolades. As you navigate the infinite hallway, parallax layers create a profound sense of walking through your own personal history.
            </p>
            <p>
              It is not just a portfolio; it is a monument.
            </p>
          </div>
          <motion.button
            whileHover={{ x: 10 }}
            className={`mt-10 flex items-center gap-4 text-[#D4AF37] ${tenor.className} tracking-widest uppercase text-sm border-b border-[#D4AF37]/30 pb-2`}
          >
            Explore the Architecture <ChevronRight size={16} />
          </motion.button>
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const plans = [
    { name: "Patron", price: "0", desc: "A modest gallery for the rising star.", features: ["1 Exhibit Hall", "10 Pedestals", "Silver Ambient Lighting"] },
    { name: "Curator", price: "29", desc: "For the established collector.", features: ["Infinite Hallways", "Unlimited Pedestals", "Golden Aura Highlights", "Custom Marble Textures"], highlight: true },
    { name: "Institution", price: "99", desc: "Museum-grade infrastructure.", features: ["White-glove Setup", "Custom 3D Trophy Models", "Dedicated Server Vault", "VR Exhibition Mode"] }
  ];

  return (
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h2 className={`text-4xl md:text-6xl text-white mb-6 ${bodoni.className}`}>Reserve Your <GoldenGlowText>Wing</GoldenGlowText></h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -20 }}
              className={`p-10 border ${plan.highlight ? 'border-[#D4AF37] bg-[#D4AF37]/5 shadow-[0_0_50px_rgba(212,175,55,0.1)]' : 'border-white/10 bg-white/5'} relative flex flex-col`}
            >
              {plan.highlight && <div className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#D4AF37] text-black px-4 py-1 text-xs tracking-widest ${tenor.className}`}>RECOMMENDED</div>}
              <h3 className={`text-2xl text-white mb-2 ${bodoni.className}`}>{plan.name}</h3>
              <p className={`text-white/50 mb-8 h-10 ${tenor.className}`}>{plan.desc}</p>
              <div className={`text-5xl text-white mb-8 ${bodoni.className}`}>
                <span className="text-2xl text-white/50 align-top">$</span>{plan.price}<span className="text-lg text-white/50">/mo</span>
              </div>
              <ul className={`space-y-4 mb-12 flex-1 ${tenor.className} text-white/70`}>
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-3">
                    <Diamond size={12} className={plan.highlight ? "text-[#D4AF37]" : "text-[#C0C0C0]"} /> {f}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-4 ${plan.highlight ? 'bg-[#D4AF37] text-black' : 'border border-white/20 text-white hover:bg-white/5'} ${tenor.className} tracking-widest text-sm uppercase transition-colors`}>
                Select Tier
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
    { name: "Eleanor Vance", role: "Principal Architect", company: "Studio V", text: "Finally, a platform that treats digital accolades with the physical reverence they deserve. The spatial design is breathtaking." },
    { name: "Marcus Thorne", role: "eSports Champion", company: "Apex Syndicate", text: "My trophies used to be JPEGs on a generic profile. Now they sit on marble pedestals glowing in gold. It changes how people see my wins." },
    { name: "Sophia Lin", role: "Creative Director", company: "Lumina", text: "The anti-gravity physics make the gallery feel alive. It's a digital museum that I am proud to invite my clients into." }
  ];

  return (
    <section className="py-32 px-6 bg-white/5 border-y border-white/5 relative overflow-hidden">
      {/* Infinite scrolling parallax background text */}
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: [0, 0, 1, 1] }}
        className="absolute top-1/4 left-0 w-[200%] flex whitespace-nowrap opacity-5 pointer-events-none"
      >
        <span className={`text-9xl ${bodoni.className} italic`}>THE HALL OF FAME — THE HALL OF FAME — THE HALL OF FAME — </span>
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className={`text-4xl md:text-5xl text-center text-white mb-20 ${bodoni.className}`}>Whispers in the Gallery</h2>
        <div className="grid md:grid-cols-3 gap-12">
          {reviews.map((rev, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              className="text-center"
            >
              <div className="text-[#D4AF37] mb-6 flex justify-center gap-1">
                {[...Array(5)].map((_, j) => <Star key={j} size={16} fill="currentColor" />)}
              </div>
              <p className={`text-white/80 text-lg italic mb-8 leading-relaxed ${bodoni.className}`}>"{rev.text}"</p>
              <div className={`text-[#C0C0C0] uppercase tracking-widest text-sm ${tenor.className}`}>{rev.name}</div>
              <div className={`text-white/40 text-xs mt-1 ${tenor.className}`}>{rev.role}, {rev.company}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = [
    { q: "How do I upload physical trophies?", a: "We offer an AR scanning app that converts physical objects into high-fidelity 3D models for your gallery." },
    { q: "Can I customize the marble textures?", a: "Yes, Curator and Institution tiers allow selection from 12 rare stone textures and custom lighting rigs." },
    { q: "Is the gallery publicly accessible?", a: "You can choose to keep your vault private, share a unique link, or open it to the public directory." },
    { q: "Do the 3D models slow down the site?", a: "Our proprietary WebGL engine ensures smooth 60fps rendering even with hundreds of complex models on screen." },
    { q: "Can I embed the gallery on my own site?", a: "Absolutely. We provide a lightweight iframe embed that maintains full 3D functionality." },
    { q: "What happens if I downgrade my plan?", a: "Your extra pedestals are securely archived. You will only see the exhibits allowed by your current tier." }
  ];

  return (
    <section className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className={`text-4xl md:text-5xl text-center text-white mb-20 ${bodoni.className}`}>Inquiries</h2>
        <div className="space-y-8">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-white/10 pb-8">
              <h3 className={`text-xl text-[#C0C0C0] mb-4 ${bodoni.className}`}>{faq.q}</h3>
              <p className={`text-white/50 leading-relaxed ${tenor.className}`}>{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Newsletter() {
  return (
    <section className="py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[#D4AF37]/5" />
      <div className="max-w-3xl mx-auto relative z-10 text-center">
        <Crown size={48} className="text-[#D4AF37] mx-auto mb-8" />
        <h2 className={`text-4xl md:text-5xl text-white mb-6 ${bodoni.className}`}>Join the Elite</h2>
        <p className={`text-white/60 mb-12 text-lg ${tenor.className}`}>Subscribe to the Curator's Digest for insights on displaying digital prestige and new architectural templates.</p>
        <form className="flex flex-col sm:flex-row gap-4 justify-center">
          <input
            type="email"
            placeholder="Enter your email address"
            className={`bg-black/50 border border-white/20 text-white px-6 py-4 w-full sm:w-96 focus:outline-none focus:border-[#D4AF37] ${tenor.className}`}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            className={`bg-white text-black px-8 py-4 uppercase tracking-widest text-sm font-bold hover:bg-[#D4AF37] transition-colors ${tenor.className}`}
          >
            Subscribe
          </motion.button>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#050505] pt-24 pb-12 px-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-12 mb-20">
        <div className="col-span-2">
          <div className={`text-2xl ${bodoni.className} flex items-center gap-2 text-white mb-6`}>
            <Crown className="text-[#D4AF37]" /> Legacy
          </div>
          <p className={`text-white/40 ${tenor.className} max-w-sm mb-8`}>
            The digital museum for modern achievement. Preserving history in spatial 3D.
          </p>
          <div className="flex gap-4 text-white/40">
            <div className="w-6 h-6 rounded-full bg-white/10 hover:bg-[#D4AF37] cursor-pointer transition-colors"></div>
            <div className="w-6 h-6 rounded-full bg-white/10 hover:bg-[#D4AF37] cursor-pointer transition-colors"></div>
            <div className="w-6 h-6 rounded-full bg-white/10 hover:bg-[#D4AF37] cursor-pointer transition-colors"></div>
            <div className="w-6 h-6 rounded-full bg-white/10 hover:bg-[#D4AF37] cursor-pointer transition-colors"></div>
          </div>
        </div>

        <div>
          <h4 className={`text-white mb-6 uppercase tracking-widest text-sm ${tenor.className}`}>Architecture</h4>
          <ul className={`space-y-4 text-white/50 ${tenor.className} text-sm`}>
            <li><a href="#" className="hover:text-white transition-colors">Pedestals</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Lighting Rigs</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Hallways</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Vault Security</a></li>
          </ul>
        </div>

        <div>
          <h4 className={`text-white mb-6 uppercase tracking-widest text-sm ${tenor.className}`}>Curator</h4>
          <ul className={`space-y-4 text-white/50 ${tenor.className} text-sm`}>
            <li><a href="#" className="hover:text-white transition-colors">Dashboard</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Analytics</a></li>
            <li><a href="#" className="hover:text-white transition-colors">AR Scanner</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Exhibits</a></li>
          </ul>
        </div>

        <div>
          <h4 className={`text-white mb-6 uppercase tracking-widest text-sm ${tenor.className}`}>Company</h4>
          <ul className={`space-y-4 text-white/50 ${tenor.className} text-sm`}>
            <li><a href="#" className="hover:text-white transition-colors">About</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
          </ul>
        </div>
      </div>
      <div className={`text-center text-white/30 text-sm ${tenor.className} pt-8 border-t border-white/5`}>
        © {new Date().getFullYear()} Legacy Museum. All rights reserved.
      </div>
    </footer>
  );
}

export default function TrophyRoomPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden selection:bg-[#D4AF37]/30">
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
