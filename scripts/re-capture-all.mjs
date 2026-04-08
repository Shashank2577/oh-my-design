import { readFileSync, existsSync, unlinkSync } from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const REGISTRY_PATH = path.resolve('lib/styles-registry.ts');
const PREVIEWS_DIR = path.resolve('public/previews');
const THUMBS_DIR = path.resolve('public/previews/thumbs');

function getSlugsAfterSynthMind() {
  const content = readFileSync(REGISTRY_PATH, 'utf8');
  const lines = content.split('\n');
  let foundSynthMind = false;
  const slugs = [];
  const slugRegex = /slug:\s*'([^']+)'/;
  const builtRegex = /built:\s*true/;

  for (const line of lines) {
    if (line.includes("'synth-mind'")) {
      foundSynthMind = true;
      continue;
    }
    if (foundSynthMind) {
      const slugMatch = line.match(slugRegex);
      const builtMatch = line.match(builtRegex);
      if (slugMatch && builtMatch) {
        slugs.push(slugMatch[1]);
      }
    }
  }
  return slugs;
}

const slugsToRecapture = getSlugsAfterSynthMind();
console.log(`Found ${slugsToRecapture.length} styles to recapture after SynthMind:`, slugsToRecapture);

for (const slug of slugsToRecapture) {
  console.log(`\n--- Processing ${slug} ---`);
  
  const mp4Path = path.join(PREVIEWS_DIR, `${slug}.mp4`);
  const thumbPath = path.join(THUMBS_DIR, `${slug}.jpg`);

  if (existsSync(mp4Path)) {
    console.log(`Deleting existing preview for ${slug}...`);
    unlinkSync(mp4Path);
  }
  if (existsSync(thumbPath)) {
    console.log(`Deleting existing thumbnail for ${slug}...`);
    unlinkSync(thumbPath);
  }

  try {
    console.log(`Capturing preview for ${slug}...`);
    execSync(`BASE_URL=http://localhost:4000 node scripts/capture-previews.mjs ${slug}`, { stdio: 'inherit' });
    
    console.log(`Capturing thumbnail for ${slug}...`);
    execSync(`BASE_URL=http://localhost:4000 node scripts/capture-thumbnails.mjs ${slug}`, { stdio: 'inherit' });
    
    console.log(`✅ Successfully recaptured ${slug}`);
  } catch (err) {
    console.error(`❌ Failed to recapture ${slug}:`, err.message);
  }
}

console.log('\n🎉 Recapture process finished.');
