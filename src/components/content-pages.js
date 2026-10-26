import { createArticleCard } from './article-card.js?v=client-value1';
import { createMaterialsCatalog } from './materials-catalog.js?v=client-value1';
import { createSupportCenter } from './support-center.js?v=client-value1';
import { iconSvg } from './icons.js?v=20260824-28';
import { createProductDeviceMockup } from './product-device-mockup.js?v=20260927-2';
import { createSearchForm } from './search-form.js';
import { articles, categoryMeta, findArticles, getArticleBySlug, getArticlesByCategory } from '../data/articles.js?v=client-value1';

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
  section.innerHTML = `<div class="container"><header class="inner-page-header inner-page-header--compact"><h1 id="search-title">${escapeHtml(heading)}</h1><p>${query ? 'Инструкции и рабочие ситуации в Simple CRM' : 'Найдите решение: напомнить об оплате, назначить встречу или вернуться к клиенту'}</p></header><div class="search-page__form"></div><div class="article-grid article-grid--search"></div></div>`;
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
  if (!query) grid.append(createEmptyState('Начните поиск', 'Например: «не оплатил», «напоминание» или «повторная запись»'));
  else if (!results.length) grid.append(createEmptyState('Ничего не найдено', 'Выберите близкую тему ниже или откройте все материалы'));
  else results.forEach(result => grid.append(createArticleCard(result)));
  if (!query || !results.length) {
    const suggestions = document.createElement('nav');
    suggestions.className = 'search-suggestions';
    suggestions.setAttribute('aria-label', 'Популярные темы материалов');
    for (const topic of ['Оплата', 'Напоминания', 'Повторная запись']) {
      const link = document.createElement('a');
      const url = new URL('../../search/', import.meta.url);
      url.searchParams.set('q', topic === 'Оплата' ? 'оплат' : topic === 'Напоминания' ? 'напоминан' : 'повторн');
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
      description: 'Для самостоятельной работы: соберите клиентскую базу, встречи и личные задачи в одном месте.',
      cta: 'Начать с первой встречи',
      href: '/how-to/prepare-meeting/',
      features: [
        ['Доступно сразу', 'Храните контакты и договорённости, чтобы не искать их по чатам.'],
        ['Расписание', 'Встречи и свободные интервалы помогают планировать день.'],
        ['История клиента', 'Возвращайтесь к заметкам и договорённостям перед новым разговором.'],
        ['Личные задачи', 'Назначьте срок для звонка, расчёта или отправки предложения.'],
      ],
    },
    {
      name: 'Pro',
      price: '1 490 ₽ / месяц',
      period: 'Оплата помесячно',
      description: 'Для работы с помощниками и командой: общая история клиентов, роли, документы и приоритетная поддержка.',
      cta: 'Уточнить условия Pro',
      href: '/support/#support-message',
      featured: true,
      features: [
        ['Команда и доступ', 'Подключите помощника и распределите права работы с клиентами.'],
        ['Общая история', 'Коллега увидит договорённости и продолжит работу без повторных вопросов.'],
        ['Рабочие документы', 'Соберите материалы по клиенту рядом со встречами и задачами.'],
        ['Приоритетная поддержка', 'Получайте помощь команды по вопросам работы с приложением.'],
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
        <p>Начните бесплатно или попробуйте Pro на 14 дней. Выберите формат для самостоятельной работы или работы с командой.</p>
      </div>
    </div>
    <div class="container pricing-page__cards pricing-page__cards--two">
      ${plans.map(plan => `
        <article class="pricing-plan${plan.featured ? ' pricing-plan--featured' : ''}" data-reveal="scale">
          <p class="pricing-plan__name">${escapeHtml(plan.name)}</p>
          <p class="pricing-plan__description">${escapeHtml(plan.description)}</p>
          <h2>${escapeHtml(plan.price)}<small>${escapeHtml(plan.period)}</small></h2>
          <a class="button ${plan.featured ? 'button--primary' : 'button--outline'}" href="${escapeAttribute(plan.href)}">${escapeHtml(plan.cta)}</a>
          <div class="pricing-plan__timeline">
            ${plan.features.map(([label, text]) => `<div><span>${iconSvg('check')}</span><p><strong>${escapeHtml(label)}</strong>${escapeHtml(text)}</p></div>`).join('')}
          </div>
        </article>
      `).join('')}
    </div>`;
  return section;
}

export function createFaqPage() {
  const questions = [
  [
    "Что Simple CRM делает автоматически?",
    "Simple CRM отправляет клиентам напоминания перед встречей, о неоплаченной услуге и о повторной записи после перерыва. Сообщения приходят в Telegram, MAX или по SMS. Приложение также само узнаёт о поступлении оплаты и обновляет её статус.",
    "how-to/client-reminders/",
    "Как работают напоминания"
  ],
  [
    "Клиент не оплатил сеанс. Нужно писать ему самому?",
    "Simple CRM автоматически отправит напоминание об оплате. Клиент получает ссылку на оплату, а вы видите состояние расчётов в приложении — без отдельного сообщения в мессенджере и ручной сверки платежа.",
    "how-to/payment-reminders/",
    "Напоминания об оплате"
  ],
  [
    "Как приложение узнаёт, что клиент оплатил?",
    "Simple CRM получает подтверждение оплаты автоматически и обновляет статус. Вам не нужно просить клиента прислать скриншот перевода и вручную отмечать платёж.",
    "how-to/payment-reminders/",
    "Как проверить оплату"
  ],
  [
    "Клиент пришёл пару раз и перестал записываться. Что делать?",
    "Автоматическое напоминание о повторной записи поможет предложить клиенту вернуться после перерыва. История встреч и договорённостей останется в его карточке. Решение о новой записи принимает сам клиент.",
    "learn/follow-up-after-meeting/",
    "Как продолжить работу после паузы"
  ],
  [
    "Куда приходят напоминания?",
    "Клиент получает сообщения через Telegram, MAX или SMS. Эти каналы используются для напоминаний о встрече, неоплаченной услуге и повторной записи.",
    "how-to/client-reminders/",
    "Подробнее о сообщениях"
  ],
  [
    "Нужно ли клиенту устанавливать приложение?",
    "Нет. Клиент получает сообщение в мессенджере или по SMS, а ссылки на запись и оплату открывает в браузере. Работой с клиентом вы управляете в Simple CRM.",
    "how-to/client-reminders/",
    "Что получает клиент"
  ],
  [
    "Подойдёт ли Simple CRM для услуг и продаж?",
    "Да. Специалистам услуг приложение помогает вести встречи, повторные записи и оплаты. Консультантам и специалистам по продажам — сохранять историю обсуждений, назначать следующий контакт и не терять договорённости.",
    "about/",
    "Сценарии для вашей работы"
  ],
  [
    "Можно ли работать одному или с помощником?",
    "Можно начать самостоятельно: вести клиентов, встречи и личные задачи. В Pro доступны роли, общая история и работа с помощником или командой.",
    "pricing/",
    "Сравнить тарифы"
  ],
  [
    "Чем личная задача отличается от напоминания клиенту?",
    "Личная задача помогает вам вовремя позвонить, отправить предложение или подготовить документы. Автоматическое напоминание получает сам клиент. Вы можете использовать оба сценария в работе с одной карточкой.",
    "how-to/create-follow-up-task/",
    "Назначить личную задачу"
  ],
  [
    "Что делать при переносе встречи?",
    "Согласуйте новую дату и обновите запись. Затем проверьте время встречи и связанные с ней напоминания, чтобы клиент получил актуальные сведения.",
    "how-to/prepare-meeting/",
    "Подготовить или перенести встречу"
  ],
  [
    "Можно ли дать клиенту ссылку для записи?",
    "Да. Настройте доступные интервалы и отправьте клиенту персональную ссылку. Он выберет время в браузере, а новая запись появится в вашем расписании.",
    "how-to/prepare-meeting/",
    "Как организовать запись"
  ],
  [
    "На каких устройствах работает Simple CRM?",
    "Основное приложение доступно на iPhone. Для клиентской базы, расписания и задач также предусмотрен интерфейс для больших экранов.",
    "pricing/",
    "Возможности тарифов"
  ],
  [
    "Сколько стоит Simple CRM?",
    "Базовый режим бесплатный. Pro стоит 1 490 ₽ в месяц и включает дополнительные возможности: роли, общую историю, документы и приоритетную поддержку. Пробный период Pro — 14 дней.",
    "pricing/",
    "Посмотреть тарифы"
  ],
  [
    "Как добавить клиентов или перенести базу?",
    "Создайте карточку вручную или обратитесь в поддержку для переноса готовой базы. В карточке можно хранить контакты, встречи, задачи, заметки и расчёты. Группы, теги и статусы помогают находить нужных клиентов.",
    "support/",
    "Обратиться в поддержку"
  ],
  [
    "Кто имеет доступ к данным клиентов?",
    "Доступ зависит от прав пользователей аккаунта. Simple CRM использует данные для работы сервиса и не продаёт их для сторонней рекламы. Условия обработки и способы управления данными описаны в политике конфиденциальности.",
    "privacy/",
    "Как обрабатываются данные"
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
        <h1 id="about-title">Меньше рутины в работе с клиентами</h1>
        <p>Проводите консультации, оказываете услуги или ведёте продажи? Simple CRM собирает договорённости, встречи и оплаты, сама отправляет напоминания клиентам и помогает вовремя продолжить контакт.</p>
        </div>
      </header>
      <section class="company-page__team" aria-labelledby="team-title" data-reveal="scale">
        <div class="company-page__team-intro">
        <h2 id="team-title">Вы работаете с клиентом.<br /><span>CRM помнит о рутине.</span></h2>
        <p>Клиент не оплатил сеанс или давно не записывался? Simple CRM автоматически напомнит об оплате, предстоящей встрече или повторном визите через Telegram, MAX и SMS.</p>
        </div>
        <div class="company-page__principles">
          <div><h3>Оплата без ручной сверки</h3><p>Приложение само узнаёт о поступлении оплаты. Статус виден рядом с клиентом — не нужно искать подтверждение в переписке.</p></div>
          <div><h3>Контакт после паузы</h3><p>CRM напомнит о повторной записи. А для личного звонка или обсуждения предложения сохраните задачу со сроком и историей клиента.</p></div>
        </div>
      </section>
      <section class="company-page__news" aria-labelledby="company-news-title">
        <header data-reveal="scale"><h2 id="company-news-title">Обновления Simple CRM</h2><p>Что помогает быстрее находить договорённости и продолжать работу с клиентами.</p></header>
        <div class="article-grid"></div>
      </section>
    </div>`;
  [
    ['client-overview.jpg', 'Актуальная карточка клиента'],
    ['today-schedule.jpg', 'Актуальное расписание встреч'],
  ].forEach(([file, alt], index) => {
    const src = new URL(`../../assets/product-screens/${file}`, import.meta.url).href;
    const device = createProductDeviceMockup({ mode: 'image', device: 'phone', image: { src, alt } });
    device.classList.add('company-page__hero-screen');
    device.dataset.reveal = 'rise';
    device.dataset.delay = String(index * 140);
    section.querySelector('.company-page__hero').append(device);
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
      id: 'general',
      title: '1. Общие положения',
      paragraphs: [
        'Simple CRM (далее — «Сервис», «мы») помогает специалистам вести клиентскую базу, встречи, задачи, заметки, сообщения и расчёты. Настоящая политика распространяется на приложение Simple CRM, сайт и обращения в службу поддержки.',
        'Используя Simple CRM, вы подтверждаете, что ознакомились с этой политикой. Если вы добавляете сведения о клиентах, вы обязаны иметь законное основание для их обработки и передачи сервису.',
      ],
    },
    {
      id: 'data',
      title: '2. Какие данные мы обрабатываем',
      paragraphs: ['Состав данных зависит от того, какими возможностями Simple CRM вы пользуетесь. Мы обрабатываем только сведения, необходимые для работы сервиса, безопасности и поддержки.'],
      items: [
        'Данные аккаунта: имя, адрес электронной почты, номер телефона, данные профиля и настройки.',
        'Рабочие данные: карточки клиентов, контакты, встречи, задачи, заметки, документы, услуги и статусы расчётов, которые вы добавляете самостоятельно.',
        'Платёжные данные: тариф, сумма, дата и статус операции, идентификатор счёта или платежа. Полные реквизиты банковской карты обрабатывает платёжный провайдер; Simple CRM их не хранит.',
        'Обращения в поддержку: содержание сообщений, приложенные файлы и сведения, необходимые для ответа на запрос.',
        'Технические данные: тип устройства и браузера, версия приложения, IP-адрес, часовой пояс, журналы ошибок, входов и событий безопасности.',
        'Данные об использовании: открытые разделы и выполненные действия, необходимые для работы функций, диагностики и улучшения сервиса.',
      ],
    },
    {
      id: 'purposes',
      title: '3. Для чего мы используем данные',
      paragraphs: [
        'Мы используем данные, чтобы предоставлять и развивать Simple CRM, а также выполнять действия, которые вы запускаете в приложении.',
        'Мы не продаём персональные данные и не передаём их третьим лицам для сторонней рекламы.',
      ],
      items: [
        'Создавать аккаунт, сохранять настройки и синхронизировать информацию между устройствами.',
        'Вести клиентскую базу, расписание, задачи, заметки, документы и историю работы.',
        'Отправлять сообщения и ссылки на оплату, а также автоматические напоминания о встречах, неоплаченных услугах и повторной записи в соответствии с вашими настройками.',
        'Оформлять подписку, учитывать оплаты и показывать актуальный статус расчётов.',
        'Отвечать на обращения, диагностировать ошибки и восстанавливать доступ.',
        'Предотвращать несанкционированный доступ, злоупотребления и мошеннические действия.',
        'Анализировать работу функций и улучшать стабильность, удобство и производительность сервиса.',
        'Выполнять требования закона и защищать права пользователей и Simple CRM.',
      ],
    },
    {
      id: 'legal-bases',
      title: '4. Правовые основания обработки',
      paragraphs: ['Мы обрабатываем данные только при наличии законного основания, которое соответствует цели обработки.'],
      items: [
        'Исполнение пользовательского соглашения и предоставление функций Simple CRM.',
        'Действия по вашему запросу до заключения договора, включая создание аккаунта и подключение тарифа.',
        'Ваше согласие — например, для отдельных уведомлений или обработки данных, для которой требуется согласие.',
        'Законный интерес Simple CRM: обеспечение безопасности, предотвращение злоупотреблений, поддержка и улучшение сервиса при соблюдении прав пользователей.',
        'Исполнение требований закона, обязательных запросов и обязанностей по бухгалтерскому и налоговому учёту.',
      ],
    },
    {
      id: 'client-data',
      title: '5. Данные ваших клиентов',
      paragraphs: [
        'Вы определяете, какие сведения о клиентах вносить в Simple CRM и для каких целей их использовать. Вы отвечаете за уведомление клиентов, получение необходимых согласий и законность обработки этих сведений.',
        'Simple CRM обрабатывает данные клиентов по поручению владельца аккаунта: хранит их, показывает уполномоченным пользователям и выполняет действия, необходимые для работы выбранных функций, поддержки и безопасности.',
        'Добавляйте только те сведения, которые действительно нужны для работы. Если вы храните данные о здоровье, несовершеннолетних или другие специальные категории данных, заранее убедитесь, что у вас есть соответствующее законное основание и необходимые разрешения.',
      ],
    },
    {
      id: 'providers',
      title: '6. Передача данных партнёрам',
      paragraphs: [
        'Для работы Simple CRM мы привлекаем поставщиков инфраструктуры и отдельных функций. Им передаётся только тот объём данных, который необходим для оказания соответствующей услуги.',
        'Поставщики обязуются соблюдать конфиденциальность и меры защиты данных. Мы также можем раскрыть сведения, если этого требует закон, судебный акт или защита прав и безопасности пользователей и Simple CRM.',
      ],
      items: [
        'Хостинг, хранение файлов, резервное копирование и техническая инфраструктура.',
        'Доставка электронных писем, SMS, push-уведомлений и сообщений в Telegram и MAX. Для доставки используется контакт клиента в выбранном канале.',
        'Приём платежей, выставление счетов и подтверждение статуса операции.',
        'Диагностика ошибок, защита сервиса, аналитика и обработка обращений в поддержку.',
      ],
    },
    {
      id: 'storage',
      title: '7. Хранение и защита данных',
      paragraphs: [
        'Мы храним данные, пока ваш аккаунт активен, а после его закрытия — только в течение срока, необходимого для удаления резервных копий, исполнения обязательств и соблюдения требований закона. Данные, которые больше не нужны, удаляются или обезличиваются.',
        'Для защиты информации используются разграничение прав доступа, защищённая передача и хранение данных, резервное копирование, журналирование событий и контроль доступа сотрудников. Доступ получают только специалисты, которым он необходим для работы сервиса или поддержки.',
        'Ни один способ хранения не может гарантировать абсолютную безопасность. Если вы заметили подозрительную активность или возможную утечку, сразу измените пароль и сообщите в поддержку.',
      ],
    },
    {
      id: 'rights',
      title: '8. Ваши права и управление данными',
      paragraphs: ['Вы можете управлять большей частью сведений прямо в приложении или обратиться в поддержку. Перед выполнением запроса мы можем попросить подтвердить личность и право распоряжаться данными.'],
      items: [
        'Получить информацию о данных, которые связаны с вашим аккаунтом.',
        'Исправить неточные или устаревшие сведения.',
        'Запросить экспорт данных в доступном формате.',
        'Удалить отдельные записи или весь аккаунт.',
        'Ограничить доступ сотрудников и помощников к рабочей информации.',
        'Отозвать согласие, если обработка основана на согласии.',
      ],
    },
    {
      id: 'cookies',
      title: '9. Сайт, cookies и технические данные',
      paragraphs: [
        'Сайт и приложение используют необходимые cookies и локальное хранилище для входа, сохранения настроек, безопасности и стабильной работы. Техническая аналитика применяется для поиска ошибок и улучшения сервиса в обезличенном или агрегированном виде.',
        'Вы можете ограничить cookies в настройках браузера, но часть функций после этого может работать некорректно.',
      ],
    },
    {
      id: 'updates-contact',
      title: '10. Изменения и связь с нами',
      paragraphs: [
        'Мы обновляем эту политику, когда меняются функции Simple CRM, способы обработки данных или требования закона. Актуальная версия всегда размещается на этой странице; при существенных изменениях мы дополнительно уведомим пользователей в приложении или по электронной почте.',
        'По вопросам конфиденциальности, доступа, экспорта или удаления данных обратитесь в службу поддержки Simple CRM.',
      ],
      link: { href: 'support/', label: 'Обратиться в поддержку' },
    },
  ];
  const section = document.createElement('section');
  section.className = 'inner-page section document-page document-page--dextr privacy-page';
  section.dataset.reveal = 'scale';
  section.setAttribute('aria-labelledby', 'privacy-title');
  section.innerHTML = `<div class="container document-single editorial-layout"><article class="document-main"><header class="document-header"><h1 id="privacy-title">Политика конфиденциальности</h1><p class="document-updated">Действует с 7 октября 2026 года</p><p class="document-lead">В этой политике описано, какие данные получает Simple CRM, как мы используем и защищаем их и как вы можете управлять своими данными и данными клиентов.</p></header><div class="document-body">${chapters.map(chapter => `<section id="${escapeAttribute(chapter.id)}"><h2>${escapeHtml(chapter.title)}</h2>${chapter.paragraphs.map(paragraph => `<p>${escapeHtml(paragraph)}</p>`).join('')}${chapter.items ? `<ul>${chapter.items.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul>` : ''}${chapter.link ? `<p><a class="text-link" href="${escapeAttribute(new URL(`../../${chapter.link.href}`, import.meta.url).href)}">${escapeHtml(chapter.link.label)} ${iconSvg('arrow-right')}</a></p>` : ''}</section>`).join('')}</div></article><aside class="editorial-sidebar"><details class="editorial-toc" open><summary>На этой странице</summary><nav aria-label="Разделы политики конфиденциальности">${chapters.map(c => `<a href="#${escapeAttribute(c.id)}">${escapeHtml(c.title)}</a>`).join('')}</nav></details></aside></div>`;
  if (window.matchMedia('(max-width: 900px)').matches) section.querySelector('.editorial-toc').open = false;
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
