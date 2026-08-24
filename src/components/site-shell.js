import { primaryNavigation, resourceNavigation, siteConfig } from '../data/site.js?v=20260824-28';
import { iconSvg } from './icons.js?v=20260824-28';

export function createSiteShell(mainContent) {
  const shell = document.createElement('div');
  shell.className = 'site-shell';
  shell.append(createHeader(), mainContent, createFooter());
  return shell;
}

function createHeader() {
  const header = document.createElement('header');
  header.className = 'site-header';
  header.innerHTML = `
    <div class="container site-header__inner">
      ${brandMarkup()}
      <nav class="desktop-nav" aria-label="Основная навигация">
        ${resourceMenuMarkup()}
        ${primaryNavigation.map(navLinkMarkup).join('')}
      </nav>
      <a class="header-app-store" href="https://apps.apple.com/" target="_blank" rel="noopener noreferrer" aria-label="Скачать Simple CRM с App Store">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15.4 3.2c-.9.1-2 .7-2.6 1.4-.6.7-1.1 1.8-.9 2.8 1 .1 2-.5 2.6-1.2.6-.8 1-1.8.9-3Zm3.4 9.1c0-2.5 2-3.7 2.1-3.8-1.1-1.7-2.9-1.9-3.6-1.9-1.5-.2-3 .9-3.8.9-.8 0-2-.9-3.3-.9-1.7 0-3.3 1-4.2 2.6-1.8 3.1-.5 7.7 1.3 10.2.9 1.2 1.9 2.6 3.3 2.6 1.3-.1 1.8-.8 3.4-.8s2 .8 3.4.8c1.4 0 2.3-1.3 3.1-2.5 1.1-1.6 1.6-3.2 1.6-3.3-.1 0-3.1-1.2-3.1-4.7Z" /></svg>
        <span><small>Скачайте с</small><strong>App Store</strong></span>
      </a>
      <button class="menu-toggle" type="button" aria-label="Открыть меню" aria-expanded="false" aria-controls="mobile-menu"><span class="menu-toggle__bar"></span></button>
    </div>
  `;

  const mobileDialog = createMobileMenu();
  header.append(mobileDialog);
  wireResourceMenu(header);
  wireMobileMenu(header, mobileDialog);
  return header;
}

function brandMarkup() {
  const { logo, name } = siteConfig;
  return `<a class="brand" href="/" aria-label="${escapeAttribute(name)}, на главную"><img class="brand__logo" src="${escapeAttribute(logo.src)}" alt="${escapeAttribute(logo.alt)}" width="${logo.width}" height="${logo.height}" /><span>${escapeHtml(name)}</span></a>`;
}

function navLinkMarkup({ label, href }) {
  return `<a href="${escapeAttribute(href)}">${escapeHtml(label)}</a>`;
}

function resourceMenuMarkup() {
  return `<div class="resource-menu"><a class="desktop-nav__trigger" href="/learn/" aria-expanded="false" aria-haspopup="true">Материалы ${iconSvg('chevron-down')}</a><div class="resource-menu__panel" role="menu"><a role="menuitem" href="/learn/"><strong>Все материалы</strong><span>Статьи о работе с клиентами</span></a>${resourceNavigation.filter(item => item.href !== '/learn/').map(({ label, href }) => `<a role="menuitem" href="${escapeAttribute(href)}">${escapeHtml(label)}</a>`).join('')}</div></div>`;
}

function createMobileMenu() {
  const dialog = document.createElement('dialog');
  dialog.id = 'mobile-menu';
  dialog.className = 'mobile-menu';
  dialog.setAttribute('aria-label', 'Навигация сайта');
  dialog.innerHTML = `
    <div class="mobile-menu__inner">
      <div class="mobile-menu__top">${brandMarkup()}<button class="icon-button" type="button" aria-label="Закрыть меню">${iconSvg('x')}</button></div>
      <nav class="mobile-menu__nav" aria-label="Мобильная навигация">
        <div class="mobile-menu__resources"><p>Материалы</p>${resourceNavigation.map(navLinkMarkup).join('')}<a href="/search/">Поиск по материалам</a></div>
        ${primaryNavigation.map(navLinkMarkup).join('')}
      </nav>
      <a class="button button--primary mobile-menu__cta" href="${siteConfig.primaryCta.href}">${siteConfig.primaryCta.label}</a>
    </div>
  `;
  return dialog;
}

function wireResourceMenu(header) {
  const menu = header.querySelector('.resource-menu');
  const trigger = menu.querySelector('.desktop-nav__trigger');
  const close = () => { menu.classList.remove('is-open'); trigger.setAttribute('aria-expanded', 'false'); };
  const open = () => { menu.classList.add('is-open'); trigger.setAttribute('aria-expanded', 'true'); };
  trigger.addEventListener('focus', open);
  trigger.addEventListener('keydown', (event) => { if (event.key === 'ArrowDown') { event.preventDefault(); open(); menu.querySelector('a').focus(); } });
  menu.addEventListener('focusout', () => requestAnimationFrame(() => { if (!menu.contains(document.activeElement)) close(); }));
  menu.addEventListener('keydown', (event) => { if (event.key === 'Escape') { close(); trigger.focus(); } });
  menu.addEventListener('mouseenter', open);
  menu.addEventListener('mouseleave', close);
}

function wireMobileMenu(header, dialog) {
  const trigger = header.querySelector('.menu-toggle');
  const closeButton = dialog.querySelector('button');
  const close = () => {
    if (!dialog.open || dialog.classList.contains('is-closing')) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      dialog.close();
      return;
    }
    dialog.classList.remove('is-visible');
    dialog.classList.add('is-closing');
    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      dialog.close();
    };
    dialog.addEventListener('transitionend', (event) => {
      if (event.target === dialog && event.propertyName === 'transform') finish();
    });
    window.setTimeout(finish, 560);
  };
  trigger.addEventListener('click', () => {
    trigger.setAttribute('aria-expanded', 'true');
    dialog.showModal();
    requestAnimationFrame(() => dialog.classList.add('is-visible'));
    closeButton.focus();
  });
  closeButton.addEventListener('click', close);
  dialog.querySelectorAll('a[href]').forEach(link => link.addEventListener('click', close));
  dialog.addEventListener('click', (event) => { if (event.target === dialog) close(); });
  dialog.addEventListener('close', () => {
    dialog.classList.remove('is-visible', 'is-closing');
    trigger.setAttribute('aria-expanded', 'false');
    trigger.focus();
  });
  dialog.addEventListener('cancel', (event) => { event.preventDefault(); close(); });
  dialog.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      close();
      return;
    }
    trapDialogFocus(event, dialog);
  });
}

function trapDialogFocus(event, dialog) {
  if (event.key !== 'Tab') return;
  const focusable = [...dialog.querySelectorAll('a[href], button:not([disabled])')];
  const first = focusable[0];
  const last = focusable.at(-1);
  if (!first || !last) return;
  if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
  if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
}

function createFooter() {
  const footer = document.createElement('footer');
  footer.className = 'site-footer';
  footer.dataset.reveal = 'fade';
  footer.innerHTML = `<div class="container site-footer__inner"><nav class="site-footer__nav" aria-label="Навигация в подвале"><a href="/about/">О продукте</a><a href="/pricing/">Тарифы</a><a href="/learn/">Материалы</a><a href="/announcements/">Обновления</a><a href="/faq/">Вопросы</a><a href="/privacy/">Конфиденциальность</a><a href="/releases/">Версии</a><a href="/support/">Поддержка</a></nav><div class="site-footer__brand">${brandMarkup()}</div><p class="site-footer__legal">© ${new Date().getFullYear()} Simple CRM. Все права защищены.</p></div>`;
  return footer;
}

function escapeHtml(value) { return String(value).replace(/[&<>'"]/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#039;', '"': '&quot;' })[character]); }
function escapeAttribute(value) { return escapeHtml(value); }
