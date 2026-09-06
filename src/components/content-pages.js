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
      description: 'Для команд, которым нужно вывести работу с клиентами на следующий уровень: история, роли, документы и приоритетная поддержка.',
      cta: 'Попробовать Pro',
      featured: true,
      badge: 'Популярно',
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
        <h1 id="pricing-title">Начните работать с Simple CRM</h1>
        <p>Попробуйте все возможности Pro бесплатно 14 дней — без обязательств и сложного выбора на старте.</p>
      </div>
    </div>
    <div class="container pricing-page__cards pricing-page__cards--two">
      ${plans.map(plan => `
        <article class="pricing-plan${plan.featured ? ' pricing-plan--featured' : ''}" data-reveal="scale">
          ${plan.badge ? `<p class="pricing-plan__badge">${escapeHtml(plan.badge)}</p>` : ''}
          <p class="pricing-plan__name">${escapeHtml(plan.name)}</p>
          <h2>${escapeHtml(plan.price)}<small>${escapeHtml(plan.period)}</small></h2>
          <p class="pricing-plan__description">${escapeHtml(plan.description)}</p>
          <a class="button ${plan.featured ? 'button--primary' : 'button--outline'}" href="#">${escapeHtml(plan.cta)}</a>
          <div class="pricing-plan__timeline">
            ${plan.features.map(([label, text]) => `<div><span>${iconSvg('check')}</span><p><strong>${escapeHtml(label)}</strong>${escapeHtml(text)}</p></div>`).join('')}
          </div>
        </article>
      `).join('')}
    </div>
    <section class="pricing-pledge">
      <div class="container">
        <div class="pricing-pledge__card" data-reveal="scale">
          <p class="eyebrow">Обещание по безопасности данных</p>
          <h2>Ваши данные остаются вашими</h2>
          <p>Клиенты, встречи, задачи, документы и вся связанная информация хранятся внутри вашего рабочего пространства. Мы не продаём данные, не передаём клиентскую базу рекламным платформам и используем техническую аналитику только для улучшения продукта.</p>
          <a class="text-link" href="/privacy/">Подробнее о конфиденциальности ${iconSvg('arrow-right')}</a>
        </div>
      </div>
    </section>
    <section class="support-newsletter section" aria-labelledby="pricing-newsletter-title">
      <div class="container">
        <form class="newsletter-card" data-newsletter-form data-reveal="scale" novalidate>
          <div>
            <p class="eyebrow">Newsletter Signup</p>
            <h2 id="pricing-newsletter-title">Получайте новости о новых возможностях</h2>
            <p>Оставьте почту, чтобы узнавать о релизах, сценариях и полезных улучшениях Simple CRM.</p>
          </div>
          <label><span class="visually-hidden">Email</span><input name="email" type="email" autocomplete="email" placeholder="Получать обновления" required /></label>
          <button class="button button--primary" type="submit">Подписаться</button>
          <p class="form-status" data-form-status aria-live="polite"></p>
        </form>
      </div>
    </section>`;
  return section;
}

export function createFaqPage() {
  const questions = [
    ['Что такое Simple CRM?', 'Simple CRM — приложение для команд, которым нужно помнить клиентов, встречи, задачи, документы, оплаты и следующий шаг в одном месте. Оно помогает быстро вернуться к контексту и не терять важные детали после разговора.'],
    ['Simple CRM бесплатная?', 'Базовый режим можно использовать бесплатно. Pro открывает больше возможностей для команды: роли, общую историю, документы, расширенные сценарии и приоритетную поддержку.'],
    ['Как добавить клиента?', 'Создайте карточку клиента вручную или импортируйте базу. После этого к клиенту можно привязывать встречи, задачи, сообщения, документы и счета.'],
    ['Можно ли отмечать, где мы познакомились с клиентом?', 'Да. Встречи можно связывать с форматом, офисом или другой локацией, чтобы команда понимала, где и когда произошёл контакт.'],
    ['Можно ли объединять клиентов по группам и тегам?', 'Да. Используйте статусы, теги и рабочие признаки, чтобы быстро находить нужных клиентов и видеть, кому пора написать.'],
    ['Есть ли приложение для большого экрана?', 'Интерфейс Simple CRM раскрывается на большом рабочем экране: больше клиентов, задач и деталей видно одновременно, а основные действия остаются рядом.'],
    ['Можно ли перенести данные?', 'Да. Подготовьте таблицу с клиентами — мы подскажем формат, поможем проверить данные и аккуратно перенести базу в Simple CRM.'],
    ['Как Simple CRM относится к приватности?', 'Данные клиентов остаются внутри вашего рабочего пространства. Мы не продаём клиентскую базу и не используем содержимое карточек для рекламы. Подробнее об этом написано в политике конфиденциальности.'],
  ];
  const section = document.createElement('section');
  section.className = 'inner-page faq-page faq-page--dextr';
  section.setAttribute('aria-labelledby', 'faq-title');
  section.innerHTML = `
    <div class="faq-page__hero"><div class="container" data-reveal="scale"><h1 id="faq-title">Частые вопросы</h1><p>Здесь собраны ответы о Simple CRM, возможностях продукта, приватности и запуске команды.</p></div></div>
    <div class="container faq-list-wrap">
      <div class="faq-list" data-reveal="scale">
        ${questions.map(([question, answer], index) => `<details class="faq-rich-item" data-reveal="slide-up"${index === 0 ? ' open' : ''}><summary>${escapeHtml(question)}${iconSvg('chevron-down')}</summary><p>${escapeHtml(answer)}</p></details>`).join('')}
      </div>
    </div>
    <section class="support-newsletter section" aria-labelledby="faq-newsletter-title">
      <div class="container">
        <form class="newsletter-card" data-newsletter-form data-reveal="scale" novalidate>
          <div>
            <p class="eyebrow">Newsletter Signup</p>
            <h2 id="faq-newsletter-title">Получайте новости о новых возможностях</h2>
            <p>Узнавайте о релизах Simple CRM, полезных сценариях и улучшениях интерфейса.</p>
          </div>
          <label><span class="visually-hidden">Email</span><input name="email" type="email" autocomplete="email" placeholder="Получать обновления" required /></label>
          <button class="button button--primary" type="submit">Подписаться</button>
          <p class="form-status" data-form-status aria-live="polite"></p>
        </form>
      </div>
    </section>`;
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
      image: '/simple-crm-landing-screens/14-client-search.png',
      alt: 'Поиск клиента в Simple CRM',
    },
    {
      id: 'client-card',
      number: '02',
      short: 'Проверьте контекст',
      title: 'В карточке уже есть всё, что нужно перед разговором',
      copy: 'Контакты, ближайшая встреча, открытые задачи и сумма к оплате собраны на одном экране. Новый сотрудник понимает ситуацию без пересказов коллег.',
      points: ['Встречи и задачи связаны с конкретным клиентом', 'Сообщения, файлы и оплаты остаются в общей истории'],
      image: '/simple-crm-landing-screens/15-client-overview.png',
      alt: 'Полная карточка клиента в Simple CRM',
    },
    {
      id: 'plan-meeting',
      number: '03',
      short: 'Назначьте встречу',
      title: 'Запланируйте встречу, пока договорённость свежая',
      copy: 'Выберите клиента, дату, время, формат, локацию и услугу. Встреча сразу появляется в расписании, поэтому следующий контакт не потеряется.',
      points: ['Онлайн, в офисе или на выезде', 'Все параметры встречи сохраняются одним действием'],
      image: '/simple-crm-landing-screens/11-create-meeting.png',
      alt: 'Форма создания встречи в Simple CRM',
    },
    {
      id: 'workday',
      number: '04',
      short: 'Ведите день',
      title: 'Начните день с готового расписания',
      copy: 'Экран «Сегодня» показывает порядок встреч и свободные окна. Менеджер понимает, к кому готовиться сейчас и что запланировано дальше.',
      points: ['Расписание дня без переключения между календарями', 'Быстрый переход к клиенту и деталям встречи'],
      image: '/simple-crm-landing-screens/01-today-schedule.png',
      alt: 'Расписание рабочего дня в Simple CRM',
    },
    {
      id: 'next-action',
      number: '05',
      short: 'Зафиксируйте итог',
      title: 'Каждая договорённость становится понятной задачей',
      copy: 'После разговора создайте следующий шаг, назначьте срок и ответственного. Доска показывает, что новое, что уже в работе и что завершено.',
      points: ['Задачи не отделены от истории клиента', 'Команда видит приоритеты и прогресс без отдельного отчёта'],
      image: '/simple-crm-landing-screens/20-task-board.png',
      alt: 'Доска задач в Simple CRM',
    },
    {
      id: 'keep-context',
      number: '06',
      short: 'Сохраните историю',
      title: 'Продолжайте диалог с полным контекстом под рукой',
      copy: 'Сообщения остаются рядом с клиентом, встречами и задачами. Любой сотрудник видит, что уже обсудили и какой ответ ждёт клиент.',
      points: ['Переписка доступна из рабочего пространства клиента', 'Контекст не зависит от личного мессенджера менеджера'],
      image: '/simple-crm-landing-screens/19-client-conversation.png',
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
          <a class="text-link" href="/#demo">Запросить демонстрацию ${iconSvg('arrow-right')}</a>
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
        <a class="button button--primary" href="/#demo">Запросить демонстрацию ${iconSvg('arrow-right')}</a>
      </section>
    </div>`;

  const heroVisual = section.querySelector('.about-hero__visual');
  heroVisual.append(
    createProductDeviceMockup({ mode: 'image', device: 'phone', image: { src: '/simple-crm-landing-screens/16-client-activity.png' }, alt: 'Единая история клиента в Simple CRM' }),
    createProductDeviceMockup({ mode: 'image', device: 'phone', image: { src: '/simple-crm-landing-screens/21-task-list.png' }, alt: 'Список задач в Simple CRM' }),
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
  section.className = 'inner-page support-page support-page--contact';
  section.setAttribute('aria-labelledby', 'support-title');
  section.innerHTML = `
    <div class="support-contact-hero">
      <div class="container support-contact-hero__inner">
        <div class="support-contact-hero__copy" data-reveal="slide-left">
          <p class="eyebrow">Поддержка</p>
          <h1 id="support-title">Мы здесь, чтобы помочь</h1>
          <p>Если у вас есть вопрос, идея или нужна помощь с Simple CRM, напишите нам. Мы читаем обращение целиком, не просим повторять контекст и отвечаем по существу.</p>
          <div class="support-contact-links" aria-label="Способы связи">
            <a href="mailto:support@simplecrm.ru"><span>${iconSvg('message-square')}</span><strong>support@simplecrm.ru</strong><small>Для вопросов о продукте, настройке и запуске</small></a>
            <a href="/faq/"><span>${iconSvg('task-list')}</span><strong>Ответы на вопросы</strong><small>Быстрые подсказки по тарифам, данным и ежедневной работе</small></a>
          </div>
        </div>
        <div class="support-contact-hero__visual" data-support-hero-visual data-reveal="slide-right"></div>
      </div>
    </div>
    <div class="container support-layout support-layout--compact">
      <aside class="support-aside" data-reveal="slide-left">
        <div class="support-aside__intro"><h2>Перед обращением</h2><p>Чтобы мы быстрее помогли, опишите, что хотели сделать, что увидели на экране и какой результат ожидали.</p></div>
        <nav aria-label="Разделы помощи"><a href="/learn/"><span>${iconSvg('document')}</span><div><strong>Материалы</strong><p>Сценарии работы с клиентами и встречами</p></div>${iconSvg('arrow-right')}</a><a href="/releases/"><span>${iconSvg('calendar')}</span><div><strong>Версии</strong><p>Что изменилось в последних обновлениях</p></div>${iconSvg('arrow-right')}</a></nav>
        <div class="support-contact"><p>Время ответа</p><strong>Будние дни, 9:00–19:00</strong><span>По Москве. Срочные вопросы помечайте в теме обращения.</span></div>
      </aside>
      <form class="support-request demo-form" data-demo-form novalidate data-reveal="slide-right">
        <div class="support-request__heading"><h2>Написать команде</h2><p>Расскажите, что нужно решить — ответим по рабочей почте.</p></div>
        <div class="form-row"><label>Ваше имя<input name="name" type="text" autocomplete="name" placeholder="Анна Петрова" required /></label><label>Рабочая почта<input name="email" type="email" autocomplete="email" placeholder="anna@company.ru" required /></label></div>
        <label>Тема<select name="topic" required><option value="">Выберите тему</option><option>Вопрос по продукту</option><option>Настройка Simple CRM</option><option>Импорт клиентов</option><option>Тарифы и оплата</option><option>Ошибка или техническая проблема</option></select></label>
        <label>Сообщение<textarea name="message" rows="5" placeholder="Например: хочу перенести базу клиентов и настроить встречи для команды из 5 человек" required></textarea></label>
        <label class="form-consent"><input name="consent" type="checkbox" required /><span>Согласен на обработку данных для ответа на обращение</span></label>
        <button class="button button--primary" type="submit">Отправить ${iconSvg('arrow-right')}</button>
        <p class="form-status" data-form-status aria-live="polite"></p>
      </form>
    </div>
    <section class="support-newsletter section" aria-labelledby="support-newsletter-title">
      <div class="container">
        <form class="newsletter-card newsletter-card--support" data-newsletter-form data-reveal="scale" novalidate>
          <div>
            <p class="eyebrow">Новости продукта</p>
            <h2 id="support-newsletter-title">Получайте новости о новых возможностях</h2>
            <p>Пришлём заметные релизы, полезные сценарии и улучшения Simple CRM. Только продуктовые обновления — без шума.</p>
          </div>
          <label><span class="visually-hidden">Email</span><input name="email" type="email" autocomplete="email" placeholder="you@company.ru" required /></label>
          <button class="button button--primary" type="submit">Подписаться</button>
          <p class="form-status" data-form-status aria-live="polite"></p>
        </form>
      </div>
    </section>
    `;
  section.querySelector('[data-support-hero-visual]').append(
    createProductDeviceMockup({ mode: 'image', device: 'phone', image: { src: '/simple-crm-landing-screens/19-client-conversation.png' }, alt: 'Диалог с клиентом в Simple CRM' }),
  );
  return section;
}

export function createPrivacyPage() {
  const chapters = [
    {
      id: 'data-we-do-not-collect',
      title: '1. Какие данные мы не собираем',
      paragraphs: [
        'Simple CRM не передаёт личную информацию клиентов, содержимое карточек, переписку, документы или другие рабочие материалы рекламным платформам, аналитическим сервисам или сторонним поставщикам, которым эти данные не нужны для работы продукта.',
        'Мы не используем клиентскую базу для рекламы и не запрашиваем доступ к контактам устройства без действия пользователя.',
      ],
    },
    {
      id: 'data-we-collect',
      title: '2. Какие данные нужны сервису',
      paragraphs: ['Simple CRM собирает ограниченные данные, необходимые для работы сервиса, поддержки команды, диагностики ошибок и понимания того, какие функции помогают пользователям.'],
      items: ['Данные аккаунта: имя, рабочая почта, компания и состав команды', 'Рабочие записи, которые вы создаёте: клиенты, встречи, задачи, сообщения, документы и счета', 'Технические события: версия приложения, тип устройства, ошибки, скорость загрузки и состояние разрешений', 'Информация о подписке: тариф, статус оплаты, дата покупки и регион магазина приложений, если оплата подключена'],
    },
    {
      id: 'how-we-use-data',
      title: '3. Как используются данные',
      paragraphs: ['Мы используем данные, чтобы предоставлять функции Simple CRM, синхронизировать рабочее пространство, показывать встречи и задачи, помогать службе поддержки, улучшать стабильность и развивать продукт.'],
      items: ['Поддерживать работу приложения и аккаунта', 'Понимать использование функций и качество интерфейса', 'Диагностировать ошибки, сбои и проблемы производительности', 'Обрабатывать подписки, платежи и доступ к Pro-возможностям', 'Отвечать на обращения поддержки'],
    },
    {
      id: 'data-sharing',
      title: '4. Передача данных',
      paragraphs: ['Мы не продаём и не сдаём в аренду персональную информацию. Ограниченные данные могут передаваться сервисным поставщикам, которые помогают нам поддерживать работу Simple CRM: аналитика продукта, диагностика, хостинг, почтовые уведомления и платёжная инфраструктура.', 'Мы также можем раскрыть информацию, если этого требует закон, судебный процесс или защита прав, безопасности и надёжности Simple CRM, наших пользователей или других лиц.'],
    },
    {
      id: 'consent-permissions',
      title: '5. Согласия и разрешения',
      paragraphs: ['Если функция требует доступ к контактам, уведомлениям, файлам или другим системным возможностям, вы предоставляете или отклоняете доступ через системные настройки устройства или браузера.', 'Вы можете изменить разрешения в настройках устройства, браузера или рабочего пространства Simple CRM.'],
    },
    {
      id: 'team-access',
      title: '6. Права пользователя и контроль',
      paragraphs: ['Вы можете управлять данными внутри Simple CRM: добавлять, исправлять, экспортировать и удалять записи, если это разрешено вашей ролью. Владелец рабочего пространства управляет составом команды и доступами сотрудников.', 'Подпиской можно управлять через выбранный способ оплаты или магазин приложений, если оплата оформлена через него.'],
    },
    {
      id: 'data-security',
      title: '7. Безопасность данных',
      paragraphs: ['Мы используем разумные технические и организационные меры защиты: шифрование передачи данных, разграничение доступа, контроль ролей и ограниченный доступ сотрудников к рабочей информации.', 'Доступ к данным предоставляется только тогда, когда это необходимо для работы сервиса, диагностики проблемы или ответа на обращение.'],
    },
    {
      id: 'retention',
      title: '8. Срок хранения',
      paragraphs: ['Мы храним данные столько, сколько это разумно необходимо для предоставления сервиса, поддержки аккаунта, анализа производительности, обработки подписок, выполнения юридических обязанностей и разрешения споров.', 'Рабочий контент остаётся под контролем владельца пространства и может быть удалён по запросу в пределах технически необходимого срока.'],
    },
    {
      id: 'international-transfers',
      title: '9. Международная обработка',
      paragraphs: ['Simple CRM и наши сервисные поставщики могут обрабатывать информацию на серверах, расположенных за пределами вашей страны. В таких случаях мы используем договорные, технические и организационные меры защиты данных.'],
    },
    {
      id: 'changes',
      title: '10. Изменения политики',
      paragraphs: ['Мы можем время от времени обновлять эту политику. Если изменения будут существенными, мы опубликуем обновлённую версию на сайте или внутри продукта и изменим дату последнего обновления.'],
    },
    {
      id: 'contact-us',
      title: '11. Как связаться с нами',
      paragraphs: ['Если у вас есть вопросы о конфиденциальности, аналитике, подписках или удалении данных, напишите нам через страницу поддержки. Мы подтвердим получение запроса и сообщим дальнейшие шаги.'],
    },
  ];
  const section = document.createElement('section');
  section.className = 'inner-page section document-page document-page--dextr privacy-page';
  section.dataset.reveal = 'scale';
  section.setAttribute('aria-labelledby', 'privacy-title');
  section.innerHTML = `<div class="container document-single"><article class="document-main"><header class="document-header"><h1 id="privacy-title">Политика конфиденциальности</h1><p class="document-updated">Последнее обновление: 29 мая 2026</p><p class="document-lead">Ваша приватность важна для нас. Эта политика простым языком объясняет, какие данные Simple CRM собирает и не собирает, как мы их используем и когда они могут быть переданы сервисным поставщикам.</p></header><div class="document-body">${chapters.map(chapter => `<section id="${escapeAttribute(chapter.id)}"><h2>${escapeHtml(chapter.title)}</h2>${chapter.paragraphs.map(paragraph => `<p>${escapeHtml(paragraph)}</p>`).join('')}${chapter.items ? `<ul>${chapter.items.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul>` : ''}</section>`).join('')}</div></article></div><section class="support-newsletter section" aria-labelledby="privacy-newsletter-title"><div class="container"><form class="newsletter-card" data-newsletter-form data-reveal="scale" novalidate><div><p class="eyebrow">Newsletter Signup</p><h2 id="privacy-newsletter-title">Получайте новости о новых возможностях</h2><p>Подпишитесь, чтобы узнавать о релизах Simple CRM и важных изменениях продукта.</p></div><label><span class="visually-hidden">Email</span><input name="email" type="email" autocomplete="email" placeholder="Получать обновления" required /></label><button class="button button--primary" type="submit">Подписаться</button><p class="form-status" data-form-status aria-live="polite"></p></form></div></section>`;
  return section;
}

export function createReleasesPage() {
  const releases = [
    {
      version: '2.2.3', date: '14 апреля 2026', label: 'Актуальная версия',
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
        ['Примечание', ['Simple CRM может запросить доступ к файлам только после вашего действия и не читает документы без необходимости.']],
      ],
    },
    {
      version: '2.0.0', date: '6 марта 2026',
      groups: [
        ['Новое', ['Обновили рабочую модель Simple CRM: клиенты, встречи, задачи, сообщения и документы теперь собираются в одну связанную историю.', 'Добавили большой экран для ежедневной работы с клиентами и быстрых действий.', 'Сделали удобнее работу с событиями, локациями и следующим шагом после встречи.']],
        ['Доступность', ['Возможности постепенно открываются всем командам; часть функций может требовать Pro-доступ.']],
      ],
    },
  ];
  const section = document.createElement('section');
  section.className = 'inner-page section document-page document-page--dextr releases-page releases-page--notes';
  section.dataset.reveal = 'scale';
  section.setAttribute('aria-labelledby', 'releases-title');
  section.innerHTML = `<div class="container document-single"><article class="document-main"><header class="document-header"><p class="eyebrow">Release Notes</p><h1 id="releases-title">Заметки о релизах Simple CRM</h1><p class="document-lead">Следите за обновлениями Simple CRM: новые возможности, улучшения интерфейса, исправления и изменения, которые помогают лучше помнить клиентов.</p></header><div class="release-list">${releases.map((release, index) => `<section class="release-entry" id="release-${escapeAttribute(release.version.replaceAll('.', '-'))}" data-reveal="slide-up"><div class="release-entry__heading"><div><h2>${escapeHtml(release.version)}</h2><p>${escapeHtml(release.date)}</p></div>${release.label ? `<span>${escapeHtml(release.label)}</span>` : ''}</div>${release.groups.map(([title, items]) => `<section class="release-group"><h3>${escapeHtml(title)}</h3><ul>${items.map(item => `<li>${iconSvg('check')}<span>${escapeHtml(item)}</span></li>`).join('')}</ul></section>`).join('')}${index === 0 ? '<p><a class="text-link" href="/announcements/">Открыть объявления ' + iconSvg('arrow-right') + '</a></p>' : ''}</section>`).join('')}</div></article></div><section class="support-newsletter section" aria-labelledby="releases-newsletter-title"><div class="container"><form class="newsletter-card" data-newsletter-form data-reveal="scale" novalidate><div><p class="eyebrow">Newsletter Signup</p><h2 id="releases-newsletter-title">Получайте новости о новых возможностях</h2><p>Подпишитесь, чтобы узнавать о новых релизах Simple CRM сразу после публикации.</p></div><label><span class="visually-hidden">Email</span><input name="email" type="email" autocomplete="email" placeholder="Получать обновления" required /></label><button class="button button--primary" type="submit">Подписаться</button><p class="form-status" data-form-status aria-live="polite"></p></form></div></section>`;
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
    const image = /задач/i.test(block.label) ? '/simple-crm-landing-screens/20-task-board.png' : /календар|встреч/i.test(block.label) ? '/simple-crm-landing-screens/11-create-meeting.png' : '/simple-crm-landing-screens/15-client-overview.png';
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
