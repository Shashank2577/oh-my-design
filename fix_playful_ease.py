import re

with open('app/styles/playful-geometric/page.tsx', 'r') as f:
    content = f.read()

content = content.replace("ease: 'easeOut'", "ease: [0.23, 1, 0.32, 1]")

with open('app/styles/playful-geometric/page.tsx', 'w') as f:
    f.write(content)
