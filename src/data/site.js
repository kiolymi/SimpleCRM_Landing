export const siteConfig = {
  name: 'Simple CRM',
  logo: {
    src: '/simple-crm-logo-refined.png',
    alt: 'Логотип Simple CRM',
    width: 36,
    height: 36,
  },
  announcement: {
    text: 'Вышла Simple CRM 1.4: новая доска задач и единая история клиента',
    linkLabel: 'Что нового',
    href: '/releases/',
  },
  primaryCta: { label: 'Попробовать бесплатно', href: '/#demo' },
};

export const primaryNavigation = [
  { label: 'О продукте', href: '/about/' },
  { label: 'Тарифы', href: '/pricing/' },
  { label: 'Вопросы', href: '/faq/' },
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
  { label: 'О продукте', href: '/about/' },
  { label: 'Тарифы', href: '/pricing/' },
  { label: 'Вопросы', href: '/faq/' },
  { label: 'Конфиденциальность', href: '/privacy/' },
  { label: 'История версий', href: '/releases/' },
  { label: 'Поддержка', href: '/support/' },
];

export const pageMeta = {
  home: { eyebrow: 'Simple CRM', title: 'Вся работа с клиентом — в одном месте', description: 'Встречи, задачи, переписка, документы и оплаты в единой истории клиента' },
  pricing: { eyebrow: 'Simple CRM', title: 'Тарифы', description: 'Прозрачные условия для самостоятельной работы и команды' },
  about: { eyebrow: 'Simple CRM', title: 'О продукте', description: 'О том, как Simple CRM помогает не терять нить в работе с клиентами' },
  faq: { eyebrow: 'Simple CRM', title: 'Вопросы и ответы', description: 'Короткие ответы о том, что уже есть в продукте' },
  support: { eyebrow: 'Simple CRM', title: 'Поддержка', description: 'Поможем с продуктом, настройкой и первым запуском' },
  learn: { eyebrow: 'Simple CRM', title: 'Материалы', description: 'Коротко о встречах, задачах и следующем шаге' },
  'how-to': { eyebrow: 'Simple CRM', title: 'Инструкции', description: 'Пошаговые сценарии по работе в продукте' },
  announcements: { eyebrow: 'Simple CRM', title: 'Обновления', description: 'Новые возможности и улучшения Simple CRM' },
  privacy: { eyebrow: 'Simple CRM', title: 'Конфиденциальность', description: 'Какие данные нужны сервису и как мы их защищаем' },
  releases: { eyebrow: 'Simple CRM', title: 'История версий', description: 'Новые возможности, улучшения и исправления Simple CRM' },
  search: { eyebrow: 'Simple CRM', title: 'Поиск', description: 'Поиск по материалам Simple CRM' },
};
