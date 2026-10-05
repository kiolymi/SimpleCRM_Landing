import { articles } from '../data/articles.js?v=practice19';
import { createArticleCard } from './article-card.js?v=catalog16';
import { iconSvg } from './icons.js?v=20260824-28';

export function createMaterialsCatalog(category) {
  const section = document.createElement('section');
  section.className = 'materials-catalog';
  section.setAttribute('aria-labelledby', 'hub-title');
  section.innerHTML = `<div class="container"><header class="materials-intro"><p class="eyebrow">База знаний Simple CRM</p><h1 id="hub-title">Меньше искать. <br>Проще работать.</h1><p>Как подготовить встречу, вернуться к клиенту и записать следующий шаг. Инструкции и обновления Simple CRM — в одном месте.</p></header><div class="materials-tools" data-reveal="rise" data-motion="focal-action" data-delay="150"><label class="materials-search">${iconSvg('search')}<span class="visually-hidden">Найти материал</span><input type="search" placeholder="Например, встреча или карточка клиента" autocomplete="off"></label><div class="materials-filters" role="group" aria-label="Тип материала"></div></div><div class="materials-results" data-reveal="rise" data-motion="copy" data-delay="210"><h2>Все материалы</h2><span role="status" aria-live="polite"></span></div><div class="materials-grid"></div><div class="materials-empty" hidden><h2>Ничего не нашлось</h2><p>Попробуйте другое слово или посмотрите все материалы.</p><button type="button" class="button button--secondary">Сбросить поиск и фильтры</button></div></div>`;
  const labels = { all: 'Все материалы', learn: 'Практика', 'how-to': 'Инструкции', announcements: 'Обновления' };
  const params = new URLSearchParams(location.search);
  const fallback = category === 'learn' ? 'all' : category;
  let active = Object.hasOwn(labels, params.get('type')) ? params.get('type') : fallback;
  const input = section.querySelector('input');
  const grid = section.querySelector('.materials-grid');
  const results = section.querySelector('.materials-results');
  const empty = section.querySelector('.materials-empty');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const runningAnimations = new Map();
  let searchTimer = 0;
  input.value = params.get('q') || '';
  const cards = articles.map(post => {
    const card = createArticleCard(post);
    card.removeAttribute('data-reveal');
    card.querySelector('.article-card__category').textContent = labels[post.category];
    grid.append(card);
    return { post, card, text: [post.title, post.excerpt, ...post.tags].join(' ').toLocaleLowerCase('ru').replaceAll('ё', 'е') };
  });
  const buttons = Object.entries(labels).map(([key, label]) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = label;
    button.dataset.filter = key;
    button.addEventListener('click', () => {
      window.clearTimeout(searchTimer);
      active = key;
      update({ resetScroll: true });
    });
    section.querySelector('.materials-filters').append(button);
    return { key, button };
  });
  const animateElement = (element, keyframes, options) => {
    runningAnimations.get(element)?.cancel();
    const animation = element.animate(keyframes, options);
    runningAnimations.set(element, animation);
    const finish = () => {
      if (runningAnimations.get(element) === animation) runningAnimations.delete(element);
    };
    if (typeof animation.addEventListener === 'function') {
      animation.addEventListener('finish', finish, { once: true });
      animation.addEventListener('cancel', finish, { once: true });
    } else {
      animation.finished?.then(finish, finish);
    }
  };

  function update({ save = true, animate = true, resetScroll = false } = {}) {
    const previousPositions = new Map(
      cards.filter(({ card }) => !card.hidden).map(({ card }) => [card, card.getBoundingClientRect()]),
    );
    const words = input.value.trim().toLocaleLowerCase('ru').replaceAll('ё', 'е').split(/\s+/).filter(Boolean);
    let count = 0;
    cards.forEach(({ post, card, text }) => {
      card.hidden = !(active === 'all' || post.category === active) || !words.every(word => text.includes(word));
      if (!card.hidden) count++;
    });
    buttons.forEach(({ key, button }) => button.setAttribute('aria-pressed', String(key === active)));
    results.querySelector('h2').textContent = words.length ? 'Результаты поиска' : labels[active];
    results.querySelector('[role="status"]').textContent = `Найдено: ${count}`;
    empty.hidden = count > 0;

    if (animate && !reducedMotion.matches && typeof Element.prototype.animate === 'function') {
      const visibleCards = cards.filter(({ card }) => !card.hidden);
      visibleCards.forEach(({ card }, index) => {
        const previous = previousPositions.get(card);
        const current = card.getBoundingClientRect();
        if (previous) {
          const deltaX = previous.left - current.left;
          const deltaY = previous.top - current.top;
          if (Math.abs(deltaX) > 1 || Math.abs(deltaY) > 1) {
            animateElement(card, [
              { transform: `translate3d(${deltaX}px, ${deltaY}px, 0) scale(.985)`, opacity: .86 },
              { transform: 'translate3d(0, 0, 0) scale(1)', opacity: 1 },
            ], { duration: 440, easing: 'cubic-bezier(.16,1,.3,1)' });
          }
          return;
        }
        animateElement(card, [
          { transform: 'translate3d(0, 18px, 0) scale(.985)', opacity: 0, filter: 'blur(2px)' },
          { transform: 'translate3d(0, 0, 0) scale(1)', opacity: 1, filter: 'blur(0)' },
        ], {
          duration: 380,
          delay: Math.min(index * 45, 180),
          easing: 'cubic-bezier(.16,1,.3,1)',
          fill: 'backwards',
        });
      });
      animateElement(results, [
        { transform: 'translate3d(0, 7px, 0)', opacity: .45 },
        { transform: 'translate3d(0, 0, 0)', opacity: 1 },
      ], { duration: 260, easing: 'cubic-bezier(.2,0,0,1)' });
      if (!empty.hidden) {
        animateElement(empty, [
          { transform: 'translate3d(0, 14px, 0) scale(.99)', opacity: 0 },
          { transform: 'translate3d(0, 0, 0) scale(1)', opacity: 1 },
        ], { duration: 360, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'backwards' });
      }
    } else if (animate && !reducedMotion.matches) {
      const visibleCards = cards.filter(({ card }) => !card.hidden).map(({ card }) => card);
      visibleCards.forEach(card => card.classList.remove('is-catalog-entering'));
      results.classList.remove('is-catalog-updating');
      empty.classList.remove('is-catalog-entering');
      // Force one style flush so the entrance classes restart reliably in
      // browsers without Web Animations (including older Android WebViews).
      void grid.offsetWidth;
      visibleCards.forEach((card, index) => {
        card.style.setProperty('--catalog-stagger', `${Math.min(index * 45, 180)}ms`);
        card.classList.add('is-catalog-entering');
      });
      results.classList.add('is-catalog-updating');
      if (!empty.hidden) empty.classList.add('is-catalog-entering');
    }

    if (resetScroll && grid.scrollLeft) {
      if (typeof grid.scrollTo === 'function') {
        grid.scrollTo({ left: 0, behavior: reducedMotion.matches ? 'auto' : 'smooth' });
      } else {
        grid.scrollLeft = 0;
      }
    }
    if (save) {
      const url = new URL(location.href);
      url.searchParams.set('type', active);
      if (input.value.trim()) url.searchParams.set('q', input.value.trim()); else url.searchParams.delete('q');
      history.replaceState(history.state, '', url);
    }
  }
  input.addEventListener('input', () => {
    window.clearTimeout(searchTimer);
    section.classList.add('is-search-pending');
    searchTimer = window.setTimeout(() => {
      section.classList.remove('is-search-pending');
      update({ resetScroll: true });
    }, reducedMotion.matches ? 0 : 90);
  });
  empty.querySelector('button').addEventListener('click', () => {
    window.clearTimeout(searchTimer);
    input.value = '';
    active = 'all';
    update({ resetScroll: true });
    input.focus();
  });
  const handleMotionPreference = event => {
    if (!event.matches) return;
    runningAnimations.forEach(animation => animation.cancel());
    runningAnimations.clear();
  };
  if (typeof reducedMotion.addEventListener === 'function') {
    reducedMotion.addEventListener('change', handleMotionPreference);
  } else {
    reducedMotion.addListener?.(handleMotionPreference);
  }
  update({ save: false, animate: false });
  return section;
}
