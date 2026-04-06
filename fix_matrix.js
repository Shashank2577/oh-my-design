const fs = require('fs');
const filepath = 'app/styles/codeflow/page.tsx';
let content = fs.readFileSync(filepath, 'utf8');

// The MatrixRain generates random binary strings
content = content.replace(
  /\{Array\.from\(\{ length: 40 \}\)\.map\(\(_, j\) => \(\n\s*<span key=\{j\}>\{Math\.random\(\) > 0\.5 \? '1' : '0'\}<\/span>\n\s*\)\)\}/g,
  `{Array.from({ length: 40 }).map((_, j) => (
             <span key={j}>{j % 2 === 0 ? '1' : '0'}</span>
           ))}`
);

// Instead of Math.random() in animate, we use fixed durations dependent on index
content = content.replace(
  /transition=\{\{ duration: Math\.random\(\) \* 5 \+ 5, repeat: Infinity, ease: 'linear', delay: Math\.random\(\) \* -10 \}\}/g,
  "transition={{ duration: (i % 5) + 5, repeat: Infinity, ease: 'linear', delay: -(i % 10) }}"
);

fs.writeFileSync(filepath, content);
