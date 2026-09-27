import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { chromium } from 'playwright';

const phase = process.argv[2] || 'current';
const root = process.cwd();
const outputDir = path.join(root, 'outputs', 'landing-redesign', phase);
const browserPath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const url = 'http://127.0.0.1:4173/';
const viewports = [
  { name: '1440x900', width: 1440, height: 900 },
  { name: '1024x768', width: 1024, height: 768 },
  { name: '768x1024', width: 768, height: 1024 },
  { name: '390x844', width: 390, height: 844 },
  { name: '360x800', width: 360, height: 800 },
];

await mkdir(outputDir, { recursive: true });
const browser = await chromium.launch({ headless: true, executablePath: browserPath });
const report = { phase, url, generatedAt: new Date().toISOString(), viewports: {}, zoom200: null };

async function auditPage(page) {
  return page.evaluate(() => {
    const viewportWidth = document.documentElement.clientWidth;
    const clippedText = [...document.querySelectorAll('h1,h2,h3,p,span,a,button,small,dt,dd')]
      .filter(element => {
        const style = getComputedStyle(element);
        if (style.display === 'none' || style.visibility === 'hidden') return false;
        return element.scrollWidth > element.clientWidth + 1 || element.scrollHeight > element.clientHeight + 1;
      })
      .slice(0, 30)
      .map(element => ({
        tag: element.tagName.toLowerCase(),
        className: element.className || '',
        text: (element.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 120),
        client: [element.clientWidth, element.clientHeight],
        scroll: [element.scrollWidth, element.scrollHeight],
      }));
    const outsideViewport = [...document.querySelectorAll('main *')]
      .filter(element => {
        const rect = element.getBoundingClientRect();
        const style = getComputedStyle(element);
        if (style.display === 'none' || style.visibility === 'hidden' || rect.width === 0) return false;
        return rect.left < -1 || rect.right > viewportWidth + 1;
      })
      .slice(0, 30)
      .map(element => ({
        tag: element.tagName.toLowerCase(),
        className: element.className || '',
        left: Math.round(element.getBoundingClientRect().left),
        right: Math.round(element.getBoundingClientRect().right),
      }));
    const images = [...document.images].map(image => ({
      src: image.currentSrc || image.src,
      alt: image.alt,
      complete: image.complete,
      natural: [image.naturalWidth, image.naturalHeight],
      rendered: [Math.round(image.getBoundingClientRect().width), Math.round(image.getBoundingClientRect().height)],
      objectFit: getComputedStyle(image).objectFit,
    }));
    const smallTargets = [...document.querySelectorAll('a,button,input,summary')]
      .filter(element => {
        const rect = element.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0 && (rect.width < 44 || rect.height < 44);
      })
      .slice(0, 30)
      .map(element => ({
        tag: element.tagName.toLowerCase(),
        className: element.className || '',
        text: (element.textContent || element.getAttribute('aria-label') || '').trim().replace(/\s+/g, ' ').slice(0, 100),
        size: [Math.round(element.getBoundingClientRect().width), Math.round(element.getBoundingClientRect().height)],
      }));
    const headings = [...document.querySelectorAll('h1,h2,h3')].map(element => ({
      tag: element.tagName.toLowerCase(),
      text: element.textContent.trim().replace(/\s+/g, ' '),
      lines: Math.round(element.getBoundingClientRect().height / parseFloat(getComputedStyle(element).lineHeight)),
    }));
    return {
      viewport: [viewportWidth, window.innerHeight],
      documentWidth: document.documentElement.scrollWidth,
      documentHeight: document.documentElement.scrollHeight,
      horizontalOverflow: document.documentElement.scrollWidth > viewportWidth + 1,
      clippedText,
      outsideViewport,
      images,
      smallTargets,
      headings,
      sectionHeights: [...document.querySelectorAll('main > section')].map(section => ({
        className: section.className,
        height: Math.round(section.getBoundingClientRect().height),
      })),
    };
  });
}

async function settleFullPage(page) {
  await page.locator('img[loading="lazy"]').evaluateAll(images => images.forEach(image => { image.loading = 'eager'; }));
  await page.evaluate(async () => {
    for (let y = 0; y < document.documentElement.scrollHeight; y += Math.max(360, window.innerHeight * .75)) {
      window.scrollTo(0, y);
      await new Promise(resolve => setTimeout(resolve, 30));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(250);
}

for (const viewport of viewports) {
  const context = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height }, deviceScaleFactor: 1 });
  await context.route(/\.(mp4|webm)(\?.*)?$/i, route => route.abort());
  const page = await context.newPage();
  const consoleErrors = [];
  const failedRequests = [];
  page.on('console', message => {
    if (message.type() === 'error') consoleErrors.push(message.text());
  });
  page.on('requestfailed', request => failedRequests.push({ url: request.url(), error: request.failure()?.errorText || 'unknown' }));
  await page.goto(url, { waitUntil: 'domcontentloaded' });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await settleFullPage(page);
  await page.screenshot({ path: path.join(outputDir, `${viewport.name}.png`), fullPage: true });
  const functional = {};
  if (await page.locator('[data-story-slide]').count()) {
    const before = await page.locator('[data-story-slide][data-slot="0"] [data-story-image]').getAttribute('src');
    await page.locator('[data-story-next]').click();
    await page.waitForTimeout(220);
    const after = await page.locator('[data-story-slide][data-slot="0"] [data-story-image]').getAttribute('src');
    functional.storyCarousel = {
      slideCount: await page.locator('[data-story-slide]').count(),
      visibleCount: await page.locator('[data-story-slide][aria-hidden="false"]').count(),
      switched: before !== after,
      activeImage: await page.locator('[data-story-slide][data-slot="0"] [data-story-image]').getAttribute('src'),
    };
  }
  if (['1440x900', '390x844'].includes(viewport.name)) {
    await page.addStyleTag({ content: '.skip-link { transform: translateY(-180%) !important; }' });
    const sections = [
      ['recognition', '#recognition'],
      ['scenario', '.client-story'],
      ['product', '.product-proof'],
      ['trust', '.story-trust'],
      ['reviews', '.story-reviews'],
      ['cta', '.story-start'],
    ];
    for (const [name, selector] of sections) {
      await page.locator(selector).screenshot({ path: path.join(outputDir, `section-${name}-${viewport.name}.png`) });
    }
  }
  report.viewports[viewport.name] = { ...(await auditPage(page)), consoleErrors, failedRequests, functional };
  await context.close();
}

{
  const context = await browser.newContext({ viewport: { width: 720, height: 450 }, deviceScaleFactor: 2 });
  await context.route(/\.(mp4|webm)(\?.*)?$/i, route => route.abort());
  const page = await context.newPage();
  await page.goto(url, { waitUntil: 'domcontentloaded' });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await settleFullPage(page);
  await page.screenshot({ path: path.join(outputDir, 'zoom-200.png'), fullPage: true });
  report.zoom200 = { method: '720x450 CSS viewport at deviceScaleFactor 2, equivalent to a 1440x900 display at 200% browser scale', ...(await auditPage(page)) };
  await context.close();
}

await browser.close();
await writeFile(path.join(outputDir, 'audit.json'), `${JSON.stringify(report, null, 2)}\n`, 'utf8');
console.log(JSON.stringify({ outputDir, viewports: Object.keys(report.viewports), zoom200: Boolean(report.zoom200) }, null, 2));
