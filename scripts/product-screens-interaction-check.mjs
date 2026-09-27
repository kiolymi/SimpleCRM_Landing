import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';

const outputDir = path.join(process.cwd(), 'outputs', 'product-screens-audit', 'interactions');
await mkdir(outputDir, { recursive: true });

const browser = await chromium.launch({
  headless: true,
  executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
});
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
await context.route(/\.(mp4|webm)(\?.*)?$/i, route => route.abort());
const page = await context.newPage();
await page.emulateMedia({ reducedMotion: 'reduce' });
await page.goto('http://127.0.0.1:4173/', { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(500);

const story = [];
const slides = page.locator('[data-story-slide]');
await page.locator('.client-story__carousel').scrollIntoViewIfNeeded();
await page.waitForTimeout(500);
for (let index = 0; index < await slides.count(); index += 1) {
  if (index > 0) await page.locator('[data-story-next]').click();
  await page.waitForTimeout(720);
  const image = page.locator('[data-story-slide][data-slot="0"] [data-story-image]');
  story.push(await image.evaluate(element => ({
    src: element.currentSrc || element.src,
    alt: element.alt,
    complete: element.complete,
    natural: [element.naturalWidth, element.naturalHeight],
    rendered: [Math.round(element.getBoundingClientRect().width), Math.round(element.getBoundingClientRect().height)],
  })));
  await page.locator('.client-story__carousel').screenshot({ path: path.join(outputDir, `story-step-${index + 1}.png`) });
}

await page.locator('[data-story-slide][data-slot="0"] .client-story__phone').hover();
await page.waitForTimeout(360);
await page.locator('.client-story__carousel').screenshot({ path: path.join(outputDir, 'story-hover.png') });

await browser.close();
const result = { story };
await writeFile(path.join(outputDir, 'report.json'), `${JSON.stringify(result, null, 2)}\n`, 'utf8');
console.log(JSON.stringify(result, null, 2));
