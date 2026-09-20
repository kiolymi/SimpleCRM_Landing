import { iconSvg } from './icons.js?v=20260824-28';

export function createSupportCenter() {
  const section = document.createElement('section');
  section.className = 'support-center';
  section.setAttribute('aria-labelledby', 'support-title');
  section.innerHTML = `<div class="container">
    <header class="support-center__intro"><p class="eyebrow">Поддержка Simple CRM</p><h1 id="support-title">С чем нужна помощь?</h1><p>Подсказки по клиентской базе, записям и задачам для вашей практики.</p></header>
    <div class="support-center__layout">
      <section class="support-compose" id="support-message" aria-labelledby="support-form-title">
        <header><span class="support-center__icon">${iconSvg('message-square')}</span><div><h2 id="support-form-title">Подготовить вопрос</h2><p>Канал для отправки обращения ещё уточняется.</p></div></header>
        <div class="support-demo-note">На этой странице сообщение не отправляется. Не вводите сюда личные данные клиентов.</div>
        <div class="pricing-plan__timeline" aria-label="Что подготовить для обращения">
          <div><span>${iconSvg('check')}</span><p><strong>Что вы хотели сделать</strong>Коротко опишите задачу без имён и контактов клиентов.</p></div>
          <div><span>${iconSvg('check')}</span><p><strong>На каком шаге возник вопрос</strong>Укажите раздел приложения и последовательность действий.</p></div>
          <div><span>${iconSvg('check')}</span><p><strong>Версия и устройство</strong>Эти данные помогут разобраться с ошибкой, когда канал поддержки будет подключён.</p></div>
        </div>
        <a class="button button--primary" href="/faq/">Посмотреть частые вопросы ${iconSvg('arrow-right')}</a>
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
