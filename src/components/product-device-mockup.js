const validDevices = new Set(['phone', 'tablet', 'desktop']);

export function createProductDeviceMockup({ mode = 'placeholder', device = 'phone', label = 'Экран Simple CRM', screen = 'client', image, alt = '' } = {}) {
  if (!validDevices.has(device)) throw new Error(`Неизвестный тип устройства: ${device}`);

  const figure = document.createElement('figure');
  figure.className = `device-mockup device-mockup--${device}${mode === 'image' ? ' device-mockup--image' : ''}`;
  figure.setAttribute('role', 'img');
  figure.setAttribute('aria-label', alt || `${label} в Simple CRM`);

  const frame = document.createElement('div');
  frame.className = 'device-mockup__frame';

  if (mode === 'image' && image?.src) {
    const img = document.createElement('img');
    img.className = 'device-mockup__image';
    img.src = image.src;
    img.alt = alt || image.alt || '';
    if (image.width) img.width = image.width;
    if (image.height) img.height = image.height;
    frame.append(img);
  } else if (mode === 'demo') {
    frame.append(createDemoScreen({ device, label, screen }));
  } else {
    frame.append(createPlaceholderScreen({ device, label }));
  }

  figure.append(frame);
  return figure;
}

function createDemoScreen({ device, label, screen }) {
  const root = document.createElement('div');
  root.className = `product-screen product-screen--${screen}`;
  root.innerHTML = device === 'phone' ? phoneScreen(screen, label) : workspaceScreen(label);
  return root;
}

function phoneScreen(screen, label) {
  const content = {
    today: `
      <div class="ps-status"><span>9:41</span><span>● Wi‑Fi 100%</span></div>
      <div class="ps-appbar"><span class="ps-avatar">АП</span><strong>Сегодня</strong><span class="ps-add">＋</span></div>
      <div class="ps-body"><h4>3 встречи сегодня</h4><p class="ps-date">Суббота, 15 августа</p>
        <div class="ps-week"><span>ПН<small>10</small></span><span>ВТ<small>11</small></span><span>СР<small>12</small></span><span>ЧТ<small>13</small></span><span>ПТ<small>14</small></span><span class="is-today">СБ<small>15</small></span></div>
        <div class="ps-tabs"><span class="is-active">Расписание</span><span>Список</span></div>
        <div class="ps-timeline"><span class="ps-time">14:30</span><article class="ps-event ps-event--blue"><strong>Петрова Е. С.</strong><small>14:30–15:20 · Онлайн</small></article><span class="ps-time">16:00</span><article class="ps-event ps-event--green"><strong>Волкова И. А.</strong><small>16:00–17:00 · Офис</small></article><span class="ps-time">18:30</span><article class="ps-event ps-event--violet"><strong>Смирнов А. П.</strong><small>18:30–19:15 · Онлайн</small></article></div>
      </div><div class="ps-primary">Добавить встречу</div>${bottomNav('today')}`,
    client: `
      <div class="ps-status"><span>9:41</span><span>● Wi‑Fi 100%</span></div>
      <div class="ps-appbar"><span>Клиенты</span><strong>Клиент</strong><span>•••</span></div>
      <div class="ps-body"><article class="ps-person"><span class="ps-avatar ps-avatar--large">ПЕ</span><div><strong>Петрова Елена Сергеевна</strong><small>+7 916 555-12-34 · elena@crm.ru</small><em>Активный клиент · с 12 июня</em></div></article>
        <div class="ps-quick"><span>✉<small>Сообщение</small></span><span>▣<small>Встреча</small></span><span>✓<small>Задача</small></span></div>
        <article class="ps-meeting-card"><b>СЕГОДНЯ · 14:30–15:20</b><strong>Вводная встреча · онлайн</strong><small>Перед встречей: 1 задача</small></article>
        <div class="ps-stats"><span><b>6</b><small>встреч</small></span><span><b class="is-warning">2</b><small>задачи</small></span><span><b>4 500 ₽</b><small>к оплате</small></span></div>
        <div class="ps-list"><span><strong>Контакты и данные</strong><small>Телефон, email, реквизиты</small></span><span><strong>Встречи и задачи</strong><small>6 встреч · 2 открытые задачи</small></span><span><strong>Сообщения и файлы</strong><small>3 непрочитанных · 4 документа</small></span></div>
      </div>${bottomNav('clients')}`,
    calendar: `
      <div class="ps-status"><span>9:41</span><span>● Wi‑Fi 100%</span></div><div class="ps-appbar"><span></span><strong>Август 2026</strong><span class="ps-add">＋</span></div>
      <div class="ps-body"><div class="ps-tabs ps-tabs--three"><span>День</span><span>Неделя</span><span class="is-active">Месяц</span></div><div class="ps-mini-calendar">${[10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30].map(day => `<span class="${day === 15 ? 'is-selected' : ''}">${day}</span>`).join('')}</div>
        <p class="ps-section-label">СУББОТА, 15 АВГУСТА · 3 СОБЫТИЯ</p><article class="ps-row ps-row--blue"><b>14:30</b><span><strong>Петрова Е. С.</strong><small>Вводная встреча · Онлайн</small></span></article><article class="ps-row ps-row--green"><b>16:00</b><span><strong>Волкова И. А.</strong><small>Консультация · Офис</small></span></article><article class="ps-row ps-row--violet"><b>18:30</b><span><strong>Смирнов А. П.</strong><small>Повторная встреча</small></span></article>
      </div><div class="ps-primary">Создать встречу</div>${bottomNav('calendar')}`,
    meeting: `
      <div class="ps-status"><span>9:41</span><span>● Wi‑Fi 100%</span></div><div class="ps-appbar"><span>Назад</span><strong>Детали встречи</strong><span></span></div>
      <div class="ps-body"><article class="ps-meeting-detail"><h4>Вводная встреча</h4><strong>15 августа · 14:30–15:20</strong><small>Онлайн · ссылка доступна за 10 минут</small><em>Подтверждена</em></article><div class="ps-list ps-list--fields"><span><small>Клиент</small><strong>Петрова Е. С.</strong></span><span><small>Формат</small><strong>Онлайн</strong></span><span><small>Услуга</small><strong>Консультация · 50 минут</strong></span><span><small>Напоминание</small><strong>Отправлено вчера, 14:30</strong></span></div><div class="ps-success"><strong>Встреча создана</strong><small>Добавлена в календарь и синхронизирована</small></div></div><div class="ps-primary">Отправить напоминание</div>`,
    tasks: `
      <div class="ps-status"><span>9:41</span><span>● Wi‑Fi 100%</span></div><div class="ps-appbar"><span></span><strong>Задачи</strong><span class="ps-add">＋</span></div>
      <div class="ps-body"><h4>4 задачи сегодня</h4><p class="ps-date">1 просрочена · 3 запланированы</p><div class="ps-tabs ps-tabs--three"><span class="is-active">Сегодня</span><span>Входящие <b>2</b></span><span>Все</span></div><article class="ps-task"><i></i><span><strong>Подготовить материалы</strong><small>Петрова Е. С.</small><em>Просрочено · важно</em></span></article><article class="ps-task"><i></i><span><strong>Отправить договор</strong><small>Петрова Е. С. · 18:00</small><em class="is-today-tag">Сегодня</em></span></article><article class="ps-task"><i></i><span><strong>Подтвердить встречу</strong><small>Волкова И. А. · завтра</small></span></article></div>${bottomNav('tasks')}`,
    messages: `
      <div class="ps-status"><span>9:41</span><span>● Wi‑Fi 100%</span></div><div class="ps-appbar"><span>Назад</span><strong>Петрова А. В.</strong><span></span></div>
      <div class="ps-chat"><small>Сегодня, 14 августа</small><p class="is-in">Добрый день! Напоминаю о встрече завтра в 15:00.</p><p class="is-out">Здравствуйте! Подтверждаю, буду вовремя. Спасибо.</p><em>Доставлено</em><p class="is-in">Если понадобится перенос, напишите сюда — сообщения защищены.</p></div><div class="ps-compose"><span>⌕</span><span>Сообщение</span><b>➤</b></div>${bottomNav('messages')}`,
    documents: `
      <div class="ps-status"><span>9:41</span><span>● Wi‑Fi 100%</span></div><div class="ps-appbar"><span>Назад</span><strong>Документы</strong><span class="ps-add">＋</span></div>
      <div class="ps-body"><div class="ps-search">⌕ Найти документ</div><p class="ps-section-label">ПОСЛЕДНИЕ ФАЙЛЫ</p><article class="ps-file"><b>PDF</b><span><strong>Коммерческое предложение</strong><small>Обновлено сегодня · 1,8 МБ</small></span><em>Готово</em></article><article class="ps-file"><b>DOC</b><span><strong>Договор № 24-08</strong><small>Петрова Е. С. · 840 КБ</small></span><em>На подпись</em></article><article class="ps-file"><b>XLS</b><span><strong>Расчёт проекта</strong><small>Изменён вчера · 320 КБ</small></span><em>Новый</em></article><div class="ps-upload"><span>＋</span><strong>Добавить документ</strong><small>PDF, DOCX, XLSX до 25 МБ</small></div></div>${bottomNav('documents')}`,
    billing: `
      <div class="ps-status"><span>9:41</span><span>● Wi‑Fi 100%</span></div><div class="ps-appbar"><span>Назад</span><strong>Счета и оплаты</strong><span class="ps-add">＋</span></div>
      <div class="ps-body"><article class="ps-balance"><small>К ОПЛАТЕ</small><h4>74 500 ₽</h4><span><b>2</b> ожидают оплаты</span></article><div class="ps-tabs ps-tabs--three"><span class="is-active">Все</span><span>Ожидают</span><span>Оплачены</span></div><article class="ps-invoice"><span><strong>Счёт № 1048</strong><small>Петрова Е. С. · 45 000 ₽</small></span><em>Ждёт оплаты</em></article><article class="ps-invoice"><span><strong>Счёт № 1041</strong><small>Волкова И. А. · 29 500 ₽</small></span><em>Ждёт оплаты</em></article><article class="ps-invoice is-paid"><span><strong>Счёт № 1032</strong><small>Смирнов А. П. · 18 000 ₽</small></span><em>Оплачено</em></article></div><div class="ps-primary">Выставить счёт</div>${bottomNav('billing')}`,
  };
  return content[screen] || content.client;
}

function workspaceScreen(label) {
  return `<div class="workspace-demo"><aside><div class="workspace-brand"><span>◆</span> Simple CRM</div><nav><b>Сегодня</b><span>Календарь</span><span>Клиенты</span><span>Сообщения</span><span>Документы</span><span>Счета</span></nav><div class="workspace-user"><i>АП</i><span>Анна Петрова<small>Администратор</small></span></div></aside><main><header><div><small>Рабочее пространство</small><h4>${escapeHtml(label)}</h4></div><button>＋ Добавить</button></header><section class="workspace-kpis"><article><small>Встречи сегодня</small><strong>6</strong><em>2 онлайн</em></article><article><small>Открытые задачи</small><strong>12</strong><em>3 важные</em></article><article><small>Ожидают оплаты</small><strong>74 500 ₽</strong><em>2 счёта</em></article></section><section class="workspace-grid"><article><h5>Ближайшие встречи</h5><p><b>14:30</b><span>Петрова Е. С.<small>Вводная встреча · онлайн</small></span></p><p><b>16:00</b><span>Волкова И. А.<small>Консультация · офис</small></span></p><p><b>18:30</b><span>Смирнов А. П.<small>Повторная встреча</small></span></p></article><article><h5>Следующие действия</h5><p><i class="dot dot--red"></i><span>Отправить договор<small>До 18:00 · Петрова Е. С.</small></span></p><p><i class="dot dot--yellow"></i><span>Подтвердить встречу<small>Завтра · Волкова И. А.</small></span></p><p><i class="dot dot--blue"></i><span>Проверить оплату<small>Счёт № 1048</small></span></p></article></section></main></div>`;
}

function bottomNav(active) {
  const items = [['today', '⌂', 'Сегодня'], ['calendar', '▦', 'Календарь'], ['clients', '♙', 'Клиенты'], ['messages', '▤', 'Сообщения'], ['tasks', '☷', 'Задачи']];
  return `<div class="ps-bottom">${items.map(([id, icon, label]) => `<span class="${active === id ? 'is-active' : ''}"><b>${icon}</b><small>${label}</small></span>`).join('')}</div>`;
}

function createPlaceholderScreen({ device, label }) {
  const screen = document.createElement('div');
  screen.className = 'device-mockup__screen';
  if (device === 'phone') { const notch = document.createElement('span'); notch.className = 'device-mockup__notch'; screen.append(notch); }
  const labelElement = document.createElement('p'); labelElement.className = 'device-mockup__label'; labelElement.textContent = label; screen.append(labelElement);
  if (device !== 'phone') { const rail = document.createElement('div'); rail.className = 'device-mockup__rail'; rail.append(createLine(), createLine('short'), createLine(), createLine('short')); screen.append(rail); }
  const content = document.createElement('div'); content.className = 'device-mockup__content'; content.append(createLine(), createCard(), createCard(), createTag()); screen.append(content);
  return screen;
}

function createLine(size = '') { const line = document.createElement('span'); line.className = `device-mockup__line${size ? ` device-mockup__line--${size}` : ''}`; return line; }
function createCard() { const card = document.createElement('span'); card.className = 'device-mockup__card'; return card; }
function createTag() { const tag = document.createElement('span'); tag.className = 'device-mockup__tag'; return tag; }
function escapeHtml(value) { return String(value).replace(/[&<>'"]/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#039;', '"': '&quot;' })[character]); }
