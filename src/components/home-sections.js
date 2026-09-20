import { iconSvg } from './icons.js?v=20260824-28';
import { createProductDeviceMockup } from './product-device-mockup.js?v=20260906-1';
import { homeContent } from '../data/home.js?v=refinement2';
import { createPracticeStories } from './practice-flows.js?v=refinement1';
import { createPracticeAudience } from './practice-audience.js?v=refinement2';
import { createPracticeOverview } from './practice-overview.js?v=refinement2';
import { accessConfig } from '../data/access.js?v=refinement3';

export function createHomePage() {
  const fragment = document.createDocumentFragment();
  fragment.append(
    createHero(homeContent.hero),
    createPracticeAudience(),
    createPracticeStories(),
    createPracticeOverview(),
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
        <div class="practice-hero-actions"><a class="button practice-hero-actions__primary" href="${escapeAttribute(accessConfig.primary.href)}">${escapeHtml(accessConfig.primary.label)} ${iconSvg('arrow-right')}</a><a class="practice-hero-actions__secondary" href="${escapeAttribute(accessConfig.secondary.href)}">${escapeHtml(accessConfig.secondary.label)}</a><small>Знакомство с Simple CRM на примерах</small></div>
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

function escapeHtml(value) { return String(value).replace(/[&<>'"]/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#039;', '"': '&quot;' })[character]); }
function escapeAttribute(value) { return escapeHtml(value); }
