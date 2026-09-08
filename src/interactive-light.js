// Decorative pointer light: never replaces the cursor or intercepts input.
const enabled = matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
const sheet = document.createElement('link');
sheet.rel = 'stylesheet';
sheet.href = new URL('../styles/interactive-light.css?v=clean-feature-hover2', import.meta.url).href;
document.head.append(sheet);
const light = document.createElement('div');
light.className = 'site-pointer-light';
light.setAttribute('aria-hidden', 'true');
document.body.append(light);
const selector = 'a, button, summary, .article-card, .pricing-plan, .faq-rich-item, .archive-category, .company-page__principles > div, .testimonial-card, .feature-card__mockup, .release-entry';
let active = null, request = 0, x = 0, y = 0, targetX = 0, targetY = 0, started = false;
const clearTarget = () => {
  active?.classList.remove('has-pointer-light');
  active = null;
};
const stop = () => {
  light.classList.remove('is-active', 'is-over-control');
  cancelAnimationFrame(request);
  request = 0;
  started = false;
  clearTarget();
};
const draw = () => {
  request = 0;
  x += (targetX - x) * .28;
  y += (targetY - y) * .28;
  light.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  if (Math.abs(targetX - x) + Math.abs(targetY - y) > .2) request = requestAnimationFrame(draw);
};
document.addEventListener('pointermove', event => {
  if (!enabled.matches || event.pointerType === 'touch') return;
  targetX = event.clientX;
  targetY = event.clientY;
  if (!started) { x = targetX; y = targetY; started = true; }
  light.classList.add('is-active');
  if (!request) request = requestAnimationFrame(draw);
  const next = event.target instanceof Element ? event.target.closest(selector) : null;
  if (next !== active) {
    clearTarget();
    if (next && !next.matches(':disabled, [aria-disabled="true"]')) {
      active = next;
      active.classList.add('has-pointer-light');
    }
    light.classList.toggle('is-over-control', Boolean(active));
  }
}, { passive: true });
document.documentElement.addEventListener('pointerleave', stop);
document.addEventListener('pointercancel', stop);
document.addEventListener('scroll', clearTarget, { passive: true, capture: true });
window.addEventListener('blur', stop);
document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); });
enabled.addEventListener('change', stop);
