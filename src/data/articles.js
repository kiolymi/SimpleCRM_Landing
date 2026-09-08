export const categoryMeta = {
  learn: { title: 'Материалы', description: 'Идеи и практики о том, как помнить клиентов, видеть контекст и возвращаться к нужным людям вовремя.', href: '/learn/' },
  'how-to': { title: 'Инструкции', description: 'Пошаговые подсказки по Simple CRM: клиенты, встречи, задачи, документы и ежедневная работа команды.', href: '/how-to/' },
  announcements: { title: 'Объявления', description: 'Новые возможности, улучшения интерфейса и заметки команды Simple CRM о развитии продукта.', href: '/announcements/' },
};

export const articles = [
  {
    slug: 'follow-up-after-meeting',
    category: 'learn',
    title: 'Как не терять следующий шаг после встречи',
    excerpt: 'Клиент, встреча, договорённость и задача — чтобы ничего не растворилось после разговора',
    publishedAt: '18 августа 2026',
    author: 'Команда Simple CRM',
    href: '/learn/follow-up-after-meeting/',
    cover: { kicker: 'Сценарий', label: 'Следующий шаг после встречи', icon: 'task-list', image: { src: '/simple-crm-landing-screens/20-task-board.png', alt: 'Доска задач после встречи' }, aspectRatio: '1 / 1' },
    tags: ['встречи', 'задачи', 'клиенты'],
    relatedSlugs: ['client-context', 'create-follow-up-task'],
    featured: true,
    content: [
      { type: 'p', text: 'После встречи обычно остаётся пара мыслей и одно важное обещание. Когда всё это рядом с карточкой клиента, к разговору легко вернуться в нужный момент.' },
      { type: 'h2', text: 'Сначала верните контекст клиента' },
      { type: 'p', text: 'В Client 360 видны обзор и активность клиента, а ещё встречи, задачи, сообщения, документы и счета. Не нужно вспоминать, в каком разделе лежит нужная деталь.' },
      { type: 'mockup', device: 'phone', label: 'Карточка клиента с ближайшей встречей', screen: '15-client-overview.png' },
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
    href: '/learn/client-context/',
    cover: { kicker: 'Практика', label: 'Вся история клиента рядом', icon: 'contact', image: { src: '/simple-crm-landing-screens/15-client-overview.png', alt: 'Полная карточка клиента' }, aspectRatio: '1 / 1' },
    tags: ['клиенты', 'сообщения', 'документы'],
    relatedSlugs: ['follow-up-after-meeting', 'prepare-meeting'],
    featured: true,
    content: [
      { type: 'p', text: 'Карточка клиента нужна не для ещё одного списка полей. Она помогает быстро понять, где сейчас работа с человеком и что требует внимания.' },
      { type: 'h2', text: 'Начните с обзора и активности' },
      { type: 'p', text: 'В Client 360 есть обзор, активность и контакты. Это удобная точка входа перед разговором или встречей.' },
      { type: 'h2', text: 'Свяжите рабочие действия с клиентом' },
      { type: 'p', text: 'Встречи, задачи, сообщения, документы и счета собраны в клиентском сценарии. Команде не приходится гадать, где искать следующий факт.' },
      { type: 'mockup', device: 'phone', label: 'Контекст клиента', screen: '15-client-overview.png' },
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
    href: '/how-to/prepare-meeting/',
    cover: { kicker: 'Инструкция', label: 'Подготовка встречи', icon: 'calendar', image: { src: '/simple-crm-landing-screens/11-create-meeting.png', alt: 'Форма создания встречи' }, aspectRatio: '1 / 1' },
    tags: ['встречи', 'календарь'],
    relatedSlugs: ['follow-up-after-meeting', 'create-follow-up-task'],
    featured: true,
    content: [
      { type: 'p', text: 'В форме «Новая встреча» соберите всё необходимое: клиента, время, формат, локацию и услугу. Перед сохранением проверьте, что детали совпадают с вашей договорённостью.' },
      { type: 'h2', text: 'Выберите клиента' },
      { type: 'p', text: 'В поле «Клиент» выберите человека, с которым договорились о встрече. Проверьте имя, чтобы запись не оказалась в чужой карточке.' },
      { type: 'h2', text: 'Укажите дату и время' },
      { type: 'p', text: 'Заполните поля «Дата» и «Время». Например, на экране встреча запланирована с 14:30 до 15:20. Убедитесь, что времени хватит на разговор.' },
      { type: 'h2', text: 'Уточните формат и место' },
      { type: 'p', text: 'Выберите «Формат», затем укажите «Локацию» и «Услугу». Для очной встречи важно сохранить конкретное место, чтобы не уточнять адрес перед самым началом.' },
      { type: 'mockup', device: 'phone', label: 'Создание встречи с клиентом', screen: '11-create-meeting.png' },
      { type: 'h2', text: 'Сохраните встречу' },
      { type: 'p', text: 'Нажмите «Создать встречу» внизу формы. После сохранения откройте запись и ещё раз проверьте клиента, время и место — к этим деталям вы вернётесь перед разговором.' },
    ],
  },
  {
    slug: 'create-follow-up-task',
    category: 'how-to',
    title: 'Как оформить следующий шаг после разговора',
    excerpt: 'Запишите действие так, чтобы к нему не пришлось возвращаться с вопросом «а что дальше?»',
    publishedAt: '2 августа 2026',
    author: 'Команда поддержки',
    href: '/how-to/create-follow-up-task/',
    cover: { kicker: 'Инструкция', label: 'Задача после разговора', icon: 'task-list', image: { src: '/simple-crm-landing-screens/20-task-board.png', alt: 'Доска задач со статусами' }, aspectRatio: '1 / 1' },
    tags: ['задачи', 'команда'],
    relatedSlugs: ['prepare-meeting', 'follow-up-after-meeting'],
    featured: true,
    content: [
      { type: 'p', text: 'В форме «Новая задача» превратите договорённость в конкретное действие: запишите результат, выберите срок и приоритет, укажите клиента.' },
      { type: 'h2', text: 'Сформулируйте действие' },
      { type: 'p', text: 'В поле «Задача» напишите, что нужно сделать. «Подготовить план проекта» понятнее, чем «Проект»: название сразу объясняет следующий шаг.' },
      { type: 'h2', text: 'Добавьте срок и приоритет' },
      { type: 'p', text: 'Укажите дату и время выполнения, затем выберите приоритет. На примере срок — сегодня, 18:00, а приоритет — высокий. Для своей задачи выберите значения по договорённости с клиентом.' },
      { type: 'h2', text: 'Свяжите задачу с клиентом' },
      { type: 'p', text: 'Нажмите «Клиент» и выберите нужную карточку. Дополнительные пояснения к действию можно указать в разделе «Детали».' },
      { type: 'mockup', device: 'phone', label: 'Новая задача со сроком и приоритетом', screen: '24-create-task.png' },
      { type: 'h2', text: 'Сохраните следующий шаг' },
      { type: 'p', text: 'Нажмите «Создать задачу» внизу формы. Проверьте новую запись в задачах: название должно объяснять действие, а срок — подсказывать, когда к нему вернуться.' },
    ],
  },
  {
    slug: 'unified-client-history',
    category: 'announcements',
    title: 'Единая история клиента стала ещё нагляднее',
    excerpt: 'Встречи, задачи, сообщения, документы и оплаты теперь собраны в одном хронологическом потоке',
    publishedAt: '21 августа 2026',
    author: 'Команда Simple CRM',
    href: '/announcements/unified-client-history/',
    cover: { kicker: 'Обновление', label: 'Новая история Client 360', icon: 'contact', image: { src: '/simple-crm-landing-screens/16-client-activity.png', alt: 'Активность в карточке клиента' }, aspectRatio: '1 / 1' },
    tags: ['обновления', 'клиенты', 'история'],
    relatedSlugs: ['client-context', 'follow-up-after-meeting'],
    featured: true,
    content: [
      { type: 'p', text: 'Обновили карточку клиента, чтобы вся рабочая история читалась как один последовательный сценарий — от первого обращения до оплаты.' },
      { type: 'h2', text: 'Главное видно сразу' },
      { type: 'p', text: 'В карточке видны контакты и ближайшая встреча. Отсюда можно открыть встречи и задачи, сообщения и файлы — нужный раздел всегда рядом.' },
      { type: 'mockup', device: 'phone', label: 'Контекст клиента', screen: '15-client-overview.png' },
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
    href: '/announcements/task-board-release/',
    cover: { kicker: 'Обновление', label: 'Доска задач команды', icon: 'task-list', image: { src: '/simple-crm-landing-screens/20-task-board.png', alt: 'Доска задач команды' }, aspectRatio: '1 / 1' },
    tags: ['обновления', 'задачи', 'команда'],
    relatedSlugs: ['create-follow-up-task', 'follow-up-after-meeting'],
    featured: true,
    content: [
      { type: 'p', text: 'Добавили представление «Доска»: новые задачи, работа в процессе и завершённые действия теперь видны на одном экране.' },
      { type: 'h2', text: 'Сфокусируйтесь на следующем шаге' },
      { type: 'p', text: 'Цветовые статусы помогают заметить важные и просроченные задачи, а прогресс подзадач показывает, что уже сделано.' },
      { type: 'mockup', device: 'phone', label: 'Доска задач со статусами и подзадачами', screen: '20-task-board.png' },
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
  const normalize = value => String(value).normalize('NFKC').toLocaleLowerCase('ru').replaceAll('ё', 'е');
  const terms = normalize(query).match(/[\p{L}\p{N}]+/gu) || [];
  if (!terms.length) return [];
  return articles.filter(article => {
    const text = normalize([
      article.title,
      article.excerpt,
      ...(article.tags || []),
      ...(article.content || []).map(block => block.text || ''),
    ].join(' '));
    return terms.every(term => text.includes(term));
  });
}
