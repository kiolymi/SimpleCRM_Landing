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
  coverLink.innerHTML = article.cover.image
    ? `<span class="article-card__cover-layout"><span class="article-card__cover-copy"><small>${escapeHtml(article.cover.kicker || 'Материал')}</small>${iconSvg(article.cover.icon || 'document')}<b>${escapeHtml(article.cover.label)}</b></span><span class="article-card__cover-media"><img src="${escapeAttribute(article.cover.image.src)}" alt="${escapeAttribute(article.cover.image.alt)}" loading="lazy" /></span></span>`
    : `<span>${iconSvg(article.cover.icon || 'document')}<b>${escapeHtml(article.cover.label)}</b></span>`;

  const body = document.createElement('div');
  body.className = 'article-card__body';
  body.innerHTML = `<p class="article-card__category">${escapeHtml(categoryMeta[article.category]?.title || article.category)}</p><h3><a href="${escapeAttribute(article.href)}">${escapeHtml(article.title)}</a></h3><p>${escapeHtml(article.excerpt)}</p><a class="text-link" href="${escapeAttribute(article.href)}">Читать ${iconSvg('arrow-right')}</a>`;

  card.append(coverLink, body);
  return card;
}

function escapeHtml(value) { return String(value).replace(/[&<>'"]/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#039;', '"': '&quot;' })[character]); }
function escapeAttribute(value) { return escapeHtml(value); }
