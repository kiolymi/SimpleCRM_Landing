import { createArticleCard } from './article-card.js?v=catalog15';
import { createMaterialsCatalog } from './materials-catalog.js?v=practice18';
import { createSupportCenter } from './support-center.js?v=refinement2';
import { iconSvg } from './icons.js?v=20260824-28';
import { createProductDeviceMockup } from './product-device-mockup.js?v=20260927-2';
import { createSearchForm } from './search-form.js';
import { articles, categoryMeta, findArticles, getArticleBySlug, getArticlesByCategory } from '../data/articles.js?v=practice18';

export function createContentHubPage(category) {
  return createMaterialsCatalog(category);
}

export function createArticleLayout(slug) {
  const article = getArticleBySlug(slug);
  if (!article) return createNotFoundPage();
  const section = document.createElement('section');
  section.className = 'article-page article-page--editorial';
  section.dataset.reveal = 'scale';
  section.setAttribute('aria-labelledby', 'article-title');
  const headings = article.content.filter(block => block.type === 'h2').map(block => ({ ...block, id: slugify(block.text) }));
  const related = article.relatedSlugs.map(getArticleBySlug).filter(Boolean);
  section.innerHTML = `<div class="container editorial-layout"><article class="editorial-main"><header class="article-header"><p class="eyebrow">${escapeHtml(categoryMeta[article.category].title)}</p><h1 id="article-title">${escapeHtml(article.title)}</h1>${article.publishedAt ? `<p class="article-meta">${escapeHtml(article.publishedAt)}${article.author ? ` — ${escapeHtml(article.author)}` : ''}</p>` : ''}</header><div class="article-body"></div><nav class="article-pagination" aria-label="Навигация по материалам"></nav><section class="article-tags" aria-label="Теги материала"><span>Теги:</span>${article.tags.map(tag => `<span>${escapeHtml(tag)}</span>`).join('')}</section>${related.length ? '<section class="article-related-inline"><h2>Читайте также</h2><div></div></section>' : ''}</article><aside class="editorial-sidebar" aria-label="Навигация по статье"><details class="editorial-toc" open><summary>На этой странице</summary><nav aria-label="Оглавление">${headings.map(h => `<a href="#${escapeAttribute(h.id)}">${escapeHtml(h.text)}</a>`).join('')}</nav></details><div class="editorial-search"></div></aside></div>`;
  const categoryLink = document.createElement('a');
  categoryLink.className = 'article-category-link';
  categoryLink.href = new URL('../../learn/', import.meta.url).href;
  categoryLink.innerHTML = `${iconSvg('arrow-left')}<span>Все материалы</span>`;
  categoryLink.setAttribute('aria-label', 'Вернуться ко всем материалам');
  section.querySelector('.article-header .eyebrow').replaceChildren(categoryLink);
  section.querySelector('.editorial-search').remove();
  if (window.matchMedia('(max-width: 900px)').matches) section.querySelector('.editorial-toc').open = false;
  const body = section.querySelector('.article-body');
  article.content.forEach(block => body.append(createArticleBlock(block)));
  section.querySelector('.article-pagination').remove();
  section.querySelector('.article-tags').remove();
  const relatedContainer = section.querySelector('.article-related-inline > div');
  if (relatedContainer) {
    relatedContainer.className = 'materials-grid';
    related.forEach(item => {
      const card = createArticleCard(item);
      card.removeAttribute('data-reveal');
      relatedContainer.append(card);
    });
  }
  const back = categoryLink.cloneNode(true);
  back.classList.add('article-return');
  section.querySelector('.editorial-main').append(back);
  return section;
}

export function createSearchPage(searchParams) {
  const query = (searchParams.get('q') || '').trim();
  const results = findArticles(query);
  const section = document.createElement('section');
  section.className = 'search-page section';
  section.dataset.reveal = 'scale';
  section.setAttribute('aria-labelledby', 'search-title');
  const heading = query ? `Результаты поиска: «${query}»` : 'Поиск по материалам';
  section.innerHTML = `<div class="container"><header class="inner-page-header inner-page-header--compact"><h1 id="search-title">${escapeHtml(heading)}</h1><p>${query ? 'Ищем по материалам, которые уже есть на сайте' : 'Найдите подсказку про клиентов, встречи или задачи'}</p></header><div class="search-page__form"></div><div class="article-grid article-grid--search"></div></div>`;
  section.querySelector('.search-page__form').append(createSearchForm({ query }));
  if (query) {
    const count = results.length;
    const form = count % 100 >= 11 && count % 100 <= 14 ? 'материалов'
      : count % 10 === 1 ? 'материал' : count % 10 >= 2 && count % 10 <= 4 ? 'материала' : 'материалов';
    section.querySelector('.inner-page-header p').textContent = count
      ? `По вашему запросу ${count} ${form}. Выберите подходящую статью.`
      : 'Совпадений нет. Попробуйте более короткий запрос или другое слово.';
  }
  const grid = section.querySelector('.article-grid');
  if (!query) grid.append(createEmptyState('Начните поиск', 'Например: «встреча», «клиент» или «задача»'));
  else if (!results.length) grid.append(createEmptyState('Ничего не найдено', 'Попробуйте другое слово или загляните в материалы и инструкции'));
  else results.forEach(result => grid.append(createArticleCard(result)));
  if (!query || !results.length) {
    const suggestions = document.createElement('nav');
    suggestions.className = 'search-suggestions';
    suggestions.setAttribute('aria-label', 'Популярные темы материалов');
    for (const topic of ['Клиенты', 'Встречи', 'Задачи']) {
      const link = document.createElement('a');
      const url = new URL('../../search/', import.meta.url);
      url.searchParams.set('q', topic === 'Клиенты' ? 'клиент' : topic === 'Встречи' ? 'встреч' : 'задач');
      link.href = url.href;
      link.className = 'button button--outline';
      link.textContent = topic;
      suggestions.append(link);
    }
    const all = document.createElement('a');
    all.href = new URL('../../learn/', import.meta.url).href;
    all.className = 'text-link';
    all.textContent = 'Открыть все материалы';
    const empty = grid.querySelector('.empty-state');
    empty.append(suggestions, all);
  }
  return section;
}

export function createPricingPage() {
  const plans = [
    {
      name: 'Бесплатно',
      price: '0 ₽',
      period: 'Всегда бесплатно',
      description: 'Самые полезные возможности Simple CRM доступны сразу — можно собрать клиентов, встречи и задачи без подписки.',
      cta: 'Начать',
      features: [
        ['Доступно сразу', 'Соберите всех клиентов в одном месте — без лимитов на знакомство с продуктом.'],
        ['Сегодня', 'Откройте расписание и быстро увидьте, с кем нужно связаться.'],
        ['Когда база растёт', 'Добавляйте контекст: статусы, встречи, задачи и документы.'],
        ['Не теряйте связь', 'Фиксируйте следующий шаг, пока договорённость ещё свежая.'],
      ],
    },
    {
      name: 'Pro',
      price: '1 490 ₽ / месяц',
      period: 'Оплата помесячно',
      description: 'Для расширенной работы с клиентами и помощниками: общая история, роли, документы и приоритетная поддержка.',
      cta: 'Попробовать Pro',
      featured: true,
      features: [
        ['Всё из бесплатного, плюс…', 'Командный контекст, роли сотрудников и общая история клиента.'],
        ['После каждого разговора', 'Сохраняйте важные итоги, чтобы помнить, о чём договорились.'],
        ['Когда появляется новый клиент', 'Создавайте карточку, встречу и задачу за несколько касаний.'],
        ['Когда нужен обзор', 'Смотрите клиентов, задачи, документы и оплаты на большом рабочем экране.'],
      ],
    },
  ];
  const section = document.createElement('section');
  section.className = 'inner-page pricing-page pricing-page--dextr';
  section.setAttribute('aria-labelledby', 'pricing-title');
  section.innerHTML = `
    <div class="pricing-page__hero">
      <div class="container" data-reveal="scale">
        <h1 id="pricing-title">Тарифы Simple CRM</h1>
        <p>Попробуйте все возможности Pro бесплатно 14 дней — без обязательств и сложного выбора на старте.</p>
      </div>
    </div>
    <div class="container pricing-page__cards pricing-page__cards--two">
      ${plans.map(plan => `
        <article class="pricing-plan${plan.featured ? ' pricing-plan--featured' : ''}" data-reveal="scale">
          <p class="pricing-plan__name">${escapeHtml(plan.name)}</p>
          <p class="pricing-plan__description">${escapeHtml(plan.description)}</p>
          <h2>${escapeHtml(plan.price)}<small>${escapeHtml(plan.period)}</small></h2>
          <a class="button ${plan.featured ? 'button--primary' : 'button--outline'}" href="/support/#support-message">${escapeHtml(plan.cta)}</a>
          <div class="pricing-plan__timeline">
            ${plan.features.map(([label, text]) => `<div><span>${iconSvg('check')}</span><p><strong>${escapeHtml(label)}</strong>${escapeHtml(text)}</p></div>`).join('')}
          </div>
        </article>
      `).join('')}
    </div>
    <section class="pricing-pledge">
      <div class="container">
        <div class="pricing-pledge__card" data-reveal="scale">
          <p class="eyebrow">Перед началом работы</p>
          <h2>Уточните условия хранения и доступа</h2>
          <p>Не переносите чувствительные сведения клиентов, пока не проверили актуальные условия обработки данных и права доступа для вашей практики.</p>
          <a class="text-link" href="/privacy/">Прочитать о конфиденциальности ${iconSvg('arrow-right')}</a>
        </div>
      </div>
    </section>`;
  return section;
}

export function createFaqPage() {
  const questions = [
  [
    "Что такое Simple CRM?",
    "Клиентская база для частной практики: психологов, коучей, тренеров и других специалистов. В приложении связаны клиенты, встречи, задачи, переписка, документы и оплаты.",
    "about/",
    "О приложении"
  ],
  [
    "Подойдёт ли Simple CRM, если я работаю один?",
    "Да. Основной сценарий рассчитан на специалиста частной практики: один человек ведёт клиентов, встречи и следующие шаги. Совместную работу и роли нужно сверить с вашей версией приложения.",
    "about/",
    "Как помогает Simple CRM"
  ],
  [
    "На каких устройствах работает Simple CRM?",
    "На сайте показаны мобильные и большие рабочие экраны, но доступные платформы и способ установки ещё уточняются. Не ориентируйтесь на макет как на подтверждение готовой версии.",
    "pricing/",
    "Условия доступа"
  ],
  [
    "Нужно ли клиенту устанавливать приложение?",
    "В проектном сценарии клиент выбирает время на отдельной странице. Требования к приложению для клиента и реальная доступность такого сценария ещё уточняются.",
    "about/",
    "Посмотреть сценарии"
  ],
  [
    "Можно ли дать клиенту ссылку для записи?",
    "Выбор времени по ссылке показан как проектируемый сценарий. Пока на этом сайте нельзя создать настоящую запись или отправить рабочую ссылку клиенту.",
    "about/",
    "Как может выглядеть запись"
  ],
  [
    "Simple CRM сама отправляет напоминания?",
    "В примерах специалист сохраняет следующий контакт и сам решает, что отправить клиенту. Автоматические сообщения и доступные каналы не подтверждены.",
    "how-to/create-follow-up-task/",
    "Запланировать следующий контакт"
  ],
  [
    "Клиент обещал записаться позже. Как не потерять связь?",
    "Создайте задачу связаться с клиентом, укажите дату и привяжите его карточку. Когда вернётесь к задаче, рядом будут контакты и история договорённостей. Сообщение клиенту отправляете вы.",
    "how-to/create-follow-up-task/",
    "Создать задачу для следующего контакта"
  ],
  [
    "Что делать, если клиент не пришёл или перенёс встречу?",
    "Сначала свяжитесь с клиентом и согласуйте дальнейшие действия. Держите актуальные дату, время и место в записи встречи. Если новую дату ещё не выбрали, создайте задачу вернуться к вопросу.",
    "how-to/prepare-meeting/",
    "Проверить детали встречи"
  ],
  [
    "Как следить за оплатой и не забывать напомнить?",
    "Проверяйте счета, которые ждут оплаты, и историю платежей в Simple CRM. Если нужно уточнить перевод, создайте задачу с датой и свяжите её с клиентом. Это помогает организовать проверку, но не заменяет сам разговор об оплате.",
    "how-to/create-follow-up-task/",
    "Поставить задачу с датой"
  ],
  [
    "Simple CRM бесплатная?",
    "Базовый режим можно использовать бесплатно. Pro стоит 1 490 ₽ в месяц и открывает дополнительные возможности: роли, общую историю, документы и приоритетную поддержку. Pro можно попробовать бесплатно 14 дней.",
    "pricing/",
    "Сравнить тарифы"
  ],
  [
    "Как добавить клиента?",
    "В показанном сценарии можно начать с одной карточки клиента и связать с ней встречу и следующий шаг. Возможности переноса готовой базы и поддерживаемые форматы ещё уточняются.",
    "learn/client-context/",
    "Что хранить в карточке клиента"
  ],
  [
    "Можно ли объединять клиентов по группам и тегам?",
    "Такой способ организации показан в проектных материалах. Набор доступных статусов, тегов и фильтров нужно сверить с вашей версией приложения.",
    "learn/client-context/",
    "Навести порядок в клиентской базе"
  ],
  [
    "Можно ли перенести данные?",
    "Форматы и порядок переноса готовой базы ещё уточняются. Не загружайте реальные сведения клиентов в демонстрационные формы на этом сайте.",
    "support/",
    "Помощь с переносом данных"
  ],
  [
    "Как Simple CRM относится к приватности?",
    "Официальные условия хранения, обработки и удаления данных ещё не подтверждены. До их публикации не вносите реальные сведения клиентов. На отдельной странице перечислено, что именно нужно проверить до начала работы.",
    "privacy/",
    "Что проверить о данных"
  ],
  [
    "Где посмотреть изменения и новые версии?",
    "В разделе «Версии» собраны изменения по выпускам: новые возможности, улучшения и исправления.",
    "releases/",
    "История обновлений"
  ]
];
  const section = document.createElement('section');
  section.className = 'inner-page faq-page faq-page--dextr';
  section.setAttribute('aria-labelledby', 'faq-title');
  section.innerHTML = `
    <div class="faq-page__hero"><div class="container" data-reveal="scale"><h1 id="faq-title">Частые вопросы</h1><p>О клиентах, записях, переносах, оплатах и начале работы в Simple CRM.</p><label class="faq-search" aria-label="Поиск по вопросам"><svg class="ui-icon" aria-hidden="true"><use href="#icon-search"></use></svg><input data-faq-search type="search" placeholder="Найти вопрос или ответ…" autocomplete="off" /></label><p class="faq-search__status" data-faq-status aria-live="polite"></p></div></div>
    <div class="container faq-list-wrap">
      <div class="faq-list">
        ${questions.map(([question, answer, href, linkLabel], index) => `<details class="faq-rich-item" data-faq-item data-search="${escapeAttribute(`${question} ${answer}`.toLocaleLowerCase('ru-RU'))}" data-reveal="slide-left"${index === 0 ? ' open' : ''}><summary>${escapeHtml(question)}</summary><p>${escapeHtml(answer)}<br /><a class="text-link" href="${escapeAttribute(new URL(`../../${href}`, import.meta.url).href)}">${escapeHtml(linkLabel)} ${iconSvg('arrow-right')}</a></p></details>`).join('')}
      </div>
    </div>`;
  return section;
}

export function createAboutPage() {
  const section = document.createElement('section');
  section.className = 'company-page';
  section.setAttribute('aria-labelledby', 'about-title');
  section.innerHTML = `
    <div class="container company-page__inner">
      <header class="company-page__hero">
        <div class="company-page__hero-copy" data-reveal="slide-left">
        <h1 id="about-title">Для практики, в которой важен каждый человек</h1>
        <p>Simple CRM — клиентская база для психологов, коучей, тренеров и других специалистов частной практики. Записи, задачи, переписка и расчёты собраны рядом: для самостоятельной работы и работы с помощником.</p>
        </div>
        <div class="company-page__hero-screens" aria-label="Возможности Simple CRM"></div>
      </header>
      <section class="company-page__team" aria-labelledby="team-title" data-reveal="scale">
        <div class="company-page__team-intro">
        <h2 id="team-title">В центре — человек.<br /><span>Всё важное — рядом.</span></h2>
        <p>Вы работаете с людьми, а не со списком дел. Пусть организационные вопросы — кому написать, когда встретиться и что с оплатой — будут под рукой, не занимая всё ваше внимание.</p>
        </div>
        <div class="company-page__principles">
          <div><h3>Внимательнее к договорённостям</h3><p>Перед встречей можно вернуться к переписке и уточнить, на чём вы остановились.</p></div>
          <div><h3>Спокойнее между встречами</h3><p>Следующий контакт и напоминание об оплате можно записать в задачи, а не держать в голове.</p></div>
        </div>
      </section>
      <section class="company-page__news" aria-labelledby="company-news-title">
        <header data-reveal="scale"><h2 id="company-news-title">Обновления Simple CRM</h2><p>Новые возможности и заметки о том, что изменилось.</p></header>
        <div class="article-grid"></div>
      </section>
    </div>`;
  [
    ['client-overview.jpg', 'Актуальная карточка клиента'],
    ['today-schedule.jpg', 'Актуальное расписание встреч'],
  ].forEach(([file, alt], index) => {
    const src = new URL(`../../assets/product-screens/${file}`, import.meta.url).href;
    const device = createProductDeviceMockup({ mode: 'image', device: 'phone', image: { src, alt } });
    device.dataset.reveal = 'rise';
    device.dataset.delay = String(index * 140);
    section.querySelector('.company-page__hero-screens').append(device);
  });
  getArticlesByCategory('announcements').slice(0, 3).forEach(article => {
    section.querySelector('.article-grid').append(createArticleCard(article));
  });
  return section;
}

export function createSupportPage() {
  return createSupportCenter();
}

export function createPrivacyPage() {
  const chapters = [
    {
      id: 'before-use',
      title: '1. Что важно до начала работы',
      paragraphs: ['Официальные условия хранения, обработки и удаления данных Simple CRM ещё не подтверждены владельцем продукта. Эта страница — памятка о вопросах, которые нужно проверить, а не действующая юридическая политика.', 'До публикации утверждённых условий не вносите в демонстрационные экраны реальные имена, контакты, переписку, документы, заметки о здоровье или платёжные данные.'],
    },
    {
      id: 'data-categories',
      title: '2. Какие данные могут понадобиться',
      paragraphs: ['Точный состав данных зависит от фактически доступных функций. До запуска нужно отдельно подтвердить каждую категорию и зачем она нужна.'],
      items: ['Данные для входа и связи с владельцем аккаунта', 'Карточки клиентов, встречи, задачи, документы и расчёты — только если эти функции войдут в выпуск', 'Техническая информация о версии, устройстве и ошибках — если будет включена диагностика', 'Информация о покупке — только если будут утверждены подписка и способ оплаты'],
    },
    {
      id: 'before-approval',
      title: '3. Что нужно подтвердить',
      paragraphs: ['Перед тем как доверять Simple CRM реальную клиентскую базу, владелец продукта должен опубликовать конкретные ответы.'],
      items: ['Где хранятся данные и кто имеет к ним доступ', 'Какие внешние сервисы участвуют в хранении, аналитике, платежах или сообщениях', 'Как защищена передача и как разделены права доступа', 'Сколько хранятся данные и как их экспортировать или удалить', 'Кто и как отвечает на вопросы о данных и инцидентах'],
    },
    {
      id: 'current-site',
      title: '4. Что происходит на этом сайте',
      paragraphs: ['Текущий лендинг показывает примеры интерфейса с вымышленными данными. Здесь нет действующей регистрации, оплаты подписки, записи клиента или формы, которая отправляет обращение в команду.', 'Изображения карточек, встреч и счетов на сайте не являются реальными записями клиентов.'],
    },
    {
      id: 'professional-responsibility',
      title: '5. Ответственность специалиста',
      paragraphs: ['Даже после утверждения условий сам специалист отвечает за то, какие сведения о клиентах он собирает, какое согласие для этого нужно и кому он даёт доступ. Для чувствительных записей могут действовать дополнительные правила профессии и закона.'],
    },
    {
      id: 'official-policy',
      title: '6. Где будет официальная политика',
      paragraphs: ['Перед открытием регистрации или передачей реальных данных на этой странице должны появиться утверждённая политика, дата её действия и реальный канал для вопросов. Сейчас такой канал не подтверждён.'],
    },
  ];
  const section = document.createElement('section');
  section.className = 'inner-page section document-page document-page--dextr privacy-page';
  section.dataset.reveal = 'scale';
  section.setAttribute('aria-labelledby', 'privacy-title');
  section.innerHTML = `<div class="container document-single editorial-layout"><article class="document-main"><header class="document-header"><h1 id="privacy-title">Конфиденциальность и данные</h1><p class="document-updated">Статус: условия ещё уточняются</p><p class="document-lead">Здесь собрано, что нужно проверить до того, как в Simple CRM можно будет передавать реальные данные клиентов. До утверждения официальной политики используйте только вымышленные примеры.</p></header><div class="document-body">${chapters.map(chapter => `<section id="${escapeAttribute(chapter.id)}"><h2>${escapeHtml(chapter.title)}</h2>${chapter.paragraphs.map(paragraph => `<p>${escapeHtml(paragraph)}</p>`).join('')}${chapter.items ? `<ul>${chapter.items.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul>` : ''}</section>`).join('')}</div></article><aside class="editorial-sidebar"><details class="editorial-toc" open><summary>На этой странице</summary><nav aria-label="Разделы о данных">${chapters.map(c => `<a href="#${escapeAttribute(c.id)}">${escapeHtml(c.title)}</a>`).join('')}</nav></details></aside></div>`;
  if (window.matchMedia('(max-width: 900px)').matches) section.querySelector('.editorial-toc').open = false;
  return section;
}

export function createReleasesPage() {
  const releases = [
    {
      version: '2.2.3', date: '14 апреля 2026', label: 'Проектная версия',
      groups: [
        ['Новое', ['Добавили массовую привязку клиентов к месту встречи, офису или выбранной локации прямо из экрана деталей.']],
      ],
    },
    {
      version: '2.2.0', date: '9 апреля 2026',
      groups: [
        ['Новое', ['Обновили главный экран со статистикой: встречи, задачи, клиенты, документы и оплаты теперь видны быстрее.', 'Добавили компактный блок быстрых действий для создания клиента, встречи, задачи и сообщения.', 'Раздел задач стал плотнее и показывает общий прогресс по договорённостям.']],
        ['Изменения', ['Заголовки разделов стали ближе к iOS-паттернам и лучше читаются на светлом фоне.']],
      ],
    },
    {
      version: '2.1.0', date: '1 апреля 2026',
      groups: [
        ['Новое', ['Даты клиента теперь можно редактировать из карточки и видеть рядом с расписанием.', 'Напоминания по важным датам можно быстро создать из карточки клиента.']],
        ['Улучшения', ['Встречу можно завершить вручную из меню действий.', 'Действия на главном экране стали быстрее и понятнее.']],
      ],
    },
    {
      version: '2.0.4', date: '26 марта 2026',
      groups: [
        ['Улучшения', ['Настройки синхронизации теперь показывают подсказки, если часть клиентов не была импортирована из-за неполных данных.', 'Поиск стал возвращать более релевантные результаты и лучше работает с длинной клиентской базой.']],
      ],
    },
    {
      version: '2.0.1', date: '8 марта 2026',
      groups: [
        ['Новое', ['Добавили быстрый просмотр материалов и документов, связанных с клиентом, прямо из карточки.', 'При открытии документа сохраняется связь с клиентом и задачей, чтобы команда не теряла контекст.']],
        ['Примечание', ['Работа с файлами показана в проектных материалах. Какие разрешения запрашивает доступная сборка и как обрабатывает документы, нужно подтвердить перед использованием.']],
      ],
    },
    {
      version: '2.0.0', date: '6 марта 2026',
      groups: [
        ['Новое', ['Обновили рабочую модель Simple CRM: клиенты, встречи, задачи, сообщения и документы теперь собираются в одну связанную историю.', 'Добавили большой экран для ежедневной работы с клиентами и быстрых действий.', 'Сделали удобнее работу с событиями, локациями и следующим шагом после встречи.']],
        ['Статус', ['Доступность функций и условия доступа к ним требуют подтверждения владельца продукта.']],
      ],
    },
  ];
  const section = document.createElement('section');
  section.className = 'inner-page section releases-page releases-page--dextr-notes';
  section.dataset.reveal = 'scale';
  section.setAttribute('aria-labelledby', 'releases-title');
section.innerHTML = `<div class="container releases-layout"><article class="releases-main"><header class="releases-header"><h1 id="releases-title">Заметки о версиях Simple CRM</h1><p>История собрана по проектным материалам. Доступность отдельных функций зависит от версии приложения и требует подтверждения перед началом работы.</p></header><div class="release-list">${releases.map((release, index) => `<section class="release-entry" id="release-${escapeAttribute(release.version.replaceAll('.', '-'))}" data-reveal="slide-up"><div class="release-entry__heading"><div><h2>${escapeHtml(release.version)}</h2><p>${escapeHtml(release.date)}</p></div>${release.label ? `<span>${escapeHtml(release.label)}</span>` : ''}</div>${release.groups.map(([title, items]) => `<section class="release-group" id="release-${escapeAttribute(release.version.replaceAll('.', '-'))}-${slugify(title)}"><h3>${escapeHtml(title)}</h3><ul>${items.map(item => `<li><span>${escapeHtml(item)}</span></li>`).join('')}</ul></section>`).join('')}${index === 0 ? '<p><a class="text-link" href="/announcements/">Открыть обновления ' + iconSvg('arrow-right') + '</a></p>' : ''}</section>`).join('')}</div></article><aside class="releases-toc" data-reveal="slide-right"><details class="releases-toc__disclosure" open><summary>На этой странице</summary><nav aria-label="Оглавление релизов">${releases.map(release => `<a class="releases-toc__version" href="#release-${escapeAttribute(release.version.replaceAll('.', '-'))}">${escapeHtml(release.version)}</a>${release.groups.map(([title]) => `<a class="releases-toc__child" href="#release-${escapeAttribute(release.version.replaceAll('.', '-'))}-${slugify(title)}">${escapeHtml(title)}</a>`).join('')}`).join('')}</nav></details></aside></div>`;
  if (window.matchMedia('(max-width: 1023px)').matches) section.querySelector('.releases-toc__disclosure').open = false;
  return section;
}

function createCrossPromo(meta, posts) {
  const card = document.createElement('article');
  card.className = 'archive-category';
  const visualByCategory = {
    learn: 'cover-followup.png',
    'how-to': 'cover-meeting.png',
    announcements: 'announcements-signal.png',
  };
  const visual = document.createElement('div');
  visual.className = 'archive-category__visual';
  const backdrop = document.createElement('img');
  backdrop.src = new URL(`../../assets/editorial/${visualByCategory[meta.href.split('/')[1]] || 'cover-client.png'}`, import.meta.url).href;
  backdrop.alt = '';
  backdrop.loading = 'lazy';
  backdrop.decoding = 'async';
  visual.append(backdrop);
  const screen = posts[0]?.cover?.image;
  if (screen?.src) {
    const phone = document.createElement('img');
    phone.className = 'archive-category__screen';
    phone.src = screen.src;
    phone.alt = screen.alt || '';
    phone.loading = 'lazy';
    phone.decoding = 'async';
    visual.append(phone);
  }
  card.append(visual);
  const titles = posts.slice(0, 2).map(post => `<li><a href="${escapeAttribute(post.href)}">${iconSvg('arrow-right')}<span>${escapeHtml(post.title)}</span></a></li>`).join('');
  const body = document.createElement('div');
  body.className = 'archive-category__body';
  body.innerHTML = `<h2><a href="${escapeAttribute(meta.href)}">${escapeHtml(meta.title)}</a></h2><ul>${titles}</ul><a class="text-link" href="${escapeAttribute(meta.href)}">Все материалы ${iconSvg('arrow-right')}</a>`;
  card.append(body);
  return card;
}

function createArticleBlock(block) {
  if (block.type === 'h2') {
    const heading = document.createElement('h2');
    heading.id = slugify(block.text);
    heading.textContent = block.text;
    return heading;
  }
  if (block.type === 'mockup') {
    const wrapper = document.createElement('div');
    wrapper.className = 'article-body__mockup';
    const image = new URL(`../../assets/product-screens/${block.screen || 'client-overview.jpg'}`, import.meta.url).href;
    wrapper.append(createProductDeviceMockup({ mode: 'image', device: 'phone', image: { src: image }, alt: `${block.label} в Simple CRM` }));
    return wrapper;
  }
  const paragraph = document.createElement('p');
  paragraph.textContent = block.text;
  return paragraph;
}

function createPaginationLink(label, article, icon) {
  const link = document.createElement('a');
  link.href = article.href;
  link.innerHTML = `${iconSvg(icon)} ${escapeHtml(label)}`;
  return link;
}

function createRelatedLink(article) {
  const link = document.createElement('a');
  link.href = article.href;
  link.innerHTML = `<span>${escapeHtml(categoryMeta[article.category].title)}</span>${escapeHtml(article.title)}`;
  return link;
}

function createEmptyState(title, copy) {
  const element = document.createElement('div');
  element.className = 'empty-state';
  element.innerHTML = `<h3>${escapeHtml(title)}</h3><p>${escapeHtml(copy)}</p>`;
  return element;
}

function createNotFoundPage() {
  const section = document.createElement('section');
  section.className = 'inner-page section';
  section.dataset.reveal = 'scale';
  section.innerHTML = `<div class="container"><header class="inner-page-header"><h1>Материал не найден</h1><p>Проверьте ссылку или вернитесь к списку материалов.</p><a class="button button--primary" href="/learn/">Открыть материалы</a></header></div>`;
  return section;
}

function slugify(value) {
  return value.toLocaleLowerCase('ru').replace(/[^a-zа-яё0-9]+/gi, '-').replace(/(^-|-$)/g, '');
}

function escapeHtml(value) { return String(value).replace(/[&<>'"]/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#039;', '"': '&quot;' })[character]); }
function escapeAttribute(value) { return escapeHtml(value); }
