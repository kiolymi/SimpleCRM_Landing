import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';

const baseUrl = 'http://127.0.0.1:4173';
const browserPath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const outputDir = path.join(process.cwd(), 'outputs', 'product-screens-audit');
const routes = [
  ['home', '/'],
  ['about', '/about/'],
  ['pricing', '/pricing/'],
  ['learn', '/learn/'],
  ['learn-client-context', '/learn/client-context/'],
  ['learn-follow-up', '/learn/follow-up-after-meeting/'],
  ['how-to', '/how-to/'],
  ['how-to-task', '/how-to/create-follow-up-task/'],
  ['how-to-meeting', '/how-to/prepare-meeting/'],
  ['announcements', '/announcements/'],
  ['announcement-tasks', '/announcements/task-board-release/'],
  ['announcement-history', '/announcements/unified-client-history/'],
  ['faq', '/faq/'],
  ['privacy', '/privacy/'],
  ['releases', '/releases/'],
  ['search', '/search/?q=клиент'],
  ['support', '/support/'],
];
const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844 },
];

await mkdir(outputDir, { recursive: true });
const browser = await chromium.launch({ headless: true, executablePath: browserPath });
const report = { generatedAt: new Date().toISOString(), routes: {} };

for (const viewport of viewports) {
  const context = await browser.newContext({ viewport, deviceScaleFactor: 1 });
  await context.route(/\.(mp4|webm)(\?.*)?$/i, route => route.abort());
  for (const [name, route] of routes) {
    const page = await context.newPage();
    const consoleErrors = [];
    const failedRequests = [];
    const badResponses = [];
    page.on('console', message => {
      if (message.type() === 'error') consoleErrors.push(message.text());
    });
    page.on('requestfailed', request => {
      if (request.resourceType() !== 'media') failedRequests.push({ url: request.url(), error: request.failure()?.errorText || 'unknown' });
    });
    page.on('response', response => {
      if (response.status() >= 400) badResponses.push({ url: response.url(), status: response.status() });
    });
    await page.goto(`${baseUrl}${route}`, { waitUntil: 'domcontentloaded', timeout: 30_000 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.locator('img[loading="lazy"]').evaluateAll(images => images.forEach(image => { image.loading = 'eager'; }));
    await page.evaluate(async () => {
      for (let y = 0; y < document.documentElement.scrollHeight; y += Math.max(500, window.innerHeight * .85)) {
        window.scrollTo(0, y);
        await new Promise(resolve => setTimeout(resolve, 18));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(350);
    const metrics = await page.evaluate(() => {
      const productImages = [...document.images]
        .filter(image => (image.currentSrc || image.src).includes('/assets/product-screens/'))
        .map(image => {
          const rect = image.getBoundingClientRect();
          const style = getComputedStyle(image);
          const parentStyle = image.parentElement ? getComputedStyle(image.parentElement) : null;
          return {
            src: image.currentSrc || image.src,
            alt: image.alt,
            complete: image.complete,
            natural: [image.naturalWidth, image.naturalHeight],
            rendered: [Math.round(rect.width), Math.round(rect.height)],
            objectFit: style.objectFit,
            parentClass: image.parentElement?.className || '',
            parentOverflow: parentStyle?.overflow || '',
          };
        });
      const brokenImages = [...document.images]
        .filter(image => !image.complete || image.naturalWidth === 0)
        .map(image => image.currentSrc || image.src);
      const oldProductImages = [...document.images]
        .map(image => image.currentSrc || image.src)
        .filter(src => src.includes('/simple-crm-landing-screens/') || /practice-refinement\/(r0|p0|b0)/.test(src));
      return {
        title: document.title,
        productImages,
        brokenImages,
        oldProductImages,
        documentWidth: document.documentElement.scrollWidth,
        viewportWidth: document.documentElement.clientWidth,
        horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
      };
    });
    await page.screenshot({ path: path.join(outputDir, `${viewport.name}-${name}.png`), fullPage: true });
    report.routes[`${viewport.name}:${name}`] = { route, consoleErrors, failedRequests, badResponses, ...metrics };
    await page.close();
  }
  await context.close();
}

await browser.close();
await writeFile(path.join(outputDir, 'report.json'), `${JSON.stringify(report, null, 2)}\n`, 'utf8');

const summary = Object.fromEntries(Object.entries(report.routes).map(([key, value]) => [key, {
  productScreens: value.productImages.length,
  broken: value.brokenImages.length,
  old: value.oldProductImages.length,
  consoleErrors: value.consoleErrors.length,
  failedRequests: value.failedRequests.length,
  badResponses: value.badResponses.length,
  horizontalOverflow: value.horizontalOverflow,
}]));
console.log(JSON.stringify(summary, null, 2));
