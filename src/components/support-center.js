import { iconSvg } from './icons.js?v=20260824-28';

export function createSupportCenter() {
  const section = document.createElement('section');
  section.className = 'support-center';
  section.setAttribute('aria-labelledby', 'support-title');
  section.innerHTML = `<div class="container">
    <header class="support-center__intro"><h1 id="support-title">Поддержка</h1><p>Поможем с клиентской базой, автоматическими напоминаниями, встречами и оплатами.</p></header>
    <section class="support-compose" id="support-message" aria-labelledby="support-form-title">
      <header><h2 id="support-form-title">Написать в поддержку</h2></header>
      <form data-support-form novalidate id="support-message-form">
        <div class="support-compose__row">
          <label>Имя <span class="support-optional">необязательно</span><input name="name" autocomplete="name" maxlength="100" placeholder="Ваше имя"></label>
          <label>Электронная почта <span aria-hidden="true">*</span><input name="email" type="email" autocomplete="email" maxlength="160" placeholder="name@example.com" required></label>
        </div>
        <label>Тема <span aria-hidden="true">*</span><select name="topic" required><option value="">Выберите тему</option><option>Начало работы и настройка</option><option>Клиенты и импорт данных</option><option>Записи, переносы и задачи</option><option>Напоминания в Telegram, MAX и SMS</option><option>Счета и оплаты клиентов</option><option>Подписка и тарифы</option><option>Ошибка в приложении</option><option>Идея или другой вопрос</option></select></label>
        <label>Сообщение <span aria-hidden="true">*</span><textarea name="message" rows="6" maxlength="3000" required placeholder="Что нужно сделать и на каком шаге возник вопрос?"></textarea></label>
        <div class="support-compose__actions"><button class="button button--primary" type="submit">Отправить сообщение ${iconSvg('arrow-right')}</button></div>
        <p class="form-status" data-form-status role="status" aria-live="polite"></p>
      </form>
    </section>
    <section class="support-resources" aria-labelledby="support-resources-title">
      <h2 id="support-resources-title">Выберите раздел</h2>
      <nav aria-label="Материалы поддержки">
        <a class="support-resource" href="/faq/"><span class="support-center__icon">${iconSvg('search')}</span><span><strong>Частые вопросы</strong><small>Короткие ответы о возможностях и настройке</small></span>${iconSvg('arrow-right')}</a>
        <a class="support-resource" href="/how-to/"><span class="support-center__icon">${iconSvg('task-list')}</span><span><strong>Инструкции</strong><small>Встречи, напоминания и оплаты</small></span>${iconSvg('arrow-right')}</a>
        <a class="support-resource" href="/pricing/"><span class="support-center__icon">${iconSvg('receipt')}</span><span><strong>Тарифы</strong><small>Возможности бесплатного режима и Pro</small></span>${iconSvg('arrow-right')}</a>
        <a class="support-resource" href="/privacy/"><span class="support-center__icon">${iconSvg('document')}</span><span><strong>Конфиденциальность</strong><small>Обработка, хранение и защита данных</small></span>${iconSvg('arrow-right')}</a>
      </nav>
    </section>
  </div>`;
  return section;
}
