import { chromium } from 'playwright';
import { mkdirSync, existsSync, readFileSync } from 'fs';
import path from 'path';

const BASE_URL = process.env.BASE_URL || 'http://localhost:4000';
const OUTPUT_DIR = path.resolve('public/previews/thumbs');
const VIEWPORT = { width: 1280, height: 720 };

function getSlugs() {
  const args = process.argv.slice(2);
  if (args.length > 0) return args;

  const content = readFileSync(path.resolve('lib/styles-registry.ts'), 'utf8');
  const slugs = [];
  const regex = /slug:\s*'([^']+)'.*?built:\s*true/gs;
  let match;
  while ((match = regex.exec(content)) !== null) slugs.push(match[1]);
  return slugs;
}

async function capture(browser, slug) {
  const outPath = path.join(OUTPUT_DIR, `${slug}.jpg`);
  if (existsSync(outPath)) {
    console.log(`⏭  ${slug} (exists)`);
    return;
  }

  const context = await browser.newContext({ viewport: VIEWPORT });
  const page = await context.newPage();

  try {
    console.log(`📸 ${slug}`);
    await page.goto(`${BASE_URL}/styles/${slug}`, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000);

    await page.screenshot({
      path: outPath,
      type: 'jpeg',
      quality: 80,
      clip: { x: 0, y: 0, width: 1280, height: 720 },
    });

    console.log(`✅ ${slug}`);
  } catch (err) {
    console.error(`❌ ${slug}: ${err.message}`);
  } finally {
    await context.close();
  }
}

async function main() {
  mkdirSync(OUTPUT_DIR, { recursive: true });
  const slugs = getSlugs();
  console.log(`Capturing ${slugs.length} thumbnails...\n`);

  const browser = await chromium.launch({ headless: true });

  for (let i = 0; i < slugs.length; i += 5) {
    const batch = slugs.slice(i, i + 5);
    await Promise.all(batch.map(s => capture(browser, s)));
  }

  await browser.close();
  const captured = slugs.filter(s => existsSync(path.join(OUTPUT_DIR, `${s}.jpg`)));
  console.log(`\n🎉 Done! ${captured.length}/${slugs.length} thumbnails captured.`);
}

main().catch(console.error);
