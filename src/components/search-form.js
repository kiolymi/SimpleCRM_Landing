import { iconSvg } from './icons.js';

export function createSearchForm({ query = '', label = 'Поиск по материалам', compact = false } = {}) {
  const form = document.createElement('form');
  form.className = `search-form${compact ? ' search-form--compact' : ''}`;
  form.method = 'get';
  form.action = '/search/';
  form.setAttribute('role', 'search');
  form.innerHTML = `<label class="visually-hidden" for="site-search">${escapeHtml(label)}</label><input id="site-search" name="q" type="search" value="${escapeAttribute(query)}" placeholder="Найти материал" autocomplete="off" /><button class="icon-button" type="submit" aria-label="Искать">${iconSvg('search')}</button>`;
  return form;
}

function escapeHtml(value) { return String(value).replace(/[&<>'"]/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#039;', '"': '&quot;' })[character]); }
function escapeAttribute(value) { return escapeHtml(value); }
