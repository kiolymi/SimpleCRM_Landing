import { createPracticeScreen } from './practice-media.js?v=product-screens2';
import { iconSvg } from './icons.js?v=20260824-28';

export function createPracticeOverview() {
  const fragment = document.createDocumentFragment();
  const context = document.createElement('section');
  context.id = 'client-context';
  context.className = 'practice-context';
  context.setAttribute('aria-labelledby', 'client-context-title');
  context.innerHTML = `<div class="container practice-context__grid">
    <div class="practice-context__copy">
      <h2 id="client-context-title">Не начинать каждый разговор с поиска</h2>
      <p>В карточке клиента последняя договорённость, следующая встреча и расчёты находятся рядом.</p>
      <ul class="practice-context__points"><li>${iconSvg('message-square')}<span>О чём договорились</span></li><li>${iconSvg('calendar')}<span>Когда встречаемся</span></li><li>${iconSvg('receipt')}<span>Что с оплатой</span></li></ul>
      <details class="practice-history"><summary>Открыть историю ${iconSvg('chevron-down')}</summary><ol><li><time datetime="2026-09-12">12 сентября</time><span>Договорились вернуться к записи.</span></li><li><time datetime="2026-09-18">18 сентября</time><span>Выбран следующий контакт.</span></li><li><time datetime="2026-09-22">22 сентября</time><span>Назначена новая встреча.</span></li></ol></details>
      <a class="text-link" href="/learn/">Инструкции и материалы ${iconSvg('arrow-right')}</a>
    </div><figure class="practice-context__visual"><div class="practice-flow__phone"></div><figcaption>Карточка клиента</figcaption></figure>
  </div>`;
  context.querySelector('.practice-flow__phone').append(createPracticeScreen('r02-client', 'Проект карточки клиента Елены: история, встречи и следующий контакт'));

  const start = document.createElement('section');
  start.id = 'start';
  start.className = 'practice-start';
  start.setAttribute('aria-labelledby', 'practice-start-title');
  start.innerHTML = `<div class="container"><div class="practice-start__panel"><div><h2 id="practice-start-title">Начните с одного клиента</h2><p>Добавьте контакт, ближайшую встречу и следующий шаг. Остальную базу можно перенести позже.</p></div><div><ol class="practice-start__steps"><li>Карточка клиента</li><li>Следующая встреча</li><li>Что сделать после неё</li></ol><a class="button button--primary" href="#practice">Посмотреть сценарии ${iconSvg('arrow-right')}</a></div></div></div>`;

  const faq = document.createElement('section');
  faq.className = 'practice-questions';
  faq.setAttribute('aria-labelledby', 'practice-questions-title');
  const questions = [
    ['Нужно ли разбираться в CRM?', 'Нет. Начните с контакта клиента, времени встречи и следующего действия. Остальные возможности подключайте по мере необходимости.'],
    ['Что будет видеть клиент?', 'Клиент видит только данные своей записи: услугу, доступное время и условия встречи. Клиентская база и рабочие заметки ему недоступны.'],
    ['Как защищены данные клиентов?', 'Доступ к рабочим данным получают только уполномоченные пользователи. Подробнее об обработке, хранении и правах пользователей — в <a href="/privacy/">политике конфиденциальности</a>.'],
    ['Сколько стоит Simple CRM?', 'Основные возможности доступны бесплатно. Для командной работы, ролей и расширенных функций предусмотрен тариф Pro. <a href="/pricing/">Сравнить тарифы</a>'],
  ];
  faq.innerHTML = `<div class="container"><h2 id="practice-questions-title">Что важно знать</h2><div class="practice-questions__list">${questions.map(([question, answer])=>`<details><summary>${question}${iconSvg('chevron-down')}</summary><div><p>${answer}</p></div></details>`).join('')}</div><a class="text-link" href="/faq/">Все вопросы ${iconSvg('arrow-right')}</a></div>`;

  const closing = document.createElement('section');
  closing.className = 'practice-closing';
  closing.setAttribute('aria-labelledby', 'practice-closing-title');
  closing.innerHTML = `<div class="container"><h2 id="practice-closing-title">Меньше держать в голове.<br>Больше внимания человеку.</h2><p>Начните знакомство с ситуации, которую узнали.</p><a class="button" href="#practice">Вернуться к примерам ${iconSvg('arrow-right')}</a></div>`;
  fragment.append(context, start, faq, closing);
  return fragment;
}
