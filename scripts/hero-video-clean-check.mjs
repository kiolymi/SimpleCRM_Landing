import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';

const outputDir = path.join(process.cwd(), 'outputs', 'hero-video-clean');
await mkdir(outputDir, { recursive: true });
const browser = await chromium.launch({
  headless: true,
  executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
});
const report = {};

for (const viewport of [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844 },
]) {
  const context = await browser.newContext({ viewport });
  const page = await context.newPage();
  const errors = [];
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  await page.goto('http://127.0.0.1:4173/', { waitUntil: 'domcontentloaded' });
  await page.waitForFunction(() => {
    const video = document.querySelector('.story-hero__video');
    return video && video.readyState >= 2;
  }, { timeout: 30_000 });
  await page.waitForTimeout(900);
  report[viewport.name] = await page.evaluate(() => {
    const video = document.querySelector('.story-hero__video');
    const shade = document.querySelector('.story-hero__shade');
    const prototype = document.querySelector('.story-hero__prototype');
    const visibleText = [...document.querySelectorAll('.story-hero *')]
      .filter(element => {
        const style = getComputedStyle(element);
        const rect = element.getBoundingClientRect();
        return style.display !== 'none' && style.visibility !== 'hidden' && Number(style.opacity) > 0 && rect.width > 1 && rect.height > 1 && element.children.length === 0 && element.textContent.trim();
      })
      .map(element => element.textContent.trim());
    return {
      video: {
        readyState: video.readyState,
        paused: video.paused,
        muted: video.muted,
        opacity: getComputedStyle(video).opacity,
        filter: getComputedStyle(video).filter,
      },
      shadeBackground: shade ? getComputedStyle(shade).backgroundImage : 'removed',
      prototypeBackdropFilter: getComputedStyle(prototype).backdropFilter,
      visibleText,
    };
  });
  report[viewport.name].consoleErrors = errors;
  await page.locator('.story-hero').screenshot({ path: path.join(outputDir, `${viewport.name}.png`) });
  await context.close();
}

await browser.close();
await writeFile(path.join(outputDir, 'report.json'), `${JSON.stringify(report, null, 2)}\n`, 'utf8');
console.log(JSON.stringify(report, null, 2));
