const artwork = {
  home: ['home-connections', '.testimonials-section .section-heading', 'Стеклянный мост, объединяющий людей'],
  about: ['about-team', '.company-page__mission', 'Команда за круглым синим столом'],
  pricing: ['pricing-value', '.pricing-page__hero .container', 'Стеклянные ступени и весы — выбор возможностей'],
  faq: ['faq-answers', '.faq-page__hero .container', 'Объёмные символы вопроса, диалога и ясного ответа'],
  privacy: ['privacy-shield', '.document-header', 'Синий стеклянный щит и замок'],
  releases: ['releases-evolution', '.releases-header', 'Стеклянная лестница развития продукта'],
  support: ['support-care', '.support-message', 'Гарнитура вокруг символа диалога'],
  learn: ['learn-library', '.archive-heading', 'Открытая книга со стеклянными страницами'],
  'how-to': ['howto-guide', '.archive-heading', 'Синий компас и путь по ступеням'],
  announcements: ['announcements-signal', '.archive-heading', 'Стеклянный рупор с голубыми звуковыми волнами'],
  search: ['search-discovery', '.search-page__form', 'Синяя лупа находит светящийся куб'],
  'follow-up-after-meeting': ['article-followup', '.article-body > p', 'Диалог превращается в следующий шаг'],
  'client-context': ['article-context', '.article-body > p', 'Слои информации объединяются в профиль клиента'],
  'prepare-meeting': ['article-meeting', '.article-body > p', 'Календарь, часы и место для встречи'],
  'create-follow-up-task': ['article-nextstep', '.article-body > p', 'Стеклянный карандаш, отметка выполнения и ступени'],
  'unified-client-history': ['article-history', '.article-body > p', 'Спираль с капсулами истории взаимодействий'],
  'task-board-release': ['article-board', '.article-body > p', 'Организованные ряды задач и стрелка движения вперёд'],
};

export function addPageArtwork(root, pageKey, articleSlug) {
  // Illustrations support selected introductions, not every reading/utility page.
  if (!['home', 'about', 'pricing', 'faq', 'learn', 'how-to'].includes(pageKey)) return;
  const entry = artwork[pageKey === 'article' ? articleSlug : pageKey];
  if (!entry) return;
  const [file, selector, alt] = entry;
  const anchor = root.querySelector(selector);
  if (!anchor) return;
  const figure = document.createElement('figure');
  figure.className = 'page-art';
  figure.setAttribute('aria-hidden', 'true');
  figure.dataset.reveal = 'slide-up';
  figure.dataset.artwork = file;
  const img = document.createElement('img');
  img.src = new URL(`../../assets/editorial/${file}.png`, import.meta.url).href;
  img.alt = '';
  img.width = 1536;
  img.height = 1024;
  img.loading = 'lazy';
  img.decoding = 'async';
  figure.append(img);
  const copy = document.createElement('div');
  copy.className = 'page-art-layout__copy';
  copy.append(...anchor.childNodes);
  anchor.classList.add('page-art-layout');
  anchor.append(copy, figure);
}
