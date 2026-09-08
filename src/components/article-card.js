import { categoryMeta } from '../data/articles.js?v=20260824-28';
import { iconSvg } from './icons.js?v=20260824-28';

export function createArticleCard(article) {
  const card = document.createElement('article');
  card.className = 'article-card';
  card.dataset.reveal = 'scale';

  const coverLink = document.createElement('a');
  coverLink.className = 'article-card__cover';
  coverLink.href = article.href;
  coverLink.setAttribute('aria-label', `Открыть материал: ${article.title}`);
  coverLink.style.aspectRatio = article.cover.aspectRatio;
  const editorialCovers = {
    'unified-client-history': ['customer-history.png', 'Объёмная стеклянная карточка клиента с календарём, сообщениями и документами'],
    'task-board-release': ['team-tasks.png', 'Футуристичная композиция задач с синими стеклянными галочками'],
  };
  const editorialCover = editorialCovers[article.slug];
  const compositeCovers = {
    'follow-up-after-meeting': 'cover-followup.png',
    'client-context': 'cover-client.png',
    'prepare-meeting': 'cover-meeting.png',
  };
  const compositeCover = document.body.dataset.page === 'home' && compositeCovers[article.slug];
  if (compositeCover) {
    coverLink.classList.add('article-card__cover--composite');
    coverLink.style.aspectRatio = '1 / 1';
    const backdrop = document.createElement('img');
    backdrop.className = 'article-card__scene';
    backdrop.src = new URL(`../../assets/editorial/${compositeCover}`, import.meta.url).href;
    backdrop.alt = '';
    backdrop.loading = 'lazy';
    backdrop.width = 1254;
    backdrop.height = 1254;
    const screen = document.createElement('img');
    screen.className = 'article-card__real-screen';
    screen.src = article.cover.image.src;
    screen.alt = article.cover.image.alt;
    screen.loading = 'lazy';
    coverLink.append(backdrop, screen);
  } else if (editorialCover) {
    coverLink.classList.add('article-card__cover--editorial');
    coverLink.style.aspectRatio = '3 / 2';
    const image = document.createElement('img');
    image.src = new URL(`../../assets/editorial/${editorialCover[0]}`, import.meta.url).href;
    image.alt = editorialCover[1];
    image.width = 1536;
    image.height = 1024;
    image.loading = 'lazy';
    image.decoding = 'async';
    coverLink.append(image);
  } else {
  coverLink.innerHTML = article.cover.image
    ? `<span class="article-card__cover-layout"><span class="article-card__cover-copy"><small>${escapeHtml(article.cover.kicker || 'Материал')}</small>${iconSvg(article.cover.icon || 'document')}<b>${escapeHtml(article.cover.label)}</b></span><span class="article-card__cover-media"><img src="${escapeAttribute(article.cover.image.src)}" alt="${escapeAttribute(article.cover.image.alt)}" loading="lazy" /></span></span>`
    : `<span>${iconSvg(article.cover.icon || 'document')}<b>${escapeHtml(article.cover.label)}</b></span>`;
  }

  const body = document.createElement('div');
  body.className = 'article-card__body';
  body.innerHTML = `<p class="article-card__category">${escapeHtml(categoryMeta[article.category]?.title || article.category)}</p><h3><a href="${escapeAttribute(article.href)}">${escapeHtml(article.title)}</a></h3><p>${escapeHtml(article.excerpt)}</p><a class="text-link" href="${escapeAttribute(article.href)}">Читать ${iconSvg('arrow-right')}</a>`;

  // News illustrations support the headline instead of adding a separate cover row.
  if (editorialCover) {
    card.classList.add('article-card--news-backdrop');
    const backdrop = coverLink.querySelector('img');
    backdrop.className = 'article-card__news-backdrop';
    backdrop.alt = '';
    backdrop.setAttribute('aria-hidden', 'true');
    card.append(backdrop);
  } else card.append(coverLink);
  card.append(body);
  return card;
}

function escapeHtml(value) { return String(value).replace(/[&<>'"]/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#039;', '"': '&quot;' })[character]); }
function escapeAttribute(value) { return escapeHtml(value); }
