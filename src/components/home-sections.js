import { createArticleCard } from './article-card.js?v=20260824-28';
import { iconSvg } from './icons.js?v=20260824-28';
import { createProductDeviceMockup } from './product-device-mockup.js';
import { homeContent } from '../data/home.js?v=20260824-30';

export function createHomePage() {
  const fragment = document.createDocumentFragment();
  fragment.append(
    createHero(homeContent.hero),
    createFeatureGrid(homeContent.features),
    createTrustSection(homeContent.trust),
    createTestimonials(homeContent.testimonials),
    createProductPanorama(homeContent.panorama),
    createArticles(homeContent.articles),
    createDemoForm(homeContent.demo),
  );
  return fragment;
}

function createHero(hero) {
  const section = document.createElement('section');
  section.className = 'home-hero';
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
        <p class="home-hero__kicker"><span></span>CRM для тех, кто работает с людьми</p>
        <h1 id="page-title">${title}</h1>
        <p class="home-hero__lead">${escapeHtml(hero.lead)}</p>
        <a class="app-store-badge" href="https://apps.apple.com/" target="_blank" rel="noopener noreferrer" aria-label="Скачать Simple CRM с App Store">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15.4 3.2c-.9.1-2 .7-2.6 1.4-.6.7-1.1 1.8-.9 2.8 1 .1 2-.5 2.6-1.2.6-.8 1-1.8.9-3Zm3.4 9.1c0-2.5 2-3.7 2.1-3.8-1.1-1.7-2.9-1.9-3.6-1.9-1.5-.2-3 .9-3.8.9-.8 0-2-.9-3.3-.9-1.7 0-3.3 1-4.2 2.6-1.8 3.1-.5 7.7 1.3 10.2.9 1.2 1.9 2.6 3.3 2.6 1.3-.1 1.8-.8 3.4-.8s2 .8 3.4.8c1.4 0 2.3-1.3 3.1-2.5 1.1-1.6 1.6-3.2 1.6-3.3-.1 0-3.1-1.2-3.1-4.7Z" /></svg>
          <span><small>Скачайте с</small><strong>App Store</strong></span>
        </a>
      </div>
      <div class="home-hero__visual" data-reveal="slide-right" data-delay="120">
        <div class="hero-device-aura" aria-hidden="true"><span></span><span></span></div>
      </div>
    </div>`;
  const mockup = createProductDeviceMockup({ mode: hero.mockup.image ? 'image' : 'demo', ...hero.mockup });
  mockup.classList.add('hero-device', 'hero-device--main');
  mockup.dataset.parallax = '0.025';
  section.querySelector('.home-hero__visual').append(mockup);
  return section;
}

function createFeatureGrid(features) {
  const section = document.createElement('section');
  section.id = 'features';
  section.className = 'section home-features';
  section.setAttribute('aria-labelledby', 'features-title');
  section.innerHTML = `<div class="container"><div class="section-heading section-heading--center" data-reveal><h2 id="features-title">Вся история клиента — в одном месте</h2><p>От первого сообщения до оплаты: встречи, задачи и документы остаются в единой рабочей истории.</p></div><div class="feature-grid"></div></div>`;
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

function createWorkflow(workflow) {
  const section = document.createElement('section');
  section.id = 'workflow';
  section.className = 'section workflow-section';
  section.setAttribute('aria-labelledby', 'workflow-title');
  section.innerHTML = `
    <div class="container">
      <div class="section-heading" data-reveal><h2 id="workflow-title">${escapeHtml(workflow.title)}</h2><p>${escapeHtml(workflow.copy)}</p></div>
      <div class="workflow" data-reveal="scale">
        <div class="workflow__steps" role="tablist" aria-label="Этапы работы с клиентом">
          ${workflow.steps.map((step, index) => `<button class="workflow-step${index === 0 ? ' is-active' : ''}" type="button" role="tab" aria-selected="${index === 0}" data-workflow-step="${escapeAttribute(step.id)}" data-title="${escapeAttribute(step.title)}" data-copy="${escapeAttribute(step.copy)}" data-screen="${escapeAttribute(step.screen)}" data-image-src="${escapeAttribute(step.image.src)}" data-image-alt="${escapeAttribute(step.image.alt)}"><span>0${index + 1}</span><strong>${escapeHtml(step.label)}</strong><small>${escapeHtml(step.title)}</small></button>`).join('')}
        </div>
        <div class="workflow__stage">
          <div class="workflow__copy"><p class="workflow__label">Сценарий клиента</p><h3 data-workflow-title>${escapeHtml(workflow.steps[0].title)}</h3><p data-workflow-copy>${escapeHtml(workflow.steps[0].copy)}</p><div class="workflow__progress"><span></span></div></div>
          <div class="workflow__visual" data-workflow-visual></div>
        </div>
      </div>
    </div>`;
  section.querySelector('[data-workflow-visual]').append(createProductDeviceMockup({ mode: 'image', device: 'phone', label: workflow.steps[0].label, screen: workflow.steps[0].screen, image: workflow.steps[0].image }));
  return section;
}

function createTrustSection(trust) {
  const section = document.createElement('section');
  section.className = 'section section--subtle trust-section';
  section.setAttribute('aria-labelledby', 'trust-title');
  section.innerHTML = `<div class="container trust-section__grid"><div class="trust-section__visual" data-reveal="slide-left"></div><div class="trust-section__copy" data-reveal="slide-right" data-delay="110"><h2 id="trust-title">${escapeHtml(trust.title)}</h2><p>${escapeHtml(trust.copy)}</p><ul class="trust-benefits">${trust.benefits.map(item => `<li>${iconSvg('check')}<span>${escapeHtml(item)}</span></li>`).join('')}</ul><a class="text-link" href="${escapeAttribute(trust.cta.href)}">${escapeHtml(trust.cta.label)} ${iconSvg('arrow-right')}</a></div></div>`;
  const mockup = createProductDeviceMockup({ mode: trust.mockup.image ? 'image' : 'demo', ...trust.mockup });
  mockup.dataset.parallax = '0.018';
  section.querySelector('.trust-section__visual').append(mockup);
  return section;
}

function createTestimonials(testimonials) {
  const section = document.createElement('section');
  section.className = 'section testimonials-section';
  section.setAttribute('aria-labelledby', 'testimonials-title');
  const cards = testimonials.map((item, index) => `
    <article class="testimonial-card${item.featured ? ' testimonial-card--featured' : ''}" data-reveal="scale" data-delay="${(index % 3) * 90}">
      <div class="testimonial-card__meta"><span class="testimonial-card__stars" aria-label="Оценка: пять из пяти">${Array.from({ length: 5 }, () => iconSvg('star')).join('')}</span><span>${escapeHtml(item.source)}</span></div>
      <p class="testimonial-card__quote">«${escapeHtml(item.quote)}»</p>
      <footer><span class="testimonial-card__avatar" aria-hidden="true">${escapeHtml(item.name.slice(0, 1))}</span><span><strong>${escapeHtml(item.name)}</strong><small>${escapeHtml(item.role)}</small></span></footer>
    </article>`).join('');
  section.innerHTML = `<div class="container"><div class="section-heading section-heading--center" data-reveal><p class="eyebrow">Отзывы команд</p><h2 id="testimonials-title"><span class="text-nowrap">Simple CRM</span><br />помогает не терять<br /><span class="text-nowrap">продолжение разговора</span></h2><p>Вся история остаётся рядом — поэтому менеджеры быстрее готовятся к встречам и реже теряют договорённости.</p></div><div class="testimonials-grid">${cards}</div></div>`;
  return section;
}

function createProductPanorama(panorama) {
  const section = document.createElement('section');
  section.className = 'section product-panorama';
  section.setAttribute('aria-labelledby', 'panorama-title');
  section.innerHTML = `<div class="container"><div class="section-heading section-heading--center" data-reveal><p class="eyebrow">Рабочее пространство</p><h2 id="panorama-title">${escapeHtml(panorama.title)}</h2><p>${escapeHtml(panorama.copy)}</p></div><div class="product-panorama__screens"></div><dl class="product-panorama__benefits">${panorama.benefits.map(item => `<div><dt>${escapeHtml(item.title)}</dt><dd>${escapeHtml(item.copy)}</dd></div>`).join('')}</dl></div>`;
  const screens = section.querySelector('.product-panorama__screens');
  panorama.mockups.forEach((item, index) => {
    const mockup = createProductDeviceMockup({ mode: 'image', ...item });
    mockup.dataset.reveal = 'device';
    mockup.dataset.delay = String(index * 90);
    mockup.dataset.parallax = String(index === 1 ? 0.014 : -0.01);
    screens.append(mockup);
  });
  return section;
}

function createUseCases(useCases) {
  const section = document.createElement('section');
  section.className = 'section use-cases-section';
  section.setAttribute('aria-labelledby', 'use-cases-title');
  section.innerHTML = `<div class="container"><div class="section-heading" data-reveal><h2 id="use-cases-title">Каждому в команде видно, что делать дальше</h2><p>Менеджер продолжает разговор, сервис сохраняет контекст, руководитель видит места, где нужна помощь.</p></div><div class="use-case-grid"></div></div>`;
  const grid = section.querySelector('.use-case-grid');
  useCases.forEach((item, index) => {
    const card = document.createElement('article');
    card.className = 'use-case-card';
    card.dataset.reveal = 'scale';
    card.dataset.delay = String(index * 80);
    card.innerHTML = `<p class="use-case-card__role">${escapeHtml(item.eyebrow)}</p><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.copy)}</p><div class="use-case-card__outcome">${iconSvg('check')}<span>${escapeHtml(item.outcome)}</span></div>`;
    grid.append(card);
  });
  return section;
}

function createPricing(pricing) {
  const section = document.createElement('section');
  section.id = 'pricing';
  section.className = 'section home-pricing';
  section.setAttribute('aria-labelledby', 'home-pricing-title');
  section.innerHTML = `<div class="container"><div class="pricing-heading"><div class="section-heading" data-reveal><h2 id="home-pricing-title">${escapeHtml(pricing.title)}</h2><p>${escapeHtml(pricing.copy)}</p></div><div class="billing-toggle" role="group" aria-label="Период оплаты" data-billing-toggle><button class="is-active" type="button" data-period="monthly">Ежемесячно</button><button type="button" data-period="yearly">За год <span>−20%</span></button></div></div><div class="home-pricing-grid"></div><p class="pricing-footnote">Цены указаны за месяц. НДС включён. Отменить подписку можно в любой момент.</p></div>`;
  const grid = section.querySelector('.home-pricing-grid');
  pricing.plans.forEach((plan, index) => {
    const card = document.createElement('article');
    card.className = `home-price-card${plan.featured ? ' home-price-card--featured' : ''}`;
    card.dataset.reveal = 'scale';
    card.dataset.delay = String(index * 80);
    card.innerHTML = `${plan.badge ? `<p class="home-price-card__badge">${escapeHtml(plan.badge)}</p>` : ''}<p class="home-price-card__name">${escapeHtml(plan.name)}</p><h3><span data-price data-monthly="${plan.monthly}" data-yearly="${plan.yearly}">${formatPrice(plan.monthly)}</span> ₽<small>/мес.</small></h3><p class="home-price-card__description">${escapeHtml(plan.description)}</p><p class="home-price-card__users">${escapeHtml(plan.users)}</p><ul>${plan.features.map(item => `<li>${iconSvg('check')}${escapeHtml(item)}</li>`).join('')}</ul><a class="button ${plan.featured ? 'button--primary' : 'button--outline'}" href="#demo">Начать бесплатно</a>`;
    grid.append(card);
  });
  return section;
}

function createArticles(articles) {
  const section = document.createElement('section');
  section.id = 'materials';
  section.className = 'section home-articles';
  section.setAttribute('aria-labelledby', 'articles-title');
  section.innerHTML = `<div class="container"><div class="section-heading section-heading--center" data-reveal><p class="eyebrow">Материалы</p><h2 id="articles-title">Практика работы с клиентами</h2><p>Как подготовить встречу, зафиксировать договорённость и не потерять <span class="text-nowrap">продолжение разговора</span>.</p></div><div class="article-grid"></div><p class="home-articles__more"><a class="button button--outline" href="/SimpleCRM_Landing/learn/">Все материалы ${iconSvg('arrow-right')}</a></p></div>`;
  const grid = section.querySelector('.article-grid');
  articles.forEach(article => { const card = createArticleCard(article); card.dataset.reveal = 'scale'; grid.append(card); });
  return section;
}

function createDemoForm(demo) {
  const section = document.createElement('section');
  section.id = 'demo';
  section.className = 'section demo-section';
  section.setAttribute('aria-labelledby', 'demo-title');
  section.innerHTML = `
    <div class="container demo-section__grid">
      <div class="demo-section__copy" data-reveal="slide-left"><h2 id="demo-title">${escapeHtml(demo.title)}</h2><p>${escapeHtml(demo.copy)}</p><ul><li>${iconSvg('check')}Демонстрация на примере ваших процессов</li><li>${iconSvg('check')}Ответы на вопросы команды</li><li>${iconSvg('check')}Помощь с первым запуском</li></ul></div>
      <form class="demo-form" data-demo-form data-reveal="slide-right" novalidate>
        <div class="demo-form__fields">
          <div class="form-row"><label>Ваше имя<input name="name" type="text" autocomplete="name" placeholder="Анна Петрова" required /></label><label>Рабочая почта<input name="email" type="email" autocomplete="email" placeholder="anna@company.ru" required /></label></div>
          <label>Компания<input name="company" type="text" autocomplete="organization" placeholder="Название компании" required /></label>
          <label>Размер команды<select name="team" required><option value="">Выберите размер</option><option>1–5 человек</option><option>6–15 человек</option><option>16–50 человек</option><option>Больше 50 человек</option></select></label>
          <label>Что хотите улучшить <span class="field-optional">необязательно</span><textarea name="goal" rows="3" placeholder="Например: не терять договорённости после встреч"></textarea></label>
          <label class="form-consent"><input name="consent" type="checkbox" required /><span>Согласен на обработку данных и получение ответа по заявке</span></label>
          <button class="button button--primary button--large" type="submit">Записаться на демонстрацию ${iconSvg('arrow-right')}</button>
          <p class="form-status" data-form-status aria-live="polite"></p>
        </div>
        <div class="demo-form__success" role="status" aria-hidden="true"><span class="demo-form__success-icon">${iconSvg('check')}</span><h3>Заявка отправлена</h3><p>Спасибо! Мы напишем на указанную почту в течение рабочего дня и согласуем удобное время.</p></div>
      </form>
    </div>`;
  return section;
}

function createFinalCta(finalCta) {
  const section = document.createElement('section');
  section.className = 'section home-final-section';
  section.setAttribute('aria-labelledby', 'final-cta-title');
  section.innerHTML = `<div class="container"><div class="final-cta" data-reveal="scale"><h2 id="final-cta-title">${escapeHtml(finalCta.title)}</h2><p>${escapeHtml(finalCta.copy)}</p><a class="button button--primary button--large" href="${escapeAttribute(finalCta.cta.href)}">${escapeHtml(finalCta.cta.label)} ${iconSvg('arrow-right')}</a><small>${escapeHtml(finalCta.note)}</small></div></div>`;
  return section;
}

function formatPrice(value) { return new Intl.NumberFormat('ru-RU').format(value); }
function escapeHtml(value) { return String(value).replace(/[&<>'"]/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#039;', '"': '&quot;' })[character]); }
function escapeAttribute(value) { return escapeHtml(value); }
