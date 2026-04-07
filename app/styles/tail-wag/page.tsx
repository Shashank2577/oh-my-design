'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Heart, 
  PawPrint, 
  Bone, 
  Home, 
  Search, 
  ChevronDown, 
  MessageCircle,
  ShieldCheck,
  Star,
  ArrowRight,
  UserPlus,
  Play
} from 'lucide-react'
import { Quicksand, Fredoka } from 'next/font/google'

const quicksand = Quicksand({ subsets: ['latin'] })
const fredoka = Fredoka({ subsets: ['latin'], weight: '600' })

// --- Design Tokens ---
const tokens = {
  colors: {
    background: "#FFFBEB", // Warm Cream
    surface: "#FFFFFF",
    accent1: "#F59E0B", // Golden Retriever
    accent2: "#10B981", // Park Green
    border: "#FEF3C7",
    textHigh: "#451A03", // Deep Bark Brown
    textLow: "#92400E"
  },
  physics: {
    bouncy: { type: "spring", stiffness: 300, damping: 15 },
    tailWag: {
      rotate: [-10, 10, -10],
      transition: { repeat: Infinity, duration: 0.6 }
    }
  }
}

// --- Components ---

const TailWagButton = ({ children, variant = 'primary', className = '' }: any) => (
  <motion.button
    whileHover={{ scale: 1.05, y: -2 }}
    whileTap={{ scale: 0.95 }}
    className={`px-8 py-4 rounded-full ${fredoka.className} text-lg transition-all relative overflow-hidden group shadow-lg ${
      variant === 'primary' 
        ? `bg-[#F59E0B] text-white` 
        : `bg-white text-[#F59E0B] border-2 border-[#FEF3C7]`
    } ${className}`}
  >
    <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
  </motion.button>
)

const ScrapbookCard = ({ children, className = '' }: any) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    whileHover={{ rotate: [-1, 1, -1] }}
    className={`bg-white border-4 border-[#FEF3C7] rounded-[40px] p-8 shadow-xl relative group ${className}`}
  >
    {children}
  </motion.div>
)

// --- Sections ---

const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 border-b-2 border-[#FEF3C7] bg-[#FFFBEB]/90 backdrop-blur-md px-6 py-4">
    <div className="max-w-7xl mx-auto flex items-center justify-between">
      <div className={`flex items-center gap-2 ${fredoka.className} text-3xl text-[#451A03]`}>
        <motion.div animate={tokens.physics.tailWag as any}>
          <PawPrint className="text-[#F59E0B] fill-[#F59E0B]" size={32} />
        </motion.div>
        TAIL<span className="text-[#F59E0B]">WAG</span>
      </div>
      <div className="hidden md:flex items-center gap-10 text-[#92400E] font-bold text-sm">
        {['Adopt', 'How it Works', 'Success Stories', 'Community'].map(item => (
          <a key={item} href="#" className="hover:text-[#F59E0B] transition-colors">{item}</a>
        ))}
      </div>
      <TailWagButton className="hidden md:block py-2 px-6 text-sm">FIND A FRIEND</TailWagButton>
    </div>
  </nav>
)

const Hero = () => {
  const [hearts, setHearts] = useState<number[]>([])
  
  const addHeart = () => {
    setHearts([...hearts, Date.now()])
    setTimeout(() => setHearts(prev => prev.slice(1)), 2000)
  }

  return (
    <section className="pt-32 pb-20 px-6 relative overflow-hidden min-h-screen flex items-center">
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <PawPrint 
            key={i} 
            className="absolute text-[#F59E0B]" 
            style={{ 
              top: `${Math.random() * 100}%`, 
              left: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 360}deg)`,
              opacity: Math.random() * 0.5
            }} 
            size={Math.random() * 40 + 20} 
          />
        ))}
      </div>
      
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={tokens.physics.bouncy as any}
        >
          <div className="flex items-center gap-2 mb-6 px-4 py-2 bg-[#F59E0B]/10 rounded-full w-fit">
            <Star className="text-[#F59E0B] fill-[#F59E0B]" size={16} />
            <span className={`text-xs text-[#92400E] font-bold tracking-wider uppercase ${fredoka.className}`}>1,200+ Pups Home This Month</span>
          </div>
          <h1 className={`${fredoka.className} text-7xl md:text-8xl text-[#451A03] leading-[1] mb-8`}>
            Happiness is a <span className="text-[#F59E0B]">Waggy Tail.</span>
          </h1>
          <p className={`text-[#92400E] text-xl max-w-xl mb-10 leading-relaxed ${quicksand.className}`}>
            Every pet deserves a loving home. TailWag connects you with the perfect companion using our heart-first matching engine.
          </p>
          <div className="flex flex-wrap gap-4">
            <TailWagButton onClick={addHeart}>MEET THE PETS</TailWagButton>
            <TailWagButton variant="secondary">LEARN THE PROCESS</TailWagButton>
          </div>
          
          <div className="relative h-20 mt-12 overflow-visible">
            <AnimatePresence>
              {hearts.map(id => (
                <motion.div
                  key={id}
                  initial={{ opacity: 0, y: 0, x: 0 }}
                  animate={{ opacity: 1, y: -100, x: (Math.random() - 0.5) * 100 }}
                  exit={{ opacity: 0 }}
                  className="absolute"
                >
                  <Heart className="text-red-500 fill-red-500" size={24} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ ...(tokens.physics.bouncy as any), delay: 0.2 }}
          className="relative"
        >
          <div className="bg-white p-4 rounded-[50px] shadow-2xl rotate-2 relative">
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#F59E0B] rounded-full flex items-center justify-center text-white font-bold shadow-lg -rotate-12">
              <span className={fredoka.className}>ADOPT ME!</span>
            </div>
            <div className="aspect-[4/5] rounded-[40px] bg-gradient-to-br from-[#FEF3C7] to-[#F59E0B]/20 overflow-hidden relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <PawPrint className="text-[#F59E0B]/20" size={200} />
              </div>
              <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md p-6 rounded-[30px] border-2 border-[#FEF3C7]">
                <div className="flex justify-between items-center mb-2">
                  <div className={`${fredoka.className} text-3xl text-[#451A03]`}>Cooper</div>
                  <div className="px-3 py-1 bg-[#10B981] text-white text-xs rounded-full font-bold uppercase">Golden Retriever</div>
                </div>
                <div className="flex items-center gap-4 text-[#92400E] font-medium text-sm">
                  <div className="flex items-center gap-1"><Home size={14} /> 2.4 miles</div>
                  <div className="flex items-center gap-1"><Star size={14} /> 2 yrs old</div>
                </div>
              </div>
            </div>
          </div>
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="absolute -bottom-10 -left-10 bg-[#10B981] text-white p-6 rounded-[30px] shadow-xl -rotate-6"
          >
            <div className={`${fredoka.className} text-2xl flex items-center gap-2`}>
              <Heart className="fill-white" size={24} /> 98{"%"} Match
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

const StatsBar = () => (
  <section className="py-16 bg-[#F59E0B]/5 border-y-4 border-[#FEF3C7]">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {[
          { label: 'Happy Paws', value: '45,000+', icon: PawPrint },
          { label: 'Communities', value: '850+', icon: Home },
          { label: 'Donations', value: '$1.2M', icon: Bone },
          { label: 'Match Rate', value: '94%', icon: Heart }
        ].map((stat, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.1 }}
            className="flex flex-col items-center text-center"
          >
            <div className="w-12 h-12 bg-[#F59E0B]/20 rounded-full flex items-center justify-center mb-4">
              <stat.icon className="text-[#F59E0B]" size={24} />
            </div>
            <div className={`${fredoka.className} text-4xl text-[#451A03]`}>{stat.value}</div>
            <div className={`text-[#92400E] text-xs font-bold uppercase tracking-widest ${quicksand.className}`}>{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)

const Features = () => (
  <section className="py-24 px-6">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <h2 className={`${fredoka.className} text-5xl md:text-6xl text-[#451A03] mb-6`}>TAIL-WAGGING TECH</h2>
        <p className={`text-[#92400E] max-w-2xl mx-auto text-lg leading-relaxed ${quicksand.className}`}>We use heart and science to find the perfect match for you and your future best friend.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {[
          { title: 'Compatibility Matcher', desc: 'Our quiz analyzes your lifestyle, home, and energy levels to suggest the best breeds.', icon: Heart },
          { title: 'Safe-Zone Trackers', desc: 'Keep your pets safe with our integrated real-time GPS boundary alerts.', icon: ShieldCheck },
          { title: 'Success Story Map', desc: 'See real-time updates of local adoptions and join neighborhood playdates.', icon: Home },
          { title: 'Vet-Sync Health', desc: 'One-click access to local veterinarians and digital health records.', icon: Star },
          { title: 'The Sniff Search', desc: 'Conceptual search technology that understands \"high energy\" or \"quiet lap cat\".', icon: Search },
          { title: 'Community Paws', desc: 'A social network for pet owners to share advice, toys, and treats.', icon: MessageCircle }
        ].map((feature, i) => (
          <ScrapbookCard key={i} className={i % 2 === 0 ? 'rotate-1' : '-rotate-1'}>
            <div className="w-16 h-16 bg-[#F59E0B]/10 rounded-[20px] flex items-center justify-center mb-6">
              <feature.icon className="text-[#F59E0B]" size={32} />
            </div>
            <h3 className={`${fredoka.className} text-2xl text-[#451A03] mb-3`}>{feature.title}</h3>
            <p className={`text-[#92400E] text-sm leading-relaxed ${quicksand.className}`}>{feature.desc}</p>
          </ScrapbookCard>
        ))}
      </div>
    </div>
  </section>
)

const ProductDetail = () => (
  <section className="py-24 px-6 bg-[#FFFFFF]">
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-20 items-center">
        <div className="relative p-8 border-4 border-dashed border-[#FEF3C7] rounded-[60px]">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-[#FFFBEB] aspect-square rounded-[50px] overflow-hidden shadow-2xl relative"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <Play className="text-[#F59E0B]/20" size={150} />
            </div>
            <div className="absolute top-8 left-8 bg-white p-4 rounded-3xl shadow-lg -rotate-6">
              <div className={`${fredoka.className} text-xl text-[#451A03]`}>The First Meeting</div>
            </div>
          </motion.div>
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#10B981] rounded-full flex items-center justify-center p-4 shadow-xl rotate-12">
            <span className={`${fredoka.className} text-white text-center text-sm leading-tight`}>JOURNEY STARTS HERE</span>
          </div>
        </div>
        <div>
          <h2 className={`${fredoka.className} text-5xl md:text-6xl text-[#451A03] mb-8 leading-tight`}>A JOURNEY OF <br/><span className="text-[#F59E0B]">LOVE & DISCOVERY.</span></h2>
          <div className={`space-y-6 text-[#92400E] text-lg leading-relaxed ${quicksand.className}`}>
            <p>At TailWag, we believe that every pet has a story that deserves a happy ending. We don't just list animals; we curate introductions. Our process is designed to be slow, intentional, and joyous.</p>
            <p>From the first "Sniff Search" to the final "Tail-Wag" meeting, we are with you every step of the way, ensuring that the chemistry between you and your pet is perfect.</p>
          </div>
          <div className="mt-12 flex items-center gap-6">
            <div className="flex -space-x-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-[#F59E0B]/20 flex items-center justify-center">
                  <UserPlus size={20} className="text-[#F59E0B]" />
                </div>
              ))}
            </div>
            <div className={`text-sm font-bold text-[#451A03] ${quicksand.className}`}>JOIN 12K+ NEW OWNERS THIS WEEK</div>
          </div>
        </div>
      </div>
    </div>
  </section>
)

const Pricing = () => (
  <section className="py-24 px-6 bg-[#FFFBEB]">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className={`${fredoka.className} text-5xl text-[#451A03] mb-4`}>MEMBERSHIP TIERS</h2>
        <p className={`text-[#92400E] ${quicksand.className}`}>Support our mission and get premium perks for your pet.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {[
          { name: 'Puppy Love', price: '$0', features: ['Unlimited Browsing', 'Basic Matcher', 'Community Access', 'Health Tracker'] },
          { name: 'Best Friend', price: '$15', features: ['Priority Meetings', 'GPS Integrated Map', 'Vet Chat Support', 'Premium Badges', 'Toy Discounts'], highlight: true },
          { name: 'Alpha Pack', price: '$35', features: ['Home Delivery Treats', '24/7 Vet Concierge', 'Insurance Benefits', 'Custom Training', 'VIP Events'] }
        ].map((tier, i) => (
          <ScrapbookCard key={i} className={tier.highlight ? 'border-[#F59E0B] -translate-y-4' : ''}>
            {tier.highlight && (
              <div className="absolute top-0 right-10 bg-[#F59E0B] text-white px-6 py-2 rounded-b-3xl font-bold text-sm shadow-md">
                BEST VALUE
              </div>
            )}
            <div className={`${fredoka.className} text-2xl text-[#451A03] mb-2`}>{tier.name}</div>
            <div className="flex items-baseline gap-2 mb-8">
              <span className={`${fredoka.className} text-6xl text-[#F59E0B]`}>{tier.price}</span>
              <span className={`text-[#92400E] text-sm font-bold ${quicksand.className}`}>/ MO</span>
            </div>
            <ul className="space-y-4 mb-10">
              {tier.features.map(f => (
                <li key={f} className="flex items-center gap-3 text-sm text-[#92400E] font-medium">
                  <Bone size={14} className="text-[#F59E0B] fill-[#F59E0B]" />
                  {f}
                </li>
              ))}
            </ul>
            <TailWagButton className="w-full" variant={tier.highlight ? 'primary' : 'secondary'}>GET STARTED</TailWagButton>
          </ScrapbookCard>
        ))}
      </div>
    </div>
  </section>
)

const Testimonials = () => (
  <section className="py-24 px-6">
    <div className="max-w-7xl mx-auto">
      <h2 className={`${fredoka.className} text-5xl text-[#451A03] mb-16 text-center`}>HEART-WARMING TALES</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {[
          { name: 'Sarah & Luna', role: 'Adopted 6 months ago', quote: 'The matching engine suggested Luna even though I was looking for a smaller dog. She is the perfect energy match for my runs!' },
          { name: 'David & Buster', role: 'Adopted 1 year ago', quote: 'TailWag made the daunting process of adoption feel like a walk in the park. The health tracker is a lifesaver.' },
          { name: 'The Miller Family', role: 'Adopted 2 years ago', quote: 'We found our family\'s soulmate here. The community events helped Buster socialize and make doggy friends!' }
        ].map((t, i) => (
          <ScrapbookCard key={i}>
            <div className="flex gap-1 mb-6">
              {[...Array(5)].map((_, j) => (
                <Star key={j} size={18} className="text-[#F59E0B] fill-[#F59E0B]" />
              ))}
            </div>
            <p className={`text-[#451A03] text-lg italic mb-8 leading-relaxed ${quicksand.className}`}>"{t.quote}"</p>
            <div>
              <div className={`${fredoka.className} text-xl text-[#451A03]`}>{t.name}</div>
              <div className={`text-[#F59E0B] text-xs font-bold uppercase tracking-widest ${quicksand.className}`}>{t.role}</div>
            </div>
          </ScrapbookCard>
        ))}
      </div>
    </div>
  </section>
)

const FAQ = () => {
  const [open, setOpen] = useState(0)
  return (
    <section className="py-24 px-6 bg-[#FFFFFF]">
      <div className="max-w-3xl mx-auto">
        <h2 className={`${fredoka.className} text-5xl text-[#451A03] mb-12 text-center`}>PAW-SOME HELP</h2>
        <div className="space-y-4">
          {[
            { q: 'How does the matching work?', a: 'Our algorithm considers 24 different data points including your home size, activity level, presence of other pets, and even your noise tolerance.' },
            { q: 'Is there an adoption fee?', a: 'Yes, adoption fees go directly to our partner shelters to cover vaccinations, microchipping, and basic care for the pets.' },
            { q: 'Can I foster before adopting?', a: 'Absolutely! Many of our pets are available for a \"Foster-to-Friend\" trial period of 2 weeks.' },
            { q: 'What happens if it\'s not a match?', a: 'We offer full support for re-matching. Our goal is the pet\'s long-term happiness, and we understand that sometimes the chemistry isn\'t right.' }
          ].map((item, i) => (
            <div key={i} className={`border-4 border-[#FEF3C7] rounded-[30px] overflow-hidden transition-all ${open === i ? 'bg-[#FFFBEB]' : ''}`}>
              <button 
                onClick={() => setOpen(open === i ? -1 : i)}
                className="w-full p-6 flex items-center justify-between text-left"
              >
                <span className={`${fredoka.className} text-xl text-[#451A03]`}>{item.q}</span>
                <ChevronDown className={`text-[#F59E0B] transition-transform ${open === i ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className={`px-6 pb-6 text-[#92400E] text-sm ${quicksand.className}`}
                  >
                    {item.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const Newsletter = () => (
  <section className="py-24 px-6 border-y-4 border-[#FEF3C7] bg-[#FFFBEB] relative overflow-hidden">
    <div className="absolute top-0 left-0 p-8 opacity-5">
      <PawPrint size={300} />
    </div>
    <div className="max-w-4xl mx-auto text-center relative z-10">
      <h2 className={`${fredoka.className} text-6xl text-[#451A03] mb-6`}>JOIN THE PACK.</h2>
      <p className={`text-[#92400E] mb-10 max-w-xl mx-auto text-lg ${quicksand.className}`}>Get the latest adoption alerts and pet care tips delivered to your inbox.</p>
      <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
        <input 
          type="email" 
          placeholder="your@email.com" 
          className={`flex-1 bg-white border-2 border-[#FEF3C7] rounded-full px-8 py-4 text-[#451A03] focus:outline-none focus:border-[#F59E0B] transition-colors shadow-inner ${quicksand.className} font-bold`}
        />
        <TailWagButton>SIGN ME UP</TailWagButton>
      </div>
    </div>
  </section>
)

const Footer = () => (
  <footer className="py-20 px-6 bg-[#FFFFFF]">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-16">
        <div className="col-span-2">
          <div className={`${fredoka.className} text-2xl text-[#451A03] mb-6`}>
            TAIL<span className="text-[#F59E0B]">WAG</span>
          </div>
          <p className={`text-[#92400E] text-sm max-w-xs leading-relaxed ${quicksand.className}`}>Creating happy homes, one wag at a time. We are a global network of shelters and pet lovers.</p>
        </div>
        {[
          { title: 'Adopt', links: ['Search Pets', 'Breeds', 'Shelters', 'Fostering'] },
          { title: 'Learn', links: ['Health Guide', 'Training', 'Blog', 'Support'] },
          { title: 'About', links: ['Our Story', 'Careers', 'Donate', 'Contact'] }
        ].map(group => (
          <div key={group.title}>
            <div className={`${fredoka.className} text-lg text-[#451A03] mb-6`}>{group.title}</div>
            <ul className="space-y-4">
              {group.links.map(link => (
                <li key={link}><a href="#" className={`text-[#92400E] text-sm hover:text-[#F59E0B] transition-colors ${quicksand.className} font-bold`}>{link}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="pt-8 border-t-2 border-[#FEF3C7] flex flex-col md:flex-row justify-between items-center gap-6">
        <div className={`text-[#92400E] text-[10px] uppercase tracking-widest font-bold ${quicksand.className}`}>© 2026 TAILWAG INTERNATIONAL INC. ALL RIGHTS RESERVED.</div>
        <div className="flex gap-6">
          <Heart className="text-[#F59E0B] hover:scale-125 transition-transform cursor-pointer" size={24} />
          <PawPrint className="text-[#F59E0B] hover:scale-125 transition-transform cursor-pointer" size={24} />
        </div>
      </div>
    </div>
  </footer>
)

export default function TailWag() {
  return (
    <div className={`min-h-screen bg-[#FFFBEB] text-[#451A03] overflow-x-hidden ${quicksand.className}`}>
      <Navbar />
      <Hero />
      <StatsBar />
      <Features />
      <ProductDetail />
      <Pricing />
      <Testimonials />
      <FAQ />
      <Newsletter />
      <Footer />
      
      {/* --- Global Effects --- */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03] mix-blend-multiply">
        <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
      </div>
      
      </div>
  )
}
