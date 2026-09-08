const motion = matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');

function connectScreens() {
  const screens = document.querySelectorAll('.company-page__hero-screens .device-mockup, .home-hero .hero-device--soft-hover');
  screens.forEach((screen, index) => {
    if (screen.dataset.softMotion) return;
    screen.dataset.softMotion = 'ready';
    const frame = screen.querySelector('.device-mockup__frame');
    const breathing = screen.classList.contains('hero-device--soft-hover');
    let target = 0, strength = 0, phase = 0, previous = 0, request = 0;
    const paint = () => {
      frame.style.setProperty('--screen-scale', String(1 + (.045 + (breathing ? .006 * Math.sin(phase) : 0)) * strength));
      frame.style.setProperty('--screen-roll', `${Math.sin(phase) * .8 * strength * (index ? -1 : 1)}deg`);
    };
    const tick = now => {
      request = 0;
      const delta = Math.min(now - previous, 50);
      previous = now;
      phase += delta * Math.PI * 2 / 6500;
      strength += (target - strength) * (1 - Math.exp(-delta / (breathing ? 1000 : 720)));
      if (!target && strength < .0002) strength = 0;
      paint();
      if (strength || target) request = requestAnimationFrame(tick);
      else frame.style.willChange = '';
    };
    const hover = active => {
      target = motion.matches && active ? 1 : 0;
      if (!request && (target || strength)) {
        previous = performance.now();
        frame.style.willChange = 'transform';
        request = requestAnimationFrame(tick);
      }
    };
    const reset = () => {
      cancelAnimationFrame(request);
      request = target = strength = 0;
      paint();
      frame.style.willChange = '';
    };
    screen.addEventListener('pointerenter', () => hover(true));
    screen.addEventListener('pointerleave', () => hover(false));
    screen.addEventListener('pointercancel', () => hover(false));
    motion.addEventListener('change', reset);
    document.addEventListener('visibilitychange', () => { if (document.hidden) reset(); });
  });
  return screens.length > 0;
}

if (!connectScreens()) {
  const observer = new MutationObserver(() => { if (connectScreens()) observer.disconnect(); });
  observer.observe(document.body, { childList: true, subtree: true });
}
