import { createArticleCard } from './article-card.js?v=20260824-28';
import { iconSvg } from './icons.js?v=20260824-28';
import { createProductDeviceMockup } from './product-device-mockup.js';
import { createSearchForm } from './search-form.js';
import { articles, categoryMeta, findArticles, getArticleBySlug, getArticlesByCategory } from '../data/articles.js?v=20260824-28';

export function createContentHubPage(category) {
  const meta = categoryMeta[category];
  const posts = getArticlesByCategory(category);
  const section = document.createElement('section');
  section.className = 'content-hub content-hub--rich';
  section.setAttribute('aria-labelledby', 'hub-title');
  section.innerHTML = `
    <div class="content-hub__hero"><div class="container" data-reveal="scale"><h1 id="hub-title">${escapeHtml(meta.title)}</h1><p>${escapeHtml(meta.description)}</p><div class="content-hub__search"></div></div></div>
    <div class="container">
      <nav class="content-hub__tabs" aria-label="Разделы материалов" data-reveal="scale">${Object.entries(categoryMeta).map(([key, item]) => `<a href="${escapeAttribute(item.href)}"${key === category ? ' class="is-current" aria-current="page"' : ''}>${escapeHtml(item.title)}</a>`).join('')}</nav>
      <section class="content-hub__articles"><header data-reveal="slide-left"><h2>${category === 'learn' ? 'Рабочие сценарии' : category === 'how-to' ? 'Пошаговые инструкции' : 'Последние обновления'}</h2><p>${category === 'learn' ? 'Практические материалы о клиентах, встречах и следующем шаге.' : category === 'how-to' ? 'Короткие последовательности действий внутри продукта.' : 'Что изменилось в продукте и как использовать новые возможности.'}</p></header><div class="article-grid article-grid--hub"></div></section>
      <section class="content-hub__other" data-reveal="scale"><h2>Другие разделы</h2><div class="cross-promo-grid"></div></section>
    </div>`;
  section.querySelector('.content-hub__search').append(createSearchForm());
  const promos = Object.entries(categoryMeta).filter(([key]) => key !== category).map(([key, item]) => ({ key, ...item }));
  promos.forEach(item => section.querySelector('.cross-promo-grid').append(createCrossPromo(item, getArticlesByCategory(item.key))));
  const grid = section.querySelector('.article-grid');
  if (posts.length) posts.forEach((post, index) => { const card = createArticleCard(post); if (index === 0) card.classList.add('article-card--lead'); grid.append(card); });
  else grid.append(createEmptyState('В этом разделе пока нет материалов', 'Откройте инструкции или материалы о работе с клиентами'));
  return section;
}

export function createArticleLayout(slug) {
  const article = getArticleBySlug(slug);
  if (!article) return createNotFoundPage();
  const section = document.createElement('section');
  section.className = 'article-page section';
  section.dataset.reveal = 'scale';
  section.setAttribute('aria-labelledby', 'article-title');
  const headings = article.content.filter(block => block.type === 'h2').map(block => ({ ...block, id: slugify(block.text) }));
  const related = article.relatedSlugs.map(getArticleBySlug).filter(Boolean);
  const siblings = getArticlesByCategory(article.category);
  const position = siblings.findIndex(item => item.slug === article.slug);
  const previous = siblings[position - 1];
  const next = siblings[position + 1];
  section.innerHTML = `<div class="container article-layout"><article class="article-main"><header class="article-header"><p class="eyebrow">${escapeHtml(categoryMeta[article.category].title)}</p><h1 id="article-title">${escapeHtml(article.title)}</h1>${article.publishedAt ? `<p class="article-meta">${escapeHtml(article.publishedAt)}${article.author ? ` — ${escapeHtml(article.author)}` : ''}</p>` : ''}</header><div class="article-body"></div><nav class="article-pagination" aria-label="Навигация по материалам"></nav><section class="article-tags" aria-label="Теги материала"><span>Теги:</span>${article.tags.map(tag => `<span>${escapeHtml(tag)}</span>`).join('')}</section></article><aside class="article-sidebar"><div class="article-toc"><h2>На этой странице</h2><nav aria-label="Оглавление"><ol>${headings.map(item => `<li><a href="#${escapeAttribute(item.id)}">${escapeHtml(item.text)}</a></li>`).join('')}</ol></nav></div><div class="article-sidebar__search"></div>${related.length ? '<section class="article-sidebar__related"><h2>Читайте также</h2><div></div></section>' : ''}</aside></div>`;
  const body = section.querySelector('.article-body');
  article.content.forEach(block => body.append(createArticleBlock(block)));
  const pagination = section.querySelector('.article-pagination');
  if (previous) pagination.append(createPaginationLink('Предыдущий материал', previous, 'arrow-left'));
  if (next) pagination.append(createPaginationLink('Следующий материал', next, 'arrow-right'));
  section.querySelector('.article-sidebar__search').append(createSearchForm({ compact: true }));
  const relatedContainer = section.querySelector('.article-sidebar__related > div');
  if (relatedContainer) related.forEach(item => relatedContainer.append(createRelatedLink(item)));
  return section;
}

export function createSearchPage(searchParams) {
  const query = searchParams.get('q') || '';
  const results = findArticles(query);
  const section = document.createElement('section');
  section.className = 'search-page section';
  section.dataset.reveal = 'scale';
  section.setAttribute('aria-labelledby', 'search-title');
  const heading = query ? `Результаты поиска: «${query}»` : 'Поиск по материалам';
  section.innerHTML = `<div class="container"><header class="inner-page-header inner-page-header--compact"><h1 id="search-title">${escapeHtml(heading)}</h1><p>${query ? 'Ищем по материалам, которые уже есть на сайте' : 'Найдите подсказку про клиентов, встречи или задачи'}</p></header><div class="search-page__form"></div><div class="article-grid article-grid--search"></div></div>`;
  section.querySelector('.search-page__form').append(createSearchForm({ query }));
  const grid = section.querySelector('.article-grid');
  if (!query) grid.append(createEmptyState('Начните поиск', 'Например: «встреча», «клиент» или «задача»'));
  else if (!results.length) grid.append(createEmptyState('Ничего не найдено', 'Попробуйте другое слово или загляните в материалы и инструкции'));
  else results.forEach(result => grid.append(createArticleCard(result)));
  return section;
}

export function createPricingPage() {
  const plans = [
    { name: 'Старт', monthly: 990, yearly: 790, description: 'Для самостоятельной работы с клиентами.', users: '1 пользователь', features: ['До 500 клиентов', 'Встречи и задачи', 'Единая история клиента', 'Импорт клиентской базы'] },
    { name: 'Команда', monthly: 2990, yearly: 2390, description: 'Для небольшого отдела с общим контекстом.', users: 'До 5 пользователей', featured: true, badge: 'Выбирают чаще', features: ['Всё из тарифа «Старт»', 'Сообщения и документы', 'Счета и оплаты', 'Роли сотрудников'] },
    { name: 'Бизнес', monthly: 6990, yearly: 5590, description: 'Для нескольких процессов и расширенного контроля.', users: 'До 15 пользователей', features: ['Всё из тарифа «Команда»', 'Расширенные роли', 'Командная аналитика', 'Приоритетная поддержка'] },
  ];
  const comparison = [
    ['Клиенты и единая история', true, true, true],
    ['Встречи и задачи', true, true, true],
    ['Сообщения и документы', false, true, true],
    ['Счета и оплаты', false, true, true],
    ['Роли сотрудников', false, true, true],
    ['Командная аналитика', false, false, true],
    ['Приоритетная поддержка', false, false, true],
  ];
  const section = document.createElement('section');
  section.className = 'inner-page pricing-page pricing-page--rich';
  section.setAttribute('aria-labelledby', 'pricing-title');
  section.innerHTML = `
    <div class="pricing-page__hero">
      <div class="container" data-reveal="scale">
        <h1 id="pricing-title">Цена зависит только от размера вашей команды</h1>
        <p>Выберите формат для своей команды и меняйте тариф по мере роста — без сложной настройки и скрытых условий.</p>
        <div class="billing-toggle" role="group" aria-label="Период оплаты" data-billing-toggle>
          <button class="is-active" type="button" data-period="monthly">Ежемесячно</button>
          <button type="button" data-period="yearly">За год <span>экономия 20%</span></button>
        </div>
      </div>
    </div>
    <div class="container pricing-page__cards">
      ${plans.map(plan => `
        <article class="pricing-plan${plan.featured ? ' pricing-plan--featured' : ''}" data-reveal="scale">
          ${plan.badge ? `<p class="pricing-plan__badge">${escapeHtml(plan.badge)}</p>` : ''}
          <p class="pricing-plan__name">${escapeHtml(plan.name)}</p>
          <h2><span data-price data-monthly="${plan.monthly}" data-yearly="${plan.yearly}">${new Intl.NumberFormat('ru-RU').format(plan.monthly)}</span> ₽<small>в месяц</small></h2>
          <p class="pricing-plan__description">${escapeHtml(plan.description)}</p>
          <p class="pricing-plan__users">${escapeHtml(plan.users)}</p>
          <ul>${plan.features.map(feature => `<li>${iconSvg('check')}<span>${escapeHtml(feature)}</span></li>`).join('')}</ul>
          <a class="button ${plan.featured ? 'button--primary' : 'button--outline'}" href="/SimpleCRM_Landing/#demo">Начать бесплатно</a>
        </article>
      `).join('')}
    </div>
    <p class="container pricing-page__note">Стоимость указана за месяц, НДС включён. Годовой тариф оплачивается одним платежом.</p>
    <section class="pricing-compare">
      <div class="container">
        <header data-reveal="slide-left"><h2>Сравните возможности без мелкого шрифта</h2><p>Основные инструменты доступны сразу. Расширенные функции подключаются вместе с ростом команды.</p></header>
        <div class="pricing-compare__table" role="table" aria-label="Сравнение тарифов" data-reveal="scale">
          <div class="pricing-compare__row pricing-compare__row--head" role="row"><strong role="columnheader">Возможность</strong><strong role="columnheader">Старт</strong><strong role="columnheader">Команда</strong><strong role="columnheader">Бизнес</strong></div>
          ${comparison.map(row => `<div class="pricing-compare__row" role="row"><span role="cell">${escapeHtml(row[0])}</span>${row.slice(1).map((value, index) => `<span role="cell" data-plan="${['Старт', 'Команда', 'Бизнес'][index]}" aria-label="${value ? 'Доступно' : 'Недоступно'}">${value ? iconSvg('check') : '<span class="pricing-compare__empty">Нет</span>'}</span>`).join('')}</div>`).join('')}
        </div>
      </div>
    </section>
    <section class="pricing-questions">
      <div class="container">
        <header data-reveal="slide-left"><h2>Перед подключением</h2></header>
        <div class="pricing-questions__list" data-reveal="scale">
          <details open><summary>Что произойдёт после бесплатного периода?${iconSvg('chevron-down')}</summary><p>Вы выберете подходящий тариф и способ оплаты. Без вашего подтверждения платная подписка не включится.</p></details>
          <details><summary>Можно ли сменить тариф позже?${iconSvg('chevron-down')}</summary><p>Да. Перейти на другой тариф можно при изменении размера команды или набора нужных функций.</p></details>
          <details><summary>Поможете перенести клиентскую базу?${iconSvg('chevron-down')}</summary><p>Да. Подскажем формат импорта, проверим данные и поможем команде начать работу в новом пространстве.</p></details>
          <details><summary>Можно сначала посмотреть продукт?${iconSvg('chevron-down')}</summary><p>Да. На демонстрации разберём ваш рабочий сценарий и покажем его на готовых экранах Simple CRM.</p></details>
        </div>
      </div>
    </section>
    <div class="container"><section class="pricing-final" data-reveal="scale"><div><h2>Подберите тариф на живой демонстрации</h2><p>Покажем продукт, оценим размер команды и поможем выбрать вариант без лишних функций.</p></div><a class="button button--primary" href="/SimpleCRM_Landing/#demo">Запросить демонстрацию ${iconSvg('arrow-right')}</a></section></div>`;
  return section;
}

export function createFaqPage() {
  const groups = [
    { title: 'Начало работы', questions: [
      ['Сколько времени занимает запуск?', 'Небольшая команда может создать рабочее пространство, добавить сотрудников и начать работу с реальными клиентами в течение одного рабочего дня.'],
      ['Можно ли перенести существующую базу?', 'Да. Поможем подготовить файл импорта, проверить контактные данные и перенести клиентов без ручного создания каждой карточки.'],
      ['Нужно ли устанавливать приложение?', 'Нет. Simple CRM работает в браузере. Мобильная версия адаптирована для встреч, задач и быстрого доступа к клиентской истории.'],
    ] },
    { title: 'Ежедневная работа', questions: [
      ['Что видно в карточке клиента?', 'Контакты, ближайшая встреча, открытые задачи, сообщения, документы и состояние оплаты собраны в одной истории.'],
      ['Как планируются встречи?', 'Выберите клиента, дату, время, формат, локацию и услугу. После сохранения встреча появится в расписании дня.'],
      ['Что происходит после встречи?', 'Менеджер фиксирует итог, создаёт следующий шаг, назначает срок и ответственного. Задача остаётся связанной с клиентом.'],
      ['Может ли команда видеть общую переписку?', 'Да. В командных тарифах сообщения сохраняются в рабочем пространстве клиента и не зависят от личного мессенджера сотрудника.'],
    ] },
    { title: 'Тарифы и доступы', questions: [
      ['Есть ли бесплатный период?', 'Да. Все возможности выбранного тарифа доступны 14 дней без привязки банковской карты.'],
      ['Можно ли сменить тариф?', 'Да. Тариф можно изменить, когда команда растёт или ей требуется другой набор возможностей.'],
      ['Как устроены роли сотрудников?', 'Владелец пространства управляет составом команды и доступными разделами. Расширенные роли доступны на тарифе «Бизнес».'],
      ['Как обратиться в поддержку?', 'Оставьте обращение на странице поддержки. Ответим по рабочей почте и поможем с настройкой, импортом или первым запуском.'],
    ] },
  ];
  const section = document.createElement('section');
  section.className = 'inner-page faq-page faq-page--rich';
  section.setAttribute('aria-labelledby', 'faq-title');
  section.innerHTML = `
    <div class="faq-page__hero"><div class="container" data-reveal="scale"><h1 id="faq-title">Ответы о запуске и работе Simple CRM</h1><p>Найдите нужный вопрос или просмотрите ответы по темам. Если вашей ситуации здесь нет, команда поддержки поможет лично.</p><label class="faq-search"><span class="visually-hidden">Поиск по вопросам</span>${iconSvg('search')}<input type="search" placeholder="Найти ответ" autocomplete="off" data-faq-search /></label><p class="faq-search__status" data-faq-status aria-live="polite"></p></div></div>
    <div class="container faq-groups">
      ${groups.map((group, groupIndex) => `<section class="faq-group" data-faq-group data-reveal="${groupIndex % 2 ? 'slide-left' : 'slide-right'}"><h2>${escapeHtml(group.title)}</h2><div>${group.questions.map(([question, answer], questionIndex) => `<details class="faq-rich-item" data-faq-item data-search="${escapeAttribute(`${question} ${answer}`.toLowerCase())}"${groupIndex === 0 && questionIndex === 0 ? ' open' : ''}><summary>${escapeHtml(question)}${iconSvg('chevron-down')}</summary><p>${escapeHtml(answer)}</p></details>`).join('')}</div></section>`).join('')}
    </div>
    <div class="container"><section class="faq-help" data-reveal="scale"><div><h2>Не нашли свой вопрос?</h2><p>Опишите рабочий сценарий, и мы ответим по существу: настройка, импорт, тариф или работа конкретного раздела.</p></div><a class="button button--primary" href="/SimpleCRM_Landing/support/">Написать в поддержку ${iconSvg('arrow-right')}</a></section></div>`;
  return section;
}

export function createAboutPage() {
  const guide = [
    {
      id: 'find-client',
      number: '01',
      short: 'Найдите клиента',
      title: 'Откройте нужного клиента за несколько секунд',
      copy: 'Поиск сразу показывает подходящие карточки. Менеджер видит имя, контактные данные и статус, не перебирая таблицы и переписки.',
      points: ['Быстрый поиск по имени и контактам', 'Понятный статус клиента до открытия карточки'],
      image: '/SimpleCRM_Landing/simple-crm-landing-screens/14-client-search.png',
      alt: 'Поиск клиента в Simple CRM',
    },
    {
      id: 'client-card',
      number: '02',
      short: 'Проверьте контекст',
      title: 'В карточке уже есть всё, что нужно перед разговором',
      copy: 'Контакты, ближайшая встреча, открытые задачи и сумма к оплате собраны на одном экране. Новый сотрудник понимает ситуацию без пересказов коллег.',
      points: ['Встречи и задачи связаны с конкретным клиентом', 'Сообщения, файлы и оплаты остаются в общей истории'],
      image: '/SimpleCRM_Landing/simple-crm-landing-screens/15-client-overview.png',
      alt: 'Полная карточка клиента в Simple CRM',
    },
    {
      id: 'plan-meeting',
      number: '03',
      short: 'Назначьте встречу',
      title: 'Запланируйте встречу, пока договорённость свежая',
      copy: 'Выберите клиента, дату, время, формат, локацию и услугу. Встреча сразу появляется в расписании, поэтому следующий контакт не потеряется.',
      points: ['Онлайн, в офисе или на выезде', 'Все параметры встречи сохраняются одним действием'],
      image: '/SimpleCRM_Landing/simple-crm-landing-screens/11-create-meeting.png',
      alt: 'Форма создания встречи в Simple CRM',
    },
    {
      id: 'workday',
      number: '04',
      short: 'Ведите день',
      title: 'Начните день с готового расписания',
      copy: 'Экран «Сегодня» показывает порядок встреч и свободные окна. Менеджер понимает, к кому готовиться сейчас и что запланировано дальше.',
      points: ['Расписание дня без переключения между календарями', 'Быстрый переход к клиенту и деталям встречи'],
      image: '/SimpleCRM_Landing/simple-crm-landing-screens/01-today-schedule.png',
      alt: 'Расписание рабочего дня в Simple CRM',
    },
    {
      id: 'next-action',
      number: '05',
      short: 'Зафиксируйте итог',
      title: 'Каждая договорённость становится понятной задачей',
      copy: 'После разговора создайте следующий шаг, назначьте срок и ответственного. Доска показывает, что новое, что уже в работе и что завершено.',
      points: ['Задачи не отделены от истории клиента', 'Команда видит приоритеты и прогресс без отдельного отчёта'],
      image: '/SimpleCRM_Landing/simple-crm-landing-screens/20-task-board.png',
      alt: 'Доска задач в Simple CRM',
    },
    {
      id: 'keep-context',
      number: '06',
      short: 'Сохраните историю',
      title: 'Продолжайте диалог с полным контекстом под рукой',
      copy: 'Сообщения остаются рядом с клиентом, встречами и задачами. Любой сотрудник видит, что уже обсудили и какой ответ ждёт клиент.',
      points: ['Переписка доступна из рабочего пространства клиента', 'Контекст не зависит от личного мессенджера менеджера'],
      image: '/SimpleCRM_Landing/simple-crm-landing-screens/19-client-conversation.png',
      alt: 'Диалог с клиентом в Simple CRM',
    },
  ];
  const section = document.createElement('section');
  section.className = 'inner-page section about-page';
  section.setAttribute('aria-labelledby', 'about-title');
  section.innerHTML = `
    <div class="container about-hero">
      <div class="about-hero__copy" data-reveal="slide-left">
        <h1 id="about-title">Весь путь клиента связан в одну понятную историю</h1>
        <p>Simple CRM помогает небольшой команде вести клиента от первого контакта до следующей встречи, задачи и оплаты. Ничего не нужно восстанавливать по памяти.</p>
        <div class="about-hero__actions">
          <a class="button button--primary" href="#product-guide">Посмотреть, как это работает ${iconSvg('arrow-down')}</a>
          <a class="text-link" href="/SimpleCRM_Landing/#demo">Запросить демонстрацию ${iconSvg('arrow-right')}</a>
        </div>
      </div>
      <div class="about-hero__visual" data-reveal="device"></div>
    </div>
    <nav class="container about-journey" aria-label="Этапы работы с клиентом" data-reveal="scale">
      ${guide.map(item => `<a href="#${item.id}">${escapeHtml(item.short)}</a>`).join('')}
    </nav>
    <div class="about-guide" id="product-guide">
      ${guide.map((item, index) => `
        <article class="about-guide__step${index % 2 ? ' about-guide__step--reverse' : ''}" id="${item.id}" data-reveal="${index % 2 ? 'slide-left' : 'slide-right'}">
          <div class="container about-guide__grid">
            <div class="about-guide__copy">
              <h2>${escapeHtml(item.title)}</h2>
              <p>${escapeHtml(item.copy)}</p>
              <ul>${item.points.map(point => `<li>${iconSvg('check')}<span>${escapeHtml(point)}</span></li>`).join('')}</ul>
            </div>
            <div class="about-guide__visual" data-guide-image="${index}"></div>
          </div>
        </article>
      `).join('')}
    </div>
    <div class="container">
      <section class="about-day" data-reveal="scale">
        <div>
          <h2>Первый рабочий день без долгой настройки</h2>
          <p>Создайте рабочее пространство, добавьте команду и начните с реальных клиентов. Основной сценарий понятен без отдельного администратора.</p>
        </div>
        <ol>
          <li><span>1</span><div><strong>Добавьте клиентов</strong><p>Перенесите рабочую базу и контактные данные.</p></div></li>
          <li><span>2</span><div><strong>Пригласите коллег</strong><p>Распределите клиентов и текущие задачи.</p></div></li>
          <li><span>3</span><div><strong>Продолжайте работу</strong><p>Планируйте встречи и фиксируйте следующий шаг.</p></div></li>
        </ol>
      </section>
      <section class="about-final" data-reveal="scale">
        <h2>Покажем Simple CRM на процессах вашей команды</h2>
        <p>Разберём путь клиента, настроим первый рабочий сценарий и ответим на вопросы сотрудников.</p>
        <a class="button button--primary" href="/SimpleCRM_Landing/#demo">Запросить демонстрацию ${iconSvg('arrow-right')}</a>
      </section>
    </div>`;

  const heroVisual = section.querySelector('.about-hero__visual');
  heroVisual.append(
    createProductDeviceMockup({ mode: 'image', device: 'phone', image: { src: '/SimpleCRM_Landing/simple-crm-landing-screens/16-client-activity.png' }, alt: 'Единая история клиента в Simple CRM' }),
    createProductDeviceMockup({ mode: 'image', device: 'phone', image: { src: '/SimpleCRM_Landing/simple-crm-landing-screens/21-task-list.png' }, alt: 'Список задач в Simple CRM' }),
  );
  guide.forEach((item, index) => {
    section.querySelector(`[data-guide-image="${index}"]`).append(
      createProductDeviceMockup({ mode: 'image', device: 'phone', image: { src: item.image }, alt: item.alt }),
    );
  });
  return section;
}

export function createSupportPage() {
  const section = document.createElement('section');
  section.className = 'inner-page support-page support-page--rich';
  section.setAttribute('aria-labelledby', 'support-title');
  section.innerHTML = `
    <div class="support-hero"><div class="container" data-reveal="scale"><h1 id="support-title">Поможем запустить и настроить Simple CRM</h1><p>Опишите задачу своими словами. Ответим по существу, подключим нужного специалиста и не заставим повторять контекст несколько раз.</p></div></div>
    <div class="container support-layout">
      <aside class="support-aside" data-reveal="slide-left">
        <div class="support-aside__intro"><h2>До обращения</h2><p>Готовые ответы и пошаговые инструкции часто помогают решить вопрос сразу.</p></div>
        <nav aria-label="Разделы помощи"><a href="/SimpleCRM_Landing/faq/"><span>${iconSvg('message-square')}</span><div><strong>Вопросы и ответы</strong><p>Запуск, ежедневная работа, тарифы и доступы</p></div>${iconSvg('arrow-right')}</a><a href="/SimpleCRM_Landing/how-to/"><span>${iconSvg('task-list')}</span><div><strong>Инструкции</strong><p>Пошаговая работа с клиентами, встречами и задачами</p></div>${iconSvg('arrow-right')}</a><a href="/SimpleCRM_Landing/releases/"><span>${iconSvg('document')}</span><div><strong>История версий</strong><p>Новые возможности, улучшения и исправления</p></div>${iconSvg('arrow-right')}</a></nav>
        <div class="support-contact"><p>Рабочая почта</p><a href="mailto:support@simplecrm.ru">support@simplecrm.ru</a><span>Отвечаем по будням с 9:00 до 19:00 по Москве</span></div>
      </aside>
      <form class="support-request demo-form" data-demo-form novalidate data-reveal="slide-right">
        <div class="support-request__heading"><h2>Написать команде</h2><p>Обычно отвечаем в течение рабочего дня.</p></div>
        <div class="form-row"><label>Ваше имя<input name="name" type="text" autocomplete="name" placeholder="Анна Петрова" required /></label><label>Рабочая почта<input name="email" type="email" autocomplete="email" placeholder="anna@company.ru" required /></label></div>
        <label>Компания<input name="company" type="text" autocomplete="organization" placeholder="Название компании" /></label>
        <label>Тема обращения<select name="topic" required><option value="">Выберите тему</option><option>Знакомство с продуктом</option><option>Настройка команды</option><option>Импорт клиентской базы</option><option>Тарифы и оплата</option><option>Техническая проблема</option></select></label>
        <label>Что нужно решить<textarea name="message" rows="5" placeholder="Опишите, что делали, что ожидали увидеть и что произошло" required></textarea></label>
        <label class="form-consent"><input name="consent" type="checkbox" required /><span>Согласен на обработку данных для ответа на обращение</span></label>
        <button class="button button--primary" type="submit">Отправить обращение ${iconSvg('arrow-right')}</button>
        <p class="form-status" data-form-status aria-live="polite"></p>
      </form>
    </div>
    `;
  return section;
}

export function createPrivacyPage() {
  const chapters = [
    {
      id: 'data-we-do-not-collect',
      title: '1. Какие данные мы не собираем',
      paragraphs: [
        'Simple CRM не продаёт клиентские базы, не использует содержимое карточек для рекламы и не передаёт рабочую переписку сторонним рекламным платформам.',
        'Мы не запрашиваем доступ к личным контактам устройства, если вы не запускаете импорт самостоятельно.',
      ],
    },
    {
      id: 'data-we-collect',
      title: '2. Какие данные нужны сервису',
      paragraphs: ['Для работы аккаунта мы храним имя, рабочую почту, настройки команды, созданные вами записи и технические события, необходимые для стабильности сервиса.'],
      items: ['Данные профиля и состава команды', 'Клиенты, встречи, задачи, сообщения, документы и счета, которые вы добавляете', 'Технические журналы входа, ошибок и производительности'],
    },
    {
      id: 'how-we-use-data',
      title: '3. Как используются данные',
      paragraphs: ['Данные используются только для предоставления функций Simple CRM: синхронизации, совместной работы, уведомлений, поддержки и улучшения качества продукта.'],
    },
    {
      id: 'storage-security',
      title: '4. Хранение и безопасность',
      paragraphs: ['Передача данных защищена шифрованием. Доступ сотрудников ограничен ролями и предоставляется только для решения обращений или обеспечения работы сервиса.', 'Резервные копии создаются регулярно и хранятся отдельно от основной рабочей среды.'],
    },
    {
      id: 'team-access',
      title: '5. Доступ внутри команды',
      paragraphs: ['Владелец рабочего пространства управляет сотрудниками и ролями. Пользователи видят только те разделы и данные, которые доступны их роли.'],
    },
    {
      id: 'retention',
      title: '6. Срок хранения',
      paragraphs: ['Данные хранятся, пока активен аккаунт. После запроса на удаление рабочее пространство блокируется, а данные удаляются из активных систем и резервных копий в пределах установленного технического срока.'],
    },
    {
      id: 'user-rights',
      title: '7. Ваши права',
      paragraphs: ['Вы можете запросить копию данных, исправление информации, перенос или удаление аккаунта. Для подтверждения запроса мы используем рабочую почту владельца пространства.'],
    },
    {
      id: 'contact-us',
      title: '8. Как связаться с нами',
      paragraphs: ['По вопросам обработки данных отправьте обращение через страницу поддержки. Мы подтвердим получение запроса и сообщим о дальнейших действиях.'],
    },
  ];
  const section = document.createElement('section');
  section.className = 'inner-page section document-page privacy-page';
  section.dataset.reveal = 'scale';
  section.setAttribute('aria-labelledby', 'privacy-title');
  section.innerHTML = `<div class="container document-layout"><article class="document-main"><header class="document-header"><h1 id="privacy-title">Политика конфиденциальности</h1></header><div class="document-body">${chapters.map(chapter => `<section id="${escapeAttribute(chapter.id)}"><h2>${escapeHtml(chapter.title)}</h2>${chapter.paragraphs.map(paragraph => `<p>${escapeHtml(paragraph)}</p>`).join('')}${chapter.items ? `<ul>${chapter.items.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul>` : ''}</section>`).join('')}</div></article><aside class="document-sidebar"><div class="document-toc"><p>На этой странице</p><nav aria-label="Оглавление политики"><ol>${chapters.map(chapter => `<li><a href="#${escapeAttribute(chapter.id)}">${escapeHtml(chapter.title.replace(/^\d+\.\s*/, ''))}</a></li>`).join('')}</ol></nav></div><a class="button button--outline document-sidebar__cta" href="/SimpleCRM_Landing/support/">Задать вопрос</a></aside></div>`;
  return section;
}

export function createReleasesPage() {
  const releases = [
    {
      version: '1.4.0', date: '21 августа 2026', label: 'Актуальная версия',
      groups: [
        ['Новое', ['Доска задач с колонками «Новые», «В работе» и «Готово»', 'Единая хронология встреч, задач, сообщений, документов и оплат в карточке клиента', 'Быстрые действия из Client 360: сообщение, встреча и задача']],
        ['Улучшения', ['Более заметные статусы просроченных задач', 'Ускоренная загрузка карточек клиентов с длинной историей']],
      ],
    },
    {
      version: '1.3.0', date: '9 августа 2026',
      groups: [
        ['Новое', ['Фильтры задач по сроку, приоритету и исполнителю', 'Предпросмотр документов и счетов внутри карточки клиента']],
        ['Исправления', ['Стабильная отправка сообщений при медленном соединении', 'Корректное сохранение часового пояса встречи']],
      ],
    },
    {
      version: '1.2.2', date: '30 июля 2026',
      groups: [['Улучшения', ['Быстрее открывается календарь команды', 'Состояние фильтров сохраняется между рабочими сессиями']], ['Исправления', ['Исправлено дублирование уведомлений о встрече']]],
    },
    {
      version: '1.2.0', date: '14 июля 2026',
      groups: [['Новое', ['Роли сотрудников и разграничение разделов', 'Командная аналитика по встречам и задачам', 'Импорт клиентской базы из таблицы']]],
    },
  ];
  const section = document.createElement('section');
  section.className = 'inner-page section document-page releases-page';
  section.dataset.reveal = 'scale';
  section.setAttribute('aria-labelledby', 'releases-title');
  section.innerHTML = `<div class="container document-layout"><article class="document-main"><header class="document-header"><p class="eyebrow">Развитие продукта</p><h1 id="releases-title">История версий Simple CRM</h1><p class="document-lead">Публикуем все заметные изменения продукта — новые возможности, улучшения интерфейса и исправления.</p></header><div class="release-list">${releases.map((release, index) => `<section class="release-entry" id="release-${escapeAttribute(release.version.replaceAll('.', '-'))}"><div class="release-entry__heading"><div><h2>${escapeHtml(release.version)}</h2><p>${escapeHtml(release.date)}</p></div>${release.label ? `<span>${escapeHtml(release.label)}</span>` : ''}</div>${release.groups.map(([title, items]) => `<section class="release-group"><h3>${escapeHtml(title)}</h3><ul>${items.map(item => `<li>${iconSvg('check')}<span>${escapeHtml(item)}</span></li>`).join('')}</ul></section>`).join('')}${index === 0 ? '<p><a class="text-link" href="/SimpleCRM_Landing/announcements/">Подробнее об обновлениях ' + iconSvg('arrow-right') + '</a></p>' : ''}</section>`).join('')}</div></article><aside class="document-sidebar"><div class="document-toc"><p>Версии</p><nav aria-label="Навигация по версиям"><ol>${releases.map(release => `<li><a href="#release-${escapeAttribute(release.version.replaceAll('.', '-'))}">${escapeHtml(release.version)} <span>${escapeHtml(release.date)}</span></a></li>`).join('')}</ol></nav></div><a class="button button--outline document-sidebar__cta" href="/SimpleCRM_Landing/support/">Сообщить о проблеме</a></aside></div>`;
  return section;
}

function createCrossPromo(meta, posts) {
  const card = document.createElement('article');
  card.className = 'cross-promo';
  const titles = posts.slice(0, 2).map(post => `<li>${escapeHtml(post.title)}</li>`).join('') || '<li>Практические сценарии Simple CRM</li>';
  card.innerHTML = `<p class="eyebrow">${escapeHtml(meta.title)}</p><p>${escapeHtml(meta.description)}</p><ul>${titles}</ul><a class="text-link" href="${escapeAttribute(meta.href)}">Открыть раздел ${iconSvg('arrow-right')}</a>`;
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
    const image = /задач/i.test(block.label) ? '/SimpleCRM_Landing/simple-crm-landing-screens/20-task-board.png' : /календар|встреч/i.test(block.label) ? '/SimpleCRM_Landing/simple-crm-landing-screens/11-create-meeting.png' : '/SimpleCRM_Landing/simple-crm-landing-screens/15-client-overview.png';
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
  section.innerHTML = `<div class="container"><header class="inner-page-header"><h1>Материал не найден</h1><p>Проверьте ссылку или вернитесь к списку материалов.</p><a class="button button--primary" href="/SimpleCRM_Landing/learn/">Открыть материалы</a></header></div>`;
  return section;
}

function slugify(value) {
  return value.toLocaleLowerCase('ru').replace(/[^a-zа-яё0-9]+/gi, '-').replace(/(^-|-$)/g, '');
}

function escapeHtml(value) { return String(value).replace(/[&<>'"]/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#039;', '"': '&quot;' })[character]); }
function escapeAttribute(value) { return escapeHtml(value); }
