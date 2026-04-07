'use client';

import React from 'react';
import { Outfit } from 'next/font/google';
import {
  ArrowRight,
  CheckCircle2,
  Layers,
  Zap,
  Shield,
  BarChart,
  Smartphone,
  Menu,
  X
} from 'lucide-react';
import Link from 'next/link';

const outfit = Outfit({ subsets: ['latin'] });

export default function FlatDesignLandingPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <div className={`min-h-screen bg-white text-gray-900 ${outfit.className}`}>
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b-4 border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-500 rounded-sm"></div>
              <span className="font-extrabold text-2xl tracking-tight">Block.io</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#" className="font-semibold text-gray-900 hover:text-blue-600 transition-colors">Features</Link>
              <Link href="#" className="font-semibold text-gray-900 hover:text-blue-600 transition-colors">How it Works</Link>
              <Link href="#" className="font-semibold text-gray-900 hover:text-blue-600 transition-colors">Pricing</Link>
              <button className="bg-gray-100 text-gray-900 font-semibold px-6 py-3 rounded-md hover:bg-gray-200 transition-all duration-200 hover:scale-105">
                Log in
              </button>
              <button className="bg-blue-500 text-white font-semibold px-6 py-3 rounded-md hover:bg-blue-600 transition-all duration-200 hover:scale-105">
                Get Started
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-900 p-2"
              >
                {isMobileMenuOpen ? <X size={28} strokeWidth={2.5} /> : <Menu size={28} strokeWidth={2.5} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-gray-50 border-b-4 border-gray-100 p-4 space-y-4">
            <Link href="#" className="block font-semibold text-gray-900 text-lg">Features</Link>
            <Link href="#" className="block font-semibold text-gray-900 text-lg">How it Works</Link>
            <Link href="#" className="block font-semibold text-gray-900 text-lg">Pricing</Link>
            <div className="pt-4 flex flex-col gap-3">
              <button className="w-full bg-gray-200 text-gray-900 font-semibold px-6 py-4 rounded-md">
                Log in
              </button>
              <button className="w-full bg-blue-500 text-white font-semibold px-6 py-4 rounded-md">
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative bg-blue-500 overflow-hidden py-24 sm:py-32 lg:py-40">
        {/* Geometric Decorations */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-white/10 rounded-full" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-black/10 rotate-45" />
        <div className="absolute top-40 left-20 w-24 h-24 bg-emerald-500/50 rounded-sm rotate-12" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-none mb-8">
            Build Faster.<br />Scale Easier.
          </h1>
          <p className="mt-6 text-xl sm:text-2xl text-blue-50 max-w-2xl mx-auto font-medium">
            The no-nonsense platform for teams who want to ship product, not manage infrastructure.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
            <button className="bg-emerald-500 text-white font-bold text-lg px-8 py-4 rounded-md hover:bg-emerald-600 transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2 group">
              Start Building Now
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="bg-transparent border-4 border-white text-white font-bold text-lg px-8 py-4 rounded-md hover:bg-white hover:text-blue-500 transition-all duration-200 flex items-center justify-center">
              Read Documentation
            </button>
          </div>
        </div>
      </section>

      {/* Logos Section */}
      <section className="bg-gray-100 py-12 border-b-4 border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center font-semibold text-gray-500 uppercase tracking-wider mb-8">Trusted by industry leaders</p>
          <div className="flex flex-wrap justify-center gap-12 sm:gap-20 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {['Acme Corp', 'GlobalTech', 'Innovate', 'Stark Ind', 'Wayne Ent'].map((company, i) => (
              <div key={i} className="text-2xl font-extrabold text-gray-900 tracking-tighter">
                {company}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white relative">
        <div className="absolute right-0 top-1/4 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">Everything you need. Nothing you don't.</h2>
            <p className="mt-6 text-xl text-gray-600">Pure functionality without the bloat. We cut the noise so you can focus on the signal.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-50 p-8 rounded-lg group cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:bg-blue-50">
              <div className="h-16 w-16 bg-blue-500 rounded-full flex items-center justify-center mb-6 transition-transform duration-200 group-hover:scale-110">
                <Zap className="text-white" size={32} strokeWidth={2.5} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Lightning Fast</h3>
              <p className="text-gray-600 font-medium leading-relaxed">Deployed on the edge. Your apps load instantly for users globally, out of the box.</p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-50 p-8 rounded-lg group cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:bg-emerald-50">
              <div className="h-16 w-16 bg-emerald-500 rounded-full flex items-center justify-center mb-6 transition-transform duration-200 group-hover:scale-110">
                <Shield className="text-white" size={32} strokeWidth={2.5} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Secure Core</h3>
              <p className="text-gray-600 font-medium leading-relaxed">Enterprise-grade security baked into the foundation. Stop worrying about breaches.</p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-50 p-8 rounded-lg group cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:bg-amber-50">
              <div className="h-16 w-16 bg-amber-500 rounded-full flex items-center justify-center mb-6 transition-transform duration-200 group-hover:scale-110">
                <Layers className="text-white" size={32} strokeWidth={2.5} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Scalable Stack</h3>
              <p className="text-gray-600 font-medium leading-relaxed">From MVP to IPO. Our infrastructure scales automatically with your traffic.</p>
            </div>

             {/* Feature 4 */}
             <div className="bg-gray-50 p-8 rounded-lg group cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:bg-purple-50">
              <div className="h-16 w-16 bg-purple-500 rounded-full flex items-center justify-center mb-6 transition-transform duration-200 group-hover:scale-110">
                <BarChart className="text-white" size={32} strokeWidth={2.5} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Real-time Analytics</h3>
              <p className="text-gray-600 font-medium leading-relaxed">Live dashboards tracking every metric that matters to your business growth.</p>
            </div>

            {/* Feature 5 */}
            <div className="bg-gray-50 p-8 rounded-lg group cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:bg-pink-50">
              <div className="h-16 w-16 bg-pink-500 rounded-full flex items-center justify-center mb-6 transition-transform duration-200 group-hover:scale-110">
                <Smartphone className="text-white" size={32} strokeWidth={2.5} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Mobile Optimized</h3>
              <p className="text-gray-600 font-medium leading-relaxed">Perfectly responsive layouts. Guaranteed to look crisp on every device size.</p>
            </div>

            {/* CTA Feature */}
            <div className="bg-gray-900 p-8 rounded-lg group cursor-pointer transition-all duration-200 hover:scale-[1.02] flex flex-col justify-center items-center text-center">
              <h3 className="text-2xl font-bold text-white mb-4">See all features</h3>
              <button className="bg-white text-gray-900 font-bold px-6 py-3 rounded-md hover:bg-gray-100 transition-colors">
                Explore Platform
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section with Multi-Color accents */}
      <section className="bg-gray-900 py-24 text-white relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -ml-96 -mt-40 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 text-center">
            <div>
              <div className="text-6xl font-extrabold text-blue-500 mb-2">99.9%</div>
              <div className="text-lg font-semibold text-gray-400 uppercase tracking-wide">Uptime</div>
            </div>
            <div>
              <div className="text-6xl font-extrabold text-emerald-500 mb-2">50M+</div>
              <div className="text-lg font-semibold text-gray-400 uppercase tracking-wide">Requests/Day</div>
            </div>
            <div>
              <div className="text-6xl font-extrabold text-amber-500 mb-2">&lt;10ms</div>
              <div className="text-lg font-semibold text-gray-400 uppercase tracking-wide">Latency</div>
            </div>
            <div>
              <div className="text-6xl font-extrabold text-pink-500 mb-2">24/7</div>
              <div className="text-lg font-semibold text-gray-400 uppercase tracking-wide">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works / Split Layout */}
      <section className="py-24 bg-gray-50 border-t-4 border-b-4 border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-8">
                Connect your repo. <br />We do the rest.
              </h2>

              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-500 text-white font-bold text-xl rounded-full flex items-center justify-center">1</div>
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900 mb-2">Import Project</h4>
                    <p className="text-gray-600 font-medium">Link your GitHub, GitLab, or Bitbucket repository with a single click.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-emerald-500 text-white font-bold text-xl rounded-full flex items-center justify-center">2</div>
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900 mb-2">Configure Settings</h4>
                    <p className="text-gray-600 font-medium">Set your environment variables and build commands. We auto-detect most frameworks.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-amber-500 text-white font-bold text-xl rounded-full flex items-center justify-center">3</div>
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900 mb-2">Deploy Global</h4>
                    <p className="text-gray-600 font-medium">Push to main. We automatically build and deploy your site to our global edge network.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Abstract Graphic Representation instead of a literal image */}
            <div className="relative h-96 lg:h-[600px] bg-white rounded-xl p-8 flex flex-col gap-4 shadow-none ring-4 ring-gray-200 overflow-hidden">
               {/* Decorative floating blocks */}
               <div className="absolute top-10 right-10 w-32 h-32 bg-blue-500/20 rounded-md rotate-12" />
               <div className="absolute bottom-20 left-10 w-24 h-24 bg-amber-500/20 rounded-full" />

               <div className="w-full h-12 bg-gray-100 rounded-md mb-4 flex items-center px-4 gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
               </div>

               <div className="flex-1 bg-gray-100 rounded-md p-6 font-mono text-sm sm:text-base text-gray-800 overflow-hidden relative">
                 <div className="text-emerald-600 font-bold mb-2">$ block init</div>
                 <div className="text-gray-500 mb-4">Initializing project...</div>
                 <div className="text-blue-600 font-bold mb-2">$ block deploy --prod</div>
                 <div className="text-gray-500">Building assets...</div>
                 <div className="text-gray-500">Uploading to edge...</div>
                 <div className="mt-4 text-amber-500 font-bold">Deploy complete! (1.2s)</div>
                 <div className="mt-2 text-gray-900 font-bold">https://your-app.block.io</div>

                 {/* Blinking cursor */}
                 <div className="w-3 h-5 bg-gray-800 mt-4 animate-pulse" />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">Simple, transparent pricing.</h2>
            <p className="mt-6 text-xl text-gray-600">No hidden fees. No surprises. Scale as you grow.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 items-center max-w-6xl mx-auto">
            {/* Starter */}
            <div className="bg-gray-50 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Hobby</h3>
              <p className="text-gray-600 font-medium mb-6">Perfect for side projects.</p>
              <div className="mb-8">
                <span className="text-5xl font-extrabold text-gray-900">$0</span>
                <span className="text-gray-500 font-semibold">/mo</span>
              </div>
              <ul className="space-y-4 mb-8">
                {['1 Project', '10GB Bandwidth', 'Community Support', 'Basic Analytics'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="text-gray-400" size={24} />
                    <span className="font-medium text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full bg-gray-200 text-gray-900 font-bold px-6 py-4 rounded-md hover:bg-gray-300 transition-colors">
                Start Free
              </button>
            </div>

            {/* Pro - Emphasized through scale and color */}
            <div className="bg-blue-500 rounded-lg p-8 lg:scale-110 lg:-translate-y-4 shadow-none ring-4 ring-blue-500 ring-offset-4 ring-offset-white relative">
              <div className="absolute top-0 right-0 bg-amber-500 text-white font-bold px-4 py-1 rounded-bl-lg rounded-tr-sm text-sm uppercase tracking-wide">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
              <p className="text-blue-100 font-medium mb-6">For professional developers.</p>
              <div className="mb-8">
                <span className="text-5xl font-extrabold text-white">$29</span>
                <span className="text-blue-200 font-semibold">/mo</span>
              </div>
              <ul className="space-y-4 mb-8">
                {['Unlimited Projects', '1TB Bandwidth', 'Priority Support', 'Advanced Analytics', 'Custom Domains'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="text-white" size={24} />
                    <span className="font-medium text-blue-50">{item}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full bg-white text-blue-600 font-bold px-6 py-4 rounded-md hover:bg-gray-100 transition-all duration-200 hover:scale-105">
                Get Started
              </button>
            </div>

            {/* Enterprise */}
            <div className="bg-gray-50 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Enterprise</h3>
              <p className="text-gray-600 font-medium mb-6">For large scale teams.</p>
              <div className="mb-8">
                <span className="text-5xl font-extrabold text-gray-900">$99</span>
                <span className="text-gray-500 font-semibold">/mo</span>
              </div>
              <ul className="space-y-4 mb-8">
                {['Custom SLA', 'Unlimited Bandwidth', '24/7 Phone Support', 'SSO & SAML', 'Dedicated Rep'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="text-emerald-500" size={24} />
                    <span className="font-medium text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full bg-transparent border-4 border-gray-900 text-gray-900 font-bold px-6 py-4 rounded-md hover:bg-gray-900 hover:text-white transition-colors">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-amber-500 py-24 relative overflow-hidden">
        {/* Geometric Decor */}
        <div className="absolute left-0 top-0 w-1/2 h-full bg-amber-400 skew-x-12 -translate-x-1/2" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-5xl sm:text-6xl font-extrabold text-gray-900 tracking-tight mb-8">Ready to ship?</h2>
          <p className="text-2xl text-gray-900 font-medium mb-12">Join 10,000+ developers building the future.</p>
          <button className="bg-gray-900 text-white font-bold text-xl px-12 py-5 rounded-md hover:bg-black transition-all duration-200 hover:scale-105 shadow-none">
            Create Free Account
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
            <div className="col-span-2 lg:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-blue-500 rounded-sm"></div>
                <span className="font-extrabold text-2xl text-white tracking-tight">Block.io</span>
              </div>
              <p className="text-gray-400 font-medium max-w-sm">
                The fastest way to build and deploy modern web applications. No fluff, just speed.
              </p>
            </div>

            <div>
              <h4 className="text-white font-bold uppercase tracking-wider mb-6">Product</h4>
              <ul className="space-y-4">
                {['Features', 'Integrations', 'Pricing', 'Changelog'].map((item) => (
                  <li key={item}><Link href="#" className="text-gray-400 hover:text-white font-medium transition-colors">{item}</Link></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold uppercase tracking-wider mb-6">Resources</h4>
              <ul className="space-y-4">
                {['Documentation', 'API Reference', 'Blog', 'Community'].map((item) => (
                  <li key={item}><Link href="#" className="text-gray-400 hover:text-white font-medium transition-colors">{item}</Link></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold uppercase tracking-wider mb-6">Company</h4>
              <ul className="space-y-4">
                {['About Us', 'Careers', 'Legal', 'Contact'].map((item) => (
                  <li key={item}><Link href="#" className="text-gray-400 hover:text-white font-medium transition-colors">{item}</Link></li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t-4 border-gray-800 pt-10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 font-medium">© 2023 Block.io. All rights reserved.</p>
            <div className="flex gap-6">
              {/* Dummy social icons */}
              <div className="w-6 h-6 bg-gray-500 hover:bg-white rounded-full transition-colors cursor-pointer" />
              <div className="w-6 h-6 bg-gray-500 hover:bg-white rounded-full transition-colors cursor-pointer" />
              <div className="w-6 h-6 bg-gray-500 hover:bg-white rounded-full transition-colors cursor-pointer" />
            </div>
          </div>
        </div>
      </footer>
      
      </div>
  );
}
