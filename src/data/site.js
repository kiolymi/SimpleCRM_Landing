export const siteConfig = {
  name: 'Simple CRM',
  logo: {
    src: '/favicon-64.png?v=20260927-appicon1',
    alt: 'Логотип Simple CRM',
    width: 36,
    height: 36,
  },
  announcement: {
    text: 'Новые возможности Simple CRM: задачи, оплаты и единая история клиента',
    linkLabel: 'Открыть обновления',
    href: '/announcements/',
  },
  primaryCta: { label: 'Посмотреть сценарии', href: '/#practice' },
};

export const primaryNavigation = [
  { label: 'Главная', href: '/' },
  { label: 'Материалы', href: '/learn/' },
  { label: 'Как помогает', href: '/about/' },
  { label: 'Тарифы', href: '/pricing/' },
  { label: 'Вопросы', href: '/faq/' },
  { label: 'Конфиденциальность', href: '/privacy/' },
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
  privacy: { eyebrow: 'Simple CRM', title: 'Политика конфиденциальности', description: 'Как Simple CRM обрабатывает и защищает данные пользователей и их клиентов' },
  search: { eyebrow: 'Simple CRM', title: 'Поиск', description: 'Поиск по материалам Simple CRM' },
};
