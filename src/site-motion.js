const setReveal = (element, motion, delay = 0, reveal = 'rise') => {
  if (!element || element.hasAttribute('data-reveal')) return;
  element.dataset.reveal = reveal;
  element.dataset.motion = motion;
  element.dataset.delay = String(delay);
};

const directLead = heading => {
  const owner = heading?.closest('header, [class*="hero-copy"], [class*="hero__copy"], [class*="intro"], .inner-page-header');
  return owner?.querySelector(':scope > p, :scope > div > p') || heading?.parentElement?.querySelector(':scope > p');
};

export function prepareSiteMotion(root, pageKey) {
  document.documentElement.classList.add('motion-system-ready');
  if (pageKey === 'home') return;

  const main = root.querySelector('.site-main');
  const firstSurface = main?.firstElementChild;
  if (!firstSurface) return;

  const heading = firstSurface.querySelector('h1');

  // The page-specific styles used to reveal some complete hero wrappers.
  // Once the hero gets a choreographed title/copy/visual sequence, keeping the
  // wrapper reveal would make the same content animate twice and feel muddy.
  for (let ancestor = heading?.parentElement; ancestor && ancestor !== main; ancestor = ancestor.parentElement) {
    ancestor.removeAttribute('data-reveal');
    ancestor.removeAttribute('data-delay');
    ancestor.removeAttribute('data-motion');
    if (ancestor === firstSurface) break;
  }

  setReveal(heading, 'focal-title', 0, 'title');

  const lead = directLead(heading);
  setReveal(lead, 'focal-copy', 90);

  const copyRegion = heading?.closest('header, [class*="hero-copy"], [class*="hero__copy"], [class*="intro"], .inner-page-header') || heading?.parentElement;
  copyRegion?.querySelectorAll(':scope > .button, :scope > button, :scope > form, :scope > [class*="actions"], :scope > div > .button').forEach((element, index) => {
    setReveal(element, 'focal-action', 160 + index * 55);
  });

  const visual = firstSurface.querySelector([
    '.page-art',
    '.company-page__hero-screens',
    '.support-contact-hero__visual',
    '.materials-hero__visual',
    '.pricing-page__visual',
    '.article-header__visual',
    '.product-panorama__screens',
    'figure',
  ].join(','));
  if (visual && !visual.contains(heading) && !copyRegion?.contains(visual)) setReveal(visual, 'focal-visual', 130, 'device');

  main.querySelectorAll('section h2, article h2').forEach(headingElement => {
    if (headingElement.closest('.article-body, .document-body, .release-entry')) return;
    setReveal(headingElement, 'title', 0, 'title');
  });

  const cardSelectors = [
    '.article-grid > article',
    '.materials-grid > article',
    '.testimonials-grid > article',
    '.pricing-page__plans > article',
    '.pricing-grid > article',
    '.support-page__grid > section',
    '.company-page__principles > *',
    '.faq-list > details',
    '.search-results > article',
  ];
  main.querySelectorAll(cardSelectors.join(',')).forEach((element, index) => {
    setReveal(element, 'card', Math.min((index % 4) * 65, 195), 'scale');
  });
}

export function wireMotionLifecycle(root) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const regions = [...root.querySelectorAll([
    '.page-ambient-host',
    '.story-hero',
    '.company-page__hero',
    '.support-contact-hero',
    '.materials-hero',
    '.pricing-page__hero',
  ].join(','))];

  const syncVisibility = () => {
    document.documentElement.classList.toggle('motion-paused', document.hidden);
  };
  document.addEventListener('visibilitychange', syncVisibility);
  syncVisibility();

  if (!regions.length || reducedMotion.matches || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => entry.target.classList.toggle('is-motion-active', entry.isIntersecting));
  }, { rootMargin: '12% 0px', threshold: 0 });
  regions.forEach(region => observer.observe(region));

  reducedMotion.addEventListener('change', event => {
    if (!event.matches) return;
    observer.disconnect();
    regions.forEach(region => region.classList.remove('is-motion-active'));
  });
  window.addEventListener('pagehide', () => observer.disconnect(), { once: true });
}
