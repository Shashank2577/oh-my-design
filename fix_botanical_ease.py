import re

with open('app/styles/botanical/page.tsx', 'r') as f:
    content = f.read()

content = content.replace('ease: "easeInOut"', 'ease: "linear"')

with open('app/styles/botanical/page.tsx', 'w') as f:
    f.write(content)
