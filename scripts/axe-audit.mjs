import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';

const browserPath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const axePath = 'C:\\Users\\Irene\\AppData\\Local\\pnpm\\store\\v11\\links\\@\\axe-core\\4.13.0\\b003d7743a536e415a99b5059c99e6b464de93e4c0d5c74195bae27863554641\\node_modules\\axe-core\\axe.min.js';
const output = path.join(process.cwd(), 'outputs', 'landing-redesign', 'after', 'axe.json');
const browser = await chromium.launch({ headless: true, executablePath: browserPath });
const results = {};

for (const viewport of [{ name: 'desktop', width: 1440, height: 900 }, { name: 'mobile', width: 390, height: 844 }]) {
  const context = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height } });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.addScriptTag({ path: axePath });
  results[viewport.name] = await page.evaluate(async () => {
    const report = await window.axe.run(document, {
      runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] },
      resultTypes: ['violations', 'incomplete', 'passes'],
    });
    return {
      url: report.url,
      violations: report.violations,
      incomplete: report.incomplete,
      passCount: report.passes.length,
    };
  });
  await context.close();
}

await browser.close();
await writeFile(output, `${JSON.stringify(results, null, 2)}\n`, 'utf8');
console.log(JSON.stringify({ output, desktopViolations: results.desktop.violations.length, mobileViolations: results.mobile.violations.length }, null, 2));
