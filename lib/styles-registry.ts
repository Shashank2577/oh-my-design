export interface StyleMeta {
  slug: string
  name: string
  category: 'Elegant' | 'Minimal' | 'Creative' | 'Modern' | 'Professional' | 'Organic' | 'Futuristic' | 'Dynamic' | 'Raw' | 'Editorial' | 'Nostalgic' | 'Tech'
  vibe: string
  bestFor: string
  accentColor: string // for gallery card preview
  built: boolean // flip to true once the page is created
}

export const STYLES: StyleMeta[] = [
  { slug: 'academia', name: 'Academia', category: 'Elegant', vibe: 'Scholarly, classic, refined', bestFor: 'Educational platforms, Publishing', accentColor: '#C9A962', built: false },
  { slug: 'art-deco', name: 'Art Deco', category: 'Elegant', vibe: 'Luxurious 1920s glamour', bestFor: 'Luxury brands, Hotels', accentColor: '#D4AF37', built: false },
  { slug: 'bauhaus', name: 'Bauhaus', category: 'Minimal', vibe: 'Functionalist, geometric minimalism', bestFor: 'Design tools, Architecture sites', accentColor: '#E63329', built: false },
  { slug: 'bold-typography', name: 'Bold Typography', category: 'Creative', vibe: 'Type-driven design', bestFor: 'Content platforms, Editorial sites', accentColor: '#000000', built: false },
  { slug: 'botanical', name: 'Botanical', category: 'Organic', vibe: 'Nature-inspired, organic', bestFor: 'Health & wellness, Eco brands', accentColor: '#4A7C59', built: false },
  { slug: 'claymorphism', name: 'Claymorphism', category: 'Modern', vibe: 'Soft, clay-like 3D elements', bestFor: 'Creative agencies, Kids apps', accentColor: '#FF6B6B', built: false },
  { slug: 'cyberpunk', name: 'Cyberpunk', category: 'Futuristic', vibe: 'Futuristic, neon, high-tech', bestFor: 'Gaming, Tech products', accentColor: '#00FFFF', built: false },
  { slug: 'enterprise', name: 'Enterprise', category: 'Professional', vibe: 'Professional, corporate, scalable', bestFor: 'B2B SaaS, Corporate sites', accentColor: '#0052CC', built: false },
  { slug: 'flat-design', name: 'Flat Design', category: 'Minimal', vibe: 'Clean, minimal, 2D', bestFor: 'Mobile apps, Dashboards', accentColor: '#3498DB', built: false },
  { slug: 'fluent-2', name: 'Fluent 2', category: 'Modern', vibe: 'Microsoft Fluent 2 Design System', bestFor: 'Enterprise apps, Windows apps', accentColor: '#0078D4', built: false },
  { slug: 'industrial', name: 'Industrial', category: 'Raw', vibe: 'Raw, mechanical, utilitarian', bestFor: 'Manufacturing, Construction', accentColor: '#FF6B00', built: false },
  { slug: 'kinetic', name: 'Kinetic', category: 'Dynamic', vibe: 'Dynamic, motion-focused', bestFor: 'Creative portfolios, Event sites', accentColor: '#FF3D00', built: false },
  { slug: 'luxury', name: 'Luxury', category: 'Elegant', vibe: 'Premium, elegant, sophisticated', bestFor: 'Luxury brands, High-end retail', accentColor: '#C0A060', built: false },
  { slug: 'material', name: 'Material', category: 'Modern', vibe: 'Google Material Design', bestFor: 'Android apps, Modern dashboards', accentColor: '#6200EE', built: false },
  { slug: 'maximalism', name: 'Maximalism', category: 'Creative', vibe: 'Bold, expressive, abundant', bestFor: 'Creative agencies, Art platforms', accentColor: '#FF0080', built: false },
  { slug: 'minimal-dark', name: 'Minimal Dark', category: 'Minimal', vibe: 'Minimal dark theme', bestFor: 'Developer tools, Code editors', accentColor: '#64FFDA', built: false },
  { slug: 'modern-dark', name: 'Modern Dark', category: 'Modern', vibe: 'Contemporary dark UI with depth', bestFor: 'SaaS products, Developer tools', accentColor: '#7C3AED', built: false },
  { slug: 'monochrome', name: 'Monochrome', category: 'Minimal', vibe: 'Black and white, high contrast', bestFor: 'Photography, Portfolios', accentColor: '#000000', built: true },
  { slug: 'neo-brutalism', name: 'Neo-brutalism', category: 'Creative', vibe: 'Bold, raw, colorful brutalism', bestFor: 'Creative studios, Startups', accentColor: '#FFE500', built: false },
  { slug: 'neumorphism', name: 'Neumorphism', category: 'Modern', vibe: 'Soft UI, skeuomorphic', bestFor: 'Mobile apps, Smart home', accentColor: '#6C63FF', built: false },
  { slug: 'newsprint', name: 'Newsprint', category: 'Editorial', vibe: 'Newspaper-inspired', bestFor: 'News sites, Magazines', accentColor: '#1A1A1A', built: false },
  { slug: 'organic', name: 'Organic', category: 'Organic', vibe: 'Natural, flowing forms', bestFor: 'Wellness, Natural products', accentColor: '#7CB87A', built: false },
  { slug: 'playful-geometric', name: 'Playful Geometric', category: 'Creative', vibe: 'Fun geometric shapes', bestFor: 'Kids products, Creative tools', accentColor: '#FF6B6B', built: false },
  { slug: 'professional', name: 'Professional', category: 'Professional', vibe: 'Clean, business-focused', bestFor: 'Corporate sites, B2B platforms', accentColor: '#1E40AF', built: false },
  { slug: 'retro', name: 'Retro', category: 'Nostalgic', vibe: 'Vintage, nostalgic', bestFor: 'Retro brands, Gaming', accentColor: '#FF6B35', built: false },
  { slug: 'humanist-literary', name: 'Humanist Literary', category: 'Elegant', vibe: 'Quiet intelligence, organic warmth', bestFor: 'Content platforms, Blogs', accentColor: '#8B6F47', built: false },
  { slug: 'saas', name: 'SaaS', category: 'Modern', vibe: 'Modern SaaS aesthetic', bestFor: 'SaaS products, Startups', accentColor: '#4F46E5', built: false },
  { slug: 'sketch', name: 'Sketch', category: 'Creative', vibe: 'Hand-drawn, artistic', bestFor: 'Creative portfolios, Artistic brands', accentColor: '#2D3748', built: false },
  { slug: 'swiss', name: 'Swiss', category: 'Minimal', vibe: 'International Typographic Style', bestFor: 'Design studios, Portfolios', accentColor: '#FF0000', built: false },
  { slug: 'terminal-cli', name: 'Terminal CLI', category: 'Tech', vibe: 'Command-line interface aesthetic', bestFor: 'Developer tools, CLI apps', accentColor: '#00FF00', built: false },
  { slug: 'vaporwave', name: 'Vaporwave', category: 'Nostalgic', vibe: "80s/90s aesthetic, nostalgic", bestFor: 'Creative projects, Music platforms', accentColor: '#FF71CE', built: false },
  { slug: 'web3', name: 'Web3', category: 'Tech', vibe: 'Decentralized, crypto-inspired', bestFor: 'Crypto platforms, NFT marketplaces', accentColor: '#9945FF', built: false },
]
