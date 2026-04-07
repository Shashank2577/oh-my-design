import re

with open('app/styles/playful-geometric/page.tsx', 'r') as f:
    content = f.read()

# Pattern for motion.button
# find: style={{ ... }}
# replace: style={{ ... }}\n          transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}

# Navbar button
content = content.replace(
'''        <motion.button
          className="px-5 h-10 rounded-full text-sm font-medium hard-shadow hard-shadow-hover hard-shadow-active transition-all duration-300"
          style={{ backgroundColor: tokens.accent, color: tokens.accentForeground }}
        >''',
'''        <motion.button
          className="px-5 h-10 rounded-full text-sm font-medium hard-shadow hard-shadow-hover hard-shadow-active transition-all duration-300"
          style={{ backgroundColor: tokens.accent, color: tokens.accentForeground }}
          transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
        >'''
)

# Hero buttons
content = content.replace(
'''            <motion.button
              className="h-14 px-8 rounded-full font-medium flex items-center gap-2 hard-shadow hard-shadow-hover hard-shadow-active transition-all duration-300"
              style={{ backgroundColor: tokens.accent, color: tokens.accentForeground }}
            >''',
'''            <motion.button
              className="h-14 px-8 rounded-full font-medium flex items-center gap-2 hard-shadow hard-shadow-hover hard-shadow-active transition-all duration-300"
              style={{ backgroundColor: tokens.accent, color: tokens.accentForeground }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            >'''
)

content = content.replace(
'''            <motion.button
              className="h-14 px-8 rounded-full font-medium border hard-shadow hard-shadow-hover hard-shadow-active transition-all duration-300"
              style={{ borderColor: tokens.border, color: tokens.foreground, backgroundColor: 'transparent' }}
            >''',
'''            <motion.button
              className="h-14 px-8 rounded-full font-medium border hard-shadow hard-shadow-hover hard-shadow-active transition-all duration-300"
              style={{ borderColor: tokens.border, color: tokens.foreground, backgroundColor: 'transparent' }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            >'''
)

# Pricing button
content = content.replace(
'''                <motion.button
                  className="w-full h-12 rounded-full font-medium text-sm border hard-shadow hard-shadow-hover hard-shadow-active transition-all duration-300"
                  style={tier.highlighted
                    ? { backgroundColor: tokens.accent, color: tokens.accentForeground, borderColor: tokens.accent }
                    : { backgroundColor: 'transparent', color: tokens.foreground, borderColor: tokens.border }
                  }
                >''',
'''                <motion.button
                  className="w-full h-12 rounded-full font-medium text-sm border hard-shadow hard-shadow-hover hard-shadow-active transition-all duration-300"
                  style={tier.highlighted
                    ? { backgroundColor: tokens.accent, color: tokens.accentForeground, borderColor: tokens.accent }
                    : { backgroundColor: 'transparent', color: tokens.foreground, borderColor: tokens.border }
                  }
                  transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                >'''
)

# Newsletter button
content = content.replace(
'''              <motion.button
                type="submit"
                disabled={status === 'loading'}
                className="h-12 px-6 rounded-full font-medium text-sm disabled:opacity-60 hard-shadow hard-shadow-hover hard-shadow-active transition-all duration-300"
                style={{ backgroundColor: tokens.accent, color: tokens.accentForeground }}
              >''',
'''              <motion.button
                type="submit"
                disabled={status === 'loading'}
                className="h-12 px-6 rounded-full font-medium text-sm disabled:opacity-60 hard-shadow hard-shadow-hover hard-shadow-active transition-all duration-300"
                style={{ backgroundColor: tokens.accent, color: tokens.accentForeground }}
                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              >'''
)

with open('app/styles/playful-geometric/page.tsx', 'w') as f:
    f.write(content)
