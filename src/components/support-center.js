import { iconSvg } from './icons.js?v=20260824-28';

export function createSupportCenter() {
  const section = document.createElement('section');
  section.className = 'support-center';
  section.setAttribute('aria-labelledby', 'support-title');
  section.innerHTML = `<div class="container">
    <header class="support-center__intro"><p class="eyebrow">Поддержка Simple CRM</p><h1 id="support-title">С чем нужна помощь?</h1><p>Найдите готовый ответ или расскажите о своём вопросе команде.</p></header>
    <div class="support-center__layout">
      <section class="support-compose" id="support-message" aria-labelledby="support-form-title">
        <header><span class="support-center__icon">${iconSvg('message-square')}</span><div><h2 id="support-form-title">Написать команде</h2><p>Все детали обращения — в одной форме.</p></div></header>
        <form data-demo-form novalidate id="support-message-form">
          <div class="support-compose__row"><label>Ваше имя <span class="support-optional">(необязательно)</span><input name="name" autocomplete="name" placeholder="Как к вам обращаться"></label><label>Электронная почта <span aria-hidden="true">*</span><input name="email" type="email" autocomplete="email" placeholder="you@company.ru" required></label></div>
          <label>Тема обращения <span aria-hidden="true">*</span><select name="topic" required><option value="">Выберите, с чем нужна помощь</option><option>Начало работы и настройка</option><option>Клиенты и импорт данных</option><option>Встречи и задачи</option><option>Тарифы и оплата</option><option>Ошибка в приложении</option><option>Идея или другой вопрос</option></select></label>
          <label>Ваш вопрос <span aria-hidden="true">*</span><textarea name="message" rows="5" required placeholder="Что вы хотели сделать и на каком шаге возник вопрос?" aria-describedby="support-message-hint"></textarea></label>
          <p id="support-message-hint" class="support-field-hint">Если это ошибка, укажите версию приложения и модель устройства. Не добавляйте пароли и личные данные клиентов.</p>
          <label class="support-consent"><input name="consent" type="checkbox" required><span>Согласен на обработку данных для ответа на обращение. <a href="/privacy/">Политика конфиденциальности</a></span></label>
          <div class="support-demo-note">Форма пока работает в деморежиме: сообщение не отправится. Поля с * обязательны.</div>
          <button class="button button--primary" type="submit">Проверить обращение ${iconSvg('arrow-right')}</button>
          <p class="form-status" data-form-status role="status" aria-live="polite"></p>
        </form>
      </section>
      <aside class="support-resources" aria-label="Самостоятельная помощь">
        <section class="support-help-card"><h2>Возможно, ответ уже есть</h2><p>Короткие ответы и инструкции — без ожидания.</p><a class="support-resource" href="/faq/"><span class="support-center__icon">${iconSvg('search')}</span><span><strong>Частые вопросы</strong><small>Возможности, подписка и данные</small></span>${iconSvg('arrow-right')}</a><a class="support-resource" href="/learn/?type=how-to"><span class="support-center__icon">${iconSvg('task-list')}</span><span><strong>Пошаговые инструкции</strong><small>Настройка, встречи и задачи</small></span>${iconSvg('arrow-right')}</a></section>
        <section class="support-guides"><p class="eyebrow">С чего начать</p><h2>Разберёмся шаг за шагом</h2><a href="/how-to/prepare-meeting/">Подготовить встречу ${iconSvg('arrow-right')}</a><a href="/how-to/create-follow-up-task/">Создать задачу после разговора ${iconSvg('arrow-right')}</a><a href="/learn/client-context/">Навести порядок в карточке клиента ${iconSvg('arrow-right')}</a></section>
        <a class="support-updates" href="/releases/">Что нового в приложении ${iconSvg('arrow-right')}</a>
      </aside>
    </div>
  </div>`;
  return section;
}
