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
await page.goto('http://127.0.0.1:4173/', { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(500);

const story = [];
const buttons = page.locator('[data-story-step]');
for (let index = 0; index < await buttons.count(); index += 1) {
  await buttons.nth(index).click();
  await page.waitForTimeout(650);
  const image = page.locator('[data-story-image]');
  story.push(await image.evaluate(element => ({
    src: element.currentSrc || element.src,
    alt: element.alt,
    complete: element.complete,
    natural: [element.naturalWidth, element.naturalHeight],
    rendered: [Math.round(element.getBoundingClientRect().width), Math.round(element.getBoundingClientRect().height)],
  })));
  await page.locator('.client-story__stage').screenshot({ path: path.join(outputDir, `story-step-${index + 1}.png`) });
}

await page.locator('.product-proof__fan').hover();
await page.waitForTimeout(350);
const fan = await page.locator('.product-proof__fan').evaluate(element => ({
  box: (() => { const rect = element.getBoundingClientRect(); return [Math.round(rect.left), Math.round(rect.top), Math.round(rect.right), Math.round(rect.bottom)]; })(),
  overflow: getComputedStyle(element).overflow,
  screens: [...element.querySelectorAll('img')].map(image => {
    const rect = image.getBoundingClientRect();
    return {
      src: image.currentSrc || image.src,
      complete: image.complete,
      natural: [image.naturalWidth, image.naturalHeight],
      box: [Math.round(rect.left), Math.round(rect.top), Math.round(rect.right), Math.round(rect.bottom)],
    };
  }),
}));
await page.locator('.product-proof').screenshot({ path: path.join(outputDir, 'product-fan-hover.png') });

await browser.close();
const result = { story, fan };
await writeFile(path.join(outputDir, 'report.json'), `${JSON.stringify(result, null, 2)}\n`, 'utf8');
console.log(JSON.stringify(result, null, 2));
