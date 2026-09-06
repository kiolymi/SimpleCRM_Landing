// Page-local enhancement; does not alter the shared renderer or other routes.
function enhanceFaq() {
  const page = document.querySelector('.faq-page--dextr');
  if (!page || page.dataset.searchReady) return Boolean(page);
  page.dataset.searchReady = 'true';
  const items = [...page.querySelectorAll('.faq-rich-item')];
  const search = document.createElement('div');
  search.className = 'faq-search';
  search.setAttribute('role', 'search');
  search.setAttribute('aria-label', 'Поиск по вопросам');
  search.innerHTML = `<label class="visually-hidden" for="faq-query">Найти вопрос или ответ</label><div class="faq-search__field"><svg class="faq-search__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></svg><input id="faq-query" type="search" placeholder="Найти вопрос или ответ…" autocomplete="off" aria-controls="faq-results" /><button class="faq-search__clear" type="button" aria-label="Очистить поиск" hidden>×</button></div><p class="faq-search__status" role="status" aria-live="polite" aria-atomic="true">Например: оплата, теги или перенос данных</p>`;
  page.querySelector('.faq-page__hero > .container').append(search);
  const list = page.querySelector('.faq-list');
  list.id = 'faq-results';
  const empty = document.createElement('div');
  empty.className = 'faq-empty';
  empty.hidden = true;
  const supportLink = document.querySelector('.desktop-nav a[href$="/support/"]')?.href || new URL('../support/', location.href).href;
  empty.innerHTML = '<h2>Ничего не нашлось</h2><p>Попробуйте другое слово или <a>напишите в поддержку</a>.</p>';
  empty.querySelector('a').href = supportLink;
  list.after(empty);
  const normalize = text => text.toLocaleLowerCase('ru-RU').replaceAll('ё', 'е').replace(/\s+/g, ' ').trim();
  const entries = items.map(item => ({item, text: normalize(item.textContent), initiallyOpen: item.open}));
  const input = search.querySelector('input');
  const clear = search.querySelector('button');
  const status = search.querySelector('[role="status"]');
  const animations = new Map();
  function cancelAnimation(item) {
    animations.get(item)?.cancel();
    animations.delete(item);
    item.style.removeProperty('overflow');
  }
  function filter() {
    const words = normalize(input.value).split(' ').filter(Boolean);
    let count = 0;
    entries.forEach(({item, text, initiallyOpen}) => {
      cancelAnimation(item);
      const matches = words.every(word => text.includes(word));
      item.hidden = !matches;
      item.open = words.length ? matches : initiallyOpen;
      if (matches) {
        count++;
        // A filtered result must not remain hidden by an offscreen reveal.
        if (words.length) item.classList.add('is-visible');
      }
    });
    clear.hidden = !input.value;
    empty.hidden = count !== 0;
    status.textContent = words.length ? `Найдено: ${count} из ${items.length}` : 'Например: оплата, теги или перенос данных';
  }
  input.addEventListener('input', filter);
  clear.addEventListener('click', () => { input.value = ''; filter(); input.focus(); });
  input.addEventListener('keydown', event => {
    if (event.key === 'Escape') { input.value = ''; filter(); }
  });
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  items.forEach(item => {
    let desiredOpen = item.open;
    item.querySelector('summary').addEventListener('click', event => {
      event.preventDefault();
      const startHeight = item.getBoundingClientRect().height;
      desiredOpen = animations.has(item) ? !desiredOpen : !item.open;
      cancelAnimation(item);
      if (motion.matches || !item.animate) { item.open = desiredOpen; return; }
      item.open = desiredOpen;
      const endHeight = item.getBoundingClientRect().height;
      item.open = true;
      item.style.overflow = 'hidden';
      const animation = item.animate([{height: `${startHeight}px`}, {height: `${endHeight}px`}], {duration: 300, easing: 'cubic-bezier(.22,.61,.36,1)'});
      animations.set(item, animation);
      animation.onfinish = () => {
        item.open = desiredOpen;
        animations.delete(item);
        item.style.removeProperty('overflow');
      };
    });
  });
  motion.addEventListener('change', () => { if (motion.matches) items.forEach(cancelAnimation); });
  return true;
}
if (!enhanceFaq()) {
  const observer = new MutationObserver(() => { if (enhanceFaq()) observer.disconnect(); });
  observer.observe(document.documentElement, {childList: true, subtree: true});
}
