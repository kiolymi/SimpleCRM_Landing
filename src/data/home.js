import { articles } from './articles.js?v=practice16';

export const homeContent = {
  hero: {
    title: 'Больше внимания клиентам. Меньше забот между встречами.',
    lead: 'Клиентская база, записи, переносы и оплаты — в одном месте. Simple CRM помогает вести частную практику и не держать все договорённости в голове.',
    audience: 'Для психологов, коучей, тренеров и специалистов, которые работают с клиентами лично.',
    mockup: { device: 'phone', label: 'Сегодня', screen: 'today', image: { src: '/simple-crm-landing-screens/01-today-schedule.png', alt: 'Расписание встреч на сегодня в Simple CRM' } },
  },
  features: [
    { icon: 'contact', title: 'Откройте клиента', description: 'Контакты, сообщения, встречи и задачи собраны рядом. Можно вспомнить договорённости перед консультацией, тренировкой или занятием.', mockup: { device: 'phone', label: 'Клиент', screen: 'client', image: { src: '/simple-crm-landing-screens/15-client-overview.png', alt: 'Карточка клиента с контактами, встречами и задачами' } } },
    { icon: 'calendar', title: 'Проверьте встречу', description: 'Когда и где встречаетесь, очно или онлайн, подтверждена ли запись. После переноса обновите детали здесь, чтобы к ним было легко вернуться.', mockup: { device: 'phone', label: 'Детали встречи', screen: 'meeting', image: { src: '/simple-crm-landing-screens/12-meeting-detail.png', alt: 'Дата, время и подтверждение встречи в Simple CRM' } } },
    { icon: 'receipt', title: 'Уточните оплату', description: 'Посмотрите, какие счета уже оплачены, а какие ещё ждут оплаты. История платежей поможет разобраться перед следующим сообщением клиенту.', mockup: { device: 'phone', label: 'Платежи', screen: 'payments', image: { src: '/simple-crm-landing-screens/25-payments.png', alt: 'Ожидающие оплаты счета и история платежей' } } },
  ],
  trust: {
    title: 'Клиенты доверяют вам. Их данные тоже важны.',
    copy: 'Номер телефона, переписка и история встреч — личная информация. Сохраняйте то, что нужно для организации работы. Если вам помогает администратор или коллега, выбирайте, к каким разделам ему нужен доступ.',
    benefits: ['История встреч и расчётов рядом с клиентом', 'Доступ сотрудников настраивается по ролям'],
    cta: { label: 'О конфиденциальности данных', href: '/privacy/' },
  },
  articles: articles.filter(article => article.featured).slice(0, 3),
};
