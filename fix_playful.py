import re

with open('app/styles/playful-geometric/page.tsx', 'r') as f:
    content = f.read()

# Replace Hero visual
hero_visual_search = r'''        \{\/\* Hero Visual — replace with style-specific imagery \*\/\}
        <FadeUp delay=\{0\.4\}>
          <div
            className="mt-16 w-full h-72 md:h-96 rounded-2xl"
            style=\{\{ background: `linear-gradient\(135deg, \$\{tokens\.accent\}20, \$\{tokens\.accent\}05\)`, border: `1px solid \$\{tokens\.border\}` \}\}
          \/>
        <\/FadeUp>'''

hero_visual_replace = '''        {/* Hero Visual — replace with style-specific imagery */}
        <FadeUp delay={0.4}>
          <div
            className="mt-16 w-full h-72 md:h-96 rounded-2xl relative overflow-hidden flex items-center justify-center border-4"
            style={{ backgroundColor: tokens.tertiary, borderColor: tokens.border }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-20 -left-20 w-64 h-64 border-4 rounded-full"
              style={{ borderColor: tokens.secondary }}
            />
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: [0.23, 1, 0.32, 1] }}
              className="absolute top-10 right-20 w-32 h-32 border-4 bg-white"
              style={{ borderColor: tokens.accent, transform: 'rotate(15deg)' }}
            />
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: [0.23, 1, 0.32, 1] }}
              className="absolute -bottom-10 left-1/3 w-48 h-48 border-4"
              style={{ borderColor: tokens.quaternary, borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%', backgroundColor: tokens.accent }}
            />
            <div className="relative z-10 text-center font-bold font-heading text-4xl md:text-6xl p-8 bg-white border-4 hard-shadow" style={{ borderColor: tokens.border, color: tokens.foreground }}>
              Playful Vibes
            </div>
          </div>
        </FadeUp>'''

content = re.sub(hero_visual_search, hero_visual_replace, content)

# Add transition to buttons that have 'transition-all duration-300' and are motion.button
button_search = r'(<motion\.button[^>]*className="[^"]*transition-all duration-300[^"]*"[^>]*>)'
def repl_button(m):
    return m.group(1).replace('>', '\n          transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}\n        >')
# Actually let's just do a simpler replace for buttons
# It's easier to just write python logic

with open('app/styles/playful-geometric/page.tsx', 'w') as f:
    f.write(content)
