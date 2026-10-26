import { chromium } from 'playwright';
import { mkdtemp, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import assert from 'node:assert/strict';

const output = await mkdtemp(path.join(os.tmpdir(), 'simplecrm-client-value-'));
const base = process.argv[2] || 'http://127.0.0.1:4173';
const routes = ['/', '/about/', '/pricing/', '/faq/', '/learn/', '/how-to/', '/announcements/', '/support/', '/privacy/', '/search/?q=не%20оплатил', '/learn/client-context/', '/learn/follow-up-after-meeting/', '/how-to/prepare-meeting/', '/how-to/create-follow-up-task/', '/how-to/payment-reminders/', '/how-to/client-reminders/', '/announcements/unified-client-history/', '/announcements/task-board-release/'];
const browser = await chromium.launch({headless: true, executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'});
const report = {pages: [], errors: [], failedLinks: [], interactions: []};
const links = new Set();
try {
  for (const width of [1440, 390, 1280, 1024, 768, 320]) {
    const page = await browser.newPage({viewport: {width, height: 900}, reducedMotion: 'reduce'});
    page.on('pageerror', error => report.errors.push(error.message));
    for (const route of [1440, 390].includes(width) ? routes : ['/']) {
      const response = await page.goto(base + route);
      assert.equal(response.status(), 200, route);
      await page.locator('main h1').waitFor();
      await page.evaluate(() => document.fonts.ready);
      await page.evaluate(async () => {
        for (const img of document.querySelectorAll('main img')) img.loading = 'eager';
        await Promise.all([...document.querySelectorAll('main img')].map(img => img.decode().catch(() => {})));
      });
      const result = await page.evaluate(() => {
        const width = document.documentElement.clientWidth;
        const textOverflow = [...document.querySelectorAll('main h1, main h2, main h3, main p, main button')].filter(el => {
          const rect = el.getBoundingClientRect();
          const style = getComputedStyle(el);
          if (!rect.width || el.closest('[hidden], [aria-hidden="true"], .client-story__slide, .story-trust__card, .story-review, .article-card[hidden]')) return false;
          let inHorizontalScroller = false;
          for (let parent = el.parentElement; parent; parent = parent.parentElement) {
            if (['auto', 'scroll'].includes(getComputedStyle(parent).overflowX) && parent.scrollWidth > parent.clientWidth) inHorizontalScroller = true;
          }
          return style.display !== 'none' && ((!inHorizontalScroller && (rect.right > width + 2 || rect.left < -2)) || el.scrollWidth > el.clientWidth + 2);
        }).map(el => ({text: el.textContent.trim().slice(0, 90), class: el.className}));
        return {h1: document.querySelector('main h1').textContent, width, pageWidth: document.documentElement.scrollWidth, textOverflow, links: [...document.querySelectorAll('a[href]')].map(el => el.href).filter(href => href.startsWith(location.origin))};
      });
      for (const link of result.links) links.add(link.split('#')[0]);
      delete result.links;
      report.pages.push({route, width, ...result});
      if (['/', '/about/', '/pricing/', '/learn/', '/faq/', '/how-to/payment-reminders/'].includes(route)) {
        await page.screenshot({path: path.join(output, `${width}-${route.replace(/[^a-z]/g, '') || 'home'}.png`)});
      }
      if (route === '/' && width === 1440) {
        for (const id of ['recognition', 'payments-and-growth', 'work-without-routine', 'start']) {
          await page.locator('#' + id).screenshot({path: path.join(output, `${width}-${id}.png`)});
        }
      }
    }
    await page.close();
  }
  const page = await browser.newPage({reducedMotion:'reduce'});
  for (const query of ['не оплатил', 'напомнить', 'повторная запись', 'клиент не отвечает']) {
    await page.goto(base + '/learn/?q=' + encodeURIComponent(query));
    const catalog = await page.locator('.materials-grid .article-card:not([hidden]) h3').allTextContents();
    await page.goto(base + '/search/?q=' + encodeURIComponent(query));
    const search = await page.locator('.article-grid h3').allTextContents();
    assert.ok(catalog.length > 0, query);
    assert.deepEqual(catalog, search, query);
    report.interactions.push({query, results:catalog.length});
  }
  await page.goto(base + '/learn/');
  await page.getByRole('button', {name:'Инструкции', exact:true}).click();
  assert.equal(await page.locator('.materials-grid .article-card:not([hidden])').count(), 4);
  await page.goto(base + '/support/');
  const requests = [];
  page.on('request', request => requests.push(request.url()));
  await page.getByRole('button', {name:'Отправить сообщение'}).click();
  assert.ok(await page.locator('[aria-invalid="true"]').count());
  await page.locator('[name="email"]').fill('qa@example.com');
  await page.locator('[name="topic"]').selectOption({label:'Напоминания в Telegram, MAX и SMS'});
  await page.locator('[name="message"]').fill('Проверка локальной формы');
  requests.length = 0;
  await page.getByRole('button', {name:'Отправить сообщение'}).click();
  assert.equal(await page.locator('[data-form-status]').textContent(), 'Данные заполнены корректно.');
  assert.equal(page.url(), base + '/support/');
  assert.equal(requests.length, 0);
  report.interactions.push({support:'validation only; no transmission'});
  for (const url of links) {
    const response = await page.request.get(url);
    if (response.status() !== 200) report.failedLinks.push({url, status:response.status()});
  }
  await page.close();
} finally {
  await browser.close();
  await writeFile(path.join(output, 'report.json'), JSON.stringify(report, null, 2));
  console.log(JSON.stringify({output, pages:report.pages.length, errors:report.errors, failedLinks:report.failedLinks, overflows:report.pages.filter(p=>p.textOverflow.length || p.pageWidth>p.width+2), interactions:report.interactions}, null, 2));
}
assert.equal(report.errors.length, 0);
assert.equal(report.failedLinks.length, 0);
assert.equal(report.pages.filter(page => page.textOverflow.length || page.pageWidth > page.width + 2).length, 0, 'Text must fit its layout');
