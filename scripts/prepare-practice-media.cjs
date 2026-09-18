/* Mechanical responsive exports only. Never changes source imagery or Figma UI. */
const fs = require('node:fs/promises');
const path = require('node:path');
const crypto = require('node:crypto');
const sharpArgument = process.argv.indexOf('--sharp-module');
if (sharpArgument < 0 || !process.argv[sharpArgument + 1]) throw new Error('Pass --sharp-module with the installed sharp module path.');
const sharp = require(process.argv[sharpArgument + 1]);
const root = path.resolve(__dirname, '..');
const outputRoot = path.join(root, 'assets', 'practice-refinement');
const evidenceRoot = path.join(root, 'docs', 'landing-refinement', 'evidence', '09');
const hash = buffer => crypto.createHash('sha256').update(buffer).digest('hex');
const relative = file => path.relative(root, file).split(path.sep).join('/');
const screens = [
  ['r01-today', 'Следующий контакт: напоминание специалисту написать Елене 18 сентября'],
  ['r02-client', 'Пример карточки Елены: последняя договорённость и следующий контакт'],
  ['r03-message', 'Пример сообщения Елене перед следующей встречей; отправку решает специалист'],
  ['r04a-sent', 'Вымышленный результат отправки сообщения, не подтверждение прочтения'],
  ['p01-meeting', 'Пример встречи: 22 сентября, 15:00, предоплата ещё не получена'],
  ['p02-invoice', 'Пример счёта на предоплату 1 000 рублей к консультации'],
  ['p04-client-prepayment', 'Клиент проверяет пример предоплаты: 1 000 рублей из 3 000, остаток 2 000'],
  ['p05b-prepayment-received', 'В примере предоплата получена: 1 000 рублей, остаток 2 000'],
  ['b01-availability', 'Специалист выбирает часы для записи на консультацию'],
  ['b02-client-time', 'Клиент выбирает время консультации: 22 сентября, Москва, UTC+3'],
  ['b03-client-review', 'Клиент проверяет вымышленную запись перед предоплатой'],
  ['b04-client-confirmed', 'Пример подтверждённой записи на 22 сентября, 15:00–15:50'],
];
const people = [
  ['practice-psychologist', 'Психолог слушает взрослого клиента в кабинете'],
  ['practice-trainer', 'Тренер и клиентка обсуждают занятие в студии'],
  ['practice-mentor', 'Наставница и взрослая ученица работают за столом'],
];
const assets = [];
const sources = [];
async function source(file) {
  const buffer = await fs.readFile(file);
  sources.push({ path: relative(file), sha256: hash(buffer) });
  return buffer;
}
async function save(name, buffer) {
  const file = path.resolve(outputRoot, name);
  if (path.dirname(file) !== outputRoot) throw new Error('Output path escapes asset folder.');
  await fs.writeFile(file, buffer);
  const meta = await sharp(buffer).metadata();
  return { path: relative(file), width: meta.width, height: meta.height, bytes: buffer.length, sha256: hash(buffer), format: meta.format };
}
async function main() {
  await fs.mkdir(outputRoot, { recursive: true });
  await fs.mkdir(evidenceRoot, { recursive: true });
  for (const [id, alt] of screens) {
    const file = path.join(root, 'docs', 'landing-refinement', 'evidence', '08', 'exports', id + '.png');
    const buffer = await source(file);
    const variants = [];
    // The 2x Figma raster compresses better than a downsampled 1x raster:
    // keep only 780px, which is both sharper and smaller for these flat UI assets.
    for (const width of [780]) {
      const output = await sharp(buffer).resize({ width, withoutEnlargement: true }).webp({ lossless: true, effort: 6 }).toBuffer();
      if (width === 780) {
        const a = await sharp(buffer).ensureAlpha().raw().toBuffer();
        const b = await sharp(output).ensureAlpha().raw().toBuffer();
        if (!a.equals(b)) throw new Error('Lossless pixel mismatch: ' + id);
      }
      variants.push(await save(`${id}-${width}.webp`, output));
    }
    const fallback = await save(id + '.png', buffer);
    assets.push({ id, kind: 'figma-screen', source: relative(file), alt, variants, fallback, display: 'contain; never crop UI', pixelEquality780: true });
  }
  for (const [id, alt] of people) {
    const file = path.join(root, 'assets', 'editorial', id + '.jpg');
    const buffer = await source(file);
    const variants = [];
    for (const width of [640, 960]) variants.push(await save(`${id}-${width}.webp`, await sharp(buffer).resize({ width, withoutEnlargement: true }).webp({ quality: 84, effort: 6 }).toBuffer()));
    const meta = await sharp(buffer).metadata();
    assets.push({ id, kind: 'existing-illustrative-photo', source: relative(file), alt, variants, fallback: { path: relative(file), width: meta.width, height: meta.height, bytes: buffer.length, sha256: hash(buffer) }, display: '3:2; no additional crop', provenance: 'Existing AI-generated illustration from original branch; not an actual customer testimonial' });
  }
  const protectedMedia = [];
  for (const name of ['Simple-CRM-Warped-Honeycomb-Light-12s.mp4', 'warped-preview-00s.jpg']) {
    const file = path.join(root, 'video-background', name);
    const buffer = await source(file);
    protectedMedia.push({ path: relative(file), bytes: buffer.length, sha256: hash(buffer) });
  }
  for (const item of sources) if (hash(await fs.readFile(path.join(root, item.path))) !== item.sha256) throw new Error('Source changed: ' + item.path);
  const report = { date: '2026-09-18', operation: 'Responsive encoding only, no image-content edits', sharpVersion: sharp.versions.sharp, settings: { screens: 'lossless WebP780 for mobile and desktop + identical PNG fallback; 390 candidate was larger and rejected', people: 'WebP640/960, quality84, no crop' }, assets, protectedMedia, sourcesUnchanged: true };
  await fs.writeFile(path.join(evidenceRoot, 'media-build.json'), JSON.stringify(report, null, 2) + '\n');
  console.log(JSON.stringify({ assets: assets.length, derivatives: assets.reduce((n, a) => n + a.variants.length + (a.kind === 'figma-screen' ? 1 : 0), 0), sourcesUnchanged: true, webpBytes: assets.reduce((n, a) => n + a.variants.reduce((m, v) => m + v.bytes, 0), 0) }));
}
main().catch(error => { console.error(error.message); process.exitCode = 1; });
