// Lightweight video-like hero: generated locally, no third-party media requests.
function initializeAmbientSurface() {
const hero = document.querySelector('.home-hero');
if (hero) {
  const canvas = document.createElement('canvas');
  canvas.className = 'hero-motion-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  hero.prepend(canvas);
  const context = canvas.getContext('2d');
  if (context) {
    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'background-motion-toggle';
    toggle.textContent = 'Приостановить фон';
    toggle.setAttribute('aria-pressed', 'false');
    hero.append(toggle);
    const reduce = matchMedia('(prefers-reduced-motion: reduce)');
    let paused = false, visible = true, frame = 0, last = 0, time = 0;
    let width = 0, height = 0;
    const draw = () => {
      context.clearRect(0, 0, width, height);
      const cx = width * (.78 + Math.sin(time * .13) * .025);
      const cy = height * (.36 + Math.cos(time * .16) * .035);
      const glow = context.createRadialGradient(cx, cy, 0, cx, cy, width * .48);
      glow.addColorStop(0, 'rgba(32,111,175,.22)');
      glow.addColorStop(.55, 'rgba(30,76,124,.09)');
      glow.addColorStop(1, 'rgba(8,21,37,0)');
      context.fillStyle = glow; context.fillRect(0, 0, width, height);
      const size = Math.max(64, width * .055);
      for (let row = 0; row < 7; row++) for (let col = 0; col < 8; col++) {
        if ((row * 3 + col) % 5 === 0) continue;
        const x = width * .46 + col * size * 1.5;
        const y = row * size * 1.73 + (col % 2) * size * .865 - size;
        const strength = (.025 + .04 * (1 + Math.sin(time * .42 + col * .8 + row * .6)) / 2) * Math.min(1, (col + 1) / 3);
        context.strokeStyle = `rgba(151,200,235,${strength})`;
        context.lineWidth = 1;
        context.beginPath();
        // Open hexagons keep the network irregular, with no starfield or sparks.
        for (let edge = 0; edge < 6; edge++) {
          const angle = edge * Math.PI / 3;
          const px = x + Math.cos(angle) * size;
          const py = y + Math.sin(angle) * size;
          if (edge === 0) context.moveTo(px, py); else context.lineTo(px, py);
        }
        context.stroke();
      }
    };
    const resize = () => {
      width = canvas.clientWidth; height = canvas.clientHeight;
      const ratio = Math.min(devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * ratio); canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0); draw();
    };
    const tick = now => {
      if (now - last >= 1000 / 24) {
        time += Math.min((now - last) / 1000, .08); last = now; draw();
      }
      frame = requestAnimationFrame(tick);
    };
    const sync = () => {
      cancelAnimationFrame(frame);
      toggle.hidden = reduce.matches;
      if (!paused && visible && !document.hidden && !reduce.matches) {
        last = performance.now(); frame = requestAnimationFrame(tick);
      } else draw();
    };
    toggle.addEventListener('click', () => {
      paused = !paused;
      toggle.textContent = paused ? 'Продолжить анимацию' : 'Приостановить фон';
      toggle.setAttribute('aria-pressed', String(paused)); sync();
    });
    new ResizeObserver(resize).observe(canvas);
    new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }).observe(hero);
    document.addEventListener('visibilitychange', sync);
    reduce.addEventListener('change', sync);
    resize(); sync();
  }
}
}
// All deferred page modules finish before this event, including a cold cache.
if (document.readyState === 'complete') initializeAmbientSurface();
else document.addEventListener('DOMContentLoaded', initializeAmbientSurface, { once: true });
