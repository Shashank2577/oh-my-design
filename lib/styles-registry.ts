export interface StyleMeta {
  slug: string
  name: string
  category: 'Elegant' | 'Minimal' | 'Creative' | 'Modern' | 'Professional' | 'Organic' | 'Futuristic' | 'Dynamic' | 'Raw' | 'Editorial' | 'Nostalgic' | 'Tech' | 'Sports' | 'Pets' | 'AI' | 'Marketing'
  vibe: string
  bestFor: string
  accentColor: string // for gallery card preview
  built: boolean // flip to true once the page is created
  version?: 'V1' | 'V2' | 'V3'
}

export const STYLES: StyleMeta[] = [
  // --- V1 Original Styles ---
  { slug: 'academia', name: 'Academia', category: 'Elegant', vibe: 'Scholarly, classic, refined', bestFor: 'Educational platforms, Publishing', accentColor: '#C9A962', built: true, version: 'V1' },
  { slug: 'art-deco', name: 'Art Deco', category: 'Elegant', vibe: 'Luxurious 1920s glamour', bestFor: 'Luxury brands, Hotels', accentColor: '#D4AF37', built: true, version: 'V1' },
  { slug: 'bauhaus', name: 'Bauhaus', category: 'Minimal', vibe: 'Functionalist, geometric minimalism', bestFor: 'Design tools, Architecture sites', accentColor: '#E63329', built: true, version: 'V1' },
  { slug: 'bold-typography', name: 'Bold Typography', category: 'Creative', vibe: 'Type-driven design', bestFor: 'Content platforms, Editorial sites', accentColor: '#000000', built: true, version: 'V1' },
  { slug: 'botanical', name: 'Botanical', category: 'Organic', vibe: 'Nature-inspired, organic', bestFor: 'Health & wellness, Eco brands', accentColor: '#4A7C59', built: true, version: 'V1' },
  { slug: 'claymorphism', name: 'Claymorphism', category: 'Modern', vibe: 'Soft, clay-like 3D elements', bestFor: 'Creative agencies, Kids apps', accentColor: '#FF6B6B', built: true, version: 'V1' },
  { slug: 'cyberpunk', name: 'Cyberpunk', category: 'Futuristic', vibe: 'Futuristic, neon, high-tech', bestFor: 'Gaming, Tech products', accentColor: '#00FFFF', built: true, version: 'V1' },
  { slug: 'enterprise', name: 'Enterprise', category: 'Professional', vibe: 'Professional, corporate, scalable', bestFor: 'B2B SaaS, Corporate sites', accentColor: '#0052CC', built: true, version: 'V1' },
  { slug: 'flat-design', name: 'Flat Design', category: 'Minimal', vibe: 'Clean, minimal, 2D', bestFor: 'Mobile apps, Dashboards', accentColor: '#3498DB', built: true, version: 'V1' },
  { slug: 'fluent-2', name: 'Fluent 2', category: 'Modern', vibe: 'Microsoft Fluent 2 Design System', bestFor: 'Enterprise apps, Windows apps', accentColor: '#0078D4', built: true, version: 'V1' },
  { slug: 'industrial', name: 'Industrial', category: 'Raw', vibe: 'Raw, mechanical, utilitarian', bestFor: 'Manufacturing, Construction', accentColor: '#FF6B00', built: true, version: 'V1' },
  { slug: 'kinetic', name: 'Kinetic', category: 'Dynamic', vibe: 'Dynamic, motion-focused', bestFor: 'Creative portfolios, Event sites', accentColor: '#FF3D00', built: true, version: 'V1' },
  { slug: 'luxury', name: 'Luxury', category: 'Elegant', vibe: 'Premium, elegant, sophisticated', bestFor: 'Luxury brands, High-end retail', accentColor: '#C0A060', built: true, version: 'V1' },
  { slug: 'material', name: 'Material', category: 'Modern', vibe: 'Google Material Design', bestFor: 'Android apps, Modern dashboards', accentColor: '#6200EE', built: true, version: 'V1' },
  { slug: 'maximalism', name: 'Maximalism', category: 'Creative', vibe: 'Bold, expressive, abundant', bestFor: 'Creative agencies, Art platforms', accentColor: '#FF0080', built: true, version: 'V1' },
  { slug: 'minimal-dark', name: 'Minimal Dark', category: 'Minimal', vibe: 'Minimal dark theme', bestFor: 'Developer tools, Code editors', accentColor: '#64FFDA', built: true, version: 'V1' },
  { slug: 'modern-dark', name: 'Modern Dark', category: 'Modern', vibe: 'Contemporary dark UI with depth', bestFor: 'SaaS products, Developer tools', accentColor: '#7C3AED', built: true, version: 'V1' },
  { slug: 'monochrome', name: 'Monochrome', category: 'Minimal', vibe: 'Black and white, high contrast', bestFor: 'Photography, Portfolios', accentColor: '#000000', built: true, version: 'V1' },
  { slug: 'neo-brutalism', name: 'Neo-brutalism', category: 'Creative', vibe: 'Bold, raw, colorful brutalism', bestFor: 'Creative studios, Startups', accentColor: '#FFE500', built: true, version: 'V1' },
  { slug: 'neumorphism', name: 'Neumorphism', category: 'Modern', vibe: 'Soft UI, skeuomorphic', bestFor: 'Mobile apps, Smart home', accentColor: '#6C63FF', built: true, version: 'V1' },
  { slug: 'newsprint', name: 'Newsprint', category: 'Editorial', vibe: 'Newspaper-inspired', bestFor: 'News sites, Magazines', accentColor: '#1A1A1A', built: true, version: 'V1' },
  { slug: 'organic', name: 'Organic', category: 'Organic', vibe: 'Natural, flowing forms', bestFor: 'Wellness, Natural products', accentColor: '#7CB87A', built: true, version: 'V1' },
  { slug: 'playful-geometric', name: 'Playful Geometric', category: 'Creative', vibe: 'Fun geometric shapes', bestFor: 'Kids products, Creative tools', accentColor: '#8B5CF6', built: true, version: 'V1' },
  { slug: 'professional', name: 'Professional', category: 'Professional', vibe: 'Clean, business-focused', bestFor: 'Corporate sites, B2B platforms', accentColor: '#B8860B', built: true, version: 'V1' },
  { slug: 'retro', name: 'Retro', category: 'Nostalgic', vibe: 'Vintage, nostalgic', bestFor: 'Retro brands, Gaming', accentColor: '#0000FF', built: true, version: 'V1' },
  { slug: 'humanist-literary', name: 'Humanist Literary', category: 'Elegant', vibe: 'Quiet intelligence, organic warmth', bestFor: 'Content platforms, Blogs', accentColor: '#8B6F47', built: true, version: 'V1' },
  { slug: 'saas', name: 'SaaS', category: 'Modern', vibe: 'Modern SaaS aesthetic', bestFor: 'SaaS products, Startups', accentColor: '#4F46E5', built: true, version: 'V1' },
  { slug: 'sketch', name: 'Sketch', category: 'Creative', vibe: 'Hand-drawn, artistic', bestFor: 'Creative portfolios, Artistic brands', accentColor: '#2D3748', built: true, version: 'V1' },
  { slug: 'swiss', name: 'Swiss', category: 'Minimal', vibe: 'International Typographic Style', bestFor: 'Design studios, Portfolios', accentColor: '#FF0000', built: true, version: 'V1' },
  { slug: 'terminal-cli', name: 'Terminal CLI', category: 'Tech', vibe: 'Command-line interface aesthetic', bestFor: 'Developer tools, CLI apps', accentColor: '#00FF00', built: true, version: 'V1' },
  { slug: 'vaporwave', name: 'Vaporwave', category: 'Nostalgic', vibe: '80s/90s aesthetic, nostalgic', bestFor: 'Art projects, Music platforms', accentColor: '#FF71CE', built: true, version: 'V1' },
  { slug: 'web3', name: 'Web3', category: 'Tech', vibe: 'Decentralized, crypto-inspired', bestFor: 'Crypto platforms, NFT marketplaces', accentColor: '#9945FF', built: true, version: 'V1' },

  // --- V2 Brand Styles ---
  { slug: 'together.ai', name: 'Together AI', category: 'Tech', vibe: 'Pastel-gradient dreamscape built for enterprise AI infrastructure', bestFor: 'AI platforms, enterprise infrastructure', accentColor: '#ef2cc1', built: true, version: 'V2' },
  { slug: 'uber', name: 'Uber', category: 'Professional', vibe: 'High-contrast starkness, brutalist typography', bestFor: 'Transportation, utility apps', accentColor: '#000000', built: true, version: 'V2' },
  { slug: 'vercel', name: 'Vercel', category: 'Tech', vibe: 'Monochrome precision, stark minimalism', bestFor: 'Developer tools, SaaS', accentColor: '#000000', built: true, version: 'V2' },
  { slug: 'voltagent', name: 'VoltAgent', category: 'Tech', vibe: 'Agentic automation, high-tech interface', bestFor: 'AI agents, developer tools', accentColor: '#10B981', built: true, version: 'V2' },
  { slug: 'warp', name: 'Warp', category: 'Tech', vibe: 'Developer-focused, high performance terminal', bestFor: 'Developer tools, CLI', accentColor: '#01F7F7', built: true, version: 'V2' },
  { slug: 'resend', name: 'Resend', category: 'Minimal', vibe: 'Clean, developer-focused email aesthetics', bestFor: 'Email infrastructure, SaaS', accentColor: '#000000', built: true, version: 'V2' },
  { slug: 'revolut', name: 'Revolut', category: 'Modern', vibe: 'Modern digital banking with sleek gradients', bestFor: 'Fintech, mobile banking', accentColor: '#0075FF', built: true, version: 'V2' },
  { slug: 'runwayml', name: 'Runway', category: 'Creative', vibe: 'AI-creative studio with dark, professional UI', bestFor: 'Creative AI, video editing', accentColor: '#FF0055', built: true, version: 'V2' },
  { slug: 'sanity', name: 'Sanity', category: 'Modern', vibe: 'Content-focused, structured and minimal', bestFor: 'CMS, developer tools', accentColor: '#F03E2F', built: true, version: 'V2' },
  { slug: 'sentry', name: 'Sentry', category: 'Tech', vibe: 'Bold, functional monitoring interface', bestFor: 'Error tracking, developer tools', accentColor: '#362D59', built: true, version: 'V2' },
  { slug: 'claude', name: 'Claude', category: 'Elegant', vibe: 'Intellectual, warm and focused conversational AI', bestFor: 'AI tools, scholarly platforms', accentColor: '#D97757', built: true, version: 'V2' },
  { slug: 'clay', name: 'Clay', category: 'Modern', vibe: 'Soft shadows, tactile and relationship-focused', bestFor: 'CRM, professional networking', accentColor: '#FF6B6B', built: true, version: 'V2' },
  { slug: 'clickhouse', name: 'Clickhouse', category: 'Tech', vibe: 'Fast, data-dense and technical', bestFor: 'Databases, analytics', accentColor: '#FFCC01', built: true, version: 'V2' },
  { slug: 'cohere', name: 'Cohere', category: 'Organic', vibe: 'Natural language patterns and earthy tones', bestFor: 'NLP, AI platforms', accentColor: '#39594D', built: true, version: 'V2' },
  { slug: 'coinbase', name: 'Coinbase', category: 'Professional', vibe: 'Secure, clean and trusted financial interface', bestFor: 'Crypto, Fintech', accentColor: '#0052FF', built: true, version: 'V2' },
  { slug: 'composio', name: 'Composio', category: 'Tech', vibe: 'Developer-focused dark mode', bestFor: 'Dev tools, Infrastructure', accentColor: '#0007cd', built: true, version: 'V2' },
  { slug: 'cursor', name: 'Cursor', category: 'Tech', vibe: 'Warm minimal code editor', bestFor: 'AI tools, Dev tools', accentColor: '#f54e00', built: true, version: 'V2' },
  { slug: 'elevenlabs', name: 'ElevenLabs', category: 'Tech', vibe: 'Ethereal, voice AI', bestFor: 'AI products, Audio', accentColor: '#f5f2ef', built: true, version: 'V2' },
  { slug: 'expo', name: 'Expo', category: 'Tech', vibe: 'Luminous developer platform', bestFor: 'Developer platforms', accentColor: '#0d74ce', built: true, version: 'V2' },
  { slug: 'figma', name: 'Figma', category: 'Creative', vibe: 'Typographic sophistication', bestFor: 'Design tools, Creativity', accentColor: '#000000', built: true, version: 'V2' },

  // --- V3 Animation Heavy Styles ---
  { slug: 'velocity-scoreboard', name: 'Velocity Scoreboard', category: 'Sports', vibe: 'High-intensity sports analytics', bestFor: 'Live match dashboards', accentColor: '#CCFF00', built: true, version: 'V3' },
  { slug: 'neural-note', name: 'NeuralNote', category: 'AI', vibe: 'AI-native thought-graph', bestFor: 'Knowledge management tools', accentColor: '#6366F1', built: true, version: 'V3' },
  { slug: 'tail-wag', name: 'TailWag', category: 'Pets', vibe: 'Joyful pet adoption', bestFor: 'Pet care services', accentColor: '#F59E0B', built: true, version: 'V3' },
  { slug: 'fragline', name: 'FragLine', category: 'Sports', vibe: 'Cyber-tabloid eSports HUD', bestFor: 'Competitive gaming portfolios', accentColor: '#00F3FF', built: true, version: 'V3' },
  { slug: 'prism-portfolio', name: 'PrismPortfolio', category: 'Creative', vibe: 'Refractive visionary agency', bestFor: 'Creative design studios', accentColor: '#00FFF0', built: true, version: 'V3' },
  { slug: 'brand-story', name: 'BrandStory', category: 'Marketing', vibe: 'Cinematic brand legacy', bestFor: 'Premium storytelling', accentColor: '#D4AF37', built: true, version: 'V3' },
  { slug: 'ad-metric', name: 'AdMetric', category: 'Tech', vibe: 'High-frequency ad-tech dashboard', bestFor: 'Marketing analytics', accentColor: '#00FF41', built: true, version: 'V3' },
  { slug: 'folio-flux', name: 'FolioFlux', category: 'Creative', vibe: 'Adaptive morphing portfolio', bestFor: 'Creative agencies', accentColor: '#FF3E00', built: true, version: 'V3' },
  { slug: 'market-magnet', name: 'MarketMagnet', category: 'Marketing', vibe: 'Behavioral growth engine', bestFor: 'Conversion optimization', accentColor: '#6366F1', built: true, version: 'V3' },
  { slug: 'pixel-pulse', name: 'PixelPulse', category: 'Creative', vibe: 'Rhythmic pixel-perfect studio', bestFor: 'Digital artisans', accentColor: '#00FFCC', built: true, version: 'V3' },
  { slug: 'ad-burst', name: 'AdBurst', category: 'Marketing', vibe: 'Explosive viral momentum', bestFor: 'High-impact campaigns', accentColor: '#F9004D', built: true, version: 'V3' },
  { slug: 'canvas-flow', name: 'CanvasFlow', category: 'Tech', vibe: 'Infinite spatial design workspace', bestFor: 'Design tools, Collaboration', accentColor: '#3B82F6', built: true, version: 'V3' },
  { slug: 'brand-bond', name: 'BrandBond', category: 'Marketing', vibe: 'Emotional resonant branding', bestFor: 'Customer loyalty, Identity', accentColor: '#F43F5E', built: true, version: 'V3' },
  { slug: 'trend-tracker', name: 'TrendTracker', category: 'Tech', vibe: 'Living data pulse detection', bestFor: 'Market intelligence, Live data', accentColor: '#00FF66', built: true, version: 'V3' },
  { slug: 'pitch-perfect', name: 'PitchPerfect', category: 'Marketing', vibe: 'Theatrical cinematic sales decks', bestFor: 'High-stakes presentations', accentColor: '#FFFFFF', built: true, version: 'V3' },
  { slug: 'arena-pulse', name: 'Arena Pulse', category: 'Sports', vibe: 'Liquid-power athletic engine', bestFor: 'Pro performance tracking', accentColor: '#FF3E00', built: true, version: 'V3' },
  { slug: 'mvp-spotlight', name: 'MVP Spotlight', category: 'Sports', vibe: 'Theatrical player profiles', bestFor: 'Elite athlete branding', accentColor: '#FFFFFF', built: true, version: 'V3' },
  { slug: 'league-ladder', name: 'League Ladder', category: 'Sports', vibe: 'High-energy tournament hub', bestFor: 'eSports organizations', accentColor: '#00FF66', built: true, version: 'V3' },
  { slug: 'drill-master', name: 'DrillMaster', category: 'Sports', vibe: 'Technical coaching command deck', bestFor: 'Pro training management', accentColor: '#3B82F6', built: true, version: 'V3' },
  { slug: 'fan-cave', name: 'FanCave', category: 'Sports', vibe: 'Interactive 3D collectibles vault', bestFor: 'Memorabilia & NFTs', accentColor: '#FACC15', built: true, version: 'V3' },
  { slug: 'matchday-sync', name: 'MatchDay Sync', category: 'Sports', vibe: 'Sub-ms multi-device match sync', bestFor: 'Live broadcast engines', accentColor: '#10B981', built: true, version: 'V3' },
]
