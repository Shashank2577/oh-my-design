import { chromium } from 'playwright';
import { mkdirSync, existsSync, renameSync, statSync, readFileSync } from 'fs';
import path from 'path';

const BASE_URL = process.env.BASE_URL || 'https://oh-my-design.vercel.app';
const OUTPUT_DIR = path.resolve('public/previews');
const VIEWPORT = { width: 1280, height: 720 };

// Accept slugs as args, or capture all built styles
function getSlugs() {
  const args = process.argv.slice(2);
  if (args.length > 0) return args;

  // Parse all built slugs from registry
  const content = readFileSync(path.resolve('lib/styles-registry.ts'), 'utf8');
  const slugs = [];
  const regex = /slug:\s*'([^']+)'.*?built:\s*true/gs;
  let match;
  while ((match = regex.exec(content)) !== null) slugs.push(match[1]);
  return slugs;
}

async function capture(browser, slug) {
  const mp4Path = path.join(OUTPUT_DIR, `${slug}.mp4`);
  if (existsSync(mp4Path)) {
    console.log(`⏭  ${slug} (exists)`);
    return;
  }

  const context = await browser.newContext({
    viewport: VIEWPORT,
    recordVideo: { dir: OUTPUT_DIR, size: { width: 640, height: 360 } },
  });
  const page = await context.newPage();

  try {
    console.log(`📸 ${slug}`);
    await page.goto(`${BASE_URL}/styles/${slug}`, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(1500);

    const pageHeight = await page.evaluate(() => document.documentElement.scrollHeight);
    const dist = pageHeight - VIEWPORT.height;

    if (dist > 0) {
      // Smooth scroll down
      for (let i = 0; i <= 40; i++) {
        const p = i / 40;
        const e = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
        await page.evaluate(y => window.scrollTo({ top: y }), Math.round(e * dist));
        await page.waitForTimeout(100);
      }
      await page.waitForTimeout(800);
      // Quick scroll back up
      for (let i = 0; i <= 15; i++) {
        const p = i / 15;
        const e = 1 - Math.pow(1 - p, 3);
        await page.evaluate(y => window.scrollTo({ top: y }), Math.round((1 - e) * dist));
        await page.waitForTimeout(80);
      }
    }
    await page.waitForTimeout(500);

    const vid = page.video();
    await page.close();
    await context.close();
    const vp = await vid?.path();

    if (vp && existsSync(vp)) {
      renameSync(vp, mp4Path);
      const kb = Math.round(statSync(mp4Path).size / 1024);
      console.log(`✅ ${slug} (${kb}KB)`);
    } else {
      console.log(`⚠️ ${slug}: no video`);
    }
  } catch (err) {
    console.error(`❌ ${slug}: ${err.message}`);
    try { await context.close(); } catch {}
  }
}

async function main() {
  mkdirSync(OUTPUT_DIR, { recursive: true });
  const slugs = getSlugs();
  console.log(`Capturing ${slugs.length} styles...\n`);

  const browser = await chromium.launch({ headless: true });
  // Process 3 at a time
  for (let i = 0; i < slugs.length; i += 3) {
    const batch = slugs.slice(i, i + 3);
    await Promise.all(batch.map(s => capture(browser, s)));
  }
  await browser.close();

  const captured = slugs.filter(s => existsSync(path.join(OUTPUT_DIR, `${s}.mp4`)));
  console.log(`\n🎉 Done! ${captured.length}/${slugs.length} captured.`);
}

main().catch(console.error);
