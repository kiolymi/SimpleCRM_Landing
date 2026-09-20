import { iconSvg } from './icons.js?v=20260824-28';
import { createPracticeScreen } from './practice-media.js?v=refinement1';

// Local, fictional walkthroughs. No network actions, payment or booking APIs.
export const practiceScenarios = [
  {
    id: 'return', label: 'Повторная запись',
    title: '«Я запишусь позже» — и разговор затих',
    problem: 'Вы договорились вернуться к записи, но среди других дел так и не написали.',
    action: 'Выберите, когда связаться. В нужный день вернитесь к истории клиента и решите, что ему написать.',
    href: '/how-to/create-follow-up-task/', link: 'Как запланировать следующий контакт',
    steps: [
      { label: 'Договорились', screen: 'r02-client', role: 'У специалиста', title: 'Следующий контакт — рядом с клиентом', text: '12 сентября Елена попросила вернуться к записи через неделю. Анна сохранила договорённость: написать 18 сентября.', alt: 'Пример карточки Елены: история встреч и следующий контакт 18 сентября' },
      { label: 'Пора написать', screen: 'r01-today', role: 'У специалиста', title: 'В нужный день — вернуться к разговору', text: 'В списке на сегодня есть задача связаться с Еленой. Не нужно помнить о ней всю неделю.', alt: 'Пример экрана Сегодня с задачей связаться с Еленой' },
      { label: 'Проверить текст', screen: 'r03-message', role: 'У специалиста', title: 'Решение отправить остаётся за вами', text: 'Сначала проверьте текст и получателя. Доступные способы отправки ещё уточняются; этот пример ничего не отправляет.', alt: 'Проект экрана проверки сообщения Елене перед отправкой' },
    ],
    note: 'Проект сценария. Доступность напоминаний и отправки уточняется.',
  },
  {
    id: 'payment', label: 'Оплата и предоплата',
    title: 'Запись есть. А предоплата пришла?',
    problem: 'Перевод обещали вечером. Перед встречей приходится вспоминать, за что и сколько уже оплатили.',
    action: 'Один счёт связан с одной встречей: видно сумму, предоплату и остаток.',
    href: '/learn/client-context/', link: 'Что держать рядом с карточкой клиента',
    steps: [
      { label: 'Счёт к встрече', screen: 'p02-invoice', role: 'У специалиста', title: 'Сумма и встреча — в одном месте', text: 'В учебном примере консультация стоит 3 000 ₽. Предоплата — 1 000 ₽, после неё остаётся 2 000 ₽. Это не тариф Simple CRM.', alt: 'Пример счёта: консультация 22 сентября, стоимость 3000 рублей, предоплата 1000 рублей' },
      { label: 'Условия для клиента', screen: 'p04-client-prepayment', role: 'У клиента', title: 'До оплаты — проверить условия', text: 'Елена видит специалиста, дату, сумму и условия. Оплата и правила отмены требуют отдельной настройки; здесь показан только макет.', alt: 'Проект клиентского экрана предоплаты с данными встречи и суммой' },
      { label: 'Статус оплаты', screen: 'p05b-prepayment-received', role: 'У клиента', title: 'Предоплата — не вся стоимость', text: 'Так может выглядеть подтверждённая предоплата: 1 000 ₽ получена, 2 000 ₽ остаётся. В этом примере деньги не списываются.', alt: 'Проект подтверждения предоплаты: 1000 рублей получено, остаток 2000 рублей' },
    ],
    note: 'Предоплата проектируется. Платёжный сервис пока не подключён.',
  },
  {
    id: 'booking', label: 'Выбор времени по ссылке',
    title: '«А в четверг? А чуть попозже?»',
    problem: 'Несколько сообщений, чтобы найти одно свободное время.',
    action: 'Специалист предлагает доступные часы. Клиент выбирает время и проверяет детали встречи.',
    href: '/how-to/prepare-meeting/', link: 'Как подготовить встречу',
    steps: [
      { label: 'Свободные часы', screen: 'b01-availability', role: 'У специалиста', title: 'Вы решаете, когда принимать клиентов', text: 'Анна предлагает свободные часы для онлайн-консультации длительностью 50 минут.', alt: 'Проект настройки свободных часов специалиста для записи клиентов' },
      { label: 'Выбор клиента', screen: 'b02-client-time', role: 'У клиента', title: 'Выбрать время без переписки', text: 'Елена выбирает 22 сентября, 15:00. Часовой пояс указан рядом: Москва, UTC+3.', alt: 'Проект страницы записи клиента: выбор времени 15:00 или 16:00 по Москве' },
      { label: 'Проверка деталей', screen: 'b03-client-review', role: 'У клиента', title: 'Перед подтверждением — всё проверить', text: 'Специалист, формат, время и условия собраны вместе. Если время успели занять, нужна другая запись, а не ложное подтверждение.', alt: 'Проект проверки данных онлайн-консультации перед подтверждением записи' },
      { label: 'Итог записи', screen: 'b04-client-confirmed', role: 'У клиента', title: 'Дата и следующий шаг понятны', text: 'Так может выглядеть итог записи. Реальная встреча здесь не создаётся; готовность записи по ссылке ещё уточняется.', alt: 'Проект итогового экрана записи на онлайн-консультацию 22 сентября в 15:00' },
    ],
    note: 'Запись по ссылке проектируется. Здесь нельзя записаться на реальную встречу.',
  },
];

function createStory(scenario) {
  const article = document.createElement('article');
  article.id = `story-${scenario.id}`;
  article.className = `practice-flow practice-flow--${scenario.id}`;
  article.setAttribute('aria-labelledby', `${article.id}-title`);
  article.innerHTML = `<header class="practice-flow__heading">
      <p class="practice-flow__label">${scenario.label}</p>
      <h3 id="${article.id}-title">${scenario.title}</h3>
      <p>${scenario.problem}</p><p>${scenario.action}</p>
    </header>
    <figure class="practice-flow__visual">
      <span class="practice-flow__role"></span>
      <div class="practice-flow__phone"></div>
      <figcaption>Пример интерфейса · вымышленные данные</figcaption>
    </figure>
    <div class="practice-flow__explore">
      <p class="practice-flow__hint" id="${article.id}-hint">История меняется сама — любой шаг можно выбрать</p>
      <div class="practice-flow__steps" role="group" aria-labelledby="${article.id}-title" aria-describedby="${article.id}-hint">
        ${scenario.steps.map((step, index) => `<button type="button" data-step="${index}" aria-label="Шаг ${index + 1} из ${scenario.steps.length}: ${step.label}" aria-pressed="${index === 0}" aria-controls="${article.id}-detail"><span aria-hidden="true">${index + 1}</span>${step.label}</button>`).join('')}
      </div>
      <div class="practice-flow__detail" id="${article.id}-detail" aria-live="off" aria-atomic="true"><h4></h4><p></p></div>
      <p class="practice-flow__note">${scenario.note}</p>
      <a class="text-link" href="${scenario.href}">${scenario.link} ${iconSvg('arrow-right')}</a>
    </div>`;
  const phone = article.querySelector('.practice-flow__phone');
  const detail = article.querySelector('.practice-flow__detail');
  const buttons = [...article.querySelectorAll('[data-step]')];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let current = 0;
  let timer = 0;
  let transitionTimer = 0;
  let visible = false;
  let paused = false;
  const commit = (index, initial = false, announce = false) => {
    const step = scenario.steps[index];
    phone.replaceChildren(createPracticeScreen(step.screen, step.alt, { loading: initial ? 'lazy' : 'eager' }));
    article.querySelector('.practice-flow__role').textContent = step.role;
    detail.querySelector('h4').textContent = step.title;
    detail.querySelector('p').textContent = step.text;
    buttons.forEach((button, position) => button.setAttribute('aria-pressed', String(position === index)));
    current = index;
    article.dataset.step = String(index + 1);
    detail.setAttribute('aria-live', announce ? 'polite' : 'off');
    article.classList.remove('is-changing');
    requestAnimationFrame(() => article.classList.add('is-settled'));
  };
  const display = (index, { initial = false, announce = false } = {}) => {
    window.clearTimeout(transitionTimer);
    article.classList.remove('is-settled');
    if (initial || reducedMotion.matches) {
      commit(index, initial, announce);
      return;
    }
    article.classList.add('is-changing');
    transitionTimer = window.setTimeout(() => commit(index, false, announce), 260);
  };
  const stop = () => {
    window.clearTimeout(timer);
    timer = 0;
    article.classList.add('is-paused');
  };
  const schedule = () => {
    stop();
    if (!visible || paused || document.hidden || reducedMotion.matches) return;
    article.classList.remove('is-paused');
    timer = window.setTimeout(() => {
      display((current + 1) % scenario.steps.length);
      schedule();
    }, 5200);
  };
  buttons.forEach((button, index) => button.addEventListener('click', () => {
    if (index !== current) display(index, { announce: true });
    schedule();
  }));
  article.addEventListener('pointerenter', () => { paused = true; stop(); });
  article.addEventListener('pointerleave', () => { paused = false; schedule(); });
  article.addEventListener('focusin', () => { paused = true; stop(); });
  article.addEventListener('focusout', event => {
    if (article.contains(event.relatedTarget)) return;
    paused = false;
    schedule();
  });
  document.addEventListener('visibilitychange', schedule);
  reducedMotion.addEventListener('change', schedule);
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      visible = entries[0]?.isIntersecting === true;
      schedule();
    }, { threshold: .35 });
    observer.observe(article);
  } else {
    visible = true;
  }
  display(0, { initial: true });
  schedule();
  return article;
}

export function createPracticeStories() {
  const section = document.createElement('section');
  section.id = 'practice';
  section.className = 'practice-stories';
  section.setAttribute('aria-labelledby', 'practice-title');
  section.innerHTML = `<div class="container"><header class="practice-stories__intro">
    <h2 id="practice-title">Три знакомые ситуации</h2>
    <p>Посмотрите, как могут выглядеть повторная запись, предоплата и выбор времени.</p>
  </header><div class="practice-flows"></div></div>`;
  section.querySelector('.practice-flows').append(...practiceScenarios.map(createStory));
  return section;
}
