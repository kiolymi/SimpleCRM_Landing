import { createSiteShell } from './components/site-shell.js?v=20260824-28';
import { createHomePage } from './components/home-sections.js?v=20260824-31';
import { createAboutPage, createArticleLayout, createContentHubPage, createFaqPage, createPricingPage, createPrivacyPage, createReleasesPage, createSearchPage, createSupportPage } from './components/content-pages.js?v=20260824-31';
import { pageMeta } from './data/site.js?v=20260824-28';
import { createProductDeviceMockup } from './components/product-device-mockup.js';

const pageKey = document.body.dataset.page || 'home';
const page = pageMeta[pageKey] || pageMeta.home;
document.documentElement.classList.add('has-js');
document.documentElement.classList.remove('is-navigating');

if (pageMeta[pageKey]) {
  document.title = pageKey === 'home' ? 'Simple CRM' : `${page.title} — Simple CRM`;
}

const main = document.createElement('main');
main.id = 'main-content';
main.className = 'site-main';
main.tabIndex = -1;
if (pageKey === 'home') {
  main.append(createHomePage());
} else if (['learn', 'how-to', 'announcements'].includes(pageKey)) {
  main.append(createContentHubPage(pageKey));
} else if (pageKey === 'article') {
  main.append(createArticleLayout(document.body.dataset.articleSlug));
} else if (pageKey === 'search') {
  main.append(createSearchPage(new URLSearchParams(window.location.search)));
} else if (pageKey === 'pricing') {
  main.append(createPricingPage());
} else if (pageKey === 'faq') {
  main.append(createFaqPage());
} else if (pageKey === 'about') {
  main.append(createAboutPage());
} else if (pageKey === 'support') {
  main.append(createSupportPage());
} else if (pageKey === 'privacy') {
  main.append(createPrivacyPage());
} else if (pageKey === 'releases') {
  main.append(createReleasesPage());
} else {
  main.append(createShellIntro(page));
}

const app = document.querySelector('#app');
app.append(createSiteShell(main));
protectProductName(app);
markCurrentNavigation(app);
wireScrollReveals(app);
wireScrollMotion(app);
wireInteractiveComponents(app);
wireScrollProgress();
wireSectionNavigation(app);
wireStablePageNavigation(app);

requestAnimationFrame(() => {
  document.documentElement.classList.add('is-page-ready');
});

function protectProductName(root) {
  [root, ...root.querySelectorAll('*')].forEach(element => {
    [...element.childNodes].forEach(node => {
      if (node.nodeType === 3 && node.nodeValue.includes('Simple CRM')) {
        node.nodeValue = node.nodeValue.replaceAll('Simple CRM', 'Simple\u00a0CRM');
      }
    });
  });
}

function markCurrentNavigation(root) {
  const currentPath = normalizePath(window.location.pathname);
  root.querySelectorAll('a[href]').forEach(link => {
    const target = new URL(link.href, window.location.origin);
    if (target.origin !== window.location.origin) return;
    if (target.hash) return;
    const targetPath = normalizePath(target.pathname);
    const isActive = targetPath === '/' ? currentPath === '/' : currentPath === targetPath || currentPath.startsWith(`${targetPath}/`);
    if (!isActive) return;
    link.classList.add('is-current');
    link.setAttribute('aria-current', 'page');
  });
  root.querySelectorAll('.resource-menu').forEach(menu => {
    menu.querySelector('.desktop-nav__trigger')?.classList.toggle('is-current', Boolean(menu.querySelector('a.is-current')));
  });
}

function normalizePath(path) {
  return path === '/' ? path : path.replace(/\/+$/, '');
}

function wireScrollReveals(root) {
  const elements = [...root.querySelectorAll('[data-reveal]')];
  if (!elements.length) return;

  if (!('IntersectionObserver' in window)) {
    elements.forEach(element => element.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      currentObserver.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -9% 0px', threshold: 0.08 });

  elements.forEach((element, index) => {
    const explicitDelay = Number(element.dataset.delay);
    const delay = Number.isFinite(explicitDelay) ? explicitDelay : Math.min(index % 3, 2) * 70;
    element.style.transitionDelay = `${delay}ms`;
    element.style.setProperty('--reveal-delay', `${delay}ms`);
    observer.observe(element);
  });
}

function wireStablePageNavigation(root) {
  let navigationLocked = false;
  let navigationTimer = 0;

  const resetNavigationState = () => {
    navigationLocked = false;
    window.clearTimeout(navigationTimer);
    document.documentElement.classList.remove('is-navigating');
    document.documentElement.classList.add('is-page-ready');
    root.removeAttribute('aria-busy');
  };

  window.addEventListener('pageshow', resetNavigationState);
  window.addEventListener('pagehide', () => window.clearTimeout(navigationTimer));

  root.addEventListener('click', event => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const link = event.target.closest('a[href]');
    if (!link || link.hasAttribute('download') || (link.target && link.target !== '_self')) return;

    const target = new URL(link.href, window.location.href);
    if (!['http:', 'https:'].includes(target.protocol) || target.origin !== window.location.origin) return;

    const current = new URL(window.location.href);
    const isSameDocument = target.pathname === current.pathname && target.search === current.search;
    if (isSameDocument) return;

    event.preventDefault();
    if (navigationLocked) return;

    navigationLocked = true;
    root.setAttribute('aria-busy', 'true');
    document.documentElement.classList.add('is-navigating');
    document.documentElement.classList.remove('is-page-ready');

    navigationTimer = window.setTimeout(() => {
      window.location.assign(target.href);
    }, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 120);
  }, { capture: true });
}

function wireScrollMotion(root) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const elements = [...root.querySelectorAll('[data-parallax]')];
  const header = root.querySelector('.site-header');
  if (!elements.length && !header) return;

  let framePending = false;
  const update = () => {
    framePending = false;
    const viewportMiddle = window.innerHeight / 2;
    elements.forEach(element => {
      if (window.innerWidth < 768) {
        element.style.setProperty('--parallax-y', '0px');
        return;
      }
      const rect = element.getBoundingClientRect();
      const speed = Number(element.dataset.parallax) || 0;
      const distance = viewportMiddle - (rect.top + rect.height / 2);
      const maxShift = element.closest('.home-hero')
        ? 10
        : element.closest('.product-panorama')
          ? 8
          : 6;
      const shift = Math.max(-maxShift, Math.min(maxShift, distance * speed));
      element.style.setProperty('--parallax-y', `${Math.round(shift)}px`);
    });
    document.documentElement.classList.toggle('is-scrolled', window.scrollY > 18);
  };
  const requestUpdate = () => {
    if (framePending) return;
    framePending = true;
    window.requestAnimationFrame(update);
  };

  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate);
  update();
}

function wireInteractiveComponents(root) {
  wireBillingToggle(root);
  wireWorkflow(root);
  wireFaqSearch(root);
  wireForms(root);
  wireHeroPointer(root);
  wireMobileAnchors(root);
  wirePointerGlow(root);
  wireCounters(root);
}

function wireFaqSearch(root) {
  const input = root.querySelector('[data-faq-search]');
  if (!input) return;
  const items = [...root.querySelectorAll('[data-faq-item]')];
  const groups = [...root.querySelectorAll('[data-faq-group]')];
  const status = root.querySelector('[data-faq-status]');
  input.addEventListener('input', () => {
    const query = input.value.trim().toLocaleLowerCase('ru-RU');
    let matches = 0;
    items.forEach(item => {
      const visible = !query || item.dataset.search.includes(query);
      item.hidden = !visible;
      if (visible) matches += 1;
    });
    groups.forEach(group => { group.hidden = ![...group.querySelectorAll('[data-faq-item]')].some(item => !item.hidden); });
    if (status) status.textContent = query ? (matches ? `Найдено ответов: ${matches}` : 'Подходящих ответов не найдено. Напишите в поддержку — разберём вопрос лично.') : '';
  });
}

function wirePointerGlow(root) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.matchMedia('(pointer: coarse)').matches) return;
  const targets = [...root.querySelectorAll('.feature-card__mockup, .use-case-card, .home-price-card, .article-card, .demo-form')];
  targets.forEach(target => {
    const glow = document.createElement('span');
    glow.className = 'pointer-glow';
    glow.setAttribute('aria-hidden', 'true');
    target.prepend(glow);
    target.addEventListener('pointermove', event => {
      const rect = target.getBoundingClientRect();
      target.style.setProperty('--glow-x', `${event.clientX - rect.left}px`);
      target.style.setProperty('--glow-y', `${event.clientY - rect.top}px`);
    });
  });
}

function wireCounters(root) {
  const counters = [...root.querySelectorAll('.use-case-card__stat strong')];
  if (!counters.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const element = entry.target;
      const match = element.textContent.trim().match(/^(\d[\d\s]*)(.*)$/);
      if (!match) return currentObserver.unobserve(element);
      const target = Number(match[1].replace(/\s/g, ''));
      const suffix = match[2];
      const startedAt = performance.now();
      const duration = 900;
      const render = now => {
        const progress = Math.min(1, (now - startedAt) / duration);
        const eased = 1 - Math.pow(1 - progress, 4);
        element.textContent = `${Math.round(target * eased)}${suffix}`;
        if (progress < 1) window.requestAnimationFrame(render);
      };
      window.requestAnimationFrame(render);
      currentObserver.unobserve(element);
    });
  }, { threshold: .65 });
  counters.forEach(counter => observer.observe(counter));
}

function wireMobileAnchors(root) {
  const dialog = root.querySelector('#mobile-menu');
  if (!dialog) return;
  dialog.addEventListener('click', event => {
    const link = event.target.closest('a[href]');
    if (!link || !dialog.open) return;
    dialog.querySelector('button[aria-label="Закрыть меню"]')?.click();
  }, { capture: true });
}

function wireScrollProgress() {
  const progress = document.createElement('div');
  progress.className = 'scroll-progress';
  progress.setAttribute('aria-hidden', 'true');
  document.body.append(progress);

  let pending = false;
  const update = () => {
    pending = false;
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
    progress.style.setProperty('--scroll-progress', String(ratio));
  };
  const requestUpdate = () => {
    if (pending) return;
    pending = true;
    window.requestAnimationFrame(update);
  };
  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate);
  update();
}

function wireSectionNavigation(root) {
  if (!('IntersectionObserver' in window)) return;
  const links = [...root.querySelectorAll('.desktop-nav a[href*="#"]')];
  const sections = links.map(link => {
    const id = new URL(link.href, window.location.origin).hash.slice(1);
    return { link, section: id ? document.getElementById(id) : null };
  }).filter(item => item.section);
  if (!sections.length) return;

  const observer = new IntersectionObserver(entries => {
    const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) {
      sections.forEach(item => item.link.classList.remove('is-section-active'));
      return;
    }
    sections.forEach(item => item.link.classList.toggle('is-section-active', item.section === visible.target));
  }, { rootMargin: '-24% 0px -60% 0px', threshold: [0, .15, .35] });
  sections.forEach(item => observer.observe(item.section));
}

function wireHeroPointer(root) {
  const hero = root.querySelector('.home-hero');
  const visual = hero?.querySelector('.home-hero__visual');
  if (!hero || !visual || window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.matchMedia('(pointer: coarse)').matches) return;

  let pending = false;
  let point = { x: 0, y: 0 };
  const render = () => {
    pending = false;
    visual.style.setProperty('--pointer-x', `${point.x.toFixed(2)}deg`);
    visual.style.setProperty('--pointer-y', `${point.y.toFixed(2)}deg`);
  };
  hero.addEventListener('pointermove', event => {
    const rect = visual.getBoundingClientRect();
    point = {
      x: Math.max(-2.2, Math.min(2.2, ((event.clientY - rect.top) / rect.height - .5) * -4.4)),
      y: Math.max(-3.2, Math.min(3.2, ((event.clientX - rect.left) / rect.width - .5) * 6.4)),
    };
    if (!pending) {
      pending = true;
      window.requestAnimationFrame(render);
    }
  });
  hero.addEventListener('pointerleave', () => {
    visual.style.setProperty('--pointer-x', '0deg');
    visual.style.setProperty('--pointer-y', '0deg');
  });
}

function wireBillingToggle(root) {
  const toggle = root.querySelector('[data-billing-toggle]');
  if (!toggle) return;
  const buttons = [...toggle.querySelectorAll('button[data-period]')];
  const prices = [...root.querySelectorAll('[data-price]')];
  buttons.forEach(button => button.addEventListener('click', () => {
    buttons.forEach(item => item.classList.toggle('is-active', item === button));
    const period = button.dataset.period;
    prices.forEach(price => {
      price.classList.add('is-changing');
      window.setTimeout(() => {
        price.textContent = new Intl.NumberFormat('ru-RU').format(Number(price.dataset[period]));
        price.classList.remove('is-changing');
      }, 140);
    });
  }));
}

function wireWorkflow(root) {
  const workflow = root.querySelector('.workflow');
  if (!workflow) return;
  const buttons = [...workflow.querySelectorAll('[data-workflow-step]')];
  const title = workflow.querySelector('[data-workflow-title]');
  const copy = workflow.querySelector('[data-workflow-copy]');
  const visual = workflow.querySelector('[data-workflow-visual]');
  let timer;
  const activate = button => {
    if (button.classList.contains('is-active')) return;
    buttons.forEach(item => {
      item.classList.toggle('is-active', item === button);
      item.setAttribute('aria-selected', String(item === button));
    });
    workflow.classList.add('is-switching');
    window.setTimeout(() => {
      title.textContent = button.dataset.title;
      copy.textContent = button.dataset.copy;
      visual.replaceChildren(createProductDeviceMockup({ mode: 'image', device: 'phone', label: button.querySelector('strong').textContent, screen: button.dataset.screen, image: { src: button.dataset.imageSrc, alt: button.dataset.imageAlt } }));
      workflow.classList.remove('is-switching');
    }, 190);
  };
  const start = () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    window.clearInterval(timer);
    timer = window.setInterval(() => {
      const current = buttons.findIndex(button => button.classList.contains('is-active'));
      activate(buttons[(current + 1) % buttons.length]);
    }, 6200);
  };
  buttons.forEach(button => button.addEventListener('click', () => {
    activate(button);
    start();
  }));
  workflow.addEventListener('pointerenter', () => window.clearInterval(timer));
  workflow.addEventListener('pointerleave', start);
  workflow.addEventListener('focusin', () => window.clearInterval(timer));
  workflow.addEventListener('focusout', start);
  start();
}

function wireForms(root) {
  root.querySelectorAll('[data-demo-form]').forEach(form => {
    form.addEventListener('submit', event => {
      event.preventDefault();
      const status = form.querySelector('[data-form-status]');
      const invalid = [...form.elements].find(field => typeof field.checkValidity === 'function' && !field.checkValidity());
      form.querySelectorAll('.is-invalid').forEach(field => field.classList.remove('is-invalid'));
      if (invalid) {
        invalid.classList.add('is-invalid');
        invalid.focus();
        status.textContent = 'Проверьте обязательные поля — так мы сможем ответить на заявку.';
        status.className = 'form-status is-error';
        return;
      }
      const button = form.querySelector('button[type="submit"]');
      button.disabled = true;
      button.textContent = 'Заявка отправлена';
      status.textContent = 'Спасибо! Мы свяжемся с вами по указанной почте в течение рабочего дня.';
      status.className = 'form-status is-success';
      form.classList.add('is-sent');
      const success = form.querySelector('.demo-form__success');
      window.setTimeout(() => success?.setAttribute('aria-hidden', 'false'), 260);
    });
  });
}

function createShellIntro({ eyebrow, title, description }) {
  const section = document.createElement('section');
  section.className = 'section section--subtle shell-intro';
  section.setAttribute('aria-labelledby', 'page-title');
  section.innerHTML = `<div class="container"><div class="shell-intro__content"><p class="eyebrow">${escapeHtml(eyebrow)}</p><h1 id="page-title">${escapeHtml(title)}</h1><p>${escapeHtml(description)}</p></div></div>`;
  return section;
}

function escapeHtml(value) { return String(value).replace(/[&<>'"]/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#039;', '"': '&quot;' })[character]); }
