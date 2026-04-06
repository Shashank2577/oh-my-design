const fs = require('fs');

// Botstream hydration fix
const botstreamPath = 'app/styles/botstream/page.tsx';
let botstream = fs.readFileSync(botstreamPath, 'utf8');
botstream = botstream.replace(
  /animate=\{isPlaying \? \{ height: \['20%', `\$\{Math.random\(\) \* 80 \+ 20\}%`, '20%'\] \} : \{ height: '20%' \}\}/g,
  "animate={isPlaying ? { height: ['20%', `${typeof window !== 'undefined' ? Math.random() * 80 + 20 : 50}%`, '20%'] } : { height: '20%' }}"
);

// CodeFlow hydration fix
const codeflowPath = 'app/styles/codeflow/page.tsx';
let codeflow = fs.readFileSync(codeflowPath, 'utf8');

// The MatrixRain component uses Math.random() in duration and delay.
// We should manage random values in state or useEffect.
botstream = botstream.replace(/import \{ Variants \} from 'framer-motion'\n/g, '');
botstream = "import { Variants } from 'framer-motion'\n" + botstream;
fs.writeFileSync(botstreamPath, botstream);

let codeflowContent = fs.readFileSync(codeflowPath, 'utf8');
codeflowContent = codeflowContent.replace(/import \{ Variants \} from 'framer-motion'\n/g, '');
codeflowContent = "import { Variants } from 'framer-motion'\n" + codeflowContent;
fs.writeFileSync(codeflowPath, codeflowContent);

let logicgatePath = 'app/styles/logicgate/page.tsx';
let logicgateContent = fs.readFileSync(logicgatePath, 'utf8');
logicgateContent = logicgateContent.replace(/import \{ Variants \} from 'framer-motion'\n/g, '');
logicgateContent = "import { Variants } from 'framer-motion'\n" + logicgateContent;
fs.writeFileSync(logicgatePath, logicgateContent);

let promptpalacePath = 'app/styles/promptpalace/page.tsx';
let promptpalaceContent = fs.readFileSync(promptpalacePath, 'utf8');
promptpalaceContent = promptpalaceContent.replace(/import \{ Variants \} from 'framer-motion'\n/g, '');
promptpalaceContent = "import { Variants } from 'framer-motion'\n" + promptpalaceContent;
fs.writeFileSync(promptpalacePath, promptpalaceContent);
