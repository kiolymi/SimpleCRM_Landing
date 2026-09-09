import { createArticleCard } from './article-card.js?v=20260908-84';
import { iconSvg } from './icons.js?v=20260824-28';
import { createProductDeviceMockup } from './product-device-mockup.js?v=20260906-1';
import { homeContent } from '../data/home.js?v=people17';
import { createPracticeStories } from './practice-stories.js?v=explore22';
import { createPracticeAudience } from './practice-audience.js?v=links20';

export function createHomePage() {
  const fragment = document.createDocumentFragment();
  fragment.append(
    createHero(homeContent.hero),
    createPracticeAudience(),
    createPracticeStories(),
    createFeatureGrid(homeContent.features),
    createTrustSection(homeContent.trust),
    createArticles(homeContent.articles),
  );
  return fragment;
}

function createHero(hero) {
  const section = document.createElement('section');
  section.className = 'home-hero home-hero--video';
  section.setAttribute('aria-labelledby', 'page-title');
  const title = escapeHtml(hero.title).replace(' — ', ' —<br />');
  section.innerHTML = `
    <div class="hero-ambient" aria-hidden="true">
      <span class="hero-ambient__orb hero-ambient__orb--one"></span>
      <span class="hero-ambient__orb hero-ambient__orb--two"></span>
      <span class="hero-ambient__beam"></span>
      ${Array.from({ length: 10 }, (_, index) => `<span class="hero-ambient__spark hero-ambient__spark--${index + 1}"></span>`).join('')}
    </div>
    <div class="container home-hero__grid">
      <div class="home-hero__copy" data-reveal="slide-left">
        <p class="home-hero__kicker">Simple CRM · Для частной практики</p>
        <h1 id="page-title">${title}</h1>
        <p class="home-hero__lead">${escapeHtml(hero.lead)}</p>
        <p class="home-hero__intro">${escapeHtml(hero.audience)}</p>
        <a class="app-store-badge" href="https://apps.apple.com/" target="_blank" rel="noopener noreferrer" aria-label="Скачать Simple CRM с App Store">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15.4 3.2c-.9.1-2 .7-2.6 1.4-.6.7-1.1 1.8-.9 2.8 1 .1 2-.5 2.6-1.2.6-.8 1-1.8.9-3Zm3.4 9.1c0-2.5 2-3.7 2.1-3.8-1.1-1.7-2.9-1.9-3.6-1.9-1.5-.2-3 .9-3.8.9-.8 0-2-.9-3.3-.9-1.7 0-3.3 1-4.2 2.6-1.8 3.1-.5 7.7 1.3 10.2.9 1.2 1.9 2.6 3.3 2.6 1.3-.1 1.8-.8 3.4-.8s2 .8 3.4.8c1.4 0 2.3-1.3 3.1-2.5 1.1-1.6 1.6-3.2 1.6-3.3-.1 0-3.1-1.2-3.1-4.7Z" /></svg>
          <span><small>Скачайте с</small><strong>App Store</strong></span>
        </a>
      </div>
      <div class="home-hero__visual" data-reveal="slide-right" data-delay="120">
        <div class="hero-device-aura" aria-hidden="true"><span></span><span></span></div>
      </div>
    </div>`;
  const mockup = createProductDeviceMockup({ mode: hero.mockup.image ? 'image' : 'demo', ...hero.mockup, priority: true });
  mockup.classList.add('hero-device', 'hero-device--main');
  mockup.dataset.parallax = '0.025';
  section.querySelector('.home-hero__visual').append(mockup);
  mockup.classList.add('hero-device--soft-hover');
  const video = document.createElement('video');
  video.className = 'home-hero__background-video';
  video.muted = true;
  video.loop = true;
  video.autoplay = true;
  video.playsInline = true;
  video.setAttribute('aria-hidden', 'true');
  video.poster = new URL('../../video-background/warped-preview-00s.jpg', import.meta.url).href;
  video.preload = 'metadata';
  video.src = new URL('../../video-background/Simple-CRM-Warped-Honeycomb-Light-12s.mp4', import.meta.url).href;
  section.prepend(video);
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const sync = () => {
    const play = !document.hidden && !reduced.matches;
    if (play) video.play().catch(() => {});
    else video.pause();
  };
  reduced.addEventListener('change', sync);
  document.addEventListener('visibilitychange', sync);
  requestAnimationFrame(sync);
  return section;
}

function createFeatureGrid(features) {
  const section = document.createElement('section');
  section.id = 'features';
  section.className = 'section home-features';
  section.setAttribute('aria-labelledby', 'features-title');
  section.innerHTML = `<div class="container"><div class="section-heading section-heading--center" data-reveal><h2 id="features-title">Перед встречей — всё нужное под рукой</h2><p>Не нужно заново листать чаты и сверять заметки. Начните с карточки клиента.</p></div><div class="feature-grid"></div></div>`;
  const grid = section.querySelector('.feature-grid');
  features.forEach((feature, index) => grid.append(createFeatureCard(feature, index)));
  return section;
}

function createFeatureCard(feature, index) {
  const card = document.createElement('article');
  card.className = `feature-card${index === 0 ? ' feature-card--lead' : ''}`;
  card.dataset.reveal = 'device';
  card.dataset.delay = String((index % 3) * 75);
  card.innerHTML = `<div class="feature-card__body"><div class="feature-card__heading">${iconSvg(feature.icon, { className: 'feature-card__symbol' })}<h3>${escapeHtml(feature.title)}</h3></div></div><div class="feature-card__mockup"></div><p class="feature-card__description">${escapeHtml(feature.description)}</p>`;
  const mockup = createProductDeviceMockup({ mode: feature.mockup.image ? 'image' : 'demo', ...feature.mockup });
  mockup.dataset.parallax = String(index % 2 ? 0.012 : -0.012);
  card.querySelector('.feature-card__mockup').append(mockup);
  return card;
}

function createTrustSection(trust) {
  const section = document.createElement('section');
  section.className = 'section section--subtle trust-section';
  section.setAttribute('aria-labelledby', 'trust-title');
  section.innerHTML = `<div class="container trust-section__grid"><div class="trust-section__visual" data-reveal="slide-left"></div><div class="trust-section__copy" data-reveal="slide-right" data-delay="110"><h2 id="trust-title">${escapeHtml(trust.title)}</h2><p>${escapeHtml(trust.copy)}</p><ul class="trust-benefits">${trust.benefits.map(item => `<li>${iconSvg('check')}<span>${escapeHtml(item)}</span></li>`).join('')}</ul><a class="text-link" href="${escapeAttribute(trust.cta.href)}">${escapeHtml(trust.cta.label)} ${iconSvg('arrow-right')}</a></div></div>`;
  const illustration = document.createElement('img');
  illustration.className = 'trust-section__illustration';
  illustration.src = new URL('../../assets/editorial/customer-data-shield.png', import.meta.url).href;
  illustration.alt = 'Синий стеклянный щит защищает карточки клиентов';
  illustration.width = 1024;
  illustration.height = 1536;
  illustration.loading = 'lazy';
  illustration.decoding = 'async';
  section.querySelector('.trust-section__visual').append(illustration);
  return section;
}

function createArticles(articles) {
  const section = document.createElement('section');
  section.id = 'materials';
  section.className = 'section home-articles';
  section.setAttribute('aria-labelledby', 'articles-title');
  section.innerHTML = `<div class="container"><div class="section-heading section-heading--center" data-reveal><h2 id="articles-title">Начните с одной привычки</h2><p>Подготовьте встречу, соберите карточку клиента или назначьте следующий контакт. Короткие инструкции помогут начать.</p></div><div class="article-grid"></div><p class="home-articles__more"><a class="button button--outline" href="/learn/">Все материалы ${iconSvg('arrow-right')}</a></p></div>`;
  const grid = section.querySelector('.article-grid');
  articles.forEach(article => { const card = createArticleCard(article); card.dataset.reveal = 'scale'; grid.append(card); });
  return section;
}

function escapeHtml(value) { return String(value).replace(/[&<>'"]/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#039;', '"': '&quot;' })[character]); }
function escapeAttribute(value) { return escapeHtml(value); }
