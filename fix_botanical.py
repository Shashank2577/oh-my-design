import re

with open('app/styles/botanical/page.tsx', 'r') as f:
    content = f.read()

# 1. Fix easeOut in FAQ
content = content.replace("ease: 'easeOut'", "ease: [0.23, 1, 0.32, 1]")

# 2. Add transition to all motion.button elements and remove transition-colors duration-300
def fix_button(match):
    tag_content = match.group(1)

    # Remove tailwind transition classes
    tag_content = tag_content.replace(' transition-colors duration-300', '')
    tag_content = tag_content.replace(' transition-all duration-300', '')
    tag_content = tag_content.replace(' transition-colors', '')

    # Add Framer motion transition
    if 'transition={{' not in tag_content:
        tag_content += '\n          transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}'

    return f'<motion.button{tag_content}>'

content = re.sub(r'<motion\.button([^>]+)>', fix_button, content)

# 3. Add Leaf icon to imports
if 'Leaf' not in content:
    content = content.replace('Star, ChevronDown, ArrowRight, Check, Users, Zap, Globe, Shield,\n  BookOpen, Layout, Palette, Code2, BarChart, Lock', 'Star, ChevronDown, ArrowRight, Check, Users, Zap, Globe, Shield,\n  BookOpen, Layout, Palette, Code2, BarChart, Lock, Leaf')

# 4. Replace Hero Visual
hero_visual_old = """        {/* Hero Visual — replace with style-specific imagery */}
        <FadeUp delay={0.4}>
          <div
            className="mt-16 w-full h-72 md:h-96 rounded-[200px_200px_0_0] overflow-hidden relative"
            style={{ background: `linear-gradient(135deg, ${tokens.accent}40, ${tokens.accent}10)`, border: `1px solid ${tokens.border}` }}
          >
             <div className="absolute inset-0 bg-black/5" />
          </div>
        </FadeUp>"""

hero_visual_new = """        {/* Hero Visual — replace with style-specific imagery */}
        <FadeUp delay={0.4}>
          <div
            className="mt-16 w-full h-72 md:h-96 rounded-[200px_200px_0_0] overflow-hidden relative flex items-center justify-center"
            style={{ background: `linear-gradient(135deg, ${tokens.accent}40, ${tokens.accent}10)`, border: `1px solid ${tokens.border}` }}
          >
            <div className="absolute inset-0 bg-black/5" />

            {/* Botanical Illustrations */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: [0.23, 1, 0.32, 1] }}
              className="relative z-10 flex gap-8 items-center"
            >
              <Leaf className="w-24 h-24 md:w-32 md:h-32" style={{ color: tokens.foreground, opacity: 0.8 }} />
              <div className="flex flex-col gap-4">
                <Leaf className="w-16 h-16 md:w-20 md:h-20" style={{ color: tokens.interactive, opacity: 0.9, transform: 'rotate(45deg)' }} />
                <Leaf className="w-12 h-12 md:w-16 md:h-16" style={{ color: tokens.accent, opacity: 0.7, transform: 'rotate(-30deg)' }} />
              </div>
            </motion.div>

            {/* Decorative circles representing soft pink flowers */}
            <motion.div
               animate={{ y: [0, -10, 0] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               className="absolute top-1/4 left-1/4 w-16 h-16 rounded-full mix-blend-multiply filter blur-xl opacity-60"
               style={{ backgroundColor: tokens.interactive }}
            />
            <motion.div
               animate={{ y: [0, 15, 0] }}
               transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
               className="absolute bottom-1/4 right-1/3 w-24 h-24 rounded-full mix-blend-multiply filter blur-xl opacity-60"
               style={{ backgroundColor: tokens.accent }}
            />
          </div>
        </FadeUp>"""

content = content.replace(hero_visual_old, hero_visual_new)

with open('app/styles/botanical/page.tsx', 'w') as f:
    f.write(content)

print("Done")
