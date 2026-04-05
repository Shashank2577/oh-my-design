"use client"

import React, { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Check, ChevronDown, Menu, Star, Smartphone, Cloud, Layers, Zap, Code, Shield } from 'lucide-react'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

const tokens = {
  background: '#f0f0f3',
  backgroundAlt: '#ffffff',
  foreground: '#000000',
  mutedForeground: '#60646c',
  accent: '#0d74ce',
  accentForeground: '#ffffff',
  border: '#e0e1e6',
}

const PRODUCT_NAME = 'Expo'

const STATS = [
  { label: 'Weekly Downloads', value: '1M+' },
  { label: 'Apps in Stores', value: '50k+' },
  { label: 'Developer Community', value: '500k' },
]

const FEATURES = [
  { icon: Smartphone, title: 'Universal Native Apps', description: 'Write one React codebase that compiles to truly native iOS, Android, and web apps.' },
  { icon: Cloud, title: 'EAS Build', description: 'Compile your apps in the cloud. No need to maintain Xcode or Android Studio environments.' },
  { icon: Layers, title: 'File-based Routing', description: 'Expo Router brings the best of web routing to native apps with deep linking built-in.' },
  { icon: Zap, title: 'Over-the-Air Updates', description: 'Ship bug fixes and features instantly without waiting for app store review processes.' },
  { icon: Code, title: 'Continuous Integration', description: 'Automate your entire workflow from PR to app store submission with EAS.' },
  { icon: Shield, title: 'Enterprise Ready', description: 'SSO, custom domains, and dedicated support for large-scale development teams.' },
]

const PRICING_TIERS = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'For individuals and small open-source projects.',
    features: ['30 concurrent builds/mo', 'Community support', 'Basic OTA updates', 'Public GitHub integration'],
    cta: 'Start Building',
    highlighted: false,
  },
  {
    name: 'On-Demand',
    price: '$29',
    period: 'per month',
    description: 'For growing teams and production apps.',
    features: ['Pay-as-you-go builds', 'Priority queue', 'Standard support', 'Private GitHub integration'],
    cta: 'Get Started',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'yearly',
    description: 'For organizations needing SLA and advanced security.',
    features: ['Unlimited dedicated workers', '24/7 Priority support', 'SSO & SAML', 'Custom data retention'],
    cta: 'Contact Sales',
    highlighted: false,
  },
]

const TESTIMONIALS = [
  { name: 'Evan Bacon', role: 'Engineering Manager', company: 'TechCorp', text: 'Expo transformed our mobile development. We shipped to iOS and Android in half the time it took us previously.', rating: 5 },
  { name: 'Satyajit Sahoo', role: 'Lead Developer', company: 'Startup Inc', text: 'EAS Build is a game-changer. We no longer have an "iOS build machine" sitting in the corner of the office.', rating: 5 },
  { name: 'Kadi Kraman', role: 'Mobile Lead', company: 'Enterprise Solutions', text: 'Expo Router finally brings a sane, scalable navigation structure to React Native.', rating: 5 },
]

const FAQ_ITEMS = [
  { q: 'Can I use custom native code?', a: 'Yes. With Expo Prebuild and EAS Build, you can add any custom Swift, Kotlin, or C++ code to your project while maintaining the managed workflow experience.' },
  { q: 'Is it just for React Native?', a: 'Expo is an open-source framework for apps that run natively on Android, iOS, and the web, built around React Native.' },
  { q: 'How do OTA updates work with App Store guidelines?', a: 'Apple and Google allow over-the-air updates for bug fixes and minor changes as long as they don\'t fundamentally alter the app\'s purpose.' },
  { q: 'Do I need a Mac to build for iOS?', a: 'No. EAS Build compiles your app in the cloud, allowing you to develop and build iOS apps from Windows or Linux machines.' },
  { q: 'Can I eject from Expo?', a: 'The concept of "ejecting" is obsolete. You now have continuous access to the native iOS and Android directories through the `npx expo run` command.' },
  { q: 'Is Expo free to use?', a: 'The Expo open-source framework is completely free. We charge for our cloud services (EAS) which handle building, submitting, and updating apps.' },
]

function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const shouldReduceMotion = useReducedMotion()
  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
      whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function StaggerContainer({ children, className = '', style = {} }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const shouldReduceMotion = useReducedMotion()
  return (
    <motion.div
      initial={shouldReduceMotion ? "visible" : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={{
        visible: { transition: { staggerChildren: 0.1 } },
        hidden: {}
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  )
}

const staggerItem: import('framer-motion').Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
}

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#f0f0f3]/90 backdrop-blur-md border-b border-white/20">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight" style={{ color: tokens.foreground }}>
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          {PRODUCT_NAME}
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium">
          {['Product', 'Docs', 'Blog', 'Changelog'].map(item => (
            <a key={item} href="#" className="hover:opacity-70 transition-opacity" style={{ color: tokens.mutedForeground }}>
              {item}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <a href="#" className="hidden md:block text-sm font-medium hover:opacity-70" style={{ color: tokens.foreground }}>Log In</a>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-4 py-2 text-sm font-semibold rounded-full shadow-sm"
            style={{ backgroundColor: tokens.foreground, color: tokens.background }}
          >
            Sign Up
          </motion.button>
        </div>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section className="pt-48 pb-32 overflow-hidden" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-6xl mx-auto px-6 text-center">
        <FadeUp>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 border shadow-sm mb-8 text-sm font-medium" style={{ borderColor: tokens.border, color: tokens.foreground }}>
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            Expo SDK 50 is now available
          </div>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h1 className="text-[64px] font-bold tracking-[-0.03em] mb-6 leading-[1.05]" style={{ color: tokens.foreground }}>
            Make any app.<br />Run it everywhere.
          </h1>
        </FadeUp>
        <FadeUp delay={0.2}>
          <p className="text-xl max-w-2xl mx-auto mb-10" style={{ color: tokens.mutedForeground }}>
            Create universal native apps for Android, iOS, and the web with React and JavaScript.
          </p>
        </FadeUp>
        <FadeUp delay={0.3}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 rounded-full font-semibold flex items-center justify-center gap-2 shadow-sm text-base"
              style={{ backgroundColor: tokens.foreground, color: tokens.background }}
            >
              Get Started <ArrowRight className="h-5 w-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 rounded-full font-semibold text-base flex items-center gap-2 bg-white border shadow-sm"
              style={{ color: tokens.foreground, borderColor: tokens.border }}
            >
              <Code className="w-5 h-5" /> Read Docs
            </motion.button>
          </div>
        </FadeUp>
        <FadeUp delay={0.4} className="mt-24">
          <div className="w-full max-w-4xl mx-auto aspect-[16/9] rounded-[32px] overflow-hidden border shadow-xl bg-white" style={{ borderColor: tokens.border }}>
             <div className="w-full h-full flex flex-col">
               <div className="h-14 border-b flex items-center px-6 gap-4 bg-gray-50" style={{ borderColor: tokens.border }}>
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-gray-300" />
                    <div className="w-3 h-3 rounded-full bg-gray-300" />
                    <div className="w-3 h-3 rounded-full bg-gray-300" />
                  </div>
                  <div className="text-sm font-medium text-gray-500">app/(tabs)/index.tsx</div>
               </div>
               <div className="flex-1 p-8 bg-white font-mono text-sm text-left overflow-hidden relative">
                  <pre className="text-gray-800 leading-relaxed">
                    <span className="text-blue-600">import</span> {'{'} StyleSheet, Text, View {'}'} <span className="text-blue-600">from</span> <span className="text-green-600">'react-native'</span>;<br/><br/>
                    <span className="text-blue-600">export default function</span> App() {'{'}<br/>
                    &nbsp;&nbsp;<span className="text-blue-600">return</span> (<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;{'<'}<span className="text-purple-600">View</span> style={'{'}styles.container{'}'}{'>'}<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{'<'}<span className="text-purple-600">Text</span>{'>'}Open up App.tsx to start working on your app!{'</'}<span className="text-purple-600">Text</span>{'>'}<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;{'</'}<span className="text-purple-600">View</span>{'>'}<br/>
                    &nbsp;&nbsp;);<br/>
                    {'}'}
                  </pre>

                  {/* Faux mobile preview overlay to add color as per guidelines */}
                  <div className="absolute right-12 top-1/2 -translate-y-1/2 w-48 h-96 bg-white rounded-3xl border-8 border-gray-900 shadow-2xl flex items-center justify-center overflow-hidden rotate-[-2deg]">
                     <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 opacity-10"></div>
                     <div className="text-center p-4">
                       <div className="w-16 h-16 bg-blue-500 rounded-2xl mx-auto mb-4 shadow-lg flex items-center justify-center text-white font-bold text-2xl">E</div>
                       <p className="text-xs font-medium text-gray-800">Open up App.tsx to start working on your app!</p>
                     </div>
                  </div>
               </div>
             </div>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

function Stats() {
  return (
    <section className="py-24" style={{ backgroundColor: tokens.backgroundAlt }}>
      <div className="max-w-6xl mx-auto px-6">
        <StaggerContainer>
          <div className="flex flex-wrap justify-center gap-16 text-center">
            {STATS.map(stat => (
              <motion.div key={stat.label} variants={staggerItem}>
                <p className="text-5xl font-bold tracking-tight mb-2" style={{ color: tokens.foreground }}>{stat.value}</p>
                <p className="text-sm font-medium" style={{ color: tokens.mutedForeground }}>{stat.label}</p>
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
    <section id="features" className="py-32" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-6xl mx-auto px-6">
        <FadeUp>
          <div className="mb-20 text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight" style={{ color: tokens.foreground }}>Everything you need to build amazing apps.</h2>
          </div>
        </FadeUp>
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURES.map(f => (
              <motion.div
                key={f.title}
                variants={staggerItem}
                className="p-8 bg-white rounded-[32px] border shadow-sm"
                style={{ borderColor: tokens.border }}
              >
                <div className="w-12 h-12 rounded-full mb-6 flex items-center justify-center bg-gray-50 border" style={{ borderColor: tokens.border }}>
                  <f.icon className="h-6 w-6" style={{ color: tokens.foreground }} />
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ color: tokens.foreground }}>{f.title}</h3>
                <p className="leading-relaxed" style={{ color: tokens.mutedForeground }}>{f.description}</p>
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
    <section className="py-32 bg-white border-y" style={{ borderColor: tokens.border }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <FadeUp>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight leading-tight" style={{ color: tokens.foreground }}>Application Services.</h2>
            <p className="text-lg mb-8 leading-relaxed" style={{ color: tokens.mutedForeground }}>
              EAS (Expo Application Services) is a deeply integrated set of cloud services for Expo and React Native apps, from the team behind Expo.
            </p>
            <div className="space-y-6">
              {[
                { title: 'EAS Build', desc: 'Compile apps in the cloud for iOS and Android.' },
                { title: 'EAS Submit', desc: 'Upload your app to the Apple App Store and Google Play Store.' },
                { title: 'EAS Update', desc: 'Ship small bug fixes and updates directly to users.' }
              ].map(item => (
                <div key={item.title} className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0 mt-1">
                    <Check className="h-4 w-4" style={{ color: tokens.foreground }} />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1" style={{ color: tokens.foreground }}>{item.title}</h4>
                    <p className="text-sm" style={{ color: tokens.mutedForeground }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeUp>
          <FadeUp delay={0.2}>
             <div className="aspect-square rounded-[40px] bg-[#f0f0f3] p-8 border flex items-center justify-center relative overflow-hidden" style={{ borderColor: tokens.border }}>
               {/* Abstract representation of a CI pipeline */}
               <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/50 pointer-events-none" />
               <div className="w-full max-w-sm bg-white rounded-3xl shadow-xl border p-6 flex flex-col gap-4 relative z-10" style={{ borderColor: tokens.border }}>
                  <div className="flex justify-between items-center border-b pb-4" style={{ borderColor: tokens.border }}>
                     <div className="font-bold text-sm">Build #42</div>
                     <div className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 font-medium">Success</div>
                  </div>
                  <div className="space-y-3 mt-2">
                     <div className="flex gap-3 items-center">
                       <Check className="w-4 h-4 text-green-500" />
                       <div className="text-sm text-gray-600">Resolving dependencies</div>
                     </div>
                     <div className="flex gap-3 items-center">
                       <Check className="w-4 h-4 text-green-500" />
                       <div className="text-sm text-gray-600">Building iOS app archive</div>
                     </div>
                     <div className="flex gap-3 items-center">
                       <Check className="w-4 h-4 text-green-500" />
                       <div className="text-sm text-gray-600">Uploading to EAS</div>
                     </div>
                  </div>
                  <button className="w-full mt-4 py-2 bg-gray-900 text-white rounded-xl text-sm font-medium">
                    Download .ipa
                  </button>
               </div>
             </div>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}

function Pricing() {
  return (
    <section id="pricing" className="py-32" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-6xl mx-auto px-6">
        <FadeUp>
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold tracking-tight mb-4" style={{ color: tokens.foreground }}>Pricing for every team.</h2>
            <p className="text-lg" style={{ color: tokens.mutedForeground }}>The Expo framework is free. Pay only for cloud services.</p>
          </div>
        </FadeUp>
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PRICING_TIERS.map(tier => (
              <motion.div
                key={tier.name}
                variants={staggerItem}
                className="p-8 rounded-[32px] flex flex-col border shadow-sm"
                style={{
                  backgroundColor: tier.highlighted ? tokens.foreground : tokens.backgroundAlt,
                  color: tier.highlighted ? tokens.background : tokens.foreground,
                  borderColor: tokens.border
                }}
              >
                <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                <div className="mb-4 flex items-baseline gap-1">
                  <span className="text-5xl font-bold tracking-tight">{tier.price}</span>
                  <span className="text-sm font-medium opacity-70">/ {tier.period}</span>
                </div>
                <p className="mb-8 font-medium opacity-80">{tier.description}</p>
                <ul className="space-y-4 mb-10 flex-1">
                  {tier.features.map(f => (
                    <li key={f} className="flex items-center gap-3 font-medium">
                      <Check className="h-5 w-5 shrink-0 opacity-80" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 rounded-full font-bold text-base"
                  style={tier.highlighted
                    ? { backgroundColor: tokens.background, color: tokens.foreground }
                    : { backgroundColor: tokens.foreground, color: tokens.background }
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
    <section id="testimonials" className="py-32 bg-white border-t" style={{ borderColor: tokens.border }}>
      <div className="max-w-6xl mx-auto px-6">
        <FadeUp>
          <div className="mb-20 text-center">
             <h2 className="text-4xl font-bold tracking-tight" style={{ color: tokens.foreground }}>Trusted by developers.</h2>
          </div>
        </FadeUp>
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map(t => (
              <motion.div
                key={t.name}
                variants={staggerItem}
                className="p-8 rounded-[32px] bg-[#f0f0f3] border"
                style={{ borderColor: tokens.border }}
              >
                <div className="flex mb-6 gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-black text-black" />
                  ))}
                </div>
                <p className="text-lg leading-relaxed mb-8 font-medium" style={{ color: tokens.mutedForeground }}>"{t.text}"</p>
                <div>
                  <p className="font-bold text-base" style={{ color: tokens.foreground }}>{t.name}</p>
                  <p className="text-sm font-medium" style={{ color: tokens.mutedForeground }}>{t.role}, {t.company}</p>
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
    <section id="faq" className="py-32 border-t" style={{ borderColor: tokens.border, backgroundColor: tokens.background }}>
      <div className="max-w-3xl mx-auto px-6">
        <FadeUp>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight" style={{ color: tokens.foreground }}>Frequently asked questions.</h2>
          </div>
        </FadeUp>
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, i) => (
            <div key={i} className="bg-white rounded-3xl border shadow-sm" style={{ borderColor: tokens.border }}>
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="font-bold text-lg" style={{ color: tokens.foreground }}>{item.q}</span>
                <motion.span animate={{ rotate: openIndex === i ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown className="h-5 w-5" style={{ color: tokens.mutedForeground }} />
                </motion.span>
              </button>
              <motion.div
                initial={false}
                animate={{ height: openIndex === i ? 'auto' : 0, opacity: openIndex === i ? 1 : 0 }}
                transition={{ duration: 0.2 }}
                style={{ overflow: 'hidden' }}
              >
                <p className="px-6 pb-6 text-base leading-relaxed" style={{ color: tokens.mutedForeground }}>
                  {item.a}
                </p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Newsletter() {
  return (
    <section className="py-32 bg-white border-t" style={{ borderColor: tokens.border }}>
      <div className="max-w-2xl mx-auto px-6 text-center">
        <FadeUp>
          <h2 className="text-4xl font-bold mb-4 tracking-tight" style={{ color: tokens.foreground }}>Subscribe to Expo updates.</h2>
          <p className="text-lg mb-10" style={{ color: tokens.mutedForeground }}>
            Get the latest news, articles, and resources delivered to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Email address"
              className="flex-1 px-6 py-4 rounded-full border bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
              style={{ borderColor: tokens.border, color: tokens.foreground }}
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 rounded-full font-bold shadow-sm"
              style={{ backgroundColor: tokens.foreground, color: tokens.background }}
            >
              Subscribe
            </motion.button>
          </form>
        </FadeUp>
      </div>
    </section>
  )
}

function Footer() {
  const links = {
    Framework: ['React Native', 'Expo Router', 'Expo Go', 'Ecosystem'],
    EAS: ['Build', 'Submit', 'Update', 'Pricing'],
    Resources: ['Docs', 'Blog', 'Changelog', 'Discord'],
    Company: ['About', 'Careers', 'Privacy', 'Terms'],
  }

  return (
    <footer className="py-20 border-t" style={{ borderColor: tokens.border, backgroundColor: tokens.background }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-20">
          <div className="col-span-2 md:col-span-1">
             <div className="flex items-center gap-2 font-bold text-xl tracking-tight mb-4" style={{ color: tokens.foreground }}>
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
              {PRODUCT_NAME}
            </div>
            <p className="text-sm font-medium leading-relaxed" style={{ color: tokens.mutedForeground }}>
              Make any app.<br />Run it everywhere.
            </p>
          </div>
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <p className="font-bold text-sm mb-6" style={{ color: tokens.foreground }}>{group}</p>
              <ul className="space-y-4">
                {items.map(item => (
                  <li key={item}>
                    <a href="#" className="text-sm font-medium hover:text-black transition-colors" style={{ color: tokens.mutedForeground }}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4 text-sm font-medium" style={{ borderColor: tokens.border, color: tokens.mutedForeground }}>
          <p>© 2026 {PRODUCT_NAME} Inc.</p>
          <a href="/" className="hover:text-black transition-colors">← All styles</a>
        </div>
      </div>
    </footer>
  )
}

export default function StylePage() {
  return (
    <div className={`${inter.variable} font-sans`} style={{ backgroundColor: tokens.background }}>
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
