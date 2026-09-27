export const siteConfig = {
  name: 'Simple CRM',
  logo: {
    src: '/favicon-64.png?v=20260927-appicon1',
    alt: 'Логотип Simple CRM',
    width: 36,
    height: 36,
  },
  announcement: {
    text: 'Вышла Simple CRM 1.4: новая доска задач и единая история клиента',
    linkLabel: 'Что нового',
    href: '/releases/',
  },
  primaryCta: { label: 'Посмотреть сценарии', href: '/#practice' },
};

export const primaryNavigation = [
  { label: 'Как помогает', href: '/about/' },
  { label: 'Тарифы', href: '/pricing/' },
  { label: 'Вопросы', href: '/faq/' },
  { label: 'Конфиденциальность', href: '/privacy/' },
  { label: 'Версии', href: '/releases/' },
  { label: 'Поддержка', href: '/support/' },
];

export const resourceNavigation = [
  { label: 'Материалы', href: '/learn/' },
  { label: 'Инструкции', href: '/how-to/' },
  { label: 'Обновления', href: '/announcements/' },
];

export const footerNavigation = [
  { label: 'Материалы', href: '/learn/' },
  { label: 'Инструкции', href: '/how-to/' },
  { label: 'Обновления', href: '/announcements/' },
  { label: 'Как помогает', href: '/about/' },
  { label: 'Тарифы', href: '/pricing/' },
  { label: 'Вопросы', href: '/faq/' },
  { label: 'Конфиденциальность', href: '/privacy/' },
  { label: 'История версий', href: '/releases/' },
  { label: 'Поддержка', href: '/support/' },
];

export const pageMeta = {
  home: { eyebrow: 'Simple CRM', title: 'Клиентская база для частной практики', description: 'Всё для работы с клиентами: база, встречи, договорённости, задачи и оплаты для любой самостоятельной практики' },
  pricing: { eyebrow: 'Simple CRM', title: 'Тарифы', description: 'Бесплатный режим и Pro для расширенной работы с клиентами' },
  about: { eyebrow: 'Simple CRM', title: 'Как помогает', description: 'Как Simple CRM помогает организовать частную практику и работу с клиентами' },
  faq: { eyebrow: 'Simple CRM', title: 'Вопросы и ответы', description: 'Короткие ответы о клиентах, встречах, оплатах и начале работы' },
  support: { eyebrow: 'Simple CRM', title: 'Поддержка', description: 'Поможем с настройкой, клиентской базой и первым запуском' },
  learn: { eyebrow: 'Simple CRM', title: 'Материалы', description: 'Коротко о встречах, задачах и следующем шаге' },
  'how-to': { eyebrow: 'Simple CRM', title: 'Инструкции', description: 'Пошаговые сценарии по работе с клиентами' },
  announcements: { eyebrow: 'Simple CRM', title: 'Обновления', description: 'Новые возможности и улучшения Simple CRM' },
  privacy: { eyebrow: 'Simple CRM', title: 'Конфиденциальность', description: 'Какие данные могут понадобиться сервису и что важно проверить до начала работы' },
  releases: { eyebrow: 'Simple CRM', title: 'История версий', description: 'Новые возможности, улучшения и исправления Simple CRM' },
  search: { eyebrow: 'Simple CRM', title: 'Поиск', description: 'Поиск по материалам Simple CRM' },
};
