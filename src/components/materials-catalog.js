import { articles } from '../data/articles.js?v=practice16';
import { createArticleCard } from './article-card.js?v=catalog14';
import { iconSvg } from './icons.js?v=20260824-28';

export function createMaterialsCatalog(category) {
  const section = document.createElement('section');
  section.className = 'materials-catalog';
  section.setAttribute('aria-labelledby', 'hub-title');
  section.innerHTML = `<div class="container"><header class="materials-intro"><p class="eyebrow">База знаний Simple CRM</p><h1 id="hub-title">Меньше искать.<br>Проще работать.</h1><p>Как подготовить встречу, вернуться к клиенту и записать следующий шаг. Инструкции и новости Simple CRM — в одном месте.</p></header><div class="materials-tools"><label class="materials-search">${iconSvg('search')}<span class="visually-hidden">Найти материал</span><input type="search" placeholder="Например, встреча или карточка клиента" autocomplete="off"></label><div class="materials-filters" role="group" aria-label="Тип материала"></div></div><div class="materials-results"><h2>Все материалы</h2><span role="status" aria-live="polite"></span></div><div class="materials-grid"></div><div class="materials-empty" hidden><h2>Ничего не нашлось</h2><p>Попробуйте другое слово или посмотрите все материалы.</p><button type="button" class="button button--secondary">Сбросить поиск и фильтры</button></div></div>`;
  const labels = { all: 'Все материалы', learn: 'Практика', 'how-to': 'Инструкции', announcements: 'Новости продукта' };
  const params = new URLSearchParams(location.search);
  const fallback = category === 'learn' ? 'all' : category;
  let active = Object.hasOwn(labels, params.get('type')) ? params.get('type') : fallback;
  const input = section.querySelector('input');
  input.value = params.get('q') || '';
  const cards = articles.map(post => {
    const card = createArticleCard(post);
    card.removeAttribute('data-reveal');
    card.querySelector('.article-card__category').textContent = labels[post.category];
    section.querySelector('.materials-grid').append(card);
    return { post, card, text: [post.title, post.excerpt, ...post.tags].join(' ').toLocaleLowerCase('ru').replaceAll('ё', 'е') };
  });
  const buttons = Object.entries(labels).map(([key, label]) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = label;
    button.addEventListener('click', () => { active = key; update(); });
    section.querySelector('.materials-filters').append(button);
    return { key, button };
  });
  function update(save = true) {
    const words = input.value.trim().toLocaleLowerCase('ru').replaceAll('ё', 'е').split(/\s+/).filter(Boolean);
    let count = 0;
    cards.forEach(({ post, card, text }) => {
      card.hidden = !(active === 'all' || post.category === active) || !words.every(word => text.includes(word));
      if (!card.hidden) count++;
    });
    buttons.forEach(({ key, button }) => button.setAttribute('aria-pressed', String(key === active)));
    section.querySelector('.materials-results h2').textContent = words.length ? 'Результаты поиска' : labels[active];
    section.querySelector('[role="status"]').textContent = `Найдено: ${count}`;
    section.querySelector('.materials-empty').hidden = count > 0;
    if (save) {
      const url = new URL(location.href);
      url.searchParams.set('type', active);
      if (input.value.trim()) url.searchParams.set('q', input.value.trim()); else url.searchParams.delete('q');
      history.replaceState(history.state, '', url);
    }
  }
  input.addEventListener('input', () => update());
  section.querySelector('.materials-empty button').addEventListener('click', () => { input.value = ''; active = 'all'; update(); input.focus(); });
  update(false);
  return section;
}
