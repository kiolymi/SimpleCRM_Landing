export const categoryMeta = {
  learn: { title: 'Материалы', description: 'Коротко о том, как не терять нить в работе с клиентами', href: '/SimpleCRM_Landing/learn/' },
  'how-to': { title: 'Инструкции', description: 'Пошаговые сценарии по возможностям, которые уже есть в продукте', href: '/SimpleCRM_Landing/how-to/' },
  announcements: { title: 'Обновления', description: 'Новые возможности Simple CRM и заметки команды продукта', href: '/SimpleCRM_Landing/announcements/' },
};

export const articles = [
  {
    slug: 'follow-up-after-meeting',
    category: 'learn',
    title: 'Как не терять следующий шаг после встречи',
    excerpt: 'Клиент, встреча, договорённость и задача — чтобы ничего не растворилось после разговора',
    publishedAt: '18 августа 2026',
    author: 'Команда Simple CRM',
    href: '/SimpleCRM_Landing/learn/follow-up-after-meeting/',
    cover: { kicker: 'Сценарий', label: 'Следующий шаг после встречи', icon: 'task-list', image: { src: '/SimpleCRM_Landing/simple-crm-landing-screens/20-task-board.png', alt: 'Доска задач после встречи' }, aspectRatio: '1 / 1' },
    tags: ['встречи', 'задачи', 'клиенты'],
    relatedSlugs: ['client-context', 'create-follow-up-task'],
    featured: true,
    content: [
      { type: 'p', text: 'После встречи обычно остаётся пара мыслей и одно важное обещание. Когда всё это рядом с карточкой клиента, к разговору легко вернуться в нужный момент.' },
      { type: 'h2', text: 'Сначала верните контекст клиента' },
      { type: 'p', text: 'В Client 360 видны обзор и активность клиента, а ещё встречи, задачи, сообщения, документы и счета. Не нужно вспоминать, в каком разделе лежит нужная деталь.' },
      { type: 'mockup', device: 'phone', label: 'Клиент и встреча' },
      { type: 'h2', text: 'Зафиксируйте договорённость в задаче' },
      { type: 'p', text: 'У задачи можно указать приоритет, срок и исполнителя. Так договорённость не остаётся в голове у одного человека.' },
      { type: 'h2', text: 'Проверьте, что изменилось' },
      { type: 'p', text: 'Когда придёт время написать или созвониться снова, откройте клиента. Встреча, задача и переписка останутся в одном рабочем месте.' },
    ],
  },
  {
    slug: 'client-context',
    category: 'learn',
    title: 'Что держать рядом с карточкой клиента',
    excerpt: 'Встречи, задачи, сообщения, документы и счета легче вести, когда они собраны рядом',
    publishedAt: '12 августа 2026',
    author: 'Мария Соколова',
    href: '/SimpleCRM_Landing/learn/client-context/',
    cover: { kicker: 'Практика', label: 'Вся история клиента рядом', icon: 'contact', image: { src: '/SimpleCRM_Landing/simple-crm-landing-screens/15-client-overview.png', alt: 'Полная карточка клиента' }, aspectRatio: '1 / 1' },
    tags: ['клиенты', 'сообщения', 'документы'],
    relatedSlugs: ['follow-up-after-meeting', 'prepare-meeting'],
    featured: true,
    content: [
      { type: 'p', text: 'Карточка клиента нужна не для ещё одного списка полей. Она помогает быстро понять, где сейчас работа с человеком и что требует внимания.' },
      { type: 'h2', text: 'Начните с обзора и активности' },
      { type: 'p', text: 'В Client 360 есть обзор, активность и контакты. Это удобная точка входа перед разговором или встречей.' },
      { type: 'h2', text: 'Свяжите рабочие действия с клиентом' },
      { type: 'p', text: 'Встречи, задачи, сообщения, документы и счета собраны в клиентском сценарии. Команде не приходится гадать, где искать следующий факт.' },
      { type: 'mockup', device: 'phone', label: 'Контекст клиента' },
      { type: 'h2', text: 'Оставьте в карточке только полезное' },
      { type: 'p', text: 'Закрепите ключевые контакты, ближайшую встречу и текущую задачу в обзоре. Остальная история останется доступна во вкладке активности.' },
    ],
  },
  {
    slug: 'prepare-meeting',
    category: 'how-to',
    title: 'Как подготовить встречу в Simple CRM',
    excerpt: 'Клиент, время, детали и всё, к чему нужно вернуться перед разговором',
    publishedAt: '7 августа 2026',
    author: 'Команда поддержки',
    href: '/SimpleCRM_Landing/how-to/prepare-meeting/',
    cover: { kicker: 'Инструкция', label: 'Подготовка встречи', icon: 'calendar', image: { src: '/SimpleCRM_Landing/simple-crm-landing-screens/11-create-meeting.png', alt: 'Форма создания встречи' }, aspectRatio: '1 / 1' },
    tags: ['встречи', 'календарь'],
    relatedSlugs: ['follow-up-after-meeting', 'create-follow-up-task'],
    featured: true,
    content: [
      { type: 'p', text: 'Создайте встречу за минуту: выберите клиента, укажите формат и добавьте детали, которые понадобятся команде.' },
      { type: 'h2', text: 'Выберите клиента' },
      { type: 'p', text: 'Начните с выбора клиента. Так встреча сразу окажется рядом с тем, что уже известно о человеке.' },
      { type: 'h2', text: 'Укажите дату и время' },
      { type: 'p', text: 'Укажите дату, время начала и окончания, длительность и формат или место встречи — если это нужно.' },
      { type: 'mockup', device: 'phone', label: 'Календарь и встреча' },
      { type: 'h2', text: 'Вернитесь к деталям при изменениях' },
      { type: 'p', text: 'После сохранения можно вернуться к деталям. Если планы поменялись, встречу можно перенести или отменить.' },
    ],
  },
  {
    slug: 'create-follow-up-task',
    category: 'how-to',
    title: 'Как оформить следующий шаг после разговора',
    excerpt: 'Запишите действие так, чтобы к нему не пришлось возвращаться с вопросом «а что дальше?»',
    publishedAt: '2 августа 2026',
    author: 'Команда поддержки',
    href: '/SimpleCRM_Landing/how-to/create-follow-up-task/',
    cover: { kicker: 'Инструкция', label: 'Задача после разговора', icon: 'task-list', image: { src: '/SimpleCRM_Landing/simple-crm-landing-screens/20-task-board.png', alt: 'Доска задач со статусами' }, aspectRatio: '1 / 1' },
    tags: ['задачи', 'команда'],
    relatedSlugs: ['prepare-meeting', 'follow-up-after-meeting'],
    featured: true,
    content: [
      { type: 'p', text: 'Следующий шаг полезен, когда его можно понять без расшифровки. В задачах Simple CRM есть приоритет, срок и исполнитель.' },
      { type: 'h2', text: 'Сформулируйте действие' },
      { type: 'p', text: 'Запишите, что должно произойти дальше. Тогда задачу поймёт и тот, кто создаёт её, и тот, кто увидит позже.' },
      { type: 'h2', text: 'Добавьте срок и приоритет' },
      { type: 'p', text: 'Срок поможет вернуться к действию вовремя, а приоритет — не потерять его среди остальных задач.' },
      { type: 'mockup', device: 'phone', label: 'Задачи' },
      { type: 'h2', text: 'Назначьте исполнителя, если задача командная' },
      { type: 'p', text: 'Для командной задачи назначьте исполнителя. После сохранения её можно завершить, вернуть в работу или удалить.' },
    ],
  },
  {
    slug: 'unified-client-history',
    category: 'announcements',
    title: 'Единая история клиента стала ещё нагляднее',
    excerpt: 'Встречи, задачи, сообщения, документы и оплаты теперь собраны в одном хронологическом потоке',
    publishedAt: '21 августа 2026',
    author: 'Команда Simple CRM',
    href: '/SimpleCRM_Landing/announcements/unified-client-history/',
    cover: { kicker: 'Обновление', label: 'Новая история Client 360', icon: 'contact', image: { src: '/SimpleCRM_Landing/simple-crm-landing-screens/16-client-activity.png', alt: 'Активность в карточке клиента' }, aspectRatio: '1 / 1' },
    tags: ['обновления', 'клиенты', 'история'],
    relatedSlugs: ['client-context', 'follow-up-after-meeting'],
    featured: true,
    content: [
      { type: 'p', text: 'Обновили карточку клиента, чтобы вся рабочая история читалась как один последовательный сценарий — от первого обращения до оплаты.' },
      { type: 'h2', text: 'Главное видно сразу' },
      { type: 'p', text: 'В верхней части карточки отображаются ближайшая встреча, открытые задачи и сумма ожидаемых оплат.' },
      { type: 'mockup', device: 'phone', label: 'Контекст клиента' },
      { type: 'h2', text: 'Быстрее переходите к действию' },
      { type: 'p', text: 'Из карточки можно написать клиенту, создать встречу или назначить задачу, не переключаясь между разделами.' },
    ],
  },
  {
    slug: 'task-board-release',
    category: 'announcements',
    title: 'Доска задач для ежедневной работы команды',
    excerpt: 'Переключайтесь между списком и доской, чтобы быстро видеть нагрузку и просроченные действия',
    publishedAt: '9 августа 2026',
    author: 'Команда Simple CRM',
    href: '/SimpleCRM_Landing/announcements/task-board-release/',
    cover: { kicker: 'Обновление', label: 'Доска задач команды', icon: 'task-list', image: { src: '/SimpleCRM_Landing/simple-crm-landing-screens/20-task-board.png', alt: 'Доска задач команды' }, aspectRatio: '1 / 1' },
    tags: ['обновления', 'задачи', 'команда'],
    relatedSlugs: ['create-follow-up-task', 'follow-up-after-meeting'],
    featured: true,
    content: [
      { type: 'p', text: 'Добавили представление «Доска»: новые задачи, работа в процессе и завершённые действия теперь видны на одном экране.' },
      { type: 'h2', text: 'Сфокусируйтесь на следующем шаге' },
      { type: 'p', text: 'Цветовые статусы помогают заметить важные и просроченные задачи, а прогресс подзадач показывает, что уже сделано.' },
      { type: 'mockup', device: 'phone', label: 'Задачи' },
      { type: 'h2', text: 'Список остаётся рядом' },
      { type: 'p', text: 'Для быстрого просмотра сроков можно в любой момент вернуться к компактному списку — фильтры сохранятся.' },
    ],
  },
];

export function getArticlesByCategory(category) {
  return articles.filter(article => article.category === category);
}

export function getArticleBySlug(slug) {
  return articles.find(article => article.slug === slug);
}

export function findArticles(query) {
  const normalizedQuery = query.trim().toLocaleLowerCase('ru');
  if (!normalizedQuery) return [];
  return articles.filter(article => [article.title, article.excerpt, ...(article.tags || [])].join(' ').toLocaleLowerCase('ru').includes(normalizedQuery));
}
