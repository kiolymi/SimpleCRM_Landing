import { iconSvg } from './icons.js?v=20260824-28';

export function createSupportCenter() {
  const section = document.createElement('section');
  section.className = 'support-center';
  section.setAttribute('aria-labelledby', 'support-title');
  section.innerHTML = `<div class="container">
    <header class="support-center__intro"><h1 id="support-title">Поддержка</h1><p>Опишите вопрос — форма подскажет, какие данные нужны.</p></header>
    <div class="support-center__layout">
      <section class="support-compose" id="support-message" aria-labelledby="support-form-title">
        <header><h2 id="support-form-title">Написать в поддержку</h2></header>
        <form data-demo-form novalidate id="support-message-form">
          <div class="support-compose__row"><label>Имя <span class="support-optional">необязательно</span><input name="name" autocomplete="name" placeholder="Ваше имя"></label><label>Электронная почта <span aria-hidden="true">*</span><input name="email" type="email" autocomplete="email" placeholder="name@example.com" required></label></div>
          <label>Тема <span aria-hidden="true">*</span><select name="topic" required><option value="">Выберите тему</option><option>Начало работы и настройка</option><option>Клиенты и импорт данных</option><option>Записи, переносы и задачи</option><option>Счета и оплаты клиентов</option><option>Подписка и тарифы</option><option>Ошибка в приложении</option><option>Идея или другой вопрос</option></select></label>
          <label>Сообщение <span aria-hidden="true">*</span><textarea name="message" rows="6" required placeholder="Коротко опишите вопрос"></textarea></label>
          <div class="support-compose__actions"><button class="button button--primary" type="submit">Проверить форму ${iconSvg('arrow-right')}</button><p class="support-demo-note">Данные не отправляются: форма работает в деморежиме.</p></div>
          <p class="form-status" data-form-status role="status" aria-live="polite"></p>
        </form>
      </section>
      <aside class="support-resources" aria-label="Самостоятельная помощь">
        <h2>Ответы и инструкции</h2>
        <nav aria-label="Материалы поддержки"><a class="support-resource" href="/faq/"><span class="support-center__icon">${iconSvg('search')}</span><strong>Частые вопросы</strong>${iconSvg('arrow-right')}</a><a class="support-resource" href="/learn/?type=how-to"><span class="support-center__icon">${iconSvg('task-list')}</span><strong>Инструкции</strong>${iconSvg('arrow-right')}</a></nav>
      </aside>
    </div>
  </div>`;
  return section;
}
